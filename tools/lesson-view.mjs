// Lesson page rendering shared by the Node build and the in-browser /create/ preview.
// Pure: Marked and highlightCode are injected; no fs, no DOM.
import { unlockKind, evalRules, parseTrace, splitFiles, bugKeys, makecodePackage, makecodeExtensions } from './lesson-core.mjs';
import { MATH_JS } from './math-expr.mjs';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const titleCase = (s) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const STAGE_INFO = {
  predict: ['Predict', 'Read the code and say what it will do before you run anything.'],
  run: ['Run', 'Run it and compare the result with your prediction.'],
  investigate: ['Investigate', 'Trace how each line of code connects to what you see.'],
  modify: ['Modify', 'Change the code on purpose and check the result.'],
  practise: ['Practise', 'A few on your own, to check you have it.'],
  make: ['Make', 'Build something new using what you have learned.'],
  info: ['Info', ''],
};
/** The same stages in maths words: there is no code, so students try things on a board and change the problem. */
export const STAGE_INFO_MATHS = {
  predict: ['Predict', 'Read the problem and decide what you think before you try anything.'],
  run: ['Try', 'Try it on the board and compare the result with your prediction.'],
  investigate: ['Investigate', 'Work out why it happens, one step at a time.'],
  modify: ['Modify', 'Change the problem on purpose and see what happens.'],
  practise: ['Practise', 'A few on your own, to check you have it.'],
  make: ['Make', 'Make your own problem using what you have learned.'],
  info: ['Info', ''],
};
/** Science lessons use the 5E words (Engage, Explore, Explain, Elaborate, Evaluate) on the same stages, so predict-and-compare,
 * decks and worksheets work unchanged: predict = Engage, run = Explore, investigate = Explain, modify = Elaborate, info = Evaluate. */
export const STAGE_INFO_SCIENCE = {
  predict: ['Engage', 'Commit to a prediction before you test anything.'],
  run: ['Explore', 'Try it on the board and compare what happens with your prediction.'],
  investigate: ['Explain', 'Use the particle model to explain what you saw.'],
  modify: ['Elaborate', 'Use the same idea in a new context.'],
  practise: ['Practise', 'A few on your own, to check you have it.'],
  make: ['Elaborate', 'Use the same idea in a new context.'],
  info: ['Evaluate', 'Look back at your first ideas and what changed.'],
};
const TIER_LABEL = { typical: 'Typical', wider: 'Wider' };
export const STAGE_PREFIX = /^(Predict|Run|Investigate|Modify|Practise|Make|Info):\s*/i;


export function codeBlock(highlightCode, src, lang, label) {
  return `<div class="code">${label ? `<div class="code-head"><span>${esc(label)}</span><button type="button" class="copy">Copy</button></div>` : ''}<pre><code>${highlightCode(src, lang)}</code></pre></div>`;
}

// MakeCode lessons (language: makecode): display code is MakeCode JavaScript, but students know it as blocks. The page
// asks MakeCode's renderer (a hidden iframe) for a picture of the blocks, and keeps the code as text one click away
// (and open, if the renderer cannot be reached). ?mkrender=<origin> points at another renderer (tests only).
export function makecodeBlock(highlightCode, src, label, target, pic = null, pkg = '') {
  // pic: a picture drawn at build time ({ url, w, h }); without one, the page asks MakeCode's renderer.
  // pkg: the lesson's extensions as MakeCode's package string (makecodePackage), so their blocks draw as blocks.
  const img = pic ? `<img src="${esc(pic.url)}" alt="The program as blocks" width="${Math.round(pic.w / 2)}" loading="lazy">` : '<span class="mkwait">Drawing the blocks…</span>';
  return `<div class="mkblocks${pic ? ' ok' : ''}" data-target="${esc(target || 'microbit')}"${pkg ? ` data-pkg="${esc(pkg)}"` : ''} data-src="${esc(src)}"><div class="mkpic" aria-live="polite">${img}</div>` +
    `<details class="mkjs"><summary>Show as code</summary>${codeBlock(highlightCode, src, 'makecode', label)}</details></div>`;
}
export const MAKECODE_CSS = `.mkpair.has-out{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:start}.mkout{margin:14px 0}.mkout img{display:block;max-width:min(100%,360px);height:auto;image-rendering:pixelated;border-radius:8px;border:1px solid var(--line)}.mkout figcaption{color:var(--muted);font-size:14px;margin-top:4px}@media(max-width:640px){.mkpair.has-out{grid-template-columns:1fr}}
.mkblocks{margin:14px 0}.mkpic img{display:block;max-width:100%;height:auto;background:#fff;border:1px solid var(--line);border-radius:10px;padding:10px}
.mkwait{color:var(--muted);font-size:14px}.mkjs summary{cursor:pointer;color:var(--muted);font-size:14px;margin-top:6px}`;
export const MAKECODE_JS = `(function(){var els=[].slice.call(document.querySelectorAll('.mkblocks:not(.ok)'));if(!els.length)return;
var q=new URLSearchParams(location.search),t=q.get('mkrender')||(els[0].dataset.target==='arcade'?'https://arcade.makecode.com':'https://makecode.microbit.org');
var f=document.createElement('iframe');f.setAttribute('aria-hidden','true');f.tabIndex=-1;f.style.cssText='position:absolute;width:1px;height:1px;left:-9999px;border:0';
f.src=t+'/--docs?render=1';document.body.appendChild(f);
function fallback(el){if(!el.classList.contains('ok')){el.querySelector('.mkpic').hidden=true;el.querySelector('details').open=true}}
window.addEventListener('message',function(e){if(e.source!==f.contentWindow)return;var d=e.data||{};if(d.source!=='makecode')return;
if(d.type==='renderready')els.forEach(function(el,i){f.contentWindow.postMessage({type:'renderblocks',id:'mk'+i,code:el.dataset.src,options:el.dataset.pkg?{package:el.dataset.pkg}:{}},t)});
if(d.type==='renderblocks'){var el=els[Number(String(d.id).slice(2))];if(!el)return;
if(d.uri){var img=new Image();img.alt='The program as blocks';img.src=d.uri;if(d.width)img.style.width=Math.round(d.width)+'px';el.querySelector('.mkpic').replaceChildren(img);el.classList.add('ok')}else fallback(el)}});
setTimeout(function(){els.forEach(fallback)},20000)})();`;

