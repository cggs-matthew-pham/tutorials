// The same numbers, read three ways: as text (character codes), as grey shades (0 black to 255 white) or as sound
// (samples around 128, which is silence). The numbers never change when the reading changes; only the rule does.
//   widget: decode
//   numbers: 72, 105, 33   the data (1 to 8 numbers, each 0 to 255: one byte)
//   as: text               the reading shown at the start: text | grey | sound | all (all three rows)
//   switch: on             buttons to change the reading (default on; off keeps the one in as:)
//   edit: on               each number can be changed (− and +, or typed)
//   type: on               a text box: typing a word (up to 8 characters) sets the numbers to its character codes.
//                          A character beyond one byte (an emoji, most non-Latin scripts) keeps its full Unicode code;
//                          grey and sound cannot read it, and the panel says it needs more than one byte.
//   table: on              a short code table under the board (A, a, 0 and space)
// state: { scope: { vars: { a, b, c, … (the numbers in order), n (how many numbers), u (the largest), w (spaces: 32s),
//          r (the reading: 1 text, 2 grey, 3 sound, 0 all) } } }
// Checks: "r = 2", "a = 255", "a = 89 and b = 101 and c = 115", "n = 2 and a = 104", "u > 255".
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
    s.type = /^on$/i.test(s.type || '');
    s.table = /^on$/i.test(s.table || '');
  }

  // One character for a code: printable characters as themselves; the codes below 32 are controls such as a new line.
  function ch(v) { return v === 10 ? '↵' : v < 32 || (v >= 127 && v < 160) ? '·' : String.fromCodePoint(v); }
  function chName(v) { return v === 32 ? 'a space' : v === 10 ? 'a new line (a control code)' : v < 32 || (v >= 127 && v < 160) ? 'a control code (not a letter)' : '"' + String.fromCodePoint(v) + '"'; }
  function greyName(v) { return v === 0 ? 'black' : v === 255 ? 'white' : v < 85 ? 'dark grey' : v < 170 ? 'mid grey' : 'light grey'; }
  function soundName(v) { var d = v - 128; return d === 0 ? 'silence (the middle)' : Math.abs(d) < 20 ? (d > 0 ? 'a little above' : 'a little below') + ' the middle' : (d > 0 ? 'well above' : 'well below') + ' the middle'; }

  function row(kind) {
    var r = document.createElement('div'); r.className = 'drow'; r.dataset.kind = kind;
    var h = document.createElement('div'); h.className = 'dhead'; h.textContent = NAMES[kind]; r.appendChild(h);
    var cells = document.createElement('div'); cells.className = 'dcells';
    nums.forEach(function (v, i) {
      var c = document.createElement('div'); c.className = 'dcell'; c.setAttribute('role', 'img');
      if (kind !== 'text' && v > 255) { c.classList.add('dbig'); c.textContent = '?'; c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ': too big for one byte, so it cannot be read as a ' + (kind === 'grey' ? 'grey shade' : 'sound sample')); cells.appendChild(c); return; }
      if (kind === 'text') { c.classList.add('dtext'); c.textContent = ch(v); c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ', as text: ' + chName(v)); }
      if (kind === 'grey') { c.classList.add('dgrey'); c.style.background = 'rgb(' + v + ',' + v + ',' + v + ')'; c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ', as a grey shade: ' + greyName(v)); }
      if (kind === 'sound') {
        c.classList.add('dsound'); c.setAttribute('aria-label', 'Number ' + (i + 1) + ', ' + v + ', as a sound sample: ' + soundName(v));
        var bar = document.createElement('i'), d = (v - 128) / 128;
        bar.style.height = Math.max(Math.abs(d) * 50, 1.5) + '%';
        bar.style.top = (d >= 0 ? 50 - Math.abs(d) * 50 : 50) + '%';
        c.appendChild(bar);
      }
      cells.appendChild(c);
    });
    r.appendChild(cells);
    return r;
  }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'dwrap';
    if (spec.type) {
      var tr = document.createElement('div'); tr.className = 'drow';
      var th = document.createElement('label'); th.className = 'dhead'; th.textContent = 'Type text'; th.htmlFor = 'dtype';
      var ti = document.createElement('input'); ti.type = 'text'; ti.id = 'dtype'; ti.className = 'dtype'; ti.maxLength = 16; ti.autocomplete = 'off'; ti.spellcheck = false;
      ti.value = nums.map(function (v) { return v >= 32 ? String.fromCodePoint(v) : ''; }).join('');
      ti.addEventListener('input', function () {
        var cps = Array.from(ti.value).slice(0, 8).map(function (c) { return c.codePointAt(0); });
        nums = cps.length ? cps : [32]; B.moved = true; drawNums(); drawRows(); report();
      });
      tr.append(th, ti); wrap.appendChild(tr);
    }
    // The numbers, the same in every reading.
    var nr = document.createElement('div'); nr.className = 'drow dnums';
    var nh = document.createElement('div'); nh.className = 'dhead'; nh.textContent = 'The numbers'; nr.appendChild(nh);
    ui.nums = document.createElement('div'); ui.nums.className = 'dcells'; nr.appendChild(ui.nums); wrap.appendChild(nr);
    ui.rows = document.createElement('div'); ui.rows.className = 'drows'; wrap.appendChild(ui.rows);
    if (spec.table) {
      var tb = document.createElement('p'); tb.className = 'dtable';
      tb.textContent = 'Codes: A = 65, B = 66 … Z = 90 · a = 97, b = 98 … z = 122 · 0 = 48 … 9 = 57 · space = 32';
      wrap.appendChild(tb);
    }
    el.appendChild(wrap); drawNums(); drawRows();
  }
  function drawNums() {
    ui.nums.replaceChildren();
    nums.forEach(function (v, i) {
      var c = document.createElement('div'); c.className = 'dcell dnum';
      if (spec.edit) {
        var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '−'; dn.setAttribute('aria-label', 'Number ' + (i + 1) + ' one less');
        var inp = document.createElement('input'); inp.type = 'number'; inp.min = 0; inp.max = 255; inp.value = v; inp.setAttribute('aria-label', 'Number ' + (i + 1));
        var up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', 'Number ' + (i + 1) + ' one more');
        var set = function (x) { x = Math.max(0, Math.min(255, Math.round(Number(x)) || 0)); nums[i] = x; inp.value = x; B.moved = true; syncType(); drawRows(); report(); };
        dn.addEventListener('click', function () { set(nums[i] - 1); });
        up.addEventListener('click', function () { set(nums[i] + 1); });
        inp.addEventListener('change', function () { set(inp.value); });
        c.append(up, inp, dn);
      } else { c.textContent = v; if (v > 255) c.classList.add('dwide'); }
      ui.nums.appendChild(c);
    });
  }
  function syncType() { var t = B.el('board').querySelector('#dtype'); if (t) t.value = nums.map(function (v) { return v >= 32 ? String.fromCodePoint(v) : ''; }).join(''); }
  // The readings only: redrawn when a number or the reading changes, so inputs keep focus.
  function drawRows() {
    ui.rows.replaceChildren();
    (read === 'all' ? ['text', 'grey', 'sound'] : [read]).forEach(function (k) { ui.rows.appendChild(row(k)); });
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui.work = null;
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
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
    var list = nums.join(', '), u = Math.max.apply(null, nums);
    var what = { text: 'as text: ' + nums.map(ch).join(''), grey: 'as grey shades', sound: 'as sound: ' + nums.length + (nums.length === 1 ? ' sample' : ' samples'), all: 'as text, grey shades and sound' }[read];
    ui.work.textContent = list + '  →  ' + what;
    ui.note.textContent = u > 255 ? 'A code above 255 does not fit in one byte, so Unicode stores it in two to four bytes.' : '';
    B.say(list + ' read ' + what);
    B.save({ nums: nums, read: read });
    var vars = { r: READS.indexOf(read), n: nums.length, u: u, w: nums.filter(function (v) { return v === 32; }).length };
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
      var ok = sv && Array.isArray(sv.nums) && sv.nums.length >= 1 && (spec.type || sv.nums.length === spec.n0.length);
      nums = ok ? sv.nums.slice() : spec.n0.slice();
      read = sv && READS.indexOf(sv.read) >= 0 && spec.sw ? sv.read : spec.read0;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
