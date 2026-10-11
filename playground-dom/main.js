import { hint } from './dom-errors.js';

// Web page and JavaScript playground: type a page (HTML with a <script>), press Run, see the page react, with a console
// for console.log and errors. The page runs in a sandboxed iframe (scripts only: its own origin, no forms, no top
// navigation), so it cannot reach this page or the site. No saving to localStorage inside it (the sandbox has none).
//   ?code=<starter page>   ?id=<key for saving this student's edits, and for reporting runs to the lesson page>   ?zoom=
const params = new URLSearchParams(location.search);
const starter = params.get('code') ?? '<h1 id="title">Hello!</h1>\n<script>\n  console.log("Hello from the console");\n<\/script>\n';
const id = params.get('id');
const storeKey = id ? `wp-dom-playground:${id}` : null;
const zoom = Math.min(3, Math.max(1, Number(params.get('zoom')) || 1));
// Like the HTML playground: enlarge the code and the page inside the preview, not the playground itself
// (a zoomed outer page puts clicks into the preview in the wrong place).
const ZOOM = zoom > 1 ? `<style>html{zoom:${zoom}}</style>` : '';
if (zoom > 1) { document.getElementById('code').style.fontSize = `${Math.round(14 * zoom)}px`; document.getElementById('output').style.fontSize = `${Math.round(13 * zoom)}px`; }

const $ = (i) => document.getElementById(i);
const codeEl = $('code'), previewEl = $('preview'), statusEl = $('status'), outEl = $('output'), problemEl = $('problem'), runBtn = $('run');

const read = () => { try { return storeKey ? localStorage.getItem(storeKey) : null; } catch { return null; } };
const write = (v) => { try { if (storeKey) (v === null ? localStorage.removeItem(storeKey) : localStorage.setItem(storeKey, v)); } catch { /* storage unavailable */ } };
codeEl.value = read() ?? starter;

const state = window.__playground = { status: 'ready', output: '', code: '', html: '', text: '', error: null, runs: 0, updates: 0 };

// The lesson page follows along as for the HTML playground (kind 'html': its code checks read tags and text of the page).
// The first report, at load, is quiet so checks can tick without nagging before the student has done anything.
let reported = false;
function report(status) {
  try { if (window.parent !== window && id) window.parent.postMessage({ wp: 'run', kind: 'html', id, status, quiet: !reported, output: state.output, code: codeEl.value }, location.origin); } catch { /* not embedded */ }
  reported = true;
}
function setStatus(status, text) {
  state.status = status;
  statusEl.dataset.state = status === 'done' ? 'running' : status;
  statusEl.textContent = text;
  runBtn.textContent = status === 'done' || status === 'running' ? 'Run again ▶' : 'Run ▶';
}

// The shim runs first in the page: it sends console messages and errors out, keeps web links in a new tab, and says
// that sending a form does nothing here. It is one line, inserted without a newline, so the student's line numbers stay the same.
const SHIM = `(function(){
function say(m){try{parent.postMessage(Object.assign({wpDom:1},m),'*')}catch(e){}}
function fmt(a){return [].map.call(a,function(v){if(typeof v==='string')return v;if(v instanceof Element)return '<'+v.tagName.toLowerCase()+'>';try{return typeof v==='object'?JSON.stringify(v):String(v)}catch(e){return String(v)}}).join(' ')}
['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){say({t:'log',k:k,text:fmt(arguments)});try{o.apply(console,arguments)}catch(e){}}});
window.addEventListener('error',function(e){if(e.target&&e.target!==window)return;say({t:'error',message:e.message,line:e.lineno||null})});
window.addEventListener('unhandledrejection',function(e){say({t:'error',message:String(e.reason&&e.reason.message||e.reason),line:null})});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href');if(h&&h.charAt(0)!=='#'){e.preventDefault();window.open(a.href,'_blank','noopener')}},true);
document.addEventListener('submit',function(e){e.preventDefault();say({t:'log',k:'warn',text:'A form was submitted. Nothing is sent from here: use a button and an event instead.'})},true);
window.addEventListener('load',function(){say({t:'loaded'})});
})();`.replace(/\n/g, '');
function pageDoc(code) {
  const tag = `<script>${SHIM}<\/script>${ZOOM}`;
  const dt = code.match(/^\s*<!doctype[^>]*>/i);
  return dt ? dt[0] + tag + code.slice(dt[0].length) : '<!doctype html>' + tag + code;
}

