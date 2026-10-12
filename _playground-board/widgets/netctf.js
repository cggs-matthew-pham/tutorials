// Network capture the flag: four puzzles on the club's own network, each needing one idea from the Networks course.
// Everything is pretend and on the club's own network; nothing is sent anywhere.
//   widget: netctf
//   mode: capture | reorder | lost | route
// mode: capture  A capture of the club Wi-Fi: six packets, each from a club device. Open one to see what anyone on the
//                network could read: HTTPS packets are scrambled, plain ones are readable.
//   fix: on        each device that sends plain text gets two fixes (one right; the wrong one says why)
//   Buttons: "Open packet 3", "Room 12 display: Switch it to HTTPS".
//   Values: o (packets opened), r (readable packets opened), n (packets), u (devices still sending plain text),
//           w (wrong fixes tried)
// mode: reorder  Packets that arrived out of order. Move them (buttons "Move packet 4 earlier" / "later") until the
//                receiver reads them in number order.
//   secret: <base64>   the message (base64, so the setup doesn't show it as text)
//   size: 3            characters a packet
//   Values: s (1 when in number order), m (moves), n (packets)
// mode: lost     Every packet that arrived, in arrival order, numbered. One never arrived.
//   packets: 16    missing: 11
//   Values: n (packets sent), a (arrived)
// mode: route    Eight routers and the delay on each link (ms). Router E is busy and loses packets. Click routers from
//                A to H to build a route (buttons "Router C"; Clear).
//   Values: v (1 when the route reaches H from A), t (total delay, ms), b (1 if it goes through E), p (routers in route)
(function (B) {
  'use strict';
  var spec = null, ui = {}, st = null;
  var MODES = ['capture', 'reorder', 'lost', 'route'];
  var CAP = [
    { dev: 'Ava\'s laptop', to: 'club.school.example', https: true },
    { dev: 'Club printer', to: 'printer (local)', https: false, text: 'PRINT minutes-week-6.pdf for Ms Lee', fixes: ['Turn on encrypted printing', 'Give the printer a dull name'], why: 'Its jobs are still readable, whatever it\'s called.' },
    { dev: 'Ben\'s phone', to: 'mail.example', https: true },
    { dev: 'Room 12 display', to: 'display.club.example', https: false, text: 'status=ok note=WP{plain-text-is-public}', fixes: ['Switch it to HTTPS', 'Send its updates at night'], why: 'Night or day, plain text can be read.' },
    { dev: 'Robot camera', to: 'camera.club.example', https: false, text: 'frame 4411: snapshot of the robot arena', fixes: ['Turn on its encrypted stream', 'Lower its picture quality'], why: 'A blurry picture is still readable.' },
    { dev: 'Leader\'s laptop', to: 'school.example', https: true },
  ];
  // route graph
  var NODES = { A: [30, 120], B: [130, 40], C: [130, 200], D: [250, 40], E: [250, 120], F: [250, 200], G: [370, 120], H: [470, 120] };
  var LINKS = [['A', 'B', 5], ['A', 'C', 4], ['B', 'D', 6], ['B', 'E', 2], ['C', 'E', 3], ['C', 'F', 7], ['D', 'G', 5], ['E', 'G', 2], ['F', 'G', 6], ['D', 'H', 12], ['G', 'H', 3], ['F', 'H', 9]];

  function parse(s) {
    s.m = String(s.mode || 'capture').toLowerCase();
    if (MODES.indexOf(s.m) < 0) throw new Error('mode: ' + MODES.join(', ') + '.');
    s.fixOn = /^on$/i.test(s.fix || '');
    if (s.m === 'reorder') {
      try { s.msg = atob(String(s.secret || btoa('HELLO FROM THE CLUB'))); } catch (e) { throw new Error('secret: the message in base64.'); }
      s.size0 = Math.max(1, Math.min(8, Number(s.size || 3)));
    }
    if (s.m === 'lost') {
      s.count = Math.max(4, Math.min(24, Number(s.packets || 16)));
      s.missing = Number(s.missing || 11);
      if (!(s.missing >= 1 && s.missing <= s.count)) throw new Error('missing: a packet number from 1 to packets.');
    }
  }
  function h(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
  function btn(txt, fn, aria, cls) { var b = h('button', 'shbtn' + (cls ? ' ' + cls : ''), txt); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria); b.addEventListener('click', function () { fn(); B.moved = true; update(); }); return b; }
  // A fixed shuffle (the same every time, so the puzzle is the same for everyone).
  function shuffle(n, seed) { var a = []; for (var i = 0; i < n; i++) a.push(i); var x = seed; for (var j = n - 1; j > 0; j--) { x = (x * 9301 + 49297) % 233280; var k = Math.floor(x / 233280 * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; } return a; }
  function scramble(i) { var s = '', x = 77 + i * 31; for (var k = 0; k < 24; k++) { x = (x * 1103 + 12345) % 65536; s += ('0' + (x % 256).toString(16)).slice(-2) + (k % 2 ? ' ' : ''); } return s.trim(); }

  // ---------- capture ----------
  function drawCapture(wrap) {
    var o = 0, r = 0, u = 0;
    wrap.appendChild(h('p', 'cyintro', spec.fixOn ? 'Fix every club device that sends readable data, so the capture shows nothing but scrambled packets.' : 'A capture of the club Wi-Fi, made with the club\'s permission: what anyone on the network could pick up. Open each packet.'));
    var list = h('div', 'ncrows');
    CAP.forEach(function (p, i) {
      var fixed = !!st.fixed[i], plain = !p.https && !fixed;
      if (plain) u++;
      var opened = !!st.open[i];
      if (opened) { o++; if (plain) r++; }
      var row = h('div', 'cycard' + (opened ? (plain ? ' bad' : ' ok') : ''));
      var head = h('div', 'ncrow'); head.appendChild(h('b', '', (i + 1) + '. ' + p.dev)); head.appendChild(h('span', 'cyaddr', ' → ' + p.to));
      head.appendChild(btn(opened ? 'Close' : 'Open', function () { st.open[i] = !st.open[i]; }, (opened ? 'Close' : 'Open') + ' packet ' + (i + 1), 'small'));
      row.appendChild(head);
      if (opened) row.appendChild(h('code', 'ecout', plain ? p.text : scramble(i)));
      if (opened) row.appendChild(h('div', 'cynote', plain ? 'Readable: sent as plain text.' : 'Scrambled: encrypted (HTTPS). Only the device and the site it talks to can read it.'));
      if (spec.fixOn && !p.https) {
        if (fixed) row.appendChild(h('div', 'cyok', 'Fixed: ' + p.fixes[0] + '.'));
        else {
          var fr = h('div', 'cyrow');
          [1, 0].forEach(function (j) { fr.appendChild(btn(p.fixes[j], function () { if (j === 0) { st.fixed[i] = 1; st.open[i] = 1; } else { st.tried[i] = 1; st.w++; } }, p.dev + ': ' + p.fixes[j], 'small')); });
          row.appendChild(fr);
          if (st.tried[i]) row.appendChild(h('div', 'cynote', 'Not enough: ' + p.why));
        }
      }
      list.appendChild(row);
    });
    wrap.appendChild(list);
    ui.text = spec.fixOn ? u + ' device' + (u === 1 ? '' : 's') + ' still send readable data.' : o + ' of ' + CAP.length + ' packets opened; ' + r + ' readable.';
    return { o: o, r: r, n: CAP.length, u: u, w: st.w };
  }

  // ---------- reorder ----------
  function chunks() { var out = [], m = spec.msg, z = spec.size0; for (var i = 0; i < m.length; i += z) out.push(m.slice(i, i + z)); return out; }
  function drawReorder(wrap) {
    var cs = chunks();
    if (!st.order || st.order.length !== cs.length) st.order = shuffle(cs.length, 7);
    wrap.appendChild(h('p', 'cyintro', 'Packets from the club\'s message server arrived out of order: they took different routes. The receiver joins them in the order shown. Put them back in order.'));
    var list = h('ol', 'ncpk');
    st.order.forEach(function (k, i) {
      var li = h('li', 'ncpkt');
      li.appendChild(h('b', '', 'Packet ' + (k + 1)));
      li.appendChild(h('code', 'ecout', '"' + cs[k] + '"'));
      var bar = h('span', 'cyrow');
      if (i > 0) bar.appendChild(btn('↑', function () { var t = st.order[i - 1]; st.order[i - 1] = st.order[i]; st.order[i] = t; st.moves++; }, 'Move packet ' + (k + 1) + ' earlier', 'small'));
      if (i < st.order.length - 1) bar.appendChild(btn('↓', function () { var t = st.order[i + 1]; st.order[i + 1] = st.order[i]; st.order[i] = t; st.moves++; }, 'Move packet ' + (k + 1) + ' later', 'small'));
      li.appendChild(bar);
      list.appendChild(li);
    });
    wrap.appendChild(list);
    var sorted = st.order.every(function (k, i) { return k === i; }) ? 1 : 0;
    var read = h('div', 'ecnow'); read.appendChild(h('b', '', 'The receiver reads:'));
    read.appendChild(h('code', 'ecout big', st.order.map(function (k) { return cs[k]; }).join(''))); wrap.appendChild(read);
    ui.text = sorted ? 'In number order: the message reads correctly.' : 'Out of order: the message is jumbled.';
    return { s: sorted, m: st.moves, n: cs.length };
  }

  // ---------- lost ----------
  function drawLost(wrap) {
    var n = spec.count, order = shuffle(n, 3).filter(function (k) { return k + 1 !== spec.missing; });
    wrap.appendChild(h('p', 'cyintro', 'The club backup was sent as ' + n + ' numbered packets. These arrived, in the order they arrived. One never did. With TCP, the receiver asks for it again by its number.'));
    var grid = h('div', 'nclost');
    order.forEach(function (k) { grid.appendChild(h('span', 'ncnum', String(k + 1))); });
    wrap.appendChild(grid);
    ui.text = order.length + ' of ' + n + ' packets arrived.';
    return { n: n, a: order.length };
  }

  // ---------- route ----------
  var linkMs = function (a, b) { var l = LINKS.filter(function (x) { return (x[0] === a && x[1] === b) || (x[0] === b && x[1] === a); })[0]; return l ? l[2] : null; };
  function drawRoute(wrap) {
    wrap.appendChild(h('p', 'cyintro', 'The club\'s message goes from router A to router H. Each link shows its delay in milliseconds. Router E is overloaded and loses packets. Click routers, starting at A, to build a route.'));
    var NSV = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NSV, 'svg'); svg.setAttribute('viewBox', '0 0 500 240'); svg.setAttribute('class', 'ncmap'); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Router map. Links: ' + LINKS.map(function (l) { return l[0] + ' to ' + l[1] + ' ' + l[2] + ' ms'; }).join(', ') + '. Router E is busy.');
    var path = st.path;
    var on = function (a, b) { for (var i = 1; i < path.length; i++) if ((path[i - 1] === a && path[i] === b) || (path[i - 1] === b && path[i] === a)) return true; return false; };
    LINKS.forEach(function (l) {
      var p = NODES[l[0]], q = NODES[l[1]];
      var ln = document.createElementNS(NSV, 'line'); ln.setAttribute('x1', p[0]); ln.setAttribute('y1', p[1]); ln.setAttribute('x2', q[0]); ln.setAttribute('y2', q[1]);
      ln.setAttribute('class', 'nclink' + (on(l[0], l[1]) ? ' on' : '')); svg.appendChild(ln);
      var t = document.createElementNS(NSV, 'text'); t.setAttribute('x', (p[0] + q[0]) / 2); t.setAttribute('y', (p[1] + q[1]) / 2 - 5); t.setAttribute('class', 'ncms'); t.textContent = l[2]; svg.appendChild(t);
    });
    Object.keys(NODES).forEach(function (k) {
      var p = NODES[k];
      var c = document.createElementNS(NSV, 'circle'); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); c.setAttribute('r', 16);
      c.setAttribute('class', 'ncnode' + (k === 'E' ? ' busy' : '') + (path.indexOf(k) >= 0 ? ' on' : '')); svg.appendChild(c);
      var t = document.createElementNS(NSV, 'text'); t.setAttribute('x', p[0]); t.setAttribute('y', p[1] + 5); t.setAttribute('class', 'nclab'); t.textContent = k; svg.appendChild(t);
    });
    wrap.appendChild(svg);
    var bar = h('div', 'shbar');
    Object.keys(NODES).forEach(function (k) {
      bar.appendChild(btn(k, function () {
        var last = path[path.length - 1];
        if (!path.length) { if (k === 'A') st.path = ['A']; else st.note = 'Start at A.'; return; }
        if (path.indexOf(k) >= 0) { st.note = k + ' is already in the route.'; return; }
        if (linkMs(last, k) === null) { st.note = 'There\'s no link from ' + last + ' to ' + k + '.'; return; }
        st.note = ''; st.path = path.concat([k]);
      }, 'Router ' + k));
    });
    bar.appendChild(btn('Clear', function () { st.path = []; st.note = ''; }, 'Clear the route'));
    wrap.appendChild(bar);
    var t = 0; for (var i = 1; i < path.length; i++) t += linkMs(path[i - 1], path[i]);
    var v = path[0] === 'A' && path[path.length - 1] === 'H' ? 1 : 0, b = path.indexOf('E') >= 0 ? 1 : 0;
    var res = h('p', 'srres', path.length ? 'Route ' + path.join(' → ') + ': ' + t + ' ms' + (v ? (b ? '. Through E: packets get lost, so they have to be sent again.' : '. Every packet arrives.') : '.') : 'No route yet.');
    wrap.appendChild(res);
    if (st.note) wrap.appendChild(h('p', 'ecnote', st.note));
    ui.text = res.textContent;
    return { v: v, t: t, b: b, p: path.length };
  }

  function update() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = h('div', 'cywrap');
    var vars = spec.m === 'capture' ? drawCapture(wrap) : spec.m === 'reorder' ? drawReorder(wrap) : spec.m === 'lost' ? drawLost(wrap) : drawRoute(wrap);
    host.appendChild(wrap);
    ui.work.textContent = ui.text; B.say(ui.text);
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, ui.text);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = h('p', 'rulework'); ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = h('div', 'gbar bbar'); var again = h('button', 'quiet', 'Start again'); again.type = 'button'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function blank() { return { open: {}, fixed: {}, tried: {}, w: 0, order: null, moves: 0, path: [], note: '' }; }

  B.widget('netctf', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Network capture the flag'; },
    parse: parse,
    redraw: function () { if (spec) update(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = sv && sv.st ? Object.assign(blank(), sv.st) : blank();
      paintPanel(); update();
    },
  });
})(WPB);
