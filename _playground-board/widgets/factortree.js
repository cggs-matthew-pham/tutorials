// Factor tree: students split a number into factor pairs until every branch ends in a prime (circled), and the board
// writes the prime factorisation in exponent notation. With a second number, the shared primes give the HCF and all the
// primes the LCM (shown in a Venn diagram once both trees are finished).
//   widget: factortree
//   number: 36
//   second: 48                 optional: a second tree, for the HCF and LCM
//   grown: on                  start with the trees finished (each split by its middle factor pair): for pictures
// Students pick a number that is not prime (click it, or use the buttons), then a factor pair to split it into.
// state: { scope: { vars: { n, k (primes in the first tree so far), c (1 when it is finished), N, K, C for the second,
//   h (HCF) and l (LCM) once both are finished, else 0 } } }
// Checks: "c = 1", "c = 1 and C = 1", "h = 12".
(function (B) {
  'use strict';
  var spec = null, trees = [], ui = {}, pick = null;
  var NS = 'http://www.w3.org/2000/svg';
  var isPrime = function (n) { if (n < 2) return false; for (var i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  var gcd = function (a, b) { return b ? gcd(b, a % b) : a; };

  function parse(s) {
    var n = Number(s.number), m = s.second !== undefined ? Number(s.second) : null;
    [['number', n], ['second', m]].forEach(function (p) { if (p[1] !== null && !(p[1] >= 4 && p[1] <= 10000 && p[1] === Math.round(p[1]))) throw new Error(p[0] + ': a whole number from 4 to 10 000.'); });
    if (isPrime(n) || (m !== null && isPrime(m))) throw new Error('number: choose a number that is not prime (it has no factor tree to grow).');
    s.n = n; s.m = m; s.grown = /^on$/i.test(String(s.grown || ''));
  }

  function leaves(t) { return t.kids ? leaves(t.kids[0]).concat(leaves(t.kids[1])) : [t]; }
  function factorisation(t) {
    var ps = leaves(t).map(function (x) { return x.v; }).sort(function (a, b) { return a - b; }), cnt = {};
    ps.forEach(function (p) { cnt[p] = (cnt[p] || 0) + 1; });
    var done = ps.every(isPrime);
    var txt = done ? Object.keys(cnt).map(Number).sort(function (a, b) { return a - b; }).map(function (p) { return cnt[p] > 1 ? p + sup(cnt[p]) : String(p); }).join(' × ') : ps.join(' × ');
    return { done: done, text: t.v + ' = ' + txt, primes: done ? cnt : null, k: ps.filter(isPrime).length };
  }
  function sup(n) { return String(n).split('').map(function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]; }).join(''); }
  function grow(t) { if (isPrime(t.v)) return t; var ps = pairs(t.v), p = ps[ps.length - 1]; t.kids = [grow({ v: p[0] }), grow({ v: p[1] })]; return t; }
  function pairs(v) { var out = []; for (var i = 2; i * i <= v; i++) if (v % i === 0) out.push([i, v / i]); return out; }

  // Lay a tree out: each leaf gets a column; a parent sits over its children.
  function layout(t, depth, col) {
    t.depth = depth;
    if (!t.kids) { t.x = col.n++; return; }
    layout(t.kids[0], depth + 1, col); layout(t.kids[1], depth + 1, col);
    t.x = (t.kids[0].x + t.kids[1].x) / 2;
  }
  function depthOf(t) { return t.kids ? 1 + Math.max(depthOf(t.kids[0]), depthOf(t.kids[1])) : 0; }

  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var ink = B.css('--ink') || '#1d2430', acc = B.css('--accent') || '#c2570a', blue = B.css('--left') || '#2f6fb3', muted = B.css('--muted') || '#5d6675', card = B.css('--card') || '#fff';
    var W = Math.max(el.clientWidth, 320), H = Math.max(el.clientHeight, 240);
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', trees.map(function (t) { return factorisation(t).text; }).join('; '));
    var both = trees.length === 2 && trees.every(function (t) { return factorisation(t).done; });
    var areaH = both ? H * 0.62 : H, w = W / trees.length;
    var mk = function (tag, at) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); svg.appendChild(e); return e; };
    trees.forEach(function (t, ti) {
      var col = { n: 0 }; layout(t, 0, col);
      var D = Math.max(1, depthOf(t)), cols = Math.max(1, col.n);
      var X = function (x) { return ti * w + w * (x + 0.5) / cols; }, Y = function (d) { return 34 + (areaH - 70) * d / D; };
      (function walk(n) {
        if (n.kids) n.kids.forEach(function (k) { mk('line', { x1: X(n.x), y1: Y(n.depth) + 14, x2: X(k.x), y2: Y(k.depth) - 14, stroke: muted, 'stroke-width': 2 }); walk(k); });
      })(t);
      (function walk(n) {
        var prime = isPrime(n.v), chosen = pick && pick.node === n;
        var g = mk('g', { tabindex: -1, style: prime || n.kids ? '' : 'cursor:pointer' });
        var r = 18 + String(n.v).length * 3;
        var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', X(n.x)); c.setAttribute('cy', Y(n.depth)); c.setAttribute('r', r);
        c.setAttribute('fill', prime ? acc : chosen ? blue : card); c.setAttribute('fill-opacity', prime ? 0.2 : chosen ? 0.25 : 1);
        c.setAttribute('stroke', prime ? acc : n.kids ? 'none' : blue); c.setAttribute('stroke-width', prime ? 3 : 2); g.appendChild(c);
        var tx = document.createElementNS(NS, 'text'); tx.setAttribute('x', X(n.x)); tx.setAttribute('y', Y(n.depth) + 6); tx.setAttribute('text-anchor', 'middle'); tx.setAttribute('font-size', 18); tx.setAttribute('font-weight', 600); tx.setAttribute('fill', ink); tx.textContent = n.v; g.appendChild(tx);
        if (!prime && !n.kids) g.addEventListener('click', function () { choose(ti, n); });
        if (n.kids) n.kids.forEach(walk);
      })(t);
    });
    if (both) {   // Venn diagram of the primes
      var A = factorisation(trees[0]).primes, Bp = factorisation(trees[1]).primes;
      var all = Object.keys(A).concat(Object.keys(Bp)).filter(function (p, i, a) { return a.indexOf(p) === i; }).map(Number).sort(function (a, b) { return a - b; });
      var shared = [], onlyA = [], onlyB = [];
      all.forEach(function (p) { var a = A[p] || 0, b = Bp[p] || 0, m = Math.min(a, b); for (var i = 0; i < m; i++) shared.push(p); for (i = 0; i < a - m; i++) onlyA.push(p); for (i = 0; i < b - m; i++) onlyB.push(p); });
      var cy = areaH + (H - areaH) / 2 + 4, rx = Math.min(W * 0.2, 150), ry = (H - areaH) / 2 - 8, cxA = W / 2 - rx * 0.55, cxB = W / 2 + rx * 0.55;
      mk('ellipse', { cx: cxA, cy: cy, rx: rx, ry: ry, fill: blue, 'fill-opacity': 0.12, stroke: blue, 'stroke-width': 2 });
      mk('ellipse', { cx: cxB, cy: cy, rx: rx, ry: ry, fill: acc, 'fill-opacity': 0.12, stroke: acc, 'stroke-width': 2 });
      var put = function (list, x) { var t2 = mk('text', { x: x, y: cy + 6, 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: ink }); t2.textContent = list.join(' × ') || '–'; };
      put(onlyA, cxA - rx * 0.55); put(shared, W / 2); put(onlyB, cxB + rx * 0.55);
      var la = mk('text', { x: cxA - rx * 0.8, y: cy - ry + 14, 'font-size': 13, fill: blue }); la.textContent = String(trees[0].v);
      var lb = mk('text', { x: cxB + rx * 0.8, y: cy - ry + 14, 'text-anchor': 'end', 'font-size': 13, fill: acc }); lb.textContent = String(trees[1].v);
    }
    el.appendChild(svg);
  }

  function choose(ti, node) { pick = { ti: ti, node: node }; draw(); paintPick(); }
  function split(a, b) {
    if (!pick) return;
    pick.node.kids = [{ v: a }, { v: b }];
    pick = null; B.moved = true; draw(); paintPick(); report();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    ui.pick = document.createElement('div'); ui.pick.className = 'gbar nlops ftpick'; ui.pick.setAttribute('role', 'group'); panel.appendChild(ui.pick);
    var bar = document.createElement('div'); bar.className = 'gbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
    paintPick();
  }
  function paintPick() {
    ui.pick.replaceChildren();
    if (pick) {
      var lab = document.createElement('span'); lab.textContent = 'Split ' + pick.node.v + ' into'; ui.pick.appendChild(lab);
      pairs(pick.node.v).forEach(function (p) { var b = document.createElement('button'); b.type = 'button'; b.textContent = p[0] + ' × ' + p[1]; b.addEventListener('click', function () { split(p[0], p[1]); }); ui.pick.appendChild(b); });
      var cancel = document.createElement('button'); cancel.type = 'button'; cancel.textContent = 'Cancel'; cancel.addEventListener('click', function () { pick = null; draw(); paintPick(); }); ui.pick.appendChild(cancel);
      ui.pick.setAttribute('aria-label', 'Choose a factor pair');
    } else {
      var open = [];
      trees.forEach(function (t, ti) { leaves(t).forEach(function (n) { if (!isPrime(n.v)) open.push([ti, n]); }); });
      if (open.length) {
        var l2 = document.createElement('span'); l2.textContent = 'Split'; ui.pick.appendChild(l2);
        open.forEach(function (o) { var b = document.createElement('button'); b.type = 'button'; b.textContent = String(o[1].v); b.setAttribute('aria-label', 'Split ' + o[1].v); b.addEventListener('click', function () { choose(o[0], o[1]); }); ui.pick.appendChild(b); });
        ui.pick.setAttribute('aria-label', 'Choose a number to split');
      }
    }
  }

  function report() {
    var F = trees.map(factorisation), vars = { n: trees[0].v, k: F[0].k, c: F[0].done ? 1 : 0, h: 0, l: 0 };
    if (F[1]) { vars.N = trees[1].v; vars.K = F[1].k; vars.C = F[1].done ? 1 : 0; }
    ui.work.textContent = F.map(function (f) { return f.text; }).join(';  ');
    var note = F.every(function (f) { return f.done; }) ? 'Every branch ends in a prime.' : 'Keep splitting: click a number that is not prime (or use the buttons below).';
    if (F[1] && F[0].done && F[1].done) {
      vars.h = gcd(trees[0].v, trees[1].v); vars.l = trees[0].v * trees[1].v / vars.h;
      note = 'Shared primes (the middle) multiply to the HCF: ' + vars.h + '. All the primes in the diagram multiply to the LCM: ' + vars.l + '.';
    }
    ui.note.textContent = note;
    B.say(ui.work.textContent + '. ' + note);
    var strip = function (t) { return t.kids ? { v: t.v, kids: t.kids.map(strip) } : { v: t.v }; };
    B.save({ trees: trees.map(strip) });
    B.post({ scope: { vars: vars, points: {} } }, ui.work.textContent + '. ' + note);
  }

  B.widget('factortree', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A factor tree for ' + s.number + (s.second !== undefined ? ' and ' + s.second : ''); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec; pick = null;
      var sv = fresh ? null : B.saved();
      trees = spec.grown ? [grow({ v: spec.n })].concat(spec.m ? [grow({ v: spec.m })] : []) : sv && sv.trees && sv.trees.length === (spec.m ? 2 : 1) && sv.trees[0].v === spec.n ? sv.trees : [{ v: spec.n }].concat(spec.m ? [{ v: spec.m }] : []);
      paintPanel(); draw(); report();
    },
    redraw: function () { draw(); },
    resize: function () { draw(); },
  });
})(WPB);
