// Rule machine: put an input x into a rule, see the working (substitution) and collect ordered pairs in a table.
//   widget: rule
//   rule: y = 2x + 3          the rule (y = an expression in x)
//   x: -5, 10                 inputs allowed (whole numbers; default -10, 10)
//   start: 0                  the input box's starting value (default the smallest allowed above -1)
// state: { scope: { vars: { k: pairs collected, l: lowest input, h: highest input, x, y: the last pair } } }
// (names in conditions are single letters: lo would read as l × o)
(function (B) {
  'use strict';
  var spec = null, pairs = [], ui = {};
  var show = function (n) { return B.fmt(n).replace(/^-/, '−'); };

  function parse(s) {
    var m = /^\s*y\s*=\s*(.+)$/.exec(s.rule || '');
    if (!m) throw new Error('rule: write it as "y = …", such as "rule: y = 2x + 3".');
    WPM.vars(m[1]).forEach(function (v) { if (v !== 'x') throw new Error('rule: only x can change in the rule (found "' + v + '").'); });
    s.rhs = m[1].trim(); s.f = WPM.compile(s.rhs);
    var r = String(s.x || '-10, 10').split(',').map(function (t) { return Number(t.trim()); });
    if (r.length !== 2 || r.some(function (v) { return !isFinite(v) || v % 1; }) || r[0] >= r[1]) throw new Error('x: needs two whole numbers, smallest first, such as "x: -5, 10".');
    s.xr = r;
    s.x0 = s.start !== undefined ? Number(s.start) : Math.max(r[0], 0);
  }

  // 2x + 3 with x = 4 -> 2(4) + 3; a negative input goes in brackets everywhere: x − 1 with x = −2 -> (−2) − 1.
  function substituted(x) {
    var t = x < 0 ? '(' + show(x) + ')' : show(x);
    return spec.rhs.replace(/\s+/g, ' ').replace(/(\d|\))\s*x/g, function (m0, d) { return d + '(' + show(x) + ')'; }).replace(/x/g, t).replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−');
  }

  function render() {
    ui.tbl.replaceChildren();
    var sorted = pairs.slice().sort(function (p, q) { return p[0] - q[0]; });
    var row = function (head, cells, th) {
      var tr = document.createElement('tr'), h = document.createElement('th'); h.textContent = head; tr.appendChild(h);
      cells.forEach(function (c) { var d = document.createElement(th ? 'th' : 'td'); d.textContent = c; tr.appendChild(d); }); return tr;
    };
    ui.tbl.appendChild(row('x (input)', sorted.map(function (p) { return show(p[0]); }), true));
    ui.tbl.appendChild(row('y (output)', sorted.map(function (p) { return show(p[1]); })));
    ui.tbl.hidden = !pairs.length;
    ui.pairs.textContent = pairs.length ? 'Ordered pairs (x, y): ' + sorted.map(function (p) { return '(' + show(p[0]) + ', ' + show(p[1]) + ')'; }).join('  ') : 'No pairs yet: put an input in.';
  }

  function report(last) {
    render();
    var xs = pairs.map(function (p) { return p[0]; });
    var vars = { k: pairs.length, l: xs.length ? Math.min.apply(null, xs) : 0, h: xs.length ? Math.max.apply(null, xs) : 0 };
    if (last) { vars.x = last[0]; vars.y = last[1]; }
    B.save({ pairs: pairs });
    B.post({ scope: { vars: vars, points: {} } }, pairs.length + ' pairs: ' + pairs.map(function (p) { return '(' + p[0] + ', ' + p[1] + ')'; }).join(' '));
  }

  function put() {
    var x = Number(ui.inp.value);
    if (ui.inp.value.trim() === '' || !isFinite(x) || x % 1) return B.say('Type a whole number for x.');
    if (x < spec.xr[0] || x > spec.xr[1]) return B.say('Use an input from ' + show(spec.xr[0]) + ' to ' + show(spec.xr[1]) + '.');
    var y = Math.round(spec.f({ x: x }) * 1e9) / 1e9;
    ui.work.textContent = 'x = ' + show(x) + ':   y = ' + substituted(x) + ' = ' + show(y);
    B.moved = true;
    if (pairs.some(function (p) { return p[0] === x; })) { B.say('(' + show(x) + ', ' + show(y) + ') is already in the table. Try another input.'); return report([x, y]); }
    pairs.push([x, y]);
    B.say('Added (' + show(x) + ', ' + show(y) + '): input ' + show(x) + ', output ' + show(y) + '.');
    ui.inp.value = Math.min(spec.xr[1], x + 1);
    report([x, y]);
  }

  B.widget('rule', {
    sections: ['gpanel'],
    label: function (s) { return 'A rule machine for ' + s.rule; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      pairs = sv && sv.pairs ? sv.pairs : [];
      var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
      var box = document.createElement('div'); box.className = 'rulebox';
      var r = document.createElement('p'); r.className = 'rulename'; r.textContent = spec.rule.replace(/-/g, '−').replace(/\*/g, '×'); box.appendChild(r);
      var row = document.createElement('div'); row.className = 'oprow';
      var lab = document.createElement('label'); lab.htmlFor = 'rx'; lab.textContent = 'Input x =';
      ui.inp = document.createElement('input'); ui.inp.type = 'number'; ui.inp.id = 'rx'; ui.inp.step = 1; ui.inp.min = spec.xr[0]; ui.inp.max = spec.xr[1]; ui.inp.value = spec.x0;
      var go = document.createElement('button'); go.type = 'button'; go.textContent = 'Put it in';
      go.addEventListener('click', put); ui.inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') put(); });
      row.append(lab, ui.inp, go); box.appendChild(row);
      ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.setAttribute('aria-live', 'polite'); box.appendChild(ui.work);
      panel.appendChild(box);
      ui.tbl = document.createElement('table'); ui.tbl.id = 'gtable'; panel.appendChild(ui.tbl);
      ui.pairs = document.createElement('p'); ui.pairs.className = 'rulepairs'; panel.appendChild(ui.pairs);
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
      B.say('');
      report(null);
    },
  });
})(WPB);
