// Natural selection for the science board: a population of beetles whose colour is inherited, birds that find
// the ones that stand out, and generations (AC9S10U02). The simulation (Population) needs no DOM, so
// tools/check-engines.mjs can run it in Node; the widget in main.js draws it on the canvas layer.
//
// Model. Each beetle has a colour c from 0 (pale) to 1 (dark), inherited: an offspring's colour is the average of its
// two parents plus a small random change (new variation, like mutation). Birds eat half the population each
// generation, finding a beetle more easily the more it differs from the ground (weighted at random, so a well-hidden
// beetle can still be unlucky). Survivors pair at random and breed back to full size. Nothing changes in a beetle
// during its life: the population changes because survivors pass on their colours.
(function () {
  'use strict';
  var S = window.SCI = window.SCI || {};
  function Population(n, opts) {
    opts = opts || {}; this.n = n; this.rnd = opts.rnd || Math.random; this.ground = opts.ground !== undefined ? opts.ground : 0.15;
    this.mut = opts.mut !== undefined ? opts.mut : 0.06; this.gen = 0; this.history = [];
    var rnd = this.rnd, mean = opts.mean !== undefined ? opts.mean : 0.5, spread = opts.spread !== undefined ? opts.spread : 0.22;
    this.bs = [];
    for (var i = 0; i < n; i++) this.bs.push(this.make(clamp(mean + (gauss(rnd)) * spread)));
    this.record();
  }
  function clamp(c) { return Math.max(0, Math.min(1, c)); }
  function gauss(rnd) { var u = 0, v = 0; while (!u) u = rnd(); v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  Population.prototype.make = function (c) { var rnd = this.rnd; return { c: c, x: 0.04 + rnd() * 0.92, y: 0.06 + rnd() * 0.88, a: rnd() * 6.283, size: 0.8 + rnd() * 0.4 }; };
  // How easily a bird sees a beetle: the colour difference from the ground, plus a little for being seen at all.
  Population.prototype.visibility = function (b) { return 0.08 + Math.abs(b.c - this.ground); };
  // Birds take k beetles, each pick weighted by visibility.
  Population.prototype.hunt = function (k) {
    var rnd = this.rnd, alive = this.bs.slice(), eaten = [];
    k = k === undefined ? Math.floor(this.bs.length / 2) : k;
    for (var j = 0; j < k && alive.length; j++) {
      var tot = 0, self = this; alive.forEach(function (b) { tot += self.visibility(b); });
      var r = rnd() * tot, i = 0; for (; i < alive.length - 1; i++) { r -= this.visibility(alive[i]); if (r <= 0) break; }
      eaten.push(alive.splice(i, 1)[0]);
    }
    this.bs = alive; return eaten;
  };
  // Survivors pair at random; each offspring's colour is its parents' average plus a small random change.
  Population.prototype.breed = function () {
    var rnd = this.rnd, par = this.bs.slice(), kids = [];
    if (par.length < 2) return;
    while (kids.length + par.length < this.n) { var a = par[Math.floor(rnd() * par.length)], b = par[Math.floor(rnd() * par.length)]; kids.push(this.make(clamp((a.c + b.c) / 2 + gauss(rnd) * this.mut))); }
    this.bs = par.map(function (p) { return p; }).concat(kids);
    this.gen++; this.record();
  };
  Population.prototype.mean = function () { return this.bs.reduce(function (s, b) { return s + b.c; }, 0) / (this.bs.length || 1); };
  Population.prototype.bins = function (n) { var h = []; for (var i = 0; i < n; i++) h.push(0); this.bs.forEach(function (b) { h[Math.min(n - 1, Math.floor(b.c * n))]++; }); return h; };
  Population.prototype.record = function () { this.history.push({ gen: this.gen, mean: this.mean(), bins: this.bins(10) }); };
  // Beetle colour: pale sand to dark brown.
  function colour(c) { var a = [232, 217, 168], z = [52, 38, 24]; return 'rgb(' + a.map(function (v, i) { return Math.round(v + (z[i] - v) * c); }).join(',') + ')'; }
  S.selection = { Population: Population, colour: colour };
})();
