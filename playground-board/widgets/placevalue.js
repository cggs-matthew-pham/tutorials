// Place value columns: each column has a power of 10 (10⁰, 10¹, 10²…) and a digit 0 to 9 (also drawn as that many counters), so a number is "digit × power of 10"
// added up: expanded notation.
//   widget: placevalue
//   places: 5          how many columns (2 to 8: ones up to ten millions)
//   n: 4052            the starting number
//   shift: on          also give ×10 and ÷10 buttons (every digit moves one column)
//   names: off         hide the column names (ones, tens, …), so only the powers show
// state: { scope: { vars: { n (the number), z (how many digits are not 0), t (the highest power of 10 with a digit) } } }
// Checks: "n = 4052", "n = 60009", "z = 2 and t = 5". (Board variables are single letters.)
(function (B) {
  'use strict';
  var spec = null, dig = [], ui = {};
  var SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  var sup = function (n) { return String(n).split('').map(function (c) { return SUP[+c]; }).join(''); };
  var NAMES = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'];

  function parse(s) {
    s.k = s.places === undefined ? 5 : Number(s.places);
    if (!(s.k >= 2 && s.k <= 8 && s.k === Math.round(s.k))) throw new Error('places: a whole number from 2 to 8.');
    s.start = s.n === undefined ? 0 : Number(s.n);
    if (!(s.start >= 0 && s.start === Math.round(s.start) && s.start < Math.pow(10, s.k))) throw new Error('n: a whole number that fits in ' + s.k + ' places.');
    s.shift = /^on$/i.test(s.shift || '');
    s.names = !/^off$/i.test(s.names || '');
  }
  function num() { var n = 0; for (var i = 0; i < dig.length; i++) n += dig[i] * Math.pow(10, i); return n; }
  function setN(n) { dig = []; for (var i = 0; i < spec.k; i++) { dig.push(n % 10); n = Math.floor(n / 10); } }
  function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var row = document.createElement('div'); row.className = 'pvrow'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Place value columns');
    for (var i = spec.k - 1; i >= 0; i--) (function (i) {
      var col = document.createElement('div'); col.className = 'pvcol';
      var pw = document.createElement('div'); pw.className = 'pvpow'; pw.innerHTML = '10<sup>' + i + '</sup>';
      col.appendChild(pw);
      var nm = document.createElement('div'); nm.className = 'pvname'; nm.textContent = spec.names ? NAMES[i] : ' '; col.appendChild(nm);
      var one = i === 0 ? '' : ' ' + NAMES[i].replace(/s$/, '');
      var up = document.createElement('button'); up.type = 'button'; up.textContent = '▲'; up.setAttribute('aria-label', 'Add one' + one + ' (10 to the power ' + i + ')');
      var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '▼'; dn.setAttribute('aria-label', 'Take one' + one + ' (10 to the power ' + i + ')');
      var dg = document.createElement('div'); dg.className = 'pvdig'; dg.id = 'pv-' + i;
      var val = document.createElement('div'); val.className = 'pvval'; val.id = 'pvv-' + i;
      var ct = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); ct.setAttribute('viewBox', '0 0 54 54'); ct.setAttribute('width', '54'); ct.setAttribute('height', '54'); ct.setAttribute('class', 'pvdots'); ct.setAttribute('id', 'pvs-' + i); ct.setAttribute('aria-hidden', 'true');
      up.addEventListener('click', function () { if (dig[i] < 9) { dig[i]++; B.moved = true; report(); } });
      dn.addEventListener('click', function () { if (dig[i] > 0) { dig[i]--; B.moved = true; report(); } });
      col.append(up, dg, dn, ct, val); row.appendChild(col);
    })(i);
    el.appendChild(row);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.shift) {
      var t = document.createElement('button'); t.type = 'button'; t.textContent = '× 10'; t.setAttribute('aria-label', 'Times ten: every digit moves one column left');
      t.addEventListener('click', function () { if (dig[spec.k - 1] === 0) { setN(num() * 10); B.moved = true; report(); } else ui.note.textContent = 'There is no column left for that digit.'; });
      var d = document.createElement('button'); d.type = 'button'; d.textContent = '÷ 10'; d.setAttribute('aria-label', 'Divide by ten: every digit moves one column right');
      d.addEventListener('click', function () { if (dig[0] === 0) { setN(num() / 10); B.moved = true; report(); } else ui.note.textContent = 'A digit in the ones column would drop below the ones: this board keeps whole numbers.'; });
      bar.append(t, d);
    }
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    var n = num(), z = 0, top = 0, terms = [], parts = [];
    for (var i = dig.length - 1; i >= 0; i--) {
      var d = dig[i];
      var dgEl = B.el('board').querySelector('#pv-' + i), vEl = B.el('board').querySelector('#pvv-' + i);
      if (dgEl) dgEl.textContent = d;
      var ctEl = B.el('board').querySelector('#pvs-' + i);
      if (ctEl) { var dots = ''; for (var q = 0; q < d; q++) dots += '<circle cx="' + (12 + (q % 3) * 15) + '" cy="' + (12 + Math.floor(q / 3) * 15) + '" r="6" fill="var(--accent, #c2570a)" fill-opacity="0.55" stroke="var(--accent, #c2570a)" stroke-width="1.5"/>'; ctEl.innerHTML = dots; }
      if (vEl) vEl.textContent = d ? d + ' × ' + Math.pow(10, i) : '';
      if (d) { z++; if (!terms.length) top = i; terms.push(d + ' × 10' + sup(i)); parts.push(String(d * Math.pow(10, i))); }
    }
    ui.work.textContent = n === 0 ? '0' : terms.join(' + ');
    ui.note.textContent = n === 0 ? 'Every column is 0.' : (terms.length > 1 ? parts.join(' + ') + ' = ' : '') + commas(n);
    B.say(commas(n) + (n ? ' is ' + terms.join(' plus ') : ''));
    B.save({ n: n });
    var vars = { n: n, z: z, t: top };
    B.post({ scope: { vars: vars, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('placevalue', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Place value columns, each with a power of 10 and a digit'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      setN(sv && sv.n !== undefined && sv.n < Math.pow(10, spec.k) ? sv.n : spec.start);
      paintPanel(); draw(); report();
    },
  });
})(WPB);
