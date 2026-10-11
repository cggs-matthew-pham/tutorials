// Waves (AC9S9U04 n2 and n4): sound as a longitudinal wave, light bending at a boundary, the electromagnetic spectrum.
//   widget: wave
//   mode: sound | refract | spectrum
//   sound     A speaker, a tube of particles and a listener, with a pressure graph underneath. Particles only vibrate
//             in place; compressions and rarefactions travel. The animation is slowed down and not to scale.
//               medium: air | water | steel | vacuum | choose   (default air; choose adds a menu)
//               freq: 2           (1 to 5: low to high pitch)       amp: 3   (1 to 5: quiet to loud)
//               sliders: on | off (default on)   mark: on | off (one orange particle, default on)
//               labels: on | off  (compression, rarefaction, wavelength on the graph; default on)
//               hear: on          (adds a Hear it button: a tone whose pitch and loudness follow the sliders)
//               run: 2            (seconds already run at the start, for a picture)   play: off (start paused)
//   refract   Wavefronts crossing from air into a second material, with the rays. The fronts are closer together
//             and slower in the material, so the direction bends. With surface: mirror there is no second
//             material and the wave reflects.
//               medium: glass | water | diamond | choose      angle: 40 (0 to 80)
//               surface: boundary | mirror     rays: on | off     sliders: on | off     play: off     run: 2
//   spectrum  The seven bands of the electromagnetic spectrum, one at a time: wavelength, frequency, uses, care.
//               band: visible (radio, microwave, infrared, visible, ultraviolet, xray, gamma)
// state: { scope: { vars } }
//   sound     f pitch setting, a amplitude setting, m medium (0 vacuum, 1 air, 2 water, 3 steel), v real speed (m/s),
//             l wavelength (tube lengths, 1 dp), h 1 once the sound has reached the listener
//   refract   i angle of incidence, r angle of refraction (or reflection), n index of the material, e 1 for a mirror
//   spectrum  b band (0 radio to 6 gamma), n bands looked at, f log10 of frequency (Hz), l log10 of wavelength (m)
(function (B) {
  'use strict';
  var ro = null, spec = null, st = null, bd = null, raf = 0, cv = null, ctx = null, audio = null;
  var DT = 1 / 60;
  var MED = {
    vacuum: { name: 'Vacuum', id: 0, v: 0, real: 0, cols: 0, jit: 0 },
    air: { name: 'Air', id: 1, v: 1.2, real: 340, cols: 22, jit: 0.6 },
    water: { name: 'Water', id: 2, v: 2.4, real: 1500, cols: 36, jit: 0.25 },
    steel: { name: 'Steel', id: 3, v: 4.2, real: 5000, cols: 48, jit: 0 },
  };
  var INDEX = { glass: 1.5, water: 1.33, diamond: 2.4 };
  var BANDS = [
    { id: 'radio', name: 'Radio', col: '#6d7c8c', w: '3 m', f: '100 MHz', lw: 0.48, lf: 8, cyc: 1.5, use: 'Radio and TV broadcasts', care: 'Passes through us harmlessly. Very low energy.' },
    { id: 'microwave', name: 'Microwave', col: '#a9873f', w: '12 cm', f: '2.5 GHz', lw: -0.92, lf: 9.4, cyc: 2.5, use: 'Microwave ovens, Wi-Fi, mobile phones, radar', care: 'Heats water in food. Ovens have a metal screen to keep it in.' },
    { id: 'infrared', name: 'Infrared', col: '#c9473d', w: '10 µm', f: '30 THz', lw: -5, lf: 13.5, cyc: 4, use: 'Remote controls, thermal cameras, feeling heat from a fire', care: 'Warms what absorbs it. Strong sources can burn.' },
    { id: 'visible', name: 'Visible light', col: '#2f9e6a', w: '500 nm', f: '600 THz', lw: -6.3, lf: 14.8, cyc: 6, use: 'Seeing; fibre optic cables carry it too', care: 'Only a narrow band of the spectrum. Very bright sources harm eyes.' },
    { id: 'ultraviolet', name: 'Ultraviolet', col: '#7b4fc4', w: '100 nm', f: '3000 THz', lw: -7, lf: 15.5, cyc: 8.5, use: 'Sterilising water, security marks, making vitamin D in skin', care: 'Damages skin cells and eyes: sunburn and skin cancer.' },
    { id: 'xray', name: 'X-ray', col: '#3f7fc4', w: '1 nm', f: '300 000 THz', lw: -9, lf: 17.5, cyc: 11, use: 'Seeing bones and checking luggage', care: 'High energy: can damage cells. Exposure is kept as low as possible.' },
    { id: 'gamma', name: 'Gamma', col: '#1d2430', w: '1 pm', f: '300 000 000 THz', lw: -12, lf: 20.5, cyc: 14, use: 'Treating cancer, sterilising equipment', care: 'Highest energy: passes through the body and damages cells.' },
  ];
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function dark() { return document.documentElement.classList.contains('dark') || matchMedia('(prefers-color-scheme: dark)').matches; }
  function cols() { var d = dark(); return { ink: d ? '#e4eaf3' : '#1d2430', muted: d ? '#93a1b5' : '#5a6475', line: d ? 'rgba(228,234,243,0.3)' : 'rgba(29,36,48,0.25)', part: '#3f7fc4', mark: '#d8862b', wave: '#c2570a', front: d ? '#7fb0e8' : '#3f7fc4', ray: '#d8862b', refl: d ? '#93a1b5' : '#7a8794', glass: d ? 'rgba(127,176,232,0.22)' : 'rgba(63,127,196,0.16)', good: '#2f9e6a', bg: d ? '#1b212a' : '#ffffff' }; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function on(v, d) { return v === undefined ? d : /^(on|yes|true)$/i.test(v); }

  // ---------- parse ----------
  function parse(s) {
    s.mode = s.mode || 'sound';
    if (['sound', 'refract', 'spectrum'].indexOf(s.mode) < 0) throw new Error('mode: use sound, refract or spectrum.');
    s.sl = on(s.sliders, true); s.playOn = on(s.play, true); s.preRun = s.run ? Number(s.run) : 0;
    if (!(s.preRun >= 0 && s.preRun <= 20)) throw new Error('run: seconds already run at the start (0 to 20), for a picture.');
    if (s.mode === 'sound') {
      s.med = (s.medium || 'air').toLowerCase(); if (['air', 'water', 'steel', 'vacuum', 'choose'].indexOf(s.med) < 0) throw new Error('medium: air, water, steel, vacuum or choose.');
      s.f = s.freq ? Number(s.freq) : 2; if (!(s.f >= 1 && s.f <= 5)) throw new Error('freq: a number from 1 to 5.');
      s.a = s.amp ? Number(s.amp) : 3; if (!(s.a >= 1 && s.a <= 5)) throw new Error('amp: a number from 1 to 5.');
      s.mk = on(s.mark, true); s.lb = on(s.labels, true); s.hearOn = on(s.hear, false);
    }
    if (s.mode === 'refract') {
      s.med = (s.medium || 'glass').toLowerCase(); if (['glass', 'water', 'diamond', 'choose'].indexOf(s.med) < 0) throw new Error('medium: glass, water, diamond or choose.');
      s.ang = s.angle !== undefined ? Number(s.angle) : 40; if (!(s.ang >= 0 && s.ang <= 80)) throw new Error('angle: from 0 to 80 degrees.');
      s.surf = (s.surface || 'boundary').toLowerCase(); if (['boundary', 'mirror'].indexOf(s.surf) < 0) throw new Error('surface: boundary or mirror.');
      s.rays = on(s.rays, true);
    }
    if (s.mode === 'spectrum') {
      s.band = (s.band || 'visible').toLowerCase(); if (!BANDS.some(function (b) { return b.id === s.band; })) throw new Error('band: ' + BANDS.map(function (b) { return b.id; }).join(', ') + '.');
    }
  }

  // ---------- canvas ----------
  function makeCanvas() {
    if (B.jsxBoard) { JXG.JSXGraph.freeBoard(B.jsxBoard); B.jsxBoard = null; }
    var host = B.el('board'); host.replaceChildren(); cv = el('canvas', 'wpcv'); host.appendChild(cv); cv.style.cssText = 'display:block;width:100%;height:100%';
    ctx = cv.getContext('2d'); sizeCanvas();
    if (ro) ro.disconnect(); ro = new ResizeObserver(function () { sizeCanvas(); if (spec.mode === 'sound') drawSound(); }); ro.observe(host);
  }
  function sizeCanvas() {
    var host = B.el('board'), w = host.clientWidth || 600, h = host.clientHeight || 300, d = window.devicePixelRatio || 1;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d); ctx.setTransform(d, 0, 0, d, 0, 0); st.W = w; st.H = h;
  }

  // ---------- sound ----------
  function medium() { return MED[st.med]; }
  function soundReset() {
    var M = medium(), R = 7, rand = rng(7 + M.id * 13); st.parts = [];
    for (var c = 0; c < M.cols; c++) for (var r = 0; r < R; r++) {
      st.parts.push({ x: (c + 0.5 + M.jit * (rand() - 0.5)) / M.cols, y: (r + 0.5 + (M.jit ? 0.5 * M.jit * (rand() - 0.5) : 0)) / R, r: r, c: c });
    }
    st.mk = null;
    if (spec.mk && st.parts.length) { var best = 1e9; st.parts.forEach(function (p) { var d = Math.abs(p.x - 0.35) + Math.abs(p.y - 0.5); if (d < best) { best = d; st.mk = p; } }); }
    st.th = []; st.am = []; st.t = 0; st.phase = 0; st.heard = 0;
  }
  function soundStep() {
    var fd = 1.5 * st.f; st.phase += 2 * Math.PI * fd * DT; st.th.push(st.phase); st.am.push(st.a); st.t += DT;
    if (st.th.length > 300) { st.th.shift(); st.am.shift(); }
    var M = medium(); if (M.v && st.t >= 1 / M.v) st.heard = 1;
  }
  // The source's phase and amplitude as they were x (tube lengths) ago, at the wave speed.
  function back(x) {
    var M = medium(); if (!M.v) return null;
    var k = st.th.length - 1 - (x / M.v) / DT; if (k < 0 || x / M.v > st.t) return null;
    var k0 = Math.floor(k), f = k - k0, k1 = Math.min(st.th.length - 1, k0 + 1);
    return { th: st.th[k0] * (1 - f) + st.th[k1] * f, a: st.am[k0] * (1 - f) + st.am[k1] * f };
  }
  function lambda() { var M = medium(); return M.v ? M.v / (1.5 * st.f) : 0; }
  function drawSound() {
    var c = cols(), W = st.W, H = st.H, M = medium(); ctx.clearRect(0, 0, W, H);
    var tx0 = 84, tx1 = W - 76, TL = tx1 - tx0, ty0 = 14, ty1 = Math.round(H * (spec.lb ? 0.56 : 0.9)), TH = ty1 - ty0;
    ctx.font = '600 12px system-ui, sans-serif'; ctx.textBaseline = 'middle';
    // Tube.
    ctx.strokeStyle = c.line; ctx.lineWidth = 2; ctx.strokeRect(tx0, ty0, TL, TH);
    // Speaker: the cone moves with the source.
    var s0 = Math.sin(st.phase) * st.a / 5 * 7;
    ctx.fillStyle = c.muted; ctx.fillRect(14, ty0 + TH * 0.2, 14, TH * 0.6);
    ctx.beginPath(); ctx.moveTo(28, ty0 + TH * 0.38); ctx.lineTo(44 + s0, ty0 + TH * 0.1); ctx.lineTo(44 + s0, ty0 + TH * 0.9); ctx.lineTo(28, ty0 + TH * 0.62); ctx.closePath(); ctx.fill();
    ctx.fillStyle = c.ink; ctx.textAlign = 'center'; ctx.fillText('Speaker', 34, ty1 + 14);
    // Listener.
    var ex = tx1 + 38, ey = ty0 + TH / 2;
    ctx.strokeStyle = c.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(ex, ey, 16, -2.3, 1.2); ctx.stroke(); ctx.beginPath(); ctx.arc(ex + 2, ey + 1, 7, -2.2, 1); ctx.stroke();
    ctx.fillStyle = c.ink; ctx.fillText('Listener', ex, ty1 + 14);
    if (st.heard) { ctx.strokeStyle = c.good; ctx.lineWidth = 2; for (var q = 1; q <= 2; q++) { ctx.beginPath(); ctx.arc(ex - 18, ey, 6 + q * 6, Math.PI * 0.8, Math.PI * 1.2); ctx.stroke(); } }
    else if (M.id === 0) { ctx.fillStyle = c.muted; ctx.fillText('hears nothing', ex, ey + 30); }
    // Particles.
    if (M.id === 0) { ctx.fillStyle = c.muted; ctx.textAlign = 'center'; ctx.fillText('Vacuum: no particles to pass the vibration on', tx0 + TL / 2, ty0 + TH / 2); }
    var dmax = 0.14 * lambda();
    var rad = M.id === 3 ? 3 : M.id === 2 ? 3.2 : 3.6;
    var disp = function (p) { var b = back(p.x); return b ? dmax * b.a / 5 * Math.sin(b.th) : 0; };
    st.parts.forEach(function (p) {
      var x = tx0 + (p.x + disp(p)) * TL, y = ty0 + p.y * TH;
      ctx.fillStyle = p === st.mk ? c.mark : c.part; ctx.beginPath(); ctx.arc(x, y, p === st.mk ? rad + 1.6 : rad, 0, 6.2832); ctx.fill();
    });
    if (st.mk) {
      var mx = tx0 + st.mk.x * TL, my = ty0 + st.mk.y * TH;
      ctx.strokeStyle = c.mark; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(mx, ty0); ctx.lineTo(mx, ty1); ctx.stroke(); ctx.setLineDash([]);
      var tt = 'this particle only moves to and fro', ly = ty1 - 12, tw = ctx.measureText(tt).width + 12; ctx.fillStyle = c.bg; ctx.fillRect(mx - tw / 2, ly - 10, tw, 20); ctx.fillStyle = c.mark; ctx.textAlign = 'center'; ctx.fillText(tt, mx, ly);
    }
    // Pressure graph.
    if (spec.lb) {
      var gy0 = Math.round(H * 0.64), gy1 = H - 16, gm = (gy0 + gy1) / 2, ga = (gy1 - gy0) / 2 - 4;
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(tx0, gm); ctx.lineTo(tx1, gm); ctx.stroke();
      ctx.fillStyle = c.muted; ctx.textAlign = 'right'; ctx.fillText('Pressure', tx0 - 8, gm - 9); ctx.fillText('↑ squashed', tx0 - 8, gm + 7);
      var pts = []; for (var i = 0; i <= 160; i++) { var xf = i / 160, b = back(xf); pts.push([xf, b ? b.a / 5 * Math.cos(b.th) : 0]); }
      ctx.strokeStyle = c.wave; ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(function (p, i) { var X = tx0 + p[0] * TL, Y = gm - p[1] * ga; if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); }); ctx.stroke();
      // Compression, rarefaction and one wavelength, near the middle of the tube.
      var maxs = [], mins = []; for (var j = 1; j < pts.length - 1; j++) { if (pts[j][1] > 0.05 && pts[j][1] >= pts[j - 1][1] && pts[j][1] > pts[j + 1][1]) maxs.push(j); if (pts[j][1] < -0.05 && pts[j][1] <= pts[j - 1][1] && pts[j][1] < pts[j + 1][1]) mins.push(j); }
      ctx.textAlign = 'center';
      if (maxs.length) { var m1 = maxs[Math.floor(maxs.length / 2)]; ctx.fillStyle = c.wave; ctx.fillText('compression', tx0 + pts[m1][0] * TL, gm - pts[m1][1] * ga - 9); }
      if (mins.length) { var m2 = mins[Math.floor((mins.length - 1) / 2)]; ctx.fillStyle = c.wave; ctx.fillText('rarefaction', tx0 + pts[m2][0] * TL, gm - pts[m2][1] * ga + 11); }
      if (maxs.length > 1) {
        var a = maxs[maxs.length - 2], b2 = maxs[maxs.length - 1], xa = tx0 + pts[a][0] * TL, xb = tx0 + pts[b2][0] * TL, yy = gy1 + 8;
        ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(xa, yy); ctx.lineTo(xb, yy); ctx.moveTo(xa, yy - 4); ctx.lineTo(xa, yy + 4); ctx.moveTo(xb, yy - 4); ctx.lineTo(xb, yy + 4); ctx.stroke();
        ctx.fillStyle = c.ink; ctx.fillText('one wavelength', (xa + xb) / 2, yy - 8);
      }
    }
  }
  var PITCH = ['very low', 'low', 'middle', 'high', 'very high'], LOUD = ['very quiet', 'quiet', 'medium', 'loud', 'very loud'];
  function soundInfo() {
    var n = document.getElementById('wvinfo'); if (!n) return; var M = medium(); n.replaceChildren();
    n.appendChild(el('b', '', M.id ? M.name + ': sound travels at about ' + M.real + ' m/s here. ' : 'Vacuum: there are no particles, so the sound has nothing to travel through. '));
    n.appendChild(el('span', '', 'Pitch: ' + PITCH[st.f - 1] + ' (frequency ' + st.f + '). Loudness: ' + LOUD[st.a - 1] + ' (amplitude ' + st.a + ').' + (M.id ? ' Wavelength: ' + r1(lambda()) + ' tube lengths.' : '')));
    n.appendChild(el('i', '', 'The animation is slowed down and the speeds are not to scale.'));
  }
  function tone() {
    try {
      if (!audio) { var AC = window.AudioContext || window.webkitAudioContext; var ac = new AC(); var osc = ac.createOscillator(), g = ac.createGain(); osc.connect(g); g.connect(ac.destination); osc.start(); audio = { ac: ac, osc: osc, g: g }; }
      var live = audio.live && medium().id !== 0;
      audio.osc.frequency.value = 130 * Math.pow(1.5, st.f - 1); audio.g.gain.value = live ? 0.02 * st.a * st.a / 4 : 0;
    } catch (e) { /* no audio */ }
  }
  function slider(panel, label, min, max, step, val, fmt, set) {
    var row = el('div', 'srow'), lab = el('label', 'fname', label), r = el('input'); r.type = 'range'; r.min = min; r.max = max; r.step = step; r.value = val; r.id = 'wv' + label.replace(/\W/g, '');
    lab.htmlFor = r.id; var minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', label + ': less');
    var plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', label + ': more'); var out = el('output', '', fmt(val));
    var put = function (v) { v = Math.max(min, Math.min(max, v)); r.value = v; out.textContent = fmt(v); B.moved = true; set(v); };
    r.addEventListener('input', function () { put(Number(r.value)); }); minus.addEventListener('click', function () { put(Number(r.value) - step); }); plus.addEventListener('click', function () { put(Number(r.value) + step); });
    row.append(lab, minus, r, plus, out); panel.appendChild(row); return row;
  }
  function paintSound(panel) {
    if (spec.sl) {
      slider(panel, 'Pitch', 1, 5, 1, st.f, function (v) { return PITCH[v - 1]; }, function (v) { st.f = v; soundInfo(); tone(); report(); });
      slider(panel, 'Loudness', 1, 5, 1, st.a, function (v) { return LOUD[v - 1]; }, function (v) { st.a = v; soundInfo(); tone(); report(); });
    }
    var bar = el('div', 'fbar');
    if (spec.med === 'choose') {
      var sel = el('select'); sel.setAttribute('aria-label', 'Medium');
      ['air', 'water', 'steel', 'vacuum'].forEach(function (k) { sel.appendChild(new Option(MED[k].name, k)); }); sel.value = st.med;
      sel.addEventListener('change', function () { B.moved = true; st.med = sel.value; soundReset(); soundInfo(); tone(); report(); }); bar.appendChild(sel);
    }
    var pl = el('button', 'go', st.play ? 'Pause' : 'Play'); pl.type = 'button';
    pl.addEventListener('click', function () { B.moved = true; st.play = !st.play; pl.textContent = st.play ? 'Pause' : 'Play'; });
    bar.appendChild(pl);
    if (spec.hearOn) {
      var hb = el('button', '', 'Hear it: off'); hb.type = 'button'; hb.setAttribute('aria-pressed', 'false');
      hb.addEventListener('click', function () { B.moved = true; tone(); audio.live = !audio.live; hb.textContent = 'Hear it: ' + (audio.live ? 'on' : 'off'); hb.setAttribute('aria-pressed', String(audio.live)); tone(); });
      bar.appendChild(hb);
    }
    panel.appendChild(bar);
    var info = el('div', 'cinfo'); info.id = 'wvinfo'; panel.appendChild(info); soundInfo();
  }

  // ---------- refract ----------
  function nIdx() { return st.surf === 'mirror' ? 1 : INDEX[st.med]; }
  function rad(d) { return d * Math.PI / 180; }
  function rAng() { if (st.surf === 'mirror') return st.ang; return Math.round(Math.asin(Math.sin(rad(st.ang)) / nIdx()) * 1800 / Math.PI) / 10; }
  // The part of the line {p : d.p = s} inside the box, as [x1, y1, x2, y2], else null.
  function clip(dx, dy, s, X0, X1, Y0, Y1) {
    var ex = -dy, ey = dx, lo = -1e9, hi = 1e9, px = s * dx, py = s * dy, t;
    if (Math.abs(ex) < 1e-9) { if (px < X0 || px > X1) return null; } else { var a = (X0 - px) / ex, b = (X1 - px) / ex; lo = Math.max(lo, Math.min(a, b)); hi = Math.min(hi, Math.max(a, b)); }
    if (Math.abs(ey) < 1e-9) { if (py < Y0 || py > Y1) return null; } else { var a2 = (Y0 - py) / ey, b2 = (Y1 - py) / ey; lo = Math.max(lo, Math.min(a2, b2)); hi = Math.min(hi, Math.max(a2, b2)); }
    if (hi <= lo) return null; t = 0; return [px + lo * ex, py + lo * ey, px + hi * ex, py + hi * ey];
  }
  var LAM = 1.3, SPD = 1.0, XB = 8, YB = 5;
  function fronts(dx, dy, scale, y0, y1, extra) {
    // All fronts d.p = (k LAM + c t) / scale inside the region; those at the same fraction keep their number across the boundary.
    var corners = [[-XB, y0], [XB, y0], [-XB, y1], [XB, y1]].map(function (p) { return dx * p[0] + dy * p[1]; });
    var lo = Math.min.apply(null, corners) * scale, hi = Math.max.apply(null, corners) * scale, ph = (SPD * st.t) % LAM, out = [];
    for (var k = Math.floor((lo - ph) / LAM) - 1; k <= Math.ceil((hi - ph) / LAM) + 1; k++) {
      var S = k * LAM + ph, seg = clip(dx, dy, S / scale, -XB, XB, y0, y1); if (seg) { out.push(seg); }
    }
    return out;
  }
  function dataFor(dx, dy, scale, y0, y1) {
    var xs = [], ys = []; fronts(dx, dy, scale, y0, y1).forEach(function (s) { xs.push(s[0], s[2], NaN); ys.push(s[1], s[3], NaN); }); return [xs, ys];
  }
  function buildRefract() {
    var c = cols(), mirror = st.surf === 'mirror';
    bd = B.jsx({ boundingbox: [-XB - 0.5, YB + 0.7, XB + 0.5, -YB - 0.7], keepAspectRatio: true });
    var I = function () { return rad(st.ang); }, Rr = function () { return rad(rAng()); };
    // The second material, the normal, the wave fronts and the rays.
    if (!mirror) bd.create('polygon', [[-XB, 0], [XB, 0], [XB, -YB], [-XB, -YB]], { fillColor: c.glass, fillOpacity: 1, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
    else bd.create('polygon', [[-XB, 0], [XB, 0], [XB, -0.6], [-XB, -0.6]], { fillColor: c.muted, fillOpacity: 0.9, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
    bd.create('segment', [[-XB, 0], [XB, 0]], { strokeColor: c.ink, strokeWidth: 2, fixed: true, highlight: false });
    bd.create('segment', [[0, -YB], [0, YB]], { strokeColor: c.muted, strokeWidth: 1.2, dash: 2, fixed: true, highlight: false });
    bd.create('text', [0.35, YB - 0.3, 'normal'], { fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    var mk = function (fn, col, w) {
      var cvv = bd.create('curve', [[0], [0]], { strokeColor: col, strokeWidth: w, fixed: true, highlight: false });
      cvv.updateDataArray = function () { var d = fn(); this.dataX = d[0]; this.dataY = d[1]; };
      return cvv;
    };
    mk(function () { return dataFor(Math.sin(I()), -Math.cos(I()), 1, 0, YB); }, c.front, 1.8);
    if (mirror) mk(function () { return dataFor(Math.sin(I()), Math.cos(I()), 1, 0, YB); }, '#c9473d', 1.8);
    else mk(function () { return dataFor(Math.sin(Rr()), -Math.cos(Rr()), nIdx(), -YB, 0); }, c.front, 1.8);
    if (st.rays) {
      var L = 4.6, ray = function (x0, y0, x1, y1, col, dash) { return bd.create('segment', [[x0, y0], [x1, y1]], { strokeColor: col, strokeWidth: 3.5, dash: dash || 0, fixed: true, highlight: false, lastArrow: { type: 2, size: 5 } }); };
      var p = function (f) { return [function () { return f()[0]; }, function () { return f()[1]; }]; };
      var pt = function (f) { return bd.create('point', p(f), { visible: false, fixed: true, name: '' }); };
      var A0 = pt(function () { return [-L * Math.sin(I()), L * Math.cos(I())]; }), O = pt(function () { return [0, 0]; });
      bd.create('segment', [A0, O], { strokeColor: c.ray, strokeWidth: 3.5, fixed: true, highlight: false, lastArrow: { type: 2, size: 5 } });
      if (mirror) bd.create('segment', [O, pt(function () { return [L * Math.sin(I()), L * Math.cos(I())]; })], { strokeColor: c.ray, strokeWidth: 3.5, fixed: true, highlight: false, lastArrow: { type: 2, size: 5 } });
      else {
        bd.create('segment', [O, pt(function () { return [L * Math.sin(Rr()), -L * Math.cos(Rr())]; })], { strokeColor: c.ray, strokeWidth: 3.5, fixed: true, highlight: false, lastArrow: { type: 2, size: 5 } });
        bd.create('segment', [O, pt(function () { return [L * 0.7 * Math.sin(I()), L * 0.7 * Math.cos(I())]; })], { strokeColor: c.refl, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
      }
      void ray;
    }
    var lbl = function (x, y, t) { return bd.create('text', [x, y, t], { fontSize: 14, strokeColor: c.ink, anchorX: 'middle', anchorY: 'middle', fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' }); };
    lbl(function () { return -2.6 * Math.sin(I() / 2) - 0.2; }, function () { return 2.6 * Math.cos(I() / 2); }, function () { return st.ang > 4 ? 'i = ' + st.ang + '°' : ''; });
    if (mirror) lbl(function () { return 2.6 * Math.sin(I() / 2) + 0.2; }, function () { return 2.6 * Math.cos(I() / 2); }, function () { return st.ang > 4 ? 'r = ' + st.ang + '°' : ''; });
    else lbl(function () { return 2.6 * Math.sin(Rr() / 2) + 0.2; }, function () { return -2.6 * Math.cos(Rr() / 2); }, function () { return st.ang > 4 ? 'r = ' + rAng() + '°' : ''; });
    bd.create('text', [-XB + 0.2, YB - 0.4, 'Air'], { fontSize: 14, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    bd.create('text', [-XB + 0.2, -YB + 0.6, function () { return mirror ? 'Mirror' : st.med.charAt(0).toUpperCase() + st.med.slice(1) + ' (waves are slower here)'; }], { fontSize: 14, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    bd.update();
  }
  function refractInfo() {
    var n = document.getElementById('wvinfo'); if (!n) return; n.replaceChildren();
    if (st.surf === 'mirror') n.appendChild(el('b', '', 'Angle of incidence ' + st.ang + '°, angle of reflection ' + st.ang + '°. The wave fronts bounce off at the same angle they arrived.'));
    else n.appendChild(el('b', '', 'Angle of incidence ' + st.ang + '°, angle of refraction ' + rAng() + '°. In ' + st.med + ' the waves travel ' + r1(nIdx()) + ' times slower, so the fronts are ' + r1(nIdx()) + ' times closer and the direction bends towards the normal.'));
    n.appendChild(el('i', '', 'The angles are measured from the normal, the dashed line at right angles to the surface.'));
  }
  function paintRefract(panel) {
    if (spec.sl) slider(panel, 'Angle', 0, 80, 5, st.ang, function (v) { return v + '°'; }, function (v) { st.ang = v; bd.update(); refractInfo(); report(); });
    var bar = el('div', 'fbar');
    if (spec.med === 'choose' && st.surf !== 'mirror') {
      var sel = el('select'); sel.setAttribute('aria-label', 'Material');
      ['glass', 'water', 'diamond'].forEach(function (k) { sel.appendChild(new Option(k.charAt(0).toUpperCase() + k.slice(1), k)); }); sel.value = st.med;
      sel.addEventListener('change', function () { B.moved = true; st.med = sel.value; bd.update(); refractInfo(); report(); }); bar.appendChild(sel);
    }
    var pl = el('button', 'go', st.play ? 'Pause' : 'Play'); pl.type = 'button';
    pl.addEventListener('click', function () { B.moved = true; st.play = !st.play; pl.textContent = st.play ? 'Pause' : 'Play'; });
    bar.appendChild(pl); panel.appendChild(bar);
    var info = el('div', 'cinfo'); info.id = 'wvinfo'; panel.appendChild(info); refractInfo();
  }

  // ---------- spectrum ----------
  function buildSpectrum() {
    var c = cols(); bd = B.jsx({ boundingbox: [-0.5, 7.6, 14.5, -4.6], keepAspectRatio: false });
    var seg = 14 / 7;
    BANDS.forEach(function (b, i) {
      var x0 = i * seg, sel = function () { return st.band === i; };
      if (b.id === 'visible') {
        ['#8b2fc9', '#3f5fd0', '#2f9ed0', '#2f9e6a', '#e6c229', '#e07b2a', '#d4372a'].forEach(function (col, k) {
          bd.create('polygon', [[x0 + k * seg / 7, 6], [x0 + (k + 1) * seg / 7, 6], [x0 + (k + 1) * seg / 7, 4.2], [x0 + k * seg / 7, 4.2]], { fillColor: col, fillOpacity: 1, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
        });
      } else bd.create('polygon', [[x0, 6], [x0 + seg, 6], [x0 + seg, 4.2], [x0, 4.2]], { fillColor: b.col, fillOpacity: 0.92, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
      var hit = bd.create('polygon', [[x0, 6], [x0 + seg, 6], [x0 + seg, 4.2], [x0, 4.2]], { fillColor: 'transparent', fillOpacity: 0, borders: { strokeColor: c.ink, strokeWidth: function () { return sel() ? 4 : 0; } }, vertices: { visible: false }, fixed: true, highlight: false });
      hit.on('down', function () { choose(i); });
      bd.create('text', [x0 + seg / 2, 6.55, b.name], { anchorX: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    });
    bd.create('text', [0, 3.5, '← longer wavelength · lower frequency · less energy'], { fontSize: 12, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    bd.create('text', [14, 3.5, 'shorter wavelength · higher frequency · more energy →'], { anchorX: 'right', fontSize: 12, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    var wv = bd.create('curve', [[0], [0]], { strokeColor: function () { return BANDS[st.band].col === '#1d2430' && dark() ? '#e4eaf3' : BANDS[st.band].col; }, strokeWidth: 4, fixed: true, highlight: false });
    wv.updateDataArray = function () {
      var cyc = BANDS[st.band].cyc, xs = [], ys = []; for (var k = 0; k <= 400; k++) { var x = k / 400 * 14; xs.push(x); ys.push(1.3 * Math.sin(2 * Math.PI * (cyc * x / 14 - st.t * 0.5)) - 0.6); }
      this.dataX = xs; this.dataY = ys;
    };
    bd.create('text', [7, -3.3, function () { return BANDS[st.band].name + ' waves (not to scale: real wavelengths range over a million million times)'; }], { anchorX: 'middle', fontSize: 12, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    bd.update();
  }
  function choose(i) { B.moved = true; st.band = i; st.seen[i] = 1; bd.update(); paintInfoSpectrum(); report(); var bs = document.querySelectorAll('.wvband'); bs.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); }); }
  function paintInfoSpectrum() {
    var n = document.getElementById('wvinfo'); if (!n) return; var b = BANDS[st.band]; n.replaceChildren();
    n.appendChild(el('b', '', b.name + ': wavelength about ' + b.w + ', frequency about ' + b.f + '.'));
    n.appendChild(el('span', '', ' Used for: ' + b.use + '.'));
    n.appendChild(el('span', '', ' Take care: ' + b.care));
    n.appendChild(el('i', '', 'Every band travels at the same speed in a vacuum: 300 000 km/s. Typical values, rounded.'));
  }
  function paintSpectrum(panel) {
    var bar = el('div', 'fbar');
    BANDS.forEach(function (b, i) { var bt = el('button', 'wvband', b.name); bt.type = 'button'; bt.setAttribute('aria-pressed', String(i === st.band)); bt.addEventListener('click', function () { choose(i); }); bar.appendChild(bt); });
    panel.appendChild(bar);
    var info = el('div', 'cinfo'); info.id = 'wvinfo'; panel.appendChild(info); paintInfoSpectrum();
  }

  // ---------- shared ----------
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (spec.mode === 'sound') paintSound(panel); else if (spec.mode === 'refract') paintRefract(panel); else paintSpectrum(panel);
  }
  function report() {
    var vars, msg, ok = false;
    if (spec.mode === 'sound') {
      var M = medium(); vars = { f: st.f, a: st.a, m: M.id, v: M.real, l: r1(lambda()), h: st.heard };
      ok = st.heard === 1; msg = M.id === 0 ? 'In a vacuum there is nothing to carry the sound.' : st.heard ? 'The sound has reached the listener.' : 'The sound is on its way.';
    } else if (spec.mode === 'refract') {
      vars = { i: st.ang, r: rAng(), n: r1(nIdx()), e: st.surf === 'mirror' ? 1 : 0 }; ok = true;
      msg = st.surf === 'mirror' ? 'Incidence ' + st.ang + '°, reflection ' + st.ang + '°.' : 'Incidence ' + st.ang + '°, refraction ' + rAng() + '°.';
    } else {
      var b = BANDS[st.band], seen = st.seen.reduce(function (a, v) { return a + v; }, 0);
      vars = { b: st.band, n: seen, f: b.lf, l: b.lw }; ok = seen === 7; msg = b.name + ': ' + b.w + ', ' + b.f + '.';
    }
    B.say(msg, ok);
    if (spec.mode === 'sound' && ctx) drawSound();
    if (spec.mode === 'sound' || spec.mode === 'refract') B.save({ st: spec.mode === 'sound' ? { f: st.f, a: st.a, med: st.med } : { ang: st.ang, med: st.med } });
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  function loop(tPrev) {
    raf = requestAnimationFrame(function (t) {
      var dt = Math.min(0.05, (t - (tPrev || t)) / 1000);
      if (st.play) {
        if (spec.mode === 'sound') { st.acc = (st.acc || 0) + dt; while (st.acc >= DT) { st.acc -= DT; soundStep(); } drawSound(); if (st.heard !== st.reported) { st.reported = st.heard; report(); } }
        else { st.t += dt; if (bd) bd.update(); }
      }
      loop(t);
    });
  }

  B.widget('wave', {
    sections: ['board', 'gpanel'],
    label: function (s) { return { sound: 'A speaker, a tube of particles and a pressure graph showing a sound wave', refract: s.surf === 'mirror' ? 'Wave fronts reflecting from a mirror' : 'Wave fronts bending as they enter a second material', spectrum: 'The electromagnetic spectrum, one band at a time' }[s.mode]; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec; cancelAnimationFrame(raf); var sv = fresh ? null : B.saved(); sv = sv && sv.st ? sv.st : {};
      st = { t: 0, play: spec.playOn, reported: -1, W: 600, H: 300, seen: [0, 0, 0, 0, 0, 0, 0] };
      if (audio) { audio.live = false; tone(); }
      if (spec.mode === 'sound') {
        st.f = sv.f || spec.f; st.a = sv.a || spec.a; st.med = spec.med === 'choose' ? (sv.med || 'air') : spec.med; makeCanvas(); soundReset();
        for (var i = 0; i < spec.preRun * 60; i++) soundStep(); drawSound(); loop();
      }
      if (spec.mode === 'refract') {
        st.ang = sv.ang !== undefined ? sv.ang : spec.ang; st.med = spec.med === 'choose' ? (sv.med || 'glass') : spec.med; st.surf = spec.surf; st.rays = spec.rays; st.t = spec.preRun; buildRefract(); loop();
      }
      if (spec.mode === 'spectrum') { st.band = BANDS.map(function (b) { return b.id; }).indexOf(spec.band); st.seen[st.band] = 1; buildSpectrum(); loop(); }
      paint(); report();
    },
    redraw: function () { if (spec.mode === 'sound') drawSound(); else if (spec.mode === 'refract') buildRefract(); else buildSpectrum(); },
    resize: function () {
      if (spec.mode === 'sound') { sizeCanvas(); drawSound(); }
      else if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); }
    },
  });
})(WPB);
