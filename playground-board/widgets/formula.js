// Formula: a formula with a slider for each variable, the substitution worked out live, and (optionally) a
// rectangle drawn to scale.
//   widget: formula
//   formula: P = 2l + 2w      the subject (one letter), then an expression in the slider letters
//   slider l: 1, 10, 4        min, max, start, step (default step 1); one lower-case letter each
//   shape: rectangle          draw a rectangle from the first two sliders (length, width), labelled with their values
//   units: cm                 shown after lengths and the result's value (optional)
//   result: off               hide the result's value (students work it out); the substitution still shows
// state: { scope: { vars: { each slider, and the subject (P) } } }
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {};
  var show = function (n) { return B.fmt(n).replace(/^-/, '−'); };
  var SVGNS = 'http://www.w3.org/2000/svg';

  function parse(s) {
    var m = /^\s*([A-Za-z])\s*=\s*(.+)$/.exec(s.formula || '');
    if (!m) throw new Error('formula: write it as "P = …", one letter, then an expression, such as "formula: P = 2l + 2w".');
    s.subject = m[1]; s.rhs = m[2].trim(); s.f = WPM.compile(s.rhs);
    s.sliders = [];
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      var where = 'Line ' + it.line + ' (slider ' + (it.name || '') + ')';
      if (!/^[a-z]$/.test(it.name || '')) throw new Error(where + ': a slider needs a one-letter lower-case name.');
      var a = it.value.split(',').map(function (t) { return WPM.evaluate(t.trim(), {}); });
      if (a.length < 3 || !(a[0] < a[1]) || a[2] < a[0] || a[2] > a[1]) throw new Error(where + ': needs min, max, start with min < max and start between them.');
      s.sliders.push({ name: it.name, min: a[0], max: a[1], start: a[2], step: a[3] || 1 });
    });
    var names = s.sliders.map(function (x) { return x.name; });
    WPM.vars(s.rhs).forEach(function (v) { if (names.indexOf(v) < 0) throw new Error('formula: "' + v + '" needs a slider (such as "slider ' + v + ': 1, 10, 4").'); });
    if (names.indexOf(s.subject) >= 0) throw new Error('formula: the subject ' + s.subject + ' cannot also be a slider.');
    s.rect = /^rectangle$/i.test(s.shape || '');
    if (s.rect && s.sliders.length < 2) throw new Error('shape: rectangle needs two sliders (length, then width).');
    s.unit = s.units ? ' ' + s.units.trim() : '';
    s.showResult = !/^off$/i.test(s.result || '');
  }

  // 2l + 2w with l = 4, w = 3 -> 2 × 4 + 2 × 3 (letters next to numbers become "×"; a negative value in brackets)
  function substituted() {
    var t = spec.rhs.replace(/\s+/g, ' ').replace(/\*/g, '×');
    t = t.replace(/(\d|\))\s*(?=[a-z])/g, '$1 × ').replace(/([a-z])\s*(?=[a-z(])/g, '$1 × ');
    return t.replace(/[a-z]/g, function (n) { return n in vars ? (vars[n] < 0 ? '(' + show(vars[n]) + ')' : show(vars[n])) : n; }).replace(/-/g, '−').replace(/\//g, '÷');
  }

  function drawRect() {
    var a = spec.sliders[0], b = spec.sliders[1], L = vars[a.name], W = vars[b.name];
    var maxL = a.max, maxW = b.max, sc = Math.min(300 / Math.max(maxL, 1), 140 / Math.max(maxW, 1));
    var svg = ui.svg; svg.replaceChildren();
    var w = 340, h = 190, x0 = (w - L * sc) / 2, y0 = (h - W * sc) / 2;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var r = document.createElementNS(SVGNS, 'rect');
    [['x', x0], ['y', y0], ['width', Math.max(L * sc, 1)], ['height', Math.max(W * sc, 1)], ['fill', 'var(--card)'], ['stroke', 'var(--left)'], ['stroke-width', 3]].forEach(function (p) { r.setAttribute(p[0], p[1]); });
    svg.appendChild(r);
    var lab = function (x, y, text, anchor) { var t = document.createElementNS(SVGNS, 'text'); t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('text-anchor', anchor); t.setAttribute('class', 'flab'); t.textContent = text; svg.appendChild(t); };
    lab(x0 + L * sc / 2, y0 - 7, a.name + ' = ' + show(L) + spec.unit, 'middle');
    lab(x0 + L * sc + 8, y0 + W * sc / 2 + 5, b.name + ' = ' + show(W) + spec.unit, 'start');
    svg.setAttribute('aria-label', 'A rectangle ' + show(L) + ' by ' + show(W));
  }

  function report() {
    var v = Math.round(spec.f(vars) * 1e6) / 1e6;
    ui.sliders.forEach(function (s) { s.out.textContent = s.sl.name + ' = ' + show(vars[s.sl.name]); });
    ui.work.textContent = spec.subject + ' = ' + substituted() + (spec.showResult ? ' = ' + show(v) + spec.unit : '');
    if (spec.rect) drawRect();
    var sc = Object.assign({}, vars); sc[spec.subject] = v;
    B.save({ vars: vars });
    B.post({ scope: { vars: sc, points: {} } }, spec.sliders.map(function (s) { return s.name + ' = ' + vars[s.name]; }).join(', ') + (spec.showResult ? '; ' + spec.subject + ' = ' + v : ''));
  }

  B.widget('formula', {
    sections: ['gpanel'],
    label: function (s) { return 'The formula ' + s.formula; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      spec.sliders.forEach(function (sl) { vars[sl.name] = sv && sv.vars && sv.vars[sl.name] !== undefined ? sv.vars[sl.name] : sl.start; });
      var panel = B.el('gpanel'); panel.replaceChildren(); ui = { sliders: [] };
      var box = document.createElement('div'); box.className = 'rulebox';
      var f = document.createElement('p'); f.className = 'rulename'; f.textContent = spec.formula.replace(/\*/g, '×').replace(/-/g, '−'); box.appendChild(f);
      if (spec.rect) { ui.svg = document.createElementNS(SVGNS, 'svg'); ui.svg.setAttribute('class', 'fsvg'); ui.svg.setAttribute('role', 'img'); box.appendChild(ui.svg); }
      ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.setAttribute('aria-live', 'polite'); box.appendChild(ui.work);
      panel.appendChild(box);
      spec.sliders.forEach(function (sl) {
        var row = document.createElement('div'); row.className = 'srow';
        var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = sl.name; lab.htmlFor = 'sl-' + sl.name;
        var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + sl.name + ' smaller');
        var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + sl.name; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[sl.name];
        var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + sl.name + ' bigger');
        var out = document.createElement('output'); out.htmlFor = r.id;
        var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, sl.min + Math.round((v - sl.min) / sl.step) * sl.step)); vars[sl.name] = Math.round(v * 1e6) / 1e6; r.value = v; B.moved = true; report(); };
        r.addEventListener('input', function () { set(Number(r.value)); });
        minus.addEventListener('click', function () { set(vars[sl.name] - sl.step); });
        plus.addEventListener('click', function () { set(vars[sl.name] + sl.step); });
        row.append(lab, minus, r, plus, out); panel.appendChild(row);
        ui.sliders.push({ sl: sl, out: out });
      });
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
      B.say('');
      report();
    },
    redraw: function () { if (spec && spec.rect) drawRect(); },
  });
})(WPB);