export const CSS = `
:root{--bg:#fbfaf8;--ink:#1d2430;--muted:#5d6978;--card:#fff;--line:#e4e1da;--accent:#c2570a;--code:#141a22;--codeink:#e6edf3;
--kw:#ff7b72;--str:#a5d6ff;--fn:#d2a8ff;--com:#7f8fa1;--num:#79c0ff;
--predict:#8a5cf6;--run:#16a05d;--investigate:#2b7de9;--modify:#c2570a;--practise:#0e7f86;--make:#d63384;--info:#5d6978}
@media(prefers-color-scheme:dark){:root{--bg:#0f141a;--ink:#e6edf3;--muted:#9aa7b6;--card:#161d26;--line:#26303c;--accent:#ff9d3d;--code:#0b0f14;
--predict:#b794ff;--run:#4ade80;--investigate:#6cb6ff;--modify:#ff9d3d;--practise:#4fd1c5;--make:#ff8fc0}}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:820px;margin:0 auto;padding:0 20px 80px}
header.top{padding:44px 0 18px}header.top .crumb{font-size:14px;color:var(--muted);text-decoration:none}
h1{font-size:2.1rem;line-height:1.2;margin:.3em 0 .2em}.by{margin:-.6em 0 1em;color:var(--muted);font-size:14px}.lede{color:var(--muted);font-size:1.1rem;margin:0 0 1em}
nav.steps{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:18px 0 8px;position:sticky;top:calc(var(--nav,0px) + var(--cb,0px));z-index:9;padding:10px 0;background:var(--bg);border-bottom:1px solid var(--line);scrollbar-width:thin}
nav.steps a{flex:none;white-space:nowrap}
nav.steps a.here{border-color:var(--c);box-shadow:inset 0 0 0 1px var(--c)}
section.step{scroll-margin-top:calc(var(--nav,0px) + var(--cb,0px) + 64px)}
.coursebar{position:sticky;top:var(--nav,0px);z-index:11;display:flex;align-items:center;justify-content:space-between;gap:8px;height:46px;background:var(--bg);border-bottom:1px solid var(--line)}
.coursebar a,.cb-toggle{font:inherit;font-size:14px;font-weight:600;color:var(--ink);text-decoration:none;background:none;border:0;cursor:pointer;padding:6px 8px;border-radius:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:34vw}
.coursebar a:hover,.cb-toggle:hover{background:var(--card)}
.cb-prev,.cb-next{flex:0 1 auto;min-width:34px}.cb-next{text-align:right}
.cb-mid{position:relative;flex:1;min-width:0;text-align:center}.cb-toggle{max-width:100%}
.cb-menu{position:absolute;left:50%;transform:translateX(-50%);top:42px;width:min(92vw,440px);background:var(--card);border:1px solid var(--line);border-radius:12px;padding:8px;box-shadow:0 8px 28px rgba(0,0,0,.18);text-align:left}
.cb-menu[hidden]{display:none}.cb-menu ul{list-style:none;margin:0;padding:0}
.cb-menu li a{display:flex;gap:8px;align-items:center;max-width:none;white-space:normal;font-weight:500}.cb-menu li a[aria-current]{font-weight:700;background:var(--bg)}
.cb-menu .tick{flex:none;width:18px;height:18px;border-radius:50%;border:2px solid var(--line);display:inline-block}.cb-menu .tick.on{background:var(--run);border-color:var(--run)}
.cb-menu .cb-tools{display:flex;flex-wrap:wrap;gap:4px;border-top:1px solid var(--line);margin-top:6px;padding-top:6px}
@media(max-width:560px){.cb-prev span,.cb-next span{display:none}}
.nextcard{display:block;margin:34px 0 0;padding:18px 22px;border:1px solid var(--line);border-radius:14px;background:var(--card);color:var(--ink);text-decoration:none}
.nextcard small{display:block;color:var(--muted);font-size:13px;text-transform:uppercase;letter-spacing:.04em}.nextcard b{display:block;font-size:1.15rem}.nextcard span{color:var(--muted);font-size:15px}
.nextcard:hover{border-color:var(--accent)}
.rules{list-style:none;margin:6px 0 0;padding:0}.rules li{display:flex;gap:8px;align-items:center;margin:3px 0}.rules li::before{content:"";width:16px;height:16px;border-radius:50%;border:2px solid var(--line);flex:none}.rules li.ok::before{background:var(--run);border-color:var(--run)}

nav.steps a{font-size:13px;font-weight:600;text-decoration:none;color:var(--ink);border:1px solid var(--line);background:var(--card);padding:5px 11px;border-radius:99px}
nav.steps a i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;background:var(--c)}
section.step{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;margin:26px 0;border-top:4px solid var(--c)}
section.step h2{font-size:1.4rem;line-height:1.3;margin:.15em 0 .5em}
.chip{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c)}
.chip small{font-weight:500;letter-spacing:0;text-transform:none;color:var(--muted);margin-left:8px;font-size:13px}
.code{margin:16px 0;border-radius:10px;overflow:hidden;background:var(--code)}
.code-head{display:flex;justify-content:space-between;align-items:center;padding:7px 14px;font:12px ui-monospace,Menlo,Consolas,monospace;color:#8b98a8;border-bottom:1px solid #26303c}
.code-head button{font:inherit;background:none;border:1px solid #3a4756;color:#c3cdd9;border-radius:6px;padding:2px 9px;cursor:pointer}
.code pre{margin:0;padding:14px 16px;overflow-x:auto;color:var(--codeink);font:14px/1.55 ui-monospace,Menlo,Consolas,monospace}
.kw{color:var(--kw)}.str{color:var(--str)}.fn{color:var(--fn)}.com{color:var(--com)}.num{color:var(--num)}
p code,li code{background:color-mix(in srgb,var(--ink) 9%,transparent);padding:1px 6px;border-radius:5px;font-size:.9em}
figure.clip{margin:18px 0}figure.clip video{width:100%;border-radius:10px;border:1px solid var(--line);display:block;background:#0b0f14}
figure.clip figcaption{font-size:14px;color:var(--muted);margin-top:6px}
figure.clip .voiced-note{white-space:nowrap}
.placeholder{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;aspect-ratio:16/9;border:2px dashed var(--line);border-radius:10px;color:var(--muted);text-align:center;font-size:15px;padding:12px}
.placeholder b{color:var(--ink)}
.try{margin:20px 0 6px;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.try-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:9px 14px;font-size:14px;background:color-mix(in srgb,var(--c) 10%,transparent);border-bottom:1px solid var(--line)}
.try-head span{color:var(--muted);flex:1}
.try-full{font:inherit;font-size:13px;padding:2px 10px;border:1px solid var(--line);border-radius:7px;background:var(--card);color:var(--ink);cursor:pointer}.try-full:hover{border-color:var(--c,var(--accent))}
.try.full{position:fixed;inset:0;z-index:50;margin:0;border:0;border-radius:0;display:flex;flex-direction:column;background:var(--bg)}
.try-task,.tt-toggle{display:none}.try.full .try-task{display:block;max-height:38vh;overflow:auto;padding:6px 14px 8px;border-bottom:1px solid var(--line);background:var(--card);font-size:15px}
.try.full .tt-toggle{display:inline-block;margin-left:auto;margin-right:8px;font:inherit;font-size:13px;padding:2px 10px;border:1px solid var(--line);border-radius:7px;background:var(--card);color:var(--ink);cursor:pointer}
.tt-title{font-weight:700;margin:.2em 0 .3em}.tt-body p,.tt-body ul,.tt-body ol{margin:.3em 0}.tt-body img{max-height:24vh;width:auto}.tt-body .hints{margin:.3em 0;padding-top:4px;padding-bottom:4px}
.try-task.closed .tt-body{display:none}.try-checks{display:flex;flex-wrap:wrap;gap:4px 16px;padding:6px 0 2px;margin-top:4px;position:sticky;bottom:-8px;background:var(--card);border-top:1px dashed var(--line);font-size:14px;color:var(--muted)}.try-task.closed .try-checks{border-top:0;margin-top:0}.try-checks .ok{color:var(--run);font-weight:600}.try.full iframe{flex:1;height:auto!important}
body.try-open{overflow:hidden}
.try iframe{display:block;width:100%;border:0;background:var(--card)}
.try iframe[hidden]{display:none}.mkload{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:var(--card);color:var(--muted);font-size:14px;text-align:center;padding:16px}.try.full .mkload{height:calc(100% - 40px)!important}
.mkopen{font:inherit;font-size:16px;font-weight:600;padding:10px 18px;border-radius:10px;border:0;background:var(--c,var(--accent));color:#fff;cursor:pointer}@media(prefers-color-scheme:dark){.mkopen{color:#0f141a}}
figure.shown{margin:10px 0 16px}figure.shown img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:8px;background:#fff;display:block}figure.shown figcaption{font-size:13px;color:var(--muted);margin-top:4px}
details.expected figure{margin:8px 0 14px}details.expected img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:8px;background:#fff;display:block}details.expected figcaption{font-size:13px;color:var(--muted);margin-top:4px}
details.reveal{margin:16px 0;border:1px solid var(--line);border-radius:10px;padding:0 16px}
details.hints{margin:12px 0;border:1px solid var(--line);border-radius:10px;padding:0 16px}
details.hints summary{cursor:pointer;font-weight:600;padding:10px 0}
details.hints[open] summary{border-bottom:1px solid var(--line);margin-bottom:6px}
.tasks{margin:14px 0}
.taskpills{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px}
.taskpills .tp{font:inherit;font-size:14px;font-weight:600;padding:5px 12px;border-radius:99px;border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;display:inline-flex;align-items:center;gap:7px}
.taskpills .tp i{width:10px;height:10px;border-radius:50%;border:2px solid var(--c)}.taskpills .tp.done i{background:var(--c)}
.taskpills .tp.active{border-color:var(--c);box-shadow:inset 0 0 0 1px var(--c)}
.tpanel{display:none}.tpanel.active{display:block}
.tmsg{margin:8px 0 0;font-size:14px;font-weight:600;color:var(--run)}
.resetstart{font:inherit;font-size:13px;margin:6px 0;padding:4px 12px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--muted);cursor:pointer}
nav.steps a .cnt{font-weight:500;color:var(--muted);margin-left:5px}
.buglines{margin:6px 0;padding:0 0 0 2.2em;background:var(--code);border-radius:10px;font:14px/1.7 ui-monospace,Menlo,Consolas,monospace;list-style:decimal;color:var(--com)}
.buglines li{padding-right:6px}.check .buglines button{display:block;width:100%;margin:0;padding:0 8px;border:0;border-radius:6px;background:none;text-align:left;color:var(--codeink);cursor:pointer}
.check .buglines button:hover{background:rgba(255,255,255,.1)}.check .buglines button.no{background:rgba(255,100,100,.25)}.check .buglines button.yes{background:rgba(74,222,128,.28)}
.buglines code{white-space:pre;font:inherit}
.bugfile{margin:8px 0}.bugfile-name,.files .code-head span{font:600 13px ui-monospace,Menlo,Consolas,monospace}.bugfile-name{margin:0 0 2px;color:var(--ink)}.files{display:grid;gap:8px}
.mrow{display:flex;gap:10px;align-items:center;margin:6px 0;flex-wrap:wrap}.mrow span{flex:1 1 180px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px}.mrow select{font:inherit;font-size:14px;padding:4px 6px;border-radius:6px;max-width:100%}
.mrow select.ok{outline:2px solid var(--run)}.mrow select.no{outline:2px solid var(--make)}
.tscroll{overflow-x:auto}.trace{border-collapse:collapse;margin:8px 0;font:14px ui-monospace,Menlo,Consolas,monospace}.trace th,.trace td{border:1px solid var(--line);padding:4px 10px;text-align:center}.trace th{background:var(--card)}
.trace input{width:5em;font:inherit;text-align:center;padding:3px;border-radius:4px;border:1px solid var(--line)}.trace input.ok{outline:2px solid var(--run)}.trace input.no{outline:2px solid var(--make)}
.numrow input{font:inherit;padding:5px 8px;border-radius:6px;border:1px solid var(--line);width:9em}
.parsons{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:8px 0}@media(max-width:620px){.parsons{grid-template-columns:1fr}}
.pcol b{font-size:13px;color:var(--muted)}.pcol ul,.pcol ol{margin:4px 0;padding:0;list-style:none;min-height:3em;border:1px dashed var(--line);border-radius:10px;padding:6px}
.pcol li{display:flex;align-items:center;gap:6px;margin:3px 0;background:var(--code);border-radius:6px;padding:2px 6px}.pcol code{flex:1;white-space:pre;color:var(--codeink);font:13px ui-monospace,Menlo,Consolas,monospace;overflow-x:auto}
.check .pcol button{margin:0;padding:1px 8px;border-radius:6px;font-size:13px}.check .pcol button.piece{flex:1;text-align:left;background:none;border:0;padding:0}.pprog li[draggable=true]{cursor:grab}
details.insights{margin:10px 0}
details.teachers{margin:28px 0 0;border:1px solid var(--line);border-radius:8px;padding:0 16px}
details.teachers summary{cursor:pointer;font-weight:600;padding:12px 0}
details.teachers h3{font-size:1rem;margin:16px 0 4px}.tguide{background:color-mix(in srgb,var(--accent) 8%,transparent);border-radius:8px;padding:8px 12px}
.xbtn{flex:none;display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:13px;font-weight:600;color:var(--investigate);border:1px solid var(--investigate);background:var(--card);padding:4px 11px 4px 5px;border-radius:99px;cursor:pointer}.xbtn b{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--investigate);color:#fff;font-size:12px}.xbtn[aria-expanded=true]{box-shadow:inset 0 0 0 1px var(--investigate)}.xdrawer{position:fixed;z-index:40;right:0;top:var(--nav,0px);bottom:0;width:min(520px,100vw);overflow:auto;background:var(--card);border-left:1px solid var(--line);box-shadow:-8px 0 24px rgba(0,0,0,.12);padding:0 20px 24px}.xd-head{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--card);padding:14px 0 10px;border-bottom:1px solid var(--line);margin-bottom:12px}.xd-head h2{margin:0;font-size:1.1rem;color:var(--investigate)}.xd-close{font:inherit;font-size:13px;border:1px solid var(--line);background:var(--bg);border-radius:6px;padding:4px 10px;cursor:pointer}.xd-wait{margin:8px 0;padding:10px 14px;border-left:4px solid var(--predict,#7c3aed);background:var(--bg);border-radius:4px}.xd-body video{max-width:100%}details.explain{margin:12px 0 4px;border:1px solid var(--line);border-left:4px solid var(--investigate);border-radius:8px;padding:0 16px;background:var(--card)}details.explain summary{cursor:pointer;font-weight:600;padding:10px 0;color:var(--investigate)}
.hook{margin:0 0 16px;padding:8px 14px;border-left:4px solid var(--c,#2563eb);background:rgba(37,99,235,.07);border-radius:4px}
details.reveal summary{cursor:pointer;font-weight:600;padding:12px 0;color:var(--c)}
details.reveal[open] summary{border-bottom:1px solid var(--line);margin-bottom:6px}
.legend{display:grid;gap:6px;margin:10px 0 0;padding:0;list-style:none;font-size:15px;color:var(--muted)}
.legend b{color:var(--c)}
.widthbar{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:10px 14px;margin:14px 0 0}
.widthbar .wnote{display:block;font-size:14px;color:var(--muted)}.wseg{display:inline-flex;gap:2px;border:1px solid var(--line);border-radius:99px;padding:3px;background:var(--bg)}
.wseg button{font:inherit;font-size:14px;font-weight:600;border:0;background:transparent;color:var(--ink);border-radius:99px;padding:5px 12px;cursor:pointer}.wseg button[aria-pressed=true]{background:var(--accent);color:#fff}
@media(prefers-color-scheme:dark){.wseg button[aria-pressed=true]{color:#0f141a}}.wseg button:disabled{opacity:.4;cursor:not-allowed}
.tierchip{font-size:11px;letter-spacing:.06em;padding:1px 7px;border-radius:99px;border:1px solid currentColor;margin-left:6px}
[data-tier][hidden]{display:none!important}footer code{overflow-wrap:anywhere}.srow{flex-wrap:wrap}.srow span{font-family:inherit;font-size:15px}.srow .swhy{flex-basis:100%;color:var(--muted)}
ul.lessons{list-style:none;padding:0;display:grid;gap:14px}ul.lessons a{display:block;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px 22px;text-decoration:none;color:inherit}
.ctop{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.ctop h1{margin-bottom:0}
.chips{display:flex;gap:8px}.chip{font-size:14px;font-weight:600;text-decoration:none;color:var(--ink);border:1px solid var(--line);background:var(--card);padding:6px 14px;border-radius:99px;text-transform:none;letter-spacing:normal}.chip:hover{border-color:var(--accent)}
.continue{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;align-items:center;margin:22px 0 18px;padding:16px 20px;border-radius:14px;text-decoration:none;color:#fff;background:var(--accent)}
.continue .ck{grid-row:span 2;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:6px 12px;border-radius:99px;background:rgba(255,255,255,.2)}
.continue b{font-size:1.15rem}.continue .cstep{font-size:14px;opacity:.9}.continue .cstep:empty{display:none}.continue:hover{filter:brightness(1.06)}
@media(prefers-color-scheme:dark){.continue{color:#1a1006}.continue .ck{background:rgba(0,0,0,.15)}}
.pathway{margin:30px 0 8px}.pathway h2{margin:0;font-size:1.4rem}.pathway h2 a{color:inherit;text-decoration:none}.pathway h2 a:hover{color:var(--accent)}.pathway h2 a::after{content:' ›';color:var(--muted)}.pabout{max-width:680px}.home-about h2,.approach h2{font-size:1.2rem;margin:28px 0 8px}.home-about p,.approach p,.approach li{line-height:1.6}.home-subjects{font-size:1.2rem;margin:34px 0 12px}.home-about a,.approach a{color:var(--accent)}.pnote{background:var(--card);border:1px dashed var(--line);border-radius:12px;padding:12px 16px;color:var(--muted)}.psum{margin:2px 0 10px;color:var(--muted)}
.pstage h3{margin:14px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.pcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pcard{display:block;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;text-decoration:none;color:inherit}.pcard:hover{border-color:var(--accent)}
.pcard b{display:block;font-size:1.05rem}.pafter{display:block;font-size:12.5px;color:var(--muted);margin-top:6px}.pcard span{display:block;color:var(--muted);font-size:14px;margin-top:2px}
.pcard.soon{background:transparent;border-style:dashed}.pcard.soon b{color:var(--muted)}.pcard em{display:inline-block;margin-top:8px;font-style:normal;font-size:12px;font-weight:600;color:var(--muted);border:1px solid var(--line);border-radius:99px;padding:1px 9px}
.pcard .cprog{display:block;font-style:normal;font-weight:400;font-size:13px;color:var(--muted);margin-top:8px;border:0;padding:0;border-radius:0}.pcard .cbar{display:block;height:6px;border-radius:99px;background:var(--line);overflow:hidden;margin-top:4px}.pcard .cbar i{display:block;height:100%;background:var(--run)}
.ptools{margin:34px 0 0;color:var(--muted);font-size:14px}
.course{display:grid;gap:22px}.unit .uhead{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:0 12px;margin:0 2px 8px}
.unit .uhead h2{margin:0;font-size:1.05rem}.unit .uhead p{grid-column:1/-1;margin:2px 0 0;color:var(--muted);font-size:14px}.ustat{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.urows{border:1px solid var(--line);border-radius:14px;background:var(--card);overflow:hidden}
.crow{border-top:1px solid var(--line)}.crow:first-child{border-top:0}
.crow summary{display:grid;grid-template-columns:30px 1fr auto auto;gap:12px;align-items:center;padding:11px 16px;cursor:pointer;list-style:none}.crow summary::-webkit-details-marker{display:none}
.crow summary:hover{background:color-mix(in srgb,var(--accent) 4%,transparent)}.crow summary:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.crow summary::after{content:'▸';color:var(--muted);font-size:12px;transition:transform .15s}.crow[open] summary::after{transform:rotate(90deg)}
.crow summary .cstat{grid-column:3}.crow summary::after{grid-column:4}
.cnum{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;font-weight:700;font-size:14px;border:2px solid var(--line);color:var(--muted)}
.crow.started .cnum{border-color:var(--accent);color:var(--accent)}.crow.done .cnum{background:var(--run);border-color:var(--run);color:#fff;font-size:0}.crow.done .cnum::after{content:'✓';font-size:15px}
.crow.next>summary{background:color-mix(in srgb,var(--accent) 7%,transparent)}
.ctitle{font-weight:650;color:var(--ink);min-width:0}.opt{font-style:normal;font-weight:600;font-size:11.5px;color:var(--muted);border:1px solid var(--line);border-radius:99px;padding:1px 8px;margin-left:6px;vertical-align:2px}
.crow summary .segs{grid-column:2;grid-row:2;display:flex;gap:3px;max-width:340px;margin-top:-4px}.seg{flex:1;height:6px;border-radius:3px;background:color-mix(in srgb,var(--c) 16%,var(--line))}.seg.on{background:var(--c)}
.cstat{font-size:13px;color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums}.crow.done .cstat{color:var(--run);font-weight:600}
.cbody{padding:2px 16px 14px 58px}.csum{margin:0 0 8px;color:var(--muted);font-size:15px}
.csteps{list-style:none;margin:0 0 12px;padding:0;display:grid;gap:2px}.csteps a{display:flex;align-items:center;gap:9px;font-size:14px;color:var(--ink);text-decoration:none;padding:3px 0}.csteps a:hover{text-decoration:underline}
.sdot{flex:none;width:12px;height:12px;border-radius:50%;border:2px solid var(--c)}.sdot.on{background:var(--c)}
.cgo{display:inline-block;font-size:14px;font-weight:600;text-decoration:none;color:#fff;background:var(--accent);padding:6px 14px;border-radius:8px}@media(prefers-color-scheme:dark){.cgo{color:#1a1006}}
.badge{display:inline-block;margin-top:10px;font-size:14px;font-weight:700;color:#7a4b00;background:#ffe9a8;border-radius:99px;padding:4px 12px}.badge[hidden]{display:none}
.cfoot{margin:14px 2px;color:var(--muted);font-size:14px}.cfoot b{color:var(--ink);font-weight:600}
@media(max-width:560px){.crow summary{grid-template-columns:30px 1fr auto;padding:10px 12px}.crow summary::after{display:none}.cbody{padding:2px 12px 12px 54px}.crow summary .segs{max-width:none}}
ul.lessons a:hover{border-color:var(--accent)}ul.lessons .cprog{display:block;font-style:normal;font-size:13px;color:var(--muted);margin-top:8px}ul.lessons .cbar{display:block;height:6px;max-width:260px;border-radius:99px;background:var(--line);overflow:hidden;margin-top:4px}ul.lessons .cbar i{display:block;height:100%;background:var(--run)}ul.lessons b{display:block;font-size:1.15rem}ul.lessons span{color:var(--muted);font-size:15px}
.compare{margin:14px 0;padding:12px 16px;border-left:4px solid var(--predict);background:color-mix(in srgb,var(--predict) 8%,transparent);border-radius:0 8px 8px 0}.compare p{margin:2px 0}
.check{margin:20px 0 4px;padding:14px 16px;border:1px dashed var(--c);border-radius:10px;background:color-mix(in srgb,var(--c) 6%,transparent)}
.check legend,.check .check-q{font-weight:600;margin:0 0 8px;padding:0}.check fieldset{border:0;margin:0;padding:0}
.check label{display:flex;gap:10px;align-items:flex-start;margin:6px 0;cursor:pointer}.check input{margin-top:.35em;accent-color:var(--c)}
.check button{font:inherit;font-size:14px;margin-top:6px;padding:5px 14px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer}
.check .msg{margin:8px 0 0;font-size:14px;color:var(--muted)}.check .msg.ok{color:var(--run);font-weight:600}.check .msg.no{color:var(--make)}
.check.done{border-style:solid}
.ref-group{margin:28px 0 8px;font-size:1.15rem}.ref-item{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.4fr);gap:6px 18px;align-items:start;padding:10px 0;border-top:1px solid var(--line)}
.ref-item .code{margin:0}.ref-item .ref-id{font-size:12px;margin-top:2px}
.ref-ex{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:10px 0 4px}.ref-pic{margin:8px 0 0}.ref-pic img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:6px;background:#fff;display:block}.ref-pic figcaption{font-size:12px;color:var(--muted);margin-top:3px}.ref-print{margin:14px 0 0}.ref-item p{margin:0;color:var(--muted);font-size:15px}.ref-item b{display:block;color:var(--ink);font-size:15px;margin-bottom:2px}
.ref-search{width:100%;box-sizing:border-box;margin:18px 0 0;padding:10px 14px;font:inherit;font-size:16px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink)}.ref-search:focus{outline:2px solid var(--accent);outline-offset:1px}.ref-item[hidden],.ref-section[hidden]{display:none}
@media(max-width:640px){.ref-item{grid-template-columns:1fr}}
@media print{.ref-search{display:none}}
@media print{body{background:#fff;color:#000}.ref-item{break-inside:avoid}}
footer{margin-top:50px;color:var(--muted);font-size:14px}
`;


