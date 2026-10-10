// Function machine: x goes through operations to an output; students undo them, last step first.
//   widget: machine
//   ops: × 2, + 3           in order; + − × ÷ (or * /) and a whole number
//   output: 11
//   var: x                  (default x)
// state: { solved, steps, x, scope }
(function (B) {
  'use strict';
  var spec = null, mach = null;
  var fmt = B.fmt, SYM = { '+': '+', '-': '−', '*': '×', '/': '÷' };

  function parseOps(text) {
    return String(text).split(',').map(function (t) {
      var m = /^\s*([+\-−*×x/÷])\s*(\d+)\s*$/.exec(t);
      if (!m) throw new Error('Each op needs a sign and a whole number, such as "× 2" or "+ 3" (got "' + t.trim() + '").');
      var o = { '−': '-', '×': '*', 'x': '*', '÷': '/' }[m[1]] || m[1];
      return { op: o, n: Number(m[2]) };
    });
  }
  var INV = { '+': '-', '-': '+', '*': '/', '/': '*' };
  var apply = function (v, o, n) { return o === '+' ? v + n : o === '-' ? v - n : o === '*' ? v * n : v / n; };
  function paintMachine() {
    var row = B.el('mrow'); row.replaceChildren();
    var box = function (text, cls) { var d = document.createElement('div'); d.className = 'mbox ' + (cls || ''); d.textContent = text; return d; };
    var k = mach.ops.length - mach.done;   // the first op not yet undone, counting from the left
    row.appendChild(box(mach.done === mach.ops.length ? spec.var + ' = ' + fmt(mach.values[0]) : spec.var, mach.done === mach.ops.length ? 'in found' : 'in'));
    mach.ops.forEach(function (o, i) {
      var d = document.createElement('div'); d.className = 'mop' + (i >= k ? ' done' : '');
      var t = document.createElement('span'); t.textContent = SYM[o.op] + ' ' + o.n;
      var arr = document.createElement('i'); arr.textContent = '→';
      var back = document.createElement('span'); back.className = 'back'; back.textContent = i >= k ? '← ' + SYM[INV[o.op]] + ' ' + o.n : '';
      d.append(t, arr, back); row.appendChild(d);
      if (i < mach.ops.length - 1) row.appendChild(box(i + 1 >= k ? fmt(mach.values[i + 1]) : '?', i + 1 >= k ? 'found' : 'unknown'));
    });
    row.appendChild(box(fmt(Number(spec.output)), 'out'));
    var ol = B.el('mhistory'); ol.replaceChildren();
    mach.steps.forEach(function (s) { var li = document.createElement('li'); li.textContent = s; ol.appendChild(li); });
    var ok = mach.done === mach.ops.length;
    if (ok) {
      var v = mach.values[0], chain = [], cur = v;
      mach.ops.forEach(function (o) { var nx = apply(cur, o.op, o.n); chain.push(fmt(cur) + ' ' + SYM[o.op] + ' ' + o.n + ' = ' + fmt(nx)); cur = nx; });
      B.say(spec.var + ' = ' + fmt(v) + '. Check forwards: ' + chain.join(', ') + ' ✓', true);
    } else B.say(mach.done ? 'Good. What did the machine do before that?' : 'Start from the output, ' + spec.output + '. Undo the last thing the machine did.');
    B.save({ done: mach.done, values: mach.values, steps: mach.steps });
    B.post({ solved: ok, steps: mach.steps.length, x: ok ? mach.values[0] : null, scope: { vars: ok ? { [spec.var]: mach.values[0] } : {} } }, ok ? spec.var + ' = ' + fmt(mach.values[0]) : mach.steps.join('; '));
  }
  function undo(o, n) {
    if (!(n >= 1) || n % 1) return B.say('Choose a whole number of 1 or more.');
    if (mach.done === mach.ops.length) return B.say('All the steps are undone. Press Start again to do it again.');
    var last = mach.ops[mach.ops.length - 1 - mach.done];
    if (INV[last.op] !== o || last.n !== n) {
      B.moved = true;
      return B.say(o === last.op && n === last.n ? 'That does the same thing again. To undo it, do the opposite.' : 'That does not undo the last step. Look at the last arrow you have not undone.');
    }
    var i = mach.ops.length - 1 - mach.done, from = mach.values[i + 1], to = apply(from, o, n);
    mach.values[i] = to; mach.done++; B.moved = true;
    mach.steps.push(fmt(from) + ' ' + SYM[o] + ' ' + n + ' = ' + fmt(to));
    paintMachine();
  }
  function startMachine(fresh) {
    var ops = parseOps(spec.ops), out = Number(spec.output), s = fresh ? null : B.saved();
    var values = new Array(ops.length + 1); values[ops.length] = out;
    mach = { ops: ops, done: s ? s.done : 0, values: s ? s.values : values, steps: s ? s.steps : [] };
    paintMachine();
  }


  B.widget('machine', {
    sections: ['machine'],
    parse: function (s) { if (!s.ops || s.output === undefined) throw new Error('The machine needs ops: and output:.'); parseOps(s.ops); },
    start: function (fresh) { spec = B.spec; startMachine(fresh); },
  });
  B.el('undo').addEventListener('click', function () { undo(B.el('undoOp').value, Number(B.el('undoN').value)); });
  B.el('mrestart').addEventListener('click', B.restart);
})(WPB);
