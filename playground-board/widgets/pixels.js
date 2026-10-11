// A small bitmap: a grid of pixels, each stored as numbers. Set a colour with the red, green and blue sliders (0 to
// 255, light, not paint), then click pixels to paint them. The panel counts how many numbers the image needs.
//   widget: pixels
//   size: 4, 4             columns, rows (1 to 12 each)
//   mode: rgb              rgb (three numbers a pixel) | grey (one number a pixel, 0 black to 255 white)
//   colour: 255, 0, 0      the starting brush (r, g, b; one number in grey mode)
//   start: white           every pixel's starting colour: white | black, or rows of letters (see key) such as
//                          start: wwww / wrrw / wrrw / wwww   (rows split by /)
//   target: …              rows of letters for a picture to copy, drawn small beside the grid (checks: m = 1)
//   key: w=255,255,255 k=0,0,0 r=255,0,0 g=0,255,0 b=0,0,255 y=255,255,0   letters for start and target (these are
//                          the defaults; add more as letter=r,g,b)
//   numbers: on            show each pixel's numbers in its square (a button switches them otherwise)
//   sliders: off           no sliders: the brush stays at colour: (a paint-only task)
// state: { scope: { vars: { r, g, b (the brush), p, q, s (the last pixel painted or clicked: red, green, blue),
//          m (1 when the grid matches the target, else 0), n (numbers the image needs), c (pixels that are not the
//          start colour) } } }
// Checks: "r = 255 and g = 255 and b = 0", "p = 255 and q = 255 and s = 0", "m = 1".
(function (B) {
  'use strict';
  var spec = null, px = [], brush = [0, 0, 0], last = null, showNums = false, ui = {};
  var KEY0 = { w: [255, 255, 255], k: [0, 0, 0], r: [255, 0, 0], g: [0, 255, 0], b: [0, 0, 255], y: [255, 255, 0] };

  function rows(text, key, w, h, what) {
    var rs = String(text).split('/').map(function (t) { return t.trim(); });
    if (rs.length !== h || rs.some(function (r) { return r.length !== w; })) throw new Error(what + ': ' + h + ' rows of ' + w + ' letters, split by /.');
    var out = [];
    rs.forEach(function (r) { r.split('').forEach(function (c) { if (!key[c]) throw new Error(what + ': no colour for "' + c + '" (add it to key:).'); out.push(key[c].slice()); }); });
    return out;
  }
  function parse(s) {
    var sz = String(s.size || '4, 4').split(',').map(Number);
    s.w = sz[0]; s.h = sz[1] === undefined ? sz[0] : sz[1];
    if (!(s.w >= 1 && s.w <= 12 && s.h >= 1 && s.h <= 12 && s.w % 1 === 0 && s.h % 1 === 0)) throw new Error('size: columns, rows (1 to 12 each).');
    s.grey = /^grey$/i.test(s.mode || '');
    var keyText = s.key || ''; s.key = Object.assign({}, KEY0);
    String(keyText).split(/\s+/).filter(Boolean).forEach(function (kv) {
      var m = /^([a-z])=(\d+)(?:,(\d+),(\d+))?$/i.exec(kv);
      if (!m) throw new Error('key: letter=r,g,b, such as o=255,128,0.');
      s.key[m[1]] = m[3] === undefined ? [+m[2], +m[2], +m[2]] : [+m[2], +m[3], +m[4]];
    });
    var c = String(s.colour || (s.grey ? '0' : '0, 0, 0')).split(',').map(Number);
    s.brush0 = c.length === 1 ? [c[0], c[0], c[0]] : c;
    if (s.brush0.length !== 3 || s.brush0.some(function (v) { return !(v >= 0 && v <= 255 && v % 1 === 0); })) throw new Error('colour: three whole numbers from 0 to 255 (one in grey mode).');
    var st = String(s.start || 'white').trim();
    s.start0 = /^(white|black)$/i.test(st) ? Array.apply(null, Array(s.w * s.h)).map(function () { return /white/i.test(st) ? [255, 255, 255] : [0, 0, 0]; }) : rows(st, s.key, s.w, s.h, 'start');
    s.base = s.start0[0].join(',');
    s.target0 = s.target ? rows(s.target, s.key, s.w, s.h, 'target') : null;
    s.nums = /^on$/i.test(s.numbers || '');
    s.sliders = !/^off$/i.test(s.sliders || '');
  }

  var css = function (c) { return 'rgb(' + c.join(',') + ')'; };
  var light = function (c) { return 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] > 140; };
  function name(c) {
    var r = c[0], g = c[1], b = c[2], hi = 200, lo = 60;
    if (r === g && g === b) return r === 0 ? 'black' : r === 255 ? 'white' : 'grey';
    if (r > hi && g > hi && b < lo) return 'yellow';
    if (r < lo && g > hi && b > hi) return 'cyan';
    if (r > hi && g < lo && b > hi) return 'magenta';
    if (r >= g && r >= b) return g < lo && b < lo ? (r > hi ? 'red' : 'dark red') : 'reddish';
    if (g >= r && g >= b) return r < lo && b < lo ? (g > hi ? 'green' : 'dark green') : 'greenish';
    return r < lo && g < lo ? (b > hi ? 'blue' : 'dark blue') : 'bluish';
  }
  var numText = function (c) { return spec.grey ? String(c[0]) : c.join(', '); };

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'pxwrap';
    var grid = document.createElement('div'); grid.className = 'pxgrid'; grid.setAttribute('role', 'grid'); grid.setAttribute('aria-label', spec.w + ' by ' + spec.h + ' pixels');
    grid.style.gridTemplateColumns = 'repeat(' + spec.w + ', 1fr)';
    grid.style.aspectRatio = spec.w + ' / ' + spec.h;
    ui.cells = [];
    px.forEach(function (c, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'pxcell';
      b.addEventListener('click', function () { px[i] = brush.slice(); last = i; B.moved = true; paintCells(); report(); });
      grid.appendChild(b); ui.cells.push(b);
    });
    wrap.appendChild(grid);
    if (spec.target0) {
      var tw = document.createElement('div'); tw.className = 'pxtarget';
      var tl = document.createElement('div'); tl.className = 'dhead'; tl.textContent = 'Copy this';
      var tg = document.createElement('div'); tg.className = 'pxgrid small'; tg.style.gridTemplateColumns = 'repeat(' + spec.w + ', 1fr)'; tg.style.aspectRatio = spec.w + ' / ' + spec.h; tg.setAttribute('role', 'img');
      tg.setAttribute('aria-label', 'Target picture');
      spec.target0.forEach(function (c) { var d = document.createElement('div'); d.className = 'pxcell'; d.style.background = css(c); tg.appendChild(d); });
      tw.append(tl, tg); wrap.appendChild(tw);
    }
    el.appendChild(wrap); paintCells();
  }
  function paintCells() {
    ui.cells.forEach(function (b, i) {
      var c = px[i], col = i % spec.w + 1, row = Math.floor(i / spec.w) + 1;
      b.style.background = css(c); b.classList.toggle('lt', light(c)); b.classList.toggle('last', i === last);
      b.textContent = showNums ? (spec.grey ? c[0] : c.join('\n')) : '';
      b.setAttribute('aria-label', 'Pixel row ' + row + ' column ' + col + ': ' + name(c) + ' (' + numText(c) + '). Paint it ' + name(brush));
    });
  }

  function slider(label, k) {
    var r = document.createElement('div'); r.className = 'srow';
    var n = document.createElement('span'); n.className = 'fname'; n.textContent = label;
    var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '−'; dn.setAttribute('aria-label', label + ' one less');
    var s = document.createElement('input'); s.type = 'range'; s.min = 0; s.max = 255; s.step = 1; s.setAttribute('aria-label', label);
    var up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', label + ' one more');
    var o = document.createElement('input'); o.type = 'number'; o.min = 0; o.max = 255; o.className = 'pxnum'; o.setAttribute('aria-label', label + ' value');
    var set = function (v) { v = Math.max(0, Math.min(255, Math.round(Number(v)) || 0)); if (spec.grey) brush = [v, v, v]; else brush[k] = v; B.moved = true; syncSliders(); paintCells(); report(); };
    s.addEventListener('input', function () { set(s.value); });
    o.addEventListener('change', function () { set(o.value); });
    dn.addEventListener('click', function () { set((spec.grey ? brush[0] : brush[k]) - 1); });
    up.addEventListener('click', function () { set((spec.grey ? brush[0] : brush[k]) + 1); });
    r.append(n, dn, s, up, o); ui.sl.push([s, o, k]); return r;
  }
  function syncSliders() { ui.sl.forEach(function (x) { x[0].value = brush[x[2]]; x[1].value = brush[x[2]]; }); ui.sw.style.background = css(brush); ui.sw.setAttribute('aria-label', 'Brush: ' + name(brush)); }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui.sl = [];
    var top = document.createElement('div'); top.className = 'pxbrush';
    ui.sw = document.createElement('div'); ui.sw.className = 'pxswatch'; ui.sw.setAttribute('role', 'img');
    var sl = document.createElement('div'); sl.className = 'pxsliders';
    if (spec.sliders) {
      if (spec.grey) sl.appendChild(slider('Grey', 0));
      else { sl.appendChild(slider('Red', 0)); sl.appendChild(slider('Green', 1)); sl.appendChild(slider('Blue', 2)); }
    }
    top.append(ui.sw, sl); panel.appendChild(top);
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    ui.nb = document.createElement('button'); ui.nb.type = 'button'; ui.nb.textContent = 'Show numbers';
    ui.nb.addEventListener('click', function () { showNums = !showNums; paintCells(); report(); });
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.append(ui.nb, again); panel.appendChild(bar);
    syncSliders();
  }

  function report() {
    ui.nb.setAttribute('aria-pressed', String(showNums));
    var per = spec.grey ? 1 : 3, n = spec.w * spec.h * per;
    var match = spec.target0 ? px.every(function (c, i) { return c.join(',') === spec.target0[i].join(','); }) : false;
    var changed = px.filter(function (c) { return c.join(',') !== spec.base; }).length;
    var lp = last === null ? null : px[last];
    ui.work.textContent = 'Brush ' + numText(brush) + ' → ' + name(brush) + (lp ? '   ·   last pixel ' + numText(lp) : '');
    ui.note.textContent = spec.w + ' × ' + spec.h + ' pixels × ' + per + (per === 1 ? ' number' : ' numbers') + ' = ' + n + ' numbers' + (spec.target0 ? (match ? '. It matches!' : '') : '');
    B.say('Brush ' + name(brush) + ' (' + numText(brush) + ')' + (match ? '. The picture matches.' : ''));
    B.save({ px: px, brush: brush, last: last });
    var vars = { r: brush[0], g: brush[1], b: brush[2], m: match ? 1 : 0, n: n, c: changed, p: lp ? lp[0] : -1, q: lp ? lp[1] : -1, s: lp ? lp[2] : -1 };
    B.post({ scope: { vars: vars, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('pixels', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A grid of pixels, each stored as numbers'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      px = sv && Array.isArray(sv.px) && sv.px.length === spec.w * spec.h ? sv.px.map(function (c) { return c.slice(); }) : spec.start0.map(function (c) { return c.slice(); });
      brush = sv && Array.isArray(sv.brush) ? sv.brush.slice() : spec.brush0.slice();
      last = sv && typeof sv.last === 'number' && sv.last < px.length ? sv.last : null;
      showNums = spec.nums;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
