// Heat transfer for the science board: convection in a liquid or gas, conduction in a solid (AC9S8U03 node 2,
// AC9S9U04 node 1). Plain script, no build step: it adds window.SCI.flow. The simulation (Flow) needs no DOM, so
// tools/check-engines.mjs can run it in Node; the widget in main.js draws it.
//
// Model. Each particle carries heat h (0 cold to 1 hot). Particles touching the heater warm up, particles at the
// top cool down, and touching particles share heat (conduction). In a fluid, hotter-than-average particles get an
// upward push and cooler ones a downward push (a warmer region is less dense: the particles there move faster and
// spread out, which this model leaves out to keep the picture readable), so a current forms: up over the heater,
// across the top, down the sides. In a solid the particles stay in place, so heat can only pass along by conduction.
(function () {
  'use strict';
  var S = window.SCI = window.SCI || {};
  function Flow(b, opts) {
    opts = opts || {};
    this.b = b; this.r = opts.r || 0.6; this.solid = !!opts.solid; this.ps = []; this.frames = 0;
    // Heater: a band of the floor (x from hx0 to hx1), or the left wall for a solid bar.
    var w = b.x1 - b.x0;
    this.hx0 = opts.hx0 !== undefined ? opts.hx0 : b.x0 + w * 0.38; this.hx1 = opts.hx1 !== undefined ? opts.hx1 : b.x0 + w * 0.62;
    this.heat = opts.heat !== undefined ? opts.heat : 1; this.lift = opts.lift !== undefined ? opts.lift : 0.1; this.share = opts.share !== undefined ? opts.share : (this.solid ? 0.03 : 0.008);
    this.rnd = opts.rnd || Math.random;
    // Gravity keeps the liquid settled on the heater, with the free space at the top (like a pan).
    this.g = opts.g !== undefined ? opts.g : 0.008;
    var r = this.r, rnd = this.rnd, self = this;
    if (this.solid) {
      for (var x = b.x0 + r + 0.1; x < b.x1 - r; x += 2 * r + 0.05) for (var y = b.y0 + r + 0.1; y < b.y1 - r; y += 2 * r + 0.05) this.ps.push({ x: x, y: y, sx: x, sy: y, vx: 0, vy: 0, h: 0 });
    } else {
      // Packed like a liquid (72% of the area): a fluid fills its container, so the heater always has particles on it.
      var n = opts.n || Math.round(0.72 * w * (b.y1 - b.y0) / (Math.PI * r * r));
      for (var k = 0; k < n; k++) this.ps.push({ x: b.x0 + r + rnd() * (w - 2 * r), y: b.y0 + r + rnd() * (b.y1 - b.y0 - 2 * r), vx: 0, vy: 0, h: 0.2 });
      for (var it = 0; it < 60; it++) this.repel();
    }
  }
  Flow.prototype.heated = function (p) { return this.solid ? p.x < this.b.x0 + 1.4 * this.r + 0.2 : (p.y < this.b.y0 + this.r * 2.5 && p.x > this.hx0 && p.x < this.hx1); };
  Flow.prototype.cooled = function (p) { return this.solid ? false : p.y > this.b.y1 - this.r * 2.5; };
  Flow.prototype.repel = function () {
    var ps = this.ps, r2 = 2 * this.r * 0.98, b = this.b, r = this.r;
    for (var i = 0; i < ps.length; i++) for (var j = i + 1; j < ps.length; j++) {
      var a = ps[i], q = ps[j], dx = q.x - a.x, dy = q.y - a.y; if (Math.abs(dx) > r2 || Math.abs(dy) > r2) continue;
      var d2 = dx * dx + dy * dy; if (d2 >= r2 * r2 || d2 < 1e-9) continue;
      var d = Math.sqrt(d2), o = (r2 - d) / 2, nx = dx / d, ny = dy / d; a.x -= nx * o; a.y -= ny * o; q.x += nx * o; q.y += ny * o;
    }
    ps.forEach(function (p) {
      if (p.x < b.x0 + r) { p.x = b.x0 + r; p.vx = Math.abs(p.vx); } if (p.x > b.x1 - r) { p.x = b.x1 - r; p.vx = -Math.abs(p.vx); }
      if (p.y < b.y0 + r) { p.y = b.y0 + r; p.vy = Math.abs(p.vy); } if (p.y > b.y1 - r) { p.y = b.y1 - r; p.vy = -Math.abs(p.vy); }
    });
  };
  Flow.prototype.step = function () {
    var ps = this.ps, self = this, rnd = this.rnd, reach = 2 * this.r * 1.15, i, j;
    this.frames++;
    // Heating and cooling at the edges.
    ps.forEach(function (p) { if (self.heat && self.heated(p)) p.h += (1 - p.h) * 0.15 * self.heat; if (self.cooled(p)) p.h += (0 - p.h) * 0.05; });
    // Conduction: touching particles share heat.
    var dh = ps.map(function () { return 0; });
    for (i = 0; i < ps.length; i++) for (j = i + 1; j < ps.length; j++) {
      var a = ps[i], q = ps[j]; if (Math.abs(q.x - a.x) > reach || Math.abs(q.y - a.y) > reach) continue;
      if (Math.hypot(q.x - a.x, q.y - a.y) < reach) { var e = (q.h - a.h) * self.share; dh[i] += e; dh[j] -= e; }
    }
    ps.forEach(function (p, k) { p.h = Math.max(0, Math.min(1, p.h + dh[k])); });
    if (this.solid) { ps.forEach(function (p) { var amp = 0.06 + 0.16 * p.h; p.x = p.sx + (rnd() - 0.5) * amp; p.y = p.sy + (rnd() - 0.5) * amp; }); return; }
    // Fluid: buoyancy against the average, a little jiggle (more when hot), damping, then keep particles apart.
    var mean = 0; ps.forEach(function (p) { mean += p.h; }); mean /= ps.length;
    ps.forEach(function (p) {
      var jig = 0.03 + 0.05 * p.h;
      p.vx = p.vx * 0.9 + (rnd() - 0.5) * jig; p.vy = p.vy * 0.9 + (rnd() - 0.5) * jig + self.lift * (p.h - mean) - self.g;
      p.px = p.x; p.py = p.y; p.x += p.vx; p.y += p.vy;
    });
    this.repel(); this.repel();
    // Velocity is what actually happened after particles pushed each other apart (Verlet style), so a crowded
    // particle does not store up speed it never had.
    ps.forEach(function (p) { p.vx = p.x - p.px; p.vy = p.y - p.py; });
  };
  // Average heat in a vertical slice (for a solid bar: how far the heat has spread).
  Flow.prototype.heatAt = function (x0, x1) { var s = 0, n = 0; this.ps.forEach(function (p) { if (p.x >= x0 && p.x < x1) { s += p.h; n++; } }); return n ? s / n : 0; };
  // Heat as a colour: blue (cold) to red (hot).
  // Blue (cold) to red (hot) through purple: one scale, no rainbow (green would look like a different substance).
  function heatColour(h) { var a = [59, 125, 216], z = [224, 65, 47]; return 'rgb(' + a.map(function (v, i) { return Math.round(v + (z[i] - v) * h); }).join(',') + ')'; }
  S.flow = { Flow: Flow, heatColour: heatColour };
})();
