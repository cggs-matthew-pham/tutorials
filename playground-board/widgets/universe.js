// The big bang and the expanding universe (AC9S10U03).
//   widget: universe
//   mode: timeline   Step through ten stages from the big bang to today: a patch of the universe, its temperature,
//                    and what has formed. Values: n stages visited, k stages (10), s stage now (0 to 9).
//   mode: expand     A field of galaxies. "Let space expand" stretches every distance by the same factor; choose any
//                    galaxy as home and every other galaxy moves away from it, faster the farther it is. Click galaxies
//                    to measure their distance, speed and the redshift of their light; the points build Hubble's graph.
//                    Values: e 1 once space has expanded by half again, h home galaxies tried, m galaxies measured,
//                    z largest redshift measured (×1000), q 1 once the graph has 3 points or more
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null, raf = 0;
  var INK = '#e4eaf3', MUTED = '#93a1b5', TAU = Math.PI * 2;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function shape(fn, a) {
    var o = Object.assign({ strokeWidth: 0, strokeColor: 'none', fillColor: 'none', fillOpacity: 1, fixed: true, highlight: false }, a || {});
    var closed = o.fillColor !== 'none', c = bd.create('curve', [[0], [0]], o);
    c.updateDataArray = function () { var p = typeof fn === 'function' ? fn() : fn; if (!p || !p.length) { this.dataX = [NaN]; this.dataY = [NaN]; return; } this.dataX = p.map(function (q) { return q[0]; }); this.dataY = p.map(function (q) { return q[1]; }); if (closed) { this.dataX.push(p[0][0]); this.dataY.push(p[0][1]); } };
    return c;
  }
  function text(x, y, s, a) { return bd.create('text', [x, y, s], Object.assign({ fontSize: 12, strokeColor: INK, fixed: true, highlight: false, display: 'internal', anchorX: 'middle', anchorY: 'middle' }, a || {})); }
  var circ = function (cx, cy, r, n) { var p = []; n = n || 16; for (var i = 0; i < n; i++) { var a = i / n * TAU; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; };
  var rand = (function () { var s = 7; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();

  // ---------- timeline ----------
  var STAGES = [
    { t: 1e-43, when: 'The first instant', title: 'The big bang', temp: 1e32, look: 'glow', what: 'Space, time, matter and energy all begin, in an extremely hot, dense state. It isn’t an explosion into empty space: space itself begins to expand.' },
    { t: 1e-32, when: 'A tiny fraction of a second', title: 'Inflation', temp: 1e27, look: 'glow', what: 'Space expands enormously, far faster than at any time since, in a tiny fraction of a second.' },
    { t: 1e-6, when: 'A millionth of a second', title: 'Protons and neutrons', temp: 1e13, look: 'soup', what: 'Still too hot for atoms. Quarks combine into protons and neutrons as the universe expands and cools.' },
    { t: 180, when: '3 minutes', title: 'The first nuclei', temp: 1e9, look: 'nuclei', what: 'Protons and neutrons fuse into nuclei of hydrogen and helium: about three-quarters hydrogen, one-quarter helium by mass, the proportions we still measure today.' },
    { t: 380000 * 3.156e7, when: '380 000 years', title: 'The first atoms', temp: 3000, look: 'atoms', what: 'Cool enough for electrons to join nuclei and make atoms. Light can now travel freely: that light, stretched to microwaves, is the cosmic microwave background we detect today.' },
    { t: 5e7 * 3.156e7, when: '50 million years', title: 'The dark ages', temp: 100, look: 'dark', what: 'No stars yet: just clouds of hydrogen and helium gas, slowly pulled together by gravity.' },
    { t: 2e8 * 3.156e7, when: '200 million years', title: 'The first stars', temp: 55, look: 'stars', what: 'Gravity squeezes gas clouds until they are hot enough for fusion. The first stars shine, and make heavier elements in their cores.' },
    { t: 1e9 * 3.156e7, when: '1 billion years', title: 'Galaxies', temp: 20, look: 'galaxies', what: 'Stars gather into galaxies. Massive stars explode as supernovae, spreading elements such as carbon, oxygen and iron for later stars and planets.' },
    { t: 9.2e9 * 3.156e7, when: '9.2 billion years', title: 'The sun and Earth', temp: 3.8, look: 'sun', what: 'Our solar system forms from a cloud of gas and dust that contains elements made in earlier stars. The atoms in you were made in stars.' },
    { t: 13.8e9 * 3.156e7, when: '13.8 billion years: today', title: 'Today', temp: 2.725, look: 'today', what: 'The universe is still expanding, and has cooled to 2.7 kelvin (about −270 °C). Distant galaxies are moving away from us.' },
  ];
  var sciT = function (k) { if (k < 10000) return (k < 10 ? k.toFixed(1) : Math.round(k).toLocaleString('en-AU')) + ' K'; var e = Math.floor(Math.log10(k)); return 'about 10' + String(e).split('').map(function (c) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]; }).join('') + ' K'; };
  var DOTS = []; for (var i = 0; i < 160; i++) DOTS.push([rand() * 2 - 1, rand() * 2 - 1, rand(), rand()]);
  function buildTimeline() {
    bd = B.jsx({ boundingbox: [-11, 6.4, 11, -6.4], keepAspectRatio: true });
    shape([[-60, -40], [60, -40], [60, 40], [-60, 40]], { fillColor: '#0b0f18' });
    var BX = -4.2, BY = 1.0, H = 4.6;   // the patch of universe
    var bg = function () { var s = STAGES[st.s]; var lt = Math.log10(s.temp); return lt > 8 ? '#fff6dc' : lt > 4 ? '#ffb85c' : lt > 3.3 ? '#c4552a' : lt > 1.9 ? '#1c1420' : '#0b0f18'; };
    shape(function () { return [[BX - H, BY - H], [BX + H, BY - H], [BX + H, BY + H], [BX - H, BY + H]]; }, { fillColor: function () { return bg(); }, strokeColor: '#56647e', strokeWidth: 1.5 });
    // The grid of space, stretched as the universe expands (the lines get farther apart).
    for (var g = -4; g <= 4; g++) {
      (function (g) {
        var sp = function () { return 0.45 + 0.13 * st.s; };
        shape(function () { var x = BX + g * sp(); return Math.abs(x - BX) > H ? null : [[x, BY - H], [x, BY + H]]; }, { strokeColor: 'rgba(120,140,170,0.35)', strokeWidth: 1 });
        shape(function () { var y = BY + g * sp(); return Math.abs(y - BY) > H ? null : [[BX - H, y], [BX + H, y]]; }, { strokeColor: 'rgba(120,140,170,0.35)', strokeWidth: 1 });
      })(g);
    }
    var look = function () { return STAGES[st.s].look; };
    DOTS.forEach(function (d, i) {
      var pos = function () { var sp = 0.45 + 0.13 * st.s, x = BX + d[0] * H * 0.95, y = BY + d[1] * H * 0.95; if (look() === 'soup') { x += Math.sin(st.ph * 9 + i) * 0.06; y += Math.cos(st.ph * 7 + i) * 0.06; } return [x, y, sp]; };
      shape(function () {
        var l = look(), p = pos();
        if (l === 'glow' || l === 'dark') return null;
        if (l === 'soup') return circ(p[0], p[1], 0.06, 6);
        if (l === 'nuclei') return i % 4 ? circ(p[0], p[1], 0.07, 8) : circ(p[0], p[1], 0.11, 8);
        if (l === 'atoms') return i % 2 ? circ(p[0], p[1], 0.07, 8) : null;
        if (l === 'stars') return i % 9 === 0 ? circ(p[0], p[1], 0.12, 10) : null;
        return null;
      }, { fillColor: function () { var l = look(); return l === 'soup' ? ['#ff5a5a', '#4ab0ff', '#7cff7c'][i % 3] : l === 'nuclei' ? (i % 4 ? '#ff7a5a' : '#ffd25a') : l === 'stars' ? '#fff3b0' : '#c9d6ff'; } });
      shape(function () { var l = look(), p = pos(); if (l !== 'atoms' || !(i % 2)) return null; var c = circ(p[0], p[1], 0.18, 14); c.push(c[0]); return c; }, { strokeColor: 'rgba(200,214,255,0.6)', strokeWidth: 1 });
    });
    // Gas clouds (dark ages, first stars), galaxies (later).
    [[-6.5, 3.2, 1.6], [-2.4, -0.8, 1.9], [-5.6, -2.0, 1.2], [-1.8, 3.6, 1.1]].forEach(function (c) {
      shape(function () { var l = look(); return l === 'dark' || l === 'stars' ? circ(c[0], c[1], c[2], 24) : null; }, { fillColor: 'rgba(110,120,150,0.28)' });
    });
    var GAL = [[-7.2, 4.1], [-5.0, 2.2], [-2.6, 4.4], [-1.4, 1.2], [-6.6, -0.6], [-3.6, -1.8], [-1.6, -3.0], [-7.4, -2.9], [-4.6, 0.6]];
    GAL.forEach(function (g, i) {
      var spread = function () { return look() === 'today' ? 1.18 : look() === 'sun' ? 1.08 : 1; };
      var gp = function () { var f = spread(); return [BX + (g[0] - BX) * f, BY + (g[1] - BY) * f]; };
      shape(function () { var l = look(); if (['galaxies', 'sun', 'today'].indexOf(l) < 0) return null; var p = gp(); if (Math.abs(p[0] - BX) > H - 0.4 || Math.abs(p[1] - BY) > H - 0.4) return null; var pts = []; for (var k = 0; k < 40; k++) { var a = k / 40 * TAU * 1.5, r = 0.08 + 0.32 * k / 40; pts.push([p[0] + r * Math.cos(a + i), p[1] + 0.6 * r * Math.sin(a + i)]); } return pts; }, { strokeColor: '#cfd8ff', strokeWidth: 2 });
      shape(function () { var l = look(); if (['galaxies', 'sun', 'today'].indexOf(l) < 0) return null; var p = gp(); if (Math.abs(p[0] - BX) > H - 0.4 || Math.abs(p[1] - BY) > H - 0.4) return null; return circ(p[0], p[1], 0.1, 10); }, { fillColor: '#fff3b0' });
    });
    shape(function () { return look() === 'sun' || look() === 'today' ? circ(-3.6, -1.8, 0.5, 20) : null; }, { strokeColor: '#ffd25a', strokeWidth: 2 });
    text(-3.6, -2.6, function () { return look() === 'sun' || look() === 'today' ? 'Milky Way (our galaxy)' : ''; }, { fontSize: 11, strokeColor: '#ffd25a' });
    text(BX, BY + H + 0.55, 'A patch of the universe (the grid stretches as space expands)', { fontSize: 12, strokeColor: MUTED });
    // Right: what is happening.
    text(1.4, 5.0, function () { return STAGES[st.s].when; }, { anchorX: 'left', fontSize: 14, strokeColor: '#ffd25a', cssStyle: 'font-weight:700' });
    text(1.4, 4.1, function () { return (st.s + 1) + '. ' + STAGES[st.s].title; }, { anchorX: 'left', fontSize: 20, cssStyle: 'font-weight:700' });
    text(1.4, 3.1, function () { return 'Temperature: ' + sciT(STAGES[st.s].temp); }, { anchorX: 'left', fontSize: 14 });
    // The timeline (each stage evenly spaced: the real times run from a tiny fraction of a second to billions of years).
    var TX0 = -9.5, TX1 = 10.2, TY = -5.0, tx = function (i) { return TX0 + (TX1 - TX0) * i / (STAGES.length - 1); };
    shape([[TX0, TY], [TX1, TY]], { strokeColor: '#56647e', strokeWidth: 2 });
    STAGES.forEach(function (s, i) {
      shape(function () { return circ(tx(i), TY, i === st.s ? 0.28 : 0.16, 14); }, { fillColor: function () { return i === st.s ? '#ffd25a' : st.seen[i] ? '#8fdca0' : '#56647e'; } });
    });
    text(TX0, TY - 0.6, 'Big bang', { anchorX: 'left', fontSize: 11, strokeColor: MUTED });
    text(TX1, TY - 0.6, 'Today', { anchorX: 'right', fontSize: 11, strokeColor: MUTED });
    bd.on('down', function (e) { var c = bd.getUsrCoordsOfMouse(e); if (Math.abs(c[1] - TY) > 0.5) return; var i = Math.round((c[0] - TX0) / (TX1 - TX0) * (STAGES.length - 1)); if (i >= 0 && i < STAGES.length) go(i); });
    bd.update();
  }
  function go(i) { st.s = Math.max(0, Math.min(STAGES.length - 1, i)); st.seen[st.s] = 1; B.moved = true; bd.update(); paintTimeline(); report(); }
  function paintTimeline() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    var pv = el('button', '', '← Earlier'); pv.type = 'button'; pv.disabled = st.s === 0; pv.addEventListener('click', function () { go(st.s - 1); });
    var nx = el('button', 'go', 'Later →'); nx.type = 'button'; nx.disabled = st.s === STAGES.length - 1; nx.addEventListener('click', function () { go(st.s + 1); });
    bar.append(pv, nx); panel.appendChild(bar);
    var box = el('div', 'cinfo'); box.appendChild(el('b', '', STAGES[st.s].title + ' (' + STAGES[st.s].when + ').')); box.appendChild(el('span', '', ' ' + STAGES[st.s].what)); panel.appendChild(box);
  }

  // ---------- expand ----------
  var H0 = 21.5;   // km/s for every million light-years (about 70 km/s per megaparsec)
  var GALS = []; (function () { for (var i = 0; i < 34; i++) { var x, y, ok; do { x = rand() * 9 - 4.5; y = rand() * 5.4 - 2.7; ok = GALS.every(function (g) { return Math.hypot(g.x - x, g.y - y) > 0.95; }); } while (!ok); GALS.push({ x: x, y: y, r: rand() * TAU }); } })();
  var UNIT = 100;   // one board unit (before expanding) is 100 million light-years
  function home() { return GALS[st.home]; }
  function posAt(g, a) { var h = home(); return [(g.x - h.x) * a, (g.y - h.y) * a]; }
  function buildExpand() {
    bd = B.jsx({ boundingbox: [-11, 6.4, 11, -6.4], keepAspectRatio: true });
    shape([[-60, -40], [60, -40], [60, 40], [-60, 40]], { fillColor: '#0b0f18' });
    GALS.forEach(function (g, i) {
      shape(function () { if (i === st.home || st.a < 1.02) return null; var p0 = posAt(g, 1), p1 = posAt(g, st.a); return [p0, p1]; }, { strokeColor: 'rgba(255,138,76,0.75)', strokeWidth: 1.5 });
      shape(function () { if (i === st.home || st.a < 1.02) return null; var p0 = posAt(g, 1); return circ(p0[0], p0[1], 0.07, 8); }, { fillColor: 'rgba(147,161,181,0.6)' });
      shape(function () { var p = posAt(g, st.a), pts = []; for (var k = 0; k < 36; k++) { var a = k / 36 * TAU * 1.5, r = 0.06 + 0.3 * k / 36; pts.push([p[0] + r * Math.cos(a + g.r), p[1] + 0.6 * r * Math.sin(a + g.r)]); } return pts; }, { strokeColor: function () { return i === st.home ? '#ffd25a' : st.measured[i] ? '#8fdca0' : '#cfd8ff'; }, strokeWidth: 2 });
      shape(function () { var p = posAt(g, st.a); return circ(p[0], p[1], 0.09, 10); }, { fillColor: function () { return i === st.home ? '#ffd25a' : '#fff3b0'; } });
    });
    text(0, -0.65, 'Home', { fontSize: 11, strokeColor: '#ffd25a', cssStyle: 'font-weight:700' });
    shape(function () { var c = circ(0, 0, 0.5, 24); c.push(c[0]); return c; }, { strokeColor: '#ffd25a', strokeWidth: 1.5, dash: 2 });
    text(0, 5.8, function () { return st.a < 1.02 ? 'Space before expanding (1 square = 100 million light-years)' : 'Space has stretched ×' + st.a.toFixed(2) + ': grey dots show where each galaxy was'; }, { fontSize: 13, strokeColor: MUTED });
    bd.on('down', function (e) {
      if (st.playing) return;
      var c = bd.getUsrCoordsOfMouse(e), best = -1, bdist = 0.45;
      GALS.forEach(function (g, i) { var p = posAt(g, st.a), d = Math.hypot(p[0] - c[0], p[1] - c[1]); if (d < bdist) { bdist = d; best = i; } });
      if (best < 0) return;
      B.moved = true;
      if (st.pick === 'home') { st.home = best; st.homes[best] = 1; st.pick = null; st.sel = null; }
      else if (best !== st.home) { st.sel = best; st.measured[best] = 1; var d = Math.hypot.apply(null, posAt(GALS[best], st.a)) * UNIT, v = H0 * d; st.zmax = Math.max(st.zmax, v / 299792); st.pts[best] = [d, v]; }
      bd.update(); paintExpand(); report();
    });
    bd.update();
  }
  function spectrum(z, label) {
    // Hydrogen lines at 410, 434, 486 and 656 nm; the shift is drawn 20 times bigger so it can be seen.
    var W = 420, x = function (nm) { return (nm - 380) / (750 - 380) * W; }, lines = [410, 434, 486, 656], f = 1 + 20 * z;
    var grad = '<linearGradient id="sp" x1="0" x2="1"><stop offset="0" stop-color="#7a3cff"/><stop offset=".2" stop-color="#2b5cff"/><stop offset=".38" stop-color="#18c3ff"/><stop offset=".5" stop-color="#3bd94a"/><stop offset=".62" stop-color="#ffe23a"/><stop offset=".78" stop-color="#ff8c1a"/><stop offset="1" stop-color="#e01e1e"/></linearGradient>';
    var row = function (y, k, lab) { return '<rect x="0" y="' + y + '" width="' + W + '" height="18" fill="url(#sp)"/>' + lines.map(function (nm) { var X = x(nm * k); return X < W ? '<rect x="' + (X - 1.5) + '" y="' + y + '" width="3" height="18" fill="#000"/>' : ''; }).join('') + '<text x="' + (W + 6) + '" y="' + (y + 13) + '">' + lab + '</text>'; };
    return '<svg viewBox="0 0 560 50" role="img" aria-label="Spectrum of the galaxy compared with a lab"><defs>' + grad + '</defs>' + row(2, 1, 'Lab (not moving)') + row(28, f, label) + '</svg>';
  }
  function hubbleSVG() {
    var pts = Object.keys(st.pts).map(function (k) { return st.pts[k]; }), W = 560, H = 170, pad = 70;
    var dmax = Math.max(500, Math.ceil(Math.max.apply(null, pts.map(function (p) { return p[0]; }).concat([1])) / 250) * 250), vmax = dmax * H0;
    var X = function (d) { return pad + (W - pad - 10) * d / dmax; }, Y = function (v) { return H - 26 - (H - 36) * v / vmax; };
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Speed against distance for the galaxies measured"><g class="ctick"><line x1="' + pad + '" y1="' + Y(0) + '" x2="' + (W - 10) + '" y2="' + Y(0) + '" class="cgrid"/><line x1="' + pad + '" y1="' + Y(0) + '" x2="' + pad + '" y2="10" class="cgrid"/>' +
      '<text x="' + ((W + pad) / 2) + '" y="' + (H - 4) + '" text-anchor="middle">distance (million light-years)</text><text x="' + (pad + 6) + '" y="16">speed away from home</text><text x="' + (pad - 4) + '" y="' + (Y(vmax) + 4) + '" text-anchor="end">' + Math.round(vmax / 1000) + 'k km/s</text><text x="' + (W - 10) + '" y="' + (Y(0) + 14) + '" text-anchor="end">' + dmax + '</text></g>' +
      pts.map(function (p) { return '<circle cx="' + X(p[0]).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="4.5" class="hpt"/>'; }).join('') + '</svg>';
  }
  function paintExpand() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    var ex = el('button', 'go', st.a < 1.02 ? 'Let space expand' : 'Back to the start'); ex.type = 'button';
    ex.addEventListener('click', function () {
      if (st.playing) return; st.playing = true; B.moved = true; var a0 = st.a, a1 = st.a < 1.02 ? 1.6 : 1, t0 = performance.now();
      cancelAnimationFrame(raf);
      (function tick(now) { var f = Math.min(1, (now - t0) / 2500); st.a = a0 + (a1 - a0) * f; bd.update(); if (f < 1) raf = requestAnimationFrame(tick); else { st.playing = false; if (st.a >= 1.5) st.expanded = 1; st.pts = {}; Object.keys(st.measured).forEach(function (k) { var d = Math.hypot.apply(null, posAt(GALS[k], st.a)) * UNIT; st.pts[k] = [d, H0 * d]; }); paintExpand(); report(); } })(t0);
    });
    var hm = el('button', '', st.pick === 'home' ? 'Click a galaxy to live in…' : 'Live in a different galaxy'); hm.type = 'button'; hm.setAttribute('aria-pressed', String(st.pick === 'home'));
    hm.addEventListener('click', function () { st.pick = st.pick === 'home' ? null : 'home'; paintExpand(); });
    bar.append(ex, hm); panel.appendChild(bar);
    var box = el('div', 'cinfo');
    if (st.sel === null) box.textContent = 'Click any galaxy to measure how far away it is, how fast it is moving away, and its light.';
    else {
      var p = st.pts[st.sel] || [0, 0], z = p[1] / 299792;
      box.appendChild(el('b', '', 'This galaxy: ' + Math.round(p[0]).toLocaleString('en-AU') + ' million light-years away, moving away at ' + Math.round(p[1]).toLocaleString('en-AU') + ' km/s.'));
      box.appendChild(el('i', '', 'Its light is redshifted: every dark line is moved towards red by ' + (z * 100).toFixed(1) + '% (drawn 20 times bigger below).'));
      var sp = el('div', 'uspec'); sp.innerHTML = spectrum(z, 'This galaxy'); box.appendChild(sp);
    }
    panel.appendChild(box);
    var g = el('div', 'cgraph'); g.innerHTML = hubbleSVG(); panel.appendChild(g);
  }

  function report() {
    var vars, msg, ok;
    if (spec.mode === 'timeline') {
      var n = Object.keys(st.seen).length; vars = { n: n, k: STAGES.length, s: st.s };
      msg = n + ' of ' + STAGES.length + ' stages visited.'; ok = n === STAGES.length;
    } else {
      var m = Object.keys(st.measured).length, q = Object.keys(st.pts).length;
      vars = { e: st.expanded, h: Object.keys(st.homes).length, m: m, z: Math.round(st.zmax * 1000), q: q >= 3 ? 1 : 0 };
      msg = (st.expanded ? 'Space has expanded. ' : '') + m + ' galaxies measured from ' + vars.h + ' home galax' + (vars.h === 1 ? 'y' : 'ies') + '.'; ok = st.expanded && q >= 3;
    }
    B.say(msg, ok);
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  B.widget('universe', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.mode === 'expand' ? 'A field of galaxies in expanding space' : 'The universe from the big bang to today'; },
    parse: function (s) { s.mode = s.mode || 'timeline'; if (['timeline', 'expand'].indexOf(s.mode) < 0) throw new Error('mode: timeline or expand.'); },
    start: function () {
      spec = B.spec; cancelAnimationFrame(raf);
      if (spec.mode === 'timeline') {
        st = { s: 0, seen: { 0: 1 }, ph: 0 }; buildTimeline(); paintTimeline(); report();
        (function tick() { st.ph += 0.02; if (STAGES[st.s].look === 'soup') bd.update(); raf = requestAnimationFrame(tick); })();
        return;
      }
      var c = 0, bi = 0; GALS.forEach(function (g, i) { var d = Math.hypot(g.x, g.y); if (i === 0 || d < c) { c = d; bi = i; } });
      st = { a: 1, home: bi, homes: {}, measured: {}, pts: {}, sel: null, zmax: 0, expanded: 0, pick: null, playing: false };
      st.homes[bi] = 1; buildExpand(); paintExpand(); report();
    },
    redraw: function () { if (spec.mode === 'timeline') { buildTimeline(); paintTimeline(); } else { buildExpand(); paintExpand(); } },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
