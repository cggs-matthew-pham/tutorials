// The course Practice page (<course>/practice/): endless questions from each lesson's templates
// (content/<course>/practice/<lesson>.yml, tools/practice-core.mjs), marked by the maths checker (WPM).
// A skill counts as practised after 3 right in a row; that is kept per browser in localStorage wp-practice.

export const PRACTICE_CSS = `
.pp{max-width:760px;margin:0 auto}
.pp label.ppl{display:block;font-weight:600;margin:0 0 4px}
.pp select{font:inherit;font-size:16px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);max-width:100%}
.ppcard{margin:18px 0;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--card)}
.ppskill{margin:0 0 6px;font-size:14px;color:var(--muted)}
.ppq{font-size:19px;line-height:1.5;margin:0 0 14px}.ppq:focus{outline:none}
.pprow{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.pprow input{font:inherit;font-size:18px;padding:6px 10px;border:1px solid var(--line);border-radius:8px;min-width:10em;flex:1 1 10em;background:var(--bg);color:var(--ink)}
.pprow button,.pptools button{font:inherit;font-size:15px;padding:6px 14px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);cursor:pointer}
.pprow button.go{background:var(--accent,#c2570a);border-color:transparent;color:#fff}
.ppmsg{margin:12px 0 0;min-height:1.4em}.ppmsg.ok{color:var(--ok,#2e7d32)}.ppmsg.no{color:var(--bad,#b3261e)}
.ppx{margin:10px 0 0;padding:10px 14px;border-left:4px solid var(--investigate,#2563eb);background:color-mix(in srgb,var(--investigate,#2563eb) 7%,transparent);border-radius:4px}
.ppstreak{margin:12px 0 0;font-size:14px;color:var(--muted)}
.ppdone{font-size:14px;color:var(--muted);margin:8px 0 0}
.pplist{columns:2 16em;font-size:14px;padding-left:1.2em}.pplink{font:inherit;color:var(--link,#2563eb);background:none;border:0;padding:0;cursor:pointer;text-align:left}.pplink:hover{text-decoration:underline}.pplist li{margin:2px 0}.pplist li.d::marker{content:'✓ '}
.pptools{margin:18px 0}
.ppboard{margin:0 0 14px}.ppboard iframe{width:100%;border:1px solid var(--line);border-radius:10px;background:var(--bg);display:block}
.ppchoices{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 6px}.ppch{font:inherit;font-size:16px;padding:8px 14px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);cursor:pointer;text-align:left}.ppch:hover:not(:disabled){border-color:var(--accent,#c2570a)}.ppch.ok{border-color:var(--ok,#2e7d32);background:color-mix(in srgb,var(--ok,#2e7d32) 12%,transparent)}.ppch.no{border-color:var(--bad,#b3261e);opacity:.7}
#pp-print{display:none}
@media print{nav,header.top,.ppno{display:none!important}#pp-print{display:block}#pp-print ol{font-size:15px;line-height:1.9}}
`;

