// Particle engine for the science board: a box of particles (solid, liquid or gas), drawn with JSXGraph.
// Shared by every widget in main.js. Plain script, no build step: it defines window.SCI.
//
// Box: particles move in a rectangle b = { x0, x1, y0, y1 } in board units.
//   mode 'solid'   particles vibrate around fixed sites (p.sx, p.sy)
//   mode 'liquid'  particles jiggle, push each other apart and (with g > 0) settle at the bottom
//   mode 'gas'     particles fly in straight lines and bounce off the walls
// Per particle: p.c (colour token, such as 'p1'), p.rr (own radius), p.lock (fixed site, even in a liquid),
// p.floor (its own lower bound for y), p.reg (its own rectangle), p.side 'L'/'R' with box.wall (a barrier at x = wall).
(function () {
  'use strict';
  var T = {};
  var TOK = ['p1', 'p2', 'p3', 'p4', 'p5', 'ink', 'muted', 'line', 'card', 'bg', 'accent', 'ok'];
  function readTokens() { var cs = getComputedStyle(document.documentElement); TOK.forEach(function (k) { T[k] = cs.getPropertyValue('--' + k).trim(); }); }
  readTokens();
  var themeFns = [];
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { readTokens(); themeFns.forEach(function (f) { f(); }); });
  function onTheme(f) { themeFns.push(f); }

  function Box(b, r) { this.b = Object.assign({}, b); this.r = r; this.ps = []; this.mode = 'gas'; this.jit = 0.5; this.speed = 0.3; this.g = 0; this.amp = 0.2; this.wall = null; }
  var R = function (box, p) { return p.rr || box.r; };
  Box.prototype.lattice = function (cols, rows, c, opt) {
    opt = opt || {}; var r = this.r, b = this.b, out = [];
    var sx = opt.s || (b.x1 - b.x0 - 2 * r - 0.3) / (cols - 1), sy = opt.s || (b.y1 - b.y0 - 2 * r - 0.3) / (rows - 1);
    var ox = opt.x0 !== undefined ? opt.x0 : b.x0 + r + 0.15, oy = opt.y0 !== undefined ? opt.y0 : b.y0 + r + 0.15;
    for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) { var x = ox + i * sx, y = oy + j * sy; out.push({ x: x, y: y, sx: x, sy: y, vx: 0, vy: 0, c: c }); }
    return out;
  };
  Box.prototype.scatter = function (n, c, reg) {
    reg = reg || this.b; var r = this.r, out = [];
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2;
      out.push({ x: reg.x0 + r + Math.random() * (reg.x1 - reg.x0 - 2 * r), y: reg.y0 + r + Math.random() * (reg.y1 - reg.y0 - 2 * r), vx: Math.cos(a) * this.speed, vy: Math.sin(a) * this.speed, c: c });
    }
    return out;
  };
  Box.prototype.setSpeed = function (v) {
    this.speed = v;
    this.ps.forEach(function (p) { var m = Math.hypot(p.vx, p.vy); if (m < 1e-6) { var a = Math.random() * 6.28; p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v; } else { p.vx *= v / m; p.vy *= v / m; } });
  };
  Box.prototype.bounds = function (p) {
    var r = R(this, p), bb = p.reg || this.b, lo = bb.x0 + r, hi = bb.x1 - r;
    if (this.wall !== null && p.side) { if (p.side === 'L') hi = Math.min(hi, this.wall - r); else lo = Math.max(lo, this.wall + r); }
    return [lo, hi];
  };
  Box.prototype.clamp = function () {
    var self = this;
    this.ps.forEach(function (p) {
      if (p.lock) return;
      var r = R(self, p), bb = p.reg || self.b, lh = self.bounds(p), y0 = (p.floor !== undefined ? p.floor : bb.y0) + r;
      if (p.x < lh[0]) { p.x = lh[0]; p.vx = Math.abs(p.vx); } if (p.x > lh[1]) { p.x = lh[1]; p.vx = -Math.abs(p.vx); }
      if (p.y < y0) { p.y = y0; p.vy = Math.abs(p.vy); } if (p.y > bb.y1 - r) { p.y = bb.y1 - r; p.vy = -Math.abs(p.vy); }
    });
  };
  Box.prototype.repel = function () {
    var ps = this.ps;
    for (var i = 0; i < ps.length; i++) for (var j = i + 1; j < ps.length; j++) {
      var a = ps[i], q = ps[j]; if (a.lock && q.lock) continue;
      var m = (R(this, a) + R(this, q)) * 0.98, dx = q.x - a.x, dy = q.y - a.y, d2 = dx * dx + dy * dy;
      if (d2 < m * m && d2 > 1e-9) {
        var d = Math.sqrt(d2), nx = dx / d, ny = dy / d, o = m - d, wa = a.lock ? 0 : (q.lock ? 1 : 0.5), wq = q.lock ? 0 : (a.lock ? 1 : 0.5);
        a.x -= nx * o * wa; a.y -= ny * o * wa; q.x += nx * o * wq; q.y += ny * o * wq;
      }
    }
  };
  Box.prototype.relax = function (n) { for (var k = 0; k < n; k++) { if (this.g) { var g = this.g; this.ps.forEach(function (p) { if (!p.lock) p.y -= g * 4; }); } this.repel(); this.clamp(); } };
  Box.prototype.step = function () {
    var self = this;
    this.ps.forEach(function (p) {
      if (self.mode === 'solid' || p.lock) { p.x = p.sx + (Math.random() - 0.5) * self.amp; p.y = p.sy + (Math.random() - 0.5) * self.amp; return; }
      if (self.mode === 'liquid') { p.vx = p.vx * 0.6 + (Math.random() - 0.5) * self.jit; p.vy = p.vy * 0.6 + (Math.random() - 0.5) * self.jit - self.g; }
      p.x += p.vx; p.y += p.vy;
    });
    if (this.mode === 'solid') return;
    this.clamp();
    if (this.mode === 'liquid') { this.repel(); this.repel(); this.clamp(); }
  };

  // ---------- the board ----------
  // want: the area that must be visible [x0, y1, x1, y0]. Units stay square, so a wide or tall board gets extra room.
  var board = null, want = null, loops = [], paints = [], raf = 0;
  function fit() {
    var el = document.getElementById('board'), w = el.clientWidth || 600, h = el.clientHeight || 360;
    var cx = (want[0] + want[2]) / 2, cy = (want[1] + want[3]) / 2, uw = want[2] - want[0], uh = want[1] - want[3];
    var unit = Math.min(w / uw, h / uh), hw = w / unit / 2, hh = h / unit / 2;
    return [cx - hw, cy + hh, cx + hw, cy - hh];
  }
  function newBoard(area) {
    if (board) JXG.JSXGraph.freeBoard(board);
    Array.prototype.forEach.call(document.querySelectorAll('#board canvas.dots'), function (c) { c.remove(); });
    loops = []; paints = []; want = area;
    board = JXG.JSXGraph.initBoard('board', { boundingbox: fit(), keepAspectRatio: false, axis: false, grid: false, showNavigation: false, showCopyright: false,
      pan: { enabled: false }, zoom: { enabled: false, wheel: false } });
    return board;
  }
  window.addEventListener('resize', function () {
    if (!board) return; var el = document.getElementById('board');
    board.resizeContainer(el.clientWidth, el.clientHeight); board.setBoundingBox(fit(), false); paints.forEach(function (f) { f(); }); board.update();
  });
  onTheme(function () { paints.forEach(function (f) { f(); }); if (board) board.update(); });
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function tick() { if (board && !document.hidden) loops.forEach(function (f) { f(); }); raf = requestAnimationFrame(tick); })();
  function loop(f) { loops.push(f); }
  function onPaint(f) { paints.push(f); f(); }

  // Draw a Box's particles. rebuild() after changing box.ps; sizes follow the board's scale.
  function drawer(box, k) {
    var pts = []; k = k || 0.92;
    var px = function (p) { return Math.max(2, (p.rr || box.r) * board.unitX * k); };
    function rebuild() {
      pts.forEach(function (p) { board.removeObject(p); }); pts = [];
      box.ps.forEach(function (p) {
        pts.push(board.create('point', [function () { return p.x; }, function () { return p.y; }], { name: '', withLabel: false, fixed: true, highlight: false,
          showInfobox: false, face: 'o', size: px(p), strokeWidth: 0, fillColor: T[p.c], strokeColor: T[p.c], fillOpacity: 1 }));
      });
      board.update();
    }
    function paint() { pts.forEach(function (pt, i) { var p = box.ps[i]; if (!p) return; pt.setAttribute({ fillColor: T[p.c], strokeColor: T[p.c], size: px(p) }); }); }
    paints.push(paint);
    return { rebuild: rebuild, paint: paint };
  }
  // A particle box on a fresh board: frame, particles, animation. opts: { pad, top, bottom, noFrame, dash, frameMuted, k }
  function particleBoard(b, r, opts) {
    opts = opts || {};
    var pad = opts.pad === undefined ? 1 : opts.pad;
    newBoard([b.x0 - pad, b.y1 + pad + (opts.top || 0), b.x1 + pad, b.y0 - pad - (opts.bottom || 0)]);
    var box = new Box(b, r);
    var frame = opts.noFrame ? null : board.create('curve', [[b.x0 - 0.1, b.x1 + 0.1, b.x1 + 0.1, b.x0 - 0.1, b.x0 - 0.1], [b.y0 - 0.1, b.y0 - 0.1, b.y1 + 0.1, b.y1 + 0.1, b.y0 - 0.1]],
      { strokeWidth: 2.5, highlight: false, dash: opts.dash || 0 });
    if (frame) onPaint(function () { frame.setAttribute({ strokeColor: opts.frameMuted ? T.muted : T.ink }); });
    var dr = drawer(box, opts.k);
    loop(function () { if (!reduce || opts.always) box.step(); else if (box.mode !== 'solid') box.step(); board.update(); });
    return { board: board, box: box, dr: dr, frame: frame, set: function (ps) { box.ps = ps; dr.rebuild(); dr.paint(); } };
  }
  function text(x, y, s, o) {
    o = o || {};
    var t = board.create('text', [x, y, s], { display: 'internal', anchorX: o.anchorX || 'middle', anchorY: o.anchorY || 'middle', fontSize: o.size || 13, fixed: true, highlight: false, cssStyle: o.bold ? 'font-weight:600' : '' });
    onPaint(function () { t.setAttribute({ strokeColor: T[o.c || 'muted'] }); });
    return t;
  }
  function curve(xs, ys, o) {
    o = o || {};
    var c = board.create('curve', [xs, ys], { strokeWidth: o.w || 2.5, highlight: false, dash: o.dash || 0, strokeOpacity: o.op || 1 });
    onPaint(function () { c.setAttribute({ strokeColor: T[o.c || 'ink'] }); });
    return c;
  }
  // Static windows of particles: [{ x, y, w, h, label, pts: [[x, y]], c, r }]
  function windows(list) {
    var objs = [];
    function draw() {
      objs.forEach(function (o) { board.removeObject(o); }); objs = [];
      list.forEach(function (w) {
        objs.push(board.create('polygon', [[w.x, w.y], [w.x + w.w, w.y], [w.x + w.w, w.y + w.h], [w.x, w.y + w.h]], { fillColor: T.bg, fillOpacity: 1, vertices: { visible: false },
          borders: { strokeColor: T.muted, dash: 2, strokeWidth: 1.5, highlight: false }, highlight: false, fixed: true }));
        w.pts.forEach(function (p) {
          var c = T[p[2] || w.c];
          objs.push(board.create('point', [p[0], p[1]], { name: '', withLabel: false, fixed: true, highlight: false, showInfobox: false, face: 'o', size: (p[3] || w.r) * board.unitX, strokeWidth: 0, fillColor: c, strokeColor: c }));
        });
        if (w.label) objs.push(board.create('text', [w.x + w.w / 2, w.y + w.h + 0.8, w.label], { display: 'internal', anchorX: 'middle', anchorY: 'middle', fontSize: 14, strokeColor: T.ink, fixed: true, highlight: false, cssStyle: 'font-weight:600' }));
        if (w.note) objs.push(board.create('text', [w.x + w.w / 2, w.y - 0.7, w.note], { display: 'internal', anchorX: 'middle', anchorY: 'middle', fontSize: 12, strokeColor: T.muted, fixed: true, highlight: false }));
      });
      board.update();
    }
    paints.push(draw); draw();
  }
  // A canvas over the board for boards with hundreds of particles (SVG points are too slow to move each frame).
  // draw(ctx, X, Y, u) runs every frame: X and Y turn board units into pixels, u is pixels per board unit.
  function dots(draw) {
    var el = document.getElementById('board'), cv = document.createElement('canvas'), ctx = cv.getContext('2d');
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    cv.className = 'dots'; cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
    el.appendChild(cv);
    loop(function () {
      var dpr = window.devicePixelRatio || 1, w = el.clientWidth, h = el.clientHeight;
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      var o = board.origin.scrCoords, ux = board.unitX, uy = board.unitY;
      draw(ctx, function (x) { return o[1] + x * ux; }, function (y) { return o[2] - y * uy; }, ux);
    });
  }
  function disc(ctx, x, y, r, fill, stroke) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.lineWidth = 1; ctx.strokeStyle = stroke; ctx.stroke(); } }

  // A seeded random generator, so static diagrams look the same every time.
  function seeded(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function spread(rnd, n, x0, y0, w, h, sep, extra) {
    var out = (extra || []).slice(), g = 0, start = out.length;
    while (out.length - start < n && g++ < 6000) { var x = x0 + rnd() * w, y = y0 + rnd() * h; if (out.every(function (q) { return Math.hypot(q[0] - x, q[1] - y) > sep; })) out.push([x, y]); }
    return out.slice(start);
  }

  window.SCI = { T: T, Box: Box, newBoard: newBoard, particleBoard: particleBoard, drawer: drawer, loop: loop, onPaint: onPaint, text: text, curve: curve,
    windows: windows, seeded: seeded, spread: spread, dots: dots, disc: disc, board: function () { return board; }, reduce: reduce };
})();