/**
 * The site navbar, the same on every page: Learning Waypoints (the main site), Tutorials (this site's home),
 * then one menu per subject (Code ▾: its pathways), and for the current course its Playground, Reference and
 * My progress (the course page). It is sticky; NAV_JS keeps --nav at its height so the lesson course bar and step
 * pills stick below it and anchors land under it (it wraps to more rows on narrow screens). NAV_JS also adds the
 * menus and "Back to <lesson> › <step>": lesson pages remember the open step per tab (sessionStorage), other
 * pages offer the way back.
 * nav: { root, home, subjects: [{ title, href, on, items: [{ title, href, on }] }], current: { href, playground, reference } | null, here }
 * here: 'lesson' | 'course' | 'playground' | 'reference' | 'home'
 */
export const MAIN_SITE = 'https://learningwaypoints.com/';
export function siteNav({ root = '', subjects = [], current = null, here = 'home', homeOn = false }) {
  const link = (href, text, on, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(root + href)}"${on ? ' aria-current="page"' : ''}>${esc(text)}</a>`;
  const menus = subjects.map((sub, i) => `<div class="sn-dd${sub.on ? ' on' : ''}">${link(sub.href, sub.title, sub.on && !sub.items.some((x) => x.on), 'sn-top')}` +
    (sub.items.length ? `<button type="button" class="sn-caret" aria-expanded="false" aria-controls="sn-sub-${i}" aria-label="${esc(sub.title)} pathways">▾</button><div class="sn-sub" id="sn-sub-${i}">${sub.items.map((x) => link(x.href, x.title, x.on)).join('')}</div>` : '') + `</div>`).join('');
  const tools = !current ? '' :
    (current.playground ? link(`${current.href}playground/`, 'Playground', here === 'playground') : '') +
    (current.reference ? link(`${current.href}reference/`, 'Reference', here === 'reference') : '') +
    link(current.href, 'My progress', here === 'course');
  return `<nav class="sitenav" data-here="${esc(here)}" aria-label="Site"><div class="sn-in">` +
    `<a class="sn-brand" href="${MAIN_SITE}" title="Learning Waypoints: the main site">Learning Waypoints <span aria-hidden="true">↗</span></a>` +
    `<button type="button" class="sn-menu" aria-expanded="false" aria-controls="sn-main">Menu ▾</button>` +
    `<div class="sn-main" id="sn-main">${link('', 'Tutorials', homeOn)}${menus}</div>` +
    `<span class="sn-grow"></span><a class="sn-back" href="#" hidden></a><div class="sn-tools">${tools}</div></div></nav>`;
}
export const NAV_CSS = `.sitenav{background:var(--card);border-bottom:1px solid var(--line);font-size:14px;position:sticky;top:0;z-index:20}
html{scroll-padding-top:var(--nav,0px)}
.sn-in{max-width:1080px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:4px;min-height:48px;flex-wrap:wrap}
.sitenav a{color:var(--ink);text-decoration:none;font-weight:600;padding:6px 10px;border-radius:8px;white-space:nowrap}
.sitenav a:hover{background:var(--bg)}.sitenav a[aria-current]{color:var(--accent);box-shadow:inset 0 -2px 0 var(--accent);border-radius:0}
.sitenav .sn-brand{font-weight:800;letter-spacing:-.01em;margin-right:4px;color:var(--muted)}.sn-brand span{font-weight:400}
.sn-main,.sn-tools{display:flex;gap:2px;align-items:center}.sn-grow{flex:1}
.sn-dd{position:relative;display:flex;align-items:center}.sn-dd.on>.sn-top{color:var(--accent)}
.sn-caret{font:inherit;background:none;border:0;color:var(--muted);cursor:pointer;padding:6px 4px;margin-left:-8px;border-radius:6px}.sn-caret:hover{color:var(--ink)}
.sn-sub{display:none;position:absolute;top:100%;left:0;min-width:180px;background:var(--card);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.08);padding:6px;flex-direction:column}
.sn-sub a{display:block}.sn-sub a[aria-current]{box-shadow:inset 3px 0 0 var(--accent);border-radius:4px}
.sn-dd:hover .sn-sub,.sn-dd:focus-within .sn-sub,.sn-dd.open .sn-sub{display:flex}
.sn-menu{display:none;font:inherit;font-weight:600;color:var(--ink);background:none;border:1px solid var(--line);border-radius:8px;padding:4px 10px;cursor:pointer}
.sitenav .sn-back{color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);border-radius:99px;margin-right:6px;max-width:42vw;overflow:hidden;text-overflow:ellipsis}
.sitenav .sn-back[hidden]{display:none}
@media(max-width:700px){.sn-menu{display:inline-block;margin-left:auto}.sn-main{display:none;order:9;flex-basis:100%;flex-direction:column;align-items:stretch;padding:4px 0 8px}.sitenav.open .sn-main{display:flex;max-height:calc(100vh - 120px);overflow-y:auto}
.sn-dd{flex-direction:column;align-items:stretch}.sn-caret{display:none}.sn-sub{display:flex;position:static;border:0;box-shadow:none;padding:0 0 0 16px;min-width:0;background:none}
.sitenav a[aria-current]{box-shadow:none}.sn-tools{order:8;flex-basis:100%;justify-content:flex-start;padding-bottom:6px;overflow-x:auto}.sitenav .sn-back{order:7;flex-basis:100%;max-width:none;margin:2px 0 6px;text-align:center}}
@media print{.sitenav{display:none}}`;
export const NAV_JS = `(function(){var n=document.querySelector('.sitenav');if(!n)return;var K='wp-from',here=n.dataset.here;
// Sticky navbar: publish its height as --nav (course bar, step pills and anchors sit below it).
var nh=function(){document.documentElement.style.setProperty('--nav',n.offsetHeight+'px')};nh();if(window.ResizeObserver)new ResizeObserver(nh).observe(n);else window.addEventListener('resize',nh);
var mb=n.querySelector('.sn-menu');if(mb)mb.addEventListener('click',function(){var o=n.classList.toggle('open');mb.setAttribute('aria-expanded',String(o))});
[].forEach.call(n.querySelectorAll('.sn-caret'),function(c){var d=c.parentNode;c.addEventListener('click',function(){var o=d.classList.toggle('open');c.setAttribute('aria-expanded',String(o))})});
document.addEventListener('click',function(e){[].forEach.call(n.querySelectorAll('.sn-dd.open'),function(d){if(!d.contains(e.target)){d.classList.remove('open');d.querySelector('.sn-caret').setAttribute('aria-expanded','false')}})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')[].forEach.call(n.querySelectorAll('.sn-dd.open'),function(d){d.classList.remove('open')})});
if(here==='lesson'){var h=document.querySelector('h1'),worked=null;
// The step to come back to is the last one the student worked in (clicked, typed, used its playground), not the
// one in view (the student may scroll elsewhere before using the navbar). Before any work, the step in view.
function pill(id){var a=id?document.querySelector('nav.steps a[href="#'+id+'"]'):(document.querySelector('nav.steps a.here')||document.querySelector('nav.steps a')),t='';if(a)[].forEach.call(a.childNodes,function(c){if(c.nodeType===3)t+=c.textContent});return {a:a,t:t.trim()}}
var save=function(){var s=pill(worked);try{sessionStorage.setItem(K,JSON.stringify({href:location.pathname+(s.a?s.a.getAttribute('href'):''),title:h?h.textContent:document.title,step:s.t}))}catch(e){}};
function mark(el){var sec=el&&el.closest&&el.closest('section.step');if(sec&&sec.id){worked=sec.id;save()}}
['click','input','focusin'].forEach(function(ev){document.addEventListener(ev,function(e){if(!(e.target.closest&&e.target.closest('.sitenav,.coursebar,nav.steps')))mark(e.target)},true)});
window.addEventListener('blur',function(){setTimeout(function(){var f=document.activeElement;if(f&&f.tagName==='IFRAME')mark(f)},0)});
try{var prev=JSON.parse(sessionStorage.getItem(K));if(prev&&prev.href&&prev.href.split('#')[0]===location.pathname&&prev.href.indexOf('#')>0)worked=prev.href.split('#')[1]}catch(e){}
save();window.addEventListener('pagehide',save);return}
var b=n.querySelector('.sn-back'),f=null;try{f=JSON.parse(sessionStorage.getItem(K))}catch(e){}
if(f&&f.href){b.href=f.href;b.textContent='\\u2190 Back to '+f.title+(f.step?' \\u203a '+f.step:'');b.title=b.textContent;b.hidden=false;return}
if(here==='playground'||here==='reference'){try{var l=JSON.parse(localStorage.getItem('wp-last-lesson'));if(l&&l.href){b.href=l.href;b.textContent='Continue: '+(l.title||'your lesson');b.hidden=false}}catch(e){}}})();`;

