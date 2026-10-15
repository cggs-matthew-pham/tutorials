// The board: an embeddable page for interactive diagrams in lessons (maths first; nothing here is maths-only).
// It takes its starting setup from ?code= (a lesson's code region) and reports to the lesson page with
// postMessage, so checks can tick. Each kind of board is a widget (widgets/*.js) registered with WPB.widget().
//
// Setup format: one line each, "key: value" or "kind name: value".
//   widget: graph            which widget (default balance, so older setups keep working)
//   left: 2x + 3             a setting
//   slider m: 0, 5, 2        an object with a name (widgets read these from spec.items)
//
// Message to the lesson page after every change:
//   { wp: 'run', id, kind, status: 'done', moved, code: '', output, state }
//   kind: 'board' (or 'maths' on the old _playground-maths/ address, for pages that already listen for it)
//   state: the widget's own fields (see each widget), plus scope: { vars: { m: 2 }, points: { A: [1, 3] } }
//          when the widget has named values, so lesson checks can test conditions such as "A on y = 2x + 1".
// `moved` is false until the student does something, so a check never ticks on the starting position.
// The page sends { wp: 'set-code', code } to load a new setup (a task's starting position).
// ?fresh=1 starts from the setup every time and saves nothing in the browser.
// The full embedding contract is in the project notes (board-embed-contract.md): changes only add to it.
var WPB = (function () {
  'use strict';
  var q = new URLSearchParams(location.search);
  var ID = q.get('id') || 'free';
  var KIND = q.get('kind') || (/\/_playground-maths\//.test(location.pathname) ? 'maths' : 'board');
  var KEY = 'wp-maths:' + ID;   // the original key, so saved work survives the move to the general board
  // ?fresh=1: always start from the setup and save nothing (slides on a shared projector, where the last class's
  // work should not reappear).
  var FRESH = q.get('fresh') === '1';
  var widgets = {}, current = null;
  var SECTIONS = ['board', 'controls', 'ops', 'machine', 'gpanel'];
  var B = {
    q: q, id: ID, spec: null, moved: false,
    el: function (id) { return document.getElementById(id); },
    css: function (name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); },
    fmt: function (n) { return Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : String(+n.toFixed(2)); },
  };

  /** Read a setup. Every line is kept in spec.items; "key: value" lines are also spec[key] (the last one wins). */
  function parseSpec(text) {
    var s = { widget: 'balance', var: 'x', items: [] };
    String(text || '').split('\n').forEach(function (line, i) {
      var t = line.replace(/(^|\s+)#.*$/, '');
      var m = /^\s*([a-z]+)(?:\s+([A-Za-z]\w*))?\s*:\s*(.*?)\s*$/i.exec(t);
      if (!m) { if (t.trim()) throw new Error('Line ' + (i + 1) + ' needs "key: value" (got "' + t.trim() + '").'); return; }
      s.items.push({ kind: m[1].toLowerCase(), name: m[2] || null, value: m[3], line: i + 1 });
      if (!m[2] && m[3] !== '') s[m[1]] = m[3];
    });
    if (!widgets[s.widget]) throw new Error('Unknown widget "' + s.widget + '" (use ' + Object.keys(widgets).join(', ') + ').');
    s.raw = String(text || '');
    return s;
  }

  B.post = function (state, output) {
    if (parent !== window) parent.postMessage({ wp: 'run', id: ID, kind: KIND, status: 'done', moved: B.moved, code: '', output: output, state: state }, location.origin);
  };
  B.save = function (extra) { if (FRESH) return; try { localStorage.setItem(KEY, JSON.stringify(Object.assign({ setup: B.spec.raw }, extra))); } catch (e) { /* private mode */ } };
  B.saved = function () { if (FRESH) return null; try { var s = JSON.parse(localStorage.getItem(KEY)); return s && s.setup === B.spec.raw ? s : null; } catch (e) { return null; } };
  B.say = function (text, ok) { var st = B.el('status'); st.className = ok ? 'ok' : ''; st.textContent = text; };
  B.fail = function (msg) { var e = B.el('error'); e.hidden = false; e.textContent = 'This board cannot start: ' + msg; };
  /** A JSXGraph board in #board, replacing any earlier one. */
  B.jsx = function (opts) {
    if (B.jsxBoard) JXG.JSXGraph.freeBoard(B.jsxBoard);
    B.el('board').querySelectorAll('canvas.wpcv').forEach(function (c) { c.remove(); });
    B.jsxBoard = JXG.JSXGraph.initBoard('board', Object.assign({
      keepAspectRatio: false, axis: false, grid: false, showNavigation: false, showCopyright: false,
      pan: { enabled: false }, zoom: { enabled: false, wheel: false }, registerEvents: true,
    }, opts));
    return B.jsxBoard;
  };

  /**
   * A micro:bit over USB (Web Serial, 115200 baud: MakeCode's default), one connection per board page, kept when a
   * task loads a new setup. B.serial.listen(fn) gets each line the micro:bit sends (trimmed; one listener, the
   * current widget's); connect(say) asks for the port and calls say(message) with a plain message; send(text) writes
   * a line. Lines are text: MakeCode's "serial write value" sends name:value.
   */
  B.serial = (function () {
    var writer = null, listener = null;
    return {
      ok: function () { return 'serial' in navigator; },
      connected: function () { return !!writer; },
      listen: function (fn) { listener = fn; },
      send: function (text) { if (!writer) return false; writer.write(String(text) + '\n'); return true; },
      connect: function (say) {
        if (!('serial' in navigator)) { say('This browser cannot talk to a micro:bit. Use Chrome or Edge on a laptop or Chromebook.'); return; }
        navigator.serial.requestPort({ filters: [{ usbVendorId: 0x0d28 }] }).then(function (port) {
          return port.open({ baudRate: 115200 }).then(function () { return port; });
        }).then(function (port) {
          var enc = new TextEncoderStream(); enc.readable.pipeTo(port.writable); writer = enc.writable.getWriter();
          var dec = new TextDecoderStream(); port.readable.pipeTo(dec.writable); var reader = dec.readable.getReader(), buf = '';
          say('Connected.');
          (function pump() {
            reader.read().then(function (r) {
              if (r.done) return;
              buf += r.value; var lines = buf.split(/\r?\n/); buf = lines.pop();
              lines.forEach(function (l) { if (l.trim() && listener) listener(l.trim()); });
              pump();
            }).catch(function () { writer = null; say('The micro:bit was disconnected. Plug it in and connect again.'); });
          })();
        }).catch(function (e) {
          if (e && e.name === 'NotFoundError') return;   // the student closed the chooser
          say(e && /open|busy|InvalidState|NetworkError/i.test(e.name + e.message) ? 'The micro:bit is busy. If MakeCode is connected to it in another tab, disconnect it there (or close that tab) and try again.' : 'Could not connect: ' + (e && e.message));
        });
      },
    };
  })();
  /** "name:number" (or name=number) from a line, as [name, number], else null. */
  B.nameValue = function (line) { var m = /^([a-zA-Z][\w ]*?)\s*[:=]\s*(-?\d+(?:\.\d+)?)$/.exec(line); return m ? [m[1].trim().toLowerCase().replace(/\s+/g, '_'), Number(m[2])] : null; };

  /**
   * Register a widget: { sections: ids to show, parse(spec) (defaults and checks; throws a message),
   * start(fresh) (draw it; fresh ignores saved work), redraw() (colour scheme changed), resize() }.
   */
  B.widget = function (name, w) { widgets[name] = w; };

  function load(text) {
    var w;
    try {
      B.spec = parseSpec(text);
      w = widgets[B.spec.widget];
      if (w.parse) w.parse(B.spec);
    } catch (e) { return B.fail(e.message); }
    B.el('error').hidden = true;
    B.moved = false; current = w;
    var show = typeof w.sections === 'function' ? w.sections(B.spec) : w.sections;
    SECTIONS.forEach(function (id) { var e = B.el(id); if (e) e.hidden = show.indexOf(id) < 0; });
    B.el('board').setAttribute('aria-label', w.label ? w.label(B.spec) : '');
    try { w.start(false); } catch (e) { B.fail(e.message); }
  }
  B.restart = function () { B.moved = true; try { current.start(true); } catch (e) { B.fail(e.message); } };

  B.boot = function () {
    window.addEventListener('message', function (e) { var m = e.data; if (e.origin === location.origin && m && m.wp === 'set-code') load(m.code); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && parent !== window) parent.postMessage({ wp: 'esc' }, location.origin); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (current && current.redraw) current.redraw(); });
    window.addEventListener('resize', function () { if (current && current.resize) current.resize(); });
    load(q.get('code'));
  };
  return B;
})();
