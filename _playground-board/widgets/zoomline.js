// Zooming number line: find a number one decimal place at a time by choosing which tenth of the line it is in, then
// zooming in. Square roots never stop (they are irrational); a fraction's digits stop or repeat.
//   widget: zoomline
//   number: sqrt2            sqrt2 | sqrt3 | sqrt5 | sqrt6 | sqrt7 | sqrt8 | sqrt10 | pi | phi (the golden ratio) | a fraction like 1/7 or 3/8
//   from: 0                  the whole numbers shown at the start (from, from + 10); default 0
//   places: 4                how many decimal places to find (1 to 6)
//   found: 2                 start with this many right choices already made (for pictures; places + 1 shows all)
// Students press the piece of the line the number is in; a wrong piece gets a hint (for a square root, the square of
// the piece's ends). Each right choice zooms in ten times.
// state: { scope: { vars: { k (how many right choices: 1 for the whole number, then one per decimal place), w (wrong
//   choices), d (1 once all the places are found) } } }
// Checks: "k >= 3", "d = 1 and w = 0".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {};
  var NUM = {
    sqrt2: [Math.SQRT2, '√2', 2], sqrt3: [Math.sqrt(3), '√3', 3], sqrt5: [Math.sqrt(5), '√5', 5], sqrt6: [Math.sqrt(6), '√6', 6], sqrt8: [Math.sqrt(8), '√8', 8], sqrt7: [Math.sqrt(7), '√7', 7],
    sqrt10: [Math.sqrt(10), '√10', 10], pi: [Math.PI, 'π', 0], phi: [(1 + Math.sqrt(5)) / 2, 'φ', 0],
  };
  function parse(s) {
    var n = String(s.number || 'sqrt2').trim().toLowerCase().replace('√', 'sqrt');
    if (NUM[n]) { s.val = NUM[n][0]; s.name = NUM[n][1]; s.sq = NUM[n][2]; }
    else {
      var m = /^(\d+)\s*\/\s*(\d+)$/.exec(n);
      if (!m || +m[2] === 0) throw new Error('number: sqrt2, sqrt3, sqrt5, sqrt6, sqrt7, sqrt8, sqrt10, pi, phi or a fraction like 1/7.');
      s.val = +m[1] / +m[2]; s.name = m[1] + '/' + m[2]; s.sq = 0; s.frac = [+m[1], +m[2]];
    }
    s.from = s.from !== undefined ? Math.floor(Number(s.from)) : 0;
    s.places = s.places !== undefined ? Math.round(Number(s.places)) : 4;
    if (!(s.places >= 1 && s.places <= 6)) throw new Error('places: 1 to 6.');
    s.found = s.found !== undefined ? Math.max(0, Math.min(s.places + 1, Math.round(Number(s.found)))) : 0;
    if (!(s.val >= s.from && s.val < s.from + 10)) throw new Error('from: the number must be between from and from + 10.');
  }
  var fix = function (v, k) { return Number(v.toFixed(Math.max(0, k))); };
  var show = function (v, k) { return v.toFixed(Math.max(0, k)); };
  // the start of the interval and its step at the current level: level 0 is whole numbers, level j is j decimal places
  function truncTo(v, places) { var f = Math.pow(10, places); return Math.floor(v * f + 1e-9) / f; }

  function draw() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'group'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', card = B.css('--card') || '#fff', bad = B.css('--bad') || '#b3261e';
    var W = 900, H = 260, L = 60, R = 840, y = 140;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var font = 'system-ui, sans-serif';
    var done = st.k > spec.places;
    var dp = st.k;                                // decimal places shown on the tick labels
    var step = st.k === 0 ? 1 : Math.pow(10, -(st.k));
    var lo = st.k === 0 ? spec.from : truncTo(spec.val, st.k - 1);
    if (done) { step = Math.pow(10, -spec.places); lo = truncTo(spec.val, spec.places) - 5 * step; dp = spec.places + 1; }
    var span = step * 10, X = function (v) { return L + (R - L) * (v - lo) / span; };
    add('line', { x1: L - 20, y1: y, x2: R + 20, y2: y, stroke: ink, 'stroke-width': 2.5 });
    for (var i = 0; i < 10; i++) {
      var a = fix(lo + i * step, dp + 1), b = fix(lo + (i + 1) * step, dp + 1);
      var labA = st.k === 0 ? String(a) : show(a, st.k), labB = st.k === 0 ? String(b) : show(b, st.k);
      if (!done) {
        var wrong = st.bad.indexOf(i) >= 0;
        var g = add('rect', { x: X(a) + 2, y: y - 34, width: X(b) - X(a) - 4, height: 30, rx: 5, fill: wrong ? bad : blue, 'fill-opacity': wrong ? 0.12 : 0.1, stroke: wrong ? bad : blue, 'stroke-width': 1.5, role: 'button', tabindex: 0, 'aria-label': 'Between ' + labA + ' and ' + labB, cursor: 'pointer' });
        (function (i) { var go = function () { choose(i); }; g.addEventListener('click', go); g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); })(i);
      }
      add('line', { x1: X(a), y1: y - 8, x2: X(a), y2: y + 8, stroke: ink, 'stroke-width': 1.5 });
      if (st.k <= 1 || i % 2 === 0 || done) add('text', { x: X(a), y: y + 30, 'text-anchor': 'middle', 'font-size': st.k >= 3 ? 13 : 15, 'font-family': font, fill: muted }, done ? show(a, spec.places + 1) : labA);
    }
    add('line', { x1: X(lo + span), y1: y - 8, x2: X(lo + span), y2: y + 8, stroke: ink, 'stroke-width': 1.5 });
    if (!done) add('text', { x: X(lo + span), y: y + 30, 'text-anchor': 'middle', 'font-size': st.k >= 3 ? 13 : 15, 'font-family': font, fill: muted }, st.k === 0 ? String(fix(lo + span, 0)) : show(lo + span, st.k));
    if (done) {
      var xv = X(spec.val);
      add('circle', { cx: xv, cy: y, r: 7, fill: orange, stroke: card, 'stroke-width': 2 });
      add('text', { x: xv, y: y + 60, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, 'font-family': font, fill: orange }, spec.name);
    }
    add('text', { x: L, y: 40, 'font-size': 24, 'font-weight': 700, 'font-family': font, fill: ink }, spec.name + ' = ' + sofar() + (done ? (spec.frac && exactEnds() ? '' : '…') : '?'));
    if (!done) add('text', { x: L, y: 72, 'font-size': 15, 'font-family': font, fill: muted }, st.k === 0 ? 'Press the piece of the line ' + spec.name + ' is in.' : 'Zoomed in ' + Math.pow(10, st.k) + ' times: press the tenth it is in.');
    svg.setAttribute('aria-label', 'A number line from ' + show(lo, dp) + ' to ' + show(lo + span, dp) + '. ' + spec.name + ' is ' + sofar() + '.');
    el.appendChild(svg);
  }
  function exactEnds() { var v = spec.val * Math.pow(10, spec.places); return Math.abs(v - Math.round(v)) < 1e-9; }
  function sofar() {
    if (st.k === 0) return '';
    var places = Math.min(st.k - 1, spec.places);
    var t = truncTo(spec.val, places);
    return places === 0 ? String(t) + '.' : show(t, places);
  }
  function choose(i) {
    var step = st.k === 0 ? 1 : Math.pow(10, -st.k), lo = st.k === 0 ? spec.from : truncTo(spec.val, st.k - 1);
    var a = lo + i * step, b = a + step;
    B.moved = true;
    if (spec.val >= a - 1e-12 && spec.val < b - 1e-12) { st.k++; st.bad = []; ui.hint = ''; }
    else {
      st.w++; if (st.bad.indexOf(i) < 0) st.bad.push(i);
      var dp = st.k;
      var sa = st.k === 0 ? String(a) : a.toFixed(dp), sb = st.k === 0 ? String(fix(b, 0)) : b.toFixed(dp);
      if (spec.sq) ui.hint = sa + '² = ' + fix(a * a, 2 * dp) + ' and ' + sb + '² = ' + fix(b * b, 2 * dp) + ': ' + spec.sq + (spec.val < a ? ' is smaller than both, so ' + spec.name + ' is to the left.' : ' is bigger than both, so ' + spec.name + ' is to the right.');
      else ui.hint = spec.name + ' is ' + (spec.val < a ? 'less than ' + sa : 'more than ' + sb) + ': try a piece further ' + (spec.val < a ? 'left.' : 'right.');
    }
    draw(); report();
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { hint: '' };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var bar = document.createElement('div'); bar.className = 'gbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    var done = st.k > spec.places;
    ui.work.textContent = spec.name + ' = ' + sofar() + (done ? (spec.frac && exactEnds() ? '' : '…') : '?');
    var note;
    if (st.k === 0) note = 'Which two whole numbers is ' + spec.name + ' between?';
    else if (done) {
      if (spec.frac) note = exactEnds() ? spec.name + ' stops: it is a terminating decimal, a rational number.' : spec.name + ' = ' + truncTo(spec.val, spec.places + 6).toFixed(spec.places + 6) + '…: its digits repeat, so it is rational (a fraction).';
      else note = spec.name + ' = ' + truncTo(spec.val, spec.places + 6).toFixed(spec.places + 6) + '…: the digits never stop and never repeat. It is irrational: no fraction equals it.';
    } else note = spec.name + ' is between ' + truncTo(spec.val, st.k - 1).toFixed(st.k - 1) + ' and ' + (truncTo(spec.val, st.k - 1) + Math.pow(10, -(st.k - 1))).toFixed(st.k - 1) + '. Find the next digit.';
    ui.note.textContent = (ui.hint ? ui.hint + ' ' : '') + note;
    B.say(ui.work.textContent + ' ' + ui.note.textContent);
    B.save({ k: st.k, w: st.w });
    B.post({ scope: { vars: { k: st.k, w: st.w, d: done ? 1 : 0 }, points: {} } }, ui.work.textContent + ' ' + ui.note.textContent);
  }
  B.widget('zoomline', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A number line to zoom into, to find a number one decimal place at a time'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    resize: function () { if (spec) draw(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      st = { k: sv && sv.k ? Math.min(sv.k, spec.places + 1) : spec.found, w: sv && sv.w ? sv.w : 0, bad: [] };
      paintPanel(); draw(); report();
    },
  });
})(WPB);
