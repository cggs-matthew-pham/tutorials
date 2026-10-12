// Forces and motion: a free body diagram (force arrows on an object and the net force) and, with motion: on, the
// object running along a track, leaving a dot every half second, with a speed-time graph. Not science-only: any
// lesson can use it.
//   widget: forces
//   object: Box                 the object's label (default "Object")
//   mass: 2                     kg; "mass: 1, 10, 2" is a slider (min, max, start)
//   g: 9.8                      gravitational field strength in N/kg (default 9.8)
//   place: Earth, Moon, Mars    buttons that set g (Earth 9.8, Moon 1.6, Mars 3.7, Jupiter 24.8); the first is the start
//   force W: down, weight       a force: a capital letter, a direction (left, right, up, down) and a size in N, or
//                               "weight" (m × g) or "support" (the ground pushing up just enough to balance the
//                               forces pushing down). Optional parts, in any order: a label (Weight), and
//                               "adjust 0-20" (a slider; "adjust 0-20 by 0.5" for its step).
//   friction: 4                 the most friction the surface can give, in N: friction matches a push up to this, and
//                               stays at it while the object slides. "friction: 4, toggle" adds an on/off button.
//                               Friction is drawn as force F (so no other force may be called F).
//   motion: on                  Play: the object moves along a track (the horizontal net force only)
//   speed: 3                    starting speed in m/s (+ is to the right)
//   track: 40                   track length in m (default 40);   time: 10   seconds before it stops (default 10)
// state: { balanced (both directions), scope: { vars } } with vars: each force's size by its letter (and F, friction),
//   f net horizontal force (+ right), a acceleration, v speed (+ right), t time, d distance from the start,
//   m mass, g, w weight. Checks: "f = 0", "P = 8 and f = 0", "t >= 3 and v > 0 and a = 0".
(function (B) {
  'use strict';
  var PLACES = { earth: 9.8, moon: 1.6, mars: 3.7, jupiter: 24.8 };
  var DIRS = { right: [1, 0], left: [-1, 0], up: [0, 1], down: [0, -1] };
  var spec = null, val = {}, sim = null, objs = null, panel = null, raf = 0;
  var fmt = B.fmt, round2 = function (v) { return Math.round(v * 100) / 100; };
  var num = function (t, where) { var v = Number(String(t).trim()); if (!isFinite(v)) throw new Error(where + ': "' + t + '" is not a number.'); return v; };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };

  function parse(s) {
    s.forces = []; s.label = s.object || 'Object';
    var mass = String(s.mass || '1').split(',').map(function (t) { return t.trim(); });
    if (mass.length === 1) s.massSl = null, s.mass0 = num(mass[0], 'mass');
    else if (mass.length === 3) { s.massSl = mass.map(function (t) { return num(t, 'mass'); }); s.mass0 = s.massSl[2]; }
    else throw new Error('mass: a number (2), or a slider (min, max, start: 1, 10, 2).');
    if (!(s.mass0 > 0)) throw new Error('mass must be more than 0.');
    s.places = s.place ? s.place.split(',').map(function (t) { var k = t.trim().toLowerCase(); if (!PLACES[k]) throw new Error('place: "' + t.trim() + '" is not one of Earth, Moon, Mars, Jupiter.'); return k; }) : null;
    s.g0 = s.places ? PLACES[s.places[0]] : (s.g !== undefined ? num(s.g, 'g') : 9.8);
    var fr = s.friction ? s.friction.split(',').map(function (t) { return t.trim(); }) : null;
    s.fric = fr && !/^off$/i.test(fr[0]) ? num(fr[0], 'friction') : 0;
    s.fricToggle = !!(fr && fr.slice(1).some(function (t) { return /^toggle$/i.test(t); }));
    s.motion = /^on$/i.test(s.motion || '');
    s.speed0 = s.speed !== undefined ? num(s.speed, 'speed') : 0;
    s.trackLen = s.track !== undefined ? num(s.track, 'track') : 40;
    s.tmax = s.time !== undefined ? num(s.time, 'time') : 10;
    s.items.forEach(function (it) {
      if (it.kind !== 'force') return;
      var where = 'Line ' + it.line + ' (force ' + (it.name || '') + ')';
      if (!/^[A-Z]$/.test(it.name || '')) throw new Error(where + ': a force needs a one-letter capital name, such as "force P: right, 10, Push".');
      if (it.name === 'F') throw new Error(where + ': F is friction; give this force another letter.');
      if (s.forces.some(function (f) { return f.name === it.name; })) throw new Error(where + ': there is already a force ' + it.name + '.');
      var parts = it.value.split(',').map(function (t) { return t.trim(); });
      var dir = DIRS[(parts[0] || '').toLowerCase()];
      if (!dir) throw new Error(where + ': start with a direction (left, right, up or down).');
      var f = { name: it.name, dir: dir, label: '', adjust: null };
      var size = (parts[1] || '').toLowerCase();
      if (size === 'weight' || size === 'support') { f.kind = size; if (size === 'weight' && dir[1] !== -1) throw new Error(where + ': weight acts downwards.'); if (size === 'support' && dir[1] !== 1) throw new Error(where + ': support acts upwards.'); }
      else f.size0 = num(parts[1], where);
      parts.slice(2).forEach(function (p) {
        var m = /^adjust\s+(-?[\d.]+)\s*-\s*(-?[\d.]+)(?:\s+by\s+([\d.]+))?$/i.exec(p);
        if (m) { if (f.kind) throw new Error(where + ': a ' + f.kind + ' force is worked out, not adjusted.'); f.adjust = [Number(m[1]), Number(m[2]), Number(m[3] || 1)]; if (!(f.adjust[0] < f.adjust[1])) throw new Error(where + ': adjust needs the smaller number first.'); }
        else f.label = p;
      });
      if (!f.label) f.label = f.kind ? cap(f.kind) : 'Force ' + f.name;
      if (f.adjust && (f.size0 < f.adjust[0] || f.size0 > f.adjust[1])) throw new Error(where + ': the size must be inside the adjust range.');
      s.forces.push(f);
    });
    if (!s.forces.length && !s.fric) throw new Error('Add at least one force, such as "force P: right, 10, Push".');
    // One arrow scale for the whole lesson: the biggest any force can get, so arrows grow and shrink visibly.
    var gmax = s.places ? Math.max.apply(null, s.places.map(function (k) { return PLACES[k]; })) : s.g0, mmax = s.massSl ? s.massSl[1] : s.mass0;
    s.fmax = Math.max(1, s.fric, mmax * gmax * (s.forces.some(function (f) { return f.kind; }) ? 1 : 0));
    s.forces.forEach(function (f) { s.fmax = Math.max(s.fmax, f.adjust ? Math.abs(f.adjust[1]) : Math.abs(f.size0 || 0)); });
  }

  // ---------- the physics ----------
  function weight() { return val.m * val.g; }
  function sizes() {
    var out = {}, down = 0, up = 0;
    spec.forces.forEach(function (f) { if (f.kind === 'weight') out[f.name] = weight(); else if (!f.kind) out[f.name] = val.f[f.name]; });
    spec.forces.forEach(function (f) { if (f.kind || f.dir[1] === 0) return; if (f.dir[1] < 0) down += out[f.name]; else up += out[f.name]; });
    spec.forces.forEach(function (f) { if (f.kind === 'weight') down += out[f.name]; });
    spec.forces.forEach(function (f) { if (f.kind === 'support') out[f.name] = Math.max(0, down - up); });
    return out;
  }
  // Horizontal forces and friction at speed v: static friction matches the push up to its limit; sliding friction opposes motion.
  function horizontal(v) {
    var sz = sizes(), push = 0, vert = 0;
    spec.forces.forEach(function (f) { push += f.dir[0] * sz[f.name]; vert += f.dir[1] * sz[f.name]; });
    var max = val.fricOn ? spec.fric : 0, fr;
    if (Math.abs(v) < 1e-9) fr = Math.abs(push) <= max ? -push : -Math.sign(push) * max;
    else fr = -Math.sign(v) * max;
    return { sizes: sz, push: push, friction: fr, net: push + fr, vert: vert };
  }

  // ---------- drawing ----------
  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#e4e1da', accent = B.css('--accent') || '#c2570a', left = B.css('--left') || '#2f6fb3', right = B.css('--right') || '#8a4fb8';
    var mot = spec.motion, board = B.jsx({ boundingbox: box() });
    var ground = mot ? 6.6 : 4.2, w = mot ? 1.8 : 2.4, h = mot ? 1.2 : 2;
    var X = function () { return mot ? 1.2 + (sim.d / spec.trackLen) * 17.6 : 10; };
    var cy = function () { return ground + h / 2; };
    var o = { board: board, trace: [], ground: ground, ink: ink, muted: muted };
    objs = o;   // set now: the drawing functions below read it
    // Ground (or the track) and the object.
    board.create('segment', [[mot ? 0.6 : 5, ground], [mot ? 19.4 : 15, ground]], { strokeColor: muted, strokeWidth: 3, highlight: false, fixed: true });
    if (mot) for (var k = 0; k <= 4; k++) { var tx = 1.2 + k * 4.4; board.create('segment', [[tx, ground], [tx, ground - 0.25]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false }); board.create('text', [tx, ground - 0.55, fmt(spec.trackLen * k / 4) + ' m'], { anchorX: 'middle', fontSize: 11, strokeColor: muted, fixed: true, highlight: false, display: 'internal' }); }
    var corners = function (sx, sy) { return function () { return X() + sx * w / 2; }; };
    board.create('polygon', [[corners(-1), ground], [corners(1), ground], [corners(1), ground + h], [corners(-1), ground + h]], { fillColor: line, fillOpacity: 1, borders: { strokeColor: ink, strokeWidth: 2, highlight: false }, vertices: { visible: false }, fixed: true, highlight: false });
    // The name above the box (it is small on the track, and arrows start at its centre in the diagram).
    if (mot) board.create('text', [function () { return X(); }, ground + h + 0.35, spec.label], { anchorX: 'middle', anchorY: 'bottom', fontSize: 12, strokeColor: ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:600' });
    else board.create('text', [10 - w / 2, ground + h + 0.35, spec.label], { anchorX: 'right', anchorY: 'bottom', fontSize: 15, strokeColor: ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:600' });
    // Arrows: from the object's centre, length in proportion to size. Arrows that share a direction sit side by side.
    var maxLen = mot ? 2.6 : 3.6, k2 = maxLen / spec.fmax;
    var list = spec.forces.map(function (f) { return { name: f.name, label: f.label, dir: f.dir }; });
    if (spec.fric) list.push({ name: 'F', label: 'Friction', dir: null });
    var byDir = {};
    o.arrows = list.map(function (f, i) {
      var colour = [accent, left, right, ink, muted][i % 5];
      var dir = function () { if (f.dir) return f.dir; var fr = sim.hz.friction; return [fr < 0 ? -1 : 1, 0]; };
      var size = function () { return f.name === 'F' ? Math.abs(sim.hz.friction) : sim.hz.sizes[f.name]; };
      var key = f.dir ? f.dir.join() : 'fric';
      byDir[key] = (byDir[key] || 0) + 1;
      var slot = byDir[key] - 1, off = function () { var d = dir(); var n = slot ? (slot % 2 ? 1 : -1) * Math.ceil(slot / 2) * 0.32 : 0; return d[0] ? [0, n] : [n, 0]; };
      // Start at the edge of the object so arrows read clearly; friction acts along the ground.
      // Free body diagram: arrows from the centre. On the track: from the box's edges (it is small). Friction acts along the ground.
      var start = function () { var d = dir(), of = off(); if (f.name === 'F') return [X(), ground + 0.18]; return mot ? [X() + d[0] * w / 2 + of[0], cy() + d[1] * h / 2 + of[1]] : [X() + of[0], cy() + of[1]]; };
      var end = function () { var s = start(), d = dir(), L = size() * k2; return [s[0] + d[0] * L, s[1] + d[1] * L]; };
      var a = board.create('arrow', [[function () { return start()[0]; }, function () { return start()[1]; }], [function () { return end()[0]; }, function () { return end()[1]; }]],
        { strokeColor: colour, strokeWidth: mot ? 3 : 4, lastArrow: { type: 2, size: 4 }, fixed: true, highlight: false });
      // Labels: past the tip for up and down; above the arrow for left and right (friction: under the ground).
      // Labels beside the tip of an up or down arrow; above a left or right arrow (friction: under the ground).
      // Labels just past the tip (beside it for up and down); friction's under the ground, as its direction changes.
      var lx = function () { var e = end(), d = dir(); return d[0] ? e[0] + d[0] * 0.25 : e[0] + 0.3; };
      var ly = function () { var e = end(), d = dir(); return d[0] ? e[1] : e[1] - d[1] * 0.25; };
      var text = function (side) { return function () { var z = round2(size()); if (!z || (side && dir()[0] !== side)) return ''; return f.label + ' ' + fmt(z) + ' N'; }; };
      var style = { anchorY: 'middle', fontSize: mot ? 11 : 13, strokeColor: colour, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:600' };
      // Friction can point either way, so it has a label for each side (only one shows).
      var lab = f.dir ? board.create('text', [lx, ly, text(0)], Object.assign({ anchorX: f.dir[0] > 0 ? 'left' : f.dir[0] < 0 ? 'right' : 'left' }, style))
        : [board.create('text', [lx, ly, text(1)], Object.assign({ anchorX: 'left' }, style)), board.create('text', [lx, ly, text(-1)], Object.assign({ anchorX: 'right' }, style))];
      return { arrow: a, label: lab, size: size, shown: true };
    });
    // The net force (horizontal), dashed, under the object in the diagram.
    if (!mot) {
      var ny = 0.5;
      o.net = board.create('arrow', [[10, ny], [function () { return 10 + sim.hz.net * k2; }, ny]], { strokeColor: ink, strokeWidth: 3, dash: 2, lastArrow: { type: 2, size: 4 }, fixed: true, highlight: false });
      o.netZero = round2(sim.hz.net) === 0;
      board.create('text', [0.4, ny, function () { var n = round2(sim.hz.net); return 'Net force: ' + (n ? fmt(Math.abs(n)) + ' N to the ' + (n > 0 ? 'right' : 'left') : '0 N'); }], { anchorX: 'left', anchorY: 'middle', fontSize: 13, strokeColor: ink, fixed: true, highlight: false, display: 'internal', cssStyle: 'font-weight:600' });
    }
    // Speed-time graph under the track.
    if (mot) {
      var gx0 = 2.2, gx1 = 19.2, gy0 = 0.7, gy1 = 4.6;
      o.g = { x0: gx0, x1: gx1, y0: gy0, y1: gy1 };
      board.create('segment', [[gx0, gy0], [gx0, gy1]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false });
      o.zero = board.create('segment', [[gx0, function () { return vy(0); }], [gx1, function () { return vy(0); }]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false });
      board.create('text', [gx0 - 0.1, gy1 + 0.4, 'speed (m/s)'], { anchorX: 'left', fontSize: 11, strokeColor: muted, fixed: true, highlight: false, display: 'internal' });
      board.create('text', [(gx0 + gx1) / 2, gy0 - 0.35, 'time (s)'], { anchorX: 'middle', fontSize: 11, strokeColor: muted, fixed: true, highlight: false, display: 'internal' });
      board.create('text', [gx0 - 0.15, gy1, function () { return fmt(sim.vmax); }], { anchorX: 'right', anchorY: 'middle', fontSize: 11, strokeColor: muted, fixed: true, highlight: false, display: 'internal' });
      board.create('text', [gx0 - 0.15, function () { return vy(0); }, '0'], { anchorX: 'right', anchorY: 'middle', fontSize: 11, strokeColor: muted, fixed: true, highlight: false, display: 'internal' });
      board.create('text', [gx1, gy0 - 0.35, function () { return fmt(spec.tmax); }], { anchorX: 'middle', fontSize: 11, strokeColor: muted, fixed: true, highlight: false, display: 'internal' });
      var curve = board.create('curve', [[], []], { strokeColor: accent, strokeWidth: 3, fixed: true, highlight: false });
      curve.updateDataArray = function () { this.dataX = sim.pts.map(function (p) { return gx0 + (p[0] / spec.tmax) * (gx1 - gx0); }); this.dataY = sim.pts.map(function (p) { return vy(p[1]); }); };
    }
    o.X = X;
    syncVis();
    // Trace dots already dropped (after a redraw).
    sim.dots.forEach(function (d) { dot(d); });
    board.update();
  }
  // Zero-size arrows are hidden (an arrowhead with no shaft would point somewhere).
  function syncVis() {
    if (!objs) return;
    objs.arrows.forEach(function (r) { var on = round2(r.size()) !== 0; if (on !== r.shown) { r.shown = on; r.arrow.setAttribute({ visible: on }); } });
    if (objs.net) { var z = round2(sim.hz.net) === 0; if (z !== objs.netZero) { objs.netZero = z; objs.net.setAttribute({ visible: !z }); } }
  }
  function box() { return spec.motion ? [0, 11.2, 20, -0.2] : [0, 10, 20, 0]; }
  // Speed on the graph: 0 at the bottom when the object has only moved right; in the middle once it has gone left.
  function vy(v) { var g = objs.g, lo = sim.vmin < -1e-9 ? -sim.vmax : 0; return g.y0 + (v - lo) / (sim.vmax - lo) * (g.y1 - g.y0); }
  function dot(d) { objs.trace.push(objs.board.create('point', [1.2 + (d / spec.trackLen) * 17.6, objs.ground - 1.05], { name: '', size: 3, fillColor: objs.ink, strokeColor: objs.ink, fixed: true, highlight: false, showInfobox: false, withLabel: false })); }

  // ---------- the panel ----------
  function paintPanel() {
    panel = B.el('gpanel'); panel.replaceChildren();
    var slider = function (name, label, min, max, step, get, set) {
      var row = document.createElement('div'); row.className = 'srow';
      var lab = document.createElement('label'); lab.className = 'fname'; lab.textContent = label; lab.htmlFor = 'fs-' + name;
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', label + ': less');
      var r = document.createElement('input'); r.type = 'range'; r.id = 'fs-' + name; r.min = min; r.max = max; r.step = step; r.value = get();
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', label + ': more');
      var out = document.createElement('output'); out.htmlFor = r.id;
      var put = function (v) { v = Math.max(min, Math.min(max, Math.round(v / step) * step)); v = round2(v); set(v); r.value = v; changed(); };
      r.addEventListener('input', function () { put(Number(r.value)); });
      minus.addEventListener('click', function () { put(get() - step); });
      plus.addEventListener('click', function () { put(get() + step); });
      row.append(lab, minus, r, plus, out); panel.appendChild(row);
      return { show: function (text) { out.textContent = text; } };
    };
    var outs = [];
    spec.forces.forEach(function (f) {
      if (!f.adjust) return;
      var s = slider(f.name, f.label, f.adjust[0], f.adjust[1], f.adjust[2], function () { return val.f[f.name]; }, function (v) { val.f[f.name] = v; });
      outs.push(function () { s.show(fmt(val.f[f.name]) + ' N'); });
    });
    if (spec.massSl) {
      var ms = slider('m', 'Mass', spec.massSl[0], spec.massSl[1], 1, function () { return val.m; }, function (v) { val.m = v; });
      outs.push(function () { ms.show(fmt(val.m) + ' kg'); });
    }
    var bar = document.createElement('div'); bar.className = 'fbar';
    var btn = function (text, on, cls) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; if (cls) b.className = cls; b.addEventListener('click', on); bar.appendChild(b); return b; };
    if (spec.places) spec.places.forEach(function (k) {
      var b = btn(cap(k), function () { val.place = k; val.g = PLACES[k]; changed(); }, 'place');
      outs.push(function () { b.setAttribute('aria-pressed', String(val.place === k)); });
    });
    if (spec.fricToggle) {
      var fb = btn('', function () { val.fricOn = !val.fricOn; changed(); });
      outs.push(function () { fb.textContent = 'Friction: ' + (val.fricOn ? 'on' : 'off'); fb.setAttribute('aria-pressed', String(val.fricOn)); });
    }
    if (spec.motion) {
      var play = btn('Play', function () { if (sim.over) resetRun(); sim.running = !sim.running; B.moved = true; tick0(); report(); }, 'go');
      btn('Reset', function () { resetRun(); B.moved = true; report(); });
      outs.push(function () { play.textContent = sim.running ? 'Pause' : sim.over ? 'Play again' : 'Play'; });
    }
    btn('Start again', B.restart, 'quiet');
    panel.appendChild(bar);
    var sum = document.createElement('p'); sum.className = 'fsum'; panel.appendChild(sum);
    outs.push(function () {
      var hz = sim.hz, n = round2(hz.net), parts = [];
      parts.push(n ? 'Net force: ' + fmt(Math.abs(n)) + ' N to the ' + (n > 0 ? 'right' : 'left') : 'Net force: 0 N, balanced' + (Math.abs(round2(hz.vert)) > 0 ? ' left and right' : ''));
      if (spec.forces.some(function (f) { return f.kind === 'weight'; })) parts.push('mass ' + fmt(val.m) + ' kg × g ' + fmt(val.g) + ' N/kg = weight ' + fmt(round2(weight())) + ' N');
      if (spec.motion) parts.push('t = ' + sim.t.toFixed(1) + ' s · speed ' + fmt(round2(sim.v)) + ' m/s · acceleration ' + fmt(round2(sim.a)) + ' m/s²');
      sum.textContent = parts.join(' · ');
    });
    panel.paint = function () { outs.forEach(function (f) { f(); }); };
  }

  // ---------- running ----------
  function resetRun() {
    sim.running = false; sim.over = false; sim.t = 0; sim.v = spec.speed0; sim.d = spec.speed0 < 0 ? spec.trackLen * 0.85 : spec.trackLen * 0.04; sim.d0 = sim.d;
    sim.pts = [[0, sim.v]]; sim.next = 0.5; sim.vmax = Math.max(2, Math.abs(spec.speed0) * 1.2); sim.vmin = Math.min(0, spec.speed0);
    sim.dots = [];
    if (objs) { objs.trace.forEach(function (p) { objs.board.removeObject(p); }); objs.trace = []; }
    sim.hz = horizontal(sim.v); sim.a = sim.hz.net / val.m;
    if (objs) { syncVis(); objs.board.update(); }
  }
  function step(dt) {
    sim.hz = horizontal(sim.v);
    var a = sim.hz.net / val.m, v = sim.v + a * dt;
    // Sliding friction stops the object; it does not push it back the other way.
    if (val.fricOn && spec.fric && sim.v !== 0 && Math.sign(v) !== Math.sign(sim.v)) v = 0;
    sim.d += (sim.v + v) / 2 * dt; sim.v = Math.abs(v) < 1e-9 ? 0 : v; sim.t += dt;
    sim.hz = horizontal(sim.v); sim.a = sim.hz.net / val.m;
    sim.pts.push([sim.t, sim.v]);
    if (Math.abs(sim.v) > sim.vmax) sim.vmax = Math.ceil(Math.abs(sim.v) * 1.25);
    if (sim.v < sim.vmin) sim.vmin = sim.v;
    if (sim.t >= sim.next - 1e-9) { sim.next += 0.5; sim.dots.push(sim.d); dot(sim.d); }
    if (sim.d < 0 || sim.d > spec.trackLen) { sim.d = Math.max(0, Math.min(spec.trackLen, sim.d)); end('It reached the end of the track.'); }
    else if (sim.t >= spec.tmax - 1e-9) end('Time is up: ' + fmt(spec.tmax) + ' seconds.');
  }
  function end(msg) { sim.running = false; sim.over = true; sim.endMsg = msg; }
  var last = 0, frames = 0;
  function tick0() { last = performance.now(); }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!sim || !sim.running) return;
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    for (var i = 0; i < 4; i++) step(dt / 4);
    syncVis(); objs.board.update();
    if (++frames % 6 === 0 || !sim.running) report();
  }

  function changed() {
    B.moved = true;
    sim.hz = horizontal(sim.v); sim.a = sim.hz.net / val.m;
    syncVis(); objs.board.update(); report();
  }
  function describe() {
    var hz = sim.hz, n = round2(hz.net);
    var sideways = spec.fric || spec.forces.some(function (f) { return f.dir[0]; });
    if (!spec.motion) return n ? 'The forces are unbalanced: the net force is ' + fmt(Math.abs(n)) + ' N to the ' + (n > 0 ? 'right' : 'left') + '.' : 'The forces are balanced: the net force is 0 N' + (sideways ? '' : ' (up and down cancel out)') + '.';
    if (sim.over) return sim.endMsg + ' Press Play again, or change a force first.';
    if (!sim.running && sim.t === 0) return 'Set the forces, then press Play.';
    var v = round2(sim.v), a = round2(sim.a), what = !v && !a ? 'At rest' : !a ? 'Moving at a steady speed' : (v === 0 || Math.sign(v) === Math.sign(a)) ? 'Speeding up' : 'Slowing down';
    return what + (n ? ': the net force is ' + fmt(Math.abs(n)) + ' N to the ' + (n > 0 ? 'right' : 'left') + '.' : ': the forces are balanced.');
  }
  function scope() {
    var vars = { f: round2(sim.hz.net), a: round2(sim.a), v: round2(sim.v), t: round2(sim.t), d: round2(Math.abs(sim.d - sim.d0)), m: val.m, g: val.g, w: round2(weight()) };
    Object.keys(sim.hz.sizes).forEach(function (k) { vars[k] = round2(sim.hz.sizes[k]); });
    if (spec.fric) vars.F = round2(Math.abs(sim.hz.friction));
    return { vars: vars, points: {} };
  }
  function report() {
    if (panel && panel.paint) panel.paint();
    B.say(describe());
    var sc = scope(), balanced = Math.abs(sc.vars.f) < 1e-9 && Math.abs(round2(sim.hz.vert)) < 1e-9;
    B.save({ f: val.f, m: val.m, g: val.g, place: val.place, fricOn: val.fricOn });
    B.post({ balanced: balanced, scope: sc }, Object.keys(sc.vars).map(function (k) { return k + ' = ' + fmt(sc.vars[k]); }).join('; '));
  }

  B.widget('forces', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'Forces on ' + s.label + (s.motion ? ', with its motion and a speed-time graph' : ''); },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var s = fresh ? null : B.saved();
      val = { f: {}, m: s && s.m !== undefined ? s.m : spec.mass0, g: s && s.g !== undefined ? s.g : spec.g0, place: s && s.place ? s.place : (spec.places ? spec.places[0] : null), fricOn: s && s.fricOn !== undefined ? s.fricOn : true };
      spec.forces.forEach(function (f) { if (!f.kind) val.f[f.name] = s && s.f && s.f[f.name] !== undefined ? s.f[f.name] : f.size0; });
      sim = {}; objs = null; resetRun();
      paintPanel(); build(); report();
      if (!raf) raf = requestAnimationFrame(loop);
    },
    redraw: function () { build(); report(); },
    resize: function () { var b = B.jsxBoard; b.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); b.setBoundingBox(box(), false); b.update(); },
  });
})(WPB);
