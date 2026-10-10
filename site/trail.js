// Trail map on a pathway page: marks each course with this browser's progress (wp-progress via progress.js),
// picks "You are here", fills the card (hover or focus a waypoint to preview it), draws the trail between
// waypoints and switches between the map and the list (remembered in wp-pathview). Nothing is sent anywhere.
(function () {
  var dataEl = document.getElementById('trail-data'), map = document.getElementById('tmap'), card = document.getElementById('tcard');
  if (!dataEl || !map || !card) return;
  var script = document.currentScript, root = (script && script.dataset.root) || '';
  var nodes = JSON.parse(dataEl.textContent), byId = {}, status = {}, here = null, hereWord = '', pinned = null;
  nodes.forEach(function (n) { byId[n.id] = n; status[n.id] = { kind: n.portal ? 'portal' : n.soon ? 'soon' : 'todo', done: 0, total: n.lessons, next: null }; });
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

  // ---- progress ----
  function apply(sum) {
    var last = null; try { last = JSON.parse(localStorage.getItem('wp-last-lesson')); } catch (e) { /* ignore */ }
    nodes.forEach(function (n) {
      if (!n.path) return;
      var p = (sum || []).filter(function (x) { return x.href === n.path + '/'; })[0];
      if (!p) return;
      var req = p.lessons.filter(function (l) { return l.checks && !l.optional; });
      var s = status[n.id];
      s.total = req.length;
      s.done = req.filter(function (l) { return l.complete; }).length;
      var started = p.lessons.some(function (l) { return l.done; });
      var nx = req.filter(function (l) { return !l.complete; })[0];
      s.next = nx ? root + nx.href : null;
      s.kind = s.total && s.done === s.total ? 'done' : started ? 'going' : 'todo';
    });
    var open = function (n) { return status[n.id].kind === 'going' || status[n.id].kind === 'todo'; };
    var lastPath = last && last.href ? String(last.href) : '';
    here = nodes.filter(function (n) { return n.path && lastPath.indexOf('/' + n.path + '/') >= 0 && open(n); })[0] ||
      nodes.filter(function (n) { return status[n.id].kind === 'going'; })[0] || null;
    hereWord = 'You are here';
    if (!here) {
      var any = nodes.some(function (n) { return status[n.id].kind === 'done'; });
      here = nodes.filter(function (n) { return status[n.id].kind === 'todo' && inner(n).every(function (p) { return status[p.id].kind === 'done'; }); })[0] || null;
      hereWord = any ? 'Next stop' : 'Start here';
    }
    nodes.forEach(function (n) {
      var e = nodeEl(n.id), s = status[n.id];
      if (!e) return;
      e.classList.remove('is-todo', 'is-going', 'is-done', 'is-here');
      if (!n.portal && !n.soon) e.classList.add('is-' + s.kind);
      var tin = e.querySelector('.tin'), meta = e.querySelector('.tmeta'), badge = e.querySelector('.there');
      if (s.kind === 'done') {
        tin.textContent = '';
        var ck = document.createElementNS(NS, 'svg'); ck.setAttribute('viewBox', '0 0 24 24'); ck.setAttribute('fill', 'none'); ck.setAttribute('stroke', 'currentColor'); ck.setAttribute('stroke-width', '3'); ck.setAttribute('stroke-linecap', 'round'); ck.setAttribute('stroke-linejoin', 'round');
        var pa = document.createElementNS(NS, 'path'); pa.setAttribute('d', 'M5 12.5l4.5 4.5L19 7.5'); ck.append(pa); tin.append(ck);
        meta.textContent = 'Done · ' + s.total + ' lessons';
      } else if (s.kind === 'going') {
        tin.textContent = s.done + '/' + s.total;
        meta.textContent = s.done + ' of ' + s.total + ' lessons done';
      }
      var isHere = here && here.id === n.id;
      if (isHere) e.classList.add('is-here');
      badge.hidden = !isHere; badge.textContent = isHere ? hereWord : '';
      e.setAttribute('aria-label', n.title + ': ' + meta.textContent + (isHere ? '. ' + hereWord : ''));
    });
    show(here || nodes[0]);
    draw();
  }

  // ---- the card ----
  function show(n) {
    if (!n) return;
    var s = status[n.id];
    card.textContent = '';
    var text = el('div', 'tct');
    var ps = n.parents.map(function (p) { return short(byId[p].title); });
    var kicker = here && here.id === n.id ? hereWord : n.portal ? 'Another pathway' : n.stage === 'foundations' ? 'Foundations' : 'Extension';
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
      var cls = s.kind === 'done' ? 'tbtn again' : here && here.id === n.id ? 'tbtn here' : 'tbtn';
      a = el('a', cls, s.kind === 'done' ? 'Open again' : s.kind === 'going' ? 'Continue' : 'Start');
      a.href = s.kind === 'going' && s.next ? s.next : link.href;
    }
    if (a) go.append(a);
    card.append(go);
  }
  function rest() { show(pinned ? byId[pinned] : here || nodes[0]); }
  [].forEach.call(map.querySelectorAll('.tnode'), function (e) {
    var n = byId[e.dataset.id];
    e.addEventListener('mouseenter', function () { show(n); });
    e.addEventListener('focus', function () { show(n); });
    e.addEventListener('mouseleave', rest);
    e.addEventListener('blur', rest);
    if (e.tagName === 'BUTTON') e.addEventListener('click', function () { pinned = n.id; show(n); });
  });

  // ---- the trail between waypoints ----
  function draw() {
    if (!doc.classList.contains('trail-on')) return;
    var box = map.getBoundingClientRect();
    if (!box.width) return;
    var down = getComputedStyle(map).display === 'flex';
    svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var at = {};
    nodes.forEach(function (n) {
      var d = nodeEl(n.id).querySelector('.tdot').getBoundingClientRect();
      at[n.id] = { x: d.left - box.left + d.width / 2, y: d.top - box.top + d.height / 2, r: d.width / 2 };
    });
    var layers = { later: [], open: [], walked: [] };
    // On a phone the waypoints are one list: draw only a step to the waypoint just above, and let each
    // label say what it comes after.
    var order = [].map.call(map.querySelectorAll('.tnode'), function (e) { return e.dataset.id; });
    nodes.forEach(function (n) {
      n.parents.forEach(function (pid) {
        if (down && order[order.indexOf(n.id) - 1] !== pid) return;
        var a = at[pid], b = at[n.id], d;
        if (down) {
          var y1 = a.y + a.r, y2 = b.y - b.r, m = (y2 - y1) / 2;
          d = 'M' + a.x + ' ' + y1 + ' C' + a.x + ' ' + (y1 + m) + ' ' + b.x + ' ' + (y2 - m) + ' ' + b.x + ' ' + y2;
        } else {
          var x1 = a.x + a.r, x2 = b.x - b.r, h = (x2 - x1) / 2;
          d = 'M' + x1 + ' ' + a.y + ' C' + (x1 + h) + ' ' + a.y + ' ' + (x2 - h) + ' ' + b.y + ' ' + x2 + ' ' + b.y;
        }
        var kind = n.soon ? 'later' : status[pid].kind === 'done' ? 'walked' : 'open';
        layers[kind].push(d);
      });
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
