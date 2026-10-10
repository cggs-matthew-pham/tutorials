// Number line: integers (and halves or tenths) on one line, with fixed and dragged points, a comparison sentence and
// jumps for adding and subtracting.
//   widget: numberline
//   range: -10, 10           the ends of the line (required)
//   labels: 1                number every this many (default 1 up to 20 steps, else 5)
//   snap: 1                  where dragged points land (default 1; 0.5 or 0.1 for halves or tenths)
//   context: Temperature (°C)   a name and unit for readouts ("−7 °C"), written under the line
//   point A: -7              a fixed point; `point A: -7, Canberra` gives it a caption
//   point P: 0, drag         a point students drag along the line; checks see it once it is let go
//   point A: a               a point that follows slider a (keyboard-friendly, and what clips can move)
//   compare: A, P            writes the comparison live: "−7 < −2: A is further left, so it is less"
//   sum: a + b               a jump: start at a and move by b (sliders a and b), landing at R; "−3 + 5 = 2"
//   sum: a - b               subtracting: the jump goes the opposite way to adding b (drawn faint above it)
//   sum: a ? b               with + and − buttons for the operation
//   slider a: -10, 10, -3    min, max, start, step (default 1), as on the graph widget
// state: { scope: { vars: { each slider, r (the result), o (1 for +, −1 for −) }, points: { A: [x, 0], R: [r, 0] } } }
// Checks: "x(P) < -4", "x(P) < x(Q) and x(P) + x(Q) < 0", "a = 5 and b = -3 and o = -1", "r = 8".
(function (B) {
  'use strict';
  var spec = null, vars = {}, op = 1, objs = {}, startAt = {}, ui = {};
  var round = function (v) { return Math.round(v * 1e6) / 1e6; };
  var show = function (n) { return B.fmt(n).replace(/^-/, '−'); };
  var paren = function (n) { return n < 0 ? '(' + show(n) + ')' : show(n); };

  function num(t, where) {
    var v; try { v = WPM.evaluate(String(t).trim(), {}); } catch (e) { v = NaN; }
    if (!isFinite(v)) throw new Error(where + ': "' + String(t).trim() + '" is not a number.');
    return v;
  }
  function parse(s) {
    if (!s.range) throw new Error('range: give the two ends of the line, such as "range: -10, 10".');
    var r = s.range.split(',').map(function (t) { return num(t, 'range'); });
    if (r.length !== 2 || !(r[0] < r[1])) throw new Error('range: two numbers, the smaller first, such as "range: -10, 10".');
    s.lo = r[0]; s.hi = r[1];
    s.snapStep = s.snap !== undefined ? num(s.snap, 'snap') : 1;
    if (!(s.snapStep > 0)) throw new Error('snap: a number bigger than 0, such as 1 or 0.5.');
    var steps = (s.hi - s.lo);
    s.labelStep = s.labels !== undefined ? num(s.labels, 'labels') : steps <= 20 ? 1 : 5;
    var m = /^(.*?)\s*\(([^)]*)\)\s*$/.exec(s.context || '');
    s.ctx = s.context ? (m ? { name: m[1], unit: m[2] } : { name: s.context.trim(), unit: '' }) : null;
    s.points = []; s.sliders = [];
    var ordered = s.items.filter(function (it) { return it.kind === 'slider'; }).concat(s.items.filter(function (it) { return it.kind !== 'slider'; }));
    ordered.forEach(function (it) {
      var where = 'Line ' + it.line + ' (' + it.kind + (it.name ? ' ' + it.name : '') + ')';
      if (it.kind === 'point') {
        if (!/^[A-Z]$/.test(it.name || '') || it.name === 'R') throw new Error(where + ': a point needs a one-letter capital name (not R, which is the result of a sum).');
        var p = it.value.split(',').map(function (t) { return t.trim(); });
        var drag = p.slice(1).some(function (t) { return /^drag$/i.test(t); });
        var cap = p.slice(1).filter(function (t) { return !/^drag$/i.test(t); }).join(', ');
        // A number, or (fixed points) an expression in the sliders: `point A: a` follows slider a.
        var x, fx = null;
        if (/[a-z]/.test(p[0])) {
          if (drag) throw new Error(where + ': a dragged point starts at a number.');
          var have = s.sliders.map(function (q) { return q.name; });
          try { fx = WPM.compile(p[0]); WPM.vars(p[0]).forEach(function (v) { if (have.indexOf(v) < 0) throw new Error('"' + v + '" needs a slider'); }); } catch (e) { throw new Error(where + ': ' + e.message + '.'); }
          x = null;
        } else {
          x = num(p[0], where);
          if (x < s.lo || x > s.hi) throw new Error(where + ': ' + x + ' is off the line (' + s.lo + ' to ' + s.hi + ').');
        }
        s.points.push({ name: it.name, x: x, fx: fx, drag: drag, caption: cap });
      } else if (it.kind === 'slider') {
        if (!/^[a-z]$/.test(it.name || '') || it.name === 'r' || it.name === 'o') throw new Error(where + ': a slider needs a one-letter lower-case name (not r or o, which the sum reports).');
        var a = it.value.split(',').map(function (t) { return num(t, where); });
        if (a.length < 3 || !(a[0] < a[1]) || a[2] < a[0] || a[2] > a[1]) throw new Error(where + ': needs min, max, start with min < max and start between them.');
        s.sliders.push({ name: it.name, min: a[0], max: a[1], start: a[2], step: a[3] || 1 });
      }
    });
    var names = s.points.map(function (p) { return p.name; });
    if (new Set(names).size !== names.length) throw new Error('Two points have the same name.');
    s.cmp = null;
    if (s.compare) {
      var c = s.compare.split(',').map(function (t) { return t.trim(); });
      if (c.length !== 2 || c.some(function (n) { return names.indexOf(n) < 0; })) throw new Error('compare: name two of the points, such as "compare: A, B".');
      s.cmp = c;
    }
    var rawSum = s.sum; s.sum = null;
    if (rawSum !== undefined) {
      var sm = /^([a-z])\s*([+\-−?])\s*([a-z])$/.exec(String(rawSum).trim());
      if (!sm) throw new Error('sum: write two slider letters with +, − or ? between them, such as "sum: a + b".');
      var have = s.sliders.map(function (x) { return x.name; });
      [sm[1], sm[3]].forEach(function (n) { if (have.indexOf(n) < 0) throw new Error('sum: "' + n + '" needs a slider (such as "slider ' + n + ': -10, 10, 0").'); });
      s.sum = { a: sm[1], b: sm[3], op: sm[2] === '?' ? 0 : sm[2] === '+' ? 1 : -1 };
    }
  }

  function scope() {
    var pts = {};
    Object.keys(objs).forEach(function (n) { pts[n] = [round(objs[n].X()), 0]; });
    var v = Object.assign({}, vars);
    if (spec.sum) { v.o = op; v.r = result(); pts.R = [v.r, 0]; }
    return { vars: v, points: pts };
  }
  function result() { var s = spec.sum; return round(vars[s.a] + op * vars[s.b]); }
  function withUnit(n) { var u = spec.ctx && spec.ctx.unit; return show(n) + (u ? (u === '$' ? '' : ' ') + u : ''); }

  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', acc = B.css('--accent') || '#c2570a', acc2 = B.css('--left') || '#2563eb';
    var span = spec.hi - spec.lo, pad = span * 0.05, top = spec.sum ? 2.6 : 1.4;
    var board = B.jsx({ boundingbox: [spec.lo - pad, top, spec.hi + pad, spec.ctx ? -1.5 : -1.1] });
    var L = board.create('line', [[spec.lo, 0], [spec.hi, 0]], { straightFirst: false, straightLast: false, strokeColor: ink, strokeWidth: 2, fixed: true, highlight: false, firstArrow: true, lastArrow: true });
    void L;
    var u = 1 / board.unitY;   // one pixel, in units up the board, so ticks and labels keep their size in any height
    // Ticks at every snap step that is a whole number of label steps apart, short ones between.
    // Without labels:, number every 1, 2, 5 or 10 so the numbers do not run together on a narrow screen.
    var labelStep = spec.labels !== undefined ? spec.labelStep : [1, 2, 5, 10, 20, 50].filter(function (k) { return k >= spec.labelStep && k * board.unitX >= 26; })[0] || spec.labelStep;
    var minorStep = labelStep >= 1 && spec.snapStep < 1 ? spec.snapStep : Math.min(1, labelStep);
    for (var v = Math.ceil(spec.lo / minorStep) * minorStep; v <= spec.hi + 1e-9; v = round(v + minorStep)) {
      var major = Math.abs(v / labelStep - Math.round(v / labelStep)) < 1e-9;
      board.create('segment', [[v, (major ? -9 : -5) * u], [v, (major ? 9 : 5) * u]], { strokeColor: major ? ink : muted, strokeWidth: major ? 2 : 1, fixed: true, highlight: false });
      if (major) board.create('text', [v, -24 * u, show(v)], { anchorX: 'middle', anchorY: 'middle', cssClass: 'ticklabel nlnum' + (v === 0 ? ' nlzero' : ''), highlightCssClass: 'ticklabel nlnum', fixed: true, highlight: false });
    }
    if (spec.ctx) board.create('text', [(spec.lo + spec.hi) / 2, -52 * u, spec.ctx.name + (spec.ctx.unit ? ' (' + spec.ctx.unit + ')' : '')], { anchorX: 'middle', anchorY: 'middle', cssClass: 'axisname', highlightCssClass: 'axisname', fixed: true, highlight: false });

    objs = {};
    spec.points.forEach(function (p) {
      var colour = p.drag ? acc : ink;
      var x0 = p.fx ? function () { return p.fx(vars); } : p.drag && startAt[p.name] !== undefined ? startAt[p.name] : p.x;
      var P = board.create('point', [x0, 0], {
        name: p.name + (p.caption ? ' ' + p.caption : ''), size: p.drag ? 7 : 5, fillColor: colour, strokeColor: colour, highlightFillColor: colour, highlightStrokeColor: colour,
        fixed: !p.drag, showInfobox: false, label: { offset: [-8, 28], cssClass: 'ptlabel', highlightCssClass: 'ptlabel' },
      });
      if (p.drag) {
        P.on('drag', function () { if (P.Y() !== 0) P.moveTo([P.X(), 0]); report(true); });
        P.on('up', function () { var at = landing(P.X()); P.moveTo([at, 0]); B.moved = true; report(); });
      }
      objs[p.name] = P;
    });

    if (spec.sum) {
      var s = spec.sum, h = 0.9, gh = 1.85;
      var a = function () { return vars[s.a]; }, end = function () { return result(); }, ghostEnd = function () { return round(vars[s.a] + vars[s.b]); };
      var arrow = { strokeWidth: 3, lastArrow: { type: 2, size: 6 }, fixed: true, highlight: false };
      // the faint "adding b" jump, shown only when subtracting
      var showGhost = function () { return op === -1 && vars[s.b] !== 0; };
      ui.ghost = board.create('segment', [[a, gh], [ghostEnd, gh]], Object.assign({}, arrow, { strokeColor: muted, dash: 2, strokeWidth: 2 }));
      board.create('text', [function () { return (vars[s.a] + ghostEnd()) / 2; }, gh + 0.32, function () { return showGhost() ? 'adding ' + paren(vars[s.b]) + ' would go this way' : ''; }], { anchorX: 'middle', anchorY: 'middle', cssClass: 'nlnote', highlightCssClass: 'nlnote', fixed: true, highlight: false });
      board.create('segment', [[a, 0], [a, h]], { strokeColor: acc2, strokeWidth: 2, dash: 1, fixed: true, highlight: false });
      ui.jump = board.create('segment', [[a, h], [end, h]], Object.assign({}, arrow, { strokeColor: acc2 }));
      board.create('text', [function () { return (vars[s.a] + end()) / 2; }, h + 0.36, function () { var d = end() - vars[s.a]; return d === 0 ? 'no move' : (d > 0 ? 'right ' : 'left ') + show(Math.abs(d)); }], { anchorX: 'middle', anchorY: 'middle', cssClass: 'steplabel', highlightCssClass: 'steplabel', strokeColor: acc2, fixed: true, highlight: false });
      board.create('point', [a, 0], { name: '', size: 4, fillColor: acc2, strokeColor: acc2, fixed: true, showInfobox: false, highlight: false });
      board.create('point', [end, 0], { name: 'R', size: 6, fillColor: acc, strokeColor: acc, fixed: true, showInfobox: false, highlight: false, label: { offset: [-6, 22], cssClass: 'ptlabel', highlightCssClass: 'ptlabel' } });
    }
    board.update();
  }
  function landing(x) { var v = round(Math.round(x / spec.snapStep) * spec.snapStep); return Math.max(spec.lo, Math.min(spec.hi, v)); }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { sliders: [] };   // build() adds ghost and jump after this
    if (spec.sum) {
      ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'nlsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
      if (spec.sum.op === 0) {
        var row = document.createElement('div'); row.className = 'gbar nlops';
        [['+', 1, 'Add'], ['−', -1, 'Subtract']].forEach(function (o) {
          var b = document.createElement('button'); b.type = 'button'; b.textContent = o[0]; b.setAttribute('aria-label', o[2]); b.dataset.op = o[1];
          b.addEventListener('click', function () { op = o[1]; B.moved = true; B.jsxBoard.update(); report(); });
          row.appendChild(b);
        });
        panel.appendChild(row); ui.ops = row;
      }
    }
    spec.sliders.forEach(function (sl) {
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = sl.name; lab.htmlFor = 'sl-' + sl.name;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + sl.name + ' smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + sl.name; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[sl.name];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + sl.name + ' bigger');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, sl.min + Math.round((v - sl.min) / sl.step) * sl.step)); vars[sl.name] = round(v); r.value = v; B.moved = true; B.jsxBoard.update(); report(); };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars[sl.name] - sl.step); });
      plus.addEventListener('click', function () { set(vars[sl.name] + sl.step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row);
      ui.sliders.push({ sl: sl, out: out });
    });
    if (spec.cmp) { ui.cmp = document.createElement('p'); ui.cmp.className = 'rulework'; ui.cmp.id = 'nlcompare'; ui.cmp.setAttribute('aria-live', 'polite'); panel.appendChild(ui.cmp); }
    if (spec.sliders.length || spec.points.some(function (p) { return p.drag; }) || (spec.sum && spec.sum.op === 0)) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again';
      again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function compareText(sc) {
    var n1 = spec.cmp[0], n2 = spec.cmp[1], x1 = sc.points[n1][0], x2 = sc.points[n2][0];
    var lab = function (n) { var p = spec.points.filter(function (q) { return q.name === n; })[0]; return p && p.caption ? p.caption : n; };
    if (x1 === x2) return show(x1) + ' = ' + show(x2) + ': ' + lab(n1) + ' and ' + lab(n2) + ' are at the same place.';
    var less = x1 < x2 ? n1 : n2, more = x1 < x2 ? n2 : n1;
    return show(x1) + (x1 < x2 ? ' < ' : ' > ') + show(x2) + ': ' + lab(less) + ' is further left, so it is less than ' + lab(more) + '.';
  }

  function report(quiet) {
    var sc = scope(), parts = [];
    ui.sliders.forEach(function (s) { s.out.textContent = s.sl.name + ' = ' + show(vars[s.sl.name]); });
    if (spec.sum && ui.work) {
      var s = spec.sum, A = vars[s.a], Bv = vars[s.b], R = result();
      ui.work.textContent = show(A) + (op === 1 ? ' + ' : ' − ') + paren(Bv) + ' = ' + show(R);
      parts.push(ui.work.textContent);
      if (ui.ghost) ui.ghost.setAttribute({ visible: op === -1 && Bv !== 0 });
      if (ui.jump) ui.jump.setAttribute({ visible: R !== A });
      if (ui.ops) [].forEach.call(ui.ops.children, function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.op) === op)); });
    }
    if (ui.cmp) { ui.cmp.textContent = compareText(sc); parts.push(ui.cmp.textContent); }
    var dragged = spec.points.filter(function (p) { return p.drag; }).map(function (p) { return p.name + ' is at ' + withUnit(sc.points[p.name][0]); });
    spec.points.forEach(function (p) { parts.push(p.name + ' = ' + show(sc.points[p.name][0])); });
    B.say(dragged.join('. ') + (dragged.length ? '.' : ''));
    if (quiet) return;
    var at = {}; spec.points.forEach(function (p) { if (p.drag) at[p.name] = sc.points[p.name][0]; });
    B.save({ vars: vars, op: op, points: at });
    B.post({ scope: sc }, parts.join('; '));
  }

  B.widget('numberline', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A number line from ' + show(Number(String(s.range).split(',')[0]) || 0) + ' to ' + show(Number(String(s.range).split(',')[1]) || 0); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {}; startAt = (sv && sv.points) || {};
      spec.sliders.forEach(function (sl) { vars[sl.name] = sv && sv.vars && sv.vars[sl.name] !== undefined ? sv.vars[sl.name] : sl.start; });
      op = spec.sum ? (spec.sum.op === 0 ? (sv && sv.op) || 1 : spec.sum.op) : 1;
      paintPanel();
      build();
      report();
    },
    redraw: function () { var sc = scope(); startAt = {}; spec.points.forEach(function (p) { if (p.drag) startAt[p.name] = sc.points[p.name][0]; }); build(); report(); },
    resize: function () { var sc = scope(); startAt = {}; spec.points.forEach(function (p) { if (p.drag) startAt[p.name] = sc.points[p.name][0]; }); build(); report(true); },   // rebuilt, so ticks keep their pixel size
  });
})(WPB);
