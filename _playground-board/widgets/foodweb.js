// Food webs: organisms laid out by feeding level, arrows pointing the way energy flows (from the food to the eater).
//   widget: foodweb
//   organism G: Grass                    one capital letter and a name (add ", decomposer" for decomposers)
//   eats K: L, G                         K eats L and G (each makes an arrow L → K, G → K)
//   mode: build | trace | remove         build: students draw the arrows (click the food, then the eater)
//                                        trace: arrows shown; students follow energy up a food chain, click by click
//                                        remove: arrows shown; one species is removed and students predict what
//                                                happens to each other population, then compare with the model
//   energy: 10000                        trace: energy at the producers (kJ); each level up keeps 10%
//   remove: D                            remove: the species taken out (otherwise students choose)
// state: { scope: { vars } }
//   build:  c correct arrows, x wrong arrows, k arrows in the web
//   trace:  l longest chain traced (number of organisms), n chains traced
//   remove: r 1 once a species is removed, p predictions made, k to predict, h 1 once checked, c predictions that match
(function (B) {
  'use strict';
  var spec = null, st = null, objs = null;
  var KEYS = { up: '↑ more', down: '↓ fewer', same: '– little change' };

  function parse(s) {
    s.orgs = {}; s.order = []; s.links = [];
    s.items.forEach(function (it) {
      var where = 'Line ' + it.line;
      if (it.kind === 'organism') {
        if (!/^[A-Z]$/.test(it.name || '')) throw new Error(where + ': an organism needs a one-letter capital name, such as "organism G: Grass".');
        var p = it.value.split(',').map(function (t) { return t.trim(); });
        s.orgs[it.name] = { id: it.name, label: p[0], dec: /^decomposer$/i.test(p[1] || '') }; s.order.push(it.name);
      }
    });
    s.items.forEach(function (it) {
      if (it.kind !== 'eats') return;
      var where = 'Line ' + it.line;
      if (!s.orgs[it.name]) throw new Error(where + ': there is no organism ' + it.name + '.');
      it.value.split(',').map(function (t) { return t.trim(); }).forEach(function (f) {
        if (!s.orgs[f]) throw new Error(where + ': there is no organism ' + f + '.');
        s.links.push([f, it.name]);
      });
    });
    if (s.order.length < 2) throw new Error('A food web needs at least two organisms.');
    s.mode = s.mode || 'build';
    if (['build', 'trace', 'remove'].indexOf(s.mode) < 0) throw new Error('mode: build, trace or remove.');
    if (s.remove && !s.orgs[s.remove]) throw new Error('remove: there is no organism ' + s.remove + '.');
    s.energy0 = s.energy ? Number(s.energy) : 0;
    // Feeding level: producers 0, each eater one above its highest food (decomposers sit apart).
    var level = {}, eats = function (id) { return s.links.filter(function (l) { return l[1] === id; }).map(function (l) { return l[0]; }); };
    var lv = function (id, seen) {
      if (level[id] !== undefined) return level[id];
      if (seen[id]) throw new Error('The web loops back to ' + s.orgs[id].label + ' (something eats what eats it).');
      var food = eats(id).filter(function (f) { return !s.orgs[f].dec; }), nx = Object.assign({}, seen); nx[id] = 1;
      level[id] = food.length ? 1 + Math.max.apply(null, food.map(function (f) { return lv(f, nx); })) : 0;
      return level[id];
    };
    s.order.forEach(function (id) { if (!s.orgs[id].dec) lv(id, {}); });
    s.level = level;
  }

  // ---------- layout and drawing ----------
  function layout() {
    var live = spec.order.filter(function (id) { return !spec.orgs[id].dec; }), dec = spec.order.filter(function (id) { return spec.orgs[id].dec; });
    var top = Math.max.apply(null, live.map(function (id) { return spec.level[id]; })), pos = {};
    var right = dec.length ? 15.2 : 19;
    for (var L = 0; L <= top; L++) {
      var row = live.filter(function (id) { return spec.level[id] === L; });
      row.forEach(function (id, i) { pos[id] = [1 + (right - 1) * (i + 0.5) / row.length, 1.2 + (top ? L * 7.4 / top : 4)]; });
    }
    dec.forEach(function (id, i) { pos[id] = [17.4, 2 + i * 2.4]; });
    return pos;
  }
  function build() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', accent = B.css('--accent') || '#c2570a', ok = B.css('--ok') || '#1a7f37';
    var board = B.jsx({ boundingbox: [0, 10, 20, -0.4] }), pos = layout();
    objs = { board: board, pos: pos, arrows: {}, nodes: {} };
    // Arrows first, so the organism boxes sit on top of their ends.
    var edge = function (a, b) {
      var pa = pos[a], pb = pos[b], dx = pb[0] - pa[0], dy = pb[1] - pa[1], d = Math.hypot(dx, dy) || 1;
      var cut = function (ux, uy) { var t = Math.min(1.45 / Math.abs(ux || 1e-9), 0.5 / Math.abs(uy || 1e-9)); return t; };
      var t0 = cut(dx / d, dy / d) + 0.1;
      return [[pa[0] + dx / d * t0, pa[1] + dy / d * t0], [pb[0] - dx / d * t0, pb[1] - dy / d * t0]];
    };
    objs.drawArrow = function (a, b, colour, dash) {
      var e = edge(a, b);
      return board.create('arrow', e, { strokeColor: colour, strokeWidth: 2.5, dash: dash || 0, lastArrow: { type: 2, size: 4 }, fixed: true, highlight: false });
    };
    spec.order.forEach(function (id) {
      var o = spec.orgs[id], p = pos[id];
      // strokeColor is the text colour JSXGraph writes inline, so it must follow the theme. Decomposers sit at the right
      // edge, anchored on their right so a narrow screen doesn't cut them off.
      var t = board.create('text', [o.dec ? 19.7 : p[0], p[1], o.label], { anchorX: o.dec ? 'right' : 'middle', anchorY: 'middle', display: 'html', cssClass: 'fwnode' + (o.dec ? ' dec' : ''), highlightCssClass: 'fwnode' + (o.dec ? ' dec' : ''), strokeColor: ink, highlightStrokeColor: ink, fixed: true });
      objs.nodes[id] = t;
      if (spec.energy0 && spec.mode === 'trace' && !o.dec) board.create('text', [p[0], p[1] - 0.75, fmtE(spec.energy0 / Math.pow(10, spec.level[id])) + ' kJ'], { anchorX: 'middle', anchorY: 'middle', fontSize: 11, strokeColor: muted, fixed: true, display: 'internal' });
    });
    board.update();
    spec.order.forEach(function (id) {
      var n = objs.nodes[id].rendNode;
      n.setAttribute('role', 'button'); n.setAttribute('tabindex', '0'); n.setAttribute('aria-label', spec.orgs[id].label);
      n.addEventListener('click', function () { tap(id); });
      n.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(id); } });
    });
    objs.ink = ink; objs.accent = accent; objs.ok = ok; objs.muted = muted;
    redrawArrows();
  }
  var fmtE = function (v) { return v >= 1 ? Math.round(v).toLocaleString('en-AU') : String(+v.toFixed(2)); };
  function redrawArrows() {
    var board = objs.board;
    Object.keys(objs.arrows).forEach(function (k) { board.removeObject(objs.arrows[k]); }); objs.arrows = {};
    var list = spec.mode === 'build' ? st.drawn : spec.links;
    list.forEach(function (l) {
      if (st.removed && (l[0] === st.removed || l[1] === st.removed)) return;
      var right = spec.links.some(function (x) { return x[0] === l[0] && x[1] === l[1]; });
      var colour = spec.mode === 'build' && !right ? '#b42318' : objs.ink;
      objs.arrows[l.join('>')] = objs.drawArrow(l[0], l[1], colour, spec.mode === 'build' && !right ? 2 : 0);
    });
    if (spec.mode === 'trace') for (var i = 1; i < st.chain.length; i++) objs.arrows['c' + i] = objs.drawArrow(st.chain[i - 1], st.chain[i], objs.accent);
    // Node states.
    spec.order.forEach(function (id) {
      var n = objs.nodes[id].rendNode;
      n.classList.toggle('sel', st.sel === id || st.chain.indexOf(id) >= 0);
      n.classList.toggle('gone', st.removed === id);
      var pr = st.pred[id], res = st.checked ? st.model[id] : null;
      n.dataset.pred = pr ? KEYS[pr].slice(0, 1) : '';
      n.classList.toggle('right', !!(res && pr && (res.dir === pr || res.dir === 'either' && pr !== 'same')));
      n.classList.toggle('wrong', !!(res && pr && !(res.dir === pr || res.dir === 'either' && pr !== 'same')));
    });
    board.update();
  }

  // ---------- interaction ----------
  function tap(id) {
    B.moved = true;
    if (spec.mode === 'build') {
      if (!st.sel) { st.sel = id; }
      else if (st.sel === id) { st.sel = null; }
      else {
        var k = st.drawn.findIndex(function (l) { return l[0] === st.sel && l[1] === id; });
        if (k >= 0) st.drawn.splice(k, 1); else st.drawn.push([st.sel, id]);
        st.last = [st.sel, id]; st.sel = null;
      }
    } else if (spec.mode === 'trace') {
      if (st.finished) { st.chain = []; st.finished = false; }   // a finished chain: the next click starts a new one
      var c = st.chain;
      if (!c.length) { if (spec.level[id] !== 0 || spec.orgs[id].dec) { st.note = 'Start a food chain with a producer: something that makes its own food.'; } else c.push(id); }
      else if (spec.links.some(function (l) { return l[0] === c[c.length - 1] && l[1] === id; })) {
        c.push(id);
        if (!spec.links.some(function (l) { return l[0] === id && !spec.orgs[l[1]].dec; })) { st.done.push(c.slice()); st.note = 'Chain complete: ' + c.map(function (x) { return spec.orgs[x].label; }).join(' → ') + '.'; st.finished = true; }
      } else st.note = spec.orgs[id].label + ' does not eat ' + spec.orgs[c[c.length - 1]].label + '. Follow an arrow.';
    } else if (spec.mode === 'remove') {
      if (!st.removed) { if (spec.orgs[id].dec) { st.note = 'Choose a plant or animal to remove.'; } else { st.removed = id; model(); } }
      else if (id !== st.removed && !spec.orgs[id].dec && !st.checked) { var cyc = ['up', 'down', 'same']; st.pred[id] = cyc[(cyc.indexOf(st.pred[id]) + 1) % 3]; }
    }
    redrawArrows(); paintPanel(); report();
  }

  // The model's prediction after removing one species, spreading outwards one feeding link at a time:
  //   step 1: its eaters lose food (fewer); its food loses an eater (more);
  //   each later step: from every species that changed, what eats it gets more (or less) food, and what it eats gets
  //   eaten more (or less). A species takes the nearest effect; two effects at the same distance that disagree make it
  //   "could go either way". Species too far from any change (or decomposers) are left as little change.
  function model() {
    var X = st.removed, m = {}, org = function (id) { return spec.orgs[id].label; };
    var eatsOf = function (id) { return spec.links.filter(function (l) { return l[1] === id; }).map(function (l) { return l[0]; }); };
    var eatenBy = function (id) { return spec.links.filter(function (l) { return l[0] === id; }).map(function (l) { return l[1]; }); };
    var step = {}, put = function (id, dir, why) {
      if (id === X || spec.orgs[id].dec || m[id]) return;
      if (!step[id]) step[id] = { dir: dir, why: [why] }; else { if (step[id].dir !== dir) step[id].dir = 'either'; if (step[id].why.indexOf(why) < 0) step[id].why.push(why); }
    };
    eatenBy(X).forEach(function (id) { put(id, 'down', 'its food, ' + org(X) + ', is gone'); });
    eatsOf(X).forEach(function (id) { put(id, 'up', org(X) + ', which ate it, is gone'); });
    for (var depth = 0; depth < 6 && Object.keys(step).length; depth++) {
      var front = step; Object.keys(front).forEach(function (id) { m[id] = front[id]; });
      step = {};
      Object.keys(front).forEach(function (Y) {
        var d = front[Y].dir; if (d === 'either') return;
        eatenBy(Y).forEach(function (id) { put(id, d, 'its food, ' + org(Y) + ', went ' + d); });
        eatsOf(Y).forEach(function (id) { put(id, d === 'up' ? 'down' : 'up', org(Y) + ', which eats it, went ' + d); });
      });
    }
    spec.order.forEach(function (id) { if (id !== X && !spec.orgs[id].dec && !m[id]) m[id] = { dir: 'same', why: ['not linked to the change'] }; });
    st.model = m;
  }

  // ---------- panel ----------
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = document.createElement('div'); row.className = 'fbar';
    var btn = function (text, on, cls) { var b = document.createElement('button'); b.type = 'button'; b.textContent = text; if (cls) b.className = cls; b.addEventListener('click', on); row.appendChild(b); return b; };
    var note = document.createElement('p'); note.className = 'fsum';
    if (spec.mode === 'build') {
      note.textContent = st.sel ? 'Now click what eats ' + spec.orgs[st.sel].label + '.' : 'Click a food, then the organism that eats it. Click the same pair again to remove an arrow.';
    } else if (spec.mode === 'trace') {
      note.textContent = st.note || 'Click a producer, then follow the arrows up, one organism at a time.';
      if (st.chain.length) btn('Start a new chain', function () { st.chain = []; st.finished = false; st.note = ''; redrawArrows(); paintPanel(); report(); }, 'quiet');
    } else {
      if (!st.removed) {
        note.textContent = spec.remove ? '' : 'Click the species to remove.';
        if (spec.remove) btn('Remove the ' + spec.orgs[spec.remove].label.toLowerCase(), function () { B.moved = true; st.removed = spec.remove; model(); redrawArrows(); paintPanel(); report(); }, 'go');
      } else if (!st.checked) {
        var left = spec.order.filter(function (id) { return id !== st.removed && !spec.orgs[id].dec && !st.pred[id]; });
        note.textContent = 'Click each organism to predict its population: ↑ more, ↓ fewer, – little change. ' + (left.length ? left.length + ' to go.' : 'Ready to check.');
        var ck = btn('Check my predictions', function () { st.checked = true; B.moved = true; redrawArrows(); paintPanel(); report(); }, 'go');
        ck.disabled = left.length > 0;
      } else {
        var list = document.createElement('ul'); list.className = 'fwres';
        spec.order.forEach(function (id) {
          var r = st.model[id]; if (!r) return;
          var li = document.createElement('li'), pr = st.pred[id], good = pr && (r.dir === pr || r.dir === 'either' && pr !== 'same');
          li.className = good ? 'ok' : 'no';
          li.textContent = spec.orgs[id].label + ': ' + (r.dir === 'either' ? 'could go either way' : KEYS[r.dir]) + ' (' + r.why.join('; ') + ')' + (pr ? ' · you said ' + KEYS[pr] : '');
          list.appendChild(li);
        });
        panel.appendChild(list);
        btn('Start again', B.restart, 'quiet');
      }
    }
    if (st.note && spec.mode !== 'trace') { note.textContent = st.note + ' ' + note.textContent; st.note = ''; }
    panel.prepend(note); panel.appendChild(row);
  }

  function report() {
    var vars;
    if (spec.mode === 'build') {
      var c = st.drawn.filter(function (l) { return spec.links.some(function (x) { return x[0] === l[0] && x[1] === l[1]; }); }).length, x = st.drawn.length - c;
      var back = st.drawn.filter(function (l) { return spec.links.some(function (y) { return y[0] === l[1] && y[1] === l[0]; }); }).length;
      vars = { c: c, x: x, k: spec.links.length };
      B.say(c === spec.links.length && !x ? 'Every feeding link is drawn, each arrow pointing from the food to the eater.' : c + ' of ' + spec.links.length + ' links' + (x ? ' · ' + x + ' arrow' + (x > 1 ? 's' : '') + ' (red) not right' + (back ? ': arrows point from the food to the eater, the way energy flows' : '') : '') + '.', c === spec.links.length && !x);
    } else if (spec.mode === 'trace') {
      var longest = Math.max.apply(null, [0].concat(st.done.map(function (d) { return d.length; })));
      vars = { l: longest, n: st.done.length };
      var e = st.chain.length && spec.energy0 ? ' Energy reaching ' + spec.orgs[st.chain[st.chain.length - 1]].label + ': ' + fmtE(spec.energy0 / Math.pow(10, st.chain.length - 1)) + ' kJ of the ' + fmtE(spec.energy0) + ' kJ the producer captured.' : '';
      B.say((st.chain.length ? st.chain.map(function (x) { return spec.orgs[x].label; }).join(' → ') + '.' : '') + e, false);
    } else {
      var k = spec.order.filter(function (id) { return !spec.orgs[id].dec && id !== st.removed; }).length;
      var p = Object.keys(st.pred).length, cc = st.checked ? Object.keys(st.pred).filter(function (id) { var r = st.model[id]; return r && (r.dir === st.pred[id] || r.dir === 'either' && st.pred[id] !== 'same'); }).length : 0;
      vars = { r: st.removed ? 1 : 0, p: p, k: k, h: st.checked ? 1 : 0, c: cc };
      B.say(st.checked ? cc + ' of ' + k + ' predictions match the model. Read the reasons for each one.' : st.removed ? spec.orgs[st.removed].label + ' removed.' : '', st.checked);
    }
    B.post({ scope: { vars: vars, points: {} } }, Object.keys(vars).map(function (k2) { return k2 + ' = ' + vars[k2]; }).join('; '));
  }

  B.widget('foodweb', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'A food web of ' + s.order.map(function (id) { return s.orgs[id].label; }).join(', '); },
    parse: parse,
    start: function () {
      spec = B.spec;
      st = { drawn: [], sel: null, chain: [], done: [], finished: false, removed: null, pred: {}, checked: false, model: {}, note: '' };
      build(); paintPanel(); report();
    },
    redraw: function () { build(); },
    resize: function () { var b = B.jsxBoard; b.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); b.setBoundingBox([0, 10, 20, -0.4], false); b.update(); },
  });
})(WPB);
