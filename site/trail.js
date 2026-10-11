// Trail map on a pathway page: marks each course (and each unit of an expandable course) with this browser's
// progress (wp-progress via progress.js), picks "You are here", fills the card (hover or focus a waypoint to preview
// it), opens one course at a time into its units (the current course, else the first; click another to open it),
// draws the trail between waypoints and switches between the map and the list (remembered in wp-pathview).
// Nothing is sent anywhere.
(function () {
  var dataEl = document.getElementById('trail-data'), map = document.getElementById('tmap'), card = document.getElementById('tcard');
  if (!dataEl || !map || !card) return;
  var script = document.currentScript, root = (script && script.dataset.root) || '';
  var nodes = JSON.parse(dataEl.textContent), byId = {}, status = {}, stops = [];
  var here = null, hereUnit = null, hereWord = '', pinned = null, openId = null;
  nodes.forEach(function (n) {
    byId[n.id] = n; stops.push(n);
    status[n.id] = { kind: n.portal ? 'portal' : n.soon ? 'soon' : 'todo', done: 0, total: n.lessons, next: null };
    (n.units || []).forEach(function (u, i) {
      u.path = n.path; u.stage = n.stage; u.course = n.id; u.isUnit = true;
      u.parents = i ? [n.units[i - 1].id] : [];
      byId[u.id] = u; stops.push(u);
      status[u.id] = { kind: 'todo', done: 0, total: u.lessons, next: null };
    });
  });
  var svg = map.querySelector('.tlines'), NS = 'http://www.w3.org/2000/svg';
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function nodeEl(id) { return map.querySelector('.tnode[data-id="' + id.replace(/"/g, '\\"') + '"]'); }
  function inner(n) { return n.parents.map(function (p) { return byId[p]; }).filter(function (p) { return p && !p.portal; }); }
  function short(t) { return t.replace(/^Python Foundations with Turtle$/, 'Turtle').replace(/:.*$/, ''); }

  // ---- views: map or list ----
  var doc = document.documentElement;
  [].forEach.call(document.querySelectorAll('.ptoggle button'), function (b) {
    b.setAttribute('aria-pressed', String(doc.classList.contains('trail-on') === (b.dataset.view === 'map')));
    b.addEventListener('click', function () {
      var on = b.dataset.view === 'map';
      doc.classList.toggle('trail-on', on);
      try { localStorage.setItem('wp-pathview', on ? 'map' : 'list'); } catch (e) { /* ignore */ }
      [].forEach.call(document.querySelectorAll('.ptoggle button'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      if (on) draw();
    });
  });

  // ---- opening a course into its units ----
  function setOpen(id) {
    openId = id;
    [].forEach.call(map.querySelectorAll('.tarea'), function (a) { a.hidden = a.dataset.area !== id; });
    [].forEach.call(map.querySelectorAll('.tnode.has-units'), function (e) { e.classList.toggle('is-open', e.dataset.id === id); });
    draw();
  }

  // ---- progress ----
  function fill(n, ls) {
    var s = status[n.id];
    var req = ls.filter(function (l) { return l.checks && !l.optional; });
    n.hrefs = ls.map(function (l) { return l.href; });
    s.total = req.length;
    s.done = req.filter(function (l) { return l.complete; }).length;
    var nx = req.filter(function (l) { return !l.complete; })[0];
    s.next = nx ? root + nx.href : null;
    s.kind = s.total && s.done === s.total ? 'done' : ls.some(function (l) { return l.done; }) ? 'going' : 'todo';
  }
  function mark(n) {
    var e = nodeEl(n.id), s = status[n.id];
    if (!e) return;
    e.classList.remove('is-todo', 'is-going', 'is-done', 'is-here');
    if (!n.portal && !n.soon) e.classList.add('is-' + s.kind);
    var tin = e.querySelector('.tin'), meta = e.querySelector('.tmeta'), badge = e.querySelector('.there');
    if (s.kind === 'done') {
      tin.textContent = '';
      var ck = document.createElementNS(NS, 'svg'); ck.setAttribute('viewBox', '0 0 24 24'); ck.setAttribute('fill', 'none'); ck.setAttribute('stroke', 'currentColor'); ck.setAttribute('stroke-width', '3'); ck.setAttribute('stroke-linecap', 'round'); ck.setAttribute('stroke-linejoin', 'round');
      var pa = document.createElementNS(NS, 'path'); pa.setAttribute('d', 'M5 12.5l4.5 4.5L19 7.5'); ck.append(pa); tin.append(ck);
      meta.textContent = 'Done · ' + s.total + (s.total === 1 ? ' lesson' : ' lessons');
    } else if (s.kind === 'going') {
      tin.textContent = s.done + '/' + s.total;
      meta.textContent = s.done + ' of ' + s.total + ' lessons done';
    }
    var isHere = (here && here.id === n.id) || (hereUnit && hereUnit.id === n.id);
    if (isHere) e.classList.add('is-here');
    badge.hidden = !isHere; badge.textContent = isHere ? hereWord : '';
    e.setAttribute('aria-label', n.title + ': ' + meta.textContent + (isHere ? '. ' + hereWord : ''));
  }
  function apply(sum) {
    var last = null; try { last = JSON.parse(localStorage.getItem('wp-last-lesson')); } catch (e) { /* ignore */ }
    var lastPath = last && last.href ? String(last.href) : '';
    nodes.forEach(function (n) {
      if (!n.path) return;
      var p = (sum || []).filter(function (x) { return x.href === n.path + '/'; })[0];
      if (!p) return;
      fill(n, p.lessons);
      (n.units || []).forEach(function (u) { fill(u, p.lessons.filter(function (l) { return l.unit === u.unit; })); });
    });
    var open = function (n) { return status[n.id].kind === 'going' || status[n.id].kind === 'todo'; };
    here = nodes.filter(function (n) { return n.path && lastPath.indexOf('/' + n.path + '/') >= 0 && open(n); })[0] ||
      nodes.filter(function (n) { return status[n.id].kind === 'going'; })[0] || null;
    hereWord = 'You are here';
    if (!here) {
      var any = nodes.some(function (n) { return status[n.id].kind === 'done'; });
      here = nodes.filter(function (n) { return status[n.id].kind === 'todo' && inner(n).every(function (p) { return status[p.id].kind === 'done'; }); })[0] || null;
      hereWord = any ? 'Next stop' : 'Start here';
    }
    hereUnit = null;
    if (here && here.units) {
      var us = here.units;
      hereUnit = us.filter(function (u) { return open(u) && (u.hrefs || []).some(function (h) { return lastPath.indexOf('/' + h) >= 0; }); })[0] ||
        us.filter(function (u) { return status[u.id].kind === 'going'; })[0] ||
        us.filter(function (u) { return status[u.id].kind !== 'done'; })[0] || null;
    }
    stops.forEach(mark);
    // Open the current course, else the first course that has units.
    var first = nodes.filter(function (n) { return n.units; })[0];
    setOpen(here ? (here.units ? here.id : null) : first ? first.id : null);
    show(hereUnit || here || nodes[0]);
  }

  // ---- the card ----
  function show(n) {
    if (!n) return;
    var s = status[n.id];
    card.textContent = '';
    var text = el('div', 'tct');
    var ps = n.parents.map(function (p) { return short(byId[p].title); });
    var isHere = (here && here.id === n.id) || (hereUnit && hereUnit.id === n.id);
    var kicker = isHere ? hereWord : n.portal ? 'Another pathway' : n.isUnit ? byId[n.course].title : n.stage === 'foundations' ? 'Foundations' : 'Extension';
    if (!n.portal && ps.length) kicker += ' · after ' + ps.join(' and ');
    text.append(el('span', 'tck', kicker), el('h2', null, n.title), el('p', null, n.tagline));
    if (!n.portal && !n.soon && s.total) {
      var bar = el('span', 'tbar'), track = el('i'), fill = el('i');
      fill.style.width = Math.round(100 * s.done / s.total) + '%'; track.append(fill);
      bar.append(track, s.kind === 'done' ? 'Done' : s.done + ' of ' + s.total + ' lessons done');
      text.append(bar);
    }
    card.append(text);
    var go = el('div', 'tgo'), link = nodeEl(n.id), a = null;
    if (n.portal) { a = el('a', 'tbtn', 'Go to the ' + n.pathway + ' pathway'); a.href = link.href; }
    else if (n.soon) go.append(el('span', 'tck', 'Coming later'));
    else {
      var cls = s.kind === 'done' ? 'tbtn again' : isHere ? 'tbtn here' : 'tbtn';
      a = el('a', cls, s.kind === 'done' ? 'Open again' : s.kind === 'going' ? 'Continue' : 'Start');
      a.href = s.kind === 'going' && s.next ? s.next : link.href;
    }
    if (a) go.append(a);
    card.append(go);
  }
  function rest() { show(pinned ? byId[pinned] : hereUnit || here || nodes[0]); }
  [].forEach.call(map.querySelectorAll('.tnode'), function (e) {
    var n = byId[e.dataset.id];
    e.addEventListener('mouseenter', function () { show(n); });
    e.addEventListener('focus', function () { show(n); });
    e.addEventListener('mouseleave', rest);
    e.addEventListener('blur', rest);
    if (e.classList.contains('has-units')) {
      // A course with units opens on the map (closing the open one); the card's button goes into it.
      e.addEventListener('click', function (ev) {
        ev.preventDefault();
        pinned = n.units[0].id;
        setOpen(n.id);
        var f = nodeEl(n.units[0].id);
        if (f) f.focus({ preventScroll: true });
        show(byId[pinned]);
      });
    } else if (e.tagName === 'BUTTON') e.addEventListener('click', function () { pinned = n.id; show(n); });
  });

  // ---- the trail between waypoints ----
  function draw() {
    if (!doc.classList.contains('trail-on')) return;
    var box = map.getBoundingClientRect();
    if (!box.width) return;
    var down = getComputedStyle(map).display === 'flex';
    // Columns can widen when a course opens, so the foundations/extensions split follows the extensions label.
    var tze = map.querySelector('.tze');
    if (tze && !down) map.style.setProperty('--fz', tze.offsetLeft + 'px');
    svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var at = {};
    stops.forEach(function (n) {
      var e = nodeEl(n.id);
      if (!e) return;
      var d = e.querySelector('.tdot').getBoundingClientRect();
      if (!d.width) return;
      at[n.id] = { x: d.left - box.left + d.width / 2, y: d.top - box.top + d.height / 2, r: d.width / 2 };
    });
    // An open course is entered at its first unit and left from its last.
    function entry(id) { var n = byId[id]; return n && n.units && openId === id ? n.units[0].id : id; }
    function exit(id) { var n = byId[id]; return n && n.units && openId === id ? n.units[n.units.length - 1].id : id; }
    var edges = [];
    nodes.forEach(function (n) {
      n.parents.forEach(function (pid) { edges.push({ a: exit(pid), b: entry(n.id), soon: n.soon }); });
      if (n.units && openId === n.id) n.units.forEach(function (u, i) { if (i) edges.push({ a: n.units[i - 1].id, b: u.id }); });
    });
    var layers = { later: [], open: [], walked: [] };
    // On a phone the waypoints are one list: draw only a step to the waypoint just above, and let each
    // label say what it comes after.
    var order = [].filter.call(map.querySelectorAll('.tnode'), function (e) { return e.getBoundingClientRect().width > 0; }).map(function (e) { return e.dataset.id; });
    edges.forEach(function (g) {
      var a = at[g.a], b = at[g.b], d;
      if (!a || !b) return;
      if (down && order[order.indexOf(g.b) - 1] !== g.a) return;
      if (down || Math.abs(b.y - a.y) > 1.6 * Math.abs(b.x - a.x)) {
        var sy = b.y >= a.y ? 1 : -1, ya = a.y + sy * a.r, yb = b.y - sy * b.r, my = (yb - ya) / 2;
        d = 'M' + a.x + ' ' + ya + ' C' + a.x + ' ' + (ya + my) + ' ' + b.x + ' ' + (yb - my) + ' ' + b.x + ' ' + yb;
      } else {
        var sx = b.x >= a.x ? 1 : -1, x1 = a.x + sx * a.r, x2 = b.x - sx * b.r, h = (x2 - x1) / 2;
        d = 'M' + x1 + ' ' + a.y + ' C' + (x1 + h) + ' ' + a.y + ' ' + (x2 - h) + ' ' + b.y + ' ' + x2 + ' ' + b.y;
      }
      var kind = g.soon ? 'later' : status[g.a].kind === 'done' ? 'walked' : 'open';
      layers[kind].push(d);
    });
    ['later', 'open', 'walked'].forEach(function (k) {
      if (!layers[k].length) return;
      var p = document.createElementNS(NS, 'path'); p.setAttribute('class', k); p.setAttribute('d', layers[k].join(' ')); svg.append(p);
    });
  }
  if (window.ResizeObserver) new ResizeObserver(draw).observe(map); else window.addEventListener('resize', draw);

  rest();
  draw();
  if (window.wpProgressSummary) window.wpProgressSummary().then(apply).catch(function () { apply(null); });
  else apply(null);
})();
