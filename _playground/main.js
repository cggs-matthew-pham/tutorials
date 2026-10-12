import { CanvasTurtle, StopError } from './canvas-turtle.js?v=6cdc18b770';
import { mountSnippets } from './snippets.js?v=6cdc18b770';
import { createRunner } from './skulpt-bridge.js?v=6cdc18b770';
import { explainError } from './python-errors.mjs?v=6cdc18b770';

// URL parameters (set by the lesson page):
//   ?code=<starter code>   ?id=<key for autosaving this student's edits>
const params = new URLSearchParams(location.search);
const starter = params.get('code') ?? 'from turtle import *\n\nforward(100)\n';
const storeKey = params.get('id') ? `wp-playground:${params.get('id')}` : null;

if (params.get('view') === 'output') document.body.classList.add('output-only');

const $ = (id) => document.getElementById(id);
const codeEl = $('code'), statusEl = $('status'), outEl = $('output'), stateEl = $('turtle-state');
const runBtn = $('run'), stopBtn = $('stop'), finishBtn = $('finish'), resetBtn = $('reset');
const speedEl = $('speed');

const read = () => { try { return storeKey ? localStorage.getItem(storeKey) : null; } catch { return null; } };
const write = (v) => { try { if (storeKey) (v === null ? localStorage.removeItem(storeKey) : localStorage.setItem(storeKey, v)); } catch { /* storage unavailable */ } };

// Files: the main program, plus modules the student writes themselves. Modules follow the student across
// lessons (per browser), like My tools, so a module built in one lesson can be imported in the next.
// Modules saved per step by earlier versions are merged in once; the newer copy of a name wins.
const MODS_KEY = 'wp-mymodules:turtle';
const oldModsKey = storeKey ? `${storeKey}:mods` : null;
let studentMods = {};
try { studentMods = JSON.parse(localStorage.getItem(MODS_KEY) || '{}') || {}; } catch { studentMods = {}; }
try {
  const old = oldModsKey && JSON.parse(localStorage.getItem(oldModsKey) || 'null');
  if (old && typeof old === 'object') { studentMods = { ...old, ...studentMods }; localStorage.setItem(MODS_KEY, JSON.stringify(studentMods)); localStorage.removeItem(oldModsKey); }
} catch { /* storage unavailable */ }
const saveMods = () => { try { localStorage.setItem(MODS_KEY, JSON.stringify(studentMods)); } catch { /* storage unavailable */ } };
// Another tab (another lesson step) changed a module: pick it up unless this tab is editing that file.
window.addEventListener('storage', (e) => {
  if (e.key !== MODS_KEY) return;
  try { const next = JSON.parse(e.newValue || '{}') || {}; if (active !== 'main' && next[active] === undefined) active = 'main'; studentMods = next; ctl?.setStudentModules(studentMods); switchTab(active); } catch { /* ignore */ }
});
let mainText = read() ?? starter;
let active = 'main'; // 'main' or the name of a student module
codeEl.value = mainText;

// A small, stable surface for tests and tooling (defined before the renderer, which emits on creation).
window.__playground = { status: 'idle', output: '', error: null, turtle: null };

const turtle = new CanvasTurtle($('canvas'), {
  extent: Number(params.get('extent')) || undefined,
  shape: params.get('shape') || undefined, // ?shape=classic: draw Python's arrow instead of the turtle (cheat-sheet pictures)
  onUpdate: (s) => { stateEl.textContent = `x ${s.x} · y ${s.y} · heading ${s.heading}°`; window.__playground.turtle = s; },
});
// Lesson modules: ?use=shapes,house names the ones offered; ?mods={"name": "source"} supplies ones written
// in the lesson itself. Shared ones come from modules.json (built from the repo's modules/ folder).
const useModules = (params.get('use') || '').split(',').map((s) => s.trim()).filter(Boolean);
const modulesReady = (async () => {
  if (!useModules.length) return {};
  let shared = {}, local = {};
  try { shared = await (await fetch('modules.json', { cache: 'no-cache' })).json(); } catch { /* none shared */ }
  try { local = JSON.parse(params.get('mods') || '{}'); } catch { /* ignore a bad value */ }
  const out = {};
  for (const n of useModules) if (local[n] ?? shared[n]) out[n] = local[n] ?? shared[n];
  return out;
})();

