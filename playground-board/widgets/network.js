// Networks: links, packets, eavesdroppers and the journey across the internet. One widget, four modes.
//   widget: network
//   mode: link | packets | snoop | journey
// mode: link     Two computers and a link. Speed (bandwidth), delay (latency), packets lost, and the time to send a
//                file. A simple model (stated in teacher notes): cable 1000 Mb/s, 1 ms, 0% lost; Wi-Fi up to 300 Mb/s,
//                slower and less reliable with distance and walls; mobile (4G) 50 Mb/s, 40 ms, 1% lost.
//   link: wired          wired | wifi | mobile (the start; buttons switch it unless choose: off)
//   file: 50             file size in megabytes (MB)
//   distance: 5          metres (Wi-Fi only; slider 1 to 60)
//   walls: 0             walls in the way (Wi-Fi only; slider 0 to 4)
//   Values: w (1 wired, 2 Wi-Fi, 3 mobile), b (Mb/s), l (ms), p (% lost), s (seconds for the file), d, k (walls).
// mode: packets  A message split into numbered packets, sent through six routers. Packets take different routes, so
//                they can arrive out of order; the receiver puts them back in order by number. Click a link to break
//                it (packets go round). A lost packet is asked for again when TCP is on.
//   message: HELLO WORLD  (up to 40 characters)
//   size: 3              characters a packet (sizes: on adds a slider, 1 to 12)
//   drop: 2              the packet that a busy router loses on its first try (0 for none)
//   tcp: on              on | off (choose: on adds a TCP switch)
//   numbers: on          on | off: off sends packets with no numbers, so the receiver joins them in arrival order and
//                        TCP can't tell which one is missing (first used by the 5E Packets lesson)
//   switches: numbers, tcp   adds a switch for each (choose: on is the same as switches: tcp)
//   Values: n (packets), a (packets arrived), o (1 if they arrived out of order), r (packets sent again),
//           k (1 when the whole message arrived correctly), x (broken links), t (1 TCP on), f (sends so far),
//           q (1 packets numbered).
// mode: snoop    The message goes through a café Wi-Fi where someone else is listening. Eve's panel shows what she
//                can read. Encrypt (a shift of every letter and digit by the key) makes it unreadable without the key.
//   message: PIN 4821    encrypt: off    key: 3
//   Values: e (1 encryption on), s (key), v (1 if Eve could read the last message), k (1 delivered and decrypted),
//           f (sends so far).
// mode: journey  The whole trip: laptop, Wi-Fi, home router, fibre, the internet provider, two routes, the shop.
//                A step log lists what happened: encrypted (HTTPS), split, wireless then wired, a packet lost and sent
//                again (TCP), reassembled, decrypted.
//   message: CARD 4111 2222   https: on   drop: 2
//   Values: h (1 HTTPS), k, r, v, f, n.
// Checks: "w = 1", "s < 2", "o = 1", "k = 1 and r > 0", "x > 0 and k = 1", "e = 1 and v = 0 and k = 1", "h = 1 and k = 1".
(function (B) {
  'use strict';
  var spec = null, st = {}, ui = {}, timers = [], raf = 0, pk = [];
  var NS = 'http://www.w3.org/2000/svg';
  var MODES = ['link', 'packets', 'snoop', 'journey'];

  function parse(s) {
    s.m = String(s.mode || 'packets').toLowerCase();
    if (MODES.indexOf(s.m) < 0) throw new Error('mode: link, packets, snoop or journey.');
    var sw = String(s.switches || '').toLowerCase();
    s.chooseTcp = (/^on$/i.test(s.choose || '') || /\btcp\b/.test(sw)) && s.m === 'packets';
    s.chooseNum = /\bnumbers\b/.test(sw) && s.m === 'packets';
    s.num0 = !/^off$/i.test(s.numbers || '');
    s.choose = !/^off$/i.test(s.choose || '');
    s.link0 = String(s.link || 'wired').toLowerCase();
    if (['wired', 'wifi', 'mobile'].indexOf(s.link0) < 0) throw new Error('link: wired, wifi or mobile.');
    s.file0 = s.file === undefined ? 50 : Number(s.file);
    s.dist0 = s.distance === undefined ? 5 : Number(s.distance);
    s.walls0 = s.walls === undefined ? 0 : Number(s.walls);
    s.msg = String(s.message || (s.m === 'snoop' ? 'PIN 4821' : s.m === 'journey' ? 'CARD 4111 2222' : 'HELLO WORLD')).toUpperCase().slice(0, 40);
    s.size0 = s.size === undefined ? (s.m === 'journey' || s.m === 'snoop' ? 4 : 3) : Number(s.size);
    if (!(s.size0 >= 1 && s.size0 <= 12)) throw new Error('size: 1 to 12 characters a packet.');
    s.sizes = /^on$/i.test(s.sizes || '');
    s.drop0 = s.drop === undefined ? (s.m === 'snoop' ? 0 : 2) : Number(s.drop);
    s.tcp0 = !/^off$/i.test(s.tcp || '');
    s.enc0 = /^on$/i.test(s.encrypt || '');
    s.key0 = s.key === undefined ? 3 : Number(s.key);
    s.https0 = !/^off$/i.test(s.https || '');
  }

  // ---------- link mode ----------
  function linkModel() {
    var w = st.link, b, l, p;
    if (w === 'wired') { b = 1000; l = 1; p = 0; }
    else if (w === 'mobile') { b = 50; l = 40; p = 1; }
    else {
      b = 300 * Math.max(0.05, 1 - st.dist / 70) * Math.pow(0.6, st.walls);
      l = 4 + st.walls * 2 + Math.round(st.dist / 15);
      p = Math.min(30, 1 + st.walls * 3 + Math.max(0, st.dist - 35) / 3);
    }
    b = Math.round(b); p = Math.round(p * 10) / 10;
    var s = Math.round(st.file * 8 / b / (1 - p / 100) * 10) / 10;
    return { b: b, l: l, p: p, s: s };
  }

  // ---------- graphs ----------
  var GRAPHS = {
    packets: {
      nodes: { S: [50, 150, 'You', 'pc'], A: [180, 70, 'A', 'router'], B: [180, 230, 'B', 'router'], C: [330, 100, 'C (busy)', 'router'], D: [330, 230, 'D', 'router'], E: [470, 160, 'E', 'router'], R: [600, 160, 'Friend', 'pc'] },
      links: [['S', 'A'], ['S', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'E'], ['E', 'R']],
      from: 'S', to: 'R', slow: { C: 2.2 }, dropAt: 'C',
    },
    snoop: {
      nodes: { S: [50, 160, 'You', 'pc'], W: [190, 160, 'Café Wi-Fi', 'router'], H: [330, 160, 'Router', 'router'], I: [470, 160, 'Internet', 'router'], R: [600, 160, 'Bank', 'server'] },
      links: [['S', 'W', 'air'], ['W', 'H'], ['H', 'I'], ['I', 'R']],
      from: 'S', to: 'R', slow: {}, dropAt: null, eve: 'W',
    },
    journey: {
      nodes: { S: [45, 170, 'Laptop', 'pc'], W: [170, 170, 'Home router', 'router'], P: [300, 170, 'Provider', 'router'], X: [440, 90, 'Router X', 'router'], Y: [440, 250, 'Router Y (busy)', 'router'], R: [600, 170, 'Shop', 'server'] },
      links: [['S', 'W', 'air'], ['W', 'P'], ['P', 'X'], ['P', 'Y'], ['X', 'R'], ['Y', 'R']],
      from: 'S', to: 'R', slow: { Y: 1.6 }, dropAt: 'Y', eve: 'S-W',
    },
  };
  var G = function () { return GRAPHS[spec.m]; };
  var lkey = function (a, b) { return a < b ? a + '-' + b : b + '-' + a; };
  function paths() {
    var g = G(), out = [], adj = {};
    g.links.forEach(function (l) { if (st.broken[lkey(l[0], l[1])]) return; (adj[l[0]] = adj[l[0]] || []).push(l[1]); (adj[l[1]] = adj[l[1]] || []).push(l[0]); });
    (function walk(n, seen) {
      if (n === g.to) { out.push(seen.slice()); return; }
      (adj[n] || []).forEach(function (m) { if (seen.indexOf(m) < 0 && seen.length < 7) { seen.push(m); walk(m, seen); seen.pop(); } });
    })(g.from, [g.from]);
    out.sort(function (a, b) { return a.length - b.length; });
    return out.filter(function (p) { return p.length <= out[0].length + 1; });   // short routes only
  }

  // Shift letters and digits by the key (a Caesar cipher on both).
  function shift(t, k) {
    return t.split('').map(function (c) {
      var A = c.charCodeAt(0);
      if (A >= 65 && A <= 90) return String.fromCharCode(65 + ((A - 65 + k) % 26 + 26) % 26);
      if (A >= 48 && A <= 57) return String.fromCharCode(48 + ((A - 48 + k) % 10 + 10) % 10);
      return c;
    }).join('');
  }
  var encOn = function () { return spec.m === 'snoop' ? st.enc && st.key % 26 !== 0 : spec.m === 'journey' ? st.https : false; };
  var keyOf = function () { return spec.m === 'snoop' ? st.key : 7; };

  function el(tag, at, parent) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; }
  function txt(x, y, t, cls, parent) { var e = el('text', { x: x, y: y, class: cls, 'text-anchor': 'middle' }, parent); e.textContent = t; return e; }

  function icon(kind, x, y, parent) {
    if (kind === 'pc') { el('rect', { x: x - 20, y: y - 16, width: 40, height: 26, rx: 3, class: 'nwbox' }, parent); el('rect', { x: x - 26, y: y + 12, width: 52, height: 6, rx: 2, class: 'nwbox' }, parent); }
    else if (kind === 'server') { el('rect', { x: x - 16, y: y - 24, width: 32, height: 46, rx: 4, class: 'nwbox' }, parent); el('line', { x1: x - 10, x2: x + 10, y1: y - 10, y2: y - 10, class: 'nwthin' }, parent); el('line', { x1: x - 10, x2: x + 10, y1: y + 4, y2: y + 4, class: 'nwthin' }, parent); }
    else el('circle', { cx: x, cy: y, r: 17, class: 'nwbox' }, parent);
  }

  // ---------- drawing ----------
  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'nwwrap';
    var svg = el('svg', { viewBox: '0 0 650 300', class: 'nwsvg', role: 'img' }); ui.svg = svg;
    wrap.appendChild(svg);
    ui.side = document.createElement('div'); ui.side.className = 'nwside'; ui.side.setAttribute('aria-live', 'polite');
    wrap.appendChild(ui.side);
    host.appendChild(wrap);
    if (spec.m === 'link') drawLink(); else drawGraph();
  }

  function drawLink() {
    var svg = ui.svg, m = linkModel(); svg.replaceChildren();
    icon('pc', 90, 150, svg); txt(90, 190, 'Laptop', 'nwlab', svg);
    icon(st.link === 'mobile' ? 'server' : 'router', 560, 150, svg); txt(560, 195, st.link === 'mobile' ? 'Phone tower' : 'Router', 'nwlab', svg);
    if (st.link === 'wired') el('line', { x1: 120, y1: 150, x2: 540, y2: 150, class: 'nwcable' }, svg);
    else {
      for (var i = 0; i < 4; i++) el('path', { d: 'M' + (150 + i * 22) + ' 120 q 14 30 0 60', class: 'nwwave' }, svg);
      for (var j = 0; j < 4; j++) el('path', { d: 'M' + (510 - j * 22) + ' 120 q -14 30 0 60', class: 'nwwave' }, svg);
      if (st.link === 'wifi') for (var w = 0; w < st.walls; w++) el('rect', { x: 300 + w * 18 - st.walls * 9, y: 105, width: 10, height: 90, class: 'nwwall' }, svg);
      txt(330, 225, st.link === 'wifi' ? st.dist + ' m' + (st.walls ? ', ' + st.walls + (st.walls === 1 ? ' wall' : ' walls') : '') : '4G mobile', 'nwlab', svg);
    }
    txt(330, 70, { wired: 'Cable (Ethernet)', wifi: 'Wi-Fi', mobile: 'Mobile data' }[st.link], 'nwtitle', svg);
    svg.setAttribute('aria-label', { wired: 'A laptop joined to a router by a cable', wifi: 'A laptop joined to a router by Wi-Fi', mobile: 'A laptop on mobile data' }[st.link]);
    ui.side.innerHTML = '';
    [['Speed', m.b + ' Mb/s', 'bandwidth: how much data each second'], ['Delay', m.l + ' ms', 'latency: how long one packet takes'], ['Lost', m.p + '%', 'reliability: packets that never arrive'], ['A ' + st.file + ' MB file', m.s + ' s', 'to send, counting resends']].forEach(function (r) {
      var d = document.createElement('div'); d.className = 'nwstat';
      var b2 = document.createElement('b'); b2.textContent = r[1]; var s2 = document.createElement('span'); s2.textContent = r[0]; var i2 = document.createElement('i'); i2.textContent = r[2];
      d.append(s2, b2, i2); ui.side.appendChild(d);
    });
  }

  function drawGraph() {
    var svg = ui.svg, g = G(); svg.replaceChildren();
    ui.linkEls = {};
    g.links.forEach(function (l) {
      var a = g.nodes[l[0]], b = g.nodes[l[1]], k = lkey(l[0], l[1]), broken = !!st.broken[k];
      var grp = el('g', { class: 'nwlink' + (broken ? ' broken' : '') + (l[2] === 'air' ? ' air' : '') }, svg);
      el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'nwhit' }, grp);
      el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'nwline' }, grp);
      if (broken) txt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 6, '✕', 'nwx', grp);
      if (spec.m === 'packets') {
        grp.setAttribute('role', 'button'); grp.setAttribute('tabindex', '0');
        grp.setAttribute('aria-label', 'Link ' + a[2].replace(' (busy)', '') + ' to ' + b[2].replace(' (busy)', '') + (broken ? ', broken. Click to mend it' : ', working. Click to break it'));
        var tog = function () { if (st.sending) return; st.broken[k] = !st.broken[k]; B.moved = true; drawGraph(); report(); };
        grp.addEventListener('click', tog); grp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      }
      ui.linkEls[k] = grp;
    });
    if (g.eve) {
      var ex, ey;
      if (g.eve.indexOf('-') > 0) { var p1 = g.nodes[g.eve[0]], p2 = g.nodes[g.eve[2]]; ex = (p1[0] + p2[0]) / 2; ey = p1[1] - 70; el('line', { x1: ex, y1: ey + 14, x2: ex, y2: p1[1] - 6, class: 'nweveline' }, svg); }
      else { var pn = g.nodes[g.eve]; ex = pn[0]; ey = pn[1] - 80; el('line', { x1: ex, y1: ey + 14, x2: ex, y2: pn[1] - 18, class: 'nweveline' }, svg); }
      el('circle', { cx: ex, cy: ey, r: 13, class: 'nweve' }, svg); txt(ex, ey + 5, 'E', 'nwevel', svg); txt(ex, ey - 20, 'Eve is listening', 'nwlab', svg);
    }
    Object.keys(g.nodes).forEach(function (id) { var n = g.nodes[id]; icon(n[3], n[0], n[1], svg); txt(n[0], n[1] + (n[3] === 'router' ? 34 : 40), n[2], 'nwlab', svg); });
    ui.pkLayer = el('g', {}, svg);
    svg.setAttribute('aria-label', spec.m === 'packets' ? 'You, six routers and your friend' : spec.m === 'snoop' ? 'You, a café Wi-Fi where Eve is listening, a router, the internet and the bank' : 'Laptop, Wi-Fi to the home router, fibre to the provider, two routes through the internet, the shop');
    side();
  }

  function chips(label, list, cls) {
    var d = document.createElement('div'); d.className = 'nwrow';
    var h = document.createElement('span'); h.className = 'nwh'; h.textContent = label; d.appendChild(h);
    var c = document.createElement('div'); c.className = 'nwchips';
    list.forEach(function (x) { var s = document.createElement('span'); s.className = 'nwchip ' + (x.cls || cls || ''); s.textContent = x.t; c.appendChild(s); });
    d.appendChild(c); return d;
  }
  function side() {
    var s = ui.side; s.replaceChildren();
    if (spec.m !== 'packets' && spec.m !== 'link') {
      s.appendChild(chips('Your message', [{ t: st.msg }], 'plain'));
      if (encOn()) s.appendChild(chips(spec.m === 'journey' ? 'Encrypted (HTTPS)' : 'Encrypted, key ' + st.key, [{ t: shift(st.msg, keyOf()) }], 'secret'));
    }
    if (st.f) {
      if (spec.m === 'packets' || spec.m === 'journey') s.appendChild(chips('Arrived, in arrival order', st.arrived.map(function (p) { return { t: (st.num ? '#' + (p.seq + 1) + ' ' : '') + p.data.replace(/ /g, '·') + (p.again ? ' (sent again)' : '') }; }), 'pk'));
      if (G() && G().eve) s.appendChild(chips('Eve sees', st.eveSaw.length ? st.eveSaw.map(function (t) { return { t: t.replace(/ /g, '·') }; }) : [{ t: '…' }], st.eveRead ? 'plain' : 'secret'));
      var got = st.num ? st.parts.map(function (x) { return x === null ? '▢' : x; }).join('') : st.arrived.map(function (p) { return p.data; }).join('').replace(/ /g, '·');
      s.appendChild(chips(spec.m === 'packets' ? (st.num ? 'Put back in order' : 'Joined in arrival order (no numbers)') : 'Received' + (encOn() ? ' and decrypted' : ''), [{ t: (encOn() ? shift(got.replace(/▢/g, '\u0000'), -keyOf()).replace(/\u0000/g, '▢') : got) || '…' }], 'got'));
    }
    if (st.log && st.log.length) {
      var ol = document.createElement('ul'); ol.className = 'nwlog';
      st.log.forEach(function (l) { var li = document.createElement('li'); li.textContent = l; ol.appendChild(li); });
      s.appendChild(ol);
    }
  }

  // ---------- sending ----------
  function clearTimers() { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); raf = 0; pk = []; }
  function later(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function send() {
    if (st.sending) return;
    clearTimers(); B.moved = true;
    var text = encOn() ? shift(st.msg, keyOf()) : st.msg;
    var size = st.size, n = Math.ceil(text.length / size), routes = paths();
    st.f++; st.sending = true; st.pending = 0; st.askedAgain = false; st.arrived = []; st.eveSaw = []; st.parts = []; st.resent = 0; st.log = [];
    st.eveRead = !encOn();
    for (var i = 0; i < n; i++) st.parts.push(null);
    if (spec.m === 'journey') { log2(st.https ? '1. Encrypted with the shop’s key (HTTPS): only the shop can read it.' : '1. Not encrypted (no HTTPS): anyone on the path can read it.'); log2('2. Split into ' + n + ' numbered packets.'); }
    if (!routes.length) { st.sending = false; st.log = spec.m === 'journey' ? st.log : []; B.say('No route: every way to the receiver is broken.'); st.noRoute = 1; report(); side(); return; }
    st.noRoute = 0;
    var launch = function (seq, again, delay) {
      var route = routes[(seq + (again ? 1 : 0)) % routes.length];
      st.pending++;
      later(delay, function () { st.pending--; pk.push({ seq: seq, data: text.substr(seq * size, size), route: route, hop: 0, t0: performance.now(), again: again, dur: hopDur(route[0]) }); if (!raf) raf = requestAnimationFrame(frame); });
    };
    for (var j = 0; j < n; j++) launch(j, false, j * 220);
    st.launch = launch; st.n = n;
    side(); report();
  }
  function hopDur(node) { return 520 * ((G().slow || {})[node] || 1); }
  function frame(now) {
    var g = G(), layer = ui.pkLayer; if (!layer) return;
    layer.replaceChildren();
    pk = pk.filter(function (p) {
      var a = g.nodes[p.route[p.hop]], b = g.nodes[p.route[p.hop + 1]], u = Math.min(1, (now - p.t0) / p.dur);
      if (u >= 1) {
        p.hop++;
        var here = p.route[p.hop];
        if (g.eve && (here === g.eve || (g.eve.indexOf('-') > 0 && p.hop === 1))) { st.eveSaw.push(p.data); side(); }
        if (spec.m === 'journey') {
          if (p.hop === 1) { log2('3. Over Wi-Fi (wireless) to the home router.'); }
          if (p.hop === 2) log2('4. Along fibre (wired) to the internet provider.');
          if (p.hop === 3) log2('5. Routers pass each packet on, by different routes.');
        }
        if (here === g.dropAt && p.seq === st.drop - 1 && !p.again) {
          flash(g.nodes[here]);
          if (spec.m === 'journey') log2('6. Packet ' + (p.seq + 1) + ' was lost at a busy router.');
          checkDone();
          return false;
        }
        if (here === g.to) { arrive(p); return false; }
        p.t0 = now; p.dur = hopDur(here);
        a = g.nodes[here]; b = g.nodes[p.route[p.hop + 1]]; u = 0;
      }
      var x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u;
      el('circle', { cx: x, cy: y, r: 12, class: 'nwpk' + (p.again ? ' again' : '') }, layer);
      txt(x, y + 5, st.num ? String(p.seq + 1) : '', 'nwpkl', layer);
      return true;
    });
    raf = pk.length ? requestAnimationFrame(frame) : 0;
  }
  function log2(t) { if (st.log.indexOf(t) < 0) { st.log.push(t); side(); } }
  function flash(n) { var f = el('text', { x: n[0], y: n[1] - 26, class: 'nwlost', 'text-anchor': 'middle' }, ui.svg); f.textContent = 'lost!'; later(1400, function () { f.remove(); }); }
  function arrive(p) {
    st.arrived.push({ seq: p.seq, data: p.data, again: p.again });
    st.parts[p.seq] = p.data;
    side(); checkDone();
  }
  function checkDone() {
    later(60, function () {
      if (pk.length || st.pending) return;
      var missing = st.parts.map(function (x, i) { return x === null ? i : -1; }).filter(function (i) { return i >= 0; });
      var tcp = spec.m === 'journey' ? true : st.tcp;
      if (missing.length && tcp && !st.num && !st.askedAgain) { st.askedAgain = true; B.say('TCP is on, but the packets have no numbers, so the receiver can’t tell which one is missing.'); }
      else if (missing.length && tcp && !st.askedAgain) {
        st.askedAgain = true;
        if (spec.m === 'journey') log2('7. The shop’s computer noticed a number missing and asked for it again (TCP).');
        else B.say('TCP: the receiver never confirmed packet ' + missing.map(function (i) { return i + 1; }).join(', ') + ', so it is sent again.');
        missing.forEach(function (i, k) { st.resent++; st.launch(i, true, 300 + k * 200); });
        return;
      }
      st.sending = false; st.askedAgain = false;
      if (spec.m === 'journey') { log2(missing.length ? 'The message arrived with a gap.' : '8. Put back in order by number' + (st.https ? ', then decrypted by the shop.' : '.')); }
      side(); report(true);
    });
  }

  // ---------- panel ----------
  function btn(t, fn, cls) { var b2 = document.createElement('button'); b2.type = 'button'; b2.textContent = t; if (cls) b2.className = cls; b2.addEventListener('click', fn); return b2; }
  function slider(label, min, max, get, set) {
    var r = document.createElement('div'); r.className = 'srow';
    var n = document.createElement('span'); n.className = 'fname'; n.textContent = label;
    var dn = btn('−', function () { put(get() - 1); }); dn.setAttribute('aria-label', label + ': less');
    var s = document.createElement('input'); s.type = 'range'; s.min = min; s.max = max; s.step = 1; s.setAttribute('aria-label', label);
    var up = btn('+', function () { put(get() + 1); }); up.setAttribute('aria-label', label + ': more');
    var o = document.createElement('output');
    var put = function (v) { v = Math.max(min, Math.min(max, Math.round(v))); set(v); B.moved = true; sync(); redrawState(); report(); };
    var sync = function () { s.value = get(); o.textContent = get(); };
    s.addEventListener('input', function () { put(Number(s.value)); });
    r.append(n, dn, s, up, o); sync(); return r;
  }
  function redrawState() { if (spec.m === 'link') drawLink(); else { clearTimers(); st.sending = false; st.f = st.f; side(); } }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren(); ui.toggles = [];
    if (spec.m === 'link') {
      if (st.link === 'wifi') { panel.appendChild(slider('Distance (m)', 1, 60, function () { return st.dist; }, function (v) { st.dist = v; })); panel.appendChild(slider('Walls', 0, 4, function () { return st.walls; }, function (v) { st.walls = v; })); }
    }
    if (spec.m === 'snoop') panel.appendChild(slider('Key', 0, 25, function () { return st.key; }, function (v) { st.key = v; }));
    if (spec.m === 'packets' && spec.sizes) panel.appendChild(slider('Characters a packet', 1, 12, function () { return st.size; }, function (v) { st.size = v; }));
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    if (spec.m === 'link' && spec.choose) {
      var lab = document.createElement('span'); lab.className = 'dlab'; lab.textContent = 'Link:'; bar.appendChild(lab);
      [['wired', 'Cable'], ['wifi', 'Wi-Fi'], ['mobile', 'Mobile']].forEach(function (x) {
        var b2 = btn(x[1], function () { st.link = x[0]; B.moved = true; paintPanel(); drawLink(); report(); }); b2.dataset.on = String(st.link === x[0]); ui.toggles.push(b2); bar.appendChild(b2);
      });
    }
    if (spec.m !== 'link') bar.appendChild(btn('Send', send, 'go'));
    if (spec.chooseNum) { var nb = btn('Numbers: ' + (st.num ? 'on' : 'off'), function () { if (st.sending) return; st.num = !st.num; B.moved = true; fresh(); nb.textContent = 'Numbers: ' + (st.num ? 'on' : 'off'); nb.dataset.on = String(st.num); syncToggles(); report(); }); nb.dataset.on = String(st.num); ui.toggles.push(nb); bar.appendChild(nb); }
    if (spec.chooseTcp) { var t = btn('TCP: ' + (st.tcp ? 'on' : 'off'), function () { if (spec.chooseNum && st.sending) return; st.tcp = !st.tcp; B.moved = true; if (spec.chooseNum) fresh(); t.textContent = 'TCP: ' + (st.tcp ? 'on' : 'off'); t.dataset.on = String(st.tcp); syncToggles(); report(); }); t.dataset.on = String(st.tcp); ui.toggles.push(t); bar.appendChild(t); }
    if (spec.m === 'snoop') { var e = btn('Encrypt: ' + (st.enc ? 'on' : 'off'), function () { st.enc = !st.enc; B.moved = true; e.textContent = 'Encrypt: ' + (st.enc ? 'on' : 'off'); e.dataset.on = String(st.enc); syncToggles(); side(); report(); }); e.dataset.on = String(st.enc); ui.toggles.push(e); bar.appendChild(e); }
    if (spec.m === 'journey') { var h = btn('HTTPS: ' + (st.https ? 'on' : 'off'), function () { st.https = !st.https; B.moved = true; h.textContent = 'HTTPS: ' + (st.https ? 'on' : 'off'); h.dataset.on = String(st.https); syncToggles(); side(); report(); }); h.dataset.on = String(st.https); ui.toggles.push(h); bar.appendChild(h); }
    bar.appendChild(btn('Start again', function () { clearTimers(); B.restart(); }, 'quiet'));
    panel.appendChild(bar); syncToggles();
  }
  // With a Numbers switch, changing a switch clears the last send, so a check on the result needs a send with the new settings.
  function fresh() { clearTimers(); st.arrived = []; st.parts = []; st.resent = 0; st.log = []; side(); }
  function syncToggles() { ui.toggles.forEach(function (b2) { b2.setAttribute('aria-pressed', b2.dataset.on); }); }

  function report(finished) {
    var vars, out;
    if (spec.m === 'link') {
      var m = linkModel();
      vars = { w: { wired: 1, wifi: 2, mobile: 3 }[st.link], b: m.b, l: m.l, p: m.p, s: m.s, d: st.dist, k: st.walls };
      out = { wired: 'Cable', wifi: 'Wi-Fi', mobile: 'Mobile data' }[st.link] + ': ' + m.b + ' Mb/s, ' + m.l + ' ms delay, ' + m.p + '% lost; ' + st.file + ' MB in ' + m.s + ' s';
    } else {
      var complete = st.f > 0 && !st.sending && st.parts.length > 0 && st.parts.every(function (x) { return x !== null; }) &&
        (st.num || st.arrived.map(function (p) { return p.data; }).join('') === st.parts.join(''));
      var order = st.arrived.map(function (p) { return p.seq; }), ooo = order.some(function (v, i) { return i && v < order[i - 1]; }) ? 1 : 0;
      var broken = Object.keys(st.broken).filter(function (k) { return st.broken[k]; }).length;
      vars = { u: st.noRoute ? 1 : 0, z: st.key % 10 === 0 ? 1 : 0, n: Math.ceil(st.msg.length / st.size), a: st.arrived.length, o: ooo, r: st.resent || 0, k: complete ? 1 : 0, x: broken, t: st.tcp ? 1 : 0, q: st.num ? 1 : 0, f: st.f, e: st.enc ? 1 : 0, s: st.key, v: st.f && st.eveRead ? 1 : 0, h: st.https ? 1 : 0 };
      out = st.sending ? 'Sending ' + vars.n + ' packets…' : !st.f ? (spec.m === 'packets' ? vars.n + ' packets ready. Press Send.' : 'Press Send.') : st.noRoute ? 'No route to the receiver.' :
        (complete ? 'Delivered: all ' + vars.n + ' packets' : vars.a < vars.n ? 'Arrived with a gap: ' + vars.a + ' of ' + vars.n + ' packets' : 'Arrived jumbled: all ' + vars.n + ' packets, joined in the wrong order') + (ooo ? ', out of order' : '') + (vars.r ? ', ' + vars.r + ' sent again' : '') + (G().eve ? (st.eveRead ? '. Eve could read it.' : '. Eve saw only scrambled text.') : '.');
    }
    ui.work.textContent = out; B.say(out);
    B.save({ st: { link: st.link, dist: st.dist, walls: st.walls, size: st.size, tcp: st.tcp, num: st.num, enc: st.enc, key: st.key, https: st.https, broken: st.broken } });
    B.post({ scope: { vars: vars, points: {} } }, out);
    void finished;
  }

  B.widget('network', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A network: ' + (s.m || 'packets'); },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec; clearTimers();
      var sv = fresh ? null : B.saved(), o = sv && sv.st ? sv.st : {};
      st = {
        link: o.link || spec.link0, dist: o.dist || spec.dist0, walls: o.walls != null ? o.walls : spec.walls0, file: spec.file0,
        size: o.size || spec.size0, tcp: o.tcp != null ? o.tcp : spec.tcp0, num: o.num != null ? o.num : spec.num0, enc: o.enc != null ? o.enc : spec.enc0, key: o.key != null ? o.key : spec.key0,
        https: o.https != null ? o.https : spec.https0, broken: o.broken || {}, msg: spec.msg, drop: spec.drop0,
        f: 0, sending: false, arrived: [], eveSaw: [], parts: [], resent: 0, log: [], eveRead: true, n: 0,
      };
      paintPanel(); draw(); report();
    },
  });
})(WPB);
