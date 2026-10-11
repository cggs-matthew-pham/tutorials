// The Python playground (CPython through Pyodide, in a worker: worker.js). Console programs with input(), files
// with open() kept in this browser, and apps: a mini-Gradio form, Flask pages, FastAPI through uvicorn.run.
// URL parameters (set by the lesson page), as for the turtle playground:
//   ?code=<starter>  ?id=<autosave key; its first two parts name the course, whose files the program sees>
//   ?view=output (buttons and console, no code: clips)  ?autorun=1  ?free=1 (the course's free playground)
import { mountSnippets } from './snippets.js';

const params = new URLSearchParams(location.search);
const starter = params.get('code') ?? 'name = input("What is your name? ")\nprint("Hello, " + name + "!")\n';
const id = params.get('id');
const storeKey = id ? `wp-playground:${id}` : null;
// Files belong to a course (code/deeper), so every lesson in it, and its free playground (id free/deeper), sees them.
const filesKey = `wp-pyfiles:${!id ? 'free' : id.startsWith('free/') ? 'code/' + id.split('/')[1] : id.split('/').slice(0, 2).join('/')}`;
if (params.get('view') === 'output') document.body.classList.add('output-only');

const $ = (x) => document.getElementById(x);
const codeEl = $('code'), statusEl = $('status'), outEl = $('output');
const runBtn = $('run'), stopBtn = $('stop'), resetBtn = $('reset');

const read = () => { try { return storeKey ? localStorage.getItem(storeKey) : null; } catch { return null; } };
const write = (v) => { try { if (storeKey) (v === null ? localStorage.removeItem(storeKey) : localStorage.setItem(storeKey, v)); } catch { /* storage unavailable */ } };
let mainText = read() ?? starter;
codeEl.value = mainText;

// A small, stable surface for tests and tooling.
window.__playground = { status: 'loading', output: '', error: null, files: {} };

function setStatus(state, text) {
  statusEl.dataset.state = state; statusEl.textContent = text;
  window.__playground.status = state;
}

// ---------- files: kept per course in this browser ----------
const FILES_CAP = 1_000_000;
let files = {};
try { files = JSON.parse(localStorage.getItem(filesKey) || '{}') || {}; } catch { files = {}; }
function saveFiles(next) {
  const s = JSON.stringify(next);
  if (s.length > FILES_CAP) { if (JSON.stringify(files) !== s) show('\n(Your files are too big to keep in this browser: over 1 MB. They were not saved.)\n', 'err'); return; }
  files = next; window.__playground.files = files;
  try { localStorage.setItem(filesKey, s); } catch { /* storage unavailable */ }
  renderFiles();
}
window.__playground.files = files;
window.addEventListener('storage', (e) => { if (e.key === filesKey) { try { files = JSON.parse(e.newValue || '{}') || {}; } catch { files = {}; } renderFiles(); } });

// ---------- views: Console, App, Files ----------
const views = { console: [$('view-console'), outEl], app: [$('view-app'), $('app')], files: [$('view-files'), $('files')] };
function showView(name) {
  for (const [k, [tab, panel]] of Object.entries(views)) { tab.setAttribute('aria-selected', String(k === name)); panel.hidden = k !== name; }
}
for (const [k, [tab]] of Object.entries(views)) tab.addEventListener('click', () => showView(k));

const sizeText = (n) => (n < 1024 ? `${n} bytes` : `${(n / 1024).toFixed(1)} KB`);
function renderFiles() {
  const list = $('file-list'), names = Object.keys(files).sort();
  $('file-count').textContent = names.length ? `(${names.length})` : '';
  list.replaceChildren();
  if (!names.length) { const li = document.createElement('li'); li.className = 'empty'; li.textContent = 'No files yet.'; list.append(li); }
  for (const n of names) {
    const f = files[n], li = document.createElement('li');
    const b = document.createElement('button'); b.type = 'button'; b.className = 'fname'; b.textContent = n;
    b.addEventListener('click', () => { const v = $('file-view'); v.hidden = false; v.textContent = f.text ?? '(not a text file)'; v.dataset.name = n; });
    const size = document.createElement('span'); size.className = 'fsize'; size.textContent = sizeText(f.text != null ? new Blob([f.text]).size : Math.floor(f.b64.length * 3 / 4));
    const rm = document.createElement('button'); rm.type = 'button'; rm.className = 'btn frm'; rm.textContent = 'Delete'; rm.setAttribute('aria-label', `Delete ${n}`);
    rm.addEventListener('click', () => {
      if (!confirm(`Delete ${n}? This cannot be undone.`)) return;
      const next = { ...files }; delete next[n]; saveFiles(next);
      if ($('file-view').dataset.name === n) $('file-view').hidden = true;
    });
    li.append(b, size, rm); list.append(li);
  }
  const v = $('file-view');
  if (!v.hidden && files[v.dataset.name]) v.textContent = files[v.dataset.name].text ?? '(not a text file)';
}
renderFiles();

