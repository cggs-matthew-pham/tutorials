// Security and privacy (Years 9–10): the operating system, names and addresses, access control, hashes and keys.
//   widget: security
//   mode: os | dns | access | hash | keys
// mode: os      Apps ask the operating system; the OS uses a driver to talk to each device. Swap the webcam or the
//               storage: the apps don't change. Webcam B needs its driver. The OS also decides which app may use
//               the camera.
//   driver: off          webcam B's driver at the start (on | off)
//   Values: c (webcam 1 A, 2 B), s (storage 1 SSD, 2 USB stick), d (webcam B driver installed), o (last request
//           worked), g (the game may use the camera), q (requests so far).
// mode: dns     An address bar. DNS turns the name into an IP address; the router's table sends the packet on.
//   Names: school.edu.au 203.0.113.10, library.school.edu.au 203.0.113.20, weather.example 192.0.2.44, and the
//   lookalike schoo1.edu.au 198.51.100.66 (all addresses from the ranges kept for examples).
//   Values: f (lookups), k (1 name found), r (1 the real school site), l (1 the lookalike), x (routing row used, 1 to 3).
// mode: access  Sign in (authentication; MFA adds a code), then try to read or change a file (authorisation, from the
//               permissions table). edit: on lets students change the table.
//   mfa: off   edit: off
//   Values: a (signed in), u (1 student, 2 teacher, 3 admin), m (MFA on), o (last action allowed), t (tries),
//           z (permissions wider than the job needs), e (permissions a job needs but lacks).
// mode: hash    Type a password; see its SHA-256 hash (shown short). One changed letter changes the whole hash.
//               salt: on adds each user's salt. leak: lines "name: hash" (first 12 hex) show a stored list to audit.
//   salt: off   (any salt: line shows an "Add each user's salt" switch; on starts it on)
//   leak ana: 1a2b3c4d5e6f   (one line each)
//   Values: n (length), m (1 if the hash matches a stored one), d (hex digits that changed since the last hash, of 12),
//           s (salt on), w (words in the password: spaces + 1).
// mode: keys    Alice publishes an open padlock (her public key) and keeps the key (private). Bob locks a message and
//               sends it past Eve.
//   Values: l (lock used: 1 Alice's padlock, 2 Bob's own, 0 none), k (Alice could open it), v (Eve could read it), f (sends).
(function (B) {
  'use strict';
  var spec = null, st = {}, ui = {};
  var MODES = ['os', 'dns', 'access', 'hash', 'keys'];
  var DNS = { 'school.edu.au': '203.0.113.10', 'library.school.edu.au': '203.0.113.20', 'weather.example': '192.0.2.44', 'schoo1.edu.au': '198.51.100.66' };
  var USERS = [{ id: 'sam', name: 'Sam (student)', pw: 'maple', role: 0 }, { id: 'lee', name: 'Ms Lee (teacher)', pw: 'orbit', role: 1 }, { id: 'admin', name: 'Admin', pw: 'quartz-river-71', role: 2 }];
  var FILES = ['Homework', 'Marks', 'Settings'];
  var LEVELS = ['none', 'read', 'read + change'];
  // What each role needs (row = role, column = file): the least privilege table.
  var NEED = [[2, 1, 0], [2, 2, 0], [1, 1, 2]];
  var START_PERMS = [[2, 2, 0], [2, 2, 1], [2, 2, 2]];   // too wide for students, as a teacher might find it
  var SALTS = {};

  function parse(s) {
    s.m = String(s.mode || 'os').toLowerCase();
    if (MODES.indexOf(s.m) < 0) throw new Error('mode: os, dns, access, hash or keys.');
    s.driver0 = /^on$/i.test(s.driver || '');
    s.mfa0 = /^on$/i.test(s.mfa || '');
    s.edit = /^on$/i.test(s.edit || '');
    s.salt0 = /^on$/i.test(s.salt || ''); s.saltShow = s.salt !== undefined;   // salt: off shows the switch, starting off
    s.leak = s.items.filter(function (i) { return i.kind === 'leak' && i.name; }).map(function (i) { return { name: i.name, h: i.value.trim().toLowerCase() }; });
    s.perm0 = s.perms ? String(s.perms).split('/').map(function (r) { return r.trim().split('').map(Number); }) : START_PERMS;
    s.addr0 = s.address || '';
    s.lock0 = s.lock === undefined ? 0 : Number(s.lock);
  }
  var hex = function (buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); };
  // SHA-256: the browser's own where it can (secure pages); otherwise this small version, so clips recorded from a
  // plain page show the same hashes.
  function sha256js(bytes) {
    var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var l = bytes.length, n = ((l + 9 + 63) >> 6) << 6, m = new Uint8Array(n); m.set(bytes); m[l] = 0x80;
    var bits = l * 8; for (var i = 0; i < 4; i++) m[n - 1 - i] = (bits >>> (8 * i)) & 255;
    var w = new Array(64), r = function (x, k) { return (x >>> k) | (x << (32 - k)); };
    for (var o = 0; o < n; o += 64) {
      for (var t = 0; t < 16; t++) w[t] = (m[o + 4 * t] << 24) | (m[o + 4 * t + 1] << 16) | (m[o + 4 * t + 2] << 8) | m[o + 4 * t + 3];
      for (t = 16; t < 64; t++) { var s0 = r(w[t - 15], 7) ^ r(w[t - 15], 18) ^ (w[t - 15] >>> 3), s1 = r(w[t - 2], 17) ^ r(w[t - 2], 19) ^ (w[t - 2] >>> 10); w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0; }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], hh = H[7];
      for (t = 0; t < 64; t++) {
        var t1 = (hh + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + w[t]) | 0, t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H = [H[0] + a, H[1] + b, H[2] + c, H[3] + d, H[4] + e, H[5] + f, H[6] + g, H[7] + hh].map(function (x) { return x | 0; });
    }
    return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  }
  function sha(text) {
    var bytes = new TextEncoder().encode(text);
    if (window.crypto && crypto.subtle) return crypto.subtle.digest('SHA-256', bytes).then(hex);
    return Promise.resolve(sha256js(bytes));
  }
  function saltFor(name) { if (!SALTS[name]) { var t = 0; for (var i = 0; i < name.length; i++) t = (t * 31 + name.charCodeAt(i)) % 46656; SALTS[name] = t.toString(36); } return SALTS[name]; }

  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function btn(t, fn, cls, label) { var b = h('button', cls || '', t); b.type = 'button'; if (label) b.setAttribute('aria-label', label); b.addEventListener('click', fn); return b; }
  function use() { B.moved = true; }

  // ---------- os ----------
  function drawOs(note) {
    var w = h('div', 'sclayers');
    var apps = h('div', 'scrow'); apps.appendChild(h('div', 'sclab', 'Apps'));
    [['Video call', 'Start the camera', 'cam', 'call'], ['Notes', 'Save a file', 'disk', 'notes'], ['Game', 'Use the camera', 'cam', 'game']].forEach(function (a) {
      var c = h('div', 'sccard' + (st.last && st.last.app === a[3] ? ' on' : ''));
      c.appendChild(h('b', '', a[0]));
      c.appendChild(btn(a[1], function () { request(a[3], a[2]); }, '', a[0] + ': ' + a[1].toLowerCase()));
      apps.appendChild(c);
    });
    var os = h('div', 'scrow scos'); os.appendChild(h('div', 'sclab', 'Operating system'));
    var osBox = h('div', 'sccard wide' + (st.last ? ' on' : ''));
    osBox.appendChild(h('b', '', 'Checks permission, then uses a driver'));
    var drv = h('div', 'scdrivers');
    ['Webcam A driver', 'Webcam B driver', 'SSD driver', 'USB stick driver'].forEach(function (d, i) {
      var have = i !== 1 || st.driver; drv.appendChild(h('span', 'scchip' + (have ? '' : ' off'), d + (have ? '' : ' (missing)')));
    });
    osBox.appendChild(drv);
    var perm = h('label', 'scperm'); var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = st.gameCam;
    cb.addEventListener('change', function () { st.gameCam = cb.checked; use(); report(); }); perm.append(cb, document.createTextNode(' Allow Game to use the camera'));
    osBox.appendChild(perm); os.appendChild(osBox);
    var hw = h('div', 'scrow'); hw.appendChild(h('div', 'sclab', 'Hardware'));
    var camC = h('div', 'sccard' + (st.last && st.last.dev === 'cam' ? ' on' : '')); camC.appendChild(h('b', '', 'Webcam ' + (st.cam === 1 ? 'A' : 'B')));
    camC.appendChild(btn('Swap webcam', function () { st.cam = 3 - st.cam; st.last = null; use(); draw(); report('You plugged in webcam ' + (st.cam === 1 ? 'A' : 'B') + '.'); }));
    var dskC = h('div', 'sccard' + (st.last && st.last.dev === 'disk' ? ' on' : '')); dskC.appendChild(h('b', '', st.disk === 1 ? 'SSD (inside)' : 'USB stick'));
    dskC.appendChild(btn('Swap storage', function () { st.disk = 3 - st.disk; st.last = null; use(); draw(); report('Files now save to the ' + (st.disk === 1 ? 'SSD' : 'USB stick') + '.'); }));
    var drC = h('div', 'sccard'); drC.appendChild(h('b', '', 'Webcam B driver'));
    drC.appendChild(btn(st.driver ? 'Remove driver' : 'Install driver', function () { st.driver = !st.driver; st.last = null; use(); draw(); report(st.driver ? 'The OS now has a driver for webcam B.' : 'Webcam B’s driver is removed.'); }));
    hw.append(camC, dskC, drC);
    w.append(apps, os, hw);
    var res = h('p', 'scres' + (st.last ? (st.last.ok ? ' ok' : ' no') : ''), st.last ? st.last.msg : 'Press an app’s button.');
    res.setAttribute('aria-live', 'polite'); w.appendChild(res);
    return w;
  }
  function request(app, dev) {
    st.q++; use();
    var ok = true, msg;
    if (app === 'game' && !st.gameCam) { ok = false; msg = 'Denied: the OS blocked Game from the camera (no permission).'; }
    else if (dev === 'cam' && st.cam === 2 && !st.driver) { ok = false; msg = 'The OS has no driver for webcam B, so it can’t use it.'; }
    else if (dev === 'cam') msg = (app === 'game' ? 'Game' : 'Video call') + ' asked the OS; the OS used the webcam ' + (st.cam === 1 ? 'A' : 'B') + ' driver. The camera is on.';
    else msg = 'Notes asked the OS to save; the OS used the ' + (st.disk === 1 ? 'SSD' : 'USB stick') + ' driver. Saved.';
    st.last = { app: app, dev: dev, ok: ok, msg: msg };
    draw(); report();
  }

  // ---------- dns ----------
  function drawDns() {
    var w = h('div', 'scdns');
    var bar = h('div', 'scaddr'); var lab = h('label', 'sclab', 'Address'); lab.htmlFor = 'scaddr';
    var inp = document.createElement('input'); inp.id = 'scaddr'; inp.type = 'text'; inp.value = st.addr; inp.autocomplete = 'off'; inp.spellcheck = false; inp.placeholder = 'school.edu.au';
    var go = btn('Go', function () { lookup(inp.value); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') lookup(inp.value); });
    bar.append(lab, inp, go); w.appendChild(bar);
    var steps = h('ol', 'scsteps');
    if (st.res) {
      var r = st.res;
      steps.appendChild(h('li', '', 'Your laptop asks a DNS server: what is the address of ' + r.name + '?'));
      if (!r.ip) steps.appendChild(h('li', 'no', 'DNS: no such name. Nothing is sent.'));
      else {
        steps.appendChild(h('li', '', 'DNS answers: ' + r.ip + '.'));
        steps.appendChild(h('li', '', 'Each packet is addressed to ' + r.ip + ', from your laptop 192.168.1.23 (a private address, inside your home) through your router’s public address 198.51.100.7.'));
        steps.appendChild(h('li', '', 'The router checks its table: row ' + r.row + ' sends it ' + ['', 'to the school network', 'to the internet provider', 'to the internet provider'][r.row] + '.'));
        steps.appendChild(h('li', r.real ? 'ok' : r.look ? 'no' : '', r.real ? 'It reaches the real school portal.' : r.look ? 'It reaches a server that is NOT the school: the name only looks like it.' : 'It reaches ' + r.name + '.'));
      }
    } else steps.appendChild(h('li', '', 'Type a web address and press Go.'));
    w.appendChild(steps);
    var t = h('table', 'sctable'); t.innerHTML = '<caption>Router table</caption><tr><th>Row</th><th>Addresses starting</th><th>Send to</th></tr>';
    [['1', '203.0.113.', 'the school network'], ['2', '192.0.2.', 'the internet provider'], ['3', 'anything else', 'the internet provider']].forEach(function (rw) {
      var tr = document.createElement('tr'); if (st.res && String(st.res.row) === rw[0]) tr.className = 'now';
      rw.forEach(function (c) { tr.appendChild(h('td', '', c)); }); t.appendChild(tr);
    });
    w.appendChild(t);
    return w;
  }
  function lookup(name) {
    name = String(name || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    st.addr = name; st.f++; use();
    var ip = DNS[name] || null;
    st.res = { name: name || '(nothing)', ip: ip, row: ip ? (ip.indexOf('203.0.113.') === 0 ? 1 : ip.indexOf('192.0.2.') === 0 ? 2 : 3) : 0, real: name === 'school.edu.au' || name === 'library.school.edu.au', look: name === 'schoo1.edu.au' };
    draw(); report();
  }

  // ---------- access ----------
  function drawAccess() {
    var w = h('div', 'scaccess');
    var sign = h('div', 'scsign');
    var sel = document.createElement('select'); sel.setAttribute('aria-label', 'User');
    USERS.forEach(function (u, i) { var o = document.createElement('option'); o.value = i; o.textContent = u.name; if (i === st.pick) o.selected = true; sel.appendChild(o); });
    sel.addEventListener('change', function () { st.pick = Number(sel.value); });
    var pw = document.createElement('input'); pw.type = 'password'; pw.setAttribute('aria-label', 'Password'); pw.placeholder = 'password';
    sign.append(h('span', 'sclab', 'Sign in'), sel, pw);
    var code = null;
    if (st.mfa) { code = document.createElement('input'); code.type = 'text'; code.setAttribute('aria-label', 'Code from the phone'); code.placeholder = 'code'; code.size = 6; sign.appendChild(code); }
    sign.appendChild(btn('Sign in', function () {
      st.t++; use();
      var u = USERS[st.pick];
      if (pw.value !== u.pw) { st.who = -1; st.msg = { ok: false, t: 'Authentication failed: wrong password, so you are not signed in.' }; }
      else if (st.mfa && (!code || code.value.trim() !== '4096')) { st.who = -1; st.msg = { ok: false, t: 'Authentication failed: the password was right, but the code from the phone was not.' }; }
      else { st.who = st.pick; st.msg = { ok: true, t: 'Signed in as ' + u.name + '.' }; }
      draw(); report();
    }));
    sign.appendChild(btn('Sign out', function () { st.who = -1; st.msg = { ok: true, t: 'Signed out.' }; use(); draw(); report(); }, 'quiet'));
    w.appendChild(sign);
    var hints = h('p', 'schint', 'Practice accounts: Sam’s password is maple, Ms Lee’s is orbit, Admin’s is quartz-river-71.' + (st.mfa ? ' With MFA, the code on the phone is 4096.' : ''));
    w.appendChild(hints);
    var mf = h('label', 'scperm'); var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = st.mfa;
    cb.addEventListener('change', function () { st.mfa = cb.checked; st.who = -1; use(); draw(); report(); }); mf.append(cb, document.createTextNode(' Multi-factor sign-in (MFA): password and a code from a phone'));
    w.appendChild(mf);
    var t = h('table', 'sctable'); var cap = h('caption', '', 'Permissions' + (spec.edit ? ' (click a cell to change it)' : '')); t.appendChild(cap);
    var hr = document.createElement('tr'); hr.appendChild(h('th', '', 'Who')); FILES.forEach(function (f) { hr.appendChild(h('th', '', f)); }); t.appendChild(hr);
    ['Students', 'Teachers', 'Admins'].forEach(function (r, ri) {
      var tr = document.createElement('tr'); tr.appendChild(h('th', '', r));
      FILES.forEach(function (f, fi) {
        var v = st.perm[ri][fi], td = document.createElement('td');
        if (spec.edit) { td.appendChild(btn(LEVELS[v], function () { st.perm[ri][fi] = (st.perm[ri][fi] + 1) % 3; use(); draw(); report(); }, 'sccell', r + ', ' + f + ': ' + LEVELS[v] + '. Click to change')); }
        else td.textContent = LEVELS[v];
        tr.appendChild(td);
      });
      t.appendChild(tr);
    });
    w.appendChild(t);
    var act = h('div', 'scsign'); act.appendChild(h('span', 'sclab', 'Try'));
    FILES.forEach(function (f, fi) {
      act.appendChild(btn('Read ' + f, function () { action(fi, 1); }));
      act.appendChild(btn('Change ' + f, function () { action(fi, 2); }));
    });
    w.appendChild(act);
    var res = h('p', 'scres' + (st.msg ? (st.msg.ok ? ' ok' : ' no') : ''), st.msg ? st.msg.t : (st.who >= 0 ? 'Signed in as ' + USERS[st.who].name + '.' : 'Not signed in.'));
    res.setAttribute('aria-live', 'polite'); w.appendChild(res);
    return w;
  }
  function action(fi, lvl) {
    st.t++; use();
    if (st.who < 0) st.msg = { ok: false, t: 'Denied: nobody is signed in, so the system doesn’t know who you are (authentication).' };
    else {
      var role = USERS[st.who].role, have = st.perm[role][fi];
      st.lastOk = have >= lvl;
      st.msg = have >= lvl ? { ok: true, t: USERS[st.who].name + ' may ' + (lvl === 2 ? 'change' : 'read') + ' ' + FILES[fi] + '.' } : { ok: false, t: 'Denied: ' + USERS[st.who].name + ' is signed in, but the permissions don’t allow ' + (lvl === 2 ? 'changing' : 'reading') + ' ' + FILES[fi] + ' (authorisation).' };
    }
    draw(); report();
  }

  // ---------- hash ----------
  function drawHash() {
    var w = h('div', 'schash');
    var row = h('div', 'scsign'); var lab = h('label', 'sclab', 'Password'); lab.htmlFor = 'scpw';
    var inp = document.createElement('input'); inp.id = 'scpw'; inp.type = 'text'; inp.value = st.pw; inp.autocomplete = 'off'; inp.spellcheck = false;
    inp.addEventListener('input', function () { st.pw = inp.value; use(); recompute(); });
    row.append(lab, inp); w.appendChild(row);
    if (spec.saltShow) {
      var sl = h('label', 'scperm'); var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = st.salt;
      cb.addEventListener('change', function () { st.salt = cb.checked; use(); recompute(); }); sl.append(cb, document.createTextNode(' Add each user’s salt'));
      w.appendChild(sl);
    }
    ui.hashOut = h('div', 'schashes'); w.appendChild(ui.hashOut);
    if (spec.leak.length) {
      var t = h('table', 'sctable'); t.innerHTML = '<caption>Stored passwords (hashes only, first 12 digits)</caption><tr><th>User</th><th>Stored hash</th></tr>';
      ui.leakRows = spec.leak.map(function (l) { var tr = document.createElement('tr'); tr.appendChild(h('td', '', l.name)); tr.appendChild(h('td', 'mono', l.h)); t.appendChild(tr); return tr; });
      w.appendChild(t);
    }
    return w;
  }
  var seq = 0;
  function recompute() {
    var my = ++seq;
    var users = st.salt ? ['ana', 'ben'] : [''];
    Promise.all(users.map(function (u) { return sha((u ? saltFor(u) : '') + st.pw); })).then(function (hs) {
      if (my !== seq) return;
      var short = hs.map(function (x) { return x.slice(0, 12); });
      st.d = 0; if (st.prev && st.prevLen) for (var i = 0; i < 12; i++) if (st.prev[i] !== short[0][i]) st.d++;
      st.prev = short[0]; st.prevLen = st.pw.length; st.hash = short;
      st.match = spec.leak.some(function (l) { return short.indexOf(l.h) >= 0; });
      ui.hashOut.replaceChildren();
      short.forEach(function (x, i) {
        var d = h('div', 'nwstat'); d.appendChild(h('span', '', st.salt ? 'Hash for ' + users[i] + ' (salt ' + saltFor(users[i]) + ')' : 'SHA-256 hash')); d.appendChild(h('b', '', x + '…'));
        ui.hashOut.appendChild(d);
      });
      if (ui.leakRows) ui.leakRows.forEach(function (tr, i) { tr.classList.toggle('now', short.indexOf(spec.leak[i].h) >= 0); });
      report();
    });
  }

  // ---------- keys ----------
  function drawKeys() {
    var w = h('div', 'sckeys');
    var people = h('div', 'scrow');
    [['Alice', 'Keeps her private key. Gives out open padlocks (her public key) to anyone.'], ['Eve', 'Copies everything sent. Has one of Alice’s padlocks too: anyone can.'], ['Bob', 'Wants to send Alice a secret.']].forEach(function (p) {
      var c = h('div', 'sccard'); c.appendChild(h('b', '', p[0])); c.appendChild(h('span', 'schint', p[1])); people.appendChild(c);
    });
    w.appendChild(people);
    var pick = h('div', 'scsign'); pick.appendChild(h('span', 'sclab', 'Bob locks the box with'));
    [[1, 'Alice’s padlock (public key)'], [2, 'His own padlock'], [0, 'No padlock']].forEach(function (x) {
      var b = btn(x[1], function () { st.lock = x[0]; use(); draw(); report(); }); b.setAttribute('aria-pressed', String(st.lock === x[0])); pick.appendChild(b);
    });
    pick.appendChild(btn('Send', function () { st.f++; st.sent = true; use(); draw(); report(); }, 'go'));
    w.appendChild(pick);
    if (st.sent) {
      var eve = st.lock === 0, alice = st.lock !== 2;
      w.appendChild(h('p', 'scres ' + (eve ? 'no' : 'ok'), eve ? 'Eve read the message: there was no lock.' : 'Eve has the box but can’t open it: a padlock locks without a key, but only the matching private key opens it.'));
      w.appendChild(h('p', 'scres ' + (alice ? 'ok' : 'no'), alice ? (st.lock === 1 ? 'Alice opened it with her private key.' : 'Alice read it, but so could anyone.') : 'Alice can’t open it: only Bob has the key to his padlock.'));
    }
    return w;
  }

  // ---------- frame ----------
  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var box = h('div', 'scwrap');
    box.appendChild({ os: drawOs, dns: drawDns, access: drawAccess, hash: drawHash, keys: drawKeys }[spec.m]());
    host.appendChild(box);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = h('p', 'rulework'); ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = h('div', 'gbar bbar'); bar.appendChild(btn('Start again', B.restart, 'quiet')); panel.appendChild(bar);
  }
  function permDiff() {
    var z = 0, e = 0;
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) { if (st.perm[r][c] > NEED[r][c]) z++; if (st.perm[r][c] < NEED[r][c]) e++; }
    return { z: z, e: e };
  }
  function report(note) {
    var vars, out;
    if (spec.m === 'os') { vars = { c: st.cam, s: st.disk, d: st.driver ? 1 : 0, o: st.last && st.last.ok ? 1 : 0, g: st.gameCam ? 1 : 0, q: st.q }; out = note || (st.last ? st.last.msg : 'Webcam ' + (st.cam === 1 ? 'A' : 'B') + ', ' + (st.disk === 1 ? 'SSD' : 'USB stick') + '.'); }
    else if (spec.m === 'dns') { var r = st.res || {}; vars = { f: st.f, k: r.ip ? 1 : 0, r: r.real ? 1 : 0, l: r.look ? 1 : 0, x: r.row || 0 }; out = st.res ? (r.ip ? r.name + ' → ' + r.ip : r.name + ': no such name') : 'Type an address.'; }
    else if (spec.m === 'access') { var pd = permDiff(); vars = { a: st.who >= 0 ? 1 : 0, u: st.who >= 0 ? USERS[st.who].role + 1 : 0, m: st.mfa ? 1 : 0, o: st.msg && st.msg.ok && st.lastOk ? 1 : 0, t: st.t, z: pd.z, e: pd.e }; out = (st.who >= 0 ? 'Signed in as ' + USERS[st.who].name : 'Not signed in') + (spec.edit ? '. Permissions wider than needed: ' + pd.z + '; missing: ' + pd.e : ''); }
    else if (spec.m === 'hash') { vars = { n: st.pw.length, m: st.match ? 1 : 0, d: st.d || 0, s: st.salt ? 1 : 0, w: st.pw.trim() ? st.pw.trim().split(/\s+/).length : 0 }; out = st.hash ? (st.match ? 'Match: this password’s hash is in the stored list.' : 'Hash ' + st.hash[0] + '…' + (st.d ? ' (' + st.d + ' of 12 digits changed)' : '')) : 'Type a password.'; }
    else { vars = { l: st.lock, k: st.sent && st.lock !== 2 ? 1 : 0, v: st.sent && st.lock === 0 ? 1 : 0, f: st.f }; out = st.sent ? (vars.v ? 'Eve could read it.' : 'Eve could not read it.') + (vars.k ? ' Alice opened it.' : ' Alice could not open it.') : 'Choose a lock, then Send.'; }
    if (spec.m === 'access') st.lastOk = false;
    ui.work.textContent = out; B.say(out);
    B.save({ st: { cam: st.cam, disk: st.disk, driver: st.driver, gameCam: st.gameCam, perm: st.perm, mfa: st.mfa, salt: st.salt, pw: st.pw, lock: st.lock, addr: st.addr } });
    B.post({ scope: { vars: vars, points: {} } }, out);
  }

  B.widget('security', {
    sections: ['board', 'gpanel'],
    label: function (s) { return 'Security and privacy: ' + (s.m || 'os'); },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved(), o = sv && sv.st ? sv.st : {};
      st = {
        cam: o.cam || 1, disk: o.disk || 1, driver: o.driver != null ? o.driver : spec.driver0, gameCam: !!o.gameCam, q: 0, last: null,
        addr: o.addr || spec.addr0, f: 0, res: null,
        pick: 0, who: -1, msg: null, mfa: o.mfa != null ? o.mfa : spec.mfa0, t: 0, perm: o.perm || spec.perm0.map(function (r) { return r.slice(); }), lastOk: false,
        pw: o.pw || '', salt: o.salt != null ? o.salt : spec.salt0, prev: null, d: 0, hash: null, match: false,
        lock: o.lock != null ? o.lock : spec.lock0, sent: false,
      };
      paintPanel(); draw(); report();
      if (spec.m === 'hash') recompute();
    },
  });
})(WPB);
