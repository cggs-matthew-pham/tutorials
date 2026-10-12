// Prism: a right prism drawn in 3D (isometric), built in layers, so volume is "the area of the base times the height":
// a rectangular base is filled with unit cubes, one layer per unit of height; a right-triangle base is half of that
// rectangle, so each layer is half the cubes.
//   widget: prism
//   base: rectangle          or triangle (a right triangle with legs l and w)
//   slider l: 1, 8, 4        the base's length (or fixed "l: 4")
//   slider w: 1, 6, 3        the base's width
//   slider h: 0, 8, 1        the height: how many layers (or fixed)
//   units: cm                lengths in cm, areas in cm², volumes in cm³
//   capacity: on             also give the volume in mL (1 cm³ = 1 mL) or L; with units: m, in L (1 m³ = 1000 L)
// state: { scope: { vars: { l, w, h, A (the base area), v (the volume), c (the capacity: mL if units are cm, L if m) } } }
// Checks: "v = 60", "h = 5 and A = 12", "v = 36 and l = 3" (the base is the cross-section the layers repeat).
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NAMES = ['l', 'w', 'h'];
  var NS = 'http://www.w3.org/2000/svg';
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v) || v !== Math.round(v)) throw new Error(where + ': "' + x.trim() + '" is not a whole number.'); return v; }); }
  function parse(s) {
    s.kind = String(s.base || 'rectangle').trim().toLowerCase();
    if (['rectangle', 'triangle'].indexOf(s.kind) < 0) throw new Error('base: rectangle or triangle.');
    s.sl = {}; s.fixed = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the prism has sliders l, w (the base) and h (the height) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2] };
    });
    NAMES.forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fixed[n] = nums(s[n], n)[0]; }
      else if (!s.sl[n]) throw new Error(n + ': needs a slider or a value.');
    });
    var lo = function (n) { return s.sl[n] ? s.sl[n].min : s.fixed[n]; }, hi = function (n) { return s.sl[n] ? s.sl[n].max : s.fixed[n]; };
    if (lo('l') < 1 || lo('w') < 1 || lo('h') < 0) throw new Error('l and w from 1, h from 0.');
    if (hi('l') > 12 || hi('w') > 12 || hi('h') > 12) throw new Error('l, w and h up to 12.');
    s.max = { l: hi('l'), w: hi('w'), h: hi('h') };
    s.u = s.units ? String(s.units).trim() : '';
    s.cap = /^on$/i.test(s.capacity || '');
    if (s.cap && s.u !== 'cm' && s.u !== 'm') throw new Error('capacity: on needs units: cm (1 cm³ = 1 mL) or m (1 m³ = 1000 L).');
  }
  var unit = function (p) { return spec.u ? ' ' + spec.u + (p === 2 ? '²' : p === 3 ? '³' : '') : p === 3 ? ' cubes' : p === 2 ? ' squares' : ''; };

  function draw() {
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* gone */ } B.jsxBoard = null; }
    var el = B.el('board'); el.replaceChildren();
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', card = B.css('--card') || '#fff';
    var C = Math.cos(Math.PI / 6), M = spec.max;
    // a fixed frame from the slider maxima, so the prism does not jump as it grows
    var X0 = -M.w * C - 1.4, X1 = M.l * C + 1.4, Y0 = -M.h - 0.8, Y1 = (M.l + M.w) / 2 + 1.2;
    var u = 40, W = (X1 - X0) * u, H = (Y1 - Y0) * u;
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W.toFixed(1) + ' ' + H.toFixed(1)); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.setAttribute('role', 'img');
    var P = function (x, y, z) { return [((x - y) * C - X0) * u, ((x + y) / 2 - z - Y0) * u]; };
    var pts = function (arr) { return arr.map(function (p) { var q = P(p[0], p[1], p[2]); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); };
    var add = function (tag, at) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); svg.appendChild(e); return e; };
    var mix = function (hex, op) {   // the colour at this opacity over the card, made opaque (faces must hide what is behind)
      var six = function (h) { h = String(h || '').trim(); if (/^#[0-9a-f]{3}$/i.test(h)) h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3]; return /^#([0-9a-f]{6})$/i.exec(h); };
      var m = six(hex), n = six(card); if (!m || !n) return null;
      var c = function (h, i) { return parseInt(h.slice(i, i + 2), 16); };
      return 'rgb(' + [0, 2, 4].map(function (i) { return Math.round(c(m[1], i) * op + c(n[1], i) * (1 - op)); }).join(',') + ')';
    };
    var poly = function (arr, fill, op, stroke, sw, dash) { var solid = op <= 0 || dash ? null : mix(fill, op); return add('polygon', { points: pts(arr), fill: solid || fill, 'fill-opacity': solid ? 1 : op, stroke: stroke || ink, 'stroke-width': sw || 1, 'stroke-linejoin': 'round', 'stroke-dasharray': dash || 'none' }); };
    var line = function (a, b, col, sw, dash) { var p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]); return add('line', { x1: p[0].toFixed(1), y1: p[1].toFixed(1), x2: q[0].toFixed(1), y2: q[1].toFixed(1), stroke: col, 'stroke-width': sw || 1, 'stroke-dasharray': dash || 'none' }); };
    var text = function (p, t, col, anchor) { var e = add('text', { x: p[0].toFixed(1), y: p[1].toFixed(1), fill: col, 'font-size': 19, 'font-weight': 600, 'text-anchor': anchor || 'middle', 'dominant-baseline': 'middle', 'font-family': 'system-ui, sans-serif' }); e.textContent = t; };
    var l = vars.l, w = vars.w, h = vars.h;
    // the base outline on the floor (dashed where hidden)
    poly([[0, 0, 0], [l, 0, 0], [l, w, 0], [0, w, 0]], muted, spec.kind === 'triangle' ? 0 : 0.08, muted, 1.5, '5 4');
    if (spec.kind === 'triangle') line([l, 0, 0], [0, w, 0], muted, 1.5, '5 4');
    if (spec.kind === 'rectangle') {
      // a solid box, so only its three outer faces show: each drawn as unit squares, the top layer orange
      var cell = function (z) { return z === h - 1 ? [orange, 0.5] : [blue, z % 2 ? 0.34 : 0.24]; };
      for (var x = 0; x < l; x++) for (var y = 0; y < w; y++) if (h > 0) poly([[x, y, h], [x + 1, y, h], [x + 1, y + 1, h], [x, y + 1, h]], orange, 0.42, ink, 1);
      for (var z = 0; z < h; z++) {
        var c = cell(z);
        for (var yy = 0; yy < w; yy++) poly([[l, yy, z], [l, yy + 1, z], [l, yy + 1, z + 1], [l, yy, z + 1]], c[0], c[1], ink, 1);
        for (var xx = 0; xx < l; xx++) poly([[xx, w, z], [xx + 1, w, z], [xx + 1, w, z + 1], [xx, w, z + 1]], c[0], c[1] - 0.06, ink, 1);
      }
    } else if (h > 0) {
      // right angle at the front corner (l, w): the two leg faces and the top show; the sloping face is at the back
      poly([[l, 0, 0], [l, w, 0], [l, w, h], [l, 0, h]], blue, 0.3, ink, 1.5);          // +x face
      poly([[0, w, 0], [l, w, 0], [l, w, h], [0, w, h]], blue, 0.22, ink, 1.5);         // +y face
      for (var k = 1; k < h; k++) { line([l, 0, k], [l, w, k], ink, 1); line([0, w, k], [l, w, k], ink, 1); }
      poly([[l, 0, h], [l, w, h], [0, w, h]], orange, 0.45, ink, 1.5);
      for (var i = 1; i < l; i++) line([i, w * (1 - i / l), h], [i, w, h], ink, 0.8);
      for (var j = 1; j < w; j++) line([l * (1 - j / w), j, h], [l, j, h], ink, 0.8);
    }
    // labels: length along the front-right edge, width along the front-left, height up the right corner
    text(P(l / 2, w + 0.7, 0), 'l = ' + l + unit(1), ink);
    text(P(l + 0.8, w / 2, 0), 'w = ' + w + unit(1), ink, 'start');
    if (h > 0) { var hp = P(0, w, h / 2); text([hp[0] - 10, hp[1]], 'h = ' + h + unit(1), orange, 'end'); }
    svg.setAttribute('aria-label', 'A ' + (spec.kind === 'triangle' ? 'triangular' : 'rectangular') + ' prism, ' + l + ' by ' + w + ', height ' + h + '.');
    el.appendChild(svg);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var label = { l: 'the length', w: 'the width', h: 'the height' };
    NAMES.forEach(function (n) {
      var sl = spec.sl[n]; if (!sl) return;
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label[n] + ' smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = 1; r.value = vars[n];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label[n] + ' bigger');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round(v))); vars[n] = v; r.value = v; B.moved = true; draw(); report(); };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars[n] - 1); });
      plus.addEventListener('click', function () { set(vars[n] + 1); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row); ui.outs.push({ n: n, out: out });
    });
    if (Object.keys(spec.sl).length) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var l = vars.l, w = vars.w, h = vars.h, tri = spec.kind === 'triangle';
    var A = r2(tri ? l * w / 2 : l * w), v = r2(A * h);
    ui.outs.forEach(function (x) { x.out.textContent = x.n + ' = ' + vars[x.n]; });
    var baseTxt = tri ? '½ × ' + l + ' × ' + w + ' = ' + B.fmt(A) : l + ' × ' + w + ' = ' + B.fmt(A);
    ui.work.textContent = 'V = ' + B.fmt(A) + ' × ' + h + ' = ' + B.fmt(v) + unit(3) + (spec.cap ? ' = ' + (spec.u === 'm' ? B.fmt(r2(v * 1000)) + ' L' : v >= 1000 ? B.fmt(r2(v / 1000)) + ' L' : B.fmt(v) + ' mL') : '');
    ui.note.textContent = 'Base: ' + baseTxt + unit(2) + (tri ? ', half of the ' + l + ' by ' + w + ' rectangle' : ', ' + B.fmt(A) + ' cubes in each layer') + '. ' +
      (h === 0 ? 'No layers yet: make the height bigger.' : h + (h === 1 ? ' layer' : ' layers') + ' of ' + B.fmt(A) + '.');
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ vars: vars });
    var sc = { l: l, w: w, h: h, A: A, v: v }; if (spec.u === 'cm') sc.c = v; else if (spec.u === 'm') sc.c = r2(v * 1000);
    B.post({ scope: { vars: sc, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('prism', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A ' + (/^tri/i.test(s.base || '') ? 'triangular' : 'rectangular') + ' prism built in layers'; },
    parse: parse,
    redraw: function () { if (spec) draw(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {}; NAMES.forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      paintPanel(); draw(); report();
    },
  });
})(WPB);
