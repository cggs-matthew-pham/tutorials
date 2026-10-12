// Views: a stack of cubes drawn in 3D (isometric) and as the top, front and side views you would draw on paper.
//   widget: views
//   size: 3                      the base is size × size cells (2 to 4)
//   max: 4                       the tallest a pile may be (1 to 5)
//   start: 2,1,0; 0,1,0; 0,0,0  each cell's height, row by row (the first row is at the back), left to right
//   numbers: on                  write each pile's height on the top view
//   hide: iso                    hide the 3D drawing (so only the views show), or "hide: views" for only the 3D drawing
//   Students press a cell's button to add a cube (back to 0 after the tallest).
// The front view looks at the front row from the front (columns left to right); the side view looks from the right
// (the front row is on the right); the top view looks down, with the back row at the top.
// state vars: n (cubes in all), h (the tallest pile), t (squares in the top view), f (front view), s (side view)
// Checks: "n = 6 and f = 4", "t = 4 and s = 3", "h = 3".
(function (B) {
  'use strict';
  var spec = null, H = [], ui = {};
  var NS = 'http://www.w3.org/2000/svg';

  function parse(s) {
    s.n = s.size === undefined ? 3 : Number(s.size);
    if (!(s.n >= 2 && s.n <= 4 && s.n === Math.round(s.n))) throw new Error('size: 2, 3 or 4.');
    s.mx = s.max === undefined ? 4 : Number(s.max);
    if (!(s.mx >= 1 && s.mx <= 5 && s.mx === Math.round(s.mx))) throw new Error('max: 1 to 5.');
    var rows = s.start === undefined ? [] : String(s.start).split(';').map(function (r) { return r.split(',').map(function (x) { var v = Number(x.trim()); if (!(v >= 0 && v <= s.mx && v === Math.round(v))) throw new Error('start: heights are whole numbers from 0 to ' + s.mx + '.'); return v; }); });
    if (rows.length && (rows.length !== s.n || rows.some(function (r) { return r.length !== s.n; }))) throw new Error('start: ' + s.n + ' rows of ' + s.n + ' heights, rows separated by semicolons.');
    s.rows0 = rows.length ? rows : Array.apply(null, Array(s.n)).map(function () { return Array.apply(null, Array(s.n)).map(function () { return 0; }); });
    s.numbers = /^on$/i.test(s.numbers || '');
    var hd = String(s.hide || '').toLowerCase(); s.hideIso = hd === 'iso'; s.hideViews = hd === 'views';
  }
  var sqs = function (n) { return n + (n === 1 ? ' square' : ' squares'); };
  function copy(rows) { return rows.map(function (r) { return r.slice(); }); }
  function stats() {
    var n = spec.n, tot = 0, tall = 0, top = 0, front = [], side = [];
    for (var i = 0; i < n; i++) { front.push(0); side.push(0); }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      var h = H[y][x]; tot += h; if (h > tall) tall = h; if (h > 0) top++;
      if (h > front[x]) front[x] = h; if (h > side[y]) side[y] = h;
    }
    return { n: tot, h: tall, t: top, front: front, side: side, f: front.reduce(function (a, b) { return a + b; }, 0), s: side.reduce(function (a, b) { return a + b; }, 0) };
  }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* gone */ } B.jsxBoard = null; }
    var n = spec.n, mx = spec.mx, S = stats();
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', orange = B.css('--accent') || '#c2570a', blue = B.css('--left') || '#2f6fb3';
    var W = 720, Ht = 380;
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + Ht); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0'; el.style.position = 'relative'; svg.setAttribute('role', 'img');
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var C = Math.cos(Math.PI / 6);
    var showIso = !spec.hideIso, showViews = !spec.hideViews;
    if (showIso) {
      var u = 34, ox = (showViews ? 190 : W / 2), oy = 360 - 20;
      // the lowest point is the front corner (n, n, 0): put it near the bottom
      var P = function (x, y, z) { return [ox + (x - y) * C * u, oy - ((n + n) / 2) * u + ((x + y) / 2 - z) * u + 40]; };
      var pts = function (a) { return a.map(function (p) { var q = P(p[0], p[1], p[2]); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); };
      var face = function (a, col) { add('polygon', { points: pts(a), fill: col, stroke: ink, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }); };
      var cubes = [];
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) for (var z = 0; z < H[y][x]; z++) cubes.push([x, y, z]);
      cubes.sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]) || a[2] - b[2]; });
      // ground grid
      face([[0, 0, 0], [n, 0, 0], [n, n, 0], [0, n, 0]], '#f1efe9');
      cubes.forEach(function (c) {
        var x = c[0], y = c[1], z = c[2];
        face([[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]], '#9fc0e3');
        face([[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]], '#6f9fd0');
        face([[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]], '#d5e5f6');
      });
      var fq = P(n / 2, n, 0);
      add('text', { x: fq[0] - 30, y: fq[1] + 22, 'text-anchor': 'middle', 'font-size': 14, fill: muted }, 'front');
    }
    if (showViews) {
      var cs = 22, vx = showIso ? 440 : 40;
      var panelBox = function (title, x0, y0, w, h) { add('text', { x: x0, y: y0 - 6, 'font-size': 14, 'font-weight': 700, fill: ink }, title); add('rect', { x: x0, y: y0, width: w, height: h, fill: 'none', stroke: 'var(--line, #e4e1da)', 'stroke-width': 1 }); };
      // top view
      var ty = 24;
      panelBox('Top', vx, ty, n * cs, n * cs);
      for (var r = 0; r < n; r++) for (var q = 0; q < n; q++) {
        var h = H[r][q];
        add('rect', { x: vx + q * cs, y: ty + r * cs, width: cs, height: cs, fill: h > 0 ? '#d5e5f6' : 'none', stroke: h > 0 ? ink : 'var(--line, #e4e1da)', 'stroke-width': h > 0 ? 1.5 : 1 });
        if (spec.numbers && h > 0) add('text', { x: vx + q * cs + cs / 2, y: ty + r * cs + cs / 2 + 5, 'text-anchor': 'middle', 'font-size': 13, fill: ink }, String(h));
      }
      // front view
      var fy = ty + n * cs + 36;
      panelBox('Front', vx, fy, n * cs, mx * cs);
      S.front.forEach(function (hh, x) { for (var k = 0; k < hh; k++) add('rect', { x: vx + x * cs, y: fy + (mx - 1 - k) * cs, width: cs, height: cs, fill: '#9fc0e3', stroke: ink, 'stroke-width': 1.5 }); });
      // side view (from the right: the front row on the right, so y from n-1 down to 0 left to right)
      var sy = fy + mx * cs + 36;
      panelBox('Side (from the right)', vx, sy, n * cs, mx * cs);
      for (var i = 0; i < n; i++) { var yy = n - 1 - i; for (var k2 = 0; k2 < S.side[yy]; k2++) add('rect', { x: vx + i * cs, y: sy + (mx - 1 - k2) * cs, width: cs, height: cs, fill: '#6f9fd0', stroke: ink, 'stroke-width': 1.5 }); }
      add('text', { x: vx + n * cs + 18, y: ty + 16, 'font-size': 13, fill: muted }, sqs(S.t));
      add('text', { x: vx + n * cs + 18, y: fy + 16, 'font-size': 13, fill: muted }, sqs(S.f));
      add('text', { x: vx + n * cs + 18, y: sy + 16, 'font-size': 13, fill: muted }, sqs(S.s));
    }
    svg.setAttribute('aria-label', 'A stack of ' + S.n + ' cubes: ' + sqs(S.t) + ' in the top view, ' + S.f + ' in the front view and ' + S.s + ' in the side view.');
    el.appendChild(svg);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { cells: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var grid = document.createElement('div'); grid.className = 'vgrid'; grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Height of each pile of cubes. The first row is at the back.');
    grid.style.gridTemplateColumns = 'repeat(' + spec.n + ', 3em)';
    for (var y = 0; y < spec.n; y++) for (var x = 0; x < spec.n; x++) (function (x, y) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'vcell';
      b.addEventListener('click', function () { H[y][x] = (H[y][x] + 1) % (spec.mx + 1); B.moved = true; report(); });
      grid.appendChild(b); ui.cells.push({ x: x, y: y, b: b });
    })(x, y);
    panel.appendChild(grid);
    var bar = document.createElement('div'); bar.className = 'gbar';
    var clr = document.createElement('button'); clr.type = 'button'; clr.textContent = 'Clear all'; clr.addEventListener('click', function () { H = H.map(function (r) { return r.map(function () { return 0; }); }); B.moved = true; report(); });
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.append(clr, again); panel.appendChild(bar);
  }

  function report() {
    var S = stats();
    ui.cells.forEach(function (c) {
      var h = H[c.y][c.x]; c.b.textContent = h;
      c.b.setAttribute('aria-label', 'Row ' + (c.y + 1) + (c.y === 0 ? ' (back)' : c.y === spec.n - 1 ? ' (front)' : '') + ', column ' + (c.x + 1) + ': ' + h + (h === 1 ? ' cube' : ' cubes') + '. Press to add one.');
    });
    draw();
    ui.work.textContent = S.n + (S.n === 1 ? ' cube' : ' cubes') + ': top ' + S.t + (S.t === 1 ? ' square' : ' squares') + ', front ' + S.f + ', side ' + S.s;
    ui.note.textContent = 'Each pile shows only its tallest height in the front and side views, so a lower cube behind a taller one is hidden there.';
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ H: H });
    B.post({ scope: { vars: { n: S.n, h: S.h, t: S.t, f: S.f, s: S.s }, points: {} } }, ui.work.textContent);
  }

  B.widget('views', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A stack of cubes drawn in 3D and as top, front and side views'; },
    parse: parse,
    redraw: function () { if (spec) draw(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      H = sv && sv.H && sv.H.length === spec.n ? copy(sv.H) : copy(spec.rows0);
      paintPanel(); report();
    },
  });
})(WPB);
