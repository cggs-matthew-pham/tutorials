// Adding fractions: two fraction bars (a/b and c/d) and the sum or difference end to end below, with every bar cut into
// k parts, the denominator students choose. When k is a common multiple of b and d, every bar splits evenly and the
// parts can be counted: 1/3 + 1/4 = 4/12 + 3/12 = 7/12; otherwise the board says which bar does not split.
//   widget: fracadd
//   slider a: 0, 6, 1        the first fraction's top (or fixed "a: 1"); slider b for its bottom
//   slider c: 0, 6, 1        the second fraction (c/d)
//   slider k: 1, 24, 7       the number of equal parts to cut each whole into (or fixed "k: 12")
//   op: +                    + (default), − (or -), or ? (+ and − buttons)
// state: { scope: { vars: { a, b, c, d, k, e (1 when k is a common multiple of b and d), l (1 when k is the lowest),
//   o (1 for +, −1 for −), p (parts of k in the answer, when e = 1), r (the answer's value) } } }
// Checks: "e = 1 and k = 12", "e = 1 and l = 1", "r = 7/12" (written "abs(r - 7/12) < 0.001" is safer).
(function (B) {
  'use strict';
  var spec = null, vars = {}, op = 1, ui = {};
  var NAMES = ['a', 'b', 'c', 'd', 'k'];
  var gcd = function (x, y) { return y ? gcd(y, x % y) : Math.abs(x); };
  var lcm = function (x, y) { return x / gcd(x, y) * y; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v) || v !== Math.round(v)) throw new Error(where + ': "' + x.trim() + '" is not a whole number.'); return v; }); }
  function parse(s) {
    s.sl = {}; s.fixed = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': adding fractions has sliders a, b, c, d and k only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2] };
    });
    NAMES.forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fixed[n] = nums(s[n], n)[0]; }
      else if (!s.sl[n]) throw new Error(n + ': needs a slider or a value.');
    });
    ['b', 'd', 'k'].forEach(function (n) { var lo = s.sl[n] ? s.sl[n].min : s.fixed[n], hi = s.sl[n] ? s.sl[n].max : s.fixed[n]; if (lo < 1 || hi > 24) throw new Error(n + ': from 1 to 24 parts.'); });
    var o = String(s.op || '+').trim();
    s.op = o === '+' ? 1 : (o === '-' || o === '−') ? -1 : o === '?' ? 0 : null;
    if (s.op === null) throw new Error('op: +, − or ?.');
  }
  var fr = function (p, q) { return p + '/' + q; };
  function simp(p, q) {
    if (p === 0) return '0';
    var g = gcd(p, q), P = p / g, Q = q / g;
    if (Q === 1) return String(P);
    return P > Q ? Math.floor(P / Q) + ' ' + (P % Q) + '/' + Q : P + '/' + Q;
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var a = vars.a, b = vars.b, c = vars.c, d = vars.d, k = vars.k;
    var W = op > 0 && a / b + c / d > 1 + 1e-9 ? 2 : 1;   // a second whole only when the sum needs it
    var board = B.jsx({ boundingbox: [-0.42 * W, 3.05, W * 1.04, -0.45], keepAspectRatio: false });
    var H = 0.6;
    var rect = function (x0, x1, y, fill, op2, hatch) { if (x1 - x0 < 1e-9) return; board.create('polygon', [[x0, y], [x1, y], [x1, y + H], [x0, y + H]], { fillColor: fill, fillOpacity: op2, borders: { strokeColor: fill, strokeWidth: hatch ? 2 : 0, dash: hatch ? 2 : 0, visible: !!hatch, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false }); };
    var outline = function (x0, x1, y) { board.create('polygon', [[x0, y], [x1, y], [x1, y + H], [x0, y + H]], { fillOpacity: 0, borders: { strokeColor: ink, strokeWidth: 2.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false }); };
    var cuts = function (x0, x1, y, n, col, w) { for (var i = 1; i < Math.round((x1 - x0) * n); i++) board.create('segment', [[x0 + i / n, y], [x0 + i / n, y + H]], { strokeColor: col, strokeWidth: w, fixed: true, highlight: false }); };
    var txt = function (x, y, t, col, anchor) { board.create('text', [x, y, t], { anchorX: anchor || 'right', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: 16, fixed: true, highlight: false }); };
    var A = a / b, C = c / d;
    // the two fractions, each cut into k parts when k splits them evenly, else into their own parts
    [[2.2, A, b, blue, fr(a, b)], [1.2, C, d, orange, fr(c, d)]].forEach(function (row) {
      rect(0, row[1], row[0], row[3], 0.35);
      var even = k % row[2] === 0;
      cuts(0, 1, row[0], even ? k : row[2], even ? muted : row[3], even ? 1 : 1.5);
      if (even && k !== row[2]) cuts(0, 1, row[0], row[2], row[3], 2.5);
      outline(0, 1, row[0]);
      txt(-0.04 * W, row[0] + H / 2, row[4], row[3]);
    });
    // the answer
    var y = 0.2;
    if (op > 0) {
      rect(0, A, y, blue, 0.35); rect(A, A + C, y, orange, 0.35);
      outline(0, 1, y); if (W > 1) outline(1, 2, y);
    } else {
      var R = Math.max(0, A - C);
      rect(0, R, y, blue, 0.35); if (C) rect(Math.max(0, A - C), A, y, orange, 0.15, true);
      outline(0, 1, y);
    }
    if (k % b === 0 && k % d === 0) cuts(0, W, y, k, muted, 1);
    txt(-0.04 * W, y + H / 2, op > 0 ? 'sum' : 'left', ink);
    board.update();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { sliders: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.op === 0) {
      var ops = document.createElement('div'); ops.className = 'gbar nlops'; ops.setAttribute('role', 'group'); ops.setAttribute('aria-label', 'Add or subtract');
      [[1, '+', 'Add'], [-1, '−', 'Subtract']].forEach(function (o) {
        var bt = document.createElement('button'); bt.type = 'button'; bt.textContent = o[1]; bt.setAttribute('aria-label', o[2]);
        bt.setAttribute('aria-pressed', String(op === o[0]));
        bt.addEventListener('click', function () { op = o[0]; [].forEach.call(ops.children, function (x) { x.setAttribute('aria-pressed', String(x === bt)); }); B.moved = true; build(); report(); });
        ops.appendChild(bt);
      });
      panel.appendChild(ops);
    }
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
    if (Object.keys(spec.sl).length || spec.op === 0) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var a = vars.a, b = vars.b, c = vars.c, d = vars.d, k = vars.k, sign = op > 0 ? ' + ' : ' − ';
    ui.sliders.forEach(function (s) { s.out.textContent = s.n + ' = ' + vars[s.n]; });
    var e = k % b === 0 && k % d === 0 ? 1 : 0, L = lcm(b, d), l = e && k === L ? 1 : 0;
    var r = op > 0 ? a / b + c / d : a / b - c / d, p = e ? a * (k / b) + op * c * (k / d) : 0;
    var head = fr(a, b) + sign + fr(c, d);
    if (e && p >= 0) {
      ui.work.textContent = head + ' = ' + fr(a * k / b, k) + sign + fr(c * k / d, k) + ' = ' + fr(p, k) + (simp(p, k) !== fr(p, k) ? ' = ' + simp(p, k) : '');
      ui.note.textContent = 'Every bar splits into ' + k + ' equal parts, so the parts can be counted' + (l ? ': ' + k + ' is the lowest common multiple of ' + b + ' and ' + d + '.' : '. The lowest common multiple of ' + b + ' and ' + d + ' is ' + L + '.');
    } else if (e) {
      ui.work.textContent = head + ' is less than zero.';
      ui.note.textContent = 'Take a smaller amount away, or see Calculating with negative fractions.';
    } else {
      ui.work.textContent = head + ' = ?';
      var bad = [b, d].filter(function (x, i, arr) { return k % x !== 0 && arr.indexOf(x) === i; });
      ui.note.textContent = 'Parts of different sizes cannot be counted together. ' + k + ' parts does not split ' + bad.map(function (x) { return x === b ? fr(a, b) : fr(c, d); }).join(' or ') + ' evenly: choose k so that ' + b + ' and ' + d + ' both divide it.';
    }
    B.say(ui.work.textContent + ' ' + ui.note.textContent);
    B.save({ vars: vars, op: op });
    B.post({ scope: { vars: { a: a, b: b, c: c, d: d, k: k, e: e, l: l, o: op, p: p, r: Math.round(r * 1e6) / 1e6 }, points: {} } }, ui.work.textContent + ' ' + ui.note.textContent);
  }

  B.widget('fracadd', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Two fraction bars and their sum or difference, cut into equal parts'; },
    parse: parse,
    resize: function () { if (spec) build(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {}; NAMES.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      op = spec.op === 0 ? (sv && sv.op ? sv.op : 1) : spec.op;
      paintPanel(); build(); report();
    },
  });
})(WPB);
