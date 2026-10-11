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
//             colour: shells | outer | metal   (shade the table by shells used, outer electrons, or metal,
//                                  metalloid and non-metal, with a key)
//   decay   One nucleus (any element up to americium, 95) and three buttons: Alpha, Beta, Gamma. Each shows what leaves the
//           nucleus and the new atomic and mass numbers; the board says whether that is how the isotope really decays
//           (for the common ones it knows) and when it has reached a stable isotope.
//             isotope: radon-222  (or "Rn-222", "C 14"; default uranium-238)
//   halflife  A sample of nuclei of one isotope decaying at random, with a graph of how many are left. Run, Pause,
//           Wait one half-life, Start again (a new random sample).
//             isotope: iodine-131 (one with a known half-life: F-18, I-131, Rn-222, Po-210, H-3, Co-60, Sr-90,
//                                  Cs-137, Am-241, Ra-226, C-14, K-40, U-238; default iodine-131)
//             nuclei: 100         (4 to 400; default 100)
//             run: 3              (half-lives already run at the start, with a fixed sample, for a picture)
//   shield  A source and three barriers (paper, aluminium, lead): fire alpha, beta or gamma and see how far each gets.
//             fired: alpha, beta, gamma   (already fired at the start, for a picture)
// state: { scope: { vars } }
//   build   p protons, n neutrons, e electrons, z atomic number, a mass number, q charge, o outer electrons,
//           s shells used, t 1 while the target is built, u 1 if this nucleus is unstable (radioactive),
//           i different isotopes of this element built so far
//   table   n elements in find looked at, k elements to find, z atomic number now, o its outer electrons, g its group
//   decay   z, a now; x alpha decays, y beta decays, w gamma emissions; r real decays in a row from the start (each the
//           way that isotope really decays); s 1 once a stable isotope is reached
//   halflife  n nuclei not yet decayed, k nuclei at the start, t time (in the isotope's unit), h half-lives gone,
//           e expected left (k halved h times), c runs finished (6 half-lives), r 1 while running
//   shield  x, y, w 1 once alpha, beta, gamma have been fired; f kinds fired
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
  // Stable isotopes of elements 1 to 20 (mass numbers); every other nucleus of these elements is radioactive.
  var STABLE20 = { 1: [1, 2], 2: [3, 4], 3: [6, 7], 4: [9], 5: [10, 11], 6: [12, 13], 7: [14, 15], 8: [16, 17, 18], 9: [19], 10: [20, 21, 22],
    11: [23], 12: [24, 25, 26], 13: [27], 14: [28, 29, 30], 15: [31], 16: [32, 33, 34, 36], 17: [35, 37], 18: [36, 38, 40], 19: [39, 41], 20: [40, 42, 43, 44, 46, 48] };
  function stableLight(z, a) { return !!STABLE20[z] && STABLE20[z].indexOf(a) >= 0; }
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
    if (st.mode === 'decay') return buildDecay();
    if (st.mode === 'shield') return buildShield();
    if (st.mode === 'halflife') return buildHalf();
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
    if (st.mode === 'decay') return paintDecay(panel);
    if (st.mode === 'shield') return paintShield(panel);
    if (st.mode === 'halflife') return paintHalf(panel);
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
    if (z) {
      var others = (STABLE20[z] || []).filter(function (m) { return m !== a; });
      var stab = el('p', 'atstab' + (stableLight(z, a) ? '' : ' bad'));
      stab.textContent = stableLight(z, a) ? EL[z][1] + '-' + a + ' is stable: its nucleus does not change.' : EL[z][1] + '-' + a + ' is unstable (radioactive): its nucleus will decay.' + (others.length ? ' Stable ' + EL[z][1].toLowerCase() + ' has mass number ' + (STABLE20[z].length > 1 ? STABLE20[z].slice(0, -1).join(', ') + ' or ' + STABLE20[z][STABLE20[z].length - 1] : STABLE20[z][0]) + '.' : '');
      info.appendChild(stab);
    }
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
      if (spec.colourBy && st.z !== z) { var cc = cellColour(z); b.style.background = cc[0]; b.style.color = cc[1]; b.querySelector('small').style.color = cc[1]; }
      b.addEventListener('click', function () { st.z = z; st.seen[z] = true; B.moved = true; bd.update(); paint(); report(); });
      grid.appendChild(b);
    })(z);
    panel.appendChild(grid);
    if (spec.colourBy) panel.appendChild(colourKey());
    var info = el('div', 'cinfo'), z0 = st.z, sh = shells(z0), g = EL[z0][2];
    info.appendChild(el('b', '', EL[z0][1] + ' (' + EL[z0][0] + '): ' + z0 + (z0 === 1 ? ' electron in shell ' : ' electrons in shells ') + sh.join(', ') + '.'));
    info.appendChild(el('span', '', ' ' + sh[sh.length - 1] + ' outer electron' + (sh[sh.length - 1] === 1 ? '' : 's') + ' (orange); period ' + sh.length + ' (' + sh.length + ' shell' + (sh.length === 1 ? '' : 's') + ').'));
    info.appendChild(el('i', '', z0 === 1 ? HNOTE : z0 === 2 ? 'Group 18 (noble gases): helium’s only shell is full with 2, so it hardly reacts at all.' : GROUP[g]));
    panel.appendChild(info);
  }
  var METAL = { 3: 'm', 4: 'm', 11: 'm', 12: 'm', 13: 'm', 19: 'm', 20: 'm', 5: 'd', 14: 'd' };
  var SHADE = ['#fde7c8', '#f9c98c', '#ee9f52', '#c96f2a', '#9e4f1a', '#7a3a12', '#5c2a0c', '#3f1c08'];
  function colourValue(z) { var sh = shells(z); return spec.colourBy === 'shells' ? sh.length : spec.colourBy === 'outer' ? (z === 2 ? 8 : sh[sh.length - 1]) : (METAL[z] || 'n'); }
  function cellColour(z) {
    var v = colourValue(z);
    if (spec.colourBy === 'metal') return v === 'm' ? ['#9fb7d6', '#14181f'] : v === 'd' ? ['#c9b6dd', '#14181f'] : ['#bfe0b5', '#14181f'];
    var i = spec.colourBy === 'shells' ? (v - 1) * 2 + 1 : v - 1;
    return [SHADE[i], i >= 3 ? '#ffffff' : '#14181f'];
  }
  function colourKey() {
    var key = el('div', 'atkey'), items;
    if (spec.colourBy === 'metal') items = [[3, 'Metal'], [5, 'Metalloid'], [6, 'Non-metal']];
    else if (spec.colourBy === 'shells') items = [[1, '1 shell'], [3, '2 shells'], [11, '3 shells'], [19, '4 shells']];
    else items = [[1, '1'], [4, '2'], [5, '3'], [6, '4'], [7, '5'], [8, '6'], [9, '7'], [10, '8 (full)']];
    key.appendChild(el('span', 'atkeyt', spec.colourBy === 'metal' ? 'Key:' : spec.colourBy === 'shells' ? 'Shells used:' : 'Outer electrons:'));
    items.forEach(function (it) { var c = cellColour(it[0]), sw = el('span', 'atsw', it[1]); sw.style.background = c[0]; sw.style.color = c[1]; key.appendChild(sw); });
    return key;
  }
  function report() {
    var vars, msg, ok = false;
    if (st.mode === 'decay') {
      vars = { z: st.z, a: st.a, x: st.x, y: st.y, w: st.w, r: Math.max(0, st.realRun), s: st.stable ? 1 : 0 };
      msg = st.hist.length ? isoName(st.z, st.a) + ' after ' + st.hist.length + ' step' + (st.hist.length === 1 ? '' : 's') + (st.stable ? ': stable.' : '.') : 'Choose a kind of decay.';
      B.save({ st: { iso: spec.isotope || '', z: st.z, a: st.a, x: st.x, y: st.y, w: st.w, realRun: st.realRun, hist: st.hist, stable: st.stable } });
      B.say(msg, st.stable);
      B.post({ scope: { vars: vars, points: {} } }, msg);
      return;
    }
    if (st.mode === 'halflife') {
      var hl = spec.hl, tk = st.tick, nleft = st.alive.filter(Boolean).length, hh = tk / TPH;
      vars = { n: nleft, k: spec.nuclei, t: Math.round(hh * hl.T * 100) / 100, h: Math.round(hh * 10) / 10, e: Math.round(spec.nuclei * Math.pow(0.5, hh)), c: st.runs, r: st.timer ? 1 : 0 };
      msg = tk ? nleft + ' of ' + spec.nuclei + ' not yet decayed after ' + fmtT(hh * hl.T, hl.unit) + '.' : 'Press Run.';
      B.say(msg, st.runs > 0);
      B.post({ scope: { vars: vars, points: {} } }, msg);
      return;
    }
    if (st.mode === 'shield') {
      var f = (st.fx || 0) + (st.fy || 0) + (st.fw || 0);
      vars = { x: st.fx || 0, y: st.fy || 0, w: st.fw || 0, f: f };
      msg = f >= 3 ? 'You fired all three: alpha stopped by paper, beta by aluminium, gamma weakened by lead.' : 'Fired ' + f + ' of 3 kinds.';
      B.save({ st: { fx: st.fx || 0, fy: st.fy || 0, fw: st.fw || 0, lastShield: st.lastShield || '' } });
      B.say(msg, f >= 3);
      B.post({ scope: { vars: vars, points: {} } }, msg);
      return;
    }
    if (st.mode === 'table') {
      var n = spec.findZ.filter(function (z) { return st.seen[z]; }).length, k = spec.findZ.length, sh = shells(st.z);
      vars = { n: n, k: k, z: st.z, o: sh[sh.length - 1], g: EL[st.z][2] };
      ok = n >= k;
      msg = ok ? 'You looked at ' + (k === 20 ? 'all 20 elements' : spec.findZ.map(function (z) { return EL[z][1]; }).join(', ')) + '.' : 'Looked at ' + n + ' of ' + k + (k === 20 ? ' elements.' : ': ' + spec.findZ.map(function (z) { return EL[z][0]; }).join(', ') + '.');
      B.save({ st: { z: st.z, seen: st.seen } });
    } else {
      var shb = shells(st.e), t = spec.targetObj, hit = !!t && st.p === t.p && st.n === t.n && st.e === t.e;
      st.built = st.built || {};
      if (st.p) st.built[st.p + '-' + st.n] = 1;
      var isos = Object.keys(st.built).filter(function (k) { return k.split('-')[0] === String(st.p); }).length;
      vars = { p: st.p, n: st.n, e: st.e, z: st.p, a: st.p + st.n, q: st.p - st.e, o: shb.length ? shb[shb.length - 1] : 0, s: shb.length, t: hit ? 1 : 0, u: st.p && !stableLight(st.p, st.p + st.n) ? 1 : 0, i: st.p ? isos : 0 };
      ok = hit;
      msg = t ? (hit ? 'That is ' + EL[t.z][1].toLowerCase() + '-' + t.a + (t.q ? ' (an ion)' : '') + '.' : 'Not yet: check the protons, neutrons and electrons against the card.') : st.p + ' protons, ' + st.n + ' neutrons, ' + st.e + ' electrons.';
      B.save({ st: { p: st.p, n: st.n, e: st.e, built: st.built } });
    }
    B.say(msg, ok);
    B.post({ scope: { vars: vars, points: {} } }, msg);
  }

  // ---------- decay and shield ----------
  var SYM = ' H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am'.split(' ');
  var NAME = ' Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Caesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium'.split(' ');
  // How common isotopes really decay (a alpha, b beta), and stable end points. Gamma usually comes with alpha or beta.
  var REAL = { 'U-238': 'a', 'Th-234': 'b', 'Pa-234': 'b', 'U-234': 'a', 'Th-230': 'a', 'Ra-226': 'a', 'Rn-222': 'a', 'Po-218': 'a', 'Pb-214': 'b', 'Bi-214': 'b', 'Po-214': 'a', 'Pb-210': 'b', 'Bi-210': 'b', 'Po-210': 'a',
    'C-14': 'b', 'H-3': 'b', 'K-40': 'b', 'Co-60': 'b', 'Sr-90': 'b', 'Y-90': 'b', 'I-131': 'b', 'Cs-137': 'b', 'Am-241': 'a', 'Pu-239': 'a', 'Rn-220': 'a', 'Ra-224': 'a' };
  var STABLE = { 'Pb-206': 1, 'N-14': 1, 'He-3': 1, 'Ca-40': 1, 'Ni-60': 1, 'Zr-90': 1, 'Xe-131': 1, 'Ba-137': 1, 'C-12': 1, 'O-16': 1, 'Pb-208': 1 };
  var KIND = { a: 'alpha', b: 'beta', g: 'gamma' };
  function iso(z, a) { return (SYM[z] || ('Element ' + z)) + '-' + a; }
  function isoName(z, a) { return (NAME[z] || ('Element ' + z)) + '-' + a; }
  function parseIsotope(v) {
    var m = /^\s*([A-Za-z]+)\s*[- ]\s*(\d+)\s*$/.exec(v || 'uranium-238');
    if (!m) throw new Error('isotope: write an element and a mass number, such as "radon-222" or "C-14".');
    var t = m[1].toLowerCase(), z = 0;
    for (var i = 1; i < SYM.length; i++) if (SYM[i].toLowerCase() === t || NAME[i].toLowerCase() === t) { z = i; break; }
    if (!z) throw new Error('isotope: "' + m[1] + '" is not an element from hydrogen to americium.');
    var a = Number(m[2]); if (a < z) throw new Error('isotope: the mass number cannot be smaller than the atomic number.');
    return { z: z, a: a };
  }
  var anim = null;
  function animate() {
    if (!anim) return;
    var t = (performance.now() - anim.t0) / anim.dur;
    if (t >= 1) { anim.t = 1; bd.update(); var done = anim.done; anim = null; if (done) done(); return; }
    anim.t = t; bd.update(); requestAnimationFrame(animate);
  }
  function emitShape(kind, at) {
    // A particle drawn at at() = [x, y, visible, fade]: alpha a cluster of 4, beta a dot, gamma a wavy line.
    var c = cols();
    if (kind === 'a') [[-0.17, 0.17, 'p'], [0.17, 0.17, 'n'], [-0.17, -0.17, 'n'], [0.17, -0.17, 'p']].forEach(function (o) {
      bd.create('point', [function () { return at()[0] + o[0]; }, function () { return at()[1] + o[1]; }], { name: '', size: 6, strokeColor: 'rgba(0,0,0,0.3)', fillColor: o[2] === 'p' ? c.pro : c.neu, fixed: true, highlight: false, showInfobox: false, withLabel: false, visible: function () { return at()[2]; } });
    });
    if (kind === 'b') bd.create('point', [function () { return at()[0]; }, function () { return at()[1]; }], { name: '', size: 5, strokeColor: '#ffffff', strokeWidth: 1.5, fillColor: c.ele, fixed: true, highlight: false, showInfobox: false, withLabel: false, visible: function () { return at()[2]; } });
    if (kind === 'g') {
      var cv = bd.create('curve', [[0], [0]], { strokeColor: '#c9a227', strokeWidth: 2.5, fixed: true, highlight: false, visible: function () { return at()[2]; } });
      cv.updateDataArray = function () { var p = at(), x1 = p[0], x0 = p[4] !== undefined ? p[4] : x1 - 2.4, X = [], Y = []; var M = Math.max(60, Math.ceil(Math.abs(x1 - x0) * 30)); for (var i = 0; i <= M; i++) { var x = x0 + (x1 - x0) * i / M; X.push(x); Y.push(p[1] + (p[5] !== undefined && x > p[5] ? 0.16 : 0.35) * Math.sin(x * 6)); } this.dataX = X; this.dataY = Y; };
    }
  }
  function buildDecay() {
    var c = cols();
    bd = B.jsx({ boundingbox: [-10, 6, 10, -6], keepAspectRatio: true });
    var NX = -4.5, R = function () { return 0.9 + 0.13 * Math.sqrt(st.a); };
    bd.create('circle', [[NX, 0], function () { return R(); }], { strokeColor: c.ring, strokeWidth: 1, fillColor: c.nuc, fixed: true, highlight: false });
    var GA = Math.PI * (3 - Math.sqrt(5)), N = 60;
    for (var k = 0; k < N; k++) (function (k) {
      var pos = function () { var r = (R() - 0.25) * Math.sqrt((k + 0.5) / N), a = k * GA; return [NX + r * Math.cos(a), r * Math.sin(a)]; };
      bd.create('point', [function () { return pos()[0]; }, function () { return pos()[1]; }], { name: '', size: 5, strokeColor: 'rgba(0,0,0,0.25)', fillColor: function () { return k / Math.min(N, st.a) < st.z / st.a ? c.pro : c.neu; }, fixed: true, highlight: false, showInfobox: false, withLabel: false, visible: function () { return k < Math.min(N, st.a); } });
    })(k);
    bd.create('text', [NX, function () { return -R() - 0.7; }, function () { return isoName(st.z, st.a); }], { anchorX: 'middle', anchorY: 'middle', fontSize: 16, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:700' });
    bd.create('text', [NX, function () { return -R() - 1.5; }, function () { return st.z + ' protons · ' + (st.a - st.z) + ' neutrons'; }], { anchorX: 'middle', anchorY: 'middle', fontSize: 13, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    ['a', 'b', 'g'].forEach(function (kind) {
      emitShape(kind, function () { var last = st.hist[st.hist.length - 1], on = anim ? anim.kind === kind : !!last && last[0] === kind; var t = anim && on ? anim.t : 1; var x = NX + R() + 0.3 + t * 11; return [x, 0, on, 0, kind === 'g' ? Math.max(NX + R(), x - 3) : undefined]; });
    });
    bd.create('text', [3.5, 1.4, function () { var last = st.hist[st.hist.length - 1], k = anim ? anim.kind : last && last[0]; return k ? { a: 'α particle: 2 protons + 2 neutrons', b: 'β particle: a fast electron from the nucleus', g: 'γ ray: energy, no particles' }[k] : ''; }], { anchorX: 'middle', anchorY: 'middle', fontSize: 13, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
    bd.create('text', [9.8, -5.7, 'Not to scale; at most 60 particles drawn'], { anchorX: 'right', anchorY: 'bottom', fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    bd.update();
  }
  function decay(kind) {
    if (anim || st.stable) return;
    var before = iso(st.z, st.a), real = REAL[before];
    B.moved = true;
    anim = { kind: kind, t0: performance.now(), dur: 1100, t: 0, done: function () {
      if (kind === 'a') { st.z -= 2; st.a -= 4; st.x++; }
      else if (kind === 'b') { st.z += 1; st.y++; }
      else st.w++;
      if (kind !== 'g') { st.realRun = st.realRun >= 0 && real === kind ? st.realRun + 1 : -1; }
      st.hist.push([kind, before, iso(st.z, st.a), real]);
      if (STABLE[iso(st.z, st.a)]) st.stable = true;
      bd.update(); paint(); report();
    } };
    requestAnimationFrame(animate);
  }
  function paintDecay(panel) {
    var bar = el('div', 'fbar');
    [['a', 'Alpha decay'], ['b', 'Beta decay'], ['g', 'Gamma ray']].forEach(function (b) {
      var btn = el('button', 'go', b[1]); btn.type = 'button'; btn.disabled = !!st.stable;
      btn.addEventListener('click', function () { decay(b[0]); }); bar.appendChild(btn);
    });
    var rs = el('button', 'quiet', 'Start again'); rs.type = 'button'; rs.addEventListener('click', B.restart); bar.appendChild(rs);
    panel.appendChild(bar);
    var info = el('div', 'cinfo'), now = iso(st.z, st.a), last = st.hist[st.hist.length - 1];
    if (last) {
      var k = last[0];
      info.appendChild(el('b', '', k === 'a' ? 'Alpha: 2 protons and 2 neutrons left. Atomic number −2, mass number −4: ' + last[1] + ' became ' + last[2] + '.' : k === 'b' ? 'Beta: a neutron turned into a proton and an electron, and the electron left. Atomic number +1, mass number unchanged: ' + last[1] + ' became ' + last[2] + '.' : 'Gamma: energy left the nucleus. No protons or neutrons changed: still ' + last[2] + '.'));
      if (k !== 'g') info.appendChild(el('span', '', ' ' + (last[3] ? (last[3] === k ? 'That is how ' + last[1] + ' really decays.' : 'In nature ' + last[1] + ' decays by ' + KIND[last[3]] + ', not ' + KIND[k] + '.') : 'This model has no data on how ' + last[1] + ' decays.')));
    } else info.appendChild(el('b', '', isoName(st.z, st.a) + ' (atomic number ' + st.z + ', mass number ' + st.a + ').'));
    info.appendChild(el('i', '', st.stable ? ' ' + now + ' is stable: it does not decay.' : REAL[now] ? ' ' + now + ' is unstable.' : ''));
    panel.appendChild(info);
    if (st.hist.length) {
      var chain = el('p', 'fsum'); chain.textContent = [st.hist[0][1]].concat(st.hist.map(function (h) { return { a: 'α', b: 'β', g: 'γ' }[h[0]] + ' → ' + h[2]; })).join(' ');
      panel.appendChild(chain);
    }
  }
  function buildShield() {
    var c = cols();
    bd = B.jsx({ boundingbox: [-10, 5, 10, -5], keepAspectRatio: false });
    var BAR = [[-2.5, 'Paper', '#efe6d0', 0.25], [2.0, 'Aluminium (a few mm)', '#b9c2cf', 0.4], [6.3, 'Lead (several cm)', '#5f6672', 0.9]];
    bd.create('point', [-8.5, 0], { name: '', size: 12, strokeColor: '#c9a227', strokeWidth: 3, fillColor: c.nuc, fixed: true, highlight: false, showInfobox: false, withLabel: false });
    bd.create('text', [-8.5, 1.3, 'Source'], { anchorX: 'middle', anchorY: 'middle', fontSize: 13, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
    BAR.forEach(function (b) {
      bd.create('polygon', [[b[0] - b[3] / 2, -3], [b[0] + b[3] / 2, -3], [b[0] + b[3] / 2, 3], [b[0] - b[3] / 2, 3]], { fillColor: b[2], fillOpacity: 1, borders: { strokeColor: 'rgba(0,0,0,0.3)', strokeWidth: 1 }, vertices: { visible: false }, fixed: true, highlight: false });
      bd.create('text', [b[0], -3.6, b[1]], { anchorX: 'middle', anchorY: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
    });
    var STOP = { a: -2.5 - 0.45, b: 2.0 - 0.45, g: 9.5 }, YS = { a: 1.6, b: 0, g: -1.6 };
    ['a', 'b', 'g'].forEach(function (kind) {
      emitShape(kind, function () {
        var on = anim && anim.kind === kind, t = on ? anim.t : 1, x = -8 + t * (STOP[kind] + 8);
        return [Math.min(x, STOP[kind]), YS[kind], on || !!st[{ a: 'fx', b: 'fy', g: 'fw' }[kind]], 0, kind === 'g' ? (on ? Math.max(-8, x - 3) : -8) : undefined, 6.75];
      });
    });
    bd.create('text', [0, 4.2, function () { return anim ? { a: 'Alpha: stopped by a sheet of paper (or a few cm of air)', b: 'Beta: passes paper, stopped by a few mm of aluminium', g: 'Gamma: reduced by thick lead, never stopped completely' }[anim.kind] : st.lastShield || (st.fx && st.fy && st.fw ? 'Alpha stopped by paper, beta by aluminium; gamma weakened by lead' : 'Fire each kind of radiation at the barriers.'); }], { anchorX: 'middle', anchorY: 'middle', fontSize: 14, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:600' });
    bd.update();
  }
  function fire(kind) {
    if (anim) return;
    B.moved = true;
    anim = { kind: kind, t0: performance.now(), dur: 1400, t: 0, done: function () {
      st[{ a: 'fx', b: 'fy', g: 'fw' }[kind]] = 1;
      st.lastShield = { a: 'Alpha was stopped by the paper.', b: 'Beta got through the paper and was stopped by the aluminium.', g: 'Gamma got through all three, weakened by the lead.' }[kind];
      bd.update(); paint(); report();
    } };
    requestAnimationFrame(animate);
  }
  function paintShield(panel) {
    var bar = el('div', 'fbar');
    [['a', 'Fire alpha'], ['b', 'Fire beta'], ['g', 'Fire gamma']].forEach(function (b) {
      var btn = el('button', 'go', b[1]); btn.type = 'button'; btn.addEventListener('click', function () { fire(b[0]); }); bar.appendChild(btn);
    });
    panel.appendChild(bar);
    var info = el('div', 'cinfo');
    info.appendChild(el('span', '', 'Alpha particles are big and slow (helium nuclei); beta particles are small, fast electrons; gamma rays are energy with no mass and no charge. The bigger the particle, the sooner it is stopped.'));
    panel.appendChild(info);
  }

  // ---------- half-life ----------
  var HALF = { 'F-18': [110, 'minutes'], 'I-131': [8, 'days'], 'Rn-222': [3.8, 'days'], 'Po-210': [138, 'days'], 'H-3': [12.3, 'years'], 'Co-60': [5.3, 'years'],
    'Sr-90': [29, 'years'], 'Cs-137': [30, 'years'], 'Am-241': [432, 'years'], 'Ra-226': [1600, 'years'], 'C-14': [5730, 'years'], 'K-40': [1.25, 'billion years'], 'U-238': [4.5, 'billion years'] };
  var TPH = 10, MAXH = 6, halfTimer = null;
  function rngOf(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function fmtT(x, unit) { var r = x >= 100 ? Math.round(x) : Math.round(x * 10) / 10; return r.toLocaleString('en-AU') + ' ' + (r === 1 && unit !== 'billion years' ? unit.replace(/s$/, '') : unit); }
  function stepHalf() {
    var pDecay = 1 - Math.pow(0.5, 1 / TPH);
    for (var i = 0; i < st.alive.length; i++) if (st.alive[i] && st.rng() < pDecay) st.alive[i] = false;
    st.tick++; st.hist.push(st.alive.filter(Boolean).length);
  }
  function tickHalf(n) {
    for (var i = 0; i < n && st.tick < MAXH * TPH; i++) stepHalf();
    if (st.tick >= MAXH * TPH) { if (halfTimer) { clearInterval(halfTimer); halfTimer = null; } st.timer = false; if (!st.ended) { st.ended = true; st.runs++; } }
    bd.update(); paint(); report();
  }
  function buildHalf() {
    var c = cols(), N = spec.nuclei, side = Math.ceil(Math.sqrt(N)), cell = 10 / side;
    bd = B.jsx({ boundingbox: [-0.8, 11.6, 26.4, -2.2], keepAspectRatio: true });
    for (var i = 0; i < N; i++) (function (i) {
      var x = (i % side + 0.5) * cell, y = 10 - (Math.floor(i / side) + 0.5) * cell;
      bd.create('point', [x, y], { name: '', size: function () { return Math.max(2, bd.unitX * cell * 0.36); }, face: 'square', strokeColor: 'rgba(0,0,0,0.2)', strokeWidth: 0.5,
        fillColor: function () { return st.alive[i] ? '#d8862b' : (dark() ? '#3b4352' : '#d9dee6'); }, fixed: true, highlight: false, showInfobox: false, withLabel: false });
    })(i);
    bd.create('text', [5, -0.7, function () { return st.alive.filter(Boolean).length + ' of ' + N + ' not yet decayed'; }], { anchorX: 'middle', anchorY: 'middle', fontSize: 14, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:600' });
    // Graph: x 13 to 25 is 0 to 6 half-lives, y 0 to 10 is 0 to N.
    var GX = 13, GW = 12, X = function (tk) { return GX + tk / (MAXH * TPH) * GW; }, Y = function (n) { return n / N * 10; };
    bd.create('segment', [[GX, 0], [GX + GW, 0]], { strokeColor: c.muted, strokeWidth: 1.2, fixed: true, highlight: false });
    bd.create('segment', [[GX, 0], [GX, 10.3]], { strokeColor: c.muted, strokeWidth: 1.2, fixed: true, highlight: false });
    [0.5, 0.25, 0.125].forEach(function (f) {
      bd.create('segment', [[GX, Y(N * f)], [GX + GW, Y(N * f)]], { strokeColor: c.ring, strokeWidth: 1, dash: 2, fixed: true, highlight: false });
    });
    [[1, String(N)], [0.5, String(N / 2)], [0.25, String(N / 4)], [0.125, String(N / 8)]].forEach(function (l) {
      bd.create('text', [GX - 0.2, Y(N * l[0]), l[1]], { anchorX: 'right', anchorY: 'middle', fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    });
    for (var h = 0; h <= MAXH; h++) bd.create('text', [X(h * TPH), -0.45, fmtT(h * spec.hl.T, '').trim()], { anchorX: 'middle', anchorY: 'middle', fontSize: 11, strokeColor: c.muted, fixed: true, highlight: false, display: 'internal' });
    bd.create('text', [GX + GW / 2, -1.3, 'Time (' + spec.hl.unit + ')'], { anchorX: 'middle', anchorY: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
    bd.create('text', [GX + 0.3, 10.9, 'Nuclei not yet decayed'], { anchorX: 'left', anchorY: 'middle', fontSize: 12, strokeColor: c.ink, fixed: true, highlight: false, display: 'internal' });
    var ex = bd.create('curve', [[0], [0]], { strokeColor: c.muted, strokeWidth: 1.5, dash: 3, fixed: true, highlight: false, visible: function () { return st.runs > 0; } });
    ex.updateDataArray = function () { var xs = [], ys = []; for (var k = 0; k <= MAXH * TPH; k++) { xs.push(X(k)); ys.push(Y(N * Math.pow(0.5, k / TPH))); } this.dataX = xs; this.dataY = ys; };
    var cv = bd.create('curve', [[0], [0]], { strokeColor: '#d8862b', strokeWidth: 3, fixed: true, highlight: false });
    cv.updateDataArray = function () { this.dataX = st.hist.map(function (n, k) { return X(k); }); this.dataY = st.hist.map(Y); };
    bd.update();
  }
  function paintHalf(panel) {
    var bar = el('div', 'fbar'), done = st.tick >= MAXH * TPH;
    var run = el('button', 'go', st.timer ? 'Pause' : 'Run'); run.type = 'button'; run.disabled = done;
    run.addEventListener('click', function () {
      B.moved = true;
      if (st.timer) { clearInterval(halfTimer); halfTimer = null; st.timer = false; paint(); report(); return; }
      st.timer = true; halfTimer = setInterval(function () { tickHalf(1); }, 120); paint(); report();
    });
    var one = el('button', 'go', 'Wait one half-life'); one.type = 'button'; one.disabled = done || st.timer;
    one.addEventListener('click', function () { B.moved = true; tickHalf(TPH - (st.tick % TPH)); });
    var rs = el('button', 'quiet', 'Start again'); rs.type = 'button';
    rs.addEventListener('click', function () { var runs = st.runs; B.restart(); st.runs = runs; paint(); report(); });
    bar.append(run, one, rs); panel.appendChild(bar);
    var hl = spec.hl, hh = st.tick / TPH, left = st.alive.filter(Boolean).length, info = el('div', 'cinfo');
    info.appendChild(el('b', '', isoName(hl.z, hl.a) + ': half-life ' + fmtT(hl.T, hl.unit) + '.'));
    info.appendChild(el('span', '', ' Time: ' + fmtT(hh * hl.T, hl.unit) + (st.tick ? ' (' + (Math.round(hh * 10) / 10) + ' half-li' + (hh === 1 ? 'fe' : 'ves') + ')' : '') + '. Not yet decayed: ' + left + ' of ' + spec.nuclei + '.'));
    info.appendChild(el('i', '', st.runs ? 'Dashed: the number left if exactly half went each half-life. Each nucleus decays at random, so a real sample wobbles around it; the bigger the sample, the closer it gets.' : 'Each nucleus decays at random: no one can say which will go next, or when. Watch how many are left.'));
    panel.appendChild(info);
  }

  B.widget('atom', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.mode === 'halflife' ? 'A sample of radioactive nuclei decaying at random, with a graph of how many are left' : s.mode === 'decay' ? 'A radioactive nucleus and what leaves it when it decays' : s.mode === 'shield' ? 'Alpha, beta and gamma radiation fired at paper, aluminium and lead' : s.mode === 'table' ? 'A Bohr model of an element chosen from the first 20' : 'A Bohr model of an atom: protons and neutrons in the nucleus, electrons in shells'; },
    parse: function (s) {
      s.mode = s.mode || 'build';
      if (['build', 'table', 'decay', 'shield', 'halflife'].indexOf(s.mode) < 0) throw new Error('mode: use build, table, decay, halflife or shield.');
      var cb = s.colour || s.color;
      if (cb && ['shells', 'outer', 'metal'].indexOf(cb) < 0) throw new Error('colour: use shells, outer or metal.');
      s.colourBy = cb || '';
      if (s.mode === 'halflife') {
        var io = parseIsotope(s.isotope || 'iodine-131'), key = iso(io.z, io.a);
        if (!HALF[key]) throw new Error('isotope: no half-life for ' + key + '. Use one of ' + Object.keys(HALF).join(', ') + '.');
        s.hl = { z: io.z, a: io.a, key: key, T: HALF[key][0], unit: HALF[key][1] };
        s.nuclei = s.nuclei ? Number(s.nuclei) : 100;
        if (!(s.nuclei >= 4 && s.nuclei <= 400) || s.nuclei !== Math.round(s.nuclei)) throw new Error('nuclei: a whole number from 4 to 400.');
        s.preRun = s.run ? Number(s.run) : 0;
        if (!(s.preRun >= 0 && s.preRun <= 6)) throw new Error('run: a number of half-lives from 0 to 6.');
      }
      s.isoObj = s.mode === 'decay' ? parseIsotope(s.isotope) : null;
      s.firedK = (s.fired || '').split(',').map(function (t) { return t.trim().toLowerCase(); }).filter(Boolean).map(function (t) {
        var k = { alpha: 'fx', beta: 'fy', gamma: 'fw' }[t]; if (!k) throw new Error('fired: use alpha, beta and gamma.'); return k; });
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
      anim = null;
      if (halfTimer) { clearInterval(halfTimer); halfTimer = null; }
      if (spec.mode === 'halflife') {
        var seed = spec.preRun ? 7 : (Date.now() % 100000) + 1;
        st.rng = rngOf(seed); st.alive = []; for (var q = 0; q < spec.nuclei; q++) st.alive.push(true);
        st.tick = 0; st.hist = [spec.nuclei]; st.runs = 0; st.timer = false;
        for (var q2 = 0; q2 < Math.round(spec.preRun * TPH); q2++) stepHalf();
      }
      if (spec.mode === 'decay') { st.z = spec.isoObj.z; st.a = spec.isoObj.a; st.x = 0; st.y = 0; st.w = 0; st.realRun = 0; st.hist = []; st.stable = !!STABLE[iso(st.z, st.a)];
        if (k.hist && k.iso === (spec.isotope || '')) { delete k.iso; Object.assign(st, k); } }
      else Object.assign(st, k);
      if (spec.mode === 'shield') spec.firedK.forEach(function (f) { st[f] = 1; });
      build(); paint(); report();
    },
    redraw: function () { build(); },
    resize: function () { if (B.jsxBoard) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
