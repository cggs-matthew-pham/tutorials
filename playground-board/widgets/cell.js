// Cells, tissues and the genetic zoom: labelled diagrams whose parts students click to find out what each one is,
// what it does and where it is found. Diagrams are simplified models, not micrographs.
//   widget: cell
//   show: animal, plant           cells side by side (animal, plant, bacterium, yeast, redblood, nerve, muscle,
//                                 roothair, sperm, egg, pollen), or one tissue diagram (leaf, heart), or zoom
//   find: nucleus, membrane       the parts to find, in every shown cell that has them (default: every part)
//   zoom                          (show: zoom) the body → cell → nucleus → chromosome → DNA → gene, one level at a time
// state: { scope: { vars: { n: parts found, k: parts to find, l: deepest zoom level reached (0 to 5) } } }
(function (B) {
  'use strict';
  var spec = null, st = null, objs = null;
  // ---------- shapes (in a 10 × 8 box per cell) ----------
  var TAU = Math.PI * 2;
  function blob(cx, cy, rx, ry, wob, n, seed) {
    var pts = []; n = n || 40; seed = seed || 1;
    for (var i = 0; i < n; i++) { var a = i * TAU / n, w = 1 + (wob || 0) * Math.sin(a * 3 + seed) * Math.cos(a * 2 + seed * 0.7); pts.push([cx + rx * w * Math.cos(a), cy + ry * w * Math.sin(a)]); }
    return pts;
  }
  function rrect(x0, y0, x1, y1, r) {
    var pts = [], c = [[x1 - r, y1 - r, 0], [x0 + r, y1 - r, 1], [x0 + r, y0 + r, 2], [x1 - r, y0 + r, 3]];
    c.forEach(function (k) { for (var i = 0; i <= 6; i++) { var a = (k[2] + i / 6) * Math.PI / 2; pts.push([k[0] + r * Math.cos(a), k[1] + r * Math.sin(a)]); } });
    return pts;
  }
  function capsule(x0, y0, x1, y1, r) { return rrect(x0, y0, x1, y1, r); }
  function line(pts, w) { return { line: pts, w: w || 3 }; }
  var C = { mem: '#c96f6f', cyto: '#f6ead8', nuc: '#8e6bbf', nucl: '#6a4a99', mito: '#e39b4c', wall: '#7a9a4a', chl: '#4f9a3c', vac: '#cfe3f2', dna: '#2f6fb3', blood: '#d85b5b', yolk: '#efd38a' };
  // A part: { id, name, does, where, shape: [[x, y]...] (filled) or line: [[x, y]...], fill, stroke }
  var P = function (id, name, does, where, o) { return Object.assign({ id: id, name: name, does: does, where: where }, o); };
  var MEM = function (pts) { return P('membrane', 'Cell membrane', 'A thin, flexible barrier that controls what enters and leaves the cell.', 'Every cell', { shape: pts, fill: 'none', stroke: C.mem, w: 4, ring: true }); };
  var CYT = function (pts) { return P('cytoplasm', 'Cytoplasm', 'Jelly-like fluid where most of the cell’s chemical reactions happen.', 'Every cell', { shape: pts, fill: C.cyto, stroke: 'none' }); };
  var NUC = function (cx, cy, r) { return P('nucleus', 'Nucleus', 'The control centre: it holds the DNA, the instructions for the cell.', 'Plant, animal and fungus cells (not bacteria)', { shape: blob(cx, cy, r, r * 0.9, 0.04, 30, 2), fill: C.nuc, stroke: C.nucl, w: 2 }); };
  var MITO = function (list) { return P('mitochondria', 'Mitochondria', 'Release energy from food (respiration) for the cell to use.', 'Plant, animal and fungus cells', { shapes: list.map(function (m) { return capsule(m[0], m[1], m[0] + 1.1, m[1] + 0.45, 0.22); }), fill: C.mito, stroke: '#b5702c', w: 1.5 }); };
  var WALL = function (pts) { return P('wall', 'Cell wall', 'A rigid layer outside the membrane that supports the cell and keeps its shape.', 'Plant, fungus and bacteria cells (not animal cells)', { shape: pts, fill: 'none', stroke: C.wall, w: 7, ring: true }); };
  var CHL = function (list) { return P('chloroplasts', 'Chloroplasts', 'Capture light energy to make food (glucose) by photosynthesis.', 'Plant cells in green parts (not animal cells)', { shapes: list.map(function (c) { return blob(c[0], c[1], 0.55, 0.32, 0.05, 16, 3); }), fill: C.chl, stroke: '#2f6b23', w: 1.5 }); };
  var VAC = function (pts) { return P('vacuole', 'Vacuole', 'A large space filled with cell sap; it keeps the cell firm and stores water.', 'Plant cells (large and permanent)', { shape: pts, fill: C.vac, stroke: '#7aa6c4', w: 1.5 }); };
  var CELLS = {
    animal: { title: 'Animal cell (cheek)', parts: function () { var o = blob(5, 4, 4.2, 3.2, 0.08, 48, 1); return [CYT(o), MEM(o), NUC(4.3, 4.3, 1.1), MITO([[6.2, 5.2], [6.4, 2.8], [2.4, 2.8]])]; } },
    plant: { title: 'Plant cell (leaf)', parts: function () { var w = rrect(0.6, 0.4, 9.4, 7.6, 0.4), m = rrect(0.95, 0.75, 9.05, 7.25, 0.3); return [CYT(m), VAC(rrect(2.6, 1.8, 8.2, 6.2, 0.8)), WALL(w), MEM(m), NUC(1.8, 5.9, 0.7), CHL([[1.7, 3.8], [1.7, 2.3], [3.6, 1.2], [5.6, 1.2], [7.6, 1.2], [8.5, 2.9], [8.5, 4.7], [7.5, 6.8], [5.3, 6.8]]), MITO([[2.9, 6.6], [1.4, 1.3]])]; } },
    bacterium: { title: 'Bacterium (the whole organism)', parts: function () {
      var w = capsule(1.4, 2.2, 8.6, 5.8, 1.8), m = capsule(1.7, 2.5, 8.3, 5.5, 1.5), dna = [];
      for (var i = 0; i <= 40; i++) { var a = i / 40 * TAU; dna.push([5 + 2.2 * Math.cos(a) + 0.35 * Math.sin(a * 7), 4 + 0.8 * Math.sin(a) + 0.3 * Math.cos(a * 5)]); }
      return [CYT(m), WALL(w), MEM(m), P('dna', 'DNA loop (no nucleus)', 'The instructions, loose in the cytoplasm: bacteria have no nucleus.', 'Bacteria', { line: dna, w: 3, stroke: C.dna }),
        P('flagellum', 'Flagellum', 'A whip-like tail that spins to move the bacterium along.', 'Some bacteria (and sperm have a similar tail)', { line: [[8.6, 4], [9.1, 4.4], [9.5, 3.7], [9.9, 4.3]], w: 3, stroke: '#7a6a5a' })];
    } },
    yeast: { title: 'Yeast (a single-celled fungus)', parts: function () { var w = blob(4.6, 4, 3.4, 2.8, 0.03, 40, 4), m = blob(4.6, 4, 3.15, 2.55, 0.03, 40, 4); return [CYT(m), WALL(w), MEM(m), NUC(3.6, 4.4, 0.8), VAC(blob(5.6, 3.5, 1.1, 0.9, 0.05, 24, 5)), P('bud', 'Bud', 'A new yeast cell growing off the parent: yeast reproduces by budding.', 'Yeast', { shape: blob(8.6, 5.6, 0.9, 0.75, 0.03, 24, 6), fill: C.cyto, stroke: C.wall, w: 4 })]; } },
    redblood: { title: 'Red blood cell', parts: function () { var o = blob(5, 4, 3.4, 3.4, 0.0, 48, 1); return [P('haemoglobin', 'Cytoplasm full of haemoglobin', 'Haemoglobin carries oxygen: the cell is packed with it.', 'Red blood cells', { shape: o, fill: C.blood, stroke: '#a33b3b', w: 3 }), P('dimple', 'Biconcave shape, no nucleus', 'Thin in the middle, so oxygen gets in and out quickly; no nucleus leaves more room for haemoglobin; flexible to squeeze through tiny capillaries.', 'Red blood cells', { shape: blob(5, 4, 1.5, 1.5, 0, 30, 1), fill: '#ea8f8f', stroke: 'none' })]; } },
    nerve: { title: 'Nerve cell (neuron)', parts: function () {
      var body = blob(2.2, 4, 1.3, 1.1, 0.12, 30, 2), den = [[[1, 4.8], [0.3, 6.2]], [[1.2, 3.2], [0.3, 2]], [[2.2, 5.1], [2.5, 6.8]], [[2.4, 2.9], [2.6, 1.3]], [[1, 4.1], [0.1, 4.2]]];
      return [CYT(body), MEM(body), NUC(2.1, 4, 0.5),
        P('dendrites', 'Dendrites', 'Many branches that receive signals from other nerve cells.', 'Nerve cells', { lines: den, w: 3, stroke: '#9c6b9c' }),
        P('axon', 'Axon', 'A long fibre (up to a metre in your leg) that carries the electrical signal a long way.', 'Nerve cells', { line: [[3.4, 4], [8.6, 4]], w: 4, stroke: '#9c6b9c' }),
        P('myelin', 'Myelin sheath', 'Fatty insulation that makes the signal travel much faster.', 'Many nerve cells', { shapes: [3.9, 5.2, 6.5, 7.8].map(function (x) { return capsule(x, 3.65, x + 1, 4.35, 0.3); }), fill: '#f1e3a6', stroke: '#c9b06a', w: 1.5 }),
        P('terminals', 'Axon terminals', 'Pass the signal on to the next cell (another nerve, or a muscle).', 'Nerve cells', { lines: [[[8.6, 4], [9.6, 5]], [[8.6, 4], [9.8, 4]], [[8.6, 4], [9.6, 3]]], w: 3, stroke: '#9c6b9c' })];
    } },
    muscle: { title: 'Muscle cell (fibre)', parts: function () {
      var o = capsule(0.4, 2.6, 9.6, 5.4, 1.2), bands = [];
      for (var x = 1.4; x < 9; x += 0.7) bands.push([[x, 2.75], [x, 5.25]]);
      return [CYT(o), P('fibres', 'Protein fibres (stripes)', 'Slide past each other to make the cell shorten: contraction.', 'Muscle cells', { lines: bands, w: 2, stroke: '#d08a8a' }), MEM(o),
        P('nuclei', 'Many nuclei', 'A long fibre is made from many cells fused together, so it has many nuclei.', 'Skeletal muscle cells', { shapes: [[2.2, 4.6], [5, 3.4], [7.8, 4.6]].map(function (c) { return blob(c[0], c[1], 0.45, 0.28, 0, 20, 2); }), fill: C.nuc, stroke: C.nucl, w: 1.5 }),
        MITO([[3.1, 3.2], [6.2, 4.6], [3.9, 4.6], [7.4, 3.2]])];
    } },
    roothair: { title: 'Root hair cell', parts: function () {
      var w = [[0.6, 0.5], [5.2, 0.5], [5.2, 3.2], [9.6, 3.6], [9.6, 4.6], [5.2, 4.8], [5.2, 7.5], [0.6, 7.5]], m = [[0.9, 0.8], [4.9, 0.8], [4.9, 3.45], [9.3, 3.85], [9.3, 4.35], [4.9, 4.55], [4.9, 7.2], [0.9, 7.2]];
      return [CYT(m), VAC(rrect(1.4, 1.4, 3.6, 6.6, 0.5)), WALL(w), MEM(m), NUC(4.3, 5.7, 0.45),
        P('hair', 'Long hair-like extension', 'A huge surface area for absorbing water and minerals from the soil. (No chloroplasts: underground there is no light.)', 'Root hair cells', { shape: [[5.6, 3.55], [9.1, 3.9], [9.1, 4.3], [5.6, 4.5]], fill: '#ecdcc0', stroke: 'none' })];
    } },
    sperm: { title: 'Sperm cell', parts: function () {
      var head = blob(2.2, 4, 1.4, 1, 0, 30, 1), tail = [];
      for (var i = 0; i <= 30; i++) { var x = 5 + i * 0.16; tail.push([x, 4 + 0.35 * Math.sin(i / 3)]); }
      return [CYT(head), MEM(head), NUC(2.4, 4, 0.75), P('acrosome', 'Acrosome', 'A cap of enzymes that digest a way into the egg.', 'Sperm cells', { shape: blob(1.05, 4, 0.35, 0.75, 0, 20, 1), fill: '#9ec9e8', stroke: '#5f93b8', w: 1.5 }),
        P('midpiece', 'Midpiece packed with mitochondria', 'Releases the energy the tail needs to swim.', 'Sperm cells', { shape: capsule(3.6, 3.65, 5.1, 4.35, 0.3), fill: C.mito, stroke: '#b5702c', w: 1.5 }),
        P('tail', 'Tail', 'Swims the sperm towards the egg.', 'Sperm cells', { line: tail, w: 3, stroke: '#7a6a5a' })];
    } },
    egg: { title: 'Egg cell (ovum)', parts: function () { var o = blob(5, 4, 3.5, 3.5, 0, 50, 1); return [P('jelly', 'Jelly coat', 'A protective layer that changes after one sperm gets in, so no other can enter.', 'Egg cells', { shape: blob(5, 4, 3.9, 3.9, 0, 50, 1), fill: '#fbf2df', stroke: '#e3cf9e', w: 2 }), CYT(o), P('yolk', 'Food store in the cytoplasm', 'Nutrients for the early embryo: why the egg is so large.', 'Egg cells', { shapes: [[3.4, 2.7], [6.4, 2.6], [6.6, 5.4], [3.2, 5.2], [5, 2.2]].map(function (c) { return blob(c[0], c[1], 0.35, 0.3, 0, 16, 2); }), fill: C.yolk, stroke: '#c9a64a', w: 1 }), MEM(o), NUC(5, 4.2, 1)]; } },
    pollen: { title: 'Pollen grain (plant male gamete carrier)', parts: function () {
      var w = blob(5, 4, 3, 3, 0, 40, 1), spikes = [];
      for (var i = 0; i < 18; i++) { var a = i * TAU / 18; spikes.push([[5 + 3 * Math.cos(a), 4 + 3 * Math.sin(a)], [5 + 3.6 * Math.cos(a), 4 + 3.6 * Math.sin(a)]]); }
      return [CYT(blob(5, 4, 2.7, 2.7, 0, 40, 1)), P('pwall', 'Tough outer wall with spikes', 'Protects the male nucleus on its journey; the spikes catch on insects.', 'Pollen of insect-pollinated plants', { shape: w, fill: 'none', stroke: '#c9a23a', w: 6, ring: true, extra: spikes }), NUC(5, 4, 0.9)];
    } },
  };
  var TISSUES = {
    leaf: { title: 'Leaf (cross-section)', parts: function () {
      var pal = [], spongy = [];
      for (var x = 0.8; x < 19; x += 1.1) pal.push(capsule(x, 5.2, x + 0.9, 7.2, 0.3));
      [[1.2, 3.9], [3.1, 4.4], [4.9, 3.6], [7, 4.2], [12.8, 4.3], [14.8, 3.6], [16.8, 4.2], [18.4, 3.7], [2.2, 2.7], [6.1, 2.6], [13.7, 2.7], [17.3, 2.6]].forEach(function (c) { spongy.push(blob(c[0], c[1], 0.8, 0.5, 0.1, 20, c[0])); });
      return [P('cuticle', 'Waxy cuticle', 'Waterproof layer that stops the leaf drying out.', 'Leaf (top surface)', { shape: rrect(0.2, 8.1, 19.8, 8.35, 0.1), fill: '#d6e8a0', stroke: '#a3b86a', w: 1 }),
        P('upper', 'Upper epidermis', 'A clear protective layer of cells that lets light through.', 'Leaf', { shape: rrect(0.2, 7.4, 19.8, 8.1, 0.1), fill: '#eef5dd', stroke: '#a3b86a', w: 1 }),
        P('palisade', 'Palisade mesophyll', 'Tall cells packed with chloroplasts near the top, where light is strongest: most photosynthesis.', 'Leaf', { shapes: pal, fill: '#7cb860', stroke: '#4f8a3a', w: 1 }),
        P('spongy', 'Spongy mesophyll', 'Loosely packed cells with air spaces, so gases can move to every cell.', 'Leaf', { shapes: spongy, fill: '#a9d48f', stroke: '#6fa058', w: 1 }),
        P('xylem', 'Xylem (in the vein)', 'Hollow tubes that bring water from the roots.', 'Leaf veins, stems, roots', { shape: blob(10, 3.9, 0.9, 0.7, 0, 20, 1), fill: '#c8d6e8', stroke: '#6a84a8', w: 2 }),
        P('phloem', 'Phloem (in the vein)', 'Tubes that carry sugar made in the leaf to the rest of the plant.', 'Leaf veins, stems, roots', { shape: blob(10, 2.7, 0.9, 0.5, 0, 20, 1), fill: '#e8d2b4', stroke: '#a8865a', w: 2 }),
        P('lower', 'Lower epidermis', 'Protective layer on the underside, with the stomata.', 'Leaf', { shape: rrect(0.2, 0.9, 19.8, 1.6, 0.1), fill: '#eef5dd', stroke: '#a3b86a', w: 1 }),
        P('stoma', 'Stoma and guard cells', 'A pore that opens and closes to let carbon dioxide in and oxygen and water vapour out.', 'Leaf (mostly underneath)', { shapes: [blob(8.4, 1.25, 0.45, 0.35, 0, 16, 1), blob(9.4, 1.25, 0.45, 0.35, 0, 16, 1)], fill: '#5f9e4a', stroke: '#2f6b23', w: 1.5 })];
    } },
    heart: { title: 'Heart wall (section)', parts: function () {
      return [P('blood', 'Blood in the chamber', 'Not a tissue of the wall: the blood the heart pumps.', 'Inside the heart', { shape: rrect(0.4, 0.4, 19.6, 2.2, 0.3), fill: '#e7a0a0', stroke: 'none' }),
        P('lining', 'Lining (epithelial tissue)', 'A smooth inner layer so blood flows without clotting.', 'Heart and blood vessels', { shape: rrect(0.4, 2.2, 19.6, 2.7, 0.1), fill: '#f4d6d6', stroke: '#c98a8a', w: 1 }),
        P('muscle', 'Cardiac muscle tissue', 'Thick muscle that contracts strongly and never tires, to pump blood.', 'Heart only', { shape: rrect(0.4, 2.7, 19.6, 7.0, 0.1), fill: '#c95d5d', stroke: '#9c3f3f', w: 1, hatch: true }),
        P('connective', 'Connective tissue (outer layer and valves)', 'Tough, fibrous tissue that holds the heart together and forms the valves.', 'Heart and around many organs', { shape: rrect(0.4, 7.0, 19.6, 8.2, 0.1), fill: '#e9dcc3', stroke: '#b9a77f', w: 1 }),
        P('nerve', 'Nervous tissue (pacemaker)', 'Special cells that send the signal for each heartbeat.', 'Heart (right atrium)', { line: [[1.5, 6.2], [5, 5.6], [9, 6.1], [13, 5.5], [18.5, 6]], w: 3, stroke: '#f1e3a6' })];
    } },
  };
  var ZOOM = [
    { title: 'A person', text: 'About 37 trillion cells, nearly all with the same DNA.', draw: 'person' },
    { title: 'A cell', text: 'The nucleus holds the DNA.', draw: 'cell' },
    { title: 'The nucleus', text: '46 chromosomes in 23 pairs: one of each pair from each parent.', draw: 'nucleus' },
    { title: 'A chromosome', text: 'One very long molecule of DNA, coiled tightly around proteins.', draw: 'chromosome' },
    { title: 'DNA', text: 'A double helix: two strands joined by pairs of bases (A with T, C with G).', draw: 'dna' },
    { title: 'A gene', text: 'A section of DNA whose order of bases is the instructions for one protein. Proteins build your characteristics.', draw: 'gene' },
  ];

  function parse(s) {
    var list = String(s.show || 'animal, plant').split(',').map(function (t) { return t.trim().toLowerCase(); });
    s.zoom = list.length === 1 && list[0] === 'zoom';
    if (!s.zoom) list.forEach(function (t) { if (!CELLS[t] && !TISSUES[t]) throw new Error('show: "' + t + '" is not one of ' + Object.keys(CELLS).concat(Object.keys(TISSUES)).join(', ') + ', zoom.'); });
    if (list.some(function (t) { return TISSUES[t]; }) && list.length > 1) throw new Error('Show a tissue diagram (leaf, heart) on its own.');
    s.list = list;
    s.find = s.find ? s.find.split(',').map(function (t) { return t.trim().toLowerCase(); }) : null;
  }

  function targets() {
    var out = [];
    spec.list.forEach(function (t, i) { (CELLS[t] || TISSUES[t]).parts().forEach(function (p) { if (!spec.find || spec.find.indexOf(p.id) >= 0) out.push(i + ':' + p.id); }); });
    return out;
  }

  // ---------- drawing ----------
  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', accent = B.css('--accent') || '#c2570a';
    var tissue = !spec.zoom && TISSUES[spec.list[0]], n = spec.list.length;
    var W = spec.zoom ? 20 : tissue ? 20 : 10.6 * n, H = spec.zoom ? 10 : 9.6;
    var board = B.jsx({ boundingbox: [-0.3, H, W + 0.3, -0.5], keepAspectRatio: true });
    objs = { board: board, hits: [], ink: ink, accent: accent };
    if (spec.zoom) return buildZoom(board, ink, muted, accent);
    spec.list.forEach(function (t, i) {
      var def = CELLS[t] || TISSUES[t], ox = tissue ? 0 : i * 10.6, parts = def.parts();
      board.create('text', [ox + (tissue ? 10 : 5), H - 0.6, def.title], { anchorX: 'middle', fontSize: 14, strokeColor: ink, fixed: true, display: 'internal', cssStyle: 'font-weight:600' });
      parts.forEach(function (p) {
        var key = i + ':' + p.id, found = st.found[key], hl = st.sel === key;
        var sw = (p.w || 2) + (hl ? 2 : 0), stroke = hl ? accent : (p.stroke === 'none' ? 'none' : p.stroke);
        var mv = function (pts) { return pts.map(function (q) { return [q[0] + ox, q[1]]; }); };
        var poly = function (pts, fill) { var xs = pts.map(function (q) { return q[0] + ox; }), ys = pts.map(function (q) { return q[1]; }); xs.push(xs[0]); ys.push(ys[0]); return board.create('curve', [xs, ys], { strokeColor: stroke === 'none' ? 'transparent' : stroke, strokeWidth: sw, fillColor: fill === 'none' ? 'transparent' : fill, fillOpacity: fill === 'none' ? 0 : 1, fixed: true, highlight: false }); };
        var lin = function (pts) { return board.create('curve', [pts.map(function (q) { return q[0] + ox; }), pts.map(function (q) { return q[1]; })], { strokeColor: hl ? accent : p.stroke, strokeWidth: sw, fixed: true, highlight: false }); };
        if (p.shape) poly(p.shape, p.fill); if (p.shapes) p.shapes.forEach(function (s) { poly(s, p.fill); });
        if (p.line) lin(p.line); if (p.lines) p.lines.forEach(lin); if (p.extra) p.extra.forEach(lin);
        if (p.hatch) for (var x = 1; x < 18.8; x += 0.8) board.create('segment', [[x + ox, 2.9], [x + ox + 0.5, 6.8]], { strokeColor: '#9c3f3f', strokeWidth: 1, fixed: true, highlight: false });
        objs.hits.push({ key: key, p: p, ox: ox });
        if (found) {
          var c = centre(p, ox);
          board.create('text', [c[0], c[1], '✓'], { anchorX: 'middle', anchorY: 'middle', fontSize: 13, strokeColor: '#1a7f37', fixed: true, display: 'internal', cssStyle: 'font-weight:700;pointer-events:none' });
        }
      });
    });
    board.on('down', function (e) { var c = board.getUsrCoordsOfMouse(e); hit(c[0], c[1]); });
    board.update();
  }
  function centre(p, ox) {
    var pts = p.shape || (p.shapes && p.shapes[0]) || p.line || (p.lines && p.lines[0]);
    if (p.ring) { var top = pts.reduce(function (a, q) { return q[1] > a[1] ? q : a; }); return [top[0] + ox, top[1]]; }
    var sx = 0, sy = 0; pts.forEach(function (q) { sx += q[0]; sy += q[1]; }); return [sx / pts.length + ox, sy / pts.length];
  }
  // Which part is under the pointer: lines and rings by distance, filled shapes by containment, smallest first.
  function inside(pts, x, y) { var c = false; for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) { var a = pts[i], b = pts[j]; if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function segDist(px, py, a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(px - a[0] - t * dx, py - a[1] - t * dy); }
  function polyDist(pts, x, y, closed) { var d = 1e9; for (var i = 0; i < pts.length - 1 + (closed ? 1 : 0); i++) d = Math.min(d, segDist(x, y, pts[i], pts[(i + 1) % pts.length])); return d; }
  function area(pts) { var a = 0; for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) a += (pts[j][0] + pts[i][0]) * (pts[j][1] - pts[i][1]); return Math.abs(a / 2); }
  function hit(x, y) {
    var best = null, bestScore = 1e9;
    objs.hits.forEach(function (h) {
      var p = h.p, lx = x - h.ox, score = null;
      var lines = (p.line ? [p.line] : []).concat(p.lines || []).concat(p.extra || []);
      lines.forEach(function (l) { var dl = polyDist(l, lx, y, false); if (dl < 0.3) { var sc = 0.0001 + dl * 0.001; if (score === null || sc < score) score = sc; } });
      // Rings (membrane, wall): a generous band either side of the line, the nearest ring winning where two are close.
      if (p.ring && p.shape) { var dd = polyDist(p.shape, lx, y, true); if (dd < 0.35) { var sr = 0.0001 + dd * 0.001; if (score === null || sr < score) score = sr; } }
      (p.shape && !p.ring ? [p.shape] : []).concat(p.shapes || []).forEach(function (s) { if (inside(s, lx, y)) { var a = area(s); if (score === null || a < score) score = a; } });
      if (score !== null && score < bestScore) { bestScore = score; best = h; }
    });
    if (!best) return;
    B.moved = true; st.sel = best.key; st.found[best.key] = true;
    build(); paint(); report();
  }

  // ---------- zoom ----------
  function buildZoom(board, ink, muted, accent) {
    var lv = ZOOM[st.level], cx = 10, cy = 5;
    board.create('text', [10, 9.4, (st.level + 1) + ' of 6 · ' + lv.title], { anchorX: 'middle', fontSize: 15, strokeColor: ink, fixed: true, display: 'internal', cssStyle: 'font-weight:600' });
    var c = function (pts, fill, stroke, w) { return board.create('curve', [pts.map(function (q) { return q[0]; }).concat([pts[0][0]]), pts.map(function (q) { return q[1]; }).concat([pts[0][1]])], { fillColor: fill, fillOpacity: fill ? 1 : 0, strokeColor: stroke, strokeWidth: w || 2, fixed: true, highlight: false }); };
    var l = function (pts, stroke, w) { return board.create('curve', [pts.map(function (q) { return q[0]; }), pts.map(function (q) { return q[1]; })], { strokeColor: stroke, strokeWidth: w || 2, fixed: true, highlight: false }); };
    var ring = function (x, y, r) { return board.create('circle', [[x, y], r], { strokeColor: accent, strokeWidth: 3, dash: 2, fillOpacity: 0, fixed: true, highlight: false, center: { visible: false } }); };
    if (lv.draw === 'person') {
      c(blob(cx, 7.4, 0.9, 0.9, 0, 30), '#e8c4a0', '#b88a64'); c([[cx - 1.2, 6.3], [cx + 1.2, 6.3], [cx + 1, 3.2], [cx - 1, 3.2]], '#7aa6c4', '#4f7a98');
      l([[cx - 0.6, 3.2], [cx - 0.8, 0.6]], '#4f7a98', 6); l([[cx + 0.6, 3.2], [cx + 0.8, 0.6]], '#4f7a98', 6); l([[cx - 1.2, 6], [cx - 2.4, 3.8]], '#e8c4a0', 6); l([[cx + 1.2, 6], [cx + 2.4, 3.8]], '#e8c4a0', 6);
      ring(cx + 2.4, 3.8, 0.5);
    } else if (lv.draw === 'cell') {
      var o = blob(cx, cy, 6, 3.8, 0.06, 48, 1); c(o, C.cyto, C.mem, 4); c(blob(cx - 0.5, cy + 0.2, 1.6, 1.4, 0.03, 30, 2), C.nuc, C.nucl); ring(cx - 0.5, cy + 0.2, 1.9);
    } else if (lv.draw === 'nucleus') {
      c(blob(cx, cy, 6.5, 4, 0, 50, 1), '#e9e0f4', C.nucl, 3);
      var cols = ['#d86a6a', '#5f8fd0'];
      for (var i = 0; i < 12; i++) { var x = cx - 5 + (i % 6) * 1.9, y = cy + (i < 6 ? 1.3 : -1.6), col = cols[i % 2]; l([[x - 0.25, y + 0.9], [x + 0.25, y - 0.9]], col, 5); l([[x + 0.25, y + 0.9], [x - 0.25, y - 0.9]], col, 5); }
      ring(cx - 5, cy + 1.3, 1.1);
      board.create('text', [cx, 0.5, 'Red and blue: one chromosome of each pair from each parent (only some drawn)'], { anchorX: 'middle', fontSize: 11, strokeColor: muted, fixed: true, display: 'internal' });
    } else if (lv.draw === 'chromosome') {
      l([[cx - 1, cy + 3.5], [cx + 1, cy - 3.5]], '#d86a6a', 18); l([[cx + 1, cy + 3.5], [cx - 1, cy - 3.5]], '#d86a6a', 18);
      var coil = []; for (var k = 0; k <= 80; k++) coil.push([cx + 3.5 + 0.6 * Math.sin(k / 3), cy + 3.5 - k * 0.09]); l(coil, C.dna, 2);
      l([[cx + 0.9, cy + 2.6], [cx + 2.9, cy + 2.6]], muted, 1); ring(cx + 3.5, cy, 0.9);
      board.create('text', [cx + 4.4, cy + 3.2, 'unwound, it is DNA'], { anchorX: 'left', fontSize: 12, strokeColor: muted, fixed: true, display: 'internal' });
    } else if (lv.draw === 'dna' || lv.draw === 'gene') {
      var a = [], b = [], x0 = 1.5, x1 = 18.5;
      for (var t = 0; t <= 200; t++) { var x = x0 + (x1 - x0) * t / 200; a.push([x, cy + 1.6 * Math.sin(t / 12)]); b.push([x, cy - 1.6 * Math.sin(t / 12)]); }
      var bases = ['A', 'T', 'C', 'G'], pair = { A: 'T', T: 'A', C: 'G', G: 'C' };
      for (var r = 4; r <= 196; r += 8) { var xx = x0 + (x1 - x0) * r / 200, y1 = cy + 1.6 * Math.sin(r / 12), y2 = cy - 1.6 * Math.sin(r / 12), bb = bases[(r * 7) % 4], gene = lv.draw === 'gene' && r > 60 && r < 140;
        l([[xx, y1], [xx, y2]], gene ? accent : '#9aa5b4', gene ? 3 : 2);
        if (Math.abs(y1 - y2) > 1.2) { board.create('text', [xx, y1 + (y1 > y2 ? 0.35 : -0.35), bb], { anchorX: 'middle', anchorY: 'middle', fontSize: 10, strokeColor: ink, fixed: true, display: 'internal' }); board.create('text', [xx, y2 + (y2 > y1 ? 0.35 : -0.35), pair[bb]], { anchorX: 'middle', anchorY: 'middle', fontSize: 10, strokeColor: ink, fixed: true, display: 'internal' }); } }
      l(a, C.dna, 4); l(b, '#d86a6a', 4);
      if (lv.draw === 'gene') { var gx0 = x0 + (x1 - x0) * 0.3, gx1 = x0 + (x1 - x0) * 0.7; l([[gx0, cy - 2.4], [gx1, cy - 2.4]], accent, 3); board.create('text', [(gx0 + gx1) / 2, cy - 2.9, 'one gene'], { anchorX: 'middle', fontSize: 13, strokeColor: accent, fixed: true, display: 'internal', cssStyle: 'font-weight:600' }); }
      else ring(10, cy, 2.5);
    }
    board.update();
  }

  // ---------- panel ----------
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var info = document.createElement('div'); info.className = 'cinfo';
    if (spec.zoom) {
      var lv = ZOOM[st.level];
      info.innerHTML = '<b></b><span></span>'; info.firstChild.textContent = lv.title + '. '; info.lastChild.textContent = lv.text;
      var bar = document.createElement('div'); bar.className = 'fbar';
      var out = document.createElement('button'); out.type = 'button'; out.textContent = 'Zoom out'; out.disabled = st.level === 0;
      var inn = document.createElement('button'); inn.type = 'button'; inn.textContent = 'Zoom in'; inn.className = 'go'; inn.disabled = st.level === ZOOM.length - 1;
      out.addEventListener('click', function () { st.level--; B.moved = true; build(); paint(); report(); });
      inn.addEventListener('click', function () { st.level++; st.deep = Math.max(st.deep, st.level); B.moved = true; build(); paint(); report(); });
      bar.append(out, inn); panel.append(info, bar); return;
    }
    if (!st.sel) info.textContent = 'Click a part of the ' + (TISSUES[spec.list[0]] ? 'diagram' : 'cell') + ' to find out what it is and what it does.';
    else {
      var h = objs.hits.find(function (x) { return x.key === st.sel; }), p = h.p;
      info.innerHTML = '<b></b><span></span><i></i>';
      info.children[0].textContent = p.name + '. '; info.children[1].textContent = p.does; info.children[2].textContent = 'Found in: ' + p.where + '.';
    }
    panel.appendChild(info);
  }
  function report() {
    if (spec.zoom) {
      B.say(st.deep === ZOOM.length - 1 ? 'You zoomed all the way from a person to a gene.' : 'Zoom in to go deeper.', st.deep === ZOOM.length - 1);
      B.post({ scope: { vars: { l: st.deep, n: st.deep, k: ZOOM.length - 1 }, points: {} } }, 'level ' + st.level); return;
    }
    var need = targets(), n = need.filter(function (k) { return st.found[k]; }).length;
    B.say(n >= need.length ? 'You have found every part' + (spec.find ? ' you were looking for' : '') + '.' : n + ' of ' + need.length + ' parts found.', n >= need.length);
    B.post({ scope: { vars: { n: n, k: need.length, l: 0 }, points: {} } }, n + ' of ' + need.length);
  }

  B.widget('cell', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.zoom ? 'Zooming from a person to a gene' : 'Diagram: ' + s.list.join(', '); },
    parse: parse,
    start: function () { spec = B.spec; st = { found: {}, sel: null, level: 0, deep: 0 }; build(); paint(); report(); },
    redraw: function () { build(); },
    resize: function () { build(); },
  });
})(WPB);