// Lesson data files (?files=music.csv&from=code/data/rows/files/): added when the student does not have them yet,
// so their own changes to a file are kept; "Get this lesson's files again" puts the originals back.
const lessonFiles = (params.get('files') || '').split(',').map((s) => s.trim()).filter(Boolean);
const fileBase = new URL('../' + (params.get('from') || ''), location.href);
async function fetchLessonFiles(names) {
  const got = {};
  for (const n of names) { try { const r = await fetch(new URL(n, fileBase), { cache: 'no-cache' }); if (r.ok) got[n] = { text: await r.text() }; } catch { /* offline: skip */ } }
  return got;
}
// Clips pass a file's text in the address (?file:music.csv=...), since they are recorded before the site is built.
const given = {};
for (const [k, v] of params) if (k.startsWith('file:') && k.length > 5) given[k.slice(5).replace(/[^\w.-]/g, '_')] = { text: v };
if (Object.keys(given).length) saveFiles({ ...files, ...given });
const lessonFilesReady = (async () => {
  const missing = lessonFiles.filter((n) => !files[n]);
  if (missing.length) saveFiles({ ...files, ...(await fetchLessonFiles(missing)) });
})();
if (lessonFiles.length) {
  const b = $('file-restore'); b.hidden = false;
  b.addEventListener('click', async () => {
    if (!confirm(`Put back the lesson's ${lessonFiles.join(', ')}? Changes you made to ${lessonFiles.length > 1 ? 'them' : 'it'} are lost.`)) return;
    saveFiles({ ...files, ...(await fetchLessonFiles(lessonFiles)) });
  });
}
// A file of the student's own, such as their class's CSV.
$('file-add').addEventListener('change', async (e) => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  const name = f.name.replace(/[^\w.-]/g, '_');
  if (files[name] && !confirm(`Replace your ${name}?`)) return;
  saveFiles({ ...files, [name]: { text: await f.text() } });
});

// ---------- console ----------
const OUT_CAP = 40000;
let outLen = 0;
function show(t, cls) {
  if (!t) return;
  const node = cls ? Object.assign(document.createElement('span'), { className: cls, textContent: t }) : document.createTextNode(t);
  outEl.append(node); window.__playground.output += t; outLen += t.length;
  while (outLen > OUT_CAP && outEl.firstChild) { outLen -= (outEl.firstChild.textContent || '').length; outEl.firstChild.remove(); }
  outEl.scrollTop = outEl.scrollHeight;
}
let pendingInput = null;
function askInline(prompt) {
  showView('console');
  if (prompt) show(prompt);
  const field = document.createElement('input');
  Object.assign(field, { type: 'text', className: 'con-in', autocomplete: 'off', spellcheck: false });
  field.setAttribute('aria-label', 'Answer'); field.setAttribute('autocapitalize', 'off');
  outEl.append(field); outEl.scrollTop = outEl.scrollHeight;
  field.focus({ preventScroll: true });
  setStatus('running', 'Type your answer and press Enter');
  pendingInput = () => { field.remove(); pendingInput = null; };
  field.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const v = field.value;
    field.replaceWith(Object.assign(document.createElement('span'), { className: 'typed', textContent: v }));
    pendingInput = null;
    outEl.append(document.createTextNode('\n')); window.__playground.output += v + '\n'; outLen += v.length + 1;
    setStatus('running', 'Running…');
    worker.postMessage({ type: 'answer', text: v });
  });
}

