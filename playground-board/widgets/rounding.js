// Rounding and estimating.
//   widget: rounding
//   mode: round (default) | estimate
// round: a decimal sits on a number line between the two nearest numbers with d decimal places, and rounds to the nearer one.
//   slider x: 0, 10, 3.746, 0.001    the number (min, max, start, step; or a fixed "x: 3.746")
//   slider d: 0, 3, 2                decimal places (or a fixed "d: 2")
//   state vars: x, d, r (the rounded number), l and h (the ends of the line), m (the halfway mark)
//   Checks: "d = 2 and r = 3.75", "r = 4".
// estimate: a calculation a op b, with each number rounded to its leading digit (1 significant figure), the estimate, the exact
//   answer and a bar for each.
//   slider a: 10, 99, 38, 1    slider b: 10, 99, 52, 1    (or fixed "a: 38")
//   op: ×                      × + − ÷
//   state vars: a, b, p and q (a and b rounded), s (the estimate), v (the exact answer), o (1 for +, 2 for −, 3 for ×, 4 for ÷)
//   Checks: "p = 40 and q = 50", "s = 2000 and v < 2000".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NS = 'http://www.w3.org/2000/svg';
  var r6 = function (v) { return Math.round(v * 1e6) / 1e6; };
  var pw = function (d) { return Math.pow(10, d); };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  var OPS = { '×': 3, '*': 3, 'x': 3, '+': 1, '−': 2, '-': 2, '÷': 4, '/': 4 };
  var SYM = { 1: '+', 2: '−', 3: '×', 4: '÷' };

  function parse(s) {
    s.mode = String(s.mode || 'round').trim().toLowerCase();
    if (['round', 'estimate'].indexOf(s.mode) < 0) throw new Error('mode: round or estimate.');
    var names = s.mode === 'round' ? ['x', 'd'] : ['a', 'b'];
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (names.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the ' + s.mode + ' board has sliders ' + names.join(' and ') + ' only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] < 0) throw new Error('slider ' + it.name + ': needs min, max, start (from 0 up) and an optional step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    names.forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fix[n] = nums(s[n], n)[0]; }
      else if (!s.sl[n]) throw new Error(n + ': needs a slider or a value.');
    });
    s.names = names;
    if (s.mode === 'round') {
      var dm = s.sl.d ? s.sl.d.max : s.fix.d;
      if (dm > 4 || (s.sl.d ? s.sl.d.min : s.fix.d) < 0) throw new Error('d: from 0 to 4 decimal places.');
    } else {
      s.op = OPS[String(s.op || '×').trim()];
      if (!s.op) throw new Error('op: × + − or ÷.');
    }
  }
  function sig1(v) { return v === 0 ? 0 : Number(v.toPrecision(1)); }
  var fm = function (v) { return String(r6(v)); };

  function svgEl() {
    var el = B.el('board'); el.replaceChildren();
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* gone */ } B.jsxBoard = null; }
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.setAttribute('role', 'img');
    el.appendChild(svg);
    return svg;
  }
  function colours() {
    return { ink: B.css('--ink') || '#1d2430', blue: B.css('--left') || '#2f6fb3', orange: B.css('--accent') || '#c2570a', muted: B.css('--muted') || '#5d6675', line: B.css('--line') || '#e4e1da' };
  }
  function adder(svg) {
    return function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
  }

  function drawRound(c) {
    var svg = svgEl(), add = adder(svg), W = 700, H = 230;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var d = vars.d, x = vars.x, step = 1 / pw(d);
    var lo = Math.floor(x * pw(d) + 1e-9) / pw(d), hi = r6(lo + step), mid = r6(lo + step / 2);
    var L = 80, R = 620, px = function (v) { return L + (v - lo) / step * (R - L); };
    add('line', { x1: L - 30, y1: 120, x2: R + 30, y2: 120, stroke: c.muted, 'stroke-width': 3 });
    // tenth-steps of the step as faint ticks
    for (var k = 0; k <= 10; k++) add('line', { x1: L + k * (R - L) / 10, y1: 112, x2: L + k * (R - L) / 10, y2: 128, stroke: c.line, 'stroke-width': 1.5 });
    var rounded = vars.r;
    [[lo, 'lo'], [hi, 'hi']].forEach(function (e) {
      var win = rounded === e[0];
      add('line', { x1: px(e[0]), y1: 98, x2: px(e[0]), y2: 142, stroke: win ? c.orange : c.ink, 'stroke-width': 4 });
      add('text', { x: px(e[0]), y: 170, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': win ? 700 : 400, fill: win ? c.orange : c.ink }, e[0].toFixed(d));
    });
    add('line', { x1: px(mid), y1: 100, x2: px(mid), y2: 140, stroke: c.muted, 'stroke-width': 2, 'stroke-dasharray': '4 3' });
    add('text', { x: px(mid), y: 200, 'text-anchor': 'middle', 'font-size': 16, fill: c.muted }, 'halfway ' + mid.toFixed(d + 1));
    add('circle', { cx: px(x), cy: 120, r: 11, fill: c.blue, stroke: c.ink, 'stroke-width': 2 });
    add('text', { x: px(x), y: 78, 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700, fill: c.blue }, fm(x));
    svg.setAttribute('aria-label', fm(x) + ' on the line between ' + fm(lo) + ' and ' + fm(hi) + ', halfway mark ' + fm(mid) + '.');
  }
  function drawEstimate(c) {
    var svg = svgEl(), add = adder(svg), W = 700, H = 200;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var mx = Math.max(Math.abs(vars.exact), Math.abs(vars.est), 1e-9), bw = function (v) { return Math.max(2, Math.abs(v) / mx * 430); };
    [['Exact', vars.exact, c.blue, 40], ['Estimate', vars.est, c.orange, 110]].forEach(function (b) {
      add('text', { x: 20, y: b[3] + 28, 'font-size': 20, fill: c.ink }, b[0]);
      add('rect', { x: 130, y: b[3], width: bw(b[1]), height: 44, fill: b[2], 'fill-opacity': 0.4, stroke: b[2], 'stroke-width': 2 });
      add('text', { x: 138 + bw(b[1]), y: b[3] + 29, 'font-size': 20, 'font-weight': 700, fill: c.ink }, fm(b[1]));
    });
    svg.setAttribute('aria-label', 'Exact answer ' + fm(vars.exact) + ' and estimate ' + fm(vars.est) + ' drawn as bars.');
  }

  function slider(n, label) {
    var sl = spec.sl[n], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, r6(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars[n] = v; r.value = v; B.moved = true; report(); };
    r.addEventListener('input', function () { set(Number(r.value)); });
    minus.addEventListener('click', function () { set(vars[n] - sl.step); });
    plus.addEventListener('click', function () { set(vars[n] + sl.step); });
    row.append(lab, minus, r, plus, out); ui.outs.push({ n: n, out: out });
    return row;
  }
  var LABELS = { x: 'the number', d: 'the decimal places', a: 'the first number', b: 'the second number' };
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    spec.names.forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n, LABELS[n])); });
    if (Object.keys(spec.sl).length) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var c = colours(), sc, txt, note;
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + fm(vars[o.n]) + (o.n === 'd' ? (vars.d === 1 ? ' decimal place' : ' decimal places') : ''); });
    if (spec.mode === 'round') {
      var d = vars.d, x = vars.x, step = 1 / pw(d);
      var lo = Math.floor(x * pw(d) + 1e-9) / pw(d), hi = r6(lo + step), mid = r6(lo + step / 2);
      var exact = Math.abs(x - lo) < 1e-9;
      var r = exact ? r6(lo) : (x * pw(d) - Math.floor(x * pw(d) + 1e-9) >= 0.5 - 1e-9 ? hi : r6(lo));
      vars.r = r; lo = r6(lo);
      var dp = function (v) { return d > 0 ? v.toFixed(d) : String(v); };
      txt = fm(x) + ' to ' + d + (d === 1 ? ' decimal place' : ' decimal places') + ' is ' + dp(r);
      if (exact) note = fm(x) + ' already has ' + d + (d === 1 ? ' decimal place' : ' decimal places') + ': nothing to round.';
      else if (Math.abs(x - mid) < 1e-9) note = 'Exactly halfway between ' + dp(lo) + ' and ' + dp(hi) + ': the rule is to round up, to ' + dp(hi) + '.';
      else note = 'It lies between ' + dp(lo) + ' and ' + dp(hi) + '. The halfway mark is ' + fm(mid) + '; ' + fm(x) + ' is ' + (x > mid ? 'past it, so it rounds up to ' + dp(hi) : 'before it, so it rounds down to ' + dp(lo)) + '.';
      drawRound(c);
      sc = { x: x, d: d, r: r, l: lo, h: hi, m: mid };
    } else {
      var a = vars.a, b = vars.b, o = spec.op, ea = sig1(a), eb = sig1(b);
      var f = function (p, q) { return o === 1 ? p + q : o === 2 ? p - q : o === 3 ? p * q : (q === 0 ? 0 : p / q); };
      var ex = r6(f(a, b)), est = r6(f(ea, eb));
      vars.exact = ex; vars.est = est;
      txt = fm(a) + ' ' + SYM[o] + ' ' + fm(b) + ' ≈ ' + fm(ea) + ' ' + SYM[o] + ' ' + fm(eb) + ' = ' + fm(est);
      var off = ex === 0 ? 0 : Math.abs(est - ex) / Math.abs(ex) * 100;
      note = 'Exact: ' + fm(ex) + '. The estimate is ' + (est === ex ? 'exactly right' : off < 1 ? 'less than 1% off' : 'about ' + Math.round(off) + '% off') + '.';
      drawEstimate(c);
      sc = { a: a, b: b, p: ea, q: eb, s: est, v: ex, o: o };
    }
    ui.work.textContent = txt; ui.note.textContent = note;
    B.say(txt + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: sc, points: {} } }, txt + '. ' + note);
  }

  B.widget('rounding', {
    sections: ['board', 'gpanel'],
    label: function (s) { return /estimate/i.test(s.mode || '') ? 'A calculation with its estimate and exact answer' : 'A decimal on a number line between the two numbers it could round to'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      spec.names.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fix[n]; });
      paintPanel(); report();
    },
  });
})(WPB);
