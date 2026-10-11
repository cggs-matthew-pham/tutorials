// 3D coordinates: x, y and z axes drawn in 3D (isometric), a point P moved with sliders, and dashed lines that show how
// far it is along each axis. Optionally a target point Q to reach, or a box with a corner at P.
//   widget: space3d
//   slider x: 0, 6, 2     slider y: 0, 6, 3     slider z: 0, 6, 1     (or fixed "x: 2")
//   size: 6               the length of each axis (2 to 10)
//   target: 3, 2, 4       a point Q (shown as a ring) to move P to
//   box: on               draw the box from the origin to P (its edges are x, y and z long)
// state: { scope: { vars: { x, y, z, d (1 when P is on the target), v (the box's volume x × y × z) } } }
// Checks: "x = 3 and y = 2 and z = 4", "d = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {};
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.size = s.size !== undefined ? nums(s.size, 'size')[0] : 6;
    if (!(s.size >= 2 && s.size <= 10)) throw new Error('size: 2 to 10.');
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (['x', 'y', 'z'].indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the board has sliders x, y and z.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] < 0 || v[1] > s.size) throw new Error('slider ' + it.name + ': min, max (0 to the size), start, step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    ['x', 'y', 'z'].forEach(function (n) { if (!s.sl[n]) s.fix[n] = s[n] !== undefined ? nums(s[n], n)[0] : 0; });
    s.tgt = s.target !== undefined ? nums(s.target, 'target') : null;
    if (s.tgt && s.tgt.length !== 3) throw new Error('target: x, y, z, such as "3, 2, 4".');
    s.box = /^on$/i.test(s.box || '');
  }
  function draw() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', purple = B.css('--right') || '#8a4fb8', green = B.css('--ok') || '#2e7d32', line = B.css('--line') || '#d9dde3';
    var font = 'system-ui, sans-serif', S = spec.size, u = 40, C = Math.cos(Math.PI / 6);
    var W = 2 * (S + 1.6) * C * u + 160, ox = W / 2, oy = (S + 1.6) * u, H = oy + (S + 1.2) * u;
    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0));
    var P = function (x, y, z) { return [ox + (y - x) * C * u, oy + (x + y) * 0.5 * u - z * u]; };
    var seg = function (a, b, col, w, dash) { var p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]); add('line', { x1: p[0].toFixed(1), y1: p[1].toFixed(1), x2: q[0].toFixed(1), y2: q[1].toFixed(1), stroke: col, 'stroke-width': w || 1, 'stroke-dasharray': dash || 'none' }); };
    // grid on the floor (z = 0)
    for (var i = 0; i <= S; i++) { seg([i, 0, 0], [i, S, 0], line, 1); seg([0, i, 0], [S, i, 0], line, 1); }
    seg([0, 0, 0], [S + 0.6, 0, 0], blue, 3); seg([0, 0, 0], [0, S + 0.6, 0], orange, 3); seg([0, 0, 0], [0, 0, S + 0.6], purple, 3);
    var at = function (pt, t, col) { var p = P(pt[0], pt[1], pt[2]); add('text', { x: p[0], y: p[1], 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 24, 'font-weight': 700, 'font-family': font, fill: col }, t); };
    at([S + 1.1, 0, 0], 'x', blue); at([0, S + 1.1, 0], 'y', orange); at([0, 0, S + 1.1], 'z', purple);
    for (var k = 1; k <= S; k++) { at([k, -0.5, 0], String(k), muted); at([-0.5, k, 0], String(k), muted); var pz = P(0, 0, k); add('text', { x: pz[0] - 14, y: pz[1] + 4, 'text-anchor': 'end', 'font-size': 20, 'font-family': font, fill: muted }, String(k)); }
    var x = vars.x, y = vars.y, z = vars.z;
    if (spec.box) {
      var c = [[0, 0, 0], [x, 0, 0], [x, y, 0], [0, y, 0], [0, 0, z], [x, 0, z], [x, y, z], [0, y, z]];
      [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(function (e) { seg(c[e[0]], c[e[1]], green, 2); });
    }
    // the path from the origin: along x, then y, then up z
    seg([0, 0, 0], [x, 0, 0], blue, 3, '7 5'); seg([x, 0, 0], [x, y, 0], orange, 3, '7 5'); seg([x, y, 0], [x, y, z], purple, 3, '7 5');
    if (spec.tgt) { var q = P(spec.tgt[0], spec.tgt[1], spec.tgt[2]); add('circle', { cx: q[0], cy: q[1], r: 11, fill: 'none', stroke: green, 'stroke-width': 3 }); add('text', { x: q[0] + 14, y: q[1] - 12, 'font-size': 22, 'font-weight': 700, 'font-family': font, fill: green, stroke: B.css('--card') || '#fff', 'stroke-width': 5, 'paint-order': 'stroke' }, 'Q'); }
    var p = P(x, y, z);
    add('circle', { cx: p[0], cy: p[1], r: 9, fill: ink });
    add('text', { x: p[0] + 14, y: p[1] - 14, 'font-size': 24, 'font-weight': 700, 'font-family': font, fill: ink, stroke: B.css('--card') || '#fff', 'stroke-width': 5, 'paint-order': 'stroke' }, 'P (' + B.fmt(x) + ', ' + B.fmt(y) + ', ' + B.fmt(z) + ')');
    svg.setAttribute('aria-label', 'Three axes, x, y and z, with the point P at (' + x + ', ' + y + ', ' + z + ')' + (spec.tgt ? ' and a target Q' : '') + '.');
    el.appendChild(svg);
  }
  function slider(nm) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + nm + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + nm + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[nm] = Math.round(v * 100) / 100; rr.value = vars[nm]; B.moved = true; report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - sl.step); });
    plus.addEventListener('click', function () { set(vars[nm] + sl.step); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    ['x', 'y', 'z'].forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n)); });
    var bar = document.createElement('div'); bar.className = 'gbar'; var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + B.fmt(vars[o.n]); });
    draw();
    var x = vars.x, y = vars.y, z = vars.z, on = spec.tgt && x === spec.tgt[0] && y === spec.tgt[1] && z === spec.tgt[2];
    ui.work.textContent = 'P = (' + B.fmt(x) + ', ' + B.fmt(y) + ', ' + B.fmt(z) + ')';
    var note = B.fmt(x) + ' along x, ' + B.fmt(y) + ' along y, then ' + B.fmt(z) + ' up the z-axis.' + (spec.tgt ? (on ? ' P is on Q.' : ' Not on Q yet.') : '') + (spec.box ? ' The box is ' + B.fmt(x) + ' × ' + B.fmt(y) + ' × ' + B.fmt(z) + ' = ' + B.fmt(Math.round(x * y * z * 100) / 100) + ' cubic units.' : '');
    ui.note.textContent = note;
    B.say(ui.work.textContent + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: { x: x, y: y, z: z, d: on ? 1 : 0, v: Math.round(x * y * z * 100) / 100 }, points: {} } }, ui.work.textContent + '. ' + note);
  }
  B.widget('space3d', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Three axes and a point in 3D'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      vars = {}; ['x', 'y', 'z'].forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fix[n]; });
      paintPanel(); report();
    },
  });
})(WPB);
