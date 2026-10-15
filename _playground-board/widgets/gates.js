// From gates to a processor: build circuits from gates, add binary numbers with full adders, remember a bit in a latch.
//   widget: gates
//   mode: build | adder | latch
// mode: build    Switches on the left, gates in the middle, output lamps on the right. Wire by clicking a "from" pin
//                (a switch's or a gate's ●), then a "to" pin (a gate's input or an output). Click a wired "to" pin
//                with nothing chosen to unplug it. The truth table works out every row and compares it with a target.
//   inputs: A, B             switch names (1 to 4)
//   outputs: Q               lamp names (1 to 3)
//   gate g1: and A B         a gate (and | or | not | nand | nor | xor), optionally wired from switches or earlier gates
//   wire Q: g1               an output's wire
//   add: and, or, not        buttons to add gates (none by default); max: 6 gates
//   lock: on                 wires can't be changed (a circuit to read)
//   target Q: 0110           the output wanted for each row (rows count up from all 0s; first input is the biggest bit)
//   table: all | tried | off the truth table: every row, only rows tried on the switches, or hidden
//   Values: a b c d (switches), o p (first and second outputs now), m (rows matching every target), r (rows), k (1 when
//           every row matches and nothing is unplugged), g (gates), w (wires), u (unplugged pins), n (1 if every gate
//           is a NAND), t (rows tried on the switches), j (the most gates any path passes through).
// mode: adder    Binary numbers A and B on switches, a full adder for each place, carries passed to the left.
//   bits: 4 (1 to 8)   half: on (one place, a half adder: no carry in)   a: 5   b: 7 (starting numbers)
//   Values: a, b (the numbers), s (the sum, with the last carry), c (the last carry out), z (places that carried),
//           n (bits), o (1 if the sum needs more bits than A and B have), y (different sums tried).
// mode: latch    Two NOR gates feeding each other: Set and Reset switches, output Q stays put when both are off.
//   register: 4        add a 4-bit register below: data switches and a Store button (each bit is a latch)
//   Values: s, r (switches), q (Q), h (1 when S and R are both off and Q is 1: it is remembering a 1), f (1 if S and R
//           were both on at once), k (times Q changed), d (data switches as a number), v (stored number), w (stores).
(function (B) {
  'use strict';
  var spec = null, ui = {}, NS = 'http://www.w3.org/2000/svg';
  var KINDS = { and: 2, or: 2, not: 1, nand: 2, nor: 2, xor: 2 };
  var FN = {
    and: function (x, y) { return x & y; }, or: function (x, y) { return x | y; }, not: function (x) { return 1 - x; },
    nand: function (x, y) { return 1 - (x & y); }, nor: function (x, y) { return 1 - (x | y); }, xor: function (x, y) { return x ^ y; },
  };
  // build state
  var sw = {}, gates = [], outs = {}, sel = null, tried = {}, nextId = 1;
  // adder state
  var A = 0, Bn = 0, sums = {};
  // latch state
  var S = 0, R = 0, Q = 0, flips = 0, both = 0, D = 0, V = 0, stores = 0;

  function list(v, def) { return String(v === undefined ? def : v).split(',').map(function (x) { return x.trim(); }).filter(Boolean); }
  function parse(s) {
    s.m = String(s.mode || 'build').toLowerCase();
    if (['build', 'adder', 'latch'].indexOf(s.m) < 0) throw new Error('mode: build, adder or latch.');
    s.ins = list(s.inputs, 'A, B').map(function (x) { return x.toUpperCase(); });
    if (s.ins.length < 1 || s.ins.length > 4) throw new Error('inputs: 1 to 4 names.');
    s.outs = list(s.outputs, 'Q').map(function (x) { return x.toUpperCase(); });
    if (s.outs.length < 1 || s.outs.length > 3) throw new Error('outputs: 1 to 3 names.');
    s.gates0 = s.items.filter(function (i) { return i.kind === 'gate' && i.name; }).map(function (i) {
      var p = i.value.trim().split(/\s+/), k = (p[0] || '').toLowerCase();
      if (!/^g\d+$/i.test(i.name)) throw new Error('gate names are g1, g2, … (got ' + i.name + ').');
      if (!KINDS[k]) throw new Error('gate ' + i.name + ': and, or, not, nand, nor or xor.');
      return { id: i.name.toLowerCase(), kind: k, src: p.slice(1, 1 + KINDS[k]).map(function (x) { return /^g\d+$/i.test(x) ? x.toLowerCase() : x.toUpperCase(); }) };
    });
    s.wires0 = {}; s.items.filter(function (i) { return i.kind === 'wire' && i.name; }).forEach(function (i) { var v = i.value.trim(); s.wires0[i.name.toUpperCase()] = /^g\d+$/i.test(v) ? v.toLowerCase() : v.toUpperCase(); });
    s.target = {}; s.items.filter(function (i) { return i.kind === 'target' && i.name; }).forEach(function (i) {
      var t = i.value.replace(/\s+/g, ''); if (!/^[01]+$/.test(t) || t.length !== Math.pow(2, s.ins.length)) throw new Error('target ' + i.name + ': ' + Math.pow(2, s.ins.length) + ' digits, 0 or 1.');
      s.target[i.name.toUpperCase()] = t;
    });
    s.add = s.add === undefined ? [] : list(s.add).map(function (x) { return x.toLowerCase(); });
    s.add.forEach(function (k) { if (!KINDS[k]) throw new Error('add: and, or, not, nand, nor, xor.'); });
    s.max = s.max === undefined ? 6 : Number(s.max);
    s.lock = /^on$/i.test(s.lock || '');
    s.tableMode = String(s.table || 'all').toLowerCase();
    s.bits = s.bits === undefined ? 4 : Number(s.bits);
    if (!(s.bits >= 1 && s.bits <= 8)) throw new Error('bits: 1 to 8.');
    s.half = /^on$/i.test(s.half || '');
    s.a0 = s.a === undefined ? 0 : Number(s.a); s.b0 = s.b === undefined ? 0 : Number(s.b);
    if (!(s.a0 >= 0 && s.b0 >= 0 && s.a0 < Math.pow(2, s.half ? 1 : s.bits) && s.b0 < Math.pow(2, s.half ? 1 : s.bits))) throw new Error('a: and b: whole numbers that fit in the bits.');
    s.reg = s.register === undefined ? 0 : Number(s.register);
  }

  // ---------- build mode ----------
  var gateById = function (id) { for (var i = 0; i < gates.length; i++) if (gates[i].id === id) return gates[i]; return null; };
  function value(src, env, memo) {
    if (!src) return null;
    if (env.hasOwnProperty(src)) return env[src];
    if (memo.hasOwnProperty(src)) return memo[src];
    var g = gateById(src); if (!g) return null;
    var xs = g.src.map(function (s2) { return value(s2, env, memo); });
    var v = xs.some(function (x) { return x === null; }) ? null : FN[g.kind](xs[0], xs[1]);
    memo[src] = v; return v;
  }
  function feeds(from, to) { // does `from` (directly or not) depend on `to`?
    if (from === to) return true;
    var g = gateById(from); if (!g) return false;
    return g.src.some(function (s2) { return s2 && feeds(s2, to); });
  }
  function depth(id) { var g = gateById(id); if (!g) return 0; return 1 + Math.max.apply(null, [0].concat(g.src.map(function (s2) { return s2 ? depth(s2) : 0; }))); }
  var nameOf = function (id) { var g = gateById(id); return g ? 'gate ' + id.slice(1) + ' (' + g.kind.toUpperCase() + ')' : id; };
  function env(row) { var e = {}, n = spec.ins.length; spec.ins.forEach(function (x, i) { e[x] = (row >> (n - 1 - i)) & 1; }); return e; }
  var rowNow = function () { var r = 0; spec.ins.forEach(function (x) { r = r * 2 + sw[x]; }); return r; };

  function pin(label, cls, onClick, text) { var b = document.createElement('button'); b.type = 'button'; b.className = 'gtpin ' + cls; b.setAttribute('aria-label', label); b.textContent = text || '●'; b.addEventListener('click', onClick); return b; }
  function choose(src) { if (spec.lock) return; sel = sel === src ? null : src; B.moved = true; drawBuild(); B.say(sel ? 'Wire from ' + nameOf(sel) + ': now click where it goes.' : 'Wire cancelled.'); }
  function plug(setter, cur, label, targetGate) {
    if (spec.lock) return;
    if (!sel) { if (cur) { setter(null); B.moved = true; drawBuild(); report(); B.say(label + ' unplugged.'); } else B.say('First click a ● to wire from.'); return; }
    if (targetGate && feeds(sel, targetGate)) { B.say('That would loop back into itself. Choose another pin.'); return; }
    setter(sel); sel = null; B.moved = true; drawBuild(); report();
  }

  function drawBuild() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'gtwrap';
    if (spec.add.length && !spec.lock) {
      var bar = document.createElement('div'); bar.className = 'gtbar';
      spec.add.forEach(function (k) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = '+ ' + k.toUpperCase(); b.setAttribute('aria-label', 'Add ' + k.toUpperCase() + ' gate');
        b.disabled = gates.length >= spec.max;
        b.addEventListener('click', function () { gates.push({ id: 'g' + nextId++, kind: k, src: KINDS[k] === 1 ? [null] : [null, null] }); B.moved = true; drawBuild(); report(); });
        bar.appendChild(b);
      });
      var clr = document.createElement('button'); clr.type = 'button'; clr.className = 'quiet'; clr.textContent = 'Clear wires';
      clr.addEventListener('click', function () { gates.forEach(function (g) { g.src = g.src.map(function () { return null; }); }); spec.outs.forEach(function (o) { outs[o] = null; }); sel = null; B.moved = true; drawBuild(); report(); });
      bar.appendChild(clr);
      wrap.appendChild(bar);
    }
    var area = document.createElement('div'); area.className = 'gtarea';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'gtwires'); svg.setAttribute('aria-hidden', 'true');
    var grid = document.createElement('div'); grid.className = 'gtgrid';
    var e = {}; spec.ins.forEach(function (x) { e[x] = sw[x]; }); var memo = {};
    var pins = {};   // id -> element (from pins), and 'to:' keys
    // inputs
    var c0 = document.createElement('div'); c0.className = 'gtcol';
    spec.ins.forEach(function (x) {
      var card = document.createElement('div'); card.className = 'gtcard gtin' + (sw[x] ? ' on' : '');
      var t = document.createElement('button'); t.type = 'button'; t.className = 'gtsw'; t.textContent = x + ': ' + sw[x];
      t.setAttribute('aria-label', 'Switch ' + x + ', ' + (sw[x] ? 'on, 1' : 'off, 0')); t.setAttribute('aria-pressed', String(!!sw[x]));
      t.addEventListener('click', function () { sw[x] = 1 - sw[x]; tried[rowNow()] = 1; B.moved = true; drawBuild(); report(); });
      var p = pin('Wire from ' + x, 'out' + (sel === x ? ' sel' : '') + (sw[x] ? ' lit' : ''), function () { choose(x); });
      pins[x] = p; card.append(t, p); c0.appendChild(card);
    });
    grid.appendChild(c0);
    // gates by depth
    var maxD = 0, byD = {};
    gates.forEach(function (g) { var d = depth(g.id); maxD = Math.max(maxD, d); (byD[d] = byD[d] || []).push(g); });
    for (var d = 1; d <= Math.max(1, maxD); d++) {
      var col = document.createElement('div'); col.className = 'gtcol';
      (byD[d] || []).forEach(function (g) {
        var v = value(g.id, e, memo);
        var card = document.createElement('div'); card.className = 'gtcard gtgate' + (v ? ' on' : '');
        var ins = document.createElement('div'); ins.className = 'gtins';
        g.src.forEach(function (s2, i) {
          var lab = nameOf(g.id) + ' input ' + (i + 1) + (s2 ? ', from ' + nameOf(s2) : ', not connected');
          var p = pin(lab, 'in' + (s2 ? '' : ' empty') + (sel ? ' want' : ''), function () { plug(function (v2) { g.src[i] = v2; }, s2, nameOf(g.id) + ' input ' + (i + 1), g.id); }, s2 ? (s2.charAt(0) === 'g' ? s2.slice(1) : s2) : '?');
          pins['to:' + g.id + ':' + i] = p; ins.appendChild(p);
        });
        var body = document.createElement('div'); body.className = 'gtbody';
        var nm = document.createElement('b'); nm.textContent = g.kind.toUpperCase(); var num = document.createElement('small'); num.textContent = 'gate ' + g.id.slice(1);
        body.append(nm, num);
        if (spec.add.length && !spec.lock) {
          var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'gtrm'; rm.textContent = '×'; rm.setAttribute('aria-label', 'Remove ' + nameOf(g.id));
          rm.addEventListener('click', function () { gates = gates.filter(function (x) { return x !== g; }); gates.forEach(function (x) { x.src = x.src.map(function (s3) { return s3 === g.id ? null : s3; }); }); spec.outs.forEach(function (o) { if (outs[o] === g.id) outs[o] = null; }); if (sel === g.id) sel = null; B.moved = true; drawBuild(); report(); });
          body.appendChild(rm);
        }
        var op = pin('Wire from ' + nameOf(g.id), 'out' + (sel === g.id ? ' sel' : '') + (v ? ' lit' : ''), function () { choose(g.id); });
        pins[g.id] = op;
        card.append(ins, body, op); col.appendChild(card);
      });
      grid.appendChild(col);
    }
    // outputs
    var cz = document.createElement('div'); cz.className = 'gtcol';
    spec.outs.forEach(function (o) {
      var v = value(outs[o], e, memo);
      var card = document.createElement('div'); card.className = 'gtcard gtout';
      var p = pin('Output ' + o + (outs[o] ? ', from ' + nameOf(outs[o]) : ', not connected'), 'in' + (outs[o] ? '' : ' empty') + (sel ? ' want' : ''), function () { plug(function (v2) { outs[o] = v2; }, outs[o], 'Output ' + o, null); }, outs[o] ? (outs[o].charAt(0) === 'g' ? outs[o].slice(1) : outs[o]) : '?');
      pins['to:out:' + o] = p;
      var lamp = document.createElement('span'); lamp.className = 'gtlamp' + (v ? ' on' : ''); lamp.textContent = v === null ? '?' : String(v);
      var nm = document.createElement('b'); nm.textContent = o;
      card.append(p, lamp, nm); cz.appendChild(card);
    });
    grid.appendChild(cz);
    area.append(svg, grid);
    wrap.appendChild(area);
    if (spec.tableMode !== 'off') wrap.appendChild(table());
    host.appendChild(wrap);
    ui.wire = function () { wires(area, svg, pins, e); };
    requestAnimationFrame(ui.wire);
  }

  function wires(area, svg, pins, e) {
    if (!area.isConnected) return;
    var box = area.getBoundingClientRect(); svg.setAttribute('width', area.scrollWidth); svg.setAttribute('height', area.scrollHeight); svg.replaceChildren();
    var at = function (el, right) { var r = el.getBoundingClientRect(); return [(right ? r.right : r.left) - box.left + area.scrollLeft, r.top + r.height / 2 - box.top + area.scrollTop]; };
    var memo = {};
    function line(src, toEl) {
      var f = pins[src]; if (!f || !toEl) return;
      var a = at(f, true), b = at(toEl, false), mx = (a[0] + b[0]) / 2;
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', 'M' + a[0] + ' ' + a[1] + ' C' + mx + ' ' + a[1] + ' ' + mx + ' ' + b[1] + ' ' + b[0] + ' ' + b[1]);
      p.setAttribute('class', 'gtw' + (value(src, e, memo) ? ' on' : ''));
      svg.appendChild(p);
    }
    gates.forEach(function (g) { g.src.forEach(function (s2, i) { if (s2) line(s2, pins['to:' + g.id + ':' + i]); }); });
    spec.outs.forEach(function (o) { if (outs[o]) line(outs[o], pins['to:out:' + o]); });
  }

  function table() {
    var n = spec.ins.length, rows = Math.pow(2, n), t = document.createElement('table'); t.className = 'gttable';
    var hd = document.createElement('tr');
    spec.ins.concat(spec.outs).forEach(function (h) { var th = document.createElement('th'); th.textContent = h; hd.appendChild(th); });
    var tg = Object.keys(spec.target).length; if (tg) { var th = document.createElement('th'); th.textContent = 'wanted'; hd.appendChild(th); }
    t.appendChild(hd);
    var now = rowNow();
    for (var r = 0; r < rows; r++) {
      var show = spec.tableMode === 'all' || tried[r];
      var tr = document.createElement('tr'); if (r === now) tr.className = 'now';
      var e = env(r), memo = {}, ok = true;
      spec.ins.forEach(function (x) { var td = document.createElement('td'); td.textContent = e[x]; tr.appendChild(td); });
      var want = [];
      spec.outs.forEach(function (o) {
        var v = value(outs[o], e, memo), td = document.createElement('td'); td.textContent = !show ? '?' : v === null ? '–' : v;
        if (spec.target[o] !== undefined) { want.push(spec.target[o][r]); if (String(v) !== spec.target[o][r]) ok = false; }
        tr.appendChild(td);
      });
      if (tg) { var td2 = document.createElement('td'); td2.textContent = want.join(' ') + (show ? (ok ? ' ✓' : ' ✗') : ''); td2.className = show ? (ok ? 'ok' : 'no') : ''; tr.appendChild(td2); }
      t.appendChild(tr);
    }
    return t;
  }

  function reportBuild() {
    var rows = Math.pow(2, spec.ins.length), m = 0, tg = Object.keys(spec.target);
    for (var r = 0; r < rows; r++) {
      var e = env(r), memo = {}, ok = tg.length > 0;
      tg.forEach(function (o) { if (String(value(outs[o], e, memo)) !== spec.target[o][r]) ok = false; });
      if (ok) m++;
    }
    var u = 0, w = 0;
    gates.forEach(function (g) { g.src.forEach(function (s2) { if (s2) w++; else u++; }); });
    spec.outs.forEach(function (o) { if (outs[o]) w++; else u++; });
    var e0 = {}; spec.ins.forEach(function (x) { e0[x] = sw[x]; }); var memo0 = {};
    var ov = spec.outs.map(function (o) { return value(outs[o], e0, memo0); });
    var j = Math.max.apply(null, [0].concat(spec.outs.map(function (o) { return outs[o] ? depth(outs[o]) : 0; })));
    var sv = spec.ins.map(function (x) { return sw[x]; });
    var text = spec.ins.map(function (x) { return x + ' ' + sw[x]; }).join(', ') + ' → ' + spec.outs.map(function (o, i) { return o + ' ' + (ov[i] === null ? '?' : ov[i]); }).join(', ') +
      (tg.length ? '. Rows matching: ' + m + ' of ' + rows : '') + (u ? '. ' + u + ' pin' + (u > 1 ? 's' : '') + ' not connected' : '') + '. Gates: ' + gates.length;
    ui.work.textContent = text; if (!sel) B.say(text);
    B.save({ sw: sw, gates: gates, outs: outs, tried: tried, nextId: nextId });
    B.post({ scope: { vars: {
      a: sv[0] | 0, b: sv[1] | 0, c: sv[2] | 0, d: sv[3] | 0, o: ov[0] === null ? -1 : ov[0], p: ov[1] === null || ov[1] === undefined ? -1 : ov[1],
      m: m, r: rows, k: tg.length && m === rows && u === 0 ? 1 : 0, g: gates.length, w: w, u: u,
      n: gates.length && gates.every(function (g) { return g.kind === 'nand'; }) ? 1 : 0, t: Object.keys(tried).length, j: j,
    }, points: {} } }, text);
  }

  // ---------- adder mode ----------
  function bitRow(label, get, set, n) {
    var row = document.createElement('div'); row.className = 'gtbits';
    var l = document.createElement('span'); l.className = 'gtlab'; l.textContent = label; row.appendChild(l);
    for (var i = n - 1; i >= 0; i--) (function (i) {
      var on = (get() >> i) & 1, b = document.createElement('button'); b.type = 'button'; b.className = 'gtbit' + (on ? ' on' : ''); b.textContent = on;
      b.setAttribute('aria-label', label + ' bit worth ' + Math.pow(2, i) + ', ' + (on ? 'on, 1' : 'off, 0')); b.setAttribute('aria-pressed', String(!!on));
      b.addEventListener('click', function () { set(get() ^ (1 << i)); sums[(A + Bn)] = 1; B.moved = true; drawAdder(); report(); });
      row.appendChild(b);
    })(i);
    var v = document.createElement('span'); v.className = 'gtnum'; v.textContent = '= ' + get(); row.appendChild(v);
    return row;
  }
  function addColumns() {
    var n = spec.half ? 1 : spec.bits, carry = 0, out = [];
    for (var i = 0; i < n; i++) { var x = (A >> i) & 1, y = (Bn >> i) & 1, s2 = x ^ y ^ carry, c2 = (x & y) | (carry & (x ^ y)); out.push({ x: x, y: y, cin: carry, s: s2, c: c2 }); carry = c2; }
    return out;
  }
  function drawAdder() {
    var n = spec.half ? 1 : spec.bits, host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'gtwrap gtadd';
    wrap.appendChild(bitRow('A', function () { return A; }, function (v) { A = v; }, n));
    wrap.appendChild(bitRow('B', function () { return Bn; }, function (v) { Bn = v; }, n));
    var cols = addColumns(), row = document.createElement('div'); row.className = 'gtfas';
    var l = document.createElement('span'); l.className = 'gtlab'; l.textContent = ''; row.appendChild(l);
    for (var i = n - 1; i >= 0; i--) {
      var c = cols[i], fa = document.createElement('div'); fa.className = 'gtfa' + (c.c ? ' carry' : '');
      fa.innerHTML = '<b>' + (spec.half ? 'half adder' : 'full adder') + '</b><span>' + c.x + ' + ' + c.y + (spec.half ? '' : ' + carry ' + c.cin) + '</span><span>sum ' + c.s + ', carry ' + c.c + '</span>';
      fa.setAttribute('aria-label', 'Place worth ' + Math.pow(2, i) + ': ' + c.x + ' plus ' + c.y + (spec.half ? '' : ' plus carry ' + c.cin) + ' gives sum ' + c.s + ' carry ' + c.c);
      row.appendChild(fa);
    }
    wrap.appendChild(row);
    var sum = document.createElement('div'); sum.className = 'gtbits gtsum';
    var sl = document.createElement('span'); sl.className = 'gtlab'; sl.textContent = 'Sum'; sum.appendChild(sl);
    var co = document.createElement('span'); co.className = 'gtlampb carry' + (cols[n - 1].c ? ' on' : ''); co.textContent = cols[n - 1].c; co.title = 'carry out'; sum.appendChild(co);
    for (var k = n - 1; k >= 0; k--) { var sb = document.createElement('span'); sb.className = 'gtlampb' + (cols[k].s ? ' on' : ''); sb.textContent = cols[k].s; sum.appendChild(sb); }
    var tot = document.createElement('span'); tot.className = 'gtnum'; tot.textContent = '= ' + (A + Bn); sum.appendChild(tot);
    wrap.appendChild(sum);
    var note = document.createElement('p'); note.className = 'gtnote'; note.textContent = 'Each ' + (spec.half ? 'half' : 'full') + ' adder is a handful of gates (XOR for the sum, AND' + (spec.half ? '' : ' and OR') + ' for the carry). The carry on the far left is an extra bit.';
    wrap.appendChild(note);
    host.appendChild(wrap);
  }
  function reportAdder() {
    var n = spec.half ? 1 : spec.bits, cols = addColumns(), c = cols[n - 1].c, z = cols.filter(function (x) { return x.c; }).length;
    var text = A + ' + ' + Bn + ' = ' + (A + Bn) + ' (' + (A + Bn).toString(2).padStart(n, '0') + ' in binary)' + (c ? ': the last carry needs an extra bit' : '');
    ui.work.textContent = text; B.say(text);
    B.save({ A: A, Bn: Bn, sums: sums });
    B.post({ scope: { vars: { a: A, b: Bn, s: A + Bn, c: c, z: z, n: n, o: c, y: Object.keys(sums).length }, points: {} } }, text);
  }

  // ---------- latch mode ----------
  function settle() {
    var before = Q;
    if (S && R) { both = 1; Q = 0; } else if (S) Q = 1; else if (R) Q = 0;
    if (Q !== before) flips++;
  }
  function drawLatch() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'gtwrap gtlatch';
    var top = document.createElement('div'); top.className = 'gtlrow';
    var swc = document.createElement('div'); swc.className = 'gtlsw';
    [['R', 'Reset'], ['S', 'Set']].forEach(function (p) {
      var on = p[0] === 'S' ? S : R, b = document.createElement('button'); b.type = 'button'; b.className = 'gtsw' + (on ? ' on' : ''); b.textContent = p[1] + ' (' + p[0] + '): ' + on;
      b.setAttribute('aria-label', p[1] + ' (' + p[0] + '), ' + (on ? 'on, 1' : 'off, 0')); b.setAttribute('aria-pressed', String(!!on));
      b.addEventListener('click', function () { if (p[0] === 'S') S = 1 - S; else R = 1 - R; settle(); B.moved = true; drawLatch(); report(); });
      swc.appendChild(b);
    });
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 400 200'); svg.setAttribute('class', 'gtlsvg'); svg.setAttribute('role', 'img');
    var qb = S && R ? 0 : 1 - Q;
    var add = function (tag, at, txt) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); if (txt !== undefined) e.textContent = txt; svg.appendChild(e); return e; };
    add('path', { d: 'M0 50 H120', class: 'gtw' + (R ? ' on' : '') }); add('path', { d: 'M0 150 H120', class: 'gtw' + (S ? ' on' : '') });
    add('rect', { x: 120, y: 25, width: 90, height: 60, rx: 14, class: 'gtnor' }); add('text', { x: 165, y: 61, class: 'gttx', 'text-anchor': 'middle' }, 'NOR');
    add('rect', { x: 120, y: 115, width: 90, height: 60, rx: 14, class: 'gtnor' }); add('text', { x: 165, y: 151, class: 'gttx', 'text-anchor': 'middle' }, 'NOR');
    add('path', { d: 'M210 55 H270', class: 'gtw' + (Q ? ' on' : '') });
    add('path', { d: 'M210 145 H270', class: 'gtw' + (qb ? ' on' : '') });
    add('path', { d: 'M228 55 V92 L104 112 V135 H120', class: 'gtw fb' + (Q ? ' on' : '') });
    add('path', { d: 'M252 145 V108 L104 88 V65 H120', class: 'gtw fb' + (qb ? ' on' : '') });
    add('circle', { cx: 300, cy: 55, r: 24, class: 'gtlampc' + (Q ? ' on' : '') }); add('text', { x: 300, y: 61, class: 'gttx', 'text-anchor': 'middle' }, String(Q));
    add('circle', { cx: 300, cy: 145, r: 24, class: 'gtlampc' + (qb ? ' on' : '') }); add('text', { x: 300, y: 151, class: 'gttx', 'text-anchor': 'middle' }, String(qb));
    add('text', { x: 340, y: 60, class: 'gtsm' }, 'Q'); add('text', { x: 340, y: 150, class: 'gtsm' }, 'not Q');
    add('text', { x: 10, y: 42, class: 'gtsm' }, 'R'); add('text', { x: 10, y: 142, class: 'gtsm' }, 'S');
    svg.setAttribute('aria-label', 'Latch: Set ' + S + ', Reset ' + R + ', Q is ' + Q + '. Each NOR gate\'s output feeds back into the other.');
    top.append(swc, svg); wrap.appendChild(top);
    if (spec.reg) {
      var reg = document.createElement('div'); reg.className = 'gtreg';
      var h = document.createElement('div'); h.className = 'gthead'; h.textContent = spec.reg + '-bit register: ' + spec.reg + ' latches'; reg.appendChild(h);
      reg.appendChild(bitRow2('Data', function () { return D; }, function (v) { D = v; }, spec.reg));
      var st = document.createElement('button'); st.type = 'button'; st.className = 'gtstore'; st.textContent = 'Store';
      st.addEventListener('click', function () { V = D; stores++; B.moved = true; drawLatch(); report(); });
      reg.appendChild(st);
      var row = document.createElement('div'); row.className = 'gtbits';
      var l = document.createElement('span'); l.className = 'gtlab'; l.textContent = 'Stored'; row.appendChild(l);
      for (var i = spec.reg - 1; i >= 0; i--) { var b2 = document.createElement('span'); b2.className = 'gtlampb' + ((V >> i) & 1 ? ' on' : ''); b2.textContent = (V >> i) & 1; row.appendChild(b2); }
      var nv = document.createElement('span'); nv.className = 'gtnum'; nv.textContent = '= ' + V; row.appendChild(nv);
      reg.appendChild(row); wrap.appendChild(reg);
    }
    host.appendChild(wrap);
  }
  function bitRow2(label, get, set, n) {
    var row = document.createElement('div'); row.className = 'gtbits';
    var l = document.createElement('span'); l.className = 'gtlab'; l.textContent = label; row.appendChild(l);
    for (var i = n - 1; i >= 0; i--) (function (i) {
      var on = (get() >> i) & 1, b = document.createElement('button'); b.type = 'button'; b.className = 'gtbit' + (on ? ' on' : ''); b.textContent = on;
      b.setAttribute('aria-label', label + ' bit worth ' + Math.pow(2, i) + ', ' + (on ? 'on, 1' : 'off, 0'));
      b.addEventListener('click', function () { set(get() ^ (1 << i)); B.moved = true; drawLatch(); report(); });
      row.appendChild(b);
    })(i);
    var v = document.createElement('span'); v.className = 'gtnum'; v.textContent = '= ' + get(); row.appendChild(v);
    return row;
  }
  function reportLatch() {
    var h = !S && !R && Q ? 1 : 0;
    var text = 'Set ' + S + ', Reset ' + R + ' → Q = ' + Q + (S && R ? ' (both on: not allowed, Q and not Q are both 0)' : !S && !R ? ' (both off: Q keeps what it had)' : '') + (spec.reg ? '. Stored: ' + V : '');
    ui.work.textContent = text; B.say(text);
    B.save({ S: S, R: R, Q: Q, flips: flips, both: both, D: D, V: V, stores: stores });
    B.post({ scope: { vars: { s: S, r: R, q: Q, h: h, f: both, k: flips, d: D, v: V, w: stores }, points: {} } }, text);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function draw() { if (spec.m === 'build') drawBuild(); else if (spec.m === 'adder') drawAdder(); else drawLatch(); }
  function report() { if (spec.m === 'build') reportBuild(); else if (spec.m === 'adder') reportAdder(); else reportLatch(); }

  B.widget('gates', {
    sections: ['board', 'gpanel'],
    label: function () { return spec && spec.m === 'adder' ? 'Binary adder made of full adders' : spec && spec.m === 'latch' ? 'A latch: two NOR gates that remember a bit' : 'Build a circuit from logic gates'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    resize: function () { if (spec && spec.m === 'build' && ui.wire) ui.wire(); },
    start: function (fresh) {
      spec = B.spec; sel = null;
      var sv = fresh ? null : B.saved();
      sw = {}; spec.ins.forEach(function (x) { sw[x] = sv && sv.sw ? sv.sw[x] | 0 : 0; });
      gates = sv && Array.isArray(sv.gates) ? sv.gates : spec.gates0.map(function (g) { var src = g.src.slice(); while (src.length < KINDS[g.kind]) src.push(null); return { id: g.id, kind: g.kind, src: src }; });
      outs = {}; spec.outs.forEach(function (o) { outs[o] = sv && sv.outs ? sv.outs[o] || null : spec.wires0[o] || null; });
      tried = sv && sv.tried ? sv.tried : {}; tried[rowNow()] = 1;
      nextId = sv && sv.nextId ? sv.nextId : 1 + gates.reduce(function (m, g) { var n = +g.id.slice(1); return n > m ? n : m; }, 0);
      A = sv && sv.A !== undefined ? sv.A : spec.a0; Bn = sv && sv.Bn !== undefined ? sv.Bn : spec.b0; sums = sv && sv.sums ? sv.sums : {};
      S = sv && sv.S ? 1 : 0; R = sv && sv.R ? 1 : 0; Q = sv && sv.Q ? 1 : 0; flips = sv ? sv.flips | 0 : 0; both = sv ? sv.both | 0 : 0;
      D = sv ? sv.D | 0 : 0; V = sv ? sv.V | 0 : 0; stores = sv ? sv.stores | 0 : 0;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
