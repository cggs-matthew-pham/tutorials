// Shared reference drawer for the playgrounds: a "Reference" button opens a drawer over the output side
// (the canvas or preview), so the editor stays in view for pasting. Cards show real code with a Copy button;
// nothing is inserted for the student. A filter shows "This lesson" by default (what the step's code uses,
// what the lesson unlocks, the lesson's modules and the student's own tools), or "All"; search covers names,
// hints and code. In a snippet's code, ‹text› marks a value to change: highlighted on the card, removed on copy.
import { scanModule, callText, defAtCursor } from './modules-scan.mjs';
import { snippetPattern } from './snippet-pattern.mjs';
export { snippetPattern };

const OPEN = '‹', CLOSE = '›';
const strip = (t) => String(t).split(OPEN).join('').split(CLOSE).join('');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Card code as HTML: placeholders become <mark> so students can see what to change. */
export const markPlaceholders = (code) => esc(code).replace(/‹([^›]*)›/g, '<mark class="ph" title="Change this">$1</mark>');

/** Pure: does this card text match every word of the search? */
export const matchesQuery = (text, q) => String(q).toLowerCase().split(/\s+/).filter(Boolean).every((w) => text.includes(w));

const idOf = (label) => String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Progress is per browser: { all: bool (teacher override), done: {step key: true}, unlocked: {"kind:id": true} }.
const STORE = 'wp-progress';
const loadProgress = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; } };

// A student's own tools (code they saved from the editor) travel with them across lessons, per browser.
const TOOLS_PREFIX = 'wp-mytools:';
const loadTools = (kind) => { try { return JSON.parse(localStorage.getItem(TOOLS_PREFIX + kind)) || []; } catch { return []; } };
const saveTools = (kind, tools) => { try { localStorage.setItem(TOOLS_PREFIX + kind, JSON.stringify(tools)); } catch { /* storage unavailable */ } };

const PASTE_KEY = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? '⌘V' : 'Ctrl+V';

/** Copy text; fall back to a hidden textarea where the async clipboard is not allowed (file://, old browsers). */
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* fall back */ }
  const t = document.createElement('textarea');
  t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
  document.body.append(t); t.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  t.remove();
  return ok;
}

/**
 * Mounts the drawer. Returns a controller:
 *   setStudentModules({name: source})  cards for the student's own module tabs
 *   isLocked(id), onChange(fn)         lock state of a snippet or feature id ("save-as-button", "my-module")
 *   close()                            hide the drawer (the playground calls it on Run)
 * Options:
 *   host       the element the drawer covers (the output side); it falls back to after the toolbar
 *   lesson     { slug, code } for the "This lesson" filter: the lesson's slug and the step's starter code
 *   modules    the lesson's {name: source}
 *   openCopy(name, source)  make an editable copy of a lesson module (offered once "my-module" is unlocked)
 *   openModule(name)        show a student module's tab
 *   closeOnPaste            close the drawer when the student pastes into the editor (a live preview should show at once)
 */