// Plain-language hints under Python's own message.
const FRIENDLY = [
  [/NameError: name '(\w+)' is not defined/, (m) => `Python does not know the name ${m[1]}. Check the spelling, and that you created it before this line.`],
  [/IndentationError/, () => 'Indentation problem: the lines inside an if, a loop or a function must be indented by the same amount.'],
  [/SyntaxError: (invalid syntax|expected ':')/, () => 'Python could not read this line. Check for a missing colon (:), bracket or quote on this line or the one above.'],
  [/can only concatenate str \(not "(int|float)"\) to str|unsupported operand type\(s\) for \+: '(int|float)' and 'str'/, () => '+ cannot mix a number and text. To join a number onto text, use str(): "Score: " + str(score). To add a typed number, turn the text into a number with int() first.'],
  [/invalid literal for int\(\)/, () => 'int() can only turn text made of digits into a number, such as "12". Check what was typed before turning it into a number.'],
  [/FileNotFoundError: .*'([^']+)'/, (m) => `There is no file called ${m[1]} yet. The Files tab shows the files your programs have made.`],
  [/KeyError: (.+)$/m, (m) => `The dictionary has no key ${m[1]}. Keys must match exactly, including capitals.`],
  [/JSONDecodeError/, () => 'The file is not valid JSON. Did the program write it with json.dump()? You can look at it in the Files tab.'],
];
function showError(text) {
  show((outEl.textContent && !outEl.textContent.endsWith('\n') ? '\n' : '') + text + '\n', 'err');
  for (const [re, fn] of FRIENDLY) { const m = text.match(re); if (m) { show(fn(m) + '\n', 'hint'); break; } }
}

// ---------- apps ----------
const appTab = $('view-app'), appBody = $('app-body'), addressForm = $('address'), addrEl = $('addr');
let callSeq = 0;
const waiting = new Map();
const ask = (msg) => new Promise((resolve) => { const n = ++callSeq; waiting.set(n, resolve); worker.postMessage({ ...msg, id: n }); });
function clearApp() { appTab.hidden = true; appBody.replaceChildren(); addressForm.hidden = true; }

function gradioApp(spec) {
  const root = document.createElement('div'); root.className = 'gr';
  if (spec.title) root.append(Object.assign(document.createElement('h2'), { textContent: spec.title }));
  if (spec.description) root.append(Object.assign(document.createElement('p'), { textContent: spec.description }));
  const inputs = spec.inputs.map((c, i) => {
    const lab = document.createElement(c.kind === 'radio' ? 'div' : 'label'); lab.className = c.kind === 'radio' ? 'field' : ''; lab.append(c.label || `Input ${i + 1}`);
    let el, get;
    if (c.kind === 'radio') {
      const box = document.createElement('div'); box.className = 'radios'; box.setAttribute('role', 'radiogroup'); box.setAttribute('aria-label', c.label || `Input ${i + 1}`);
      const group = `r${i}-${Math.random().toString(36).slice(2, 7)}`;
      c.choices.forEach((o) => { const l = document.createElement('label'); const r = Object.assign(document.createElement('input'), { type: 'radio', name: group, value: o, checked: c.value === o }); l.append(r, ' ' + o); box.append(l); });
      lab.append(box); get = () => { const r = box.querySelector('input:checked'); return r ? r.value : null; };
    } else if (c.kind === 'dropdown') { el = document.createElement('select'); c.choices.forEach((o) => el.add(new Option(o, o))); if (c.value != null) el.value = c.value; get = () => el.value; lab.append(el); }
    else if (c.kind === 'checkbox') { el = Object.assign(document.createElement('input'), { type: 'checkbox', checked: !!c.value }); lab.className = 'checkbox'; lab.prepend(el); get = () => el.checked; }
    else if (c.kind === 'slider') {
      el = Object.assign(document.createElement('input'), { type: 'range', min: c.minimum, max: c.maximum, step: c.step, value: c.value });
      const o = Object.assign(document.createElement('output'), { textContent: el.value });
      el.addEventListener('input', () => { o.textContent = el.value; });
      const row = document.createElement('div'); row.className = 'slider'; row.append(el, o); lab.append(row); get = () => Number(el.value);
    } else {
      el = Object.assign(document.createElement('input'), { type: c.kind === 'number' ? 'number' : 'text', value: c.value ?? '' });
      if (c.kind === 'number') el.step = 'any';
      lab.append(el); get = () => (c.kind === 'number' ? (el.value === '' ? 0 : Number(el.value)) : el.value);
    }
    root.append(lab); return get;
  });
  const btn = Object.assign(document.createElement('button'), { type: 'button', className: 'btn primary', textContent: 'Submit' });
  root.append(btn);
  const outs = spec.outputs.map((c, i) => {
    root.append(Object.assign(document.createElement('div'), { className: 'out-label', textContent: c.label || `Output ${i + 1}` }));
    const d = document.createElement('div'); d.className = `out out-${c.kind}`; root.append(d); return d;
  });
  const err = document.createElement('div'); err.className = 'err'; root.append(err);
  btn.addEventListener('click', async () => {
    btn.disabled = true; err.textContent = '';
    const r = await ask({ type: 'call', values: inputs.map((g) => g()) });
    btn.disabled = false;
    if (r.error) { err.textContent = r.error; showError(r.error); return; }
    r.values.forEach((v, i) => fill(outs[i], spec.outputs[i], v));
  });
  appBody.replaceChildren(root);
}
function fill(d, c, v) {
  d.replaceChildren();
  const table = v && typeof v === 'object' && Array.isArray(v.columns) ? v : null;
  if (c.kind === 'bar' && table) {
    const xi = table.columns.indexOf(c.x), yi = table.columns.indexOf(c.y);
    const max = Math.max(1e-9, ...table.rows.map((r) => Number(r[yi]) || 0));
    for (const r of table.rows) {
      const row = document.createElement('div'); row.className = 'bar-row';
      const bar = document.createElement('div'); bar.className = 'bar-fill'; bar.style.width = `${(Math.max(0, Number(r[yi]) || 0) / max) * 100}%`;
      bar.title = `${r[xi]}: ${r[yi]}`;
      row.append(Object.assign(document.createElement('span'), { textContent: `${r[xi]} (${r[yi]})` }), bar); d.append(row);
    }
  } else if (table) {
    const t = document.createElement('table'), head = t.insertRow();
    table.columns.forEach((h) => head.append(Object.assign(document.createElement('th'), { textContent: h })));
    table.rows.forEach((r) => { const tr = t.insertRow(); r.forEach((x) => { tr.insertCell().textContent = x == null ? '' : String(x); }); });
    d.append(t);
  } else d.textContent = v == null ? '' : Array.isArray(v) ? v.join(', ') : String(v);
}