export const JS = `var evalRules=${evalRules.toString()};
${MATH_JS}
(function(){var t=document.querySelector('.cb-toggle'),m=document.getElementById('cb-menu');if(!t||!m)return;
t.addEventListener('click',function(){var o=m.hidden;m.hidden=!o;t.setAttribute('aria-expanded',String(o))});
document.addEventListener('click',function(e){if(!m.hidden&&!e.target.closest('.cb-mid')){m.hidden=true;t.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden){m.hidden=true;t.setAttribute('aria-expanded','false');t.focus()}});
var d=(function(){try{return JSON.parse(localStorage.getItem('wp-progress'))||{}}catch(e){return {}}})().done||{};
[].forEach.call(m.querySelectorAll('li a'),function(a){var ks=(a.dataset.checks||'').split('|').filter(Boolean);
if(ks.length&&ks.every(function(k){return d[k]}))a.querySelector('.tick').classList.add('on')});
var h=document.querySelector('h1');try{localStorage.setItem('wp-last-lesson',JSON.stringify({href:location.pathname,title:h?h.textContent:document.title}))}catch(e){}})();
(function(){var links=[].slice.call(document.querySelectorAll('nav.steps a'));if(!links.length||!window.IntersectionObserver)return;
var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
var io=new IntersectionObserver(function(){var cur=0;secs.forEach(function(el,i){if(el&&el.getBoundingClientRect().top<window.innerHeight*0.4)cur=i});
links.forEach(function(a,i){a.classList.toggle('here',i===cur);if(i===cur)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')})},{threshold:[0,0.1,0.5,1]});
secs.forEach(function(el){if(el)io.observe(el)});window.addEventListener('scroll',function(){io.takeRecords()},{passive:true})})();
document.querySelectorAll('.copy').forEach(function(b){b.addEventListener('click',function(){
var t=b.closest('.code').querySelector('code').innerText;navigator.clipboard&&navigator.clipboard.writeText(t).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1200)})})});
(function(){
var KEY='wp-progress';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
var ov=new URLSearchParams(location.search).get('unlock');
if(ov){var s0=load();s0.all=ov==='all';save(s0)}
function sync(wrap){var s=load(),d=s.done||{},keys=(wrap.dataset.keys||'').split('|').filter(Boolean),n=0;keys.forEach(function(k){if(d[k])n++});
[].forEach.call(wrap.querySelectorAll('.tp'),function(p){p.classList.toggle('done',!!d[p.dataset.key])});
var cnt=document.querySelector('nav.steps a[href="#'+wrap.dataset.step+'"] .cnt');if(cnt)cnt.textContent=keys.length?n+'/'+keys.length:'';
var tm=wrap.querySelector('.tmsg');
if(keys.length&&n===keys.length){var ids=(wrap.dataset.unlocks||'').split(',').filter(Boolean);
if(!d[wrap.dataset.stepkey]){s.done=s.done||{};s.done[wrap.dataset.stepkey]=true;s.unlocked=s.unlocked||{};ids.forEach(function(id){s.unlocked[wrap.dataset.kind+':'+id]=true});save(s)}
tm.textContent='All tasks done.'+(ids.length?' Unlocked: '+(wrap.dataset.names||'').split('|').join(', ')+'.':'')}else{tm.textContent=''}}
document.querySelectorAll('.check').forEach(function(box){
var key=box.dataset.key,kind=box.dataset.kind,ids=(box.dataset.unlocks||'').split(',').filter(Boolean),names=(box.dataset.names||'').split('|');
var msg=box.querySelector('.msg');var wrap=box.closest('.tasks'),ty=box.dataset.type||'';
function pass(){
var s=load();s.done=s.done||{};s.unlocked=s.unlocked||{};s.done[key]=true;
ids.forEach(function(id){s.unlocked[kind+':'+id]=true});save(s);show(true);if(wrap)sync(wrap)}
function show(fresh){
box.classList.add('done');
if(ids.length){msg.className='msg ok';msg.textContent=(fresh?'Unlocked: ':'Unlocked: ')+names.join(', ')+'. Find '+(names.length>1?'them':'it')+' under Reference in the playground.'}
else{msg.className='msg ok';msg.textContent='Got it.'}}
if((load().done||{})[key])show(false);
if(box.dataset.type==='code'){var rules=JSON.parse(box.dataset.rules),ul=box.querySelector('.rules');
// The last report from each playground, so a task's check can catch up when its pill opens (window.wpLast, below).
if(!window.wpLast){window.wpLast={};window.addEventListener('message',function(e){var m=e.data;if(e.origin===location.origin&&m&&m.wp==='run'&&m.id)window.wpLast[m.id]=m})}
function paint(res){ul.replaceChildren();res.forEach(function(r){var li=document.createElement('li');li.textContent=r.label;if(r.ok)li.className='ok';ul.appendChild(li)})}
var done0=(load().done||{})[key];paint(evalRules(rules,'',kind).map(function(r){return {label:r.label,ok:!!done0}}));
window.addEventListener('message',function(e){var m=e.data;if(e.origin!==location.origin||!m||m.wp!=='run'||m.id!==(box.dataset.play||key))return;var pn=box.closest('.tpanel'),stp=box.closest('.step');
// Only the open task listens. MakeCode in full screen is the exception: the bar shows every task of the step and pills cannot be switched.
if(pn&&!pn.classList.contains('active')&&!((m.kind==='microbit'||m.kind==='arcade')&&stp&&stp.querySelector('.try.full')))return;
var res=evalRules(rules,m.code||'',kind);paint(res);
if(m.quiet&&!(load().done||{})[key]){}
else if(res.every(function(r){return r.ok})&&(m.status==='done'||m.status==='stopped')){pass()}
else if(m.kind==='html'){if(!m.quiet){msg.className='msg';msg.textContent='Not quite yet. Keep going: the list shows what your page still needs.'}}
else if(m.kind==='microbit'||m.kind==='arcade'){if(!m.quiet){msg.className='msg';msg.textContent='Not quite yet. Keep building: this ticks by itself when your blocks do what is asked.'}}
else{msg.className='msg';msg.textContent=m.status==='done'?'Not quite yet. Change your code, then run it again.':'Fix the error, then run it again.'}})}
var cb=box.querySelector('input[type=checkbox]');
if(cb){if((load().done||{})[key])cb.checked=true;cb.addEventListener('change',function(){if(cb.checked)pass()})}
var go=ty==='question'?box.querySelector('button'):null;
if(go){go.addEventListener('click',function(){
var pick=box.querySelector('input[type=radio]:checked');
if(!pick){msg.className='msg no';msg.textContent='Choose an answer first.';return}
if(Number(pick.value)===Number(box.dataset.answer)){pass();if(box.dataset.explain)msg.textContent=box.dataset.explain+' '+msg.textContent}
else{msg.className='msg no';var fbk=box.dataset.feedback?JSON.parse(box.dataset.feedback)[Number(pick.value)]:'';msg.textContent=fbk?'Not quite. '+fbk:(box.dataset.subj==='maths'||box.dataset.subj==='science'||kind==='science')?'Not quite. Read it again and try another answer.':'Not quite. Look at the code again and try another answer.'}})}
function win(){pass();if(box.dataset.explain)msg.textContent=box.dataset.explain+' '+msg.textContent}
function bad(t){msg.className='msg no';msg.textContent=t}
var btn=box.querySelector('button');
if(ty==='number'&&btn){btn.addEventListener('click',function(){var v=parseFloat(box.querySelector('input').value);if(isNaN(v))return bad('Type a number first.');
if(Math.abs(v-Number(box.dataset.answer))<=Number(box.dataset.tol||0))win();else bad(box.dataset.subj==='maths'?'Not quite. Check your working and try another number.':'Not quite. Look at the code again and try another number.')})}
if(ty==='flag'&&btn){btn.addEventListener('click',function(){var t=box.querySelector('input').value.trim().toLowerCase();if(!t)return bad('Type the flag first.');
if(!(window.crypto&&crypto.subtle))return bad('This needs a secure page (https).');
crypto.subtle.digest('SHA-256',new TextEncoder().encode('wp-flag:'+t)).then(function(b){var h=[].map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2)}).join('');if(h===box.dataset.hash)win();else bad('Not the flag. Check it is exactly what the puzzle gives, including the WP{ } part.')})})}
if(ty==='bug'){var good=JSON.parse(box.dataset.answers).map(String),found={};[].forEach.call(box.querySelectorAll('.buglines button'),function(b){b.addEventListener('click',function(){
var n=String(b.dataset.line);if(good.indexOf(n)>=0){b.className='yes';found[n]=1;var left=good.filter(function(g){return !found[g]}).length;if(!left)win();else{msg.className='msg';msg.textContent='Yes. '+left+' more to find.'}}else{b.className='no';bad(box.dataset.subj==='maths'?'Not that line. Read the working again, one line at a time.':'Not that line. Read the code again, one line at a time.')}})})}
if(ty==='sort'&&btn){btn.addEventListener('click',function(){var want=JSON.parse(box.dataset.answers),all=true;
[].forEach.call(box.querySelectorAll('.srow'),function(r,i){var sel=r.querySelector('select'),ok=sel.value===want[i];sel.className=sel.value?(ok?'ok':'no'):'';if(!ok)all=false;var w=r.querySelector('.swhy');if(w)w.hidden=!ok});
if(all)win();else bad('Some are not in the right group yet. Check the ones outlined in red.')})}
if(ty==='match'&&btn){btn.addEventListener('click',function(){var want=JSON.parse(box.dataset.answers),all=true;
[].forEach.call(box.querySelectorAll('select'),function(sel,i){var ok=sel.value===want[i];sel.className=sel.value?(ok?'ok':'no'):'';if(!ok)all=false});
if(all)win();else bad('Some do not match yet. Check the ones outlined in red.')})}
if(ty==='trace'&&btn){btn.addEventListener('click',function(){var all=true;
[].forEach.call(box.querySelectorAll('input.tcell'),function(inp){var nz=function(t){return t.trim().replace(/÷/g,'/').replace(/×/g,'*').replace(/[−–]/g,'-').replace(/\\s*([+*\\/-])\\s*/g,'$1')};var a=inp.dataset.answer,v=inp.value.trim(),ok=v!==''&&(v===a||nz(v)===nz(a)||(!isNaN(Number(v))&&!isNaN(Number(a))&&Number(v)===Number(a)));inp.className='tcell '+(ok?'ok':'no');if(!ok)all=false});
if(all)win();else bad(box.dataset.subj==='maths'?'Some cells are not right yet. Work through it again, one step at a time.':'Some cells are not right yet. Trace the code again, one step at a time.')})}
if(ty==='predict'&&btn){var PK='wp-predict';
function pload(){try{return JSON.parse(localStorage.getItem(PK))||{}}catch(e){return {}}}
function plock(v){var p=pload();p[key]=v;try{localStorage.setItem(PK,JSON.stringify(p))}catch(e){}}
function freeze(v){[].forEach.call(box.querySelectorAll('input'),function(i){i.disabled=true;if(i.type==='radio')i.checked=(i.value===v);else i.value=v});btn.hidden=true;msg.className='msg ok';msg.textContent=kind==='science'?'Locked in. Now try it on the board and compare.':'Locked in. Now run it and compare.'}
var saved=pload()[key];if(saved!==undefined&&saved!==null)freeze(saved);
btn.addEventListener('click',function(){var r=box.querySelector('input[type=radio]:checked'),i=box.querySelector('input.pin'),v=r?r.value:(i?i.value.trim():'');
if(!v)return bad('Make a prediction first. You cannot change it after you lock it in.');plock(v);freeze(v);pass();freeze(v);try{document.dispatchEvent(new CustomEvent('wp-predict',{detail:key}))}catch(e){}})}
if(ty==='parsons'){parsons(box,win,bad)}
if(ty==='answer'&&btn){var inp=box.querySelector('input'),fb=JSON.parse(box.dataset.feedback||'[]');
function tryIt(){var v=inp.value.trim();if(!v)return bad('Type your answer first.');
try{if(box.dataset.equation){var vals=JSON.parse(box.dataset.equation),sd=WPM.sides(v);if(!sd)return bad('An equation needs one = sign, with something on each side.');
var need=Object.keys(vals),used=WPM.vars(sd[0]).concat(WPM.vars(sd[1]));if(!need.some(function(n){return used.indexOf(n)>=0}))return bad('Use '+need.join(' and ')+' in your equation.');
if(WPM.satisfies(v,vals))return win();var shown=need.map(function(n){return n+' = '+vals[n]}).join(', ');return bad('Not quite: when '+shown+', the two sides are not equal. Check each side.')}
var a=WPM.splitAnswer(v).value;if(WPM.equivalent(a,box.dataset.answer))return win();
for(var i=0;i<fb.length;i++){try{if(WPM.equivalent(a,String(fb[i][0])))return bad(fb[i][1])}catch(e){}}
bad('Not quite. Check your working and try again.')}catch(e){bad(e.message)}}
btn.addEventListener('click',tryIt);inp.addEventListener('keydown',function(e){if(e.key==='Enter')tryIt()})}
if(ty==='board'){var want=JSON.parse(box.dataset.expect||'{}');
window.addEventListener('message',function(e){var m=e.data;if(e.origin!==location.origin||!m||m.wp!=='run'||(m.kind==='maths'?'board':m.kind)!==(box.dataset.kind==='maths'?'board':box.dataset.kind)||m.id!==box.dataset.play||!m.moved)return;var pn=box.closest('.tpanel');if(pn&&!pn.classList.contains('active'))return;
var ok=Object.keys(want).every(function(k){var a=m.state&&m.state[k],b=want[k];return typeof b==='number'?Math.abs(Number(a)-b)<1e-9:a===b});if(ok&&box.dataset.when){try{ok=WPM.holds(box.dataset.when,m.state&&m.state.scope)}catch(er){ok=false}}
if(ok){if(!box.classList.contains('done'))win()}else if(!box.classList.contains('done')){msg.className='msg';msg.textContent='Keep going.'}})}
});
document.querySelectorAll('.compare').forEach(function(c){var pk=c.dataset.predict;
function mine(){try{return (JSON.parse(localStorage.getItem('wp-predict'))||{})[pk]}catch(e){return undefined}}
var last=null;
document.addEventListener('wp-predict',function(e){if(e.detail===pk&&last)show(last)});
window.addEventListener('message',function(e){var m=e.data;if(e.origin!==location.origin||!m||m.wp!=='run'||m.id!==c.dataset.play||m.status!=='done'&&m.status!=='stopped')return;last=m;show(m)});
function show(m){
var v=mine();c.replaceChildren();
function line(label,text){var p=document.createElement('p');var b=document.createElement('b');b.textContent=label+' ';p.appendChild(b);p.appendChild(document.createTextNode(text));c.appendChild(p)}
if(v===undefined||v===null){line('No prediction locked in.','Go back to the Predict step if you want to compare next time.')}
else{line('You predicted:',v);var out=(m.output||'').trim(),a=c.dataset.actual||'';
if(a)line('It actually:',a);else if(out)line('It printed:',out);else line('Now compare:','look at the '+(m.kind==='html'?'page':m.kind==='microbit'?'micro:bit':m.kind==='arcade'?'game':'drawing')+'. Was your prediction right? What did you notice?')}
c.hidden=false}});
// Full screen / inline for each playground: a class, not the Fullscreen API, so it works on iPads and the
// playground keeps its state. Esc (on the page, or in the playground when its drawer is closed) comes back.
function mkOpen(t){var f=t.querySelector('iframe[data-src]'),l=t.querySelector('.mkload');if(!f||f.src)return;f.src=f.dataset.src;f.hidden=false;if(l)l.remove()}
document.querySelectorAll('.mkopen').forEach(function(b){b.addEventListener('click',function(){var t=b.closest('.try');mkOpen(t);if(t.dataset.wide&&t._full)t._full(true)})});
// In full screen the step's instructions and checks are hidden behind the playground, so a task drawer repeats them:
// the step's (or the open task's) text, hints and code pictures, then the code checks with their ticks. Hide task folds the text away.
document.querySelectorAll('.try').forEach(function(t){var s=t.closest('.step'),h=t.querySelector('.try-head');if(!s||!h)return;
var w=t.closest('.tasks'),cs=[].slice.call(s.querySelectorAll('.check[data-type="code"]'));
var box=document.createElement('div');box.className='try-task';var body=document.createElement('div');body.className='tt-body';
var bar=document.createElement('div');bar.className='try-checks';bar.setAttribute('aria-live','polite');box.appendChild(body);if(cs.length)box.appendChild(bar);
function strip(n){if(n.removeAttribute)n.removeAttribute('id');if(n.querySelectorAll)[].forEach.call(n.querySelectorAll('[id]'),function(x){x.removeAttribute('id')});return n}
function fill(){var title=document.createElement('p');title.className='tt-title';var src;
if(w){var tp=w.querySelector('.tp.active');title.textContent=tp?tp.textContent:'';src=[w.querySelector(':scope > .tpanel.active[role="tabpanel"]')]}
else{var h2=s.querySelector('h2');title.textContent=h2?h2.textContent:'';src=[].filter.call(s.children,function(ch){return !(ch.matches('.chip,h2,.try,.check,.compare,.tasks,video')||ch.querySelector('video,iframe'))})}
body.replaceChildren.apply(body,[title].concat(src.filter(Boolean).map(function(n){return strip(n.cloneNode(true))})))}
function upd(){bar.replaceChildren.apply(bar,cs.map(function(c){var d=c.classList.contains('done'),e=document.createElement('span'),q=c.querySelector('.check-q');e.className=d?'ok':'';e.textContent=(d?'✓ ':'○ ')+(q?q.textContent:'');return e}))}
fill();upd();cs.forEach(function(c){new MutationObserver(upd).observe(c,{attributes:true,attributeFilter:['class']})});
if(w)[].forEach.call(w.querySelectorAll(':scope > .tpanel[role="tabpanel"]'),function(p){new MutationObserver(fill).observe(p,{attributes:true,attributeFilter:['class']})});
var tg=document.createElement('button');tg.type='button';tg.className='tt-toggle';tg.setAttribute('aria-expanded','true');tg.textContent='Hide task';
tg.addEventListener('click',function(){var off=box.classList.toggle('closed');tg.textContent=off?'Show task':'Hide task';tg.setAttribute('aria-expanded',String(!off))});
h.insertBefore(tg,h.querySelector('.try-full'));h.after(box)});
document.querySelectorAll('.try').forEach(function(t){var b=t.querySelector('.try-full');if(!b)return;
t._full=function(on){t.classList.toggle('full',on);document.body.classList.toggle('try-open',!!document.querySelector('.try.full'));b.setAttribute('aria-pressed',String(on));b.textContent=on?'Exit full screen':'Full screen';if(!on)b.focus()};
b.addEventListener('click',function(){mkOpen(t);t._full(!t.classList.contains('full'))})});
document.addEventListener('keydown',function(e){var f=document.querySelector('.try.full');if(e.key==='Escape'&&f)f._full(false)});
(function(){var id=new URLSearchParams(location.search).get('full');if(!id)return;var sec=document.getElementById(id);var t=sec&&sec.querySelector('.try');if(!t||!t._full)return;
var ifr=t.querySelector('iframe');if(ifr)ifr.loading='eager';mkOpen(t);setTimeout(function(){t._full(true)},50)})();
window.addEventListener('message',function(e){var m=e.data;if(e.origin!==location.origin||!m||m.wp!=='esc')return;
document.querySelectorAll('.try.full').forEach(function(f){var i=f.querySelector('iframe');if(i&&i.contentWindow===e.source)f._full(false)})});
document.querySelectorAll('.worked').forEach(function(w){var lis=w.querySelectorAll('li'),nx=w.querySelector('.wnext'),al=w.querySelector('.wall');if(!nx)return;
function upd(){var left=[].filter.call(lis,function(l){return l.hidden}).length;nx.hidden=al.hidden=!left;nx.textContent=left?'Next step ('+left+' left)':''}
nx.addEventListener('click',function(){var h=[].find.call(lis,function(l){return l.hidden});if(h){h.hidden=false;h.classList.add('new')}upd()});
al.addEventListener('click',function(){[].forEach.call(lis,function(l){l.hidden=false});upd()});upd()});
function parsons(box,win,bad){var lines=JSON.parse(box.dataset.lines),extra=JSON.parse(box.dataset.extra||'[]');
var pool=box.querySelector('.ppool'),prog=box.querySelector('.pprog'),inProg=[];
var all=lines.concat(extra).map(function(t,i){return {t:t,i:i}});
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
var order=shuffle(all),tries=0;
while(tries++<8&&JSON.stringify(order.slice(0,lines.length).map(function(o){return o.t}))===JSON.stringify(lines))order=shuffle(all);
function code(t){var c=document.createElement('code');c.textContent=t;return c}
function draw(){pool.replaceChildren();prog.replaceChildren();
order.filter(function(o){return inProg.indexOf(o)<0}).forEach(function(o){var li=document.createElement('li'),b=document.createElement('button');b.type='button';b.className='piece';b.title='Add to your program';b.appendChild(code(o.t));b.addEventListener('click',function(){inProg.push(o);draw()});li.appendChild(b);pool.appendChild(li)});
inProg.forEach(function(o,n){var li=document.createElement('li');li.draggable=true;li.appendChild(code(o.t));
[['\u2191',-1,'Move up'],['\u2193',1,'Move down'],['\u00d7',0,'Remove']].forEach(function(a){var b=document.createElement('button');b.type='button';b.textContent=a[0];b.setAttribute('aria-label',a[2]);
b.addEventListener('click',function(){if(a[1]===0)inProg.splice(n,1);else{var m=n+a[1];if(m<0||m>=inProg.length)return;var t=inProg[n];inProg[n]=inProg[m];inProg[m]=t}draw()});li.appendChild(b)});
li.addEventListener('dragstart',function(e){e.dataTransfer.setData('text/plain',String(n))});li.addEventListener('dragover',function(e){e.preventDefault()});
li.addEventListener('drop',function(e){e.preventDefault();var f=Number(e.dataTransfer.getData('text/plain'));if(isNaN(f)||f===n)return;var t=inProg.splice(f,1)[0];inProg.splice(n,0,t);draw()});
prog.appendChild(li)})}
draw();
box.querySelector('.pcheck').addEventListener('click',function(){if(JSON.stringify(inProg.map(function(o){return o.t}))===JSON.stringify(lines))win();else bad(inProg.length<lines.length?'Keep going: some lines are still in the pieces list, or not needed.':(box.dataset.subj==='maths'?'Not in the right order yet. Read your steps top to bottom: does each line follow from the one above?':'Not in the right order yet. Read your program top to bottom and picture what it does.'))});
box.querySelector('.preset').addEventListener('click',function(){inProg=[];draw()})}
[].forEach.call(document.querySelectorAll('.tasks'),function(w){
[].forEach.call(w.querySelectorAll('.tp'),function(p){p.addEventListener('click',function(){var i=p.dataset.i;
[].forEach.call(w.querySelectorAll('.tp,.tpanel'),function(el){var on=el.dataset.i===i;el.classList.toggle('active',on);if(el.classList.contains('tp'))el.setAttribute('aria-selected',String(on))});
// MakeCode: the newly opened task checks the work already in the editor (the last report), without waiting for an edit.
var oc=w.querySelector('.tpanel.active .check[data-type="code"][data-play]');if(oc&&(oc.dataset.kind==='microbit'||oc.dataset.kind==='arcade')&&window.wpLast&&window.wpLast[oc.dataset.play])window.postMessage(window.wpLast[oc.dataset.play],location.origin);
if(w.dataset.kind==='board'||w.dataset.kind==='maths'||w.dataset.kind==='science'){var rs=w.querySelector('.tpanel.active .resetstart'),f=w.querySelector('iframe');if(rs&&f&&f.contentWindow)f.contentWindow.postMessage({wp:'set-code',code:rs.dataset.code},location.origin)}})});
[].forEach.call(w.querySelectorAll('.resetstart'),function(b){b.addEventListener('click',function(){var f=w.querySelector('iframe');if(f&&f.contentWindow)f.contentWindow.postMessage({wp:'set-code',code:b.dataset.code},location.origin)})});
sync(w)});
})();`;

