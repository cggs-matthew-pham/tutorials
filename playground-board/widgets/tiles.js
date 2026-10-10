// Tiles: expanding a bracket as an area of algebra tiles. k(ax + b) is k rows, each row a x-tiles and b unit tiles, so
// the rectangle holds k·a x-tiles and k·b ones. Negative tiles are red with a minus sign; a negative k flips every
// tile. Extra terms (p x + q) sit to the right, so "expand, then collect" shows both steps.
//   widget: tiles
//   slider k: -4, 5, 2       the number outside the bracket (or fixed: "k: 3")
//   slider a: -3, 4, 1       the number of x in the bracket (or fixed: "a: 2")
//   slider b: -6, 6, 3       the number in the bracket (or fixed: "b: 4")
//   slider p: -3, 3, 0       optional: extra x-tiles after the bracket (or fixed: "p: -1")
//   slider q: -6, 6, 0       optional: extra ones after the bracket
//   result: off              hide the expanded expression (students work it out); the tiles still show
// Factorising (the same tiles backwards): give the tiles and let students choose the rows.
//   slider s: 1, 12, 6       x-tiles in all (or fixed: "s: 6")
//   slider t: 1, 12, 9       ones in all (or fixed: "t: 9")
//   slider k: 1, 9, 1        rows: the tiles are shared into k equal rows when k divides both, giving k(ax + b)
//   values: k, s, t, f (1 when k rows work), h (1 when k is the highest common factor: fully factorised)
// state: { scope: { vars: { k, a, b, p, q, m (x-tiles in all: k·a + p), c (ones in all: k·b + q) } } }
// Checks: "k = 3 and a = 1 and b = 2", "m = 6 and c = 12 and k > 1".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NAMES = ['k', 'a', 'b', 'p', 'q'], FNAMES = ['k', 's', 't'], XLEN = 3.3, GAP = 1.4;
  var gcd = function (x, y) { return y ? gcd(y, x % y) : Math.abs(x); };
  var names = function () { return spec && spec.factor ? FNAMES : NAMES; };
  var show = function (n) { return B.fmt(n).replace(/^-/, '−'); };

  function num(t, where) { var v = Number(String(t).trim()); if (!isFinite(v) || v !== Math.round(v)) throw new Error(where + ': "' + String(t).trim() + '" is not a whole number.'); return v; }
  function parse(s) {
    s.sl = {}; s.fixed = {};
    s.factor = s.s !== undefined || s.items.some(function (it) { return it.kind === 'slider' && it.name === 's'; });
    var NAMES = s.factor ? FNAMES : ['k', 'a', 'b', 'p', 'q'];
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      var where = 'Line ' + it.line + ' (slider ' + (it.name || '') + ')';
      if (NAMES.indexOf(it.name) < 0) throw new Error(where + (s.factor ? ': factorising uses sliders k, s and t only.' : ': the tiles board has sliders k, a, b, p and q only.'));
      var v = it.value.split(',').map(function (t) { return num(t, where); });
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error(where + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { name: it.name, min: v[0], max: v[1], start: v[2] };
    });
    NAMES.forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': give it a slider or a fixed value, not both.'); s.fixed[n] = num(s[n], n); }
      else if (!s.sl[n]) { if (n === 'p' || n === 'q') s.fixed[n] = 0; else throw new Error(n + ': needs a slider ("slider ' + n + ': 1, 9, 2") or a value ("' + n + ': 3").'); }
    });
    if (s.factor && ((s.sl.k && s.sl.k.min < 1) || (!s.sl.k && s.fixed.k < 1))) throw new Error('k: rows start at 1 when factorising.');
    s.showResult = !/^off$/i.test(s.result || '');
  }

  // "2x + 4", "x − 3", "−x", "4"
  function poly(x, c) {
    var parts = [];
    if (x) parts.push((x === 1 ? '' : x === -1 ? '−' : show(x)) + 'x');
    if (c || !parts.length) parts.push(parts.length ? (c < 0 ? '− ' + show(-c) : '+ ' + show(c)) : show(c));
    return parts.join(' ').replace(/^\+ /, '');
  }
  function bracket() { var k = vars.k, inside = poly(vars.a, vars.b); return (k === 1 ? '' : k === -1 ? '−' : show(k)) + '(' + inside + ')'; }
  function extra() { var p = vars.p, q = vars.q; if (!p && !q) return ''; var t = poly(p, q); return t.charAt(0) === '−' ? ' ' + t.replace(/^−/, '− ') : ' + ' + t; }

  // Factorising: k rows work when k divides both totals; then each row is a x-tiles and b ones.
  function derive() {
    if (!spec.factor) return;
    var k = vars.k, ok = k > 0 && vars.s % k === 0 && vars.t % k === 0;
    vars.f = ok ? 1 : 0; vars.a = ok ? vars.s / k : vars.s; vars.b = ok ? vars.t / k : vars.t; vars.p = 0; vars.q = 0;
    vars.h = ok && gcd(vars.a, vars.b) === 1 ? 1 : 0;
  }
  function build() {
    derive();
    if (spec.factor && !vars.f) return buildHeap();
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', pos1 = B.css('--left') || '#2f6fb3', pos2 = B.css('--accent') || '#c2570a', neg = '#c0392b';
    // fit what is shown now (with a minimum size), so the tiles stay big enough to read
    var extraW = (vars.p || vars.q) ? GAP + Math.abs(vars.p) * XLEN + Math.abs(vars.q) : 0;
    var W = Math.max(Math.abs(vars.a) * XLEN + Math.abs(vars.b) + extraW, 9), H = Math.max(Math.abs(vars.k), 3);
    var board = B.jsx({ boundingbox: [-1.6, H + 1.6, W + 0.6, -0.4], keepAspectRatio: true });
    var k = vars.k, a = vars.a, b = vars.b, rows = Math.abs(k), sk = k < 0 ? -1 : 1;
    var tile = function (x, y, w, sign, lab, colour) {
      var c = sign < 0 ? neg : colour;
      board.create('polygon', [[x, y], [x + w, y], [x + w, y + 1], [x, y + 1]], { fillColor: c, fillOpacity: sign < 0 ? 0.35 : 0.3, borders: { strokeColor: c, strokeWidth: 1.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
      board.create('text', [x + w / 2, y + 0.5, (sign < 0 ? '−' : '') + lab], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tlab', highlightCssClass: 'tlab', fontSize: 16, fixed: true, highlight: false });
    };
    var top = H - 1;
    for (var r = 0; r < rows; r++) {
      var y = top - r, x = 0;
      for (var i = 0; i < Math.abs(a); i++) { tile(x, y, XLEN, sk * (a < 0 ? -1 : 1), 'x', pos1); x += XLEN; }
      for (var j = 0; j < Math.abs(b); j++) { tile(x, y, 1, sk * (b < 0 ? -1 : 1), '1', pos2); x += 1; }
    }
    var bw = Math.abs(a) * XLEN + Math.abs(b);
    if (rows && bw) {
      // the rectangle: k down the side, the bracket along the top
      board.create('polygon', [[0, top + 1 - rows], [bw, top + 1 - rows], [bw, top + 1], [0, top + 1]], { fillOpacity: 0, borders: { strokeColor: ink, strokeWidth: 2.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
      board.create('text', [-0.6, top + 1 - rows / 2, show(k)], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', fontSize: 18, fixed: true, highlight: false });
      if (a) board.create('text', [Math.abs(a) * XLEN / 2, top + 1.55, (a === 1 ? '' : a === -1 ? '−' : show(a)) + 'x'], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', fontSize: 18, fixed: true, highlight: false });
      if (b) board.create('text', [Math.abs(a) * XLEN + Math.abs(b) / 2, top + 1.55, (b < 0 ? '− ' + show(-b) : (a ? '+ ' : '') + show(b))], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', fontSize: 18, fixed: true, highlight: false });
    }
    // extra terms, to the right
    if (vars.p || vars.q) {
      var x0 = Math.abs(vars.a) * XLEN + Math.abs(vars.b) + GAP, xx = x0;
      for (var u = 0; u < Math.abs(vars.p); u++) { tile(xx, top, XLEN, vars.p < 0 ? -1 : 1, 'x', pos1); xx += XLEN; }
      for (var v = 0; v < Math.abs(vars.q); v++) { tile(xx, top, 1, vars.q < 0 ? -1 : 1, '1', pos2); xx += 1; }
      // no sign between: each tile carries its own sign
    }
    board.update();
  }

  // Tiles that do not share into k equal rows: all in one heap, with the remainder shown.
  function buildHeap() {
    var ink = B.css('--ink') || '#1d2430', pos1 = B.css('--left') || '#2f6fb3', pos2 = B.css('--accent') || '#c2570a';
    var W = Math.max(Math.min(vars.s, 4) * XLEN + Math.min(vars.t, 6), 9), H = 3;
    var board = B.jsx({ boundingbox: [-1.6, H + 1.6, W + 0.6, -0.4], keepAspectRatio: true });
    var tile = function (x, y, w, lab, c) {
      board.create('polygon', [[x, y], [x + w, y], [x + w, y + 0.9], [x, y + 0.9]], { fillColor: c, fillOpacity: 0.3, borders: { strokeColor: c, strokeWidth: 1.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
      board.create('text', [x + w / 2, y + 0.45, lab], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tlab', highlightCssClass: 'tlab', fontSize: 16, fixed: true, highlight: false });
    };
    var x = 0, y = H - 1;
    for (var i = 0; i < vars.s; i++) { if (x + XLEN > W) { x = 0; y -= 1; } tile(x, y, XLEN, 'x', pos1); x += XLEN; }
    for (var j = 0; j < vars.t; j++) { if (x + 1 > W) { x = 0; y -= 1; } tile(x, y, 1, '1', pos2); x += 1; }
    board.create('text', [W / 2, H + 0.9, 'These do not share into ' + vars.k + ' equal rows'], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', fontSize: 16, strokeColor: ink, fixed: true, highlight: false });
    board.update();
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { sliders: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'tsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.count = document.createElement('p'); ui.count.className = 'tcount'; ui.count.setAttribute('aria-live', 'polite'); panel.appendChild(ui.count);
    names().forEach(function (n) {
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
    derive();
    if (spec.factor) return reportFactor();
    var m = vars.k * vars.a + vars.p, c = vars.k * vars.b + vars.q, kx = vars.k * vars.a, kc = vars.k * vars.b;
    ui.sliders.forEach(function (s) { s.out.textContent = s.n + ' = ' + show(vars[s.n]); });
    var lhs = bracket() + extra();
    var expanded = poly(kx, kc) + extra();
    var text = lhs + (spec.showResult ? ' = ' + expanded + ((vars.p || vars.q) ? ' = ' + poly(m, c) : '') : '');
    ui.work.textContent = text;
    var n = function (v, w) { return Math.abs(v) + ' ' + (v < 0 ? 'negative ' : '') + w + (Math.abs(v) === 1 ? '' : 's'); };
    ui.count.textContent = spec.showResult ? Math.abs(vars.k) + (Math.abs(vars.k) === 1 ? ' row' : ' rows') + ' of (' + poly(vars.a, vars.b) + '): ' + n(kx, 'x-tile') + ' and ' + n(kc, 'one') + '.' : Math.abs(vars.k) + (Math.abs(vars.k) === 1 ? ' row' : ' rows') + ' of (' + poly(vars.a, vars.b) + ').';
    var scope = { k: vars.k, a: vars.a, b: vars.b, p: vars.p, q: vars.q, m: m, c: c };
    B.say('');
    B.save({ vars: vars });
    B.post({ scope: { vars: scope, points: {} } }, text);
  }

  function reportFactor() {
    ui.sliders.forEach(function (sl) { sl.out.textContent = sl.n + ' = ' + show(vars[sl.n]); });
    var whole = poly(vars.s, vars.t), text;
    if (!vars.f) text = whole + ': ' + vars.k + ' rows do not work';
    else text = whole + ' = ' + (vars.k === 1 ? '1' : show(vars.k)) + '(' + poly(vars.a, vars.b) + ')';
    ui.work.textContent = text;
    var hcf = gcd(vars.s, vars.t);
    ui.count.textContent = !vars.f ? vars.k + ' does not go into both ' + vars.s + ' and ' + vars.t + '.' : vars.h ? (vars.k === 1 ? 'Each row is the whole expression: nothing to take out.' : 'Fully factorised: ' + vars.k + ' is the biggest number of rows that works.') : vars.k + ' rows work, but the rows could still be shared further.';
    B.say('');
    B.save({ vars: vars });
    B.post({ scope: { vars: { k: vars.k, s: vars.s, t: vars.t, f: vars.f, h: vars.h, g: hcf }, points: {} } }, text);
  }

  B.widget('tiles', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Algebra tiles: a bracket expanded as rows of tiles'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      names().forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      paintPanel();
      build();
      report();
    },
    redraw: function () { build(); },
    resize: function () { build(); },
  });
})(WPB);
