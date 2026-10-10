// Inheritance: offspring from two parents or from one (clones), meiosis making gametes, and Punnett squares.
//   widget: cross
//   mode: offspring | meiosis | punnett
//   offspring: two parents with three genes each (fur colour, ears, tail); "Sexual reproduction" makes an offspring
//              from one random allele of each gene from each parent; "Asexual reproduction" copies parent 1.
//   meiosis:   a cell with three pairs of chromosomes (one of each pair from each parent); "Make a gamete" separates
//              the pairs at random, one chromosome from each pair.
//   punnett:   gene: B | brown eyes | b | blue eyes     (dominant allele and trait, then recessive)
//              parents: Bb x Bb                        (or "choose" for menus)
//              students fill the gametes and the grid by clicking, then breed 100 offspring.
// state: { scope: { vars } }
//   offspring: o offspring by sexual reproduction, u different-looking offspring among them, a clones made
//   meiosis:   g gametes made, u different gametes, h chromosomes in each gamete
//   punnett:   f 1 once the gametes and grid are right, n offspring bred, p percent showing the dominant trait
(function (B) {
  'use strict';
  var spec = null, st = null;
  var GENES = [['B', 'b', 'dark fur', 'pale fur'], ['E', 'e', 'pointed ears', 'round ears'], ['T', 't', 'long tail', 'short tail']];
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var ordered = function (g) { return g.split('').sort(function (x, y) { return x === x.toUpperCase() && y !== y.toUpperCase() ? -1 : x !== x.toUpperCase() && y === y.toUpperCase() ? 1 : 0; }).join(''); };

  function parse(s) {
    s.mode = s.mode || 'offspring';
    if (['offspring', 'meiosis', 'punnett'].indexOf(s.mode) < 0) throw new Error('mode: offspring, meiosis or punnett.');
    if (s.mode === 'punnett') {
      var g = String(s.gene || 'B | brown eyes | b | blue eyes').split('|').map(function (t) { return t.trim(); });
      if (g.length !== 4 || !/^[A-Z]$/.test(g[0]) || g[2] !== g[0].toLowerCase()) throw new Error('gene: a capital letter | its trait | the same lower-case letter | its trait (B | brown eyes | b | blue eyes).');
      s.g = { D: g[0], dom: g[1], r: g[2], rec: g[3] };
      s.choose = /^choose$/i.test(s.parents || '');
      if (!s.choose) {
        var p = /^([A-Za-z]{2})\s*[x×]\s*([A-Za-z]{2})$/.exec(String(s.parents || (g[0] + g[2] + ' x ' + g[0] + g[2])).trim());
        if (!p) throw new Error('parents: two genotypes, such as Bb x Bb (or "choose").');
        [p[1], p[2]].forEach(function (x) { x.split('').forEach(function (c) { if (c !== s.g.D && c !== s.g.r) throw new Error('parents: use only ' + s.g.D + ' and ' + s.g.r + '.'); }); });
        s.p0 = [ordered(p[1]), ordered(p[2])];
      } else s.p0 = [s.g.D + s.g.r, s.g.D + s.g.r];
    }
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

  // ---------- offspring ----------
  // A small creature drawn from its genotype: fur colour, ear shape, tail length (dominant shows if present).
  function creature(gt, size) {
    var dark = /B/.test(gt[0]), pointed = /E/.test(gt[1]), long = /T/.test(gt[2]), fur = dark ? '#6b4a32' : '#e3c79a', s = size || 90;
    var ears = pointed ? '<polygon points="28,30 34,8 42,28" fill="' + fur + '" stroke="#3a2a1c" stroke-width="2"/><polygon points="58,28 66,8 72,30" fill="' + fur + '" stroke="#3a2a1c" stroke-width="2"/>'
      : '<circle cx="32" cy="24" r="9" fill="' + fur + '" stroke="#3a2a1c" stroke-width="2"/><circle cx="68" cy="24" r="9" fill="' + fur + '" stroke="#3a2a1c" stroke-width="2"/>';
    var tail = long ? '<path d="M82,62 C100,58 104,40 96,30" fill="none" stroke="' + fur + '" stroke-width="7" stroke-linecap="round"/>' : '<path d="M82,62 C88,62 90,58 90,55" fill="none" stroke="' + fur + '" stroke-width="7" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 110 90" width="' + s + '" height="' + (s * 0.82) + '" aria-hidden="true">' + tail + ears + '<ellipse cx="50" cy="56" rx="34" ry="26" fill="' + fur + '" stroke="#3a2a1c" stroke-width="2"/><circle cx="40" cy="50" r="4" fill="#1d2430"/><circle cx="60" cy="50" r="4" fill="#1d2430"/><ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#3a2a1c"/></svg>';
  }
  function looks(gt) { return GENES.map(function (g, i) { return gt[i].indexOf(g[0]) >= 0 ? g[2] : g[3]; }).join(', '); }
  function paintOffspring() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var parents = el('div', 'xparents');
    st.par.forEach(function (gt, i) {
      var c = el('div', 'xcard'); c.innerHTML = creature(gt, 96);
      c.appendChild(el('b', '', 'Parent ' + (i + 1))); c.appendChild(el('span', 'xgt', gt.join(' '))); c.appendChild(el('span', '', looks(gt)));
      parents.appendChild(c);
    });
    panel.appendChild(parents);
    var bar = el('div', 'fbar');
    var sx = el('button', 'go', 'Sexual reproduction: one offspring'); sx.type = 'button';
    sx.addEventListener('click', function () { var gt = GENES.map(function (g, i) { return ordered(pick(st.par[0][i].split('')) + pick(st.par[1][i].split(''))); }); st.kids.unshift({ gt: gt, sex: true }); B.moved = true; paintOffspring(); report(); });
    var ax = el('button', '', 'Asexual reproduction: a clone of parent 1'); ax.type = 'button';
    ax.addEventListener('click', function () { st.kids.unshift({ gt: st.par[0].slice(), sex: false }); B.moved = true; paintOffspring(); report(); });
    var clr = el('button', 'quiet', 'Clear'); clr.type = 'button'; clr.addEventListener('click', function () { st.kids = []; paintOffspring(); report(); });
    bar.append(sx, ax, clr); panel.appendChild(bar);
    var kids = el('div', 'xkids');
    st.kids.slice(0, 24).forEach(function (k) { var c = el('div', 'xkid' + (k.sex ? '' : ' clone')); c.innerHTML = creature(k.gt, 64); c.appendChild(el('span', 'xgt', k.gt.join(' '))); c.title = (k.sex ? 'Sexual: ' : 'Clone: ') + looks(k.gt); kids.appendChild(c); });
    panel.appendChild(kids);
  }

  // ---------- meiosis ----------
  function paintMeiosis() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var cell = el('div', 'xcell');
    cell.appendChild(el('b', '', 'Body cell: 3 pairs (6 chromosomes)'));
    var pairs = el('div', 'xpairs');
    ['A', 'B', 'C'].forEach(function (L) { var p = el('div', 'xpair'); p.appendChild(chrom(L, 'm')); p.appendChild(chrom(L.toLowerCase(), 'p')); pairs.appendChild(p); });
    cell.appendChild(pairs); panel.appendChild(cell);
    var bar = el('div', 'fbar'); var go = el('button', 'go', 'Make a gamete'); go.type = 'button';
    go.addEventListener('click', function () { var g = ['A', 'B', 'C'].map(function (L) { return Math.random() < 0.5 ? [L, 'm'] : [L.toLowerCase(), 'p']; }); st.gam.unshift(g); B.moved = true; paintMeiosis(); report(); });
    var clr = el('button', 'quiet', 'Clear'); clr.type = 'button'; clr.addEventListener('click', function () { st.gam = []; paintMeiosis(); report(); });
    bar.append(go, clr); panel.appendChild(bar);
    var list = el('div', 'xgams');
    st.gam.slice(0, 16).forEach(function (g) { var c = el('div', 'xgam'); g.forEach(function (x) { c.appendChild(chrom(x[0], x[1])); }); c.appendChild(el('span', 'xgt', g.map(function (x) { return x[0]; }).join(''))); list.appendChild(c); });
    panel.appendChild(list);
    panel.appendChild(el('p', 'cokind', 'Red chromosomes came from this person’s mother, blue from their father. Each gamete gets one chromosome from each pair, chosen at random.'));
  }
  function chrom(label, who) { var c = el('span', 'xchr ' + who, label); return c; }

  // ---------- punnett ----------
  function gametesOf(gt) { return gt.split(''); }
  function paintPunnett() {
    var panel = B.el('gpanel'), g = spec.g; panel.replaceChildren();
    var head = el('p', 'cokind', g.D + ' = ' + g.dom + ' (dominant), ' + g.r + ' = ' + g.rec + ' (recessive).'); panel.appendChild(head);
    var prow = el('div', 'fbar');
    st.p.forEach(function (gt, i) {
      if (spec.choose) {
        var sel = el('select'); sel.setAttribute('aria-label', 'Parent ' + (i + 1));
        [g.D + g.D, g.D + g.r, g.r + g.r].forEach(function (o) { var op = new Option('Parent ' + (i + 1) + ': ' + o, o); if (o === gt) op.selected = true; sel.appendChild(op); });
        sel.addEventListener('change', function () { st.p[i] = sel.value; st.head = [['', ''], ['', '']]; st.grid = [['', ''], ['', '']]; st.bred = null; B.moved = true; paintPunnett(); report(); });
        prow.appendChild(sel);
      } else prow.appendChild(el('span', 'xgt big', 'Parent ' + (i + 1) + ': ' + gt + ' (' + (gt.indexOf(g.D) >= 0 ? g.dom : g.rec) + ')'));
    });
    panel.appendChild(prow);
    var t = el('table', 'xpun'), cyc = function (opts, cur) { return opts[(opts.indexOf(cur) + 1) % opts.length]; };
    var tr0 = el('tr'); tr0.appendChild(el('th', '', ''));
    [0, 1].forEach(function (j) { var th = el('th'); var b = el('button', 'xg', st.head[1][j] || '?'); b.type = 'button'; b.setAttribute('aria-label', 'Parent 2 gamete ' + (j + 1)); b.addEventListener('click', function () { st.head[1][j] = cyc([g.D, g.r], st.head[1][j]); B.moved = true; paintPunnett(); report(); }); th.appendChild(b); tr0.appendChild(th); });
    t.appendChild(tr0);
    [0, 1].forEach(function (i) {
      var tr = el('tr'), th = el('th'), hb = el('button', 'xg', st.head[0][i] || '?'); hb.type = 'button'; hb.setAttribute('aria-label', 'Parent 1 gamete ' + (i + 1));
      hb.addEventListener('click', function () { st.head[0][i] = cyc([g.D, g.r], st.head[0][i]); B.moved = true; paintPunnett(); report(); }); th.appendChild(hb); tr.appendChild(th);
      [0, 1].forEach(function (j) { var td = el('td'), b = el('button', 'xc', st.grid[i][j] || '?'); b.type = 'button'; b.setAttribute('aria-label', 'Offspring ' + (i + 1) + ', ' + (j + 1));
        b.addEventListener('click', function () { st.grid[i][j] = cyc([g.D + g.D, g.D + g.r, g.r + g.r], st.grid[i][j]); B.moved = true; paintPunnett(); report(); }); td.appendChild(b); tr.appendChild(td); });
      t.appendChild(tr);
    });
    panel.appendChild(t);
    var ok = punnettRight();
    panel.appendChild(el('p', ok ? 'kres ok' : 'cokind', ok ? 'Right: each box is one gamete from each parent. Each box is a 1 in 4 chance.' : 'Click the ? boxes: first the gametes each parent can make (top and left), then each offspring’s two alleles.'));
    var bar = el('div', 'fbar'); var br = el('button', ok ? 'go' : '', 'Breed 100 offspring'); br.type = 'button';
    br.addEventListener('click', function () {
      var n = 0; for (var k = 0; k < 100; k++) { var a = pick(gametesOf(st.p[0])) + pick(gametesOf(st.p[1])); if (a.indexOf(g.D) >= 0) n++; }
      st.bred = { n: 100, dom: n }; st.bredTotal += 100; B.moved = true; paintPunnett(); report();
    });
    bar.appendChild(br); panel.appendChild(bar);
    if (st.bred) {
      var res = el('div', 'xbars');
      [[g.dom, st.bred.dom], [g.rec, st.bred.n - st.bred.dom]].forEach(function (r) { var row = el('div', 'xbar'); row.appendChild(el('span', '', r[0] + ': ' + r[1])); var fill = el('i'); fill.style.width = r[1] + '%'; row.appendChild(fill); res.appendChild(row); });
      panel.appendChild(res);
    }
  }
  function punnettRight() {
    var p = st.p, okHead = [0, 1].every(function (k) { var want = gametesOf(p[k]).slice().sort().join(''), got = st.head[k].slice().sort().join(''); return want === got; });
    if (!okHead) return false;
    return [0, 1].every(function (i) { return [0, 1].every(function (j) { return st.grid[i][j] === ordered(st.head[0][i] + st.head[1][j]); }); });
  }

  function report() {
    var vars, msg = '', okk = false;
    if (spec.mode === 'offspring') {
      var sx = st.kids.filter(function (k) { return k.sex; }), u = {}; sx.forEach(function (k) { u[looks(k.gt)] = 1; });
      vars = { o: sx.length, u: Object.keys(u).length, a: st.kids.length - sx.length };
      msg = sx.length ? sx.length + ' offspring by sexual reproduction, ' + vars.u + ' different-looking; ' + vars.a + ' clones.' : 'Make some offspring each way and compare them.';
    } else if (spec.mode === 'meiosis') {
      var u2 = {}; st.gam.forEach(function (g) { u2[g.map(function (x) { return x[0]; }).join('')] = 1; });
      vars = { g: st.gam.length, u: Object.keys(u2).length, h: 3 }; msg = st.gam.length ? st.gam.length + ' gametes, ' + vars.u + ' different combinations (of 8 possible).' : '';
      okk = vars.u >= 8;
    } else {
      var f = punnettRight() ? 1 : 0; vars = { f: f, n: st.bredTotal, p: st.bred ? st.bred.dom : 0 }; okk = !!f;
      msg = st.bred ? 'Of 100 offspring, ' + st.bred.dom + ' have ' + spec.g.dom + ' and ' + (100 - st.bred.dom) + ' have ' + spec.g.rec + '. Chance makes each batch a little different.' : '';
    }
    B.say(msg, okk);
    B.post({ scope: { vars: vars, points: {} } }, Object.keys(vars).map(function (k) { return k + ' = ' + vars[k]; }).join('; '));
  }

  B.widget('cross', {
    sections: ['gpanel'],
    label: function (s) { return { offspring: 'Offspring from sexual and asexual reproduction', meiosis: 'Meiosis making gametes', punnett: 'A Punnett square' }[s.mode]; },
    parse: parse,
    start: function () {
      spec = B.spec;
      st = { par: [['Bb', 'Ee', 'Tt'], ['Bb', 'Ee', 'Tt']], kids: [], gam: [], p: (spec.p0 || []).slice(), head: [['', ''], ['', '']], grid: [['', ''], ['', '']], bred: null, bredTotal: 0 };
      ({ offspring: paintOffspring, meiosis: paintMeiosis, punnett: paintPunnett })[spec.mode]();
      report();
    },
  });
})(WPB);
