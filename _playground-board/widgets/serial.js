// Serial: a micro:bit plugged into this computer by USB. Numbers it sends are graphed live; buttons send words to it.
//   widget: serial
//   plot: light, temperature    which values to graph (default: every name:value line that arrives)
//   window: 20                  seconds of data shown on the graph (default 20)
//   button Happy: happy         a button labelled Happy that sends the line "happy" (any number of buttons)
//   text: on                    a box to type any line and send it
// The micro:bit sends a value with MakeCode's "serial write value" (a line such as light:128); any other line is shown
// in the message list. Web Serial: Chrome or Edge on a laptop or Chromebook, 115200 baud.
// state: { scope: { vars } }. vars (each name has an underscore): n_lines (lines received), n_sent, n_names (how many
// different values arrived), and per value in_<name> (latest), min_<name>, max_<name>, n_<name> (how many readings);
// per word sent, sent_<word>.
(function (B) {
  'use strict';
  var spec = null, st = null, timer = 0;
  var COLORS = ['--left', '--right', '--accent', '--ok'];

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function key(s) { return String(s).trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''); }
  function list(v) { return String(v || '').split(',').map(function (t) { return key(t); }).filter(Boolean); }
  var SVG = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) { var e = document.createElementNS(SVG, tag); Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); }); return e; }

  function parse(s) {
    s.plotNames = list(s.plot);
    s.win = s.window === undefined ? 20 : Number(s.window);
    if (!(s.win >= 2 && s.win <= 600)) throw new Error('window: seconds of data to show, from 2 to 600.');
    s.buttons = s.items.filter(function (it) { return it.kind === 'button'; }).map(function (it) {
      if (!it.name || !it.value) throw new Error('Line ' + it.line + ': write a button as "button Happy: happy" (its label, then the line it sends).');
      return { label: it.name.replace(/_/g, ' '), send: it.value };
    });
    s.textOn = s.text === 'on';
  }

  function heard(line) {
    var t = (Date.now() - st.t0) / 1000;
    st.lines++; st.log.unshift('← ' + line); st.log.length = Math.min(st.log.length, 8);
    var nv = B.nameValue(line);
    if (nv) {
      var n = key(nv[0]), v = nv[1], s = st.series[n];
      if (!s) { s = st.series[n] = { pts: [], min: v, max: v, n: 0 }; st.order.push(n); }
      s.pts.push([t, v]); s.n++; s.min = Math.min(s.min, v); s.max = Math.max(s.max, v); s.last = v;
      if (s.pts.length > 2000) s.pts.shift();
    }
    B.moved = true; st.dirty = true;
  }

  function send(text) {
    if (!B.serial.send(text)) { st.msg = 'Connect a micro:bit first.'; paint(); return; }
    st.sent++; st.sentBy[key(text)] = (st.sentBy[key(text)] || 0) + 1;
    st.log.unshift('→ ' + text); st.log.length = Math.min(st.log.length, 8);
    B.moved = true; paint(); report();
  }

  function shown() { return spec.plotNames.length ? spec.plotNames : st.order; }

  function chart() {
    var W = 600, H = 220, P = 34, box = svg('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'srchart', role: 'img' });
    var names = shown().filter(function (n) { return st.series[n]; });
    box.setAttribute('aria-label', names.length ? 'A graph of ' + names.join(' and ') : 'An empty graph: no values yet');
    box.appendChild(svg('rect', { x: P, y: 8, width: W - P - 8, height: H - 30, class: 'srframe' }));
    if (!names.length) {
      var e = svg('text', { x: W / 2, y: H / 2, 'text-anchor': 'middle', class: 'srnote' }); e.textContent = B.serial.connected() ? 'Waiting for values from the micro:bit…' : 'Connect a micro:bit to see its values here.';
      box.appendChild(e); return box;
    }
    var tNow = (Date.now() - st.t0) / 1000, t0 = Math.max(0, tNow - spec.win), lo = Infinity, hi = -Infinity;
    names.forEach(function (n) { st.series[n].pts.forEach(function (p) { if (p[0] >= t0) { lo = Math.min(lo, p[1]); hi = Math.max(hi, p[1]); } }); });
    if (lo === Infinity) { lo = 0; hi = 1; }
    if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
    var x = function (t) { return P + (t - t0) / spec.win * (W - P - 8); }, y = function (v) { return H - 22 - (v - lo) / (hi - lo) * (H - 34); };
    [[lo, H - 22], [hi, 12]].forEach(function (a) { var e = svg('text', { x: P - 4, y: a[1] + 4, 'text-anchor': 'end', class: 'srtick' }); e.textContent = B.fmt(a[0]); box.appendChild(e); });
    var lab = svg('text', { x: W - 8, y: H - 6, 'text-anchor': 'end', class: 'srtick' }); lab.textContent = 'last ' + spec.win + ' s'; box.appendChild(lab);
    names.forEach(function (n, i) {
      var pts = st.series[n].pts.filter(function (p) { return p[0] >= t0; });
      if (!pts.length) return;
      box.appendChild(svg('polyline', { points: pts.map(function (p) { return x(p[0]).toFixed(1) + ',' + y(p[1]).toFixed(1); }).join(' '), class: 'srline', style: 'stroke: var(' + COLORS[i % COLORS.length] + ')' }));
    });
    return box;
  }

  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var wrap = el('div', 'clwrap'), row = el('div', 'clrow');
    var on = B.serial.connected(), cb = el('button', on ? 'quiet' : 'go', on ? 'micro:bit connected' : 'Connect a micro:bit'); cb.type = 'button'; cb.disabled = on;
    cb.addEventListener('click', function () { B.serial.connect(function (m) { st.msg = m; paint(); report(); }); });
    row.appendChild(cb);
    spec.buttons.forEach(function (b) { var e = el('button', 'quiet', b.label); e.type = 'button'; e.title = 'Sends "' + b.send + '"'; e.addEventListener('click', function () { send(b.send); }); row.appendChild(e); });
    wrap.appendChild(row);
    if (spec.textOn) {
      var tr = el('div', 'clrow'), inp = el('input', 'cllink'); inp.type = 'text'; inp.id = 'srtext'; inp.placeholder = 'Type a line to send'; inp.setAttribute('aria-label', 'A line to send to the micro:bit');
      var sb = el('button', 'go', 'Send'); sb.type = 'button';
      var go = function () { if (inp.value.trim()) { send(inp.value.trim()); B.el('srtext').focus(); } };
      sb.addEventListener('click', go); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
      tr.append(inp, sb); wrap.appendChild(tr);
    }
    if (st.msg) wrap.appendChild(el('p', 'clmsg', st.msg));
    var cw = el('div', 'srwrap'); cw.id = 'srchart'; cw.appendChild(chart()); wrap.appendChild(cw);
    var vals = el('div', 'srvals'); vals.id = 'srvals'; fillVals(vals); wrap.appendChild(vals);
    var lg = el('ol', 'cllog'); lg.id = 'srlog'; lg.setAttribute('aria-label', 'Messages to and from the micro:bit'); fillLog(lg); wrap.appendChild(lg);
    panel.appendChild(wrap);
  }
  function fillVals(box) {
    box.replaceChildren();
    shown().forEach(function (n, i) {
      var s = st.series[n], d = el('div', 'clscore');
      var sw = el('i', 'srkey'); sw.style.background = 'var(' + COLORS[i % COLORS.length] + ')';
      d.append(el('b', '', n), sw, el('span', '', s ? B.fmt(s.last) + '  (min ' + B.fmt(s.min) + ', max ' + B.fmt(s.max) + ')' : 'no readings yet'));
      box.appendChild(d);
    });
  }
  function fillLog(lg) { lg.replaceChildren(); st.log.forEach(function (l) { lg.appendChild(el('li', '', l)); }); lg.hidden = !st.log.length; }

  // Values arrive many times a second: redraw the graph, values and messages at most 5 times a second.
  function tick() {
    if (!st || !st.dirty) return;
    st.dirty = false;
    var c = B.el('srchart'); if (c) c.replaceChildren(chart());
    var v = B.el('srvals'); if (v) fillVals(v);
    var l = B.el('srlog'); if (l) fillLog(l);
    report();
  }

  function report() {
    var v = { n_lines: st.lines, n_sent: st.sent, n_names: st.order.length };
    st.order.forEach(function (n) { var s = st.series[n]; v['in_' + n] = s.last; v['min_' + n] = s.min; v['max_' + n] = s.max; v['n_' + n] = s.n; });
    Object.keys(st.sentBy).forEach(function (w) { v['sent_' + w] = st.sentBy[w]; });
    var out = st.lines + ' lines received, ' + st.sent + ' sent' + (st.order.length ? '. ' + st.order.map(function (n) { return n + ' ' + B.fmt(st.series[n].last); }).join(', ') : '');
    B.say(B.serial.connected() ? out : 'Plug in a micro:bit, then Connect.', false);
    B.post({ scope: { vars: v, points: {} } }, out);
  }

  B.widget('serial', {
    sections: ['gpanel'],
    label: function () { return 'Values from a micro:bit, and messages to it'; },
    parse: parse,
    start: function () {
      spec = B.spec;
      st = { t0: Date.now(), lines: 0, sent: 0, sentBy: {}, series: {}, order: [], log: [], msg: '', dirty: false };
      B.serial.listen(heard);
      clearInterval(timer); timer = setInterval(tick, 200);
      paint(); report();
    },
    redraw: function () { if (st) paint(); },
  });
})(WPB);
