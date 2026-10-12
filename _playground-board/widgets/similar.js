// Similar shapes: a shape and a copy scaled by k (every length × k, every angle the same), or two rectangles to compare.
//   widget: similar
//   shape: triangle | rectangle
// triangle: sides: 3, 4, 5            the original's sides (AB, BC, CA; a real triangle)
//           slider k: 0.5, 3, 2, 0.5  the scale factor (or fixed "k: 2")
//           hide: x                   write ? for the copy's side x, y or z (students find it)
//   state vars: k, a, b, c (the original's sides), x, y, z (the copy's sides, 2 dp)
// rectangle: first: 4, 2              the first rectangle (width, height)
//            slider w: 1, 10, 6       slider h: 1, 6, 3     the second rectangle (or fixed)
//   state vars: w, h, s (1 if similar), c (1 if congruent), k (the scale factor, second ÷ first, if similar; else 0)
// Checks: "k = 2", "s = 1 and c = 0", "x = 9".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.kind = /^rect/i.test(s.shape || '') ? 'rectangle' : 'triangle';
    var names = s.kind === 'triangle' ? ['k'] : ['w', 'h'];
    s.names = names; s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (names.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': this board has sliders ' + names.join(' and ') + '.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] <= 0) throw new Error('slider ' + it.name + ': min (more than 0), max, start, step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || (it.name === 'k' ? 0.5 : 1) };
    });
    names.forEach(function (n) { if (!s.sl[n]) s.fix[n] = s[n] !== undefined ? nums(s[n], n)[0] : (n === 'k' ? 2 : n === 'w' ? 6 : 3); });
    if (s.kind === 'triangle') {
      s.abc = s.sides ? nums(s.sides, 'sides') : [3, 4, 5];
      var a = s.abc[0], b = s.abc[1], c = s.abc[2];
      if (s.abc.length !== 3 || !(a + b > c && a + c > b && b + c > a)) throw new Error('sides: three sides that make a triangle, such as "3, 4, 5".');
      s.hide = s.hide ? String(s.hide).trim().toLowerCase() : '';
    } else {
      s.first = s.first ? nums(s.first, 'first') : [4, 2];
      if (s.first.length !== 2) throw new Error('first: width, height, such as "4, 2".');
    }
  }
  function corners(a, b, c) {   // AB = a along the base, BC = b, CA = c
    var x = (a * a + c * c - b * b) / (2 * a); return [[0, 0], [a, 0], [x, Math.sqrt(Math.max(0, c * c - x * x))]];
  }
  function draw() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', bad = B.css('--bad') || '#b3261e';
    var font = 'system-ui, sans-serif', W = 900, H = 420;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var txt = function (x, y, t, col, anc) { add('text', { x: x, y: y, 'text-anchor': anc || 'middle', 'dominant-baseline': 'middle', 'font-size': 16, 'font-weight': 700, 'font-family': font, fill: col }, t); };
    if (spec.kind === 'triangle') {
      var a = spec.abc[0], b = spec.abc[1], c = spec.abc[2], k = vars.k, kmax = spec.sl.k ? spec.sl.k.max : k;
      var maxSide = Math.max(a, b, c), u = Math.min(560 / (maxSide * (1 + kmax)), 300 / (maxSide * kmax));
      var T1 = corners(a, b, c), T2 = corners(a * k, b * k, c * k), x1 = 40, x2 = 40 + (a + 0.8) * u + 30, base = 360;
      var poly = function (T, ox, col) { add('polygon', { points: T.map(function (p) { return (ox + p[0] * u).toFixed(1) + ',' + (base - p[1] * u).toFixed(1); }).join(' '), fill: col, 'fill-opacity': 0.15, stroke: col, 'stroke-width': 3, 'stroke-linejoin': 'round' }); };
      var mid = function (T, i, j, ox, off) { var m = [(T[i][0] + T[j][0]) / 2, (T[i][1] + T[j][1]) / 2], cx = (T[0][0] + T[1][0] + T[2][0]) / 3, cy = (T[0][1] + T[1][1] + T[2][1]) / 3, dx = m[0] - cx, dy = m[1] - cy, d = Math.hypot(dx, dy) || 1; return [ox + (m[0] + dx / d * off) * u, base - (m[1] + dy / d * off) * u]; };
      poly(T1, x1, blue); poly(T2, x2, orange);
      var lab1 = [[0, 1, a], [1, 2, b], [2, 0, c]], names = ['x', 'y', 'z'];
      lab1.forEach(function (L, i) {
        var p = mid(T1, L[0], L[1], x1, 18 / u); txt(p[0], p[1], B.fmt(L[2]), blue);
        var q = mid(T2, L[0], L[1], x2, 18 / u); txt(q[0], q[1], spec.hide === names[i] ? '?' : B.fmt(r2(L[2] * k)), spec.hide === names[i] ? bad : orange);
      });
      txt(x1, 30, 'Original', blue, 'start'); txt(x2, 30, 'Copy, scale factor ' + B.fmt(k), orange, 'start');
      svg.setAttribute('aria-label', 'A triangle with sides ' + a + ', ' + b + ', ' + c + ' and a copy scaled by ' + k + '.');
    } else {
      var f = spec.first, w = vars.w, h = vars.h, wmax = Math.max(f[0], spec.sl.w ? spec.sl.w.max : w), hmax = Math.max(f[1], spec.sl.h ? spec.sl.h.max : h);
      var U = Math.min(380 / (f[0] + wmax), 320 / hmax), by = 380;
      add('rect', { x: 40, y: by - f[1] * U, width: f[0] * U, height: f[1] * U, fill: blue, 'fill-opacity': 0.15, stroke: blue, 'stroke-width': 3 });
      add('rect', { x: 80 + f[0] * U, y: by - h * U, width: w * U, height: h * U, fill: orange, 'fill-opacity': 0.15, stroke: orange, 'stroke-width': 3 });
      txt(40 + f[0] * U / 2, by + 18, B.fmt(f[0]), blue); txt(30, by - f[1] * U / 2, B.fmt(f[1]), blue, 'end');
      txt(80 + f[0] * U + w * U / 2, by + 18, B.fmt(w), orange); txt(80 + f[0] * U + w * U + 10, by - h * U / 2, B.fmt(h), orange, 'start');
      svg.setAttribute('aria-label', 'A ' + f[0] + ' by ' + f[1] + ' rectangle and a ' + w + ' by ' + h + ' rectangle.');
      void muted; void ink;
    }
    el.appendChild(svg);
  }
  function slider(nm, label) {
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
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var lab = { k: 'the scale factor', w: 'the width', h: 'the height' };
    spec.names.forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n, lab[n])); });
    var bar = document.createElement('div'); bar.className = 'gbar'; var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + B.fmt(vars[o.n]); });
    draw();
    var sc, work, note;
    if (spec.kind === 'triangle') {
      var a = spec.abc[0], b = spec.abc[1], c = spec.abc[2], k = vars.k, xs = [a, b, c].map(function (v) { return r2(v * k); });
      work = 'Copy = original × ' + B.fmt(k) + ': ' + [a, b, c].map(function (v, i) { return B.fmt(v) + ' × ' + B.fmt(k) + ' = ' + (spec.hide === 'xyz'[i] ? '?' : B.fmt(xs[i])); }).join(', ');
      note = 'Every side is multiplied by ' + B.fmt(k) + ' and every angle stays the same, so the triangles are similar' + (k === 1 ? ' (and congruent, as k = 1).' : '. Each copy side ÷ its matching original side = ' + B.fmt(k) + '.');
      sc = { k: k, a: a, b: b, c: c, x: xs[0], y: xs[1], z: xs[2] };
    } else {
      var f = spec.first, w = vars.w, h = vars.h, k1 = w / f[0], k2 = h / f[1], sim = Math.abs(k1 - k2) < 1e-9, con = sim && Math.abs(k1 - 1) < 1e-9;
      work = 'Width ' + B.fmt(w) + ' ÷ ' + B.fmt(f[0]) + ' = ' + B.fmt(r2(k1)) + ', height ' + B.fmt(h) + ' ÷ ' + B.fmt(f[1]) + ' = ' + B.fmt(r2(k2));
      note = con ? 'Same size and shape: congruent (and similar).' : sim ? 'The same scale factor both ways (' + B.fmt(r2(k1)) + '): similar, not congruent.' : 'Different scale factors for width and height: not similar. All the angles are 90°, but the shape is stretched.';
      sc = { w: w, h: h, s: sim ? 1 : 0, c: con ? 1 : 0, k: sim ? r2(k1) : 0 };
    }
    ui.work.textContent = work; ui.note.textContent = note;
    B.say(work + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: sc, points: {} } }, work + '. ' + note);
  }
  B.widget('similar', {
    sections: ['board', 'gpanel'],
    label: function (s) { return /^rect/i.test(s.shape || '') ? 'Two rectangles to compare' : 'A triangle and a scaled copy'; },
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
