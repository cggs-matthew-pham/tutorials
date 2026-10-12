// Ratio tapes: a ratio drawn as rows (or one bar) of equal blocks.
//   widget: ratio
//   mode: tape | share
//   a: 2   b: 3   c: 4      the ratio's terms (a, b, and an optional c); or sliders "slider a: 1, 9, 2"
//   labels: red, blue       what each term counts (default A, B, C)
//   tape:  one row per term; k copies of the ratio ("slider k: 1, 8, 1") repeat it, so the ratio is equivalent: 2k : 3k.
//          The text also gives part-to-part (a : b) and part-to-whole (a : whole).
//   share: one bar of a + b (+ c) equal parts for a total ("total: 60" or "slider total: 10, 200, 60, 10"); one part is
//          total ÷ parts, and each share is its terms' parts.
//   units: $                "$" goes before amounts; anything else (kg, mL) goes after
// state vars (single letters): a, b, c (0 if there are two terms), k, p q r (a, b, c times k), t (a + b + c), g (the biggest
//   number that divides every term), s (1 if the ratio is in simplest form), w (the total), u (the value of one part),
//   x y z (the shares of a, b, c)
// Checks: "p = 6 and q = 9", "a = 3 and b = 5 and s = 1", "w = 60 and x = 24".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var NS = 'http://www.w3.org/2000/svg';
  var NAMES = ['a', 'b', 'c', 'k', 'total'];
  var r6 = function (v) { return Math.round(v * 1e6) / 1e6; };
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function gcd(x, y) { return y === 0 ? x : gcd(y, x % y); }

  function parse(s) {
    s.mode = String(s.mode || 'tape').trim().toLowerCase();
    if (['tape', 'share'].indexOf(s.mode) < 0) throw new Error('mode: tape or share.');
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (NAMES.indexOf(it.name) < 0) throw new Error('Line ' + it.line + ': the ratio board has sliders a, b, c, k and total only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': needs min, max, start and an optional step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    NAMES.forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': a slider or a value, not both.'); s.fix[n] = nums(s[n], n)[0]; }
    });
    ['a', 'b'].forEach(function (n) { if (!s.sl[n] && s.fix[n] === undefined) throw new Error(n + ': needs a slider or a value.'); });
    if (s.mode === 'share' && !s.sl.total && s.fix.total === undefined) throw new Error('total: needs a slider or a value in share mode.');
    var hi = function (n) { return s.sl[n] ? s.sl[n].max : (s.fix[n] === undefined ? 0 : s.fix[n]); };
    var lo = function (n) { return s.sl[n] ? s.sl[n].min : (s.fix[n] === undefined ? 0 : s.fix[n]); };
    ['a', 'b'].forEach(function (n) { if (lo(n) < 1) throw new Error(n + ': from 1 up.'); });
    if (lo('c') < 0) throw new Error('c: from 1 up, or leave it out.');
    if (s.sl.c && s.sl.c.min < 1) throw new Error('c: from 1 up, or leave it out.');
    var kmax = s.mode === 'tape' ? (s.sl.k ? s.sl.k.max : (s.fix.k || 1)) : 1;
    if (Math.max(hi('a'), hi('b'), hi('c')) * kmax > 48) throw new Error('A row can have at most 48 blocks (the biggest term times k).');
    if (hi('a') + hi('b') + hi('c') > 40) throw new Error('A share bar can have at most 40 parts.');
    s.labels = String(s.labels || 'A, B, C').split(',').map(function (x) { return x.trim(); });
    s.u = s.units ? String(s.units).trim() : '';
    s.three = !!(s.sl.c || s.fix.c);
  }
  function amt(v) { v = B.fmt(r2(v)); return spec.u === '$' ? '$' + v : spec.u ? v + ' ' + spec.u : v; }
  function col() { return { ink: B.css('--ink') || '#1d2430', muted: B.css('--muted') || '#5d6675', cols: [B.css('--left') || '#2f6fb3', B.css('--accent') || '#c2570a', '#2e8b57'] }; }

  function draw() {
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* gone */ } B.jsxBoard = null; }
    var el = B.el('board'); el.replaceChildren();
    var c = col(), terms = [vars.a, vars.b].concat(spec.three ? [vars.c] : []), W = 720;
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0'; el.style.position = 'relative'; svg.setAttribute('role', 'img');
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var L = 90, H;
    if (spec.mode === 'tape') {
      var k = vars.k, maxBlocks = Math.max.apply(null, terms) * k, groupGap = k > 1 ? 7 : 0;
      var maxGroups = k;
      var bw = Math.min(40, (W - L - 20 - groupGap * (maxGroups - 1)) / maxBlocks), rowH = 46;
      H = terms.length * rowH + 30;
      terms.forEach(function (t, i) {
        var y = 14 + i * rowH;
        add('text', { x: 8, y: y + 26, 'font-size': 18, fill: c.ink }, spec.labels[i] || 'ABC'[i]);
        for (var g = 0; g < k; g++) for (var j = 0; j < t; j++) {
          add('rect', { x: L + (g * t + j) * bw + g * groupGap, y: y, width: bw - 2, height: 34, fill: c.cols[i], 'fill-opacity': 0.4, stroke: c.cols[i], 'stroke-width': 2 });
        }
      });
    } else {
      var t = vars.t, bw2 = Math.min(60, (W - 40) / t);
      var x0 = (W - bw2 * t) / 2; H = 190;
      var idx = 0;
      terms.forEach(function (tm, i) {
        for (var j = 0; j < tm; j++) {
          add('rect', { x: x0 + idx * bw2, y: 40, width: bw2 - 2, height: 50, fill: c.cols[i], 'fill-opacity': 0.4, stroke: c.cols[i], 'stroke-width': 2 });
          if (bw2 >= 26) add('text', { x: x0 + (idx + 0.5) * bw2 - 1, y: 71, 'text-anchor': 'middle', 'font-size': bw2 >= 44 ? 15 : 12, fill: c.ink }, B.fmt(r2(vars.one)));
          idx++;
        }
        // bracket and share under the group
        var gx0 = x0 + (idx - tm) * bw2, gx1 = x0 + idx * bw2 - 2;
        add('path', { d: 'M' + gx0 + ' 100 v8 H' + gx1 + ' v-8', fill: 'none', stroke: c.cols[i], 'stroke-width': 3 });
        add('text', { x: (gx0 + gx1) / 2, y: 134, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: c.ink }, (spec.labels[i] || 'ABC'[i]) + ': ' + tm + (tm === 1 ? ' part' : ' parts'));
        add('text', { x: (gx0 + gx1) / 2, y: 158, 'text-anchor': 'middle', 'font-size': 18, fill: c.cols[i] }, amt(vars.one * tm));
      });
      add('text', { x: W / 2, y: 22, 'text-anchor': 'middle', 'font-size': 16, fill: c.muted }, 'Total ' + amt(vars.total) + ' = ' + t + ' equal parts');
    }
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('aria-label', spec.mode === 'tape' ? 'Rows of blocks for the ratio ' + terms.join(' to ') + ', ' + vars.k + (vars.k === 1 ? ' copy.' : ' copies.') : 'A bar of ' + vars.t + ' equal parts sharing ' + vars.total + ' in the ratio ' + terms.join(' to ') + '.');
    el.appendChild(svg);
  }

  var LABELS = { a: 'the first number', b: 'the second number', c: 'the third number', k: 'the number of copies', total: 'the total' };
  function slider(n) {
    var sl = spec.sl[n], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + LABELS[n] + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + LABELS[n] + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, r6(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars[n] = v; r.value = v; B.moved = true; report(); };
    r.addEventListener('input', function () { set(Number(r.value)); });
    minus.addEventListener('click', function () { set(vars[n] - sl.step); });
    plus.addEventListener('click', function () { set(vars[n] + sl.step); });
    row.append(lab, minus, r, plus, out); ui.outs.push({ n: n, out: out });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    NAMES.forEach(function (n) { if (spec.sl[n]) panel.appendChild(slider(n)); });
    if (Object.keys(spec.sl).length) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    var a = vars.a, b = vars.b, c = spec.three ? vars.c : 0, k = vars.k, terms = [a, b].concat(spec.three ? [c] : []);
    var t = a + b + c, g = terms.reduce(gcd), L = spec.labels, txt, note;
    vars.t = t;
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + B.fmt(vars[o.n]); });
    var sc = { a: a, b: b, c: c, k: k, p: a * k, q: b * k, r: c * k, t: t, g: g, s: g === 1 ? 1 : 0 };
    if (spec.mode === 'tape') {
      var ratio = function (m) { return terms.map(function (x) { return x * m; }).join(' : '); };
      txt = ratio(1) + (k > 1 ? ' = ' + ratio(k) : '');
      note = (L[0] || 'A') + ' to ' + (L[1] || 'B') + ' is ' + a + ' : ' + b + ' (part to part). ' + (L[0] || 'A') + ' to the whole is ' + a + ' : ' + t + ' (part to whole).' + (g > 1 ? ' Every number divides by ' + g + ', so it simplifies to ' + terms.map(function (x) { return x / g; }).join(' : ') + '.' : ' It is in simplest form.');
      sc.w = 0; sc.u = 0; sc.x = 0; sc.y = 0; sc.z = 0;
    } else {
      var total = vars.total, one = r6(total / t);
      vars.one = one;
      txt = amt(total) + ' ÷ ' + t + ' = ' + amt(one) + ' for one part';
      note = 'Parts: ' + terms.join(' + ') + ' = ' + t + '. Shares: ' + terms.map(function (x) { return x + ' × ' + amt(one) + ' = ' + amt(x * one); }).join(', ') + '.';
      sc.w = total; sc.u = one; sc.x = r6(a * one); sc.y = r6(b * one); sc.z = r6(c * one);
    }
    ui.work.textContent = txt; ui.note.textContent = note;
    draw();
    B.say(txt + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: sc, points: {} } }, txt + '. ' + note);
  }

  B.widget('ratio', {
    sections: ['board', 'gpanel'],
    label: function (s) { return /share/i.test(s.mode || '') ? 'A bar split into equal parts to share a total in a ratio' : 'Rows of blocks showing a ratio'; },
    parse: parse,
    redraw: function () { if (spec) draw(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      NAMES.forEach(function (n) {
        if (spec.sl[n]) vars[n] = sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start;
        else if (spec.fix[n] !== undefined) vars[n] = spec.fix[n];
      });
      if (vars.k === undefined) vars.k = 1;
      paintPanel(); report();
    },
  });
})(WPB);
