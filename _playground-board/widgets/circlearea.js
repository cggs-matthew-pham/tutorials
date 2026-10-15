// Area of a circle: cut a circle into n equal pieces (sectors) and rearrange them, alternately up and down, into a
// shape that gets closer to a rectangle πr long and r high as n grows; or compare the circle with squares of side r
// (it is more than 2r² and less than 4r²).
//   widget: circlearea
//   slider r: 1, 5, 3        the radius (or fixed "r: 3")
//   slider n: 4, 32, 8, 4    how many pieces (even; or fixed "n: 8")
//   cut: on                  the "Rearrange the pieces" button (and "Put the circle back"); "cut: shown" starts rearranged
//   squares: on              the "Compare with squares" button; "squares: shown" starts that way
//   units: cm
// state: { scope: { vars: { r, n, a (πr², 2 dp), c (2πr, 2 dp), w (πr, 2 dp, the long side), k (1 while
//   rearranged), s (1 while the squares show) } } }
// Checks: "k = 1 and n >= 16", "r = 4", "s = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {}, st = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 'r' && it.name !== 'n') throw new Error('Line ' + it.line + ': the board has sliders r (the radius) and n (the pieces) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] <= 0) throw new Error('slider ' + it.name + ': min, max, start (more than 0), and an optional step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || (it.name === 'n' ? 2 : 1) };
    });
    ['r', 'n'].forEach(function (n) {
      if (s[n] !== undefined) s.fix[n] = nums(s[n], n)[0];
      else if (!s.sl[n]) s.fix[n] = n === 'r' ? 3 : 8;
    });
    var nv = s.sl.n ? [s.sl.n.min, s.sl.n.max, s.sl.n.start, s.sl.n.step] : [s.fix.n];
    if (nv.some(function (v) { return v % 2 || v < 4 || v > 64; })) throw new Error('n: even numbers from 4 to 64.');
    s.cutWord = String(s.cut || ''); s.cut = /^(on|shown)$/i.test(s.cutWord);
    s.sq = /^(on|shown)$/i.test(s.squares || ''); s.sqShown = /^shown$/i.test(s.squares || '');
    s.u = s.units ? String(s.units).trim() : '';
    s.R = s.sl.r ? s.sl.r.max : s.fix.r;
  }
  var F = function (v) { return B.fmt(r2(v)); };
  var L = function (v, p) { return F(v) + (spec.u ? ' ' + spec.u + (p === 2 ? '²' : '') : ''); };

  function draw() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img');
    svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', purple = B.css('--right') || '#8a4fb8';
    var R = spec.R, r = vars.r, n = vars.n, th = 2 * Math.PI / n;
    void R;
    var u = 150 / r, pad = 55 / u, Wu = (st.k ? Math.PI * r + r * th + 1.2 * r : 2 * r) + 2 * pad, Hu = (st.k ? r + 1.0 * r : 2 * r) + 2 * pad;
    var W = Wu * u, H = Hu * u;
    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0));
    var top = st.k ? r + 0.2 * r : 2 * r;
    var X = function (x) { return (x + pad) * u; }, Y = function (y) { return (top + pad - y) * u; };
    var txt = function (x, y, t, col, anchor) { return add('text', { x: X(x).toFixed(1), y: Y(y).toFixed(1), 'text-anchor': anchor || 'middle', 'dominant-baseline': 'middle', 'font-size': 17, 'font-weight': 600, fill: col, 'font-family': 'system-ui, sans-serif' }, t); };
    var sector = function (cx, cy, a0, a1, col, op) {
      var p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
      var d = 'M' + X(cx).toFixed(1) + ' ' + Y(cy).toFixed(1) + ' L' + X(p0[0]).toFixed(1) + ' ' + Y(p0[1]).toFixed(1) +
        ' A' + (r * u).toFixed(1) + ' ' + (r * u).toFixed(1) + ' 0 0 0 ' + X(p1[0]).toFixed(1) + ' ' + Y(p1[1]).toFixed(1) + ' Z';
      add('path', { d: d, fill: col, 'fill-opacity': op, stroke: ink, 'stroke-width': 1.2, 'stroke-linejoin': 'round' });
    };
    if (!st.k) {
      var cx = r, cy = r;
      if (st.s) {
        add('rect', { x: X(cx - r), y: Y(cy + r), width: 2 * r * u, height: 2 * r * u, fill: 'none', stroke: muted, 'stroke-width': 2, 'stroke-dasharray': '7 5' });
        add('polygon', { points: [[cx, cy + r], [cx + r, cy], [cx, cy - r], [cx - r, cy]].map(function (p) { return X(p[0]) + ',' + Y(p[1]); }).join(' '), fill: 'none', stroke: purple, 'stroke-width': 2, 'stroke-dasharray': '7 5' });
      }
      if (st.s) add('circle', { cx: X(cx), cy: Y(cy), r: r * u, fill: blue, 'fill-opacity': 0.14, stroke: blue, 'stroke-width': 2.5 });
      else for (var i = 0; i < n; i++) sector(cx, cy, i * th, (i + 1) * th, i % 2 ? orange : blue, 0.3);
      if (st.s) {
        add('rect', { x: X(cx), y: Y(cy + r), width: r * u, height: r * u, fill: orange, 'fill-opacity': 0.22, stroke: orange, 'stroke-width': 2 });
        txt(cx + r * 0.72, cy + r * 0.8, 'r²', ink);
        add('text', { x: X(cx - r), y: Y(cy + r) - 16, 'font-size': 17, 'font-weight': 600, fill: muted, 'font-family': 'system-ui, sans-serif' }, 'outside square 4r² = ' + L(4 * r * r, 2));
        add('text', { x: X(cx - r), y: Y(cy - r) + 24, 'font-size': 17, 'font-weight': 600, fill: purple, 'font-family': 'system-ui, sans-serif' }, 'inside square 2r² = ' + L(2 * r * r, 2));
      }
      if (!st.s) { add('line', { x1: X(cx), y1: Y(cy), x2: X(cx + r * Math.cos(-th / 2)), y2: Y(cy + r * Math.sin(-th / 2)), stroke: ink, 'stroke-width': 2.5 }); txt(cx + r * 0.5, cy - 0.12 * r - 0.2 * r, 'r = ' + L(r), ink); }
      svg.setAttribute('aria-label', 'A circle of radius ' + r + ' cut into ' + n + ' equal pieces' + (st.s ? ', inside a square of side 2r and around a square on its diagonals' : '') + '.');
    } else {
      // pieces alternately apex up and apex down, side by side
      var s = r * th, x0 = 0;
      for (var j = 0; j < n; j++) {
        var up = j % 2 === 0, mx = x0 + (up ? (j / 2) * s + s / 2 : ((j - 1) / 2) * s + s);
        if (up) sector(mx, r, -Math.PI / 2 - th / 2, -Math.PI / 2 + th / 2, j % 4 === 0 ? blue : orange, 0.3);
        else sector(mx, 0, Math.PI / 2 - th / 2, Math.PI / 2 + th / 2, j % 4 === 1 ? orange : blue, 0.3);
      }
      var wTot = (n / 2) * s + s / 2;
      add('line', { x1: X(x0), y1: Y(0) + 14, x2: X(x0 + (n / 2) * s), y2: Y(0) + 14, stroke: orange, 'stroke-width': 3 });
      add('text', { x: X(x0 + (n / 2) * s / 2), y: Y(0) + 36, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 17, 'font-weight': 600, fill: orange, 'font-family': 'system-ui, sans-serif' }, 'half the circumference: πr ≈ ' + L(Math.PI * r));
      add('line', { x1: X(x0 + wTot) + 14, y1: Y(0), x2: X(x0 + wTot) + 14, y2: Y(r), stroke: ink, 'stroke-width': 3 });
      add('text', { x: X(x0 + wTot) + 24, y: Y(r / 2), 'dominant-baseline': 'middle', 'font-size': 17, 'font-weight': 600, fill: ink, 'font-family': 'system-ui, sans-serif' }, 'r = ' + L(r));
      svg.setAttribute('aria-label', n + ' pieces of a circle of radius ' + r + ' laid alternately up and down: nearly a rectangle about πr long and r high.');
    }
    el.appendChild(svg);
  }

  function slider(nm, label) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[nm] = r2(v); rr.value = vars[nm]; B.moved = true; draw(); report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - sl.step); });
    plus.addEventListener('click', function () { set(vars[nm] + sl.step); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out });
    return row;
  }
  function btn(bar, text, fn) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.setAttribute('aria-label', text); b.addEventListener('click', fn); bar.appendChild(b); return b; }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl.r) panel.appendChild(slider('r', 'the radius'));
    if (spec.sl.n) panel.appendChild(slider('n', 'the number of pieces'));
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.cut) { btn(bar, 'Rearrange the pieces', function () { st.k = 1; st.s = 0; B.moved = true; draw(); report(); }); btn(bar, 'Put the circle back', function () { st.k = 0; B.moved = true; draw(); report(); }); }
    if (spec.sq) btn(bar, 'Compare with squares', function () { st.s = st.s ? 0 : 1; st.k = 0; B.moved = true; draw(); report(); });
    if (bar.children.length || spec.sl.r || spec.sl.n) { btn(bar, 'Start again', B.restart); panel.appendChild(bar); }
  }

  function report() {
    var r = vars.r, n = vars.n, a = Math.PI * r * r;
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + B.fmt(vars[o.n]); });
    if (st.k) {
      ui.work.textContent = 'A ≈ πr × r = ' + F(Math.PI * r) + ' × ' + F(r) + ' = ' + L(a, 2);
      ui.note.textContent = n + ' pieces: ' + (n < 16 ? 'the top and bottom are still bumpy. More pieces make it closer to a rectangle.' : 'nearly a rectangle, πr long (half the circumference) and r high. So A = πr².');
    } else if (st.s) {
      ui.work.textContent = 'A = πr² = π × ' + F(r * r) + ' ≈ ' + L(a, 2);
      ui.note.textContent = 'The circle is bigger than the inside square (2r² = ' + L(2 * r * r, 2) + ') and smaller than the outside square (4r² = ' + L(4 * r * r, 2) + '): about 3.14 squares of r².';
    } else {
      ui.work.textContent = 'A = πr² = π × ' + F(r) + '² ≈ ' + L(a, 2);
      ui.note.textContent = 'A circle of radius ' + L(r) + ', cut into ' + n + ' equal pieces.' + (spec.cut ? ' Rearrange them to see why the area is πr².' : '');
    }
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ vars: vars, k: st.k, s: st.s });
    B.post({ scope: { vars: { r: r, n: n, a: r2(a), c: r2(2 * Math.PI * r), w: r2(Math.PI * r), k: st.k, s: st.s }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('circlearea', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A circle cut into equal pieces, to find its area'; },
    parse: parse,
    redraw: function () { if (spec) draw(); },
    resize: function () { if (spec) draw(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      ['r', 'n'].forEach(function (nm) { vars[nm] = spec.sl[nm] ? (sv && sv.vars && sv.vars[nm] !== undefined ? sv.vars[nm] : spec.sl[nm].start) : spec.fix[nm]; });
      var cutShown = /^shown$/i.test(String(spec.cutWord || '')), sqShown = spec.sqShown;
      st = { k: sv ? sv.k || 0 : (cutShown ? 1 : 0), s: sv ? sv.s || 0 : (sqShown ? 1 : 0) };
      paintPanel(); draw(); report();
    },
  });
})(WPB);
