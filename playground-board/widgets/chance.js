// Chance: a coin, a dice, a spinner or a bag of counters. Students run 1, 10, 100 or 1000 trials and watch the tally,
// the relative frequency of one outcome, and how it settles towards the probability as the trials add up.
//   widget: chance
//   device: coin | dice | spinner | bag
//   outcomes: red 2, blue 1, green 1   spinner sectors (sizes) or bag counters (how many of each); not for coin or dice
//   sides: 6                           a dice's faces (4, 6, 8, 10, 12 or 20)
//   watch: red                         the outcome graphed (default the first)
//   predict: off                       hide the probability column and line (students work it out); default on
//   seed: 7                            fixed randomness, for pictures and clips (default: different every time)
//   start: 20                          trials already run when the board opens
//   hide: on                           a mystery: the device is hidden (and predict is off), so students estimate
// state: { scope: { vars: { t (trials), c (times the watched outcome came up), f (its relative frequency, to 3 places),
//   p (its probability), e (how far f is from p), w (number of outcomes) } } }
// Checks: "t >= 100", "t >= 1000 and e < 0.05", "c = 3".
(function (B) {
  'use strict';
  var spec = null, ui = {}, counts = [], hist = [], last = -1, rnd = Math.random, t = 0;
  var MAX = 20000;
  var r3 = function (v) { return Math.round(v * 1000) / 1000; };
  var COLS = { red: '#d1495b', blue: '#2f6fb3', green: '#2e9e5b', yellow: '#e0b100', orange: '#e07a1f', purple: '#7a4fb3', black: '#333', white: '#f4f4f4', pink: '#e477a6' };

  function parse(s) {
    s.dev = String(s.device || 'coin').trim().toLowerCase();
    if (['coin', 'dice', 'spinner', 'bag'].indexOf(s.dev) < 0) throw new Error('device: coin, dice, spinner or bag.');
    if (s.dev === 'coin') s.out = [{ name: 'Heads', w: 1 }, { name: 'Tails', w: 1 }];
    else if (s.dev === 'dice') {
      var n = s.sides !== undefined ? Number(s.sides) : 6;
      if ([4, 6, 8, 10, 12, 20].indexOf(n) < 0) throw new Error('sides: 4, 6, 8, 10, 12 or 20.');
      s.out = []; for (var i = 1; i <= n; i++) s.out.push({ name: String(i), w: 1 });
    } else {
      if (!s.outcomes) throw new Error('outcomes: name each ' + (s.dev === 'bag' ? 'colour and how many counters' : 'sector and its size') + ', such as "outcomes: red 2, blue 1".');
      s.out = String(s.outcomes).split(',').map(function (x) {
        var m = /^\s*([A-Za-z][\w ]*?)\s+(\d+)\s*$/.exec(x);
        if (!m || !(Number(m[2]) > 0)) throw new Error('outcomes: "' + x.trim() + '" should be a name and a whole number, such as "red 2".');
        return { name: m[1], w: Number(m[2]) };
      });
      if (s.out.length < 2) throw new Error('outcomes: at least two.');
    }
    var tot = s.out.reduce(function (a, o) { return a + o.w; }, 0);
    s.out.forEach(function (o, i) { o.p = o.w / tot; o.col = COLS[o.name.toLowerCase()] || ['#2f6fb3', '#c2570a', '#2e9e5b', '#7a4fb3', '#d1495b', '#e0b100'][i % 6]; });
    s.total = tot;
    s.watchI = 0;
    if (s.watch !== undefined) { var wi = s.out.map(function (o) { return o.name.toLowerCase(); }).indexOf(String(s.watch).trim().toLowerCase()); if (wi < 0) throw new Error('watch: one of the outcomes (' + s.out.map(function (o) { return o.name; }).join(', ') + ').'); s.watchI = wi; }
    s.predict = !/^off$/i.test(s.predict || '');
    s.seedv = s.seed !== undefined ? Number(s.seed) : null;
    s.hidden = /^on$/i.test(s.hide || ''); if (s.hidden) s.predict = false;
    s.startN = s.start !== undefined ? Math.max(0, Math.min(MAX, Number(s.start) || 0)) : 0;
  }

  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  function once() {
    var r = rnd() * spec.total, i = 0;
    while (r >= spec.out[i].w) { r -= spec.out[i].w; i++; }
    counts[i]++; t++; last = i; hist.push(counts[spec.watchI]);
  }
  function run(n) { n = Math.min(n, MAX - t); for (var k = 0; k < n; k++) once(); B.moved = true; draw(); report(); }

  var NS = 'http://www.w3.org/2000/svg';
  function svg(tag, at, parent) { var e = document.createElementNS(NS, tag); Object.keys(at || {}).forEach(function (k) { e.setAttribute(k, at[k]); }); if (parent) parent.appendChild(e); return e; }

  function drawDevice(g, cx, cy, R) {
    var ink = B.css('--ink') || '#1d2430';
    if (spec.hidden) {
      svg('rect', { x: cx - R, y: cy - R * 0.8, width: R * 2, height: R * 1.6, rx: 12, fill: '#efe6d6', stroke: ink, 'stroke-width': 2 }, g);
      var q = svg('text', { x: cx, y: cy + R * 0.25, 'text-anchor': 'middle', 'font-size': R * 0.8, 'font-weight': 700, fill: ink }, g); q.textContent = '?';
      if (last >= 0) svg('circle', { cx: cx + R * 1.3, cy: cy - R * 0.6, r: 14, fill: spec.out[last].col, stroke: ink, 'stroke-width': 2 }, g);
      return;
    }
    if (spec.dev === 'coin') {
      svg('circle', { cx: cx, cy: cy, r: R, fill: '#e8c766', stroke: '#9a7b1f', 'stroke-width': 4 }, g);
      var tx = svg('text', { x: cx, y: cy + R * 0.18, 'text-anchor': 'middle', 'font-size': R * 0.55, 'font-weight': 700, fill: '#5b4510' }, g);
      tx.textContent = last < 0 ? '?' : last === 0 ? 'H' : 'T';
    } else if (spec.dev === 'dice') {
      svg('rect', { x: cx - R * 0.85, y: cy - R * 0.85, width: R * 1.7, height: R * 1.7, rx: R * 0.25, fill: '#fff', stroke: ink, 'stroke-width': 3 }, g);
      var face = last < 0 ? 0 : last + 1;
      var pips = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
      if (spec.out.length === 6 && face) pips[face].forEach(function (p) { svg('circle', { cx: cx + p[0] * R * 0.48, cy: cy + p[1] * R * 0.48, r: R * 0.14, fill: ink }, g); });
      else { var t2 = svg('text', { x: cx, y: cy + R * 0.2, 'text-anchor': 'middle', 'font-size': R * 0.6, 'font-weight': 700, fill: ink }, g); t2.textContent = face || '?'; }
    } else if (spec.dev === 'spinner') {
      var a0 = -Math.PI / 2;
      spec.out.forEach(function (o, i) {
        var a1 = a0 + o.p * 2 * Math.PI, large = o.p > 0.5 ? 1 : 0;
        var d = o.p >= 0.9999 ? '' : 'M' + cx + ',' + cy + ' L' + (cx + R * Math.cos(a0)) + ',' + (cy + R * Math.sin(a0)) + ' A' + R + ',' + R + ' 0 ' + large + ' 1 ' + (cx + R * Math.cos(a1)) + ',' + (cy + R * Math.sin(a1)) + ' Z';
        svg('path', { d: d, fill: o.col, 'fill-opacity': 0.75, stroke: '#fff', 'stroke-width': 2 }, g);
        var am = (a0 + a1) / 2, lb = svg('text', { x: cx + R * 0.62 * Math.cos(am), y: cy + R * 0.62 * Math.sin(am) + 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, fill: '#fff' }, g); lb.textContent = o.name;
        o.mid = am; a0 = a1;
      });
      svg('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: ink, 'stroke-width': 2 }, g);
      var ang = last < 0 ? -Math.PI / 2 : spec.out[last].mid;
      svg('line', { x1: cx, y1: cy, x2: cx + R * 0.85 * Math.cos(ang), y2: cy + R * 0.85 * Math.sin(ang), stroke: ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      svg('circle', { cx: cx, cy: cy, r: 6, fill: ink }, g);
    } else {   // bag: counters in a bag, the last one drawn shown beside it
      svg('path', { d: 'M' + (cx - R) + ',' + (cy - R * 0.6) + ' Q' + (cx - R * 1.1) + ',' + (cy + R) + ' ' + cx + ',' + (cy + R) + ' Q' + (cx + R * 1.1) + ',' + (cy + R) + ' ' + (cx + R) + ',' + (cy - R * 0.6) + ' Z', fill: '#efe6d6', stroke: ink, 'stroke-width': 2 }, g);
      var k = 0, all = []; spec.out.forEach(function (o) { for (var j = 0; j < o.w; j++) all.push(o); });
      var per = Math.ceil(Math.sqrt(all.length * 1.4)), rr = Math.min(R / per, 14);
      all.forEach(function (o) { var col = k % per, row = Math.floor(k / per); k++; svg('circle', { cx: cx - (per - 1) * rr + col * rr * 2, cy: cy - R * 0.3 + row * rr * 2 + rr, r: rr * 0.85, fill: o.col, stroke: ink, 'stroke-width': 1 }, g); });
      if (last >= 0) { svg('circle', { cx: cx + R * 1.35, cy: cy - R * 0.6, r: 14, fill: spec.out[last].col, stroke: ink, 'stroke-width': 2 }, g); }
    }
  }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var W = Math.max(el.clientWidth, 320), H = Math.max(el.clientHeight, 220);
    var s = svg('svg', { width: '100%', height: '100%', viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Chance board' }, el);
    var narrow = W < 560, dW = narrow ? W : W * 0.36;
    var R = Math.min(dW, narrow ? H * 0.42 : H) * 0.33;
    drawDevice(s, dW / 2, narrow ? R + 16 : H / 2, R);
    // the graph of relative frequency against trials
    var gx = narrow ? 44 : dW + 44, gy = narrow ? 2 * R + 48 : 24, gw = W - gx - 16, gh = (narrow ? H - gy : H - 24) - 40;
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#e4e1da';
    var o = spec.out[spec.watchI], maxT = Math.max(10, t);
    var X = function (n) { return gx + gw * n / maxT; }, Y = function (f) { return gy + gh * (1 - f); };
    svg('rect', { x: gx, y: gy, width: gw, height: gh, fill: 'none', stroke: line }, s);
    [0, 0.25, 0.5, 0.75, 1].forEach(function (f) { svg('line', { x1: gx, x2: gx + gw, y1: Y(f), y2: Y(f), stroke: line }, s); var tt = svg('text', { x: gx - 6, y: Y(f) + 4, 'text-anchor': 'end', 'font-size': 11, fill: muted }, s); tt.textContent = String(f); });
    var tl = svg('text', { x: gx + gw / 2, y: gy + gh + 30, 'text-anchor': 'middle', 'font-size': 12, fill: muted }, s); tl.textContent = 'Trials (' + t + ')';
    var hd = svg('text', { x: gx, y: gy - 8, 'font-size': 12, 'font-weight': 600, fill: ink }, s); hd.textContent = 'Relative frequency of ' + o.name;
    var mt = svg('text', { x: gx + gw, y: gy + gh + 16, 'text-anchor': 'end', 'font-size': 11, fill: muted }, s); mt.textContent = String(maxT);
    if (spec.predict) { svg('line', { x1: gx, x2: gx + gw, y1: Y(o.p), y2: Y(o.p), stroke: o.col, 'stroke-width': 2, 'stroke-dasharray': '6 5' }, s); }
    if (t) {
      var step = Math.max(1, Math.floor(t / 600)), pts = [];
      for (var n = 1; n <= t; n += step) pts.push(X(n).toFixed(1) + ',' + Y(hist[n - 1] / n).toFixed(1));
      pts.push(X(t).toFixed(1) + ',' + Y(hist[t - 1] / t).toFixed(1));
      svg('polyline', { points: pts.join(' '), fill: 'none', stroke: o.col, 'stroke-width': 2.5 }, s);
    }
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar nlops crun';
    [1, 10, 100, 1000].forEach(function (n) { var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Run ' + n; b.addEventListener('click', function () { run(n); }); bar.appendChild(b); });
    panel.appendChild(bar);
    ui.table = document.createElement('table'); ui.table.className = 'ctally'; panel.appendChild(ui.table);
    var bar2 = document.createElement('div'); bar2.className = 'gbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar2.appendChild(again); panel.appendChild(bar2);
  }

  function report() {
    var o = spec.out[spec.watchI], c = counts[spec.watchI], f = t ? r3(c / t) : 0;
    ui.work.textContent = t === 0 ? 'No trials yet: press Run.' : 'Trial ' + t + ': ' + spec.out[last].name + '. ' + o.name + ' so far: ' + c + ' out of ' + t + ' = ' + f + (spec.predict ? ' (probability ' + r3(o.p) + ')' : '');
    var rows = '<tr><th>Outcome</th><th>Count</th><th>Relative frequency</th>' + (spec.predict ? '<th>Probability</th><th>Expected count</th>' : '') + '</tr>';
    spec.out.forEach(function (x, i) {
      rows += '<tr' + (i === spec.watchI ? ' class="cwatch"' : '') + '><td><span class="cdot" style="background:' + x.col + '"></span>' + x.name + '</td><td>' + counts[i] + '</td><td>' + (t ? r3(counts[i] / t) : '–') + '</td>' + (spec.predict ? '<td>' + frac(x.w, spec.total) + '</td><td>' + r3(x.p * t) + '</td>' : '') + '</tr>';
    });
    ui.table.innerHTML = rows;
    B.say(ui.work.textContent);
    B.save({ counts: counts, t: t, hist: hist.length <= 2000 ? hist : null, last: last });
    B.post({ scope: { vars: { t: t, c: c, f: f, p: r3(o.p), e: r3(Math.abs(f - o.p)), w: spec.out.length }, points: {} } }, ui.work.textContent);
  }
  function frac(a, b) { var g = (function gcd(x, y) { return y ? gcd(y, x % y) : x; })(a, b); return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); }

  B.widget('chance', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A chance experiment with a ' + (s.device || 'coin'); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      rnd = spec.seedv !== null ? mulberry(spec.seedv) : Math.random;
      counts = spec.out.map(function () { return 0; }); hist = []; t = 0; last = -1;
      var sv = fresh ? null : B.saved();
      if (sv && sv.counts && sv.counts.length === counts.length && sv.hist) { counts = sv.counts.slice(); t = sv.t; hist = sv.hist.slice(); last = sv.last; }
      else for (var k = 0; k < spec.startN; k++) once();
      paintPanel();
      draw();
      report();
    },
    redraw: function () { draw(); },
    resize: function () { draw(); },
  });
})(WPB);
