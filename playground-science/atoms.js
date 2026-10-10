// Atoms and molecules for the science board: rigid molecules built from element atoms, moving as a gas,
// colliding elastically and reacting when a collision carries enough energy. Drawn with JSXGraph.
// Plain script, no build step: it adds window.SCI.atoms. Needs engine.js first (board, loop, onPaint, T).
//
// Units. Temperature is kept as t (1 = 300 K). The average kinetic energy of a molecule equals t, and the energy
// of a collision (along the line between centres) is measured in the same units, so `ea: 3` means a collision
// needs about three times the average energy. Heavier molecules move more slowly at the same temperature.
(function () {
  'use strict';
  var S = window.SCI;
  // Element: radius (board units), colour (light, dark), mass, name. Colours follow the usual model-kit colours.
  var EL = {
    H: [0.3, '#ffffff', '#f2f4f5', 1, 'hydrogen'], He: [0.32, '#7fd8e3', '#7fd8e3', 4, 'helium'],
    C: [0.42, '#3a3f44', '#6b747c', 12, 'carbon'], N: [0.4, '#2f6fd6', '#5b93f0', 14, 'nitrogen'], O: [0.4, '#e0412f', '#f0695a', 16, 'oxygen'],
    Ne: [0.36, '#f08ac0', '#f08ac0', 20, 'neon'], Na: [0.5, '#8e5bd0', '#a988e6', 23, 'sodium'], Mg: [0.48, '#8fa0a8', '#a9b7be', 24, 'magnesium'],
    S: [0.48, '#e6c229', '#efd35a', 32, 'sulfur'], Cl: [0.48, '#2fae4f', '#4fcf6f', 35, 'chlorine'], Ar: [0.42, '#b38be0', '#c4a3ea', 40, 'argon'],
    K: [0.55, '#a35bd6', '#b98ae6', 39, 'potassium'], Ca: [0.5, '#3f9e8f', '#5fbfb0', 40, 'calcium'], Fe: [0.48, '#b0602e', '#d08050', 56, 'iron'],
    Cu: [0.48, '#c7783a', '#e09a60', 64, 'copper'], Zn: [0.48, '#7d8fa6', '#9fb0c4', 65, 'zinc'],
  };
  var NAMES = {
    H2: 'hydrogen', O2: 'oxygen', N2: 'nitrogen', Cl2: 'chlorine', O3: 'ozone', H2O: 'water', CO2: 'carbon dioxide', CO: 'carbon monoxide',
    CH4: 'methane', NH3: 'ammonia', HCl: 'hydrogen chloride', NaCl: 'sodium chloride', NO: 'nitrogen monoxide', NO2: 'nitrogen dioxide',
    SO2: 'sulfur dioxide', MgO: 'magnesium oxide', H2O2: 'hydrogen peroxide', N2O4: 'dinitrogen tetroxide', H2S: 'hydrogen sulfide', CuO: 'copper oxide', ZnO: 'zinc oxide',
  };
  var dark = function () { return matchMedia('(prefers-color-scheme: dark)').matches; };

  // "H2O" -> ['H', 'H', 'O']. Unknown symbols throw, so a typo in a setup is reported, not drawn grey.
  function atomsOf(f) {
    var out = [], re = /([A-Z][a-z]?)(\d*)/g, m, used = '';
    while ((m = re.exec(f))) { if (!EL[m[1]]) throw new Error('Unknown element "' + m[1] + '" in ' + f + '.'); for (var i = 0; i < (Number(m[2]) || 1); i++) out.push(m[1]); used += m[0]; }
    if (!out.length || used !== f) throw new Error('Cannot read the formula "' + f + '".');
    return out;
  }
  function nameOf(f) { if (NAMES[f]) return NAMES[f]; var a = atomsOf(f); return a.length === 1 ? EL[a[0]][4] : f; }
  function elementsIn(f) { return atomsOf(f).filter(function (e, i, a) { return a.indexOf(e) === i; }); }
  // A tally such as { H: 2, O: 1 }.
  function tally(f) { var t = {}; atomsOf(f).forEach(function (e) { t[e] = (t[e] || 0) + 1; }); return t; }
  // "2 hydrogen atoms and 1 oxygen atom"
  function describe(f) {
    var t = tally(f), parts = Object.keys(t).map(function (e) { return t[e] + ' ' + EL[e][4] + ' atom' + (t[e] > 1 ? 's' : ''); });
    return parts.length > 1 ? parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] : parts[0];
  }

  // Positions of a molecule's atoms around its centre. Space-filling: bonded atoms overlap a little.
  var SHAPES = {};
  function shape(f) {
    if (SHAPES[f]) return SHAPES[f];
    var a = atomsOf(f), r = function (e) { return EL[e][0]; }, out;
    var bond = function (p, q) { return (r(p) + r(q)) * 0.82; };
    if (a.length === 1) out = [[a[0], 0, 0]];
    else if (a.length === 2) { var d = bond(a[0], a[1]); out = [[a[0], -d / 2, 0], [a[1], d / 2, 0]]; }
    else {
      var t = tally(f), centre = Object.keys(t).filter(function (e) { return t[e] === 1 && e !== 'H'; })[0];
      if (centre) {
        var rest = a.slice(); rest.splice(rest.indexOf(centre), 1);
        var n = rest.length, bent = n === 2 && (centre === 'O' || centre === 'S'), step = bent ? 105 : 360 / n, start = bent ? 90 + 52.5 : (n === 3 ? 90 : 0);
        // The centre goes last, so it is drawn on top of the atoms around it and its label shows.
        out = rest.map(function (e, i) { var ang = (start + i * step) * Math.PI / 180, d = bond(centre, e); return [e, d * Math.cos(ang), d * Math.sin(ang)]; }).concat([[centre, 0, 0]]);
      } else {
        // No single centre (O3, H2O2, N2O4). One element only: a bent chain. Otherwise a backbone of the
        // least-numerous non-hydrogen element (O-O in H2O2, N-N in N2O4) with the other atoms around its ends.
        var kinds = Object.keys(t);
        if (kinds.length === 1) {
          out = a.map(function (e, i) { var d = bond(e, e); return [e, i * d * Math.cos(Math.PI / 6), (i % 2) * d * Math.sin(Math.PI / 6)]; });
        } else {
          var bb = kinds.filter(function (e) { return e !== 'H'; }).sort(function (p, q) { return t[p] - t[q] || EL[q][3] - EL[p][3]; })[0];
          var nb = t[bb], db = bond(bb, bb), others = a.filter(function (e) { return e !== bb; });
          var spine = []; for (var k = 0; k < nb; k++) spine.push([bb, (k - (nb - 1) / 2) * db, 0]);
          // Hand the other atoms out to the ends first, alternating, then to the middle.
          var order = []; for (var k2 = 0; k2 < nb; k2++) order.push(k2 % 2 ? nb - 1 - (k2 - 1) / 2 : k2 / 2);
          var slots = spine.map(function () { return []; });
          others.forEach(function (e, n) { slots[order[n % nb]].push(e); });
          out = [];
          slots.forEach(function (list, k) {
            var end = nb === 1 ? 0 : (k === 0 ? 180 : (k === nb - 1 ? 0 : 90)), spread = list.length === 1 ? 0 : 120 / Math.max(1, list.length - 1);
            list.forEach(function (e, n) {
              // One atom on each end of a two-atom spine: opposite sides, as in H-O-O-H.
              var ang = list.length === 1 ? (nb === 2 ? (k === 0 ? 120 : -60) : end + (k % 2 ? -60 : 60)) : end - 60 + n * spread;
              var d = bond(bb, e), rad = ang * Math.PI / 180; out.push([e, spine[k][1] + d * Math.cos(rad), d * Math.sin(rad)]);
            });
          });
          out = out.concat(spine);
        }
      }
      var cx = 0, cy = 0; out.forEach(function (p) { cx += p[1]; cy += p[2]; }); cx /= out.length; cy /= out.length;
      out = out.map(function (p) { return [p[0], p[1] - cx, p[2] - cy]; });
    }
    SHAPES[f] = out;
    return out;
  }
  // Mass for motion: each atom's real mass plus 5, which shrinks the speed gap (hydrogen would otherwise cross the
  // box in under a second while chlorine crawls). Per atom, so mass is conserved when atoms rearrange.
  // Heavier particles are still slower at the same temperature.
  function massOf(f) { return atomsOf(f).reduce(function (s, e) { return s + EL[e][3] + 5; }, 0); }
  function radiusOf(f) { return shape(f).reduce(function (m, p) { return Math.max(m, Math.hypot(p[1], p[2]) + EL[p[0]][0]); }, 0); }

  // "H2 + Cl2 -> HCl + HCl" (also "2 HCl"). Atoms must balance, or the rule is refused.
  function parseRule(text, ea, release) {
    var sides = String(text).split(/->|→/);
    if (sides.length !== 2) throw new Error('A reaction needs one arrow: ' + text);
    var side = function (s) { var out = []; s.split('+').forEach(function (p) { var m = /^\s*(\d*)\s*([A-Za-z0-9]+)\s*$/.exec(p); if (!m) throw new Error('Cannot read "' + p.trim() + '".'); for (var i = 0; i < (Number(m[1]) || 1); i++) out.push(m[2]); }); return out; };
    var lhs = side(sides[0]), rhs = side(sides[1]);
    var count = function (list) { var t = {}; list.forEach(function (f) { atomsOf(f).forEach(function (e) { t[e] = (t[e] || 0) + 1; }); }); return JSON.stringify(Object.keys(t).sort().map(function (k) { return [k, t[k]]; })); };
    if (count(lhs) !== count(rhs)) throw new Error('The atoms do not balance: ' + text);
    var show = function (list) { var seen = []; list.forEach(function (f) { if (seen.indexOf(f) < 0) seen.push(f); }); return seen.map(function (f) { var n = list.filter(function (g) { return g === f; }).length; return (n > 1 ? n + ' ' : '') + f; }).join(' + '); };
    return { lhs: lhs, rhs: rhs, ea: ea, release: release, text: show(lhs) + ' → ' + show(rhs) };
  }

  var SPEED = 0.885, VMAX = 1.5; // board units per frame: about 0.14 at t = 1 for a mass of 40 (VMAX: a safety cap)
  function Sim(b) { this.b = b; this.ms = []; this.rules = []; this.t = 1; this.hold = true; this.catalyst = 1; this.frames = 0; this.hits = 0; this.wins = 0; this.onReact = null; this.onAdd = null; this.onRemove = null; }
  Sim.prototype.make = function (f, x, y, vx, vy) {
    var m = { f: f, atoms: shape(f), m: massOf(f), R: radiusOf(f), x: x, y: y, vx: vx || 0, vy: vy || 0, a: Math.random() * 6.283, w: (Math.random() - 0.5) * 0.06 };
    if (vx === undefined) this.kick(m);
    return m;
  };
  // A random velocity for temperature t (2D Maxwell-Boltzmann: a Rayleigh speed).
  Sim.prototype.kick = function (m) { var s = Math.min(VMAX, Math.sqrt(this.t / m.m) * SPEED * Math.sqrt(-2 * Math.log(1 - Math.random() * 0.999))), ang = Math.random() * 6.283; m.vx = Math.cos(ang) * s; m.vy = Math.sin(ang) * s; };
  Sim.prototype.add = function (f, n) {
    var b = this.b, R = radiusOf(f);
    for (var k = 0; k < n; k++) {
      var m = null;
      for (var g = 0; g < 200 && !m; g++) {
        var x = b.x0 + R + Math.random() * (b.x1 - b.x0 - 2 * R), y = b.y0 + R + Math.random() * (b.y1 - b.y0 - 2 * R);
        if (this.ms.every(function (o) { return Math.hypot(o.x - x, o.y - y) > o.R + R + 0.05; })) m = this.make(f, x, y);
      }
      if (!m) m = this.make(f, b.x0 + R + Math.random() * (b.x1 - b.x0 - 2 * R), b.y0 + R + Math.random() * (b.y1 - b.y0 - 2 * R));
      this.ms.push(m); if (this.onAdd) this.onAdd(m);
    }
  };
  Sim.prototype.ke = function (m) { var v2 = (m.vx * m.vx + m.vy * m.vy) / (SPEED * SPEED); return 0.5 * m.m * v2; };
  // Measured temperature: the average kinetic energy (in units of t).
  Sim.prototype.temp = function () { if (!this.ms.length) return this.t; var s = 0, self = this; this.ms.forEach(function (m) { s += self.ke(m); }); return s / this.ms.length; };
  Sim.prototype.setTemp = function (t) { var now = this.temp(), k = now > 1e-6 ? Math.sqrt(t / now) : 1; this.t = t; this.ms.forEach(function (m) { m.vx *= k; m.vy *= k; }); };
  Sim.prototype.count = function (f) { return this.ms.filter(function (m) { return m.f === f; }).length; };
  Sim.prototype.atomTally = function () { var t = {}; this.ms.forEach(function (m) { m.atoms.forEach(function (p) { t[p[0]] = (t[p[0]] || 0) + 1; }); }); return t; };
  Sim.prototype.remove = function (m) { var i = this.ms.indexOf(m); if (i >= 0) { this.ms.splice(i, 1); if (this.onRemove) this.onRemove(m); } };
  // A rule that two colliding particles can start (both are reactants), or that one particle can start alone.
  Sim.prototype.ruleFor = function (a, b) {
    for (var i = 0; i < this.rules.length; i++) {
      var r = this.rules[i];
      if (!b) { if (r.lhs.length === 1 && r.lhs[0] === a.f) return r; continue; }
      if (r.lhs.length < 2) continue;
      var rest = r.lhs.slice(), ia = rest.indexOf(a.f); if (ia < 0) continue; rest.splice(ia, 1);
      if (rest.indexOf(b.f) >= 0) return r;
    }
    return null;
  };
  // Reactants beyond the colliding pair (2 O2 in CH4 + 2 O2): the nearest matching particles within 4 units.
  // A simplification: real reactions like this happen in several steps.
  Sim.prototype.extras = function (rule, a, b) {
    var rest = rule.lhs.slice(), out = [], self = this;
    rest.splice(rest.indexOf(a.f), 1); rest.splice(rest.indexOf(b.f), 1);
    for (var k = 0; k < rest.length; k++) {
      var best = null, bd = 4;
      self.ms.forEach(function (m) { if (m === a || m === b || out.indexOf(m) >= 0 || m.f !== rest[k]) return; var d = Math.hypot(m.x - a.x, m.y - a.y); if (d < bd) { bd = d; best = m; } });
      if (!best) return null;
      out.push(best);
    }
    return out;
  };
  // Replace the reacting particles with the products at their centre of mass, sharing the energy out.
  // spect: a particle that collided but does not change (it leaves with its own formula). wall: the reacting
  // particle hit a wall, which acts as an infinitely heavy partner (its kinetic energy is shared out, not kept).
  Sim.prototype.react = function (rule, olds, energy, spect, wall) {
    var M = 0, px = 0, py = 0, cx = 0, cy = 0, self = this, all = spect ? olds.concat([spect]) : olds;
    all.forEach(function (o) { M += o.m; px += o.m * o.vx; py += o.m * o.vy; cx += o.m * o.x; cy += o.m * o.y; });
    var vcx = wall ? 0 : px / M, vcy = wall ? 0 : py / M; cx /= M; cy /= M;
    var rhs = spect ? rule.rhs.concat([spect.f]) : rule.rhs;
    olds = all;
    // Energy in the centre-of-mass frame, plus what the reaction releases (negative: absorbs).
    var e = 0; olds.forEach(function (o) { var dx = o.vx - vcx, dy = o.vy - vcy; e += 0.5 * o.m * (dx * dx + dy * dy) / (SPEED * SPEED); });
    e = Math.max(0.05, e + rule.release);
    olds.forEach(function (o) { self.remove(o); });
    var news = rhs.map(function (f, i) { var ang = rhs.length > 1 ? i * 6.283 / rhs.length + Math.random() : 0, d = rhs.length > 1 ? radiusOf(f) * 1.05 : 0; return self.make(f, cx + Math.cos(ang) * d, cy + Math.sin(ang) * d, 0, 0); });
    if (news.length > 1) {
      // Random directions with zero total momentum, scaled so their kinetic energy is e.
      var ps = news.map(function () { var a = Math.random() * 6.283; return [Math.cos(a), Math.sin(a)]; });
      var sx = 0, sy = 0; ps.forEach(function (p) { sx += p[0]; sy += p[1]; });
      var Mn = 0; news.forEach(function (n) { Mn += n.m; });
      ps = ps.map(function (p, i) { return [p[0] - sx * news[i].m / Mn, p[1] - sy * news[i].m / Mn]; });
      var k = 0; ps.forEach(function (p, i) { k += (p[0] * p[0] + p[1] * p[1]) / (2 * news[i].m); });
      var s = k > 1e-9 ? Math.sqrt(e / k) : 0;
      news.forEach(function (n, i) { n.vx = vcx + ps[i][0] * s / n.m * SPEED; n.vy = vcy + ps[i][1] * s / n.m * SPEED; });
    } else {
      // One product: in a real gas a third particle carries the energy away; here the product keeps it, so an
      // exothermic synthesis still warms the gas.
      // Exactly e more kinetic energy than the centre of mass carried: solve |vcm + u s|^2 = |vcm|^2 + 2e/m for s.
      var n0 = news[0], a0 = Math.random() * 6.283, ux = Math.cos(a0), uy = Math.sin(a0), bx = (vcx * ux + vcy * uy) / SPEED;
      var s0 = (-bx + Math.sqrt(bx * bx + 2 * e / n0.m)) * SPEED;
      n0.vx = vcx + ux * s0; n0.vy = vcy + uy * s0;
    }
    news.forEach(function (n) { self.keepIn(n); self.ms.push(n); if (self.onAdd) self.onAdd(n); });
    this.wins++;
    if (this.onReact) this.onReact(cx, cy, rule, energy);
  };
  Sim.prototype.keepIn = function (m) {
    var b = this.b, hit = 0;
    if (m.x < b.x0 + m.R) { m.x = b.x0 + m.R; if (m.vx < 0) { hit = Math.abs(m.vx); m.vx = -m.vx; } }
    if (m.x > b.x1 - m.R) { m.x = b.x1 - m.R; if (m.vx > 0) { hit = Math.abs(m.vx); m.vx = -m.vx; } }
    if (m.y < b.y0 + m.R) { m.y = b.y0 + m.R; if (m.vy < 0) { hit = Math.abs(m.vy); m.vy = -m.vy; } }
    if (m.y > b.y1 - m.R) { m.y = b.y1 - m.R; if (m.vy > 0) { hit = Math.abs(m.vy); m.vy = -m.vy; } }
    return hit;
  };
  // One frame, in substeps short enough (0.25 units) that fast particles cannot pass through each other.
  Sim.prototype.step = function () {
    this.frames++;
    var v = 0; this.ms.forEach(function (m) { var s = Math.hypot(m.vx, m.vy); if (s > VMAX) { m.vx *= VMAX / s; m.vy *= VMAX / s; s = VMAX; } v = Math.max(v, s); });
    var n = Math.max(1, Math.ceil(v / 0.25));
    for (var k = 0; k < n; k++) this.sub(1 / n);
    if (this.hold) { var now = this.temp(); if (now > 1e-6 && Math.abs(now - this.t) / this.t > 0.03) this.setTemp(this.t); }
  };
  Sim.prototype.sub = function (h) {
    var ms = this.ms, i, j;
    ms.forEach(function (m) { m.x += m.vx * h; m.y += m.vy * h; m.a += m.w * h; });
    // Walls: a particle that breaks apart on its own (one reactant) can do so when it hits a wall hard enough.
    for (i = ms.length - 1; i >= 0; i--) {
      var m = ms[i], v = this.keepIn(m);
      if (v) { var r1 = this.ruleFor(m, null); if (r1) { var e1 = 0.5 * m.m * (v / SPEED) * (v / SPEED); if (e1 > r1.ea * this.catalyst) this.react(r1, [m], e1, null, true); } }
    }
    // Collisions between particles: elastic, unless the pair can react and the collision has enough energy.
    var done = [];
    for (i = 0; i < ms.length; i++) for (j = i + 1; j < ms.length; j++) {
      var a = ms[i], c = ms[j]; if (done.indexOf(a) >= 0 || done.indexOf(c) >= 0) continue;
      var dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy), md = a.R + c.R;
      if (d >= md || d < 1e-9) continue;
      var nx = dx / d, ny = dy / d, vn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
      // Push apart.
      var o = (md - d) / 2; a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o;
      if (vn >= 0) continue; // already moving apart
      this.hits++;
      var mu = a.m * c.m / (a.m + c.m), e = 0.5 * mu * (vn / SPEED) * (vn / SPEED);
      var rule = this.ruleFor(a, c) || this.ruleFor(a, null) || this.ruleFor(c, null);
      if (rule && e > rule.ea * this.catalyst) {
        // A one-particle rule fired by a collision: the other particle takes part unchanged (it shares the energy).
        var more = rule.lhs.length > 2 ? this.extras(rule, a, c) : [];
        if (!more) { var J0 = 2 * mu * vn; a.vx += J0 / a.m * nx; a.vy += J0 / a.m * ny; c.vx -= J0 / c.m * nx; c.vy -= J0 / c.m * ny; continue; }
        if (rule.lhs.length >= 2) this.react(rule, [a, c].concat(more), e);
        else { var br = this.ruleFor(a, null) === rule ? a : c; this.react(rule, [br], e, br === a ? c : a); }
        done.push(a, c); i = -1; break;
      }
      var J = 2 * mu * vn; a.vx += J / a.m * nx; a.vy += J / a.m * ny; c.vx -= J / c.m * nx; c.vy -= J / c.m * ny;
    }
  };
  Sim.prototype.at = function (x, y) { var best = null, bd = 1e9; this.ms.forEach(function (m) { var d = Math.hypot(m.x - x, m.y - y); if (d < m.R + 0.25 && d < bd) { bd = d; best = m; } }); return best; };

  // Draw a Sim on the current board. Each molecule keeps its own JSXGraph objects, so a reaction only redraws what changed.
  function drawSim(sim, opts) {
    opts = opts || {};
    var board = S.board(), T = S.T;
    function atomXY(m, p) { var c = Math.cos(m.a), s = Math.sin(m.a); return [m.x + p[1] * c - p[2] * s, m.y + p[1] * s + p[2] * c]; }
    function draw(m) {
      m.jx = m.atoms.map(function (p) {
        var e = EL[p[0]];
        var pt = board.create('point', [function () { return atomXY(m, p)[0]; }, function () { return atomXY(m, p)[1]; }], { name: '', withLabel: false, fixed: true, highlight: false,
          showInfobox: false, face: 'o', size: Math.max(2, e[0] * board.unitX * 0.97), strokeWidth: 1, strokeColor: T.ink, strokeOpacity: 0.55, fillColor: dark() ? e[2] : e[1], fillOpacity: 1 });
        var objs = [pt];
        if (opts.labels) objs.push(board.create('text', [function () { return atomXY(m, p)[0]; }, function () { return atomXY(m, p)[1]; }, p[0]], { display: 'internal', anchorX: 'middle', anchorY: 'middle',
          fontSize: Math.max(8, Math.round(e[0] * board.unitX * 0.85)), fixed: true, highlight: false, strokeColor: p[0] === 'H' || p[0] === 'He' || p[0] === 'S' ? '#1d2430' : '#ffffff', cssStyle: 'font-weight:700;pointer-events:none' }));
        return objs;
      });
      m.jx = [].concat.apply([], m.jx);
    }
    function undraw(m) { (m.jx || []).forEach(function (o) { board.removeObject(o); }); m.jx = []; }
    function paint() { sim.ms.forEach(function (m) { if (!m.jx) return; var k = 0; m.atoms.forEach(function (p) { var e = EL[p[0]], pt = m.jx[k]; pt.setAttribute({ fillColor: dark() ? e[2] : e[1], strokeColor: T.ink, size: Math.max(2, e[0] * board.unitX * 0.97) }); k += opts.labels ? 2 : 1; }); }); }
    sim.onAdd = draw; sim.onRemove = undraw;
    sim.ms.forEach(draw);
    S.onPaint(paint);
    // A ring that fades where a reaction happened, so successful collisions can be seen.
    var flashes = [];
    function flash(x, y) {
      if (opts.flash === false) return;
      var c = board.create('circle', [[x, y], 0.9], { strokeWidth: 3, strokeColor: T.p5, fillOpacity: 0, fixed: true, highlight: false, center: { visible: false } });
      flashes.push([c, 24]);
    }
    S.loop(function () { for (var i = flashes.length - 1; i >= 0; i--) { var f = flashes[i]; f[1]--; f[0].setAttribute({ strokeOpacity: f[1] / 24 }); if (f[1] <= 0) { board.removeObject(f[0]); flashes.splice(i, 1); } } });
    // Highlight one molecule (a ring that follows it).
    var ring = null;
    function select(m) {
      if (ring) { board.removeObject(ring); ring = null; }
      if (!m) return;
      ring = board.create('circle', [[function () { return m.x; }, function () { return m.y; }], function () { return m.R + 0.2; }], { strokeWidth: 2.5, strokeColor: T.accent, dash: 2, fillOpacity: 0, fixed: true, highlight: false, center: { visible: false } });
    }
    return { flash: flash, select: select };
  }

  S.atoms = { EL: EL, atomsOf: atomsOf, nameOf: nameOf, elementsIn: elementsIn, tally: tally, describe: describe, shape: shape, massOf: massOf, radiusOf: radiusOf,
    parseRule: parseRule, Sim: Sim, drawSim: drawSim, colour: function (e) { return dark() ? EL[e][2] : EL[e][1]; } };
})();
