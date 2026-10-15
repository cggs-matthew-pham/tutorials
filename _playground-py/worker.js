// The Python playground's engine: Pyodide (CPython in WebAssembly, served from this site's _pyodide/) in a module
// worker, so a long loop never freezes the page and Stop can end it at once (the page terminates this worker and
// starts a new one).
//
// Messages from the page:
//   { type: 'run', code, files }        run a program; files = { path: { text } | { b64 } } is the student's saved files
//   { type: 'answer', text }            the student's answer to input()
//   { type: 'call', id, values }        a mini-Gradio app's Submit
//   { type: 'request', id, method, path, form }   a web app's page (Flask, or FastAPI through uvicorn.run)
// Messages to the page:
//   ready | status { text } | out { text, err } | ask { prompt } | files { files } | app { kind, spec }
//   done { ok, error } | result { id, values, error } | page { id, status, type, body, path, error }
let py = null;
let pendingAnswer = null;
const HOME = '/home/pyodide';
const here = new URL('.', import.meta.url);
const pyodideURL = new URL('../_pyodide/', here);

// ---------- output: batched, so a loop that prints for ever cannot flood the page ----------
let pending = '', pendingErr = false, lastFlush = 0;
const CAP = 40000;
function flush() {
  if (pending) postMessage({ type: 'out', text: pending, err: pendingErr });
  pending = ''; lastFlush = performance.now();
}
function emit(text, err = false) {
  if (err !== pendingErr) flush();
  pendingErr = err;
  pending += text;
  if (pending.length > CAP) pending = pending.slice(-CAP);
  if (pending.length > 4096 || performance.now() - lastFlush > 50) flush();
}
const decoder = { out: new TextDecoder(), err: new TextDecoder() };

// ---------- files: the student's files live in the browser (the page keeps them); here they are real files ----------
function walk(dir, out, base = '') {
  for (const name of py.FS.readdir(dir)) {
    if (name === '.' || name === '..') continue;
    const p = `${dir}/${name}`, rel = base + name;
    const st = py.FS.stat(p);
    if (py.FS.isDir(st.mode)) walk(p, out, rel + '/');
    else {
      const bytes = py.FS.readFile(p);
      try { out[rel] = { text: new TextDecoder('utf-8', { fatal: true }).decode(bytes) }; }
      catch { let s = ''; for (const b of bytes) s += String.fromCharCode(b); out[rel] = { b64: btoa(s) }; }
    }
  }
  return out;
}
function clearDir(dir) {
  for (const name of py.FS.readdir(dir)) {
    if (name === '.' || name === '..') continue;
    const p = `${dir}/${name}`;
    if (py.FS.isDir(py.FS.stat(p).mode)) { clearDir(p); py.FS.rmdir(p); } else py.FS.unlink(p);
  }
}
function restore(files) {
  clearDir(HOME);
  for (const [rel, f] of Object.entries(files || {})) {
    const parts = rel.split('/');
    let d = HOME;
    for (const part of parts.slice(0, -1)) { d += '/' + part; try { py.FS.mkdir(d); } catch { /* exists */ } }
    const data = f.b64 != null ? Uint8Array.from(atob(f.b64), (c) => c.charCodeAt(0)) : f.text;
    py.FS.writeFile(`${HOME}/${rel}`, data);
  }
}
const sendFiles = () => { try { postMessage({ type: 'files', files: walk(HOME, {}) }); } catch { /* not ready */ } };

// ---------- start-up ----------
const ready = (async () => {
  const { loadPyodide } = await import(new URL('pyodide.mjs', pyodideURL).href);
  py = await loadPyodide({ indexURL: pyodideURL.href });
  py.setStdout({ write: (buf) => { emit(decoder.out.decode(buf, { stream: true })); return buf.length; } });
  py.setStderr({ write: (buf) => { emit(decoder.err.decode(buf, { stream: true }), true); return buf.length; } });
  // input(): Python pauses (JSPI) until the page sends the answer. The prompt goes with the question.
  self.wpAsk = (prompt) => new Promise((resolve) => { flush(); sendFiles(); pendingAnswer = resolve; postMessage({ type: 'ask', prompt }); });
  self.wpApp = (kind, spec) => { flush(); postMessage({ type: 'app', kind, spec: spec ? JSON.parse(spec) : null }); };
  self.wpJSPI = typeof WebAssembly.Suspending === 'function';
  // requests stand-in: a plain GET with a synchronous request (allowed in workers), so Python code stays ordinary.
  self.wpFetch = (url) => {
    try { const x = new XMLHttpRequest(); x.open('GET', url, false); x.send(); return { status: x.status, text: x.responseText, error: x.status ? null : 'no reply' }; }
    catch (e) { return { status: 0, text: '', error: String((e && e.message) || e) }; }
  };
  // Our helpers (wp_runtime, the gradio stand-in, uvicorn) live outside the student's folder.
  py.FS.mkdirTree('/wp_lib');
  for (const f of ['wp_runtime.py', 'gradio.py', 'uvicorn.py', 'requests.py']) {
    py.FS.writeFile(`/wp_lib/${f}`, await (await fetch(new URL(f, here), { cache: 'no-cache' })).text());
  }
  py.runPython('import sys; sys.path.insert(0, "/wp_lib"); import wp_runtime');
  let manifest = { wheels: [] };
  try { manifest = await (await fetch(new URL('manifest.json', pyodideURL), { cache: 'no-cache' })).json(); } catch { /* no extra wheels */ }
  self.wpWheels = manifest.wheels.map((w) => new URL(w, pyodideURL).href);
  postMessage({ type: 'ready' });
})().catch((e) => { postMessage({ type: 'fatal', text: String(e && e.message || e) }); throw e; });

