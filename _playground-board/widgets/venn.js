// Venn: one group of people (or things) sorted by two yes/no questions, shown as a Venn diagram and a two-way table side by
// side. Students choose regions (in the diagram, the table or with the buttons) to make an event and read its probability,
// or fill in the table from the diagram.
//   widget: venn
//   labels: Sport, Music     the two properties, A and B
//   counts: 12, 8, 5, 5      how many are A only, both, B only, neither
//   event: a and b           regions chosen at the start: a, b, a and b, a or b, not a, not b, a only, b only, neither,
//                            all (several joined with "+", such as "a only + b only")
//   choose: off              students cannot change the chosen regions (default on)
//   show: both | venn | table   what to draw (default both)
//   blank: table             the table's four inside cells are boxes for students to fill from the diagram (value k)
//   blank: venn              the diagram's four counts are boxes for students to fill from the table (value k)
// state: { scope: { vars: { x (1 if "A only" is chosen), y (both), z (B only), w (neither), n (how many are chosen),
//   t (the total), p (n ÷ t, 3 places), k (1 when every blank box is right) } } }
// Checks: "y = 1 and x = 0 and z = 0 and w = 0" (A and B), "x = 1 and y = 1 and z = 1 and w = 0" (A or B), "n = 25", "k = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, sel = [0, 0, 0, 0], typed = ['', '', '', ''], ui = {}, checked = [0, 0, 0, 0];
  var REG = ['x', 'y', 'z', 'w'];
  var r3 = function (v) { return Math.round(v * 1000) / 1000; };
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function frac(a, b) { if (!b || !a) return '0'; var g = gcd(a, b); return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); }
  function regionsFor(text) {
    var all = [0, 0, 0, 0];
    String(text).split('+').forEach(function (part) {
      var t = part.trim().toLowerCase().replace(/\s+/g, ' '), m = {
        'a': [1, 1, 0, 0], 'b': [0, 1, 1, 0], 'a and b': [0, 1, 0, 0], 'both': [0, 1, 0, 0], 'a or b': [1, 1, 1, 0], 'not a': [0, 0, 1, 1], 'not b': [1, 0, 0, 1],
        'a only': [1, 0, 0, 0], 'b only': [0, 0, 1, 0], 'neither': [0, 0, 0, 1], 'all': [1, 1, 1, 1], 'none': [0, 0, 0, 0],
      }[t];
      if (!m) throw new Error('event: "' + part.trim() + '" is not one of a, b, a and b, a or b, not a, not b, a only, b only, neither, all.');
      m.forEach(function (v, i) { if (v) all[i] = 1; });
    });
    return all;
  }
  function parse(s) {
    var lb = String(s.labels || 'A, B').split(',').map(function (x) { return x.trim(); });
    if (lb.length !== 2 || !lb[0] || !lb[1]) throw new Error('labels: two names, such as "Sport, Music".');
    s.L = lb;
    s.c = String(s.counts || '').split(',').map(function (x) { return Number(x.trim()); });
    if (s.c.length !== 4 || s.c.some(function (v) { return !(v >= 0) || Math.round(v) !== v; })) throw new Error('counts: four whole numbers: ' + lb[0] + ' only, both, ' + lb[1] + ' only, neither.');
    s.t = s.c[0] + s.c[1] + s.c[2] + s.c[3];
    if (!s.t) throw new Error('counts: at least one must be more than 0.');
    s.ev = s.event !== undefined ? regionsFor(s.event) : [0, 0, 0, 0];
    s.choose = !/^off$/i.test(s.choose || '');
    var sh = String(s.show || 'both').trim().toLowerCase();
    if (['both', 'venn', 'table'].indexOf(sh) < 0) throw new Error('show: both, venn or table.');
    s.sv = sh !== 'table'; s.st = sh !== 'venn';
    s.blank = s.blank ? String(s.blank).trim().toLowerCase() : '';
    if (s.blank && ['table', 'venn'].indexOf(s.blank) < 0) throw new Error('blank: table or venn.');
    if (s.blank === 'table' && !s.st || s.blank === 'venn' && !s.sv) throw new Error('blank: ' + s.blank + ' needs the ' + s.blank + ' shown.');
    if (s.blank && !(s.sv && s.st)) throw new Error('blank: needs show: both, so there is something to fill it from.');
  }
  function name(i) { return [spec.L[0] + ' only', spec.L[0] + ' and ' + spec.L[1], spec.L[1] + ' only', 'Neither'][i]; }
  function flip(i) { if (!spec.choose) return; sel[i] = sel[i] ? 0 : 1; B.moved = true; report(); }
  function add(parent, tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; parent.appendChild(e); return e; }
  function shown(i) { return spec.blank === 'venn' ? (typed[i] === '' ? '?' : typed[i]) : String(spec.c[i]); }

  function drawVenn(holder) {
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 460 300'); svg.setAttribute('role', 'img');
    svg.setAttribute('class', 'vnsvg');
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', on = B.css('--left') || '#2f6fb3', card = B.css('--card') || '#fff', font = 'system-ui, sans-serif';
    var cx1 = 175, cx2 = 285, cy = 160, r = 95;
    // the four regions, filled when chosen: neither (the box), A only, both, B only
    var defs = add(svg, 'defs', {});
    var cpA = add(defs, 'clipPath', { id: 'vnA' }); add(cpA, 'circle', { cx: cx1, cy: cy, r: r });
    var mk = add(defs, 'mask', { id: 'vnNotB' }); add(mk, 'rect', { x: 0, y: 0, width: 460, height: 300, fill: '#fff' }); add(mk, 'circle', { cx: cx2, cy: cy, r: r, fill: '#000' });
    var mk2 = add(defs, 'mask', { id: 'vnNotA' }); add(mk2, 'rect', { x: 0, y: 0, width: 460, height: 300, fill: '#fff' }); add(mk2, 'circle', { cx: cx1, cy: cy, r: r, fill: '#000' });
    var mk3 = add(defs, 'mask', { id: 'vnOut' }); add(mk3, 'rect', { x: 0, y: 0, width: 460, height: 300, fill: '#fff' }); add(mk3, 'circle', { cx: cx1, cy: cy, r: r, fill: '#000' }); add(mk3, 'circle', { cx: cx2, cy: cy, r: r, fill: '#000' });
    var fill = function (i) { return sel[i] ? on : card; }, op = function (i) { return sel[i] ? 0.55 : 1; };
    var shapes = [
      add(svg, 'circle', { cx: cx1, cy: cy, r: r, mask: 'url(#vnNotB)', fill: fill(0), 'fill-opacity': op(0) }),
      add(svg, 'circle', { cx: cx2, cy: cy, r: r, 'clip-path': 'url(#vnA)', fill: fill(1), 'fill-opacity': op(1) }),
      add(svg, 'circle', { cx: cx2, cy: cy, r: r, mask: 'url(#vnNotA)', fill: fill(2), 'fill-opacity': op(2) }),
      add(svg, 'rect', { x: 10, y: 34, width: 440, height: 256, rx: 8, mask: 'url(#vnOut)', fill: fill(3), 'fill-opacity': op(3) }),
    ];
    svg.insertBefore(shapes[3], shapes[0]);
    add(svg, 'rect', { x: 10, y: 34, width: 440, height: 256, rx: 8, fill: 'none', stroke: ink, 'stroke-width': 2 });
    add(svg, 'circle', { cx: cx1, cy: cy, r: r, fill: 'none', stroke: ink, 'stroke-width': 2.5 });
    add(svg, 'circle', { cx: cx2, cy: cy, r: r, fill: 'none', stroke: ink, 'stroke-width': 2.5 });
    add(svg, 'text', { x: 18, y: 24, 'font-size': 15, 'font-family': font, fill: muted }, 'All ' + spec.t);
    add(svg, 'text', { x: cx1 - 60, y: cy - r - 6, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, 'font-family': font, fill: ink }, spec.L[0]);
    add(svg, 'text', { x: cx2 + 60, y: cy - r - 6, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, 'font-family': font, fill: ink }, spec.L[1]);
    [[cx1 - 48, cy], [(cx1 + cx2) / 2, cy], [cx2 + 48, cy], [410, 270]].forEach(function (pt, i) {
      add(svg, 'text', { x: pt[0], y: pt[1] + 8, 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 700, 'font-family': font, fill: ink, stroke: card, 'stroke-width': 4, 'paint-order': 'stroke' }, shown(i));
    });
    if (spec.choose) shapes.forEach(function (sh, i) { sh.style.cursor = 'pointer'; sh.addEventListener('click', function () { flip(i); }); });
    svg.setAttribute('aria-label', 'Venn diagram of ' + spec.L[0] + ' and ' + spec.L[1] + ': ' + [0, 1, 2, 3].map(function (i) { return name(i) + ' ' + shown(i); }).join(', ') + '.');
    holder.appendChild(svg);
  }
  function drawTable(holder) {
    var tb = document.createElement('table'); tb.className = 'vntable';
    var cell = function (i) { // A only = (A, not B), both = (A, B), B only = (not A, B), neither = (not A, not B)
      var td = document.createElement('td'); td.className = 'vncell' + (sel[i] ? ' on' : '');
      if (spec.blank === 'table') {
        var inp = document.createElement('input'); inp.type = 'text'; inp.inputMode = 'numeric'; inp.size = 3; inp.value = typed[i];
        inp.setAttribute('aria-label', name(i)); inp.addEventListener('input', function () { typed[i] = inp.value.trim(); checked[i] = 0; B.moved = true; report(true); }); inp.addEventListener('change', function () { checked[i] = 1; report(true); });
        td.appendChild(inp);
      } else {
        td.textContent = String(spec.c[i]);
        if (spec.choose) { td.tabIndex = 0; td.style.cursor = 'pointer'; td.addEventListener('click', function () { flip(i); }); td.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(i); } }); }
      }
      return td;
    };
    var th = function (t) { var e = document.createElement('th'); e.textContent = t; return e; };
    var tot = function (v) { var e = document.createElement('td'); e.className = 'vntot'; e.textContent = v; return e; };
    var c = spec.c, A = spec.L[0], Bn = spec.L[1];
    var r0 = document.createElement('tr'); r0.append(th(''), th(Bn), th('Not ' + Bn.toLowerCase()), th('Total'));
    var r1 = document.createElement('tr'); r1.append(th(A), cell(1), cell(0), tot(c[0] + c[1]));
    var r2 = document.createElement('tr'); r2.append(th('Not ' + A.toLowerCase()), cell(2), cell(3), tot(c[2] + c[3]));
    var r3r = document.createElement('tr'); r3r.append(th('Total'), tot(c[1] + c[2]), tot(c[0] + c[3]), tot(spec.t));
    tb.append(r0, r1, r2, r3r);
    holder.appendChild(tb);
  }
  function draw() {
    var el = B.el('board'); el.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'vnwrap';
    if (spec.sv) drawVenn(wrap);
    if (spec.st) drawTable(wrap);
    if (spec.blank === 'venn') {
      var box = document.createElement('div'); box.className = 'vnfill';
      [0, 1, 2, 3].forEach(function (i) {
        var lab = document.createElement('label'); lab.textContent = name(i) + ' ';
        var inp = document.createElement('input'); inp.type = 'text'; inp.inputMode = 'numeric'; inp.size = 3; inp.value = typed[i];
        inp.setAttribute('aria-label', name(i)); inp.addEventListener('input', function () { typed[i] = inp.value.trim(); checked[i] = 0; B.moved = true; report(true); }); inp.addEventListener('change', function () { checked[i] = 1; report(true); });
        lab.appendChild(inp); box.appendChild(lab);
      });
      wrap.appendChild(box);
    }
    el.appendChild(wrap);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    var bar = document.createElement('div'); bar.className = 'gbar'; ui.regs = [];
    if (spec.choose) [0, 1, 2, 3].forEach(function (i) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = name(i); b.addEventListener('click', function () { flip(i); }); bar.appendChild(b); ui.regs.push(b);
    });
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart); bar.appendChild(again);
    panel.appendChild(bar);
  }
  function report(keepBoard) {
    if (!keepBoard) draw();   // while typing, keep the board (and the box being typed in) as it is
    else if (spec.blank === 'venn') { var old = B.el('board').querySelector('svg.vnsvg'); if (old) { var tmp = document.createElement('div'); drawVenn(tmp); old.replaceWith(tmp.firstChild); } }
    ui.regs.forEach(function (b, i) { b.setAttribute('aria-pressed', String(!!sel[i])); });
    var n = 0; sel.forEach(function (v, i) { if (v) n += spec.c[i]; });
    var right = spec.blank ? typed.every(function (v, i) { return v !== '' && Number(v) === spec.c[i]; }) : false;
    var chosen = [0, 1, 2, 3].filter(function (i) { return sel[i]; });
    if (spec.blank && !chosen.length) {
      var filled = typed.filter(function (v) { return v !== ''; }).length;
      ui.work.textContent = right ? 'Every box is right: the ' + (spec.blank === 'table' ? 'table' : 'diagram') + ' matches the ' + (spec.blank === 'table' ? 'diagram' : 'table') + '.' : filled + ' of 4 boxes filled. Each number goes in one place: ' + spec.L[0] + ' only, both, ' + spec.L[1] + ' only, neither.';
    } else ui.work.textContent = chosen.length ? 'Chosen: ' + chosen.map(name).join(' + ') + ' = ' + n + ' of ' + spec.t + '. Probability ' + n + '/' + spec.t + (frac(n, spec.t) !== n + '/' + spec.t ? ' = ' + frac(n, spec.t) : '') + ' ≈ ' + B.fmt(r3(n / spec.t)) : 'Choose the parts of the diagram (or table) that make your event.';
    var wrong = spec.blank ? typed.map(function (v, i) { return checked[i] && v !== '' && Number(v) !== spec.c[i] ? name(i) : null; }).filter(Boolean) : [];   // only once a box is left
    ui.note.textContent = wrong.length ? 'Check: ' + wrong.join(', ') + '.' : chosen.length > 1 ? 'Each person is counted once: the parts do not overlap.' : '';
    var vars = { x: sel[0], y: sel[1], z: sel[2], w: sel[3], n: n, t: spec.t, p: r3(n / spec.t), k: right ? 1 : 0 };
    B.say(ui.work.textContent);
    B.save({ sel: sel, typed: typed });
    B.post({ scope: { vars: vars, points: {} } }, ui.work.textContent);
  }
  B.widget('venn', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A Venn diagram and a two-way table'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec; var sv = fresh ? null : B.saved();
      sel = sv && sv.sel ? sv.sel.slice() : spec.ev.slice(); typed = sv && sv.typed ? sv.typed.slice() : ['', '', '', '']; checked = typed.map(function (v) { return v !== '' ? 1 : 0; });
      paintPanel(); report();
    },
  });
})(WPB);