export const PRACTICE_UI_JS = `(function(){
var D=JSON.parse(document.getElementById('wpp-data').textContent),skills=D.skills,KEY='wp-practice';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
function $(id){return document.getElementById(id)}
var st=load(),sel=$('pp-scope'),qEl=$('pp-q'),inp=$('pp-ans'),msg=$('pp-msg'),xp=$('pp-x'),sk=$('pp-skill'),stk=$('pp-streak'),done=$('pp-done'),showB=$('pp-show'),list=$('pp-list'),chEl=$('pp-choices'),bdEl=$('pp-board'),chk=$('pp-check');
var late=false,NOFORMS={check:function(){return {ok:true}}};setTimeout(function(){late=true},10000);var cur=null,curSkill=null,wrong=0,tries=0,answered=false,last=null,rnd=Math.random;
// The board (a diagram, or the place to answer): one iframe, given each question's setup.
var frame=null,ready=false,pending=null,bstate=null,bmoved=false;
window.addEventListener('message',function(e){var m=e.data;if(!frame||e.source!==frame.contentWindow||!m||m.wp!=='run')return;bstate=m.state||{};bmoved=!!m.moved});
function board(setup,h){bstate=null;bmoved=false;if(!setup){bdEl.hidden=true;return}bdEl.hidden=false;
if(!frame){frame=document.createElement('iframe');frame.title='Diagram for this question';frame.src=D.board+'&fresh=1&id=practice&code='+encodeURIComponent(setup);frame.addEventListener('load',function(){ready=true;if(pending){frame.contentWindow.postMessage({wp:'set-code',code:pending},location.origin);pending=null}});bdEl.appendChild(frame)}
else if(ready)frame.contentWindow.postMessage({wp:'set-code',code:setup},location.origin);else pending=setup;
frame.style.height=(h||360)+'px'}
function inScope(){var v=sel.value;if(v==='all')return skills;if(v.indexOf('unit:')===0){var u=v.slice(5);return skills.filter(function(s){return s.unit===u})}return skills.filter(function(s){return s.slug===v})}
function pick(){var pool=inScope();if(pool.length>1&&last)pool=pool.filter(function(s){return s.slug!==last});var w=pool.map(function(s){return (st[s.slug]&&st[s.slug].d)?1:3}),t=w.reduce(function(a,b){return a+b},0),r=rnd()*t;for(var i=0;i<pool.length;i++){r-=w[i];if(r<0)return pool[i]}return pool[pool.length-1]}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function next(){curSkill=pick();last=curSkill.slug;var tp=curSkill.templates[Math.floor(rnd()*curSkill.templates.length)];cur=WPP.generate(tp,rnd);if(!cur){qEl.textContent='No question could be made. Try another skill.';board('');chEl.innerHTML='';chEl.hidden=true;return}
qEl.textContent=cur.q;sk.textContent=curSkill.title;inp.value='';msg.textContent='';msg.className='ppmsg';xp.hidden=true;xp.textContent='';wrong=0;tries=0;answered=false;showB.hidden=true;
board(cur.board,cur.height);chEl.innerHTML='';chEl.hidden=!cur.choices;inp.hidden=!!(cur.choices||cur.when);chk.hidden=!!cur.choices;
if(cur.choices)shuffle(cur.choices).forEach(function(c){var b=document.createElement('button');b.type='button';b.className='ppch';b.textContent=c.t;b.addEventListener('click',function(){if(answered||b.disabled)return;var r=WPP.markChoice(cur,c.t);if(!r.ok){b.disabled=true;b.classList.add('no');var nx=[].filter.call(chEl.querySelectorAll('button'),function(x){return !x.disabled})[0];if(nx)nx.focus()}else b.classList.add('ok');result(r)});chEl.appendChild(b)});
streak();if(cur.choices||cur.when)qEl.focus();else inp.focus()}
function streak(){var s=st[curSkill.slug]||{};stk.textContent=s.d?'Practised: '+curSkill.title+' ✓':'Right in a row for this skill: '+(s.s||0)+' of 3';paintList()}
function result(r){var s=st[curSkill.slug]||{s:0};
if(r.ok){answered=true;s.s=(s.s||0)+1;if(s.s>=3)s.d=1;st[curSkill.slug]=s;save(st);msg.className='ppmsg ok';msg.textContent=(s.s===3?'Right! That is 3 in a row: skill practised.':'Right!')+(r.note?' '+r.note:'');if(cur.explain){xp.textContent=cur.explain;xp.hidden=false}streak();$('pp-next').focus();return}
if(r.first){tries++;if(tries>=2)showB.hidden=false}if(r.msg==='Type your answer first.'||r.first)return void(msg.className='ppmsg no',msg.textContent=r.msg);tries++;if(r.keep){msg.className='ppmsg no';msg.textContent=r.msg;if(tries>=2)showB.hidden=false;return}
wrong++;s.s=0;st[curSkill.slug]=s;save(st);streak();msg.className='ppmsg no';msg.textContent=r.msg;showB.hidden=false}
function check(){if(!cur||answered)return;
if(cur.when){if(!bstate||!bmoved)return result({ok:false,first:true,msg:'Use the board first, then press Check.'});var ok=false;try{ok=WPM.holds(cur.when,bstate.scope||{})}catch(e){ok=false}return result(ok?{ok:true}:{ok:false,msg:'Not quite. Look at the board again.'})}
result(WPP.mark(cur,inp.value,WPM,window.WPF||(late?NOFORMS:null)))}
function reveal(){if(!cur)return;answered=true;msg.className='ppmsg';
if(cur.choices){msg.textContent='The answer: '+cur.choices[0].t;[].forEach.call(chEl.querySelectorAll('button'),function(b){if(b.textContent===cur.choices[0].t)b.classList.add('ok')})}
else if(cur.when)msg.textContent=cur.show?'The answer: '+cur.show:'Here is how:';
else msg.textContent='The answer: '+(cur.show||WPP.sup(cur.answer).replace(/-/g,'\\u2212'));
if(cur.explain){xp.textContent=cur.explain;xp.hidden=false}$('pp-next').focus()}
function paintList(){var n=0;list.innerHTML='';inScope().forEach(function(s){var li=document.createElement('li'),d=st[s.slug]&&st[s.slug].d,bt=document.createElement('button');if(d){li.className='d';n++}bt.type='button';bt.className='pplink';bt.textContent=s.title;bt.addEventListener('click',function(){sel.value=s.slug;sel.dispatchEvent(new Event('change'));window.scrollTo(0,0)});li.appendChild(bt);list.appendChild(li)});done.textContent='Practised '+n+' of '+inScope().length+(inScope().length===1?' skill':' skills')+' here (3 right in a row each).'}
// Print: questions that need the board are left out; choices are lettered.
function printSet(){var out=$('pp-print'),r=WPP.rng(Date.now()%100000),qs=[],pool=inScope().map(function(s){return {s:s,t:s.templates.filter(function(t){return !t.board})}}).filter(function(x){return x.t.length});
if(!pool.length){alert('These skills need the board, so they cannot be printed.');return}
for(var i=0;i<10;i++){var x=pool[i%pool.length],g=WPP.generate(x.t[Math.floor(r()*x.t.length)],r);if(g){if(g.choices){var o=g.choices.slice();for(var k=o.length-1;k>0;k--){var j=Math.floor(r()*(k+1)),tt=o[k];o[k]=o[j];o[j]=tt}g.order=o}qs.push(g)}}
var L='abcdefgh';out.innerHTML='<h2>'+esc(D.title)+': practice</h2><ol>'+qs.map(function(g){return '<li>'+esc(g.q)+(g.order?'<br>'+g.order.map(function(c,k){return '('+L[k]+') '+esc(c.t)}).join('&nbsp;&nbsp; '):'')+'</li>'}).join('')+'</ol><h3>Answers</h3><ol>'+qs.map(function(g){return '<li>'+(g.order?'('+L[g.order.indexOf(g.choices[0])]+') '+esc(g.choices[0].t):esc(g.show||WPP.sup(g.answer).replace(/-/g,'\\u2212')))+'</li>'}).join('')+'</ol>';window.print()}
function esc(t){return String(t).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
chk.addEventListener('click',check);
inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();if(answered)next();else check()}});
$('pp-next').addEventListener('click',next);showB.addEventListener('click',reveal);
$('pp-printb').addEventListener('click',printSet);
sel.addEventListener('change',function(){last=null;try{sessionStorage.setItem('wp-practice-scope:'+D.course,sel.value)}catch(e){}next()});
var want=new URLSearchParams(location.search).get('skill');try{want=want||sessionStorage.getItem('wp-practice-scope:'+D.course)}catch(e){}
if(want&&want.indexOf('/')<0&&want.indexOf(':')<0&&want!=='all')want=D.course+'/'+want;if(want&&[].some.call(sel.options,function(o){return o.value===want}))sel.value=want;
next()})();`;

