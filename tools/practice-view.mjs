// The course Practice page (<course>/practice/): endless questions from each lesson's templates
// (content/<course>/practice/<lesson>.yml, tools/practice-core.mjs), marked by the maths checker (WPM).
// A skill counts as practised after 3 right in a row; that is kept per browser in localStorage wp-practice.

export const PRACTICE_CSS = `
.pp{max-width:760px;margin:0 auto}
.pp label.ppl{display:block;font-weight:600;margin:0 0 4px}
.pp select{font:inherit;font-size:16px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);max-width:100%}
.ppcard{margin:18px 0;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--card)}
.ppskill{margin:0 0 6px;font-size:14px;color:var(--muted)}
.ppq{font-size:19px;line-height:1.5;margin:0 0 14px}
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
#pp-print{display:none}
@media print{nav,header.top,.ppno{display:none!important}#pp-print{display:block}#pp-print ol{font-size:15px;line-height:1.9}}
`;

export const PRACTICE_UI_JS = `(function(){
var D=JSON.parse(document.getElementById('wpp-data').textContent),skills=D.skills,KEY='wp-practice';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
var st=load(),sel=document.getElementById('pp-scope'),qEl=document.getElementById('pp-q'),inp=document.getElementById('pp-ans'),msg=document.getElementById('pp-msg'),xp=document.getElementById('pp-x'),sk=document.getElementById('pp-skill'),stk=document.getElementById('pp-streak'),done=document.getElementById('pp-done'),showB=document.getElementById('pp-show'),list=document.getElementById('pp-list');
var cur=null,curSkill=null,wrong=0,answered=false,last=null,rnd=Math.random;
function inScope(){var v=sel.value;if(v==='all')return skills;if(v.indexOf('unit:')===0){var u=v.slice(5);return skills.filter(function(s){return s.unit===u})}return skills.filter(function(s){return s.slug===v})}
function pick(){var pool=inScope();if(pool.length>1&&last)pool=pool.filter(function(s){return s.slug!==last});var w=pool.map(function(s){return (st[s.slug]&&st[s.slug].d)?1:3}),t=w.reduce(function(a,b){return a+b},0),r=rnd()*t;for(var i=0;i<pool.length;i++){r-=w[i];if(r<0)return pool[i]}return pool[pool.length-1]}
function next(){curSkill=pick();last=curSkill.slug;var tp=curSkill.templates[Math.floor(rnd()*curSkill.templates.length)];cur=WPP.generate(tp,rnd);if(!cur){qEl.textContent='No question could be made. Try another skill.';return}
qEl.textContent=cur.q;sk.textContent=curSkill.title;inp.value='';msg.textContent='';msg.className='ppmsg';xp.hidden=true;xp.textContent='';wrong=0;answered=false;showB.hidden=true;streak();inp.focus()}
function streak(){var s=st[curSkill.slug]||{};stk.textContent=s.d?'Practised: '+curSkill.title+' ✓':'Right in a row for this skill: '+(s.s||0)+' of 3';paintList()}
function check(){if(!cur||answered)return;var r=WPP.mark(cur,inp.value,WPM),s=st[curSkill.slug]||{s:0};
if(r.ok){answered=true;s.s=(s.s||0)+1;if(s.s>=3)s.d=1;st[curSkill.slug]=s;save(st);msg.className='ppmsg ok';msg.textContent=s.s===3?'Right! That is 3 in a row: skill practised.':'Right!';if(cur.explain){xp.textContent=cur.explain;xp.hidden=false}streak();document.getElementById('pp-next').focus();return}
if(r.msg==='Type your answer first.'||/^(Right value|Write it|Write each)/.test(r.msg)){msg.className='ppmsg no';msg.textContent=r.msg;return}
wrong++;s.s=0;st[curSkill.slug]=s;save(st);streak();msg.className='ppmsg no';msg.textContent=r.msg;showB.hidden=false}
function reveal(){if(!cur)return;answered=true;msg.className='ppmsg';msg.textContent='The answer: '+(cur.show||cur.answer.replace(/-/g,'\\u2212'));if(cur.explain){xp.textContent=cur.explain;xp.hidden=false}document.getElementById('pp-next').focus()}
function paintList(){var n=0;list.innerHTML='';inScope().forEach(function(s){var li=document.createElement('li'),d=st[s.slug]&&st[s.slug].d,bt=document.createElement('button');if(d){li.className='d';n++}bt.type='button';bt.className='pplink';bt.textContent=s.title;bt.addEventListener('click',function(){sel.value=s.slug;sel.dispatchEvent(new Event('change'));window.scrollTo(0,0)});li.appendChild(bt);list.appendChild(li)});done.textContent='Practised '+n+' of '+inScope().length+(inScope().length===1?' skill':' skills')+' here (3 right in a row each).'}
function printSet(){var out=document.getElementById('pp-print'),r=WPP.rng(Date.now()%100000),qs=[],pool=inScope();for(var i=0;i<10;i++){var s=pool[i%pool.length],tp=s.templates[Math.floor(r()*s.templates.length)],g=WPP.generate(tp,r);if(g)qs.push(g)}
out.innerHTML='<h2>'+D.title+': practice</h2><ol>'+qs.map(function(g){return '<li>'+esc(g.q)+'</li>'}).join('')+'</ol><h3>Answers</h3><ol>'+qs.map(function(g){return '<li>'+esc(g.show||g.answer.replace(/-/g,'\\u2212'))+'</li>'}).join('')+'</ol>';window.print()}
function esc(t){return String(t).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
document.getElementById('pp-check').addEventListener('click',check);
inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();if(answered)next();else check()}});
document.getElementById('pp-next').addEventListener('click',next);showB.addEventListener('click',reveal);
document.getElementById('pp-printb').addEventListener('click',printSet);
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
<section class="ppcard" aria-live="polite"><p class="ppskill" id="pp-skill"></p><p class="ppq" id="pp-q"></p>
<div class="pprow"><input id="pp-ans" type="text" autocomplete="off" aria-label="Your answer"><button type="button" class="go" id="pp-check">Check</button><button type="button" id="pp-show" hidden>Show the answer</button><button type="button" id="pp-next">Next question</button></div>
<p class="ppmsg" id="pp-msg"></p><p class="ppx" id="pp-x" hidden></p><p class="ppstreak" id="pp-streak"></p></section>
<p class="ppdone" id="pp-done"></p><ul class="pplist" id="pp-list"></ul>
<div class="pptools"><button type="button" id="pp-printb">Print 10 questions with answers</button></div>
</div><section id="pp-print"></section>`;
}