// A web app (Flask, or FastAPI through uvicorn.run): its pages show in a frame; links and forms go back to the app.
const frame = document.createElement('iframe');
frame.title = 'Your app'; frame.setAttribute('sandbox', 'allow-same-origin allow-forms');
async function visit(method, path, form) {
  if (!/^\//.test(path)) path = '/' + path;
  addrEl.value = path;
  const r = await ask({ type: 'request', method, path, form });
  if (r.error) { showError(r.error); frame.srcdoc = `<pre style="color:#b3261e;white-space:pre-wrap">${esc(r.error)}</pre>`; return; }
  addrEl.value = r.path;
  const json = /json/.test(r.ctype || '');
  let body = r.body;
  if (json) { try { body = JSON.stringify(JSON.parse(body), null, 2); } catch { /* as sent */ } }
  frame.srcdoc = json || !/html/.test(r.ctype || '') ? `<pre style="font:14px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;margin:12px">${esc(body)}</pre>` : body;
  if (r.status >= 400) show(`${method} ${path}: ${r.status}\n`, 'err');
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
frame.addEventListener('load', () => {
  const d = frame.contentDocument;
  if (!d) return;
  const resolve = (href) => { const u = new URL(href, 'http://app' + (addrEl.value || '/')); return u.origin === 'http://app' ? u.pathname + u.search + u.hash : null; };
  d.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#')) return;
    e.preventDefault();
    const path = resolve(href);
    if (path) visit('GET', path); else window.open(a.href, '_blank', 'noopener');
  });
  d.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target, method = (f.getAttribute('method') || 'GET').toUpperCase();
    const data = {};
    for (const [k, v] of new FormData(f, e.submitter || undefined)) data[k] = String(v);
    const path = resolve(f.getAttribute('action') || addrEl.value || '/');
    if (method === 'GET') { const u = new URL(path, 'http://app'); u.search = new URLSearchParams(data).toString(); visit('GET', u.pathname + u.search); }
    else visit(method, path, data);
  });
});
addressForm.addEventListener('submit', (e) => { e.preventDefault(); visit('GET', addrEl.value.trim() || '/'); });

