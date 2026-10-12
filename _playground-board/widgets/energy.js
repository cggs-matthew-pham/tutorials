// Energy (AC9S8U05, AC9S9U05): where energy is stored, how it moves and changes, and where it ends up.
//   widget: energy
//   mode: coaster | chain | sankey
//   coaster  A roller coaster car on a track of hills. Play, Pause, Reset; bars for gravitational potential, kinetic,
//            and heat and sound (friction), with the total marked. Energy is conserved: the total never changes.
//              start: 30          (height of the first hill in m, 10 to 50; default 30)
//              mass: 500          (kg; default 500)   g: 10 (N/kg; default 10)
//              friction: off | on | toggle   (default off; toggle adds a Friction button)
//              drag: 400          (friction force in N while moving; default 400)
//              run: 5             (seconds already run at the start, for a picture)
//   chain    An energy flow diagram to complete: for each stage after the first, choose the useful energy type, and
//            for each arrow choose Transfer (same type) or Transformation (type changes). Check shows the
//            by-products (usually heat) at each stage.
//              stage: Battery | chemical          (a name, then its useful type, then any by-products)
//              stage: Bulb | light | heat
//              show: answers      (everything filled in, for a picture or a teacher)
//            types: chemical, gravitational, elastic, kinetic, thermal, sound, light, electrical
//   sankey   A Sankey diagram: band widths show energy. With build: on, sliders set each output, and the board says
//            whether the outputs add up to the input (energy is never lost) and gives the efficiency.
//              device: Filament bulb
//              input: 100, electrical      (the energy in, in J, and its type)
//              output: Light, 10, useful   (a name, the amount, and "useful" for useful outputs)
//              output: Heat, 90
//              build: on                   (outputs start at 0 for students to set; off: a finished diagram)
// state: { scope: { vars } }
//   coaster  h height (m), v speed (m/s), p potential, k kinetic, q heat and sound, t total (all kJ), r runs finished,
//            f 1 with friction on, z 1 once the car has passed the first valley
//   chain    c 1 once every choice is right, w wrong at the last check, n checks
//   sankey   i input, u useful out, w wasted out, o all out, b 1 while o = i, e efficiency (%)
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null, raf = 0;
  var TYPES = ['chemical', 'gravitational', 'elastic', 'kinetic', 'thermal', 'sound', 'light', 'electrical'];
  var KIND = { chemical: 'potential', gravitational: 'potential', elastic: 'potential', kinetic: 'kinetic', thermal: 'kinetic', sound: 'kinetic', light: 'kinetic', electrical: 'kinetic' };
  var LABEL = { chemical: 'Chemical', gravitational: 'Gravitational potential', elastic: 'Elastic potential', kinetic: 'Kinetic (movement)', thermal: 'Thermal (heat)', heat: 'Thermal (heat)', sound: 'Sound', light: 'Light', electrical: 'Electrical' };
  function norm(t) { t = String(t).trim().toLowerCase(); if (t === 'heat') return 'thermal'; if (t === 'movement' || t === 'motion') return 'kinetic'; return t; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function dark() { return document.documentElement.classList.contains('dark') || matchMedia('(prefers-color-scheme: dark)').matches; }
  function cols() { var d = dark(); return { ink: d ? '#e4eaf3' : '#1d2430', muted: d ? '#93a1b5' : '#5a6475', line: d ? 'rgba(228,234,243,0.3)' : 'rgba(29,36,48,0.25)', pot: '#3f7fc4', kin: '#d8862b', heat: '#c9473d', total: d ? '#e4eaf3' : '#1d2430', track: d ? '#93a1b5' : '#5a6475', useful: '#2f9e6a', waste: '#c9473d', input: '#3f7fc4' }; }
  function r1(x) { return Math.round(x * 10) / 10; }

  // ---------- parse ----------
  function parse(s) {
    s.mode = s.mode || 'coaster';
    if (['coaster', 'chain', 'sankey'].indexOf(s.mode) < 0) throw new Error('mode: use coaster, chain or sankey.');
    if (s.mode === 'coaster') {
      s.H = s.start ? Number(s.start) : 30; if (!(s.H >= 10 && s.H <= 50)) throw new Error('start: a height from 10 to 50 (m).');
      s.m = s.mass ? Number(s.mass) : 500; if (!(s.m > 0)) throw new Error('mass: a number of kg.');
      s.gv = s.g ? Number(s.g) : 10; if (!(s.gv > 0)) throw new Error('g: a number of N/kg.');
      s.fr = (s.friction || 'off').toLowerCase(); if (['off', 'on', 'toggle'].indexOf(s.fr) < 0) throw new Error('friction: off, on or toggle.');
      s.F = s.drag ? Number(s.drag) : 400; if (!(s.F >= 0)) throw new Error('drag: a force in N.');
      s.preRun = s.run ? Number(s.run) : 0; if (!(s.preRun >= 0 && s.preRun <= 30)) throw new Error('run: seconds already run at the start (0 to 30), for a picture.');
    }
    if (s.mode === 'chain') {
      s.stages = s.items.filter(function (it) { return it.kind === 'stage'; }).map(function (it) {
        var p = it.value.split('|').map(function (t) { return t.trim(); });
        if (p.length < 2) throw new Error('Line ' + it.line + ': write "stage: Name | type", such as "stage: Battery | chemical".');
        var types = p.slice(1).map(norm);
        types.forEach(function (t) { if (TYPES.indexOf(t) < 0) throw new Error('Line ' + it.line + ': "' + t + '" is not an energy type (' + TYPES.join(', ') + ').'); });
        return { name: p[0], type: types[0], extra: types.slice(1) };
      });
      if (s.stages.length < 2) throw new Error('Add at least two stage lines.');
      s.answers = /^answers$/i.test(s.show || '');
    }
    if (s.mode === 'sankey') {
      var inp = (s.input || '100, electrical').split(',').map(function (t) { return t.trim(); });
      s.inJ = Number(inp[0]); s.inType = norm(inp[1] || 'electrical');
      if (!(s.inJ > 0)) throw new Error('input: an amount of energy, such as "100, electrical".');
      s.outs = s.items.filter(function (it) { return it.kind === 'output'; }).map(function (it) {
        var p = it.value.split(',').map(function (t) { return t.trim(); });
        var v = Number(p[1]); if (!p[0] || !(v >= 0)) throw new Error('Line ' + it.line + ': write "output: Light, 10, useful".');
        return { name: p[0], v: v, useful: /useful/i.test(p[2] || '') };
      });
      if (!s.outs.length) throw new Error('Add at least one output line.');
      if (!s.outs.some(function (o) { return o.useful; })) throw new Error('Mark at least one output as useful ("output: Light, 10, useful").');
      s.build = /^on$/i.test(s.build || '');
      s.unit = s.unit || 'J';
      s.step = s.inJ >= 500 ? 10 : s.inJ >= 50 ? 5 : 1;
    }
  }

  // ---------- coaster ----------
  function knots() { var H = spec.H; return [[0, H], [25, 2], [50, 0.65 * H], [75, 3], [100, 0.35 * H], [118, 0.35 * H]]; }
  function hAt(x) {
    var K = knots(); x = Math.max(0, Math.min(K[K.length - 1][0], x));
    for (var i = 0; i < K.length - 1; i++) if (x <= K[i + 1][0]) { var t = (x - K[i][0]) / (K[i + 1][0] - K[i][0]); return K[i][1] + (K[i + 1][1] - K[i][1]) * (1 - Math.cos(Math.PI * t)) / 2; }
    return K[K.length - 1][1];
  }
  var XEND = 118;
  function coasterReset() {
    var m = spec.m, g = spec.gv;
    st.x = 0.5; st.dir = 1; st.v = 2; st.E0 = m * g * hAt(st.x) + 0.5 * m * st.v * st.v; st.q = 0; st.running = false; st.ended = false; st.slow = 0; st.time = 0; st.z = 0;
  }
  function coasterStep(dt) {
    var m = spec.m, g = spec.gv, fric = st.fric ? spec.F : 0, sub = 8;
    for (var i = 0; i < sub; i++) {
      var d = dt / sub, ds = st.v * d, x0 = st.x, slope = (hAt(x0 + 0.05) - hAt(x0 - 0.05)) / 0.1;
      var dx = ds / Math.sqrt(1 + slope * slope);
      st.x = Math.max(0, Math.min(XEND, st.x + st.dir * dx));
      st.q += fric * ds;
      var ke = st.E0 - m * g * hAt(st.x) - st.q;
      if (ke <= 0) {
        // Turned back (or, with friction, came to rest): no kinetic energy left at this point.
        st.q = Math.min(st.q, st.E0 - m * g * hAt(st.x)); ke = 0; st.dir = -st.dir;
      }
      st.v = Math.sqrt(2 * Math.max(0, ke) / m);
      if (st.x <= 0 && st.dir < 0) st.dir = 1;
    }
    if (st.x > 30) st.z = 1;
    st.time += dt;
    if (st.x >= XEND - 0.01) { st.ended = true; }
    if (st.fric) { st.slow = st.v < 0.4 ? st.slow + dt : 0; if (st.slow > 1.2) { st.q = st.E0 - m * g * hAt(st.x); st.v = 0; st.ended = true; } }
    if (st.time > 60) st.ended = true;
  }
  function buildCoaster() {
    var c = cols();
    bd = B.jsx({ boundingbox: [-6, 64, 168, -14], keepAspectRatio: false });
    var Hmax = 55, X = function (x) { return x; }, Y = function (h) { return h; };
    // Track and ground.
    var xs = [], ys = []; for (var k = 0; k <= 236; k++) { var x = k / 2; xs.push(X(x)); ys.push(Y(hAt(x))); }
    bd.create('curve', [xs, ys], { strokeColor: c.track, strokeWidth: 3, fixed: true, highlight: false });
    bd.create('segment', [[0, 0], [XEND, 0]], { strokeColor: c.line, strokeWidth: 1, dash: 2, fixed: true, highlight: false });
    bd.create('text', [1, -4, 'Ground level (height 0)'], { fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    // The car.
    bd.create('point', [function () { return X(st.x); }, function () { return Y(hAt(st.x)) + 1.6; }], { name: '', size: 9, face: 'square', fillColor: '#d8862b', strokeColor: c.ink, strokeWidth: 1.5, fixed: true, highlight: false, showInfobox: false, withLabel: false });
    bd.create('text', [function () { return X(st.x); }, function () { return Y(hAt(st.x)) + 6; }, function () { return r1(hAt(st.x)) + ' m'; }], { anchorX: 'middle', fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    // Energy bars, scaled to the total.
    var BX = 126, BW = 9, GAP = 4, TOP = 48;
    var bars = [['Potential', c.pot, function () { return spec.m * spec.gv * hAt(st.x); }], ['Kinetic', c.kin, function () { return 0.5 * spec.m * st.v * st.v; }], ['Heat, sound', c.heat, function () { return st.q; }]];
    bars.forEach(function (b, i) {
      var x0 = BX + i * (BW + GAP), hgt = function () { return Math.max(0, b[2]()) / st.E0 * TOP; };
      bd.create('polygon', [[x0, 0], [x0 + BW, 0], [function () { return x0 + BW; }, hgt], [x0, hgt]], { fillColor: b[1], fillOpacity: 0.9, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
      bd.create('text', [x0 + BW / 2, -4.5, b[0].replace('\n', ' ')], { anchorX: 'middle', anchorY: 'middle', fontSize: 10, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
      bd.create('text', [x0 + BW / 2, function () { return hgt() + 3; }, function () { return r1(b[2]() / 1000) + ' kJ'; }], { anchorX: 'middle', fontSize: 11, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
    });
    bd.create('segment', [[BX - 1.5, TOP], [BX + 3 * BW + 2 * GAP + 1.5, TOP]], { strokeColor: c.total, strokeWidth: 2, dash: 3, fixed: true, highlight: false });
    bd.create('text', [BX + (3 * BW + 2 * GAP) / 2, TOP + 10, function () { return 'Total: ' + r1(st.E0 / 1000) + ' kJ'; }], { anchorX: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    bd.create('text', [BX + (3 * BW + 2 * GAP) / 2, -9, 'Energy (bars add up to the total)'], { anchorX: 'middle', fontSize: 10, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    void Hmax;
    bd.update();
  }
  function loop(tPrev) {
    raf = requestAnimationFrame(function (t) {
      var dt = Math.min(0.05, (t - (tPrev || t)) / 1000);
      if (st.running && !st.ended) { coasterStep(dt * 1.5); bd.update(); liveInfo(); if (st.ended) { st.running = false; st.runs++; paint(); } report(); }
      loop(t);
    });
  }
  function liveInfo(live) { live = live || document.getElementById('enlive'); if (live) live.textContent = 'Height ' + r1(hAt(st.x)) + ' m · speed ' + r1(st.v) + ' m/s.'; }
  function paintCoaster(panel) {
    var bar = el('div', 'fbar');
    var play = el('button', 'go', st.running ? 'Pause' : st.ended ? 'Play again' : 'Play'); play.type = 'button';
    play.addEventListener('click', function () { B.moved = true; if (st.ended) { coasterReset(); bd.update(); } st.running = !st.running; paint(); report(); });
    var reset = el('button', '', 'Reset'); reset.type = 'button';
    reset.addEventListener('click', function () { B.moved = true; coasterReset(); bd.update(); paint(); report(); });
    bar.append(play, reset);
    if (spec.fr === 'toggle') {
      var fb = el('button', '', 'Friction: ' + (st.fric ? 'on' : 'off')); fb.type = 'button'; fb.setAttribute('aria-pressed', String(st.fric));
      fb.addEventListener('click', function () { B.moved = true; st.fric = !st.fric; coasterReset(); bd.update(); paint(); report(); });
      bar.append(fb);
    }
    panel.appendChild(bar);
    var info = el('div', 'cinfo');
    var live = el('b', '', ''); live.id = 'enlive'; info.appendChild(live); liveInfo(live);
    info.appendChild(el('span', '', st.fric ? ' Friction and air resistance turn some energy into heat and sound as the car moves.' : ' No friction: energy only changes between gravitational potential and kinetic.'));
    info.appendChild(el('i', '', 'Energy can change type, but the total stays the same.'));
    panel.appendChild(info);
  }

  // ---------- chain ----------
  function paintChain(panel) {
    var S = spec.stages, row = el('div', 'corow');
    S.forEach(function (s, i) {
      if (i > 0) {
        var arrow = el('div', 'enarrow'), ok = S[i - 1].type === s.type ? 'transfer' : 'transformation';
        if (spec.answers || st.checked && st.arrow[i] === ok) arrow.appendChild(el('span', '', ok === 'transfer' ? 'Transfer →' : 'Transformation →'));
        else {
          var sa = el('select'); sa.setAttribute('aria-label', 'Arrow into ' + s.name);
          sa.appendChild(new Option('→ ?', '')); sa.appendChild(new Option('Transfer →', 'transfer')); sa.appendChild(new Option('Transformation →', 'transformation'));
          sa.value = st.arrow[i] || ''; sa.addEventListener('change', function () { st.arrow[i] = sa.value; st.checked = false; });
          if (st.checked && st.arrow[i] !== ok) arrow.classList.add('bad');
          arrow.appendChild(sa);
        }
        row.appendChild(arrow);
      }
      var box = el('div', 'cobox' + (st.checked && i > 0 && st.type[i] !== s.type ? ' bad' : st.checked || spec.answers || i === 0 ? ' lit' : ''));
      box.appendChild(el('b', '', s.name));
      if (i === 0 || spec.answers || st.checked && st.type[i] === s.type) box.appendChild(el('span', 'entype', LABEL[s.type]));
      else {
        var sel = el('select'); sel.setAttribute('aria-label', 'Energy in ' + s.name);
        sel.appendChild(new Option('Useful energy…', ''));
        TYPES.forEach(function (t) { sel.appendChild(new Option(LABEL[t], t)); });
        sel.value = st.type[i] || ''; sel.addEventListener('change', function () { st.type[i] = sel.value; st.checked = false; });
        box.appendChild(sel);
      }
      if ((st.checked || spec.answers) && s.extra.length) box.appendChild(el('small', 'enby', 'By-product: ' + s.extra.map(function (t) { return LABEL[t].toLowerCase(); }).join(', ')));
      row.appendChild(box);
    });
    panel.appendChild(row);
    if (!spec.answers) {
      var bar = el('div', 'fbar'), go = el('button', 'go', 'Check'); go.type = 'button';
      go.addEventListener('click', function () {
        B.moved = true; st.n++; st.checked = true; var w = 0;
        S.forEach(function (s, i) { if (!i) return; if (st.type[i] !== s.type) w++; if (st.arrow[i] !== (S[i - 1].type === s.type ? 'transfer' : 'transformation')) w++; });
        st.w = w; st.c = w === 0 ? 1 : st.c; paint(); report();
      });
      var rs = el('button', 'quiet', 'Start again'); rs.type = 'button'; rs.addEventListener('click', B.restart);
      bar.append(go, rs); panel.appendChild(bar);
    }
    var info = el('div', 'cinfo');
    info.appendChild(el('span', '', 'Transfer: the same type of energy moves to another place. Transformation: the energy changes type.'));
    info.appendChild(el('i', '', 'Potential (stored): chemical, gravitational, elastic. Kinetic (active): movement, heat, sound, light, electrical.'));
    panel.appendChild(info);
  }

  // ---------- sankey ----------
  function buildSankey() {
    var c = cols(), I = spec.inJ, Hb = 8, x0 = 2, xs = 10, n = spec.outs.length;
    bd = B.jsx({ boundingbox: [-1, 9.5, 31, -13.5], keepAspectRatio: false });
    var thick = function (v) { return Math.max(0, v) / I * Hb; };
    // Input band.
    bd.create('polygon', [[x0, 8], [xs, 8], [xs, 0], [x0, 0]], { fillColor: c.input, fillOpacity: 0.85, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
    bd.create('text', [x0 + 0.3, 4, I + ' ' + spec.unit + ' ' + (LABEL[spec.inType] || spec.inType).toLowerCase() + ' in'], { anchorY: 'middle', fontSize: 13, strokeColor: '#ffffff', fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    bd.create('text', [15, 9, spec.device || ''], { anchorX: 'middle', fontSize: 14, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    // Outputs, stacked from the top: useful ones go straight on; wasted ones bend down.
    var order = spec.outs.map(function (o, i) { return i; }).sort(function (a, b) { return (spec.outs[b].useful ? 1 : 0) - (spec.outs[a].useful ? 1 : 0); });
    var wasteN = 0, wastes = order.filter(function (oi) { return !spec.outs[oi].useful; });
    // Lower bands turn first (tightest), so bands never cross; each bend's inner edge stays clear of the input.
    var endXof = function (oi) { var k = wastes.indexOf(oi), x = xs + 1.5; for (var j = wastes.length - 1; j > k; j--) x += thick(st.v[wastes[j]]) + 0.8; return x + thick(st.v[oi]) / 2; };
    order.forEach(function (oi) {
      var o = spec.outs[oi], wi = o.useful ? -1 : wasteN++;
      var top = function () { var y = 8; for (var k = 0; k < order.length && order[k] !== oi; k++) y -= thick(st.v[order[k]]); return y; };
      var col = o.useful ? c.useful : c.waste;
      if (o.useful) {
        bd.create('polygon', [[xs, top], [24, top], [24, function () { return top() - thick(st.v[oi]); }], [xs, function () { return top() - thick(st.v[oi]); }]], { fillColor: col, fillOpacity: 0.85, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false, visible: function () { return st.v[oi] > 0; } });
        bd.create('text', [24.4, function () { return top() - thick(st.v[oi]) / 2; }, function () { return o.name + ' ' + st.v[oi] + ' ' + spec.unit + ' (useful)'; }], { anchorY: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
      } else {
        var cv = bd.create('curve', [[0], [0]], { fillColor: col, fillOpacity: 0.8, strokeWidth: 0, fixed: true, highlight: false, visible: function () { return st.v[oi] > 0; } });
        var endX = function () { return endXof(oi); };
        cv.updateDataArray = function () {
          var t = thick(st.v[oi]), yc = top() - t / 2, P0 = [xs, yc], C = [endX(), yc], P1 = [endX(), -9], pts = [], back = [];
          for (var k = 0; k <= 30; k++) {
            var s = k / 30, x = (1 - s) * (1 - s) * P0[0] + 2 * (1 - s) * s * C[0] + s * s * P1[0], y = (1 - s) * (1 - s) * P0[1] + 2 * (1 - s) * s * C[1] + s * s * P1[1];
            var dxs = 2 * (1 - s) * (C[0] - P0[0]) + 2 * s * (P1[0] - C[0]), dys = 2 * (1 - s) * (C[1] - P0[1]) + 2 * s * (P1[1] - C[1]), L = Math.sqrt(dxs * dxs + dys * dys) || 1;
            var nx = -dys / L, ny = dxs / L; pts.push([x + nx * t / 2, y + ny * t / 2]); back.push([x - nx * t / 2, y - ny * t / 2]);
          }
          var all = pts.concat(back.reverse()); this.dataX = all.map(function (p) { return p[0]; }); this.dataY = all.map(function (p) { return p[1]; });
        };
        var ly = -10.2 - ((wastes.length - 1 - wastes.indexOf(oi)) % 2) * 1.7;
        bd.create('text', [function () { return endX(); }, ly, function () { return o.name + ' ' + st.v[oi] + ' ' + spec.unit + ' (wasted)'; }], { anchorX: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
      }
    });
    bd.update();
  }
  function totals() {
    var u = 0, w = 0; spec.outs.forEach(function (o, i) { if (o.useful) u += st.v[i]; else w += st.v[i]; });
    return { u: u, w: w, o: u + w, e: Math.round(u / spec.inJ * 1000) / 10 };
  }
  function paintSankey(panel) {
    if (spec.build) spec.outs.forEach(function (o, i) {
      var row = el('div', 'srow'), lab = el('label', 'fname', o.name), id = 'en' + i;
      var r = el('input'); r.type = 'range'; r.min = 0; r.max = spec.inJ; r.step = spec.step; r.value = st.v[i]; r.id = id; lab.htmlFor = id;
      var minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', o.name + ': less');
      var plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', o.name + ': more');
      var out = el('output', '', st.v[i] + ' ' + spec.unit);
      var set = function (v) { st.v[i] = Math.max(0, Math.min(spec.inJ, v)); r.value = st.v[i]; out.textContent = st.v[i] + ' ' + spec.unit; B.moved = true; bd.update(); paintInfo(); report(); };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(st.v[i] - spec.step); });
      plus.addEventListener('click', function () { set(st.v[i] + spec.step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row);
    });
    var info = el('div', 'cinfo'); info.id = 'eninfo'; panel.appendChild(info); paintInfo();
  }
  function paintInfo() {
    var info = document.getElementById('eninfo'); if (!info) return; info.replaceChildren();
    var T = totals(), U = spec.unit;
    if (T.o === spec.inJ) info.appendChild(el('b', '', 'In: ' + spec.inJ + ' ' + U + '. Out: ' + T.o + ' ' + U + ' (useful ' + T.u + ', wasted ' + T.w + '). Efficiency: ' + T.u + ' ÷ ' + spec.inJ + ' = ' + T.e + '%.'));
    else info.appendChild(el('b', 'enbad', 'In: ' + spec.inJ + ' ' + U + '. Out: ' + T.o + ' ' + U + '. ' + (T.o < spec.inJ ? (spec.inJ - T.o) + ' ' + U + ' is missing: energy can’t disappear.' : (T.o - spec.inJ) + ' ' + U + ' too much: energy can’t be made.')));
    info.appendChild(el('i', '', 'Efficiency = useful energy out ÷ total energy in × 100%. Band widths show the amounts.'));
  }

  // ---------- shared ----------
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (spec.mode === 'coaster') paintCoaster(panel);
    else if (spec.mode === 'chain') paintChain(panel);
    else paintSankey(panel);
  }
  function report() {
    var vars, msg, ok = false;
    if (spec.mode === 'coaster') {
      var m = spec.m, g = spec.gv, p = m * g * hAt(st.x), k = 0.5 * m * st.v * st.v;
      vars = { h: r1(hAt(st.x)), v: r1(st.v), p: r1(p / 1000), k: r1(k / 1000), q: r1(st.q / 1000), t: r1(st.E0 / 1000), r: st.runs, f: st.fric ? 1 : 0, z: st.z };
      ok = st.runs > 0; msg = st.ended ? (st.v === 0 ? 'The car stopped. Its kinetic energy has all become heat and sound; the total is still ' + r1(st.E0 / 1000) + ' kJ.' : 'The car reached the end. ' + (st.fric ? r1(st.q / 1000) + ' kJ became heat and sound; the' : 'The') + ' total is still ' + r1(st.E0 / 1000) + ' kJ.') : 'Total ' + r1(st.E0 / 1000) + ' kJ.';
    } else if (spec.mode === 'chain') {
      vars = { c: st.c, w: st.w, n: st.n }; ok = st.c === 1;
      msg = !st.n ? 'Fill in the energy at each stage and each arrow, then Check.' : st.w ? st.w + ' to fix: the red ones.' : 'Every stage and arrow is right.';
    } else {
      var T = totals();
      vars = { i: spec.inJ, u: T.u, w: T.w, o: T.o, b: T.o === spec.inJ ? 1 : 0, e: T.e }; ok = T.o === spec.inJ;
      msg = ok ? 'Efficiency ' + T.e + '%.' : 'The outputs must add up to the input.';
      if (spec.build) B.save({ st: { v: st.v } });
    }
    B.say(msg, ok);
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }

  B.widget('energy', {
    sections: function (s) { return s.mode === 'chain' ? ['gpanel'] : ['board', 'gpanel']; },
    label: function (s) { return { coaster: 'A roller coaster car and bars showing its energy', chain: 'An energy flow diagram to complete', sankey: 'A Sankey diagram of energy in and out' }[s.mode]; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec; cancelAnimationFrame(raf);
      var sv = fresh ? null : B.saved();
      st = { runs: 0, fric: spec.fr === 'on', arrow: {}, type: {}, checked: false, c: 0, w: 0, n: 0 };
      if (spec.mode === 'coaster') { coasterReset(); for (var q = 0; q < spec.preRun * 60; q++) coasterStep(1.5 / 60); buildCoaster(); loop(); }
      if (spec.mode === 'sankey') { st.v = spec.outs.map(function (o) { return spec.build ? 0 : o.v; }); if (spec.build && sv && sv.st && sv.st.v && sv.st.v.length === spec.outs.length) st.v = sv.st.v; buildSankey(); }
      paint(); report();
    },
    redraw: function () { if (spec.mode === 'coaster') buildCoaster(); if (spec.mode === 'sankey') buildSankey(); },
    resize: function () { if (B.jsxBoard && spec.mode !== 'chain') { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
