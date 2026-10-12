// Motors, drivers and batteries (Engineering › Power and motors). A simple stated model, not a circuit simulator:
// an Uno pin gives about 20 mA (40 mA at most); a small 6 V gear motor draws about 150 mA running and 700 mA starting.
//   widget: motor
//   mode: pin | hbridge | ground | battery
// mode: pin — pin 9 drives a motor, straight or through a transistor with its own battery.
//   wiring: direct | transistor     choose: on (buttons to change the wiring)     diode: on (a flyback diode fitted; toggle: on)
//   values: w (1 = through a transistor), o (pin on), i (pin current, mA), n (motor current, mA), m (1 = motor turning),
//           x (1 = pin overloaded), f (1 = diode fitted), z (1 = a voltage spike was seen when it switched off)
// mode: hbridge — an L293D-style driver: IN1, IN2 set direction; ENA (PWM 0–255) sets speed.
//   values: a (IN1), b (IN2), e (ENA 0–255), d (1 forward, -1 reverse, 0 stopped), s (speed %), k (1 = braking: both HIGH)
// mode: ground — the Uno on USB and the motor on its own battery through a driver.
//   ground: off (the grounds start unjoined)   supply: board (the motor starts on the Uno's 5V)
//   values: g (1 = grounds joined), p (1 = motor on its own battery), m (1 = motor responds), r (Uno resets seen)
// mode: battery — choose a battery for a robot: voltage, capacity, weight; motors and board draw current.
//   draw: 350 (mA in total)   need: 30 (minutes)   volts: 6, 9 (the driver's range)   grams: 150 (most it can carry)
//   values: v (volts), c (mAh), i (draw, mA), t (run time, minutes), q (grams), p (1 = meets every criterion), u (usable %)
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', PIN_OK = 20, PIN_MAX = 40, RUN = 150, START = 700;
  var BATT = [
    { id: 'aa4', name: '4 × AA alkaline', v: 6, c: 2000, g: 100 },
    { id: 'nimh4', name: '4 × AA NiMH', v: 4.8, c: 2000, g: 110 },
    { id: 'nimh6', name: '6 × AA NiMH', v: 7.2, c: 2000, g: 165 },
    { id: 'pp3', name: '9 V PP3', v: 9, c: 500, g: 45 },
    { id: 'lipo2', name: '2S LiPo 1000 mAh', v: 7.4, c: 1000, g: 60 },
    { id: 'lipo2b', name: '2S LiPo 2200 mAh', v: 7.4, c: 2200, g: 120 },
  ];
  var spec = null, st = {}, ui = {}, spin = 0, raf = null, angle = 0;
  var on = function (s) { return /^on$/i.test(s || ''); };
  var off = function (s) { return /^off$/i.test(s || ''); };

  function parse(s) {
    s.mode = (s.mode || 'pin').toLowerCase();
    if (['pin', 'hbridge', 'ground', 'battery'].indexOf(s.mode) < 0) throw new Error('mode: pin, hbridge, ground or battery.');
    s.draw0 = s.draw === undefined ? 350 : Number(s.draw); s.need = s.need === undefined ? 30 : Number(s.need);
    var vr = String(s.volts || '6, 9').split(',').map(Number); s.vlo = vr[0]; s.vhi = vr[1] === undefined ? vr[0] : vr[1];
    s.maxg = s.grams === undefined ? 150 : Number(s.grams);
    s.usable = s.usable === undefined ? 100 : Number(s.usable);
  }

  // ---------- models ----------
  function pinModel() {
    var r = { i: 0, n: 0, m: 0, x: 0 };
    if (!st.o) return r;
    if (st.w) { r.i = 4; r.n = RUN; r.m = 1; }                 // the pin only switches the transistor
    else { r.i = START; r.n = START; r.m = 0; r.x = 1; }        // the motor tries to draw its start current from the pin
    return r;
  }
  function hbModel() {
    var d = 0, k = 0;
    if (st.e > 0) { if (st.a && !st.b) d = 1; else if (!st.a && st.b) d = -1; else if (st.a && st.b) k = 1; }
    return { d: d, k: k, s: d ? Math.round(st.e / 255 * 100) : 0 };
  }
  function groundModel() { return { m: st.g ? 1 : 0, sag: !st.p }; }
  function battModel() {
    var b = BATT.filter(function (x) { return x.id === st.batt; })[0] || BATT[0];
    var t = Math.round(b.c * (st.u / 100) / st.draw * 60);
    var p = b.v >= spec.vlo && b.v <= spec.vhi && t >= spec.need && b.g <= spec.maxg ? 1 : 0;
    return { b: b, t: t, p: p };
  }

  // ---------- drawing ----------
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function txt(p, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, class: cls || 'ckval', 'text-anchor': anchor || 'middle' }, p); e.textContent = t; return e; }
  function newSvg(label) { var host = B.el('board'); host.replaceChildren(); return el('svg', { viewBox: '0 0 640 300', class: 'cksvg mtsvg', role: 'img', 'aria-label': label }, host); }
  function uno(svg, x, y, pins) {
    el('rect', { x: x, y: y, width: 120, height: 170, rx: 10, class: 'ardboard' }, svg); txt(svg, x + 50, y + 40, 'UNO', 'ardname');
    pins.forEach(function (p) { el('rect', { x: x + 110, y: p[1] - 9, width: 20, height: 18, rx: 3, class: 'ckpad' }, svg); txt(svg, x + 104, p[1] + 5, p[0], 'ardlab', 'end'); });
  }
  function motorIcon(svg, x, y, label) {
    el('circle', { cx: x, cy: y, r: 30, class: 'mtbody' }, svg);
    ui.rotor = el('g', { transform: 'translate(' + x + ',' + y + ')' }, svg);
    el('line', { x1: 0, y1: 0, x2: 0, y2: -22, class: 'mtspoke' }, ui.rotor); el('line', { x1: 0, y1: 0, x2: 19, y2: 11, class: 'mtspoke' }, ui.rotor); el('line', { x1: 0, y1: 0, x2: -19, y2: 11, class: 'mtspoke' }, ui.rotor);
    el('circle', { r: 5, class: 'gaxle' }, ui.rotor);
    txt(svg, x, y + 48, label || 'motor', 'ckval');
  }
  function battIcon(svg, x, y, label) {
    el('rect', { x: x - 22, y: y - 34, width: 44, height: 68, rx: 6, class: 'mtbatt' }, svg); el('rect', { x: x - 8, y: y - 40, width: 16, height: 6, class: 'mtbatt' }, svg);
    txt(svg, x, y - 12, '+', 'mtplus'); txt(svg, x, y + 22, '−', 'mtplus'); txt(svg, x, y + 54, label, 'ckval');
  }
  function wire(svg, d, live, cls) { return el('path', { d: d, class: 'ckwire' + (live ? ' live' : '') + (cls ? ' ' + cls : '') }, svg); }

  function draw() {
    var svg;
    if (spec.mode === 'pin') {
      var m = pinModel(); svg = newSvg(st.w ? 'Pin 9 switches a transistor; a battery drives the motor' : 'A motor wired straight to pin 9');
      uno(svg, 20, 60, [['9', 100], ['GND', 200]]);
      if (!st.w) {
        wire(svg, 'M150,100 L400,100 L400,128', st.o); wire(svg, 'M400,192 L400,220 L150,220 L150,200', st.o);
        motorIcon(svg, 400, 160);
        txt(svg, 470, 150, 'pin 9 → motor → GND', 'ckval', 'start');
      } else {
        wire(svg, 'M150,100 L250,100', st.o); el('rect', { x: 250, y: 92, width: 40, height: 16, rx: 4, class: 'ckres' }, svg); wire(svg, 'M290,100 L330,100 L330,190', st.o);
        el('circle', { cx: 350, cy: 205, r: 22, class: 'mtfet' }, svg); txt(svg, 350, 210, 'T', 'mtplus');
        wire(svg, 'M350,227 L350,250 L150,250 L150,200', m.m); battIcon(svg, 560, 160, '6 V battery');
        wire(svg, 'M560,120 L560,70 L450,70 L450,98', m.m); motorIcon(svg, 450, 128); wire(svg, 'M450,158 L450,175 L372,190', m.m);
        wire(svg, 'M560,194 L560,262 L350,262 L350,250', m.m);
        if (st.f) { el('path', { d: 'M500,105 L500,150 M490,118 L510,118 L500,134 Z M490,134 L510,134', class: 'mtdiode' }, svg); txt(svg, 508, 100, 'diode', 'ckval', 'start'); }
        txt(svg, 270, 84, '1 kΩ', 'ckval');
      }
      txt(svg, 470, 280, (m.x ? 'pin asked for ' : 'pin current ') + m.i + ' mA (safe: about ' + PIN_OK + ', most ' + PIN_MAX + ')', m.x ? 'ckcut' : 'ckval', 'end');
      ui.speed = m.m ? 1 : 0;
    } else if (spec.mode === 'hbridge') {
      var h = hbModel(); svg = newSvg('An H-bridge motor driver: IN1 and IN2 set the direction, ENA the speed');
      uno(svg, 20, 60, [['8', 90], ['7', 130], ['~9', 170], ['GND', 210]]);
      el('rect', { x: 260, y: 70, width: 120, height: 160, rx: 8, class: 'mtdrv' }, svg); txt(svg, 320, 62, 'driver (L293D)', 'ckval');
      [['IN1', 90, st.a], ['IN2', 130, st.b], ['ENA', 170, st.e > 0]].forEach(function (p) { wire(svg, 'M150,' + p[1] + ' L260,' + p[1], p[2]); txt(svg, 270, p[1] + 5, p[0], 'mtpin', 'start'); });
      wire(svg, 'M150,210 L260,210', false); txt(svg, 270, 215, 'GND', 'mtpin', 'start');
      wire(svg, 'M380,110 L470,110 L470,128', !!h.d); wire(svg, 'M380,190 L470,190 L470,192', !!h.d);
      motorIcon(svg, 470, 160, h.k ? 'braking' : h.d === 1 ? 'forwards ' + h.s + '%' : h.d === -1 ? 'backwards ' + h.s + '%' : 'stopped');
      battIcon(svg, 580, 160, 'motor battery');
      ui.speed = h.d * h.s / 100;
    } else if (spec.mode === 'ground') {
      var gm = groundModel(); svg = newSvg('An Uno on USB and a motor driver' + (st.p ? ' on its own battery' : ' on the Uno\'s 5V'));
      uno(svg, 20, 60, [['~9', 100], ['5V', 150], ['GND', 200]]);
      el('rect', { x: 260, y: 70, width: 110, height: 150, rx: 8, class: 'mtdrv' }, svg); txt(svg, 315, 62, 'driver', 'ckval');
      wire(svg, 'M150,100 L260,100', true); txt(svg, 268, 105, 'ENA', 'mtpin', 'start');
      txt(svg, 268, 205, 'GND', 'mtpin', 'start');
      if (st.g) wire(svg, 'M150,200 L260,200', false, 'gnd'); else txt(svg, 215, 192, 'not joined', 'ckcut');
      if (st.p) { battIcon(svg, 580, 160, 'motor battery'); wire(svg, 'M580,120 L580,80 L370,80', true); wire(svg, 'M580,194 L580,240 L315,240 L315,220', false, 'gnd'); }
      else { wire(svg, 'M150,150 L230,150 L230,250 L340,250 L340,220', true); txt(svg, 230, 270, 'motor power from the Uno\'s 5V', 'ckcut'); }
      wire(svg, 'M370,120 L470,120 L470,128', gm.m); wire(svg, 'M370,190 L470,190', gm.m); motorIcon(svg, 470, 160);
      txt(svg, 30, 40, 'Uno resets: ' + st.r, 'ckamp', 'start');
      ui.speed = gm.m ? 0.8 : 0;
    } else {
      var bm = battModel(); svg = newSvg('Choosing a battery for a two-motor robot');
      battIcon(svg, 90, 140, bm.b.name);
      var rows = [['Voltage', bm.b.v + ' V', 'driver needs ' + spec.vlo + ' to ' + spec.vhi + ' V', bm.b.v >= spec.vlo && bm.b.v <= spec.vhi],
        ['Capacity', bm.b.c + ' mAh', st.u < 100 ? 'use ' + st.u + '% of it' : '', true],
        ['Draw', st.draw + ' mA', 'two motors and the board', true],
        ['Run time', bm.t + ' min', 'needs ' + spec.need + ' min', bm.t >= spec.need],
        ['Weight', bm.b.g + ' g', 'robot carries ' + spec.maxg + ' g at most', bm.b.g <= spec.maxg]];
      rows.forEach(function (r, i) { var y = 60 + i * 40; txt(svg, 190, y, r[0], 'ckval', 'start'); txt(svg, 300, y, r[1], 'ckamp', 'start'); txt(svg, 400, y, (r[3] ? '✓ ' : '✗ ') + r[2], r[3] ? 'ckval' : 'ckcut', 'start'); });
      txt(svg, 190, 270, bm.p ? 'Meets the brief.' : 'Does not meet the brief.', bm.p ? 'ckamp' : 'ckcut', 'start');
      ui.speed = 0;
    }
    animate();
  }
  function animate() {
    if (raf) cancelAnimationFrame(raf); raf = null;
    if (!ui.rotor || !ui.speed) return;
    var last = performance.now();
    (function tick(now) { angle += ui.speed * (now - last) * 0.4; last = now; if (ui.rotor && ui.rotor.isConnected) { var t = ui.rotor.getAttribute('transform').replace(/ rotate\([^)]*\)/, ''); ui.rotor.setAttribute('transform', t + ' rotate(' + (angle % 360).toFixed(1) + ')'); raf = requestAnimationFrame(tick); } })(last);
  }

  // ---------- panel ----------
  function btn(text, fn, quiet, label) { var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label); if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e; }
  function act(fn) { return function () { fn(); B.moved = true; draw(); report(); }; }
  function toggle(label, key, onTxt, offTxt) { return btn(label, act(function () { st[key] = st[key] ? 0 : 1; }), true, label + ': now ' + (st[key] ? onTxt : offTxt)); }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    if (spec.mode === 'pin') {
      row.appendChild(btn('Pin 9 on / off', act(function () { var was = st.o; st.o = st.o ? 0 : 1; if (was && st.w && !st.f) st.z = 1; }), false, 'Switch pin 9 on or off'));
      if (on(spec.choose)) { row.appendChild(btn('Wire it straight to the pin', act(function () { st.w = 0; }), true)); row.appendChild(btn('Use a transistor and a battery', act(function () { st.w = 1; }), true)); }
      if (on(spec.toggle)) row.appendChild(btn('Fit / remove the diode', act(function () { st.f = st.f ? 0 : 1; }), true));
    } else if (spec.mode === 'hbridge') {
      row.appendChild(btn('IN1 HIGH / LOW', act(function () { st.a = st.a ? 0 : 1; }), true, 'Switch IN1'));
      row.appendChild(btn('IN2 HIGH / LOW', act(function () { st.b = st.b ? 0 : 1; }), true, 'Switch IN2'));
      var w = document.createElement('label'); w.className = 'ckslide'; w.textContent = 'ENA (analogWrite) ';
      var i = document.createElement('input'); i.type = 'range'; i.min = 0; i.max = 255; i.value = st.e; i.setAttribute('aria-label', 'ENA speed, 0 to 255');
      i.addEventListener('input', function () { st.e = Number(i.value); B.moved = true; draw(); report(); }); w.appendChild(i); row.appendChild(w);
    } else if (spec.mode === 'ground') {
      row.appendChild(btn('Join / unjoin the grounds', act(function () { st.g = st.g ? 0 : 1; }), true));
      row.appendChild(btn('Motor power: battery / Uno 5V', act(function () { st.p = st.p ? 0 : 1; }), true));
      row.appendChild(btn('Start the motor', act(function () {
        if (!st.p) { st.r++; ui.msg = 'The motor\'s starting current pulled the Uno\'s 5V down: the Uno reset.'; }
        else ui.msg = st.g ? 'The motor starts.' : 'Nothing happens: the driver can\'t read pin 9\'s signal without a shared ground.';
        st.tried = 1;
      })));
    } else {
      var lab = document.createElement('label'); lab.textContent = 'Battery ';
      var s = document.createElement('select'); BATT.forEach(function (b) { var o = document.createElement('option'); o.value = b.id; o.textContent = b.name; s.appendChild(o); });
      s.value = st.batt; s.addEventListener('change', act(function () { st.batt = s.value; })); lab.appendChild(s); row.appendChild(lab);
      if (on(spec.derate)) row.appendChild(btn('Use only 80% (don\'t run it flat)', act(function () { st.u = st.u === 100 ? 80 : 100; }), true));
    }
    row.appendChild(btn('Start again', B.restart, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'ardstatus'; ui.note.id = 'gnote'; panel.appendChild(ui.note);
  }

  function report() {
    var vars, facts, note = ui.msg || '';
    ui.msg = '';
    if (spec.mode === 'pin') {
      var m = pinModel();
      vars = { w: st.w, o: st.o, i: m.i, n: m.n, m: m.m, x: m.x, f: st.f, z: st.z };
      facts = (st.w ? 'Through a transistor' : 'Straight to the pin') + ' · pin 9 ' + (st.o ? 'on' : 'off') + ' · pin ' + (m.x ? 'asked for ' + m.i : m.i) + ' mA · ' + (m.m ? 'motor turning, ' + m.n + ' mA from the battery' : 'motor still');
      if (!note) note = m.x ? 'The motor needs about ' + START + ' mA to start; a pin gives about ' + PIN_OK + '. It doesn\'t turn, and the pin is being damaged.' : (st.z ? 'Switching the motor off made a voltage spike (no diode). It can damage the transistor.' : '');
      B.say(m.m ? 'The motor turns.' : 'The motor is still.');
    } else if (spec.mode === 'hbridge') {
      var h = hbModel();
      vars = { a: st.a, b: st.b, e: st.e, d: h.d, s: h.s, k: h.k };
      facts = 'IN1 ' + (st.a ? 'HIGH' : 'LOW') + ' · IN2 ' + (st.b ? 'HIGH' : 'LOW') + ' · ENA ' + st.e + ' · ' + (h.k ? 'braking' : h.d === 1 ? 'forwards' : h.d === -1 ? 'backwards' : 'stopped') + (h.d ? ' at ' + h.s + '%' : '');
      B.say(facts);
    } else if (spec.mode === 'ground') {
      var gm = groundModel(), running = st.tried && st.p && st.g ? 1 : 0;
      vars = { g: st.g, p: st.p, m: running, r: st.r, t: st.tried ? 1 : 0 };
      facts = 'Grounds ' + (st.g ? 'joined' : 'not joined') + ' · motor power from ' + (st.p ? 'its own battery' : 'the Uno\'s 5V') + ' · Uno resets ' + st.r;
      ui.speed = running ? 0.8 : 0; animate();
      B.say(running ? 'The motor turns.' : 'The motor is still.');
    } else {
      var bm = battModel();
      vars = { v: bm.b.v, c: bm.b.c, i: st.draw, t: bm.t, q: bm.b.g, p: bm.p, u: st.u };
      facts = bm.b.name + ' · ' + bm.b.v + ' V · ' + bm.b.c + ' mAh · ' + bm.t + ' min at ' + st.draw + ' mA · ' + bm.b.g + ' g';
      B.say(bm.p ? 'This battery meets the brief.' : 'This battery does not meet the brief.');
    }
    ui.facts.textContent = facts; ui.note.textContent = note;
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, facts + (note ? '. ' + note : ''));
  }

  B.widget('motor', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Motors, drivers and batteries'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec; ui = {};
      st = { o: 0, w: /^transistor$/i.test(spec.wiring || '') ? 1 : 0, f: on(spec.diode) ? 1 : 0, z: 0, a: 0, b: 0, e: 0,
        g: off(spec.ground) ? 0 : 1, p: /^board$/i.test(spec.supply || '') ? 0 : 1, r: 0, tried: 0,
        batt: spec.battery || 'aa4', draw: spec.draw0, u: spec.usable };
      var sv = fresh ? null : B.saved();
      if (sv && sv.st) Object.keys(st).forEach(function (k) { if (typeof sv.st[k] === typeof st[k]) st[k] = sv.st[k]; });
      paintPanel(); draw(); report();
    },
  });
})(WPB);
