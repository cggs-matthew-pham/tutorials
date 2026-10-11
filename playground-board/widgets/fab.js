// CAD and fabrication (Engineering › CAD and fabrication): simple stated models of designing parts to size and making
// them on a 3D printer or laser cutter. Measurements in mm.
//   widget: fab
//   mode: box | fit | orient | slicer | param | kerf
// mode: box — a box seen from above: outside width and depth, wall thickness; something must fit inside.
//   width: 60  depth: 50  wall: 2   object: 68.6, 53.4 (an Arduino Uno; or none)   values: w, d, t, a (inside width),
//   b (inside depth), g (smallest gap on each side, negative = doesn't fit)
// mode: fit — a peg in a printed hole. FDM printers print holes about 0.2 mm smaller and pegs about 0.1 mm bigger.
//   peg: 10  hole: 10  shrink: 0.2  grow: 0.1   values: p (peg), h (hole as drawn), c (printed clearance),
//   f (0 won't go in, 1 press fit, 2 sliding fit, 3 loose)
// mode: orient — an L-bracket that will hold a shelf, printed four ways round; overhangs over 45° need supports and
//   layer lines across the load are weak.   values: o (0–3), s (1 = needs supports), k (1 = layers along the load)
// mode: slicer — a 40 × 40 × 20 mm block: layer height, infill, walls.   layer: 0.2  infill: 20  walls: 2
//   values: l, i, w, t (print minutes), g (grams), s (strength 0–100), q (finish: 1 fine, 2 normal, 3 rough)
// mode: param — a box whose outside is worked out from the part it holds: outside = part + 2 × (clearance + wall).
//   part: 68.6  clearance: 1  wall: 2   values: u (part), c (clearance), t (wall), o (outside), n (inside)
// mode: kerf — a laser-cut slot for a board: the beam removes the kerf, so the cut slot is the drawn width + kerf.
//   board: 3  slot: 3  kerf: 0.2   values: d (slot as drawn), k (kerf), c (cut slot − board), f (as for fit)
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var num = function (s, k, d) { return s[k] === undefined ? d : Number(s[k]); };

  function parse(s) {
    s.mode = (s.mode || 'box').toLowerCase();
    if (['box', 'fit', 'orient', 'slicer', 'param', 'kerf'].indexOf(s.mode) < 0) throw new Error('mode: box, fit, orient, slicer, param or kerf.');
    var obj = String(s.object || '68.6, 53.4');
    s.obj = /^none$/i.test(obj) ? null : obj.split(',').map(Number);
    s.d0 = { w: num(s, 'width', 60), d: num(s, 'depth', 50), t: num(s, 'wall', 2), p: num(s, 'peg', 10), h: num(s, 'hole', 10),
      shrink: num(s, 'shrink', 0.2), grow: num(s, 'grow', 0.1), o: num(s, 'orientation', 0), l: num(s, 'layer', 0.2), i: num(s, 'infill', 20),
      walls: num(s, 'walls', 2), u: num(s, 'part', 68.6), c: num(s, 'clearance', 1), board: num(s, 'board', 3), slot: num(s, 'slot', 3), kerf: num(s, 'kerf', 0.2) };
  }
  function fitClass(c) { return c < 0 ? 0 : c < 0.15 ? 1 : c <= 0.4 ? 2 : 3; }
  var FIT = ['won\'t go in', 'press fit (tight)', 'sliding fit', 'loose (wobbles)'];
  var ORIENT = [
    { name: 'Foot down, arm up', s: 0, k: 0, why: 'No overhangs, but the layers run across the arm: the shelf load can snap it along a layer line.' },
    { name: 'On its side, flat', s: 0, k: 1, why: 'No overhangs, and every layer runs along both arms: the strongest way.' },
    { name: 'Upside down', s: 1, k: 0, why: 'The foot sticks out over nothing: it needs supports, and the layers still run across the arm.' },
    { name: 'Corner up', s: 0, k: 0, why: 'The arms lean at 45°, so no supports, but the layers still run across the load.' },
  ];
  function slicer() {
    var V = 32, shell = Math.min(1, st.walls * 0.08 + 0.12), mat = V * (shell + (st.i / 100) * (1 - shell));
    var g = mat * 1.24, t = mat * 6 * (0.2 / st.l);
    return { g: Math.round(g), t: Math.round(t), s: Math.min(100, Math.round(st.walls * 22 + st.i * 0.35)), q: st.l <= 0.12 ? 1 : st.l <= 0.2 ? 2 : 3 };
  }

  // ---------- drawing ----------
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function txt(p, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, class: cls || 'ckval', 'text-anchor': anchor || 'middle' }, p); e.textContent = t; return e; }
  function newSvg(label) { var host = B.el('board'); host.replaceChildren(); return el('svg', { viewBox: '0 0 640 300', class: 'cksvg fbsvg', role: 'img', 'aria-label': label }, host); }
  function dim(svg, x1, y1, x2, y2, label, off) {
    off = off || 0;
    el('path', { d: 'M' + x1 + ',' + (y1 + off) + ' L' + x2 + ',' + (y2 + off) + ' M' + x1 + ',' + (y1 + off - 5) + ' L' + x1 + ',' + (y1 + off + 5) + ' M' + x2 + ',' + (y2 + off - 5) + ' L' + x2 + ',' + (y2 + off + 5), class: 'fbdim' }, svg);
    txt(svg, (x1 + x2) / 2, (y1 + y2) / 2 + off - 6, label, 'fbdimt');
  }

  function draw() {
    var svg, S = 3;
    if (spec.mode === 'box' || spec.mode === 'param') {
      var box = spec.mode === 'box', T = st.t;
      var W = box ? st.w : st.u + 2 * (st.c + st.t), D = box ? st.d : 40 + 2 * (st.c + st.t);
      var obj = box ? spec.obj : [st.u, 40];
      S = Math.min(4, 520 / Math.max(W, 1), 200 / Math.max(D, 1));
      var x0 = 320 - W * S / 2, y0 = 150 - D * S / 2;
      svg = newSvg('A box from above, ' + B.fmt(W) + ' mm wide outside');
      el('rect', { x: x0, y: y0, width: W * S, height: D * S, class: 'fbwall' }, svg);
      el('rect', { x: x0 + T * S, y: y0 + T * S, width: Math.max(0, (W - 2 * T) * S), height: Math.max(0, (D - 2 * T) * S), class: 'fbin' }, svg);
      if (obj) {
        var ow = obj[0] * S, od = obj[1] * S, tooBig = obj[0] > W - 2 * T || obj[1] > D - 2 * T;
        el('rect', { x: 320 - ow / 2, y: 150 - od / 2, width: ow, height: od, rx: 3, class: 'fbobj' + (tooBig ? ' bad' : '') }, svg);
        txt(svg, 320, 154, box ? 'Uno ' + obj[0] + ' × ' + obj[1] : 'part ' + B.fmt(st.u) + ' wide', 'fbobjt');
      }
      dim(svg, x0, y0 - 18, x0 + W * S, y0 - 18, 'outside ' + B.fmt(W));
      dim(svg, x0 + T * S, y0 + D * S + 30, x0 + (W - T) * S, y0 + D * S + 30, 'inside ' + B.fmt(r2(W - 2 * T)));
    } else if (spec.mode === 'fit' || spec.mode === 'kerf') {
      var fitM = spec.mode === 'fit', hole = fitM ? st.h - st.shrink : st.slot + st.kerf, peg = fitM ? st.p + st.grow : st.board, c = r2(hole - peg);
      svg = newSvg(fitM ? 'A peg and a printed hole, side by side' : 'A board in a laser-cut slot');
      S = 14; var cx = 230;
      // the hole (or slot) as a gap in a block, the peg (or board) above it
      el('rect', { x: cx - 120, y: 150, width: 240, height: 100, class: 'fbwall' }, svg);
      el('rect', { x: cx - hole * S / 2, y: 150, width: hole * S, height: 100, class: 'fbgap' }, svg);
      var drop = c >= 0 ? 60 : 0;
      el('rect', { x: cx - peg * S / 2, y: 40 + drop, width: peg * S, height: 110, rx: 3, class: 'fbobj' + (c < 0 ? ' bad' : '') }, svg);
      txt(svg, cx, 30 + drop, fitM ? 'peg' : 'board', 'ckval');
      var right = 440;
      txt(svg, right, 70, fitM ? 'hole drawn ' + B.fmt(st.h) + ' → printed ' + B.fmt(r2(hole)) : 'slot drawn ' + B.fmt(st.slot) + ' → cut ' + B.fmt(r2(hole)), 'ckval', 'start');
      txt(svg, right, 95, fitM ? 'peg drawn ' + B.fmt(st.p) + ' → printed ' + B.fmt(r2(peg)) : 'board ' + B.fmt(st.board) + ' (kerf ' + B.fmt(st.kerf) + ')', 'ckval', 'start');
      txt(svg, right, 130, 'clearance ' + B.fmt(c) + ' mm', 'ckamp', 'start');
      txt(svg, right, 155, FIT[fitClass(c)], fitClass(c) === 0 || fitClass(c) === 3 ? 'ckcut' : 'ckval', 'start');
    } else if (spec.mode === 'orient') {
      var O = ORIENT[st.o]; svg = newSvg('An L-bracket printed ' + O.name);
      el('rect', { x: 120, y: 250, width: 400, height: 12, class: 'fbbed' }, svg); txt(svg, 320, 285, 'print bed', 'ckval');
      var g = el('g', {}, svg), P;
      // L shapes drawn for each orientation (arm 120 long, foot 80, thickness 20)
      if (st.o === 0) P = 'M260,130 L280,130 L280,230 L340,230 L340,250 L260,250 Z';
      else if (st.o === 1) P = 'M230,230 L410,230 L410,250 L230,250 Z';
      else if (st.o === 2) P = 'M280,130 L340,130 L340,150 L300,150 L300,250 L280,250 Z';
      else P = 'M320,150 L390,235 L376,250 L320,182 L264,250 L250,235 Z';
      el('path', { d: P, class: 'fbobj' }, g);
      // layer lines
      for (var y = 134; y < 250; y += 8) el('line', { x1: 200, y1: y, x2: 440, y2: y, class: 'fblayer' }, g);
      if (O.s) { el('path', { d: 'M300,150 L340,150 L340,250 L300,250', class: 'fbsupport' }, svg); txt(svg, 380, 200, 'supports', 'ckcut', 'start'); }
      if (st.o === 1) txt(svg, 320, 222, 'the bracket lies flat; the L is seen from above', 'ckval');
      txt(svg, 320, 40, O.name, 'ckamp');
    } else if (spec.mode === 'slicer') {
      var m = slicer(); svg = newSvg('A block being sliced');
      var bx = 120, by = 60, bw = 160, bh = 160;
      el('rect', { x: bx, y: by, width: bw, height: bh, class: 'fbwall' }, svg);
      var wt = st.walls * 6; el('rect', { x: bx + wt, y: by + wt, width: bw - 2 * wt, height: bh - 2 * wt, class: 'fbin' }, svg);
      var step = Math.max(8, 60 - st.i * 0.5);
      var cp = el('clipPath', { id: 'fbclip' }, el('defs', {}, svg)); el('rect', { x: bx + wt, y: by + wt, width: bw - 2 * wt, height: bh - 2 * wt }, cp);
      var ig = el('g', { 'clip-path': 'url(#fbclip)' }, svg);
      if (st.i > 0) for (var k = -bh; k < bw; k += step) el('line', { x1: bx + wt + k, y1: by + wt, x2: bx + wt + k + (bh - 2 * wt), y2: by + bh - wt, class: 'fbinfill' }, ig);
      txt(svg, bx + bw / 2, by + bh + 26, 'top view of one layer', 'ckval');
      var rows = [['Print time', m.t + ' min'], ['Material', m.g + ' g'], ['Strength', m.s + ' / 100'], ['Finish', ['', 'fine', 'normal', 'rough'][m.q]]];
      rows.forEach(function (r, i) { txt(svg, 340, 90 + i * 40, r[0], 'ckval', 'start'); txt(svg, 460, 90 + i * 40, r[1], 'ckamp', 'start'); });
    }
  }

  // ---------- panel ----------
  function slider(label, min, max, stepv, key, fn) {
    var w = document.createElement('label'); w.className = 'ckslide'; w.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'range'; i.min = min; i.max = max; i.step = stepv; i.value = st[key]; i.setAttribute('aria-label', label);
    var out = document.createElement('output'); out.textContent = B.fmt(st[key]);
    i.addEventListener('input', function () { st[key] = Number(i.value); out.textContent = B.fmt(st[key]); B.moved = true; if (fn) fn(); draw(); report(); });
    w.append(i, out); return w;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    if (spec.mode === 'box') { row.append(slider('Outside width (mm)', 20, 100, 0.5, 'w'), slider('Outside depth (mm)', 20, 100, 0.5, 'd'), slider('Wall (mm)', 0.5, 5, 0.5, 't')); }
    if (spec.mode === 'fit') { row.append(slider('Peg drawn (mm)', 5, 12, 0.05, 'p'), slider('Hole drawn (mm)', 5, 12, 0.05, 'h')); }
    if (spec.mode === 'kerf') { row.append(slider('Slot drawn (mm)', Math.max(0.5, st.board - 1), st.board + 1, 0.05, 'slot')); }
    if (spec.mode === 'slicer') { row.append(slider('Layer height (mm)', 0.08, 0.32, 0.02, 'l'), slider('Infill (%)', 0, 100, 5, 'i'), slider('Walls', 1, 5, 1, 'walls')); }
    if (spec.mode === 'param') { row.append(slider('Part width (mm)', 30, 90, 0.1, 'u'), slider('Clearance (mm)', 0, 3, 0.25, 'c'), slider('Wall (mm)', 1, 4, 0.5, 't')); }
    if (spec.mode === 'orient') {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Turn it round'; b.setAttribute('aria-label', 'Try the next way round');
      b.addEventListener('click', function () { st.o = (st.o + 1) % 4; B.moved = true; draw(); report(); }); row.appendChild(b);
    }
    var again = document.createElement('button'); again.type = 'button'; again.className = 'quiet'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); row.appendChild(again);
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'ardstatus'; ui.note.id = 'gnote'; panel.appendChild(ui.note);
  }

  function report() {
    var vars, facts, note = '';
    if (spec.mode === 'box') {
      var a = r2(st.w - 2 * st.t), b = r2(st.d - 2 * st.t), g = spec.obj ? r2(Math.min(a - spec.obj[0], b - spec.obj[1]) / 2) : 0;
      vars = { w: st.w, d: st.d, t: st.t, a: a, b: b, g: g };
      facts = 'Outside ' + B.fmt(st.w) + ' × ' + B.fmt(st.d) + ' · wall ' + B.fmt(st.t) + ' · inside ' + B.fmt(a) + ' × ' + B.fmt(b) + (spec.obj ? ' · gap each side ' + B.fmt(g) : '');
      note = spec.obj ? (g < 0 ? 'The Uno doesn\'t fit inside.' : 'The Uno fits, with ' + B.fmt(g) + ' mm to spare on the tightest side.') : '';
    } else if (spec.mode === 'fit' || spec.mode === 'kerf') {
      var fitM = spec.mode === 'fit', c = fitM ? r2((st.h - st.shrink) - (st.p + st.grow)) : r2(st.slot + st.kerf - st.board), f = fitClass(c);
      vars = fitM ? { p: st.p, h: st.h, c: c, f: f } : { d: st.slot, k: st.kerf, c: c, f: f };
      facts = (fitM ? 'Peg ' + B.fmt(st.p) + ', hole ' + B.fmt(st.h) : 'Slot ' + B.fmt(st.slot) + ', board ' + B.fmt(st.board)) + ' · clearance ' + B.fmt(c) + ' mm · ' + FIT[f];
    } else if (spec.mode === 'orient') {
      var O = ORIENT[st.o]; vars = { o: st.o, s: O.s, k: O.k };
      facts = O.name + ' · ' + (O.s ? 'needs supports' : 'no supports') + ' · ' + (O.k ? 'layers along the load' : 'layers across the load'); note = O.why;
    } else if (spec.mode === 'slicer') {
      var m = slicer(); vars = { l: st.l, i: st.i, w: st.walls, t: m.t, g: m.g, s: m.s, q: m.q };
      facts = 'Layers ' + B.fmt(st.l) + ' mm · infill ' + st.i + '% · ' + st.walls + ' walls · ' + m.t + ' min · ' + m.g + ' g · strength ' + m.s;
    } else {
      var o = r2(st.u + 2 * (st.c + st.t)), n = r2(st.u + 2 * st.c);
      vars = { u: st.u, c: st.c, t: st.t, o: o, n: n };
      facts = 'outside = part + 2 × (clearance + wall) = ' + B.fmt(st.u) + ' + 2 × (' + B.fmt(st.c) + ' + ' + B.fmt(st.t) + ') = ' + B.fmt(o) + ' mm';
    }
    ui.facts.textContent = facts; ui.note.textContent = note;
    B.say(facts);
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, facts);
  }

  B.widget('fab', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Designing a part to size'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec; var d = spec.d0;
      st = { w: d.w, d: d.d, t: d.t, p: d.p, h: d.h, shrink: d.shrink, grow: d.grow, o: d.o, l: d.l, i: d.i, walls: d.walls, u: d.u, c: d.c, board: d.board, slot: d.slot, kerf: d.kerf };
      var sv = fresh ? null : B.saved();
      if (sv && sv.st) Object.keys(st).forEach(function (k) { if (typeof sv.st[k] === 'number') st[k] = sv.st[k]; });
      paintPanel(); draw(); report();
    },
  });
})(WPB);
