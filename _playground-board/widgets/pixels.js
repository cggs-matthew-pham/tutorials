// A small bitmap: a grid of pixels, each stored as numbers. Set a colour with the red, green and blue sliders (0 to
// 255, light, not paint), then click pixels to paint them. The panel counts how many numbers the image needs.
//   widget: pixels
//   size: 4, 4             columns, rows (1 to 12 each)
//   mode: rgb              rgb (three numbers a pixel) | grey (one number a pixel, 0 black to 255 white)
//                          | bw (black or white, one number a pixel; the brush is two buttons)
//   colour: 255, 0, 0      the starting brush (r, g, b; one number in grey mode)
//   start: white           every pixel's starting colour: white | black, or rows of letters (see key) such as
//                          start: wwww / wrrw / wrrw / wwww   (rows split by /)
//   target: …              rows of letters for a picture to copy, drawn small beside the grid (checks: m = 1)
//   show: codes            show the target only as its run-length codes (draw the picture from the codes)
//   key: w=255,255,255 k=0,0,0 r=255,0,0 g=0,255,0 b=0,0,255 y=255,255,0, and digits 0 to 9 for greys from black (0)
//                          to white (9); add more as letter=r,g,b or letter=grey
//   numbers: on            show each pixel's numbers in its square (a button switches them otherwise)
//   sliders: off           no sliders: the brush stays at colour: (a paint-only task)
//   rle: on                run-length codes beside each row. In bw mode (CS Unplugged's form) each row is the lengths
//                          of its runs, starting with white (0 first if the row starts black). Otherwise each run is a
//                          pair, count × value (count × r,g,b in rgb mode), so 2 numbers a run (4 in rgb).
//   lossy: on              grey mode only: no painting. The start picture is compressed with a Tolerance slider: a pixel
//                          joins the run before it if it is within the tolerance of the run's value. The grid shows
//                          what comes back; the original is drawn small beside it.
// state: { scope: { vars: { r, g, b (the brush), p, q, s (the last pixel painted or clicked: red, green, blue),
//          m (1 when the grid matches the target, else 0), n (numbers the image needs as pixels), c (pixels that are
//          not the start colour), k (numbers in the run-length codes), t (tolerance), d (pixels that came back
//          different from the original) } } }
// Checks: "p = 255 and q = 255 and s = 0", "m = 1", "k < 20", "t > 0 and d = 0", "k <= 16".
(function (B) {
  'use strict';
  var spec = null, px = [], brush = [0, 0, 0], last = null, showNums = false, tol = 0, ui = {};
  var KEY0 = { w: [255, 255, 255], k: [0, 0, 0], r: [255, 0, 0], g: [0, 255, 0], b: [0, 0, 255], y: [255, 255, 0] };
  for (var dg = 0; dg <= 9; dg++) { var gv = Math.round(dg * 255 / 9); KEY0[String(dg)] = [gv, gv, gv]; }

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
    var mode = String(s.mode || 'rgb').toLowerCase();
    if (['rgb', 'grey', 'bw'].indexOf(mode) < 0) throw new Error('mode: rgb, grey or bw.');
    s.grey = mode !== 'rgb'; s.bw = mode === 'bw';
    var keyText = s.key || ''; s.key = Object.assign({}, KEY0);
    String(keyText).split(/\s+/).filter(Boolean).forEach(function (kv) {
      var m = /^([a-z0-9])=(\d+)(?:,(\d+),(\d+))?$/i.exec(kv);
      if (!m) throw new Error('key: letter=r,g,b or letter=grey, such as o=255,128,0.');
      s.key[m[1]] = m[3] === undefined ? [+m[2], +m[2], +m[2]] : [+m[2], +m[3], +m[4]];
    });
    var c = String(s.colour || (s.grey ? '0' : '0, 0, 0')).split(',').map(Number);
    s.brush0 = c.length === 1 ? [c[0], c[0], c[0]] : c;
    if (s.brush0.length !== 3 || s.brush0.some(function (v) { return !(v >= 0 && v <= 255 && v % 1 === 0); })) throw new Error('colour: three whole numbers from 0 to 255 (one in grey mode).');
    var st = String(s.start || 'white').trim();
    s.start0 = /^(white|black)$/i.test(st) ? Array.apply(null, Array(s.w * s.h)).map(function () { return /white/i.test(st) ? [255, 255, 255] : [0, 0, 0]; }) : rows(st, s.key, s.w, s.h, 'start');
    s.base = s.start0[0].join(',');
    s.target0 = s.target ? rows(s.target, s.key, s.w, s.h, 'target') : null;
    s.codesOnly = /^codes$/i.test(s.show || '');
    if (s.codesOnly && !s.target0) throw new Error('show: codes needs a target.');
    s.nums = /^on$/i.test(s.numbers || '');
    s.sliders = !/^off$/i.test(s.sliders || '');
    s.rle = /^on$/i.test(s.rle || '');
    s.lossy = /^on$/i.test(s.lossy || '');
    if (s.lossy && (!s.grey || s.bw)) throw new Error('lossy: on needs mode: grey.');
    if (s.lossy) s.rle = true;
  }

  var css = function (c) { return 'rgb(' + c.join(',') + ')'; };
  var light = function (c) { return 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] > 140; };
  var same = function (a, b) { return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]; };
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
  var numText = function (c) { return spec.bw ? (c[0] === 255 ? 'white' : 'black') : spec.grey ? String(c[0]) : c.join(', '); };

  // Run-length codes for one row of pixels: { text, count } (count = numbers stored).
  function rowCodes(row) {
    if (spec.bw) {
      var out = [], want = true, i = 0;   // runs alternate, starting with white
      while (i < row.length) {
        var n = 0;
        while (i < row.length && (row[i][0] === 255) === want) { n++; i++; }
        out.push(n); want = !want;
      }
      return { text: out.join(', '), count: out.length };
    }
    var runs = [];
    row.forEach(function (c) { var r = runs[runs.length - 1]; if (r && same(r.c, c)) r.n++; else runs.push({ c: c, n: 1 }); });
    return { text: runs.map(function (r) { return r.n + '×' + (spec.grey ? r.c[0] : r.c.join(',')); }).join('  '), count: runs.length * (spec.grey ? 2 : 4) };
  }
  function rowsOf(list) { var out = []; for (var y = 0; y < spec.h; y++) out.push(list.slice(y * spec.w, (y + 1) * spec.w)); return out; }
  // Lossy: a pixel joins the run before it while it is within the tolerance of the run's (first) value.
  function lossy(list) {
    return rowsOf(list).map(function (row) {
      var out = [], v = null;
      row.forEach(function (c) { if (v === null || Math.abs(c[0] - v) > tol) v = c[0]; out.push([v, v, v]); });
      return out;
    }).reduce(function (a, r) { return a.concat(r); }, []);
  }

  function gridOf(list, small, label) {
    var g = document.createElement('div'); g.className = 'pxgrid' + (small ? ' small' : '');
    g.style.gridTemplateColumns = 'repeat(' + spec.w + ', 1fr)'; g.style.aspectRatio = spec.w + ' / ' + spec.h;
    g.setAttribute('role', 'img'); g.setAttribute('aria-label', label);
    list.forEach(function (c) { var d = document.createElement('div'); d.className = 'pxcell'; d.style.background = css(c); g.appendChild(d); });
    return g;
  }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'pxwrap';
    var main = document.createElement('div'); main.className = 'pxmain';
    var grid = document.createElement('div'); grid.className = 'pxgrid'; grid.setAttribute('role', 'grid'); grid.setAttribute('aria-label', spec.w + ' by ' + spec.h + ' pixels');
    grid.style.gridTemplateColumns = 'repeat(' + spec.w + ', 1fr)';
    grid.style.aspectRatio = spec.w + ' / ' + spec.h;
    ui.cells = [];
    px.forEach(function (c, i) {
      var b = document.createElement(spec.lossy ? 'div' : 'button'); b.className = 'pxcell';
      if (!spec.lossy) { b.type = 'button'; b.addEventListener('click', function () { px[i] = brush.slice(); last = i; B.moved = true; paintCells(); report(); }); }
      grid.appendChild(b); ui.cells.push(b);
    });
    main.appendChild(grid);
    if (spec.rle) { ui.codes = document.createElement('div'); ui.codes.className = 'pxcodes'; ui.codes.style.gridTemplateRows = 'repeat(' + spec.h + ', 1fr)'; ui.codes.setAttribute('aria-label', 'Run-length codes, one row each'); main.appendChild(ui.codes); }
    wrap.appendChild(main);
    if (spec.lossy) {
      var ow = document.createElement('div'); ow.className = 'pxtarget';
      var ol = document.createElement('div'); ol.className = 'dhead'; ol.textContent = 'Original';
      ow.append(ol, gridOf(spec.start0, true, 'The original picture')); wrap.appendChild(ow);
    } else if (spec.target0) {
      var tw = document.createElement('div'); tw.className = 'pxtarget';
      var tl = document.createElement('div'); tl.className = 'dhead'; tl.textContent = spec.codesOnly ? 'Draw these codes' : 'Copy this';
      tw.appendChild(tl);
      if (spec.codesOnly) {
        var tc = document.createElement('div'); tc.className = 'pxcodes'; tc.setAttribute('aria-label', 'The codes to draw, one row each');
        rowsOf(spec.target0).forEach(function (r) { var d = document.createElement('div'); d.textContent = rowCodes(r).text; tc.appendChild(d); });
        tw.appendChild(tc);
      } else tw.appendChild(gridOf(spec.target0, true, 'Target picture'));
      wrap.appendChild(tw);
    }
    el.appendChild(wrap); paintCells();
  }
  function shown() { return spec.lossy ? lossy(spec.start0) : px; }
  function paintCells() {
    var list = shown();
    ui.cells.forEach(function (b, i) {
      var c = list[i], col = i % spec.w + 1, row = Math.floor(i / spec.w) + 1;
      b.style.background = css(c); b.classList.toggle('lt', light(c)); b.classList.toggle('last', i === last);
      b.textContent = showNums ? (spec.bw ? (c[0] === 255 ? '1' : '0') : spec.grey ? c[0] : c.join('\n')) : '';
      b.setAttribute('aria-label', 'Pixel row ' + row + ' column ' + col + ': ' + name(c) + ' (' + numText(c) + ')' + (spec.lossy ? '' : '. Paint it ' + name(brush)));
    });
    if (ui.codes) { ui.codes.replaceChildren(); rowsOf(list).forEach(function (r) { var d = document.createElement('div'); d.textContent = rowCodes(r).text; ui.codes.appendChild(d); }); }
  }

  function slider(label, k, max) {
    var r = document.createElement('div'); r.className = 'srow';
    var n = document.createElement('span'); n.className = 'fname'; n.textContent = label;
    var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '−'; dn.setAttribute('aria-label', label + ' one less');
    var s = document.createElement('input'); s.type = 'range'; s.min = 0; s.max = max || 255; s.step = 1; s.setAttribute('aria-label', label);
    var up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', label + ' one more');
    var o = document.createElement('input'); o.type = 'number'; o.min = 0; o.max = max || 255; o.className = 'pxnum'; o.setAttribute('aria-label', label + ' value');
    var get = function () { return k === 't' ? tol : spec.grey ? brush[0] : brush[k]; };
    var set = function (v) {
      v = Math.max(0, Math.min(max || 255, Math.round(Number(v)) || 0));
      if (k === 't') tol = v; else if (spec.grey) brush = [v, v, v]; else brush[k] = v;
      B.moved = true; syncSliders(); paintCells(); report();
    };
    s.addEventListener('input', function () { set(s.value); });
    o.addEventListener('change', function () { set(o.value); });
    dn.addEventListener('click', function () { set(get() - 1); });
    up.addEventListener('click', function () { set(get() + 1); });
    r.append(n, dn, s, up, o); ui.sl.push([s, o, get]); return r;
  }
  function syncSliders() {
    ui.sl.forEach(function (x) { x[0].value = x[2](); x[1].value = x[2](); });
    if (ui.sw) { ui.sw.style.background = css(brush); ui.sw.setAttribute('aria-label', 'Brush: ' + name(brush)); }
    if (ui.bwb) ui.bwb.forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.v) === brush[0])); });
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui.sl = []; ui.sw = null; ui.bwb = null;
    if (spec.lossy) panel.appendChild(slider('Tolerance', 't', 128));
    else if (spec.bw) {
      var bb = document.createElement('div'); bb.className = 'gbar bbar pxbw';
      var lab = document.createElement('span'); lab.className = 'dlab'; lab.textContent = 'Paint:'; bb.appendChild(lab);
      ui.bwb = [['Black', 0], ['White', 255]].map(function (x) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = x[0]; b.dataset.v = x[1];
        b.addEventListener('click', function () { brush = [x[1], x[1], x[1]]; syncSliders(); paintCells(); report(); });
        bb.appendChild(b); return b;
      });
      panel.appendChild(bb);
    } else {
      var top = document.createElement('div'); top.className = 'pxbrush';
      ui.sw = document.createElement('div'); ui.sw.className = 'pxswatch'; ui.sw.setAttribute('role', 'img');
      var sl = document.createElement('div'); sl.className = 'pxsliders';
      if (spec.sliders) {
        if (spec.grey) sl.appendChild(slider('Grey', 0));
        else { sl.appendChild(slider('Red', 0)); sl.appendChild(slider('Green', 1)); sl.appendChild(slider('Blue', 2)); }
      }
      top.append(ui.sw, sl); panel.appendChild(top);
    }
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
    var list = shown();
    var per = spec.grey ? 1 : 3, n = spec.w * spec.h * per;
    var match = spec.target0 ? px.every(function (c, i) { return same(c, spec.target0[i]); }) : false;
    var changed = px.filter(function (c) { return c.join(',') !== spec.base; }).length;
    var k = rowsOf(list).reduce(function (a, r) { return a + rowCodes(r).count; }, 0);
    var d = spec.lossy ? list.filter(function (c, i) { return !same(c, spec.start0[i]); }).length : 0;
    var lp = last === null ? null : px[last];
    if (spec.lossy) ui.work.textContent = 'Tolerance ' + tol + ': ' + k + ' numbers stored instead of ' + n + '; ' + d + (d === 1 ? ' pixel' : ' pixels') + ' came back different';
    else ui.work.textContent = (spec.bw ? 'Painting ' + numText(brush) : 'Brush ' + numText(brush) + ' → ' + name(brush)) + (lp ? '   ·   last pixel ' + numText(lp) : '');
    var size = spec.w + ' × ' + spec.h + ' pixels × ' + per + (per === 1 ? ' number' : ' numbers') + ' = ' + n + ' numbers';
    ui.note.textContent = (spec.rle && !spec.lossy ? size + '; run-length codes: ' + k + ' numbers' + (k < n ? ' (' + Math.round(k / n * 100) + '% of the size)' : k > n ? ' (bigger!)' : ' (no saving)') : spec.lossy ? 'Lossless at tolerance 0; the original is never changed' : size) + (spec.target0 && match ? '. It matches!' : '');
    B.say(ui.work.textContent + (match ? '. The picture matches.' : ''));
    B.save({ px: px, brush: brush, last: last, tol: tol });
    var vars = { r: brush[0], g: brush[1], b: brush[2], m: match ? 1 : 0, n: n, c: changed, k: k, t: tol, d: d, p: lp ? lp[0] : -1, q: lp ? lp[1] : -1, s: lp ? lp[2] : -1 };
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
      brush = sv && Array.isArray(sv.brush) ? sv.brush.slice() : spec.bw ? [0, 0, 0] : spec.brush0.slice();
      last = sv && typeof sv.last === 'number' && sv.last < px.length ? sv.last : null;
      tol = sv && typeof sv.tol === 'number' ? sv.tol : 0;
      showNums = spec.nums;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