/** The page body. skills: [{ slug, title, unit, templates }] in course order; units: the course's units. */
export function practiceBody(courseTitle, units, skills, esc) {
  const opts = [`<option value="all">Mixed: the whole course</option>`];
  for (const u of units) {
    const ss = skills.filter((s) => s.unit === u.id);
    if (!ss.length) continue;
    opts.push(`<optgroup label="${esc(u.title)}"><option value="unit:${esc(u.id)}">Mixed: ${esc(u.title)}</option>${ss.map((s) => `<option value="${esc(s.slug)}">${esc(s.title)}</option>`).join('')}</optgroup>`);
  }
  const loose = skills.filter((s) => !units.some((u) => u.id === s.unit));
  if (loose.length) opts.push(`<optgroup label="More">${loose.map((s) => `<option value="${esc(s.slug)}">${esc(s.title)}</option>`).join('')}</optgroup>`);
  return `<div class="pp ppno">
<label class="ppl" for="pp-scope">What to practise</label><select id="pp-scope">${opts.join('')}</select>
<section class="ppcard" aria-live="polite"><p class="ppskill" id="pp-skill"></p><p class="ppq" id="pp-q" tabindex="-1"></p><div class="ppboard" id="pp-board" hidden></div><div class="ppchoices" id="pp-choices" hidden></div>
<div class="pprow"><input id="pp-ans" type="text" autocomplete="off" aria-label="Your answer"><button type="button" class="go" id="pp-check">Check</button><button type="button" id="pp-show" hidden>Show the answer</button><button type="button" id="pp-next">Next question</button></div>
<p class="ppmsg" id="pp-msg"></p><p class="ppx" id="pp-x" hidden></p><p class="ppstreak" id="pp-streak"></p></section>
<p class="ppdone" id="pp-done"></p><ul class="pplist" id="pp-list"></ul>
<div class="pptools"><button type="button" id="pp-printb">Print 10 questions with answers</button></div>
</div><section id="pp-print"></section>`;
}
