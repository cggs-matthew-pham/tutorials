// Area: a parallelogram, triangle or rectangle on a grid of unit squares, with its base and perpendicular height marked,
// so A = bh and A = ½bh can be seen, not just used. The top (a parallelogram's top-left corner, a triangle's apex) slides
// along a line parallel to the base: the area does not change. A parallelogram can be cut and the piece moved to make a
// rectangle; a triangle can be doubled with a turned copy to make a parallelogram.
//   widget: area
//   shape: parallelogram     or triangle, rectangle
//   slider b: 1, 10, 6       the base (or fixed "b: 6")
//   slider h: 1, 8, 4        the perpendicular height (or fixed)
//   slider s: -3, 9, 2       how far along the top sits (a parallelogram's top-left corner or a triangle's apex),
//                            from the left end of the base (or fixed; default 2 for a parallelogram, b ÷ 2 for a triangle)
//   cut: on                  a parallelogram's "Cut and move" button, or a triangle's "Add a turned copy";
//                            "cut: shown" starts that way (pictures)
//   slant: on                also label the left slanted side's length (it is not the height)
//   units: cm                lengths in cm, areas in cm²
//   drag: on                 the top can be dragged along its line too (default on when s has a slider)
// state: { scope: { vars: { b, h, s, a (area), l (the left slanted side, 2 dp), c (1 while cut or copied),
//   o (1 when the height falls outside the base, as in an obtuse triangle) } } }
// Checks: "a = 24", "b = 8 and h = 3", "c = 1", "s = 0" (a right angle), "o = 1".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {}, cut = false;
  var NAMES = ['b', 'h', 's'];
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.kind = String(s.shape || 'parallelogram').trim().toLowerCase();
    if (['parallelogram', 'triangle', 'rectangle'].indexOf(s.kind) < 0) throw new Error('shape: parallelogram, triangle or rectangle.');
    s.sl = {}; s.fixed = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the area board has sliders b (base), h (height) and s (where the top sits) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    NAMES.forEach(function (n) { if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fixed[n] = nums(s[n], n)[0]; } });
    ['b', 'h'].forEach(function (n) { if (!s.sl[n] && s.fixed[n] === undefined) throw new Error(n + ': needs a slider or a value.'); });
    var lo = function (n) { return s.sl[n] ? s.sl[n].min : s.fixed[n]; }, hi = function (n) { return s.sl[n] ? s.sl[n].max : s.fixed[n]; };
    if (lo('b') <= 0 || lo('h') <= 0) throw new Error('b and h: more than 0.');
    if (hi('b') > 16 || hi('h') > 12) throw new Error('b up to 16 and h up to 12.');
    if (s.kind === 'rectangle') { if (s.sl.s) throw new Error('A rectangle has no s.'); s.fixed.s = 0; }
    if (s.fixed.s === undefined && !s.sl.s) s.fixed.s = s.kind === 'triangle' ? null : 2;   // triangle: b/2, set at start
    s.cutOn = /^(on|shown)$/i.test(s.cut || ''); s.cutShown = /^shown$/i.test(s.cut || '');
    if (s.cutOn && s.kind === 'rectangle') throw new Error('cut: for a parallelogram or a triangle.');
    s.slant = /^on$/i.test(s.slant || '');
    s.u = s.units ? String(s.units).trim() : '';
    s.drag = s.drag === undefined ? !!s.sl.s : /^on$/i.test(s.drag);
    // a fixed frame, so the grid does not jump as sliders move
    var sMin = s.sl.s ? s.sl.s.min : s.fixed.s === null ? 0 : s.fixed.s, sMax = s.sl.s ? s.sl.s.max : s.fixed.s === null ? hi('b') : s.fixed.s;
    var right = s.kind === 'triangle' ? Math.max(hi('b'), sMax, s.cutOn ? hi('b') + sMax : 0) : hi('b') + Math.max(0, sMax);
    s.frame = { x0: Math.floor(Math.min(0, sMin)) - 1, x1: Math.ceil(right) + 1, y1: Math.ceil(hi('h')) + 1 };
  }
  var L = function (v) { return B.fmt(r2(v)) + (spec.u ? ' ' + spec.u : ''); };
  var A = function (v) { return B.fmt(r2(v)) + (spec.u ? ' ' + spec.u + '²' : ' square units'); };

  function corners() {
    var b = vars.b, h = vars.h, s = vars.s;
    if (spec.kind === 'triangle') return [[0, 0], [b, 0], [s, h]];
    return [[0, 0], [b, 0], [b + s, h], [s, h]];
  }
  function canCut() { return spec.kind === 'triangle' || Math.abs(vars.s) <= vars.b + 1e-9; }

  function build() {
    var ink = B.css('--ink') || '#1d2430', line = B.css('--line') || '#e4e1da', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var F = spec.frame, board = B.jsx({ boundingbox: [F.x0 - 0.6, F.y1 + 0.4, F.x1 + 0.2, -1.6], keepAspectRatio: true });
    var fx = { fixed: true, highlight: false };
    for (var x = F.x0; x <= F.x1; x++) board.create('segment', [[x, 0], [x, F.y1]], Object.assign({ strokeColor: line, strokeWidth: 1 }, fx));
    for (var y = 0; y <= F.y1; y++) board.create('segment', [[F.x0, y], [F.x1, y]], Object.assign({ strokeColor: line, strokeWidth: 1 }, fx));
    var b = vars.b, h = vars.h, s = vars.s;
    var poly = function (pts, fill, op, dash, w) { return board.create('polygon', pts, Object.assign({ fillColor: fill, fillOpacity: op, borders: { strokeColor: dash ? fill : ink, strokeWidth: w || 2.5, dash: dash ? 2 : 0, highlight: false }, vertices: { visible: false } }, fx)); };
    var txt = function (x, y, t, col, ax, ay, size) { board.create('text', [x, y, t], Object.assign({ anchorX: ax || 'middle', anchorY: ay || 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: size || 15 }, fx)); };
    var P = corners();
    if (cut && spec.kind === 'parallelogram' && canCut()) {
      // the piece left of the cut moves b to the right; what is left is a b by h rectangle
      var piece = s >= 0 ? [[0, 0], [s, 0], [s, h]] : [[s, h], [0, h], [0, 0]];
      var moved = piece.map(function (p) { return [p[0] + b, p[1]]; });
      poly(piece, muted, 0.06, true, 1.5);
      poly(s >= 0 ? [[s, 0], [b, 0], [b + s, h], [s, h]] : [[0, 0], [b, 0], [b + s, h], [0, h]], blue, 0.28);
      poly(moved, orange, 0.32);
    } else {
      poly(P, blue, 0.28);
      if (cut && spec.kind === 'triangle') poly([[b, 0], [b + s, h], [s, h]], orange, 0.22, true, 2);
    }
    // base (extended dashed when the height falls outside it) and perpendicular height
    var lo = Math.min(0, s), hi2 = Math.max(b, s);
    if (spec.kind !== 'rectangle' && (s < 0 || s > b)) board.create('segment', [[lo, 0], [hi2, 0]], Object.assign({ strokeColor: muted, strokeWidth: 1.5, dash: 2 }, fx));
    var hx = spec.kind === 'rectangle' ? b : s;
    if (spec.kind !== 'rectangle') board.create('segment', [[hx, 0], [hx, h]], Object.assign({ strokeColor: orange, strokeWidth: 2.5, dash: 3 }, fx));
    var q = 0.3, side = hx >= b - 1e-9 ? -1 : 1;
    board.create('polygon', [[hx, 0], [hx + side * q, 0], [hx + side * q, q], [hx, q]], Object.assign({ fillOpacity: 0, borders: { strokeColor: orange, strokeWidth: 1.5, highlight: false }, vertices: { visible: false } }, fx));
    txt(b / 2, -0.55, 'base ' + L(b), ink);
    txt(hx + 0.2, h / 2, 'height ' + L(h), orange, 'left');
    if (spec.slant && spec.kind !== 'rectangle' && Math.abs(s) > 1e-9) txt(s / 2 - 0.25, h / 2 + 0.3, L(Math.hypot(s, h)), muted, 'right');
    if (spec.drag && spec.sl.s) {
      var top = board.create('point', [spec.kind === 'triangle' ? s : s, h], { name: '', size: 6, fillColor: orange, strokeColor: '#fff', strokeWidth: 2, showInfobox: false });
      top.on('drag', function () { if (Math.abs(top.Y() - h) > 1e-9) top.moveTo([top.X(), h]); });
      top.on('up', function () { var sl = spec.sl.s, v = Math.max(sl.min, Math.min(sl.max, Math.round((top.X() - sl.min) / sl.step) * sl.step + sl.min)); setTimeout(function () { setVar('s', v); }, 0); });
    }
    board.update();
  }

  function setVar(n, v) {
    var sl = spec.sl[n]; v = Math.max(sl.min, Math.min(sl.max, r2(sl.min + Math.round((v - sl.min) / sl.step) * sl.step)));
    vars[n] = v; if (ui.ranges[n]) ui.ranges[n].value = v; B.moved = true; build(); report();
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [], ranges: {} };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var label = { b: 'the base', h: 'the height', s: 'where the top sits' };
    NAMES.forEach(function (n) {
      var sl = spec.sl[n]; if (!sl) return;
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', n === 's' ? 'Move the top left' : 'Make ' + label[n] + ' smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', n === 's' ? 'Move the top right' : 'Make ' + label[n] + ' bigger');
      var out = document.createElement('output'); out.htmlFor = r.id;
      r.addEventListener('input', function () { setVar(n, Number(r.value)); });
      minus.addEventListener('click', function () { setVar(n, vars[n] - sl.step); });
      plus.addEventListener('click', function () { setVar(n, vars[n] + sl.step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row); ui.outs.push({ n: n, out: out }); ui.ranges[n] = r;
    });
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.cutOn) {
      ui.cut = document.createElement('button'); ui.cut.type = 'button';
      ui.cut.addEventListener('click', function () { if (!canCut()) return; cut = !cut; B.moved = true; build(); report(); });
      bar.appendChild(ui.cut);
    }
    if (Object.keys(spec.sl).length || spec.cutOn) {
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again);
    }
    if (bar.children.length) panel.appendChild(bar);
  }

  function report() {
    var b = vars.b, h = vars.h, s = vars.s, tri = spec.kind === 'triangle';
    if (cut && !canCut()) cut = false;
    var a = r2(tri ? b * h / 2 : b * h), l = r2(Math.hypot(s, h)), o = spec.kind !== 'rectangle' && (s < -1e-9 || s > b + 1e-9) ? 1 : 0;
    ui.outs.forEach(function (x) { x.out.textContent = x.n + ' = ' + B.fmt(vars[x.n]); });
    if (ui.cut) { ui.cut.textContent = tri ? (cut ? 'Remove the copy' : 'Add a turned copy') : (cut ? 'Put the piece back' : 'Cut and move'); ui.cut.disabled = !canCut(); ui.cut.setAttribute('aria-pressed', String(cut)); }
    ui.work.textContent = tri ? '½ × ' + B.fmt(b) + ' × ' + B.fmt(h) + ' = ' + A(a) : B.fmt(b) + ' × ' + B.fmt(h) + ' = ' + A(a);
    var note;
    if (tri) note = cut ? 'Two copies make a parallelogram, ' + B.fmt(b) + ' × ' + B.fmt(h) + ' = ' + B.fmt(r2(b * h)) + '. The triangle is half of it.' : o ? 'The height falls outside the base: extend the base to meet it.' : 'A triangle is half of a parallelogram with the same base and height.';
    else if (spec.kind === 'parallelogram') note = cut ? 'The cut-off piece fills the gap: a ' + B.fmt(b) + ' by ' + B.fmt(h) + ' rectangle.' : !canCut() ? 'Too slanted for one cut: move the top back a little to cut it.' : Math.abs(s) < 1e-9 ? 'With the top straight above, it is a rectangle.' : 'Sliding the top along keeps the base and the height, so the area stays the same.';
    else note = B.fmt(h) + ' rows of ' + B.fmt(b) + ' unit squares.';
    if (spec.slant && Math.abs(s) > 1e-9 && spec.kind !== 'rectangle') note += ' The slanted side is ' + L(l) + ': longer than the height.';
    ui.note.textContent = note;
    B.say(ui.work.textContent + '. ' + note);
    B.save({ vars: vars, cut: cut });
    B.post({ scope: { vars: { b: b, h: h, s: s, a: a, l: l, c: cut ? 1 : 0, o: o }, points: {} } }, ui.work.textContent + '. ' + note);
  }

  B.widget('area', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A ' + (s.shape || 'parallelogram') + ' on a grid, with its base and height marked'; },
    parse: parse,
    resize: function () { if (spec) build(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      NAMES.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      if (vars.s === null) vars.s = vars.b / 2;
      cut = sv ? !!sv.cut : spec.cutShown;
      paintPanel(); build(); report();
    },
  });
})(WPB);
