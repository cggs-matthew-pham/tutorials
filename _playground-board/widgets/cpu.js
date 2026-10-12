// A tiny processor: 16 memory cells, a program counter (PC), an instruction register (IR) and an accumulator (ACC).
// Each clock tick is one phase: fetch (IR = memory[PC], PC + 1), decode (work out the instruction), execute (do it).
//   widget: cpu
//   program: LOAD 6; ADD 7; OUT; HALT     cells from 0 (instructions, or plain numbers)
//   data: 6=5, 7=3                        numbers in other cells
//   edit: on                              memory cells can be typed into ("ADD 7" or a number)
//   expect: 8                             outputs wanted, in order (gives x)
//   watch: 9                              the cell reported as v
// Instructions are numbers too: code = operation × 16 + address. 0 HALT, 1 LOAD a (ACC = cell a), 2 ADD a, 3 SUB a,
// 4 STORE a (cell a = ACC), 5 JUMP a, 6 JZ a (jump if ACC is 0), 7 OUT (show ACC). Numbers wrap at 256 (8 bits).
// state: { scope: { vars: { p (PC), a (ACC), t (clock ticks), i (instructions done), h (1 halted), o (last output, −1
//          none), n (outputs), x (1 when halted and the outputs are exactly the expected ones), v (the watched cell),
//          e (1 if stopped by an error or too many steps), q (cells changed by typing), f (phase: 0 fetch next,
//          1 decode next, 2 execute next) } } }
// Checks: "h = 1 and o = 8", "t >= 3", "x = 1", "h = 1 and v = 12".
(function (B) {
  'use strict';
  var spec = null, ui = {}, mem = [], start = [], pc = 0, ir = 0, acc = 0, phase = 0, ticks = 0, done = 0, halted = 0, outs = [], err = '', timer = null, typed = {};
  var OPS = ['HALT', 'LOAD', 'ADD', 'SUB', 'STORE', 'JUMP', 'JZ', 'OUT'], HAS_ADDR = [0, 1, 1, 1, 1, 1, 1, 0], LIMIT = 600;
  var SAY = [
    'stop', 'copy cell {a} into ACC', 'add cell {a} to ACC', 'take cell {a} away from ACC', 'copy ACC into cell {a}',
    'go to cell {a} next', 'if ACC is 0, go to cell {a} next', 'show ACC as output',
  ];

  function enc(text) {
    var t = String(text).trim().toUpperCase();
    if (/^\d+$/.test(t)) { var n = +t; return n <= 255 ? n : null; }
    var m = /^([A-Z]+)(?:\s+(\d+))?$/.exec(t); if (!m) return null;
    var op = OPS.indexOf(m[1]); if (op < 0) return null;
    var a = m[2] === undefined ? 0 : +m[2];
    if (HAS_ADDR[op] && m[2] === undefined) return null;
    if (a > 15) return null;
    return op * 16 + a;
  }
  var dec = function (v) { var op = v >> 4, a = v & 15; return op < OPS.length ? OPS[op] + (HAS_ADDR[op] ? ' ' + a : '') : null; };
  var means = function (v) { var op = v >> 4, a = v & 15; return op < OPS.length ? SAY[op].replace('{a}', a) : '(not an instruction)'; };

  function parse(s) {
    s.mem0 = []; for (var i = 0; i < 16; i++) s.mem0.push(0);
    String(s.program || '').split(';').map(function (x) { return x.trim(); }).filter(Boolean).forEach(function (x, i) {
      if (i > 15) throw new Error('program: 16 cells at most.');
      var v = enc(x); if (v === null) throw new Error('program: "' + x + '" is not an instruction or a number from 0 to 255.');
      s.mem0[i] = v;
    });
    String(s.data || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean).forEach(function (x) {
      var m = /^(\d+)\s*=\s*(\d+)$/.exec(x); if (!m || +m[1] > 15 || +m[2] > 255) throw new Error('data: cell=number, cells 0 to 15, numbers 0 to 255.');
      s.mem0[+m[1]] = +m[2];
    });
    s.edit = /^on$/i.test(s.edit || '');
    s.expect0 = s.expect === undefined ? null : String(s.expect).split(',').map(function (x) { return +x.trim(); });
    s.watch0 = s.watch === undefined ? -1 : Number(s.watch);
  }

  function reset() { stop(); pc = 0; ir = 0; acc = 0; phase = 0; ticks = 0; done = 0; halted = 0; outs = []; err = ''; mem = start.slice(); }
  function tick() {
    if (halted) return;
    ticks++;
    if (phase === 0) { if (pc > 15) { err = 'The program ran off the end of memory (no HALT).'; halted = 1; return; } ir = mem[pc]; pc++; phase = 1; return; }
    if (phase === 1) { phase = 2; return; }
    var op = ir >> 4, a = ir & 15; phase = 0; done++;
    if (op >= OPS.length) { err = 'Cell ' + (pc - 1) + ' holds ' + ir + ', which is not an instruction.'; halted = 1; return; }
    if (op === 0) halted = 1;
    else if (op === 1) acc = mem[a];
    else if (op === 2) acc = (acc + mem[a]) % 256;
    else if (op === 3) acc = (acc - mem[a] + 256) % 256;
    else if (op === 4) mem[a] = acc;
    else if (op === 5) pc = a;
    else if (op === 6) { if (acc === 0) pc = a; }
    else if (op === 7) outs.push(acc);
    if (ticks >= LIMIT && !halted) { err = 'Stopped after ' + LIMIT + ' ticks: does the program loop for ever?'; halted = 1; }
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function act(fn) { return function () { B.moved = true; fn(); draw(); report(); }; }

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'cpwrap';
    // Memory
    var memBox = document.createElement('div'); memBox.className = 'cpmem';
    var t = document.createElement('table'); t.className = 'cptable';
    var hd = document.createElement('tr'); ['Cell', 'Holds', 'If run as an instruction'].forEach(function (h) { var th = document.createElement('th'); th.textContent = h; hd.appendChild(th); }); t.appendChild(hd);
    for (var i = 0; i < 16; i++) (function (i) {
      var tr = document.createElement('tr'); if (i === pc && !halted) tr.className = 'pc'; if (i === spec.watch0) tr.className += ' watch';
      var c0 = document.createElement('td'); c0.textContent = i; tr.appendChild(c0);
      var c1 = document.createElement('td');
      if (spec.edit) {
        var inp = document.createElement('input'); inp.type = 'text'; inp.className = 'cpin'; inp.setAttribute('aria-label', 'Memory ' + i); inp.spellcheck = false;
        inp.value = typed[i] !== undefined ? typed[i] : (dec(mem[i]) && i <= firstData() ? dec(mem[i]) : String(mem[i]));
        inp.addEventListener('change', function () {
          var v = enc(inp.value);
          if (v === null) { inp.classList.add('bad'); B.say('Cell ' + i + ': type an instruction such as ADD 7, or a number from 0 to 255.'); return; }
          typed[i] = inp.value.trim().toUpperCase(); start[i] = v; B.moved = true; reset(); draw(); report();
        });
        c1.appendChild(inp);
        var code = document.createElement('small'); code.className = 'cpcode'; code.textContent = ' = ' + mem[i]; c1.appendChild(code);
      } else c1.textContent = (dec(mem[i]) && i <= firstData() ? dec(mem[i]) + ' = ' : '') + mem[i];
      tr.appendChild(c1);
      var c2 = document.createElement('td'); c2.className = 'cpmean'; c2.textContent = means(mem[i]); tr.appendChild(c2);
      t.appendChild(tr);
    })(i);
    memBox.appendChild(t);
    // CPU
    var cpu = document.createElement('div'); cpu.className = 'cpcpu';
    var h = document.createElement('div'); h.className = 'cphead'; h.textContent = 'Processor'; cpu.appendChild(h);
    var regs = document.createElement('div'); regs.className = 'cpregs';
    [['PC', pc, 'program counter: the cell to fetch next'], ['IR', ticks ? (dec(ir) || ir) : '–', 'instruction register: the instruction being done'], ['ACC', acc, 'accumulator: ' + acc.toString(2).padStart(8, '0')]].forEach(function (r) {
      var d = document.createElement('div'); d.className = 'cpreg'; d.innerHTML = '<b></b><output></output><small></small>';
      d.children[0].textContent = r[0]; d.children[1].textContent = r[1]; d.children[2].textContent = r[2]; regs.appendChild(d);
    });
    cpu.appendChild(regs);
    var ph = document.createElement('div'); ph.className = 'cpphase';
    ['Fetch', 'Decode', 'Execute'].forEach(function (n, k) { var s = document.createElement('span'); s.textContent = n; if (!halted && k === phase) s.className = 'next'; ph.appendChild(s); });
    cpu.appendChild(ph);
    var info = document.createElement('p'); info.className = 'cpinfo';
    info.textContent = halted ? (err || 'Halted.') : phase === 0 ? 'Next: fetch the instruction in cell ' + pc + '.' : phase === 1 ? 'Next: decode ' + (dec(ir) || ir) + '.' : 'Next: execute: ' + means(ir) + '.';
    if (err) info.classList.add('bad');
    cpu.appendChild(info);
    var bar = document.createElement('div'); bar.className = 'cpbar';
    var b1 = document.createElement('button'); b1.type = 'button'; b1.textContent = 'Clock tick'; b1.disabled = !!halted; b1.addEventListener('click', act(function () { stop(); tick(); }));
    var b2 = document.createElement('button'); b2.type = 'button'; b2.textContent = 'Whole instruction'; b2.disabled = !!halted; b2.addEventListener('click', act(function () { stop(); do tick(); while (phase !== 0 && !halted); }));
    var b3 = document.createElement('button'); b3.type = 'button'; b3.textContent = timer ? 'Pause' : 'Run'; b3.disabled = !!halted; b3.className = 'go';
    b3.addEventListener('click', act(function () { if (timer) { stop(); return; } timer = setInterval(function () { tick(); if (halted) stop(); draw(); report(); }, 150); }));
    var b4 = document.createElement('button'); b4.type = 'button'; b4.textContent = 'Reset'; b4.addEventListener('click', act(reset));
    bar.append(b1, b2, b3, b4); cpu.appendChild(bar);
    var ck = document.createElement('p'); ck.className = 'cpticks'; ck.textContent = 'Clock ticks: ' + ticks + ' · instructions done: ' + done; cpu.appendChild(ck);
    var out = document.createElement('div'); out.className = 'cpout'; out.innerHTML = '<b>Output</b> ';
    var ov = document.createElement('span'); ov.textContent = outs.length ? outs.join(', ') : '(nothing yet)'; out.appendChild(ov);
    if (spec.expect0) { var ex = document.createElement('small'); ex.textContent = '  wanted: ' + spec.expect0.join(', '); out.appendChild(ex); }
    cpu.appendChild(out);
    wrap.append(memBox, cpu);
    host.appendChild(wrap);
  }
  function firstData() { // cells after the first HALT in the program are shown as plain numbers
    for (var i = 0; i < 16; i++) if (start[i] === 0 && i > 0) return i;
    return 16;
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', function () { stop(); B.restart(); });
    bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    var x = halted && !err && spec.expect0 && outs.length === spec.expect0.length && outs.every(function (v, i) { return v === spec.expect0[i]; }) ? 1 : 0;
    var text = 'PC ' + pc + ', ACC ' + acc + ', ticks ' + ticks + (outs.length ? ', output ' + outs.join(', ') : '') + (halted ? (err ? '. ' + err : '. Halted') : '');
    ui.work.textContent = text; if (!timer) B.say(text);
    B.save({ start: start, typed: typed });
    B.post({ scope: { vars: {
      p: pc, a: acc, t: ticks, i: done, h: halted, o: outs.length ? outs[outs.length - 1] : -1, n: outs.length, x: x,
      v: spec.watch0 >= 0 ? mem[spec.watch0] : -1, e: err ? 1 : 0, q: Object.keys(typed).length, f: phase,
    }, points: {} } }, text);
  }

  B.widget('cpu', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A tiny processor with 16 memory cells'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      stop(); spec = B.spec;
      var sv = fresh ? null : B.saved();
      start = sv && Array.isArray(sv.start) && sv.start.length === 16 ? sv.start : spec.mem0.slice();
      typed = sv && sv.typed ? sv.typed : {};
      reset(); paintPanel(); draw(); report();
    },
  });
})(WPB);
