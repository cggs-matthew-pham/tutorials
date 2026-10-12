// Encoding is not encryption. A message written as binary, hex or base64 looks scrambled, but the rule is public, so
// anyone can turn it back. Encryption needs a secret key as well. Eve, listening on the network, tries every public
// decoder on whatever is sent. All of it is pretend: nothing is sent anywhere.
//   widget: encode
//   mode: send (default) | decode
// mode: send
//   message: meet at 4                  the starting message (the student can type another; input labelled "Message")
//   key: gears                          the starting key word for Encrypted (input labelled "Key word"; letters only)
//   shared: gears                       the key word Ava has (q = 1 when the key word matches it)
//   Buttons choose what is sent: Plain text, Binary, Hex, Base64 or Encrypted (labelled "Send as Hex"…). Eve's panel
//   shows what she can read.
//   Values: f (sent as: 0 plain, 1 binary, 2 hex, 3 base64, 4 encrypted), e (1 when Eve can read it), l (message
//           length), q (1 when the key word is the shared one), s (messages sent)
// mode: decode
//   data: 57 50 7b 68 69 7d             the coded data (or the student pastes some: input labelled "Coded data")
//   plain: WP{hi}                       optional: the original, for d (leave it out when it is a flag)
//   Buttons: Binary, Hex, Base64, Key word (labelled "Decode as Hex"…) turn the current text back one layer; Undo and
//   Start again. The key word decoder uses the "Key word" input.
//   Values: d (1 when the text is back to plain:), u (decoders that worked), w (decoders that failed), r (1 when the
//           text is readable: printable letters with no coding left that a decoder can undo)
// The toy cipher (Encrypted, Key word) shifts each printable character by the letters of the key word in turn, a
// Vigenère cipher. Real encryption (AES, behind HTTPS) works with keys far too long to guess; the teacher notes say so.
(function (B) {
  'use strict';
  var spec = null, ui = {}, st = null;
  var FORMS = ['Plain text', 'Binary', 'Hex', 'Base64', 'Encrypted'];

  function parse(s) {
    s.m = String(s.mode || 'send').toLowerCase();
    if (['send', 'decode'].indexOf(s.m) < 0) throw new Error('mode: send or decode.');
    s.msg0 = s.message !== undefined ? String(s.message) : 'meet at 4';
    s.key0 = String(s.key || '').toLowerCase();
    if (s.key0 && !/^[a-z]+$/.test(s.key0)) throw new Error('key: letters only.');
    s.shared0 = String(s.shared || '').toLowerCase();
    s.data0 = s.data !== undefined ? String(s.data) : '';
    s.plain0 = s.plain !== undefined ? String(s.plain) : null;
  }

  // ---------- codes ----------
  var bytes = function (t) { return Array.from(new TextEncoder().encode(t)); };
  var text = function (bs) { try { return new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bs)); } catch (e) { return null; } };
  var toBin = function (t) { return bytes(t).map(function (b) { return ('0000000' + b.toString(2)).slice(-8); }).join(' '); };
  var toHex = function (t) { return bytes(t).map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join(' '); };
  var toB64 = function (t) { var s = ''; bytes(t).forEach(function (b) { s += String.fromCharCode(b); }); return btoa(s); };
  function fromBin(t) { var g = t.trim().split(/\s+/); if (!g[0] || g.some(function (x) { return !/^[01]{8}$/.test(x); })) return null; return text(g.map(function (x) { return parseInt(x, 2); })); }
  function fromHex(t) { var c = t.replace(/\s+/g, ''); if (!c || c.length % 2 || !/^[0-9a-f]+$/i.test(c)) return null; var bs = []; for (var i = 0; i < c.length; i += 2) bs.push(parseInt(c.slice(i, i + 2), 16)); return text(bs); }
  function fromB64(t) { var c = t.trim(); if (!c || c.length % 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(c)) return null; try { var s = atob(c), bs = []; for (var i = 0; i < s.length; i++) bs.push(s.charCodeAt(i)); return text(bs); } catch (e) { return null; } }
  function shift(t, key, dir) {
    if (!key) return null;
    var out = '', j = 0;
    for (var i = 0; i < t.length; i++) {
      var c = t.charCodeAt(i);
      if (c < 32 || c > 126) { out += t[i]; continue; }
      var k = key.charCodeAt(j % key.length) - 96; j++;
      out += String.fromCharCode(((c - 32 + dir * k) % 95 + 95) % 95 + 32);
    }
    return out;
  }
  var DEC = [fromBin, fromHex, fromB64];
  var readable = function (t) { return /^[\x20-\x7e]+$/.test(t) && DEC.every(function (d) { return d(t) === null; }); };

  // ---------- helpers ----------
  function h(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
  function btn(txt, fn, aria, on) { var b = h('button', 'shbtn' + (on ? ' on' : ''), txt); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria); if (on !== undefined) b.setAttribute('aria-pressed', String(!!on)); b.addEventListener('click', function () { fn(); B.moved = true; update(); }); return b; }
  function field(label, value, set, cls) {
    var inp = h('input', 'ecin' + (cls ? ' ' + cls : '')); inp.type = 'text'; inp.value = value; inp.setAttribute('aria-label', label); inp.spellcheck = false; inp.autocomplete = 'off';
    var commit = function () { if (inp.value === value) return; value = inp.value; set(inp.value); B.moved = true; update(); };
    inp.addEventListener('change', commit);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(); });
    var l = h('label', 'ecfield'); l.appendChild(h('span', '', label)); l.appendChild(inp);
    return l;
  }

  // ---------- send ----------
  function coded(f) { var m = st.msg; return f === 0 ? m : f === 1 ? toBin(m) : f === 2 ? toHex(m) : f === 3 ? toB64(m) : shift(m, st.key, 1) || '(type a key word first)'; }
  function eveReads() { return st.sent !== 4; }
  function drawSend(wrap) {
    var top = h('div', 'ecrow');
    top.appendChild(field('Message', st.msg, function (v) { st.msg = v; st.shown = 0; }));
    top.appendChild(field('Key word', st.key, function (v) { st.key = v.toLowerCase().replace(/[^a-z]/g, ''); st.shown = 0; st.warn = 0; }, 'short'));
    wrap.appendChild(top);
    var tab = h('div', 'ectable');
    FORMS.forEach(function (name, f) {
      var row = h('div', 'ecform' + (st.shown && st.sent === f ? ' on' : ''));
      row.appendChild(h('b', '', name));
      row.appendChild(h('code', 'ecout', coded(f)));
      row.appendChild(btn('Send', function () { if (f === 4 && !st.key) { st.warn = 1; return; } st.warn = 0; st.sent = f; st.shown = 1; st.count++; }, 'Send as ' + name));
      tab.appendChild(row);
    });
    wrap.appendChild(tab);
    if (st.warn) wrap.appendChild(h('p', 'ecnote', 'Encrypted needs a key word: type one first.'));
    var eve = h('div', 'eceve' + (st.shown ? (eveReads() ? ' bad' : ' ok') : ''));
    eve.appendChild(h('b', '', 'Eve, listening on the café Wi-Fi'));
    if (!st.shown) eve.appendChild(h('p', '', 'Nothing sent yet. Eve will try every public decoder (binary, hex, base64) on whatever you send.'));
    else if (eveReads()) {
      eve.appendChild(h('p', '', st.sent === 0 ? 'Eve reads it straight away: ' : 'Eve tries the ' + FORMS[st.sent].toLowerCase() + ' decoder. Anyone can, because the rule is public. She reads: '));
      eve.appendChild(h('code', 'ecout', st.msg));
    } else {
      eve.appendChild(h('p', '', 'Every public decoder fails, and Eve doesn\'t have the key word. She can\'t read it.'));
      eve.appendChild(h('p', '', spec.shared0 ? (st.key === spec.shared0 ? 'Ava has the same key word, so she can read it.' : 'Ava\'s key word is different, so she can\'t read it either.') : ''));
    }
    wrap.appendChild(eve);
    var vars = { f: st.shown ? st.sent : -1, e: st.shown ? (eveReads() ? 1 : 0) : -1, l: st.msg.length, q: spec.shared0 && st.key === spec.shared0 ? 1 : 0, s: st.count };
    ui.text = st.shown ? 'Sent as ' + FORMS[st.sent] + ': Eve ' + (eveReads() ? 'can' : 'can\'t') + ' read it.' : 'Choose how to send the message.';
    return vars;
  }

  // ---------- decode ----------
  function drawDecode(wrap) {
    var top = h('div', 'ecrow');
    top.appendChild(field('Coded data', st.stack[0], function (v) { st.stack = [v]; st.note = ''; }, 'wide'));
    top.appendChild(field('Key word', st.key, function (v) { st.key = v.toLowerCase().replace(/[^a-z]/g, ''); }, 'short'));
    wrap.appendChild(top);
    var cur = st.stack[st.stack.length - 1];
    var now = h('div', 'ecnow'); now.appendChild(h('b', '', st.stack.length > 1 ? 'After ' + (st.stack.length - 1) + ' step' + (st.stack.length > 2 ? 's' : '') + ':' : 'The data:'));
    now.appendChild(h('code', 'ecout big', cur || '(empty)')); wrap.appendChild(now);
    var bar = h('div', 'shbar');
    [['Binary', fromBin], ['Hex', fromHex], ['Base64', fromB64]].forEach(function (d) {
      bar.appendChild(btn(d[0], function () { var r = d[1](cur); if (r === null) { st.w++; st.note = 'That isn\'t ' + d[0].toLowerCase() + ': nothing changed.'; } else { st.u++; st.stack.push(r); st.note = ''; } }, 'Decode as ' + d[0]));
    });
    bar.appendChild(btn('Key word', function () { if (!st.key) { st.note = 'Type the key word first.'; return; } st.u++; st.stack.push(shift(cur, st.key, -1)); st.note = ''; }, 'Decode with the key word'));
    if (st.stack.length > 1) bar.appendChild(btn('Undo', function () { st.stack.pop(); st.note = ''; }, 'Undo the last step'));
    wrap.appendChild(bar);
    if (st.note) wrap.appendChild(h('p', 'ecnote', st.note));
    var done = spec.plain0 !== null && cur === spec.plain0 ? 1 : 0, rd = cur && readable(cur) ? 1 : 0;
    ui.text = done ? 'Decoded: back to the original.' : (st.stack.length > 1 ? 'Decoded ' + (st.stack.length - 1) + ' step' + (st.stack.length > 2 ? 's' : '') + '.' : 'Which rule was used? Try a decoder.');
    return { d: done, u: st.u, w: st.w, r: rd };
  }

  // ---------- drawing ----------
  function update() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = h('div', 'ecwrap');
    var vars = spec.m === 'send' ? drawSend(wrap) : drawDecode(wrap);
    host.appendChild(wrap);
    ui.work.textContent = ui.text; B.say(ui.text);
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, ui.text);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = h('p', 'rulework'); ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = h('div', 'gbar bbar'); var again = h('button', 'quiet', 'Start again'); again.type = 'button'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function blank() { return { msg: spec.msg0, key: spec.key0, sent: 0, shown: 0, count: 0, warn: 0, stack: [spec.data0], u: 0, w: 0, note: '' }; }

  B.widget('encode', {
    sections: ['board', 'gpanel'],
    label: function (s) { return s.m === 'decode' ? 'Decode the data' : 'Send a message past Eve'; },
    parse: parse,
    redraw: function () { if (spec) update(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = sv && sv.st ? Object.assign(blank(), sv.st) : blank();
      paintPanel(); update();
    },
  });
})(WPB);
