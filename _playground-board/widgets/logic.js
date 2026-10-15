// Logic gates: two switches (inputs A and B, each 0 or 1) feed a gate, whose output lights a lamp. A truth table fills
// in as each combination of inputs is tried.
//   widget: logic
//   gate: and              and | or | not | xor | adder (a half adder: sum = A XOR B, carry = A AND B)
//   choose: on             buttons to switch between AND, OR and NOT (and XOR with choose: all)
//   view: gate             gate (a gate symbol) | circuit (a battery, two switches and a lamp: in a line for AND,
//                          side by side for OR; other gates show as gate)
//   mystery: on            the gate's name is hidden ("?"): find it from the truth table
//   table: off             hide the truth table
// state: { scope: { vars: { a, b (inputs), o (output; the sum for the adder), c (the adder's carry),
//          t (rows of the truth table tried), g (gate: 1 AND, 2 OR, 3 NOT, 4 XOR, 5 adder) } } }
// Checks: "t = 4", "g = 2 and a = 1 and b = 0 and o = 1", "c = 1 and o = 0".
(function (B) {
  'use strict';
  var spec = null, a = 0, b = 0, gate = 'and', tried = {}, ui = {};
  var GATES = ['and', 'or', 'not', 'xor', 'adder'];
  var NAME = { and: 'AND', or: 'OR', not: 'NOT', xor: 'XOR', adder: 'Half adder' };
  var NS = 'http://www.w3.org/2000/svg';

  function parse(s) {
    s.g0 = String(s.gate || 'and').toLowerCase();
    if (GATES.indexOf(s.g0) < 0) throw new Error('gate: and, or, not, xor or adder.');
    s.choose = /^(on|all)$/i.test(s.choose || ''); s.chooseAll = /^all$/i.test(s.choose || '');
    s.circuit = /^circuit$/i.test(s.view || '');
    s.mystery = /^on$/i.test(s.mystery || '');
    s.table = !/^off$/i.test(s.table || '');
  }
  function out(g, x, y) { return g === 'and' ? x & y : g === 'or' ? x | y : g === 'not' ? 1 - x : g === 'xor' ? x ^ y : x ^ y; }
  var carry = function () { return gate === 'adder' ? a & b : 0; };
  var oneIn = function () { return gate === 'not'; };
  var rowKey = function () { return oneIn() ? String(a) : a + '' + b; };

  function el(tag, at, parent) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; }
  function text(x, y, t, cls, parent) { var e = el('text', { x: x, y: y, class: cls || 'lgt', 'text-anchor': 'middle' }, parent); e.textContent = t; return e; }

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'lgwrap';
    var sw = document.createElement('div'); sw.className = 'lgsw';
    ui.btn = {};
    (oneIn() ? ['A'] : ['A', 'B']).forEach(function (n) {
      var b2 = document.createElement('button'); b2.type = 'button'; b2.className = 'lgswitch';
      b2.addEventListener('click', function () { tried[rowKey()] = 1; if (n === 'A') a = 1 - a; else b = 1 - b; B.moved = true; tried[rowKey()] = 1; paint(); report(); });
      sw.appendChild(b2); ui.btn[n] = b2;
    });
    var svg = el('svg', { viewBox: '0 0 420 220', class: 'lgsvg', role: 'img' });
    ui.svg = svg;
    wrap.append(sw, svg);
    if (spec.table) { ui.table = document.createElement('table'); ui.table.className = 'lgtable'; wrap.appendChild(ui.table); }
    host.appendChild(wrap);
    paint();
  }

  function wire(d, on, parent) { return el('path', { d: d, class: 'lgw' + (on ? ' on' : '') }, parent); }
  function paint() {
    var o = out(gate, a, b), c = carry(), svg = ui.svg; svg.replaceChildren();
    ['A', 'B'].forEach(function (n) {
      var v = n === 'A' ? a : b, btn = ui.btn[n]; if (!btn) return;
      btn.textContent = n + ': ' + (v ? 'ON (1)' : 'OFF (0)'); btn.classList.toggle('on', !!v);
      btn.setAttribute('aria-pressed', String(!!v)); btn.setAttribute('aria-label', 'Switch ' + n + ', ' + (v ? 'on, 1' : 'off, 0'));
    });
    var circuit = spec.circuit && (gate === 'and' || gate === 'or');
    if (circuit) {
      // A battery, two switches and a lamp. AND: switches in a line. OR: switches side by side.
      el('rect', { x: 20, y: 80, width: 22, height: 60, rx: 4, class: 'lgbat' }, svg); text(78, 114, 'battery', 'lgs', svg);
      var sw = function (x, y, on) { el('circle', { cx: x, cy: y, r: 4, class: 'lgdot' }, svg); el('circle', { cx: x + 40, cy: y, r: 4, class: 'lgdot' }, svg); el('line', { x1: x, y1: y, x2: on ? x + 40 : x + 34, y2: on ? y : y - 22, class: 'lgw' + (on ? ' on' : ''), 'stroke-width': 5 }, svg); };
      if (gate === 'and') {
        wire('M31 80 V40 H120', o, svg); sw(120, 40, a); text(140, 64, 'A', 'lgs', svg);
        wire('M160 40 H220', o, svg); sw(220, 40, b); text(240, 64, 'B', 'lgs', svg);
        wire('M260 40 H350 V90', o, svg); wire('M350 150 V190 H31 V140', o, svg);
      } else {
        wire('M31 80 V40 H90', o, svg); wire('M90 40 V30 H150 M90 40 V90 H150', o, svg);
        sw(150, 30, a); text(170, 52, 'A', 'lgs', svg); sw(150, 90, b); text(170, 112, 'B', 'lgs', svg);
        wire('M190 30 H250 V90 M190 90 H250 M250 60 H350 V90', o, svg); wire('M350 150 V190 H31 V140', o, svg);
      }
      el('circle', { cx: 350, cy: 120, r: 30, class: 'lglamp' + (o ? ' on' : '') }, svg);
      text(350, 126, o ? 'ON' : 'off', 'lgs', svg);
      svg.setAttribute('aria-label', 'Circuit: switches ' + (gate === 'and' ? 'in a line' : 'side by side') + '. The lamp is ' + (o ? 'on' : 'off'));
    } else {
      var label = spec.mystery ? '?' : NAME[gate];
      if (oneIn()) wire('M10 110 H150', a, svg);
      else { wire('M10 70 H150', a, svg); wire('M10 150 H150', b, svg); }
      text(20, oneIn() ? 100 : 60, 'A', 'lgs', svg); if (!oneIn()) text(20, 140, 'B', 'lgs', svg);
      el('rect', { x: 150, y: 50, width: 120, height: 120, rx: 18, class: 'lggate' }, svg);
      text(210, gate === 'adder' ? 105 : 118, label, 'lgt', svg);
      if (gate === 'adder' && !spec.mystery) text(210, 132, '(XOR and AND)', 'lgs', svg);
      if (gate === 'adder') {
        wire('M270 80 H330', o, svg); wire('M270 140 H330', c, svg);
        el('circle', { cx: 360, cy: 80, r: 22, class: 'lglamp' + (o ? ' on' : '') }, svg); text(360, 86, String(o), 'lgt', svg); text(360, 120, 'sum', 'lgs', svg);
        el('circle', { cx: 360, cy: 160, r: 22, class: 'lglamp' + (c ? ' on' : '') }, svg); text(360, 166, String(c), 'lgt', svg); text(360, 200, 'carry', 'lgs', svg);
        svg.setAttribute('aria-label', 'Half adder: ' + a + ' + ' + b + ' gives carry ' + c + ', sum ' + o);
      } else {
        wire('M270 110 H320', o, svg);
        el('circle', { cx: 355, cy: 110, r: 30, class: 'lglamp' + (o ? ' on' : '') }, svg); text(355, 118, String(o), 'lgt', svg);
        svg.setAttribute('aria-label', label + ' gate: output ' + o);
      }
    }
    if (ui.table) {
      ui.table.replaceChildren();
      var hd = document.createElement('tr');
      (oneIn() ? ['A'] : ['A', 'B']).concat(gate === 'adder' ? ['carry', 'sum'] : ['out']).forEach(function (h) { var th = document.createElement('th'); th.textContent = h; hd.appendChild(th); });
      ui.table.appendChild(hd);
      (oneIn() ? ['0', '1'] : ['00', '01', '10', '11']).forEach(function (k) {
        var tr = document.createElement('tr'), x = +k[0], y = k.length > 1 ? +k[1] : 0, seen = !!tried[k];
        if (k === rowKey()) tr.className = 'now';
        k.split('').forEach(function (d) { var td = document.createElement('td'); td.textContent = d; tr.appendChild(td); });
        (gate === 'adder' ? [x & y, x ^ y] : [out(gate, x, y)]).forEach(function (v) { var td = document.createElement('td'); td.textContent = seen ? v : '?'; tr.appendChild(td); });
        ui.table.appendChild(tr);
      });
    }
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar'; ui.gb = [];
    if (spec.choose) {
      var lab = document.createElement('span'); lab.className = 'dlab'; lab.textContent = 'Gate:'; bar.appendChild(lab);
      (spec.chooseAll ? ['and', 'or', 'not', 'xor'] : ['and', 'or', 'not']).forEach(function (g) {
        var x = document.createElement('button'); x.type = 'button'; x.textContent = NAME[g]; x.dataset.g = g;
        x.addEventListener('click', function () { gate = g; tried = {}; B.moved = true; tried[rowKey()] = 1; draw(); report(); });
        bar.appendChild(x); ui.gb.push(x);
      });
    }
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    ui.gb.forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.g === gate)); });
    var o = out(gate, a, b), c = carry(), nm = spec.mystery ? 'the mystery gate' : NAME[gate];
    var t = Object.keys(tried).length;
    ui.work.textContent = gate === 'adder' ? a + ' + ' + b + ' = ' + c + o + ' in binary (carry ' + c + ', sum ' + o + ')' : oneIn() ? nm + ' ' + a + ' = ' + o : a + ' ' + (spec.mystery ? '?' : NAME[gate]) + ' ' + b + ' = ' + o;
    B.say(ui.work.textContent + (spec.table ? '. Rows tried: ' + t + ' of ' + (oneIn() ? 2 : 4) : ''));
    B.save({ a: a, b: b, gate: gate, tried: tried });
    B.post({ scope: { vars: { a: a, b: b, o: o, c: c, t: t, g: GATES.indexOf(gate) + 1 }, points: {} } }, ui.work.textContent);
  }

  B.widget('logic', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Logic gate with two switches and a lamp'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      gate = sv && GATES.indexOf(sv.gate) >= 0 && (spec.choose || sv.gate === spec.g0) ? sv.gate : spec.g0;
      a = sv ? sv.a | 0 : 0; b = sv ? sv.b | 0 : 0;
      tried = sv && sv.tried && typeof sv.tried === 'object' ? sv.tried : {};
      paintPanel(); draw(); report();
    },
  });
})(WPB);
