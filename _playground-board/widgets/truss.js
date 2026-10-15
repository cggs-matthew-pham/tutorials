// Structures (Engineering › Structures): pin-jointed trusses solved by the stiffness method (every member the same
// stiffness, so trusses with spare members work too), and a beam on two supports.
//   widget: truss
//   mode: truss | beam
// mode truss:
//   joint A: 0, 0 pin        a joint (metres); "pin" holds it still, "roller" lets it slide sideways
//   member: A-B, A-C, B-C    the members
//   load C: 1000 down        a load at a joint (newtons; down, up, left or right); several allowed
//   strength: 1000           the most any member can pull (tension), in N
//   buckle: 1000             a 1 m member buckles under this push (N); a member L m long buckles at buckle ÷ L²
//   edit: on                 click a joint, then another, to add or remove a member
//   raise C: 1, 4            a slider for joint C's height (metres, from, to)
//   cost: 10   budget: 120   dollars a metre of member, and the most the brief allows
//   numbers: off             hide the forces (colours stay)
// mode beam:
//   span: 0.5 (m)  load: 10 (N)  at: 0.25 (m from the left support)  shape: flat | edge | ibeam | tube
//   choose: on (shape menu)  move: on (load position slider)  limit: 2 (mm of sag allowed)
// state: { scope: { vars: truss { stable, n_m, n_j, fail (members over their limit), max_t, max_c (largest pull and
//          push, N), load_n (the first load), cost, fail_load (load at which the first member gives way), tested,
//          h_<joint> (raised joint's height), f_ab … (force in member A-B: + pulls, − pushes) };
//          beam { r_a, r_b (support forces, N), defl_mm, i_mm4, area_mm2, s (1 flat, 2 edge, 3 ibeam, 4 tube), ok,
//          load_n, at_m } } }
// Checks: "stable = 1 and tested = 1", "fail = 0 and cost <= 120", "s = 2 and ok = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {};
  var on = function (s) { return /^on$/i.test(s || ''); };
  var r0 = function (v) { return Math.round(v); }, r2 = function (v) { return Math.round(v * 100) / 100; };
  var DIRS = { down: [0, -1], up: [0, 1], left: [-1, 0], right: [1, 0] };
  var SHAPES = {   // millimetres: about the same material in each
    flat: { name: 'Flat strip (30 × 3)', A: 90, I: 67.5, draw: [[-15, -1.5, 30, 3]] },
    edge: { name: 'Strip on its edge (3 × 30)', A: 90, I: 6750, draw: [[-1.5, -15, 3, 30]] },
    ibeam: { name: 'I-beam (30 deep)', A: 100.5, I: 14655, draw: [[-10, -15, 20, 1.5], [-0.75, -13.5, 1.5, 27], [-10, 13.5, 20, 1.5]] },
    tube: { name: 'Square tube (20 × 20)', A: 90.2, I: 5337, draw: [[-10, -10, 20, 1.2], [-10, 8.8, 20, 1.2], [-10, -8.8, 1.2, 17.6], [8.8, -8.8, 1.2, 17.6]] },
  };
  var SHAPE_KEYS = ['flat', 'edge', 'ibeam', 'tube'], E_PINE = 10000;   // N/mm²

  function parse(s) {
    s.mode = String(s.mode || 'truss').toLowerCase();
    if (['truss', 'beam'].indexOf(s.mode) < 0) throw new Error('mode: truss or beam.');
    s.hide = /^off$/i.test(s.numbers || '');
    if (s.mode === 'beam') {
      s.span = Number(s.span || 0.5); s.P0 = Number(s.load === undefined ? 10 : s.load); s.at0 = Number(s.at === undefined ? s.span / 2 : s.at);
      if (!(s.span > 0 && s.at0 > 0 && s.at0 < s.span)) throw new Error('at: between 0 and the span.');
      s.shape0 = String(s.shape || 'flat').toLowerCase(); if (!SHAPES[s.shape0]) throw new Error('shape: flat, edge, ibeam or tube.');
      s.choose = on(s.choose); s.move = on(s.move); s.limit = s.limit === undefined ? null : Number(s.limit);
      return;
    }
    s.joints = []; s.loads = []; s.raise = null;
    s.items.forEach(function (it) {
      if (it.kind === 'joint') {
        var m = /^(-?[\d.]+)\s*,\s*(-?[\d.]+)(?:\s+(pin|roller))?$/i.exec(it.value);
        if (!m || !/^[A-Z]$/.test(it.name)) throw new Error('Line ' + it.line + ': joint A: x, y (metres), then pin or roller if it is a support. Joints are single capital letters.');
        s.joints.push({ id: it.name, x: +m[1], y: +m[2], sup: (m[3] || '').toLowerCase() });
      } else if (it.kind === 'load') {
        var l = /^([\d.]+)\s+(down|up|left|right)$/i.exec(it.value);
        if (!l) throw new Error('Line ' + it.line + ': load C: 1000 down (or up, left, right).');
        s.loads.push({ at: it.name, n: +l[1], dir: l[2].toLowerCase() });
      } else if (it.kind === 'raise') {
        var r = /^([\d.]+)\s*,\s*([\d.]+)$/.exec(it.value);
        if (!r) throw new Error('Line ' + it.line + ': raise C: lowest, highest (metres).');
        s.raise = { id: it.name, lo: +r[1], hi: +r[2] };
      }
    });
    var ids = s.joints.map(function (j) { return j.id; });
    s.members0 = String(s.member || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean).map(function (t) {
      var m = /^([A-Z])-([A-Z])$/.exec(t);
      if (!m || ids.indexOf(m[1]) < 0 || ids.indexOf(m[2]) < 0 || m[1] === m[2]) throw new Error('member: pairs of joints such as A-B, A-C.');
      return [m[1], m[2]];
    });
    s.loads.forEach(function (l) { if (ids.indexOf(l.at) < 0) throw new Error('load ' + l.at + ': no joint of that name.'); });
    if (s.raise && ids.indexOf(s.raise.id) < 0) throw new Error('raise ' + s.raise.id + ': no joint of that name.');
    s.strength = Number(s.strength || 1000); s.buckle = Number(s.buckle || 1000);
    s.cost = Number(s.cost || 0); s.budget = s.budget === undefined ? null : Number(s.budget);
    s.edit = on(s.edit);
  }

  // ------------------------------------------------------------------ truss solver
  function jointBy(id) { return st.joints.filter(function (j) { return j.id === id; })[0]; }
  function mkey(m) { return m[0] < m[1] ? m[0] + m[1] : m[1] + m[0]; }
  function len(m) { var a = jointBy(m[0]), b = jointBy(m[1]); return Math.hypot(b.x - a.x, b.y - a.y); }
  function solve(scale) {
    var used = {}, k = scale === undefined ? 1 : scale;
    st.members.forEach(function (m) { used[m[0]] = used[m[1]] = 1; });
    spec.loads.forEach(function (l) { used[l.at] = 1; });
    st.joints.forEach(function (j) { if (j.sup) used[j.id] = 1; });
    var J = st.joints.filter(function (j) { return used[j.id]; }), idx = {};
    J.forEach(function (j, i) { idx[j.id] = i; });
    var n = 2 * J.length, K = [], F = [];
    for (var i = 0; i < n; i++) { K.push(new Array(n).fill(0)); F.push(0); }
    st.members.forEach(function (m) {
      var a = jointBy(m[0]), b = jointBy(m[1]), L = Math.hypot(b.x - a.x, b.y - a.y), c = (b.x - a.x) / L, s = (b.y - a.y) / L, ke = 1 / L;
      var d = [2 * idx[m[0]], 2 * idx[m[0]] + 1, 2 * idx[m[1]], 2 * idx[m[1]] + 1], v = [-c, -s, c, s];
      for (var p = 0; p < 4; p++) for (var q = 0; q < 4; q++) K[d[p]][d[q]] += ke * v[p] * v[q];
    });
    spec.loads.forEach(function (l) { var dv = DIRS[l.dir]; F[2 * idx[l.at]] += dv[0] * l.n * k; F[2 * idx[l.at] + 1] += dv[1] * l.n * k; });
    var fixed = {};
    J.forEach(function (j) { if (j.sup === 'pin') { fixed[2 * idx[j.id]] = 1; fixed[2 * idx[j.id] + 1] = 1; } else if (j.sup === 'roller') fixed[2 * idx[j.id] + 1] = 1; });
    var free = []; for (i = 0; i < n; i++) if (!fixed[i]) free.push(i);
    // Gaussian elimination on the free rows; a tiny pivot means the shape can change without stretching any member.
    var A = free.map(function (r) { return free.map(function (c2) { return K[r][c2]; }).concat([F[r]]); }), N = free.length, maxd = 0;
    for (i = 0; i < N; i++) maxd = Math.max(maxd, Math.abs(A[i][i]));
    for (var col = 0; col < N; col++) {
      var piv = col; for (var r = col + 1; r < N; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r;
      if (Math.abs(A[piv][col]) < 1e-9 * Math.max(1, maxd)) return { stable: false };
      var t = A[col]; A[col] = A[piv]; A[piv] = t;
      for (r = 0; r < N; r++) if (r !== col) { var f = A[r][col] / A[col][col]; if (f) for (var cc = col; cc <= N; cc++) A[r][cc] -= f * A[col][cc]; }
    }
    var u = new Array(n).fill(0);
    free.forEach(function (dof, i2) { u[dof] = A[i2][N] / A[i2][i2]; });
    var forces = {};
    st.members.forEach(function (m) {
      var a = jointBy(m[0]), b = jointBy(m[1]), L = Math.hypot(b.x - a.x, b.y - a.y), c = (b.x - a.x) / L, s = (b.y - a.y) / L;
      var du = (u[2 * idx[m[1]]] - u[2 * idx[m[0]]]) * c + (u[2 * idx[m[1]] + 1] - u[2 * idx[m[0]] + 1]) * s;
      forces[mkey(m)] = du / L;   // + pulls (tension), − pushes (compression)
    });
    return { stable: true, forces: forces };
  }
  function cap(m, f) { var L = len(m); return f >= 0 ? spec.strength : Math.min(spec.strength, spec.buckle / (L * L)); }
  function analyse() {
    var S = solve(1), out = { stable: S.stable, fail: 0, maxT: 0, maxC: 0, failLoad: 0, weakest: null, forces: S.forces || {} };
    var cost = 0; st.members.forEach(function (m) { cost += len(m) * spec.cost; }); out.cost = Math.round(cost * 100) / 100;
    if (!S.stable) return out;
    var ratio = Infinity;
    st.members.forEach(function (m) {
      var f = S.forces[mkey(m)];
      if (Math.abs(f) < 1e-9) return;
      if (f > 0) out.maxT = Math.max(out.maxT, f); else out.maxC = Math.max(out.maxC, -f);
      var c = cap(m, f); if (Math.abs(f) > c + 1e-6) out.fail++;
      var rr = c / Math.abs(f); if (rr < ratio) { ratio = rr; out.weakest = m; }
    });
    var L0 = spec.loads.length ? spec.loads[0].n : 0;
    out.failLoad = isFinite(ratio) ? Math.round(L0 * ratio) : 0;
    return out;
  }

  // ------------------------------------------------------------------ beam
  function beam() {
    var S = SHAPES[st.shape], Lmm = spec.span * 1000, a = st.at * 1000, b = Lmm - a;
    var ra = st.P * b / Lmm, rb = st.P * a / Lmm, d = st.P * a * a * b * b / (3 * E_PINE * S.I * Lmm);
    return { ra: r2(ra), rb: r2(rb), d: r2(d), S: S };
  }

  // ------------------------------------------------------------------ drawing
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, 'text-anchor': anchor || 'middle', class: cls || 'glabel' }, parent); e.textContent = t; return e; }
  function drawTruss() {
    var host = B.el('board'); host.replaceChildren();
    var xs = st.joints.map(function (j) { return j.x; }), ys = st.joints.map(function (j) { return j.y; });
    if (spec.raise) ys.push(spec.raise.hi, spec.raise.lo);
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var S = Math.min(460 / Math.max(1, x1 - x0), 170 / Math.max(1, y1 - y0)), W = 600, H = 320;
    var X = function (x) { return 70 + (x - x0) * S + (460 - (x1 - x0) * S) / 2; }, Y = function (y) { return 255 - (y - y0) * S; };
    ui.X = X; ui.Y = Y;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'gearsvg trsvg', role: 'img', 'aria-label': 'A frame of members joined at pins, with a load' }, host);
    el('line', { x1: 10, y1: Y(y0) + 30, x2: W - 10, y2: Y(y0) + 30, class: 'lvground' }, svg);
    var R = st.result;
    st.members.forEach(function (m) {
      var a = jointBy(m[0]), b = jointBy(m[1]), f = R && R.stable ? R.forces[mkey(m)] * (st.toFail || 1) : 0, over = R && R.stable && Math.abs(f) > cap(m, f) + 1e-3 && !st.toFail;
      var cls = 'trmem' + (!R || !st.tested ? '' : !R.stable ? ' loose' : Math.abs(f) < 1e-6 ? ' zero' : f > 0 ? ' pull' : ' push') + (over ? ' over' : '') + (R && R.weakest && mkey(R.weakest) === mkey(m) && st.toFail ? ' weak' : '');
      el('line', { x1: X(a.x), y1: Y(a.y), x2: X(b.x), y2: Y(b.y), class: cls, 'stroke-width': R && R.stable && st.tested ? Math.max(3, Math.min(14, 3 + Math.abs(f) / 150)) : 4 }, svg);
      if (R && R.stable && st.tested && !spec.hide && Math.abs(f) > 1e-6) {
        var mx = (X(a.x) + X(b.x)) / 2, my = (Y(a.y) + Y(b.y)) / 2;
        el('rect', { x: mx - 26, y: my - 10, width: 52, height: 18, rx: 4, class: 'trtag' }, svg);
        txt(svg, mx, my + 4, (f > 0 ? '+' : '−') + r0(Math.abs(f)), 'trnum');
      }
    });
    st.joints.forEach(function (j) {
      var x = X(j.x), y = Y(j.y);
      if (j.sup === 'pin') el('path', { d: 'M' + x + ',' + y + ' l-14,24 l28,0 Z', class: 'lvpivot' }, svg);
      if (j.sup === 'roller') { el('path', { d: 'M' + x + ',' + y + ' l-14,18 l28,0 Z', class: 'lvpivot' }, svg); el('circle', { cx: x - 7, cy: y + 23, r: 4, class: 'plwheel' }, svg); el('circle', { cx: x + 7, cy: y + 23, r: 4, class: 'plwheel' }, svg); }
      var c = el('circle', { cx: x, cy: y, r: 9, class: 'trjoint' + (st.pick === j.id ? ' sel' : ''), tabindex: spec.edit ? 0 : -1, role: spec.edit ? 'button' : 'img', 'aria-label': 'Joint ' + j.id }, svg);
      if (spec.edit) {
        c.addEventListener('click', function () { pickJoint(j.id); });
        c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickJoint(j.id); } });
      }
      txt(svg, x + 14, y - 10, j.id, 'trname', 'start');
    });
    spec.loads.forEach(function (l) {
      var j = jointBy(l.at), dv = DIRS[l.dir], x = X(j.x), y = Y(j.y), len2 = 46;
      var sx = x - dv[0] * len2, sy = y + dv[1] * len2;
      el('line', { x1: sx, y1: sy, x2: x - dv[0] * 12, y2: y + dv[1] * 12, class: 'trload' }, svg);
      el('path', { d: 'M' + (x - dv[0] * 12) + ',' + (y + dv[1] * 12) + ' l' + (-dv[0] * 10 - dv[1] * 6) + ',' + (dv[1] * 10 - dv[0] * 6) + ' l' + (dv[1] * 12) + ',' + (dv[0] * 12) + ' Z', class: 'trhead' }, svg);
      txt(svg, sx + (dv[0] ? -dv[0] * 8 : 0), sy + (dv[1] ? dv[1] * 14 : 4), r0(l.n * (st.toFail ? st.toFail : 1)) + ' N', 'glabel', dv[0] > 0 ? 'end' : dv[0] < 0 ? 'start' : 'middle');
    });
    if (R && !R.stable && st.tested) txt(svg, W / 2, 30, 'Collapses: it can change shape without any member stretching.', 'mvjam');
  }
  function drawBeam() {
    var host = B.el('board'); host.replaceChildren();
    var svg = el('svg', { viewBox: '0 0 600 320', class: 'gearsvg trsvg', role: 'img', 'aria-label': 'A beam on two supports with a load' }, host);
    var x0 = 70, x1 = 430, y = 150, Bm = beam(), sag = Math.min(90, Bm.d * 6), ax = x0 + (x1 - x0) * st.at / spec.span;
    // the bent beam: a smooth curve through the supports and the sagging load point
    el('path', { d: 'M' + x0 + ',' + y + ' Q' + ax + ',' + (y + 2 * sag) + ' ' + x1 + ',' + y, class: 'trbeam' }, svg);
    [x0, x1].forEach(function (x) { el('path', { d: 'M' + x + ',' + (y + 4) + ' l-14,24 l28,0 Z', class: 'lvpivot' }, svg); });
    el('line', { x1: ax, y1: y + sag - 70, x2: ax, y2: y + sag - 12, class: 'trload' }, svg);
    el('path', { d: 'M' + ax + ',' + (y + sag - 4) + ' l-7,-12 l14,0 Z', class: 'trhead' }, svg);
    txt(svg, ax, y + sag - 76, st.P + ' N', 'glabel');
    if (!spec.hide) { txt(svg, x0, y + 50, B.fmt(Bm.ra) + ' N', 'glabel'); txt(svg, x1, y + 50, B.fmt(Bm.rb) + ' N', 'glabel'); }
    // the cross-section, drawn big
    var g = el('g', { transform: 'translate(525,150) scale(2.4)' }, svg);
    Bm.S.draw.forEach(function (r) { el('rect', { x: r[0], y: r[1], width: r[2], height: r[3], class: 'trsect' }, g); });
    txt(svg, 525, 240, 'cross-section', 'mvsmall');
  }
  function draw() { if (spec.mode === 'beam') drawBeam(); else drawTruss(); }

  // ------------------------------------------------------------------ actions
  function pickJoint(id) {
    if (!st.pick) { st.pick = id; draw(); return report('Joint ' + id + ' picked: now pick the joint at the other end.'); }
    if (st.pick === id) { st.pick = null; draw(); return report(); }
    var m = [st.pick, id], k = mkey(m), i = st.members.map(mkey).indexOf(k);
    if (i >= 0) { st.members.splice(i, 1); st.pick = null; } else { st.members.push(m); st.pick = null; }
    st.tested = 0; st.toFail = 0; st.result = null; B.moved = true; draw(); report(i >= 0 ? 'Removed member ' + m.join('-') + '.' : 'Added member ' + m.join('-') + '.');
  }
  function test() {
    B.moved = true; st.tested = 1; st.toFail = 0; st.result = analyse(); draw();
    var R = st.result;
    report(!R.stable ? 'It collapses.' : R.fail ? R.fail + (R.fail === 1 ? ' member gives way.' : ' members give way.') : 'It holds.');
  }
  function toFail() {
    B.moved = true; st.tested = 1; st.result = analyse(); var R = st.result;
    if (!R.stable) { draw(); return report('It collapses under any load.'); }
    st.failLoad = R.failLoad; st.toFail = spec.loads[0] ? R.failLoad / spec.loads[0].n : 0; draw();
    report('Loaded until something gave way: member ' + R.weakest.join('-') + ' fails at ' + R.failLoad + ' N.');
  }
  function btn(text, label, fn, quiet) {
    var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label);
    if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e;
  }
  function slider(label, lo, hi, step, val, unit, fn) {
    var wrap = document.createElement('label'); wrap.className = 'lvslide';
    var s = document.createElement('span'); s.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'range'; i.min = lo; i.max = hi; i.step = step; i.value = val; i.setAttribute('aria-label', label + ' (' + unit + ')');
    var o = document.createElement('output'); o.textContent = val + ' ' + unit;
    i.addEventListener('input', function () { var v = Number(i.value); o.textContent = v + ' ' + unit; fn(v); });
    wrap.appendChild(s); wrap.appendChild(i); wrap.appendChild(o); return wrap;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    if (spec.mode === 'truss') {
      if (spec.raise) row.appendChild(slider('Height of ' + spec.raise.id, spec.raise.lo, spec.raise.hi, 0.5, jointBy(spec.raise.id).y, 'm', function (v) { jointBy(spec.raise.id).y = v; st.tested = 0; st.toFail = 0; st.result = null; B.moved = true; draw(); report(); }));
      row.appendChild(btn('Test it', 'Put the load on and test it', test));
      row.appendChild(btn('Load until it fails', null, toFail));
    } else {
      if (spec.choose) {
        var wrap = document.createElement('label'); wrap.textContent = 'Shape ';
        var s = document.createElement('select');
        SHAPE_KEYS.forEach(function (k) { var o = document.createElement('option'); o.value = k; o.textContent = SHAPES[k].name; s.appendChild(o); });
        s.value = st.shape; s.addEventListener('change', function () { st.shape = s.value; B.moved = true; draw(); report(); });
        wrap.appendChild(s); row.appendChild(wrap);
      }
      if (spec.move) row.appendChild(slider('Load position', 0.05, r2(spec.span - 0.05), 0.05, st.at, 'm', function (v) { st.at = v; B.moved = true; draw(); report(); }));
      row.appendChild(btn('− 5 N', 'Take 5 newtons off the load', function () { if (st.P >= 5) { st.P -= 5; B.moved = true; draw(); report(); } }, true));
      row.appendChild(btn('+ 5 N', 'Add 5 newtons to the load', function () { st.P += 5; B.moved = true; draw(); report(); }, true));
    }
    row.appendChild(btn('Start again', null, function () { B.restart(); }, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
  }

  function report(note) {
    var facts = [], vars = {}, base;
    if (spec.mode === 'truss') {
      var R = st.result || analyse(), used = {};
      st.members.forEach(function (m) { used[m[0]] = used[m[1]] = 1; });
      var nj = Object.keys(used).length;
      facts.push(st.members.length + ' members, ' + nj + ' joints');
      if (spec.cost) facts.push('cost $' + B.fmt(R.cost) + (spec.budget !== null ? ' (' + (R.cost <= spec.budget + 1e-9 ? '✓' : '✗') + ' at most $' + spec.budget + ')' : ''));
      if (st.tested) {
        if (!R.stable) facts.push('✗ collapses');
        else {
          if (!spec.hide) { facts.push('biggest pull ' + r0(R.maxT) + ' N'); facts.push('biggest push ' + r0(R.maxC) + ' N'); }
          facts.push(R.fail ? '✗ ' + R.fail + ' over the limit' : '✓ every member within its limit');
          if (st.toFail) facts.push('gives way at ' + st.failLoad + ' N');
        }
      }
      vars = { stable: R.stable ? 1 : 0, n_m: st.members.length, n_j: nj, fail: R.stable ? R.fail : 99, max_t: r0(R.maxT), max_c: r0(R.maxC),
        load_n: spec.loads[0] ? spec.loads[0].n : 0, cost: R.cost, fail_load: st.toFail ? st.failLoad : 0, tested: st.tested };
      st.members.forEach(function (m) { var f = R.stable ? R.forces[mkey(m)] : 0; vars['f_' + mkey(m).toLowerCase()] = r0(f); });
      if (spec.raise) vars['h_' + spec.raise.id.toLowerCase()] = jointBy(spec.raise.id).y;
      base = 'Blue members pull (tension), red members push (compression); thicker means more force. Pins don\'t turn members; members only pull or push. Members pull up to ' + spec.strength + ' N; a 1 m member buckles under a ' + spec.buckle + ' N push, a 2 m one under a quarter of that.';
      if (spec.edit) base = 'Click a joint, then another, to add (or remove) a member. ' + base;
      B.save({ members: st.members, h: spec.raise ? jointBy(spec.raise.id).y : null });
    } else {
      var Bm = beam();
      if (!spec.hide) { facts.push('supports ' + B.fmt(Bm.ra) + ' N and ' + B.fmt(Bm.rb) + ' N'); facts.push('sag ' + B.fmt(Bm.d) + ' mm'); facts.push('I = ' + B.fmt(Bm.S.I) + ' mm⁴'); facts.push('material ' + B.fmt(Bm.S.A) + ' mm²'); }
      else facts.push('Watch how far it sags.');
      if (spec.limit !== null && !spec.hide) facts.push((Bm.d <= spec.limit + 1e-9 ? '✓' : '✗') + ' sag at most ' + spec.limit + ' mm');
      vars = { r_a: Bm.ra, r_b: Bm.rb, defl_mm: Bm.d, i_mm4: Bm.S.I, area_mm2: Bm.S.A, s: SHAPE_KEYS.indexOf(st.shape) + 1, ok: spec.limit === null || Bm.d <= spec.limit + 1e-9 ? 1 : 0, load_n: st.P, at_m: st.at };
      base = 'A pine beam, ' + spec.span * 1000 + ' mm between supports. The bend is drawn bigger than life.';
      B.save({ shape: st.shape, P: st.P, at: st.at });
    }
    ui.facts.textContent = facts.join(' · ');
    ui.note.textContent = note || base;
    B.say(facts.join('. '));
    B.post({ scope: { vars: vars, points: {} } }, facts.join('. ') + (note ? ' ' + note : ''));
  }

  B.widget('truss', {
    sections: ['board', 'gpanel'],
    label: function () { return spec && spec.mode === 'beam' ? 'A beam on two supports' : 'A frame of members joined at pins'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      if (spec.mode === 'beam') {
        st = { shape: spec.shape0, P: spec.P0, at: spec.at0 };
        if (sv) { if (spec.choose && SHAPES[sv.shape]) st.shape = sv.shape; if (sv.P >= 0) st.P = sv.P; if (spec.move && sv.at > 0 && sv.at < spec.span) st.at = sv.at; }
      } else {
        st = { joints: spec.joints.map(function (j) { return Object.assign({}, j); }), members: spec.members0.map(function (m) { return m.slice(); }), tested: 0, toFail: 0, result: null, pick: null };
        if (sv) {
          if (spec.edit && Array.isArray(sv.members)) st.members = sv.members.filter(function (m) { return jointBy(m[0]) && jointBy(m[1]); });
          if (spec.raise && sv.h >= spec.raise.lo && sv.h <= spec.raise.hi) jointBy(spec.raise.id).y = sv.h;
        }
      }
      paintPanel(); draw(); report();
    },
  });
})(WPB);
