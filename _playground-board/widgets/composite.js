// Composite and irregular shapes: area and perimeter on a grid of unit squares.
//   widget: composite
//   mode: shape | estimate
// shape: a polygon (corners in order, x,y with y up) that students split into pieces they know, or see as a big
//   rectangle with pieces taken away. Each piece is named (rectangle, triangle, trapezium) with its area.
//   corners: 0,0; a,0; a,3; 3,3; 3,6; 0,6     numbers or slider letters
//   slider a: 4, 10, 8                       min, max, start (lower-case letters other than k and n)
//   split: on                                buttons: Cut across, Cut up and down, Take away from a rectangle, No cuts
//   hide: 2, 5                               write ? on these sides (side 1 runs from corner 1 to corner 2)
//   perimeter: on                            also add up the sides (default on)
//   units: m
// state vars: A (area), P (perimeter, 2 dp), k (0 no cuts, 1 across, 2 up and down, 3 take away), n (pieces),
//   and each slider letter.  Checks: "A = 39", "k = 3 and n = 2", "P = 28".
// estimate: an irregular shape (a lake, a leaf or an island) on a grid. Counting full and part squares estimates the area;
//   joining points on the edge with straight pieces estimates the perimeter.
//   blob: lake | leaf | island    size: 8 (about how many units across)
//   slider n: 4, 32, 8            straight pieces round the edge (or fixed "n: 8")
// state vars: g (grid square side: 1, 0.5 or 0.25), f (full squares), p (part squares), e (estimate: full + half the
//   part squares, in square units), t (the measured area, 1 dp), c (1 once counted), n, l (the perimeter of the
//   straight pieces, 1 dp), m (the measured perimeter, 1 dp).  Checks: "c = 1 and g = 0.5", "n = 16", "e > 30".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {}, st = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var r1 = function (v) { return Math.round(v * 10) / 10; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }

  function parse(s) {
    s.mode = /^estimate$/i.test(s.mode || '') ? 'estimate' : 'shape';
    s.u = s.units ? String(s.units).trim() : '';
    s.sl = {}; s.order = [];
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (!/^[a-z]$/.test(it.name) || (s.mode === 'shape' && /^[kn]$/.test(it.name))) throw new Error('Line ' + it.line + ': a slider is one lower-case letter (not k or n).');
      if (s.mode === 'estimate' && it.name !== 'n') throw new Error('Line ' + it.line + ': the estimate board has one slider, n (straight pieces round the edge).');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': min, max, start, with start between them.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 }; s.order.push(it.name);
    });
    if (s.mode === 'estimate') {
      s.blob = /^(lake|leaf|island)$/i.test(s.blob || '') ? s.blob.toLowerCase() : 'lake';
      s.size = s.size ? nums(s.size, 'size')[0] : 8;
      if (!(s.size >= 4 && s.size <= 12)) throw new Error('size: 4 to 12.');
      if (!s.sl.n) s.fixN = s.n !== undefined ? Math.round(nums(s.n, 'n')[0]) : 8;
      return;
    }
    if (!s.corners) throw new Error('corners: list the corners in order, such as "0,0; 8,0; 8,3; 3,3; 3,6; 0,6".');
    s.cs = String(s.corners).split(';').map(function (p, i) {
      var q = p.split(',').map(function (x) { return x.trim(); });
      if (q.length !== 2) throw new Error('corners: corner ' + (i + 1) + ' needs x,y.');
      return q.map(function (x) {
        if (/^-?\d+(\.\d+)?$/.test(x)) return Number(x);
        if (/^[a-z]$/.test(x)) { if (!s.sl[x]) throw new Error('corners: "' + x + '" needs a slider (slider ' + x + ': min, max, start).'); return x; }
        throw new Error('corners: "' + x + '" is not a number or a slider letter.');
      });
    });
    if (s.cs.length < 3 || s.cs.length > 12) throw new Error('corners: 3 to 12 corners.');
    s.split = /^on$/i.test(s.split || '');
    s.perim = !/^off$/i.test(s.perimeter || '');
    s.hide = s.hide ? nums(s.hide, 'hide').map(Math.round) : [];
  }
  var U = function (p) { return spec.u ? ' ' + spec.u + (p === 2 ? '²' : '') : ''; };
  var F = function (v) { return B.fmt(r2(v)); };

  // ---- geometry ----
  function pts() { return spec.cs.map(function (c) { return c.map(function (x) { return typeof x === 'string' ? vars[x] : x; }); }); }
  function areaOf(P) { var a = 0; for (var i = 0; i < P.length; i++) { var p = P[i], q = P[(i + 1) % P.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; }
  function inside(P, x, y) {
    var c = false; for (var i = 0, j = P.length - 1; i < P.length; j = i++) {
      var a = P[i], b = P[j];
      if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    } return c;
  }
  // where the line "along = v" (along x if ax = 0, else along y) crosses the polygon: sorted positions on the other axis
  function cross(P, ax, v) {
    var out = [];
    for (var i = 0; i < P.length; i++) {
      var a = P[i], b = P[(i + 1) % P.length], a0 = a[ax], b0 = b[ax];
      if ((a0 - v) * (b0 - v) < 0) out.push(a[1 - ax] + (b[1 - ax] - a[1 - ax]) * (v - a0) / (b0 - a0));
    }
    return out.sort(function (p, q) { return p - q; });
  }
  // pieces between consecutive corner levels along axis ax (0: strips across x, i.e. cuts up and down; 1: cuts across)
  function strips(P, ax, outside) {
    var lv = P.map(function (p) { return p[ax]; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (p, q) { return p - q; });
    var lo = Math.min.apply(null, P.map(function (p) { return p[1 - ax]; })), hi = Math.max.apply(null, P.map(function (p) { return p[1 - ax]; }));
    var pieces = [];
    for (var i = 0; i + 1 < lv.length; i++) {
      var v0 = lv[i], v1 = lv[i + 1], e = (v1 - v0) * 1e-6;
      var c0 = cross(P, ax, v0 + e), c1 = cross(P, ax, v1 - e);
      if (outside) { c0 = [lo].concat(c0, [hi]); c1 = [lo].concat(c1, [hi]); }
      for (var k = 0; k + 1 < c0.length && k + 1 < c1.length; k += 2) {
        var a0 = [c0[k], c0[k + 1]], a1 = [c1[k], c1[k + 1]], f = e / (v1 - v0 - 2 * e);
        // the crossings were taken just inside the strip: extend them straight to its edges
        var s0 = a0.map(function (x, j) { return Math.round((x - (a1[j] - x) * f) * 1e6) / 1e6; });
        var s1 = a1.map(function (x, j) { return Math.round((x + (x - a0[j]) * f) * 1e6) / 1e6; });
        if (s0[1] - s0[0] < 1e-9 && s1[1] - s1[0] < 1e-9) continue;
        pieces.push({ ax: ax, v0: v0, v1: v1, s0: s0, s1: s1 });
      }
    }
    // join neighbouring rectangles with the same span
    var out = [];
    pieces.forEach(function (p) {
      var rect = Math.abs(p.s0[0] - p.s1[0]) < 1e-9 && Math.abs(p.s0[1] - p.s1[1]) < 1e-9;
      for (var j = out.length - 1; j >= 0; j--) {
        var q = out[j];
        if (q.rect && rect && Math.abs(q.v1 - p.v0) < 1e-9 && Math.abs(q.s0[0] - p.s0[0]) < 1e-9 && Math.abs(q.s0[1] - p.s0[1]) < 1e-9) { q.v1 = p.v1; return; }
      }
      p.rect = rect; out.push(p);
    });
    return out.map(function (p) {
      var w = p.v1 - p.v0, a = p.s0[1] - p.s0[0], b = p.s1[1] - p.s1[0];
      var corners = [[p.v0, p.s0[0]], [p.v1, p.s1[0]], [p.v1, p.s1[1]], [p.v0, p.s0[1]]].map(function (q) { return ax === 0 ? q : [q[1], q[0]]; });
      var kind, work;
      if (p.rect) { kind = 'rectangle'; work = F(w) + ' × ' + F(a) + ' = ' + F(w * a); }
      else if (a < 1e-6 || b < 1e-6) { kind = 'triangle'; work = '½ × ' + F(Math.max(a, b)) + ' × ' + F(w) + ' = ' + F(Math.max(a, b) * w / 2); }
      else { kind = 'trapezium'; work = '½ × (' + F(a) + ' + ' + F(b) + ') × ' + F(w) + ' = ' + F((a + b) * w / 2); }
      return { kind: kind, work: work, area: (a + b) * w / 2, corners: corners };
    });
  }
  function perimeter(P) { var s = 0, sides = []; for (var i = 0; i < P.length; i++) { var a = P[i], b = P[(i + 1) % P.length], d = Math.hypot(b[0] - a[0], b[1] - a[1]); sides.push(d); s += d; } return { total: s, sides: sides }; }

  // ---- the irregular shapes ----
  function blobPts(N) {
    var R = spec.size / 2, out = [];
    for (var i = 0; i < N; i++) {
      var t = 2 * Math.PI * i / N, r;
      if (spec.blob === 'leaf') { var x = R * Math.cos(t), y = 0.55 * R * Math.sin(t) * (1 + 0.25 * Math.cos(t)); out.push([R + x, R * 0.75 + y]); continue; }
      if (spec.blob === 'island') r = R * (0.78 + 0.13 * Math.sin(3 * t + 0.4) + 0.08 * Math.cos(5 * t) + 0.04 * Math.sin(7 * t + 1));
      else r = R * (0.8 + 0.12 * Math.cos(2 * t + 0.3) + 0.08 * Math.sin(3 * t + 1.1));
      out.push([R + r * Math.cos(t), R * 0.85 + 0.75 * r * Math.sin(t)]);
    }
    return out;
  }

  function svgEl() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img');
    svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    el.appendChild(svg); return svg;
  }
  function adder(svg) { return function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; }; }
  var COLS = ['--left', '--accent', '--right', '--ok'];

  function drawShape() {
    var svg = svgEl(), add = adder(svg);
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#d9dde3', red = B.css('--bad') || '#b3261e';
    var P = pts();
    // a fixed frame from the slider maxima, so the shape does not jump
    var maxv = function (c) { return typeof c === 'string' ? spec.sl[c].max : c; }, minv = function (c) { return typeof c === 'string' ? spec.sl[c].min : c; };
    var X0 = Math.min.apply(null, spec.cs.map(function (c) { return minv(c[0]); })), X1 = Math.max.apply(null, spec.cs.map(function (c) { return maxv(c[0]); }));
    var Y0 = Math.min.apply(null, spec.cs.map(function (c) { return minv(c[1]); })), Y1 = Math.max.apply(null, spec.cs.map(function (c) { return maxv(c[1]); }));
    var u = 46, pad = 1.3, W = (X1 - X0 + 2 * pad) * u, H = (Y1 - Y0 + 2 * pad) * u;
    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0));
    var X = function (x) { return (x - X0 + pad) * u; }, Y = function (y) { return (Y1 - y + pad) * u; };
    for (var gx = Math.floor(X0 - pad); gx <= X1 + pad; gx++) add('line', { x1: X(gx), y1: 0, x2: X(gx), y2: H, stroke: line, 'stroke-width': 1 });
    for (var gy = Math.floor(Y0 - pad); gy <= Y1 + pad; gy++) add('line', { x1: 0, y1: Y(gy), x2: W, y2: Y(gy), stroke: line, 'stroke-width': 1 });
    var path = function (Q) { return Q.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join(' '); };
    var pieces = st.pieces || [];
    if (st.k === 3) {
      var bb = [[st.bb[0], st.bb[1]], [st.bb[2], st.bb[1]], [st.bb[2], st.bb[3]], [st.bb[0], st.bb[3]]];
      add('polygon', { points: path(bb), fill: 'none', stroke: ink, 'stroke-width': 2, 'stroke-dasharray': '7 5' });
    }
    add('polygon', { points: path(P), fill: B.css('--left') || '#2f6fb3', 'fill-opacity': st.k ? (st.k === 3 ? 0.18 : 0.06) : 0.22, stroke: 'none' });
    pieces.forEach(function (pc, i) {
      var col = st.k === 3 ? red : (B.css(COLS[i % COLS.length]) || '#2f6fb3');
      add('polygon', { points: path(pc.corners), fill: col, 'fill-opacity': st.k === 3 ? 0.16 : 0.22, stroke: col, 'stroke-width': 2, 'stroke-dasharray': st.k === 3 ? '6 4' : '6 4' });
      var cx = 0, cy = 0; pc.corners.forEach(function (q) { cx += q[0] / 4; cy += q[1] / 4; });
      if (pc.kind === 'triangle') { var c3 = pc.corners.filter(function (q, j, a) { return a.findIndex(function (z) { return Math.abs(z[0] - q[0]) < 1e-9 && Math.abs(z[1] - q[1]) < 1e-9; }) === j; }); cx = 0; cy = 0; c3.forEach(function (q) { cx += q[0] / c3.length; cy += q[1] / c3.length; }); }
      add('text', { x: X(cx), y: Y(cy), 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 17, 'font-weight': 700, fill: ink, 'font-family': 'system-ui, sans-serif' }, (st.k === 3 ? '− ' : '') + F(pc.area));
    });
    add('polygon', { points: path(P), fill: 'none', stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
    // side lengths, outside the shape
    var A = areaOf(P), sgn = A >= 0 ? 1 : -1;
    for (var i = 0; i < P.length; i++) {
      var a = P[i], b = P[(i + 1) % P.length], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy);
      if (d < 1e-9) continue;
      var nx = sgn * dy / d, ny = -sgn * dx / d;   // outward normal
      var off = 0.4 + 0.42 * Math.abs(nx), mx = (a[0] + b[0]) / 2 + nx * off, my = (a[1] + b[1]) / 2 + ny * off;
      var hid = spec.hide.indexOf(i + 1) >= 0;
      add('text', { x: X(mx), y: Y(my), 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 16, 'font-weight': 600, fill: hid ? red : muted, 'font-family': 'system-ui, sans-serif' }, hid ? '?' : F(d) + (spec.u ? ' ' + spec.u : ''));
    }
    svg.setAttribute('aria-label', 'A shape with ' + P.length + ' sides on a grid' + (pieces.length ? ', ' + (st.k === 3 ? 'drawn inside a rectangle with ' + pieces.length + ' pieces taken away' : 'cut into ' + pieces.length + ' pieces') : '') + '.');
  }

  function drawEstimate() {
    var svg = svgEl(), add = adder(svg);
    var muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#d9dde3', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', green = B.css('--ok') || '#2e7d32';
    var S = spec.size, u = 52, pad = 0.5, W = (S + 2 * pad) * u, H = (S * 0.95 + 2 * pad) * u;
    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0));
    var X = function (x) { return (x + pad) * u; }, Y = function (y) { return (S * 0.95 + pad - y) * u; };
    var g = vars.g, fine = blobPts(360);
    if (st.c) st.cells.forEach(function (c) { add('rect', { x: X(c[0]), y: Y(c[1] + g), width: g * u, height: g * u, fill: c[2] ? green : orange, 'fill-opacity': c[2] ? 0.35 : 0.3, stroke: 'none' }); });
    for (var x = 0; x <= S + 1e-9; x += g) add('line', { x1: X(x), y1: Y(0), x2: X(x), y2: Y(S * 0.95), stroke: line, 'stroke-width': g < 1 ? 0.8 : 1.2 });
    for (var y = 0; y <= S * 0.95 + 1e-9; y += g) add('line', { x1: X(0), y1: Y(y), x2: X(S), y2: Y(y), stroke: line, 'stroke-width': g < 1 ? 0.8 : 1.2 });
    add('polygon', { points: fine.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join(' '), fill: blue, 'fill-opacity': 0.12, stroke: blue, 'stroke-width': 3 });
    var n = vars.n, rough = blobPts(n);
    add('polygon', { points: rough.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join(' '), fill: 'none', stroke: orange, 'stroke-width': 2, 'stroke-dasharray': '6 4' });
    rough.forEach(function (p) { add('circle', { cx: X(p[0]), cy: Y(p[1]), r: 3.5, fill: orange }); });
    add('text', { x: X(0.1), y: Y(S * 0.95) + 18, 'font-size': 15, fill: muted, 'font-family': 'system-ui, sans-serif' }, 'Each square: ' + B.fmt(g) + ' × ' + B.fmt(g) + (spec.u ? ' ' + spec.u : ''));
    svg.setAttribute('aria-label', 'An irregular shape (a ' + spec.blob + ') on a grid of squares of side ' + g + '.');
  }

  function count() {
    var g = vars.g, S = spec.size, P = blobPts(360), cells = [], f = 0, p = 0, k = 5;
    for (var x = 0; x < S - 1e-9; x += g) for (var y = 0; y < S * 0.95 - 1e-9; y += g) {
      var inn = 0, tot = 0;
      for (var i = 0; i <= k; i++) for (var j = 0; j <= k; j++) { tot++; if (inside(P, x + g * i / k, y + g * j / k)) inn++; }
      if (inn === tot) { f++; cells.push([x, y, 1]); } else if (inn > 0) { p++; cells.push([x, y, 0]); }
    }
    st.cells = cells; st.f = f; st.p = p;
  }

  function slider(n, label) {
    var sl = spec.sl[n], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[n] = r2(v); r.value = vars[n]; B.moved = true; refresh(); };
    r.addEventListener('input', function () { set(Number(r.value)); });
    minus.addEventListener('click', function () { set(vars[n] - sl.step); });
    plus.addEventListener('click', function () { set(vars[n] + sl.step); });
    row.append(lab, minus, r, plus, out); ui.outs.push({ n: n, out: out });
    return row;
  }
  function btn(bar, text, fn) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.setAttribute('aria-label', text); b.addEventListener('click', fn); bar.appendChild(b); return b; }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    spec.order.forEach(function (n) { panel.appendChild(slider(n, spec.mode === 'estimate' ? 'the number of straight pieces' : n)); });
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.mode === 'shape' && spec.split) {
      btn(bar, 'Cut across', function () { st.k = 1; B.moved = true; refresh(); });
      btn(bar, 'Cut up and down', function () { st.k = 2; B.moved = true; refresh(); });
      btn(bar, 'Take away from a rectangle', function () { st.k = 3; B.moved = true; refresh(); });
      btn(bar, 'No cuts', function () { st.k = 0; B.moved = true; refresh(); });
    }
    if (spec.mode === 'estimate') {
      btn(bar, 'Count the squares', function () { st.c = 1; B.moved = true; refresh(); });
      btn(bar, 'Finer grid', function () { if (vars.g > 0.25) { vars.g = vars.g / 2; B.moved = true; refresh(); } else ui.note.textContent = 'This is the finest grid.'; });
      btn(bar, 'Coarser grid', function () { if (vars.g < 1) { vars.g = vars.g * 2; B.moved = true; refresh(); } else ui.note.textContent = 'This is the coarsest grid.'; });
    }
    if (bar.children.length || spec.order.length) { btn(bar, 'Start again', B.restart); panel.appendChild(bar); }
  }

  function refresh() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + B.fmt(vars[o.n]); });
    if (spec.mode === 'estimate') return reportEstimate();
    var P = pts(), A = Math.abs(areaOf(P)), per = perimeter(P);
    var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; });
    st.bb = [Math.min.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, xs), Math.max.apply(null, ys)];
    st.pieces = st.k === 1 ? strips(P, 1, false) : st.k === 2 ? strips(P, 0, false) : st.k === 3 ? strips(P, 0, true) : [];
    drawShape();
    var parts = st.pieces.map(function (pc) { return pc.kind + ' ' + pc.work; });
    var bbA = (st.bb[2] - st.bb[0]) * (st.bb[3] - st.bb[1]);
    var work;
    if (st.k === 3) work = 'A = ' + F(st.bb[2] - st.bb[0]) + ' × ' + F(st.bb[3] - st.bb[1]) + (st.pieces.length ? ' − ' + st.pieces.map(function (pc) { return F(pc.area); }).join(' − ') : '') + ' = ' + F(A) + U(2);
    else if (st.pieces.length > 1) work = 'A = ' + st.pieces.map(function (pc) { return F(pc.area); }).join(' + ') + ' = ' + F(A) + U(2);
    else work = 'A = ' + F(A) + U(2);
    ui.work.textContent = work;
    var note = st.k === 3 ? 'The rectangle around it is ' + F(bbA) + U(2) + '; take away ' + (parts.length ? parts.join('; ') : 'nothing') + '.'
      : parts.length ? 'Pieces: ' + parts.join('; ') + '.' : (spec.split ? 'Cut the shape into pieces you know, or see it as a rectangle with pieces taken away.' : '');
    var hidden = spec.hide.length > 0;
    if (spec.perim) note += ' Perimeter: ' + (hidden ? 'find the missing ' + (spec.hide.length > 1 ? 'sides' : 'side') + ' first.' : per.sides.map(F).join(' + ') + ' = ' + F(per.total) + (spec.u ? ' ' + spec.u : '') + '.');
    ui.note.textContent = note.trim();
    B.say(work + '. ' + ui.note.textContent);
    B.save({ vars: vars, k: st.k });
    var sc = { A: r2(A), P: r2(per.total), k: st.k, n: st.pieces.length };
    spec.order.forEach(function (n) { sc[n] = vars[n]; });
    B.post({ scope: { vars: sc, points: {} } }, work + '. ' + ui.note.textContent);
  }

  function reportEstimate() {
    var g = vars.g, P = blobPts(360), t = Math.abs(areaOf(P)), m = perimeter(P).total, l = perimeter(blobPts(vars.n)).total;
    if (st.c) count();
    drawEstimate();
    var e = st.c ? (st.f + st.p / 2) * g * g : 0;
    ui.work.textContent = st.c ? 'Estimate: (' + st.f + ' + ½ × ' + st.p + ') × ' + String(Math.round(g * g * 10000) / 10000) + ' = ' + F(e) + U(2) : 'Count the squares to estimate the area.';
    ui.note.textContent = (st.c ? 'Full squares (green): ' + st.f + '. Part squares (orange): ' + st.p + ', counted as half each. ' : '') +
      'Perimeter with ' + vars.n + ' straight pieces: about ' + B.fmt(r1(l)) + (spec.u ? ' ' + spec.u : '') + '.' +
      (st.c && g === 0.25 ? ' Measured area: ' + B.fmt(r1(t)) + U(2) + '; measured perimeter: ' + B.fmt(r1(m)) + (spec.u ? ' ' + spec.u : '') + '.' : '');
    B.say(ui.work.textContent + ' ' + ui.note.textContent);
    B.save({ vars: vars, c: st.c });
    B.post({ scope: { vars: { g: g, f: st.c ? st.f : 0, p: st.c ? st.p : 0, e: r2(e), t: r1(t), c: st.c ? 1 : 0, n: vars.n, l: r1(l), m: r1(m) }, points: {} } }, ui.work.textContent + ' ' + ui.note.textContent);
  }

  B.widget('composite', {
    sections: ['board', 'gpanel'],
    label: function (s) { return /^estimate$/i.test(s.mode || '') ? 'An irregular shape on a grid, to estimate its area and perimeter' : 'A composite shape on a grid, to cut into pieces'; },
    parse: parse,
    redraw: function () { if (spec) refresh(); },
    resize: function () { if (spec) refresh(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {}; st = { k: sv && sv.k ? sv.k : 0, c: sv && sv.c ? 1 : 0 };
      spec.order.forEach(function (n) { vars[n] = sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start; });
      if (spec.mode === 'estimate') { vars.g = sv && sv.vars && sv.vars.g ? sv.vars.g : 1; if (!spec.sl.n) vars.n = spec.fixN; }
      paintPanel(); refresh();
    },
  });
})(WPB);
