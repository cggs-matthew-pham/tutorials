// Balancing chemical equations (AC9S9U07 node 4): change only the coefficients (the big numbers in front) until every
// kind of atom is the same on both sides. The formulas themselves (the subscripts) are fixed: changing one would make
// a different substance. Each molecule is drawn as balls, so the tally can be counted, not just computed.
//   widget: equation
//   equation: H2 + O2 -> H2O        formulas with element symbols and subscripts (no brackets); 2 to 5 substances
//   start: 1, 1, 1                   starting coefficients (default all 1)
// state: { scope: { vars: { b 1 while balanced, l 1 while balanced with the smallest whole numbers, c changes made,
//   m most molecules of any one substance } } }
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null;
  var MAXC = 6;
  var COL = { H: '#f4f4f4', O: '#d8453b', C: '#333a45', N: '#3b6fd8', Cl: '#3fa34d', Na: '#8a55c7', Mg: '#9aa3b1', Ca: '#b8bcc4', Fe: '#d9822b', S: '#e8c93a', K: '#8a55c7', Al: '#b9c2cf', Cu: '#c47a3a', Zn: '#a0a8b8', F: '#9ad06a', Br: '#8c2f1f', I: '#6a2c8a', P: '#e3893a', Si: '#c9b38a', Li: '#c071d8', He: '#7fd6e0', Ne: '#ff8a5c', Ar: '#7fb2e0' };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function sub(n) { return String(n).replace(/\d/g, function (d) { return '₀₁₂₃₄₅₆₇₈₉'[d]; }); }
  function parseFormula(f) {
    if (/[()\[\]]/.test(f)) throw new Error('equation: "' + f + '" has brackets; write it without them (for example Ca(OH)2 is not supported yet).');
    if (!/^([A-Z][a-z]?\d*)+$/.test(f)) throw new Error('equation: "' + f + '" is not a formula (element symbols such as H, O, Na, each with an optional number after it).');
    var atoms = [], re = /([A-Z][a-z]?)(\d*)/g, m;
    while ((m = re.exec(f))) atoms.push([m[1], m[2] ? Number(m[2]) : 1]);
    return atoms;
  }
  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
  function tally(side) {
    var t = {};
    spec.sp.forEach(function (s, i) { if (s.side !== side) return; s.atoms.forEach(function (a) { t[a[0]] = (t[a[0]] || 0) + a[1] * st.c[i]; }); });
    return t;
  }
  function balanced() { var l = tally('l'), r = tally('r'); return spec.elements.every(function (e) { return (l[e] || 0) === (r[e] || 0); }); }
  function lowest() { return st.c.reduce(gcd) === 1; }
  function dark() { return matchMedia('(prefers-color-scheme: dark)').matches; }

  function build() {
    var d = dark(), ink = d ? '#e4eaf3' : '#1d2430';
    bd = B.jsx({ boundingbox: [0, 10, 24, 0], keepAspectRatio: false });
    var n = spec.sp.length, colW = 24 / (n + 0.6), arrowAfter = spec.sp.filter(function (s) { return s.side === 'l'; }).length;
    spec.sp.forEach(function (s, i) {
      var cx = colW * (i + 0.5) + (i >= arrowAfter ? colW * 0.6 : 0);
      // Molecules stacked in this column, one row per molecule.
      for (var k = 0; k < MAXC; k++) (function (k) {
        var y = 8.8 - k * 1.3, w = s.atoms.reduce(function (t, a) { return t + a[1]; }, 0), x0 = cx - (w - 1) * 0.36;
        var idx = 0;
        s.atoms.forEach(function (a) { for (var j = 0; j < a[1]; j++) (function (sym, pos) {
          bd.create('point', [x0 + pos * 0.72, y], { name: '', size: 11, strokeColor: d ? '#0e1522' : '#5a6475', strokeWidth: 1, fillColor: COL[sym] || '#c9a227', fixed: true, highlight: false, showInfobox: false, withLabel: false, visible: function () { return k < st.c[i]; } });
          bd.create('text', [x0 + pos * 0.72, y, sym], { anchorX: 'middle', anchorY: 'middle', fontSize: 11, strokeColor: sym === 'H' || sym === 'S' || sym === 'He' ? '#1d2430' : '#ffffff', fixed: true, highlight: false, display: 'internal', visible: function () { return k < st.c[i]; } });
        })(a[0], idx++); });
      })(k);
      bd.create('text', [cx, 0.9, function () { return (st.c[i] > 1 ? st.c[i] + ' ' : '') + s.pretty; }], { anchorX: 'middle', anchorY: 'middle', fontSize: 18, strokeColor: ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
      if (i < n - 1) bd.create('text', [cx + colW * (i === arrowAfter - 1 ? 0.8 : 0.5), 0.9, i === arrowAfter - 1 ? '→' : '+'], { anchorX: 'middle', anchorY: 'middle', fontSize: 20, strokeColor: ink, fixed: true, highlight: false, display: 'internal' });
    });
    bd.update();
  }
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    spec.sp.forEach(function (s, i) {
      var row = el('div', 'srow'), lab = el('span', 'fname', (s.side === 'l' ? 'Reactant ' : 'Product ') + s.pretty);
      var minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', s.f + ': less');
      var out = el('output', '', String(st.c[i]));
      var plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', s.f + ': more');
      minus.addEventListener('click', function () { if (st.c[i] > 1) { st.c[i]--; st.n++; B.moved = true; bd.update(); paint(); report(); } });
      plus.addEventListener('click', function () { if (st.c[i] < MAXC) { st.c[i]++; st.n++; B.moved = true; bd.update(); paint(); report(); } });
      row.append(lab, minus, out, plus); panel.appendChild(row);
    });
    var l = tally('l'), r = tally('r'), tb = el('table', 'eqtally');
    var hr = el('tr'); ['Atom', 'Reactants', 'Products', ''].forEach(function (h) { hr.appendChild(el('th', '', h)); }); tb.appendChild(hr);
    spec.elements.forEach(function (e) {
      var tr = el('tr'), same = (l[e] || 0) === (r[e] || 0);
      [e, String(l[e] || 0), String(r[e] || 0), same ? '✓ same' : '✗ different'].forEach(function (v, j) { var td = el('td', j === 3 ? (same ? 'ok' : 'bad') : '', v); tr.appendChild(td); });
      tb.appendChild(tr);
    });
    panel.appendChild(tb);
    var note = el('div', 'cinfo');
    note.appendChild(el('span', '', 'Change the big numbers in front (coefficients). The small numbers inside a formula (subscripts) are fixed: changing them would make a different substance.'));
    panel.appendChild(note);
    var bar = el('div', 'fbar'), rs = el('button', 'quiet', 'Start again'); rs.type = 'button'; rs.addEventListener('click', B.restart); bar.appendChild(rs); panel.appendChild(bar);
  }
  function eqText() {
    var parts = [], arrow = false;
    spec.sp.forEach(function (s, i) {
      if (i > 0) parts.push(s.side === 'r' && !arrow ? '→' : '+');
      if (s.side === 'r') arrow = true;
      parts.push((st.c[i] > 1 ? st.c[i] + ' ' : '') + s.pretty);
    });
    return parts.join(' ');
  }
  function report() {
    var b = balanced(), lo = b && lowest();
    var vars = { b: b ? 1 : 0, l: lo ? 1 : 0, c: st.n, m: Math.max.apply(null, st.c) };
    var msg = b ? (lo ? 'Balanced: ' + eqText() + '. Every kind of atom is the same on both sides.' : 'Balanced, but every number can be divided: use the smallest whole numbers.') : 'Not balanced yet: ' + eqText() + '.';
    B.say(msg, lo);
    B.save({ st: { c: st.c, n: st.n } });
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }

  B.widget('equation', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'Balancing the equation ' + (s.equation || ''); },
    parse: function (s) {
      if (!s.equation) throw new Error('equation: write the reaction, such as "H2 + O2 -> H2O".');
      var sides = s.equation.split(/\s*->\s*|\s*→\s*/);
      if (sides.length !== 2) throw new Error('equation: put one arrow (->) between the reactants and the products.');
      s.sp = [];
      sides.forEach(function (side, k) {
        side.split('+').map(function (t) { return t.trim(); }).forEach(function (f) {
          if (!f) throw new Error('equation: a substance is missing next to a "+".');
          if (/^\d/.test(f)) throw new Error('equation: write "' + f + '" without its coefficient; students set the coefficients.');
          s.sp.push({ f: f, side: k ? 'r' : 'l', atoms: parseFormula(f), pretty: f.replace(/(\d+)/g, function (m) { return sub(m); }) });
        });
      });
      if (s.sp.length < 2 || s.sp.length > 5) throw new Error('equation: use 2 to 5 substances.');
      var L = {}, R = {};
      s.sp.forEach(function (x) { x.atoms.forEach(function (a) { (x.side === 'l' ? L : R)[a[0]] = 1; }); });
      var ls = Object.keys(L).sort().join(), rs = Object.keys(R).sort().join();
      if (ls !== rs) throw new Error('equation: the same elements must appear on both sides (reactants have ' + Object.keys(L).join(', ') + '; products have ' + Object.keys(R).join(', ') + ').');
      s.elements = Object.keys(L);
      if (s.sp.some(function (x) { return x.atoms.reduce(function (t, a) { return t + a[1]; }, 0) > 9; })) throw new Error('equation: keep each formula to 9 atoms or fewer so the molecules fit on the board.');
      if (s.start) {
        var v = s.start.split(',').map(function (t) { return Number(t.trim()); });
        if (v.length !== s.sp.length || v.some(function (x) { return !(x >= 1 && x <= MAXC) || x !== Math.round(x); })) throw new Error('start: one whole number from 1 to ' + MAXC + ' for each substance.');
        s.startC = v;
      } else s.startC = s.sp.map(function () { return 1; });
    },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved(), k = (sv && sv.st) || {};
      st = { c: spec.startC.slice(), n: 0 };
      if (k.c && k.c.length === st.c.length) { st.c = k.c; st.n = k.n || 0; }
      build(); paint(); report();
    },
    redraw: function () { build(); },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