// Console mode (the console bridge course): a program that does not use the turtle gets a console in place of the
// drawing. It is decided once, from the step's starter (or ?console=1), so turtle lessons never change; if a
// console program starts using the turtle, the drawing comes back when it runs. input() then asks on an inline
// line in the console instead of the browser's prompt box.
const canvasPane = document.querySelector('.canvas-pane');
const usesTurtle = (code) => /\bturtle\b/.test(code);
let consoleOn = false;
const forcedConsole = params.get('console') === '1';
function setConsole(on) {
  consoleOn = on;
  document.body.classList.toggle('console', on);
  if (on) canvasPane.prepend(outEl); else statusEl.after(outEl);
  canvasPane.setAttribute('aria-label', on ? 'Console' : 'Drawing');
  outEl.setAttribute('aria-label', on ? 'Console' : 'Output');
}
if (forcedConsole || (starter.trim() && !usesTurtle(starter))) setConsole(true);

const OUT_CAP = 40000; // a loop that prints for ever should not freeze the page
let outLen = 0;
function show(t) {
  outEl.append(document.createTextNode(t)); window.__playground.output += t;
  outLen += t.length;
  while (consoleOn && outLen > OUT_CAP && outEl.firstChild) { outLen -= (outEl.firstChild.textContent || '').length; outEl.firstChild.remove(); }
  if (consoleOn) outEl.scrollTop = outEl.scrollHeight;
}
let pendingInput = null;
function askInline(prompt) {
  if (!consoleOn) return null;
  if (prompt) show(String(prompt));
  return new Promise((resolve, reject) => {
    const field = document.createElement('input');
    Object.assign(field, { type: 'text', className: 'con-in', autocomplete: 'off', spellcheck: false });
    field.setAttribute('aria-label', 'Answer');
    field.setAttribute('autocapitalize', 'off');
    outEl.append(field);
    outEl.scrollTop = outEl.scrollHeight;
    field.focus({ preventScroll: true });
    setStatus('running', 'Type your answer and press Enter');
    pendingInput = (err) => { field.remove(); pendingInput = null; reject(err); };
    field.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const v = field.value;
      const typed = document.createElement('span'); typed.className = 'typed'; typed.textContent = v;
      field.replaceWith(typed); pendingInput = null;
      outEl.append(document.createTextNode('\n')); window.__playground.output += v + '\n'; outLen += v.length + 1;
      setStatus('running', 'Running…');
      resolve(v);
    });
  });
}
const run = createRunner({ turtle, onOutput: show, onInput: askInline });

function setStatus(state, text) {
  statusEl.dataset.state = state;
  statusEl.textContent = text;
  window.__playground.status = state;
}
function setRunning(on) {
  runBtn.disabled = on; stopBtn.disabled = !on; finishBtn.disabled = !on; resetBtn.disabled = on;
  speedEl.disabled = false;
}

if (params.get('speed')) { speedEl.value = params.get('speed'); $('speed-value').textContent = speedEl.value; }

speedEl.addEventListener('input', () => { $('speed-value').textContent = speedEl.value; turtle.speed = Number(speedEl.value); });
turtle.speed = Number(speedEl.value);

let ctl = null; // the snippet palette, once it has loaded
let syncTimer;
const syncModules = () => { clearTimeout(syncTimer); syncTimer = setTimeout(() => ctl?.setStudentModules(studentMods), 400); };
codeEl.addEventListener('input', () => {
  if (active === 'main') { mainText = codeEl.value; write(mainText); }
  else { studentMods[active] = codeEl.value; saveMods(); syncModules(); }
});
codeEl.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { // keep focus in the editor; indent with spaces
    e.preventDefault();
    const { selectionStart: s, selectionEnd: en } = codeEl;
    codeEl.setRangeText('    ', s, en, 'end');
    codeEl.dispatchEvent(new Event('input'));
  }
});

