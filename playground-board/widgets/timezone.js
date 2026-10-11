// Time zones: the same moment in several cities, each on its own 24-hour line, in 24-hour and 12-hour time with the day.
// Optionally a flight (or a call) from the first city: its length, and the arrival time where it lands.
//   widget: timezone
//   cities: Sydney +11; Perth +8; London +1     2 to 4 cities, each with its offset from UTC in hours (+5.5 is fine)
//   slider t: 0, 23.75, 9, 0.25                 the time in the first city, in hours after midnight (9.5 is 9:30)
//   day: Monday                                 the first city's day (default Monday)
//   flight: on                                  adds slider f (the flight's length, hours; default 0.5, 24, 8, 0.5):
//                                               it leaves the first city at t and lands in the last city
//   slider f: 1, 24, 10, 0.5                    (optional) the flight slider's range
// state: { scope: { vars: { t, u, v, w (the time in the 2nd, 3rd, 4th city, hours 0 to under 24), x, y, z (their day
//   compared with the first city's: -1, 0 or 1), f (flight hours), a (arrival time in the last city), b (arrival day
//   compared with the departure day) } } }
// Checks: "u = 20 and x = -1", "a = 6.5 and b = 1", "t = 14".
(function (B) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var spec = null, vars = {}, ui = {};
  function nums(t, where) { return String(t).split(',').map(function (x) { var v = Number(x.trim()); if (!isFinite(v)) throw new Error(where + ': "' + x.trim() + '" is not a number.'); return v; }); }
  function parse(s) {
    if (!s.cities) throw new Error('cities: list 2 to 4 cities with their UTC offsets, such as "Sydney +11; London +1".');
    s.cs = String(s.cities).split(';').map(function (c, i) {
      var m = /^\s*(.+?)\s+([+−-]\s*\d+(?:\.\d+)?)\s*$/.exec(c);
      if (!m) throw new Error('cities: city ' + (i + 1) + ' needs a name and an offset, such as "Tokyo +9".');
      return { name: m[1], off: Number(m[2].replace('−', '-').replace(/\s/g, '')) };
    });
    if (s.cs.length < 2 || s.cs.length > 4) throw new Error('cities: 2 to 4 cities.');
    s.sl = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'slider') return;
      if (it.name !== 't' && it.name !== 'f') throw new Error('Line ' + it.line + ': the time zone board has sliders t (the time) and f (the flight) only.');
      var v = nums(it.value, 'slider ' + it.name);
      if (v.length < 3 || !(v[0] < v[1]) || v[2] < v[0] || v[2] > v[1]) throw new Error('slider ' + it.name + ': min, max, start, and an optional step.');
      s.sl[it.name] = { min: v[0], max: v[1], start: v[2], step: v[3] || 0.25 };
    });
    if (!s.sl.t) s.fixT = s.t !== undefined ? nums(s.t, 't')[0] : 9;
    s.flight = /^on$/i.test(s.flight || '');
    if (s.flight && !s.sl.f) s.sl.f = s.f !== undefined ? null : { min: 0.5, max: 24, start: 8, step: 0.5 };
    if (s.flight && !s.sl.f) s.fixF = nums(s.f, 'f')[0];
    var d = DAYS.findIndex(function (x) { return x.toLowerCase().indexOf(String(s.day || 'Monday').trim().toLowerCase().slice(0, 3)) === 0; });
    if (d < 0) throw new Error('day: a day of the week, such as Monday.');
    s.d0 = d;
  }
  var mod = function (v) { return ((v % 24) + 24) % 24; };
  var r4 = function (v) { return Math.round(v * 10000) / 10000; };
  function hhmm(h) { h = mod(h); var H = Math.floor(h + 1e-9), M = Math.round((h - H) * 60); if (M === 60) { H = (H + 1) % 24; M = 0; } return (H < 10 ? '0' : '') + H + ':' + (M < 10 ? '0' : '') + M; }
  function twelve(h) { h = mod(h); var H = Math.floor(h + 1e-9), M = Math.round((h - H) * 60); if (M === 60) { H = (H + 1) % 24; M = 0; } var ap = H < 12 ? 'am' : 'pm', h12 = H % 12 === 0 ? 12 : H % 12; return h12 + ':' + (M < 10 ? '0' : '') + M + ' ' + ap; }
  var dayName = function (k) { return DAYS[((spec.d0 + k) % 7 + 7) % 7]; };
  var offTxt = function (o) { return 'UTC' + (o < 0 ? '−' : '+') + (Math.abs(o) % 1 ? Math.floor(Math.abs(o)) + ':' + (Math.abs(o) % 1 * 60) : Math.abs(o)); };

  function times() {
    // every city's local time and day shift for the moment t in city 1; and the flight's arrival
    var c0 = spec.cs[0], utc = vars.t - c0.off;
    var out = spec.cs.map(function (c) { var raw = utc + c.off; return { h: mod(raw), k: Math.floor(raw / 24 + 1e-9) }; });
    var arr = null;
    if (spec.flight) { var last = spec.cs[spec.cs.length - 1], raw = vars.t + vars.f - c0.off + last.off; arr = { h: mod(raw), k: Math.floor(raw / 24 + 1e-9) }; }
    return { out: out, arr: arr };
  }

  function draw(T) {
    var el = B.el('board'); el.replaceChildren(); el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('role', 'img');
    svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
    var add = function (tag, at, text) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (k) { e.setAttribute(k, at[k]); }); if (text !== undefined) e.textContent = text; svg.appendChild(e); return e; };
    var ink = B.css('--ink') || '#1d2430', blue = B.css('--left') || '#2f6fb3', orange = B.css('--accent') || '#c2570a', muted = B.css('--muted') || '#5d6675', line = B.css('--line') || '#d9dde3', card = B.css('--card') || '#fff';
    var n = spec.cs.length, rowH = 96, W = 900, L0 = 190, L1 = 860, H = n * rowH + 40;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var X = function (h) { return L0 + (L1 - L0) * h / 24; };
    var font = { 'font-family': 'system-ui, sans-serif' };
    var tx = function (x, y, t, at) { return add('text', Object.assign({ x: x, y: y, 'dominant-baseline': 'middle' }, font, at || {}), t); };
    spec.cs.forEach(function (c, i) {
      var y = 30 + i * rowH + 40, o = T.out[i];
      tx(16, y - 14, c.name, { 'font-size': 20, 'font-weight': 700, fill: ink });
      tx(16, y + 12, offTxt(c.off), { 'font-size': 15, fill: muted });
      // night and day shading on the 24-hour line
      add('rect', { x: X(0), y: y - 14, width: X(6) - X(0), height: 28, fill: muted, 'fill-opacity': 0.14 });
      add('rect', { x: X(18), y: y - 14, width: X(24) - X(18), height: 28, fill: muted, 'fill-opacity': 0.14 });
      add('rect', { x: X(0), y: y - 14, width: X(24) - X(0), height: 28, fill: 'none', stroke: line, 'stroke-width': 1.5 });
      for (var h = 0; h <= 24; h += 3) { add('line', { x1: X(h), y1: y + 14, x2: X(h), y2: y + 20, stroke: muted, 'stroke-width': 1 }); tx(X(h), y + 30, String(h), Object.assign({ 'text-anchor': 'middle', 'font-size': 12, fill: muted })); }
      var xm = X(o.h);
      add('line', { x1: xm, y1: y - 22, x2: xm, y2: y + 16, stroke: i === 0 ? blue : orange, 'stroke-width': 4 });
      var lab = hhmm(o.h) + ' ' + dayName(o.k).slice(0, 3);
      var right = xm > L1 - 110;
      add('rect', { x: right ? xm - 116 : xm + 6, y: y - 38, width: 110, height: 24, rx: 5, fill: card, stroke: i === 0 ? blue : orange, 'stroke-width': 1.5 });
      tx(right ? xm - 61 : xm + 61, y - 26, lab, { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: ink });
      if (T.arr && i === n - 1) {
        var xa = X(T.arr.h);
        add('circle', { cx: xa, cy: y, r: 9, fill: card, stroke: ink, 'stroke-width': 3 });
        tx(xa, y + 46, 'lands ' + hhmm(T.arr.h) + ' ' + dayName(T.arr.k).slice(0, 3), { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, fill: ink });
      }
    });
    svg.setAttribute('aria-label', spec.cs.map(function (c, i) { return c.name + ' ' + hhmm(T.out[i].h) + ' ' + dayName(T.out[i].k); }).join('; ') + (T.arr ? '. The flight lands at ' + hhmm(T.arr.h) + ' ' + dayName(T.arr.k) + '.' : '.'));
    el.appendChild(svg);
  }

  function slider(nm, label, fmt) {
    var sl = spec.sl[nm], row = document.createElement('div'); row.className = 'srow';
    var lab = document.createElement('label'); lab.className = 'vname'; lab.textContent = nm; lab.htmlFor = 'sl-' + nm;
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Make ' + label + ' earlier');
    var rr = document.createElement('input'); rr.type = 'range'; rr.id = 'sl-' + nm; rr.min = sl.min; rr.max = sl.max; rr.step = sl.step; rr.value = vars[nm];
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Make ' + label + ' later');
    if (nm === 'f') { minus.setAttribute('aria-label', 'Make the flight shorter'); plus.setAttribute('aria-label', 'Make the flight longer'); }
    var out = document.createElement('output'); out.htmlFor = rr.id;
    var set = function (v) { v = Math.max(sl.min, Math.min(sl.max, Math.round((v - sl.min) / sl.step) * sl.step + sl.min)); vars[nm] = r4(v); rr.value = vars[nm]; B.moved = true; report(); };
    rr.addEventListener('input', function () { set(Number(rr.value)); });
    minus.addEventListener('click', function () { set(vars[nm] - sl.step); });
    plus.addEventListener('click', function () { set(vars[nm] + sl.step); });
    row.append(lab, minus, rr, plus, out); ui.outs.push({ n: nm, out: out, fmt: fmt });
    return row;
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui = { outs: [] };
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    ui.note = document.createElement('p'); ui.note.className = 'tcount'; ui.note.id = 'gnote'; ui.note.setAttribute('aria-live', 'polite'); panel.appendChild(ui.note);
    if (spec.sl.t) panel.appendChild(slider('t', 'the time in ' + spec.cs[0].name, function (v) { return hhmm(v); }));
    if (spec.flight && spec.sl.f) panel.appendChild(slider('f', 'the flight', function (v) { var H = Math.floor(v), M = Math.round((v - H) * 60); return H + ' h' + (M ? ' ' + M + ' min' : ''); }));
    if (spec.sl.t || spec.sl.f) {
      var bar = document.createElement('div'); bar.className = 'gbar';
      var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.addEventListener('click', B.restart);
      bar.appendChild(again); panel.appendChild(bar);
    }
  }

  function report() {
    ui.outs.forEach(function (o) { o.out.textContent = o.n + ' = ' + o.fmt(vars[o.n]); });
    var T = times(); draw(T);
    var c0 = spec.cs[0];
    var parts = spec.cs.map(function (c, i) {
      var o = T.out[i], diff = c.off - c0.off;
      return c.name + ' ' + hhmm(o.h) + ' (' + twelve(o.h) + ') ' + dayName(o.k) + (i ? ', ' + (diff === 0 ? 'same time' : Math.abs(diff) + ' h ' + (diff > 0 ? 'ahead' : 'behind')) : '');
    });
    ui.work.textContent = parts[0] + ' → ' + parts.slice(1).join('; ');
    var note = '';
    if (T.arr) {
      var last = spec.cs[spec.cs.length - 1], diff = last.off - c0.off;
      note = 'Leave ' + c0.name + ' ' + hhmm(vars.t) + ' ' + dayName(0) + ', fly ' + B.fmt(vars.f) + ' h: that is ' + hhmm(vars.t + vars.f) + ' ' + dayName(Math.floor((vars.t + vars.f) / 24 + 1e-9)) + ' in ' + c0.name + '; ' +
        (diff === 0 ? 'the same in ' : (diff > 0 ? 'add ' : 'take away ') + Math.abs(diff) + ' h for ') + last.name + ': lands ' + hhmm(T.arr.h) + ' (' + twelve(T.arr.h) + ') ' + dayName(T.arr.k) + '.';
    } else note = 'Each city is shown at the same moment. A city ahead (a bigger offset) has a later time.';
    ui.note.textContent = note;
    B.say(ui.work.textContent + '. ' + note);
    B.save({ vars: vars });
    var sc = { t: vars.t, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, f: vars.f || 0, a: 0, b: 0 };
    ['u', 'v', 'w'].forEach(function (k, i) { if (T.out[i + 1]) { sc[k] = r4(T.out[i + 1].h); sc['xyz'[i]] = T.out[i + 1].k; } });
    if (T.arr) { sc.a = r4(T.arr.h); sc.b = T.arr.k; }
    B.post({ scope: { vars: sc, points: {} } }, ui.work.textContent + '. ' + note);
  }

  B.widget('timezone', {
    sections: ['board', 'gpanel'],
    label: function () { return 'The same moment in several time zones'; },
    parse: parse,
    redraw: function () { if (spec) report(); },
    resize: function () { if (spec) report(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      vars = { t: spec.sl.t ? spec.sl.t.start : spec.fixT };
      if (spec.flight) vars.f = spec.sl.f ? spec.sl.f.start : spec.fixF;
      if (sv && sv.vars) Object.keys(vars).forEach(function (k) { if (sv.vars[k] !== undefined && spec.sl[k]) vars[k] = sv.vars[k]; });
      paintPanel(); report();
    },
  });
})(WPB);
