// Square: a square of side s drawn on a grid of unit squares, its area s × s counted, and (optionally) a target area to
// match, for perfect squares, square roots and estimating a square root between two whole numbers.
//   widget: square
//   slider s: 1, 12, 3        the side (min, max, start, step; a step of 0.1 for estimating roots); or fixed "s: 7"
//   target: 43                an area to match: its square is drawn dashed, and the readout compares
//   units: cm                 for lengths (areas get ²)
// state: { scope: { vars: { s (side), a (area, s²), t (target, or 0), d (a − t) } } }
// Checks: "s = 7", "a = 49", "s = 6.6" with target 43, "a > t and s < 7".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var show = function (v) { return B.fmt(r2(v)); };

  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.sl = null;
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 's') throw new Error('Line ' + it.line + ': the square board has one slider, s (the side).');
      var v = nums(it.value, 'slider s');
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] < 0) throw new Error('slider s: needs min, max, start (from 0 up, start between them), and an optional step.');
      s.sl = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    if (!s.sl && s.s === undefined) throw new Error('s: give the side a slider ("slider s: 1, 12, 3") or a value ("s: 7").');
    s.fixedS = s.s !== undefined ? nums(s.s, 's')[0] : null;
    s.t = s.target !== undefined ? nums(s.target, 'target')[0] : 0;
    if (s.t < 0) throw new Error('target: an area from 0 up.');
    s.u = s.units ? ' ' + String(s.units).trim() : '';
    s.maxSide = Math.max(s.sl ? s.sl.max : s.fixedS, Math.sqrt(s.t || 0));
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', line = B.css('--line') || '#e4e1da', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var M = Math.ceil(spec.maxSide) + 1;
    var board = B.jsx({ boundingbox: [-1.4, M + 0.6, M + 0.6, -1.2], keepAspectRatio: true });
    for (var x = 0; x <= M; x++) board.create('segment', [[x, 0], [x, M]], { strokeColor: line, strokeWidth: 1, fixed: true, highlight: false });
    for (var y = 0; y <= M; y++) board.create('segment', [[0, y], [M, y]], { strokeColor: line, strokeWidth: 1, fixed: true, highlight: false });
    var s = vars.s;
    board.create('polygon', [[0, 0], [s, 0], [s, s], [0, s]], { fillColor: blue, fillOpacity: 0.28, borders: { strokeColor: blue, strokeWidth: 3, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    if (spec.t) {
      var r = Math.sqrt(spec.t);
      board.create('polygon', [[0, 0], [r, 0], [r, r], [0, r]], { fillOpacity: 0, borders: { strokeColor: orange, strokeWidth: 2.5, dash: 2, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
      board.create('text', [r + 0.15, r + 0.25, 'area ' + show(spec.t) + (spec.u ? spec.u + '²' : '')], { anchorX: 'left', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: orange, fixed: true, highlight: false });
    }
    board.create('text', [s / 2, -0.55, show(s) + spec.u], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: ink, fixed: true, highlight: false });
    board.create('text', [-0.7, s / 2, show(s) + spec.u], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: ink, fixed: true, highlight: false });
    void muted;
    board.update();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl) {
      var sl = spec.sl, row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = 's'; lab.htmlFor = 'sl-s';
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make s smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-s'; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars.s;
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make s bigger');
      ui.out = document.createElement('output'); ui.out.htmlFor = r.id;
      var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, r2(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars.s = v; r.value = v; B.moved = true; build(); report(); };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars.s - sl.step); });
      plus.addEventListener('click', function () { set(vars.s + sl.step); });
      row.append(lab, minus, r, plus, ui.out); panel.appendChild(row);
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var s = vars.s, a = r2(s * s), t = spec.t, unit2 = spec.u ? spec.u + '²' : '';
    if (ui.out) ui.out.textContent = 's = ' + show(s);
    ui.work.textContent = show(s) + ' × ' + show(s) + ' = ' + show(a) + unit2 + (s === Math.round(s) ? ' (' + show(s) + '² = ' + show(a) + ', so √' + show(a) + ' = ' + show(s) + ')' : '');
    if (t) {
      var lo = Math.floor(Math.sqrt(t)), hi = lo + 1, exact = lo * lo === t;
      ui.note.textContent = (Math.abs(a - t) < 1e-9 ? 'Exactly the target area: s = √' + show(t) + '.' : a < t ? 'Less than the target area (' + show(t) + ') by ' + show(r2(t - a)) + '.' : 'More than the target area (' + show(t) + ') by ' + show(r2(a - t)) + '.') +
        (exact ? '' : ' ' + lo + '² = ' + lo * lo + ' and ' + hi + '² = ' + hi * hi + ', so √' + show(t) + ' is between ' + lo + ' and ' + hi + '.');
    } else ui.note.textContent = s === Math.round(s) ? show(a) + ' is a perfect square: ' + show(s) + ' rows of ' + show(s) + '.' : '';
    B.say(ui.work.textContent + ' ' + ui.note.textContent);
    B.save({ s: s });
    B.post({ scope: { vars: { s: s, a: a, t: t, d: r2(a - t) }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('square', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A square on a grid of unit squares'; },
    parse: parse,
    resize: function () { if (spec) build(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = { s: spec.sl ? (sv && sv.s !== undefined ? sv.s : spec.sl.start) : spec.fixedS };
      paintPanel(); build(); report();
    },
  });
})(WPB);