// Packages a program imports: Pyodide's own (pandas, fastapi...) come from its list; Flask is our extra wheels.
const loaded = new Set();
async function loadFor(code) {
  const want = (name) => new RegExp(`^\\s*(from|import)\\s+${name}\\b`, 'm').test(code);
  const named = [];
  if (want('flask') && !loaded.has('flask')) named.push('flask');
  if (want('fastapi') && !loaded.has('fastapi')) named.push('fastapi');
  if (want('pandas') && !loaded.has('pandas')) named.push('pandas');
  if (named.length) postMessage({ type: 'status', text: `Loading ${named.join(' and ')}…` });
  // Our stand-ins (gradio, uvicorn, requests in /wp_lib) are not Pyodide packages: leave their imports out of the scan.
  const scan = code.replace(/^[ \t]*(import|from)[ \t]+(requests|gradio|uvicorn)\b.*$/gm, '');
  await py.loadPackagesFromImports(scan, { messageCallback: () => {}, errorCallback: () => {} });
  if (want('flask') && !loaded.has('flask')) {
    await py.loadPackage(['jinja2', 'markupsafe', ...self.wpWheels], { messageCallback: () => {}, errorCallback: () => {} });
    py.runPython('import wp_runtime; wp_runtime.hook_flask()');
    loaded.add('flask');
  }
  if (want('fastapi') && !loaded.has('fastapi')) {
    await py.loadPackage(['fastapi', 'httpx'], { messageCallback: () => {}, errorCallback: () => {} });
    py.runPython('import wp_runtime; wp_runtime.hook_fastapi()');
    loaded.add('fastapi');
  }
  if (want('pandas')) loaded.add('pandas');
}

// Tracebacks: keep the student's own lines, drop Pyodide's.
function tidy(err) {
  const text = String((err && err.message) || err);
  if (!/Traceback/.test(text)) return text;
  const lines = text.split('\n'), out = [];
  let keep = true;
  for (const line of lines) {
    const frame = line.match(/^ {2}File "([^"]+)"/);
    if (frame) keep = !/^\/lib\/|^\/wp_lib\/|_pyodide|<frozen/.test(frame[1]);
    else if (!/^ {3,}/.test(line)) keep = true;
    if (keep) out.push(line);
  }
  return out.join('\n').replace(/\n+$/, '');
}

self.onmessage = async (e) => {
  const m = e.data;
  if (m.type === 'answer') { const r = pendingAnswer; pendingAnswer = null; r?.(m.text); return; }
  await ready;
  if (m.type === 'run') {
    let ok = true, error = null;
    try {
      restore(m.files);
      await loadFor(m.code);
      postMessage({ type: 'status', text: 'Running…' });
      const reset = py.runPython('import wp_runtime; wp_runtime.reset');
      reset(); reset.destroy();
      const g = py.runPython('import wp_runtime; wp_runtime.fresh_globals()');
      await py.runPythonAsync(m.code, { globals: g, filename: 'main.py' });
    } catch (err) {
      ok = false; error = tidy(err);
    }
    emit(decoder.out.decode()); emit(decoder.err.decode(), true); flush();
    sendFiles();
    postMessage({ type: 'done', ok, error });
  } else if (m.type === 'call') {
    try {
      const call = py.runPython('import wp_runtime; wp_runtime.call_gradio');
      const res = await call(JSON.stringify(m.values)); call.destroy();
      flush(); sendFiles();
      postMessage({ type: 'result', id: m.id, values: JSON.parse(res) });
    } catch (err) { flush(); postMessage({ type: 'result', id: m.id, error: tidy(err) }); }
  } else if (m.type === 'request') {
    try {
      const serve = py.runPython('import wp_runtime; wp_runtime.serve');
      const res = await serve(m.method, m.path, JSON.stringify(m.form || null)); serve.destroy();
      const [status, type, body, path] = JSON.parse(res);
      flush(); sendFiles();
      postMessage({ type: 'page', id: m.id, status, ctype: type, body, path });
    } catch (err) { flush(); postMessage({ type: 'page', id: m.id, error: tidy(err) }); }
  }
};
