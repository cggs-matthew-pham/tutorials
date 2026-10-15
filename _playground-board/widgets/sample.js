// Sample: a school of 200 students (four year groups of 50, drawn as rows of dots) and the samples students take from
// it. Each student has hours of sleep and whether they play sport; both change with year level, so a sample from one
// part of the school is biased. Take one sample, or many, and compare them with the whole population.
//   widget: sample
//   measure: sport | sleep     what each sample measures: the proportion who play sport (default), or mean hours of sleep
//   method: random | systematic | stratified | convenience | census | choose
//                              how the sample is picked ("choose" adds a button for each; census is every student)
//   slider n: 5, 100, 20, 5    the sample size (or fixed "n: 20")
//   population: hidden         hide the population's value until "Show the population" is pressed (default shown)
//   plot: results | values     under the school: each sample's result so far (default), or this sample's values
//   seed: 3                    fixed randomness for pictures and clips
//   start: 1                   samples already taken when the board opens (for pictures)
// state: { scope: { vars: { n (sample size), s (samples taken with these settings), p (this sample's proportion who play
//   sport, 2 places), m (this sample's mean sleep, 2 places), d (its median sleep), w (its range of sleep),
//   q (the population's proportion), a (the population's mean sleep), e (how far this sample is from the population, on
//   the measure), r (the range of the results of the samples taken with these settings), k (method: 1 random, 2
//   systematic, 3 stratified, 4 convenience, 5 census), v (1 once the population is shown) } } }
// Checks: "k = 1 and s >= 1", "s >= 10 and n >= 50", "k = 4 and s >= 1", "v = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var METHODS = ['random', 'systematic', 'stratified', 'convenience', 'census'];
  var NAMES = { random: 'Simple random', systematic: 'Systematic', stratified: 'Stratified', convenience: 'Convenience', census: 'Census' };
  var spec = null, pop = [], ui = {}, method = 'random', n = 20, picked = [], results = [], shown = true, rnd = Math.random;
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  // The school: the same 200 students every time (a fixed seed), so every class sees the same population.
  function makeSchool() {
    var g = mulberry(20261012), out = [];
    var normal = function () { var u = 1 - g(), v = g(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    [7, 8, 9, 10].forEach(function (yr, y) {
      for (var i = 0; i < 50; i++) {
        var sleep = Math.round((9.4 - 0.45 * y + 0.55 * normal()) * 10) / 10;
        out.push({ yr: yr, sleep: Math.max(6, Math.min(11.5, sleep)), sport: g() < [0.75, 0.62, 0.48, 0.35][y] ? 1 : 0, row: y * 2 + Math.floor(i / 25), col: i % 25 });
      }
    });
    return out;
  }
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.meas = /^sleep$/i.test(s.measure || '') ? 'sleep' : 'sport';
    var m = String(s.method || 'random').trim().toLowerCase();
    if (m !== 'choose' && METHODS.indexOf(m) < 0) throw new Error('method: random, systematic, stratified, convenience, census or choose.');
    s.choose = m === 'choose'; s.m0 = s.choose ? 'random' : m;
    s.sl = null;
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 'n') throw new Error('Line ' + it.line + ': the board has one slider, n (the sample size).');
      var v = nums(it.value, 'slider n');
      if (v.length < 3 || !(v[0] >= 1 && v[1] <= 200 && v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider n: min, max (up to 200), start, step.');
      s.sl = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    s.n0 = s.sl ? s.sl.start : s.n !== undefined ? nums(s.n, 'n')[0] : 20;
    if (!(s.n0 >= 1 && s.n0 <= 200)) throw new Error('n: 1 to 200.');
    s.hidden = /^hidden$/i.test(s.population || '');
    s.plot = /^values$/i.test(s.plot || '') ? 'values' : 'results';
    s.seedv = s.seed !== undefined ? Number(s.seed) : null;
    s.startN = s.start !== undefined ? Math.max(0, Math.min(50, Number(s.start) || 0)) : 0;
  }
  function value(list) {   // the sample's result on the measure
    if (!list.length) return null;
    return spec.meas === 'sport' ? list.reduce(function (t, i) { return t + pop[i].sport; }, 0) / list.length : list.reduce(function (t, i) { return t + pop[i].sleep; }, 0) / list.length;
  }
  function pickSome(from, k) { var a = from.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a.slice(0, k); }
  function take() {
    var all = pop.map(function (_, i) { return i; }), size = method === 'census' ? 200 : n;
    if (method === 'random') picked = pickSome(all, size);
    else if (method === 'census') picked = all;
    else if (method === 'systematic') { var step = 200 / size, start = rnd() * step; picked = []; for (var j = 0; j < size; j++) picked.push(Math.min(199, Math.floor(start + j * step))); }   // every (200 ÷ n)th, so it always reaches the end of the list
    else if (method === 'stratified') {   // the same share from each year group (rounded so the shares add to n)
      picked = []; var base = Math.floor(size / 4), extra = size - base * 4, order = pickSome([0, 1, 2, 3], 4);
      [0, 1, 2, 3].forEach(function (y) { var k = base + (order.indexOf(y) < extra ? 1 : 0); picked = picked.concat(pickSome(all.slice(y * 50, y * 50 + 50), k)); });
    } else {   // convenience: the students nearest the door, starting from one end of the Year 7 rows (a different end each time)
      var fromEnd = rnd() < 0.5; picked = []; for (var c = 0; picked.length < size; c++) { var row = Math.floor(c / 25), col = c % 25; picked.push(row * 25 + (fromEnd ? 24 - col : col)); }
    }
    results.push(value(picked)); B.moved = true; report();
  }
  function many(k) { for (var i = 0; i < k; i++) take(); }
  function popValue() { return value(pop.map(function (_, i) { return i; })); }
  function fmtv(v) { return v === null ? '–' : spec.meas === 'sport' ? B.fmt(r2(v)) : B.fmt(r2(v)) + ' h'; }

  function add(parent, tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; parent.appendChild(e); return e; }
  function draw() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.setAttribute('role', 'img');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', line = B.css('--line') || '#d9dde3', card = B.css('--card') || '#fff', font = 'system-ui, sans-serif';
    var W = 900, cx = 120, cy = 40, gap = 28, H = 470;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    add(svg, 'text', { x: cx, y: 22, 'font-size': 17, 'font-weight': 700, 'font-family': font, fill: muted }, 'The school: 200 students' + (spec.meas === 'sport' ? ' (filled: plays sport)' : ' (darker: more sleep)'));
    var inS = {}; picked.forEach(function (i) { inS[i] = 1; });
    var lo = 6, hi = 11.5;
    [7, 8, 9, 10].forEach(function (yr, y) { add(svg, 'text', { x: cx - 16, y: cy + 2 * y * gap + gap + y * 6 + 6, 'text-anchor': 'end', 'font-size': 16, 'font-weight': 700, 'font-family': font, fill: ink }, 'Year ' + yr); });
    pop.forEach(function (p, i) {
      var x = cx + p.col * gap + gap / 2, y = cy + p.row * gap + gap / 2 + Math.floor(p.row / 2) * 6;
      var f = spec.meas === 'sport' ? (p.sport ? ink : card) : 'rgba(47,111,179,' + (0.15 + 0.85 * (p.sleep - lo) / (hi - lo)).toFixed(2) + ')';
      add(svg, 'circle', { cx: x, cy: y, r: 8, fill: f, stroke: ink, 'stroke-width': 1.2 });
      if (inS[i]) add(svg, 'circle', { cx: x, cy: y, r: 12.5, fill: 'none', stroke: orange, 'stroke-width': 3 });
    });
    // the plot under the school
    var py = 330, px0 = cx, px1 = W - 40;
    var dom = spec.meas === 'sport' ? [0, 1] : spec.plot === 'values' ? [6, 11.5] : [7.5, 10];
    var X = function (v) { return px0 + (px1 - px0) * (v - dom[0]) / (dom[1] - dom[0]); };
    add(svg, 'line', { x1: px0, y1: py + 80, x2: px1, y2: py + 80, stroke: ink, 'stroke-width': 2 });
    var ticks = spec.meas === 'sport' ? [0, 0.2, 0.4, 0.6, 0.8, 1] : spec.plot === 'values' ? [6, 7, 8, 9, 10, 11] : [7.5, 8, 8.5, 9, 9.5, 10];
    ticks.forEach(function (t) { add(svg, 'line', { x1: X(t), y1: py + 80, x2: X(t), y2: py + 86, stroke: ink }); add(svg, 'text', { x: X(t), y: py + 104, 'text-anchor': 'middle', 'font-size': 15, 'font-family': font, fill: muted }, String(t)); });
    var title, pts;
    if (spec.plot === 'values') { title = 'This sample: hours of sleep, one dot per student'; pts = picked.map(function (i) { return Math.round(pop[i].sleep * 5) / 5; }); }
    else { title = 'Each sample\'s ' + (spec.meas === 'sport' ? 'proportion who play sport' : 'mean hours of sleep') + ' (' + results.length + ' so far)'; pts = results.map(function (v) { return spec.meas === 'sport' ? Math.round(v * 50) / 50 : Math.round(v * 20) / 20; }); }
    add(svg, 'text', { x: px0, y: py - 6, 'font-size': 16, 'font-weight': 700, 'font-family': font, fill: muted }, title);
    var stack = {}, most = {}; pts.forEach(function (v) { most[v] = (most[v] || 0) + 1; });
    var tall = Math.max(1, Math.max.apply(null, Object.keys(most).map(function (k) { return most[k]; }).concat([1]))), r = Math.min(5.5, 74 / (2 * tall));
    pts.forEach(function (v, k) { var key = String(v); stack[key] = (stack[key] || 0) + 1; var h = stack[key]; add(svg, 'circle', { cx: X(Math.max(dom[0], Math.min(dom[1], v))), cy: py + 80 - r - (h - 1) * (r * 2 - Math.min(1, r / 4)), r: r, fill: k === pts.length - 1 && spec.plot === 'results' ? orange : blue, stroke: card, 'stroke-width': 1 }); });
    if (shown) { var pv = popValue(); add(svg, 'line', { x1: X(pv), y1: py + 4, x2: X(pv), y2: py + 80, stroke: ink, 'stroke-width': 2, 'stroke-dasharray': '6 5' }); add(svg, 'text', { x: X(pv) + 6, y: py + 16, 'font-size': 14, 'font-family': font, fill: ink }, 'population ' + fmtv(pv)); }
    svg.setAttribute('aria-label', 'A school of 200 students in four year groups, with ' + picked.length + ' chosen for the sample.');
    el.appendChild(svg);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl && method !== 'census') {
      var sl = spec.sl, row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = 'n'; lab.htmlFor = 'sl-n';
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make the sample smaller');
      var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-n'; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = n;
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make the sample bigger');
      var out = document.createElement('output'); out.htmlFor = 'sl-n'; ui.out = out;
      var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); if (v !== n) { n = v; results = []; picked = []; } rr.value = n; B.moved = true; report(); };
      rr.addEventListener('input', function () { set(Number(rr.value)); });
      minus.addEventListener('click', function () { set(n - sl.step); }); plus.addEventListener('click', function () { set(n + sl.step); });
      row.append(lab, minus, rr, plus, out); panel.appendChild(row);
    }
    var bar = document.createElement('div'); bar.className = 'gbar';
    var btn = function (text, fn, label, pressed) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; if (label) b.setAttribute('aria-label', label); if (pressed !== undefined) b.setAttribute('aria-pressed', String(pressed)); b.addEventListener('click', fn); bar.appendChild(b); return b; };
    if (spec.choose) METHODS.forEach(function (m) { btn(NAMES[m], function () { method = m; results = []; picked = []; B.moved = true; paintPanel(); report(); }, 'Use ' + NAMES[m].toLowerCase() + ' sampling', m === method); });
    panel.appendChild(bar);
    var bar2 = document.createElement('div'); bar2.className = 'gbar';
    var b2 = function (text, fn) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.addEventListener('click', fn); bar2.appendChild(b); return b; };
    b2(method === 'census' ? 'Take a census' : 'Take a sample', take);
    if (method !== 'census') b2('Take 10 samples', function () { many(10); });
    if (!shown) b2('Show the population', function () { shown = true; B.moved = true; paintPanel(); report(); });
    b2('Start again', B.restart);
    panel.appendChild(bar2);
  }
  function report() {
    if (ui.out) ui.out.textContent = 'n = ' + n;
    draw();
    var last = picked.length ? value(picked) : null, pv = popValue();
    var sl = picked.map(function (i) { return pop[i].sleep; }).sort(function (a, b) { return a - b; });
    var med = sl.length ? (sl.length % 2 ? sl[(sl.length - 1) / 2] : (sl[sl.length / 2 - 1] + sl[sl.length / 2]) / 2) : 0;
    var sp = picked.length ? picked.reduce(function (t, i) { return t + pop[i].sport; }, 0) / picked.length : 0;
    var sm = picked.length ? sl.reduce(function (t, v) { return t + v; }, 0) / sl.length : 0;
    var lo = results.length ? Math.min.apply(null, results) : 0, hi = results.length ? Math.max.apply(null, results) : 0;
    var years = [0, 0, 0, 0]; picked.forEach(function (i) { years[pop[i].yr - 7]++; });
    var what = spec.meas === 'sport' ? 'proportion who play sport' : 'mean hours of sleep';
    ui.work.textContent = !picked.length ? NAMES[method] + (method === 'census' ? ': every student.' : ' sampling, n = ' + n + '. Press Take a sample.') : (method === 'census' ? 'Census of all 200' : NAMES[method] + ' sample of ' + picked.length) + ': ' + what + ' = ' + fmtv(last) + (shown ? ' (population ' + fmtv(pv) + ')' : '');
    var note = picked.length ? 'From each year: Year 7 ' + years[0] + ', Year 8 ' + years[1] + ', Year 9 ' + years[2] + ', Year 10 ' + years[3] + '.' : '';
    if (spec.plot === 'values' && picked.length) note += ' Sleep in this sample: mean ' + B.fmt(r2(sm)) + ' h, median ' + B.fmt(r2(med)) + ' h, range ' + B.fmt(r2(sl[sl.length - 1] - sl[0])) + ' h.';
    if (results.length > 1) note += ' ' + results.length + ' samples so far: results from ' + fmtv(lo) + ' to ' + fmtv(hi) + '.';
    ui.note.textContent = note;
    var vars = { n: method === 'census' ? 200 : n, s: results.length, p: r2(sp), m: r2(sm), d: r2(med), w: sl.length ? r2(sl[sl.length - 1] - sl[0]) : 0, q: r2(pop.reduce(function (t, x) { return t + x.sport; }, 0) / 200), a: r2(pop.reduce(function (t, x) { return t + x.sleep; }, 0) / 200), e: last === null ? 1 : r2(Math.abs(last - pv)), r: r2(hi - lo), k: METHODS.indexOf(method) + 1, v: shown ? 1 : 0 };
    B.say(ui.work.textContent + ' ' + note);
    B.save({ method: method, n: n, picked: picked, results: results, shown: shown });
    B.post({ scope: { vars: vars, points: {} } }, ui.work.textContent + ' ' + note);
  }
  B.widget('sample', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A school of 200 students and samples from it'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; pop = makeSchool(); rnd = spec.seedv !== null ? mulberry(spec.seedv) : Math.random;
      var sv = fresh ? null : B.saved();
      method = spec.m0; n = spec.n0; picked = []; results = []; shown = !spec.hidden;
      if (sv && sv.method) { method = sv.method; n = sv.n; picked = sv.picked || []; results = sv.results || []; shown = !!sv.shown; }
      paintPanel();
      if (!(sv && sv.method)) for (var t = 0; t < spec.startN; t++) take();
      report(); B.moved = false;
    },
  });
})(WPB);
