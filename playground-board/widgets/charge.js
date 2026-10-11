// Charge (AC9S9U04 n3): the particle model of electricity.
//   widget: charge
//   mode: static | pair | current
//   static   Rub one material on another. Electrons (blue −) move from one to the other; the atoms' positive charges
//            (red +) stay put. Touch metal lets the extra electrons go back (a spark).
//              rub: Wool > Balloon     (the material that gives up electrons, then the one that gains them)
//              max: 6                  (most electrons that can move, 1 to 8; default 6)
//              run: 4                  (rubs already done at the start, for a picture)
//   pair     Two charged balls: like charges push apart, unlike charges pull together.
//              first: 2   second: -1   (the two charges, −3 to +3)    sliders: on | off
//   current  A battery, a wire loop and a bulb. In a conductor each atom has a free electron; the battery pushes them
//            round. In an insulator the electrons stay tied to their atoms.
//              material: copper | plastic | choose      volts: 3 (0 to 6)     sliders: on | off     run: 2
// state: { scope: { vars } }
//   static   a net charge of the first material, b of the second (in electron charges), n electrons moved,
//            d times the metal has been touched while charged (sparks), s 1 if the last touch gave a spark
//   pair     p and q the two charges, f −1 pull together, 0 none, +1 push apart
//   current  v volts, m 1 for a conductor, i the size of the current (0 for an insulator, else the volts), l 1 if the bulb is lit
(function (B) {
  'use strict';
  var ro = null, spec = null, st = null, raf = 0, cv = null, ctx = null;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function dark() { return document.documentElement.classList.contains('dark') || matchMedia('(prefers-color-scheme: dark)').matches; }
  function cols() { var d = dark(); return { ink: d ? '#e4eaf3' : '#1d2430', muted: d ? '#93a1b5' : '#5a6475', line: d ? 'rgba(228,234,243,0.3)' : 'rgba(29,36,48,0.25)', card: d ? '#222a35' : '#f3f1ec', pos: '#c9473d', neg: '#3f7fc4', spark: '#e6b422', good: '#2f9e6a', wire: d ? '#3a4452' : '#d8d4cb' }; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function on(v, d) { return v === undefined ? d : /^(on|yes|true)$/i.test(v); }
  function sgn(n) { return n > 0 ? '+' + n : n < 0 ? '−' + (-n) : '0'; }

  function parse(s) {
    s.mode = s.mode || 'static';
    if (['static', 'pair', 'current'].indexOf(s.mode) < 0) throw new Error('mode: use static, pair or current.');
    s.sl = on(s.sliders, true); s.preRun = s.run ? Number(s.run) : 0;
    if (s.mode === 'static') {
      var p = (s.rub || 'Wool > Balloon').split('>').map(function (t) { return t.trim(); });
      if (p.length !== 2 || !p[0] || !p[1]) throw new Error('rub: write "rub: Wool > Balloon" (gives up electrons > gains them).');
      s.names = p; s.max = s.max ? Number(s.max) : 6; if (!(s.max >= 1 && s.max <= 8)) throw new Error('max: from 1 to 8 electrons.');
      if (!(s.preRun >= 0 && s.preRun <= s.max)) throw new Error('run: from 0 to max rubs already done.');
    }
    if (s.mode === 'pair') {
      s.q1 = s.first !== undefined ? Number(s.first) : 2; s.q2 = s.second !== undefined ? Number(s.second) : -1;
      if (!(Math.abs(s.q1) <= 3 && Math.abs(s.q2) <= 3)) throw new Error('first and second: from −3 to 3.');
    }
    if (s.mode === 'current') {
      s.mat = (s.material || 'copper').toLowerCase(); if (['copper', 'plastic', 'choose'].indexOf(s.mat) < 0) throw new Error('material: copper, plastic or choose.');
      s.volts = s.volts !== undefined ? Number(s.volts) : 3; if (!(s.volts >= 0 && s.volts <= 6)) throw new Error('volts: from 0 to 6.');
    }
  }
  function makeCanvas() {
    if (B.jsxBoard) { JXG.JSXGraph.freeBoard(B.jsxBoard); B.jsxBoard = null; }
    var host = B.el('board'); host.replaceChildren(); cv = el('canvas', 'wpcv'); host.appendChild(cv); cv.style.cssText = 'display:block;width:100%;height:100%';
    ctx = cv.getContext('2d'); sizeCanvas();
    if (ro) ro.disconnect(); ro = new ResizeObserver(function () { sizeCanvas(); redraw(); }); ro.observe(host);
  }
  function sizeCanvas() {
    var host = B.el('board'), w = host.clientWidth || 600, h = host.clientHeight || 300, d = window.devicePixelRatio || 1;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d); ctx.setTransform(d, 0, 0, d, 0, 0); st.W = w; st.H = h;
  }
  function disc(x, y, r, col, sign, ink) {
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = ink || '#fff'; ctx.lineWidth = Math.max(1.5, r / 4); ctx.beginPath(); ctx.moveTo(x - r * 0.5, y); ctx.lineTo(x + r * 0.5, y); if (sign === '+') { ctx.moveTo(x, y - r * 0.5); ctx.lineTo(x, y + r * 0.5); } ctx.stroke();
  }
  function slider(panel, label, min, max, step, val, fmt, set) {
    var row = el('div', 'srow'), lab = el('label', 'fname', label), r = el('input'); r.type = 'range'; r.min = min; r.max = max; r.step = step; r.value = val; r.id = 'ch' + label.replace(/\W/g, '');
    lab.htmlFor = r.id; var minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', label + ': less');
    var plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', label + ': more'); var out = el('output', '', fmt(val));
    var put = function (v) { v = Math.max(min, Math.min(max, v)); r.value = v; out.textContent = fmt(v); B.moved = true; set(v); };
    r.addEventListener('input', function () { put(Number(r.value)); }); minus.addEventListener('click', function () { put(Number(r.value) - step); }); plus.addEventListener('click', function () { put(Number(r.value) + step); });
    row.append(lab, minus, r, plus, out); panel.appendChild(row);
  }
  function info(panel, id) { var n = el('div', 'cinfo'); n.id = id; panel.appendChild(n); return n; }

  // ---------- static ----------
  // Each object has 8 atoms (a red + with a blue − beside it) and room for extra electrons in a row under them.
  function objRect(i) { var W = st.W, H = st.H, w = Math.min(230, W * 0.34), h = Math.min(150, H * 0.5); return { x: i ? W - w - 28 : 28, y: H * 0.5 - h / 2 - 10, w: w, h: h }; }
  function atomPos(r, k) { var cx = k % 4, cy = Math.floor(k / 4); return [r.x + r.w * (0.16 + cx * 0.22), r.y + r.h * (0.24 + cy * 0.26)]; }
  function extraPos(r, k) { return [r.x + r.w * (0.12 + (k % 8) * 0.105), r.y + r.h * 0.86]; }
  function staticReset() { st.moved = 0; st.d = 0; st.s = 0; st.fly = []; st.sparkT = 0; st.msg = ''; }
  // Electrons sitting in the second material's spare places (not in flight).
  function arrivedNow() { return st.moved - st.fly.filter(function (f) { return !f.back || f.u >= 0; }).length; }
  function staticDraw() {
    var c = cols(), W = st.W, H = st.H; ctx.clearRect(0, 0, W, H); ctx.font = '700 13px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var arrived = arrivedNow(), A = objRect(0), Bx = objRect(1);
    for (var i = 0; i < 2; i++) {
      var r = objRect(i); ctx.fillStyle = c.card; ctx.strokeStyle = c.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(r.x, r.y, r.w, r.h, 12); ctx.fill(); ctx.stroke();
      ctx.fillStyle = c.ink; ctx.fillText(spec.names[i], r.x + r.w / 2, r.y - 14);
      var have = 8 - st.moved; // electrons still beside their atoms in the first material
      for (var k = 0; k < 8; k++) {
        var p = atomPos(r, k); disc(p[0], p[1], 9, c.pos, '+');
        if (i === 1 || k < have) disc(p[0] + 15, p[1] + 3, 6, c.neg, '−');
      }
      if (i) for (var e = 0; e < arrived; e++) { var q = extraPos(r, e); disc(q[0], q[1], 6, c.neg, '−'); }
      var net = i ? -arrived : arrived;
      ctx.fillStyle = net === 0 ? c.muted : net > 0 ? c.pos : c.neg; ctx.font = '700 15px system-ui, sans-serif';
      ctx.fillText(net === 0 ? 'neutral' : 'net charge ' + sgn(net), r.x + r.w / 2, r.y + r.h + 20); ctx.font = '700 13px system-ui, sans-serif';
    }
    // Electrons in flight.
    st.fly.forEach(function (f) {
      if (f.u < 0) return;
      var pa = atomPos(A, f.atom), pb = extraPos(Bx, f.k); pa = [pa[0] + 15, pa[1] + 3]; if (f.back) { var t = pa; pa = pb; pb = t; }
      var u = f.u, x = pa[0] + (pb[0] - pa[0]) * u, y = pa[1] + (pb[1] - pa[1]) * u - Math.sin(u * Math.PI) * 26; disc(x, y, 6.5, c.neg, '−');
    });
    // Forces: unlike charges pull towards each other.
    if (arrived > 0) {
      var y = A.y + A.h / 2, x0 = A.x + A.w + 12, x1 = Bx.x - 12; ctx.strokeStyle = c.ink; ctx.fillStyle = c.ink; ctx.lineWidth = 3;
      var len = Math.min((x1 - x0) / 2 - 8, 14 + arrived * 9);
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + len, y); ctx.moveTo(x1, y); ctx.lineTo(x1 - len, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0 + len + 9, y); ctx.lineTo(x0 + len, y - 6); ctx.lineTo(x0 + len, y + 6); ctx.closePath(); ctx.moveTo(x1 - len - 9, y); ctx.lineTo(x1 - len, y - 6); ctx.lineTo(x1 - len, y + 6); ctx.closePath(); ctx.fill();
      ctx.fillText('unlike charges attract', (x0 + x1) / 2, y - 22);
    }
    // Spark.
    if (st.sparkT > 0) {
      var sx = (A.x + A.w + Bx.x) / 2, sy = A.y + A.h / 2 + 40; ctx.strokeStyle = c.spark; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx - 28, sy - 16); ctx.lineTo(sx - 6, sy + 2); ctx.lineTo(sx - 14, sy + 4); ctx.lineTo(sx + 12, sy + 22); ctx.lineTo(sx + 2, sy + 20); ctx.lineTo(sx + 26, sy + 38); ctx.stroke();
      ctx.fillStyle = c.ink; ctx.fillText('spark: the extra electrons rush back', sx, sy - 26);
    }
  }
  function staticStep(dt) {
    st.fly.forEach(function (f) { f.u += dt * 2.2; });
    var done = st.fly.filter(function (f) { return f.u >= 1; });
    if (done.length) { st.fly = st.fly.filter(function (f) { return f.u < 1; }); done.forEach(function (f) { if (f.back) st.moved--; }); report(); }
    if (st.sparkT > 0) st.sparkT -= dt;
  }
  function rub() {
    if (st.fly.some(function (f) { return f.back; })) return;
    if (st.moved >= spec.max) { st.msg = 'No more electrons will move: ' + spec.names[0] + ' and ' + spec.names[1] + ' are as charged as they will get.'; report(); return; }
    st.fly.push({ k: st.moved, atom: 7 - st.moved, u: 0, back: false }); st.moved++; st.s = 0; st.msg = ''; report();
  }
  function touchMetal() {
    if (st.fly.length) return;
    var n = st.moved; if (n < 1) { st.msg = 'Nothing to discharge: both are neutral.'; report(); return; }
    for (var j = 0; j < n; j++) st.fly.push({ k: n - 1 - j, atom: 8 - st.moved + j, u: -j * 0.12, back: true });
    st.d++; st.s = 1; st.sparkT = 1.6; st.msg = ''; report();
  }
  function paintStatic(panel) {
    var bar = el('div', 'fbar'), r = el('button', 'go', 'Rub'); r.type = 'button'; r.addEventListener('click', function () { B.moved = true; rub(); });
    var t = el('button', '', 'Touch metal'); t.type = 'button'; t.addEventListener('click', function () { B.moved = true; touchMetal(); });
    var z = el('button', 'quiet', 'Start again'); z.type = 'button'; z.addEventListener('click', B.restart);
    bar.append(r, t, z); panel.appendChild(bar); info(panel, 'chinfo'); staticInfo();
  }
  function staticInfo() {
    var n = document.getElementById('chinfo'); if (!n) return; n.replaceChildren(); var a = arrivedNow();
    n.appendChild(el('b', '', a ? a + ' electron' + (a > 1 ? 's' : '') + ' moved from ' + spec.names[0] + ' to ' + spec.names[1] + '. ' + spec.names[0] + ' is ' + sgn(a) + ' and ' + spec.names[1] + ' is ' + sgn(-a) + '.' : 'Both start neutral: each atom has a + and a − that cancel.'));
    n.appendChild(el('span', '', ' Only electrons move. The + charges stay in the atoms.'));
    if (st.msg) n.appendChild(el('i', '', st.msg));
  }

  // ---------- pair ----------
  function pairDraw() {
    var c = cols(), W = st.W, H = st.H; ctx.clearRect(0, 0, W, H); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 15px system-ui, sans-serif';
    var f = Math.sign(st.q1 * st.q2) * -1 * -1; // like charges: +1 (push apart)
    f = st.q1 * st.q2 === 0 ? 0 : st.q1 * st.q2 > 0 ? 1 : -1;
    var target = f === 0 ? 0.42 : f > 0 ? 0.62 : 0.26; st.sep += (target - st.sep) * 0.08;
    var cx = W / 2, y = H * 0.45, d = st.sep * W, x1 = cx - d / 2, x2 = cx + d / 2, R = Math.min(46, H * 0.16);
    [[x1, st.q1, 'Ball 1'], [x2, st.q2, 'Ball 2']].forEach(function (b) {
      var q = b[1]; ctx.fillStyle = q > 0 ? 'rgba(201,71,61,0.22)' : q < 0 ? 'rgba(63,127,196,0.22)' : c.card; ctx.strokeStyle = q > 0 ? c.pos : q < 0 ? c.neg : c.line; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(b[0], y, R, 0, 6.2832); ctx.fill(); ctx.stroke();
      for (var k = 0; k < Math.abs(q); k++) { var a = k * 2.0944 + 0.5, rr = Math.abs(q) > 1 ? R * 0.45 : 0; disc(b[0] + Math.cos(a) * rr, y + Math.sin(a) * rr, 9, q > 0 ? c.pos : c.neg, q > 0 ? '+' : '−'); }
      if (!q) { ctx.fillStyle = c.muted; ctx.fillText('0', b[0], y); }
      ctx.fillStyle = c.ink; ctx.fillText(b[2] + ': ' + sgn(q), b[0], y + R + 22);
    });
    if (f) {
      var len = 14 + Math.abs(st.q1 * st.q2) * 8, ay = y, col = c.ink; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 3;
      var dir = f > 0 ? -1 : 1; // push apart: arrows point outwards from each ball; pull: inwards
      [[x1 + (f > 0 ? -R - 8 : R + 8), f > 0 ? -1 : 1], [x2 + (f > 0 ? R + 8 : -R - 8), f > 0 ? 1 : -1]].forEach(function (a) {
        var x0 = a[0], x1b = x0 + a[1] * len; ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1b, ay); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x1b + a[1] * 9, ay); ctx.lineTo(x1b, ay - 6); ctx.lineTo(x1b, ay + 6); ctx.closePath(); ctx.fill();
      }); void dir;
    }
    ctx.fillStyle = c.ink; ctx.fillText(f === 0 ? 'No force: a neutral ball does not push or pull.' : f > 0 ? 'Like charges repel: they push apart.' : 'Unlike charges attract: they pull together.', cx, H - 18);
  }
  function paintPair(panel) {
    if (spec.sl) {
      slider(panel, 'Ball 1', -3, 3, 1, st.q1, sgn, function (v) { st.q1 = v; report(); });
      slider(panel, 'Ball 2', -3, 3, 1, st.q2, sgn, function (v) { st.q2 = v; report(); });
    }
    info(panel, 'chinfo').appendChild(el('span', '', 'Positive (red +) and negative (blue −). The bigger the charges, the bigger the force.'));
  }

  // ---------- current ----------
  var LANE = 0.5;
  function geo() { var W = st.W, H = st.H, m = 56; return { x0: m, y0: H * 0.2, x1: W - m, y1: H * 0.78, w: Math.min(34, H * 0.11) }; }
  function perim(g) { return 2 * (g.x1 - g.x0) + 2 * (g.y1 - g.y0); }
  // Clockwise from the top left: along the top, down the right, back along the bottom, up the left.
  function at(g, s, o) {
    var Wd = g.x1 - g.x0, Hd = g.y1 - g.y0, P = 2 * (Wd + Hd); s = ((s % P) + P) % P;
    if (s < Wd) return [g.x0 + s, g.y0 + o]; s -= Wd; if (s < Hd) return [g.x1 - o, g.y0 + s]; s -= Hd; if (s < Wd) return [g.x1 - s, g.y1 - o]; s -= Wd; return [g.x0 + o, g.y1 - s];
  }
  function currentReset() {
    var rand = rng(11), g = geo(), P = perim(g), N = 46; st.el = [];
    for (var k = 0; k < N; k++) st.el.push({ s: (k + rand()) / N * P, o: (rand() - 0.5) * g.w * 0.8, ph: rand() * 6.28 });
    st.v = spec.volts;
  }
  function conductor() { return st.mat === 'copper'; }
  function currentStep(dt) {
    var g = geo(), drift = conductor() ? 16 * st.v : 0, rand = Math.random;
    st.el.forEach(function (e) { e.s += (drift + (rand() - 0.5) * 30) * dt; e.o += (rand() - 0.5) * 60 * dt; var lim = g.w * 0.42; e.o = Math.max(-lim, Math.min(lim, e.o)); e.ph += dt * 9; });
  }
  function currentDraw() {
    var c = cols(), g = geo(), W = st.W, H = st.H, P = perim(g); ctx.clearRect(0, 0, W, H); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 13px system-ui, sans-serif';
    // Wire.
    ctx.strokeStyle = c.wire; ctx.lineWidth = g.w; ctx.lineJoin = 'round'; ctx.strokeRect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0);
    // Ions.
    var step = 30, mid = (g.y0 + g.y1) / 2;
    for (var s = step / 2; s < P; s += step) for (var l = -1; l <= 1; l += 2) { var p = at(g, s, l * g.w * 0.22); if (Math.abs(p[1] - mid) < 36 && (p[0] < g.x0 + 6 || p[0] > g.x1 - 6)) continue; disc(p[0], p[1], 5.2, c.pos, '+'); }
    // Electrons: free ones wander; bound ones sit beside their ions.
    if (conductor()) st.el.forEach(function (e) { var p = at(g, e.s, e.o); if (Math.abs(p[1] - mid) < 36 && (p[0] < g.x0 + 6 || p[0] > g.x1 - 6)) return; disc(p[0], p[1], 4.4, c.neg, '−'); });
    else for (var s2 = step / 2; s2 < P; s2 += step) for (var l2 = -1; l2 <= 1; l2 += 2) { var q = at(g, s2, l2 * g.w * 0.22); if (Math.abs(q[1] - mid) < 36 && (q[0] < g.x0 + 6 || q[0] > g.x1 - 6)) continue; disc(q[0] + 8 + Math.sin(s2 + st.t * 9) * 1.2, q[1] + 3, 3.8, c.neg, '−'); }
    // Battery (left) and bulb (right).
    ctx.fillStyle = c.card; ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(g.x0 - 26, mid - 34, 52, 68, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = c.neg; ctx.fillText('−', g.x0, mid - 22); ctx.fillStyle = c.pos; ctx.fillText('+', g.x0, mid + 22); ctx.fillStyle = c.ink; ctx.fillText(st.v + ' V', g.x0, mid);
    var lit = conductor() && st.v > 0, glow = lit ? 0.25 + 0.75 * st.v / 6 : 0;
    if (lit) { var gr = ctx.createRadialGradient(g.x1, mid, 4, g.x1, mid, 62); gr.addColorStop(0, 'rgba(255,214,70,' + glow + ')'); gr.addColorStop(1, 'rgba(255,214,70,0)'); ctx.fillStyle = gr; ctx.fillRect(g.x1 - 70, mid - 70, 140, 140); }
    ctx.fillStyle = lit ? 'rgba(255,214,70,' + (0.4 + glow * 0.6) + ')' : c.card; ctx.strokeStyle = c.ink; ctx.beginPath(); ctx.arc(g.x1, mid, 22, 0, 6.2832); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(g.x1 - 10, mid + 8); ctx.lineTo(g.x1 - 5, mid - 4); ctx.lineTo(g.x1, mid + 6); ctx.lineTo(g.x1 + 5, mid - 4); ctx.lineTo(g.x1 + 10, mid + 8); ctx.stroke();
    ctx.fillStyle = c.ink; ctx.textAlign = 'right'; ctx.fillText('Bulb', g.x1 - 34, mid); ctx.textAlign = 'left'; ctx.fillText('Battery', g.x0 + 36, mid); ctx.textAlign = 'center';
    // Directions.
    ctx.fillStyle = c.muted; ctx.textAlign = 'center';
    ctx.fillText(conductor() && st.v > 0 ? 'Electrons are pushed this way →' : 'Electrons: no flow', W / 2, g.y0 - g.w / 2 - 12);
    ctx.fillText('← Conventional current is drawn the other way', W / 2, g.y1 + g.w / 2 + 16);
  }
  function paintCurrent(panel) {
    if (spec.sl) slider(panel, 'Battery', 0, 6, 1, st.v, function (v) { return v + ' V'; }, function (v) { st.v = v; currentInfo(); report(); });
    if (spec.mat === 'choose') {
      var bar = el('div', 'fbar'), sel = el('select'); sel.setAttribute('aria-label', 'Wire material');
      sel.appendChild(new Option('Copper wire', 'copper')); sel.appendChild(new Option('Plastic strip', 'plastic')); sel.value = st.mat;
      sel.addEventListener('change', function () { B.moved = true; st.mat = sel.value; currentInfo(); report(); }); bar.appendChild(sel); panel.appendChild(bar);
    }
    info(panel, 'chinfo'); currentInfo();
  }
  function currentInfo() {
    var n = document.getElementById('chinfo'); if (!n) return; n.replaceChildren();
    if (conductor()) { n.appendChild(el('b', '', 'Copper is a conductor: each atom lets go of an electron, so there are free electrons to move.')); n.appendChild(el('span', '', st.v ? ' The battery pushes them round the loop (' + st.v + ' V): the more volts, the faster they drift and the brighter the bulb.' : ' The battery is at 0 V: nothing pushes them, so they only jiggle about.')); }
    else { n.appendChild(el('b', '', 'Plastic is an insulator: its electrons stay tied to their atoms, so there are none free to move.')); n.appendChild(el('span', '', ' Even at ' + st.v + ' V the bulb stays dark.')); }
  }

  // ---------- shared ----------
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (spec.mode === 'static') paintStatic(panel); else if (spec.mode === 'pair') paintPair(panel); else paintCurrent(panel);
  }
  function redraw() { if (spec.mode === 'static') staticDraw(); else if (spec.mode === 'pair') pairDraw(); else currentDraw(); }
  function report() {
    var vars, msg, ok = false;
    if (spec.mode === 'static') {
      var a = arrivedNow(); vars = { a: a, b: -a, n: st.moved, d: st.d, s: st.s }; ok = a > 0; staticInfo();
      msg = st.msg || (a ? spec.names[0] + ' ' + sgn(a) + ', ' + spec.names[1] + ' ' + sgn(-a) + '.' : 'Both neutral.');
    } else if (spec.mode === 'pair') {
      var f = st.q1 * st.q2 === 0 ? 0 : st.q1 * st.q2 > 0 ? 1 : -1; vars = { p: st.q1, q: st.q2, f: f }; ok = f !== 0;
      msg = f === 0 ? 'No force.' : f > 0 ? 'Like charges push apart.' : 'Unlike charges pull together.';
    } else {
      var m = conductor() ? 1 : 0; vars = { v: st.v, m: m, i: m ? st.v : 0, l: m && st.v > 0 ? 1 : 0 }; ok = vars.l === 1;
      msg = m ? (st.v ? 'Free electrons drift round the loop and the bulb lights.' : 'No push, no current.') : 'No free electrons, so no current.';
    }
    B.say(msg, ok);
    if (spec.mode === 'pair') B.save({ st: { q1: st.q1, q2: st.q2 } });
    if (spec.mode === 'current') B.save({ st: { v: st.v, mat: st.mat } });
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  function loop(tPrev) {
    raf = requestAnimationFrame(function (t) {
      var dt = Math.min(0.05, (t - (tPrev || t)) / 1000); st.t += dt;
      if (spec.mode === 'static') staticStep(dt); else if (spec.mode === 'current') currentStep(dt);
      redraw(); loop(t);
    });
  }

  B.widget('charge', {
    sections: ['board', 'gpanel'],
    label: function (s) { return { static: 'Two materials with their atoms and electrons, rubbed together', pair: 'Two charged balls pushing or pulling each other', current: 'A battery, a wire loop and a bulb, with electrons in the wire' }[s.mode]; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec; cancelAnimationFrame(raf); var sv = fresh ? null : B.saved(); sv = sv && sv.st ? sv.st : {};
      st = { t: 0, W: 600, H: 300 }; makeCanvas();
      if (spec.mode === 'static') { staticReset(); for (var i = 0; i < spec.preRun; i++) { st.moved++; } }
      if (spec.mode === 'pair') { st.q1 = sv.q1 !== undefined ? sv.q1 : spec.q1; st.q2 = sv.q2 !== undefined ? sv.q2 : spec.q2; st.sep = 0.42; }
      if (spec.mode === 'current') { st.mat = spec.mat === 'choose' ? (sv.mat || 'copper') : spec.mat; currentReset(); if (sv.v !== undefined) st.v = sv.v; for (var j = 0; j < spec.preRun * 60; j++) currentStep(1 / 60); }
      if (spec.mode === 'pair') for (var k = 0; k < 120; k++) pairDraw();
      redraw(); loop(); paint(); report();
    },
    redraw: redraw,
    resize: function () { sizeCanvas(); if (spec.mode === 'current') { var g = geo(), P = perim(g); st.el.forEach(function (e) { e.s = e.s % P; }); } redraw(); },
  });
})(WPB);
