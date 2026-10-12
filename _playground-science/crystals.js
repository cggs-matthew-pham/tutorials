// Cooling magma for the science board: crystal size depends on how fast a melt cools (AC9S8U04 node 2).
// Plain script, no build step: it adds window.SCI.crystals. The simulation (Melt) needs no DOM, so
// tools/check-engines.mjs can run it in Node; draw() needs engine.js and JSXGraph.
//
// Model. Particles sit on a hexagonal lattice. Above the melting point (1100 °C) all are liquid. Below it, a
// liquid particle with no crystal next to it starts a new crystal with a small chance that rises steeply with
// undercooling (u³); one next to a crystal joins it with a chance that rises with undercooling but is capped (growth
// cannot outrun the particles reaching the surface). Slow cooling keeps the undercooling small for a long time: few
// crystals start, and they grow big. Fast cooling makes it large quickly: many crystals start, each stays small.
// Below 700 °C any liquid left freezes where it is, as glass (no crystals, no pattern).
(function () {
  'use strict';
  var S = window.SCI = window.SCI || {};
  var TM = 1100, TG = 700, T0 = 1200, G = 0.0005, CAP = 0.03, N = 1e-9;
  // Cooling settings: degrees per frame, and what they stand for.
  var RATES = [
    [0.3, 'Very slow', 'deep underground, over hundreds of thousands of years'],
    [1, 'Slow', 'a few kilometres down, over thousands of years'],
    [3, 'Fast', 'a lava flow at the surface, over days to years'],
    [10, 'Very fast', 'lava pouring into the sea, in minutes'],
    [30, 'Instant', 'lava quenched in seconds'],
  ];

  function Melt(b, rnd) {
    this.b = b; this.rnd = rnd || Math.random; this.sites = [];
    var s = 0.95, w = b.x1 - b.x0, h = b.y1 - b.y0;
    for (var j = 0; j * s * 0.866 < h - 0.5; j++) for (var i = 0; i * s + (j % 2) * s / 2 < w - 0.5; i++)
      this.sites.push({ x: b.x0 + 0.5 + i * s + (j % 2) * s / 2, y: b.y0 + 0.5 + j * s * 0.866, st: -1, jx: 0, jy: 0 });
    var all = this.sites;
    all.forEach(function (a) { a.nb = all.filter(function (q) { return q !== a && Math.abs(q.x - a.x) < 1.1 && Math.abs(q.y - a.y) < 1.1 && Math.hypot(a.x - q.x, a.y - q.y) < s * 1.1; }); });
    this.reset();
  }
  // st: -1 liquid, -2 glass, 0.. the crystal it belongs to.
  Melt.prototype.reset = function () { this.T = T0; this.frames = 0; this.ids = 0; this.sites.forEach(function (x) { x.st = -1; }); };
  Melt.prototype.liquid = function () { return this.sites.filter(function (x) { return x.st === -1; }).length; };
  Melt.prototype.solid = function () { return this.frames > 0 && !this.sites.some(function (x) { return x.st === -1; }); };
  Melt.prototype.step = function (rate) {
    if (this.solid()) return;
    this.frames++; this.T = Math.max(20, this.T - rate);
    var u = Math.max(0, TM - this.T), rnd = this.rnd, self = this;
    if (this.T < TG) { this.sites.forEach(function (x) { if (x.st === -1) x.st = -2; }); return; }
    if (!u) return;
    var g = Math.min(CAP, G * u), n = N * u * u * u;
    this.sites.forEach(function (x) {
      if (x.st !== -1) return;
      var cn = x.nb.filter(function (q) { return q.st >= 0; });
      if (cn.length) { if (rnd() < g * cn.length) x.st = cn[Math.floor(rnd() * cn.length)].st; }
      else if (rnd() < n) x.st = self.ids++;
    });
  };
  Melt.prototype.stats = function () {
    var sizes = {}, glass = 0;
    this.sites.forEach(function (x) { if (x.st >= 0) sizes[x.st] = (sizes[x.st] || 0) + 1; else if (x.st === -2) glass++; });
    var v = Object.keys(sizes).map(function (k) { return sizes[k]; });
    return { crystals: v.length, average: v.length ? v.reduce(function (a, c) { return a + c; }, 0) / v.length : 0, largest: v.length ? Math.max.apply(null, v) : 0, glass: glass, total: this.sites.length };
  };
  // Run to solid in one go (for checks): returns stats and frames.
  Melt.prototype.run = function (rate) { this.reset(); while (!this.solid() && this.frames < 100000) this.step(rate); var s = this.stats(); s.frames = this.frames; return s; };

  // Grain colours: muted, distinct in light and dark.
  var GRAINS = ['#8fb3d9', '#e3a87a', '#a7c98b', '#d39bc4', '#e2cf7a', '#86c5bd', '#c4a484', '#b0a6dc', '#e59a9a', '#9fc0a0'];
  // Draw a Melt on the board's canvas layer: liquid glows and jiggles; crystal particles sit exactly on the
  // pattern, coloured by crystal; glass is dark and stays where it froze, out of pattern.
  function draw(melt) {
    var T = S.T, still = false;
    function colour(x) {
      if (x.st === -1) { var h = Math.max(0, Math.min(1, (melt.T - TG) / (T0 - TG))); return 'hsl(' + Math.round(10 + 30 * (1 - h)) + ',90%,' + Math.round(48 + 10 * h) + '%)'; }
      if (x.st === -2) return matchMedia('(prefers-color-scheme: dark)').matches ? '#5d6470' : '#3b3f46';
      return GRAINS[x.st % GRAINS.length];
    }
    S.dots(function (ctx, X, Y, u) {
      var edge = T.ink + '59';
      melt.sites.forEach(function (x) {
        if (x.st === -1 && !still) { x.jx = (Math.random() - 0.5) * 0.35; x.jy = (Math.random() - 0.5) * 0.35; }
        var off = x.st < 0;
        S.disc(ctx, X(x.x + (off ? x.jx : 0)), Y(x.y + (off ? x.jy : 0)), Math.max(1.5, 0.44 * u), colour(x), edge);
      });
    });
    return { paint: function () {}, hold: function (v) { still = v; } };
  }

  S.crystals = { Melt: Melt, RATES: RATES, draw: draw, TM: TM, TG: TG, T0: T0 };
})();