export const page = (title, body, scripts = '', nav = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>${CSS}${nav ? NAV_CSS : ''}</style></head><body>${nav}<div class="wrap">${body}</div><script>${JS}${nav ? NAV_JS : ''}</script>${scripts}</body></html>`;


// A repeatable shuffle (so the page is the same on every build): used for match options.
const seeded = (seed) => { let h = 7; for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return () => { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; }; };
const shuffled = (arr, seed) => { const r = seeded(seed), a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/**
 * The "got it?" box under a step, or under one of its tasks: a tick (reflect), a question, a number, a code rule,
 * a line to click (bug), pairs (match), a trace table or lines to order (parsons). Passing it unlocks snippets.
 * snippet(ref) reads code for bug and parsons checks.
 */
export function checkHtml(lesson, step, names = {}, snippet = null, task = null, tx = esc) {
  const k = task ? task.config.check : step.config.check;
  if (!k) return '';
  const kind = unlockKind(lesson, step);
  const ids = (task ? task.config.unlocks : step.config.unlocks) || [];
  const label = (id) => names[kind]?.[id] || id.replace(/-/g, ' ');
  const key = `${lesson.slug}/${task ? task.id : step.id}`;
  // Explanations are shown with textContent, so maths in them is shown as plain text: "$2x$" becomes "2x".
  const plain = (t) => (lesson.language === 'maths' ? String(t).replace(/\$([^$]+)\$/g, '$1') : t);
  const explain = plain(k.explain || '');
  const base = `data-key="${esc(key)}" data-play="${esc(`${lesson.slug}/${step.id}`)}" data-kind="${kind}" data-subj="${esc(lesson.language || '')}" data-type="${k.type}" data-unlocks="${esc(ids.join(','))}" data-names="${esc(ids.map(label).join('|'))}" data-explain="${esc(explain)}"`;
  const msg = '<p class="msg" aria-live="polite"></p>';
  if (k.type === 'reflect') {
    return `<div class="check" ${base}><label><input type="checkbox"><span>${tx(k.text)}</span></label>${msg}</div>`;
  }
  if (k.type === 'code') {
    // MakeCode: students build with blocks, so the rule list (code fragments) stays hidden and the task text says what to do.
    const mk = kind === 'microbit' || kind === 'arcade';
    return `<div class="check" ${base} data-rules="${esc(JSON.stringify(k.rules))}"><p class="check-q">${esc(k.text)}</p><ul class="rules" aria-label="What your code needs"${mk ? ' hidden' : ''}></ul><p class="msg" aria-live="polite">${kind === 'html' ? 'This ticks when your page has all of the above.' : mk ? 'This ticks by itself when your blocks do what is asked.' : 'Run your program. This ticks when your code does all of the above.'}</p></div>`;
  }
  if (k.type === 'answer') {
    const data = k.equation ? `data-equation="${esc(JSON.stringify(k.equation))}"` : `data-answer="${esc(String(k.answer))}"`;
    return `<div class="check" ${base} ${data} data-feedback="${esc(JSON.stringify(k.feedback || []))}"><p class="check-q">${tx(k.q)}</p><label class="numrow ansrow"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="${k.equation ? 'for example 2x = 10' : 'Your answer'}"></label><button type="button">Check answer</button>${msg}</div>`;
  }
  if (k.type === 'board') {
    return `<div class="check" ${base} data-expect="${esc(JSON.stringify(k.expect || {}))}"${k.when !== undefined ? ` data-when="${esc(String(k.when))}"` : ''}><p class="check-q">${tx(k.text)}</p><p class="msg" aria-live="polite">Use the board. This ticks when you get there.</p></div>`;
  }
  if (k.type === 'number') {
    return `<div class="check" ${base} data-answer="${k.answer}" data-tol="${k.tolerance || 0}"><p class="check-q">${tx(k.q)}</p><label class="numrow"><input type="number" step="any" aria-label="Your answer"></label><button type="button">Check answer</button>${msg}</div>`;
  }
  if (k.type === 'flag') {
    return `<div class="check" ${base} data-hash="${esc(k.hash)}" data-explain="${esc(k.explain || '')}"><p class="check-q">${tx(k.q)}</p><label class="numrow ansrow"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="The flag" placeholder="WP{...}"></label><button type="button">Submit flag</button>${msg}</div>`;
  }
  if (k.type === 'bug') {
    const files = splitFiles(snippet ? snippet(k.code) : '');
    const multi = files.length > 1 || !!files[0]?.name;
    const list = (f) => `<ol class="buglines">${f.code.replace(/\n$/, '').split('\n').map((l, i) => `<li><button type="button" data-line="${esc(multi ? `${f.name}:${i + 1}` : String(i + 1))}"><code>${esc(l) || ' '}</code></button></li>`).join('')}</ol>`;
    const body = multi ? files.map((f) => `<div class="bugfile"><div class="bugfile-name">${esc(f.name)}</div>${list(f)}</div>`).join('') : list(files[0] || { code: '' });
    return `<div class="check" ${base} data-answers="${esc(JSON.stringify(bugKeys(k.answer)))}" data-need="${bugKeys(k.answer).length}"><p class="check-q">${tx(k.text || 'Click the line that has the bug.')}</p>${body}${msg}</div>`;
  }
  if (k.type === 'match') {
    const rights = shuffled(k.pairs.map((p) => p[1]), key);
    const opts = `<option value="">Choose…</option>` + rights.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join('');
    return `<div class="check" ${base} data-answers="${esc(JSON.stringify(k.pairs.map((p) => p[1])))}"><p class="check-q">${esc(k.q || 'Match each item with what it does.')}</p>` +
      k.pairs.map((p) => `<div class="mrow"><span>${esc(p[0])}</span><select aria-label="${esc(p[0])}">${opts}</select></div>`).join('') + `<button type="button">Check answers</button>${msg}</div>`;
  }
  if (k.type === 'predict') {
    const field = k.options
      ? `<fieldset><legend class="check-q">${tx(k.q)}</legend>${k.options.map((o, i) => `<label><input type="radio" name="p-${esc(key)}" value="${esc(plain(o))}"><span>${tx(o)}</span></label>`).join('')}</fieldset>`
      : `<p class="check-q">${tx(k.q)}</p><label class="numrow"><input class="pin" type="${k.kind === 'number' ? 'number' : 'text'}" ${k.kind === 'number' ? 'step="any"' : ''} aria-label="Your prediction"></label>`;
    return `<div class="check" ${base}>${field}<button type="button">Lock in my prediction</button>${msg}</div>`;
  }
  if (k.type === 'trace') {
    const t = parseTrace(k.table);
    const head = t.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('');
    const rows = t.rows.map((r, ri) => `<tr>${r.map((c, ci) => c.blank ? `<td><input class="tcell" data-answer="${esc(c.v)}" inputmode="decimal" aria-label="Row ${ri + 1}, ${esc(t.head[ci])}"></td>` : `<td>${esc(c.v)}</td>`).join('')}</tr>`).join('');
    return `<div class="check" ${base}><p class="check-q">${esc(k.text || 'Fill in the missing values.')}</p><div class="tscroll"><table class="trace"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div><button type="button">Check table</button>${msg}</div>`;
  }
  if (k.type === 'parsons') {
    const lines = (snippet ? snippet(k.code) : '').replace(/\n$/, '').split('\n').filter((l) => l.trim());
    return `<div class="check" ${base} data-lines="${esc(JSON.stringify(lines))}" data-extra="${esc(JSON.stringify(k.extra || []))}"><p class="check-q">${esc(k.text || 'Put the lines in order to make the program work.')}</p>` +
      `<div class="parsons"><div class="pcol"><b>Pieces (click to add)</b><ul class="ppool"></ul></div><div class="pcol"><b>Your program</b><ol class="pprog"></ol></div></div>` +
      `<button type="button" class="pcheck">Check order</button> <button type="button" class="preset">Start again</button>${msg}</div>`;
  }
  if (k.type === 'sort') {
    const opts = `<option value="">Choose…</option>` + k.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
    return `<div class="check" ${base} data-answers="${esc(JSON.stringify(k.items.map((it) => it[1])))}"><p class="check-q">${tx(k.q || 'Sort each one into its group.')}</p>` +
      k.items.map((it) => `<div class="mrow srow"><span>${tx(it[0])}</span><select aria-label="${esc(String(it[0]).replace(/\$/g, ''))}">${opts}</select>${it[2] ? `<small class="swhy" hidden>${esc(plain(it[2]))}</small>` : ''}</div>`).join('') + `<button type="button">Check answers</button>${msg}</div>`;
  }
  const name = `q-${lesson.slug}-${step.id}${task ? `-t${task.index}` : ''}`.replace(/[^a-z0-9-]/gi, '-');
  return `<div class="check" ${base} data-answer="${k.answer}"${k.feedback ? ` data-feedback="${esc(JSON.stringify(k.feedback.map((f) => (f ? plain(f) : ''))))}"` : ''}><fieldset><legend>${tx(k.q)}</legend>` +
    k.options.map((o, i) => `<label><input type="radio" name="${name}" value="${i}"><span>${tx(o)}</span></label>`).join('') +
    `</fieldset><button type="button">Check answer</button>${msg}</div>`;
}

/**
 * The complete lesson page.
 * deps: { Marked, highlightCode, snippet(ref), clipHtml(step), tryHtml(step), crumb: {href, title}, source }
 */
export function lessonPageHtml(lesson, deps) {
  const { Marked, highlightCode, snippet, clipHtml, tryHtml, crumb, source, snippetNames, course = null, siteRoot = '', siteNavHtml = '', teacherGuide = '', expectedHtml = () => '', pictureHtml = () => '', maths = null, blocksPicture = () => null } = deps;
  // Maths lessons: $...$ is rendered at build time (deps.maths, from tools/maths.mjs). Without it (the create page) it stays text.
  const isMaths = lesson.language === 'maths' && !!maths;
  const tx = isMaths ? (t) => maths.textWithMath(t, esc) : esc;
  // MakeCode lessons show display code as a picture of the blocks (see makecodeBlock).
  const mk = lesson.language === 'makecode';
  const mkTarget = lesson.steps.map((s) => s.config.try?.playground).find((k) => k === 'microbit' || k === 'arcade') || 'microbit';
  const mkPkg = makecodePackage(lesson);
  const md = new Marked({
    renderer: { code({ text, lang }) { if (lang === 'worked' && isMaths) return maths.workedHtml(text, md); const fs = splitFiles(text); if (mk && (lang || 'makecode') === 'makecode' && !(fs.length > 1 || fs[0]?.name)) { const src = text.replace(/\n$/, '') + '\n'; return makecodeBlock(highlightCode, src, '', mkTarget, blocksPicture(src), mkPkg); } return fs.length > 1 || fs[0]?.name ? `<div class="files">${fs.map((f) => codeBlock(highlightCode, f.code, lang || lesson.language, f.name)).join('')}</div>` : codeBlock(highlightCode, text.replace(/\n$/, '') + '\n', lang || lesson.language, ''); } },
  });
  // "Predict: what will `greet` return?" -> "What will <code>greet</code> return?"
  if (isMaths) md.use(maths.markedMath);
  const heading = (t) => {
    const s = t.replace(STAGE_PREFIX, '');
    return md.parseInline(s.charAt(0).toUpperCase() + s.slice(1));
  };
  const isSci = lesson.language === 'science';
  const stagesUsed = [...new Set(lesson.steps.map((s) => s.config.stage).filter((s) => s !== 'info' || isSci))];
  const tierAttr = (c) => (c.tier ? ` data-tier="${esc(c.tier)}"` : '');
  const nav = lesson.steps.map((s) => `<a href="#${s.id}" style="--c:var(--${s.config.stage})"${tierAttr(s.config)}><i></i>${heading(s.title)}${s.tasks.length ? '<span class="cnt"></span>' : ''}</a>`).join('');
  const SI = lesson.language === 'maths' ? STAGE_INFO_MATHS : isSci ? STAGE_INFO_SCIENCE : STAGE_INFO;
  // Width tiers: steps marked typical or wider are extra contexts. A teacher sets the starting width with ?width=;
  // students can widen but not narrow. Tiered checks are not needed to finish the lesson.
  const tiered = lesson.steps.some((s) => s.config.tier);
  const widthBar = !tiered ? '' : `<div class="widthbar" aria-label="Lesson width"><div><b>Width</b><span class="wnote">More contexts, same idea.</span></div><div class="wseg" role="group" aria-label="Choose width">${TIERS_UI.map((t) => `<button type="button" data-w="${t}" aria-pressed="false">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div></div>`;
  const legend = stagesUsed.filter((k) => SI[k]).map((k) => `<li style="--c:var(--${k})"><b>${SI[k][0]}</b>: ${esc(SI[k][1])}</li>`).join('');

  const steps = lesson.steps.map((s) => {
    const c = s.config;
    const [label, hint] = SI[c.stage] || SI.info;
    let showCode = '';
    if (c.code) {
      try {
        const files = splitFiles(snippet(c.code));
        showCode = files.length > 1 || files[0]?.name
          ? `<div class="files">${files.map((f) => codeBlock(highlightCode, f.code, lesson.language, f.name)).join('')}</div>`
          : mk ? makecodeBlock(highlightCode, snippet(c.code), c.code.split('#')[0], mkTarget, blocksPicture(snippet(c.code)), mkPkg) : codeBlock(highlightCode, snippet(c.code), lesson.language, c.code.split('#')[0]);
      }
      catch (e) { showCode = `<div class="placeholder"><b>${esc(e.message)}</b></div>`; }
    }
    const clip = clipHtml(s);
    const shown = c.picture ? pictureHtml(c.picture, s.id) : '';
    const body = md.parse(s.body);
    // Predict steps: code first, then the questions, then the hidden reveal. Others: text, code, clip.
    // Hints are nudges, one click each: "Need a hint?", then "Another hint".
    const hintsOf = (h) => (h === undefined ? [] : [].concat(h)).map((t, i) => `<details class="hints"><summary>${i ? 'Another hint' : 'Need a hint?'}</summary>${md.parse(t)}</details>`).join('');
    const hints = hintsOf(c.hint);
    const checks = checkHtml(lesson, s, snippetNames, snippet, null, tx);
    // A Run step after a Predict step with a predict check shows "You predicted X. It actually did Y." after Run.
    let compare = '';
    if (c.stage === 'run') {
      const at = lesson.steps.indexOf(s);
      const ps = lesson.steps.slice(0, at).reverse().find((x) => x.config.stage === 'predict' && x.config.check?.type === 'predict');
      if (ps) compare = `<div class="compare" hidden aria-live="polite" data-predict="${esc(`${lesson.slug}/${ps.id}`)}" data-play="${esc(`${lesson.slug}/${s.id}`)}" data-actual="${esc(ps.config.check.actual || '')}"></div>`;
    }
    let inner;
    if (s.tasks.length) {
      // Tasks (### headings): sub-pills, one task shown at a time, one playground shared by all of them.
      const kind = unlockKind(lesson, s);
      const keys = s.tasks.filter((t) => t.config.check).map((t) => `${lesson.slug}/${t.id}`);
      const names = (c.unlocks || []).map((id) => snippetNames?.[kind]?.[id] || id.replace(/-/g, ' '));
      const pills = s.tasks.map((t, n) => `<button type="button" role="tab" class="tp${n ? '' : ' active'}" data-i="${n}" data-key="${esc(`${lesson.slug}/${t.id}`)}" aria-selected="${n ? 'false' : 'true'}"><i></i>${n + 1} · ${md.parseInline(t.title)}</button>`).join('');
      const bodies = s.tasks.map((t, n) => {
        let reset = '';
        if (t.config.starter) { try { reset = `<button type="button" class="resetstart" data-code="${esc(snippet(t.config.starter))}">Reset to this task's start</button>`; } catch { /* reported by validation */ } }
        return `<div class="tpanel${n ? '' : ' active'}" data-i="${n}" role="tabpanel">${md.parse(t.body)}${t.config.picture ? pictureHtml(t.config.picture, t.id.replace('#', '-')) : ''}${hintsOf(t.config.hint)}${expectedHtml(t.config, t.id.replace('#', '-'))}${reset}</div>`;
      }).join('');
      const taskChecks = s.tasks.map((t, n) => `<div class="tpanel${n ? '' : ' active'}" data-i="${n}">${checkHtml(lesson, s, snippetNames, snippet, t, tx)}</div>`).join('');
      const wrap = `<div class="tasks" style="--c:var(--${STAGE_INFO[c.stage] ? c.stage : 'info'})" data-step="${s.id}" data-stepkey="${esc(`${lesson.slug}/${s.id}`)}" data-kind="${kind}" data-keys="${esc(keys.join('|'))}" data-unlocks="${esc((c.unlocks || []).join(','))}" data-names="${esc(names.join('|'))}"><div class="taskpills" role="tablist" aria-label="Tasks">${pills}</div>${bodies}${tryHtml(s)}${taskChecks}<p class="tmsg" aria-live="polite"></p></div>`;
      inner = c.reveal ? `${body}${showCode}${shown}${wrap}${clip}` : `${body}${showCode}${shown}${clip}${wrap}`;
    } else {
      // Predict: code, questions, hidden reveal. A hidden clip on a task comes after the attempt: text, code, try, hints, clip.
      inner = c.stage === 'predict' ? `${showCode}${body}${clip}${tryHtml(s)}${hints}${checks}`
        : c.reveal ? `${body}${showCode}${shown}${tryHtml(s)}${compare}${hints}${expectedHtml(c, s.id)}${clip}${checks}`
        : `${body}${showCode}${shown}${clip}${tryHtml(s)}${compare}${hints}${expectedHtml(c, s.id)}${checks}`;
    }
    return `<section class="step" id="${s.id}" style="--c:var(--${STAGE_INFO[c.stage] ? c.stage : 'info'})"${tierAttr(c)}><div class="chip">${esc(label)}${c.tier ? ` <span class="tierchip">${TIER_LABEL[c.tier]}</span>` : ''}<small>${esc(hint)}</small></div><h2>${heading(s.title)}</h2>${inner}</section>`;
  }).join('');

  // Course bar (prev / where am I / next) and the card at the end. course: { index, total, prev, next, list, pathHref, pathTitle, playground }
  const lab = (l) => `${l.order != null ? `${l.order}. ` : ''}${l.title}`;
  const cb = !course ? '' : `<div class="coursebar" role="navigation" aria-label="Lesson navigation"><style>:root{--cb:46px}</style>` +
    (course.prev ? `<a class="cb-prev" href="${esc(course.prev.href)}" title="${esc(lab(course.prev))}">‹ <span>${esc(lab(course.prev))}</span></a>` : '<span class="cb-prev"></span>') +
    `<div class="cb-mid"><button type="button" class="cb-toggle" aria-expanded="false" aria-controls="cb-menu">${course.index} of ${course.total} · ${esc(lesson.title)} ▾</button>` +
    `<div class="cb-menu" id="cb-menu" hidden><ul>${course.list.map((l) => `<li><a href="${esc(l.href)}" data-checks="${esc(l.checks.join('|'))}"${l.current ? ' aria-current="page"' : ''}><i class="tick"></i><span>${esc(lab(l))}</span></a></li>`).join('')}</ul>` +
    `<div class="cb-tools"><a href="${esc(course.pathHref)}">All ${esc(course.pathTitle)} lessons and my progress</a>${course.playground ? `<a href="${esc(course.playground)}">Playground</a>` : ''}</div></div></div>` +
    (course.next ? `<a class="cb-next" href="${esc(course.next.href)}" title="${esc(lab(course.next))}"><span>${esc(lab(course.next))}</span> ›</a>` : '<span class="cb-next"></span>') + `</div>`;
  const nextCard = !course ? '' : course.next
    ? `<a class="nextcard" href="${esc(course.next.href)}"><small>Next lesson</small><b>${esc(lab(course.next))}</b>${course.next.summary ? `<span>${esc(course.next.summary)}</span>` : ''}</a>`
    : `<a class="nextcard" href="${esc(course.pathHref)}"><small>You reached the end</small><b>Back to ${esc(course.pathTitle)}</b></a>`;

  // Teacher notes, plus what each step is for (the optional `insight:` of steps and tasks).
  const insights = lesson.steps.flatMap((st) => [
    st.config.insight ? { where: st.title.replace(STAGE_PREFIX, ''), text: st.config.insight } : null,
    ...st.tasks.filter((t) => t.config.insight).map((t) => ({ where: `${st.title.replace(STAGE_PREFIX, '')} › ${t.title}`, text: t.config.insight })),
  ]).filter(Boolean);
  // For teachers: teacher.yml in plain language (no answers or solutions: those live in the teacher guide).
  const T = lesson.teacher;
  const li = (xs) => `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const teachersHtml = T
    ? `<details class="teachers"><summary>For teachers</summary>` +
      `<p>${esc(T.summary || '')}${T.time ? ` <b>About ${T.time} minutes.</b>` : ''}</p>` +
      (teacherGuide ? `<p class="tguide"><a href="${esc(teacherGuide)}">Open the teacher guide</a>: answers, solutions, slides and a worksheet.</p>` : '') +
      (T.goals ? `<h3>Students will be able to</h3>${li(T.goals)}` : '') +
      (T.before ? `<h3>Before class</h3>${md.parse(T.before)}` : '') +
      (T.running ? `<h3>Running the lesson</h3><ol>${T.running.map((r) => `<li>${esc(r)}</li>`).join('')}</ol>` : '') +
      (T.stuck ? `<h3>When students get stuck</h3><ul>${T.stuck.map((x) => `<li><b>${esc(x.see)}</b> Ask: ${esc(x.ask)} Fix: ${esc(x.fix)}</li>`).join('')}</ul>` : '') +
      (T.stretch || T.support ? `<h3>Stretch and support</h3>${T.stretch ? `<p><b>Stretch:</b> ${esc(T.stretch)}</p>` : ''}${T.support ? `<p><b>Support:</b> ${esc(T.support)}</p>` : ''}` : '') +
      (T.leads ? `<h3>Where it leads</h3>${md.parse(T.leads)}` : '') +
      (insights.length ? `<h3>What each step is for</h3><ul>${insights.map((i) => `<li><b>${esc(i.where)}:</b> ${esc(i.text)}</li>`).join('')}</ul>` : '') + `</details>`
    : (lesson.teachers || insights.length)
      ? `<details class="teachers"><summary>For teachers</summary>${lesson.teachers ? md.parse(lesson.teachers) : ''}${insights.length ? `<h3>What each step is for</h3><ul>${insights.map((i) => `<li><b>${esc(i.where)}:</b> ${esc(i.text)}</li>`).join('')}</ul>` : ''}</details>` : '';
  // Explain it to me: the idea in more words, collapsed, for students who want it.
  const explainClip = lesson.explainStep ? clipHtml(lesson.explainStep) : '';
  const explainPic = lesson.explainPicture ? pictureHtml(lesson.explainPicture, 'explain') : '';
  // It opens from a "?" button in the sticky step bar, as a drawer. Until the lesson's first Predict is locked in, the
  // button only says to predict first, so the explanation (often the same program) never gives the answer away.
  const hasExplain = !!(T?.explain || explainClip);
  const explainBtn = hasExplain ? `<button type="button" class="xbtn" aria-controls="xdrawer" aria-expanded="false" title="Explain it to me"><b aria-hidden="true">?</b><span>Explain</span></button>` : '';
  const explainHtml = hasExplain ? `<aside id="xdrawer" class="xdrawer" hidden aria-labelledby="xd-title"><div class="xd-head"><h2 id="xd-title">Explain it to me</h2><button type="button" class="xd-close">Close</button></div>` +
    `<p class="xd-wait" hidden>Make your prediction first. Help opens once you've locked it in.</p><div class="xd-body">${explainClip}${T?.explain ? md.parse(T.explain) : ''}${explainPic}</div></aside><script>${EXPLAIN_JS}</script>` : '';

  const mathsHead = isMaths ? `<link rel="stylesheet" href="${esc(siteRoot)}_katex/katex.min.css"><style>${MATHS_CSS}</style>` : '';
  return page(lesson.title, `
${mathsHead}${cb}<header class="top">${crumb ? `<a class="crumb" href="${esc(crumb.href)}">← ${esc(crumb.title)}</a>` : ''}<h1>${esc(lesson.title)}</h1>${lesson.summary ? `<p class="lede">${esc(lesson.summary)}</p>` : ''}${lesson.author ? `<p class="by">By ${esc(lesson.author)}</p>` : ''}</header>
${lesson.hook ? `<p class="hook">${esc(lesson.hook)}</p>` : ''}
${md.parse(lesson.intro)}
<ul class="legend">${legend}</ul>
${widthBar}
<nav class="steps">${explainBtn}${nav}</nav>
${explainHtml}
${steps}${tiered ? `<script>${WIDTH_JS}</script>` : ''}
${teachersHtml}
${nextCard}
${source ? `<footer>Source: <code>${esc(source)}</code></footer>` : ''}${mk ? `<style>${MAKECODE_CSS}</style>` : ''}`, (siteRoot ? `<script src="${esc(siteRoot)}progress.js" data-root="${esc(siteRoot)}" defer></script>` : '') + (mk ? `<script>${MAKECODE_JS}</script>` : ''), siteNavHtml);
}

// The Explain it to me drawer: opened by the "?" in the step bar; held back until the first Predict is locked in.
const EXPLAIN_JS = `(function(){var d=document.getElementById('xdrawer'),b=document.querySelector('.xbtn');if(!d||!b)return;
var w=d.querySelector('.xd-wait'),body=d.querySelector('.xd-body');
function locked(){var pc=document.querySelector('.check[data-type="predict"]'),pk=pc&&pc.dataset.key;if(!pk)return true;try{var p=JSON.parse(localStorage.getItem('wp-predict'))||{};return p[pk]!==undefined&&p[pk]!==null}catch(e){return true}}
function sync(){var ok=locked();w.hidden=ok;body.hidden=!ok}
function open(){sync();d.hidden=false;b.setAttribute('aria-expanded','true');d.querySelector('.xd-close').focus()}
function shut(){d.hidden=true;b.setAttribute('aria-expanded','false');[].forEach.call(d.querySelectorAll('video'),function(v){v.pause()})}
b.addEventListener('click',function(){d.hidden?open():shut()});d.querySelector('.xd-close').addEventListener('click',function(){shut();b.focus()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!d.hidden){shut();b.focus()}});
document.addEventListener('wp-predict',function(){if(!d.hidden)sync()});})();`;

export const PLAYGROUNDS = {
  turtle: { dir: '_playground', title: 'Python turtle playground' },
  html: { dir: '_playground-html', title: 'HTML and CSS playground' },
  board: { dir: '_playground-board', title: 'Board' },
  maths: { dir: '_playground-board', title: 'Board' },
  microbit: { dir: '_playground-makecode', title: 'micro:bit MakeCode editor', height: 640 },
  arcade: { dir: '_playground-makecode', title: 'MakeCode Arcade editor', height: 640 },
  science: { dir: '_playground-science', title: 'Science board' },
};

const TIERS_UI = ['minimum', 'typical', 'wider'];
/** Width control: hides steps above the chosen width. ?width= sets the floor (a teacher's link); the choice is kept per lesson in this tab. */
const WIDTH_JS = `(function(){var R={minimum:0,typical:1,wider:2};var q=new URLSearchParams(location.search).get('width');var floor=q in R?q:'minimum';
var key='wp-width:'+location.pathname,cur;try{cur=sessionStorage.getItem(key)}catch(e){}if(!(cur in R)||R[cur]<R[floor])cur=q in R?q:'typical';
var bar=document.querySelector('.widthbar');function apply(){document.querySelectorAll('[data-tier]').forEach(function(el){el.hidden=R[el.dataset.tier]>R[cur]});
bar.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.w===cur));b.disabled=R[b.dataset.w]<R[floor]});
bar.querySelector('.wnote').textContent=(q in R?'Your teacher set '+floor+'. You can add more contexts. ':'More contexts, same idea. ')+'Showing '+cur+'.';try{sessionStorage.setItem(key,cur)}catch(e){}}
bar.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.disabled)return;cur=b.dataset.w;apply()});apply()})();`;

/** Extra styles for maths lessons: display maths, worked examples, typed answers. */
export const MATHS_CSS = `.mathblock{overflow-x:auto;overflow-y:hidden;margin:.6em 0}.katex{font-size:1.12em}
.worked{border:1px solid var(--line);border-left:4px solid var(--c,var(--accent));border-radius:10px;background:var(--card);padding:12px 16px;margin:14px 0}
.worked-head{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;margin-bottom:6px}.worked-head span{color:var(--muted);font-size:14px}
.worked ol{margin:0;padding-left:1.4em}.worked li{padding:6px 0;border-top:1px dashed var(--line)}.worked li:first-child{border-top:0}
.worked li.new{animation:wfade .35s ease-out}@keyframes wfade{from{opacity:0;transform:translateY(-3px)}}
@media(prefers-reduced-motion:reduce){.worked li.new{animation:none}}
.worked .wm{display:block;font-size:1.08em;overflow-x:auto}.worked .why{display:block;color:var(--muted);font-size:15px;margin-top:2px}
.worked-go{display:flex;gap:8px;margin-top:8px}.worked-go button{font:inherit;font-size:14px;font-weight:600;padding:5px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer}
.worked-go button[hidden]{display:none}.worked-go .wnext{background:var(--c,var(--accent));border-color:transparent;color:#fff}@media(prefers-color-scheme:dark){.worked-go .wnext{color:#0f141a}}
.ansrow input{width:14em;font-family:ui-monospace,Menlo,Consolas,monospace}`;

/** "Try it yourself" iframe. siteRoot is the URL of the site root (with trailing slash), e.g. "../../../". */
export function tryEmbed(lesson, step, starter, siteRoot, locks = '', mods = null, versions = null) {
  const t = step.config.try;
  const pg = PLAYGROUNDS[t.playground || 'turtle'] || PLAYGROUNDS.turtle;
  const q = new URLSearchParams({ id: `${lesson.slug}/${step.id}`, code: starter });
  if (t.extent) q.set('extent', t.extent);
  if (t.speed) q.set('speed', t.speed);
  if (t.boxes) q.set('boxes', '1'); // HTML playground: start with the Boxes view on
  if (t.boxmodel) q.set('boxmodel', '1'); // ... or with the Box model view on
  if (t.playground === 'microbit' || t.playground === 'arcade') {
    q.set('target', t.playground); // one MakeCode playground, two editors
    const pkg = makecodePackage(lesson); if (pkg) q.set('pkg', pkg); // the lesson's extensions (robot), added to the step's project
  }
  // Modules the playground offers: ?use=shapes,house, plus ?mods={name: source} for ones that live in the lesson
  if (mods && pg === PLAYGROUNDS.turtle && mods.use.length) { q.set('use', mods.use.join(',')); if (Object.keys(mods.local).length) q.set('mods', JSON.stringify(mods.local)); }
  if (locks) q.set('locks', locks); // the create page's preview: "id~Step title|id~Step title"
  if (versions?.[pg.dir]) q.set('v', versions[pg.dir]); // a new deploy gets a new URL, never a cached old playground
  const wide = pg.dir === '_playground-makecode' && makecodeExtensions(lesson).some((e) => e.wide);
  return `<div class="try"${wide ? ' data-wide="1"' : ''}><div class="try-head"><b>Try it yourself</b><span>${pg === PLAYGROUNDS.science ? 'Nothing is saved: start again as often as you like.' : 'Your edits are saved in this browser.'}</span><button type="button" class="try-full" aria-pressed="false" title="Give the playground the whole screen (Esc to come back)">Full screen</button></div>` +
    (pg.dir === '_playground-makecode'
      // MakeCode editors load on click: each one is heavy, and MakeCode focuses itself when it loads, which
      // scrolled the page to any editor that lazy-loaded nearby. data-src holds the address until then.
      ? `<div class="mkload" style="height:${Number(t.height) || pg.height || 480}px"><button type="button" class="mkopen">Open the MakeCode editor</button><span>${wide ? 'It opens full screen, so the robot simulator has room, and takes a few seconds to load. Esc comes back. Your work in this step is kept.' : 'It takes a few seconds to load. Your work in this step is kept.'}</span></div>` +
        `<iframe title="${esc(pg.title)}" hidden style="height:${Number(t.height) || pg.height || 480}px" data-src="${esc(`${siteRoot}${pg.dir}/index.html?${q.toString()}`)}"></iframe></div>`
      : `<iframe title="${esc(pg.title)}" loading="lazy" style="height:${Number(t.height) || pg.height || 480}px" src="${esc(`${siteRoot}${pg.dir}/index.html?${q.toString()}`)}"></iframe></div>`);
}
