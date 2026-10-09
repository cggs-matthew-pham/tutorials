// Earth's layers (AC9S8U03 node 1): a wedge cut out of the Earth, from the surface to the centre.
//   widget: layers
//   Click a layer to learn what it is made of and whether it is solid or liquid. Drag the depth probe (or use the
//   slider) to read the temperature and pressure at any depth. "Show it to scale" redraws the layers at their true
//   thicknesses (the crust becomes a hairline).
//   find: crust, lithosphere, asthenosphere, mantle, outer, inner   (which layers count; default all six)
// state: { scope: { vars: { n layers found, k to find, d probe depth (km), t temperature there (°C),
//   p pressure there (thousand atmospheres), m deepest probe depth (km), s 1 once the to-scale view has been seen } } }
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null;
  var R = 6371, TAU = Math.PI * 2;
  // Depths in km from the surface. Each layer: id, name, top, bottom, state, what it is, colour, drawn thickness
  // when not to scale (units of the wedge's radius, 11.4 in all).
  var L = [
    { id: 'crust', name: 'Crust', top: 0, bot: 35, state: 'solid', col: '#9c7a54', w: 0.75,
      what: 'Solid rock. Thin: about 35 km under continents and 7 km under oceans. All the rocks we can reach are here.' },
    { id: 'lithosphere', name: 'Rest of the lithosphere (rigid upper mantle)', top: 35, bot: 100, state: 'solid', col: '#b5654a', w: 0.7,
      what: 'Cool, rigid mantle rock welded to the crust. Crust plus this layer is the lithosphere: the rigid outer shell, broken into tectonic plates.' },
    { id: 'asthenosphere', name: 'Asthenosphere', top: 100, bot: 350, state: 'solid but soft', col: '#d4773a', w: 1.0,
      what: 'Hot mantle rock that is solid but soft enough to flow very slowly (a few centimetres a year), like very stiff putty. The plates slide over it.' },
    { id: 'mantle', name: 'Mantle', top: 350, bot: 2890, state: 'solid (flows very slowly)', col: '#e0913a', w: 3.4,
      what: 'The thickest layer: hot, dense rock. Solid, but over millions of years it slowly flows in convection currents.' },
    { id: 'outer', name: 'Outer core', top: 2890, bot: 5150, state: 'liquid', col: '#f2b33d', w: 2.8,
      what: 'Liquid iron and nickel. Its swirling makes Earth’s magnetic field.' },
    { id: 'inner', name: 'Inner core', top: 5150, bot: 6371, state: 'solid', col: '#ffe08a', w: 2.75,
      what: 'Solid iron and nickel, as hot as the surface of the sun, but kept solid by enormous pressure.' },
  ];
  // Temperature (°C) and pressure (thousand atmospheres) at depth (km): rough textbook values, joined linearly.
  var TEMP = [[0, 15], [35, 500], [100, 1300], [350, 1600], [660, 1900], [2890, 3700], [5150, 5000], [6371, 5400]];
  var PRES = [[0, 0.001], [35, 1], [100, 3], [350, 12], [660, 24], [2890, 1360], [5150, 3300], [6371, 3600]];
  function interp(tab, d) { for (var i = 1; i < tab.length; i++) if (d <= tab[i][0]) { var a = tab[i - 1], b = tab[i], f = (d - a[0]) / (b[0] - a[0]); return a[1] + f * (b[1] - a[1]); } return tab[tab.length - 1][1]; }
  var CX = 0, CY = -6.0, RW = 11.4, A0 = 52 * Math.PI / 180, A1 = 128 * Math.PI / 180;
  // Radius on the drawing (from the centre) for a depth, to scale or not.
  function rad(d) {
    if (st.scale) return RW * (R - d) / R;
    var r = RW;
    for (var i = 0; i < L.length; i++) { var l = L[i]; if (d >= l.bot) { r -= l.w; continue; } return r - l.w * (d - l.top) / (l.bot - l.top); }
    return 0;
  }
  function depthAt(r) {   // inverse of rad
    if (st.scale) return Math.max(0, Math.min(R, R * (1 - r / RW)));
    var top = RW;
    for (var i = 0; i < L.length; i++) { var l = L[i]; if (r >= top - l.w) return l.top + (top - r) / l.w * (l.bot - l.top); top -= l.w; }
    return R;
  }
  var layerAt = function (d) { for (var i = 0; i < L.length; i++) if (d < L[i].bot || i === L.length - 1) return L[i]; };
  function sector(r0, r1) {
    var p = [], i, n = 50;
    for (i = 0; i <= n; i++) { var a = A0 + (A1 - A0) * i / n; p.push([CX + r1 * Math.cos(a), CY + r1 * Math.sin(a)]); }
    for (i = n; i >= 0; i--) { var b = A0 + (A1 - A0) * i / n; p.push([CX + r0 * Math.cos(b), CY + r0 * Math.sin(b)]); }
    return p;
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function shape(fn, a) {
    var o = Object.assign({ strokeWidth: 0, strokeColor: 'none', fillColor: 'none', fillOpacity: 1, fixed: true, highlight: false }, a || {});
    var closed = o.fillColor !== 'none', c = bd.create('curve', [[0], [0]], o);
    c.updateDataArray = function () { var p = fn(); if (!p || !p.length) { this.dataX = [NaN]; this.dataY = [NaN]; return; } this.dataX = p.map(function (q) { return q[0]; }); this.dataY = p.map(function (q) { return q[1]; }); if (closed) { this.dataX.push(p[0][0]); this.dataY.push(p[0][1]); } };
    return c;
  }
  function text(x, y, s, a) { return bd.create('text', [x, y, s], Object.assign({ fontSize: 12, strokeColor: '#e4eaf3', fixed: true, highlight: false, display: 'internal', anchorX: 'left', anchorY: 'middle' }, a || {})); }

  function build() {
    bd = B.jsx({ boundingbox: [-11, 6.4, 11, -6.4], keepAspectRatio: true });
    shape(function () { return [[-60, -40], [60, -40], [60, 40], [-60, 40]]; }, { fillColor: '#0e1522' });
    L.forEach(function (l) {
      shape(function () { return sector(rad(l.bot), rad(l.top)); }, { fillColor: l.col, strokeColor: 'rgba(0,0,0,0.35)', strokeWidth: 1 });
    });
    shape(function () { var l = L.filter(function (x) { return x.id === st.sel; })[0]; if (!l) return null; var p = sector(rad(l.bot), rad(l.top)); p.push(p[0]); return p; }, { strokeColor: '#ffffff', strokeWidth: 2.5 });
    // The lithosphere bracket (crust + rigid upper mantle), on the left edge.
    shape(function () { var a = A1 + 0.03, r0 = rad(100), r1 = rad(0); return [[CX + r1 * Math.cos(a), CY + r1 * Math.sin(a)], [CX + r0 * Math.cos(a), CY + r0 * Math.sin(a)]]; }, { strokeColor: '#ffffff', strokeWidth: 3 });
    text(function () { return CX + rad(50) * Math.cos(A1 + 0.04) - 0.25; }, function () { return CY + rad(50) * Math.sin(A1 + 0.04); }, 'Lithosphere', { anchorX: 'right', fontSize: 12, cssStyle: 'font-weight:600' });
    // Labels on the right, with a leader line to the middle of each layer.
    L.forEach(function (l, i) {
      var ly = 5.2 - i * 1.15, mid = function () { return rad((l.top + l.bot) / 2); };
      shape(function () { var a = A0 + 0.06, r = mid(); return [[CX + r * Math.cos(a), CY + r * Math.sin(a)], [7.2, ly]]; }, { strokeColor: 'rgba(228,234,243,0.45)', strokeWidth: 1 });
      text(7.35, ly, function () { return (st.found[l.id] ? '✓ ' : '') + (l.id === 'lithosphere' ? 'Rigid upper mantle' : l.name); }, { fontSize: 12, strokeColor: st.found[l.id] ? '#8fdca0' : '#e4eaf3' });
    });
    // Depth probe on the centre line.
    shape(function () { return [[CX, CY + rad(0)], [CX, CY]]; }, { strokeColor: 'rgba(255,255,255,0.35)', strokeWidth: 1, dash: 2 });
    shape(function () { var y = CY + rad(st.d); return [[CX - 0.5, y], [CX + 0.5, y]]; }, { strokeColor: '#ffffff', strokeWidth: 3 });
    text(CX + 0.65, function () { return CY + rad(st.d); }, function () { return Math.round(st.d) + ' km · ' + Math.round(interp(TEMP, st.d)) + ' °C'; }, { fontSize: 12, cssStyle: 'font-weight:700' });
    text(CX, CY + RW + 0.4, function () { return st.scale ? 'To scale: the crust is too thin to see' : 'Not to scale: the outer layers are drawn much thicker'; }, { anchorX: 'middle', fontSize: 12, strokeColor: '#93a1b5' });
    text(CX, CY - 0.35, 'Centre (6371 km down)', { anchorX: 'middle', anchorY: 'top', fontSize: 11, strokeColor: '#93a1b5' });
    bd.on('down', function (e) {
      var c = bd.getUsrCoordsOfMouse(e), dx = c[0] - CX, dy = c[1] - CY, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
      if (r > RW + 0.1 || a < A0 - 0.02 || a > A1 + 0.02) return;
      var d = depthAt(r), l = layerAt(d);
      st.sel = l.id; st.found[l.id] = true; st.d = d; st.max = Math.max(st.max, d); B.moved = true;
      bd.update(); paint(); report();
    });
    bd.update();
  }
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = el('div', 'srow'), lab = el('label', 'fname', 'Depth'); lab.htmlFor = 'lyd';
    var r = el('input'); r.type = 'range'; r.id = 'lyd'; r.min = 0; r.max = R; r.step = 1; r.value = Math.round(st.d);
    var out = el('output'); out.textContent = Math.round(st.d) + ' km';
    r.addEventListener('input', function () { st.d = Number(r.value); st.max = Math.max(st.max, st.d); out.textContent = st.d + ' km'; B.moved = true; bd.update(); info(); report(); });
    row.append(lab, r, out); panel.appendChild(row);
    var bar = el('div', 'fbar'), sc = el('button', '', st.scale ? 'Show the outer layers bigger' : 'Show it to scale'); sc.type = 'button';
    sc.setAttribute('aria-pressed', String(st.scale));
    sc.addEventListener('click', function () { st.scale = !st.scale; if (st.scale) st.seenScale = true; B.moved = true; build(); paint(); report(); });
    bar.appendChild(sc); panel.appendChild(bar);
    st.info = el('div', 'cinfo'); panel.appendChild(st.info); info();
  }
  function info() {
    var l = layerAt(st.d), t = interp(TEMP, st.d), p = interp(PRES, st.d);
    var sel = st.sel ? L.filter(function (x) { return x.id === st.sel; })[0] : null;
    st.info.innerHTML = '<b></b><span></span><i></i>';
    st.info.children[0].textContent = (sel || l).name + ' (' + (sel || l).state + ').';
    st.info.children[1].textContent = ' ' + (sel || l).what;
    st.info.children[2].textContent = 'At ' + Math.round(st.d) + ' km: about ' + Math.round(t).toLocaleString('en-AU') + ' °C and ' + (p < 1 ? 'about 1 atmosphere' : Math.round(p).toLocaleString('en-AU') + ' thousand times the air pressure at the surface') + ' (' + l.name.toLowerCase().replace(/ \(.*\)$/, '') + ').';
  }
  function report() {
    var n = spec.find.filter(function (id) { return st.found[id]; }).length, k = spec.find.length;
    var vars = { n: n, k: k, d: Math.round(st.d), t: Math.round(interp(TEMP, st.d)), p: Math.round(interp(PRES, st.d)), m: Math.round(st.max), s: st.seenScale ? 1 : 0 };
    var msg = n + ' of ' + k + ' layers found. Deepest probe: ' + Math.round(st.max) + ' km.';
    B.say(n >= k ? 'You found every layer. ' + msg.replace(/^.*?found\. /, '') : msg, n >= k);
    B.save({ st: { found: st.found, d: st.d, max: st.max, scale: st.scale, seenScale: st.seenScale } });
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  B.widget('layers', {
    sections: ['board', 'gpanel'],
    label: function () { return "A wedge cut out of the Earth from the surface to the centre, showing its layers"; },
    parse: function (s) {
      var ids = L.map(function (l) { return l.id; });
      s.find = s.find ? s.find.split(',').map(function (t) { return t.trim(); }) : ids;
      s.find.forEach(function (t) { if (ids.indexOf(t) < 0) throw new Error('find: "' + t + '" is not one of ' + ids.join(', ') + '.'); });
    },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved(), k = (sv && sv.st) || {};
      st = Object.assign({ found: {}, d: 0, max: 0, scale: false, seenScale: false, sel: null }, k);
      build(); paint(); report();
    },
    redraw: function () { build(); paint(); },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
