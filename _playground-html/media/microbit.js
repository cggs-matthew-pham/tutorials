/* microbit.js: a web page talks to a micro:bit over USB (Web Serial, 115200 baud, MakeCode's default).
   Made for Learning Waypoints tutorials; free to copy. Load it beside your page: <script src="microbit.js"></script>

     connectButton.addEventListener("click", microbit.connect);   // must start from a click
     microbit.onLine(function (text) { ... });                    // each line the micro:bit sends (serial write line)
     microbit.onValue(function (name, number) { ... });           // serial write value "x" = 5 arrives as x:5
     microbit.send("go");                                          // a line to the micro:bit (serial read line)
     microbit.pretend(["A", "B", "light:200"]);                     // buttons for the pretend micro:bit (optional)

   Where USB is not allowed (the playground's preview, Safari, Firefox, a phone), connect() opens a pretend micro:bit
   instead: a small panel to send lines by hand, which also shows what the page sends. Download the page and open it
   in Chrome or Edge on a computer, with the micro:bit plugged in, to use a real one. */
(function () {
  var lineFns = [], valueFns = [], writer = null, quick = [], panel = null, log = null;

  function deliver(text) {
    text = String(text).trim();
    if (!text) return;
    lineFns.forEach(function (f) { f(text); });
    var m = /^([a-zA-Z][\w ]*?)\s*[:=]\s*(-?\d+(?:\.\d+)?)$/.exec(text);
    if (m) valueFns.forEach(function (f) { f(m[1].trim(), Number(m[2])); });
  }
  function note(text, cls) {
    if (!log) return;
    var p = document.createElement('div'); p.textContent = text; if (cls) p.style.color = cls;
    log.append(p); while (log.children.length > 6) log.firstChild.remove();
  }

  function openPretend(reason) {
    if (panel) { panel.hidden = false; return; }
    panel = document.createElement('div');
    panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', 'Pretend micro:bit');
    panel.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:99999;width:260px;max-width:calc(100vw - 24px);background:#fff;color:#1d2430;border:2px solid #c2570a;border-radius:12px;padding:10px 12px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 4px 18px rgba(0,0,0,.18)';
    var h = document.createElement('b'); h.textContent = 'Pretend micro:bit';
    var why = document.createElement('div'); why.style.cssText = 'color:#5b6472;font-size:12.5px;margin:2px 0 6px'; why.textContent = reason;
    var row = document.createElement('div'); row.style.cssText = 'display:flex;gap:6px';
    var input = document.createElement('input'); input.placeholder = 'A line it sends, e.g. light:200'; input.setAttribute('aria-label', 'A line the micro:bit sends');
    input.style.cssText = 'flex:1;min-width:0;font:inherit;padding:4px 6px;border:1px solid #c9c4ba;border-radius:6px';
    var go = document.createElement('button'); go.type = 'button'; go.textContent = 'Send'; go.style.cssText = 'font:inherit;padding:4px 10px;border:0;border-radius:6px;background:#c2570a;color:#fff;cursor:pointer';
    row.append(input, go);
    function sendTyped() { if (input.value.trim()) { note('micro:bit → ' + input.value.trim()); deliver(input.value); } input.value = ''; }
    go.addEventListener('click', sendTyped);   // no <form>: sandboxed previews block form submission
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); sendTyped(); } });
    var qs = document.createElement('div'); qs.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-top:6px';
    quick.forEach(function (q) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = q;
      b.style.cssText = 'font:inherit;font-size:13px;padding:2px 8px;border:1px solid #c2570a;border-radius:99px;background:#fff;color:#c2570a;cursor:pointer';
      b.addEventListener('click', function () { note('micro:bit → ' + q); deliver(q); });
      qs.append(b);
    });
    log = document.createElement('div'); log.style.cssText = 'margin-top:6px;font:12.5px/1.35 ui-monospace,monospace;color:#5b6472';
    panel.append(h, why, row, qs, log);
    document.body.append(panel);
  }

  function connect() {
    var pretendWhy = 'This page cannot use USB here, so type what the micro:bit would send. To use a real one, download the page and open it in Chrome or Edge.';
    if (!('serial' in navigator)) { openPretend(pretendWhy); return Promise.resolve(false); }
    return navigator.serial.requestPort({ filters: [{ usbVendorId: 0x0d28 }] }).then(function (port) {
      return port.open({ baudRate: 115200 }).then(function () { return port; });
    }).then(function (port) {
      var enc = new TextEncoderStream(); enc.readable.pipeTo(port.writable); writer = enc.writable.getWriter();
      var dec = new TextDecoderStream(); port.readable.pipeTo(dec.writable);
      var reader = dec.readable.getReader(), buf = '';
      api.connected = true;
      (function pump() {
        reader.read().then(function (r) {
          if (r.done) return;
          buf += r.value; var lines = buf.split(/\r?\n/); buf = lines.pop();
          lines.forEach(deliver); pump();
        }).catch(function () { writer = null; api.connected = false; console.warn('microbit.js: the micro:bit was disconnected.'); });
      })();
      return true;
    }).catch(function (e) {
      if (e && e.name === 'NotFoundError') return false;   // the chooser was closed
      if (e && (e.name === 'SecurityError' || /not allowed|permissions policy/i.test(e.message))) { openPretend(pretendWhy); return false; }
      console.warn('microbit.js: could not connect: ' + (e && e.message) + (/open|busy/i.test(e && e.message) ? ' (is MakeCode connected to it in another tab?)' : ''));
      return false;
    });
  }

  var api = {
    connected: false,
    connect: connect,
    onLine: function (fn) { lineFns.push(fn); },
    onValue: function (fn) { valueFns.push(fn); },
    send: function (text) {
      if (writer) { writer.write(String(text) + '\n'); return true; }
      if (panel) { note('page → ' + text, '#c2570a'); return true; }
      console.warn('microbit.js: not connected yet, so "' + text + '" was not sent. Press your Connect button first.');
      return false;
    },
    pretend: function (lines) { quick = (lines || []).map(String); },
  };
  window.microbit = api;
})();
