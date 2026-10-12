// Sound as numbers: a sound wave measured (sampled) at regular times, each measurement rounded to one of a set of
// levels. The stepped line is what the computer can play back from the numbers it stored.
//   widget: sampling
//   rate: 8                samples for each wave (2 to 32)
//   levels: 16             how many levels a sample can be (2 to 256)
//   waves: 2               waves shown (1 to 4)
//   sliders: rate, levels  which sliders to show (default both; none for a fixed picture)
//   wave: off              hide the original wave (show only the stored samples and the stepped line)
//   play: on               play buttons: the original tone and the one rebuilt from the numbers (Web Audio)
// state: { scope: { vars: { s (samples a wave), l (levels), n (numbers stored), e (how far the stepped line is from
//          the wave, as a percentage of its height, 1 decimal place) } } }
// Checks: "s = 16", "n = 32", "e < 4", "s = 4 and l = 256".
(function (B) {
  'use strict';
  var spec = null, rate = 8, lev = 16, ui = {}, actx = null;
  var LEVELS = [2, 4, 8, 16, 32, 64, 128, 256];

  function parse(s) {
    s.rate0 = s.rate === undefined ? 8 : Number(s.rate);
    if (!(s.rate0 >= 2 && s.rate0 <= 32 && s.rate0 % 1 === 0)) throw new Error('rate: a whole number from 2 to 32 (samples a wave).');
    s.lev0 = s.levels === undefined ? 16 : Number(s.levels);
    if (LEVELS.indexOf(s.lev0) < 0) throw new Error('levels: one of ' + LEVELS.join(', ') + '.');
    s.waves0 = s.waves === undefined ? 2 : Number(s.waves);
    if (!(s.waves0 >= 1 && s.waves0 <= 4 && s.waves0 % 1 === 0)) throw new Error('waves: 1 to 4.');
    var sl = String(s.sliders === undefined ? 'rate, levels' : s.sliders).toLowerCase();
    s.slRate = /rate/.test(sl); s.slLev = /levels/.test(sl);
    s.showWave = !/^off$/i.test(s.wave || '');
    s.play = /^on$/i.test(s.play || '');
  }

  // The wave, from −1 to 1, at time t (in waves).
  var wave = function (t) { return Math.sin(2 * Math.PI * t); };
  var q = function (v) { return Math.round((v + 1) / 2 * (lev - 1)); };          // the stored number, 0 to lev − 1
  var back = function (k) { return lev === 1 ? 0 : k / (lev - 1) * 2 - 1; };       // the level it plays back as
  var held = function (t) { return back(q(wave(Math.floor(t * rate + 1e-9) / rate))); };   // stepped: hold each sample
  function error() {
    var sum = 0, N = 2000;
    for (var i = 0; i < N; i++) { var t = i / N; sum += Math.abs(wave(t) - held(t)); }
    return Math.round(sum / N / 2 * 1000) / 10;
  }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var W = 640, H = 260, pad = 14, x0 = pad, x1 = W - pad, y = function (v) { return H / 2 - v * (H / 2 - pad - 4); };
    var X = function (t) { return x0 + t / spec.waves0 * (x1 - x0); };
    var NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('class', 'smsvg');
    svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'A sound wave sampled ' + rate + ' times a wave, each sample rounded to one of ' + lev + ' levels');
    var add = function (tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); svg.appendChild(e); return e; };
    // Level lines (only when there are few enough to see).
    if (lev <= 32) for (var k = 0; k < lev; k++) add('line', { x1: x0, x2: x1, y1: y(back(k)), y2: y(back(k)), class: 'smlev' });
    add('line', { x1: x0, x2: x1, y1: y(0), y2: y(0), class: 'smmid' });
    if (spec.showWave) {
      var d = '';
      for (var i = 0; i <= 400; i++) { var t = i / 400 * spec.waves0; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + y(wave(t)).toFixed(1); }
      add('path', { d: d, class: 'smwave' });
    }
    // Stepped line from the stored numbers, then the sample dots.
    var n = rate * spec.waves0, sd = '';
    for (var j = 0; j < n; j++) {
      var ta = j / rate, tb = (j + 1) / rate, v = back(q(wave(ta)));
      sd += (j ? 'L' : 'M') + X(ta).toFixed(1) + ' ' + y(v).toFixed(1) + 'L' + X(tb).toFixed(1) + ' ' + y(v).toFixed(1);
    }
    add('path', { d: sd, class: 'smstep' });
    for (var m = 0; m < n; m++) { var tt = m / rate; add('circle', { cx: X(tt).toFixed(1), cy: y(back(q(wave(tt)))).toFixed(1), r: 4.5, class: 'smdot' }); }
    el.appendChild(svg);
  }

  function slider(label, get, set, min, max, show) {
    var r = document.createElement('div'); r.className = 'srow';
    var n = document.createElement('span'); n.className = 'fname'; n.textContent = label;
    var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '−'; dn.setAttribute('aria-label', label + ': less');
    var s = document.createElement('input'); s.type = 'range'; s.min = min; s.max = max; s.step = 1; s.setAttribute('aria-label', label);
    var up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', label + ': more');
    var o = document.createElement('output');
    var put = function (i) { i = Math.max(min, Math.min(max, i)); set(i); B.moved = true; sync(); draw(); report(); };
    s.addEventListener('input', function () { put(Number(s.value)); });
    dn.addEventListener('click', function () { put(get() - 1); });
    up.addEventListener('click', function () { put(get() + 1); });
    var sync = function () { s.value = get(); o.textContent = show(); };
    ui.sync.push(sync);
    r.append(n, dn, s, up, o); return r;
  }

  function tone(rebuilt) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var f = 220, sr = actx.sampleRate, len = Math.floor(sr * 1.2), buf = actx.createBuffer(1, len, sr), data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) { var t = i / sr * f; data[i] = 0.2 * (rebuilt ? held(t % 1) : wave(t)) * Math.min(1, i / 400, (len - i) / 400); }
      var src = actx.createBufferSource(); src.buffer = buf; src.connect(actx.destination); src.start();
    } catch (e) { B.say('This browser cannot play sound here.'); }
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui.sync = [];
    if (spec.slRate) panel.appendChild(slider('Samples a wave', function () { return rate; }, function (v) { rate = v; }, 2, 32, function () { return rate; }));
    if (spec.slLev) panel.appendChild(slider('Levels', function () { return LEVELS.indexOf(lev); }, function (i) { lev = LEVELS[i]; }, 0, LEVELS.length - 1, function () { return lev; }));
    ui.sync.forEach(function (f) { f(); });
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    if (spec.play) {
      var p1 = document.createElement('button'); p1.type = 'button'; p1.textContent = '▶ Original'; p1.addEventListener('click', function () { tone(false); });
      var p2 = document.createElement('button'); p2.type = 'button'; p2.textContent = '▶ From the numbers'; p2.addEventListener('click', function () { tone(true); });
      bar.append(p1, p2);
    }
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    var n = rate * spec.waves0, e = error(), first = [];
    for (var j = 0; j < Math.min(rate, 12); j++) first.push(q(wave(j / rate)));
    ui.work.textContent = rate + ' samples a wave × ' + spec.waves0 + (spec.waves0 === 1 ? ' wave' : ' waves') + ' = ' + n + ' numbers, each one of ' + lev + ' levels (0 to ' + (lev - 1) + ')';
    ui.note.textContent = 'First wave stored as: ' + first.join(', ') + (rate > 12 ? ', …' : '') + '   ·   off from the wave by ' + e + '% on average';
    B.say(n + ' numbers stored; the stepped line is ' + e + '% off the wave');
    B.save({ rate: rate, lev: lev });
    B.post({ scope: { vars: { s: rate, l: lev, n: n, e: e }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('sampling', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A sound wave sampled and stored as numbers'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    resize: function () {},
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      rate = sv && sv.rate >= 2 && sv.rate <= 32 ? sv.rate : spec.rate0;
      lev = sv && LEVELS.indexOf(sv.lev) >= 0 ? sv.lev : spec.lev0;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
