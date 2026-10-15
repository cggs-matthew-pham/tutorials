// Trailheads on a subject page (tools/trail.mjs › trailheadsHtml): marks each pathway's trail picture with this
// browser's progress (wp-progress via progress.js), shows "n of m courses done", fills Continue with the course of
// the last lesson opened (else one in progress), and switches between trails and the list (wp-pathview).
(function () {
  var dataEl = document.getElementById('trailheads-data');
  if (!dataEl) return;
  var script = document.currentScript, root = (script && script.dataset.root) || '';
  var pws = JSON.parse(dataEl.textContent), doc = document.documentElement;

  [].forEach.call(document.querySelectorAll('.ptoggle button'), function (b) {
    b.setAttribute('aria-pressed', String(doc.classList.contains('trail-on') === (b.dataset.view === 'map')));
    b.addEventListener('click', function () {
      var on = b.dataset.view === 'map';
      doc.classList.toggle('trail-on', on);
      try { localStorage.setItem('wp-pathview', on ? 'map' : 'list'); } catch (e) { /* ignore */ }
      [].forEach.call(document.querySelectorAll('.ptoggle button'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    });
  });

  function apply(sum) {
    var last = null; try { last = JSON.parse(localStorage.getItem('wp-last-lesson')); } catch (e) { /* ignore */ }
    var lastPath = last && last.href ? String(last.href) : '';
    var st = {}, here = null, going = null;
    pws.forEach(function (pw) {
      pw.nodes.forEach(function (n) {
        var s = { kind: n.soon ? 'soon' : 'todo', next: null };
        var p = n.path && (sum || []).filter(function (x) { return x.href === n.path + '/'; })[0];
        if (p) {
          var ls = n.unit ? p.lessons.filter(function (l) { return l.unit === n.unit; }) : p.lessons;
          n.hrefs = ls.map(function (l) { return l.href; });
          var req = ls.filter(function (l) { return l.checks && !l.optional; });
          var done = req.filter(function (l) { return l.complete; }).length;
          s.next = req.filter(function (l) { return !l.complete; })[0] || null;
          s.kind = req.length && done === req.length ? 'done' : ls.some(function (l) { return l.done; }) ? 'going' : 'todo';
          s.done = done; s.total = req.length;
        }
        st[pw.id + '|' + n.id] = s;
        var open = s.kind === 'going' || s.kind === 'todo';
        var hit = n.unit ? (n.hrefs || []).some(function (h) { return lastPath.indexOf('/' + h) >= 0; }) : lastPath.indexOf('/' + n.path + '/') >= 0;
        if (!here && n.path && open && hit) here = { pw: pw, n: n, s: s };
        if (!going && s.kind === 'going') going = { pw: pw, n: n, s: s };
      });
    });
    here = here || going;

    pws.forEach(function (pw) {
      var card = document.querySelector('.thead[data-pw="' + pw.id + '"]');
      if (!card) return;
      var built = pw.nodes.filter(function (n) { return !n.soon; });
      var done = built.filter(function (n) { return st[pw.id + '|' + n.id].kind === 'done'; }).length;
      var started = built.filter(function (n) { return st[pw.id + '|' + n.id].kind === 'going'; }).length;
      pw.nodes.forEach(function (n) {
        var s = st[pw.id + '|' + n.id], dot = card.querySelector('[data-id="' + n.id + '"]');
        if (!dot) return;
        if (s.kind === 'done') dot.classList.add('done');
        if (s.kind === 'going') dot.classList.add('going');
        if (here && here.pw === pw && here.n === n) dot.classList.add('here');
        if (s.kind === 'done') [].forEach.call(card.querySelectorAll('path[data-from="' + n.id + '"]'), function (p) { p.classList.add('walked'); });
      });
      var prog = card.querySelector('.thprog');
      if (done || started) {
        prog.hidden = false;
        prog.textContent = done + ' of ' + built.length + (built.some(function (n) { return n.unit; }) ? ' topics done' : ' courses done') + (started ? ' · ' + started + ' in progress' : '');
      }
      if (here && here.pw === pw) card.querySelector('.thgo').textContent = 'Continue the ' + pw.title + ' trail →';
    });

    var cont = document.getElementById('thcont');
    if (cont && here) {
      cont.textContent = '';
      var k = document.createElement('small'); k.textContent = 'Continue on the ' + here.pw.title + ' trail';
      var b = document.createElement('b'); b.textContent = here.n.title;
      cont.append(k, b);
      if (here.s.next) { var sp = document.createElement('span'); sp.textContent = (here.s.next.order != null ? 'Lesson ' + here.s.next.order + ': ' : 'Next: ') + here.s.next.title; cont.append(sp); }
      cont.href = here.s.next ? root + here.s.next.href : root + here.n.path + '/';
      cont.hidden = false;
    }
  }
  if (window.wpProgressSummary) window.wpProgressSummary().then(apply).catch(function () { /* cards stay as built */ });
})();
