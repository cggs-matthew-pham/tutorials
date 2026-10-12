// Gears and a winch (Engineering › Mechanisms): a motor gear (the driver) meshes with a winch gear (the driven gear);
// the winch drum winds a rope that lifts a bucket. A gear ratio trades speed for turning force by the same factor.
// No friction or losses: the model says so in the panel.
//   widget: gears
//   gears: 8, 16, 24, 40   the gears in the kit (tooth counts, 6 to 60; one of each)
//   driver: 8              the gear on the motor            driven: 24   the gear on the winch
//   choose: on             pick the driver and driven gears (else they are fixed)
//   rpm: 120               motor speed (turns a minute)     lift: 200    grams the motor lifts with no gears (1 : 1)
//   drum: 0.1              metres of rope per winch turn    height: 1    metres to lift the bucket
//   load: 450              the bucket's mass in grams       addload: on  − 50 g and + 50 g buttons
//   limit: 15              the brief's time limit in seconds (criteria shown when numbers are on)
//   numbers: off           hide ratio, speeds, capacity and time (students count turns and find the stall by testing)
//   brief: edit            students set the load and the time limit; the board tests every pair of gears in the kit
// state: { scope: { vars: { r (ratio, driven ÷ driver), d (driver teeth), g (driven teeth), rpm_w (winch turns a
//          minute), cap_g (heaviest lift, g), time_s (time to lift, s), load_g, limit_s, turns_m (motor turns shown
//          with Turn once), turns_w (winch turns shown), s (1 if the last lift stalled), l (1 if the last lift
//          worked), p (1 if this pair meets both criteria), n_pass (pairs in the kit that meet both) } } }
// Checks: "turns_m >= 1 and s = 1", "r = 1.5 and l = 1 and load_g = 300", "n_pass = 1".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var spec = null, st = {}, ui = {}, anim = null;
  var on = function (s) { return /^on$/i.test(s || ''); };
  var r2 = function (v) { return Math.round(v * 100) / 100; };
  var num = function (s, key, def, lo, hi) {
    var v = s[key] === undefined ? def : Number(s[key]);
    if (!(v >= lo && v <= hi)) throw new Error(key + ': a number from ' + lo + ' to ' + hi + '.');
    return v;
  };

  function parse(s) {
    s.kit = String(s.gears || '8, 16, 24, 40').split(',').map(function (t) { return Number(t.trim()); });
    if (s.kit.length < 2 || s.kit.some(function (t) { return !(t >= 6 && t <= 60 && t === Math.round(t)); })) throw new Error('gears: two or more tooth counts, whole numbers from 6 to 60, such as 8, 16, 24, 40.');
    s.kit = s.kit.filter(function (t, i, a) { return a.indexOf(t) === i; }).sort(function (a, b) { return a - b; });
    s.d0 = num(s, 'driver', s.kit[0], 6, 60); s.g0 = num(s, 'driven', s.kit[s.kit.length - 1], 6, 60);
    if (s.kit.indexOf(s.d0) < 0 || s.kit.indexOf(s.g0) < 0) throw new Error('driver and driven: gears from the kit (' + s.kit.join(', ') + ').');
    if (s.d0 === s.g0) throw new Error('driver and driven: two different gears (the kit has one of each).');
    s.rpm = num(s, 'rpm', 120, 1, 10000); s.lift = num(s, 'lift', 200, 1, 100000);
    s.drum = num(s, 'drum', 0.1, 0.001, 10); s.height = num(s, 'height', 1, 0.01, 1000);
    s.load0 = num(s, 'load', 0, 0, 100000); s.limit0 = s.limit === undefined ? null : num(s, 'limit', 15, 0.1, 100000);
    s.choose = on(s.choose); s.addload = on(s.addload); s.hide = /^off$/i.test(s.numbers || ''); s.edit = /^edit$/i.test(s.brief || '');
    if (s.edit && s.limit0 === null) s.limit0 = 15;
  }

  function model(d, g) {
    var r = g / d, rpmw = spec.rpm / r, cap = spec.lift * r, turns = spec.height / spec.drum, t = turns / rpmw * 60;
    return { r: r2(r), rpmw: r2(rpmw), cap: r2(cap), t: r2(t), pass: cap >= st.load && (st.limit === null || t <= st.limit + 1e-9) };
  }
  function passing() {
    var out = [];
    spec.kit.forEach(function (d) { spec.kit.forEach(function (g) { if (d !== g && st.load > 0) { var m = model(d, g); if (m.pass) out.push(d + ' → ' + g + ' (' + B.fmt(m.t) + ' s)'); } }); });
    return out;
  }
  function frac(a, b) {   // a/b as a simplified fraction or whole number
    var gcd = function (x, y) { return y ? gcd(y, x % y) : x; }, k = gcd(a, b);
    a /= k; b /= k; return b === 1 ? String(a) : (a > b ? Math.floor(a / b) + ' ' : '') + (a % b) + '/' + b;
  }

  // A gear outline: n teeth on a pitch radius r (teeth stick out by 5 and in by 4).
  function gearPath(n, r) {
    var pts = [], step = 2 * Math.PI / n;
    for (var i = 0; i < n; i++) {
      var a = i * step;
      [[a - step * 0.30, r - 4], [a - step * 0.18, r + 5], [a + step * 0.18, r + 5], [a + step * 0.30, r - 4]].forEach(function (p) {
        pts.push((p[1] * Math.cos(p[0])).toFixed(2) + ',' + (p[1] * Math.sin(p[0])).toFixed(2));
      });
    }
    return 'M' + pts.join('L') + 'Z';
  }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  var R = function (t) { return t * 2.4; };   // pitch radius in the picture

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var rd = R(st.d), rg = R(st.g), cx = 40 + rd + 20, cy = 150, gx = cx + rd + rg, W = Math.max(560, gx + rg + 150);
    var svg = el('svg', { viewBox: '0 0 ' + W + ' 320', class: 'gearsvg', role: 'img', 'aria-label': 'A ' + st.d + '-tooth gear on the motor meshing with a ' + st.g + '-tooth gear on the winch' }, host);
    ui.drv = el('g', {}, svg); ui.dvn = el('g', {}, svg);
    el('path', { d: gearPath(st.d, rd), class: 'ggear gdrv' }, ui.drv);
    el('circle', { r: 5, class: 'gaxle' }, ui.drv);
    el('circle', { cx: rd + 1, cy: 0, r: 4, class: 'gmark' }, ui.drv);
    el('path', { d: gearPath(st.g, rg), class: 'ggear gdvn' }, ui.dvn);
    el('circle', { r: 16, class: 'gdrum' }, ui.dvn);
    el('line', { x1: 0, y1: 0, x2: 0, y2: -16, class: 'gspoke' }, ui.dvn);
    el('circle', { cx: rg + 1, cy: 0, r: 4, class: 'gmark' }, ui.dvn);
    var lab = function (x, y, t) { var e = el('text', { x: x, y: y, 'text-anchor': 'middle', class: 'glabel' }, svg); e.textContent = t; };
    lab(cx, cy + Math.max(rd, 40) + 26, 'Motor: ' + st.d + ' teeth');
    lab(gx, Math.min(312, cy + Math.max(rg, 40) + 26), 'Winch: ' + st.g + ' teeth');
    // rope from the drum's right side down to the bucket, which hangs to the right of the winch gear
    var bx = gx + rg + 70;
    ui.rope = el('path', { class: 'grope' }, svg);
    ui.bucket = el('g', {}, svg);
    el('path', { d: 'M-22,0 L22,0 L17,34 L-17,34 Z', class: 'gbucket' }, ui.bucket);
    el('path', { d: 'M-20,0 Q0,-18 20,0', class: 'grope', fill: 'none' }, ui.bucket);
    ui.btext = el('text', { x: 0, y: 23, 'text-anchor': 'middle', class: 'gbtext' }, ui.bucket);
    ui.geo = { cx: cx, cy: cy, gx: gx, bx: bx, top: 40, bottom: 270 };
    pose(0, 0);
  }
  // ad: driver angle in degrees; up: 0..1 how far the bucket has risen
  function pose(ad, up) {
    var G = ui.geo, ag = -ad * st.d / st.g + 180 + 180 / st.g;
    ui.drv.setAttribute('transform', 'translate(' + G.cx + ',' + G.cy + ') rotate(' + ad.toFixed(2) + ')');
    ui.dvn.setAttribute('transform', 'translate(' + G.gx + ',' + G.cy + ') rotate(' + ag.toFixed(2) + ')');
    var by = G.bottom - up * (G.bottom - G.top - 30);
    ui.bucket.setAttribute('transform', 'translate(' + G.bx + ',' + by.toFixed(1) + ')');
    ui.rope.setAttribute('d', 'M' + G.gx + ',' + (G.cy - 16) + ' L' + G.bx + ',' + (G.cy - 16) + ' L' + G.bx + ',' + (by - 9).toFixed(1));
    ui.btext.textContent = st.load ? st.load + ' g' : '';
  }
  function animate(ms, frame, done) {
    if (anim) cancelAnimationFrame(anim);
    var t0 = performance.now();
    (function tick(now) {
      var k = Math.min(1, (now - t0) / ms); frame(k);
      if (k < 1) anim = requestAnimationFrame(tick); else { anim = null; done(); }
    })(t0);
  }

  function btn(text, label, fn, quiet) {
    var e = document.createElement('button'); e.type = 'button'; e.textContent = text; if (label) e.setAttribute('aria-label', label);
    if (quiet) e.className = 'quiet'; e.addEventListener('click', fn); return e;
  }
  function select(label, value, fn) {
    var wrap = document.createElement('label'); wrap.textContent = label + ' ';
    var s = document.createElement('select');
    spec.kit.forEach(function (t) { var o = document.createElement('option'); o.value = t; o.textContent = t + ' teeth'; s.appendChild(o); });
    s.value = String(value); s.addEventListener('change', function () { fn(Number(s.value), s); });
    wrap.appendChild(s); return wrap;
  }
  function numIn(label, value, fn) {
    var wrap = document.createElement('label'); wrap.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'number'; i.min = '0'; i.step = 'any'; i.value = value;
    i.addEventListener('change', function () { var v = Number(i.value); if (v >= 0) fn(v); else i.value = value; });
    wrap.appendChild(i); return wrap;
  }

  function busy() { return !!anim; }
  function setPair(which, v, sel) {
    if (busy()) return;
    var other = which === 'd' ? st.g : st.d;
    if (v === other) { sel.value = String(st[which]); report('The kit has one ' + v + '-tooth gear, and it is already on the ' + (which === 'd' ? 'winch' : 'motor') + '.'); return; }
    st[which] = v; st.s = 0; st.l = 0; st.tm = 0; st.tw = 0; B.moved = true; draw(); report();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui.sel = {};
    if (spec.edit) {
      var row0 = document.createElement('div'); row0.className = 'oprow gbrief';
      var t = document.createElement('strong'); t.textContent = 'Brief:'; row0.appendChild(t);
      row0.appendChild(numIn('bucket (g)', st.load, function (v) { st.load = v; st.s = 0; st.l = 0; B.moved = true; pose(0, 0); report(); }));
      row0.appendChild(numIn('time limit (s)', st.limit, function (v) { st.limit = v; B.moved = true; report(); }));
      panel.appendChild(row0);
    }
    var row = document.createElement('div'); row.className = 'oprow';
    if (spec.choose) {
      row.appendChild(select('Motor gear', st.d, function (v, s) { setPair('d', v, s); }));
      row.appendChild(select('Winch gear', st.g, function (v, s) { setPair('g', v, s); }));
    }
    row.appendChild(btn('Turn the motor once', null, turnOnce));
    row.appendChild(btn('Lift the bucket', null, lift));
    if (spec.addload) {
      row.appendChild(btn('− 50 g', 'Take 50 grams out of the bucket', function () { if (busy() || st.load < 50) return; st.load -= 50; st.s = 0; st.l = 0; B.moved = true; pose(0, 0); report(); }, true));
      row.appendChild(btn('+ 50 g', 'Add 50 grams to the bucket', function () { if (busy()) return; st.load += 50; st.s = 0; st.l = 0; B.moved = true; pose(0, 0); report(); }, true));
    }
    row.appendChild(btn('Start again', null, function () { if (anim) { cancelAnimationFrame(anim); anim = null; } B.restart(); }, true));
    panel.appendChild(row);
    ui.facts = document.createElement('p'); ui.facts.className = 'gfacts'; ui.facts.id = 'gsum'; ui.facts.setAttribute('aria-live', 'polite'); panel.appendChild(ui.facts);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
  }

  function turnOnce() {
    if (busy()) return;
    B.moved = true;
    animate(1600, function (k) { pose(360 * k, 0); }, function () {
      st.tm += 1; st.tw += st.d / st.g; pose(0, 0);
      report(spec.hide ? 'The motor turned once. Watch the dot on the winch gear: how far did it go?' : 'The motor turned once; the winch turned ' + frac(st.d * st.tm, st.g) + (st.tm > 1 ? ' times in all.' : ' of a turn.'));
    });
  }
  function lift() {
    if (busy()) return;
    if (!st.load) return report('Put a load in the bucket first.');
    B.moved = true;
    var m = model(st.d, st.g);
    if (st.load > m.cap) {
      animate(900, function (k) { pose(Math.sin(k * Math.PI * 6) * 4, 0.02 * Math.sin(k * Math.PI)); }, function () {
        st.s = 1; st.l = 0; pose(0, 0);
        report('Stalls: the motor cannot turn the winch with ' + st.load + ' g in the bucket.');
      });
      return;
    }
    var turnsW = spec.height / spec.drum, ms = Math.min(4500, Math.max(1500, m.t * 200));
    animate(ms, function (k) { pose(360 * Math.min(turnsW * st.g / st.d, 6) * k % 360, k); }, function () {
      st.s = 0; st.l = 1; pose(0, 1);
      report(spec.hide ? 'Lifted ' + st.load + ' g.' : 'Lifted ' + st.load + ' g ' + B.fmt(spec.height) + ' m in ' + B.fmt(m.t) + ' s.');
    });
  }

  function report(note) {
    var m = model(st.d, st.g), facts = [], pl = passing();
    if (!spec.hide) {
      facts.push('Ratio ' + st.g + ' ÷ ' + st.d + ' = ' + B.fmt(m.r));
      facts.push('winch ' + B.fmt(m.rpmw) + ' turns a minute');
      facts.push('lifts up to ' + B.fmt(m.cap) + ' g');
      facts.push(B.fmt(spec.height) + ' m in ' + B.fmt(m.t) + ' s');
    } else facts.push('Motor turns: ' + st.tm);
    var crit = '';
    if (!spec.hide && st.load > 0 && st.limit !== null) {
      crit = (m.cap >= st.load ? '✓' : '✗') + ' lifts ' + st.load + ' g  ' + (m.t <= st.limit + 1e-9 ? '✓' : '✗') + ' within ' + B.fmt(st.limit) + ' s';
    }
    ui.facts.textContent = facts.join(' · ') + (crit ? '  ·  ' + crit : '');
    ui.note.textContent = note || (spec.edit ? (st.load > 0 ? 'Pairs in the kit that meet the brief: ' + (pl.length ? pl.join(', ') : 'none') + '.' : 'Set the bucket and the time limit.') : 'No friction in this model: real gears lose a little.');
    B.say(st.d + '-tooth gear on the motor, ' + st.g + '-tooth gear on the winch' + (st.load ? ', ' + st.load + ' g in the bucket.' : '.'));
    B.save({ d: st.d, g: st.g, load: st.load, limit: st.limit, tm: st.tm, tw: st.tw, s: st.s, l: st.l });
    var vars = { r: m.r, d: st.d, g: st.g, rpm_w: m.rpmw, cap_g: m.cap, time_s: m.t, load_g: st.load, limit_s: st.limit === null ? 0 : st.limit,
      turns_m: st.tm, turns_w: r2(st.tw), s: st.s, l: st.l, p: m.pass && st.load > 0 ? 1 : 0, n_pass: pl.length };
    B.post({ scope: { vars: vars, points: {} } }, st.d + ' → ' + st.g + ' teeth' + (note ? '. ' + note : ''));
  }

  B.widget('gears', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A motor gear driving a winch gear that lifts a bucket'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      var ok = function (t) { return spec.kit.indexOf(t) >= 0; };
      st = { d: spec.d0, g: spec.g0, load: spec.load0, limit: spec.limit0, tm: 0, tw: 0, s: 0, l: 0 };
      if (sv && ok(sv.d) && ok(sv.g) && sv.d !== sv.g && (spec.choose || (sv.d === spec.d0 && sv.g === spec.g0))) {
        st.d = sv.d; st.g = sv.g; st.tm = sv.tm || 0; st.tw = sv.tw || 0; st.s = sv.s || 0; st.l = sv.l || 0;
        if (spec.addload || spec.edit) st.load = sv.load >= 0 ? sv.load : st.load;
        if (spec.edit && sv.limit > 0) st.limit = sv.limit;
      }
      paintPanel(); draw(); if (st.l) pose(0, 1); report();
    },
  });
})(WPB);
