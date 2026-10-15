// Data: a dot plot (and/or a stem-and-leaf plot) of one or two data sets, with the mean, median, mode and range shown
// live. Students add a value by clicking the line, remove one by clicking its dot, or type the values in a box.
//   widget: data
//   values: 4, 7, 7, 8, 10, 12       the data (numbers; the order does not matter)
//   range: 0, 20                     the ends of the dot plot (default: a little beyond the data)
//   step: 1                          where clicked values land (default 1; 0.5 or 0.1 for measured data)
//   edit: on                         students can change the data (click, or the box of values); default off
//   show: mean, median, mode, range  which statistics to show (marked on the plot and written underneath); or none
//   view: dots | stem | both         dot plot (default), stem-and-leaf plot (whole numbers, stems of tens), or both
//   label: Hours of sleep (h)        what the values measure, under the line
//   second: 5, 6, 8, 9               a second data set, drawn above the first for comparing (not editable)
//   names: Class A, Class B          names for the two sets
// state: { scope: { vars: { n (count), s (sum), m (mean), d (median), o (the mode; the smallest if several), k (how many
//   modes; 0 when every value appears once), r (range), l (lowest), h (highest), and the same in capitals for the second
//   set: N, S, M, D, O, K, R, L, H } } }
// Checks: "m = 8", "n = 7 and d = 6", "k = 1 and o = 7", "r = 10", "M > m".
(function (B) {
  'use strict';
  var spec = null, vals = [], ui = {};
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var show = function (v) { return B.fmt(r2(v)).replace(/^-/, '−'); };

  function nums(t, where) {
    return String(t).split(',').map(function (x) { return x.trim(); }).filter(Boolean).map(function (x) {
      var v = Number(x.replace('−', '-')); if (!isFinite(v)) throw new Error(where + ': "' + x + '" is not a number.'); return v;
    });
  }
  function parse(s) {
    s.vals = s.values !== undefined ? nums(s.values, 'values') : [];
    s.two = s.second !== undefined ? nums(s.second, 'second') : null;
    s.stepv = s.step !== undefined ? nums(s.step, 'step')[0] : 1;
    if (!(s.stepv > 0)) throw new Error('step: a positive number, such as 1 or 0.5.');
    var all = s.vals.concat(s.two || []);
    if (s.range !== undefined) { var r = nums(s.range, 'range'); if (r.length !== 2 || !(r[0] < r[1])) throw new Error('range: two numbers, low then high, such as "range: 0, 20".'); s.lo = r[0]; s.hi = r[1]; }
    else { var lo = all.length ? Math.min.apply(null, all) : 0, hi = all.length ? Math.max.apply(null, all) : 10; s.lo = Math.floor(lo - 1); s.hi = Math.ceil(hi + 1); }
    all.forEach(function (v) { if (v < s.lo || v > s.hi) throw new Error('values: ' + v + ' is outside the range ' + s.lo + ' to ' + s.hi + '.'); });
    s.edit = /^on$/i.test(s.edit || '');
    var sh = String(s.show === undefined ? 'mean, median, mode, range' : s.show).toLowerCase();
    s.shows = /^none$/.test(sh.trim()) ? [] : sh.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    s.shows.forEach(function (t) { if (['mean', 'median', 'mode', 'range'].indexOf(t) < 0) throw new Error('show: mean, median, mode, range, or none.'); });
    s.view = String(s.view || 'dots').trim().toLowerCase();
    if (['dots', 'stem', 'both'].indexOf(s.view) < 0) throw new Error('view: dots, stem or both.');
    if (s.view !== 'dots' && all.some(function (v) { return v !== Math.round(v) || v < 0; })) throw new Error('view: stem-and-leaf plots here need whole numbers from 0 up.');
    var nm = String(s.names || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    s.nameA = nm[0] || (s.two ? 'Set A' : ''); s.nameB = nm[1] || 'Set B';
    s.lab = s.label ? String(s.label).trim() : '';
  }

  function stats(v) {
    var n = v.length, sorted = v.slice().sort(function (a, b) { return a - b; });
    if (!n) return { n: 0, s: 0, m: 0, d: 0, o: 0, k: 0, r: 0, l: 0, h: 0, sorted: sorted, modes: [] };
    var sum = v.reduce(function (a, b) { return a + b; }, 0);
    var med = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    var count = {}; sorted.forEach(function (x) { count[x] = (count[x] || 0) + 1; });
    var top = Math.max.apply(null, Object.keys(count).map(function (x) { return count[x]; }));
    var modes = top > 1 ? Object.keys(count).filter(function (x) { return count[x] === top; }).map(Number).sort(function (a, b) { return a - b; }) : [];
    return { n: n, s: r2(sum), m: r2(sum / n), d: r2(med), o: modes.length ? modes[0] : 0, k: modes.length, r: r2(sorted[n - 1] - sorted[0]), l: sorted[0], h: sorted[n - 1], sorted: sorted, modes: modes };
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', green = B.css('--ok') || '#1a7f37', purple = B.css('--right') || '#7a4fb3';
    var el = B.el('board');
    if (spec.view === 'stem') { stemBoard(el); return; }
    var span = spec.hi - spec.lo, pad = span * 0.04;
    var A = stats(vals), Bs = spec.two ? stats(spec.two) : null;
    var maxStack = function (v) { var c = {}, m = 0; v.forEach(function (x) { c[x] = (c[x] || 0) + 1; m = Math.max(m, c[x]); }); return m; };
    var rows = Math.max(6, maxStack(vals) + 2), rowsB = spec.two ? Math.max(4, maxStack(spec.two) + 2) : 0;
    var unit = span / 26;   // one dot's height, in x units (keepAspectRatio keeps dots round)
    var top = (rows + rowsB + (spec.two ? 3 : 1.5)) * unit;
    var board = B.jsx({ boundingbox: [spec.lo - pad, top, spec.hi + pad, -3.2 * unit], keepAspectRatio: true });
    var u = 1 / board.unitY;
    var axisAt = function (y0, name, colour) {
      board.create('segment', [[spec.lo, y0], [spec.hi, y0]], { strokeColor: ink, strokeWidth: 2, fixed: true, highlight: false });
      var tick = span <= 20 ? 1 : span <= 50 ? 5 : 10; if (spec.stepv < 1 && span <= 5) tick = 0.5;
      for (var t = Math.ceil(spec.lo / tick) * tick; t <= spec.hi + 1e-9; t = r2(t + tick)) {
        board.create('segment', [[t, y0 - 5 * u], [t, y0 + 5 * u]], { strokeColor: ink, strokeWidth: 1.5, fixed: true, highlight: false });
        board.create('text', [t, y0 - 16 * u, show(t)], { anchorX: 'middle', anchorY: 'middle', cssClass: 'ticklabel', highlightCssClass: 'ticklabel', fixed: true, highlight: false });
      }
      if (name) board.create('text', [spec.lo, y0 + (spec.two ? rowsB - 0.4 : rows - 0.6) * unit, name], { anchorX: 'left', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: colour, fixed: true, highlight: false });
    };
    var dots = function (v, y0, colour, clickable) {
      var c = {};
      v.slice().sort(function (a, b) { return a - b; }).forEach(function (x) {
        c[x] = (c[x] || 0) + 1;
        var p = board.create('point', [x, y0 + (c[x] - 0.5) * unit], { name: '', size: Math.max(3, Math.min(9, unit * board.unitX / 2.4)), fillColor: colour, strokeColor: colour, fixed: true, showInfobox: false, highlight: false });
        if (clickable) p.on('down', function () { setTimeout(function () { var i = vals.indexOf(x); if (i >= 0) { vals.splice(i, 1); changed(); } }, 0); });
      });
    };
    var marks = function (S, y0, h) {
      if (!S.n) return;
      if (spec.shows.indexOf('mean') >= 0) { board.create('polygon', [[S.m, y0 - 1.2 * unit], [S.m - 0.45 * unit, y0 - 2.1 * unit], [S.m + 0.45 * unit, y0 - 2.1 * unit]], { fillColor: orange, fillOpacity: 1, borders: { strokeColor: orange }, vertices: { visible: false }, fixed: true, highlight: false }); }
      if (spec.shows.indexOf('median') >= 0) board.create('segment', [[S.d, y0], [S.d, y0 + h * unit]], { strokeColor: green, strokeWidth: 2.5, dash: 2, fixed: true, highlight: false });
      if (spec.shows.indexOf('range') >= 0 && S.n > 1) board.create('segment', [[S.l, y0 + (h - 0.4) * unit], [S.h, y0 + (h - 0.4) * unit]], { strokeColor: purple, strokeWidth: 2, firstArrow: { type: 2, size: 4 }, lastArrow: { type: 2, size: 4 }, fixed: true, highlight: false });
    };
    // the first set at the bottom; the second above it
    axisAt(0, spec.two ? spec.nameA : '', blue);
    dots(vals, 0, blue, spec.edit);
    marks(A, 0, rows - 1);
    if (spec.two) {
      var yB = (rows + 1.5) * unit;
      axisAt(yB, spec.nameB, orange);
      dots(spec.two, yB, orange, false);
      marks(Bs, yB, rowsB - 1);
    }
    if (spec.lab) board.create('text', [(spec.lo + spec.hi) / 2, -2.6 * unit, spec.lab], { anchorX: 'middle', anchorY: 'middle', cssClass: 'axisname', highlightCssClass: 'axisname', fixed: true, highlight: false });
    if (spec.edit) {
      board.on('down', function (e) {
        var uc; try { uc = board.getUsrCoordsOfMouse(e); } catch (er) { return; }
        if (uc[1] < 0.5 * unit && uc[1] > -1.2 * unit) {   // a click on the line (or just below it)
          var x = Math.round(uc[0] / spec.stepv) * spec.stepv; x = r2(x);
          if (x >= spec.lo && x <= spec.hi && !onDot(uc)) setTimeout(function () { vals.push(x); changed(); }, 0);
        }
      });
    }
    function onDot(uc) { var x = r2(Math.round(uc[0] / spec.stepv) * spec.stepv); return vals.indexOf(x) >= 0 && uc[1] > 0; }
    board.update();
  }

  // Stem-and-leaf view: the plot(s) drawn on the board itself, as an SVG grid of digits.
  function stemBoard(el) {
    if (B.jsxBoard) { try { JXG.JSXGraph.freeBoard(B.jsxBoard); } catch (e) { /* already gone */ } B.jsxBoard = null; }
    el.replaceChildren();
    var NS = 'http://www.w3.org/2000/svg', ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675';
    var sets = [[vals, spec.two ? spec.nameA : '', B.css('--left') || '#2f6fb3']].concat(spec.two ? [[spec.two, spec.nameB, B.css('--accent') || '#c2570a']] : []);
    var rowsOf = function (v) { var s2 = v.slice().sort(function (a, b) { return a - b; }); if (!s2.length) return []; var lo = Math.floor(s2[0] / 10), hi = Math.floor(s2[s2.length - 1] / 10), out = []; for (var st = lo; st <= hi; st++) out.push([st, s2.filter(function (x) { return Math.floor(x / 10) === st; }).map(function (x) { return x % 10; })]); return out; };
    var all = sets.map(function (st) { return rowsOf(st[0]); });
    var nRows = Math.max(1, Math.max.apply(null, all.map(function (r) { return r.length; })));
    var maxLeaves = Math.max(4, Math.max.apply(null, all.map(function (r) { return Math.max.apply(null, r.map(function (x) { return x[1].length; }).concat([0])); })));
    var lh = 34, cw = 22, colW = 70 + maxLeaves * cw, W = colW * sets.length + 40 * (sets.length - 1) + 40, H = (nRows + 2) * lh + 30;
    var svgEl = document.createElementNS(NS, 'svg'); svgEl.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svgEl.setAttribute('width', '100%'); svgEl.setAttribute('height', '100%'); svgEl.setAttribute('role', 'img');
    svgEl.setAttribute('aria-label', 'Stem-and-leaf plot: ' + sets.map(function (st, i) { return (st[1] ? st[1] + ': ' : '') + all[i].map(function (r) { return r[0] + ' | ' + r[1].join(' '); }).join('; '); }).join('. '));
    var txt = function (x, y, t, at) { var e = document.createElementNS(NS, 'text'); e.setAttribute('x', x); e.setAttribute('y', y); Object.keys(at || {}).forEach(function (k) { e.setAttribute(k, at[k]); }); e.textContent = t; svgEl.appendChild(e); return e; };
    sets.forEach(function (st, i) {
      var x0 = 20 + i * (colW + 40), rows = all[i];
      if (st[1]) txt(x0 + colW / 2, 22, st[1], { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: st[2] });
      txt(x0 + 30, 22 + lh * 0.9, 'Stem', { 'text-anchor': 'end', 'font-size': 12, fill: muted }); txt(x0 + 46, 22 + lh * 0.9, 'Leaf', { 'font-size': 12, fill: muted });
      var y0 = 22 + lh * 1.2;
      var ln = document.createElementNS(NS, 'line'); ln.setAttribute('x1', x0 + 38); ln.setAttribute('x2', x0 + 38); ln.setAttribute('y1', y0); ln.setAttribute('y2', y0 + Math.max(1, rows.length) * lh); ln.setAttribute('stroke', ink); ln.setAttribute('stroke-width', 2); svgEl.appendChild(ln);
      rows.forEach(function (r, k) {
        var y = y0 + (k + 0.7) * lh;
        txt(x0 + 30, y, String(r[0]), { 'text-anchor': 'end', 'font-size': 20, 'font-family': 'ui-monospace, Menlo, Consolas, monospace', fill: ink });
        r[1].forEach(function (l, j) { txt(x0 + 52 + j * cw, y, String(l), { 'font-size': 20, 'font-family': 'ui-monospace, Menlo, Consolas, monospace', fill: st[2] }); });
      });
      if (rows.length) { var ks = Math.max(rows[0][0], 1); txt(x0, y0 + rows.length * lh + 22, 'Key: ' + ks + ' | 4 means ' + (ks * 10 + 4), { 'font-size': 12, fill: muted }); }
    });
    el.appendChild(svgEl);
  }

  function stemPlot(v, name) {
    var wrap = document.createElement('div'); wrap.className = 'stemwrap';
    if (name) { var h = document.createElement('p'); h.className = 'stemname'; h.textContent = name; wrap.appendChild(h); }
    var t = document.createElement('table'); t.className = 'stem'; t.setAttribute('aria-label', 'Stem-and-leaf plot' + (name ? ' of ' + name : ''));
    var sorted = v.slice().sort(function (a, b) { return a - b; });
    if (!sorted.length) { wrap.appendChild(t); return wrap; }
    var lo = Math.floor(sorted[0] / 10), hi = Math.floor(sorted[sorted.length - 1] / 10);
    var head = t.insertRow(); var th1 = document.createElement('th'); th1.textContent = 'Stem'; var th2 = document.createElement('th'); th2.textContent = 'Leaf'; head.append(th1, th2);
    for (var st = lo; st <= hi; st++) {
      var row = t.insertRow(), a = row.insertCell(), b = row.insertCell();
      a.textContent = st; b.textContent = sorted.filter(function (x) { return Math.floor(x / 10) === st; }).map(function (x) { return x % 10; }).join(' ');
    }
    wrap.appendChild(t);
    var key = document.createElement('p'); key.className = 'stemkey'; var ks = Math.max(lo, 1); key.textContent = 'Key: ' + ks + ' | 4 means ' + (ks * 10 + 4);
    wrap.appendChild(key);
    return wrap;
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.stats = document.createElement('ul'); ui.stats.className = 'dstats'; ui.stats.setAttribute('aria-live', 'polite'); panel.appendChild(ui.stats);
    ui.stem = document.createElement('div'); ui.stem.className = 'stems'; panel.appendChild(ui.stem);
    if (spec.edit) {
      var row = document.createElement('div'); row.className = 'gbar dedit';
      var lab = document.createElement('label'); lab.htmlFor = 'dvals'; lab.textContent = 'Values';
      ui.box = document.createElement('input'); ui.box.type = 'text'; ui.box.id = 'dvals'; ui.box.autocomplete = 'off'; ui.box.spellcheck = false;
      var go = document.createElement('button'); go.type = 'button'; go.textContent = 'Use these values';
      var apply = function () {
        try { var v = nums(ui.box.value, 'Values'); v.forEach(function (x) { if (x < spec.lo || x > spec.hi) throw new Error(x + ' is outside ' + spec.lo + ' to ' + spec.hi + '.'); }); vals = v; ui.err.textContent = ''; changed(); }
        catch (e) { ui.err.textContent = e.message; }
      };
      go.addEventListener('click', apply); ui.box.addEventListener('keydown', function (e) { if (e.key === 'Enter') apply(); });
      row.append(lab, ui.box, go); panel.appendChild(row);
      ui.err = document.createElement('p'); ui.err.className = 'tcount'; ui.err.setAttribute('aria-live', 'polite'); panel.appendChild(ui.err);
      var hint = document.createElement('p'); hint.className = 'tcount'; hint.textContent = 'Click the line to add a value; click a dot to remove it.'; if (spec.view !== 'stem') panel.appendChild(hint);
    }
    var bar = document.createElement('div'); bar.className = 'gbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    if (spec.edit) { bar.appendChild(again); panel.appendChild(bar); }
  }

  function changed() { B.moved = true; build(); report(); }

  function line(S, name) {
    var parts = [];
    if (spec.shows.indexOf('mean') >= 0) parts.push('mean ' + (S.n ? show(S.m) : '–'));
    if (spec.shows.indexOf('median') >= 0) parts.push('median ' + (S.n ? show(S.d) : '–'));
    if (spec.shows.indexOf('mode') >= 0) parts.push('mode ' + (!S.n ? '–' : S.k === 0 ? 'none (every value once)' : S.modes.map(show).join(' and ')));
    if (spec.shows.indexOf('range') >= 0) parts.push('range ' + (S.n ? show(S.h) + ' − ' + show(S.l) + ' = ' + show(S.r) : '–'));
    return (name ? name + ': ' : '') + S.n + (S.n === 1 ? ' value' : ' values') + (parts.length ? '. ' + parts.join(', ') : '');
  }

  function report() {
    var A = stats(vals), Bs = spec.two ? stats(spec.two) : null;
    ui.work.textContent = A.n ? A.sorted.map(show).join(', ') : 'No values yet' + (spec.edit ? ': click the line or type some below.' : '.');
    ui.stats.replaceChildren();
    [[A, spec.two ? spec.nameA : ''], Bs ? [Bs, spec.nameB] : null].filter(Boolean).forEach(function (p) {
      var li = document.createElement('li'); li.textContent = line(p[0], p[1]); ui.stats.appendChild(li);
    });
    ui.stem.replaceChildren();
    if (spec.view === 'both') { ui.stem.appendChild(stemPlot(vals, spec.two ? spec.nameA : '')); if (spec.two) ui.stem.appendChild(stemPlot(spec.two, spec.nameB)); }
    if (ui.box && document.activeElement !== ui.box) ui.box.value = A.sorted.map(function (x) { return B.fmt(x); }).join(', ');
    var scope = { n: A.n, s: A.s, m: A.m, d: A.d, o: A.o, k: A.k, r: A.r, l: A.l, h: A.h };
    if (Bs) ['n', 's', 'm', 'd', 'o', 'k', 'r', 'l', 'h'].forEach(function (k) { scope[k.toUpperCase()] = Bs[k]; });
    B.say(line(A, spec.two ? spec.nameA : '') + (Bs ? '. ' + line(Bs, spec.nameB) : '') + '.');
    B.save({ vals: vals });
    B.post({ scope: { vars: scope, points: {} } }, ui.work.textContent + '. ' + [].map.call(ui.stats.children, function (l) { return l.textContent; }).join('. '));
  }

  B.widget('data', {
    sections: ['board', 'gpanel'],
    label: function (s) { return (s.view === 'stem' ? 'A stem-and-leaf plot' : 'A dot plot') + (s.label ? ' of ' + s.label : '') + (s.second !== undefined ? ', comparing two sets' : ''); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vals = sv && sv.vals && spec.edit ? sv.vals.slice() : spec.vals.slice();
      paintPanel();
      build();
      report();
    },
    redraw: function () { build(); report(); },
    resize: function () { build(); },
  });
})(WPB);
