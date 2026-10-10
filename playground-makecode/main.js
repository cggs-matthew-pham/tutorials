// MakeCode playground: the real MakeCode editor (micro:bit or Arcade) in controller mode, inside our page.
// In controller mode this page owns the projects: MakeCode asks us for them (workspacesync) and sends every
// edit back to us (workspacesave). Sign-in and MakeCode's cloud are off inside the embed, so nothing lands in a
// student's MakeCode account. We report the student's code (main.ts: blocks always compile to it) to the lesson
// page on the same channel as the HTML playground, so code checks tick as students build.
//   ?target=microbit|arcade   ?code=<starter JavaScript>   ?id=<key for autosaving this step>
//   ?pkg=<name=version,...>  extensions the lesson needs (e.g. microbit-robot=github:microsoft/microbit-robot#v2.7.4),
//           added to every project's pxt.json dependencies; MakeCode fetches them and shows their blocks and simulator
//   ?tutorial=<path>  open a MakeCode tutorial instead of a starter (startactivity): a built-in one (/projects/flashing-heart)
//           or one on GitHub (github:owner/repo/file). The tutorial's project is followed and reported like a step's, and
//           its progress is posted to the lesson ({ wp: 'tutorial', event, step, total }). Not restored on reload.
//   ?editor=<editor URL>  (tests only: a mock editor)   ?debug  (message log over the editor)
//   ?sim=1  (build only: render-pictures loads a program, starts MakeCode's own simulator and screenshots it;
//           nothing is saved and nothing is reported)
// Rules learnt the hard way (ROADMAP › MakeCode: embedding check):
//   - answer every workspacesync with all projects held: MakeCode re-syncs on import, and an empty reply loses the project
//   - an imported project gets a new id: follow the id of the first save that carries our name
//   - the name comes from pxt.json, so set it there as well as in the header
//   - build imports from MakeCode's own first (default) project: its header and pxt.json are right for the target
//   - starters are JavaScript only: send an empty main.blocks, then switchblocks so MakeCode builds the blocks
//   - saves come in pairs and in bursts: wait 500 ms after the last one before reporting
const params = new URLSearchParams(location.search);
const TARGETS = {
  microbit: { title: 'micro:bit', url: 'https://makecode.microbit.org/' },
  arcade: { title: 'Arcade', url: 'https://arcade.makecode.com/' },
};
const target = TARGETS[params.get('target')] ? params.get('target') : 'microbit';
const editorUrl = params.get('editor') || TARGETS[target].url;
const EDITOR = new URL(editorUrl).origin;
const starter = params.get('code') ?? '';
// Extensions as { name: version }; names and versions are plain package ids (letters, digits, - _ . : / # @).
const DEPS = Object.fromEntries((params.get('pkg') || '').split(',').map((d) => d.trim().split('='))
  .filter(([n, v]) => n && v && /^[\w.-]+$/.test(n) && /^[\w.:/#@*-]+$/.test(v)));
const SIM = params.has('sim');
// A tutorial path: a docs path (/projects/...) or a GitHub one (github:owner/repo/file); nothing else is sent to MakeCode.
const TUTORIAL = /^(\/[\w\-/]+|github:[\w.\-]+\/[\w.\-]+(\/[\w.\-/]+)?(#[\w.\-]+)?)$/.test(params.get('tutorial') || '') ? params.get('tutorial') : '';
const id = SIM ? null : params.get('id');
const storeKey = id ? `wp-makecode-playground:${id}` : null;
const NAME = 'Waypoints ' + (id ? id.split('/').slice(-2).join(' ') : 'playground');

const $ = (x) => document.getElementById(x);
const frame = $('editor'), statusEl = $('status');
$('title').textContent = TARGETS[target].title;
const setStatus = (text, state = '') => { statusEl.textContent = text; statusEl.dataset.state = state; };

const DEBUG = params.has('debug');
const dbg = (...a) => { if (!DEBUG) return; const el = $('debug'); el.hidden = false; el.textContent += a.join(' ') + '\n'; el.scrollTop = el.scrollHeight; };

const read = () => { try { return storeKey ? JSON.parse(localStorage.getItem(storeKey)) : null; } catch { return null; } };
const write = (v) => { try { if (storeKey) (v === null ? localStorage.removeItem(storeKey) : localStorage.setItem(storeKey, JSON.stringify(v))); } catch { /* storage unavailable */ } };

// A small, stable surface for tests and tooling.
window.__playground = { code: '', saves: 0, reports: 0, ready: false, simStarted: false };

let template = null;           // { header, pxt } from MakeCode's own first project
let ids = new Set();           // ids MakeCode has used for the project we loaded
let loadedCode = null;         // main.ts as loaded, so reports stay quiet until the student changes something
let pending = null;            // a project waiting for the template
let reqN = 0, timer = null;
const projects = {};           // header.id -> project: the store MakeCode syncs with

const post = (msg) => { try { frame.contentWindow.postMessage(msg, EDITOR); } catch { /* frame not ready */ } };
const request = (action, extra = {}) => post({ type: 'pxteditor', id: 'wp' + (++reqN), action, response: true, ...extra });

function report(code) {
  window.__playground.reports++;
  const quiet = code.trim() === String(loadedCode || '').trim();
  try {
    if (window.parent !== window && id) window.parent.postMessage({ wp: 'run', kind: target, id, status: 'done', quiet, code }, location.origin);
  } catch { /* not embedded */ }
}

// Load a program into the editor: blocks (main.blocks XML) when we have them, else JavaScript that MakeCode converts.
function load(code, blocks = '') {
  if (!template) { pending = { code, blocks }; return; }
  pending = null;
  const now = Math.round(Date.now() / 1000);
  const hid = 'wp-' + Date.now().toString(36);
  ids = new Set([hid]);
  let pxt = template.pxt;
  try {
    const cfg = JSON.parse(template.pxt); cfg.name = NAME;
    if (Object.keys(DEPS).length) cfg.dependencies = { ...(cfg.dependencies || {}), ...DEPS };
    pxt = JSON.stringify(cfg, null, 4);
  } catch { /* keep MakeCode's own */ }
  const header = { ...template.header, id: hid, name: NAME, recentUse: now, modificationTime: now, isDeleted: false };
  const text = { 'main.blocks': blocks || '', 'main.ts': code, 'README.md': ' ', 'pxt.json': pxt };
  projects[hid] = { header, text };
  loadedCode = code;
  window.__playground.code = code;
  request('importproject', { project: { header, text } });
  if (!blocks) setTimeout(() => request('switchblocks'), 600);
  // Picture mode: run the program in MakeCode's simulator once the blocks are built (the editor also runs it by itself).
  if (SIM) setTimeout(() => { request('startsimulator'); window.__playground.simStarted = true; }, 1500);
  dbg('import', JSON.stringify(NAME), blocks ? '(blocks)' : '(javascript)', Object.keys(DEPS).length ? 'with ' + Object.keys(DEPS).join(', ') : '');
  report(code);
}

function start() {
  if (TUTORIAL) {
    ids = new Set(); loadedCode = '';
    request('startactivity', { activityType: 'tutorial', path: TUTORIAL });
    setStatus('Opening the tutorial…');
    dbg('startactivity', TUTORIAL);
    return;
  }
  const saved = read();
  if (saved && typeof saved.ts === 'string') load(saved.ts, saved.blocks || '');
  else load(starter);
}

window.addEventListener('message', (e) => {
  // A lesson task can reset this step to its own starter code (same message as the HTML playground).
  if (e.origin === location.origin && e.data && e.data.wp === 'set-code' && typeof e.data.code === 'string') {
    write(null); load(e.data.code); return;
  }
  if (e.source !== frame.contentWindow || e.origin !== EDITOR) return;
  const d = e.data || {};
  if (d.type === 'iframeclientready') { setStatus('MakeCode connected'); dbg('ready'); return; }
  if (d.type === 'pxteditor' && d.action) { dbg('reply', d.action, d.success === false ? 'FAILED ' + JSON.stringify(d.error) : 'ok'); return; }
  if (d.type !== 'pxthost') return;
  if (d.action === 'workspacesync') {
    const list = Object.values(projects);
    post({ type: 'pxthost', id: d.id, success: true, projects: list, controllerId: 'waypoints-tutorials' });
    dbg('sync, replied with', list.length);
    return;
  }
  if (d.action === 'tutorialevent') {
    // Tutorial progress: shown in the bar and passed to the lesson, so a check can follow it.
    const ev = d.tutorialEvent, step = Number(d.currentStep) + 1, total = Number(d.totalSteps);
    if (d.projectHeaderId) ids.add(d.projectHeaderId);
    setStatus(ev === 'completed' ? 'Tutorial complete' : ev === 'progress' && total ? `Tutorial: step ${step} of ${total}` : ev === 'loaded' ? 'Tutorial loaded' : 'Tutorial closed', ev === 'completed' ? 'saved' : '');
    window.__playground.tutorial = { event: ev, step, total };
    try { if (window.parent !== window && id) window.parent.postMessage({ wp: 'tutorial', id, event: ev, step, total, completed: ev === 'completed' || !!d.isCompleted }, location.origin); } catch { /* not embedded */ }
    dbg('tutorial', ev, ev === 'progress' ? `${step}/${total}` : '');
    return;
  }
  if (d.action !== 'workspacesave') { dbg('host', d.action); return; }
  if (d.response) post({ type: 'pxthost', id: d.id, success: true });
  const p = d.project || {};
  if (!p.header || !p.text) return;
  projects[p.header.id] = { header: p.header, text: p.text };
  window.__playground.saves++;
  dbg('save', JSON.stringify(p.header.name), String(p.header.id).slice(0, 8), (p.text['main.ts'] || '').length + ' chars');
  if (!template) {                              // MakeCode's own default project: our template
    template = { header: p.header, pxt: p.text['pxt.json'] };
    window.__playground.ready = true;
    setStatus('Ready');
    start();
    return;
  }
  if (p.header.name === NAME) ids.add(p.header.id);
  // In tutorial mode, the tutorial's project is the first new project after MakeCode's own default one.
  if (TUTORIAL && !ids.size && p.header.id !== template.header.id) ids.add(p.header.id);
  if (!ids.has(p.header.id)) { dbg('  ignored: not this step'); return; }
  const code = p.text['main.ts'] || '';
  window.__playground.code = code;
  if (!TUTORIAL) write({ ts: code, blocks: p.text['main.blocks'] || '' });
  setStatus('Saved', 'saved');
  clearTimeout(timer);
  timer = setTimeout(() => report(code), 500);
});

$('reset').addEventListener('click', () => { write(null); if (TUTORIAL) start(); else load(starter); });

frame.src = editorUrl + (editorUrl.includes('?') ? '&' : '?') + 'controller=1#editor';
