// Long division of a fraction a/b into a decimal, step by step: each step brings down a 0, gives a digit and a remainder.
// If a remainder is 0 the decimal terminates; if a remainder comes back, the digits from there repeat forever.
//   widget: longdiv
//   slider a: 1, 20, 1        the numerator (or fixed "a: 1")
//   slider b: 2, 30, 7        the denominator (or fixed "b: 7"; 2 to 60)
//   factors: on               also simplify the fraction and show the denominator's prime factors, with the 2s-and-5s rule
// state: { scope: { vars: { a, b, t (1 if it terminates), p (how many digits repeat; 0 if it terminates), d (digits after
//   the point before the repeat starts, or all of them if it terminates), s (the denominator in simplest form), f (1 if
//   s has no prime factors but 2 and 5) } } }
// Checks: "t = 0 and p = 6", "b = 8 and t = 1", "f = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {};
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 'a' && it.name !== 'b') throw new Error('Line ' + it.line + ': the board has sliders a (the numerator) and b (the denominator).');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v.some(function (x) { return x !== Math.round(x); })) throw new Error('slider ' + it.name + ': whole numbers min, max, start.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2] };
    });
    ['a', 'b'].forEach(function (n) { if (!s.sl[n]) s.fix[n] = s[n] !== undefined ? Math.round(nums(s[n], n)[0]) : (n === 'a' ? 1 : 7); });
    var bmin = s.sl.b ? s.sl.b.min : s.fix.b, bmax = s.sl.b ? s.sl.b.max : s.fix.b, amin = s.sl.a ? s.sl.a.min : s.fix.a;
    if (bmin < 2 || bmax > 60) throw new Error('b: 2 to 60.');
    if (amin < 1) throw new Error('a: from 1.');
    s.fac = /^on$/i.test(s.factors || '');
  }
  var gcd = function (x, y) { while (y) { var t = y; y = x % y; x = t; } return x; };
  function primes(n) { var out = []; for (var p = 2; p * p <= n; p++) while (n % p === 0) { out.push(p); n /= p; } if (n > 1) out.push(n); return out; }
  function divide(a, b) {
    var q = Math.floor(a / b), r = a % b, steps = [], seen = {}, digits = [];
    while (r !== 0 && seen[r] === undefined && digits.length < 80) {
      seen[r] = digits.length;
      var r10 = r * 10, dgt = Math.floor(r10 / b), nr = r10 % b;
      steps.push({ r: r, r10: r10, d: dgt, nr: nr }); digits.push(dgt); r = nr;
    }
    var term = r === 0, start = term ? digits.length : seen[r];
    return { q: q, digits: digits, steps: steps, term: term, start: start, period: term ? 0 : digits.length - start, back: term ? null : r };
  }

  function draw(D) {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#d9dde3';
    var font = 'system-ui, sans-serif', mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
    var a = vars.a, b = vars.b, shown = Math.min(D.steps.length, 12), W = 880, H = 120 + shown * 30 + 30;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    // the decimal, with a bar over the repeating digits
    var cw = 22, x0 = 40, y0 = 62, maxShow = 30;
    var head = a + ' ÷ ' + b + ' = ' + D.q + (D.digits.length ? '.' : '');
    add('text', { x: x0, y: y0, 'font-size': 36, 'font-family': mono, fill: ink }, head);
    var xs = x0 + head.length * cw;
    var nd = Math.min(D.digits.length, maxShow);
    for (var i = 0; i < nd; i++) {
      var rep = !D.term && i >= D.start;
      add('text', { x: xs + i * cw, y: y0, 'font-size': 36, 'font-family': mono, fill: rep ? orange : ink, 'font-weight': rep ? 700 : 400 }, String(D.digits[i]));
    }
    if (!D.term && D.start < nd) add('line', { x1: xs + D.start * cw, y1: y0 - 32, x2: xs + Math.min(D.digits.length, maxShow) * cw - 2, y2: y0 - 32, stroke: orange, 'stroke-width': 3 });
    if (D.digits.length > maxShow) add('text', { x: xs + nd * cw + 4, y: y0, 'font-size': 30, 'font-family': mono, fill: muted }, '…');
    // the steps
    var ty = 110;
    add('text', { x: 40, y: ty, 'font-size': 15, 'font-family': font, fill: muted, 'font-weight': 600 }, 'remainder × 10');
    add('text', { x: 230, y: ty, 'font-size': 15, 'font-family': font, fill: muted, 'font-weight': 600 }, '÷ ' + b + ' gives the digit');
    add('text', { x: 470, y: ty, 'font-size': 15, 'font-family': font, fill: muted, 'font-weight': 600 }, 'new remainder');
    add('line', { x1: 40, y1: ty + 8, x2: 700, y2: ty + 8, stroke: line, 'stroke-width': 1.5 });
    for (var j = 0; j < shown; j++) {
      var st = D.steps[j], y = ty + 32 + j * 30, again = !D.term && j === D.start;
      add('text', { x: 40, y: y, 'font-size': 18, 'font-family': mono, fill: again ? orange : ink, 'font-weight': again ? 700 : 400 }, st.r + ' × 10 = ' + st.r10);
      add('text', { x: 230, y: y, 'font-size': 18, 'font-family': mono, fill: ink }, st.r10 + ' ÷ ' + b + ' = ' + st.d + ' r ' + st.nr);
      add('text', { x: 470, y: y, 'font-size': 18, 'font-family': mono, fill: st.nr === 0 ? blue : (!D.term && st.nr === D.back && j === D.steps.length - 1 ? orange : ink), 'font-weight': st.nr === 0 || (!D.term && j === D.steps.length - 1) ? 700 : 400 }, String(st.nr));
      if (st.nr === 0) add('text', { x: 520, y: y, 'font-size': 15, 'font-family': font, fill: blue }, 'remainder 0: it stops');
      if (!D.term && j === D.steps.length - 1) add('text', { x: 520, y: y, 'font-size': 15, 'font-family': font, fill: orange }, 'remainder ' + st.nr + ' again: it repeats');
    }
    if (D.steps.length > shown) add('text', { x: 40, y: ty + 32 + shown * 30, 'font-size': 15, 'font-family': font, fill: muted }, '… ' + (D.steps.length - shown) + ' more steps before a remainder comes back');
    svg.setAttribute('aria-label', a + ' divided by ' + b + ' is ' + decimalText(D) + '.');
    el.appendChild(svg);
  }
  function decimalText(D) {
    if (!D.digits.length) return String(D.q);
    var s = D.q + '.' + D.digits.slice(0, D.start).join('');
    if (D.term) return s;
    return s + '(' + D.digits.slice(D.start).join('') + ' repeating)';
  }

  function slider(nm, label) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = 1; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { vars[nm] = Math.max(sl.min, Math.min(sl.max, Math.round(v))); rr.value = vars[nm]; B.moved = true; report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - 1); });
    plus.addEventListener('click', function () { set(vars[nm] + 1); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl.a) panel.appendChild(slider('a', 'the numerator'));
    if (spec.sl.b) panel.appendChild(slider('b', 'the denominator'));
    if (spec.sl.a || spec.sl.b) { var bar = document.createElement('div'); bar.className = 'gbar'; var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar); }
  }
  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + vars[o.n]; });
    var a = vars.a, b = vars.b, D = divide(a, b), g = gcd(a, b), s = b / g, pf = primes(s), only = pf.every(function (p) { return p === 2 || p === 5; });
    draw(D);
    ui.work.textContent = a + '/' + b + ' = ' + (D.term ? decimalText(D) : D.q + '.' + D.digits.slice(0, D.start).join('') + D.digits.slice(D.start).join('') + D.digits.slice(D.start).join('').slice(0, 6) + '… (' + D.digits.slice(D.start).join('') + ' repeats)');
    var note = D.term ? 'A remainder of 0: the decimal terminates after ' + D.digits.length + (D.digits.length === 1 ? ' digit.' : ' digits.') : 'Remainder ' + D.back + ' came back, so the last ' + D.period + (D.period === 1 ? ' digit repeats' : ' digits repeat') + ' forever: a recurring decimal (bar over the repeat).';
    if (spec.fac) note += ' In simplest form ' + (a / g) + '/' + s + (s > 1 ? ': ' + (pf.length === 1 ? s + ' is prime' : s + ' = ' + pf.join(' × ')) + (only ? ', only 2s and 5s, so it terminates.' : ', which has a prime factor other than 2 and 5, so it recurs.') : '.');
    ui.note.textContent = note;
    B.say(a + ' over ' + b + ' is ' + decimalText(D) + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: { a: a, b: b, t: D.term ? 1 : 0, p: D.period, d: D.start, s: s, f: only ? 1 : 0 }, points: {} } }, ui.work.textContent + '. ' + note);
  }
  B.widget('longdiv', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Long division of a fraction into a decimal'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      vars = {}; ['a', 'b'].forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fix[n]; });
      paintPanel(); report();
    },
  });
})(WPB);
