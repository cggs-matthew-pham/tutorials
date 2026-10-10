// Atoms (AC9S9U06, AC9S10U06): the nuclear atom drawn as a Bohr model, built particle by particle or chosen from the
// first 20 elements. Not to scale: a real nucleus is about 100 000 times smaller than the atom.
//   widget: atom
//   mode: build | table
//   build   + and − for protons, neutrons and electrons. The board names the element (from the protons), and shows the
//           atomic number, mass number, charge and the electrons in shells (2, 8, 8, 2 for elements 1 to 20).
//             start: 6, 6, 6      (protons, neutrons, electrons; default 1, 0, 1)
//             target: carbon-12   (a card naming the atom to build: an element name or symbol and a mass number;
//                                  "target: Na+ 23" asks for an ion: 11 protons, 12 neutrons, 10 electrons)
//             shells: off         (electrons drawn in one ring, for the Year 9 nuclear model before shells)
//   table   Elements 1 to 20 by group (1, 2, 13 to 18) and period. Click one to see its shells, outer shell
//           highlighted, its group and what that means for how it reacts.
//             find: Li, Na, K     (the elements to look at; default all 20)
// state: { scope: { vars } }
//   build   p protons, n neutrons, e electrons, z atomic number, a mass number, q charge, o outer electrons,
//           s shells used, t 1 while the target is built
//   table   n elements in find looked at, k elements to find, z atomic number now, o its outer electrons, g its group
(function (B) {
  'use strict';
  var spec = null, st = null, bd = null;
  var EL = [null,
    ['H', 'Hydrogen', 1], ['He', 'Helium', 18], ['Li', 'Lithium', 1], ['Be', 'Beryllium', 2], ['B', 'Boron', 13],
    ['C', 'Carbon', 14], ['N', 'Nitrogen', 15], ['O', 'Oxygen', 16], ['F', 'Fluorine', 17], ['Ne', 'Neon', 18],
    ['Na', 'Sodium', 1], ['Mg', 'Magnesium', 2], ['Al', 'Aluminium', 13], ['Si', 'Silicon', 14], ['P', 'Phosphorus', 15],
    ['S', 'Sulfur', 16], ['Cl', 'Chlorine', 17], ['Ar', 'Argon', 18], ['K', 'Potassium', 1], ['Ca', 'Calcium', 2]];
  var MAXP = 20, MAXN = 24, MAXE = 20, CAP = [2, 8, 8, 2];
  // Mass number of each element's commonest isotope (table mode draws its neutrons).
  var MASS = [0, 1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40];
  var GROUP = {
    1: 'Group 1 (alkali metals): one outer electron, easily lost, so they are very reactive metals.',
    2: 'Group 2: two outer electrons, lost fairly easily: reactive metals, less so than group 1.',
    13: 'Group 13: three outer electrons.',
    14: 'Group 14: four outer electrons, halfway to a full shell; carbon and silicon share electrons.',
    15: 'Group 15: five outer electrons, three short of a full shell.',
    16: 'Group 16: six outer electrons, two short of a full shell: they tend to gain electrons.',
    17: 'Group 17 (halogens): seven outer electrons, one short of a full shell, so they gain one easily: very reactive non-metals.',
    18: 'Group 18 (noble gases): a full outer shell, so they hardly react at all.',
  };
  var HNOTE = 'Hydrogen has one outer electron like group 1, but it is a non-metal gas; it is usually placed above group 1.';
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function shells(e) { var out = [], left = e; for (var i = 0; i < CAP.length && left > 0; i++) { var k = Math.min(CAP[i], left); out.push(k); left -= k; } return out; }
  function zOf(sym) {
    var t = String(sym).trim().toLowerCase();
    for (var z = 1; z < EL.length; z++) if (EL[z][0].toLowerCase() === t || EL[z][1].toLowerCase() === t) return z;
    return 0;
  }
  function dark() { return document.documentElement.classList.contains('dark') || matchMedia('(prefers-color-scheme: dark)').matches; }
  function cols() {
    var d = dark();
    return { ink: d ? '#e4eaf3' : '#1d2430', muted: d ? '#93a1b5' : '#5a6475', ring: d ? 'rgba(228,234,243,0.35)' : 'rgba(29,36,48,0.28)',
      outer: '#e39b4c', pro: '#d85b5b', neu: d ? '#a7b1c2' : '#9aa3b1', ele: '#2f6fb3', nuc: d ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' };
  }

  // ---------- parse ----------
  function parseTarget(v) {
    // "carbon-12", "C-12", "C 12", "Na+ 23", "Cl- 35", "O2- 16"
    var m = /^\s*([A-Za-z]+)\s*(\d*)\s*([+-]?)\s*[- ]\s*(\d+)\s*$/.exec(v);
    if (!m) throw new Error('target: write an element and a mass number, such as "carbon-12", "Na 23" or "Na+ 23".');
    var z = zOf(m[1]);
    if (!z) throw new Error('target: "' + m[1] + '" is not one of the first 20 elements.');
    var q = m[3] ? (m[3] === '+' ? 1 : -1) * (m[2] ? Number(m[2]) : 1) : 0;
    var a = Number(m[4]);
    if (a < z) throw new Error('target: the mass number (' + a + ') cannot be smaller than the atomic number (' + z + ').');
    return { z: z, a: a, q: q, p: z, n: a - z, e: z - q };
  }

  // ---------- drawing ----------
  function build() {
    var c = cols();
    bd = B.jsx({ boundingbox: [-7, 6.6, 7, -6.4], keepAspectRatio: true });
    var R0 = 1.25, RS = [2.3, 3.3, 4.3, 5.3];
    var outerIdx = function () { var sh = shells(curE()); return sh.length - 1; };
    // Shell rings.
    for (var i = 0; i < 4; i++) (function (i) {
      bd.create('circle', [[0, 0], RS[i]], { strokeColor: function () { return i === outerIdx() && st.mode === 'table' ? c.outer : c.ring; }, strokeWidth: function () { return i === outerIdx() && st.mode === 'table' ? 2.5 : 1.2; }, fillColor: 'none', fixed: true, highlight: false,
        visible: function () { return !st.oneRing && shells(curE()).length > i; } });
    })(i);
    // One ring (shells: off).
    bd.create('circle', [[0, 0], 3.3], { strokeColor: c.ring, strokeWidth: 1.2, fillColor: 'none', fixed: true, highlight: false, visible: function () { return st.oneRing && curE() > 0; } });
    // Nucleus background.
    bd.create('circle', [[0, 0], R0], { strokeColor: c.ring, strokeWidth: 1, fillColor: c.nuc, fixed: true, highlight: false });
    // Nucleons in a sunflower pattern (protons and neutrons alternate as far as the counts allow).
    var GA = Math.PI * (3 - Math.sqrt(5));
    for (var k = 0; k < MAXP + MAXN; k++) (function (k) {
      var pos = function () { var tot = curP() + curN(), sc = tot > 1 ? (R0 - 0.22) / Math.sqrt(tot) : 0, r = sc * Math.sqrt(k + 0.5), a = k * GA; return [r * Math.cos(a), r * Math.sin(a)]; };
      var kind = function () { var p = curP(), n = curN(), i = 0, pi = 0, ni = 0; for (; i <= k; i++) { var wantP = pi * n <= ni * p; if (wantP && pi < p) { if (i === k) return 'p'; pi++; } else if (ni < n) { if (i === k) return 'n'; ni++; } else { if (i === k) return 'p'; pi++; } } return 'p'; };
      bd.create('point', [function () { return pos()[0]; }, function () { return pos()[1]; }], { name: '', size: function () { var tot = curP() + curN(); return tot > 20 ? 4 : tot > 8 ? 5 : 7; }, strokeColor: 'rgba(0,0,0,0.25)', fillColor: function () { return kind() === 'p' ? c.pro : c.neu; }, fixed: true, highlight: false, showInfobox: false, withLabel: false, visible: function () { return k < curP() + curN(); } });
    })(k);
    // Electrons.
    for (var j = 0; j < MAXE; j++) (function (j) {
      var where = function () {
        var e = curE();
        if (st.oneRing) { var a1 = j / Math.max(1, e) * Math.PI * 2 + Math.PI / 2; return [3.3 * Math.cos(a1), 3.3 * Math.sin(a1), false]; }
        var sh = shells(e), idx = j, s = 0; while (s < sh.length && idx >= sh[s]) { idx -= sh[s]; s++; }
        var a = idx / sh[s] * Math.PI * 2 + Math.PI / 2 + s * 0.35;
        return [RS[s] * Math.cos(a), RS[s] * Math.sin(a), s === sh.length - 1];
      };
      bd.create('point', [function () { return where()[0]; }, function () { return where()[1]; }], { name: '', size: 5, strokeColor: '#ffffff', strokeWidth: 1.5,
        fillColor: function () { return st.mode === 'table' && where()[2] ? c.outer : c.ele; }, fixed: true, highlight: false, showInfobox: false, withLabel: false, visible: function () { return j < curE(); } });
    })(j);
    // Labels.
    bd.create('text', [0, 5.85, function () { var z = curP(); return z && EL[z] ? EL[z][1] + ' (' + EL[z][0] + ')' : z ? 'Element ' + z : 'No protons: not an element'; }], { anchorX: 'middle', anchorY: 'middle', fontSize: 16, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    bd.create('text', [5.9, -5.75, 'Not to scale'], { anchorX: 'right', anchorY: 'bottom', fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    bd.update();
  }
  function curP() { return st.mode === 'table' ? st.z : st.p; }
  function curN() { return st.mode === 'table' ? MASS[st.z] - st.z : st.n; }
  function curE() { return st.mode === 'table' ? st.z : st.e; }

  // ---------- panel ----------
  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (st.mode === 'table') return paintTable(panel);
    if (spec.targetObj) {
      var t = spec.targetObj, card = el('div', 'cinfo');
      card.appendChild(el('b', '', 'Build: ' + EL[t.z][1].toLowerCase() + '-' + t.a + (t.q ? ' ion (' + EL[t.z][0] + (Math.abs(t.q) > 1 ? Math.abs(t.q) : '') + (t.q > 0 ? '+' : '−') + ')' : ', a neutral atom') + '.'));
      card.appendChild(el('span', '', ' Atomic number ' + t.z + ', mass number ' + t.a + '.'));
      panel.appendChild(card);
    }
    [['Protons', 'p', MAXP], ['Neutrons', 'n', MAXN], ['Electrons', 'e', MAXE]].forEach(function (r) {
      var row = el('div', 'srow'), lab = el('span', 'fname', r[0]);
      var minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', r[0] + ': less');
      var out = el('output', '', String(st[r[1]]));
      var plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', r[0] + ': more');
      minus.addEventListener('click', function () { if (st[r[1]] > 0) { st[r[1]]--; B.moved = true; bd.update(); paint(); report(); } });
      plus.addEventListener('click', function () { if (st[r[1]] < r[2]) { st[r[1]]++; B.moved = true; bd.update(); paint(); report(); } });
      row.append(lab, minus, out, plus); panel.appendChild(row);
    });
    var z = st.p, a = st.p + st.n, q = st.p - st.e, sh = shells(st.e);
    var info = el('div', 'cinfo');
    var name = z && EL[z] ? EL[z][1] + '-' + a : z ? 'element ' + z : 'not an element (no protons)';
    info.appendChild(el('b', '', z ? name + (q === 0 ? ', a neutral atom.' : ', an ion with charge ' + (q > 0 ? '+' + q : '−' + (-q)) + '.') : name + '.'));
    info.appendChild(el('span', '', ' Atomic number ' + z + ' (protons) · mass number ' + a + ' (protons + neutrons) · ' + st.e + ' electrons' + (st.oneRing || !st.e ? '.' : ', in shells ' + sh.join(', ') + '.')));
    info.appendChild(el('i', '', 'Proton: charge +1, mass 1. Neutron: charge 0, mass 1. Electron: charge −1, mass about 1/1840. Nearly all the mass is in the nucleus.'));
    panel.appendChild(info);
    var bar = el('div', 'fbar'), rs = el('button', 'quiet', 'Start again'); rs.type = 'button'; rs.addEventListener('click', B.restart); bar.appendChild(rs); panel.appendChild(bar);
  }
  function paintTable(panel) {
    var grid = el('div', 'atgrid'); grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'The first 20 elements');
    var COL = { 1: 1, 2: 2, 13: 3, 14: 4, 15: 5, 16: 6, 17: 7, 18: 8 };
    var head = ['1', '2', '13', '14', '15', '16', '17', '18'];
    head.forEach(function (g) { var h = el('span', 'athead', 'Group ' + g); grid.appendChild(h); });
    for (var z = 1; z <= 20; z++) (function (z) {
      var b = el('button', 'atcell' + (st.z === z ? ' on' : '') + (st.seen[z] ? ' seen' : ''), EL[z][0]); b.type = 'button';
      b.setAttribute('aria-label', EL[z][1]); b.setAttribute('aria-pressed', String(st.z === z));
      var period = z <= 2 ? 1 : z <= 10 ? 2 : z <= 18 ? 3 : 4;
      b.style.gridRow = String(period + 1); b.style.gridColumn = String(COL[EL[z][2]]);
      var small = el('small', '', String(z)); b.prepend(small);
      b.addEventListener('click', function () { st.z = z; st.seen[z] = true; B.moved = true; bd.update(); paint(); report(); });
      grid.appendChild(b);
    })(z);
    panel.appendChild(grid);
    var info = el('div', 'cinfo'), z0 = st.z, sh = shells(z0), g = EL[z0][2];
    info.appendChild(el('b', '', EL[z0][1] + ' (' + EL[z0][0] + '): ' + z0 + ' electrons in shells ' + sh.join(', ') + '.'));
    info.appendChild(el('span', '', ' ' + sh[sh.length - 1] + ' outer electron' + (sh[sh.length - 1] === 1 ? '' : 's') + ' (orange); period ' + sh.length + ' (' + sh.length + ' shell' + (sh.length === 1 ? '' : 's') + ').'));
    info.appendChild(el('i', '', z0 === 1 ? HNOTE : z0 === 2 ? 'Group 18 (noble gases): helium’s only shell is full with 2, so it hardly reacts at all.' : GROUP[g]));
    panel.appendChild(info);
  }
  function report() {
    var vars, msg, ok = false;
    if (st.mode === 'table') {
      var n = spec.findZ.filter(function (z) { return st.seen[z]; }).length, k = spec.findZ.length, sh = shells(st.z);
      vars = { n: n, k: k, z: st.z, o: sh[sh.length - 1], g: EL[st.z][2] };
      ok = n >= k;
      msg = ok ? 'You looked at ' + (k === 20 ? 'all 20 elements' : spec.findZ.map(function (z) { return EL[z][1]; }).join(', ')) + '.' : 'Looked at ' + n + ' of ' + k + (k === 20 ? ' elements.' : ': ' + spec.findZ.map(function (z) { return EL[z][0]; }).join(', ') + '.');
      B.save({ st: { z: st.z, seen: st.seen } });
    } else {
      var shb = shells(st.e), t = spec.targetObj, hit = !!t && st.p === t.p && st.n === t.n && st.e === t.e;
      vars = { p: st.p, n: st.n, e: st.e, z: st.p, a: st.p + st.n, q: st.p - st.e, o: shb.length ? shb[shb.length - 1] : 0, s: shb.length, t: hit ? 1 : 0 };
      ok = hit;
      msg = t ? (hit ? 'That is ' + EL[t.z][1].toLowerCase() + '-' + t.a + (t.q ? ' (an ion)' : '') + '.' : 'Not yet: check the protons, neutrons and electrons against the card.') : st.p + ' protons, ' + st.n + ' neutrons, ' + st.e + ' electrons.';
      B.save({ st: { p: st.p, n: st.n, e: st.e } });
    }
    B.say(msg, ok);
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }

  B.widget('atom', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.mode === 'table' ? 'A Bohr model of an element chosen from the first 20' : 'A Bohr model of an atom: protons and neutrons in the nucleus, electrons in shells'; },
    parse: function (s) {
      s.mode = s.mode || 'build';
      if (['build', 'table'].indexOf(s.mode) < 0) throw new Error('mode: use build or table.');
      if (s.start) {
        var v = s.start.split(',').map(function (t) { return Number(t.trim()); });
        if (v.length !== 3 || v.some(function (x) { return !(x >= 0) || x !== Math.round(x); })) throw new Error('start: write protons, neutrons, electrons, such as "6, 6, 6".');
        if (v[0] > MAXP || v[1] > MAXN || v[2] > MAXE) throw new Error('start: at most ' + MAXP + ' protons, ' + MAXN + ' neutrons and ' + MAXE + ' electrons.');
        s.startV = v;
      } else s.startV = [1, 0, 1];
      s.targetObj = s.target ? parseTarget(s.target) : null;
      s.oneRing = /^off$/i.test(s.shells || '');
      var all = []; for (var z = 1; z <= 20; z++) all.push(z);
      s.findZ = s.find ? s.find.split(',').map(function (t) { var z = zOf(t); if (!z) throw new Error('find: "' + t.trim() + '" is not one of the first 20 elements.'); return z; }) : all;
    },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved(), k = (sv && sv.st) || {};
      st = { mode: spec.mode, oneRing: spec.oneRing, p: spec.startV[0], n: spec.startV[1], e: spec.startV[2], z: spec.findZ[0], seen: {} };
      Object.assign(st, k);
      build(); paint(); report();
    },
    redraw: function () { build(); },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
