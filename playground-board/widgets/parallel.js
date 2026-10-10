// Parallel lines: two lines crossed by a transversal, with the eight angles named a to h. Students turn the crossing
// line, pick two angles (click them or use the buttons) and the board says which pair they are.
//   widget: parallel
//   slider t: 30, 150, 60    the crossing line's angle to the parallel lines (min, max, start, step 5 unless given);
//                            or fixed: "t: 60"
//   slider w: -20, 20, 0     optional: tilt the lower line by w degrees, so the lines are not parallel (default 0)
//   angles: shown            shown (default) | hidden (letters only) | given f (only f's size; the others to work out)
//   names: off               do not name the pair (students decide whether it is corresponding, alternate, ...)
//   pair: c, f               start with these two angles picked (for pictures and worked examples)
// The angles: at the upper crossing a (above, left), b (above, right), c (below, left), d (below, right);
// at the lower crossing e, f, g, h in the same places.
// state: { scope: { vars: { t, w, a..h (sizes in degrees), m (angles picked), r (the picked pair: 1 corresponding,
//   2 alternate, 3 co-interior, 4 vertically opposite, 5 on a straight line, 6 alternate outside the lines, 0 other),
//   s (sum of the picked sizes), p (1 when the lines are parallel) } } }
// Checks: "r = 2" (picked two alternate angles), "t = 70", "f = 110".
(function (B) {
  'use strict';
  var spec = null, vars = {}, sel = [], ui = {};
  var L = 'abcdefgh'.split(''), H = 4, D = Math.PI / 180;
  var KIND = { 1: 'corresponding', 2: 'alternate', 3: 'co-interior', 4: 'vertically opposite', 5: 'on a straight line', 6: 'alternate (outside the lines)' };
  var RULE = { 1: 'Corresponding angles are equal.', 2: 'Alternate angles are equal.', 3: 'Co-interior angles add to 180°.', 4: 'Vertically opposite angles are equal.', 5: 'Angles on a straight line add to 180°.', 6: 'These are equal too, but Year 7 names only the three pairs between the lines.' };

  function nums(v, where) { return String(v).split(',').map(function (t) { var n = Number(t.trim()); if (!isFinite(n)) throw new Error(where + ': "' + t.trim() + '" is not a number.'); return n; }); }
  function parse(s) {
    s.sl = {}; s.fixed = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      var where = 'Line ' + it.line + ' (slider ' + (it.name || '') + ')';
      if (it.name !== 't' && it.name !== 'w') throw new Error(where + ': the parallel lines board has sliders t and w only.');
      var v = nums(it.value, where);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error(where + ': needs min, max, start with min < max and start between them.');
      s.sl[it.name] = { name: it.name, min: v[0], max: v[1], start: v[2], step: v[3] || 5 };
    });
    ['t', 'w'].forEach(function (n) {
      if (s[n] !== undefined) { if (s.sl[n]) throw new Error(n + ': give it a slider or a fixed value, not both.'); s.fixed[n] = nums(s[n], n)[0]; }
      else if (!s.sl[n]) { if (n === 'w') s.fixed.w = 0; else throw new Error('t: needs a slider ("slider t: 30, 150, 60") or a value ("t: 60").'); }
    });
    var lo = function (n) { return s.sl[n] ? s.sl[n].min : s.fixed[n]; }, hi = function (n) { return s.sl[n] ? s.sl[n].max : s.fixed[n]; };
    if (lo('t') < 15 || hi('t') > 165) throw new Error('t: keep the crossing line between 15 and 165 degrees.');
    if (Math.abs(lo('w')) > 30 || Math.abs(hi('w')) > 30) throw new Error('w: tilt the lower line by at most 30 degrees either way.');
    var st = function (n) { return s.sl[n] ? s.sl[n].start : s.fixed[n]; };   // while moving, a step that comes within 15° is refused
    if (st('t') - st('w') < 15 || st('t') - st('w') > 165) throw new Error('t and w: the crossing line must start at least 15 degrees from the lower line.');
    var a = String(s.angles || 'shown').trim(), g = /^given\s+([a-h])$/i.exec(a);
    if (!/^(shown|hidden)$/i.test(a) && !g) throw new Error('angles: shown, hidden, or "given f" (one of a to h).');
    s.show = g ? 'given' : a.toLowerCase(); s.given = g ? g[1].toLowerCase() : null;
    s.names = !/^off$/i.test(s.names || '');
    var rawPair = s.pair; s.pair = [];
    if (rawPair !== undefined && String(rawPair).trim() !== '') {
      s.pair = String(rawPair).split(',').map(function (t) { return t.trim().toLowerCase(); });
      if (s.pair.length !== 2 || s.pair.some(function (x) { return L.indexOf(x) < 0; }) || s.pair[0] === s.pair[1]) throw new Error('pair: two different angles from a to h, such as "pair: c, f".');
    }
  }

  function sizes() {
    var t = vars.t, u = vars.t - vars.w;
    return { a: 180 - t, b: t, c: t, d: 180 - t, e: 180 - u, f: u, g: u, h: 180 - u };
  }
  // The pair's kind from where the two angles are: vertex 0 (upper) or 1 (lower); place 0 above left, 1 above right,
  // 2 below left, 3 below right.
  function kind(x, y) {
    var i = L.indexOf(x), j = L.indexOf(y); if (i > j) { var k = i; i = j; j = k; }
    var vi = i >> 2, vj = j >> 2, pi = i & 3, pj = j & 3;
    if (vi === vj) return pi + pj === 3 ? 4 : 5;
    if (pi === pj) return 1;
    if ((pi === 2 && pj === 1) || (pi === 3 && pj === 0)) return 2;
    if ((pi === 2 && pj === 0) || (pi === 3 && pj === 1)) return 3;
    if ((pi === 0 && pj === 3) || (pi === 1 && pj === 2)) return 6;
    return 0;
  }
  var visible = function (n) { return spec.show === 'shown' || (spec.show === 'given' && n === spec.given); };
  var deg = function (v) { return Math.round(v) + '°'; };

  function pick(n) {
    var i = sel.indexOf(n);
    if (i >= 0) sel.splice(i, 1); else { sel.push(n); if (sel.length > 2) sel.shift(); }
    B.moved = true; build(); report();
  }

  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', acc = B.css('--accent') || '#c2570a', blue = B.css('--left') || '#2f6fb3';
    var board = B.jsx({ boundingbox: [-8, H + 2.6, 8, -2.6], keepAspectRatio: true });
    var t = vars.t * D, w = vars.w * D, M = [0, H / 2], s = (H / 2) / Math.sin(t);
    var P = [M[0] + s * Math.cos(t), H], Q = [M[0] - s * Math.cos(t), 0];
    var line = function (p, ang, len, colour, width) {
      return board.create('segment', [[p[0] - len * Math.cos(ang), p[1] - len * Math.sin(ang)], [p[0] + len * Math.cos(ang), p[1] + len * Math.sin(ang)]],
        { strokeColor: colour, strokeWidth: width, fixed: true, highlight: false, point1: { visible: false }, point2: { visible: false } });
    };
    line([0, H], 0, 40, ink, 2.5);   // long enough to reach the edges of any board shape
    line(Q, w, 40, ink, 2.5);
    line(M, t, s + 1.8, blue, 2.5);
    if (vars.w === 0) [H, 0].forEach(function (y) {   // arrow marks: these two lines are parallel
      [[-6.3, 0], [-6.0, 0]].forEach(function (c) {
        var x = c[0], st = { strokeColor: ink, strokeWidth: 2, fixed: true, highlight: false };
        board.create('segment', [[x - 0.22, y + 0.2], [x, y]], st); board.create('segment', [[x - 0.22, y - 0.2], [x, y]], st);
      });
    });
    var sz = sizes(), R = 0.9;
    // Each angle runs anticlockwise from one direction to the next, in degrees.
    var span = {
      a: [P, vars.t, 180], b: [P, 0, vars.t], c: [P, 180, 180 + vars.t], d: [P, 180 + vars.t, 360],
      e: [Q, vars.t, 180 + vars.w], f: [Q, vars.w, vars.t], g: [Q, 180 + vars.w, 180 + vars.t], h: [Q, 180 + vars.t, 360 + vars.w],
    };
    ui.sectors = {};
    L.forEach(function (n) {
      var v = span[n][0], a0 = span[n][1] * D, a1 = span[n][2] * D, on = sel.indexOf(n) >= 0;
      var pts = [v.slice()];
      for (var k = 0; k <= 16; k++) { var a = a0 + (a1 - a0) * k / 16; pts.push([v[0] + R * Math.cos(a), v[1] + R * Math.sin(a)]); }
      var poly = board.create('polygon', pts, {
        fillColor: on ? acc : muted, fillOpacity: on ? 0.45 : 0.1, hasInnerPoints: true,
        borders: { visible: false }, vertices: { visible: false }, fixed: true, highlight: false,
      });
      ui.sectors[n] = poly;
      var am = (a0 + a1) / 2, rr = R + 0.62;
      board.create('text', [v[0] + rr * Math.cos(am), v[1] + rr * Math.sin(am), visible(n) ? n + ' ' + deg(sz[n]) : n], {
        anchorX: 'middle', anchorY: 'middle', fontSize: 15, cssClass: 'tside', highlightCssClass: 'tside',
        strokeColor: on ? acc : ink, fixed: true, highlight: false,
      });
    });
    // A click near a crossing picks the angle it falls in (by direction, so clicks near the corner are not ambiguous).
    board.on('down', function (e) {
      var u; try { u = board.getUsrCoordsOfMouse(e); } catch (er) { return; }
      var best = null;
      L.forEach(function (n) {
        var v = span[n][0], dx = u[0] - v[0], dy = u[1] - v[1], r = Math.hypot(dx, dy);
        if (r > 2.2 || r < 0.05) return;
        var a = Math.atan2(dy, dx) / D, a0 = span[n][1], a1 = span[n][2];
        while (a < a0) a += 360; while (a >= a0 + 360) a -= 360;
        if (a <= a1 && (!best || r < best.r)) best = { n: n, r: r };
      });
      if (best) setTimeout(function () { pick(best.n); }, 0);   // after JSXGraph finishes the event: pick rebuilds the board
    });
    board.update();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { sliders: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    ['t', 'w'].forEach(function (n) {
      var sl = spec.sl[n]; if (!sl) return;
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = n; lab.htmlFor = 'sl-' + n;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + n + ' smaller');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'sl-' + n; r.min = sl.min; r.max = sl.max; r.step = sl.step; r.value = vars[n];
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + n + ' bigger');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var set = function (v) {
        v = Math.max(sl.min, Math.min(sl.max, sl.min + Math.round((v - sl.min) / sl.step) * sl.step));
        var other = n === 't' ? vars.w : vars.t, tt = n === 't' ? v : other, ww = n === 'w' ? v : other;
        if (tt - ww < 15 || tt - ww > 165) { r.value = vars[n]; return; }   // keep the crossing line off the lower line
        vars[n] = v; r.value = v; B.moved = true; build(); report();
      };
      r.addEventListener('input', function () { set(Number(r.value)); });
      minus.addEventListener('click', function () { set(vars[n] - sl.step); });
      plus.addEventListener('click', function () { set(vars[n] + sl.step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row);
      ui.sliders.push({ n: n, out: out });
    });
    var row = document.createElement('div'); row.className = 'gbar pangles'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Pick two angles');
    var lab = document.createElement('span'); lab.textContent = 'Pick'; row.appendChild(lab);
    ui.btns = {};
    L.forEach(function (n) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = n; b.addEventListener('click', function () { pick(n); });
      row.appendChild(b); ui.btns[n] = b;
    });
    panel.appendChild(row);
    var bar = document.createElement('div'); bar.className = 'gbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    var sz = sizes(), par = vars.w === 0;
    ui.sliders.forEach(function (s) { s.out.textContent = s.n + ' = ' + (s.n === 't' ? deg(vars.t) : (vars.w > 0 ? '+' : vars.w < 0 ? '−' : '') + Math.abs(vars.w) + '°'); });
    L.forEach(function (n) {
      var on = sel.indexOf(n) >= 0;
      ui.btns[n].setAttribute('aria-pressed', String(on));
      ui.btns[n].setAttribute('aria-label', 'Angle ' + n + (visible(n) ? ', ' + deg(sz[n]) : ''));
    });
    var r = sel.length === 2 ? kind(sel[0], sel[1]) : 0, work, note = '';
    var both = sel.map(function (n) { return visible(n) ? n + ' = ' + deg(sz[n]) : n; }).join(' and ');
    if (!sel.length) work = 'Pick two angles: click them, or use the letters below.';
    else if (sel.length === 1) work = both + '. Pick another.';
    else if (!spec.names) work = both + '.';
    else if (!r) { work = both + ': not one of the named pairs.'; }
    else {
      work = sel[0] + ' and ' + sel[1] + ' are ' + KIND[r] + (r === 5 ? '' : ' angles') + '.';
      if (par || r === 4 || r === 5) note = RULE[r] + (spec.show === 'shown' ? ' ' + both.replace(' and ', ', ') + '.' : '');
      else note = 'These lines are not parallel, so ' + KIND[r] + ' angles need not be ' + (r === 3 ? 'add to 180°' : 'equal') + (spec.show === 'shown' ? ': ' + both.replace(' and ', ', ') + '.' : '.');
      note = note.replace('need not be add to', 'need not add to');
    }
    ui.work.textContent = work; ui.note.textContent = note;
    B.say(spec.show === 'shown' ? L.map(function (n) { return n + ' ' + deg(sz[n]); }).join(', ') + '.' : '');
    B.save({ vars: { t: vars.t, w: vars.w }, sel: sel.slice() });
    var scope = { t: vars.t, w: vars.w, m: sel.length, r: r, s: sel.reduce(function (acc, n) { return acc + sz[n]; }, 0), p: par ? 1 : 0 };
    L.forEach(function (n) { scope[n] = Math.round(sz[n] * 1e6) / 1e6; });
    B.post({ scope: { vars: scope, points: {} } }, work + (note ? ' ' + note : ''));
  }

  B.widget('parallel', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Two lines crossed by a transversal, with the eight angles a to h'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = {};
      ['t', 'w'].forEach(function (n) { vars[n] = spec.sl[n] ? (sv && sv.vars && sv.vars[n] !== undefined ? sv.vars[n] : spec.sl[n].start) : spec.fixed[n]; });
      sel = sv && sv.sel ? sv.sel.slice(0, 2) : spec.pair.slice();
      paintPanel();
      build();
      report();
    },
  });
})(WPB);
