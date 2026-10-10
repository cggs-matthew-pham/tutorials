// Balance scale: an equation as a balance, in two modes.
//   widget: balance
//   left: 2x + 3, right: 11   each side an expression in one variable
//   mode: try               (default) change x with a slider and watch the scale
//   mode: solve             do the same to both sides until x is alone; the scale stays level throughout
//   min, max, start, step   the slider's whole-number range (try mode)
//   var: x                  (default x)
// state (try):   { x, left, right, balanced, scope }      state (solve): { solved, steps, x, scope }
(function (B) {
  'use strict';
  var spec = null, x = 0, theta = 0, target = 0, raf = 0;
  var eq = null, hist = [];          // solve mode: current equation as bags and blocks, and the steps so far
  var fmt = B.fmt;
  var scope = function (v) { var o = { vars: {} }; if (v !== null && v !== undefined) o.vars[spec.var] = v; return o; };

  function value(expr, at) { var v = {}; v[spec.var] = at === undefined ? x : at; return WPM.evaluate(expr, v); }
  // 2x + 3 with x = 4  ->  2(4) + 3
  function substituted(expr, at) {
    var v = spec.var, re1 = new RegExp('(\\d|\\))\\s*' + v, 'g'), re2 = new RegExp(v, 'g');
    return expr.replace(re1, '$1(' + at + ')').replace(re2, String(at));
  }
  // ax + b with whole-number a and b (so it can be drawn as bags and blocks), else null
  function linear(expr) {
    try {
      var f = function (t) { return value(expr, t); };
      var b = f(0), a = f(1) - b;
      if (Math.abs(f(2) - (2 * a + b)) > 1e-9) return null;
      if (a < 0 || b < 0 || a % 1 || b % 1 || a > 8 || b > 40) return null;
      return { a: a, b: b };
    } catch (e) { return null; }
  }
  // bags and blocks -> "2x + 3", "x", "11", "0"
  function side(a, b) {
    var v = spec.var, t = a ? (a === 1 ? v : a + v) : '';
    return t && b ? t + ' + ' + b : t || String(b);
  }
  function eqText() { return side(eq.a1, eq.b1) + ' = ' + side(eq.a2, eq.b2); }
  function exprs() { return eq ? [side(eq.a1, eq.b1), side(eq.a2, eq.b2)] : [spec.left, spec.right]; }

  // The scale needs a 24 x 16 unit area (centred on y = 2.5). Units are square, so a narrow or short board gets
  // extra room in the other direction instead of cutting the pans off.
  function fitBox() {
    var w = B.el('board').clientWidth || 600, h = B.el('board').clientHeight || 400;
    var unit = Math.min(w / 24, h / 16), xr = w / unit, yr = h / unit;
    return [-xr / 2, 2.5 + yr / 2, xr / 2, 2.5 - yr / 2];
  }
  function build() {
    var board = B.jsx({ boundingbox: fitBox() });
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675';
    var fixed = { fixed: true, highlight: false };
    var P = [0, 6], HALF = 8, DROP = 3, sides = exprs();
    var end = function (s) { return [P[0] + s * HALF * Math.cos(theta), P[1] + s * HALF * Math.sin(theta)]; };
    var pan = function (s) { var e = end(s); return [e[0], e[1] - DROP]; };
    board.create('polygon', [[-3, -3.6], [3, -3.6], [0.6, -2.9], [-0.6, -2.9]], Object.assign({ fillColor: muted, fillOpacity: 0.35, borders: { strokeColor: muted }, vertices: { visible: false } }, fixed));
    board.create('segment', [[0, -2.9], P], Object.assign({ strokeColor: muted, strokeWidth: 6 }, fixed));
    // Beam: green when balanced (always, in solve mode: doing the same to both sides keeps it level)
    var beamColour = function () { return balanced() ? (B.css('--ok') || '#1a7f37') : ink; };
    var pt = function (f) { return board.create('point', [function () { return f()[0]; }, function () { return f()[1]; }], { visible: false, withLabel: false, fixed: true }); };
    var Lend = pt(function () { return end(-1); }), Rend = pt(function () { return end(1); });
    board.create('segment', [Lend, Rend], Object.assign({ strokeColor: beamColour, strokeWidth: 7 }, fixed));
    board.create('point', P, { name: '', size: 5, fillColor: ink, strokeColor: ink, fixed: true, highlight: false });
    [-1, 1].forEach(function (s) {
      var colour = s < 0 ? (B.css('--left') || '#2f6fb3') : (B.css('--right') || '#8a4fb8');
      var expr = s < 0 ? sides[0] : sides[1];
      var c = function () { return pan(s); };
      var a = pt(function () { return [c()[0] - 2.8, c()[1]]; }), b = pt(function () { return [c()[0] + 2.8, c()[1]]; });
      var top = s < 0 ? Lend : Rend;
      board.create('segment', [top, a], Object.assign({ strokeColor: muted, strokeWidth: 1.5 }, fixed));
      board.create('segment', [top, b], Object.assign({ strokeColor: muted, strokeWidth: 1.5 }, fixed));
      board.create('segment', [a, b], Object.assign({ strokeColor: ink, strokeWidth: 5 }, fixed));
      // What is on the pan: bags of x, then single blocks, stacked from the pan up
      var lin = linear(expr), items = [], y = 0.1;
      if (lin) {
        for (var i = 0; i < lin.a; i++) items.push({ w: 1.1, h: 1.4, dx: -2.5 + (i % 4) * 1.3 + 0.55, row: Math.floor(i / 4), bag: true });
        var bagH = Math.ceil(lin.a / 4) * 1.55;
        for (var j = 0; j < lin.b; j++) items.push({ w: 0.5, h: 0.5, dx: -2.5 + (j % 9) * 0.6 + 0.25, row: Math.floor(j / 9), bag: false, base: bagH });
      }
      items.forEach(function (it) {
        var oy = it.bag ? it.row * 1.55 : (it.base || 0) + it.row * 0.6;
        var corner = function (ox, oy2) { return pt(function () { var p = c(); return [p[0] + it.dx + ox, p[1] + y + oy + oy2]; }); };
        var hw = it.w / 2;
        board.create('polygon', [corner(-hw, 0), corner(hw, 0), corner(hw, it.h), corner(-hw, it.h)], Object.assign({
          fillColor: colour, fillOpacity: it.bag ? 0.9 : 0.75, borders: { strokeColor: colour, strokeWidth: 1 }, vertices: { visible: false },
        }, fixed));
        if (it.bag) board.create('text', [function () { return c()[0] + it.dx; }, function () { return c()[1] + y + oy + it.h / 2; }, spec.var], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tile', highlightCssClass: 'tile', strokeColor: '#fff', highlightStrokeColor: '#fff', fixed: true });
      });
      // Under the pan: the expression, and (try mode only: in solve mode it would give the answer away) its value
      board.create('text', [function () { return c()[0]; }, function () { return c()[1] - 0.9; }, expr], { anchorX: 'middle', cssClass: 'eqlabel', highlightCssClass: 'eqlabel', strokeColor: ink, highlightStrokeColor: ink, fixed: true });
      if (spec.mode !== 'solve') board.create('text', [function () { return c()[0]; }, function () { return c()[1] - 2.1; }, function () {
        var v = value(expr), sub = substituted(expr, x);
        return sub.replace(/\s/g, '') === fmt(v) ? '= ' + fmt(v) : '= ' + sub + ' = ' + fmt(v);
      }], { anchorX: 'middle', cssClass: 'eqvalue', highlightCssClass: 'eqvalue', strokeColor: muted, highlightStrokeColor: muted, fixed: true });
    });
  }
  function balanced() { return spec.mode === 'solve' || Math.abs(value(spec.left) - value(spec.right)) < 1e-9; }
  function tiltFor() { if (spec.mode === 'solve') return 0; var d = value(spec.left) - value(spec.right); return -Math.max(-0.3, Math.min(0.3, d * 0.03)); }
  function animate() {
    cancelAnimationFrame(raf);
    (function step() {
      theta += (target - theta) * 0.18;
      if (Math.abs(target - theta) < 0.002) theta = target;
      B.jsxBoard.update();
      if (theta !== target) raf = requestAnimationFrame(step);
    })();
  }

  // Try mode
  function reportTry() {
    var L = value(spec.left), R = value(spec.right), ok = balanced();
    B.say(ok ? 'Balanced: when ' + spec.var + ' = ' + fmt(x) + ', both sides are ' + fmt(L) + '.'
      : (L > R ? 'The left side is heavier: ' + fmt(L) + ' is more than ' + fmt(R) + '.' : 'The right side is heavier: ' + fmt(R) + ' is more than ' + fmt(L) + '.'), ok);
    B.el('xshow').textContent = spec.var + ' = ' + fmt(x);
    B.save({ x: x });
    B.post({ x: x, left: L, right: R, balanced: ok, scope: scope(x) }, spec.var + ' = ' + fmt(x) + ': left ' + fmt(L) + ', right ' + fmt(R) + (ok ? ', balanced' : ''));
  }
  function setX(v, byStudent) {
    x = Math.max(spec.min, Math.min(spec.max, v));
    B.el('xval').value = x;
    if (byStudent) B.moved = true;
    target = tiltFor();
    animate();
    reportTry();
  }

  // Solve mode: the same action on both sides, recorded as algebra
  function solvedX() {
    if (eq.a1 === 1 && eq.b1 === 0 && eq.a2 === 0) return eq.b2;
    if (eq.a2 === 1 && eq.b2 === 0 && eq.a1 === 0) return eq.b1;
    return null;
  }
  function paintSolve() {
    var ol = B.el('history'); ol.replaceChildren();
    hist.forEach(function (h) {
      var li = document.createElement('li'); li.appendChild(document.createTextNode(h.eq));
      if (h.why) { var s = document.createElement('span'); s.textContent = h.why; li.appendChild(s); }
      ol.appendChild(li);
    });
    ol.scrollTop = ol.scrollHeight;
    var v = solvedX(), ok = v !== null;
    if (ok) {
      var chk = function (expr) { var sub = substituted(expr, v), val = fmt(value(expr, v)); return sub.replace(/\s/g, '') === val ? val : sub + ' = ' + val; };
      B.say(spec.var + ' = ' + fmt(v) + '. Check it in the first equation: left side ' + chk(spec.left) + ', right side ' + chk(spec.right) + '. They match ✓', true);
    } else B.say(hist.length > 1 ? 'Still balanced. What can you take away, or share, next?' : 'Do the same to both sides until ' + spec.var + ' is on its own.');
    B.save({ eq: eq, hist: hist });
    B.post({ solved: ok, steps: hist.length - 1, x: ok ? v : null, scope: scope(ok ? v : null) }, ok ? spec.var + ' = ' + fmt(v) + ' in ' + (hist.length - 1) + ' steps' : eqText());
  }
  function act(kind, n) {
    if (!(n >= 1) || n % 1) return B.say('Choose a whole number of 1 or more.');
    if (solvedX() !== null) return B.say(spec.var + ' is already on its own. Press Start again to try another way.');
    var e = Object.assign({}, eq), why;
    if (kind === 'b' || kind === 'a') {
      var k = kind === 'b' ? 'b' : 'a';
      if (e[k + '1'] < n) return B.say('The left side only has ' + e[k + '1'] + ' ' + (kind === 'b' ? 'blocks' : 'bags') + '. Take away the same amount from both sides.');
      if (e[k + '2'] < n) return B.say('The right side only has ' + e[k + '2'] + ' ' + (kind === 'b' ? 'blocks' : 'bags') + '. Take away the same amount from both sides.');
      e[k + '1'] -= n; e[k + '2'] -= n;
      why = 'took ' + (kind === 'b' ? n : (n === 1 ? spec.var : n + spec.var)) + ' from both sides';
    } else {
      if (n < 2) return B.say('Share into 2 or more groups.');
      var bad = ['a1', 'b1', 'a2', 'b2'].filter(function (k2) { return e[k2] % n; });
      if (bad.length) return B.say('Not everything shares equally into ' + n + ' groups: ' + side(e.a1, e.b1) + ' and ' + side(e.a2, e.b2) + ' must both split evenly.');
      ['a1', 'b1', 'a2', 'b2'].forEach(function (k2) { e[k2] /= n; });
      why = 'shared both sides into ' + n + ' groups (÷ ' + n + ')';
    }
    if (e.a1 + e.b1 === 0 || e.a2 + e.b2 === 0) return B.say('That would leave one side empty. Try a different step.');
    eq = e; B.moved = true;
    hist.push({ eq: eqText(), why: why });
    build(); B.jsxBoard.update();
    paintSolve();
  }
  function startSolve(fresh) {
    var L = linear(spec.left), R = linear(spec.right);
    if (!L || !R) throw new Error('solve mode needs whole-number bags and blocks on both sides (such as 2x + 3).');
    var s = fresh ? null : B.saved();
    eq = s && s.eq ? s.eq : { a1: L.a, b1: L.b, a2: R.a, b2: R.b };
    hist = s && s.hist ? s.hist : [{ eq: side(L.a, L.b) + ' = ' + side(R.a, R.b), why: 'start' }];
    var v = (function () { for (var t = -100; t <= 1000; t++) if (Math.abs(value(spec.left, t) - value(spec.right, t)) < 1e-9) return t; return 0; })();
    x = v; theta = target = 0;
    build(); B.jsxBoard.update();
    paintSolve();
  }


  B.widget('balance', {
    sections: function (s) { return s.mode === 'solve' ? ['board', 'ops'] : ['board', 'controls']; },
    label: function () { return 'A balance scale'; },
    parse: function (s) {
      s.mode = s.mode || 'try';
      ['min', 'max', 'start', 'step'].forEach(function (k, i) { s[k] = s[k] === undefined ? [0, 10, 0, 1][i] : Number(s[k]); });
      if (!s.left || !s.right) throw new Error('The board needs left: and right: expressions.');
      WPM.parse(s.left); WPM.parse(s.right);
    },
    start: function (fresh) {
      spec = B.spec; eq = null;
      if (spec.mode === 'solve') return startSolve(fresh);
      var r = B.el('xval');
      r.min = spec.min; r.max = spec.max; r.step = spec.step;
      B.el('xlabel').textContent = spec.var;
      B.el('minus').setAttribute('aria-label', 'Make ' + spec.var + ' one less');
      B.el('plus').setAttribute('aria-label', 'Make ' + spec.var + ' one more');
      var s = fresh ? null : B.saved();
      x = s && s.x !== undefined ? s.x : spec.start;
      theta = target = tiltFor();
      build();
      setX(x, false);
    },
    redraw: function () { build(); B.jsxBoard.update(); },
    resize: function () { var b = B.jsxBoard; b.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); b.setBoundingBox(fitBox(), false); },
  });

  B.el('xval').addEventListener('input', function (e) { setX(Number(e.target.value), true); });
  B.el('minus').addEventListener('click', function () { setX(x - spec.step, true); });
  B.el('plus').addEventListener('click', function () { setX(x + spec.step, true); });
  B.el('take').addEventListener('click', function () { act(B.el('takeWhat').value, Number(B.el('takeN').value)); });
  B.el('split').addEventListener('click', function () { act('split', Number(B.el('splitN').value)); });
  B.el('restart').addEventListener('click', B.restart);
})(WPB);
