// Index laws from expanded form: powers drawn as rows of their factors, so the laws can be seen, not just stated.
//   widget: indexlaws
//   mode: product            product (aᵐ × aⁿ: the factors join) | quotient (aᵐ ÷ aⁿ: pairs cancel) |
//                            power ((aᵐ)ⁿ: n groups of m) | zero (aⁿ ÷ aⁿ: everything cancels, leaving 1)
//   slider a: 2, 10, 2       the base (or fixed "a: 2")
//   slider m: 1, 6, 3        the first index (or fixed)
//   slider n: 1, 6, 2        the second index (or fixed; in zero mode n follows m)
//   result: off              hide the resulting power and value (students work it out)
// The quotient board keeps m at least n (it raises m to n if needed).
// state: { scope: { vars: { a, m, n, k (the index of the answer: m + n, m − n, m × n or 0), v (its value) } } }
// Checks: "m = 3 and n = 4 and k = 7", "k = 0", "v = 64".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  var sup = function (n) { return String(n).split('').map(function (c) { return SUP[+c]; }).join(''); };
  var spec = null, vars = {}, ui = {};
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.mode = /^(product|quotient|power|zero)$/i.test(s.mode || '') ? s.mode.toLowerCase() : 'product';
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (['a', 'm', 'n'].indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the board has sliders a (the base), m and n (the indices).');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v.some(function (x) { return x !== Math.round(x); })) throw new Error('slider ' + it.name + ': whole numbers min, max, start.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2] };
    });
    var def = { a: 2, m: 3, n: 2 };
    ['a', 'm', 'n'].forEach(function (k) { if (!s.sl[k]) s.fix[k] = s[k] !== undefined ? Math.round(nums(s[k], k)[0]) : def[k]; });
    var hi = function (k) { return s.sl[k] ? s.sl[k].max : s.fix[k]; }, lo = function (k) { return s.sl[k] ? s.sl[k].min : s.fix[k]; };
    if (lo('a') < 2 || hi('a') > 12) throw new Error('a: 2 to 12.');
    if (lo('m') < 0 || hi('m') > 8 || lo('n') < 0 || hi('n') > 8) throw new Error('m and n: 0 to 8.');
    if (s.mode === 'power' && hi('m') * hi('n') > 24) throw new Error('power: keep m × n at most 24 (smaller sliders).');
    s.res = !/^off$/i.test(s.result || '');
  }
  function fit() {
    if (spec.mode === 'quotient' && vars.n > vars.m) vars.m = vars.n;
    if (spec.mode === 'zero') vars.n = vars.m;
  }
  function calc() {
    var a = vars.a, m = vars.m, n = vars.n, k = spec.mode === 'product' ? m + n : spec.mode === 'quotient' ? m - n : spec.mode === 'power' ? m * n : 0;
    return { k: k, v: Math.pow(a, k) };
  }
  var big = function (v) { return v >= 1e15 ? v.toExponential(3) : String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };

  function draw(R) {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', purple = B.css('--right') || '#8a4fb8', card = B.css('--card') || '#fff';
    var a = vars.a, m = vars.m, n = vars.n, W = 900, H = 330, font = 'system-ui, sans-serif';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var chip = function (x, y, col, struck) {
      add('rect', { x: x, y: y, width: 40, height: 40, rx: 8, fill: col, 'fill-opacity': struck ? 0.06 : 0.18, stroke: col, 'stroke-width': 2, 'stroke-opacity': struck ? 0.4 : 1 });
      add('text', { x: x + 20, y: y + 21, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 20, 'font-weight': 700, 'font-family': font, fill: ink, 'fill-opacity': struck ? 0.35 : 1 }, String(a));
      if (struck) add('line', { x1: x + 4, y1: y + 36, x2: x + 36, y2: y + 4, stroke: muted, 'stroke-width': 2.5 });
    };
    var row = function (count, x, y, col, struckFrom) { for (var i = 0; i < count; i++) chip(x + i * 46, y, col, struckFrom !== undefined && i < struckFrom); return x + count * 46; };
    var label = function (x, y, t, col) { add('text', { x: x, y: y, 'font-size': 24, 'font-weight': 700, 'font-family': font, fill: col || ink, 'dominant-baseline': 'middle' }, t); };
    if (spec.mode === 'product') {
      label(30, 70, a + sup(m), blue); var x1 = row(m, 110, 50, blue);
      label(x1 + 10, 70, '×', ink); label(x1 + 40, 70, a + sup(n), orange); row(n, x1 + 110, 50, orange);
      label(30, 170, '=', ink); var x2 = row(m, 110, 150, blue); row(n, x2, 150, orange);
      if (spec.res) label(30, 250, '= ' + a + sup(m + n) + ' : ' + m + ' + ' + n + ' = ' + (m + n) + ' factors of ' + a, purple);
    } else if (spec.mode === 'quotient' || spec.mode === 'zero') {
      label(30, 70, a + sup(m), blue); row(m, 110, 50, blue, n);
      add('line', { x1: 100, y1: 112, x2: 110 + Math.max(m, 1) * 46, y2: 112, stroke: ink, 'stroke-width': 3 });
      label(30, 150, a + sup(n), orange); row(n, 110, 130, orange, n);
      if (spec.res) label(30, 240, '= ' + (R.k ? a + sup(R.k) : '1') + ' : ' + n + (n === 1 ? ' pair cancels' : ' pairs cancel') + (R.k ? ', leaving ' + R.k + ' factor' + (R.k === 1 ? '' : 's') + ' of ' + a : ', leaving nothing but 1') + (spec.mode === 'zero' ? '. The law says ' + a + sup(m) + ' ÷ ' + a + sup(m) + ' = ' + a + '⁰, so ' + a + '⁰ = 1' : ''), purple);
    } else {
      label(30, 50, '(' + a + sup(m) + ')' + sup(n) + ' = ' + n + ' groups of ' + a + sup(m), ink);
      var perRow = Math.max(1, Math.floor(780 / (m * 46 + 24))), cols = [blue, orange, purple];
      for (var g = 0; g < n; g++) { var gx = 30 + (g % perRow) * (m * 46 + 24), gy = 80 + Math.floor(g / perRow) * 52; row(m, gx, gy, cols[g % 3]); }
      if (spec.res) label(30, 80 + Math.ceil(Math.max(n, 1) / perRow) * 52 + 40, '= ' + a + sup(m * n) + ' : ' + n + ' × ' + m + ' = ' + (m * n) + ' factors of ' + a, purple);
    }
    svg.setAttribute('aria-label', words(R));
    el.appendChild(svg);
    void card;
  }
  function words(R) {
    var a = vars.a, m = vars.m, n = vars.n;
    var lhs = spec.mode === 'product' ? a + sup(m) + ' × ' + a + sup(n) : spec.mode === 'power' ? '(' + a + sup(m) + ')' + sup(n) : a + sup(m) + ' ÷ ' + a + sup(n);
    return lhs + (spec.res ? ' = ' + a + sup(R.k) + ' = ' + big(R.v) : '');
  }
  function slider(nm, label) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = 1; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { vars[nm] = Math.max(sl.min, Math.min(sl.max, Math.round(v))); B.moved = true; report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - 1); });
    plus.addEventListener('click', function () { set(vars[nm] + 1); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out, r: rr });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var labels = { a: 'the base', m: 'the first index', n: 'the second index' };
    ['a', 'm', 'n'].forEach(function (k) { if (spec.sl[k] && !(spec.mode === 'zero' && k === 'n')) panel.appendChild(slider(k, labels[k])); });
    var bar = document.createElement('div'); bar.className = 'gbar'; var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    fit();
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + vars[o.n]; o.r.value = vars[o.n]; });
    var R = calc(); draw(R);
    var a = vars.a, m = vars.m, n = vars.n;
    ui.work.textContent = words(R);
    var law = spec.mode === 'product' ? 'Multiplying powers of the same base: add the indices, aᵐ × aⁿ = aᵐ⁺ⁿ.'
      : spec.mode === 'quotient' ? 'Dividing powers of the same base: subtract the indices, aᵐ ÷ aⁿ = aᵐ⁻ⁿ.'
      : spec.mode === 'power' ? 'A power of a power: multiply the indices, (aᵐ)ⁿ = aᵐⁿ.'
      : 'Anything (but 0) divided by itself is 1, and the quotient law gives a⁰: so a⁰ = 1.';
    ui.note.textContent = spec.res ? law + ' Here ' + a + sup(R.k) + ' = ' + big(R.v) + '.' : 'Count the factors of ' + a + ' that are left.';
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ vars: vars });
    B.post({ scope: { vars: { a: a, m: m, n: n, k: R.k, v: R.v }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }
  B.widget('indexlaws', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Powers drawn as rows of their factors'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      vars = {}; ['a', 'm', 'n'].forEach(function (k) { vars[k] = spec.sl[k] ? (sv && sv.vars && sv.vars[k] !== undefined ? sv.vars[k] : spec.sl[k].start) : spec.fix[k]; });
      paintPanel(); report();
    },
  });
})(WPB);
