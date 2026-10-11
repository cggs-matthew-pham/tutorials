import { hint } from './p5-errors.js';

// p5.js playground: type a sketch, press Run, see the canvas. The sketch runs in a sandboxed iframe (scripts only: its own
// origin, no forms, no navigation, so it cannot reach this page or the site) with p5.js served from this site (vendor/).
//   ?code=<starter sketch>   ?id=<key for saving this student's edits, and for reporting runs to the lesson page>
const params = new URLSearchParams(location.search);
const starter = params.get('code') ?? 'function setup() {\n  createCanvas(400, 300);\n  background(240);\n  circle(200, 150, 100);\n}\n';
const id = params.get('id');
const storeKey = id ? `wp-p5-playground:${id}` : null;

const $ = (i) => document.getElementById(i);
const codeEl = $('code'), previewEl = $('preview'), statusEl = $('status'), outEl = $('output'), problemEl = $('problem');
const runBtn = $('run'), stopBtn = $('stop');

const read = () => { try { return storeKey ? localStorage.getItem(storeKey) : null; } catch { return null; } };
const write = (v) => { try { if (storeKey) (v === null ? localStorage.removeItem(storeKey) : localStorage.setItem(storeKey, v)); } catch { /* storage unavailable */ } };
codeEl.value = read() ?? starter;

// A small, stable surface for tests and tooling.
const state = window.__playground = { status: 'ready', output: '', code: '', error: null, runs: 0, snapshot: null };

// Tell the lesson page what ran, so its code checks and compare box can follow along (the same message the Python playground sends).
function report(status) {
  try { if (window.parent !== window && id) window.parent.postMessage({ wp: 'run', kind: 'p5', id, status, output: state.output, code: state.code }, location.origin); } catch { /* not embedded */ }
}
function setStatus(status, text) {
  state.status = status;
  statusEl.dataset.state = status === 'done' ? 'running' : status;
  statusEl.textContent = text;
  runBtn.textContent = status === 'done' || status === 'running' ? 'Run again ▶' : 'Run ▶';
  stopBtn.disabled = !(status === 'done' || status === 'running');
}

// Everything the sketch tells us comes through postMessage from the iframe's shim (it runs before p5.js and the student's code).
const SHIM = `(function(){
function say(m){try{parent.postMessage(Object.assign({wpP5:1},m),'*')}catch(e){}}
function fmt(a){return [].map.call(a,function(v){if(typeof v==='string')return v;try{return typeof v==='object'?JSON.stringify(v):String(v)}catch(e){return String(v)}}).join(' ')}
['log','info','warn'].forEach(function(k){var o=console[k];console[k]=function(){say({t:'log',text:fmt(arguments)});try{o.apply(console,arguments)}catch(e){}}});
function where(err){var s=err&&err.stack?String(err.stack):'';var m=s.match(/(?:srcdoc|<anonymous>):(\\d+):\\d+/);return m?Number(m[1]):null}
window.addEventListener('error',function(e){if(e.target&&e.target!==window)return;var line=where(e.error)||(/srcdoc|^$/.test(e.filename||'')?e.lineno:null);say({t:'error',message:e.message,line:line})});
window.addEventListener('unhandledrejection',function(e){say({t:'error',message:String(e.reason&&e.reason.message||e.reason),line:where(e.reason)})});
window.addEventListener('message',function(e){if(e.data&&e.data.wp==='snap'){var c=document.querySelector('canvas');say({t:'snap',url:c?c.toDataURL():null})}});
window.addEventListener('load',function(){var n=0;var iv=setInterval(function(){n++;if((typeof frameCount!=='undefined'&&frameCount>=1)||(typeof draw!=='function'&&n>=6)||n>40){clearInterval(iv);say({t:'started'})}},40)});
})();`;
const P5_URL = new URL('vendor/p5.min.js', location.href).href;
let headLines = 0;
function sketchDoc(code) {
  const head = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;overflow:auto;background:#e9e7e1}body{display:flex;justify-content:center;align-items:flex-start}canvas{display:block}#p5_loading{display:none!important}</style><script>${SHIM}<\/script><script src="${P5_URL}"><\/script></head><body><script>\n`;
  headLines = head.split('\n').length - 1;
  return head + code.replace(/<\/script/gi, '<\\/script') + '\n<\/script></body></html>';
}

