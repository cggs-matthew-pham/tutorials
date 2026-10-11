// Nets: a flat pattern that folds into a solid.
//   widget: net
//   mode: cube | prism
// cube: students click squares on a grid to build a net, and the board folds it by rolling a cube over the squares: each
//   square lands on one face (colour and name), and the net works only if all six faces are covered exactly once.
//   cells: 1,0; 0,1; 1,1; 2,1; 3,1; 1,2   the starting squares, x,y with y going down (default: a cross)
//   grid: 6, 4                             squares across and down (default 6, 4)
//   state vars: c (squares), f (1 if it folds into a cube, else 0), d (different faces covered)
//   Checks: "f = 1", "c = 6 and f = 0", "f = 1 and c = 6".
// prism: a net of a prism whose base is a right triangle with legs a and b (hypotenuse c) and length L.
//   slider a: 1, 6, 3     slider b: 1, 6, 4     slider L: 1, 6, 3   (min, max, start; or fixed "a: 3")
//   units: cm
//   state vars: a, b, L, c (the hypotenuse, 2 dp), A (the whole net's area = surface area), v (volume)
//   Checks: "L = 5", "A = 84".
(function (B) {
  'use strict';
  var spec = null, st = {}, ui = {};
  var NS = 'http://www.w3.org/2000/svg';
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var FACES = ['bottom', 'top', 'back', 'front', 'right', 'left'];
  var FCOL = ['#2f6fb3', '#c2570a', '#2e8b57', '#a23b72', '#b8860b', '#5b5ea6'];
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }

  function parse(s) {
    s.mode = String(s.mode || 'cube').trim().toLowerCase();
    if (['cube', 'prism'].indexOf(s.mode) < 0) throw new Error('mode: cube or prism.');
    s.u = s.units ? String(s.units).trim() : '';
    if (s.mode === 'cube') {
      var g = s.grid === undefined ? [6, 4] : nums(s.grid, 'grid');
      if (g.length !== 2 || g[0] < 3 || g[1] < 3 || g[0] > 8 || g[1] > 6) throw new Error('grid: across then down, 3 to 8 across and 3 to 6 down.');
      s.gw = g[0]; s.gh = g[1];
      s.cells0 = String(s.cells || '1,0; 0,1; 1,1; 2,1; 3,1; 1,2').split(';').map(function (p) { var v = nums(p, 'cells'); if (v.length !== 2 || v[0] < 0 || v[1] < 0 || v[0] >= s.gw || v[1] >= s.gh) throw new Error('cells: each is x,y inside the grid.'); return v; });
    } else {
      s.sl = {}; s.fix = {};
      s.items.forEach(function (it) {
        if (it.kind !== 'slider') return;
        if (['a', 'b', 'L'].indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the prism net has sliders a, b and L only.');
        var v = nums(it.value, 'slider ' + it.name);
        if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] < 1) throw new Error('slider ' + it.name + ': needs min, max, start (from 1 up).');
        s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
      });
      ['a', 'b', 'L'].forEach(function (n) { if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fix[n] = nums(s[n], n)[0]; } else if (!s.sl[n]) throw new Error(n + ': needs a slider or a value.'); });
    }
  }

  // ---- cube: roll a cube over the squares
  function fold(cells) {
    var key = function (x, y) { return x + ',' + y; }, has = {};
    cells.forEach(function (c) { has[key(c[0], c[1])] = true; });
    var face = {}, seen = {}, queue = [];
    if (!cells.length) return { face: face, distinct: 0, joined: true };
    var s0 = cells[0];
    // orientation: [bottom, top, back (north), front (south), right (east), left (west)] as face ids
    queue.push({ x: s0[0], y: s0[1], o: [0, 1, 2, 3, 4, 5] }); seen[key(s0[0], s0[1])] = true; face[key(s0[0], s0[1])] = 0;
    var roll = function (o, dir) {
      var b = o[0], t = o[1], n = o[2], s = o[3], e = o[4], w = o[5];
      if (dir === 'e') return [e, w, n, s, t, b];
      if (dir === 'w') return [w, e, n, s, b, t];
      if (dir === 'n') return [n, s, t, b, e, w];
      return [s, n, b, t, e, w];
    };
    var D = [['e', 1, 0], ['w', -1, 0], ['n', 0, -1], ['s', 0, 1]];
    while (queue.length) {
      var q = queue.shift();
      D.forEach(function (d) {
        var nx = q.x + d[1], ny = q.y + d[2], k = key(nx, ny);
        if (!has[k] || seen[k]) return;
        seen[k] = true; var o2 = roll(q.o, d[0]); face[k] = o2[0]; queue.push({ x: nx, y: ny, o: o2 });
      });
    }
    var joined = cells.every(function (c) { return seen[key(c[0], c[1])]; });
    var used = {}; Object.keys(face).forEach(function (k) { used[face[k]] = (used[face[k]] || 0) + 1; });
    return { face: face, distinct: Object.keys(used).length, joined: joined, used: used };
  }

  function drawCube() {
    var el = B.el('board'); el.replaceChildren();
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* gone */ } B.jsxBoard = null; }
    var u = 56, W = spec.gw * u + 20, H = spec.gh * u + 20;
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0'; el.style.position = 'relative'; svg.setAttribute('role', 'img');
    var ink = B.css('--ink') || '#1d2430', line = B.css('--line') || '#e4e1da', muted = B.css('--muted') || '#5d6675';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var res = fold(st.cells), has = {};
    st.cells.forEach(function (c) { has[c[0] + ',' + c[1]] = true; });
    var clash = res.used || {};
    for (var y = 0; y < spec.gh; y++) for (var x = 0; x < spec.gw; x++) (function (x, y) {
      var k = x + ',' + y, on = has[k], f = res.face[k];
      var r = add('rect', { x: 10 + x * u, y: 10 + y * u, width: u, height: u, fill: on ? (f === undefined ? '#ddd' : FCOL[f]) : 'transparent', 'fill-opacity': on ? 0.45 : 0, stroke: on ? ink : line, 'stroke-width': on ? 2.5 : 1, 'data-cell': k, style: 'cursor:pointer' });
      r.setAttribute('role', 'button'); r.setAttribute('tabindex', '0');
      r.setAttribute('aria-label', 'Square at column ' + (x + 1) + ', row ' + (y + 1) + (on ? ', in the net (press to remove)' : ', empty (press to add)'));
      var act = function () { toggle(x, y); };
      r.addEventListener('click', act); r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
      if (on && f !== undefined) add('text', { x: 10 + x * u + u / 2, y: 10 + y * u + u / 2 + 5, 'text-anchor': 'middle', 'font-size': 15, fill: ink, 'pointer-events': 'none' }, clash[f] > 1 ? FACES[f] + ' ×' : FACES[f]);
    })(x, y);
    svg.setAttribute('aria-label', 'A grid with ' + st.cells.length + ' squares. Click a square to add or remove it.');
    el.appendChild(svg);
  }

  function toggle(x, y) {
    var i = st.cells.findIndex(function (c) { return c[0] === x && c[1] === y; });
    if (i >= 0) st.cells.splice(i, 1); else if (st.cells.length < 8) st.cells.push([x, y]); else { ui.note.textContent = 'That is plenty of squares: a cube has 6 faces. Remove one first.'; return; }
    B.moved = true; reportCube();
  }

  function reportCube() {
    drawCube();
    var res = fold(st.cells), c = st.cells.length, ok = c === 6 && res.joined && res.distinct === 6;
    var txt, note;
    if (ok) { txt = 'It folds into a cube: each of the 6 squares lands on a different face.'; note = 'Colours show the face each square becomes. Slide the shape in your mind: no two squares overlap.'; }
    else if (!c) { txt = 'The grid is empty. Click squares to build a net.'; note = ''; }
    else if (!res.joined) { txt = 'It does not fold: the squares are not all joined edge to edge.'; note = 'A net is one piece. Squares touching only at a corner are not joined.'; }
    else if (c < 6) { txt = 'It does not fold into a cube: ' + c + ' squares leave ' + (6 - c) + ' face' + (6 - c === 1 ? '' : 's') + ' open.'; note = 'A cube has 6 faces, so a net needs 6 squares.'; }
    else if (c > 6) { txt = 'It does not fold into a cube: ' + c + ' squares are too many.'; note = 'A cube has 6 faces, so a net has exactly 6 squares.'; }
    else { txt = 'It does not fold into a cube: some squares land on the same face (marked ×).'; note = 'Two squares overlap while a face is left open. Try moving a square.'; }
    ui.work.textContent = txt; ui.note.textContent = note;
    B.say(txt + ' ' + note);
    B.save({ cells: st.cells });
    B.post({ scope: { vars: { c: c, f: ok ? 1 : 0, d: res.distinct }, points: {} } }, txt + ' ' + note);
  }

  // ---- prism
  function drawPrism() {
    var el = B.el('board'); el.replaceChildren();
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* gone */ } B.jsxBoard = null; }
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var a = st.a, b = st.b, L = st.L, c = Math.hypot(a, b);
    var maxA = spec.sl.a ? spec.sl.a.max : a, maxB = spec.sl.b ? spec.sl.b.max : b, maxL = spec.sl.L ? spec.sl.L.max : L;
    var maxC = Math.hypot(maxA, maxB);
    var X0 = -0.6, X1 = maxA + maxB + maxC + 0.6, Y0 = -maxA - 0.6, Y1 = maxL + maxA + 0.6;
    var u = Math.min(46, 640 / (X1 - X0)), W = (X1 - X0) * u, H = (Y1 - Y0) * u;
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W.toFixed(1) + ' ' + H.toFixed(1)); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0'; el.style.position = 'relative'; svg.setAttribute('role', 'img');
    var P = function (x, y) { return ((x - X0) * u).toFixed(1) + ',' + ((y - Y0) * u).toFixed(1); };
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var poly = function (pts, col, op) { add('polygon', { points: pts.map(function (p) { return P(p[0], p[1]); }).join(' '), fill: col, 'fill-opacity': op, stroke: ink, 'stroke-width': 2 }); };
    var label = function (x, y, t, col, sz) { var q = P(x, y).split(','); add('text', { x: q[0], y: q[1], 'text-anchor': 'middle', 'font-size': sz || 15, fill: col || ink }, t); };
    var x1 = a, x2 = a + b;
    // y: the rectangles run from 0 (top) down to L; triangles above and below rectangle b
    poly([[0, 0], [a, 0], [a, L], [0, L]], blue, 0.3);
    poly([[x1, 0], [x2, 0], [x2, L], [x1, L]], blue, 0.3);
    poly([[x2, 0], [x2 + c, 0], [x2 + c, L], [x2, L]], blue, 0.3);
    poly([[x1, 0], [x2, 0], [x1, -a]], orange, 0.3);
    poly([[x1, L], [x2, L], [x1, L + a]], orange, 0.3);
    var d = function (v) { return B.fmt(r2(v)) + (spec.u ? ' ' + spec.u : ''); };
    label(a / 2, L / 2, d(a) + ' × ' + d(L), ink, 13); label(x1 + b / 2, L / 2, d(b) + ' × ' + d(L), ink, 13); label(x2 + c / 2, L / 2, d(c) + ' × ' + d(L), ink, 13);
    label(x1 + b * 0.3, -a * 0.3, 'triangle', muted, 13); label(x1 + b * 0.3, L + a * 0.3, 'triangle', muted, 13);
    svg.setAttribute('aria-label', 'A net of a triangular prism: three rectangles in a row and two right triangles, one above and one below the middle rectangle.');
    el.appendChild(svg);
  }
  function slider(n, label) {
    var sl = spec.sl[n], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = st[n];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round(v / sl.step) * sl.step)); st[n] = v; r.value = v; B.moved = true; reportPrism(); };
    r.addEventListener('input', function () { set(Number(r.value)); });
    minus.addEventListener('click', function () { set(st[n] - sl.step); });
    plus.addEventListener('click', function () { set(st[n] + sl.step); });
    row.append(lab, minus, r, plus, out); ui.outs.push({ n: n, out: out });
    return row;
  }
  function reportPrism() {
    drawPrism();
    var a = st.a, b = st.b, L = st.L, c = Math.hypot(a, b), tri = a * b / 2, A = 2 * tri + L * (a + b + c), v = tri * L, u = spec.u ? ' ' + spec.u : '';
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + st[o.n]; });
    ui.work.textContent = 'Net area = 2 × ' + B.fmt(r2(tri)) + ' + ' + B.fmt(L) + ' × (' + B.fmt(a) + ' + ' + B.fmt(b) + ' + ' + B.fmt(r2(c)) + ') = ' + B.fmt(r2(A)) + (spec.u ? ' ' + spec.u + '²' : '');
    ui.note.textContent = 'Two triangles and three rectangles. The rectangles share the triangle\'s sides: ' + B.fmt(a) + ', ' + B.fmt(b) + ' and ' + B.fmt(r2(c)) + (spec.u ? ' ' + spec.u : '') + '. Volume ' + B.fmt(r2(v)) + (spec.u ? ' ' + spec.u + '³' : '') + '.';
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ st: { a: a, b: b, L: L } });
    B.post({ scope: { vars: { a: a, b: b, L: L, c: r2(c), A: r2(A), v: r2(v) }, points: {} } }, ui.work.textContent);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var LB = { a: 'the first short side', b: 'the second short side', L: 'the length' };
    if (spec.mode === 'prism') ['a', 'b', 'L'].forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n, LB[n])); });
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.mode === 'cube') { var clr = document.createElement('button'); clr.type = 'button'; clr.textContent = 'Clear the grid'; clr.addEventListener('click', function () { st.cells = []; B.moved = true; reportCube(); }); bar.appendChild(clr); }
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  B.widget('net', {
    sections: ['board', 'gpanel'],
    label: function (s) { return /prism/i.test(s.mode || '') ? 'A net of a triangular prism' : 'A grid of squares that may fold into a cube'; },
    parse: parse,
    redraw: function () { if (spec) { if (spec.mode === 'cube') drawCube(); else drawPrism(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      paintPanel();
      if (spec.mode === 'cube') { st = { cells: sv && sv.cells ? sv.cells : spec.cells0.map(function (c) { return c.slice(); }) }; reportCube(); }
      else { st = {}; ['a', 'b', 'L'].forEach(function (n) { st[n] = spec.sl[n] ? (sv && sv.st && sv.st[n] !== undefined ? sv.st[n] : spec.sl[n].start) : spec.fix[n]; }); reportPrism(); }
    },
  });
})(WPB);
