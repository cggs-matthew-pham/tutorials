// An Arduino Uno running a small sketch (Engineering › Physical computing). Not a compiler: the sketch is turned into
// JavaScript and run against a simple model of the board, so lessons can run, change and check Arduino C++ in the
// browser. Supported: setup() and loop(), your own functions, int / long / float / bool / byte / const variables,
// if / else / for / while, pinMode, digitalWrite, digitalRead, analogRead, analogWrite, delay, millis, map, constrain,
// Serial.begin / print / println, HIGH LOW OUTPUT INPUT INPUT_PULLUP A0–A5. Time is simulated: delay(500) is 500 ms
// of board time (shown in real time), so timings are exact. Like the real board: a missing ; stops the upload, an
// undeclared name is an error, = inside if assigns, "words" + n moves along the text instead of joining, analogWrite
// keeps only the low 8 bits (300 acts like 44), a pin written HIGH without pinMode(pin, OUTPUT) only glows
// dimly (the pull-up), analogWrite on a non-PWM pin is just on or off, and analogRead gives 0–1023 for 0–5 V.
//   widget: arduino
//   led: 13            an LED (with its resistor) on pin 13; up to two: led: 13, 9
//   knob: A0           a potentiometer on A0 (a slider)         button: 2   a button on pin 2 (with a pull-down)
//   level: 50          the knob's starting position, %          wave: on    draw each LED pin's signal (PWM)
//   edit: off          the code can be run but not changed       run: on     start running as soon as it loads
//   test: 250, on      a test case for Run the tests: knob reading, and the first LED on (steady), off or blink
//   code: void setup() {     one line of the sketch per code: line (indentation is put back from the braces)
// state: { scope: { vars: { e (1 = an error stopped it), g (1 = running), l (first LED's brightness 0–255),
//   h (times the first LED came on), o and f (its last on and off times, ms of board time), t (loop() runs),
//   s (setup() runs), m (1 = the first LED's pin set to OUTPUT), w (its analogWrite value, −1 if none),
//   n (lines printed), p (the last printed line as a number, −1 if not a number), j (the number at the end of a last
//   line that starts with words, −1 if none), x (1 = "words" + a number was printed), k (knob 0–1023), b (button held), q and u (tests passed, of how many) } } }
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', PWM = [3, 5, 6, 9, 10, 11];
  var spec = null, ui = {}, hw = {}, run = null, code = '';
  var on = function (s) { return /^on$/i.test(s || ''); };

  function parse(s) {
    s.leds = String(s.led || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean).map(Number);
    if (s.leds.some(function (p) { return !(p >= 2 && p <= 13 && p === Math.round(p)); }) || s.leds.length > 2) throw new Error('led: one or two digital pins from 2 to 13, such as 13 or 13, 9.');
    s.knob = s.knob ? String(s.knob).trim().toUpperCase() : null;
    if (s.knob && !/^A[0-5]$/.test(s.knob)) throw new Error('knob: an analog pin, A0 to A5.');
    s.btn = s.button === undefined ? null : Number(s.button);
    if (s.btn !== null && !(s.btn >= 2 && s.btn <= 13)) throw new Error('button: a digital pin from 2 to 13.');
    s.lev = s.level === undefined ? 50 : Number(s.level);
    s.lines = s.items.filter(function (it) { return it.kind === 'code'; }).map(function (it) { return it.value; });
    s.code = indent(s.lines.join('\n'));
    s.tests = s.items.filter(function (it) { return it.kind === 'test'; }).map(function (it) {
      var m = /^(\d+)\s*,\s*(on|off|blink)$/i.exec(it.value.trim());
      if (!m || Number(m[1]) > 1023) throw new Error('test: a reading 0 to 1023 and what the LED should do (on, off or blink), such as test: 250, on.');
      if (!s.knob) throw new Error('test: needs a knob, such as knob: A0.');
      return { k: Number(m[1]), want: m[2].toLowerCase() };
    });
    s.ro = /^off$/i.test(s.edit || ''); s.wave = on(s.wave); s.auto = on(s.run);
  }
  function indent(src) {
    var d = 0;
    return src.split('\n').map(function (l) {
      var t = l.trim(), lead = t.match(/^}+/); if (lead) d = Math.max(0, d - lead[0].length);
      var out = (t ? new Array(d + 1).join('  ') : '') + t;
      d += (t.match(/{/g) || []).length - (t.match(/}/g) || []).length + (lead ? lead[0].length : 0);
      d = Math.max(0, d); return out;
    }).join('\n');
  }

  // ---------- C++ subset → JavaScript ----------
  var TYPES = '(?:const\\s+)?(?:unsigned\\s+)?(?:int|long|float|double|bool|boolean|byte)';
  function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, function (m) { return m.replace(/[^\n]/g, ' '); }).replace(/\/\/.*$/gm, '').replace(/"(?:[^"\\]|\\.)*"/g, function (m) { return m; });
  }
  function fail(line, msg) { var e = new Error(msg); e.line = line; throw e; }
  function check(src) {
    var lines = stripComments(src).split('\n'), depth = 0, paren = 0;
    lines.forEach(function (raw, i) {
      var t = raw.replace(/"(?:[^"\\]|\\.)*"/g, '""').trim();
      if (!t) return;
      depth += (t.match(/{/g) || []).length - (t.match(/}/g) || []).length;
      paren += (t.match(/\(/g) || []).length - (t.match(/\)/g) || []).length;
      if (depth < 0) fail(i + 1, "expected declaration before '}' token (an extra })");
      if (paren !== 0 && !/[,(]$/.test(t)) fail(i + 1, "expected ')' (a bracket is not closed)");
      if (/[;{},(]$/.test(t) || /^}/.test(t) && /[;{}]$/.test(t)) return;
      if (/^(if|else|for|while)\b/.test(t) || /^else$/.test(t)) return;
      if (new RegExp('^(void|' + TYPES.replace(/^\(\?:const\\s\+\)\?/, '') + ')\\s+\\w+\\s*\\([^)]*\\)$').test(t)) return;
      fail(i + 1, "expected ';' at the end of this line");
    });
    if (depth > 0) fail(lines.length, "expected '}' at end of input (a { is not closed)");
  }
  function transpile(src) {
    check(src);
    var s = stripComments(src), fns = [], ints = {};
    // function definitions
    s = s.replace(new RegExp('(?:void|' + TYPES + ')\\s+(\\w+)\\s*\\(([^)]*)\\)\\s*(?=\\{|\\n|$)', 'g'), function (m, name, params) {
      fns.push(name);
      var ps = params.trim() === 'void' ? '' : params.split(',').map(function (p) { return p.trim().split(/\s+/).pop(); }).filter(Boolean).join(', ');
      return '__FNDEF__ ' + name + '(' + ps + ')';
    });
    // declarations: remember whole-number variables so their values stay whole, as in C++
    s = s.replace(new RegExp('\\b(' + TYPES + ')\\s+(\\w+)\\s*(=\\s*([^;]+))?;', 'g'), function (m, type, name, eq, expr) {
      var whole = !/float|double|bool/.test(type); if (whole) ints[name] = 1;
      return 'let ' + name + (eq ? ' = ' + (whole ? '__int(' + expr + ')' : expr) : ' = 0') + ';';
    });
    s = s.replace(/(^|[;{}\s])(\w+)\s*=\s*([^=;\n][^;\n]*);/g, function (m, pre, name, expr) {
      return ints[name] && !/^let$/.test(name) ? pre + name + ' = __int(' + expr + ');' : m;
    });
    s = s.replace(/\bdelay\s*\(/g, 'await delay(');
    fns.forEach(function (f) { s = s.replace(new RegExp('(^|[^\\w.])' + f + '\\s*\\(', 'g'), function (m, pre) { return pre + 'await ' + f + '('; }); });
    s = s.replace(/__FNDEF__ await (\w+)\(/g, 'async function $1(').replace(/await await /g, 'await ');
    s = s.replace(/\btrue\b/g, 'true').replace(/\bboolean\b/g, '');
    // "words" + number moves along the text (pointer arithmetic) instead of joining: the real board prints the
    // end of the words, or nonsense once it runs past them
    s = s.replace(/Serial\.print(ln)?\s*\(\s*("(?:[^"\\]|\\.)*")\s*\+\s*([^;]*)\)\s*;/g, 'Serial.print$1(__ptr($2, $3));');
    if (fns.indexOf('setup') < 0) fail(1, "undefined reference to 'setup' (every sketch needs void setup())");
    if (fns.indexOf('loop') < 0) fail(1, "undefined reference to 'loop' (every sketch needs void loop())");
    return '"use strict";\n' + s + '\nreturn { setup: setup, loop: loop };';
  }

  // ---------- the board model ----------
  function resetHw() {
    hw = { pins: {}, knob: Math.round(spec.lev / 100 * 1023), btn: 0, now: 0, serial: [], ser: false,
      warn: 0, led: spec.leds.map(function () { return { lvl: 0, h: 0, at: 0, o: 0, f: 0, wasOn: false, trace: [] }; }), t: 0, s: 0, err: null };
  }
  function pin(p) { if (!hw.pins[p]) hw.pins[p] = { mode: 'INPUT', out: 0, pwm: null }; return hw.pins[p]; }
  function level(p) {
    var q = hw.pins[p]; if (!q) return 0;
    if (q.mode === 'OUTPUT') return q.pwm !== null ? q.pwm : (q.out ? 255 : 0);
    return q.out ? 20 : 0;   // HIGH written to an input: the pull-up lights the LED dimly
  }
  function touch() {
    spec.leds.forEach(function (p, i) {
      var L = hw.led[i], v = level(p), isOn = v > 0;
      if (isOn && !L.wasOn) { L.h++; if (L.at || L.h > 1) L.f = hw.now - L.at; L.at = hw.now; }
      if (!isOn && L.wasOn) { L.o = hw.now - L.at; L.at = hw.now; }
      L.wasOn = isOn; L.lvl = v;
      L.trace.push([hw.now, v]); if (L.trace.length > 400) L.trace.shift();
    });
  }
  function pinNo(p) { if (typeof p === 'string') return p; return Number(p); }
  function api(token) {
    var A = { HIGH: 1, LOW: 0, OUTPUT: 'OUTPUT', INPUT: 'INPUT', INPUT_PULLUP: 'INPUT_PULLUP', A0: 'A0', A1: 'A1', A2: 'A2', A3: 'A3', A4: 'A4', A5: 'A5', LED_BUILTIN: 13 };
    A.__int = function (v) { return typeof v === 'boolean' ? (v ? 1 : 0) : Math.trunc(Number(v)); };
    A.__ptr = function (str, n) {
      n = Math.trunc(Number(n)) || 0; hw.warn = 1;
      if (n >= 0 && n <= str.length) return str.slice(n);
      var junk = ''; for (var i = 0; i < 6; i++) junk += String.fromCharCode(0x2591 + ((n * 7 + i * 13) % 3)); return junk;
    };
    A.pinMode = function (p, m) { var q = pin(pinNo(p)); q.mode = m; if (m === 'INPUT_PULLUP') q.out = 1; touch(); };
    A.digitalWrite = function (p, v) { var q = pin(pinNo(p)); q.out = v ? 1 : 0; q.pwm = null; touch(); };
    A.analogWrite = function (p, v) {
      var q = pin(pinNo(p)); v = ((Math.trunc(Number(v)) % 256) + 256) % 256;   // only the low 8 bits reach the timer, so 300 acts like 44
      q.mode = 'OUTPUT';   // analogWrite sets the pin to output itself
      if (PWM.indexOf(Number(p)) >= 0) { q.pwm = v; q.out = v > 0 ? 1 : 0; } else { q.pwm = null; q.out = v >= 128 ? 1 : 0; }
      touch();
    };
    A.digitalRead = function (p) {
      p = pinNo(p);
      if (p === spec.btn) return hw.btn ? 1 : (pin(p).mode === 'INPUT_PULLUP' ? 1 : 0);
      var q = hw.pins[p]; return q && q.mode === 'INPUT_PULLUP' ? 1 : 0;
    };
    A.analogRead = function (p) { return String(p).toUpperCase() === spec.knob ? hw.knob : 0; };
    A.delay = function (ms) {
      ms = Math.max(0, Number(ms) || 0);
      return new Promise(function (res, rej) {
        if (token.stop) return rej(new Error('stopped'));
        if (token.fast) { hw.now += ms; touch(); return res(); }   // the test runner: no waiting
        var t0 = performance.now(), start = hw.now;
        (function tick() {
          if (token.stop) return rej(new Error('stopped'));
          var dt = performance.now() - t0;
          hw.now = start + Math.min(ms, dt); touch(); paint();
          if (dt >= ms) { hw.now = start + ms; res(); } else token.timer = setTimeout(tick, Math.min(40, ms - dt));
        })();
      });
    };
    A.millis = function () { return Math.round(hw.now); };
    A.map = function (x, a, b, c, d) { return Math.trunc((x - a) * (d - c) / (b - a) + c); };
    A.constrain = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
    A.abs = Math.abs; A.min = Math.min; A.max = Math.max;
    var line = '';
    function out(v, nl) {
      if (!hw.ser) { return; }   // nothing appears until Serial.begin
      line += typeof v === 'number' && !Number.isInteger(v) ? v.toFixed(2) : String(v);
      if (nl) { hw.serial.push(line); if (hw.serial.length > 200) hw.serial.shift(); line = ''; }
    }
    A.Serial = { begin: function () { hw.ser = true; }, print: function (v) { out(v, false); }, println: function (v) { out(v === undefined ? '' : v, true); } };
    return A;
  }

  // Run every test case: a fresh board with the knob at the case's reading, 3 s of board time, then compare what the
  // first LED did with what the case wants (off: never on; on: came on once and stayed on; blink: came on two or more times).
  async function runTests() {
    stop(); code = ui.ed ? ui.ed.value : spec.code; B.moved = true;
    var js; try { js = transpile(code); } catch (e) { resetHw(); hw.err = 'Line ' + (e.line || 1) + ': ' + e.message; ui.status.textContent = 'Not uploaded. ' + hw.err; paint(); lastAt = 0; report(); return; }
    var results = [];
    for (var i = 0; i < spec.tests.length; i++) {
      var T = spec.tests[i]; resetHw(); hw.knob = T.k;
      var token = { stop: false, fast: true }, A = api(token), names = Object.keys(A), got = 'off';
      try {
        var prog = await new (Object.getPrototypeOf(async function () {}).constructor)(names.join(','), js).apply(null, names.map(function (k) { return A[k]; }));
        await prog.setup(); var n = 0;
        while (hw.now < 3000 && n < 5000) { var t0 = hw.now; await prog.loop(); n++; if (hw.now === t0) hw.now += 0.5; }
        var L = hw.led[0] || { h: 0 }; got = L.h >= 2 ? 'blink' : L.h >= 1 ? 'on' : 'off';
      } catch (e) { got = 'error'; }
      var ok = got === T.want;
      results.push({ k: T.k, want: T.want, got: got, ok: ok });
    }
    resetHw(); hw.tests = results;
    var pass = results.filter(function (r) { return r.ok; }).length;
    ui.status.textContent = 'Tests: ' + pass + ' of ' + results.length + ' passed.';
    ui.mon.hidden = false;
    ui.mon.textContent = results.map(function (r) { return (r.ok ? '✓ ' : '✗ ') + 'reading ' + r.k + ': wanted ' + r.want + ', got ' + r.got; }).join('\n');
    lastAt = 0; report();
  }

  function stop(msg) {
    if (run) { run.stop = true; clearTimeout(run.timer); run = null; }
    if (msg !== undefined) { ui.status.textContent = msg; }
    lastAt = 0; paint(); report();
  }
  function start() {
    stop();
    code = ui.ed ? ui.ed.value : spec.code;
    resetHw(); ui.status.textContent = ''; if (ui.mon) ui.mon.hidden = !/Serial/.test(code);
    var js;
    try { js = transpile(code); } catch (e) {
      hw.err = 'Line ' + (e.line || 1) + ': ' + e.message;
      ui.status.textContent = 'Not uploaded. ' + hw.err; B.moved = true; paint(); report(); return;
    }
    var token = { stop: false }, A = api(token), names = Object.keys(A);
    var factory;
    try { factory = new (Object.getPrototypeOf(async function () {}).constructor)(names.join(','), js); } catch (e) {
      hw.err = 'This sketch uses C++ the board cannot run here (' + e.message + ').';
      ui.status.textContent = 'Not uploaded. ' + hw.err; B.moved = true; paint(); report(); return;
    }
    run = token; B.moved = true; ui.status.textContent = 'Uploaded. Running…';
    var args = names.map(function (k) { return A[k]; });
    (async function () {
      try {
        var prog = await factory.apply(null, args);
        hw.s++; await prog.setup(); touch(); paint(); report();
        var spin = 0;
        while (!token.stop) {
          var t0 = hw.now;
          await prog.loop(); hw.t++;
          if (hw.now === t0) { hw.now += 0.01; if (++spin % 200 === 0) { await new Promise(function (r) { token.timer = setTimeout(r, 0); }); paint(); report(); } }
          report();
          if (hw.t > 200000 && hw.now === t0) break;
        }
      } catch (e) {
        if (token.stop) return;
        var m = /(\w+) is not defined/.exec(e.message);
        var where = m ? code.split('\n').findIndex(function (l) { return new RegExp('\\b' + m[1] + '\\b').test(l.replace(/\/\/.*$/, '')); }) + 1 : 0;
        if (m) resetHw();   // the real compiler would have refused it: nothing ran
        hw.err = m ? 'Line ' + (where || 1) + ": '" + m[1] + "' was not declared in this scope" : 'Stopped: ' + e.message;
        ui.status.textContent = (m ? 'Not uploaded. ' : '') + hw.err;
        run = null; paint(); report();
      }
    })();
  }

  // ---------- drawing ----------
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function txt(p, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, class: cls || 'ckval', 'text-anchor': anchor || 'middle' }, p); e.textContent = t; return e; }
  function draw() {
    var host = B.el('board'); host.replaceChildren(); host.classList.add('ardhost');
    var svg = el('svg', { viewBox: '0 0 640 230', class: 'cksvg ardsvg', role: 'img', 'aria-label': 'An Arduino Uno' + (spec.leds.length ? ' with an LED on pin ' + spec.leds.join(' and pin ') : '') + (spec.knob ? ', a knob on ' + spec.knob : '') + (spec.btn !== null ? ', a button on pin ' + spec.btn : '') }, host);
    el('rect', { x: 20, y: 30, width: 230, height: 170, rx: 10, class: 'ardboard' }, svg);
    txt(svg, 135, 125, 'UNO', 'ardname');
    ui.parts = []; var y = 30;
    spec.leds.forEach(function (p, i) {
      var py = 50 + i * 70;
      el('rect', { x: 232, y: py - 9, width: 20, height: 18, rx: 3, class: 'ckpad' }, svg); txt(svg, 226, py + 5, String(p), 'ardlab', 'end');
      el('path', { d: 'M252,' + py + ' L330,' + py, class: 'ckwire' }, svg);
      el('rect', { x: 330, y: py - 8, width: 46, height: 16, rx: 4, class: 'ckres' }, svg);
      el('path', { d: 'M376,' + py + ' L420,' + py, class: 'ckwire' }, svg);
      var g = el('g', { transform: 'translate(440,' + py + ') rotate(-90)' }, svg);
      var glow = el('circle', { r: 26, class: 'ckglow', 'fill-opacity': 0 }, g);
      var body = el('path', { d: 'M-12,-10 L12,-10 L0,10 Z', class: 'ckled' }, g); el('line', { x1: -12, y1: 10, x2: 12, y2: 10, class: 'ckbar' }, g);
      el('path', { d: 'M460,' + py + ' L470,' + py + ' L470,' + (py + 20) + ' M460,' + (py + 20) + ' L480,' + (py + 20), class: 'ckwire' }, svg);
      txt(svg, 470, py + 36, 'GND', 'ardpin');
      var wave = spec.wave ? el('path', { class: 'ardwave' }, svg) : null;
      var read = txt(svg, 496, py + 5, '', 'ardread', 'start');
      ui.parts.push({ glow: glow, body: body, wave: wave, read: read, y: py });
    });
    if (spec.knob) {
      var ky = 180; el('rect', { x: 232, y: ky - 9, width: 20, height: 18, rx: 3, class: 'ckpad' }, svg); txt(svg, 226, ky + 5, spec.knob, 'ardlab', 'end');
      el('path', { d: 'M252,' + ky + ' L330,' + ky, class: 'ckwire' }, svg);
      el('circle', { cx: 350, cy: ky, r: 16, class: 'ckres' }, svg); ui.knobHand = el('line', { x1: 350, y1: ky, x2: 350, y2: ky - 14, class: 'ckbar' }, svg);
      ui.knobRead = txt(svg, 380, ky + 5, '', 'ckamp', 'start');
    }
    if (spec.btn !== null) {
      var by = spec.knob ? 130 : 180; el('rect', { x: 232, y: by - 9, width: 20, height: 18, rx: 3, class: 'ckpad' }, svg); txt(svg, 226, by + 5, String(spec.btn), 'ardlab', 'end');
      el('path', { d: 'M252,' + by + ' L330,' + by, class: 'ckwire' }, svg);
      ui.lever = el('line', { x1: 330, y1: by, x2: 370, y2: by - 16, class: 'ckswitch' }, svg);
      el('path', { d: 'M370,' + by + ' L400,' + by, class: 'ckwire' }, svg); txt(svg, 410, by + 5, '5V', 'ardpin', 'start');
    }
    ui.counts = txt(svg, 30, 20, '', 'ckval', 'start');
    var mon = document.createElement('pre'); mon.className = 'ardmon'; mon.id = 'ardmon'; mon.setAttribute('aria-label', 'Serial monitor'); mon.setAttribute('aria-live', 'polite');
    host.appendChild(mon); ui.mon = mon; mon.hidden = !/Serial/.test(spec.code);
  }
  function paint() {
    if (!ui.parts) return;
    ui.parts.forEach(function (P, i) {
      var L = hw.led[i], k = L.lvl / 255;
      P.glow.setAttribute('fill-opacity', (k ? 0.12 + 0.5 * k : 0).toFixed(2));
      P.body.classList.toggle('lit', k > 0.05);
      P.body.style.fillOpacity = k ? (0.35 + 0.65 * k).toFixed(2) : '';
      var q = hw.pins[spec.leds[i]];
      P.read.textContent = q && q.mode === 'OUTPUT' ? (q.pwm !== null ? 'analogWrite ' + q.pwm : (q.out ? 'HIGH' : 'LOW')) : (q && q.out ? 'HIGH, not OUTPUT' : 'not set up');
      if (P.wave) {   // the PWM signal: on for value/255 of each cycle
        var d = 'M496,' + (P.y + 34), duty = q && q.mode === 'OUTPUT' ? (q.pwm !== null ? q.pwm / 255 : q.out) : 0;
        for (var c = 0; c < 6; c++) { var x0 = 496 + c * 16, x1 = x0 + 16 * duty; d += ' L' + x0 + ',' + (P.y + (duty > 0 ? 14 : 34)) + ' L' + x1.toFixed(1) + ',' + (P.y + (duty > 0 ? 14 : 34)) + ' L' + x1.toFixed(1) + ',' + (P.y + 34) + ' L' + (x0 + 16) + ',' + (P.y + 34); }
        P.wave.setAttribute('d', d);
      }
    });
    if (ui.knobHand) { var a = (-135 + 270 * hw.knob / 1023) * Math.PI / 180; ui.knobHand.setAttribute('x2', (350 + 14 * Math.sin(a)).toFixed(1)); ui.knobHand.setAttribute('y2', (180 - 14 * Math.cos(a)).toFixed(1)); ui.knobRead.textContent = 'reads ' + hw.knob; }
    if (ui.lever) { var by = spec.knob ? 130 : 180; ui.lever.setAttribute('y2', hw.btn ? by : by - 16); }
    ui.counts.textContent = run || hw.s ? 'setup() ran ' + hw.s + (hw.s === 1 ? ' time' : ' times') + ' · loop() ran ' + hw.t + (hw.t === 1 ? ' time' : ' times') + ' · ' + (hw.now / 1000).toFixed(1) + ' s' : 'Not running';
    if (ui.mon && !hw.tests) { ui.mon.textContent = hw.serial.slice(-12).join('\n') || (hw.ser ? '' : 'Serial monitor (nothing printed)'); ui.mon.scrollTop = ui.mon.scrollHeight; }
  }

  var lastSig = '', lastAt = 0;
  function report() {
    if (run && performance.now() - lastAt < 80) return; lastAt = performance.now();
    var L = hw.led[0] || { lvl: 0, h: 0, o: 0, f: 0 }, q = hw.pins[spec.leds[0]] || {};
    var last = hw.serial.length ? hw.serial[hw.serial.length - 1] : '', num = /^-?\d+(\.\d+)?$/.test(last.trim()) ? Number(last) : -1;
    var tail = /(-?\d+(?:\.\d+)?)\s*$/.exec(last), j = tail && !/^-?\d+(\.\d+)?$/.test(last.trim()) ? Number(tail[1]) : -1;
    var tp = hw.tests ? hw.tests.filter(function (r) { return r.ok; }).length : 0, tn = hw.tests ? hw.tests.length : 0;
    var vars = { q: tp, u: tn, j: j, x: hw.warn ? 1 : 0, e: hw.err ? 1 : 0, g: run ? 1 : 0, l: L.lvl, h: L.h, o: Math.round(L.o), f: Math.round(L.f), t: hw.t, s: hw.s,
      m: q.mode === 'OUTPUT' ? 1 : 0, w: q.pwm === null || q.pwm === undefined ? -1 : q.pwm, n: hw.serial.length, p: num, k: hw.knob, b: hw.btn };
    var sig = JSON.stringify(vars); if (sig === lastSig) return; lastSig = sig;
    B.save({ code: ui.ed ? ui.ed.value : spec.code });
    B.post({ scope: { vars: vars, points: {} } }, hw.err ? hw.err : (run ? 'Running' : 'Stopped') + ' · ' + ui.counts.textContent);
  }

  function btn(text, fn, quiet, label) { var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label); if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e; }
  function paintPanel(saved) {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var ed = document.createElement('textarea'); ed.className = 'ardcode'; ed.spellcheck = false; ed.setAttribute('aria-label', 'Arduino sketch');
    ed.value = saved || spec.code; ed.rows = Math.min(13, Math.max(6, ed.value.split('\n').length + 1));
    if (spec.ro) ed.readOnly = true;
    ed.addEventListener('keydown', function (e) { if (e.key === 'Tab' && !e.shiftKey && !spec.ro) { e.preventDefault(); var a = ed.selectionStart; ed.setRangeText('  ', a, ed.selectionEnd, 'end'); } });
    ui.ed = ed; panel.appendChild(ed);
    var row = document.createElement('div'); row.className = 'oprow';
    row.appendChild(btn('Upload and run', start));
    row.appendChild(btn('Stop', function () { B.moved = true; stop('Stopped.'); }, true));
    if (spec.tests.length) row.appendChild(btn('Run the tests', runTests, false, 'Run the sketch against every test case'));
    if (!spec.ro) row.appendChild(btn('Reset code', function () { ed.value = spec.code; stop(''); }, true, 'Put the starting code back'));
    if (spec.knob) {
      var w = document.createElement('label'); w.className = 'ckslide'; w.textContent = 'Knob ';
      var i = document.createElement('input'); i.type = 'range'; i.min = 0; i.max = 1023; i.value = hw.knob; i.setAttribute('aria-label', 'Knob');
      i.addEventListener('input', function () { hw.knob = Number(i.value); B.moved = true; paint(); report(); }); w.appendChild(i); row.appendChild(w);
    }
    if (spec.btn !== null) {
      var h = btn('Hold the button', function () {}, true, 'Hold the button (press and hold, or hold Space)');
      var down = function (e) { if (e) e.preventDefault(); hw.btn = 1; B.moved = true; paint(); report(); }, up = function () { if (!hw.btn) return; hw.btn = 0; paint(); report(); };
      h.addEventListener('pointerdown', down); h.addEventListener('pointerup', up); h.addEventListener('pointerleave', up);
      h.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) down(e); });
      h.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') up(); });
      row.appendChild(h);
    }
    panel.appendChild(row);
    ui.status = document.createElement('p'); ui.status.className = 'ardstatus'; ui.status.id = 'gnote'; ui.status.setAttribute('aria-live', 'polite'); panel.appendChild(ui.status);
  }

  B.arduinoTranspile = transpile;   // for tests
  B.widget('arduino', {
    sections: ['board', 'gpanel'],
    label: function () { return 'An Arduino Uno running a sketch'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); paint(); } },
    start: function (fresh) {
      if (run) { run.stop = true; clearTimeout(run.timer); run = null; }
      spec = B.spec; lastSig = '';
      var sv = fresh ? null : B.saved();
      resetHw(); draw(); paintPanel(sv && !spec.ro ? sv.code : null);
      B.say(spec.ro ? 'Upload the sketch to run it.' : 'Change the sketch, then upload it to run it.');
      paint(); report();
      if (spec.auto) start();
    },
  });
})(WPB);
