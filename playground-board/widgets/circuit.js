// Circuits on a micro:bit's pins (Engineering › Physical computing): a simple model, not a full circuit simulator.
// Supply 3.3 V; an LED drops 2 V and is damaged above 20 mA; a pin reads 0 to 1023 for 0 to 3.3 V.
//   widget: circuit
//   mode: led | button | sensor
// mode: led — pin 0 → resistor → LED → GND (or the resistor after the LED)
//   output: on        pin 0 starts on (off: starts off)       pinbtn: on   a "Pin 0 on/off" button
//   resistor: 220     ohms (0 = no resistor)                  choose: on   pick the resistor
//   quick: 0, 220, 1000   a button for each resistor (0 = No resistor)
//   place: before     resistor before or after the LED         move: on     a button to move it
//   unclip: on        buttons to unclip and clip the two wires  gnd: off     the GND wire starts unclipped
//   flip: on          a button to turn the LED round           numbers: off hide the current
//   turned: on        the LED starts the wrong way round
//   values: k (1 = a complete loop), o (pin on), i (current, mA), r (ohms), b (1 = resistor before the LED),
//           f (1 = LED turned round), w (1 = pin wire unclipped), c (1 = GND wire unclipped), l (1 = LED lit),
//           x (1 = over 20 mA)
// mode: button — 3V → button → pin 0, with a 10 kΩ pull-down from pin 0 to GND; the micro:bit shows a heart while
//   pin 0 reads 1.   pulldown: off   no pull-down (the pin floats)   toggle: on   a button to add or remove it
//   values: p (1 = held), v (pin 0 reads), n (presses), d (1 = pull-down fitted), z (1 = floating readings seen)
// mode: sensor — a divider into pin 0: sensor: pot (a knob) or light (a light sensor and a 10 kΩ resistor)
//   level: 50   knob or light, 0 to 100 %          volts: off  hide the volts      numbers: off  hide the reading
//   night: on   a night light: all the micro:bit's LEDs on while the reading is below the threshold
//   threshold: 300 (0 to 1023)   threshold: edit … or set: a threshold slider (start from threshold:, default 300)
//   values: a (reading 0–1023), u (volts), s (level %), t (threshold), l (1 = night light on)
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', VS = 3.3, VF = 2.0, IMAX = 20;
  var spec = null, st = {}, ui = {}, flt = null;
  var on = function (s) { return /^on$/i.test(s || ''); };
  var off = function (s) { return /^off$/i.test(s || ''); };
  var r1 = function (v) { return Math.round(v * 10) / 10; };

  function parse(s) {
    s.mode = (s.mode || 'led').toLowerCase();
    if (['led', 'button', 'sensor'].indexOf(s.mode) < 0) throw new Error('mode: led, button or sensor.');
    s.R = s.resistor === undefined ? 220 : Number(s.resistor);
    if (!(s.R >= 0 && s.R <= 1e6)) throw new Error('resistor: ohms from 0 (none) to 1000000.');
    s.after = /^after$/i.test(s.place || '');
    s.hide = off(s.numbers); s.novolts = off(s.volts);
    s.sensor = (s.sensor || 'pot').toLowerCase();
    if (s.mode === 'sensor' && ['pot', 'light'].indexOf(s.sensor) < 0) throw new Error('sensor: pot or light.');
    s.lev = s.level === undefined ? 50 : Number(s.level);
    if (!(s.lev >= 0 && s.lev <= 100)) throw new Error('level: 0 to 100.');
    s.tedit = /^edit$/i.test(s.threshold || '');
    s.t0 = s.tedit || s.threshold === undefined ? 300 : Number(s.threshold);
    if (!(s.t0 >= 0 && s.t0 <= 1023)) throw new Error('threshold: 0 to 1023, or edit.');
    s.night = on(s.night) || s.tedit;
  }

  // ---------- drawing ----------
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function txt(p, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, class: cls || 'cklab', 'text-anchor': anchor || 'middle' }, p); e.textContent = t; return e; }
  function wire(p, d, live, cut) { return el('path', { d: d, class: 'ckwire' + (live ? ' live' : '') + (cut ? ' cut' : '') }, p); }
  function microbit(svg, pins) {
    el('rect', { x: 20, y: 30, width: 130, height: 240, rx: 14, class: 'ckmb' }, svg);
    var disp = el('g', {}, svg); ui.leds = [];
    for (var yy = 0; yy < 5; yy++) for (var xx = 0; xx < 5; xx++) ui.leds.push(el('rect', { x: 34 + xx * 13, y: 112 + yy * 15, width: 6, height: 9, rx: 1.5, class: 'ckpix' }, disp));
    pins.forEach(function (pn) {
      el('rect', { x: 132, y: pn.y - 12, width: 26, height: 24, rx: 4, class: 'ckpad' }, svg);
      txt(svg, 127, pn.y + 5, pn.name, 'ckpin', 'end');
    });
  }
  function resistor(p, x, y, vertical, label) {
    var g = el('g', { transform: 'translate(' + x + ',' + y + ')' + (vertical ? ' rotate(90)' : '') }, p);
    el('rect', { x: -30, y: -9, width: 60, height: 18, rx: 4, class: 'ckres' }, g);
    [-18, -8, 2].forEach(function (bx) { el('rect', { x: bx, y: -9, width: 4, height: 18, class: 'ckband' }, g); });
    if (label) txt(p, x + (vertical ? 34 : 0), y + (vertical ? 4 : -16), label, 'ckval', vertical ? 'start' : 'middle');
    return g;
  }
  function led(p, x, y, flipped, glow, burnt) {
    var g = el('g', { transform: 'translate(' + x + ',' + y + ')' + (flipped ? ' rotate(180)' : '') }, p);
    if (glow > 0) el('circle', { r: 22 + 14 * glow, class: 'ckglow', 'fill-opacity': (0.15 + 0.55 * glow).toFixed(2) }, g);
    el('path', { d: 'M-14,-12 L14,-12 L0,12 Z', class: 'ckled' + (glow > 0 ? ' lit' : '') }, g);
    el('line', { x1: -14, y1: 12, x2: 14, y2: 12, class: 'ckbar' }, g);
    if (burnt) txt(p, x + 34, y + 5, '⚠', 'ckwarn', 'start');
    return g;
  }

  function drawLed() {
    var m = ledModel(), svg = newSvg('A circuit: pin 0, a resistor, an LED and GND');
    microbit(svg, [{ name: '0', y: 80 }, { name: 'GND', y: 220 }]);
    var live = m.i > 0;
    // pin wire: pad → x 250 (or straight to the LED's top when the resistor is after)
    var top = 'M158,80 L250,80', topR = 'M250,80 L330,80', topL = 'M330,80 L440,80 L440,128';
    var bot = 'M440,172 L440,220 L330,220', botR = 'M330,220 L250,220', botL = 'M250,220 L158,220';
    wire(svg, top, live, st.w); wire(svg, topR, live); wire(svg, topL, live);
    wire(svg, bot, live); wire(svg, botR, live); wire(svg, botL, live, st.c);
    if (st.w) txt(svg, 205, 66, 'unclipped', 'ckcut');
    if (st.c) txt(svg, 205, 244, 'unclipped', 'ckcut');
    var rlab = st.r ? fmtOhms(st.r) : 'no resistor';
    if (st.r) resistor(svg, 290, st.b ? 80 : 220, false, rlab);
    else txt(svg, 290, st.b ? 66 : 244, rlab, 'ckval');
    led(svg, 440, 150, st.f, m.glow, m.x);
    txt(svg, 478, 146, st.f ? 'LED (turned round)' : 'LED', 'ckval', 'start');
    if (!spec.hide) txt(svg, 478, 166, live ? m.label : '0 mA', 'ckamp', 'start');
    ui.leds.forEach(function (e) { e.classList.remove('on'); });
  }
  function newSvg(label) {
    var host = B.el('board'); host.replaceChildren();
    return el('svg', { viewBox: '0 0 640 300', class: 'cksvg', role: 'img', 'aria-label': label }, host);
  }
  function fmtOhms(r) { return r >= 1000 ? B.fmt(r / 1000) + ' kΩ' : r + ' Ω'; }

  function ledModel() {
    var k = !st.w && !st.c ? 1 : 0, i = 0, label = '';
    if (k && st.o && !st.f) {
      if (!st.r) { i = 100; label = 'about 100 mA: far too much'; }
      else { i = Math.max(0, (VS - VF) / st.r * 1000); label = (i < 0.1 ? i.toFixed(2) : r1(i)) + ' mA'; }
    }
    var glow = i >= 0.1 ? Math.min(1, 0.12 + i / 16) : 0;
    return { k: k, i: i, label: label, glow: glow, x: i > IMAX ? 1 : 0, l: i >= 0.1 ? 1 : 0 };
  }

  function drawButton() {
    var svg = newSvg('A button from 3V to pin 0' + (st.d ? ', with a pull-down resistor to GND' : ''));
    microbit(svg, [{ name: '3V', y: 60 }, { name: '0', y: 150 }, { name: 'GND', y: 240 }]);
    var live = !!st.p;
    wire(svg, 'M158,60 L250,60', live); wire(svg, 'M310,60 L420,60 L420,150 L158,150', live);
    // the button: two contacts and a lever
    el('circle', { cx: 252, cy: 60, r: 4, class: 'ckdot' }, svg); el('circle', { cx: 308, cy: 60, r: 4, class: 'ckdot' }, svg);
    el('line', { x1: 252, y1: 60, x2: 308, y2: st.p ? 60 : 38, class: 'ckswitch' }, svg);
    txt(svg, 280, 92, st.p ? 'button (held)' : 'button', 'ckval');
    if (st.d) {
      wire(svg, 'M420,150 L420,205', false); wire(svg, 'M420,275 L420,282 L170,282 L170,240 L158,240', false);
      resistor(svg, 420, 240, true, '10 kΩ pull-down');
    } else txt(svg, 470, 230, 'no pull-down: pin 0 is joined to nothing when the button is up', 'ckcut', 'middle');
    txt(svg, 470, 140, 'pin 0 reads ' + st.v, 'ckamp', 'start');
    heart(st.v === 1);
  }
  var HEART = [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0];
  function heart(show) { ui.leds.forEach(function (e, i) { e.classList.toggle('on', !!(show && HEART[i])); }); }

  function sensorModel() {
    var a = Math.round(st.s / 100 * 1023), u = Math.round(a / 1023 * VS * 100) / 100;
    return { a: a, u: u, l: spec.night && a < st.t ? 1 : 0 };
  }
  function drawSensor() {
    var m = sensorModel(), pot = spec.sensor === 'pot';
    var svg = newSvg(pot ? 'A knob (potentiometer) between 3V and GND, its middle into pin 0' : 'A light sensor and a 10 kΩ resistor in a divider into pin 0');
    microbit(svg, [{ name: '3V', y: 60 }, { name: '0', y: 150 }, { name: 'GND', y: 240 }]);
    wire(svg, 'M158,60 L420,60 L420,75', true); wire(svg, 'M420,225 L420,240 L158,240', true);
    if (pot) {
      el('rect', { x: 408, y: 75, width: 24, height: 150, rx: 5, class: 'ckres' }, svg);
      var wy = 225 - st.s / 100 * 150;
      el('path', { d: 'M158,150 L390,150 L390,' + wy.toFixed(1) + ' L398,' + wy.toFixed(1), class: 'ckwire live' }, svg);
      el('path', { d: 'M405,' + wy.toFixed(1) + ' l-9,-6 l0,12 Z', class: 'ckarrow' }, svg);
      txt(svg, 444, 140, 'knob', 'ckval', 'start'); txt(svg, 444, 160, st.s + '% of the way up', 'ckval', 'start');
    } else {
      el('rect', { x: 408, y: 75, width: 24, height: 60, rx: 5, class: 'ckldr' }, svg);
      txt(svg, 444, 110, 'light sensor', 'ckval', 'start');
      resistor(svg, 420, 195, true, '10 kΩ');
      wire(svg, 'M420,135 L420,165', true);
      el('path', { d: 'M420,150 L158,150', class: 'ckwire live' }, svg);
      el('circle', { cx: 420, cy: 150, r: 4, class: 'ckdot' }, svg);
      var sun = el('g', { transform: 'translate(560,60)' }, svg);
      el('circle', { r: 10 + st.s / 8, class: 'cksun', 'fill-opacity': (0.15 + st.s / 120).toFixed(2) }, sun);
      txt(svg, 560, 112, 'light ' + st.s + '%', 'ckval');
    }
    var read = (spec.hide ? 'pin 0 reads ?' : 'pin 0 reads ' + m.a) + (spec.novolts ? '' : '  (' + m.u.toFixed(2) + ' V)');
    txt(svg, 200, 24, read, 'ckamp', 'start');
    ui.leds.forEach(function (e) { e.classList.toggle('on', !!m.l); });
  }

  // ---------- panel ----------
  function btn(text, fn, quiet, label) { var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label); if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e; }
  function slider(label, min, max, val, fn) {
    var w = document.createElement('label'); w.className = 'ckslide'; w.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'range'; i.min = min; i.max = max; i.value = val; i.setAttribute('aria-label', label);
    i.addEventListener('input', function () { fn(Number(i.value)); }); w.appendChild(i); return w;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    var act = function (fn) { return function () { fn(); B.moved = true; draw(); report(); }; };
    if (spec.mode === 'led') {
      if (on(spec.pinbtn)) row.appendChild(btn('Pin 0 on / off', act(function () { st.o = st.o ? 0 : 1; }), false, 'Switch pin 0 on or off'));
      if (on(spec.unclip)) {
        row.appendChild(btn('Unclip / clip the pin 0 wire', act(function () { st.w = st.w ? 0 : 1; }), true));
        row.appendChild(btn('Unclip / clip the GND wire', act(function () { st.c = st.c ? 0 : 1; }), true));
      }
      if (on(spec.choose)) {
        var lab = document.createElement('label'); lab.textContent = 'Resistor ';
        var s = document.createElement('select');
        [0, 47, 100, 220, 470, 1000, 10000].forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v ? fmtOhms(v) : 'none'; s.appendChild(o); });
        if ([0, 47, 100, 220, 470, 1000, 10000].indexOf(st.r) < 0) { var o = document.createElement('option'); o.value = st.r; o.textContent = fmtOhms(st.r); s.appendChild(o); }
        s.value = String(st.r); s.addEventListener('change', act(function () { st.r = Number(s.value); }));
        lab.appendChild(s); row.appendChild(lab);
      }
      if (spec.quick) spec.quick.split(',').forEach(function (t) {
        var v = Number(t.trim()); if (!(v >= 0)) return;
        row.appendChild(btn(v ? fmtOhms(v) : 'No resistor', act(function () { st.r = v; }), true, v ? 'Use a ' + fmtOhms(v) + ' resistor' : 'Take the resistor out'));
      });
      if (on(spec.move)) row.appendChild(btn('Move the resistor', act(function () { st.b = st.b ? 0 : 1; }), true, 'Move the resistor to the other side of the LED'));
      if (on(spec.flip)) row.appendChild(btn('Turn the LED round', act(function () { st.f = st.f ? 0 : 1; }), true));
    } else if (spec.mode === 'button') {
      var hold = btn('Hold the button', function () {}, false, 'Hold the button (press and hold, or hold Space)');
      var down = function (e) { if (e) e.preventDefault(); if (st.p) return; st.p = 1; st.n++; B.moved = true; settle(); };
      var up = function () { if (!st.p) return; st.p = 0; B.moved = true; settle(); };
      hold.addEventListener('pointerdown', down); hold.addEventListener('pointerup', up); hold.addEventListener('pointerleave', up);
      hold.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { if (!e.repeat) down(e); else e.preventDefault(); } });
      hold.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') up(); });
      row.appendChild(hold);
      if (on(spec.toggle)) row.appendChild(btn('Add / remove the pull-down', function () { st.d = st.d ? 0 : 1; B.moved = true; settle(); }, true));
    } else {
      row.appendChild(slider(spec.sensor === 'pot' ? 'Knob' : 'Light', 0, 100, st.s, function (v) { st.s = v; B.moved = true; draw(); report(); }));
      if (spec.tedit) row.appendChild(slider('Threshold', 0, 1023, st.t, function (v) { st.t = v; B.moved = true; draw(); report(); }));
    }
    row.appendChild(btn('Start again', function () { B.restart(); }, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; panel.appendChild(ui.note);
  }

  // button mode: a floating pin picks up noise and reads 0 or 1 at random
  function settle() {
    if (flt) { clearInterval(flt); flt = null; }
    var read = function () { st.v = st.p ? 1 : (st.d ? 0 : (Math.random() < 0.5 ? 1 : 0)); if (!st.p && !st.d) st.z = 1; };
    read(); draw(); report();
    if (!st.p && !st.d) flt = setInterval(function () { read(); draw(); report(); }, 450);
  }

  function draw() { if (spec.mode === 'led') drawLed(); else if (spec.mode === 'button') drawButton(); else drawSensor(); }

  function report() {
    var vars, facts, note = '';
    if (spec.mode === 'led') {
      var m = ledModel();
      vars = { k: m.k, o: st.o, i: Math.round(m.i * 100) / 100, r: st.r, b: st.b, f: st.f, w: st.w, c: st.c, l: m.l, x: m.x };
      facts = 'Pin 0 ' + (st.o ? 'on (3.3 V)' : 'off (0 V)') + ' · loop ' + (m.k ? 'complete' : 'broken') + ' · resistor ' + (st.r ? fmtOhms(st.r) : 'none') + (spec.hide ? '' : ' · current ' + (m.i ? m.label : '0 mA'));
      if (m.x) note = 'Too much current: over the LED\'s 20 mA. A real LED (and the pin) would be damaged.';
      else if (!m.k) note = 'The loop is broken, so no current flows.';
      else if (st.f && st.o) note = 'An LED only lets current through one way round.';
      else if (m.l && m.i < 1) note = 'Very little current: the LED is only just glowing.';
      B.say(m.l ? 'The LED is lit.' : 'The LED is off.');
    } else if (spec.mode === 'button') {
      vars = { p: st.p, v: st.v, n: st.n, d: st.d, z: st.z };
      facts = 'Button ' + (st.p ? 'held' : 'up') + ' · pin 0 reads ' + st.v + ' · presses ' + st.n + ' · pull-down ' + (st.d ? 'fitted' : 'none');
      if (!st.d && !st.p) note = 'Nothing pulls pin 0 to 0, so it picks up noise and reads 0 or 1 at random.';
      B.say('Pin 0 reads ' + st.v + (st.v ? ': the micro:bit shows a heart.' : '.'));
    } else {
      var s = sensorModel();
      vars = { a: s.a, u: s.u, s: st.s, t: st.t, l: s.l };
      facts = (spec.sensor === 'pot' ? 'Knob ' : 'Light ') + st.s + '%' + (spec.hide ? '' : ' · reading ' + s.a + ' of 1023') + (spec.novolts ? '' : ' · ' + s.u.toFixed(2) + ' V') + (spec.night ? ' · night light on below ' + st.t + ': ' + (s.l ? 'ON' : 'off') : '');
      B.say((spec.hide ? 'Pin 0 reads a number.' : 'Pin 0 reads ' + s.a + '.') + (spec.night ? (s.l ? ' The lights are on.' : ' The lights are off.') : ''));
    }
    ui.facts.textContent = facts; ui.note.textContent = note;
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, facts);
  }

  B.widget('circuit', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A circuit on a micro:bit'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      if (flt) { clearInterval(flt); flt = null; }
      spec = B.spec;
      st = { o: off(spec.output) ? 0 : 1, r: spec.R, b: spec.after ? 0 : 1, f: on(spec.turned) ? 1 : 0, w: 0, c: off(spec.gnd) ? 1 : 0,
        p: 0, v: 0, n: 0, d: off(spec.pulldown) ? 0 : 1, z: 0, s: spec.lev, t: spec.t0 };
      var sv = fresh ? null : B.saved();
      if (sv && sv.st) Object.keys(st).forEach(function (k) { if (typeof sv.st[k] === 'number') st[k] = sv.st[k]; });
      st.p = 0;
      paintPanel();
      if (spec.mode === 'button') settle(); else { draw(); report(); }
    },
  });
})(WPB);
