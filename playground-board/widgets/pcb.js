// Printed circuit boards (Engineering › Your own board): parts on a 2.54 mm grid, nets (pads that must be joined),
// the ratsnest (straight lines showing joins still to make), copper traces on a top and a bottom layer with vias, and
// trace width against current. A teaching model: one grid cell is 2.54 mm (0.1 inch), the pin spacing of most parts.
//   widget: pcb
//   mode: layout | route | rules
//   grid: 20, 14              columns and rows of the board (cells)
//   part R1: resistor at 6,3 turn 1   a part, its footprint (resistor, diode, led, cap, button, transistor, dip8,
//                             header2 … header8) and the cell of its pad 1; turn: quarter turns (0 to 3)
//   net GND: J1.3, D1.2       the pads that must be joined (part.pad)
//   edge: J1                  parts that must touch the board's edge (connectors)
//   fixed: J1                 parts that cannot move (layout)
//   target: 120               the most ratsnest length (mm) the brief allows (layout)
//   trace GND: top 2,6 3,6 via 4,6 5,6     a prepared trace (route, rules): cells in order, "top" or "bottom" sets the
//                             layer, "via" switches layer at the next cell
//   current MOTOR: 1.5        amps a net carries (rules)
//   squeeze: MOTOR            nets whose trace passes between header pins (at most 0.4 mm wide there) (rules)
// state: { scope: { vars: layout { rat_mm, inside, overlap, edge_ok, p, sel_k (selected net, 1 = first listed),
//          sel_pins, moves }; route { routed, n_nets, done, vias, len_mm, bot_mm (copper on the bottom layer), sel_k }; rules { n_fail, n_net, w_<net>,
//          ok_<net> (net names in lower case) } } }
// Checks: "sel_k = 2", "p = 1", "done = 1 and vias <= 1", "n_fail = 0".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {};
  var C = 22, OX = 24, OY = 24, MM = 2.54;
  var FP = {
    resistor: [[0, 0], [4, 0]], diode: [[0, 0], [3, 0]], led: [[0, 0], [1, 0]], cap: [[0, 0], [1, 0]],
    button: [[0, 0], [3, 0]], transistor: [[0, 0], [1, 0], [2, 0]],
    dip8: [[0, 3], [1, 3], [2, 3], [3, 3], [3, 0], [2, 0], [1, 0], [0, 0]],
  };
  for (var h = 2; h <= 8; h++) FP['header' + h] = (function (n) { var a = []; for (var i = 0; i < n; i++) a.push([i, 0]); return a; })(h);
  var WIDTHS = [0.25, 0.5, 1, 1.5, 2];
  var SAFE = { 0.25: 0.8, 0.5: 1.4, 1: 2.4, 1.5: 3.2, 2: 3.9 };   // amps, 1 oz copper, outer layer, 10 °C rise (IPC-2221, rounded down)
  var SQUEEZE = 0.4;

  function parse(s) {
    s.mode = String(s.mode || 'layout').toLowerCase();
    if (['layout', 'route', 'rules'].indexOf(s.mode) < 0) throw new Error('mode: layout, route or rules.');
    var g = String(s.grid || '20, 14').split(',').map(function (t) { return Number(t.trim()); });
    if (!(g[0] >= 6 && g[0] <= 30 && g[1] >= 4 && g[1] <= 20)) throw new Error('grid: columns and rows, such as 20, 14 (up to 30, 20).');
    s.W = g[0]; s.H = g[1];
    s.parts = []; s.nets = []; s.traces = []; s.current = {};
    s.items.forEach(function (it) {
      if (it.kind === 'part') {
        var m = /^(\w+)\s+at\s+(\d+)\s*,\s*(\d+)(?:\s+turn\s+([0-3]))?$/i.exec(it.value);
        if (!m || !FP[m[1].toLowerCase()]) throw new Error('Line ' + it.line + ': part ' + it.name + ': a footprint (' + Object.keys(FP).join(', ') + ') "at x,y", optionally "turn 1".');
        s.parts.push({ id: it.name, fp: m[1].toLowerCase(), x: +m[2], y: +m[3], r: +(m[4] || 0) });
      } else if (it.kind === 'net') {
        s.nets.push({ name: it.name, pins: it.value.split(',').map(function (t) { return t.trim(); }) });
      } else if (it.kind === 'trace') {
        var toks = it.value.trim().split(/\s+/), layer = 'top', cells = [];
        toks.forEach(function (t) {
          if (/^(top|bottom)$/i.test(t)) layer = t.toLowerCase();
          else if (/^via$/i.test(t)) {
            if (!cells.length) throw new Error('Line ' + it.line + ': a via needs a cell before it.');
            var last = cells[cells.length - 1]; layer = layer === 'top' ? 'bottom' : 'top';
            cells.push({ x: last.x, y: last.y, l: layer });
          } else {
            var c = /^(\d+),(\d+)$/.exec(t); if (!c) throw new Error('Line ' + it.line + ': trace cells are x,y (got "' + t + '").');
            cells.push({ x: +c[1], y: +c[2], l: layer });
          }
        });
        s.traces.push({ net: it.name, cells: cells });
      } else if (it.kind === 'current') s.current[it.name] = Number(it.value);
    });
    if (!s.parts.length) throw new Error('Add parts: "part R1: resistor at 4,3".');
    var ids = s.parts.map(function (p) { return p.id; });
    s.nets.forEach(function (n) { n.pins.forEach(function (p) {
      var m = /^(\w+)\.(\d+)$/.exec(p);
      if (!m || ids.indexOf(m[1]) < 0) throw new Error('net ' + n.name + ': "' + p + '" is not a part.pad.');
      var part = s.parts[ids.indexOf(m[1])];
      if (!(+m[2] >= 1 && +m[2] <= FP[part.fp].length)) throw new Error('net ' + n.name + ': ' + part.id + ' has pads 1 to ' + FP[part.fp].length + '.');
    }); });
    s.traces.forEach(function (t) { if (!s.nets.some(function (n) { return n.name === t.net; })) throw new Error('trace ' + t.net + ': no net of that name.'); });
    var list = function (k) { return s[k] ? String(s[k]).split(',').map(function (t) { return t.trim(); }) : []; };
    s.edge = list('edge'); s.fixed = list('fixed'); s.squeeze = list('squeeze');
    s.target = s.target === undefined ? null : Number(s.target);
  }

  // ------------------------------------------------------------------ geometry
  function rot(p, r) { var x = p[0], y = p[1]; for (var i = 0; i < r; i++) { var t = x; x = -y; y = t; } return [x, y]; }
  function pads(part) { return FP[part.fp].map(function (p, i) { var q = rot(p, part.r); return { x: part.x + q[0], y: part.y + q[1], n: i + 1, part: part.id }; }); }
  function box(part) {
    var ps = pads(part), xs = ps.map(function (p) { return p.x; }), ys = ps.map(function (p) { return p.y; });
    return { x0: Math.min.apply(null, xs), x1: Math.max.apply(null, xs), y0: Math.min.apply(null, ys), y1: Math.max.apply(null, ys) };
  }
  function partBy(id) { return st.parts.filter(function (p) { return p.id === id; })[0]; }
  function padAt(x, y) {
    for (var i = 0; i < st.parts.length; i++) { var ps = pads(st.parts[i]); for (var j = 0; j < ps.length; j++) if (ps[j].x === x && ps[j].y === y) return ps[j]; }
    return null;
  }
  function netOf(pad) {
    if (!pad) return null;
    var key = pad.part + '.' + pad.n;
    for (var i = 0; i < spec.nets.length; i++) if (spec.nets[i].pins.indexOf(key) >= 0) return spec.nets[i].name;
    return null;
  }
  function netPads(name) {
    var n = spec.nets.filter(function (q) { return q.name === name; })[0];
    return n.pins.map(function (p) { var m = /^(\w+)\.(\d+)$/.exec(p); return pads(partBy(m[1]))[+m[2] - 1]; });
  }
  // Ratsnest: the shortest set of straight lines joining each net's pads (Prim's algorithm). Returns [[a,b], …] and length.
  function ratsnest() {
    var lines = [], total = 0;
    spec.nets.forEach(function (n) {
      var ps = netPads(n.name), inT = [ps[0]], out = ps.slice(1);
      if (st.mode === 'route') {   // in route mode, only joins not yet made
        var groups = connectedGroups(n.name);
        out = []; inT = [];
        var seen = {};
        ps.forEach(function (p) { var g = groups[p.x + ',' + p.y]; if (!seen[g]) { seen[g] = 1; (inT.length ? out : inT).push(p); } });
      }
      while (out.length) {
        var best = null;
        inT.forEach(function (a) { out.forEach(function (b, j) { var d = Math.hypot(a.x - b.x, a.y - b.y); if (!best || d < best.d) best = { a: a, b: b, j: j, d: d }; }); });
        lines.push([best.a, best.b]); total += best.d; inT.push(best.b); out.splice(best.j, 1);
      }
    });
    return { lines: lines, mm: Math.round(total * MM) };
  }
  function layoutInfo() {
    var inside = 1, overlap = 0, edgeOk = 1;
    st.parts.forEach(function (p, i) {
      var b = box(p);
      if (b.x0 < 0 || b.y0 < 0 || b.x1 >= spec.W || b.y1 >= spec.H) inside = 0;
      st.parts.forEach(function (q, j) {
        if (j <= i) return; var c = box(q);
        if (!(b.x1 + 1 < c.x0 || c.x1 + 1 < b.x0 || b.y1 + 1 < c.y0 || c.y1 + 1 < b.y0)) overlap++;
      });
      if (spec.edge.indexOf(p.id) >= 0 && !(b.x0 === 0 || b.y0 === 0 || b.x1 === spec.W - 1 || b.y1 === spec.H - 1)) edgeOk = 0;
    });
    return { inside: inside, overlap: overlap, edgeOk: edgeOk };
  }

  // ------------------------------------------------------------------ routing model
  function key(x, y, l) { return x + ',' + y + ',' + l; }
  // Which cells (on which layer) belong to which net: pads on both layers, then every trace cell.
  function occupancy() {
    var occ = {};
    st.parts.forEach(function (p) { pads(p).forEach(function (q) { var n = netOf(q) || ('pad:' + q.part + q.n); occ[key(q.x, q.y, 'top')] = n; occ[key(q.x, q.y, 'bottom')] = n; }); });
    st.traces.forEach(function (t) { t.cells.forEach(function (c) { occ[key(c.x, c.y, c.l)] = t.net; }); });
    if (st.cur) st.cur.cells.forEach(function (c) { occ[key(c.x, c.y, c.l)] = st.cur.net; });
    return occ;
  }
  // Groups of a net's pads that copper joins: returns { 'x,y': groupId } for its pads.
  function connectedGroups(name) {
    var parent = {};
    var find = function (a) { while (parent[a] !== undefined && parent[a] !== a) a = parent[a]; return a; };
    var join = function (a, b) { if (parent[a] === undefined) parent[a] = a; if (parent[b] === undefined) parent[b] = b; var ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; };
    var ps = netPads(name);
    ps.forEach(function (p) { join(key(p.x, p.y, 'top'), key(p.x, p.y, 'bottom')); });
    st.traces.concat(st.cur ? [st.cur] : []).forEach(function (t) {
      if (t.net !== name) return;
      t.cells.forEach(function (c, i) {
        var k = key(c.x, c.y, c.l); if (parent[k] === undefined) parent[k] = k;
        if (i) { var p = t.cells[i - 1]; join(key(p.x, p.y, p.l), k); }
      });
    });
    // cells shared by two traces of the same net on the same layer are the same node already (same key)
    var out = {};
    ps.forEach(function (p) { out[p.x + ',' + p.y] = find(key(p.x, p.y, 'top')); });
    return out;
  }
  function routeInfo() {
    var routed = 0, vias = 0, len = 0, bot = 0;
    spec.nets.forEach(function (n) { var g = connectedGroups(n.name), ids = {}; Object.keys(g).forEach(function (k) { ids[g[k]] = 1; }); if (Object.keys(ids).length === 1) routed++; });
    st.traces.forEach(function (t) { t.cells.forEach(function (c, i) { if (i) { if (t.cells[i - 1].l !== c.l) vias++; else { len++; if (c.l === 'bottom') bot++; } } }); });
    return { routed: routed, vias: vias, len: Math.round(len * MM), bot: Math.round(bot * MM) };
  }

  // ------------------------------------------------------------------ drawing
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  var cx = function (x) { return OX + x * C + C / 2; }, cy = function (y) { return OY + y * C + C / 2; };
  var NETCOL = ['#c2570a', '#2f6fb3', '#2e7d4f', '#8e44ad', '#b42318', '#9a6b00', '#00838f', '#5d4037'];
  function netColour(name) { var i = spec.nets.map(function (n) { return n.name; }).indexOf(name); return NETCOL[(i % NETCOL.length + NETCOL.length) % NETCOL.length]; }

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var W = OX * 2 + spec.W * C, H = OY * 2 + spec.H * C;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'gearsvg pcbsvg', role: 'application', tabindex: '0', 'aria-label': 'A circuit board on a grid. Arrow keys move the cursor; Enter acts on the cell.' }, host);
    ui.svg = svg;
    el('rect', { x: OX, y: OY, width: spec.W * C, height: spec.H * C, rx: 6, class: 'pcbboard' }, svg);
    for (var x = 0; x < spec.W; x++) for (var y = 0; y < spec.H; y++) el('circle', { cx: cx(x), cy: cy(y), r: 1, class: 'pcbdot' }, svg);
    // traces: bottom layer first, then top
    var w = function (net) { return st.mode === 'rules' ? Math.max(1.5, (st.width[net] || 0.25) * C / MM) : 6; };
    ['bottom', 'top'].forEach(function (L) {
      st.traces.concat(st.cur ? [st.cur] : []).forEach(function (t) {
        t.cells.forEach(function (c, i) {
          var p = t.cells[i - 1];
          if (!p || p.l !== L || c.l !== L) return;
          el('line', { x1: cx(p.x), y1: cy(p.y), x2: cx(c.x), y2: cy(c.y), class: 'pcbtrace ' + L + (t === st.cur ? ' cur' : ''), 'stroke-width': w(t.net) }, svg);
        });
        if (L === 'top') t.cells.forEach(function (c, i) { if (i && t.cells[i - 1].l !== c.l) el('circle', { cx: cx(c.x), cy: cy(c.y), r: 5, class: 'pcbvia' }, svg); });
      });
    });
    // parts and pads
    st.parts.forEach(function (p) {
      var b = box(p), sel = st.sel === p.id;
      el('rect', { x: OX + b.x0 * C + 2, y: OY + b.y0 * C + 2, width: (b.x1 - b.x0 + 1) * C - 4, height: (b.y1 - b.y0 + 1) * C - 4, rx: 4, class: 'pcbpart' + (sel ? ' sel' : ''), 'data-part': p.id }, svg);
      pads(p).forEach(function (q) {
        var net = netOf(q), hl = st.selNet && net === st.selNet;
        el(q.n === 1 ? 'rect' : 'circle', q.n === 1 ? { x: cx(q.x) - 6, y: cy(q.y) - 6, width: 12, height: 12, class: 'pcbpad' + (hl ? ' hl' : '') } : { cx: cx(q.x), cy: cy(q.y), r: 6, class: 'pcbpad' + (hl ? ' hl' : '') }, svg);
      });
      var ly = b.y0 > 0 ? OY + b.y0 * C - 3 : OY + (b.y1 + 1) * C + 12;
      var t = el('text', { x: OX + (b.x0 + b.x1 + 1) * C / 2, y: ly, 'text-anchor': 'middle', class: 'pcblabel' }, svg); t.textContent = p.id;
    });
    if (st.mode !== 'rules') {
      var R = ratsnest();
      R.lines.forEach(function (ln) { el('line', { x1: cx(ln[0].x), y1: cy(ln[0].y), x2: cx(ln[1].x), y2: cy(ln[1].y), class: 'pcbrat', stroke: netColour(netOf(ln[0])) }, svg); });
    }
    ui.cursor = el('rect', { width: C, height: C, class: 'pcbcursor' }, svg);
    placeCursor();
    // one transparent rect catches clicks for the whole grid
    var hit = el('rect', { x: OX, y: OY, width: spec.W * C, height: spec.H * C, fill: 'transparent', class: 'pcbhit' }, svg);
    hit.addEventListener('click', function (e) {
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var q = pt.matrixTransform(svg.getScreenCTM().inverse());
      var gx = Math.floor((q.x - OX) / C), gy = Math.floor((q.y - OY) / C);
      if (gx >= 0 && gy >= 0 && gx < spec.W && gy < spec.H) { st.cx = gx; st.cy = gy; act(gx, gy); }
    });
    svg.addEventListener('keydown', function (e) {
      var d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (d) { e.preventDefault(); st.cx = Math.max(0, Math.min(spec.W - 1, st.cx + d[0])); st.cy = Math.max(0, Math.min(spec.H - 1, st.cy + d[1])); placeCursor(); describeCursor(); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(st.cx, st.cy); }
    });
  }
  function placeCursor() { if (ui.cursor) { ui.cursor.setAttribute('x', OX + st.cx * C); ui.cursor.setAttribute('y', OY + st.cy * C); } }
  function describeCursor() {
    var p = padAt(st.cx, st.cy);
    B.say('Cell ' + st.cx + ', ' + st.cy + (p ? ': pad ' + p.part + '.' + p.n + (netOf(p) ? ' on ' + netOf(p) : '') : ''));
  }

  // ------------------------------------------------------------------ actions
  function act(x, y) {
    B.moved = true;
    if (st.mode === 'layout') return actLayout(x, y);
    if (st.mode === 'route') return actRoute(x, y);
    var p = padAt(x, y); st.selNet = netOf(p); draw(); report(p ? 'Pad ' + p.part + '.' + p.n + (st.selNet ? ' is on ' + st.selNet + '.' : ' is not on a net.') : '');
  }
  function partAt(x, y) {
    for (var i = st.parts.length - 1; i >= 0; i--) { var b = box(st.parts[i]); if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return st.parts[i]; }
    return null;
  }
  function actLayout(x, y) {
    var pad = padAt(x, y), part = partAt(x, y);
    if (st.sel && !part) {   // move the selected part so its pad 1 is here
      var P = partBy(st.sel);
      if (spec.fixed.indexOf(P.id) >= 0) { st.sel = null; draw(); return report(P.id + ' is fixed: it cannot move.'); }
      P.x = x; P.y = y; st.moves++; draw(); return report('Moved ' + P.id + '.');
    }
    if (pad) st.selNet = netOf(pad);
    if (part) st.sel = st.sel === part.id ? null : part.id;
    draw();
    report(part ? (st.sel ? 'Selected ' + part.id + (spec.fixed.indexOf(part.id) >= 0 ? ' (fixed)' : ': click an empty cell to move its pad 1 there, or Rotate.') : '') + (pad && st.selNet ? ' Pad ' + pad.part + '.' + pad.n + ' is on ' + st.selNet + '.' : '') : '');
  }
  function rotateSel() {
    if (!st.sel) return report('Select a part first.');
    var P = partBy(st.sel); if (spec.fixed.indexOf(P.id) >= 0) return report(P.id + ' is fixed.');
    P.r = (P.r + 1) % 4; st.moves++; B.moved = true; draw(); report('Rotated ' + P.id + '.');
  }
  function actRoute(x, y) {
    var occ = occupancy(), L = st.layer, here = occ[key(x, y, L)], pad = padAt(x, y);
    if (!st.cur) {
      var net = pad ? netOf(pad) : (here && here.indexOf('pad:') < 0 ? here : null);
      if (!net) return report('Start on a pad (or on a trace) that belongs to a net.');
      st.cur = { net: net, cells: [{ x: x, y: y, l: L }] }; st.selNet = net; draw();
      return report('Drawing ' + net + ' on the ' + L + ' layer. Click the next cell, one step at a time.');
    }
    var last = st.cur.cells[st.cur.cells.length - 1];
    if (Math.abs(last.x - x) + Math.abs(last.y - y) !== 1) return report('The next cell must be next to the last one (not diagonal).');
    if (here && here !== st.cur.net) return report('Stop: that would join ' + st.cur.net + ' to ' + (here.indexOf('pad:') === 0 ? 'a pad on no net' : here) + ' (a short circuit). Go round, or change layer.');
    st.cur.cells.push({ x: x, y: y, l: L });
    if (here === st.cur.net) {
      st.traces.push(st.cur); var n = st.cur.net; st.cur = null; draw();
      var g = connectedGroups(n), left = {}; Object.keys(g).forEach(function (k) { left[g[k]] = 1; });
      return report(Object.keys(left).length === 1 ? n + ' is complete: every pad on it is joined.' : 'Joined. ' + n + ' still has pads to join (follow its thin line).');
    }
    draw(); report();
  }
  function switchLayer() {
    st.layer = st.layer === 'top' ? 'bottom' : 'top';
    if (st.cur) {
      var last = st.cur.cells[st.cur.cells.length - 1], occ = occupancy(), other = occ[key(last.x, last.y, st.layer)];
      if (other && other !== st.cur.net) { st.layer = last.l; return report('No room for a via here: ' + other + ' is on the other layer.'); }
      st.cur.cells.push({ x: last.x, y: last.y, l: st.layer });   // a via
    }
    B.moved = true; paintPanel(); draw(); report('Now on the ' + st.layer + ' layer' + (st.cur ? ', through a via.' : '.'));
  }
  function undo() {
    if (st.cur) { st.cur.cells.pop(); if (st.cur.cells.length && st.cur.cells[st.cur.cells.length - 1].l !== st.layer) st.layer = st.cur.cells[st.cur.cells.length - 1].l; if (!st.cur.cells.length) st.cur = null; }
    else if (st.traces.length > spec.traces.length) st.traces.pop();
    else return report('Nothing to undo (the prepared traces stay).');
    B.moved = true; draw(); report();
  }

  // ------------------------------------------------------------------ panel and report
  function btn(text, label, fn, quiet) {
    var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label);
    if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    if (st.mode === 'layout') row.appendChild(btn('Rotate', 'Rotate the selected part', rotateSel));
    if (st.mode === 'route') {
      row.appendChild(btn(st.layer === 'top' ? 'Switch to bottom layer' : 'Switch to top layer', null, switchLayer));
      row.appendChild(btn('Undo', 'Undo the last step', undo, true));
    }
    if (st.mode === 'rules') {
      spec.nets.forEach(function (n) {
        if (!(n.name in spec.current)) return;
        var wrap = document.createElement('label'); wrap.textContent = n.name + ' (' + spec.current[n.name] + ' A) ';
        var s = document.createElement('select'); s.setAttribute('aria-label', n.name + ' trace width');
        WIDTHS.forEach(function (w) { var o = document.createElement('option'); o.value = w; o.textContent = w + ' mm'; s.appendChild(o); });
        s.value = String(st.width[n.name]);
        s.addEventListener('change', function () { st.width[n.name] = Number(s.value); B.moved = true; draw(); report(); });
        wrap.appendChild(s); row.appendChild(wrap);
        if (spec.squeeze.indexOf(n.name) >= 0) {
          var w2 = document.createElement('label'); w2.textContent = 'path ';
          var s2 = document.createElement('select'); s2.setAttribute('aria-label', n.name + ' path');
          [['between', 'between the pins'], ['around', 'around the header']].forEach(function (o) { var e = document.createElement('option'); e.value = o[0]; e.textContent = o[1]; s2.appendChild(e); });
          s2.value = st.path[n.name];
          s2.addEventListener('change', function () { st.path[n.name] = s2.value; B.moved = true; report(); });
          w2.appendChild(s2); row.appendChild(w2);
        }
      });
    }
    row.appendChild(btn('Start again', null, function () { B.restart(); }, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
  }

  function report(note) {
    var facts = [], vars = {}, base;
    var selK = st.selNet ? spec.nets.map(function (n) { return n.name; }).indexOf(st.selNet) + 1 : 0;
    var selPins = st.selNet ? spec.nets[selK - 1].pins.length : 0;
    if (st.mode === 'layout') {
      var R = ratsnest(), I = layoutInfo(), p = I.inside && !I.overlap && I.edgeOk && (spec.target === null || R.mm <= spec.target) ? 1 : 0;
      facts.push('Ratsnest ' + R.mm + ' mm' + (spec.target !== null ? ' (' + (R.mm <= spec.target ? '✓' : '✗') + ' at most ' + spec.target + ')' : ''));
      facts.push((I.inside ? '✓' : '✗') + ' on the board');
      facts.push((I.overlap ? '✗ ' + I.overlap + ' too close (parts need a cell between them)' : '✓ no parts touching'));
      if (spec.edge.length) facts.push((I.edgeOk ? '✓' : '✗') + ' ' + spec.edge.join(', ') + ' at the edge');
      vars = { rat_mm: R.mm, inside: I.inside, overlap: I.overlap, edge_ok: I.edgeOk, p: p, sel_k: selK, sel_pins: selPins, moves: st.moves };
      base = 'Click a pad to see its net. Click a part to select it, then an empty cell to move it.';
      B.save({ parts: st.parts.map(function (q) { return [q.id, q.x, q.y, q.r]; }), moves: st.moves });
    } else if (st.mode === 'route') {
      var RI = routeInfo();
      facts.push('Nets joined ' + RI.routed + ' of ' + spec.nets.length);
      facts.push('vias ' + RI.vias);
      facts.push('copper ' + RI.len + ' mm');
      facts.push('layer: ' + st.layer);
      vars = { routed: RI.routed, n_nets: spec.nets.length, done: RI.routed === spec.nets.length && !st.cur ? 1 : 0, vias: RI.vias, len_mm: RI.len, bot_mm: RI.bot, sel_k: selK };
      base = st.cur ? 'Drawing ' + st.cur.net + '.' : 'Click a pad to start a trace; thin lines show joins still to make.';
      B.save({ traces: st.traces.slice(spec.traces.length) });
    } else {
      var fails = [];
      vars = { n_net: 0 };
      spec.nets.forEach(function (n) {
        if (!(n.name in spec.current)) return;
        var w = st.width[n.name], I2 = spec.current[n.name], sq = spec.squeeze.indexOf(n.name) >= 0 && st.path[n.name] === 'between';
        var ok = SAFE[w] >= I2 && (!sq || w <= SQUEEZE);
        if (!ok) fails.push(n.name + (SAFE[w] < I2 ? ' too thin for ' + I2 + ' A' : ' too wide to pass between the pins'));
        var k = n.name.toLowerCase(); vars['w_' + k] = w; vars['ok_' + k] = ok ? 1 : 0; vars.n_net++;
      });
      vars.n_fail = fails.length;
      facts.push(fails.length ? '✗ ' + fails.join('; ') : '✓ every trace passes');
      base = 'Safe current (1 oz copper, outer layer, 10 °C rise): 0.25 mm 0.8 A · 0.5 mm 1.4 A · 1 mm 2.4 A · 1.5 mm 3.2 A · 2 mm 3.9 A. Between header pins: 0.4 mm at most.';
      B.save({ width: st.width, path: st.path });
    }
    ui.facts.textContent = facts.join(' · ');
    ui.note.textContent = note || base;
    B.post({ scope: { vars: vars, points: {} } }, facts.join('. ') + (note ? ' ' + note : ''));
  }

  B.widget('pcb', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A printed circuit board on a grid'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = { mode: spec.mode, parts: spec.parts.map(function (p) { return Object.assign({}, p); }), traces: spec.traces.map(function (t) { return { net: t.net, cells: t.cells.slice() }; }),
        cur: null, layer: 'top', sel: null, selNet: null, moves: 0, cx: 0, cy: 0, width: {}, path: {} };
      spec.nets.forEach(function (n) { st.width[n.name] = 0.25; st.path[n.name] = 'between'; });
      if (sv) {
        if (sv.parts) sv.parts.forEach(function (q) { var P = partBy(q[0]); if (P && spec.fixed.indexOf(P.id) < 0) { P.x = q[1]; P.y = q[2]; P.r = q[3]; } });
        st.moves = sv.moves || 0;
        if (sv.traces && st.mode === 'route') sv.traces.forEach(function (t) { st.traces.push(t); });
        if (sv.width) Object.keys(sv.width).forEach(function (k) { if (k in st.width && WIDTHS.indexOf(sv.width[k]) >= 0) st.width[k] = sv.width[k]; });
        if (sv.path) Object.keys(sv.path).forEach(function (k) { if (k in st.path) st.path[k] = sv.path[k]; });
      }
      paintPanel(); draw(); report();
    },
  });
})(WPB);
