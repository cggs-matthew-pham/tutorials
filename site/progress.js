// Progress views: this browser's progress (localStorage "wp-progress") compared with progress-manifest.json,
// which the build writes. Nothing is sent anywhere. A course page shows it in full (My progress); a page that
// lists courses shows a line per course. window.wpProgressSummary() returns the same data for export later.
(function () {
  var script = document.currentScript;
  var root = (script && script.dataset.root) || '';
  var cache = null;

  function load() { try { return JSON.parse(localStorage.getItem('wp-progress')) || {}; } catch (e) { return {}; } }
  function manifest() {
    if (cache) return Promise.resolve(cache);
    return fetch(root + 'progress-manifest.json').then(function (r) { return r.json(); }).then(function (m) { cache = m; return m; });
  }
  function count(prefix, suffix) {
    var n = 0;
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf(prefix) === 0 && (!suffix || k.slice(-suffix.length) === suffix)) n++; } } catch (e) { /* ignore */ }
    return n;
  }
  function tools(kind) { try { return (JSON.parse(localStorage.getItem('wp-mytools:' + kind)) || []).length; } catch (e) { return 0; } }
  function modules() {
    var n = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k === 'wp-mymodules:turtle' || (k.indexOf('wp-playground:') === 0 && k.slice(-5) === ':mods')) n += Object.keys(JSON.parse(localStorage.getItem(k)) || {}).length;
      }
    } catch (e) { /* ignore */ }
    return n;
  }

  function summary(m) {
    var p = load(), done = p.done || {}, unlocked = p.unlocked || {};
    return m.paths.map(function (path) {
      var lessons = path.lessons.map(function (l) {
        var got = l.checks.filter(function (k) { return done[k]; }).length;
        return { title: l.title, order: l.order, href: l.href, checks: l.checks.length, done: got, complete: l.checks.length > 0 && got === l.checks.length, optional: !!l.optional, unit: l.unit || null };
      });
      var snips = (path.snippets || []).map(function (s) { return { id: s.id, label: s.label, lesson: s.lesson, step: s.step, got: !!(p.all || unlocked[path.kind + ':' + s.id]) }; });
      return { title: path.title, href: path.href, kind: path.kind, lessons: lessons, snippets: snips };
    });
  }
  window.wpProgressSummary = function () { return manifest().then(summary); };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  // Course page: fill each lesson row from this browser's progress, pick what to continue, mark units and the challenge.
  function course() {
    var list = document.getElementById('course');
    if (!list) return;
    var p = load(), done = p.done || {}, rows = [].slice.call(list.querySelectorAll('.crow')), any = false;
    var info = rows.map(function (r) {
      var keys = r.dataset.keys ? r.dataset.keys.split('|') : [], hrefs = r.dataset.hrefs ? r.dataset.hrefs.split('|') : [], labels = r.dataset.labels ? r.dataset.labels.split('|') : [];
      var n = 0, first = -1;
      keys.forEach(function (k, i) { if (done[k]) n++; else if (first < 0) first = i; });
      [].forEach.call(r.querySelectorAll('[data-key]'), function (d) { d.classList.toggle('on', !!done[d.dataset.key]); });
      var all = keys.length > 0 && n === keys.length;
      if (n) any = true;
      r.classList.toggle('started', n > 0 && !all); r.classList.toggle('done', all);
      var st = r.querySelector('.cstat');
      if (st && keys.length) st.textContent = all ? 'Done' : n ? n + '/' + keys.length : 'Not started';
      var go = r.querySelector('.cgo');
      if (go && keys.length) { go.textContent = all ? 'Review lesson' : n ? 'Continue: ' + labels[first] : 'Start lesson'; go.href = all || !n ? r.dataset.href : hrefs[first]; }
      var a = document.createElement('a'); a.href = r.dataset.href;
      return { row: r, keys: keys, all: all, optional: r.dataset.optional === '1', path: a.pathname, started: n > 0, next: first >= 0 ? { href: hrefs[first], label: labels[first] } : null };
    });
    // Units: how many of their required lessons are done.
    [].forEach.call(list.querySelectorAll('.unit'), function (u) {
      var mine = info.filter(function (x) { return u.contains(x.row) && x.keys.length && !x.optional; });
      var st = u.querySelector('.ustat');
      if (st && mine.length) st.textContent = mine.filter(function (x) { return x.all; }).length + ' of ' + mine.length + ' done';
    });
    var badge = document.getElementById('badge');
    if (badge) {
      var cu = list.querySelector('.unit[data-unit="' + badge.dataset.unit + '"]');
      var need = info.filter(function (x) { return cu && cu.contains(x.row) && x.keys.length && !x.optional; });
      badge.hidden = !(need.length && need.every(function (x) { return x.all; }));
    }
    // Continue: the lesson last opened, if it is unfinished; otherwise the first unfinished required lesson,
    // then the first unfinished optional one.
    var last = null; try { last = JSON.parse(localStorage.getItem('wp-last-lesson')); } catch (e) { /* ignore */ }
    var open = function (x) { return x.keys.length && !x.all; };
    var pick = info.filter(function (x) { return last && x.path === last.href && open(x); })[0] ||
      info.filter(function (x) { return open(x) && !x.optional; })[0] || info.filter(open)[0];
    var c = document.getElementById('continue');
    if (pick) { pick.row.classList.add('next'); pick.row.open = true; }
    if (c) {
      if (pick) {
        c.href = pick.started && pick.next ? pick.next.href : pick.row.dataset.href;
        c.querySelector('.ck').textContent = any ? 'Continue' : 'Start';
        c.querySelector('b').textContent = pick.row.dataset.title.replace(/Optional:\s*/, '') + (pick.optional ? ' (optional)' : '');
        c.querySelector('.cstep').textContent = any && pick.next ? 'Next: ' + pick.next.label : '';
      } else if (info.some(function (x) { return x.keys.length; })) {
        c.querySelector('.ck').textContent = 'All done';
        c.querySelector('b').textContent = 'Every lesson here is complete. Try the playground.';
        c.href = 'playground/'; c.querySelector('.cstep').textContent = '';
      }
    }
    var foot = document.getElementById('cfoot');
    if (foot) manifest().then(function (m) {
      var path = summary(m).filter(function (x) { return location.pathname.slice(-x.href.length) === x.href; })[0];
      if (!path) return;
      foot.replaceChildren();
      var bits = [];
      if (path.snippets.length) {
        var got = path.snippets.filter(function (x) { return x.got; }).length, nx = path.snippets.filter(function (x) { return !x.got; })[0];
        bits.push(['Snippets unlocked: ', got + ' of ' + path.snippets.length]);
        if (nx) bits.push(['Next unlock: ', nx.label]);
      }
      if (path.kind === 'turtle') { bits.push(['My tools: ', String(tools('turtle'))]); bits.push(['My modules: ', String(modules())]); }
      bits.forEach(function (b, i) { if (i) foot.append(' · '); foot.append(b[0]); foot.append(el('b', null, b[1])); });
      foot.append(el('br')); foot.append('Progress is saved in this browser only. Nothing is sent anywhere.');
    }).catch(function () { /* footer stays as built */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', course); else course();
  window.addEventListener('pageshow', function (e) { if (e.persisted) course(); }); // back button from a lesson

  // A page that lists courses (such as /code/): one progress line under each course card.
  function courseCards() {
    var cards = [].slice.call(document.querySelectorAll('ul.lessons a, a.pcard'));
    if (!cards.length) return;
    manifest().then(function (m) {
      summary(m).forEach(function (path) {
        var req = path.lessons.filter(function (l) { return l.checks && !l.optional; }), total = req.length;
        if (!total) return;
        var want = new URL(root + path.href, location.href).pathname;
        cards.forEach(function (a) {
          if (a.pathname !== want || a.querySelector('.cprog')) return;
          var done = req.filter(function (l) { return l.complete; }).length;
          var going = req.filter(function (l) { return l.done && !l.complete; }).length;
          var line = el('em', 'cprog', done + ' of ' + total + ' lessons done' + (going ? ' · ' + going + ' in progress' : ''));
          var bar = el('i', 'cbar'), fill = el('i'); fill.style.width = Math.round(100 * done / total) + '%'; bar.append(fill);
          a.append(line, bar);
        });
      });
    }).catch(function () { /* cards stay as built */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', courseCards); else courseCards();
})();
