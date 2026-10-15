// Money models: successive percentage changes (each a multiplier), or income tax in brackets (marginal rates).
//   widget: money
//   mode: change | tax
// change: a starting amount q, then two percentage changes one after the other, drawn as three bars.
//   q: 100  (or "slider q: 50, 500, 100, 10")   slider a: -50, 50, 20, 5   slider b: -50, 50, -20, 5   (or fixed)
//   units: $
// state vars: q, a, b, x (after the first change), y (after the second), m (the overall multiplier, 4 dp),
//   c (the overall percentage change, 2 dp).  Checks: "a = 20 and b = -20 and c = -4", "y = 99".
// tax: an income split into brackets, each taxed at its own rate (only the part of the income inside the bracket).
//   slider i: 0, 200000, 60000, 1000   the income (or fixed)
//   brackets: 18200: 0; 45000: 15; 135000: 30; 190000: 37; 45    each "top of the bracket: rate %", the last rate alone
//   units: $
// state vars: i, t (the tax, whole dollars), e (the effective rate: t ÷ i, %, 2 dp), r (the marginal rate: the rate on the
//   last dollar, %), n (income after tax).  Checks: "i = 60000 and t = 8520", "r = 30", "e < 20".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.mode = /^tax$/i.test(s.mode || '') ? 'tax' : 'change';
    var names = s.mode === 'tax' ? ['i'] : ['q', 'a', 'b'];
    s.names = names; s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (names.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': this board has sliders ' + names.join(', ') + '.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': min, max, start, step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    var def = { q: 100, a: 10, b: -10, i: 60000 };
    names.forEach(function (n) { if (!s.sl[n]) s.fix[n] = s[n] !== undefined ? nums(s[n], n)[0] : def[n]; });
    s.u = s.units !== undefined ? String(s.units).trim() : '$';
    if (s.mode === 'change') {
      ['a', 'b'].forEach(function (n) { var lo = s.sl[n] ? s.sl[n].min : s.fix[n]; if (lo <= -100) throw new Error(n + ': more than −100 (a fall of 100% leaves nothing).'); });
    } else {
      var parts = String(s.brackets || '18200: 0; 45000: 15; 135000: 30; 190000: 37; 45').split(';').map(function (x) { return x.trim(); });
      s.br = []; var last = 0;
      parts.forEach(function (p, i) {
        var m = /^(\d+)\s*:\s*(\d+(\.\d+)?)$/.exec(p), lone = /^(\d+(\.\d+)?)$/.exec(p);
        if (m) { var top = +m[1]; if (top <= last) throw new Error('brackets: each top must be bigger than the last.'); s.br.push({ lo: last, hi: top, rate: +m[2] }); last = top; }
        else if (lone && i === parts.length - 1) s.br.push({ lo: last, hi: Infinity, rate: +lone[1] });
        else throw new Error('brackets: "top: rate" for each bracket, then the last rate on its own, such as "18200: 0; 45000: 16; 30".');
      });
      if (s.br[s.br.length - 1].hi !== Infinity) throw new Error('brackets: end with the top rate on its own.');
    }
  }
  var money = function (v) { var neg = v < 0; v = Math.abs(v); var s = (Math.round(v * 100) % 100 ? v.toFixed(2) : String(Math.round(v))).replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (neg ? '−' : '') + (spec.u === '$' ? '$' + s : s + (spec.u ? ' ' + spec.u : '')); };
  var pct = function (v) { return (v > 0 ? '+' : v < 0 ? '−' : '') + B.fmt(r2(Math.abs(v))) + '%'; };

  function taxOf(i) {
    var t = 0, slices = [];
    spec.br.forEach(function (b) { var part = Math.max(0, Math.min(i, b.hi) - b.lo); if (part > 0) { var tx = part * b.rate / 100; t += tx; slices.push({ b: b, part: part, tax: tx }); } });
    var marg = 0; spec.br.forEach(function (b) { if (i > b.lo) marg = b.rate; });
    return { t: Math.floor(t + 1e-9), slices: slices, marg: marg };
  }

  function svgBase(H) {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0'; svg.setAttribute('viewBox', '0 0 900 ' + H);
    el.appendChild(svg);
    return { svg: svg, add: function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; } };
  }
  var font = 'system-ui, sans-serif';

  function drawChange(C) {
    var o = svgBase(330), add = o.add;
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', purple = B.css('--right') || '#8a4fb8';
    var top = Math.max(C.q, C.x, C.y, 1), base = 270, scale = 210 / top;
    var bars = [[C.q, 'Start', blue], [C.x, (C.a >= 0 ? 'Up ' : 'Down ') + B.fmt(Math.abs(C.a)) + '%', orange], [C.y, (C.b >= 0 ? 'Up ' : 'Down ') + B.fmt(Math.abs(C.b)) + '%', purple]];
    bars.forEach(function (b, i) {
      var x = 120 + i * 250, h = b[0] * scale;
      add('rect', { x: x, y: base - h, width: 120, height: h, fill: b[2], 'fill-opacity': 0.3, stroke: b[2], 'stroke-width': 2 });
      add('text', { x: x + 60, y: base - h - 12, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, 'font-family': font, fill: ink }, money(b[0]));
      add('text', { x: x + 60, y: base + 26, 'text-anchor': 'middle', 'font-size': 16, 'font-family': font, fill: muted }, b[1]);
      if (i) add('text', { x: x - 65, y: base - 60, 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 700, 'font-family': font, fill: b[2] }, '× ' + B.fmt(i === 1 ? C.m1 : C.m2));
    });
    add('line', { x1: 80, y1: base - C.q * scale, x2: 860, y2: base - C.q * scale, stroke: blue, 'stroke-width': 1.5, 'stroke-dasharray': '6 5' });
    add('line', { x1: 80, y1: base, x2: 860, y2: base, stroke: ink, 'stroke-width': 2 });
    o.svg.setAttribute('aria-label', 'Bars: start ' + money(C.q) + ', then ' + money(C.x) + ', then ' + money(C.y) + '.');
  }
  function drawTax(T, i) {
    var o = svgBase(300), add = o.add;
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', cols = [B.css('--ok') || '#2e7d32', B.css('--left') || '#2f6fb3', B.css('--accent') || '#c2570a', B.css('--right') || '#8a4fb8', B.css('--bad') || '#b3261e'];
    var maxI = spec.sl.i ? spec.sl.i.max : Math.max(i, 1), L = 40, R = 860, X = function (v) { return L + (R - L) * v / maxI; };
    spec.br.forEach(function (b, k) {
      var hi = Math.min(b.hi, maxI); if (b.lo >= maxI) return;
      add('rect', { x: X(b.lo), y: 70, width: Math.max(0, X(hi) - X(b.lo)), height: 26, fill: cols[k % cols.length], 'fill-opacity': 0.12, stroke: cols[k % cols.length], 'stroke-width': 1 });
      add('text', { x: (X(b.lo) + X(hi)) / 2, y: 62, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, 'font-family': font, fill: cols[k % cols.length] }, b.rate + '%');
    });
    T.slices.forEach(function (s) {
      var k = spec.br.indexOf(s.b);
      add('rect', { x: X(s.b.lo), y: 110, width: Math.max(1, X(s.b.lo + s.part) - X(s.b.lo)), height: 46, fill: cols[k % cols.length], 'fill-opacity': 0.4, stroke: cols[k % cols.length], 'stroke-width': 2 });
      if (X(s.b.lo + s.part) - X(s.b.lo) > 54) add('text', { x: (X(s.b.lo) + X(s.b.lo + s.part)) / 2, y: 182, 'text-anchor': 'middle', 'font-size': 14, 'font-family': font, fill: ink }, 'tax ' + money(Math.round(s.tax)));
    });
    add('line', { x1: X(i), y1: 100, x2: X(i), y2: 166, stroke: ink, 'stroke-width': 3 });
    add('text', { x: Math.min(X(i), 760), y: 230, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, 'font-family': font, fill: ink }, 'income ' + money(i));
    add('text', { x: L, y: 30, 'font-size': 15, 'font-family': font, fill: muted }, 'Each part of the income is taxed at its own bracket\'s rate.');
    o.svg.setAttribute('aria-label', 'An income of ' + money(i) + ' split into tax brackets; tax ' + money(T.t) + '.');
  }

  function slider(nm, label, fmt) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[nm] = r2(v); rr.value = vars[nm]; B.moved = true; report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - sl.step); });
    plus.addEventListener('click', function () { set(vars[nm] + sl.step); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out, fmt: fmt });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var lab = { q: ['the starting amount', money], a: ['the first change', pct], b: ['the second change', pct], i: ['the income', money] };
    spec.names.forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n, lab[n][0], lab[n][1])); });
    var bar = document.createElement('div'); bar.className = 'gbar'; var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + o.fmt(vars[o.n]); });
    var sc, work, note;
    if (spec.mode === 'change') {
      var q = vars.q, a = vars.a, b = vars.b, m1 = Math.round((1 + a / 100) * 10000) / 10000, m2 = Math.round((1 + b / 100) * 10000) / 10000, x = r2(q * m1), y = r2(q * m1 * m2), m = Math.round(m1 * m2 * 10000) / 10000, c = r2((m - 1) * 100);
      drawChange({ q: q, a: a, b: b, x: x, y: y, m1: m1, m2: m2 });
      work = money(q) + ' × ' + B.fmt(m1) + ' × ' + B.fmt(m2) + ' = ' + money(y);
      note = 'Overall multiplier ' + B.fmt(m1) + ' × ' + B.fmt(m2) + ' = ' + B.fmt(m) + ': ' + (c === 0 ? 'back where it started.' : 'an overall change of ' + pct(c) + '.') + (a !== 0 && a === -b ? ' The second change is a percentage of a different amount, so it does not undo the first.' : '');
      sc = { q: q, a: a, b: b, x: x, y: y, m: m, c: c };
    } else {
      var i = vars.i, T = taxOf(i), e = i ? r2(T.t / i * 100) : 0;
      drawTax(T, i);
      work = 'Tax on ' + money(i) + ' = ' + (T.slices.filter(function (s) { return s.tax > 0; }).map(function (s) { return money(s.part) + ' × ' + s.b.rate + '%'; }).join(' + ') || '0') + ' = ' + money(T.t);
      note = 'Marginal rate (on the last dollar): ' + T.marg + '%. Effective rate (all the tax ÷ the income): ' + B.fmt(e) + '%. After tax: ' + money(i - T.t) + '.';
      sc = { i: i, t: T.t, e: e, r: T.marg, n: i - T.t };
    }
    ui.work.textContent = work; ui.note.textContent = note;
    B.say(work + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: sc, points: {} } }, work + '. ' + note);
  }
  B.widget('money', {
    sections: ['board', 'gpanel'],
    label: function (s) { return /^tax$/i.test(s.mode || '') ? 'An income split into tax brackets' : 'An amount after two percentage changes'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      vars = {}; spec.names.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fix[n]; });
      paintPanel(); report();
    },
  });
})(WPB);
