// Earth's spheres and the carbon cycle (AC9S9U03).
//   widget: carbon
//   mode: spheres   A landscape: click each thing, then say which of Earth's four spheres it belongs to (some belong to
//                   two, where spheres meet). Values: n found, k things, w wrong answers.
//   mode: cycle     Carbon stores (atmosphere, living things and soil, oceans, fossil fuels) joined by flows. Switch
//                   processes on and off, run the years, and watch the carbon dioxide in the air on the graph.
//                     combustion: on   (a slider for burning fossil fuels, 0 to 20 billion tonnes of carbon a year)
//                     start: today     (start at today's air, 420 ppm, instead of the balanced pre-industrial 280 ppm)
//                   Values: a CO2 in the air (ppm), y years run, c burning (GtC a year), u 1 once a run of 10 years or
//                   more made CO2 fall by 5 ppm or more, v 1 once one made it rise by 5 or more, s 1 once one kept it
//                   steady (less than 0.25 ppm a year), f processes switched off now, b living things and soil (GtC), o 1 while photosynthesis
//                   is on, r 1 while respiration and decomposition are on.
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null, raf = 0;
  var INK = '#e4eaf3', MUTED = '#93a1b5';
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function shape(fn, a) {
    var o = Object.assign({ strokeWidth: 0, strokeColor: 'none', fillColor: 'none', fillOpacity: 1, fixed: true, highlight: false }, a || {});
    var closed = o.fillColor !== 'none', c = bd.create('curve', [[0], [0]], o);
    c.updateDataArray = function () { var p = typeof fn === 'function' ? fn() : fn; if (!p || !p.length) { this.dataX = [NaN]; this.dataY = [NaN]; return; } this.dataX = p.map(function (q) { return q[0]; }); this.dataY = p.map(function (q) { return q[1]; }); if (closed) { this.dataX.push(p[0][0]); this.dataY.push(p[0][1]); } };
    return c;
  }
  function text(x, y, s, a) { return bd.create('text', [x, y, s], Object.assign({ fontSize: 12, strokeColor: INK, fixed: true, highlight: false, display: 'internal', anchorX: 'middle', anchorY: 'middle' }, a || {})); }
  var blob = function (cx, cy, rx, ry, n) { var p = []; n = n || 28; for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; p.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } return p; };
  var rect = function (x0, y0, x1, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; };
  function inside(pts, x, y) { var c = false; for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) { var a = pts[i], b = pts[j]; if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function area(pts) { var s = 0; for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) s += (pts[j][0] + pts[i][0]) * (pts[j][1] - pts[i][1]); return Math.abs(s / 2); }

  // ---------- spheres ----------
  var SPHERES = ['Atmosphere', 'Biosphere', 'Hydrosphere', 'Geosphere'];
  var THINGS = [
    { id: 'cloud', name: 'a cloud', ok: ['Atmosphere', 'Hydrosphere'], why: 'A cloud is water (hydrosphere) held up in the air (atmosphere): a place where two spheres meet.', shapes: [blob(-3.2, 4.6, 1.3, 0.55), blob(-2.2, 4.9, 0.9, 0.5), blob(-4.1, 4.85, 0.8, 0.45)], col: '#ffffff' },
    { id: 'wind', name: 'the wind', ok: ['Atmosphere'], why: 'Moving air: the atmosphere, the layer of gases around Earth.', lines: [[[3, 4.2], [6.5, 4.2]], [[3.6, 3.6], [7.2, 3.6]], [[3.2, 3.0], [6.0, 3.0]]], hit: rect(2.8, 2.7, 7.4, 4.5), col: '#e8f1fb' },
    { id: 'tree', name: 'a gum tree', ok: ['Biosphere'], why: 'Living things are the biosphere. The tree also takes carbon dioxide from the atmosphere.', shapes: [rect(-0.25, 0.6, 0.25, 2.2), blob(0, 2.9, 1.1, 0.9)], col: '#3f8a3a' },
    { id: 'roo', name: 'a kangaroo', ok: ['Biosphere'], why: 'An animal: part of the biosphere.', shapes: [blob(-2.2, 1.25, 0.55, 0.45), blob(-1.75, 1.85, 0.25, 0.22), [[-2.7, 0.9], [-3.6, 0.65], [-2.6, 1.05]]], col: '#a0643c' },
    { id: 'river', name: 'the river', ok: ['Hydrosphere'], why: 'All of Earth’s water (rivers, oceans, ice, groundwater) is the hydrosphere.', shapes: [[[-6.0, 0.6], [-4.8, 0.6], [-3.4, -0.1], [-1.6, -0.2], [1.6, -0.1], [2.2, 0.6], [2.2, 0.0], [1.6, -0.6], [-1.6, -0.7], [-3.6, -0.6], [-5.2, 0.0]]], col: '#4a90d9' },
    { id: 'ocean', name: 'the ocean', ok: ['Hydrosphere'], why: 'Salt water: the biggest part of the hydrosphere.', shapes: [[[2.2, 0.6], [11, 0.6], [11, -1.6], [2.2, -1.6]]], col: '#2e6db8' },
    { id: 'fish', name: 'a fish', ok: ['Biosphere'], why: 'A living thing in the water: biosphere (living in the hydrosphere).', shapes: [blob(7.4, -0.75, 0.6, 0.28), [[6.8, -0.75], [6.3, -0.45], [6.3, -1.05]]], col: '#f2a53a' },
    { id: 'soil', name: 'the soil', ok: ['Geosphere', 'Biosphere'], why: 'Soil is broken rock (geosphere) mixed with living things and their remains (biosphere): another meeting place.', shapes: [[[-11, 0.6], [2.2, 0.6], [2.2, -1.6], [-11, -1.6]]], col: '#7a5636' },
    { id: 'coal', name: 'the coal seam', ok: ['Geosphere'], why: 'Coal is rock made from plants buried millions of years ago: carbon stored in the geosphere.', shapes: [[[-11, -3.3], [11, -3.0], [11, -3.6], [-11, -3.9]]], col: '#22201d' },
    { id: 'volcano', name: 'the volcano', ok: ['Geosphere'], why: 'Rock and magma: the geosphere. Its gases join the atmosphere when it erupts.', shapes: [[[-10.2, 0.6], [-8.2, 3.4], [-7.6, 3.4], [-5.6, 0.6]]], col: '#5b4a40' },
  ];
  function buildSpheres() {
    bd = B.jsx({ boundingbox: [-11, 6.4, 11, -6.4], keepAspectRatio: true });
    shape(rect(-60, 0.6, 60, 40), { fillColor: '#9cc9ec' });
    shape(rect(-60, -40, 60, 0.6), { fillColor: '#8b7660' });
    shape(rect(-60, -40, 60, -4.6), { fillColor: '#6b5a4c' });
    shape(blob(8.8, 5.3, 0.7, 0.7), { fillColor: '#ffd65a' });
    THINGS.slice().sort(function (a, b) { return area((b.shapes || [b.hit])[0]) - area((a.shapes || [a.hit])[0]); }).forEach(function (t) {
      (t.shapes || []).forEach(function (sh) { shape(sh, { fillColor: t.col, strokeColor: 'rgba(0,0,0,0.25)', strokeWidth: 1 }); });
      (t.lines || []).forEach(function (ln) { shape(ln, { strokeColor: t.col, strokeWidth: 3 }); });
    });
    shape(function () { var t = THINGS.filter(function (x) { return x.id === st.sel; })[0]; if (!t) return null; var s = (t.shapes || [t.hit]).slice().sort(function (a, b) { return area(b) - area(a); })[0]; var p = s.slice(); p.push(p[0]); return p; }, { strokeColor: '#ff3b30', strokeWidth: 3 });
    THINGS.forEach(function (t) {
      var s = (t.shapes || [t.hit]).slice().sort(function (a, b) { return area(b) - area(a); })[0], cx = 0, cy = 0;
      s.forEach(function (q) { cx += q[0]; cy += q[1]; }); cx /= s.length; cy /= s.length;
      if (t.id === 'soil') { cx = -7.5; cy = -0.9; } if (t.id === 'ocean') { cx = 9.4; cy = -1.25; } if (t.id === 'coal') { cx = 0; cy = -3.45; }
      text(cx, cy, function () { return st.found[t.id] ? '✓' : ''; }, { fontSize: 18, strokeColor: '#1a7f37', cssStyle: 'font-weight:800;text-shadow:0 0 3px #fff' });
    });
    text(0, -5.5, 'Click something in the picture', { fontSize: 13, strokeColor: '#efe6dc' });
    bd.on('down', function (e) {
      var c = bd.getUsrCoordsOfMouse(e), best = null, ba = 1e9;
      THINGS.forEach(function (t) { (t.shapes || [t.hit]).forEach(function (s) { if (inside(s, c[0], c[1])) { var a = area(s); if (a < ba) { ba = a; best = t; } } }); });
      if (!best) return;
      st.sel = best.id; st.msg = null; B.moved = true; bd.update(); paintSpheres(); report();
    });
    bd.update();
  }
  function paintSpheres() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var t = THINGS.filter(function (x) { return x.id === st.sel; })[0];
    var box = el('div', 'cinfo sphinfo');
    if (!t) box.textContent = 'Click a thing in the picture, then choose the sphere it belongs to.';
    else {
      box.appendChild(el('b', '', 'Which sphere is ' + t.name + ' part of?'));
      if (st.msg) box.appendChild(el('i', '', st.msg));
    }
    panel.appendChild(box);
    {
      var bar = el('div', 'fbar');
      SPHERES.forEach(function (s) {
        var b = el('button', '', s); b.type = 'button'; b.disabled = !t;
        b.addEventListener('click', function () {
          B.moved = true;
          if (t.ok.indexOf(s) >= 0) { st.found[t.id] = true; st.msg = 'Yes: ' + t.why; }
          else { st.wrong++; st.msg = 'Not ' + s.toLowerCase() + '. ' + hint(s); }
          bd.update(); paintSpheres(); report();
        });
        bar.appendChild(b);
      });
      panel.appendChild(bar);
    }
    panel.appendChild(el('p', 'cokind', 'Atmosphere: the air. Biosphere: all living things. Hydrosphere: all water. Geosphere: rock, soil, magma and the minerals in them.'));
  }
  function hint(s) { return { Atmosphere: 'The atmosphere is the layer of gases around Earth.', Biosphere: 'The biosphere is living things (and their remains).', Hydrosphere: 'The hydrosphere is water: liquid, ice and vapour.', Geosphere: 'The geosphere is solid Earth: rocks, minerals, soil and magma.' }[s]; }

  // ---------- cycle ----------
  var PPM = 2.13, A0 = 280 * PPM, B0 = 2150, O0 = 38000, F0 = 1000;
  var BOX = { atm: [0, 2.6, 'Atmosphere', 'air'], bio: [-7, -2.4, 'Biosphere', 'living things and soil'], hyd: [7, -2.4, 'Hydrosphere', 'oceans'], geo: [0, -2.4, 'Geosphere', 'fossil fuels'] };
  var BW = 2.4, BH = 0.95;
  // Where each arrow's label sits, and which way it reads from there.
  var LABEL = { photo: [-4.3, 1.35, 'right'], respdec: [-5.3, 0.15, 'right'], oin: [4.3, 1.35, 'left'], oout: [5.3, 0.15, 'left'], burn: [0.3, -0.5, 'left'] };
  function flows() {
    var A = st.A, f = {};
    // Plants take up a little more CO2 when there is more of it, and much less when it runs short.
    f.photo = st.on.photo ? (A >= A0 ? 120 + 0.008 * (A - A0) : 120 * A / A0) : 0;
    f.resp = st.on.resp ? 60 * st.B / B0 : 0;
    f.decomp = st.on.resp ? 60 * st.B / B0 : 0;
    f.oin = st.on.ocean ? Math.max(0, 80 + 0.0105 * (A - A0)) : 0;
    f.oout = st.on.ocean ? 80 * st.O / O0 : 0;
    f.burn = st.F > 0 ? st.c : 0;
    return f;
  }
  function step(dt) {
    var f = flows();
    st.A += (f.resp + f.decomp + f.oout + f.burn - f.photo - f.oin) * dt;
    st.B += (f.photo - f.resp - f.decomp) * dt; st.O += (f.oin - f.oout) * dt; st.F -= f.burn * dt;
    st.A = Math.max(0, st.A); st.B = Math.max(0, st.B); st.F = Math.max(0, st.F);
    st.years += dt; st.hist.push([st.years, st.A / PPM]);
  }
  // id, from, to, sideways offset (towards the canonical normal of the pair), label.
  var ARROWS = [
    ['photo', 'atm', 'bio', -0.35, 'Photosynthesis'],
    ['respdec', 'bio', 'atm', 0.35, 'Respiration and decay'],
    ['oin', 'atm', 'hyd', 0.35, 'Dissolves in oceans'],
    ['oout', 'hyd', 'atm', -0.35, 'Released by oceans'],
    ['burn', 'geo', 'atm', 0, 'Burning fossil fuels'],
  ];
  function flowOf(id) { var f = flows(); return id === 'respdec' ? f.resp + f.decomp : f[id]; }
  // The pair's normal is taken in a fixed order, so the two arrows between the same boxes sit side by side.
  function ends(a) {
    var from = BOX[a[1]], to = BOX[a[2]], k = [a[1], a[2]].sort(), p = BOX[k[0]], q = BOX[k[1]];
    var cx = q[0] - p[0], cy = q[1] - p[1], cl = Math.hypot(cx, cy), nx = -cy / cl, ny = cx / cl;
    var dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    var cut = function (sx, sy) { var tx = Math.abs(sx) > 1e-9 ? (BW + 0.15) / Math.abs(sx) : 1e9, ty = Math.abs(sy) > 1e-9 ? (BH + 0.15) / Math.abs(sy) : 1e9; return Math.min(tx, ty); };
    var k0 = cut(ux, uy), k1 = cut(ux, uy), o = a[3];
    return [[from[0] + ux * k0 + nx * o, from[1] + uy * k0 + ny * o], [to[0] - ux * k1 + nx * o, to[1] - uy * k1 + ny * o], [nx, ny]];
  }
  function buildCycle() {
    bd = B.jsx({ boundingbox: [-10.4, 4.8, 10.4, -4.5], keepAspectRatio: true });
    shape(rect(-60, -40, 60, 40), { fillColor: '#0e1522' });
    var store = { atm: function () { return Math.round(st.A / PPM) + ' ppm CO₂'; }, bio: function () { return Math.round(st.B) + ' GtC'; }, hyd: function () { return Math.round(st.O).toLocaleString('en-AU') + ' GtC'; }, geo: function () { return Math.round(st.F) + ' GtC'; } };
    var colr = { atm: '#6aa9e0', bio: '#4f9a3c', hyd: '#2e6db8', geo: '#6b5a4c' };
    Object.keys(BOX).forEach(function (k) {
      var b = BOX[k];
      shape(rect(b[0] - BW, b[1] - BH, b[0] + BW, b[1] + BH), { fillColor: colr[k], strokeColor: '#ffffff', strokeWidth: 1, fillOpacity: 0.85 });
      text(b[0], b[1] + 0.48, b[2], { fontSize: 13, cssStyle: 'font-weight:700' });
      text(b[0], b[1] + 0.0, b[3], { fontSize: 11 });
      text(b[0], b[1] - 0.48, store[k], { fontSize: 12, cssStyle: 'font-weight:600' });
    });
    ARROWS.forEach(function (a) {
      if (!spec.show[a[0]]) return;
      var on = function () { return flowOf(a[0]) > 0.01; };
      bd.create('arrow', [[function () { return ends(a)[0][0]; }, function () { return ends(a)[0][1]; }], [function () { return ends(a)[1][0]; }, function () { return ends(a)[1][1]; }]], {
        strokeColor: function () { return on() ? (a[0] === 'burn' ? '#ff8a4c' : '#e4eaf3') : 'rgba(147,161,181,0.3)'; },
        strokeWidth: function () { return on() ? 1.5 + Math.min(6, flowOf(a[0]) / 20) : 1.5; }, dash: function () { return on() ? 0 : 2; },
        fixed: true, highlight: false, lastArrow: { type: 2, size: 4 },
      });
      var L = LABEL[a[0]];
      text(L[0], L[1], function () { var f = flowOf(a[0]); return a[4] + (f > 0.01 ? ': ' + f.toFixed(0) : ' (off)'); },
        { fontSize: 11, strokeColor: function () { return on() ? (a[0] === 'burn' ? '#ffb38a' : INK) : MUTED; }, anchorX: L[2], cssStyle: 'text-shadow:0 0 3px #0e1522,0 0 3px #0e1522' });
      [0, 0.33, 0.66].forEach(function (ph) {
        shape(function () { if (!st.running || !on()) return null; var e = ends(a), t = (st.phase + ph) % 1; return blob(e[0][0] + (e[1][0] - e[0][0]) * t, e[0][1] + (e[1][1] - e[0][1]) * t, 0.12, 0.12, 10); }, { fillColor: a[0] === 'burn' ? '#ff8a4c' : '#ffffff' });
      });
    });
    text(0, -4.1, 'Flows in billions of tonnes of carbon (GtC) a year. Stores not to scale: the oceans hold far more.', { fontSize: 11, strokeColor: MUTED });
    text(0, 4.3, function () { return 'Year ' + Math.round(st.years) + ' · CO₂ in the air: ' + Math.round(st.A / PPM) + ' ppm'; }, { fontSize: 14, cssStyle: 'font-weight:700' });
    bd.update();
  }
  function paintCycle() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    [['photo', 'Photosynthesis'], ['resp', 'Respiration and decomposition'], ['ocean', 'Ocean exchange']].forEach(function (p) {
      
      var b = el('button', '', p[1] + (st.on[p[0]] ? ': on' : ': off')); b.type = 'button'; b.setAttribute('aria-pressed', String(!!st.on[p[0]]));
      b.addEventListener('click', function () { if (st.running) return; st.on[p[0]] = !st.on[p[0]]; B.moved = true; bd.update(); paintCycle(); report(); });
      bar.appendChild(b);
    });
    panel.appendChild(bar);
    if (spec.combustion === 'on') {
      var row = el('div', 'srow'), lab = el('label', 'fname', 'Burning'); lab.htmlFor = 'cbn';
      var r = el('input'); r.type = 'range'; r.id = 'cbn'; r.min = 0; r.max = 20; r.step = 1; r.value = st.c;
      var out = el('output'); out.textContent = st.c + ' GtC a year';
      r.addEventListener('input', function () { if (st.running) { r.value = st.c; return; } st.c = Number(r.value); out.textContent = st.c + ' GtC a year'; B.moved = true; bd.update(); report(); });
      row.append(lab, r, out); panel.appendChild(row);
    }
    var bar2 = el('div', 'fbar');
    [[10, 'Run 10 years'], [50, 'Run 50 years']].forEach(function (y) { var b = el('button', y[0] === 10 ? 'go' : '', y[1]); b.type = 'button'; b.addEventListener('click', function () { run(y[0]); }); bar2.appendChild(b); });
    var rs = el('button', 'quiet', 'Start again'); rs.type = 'button'; rs.addEventListener('click', function () { if (st.running) return; var keep = { u: st.u, v: st.v, s: st.s }; reset(); Object.assign(st, keep); B.moved = true; buildCycle(); paintCycle(); report(); }); bar2.appendChild(rs);
    panel.appendChild(bar2);
    var g = el('div', 'cgraph'); g.innerHTML = graphSVG(); panel.appendChild(g);
    st.info = el('p', 'cokind', st.note || 'Switch processes on or off, then run the years. In balance, as much carbon leaves the air each year as enters it.'); panel.appendChild(st.info);
  }
  function graphSVG() {
    var W = 560, H = 120, pad = 36, h = st.hist, x1 = Math.max(50, st.years), lo = 200, hi = 700;
    h.forEach(function (p) { lo = Math.min(lo, Math.floor(p[1] / 50) * 50); hi = Math.max(hi, Math.ceil(p[1] / 50) * 50); });
    var X = function (t) { return pad + (W - pad - 8) * t / x1; }, Y = function (v) { return H - 18 - (H - 28) * (v - lo) / (hi - lo); };
    var d = h.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' ');
    var ticks = [lo, (lo + hi) / 2, hi].map(function (v) { return '<text x="' + (pad - 4) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + Math.round(v) + '</text><line x1="' + pad + '" x2="' + (W - 8) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="cgrid"/>'; }).join('');
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Carbon dioxide in the air over the years"><g class="ctick">' + ticks + '<text x="' + pad + '" y="' + (H - 3) + '">0</text><text x="' + (W - 8) + '" y="' + (H - 3) + '" text-anchor="end">' + Math.round(x1) + ' years</text><text x="' + (pad + 6) + '" y="12">CO₂ in the air (ppm)</text></g><path d="' + d + '" class="cline"/></svg>';
  }
  function run(years) {
    if (st.running) return; st.running = true; B.moved = true; var a0 = st.A / PPM, done = 0, t0 = performance.now(), ms = years === 10 ? 2500 : 7000;
    cancelAnimationFrame(raf);
    (function tick(now) {
      var target = Math.min(years, years * (now - t0) / ms);
      while (done < target - 1e-9) { var dt = Math.min(0.1, target - done); step(dt); done += dt; }
      st.phase = (st.phase + 0.03) % 1; bd.update();
      if (done < years) { raf = requestAnimationFrame(tick); return; }
      st.running = false; var d = st.A / PPM - a0;
      var steady = Math.abs(d) < 0.25 * years;
      if (d <= -5) st.u = 1; else if (d >= 5) st.v = 1; else if (steady) st.s = 1;
      st.note = 'In ' + years + ' years CO₂ in the air ' + (steady ? 'stayed steady (' + Math.round(st.A / PPM) + ' ppm): carbon in = carbon out.' : (d > 0 ? 'rose' : 'fell') + ' by ' + Math.abs(Math.round(d)) + ' ppm: more carbon ' + (d > 0 ? 'entered the air than left it.' : 'left the air than entered it.'));
      bd.update(); paintCycle(); report();
    })(t0);
  }
  function reset() {
    var today = spec.start === 'today';
    st.A = (today ? 420 : 280) * PPM; st.B = B0; st.O = O0 + (today ? 170 : 0); st.F = F0; st.years = 0; st.hist = [[0, st.A / PPM]]; st.note = null;
    st.on = { photo: true, resp: true, ocean: true }; st.c = spec.combustion === 'on' && today ? 10 : 0;
  }

  // ---------- shared ----------
  function report() {
    var vars, msg, ok;
    if (spec.mode === 'spheres') {
      var n = Object.keys(st.found).length, k = THINGS.length;
      vars = { n: n, k: k, w: st.wrong }; msg = n + ' of ' + k + ' things placed in their sphere.'; ok = n === k;
      B.save({ st: { found: st.found, wrong: st.wrong } });
    } else {
      var off = (st.on.photo ? 0 : 1) + (st.on.resp ? 0 : 1) + (st.on.ocean ? 0 : 1);
      vars = { a: Math.round(st.A / PPM), y: Math.round(st.years), c: st.c, u: st.u, v: st.v, s: st.s, f: off, b: Math.round(st.B), o: st.on.photo ? 1 : 0, r: st.on.resp ? 1 : 0 };
      msg = 'Year ' + vars.y + ': ' + vars.a + ' ppm CO₂.'; ok = false;
    }
    B.say(msg, ok);
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  B.widget('carbon', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.mode === 'spheres' ? 'A landscape showing Earth’s four spheres' : 'Carbon stores and the flows between them'; },
    parse: function (s) {
      s.mode = s.mode || 'cycle';
      if (['spheres', 'cycle'].indexOf(s.mode) < 0) throw new Error('mode: spheres or cycle.');
      var all = ['photo', 'respdec', 'oin', 'oout', 'burn'];
      s.show = {}; all.forEach(function (k) { s.show[k] = k !== 'burn' || s.combustion === 'on'; });
    },
    start: function (fresh) {
      spec = B.spec; cancelAnimationFrame(raf);
      if (spec.mode === 'spheres') { var sv = fresh ? null : B.saved(), k = (sv && sv.st) || {}; st = Object.assign({ found: {}, wrong: 0, sel: null, msg: null }, k); buildSpheres(); paintSpheres(); report(); return; }
      st = { u: 0, v: 0, s: 0, phase: 0, running: false }; reset(); buildCycle(); paintCycle(); report();
    },
    redraw: function () { if (spec.mode === 'spheres') { buildSpheres(); paintSpheres(); } else { buildCycle(); paintCycle(); } },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