runBtn.addEventListener('click', async () => {
  ctl?.close(); // the picture matters now, not the reference
  if (consoleOn && !forcedConsole && [mainText, ...Object.values(studentMods)].some(usesTurtle)) setConsole(false);
  outEl.textContent = ''; outLen = 0;
  turtle.resetAll();
  turtle.speed = Number(speedEl.value);
  turtle.beginRun();
  Object.assign(window.__playground, { output: '', error: null });
  setRunning(true); setStatus('running', 'Running…');
  try {
    run.setModules({ ...(await modulesReady), ...studentMods }); // the student's own module wins a name clash
    await run(mainText);
    setStatus('done', 'Finished');
  } catch (err) {
    if (err instanceof StopError || /Stopped/.test(String(err))) {
      setStatus('stopped', 'Stopped');
    } else {
      const r = showError(err);
      setStatus('error', r?.line ? `Error on line ${r.line}` : 'Error: ' + String(err).split('\n')[0]);
    }
  } finally {
    turtle.draw(); turtle.emit();
    setRunning(false);
    // Tell the lesson page (if embedded) what ran, so a code check can look at it.
    try { if (window.parent !== window) window.parent.postMessage({ wp: 'run', id: params.get('id'), status: window.__playground.status, output: window.__playground.output, turtle: window.__playground.turtle, code: [mainText, ...Object.values(studentMods)].join('\n') }, location.origin); } catch { /* not embedded */ }
  }
});

stopBtn.addEventListener('click', () => { turtle.stop(); pendingInput?.(new Error('Stopped')); });
finishBtn.addEventListener('click', () => turtle.finish());
resetBtn.addEventListener('click', () => {
  mainText = starter; write(null); switchTab('main');
  outEl.textContent = ''; outLen = 0; turtle.resetAll();
  if (forcedConsole || (starter.trim() && !usesTurtle(starter))) setConsole(true);
  setStatus('idle', 'Ready');
  window.__playground.output = ''; window.__playground.error = null;
});

// ---------- errors: a plain-language line first (tools/python-errors.mjs), then Python's own message ----------
function showError(err) {
  const raw = String(err);
  const tb = err?.traceback?.[0], mod = String(tb?.filename || '').match(/(\w+)\.py$/)?.[1];
  const file = mod && studentMods[mod] !== undefined ? mod : (!tb || /stdin/.test(tb.filename || '') ? 'main' : null);
  const r = explainError(raw, file === 'main' ? mainText : file ? studentMods[file] : '');
  if (r && file && file !== 'main') r.hint = r.hint.replace(/^Line (\d+):/, `Line $1 of ${file}.py:`);
  window.__playground.error = raw + (r ? '\n' + r.hint : '');
  const box = document.createElement('span'); box.className = 'err';
  if (outEl.textContent && !outEl.textContent.endsWith('\n')) box.append('\n');
  if (r) {
    const hint = document.createElement('span'); hint.className = 'err-hint'; hint.textContent = r.hint; box.append(hint);
    if (r.line && file) {
      const go = document.createElement('button'); go.type = 'button'; go.className = 'err-go'; go.textContent = `Show line ${r.line}`;
      go.addEventListener('click', () => showLine(file, r.line)); box.append(' ', go);
    }
    box.append('\n');
  }
  const said = document.createElement('span'); said.className = r ? 'err-raw' : ''; said.textContent = (r ? 'Python says: ' : '') + raw; box.append(said);
  outEl.append(box);
  return r;
}
/** Select a line in the editor (switching to its file), so the student looks at the right place. */
function showLine(file, n) {
  if (active !== file) switchTab(file);
  const lines = codeEl.value.split('\n'); if (n > lines.length) return;
  const start = lines.slice(0, n - 1).reduce((a, l) => a + l.length + 1, 0);
  codeEl.focus(); codeEl.setSelectionRange(start, start + lines[n - 1].length);
  const lh = parseFloat(getComputedStyle(codeEl).lineHeight) || 20;
  codeEl.scrollTop = Math.max(0, (n - 3) * lh);
}

