// Percentage bar: a quantity drawn as a bar marked 0% to 100% above and in amounts below, with p% of it shaded, so a
// percentage of a quantity is "p hundredths of it" (p ÷ 100 × q), and an increase or decrease adds or takes off that part
// (q × (1 + p/100) or q × (1 − p/100)).
//   widget: percent
//   q: 80                    the quantity (or "slider q: 20, 200, 80, 10")
//   slider p: 0, 100, 25, 5  the percentage (min, max, start, step; up to 200 for increases)
//   mode: of                 of (default) | increase | decrease
//   units: $                 "$" goes before amounts; anything else (kg, m) goes after
// state: { scope: { vars: { q, p, v (p% of q), n (the new amount: q + v, q − v, or v for "of"), m (the multiplier) } } }
// Checks: "p = 15 and v = 12", "n = 92", "m = 0.85".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var r4 = function (v) { return Math.round(v * 10000) / 10000; };
  var r2 = function (v) { return Math.round(v * 100) / 100; };

  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.sl = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 'p' && it.name !== 'q') throw new Error('Line ' + it.line + ': the percentage bar has sliders p (the percentage) and q (the quantity) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] < 0) throw new Error('slider ' + it.name + ': needs min, max, start (from 0 up, start between them), and an optional step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    ['p', 'q'].forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s['f' + n] = nums(s[n], n)[0]; }
      else if (!s.sl[n]) throw new Error(n + ': needs a slider or a value.');
    });
    s.mode = String(s.mode || 'of').trim().toLowerCase();
    if (['of', 'increase', 'decrease'].indexOf(s.mode) < 0) throw new Error('mode: of, increase or decrease.');
    var pmax = s.sl.p ? s.sl.p.max : s.fp;
    if (pmax > (s.mode === 'increase' ? 200 : 100)) throw new Error('p: up to ' + (s.mode === 'increase' ? 200 : 100) + '% for mode ' + s.mode + '.');
    s.u = s.units ? String(s.units).trim() : '';
    s.pmax = s.mode === 'increase' ? pmax : 100;
  }
  function amt(v) { v = B.fmt(r2(v)); return spec.u === '$' ? '$' + v : spec.u ? v + ' ' + spec.u : v; }

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#e4e1da';
    var W = 1 + spec.pmax / 100 * (spec.mode === 'increase' ? 1 : 0);
    var board = B.jsx({ boundingbox: [-0.08 * W, 0.62, W * 1.06, -0.5], keepAspectRatio: false });
    var p = vars.p / 100, q = vars.q, y0 = 0, y1 = 0.25;
    var rect = function (x0, x1, fill, op, dash) { board.create('polygon', [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], { fillColor: fill, fillOpacity: op, borders: { strokeColor: dash ? fill : ink, strokeWidth: dash ? 2 : 0, dash: dash ? 2 : 0, visible: !!dash, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false }); };
    if (spec.mode === 'of') rect(0, p, blue, 0.35);
    else if (spec.mode === 'decrease') { rect(0, 1 - p, blue, 0.35); if (p) rect(1 - p, 1, orange, 0.18, true); }
    else { rect(0, 1, blue, 0.35); if (p) rect(1, 1 + p, orange, 0.35); }
    board.create('polygon', [[0, y0], [1, y0], [1, y1], [0, y1]], { fillOpacity: 0, borders: { strokeColor: ink, strokeWidth: 2.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    var txt = function (x, y, t, col, sz) { board.create('text', [x, y, t], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: sz || 14, fixed: true, highlight: false }); };
    var step = 0.1, top = spec.mode === 'increase' ? 1 + p : 1;
    var px = ((B.el('board') || {}).clientWidth || 700) / (W * 1.14) * step;   // pixels per 10%
    var stride = px >= 36 ? 1 : px >= 18 ? 2 : 5;
    for (var k = 0; k <= Math.floor(top / step + 1e-9); k++) {
      var x = r4(k * step);
      board.create('segment', [[x, y1], [x, y1 + 0.05]], { strokeColor: muted, strokeWidth: 1, fixed: true, highlight: false });
      if (k % stride === 0) txt(x, y1 + 0.12, Math.round(x * 100) + '%', muted, 12);
      board.create('segment', [[x, y0], [x, y1]], { strokeColor: line, strokeWidth: 1, fixed: true, highlight: false });
    }
    // amounts below: 0, the part, the whole (and the new total)
    var marks = [[0, 0]];
    if (spec.mode === 'of') marks.push([p, q * p]), marks.push([1, q]);
    else if (spec.mode === 'decrease') marks.push([1 - p, q * (1 - p)]), marks.push([1, q]);
    else marks.push([1, q]), marks.push([1 + p, q * (1 + p)]);
    var last = -1;
    marks.forEach(function (m) {
      board.create('segment', [[m[0], y0], [m[0], y0 - 0.06]], { strokeColor: ink, strokeWidth: 1.5, fixed: true, highlight: false });
      var low = m[0] - last < 0.12 * W;
      txt(m[0], low ? -0.28 : -0.14, amt(m[1]), m[0] === 0 || m[0] === 1 ? ink : orange, 15);
      last = low ? -1 : m[0];
    });
    if (p && spec.mode !== 'of') txt(spec.mode === 'decrease' ? 1 - p / 2 : 1 + p / 2, y1 / 2, (spec.mode === 'decrease' ? '−' : '+') + vars.p + '%', orange, 14);
    board.update();
  }

  function slider(n, label) {
    var sl = spec.sl[n], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, r4(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars[n] = v; r.value = v; B.moved = true; build(); report(); };
    r.addEventListener('input', function () { set(Number(r.value)); });
    minus.addEventListener('click', function () { set(vars[n] - sl.step); });
    plus.addEventListener('click', function () { set(vars[n] + sl.step); });
    row.append(lab, minus, r, plus, out); ui.outs.push({ n: n, out: out });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl.p) panel.appendChild(slider('p', 'the percentage'));
    if (spec.sl.q) panel.appendChild(slider('q', 'the quantity'));
    if (spec.sl.p || spec.sl.q) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var p = vars.p, q = vars.q, v = r2(q * p / 100), dec = r4(p / 100), m, n;
    ui.outs.forEach(function (o) { o.out.textContent = o.n === 'p' ? 'p = ' + B.fmt(p) + '%' : 'q = ' + amt(q); });
    if (spec.mode === 'of') { m = dec; n = v; ui.work.textContent = B.fmt(p) + '% of ' + amt(q) + ' = ' + B.fmt(dec) + ' × ' + B.fmt(q) + ' = ' + amt(v); ui.note.textContent = B.fmt(p) + '% means ' + B.fmt(p) + ' out of every 100' + (p === 10 ? ': divide by 10.' : p === 50 ? ': half.' : p === 25 ? ': a quarter.' : '.'); }
    else if (spec.mode === 'increase') { m = r4(1 + dec); n = r2(q + v); ui.work.textContent = amt(q) + ' + ' + B.fmt(p) + '% = ' + amt(q) + ' + ' + amt(v) + ' = ' + amt(n); ui.note.textContent = 'In one step: ' + B.fmt(q) + ' × ' + B.fmt(m) + ' = ' + B.fmt(n) + ' (100% + ' + B.fmt(p) + '% = ' + B.fmt(100 + p) + '%).'; }
    else { m = r4(1 - dec); n = r2(q - v); ui.work.textContent = amt(q) + ' − ' + B.fmt(p) + '% = ' + amt(q) + ' − ' + amt(v) + ' = ' + amt(n); ui.note.textContent = 'In one step: ' + B.fmt(q) + ' × ' + B.fmt(m) + ' = ' + B.fmt(n) + ' (100% − ' + B.fmt(p) + '% = ' + B.fmt(100 - p) + '%).'; }
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ p: p, q: q });
    B.post({ scope: { vars: { q: q, p: p, v: v, n: n, m: m }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('percent', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A quantity as a bar marked in percentages'; },
    resize: function () { if (spec) build(); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      ['p', 'q'].forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv[n] !== undefined ? sv[n] : spec.sl[n].start) : spec['f' + n]; });
      paintPanel(); build(); report();
    },
  });
})(WPB);
