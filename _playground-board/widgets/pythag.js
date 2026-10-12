// Pythagoras: a triangle with sides a and b meeting at an angle (90° unless an angle slider opens or closes it), with
// a square drawn on each side, divided into unit squares, and their areas. At a right angle the two smaller squares
// exactly make the biggest: a² + b² = c². Open the angle and c² grows past a² + b²; close it and c² shrinks.
//   widget: pythag
//   slider a: 1, 8, 3        one short side (or fixed "a: 3")
//   slider b: 1, 8, 4        the other short side (or fixed)
//   slider t: 60, 120, 90, 5 the angle between a and b, in degrees (default fixed at 90)
//   units: cm
//   hide: c                  hide c (its length and its square's area), for "find the hypotenuse" tasks
// state: { scope: { vars: { a, b, c (2 dp), C (c², 2 dp), s (a² + b²), t (the angle), r (1 acute, 2 right, 3 obtuse
//   at that angle) } } }
// Checks: "a = 6 and b = 8" (c = 10), "C = 25", "r = 3", "c = 13".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NAMES = ['a', 'b', 't'];
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.sl = {}; s.fixed = { t: 90 };
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the Pythagoras board has sliders a, b and t (the angle) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || (it.name === 't' ? 5 : 1) };
    });
    NAMES.forEach(function (n) { if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fixed[n] = nums(s[n], n)[0]; } });
    ['a', 'b'].forEach(function (n) { if (!s.sl[n] && s.fixed[n] === undefined) throw new Error(n + ': needs a slider or a value.'); });
    var hi = function (n) { return s.sl[n] ? s.sl[n].max : s.fixed[n]; }, lo = function (n) { return s.sl[n] ? s.sl[n].min : s.fixed[n]; };
    if (lo('a') <= 0 || lo('b') <= 0 || hi('a') > 20 || hi('b') > 20) throw new Error('a and b: more than 0, up to 20.');
    if (lo('t') < 30 || hi('t') > 150) throw new Error('t: an angle from 30 to 150 degrees.');
    s.u = s.units ? String(s.units).trim() : '';
    s.hideC = /^c$/i.test(String(s.hide || '').trim());
  }
  // corners: O (the angle), A along a, Bp along b at angle t; squares outward on each side
  function geo(a, b, t) {
    var th = t * Math.PI / 180, O = [0, 0], A = [a, 0], Bp = [b * Math.cos(th), b * Math.sin(th)];
    var sq = function (P, Q, R) {   // square on PQ, away from R
      var dx = Q[0] - P[0], dy = Q[1] - P[1], nx = -dy, ny = dx;
      if ((R[0] - P[0]) * nx + (R[1] - P[1]) * ny > 0) { nx = -nx; ny = -ny; }
      return [P, Q, [Q[0] + nx, Q[1] + ny], [P[0] + nx, P[1] + ny]];
    };
    var sa = sq(O, A, Bp), sb = sq(O, Bp, A), sc = sq(A, Bp, O);
    return { O: O, A: A, B: Bp, sa: sa, sb: sb, sc: sc, all: [O, A, Bp].concat(sa, sb, sc) };
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', purple = B.css('--right') || '#8a4fb8', muted = B.css('--muted') || '#5d6675';
    var a = vars.a, b = vars.b, t = vars.t, G = geo(a, b, t), c = Math.hypot(G.A[0] - G.B[0], G.A[1] - G.B[1]);
    // frame the current picture (it rescales as the sides change, so small triangles stay readable)
    var bx = [Infinity, Infinity, -Infinity, -Infinity];
    G.all.forEach(function (p) { bx[0] = Math.min(bx[0], p[0]); bx[1] = Math.min(bx[1], p[1]); bx[2] = Math.max(bx[2], p[0]); bx[3] = Math.max(bx[3], p[1]); });
    var pad = 0.08 * Math.max(bx[2] - bx[0], bx[3] - bx[1]) + 0.3;
    var board = B.jsx({ boundingbox: [bx[0] - pad, bx[3] + pad, bx[2] + pad, bx[1] - pad], keepAspectRatio: true });
    var fx = { fixed: true, highlight: false };
    var square = function (S, col, len, label) {
      board.create('polygon', S, Object.assign({ fillColor: col, fillOpacity: 0.18, borders: { strokeColor: col, strokeWidth: 2, highlight: false }, vertices: { visible: false } }, fx));
      // unit grid lines inside the square, parallel to its sides
      var P = S[0], Q = S[1], D = S[3], ux = (Q[0] - P[0]) / len, uy = (Q[1] - P[1]) / len, vx = (D[0] - P[0]) / len, vy = (D[1] - P[1]) / len;
      for (var k = 1; k < len - 1e-9; k++) {
        board.create('segment', [[P[0] + ux * k, P[1] + uy * k], [D[0] + ux * k, D[1] + uy * k]], Object.assign({ strokeColor: col, strokeWidth: 0.8, strokeOpacity: 0.6 }, fx));
        board.create('segment', [[P[0] + vx * k, P[1] + vy * k], [Q[0] + vx * k, Q[1] + vy * k]], Object.assign({ strokeColor: col, strokeWidth: 0.8, strokeOpacity: 0.6 }, fx));
      }
      var cx = (S[0][0] + S[2][0]) / 2, cy = (S[0][1] + S[2][1]) / 2;
      board.create('text', [cx, cy, label], Object.assign({ anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: 17 }, fx));
    };
    square(G.sa, blue, a, B.fmt(r2(a * a)));
    square(G.sb, purple, b, B.fmt(r2(b * b)));
    square(G.sc, orange, c, spec.hideC ? '?' : B.fmt(r2(c * c)));
    board.create('polygon', [G.O, G.A, G.B], Object.assign({ fillColor: ink, fillOpacity: 0.06, borders: { strokeColor: ink, strokeWidth: 3, highlight: false }, vertices: { visible: false } }, fx));
    // the angle at O: a right-angle box at 90°, else an arc with its size
    if (Math.abs(t - 90) < 1e-9) {
      var z = 0.45, th = t * Math.PI / 180;
      board.create('polygon', [[0, 0], [z, 0], [z + z * Math.cos(th), z * Math.sin(th)], [z * Math.cos(th), z * Math.sin(th)]], Object.assign({ fillOpacity: 0, borders: { strokeColor: ink, strokeWidth: 1.5, highlight: false }, vertices: { visible: false } }, fx));
    } else {
      board.create('arc', [[0, 0], [0.7, 0], [0.7 * Math.cos(t * Math.PI / 180), 0.7 * Math.sin(t * Math.PI / 180)]], Object.assign({ strokeColor: ink, strokeWidth: 1.5 }, fx));
      board.create('text', [1.1 * Math.cos(t * Math.PI / 360), 1.1 * Math.sin(t * Math.PI / 360), t + '°'], Object.assign({ anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: ink, fontSize: 13 }, fx));
    }
    var u = spec.u ? ' ' + spec.u : '';
    var side = function (P, Q, R, s2, col) {   // a length label inside the side's square, just by the side
      var mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2, gx = (P[0] + Q[0] + R[0]) / 3, gy = (P[1] + Q[1] + R[1]) / 3, dx = mx - gx, dy = my - gy, l = Math.hypot(dx, dy) || 1, k = 0.25;
      var ux = dx / l, uy = dy / l;
      board.create('text', [mx + ux * k, my + uy * k, s2], Object.assign({ anchorX: ux < -0.5 ? 'right' : ux > 0.5 ? 'left' : 'middle', anchorY: uy < -0.5 ? 'top' : uy > 0.5 ? 'bottom' : 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: 14 }, fx));
    };
    side(G.O, G.A, G.B, 'a = ' + B.fmt(a) + u, blue);
    side(G.O, G.B, G.A, 'b = ' + B.fmt(b) + u, purple);
    side(G.A, G.B, G.O, spec.hideC ? 'c' : (Math.abs(c - Math.round(c)) < 1e-6 ? 'c = ' + B.fmt(c) : 'c ≈ ' + B.fmt(r2(c))) + u, orange);
    void muted;
    board.update();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [], ranges: {} };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var label = { a: 'side a', b: 'side b', t: 'the angle' };
    NAMES.forEach(function (n) {
      var sl = spec.sl[n]; if (!sl) return;
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', n === 't' ? 'Close the angle' : 'Make ' + label[n] + ' shorter');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', n === 't' ? 'Open the angle' : 'Make ' + label[n] + ' longer');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, r2(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars[n] = v; r.value = v; B.moved = true; build(); report(); };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars[n] - sl.step); });
      plus.addEventListener('click', function () { set(vars[n] + sl.step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row); ui.outs.push({ n: n, out: out });
    });
    if (Object.keys(spec.sl).length) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var a = vars.a, b = vars.b, t = vars.t, G = geo(a, b, t), c = Math.hypot(G.A[0] - G.B[0], G.A[1] - G.B[1]);
    var s = r2(a * a + b * b), C = r2(c * c), right = Math.abs(t - 90) < 1e-9, r = right ? 2 : t > 90 ? 3 : 1;
    ui.outs.forEach(function (x) { x.out.textContent = x.n + ' = ' + B.fmt(vars[x.n]) + (x.n === 't' ? '°' : ''); });
    var sq = function (v) { return B.fmt(v) + '²'; };
    if (right) {
      var whole = Math.abs(c - Math.round(c)) < 1e-6;
      ui.work.textContent = sq(a) + ' + ' + sq(b) + ' = ' + B.fmt(r2(a * a)) + ' + ' + B.fmt(r2(b * b)) + ' = ' + (spec.hideC ? '?' : B.fmt(s) + (whole ? ' = ' + sq(Math.round(c)) : ''));
      ui.note.textContent = spec.hideC ? 'The two smaller squares together make the biggest one. How big is it, and how long is c?' : 'The two smaller squares make the biggest one exactly: c² = ' + B.fmt(s) + ', so c = ' + (whole ? B.fmt(Math.round(c)) : '√' + B.fmt(s) + ' ≈ ' + B.fmt(r2(c))) + (spec.u ? ' ' + spec.u : '') + '.';
    } else {
      ui.work.textContent = 'a² + b² = ' + B.fmt(s) + ', but c² = ' + B.fmt(C);
      ui.note.textContent = t > 90 ? 'The angle is more than 90°: c² is bigger than a² + b² (obtuse).' : 'The angle is less than 90°: c² is smaller than a² + b² (acute).';
    }
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ vars: vars });
    B.post({ scope: { vars: { a: a, b: b, c: r2(c), C: C, s: s, t: t, r: r }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('pythag', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A triangle with a square drawn on each side'; },
    parse: parse,
    resize: function () { if (spec) build(); },
    redraw: function () { if (spec) build(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {}; NAMES.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      paintPanel(); build(); report();
    },
  });
})(WPB);
