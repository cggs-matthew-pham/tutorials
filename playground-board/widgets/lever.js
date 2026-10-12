// Levers and pulleys (Engineering › Mechanisms, lessons 3 and 4). Both trade force for distance: a smaller push moves
// farther. No friction, a weightless bar and weightless pulleys: the panel says so.
//   widget: lever
//   mode: lever | pulley
// mode lever: a bar on a pivot, a load and a push.
//   length: 2            the bar in metres                pivot: 1    loadat: 0    effortat: 2   (metres from the left end)
//   load: 600            the load in newtons              push: 200   the most the student can push, in newtons
//   move: pivot          which can be moved: pivot, load, effort (a list), or none
//   step: 0.1            how far a slider moves (m)       rise: 0.1   how far the load is lifted (m)
//   travel: 0.5          the most the hand may move (m; a criterion with numbers on and in the brief)
//   numbers: off         hide the push needed, the advantage and the distances (students find the spot by testing)
//   brief: edit          students set the load, the push and the travel
// mode pulley: a top block, a bottom block and n ropes holding the bottom block; the rope you pull goes over the top.
//   ropes: 1             ropes holding the load up        choose: on (pick 1 to 6)   options: 1, 2, 3, 4, 5, 6
//   load: 400  push: 150  height: 1 (m the load is lifted)  numbers: off  brief: edit
// state: { scope: { vars: lever: { f_m (pivot), x_l, x_e (load and effort positions), d_l, d_e (distances from the
//          pivot), e_n (push needed), m_a (load ÷ push needed), k (lever class 1, 2 or 3), load_n, push_n, move_e (m the
//          hand moves to lift the load `rise`), travel_m, l (last push lifted it), s (last push failed), p (meets the
//          brief: push needed ≤ push and move_e ≤ travel) }
//          pulley: { n (ropes holding the load), e_n, m_a, load_n, push_n, pull_m (rope pulled to lift `height`), h_m,
//          l, s, p, n_min (fewest ropes from the options that lift it) } } }
// Checks: "s = 1", "l = 1 and k = 2", "load_n = 900 and l = 1 and n = 5", "n = 4 and l = 1 and n_min = 4".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {}, anim = null;
  var on = function (s) { return /^on$/i.test(s || ''); };
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var r3 = function (v) { return Math.round(v * 1000) / 1000; };
  var num = function (s, key, def, lo, hi) {
    var v = s[key] === undefined ? def : Number(s[key]);
    if (!(v >= lo && v <= hi)) throw new Error(key + ': a number from ' + lo + ' to ' + hi + '.');
    return v;
  };
  var EPS = 1e-9;

  function parse(s) {
    s.mode = String(s.mode || 'lever').toLowerCase();
    if (['lever', 'pulley'].indexOf(s.mode) < 0) throw new Error('mode: lever or pulley.');
    s.hide = /^off$/i.test(s.numbers || ''); s.edit = /^edit$/i.test(s.brief || '');
    s.load0 = num(s, 'load', s.mode === 'lever' ? 600 : 400, 0, 100000);
    s.push0 = num(s, 'push', s.mode === 'lever' ? 200 : 150, 1, 100000);
    if (s.mode === 'lever') {
      s.len = num(s, 'length', 2, 0.2, 20);
      s.pv0 = num(s, 'pivot', s.len / 2, 0, s.len); s.xl0 = num(s, 'loadat', 0, 0, s.len); s.xe0 = num(s, 'effortat', s.len, 0, s.len);
      s.step = num(s, 'step', 0.1, 0.01, s.len); s.rise = num(s, 'rise', 0.1, 0.001, 10);
      s.travel0 = s.travel === undefined ? null : num(s, 'travel', 0.5, 0.001, 100);
      if (s.edit && s.travel0 === null) s.travel0 = 0.5;
      var mv = /^none$/i.test(s.move || '') ? [] : String(s.move || 'pivot').split(',').map(function (t) { return t.trim().toLowerCase(); });
      if (mv.some(function (m) { return ['pivot', 'load', 'effort'].indexOf(m) < 0; })) throw new Error('move: pivot, load, effort (a list), or none.');
      s.mv = mv;
      if (Math.abs(s.pv0 - s.xe0) < EPS) throw new Error('effortat: not on the pivot (it could not turn the bar).');
      if (Math.abs(s.xl0 - s.xe0) < EPS) throw new Error('loadat and effortat: two different places.');
    } else {
      s.opts = String(s.options || '1, 2, 3, 4, 5, 6').split(',').map(function (t) { return Number(t.trim()); });
      if (s.opts.some(function (n) { return !(n >= 1 && n <= 6 && n === Math.round(n)); })) throw new Error('options: whole numbers of ropes from 1 to 6.');
      s.n0 = num(s, 'ropes', s.opts[0], 1, 6);
      s.height = num(s, 'height', 1, 0.01, 100); s.choose = on(s.choose);
    }
  }

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, t, cls, anchor) { var e = el('text', { x: x, y: y, 'text-anchor': anchor || 'middle', class: cls || 'glabel' }, parent); e.textContent = t; return e; }
  function animate(ms, frame, done) {
    if (anim) cancelAnimationFrame(anim);
    var t0 = performance.now();
    (function tick(now) {
      var k = Math.min(1, (now - t0) / ms); frame(k);
      if (k < 1) anim = requestAnimationFrame(tick); else { anim = null; done(); }
    })(t0);
  }
  var busy = function () { return !!anim; };
  function btn(text, label, fn, quiet) {
    var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label);
    if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e;
  }
  function numIn(label, value, fn) {
    var wrap = document.createElement('label'); wrap.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'number'; i.min = '0'; i.step = 'any'; i.value = value;
    i.addEventListener('change', function () { var v = Number(i.value); if (v >= 0) fn(v); else i.value = value; });
    wrap.appendChild(i); return wrap;
  }

  // ------------------------------------------------------------------ lever
  function lv() {
    var dl = Math.abs(st.xl - st.pv), de = Math.abs(st.xe - st.pv);
    var k = (st.pv - st.xl) * (st.pv - st.xe) < 0 ? 1 : (st.xl - st.pv) * (st.xl - st.xe) < 0 ? 2 : 3;
    var e = de > EPS ? st.load * dl / de : Infinity;
    var mv = dl > EPS ? spec.rise * de / dl : Infinity;
    return { dl: r3(dl), de: r3(de), k: k, e: e, mv: mv, ma: e > EPS && isFinite(e) ? st.load / e : 0,
      pass: st.load > 0 && e <= st.push + EPS && (st.travel === null || mv <= st.travel + EPS) };
  }
  var X0 = 70, X1 = 530, BY = 170;
  var sx = function (m) { return X0 + (X1 - X0) * m / spec.len; };
  function drawLever() {
    var host = B.el('board'); host.replaceChildren();
    var svg = el('svg', { viewBox: '0 0 600 320', class: 'gearsvg lvsvg', role: 'img', 'aria-label': 'A bar on a pivot with a load and a push' }, host);
    el('line', { x1: 20, y1: 262, x2: 580, y2: 262, class: 'lvground' }, svg);
    var px = sx(st.pv);
    el('path', { d: 'M' + px + ',' + (BY + 6) + ' L' + (px - 26) + ',262 L' + (px + 26) + ',262 Z', class: 'lvpivot' }, svg);
    ui.beam = el('g', {}, svg);
    el('rect', { x: X0, y: BY - 6, width: X1 - X0, height: 12, rx: 4, class: 'lvbar' }, ui.beam);
    for (var m = 0; m <= spec.len + EPS; m += spec.len <= 4 ? 0.5 : 1) el('line', { x1: sx(m), y1: BY - 6, x2: sx(m), y2: BY + 6, class: 'lvtick' }, ui.beam);
    // load: a box sitting on the bar; effort: an arrow (down when it is on the other side of the pivot, else up)
    var lx = sx(st.xl), ex = sx(st.xe), L = lv(), up = L.k !== 1;
    var box = el('g', { transform: 'translate(' + lx + ',' + (BY - 6) + ')' }, ui.beam);
    el('rect', { x: -30, y: -46, width: 60, height: 46, rx: 4, class: 'gbucket' }, box);
    txt(box, 0, -18, st.load + ' N', 'gbtext');
    var arr = el('g', { transform: 'translate(' + ex + ',' + (up ? BY + 6 : BY - 6) + ')' }, ui.beam);
    el('path', { d: up ? 'M0,0 L-9,16 L-3,16 L-3,62 L3,62 L3,16 L9,16 Z' : 'M0,0 L-9,-16 L-3,-16 L-3,-62 L3,-62 L3,-16 L9,-16 Z', class: 'lvpush' }, arr);
    txt(arr, 0, up ? 80 : -70, 'Push', 'glabel');
    txt(svg, px, 290, 'Pivot', 'glabel');
    ui.lv = { px: px, BY: BY, dl: Math.max(L.dl, 0.05) };
    poseLever(0);
  }
  // k: 0..1 how far the load has risen. The bar turns about the pivot so the load end rises.
  function poseLever(k) {
    var G = ui.lv, angle = 0;
    if (k) {
      var deg = Math.min(14, Math.atan2(spec.rise * k, G.dl) * 180 / Math.PI * 4);
      angle = (st.xl < st.pv ? 1 : -1) * deg;   // the load's end of the bar rises
    }
    ui.beam.setAttribute('transform', 'rotate(' + angle.toFixed(2) + ' ' + G.px + ' ' + G.BY + ')');
  }
  function slider(label, key, value) {
    var wrap = document.createElement('label'); wrap.className = 'lvslide';
    var s = document.createElement('span'); s.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'range'; i.min = 0; i.max = spec.len; i.step = spec.step; i.value = value;
    i.setAttribute('aria-label', label + ' (metres from the left end)');
    var o = document.createElement('output'); o.textContent = B.fmt(value) + ' m';
    i.addEventListener('input', function () {
      if (busy()) { i.value = st[key]; return; }
      var v = r3(Number(i.value)), next = Object.assign({}, { pv: st.pv, xl: st.xl, xe: st.xe }); next[key] = v;
      if (Math.abs(next.pv - next.xe) < EPS || Math.abs(next.xl - next.xe) < EPS) { i.value = st[key]; report(key === 'xe' ? 'The push cannot be on the pivot or on the load.' : 'The ' + (key === 'pv' ? 'pivot' : 'load') + ' cannot go where you push.'); return; }
      st[key] = v; o.textContent = B.fmt(v) + ' m'; st.s = 0; st.l = 0; B.moved = true; drawLever(); report();
    });
    wrap.appendChild(s); wrap.appendChild(i); wrap.appendChild(o); return wrap;
  }
  function pushLever() {
    if (busy()) return;
    B.moved = true;
    var L = lv();
    if (L.dl < EPS) return report('The load is on the pivot: the bar turns, but the load does not rise.');
    if (!(L.e <= st.push + EPS)) {
      animate(800, function (k) { poseLever(0.08 * Math.sin(k * Math.PI * 4)); }, function () {
        st.s = 1; st.l = 0; poseLever(0);
        report(spec.hide ? 'You push as hard as you can (' + st.push + ' N), but the load does not move.' : 'Not enough: it needs ' + B.fmt(r2(L.e)) + ' N and you can push ' + st.push + ' N.');
      });
      return;
    }
    animate(1400, function (k) { poseLever(k); }, function () {
      st.s = 0; st.l = 1;
      report('Lifted ' + st.load + ' N by ' + B.fmt(spec.rise) + ' m' + (spec.hide ? '. How far did your hand move?' : ': your hand moved ' + B.fmt(r3(L.mv)) + ' m.'));
    });
  }

  // ------------------------------------------------------------------ pulley
  function pl(n) {
    n = n || st.n;
    var e = st.load / n;
    return { e: e, pull: n * spec.height, ma: n, pass: st.load > 0 && e <= st.push + EPS };
  }
  function nMin() {
    var ok = spec.opts.filter(function (n) { return pl(n).pass; });
    return ok.length ? Math.min.apply(null, ok) : 0;
  }
  // The rope, from the hand back: down from a top wheel, then n ropes between the blocks, turning round a bottom wheel,
  // then a top wheel, and so on. Its far end is tied to the top block (n even) or the bottom block (n odd).
  var GAP = 24, TOPY = 62, REST = 205;
  function drawPulley() {
    var host = B.el('board'); host.replaceChildren();
    var n = st.n, svg = el('svg', { viewBox: '0 0 600 320', class: 'gearsvg plsvg', role: 'img', 'aria-label': 'A pulley system with ' + n + (n === 1 ? ' rope' : ' ropes') + ' holding the load' }, host);
    var cx = 250, xs = [];
    for (var i = 0; i < n; i++) xs.push(cx - (n - 1) * GAP / 2 + i * GAP);
    var freeX = xs[n - 1] + GAP, topW = [], botW = [];
    topW.push((xs[n - 1] + freeX) / 2);
    for (i = n - 1; i >= 1; i--) ((n - 1 - i) % 2 === 0 ? botW : topW).push((xs[i] + xs[i - 1]) / 2);
    el('rect', { x: 110, y: 6, width: 360, height: 10, class: 'lvbar' }, svg);
    var tl = Math.min.apply(null, topW.concat(xs)) - 14, tr = Math.max.apply(null, topW.concat([freeX])) + 14;
    el('line', { x1: (tl + tr) / 2, y1: 16, x2: (tl + tr) / 2, y2: TOPY - 14, class: 'grope' }, svg);
    el('rect', { x: tl, y: TOPY - 14, width: tr - tl, height: 28, rx: 8, class: 'plblock' }, svg);
    topW.forEach(function (x) { el('circle', { cx: x, cy: TOPY, r: GAP / 2, class: 'plwheel' }, svg); });
    ui.ropes = el('g', {}, svg);
    ui.bottom = el('g', {}, svg);
    var bl = Math.min.apply(null, xs) - 14, br = Math.max.apply(null, xs) + 14;
    if (n >= 2) {
      el('rect', { x: bl, y: -14, width: br - bl, height: 28, rx: 8, class: 'plblock' }, ui.bottom);
      botW.forEach(function (x) { el('circle', { cx: x, cy: 0, r: GAP / 2, class: 'plwheel' }, ui.bottom); });
    }
    el('line', { x1: cx, y1: n >= 2 ? 14 : 0, x2: cx, y2: 30, class: 'grope' }, ui.bottom);
    el('rect', { x: cx - 38, y: 30, width: 76, height: 52, rx: 4, class: 'gbucket' }, ui.bottom);
    txt(ui.bottom, cx, 61, st.load + ' N', 'gbtext');
    ui.hand = el('g', {}, svg);
    el('circle', { r: 12, class: 'lvhand' }, ui.hand);
    txt(ui.hand, 20, 5, 'Pull', 'glabel', 'start');
    ui.pl = { xs: xs, freeX: freeX };
    posePulley(0);
  }
  function posePulley(k) {
    var G = ui.pl, n = st.n, rise = 80 * k, by = REST - rise, hy = 140 + Math.min(160, rise * n * 0.6);
    ui.bottom.setAttribute('transform', 'translate(0,' + by.toFixed(1) + ')');
    ui.ropes.replaceChildren();
    G.xs.forEach(function (x) { el('line', { x1: x, y1: TOPY, x2: x, y2: by, class: 'grope plrope' }, ui.ropes); });
    el('line', { x1: G.freeX, y1: TOPY, x2: G.freeX, y2: hy.toFixed(1), class: 'grope plfree' }, ui.ropes);
    ui.hand.setAttribute('transform', 'translate(' + G.freeX + ',' + hy.toFixed(1) + ')');
  }
  function pullPulley() {
    if (busy()) return;
    if (!st.load) return report('Put a load on the hook first.');
    B.moved = true;
    var P = pl();
    if (!P.pass) {
      animate(800, function (k) { posePulley(0.03 * Math.sin(k * Math.PI * 4)); }, function () {
        st.s = 1; st.l = 0; posePulley(0);
        report(spec.hide ? 'You pull as hard as you can (' + st.push + ' N), but the load does not move.' : 'Not enough: it needs ' + B.fmt(r2(P.e)) + ' N and you can pull ' + st.push + ' N.');
      });
      return;
    }
    animate(1800, function (k) { posePulley(k); }, function () {
      st.s = 0; st.l = 1;
      report('Lifted ' + st.load + ' N by ' + B.fmt(spec.height) + ' m. You pulled ' + B.fmt(r2(P.pull)) + ' m of rope.');
    });
  }

  // ------------------------------------------------------------------ panel and report
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (spec.edit) {
      var row0 = document.createElement('div'); row0.className = 'oprow gbrief';
      var b = document.createElement('strong'); b.textContent = 'Brief:'; row0.appendChild(b);
      row0.appendChild(numIn('load (N)', st.load, function (v) { st.load = v; st.s = 0; st.l = 0; B.moved = true; redraw(); report(); }));
      row0.appendChild(numIn(spec.mode === 'lever' ? 'your push (N)' : 'your pull (N)', st.push, function (v) { if (v > 0) { st.push = v; st.s = 0; st.l = 0; B.moved = true; report(); } }));
      if (spec.mode === 'lever') row0.appendChild(numIn('hand travel (m)', st.travel, function (v) { if (v > 0) { st.travel = v; B.moved = true; report(); } }));
      panel.appendChild(row0);
    }
    var row = document.createElement('div'); row.className = 'oprow';
    if (spec.mode === 'lever') {
      var names = { pivot: ['Pivot', 'pv'], load: ['Load', 'xl'], effort: ['Push', 'xe'] };
      spec.mv.forEach(function (m) { row.appendChild(slider(names[m][0], names[m][1], st[names[m][1]])); });
      if (spec.mv.length) { panel.appendChild(row); row = document.createElement('div'); row.className = 'oprow'; }
      row.appendChild(btn('Push', 'Push as hard as you can', pushLever));
    } else {
      if (spec.choose) {
        var wrap = document.createElement('label'); wrap.textContent = 'Ropes holding the load ';
        var s = document.createElement('select');
        spec.opts.forEach(function (n) { var o = document.createElement('option'); o.value = n; o.textContent = n; s.appendChild(o); });
        s.value = String(st.n);
        s.addEventListener('change', function () { if (busy()) { s.value = String(st.n); return; } st.n = Number(s.value); st.s = 0; st.l = 0; B.moved = true; drawPulley(); report(); });
        wrap.appendChild(s); row.appendChild(wrap);
      }
      row.appendChild(btn('Pull', 'Pull as hard as you can', pullPulley));
    }
    if (!spec.edit) {
      row.appendChild(btn('− 50 N', 'Take 50 newtons off the load', function () { if (busy() || st.load < 50) return; st.load -= 50; st.s = 0; st.l = 0; B.moved = true; redraw(); report(); }, true));
      row.appendChild(btn('+ 50 N', 'Add 50 newtons to the load', function () { if (busy()) return; st.load += 50; st.s = 0; st.l = 0; B.moved = true; redraw(); report(); }, true));
    }
    row.appendChild(btn('Start again', null, function () { if (anim) { cancelAnimationFrame(anim); anim = null; } B.restart(); }, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
  }
  function redraw() { if (spec.mode === 'lever') drawLever(); else drawPulley(); }

  var KIND = { 1: 'class 1 (pivot in the middle)', 2: 'class 2 (load in the middle)', 3: 'class 3 (push in the middle)' };
  function report(note) {
    var facts = [], crit = '', vars, say;
    if (spec.mode === 'lever') {
      var L = lv();
      if (!spec.hide) {
        facts.push('Load ' + st.load + ' N × ' + B.fmt(L.dl) + ' m = ' + B.fmt(r2(st.load * L.dl)));
        facts.push('push needed ' + B.fmt(r2(st.load * L.dl)) + ' ÷ ' + B.fmt(L.de) + ' = ' + (isFinite(L.e) ? B.fmt(r2(L.e)) : '∞') + ' N');
        facts.push('hand moves ' + (isFinite(L.mv) ? B.fmt(r3(L.mv)) : '∞') + ' m to lift ' + B.fmt(spec.rise) + ' m');
        facts.push(KIND[L.k]);
        if (st.load > 0) crit = (L.e <= st.push + EPS ? '✓' : '✗') + ' push ≤ ' + st.push + ' N' + (st.travel !== null ? '  ' + (L.mv <= st.travel + EPS ? '✓' : '✗') + ' hand ≤ ' + B.fmt(st.travel) + ' m' : '');
      } else facts.push('You can push ' + st.push + ' N');
      vars = { f_m: st.pv, x_l: st.xl, x_e: st.xe, d_l: L.dl, d_e: L.de, e_n: isFinite(L.e) ? r2(L.e) : 99999, m_a: r2(L.ma), k: L.k,
        load_n: st.load, push_n: st.push, move_e: isFinite(L.mv) ? r3(L.mv) : 99999, travel_m: st.travel === null ? 0 : st.travel,
        l: st.l, s: st.s, p: L.pass ? 1 : 0 };
      say = 'Pivot at ' + B.fmt(st.pv) + ' m, load at ' + B.fmt(st.xl) + ' m, push at ' + B.fmt(st.xe) + ' m, ' + st.load + ' N.';
      B.save({ pv: st.pv, xl: st.xl, xe: st.xe, load: st.load, push: st.push, travel: st.travel, s: st.s, l: st.l });
    } else {
      var P = pl(), nm = nMin();
      if (!spec.hide) {
        facts.push('Pull needed ' + st.load + ' ÷ ' + st.n + ' = ' + B.fmt(r2(P.e)) + ' N');
        facts.push('rope pulled ' + st.n + ' × ' + B.fmt(spec.height) + ' = ' + B.fmt(r2(P.pull)) + ' m');
        if (st.load > 0) crit = (P.pass ? '✓' : '✗') + ' pull ≤ ' + st.push + ' N';
      } else facts.push('You can pull ' + st.push + ' N');
      vars = { n: st.n, e_n: r2(P.e), m_a: P.ma, load_n: st.load, push_n: st.push, pull_m: r2(P.pull), h_m: spec.height, l: st.l, s: st.s, p: P.pass ? 1 : 0, n_min: nm };
      say = st.n + (st.n === 1 ? ' rope holds ' : ' ropes hold ') + 'the ' + st.load + ' N load.';
      B.save({ n: st.n, load: st.load, push: st.push, s: st.s, l: st.l });
    }
    ui.facts.textContent = facts.join(' · ') + (crit ? '  ·  ' + crit : '');
    ui.note.textContent = note || (spec.edit && spec.mode === 'pulley' ? (st.load > 0 ? 'Fewest ropes that lift it: ' + (vars.n_min || 'none of the options') + '.' : 'Set the load and your pull.') : 'No friction in this model, and the ' + (spec.mode === 'lever' ? 'bar weighs nothing.' : 'pulleys and rope weigh nothing.'));
    B.say(say);
    B.post({ scope: { vars: vars, points: {} } }, say + (note ? ' ' + note : ''));
  }

  B.widget('lever', {
    sections: ['board', 'gpanel'],
    label: function () { return spec && spec.mode === 'pulley' ? 'A pulley system lifting a load' : 'A lever: a bar on a pivot lifting a load'; },
    parse: parse,
    redraw: function () { if (spec) { redraw(); report(); } },
    start: function (fresh) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = { load: spec.load0, push: spec.push0, s: 0, l: 0 };
      if (spec.mode === 'lever') {
        st.pv = spec.pv0; st.xl = spec.xl0; st.xe = spec.xe0; st.travel = spec.travel0;
        if (sv) {
          ['pv', 'xl', 'xe'].forEach(function (k) { var m = { pv: 'pivot', xl: 'load', xe: 'effort' }[k]; if (spec.mv.indexOf(m) >= 0 && sv[k] >= 0 && sv[k] <= spec.len) st[k] = sv[k]; });
          if (Math.abs(st.pv - st.xe) < EPS || Math.abs(st.xl - st.xe) < EPS) { st.pv = spec.pv0; st.xl = spec.xl0; st.xe = spec.xe0; }
        }
      } else {
        st.n = spec.n0;
        if (sv && spec.choose && spec.opts.indexOf(sv.n) >= 0) st.n = sv.n;
      }
      if (sv) {
        st.load = sv.load >= 0 ? sv.load : st.load; st.s = sv.s || 0; st.l = sv.l || 0;
        if (spec.edit) { if (sv.push > 0) st.push = sv.push; if (sv.travel > 0) st.travel = sv.travel; }
      }
      paintPanel(); redraw();
      if (st.l) { if (spec.mode === 'lever') poseLever(1); else posePulley(1); }
      report();
    },
  });
})(WPB);
