// Graph: axes with sliders, plotted relations, points (fixed, dragged, or following the sliders), lines and a table.
//   widget: graph
//   x: -1, 10              x range (default -10, 10)
//   y: -1, 20              y range (default -10, 10)
//   grid: 1                grid spacing (default 1; "off" for none)
//   axes: d (km), T ($)    names for a context: the axes are labelled with them, and the legend, table and solution
//                          use the letters (T = 2d + 4). Plots, points and checks still use x and y.
//   snap: 1                dragged points land on multiples of this (default the grid spacing, or 1); snap: 1, 5 for x, y
//   slider m: 0, 5, 2      a named value: min, max, start, step (default step 1); names are single letters
//   plot: y = mx + c       a relation y = (an expression in x and the sliders); up to 4
//   plot: y = 2x + 1, dashed   a dashed line (for a line to compare with)
//   plot: y = 5x + 20, from 0  only from x = 0 (and/or "to 10"): where a model makes sense
//   point A: 2, 5          a fixed point; coordinates may use sliders (point B: 0, c)
//   point P: 1, 3, drag    a point students drag (it snaps)
//   segment: A, B          a segment between two points;   line: A, B   the whole line through them
//   table: 0, 1, 2, 3      a table of values of each plot at these x values
//   step: 1                the "1 right, m up" triangle on the first plot, from this x (shows how steep it is)
//   cross: 1, 2            where plots 1 and 2 meet: a point, its coordinates, and a dashed line down to x (the solution)
// state: { scope: { vars: { m, c }, points: { A: [x, y] } } }   (checks are conditions on the scope)
(function (B) {
  'use strict';
  var spec = null, vars = {}, startAt = {}, objs = {}, dragged = {}, sliders = [], plots = [];
  var fmt = B.fmt;
  var show = function (n) { return fmt(n).replace(/^-/, '−'); };   // for display: a real minus sign
  var COLOURS = ['--left', '--right', '--accent', '--ok'];
  var nums = function (v, n, what) {
    var a = String(v).split(',').map(function (t) { return t.trim(); });
    if (a.length < n) throw new Error(what + ' needs ' + n + ' numbers separated by commas.');
    return a;
  };
  var num = function (t, what) { var v = WPM.evaluate(t, {}); if (!isFinite(v)) throw new Error(what + ': "' + t + '" is not a number.'); return v; };
  // A step for axis labels: about 8 labels across the range, at 1, 2 or 5 × a power of 10.
  var nice = function (span) { var r = span / 8, p = Math.pow(10, Math.floor(Math.log10(r))), m = r / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; };

  // y = 2x + -3  ->  y = 2x − 3; 1x -> x; 0x terms dropped. For showing a relation with the slider values in it.
  // In a context (axes: d, T), x and y are shown as its letters: y = 2x + 4 -> T = 2d + 4.
  function named(t) { return spec.names.x === 'x' && spec.names.y === 'y' ? t : t.replace(/[xy]/g, function (ch) { return ch === 'x' ? spec.names.x : spec.names.y; }); }
  function withValues(expr) {
    var s = expr.replace(/\s+/g, ' ').trim();
    // Every letter is a name (2mx is 2 × m × x), so each slider's letter is replaced wherever it appears.
    s = s.replace(/[A-Za-z]/g, function (n) { if (!(n in vars)) return n; var v = vars[n]; return v < 0 ? '(-' + fmt(-v) + ')' : fmt(v); });
    s = s.replace(/\*/g, '').replace(/(\d)\s+(?=[a-z(])/g, '$1');
    s = s.replace(/^\(-([\d.]+)\)/, '-$1').replace(/\+\s*\(-([\d.]+)\)/g, '- $1').replace(/-\s*\(-([\d.]+)\)/g, '+ $1');
    s = s.replace(/(^|[^\d.])1(?=[a-z(])/g, '$1');
    s = s.replace(/(^|[+-]\s*)0[a-z](\^\d+)?\s*/g, '$1').replace(/^\s*[+]\s*/, '').replace(/[+-]\s*0(?![\d.])\s*/g, '').trim();
    s = s.replace(/^-\s*/, '−').replace(/\s*-\s*/g, ' − ').replace(/\s*\+\s*/g, ' + ').replace(/^\s*$/, '0');
    return s;
  }

  function parse(s) {
    var g = s.grid === undefined ? 1 : s.grid;
    s.gridStep = /^off$/i.test(g) ? 0 : num(g, 'grid');
    // snap: one step for both axes, or "snap: 1, 5" for x and y separately (a tall y range needs bigger steps).
    var sn = s.snap !== undefined ? String(s.snap).split(',').map(function (t) { return num(t.trim(), 'snap'); }) : [s.gridStep || 1];
    s.snapStep = [sn[0], sn.length > 1 ? sn[1] : sn[0]];
    s.xr = nums(s.x || '-10, 10', 2, 'x').map(function (t) { return num(t, 'x'); });
    s.yr = nums(s.y || '-10, 10', 2, 'y').map(function (t) { return num(t, 'y'); });
    if (!(s.xr[0] < s.xr[1]) || !(s.yr[0] < s.yr[1])) throw new Error('x: and y: need the smaller number first.');
    s.names = { x: 'x', y: 'y' }; s.axisLabels = ['x', 'y'];
    if (s.axes) {
      var an = s.axes.split(',').map(function (t) { return t.trim(); });
      if (an.length !== 2 || an.some(function (t) { return !/^[A-Za-z](\s|$)/.test(t); })) throw new Error('axes: needs two names that each start with one letter, such as "axes: d (km), T ($)".');
      s.names = { x: an[0][0], y: an[1][0] }; s.axisLabels = an;
    }
    s.sliders = []; s.plots = []; s.points = []; s.lines = []; s.table = null; s.step = null; s.cross = null;
    var known = {};
    s.items.forEach(function (it) {
      var where = 'Line ' + it.line + ' (' + it.kind + (it.name ? ' ' + it.name : '') + ')';
      if (it.kind === 'slider') {
        if (!/^[a-z]$/.test(it.name || '')) throw new Error(where + ': a slider needs a one-letter lower-case name, such as "slider m: 0, 5, 2".');
        if (it.name === 'x' || it.name === 'y' || it.name === s.names.x || it.name === s.names.y) throw new Error(where + ': ' + it.name + ' names an axis; name the slider something else.');
        var a = nums(it.value, 3, where).map(function (t) { return num(t, where); });
        if (!(a[0] < a[1]) || a[2] < a[0] || a[2] > a[1]) throw new Error(where + ': needs min, max, start with min < max and start between them.');
        s.sliders.push({ name: it.name, min: a[0], max: a[1], start: a[2], step: a[3] || 1 });
        known[it.name] = 1;
      } else if (it.kind === 'plot') {
        // After the relation, comma-separated options: dashed, from N, to N.
        var bits = it.value.split(','), rel = bits.shift(), dashed = false, from = null, to = null;
        bits.forEach(function (b) {
          var t = b.trim(), mm;
          if (/^dashed$/i.test(t)) dashed = true;
          else if ((mm = /^from\s+(.+)$/i.exec(t))) from = num(mm[1], where);
          else if ((mm = /^to\s+(.+)$/i.exec(t))) to = num(mm[1], where);
          else throw new Error(where + ': after the relation, use dashed, from N or to N (got "' + t + '").');
        });
        var m = /^\s*y\s*=\s*(.+)$/.exec(rel);
        if (!m) throw new Error(where + ': write the relation as "y = …", such as "plot: y = 2x + 1".');
        s.plots.push({ name: it.name, text: rel.trim(), rhs: m[1], tree: WPM.compile(m[1]), dashed: dashed, from: from, to: to });
      } else if (it.kind === 'point') {
        if (!/^[A-Z]$/.test(it.name || '')) throw new Error(where + ': a point needs a one-letter capital name, such as "point A: 2, 5".');
        var p = nums(it.value, 2, where), drag = /^drag$/i.test(p[2] || '');
        if (p[2] && !drag) throw new Error(where + ': the third part can only be "drag".');
        s.points.push({ name: it.name, x: p[0], y: p[1], drag: drag, fx: WPM.compile(p[0]), fy: WPM.compile(p[1]) });
      } else if (it.kind === 'segment' || it.kind === 'line') {
        var e = it.value.split(',').map(function (t) { return t.trim(); });
        if (e.length !== 2) throw new Error(where + ': name two points, such as "' + it.kind + ': A, B".');
        s.lines.push({ kind: it.kind, ends: e, where: where });
      } else if (it.kind === 'cross') {
        var ab = it.value.split(',').map(function (t) { return Number(t.trim()); });
        if (ab.length !== 2 || ab.some(function (n) { return !(n >= 1) || n % 1; })) throw new Error(where + ': name two plots by number, such as "cross: 1, 2".');
        s.cross = ab;
      } else if (it.kind === 'step') {
        s.step = num(it.value, where);
      } else if (it.kind === 'table') {
        s.table = it.value.split(',').map(function (t) { return num(t.trim(), where); });
      }
    });
    if (s.plots.length > 4) throw new Error('A graph shows at most 4 plots.');
    var names = s.points.map(function (p) { return p.name; });
    s.lines.forEach(function (l) { l.ends.forEach(function (n) { if (names.indexOf(n) < 0) throw new Error(l.where + ': there is no point ' + n + '.'); }); });
    // Every name used in a plot or point must be x or a slider (dragged points take numbers only).
    var check = function (text, allowed, where) {
      WPM.vars(text).forEach(function (v) { if (allowed.indexOf(v) < 0 && !known[v]) throw new Error(where + ': "' + v + '" is not a slider' + (allowed.length ? ' or x' : '') + '.'); });
    };
    s.plots.forEach(function (p) { check(p.rhs, ['x'], 'plot ' + p.text); });
    s.points.forEach(function (p) {
      if (p.drag) { num(p.x, 'point ' + p.name); num(p.y, 'point ' + p.name); } else { check(p.x, [], 'point ' + p.name); check(p.y, [], 'point ' + p.name); }
    });
    if (s.table && !s.plots.length) throw new Error('A table needs a plot to take its values from.');
    if (s.step !== null && !s.plots.length) throw new Error('A step needs a plot to draw on.');
    if (s.cross && Math.max(s.cross[0], s.cross[1]) > s.plots.length) throw new Error('cross: names plot ' + Math.max(s.cross[0], s.cross[1]) + ', but there are ' + s.plots.length + ' plots.');
  }

  function scope() {
    var p = {};
    Object.keys(objs).forEach(function (n) { p[n] = dragged[n] ? landing(objs[n]) : [round(objs[n].X()), round(objs[n].Y())]; });
    return { vars: Object.assign({}, vars), points: p };
  }
  var round = function (v) { return Math.round(v * 1e6) / 1e6; };

  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#e4e1da';
    var xr = spec.xr, yr = spec.yr;
    var board = B.jsx({ boundingbox: [xr[0], yr[1], xr[1], yr[0]] });
    if (spec.gridStep) board.create('grid', [], { majorStep: [spec.gridStep, spec.gridStep], minorElements: 0, strokeColor: line, strokeOpacity: 1, highlight: false });
    var axis = function (p1, p2, span, which) {
      var name = spec.axisLabels[which === 'x' ? 0 : 1];
      return board.create('axis', [p1, p2], {
        name: name, withLabel: true, strokeColor: muted, highlight: false, lastArrow: { size: 6 }, fixed: true,
        label: { position: which === 'x' ? 'rt' : 'urt', offset: which === 'x' ? [-14 - (name.length - 1) * 6, 14] : [10, -8], cssClass: 'axisname', highlightCssClass: 'axisname', strokeColor: ink },
        ticks: { ticksDistance: spec.gridStep ? Math.max(nice(span), spec.gridStep) : nice(span), insertTicks: false, minorTicks: 0, majorHeight: 8, strokeColor: muted, drawZero: false, label: { cssClass: 'ticklabel', highlightCssClass: 'ticklabel', strokeColor: muted } },
      });
    };
    axis([0, 0], [1, 0], xr[1] - xr[0], 'x');
    axis([0, 0], [0, 1], yr[1] - yr[0], 'y');
    var scopeVars = function (x) { var v = Object.assign({}, vars); if (x !== undefined) v.x = x; return v; };
    plots = spec.plots.map(function (p, i) {
      var colour = B.css(COLOURS[i]) || '#2f6fb3';
      p.colour = colour;
      return board.create('functiongraph', [function (x) { try { return p.tree(scopeVars(x)); } catch (e) { return NaN; } }, p.from !== null ? Math.max(p.from, xr[0]) : xr[0], p.to !== null ? Math.min(p.to, xr[1]) : xr[1]], { strokeColor: colour, strokeWidth: p.dashed ? 2.5 : 3, dash: p.dashed ? 2 : 0, highlight: false, fixed: true });
    });
    objs = {}; dragged = {};
    spec.points.forEach(function (p) {
      var coords = p.drag ? (startAt[p.name] || [num(p.x), num(p.y)]) : [function () { return p.fx(scopeVars()); }, function () { return p.fy(scopeVars()); }];
      var colour = p.drag ? (B.css('--accent') || '#c2570a') : ink;
      objs[p.name] = board.create('point', coords, {
        name: p.name, size: p.drag ? 6 : 4, fillColor: colour, strokeColor: colour, highlightFillColor: colour, highlightStrokeColor: colour,
        fixed: !p.drag, showInfobox: false,
        label: { cssClass: 'ptlabel', highlightCssClass: 'ptlabel', strokeColor: ink, offset: [8, 10] },
      });
      if (p.drag) {
        dragged[p.name] = true;
        objs[p.name].on('drag', function () { B.moved = true; report(true); });   // reported to the lesson when let go
        // Land where the pointer was let go (plus where on the point it was grabbed), so a quick flick does not
        // leave the point at its last drawn position, a square short.
        var grab = null, P = objs[p.name];
        P.on('down', function (e) { try { var u = board.getUsrCoordsOfMouse(e); grab = [P.X() - u[0], P.Y() - u[1]]; } catch (er) { grab = null; } });
        P.on('up', function (e) {
          try { if (grab) { var u = board.getUsrCoordsOfMouse(e); P.moveTo([u[0] + grab[0], u[1] + grab[1]]); } } catch (er) { /* keep the drawn position */ }
          grab = null; settle(P); report();
        });
      }
    });
    spec.lines.forEach(function (l) {
      board.create(l.kind, [objs[l.ends[0]], objs[l.ends[1]]], { strokeColor: muted, strokeWidth: 2, highlight: false, fixed: true, dash: l.kind === 'line' ? 0 : 0 });
    });
    // The step triangle: 1 to the right along the bottom, then up (or down) by however much y changes.
    if (spec.step !== null) {
      var f = function (x) { try { return spec.plots[0].tree(scopeVars(x)); } catch (e) { return NaN; } };
      var x0 = spec.step, acc = B.css('--accent') || '#c2570a';
      var hid = { visible: false, withLabel: false, fixed: true };
      var A = board.create('point', [x0, function () { return f(x0); }], hid);
      var Bp = board.create('point', [x0 + 1, function () { return f(x0); }], hid);
      var C = board.create('point', [x0 + 1, function () { return f(x0 + 1); }], hid);
      var seg = { strokeColor: acc, strokeWidth: 2.5, dash: 2, highlight: false, fixed: true };
      board.create('segment', [A, Bp], seg);
      board.create('segment', [Bp, C], seg);
      var lab = { cssClass: 'steplabel', highlightCssClass: 'steplabel', strokeColor: acc, highlightStrokeColor: acc, fixed: true, anchorX: 'middle' };
      board.create('text', [x0 + 0.5, function () { return f(x0); }, '1'], Object.assign({}, lab, { anchorY: 'top' }));
      board.create('text', [x0 + 1 + (spec.xr[1] - spec.xr[0]) * 0.015, function () { return (f(x0) + f(x0 + 1)) / 2; }, function () { var d = f(x0 + 1) - f(x0); return Math.abs(d) < 1e-9 ? '' : (d > 0 ? 'up ' : 'down ') + show(Math.abs(d)); }],
        Object.assign({}, lab, { anchorX: 'left', anchorY: 'middle' }));
    }
    // Where two plots meet (found numerically, so any two relations work): a point, its coordinates, and a dashed
    // line down to the x-axis, where the solution is read. Nothing is drawn when they do not meet in view (parallel lines).
    if (spec.cross) {
      var g1 = spec.plots[spec.cross[0] - 1], g2 = spec.plots[spec.cross[1] - 1];
      var meet = function () {
        var d = function (x) { try { return g1.tree(scopeVars(x)) - g2.tree(scopeVars(x)); } catch (e) { return NaN; } };
        var lo0 = Math.max(spec.xr[0], g1.from !== null ? g1.from : -Infinity, g2.from !== null ? g2.from : -Infinity);
        var hi0 = Math.min(spec.xr[1], g1.to !== null ? g1.to : Infinity, g2.to !== null ? g2.to : Infinity);
        if (!(lo0 < hi0)) return null;
        var a = lo0, n = 400, h = (hi0 - a) / n, pa = d(a);   // scan for a change of sign, then halve
        for (var i = 1; i <= n; i++) {
          if (Math.abs(pa) < 1e-12) return [round(a), round(g1.tree(scopeVars(a)))];
          var bx = a + h, pb = d(bx);
          if (isFinite(pa) && isFinite(pb) && pa * pb < 0) {
            var lo = a, hi = bx;
            for (var k = 0; k < 60; k++) { var mid = (lo + hi) / 2; if (d(lo) * d(mid) <= 0) hi = mid; else lo = mid; }
            var x = round((lo + hi) / 2); return [x, round(g1.tree(scopeVars(x)))];
          }
          a = bx; pa = pb;
        }
        return Math.abs(pa) < 1e-12 ? [round(a), round(g1.tree(scopeVars(a)))] : null;
      };
      var cache = null;
      var acc2 = B.css('--ok') || '#1a7f37';
      var X = board.create('point', [function () { cache = meet(); return cache ? cache[0] : NaN; }, function () { cache = meet(); return cache ? cache[1] : NaN; }],
        { name: '', size: 5, fillColor: acc2, strokeColor: acc2, fixed: true, highlight: false, showInfobox: false });
      var foot = board.create('point', [function () { return cache ? cache[0] : NaN; }, 0], { visible: false, fixed: true, withLabel: false });
      board.create('segment', [X, foot], { strokeColor: acc2, strokeWidth: 2, dash: 2, highlight: false, fixed: true });
      var cl = { cssClass: 'crosslabel', highlightCssClass: 'crosslabel', strokeColor: acc2, highlightStrokeColor: acc2, fixed: true };
      var dx = (spec.xr[1] - spec.xr[0]) * 0.02, dy = (spec.yr[1] - spec.yr[0]) * 0.03;
      board.create('text', [function () { return cache ? cache[0] + dx : NaN; }, function () { return cache ? cache[1] + dy : NaN; }, function () { return cache ? '(' + show(cache[0]) + ', ' + show(cache[1]) + ')' : ''; }],
        Object.assign({ anchorX: 'left', anchorY: 'bottom' }, cl));
      // Below the axis's own number labels (or above the axis when the crossing is below it).
      var roomBelow = -dy * 2.2 > spec.yr[0] + dy * 0.3;   // when the x-axis sits at the bottom, write it just above instead
      board.create('text', [function () { return cache ? cache[0] + (roomBelow ? 0 : dx) : NaN; }, function () { return cache && (cache[1] < 0 || !roomBelow) ? dy * 1.5 : -dy * 2.2; }, function () { return cache ? spec.names.x + ' = ' + show(cache[0]) : ''; }],
        Object.assign({ anchorX: roomBelow ? 'middle' : 'left', anchorY: roomBelow ? 'top' : 'bottom' }, cl));
    }
    board.update();
  }
  // A dragged point lands on the nearest multiple of snap, inside the axes. (Done here, not with JSXGraph's
  // snapToGrid, which can land a square away from the pointer when dragging upwards.)
  // While dragging, the point follows the pointer and reports where it will land; on release it moves there.
  function landing(P) {
    var near = function (v, st) { return round(Math.round(v / st) * st); };
    return [Math.max(spec.xr[0], Math.min(spec.xr[1], near(P.X(), spec.snapStep[0]))), Math.max(spec.yr[0], Math.min(spec.yr[1], near(P.Y(), spec.snapStep[1])))];
  }
  function settle(P) { var at = landing(P); if (at[0] !== P.X() || at[1] !== P.Y()) P.moveTo(at); }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    sliders = spec.sliders.map(function (sl) {
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = sl.name; lab.htmlFor = 'sl-' + sl.name;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + sl.name + ' smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + sl.name; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[sl.name];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + sl.name + ' bigger');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var set = function (v) {
        v = Math.max(sl.min, Math.min(sl.max, sl.min + Math.round((v - sl.min) / sl.step) * sl.step));   // steps counted from the minimum
        vars[sl.name] = round(v); r.value = v; B.moved = true; B.jsxBoard.update(); report();
      };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars[sl.name] - sl.step); });
      plus.addEventListener('click', function () { set(vars[sl.name] + sl.step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row);
      return { sl: sl, out: out };
    });
    if (spec.plots.length) { var lg = document.createElement('ul'); lg.id = 'legend'; panel.appendChild(lg); }
    if (spec.table) { var tb = document.createElement('table'); tb.id = 'gtable'; panel.appendChild(tb); }
    if (spec.sliders.length || spec.points.some(function (p) { return p.drag; })) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again';
      again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
    }
  }

  // quiet: update the board's own text but tell the lesson nothing yet (a point in the middle of a drag).
  function report(quiet) {
    sliders.forEach(function (s) { s.out.textContent = s.sl.name + ' = ' + show(vars[s.sl.name]); });
    var lg = B.el('legend');
    if (lg) {
      lg.replaceChildren();
      spec.plots.forEach(function (p) {
        var li = document.createElement('li'); li.style.setProperty('--c', p.colour); if (p.dashed) li.className = 'dashed';
        li.textContent = named(spec.names.y + ' = ' + withValues(p.rhs));
        if (WPM.vars(p.rhs).some(function (v) { return v in vars; })) {   // the general form, for a rule with sliders in it
          var gen = document.createElement('span'); gen.textContent = named(p.text); li.appendChild(gen); }
        lg.appendChild(li);
      });
    }
    var tb = B.el('gtable');
    if (tb) {
      var row = function (head, cells, th) {
        var tr = document.createElement('tr'), h = document.createElement('th'); h.textContent = head; tr.appendChild(h);
        cells.forEach(function (c) { var d = document.createElement(th ? 'th' : 'td'); d.textContent = c; tr.appendChild(d); }); return tr;
      };
      tb.replaceChildren(row(spec.names.x, spec.table.map(show), true));
      spec.plots.forEach(function (p, i) {
        tb.appendChild(row(spec.plots.length > 1 ? spec.names.y + ' (' + (i + 1) + ')' : spec.names.y, spec.table.map(function (x) { try { return show(p.tree(Object.assign({}, vars, { x: x }))); } catch (e) { return '—'; } })));
      });
    }
    var sc = scope(), parts = [];
    spec.sliders.forEach(function (s) { parts.push(s.name + ' = ' + show(vars[s.name])); });
    spec.points.forEach(function (p) { var c = sc.points[p.name]; parts.push(p.name + ' (' + show(c[0]) + ', ' + show(c[1]) + ')'); });
    var dragged = spec.points.filter(function (p) { return p.drag; }).map(function (p) { return p.name + ' is at (' + show(sc.points[p.name][0]) + ', ' + show(sc.points[p.name][1]) + ')'; });
    B.say(dragged.join('. ') + (dragged.length ? '.' : ''));
    if (quiet) return;
    B.save({ vars: vars, points: sc.points });
    B.post({ scope: sc }, parts.join('; '));
  }

  B.widget('graph', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A graph' + (s.plots.length ? ' of ' + s.plots.map(function (p) { return p.text; }).join(' and ') : ''); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var s = fresh ? null : B.saved();
      vars = {}; startAt = (s && s.points) || {};
      spec.sliders.forEach(function (sl) { vars[sl.name] = s && s.vars && s.vars[sl.name] !== undefined ? s.vars[sl.name] : sl.start; });
      paintPanel();
      build();
      report();
    },
    redraw: function () { startAt = scope().points; build(); report(); },
    resize: function () { var b = B.jsxBoard; b.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); b.setBoundingBox([spec.xr[0], spec.yr[1], spec.xr[1], spec.yr[0]], false); },
  });
})(WPB);
