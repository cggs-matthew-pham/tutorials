// Congruence tests: give some sides and angles, and the board draws every triangle that has them. If the parts allow
// only one triangle, any two triangles with those parts are congruent (SSS, SAS, ASA, AAS, RHS); SSA can allow two.
//   widget: congruence
//   test: SSS | SAS | ASA | AAS | RHS | SSA | choose     which parts are given ("choose" adds a button for each)
//   sliders (any can be fixed, such as "p: 6"):
//     sides p, q, r: 1 to 12 (step 0.5)      angles s, t: 10 to 170 (step 5)
//     SSS: AB = p, AC = q, BC = r                 SAS: AB = p, AC = q, angle A = s (between them)
//     ASA: AB = p, angle A = s, angle B = t       AAS: BC = p (opposite A), angle A = s, angle B = t
//     RHS: angle A = 90°, BC = r (hypotenuse), AB = p    SSA: AB = p, BC = q, angle A = s (not between them)
// state: { scope: { vars: { n (how many different triangles: 0, 1 or 2), k (1 if this test always fixes the triangle),
//   p, q, r, s, t } } }
// Checks: "n = 2", "n = 1 and k = 1", "n = 0".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var TESTS = ['SSS', 'SAS', 'ASA', 'AAS', 'RHS', 'SSA'];
  var USES = { SSS: ['p', 'q', 'r'], SAS: ['p', 'q', 's'], ASA: ['p', 's', 't'], AAS: ['p', 's', 't'], RHS: ['r', 'p'], SSA: ['p', 'q', 's'] };
  var DEF = { p: 6, q: 5, r: 4, s: 40, t: 60 };
  var spec = null, vars = {}, ui = {}, test = 'SSS';
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var rad = function (d) { return d * Math.PI / 180; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    var t = String(s.test || 'SSS').trim().toUpperCase();
    if (t !== 'CHOOSE' && TESTS.indexOf(t) < 0) throw new Error('test: SSS, SAS, ASA, AAS, RHS, SSA or choose.');
    s.choose = t === 'CHOOSE'; s.t0 = s.choose ? 'SSS' : t;
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (['p', 'q', 'r', 's', 't'].indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': sliders p, q, r (sides) and s, t (angles).');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': min, max, start, step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || (/[st]/.test(it.name) ? 5 : 0.5) };
    });
    ['p', 'q', 'r', 's', 't'].forEach(function (n) {
      if (s.sl[n]) return;
      s.fix[n] = s[n] !== undefined ? nums(s[n], n)[0] : DEF[n];
      if (s[n] === undefined) s.sl[n] = /[st]/.test(n) ? { min: 10, max: 170, start: DEF[n], step: 5 } : { min: 1, max: 12, start: DEF[n], step: 0.5 };
      else delete s.sl[n];
    });
  }
  // every triangle A, B, C with the given parts; A at the origin, B along the x-axis
  function solve() {
    var p = vars.p, q = vars.q, r = vars.r, s = rad(vars.s), t = rad(vars.t), out = [];
    var push = function (C, Bx) { if (C && C[1] > 1e-6) out.push([[0, 0], [Bx, 0], C]); };
    if (test === 'SSS') { if (p + q > r && p + r > q && q + r > p) { var x = (p * p + q * q - r * r) / (2 * p); push([x, Math.sqrt(Math.max(0, q * q - x * x))], p); } }
    else if (test === 'SAS') { if (vars.s < 180) push([q * Math.cos(s), q * Math.sin(s)], p); }
    else if (test === 'ASA' || test === 'AAS') {
      if (vars.s + vars.t < 180) {
        var c = Math.PI - s - t, ab = test === 'ASA' ? p : p * Math.sin(c) / Math.sin(s);
        var ac = ab * Math.sin(t) / Math.sin(c);
        push([ac * Math.cos(s), ac * Math.sin(s)], ab);
      }
    } else if (test === 'RHS') { if (r > p) push([0, Math.sqrt(r * r - p * p)], p); }
    else if (test === 'SSA') {
      var bq = 2 * p * Math.cos(s), disc = q * q - p * p * Math.sin(s) * Math.sin(s);
      if (disc >= 0) {
        var roots = disc < 1e-9 ? [p * Math.cos(s)] : [p * Math.cos(s) + Math.sqrt(disc), p * Math.cos(s) - Math.sqrt(disc)];
        roots.forEach(function (d) { if (d > 1e-6) push([d * Math.cos(s), d * Math.sin(s)], p); });
        void bq;
      }
    }
    return out;
  }
  var len = function (a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); };
  var ang = function (a, b, c) { var u = [b[0] - a[0], b[1] - a[1]], v = [c[0] - a[0], c[1] - a[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))))) * 180 / Math.PI; };

  function draw(T) {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var cols = [blue, orange], font = 'system-ui, sans-serif';
    // a fixed frame big enough for 12-unit sides
    var W = 900, H = 420, u = 34, ox = 300, oy = 360;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var X = function (pt) { return ox + pt[0] * u; }, Y = function (pt) { return oy - pt[1] * u; };
    add('line', { x1: ox - 300, y1: oy, x2: ox + 520, y2: oy, stroke: muted, 'stroke-width': 1, 'stroke-dasharray': '3 5' });
    T.forEach(function (tri, i) {
      add('polygon', { points: tri.map(function (pt) { return X(pt).toFixed(1) + ',' + Y(pt).toFixed(1); }).join(' '), fill: cols[i], 'fill-opacity': 0.14, stroke: cols[i], 'stroke-width': 3, 'stroke-linejoin': 'round' });
      add('text', { x: X(tri[2]), y: Y(tri[2]) - 12, 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 700, 'font-family': font, fill: cols[i] }, T.length > 1 ? 'C' + (i + 1) : 'C');
    });
    var A = [0, 0], Bp = [T.length ? T[0][1][0] : vars.p, 0];
    add('text', { x: X(A) - 14, y: Y(A) + 20, 'font-size': 17, 'font-weight': 700, 'font-family': font, fill: ink }, 'A');
    add('text', { x: X(Bp) + 6, y: Y(Bp) + 20, 'font-size': 17, 'font-weight': 700, 'font-family': font, fill: ink }, 'B');
    if (!T.length) {
      // show the given parts that cannot meet
      add('line', { x1: X(A), y1: Y(A), x2: X([vars.p, 0]), y2: Y(A), stroke: ink, 'stroke-width': 3 });
      add('text', { x: W / 2, y: 60, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, 'font-family': font, fill: orange }, 'These parts do not make a triangle.');
    }
    svg.setAttribute('aria-label', T.length === 0 ? 'No triangle has these parts.' : T.length === 1 ? 'One triangle has these parts.' : 'Two different triangles have these parts.');
    el.appendChild(svg);
  }
  var LAB = { p: 'side p', q: 'side q', r: 'side r', s: 'angle s', t: 'angle t' };
  var NAME = function (n) {
    var m = { SSS: { p: 'AB', q: 'AC', r: 'BC' }, SAS: { p: 'AB', q: 'AC', s: 'angle A' }, ASA: { p: 'AB', s: 'angle A', t: 'angle B' }, AAS: { p: 'BC', s: 'angle A', t: 'angle B' }, RHS: { r: 'BC (hypotenuse)', p: 'AB' }, SSA: { p: 'AB', q: 'BC', s: 'angle A' } };
    return m[test][n];
  };
  function slider(nm) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + LAB[nm] + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + LAB[nm] + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[nm] = r2(v); rr.value = vars[nm]; B.moved = true; report(); };
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
    USES[test].forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n)); });
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.choose) TESTS.forEach(function (t) { var b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.setAttribute('aria-label', 'Give ' + t); b.setAttribute('aria-pressed', t === test ? 'true' : 'false'); b.addEventListener('click', function () { test = t; B.moved = true; paintPanel(); report(); }); bar.appendChild(b); });
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = NAME(o.n) + ' = ' + B.fmt(vars[o.n]) + (/[st]/.test(o.n) ? '°' : ''); });
    var T = solve(); draw(T);
    var given = USES[test].map(function (n) { return NAME(n) + ' = ' + B.fmt(vars[n]) + (/[st]/.test(n) ? '°' : ''); }).concat(test === 'RHS' ? ['angle A = 90°'] : []);
    ui.work.textContent = test + ': ' + given.join(', ');
    var desc = function (tri) { return 'AB = ' + B.fmt(r2(len(tri[0], tri[1]))) + ', AC = ' + B.fmt(r2(len(tri[0], tri[2]))) + ', BC = ' + B.fmt(r2(len(tri[1], tri[2]))) + '; angles A ' + Math.round(ang(tri[0], tri[1], tri[2])) + '°, B ' + Math.round(ang(tri[1], tri[0], tri[2])) + '°, C ' + Math.round(ang(tri[2], tri[0], tri[1])) + '°'; };
    var note;
    if (!T.length) note = test === 'SSS' ? 'No triangle: the two shorter sides must add to more than the longest.' : test === 'RHS' ? 'No triangle: the hypotenuse must be the longest side.' : (test === 'ASA' || test === 'AAS') ? 'No triangle: the two angles must add to less than 180°.' : 'No triangle: side BC is too short to reach the line from A.';
    else if (T.length === 1) note = 'Exactly one triangle (' + desc(T[0]) + '). ' + (test === 'SSA' ? 'This time SSA fixes it, but not always: try a shorter BC.' : 'These parts fix the triangle, so ' + test + ' is a congruence test: any two triangles with these parts are congruent.');
    else note = 'Two different triangles: C1 (' + desc(T[0]) + ') and C2 (' + desc(T[1]) + '). The same SSA parts, but not congruent: SSA is not a congruence test.';
    ui.note.textContent = note;
    B.say(ui.work.textContent + '. ' + note);
    B.save({ vars: vars, test: test });
    B.post({ scope: { vars: { n: T.length, k: test === 'SSA' ? 0 : 1, p: vars.p, q: vars.q, r: vars.r, s: vars.s, t: vars.t }, points: {} } }, ui.work.textContent + '. ' + note);
  }
  B.widget('congruence', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Triangles built from given sides and angles'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      test = sv && sv.test && spec.choose ? sv.test : spec.t0;
      vars = {}; ['p', 'q', 'r', 's', 't'].forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fix[n]; });
      paintPanel(); report();
    },
  });
})(WPB);
