// Earth's energy balance and the greenhouse effect (AC9S10U04): a one-layer energy model.
//   widget: climate
//   mode: albedo      A row of surfaces under the sun; click a surface to change it (ocean, forest, grass, desert,
//                     ice, city). Arrows show how much sunlight each reflects and absorbs.
//                       tiles: ocean, forest, ice, desert   (the starting row, 4 to 10 tiles)
//                     Values: a percent reflected, e sunlight absorbed (W/m²), i ice tiles, k kinds of surface used,
//                     g highest minus lowest percent reflected seen
//   mode: balance     Sunlight in, reflected, absorbed by the surface; the surface and air give off infrared; some
//                     escapes to space. Change the sunlight or the reflectiveness, run the years, and watch the
//                     temperature settle where energy out equals energy in.
//   mode: greenhouse  The same model with a carbon dioxide slider and a "no greenhouse gases" button.
//                     Values (balance and greenhouse): t surface temperature (°C), i energy in, o energy out (W/m²),
//                     d in minus out, y years run, b 1 once the balance came back (|d| under 0.3) after being upset
//                     (|d| over 2), c changes made, g CO₂ (ppm), z 1 once a run with no greenhouse gases went below
//                     −10 °C, w warmest temperature reached (°C)
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null, raf = 0;
  var INK = '#e4eaf3', MUTED = '#93a1b5', SIG = 5.67e-8, S = 340, CAP = 13;
  var SURF = { ocean: [0.06, '#2e6db8', 'Ocean'], forest: [0.15, '#2f6b2a', 'Forest'], grass: [0.25, '#7cae4a', 'Grassland'], desert: [0.35, '#d9b56b', 'Desert'], ice: [0.8, '#f2f6fb', 'Ice and snow'], city: [0.12, '#7d7f86', 'City'] };
  var ORDER = ['ocean', 'forest', 'grass', 'desert', 'ice', 'city'];
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function shape(fn, a) {
    var o = Object.assign({ strokeWidth: 0, strokeColor: 'none', fillColor: 'none', fillOpacity: 1, fixed: true, highlight: false }, a || {});
    var closed = o.fillColor !== 'none', c = bd.create('curve', [[0], [0]], o);
    c.updateDataArray = function () { var p = typeof fn === 'function' ? fn() : fn; if (!p || !p.length) { this.dataX = [NaN]; this.dataY = [NaN]; return; } this.dataX = p.map(function (q) { return q[0]; }); this.dataY = p.map(function (q) { return q[1]; }); if (closed) { this.dataX.push(p[0][0]); this.dataY.push(p[0][1]); } };
    return c;
  }
  function text(x, y, s, a) { return bd.create('text', [x, y, s], Object.assign({ fontSize: 12, strokeColor: INK, fixed: true, highlight: false, display: 'internal', anchorX: 'middle', anchorY: 'middle' }, a || {})); }
  var circ = function (cx, cy, r) { var p = []; for (var i = 0; i < 24; i++) { var a = i / 24 * Math.PI * 2; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; };

  // ---------- albedo ----------
  var albedo = function () { return st.tiles.reduce(function (s, t) { return s + SURF[t][0]; }, 0) / st.tiles.length; };
  function buildAlbedo() {
    bd = B.jsx({ boundingbox: [-11, 6.4, 11, -6.4], keepAspectRatio: true });
    shape([[-60, -40], [60, -40], [60, 40], [-60, 40]], { fillColor: '#0e1522' });
    shape(circ(-9.3, 5.0, 0.8), { fillColor: '#ffd65a' });
    text(-9.3, 3.9, 'Sun', { fontSize: 12, strokeColor: MUTED });
    var n = st.tiles.length, X0 = -9.6, X1 = 9.6, w = (X1 - X0) / n, Y = -2.8;
    st.tiles.forEach(function (t, i) {
      var x0 = X0 + i * w, cx = x0 + w / 2;
      shape(function () { return [[x0 + 0.05, Y - 1.4], [x0 + w - 0.05, Y - 1.4], [x0 + w - 0.05, Y], [x0 + 0.05, Y]]; }, { fillColor: function () { return SURF[st.tiles[i]][1]; }, strokeColor: '#56647e', strokeWidth: 1 });
      text(cx, Y - 1.85, function () { return SURF[st.tiles[i]][2]; }, { fontSize: 11 });
      text(cx, Y - 2.45, function () { return Math.round(SURF[st.tiles[i]][0] * 100) + '% reflected'; }, { fontSize: 11, strokeColor: MUTED });
      // Sunlight in (yellow, slanting down), reflected (white, going up), width by amount.
      bd.create('arrow', [[cx - 0.9, 3.4], [cx - 0.15, Y + 0.15]], { strokeColor: '#ffd65a', strokeWidth: 4, fixed: true, highlight: false, lastArrow: { type: 2, size: 4 } });
      bd.create('arrow', [[cx + 0.15, Y + 0.15], [cx + 0.9, 3.4]], { strokeColor: '#ffffff', strokeWidth: function () { return 0.5 + 6 * SURF[st.tiles[i]][0]; }, strokeOpacity: function () { return 0.3 + 0.7 * SURF[st.tiles[i]][0]; }, fixed: true, highlight: false, lastArrow: { type: 2, size: 4 } });
      // Absorbed: a warm glow under the tile, stronger the more is absorbed.
      shape(function () { return [[x0 + 0.05, Y - 1.4], [x0 + w - 0.05, Y - 1.4], [x0 + w - 0.05, Y - 1.25], [x0 + 0.05, Y - 1.25]]; }, { fillColor: '#ff6a3a', fillOpacity: function () { return 1 - SURF[st.tiles[i]][0]; } });
    });
    text(0, 5.4, function () { var a = albedo(); return 'Reflected: ' + Math.round(a * 100) + '% · absorbed: ' + Math.round(S * (1 - a)) + ' W/m² (of ' + S + ')'; }, { fontSize: 15, cssStyle: 'font-weight:700' });
    text(0, 4.6, 'Yellow: sunlight in. White: sunlight reflected (thicker = more). Click a surface to change it.', { fontSize: 12, strokeColor: MUTED });
    bd.on('down', function (e) {
      var c = bd.getUsrCoordsOfMouse(e); if (c[1] > Y + 0.2 || c[1] < Y - 2.6 || c[0] < X0 || c[0] > X1) return;
      var i = Math.floor((c[0] - X0) / w); st.tiles[i] = ORDER[(ORDER.indexOf(st.tiles[i]) + 1) % ORDER.length]; st.kinds[st.tiles[i]] = 1;
      B.moved = true; track(); bd.update(); paintAlbedo(); report();
    });
    bd.update();
  }
  function track() { var a = albedo() * 100; st.amax = Math.max(st.amax, a); st.amin = Math.min(st.amin, a); }
  function paintAlbedo() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    [['Melt the ice', function (t) { return t === 'ice' ? 'ocean' : t; }], ['Freeze the oceans', function (t) { return t === 'ocean' ? 'ice' : t; }], ['Clear the forests', function (t) { return t === 'forest' ? 'grass' : t; }]].forEach(function (b) {
      var x = el('button', '', b[0]); x.type = 'button';
      x.addEventListener('click', function () { st.tiles = st.tiles.map(b[1]); st.tiles.forEach(function (t) { st.kinds[t] = 1; }); B.moved = true; track(); bd.update(); paintAlbedo(); report(); });
      bar.appendChild(x);
    });
    panel.appendChild(bar);
    var a = albedo(), box = el('div', 'cinfo');
    box.appendChild(el('b', '', Math.round(a * 100) + '% of the sunlight is reflected; ' + Math.round(S * (1 - a)) + ' W/m² is absorbed and warms the surface.'));
    box.appendChild(el('i', '', 'Light, bright surfaces (ice, snow) reflect most sunlight; dark surfaces (ocean, forest) absorb most. W/m² means joules of energy every second, for each square metre.'));
    panel.appendChild(box);
  }

  // ---------- balance and greenhouse ----------
  var eps = function () { return st.noGHG ? 0 : Math.min(0.98, 0.771 + 0.074 * Math.log(st.co2 / 280)); };
  var absorbed = function () { return S * st.sun * (1 - st.alb); };
  var surfIR = function () { return SIG * Math.pow(st.T, 4); };
  var outIR = function () { return surfIR() * (1 - eps() / 2); };
  var eqT = function () { return Math.pow(absorbed() / (SIG * (1 - eps() / 2)), 0.25); };
  function stepYears(dt) {
    st.T += (absorbed() - outIR()) / CAP * dt; st.years += dt; st.ocean += (absorbed() - outIR()) * dt;
    var d = absorbed() - outIR();
    if (Math.abs(d) > 2) st.upset = true; else if (Math.abs(d) < 0.3 && st.upset) { st.upset = false; st.back = 1; }
    st.warm = Math.max(st.warm, st.T - 273.15);
    st.hist.push([st.years, st.T - 273.15]);
  }
  function buildBalance() {
    bd = B.jsx({ boundingbox: [-11, 6.4, 11, -6.4], keepAspectRatio: true });
    shape([[-60, -40], [60, -40], [60, 40], [-60, 40]], { fillColor: '#0e1522' });
    shape([[-60, 0.4], [60, 0.4], [60, 3.2], [-60, 3.2]], { fillColor: function () { return 'rgba(120,170,230,' + (0.08 + 0.25 * eps()) + ')'; } });
    shape([[-60, -40], [-2, -40], [-2, -2.2], [-60, -2.2]], { fillColor: '#5d7f3c' });
    shape([[-2, -40], [60, -40], [60, -2.2], [-2, -2.2]], { fillColor: '#2e6db8' });
    shape(circ(-9.4, 5.2, 0.7), { fillColor: '#ffd65a' });
    text(10.6, 5.9, 'Space', { anchorX: 'right', fontSize: 12, strokeColor: MUTED });
    text(10.6, 1.75, function () { return spec.mode === 'greenhouse' ? (st.noGHG ? 'Atmosphere (no greenhouse gases)' : 'Atmosphere: ' + Math.round(st.co2) + ' ppm CO₂') : 'Atmosphere'; }, { anchorX: 'right', fontSize: 12 });
    text(-10.6, -4.8, 'Land', { anchorX: 'left', fontSize: 12 }); text(10.6, -4.8, 'Ocean (stores heat)', { anchorX: 'right', fontSize: 12 });
    var W = function (v) { return Math.max(1, Math.min(14, v / 22)); };
    var A = function (x0, y0, x1, y1, col, val) { bd.create('arrow', [[x0, y0], [x1, y1]], { strokeColor: col, strokeWidth: function () { return W(val()); }, fixed: true, highlight: false, lastArrow: { type: 2, size: 3 } }); };
    var lab = function (x, y, s, col, anchor) { text(x, y, s, { fontSize: 11, strokeColor: col || INK, anchorX: anchor || 'left', cssStyle: 'text-shadow:0 0 3px #0e1522,0 0 3px #0e1522' }); };
    // Sunlight: in, reflected, absorbed.
    A(-8.6, 4.7, -6.6, -2.0, '#ffd65a', function () { return S * st.sun; });
    lab(-8.4, 2.2, function () { return 'Sunlight in ' + Math.round(S * st.sun); }, '#ffd65a', 'right');
    A(-6.2, -2.0, -4.4, 5.2, '#ffffff', function () { return S * st.sun * st.alb; });
    lab(-4.1, 4.6, function () { return 'Reflected ' + Math.round(S * st.sun * st.alb); }, '#ffffff');
    lab(-6.4, -2.7, function () { return 'Absorbed ' + Math.round(absorbed()); }, '#ffb38a', 'middle');
    // Infrared from the surface: some escapes, some is absorbed by greenhouse gases.
    A(0.5, -2.0, 0.5, 1.2, '#ff6a3a', surfIR);
    lab(0.1, -1.1, function () { return 'Infrared from surface ' + Math.round(surfIR()); }, '#ff9f7a', 'right');
    A(1.0, 1.4, 1.8, 5.4, '#ff6a3a', function () { return surfIR() * (1 - eps()); });
    lab(2.1, 4.9, function () { return 'Escapes to space ' + Math.round(surfIR() * (1 - eps())); }, '#ff9f7a');
    A(8.2, 3.3, 8.8, 5.4, '#ff9f7a', function () { return surfIR() * eps() / 2; });
    lab(7.9, 4.0, function () { return 'Air to space ' + Math.round(surfIR() * eps() / 2); }, '#ffb38a', 'right');
    A(7.8, 0.4, 7.8, -2.0, '#ff9f7a', function () { return surfIR() * eps() / 2; });
    lab(7.4, -1.1, function () { return 'Back down ' + Math.round(surfIR() * eps() / 2); }, '#ffb38a', 'right');
    text(0, -3.6, function () { var d = absorbed() - outIR(); return 'Surface ' + (st.T - 273.15).toFixed(1) + ' °C · in ' + Math.round(absorbed()) + ' · out ' + Math.round(outIR()) + ' W/m² · ' + (Math.abs(d) < 0.3 ? 'in balance' : d > 0 ? 'gaining energy: warming' : 'losing energy: cooling'); }, { fontSize: 15, cssStyle: 'font-weight:700;text-shadow:0 0 4px #000,0 0 4px #000' });
    bd.update();
  }
  function graphSVG() {
    var W = 520, H = 140, pad = 36, h = st.hist, x1 = Math.max(50, st.years), lo = 10, hi = 20;
    h.forEach(function (p) { lo = Math.min(lo, Math.floor(p[1] / 5) * 5); hi = Math.max(hi, Math.ceil(p[1] / 5) * 5); });
    var X = function (t) { return pad + (W - pad - 8) * t / x1; }, Y = function (v) { return H - 18 - (H - 28) * (v - lo) / (hi - lo); };
    var d = h.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' ');
    var ticks = [lo, (lo + hi) / 2, hi].map(function (v) { return '<text x="' + (pad - 4) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + Math.round(v) + '</text><line x1="' + pad + '" x2="' + (W - 8) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="cgrid"/>'; }).join('');
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Surface temperature over the years"><g class="ctick">' + ticks + '<text x="' + pad + '" y="' + (H - 3) + '">0</text><text x="' + (W - 8) + '" y="' + (H - 3) + '" text-anchor="end">' + Math.round(x1) + ' years</text><text x="' + (pad + 6) + '" y="12">Surface temperature (°C)</text></g><path d="' + d + '" class="cline"/></svg>';
  }
  function slider(panel, id, label, min, max, stepv, val, fmt, on) {
    var row = el('div', 'srow'), lab = el('label', 'fname', label); lab.htmlFor = id;
    var r = el('input'); r.type = 'range'; r.id = id; r.min = min; r.max = max; r.step = stepv; r.value = val;
    var out = el('output'); out.textContent = fmt(val);
    r.addEventListener('input', function () { if (st.running) return; var v = Number(r.value); out.textContent = fmt(v); on(v); st.changes++; B.moved = true; bd.update(); report(); });
    row.append(lab, r, out); panel.appendChild(row);
  }
  function paintBalance() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (spec.mode === 'balance') {
      slider(panel, 'csun', 'Sunlight', 90, 110, 1, Math.round(st.sun * 100), function (v) { return v + '%'; }, function (v) { st.sun = v / 100; });
      slider(panel, 'calb', 'Reflected', 20, 40, 1, Math.round(st.alb * 100), function (v) { return v + '%'; }, function (v) { st.alb = v / 100; });
    } else {
      slider(panel, 'cco2', 'CO₂', 180, 1120, 10, st.co2, function (v) { return v + ' ppm'; }, function (v) { st.co2 = v; st.noGHG = false; });
    }
    var bar = el('div', 'fbar');
    [[10, 'Run 10 years'], [50, 'Run 50 years']].forEach(function (y) { var b = el('button', y[0] === 10 ? 'go' : '', y[1]); b.type = 'button'; b.addEventListener('click', function () { run(y[0]); }); bar.appendChild(b); });
    if (spec.mode === 'greenhouse') {
      var ng = el('button', '', st.noGHG ? 'Put the greenhouse gases back' : 'Remove all greenhouse gases'); ng.type = 'button'; ng.setAttribute('aria-pressed', String(st.noGHG));
      ng.addEventListener('click', function () { if (st.running) return; st.noGHG = !st.noGHG; st.changes++; B.moved = true; bd.update(); paintBalance(); report(); });
      bar.appendChild(ng);
    }
    panel.appendChild(bar);
    var g = el('div', 'cgraph'); g.innerHTML = graphSVG(); panel.appendChild(g);
    panel.appendChild(el('p', 'cokind', st.note || (spec.mode === 'balance' ? 'Energy in (absorbed sunlight) and energy out (infrared to space) are balanced. Change one, then run the years.' : 'Greenhouse gases absorb infrared from the surface and send some back down. Change the CO₂, then run the years.')));
  }
  function run(years) {
    if (st.running) return; st.running = true; B.moved = true; var done = 0, t0 = performance.now(), ms = years === 10 ? 2500 : 6000, T0 = st.T;
    cancelAnimationFrame(raf);
    (function tick(now) {
      var target = Math.min(years, years * (now - t0) / ms);
      while (done < target - 1e-9) { var dt = Math.min(0.05, target - done); stepYears(dt); done += dt; }
      bd.update();
      if (done < years) { raf = requestAnimationFrame(tick); return; }
      st.running = false;
      if (st.noGHG && st.T - 273.15 < -10) st.cold = 1;
      var dT = st.T - T0, d = absorbed() - outIR();
      st.note = 'In ' + years + ' years the surface ' + (Math.abs(dT) < 0.05 ? 'stayed at ' : dT > 0 ? 'warmed by ' + dT.toFixed(1) + ' °C to ' : 'cooled by ' + (-dT).toFixed(1) + ' °C to ') + (st.T - 273.15).toFixed(1) + ' °C. ' + (Math.abs(d) < 0.3 ? 'Energy out now equals energy in: balanced again.' : 'Still ' + (d > 0 ? 'gaining' : 'losing') + ' ' + Math.abs(d).toFixed(1) + ' W/m²: it will keep ' + (d > 0 ? 'warming' : 'cooling') + ' towards ' + (eqT() - 273.15).toFixed(1) + ' °C.');
      paintBalance(); report();
    })(t0);
  }

  function report() {
    var vars, msg, ok = false;
    if (spec.mode === 'albedo') {
      var a = albedo();
      vars = { a: Math.round(a * 100), e: Math.round(S * (1 - a)), i: st.tiles.filter(function (t) { return t === 'ice'; }).length, k: Object.keys(st.kinds).length, g: Math.round(st.amax - st.amin) };
      msg = 'Reflected ' + vars.a + '%, absorbed ' + vars.e + ' W/m².';
    } else {
      var d = absorbed() - outIR();
      vars = { t: +(st.T - 273.15).toFixed(1), i: Math.round(absorbed()), o: Math.round(outIR()), d: +d.toFixed(1), y: Math.round(st.years), b: st.back, c: st.changes, g: st.co2, z: st.cold, w: +st.warm.toFixed(1) };
      msg = 'Surface ' + vars.t + ' °C after ' + vars.y + ' years; in ' + vars.i + ', out ' + vars.o + ' W/m².';
    }
    B.say(msg, ok);
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  B.widget('climate', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.mode === 'albedo' ? 'Sunlight reflected and absorbed by different surfaces' : 'Earth’s energy flows: sunlight in, infrared out'; },
    parse: function (s) {
      s.mode = s.mode || 'balance';
      if (['albedo', 'balance', 'greenhouse'].indexOf(s.mode) < 0) throw new Error('mode: albedo, balance or greenhouse.');
      s.tilelist = (s.tiles || 'ocean, ocean, forest, grass, desert, ice, ocean, forest').split(',').map(function (t) { return t.trim(); });
      s.tilelist.forEach(function (t) { if (!SURF[t]) throw new Error('tiles: "' + t + '" is not one of ' + ORDER.join(', ') + '.'); });
      if (s.tilelist.length < 4 || s.tilelist.length > 10) throw new Error('tiles: 4 to 10 surfaces.');
    },
    start: function () {
      spec = B.spec; cancelAnimationFrame(raf);
      if (spec.mode === 'albedo') { st = { tiles: spec.tilelist.slice(), kinds: {}, amax: 0, amin: 100 }; st.tiles.forEach(function (t) { st.kinds[t] = 1; }); track(); buildAlbedo(); paintAlbedo(); report(); return; }
      st = { sun: 1, alb: 0.3, co2: 280, noGHG: false, years: 0, hist: [], ocean: 0, upset: false, back: 0, changes: 0, cold: 0, warm: -300, running: false };
      st.T = eqT(); st.hist.push([0, st.T - 273.15]); st.warm = st.T - 273.15;
      buildBalance(); paintBalance(); report();
    },
    redraw: function () { if (spec.mode === 'albedo') { buildAlbedo(); paintAlbedo(); } else { buildBalance(); paintBalance(); } },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
