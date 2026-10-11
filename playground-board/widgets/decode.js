// The same numbers, read three ways: as text (character codes), as grey shades (0 black to 255 white) or as sound
// (samples around 128, which is silence). The numbers never change when the reading changes; only the rule does.
//   widget: decode
//   numbers: 72, 105, 33   the data (1 to 8 numbers, each 0 to 255: one byte)
//   as: text               the reading shown at the start: text | grey | sound | all (all three rows)
//   switch: on             buttons to change the reading (default on; off keeps the one in as:)
//   edit: on               each number can be changed (− and +, or typed)
// state: { scope: { vars: { a, b, c, … (the numbers in order), r (the reading: 1 text, 2 grey, 3 sound, 0 all) } } }
// Checks: "r = 2", "a = 255", "a = 89 and b = 101 and c = 115". (Board variables are single letters.)
(function (B) {
  'use strict';
  var spec = null, nums = [], read = 'text', ui = {};
  var READS = ['all', 'text', 'grey', 'sound'];
  var NAMES = { text: 'Text', grey: 'Grey shades', sound: 'Sound', all: 'All three' };
  var LET = 'abcdefgh';

  function parse(s) {
    s.n0 = String(s.numbers || '72, 105, 33').split(',').map(function (t) { return Number(t.trim()); });
    if (!(s.n0.length >= 1 && s.n0.length <= 8)) throw new Error('numbers: 1 to 8 numbers, separated by commas.');
    s.n0.forEach(function (v) { if (!(v >= 0 && v <= 255 && v === Math.round(v))) throw new Error('numbers: whole numbers from 0 to 255 (one byte each).'); });
    s.read0 = (s.as || 'text').toLowerCase();
    if (READS.indexOf(s.read0) < 0) throw new Error('as: text, grey, sound or all.');
    s.sw = !/^off$/i.test(s.switch || '');
    s.edit = /^on$/i.test(s.edit || '');
  }

  // One character for a code: printable ASCII, else a dot (the codes below 32 are controls such as a new line).
  function ch(v) { return v >= 32 && v <= 126 ? String.fromCharCode(v) : v === 10 ? '↵' : '·'; }
  function chName(v) { return v === 32 ? 'a space' : v >= 32 && v <= 126 ? '"' + String.fromCharCode(v) + '"' : v === 10 ? 'a new line (a control code)' : v === 127 ? 'delete (a control code)' : v > 127 ? 'not a basic character' : 'a control code (not a letter)'; }
  function greyName(v) { return v === 0 ? 'black' : v === 255 ? 'white' : v < 85 ? 'dark grey' : v < 170 ? 'mid grey' : 'light grey'; }
  function soundName(v) { var d = v - 128; return d === 0 ? 'silence (the middle)' : Math.abs(d) < 20 ? (d > 0 ? 'a little above' : 'a little below') + ' the middle' : (d > 0 ? 'well above' : 'well below') + ' the middle'; }

  function row(kind) {
    var r = document.createElement('div'); r.className = 'drow'; r.dataset.kind = kind;
    var h = document.createElement('div'); h.className = 'dhead'; h.textContent = NAMES[kind]; r.appendChild(h);
    var cells = document.createElement('div'); cells.className = 'dcells';
    nums.forEach(function (v, i) {
      var c = document.createElement('div'); c.className = 'dcell';
      if (kind === 'text') { c.classList.add('dtext'); c.textContent = ch(v); c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ', as text: ' + chName(v)); }
      if (kind === 'grey') { c.classList.add('dgrey'); c.style.background = 'rgb(' + v + ',' + v + ',' + v + ')'; c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ', as a grey shade: ' + greyName(v)); }
      if (kind === 'sound') {
        c.classList.add('dsound'); c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ', as a sound sample: ' + soundName(v));
        var bar = document.createElement('i'), d = (v - 128) / 128;
        bar.style.height = Math.max(Math.abs(d) * 50, 1.5) + '%';
        bar.style.top = (d >= 0 ? 50 - Math.abs(d) * 50 : 50) + '%';
        c.appendChild(bar);
      }
      c.setAttribute('role', 'img');
      cells.appendChild(c);
    });
    r.appendChild(cells);
    return r;
  }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'dwrap';
    // The numbers, the same in every reading.
    var nr = document.createElement('div'); nr.className = 'drow dnums';
    var nh = document.createElement('div'); nh.className = 'dhead'; nh.textContent = 'The numbers'; nr.appendChild(nh);
    var cells = document.createElement('div'); cells.className = 'dcells';
    nums.forEach(function (v, i) {
      var c = document.createElement('div'); c.className = 'dcell dnum';
      if (spec.edit) {
        var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '−'; dn.setAttribute('aria-label', 'Number ' + (i + 1) + ' one less');
        var inp = document.createElement('input'); inp.type = 'number'; inp.min = 0; inp.max = 255; inp.value = v; inp.setAttribute('aria-label', 'Number ' + (i + 1));
        var up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', 'Number ' + (i + 1) + ' one more');
        var set = function (x) { x = Math.max(0, Math.min(255, Math.round(Number(x)) || 0)); nums[i] = x; inp.value = x; B.moved = true; drawRows(); report(); };
        dn.addEventListener('click', function () { set(nums[i] - 1); });
        up.addEventListener('click', function () { set(nums[i] + 1); });
        inp.addEventListener('change', function () { set(inp.value); });
        c.append(up, inp, dn);
      } else c.textContent = v;
      cells.appendChild(c);
    });
    nr.appendChild(cells); wrap.appendChild(nr);
    ui.rows = document.createElement('div'); ui.rows.className = 'drows'; wrap.appendChild(ui.rows);
    el.appendChild(wrap); drawRows();
  }
  // The readings only: redrawn when a number or the reading changes, so the number inputs keep focus.
  function drawRows() {
    ui.rows.replaceChildren();
    (read === 'all' ? ['text', 'grey', 'sound'] : [read]).forEach(function (k) { ui.rows.appendChild(row(k)); });
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    if (spec.sw) {
      var lab = document.createElement('span'); lab.className = 'dlab'; lab.textContent = 'Read the numbers as:'; bar.appendChild(lab);
      ['text', 'grey', 'sound', 'all'].forEach(function (k) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = NAMES[k]; b.dataset.read = k;
        b.addEventListener('click', function () { read = k; B.moved = true; drawRows(); report(); });
        bar.appendChild(b);
      });
    }
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar); ui.bar = bar;
  }

  function report() {
    ui.bar.querySelectorAll('button[data-read]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.read === read)); });
    var list = nums.join(', ');
    var what = { text: 'as text: ' + nums.map(ch).join(''), grey: 'as grey shades: ' + nums.map(greyName).join(', '), sound: 'as sound: ' + nums.length + (nums.length === 1 ? ' sample' : ' samples'), all: 'as text, grey shades and sound' }[read];
    ui.work.textContent = list + '  →  ' + what;
    B.say(list + ' read ' + what);
    B.save({ nums: nums, read: read });
    var vars = { r: READS.indexOf(read) };
    nums.forEach(function (v, i) { vars[LET[i]] = v; });
    B.post({ scope: { vars: vars, points: {} } }, list + ', read ' + what);
  }

  B.widget('decode', {
    sections: ['board', 'gpanel'],
    label: function () { return 'The same numbers read as text, grey shades or sound'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      nums = sv && Array.isArray(sv.nums) && sv.nums.length === spec.n0.length ? sv.nums.slice() : spec.n0.slice();
      read = sv && READS.indexOf(sv.read) >= 0 && spec.sw ? sv.read : spec.read0;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