function showLine(line) {
  const lines = codeEl.value.split('\n');
  let start = 0; for (let i = 0; i < line - 1; i++) start += lines[i].length + 1;
  codeEl.focus(); codeEl.setSelectionRange(start, start + (lines[line - 1] || '').length);
  codeEl.scrollTop = Math.max(0, (line - 3) * 21.7);
}
function showProblem(message, line) {
  const code = state.code;
  const { hint: h, line: ln } = hint(message, code, line);
  state.error = { message, line: ln, hint: h };
  problemEl.hidden = false; problemEl.replaceChildren();
  const b = document.createElement('b'); b.textContent = (ln ? `Line ${ln}: ` : '') + (h ? '' : 'Something went wrong'); problemEl.append(b);
  if (h) { const parts = h.split('`'); parts.forEach((p, i) => problemEl.append(i % 2 ? Object.assign(document.createElement('code'), { textContent: p }) : document.createTextNode(p))); }
  const s = document.createElement('small'); s.textContent = 'JavaScript says: ' + String(message).replace(/^Uncaught\s+/, ''); problemEl.append(s);
  if (ln) { const bt = document.createElement('button'); bt.type = 'button'; bt.textContent = `Show line ${ln}`; bt.addEventListener('click', () => showLine(ln)); problemEl.append(document.createElement('br'), bt); }
  setStatus('error', ln ? `Error on line ${ln}` : 'Error');
  report('error');
}

window.addEventListener('message', (e) => {
  const m = e.data;
  if (e.source === previewEl.contentWindow && m && m.wpP5) {
    if (m.t === 'log') { state.output += m.text + '\n'; outEl.textContent = state.output.slice(-8000); outEl.scrollTop = outEl.scrollHeight; }
    else if (m.t === 'error') {
      if (state.status === 'error') return;
      const own = m.line ? m.line - headLines : null; // the shim reports lines of the whole page; the student's code starts after the head
      showProblem(m.message, own >= 1 && own <= state.code.split('\n').length ? own : null);
    }
    else if (m.t === 'started') { if (state.status === 'running') { setStatus('done', 'Running: click the sketch to use the mouse and keys'); report('done'); } }
    else if (m.t === 'snap') state.snapshot = m.url;
    return;
  }
  // The lesson page can reset the editor to a task's own starter code.
  if (e.origin === location.origin && m && m.wp === 'set-code' && typeof m.code === 'string') { codeEl.value = m.code; write(m.code); }
  if (e.origin === location.origin && m && m.wp === 'snap') previewEl.contentWindow?.postMessage({ wp: 'snap' }, '*');
});

function run() {
  state.code = codeEl.value; state.output = ''; state.error = null; state.runs++;
  outEl.textContent = ''; problemEl.hidden = true;
  setStatus('running', 'Starting…');
  previewEl.srcdoc = sketchDoc(state.code);
}
function stop() {
  previewEl.srcdoc = '<!doctype html><body style="margin:0;background:#fff"></body>';
  if (state.status === 'done' || state.status === 'running') { setStatus('stopped', 'Stopped'); report('stopped'); }
}

runBtn.addEventListener('click', run);
stopBtn.addEventListener('click', stop);
$('reset').addEventListener('click', () => { codeEl.value = starter; write(null); problemEl.hidden = true; });
codeEl.addEventListener('input', () => write(codeEl.value));
codeEl.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); codeEl.setRangeText('  ', codeEl.selectionStart, codeEl.selectionEnd, 'end'); write(codeEl.value); }
  else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
});
