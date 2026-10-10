// Earth, sun and moon (AC9S7U03): one geometric model of the three bodies, seen from above and from the side.
// Sizes and distances are not to scale (said on the board); angles, timings and the counts are real.
//   widget: sky
//   mode: earth | moon | eclipse | tides
//   earth    From above: the Earth going round the sun, its axis always leaning the same way. From the side (the sun
//            to the left): the tilt towards or away from the sun, day and night, and one place's latitude.
//            A date slider, Play a day, Play a year, and a place menu.
//              place: Canberra   (Darwin, Canberra, Hobart, Singapore, London, Tromsø, Davis station)
//              tilt: choose      (a tilt slider, 0° to 45°; default: fixed at 23.4°)
//   moon     From above: the moon going round the Earth (drag it, Next phase, Play a month). Beside it, what the moon
//            looks like from Earth.
//              view: south       (default, as seen from Australia: a waxing moon is lit on the left) or north
//              shadow: on        (a button showing Earth's shadow)
//              quiz: on          (the moon is placed for you; name the phase)   need: 5
//   eclipse  From above (the moon's orbit; solid where it is above the plane of Earth's orbit) and from the side
//            (tilt and sizes exaggerated, so the shadows are visible). "Next new or full moon" steps half a month.
//              tilt: choose      (a button that flattens the moon's orbit)
//   tides    The oceans pulled into two bulges by the moon, and two smaller ones by the sun; drag the moon or play
//            a day at the beach; a month of tides on one coast with today marked.
// state: { scope: { vars } }
//   earth    d day of the year (0 = 1 January), r days played, o years played, h hours of daylight at the place,
//            a noon sun height (°), k distance from the sun (million km), t tilt (°), m months looked at and
//            g longest minus shortest daylight seen (both at this place and tilt), p places looked at,
//            q hemispheres looked at (1 or 2)
//   moon     n phases visited (of 8), f percent lit, e days since new moon, c quiz right, w quiz wrong
//   eclipse  m new and full moons stepped, s solar eclipses, u lunar eclipses (partial or total), b penumbral lunar
//            eclipses, f 1 while the orbit is flat, l new and full moons stepped while it was flat
//   tides    d days since new moon, r tidal range today (m), s spring tides found (of 2), q neap tides found (of 2),
//            b beach days played
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null, raf = 0;
  var TAU = Math.PI * 2, RAD = Math.PI / 180;
  var MONTH = 29.53, ECLYEAR = 346.62, INCL = 5.145;
  var PLACES = { Darwin: -12.5, Canberra: -35.3, Hobart: -42.9, Singapore: 1.3, London: 51.5, 'Tromsø': 69.6, 'Davis station': -68.6 };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var PHASES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];
  var C = { space: '#0e1522', ink: '#e4eaf3', muted: '#93a1b5', sun: '#f6c344', ray: '#f6d77a', sea: '#3b7dd8', land: '#7d9a52', night: 'rgba(5,8,16,0.72)', moon: '#d9d4c7', dark: '#2a3140', day: '#ffd65a', nightLine: '#4a5878', umbra: 'rgba(0,0,0,0.75)', pen: 'rgba(40,48,66,0.55)', above: '#d9d4c7', below: '#6d7688', accent: '#ff9f5a', water: 'rgba(74,144,226,0.75)', rock: '#8a7458' };

  var mod = function (a, m) { return ((a % m) + m) % m; };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function arc(cx, cy, r, a0, a1, n) { var p = []; n = n || 48; for (var i = 0; i <= n; i++) { var a = a0 + (a1 - a0) * i / n; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }
  var disc = function (cx, cy, r) { return arc(cx, cy, r, 0, TAU, 60); };
  // Half a disc facing direction `ang` (the lit half when ang points at the sun).
  var half = function (cx, cy, r, ang) { return arc(cx, cy, r, ang - Math.PI / 2, ang + Math.PI / 2, 30); };

  // Drawing helpers on the current board: shapes recomputed every update from the state.
  function shape(fn, a) {
    var o = Object.assign({ strokeWidth: 0, strokeColor: 'none', fillColor: 'none', fillOpacity: 1, fixed: true, highlight: false }, a || {});
    var closed = o.fillColor !== 'none'; var c = bd.create('curve', [[0], [0]], o);
    c.updateDataArray = function () {
      var p = fn(); if (!p || !p.length) { this.dataX = [NaN]; this.dataY = [NaN]; return; }
      this.dataX = p.map(function (q) { return q[0]; }); this.dataY = p.map(function (q) { return q[1]; });
      if (closed) { this.dataX.push(p[0][0]); this.dataY.push(p[0][1]); }
    };
    return c;
  }
  function line(fn, color, w, dash) { return shape(fn, { strokeColor: color, strokeWidth: w || 2, dash: dash || 0 }); }
  function text(x, y, s, a) { return bd.create('text', [x, y, s], Object.assign({ fontSize: 13, strokeColor: C.ink, fixed: true, highlight: false, display: 'internal', anchorX: 'middle', anchorY: 'middle' }, a || {})); }
  function arrow(x1, y1, x2, y2, color) { return bd.create('arrow', [[x1, y1], [x2, y2]], { strokeColor: color || C.ray, strokeWidth: 2, fixed: true, highlight: false, lastArrow: { type: 2, size: 5 } }); }
  // On a narrow screen the two views don't fit side by side: show one at a time, with a button to swap.
  var HALVES = { earth: [[-11, 0.2], [0.2, 11]], moon: [[-11, 0], [0.4, 11.6]], eclipse: [[-11, -3.6], [-4.1, 11]], tides: [[-11, 0], [0.2, 11]] };
  var PANES = { earth: ['the view from above', 'the side view'], moon: ['the view from above', 'what you see from Earth'], eclipse: ['the view from above', 'the side view'], tides: ['the view from above', 'the month of tides'] };
  var narrow = function () { return B.el('board').clientWidth < 600; };
  function paneButton(bar) {
    if (!narrow()) return;
    var b = el('button', 'quiet', 'Show ' + PANES[spec.mode][st.pane ? 0 : 1]); b.type = 'button';
    b.addEventListener('click', function () { if (st.playing) return; st.pane = st.pane ? 0 : 1; build(); paint(); });
    bar.appendChild(b);
  }
  function newBoard() {
    cancelAnimationFrame(raf); st.playing = null; st.wasNarrow = narrow();
    var h = st.wasNarrow ? HALVES[spec.mode][st.pane || 0] : [-11, 11];
    bd = B.jsx({ boundingbox: [h[0], 6.2, h[1], -6.2], keepAspectRatio: true });
    shape(function () { return [[-60, -40], [60, -40], [60, 40], [-60, 40]]; }, { fillColor: C.space });
    return bd;
  }
  function animate(ms, step, done) {
    cancelAnimationFrame(raf); var t0 = performance.now();
    (function tick(now) { var f = Math.min(1, (now - t0) / ms); step(f); bd.update(); if (f < 1) raf = requestAnimationFrame(tick); else { st.playing = null; if (done) done(); paint(); report(); } })(t0);
  }
  // A draggable handle that stays on a circle; onMove(angle) is called while dragging.
  function handle(cx, cy, r, getAng, onMove) {
    var p = bd.create('point', [cx + r * Math.cos(getAng()), cy + r * Math.sin(getAng())], { name: '', withLabel: false, size: 11, fillColor: '#ffffff', fillOpacity: 0.01, strokeColor: C.accent, strokeWidth: 2, dash: 2, showInfobox: false, highlight: false });
    p.on('drag', function () { if (st.playing || st.lock) return; var a = Math.atan2(p.Y() - cy, p.X() - cx); onMove(a); B.moved = true; place(); });
    p.on('up', function () { paint(); report(); });
    function place() { var a = getAng(); p.setPositionDirectly(JXG.COORDS_BY_USER, [cx + r * Math.cos(a), cy + r * Math.sin(a)]); bd.update(); }
    p.place = place; return p;
  }
  function sunRays(x1, x2, ys) { ys.forEach(function (y) { arrow(x1, y, x2, y); }); }

  // ---------- earth ----------
  var dateOf = function (d) { var m = 0; d = Math.floor(mod(d, 365)); while (d >= MDAYS[m]) { d -= MDAYS[m]; m++; } return { day: d + 1, month: m }; };
  var dateText = function (d) { var t = dateOf(d); return t.day + ' ' + MONTHS[t.month]; };
  var decl = function (d) { return -st.tilt * Math.cos(TAU * (mod(d, 365) + 10) / 365); };
  var orbitAng = function (d) { return TAU * (mod(d, 365) + 10) / 365; };     // 0 at the December solstice
  var distance = function (d) { return 149.6 * (1 - 0.0167 * Math.cos(TAU * (mod(d, 365) - 3) / 365)); };
  function daylight(lat, dec) {
    var x = -Math.tan(lat * RAD) * Math.tan(dec * RAD);
    if (x >= 1) return 0; if (x <= -1) return 24; return 24 * Math.acos(x) / Math.PI;
  }
  var noonHeight = function (lat, dec) { return 90 - Math.abs(lat - dec); };
  function season(lat, d) {
    if (Math.abs(lat) < 15) return 'tropics: warm all year (wet and dry seasons)';
    var m = dateOf(d).month, s = ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer'][m];
    if (lat > 0) s = { summer: 'winter', winter: 'summer', autumn: 'spring', spring: 'autumn' }[s];
    return s + ' (' + (lat > 0 ? 'northern' : 'southern') + ' hemisphere)';
  }
  function earthNow() { var lat = PLACES[st.place], dec = decl(st.d); return { lat: lat, dec: dec, h: daylight(lat, dec), a: noonHeight(lat, dec), k: distance(st.d) }; }
  function trackEarth() {
    var n = earthNow(), key = st.place + '|' + st.tilt;
    if (st.trackKey !== key) { st.trackKey = key; st.months = {}; st.hmin = n.h; st.hmax = n.h; }
    st.months[dateOf(st.d).month] = 1; st.hmin = Math.min(st.hmin, n.h); st.hmax = Math.max(st.hmax, n.h);
    st.placesSeen[st.place] = 1; st.hemis[PLACES[st.place] >= 0 ? 'N' : 'S'] = 1;
  }

  function buildEarth() {
    newBoard();
    var SX = -5.6, SY = 0, OR = 4, ER = 0.42;
    var ex = function () { return SX + OR * Math.cos(orbitAng(st.d)); }, ey = function () { return SY + OR * Math.sin(orbitAng(st.d)); };
    text(-5.6, 5.5, 'From above (not to scale)', { fontSize: 14, cssStyle: 'font-weight:600' });
    line(function () { return disc(SX, SY, OR); }, '#3a4660', 1.5, 2);
    shape(function () { return disc(SX, SY, 0.85); }, { fillColor: C.sun });
    text(SX, SY - 1.25, 'Sun', { fontSize: 12, strokeColor: C.muted });
    [[0, 'Jan'], [90, 'Apr'], [181, 'Jul'], [273, 'Oct']].forEach(function (m) { var a = orbitAng(m[0]); text(SX + 4.75 * Math.cos(a), SY + 4.75 * Math.sin(a), m[1], { fontSize: 11, strokeColor: C.muted }); });
    shape(function () { return disc(ex(), ey(), ER); }, { fillColor: C.sea });
    shape(function () { var a = orbitAng(st.d); return half(ex(), ey(), ER, a); }, { fillColor: C.night });
    // The axis leans the same way all year (towards the right of this view): north pole marked N.
    line(function () { return [[ex(), ey()], [ex() + 0.8, ey()]]; }, '#ffffff', 2);
    text(function () { return ex() + 1.0; }, function () { return ey(); }, 'N', { fontSize: 11 });
    // A person on the equator, turning with the Earth (anticlockwise from above); facing the sun at noon.
    var obs = function () { var a = orbitAng(st.d) + Math.PI + TAU * (st.hour - 12) / 24; return [ex() + (ER + 0.12) * Math.cos(a), ey() + (ER + 0.12) * Math.sin(a)]; };
    shape(function () { if (st.playing === 'year') return null; var o = obs(); return disc(o[0], o[1], 0.13); }, { fillColor: C.accent });
    text(-5.6, -5.5, function () { return st.playing === 'year' ? 'Day ' + Math.round(st.yearDays) + ' of 365: the Earth has spun ' + Math.round(st.yearDays) + ' times' : 'Orange dot: a person on the equator'; }, { fontSize: 12, strokeColor: C.muted });

    // Side view: the sun to the left; the axis leans towards the sun by the declination.
    var CX = 5.9, CY = -0.1, R = 3.2;
    text(5.9, 5.5, 'From the side (the sun is to the left)', { fontSize: 14, cssStyle: 'font-weight:600' });
    sunRays(0.6, CX - R - 0.25, [2.2, 1.1, 0, -1.1, -2.2]);
    text(1.5, 3.1, 'Sunlight', { fontSize: 12, strokeColor: C.ray });
    var ax = function () { var d = decl(st.d) * RAD; return [-Math.sin(d), Math.cos(d)]; }, eq = function () { var d = decl(st.d) * RAD; return [Math.cos(d), Math.sin(d)]; };
    shape(function () { return disc(CX, CY, R); }, { fillColor: C.sea });
    shape(function () { return arc(CX, CY, R, -Math.PI / 2, Math.PI / 2, 40); }, { fillColor: C.night });
    var chord = function (lat) { var a = ax(), e = eq(), s = Math.sin(lat * RAD) * R, c = Math.cos(lat * RAD) * R; return [[CX + s * a[0] - c * e[0], CY + s * a[1] - c * e[1]], [CX + s * a[0] + c * e[0], CY + s * a[1] + c * e[1]]]; };
    line(function () { return chord(0); }, 'rgba(255,255,255,0.45)', 1.5, 2);
    text(function () { return chord(0)[1][0] + 0.2; }, function () { return chord(0)[1][1]; }, 'Equator', { fontSize: 11, strokeColor: C.muted, anchorX: 'left' });
    line(function () { var a = ax(); return [[CX - (R + 0.7) * a[0], CY - (R + 0.7) * a[1]], [CX + (R + 0.7) * a[0], CY + (R + 0.7) * a[1]]]; }, '#ffffff', 2.5);
    text(function () { return CX + (R + 1.0) * ax()[0]; }, function () { return CY + (R + 1.0) * ax()[1]; }, 'N', { fontSize: 13 });
    text(function () { return CX - (R + 1.0) * ax()[0]; }, function () { return CY - (R + 1.0) * ax()[1]; }, 'S', { fontSize: 13 });
    // The place's latitude: the day part (sun side) in yellow, the night part dim.
    var split = function () { var c = chord(PLACES[st.place]), a = c[0], b = c[1]; if (Math.abs(b[0] - a[0]) < 1e-9) return [a, a, b]; var f = Math.max(0, Math.min(1, (CX - a[0]) / (b[0] - a[0]))); return [a, [a[0] + f * (b[0] - a[0]), a[1] + f * (b[1] - a[1])], b]; };
    line(function () { var s = split(); return [s[0], s[1]]; }, C.day, 4);
    line(function () { var s = split(); return [s[1], s[2]]; }, C.nightLine, 4);
    shape(function () { var c = chord(PLACES[st.place]), s = -Math.cos(TAU * (st.hour - 12) / 24), m = [(c[0][0] + c[1][0]) / 2, (c[0][1] + c[1][1]) / 2], h = [(c[1][0] - c[0][0]) / 2, (c[1][1] - c[0][1]) / 2]; return st.playing === 'year' ? null : disc(m[0] + s * h[0], m[1] + s * h[1], 0.18); }, { fillColor: C.accent });
    text(function () { return split()[2][0] + 0.25; }, function () { return split()[2][1]; }, function () { return st.place; }, { fontSize: 12, anchorX: 'left', strokeColor: C.day });
    text(5.9, -5.5, function () { var d = decl(st.d); return Math.abs(d) < 1 ? 'Neither pole leans towards the sun' : (d > 0 ? 'North' : 'South') + ' pole leans towards the sun'; }, { fontSize: 12, strokeColor: C.muted });
    bd.update();
  }
  function playDay() {
    if (st.playing) return; st.playing = 'day'; B.moved = true; var h0 = st.hour;
    animate(4000, function (f) { st.hour = mod(h0 + 24 * f, 24); live(); }, function () { st.d = mod(st.d + 1, 365); st.days++; trackEarth(); });
  }
  function playYear() {
    if (st.playing) return; st.playing = 'year'; B.moved = true; var d0 = st.d;
    animate(10000, function (f) { st.yearDays = 365 * f; st.d = mod(Math.round(d0 + 365 * f), 365); trackEarth(); live(); }, function () { st.d = d0; st.years++; trackEarth(); });
  }
  function paintEarth() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = el('div', 'srow'), lab = el('label', 'fname', 'Date'); lab.htmlFor = 'skyd';
    var r = el('input'); r.type = 'range'; r.id = 'skyd'; r.min = 0; r.max = 364; r.step = 1; r.value = st.d;
    var out = el('output'); out.textContent = dateText(st.d);
    r.addEventListener('input', function () { if (st.playing) return; st.d = Number(r.value); out.textContent = dateText(st.d); B.moved = true; trackEarth(); bd.update(); live(); report(); });
    row.append(lab, r, out); panel.appendChild(row);
    if (spec.tilt === 'choose') {
      var tr = el('div', 'srow'), tl = el('label', 'fname', 'Tilt'); tl.htmlFor = 'skyt';
      var ti = el('input'); ti.type = 'range'; ti.id = 'skyt'; ti.min = 0; ti.max = 45; ti.step = 0.1; ti.value = st.tilt;
      var to = el('output'); to.textContent = st.tilt + '°';
      ti.addEventListener('input', function () { if (st.playing) return; st.tilt = Number(ti.value); to.textContent = st.tilt + '°'; B.moved = true; trackEarth(); bd.update(); live(); report(); });
      tr.append(tl, ti, to); panel.appendChild(tr);
    }
    var bar = el('div', 'fbar');
    var pd = el('button', 'go', 'Play a day'); pd.type = 'button'; pd.addEventListener('click', playDay);
    var py = el('button', '', 'Play a year'); py.type = 'button'; py.addEventListener('click', playYear);
    var sel = el('select'); sel.setAttribute('aria-label', 'Place'); Object.keys(PLACES).forEach(function (p) { var o = el('option', '', p); o.value = p; if (p === st.place) o.selected = true; sel.appendChild(o); });
    sel.addEventListener('change', function () { st.place = sel.value; B.moved = true; trackEarth(); bd.update(); live(); report(); });
    var pl = el('label', 'skyplace', 'Place '); pl.appendChild(sel);
    bar.append(pd, py, pl); paneButton(bar); panel.appendChild(bar);
    st.live = el('div', 'cinfo skyinfo'); panel.appendChild(st.live); live();
  }
  function live() {
    if (!st.live) return;
    if (spec.mode === 'earth') {
      var n = earthNow(), hh = Math.floor(n.h), mm = Math.round((n.h - hh) * 60);
      if (mm === 60) { hh++; mm = 0; }
      var dl = n.h <= 0 ? 'no daylight at all (polar night)' : n.h >= 24 ? 'daylight all 24 hours (midnight sun)' : hh + ' h ' + mm + ' min of daylight';
      var sun = n.a <= 0 ? 'the sun stays below the horizon' : 'noon sun ' + Math.round(n.a) + '° above the horizon';
      var r = B.el('skyd'); if (r && st.playing) { r.value = st.d; r.nextSibling.textContent = dateText(st.d); }
      st.live.innerHTML = '<b></b><span></span><i></i>';
      st.live.children[0].textContent = dateText(st.d) + ' in ' + st.place + ':';
      st.live.children[1].textContent = ' ' + season(n.lat, st.d) + '; ' + dl + '; ' + sun + '.';
      st.live.children[2].textContent = 'Earth is ' + n.k.toFixed(1) + ' million km from the sun' + (n.k < 147.6 ? ' (close to its nearest, in early January)' : n.k > 151.6 ? ' (close to its farthest, in early July)' : '') + '. ' + (st.playing === 'day' ? (Math.abs(((st.hour + 24) % 24) - 12) < n.h / 2 ? 'Daytime in ' + st.place + '.' : 'Night-time in ' + st.place + '.') : '');
    } else if (spec.mode === 'moon') liveMoon();
    else if (spec.mode === 'eclipse') liveEclipse();
    else liveTides();
  }

  // ---------- moon ----------
  var elong = function () { return mod(st.psi - Math.PI, TAU); };            // 0 new, π/2 first quarter, π full
  var phaseIndex = function (e) { return Math.round(e / (Math.PI / 4)) % 8; };
  function phaseShape(cx, cy, r, e) {
    var waxing = e < Math.PI, L = (spec.view === 'north' ? 1 : -1) * (waxing ? 1 : -1), k = (1 - Math.cos(e)) / 2;
    if (k < 0.005) return null;
    var w = r * Math.abs(Math.cos(e)), T = k < 0.5 ? L : -L, p = [], i, th;
    for (i = 0; i <= 40; i++) { th = Math.PI * i / 40; p.push([cx + L * r * Math.sin(th), cy + r * Math.cos(th)]); }
    for (i = 40; i >= 0; i--) { th = Math.PI * i / 40; p.push([cx + T * w * Math.sin(th), cy + r * Math.cos(th)]); }
    return p;
  }
  function markPhase() { var e = elong(), j = Math.round(e / (Math.PI / 4)); if (Math.abs(e - j * Math.PI / 4) < 8 * RAD) st.seen[j % 8] = 1; }
  function buildMoon() {
    newBoard();
    var EX = -5.2, EY = 0, OR = 3.7;
    var mx = function () { return EX + OR * Math.cos(st.psi); }, my = function () { return EY + OR * Math.sin(st.psi); };
    text(-5.2, 5.5, 'From above (not to scale)', { fontSize: 14, cssStyle: 'font-weight:600' });
    sunRays(-10.9, -9.7, [3, 1.5, 0, -1.5, -3]); text(-10.3, 4.1, 'Sunlight', { fontSize: 12, strokeColor: C.ray });
    shape(function () { return st.shadow ? [[EX, EY + 0.75], [EX + 6, EY + 0.25], [EX + 6, EY - 0.25], [EX, EY - 0.75]] : null; }, { fillColor: 'rgba(0,0,0,0.6)' });
    text(EX + 4.6, EY - 0.75, function () { return st.shadow ? 'Earth’s shadow' : ''; }, { fontSize: 11, strokeColor: C.muted });
    line(function () { return disc(EX, EY, OR); }, '#3a4660', 1.5, 2);
    for (var j = 0; j < 8; j++) { var a = Math.PI + j * Math.PI / 4; line((function (a) { return function () { return [[EX + (OR - 0.18) * Math.cos(a), EY + (OR - 0.18) * Math.sin(a)], [EX + (OR + 0.18) * Math.cos(a), EY + (OR + 0.18) * Math.sin(a)]]; }; })(a), '#56647e', 2); }
    shape(function () { return disc(EX, EY, 0.75); }, { fillColor: C.sea });
    shape(function () { return half(EX, EY, 0.75, 0); }, { fillColor: C.night });
    text(EX, EY - 1.15, 'Earth', { fontSize: 12, strokeColor: C.muted });
    shape(function () { return disc(mx(), my(), 0.36); }, { fillColor: C.moon });
    shape(function () { return half(mx(), my(), 0.36, 0); }, { fillColor: C.night });
    st.h = handle(EX, EY, OR, function () { return st.psi; }, function (a) { st.psi = a; markPhase(); live(); });
    // What it looks like from Earth.
    var IX = 6.1, IY = 0.3, IR = 2.6;
    text(IX, 5.5, 'What you see from Earth', { fontSize: 14, cssStyle: 'font-weight:600' });
    text(IX, 4.6, spec.view === 'north' ? '(northern hemisphere)' : '(southern hemisphere, as in Australia)', { fontSize: 12, strokeColor: C.muted });
    shape(function () { return disc(IX, IY, IR); }, { fillColor: C.dark });
    shape(function () { return st.hidden ? null : phaseShape(IX, IY, IR, elong()); }, { fillColor: C.moon });
    text(IX, IY, function () { return st.hidden ? '?' : ''; }, { fontSize: 60, strokeColor: C.muted });
    text(IX, -3.7, function () { return st.hidden ? 'Which phase is this?' : PHASES[phaseIndex(elong())]; }, { fontSize: 17, cssStyle: 'font-weight:700' });
    text(IX, -4.6, function () { if (st.hidden) return ''; var e = elong(); return Math.round(100 * (1 - Math.cos(e)) / 2) + '% lit · ' + (e / TAU * MONTH).toFixed(1) + ' days after new moon'; }, { fontSize: 13, strokeColor: C.muted });
    bd.update();
  }
  function moveMoonTo(target, ms) {
    if (st.playing) return; st.playing = 'move'; B.moved = true; var a0 = st.psi, d = mod(target - a0, TAU);
    animate(ms || 900, function (f) { st.psi = a0 + d * f; markPhase(); st.h.place(); live(); });
  }
  function paintMoon() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    if (spec.quiz === 'on') {
      PHASES.forEach(function (p, i) {
        var b = el('button', '', p); b.type = 'button'; b.disabled = !st.hidden;
        b.addEventListener('click', function () {
          if (!st.hidden) return; B.moved = true; st.hidden = false; var ok = i === st.qAns;
          if (ok) st.right++; else st.wrong++;
          st.qMsg = ok ? 'Right: ' + PHASES[st.qAns] + '.' : 'Not quite: it is a ' + PHASES[st.qAns].toLowerCase() + '. ' + hint(st.qAns);
          bd.update(); paint(); report();
        });
        bar.appendChild(b);
      });
      var nx = el('button', 'go', 'Next moon'); nx.type = 'button'; nx.disabled = st.hidden; nx.addEventListener('click', quizNext); bar.appendChild(nx); paneButton(bar);
      panel.appendChild(bar);
      st.live = el('div', 'cinfo skyinfo'); st.live.textContent = st.hidden ? 'Look where the moon is in its orbit and which side faces the sun, then name the phase.' : st.qMsg; panel.appendChild(st.live);
      return;
    }
    var np = el('button', 'go', 'Next phase'); np.type = 'button';
    np.addEventListener('click', function () { var e = elong(), j = Math.floor(e / (Math.PI / 4) + 1e-6) + 1; moveMoonTo(Math.PI + j * Math.PI / 4); });
    var pm = el('button', '', 'Play a month'); pm.type = 'button';
    pm.addEventListener('click', function () { if (st.playing) return; st.playing = 'month'; B.moved = true; var a0 = st.psi; animate(8000, function (f) { st.psi = a0 + TAU * f; markPhase(); st.h.place(); live(); }); });
    bar.append(np, pm);
    if (spec.shadow === 'on') { var sh = el('button', '', st.shadow ? 'Hide Earth’s shadow' : 'Show Earth’s shadow'); sh.type = 'button'; sh.setAttribute('aria-pressed', String(!!st.shadow)); sh.addEventListener('click', function () { st.shadow = !st.shadow; B.moved = true; bd.update(); paint(); report(); }); bar.appendChild(sh); }
    paneButton(bar); panel.appendChild(bar);
    st.live = el('div', 'cinfo skyinfo'); panel.appendChild(st.live); live();
  }
  function hint(j) { return ['The moon is between the Earth and the sun: its lit side faces away from us.', 'Just after new moon: a thin sliver of the lit side shows.', 'A quarter of the way round: we see half of the lit half.', 'More than half lit, still growing.', 'The moon is on the far side of the Earth from the sun: we see the whole lit half.', 'Past full, shrinking.', 'Three quarters of the way round: half lit again, the other side.', 'Nearly back to new: a thin sliver on the other side.'][j]; }
  function quizNext() { var j; do { j = Math.floor(Math.random() * 8); } while (j === st.qAns); st.qAns = j; st.psi = Math.PI + j * Math.PI / 4; st.hidden = true; st.lock = true; st.h.place(); bd.update(); paint(); report(); }
  function liveMoon() {
    if (!st.live || spec.quiz === 'on') return;
    var e = elong(), j = phaseIndex(e), n = Object.keys(st.seen).length;
    st.live.innerHTML = '<b></b><span></span><i></i>';
    st.live.children[0].textContent = PHASES[j] + '.';
    st.live.children[1].textContent = ' The sun always lights the half of the moon facing it. From Earth we see ' + (j === 0 ? 'none of that lit half.' : j === 4 ? 'all of the lit half.' : 'part of the lit half and part of the dark half.');
    st.live.children[2].textContent = 'Phases visited: ' + n + ' of 8. Drag the moon, or use Next phase.' + (st.shadow && Math.abs(e - Math.PI) < 0.6 ? ' From above the moon looks as if it is in Earth’s shadow, but its orbit is tilted: most months it passes just above or below the shadow.' : '');
  }

  // ---------- eclipse ----------
  var ePsi = function () { return Math.PI + TAU * st.t / MONTH; };
  var eNode = function () { return st.node0 - TAU * st.t / ECLYEAR; };
  var eBeta = function () { return (st.flat ? 0 : INCL) * Math.sin(ePsi() - eNode()); };   // the moon's height above Earth's orbit plane, in degrees
  function judge(full, beta) {
    var b = Math.abs(beta);
    if (!full) return b < 0.9 ? ['solar', 'Total solar eclipse: the moon’s dark shadow falls on Earth (seen along a narrow path).'] : b < 1.5 ? ['solar', 'Partial solar eclipse: only the moon’s outer shadow touches Earth.'] : [null, 'No eclipse: the moon’s shadow passes ' + (beta > 0 ? 'above' : 'below') + ' the Earth.'];
    return b < 0.44 ? ['lunar', 'Total lunar eclipse: the whole moon is in Earth’s dark shadow (it looks red).'] : b < 0.96 ? ['lunar', 'Partial lunar eclipse: part of the moon is in Earth’s dark shadow.'] : b < 1.53 ? ['pen', 'Penumbral lunar eclipse: the moon only dims a little in Earth’s outer shadow.'] : [null, 'No eclipse: the moon passes ' + (beta > 0 ? 'above' : 'below') + ' Earth’s shadow.'];
  }
  function buildEclipse() {
    newBoard();
    var EX = -7.3, EY = 0.3, OR = 2.6, S = 0.9;
    text(-7.3, 5.5, 'From above', { fontSize: 14, cssStyle: 'font-weight:600' });
    text(-10.4, 4.3, '← Sun', { fontSize: 12, strokeColor: C.ray, anchorX: 'left' });
    line(function () { var p = [], i, a, n = eNode(); for (i = 0; i <= 90; i++) { a = n + Math.PI * i / 90; p.push([EX + OR * Math.cos(a), EY + OR * Math.sin(a)]); } return p; }, C.above, 2.5);
    line(function () { var p = [], i, a, n = eNode(); for (i = 0; i <= 90; i++) { a = n + Math.PI + Math.PI * i / 90; p.push([EX + OR * Math.cos(a), EY + OR * Math.sin(a)]); } return p; }, C.below, 1.5, 2);
    line(function () { var n = eNode(), r = OR + 0.6; return [[EX - r * Math.cos(n), EY - r * Math.sin(n)], [EX + r * Math.cos(n), EY + r * Math.sin(n)]]; }, C.accent, 1.5, 3);
    shape(function () { return disc(EX, EY, 0.45); }, { fillColor: C.sea });
    shape(function () { return half(EX, EY, 0.45, 0); }, { fillColor: C.night });
    shape(function () { var a = ePsi(); return disc(EX + OR * Math.cos(a), EY + OR * Math.sin(a), 0.24); }, { fillColor: C.moon });
    text(-7.3, -3.2, 'Bright arc: moon above the plane', { fontSize: 11, strokeColor: C.muted });
    text(-7.3, -3.85, 'of Earth’s orbit; dim arc: below.', { fontSize: 11, strokeColor: C.muted });
    text(-7.3, -4.5, 'Orange: where it crosses.', { fontSize: 11, strokeColor: C.accent });
    // From the side.
    var X = 3.6, D = 5.2;
    text(4.0, 5.5, 'From the side (tilt and sizes exaggerated)', { fontSize: 14, cssStyle: 'font-weight:600' });
    sunRays(-3.7, -2.7, [3.2, 1.6, -1.6, -3.2]); text(-3.2, 4.3, 'Sunlight', { fontSize: 12, strokeColor: C.ray });
    line(function () { return [[-3.9, 0], [10.9, 0]]; }, '#3a4660', 1, 2);
    text(-3.8, -0.35, 'plane of Earth’s orbit', { fontSize: 11, strokeColor: C.muted, anchorX: 'left' });
    shape(function () { return [[X, 0.9], [11, 1.26], [11, -1.26], [X, -0.9]]; }, { fillColor: C.pen });
    shape(function () { return [[X, 0.9], [11, 0.5], [11, -0.5], [X, -0.9]]; }, { fillColor: C.umbra });
    shape(function () { return disc(X, 0, 0.9); }, { fillColor: C.sea });
    shape(function () { return half(X, 0, 0.9, 0); }, { fillColor: C.night });
    var smx = function () { return X + D * Math.cos(ePsi()); }, smy = function () { return eBeta() * S; };
    shape(function () { if (Math.cos(ePsi()) > -0.7) return null; var x = smx(), y = smy(); return [[x, y + 0.23], [X, y + 0.45], [X, y - 0.45], [x, y - 0.23]]; }, { fillColor: C.pen });
    shape(function () { if (Math.cos(ePsi()) > -0.7) return null; var x = smx(), y = smy(); return [[x, y + 0.23], [X, y], [x, y - 0.23]]; }, { fillColor: C.umbra });
    shape(function () { return disc(smx(), smy(), 0.23); }, { fillColor: C.moon });
    shape(function () { var full = Math.cos(ePsi()) > 0.95, b = Math.abs(eBeta()); if (!full || b > 0.96) return null; return disc(smx(), smy(), 0.23); }, { fillColor: 'rgba(150,40,20,0.65)' });
    shape(function () { return half(smx(), smy(), 0.23, 0); }, { fillColor: 'rgba(5,8,16,0.55)' });
    text(4.0, -5.0, function () { var b = eBeta(); return 'Moon ' + Math.abs(b).toFixed(1) + '° ' + (b >= 0 ? 'above' : 'below') + ' the plane (it can be up to ' + (st.flat ? '0' : '5.1') + '°)'; }, { fontSize: 12, strokeColor: C.muted });
    bd.update();
  }
  function stepEclipse() {
    if (st.playing) return; st.playing = 'step'; B.moved = true; var t0 = st.t;
    animate(1100, function (f) { st.t = t0 + MONTH / 2 * f; }, function () {
      st.t = t0 + MONTH / 2; st.steps++; if (st.flat) st.flatSteps++; var full = st.steps % 2 === 1, j = judge(full, eBeta());
      if (j[0] === 'solar') st.solar++; else if (j[0] === 'lunar') st.lunar++; else if (j[0] === 'pen') st.pen++;
      st.log.unshift('Month ' + (Math.floor(st.steps / 2) + 1) + ', ' + (full ? 'full moon' : 'new moon') + ': ' + j[1]);
    });
  }
  function paintEclipse() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    var nx = el('button', 'go', st.steps % 2 === 0 ? 'Next full moon' : 'Next new moon'); nx.type = 'button'; nx.addEventListener('click', stepEclipse); bar.appendChild(nx);
    if (spec.tilt === 'choose') { var fl = el('button', '', st.flat ? 'Tilt the moon’s orbit again' : 'Flatten the moon’s orbit'); fl.type = 'button'; fl.setAttribute('aria-pressed', String(!!st.flat)); fl.addEventListener('click', function () { if (st.playing) return; st.flat = !st.flat; B.moved = true; st.log.unshift(st.flat ? 'The moon’s orbit is now flat (what if?).' : 'The moon’s orbit is tilted 5° again.'); bd.update(); paint(); report(); }); bar.appendChild(fl); }
    var tally = el('span', 'skytally', 'Solar eclipses ' + st.solar + ' · lunar ' + st.lunar + (st.pen ? ' (plus ' + st.pen + ' faint)' : '') + ' · in ' + st.steps + ' new and full moons'); bar.appendChild(tally); paneButton(bar);
    panel.appendChild(bar);
    st.live = el('div', 'cinfo skyinfo'); panel.appendChild(st.live); live();
    var ol = el('ol', 'skylog'); st.log.slice(0, 8).forEach(function (t) { ol.appendChild(el('li', '', t)); }); if (st.log.length) panel.appendChild(ol);
  }
  function liveEclipse() {
    if (!st.live) return;
    var syz = st.steps === 0 ? 'Start: a new moon (no eclipse this month).' : st.log[0];
    st.live.textContent = syz;
  }

  // ---------- tides ----------
  var tElong = function () { return mod(st.psi - Math.PI, TAU); };
  var tDays = function () { return tElong() / TAU * MONTH; };
  var tRange = function (e) { return 2 * (1.1 + 0.5 * Math.cos(2 * e)); };    // metres, on a typical coast
  function buildTides() {
    newBoard();
    var EX = -5.6, EY = 0, ER = 1.25, OR = 4.0;
    text(-5.6, 5.5, 'From above (not to scale)', { fontSize: 14, cssStyle: 'font-weight:600' });
    sunRays(-10.9, -10.0, [3, 1.5, 0, -1.5, -3]); text(-10.4, 4.2, 'Sunlight', { fontSize: 12, strokeColor: C.ray });
    var oceanR = function (a) { return ER + 0.7 + 0.45 * Math.cos(2 * (a - st.psi)) + 0.2 * Math.cos(2 * (a - Math.PI)); };
    shape(function () { var p = []; for (var i = 0; i < 90; i++) { var a = TAU * i / 90, r = oceanR(a); p.push([EX + r * Math.cos(a), EY + r * Math.sin(a)]); } return p; }, { fillColor: C.water });
    shape(function () { return disc(EX, EY, ER); }, { fillColor: C.rock });
    text(EX, EY, 'Earth', { fontSize: 12 });
    line(function () { return disc(EX, EY, OR); }, '#3a4660', 1.5, 2);
    var mx = function () { return EX + OR * Math.cos(st.psi); }, my = function () { return EY + OR * Math.sin(st.psi); };
    shape(function () { return disc(mx(), my(), 0.36); }, { fillColor: C.moon });
    shape(function () { return half(mx(), my(), 0.36, 0); }, { fillColor: C.night });
    st.h = handle(EX, EY, OR, function () { return st.psi; }, function (a) { st.psi = a; markTides(); live(); });
    var beach = function () { var r = oceanR(st.beach); return [EX + (r + 0.12) * Math.cos(st.beach), EY + (r + 0.12) * Math.sin(st.beach)]; };
    shape(function () { var b = beach(); return disc(b[0], b[1], 0.15); }, { fillColor: C.accent });
    line(function () { return [[EX + (ER - 0.1) * Math.cos(st.beach), EY + (ER - 0.1) * Math.sin(st.beach)], beach()]; }, C.accent, 2);
    text(-5.6, -5.5, 'Orange: your beach (turning with the Earth)', { fontSize: 12, strokeColor: C.muted });
    // A month of tides: two highs and two lows a day, their size following the moon's phase.
    var X0 = 0.9, X1 = 10.6, Y0 = -1.0, YS = 0.85, tx = function (d) { return X0 + (X1 - X0) * d / MONTH; };
    text(5.75, 5.5, 'A month of tides on one coast', { fontSize: 14, cssStyle: 'font-weight:600' });
    line(function () { return [[X0, Y0 - 1.8 * YS - 0.3], [X1, Y0 - 1.8 * YS - 0.3]]; }, '#56647e', 1);
    line(function () { return [[X0, Y0], [X1, Y0]]; }, '#3a4660', 1, 2);
    shape(function () { var p = []; for (var i = 0; i <= 1400; i++) { var d = MONTH * i / 1400, e = TAU * d / MONTH; p.push([tx(d), Y0 + YS * tRange(e) / 2 * Math.cos(TAU * d / 0.5175)]); } return p; }, { strokeColor: '#7fb2f0', strokeWidth: 1 });
    [[0, 'new'], [MONTH / 4, 'first quarter'], [MONTH / 2, 'full'], [3 * MONTH / 4, 'last quarter']].forEach(function (m, i) {
      var x = tx(m[0]), y = 3.2;
      shape(function () { return disc(x, y, 0.28); }, { fillColor: C.dark });
      shape(function () { return phaseShape(x, y, 0.28, i * Math.PI / 2); }, { fillColor: C.moon });
      text(x, 3.75, m[1], { fontSize: 10, strokeColor: C.muted });
    });
    line(function () { var x = tx(tDays()); return [[x, 2.7], [x, Y0 - 1.8 * YS - 0.3]]; }, C.accent, 2);
    text(function () { return tx(tDays()); }, Y0 - 1.8 * YS - 0.75, 'today', { fontSize: 11, strokeColor: C.accent });
    text(5.75, -4.6, 'days since new moon (0 to 29.5) →', { fontSize: 11, strokeColor: C.muted });
    text(X0 - 0.2, Y0 + 1.6 * YS, '+1.6 m', { fontSize: 10, strokeColor: C.muted, anchorX: 'right' });
    text(X0 - 0.2, Y0 - 1.6 * YS, '−1.6 m', { fontSize: 10, strokeColor: C.muted, anchorX: 'right' });
    bd.update();
  }
  function markTides() {
    var d = tDays();
    [[0, 's0'], [MONTH, 's0'], [MONTH / 2, 's1'], [MONTH / 4, 'q0'], [3 * MONTH / 4, 'q1']].forEach(function (k) { if (Math.abs(d - k[0]) < 1.2) st.found[k[1]] = 1; });
  }
  function paintTides() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar');
    var pd = el('button', 'go', 'Play a day at the beach'); pd.type = 'button';
    pd.addEventListener('click', function () { if (st.playing) return; st.playing = 'day'; B.moved = true; var b0 = st.beach; st.highs = 0; var last = null, lastH = null, up = null; animate(6000, function (f) { st.beach = b0 + TAU * f; var h = Math.cos(2 * (st.beach - st.psi)); if (lastH !== null) { var nowUp = h > lastH; if (up === true && !nowUp) st.highs++; up = nowUp; } lastH = h; live(); }, function () { st.beachDays++; }); });
    var nm = el('button', '', 'Moon: next quarter'); nm.type = 'button';
    nm.addEventListener('click', function () { if (st.playing) return; st.playing = 'move'; B.moved = true; var a0 = st.psi, e = tElong(), j = Math.floor(e / (Math.PI / 2) + 1e-6) + 1, d = mod(Math.PI + j * Math.PI / 2 - a0, TAU); animate(900, function (f) { st.psi = a0 + d * f; markTides(); st.h.place(); live(); }); });
    bar.append(pd, nm); paneButton(bar); panel.appendChild(bar);
    st.live = el('div', 'cinfo skyinfo'); panel.appendChild(st.live); live();
  }
  function liveTides() {
    if (!st.live) return;
    var e = tElong(), c = Math.cos(2 * e), kind = c > 0.7 ? 'spring tides: the sun and moon pull in line, so high tides are extra high and low tides extra low' : c < -0.7 ? 'neap tides: the sun pulls at right angles to the moon, so the tides are small' : 'between spring and neap tides';
    st.live.innerHTML = '<b></b><span></span><i></i>';
    st.live.children[0].textContent = tDays().toFixed(1) + ' days after new moon:';
    st.live.children[1].textContent = ' ' + kind + ' (range about ' + tRange(e).toFixed(1) + ' m).';
    var h = Math.cos(2 * (st.beach - st.psi)) * 0.45 + Math.cos(2 * (st.beach - Math.PI)) * 0.2;
    st.live.children[2].textContent = 'At your beach the water is ' + (h > 0.3 ? 'high' : h < -0.3 ? 'low' : h > 0 ? 'fairly high' : 'fairly low') + '.' + (st.playing === 'day' ? ' High tides so far today: ' + st.highs + '.' : st.beachDays ? ' In one turn of the Earth your beach passed through both bulges: two high tides a day.' : '') + ' Spring tides found: ' + Object.keys(st.found).filter(function (k) { return k[0] === 's'; }).length + ' of 2; neap tides: ' + Object.keys(st.found).filter(function (k) { return k[0] === 'q'; }).length + ' of 2.';
  }

  // ---------- shared ----------
  function paint() { ({ earth: paintEarth, moon: paintMoon, eclipse: paintEclipse, tides: paintTides })[spec.mode](); }
  function report() {
    var vars, msg, ok = false;
    if (spec.mode === 'earth') {
      var n = earthNow();
      vars = { d: Math.round(st.d), r: st.days, o: st.years, h: +n.h.toFixed(1), a: Math.round(n.a), k: +n.k.toFixed(1), t: st.tilt, m: Object.keys(st.months || {}).length, g: +((st.hmax || 0) - (st.hmin || 0)).toFixed(1), p: Object.keys(st.placesSeen).length, q: Object.keys(st.hemis).length };
      msg = dateText(st.d) + ', ' + st.place + ': ' + vars.h + ' h of daylight. Days played ' + st.days + ', years played ' + st.years + '.';
      ok = st.days > 0 && st.years > 0;
    } else if (spec.mode === 'moon') {
      var e = elong();
      vars = { n: Object.keys(st.seen).length, f: Math.round(100 * (1 - Math.cos(e)) / 2), e: +(e / TAU * MONTH).toFixed(1), c: st.right, w: st.wrong };
      if (spec.quiz === 'on') { msg = st.right + ' named correctly' + (st.wrong ? ', ' + st.wrong + ' not yet' : '') + '.'; ok = st.right >= spec.need; if (ok) msg += ' Well done.'; }
      else { msg = 'Phases visited: ' + vars.n + ' of 8.'; ok = vars.n === 8; }
    } else if (spec.mode === 'eclipse') {
      vars = { m: st.steps, s: st.solar, u: st.lunar, b: st.pen, f: st.flat ? 1 : 0, l: st.flatSteps };
      msg = 'Solar eclipses ' + st.solar + ', lunar ' + st.lunar + ' in ' + st.steps + ' new and full moons.'; ok = st.solar > 0 && st.lunar > 0;
    } else {
      var s = Object.keys(st.found).filter(function (k) { return k[0] === 's'; }).length, q = Object.keys(st.found).filter(function (k) { return k[0] === 'q'; }).length;
      vars = { d: +tDays().toFixed(1), r: +tRange(tElong()).toFixed(1), s: s, q: q, b: st.beachDays };
      msg = 'Spring tides found ' + s + ' of 2, neap tides ' + q + ' of 2.'; ok = s === 2 && q === 2;
    }
    B.say(msg, ok);
    B.save({ st: keep() });
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }
  function keep() { var k = {}; ['d', 'hour', 'place', 'tilt', 'days', 'years', 'months', 'hmin', 'hmax', 'trackKey', 'placesSeen', 'hemis', 'psi', 'seen', 'right', 'wrong', 't', 'steps', 'flatSteps', 'solar', 'lunar', 'pen', 'flat', 'log', 'found', 'beach', 'beachDays', 'shadow'].forEach(function (x) { if (st[x] !== undefined) k[x] = st[x]; }); return k; }
  function build() { ({ earth: buildEarth, moon: buildMoon, eclipse: buildEclipse, tides: buildTides })[spec.mode](); }

  B.widget('sky', {
    sections: ['board', 'gpanel'],
    label: function (s) { return { earth: 'The Earth going round the sun, from above and from the side', moon: 'The moon going round the Earth, and its phase seen from Earth', eclipse: 'The moon’s orbit from above and from the side, with shadows', tides: 'Tides: the oceans pulled by the moon and sun, and a month of tides' }[s.mode]; },
    parse: function (s) {
      s.mode = s.mode || 'earth';
      if (['earth', 'moon', 'eclipse', 'tides'].indexOf(s.mode) < 0) throw new Error('mode: earth, moon, eclipse or tides.');
      if (s.place && !(s.place in PLACES)) throw new Error('place: one of ' + Object.keys(PLACES).join(', ') + '.');
      if (s.view && ['south', 'north'].indexOf(s.view) < 0) throw new Error('view: south or north.');
      if (s.mode === 'earth' && s.tilt && s.tilt !== 'choose' && !(Number(s.tilt) >= 0 && Number(s.tilt) <= 90)) throw new Error('tilt: choose, or a number of degrees (0 to 90).');
      s.need = Number(s.need) || 5;
    },
    start: function (fresh) {
      spec = B.spec; cancelAnimationFrame(raf);
      var sv = fresh ? null : B.saved(), k = (sv && sv.st) || {};
      st = Object.assign({
        d: 355, hour: 12, place: spec.place || 'Canberra', tilt: spec.mode === 'earth' && spec.tilt && spec.tilt !== 'choose' ? Number(spec.tilt) : 23.4, days: 0, years: 0, placesSeen: {}, hemis: {},
        psi: Math.PI + Math.PI / 4, seen: {}, right: 0, wrong: 0,
        t: 0, steps: 0, flatSteps: 0, solar: 0, lunar: 0, pen: 0, flat: false, log: [], node0: 100 * RAD,
        found: {}, beach: Math.PI / 2, beachDays: 0, shadow: false,
      }, k);
      st.playing = null; st.live = null;
      if (spec.mode === 'earth') trackEarth();
      if (spec.mode === 'moon') markPhase();
      if (spec.mode === 'tides') markTides();
      if (spec.mode === 'moon' && spec.quiz === 'on') { st.qAns = -1; build(); quizNext(); return; }
      build(); paint(); report();
    },
    redraw: function () { build(); paint(); },
    resize: function () { if (st && st.wasNarrow !== narrow() && !st.playing) { build(); paint(); return; } if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
