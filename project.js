// Project pages (tools/project-view.mjs). A brief page: lights each "You'll use" chip when the student's own code
// uses that skill (the concept scan, concepts-core.js, run on every report from the playground), keeps the milestones
// and the reflection, and makes the badge and the "Show your teacher" card. A list page: marks claimed and started
// briefs. A course page: counts badges on its Projects chip. Saved in this browser only, under wp-projects.
import { conceptsIn } from './concepts-core.js';

const KEY = 'wp-projects';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
const save = (all) => { try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* storage off: this visit only */ } };
const today = () => new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

// ---- list page and course page
document.querySelectorAll('.pjcard[data-key]').forEach((c) => {
  const s = load()[c.dataset.key];
  const st = c.querySelector('.pjst');
  if (s && st) st.textContent = s.claimed ? '★ Badge claimed' : s.code || (s.ms || []).some(Boolean) ? 'Started' : '';
});
document.querySelectorAll('a.chip[data-projects]').forEach((a) => {
  const pre = a.dataset.projects + '/', n = Object.entries(load()).filter(([k, v]) => k.startsWith(pre) && v.claimed).length;
  if (n) a.textContent = `Projects ★${n}`;
});

// ---- a brief
const dataEl = document.getElementById('pj-data');
if (dataEl) {
  const D = JSON.parse(dataEl.textContent);
  const all = load(), me = all[D.key] || (all[D.key] = { ms: [], used: [], code: {} });
  me.ms ||= []; me.used ||= []; me.code ||= {};
  const store = () => { all[D.key] = me; save(all); };

  // Skills: each part's latest code, scanned in its language.
  const used = D.parts.map((_, i) => new Set((me.usedBy || {})[i] || []));
  function paintSkills() {
    document.querySelectorAll('.pj-skill').forEach((c) => c.classList.toggle('on', used[+c.dataset.part].has(c.dataset.c)));
    document.querySelectorAll('.pj-also').forEach((p) => {
      const i = +p.dataset.part, mine = new Set(D.parts[i].uses.map((u) => u.id));
      const also = D.parts[i].known.filter((k) => used[i].has(k.id) && !mine.has(k.id)).map((k) => k.label);
      p.textContent = also.length ? `You also used: ${also.join(' · ')}` : '';
    });
    paintBadge();
  }
  window.addEventListener('message', (e) => {
    const m = e.data;
    if (e.origin !== location.origin || !m || m.wp !== 'run' || typeof m.code !== 'string') return;
    const i = D.parts.findIndex((p) => p.play === m.id);
    if (i < 0) return;
    used[i] = conceptsIn(m.code, D.parts[i].language);
    me.usedBy = { ...(me.usedBy || {}), [i]: [...used[i]] };
    me.code[i] = m.code;
    store(); paintSkills();
  });

  // Milestones, reflection, claim.
  const boxes = [...document.querySelectorAll('.pjms input[data-ms]')];
  const claim = document.getElementById('pj-claim'), why = document.getElementById('pj-why'), ref = document.getElementById('pj-reflect');
  boxes.forEach((b) => {
    b.checked = !!me.ms[+b.dataset.ms];
    b.addEventListener('change', () => { me.ms[+b.dataset.ms] = b.checked; store(); paintClaim(); });
  });
  ref.value = me.reflect || '';
  ref.addEventListener('input', () => { me.reflect = ref.value; store(); });
  function paintClaim() {
    const ready = boxes.every((b) => b.checked);
    claim.disabled = !ready || !!me.claimed;
    claim.textContent = me.claimed ? 'Badge claimed' : 'Claim the badge';
    why.textContent = me.claimed ? '' : ready ? 'Every milestone is ticked.' : 'Tick every milestone first.';
  }
  claim.addEventListener('click', () => { me.claimed = today(); store(); paintClaim(); paintBadge(); document.getElementById('pj-badge').scrollIntoView({ behavior: 'smooth', block: 'center' }); });

  // The badge, and the card to show the teacher.
  const builtWith = () => D.parts.flatMap((p, i) => p.uses.filter((u) => used[i].has(u.id)).map((u) => u.label)
    .concat(p.known.filter((k) => used[i].has(k.id) && !p.uses.some((u) => u.id === k.id)).map((k) => k.label)));
  function paintBadge() {
    const box = document.getElementById('pj-badge');
    box.hidden = !me.claimed;
    if (!me.claimed) return;
    document.getElementById('pj-when').textContent = `Claimed ${me.claimed}.`;
    const b = builtWith();
    document.getElementById('pj-used').textContent = b.length ? b.join(' · ') : 'run your code here to show what it uses';
  }
  const fill = (id, items) => { const ul = document.getElementById(id); ul.replaceChildren(...items.map((t) => Object.assign(document.createElement('li'), { textContent: t }))); };
  document.getElementById('pj-show').addEventListener('click', () => {
    document.getElementById('pjd-when').textContent = `Claimed ${me.claimed}`;
    const b = builtWith();
    fill('pjd-used', b.length ? b : ['(run the code on this page to list what it uses)']);
    fill('pjd-ms', D.milestones.filter((_, i) => me.ms[i]).map((m) => `✓ ${m}`));
    document.getElementById('pjd-reflect').textContent = me.reflect || '(not written yet)';
    const d = document.getElementById('pj-dialog');
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  });
  document.getElementById('pj-dl').addEventListener('click', () => {
    D.parts.forEach((p, i) => {
      const code = me.code[i];
      if (!code) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
      a.download = `${D.id}${D.parts.length > 1 ? `-${i + 1}` : ''}.${p.ext}`;
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    });
  });
  paintClaim(); paintSkills();
  window.__project = { used: () => used.map((s) => [...s]), state: () => me };
}
