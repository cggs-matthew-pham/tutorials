// Geometry: a triangle or polygon on a square dot grid, with corners students drag, the interior angle at each corner
// measured live, and two ways of seeing the angle sum: tear off a triangle's corners and line them up, or split a
// polygon into triangles from one corner.
//   widget: geometry
//   shape: triangle          or polygon
//   sides: 5                 a polygon's sides (3 to 10); "sides: choose" adds More sides and Fewer sides buttons
//   grid: 12, 8              the dot grid, across and up (default 12, 8)
//   corners: 1,1; 9,1; 4,6   where the corners start (A, B, C, ...); default a regular shape in the middle
//   snap: 1                  where dragged corners land (default 1; 0.5 for half squares)
//   sum: on                  write the total of the angles (default on)
//   tear: on                 a "Tear off the corners" button: the angles, side by side on a straight line (triangle);
//                            "tear: shown" starts torn (and "split: shown" starts split), for pictures
//   split: on                a "Split into triangles" button: lines from A to every other corner (polygon)
//   presets: on              buttons that set a triangle's shape: Acute, Right-angled, Obtuse, Very flat
//   angles: given a, b       show only these sizes; the other corners show their letter (angles to find)
//   exterior: C              extend the side into C past C (dashed) and mark the exterior angle x (value x)
// Measurements are rounded to whole degrees so that the shown angles add to the shown total.
// state: { scope: { vars: { a, b, c, ... (each corner's angle), s (total), m (largest angle), n (sides),
//                   k (triangles shown by split, else 0), t (1 while torn), v (1 if no corner points in) },
//                   points: { A: [x, y], ... } } }
// Checks: "m > 90", "m = 90", "n = 5 and s = 540", "k = 3", "t = 1", "v = 0".
(function (B) {
  'use strict';
  var spec = null, pts = [], P = [], torn = false, split = false, nSides = 3, ui = {}, meas = null, preset = null;
  var LET = 'ABCDEFGHIJ';
  var round = function (v) { return Math.round(v * 1e6) / 1e6; };

  function num(t, where) { var v = Number(String(t).trim()); if (!isFinite(v)) throw new Error(where + ': "' + String(t).trim() + '" is not a number.'); return v; }
  function parse(s) {
    s.kind = (s.shape || 'triangle').trim().toLowerCase();
    if (['triangle', 'polygon'].indexOf(s.kind) < 0) throw new Error('shape: triangle or polygon.');
    var g = (s.grid || '12, 8').split(',').map(function (t) { return num(t, 'grid'); });
    if (g.length !== 2 || g[0] < 4 || g[1] < 4) throw new Error('grid: two numbers, across then up, each 4 or more.');
    s.gw = g[0]; s.gh = g[1];
    s.choose = /^choose$/i.test(String(s.sides || '').trim());
    s.n = s.kind === 'triangle' ? 3 : s.choose ? 4 : s.sides ? num(s.sides, 'sides') : 4;
    if (!(s.n >= 3 && s.n <= 10 && s.n === Math.round(s.n))) throw new Error('sides: a whole number from 3 to 10.');
    s.start = null;
    if (s.corners) {
      s.start = s.corners.split(';').map(function (c, i) { var a = c.split(',').map(function (t) { return num(t, 'corners'); }); if (a.length !== 2) throw new Error('corners: x,y pairs separated by semicolons.'); return a; });
      if (s.start.length !== s.n) throw new Error('corners: ' + s.start.length + ' given, but the shape has ' + s.n + '.');
    }
    s.snapStep = s.snap ? num(s.snap, 'snap') : 1;
    var on = function (k, d) { return s[k] === undefined ? d : /^(on|shown)$/i.test(s[k]); };
    s.tearShown = /^shown$/i.test(s.tear || ''); s.splitShown = /^shown$/i.test(s.split || '');
    // angles: given a, b — show only these sizes (the others show their letter: angles to find); exterior: C — extend
    // the side into C past C (dashed) and mark the exterior angle x there (shown unless given leaves x out).
    s.given = null;
    if (s.angles !== undefined) {
      var gm = /^given\s+(.+)$/i.exec(String(s.angles).trim());
      if (!gm) throw new Error('angles: "given a, b" (the corners whose sizes show; add x for an exterior angle).');
      s.given = gm[1].split(',').map(function (t) { return t.trim().toLowerCase(); });
      s.given.forEach(function (g) { if (!/^[a-jx]$/.test(g)) throw new Error('angles: "' + g + '" is not a corner letter (a, b, c, …) or x.'); });
    }
    s.ext = null;
    if (s.exterior !== undefined) {
      var ei = LET.indexOf(String(s.exterior).trim().toUpperCase());
      if (ei < 0 || ei >= s.n) throw new Error('exterior: a corner letter, such as "exterior: C".');
      s.ext = ei;
    }
    s.showSum = on('sum', true); s.tear = on('tear', false) && s.kind === 'triangle'; s.split = on('split', false); s.presets = on('presets', false) && s.kind === 'triangle';
  }

  function regular(n) {   // corners anticlockwise from the bottom left, the bottom side level
    var cx = spec.gw / 2, cy = spec.gh / 2, r = Math.min(spec.gw, spec.gh) * 0.42, out = [];
    for (var i = 0; i < n; i++) { var th = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * i) / n; out.push([round(cx + r * Math.cos(th)), round(cy + r * Math.sin(th))]); }
    return out;
  }
  var PRESETS = { 'Acute': [[2, 1], [9, 1], [6, 6]], 'Right-angled': [[2, 1], [9, 1], [2, 6]], 'Obtuse': [[1, 1], [6, 1], [10, 4]], 'Very flat': [[1, 2], [11, 2], [3, 3]] };

  // Interior angles of the polygon (degrees), or null if two sides cross.
  function measure(c) {
    var n = c.length, area = 0, i;
    for (i = 0; i < n; i++) { var p = c[i], q = c[(i + 1) % n]; area += p[0] * q[1] - q[0] * p[1]; }
    var orient = area >= 0 ? 1 : -1;
    var seg = function (a, b, c2, d) {   // proper crossing of ab and cd
      var cr = function (o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); };
      var d1 = cr(c2, d, a), d2 = cr(c2, d, b), d3 = cr(a, b, c2), d4 = cr(a, b, d);
      return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
    };
    for (i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (seg(c[i], c[(i + 1) % n], c[j], c[(j + 1) % n])) return null;
    }
    if (Math.abs(area) < 1e-9) return { flat: true };
    var ang = [], convex = true;
    for (i = 0; i < n; i++) {
      var pr = c[(i + n - 1) % n], cu = c[i], nx = c[(i + 1) % n];
      var a1 = Math.atan2(pr[1] - cu[1], pr[0] - cu[0]), a2 = Math.atan2(nx[1] - cu[1], nx[0] - cu[0]);
      // interior angle: from the next side round to the previous one, on the inside
      var d = orient > 0 ? a1 - a2 : a2 - a1;
      while (d <= 0) d += 2 * Math.PI; while (d > 2 * Math.PI) d -= 2 * Math.PI;
      var deg = d * 180 / Math.PI;
      if (deg > 180 + 1e-9) convex = false;
      ang.push({ deg: deg, start: orient > 0 ? a2 : a1, sweep: d });
    }
    var total = (n - 2) * 180;
    // whole degrees that add to the total (largest remainder)
    var fl = ang.map(function (a) { return Math.floor(a.deg + 1e-9); }), left = total - fl.reduce(function (x, y) { return x + y; }, 0);
    ang.map(function (a, k) { return [a.deg - fl[k], k]; }).sort(function (x, y) { return y[0] - x[0]; }).slice(0, Math.max(0, left)).forEach(function (r) { fl[r[1]]++; });
    ang.forEach(function (a, k) { a.whole = fl[k]; });
    return { ang: ang, total: total, convex: convex };
  }

  function corners() { return P.map(function (p) { return [round(p.X()), round(p.Y())]; }); }

  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#e4e1da', acc = B.css('--accent') || '#c2570a';
    var cols = [B.css('--accent'), B.css('--left'), B.css('--ok'), B.css('--right')];
    spec.cols = cols;
    meas = measure(pts);
    var board = B.jsx({ boundingbox: [-0.6, spec.gh + 0.6, spec.gw + 0.6, -0.6], keepAspectRatio: true });
    for (var x = 0; x <= spec.gw; x++) for (var y = 0; y <= spec.gh; y++) board.create('point', [x, y], { name: '', size: 1, fillColor: line, strokeColor: line, fixed: true, highlight: false, showInfobox: false, layer: 0 });
    var u = 1 / board.unitX;   // one pixel
    P = [];
    // the triangles of the split (shaded), under everything else
    pts.forEach(function (c, i) {
      P.push(board.create('point', c, { name: LET[i], withLabel: false, size: 6, fillColor: acc, strokeColor: acc, highlightFillColor: acc, highlightStrokeColor: acc, showInfobox: false }));
    });
    ui.splitObjs = [];
    for (var t = 0; t < nSides - 2; t++) (function (t) {
      ui.splitObjs.push(board.create('polygon', [function () { return [P[0].X(), P[0].Y()]; }, function () { return [P[t + 1].X(), P[t + 1].Y()]; }, function () { return [P[t + 2].X(), P[t + 2].Y()]; }].map(function (f) { return board.create('point', [function () { return f()[0]; }, function () { return f()[1]; }], { visible: false }); }),
        { fillColor: cols[t % 4], fillOpacity: 0.12, borders: { visible: false }, vertices: { visible: false }, fixed: true, highlight: false }));
    })(t);
    board.create('polygon', P, { fillColor: ink, fillOpacity: 0.03, borders: { strokeColor: ink, strokeWidth: 3, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    // diagonals of the split
    for (var d2 = 2; d2 < nSides - 1; d2++) (function (j) {
      ui.splitObjs.push(board.create('segment', [P[0], P[j]], { strokeColor: muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false }));
    })(d2);
    // angle arcs and values
    var R = 26 * u;
    P.forEach(function (p, i) {
      var col = cols[i % 4];
      board.create('curve', [function (s) { return arcXY(i, s, R)[0]; }, function (s) { return arcXY(i, s, R)[1]; }, 0, 1], { strokeColor: col, strokeWidth: 2, fillColor: col, fillOpacity: 0.25, fixed: true, highlight: false, numberPointsHigh: 60, numberPointsLow: 30 });
      board.create('text', [function () { return lab(i, R + 18 * u)[0]; }, function () { return lab(i, R + 18 * u)[1]; }, function () { return !meas || !meas.ang ? '' : shown(LET[i].toLowerCase()) ? meas.ang[i].whole + '°' : LET[i].toLowerCase(); }], { anchorX: 'middle', anchorY: 'middle', cssClass: 'gangle', highlightCssClass: 'gangle', strokeColor: col, fixed: true, highlight: false });
      // the corner's letter, on the outside
      board.create('text', [function () { return lab(i, -16 * u)[0]; }, function () { return lab(i, -16 * u)[1]; }, LET[i]], { anchorX: 'middle', anchorY: 'middle', cssClass: 'ptlabel', highlightCssClass: 'ptlabel', fixed: true, highlight: false });
    });
    if (spec.ext !== null && spec.ext < nSides) (function (i) {
      var dir = function () { var a = P[(i + nSides - 1) % nSides], c = P[i], dx = c.X() - a.X(), dy = c.Y() - a.Y(), l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
      var nx = function () { var c = P[i], b = P[(i + 1) % nSides]; return Math.atan2(b.Y() - c.Y(), b.X() - c.X()); };
      var ea = function () { var d = dir(), t1 = Math.atan2(d[1], d[0]), t2 = nx(), sw = t2 - t1; while (sw > Math.PI) sw -= 2 * Math.PI; while (sw < -Math.PI) sw += 2 * Math.PI; return [t1, sw]; };
      board.create('segment', [P[i], [function () { return P[i].X() + 3 * dir()[0]; }, function () { return P[i].Y() + 3 * dir()[1]; }]], { strokeColor: ink, strokeWidth: 2, dash: 2, fixed: true, highlight: false, point2: { visible: false } });
      var col = muted, RX = 34 * u;
      board.create('curve', [function (t) { var e = ea(), c = [P[i].X(), P[i].Y()]; if (t < 0.05 || t > 0.95) return c[0]; var th = e[0] + e[1] * (t - 0.05) / 0.9; return c[0] + RX * Math.cos(th); }, function (t) { var e = ea(), c = [P[i].X(), P[i].Y()]; if (t < 0.05 || t > 0.95) return c[1]; var th = e[0] + e[1] * (t - 0.05) / 0.9; return c[1] + RX * Math.sin(th); }, 0, 1], { strokeColor: col, strokeWidth: 2, fillColor: col, fillOpacity: 0.18, fixed: true, highlight: false, numberPointsHigh: 60 });
      board.create('text', [function () { var e = ea(); return P[i].X() + (RX + 20 * u) * Math.cos(e[0] + e[1] / 2); }, function () { var e = ea(); return P[i].Y() + (RX + 20 * u) * Math.sin(e[0] + e[1] / 2); }, function () { return !meas || !meas.ang ? '' : shown('x') ? 'x = ' + (180 - meas.ang[i].whole) + '°' : 'x'; }], { anchorX: 'middle', anchorY: 'middle', cssClass: 'gangle', highlightCssClass: 'gangle', strokeColor: ink, fixed: true, highlight: false });
    })(spec.ext);
    P.forEach(function (p) {
      p.on('drag', function () { meas = measure(corners()); report(true); });
      p.on('up', function () { var x = near(p.X(), 0, spec.gw), y = near(p.Y(), 0, spec.gh); p.moveTo([x, y]); preset = null; B.moved = true; meas = measure(corners()); board.update(); report(); });
    });
    meas = measure(corners());
    board.update();
  }
  function shown(l) { return !spec.given || spec.given.indexOf(l) >= 0; }
  function near(v, lo, hi) { var s = spec.snapStep; return Math.max(lo, Math.min(hi, round(Math.round(v / s) * s))); }
  // a point on the arc at corner i (s from 0 to 1 walks the sector: centre, round the arc, back to centre)
  function arcXY(i, s, R) {
    if (!meas || !meas.ang) return [NaN, NaN];
    var a = meas.ang[i], c = [P[i].X(), P[i].Y()];
    if (s < 0.05 || s > 0.95) return c;
    var th = a.start + a.sweep * (s - 0.05) / 0.9;
    return [c[0] + R * Math.cos(th), c[1] + R * Math.sin(th)];
  }
  // a point along the bisector of corner i, at distance R (negative R: outside the shape)
  function lab(i, R) {
    if (!meas || !meas.ang) return [P[i].X(), P[i].Y() + R];
    var a = meas.ang[i], th = a.start + a.sweep / 2;
    return [P[i].X() + R * Math.cos(th), P[i].Y() + R * Math.sin(th)];
  }

  // The torn corners: the three angles side by side at one point on a straight line (an SVG in the panel).
  function drawTear() {
    var svg = ui.tear; if (!svg) return;
    svg.replaceChildren();
    var NS = 'http://www.w3.org/2000/svg', W = 320, H = 150, cx = W / 2, cy = 120, r = 90;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var el = function (n, at) { var e = document.createElementNS(NS, n); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); svg.appendChild(e); return e; };
    el('line', { x1: 10, y1: cy, x2: W - 10, y2: cy, stroke: 'var(--ink)', 'stroke-width': 3 });
    if (!meas || !meas.ang) return;
    var from = 0;
    meas.ang.forEach(function (a, i) {
      var t0 = Math.PI - from * Math.PI / 180, t1 = Math.PI - (from + a.whole) * Math.PI / 180;
      var p0 = [cx + r * Math.cos(t0), cy - r * Math.sin(t0)], p1 = [cx + r * Math.cos(t1), cy - r * Math.sin(t1)];
      el('path', { d: 'M' + cx + ',' + cy + ' L' + p0[0] + ',' + p0[1] + ' A' + r + ',' + r + ' 0 0 1 ' + p1[0] + ',' + p1[1] + ' Z', fill: spec.cols[i % 4], 'fill-opacity': 0.35, stroke: spec.cols[i % 4], 'stroke-width': 2 });
      var tm = (t0 + t1) / 2, t = el('text', { x: cx + r * 0.62 * Math.cos(tm), y: cy - r * 0.62 * Math.sin(tm) + 5, 'text-anchor': 'middle', class: 'gtorn' });
      t.textContent = LET[i] + ' ' + a.whole + '°';
      from += a.whole;
    });
    svg.setAttribute('aria-label', 'The three corners side by side: ' + meas.ang.map(function (a, i) { return LET[i] + ' ' + a.whole + '°'; }).join(', ') + ', on a straight line');
  }

  // Keyboard moves: a row to pick a point and step it with buttons or the arrow keys (dragging needs a pointer).
  function moveRow(panel, names, axes, step) {
    if (!names.length) return;
    var row = document.createElement('div'); row.className = 'gbar kmove'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Move a point with the keyboard');
    var lab = document.createElement('label'); lab.textContent = 'Move'; var sel = document.createElement('select'); sel.id = 'kmove-pt';
    lab.htmlFor = sel.id;
    names.forEach(function (n) { var o = document.createElement('option'); o.value = o.textContent = n; sel.appendChild(o); });
    row.append(lab, sel);
    var dirs = axes === 2 ? [['←', -1, 0, 'left'], ['→', 1, 0, 'right'], ['↑', 0, 1, 'up'], ['↓', 0, -1, 'down']] : [['←', -1, 0, 'left'], ['→', 1, 0, 'right']];
    dirs.forEach(function (d) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = d[0];
      var label = function () { return 'Move ' + sel.value + ' ' + d[3]; };
      b.setAttribute('aria-label', label()); sel.addEventListener('change', function () { b.setAttribute('aria-label', label()); });
      b.addEventListener('click', function () { step(sel.value, d[1], d[2]); }); row.appendChild(b);
    });
    row.addEventListener('keydown', function (e) {
      var k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (!k || (axes === 1 && k[1])) return;
      e.preventDefault(); step(sel.value, k[0], k[1]);
    });
    panel.appendChild(row);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.read = document.createElement('p'); ui.read.className = 'rulework'; ui.read.id = 'gsum'; ui.read.setAttribute('aria-live', 'polite'); panel.appendChild(ui.read);
    if (spec.tear) {
      ui.tear = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); ui.tear.setAttribute('class', 'gtear'); ui.tear.setAttribute('role', 'img'); ui.tear.hidden = !torn; panel.appendChild(ui.tear);
    }
    var bar = document.createElement('div'); bar.className = 'gbar gbtns';
    var btn = function (text, fn, pressed) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; if (pressed !== undefined) b.setAttribute('aria-pressed', String(pressed)); b.addEventListener('click', fn); bar.appendChild(b); return b; };
    if (spec.presets) Object.keys(PRESETS).forEach(function (k) { btn(k, function () { setCorners(PRESETS[k]); preset = k; }); });
    if (spec.tear) ui.tearBtn = btn('Tear off the corners', function () { torn = !torn; ui.tear.hidden = !torn; ui.tearBtn.setAttribute('aria-pressed', String(torn)); B.moved = true; report(); }, torn);
    if (spec.split) ui.splitBtn = btn('Split into triangles', function () { split = !split; ui.splitBtn.setAttribute('aria-pressed', String(split)); B.moved = true; B.jsxBoard.update(); report(); }, split);
    if (spec.choose) {
      btn('Fewer sides', function () { if (nSides > 3) { nSides--; pts = regular(nSides); B.moved = true; paintPanel(); rebuild(); } });
      btn('More sides', function () { if (nSides < 10) { nSides++; pts = regular(nSides); B.moved = true; paintPanel(); rebuild(); } });
    }
    btn('Start again', B.restart);
    panel.appendChild(bar);
    moveRow(panel, pts.map(function (q, i) { return LET[i]; }), 2, function (n, dx, dy) {
      var Q = P[LET.indexOf(n)]; if (!Q) return;
      Q.moveTo([near(Q.X() + dx * spec.snapStep, 0, spec.gw), near(Q.Y() + dy * spec.snapStep, 0, spec.gh)]);
      preset = null; B.moved = true; meas = measure(corners()); B.jsxBoard.update(); report();
    });
  }
  function setCorners(c) { pts = c.map(function (p) { return p.slice(); }); B.moved = true; rebuild(); }
  function rebuild() { build(); report(); }

  function report(quiet) {
    var c = corners(), vars = { n: nSides, k: 0, t: torn ? 1 : 0, s: 0, m: 0, v: 1 }, points = {};
    c.forEach(function (p, i) { points[LET[i]] = p; });
    var text;
    (ui.splitObjs || []).forEach(function (o) { o.setAttribute({ visible: !!(split && meas && meas.convex) }); });
    if (!meas) text = 'Two sides cross: move a corner so they do not.';
    else if (meas.flat) text = 'The corners are in a line: that is not a ' + (nSides === 3 ? 'triangle' : 'polygon') + '.';
    else {
      meas.ang.forEach(function (a, i) { vars[LET[i].toLowerCase()] = a.whole; });
      vars.s = meas.total; vars.m = Math.max.apply(null, meas.ang.map(function (a) { return a.whole; })); vars.v = meas.convex ? 1 : 0;
      if (split && meas.convex) vars.k = nSides - 2;
      var list = meas.ang.map(function (a) { return a.whole + '°'; }).join(' + ');
      if (spec.ext !== null && spec.ext < nSides) vars.x = 180 - meas.ang[spec.ext].whole;
      if (spec.given) text = spec.given.map(function (g) { return g === 'x' ? 'x = ' + vars.x + '°' : g + ' = ' + (vars[g] !== undefined ? vars[g] : '?') + '°'; }).join(', ') + '. Find the others.';
      else text = spec.showSum ? meas.ang.map(function (a, i) { return LET[i]; }).join(' + ') + ' = ' + list + ' = ' + meas.total + '°' : meas.ang.map(function (a, i) { return LET[i] + ' = ' + a.whole + '°'; }).join(', ');
      if (!spec.given && vars.x !== undefined) text += '. Outside angle x = ' + vars.x + '°';
      if (split) text += meas.convex ? '. Split from A: ' + (nSides - 2) + (nSides - 2 === 1 ? ' triangle' : ' triangles') + ', ' + (nSides - 2) + ' × 180° = ' + meas.total + '°' : '. A corner points in, so lines from A would go outside: drag it out to split.';
    }
    ui.read.textContent = text;
    if (torn) drawTear();
    B.say(nSides === 3 ? 'A triangle' + (preset ? ' (' + preset.toLowerCase() + ')' : '') + '. Drag a corner, or use Move, to change it.' : 'A shape with ' + nSides + ' sides. Drag a corner, or use Move, to change it.');
    if (quiet) return;
    B.save({ pts: c, torn: torn, split: split, n: nSides });
    B.post({ scope: { vars: vars, points: points } }, text);
  }

  B.widget('geometry', {
    sections: ['board', 'gpanel'],
    label: function (s) { return (s.shape || 'triangle') === 'polygon' ? 'A polygon to drag, with its angles' : 'A triangle to drag, with its angles'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      nSides = sv && sv.n ? sv.n : spec.n;
      pts = sv && sv.pts && sv.pts.length === nSides ? sv.pts : spec.start && nSides === spec.n ? spec.start.map(function (p) { return p.slice(); }) : nSides === 3 && !spec.start ? [[1, 1], [9, 1], [4, 6]].map(function (p) { return [p[0] * spec.gw / 12, p[1] * spec.gh / 8].map(round); }) : regular(nSides);
      torn = sv ? !!sv.torn : spec.tearShown; split = sv ? !!sv.split : spec.splitShown; preset = null;
      paintPanel();
      build();
      report();
    },
    redraw: function () { pts = corners(); build(); report(true); },
    resize: function () { pts = corners(); build(); report(true); },
  });
})(WPB);