function showLine(line) {
  const lines = codeEl.value.split('\n');
  let start = 0; for (let i = 0; i < line - 1; i++) start += lines[i].length + 1;
  codeEl.focus(); codeEl.setSelectionRange(start, start + (lines[line - 1] || '').length);
  codeEl.scrollTop = Math.max(0, (line - 3) * 21.7);
}
function showProblem(message, line) {
  const { hint: h, line: ln } = hint(message, state.code, line);
  state.error = { message, line: ln, hint: h };
  problemEl.hidden = false; problemEl.replaceChildren();
  const b = document.createElement('b'); b.textContent = (ln ? `Line ${ln}: ` : '') + (h ? '' : 'Something went wrong'); problemEl.append(b);
  if (h) { const parts = h.split('`'); parts.forEach((p, i) => problemEl.append(i % 2 ? Object.assign(document.createElement('code'), { textContent: p }) : document.createTextNode(p))); }
  const s = document.createElement('small'); s.textContent = 'JavaScript says: ' + String(message).replace(/^Uncaught\s+/, ''); problemEl.append(s);
  if (ln) { const bt = document.createElement('button'); bt.type = 'button'; bt.textContent = `Show line ${ln}`; bt.addEventListener('click', () => showLine(ln)); problemEl.append(document.createElement('br'), bt); }
  const e = document.createElement('span'); e.className = 'error'; e.textContent = (ln ? `Line ${ln}: ` : '') + String(message).replace(/^Uncaught\s+/, '') + '\n'; outEl.append(e);
  setStatus('error', ln ? `Error on line ${ln}` : 'Error');
  report('error');
}

// What the page says now, for lesson checks and tests (read from the running page: the shim cannot be asked, so parse the code).
function snapshot() {
  const doc = new DOMParser().parseFromString(state.code, 'text/html');
  state.html = state.code; state.text = (doc.body.innerText ?? doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

window.addEventListener('message', (e) => {
  const m = e.data;
  if (e.source === previewEl.contentWindow && m && m.wpDom) {
    if (m.t === 'log') {
      state.output += (m.k === 'warn' || m.k === 'error' ? m.k + ': ' : '') + m.text + '\n';
      const s = document.createElement('span'); if (m.k !== 'log' && m.k !== 'info') s.className = m.k; s.textContent = m.text + '\n'; outEl.append(s); outEl.scrollTop = outEl.scrollHeight;
    } else if (m.t === 'error') {
      if (state.status === 'error') return;
      showProblem(m.message, m.line && m.line >= 1 && m.line <= state.code.split('\n').length ? m.line : null);
    } else if (m.t === 'loaded') {
      if (state.status === 'running') { setStatus('done', 'Running: the page is live, click it to try it'); state.updates++; report('done'); }
    }
    return;
  }
  // The lesson page can reset the editor to a task's own starter code.
  if (e.origin === location.origin && m && m.wp === 'set-code' && typeof m.code === 'string') { codeEl.value = m.code; write(m.code); }
});

function run() {
  state.code = codeEl.value; state.output = ''; state.error = null; state.runs++;
  outEl.replaceChildren(); problemEl.hidden = true;
  snapshot();
  setStatus('running', 'Starting…');
  previewEl.srcdoc = pageDoc(state.code);
}

runBtn.addEventListener('click', run);
$('reset').addEventListener('click', () => { codeEl.value = starter; write(null); problemEl.hidden = true; });
codeEl.addEventListener('input', () => write(codeEl.value));
codeEl.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); codeEl.setRangeText('  ', codeEl.selectionStart, codeEl.selectionEnd, 'end'); write(codeEl.value); }
  else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
});
// The lesson shows the starter page at once, without a Run: a quiet report lets its code checks see the starter.
state.code = codeEl.value; snapshot(); report('done');
