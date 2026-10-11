import { explainError } from './python-errors.mjs';

// The game playground: type a microStudio game in Python, press Run, play it beside the code. The game runs in
// index.html (the play-only player, same origin), which keeps its last error and print() lines in window.__gameError
// and window.__gameLog; this page reads them and shows a friendly hint ("Line N: …") and a console.
//   ?code=<starter game>   ?id=<key for saving this student's edits>   ?zoom=<enlarge the code, for recorded clips>
const params = new URLSearchParams(location.search);
const STARTER = 'def init():\n    global x\n    x = -100\n\ndef update():\n    global x\n    x += 1\n    if x > 100:\n        x = -100\n\ndef draw():\n    screen.clear("rgb(10,10,40)")\n    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")\n';
const starter = params.get('code') ?? STARTER;
const id = params.get('id');
const storeKey = id ? `wp-ms-playground:${id}` : null;
const zoom = Math.min(3, Math.max(1, Number(params.get('zoom')) || 1));

const $ = (i) => document.getElementById(i);
const codeEl = $('code'), gameEl = $('game'), statusEl = $('status'), outEl = $('output'), problemEl = $('problem');
const runBtn = $('run'), stopBtn = $('stop');
if (zoom > 1) { codeEl.style.fontSize = `${Math.round(14 * zoom)}px`; outEl.style.fontSize = `${Math.round(13 * zoom)}px`; }

const read = () => { try { return storeKey ? localStorage.getItem(storeKey) : null; } catch { return null; } };
const write = (v) => { try { if (storeKey) (v === null ? localStorage.removeItem(storeKey) : localStorage.setItem(storeKey, v)); } catch { /* storage unavailable */ } };
codeEl.value = read() ?? starter;

// A small, stable surface for tests and tooling.
const state = window.__playground = { status: 'ready', output: '', code: '', error: null, runs: 0 };

function setStatus(status, text) {
  state.status = status;
  statusEl.dataset.state = status;
  statusEl.textContent = text;
  runBtn.textContent = status === 'running' ? 'Run again ▶' : 'Run ▶';
  stopBtn.disabled = status !== 'running';
}

function showLine(line) {
  const lines = codeEl.value.split('\n');
  let start = 0; for (let i = 0; i < line - 1; i++) start += lines[i].length + 1;
  codeEl.focus(); codeEl.setSelectionRange(start, start + (lines[line - 1] || '').length);
  codeEl.scrollTop = Math.max(0, (line - 3) * 21.7 * zoom);
}

// "Line 5: NameError: name 'c' is not defined" from the player, read as a Python traceback so the shared
// friendly-error rules (tools/python-errors.mjs) can read it.
function showProblem(text) {
  const m = String(text).match(/^Line (\d+): ([\s\S]*)$/);
  const line = m ? Number(m[1]) : null, message = m ? m[2] : String(text);
  const tb = (line ? `Traceback (most recent call last):\n  File "main", line ${line}\n` : '') + message;
  const r = explainError(tb, state.code, { turtle: false });
  const ln = r?.line || line;
  state.error = { message, line: ln, hint: r?.hint || null };
  problemEl.hidden = false; problemEl.replaceChildren();
  const b = document.createElement('b'); b.textContent = r?.hint || (ln ? `Line ${ln}: something went wrong` : 'Something went wrong'); problemEl.append(b);
  const s = document.createElement('small'); s.textContent = 'Python says: ' + message.split('\n').pop(); problemEl.append(s);
  if (ln) { const bt = document.createElement('button'); bt.type = 'button'; bt.textContent = `Show line ${ln}`; bt.addEventListener('click', () => showLine(ln)); problemEl.append(bt); }
  setStatus('error', ln ? `Error on line ${ln}` : 'Error');
}

let poll = null, lastLog = '';
function watch() {
  clearInterval(poll);
  poll = setInterval(() => {
    let w; try { w = gameEl.contentWindow; } catch { return; }
    if (!w) return;
    const log = w.__gameLog || '';
    if (log && log !== lastLog) { lastLog = log; state.output = log + '\n'; outEl.textContent = log; outEl.scrollTop = outEl.scrollHeight; }
    if (w.__gameError && (state.status === 'running' || state.status === 'starting')) showProblem(String(w.__gameError).split('\n')[0]);
    if (state.status === 'starting' && w.player?.runtime?.started) setStatus('running', 'Running: click the game to use the keys');
  }, 250);
}

function run() {
  state.code = codeEl.value; state.output = ''; state.error = null; state.runs++; lastLog = '';
  outEl.textContent = ''; problemEl.hidden = true;
  setStatus('starting', 'Starting…');
  gameEl.src = `index.html?hint=0&run=${state.runs}&code=${encodeURIComponent(state.code)}`;
  // A game whose init() fails never reports "started"; the error still shows. Count it as running after a moment.
  setTimeout(() => { if (state.status === 'starting') setStatus('running', 'Running: click the game to use the keys'); }, 6000);
  watch();
}
function stop() {
  clearInterval(poll);
  gameEl.src = 'about:blank';
  if (state.status === 'running' || state.status === 'starting') setStatus('stopped', 'Stopped');
}

runBtn.addEventListener('click', run);
stopBtn.addEventListener('click', stop);
$('reset').addEventListener('click', () => { codeEl.value = starter; write(null); problemEl.hidden = true; });
codeEl.addEventListener('input', () => write(codeEl.value));
codeEl.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); codeEl.setRangeText('    ', codeEl.selectionStart, codeEl.selectionEnd, 'end'); write(codeEl.value); }
  else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
});
