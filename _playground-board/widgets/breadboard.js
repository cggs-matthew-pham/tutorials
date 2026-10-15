// A breadboard wired to an Arduino Uno (Engineering › Physical computing). Students move part legs between holes
// and the board works out what is connected: each numbered column's five holes a–e are joined, so are f–j (not across
// the gap), and each rail runs the board's length. A sketch is taken to be switching the named pin HIGH.
//   widget: breadboard
//   cols: 17                      columns (8 to 24)
//   pin: 13                       the Uno pin the sketch switches HIGH (terminals 13, 5V and GND are on the left)
//   part LED: led, a10, a11       a part: led (anode = long leg first, then cathode), resistor, wire, button
//   part R: resistor, b5, b9        legs at holes (a1–j24, rails t+5 t-5 b+5 b-5) or terminals (13, 5V, GND)
//   part W1: wire, 13, a5
//   lock: W1, R                   parts whose legs cannot move
// Click a hole to see everything joined to it; click a leg's handle, then a hole, to move it (or type a move).
// state: { scope: { vars: { l (1 = the first LED lights), r (1 = a resistor is in its loop), x (1 = an LED with no
//   resistor: too much current), z (1 = a short: the pin or 5V joined straight to GND), v (1 = the first LED would
//   light the other way round), y (1 = both its legs in one strip), q (holes looked at), m (legs moved),
//   p (1 = a button is held) } } }
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', ROWS = 'abcdefghij', DX = 24, X0 = 150;
  var RY = { 't+': 30, 't-': 50, a: 84, b: 108, c: 132, d: 156, e: 180, f: 222, g: 246, h: 270, i: 294, j: 318, 'b+': 352, 'b-': 372 };
  var TERM = { '13': [70, 100], '12': [70, 124], '9': [70, 148], '5V': [70, 220], 'GND': [70, 256] };
  var spec = null, st = {}, ui = {};

  function holeXY(h) {
    if (TERM[h]) return TERM[h];
    var m = /^([a-j])(\d+)$/.exec(h) || /^([tb][+-])(\d+)$/.exec(h);
    if (!m) return null;
    var c = Number(m[2]); if (!(c >= 1 && c <= spec.cols)) return null;
    return [X0 + (c - 1) * DX, RY[m[1]]];
  }
  function netOf(h) {
    if (TERM[h]) return 'P' + h;
    var m = /^([a-j])(\d+)$/.exec(h); if (m) return (ROWS.indexOf(m[1]) < 5 ? 'T' : 'B') + m[2];
    m = /^([tb][+-])(\d+)$/.exec(h); if (m) return 'R' + m[1];
    return null;
  }
  function parse(s) {
    s.cols = s.cols === undefined ? 17 : Number(s.cols);
    if (!(s.cols >= 8 && s.cols <= 24)) throw new Error('cols: 8 to 24.');
    s.pin = String(s.pin || '13');
    if (!TERM[s.pin] || s.pin === '5V' || s.pin === 'GND') throw new Error('pin: 13, 12 or 9.');
    spec = s;
    s.parts = s.items.filter(function (it) { return it.kind === 'part'; }).map(function (it) {
      var v = it.value.split(',').map(function (t) { return t.trim(); });
      var kind = v[0].toLowerCase();
      if (['led', 'resistor', 'wire', 'button'].indexOf(kind) < 0) throw new Error('part ' + it.name + ': led, resistor, wire or button.');
      if (v.length !== 3) throw new Error('part ' + it.name + ': a kind and two legs, such as led, a10, a11.');
      [v[1], v[2]].forEach(function (h) { if (!holeXY(h)) throw new Error('part ' + it.name + ': no hole "' + h + '" (a1 to j' + s.cols + ', t+1, b-1, or 13, 5V, GND).'); });
      return { name: it.name, kind: kind, legs: [v[1], v[2]] };
    });
    if (!s.parts.length) throw new Error('Add at least one part, such as part LED: led, a10, a11.');
    s.locked = String(s.lock || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
  }

  // ---------- what is connected ----------
  function evaluate() {
    var parent = {};
    var find = function (a) { while (parent[a] && parent[a] !== a) a = parent[a]; return a; };
    var join = function (a, b) { a = find(a); b = find(b); if (a !== b) parent[a] = b; };
    st.parts.forEach(function (p) {
      if (p.kind === 'wire' || (p.kind === 'button' && st.held === p.name)) join(netOf(p.legs[0]), netOf(p.legs[1]));
    });
    var N = function (h) { return find(netOf(h)); };
    var src = [N(st.pin), N('5V')], gnd = N('GND');
    var res = { z: src.indexOf(gnd) >= 0 ? 1 : 0, leds: [] };
    var edges = st.parts.filter(function (p) { return p.kind === 'led' || p.kind === 'resistor'; }).map(function (p) { return { p: p, a: N(p.legs[0]), b: N(p.legs[1]) }; });
    // every simple path from a source to GND, along resistors either way and LEDs anode → cathode
    function paths(from, used, seen, out) {
      if (from === gnd) { out.push(used.slice()); return; }
      edges.forEach(function (e) {
        if (used.indexOf(e) >= 0) return;
        var to = e.a === from ? e.b : (e.p.kind === 'resistor' && e.b === from ? e.a : null);
        if (to === null || seen[to]) return;
        seen[to] = 1; used.push(e); paths(to, used, seen, out); used.pop(); delete seen[to];
      });
    }
    var all = []; if (!res.z) src.forEach(function (s) { var sn = {}; sn[s] = 1; paths(s, [], sn, all); });
    edges.forEach(function (e) {
      if (e.p.kind !== 'led') return;
      var through = all.filter(function (p) { return p.indexOf(e) >= 0; });
      var lit = through.length > 0, withR = through.some(function (p) { return p.some(function (x) { return x.p.kind === 'resistor'; }); });
      // would it light turned round? swap this LED's legs and look again
      var back = 0;
      if (!lit && !res.z && e.a !== e.b) { var a = e.a; e.a = e.b; e.b = a; var tmp = []; src.forEach(function (s) { var sn = {}; sn[s] = 1; paths(s, [], sn, tmp); }); back = tmp.some(function (p) { return p.indexOf(e) >= 0; }) ? 1 : 0; e.b = e.a; e.a = a; }
      res.leds.push({ name: e.p.name, lit: lit ? 1 : 0, r: withR ? 1 : 0, x: lit && !withR ? 1 : 0, v: back, y: e.a === e.b ? 1 : 0 });
    });
    res.find = N;
    return res;
  }

  // ---------- drawing ----------
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function txt(p, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, class: cls || 'ckval', 'text-anchor': anchor || 'middle' }, p); e.textContent = t; return e; }
  function allHoles() {
    var hs = [];
    for (var c = 1; c <= spec.cols; c++) { ['t+', 't-'].forEach(function (r) { hs.push(r + c); }); for (var i = 0; i < 10; i++) hs.push(ROWS[i] + c); ['b+', 'b-'].forEach(function (r) { hs.push(r + c); }); }
    return hs;
  }
  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var W = X0 + (spec.cols - 1) * DX + 40;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' 392', class: 'cksvg bbsvg', role: 'img', 'aria-label': 'A breadboard wired to an Arduino Uno' }, host);
    ui.svg = svg;
    // the Uno's edge and its terminals
    el('rect', { x: 10, y: 80, width: 74, height: 200, rx: 8, class: 'ardboard' }, svg);
    Object.keys(TERM).forEach(function (t) {
      var p = TERM[t]; el('rect', { x: p[0] - 9, y: p[1] - 9, width: 18, height: 18, rx: 3, class: 'ckpad' }, svg);
      txt(svg, p[0] - 16, p[1] + 5, t, 'ardlab', 'end');
    });
    txt(svg, 47, 300, 'pin ' + spec.pin + ' HIGH', 'ckval');
    // the board
    el('rect', { x: X0 - 22, y: 16, width: (spec.cols - 1) * DX + 44, height: 370, rx: 8, class: 'bbbody' }, svg);
    el('rect', { x: X0 - 22, y: 194, width: (spec.cols - 1) * DX + 44, height: 14, class: 'bbgap' }, svg);
    [['t+', 'bbplus'], ['t-', 'bbminus'], ['b+', 'bbplus'], ['b-', 'bbminus']].forEach(function (r) {
      var y = RY[r[0]]; el('line', { x1: X0 - 14, y1: y + (r[0][1] === '+' ? -9 : 9), x2: X0 + (spec.cols - 1) * DX + 14, y2: y + (r[0][1] === '+' ? -9 : 9), class: r[1] }, svg);
      txt(svg, X0 - 30, y + 4, r[0][1], 'bbrail', 'end');
    });
    for (var c = 1; c <= spec.cols; c++) if (c === 1 || c % 5 === 0) txt(svg, X0 + (c - 1) * DX, 72, String(c), 'bbnum');
    'abcdefghij'.split('').forEach(function (r) { txt(svg, X0 - 32, RY[r] + 4, r, 'bbnum'); });
    ui.holes = {};
    allHoles().forEach(function (h) {
      var p = holeXY(h), e = el('rect', { x: p[0] - 5, y: p[1] - 5, width: 10, height: 10, rx: 2, class: 'bbhole', 'data-h': h }, svg);
      e.addEventListener('click', function () { clickHole(h); });
      ui.holes[h] = e;
    });
    Object.keys(TERM).forEach(function (t) {
      var p = TERM[t], e = el('rect', { x: p[0] - 9, y: p[1] - 9, width: 18, height: 18, class: 'bbterm', 'data-h': t }, svg);
      e.addEventListener('click', function () { clickHole(t); }); ui.holes[t] = e;
    });
    ui.partLayer = el('g', {}, svg);
    drawParts();
  }
  function drawParts() {
    var g = ui.partLayer; g.replaceChildren(); var ev = evaluate();
    st.parts.forEach(function (p) {
      var a = holeXY(p.legs[0]), b = holeXY(p.legs[1]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      var ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
      if (p.kind === 'wire') el('path', { d: 'M' + a[0] + ',' + a[1] + ' Q' + mx + ',' + (my - 18) + ' ' + b[0] + ',' + b[1], class: 'bbwire ' + (p.legs.indexOf('GND') >= 0 || /-/.test(p.legs.join()) ? 'gnd' : '') }, g);
      else el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'bbleg' }, g);
      var body = el('g', { transform: 'translate(' + mx + ',' + my + ') rotate(' + ang.toFixed(1) + ')' }, g);
      if (p.kind === 'resistor') { el('rect', { x: -16, y: -6, width: 32, height: 12, rx: 4, class: 'ckres' }, body); [-9, -3, 3].forEach(function (x) { el('rect', { x: x, y: -6, width: 3, height: 12, class: 'ckband' }, body); }); }
      if (p.kind === 'led') {
        var L = ev.leds.filter(function (l) { return l.name === p.name; })[0] || {};
        if (L.lit) el('circle', { r: 20, class: 'ckglow', 'fill-opacity': 0.55 }, body);
        el('path', { d: 'M-8,-10 L-8,10 L10,0 Z', class: 'ckled' + (L.lit ? ' lit' : '') }, body); el('line', { x1: 10, y1: -10, x2: 10, y2: 10, class: 'ckbar' }, body);
        if (L.x) txt(g, mx, my - 22, '⚠', 'ckwarn');
      }
      if (p.kind === 'button') {
        el('rect', { x: -12, y: -12, width: 24, height: 24, rx: 4, class: 'bbbtn' + (st.held === p.name ? ' held' : '') }, body);
      }
      if (p.kind !== 'wire') txt(g, mx, my + 26, p.name, 'bbname');
      p.legs.forEach(function (h, i) {
        var q = holeXY(h), sel = st.sel && st.sel[0] === p.name && st.sel[1] === i;
        var lockd = spec.locked.indexOf(p.name) >= 0;
        var e = el('circle', { cx: q[0], cy: q[1], r: lockd ? 4 : 6, class: 'bbend' + (sel ? ' sel' : '') + (lockd ? ' locked' : '') + (p.kind === 'led' && i === 0 ? ' anode' : '') }, g);
        if (!lockd) e.addEventListener('click', function (ev2) { ev2.stopPropagation(); st.sel = sel ? null : [p.name, i]; drawParts(); report(sel ? '' : 'Now click a hole for ' + legName(p, i) + '.'); });
      });
    });
    // highlight what the looked-at hole is joined to
    Object.keys(ui.holes).forEach(function (h) { ui.holes[h].classList.toggle('on', !!(st.look && ev.find(h) === ev.find(st.look))); });
    return ev;
  }
  function legName(p, i) { return p.name + (p.kind === 'led' ? (i === 0 ? "'s long leg (+)" : "'s short leg (−)") : (p.kind === 'wire' ? ' end ' + (i + 1) : ' leg ' + (i + 1))); }

  function clickHole(h) {
    if (st.sel) {
      var p = st.parts.filter(function (x) { return x.name === st.sel[0]; })[0];
      if (p) { p.legs[st.sel[1]] = h; st.m++; B.moved = true; }
      var nm = legName(p, st.sel[1]); st.sel = null; st.look = null; drawParts(); report(nm + ' is now in ' + h + '.'); return;
    }
    st.look = st.look === h ? null : h; st.q++; B.moved = true; drawParts();
    report(st.look ? 'Highlighted: every hole joined to ' + h + '.' : '');
  }

  function report(note) {
    var ev = drawPartsOnce(), L = ev.leds[0] || { lit: 0, r: 0, x: 0, v: 0, y: 0 };
    var msg = ev.z ? 'Short circuit: pin ' + spec.pin + ' or 5V is joined straight to GND. On a real board, unplug it at once.'
      : L.y ? L.name + ': both legs are in the same strip, so the current goes round it.'
      : L.x ? 'Too much current: there is no resistor in ' + L.name + "'s loop."
      : L.lit ? L.name + ' is lit.' : L.v ? L.name + ' would light the other way round.' : L.name + ' is off: no complete loop through it.';
    ui.note.textContent = note || msg; B.say(msg);
    B.save({ parts: st.parts.map(function (p) { return p.legs.slice(); }) });
    B.post({ scope: { vars: { l: L.lit, r: L.r, x: L.x, z: ev.z, v: L.v, y: L.y, q: st.q, m: st.m, p: st.held ? 1 : 0 }, points: {} } }, msg);
  }
  function drawPartsOnce() { return evaluate(); }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    var lab = document.createElement('label'); lab.textContent = 'Move ';
    var sel = document.createElement('select'); sel.setAttribute('aria-label', 'Which leg');
    st.parts.forEach(function (p) { if (spec.locked.indexOf(p.name) >= 0) return; p.legs.forEach(function (h, i) { var o = document.createElement('option'); o.value = p.name + ':' + i; o.textContent = legName(p, i); sel.appendChild(o); }); });
    lab.appendChild(sel); row.appendChild(lab);
    var to = document.createElement('input'); to.type = 'text'; to.size = 5; to.placeholder = 'a10'; to.setAttribute('aria-label', 'To hole, such as a10, t-3 or GND');
    row.appendChild(document.createTextNode(' to ')); row.appendChild(to);
    var go = document.createElement('button'); go.type = 'button'; go.textContent = 'Move'; row.appendChild(go);
    go.addEventListener('click', function () {
      var h = to.value.trim(); h = TERM[h.toUpperCase()] ? h.toUpperCase() : h.toLowerCase();
      if (!holeXY(h)) { report('No hole called "' + to.value + '". Holes are a1 to j' + spec.cols + ', rails like t+3 or b-3, or 13, 5V, GND.'); return; }
      var v = sel.value.split(':'); st.sel = [v[0], Number(v[1])]; clickHole(h);
    });
    st.parts.filter(function (p) { return p.kind === 'button'; }).forEach(function (p) {
      var hb = document.createElement('button'); hb.type = 'button'; hb.className = 'quiet'; hb.textContent = 'Hold ' + p.name;
      var dn = function (e) { if (e) e.preventDefault(); st.held = p.name; B.moved = true; drawParts(); report(); };
      var upf = function () { if (st.held !== p.name) return; st.held = null; drawParts(); report(); };
      hb.addEventListener('pointerdown', dn); hb.addEventListener('pointerup', upf); hb.addEventListener('pointerleave', upf);
      hb.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) dn(e); }); hb.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') upf(); });
      row.appendChild(hb);
    });
    var again = document.createElement('button'); again.type = 'button'; again.className = 'quiet'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); row.appendChild(again);
    panel.appendChild(row);
    ui.note = document.createElement('p'); ui.note.className = 'ardstatus'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var tip = document.createElement('p'); tip.className = 'tcount'; tip.textContent = 'Click a hole to see what it is joined to. Click a leg (the dots), then a hole, to move it.'; panel.appendChild(tip);
  }

  B.widget('breadboard', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A breadboard wired to an Arduino Uno'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = { pin: spec.pin, parts: spec.parts.map(function (p, i) { return { name: p.name, kind: p.kind, legs: sv && sv.parts && sv.parts[i] && sv.parts[i].every(function (h) { return holeXY(h); }) ? sv.parts[i].slice() : p.legs.slice() }; }), sel: null, look: null, q: 0, m: 0, held: null };
      paintPanel(); draw(); report();
    },
  });
})(WPB);
