// Coordination and control: response pathways, nerves versus hormones, and negative feedback (AC9S9U01).
//   widget: coordination
//   mode: pathway | build | race | feedback
//   stimulus: Touching a hot pan | external | Heat receptors in the skin | Spinal cord | Arm muscles | You pull your hand away
//                       (pathway and build: a stimulus, internal or external, receptor, command centre, effector, response)
//   need: 3             (pathway: stimuli to try; build: pathways to build correctly)
//   break: on           (feedback: buttons that break the receptor, the control centre or the effectors)
// state: { scope: { vars } }
//   pathway: n stimuli tried          build: c pathways built correctly
//   race:    r races run              feedback: t minutes, v body temperature, s set point, d distance from the set
//            point, r recoveries (back within 0.3 °C after being more than 0.6 °C away), b 1 while something is broken
(function (B) {
  'use strict';
  var spec = null, st = null, raf = 0;
  var STEPS = ['Stimulus', 'Receptor', 'Command centre', 'Effector', 'Response'];

  function parse(s) {
    s.mode = s.mode || 'pathway';
    if (['pathway', 'build', 'race', 'feedback'].indexOf(s.mode) < 0) throw new Error('mode: pathway, build, race or feedback.');
    s.stimuli = [];
    s.items.forEach(function (it) {
      if (it.kind !== 'stimulus') return;
      var p = it.value.split('|').map(function (t) { return t.trim(); });
      if (p.length !== 6 || !/^(internal|external)$/i.test(p[1])) throw new Error('Line ' + it.line + ': stimulus: what happens | internal or external | receptor | command centre | effector | response.');
      s.stimuli.push({ name: p[0], kind: p[1].toLowerCase(), parts: [p[0], p[2], p[3], p[4], p[5]] });
    });
    if ((s.mode === 'pathway' || s.mode === 'build') && !s.stimuli.length) throw new Error('Add at least one stimulus line.');
    s.need = Number(s.need) || (s.mode === 'build' ? Math.min(3, s.stimuli.length) : s.stimuli.length);
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

  // ---------- pathway and build ----------
  function paintPathway() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var pick = el('div', 'cobtns');
    spec.stimuli.forEach(function (s, i) {
      var b = el('button', 'cochip' + (st.cur === i ? ' on' : '') + (st.done[i] ? ' done' : ''), s.name); b.type = 'button';
      b.addEventListener('click', function () { st.cur = i; st.choice = {}; st.result = null; B.moved = true; if (spec.mode === 'pathway') { st.done[i] = true; run(); } paintPathway(); report(); });
      pick.appendChild(b);
    });
    panel.appendChild(pick);
    var row = el('div', 'corow');
    var s = st.cur === null ? null : spec.stimuli[st.cur];
    STEPS.forEach(function (name, k) {
      var box = el('div', 'cobox' + (st.lit >= k ? ' lit' : '') + (st.bad === k ? ' bad' : ''));
      box.appendChild(el('b', '', name));
      if (!s) box.appendChild(el('span', '', '…'));
      else if (spec.mode === 'build' && k >= 1 && k <= 3) {
        var sel = el('select'); sel.setAttribute('aria-label', name);
        var opts = []; spec.stimuli.forEach(function (x) { if (opts.indexOf(x.parts[k]) < 0) opts.push(x.parts[k]); });
        opts.sort(); sel.appendChild(new Option('Choose…', ''));
        opts.forEach(function (o) { var op = new Option(o, o); if (st.choice[k] === o) op.selected = true; sel.appendChild(op); });
        sel.addEventListener('change', function () { st.choice[k] = sel.value; st.bad = -1; st.result = null; });
        box.appendChild(sel);
      } else box.appendChild(el('span', '', k === 4 && spec.mode === 'build' && st.result !== 'ok' ? '?' : s.parts[k]));
      row.appendChild(box);
      if (k < 4) row.appendChild(el('i', 'coarrow' + (st.lit > k ? ' lit' : ''), '→'));
    });
    panel.appendChild(row);
    if (s) panel.appendChild(el('p', 'cokind', s.name + ' is ' + (s.kind === 'internal' ? 'an internal stimulus: a change inside the body.' : 'an external stimulus: a change outside the body.')));
    if (s && spec.mode === 'build') {
      var go = el('button', 'go', 'Send the signal'); go.type = 'button';
      go.addEventListener('click', function () {
        B.moved = true;
        var wrong = [1, 2, 3].filter(function (k) { return st.choice[k] !== s.parts[k]; });
        if (!wrong.length) { st.done[st.cur] = true; st.result = 'ok'; st.bad = -1; run(); }
        else { st.result = 'no'; st.bad = wrong[0]; st.lit = -1; }
        paintPathway(); report();
      });
      var bar = el('div', 'fbar'); bar.appendChild(go); panel.appendChild(bar);
      if (st.result === 'no') panel.appendChild(el('p', 'cobad', 'The signal stops at the ' + STEPS[st.bad].toLowerCase() + ': that part doesn’t fit this stimulus. ' + ({ 1: 'Which receptor detects this kind of change?', 2: 'Which part of the nervous or hormone system decides the response?', 3: 'Which muscle or gland carries out the response?' })[st.bad]));
    }
  }
  // The signal lights each box in turn.
  function run() {
    st.lit = 0; var t0 = performance.now();
    cancelAnimationFrame(raf);
    (function tick(now) { st.lit = Math.min(4, Math.floor((now - t0) / 380)); paintPathway(); if (st.lit < 4) raf = requestAnimationFrame(tick); })(t0);
  }

  // ---------- race: nerve against hormone ----------
  function paintRace() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var bar = el('div', 'fbar'); var go = el('button', 'go', st.racing ? 'Running…' : 'Send both signals'); go.type = 'button'; go.disabled = st.racing;
    go.addEventListener('click', function () { B.moved = true; race(); }); bar.appendChild(go); panel.appendChild(bar);
    panel.appendChild(el('p', 'cokind', 'Nerve: an electrical signal along nerve cells to one muscle. Hormone: a chemical (adrenaline) carried in the blood to many organs.'));
  }
  function buildRace() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', left = B.css('--left') || '#2f6fb3', right = B.css('--right') || '#8a4fb8';
    var board = B.jsx({ boundingbox: [-1.2, 1.25, 10.4, -0.32] });
    board.create('segment', [[0, 0], [10, 0]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false });
    board.create('segment', [[0, 0], [0, 1.1]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false });
    board.create('text', [5, -0.2, 'time (minutes, from the stimulus)'], { anchorX: 'middle', fontSize: 12, strokeColor: muted, fixed: true, display: 'internal' });
    board.create('text', [-0.15, 1.15, 'response'], { anchorX: 'left', fontSize: 12, strokeColor: muted, fixed: true, display: 'internal' });
    [0, 2, 4, 6, 8, 10].forEach(function (x) { board.create('text', [x, -0.08, String(x)], { anchorX: 'middle', anchorY: 'top', fontSize: 11, strokeColor: muted, fixed: true, display: 'internal' }); });
    // Nerve: starts within a fraction of a second, ends within seconds. Hormone: builds over a minute or two, lasts many minutes.
    var nerve = function (t) { return t < 0.02 ? 0 : t < 0.15 ? 1 : Math.max(0, 1 - (t - 0.15) * 8); };
    var horm = function (t) { return t < 0.5 ? 0 : 0.8 * (1 - Math.exp(-(t - 0.5) / 0.8)) * Math.exp(-Math.max(0, t - 2) / 4); };
    st.cv = [nerve, horm].map(function (f, i) {
      var c = board.create('curve', [[], []], { strokeColor: i ? right : left, strokeWidth: 3, fixed: true, highlight: false });
      c.updateDataArray = function () { var xs = [], ys = []; for (var x = 0; x <= st.t; x += 0.02) { xs.push(x); ys.push(f(x)); } this.dataX = xs; this.dataY = ys; };
      return c;
    });
    board.create('text', [1.2, 1.02, 'Nerve: fast, short, one target'], { anchorX: 'left', fontSize: 13, strokeColor: left, fixed: true, display: 'internal', cssStyle: 'font-weight:600' });
    board.create('text', [3.4, 0.62, 'Hormone: slower, lasts longer, many targets'], { anchorX: 'left', fontSize: 13, strokeColor: right, fixed: true, display: 'internal', cssStyle: 'font-weight:600' });
    board.update();
  }
  function race() {
    st.racing = true; st.t = 0; paintRace();
    var t0 = performance.now();
    cancelAnimationFrame(raf);
    (function tick(now) { st.t = Math.min(10, (now - t0) / 500); B.jsxBoard.update(); if (st.t < 10) raf = requestAnimationFrame(tick); else { st.racing = false; st.races++; paintRace(); report(); } })(t0);
  }

  // ---------- feedback: body temperature ----------
  function buildFeedback() {
    var ink = B.css('--ink') || '#1d2430', muted = B.css('--muted') || '#5d6675', accent = B.css('--accent') || '#c2570a', ok = B.css('--ok') || '#1a7f37';
    var board = B.jsx({ boundingbox: [-6, 41, 68, 33.2] });
    [34, 35, 36, 37, 38, 39, 40].forEach(function (y) { board.create('text', [-1, y, y + ' °C'], { anchorX: 'right', anchorY: 'middle', fontSize: 11, strokeColor: muted, fixed: true, display: 'internal' }); });
    board.create('segment', [[0, 34], [0, 40.5]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false });
    board.create('segment', [[0, 34], [60, 34]], { strokeColor: muted, strokeWidth: 1.5, fixed: true, highlight: false });
    board.create('text', [30, 33.8, 'the last hour (minutes)'], { anchorX: 'middle', anchorY: 'top', fontSize: 11, strokeColor: muted, fixed: true, display: 'internal' });
    board.create('polygon', [[0, 36.7], [60, 36.7], [60, 37.3], [0, 37.3]], { fillColor: ok, fillOpacity: 0.12, borders: { strokeWidth: 0 }, vertices: { visible: false }, fixed: true, highlight: false });
    board.create('segment', [[0, 37], [60, 37]], { strokeColor: ok, strokeWidth: 1.5, dash: 2, fixed: true, highlight: false });
    board.create('text', [60.5, 37, 'set point'], { anchorX: 'left', anchorY: 'middle', fontSize: 11, strokeColor: ok, fixed: true, display: 'internal' });
    var c = board.create('curve', [[], []], { strokeColor: accent, strokeWidth: 3, fixed: true, highlight: false });
    c.updateDataArray = function () { var n = st.hist.length, off = Math.max(0, n - 600); this.dataX = st.hist.slice(off).map(function (h, i) { return i / 10; }); this.dataY = st.hist.slice(off); };
    board.update();
  }
  // One simulated tenth of a minute. Heat flows between body and air; the body makes heat; effectors correct.
  // The effectors take a few minutes to build up (sweat glands, shivering), so a sudden big change pushes the
  // temperature away before the correction brings it back: the shape of negative feedback.
  function stepBody() {
    var T = st.T, err = T - 37, sense = st.broken.receptor ? 0 : err, cmd = st.broken.control ? 0 : sense;
    var target = st.broken.effector ? 0 : 3 * cmd;
    st.E += (target - st.E) / 4 * 0.1;
    st.sweat = st.E > 0.08; st.shiver = st.E < -0.08;
    T += (0.03 * (st.air - T) + 0.45 - st.E) * 0.1;
    st.T = Math.max(33.6, Math.min(40.8, T)); st.hist.push(st.T); st.min += 0.1;   // kept on the graph (a real body far outside this range is in danger)
    var d = Math.abs(st.T - 37);
    if (d > 0.6) st.away = true; else if (d < 0.3 && st.away) { st.away = false; st.rec++; }
  }
  function paintFeedback() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var row = el('div', 'srow'), lab = el('label', 'fname', 'Air'); lab.htmlFor = 'air';
    var r = el('input'); r.type = 'range'; r.id = 'air'; r.min = -5; r.max = 45; r.step = 1; r.value = st.air;
    var out = el('output'); out.textContent = st.air + ' °C';
    r.addEventListener('input', function () { st.air = Number(r.value); out.textContent = st.air + ' °C'; B.moved = true; });
    row.append(lab, r, out); panel.appendChild(row);
    var loop = el('div', 'corow');
    var parts = [['Receptor', 'receptor', 'Temperature receptors in the skin and brain detect the change'], ['Control centre', 'control', 'The hypothalamus (brain) compares with the set point'], ['Effectors', 'effector', 'Sweat glands, skin blood vessels and muscles respond']];
    parts.forEach(function (p, k) {
      var box = el('div', 'cobox' + (st.broken[p[1]] ? ' bad' : st.sweat || st.shiver ? ' lit' : ''));
      box.appendChild(el('b', '', p[0])); box.appendChild(el('span', '', p[2]));
      if (spec.break === 'on') { var bb = el('button', st.broken[p[1]] ? 'go' : 'quiet', st.broken[p[1]] ? 'Repair' : 'Break'); bb.type = 'button'; bb.addEventListener('click', function () { st.broken[p[1]] = !st.broken[p[1]]; B.moved = true; paintFeedback(); }); box.appendChild(bb); }
      loop.appendChild(box); if (k < 2) loop.appendChild(el('i', 'coarrow', '→'));
    });
    panel.appendChild(loop);
    st.live = el('p', 'cokind'); panel.appendChild(st.live); live();
  }
  function live() {
    if (!st.live) return;
    var d = st.T - 37, resp = st.sweat ? 'Corrective response: sweating and widening skin blood vessels, losing heat.' : st.shiver ? 'Corrective response: shivering and narrowing skin blood vessels, keeping heat in.' : 'Near the set point: no corrective response needed.';
    st.live.textContent = 'Body temperature ' + st.T.toFixed(1) + ' °C (' + (Math.abs(d) < 0.05 ? 'at' : (d > 0 ? '+' : '−') + Math.abs(d).toFixed(1) + ' °C from') + ' the set point). ' + (Object.keys(st.broken).some(function (k) { return st.broken[k]; }) ? 'Part of the loop is broken: no correction. ' : resp);
  }
  function loopFeedback() {
    var last = performance.now(), acc = 0, n = 0;
    cancelAnimationFrame(raf);
    (function tick(now) {
      acc += Math.min(0.1, (now - last) / 1000); last = now;
      while (acc > 0.05) { acc -= 0.05; stepBody(); }   // 20 steps a second: 2 simulated minutes per real second
      B.jsxBoard.update(); if (++n % 6 === 0) { live(); report(); }
      raf = requestAnimationFrame(tick);
    })(last);
  }

  function report() {
    var vars, msg = '', okk = false;
    if (spec.mode === 'pathway' || spec.mode === 'build') {
      var n = st.done.filter(Boolean).length; vars = spec.mode === 'pathway' ? { n: n } : { c: n };
      okk = n >= spec.need; msg = okk ? (spec.mode === 'pathway' ? 'You followed ' + n + ' pathways.' : 'You built ' + n + ' pathways correctly.') : n + ' of ' + spec.need + (spec.mode === 'pathway' ? ' stimuli tried.' : ' pathways built.');
    } else if (spec.mode === 'race') { vars = { r: st.races }; okk = st.races > 0; msg = okk ? 'Compare the two curves: when each starts, how high it goes and how long it lasts.' : ''; }
    else {
      var b = Object.keys(st.broken).some(function (k) { return st.broken[k]; }) ? 1 : 0;
      vars = { t: Math.round(st.min * 10) / 10, v: Math.round(st.T * 100) / 100, s: 37, d: Math.round(Math.abs(st.T - 37) * 100) / 100, r: st.rec, b: b };
      msg = st.rec ? 'Returned to the set point ' + st.rec + ' time' + (st.rec > 1 ? 's' : '') + ' after being pushed away from it.' : 'Move the air temperature a long way (very hot or very cold) and watch what the body does.';
    }
    B.say(msg, okk);
    B.post({ scope: { vars: vars, points: {} } }, Object.keys(vars).map(function (k) { return k + ' = ' + vars[k]; }).join('; '));
  }

  B.widget('coordination', {
    sections: function (s) { return s.mode === 'race' || s.mode === 'feedback' ? ['board', 'gpanel'] : ['gpanel']; },
    label: function (s) { return { pathway: 'Response pathways', build: 'Build a response pathway', race: 'Nerve and hormone signals compared', feedback: 'Body temperature control' }[s.mode]; },
    parse: parse,
    start: function () {
      spec = B.spec; cancelAnimationFrame(raf);
      st = { cur: null, done: spec.stimuli.map(function () { return false; }), choice: {}, lit: -1, bad: -1, result: null, races: 0, t: 0, racing: false, T: 37, air: 22, hist: [], min: 0, rec: 0, away: false, broken: {}, sweat: false, shiver: false, live: null, E: 0 };
      if (spec.mode === 'race') { buildRace(); paintRace(); }
      else if (spec.mode === 'feedback') { for (var i = 0; i < 300; i++) stepBody(); st.min = 0; st.rec = 0; buildFeedback(); paintFeedback(); loopFeedback(); }
      else paintPathway();
      report();
    },
    redraw: function () { if (spec.mode === 'race') buildRace(); if (spec.mode === 'feedback') buildFeedback(); },
    resize: function () { if (B.jsxBoard && (spec.mode === 'race' || spec.mode === 'feedback')) { B.jsxBoard.resizeContainer(B.el('board').clientWidth, B.el('board').clientHeight); B.jsxBoard.update(); } },
  });
})(WPB);
