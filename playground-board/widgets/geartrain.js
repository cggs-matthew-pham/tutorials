// Gear trains (Engineering › Mechanisms, lesson 2): a row of gears from the motor to the winch. Gears in mesh push each
// other round (each mesh reverses the direction); two gears on one axle turn together. An idler (a gear between two
// others) changes the direction, not the ratio; a compound train multiplies the ratios of its stages. No friction.
//   widget: train
//   train: 8 > 24 = 8 > 40   the gears from the motor to the winch, by teeth: ">" two gears in mesh, "=" two gears on
//                            one axle (a compound train). 8 > 40 > 24 is a simple train with an idler.
//   gears: 8, 16, 24, 40     the sizes in the box (any number of each; 6 to 60 teeth)
//   choose: on               every gear can be changed (or a list of positions from 1, such as "choose: 2")
//   rpm: 120  lift: 200  drum: 0.1  height: 1  load: 450  addload: on  limit: 40  numbers: off  brief: edit
//                            as for the gears widget
// state: { scope: { vars: { r (overall ratio), r_1, r_2 (each stage's ratio; 0 when there is no second stage),
//          n_stage, n_mesh, same (1 if the winch turns the same way as the motor), t_1 … t_6 (teeth at each position),
//          rpm_w, cap_g, time_s, load_g, limit_s, turns_m, turns_w, s (last lift stalled), l (last lift worked),
//          p (this train meets both criteria), n_pass (trains from the box, changing only the choosable gears, that do) } } }
// Checks: "turns_m >= 1", "l = 1 and load_g = 600 and t_2 < 40", "load_g = 1500 and l = 1 and time_s <= 40".
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
  var okT = function (t) { return t >= 6 && t <= 60 && t === Math.round(t); };

  function parse(s) {
    s.kit = String(s.gears || '8, 16, 24, 40').split(',').map(function (t) { return Number(t.trim()); });
    if (!s.kit.length || s.kit.some(function (t) { return !okT(t); })) throw new Error('gears: tooth counts, whole numbers from 6 to 60, such as 8, 16, 24, 40.');
    s.kit = s.kit.filter(function (t, i, a) { return a.indexOf(t) === i; }).sort(function (a, b) { return a - b; });
    var src = String(s.train || '8 > 24').replace(/\s+/g, '');
    if (!/^\d+([>=]\d+)+$/.test(src)) throw new Error('train: tooth counts joined by > (in mesh) or = (on one axle), such as 8 > 24 = 8 > 40.');
    s.t0 = src.split(/[>=]/).map(Number);
    s.links = src.match(/[>=]/g);           // links[i] joins position i and i + 1
    if (s.t0.length > 6) throw new Error('train: six gears at most.');
    if (s.t0.some(function (t) { return !okT(t) || s.kit.indexOf(t) < 0; })) throw new Error('train: every gear must be in the box (' + s.kit.join(', ') + ').');
    if (s.links[0] === '=' || s.links[s.links.length - 1] === '=') throw new Error('train: the motor and the winch each drive or are driven by a gear in mesh, so start and end with >.');
    if (/==/.test(s.links.join(''))) throw new Error('train: two gears at most on one axle.');
    if (s.choose === undefined || /^off$/i.test(s.choose)) s.pick = [];
    else if (on(s.choose)) s.pick = s.t0.map(function (t, i) { return i; });
    else {
      s.pick = String(s.choose).split(',').map(function (t) { return Number(t.trim()) - 1; });
      if (s.pick.some(function (i) { return !(i >= 0 && i < s.t0.length && i === Math.round(i)); })) throw new Error('choose: on, or positions from 1 to ' + s.t0.length + ' (such as 2).');
    }
    s.rpm = num(s, 'rpm', 120, 1, 10000); s.lift = num(s, 'lift', 200, 1, 100000);
    s.drum = num(s, 'drum', 0.1, 0.001, 10); s.height = num(s, 'height', 1, 0.01, 1000);
    s.load0 = num(s, 'load', 0, 0, 100000); s.limit0 = s.limit === undefined ? null : num(s, 'limit', 15, 0.1, 100000);
    s.addload = on(s.addload); s.hide = /^off$/i.test(s.numbers || ''); s.edit = /^edit$/i.test(s.brief || '');
    if (s.edit && s.limit0 === null) s.limit0 = 40;
  }

  // Stages: runs of gears in mesh, split where two gears share an axle. A stage's ratio is its last gear ÷ its first
  // (the gears between, idlers, cancel out).
  function stages(t) {
    var out = [], first = t[0];
    spec.links.forEach(function (k, i) { if (k === '=') { out.push(t[i] / first); first = t[i + 1]; } });
    out.push(t[t.length - 1] / first);
    return out;
  }
  function model(t) {
    var sr = stages(t), r = sr.reduce(function (a, b) { return a * b; }, 1);
    var nm = spec.links.filter(function (k) { return k === '>'; }).length;
    var rpmw = spec.rpm / r, cap = spec.lift * r, turns = spec.height / spec.drum, time = turns / rpmw * 60;
    return { sr: sr, r: r2(r), nm: nm, same: nm % 2 === 0 ? 1 : 0, rpmw: r2(rpmw), cap: r2(cap), t: r2(time),
      pass: cap >= st.load - 1e-9 && (st.limit === null || time <= st.limit + 1e-9) };
  }
  // Every train from the box that changes only the choosable gears.
  function passing() {
    if (!(st.load > 0)) return 0;
    var n = 0, t = st.t.slice();
    (function go(k) {
      if (k === spec.pick.length) { if (model(t).pass) n++; return; }
      spec.kit.forEach(function (v) { t[spec.pick[k]] = v; go(k + 1); });
    })(0);
    return n;
  }
  function frac(a, b) {
    var gcd = function (x, y) { return y ? gcd(y, x % y) : x; }, k = gcd(a, b);
    a /= k; b /= k; return b === 1 ? String(a) : (a > b ? Math.floor(a / b) + ' ' : '') + (a % b) + '/' + b;
  }
  function trainText(t) { return t.map(function (v, i) { return v + (i < spec.links.length ? (spec.links[i] === '>' ? ' → ' : ' = ') : ''); }).join(''); }

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
  var R = function (t) { return t * 2.4; };

  function name(i) {
    var n = st.t.length;
    if (i === 0) return 'Motor gear';
    if (i === n - 1) return 'Winch gear';
    return 'Gear ' + (i + 1);
  }

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var t = st.t, n = t.length, xs = [], cy = 150, x = 30 + R(t[0]) + 6;
    // Axles: a gear on the same axle as the one before sits at the same place.
    for (var i = 0; i < n; i++) {
      if (i > 0) x = spec.links[i - 1] === '=' ? xs[i - 1] : xs[i - 1] + R(t[i - 1]) + R(t[i]);
      xs.push(x);
    }
    var last = xs[n - 1], bx = last + R(t[n - 1]) + 70, W = Math.max(560, bx + 60);
    var svg = el('svg', { viewBox: '0 0 ' + W + ' 320', class: 'gearsvg', role: 'img', 'aria-label': 'A gear train from the motor to the winch: ' + trainText(t) + ' teeth' }, host);
    ui.g = [];
    for (i = 0; i < n; i++) {
      // On a shared axle the gear driven from the left is behind; the one that drives on is in front.
      var back = i < n - 1 && spec.links[i] === '=';
      var g = el('g', { class: back ? 'gback' : '' }, svg);
      el('path', { d: gearPath(t[i], R(t[i])), class: 'ggear ' + (i === 0 ? 'gdrv' : i === n - 1 ? 'gdvn' : 'gmid') }, g);
      el('circle', { r: i === n - 1 ? 16 : 5, class: i === n - 1 ? 'gdrum' : 'gaxle' }, g);
      if (i === n - 1) el('line', { x1: 0, y1: 0, x2: 0, y2: -16, class: 'gspoke' }, g);
      el('circle', { cx: R(t[i]) + 1, cy: 0, r: 4, class: 'gmark' }, g);
      ui.g.push(g);
    }
    var lab = function (x, y, txt) { var e = el('text', { x: x, y: Math.min(312, y), 'text-anchor': 'middle', class: 'glabel' }, svg); e.textContent = txt; };
    for (i = 0; i < n; i++) {
      if (i > 0 && spec.links[i - 1] === '=') continue;
      var pair = i < n - 1 && spec.links[i] === '=';
      var big = Math.max(R(t[i]), pair ? R(t[i + 1]) : 0, 40);
      lab(xs[i], cy + big + 26, i === 0 ? 'Motor: ' + t[i] : i === n - 1 ? 'Winch: ' + t[i] : pair ? t[i] + ' = ' + t[i + 1] : 'Idler: ' + t[i]);
    }
    ui.rope = el('path', { class: 'grope' }, svg);
    ui.bucket = el('g', {}, svg);
    el('path', { d: 'M-22,0 L22,0 L17,34 L-17,34 Z', class: 'gbucket' }, ui.bucket);
    el('path', { d: 'M-20,0 Q0,-18 20,0', class: 'grope', fill: 'none' }, ui.bucket);
    ui.btext = el('text', { x: 0, y: 23, 'text-anchor': 'middle', class: 'gbtext' }, ui.bucket);
    ui.geo = { xs: xs, cy: cy, bx: bx, top: 40, bottom: 270 };
    pose(0, 0);
  }
  // a: motor gear angle in degrees; up: 0..1 how far the bucket has risen. Each driven gear is placed so its teeth sit
  // in the gaps of the gear driving it (contact on the line between centres, to the right of the driver).
  function pose(a, up) {
    var G = ui.geo, t = st.t, i;
    // Rolling: each mesh turns the driven gear back by the tooth ratio. Work it out from the motor's angle directly so
    // the phase stays exact: the gear at i has turned −(product of mesh ratios) × a.
    var turn = a, out = [a];
    for (i = 1; i < t.length; i++) {
      if (spec.links[i - 1] === '=') { out.push(out[i - 1]); continue; }
      turn = -turn * t[i - 1] / t[i];
      out.push(turn);
    }
    var base = rest();
    for (i = 0; i < t.length; i++) ui.g[i].setAttribute('transform', 'translate(' + G.xs[i].toFixed(2) + ',' + G.cy + ') rotate(' + (base[i] + out[i]).toFixed(2) + ')');
    var by = G.bottom - up * (G.bottom - G.top - 30), lx = G.xs[t.length - 1];
    ui.bucket.setAttribute('transform', 'translate(' + G.bx + ',' + by.toFixed(1) + ')');
    ui.rope.setAttribute('d', 'M' + lx + ',' + (G.cy - 16) + ' L' + G.bx + ',' + (G.cy - 16) + ' L' + G.bx + ',' + (by - 9).toFixed(1));
    ui.btext.textContent = st.load ? st.load + ' g' : '';
  }
  // Each gear's angle at rest, so its teeth sit in the gaps of the gear that drives it.
  function rest() {
    var t = st.t, ang = [0];
    for (var i = 1; i < t.length; i++) {
      if (spec.links[i - 1] === '=') { ang.push(ang[i - 1]); continue; }
      var p = 360 / t[i - 1], q = 360 / t[i], f = ((((-ang[i - 1]) % p) + p) % p) / p;
      ang.push(180 + q / 2 + f * q);
    }
    return ang;
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
    s.value = String(value); s.addEventListener('change', function () { fn(Number(s.value)); });
    wrap.appendChild(s); return wrap;
  }
  function numIn(label, value, fn) {
    var wrap = document.createElement('label'); wrap.textContent = label + ' ';
    var i = document.createElement('input'); i.type = 'number'; i.min = '0'; i.step = 'any'; i.value = value;
    i.addEventListener('change', function () { var v = Number(i.value); if (v >= 0) fn(v); else i.value = value; });
    wrap.appendChild(i); return wrap;
  }
  var busy = function () { return !!anim; };
  function reset() { st.s = 0; st.l = 0; st.tm = 0; st.tw = 0; }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    if (spec.edit) {
      var row0 = document.createElement('div'); row0.className = 'oprow gbrief';
      var b = document.createElement('strong'); b.textContent = 'Brief:'; row0.appendChild(b);
      row0.appendChild(numIn('bucket (g)', st.load, function (v) { st.load = v; st.s = 0; st.l = 0; B.moved = true; pose(0, 0); report(); }));
      row0.appendChild(numIn('time limit (s)', st.limit, function (v) { st.limit = v; B.moved = true; report(); }));
      panel.appendChild(row0);
    }
    if (spec.pick.length) {
      var rowc = document.createElement('div'); rowc.className = 'oprow';
      spec.pick.forEach(function (i) {
        rowc.appendChild(select(name(i), st.t[i], function (v) { if (busy()) return; st.t[i] = v; reset(); B.moved = true; draw(); report(); }));
      });
      panel.appendChild(rowc);
    }
    var row = document.createElement('div'); row.className = 'oprow';
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

  // Winch turns for one motor turn, as whole numbers: drivers' teeth over driven teeth, mesh by mesh.
  function perTurn() {
    var a = 1, b = 1;
    spec.links.forEach(function (k, i) { if (k === '>') { a *= st.t[i]; b *= st.t[i + 1]; } });
    return [a, b];
  }
  function turnOnce() {
    if (busy()) return;
    B.moved = true;
    var m = model(st.t);
    animate(1600, function (k) { pose(360 * k, 0); }, function () {
      var pt = perTurn();
      st.tm += 1; st.tw = st.tm * pt[0] / pt[1]; pose(0, 0);
      var dir = m.same ? 'the same way as the motor' : 'the other way to the motor';
      var how = frac(st.tm * pt[0], pt[1]);
      report(spec.hide ? 'The motor turned once. Watch the dot on the winch gear: how far did it go, and which way?' : 'The motor turned once; the winch turned ' + how + (st.tm > 1 ? ' times in all, ' : ' of a turn, ') + dir + '.');
    });
  }
  function lift() {
    if (busy()) return;
    if (!st.load) return report('Put a load in the bucket first.');
    B.moved = true;
    var m = model(st.t);
    if (st.load > m.cap + 1e-9) {
      animate(900, function (k) { pose(Math.sin(k * Math.PI * 6) * 4, 0.02 * Math.sin(k * Math.PI)); }, function () {
        st.s = 1; st.l = 0; pose(0, 0);
        report('Stalls: the motor cannot turn the winch with ' + st.load + ' g in the bucket.');
      });
      return;
    }
    var turnsW = spec.height / spec.drum, ms = Math.min(4500, Math.max(1500, m.t * 60));
    animate(ms, function (k) { pose(360 * Math.min(turnsW * m.r, 6) * k % 360, k); }, function () {
      st.s = 0; st.l = 1; pose(0, 1);
      report(spec.hide ? 'Lifted ' + st.load + ' g.' : 'Lifted ' + st.load + ' g ' + B.fmt(spec.height) + ' m in ' + B.fmt(m.t) + ' s.');
    });
  }

  function report(note) {
    var t = st.t, m = model(t), facts = [], np = passing();
    if (!spec.hide) {
      var parts = [];
      spec.links.forEach(function (k, i) { if (k === '>') parts.push(t[i + 1] + ' ÷ ' + t[i]); });
      facts.push('Ratio ' + parts.join(' × ') + ' = ' + B.fmt(m.r));
      facts.push('winch ' + B.fmt(m.rpmw) + ' turns a minute');
      facts.push('lifts up to ' + B.fmt(m.cap) + ' g');
      facts.push(B.fmt(spec.height) + ' m in ' + B.fmt(m.t) + ' s');
      facts.push(m.same ? 'same way as the motor' : 'the other way to the motor');
    } else facts.push('Motor turns: ' + st.tm);
    var crit = '';
    if (!spec.hide && st.load > 0 && st.limit !== null) crit = (m.cap >= st.load - 1e-9 ? '✓' : '✗') + ' lifts ' + st.load + ' g  ' + (m.t <= st.limit + 1e-9 ? '✓' : '✗') + ' within ' + B.fmt(st.limit) + ' s';
    ui.facts.textContent = facts.join(' · ') + (crit ? '  ·  ' + crit : '');
    ui.note.textContent = note || (spec.edit ? (st.load > 0 ? 'Trains from the box (changing the gears you can choose) that meet the brief: ' + np + '.' : 'Set the bucket and the time limit.') : 'No friction in this model: each real mesh loses a little.');
    B.say('Gear train ' + trainText(t) + ' teeth' + (st.load ? ', ' + st.load + ' g in the bucket.' : '.'));
    B.save({ t: t, load: st.load, limit: st.limit, tm: st.tm, tw: st.tw, s: st.s, l: st.l });
    var vars = { r: m.r, r_1: r2(m.sr[0]), r_2: m.sr.length > 1 ? r2(m.sr[1]) : 0, n_stage: m.sr.length, n_mesh: m.nm, same: m.same,
      rpm_w: m.rpmw, cap_g: m.cap, time_s: m.t, load_g: st.load, limit_s: st.limit === null ? 0 : st.limit,
      turns_m: st.tm, turns_w: r2(st.tw), s: st.s, l: st.l, p: m.pass && st.load > 0 ? 1 : 0, n_pass: np };
    for (var i = 0; i < 6; i++) vars['t_' + (i + 1)] = t[i] || 0;
    B.post({ scope: { vars: vars, points: {} } }, trainText(t) + ' teeth' + (note ? '. ' + note : ''));
  }

  B.widget('train', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A gear train from a motor to a winch that lifts a bucket'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = { t: spec.t0.slice(), load: spec.load0, limit: spec.limit0, tm: 0, tw: 0, s: 0, l: 0 };
      if (sv && Array.isArray(sv.t) && sv.t.length === spec.t0.length && sv.t.every(function (v, i) { return spec.kit.indexOf(v) >= 0 && (v === spec.t0[i] || spec.pick.indexOf(i) >= 0); })) {
        st.t = sv.t.slice(); st.tm = sv.tm || 0; st.tw = sv.tw || 0; st.s = sv.s || 0; st.l = sv.l || 0;
        if (spec.addload || spec.edit) st.load = sv.load >= 0 ? sv.load : st.load;
        if (spec.edit && sv.limit > 0) st.limit = sv.limit;
      }
      paintPanel(); draw(); if (st.l) pose(0, 1); report();
    },
  });
})(WPB);
