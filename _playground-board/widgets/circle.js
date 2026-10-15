// Circle: a circle of radius r with its parts named (centre, radius, diameter, chord, circumference), and a "Roll it
// out" button that rolls the circle one turn along a line, so the circumference lies flat beside its diameter: just over
// 3 diameters, every time. Each size rolled goes in a table of d, C and C ÷ d (π).
//   widget: circle
//   slider r: 1, 4, 2        the radius (min, max, start, step; a step of 0.5 is fine), or fixed "r: 2"
//   show: parts              name the parts (default); "show: none" names only the radius and diameter lengths
//   roll: on                 the Roll it out button and the table; "roll: shown" starts rolled (pictures)
//   units: cm
// state: { scope: { vars: { r, d (2r), c (the circumference, 2 dp), q (c ÷ d, 2 dp), o (1 once this size is rolled),
//   n (how many different sizes are in the table) } } }
// Checks: "d = 10", "o = 1", "n >= 3", "c > 24.5 and c < 25.5".
(function (B) {
  'use strict';
  var spec = null, vars = {}, ui = {}, t = 0, rolled = false, rows = [], anim = null;
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  function nums(t2, where) { return String(t2).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    s.sl = null;
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 'r') throw new Error('Line ' + it.line + ': the circle has one slider, r (the radius).');
      var v = nums(it.value, 'slider r');
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1] || v[0] <= 0) throw new Error('slider r: min, max, start (more than 0, start between them), and an optional step.');
      s.sl = { min: v[0], max: v[1], start: v[2], step: v[3] || 1 };
    });
    if (!s.sl && s.r === undefined) throw new Error('r: give the radius a slider ("slider r: 1, 4, 2") or a value ("r: 2").');
    s.fixedR = s.r !== undefined ? nums(s.r, 'r')[0] : null;
    if (s.fixedR !== null && s.fixedR <= 0) throw new Error('r: more than 0.');
    s.parts = !/^none$/i.test(s.show || '');
    s.rollOn = /^(on|shown)$/i.test(s.roll || ''); s.rollShown = /^shown$/i.test(s.roll || '');
    s.u = s.units ? String(s.units).trim() : '';
    s.R = s.sl ? s.sl.max : s.fixedR;
  }
  var L = function (v) { return B.fmt(r2(v)) + (spec.u ? ' ' + spec.u : ''); };

  function build() {
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', purple = B.css('--right') || '#8a4fb8';
    var R = spec.R, r = vars.r, C = 2 * Math.PI * r, d = 2 * r;
    var right = spec.rollOn ? 2 * Math.PI * R + R + 0.6 : R + 0.8;
    var board = B.jsx({ boundingbox: [-R - (spec.parts ? 2.2 : 0.8), 2 * R + 0.9, right, spec.rollOn ? -1.7 : -0.4], keepAspectRatio: true });
    var fx = { fixed: true, highlight: false };
    var cx = function () { return t * C; }, cy = r;
    var txt = function (x, y, s, col, ax, size) { return board.create('text', [x, y, s], Object.assign({ anchorX: ax || 'middle', anchorY: 'middle', cssClass: 'tside', highlightCssClass: 'tside', strokeColor: col, fontSize: size || 14 }, fx)); };
    if (spec.rollOn) {
      board.create('segment', [[-R - 0.5, 0], [right, 0]], Object.assign({ strokeColor: muted, strokeWidth: 1.5 }, fx));
      // the circumference laid flat so far
      board.create('segment', [[0, 0], [function () { return t * C; }, 0]], Object.assign({ strokeColor: orange, strokeWidth: 5 }, fx));
    }
    board.create('circle', [[cx, function () { return cy; }], r], Object.assign({ strokeColor: orange, strokeWidth: 3, fillColor: blue, fillOpacity: 0.08 }, fx));
    var O = [cx, function () { return cy; }];
    board.create('point', O, Object.assign({ name: '', size: 2.5, fillColor: ink, strokeColor: ink }, fx));
    var at = function (ang) { return [function () { return cx() + r * Math.cos(ang - t * 2 * Math.PI); }, function () { return cy + r * Math.sin(ang - t * 2 * Math.PI); }]; };
    var still = t === 0 && !rolled;
    // radius (up), diameter (across), chord (below): drawn in the circle's starting position only, to keep rolling clear
    if (still) {
      board.create('segment', [[0, r], [0, 2 * r]], Object.assign({ strokeColor: blue, strokeWidth: 2.5 }, fx));
      board.create('segment', [[-r, r], [r, r]], Object.assign({ strokeColor: purple, strokeWidth: 2.5 }, fx));
      txt(0.12, 1.55 * r, (spec.parts ? 'radius ' : 'r = ') + L(r), blue, 'left');
      txt(-r / 2, r + 0.28, (spec.parts ? 'diameter ' : 'd = ') + L(d), purple);
      if (spec.parts) {
        var a1 = Math.PI * 1.15, a2 = Math.PI * 1.75;
        board.create('segment', [[r * Math.cos(a1), r + r * Math.sin(a1)], [r * Math.cos(a2), r + r * Math.sin(a2)]], Object.assign({ strokeColor: muted, strokeWidth: 2 }, fx));
        txt(r * (Math.cos(a1) + Math.cos(a2)) / 2, r + r * (Math.sin(a1) + Math.sin(a2)) / 2 + 0.25, 'chord', muted);
        txt(0.18, r - 0.22, 'centre', ink, 'left', 12);
        txt(-r * 0.75 - 0.1, r + r * 0.78, 'circumference', orange, 'right');
      }
    } else {
      // a marked spoke shows the turning
      board.create('segment', [O, at(-Math.PI / 2)], Object.assign({ strokeColor: blue, strokeWidth: 2 }, fx));
    }
    if (spec.rollOn) board.create('point', at(-Math.PI / 2), Object.assign({ name: '', size: 4, fillColor: orange, strokeColor: '#fff', strokeWidth: 1.5 }, fx));
    if (spec.rollOn && rolled) {
      // diameters along the flat circumference: three whole ones and a bit
      for (var k = 0; k < 3; k++) {
        board.create('segment', [[k * d, -0.45], [(k + 1) * d, -0.45]], Object.assign({ strokeColor: k % 2 ? purple : blue, strokeWidth: 5 }, fx));
        txt((k + 0.5) * d, -0.95, 'd', k % 2 ? purple : blue);
      }
      board.create('segment', [[3 * d, -0.45], [C, -0.45]], Object.assign({ strokeColor: muted, strokeWidth: 5 }, fx));
      txt(C + 0.15, -0.45, '0.14d', muted, 'left', 12);
      txt(C / 2, 0.45 + (C / 2 < r + 0.5 ? 2 * r : 0), 'C = ' + L(C), orange);
    }
    board.update();
    return board;
  }

  function roll() {
    if (anim || rolled) return;
    var start = null, dur = 2400;
    var board = build();
    var step = function (now) {
      if (start === null) start = now;
      t = Math.min(1, (now - start) / dur); board.update();
      if (t < 1) { anim = requestAnimationFrame(step); return; }
      anim = null; rolled = true; t = 1; B.moved = true;
      var d = 2 * vars.r;
      if (!rows.some(function (x) { return Math.abs(x.d - d) < 1e-9; })) rows.push({ d: d, c: r2(Math.PI * d) });
      rows.sort(function (a, b) { return a.d - b.d; });
      build(); report();
    };
    t = 0.0001; board = build(); anim = requestAnimationFrame(step);
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = {};
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl) {
      var sl = spec.sl, row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = 'r'; lab.htmlFor = 'sl-r';
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make the radius smaller');
      var rng = document.createElement('input'); rng.type = 'range'; rng.id = 'sl-r'; rng.min = sl.min; rng.max = sl.max; rng.step = sl.step; rng.value = vars.r;
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make the radius bigger');
      ui.out = document.createElement('output'); ui.out.htmlFor = rng.id;
      var set = function (v) { if (anim) return; v = Math.max(sl.min, Math.min(sl.max, r2(sl.min + Math.round((v - sl.min) / sl.step) * sl.step))); vars.r = v; rng.value = v; t = 0; rolled = false; B.moved = true; build(); report(); };
      rng.addEventListener('input', function () { set(Number(rng.value)); });
      minus.addEventListener('click', function () { set(vars.r - sl.step); });
      plus.addEventListener('click', function () { set(vars.r + sl.step); });
      row.append(lab, minus, rng, plus, ui.out); panel.appendChild(row);
    }
    var bar = document.createElement('div'); bar.className = 'gbar';
    if (spec.rollOn) {
      ui.roll = document.createElement('button'); ui.roll.type = 'button'; ui.roll.textContent = 'Roll it out';
      ui.roll.addEventListener('click', roll); bar.appendChild(ui.roll);
    }
    if (spec.sl || spec.rollOn) {
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
    if (spec.rollOn) { ui.table = document.createElement('table'); ui.table.className = 'ctally'; panel.appendChild(ui.table); }
  }

  function report() {
    var r = vars.r, d = 2 * r, c = r2(2 * Math.PI * r), q = r2(c / d);
    if (ui.out) ui.out.textContent = 'r = ' + B.fmt(r);
    if (ui.roll) ui.roll.disabled = rolled;
    ui.work.textContent = spec.rollOn && !rolled ? 'radius ' + L(r) + ', diameter ' + L(d) + ', circumference ?' : 'radius ' + L(r) + ', diameter ' + L(d) + ', circumference ' + L(c);
    ui.note.textContent = spec.rollOn ? (rolled ? 'Rolled out flat, the circumference is just over 3 diameters: C ÷ d = ' + B.fmt(c) + ' ÷ ' + B.fmt(d) + ' ≈ ' + B.fmt(q) + '.' : 'The diameter is 2 radii: ' + B.fmt(d) + ' = 2 × ' + B.fmt(r) + '. Roll the circle out to see its circumference.') : 'The diameter is 2 radii: ' + B.fmt(d) + ' = 2 × ' + B.fmt(r) + '.';
    if (ui.table) {
      ui.table.replaceChildren();
      if (rows.length) {
        var h = document.createElement('tr'); ['diameter d', 'circumference C', 'C ÷ d'].forEach(function (x) { var th = document.createElement('th'); th.textContent = x; h.appendChild(th); }); ui.table.appendChild(h);
        rows.forEach(function (x) { var tr = document.createElement('tr'); [B.fmt(x.d), B.fmt(x.c), (x.c / x.d).toFixed(2)].forEach(function (v) { var td = document.createElement('td'); td.textContent = v; tr.appendChild(td); }); ui.table.appendChild(tr); });
      }
    }
    B.say(ui.work.textContent + '. ' + ui.note.textContent);
    B.save({ r: r, rows: rows, rolled: rolled });
    B.post({ scope: { vars: { r: r, d: d, c: c, q: q, o: rolled ? 1 : 0, n: rows.length }, points: {} } }, ui.work.textContent + '. ' + ui.note.textContent);
  }

  B.widget('circle', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A circle with its radius, diameter and circumference'; },
    parse: parse,
    resize: function () { if (spec && !anim) build(); },
    redraw: function () { if (spec && !anim) build(); },
    start: function (fresh) {
      spec = B.spec; if (anim) { cancelAnimationFrame(anim); anim = null; }
      var sv = fresh ? null : B.saved();
      vars = { r: spec.sl ? (sv && sv.r !== undefined ? sv.r : spec.sl.start) : spec.fixedR };
      rows = sv && sv.rows ? sv.rows : [];
      rolled = sv ? !!sv.rolled : spec.rollShown; t = rolled ? 1 : 0;
      if (rolled && !rows.some(function (x) { return Math.abs(x.d - 2 * vars.r) < 1e-9; })) rows.push({ d: 2 * vars.r, c: r2(2 * Math.PI * vars.r) });
      paintPanel(); build(); report();
    },
  });
})(WPB);
