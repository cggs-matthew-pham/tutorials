// Shapes as numbers: the same picture stored two ways. A vector picture is a short list of shapes, each a few numbers
// (where, how big, what colour); a bitmap is a grid of pixels, three numbers each. Zoom in and the vector is drawn
// again, sharp, at the new size; the bitmap's pixels just get bigger. mode: mesh shows a 3D model as numbers: a list of
// corners (x, y, z) and the faces that join them.
//   widget: shapes
//   mode: vector | mesh
// mode: vector
//   shape: circle 50 40 20 gold         one line per shape, drawn in order on a 100 by 100 page:
//                                       circle x y r, rect x y width height, triangle x1 y1 x2 y2 x3 y3, then a colour
//                                       (gold, red, blue, green, black, white, sky, grey, orange, purple)
//   grid: 16                            the bitmap's size, 8 to 64 pixels across (buttons change it unless grid: fixed)
//   edit: on                            each shape's numbers can be typed (inputs labelled "Shape 1 x", "Shape 2 r"…)
//   target: circle 50 50 30 gold; rect 0 80 100 20 green     a picture to match, drawn as a dashed outline (m = 1)
//   view: both | vector | bitmap        which views show (default both)
//   Values: z (zoom 1, 2, 4 or 8), g (grid), v (numbers the vector stores: each shape's numbers + 3 for its colour),
//           b (numbers the bitmap stores: grid × grid × 3), s (shapes), m (1 when the shapes match the target),
//           c (number edits made)
// mode: mesh
//   shape: cube (default) | pyramid | prism       the starting model
//   edit: on                            each corner's x, y, z can be typed (inputs labelled "Corner 5 y")
//   Turn left and Turn right buttons spin the model; it is drawn from its numbers each time.
//   Values: n (corners), f (faces), k (numbers stored: 3 per corner + one per corner of each face), h (height: top
//           y − bottom y), w (width: x range), p (1 when the cube's four top corners meet at one point: a pyramid),
//           t (turn, degrees), c (number edits made)
(function (B) {
  'use strict';
  var spec = null, ui = {}, st = null;
  var COL = { gold: [255, 200, 0], red: [230, 40, 40], blue: [40, 90, 230], green: [40, 170, 70], black: [20, 20, 20], white: [255, 255, 255], sky: [140, 200, 250], grey: [150, 150, 150], orange: [250, 140, 30], purple: [140, 70, 200] };
  var ARGS = { circle: ['x', 'y', 'r'], rect: ['x', 'y', 'width', 'height'], triangle: ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'] };
  var ZOOMS = [1, 2, 4, 8], GRIDS = [8, 16, 32, 64];
  var MESH = {
    cube: { v: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1], [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], f: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] },
    pyramid: { v: [[0, 1, 0], [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], f: [[1, 2, 3, 4], [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1]] },
    prism: { v: [[-1, -1, -1], [1, -1, -1], [0, 1, -1], [-1, -1, 1], [1, -1, 1], [0, 1, 1]], f: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]] },
  };

  function shapeOf(text, what) {
    var t = String(text).trim().split(/\s+/), kind = (t[0] || '').toLowerCase(), args = ARGS[kind];
    if (!args) throw new Error(what + ': circle, rect or triangle, then its numbers and a colour.');
    var nums = t.slice(1, 1 + args.length).map(Number), col = (t[1 + args.length] || 'black').toLowerCase();
    if (nums.length !== args.length || nums.some(function (n) { return !isFinite(n); })) throw new Error(what + ': ' + kind + ' needs ' + args.join(', ') + '.');
    if (!COL[col]) throw new Error(what + ': colour is one of ' + Object.keys(COL).join(', ') + '.');
    return { kind: kind, n: nums, col: col };
  }
  function parse(s) {
    s.m = String(s.mode || 'vector').toLowerCase();
    if (['vector', 'mesh'].indexOf(s.m) < 0) throw new Error('mode: vector or mesh.');
    s.edit0 = /^on$/i.test(s.edit || '');
    if (s.m === 'mesh') {
      s.mesh0 = String(s.shape || 'cube').toLowerCase();
      if (!MESH[s.mesh0]) throw new Error('shape: cube, pyramid or prism.');
      return;
    }
    s.shapes0 = s.items.filter(function (i) { return i.kind === 'shape' && !i.name; }).map(function (i) { return shapeOf(i.value, 'shape'); });
    if (!s.shapes0.length) s.shapes0 = [shapeOf('circle 50 50 30 gold', 'shape')];
    s.grid0 = Number(String(s.grid || '16').replace(/fixed/i, '').trim() || 16);
    s.gridFixed = /fixed/i.test(s.grid || '');
    if (GRIDS.indexOf(s.grid0) < 0) throw new Error('grid: 8, 16, 32 or 64.');
    s.target0 = s.target ? String(s.target).split(';').map(function (x) { return x.trim(); }).filter(Boolean).map(function (x) { return shapeOf(x, 'target'); }) : null;
    s.view0 = String(s.view || 'both').toLowerCase();
    if (['both', 'vector', 'bitmap'].indexOf(s.view0) < 0) throw new Error('view: both, vector or bitmap.');
  }

  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function btn(text, fn, aria, on) { var b = h('button', 'shbtn' + (on ? ' on' : ''), text); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria); if (on !== undefined) b.setAttribute('aria-pressed', String(!!on)); b.addEventListener('click', function () { fn(); B.moved = true; update(); }); return b; }
  function numInput(label, value, set) {
    var inp = h('input', 'shnum'); inp.type = 'number'; inp.value = value; inp.setAttribute('aria-label', label);
    var commit = function () { var v = Number(inp.value); if (inp.value === '' || !isFinite(v)) { inp.value = value; return; } if (v === value) return; value = v; set(v); st.c++; B.moved = true; update(); };
    inp.addEventListener('change', commit);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(); });
    return inp;
  }

  // ---------- vector ----------
  function inside(sh, x, y) {
    var n = sh.n;
    if (sh.kind === 'circle') return (x - n[0]) * (x - n[0]) + (y - n[1]) * (y - n[1]) <= n[2] * n[2];
    if (sh.kind === 'rect') return x >= n[0] && x <= n[0] + n[2] && y >= n[1] && y <= n[1] + n[3];
    var s1 = (x - n[2]) * (n[1] - n[3]) - (n[0] - n[2]) * (y - n[3]);
    var s2 = (x - n[4]) * (n[3] - n[5]) - (n[2] - n[4]) * (y - n[5]);
    var s3 = (x - n[0]) * (n[5] - n[1]) - (n[4] - n[0]) * (y - n[1]);
    return !((s1 < 0 || s2 < 0 || s3 < 0) && (s1 > 0 || s2 > 0 || s3 > 0));
  }
  function focus() {
    var sh = st.shapes.filter(function (x) { return x.kind === 'circle'; })[0] || st.shapes.filter(function (x) { return x.kind === 'triangle'; })[0] || st.shapes[0], n = sh.n;
    if (sh.kind === 'circle') return [n[0] + n[2] * 0.7071, n[1] - n[2] * 0.7071];
    if (sh.kind === 'rect') return [n[0] + n[2], n[1]];
    return [n[2], n[3]];
  }
  function viewBox() {
    var z = st.zoom, size = 100 / z, f = focus();
    var x = Math.max(0, Math.min(100 - size, f[0] - size / 2)), y = Math.max(0, Math.min(100 - size, f[1] - size / 2));
    return [x, y, size];
  }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, at) { var e = document.createElementNS(SVGNS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); return e; }
  function drawShape(svg, sh, extra) {
    var n = sh.n, at = Object.assign({ fill: 'rgb(' + COL[sh.col].join(',') + ')' }, extra || {});
    if (sh.kind === 'circle') svg.appendChild(svgEl('circle', Object.assign({ cx: n[0], cy: n[1], r: Math.max(0, n[2]) }, at)));
    else if (sh.kind === 'rect') svg.appendChild(svgEl('rect', Object.assign({ x: n[0], y: n[1], width: Math.max(0, n[2]), height: Math.max(0, n[3]) }, at)));
    else svg.appendChild(svgEl('polygon', Object.assign({ points: n[0] + ',' + n[1] + ' ' + n[2] + ',' + n[3] + ' ' + n[4] + ',' + n[5] }, at)));
  }
  function vectorView() {
    var vb = viewBox(), box = h('figure', 'shview');
    var svg = svgEl('svg', { viewBox: vb[0] + ' ' + vb[1] + ' ' + vb[2] + ' ' + vb[2], width: 240, height: 240, role: 'img', 'aria-label': 'Vector picture at ' + st.zoom + '× zoom' });
    svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 100, height: 100, fill: '#fff' }));
    st.shapes.forEach(function (sh) { drawShape(svg, sh); });
    if (spec.target0) spec.target0.forEach(function (sh) { drawShape(svg, sh, { fill: 'none', stroke: '#c0392b', 'stroke-width': 0.8 / Math.sqrt(st.zoom), 'stroke-dasharray': (2 / st.zoom) + ' ' + (1.5 / st.zoom) }); });
    box.appendChild(svg);
    box.appendChild(h('figcaption', '', 'Vector: ' + vNums() + ' numbers'));
    return box;
  }
  function bitmapView() {
    var g = st.grid, vb = viewBox(), box = h('figure', 'shview');
    var small = document.createElement('canvas'); small.width = g; small.height = g;
    var cx = small.getContext('2d'), img = cx.createImageData(g, g);
    for (var j = 0; j < g; j++) for (var i = 0; i < g; i++) {
      var x = (i + 0.5) * 100 / g, y = (j + 0.5) * 100 / g, c = [255, 255, 255];
      st.shapes.forEach(function (sh) { if (inside(sh, x, y)) c = COL[sh.col]; });
      var k = (j * g + i) * 4; img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
    }
    cx.putImageData(img, 0, 0);
    var big = document.createElement('canvas'); big.width = 240; big.height = 240; big.className = 'shcv';
    big.setAttribute('role', 'img'); big.setAttribute('aria-label', 'Bitmap picture, ' + g + ' by ' + g + ' pixels, at ' + st.zoom + '× zoom');
    var bx = big.getContext('2d'); bx.imageSmoothingEnabled = false;
    var s = g / 100; bx.drawImage(small, vb[0] * s, vb[1] * s, vb[2] * s, vb[2] * s, 0, 0, 240, 240);
    box.appendChild(big);
    box.appendChild(h('figcaption', '', 'Bitmap ' + g + ' × ' + g + ': ' + bNums().toLocaleString('en-AU') + ' numbers'));
    return box;
  }
  var vNums = function () { return st.shapes.reduce(function (t, sh) { return t + sh.n.length + 3; }, 0); };
  var bNums = function () { return st.grid * st.grid * 3; };
  function matches() {
    var t = spec.target0; if (!t || t.length !== st.shapes.length) return 0;
    return t.every(function (sh, i) { var m = st.shapes[i]; return m.kind === sh.kind && m.col === sh.col && sh.n.every(function (v, k) { return Math.abs(m.n[k] - v) < 0.01; }); }) ? 1 : 0;
  }
  function vectorRows() {
    var list = h('div', 'shlist');
    st.shapes.forEach(function (sh, i) {
      var row = h('div', 'shrow');
      row.appendChild(h('b', '', (i + 1) + '. ' + sh.kind));
      ARGS[sh.kind].forEach(function (a, k) {
        var lab = h('label', 'shfield'); lab.appendChild(h('span', '', a));
        if (spec.edit0) lab.appendChild(numInput('Shape ' + (i + 1) + ' ' + a, sh.n[k], function (v) { sh.n[k] = v; }));
        else lab.appendChild(h('span', 'shval', String(sh.n[k])));
        row.appendChild(lab);
      });
      var c = COL[sh.col]; row.appendChild(h('span', 'shcol', sh.col + ' (' + c.join(', ') + ')'));
      list.appendChild(row);
    });
    return list;
  }

  // ---------- mesh ----------
  function meshView() {
    var a = st.turn * Math.PI / 180, tilt = 0.45, ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), stt = Math.sin(tilt);
    var P = st.v.map(function (p) { var x = p[0] * ca + p[2] * sa, z = -p[0] * sa + p[2] * ca, y = p[1] * ct - z * stt; return [120 + x * 45, 120 - y * 45]; });
    var svg = svgEl('svg', { viewBox: '0 0 240 240', width: 240, height: 240, role: 'img', 'aria-label': 'The 3D model, drawn from its numbers, turned ' + st.turn + ' degrees' });
    svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 240, height: 240, fill: '#fff' }));
    st.f.forEach(function (face) {
      svg.appendChild(svgEl('polygon', { points: face.map(function (k) { return P[k].join(','); }).join(' '), fill: 'rgba(40,90,230,0.08)', stroke: '#2a5ae6', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }));
    });
    P.forEach(function (p, i) {
      svg.appendChild(svgEl('circle', { cx: p[0], cy: p[1], r: 3, fill: '#c0392b' }));
      var t = svgEl('text', { x: p[0] + 5, y: p[1] - 4, 'font-size': 11, fill: '#333' }); t.textContent = String(i + 1); svg.appendChild(t);
    });
    var box = h('figure', 'shview'); box.appendChild(svg);
    box.appendChild(h('figcaption', '', st.v.length + ' corners, ' + st.f.length + ' faces: ' + kNums() + ' numbers'));
    return box;
  }
  var kNums = function () { return st.v.length * 3 + st.f.reduce(function (t, f) { return t + f.length; }, 0); };
  function meshRows() {
    var tab = h('table', 'shtab'), hr = h('tr');
    ['Corner', 'x', 'y', 'z'].forEach(function (t) { hr.appendChild(h('th', '', t)); }); tab.appendChild(hr);
    st.v.forEach(function (p, i) {
      var tr = h('tr'); tr.appendChild(h('td', '', String(i + 1)));
      ['x', 'y', 'z'].forEach(function (a, k) {
        var td = h('td');
        if (spec.edit0) td.appendChild(numInput('Corner ' + (i + 1) + ' ' + a, p[k], function (v) { p[k] = v; })); else td.textContent = String(p[k]);
        tr.appendChild(td);
      });
      tab.appendChild(tr);
    });
    var faces = h('p', 'shfaces', 'Faces (which corners join): ' + st.f.map(function (f) { return f.map(function (k) { return k + 1; }).join('-'); }).join(', '));
    var wrap = h('div', 'shlist'); wrap.appendChild(tab); wrap.appendChild(faces);
    return wrap;
  }
  function meshVals() {
    var ys = st.v.map(function (p) { return p[1]; }), xs = st.v.map(function (p) { return p[0]; });
    var top = spec.mesh0 === 'cube' ? st.v.slice(0, 4) : [];
    var p = top.length && top.every(function (q) { return q[0] === top[0][0] && q[1] === top[0][1] && q[2] === top[0][2]; }) ? 1 : 0;
    return { n: st.v.length, f: st.f.length, k: kNums(), h: Math.max.apply(null, ys) - Math.min.apply(null, ys), w: Math.max.apply(null, xs) - Math.min.apply(null, xs), p: p, t: st.turn, c: st.c };
  }

  // ---------- drawing ----------
  function paintControls() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = h('div', 'shwrap');
    ui.views = h('div', 'shviews'); wrap.appendChild(ui.views);
    var bar = h('div', 'shbar'); ui.bar = bar; wrap.appendChild(bar);
    wrap.appendChild(spec.m === 'mesh' ? meshRows() : vectorRows());
    host.appendChild(wrap);
  }
  function paintBar() {
    var bar = ui.bar; bar.replaceChildren();
    if (spec.m === 'mesh') {
      bar.appendChild(btn('⟲ Turn left', function () { st.turn = (st.turn + 345) % 360; }, 'Turn left'));
      bar.appendChild(btn('Turn right ⟳', function () { st.turn = (st.turn + 15) % 360; }, 'Turn right'));
      return;
    }
    var z = h('span', 'shgroup'); z.appendChild(h('span', 'shlab', 'Zoom:'));
    ZOOMS.forEach(function (k) { z.appendChild(btn(k + '×', function () { st.zoom = k; }, 'Zoom ' + k + '×', st.zoom === k)); });
    bar.appendChild(z);
    if (spec.view0 !== 'vector' && !spec.gridFixed) {
      var g = h('span', 'shgroup'); g.appendChild(h('span', 'shlab', 'Bitmap pixels across:'));
      GRIDS.forEach(function (k) { g.appendChild(btn(String(k), function () { st.grid = k; }, 'Bitmap grid ' + k, st.grid === k)); });
      bar.appendChild(g);
    }
  }
  function update() {
    ui.views.replaceChildren();
    if (spec.m === 'mesh') ui.views.appendChild(meshView());
    else {
      if (spec.view0 !== 'bitmap') ui.views.appendChild(vectorView());
      if (spec.view0 !== 'vector') ui.views.appendChild(bitmapView());
    }
    paintBar();
    report();
  }
  function report() {
    var vars, text;
    if (spec.m === 'mesh') { vars = meshVals(); text = vars.n + ' corners and ' + vars.f + ' faces: ' + vars.k + ' numbers. Height ' + vars.h + ', width ' + vars.w + '.'; }
    else {
      vars = { z: st.zoom, g: st.grid, v: vNums(), b: bNums(), s: st.shapes.length, m: matches(), c: st.c };
      text = 'Zoom ' + st.zoom + '×. Vector: ' + vars.v + ' numbers. Bitmap ' + st.grid + ' × ' + st.grid + ': ' + vars.b.toLocaleString('en-AU') + ' numbers.' + (spec.target0 ? (vars.m ? ' Matches the target.' : ' Not the target yet.') : '');
    }
    ui.work.textContent = text; B.say(text, spec.target0 && vars.m === 1);
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, text);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = h('p', 'rulework'); ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = h('div', 'gbar bbar'); var again = h('button', 'quiet', 'Start again'); again.type = 'button'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function blank() {
    if (spec.m === 'mesh') { var m = MESH[spec.mesh0]; return { v: m.v.map(function (p) { return p.slice(); }), f: m.f, turn: 30, c: 0 }; }
    return { shapes: spec.shapes0.map(function (sh) { return { kind: sh.kind, n: sh.n.slice(), col: sh.col }; }), zoom: 1, grid: spec.grid0, c: 0 };
  }

  B.widget('shapes', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.m === 'mesh' ? 'A 3D model stored as numbers' : 'A picture stored as shapes and as pixels'; },
    parse: parse,
    redraw: function () { if (spec) update(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = sv && sv.st ? Object.assign(blank(), sv.st) : blank();
      paintPanel(); paintControls(); update();
    },
  });
})(WPB);
