// Rates on a double number line: two quantities with different units (km and h, $ and kg) lined up, so the rate is
// "this much of the top for 1 of the bottom". Optionally a second rate to compare, a fixed starting amount (a taxi's flag
// fall) and the km/h to m/s conversion.
//   widget: rate
//   top: km, distance         the top quantity's unit and name
//   bottom: h, time           the bottom quantity's unit and name
//   rate: 60                  top per 1 bottom (or "slider r: 20, 120, 60, 5")
//   slider x: 0, 10, 2, 0.5   how much of the bottom quantity (or fixed "x: 2"); the line runs from 0 to its max
//   compare: 75, Car B        a second rate to compare (its name optional); the first is named by "name: Car A"
//   base: 4.2                 a fixed amount at the start (top = base + rate × bottom), drawn as a head start
//   money: top                write the top (or bottom) quantity as dollars ($4.20)
// state: { scope: { vars: { r (the rate), x, y (base + r × x), c (the compared rate's amount at x, else 0), q (the
//   compared rate), b (base), m (the rate in m/s when top is km and bottom is h, 2 dp) } } }
// Checks: "x = 3 and y = 180", "r = 75", "y > c".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, vars = {}, ui = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function unitName(t, def) { var p = String(t || def).split(',').map(function (x) { return x.trim(); }); return { u: p[0], n: p[1] || p[0] }; }
  function parse(s) {
    s.T = unitName(s.top, 'km, distance'); s.Bt = unitName(s.bottom, 'h, time');
    s.sl = {}; s.fix = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 'r' && it.name !== 'x') throw new Error('Line ' + it.line + ': the rate board has sliders r (the rate) and x (the bottom amount).');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': min, max, start, step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    if (!s.sl.r) { if (s.rate === undefined) throw new Error('rate: give the rate ("rate: 60") or a slider ("slider r: 20, 120, 60, 5").'); s.fix.r = nums(s.rate, 'rate')[0]; }
    if (!s.sl.x) s.fix.x = s.x !== undefined ? nums(s.x, 'x')[0] : 1;
    s.xmax = s.sl.x ? s.sl.x.max : Math.max(1, s.fix.x);
    s.name1 = s.name ? String(s.name).trim() : '';
    if (s.compare !== undefined) { var c = String(s.compare).split(','); s.cmp = Number(c[0]); s.name2 = (c[1] || '').trim(); if (!isFinite(s.cmp)) throw new Error('compare: a rate, then an optional name: "compare: 75, Car B".'); }
    s.base = s.base !== undefined ? nums(s.base, 'base')[0] : 0;
    s.money = /^(top|bottom)$/i.test(s.money || '') ? s.money.toLowerCase() : (s.T.u === '$' ? 'top' : s.Bt.u === '$' ? 'bottom' : '');
  }
  function fmtQ(v, which) {
    var U = which === 'top' ? spec.T.u : spec.Bt.u;
    if (spec.money === which) { var c = Math.round(v * 100) % 100; return '$' + (c ? v.toFixed(2) : String(Math.round(v))); }
    return B.fmt(r2(v)) + ' ' + U;
  }
  var rateText = function (r) { return (spec.money === 'top' ? '$' + (Math.round(r * 100) % 100 ? r.toFixed(2) : r) : B.fmt(r2(r)) + ' ' + spec.T.u) + ' per ' + (spec.money === 'bottom' ? '$1' : spec.Bt.u); };

  function draw() {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', purple = B.css('--right') || '#8a4fb8', card = B.css('--card') || '#fff';
    var font = 'system-ui, sans-serif', cmp = spec.cmp !== undefined;
    var H = cmp ? 330 : 250, W = 900, L = 200, R = 870, yT = 80, yB = 170, yC = 260;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var xm = spec.xmax, X = function (b) { return L + (R - L) * b / xm; };
    var step = xm <= 12 ? 1 : xm <= 30 ? 5 : xm <= 120 ? 10 : Math.pow(10, Math.floor(Math.log10(xm)));
    var lines = [[yT, spec.T.n + (spec.name1 ? ' (' + spec.name1 + ')' : ''), vars.r, blue], [yB, spec.Bt.n, null, ink]];
    if (cmp) lines.push([yC, spec.T.n + (spec.name2 ? ' (' + spec.name2 + ')' : ''), spec.cmp, purple]);
    lines.forEach(function (ln) {
      add('line', { x1: L, y1: ln[0], x2: R, y2: ln[0], stroke: ln[3], 'stroke-width': 2.5 });
      add('text', { x: 16, y: ln[0] + 5, 'font-size': 15, 'font-weight': 700, 'font-family': font, fill: ln[3] }, ln[1]);
      for (var b = 0; b <= xm + 1e-9; b += step) {
        add('line', { x1: X(b), y1: ln[0] - 7, x2: X(b), y2: ln[0] + 7, stroke: ln[3], 'stroke-width': 1.5 });
        var val = ln[2] === null ? b : (ln === lines[0] ? spec.base : 0) + ln[2] * b;
        add('text', { x: X(b), y: ln[0] + 26, 'text-anchor': 'middle', 'font-size': 13, 'font-family': font, fill: muted }, ln[2] === null ? fmtQ(b, 'bottom') : fmtQ(val, 'top'));
      }
    });
    // the unit rate: 1 of the bottom matches r of the top
    if (xm >= 1 && !spec.base) {
      add('line', { x1: X(1), y1: yT + 9, x2: X(1), y2: yB - 9, stroke: orange, 'stroke-width': 2, 'stroke-dasharray': '5 4' });
      add('text', { x: X(1) + 6, y: (yT + yB) / 2 + 4, 'font-size': 13, 'font-weight': 700, 'font-family': font, fill: orange }, 'unit rate');
    }
    // the current amount
    var x = vars.x;
    add('line', { x1: X(x), y1: yT - 22, x2: X(x), y2: (cmp ? yC : yB) + 8, stroke: ink, 'stroke-width': 3 });
    var lab = function (y, t, col) { var w = t.length * 8.5 + 16, xx = Math.min(Math.max(X(x) - w / 2, 4), W - w - 4); add('rect', { x: xx, y: y - 16, width: w, height: 24, rx: 5, fill: card, stroke: col, 'stroke-width': 1.5 }); add('text', { x: xx + w / 2, y: y + 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 14, 'font-weight': 700, 'font-family': font, fill: ink }, t); };
    lab(yT - 30, fmtQ(spec.base + vars.r * x, 'top'), blue);
    lab(yB - 26, fmtQ(x, 'bottom'), ink);
    if (cmp) lab(yC - 26, fmtQ(spec.cmp * x, 'top'), purple);
    if (spec.base) add('text', { x: L, y: yT - 50, 'font-size': 13, 'font-family': font, fill: muted }, 'Starts at ' + fmtQ(spec.base, 'top') + ' before any ' + spec.Bt.n + '.');
    svg.setAttribute('aria-label', 'A double number line: ' + fmtQ(x, 'bottom') + ' matches ' + fmtQ(spec.base + vars.r * x, 'top') + (cmp ? ', against ' + fmtQ(spec.cmp * x, 'top') : '') + '.');
    el.appendChild(svg);
  }
  function slider(nm, label) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' smaller');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' bigger');
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[nm] = r2(v); rr.value = vars[nm]; B.moved = true; report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - sl.step); });
    plus.addEventListener('click', function () { set(vars[nm] + sl.step); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out });
    return row;
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl.r) panel.appendChild(slider('r', 'the rate'));
    if (spec.sl.x) panel.appendChild(slider('x', 'the ' + spec.Bt.n));
    if (spec.sl.r || spec.sl.x) { var bar = document.createElement('div'); bar.className = 'gbar'; var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again); panel.appendChild(bar); }
  }
  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + (o.n === 'x' ? fmtQ(vars.x, 'bottom') : rateText(vars.r)); });
    draw();
    var r = vars.r, x = vars.x, y = r2(spec.base + r * x), cmp = spec.cmp !== undefined, c = cmp ? r2(spec.cmp * x) : 0;
    var kmh = spec.T.u === 'km' && spec.Bt.u === 'h';
    ui.work.textContent = (spec.base ? fmtQ(spec.base, 'top') + ' + ' : '') + rateText(r) + ' × ' + fmtQ(x, 'bottom') + ' = ' + fmtQ(y, 'top');
    var note = 'Rate: ' + rateText(r) + (spec.name1 ? ' (' + spec.name1 + ')' : '') + '.';
    if (cmp) note += ' ' + (spec.name2 || 'The other') + ': ' + rateText(spec.cmp) + ', so ' + fmtQ(c, 'top') + ' for ' + fmtQ(x, 'bottom') + '.';
    if (kmh) note += ' In metres per second: ' + B.fmt(r) + ' × 1000 ÷ 3600 = ' + B.fmt(r2(r / 3.6)) + ' m/s.';
    if (spec.base) note += ' The starting ' + fmtQ(spec.base, 'top') + ' is paid even for 0 ' + spec.Bt.u + '.';
    ui.note.textContent = note;
    B.say(ui.work.textContent + '. ' + note);
    B.save({ vars: vars });
    B.post({ scope: { vars: { r: r, x: x, y: y, c: c, q: cmp ? spec.cmp : 0, b: spec.base, m: kmh ? r2(r / 3.6) : 0 }, points: {} } }, ui.work.textContent + '. ' + note);
  }
  B.widget('rate', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A double number line for a rate'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      vars = {}; ['r', 'x'].forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fix[n]; });
      paintPanel(); report();
    },
  });
})(WPB);