function startApp(kind, spec) {
  appTab.hidden = false;
  if (kind === 'gradio') { addressForm.hidden = true; gradioApp(spec); }
  else { addressForm.hidden = false; appBody.replaceChildren(frame); visit('GET', '/'); }
  showView('app');
}

// ---------- the worker ----------
let worker, running = false, ready = false, runDone = null;
function startWorker() {
  ready = false; runBtn.disabled = true;
  if (!running) setStatus('loading', 'Loading Python…');
  worker = new Worker(new URL('worker.js' + new URL(import.meta.url).search, import.meta.url), { type: 'module' });
  worker.onmessage = (e) => {
    const m = e.data;
    if (m.type === 'ready') { ready = true; if (!running) { runBtn.disabled = false; setStatus('idle', 'Ready'); } }
    else if (m.type === 'fatal') { setStatus('error', 'Python could not load here. Check your connection, or ask your teacher to try the Check your school page.'); show(m.text + '\n', 'err'); }
    else if (m.type === 'status') setStatus('running', m.text);
    else if (m.type === 'out') show(m.text, m.err ? 'err' : null);
    else if (m.type === 'ask') askInline(m.prompt);
    else if (m.type === 'files') saveFiles(m.files);
    else if (m.type === 'app') startApp(m.kind, m.spec);
    else if (m.type === 'done') runDone?.(m);
    else if (m.type === 'result' || m.type === 'page') { const r = waiting.get(m.id); waiting.delete(m.id); r?.(m); }
  };
}
startWorker();

function setRunning(on) { running = on; runBtn.disabled = on || !ready; stopBtn.disabled = !on; resetBtn.disabled = on; }

function report() {
  try { if (window.parent !== window) window.parent.postMessage({ wp: 'run', id, status: window.__playground.status, output: window.__playground.output, code: mainText }, location.origin); } catch { /* not embedded */ }
}

runBtn.addEventListener('click', async () => {
  ctl?.close();
  outEl.textContent = ''; outLen = 0; clearApp(); showView('console');
  Object.assign(window.__playground, { output: '', error: null });
  setRunning(true); setStatus('running', 'Running…');
  await lessonFilesReady;
  const m = await new Promise((resolve) => { runDone = resolve; worker.postMessage({ type: 'run', code: mainText, files }); });
  runDone = null;
  if (m.stopped) setStatus('stopped', 'Stopped');
  else if (m.ok) setStatus('done', appTab.hidden ? 'Finished' : 'Finished: your app is running in the App tab');
  else { window.__playground.error = m.error; showError(m.error); setStatus('error', 'Error: ' + m.error.trim().split('\n').pop()); }
  setRunning(false);
  report();
});

stopBtn.addEventListener('click', () => {
  // Python cannot be interrupted mid-loop, so the worker is replaced; the files saved so far are kept.
  worker.terminate(); pendingInput?.();
  for (const r of waiting.values()) r({ error: 'Stopped' });
  waiting.clear(); clearApp();
  startWorker();
  runDone?.({ stopped: true });
});

resetBtn.addEventListener('click', () => {
  mainText = starter; codeEl.value = mainText; write(null);
  outEl.textContent = ''; outLen = 0; clearApp(); showView('console');
  if (ready) setStatus('idle', 'Ready');
  window.__playground.output = ''; window.__playground.error = null;
});

codeEl.addEventListener('input', () => { mainText = codeEl.value; write(mainText); });
codeEl.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); codeEl.setRangeText('    ', codeEl.selectionStart, codeEl.selectionEnd, 'end'); codeEl.dispatchEvent(new Event('input')); }
});

let ctl = null;
mountSnippets({
  kind: 'turtle', toolbar: document.querySelector('.bar'), textarea: codeEl, before: resetBtn,
  host: document.querySelector('.side-pane'),
  lesson: id && params.get('free') !== '1' ? { slug: id.replace(/\/[^/]*$/, ''), code: starter } : null,
}).then((c) => { ctl = c; });

if (params.get('autorun')) {
  const go = () => (ready ? setTimeout(() => runBtn.click(), 300) : setTimeout(go, 100));
  go();
}

// A lesson task can reset the editor to its own starter code.
window.addEventListener('message', (e) => {
  const m = e.data;
  if (e.origin !== location.origin || !m || m.wp !== 'set-code' || typeof m.code !== 'string') return;
  mainText = m.code; codeEl.value = mainText; write(mainText);
});
