// Curriculum map (tools/curriculum-map.mjs): marks waypoints done from this browser's progress (via progress.js),
// fills the card for the descriptor in focus (hover or focus to preview, click to choose; the choice goes in the
// address as #AC9M8A02 so a teacher can share it), draws what it builds on and leads to, and filters to
// descriptors with lessons. Nothing is sent anywhere.
(function () {
  var dataEl = document.getElementById('cm-data'), grid = document.getElementById('cmgrid'), card = document.getElementById('cmcard');
  if (!dataEl || !grid || !card) return;
  var data = JSON.parse(dataEl.textContent), D = data.d, L = data.lessons, done = {}, sel = null, peek = null;
  var svg = grid.querySelector('.cmlines'), NS = 'http://www.w3.org/2000/svg';
  var follows = {};
  Object.keys(D).forEach(function (c) { D[c].p.forEach(function (p) { (follows[p] = follows[p] || []).push(c); }); });
  function tile(c) { return grid.querySelector('.cmt[data-code="' + c + '"]'); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function short(c) { return c.replace(/^AC9[A-Z]/, ''); }
  var hover = window.matchMedia ? matchMedia('(hover: hover)').matches : true;

  function nodeDone(c, i) { var ls = D[c].n[i][2]; return ls.length > 0 && ls.every(function (j) { return done[L[j].h]; }); }

  function show(c) {
    var d = D[c];
    if (!d) return;
    card.textContent = '';
    card.append(el('p', 'cmk', c + ' · ' + (d.y < 7 ? 'Year ' + d.y + ' (before Year 7)' : 'Year ' + d.y) + ' · ' + d.s));
    card.append(el('h2', null, d.t));
    if (d.x) card.append(el('p', 'cmx', d.x));
    card.append(el('h3', null, 'Waypoints'));
    var ol = el('ol');
    d.n.forEach(function (n, i) {
      var li = el('li'), dot = el('i', nodeDone(c, i) ? 'dd' : n[2].length ? 'dl' : 'dn'), body = el('div');
      var t = el('span', null, n[0]); body.append(t);
      if (n[1]) body.append(el('span', 'hg', 'HINGE'));
      if (n[2].length) n[2].forEach(function (j) {
        var a = el('a', null, L[j].t + (done[L[j].h] ? ' ✓' : '')); a.href = L[j].h; body.append(a);
        body.append(el('small', null, L[j].c));
      });
      else body.append(el('small', null, 'No lesson yet'));
      li.append(dot, body); ol.append(li);
    });
    card.append(ol);
    [['Builds on', d.p, 'pre'], ['Leads to', follows[c] || [], 'post']].forEach(function (g) {
      card.append(el('h3', null, g[0]));
      if (!g[1].length) { card.append(el('span', 'none', g[2] === 'pre' ? 'Nothing listed' : 'Nothing later in Years 7–10')); return; }
      var box = el('div', 'cmlinks');
      g[1].forEach(function (x) {
        var b = el('button', g[2], short(x)); b.type = 'button'; b.title = x + ': ' + D[x].t;
        b.addEventListener('click', function () { choose(x, true); });
        box.append(b);
      });
      card.append(box);
    });
    mark(c);
    draw(c);
  }

  function mark(c) {
    [].forEach.call(grid.querySelectorAll('.cmt.on, .cmt.pre, .cmt.post'), function (t) { t.classList.remove('on', 'pre', 'post'); });
    var t = tile(c); if (t) t.classList.add('on');
    D[c].p.forEach(function (x) { var e = tile(x); if (e) e.classList.add('pre'); });
    (follows[c] || []).forEach(function (x) { var e = tile(x); if (e) e.classList.add('post'); });
  }

  function draw(c) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!c || getComputedStyle(svg).display === 'none') return;
    var box = grid.getBoundingClientRect();
    function at(code) { var e = tile(code); if (!e) return null; var r = e.getBoundingClientRect(); return { l: r.left - box.left, r: r.right - box.left, y: r.top - box.top + r.height / 2 }; }
    function link(a, b, cls) {
      var A = at(a), B = at(b); if (!A || !B) return;
      var d;
      if (A.r < B.l) { var m = (B.l - A.r) / 2; d = 'M' + A.r + ' ' + A.y + ' C' + (A.r + m) + ' ' + A.y + ' ' + (B.l - m) + ' ' + B.y + ' ' + B.l + ' ' + B.y; }
      else { var x = Math.min(A.l, B.l) - 2; d = 'M' + A.l + ' ' + A.y + ' C' + (x - 30) + ' ' + A.y + ' ' + (x - 30) + ' ' + B.y + ' ' + B.l + ' ' + B.y; }
      var p = document.createElementNS(NS, 'path'); p.setAttribute('class', cls); p.setAttribute('d', d); svg.append(p);
    }
    D[c].p.forEach(function (x) { link(x, c, 'pre'); });
    (follows[c] || []).forEach(function (x) { link(c, x, 'post'); });
  }

  function choose(c, scroll) {
    sel = c; peek = null; show(c);
    try { history.replaceState(null, '', '#' + c); } catch (e) { /* ignore */ }
    var t = tile(c);
    if (scroll && t) t.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (!window.matchMedia || !matchMedia('(min-width: 1180px)').matches) card.scrollIntoView({ block: 'nearest' });
  }

  [].forEach.call(grid.querySelectorAll('.cmt'), function (t) {
    var c = t.dataset.code;
    t.addEventListener('click', function () { choose(c, false); });
    if (hover) {
      t.addEventListener('mouseenter', function () { peek = c; show(c); });
      t.addEventListener('mouseleave', function () { peek = null; if (sel) show(sel); });
    }
  });

  [].forEach.call(document.querySelectorAll('.cmseg button'), function (b) {
    b.addEventListener('click', function () {
      grid.classList.toggle('only', b.dataset.f === 'has');
      [].forEach.call(document.querySelectorAll('.cmseg button'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    });
  });

  function start() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (D[h]) return h;
    var last = null; try { last = JSON.parse(localStorage.getItem('wp-last-lesson')); } catch (e) { /* ignore */ }
    if (last && last.href) {
      for (var c in D) for (var i = 0; i < D[c].n.length; i++) if (D[c].n[i][2].some(function (j) { return String(last.href).indexOf(L[j].h.replace(/^(\.\.\/)+/, '/')) >= 0; })) return c;
    }
    for (var k in D) if (D[k].y >= 7 && D[k].n.some(function (n) { return n[2].length; })) return k;
    return Object.keys(D)[0];
  }

  function apply(sum) {
    (sum || []).forEach(function (p) { p.lessons.forEach(function (l) { if (l.complete) L.forEach(function (x) { if (x.h.replace(/^(\.\.\/)+/, '') === l.href) done[x.h] = true; }); }); });
    Object.keys(D).forEach(function (c) {
      var t = tile(c); if (!t) return;
      [].forEach.call(t.querySelectorAll('.cmdots i'), function (dot, i) { if (nodeDone(c, i)) dot.className = 'dd'; });
    });
    show(peek || sel);
  }

  sel = start();
  show(sel);
  if (window.ResizeObserver) new ResizeObserver(function () { draw(peek || sel); }).observe(grid); else window.addEventListener('resize', function () { draw(peek || sel); });
  window.addEventListener('hashchange', function () { var h = decodeURIComponent(location.hash.slice(1)); if (D[h] && h !== sel) choose(h, true); });
  if (window.wpProgressSummary) window.wpProgressSummary().then(apply).catch(function () { /* no progress */ });
})();
