// Fraction bars: one or two bars of the same length, each split into equal parts with some shaded, so students see
// when two fractions are the same amount (equivalent fractions), and a hundred grid for percentages.
//   widget: bars
//   slider a: 0, 6, 2        parts shaded in the top bar (or fixed: "a: 2")
//   slider b: 1, 12, 3       parts in the top bar (or fixed)
//   slider c: 0, 12, 4       optional second bar: parts shaded …
//   slider d: 1, 12, 6       … out of d parts (give c and d, or neither)
//   hundred: on              the second bar is a 10 by 10 grid instead (d is 100; c from 0 to 100 shaded)
//   show: decimal, percent   also write each fraction as a decimal and/or a percentage
// state: { scope: { vars: { a, b, c, d, v (a/b), w (c/d), e (1 when a/b = c/d), t (1 when a/b is in lowest terms),
//   s (1 when c/d is), p (a/b as a percentage) } } }
// Checks: "e = 1 and d = 6", "b = 4 and a = 3", "e = 1 and s = 1", "c = 75".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NAMES = ['a', 'b', 'c', 'd'];
  var gcd = function (x, y) { return y ? gcd(y, x % y) : Math.abs(x); };
  var r3 = function (v) { return Math.round(v * 1000) / 1000; };

  function num(t, where) { var v = Number(String(t).trim()); if (!isFinite(v) || v !== Math.round(v)) throw new Error(where + ': "' + String(t).trim() + '" is not a whole number.'); return v; }
  function parse(s) {
    s.sl = {}; s.fixed = {};
    s.hundred = /^on$/i.test(s.hundred || '');
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      var where = 'Line ' + it.line + ' (slider ' + (it.name || '') + ')';
      if (NAMES.indexOf(it.name) < 0) throw new Error(where + ': fraction bars have sliders a, b (top bar) and c, d (second bar) only.');
      var v = it.value.split(',').map(function (t) { return num(t, where); });
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error(where + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { name: it.name, min: v[0], max: v[1], start: v[2] };
    });
    NAMES.forEach(function (n) { if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': give it a slider or a fixed value, not both.'); s.fixed[n] = num(s[n], n); } });
    ['a', 'b'].forEach(function (n) { if (!s.sl[n] && s.fixed[n] === undefined) throw new Error(n + ': the top bar needs ' + n + ' (a slider or a value).'); });
    if (s.hundred) { if (s.sl.d || s.fixed.d !== undefined) throw new Error('hundred: on fixes d at 100; leave d out.'); s.fixed.d = 100; }
    s.two = !!(s.sl.c || s.fixed.c !== undefined);
    if (s.two !== !!(s.sl.d || s.fixed.d !== undefined)) throw new Error('The second bar needs both c and d (or hundred: on and c).');
    var lo = function (n) { return s.sl[n] ? s.sl[n].min : s.fixed[n]; }, hi = function (n) { return s.sl[n] ? s.sl[n].max : s.fixed[n]; };
    if (lo('b') < 1 || hi('b') > 24) throw new Error('b: from 1 to 24 parts.');
    if (s.two && !s.hundred && (lo('d') < 1 || hi('d') > 24)) throw new Error('d: from 1 to 24 parts.');
    if (lo('a') < 0 || (s.two && lo('c') < 0)) throw new Error('a and c: shaded parts start at 0.');
    var shows = String(s.show || '').split(',').map(function (t) { return t.trim().toLowerCase(); }).filter(Boolean);
    shows.forEach(function (t) { if (t !== 'decimal' && t !== 'percent') throw new Error('show: decimal and/or percent.'); });
    s.dec = shows.indexOf('decimal') >= 0; s.pct = shows.indexOf('percent') >= 0;
  }

  var frac = function (k, n) { return k + '/' + n; };
  function forms(k, n) {
    var t = frac(k, n), v = k / n;
    if (spec.dec) t += ' = ' + String(r3(v)) + (Math.abs(r3(v) - v) > 1e-12 ? '…' : '');
    if (spec.pct) t += ' = ' + String(Math.round(v * 1000) / 10) + '%' + (Math.abs(Math.round(v * 1000) / 10 - v * 100) > 1e-9 ? '…' : '');
    return t;
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var W = 10, H = 1.3, two = spec.two, hund = spec.hundred;
    var top = hund ? 8.6 : two ? 4.2 : 2;
    var board = B.jsx({ boundingbox: [-0.8, top + 1.0, W + 0.8, hund ? -0.6 : -0.4], keepAspectRatio: true });
    var rect = function (x, y, w, h, fill, col, op) {
      board.create('polygon', [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fillColor: fill, fillOpacity: op, borders: { strokeColor: col, strokeWidth: 1.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    };
    var bar = function (y, k, n, col) {
      var w = W / n;
      for (var i = 0; i < n; i++) rect(i * w, y, w, H, col, col, i < k ? 0.55 : 0.05);
      if (k > n) for (var j = n; j < k; j++) rect(W + 0.3 + (j - n) * w, y, w, H, col, col, 0.55);   // more than one whole
    };
    bar(top - H, vars.a, vars.b, blue);
    if (two && !hund) bar(top - H - 2.2, vars.c, vars.d, orange);
    if (hund) {   // a 10 by 10 grid, filled row by row from the bottom left, the same width as the bar
      var sq = 0.55, x0 = (W - 10 * sq) / 2, y0 = 0;
      for (var q = 0; q < 100; q++) { var col = q % 10, row = Math.floor(q / 10); rect(x0 + col * sq, y0 + row * sq, sq, sq, orange, orange, q < vars.c ? 0.55 : 0.04); }
    }
    board.create('text', [W / 2, top + 0.5, function () { return forms(vars.a, vars.b); }], { anchorX: 'middle', anchorY: 'middle', fontSize: 17, cssClass: 'tside', highlightCssClass: 'tside', strokeColor: blue, fixed: true, highlight: false });
    if (two && !hund) board.create('text', [W / 2, top - H - 2.2 - 0.45, function () { return forms(vars.c, vars.d); }], { anchorX: 'middle', anchorY: 'middle', fontSize: 17, cssClass: 'tside', highlightCssClass: 'tside', strokeColor: orange, fixed: true, highlight: false });
    if (hund) board.create('text', [W / 2 + 3.4, 2.75, function () { return vars.c + ' out of 100'; }], { anchorX: 'left', anchorY: 'middle', fontSize: 15, cssClass: 'tside', highlightCssClass: 'tside', strokeColor: orange, fixed: true, highlight: false });
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
      row.append(lab, minus, r, plus, out); panel.appendChild(row);
      ui.sliders.push({ n: n, out: out });
    });
    var bar = document.createElement('div'); bar.className = 'gbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    ui.sliders.forEach(function (s) { s.out.textContent = s.n + ' = ' + vars[s.n]; });
    var a = vars.a, b = vars.b, v = a / b, scope = { a: a, b: b, v: r3(v), t: gcd(a, b) === 1 || a === 0 ? 1 : 0, p: Math.round(v * 1000) / 10 }, work, note = '';
    if (spec.two) {
      var c = vars.c, d = vars.d, w = c / d, eq = a * d === b * c;
      scope.c = c; scope.d = d; scope.w = r3(w); scope.e = eq ? 1 : 0; scope.s = gcd(c, d) === 1 || c === 0 ? 1 : 0;
      var right = spec.hundred ? c + '/100' + (spec.pct ? ' = ' + c + '%' : '') : forms(c, d);
      work = eq ? frac(a, b) + ' = ' + (spec.hundred ? c + '/100' : frac(c, d)) : frac(a, b) + ' and ' + (spec.hundred ? c + '/100' : frac(c, d)) + ' are not equal';
      if (eq) {
        var D = spec.hundred ? 100 : d;
        note = D % b === 0 && D !== b ? 'The same amount is shaded. Each part of the top bar is split into ' + (D / b) + ': × ' + (D / b) + ' on the top and the bottom.'
          : b % D === 0 && b !== D ? 'The same amount is shaded. Join ' + (b / D) + ' parts of the top bar at a time: ÷ ' + (b / D) + ' on the top and the bottom.'
          : 'The same amount is shaded.';
      } else note = (v > w ? frac(a, b) : (spec.hundred ? c + '/100' : frac(c, d))) + ' is more. ' + right + '.';
    } else {
      work = forms(a, b);
      note = a === 0 ? 'Nothing shaded.' : a === b ? 'The whole bar: ' + a + '/' + b + ' = 1.' : a > b ? 'More than one whole: ' + a + '/' + b + ' = ' + Math.floor(a / b) + (a % b ? ' ' + (a % b) + '/' + b : '') + '.' : (scope.t ? 'In lowest terms.' : 'Not in lowest terms: ' + a + ' and ' + b + ' share a factor of ' + gcd(a, b) + '.');
    }
    ui.work.textContent = work; ui.note.textContent = note;
    B.say('');
    B.save({ vars: { a: vars.a, b: vars.b, c: vars.c, d: vars.d } });
    B.post({ scope: { vars: scope, points: {} } }, work + '. ' + note);
  }

  B.widget('bars', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.hundred ? 'A fraction bar and a hundred grid' : 'Fraction bars: equal parts, some shaded'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      NAMES.forEach(function (n) { if (spec.sl[n] || spec.fixed[n] !== undefined) vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined && sv.vars[n] !== null ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      paintPanel();
      build();
      report();
    },
  });
})(WPB);