export async function mountSnippets({ toolbar, textarea, kind, before = null, host = null, lesson = null, url = 'snippets.json', modules = {}, openCopy = null, openModule = null, closeOnPaste = false }) {
  let data;
  try { data = await (await fetch(url, { cache: 'no-cache' })).json(); } catch { return null; }
  // Snippets that some lesson step unlocks start locked; the rest are always available.
  let claims = {};
  try { claims = await (await fetch('unlocks.json', { cache: 'no-cache' })).json(); } catch { /* no lessons claim any */ }
  // The create page's preview passes this lesson's own locks: ?locks=id~Step title|id~Step title
  const lp = new URLSearchParams(location.search).get('locks');
  if (lp) for (const pair of lp.split('|')) { const [id, step] = pair.split('~'); if (id) claims[id] = { lesson: 'this lesson', here: true, step: step || 'a step' }; }
  // Teacher override: ?unlock=all shows everything (remembered in this browser); ?unlock=off resets it.
  const ov = new URLSearchParams(location.search).get('unlock');
  if (ov) { const p = loadProgress(); p.all = ov === 'all'; try { localStorage.setItem(STORE, JSON.stringify(p)); } catch { /* ignore */ } }
  // Free play (the playground page): its own "unlock all" toggle, which never touches the lessons' progress.
  const free = new URLSearchParams(location.search).get('free') === '1';
  const isLocked = (id) => {
    if (!claims[id]) return false;
    const p = loadProgress();
    return !(p.all || (free && p.free) || (p.unlocked || {})[`${kind}:${id}`]);
  };
  const inThisLesson = (id) => !!claims[id] && (claims[id].here || (lesson?.slug && claims[id].slug === lesson.slug));
  const changeCallbacks = [];

  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'btn snippets-toggle'; btn.id = 'snippets-toggle';
  btn.textContent = 'Reference'; btn.title = 'Code you can copy, then paste into your program';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'snippets-panel');
  if (before) toolbar.insertBefore(btn, before); else toolbar.prepend(btn);

  // ---------- the drawer: header (title, close, search, filter), then the cards ----------
  const panel = document.createElement('div');
  panel.id = 'snippets-panel'; panel.className = 'snippets-panel' + (host ? ' drawer' : ''); panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Reference');
  const hasLesson = !!lesson?.slug;
  panel.innerHTML = `<div class="ref-top">
    <div class="ref-titlebar"><h2>Reference</h2><button type="button" class="ref-close" aria-label="Close reference" title="Close (Esc)">×</button></div>
    <input type="search" class="ref-search" placeholder="Search: a name, or what it does (turn, colour…)" aria-label="Search the reference">
    <div class="ref-filter" role="radiogroup" aria-label="Show">
      <button type="button" role="radio" data-f="lesson"${hasLesson ? '' : ' hidden'}>This lesson</button><button type="button" role="radio" data-f="all">All</button>
    </div>
    <p class="note" aria-live="polite"></p>
  </div>
  <div class="ref-body"><p class="ref-intro">Copy what you need, then paste it into your code with <kbd>${PASTE_KEY}</kbd>. <mark class="ph">Highlighted</mark> values are yours to change.</p><p class="ref-empty" hidden></p></div>`;
  const body = panel.querySelector('.ref-body'), search = panel.querySelector('.ref-search');
  const note = panel.querySelector('.note'), empty = panel.querySelector('.ref-empty');
  const say = (text) => { note.textContent = text; clearTimeout(say.t); say.t = setTimeout(() => (note.textContent = ''), 4000); };
  let filter = hasLesson ? 'lesson' : 'all';

  let cards = []; // { el, id, hint, dyn, text, lessonFixed, pattern }

  /** A card: name, hint, then one or more code parts (each with its own Copy), then any extra actions. */
  // Pictures of what each snippet's example draws (built by tools/render-pictures.mjs), loaded on first use.
  let pics = null;
  const picsBase = new URL(kind === 'html' ? '../_pictures/html/' : '../_pictures/', location.href); // HTML ids can repeat turtle ones
  const loadPics = () => (pics ||= fetch(new URL('pictures.json', picsBase), { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({})));

  function card({ id, label, hint, parts, dyn = false, actions = [], ours = false, pattern = null, example = '', shows = '' }) {
    const c = document.createElement('div'); c.className = 'ref-card'; c.dataset.id = id;
    const head = document.createElement('div'); head.className = 'ref-head';
    const name = document.createElement('span'); name.className = 'ref-name'; name.textContent = label;
    head.append(name, ...actions);
    c.append(head);
    if (hint) { const h = document.createElement('p'); h.className = 'ref-hint'; h.textContent = hint; c.append(h); }
    const lock = document.createElement('p'); lock.className = 'ref-lock'; c.append(lock);
    const codeRow = (part, into) => {
      if (part.note) { const n = document.createElement('p'); n.className = 'ref-where'; n.textContent = part.note; into.append(n); }
      const row = document.createElement('div'); row.className = 'ref-code';
      const pre = document.createElement('pre'); pre.innerHTML = markPlaceholders(part.code.replace(/\n$/, ''));
      const cp = document.createElement('button'); cp.type = 'button'; cp.className = 'snippet copy'; cp.textContent = 'Copy';
      cp.setAttribute('aria-label', `Copy ${label}${part.note ? `: ${part.note}` : ''}`);
      cp.addEventListener('click', async () => {
        if (isLocked(id)) return;
        const ok = await copyText(strip(part.code).replace(/\n$/, ''));
        if (ok) { cp.textContent = 'Copied'; setTimeout(() => (cp.textContent = 'Copy'), 1500); say(`Copied. Click where it belongs in your code and paste with ${PASTE_KEY}.`); }
        else { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); say('Copying is blocked here: the code is selected, so copy it yourself.'); }
      });
      row.append(pre, cp);
      into.append(row);
    };
    for (const part of parts) codeRow(part, c);
    if (example) { // "Example": a short program that uses it, and a picture of what that draws (one card at a time)
      const box = document.createElement('div'); box.className = 'ref-example'; box.hidden = true;
      const fig = document.createElement('figure'); fig.hidden = true;
      const img = document.createElement('img'); img.alt = `What the ${label} example ${kind === 'html' ? 'shows' : 'draws'}`;
      fig.append(img);
      if (shows) { const cap = document.createElement('figcaption'); cap.textContent = shows; fig.append(cap); }
      codeRow({ code: example, note: 'Example' }, box);
      box.append(fig);
      const tb = small('Example', 'Show an example and what it draws', async () => {
        box.hidden = !box.hidden;
        tb.textContent = box.hidden ? 'Example' : 'Hide example'; tb.setAttribute('aria-expanded', String(!box.hidden));
        if (!box.hidden && !img.src) {
          const p = (await loadPics())[id];
          if (p) { img.src = new URL(`${id}.png?v=${p.hash || ''}`, picsBase).href; const d = (p.div || 5.2) * 4 / 5.2; img.width = Math.round(p.w / d); img.height = Math.round(p.h / d); fig.hidden = false; }
        }
      });
      tb.classList.add('ref-ex-btn'); tb.setAttribute('aria-expanded', 'false');
      head.append(tb); c.append(box);
    }
    const text = [label, hint || '', shows, ...parts.map((p) => strip(p.code))].join(' ').toLowerCase();
    cards.push({ el: c, id, hint, dyn, text, ours, pattern });
    return c;
  }
  // Groups the student opened or closed stay that way when the drawer re-renders or the filter changes back.
  const opened = new Map();
  let syncing = false;
  function group(title, open = false) {
    const det = document.createElement('details'); det.className = 'ref-group'; det.dataset.title = title; det.dataset.open = String(open);
    det.open = opened.has(title) ? opened.get(title) : open;
    det.addEventListener('toggle', () => { if (!syncing) opened.set(title, det.open); });
    const sum = document.createElement('summary'); sum.textContent = title; det.append(sum);
    const grid = document.createElement('div'); grid.className = 'ref-grid'; det.append(grid);
    return [det, grid];
  }
  const small = (label, title, fn) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'snippet small'; b.textContent = label; b.title = title; b.addEventListener('click', fn); return b; };

  for (const g of data.groups) {
    const [det, grid] = group(g.name);
    for (const item of g.items) grid.append(card({ id: idOf(item.label), label: item.label, hint: item.hint, parts: [{ code: item.code }], pattern: snippetPattern(item), example: item.example || '', shows: item.shows || '' }));
    body.append(det);
  }

  // Groups that change while the page is open: the student's own tools and modules, and the lesson's modules.
  const dynamic = document.createElement('div');
  body.prepend(dynamic);
  body.prepend(body.querySelector('.ref-intro'));
  if (host) { host.classList.add('ref-host'); host.append(panel); } else toolbar.after(panel);
  let studentModules = {};

  function moduleGroup(mod, source, owned) {
    const fns = scanModule(source);
    if (!fns.length && !owned) return null;
    const [det, grid] = group(owned ? `My module: ${mod}` : `Module: ${mod}`, owned);
    const bar = document.createElement('div'); bar.className = 'ref-bar';
    if (owned) {
      if (openModule) bar.append(small(`Edit ${mod}.py`, 'Open this module in its tab', () => { openModule(mod); close(); }));
    } else {
      bar.append(small('Show how it works', `Read the code inside ${mod}.py`, () => showSource(mod, source)));
    }
    det.insertBefore(bar, grid);
    if (!fns.length) { const p = document.createElement('p'); p.className = 'ref-hint'; p.textContent = 'No functions with a """docstring""" yet. Each one you add shows up here.'; grid.append(p); }
    for (const fn of fns) {
      grid.append(card({
        id: `${mod}.${fn.name}`, label: `${fn.name}()`, hint: fn.doc, dyn: true, ours: true,
        parts: [
          { note: '1. At the top of main.py', code: `from ${mod} import ${fn.name}` },
          { note: '2. Where you want it to run', code: callText(fn) },
        ],
      }));
    }
    return det;
  }

  function toolsGroup() {
    const tools = loadTools(kind);
    const [det, grid] = group('My tools', true);
    det.dataset.always = 'true';
    tools.forEach((t, i) => {
      grid.append(card({
        id: `tool:${i}`, label: t.label, dyn: true, ours: true, parts: [{ code: t.code }],
        actions: [
          small('Edit', `Change "${t.label}"`, () => editTool(i)),
          small('×', `Remove "${t.label}"`, () => { if (!confirm(`Remove "${t.label}" from My tools?`)) return; const all = loadTools(kind); all.splice(i, 1); saveTools(kind, all); renderDynamic(); }),
        ],
      }));
    });
    const save = document.createElement('button');
    save.type = 'button'; save.className = 'snippet save'; save.textContent = 'Save selection to My tools'; save.dataset.id = 'save-as-button';
    save.addEventListener('click', () => {
      if (isLocked('save-as-button')) return;
      let sel = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
      if (!sel.trim()) sel = defAtCursor(textarea.value, textarea.selectionStart);
      if (!sel.trim()) { say('Select some code first, or put the cursor inside a def.'); return; }
      const m = sel.match(/^\s*def\s+([A-Za-z_]\w*)/);
      const label = (prompt('Name for this tool:', m ? m[1] : sel.trim().split('\n')[0].slice(0, 24)) || '').trim();
      if (!label) return;
      const all = loadTools(kind); all.push({ label, code: sel.replace(/\s+$/, '') + '\n' }); saveTools(kind, all);
      renderDynamic(); say(`Saved "${label}". Find it under My tools.`);
    });
    save.title = 'Select some code in the editor (or put the cursor in a def), then click to keep it under My tools.';
    grid.append(save);
    // Only show the save button and an empty group once saving is unlocked.
    det.dataset.save = 'true';
    return det;
  }

  function renderDynamic() {
    cards = cards.filter((x) => !x.dyn);
    dynamic.replaceChildren(toolsGroup());
    for (const [mod, source] of Object.entries(modules)) {
      if (studentModules[mod] !== undefined) continue; // the student's own module of the same name wins
      const g = moduleGroup(mod, source, false); if (g) dynamic.append(g);
    }
    for (const [mod, source] of Object.entries(studentModules)) { const g = moduleGroup(mod, source, true); if (g) dynamic.append(g); }
    refresh();
  }

  // ---------- filter and search ----------
  // Names the step's code uses: the starter, plus whatever is in the editor when the drawer opens.
  let usedText = '';
  const inLesson = (c) => c.ours || inThisLesson(c.id) || (!!c.pattern && c.pattern.test(usedText));
  function apply() {
    const q = search.value.trim().toLowerCase();
    const focused = filter === 'lesson' || !!q;
    let shown = 0, inAll = 0;
    for (const c of cards) {
      const hit = !q || matchesQuery(c.text, q);
      if (hit) inAll++;
      const show = hit && (filter === 'all' || inLesson(c));
      c.el.hidden = !show;
      if (show) shown++;
    }
    syncing = true;
    for (const det of panel.querySelectorAll('details.ref-group')) {
      const any = [...det.querySelectorAll('.ref-card')].some((el) => !el.hidden);
      const keep = det.dataset.always === 'true' && !q && !isLocked('save-as-button');
      det.hidden = !any && !keep;
      if (!det.hidden) det.open = focused ? true : (opened.has(det.dataset.title) ? opened.get(det.dataset.title) : det.dataset.open === 'true');
    }
    syncing = false;
    for (const b of panel.querySelectorAll('.ref-filter button')) b.setAttribute('aria-checked', String(b.dataset.f === filter));
    empty.replaceChildren();
    empty.hidden = shown > 0;
    if (!shown) {
      const more = filter === 'lesson' ? inAll : 0;
      empty.append(q ? `Nothing matches "${search.value.trim()}"${filter === 'lesson' ? ' in this lesson' : ''}.` : 'Nothing for this lesson yet.');
      if (more || (filter === 'lesson' && !q)) {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'snippet';
        b.textContent = q ? `Show ${more} in All` : 'Show All';
        b.addEventListener('click', () => { filter = 'all'; apply(); });
        empty.append(' ', b);
      }
    }
  }
  search.addEventListener('input', apply);
  panel.querySelector('.ref-filter').addEventListener('click', (e) => { const f = e.target.closest('button')?.dataset.f; if (f) { filter = f; apply(); } });
  search.addEventListener('keydown', (e) => { if (e.key === 'Escape' && search.value) { e.stopPropagation(); search.value = ''; apply(); } });

  function refresh() {
    for (const c of cards) {
      const locked = isLocked(c.id);
      c.el.classList.toggle('locked', locked);
      c.el.setAttribute('aria-disabled', String(locked));
      c.el.querySelector('.ref-lock').textContent = locked ? `Unlocks in ${claims[c.id].lesson}: ${claims[c.id].step}` : '';
    }
    const save = panel.querySelector('.snippet.save');
    if (save) { const l = isLocked('save-as-button'); save.hidden = l; }
    apply();
    changeCallbacks.forEach((f) => f());
  }
  renderDynamic();
  window.addEventListener('storage', (e) => { if (e.key === STORE) refresh(); }); // a check passed in the lesson page

  // One dialog for reading a module's source and for editing a saved tool.
  let dlg;
  function dialog() {
    if (!dlg) { dlg = document.createElement('dialog'); dlg.className = 'source-dialog'; document.body.append(dlg); }
    return dlg;
  }
  function showSource(mod, source) {
    const d = dialog();
    const canCopy = openCopy && !isLocked('my-module');
    d.innerHTML = `<form method="dialog"><h2>${esc(mod)}.py</h2><pre></pre><p class="ref-hint">${canCopy
      ? `Open a copy to change it. Your copy is a module of your own called ${esc(mod)}, and it replaces this one in your programs until you delete it.`
      : 'This is the code your program runs when it imports from this module.'}</p><div class="ref-bar">${canCopy ? '<button class="btn" value="copy">Open a copy to edit</button>' : ''}<button class="btn" value="close">Close</button></div></form>`;
    d.querySelector('pre').textContent = source;
    d.onclose = () => { if (d.returnValue === 'copy') { openCopy(mod, source); close(); } };
    d.returnValue = ''; d.showModal();
  }
  function editTool(i) {
    const all = loadTools(kind), t = all[i];
    if (!t) return;
    const d = dialog();
    d.innerHTML = `<form method="dialog"><h2>Edit tool</h2><label class="ref-field">Name <input name="label"></label><label class="ref-field">Code <textarea name="code" rows="10" spellcheck="false"></textarea></label><p class="ref-hint">This changes what you copy from now on. Code you already pasted into a program does not change: that copy has to be fixed where it is.</p><div class="ref-bar"><button class="btn" value="save">Save</button><button class="btn" value="cancel">Cancel</button></div></form>`;
    const f = d.querySelector('form');
    f.label.value = t.label; f.code.value = t.code;
    f.code.addEventListener('keydown', (e) => { if (e.key === 'Tab') { e.preventDefault(); f.code.setRangeText('    ', f.code.selectionStart, f.code.selectionEnd, 'end'); } });
    d.onclose = () => {
      if (d.returnValue !== 'save') return;
      const label = f.label.value.trim(), code = f.code.value.replace(/\s+$/, '');
      if (!label || !code) return;
      const now = loadTools(kind); now[i] = { label, code: code + '\n' }; saveTools(kind, now);
      renderDynamic(); say(`Saved "${label}".`);
    };
    d.returnValue = ''; d.showModal();
  }

  function open() {
    usedText = `${lesson?.code || ''}\n${textarea.value}`;
    panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
    apply();
    search.focus();
  }
  function close() {
    if (panel.hidden) return;
    panel.hidden = true; btn.setAttribute('aria-expanded', 'false');
    textarea.focus();
  }
  btn.addEventListener('click', () => (panel.hidden ? open() : close()));
  panel.querySelector('.ref-close').addEventListener('click', close);
  // A live preview (HTML) shows the result of a paste straight away, so the drawer gets out of the way.
  if (closeOnPaste) textarea.addEventListener('paste', () => { if (!panel.hidden) setTimeout(close, 0); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || dlg?.open) return;
    if (!panel.hidden) close();
    // Drawer already closed: tell the lesson page, which leaves full screen if this playground is in it.
    else if (window.parent !== window) { try { window.parent.postMessage({ wp: 'esc' }, location.origin); } catch { /* not embedded */ } }
  });

  return {
    setStudentModules(m) { studentModules = m || {}; renderDynamic(); },
    isLocked,
    onChange(f) { changeCallbacks.push(f); },
    close,
  };
}
