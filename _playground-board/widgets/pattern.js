// Growing pattern: figure n of a pattern made of sticks or dots, with what figure n added shown in colour.
//   widget: pattern
//   shape: squares            a row of squares made of sticks (3n + 1)
//   shape: triangles          a strip of triangles made of sticks (2n + 1)
//   shape: cross              a centre dot with four arms of n dots (4n + 1)
//   shape: columns            a starting group of b dots, then n columns of a dots (an + b)
//   add: 3, start: 2          columns: dots in each new column, and in the starting group
//   adjust: on                columns: sliders for a (add) and b (start), so students design the pattern
//   n: 1, 8, 1                the figure slider: first, last, start (default 1, 8, 1)
//   count: on                 show how many sticks or dots the figure has (default off: students count)
// state: { scope: { vars: { n, s (the count), a, b } } }
(function (B) {
  'use strict';
  var spec = null, n = 1, a = 3, b = 2, ui = {};
  var SVGNS = 'http://www.w3.org/2000/svg';
  var COUNT = { squares: function (k) { return 3 * k + 1; }, triangles: function (k) { return 2 * k + 1; }, cross: function (k) { return 4 * k + 1; }, columns: function (k) { return a * k + b; } };
  var UNIT = { squares: 'sticks', triangles: 'sticks', cross: 'dots', columns: 'dots' };

  function parse(s) {
    s.shape = (s.shape || 'squares').trim();
    if (!COUNT[s.shape]) throw new Error('shape must be squares, triangles, cross or columns (got "' + s.shape + '").');
    var r = String(s.n || '1, 8, 1').split(',').map(function (t) { return Number(t.trim()); });
    if (r.length < 2 || r.some(function (v) { return !(v >= 0) || v % 1; }) || r[0] >= r[1]) throw new Error('n: needs whole numbers first, last (and start), such as "n: 1, 8, 1".');
    s.nr = [r[0], r[1], r[2] === undefined ? r[0] : r[2]];
    s.add = s.add === undefined ? 3 : Number(s.add); s.start = s.start === undefined ? 2 : Number(s.start);
    if (!(s.add >= 0) || !(s.start >= 0) || s.add % 1 || s.start % 1) throw new Error('add: and start: must be whole numbers.');
    s.showCount = /^on$/i.test(s.count || '');
    s.adjust = /^on$/i.test(s.adjust || '') && s.shape === 'columns';
  }

  function el(tag, attrs, parent) { var e = document.createElementNS(SVGNS, tag); Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (parent) parent.appendChild(e); return e; }

  // Sticks or dots for figure k as [{ x1, y1, x2, y2 } | { cx, cy }, isNew], in units of one stick (1).
  function parts(k) {
    var out = [], i;
    if (spec.shape === 'squares') {
      // The first square is 4 sticks; each later square adds a top, a bottom and a right side.
      for (i = 0; i < k; i++) {
        var nw = i === k - 1 && k > 1;
        if (i === 0) out.push([{ x1: 0, y1: 0, x2: 0, y2: 1 }, k === 1]);
        out.push([{ x1: i, y1: 0, x2: i + 1, y2: 0 }, nw || k === 1], [{ x1: i, y1: 1, x2: i + 1, y2: 1 }, nw || k === 1], [{ x1: i + 1, y1: 0, x2: i + 1, y2: 1 }, nw || k === 1]);
      }
    } else if (spec.shape === 'triangles') {
      // Zigzag: bottom points at whole numbers, top points halfway; each triangle adds a side and a base.
      var h = Math.sqrt(3) / 2, pt = function (j) { return j % 2 === 0 ? [j / 2, h] : [(j - 1) / 2 + 0.5, 0]; };
      for (i = 0; i < k; i++) {
        var nw2 = i === k - 1 && k > 1, p0 = pt(i), p1 = pt(i + 1), p2 = pt(i + 2);
        if (i === 0) out.push([{ x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1] }, k === 1]);
        out.push([{ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1] }, nw2 || k === 1], [{ x1: p0[0], y1: p0[1], x2: p2[0], y2: p2[1] }, nw2 || k === 1]);
      }
    } else if (spec.shape === 'cross') {
      out.push([{ cx: 0, cy: 0 }, false]);
      for (i = 1; i <= k; i++) [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { out.push([{ cx: d[0] * i * 0.6, cy: d[1] * i * 0.6 }, i === k && k > 0]); });
    } else {
      for (i = 0; i < b; i++) out.push([{ cx: 0, cy: i * 0.5, start: true }, false]);
      for (var c = 1; c <= k; c++) for (i = 0; i < a; i++) out.push([{ cx: c * 0.6 + 0.3, cy: i * 0.5 }, c === k]);
    }
    return out;
  }

  function draw() {
    var box = ui.svg, all = parts(n), xs = [], ys = [];
    box.replaceChildren();
    all.forEach(function (p) { var q = p[0]; if (q.cx !== undefined) { xs.push(q.cx); ys.push(q.cy); } else { xs.push(q.x1, q.x2); ys.push(q.y1, q.y2); } });
    var pad = 0.5, x0 = Math.min.apply(null, xs) - pad, x1 = Math.max.apply(null, xs) + pad, y0 = Math.min.apply(null, ys) - pad, y1 = Math.max.apply(null, ys) + pad;
    // Keep the same scale for every figure (sized for the largest), so the pattern visibly grows.
    var big = spec.nr[1], bw = { squares: big + 1, triangles: big / 2 + 1.5, cross: big * 1.2 + 1, columns: big * 0.6 + 1.6 }[spec.shape], bh = { squares: 2, triangles: 1.9, cross: big * 1.2 + 0.6, columns: Math.max(a, b, 1) * 0.5 + 1 }[spec.shape];
    var w = Math.max(x1 - x0, bw), hgt = Math.max(y1 - y0, bh);
    box.setAttribute('viewBox', [x0, y0 - (hgt - (y1 - y0)) / 2, w, hgt].join(' '));
    var ink = B.css('--muted') || '#5d6675', acc = B.css('--accent') || '#c2570a', st = B.css('--left') || '#2f6fb3';
    all.forEach(function (p) {
      var q = p[0], col = p[1] ? acc : (q.start ? ink : st);
      if (q.cx !== undefined) el('circle', { cx: q.cx, cy: q.cy, r: spec.shape === 'cross' ? 0.22 : 0.17, fill: col }, box);
      else el('line', { x1: q.x1, y1: q.y1, x2: q.x2, y2: q.y2, stroke: col, 'stroke-width': 0.12, 'stroke-linecap': 'round' }, box);
    });
    box.setAttribute('aria-label', 'Figure ' + n + ' of the pattern' + (spec.showCount ? ': ' + COUNT[spec.shape](n) + ' ' + UNIT[spec.shape] : ''));
  }

  function report() {
    var s = COUNT[spec.shape](n);
    ui.fig.textContent = 'Figure ' + n + (spec.showCount ? ': ' + s + ' ' + UNIT[spec.shape] : '');
    ui.out.textContent = 'n = ' + n;
    if (ui.aOut) { ui.aOut.textContent = 'a = ' + a; ui.bOut.textContent = 'b = ' + b; }
    draw();
    B.say(n > spec.nr[0] ? 'The new part of figure ' + n + ' is in orange.' : '');
    B.save({ n: n, a: a, b: b });
    var vars = { n: n, s: s }; if (spec.shape === 'columns') { vars.a = a; vars.b = b; }
    B.post({ scope: { vars: vars, points: {} } }, 'Figure ' + n + (spec.showCount ? ': ' + s + ' ' + UNIT[spec.shape] : ''));
  }

  function slider(panel, name, label, min, max, val, set) {
    var row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = name; lab.htmlFor = 'sl-' + name;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + name + ' smaller');
    var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + name; r.min = min; r.max = max; r.step = 1; r.value = val; r.setAttribute('aria-label', label);
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + name + ' bigger');
    var out = document.createElement('output'); out.htmlFor = r.id;
    var go = function (v) { v = Math.max(min, Math.min(max, v)); r.value = v; set(v); B.moved = true; report(); };
    r.addEventListener('input', function () { go(Number(r.value)); });
    minus.addEventListener('click', function () { go(Number(r.value) - 1); });
    plus.addEventListener('click', function () { go(Number(r.value) + 1); });
    row.append(lab, minus, r, plus, out); panel.appendChild(row);
    return out;
  }

  B.widget('pattern', {
    sections: ['gpanel'],
    label: function () { return 'A growing pattern'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      n = sv && sv.n !== undefined ? sv.n : spec.nr[2];
      a = sv && sv.a !== undefined ? sv.a : spec.add; b = sv && sv.b !== undefined ? sv.b : spec.start;
      var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
      var fig = document.createElement('div'); fig.className = 'patfig';
      ui.svg = el('svg', { role: 'img', class: 'patsvg', preserveAspectRatio: 'xMidYMid meet' }, fig);
      ui.fig = document.createElement('p'); ui.fig.className = 'patlabel'; fig.appendChild(ui.fig);
      panel.appendChild(fig);
      ui.out = slider(panel, 'n', 'Figure number', spec.nr[0], spec.nr[1], n, function (v) { n = v; });
      if (spec.adjust) {
        ui.aOut = slider(panel, 'a', 'Dots added each figure', 1, 9, a, function (v) { a = v; });
        ui.bOut = slider(panel, 'b', 'Dots in the starting group', 0, 20, b, function (v) { b = v; });
      }
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
      report();
    },
    redraw: function () { if (spec) draw(); },
  });
})(WPB);
