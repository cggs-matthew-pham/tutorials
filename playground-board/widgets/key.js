// Dichotomous key: students identify unnamed specimens by answering the key's yes/no questions, one step at a time.
// A specimen's name is shown only once the key leads to it.
//   widget: key
//   step A: Does it have a backbone? | B | D       a question, then where yes and no lead: another step (one capital
//                                                   letter) or a name. The first step is the start.
//   specimen: Kookaburra | Has a backbone, feathers and a beak.   the key's answer (hidden) and what the student can see;
//                                                   a third part names it when the answer is a group (Plant | … | Gum tree)
//   need: 5                                         how many to identify (default all)
// state: { scope: { vars: { n: identified, k: specimens, e: wrong identifications } } }
(function (B) {
  'use strict';
  var spec = null, st = null;

  function parse(s) {
    s.steps = {}; s.order = []; s.specimens = [];
    s.items.forEach(function (it) {
      var where = 'Line ' + it.line;
      if (it.kind === 'step') {
        if (!/^[A-Z]$/.test(it.name || '')) throw new Error(where + ': a step needs a one-letter capital name, such as "step A: Does it have a backbone? | B | D".');
        var p = it.value.split('|').map(function (t) { return t.trim(); });
        if (p.length !== 3 || !p[0] || !p[1] || !p[2]) throw new Error(where + ': write the question, then where yes leads, then where no leads, separated by |.');
        if (s.steps[it.name]) throw new Error(where + ': there is already a step ' + it.name + '.');
        s.steps[it.name] = { name: it.name, q: p[0], yes: p[1], no: p[2] }; s.order.push(it.name);
      } else if (it.kind === 'specimen') {
        var q = it.value.split('|').map(function (t) { return t.trim(); });
        if (q.length < 2 || q.length > 3 || !q[0] || !q[1]) throw new Error(where + ': write the key\'s answer, then what it looks like (and optionally its own name), separated by |.');
        s.specimens.push({ name: q[0], text: q[1], show: q[2] ? q[2] + ' (' + q[0] + ')' : q[0] });
      }
    });
    if (!s.order.length) throw new Error('A key needs at least one step.');
    if (!s.specimens.length) throw new Error('Add at least one specimen to identify.');
    var isStep = function (t) { return /^[A-Z]$/.test(t); };
    s.order.forEach(function (n) { [s.steps[n].yes, s.steps[n].no].forEach(function (t) { if (isStep(t) && !s.steps[t]) throw new Error('Step ' + n + ' leads to step ' + t + ', which is not in the key.'); }); });
    // Every specimen must be reachable along exactly one path, with no loops.
    s.paths = {};
    (function walk(n, path, seen) {
      if (seen[n]) throw new Error('The key goes round in a loop at step ' + n + '.');
      var st2 = s.steps[n], nx = Object.assign({}, seen); nx[n] = 1;
      [['yes', st2.yes], ['no', st2.no]].forEach(function (b) {
        var p = path.concat([[n, b[0]]]);
        if (isStep(b[1])) walk(b[1], p, nx); else { if (s.paths[b[1]]) throw new Error('"' + b[1] + '" appears twice in the key.'); s.paths[b[1]] = p; }
      });
    })(s.order[0], [], {});
    s.specimens.forEach(function (sp) { if (!s.paths[sp.name]) throw new Error('No path in the key leads to "' + sp.name + '".'); });
    s.need = s.need ? Math.min(s.specimens.length, Number(s.need)) : s.specimens.length;
  }

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var wrap = el('div', 'kwrap');
    // Specimen cards.
    var cards = el('div', 'kcards');
    spec.specimens.forEach(function (sp, i) {
      var done = st.found[i], b = el('button', 'kcard' + (i === st.cur ? ' on' : '') + (done ? ' done' : ''));
      b.type = 'button';
      b.append(el('b', '', done ? sp.show : 'Specimen ' + (i + 1)), el('span', '', sp.text));
      b.setAttribute('aria-pressed', String(i === st.cur));
      b.addEventListener('click', function () { st.cur = i; st.at = spec.order[0]; st.path = []; st.result = null; B.moved = true; paint(); report(); });
      cards.appendChild(b);
    });
    wrap.appendChild(cards);
    // The key, one step at a time.
    var box = el('div', 'kbox');
    if (st.cur === null) box.appendChild(el('p', 'kq', 'Choose a specimen to identify.'));
    else {
      var sp = spec.specimens[st.cur];
      box.appendChild(el('p', 'ksp', 'Specimen ' + (st.cur + 1) + ': ' + sp.text));
      if (st.path.length) box.appendChild(el('p', 'ktrail', st.path.map(function (p) { return p[0] + ' ' + p[1]; }).join(' → ')));
      if (st.result === null) {
        var s1 = spec.steps[st.at];
        box.appendChild(el('p', 'kq', s1.name + '. ' + s1.q));
        var row = el('div', 'kbtns');
        [['yes', 'Yes'], ['no', 'No']].forEach(function (a) {
          var b = el('button', 'go', a[1]); b.type = 'button';
          b.addEventListener('click', function () { answer(a[0]); });
          row.appendChild(b);
        });
        if (st.path.length) { var back = el('button', 'quiet', 'Back a step'); back.type = 'button'; back.addEventListener('click', function () { var p = st.path.pop(); st.at = p[0]; B.moved = true; paint(); report(); }); row.appendChild(back); }
        box.appendChild(row);
      } else {
        var ok = st.result === sp.name, msg;
        if (ok) msg = 'The key says ' + sp.name + '. Correct' + (sp.show !== sp.name ? ': it is a ' + sp.show.replace(/ \(.*\)$/, '').toLowerCase() : '') + '!';
        else {
          var right = spec.paths[sp.name], k = 0;
          while (k < right.length && st.path[k] && right[k][0] === st.path[k][0] && right[k][1] === st.path[k][1]) k++;
          msg = 'The key says ' + st.result + ', but that is not this specimen. Look again at step ' + right[k][0] + ': "' + spec.steps[right[k][0]].q + '" What does the description say?';
        }
        box.appendChild(el('p', ok ? 'kres ok' : 'kres', msg));
        var again = el('button', ok ? 'quiet' : 'go', ok ? 'Next specimen' : 'Try again from the start'); again.type = 'button';
        again.addEventListener('click', function () {
          if (ok) { var nx = spec.specimens.findIndex(function (x, i) { return !st.found[i]; }); st.cur = nx < 0 ? null : nx; }
          st.at = spec.order[0]; st.path = []; st.result = null; B.moved = true; paint(); report();
        });
        box.appendChild(again);
      }
    }
    wrap.appendChild(box);
    panel.appendChild(wrap);
    // The whole key, as it would be printed.
    var det = el('details', 'kfull'), sum = el('summary', '', 'The whole key'); det.appendChild(sum);
    var ol = el('ol', '');
    spec.order.forEach(function (n) {
      var s1 = spec.steps[n], li = el('li', n === st.at && st.result === null && st.cur !== null ? 'here' : '');
      var lead = function (t) { return /^[A-Z]$/.test(t) ? 'go to ' + t : t; };
      li.textContent = n + '. ' + s1.q + '  Yes: ' + lead(s1.yes) + '.  No: ' + lead(s1.no) + '.';
      ol.appendChild(li);
    });
    det.appendChild(ol); panel.appendChild(det);
  }

  function answer(a) {
    var s1 = spec.steps[st.at], to = s1[a];
    st.path.push([st.at, a]); B.moved = true;
    if (/^[A-Z]$/.test(to)) st.at = to;
    else {
      st.result = to;
      if (to === spec.specimens[st.cur].name) st.found[st.cur] = true; else st.wrong++;
    }
    paint(); report();
  }

  function report() {
    var n = st.found.filter(Boolean).length, k = spec.specimens.length;
    B.say(n >= spec.need ? 'You identified ' + n + ' of ' + k + ' specimens with the key.' : n + ' of ' + k + ' identified.', n >= spec.need);
    B.save({ found: st.found });
    B.post({ scope: { vars: { n: n, k: k, e: st.wrong }, points: {} } }, n + ' of ' + k + ' identified; ' + st.wrong + ' wrong');
  }

  B.widget('key', {
    sections: ['gpanel'],
    label: function () { return 'A dichotomous key'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec;
      var s = fresh ? null : B.saved();
      st = { found: spec.specimens.map(function (x, i) { return !!(s && s.found && s.found[i]); }), cur: 0, at: spec.order[0], path: [], result: null, wrong: 0 };
      paint(); report();
    },
  });
})(WPB);