// ---------- file tabs: main.py plus the student's own modules ----------
const tabsEl = $('tabs');
const RESERVED = new Set(['turtle', 'random', 'math', 'time', 'string', 're', 'json', 'sys', 'os']);
const MODULE_TEMPLATE = 'from turtle import *\n\n\n# Put your functions here. Start each one with a """docstring""" and it shows up in Reference.\n';

function switchTab(name) {
  active = name === 'main' || studentMods[name] !== undefined ? name : 'main';
  codeEl.value = active === 'main' ? mainText : studentMods[active];
  codeEl.setAttribute('aria-label', active === 'main' ? 'Python code' : `Python code: ${active}.py`);
  renderTabs();
}
function renderTabs() {
  const names = Object.keys(studentMods);
  const canAdd = !ctl?.isLocked('my-module');
  tabsEl.hidden = !names.length && !canAdd;
  tabsEl.replaceChildren();
  const tab = (label, name) => {
    const b = document.createElement('button');
    b.type = 'button'; b.role = 'tab'; b.className = 'tab'; b.textContent = label;
    b.setAttribute('aria-selected', String(active === name));
    b.addEventListener('click', () => switchTab(name));
    return b;
  };
  tabsEl.append(tab('main.py', 'main'));
  for (const n of names) {
    tabsEl.append(tab(`${n}.py`, n));
    const x = document.createElement('button');
    x.type = 'button'; x.className = 'tab rm'; x.textContent = '×'; x.title = `Delete ${n}.py`; x.setAttribute('aria-label', `Delete ${n}.py`);
    x.addEventListener('click', () => {
      if (!confirm(`Delete ${n}.py? This cannot be undone.`)) return;
      delete studentMods[n]; saveMods(); ctl?.setStudentModules(studentMods);
      switchTab(active === n ? 'main' : active);
    });
    tabsEl.append(x);
  }
  if (canAdd) {
    const add = document.createElement('button');
    add.type = 'button'; add.className = 'tab add'; add.id = 'add-module'; add.textContent = '+ module';
    add.title = 'A file of your own functions that your program can import';
    add.addEventListener('click', () => {
      const name = (prompt('Name your module (lowercase letters, digits and _):', 'my_tools') || '').trim();
      if (!name) return;
      if (!/^[a-z][a-z0-9_]*$/.test(name) || RESERVED.has(name)) { alert('Use lowercase letters, digits and _, starting with a letter, and not a name Python already uses (like turtle or random).'); return; }
      if (studentMods[name] !== undefined) { switchTab(name); return; }
      studentMods[name] = MODULE_TEMPLATE; saveMods(); ctl?.setStudentModules(studentMods);
      switchTab(name);
    });
    tabsEl.append(add);
  }
}

modulesReady.then(async (modules) => {
  ctl = await mountSnippets({
    kind: 'turtle', toolbar: document.querySelector('.bar'), textarea: codeEl, before: document.querySelector('.speed'), modules,
    host: document.querySelector('.canvas-pane'),
    // "This lesson": the lesson is the step id without its last part; the starter shows what the step uses.
    lesson: params.get('id') && params.get('free') !== '1' ? { slug: params.get('id').replace(/\/[^/]*$/, ''), code: starter } : null,
    // A lesson module copied to edit: it becomes the student's own module of the same name, which wins the import.
    openCopy: (name, source) => { if (studentMods[name] === undefined) { studentMods[name] = source; saveMods(); ctl?.setStudentModules(studentMods); } switchTab(name); },
    openModule: (name) => switchTab(name),
  });
  if (ctl) { ctl.setStudentModules(studentMods); ctl.onChange(renderTabs); }
  renderTabs();
});
renderTabs();


// ?autorun=1 runs the program once the page is ready (for output-only clips).
if (params.get('autorun')) modulesReady.then(() => setTimeout(() => runBtn.click(), 400));

// A lesson task can reset the editor to its own starter code.
window.addEventListener('message', (e) => {
  const m = e.data;
  if (e.origin !== location.origin || !m || m.wp !== 'set-code' || typeof m.code !== 'string') return;
  mainText = m.code; write(mainText); switchTab('main');
});
