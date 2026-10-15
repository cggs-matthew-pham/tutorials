// Fraction area: a unit square cut into b columns (a shaded) and d rows (c shaded); the overlap is a/b × c/d, so
// multiplying fractions is "c/d of a/b": the parts multiply and so do the numbers of parts.
//   widget: fracarea
//   slider a: 0, 6, 2        columns shaded (or fixed "a: 2")
//   slider b: 1, 8, 3        columns in all
//   slider c: 0, 6, 3        rows shaded
//   slider d: 1, 8, 4        rows in all
// state: { scope: { vars: { a, b, c, d, p (a × c, the overlap's parts), q (b × d, all the parts), v (the product) } } }
// Checks: "a = 2 and b = 3 and c = 3 and d = 4", "p = 6 and q = 12".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NAMES = ['a', 'b', 'c', 'd'];
  var gcd = function (x, y) { return y ? gcd(y, x % y) : x; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v) || v !== Math.round(v)) throw new Error(where + ': "' + x.trim() + '" is not a whole number.'); return v; }); }
  function parse(s) {
    s.sl = {}; s.fixed = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the fraction area has sliders a, b, c and d only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2] };
    });
    NAMES.forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fixed[n] = nums(s[n], n)[0]; }
      else if (!s.sl[n]) throw new Error(n + ': needs a slider or a value.');
    });
    ['b', 'd'].forEach(function (n) { var lo = s.sl[n] ? s.sl[n].min : s.fixed[n]; var hi = s.sl[n] ? s.sl[n].max : s.fixed[n]; if (lo < 1 || hi > 12) throw new Error(n + ': from 1 to 12 parts.'); });
  }
  var frac = function (p, q) { return p + '/' + q; };
  var simp = function (p, q) { if (p === 0) return '0'; var g = gcd(p, q); return q / g === 1 ? String(p / g) : (p / g) + '/' + (q / g); };

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', line = B.css('--line') || '#e4e1da';
    var board = B.jsx({ boundingbox: [-0.35, 1.25, 1.35, -0.22], keepAspectRatio: true });
    var a = Math.min(vars.a, vars.b), b = vars.b, c = Math.min(vars.c, vars.d), d = vars.d;
    var rect = function (x0, y0, x1, y1, fill, op) { board.create('polygon', [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], { fillColor: fill, fillOpacity: op, borders: { visible: false }, vertices: { visible: false }, fixed: true, highlight: false }); };
    if (a) rect(0, 0, a / b, 1, blue, 0.22);
    if (c) rect(0, 0, 1, c / d, orange, 0.22);
    if (a && c) rect(0, 0, a / b, c / d, '#6b3fa0', 0.45);
    for (var i = 1; i < b; i++) board.create('segment', [[i / b, 0], [i / b, 1]], { strokeColor: blue, strokeWidth: 1.5, fixed: true, highlight: false });
    for (var j = 1; j < d; j++) board.create('segment', [[0, j / d], [1, j / d]], { strokeColor: orange, strokeWidth: 1.5, fixed: true, highlight: false });
    board.create('polygon', [[0, 0], [1, 0], [1, 1], [0, 1]], { fillOpacity: 0, borders: { strokeColor: ink, strokeWidth: 3, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    board.create('text', [a / b / 2 || 0.02, 1.1, frac(vars.a, b)], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: blue, fontSize: 18, fixed: true, highlight: false });
    board.create('text', [-0.17, c / d / 2 || 0.02, frac(vars.c, d)], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: orange, fontSize: 18, fixed: true, highlight: false });
    void line;
    board.update();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { sliders: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    NAMES.forEach(function (n) {
      var sl = spec.sl[n]; if (!sl) return;
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + n + ' smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = 1; r.value = vars[n];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + n + ' bigger');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round(v))); vars[n] = v; r.value = v; B.moved = true; build(); report(); };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars[n] - 1); });
      plus.addEventListener('click', function () { set(vars[n] + 1); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row); ui.sliders.push({ n: n, out: out });
    });
    if (Object.keys(spec.sl).length) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var a = vars.a, b = vars.b, c = vars.c, d = vars.d, p = a * c, q = b * d;
    ui.sliders.forEach(function (s) { s.out.textContent = s.n + ' = ' + vars[s.n]; });
    ui.work.textContent = frac(a, b) + ' × ' + frac(c, d) + ' = ' + frac(p, q) + (simp(p, q) !== frac(p, q) ? ' = ' + simp(p, q) : '');
    ui.note.textContent = (a > b || c > d) ? 'More than a whole: the square shows one whole only.' : 'The overlap is ' + p + ' of the ' + q + ' small parts: ' + c + '/' + d + ' of ' + a + '/' + b + '.';
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ vars: vars });
    B.post({ scope: { vars: { a: a, b: b, c: c, d: d, p: p, q: q, v: Math.round(p / q * 1e6) / 1e6 }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('fracarea', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A unit square showing one fraction of another'; },
    parse: parse,
    resize: function () { if (spec) build(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {}; NAMES.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      paintPanel(); build(); report();
    },
  });
})(WPB);
