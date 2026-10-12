// Transformations on the Cartesian plane: a shape and its image after a translation, a reflection or a rotation.
//   widget: transform
//   mode: translate | reflect | rotate
//   shape: 1,1; 3,1; 3,2          the corners (up to 6), in order, written x,y; separated by semicolons. Called A, B, C…
//   range: 8                      the axes run from −range to range (default 8)
//   translate: slider dx: -8, 8, 0 and slider dy: -8, 8, 0 (min, max, start, step); or fixed "dx: 3"
//   reflect:   buttons "Reflect in the x-axis" and "Reflect in the y-axis" (and "Show the original only"); "axis: x" or
//              "axis: y" starts reflected (and no buttons)
//   rotate:    slider t: 0, 360, 0, 90 the turn in degrees anticlockwise; centre: 0, 0 (default origin)
//   show: rule                    hide nothing; "show: none" hides the rule line (students find it)
// state: { scope: { vars: { dx, dy, m (reflect: 0 none, 1 x-axis, 2 y-axis), t (rotate: degrees), … },
//          points: { A: [x, y], B: … } } }   the points are the IMAGE's corners (the original is fixed by the lesson)
// Checks: "x(A) = 4 and y(A) = 2", "dx = 3 and dy = -2", "m = 1", "t = 90 and x(B) = -1".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NAMES = ['dx', 'dy', 't'];
  var r6 = function (v) { return Math.round(v * 1e6) / 1e6; };
  var sg = function (n) { return n < 0 ? '−' + Math.abs(n) : String(n); };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }

  function parse(s) {
    s.mode = String(s.mode || 'translate').trim().toLowerCase();
    if (['translate', 'reflect', 'rotate'].indexOf(s.mode) < 0) throw new Error('mode: translate, reflect or rotate.');
    s.pts = String(s.shape || '1,1; 3,1; 3,2').split(';').map(function (p) { var v = nums(p, 'shape'); if (v.length !== 2) throw new Error('shape: each corner is x,y.'); return v; });
    if (s.pts.length < 3 || s.pts.length > 6) throw new Error('shape: 3 to 6 corners.');
    s.range = s.range === undefined ? 8 : Number(s.range);
    if (!(s.range >= 4 && s.range <= 12)) throw new Error('range: from 4 to 12.');
    s.pts.forEach(function (p) { if (Math.abs(p[0]) > s.range || Math.abs(p[1]) > s.range) throw new Error('shape: a corner is outside the axes.'); });
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the transform board has sliders dx, dy (translate) and t (rotate) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start and an optional step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    NAMES.forEach(function (n) { if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fix[n] = nums(s[n], n)[0]; } });
    var need = s.mode === 'translate' ? ['dx', 'dy'] : s.mode === 'rotate' ? ['t'] : [];
    need.forEach(function (n) { if (!s.sl[n] && s.fix[n] === undefined) throw new Error(n + ': needs a slider or a value.'); });
    s.centre = s.centre === undefined ? [0, 0] : nums(s.centre, 'centre');
    if (s.centre.length !== 2) throw new Error('centre: x, y.');
    var ax = String(s.axis || '').trim().toLowerCase();
    s.axis0 = ax === 'x' ? 1 : ax === 'y' ? 2 : 0;
    s.fixedAxis = !!s.axis0;
    s.rule = !/^none$/i.test(s.show || '');
  }

  function image(p) {
    if (spec.mode === 'translate') return [p[0] + vars.dx, p[1] + vars.dy];
    if (spec.mode === 'reflect') return vars.m === 1 ? [p[0], -p[1]] : vars.m === 2 ? [-p[0], p[1]] : [p[0], p[1]];
    var a = vars.t * Math.PI / 180, c = Math.round(Math.cos(a) * 1e9) / 1e9, s = Math.round(Math.sin(a) * 1e9) / 1e9, dx = p[0] - spec.centre[0], dy = p[1] - spec.centre[1];
    return [r6(spec.centre[0] + dx * c - dy * s), r6(spec.centre[1] + dx * s + dy * c)];
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675';
    var R = spec.range + 0.6;
    var board = B.jsx({ boundingbox: [-R, R, R, -R], keepAspectRatio: true, axis: true, grid: true });
    var letters = 'ABCDEF', orig = spec.pts, img = orig.map(image);
    board.create('polygon', orig, { fillColor: blue, fillOpacity: 0.3, borders: { strokeColor: blue, strokeWidth: 2.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    var changed = img.some(function (q, i) { return Math.abs(q[0] - orig[i][0]) > 1e-9 || Math.abs(q[1] - orig[i][1]) > 1e-9; });
    if (spec.mode !== 'reflect' || vars.m) board.create('polygon', img, { fillColor: orange, fillOpacity: 0.3, borders: { strokeColor: orange, strokeWidth: 2.5, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    var lab = function (p, t, col, off) { board.create('text', [p[0] + off[0], p[1] + off[1], t], { anchorX: 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: 15, fixed: true, highlight: false }); };
    var cen = [0, 0, 0].map(function () { return 0; });
    orig.forEach(function (p) { cen[0] += p[0] / orig.length; cen[1] += p[1] / orig.length; });
    var off = function (p) { var dx = p[0] - cen[0], dy = p[1] - cen[1], d = Math.hypot(dx, dy) || 1; return [dx / d * 0.55, dy / d * 0.55]; };
    orig.forEach(function (p, i) { lab(p, letters[i], blue, off(p)); });
    if (changed || spec.mode !== 'reflect') img.forEach(function (q, i) { if (spec.mode === 'reflect' && !vars.m) return; lab(q, letters[i] + '′', orange, off(orig[i]).map(function (v, k) { return spec.mode === 'reflect' ? (k === 0 && vars.m === 2 ? -v : k === 1 && vars.m === 1 ? -v : v) : v; })); });
    if (spec.mode === 'translate' && changed) orig.forEach(function (p, i) { board.create('arrow', [p, img[i]], { strokeColor: muted, strokeWidth: 1.5, dash: 2, fixed: true, highlight: false }); });
    if (spec.mode === 'rotate') board.create('point', spec.centre, { size: 4, fixed: true, name: '', strokeColor: ink, fillColor: ink, highlight: false });
    board.update();
    return img;
  }

  function slider(n, label) {
    var sl = spec.sl[n], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, r6(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars[n] = v; r.value = v; B.moved = true; report(); };
    r.addEventListener('input', function () { set(Number(r.value)); });
    minus.addEventListener('click', function () { set(vars[n] - sl.step); });
    plus.addEventListener('click', function () { set(vars[n] + sl.step); });
    row.append(lab, minus, r, plus, out); ui.outs.push({ n: n, out: out });
    return row;
  }
  var LABELS = { dx: 'the move right', dy: 'the move up', t: 'the turn' };

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    NAMES.forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n, LABELS[n])); });
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.mode === 'reflect' && !spec.fixedAxis) {
      [['Reflect in the x-axis', 1], ['Reflect in the y-axis', 2], ['Show the original only', 0]].forEach(function (b) {
        var btn = document.createElement('button'); btn.type = 'button'; btn.textContent = b[0]; btn.setAttribute('aria-label', b[0]);
        btn.addEventListener('click', function () { vars.m = b[1]; B.moved = true; report(); });
        bar.appendChild(btn);
      });
    }
    if (Object.keys(spec.sl).length || (spec.mode === 'reflect' && !spec.fixedAxis)) {
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function ruleText() {
    if (spec.mode === 'translate') return '(x, y) → (x ' + (vars.dx < 0 ? '−' : '+') + ' ' + Math.abs(vars.dx) + ', y ' + (vars.dy < 0 ? '−' : '+') + ' ' + Math.abs(vars.dy) + ')';
    if (spec.mode === 'reflect') return vars.m === 1 ? '(x, y) → (x, −y)' : vars.m === 2 ? '(x, y) → (−x, y)' : '';
    if (spec.centre[0] !== 0 || spec.centre[1] !== 0) return '';
    var t = ((vars.t % 360) + 360) % 360;
    return t === 90 ? '(x, y) → (−y, x)' : t === 180 ? '(x, y) → (−x, −y)' : t === 270 ? '(x, y) → (y, −x)' : '(x, y) → (x, y)';
  }

  function report() {
    var img = build(), letters = 'ABCDEF';
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + sg(vars[o.n]) + (o.n === 't' ? '°' : ''); });
    var head;
    if (spec.mode === 'translate') head = 'Translate ' + Math.abs(vars.dx) + (vars.dx < 0 ? ' left, ' : ' right, ') + Math.abs(vars.dy) + (vars.dy < 0 ? ' down' : ' up');
    else if (spec.mode === 'reflect') head = vars.m === 1 ? 'Reflect in the x-axis' : vars.m === 2 ? 'Reflect in the y-axis' : 'The original shape';
    else head = 'Rotate ' + vars.t + '° anticlockwise about (' + spec.centre.map(sg).join(', ') + ')';
    var rule = ruleText();
    ui.work.textContent = head + (spec.rule && rule ? ': ' + rule : '');
    var pairs = img.map(function (q, i) { return letters[i] + ' (' + sg(spec.pts[i][0]) + ', ' + sg(spec.pts[i][1]) + ') → ' + letters[i] + '′ (' + sg(q[0]) + ', ' + sg(q[1]) + ')'; });
    ui.note.textContent = (spec.mode === 'reflect' && !vars.m) ? 'Choose an axis to reflect in.' : pairs.join('; ') + '.';
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ vars: vars });
    var pts = {}; img.forEach(function (q, i) { pts[letters[i]] = [q[0], q[1]]; });
    var sc = { dx: vars.dx || 0, dy: vars.dy || 0, m: vars.m || 0, t: vars.t || 0 };
    B.post({ scope: { vars: sc, points: pts } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('transform', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A shape and its image after a ' + String(s.mode || 'translate').toLowerCase() + ' on the Cartesian plane'; },
    parse: parse,
    redraw: function () { if (spec) build(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      NAMES.forEach(function (n) { if (spec.sl[n]) vars[n] = sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start; else if (spec.fix[n] !== undefined) vars[n] = spec.fix[n]; });
      vars.m = sv && sv.vars && sv.vars.m !== undefined ? sv.vars.m : spec.axis0;
      paintPanel(); report();
    },
  });
})(WPB);
