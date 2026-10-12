// Changing motion (Engineering › Linkages and cams): a crank and slider (turning to back and forth), a cam and
// follower (a shape to a path), and a four-bar linkage (turning to rocking). Rigid parts, no friction, slow turning.
//   widget: motion
//   mode: crank | cam | linkage
//   choose: on          sliders for the sizes (crank: radius and rod; cam: lift and a cam menu; linkage: all four bars)
//   numbers: off        hide the measurements (students read the trace instead)
// mode crank:   radius: 20 (mm)   rod: 80 (mm)   rpm: 60   target: 60 (stroke in mm the brief asks for)
// mode cam:     cam: eccentric | pear | snail | heart   lift: 20 (mm)   base: 30 (mm)
// mode linkage: crank: 30   coupler: 80   rocker: 60   ground: 70 (mm)   swing: 60 (degrees the rocker should swing; a criterion)
// state: { scope: { vars: crank { r_mm, rod_mm, stroke_mm, rpm, spm (strokes a minute), turns, t (turned at least
//          once since the last change), target_mm, p (stroke = target) }; cam { c (1 eccentric, 2 pear, 3 snail, 4 heart), lift_mm, dwell
//          (degrees the follower rests), drop (1 if it drops suddenly), turns, t }; linkage { a_mm, b_mm, c_mm, d_mm,
//          g (1 if shortest + longest ≤ the other two), full (1 if the crank turns all the way), swing (degrees the rocker
//          swings, 0 if it jams), jam (1 if the last turn jammed), turns, t, p (full and swing ≥ the brief's swing) } } }
// Checks: "stroke_mm = 60 and t = 1", "c = 3 and turns >= 1", "full = 1 and swing >= 90".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {}, anim = null;
  var on = function (s) { return /^on$/i.test(s || ''); };
  var r1 = function (v) { return Math.round(v * 10) / 10; };
  var num = function (s, key, def, lo, hi) {
    var v = s[key] === undefined ? def : Number(s[key]);
    if (!(v >= lo && v <= hi)) throw new Error(key + ': a number from ' + lo + ' to ' + hi + '.');
    return v;
  };
  var RAD = Math.PI / 180;
  var CAMS = ['eccentric', 'pear', 'snail', 'heart'];
  var CAMNAME = { eccentric: 'Eccentric (round, off centre)', pear: 'Pear', snail: 'Snail', heart: 'Heart' };

  function parse(s) {
    s.mode = String(s.mode || 'crank').toLowerCase();
    if (['crank', 'cam', 'linkage'].indexOf(s.mode) < 0) throw new Error('mode: crank, cam or linkage.');
    s.choose = on(s.choose); s.hide = /^off$/i.test(s.numbers || '');
    if (s.mode === 'crank') {
      s.r0 = num(s, 'radius', 20, 5, 60); s.rod0 = num(s, 'rod', 80, 10, 200); s.rpm = num(s, 'rpm', 60, 1, 10000);
      s.target = s.target === undefined ? null : num(s, 'target', 60, 1, 200);
      if (s.rod0 <= s.r0) throw new Error('rod: longer than the radius, or the crank cannot turn.');
    } else if (s.mode === 'cam') {
      s.cam0 = String(s.cam || 'eccentric').toLowerCase();
      if (CAMS.indexOf(s.cam0) < 0) throw new Error('cam: eccentric, pear, snail or heart.');
      s.lift0 = num(s, 'lift', 20, 2, 30); s.base = num(s, 'base', 30, 15, 50);
    } else {
      s.a0 = num(s, 'crank', 30, 10, 120); s.b0 = num(s, 'coupler', 80, 10, 160); s.c0 = num(s, 'rocker', 60, 10, 160); s.d0 = num(s, 'ground', 70, 10, 160);
      s.swing = s.swing === undefined ? null : num(s, 'swing', 60, 1, 180);
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
      var k = Math.min(1, (now - t0) / ms);
      if (frame(k) === false) { anim = null; done(true); return; }
      if (k < 1) anim = requestAnimationFrame(tick); else { anim = null; done(false); }
    })(t0);
  }
  var busy = function () { return !!anim; };
  function btn(text, label, fn, quiet) {
    var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label);
    if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e;
  }
  function slider(label, key, lo, hi, step, unit) {
    var wrap = document.createElement('label'); wrap.className = 'lvslide';
    var s = document.createElement('span'); s.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'range'; i.min = lo; i.max = hi; i.step = step; i.value = st[key];
    i.setAttribute('aria-label', label + ' (' + unit + ')');
    var o = document.createElement('output'); o.textContent = st[key] + ' ' + unit;
    i.addEventListener('input', function () {
      if (busy()) { i.value = st[key]; return; }
      var v = Number(i.value), old = st[key]; st[key] = v;
      if (spec.mode === 'crank' && st.rod <= st.r) { st[key] = old; i.value = old; report('The rod must be longer than the crank, or the crank cannot turn.'); return; }
      o.textContent = v + ' ' + unit; st.angle = 0; st.trace = []; st.jam = 0; st.turns = 0; B.moved = true; draw(); report();
    });
    wrap.appendChild(s); wrap.appendChild(i); wrap.appendChild(o); return wrap;
  }

  // ------------------------------------------------------------------ geometry
  // Cam follower height (mm above the base circle) when the cam has turned theta degrees.
  function camH(name, lift, th) {
    th = ((th % 360) + 360) % 360;
    if (name === 'eccentric') return lift / 2 * (1 - Math.cos(th * RAD));
    if (name === 'pear') return th < 180 ? 0 : lift / 2 * (1 - Math.cos(2 * (th - 180) * RAD));
    if (name === 'snail') return lift * th / 360;
    return th <= 180 ? lift * th / 180 : lift * (360 - th) / 180;   // heart: steady rise, steady fall
  }
  // Four-bar: A at (0,0), D at (d,0); returns C for crank angle th (upper branch), or null if the bars cannot meet.
  function linkC(th) {
    var bx = st.a * Math.cos(th * RAD), by = st.a * Math.sin(th * RAD);
    var dx = st.d - bx, dy = -by, dist = Math.hypot(dx, dy);
    if (dist > st.b + st.c + 1e-9 || dist < Math.abs(st.b - st.c) - 1e-9 || dist < 1e-9) return null;
    var x = (st.b * st.b - st.c * st.c + dist * dist) / (2 * dist), h = Math.sqrt(Math.max(0, st.b * st.b - x * x));
    var ux = dx / dist, uy = dy / dist;
    return { bx: bx, by: by, cx: bx + ux * x - uy * h, cy: by + uy * x + ux * h };
  }
  function linkInfo() {
    var L = [st.a, st.b, st.c, st.d].slice().sort(function (p, q) { return p - q; });
    var g = L[0] + L[3] <= L[1] + L[2] + 1e-9 ? 1 : 0;
    var full = 1, lo = Infinity, hi = -Infinity, jamAt = null;
    for (var th = 0; th <= 360; th += 1) {
      var P = linkC(th);
      if (!P) { full = 0; if (jamAt === null) jamAt = th; continue; }
      var ang = Math.atan2(P.cy, P.cx - st.d) / RAD;   // the rocker's angle at D
      lo = Math.min(lo, ang); hi = Math.max(hi, ang);
    }
    return { g: g, full: full, swing: full ? Math.round(hi - lo) : 0, jamAt: jamAt };
  }

  // ------------------------------------------------------------------ drawing
  var GX = 400, GY = 60, GW = 180, GH = 200;   // the trace graph on the right
  function graphFrame(svg, ylabel, ymax) {
    el('rect', { x: GX, y: GY, width: GW, height: GH, class: 'mvgraph' }, svg);
    [0, 90, 180, 270, 360].forEach(function (a) { var x = GX + GW * a / 360; el('line', { x1: x, y1: GY + GH, x2: x, y2: GY + GH + 5, class: 'lvtick' }, svg); txt(svg, x, GY + GH + 18, a + '°', 'mvsmall'); });
    txt(svg, GX + GW / 2, GY + GH + 36, 'crank or cam angle', 'mvsmall');
    txt(svg, GX, GY - 10, ylabel, 'mvsmall', 'start');
    ui.ymax = ymax;
    ui.tr = el('path', { class: 'mvtrace' }, svg);
  }
  function plotTrace() {
    if (!ui.tr) return;
    var d = st.trace.map(function (p, i) { return (i ? 'L' : 'M') + (GX + GW * p[0] / 360).toFixed(1) + ',' + (GY + GH - GH * p[1] / ui.ymax).toFixed(1); }).join('');
    ui.tr.setAttribute('d', d);
  }

  function draw() {
    var host = B.el('board'); host.replaceChildren(); ui = {};
    var svg = el('svg', { viewBox: '0 0 600 320', class: 'gearsvg mvsvg', role: 'img', 'aria-label': spec.mode === 'crank' ? 'A crank turning a slider back and forth' : spec.mode === 'cam' ? 'A cam pushing a follower up and down' : 'A four-bar linkage: a crank turning a rocker' }, host);
    ui.svg = svg;
    if (spec.mode === 'crank') {
      var S = Math.min(2.2, 300 / (st.r + st.rod + 10));
      ui.k = { cx: 40 + st.r * S + 6, cy: 150, S: S };
      el('line', { x1: ui.k.cx, y1: ui.k.cy + 22, x2: 390, y2: ui.k.cy + 22, class: 'lvground' }, svg);
      el('circle', { cx: ui.k.cx, cy: ui.k.cy, r: st.r * S + 8, class: 'plwheel' }, svg);
      ui.rod = el('line', { class: 'mvrod' }, svg);
      ui.crank = el('line', { class: 'mvcrank' }, svg);
      ui.slide = el('rect', { width: 40, height: 30, rx: 4, class: 'gbucket' }, svg);
      el('circle', { cx: ui.k.cx, cy: ui.k.cy, r: 5, class: 'gaxle' }, svg);
      ui.pin = el('circle', { r: 5, class: 'gmark' }, svg);
      graphFrame(svg, 'slider position (mm)', 2 * st.r + 4);
      txt(svg, ui.k.cx, 290, 'Crank', 'glabel');
    } else if (spec.mode === 'cam') {
      var cx = 180, cy = 210, s2 = 1.6;
      ui.c = { cx: cx, cy: cy, S: s2 };
      ui.cam = el('g', {}, svg);
      var pts = [];
      for (var a = 0; a < 360; a += 2) { var r = (spec.base + camH(st.cam, st.lift, a)) * s2; pts.push((r * Math.sin(a * RAD)).toFixed(1) + ',' + (-r * Math.cos(a * RAD)).toFixed(1)); }
      el('path', { d: 'M' + pts.join('L') + 'Z', class: 'mvcam' }, ui.cam);
      el('circle', { r: 6, class: 'gaxle' }, ui.cam);
      el('circle', { cx: 0, cy: -spec.base * s2 * 0.5, r: 4, class: 'gmark' }, ui.cam);
      el('rect', { x: cx - 30, y: 22, width: 60, height: 8, class: 'lvbar' }, svg);
      el('rect', { x: cx - 14, y: 30, width: 6, height: 50, class: 'plblock' }, svg);
      el('rect', { x: cx + 8, y: 30, width: 6, height: 50, class: 'plblock' }, svg);   // the guide the follower slides in
      ui.fol = el('g', {}, svg);
      el('rect', { x: -6, y: -90, width: 12, height: 90, class: 'mvrodbox' }, ui.fol);
      el('circle', { cx: 0, cy: 0, r: 7, class: 'mvroller' }, ui.fol);
      graphFrame(svg, 'follower height (mm)', 32);
    } else {
      var all = st.a + st.b + st.c + st.d, S3 = Math.min(2.6, 470 / Math.max(st.d + st.c + 20, all / 1.6));
      ui.l = { ax: 70, ay: 190, S: S3 };
      el('line', { x1: ui.l.ax, y1: ui.l.ay, x2: ui.l.ax + st.d * S3, y2: ui.l.ay, class: 'mvground' }, svg);
      [0, st.d].forEach(function (x) { el('path', { d: 'M' + (ui.l.ax + x * S3) + ',' + ui.l.ay + ' l-12,22 l24,0 Z', class: 'lvpivot' }, svg); });
      ui.trace = el('path', { class: 'mvtrace' }, svg);
      ui.lb = el('line', { class: 'mvcrank' }, svg); ui.lc = el('line', { class: 'mvrod' }, svg); ui.lr = el('line', { class: 'mvrocker' }, svg);
      ui.pB = el('circle', { r: 5, class: 'gmark' }, svg); ui.pC = el('circle', { r: 5, class: 'gaxle' }, svg);
      txt(svg, ui.l.ax, ui.l.ay + 40, 'Crank', 'glabel'); txt(svg, ui.l.ax + st.d * S3, ui.l.ay + 40, 'Rocker', 'glabel');
      ui.jam = txt(svg, 300, 300, '', 'mvjam');
    }
    if (spec.mode === 'linkage' && !linkC(st.angle)) {   // start where the bars can meet
      for (var t = 0; t < 360; t++) if (linkC(t)) { st.angle = t; break; }
    }
    if (pose(st.angle) === false && ui.jam) ui.jam.textContent = 'These bars cannot be joined at all: one is too long.';
    plotTrace();
  }
  function pose(th) {
    if (spec.mode === 'crank') {
      var K = ui.k, S = K.S, px = K.cx + st.r * S * Math.cos(th * RAD), py = K.cy - st.r * S * Math.sin(th * RAD);
      var sx = st.r * Math.cos(th * RAD) + Math.sqrt(st.rod * st.rod - Math.pow(st.r * Math.sin(th * RAD), 2));
      var X = K.cx + sx * S;
      ui.crank.setAttribute('x1', K.cx); ui.crank.setAttribute('y1', K.cy); ui.crank.setAttribute('x2', px); ui.crank.setAttribute('y2', py);
      ui.rod.setAttribute('x1', px); ui.rod.setAttribute('y1', py); ui.rod.setAttribute('x2', X); ui.rod.setAttribute('y2', K.cy);
      ui.pin.setAttribute('cx', px); ui.pin.setAttribute('cy', py);
      ui.slide.setAttribute('x', X - 4); ui.slide.setAttribute('y', K.cy - 15);
      st.x = sx - (st.rod - st.r);   // 0 at the slider's nearest point, 2r at its farthest
    } else if (spec.mode === 'cam') {
      var C = ui.c, h = camH(st.cam, st.lift, th);
      ui.cam.setAttribute('transform', 'translate(' + C.cx + ',' + C.cy + ') rotate(' + (-th).toFixed(1) + ')');
      ui.fol.setAttribute('transform', 'translate(' + C.cx + ',' + (C.cy - (spec.base + h) * C.S - 7).toFixed(1) + ')');
      st.x = h;
    } else {
      var L = ui.l, P = linkC(th);
      if (!P) return false;
      var X0 = function (x) { return L.ax + x * L.S; }, Y0 = function (y) { return L.ay - y * L.S; };
      ui.lb.setAttribute('x1', X0(0)); ui.lb.setAttribute('y1', Y0(0)); ui.lb.setAttribute('x2', X0(P.bx)); ui.lb.setAttribute('y2', Y0(P.by));
      ui.lc.setAttribute('x1', X0(P.bx)); ui.lc.setAttribute('y1', Y0(P.by)); ui.lc.setAttribute('x2', X0(P.cx)); ui.lc.setAttribute('y2', Y0(P.cy));
      ui.lr.setAttribute('x1', X0(st.d)); ui.lr.setAttribute('y1', Y0(0)); ui.lr.setAttribute('x2', X0(P.cx)); ui.lr.setAttribute('y2', Y0(P.cy));
      ui.pB.setAttribute('cx', X0(P.bx)); ui.pB.setAttribute('cy', Y0(P.by)); ui.pC.setAttribute('cx', X0(P.cx)); ui.pC.setAttribute('cy', Y0(P.cy));
      st.cxy = [X0(P.cx), Y0(P.cy)];
    }
    return true;
  }

  function turnOnce() {
    if (busy()) return;
    B.moved = true;
    st.trace = []; st.jam = 0;
    if (spec.mode === 'linkage') { ui.trace.setAttribute('d', ''); ui.jam.textContent = ''; }
    var start = st.angle, path = [];
    animate(spec.mode === 'linkage' ? 3000 : 2400, function (k) {
      var th = start + 360 * k;
      if (pose(th) === false) return false;
      if (spec.mode === 'linkage') { path.push(st.cxy); ui.trace.setAttribute('d', 'M' + path.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L')); }
      else { st.trace.push([360 * k, st.x]); plotTrace(); }
      st.angle = th;
    }, function (jammed) {
      if (jammed) {
        st.jam = 1;
        ui.jam.textContent = 'Jammed: the bars cannot reach any further.';
        return report('Jammed after ' + Math.round(((st.angle - start) % 360 + 360) % 360) + '°: the crank cannot turn all the way round.');
      }
      st.angle = start; pose(start); st.turns += 1;
      report(spec.mode === 'crank' ? (spec.hide ? 'One turn of the crank. How far did the slider move?' : 'One turn: the slider went ' + B.fmt(2 * st.r) + ' mm out and back.')
        : spec.mode === 'cam' ? 'One turn of the cam. Read the follower\'s path on the graph.'
        : 'The crank turned all the way round; the rocker swung ' + linkInfo().swing + '°.');
    });
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'oprow';
    if (spec.choose) {
      if (spec.mode === 'crank') { row.appendChild(slider('Crank radius', 'r', 5, 50, 5, 'mm')); row.appendChild(slider('Rod', 'rod', 30, 160, 5, 'mm')); }
      else if (spec.mode === 'cam') {
        var wrap = document.createElement('label'); wrap.textContent = 'Cam ';
        var s = document.createElement('select');
        CAMS.forEach(function (c) { var o = document.createElement('option'); o.value = c; o.textContent = CAMNAME[c]; s.appendChild(o); });
        s.value = st.cam;
        s.addEventListener('change', function () { if (busy()) { s.value = st.cam; return; } st.cam = s.value; st.angle = 0; st.trace = []; st.turns = 0; B.moved = true; draw(); report(); });
        wrap.appendChild(s); row.appendChild(wrap);
        row.appendChild(slider('Lift', 'lift', 5, 30, 5, 'mm'));
      } else {
        row.appendChild(slider('Crank', 'a', 10, 120, 5, 'mm')); row.appendChild(slider('Coupler', 'b', 10, 160, 5, 'mm'));
        row.appendChild(slider('Rocker', 'c', 10, 160, 5, 'mm')); row.appendChild(slider('Ground', 'd', 10, 160, 5, 'mm'));
      }
      panel.appendChild(row); row = document.createElement('div'); row.className = 'oprow';
    }
    row.appendChild(btn(spec.mode === 'cam' ? 'Turn the cam once' : 'Turn the crank once', null, turnOnce));
    row.appendChild(btn('Start again', null, function () { if (anim) { cancelAnimationFrame(anim); anim = null; } B.restart(); }, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    pp = { facts: ui.facts, note: ui.note };
  }
  var pp = {};

  function report(note) {
    var facts = [], vars, say, base = 'Rigid parts, no friction, turning slowly.';
    if (spec.mode === 'crank') {
      var stroke = 2 * st.r;
      if (!spec.hide) { facts.push('Crank ' + st.r + ' mm, rod ' + st.rod + ' mm'); facts.push('stroke 2 × ' + st.r + ' = ' + stroke + ' mm'); facts.push(spec.rpm + ' turns a minute = ' + spec.rpm + ' strokes a minute'); if (spec.target !== null) facts.push((stroke === spec.target ? '✓' : '✗') + ' stroke ' + spec.target + ' mm'); }
      else facts.push('Turns: ' + st.turns);
      vars = { r_mm: st.r, rod_mm: st.rod, stroke_mm: stroke, rpm: spec.rpm, spm: spec.rpm, turns: st.turns, t: st.turns > 0 ? 1 : 0, target_mm: spec.target || 0, p: spec.target !== null && stroke === spec.target ? 1 : 0 };
      say = 'A crank of ' + st.r + ' mm and a rod of ' + st.rod + ' mm.';
      B.save({ r: st.r, rod: st.rod, turns: st.turns });
    } else if (spec.mode === 'cam') {
      var c = CAMS.indexOf(st.cam) + 1;
      if (!spec.hide) { facts.push(CAMNAME[st.cam] + ' cam'); facts.push('lift ' + st.lift + ' mm'); facts.push(st.cam === 'pear' ? 'rests for half a turn' : st.cam === 'snail' ? 'slow rise, sudden drop' : st.cam === 'heart' ? 'steady rise, steady fall' : 'smooth rise and fall'); }
      else facts.push(CAMNAME[st.cam] + ' cam · turns: ' + st.turns);
      vars = { c: c, lift_mm: st.lift, dwell: st.cam === 'pear' ? 180 : 0, drop: st.cam === 'snail' ? 1 : 0, turns: st.turns, t: st.turns > 0 ? 1 : 0 };
      say = 'A ' + st.cam + ' cam with a lift of ' + st.lift + ' mm.';
      B.save({ cam: st.cam, lift: st.lift, turns: st.turns });
    } else {
      var I = linkInfo(), L = [st.a, st.b, st.c, st.d].slice().sort(function (p, q) { return p - q; });
      if (!spec.hide) {
        facts.push('Shortest + longest = ' + L[0] + ' + ' + L[3] + ' = ' + (L[0] + L[3]) + ', the other two = ' + (L[1] + L[2]));
        facts.push(I.full ? 'the crank turns all the way; the rocker swings ' + I.swing + '°' : 'the crank cannot turn all the way');
        if (spec.swing !== null) facts.push((I.full && I.swing >= spec.swing ? '✓' : '✗') + ' swing ≥ ' + spec.swing + '°');
      } else facts.push('Turns: ' + st.turns);
      vars = { a_mm: st.a, b_mm: st.b, c_mm: st.c, d_mm: st.d, g: I.g, full: I.full, swing: I.swing, jam: st.jam, turns: st.turns, t: st.turns > 0 ? 1 : 0, p: I.full && spec.swing !== null && I.swing >= spec.swing ? 1 : 0 };
      say = 'Crank ' + st.a + ', coupler ' + st.b + ', rocker ' + st.c + ', ground ' + st.d + ' mm.';
      B.save({ a: st.a, b: st.b, c: st.c, d: st.d, turns: st.turns });
    }
    pp.facts.textContent = facts.join(' · ');
    pp.note.textContent = note || base;
    B.say(say);
    B.post({ scope: { vars: vars, points: {} } }, say + (note ? ' ' + note : ''));
  }

  B.widget('motion', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A mechanism that changes one motion into another'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = { angle: 0, trace: [], turns: 0, jam: 0 };
      if (spec.mode === 'crank') { st.r = spec.r0; st.rod = spec.rod0; if (sv && spec.choose && sv.rod > sv.r && sv.r >= 5) { st.r = sv.r; st.rod = sv.rod; } }
      else if (spec.mode === 'cam') { st.cam = spec.cam0; st.lift = spec.lift0; if (sv && spec.choose && CAMS.indexOf(sv.cam) >= 0) { st.cam = sv.cam; st.lift = sv.lift || st.lift; } }
      else { st.a = spec.a0; st.b = spec.b0; st.c = spec.c0; st.d = spec.d0; if (sv && spec.choose && sv.a > 0) { st.a = sv.a; st.b = sv.b; st.c = sv.c; st.d = sv.d; } }
      if (sv) st.turns = sv.turns || 0;
      paintPanel(); draw(); report();
    },
  });
})(WPB);
