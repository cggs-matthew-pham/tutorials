// Trail map for a pathway page (<subject>/paths/<id>/): courses as waypoints, laid out from `after:`.
// Columns are steps along the trail (a course sits one column after its latest prerequisite); rows line a
// course up with what it follows. A prerequisite from another pathway (Flask needs HTML & CSS) is a portal
// node linking to that pathway. Built here; site/trail.js adds this browser's progress, the card and the lines.

// One id per course: its path when built, else its id, else its title.
const idOf = (c) => c.path || c.id || c.title;

// Pack nodes with target rows into whole rows 1..R, keeping their order, as close to the targets as they fit.
function pack(items, R) {
  const cl = [];
  for (const it of items) {
    cl.push({ items: [it], sum: it.t });
    for (;;) {
      const n = cl.length;
      if (n > 1) {
        const a = cl[n - 2], b = cl[n - 1];
        const sa = start(a, R), sb = start(b, R);
        if (sa + a.items.length > sb) { cl.splice(n - 2, 2, { items: a.items.concat(b.items), sum: a.sum + b.sum }); continue; }
      }
      break;
    }
  }
  for (const c of cl) c.items.forEach((it, i) => { it.node.row = start(c, R) + i; });
}
function start(c, R) {
  const n = c.items.length;
  return Math.min(Math.max(1, Math.round(c.sum / n - (n - 1) / 2)), R - n + 1);
}

/**
 * Lay out one pathway. dirs: built course folders (title, summary, meta). lessonCount(path): required lessons.
 * Returns { nodes, cols, rows, fcols } where each node has col, row, parents (ids) and what the page shows.
 */
export function layoutTrail(pw, pathways, dirs, lessonCount) {
  const courses = pw.courses || [];
  const here = new Map(courses.map((c) => [idOf(c), c]));
  const foundations = courses.filter((c) => (c.stage || 'foundations') === 'foundations').map(idOf);
  const nodes = new Map();
  for (const c of courses) {
    const d = c.path ? dirs.get(c.path) : null;
    const after = Array.isArray(c.after) ? c.after : [];
    // An extension that names nothing to do first follows the pathway's foundations.
    const parents = after.length ? after : (c.stage === 'extensions' ? foundations : []);
    nodes.set(idOf(c), {
      id: idOf(c), path: c.path || null, title: d ? d.title : c.title,
      tagline: c.tagline || d?.meta?.tagline || d?.summary || c.summary || '',
      stage: c.stage || 'foundations', soon: !c.path, lessons: c.path ? lessonCount(c.path) : 0,
      parents: parents.slice(), portal: false,
    });
  }
  // Prerequisites from another pathway become portal nodes.
  for (const n of [...nodes.values()]) {
    for (const ref of n.parents) {
      if (here.has(ref) || nodes.has(`portal:${ref}`)) continue;
      const owner = pathways.find((p) => (p.courses || []).some((c) => idOf(c) === ref));
      if (!owner) throw new Error(`pathway ${pw.id}: "after: ${ref}" names no course`);
      const c = owner.courses.find((x) => idOf(x) === ref);
      nodes.set(`portal:${ref}`, { id: `portal:${ref}`, path: null, title: c.path ? dirs.get(c.path)?.title || c.title : c.title, tagline: c.tagline || dirs.get(c.path)?.meta?.tagline || '', pathway: owner.title, pathwayId: owner.id, portal: true, parents: [] });
    }
    n.parents = n.parents.map((r) => (here.has(r) ? r : `portal:${r}`));
  }
  // Columns: one after the latest prerequisite on this trail; portals sit just before what needs them.
  const depth = (n, seen = new Set()) => {
    if (n.col != null) return n.col;
    if (seen.has(n.id)) throw new Error(`pathway ${pw.id}: "after:" goes round in a circle at ${n.id}`);
    seen.add(n.id);
    const inner = n.parents.map((p) => nodes.get(p)).filter((p) => !p.portal);
    n.col = inner.length ? Math.max(...inner.map((p) => depth(p, seen))) + 1 : (n.parents.length ? 1 : 0);
    return n.col;
  };
  const real = [...nodes.values()].filter((n) => !n.portal);
  real.forEach((n) => depth(n));
  for (const p of [...nodes.values()].filter((n) => n.portal)) {
    p.col = Math.min(...real.filter((n) => n.parents.includes(p.id)).map((n) => n.col)) - 1;
  }
  const shift = Math.min(...[...nodes.values()].map((n) => n.col));
  if (shift < 0) for (const n of nodes.values()) n.col -= shift;
  const cols = Math.max(...[...nodes.values()].map((n) => n.col)) + 1;
  const byCol = Array.from({ length: cols }, (_, i) => [...nodes.values()].filter((n) => n.col === i));
  const rows = Math.max(...byCol.map((c) => c.length));
  const order = [...nodes.keys()];
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
  // Forward: line each course up with its prerequisites. Portals wait for what needs them.
  for (const col of byCol) {
    const items = col.filter((n) => !n.portal).map((n) => {
      const ps = n.parents.map((p) => nodes.get(p)).filter((p) => !p.portal && p.row != null);
      return { node: n, t: ps.length ? mean(ps.map((p) => p.row)) : (rows + 1) / 2 };
    });
    items.sort((a, b) => a.t - b.t || order.indexOf(a.node.id) - order.indexOf(b.node.id));
    pack(items, rows);
  }
  // Backward: a course with follow-ons moves to the middle of them; then portals join what needs them.
  const kids = (n) => [...nodes.values()].filter((k) => k.parents.includes(n.id) && k.row != null);
  for (let c = cols - 2; c >= 0; c--) {
    const items = byCol[c].filter((n) => !n.portal).map((n) => { const ks = kids(n); return { node: n, t: ks.length ? mean(ks.map((k) => k.row)) : n.row }; });
    items.sort((a, b) => a.t - b.t || order.indexOf(a.node.id) - order.indexOf(b.node.id));
    pack(items, rows);
  }
  for (const col of byCol) {
    if (!col.some((n) => n.portal)) continue;
    const items = col.map((n) => ({ node: n, t: n.portal ? mean(kids(n).map((k) => k.row)) : n.row }));
    items.sort((a, b) => a.t - b.t || (a.node.portal ? 1 : -1));
    pack(items, rows);
  }
  const fcols = Math.max(0, ...real.filter((n) => n.stage === 'foundations').map((n) => n.col + 1));
  const list = [...nodes.values()].sort((a, b) => a.col - b.col || a.row - b.row);
  return { nodes: list, cols, rows, fcols };
}

/** The map's HTML (filled in by site/trail.js) and its data. up: from this page to the site root. */
export function trailHtml(layout, up, esc) {
  const { nodes, cols, rows, fcols } = layout;
  const zone = (cls, label, from, to) => (to > from ? `<p class="tzone ${cls}" style="grid-column:${from + 1} / ${to + 1};grid-row:${rows + 1}">${label}</p>` : '');
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const short = (t) => t.replace(/^Python Foundations with Turtle$/, 'Turtle').replace(/:.*$/, '');
  const nodeHtml = (n) => {
    const after = n.parents.length ? `<small class="tafter">After ${esc(n.parents.map((p) => short(byId.get(p).title)).join(' and '))}</small>` : '';
    const href = n.portal ? `../${esc(n.pathwayId)}/` : n.path ? `${esc(up + n.path)}/` : '';
    const tag = href ? 'a' : 'button';
    const meta = n.portal ? `${n.pathway} pathway` : n.soon ? 'Coming later' : `${n.lessons} ${n.lessons === 1 ? 'lesson' : 'lessons'}`;
    const kind = n.portal ? 'is-portal' : n.soon ? 'is-soon' : 'is-todo';
    const inner = n.portal ? '↗' : n.soon ? '' : String(n.lessons);
    return `<${tag} class="tnode ${kind}" data-id="${esc(n.id)}"${href ? ` href="${href}"` : ' type="button"'} style="grid-column:${n.col + 1};grid-row:${n.row};--c:${n.col}">` +
      `<span class="tdot" aria-hidden="true"><span class="tin">${esc(inner)}</span></span>` +
      `<span class="tlab"><span class="there" hidden></span><b>${esc(n.title)}</b><small class="tmeta">${esc(meta)}</small>${after}<span class="tline">${esc(n.tagline)}</span></span></${tag}>`;
  };
  const data = nodes.map((n) => ({ id: n.id, path: n.path, title: n.title, tagline: n.tagline, stage: n.stage, soon: !!n.soon, portal: n.portal, pathway: n.pathway || null, lessons: n.lessons || 0, parents: n.parents }));
  return `<section class="trail tbreak" aria-label="Trail map">` +
    `<div class="tcard" id="tcard" aria-live="polite"></div>` +
    `<div class="tscroll"><div class="tmap" id="tmap" style="--cols:${cols};--rows:${rows};--fz:${(100 * fcols / cols).toFixed(2)}%">` +
    `<svg class="tlines" aria-hidden="true"></svg>` +
    zone('tzf', 'Foundations', 0, fcols) +
    nodes.filter((n) => n.col < fcols).map(nodeHtml).join('') +
    zone('tze', 'Extensions', fcols, cols) +
    nodes.filter((n) => n.col >= fcols).map(nodeHtml).join('') +
    `</div></div></section>` +
    `<script type="application/json" id="trail-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export const TRAIL_CSS = `
.ptoggle{display:none;gap:2px;border:1px solid var(--line);border-radius:99px;padding:3px;background:var(--card);width:max-content;margin:4px 0 18px}
.js-on .ptoggle{display:inline-flex}
.ptoggle button{font:inherit;font-size:14px;font-weight:600;border:0;background:transparent;color:var(--ink);border-radius:99px;padding:8px 16px;min-height:40px;cursor:pointer}
.ptoggle button[aria-pressed=true]{background:var(--ink);color:var(--bg)}
.pview-map{display:none}.trail-on .pview-map{display:block}.trail-on .pview-list{display:none}
.tbreak{width:min(1080px,calc(100vw - 32px));position:relative;left:50%;transform:translateX(-50%)}
.tcard{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px;min-height:118px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 20px;margin:0 0 14px}
.tcard .tct{flex:999 1 360px;min-width:0}.tcard .tck{display:block;font-size:13px;color:var(--muted)}
.tcard h2{margin:2px 0 2px;font-size:1.3rem;line-height:1.25}.tcard p{margin:0;color:var(--muted)}
.tcard .tbar{display:flex;align-items:center;gap:10px;margin-top:8px;font-size:13px;color:var(--muted)}
.tcard .tbar i{display:block;width:160px;height:7px;border-radius:99px;background:var(--line);overflow:hidden}.tcard .tbar i i{width:0;height:100%;border-radius:0;background:var(--run)}
.tcard .tgo{flex:1 0 auto;display:flex;justify-content:flex-end}
.tcard .tbtn{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:10px;font-weight:700;text-decoration:none;background:var(--ink);color:var(--bg)}
.tcard .tbtn.here{background:var(--accent);color:#fff}.tcard .tbtn.again{background:transparent;color:var(--ink);border:1px solid var(--line)}
.tcard .tbtn:hover{filter:brightness(1.08)}
@media(prefers-color-scheme:dark){.tcard .tbtn.here{color:#1a1006}}
.tscroll{overflow-x:auto;border-radius:20px}
.tmap{--zf:color-mix(in srgb,var(--run) 11%,var(--bg));--ze:color-mix(in srgb,var(--modify) 9%,var(--bg));position:relative;display:grid;
grid-template-columns:repeat(var(--cols),minmax(220px,1fr));grid-template-rows:repeat(var(--rows),minmax(128px,auto)) auto;
min-width:calc(var(--cols) * 220px);padding:18px 8px 0;border-radius:20px;background:linear-gradient(90deg,var(--zf) 0 var(--fz),var(--ze) var(--fz) 100%)}
.tlines{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.tlines path{fill:none;stroke-linecap:round}
.tlines .walked{stroke:var(--ink);stroke-width:5}.tlines .open{stroke:var(--muted);stroke-width:3.5;stroke-dasharray:1 9}
.tlines .later{stroke:color-mix(in srgb,var(--muted) 55%,transparent);stroke-width:2.5;stroke-dasharray:7 8}
.tzone{margin:0;align-self:end;padding:10px 14px 14px;font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.tnode{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:6px;align-self:center;justify-self:center;margin:8px 6px;padding:0;border:0;background:none;font:inherit;color:inherit;text-align:center;text-decoration:none;cursor:pointer;border-radius:14px}
.tnode:focus-visible{outline:3px solid var(--investigate);outline-offset:4px}
.tdot{position:relative;flex:none;display:grid;place-items:center;width:54px;height:54px;border-radius:50%;box-sizing:border-box;border:3px solid var(--ink);background:var(--card);color:var(--ink);font-weight:700;font-size:15px;transition:transform .15s}
.tnode:hover .tdot,.tnode:focus-visible .tdot{transform:scale(1.07)}
.tdot svg{width:24px;height:24px}
.is-done .tdot{background:var(--ink);color:var(--bg)}
.is-going .tdot{border-color:var(--accent);color:var(--accent)}
.is-here .tdot{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 0 7px color-mix(in srgb,var(--accent) 20%,transparent)}
@media(prefers-color-scheme:dark){.is-here .tdot{color:#1a1006}}
.is-here .tdot::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:3px solid var(--accent);box-sizing:border-box;animation:tpulse 2.2s ease-out infinite}
@keyframes tpulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(2);opacity:0}}
.is-soon .tdot{border:3px dashed color-mix(in srgb,var(--muted) 70%,transparent);background:transparent;color:var(--muted)}
.is-portal .tdot{border-radius:14px;border-color:var(--investigate);color:var(--investigate);font-size:20px}
.tlab{display:flex;flex-direction:column;align-items:center;min-width:0;max-width:190px;line-height:1.25}
.tlab b{font-size:15px}.tmeta{font-size:13px;color:var(--muted);margin-top:2px}.is-soon .tlab b{color:var(--muted)}
.tline,.tafter{display:none}
.there{margin:4px 0 4px;font-size:12px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--ink);color:var(--bg)}
@media(prefers-reduced-motion:reduce){.is-here .tdot::after{animation:none;opacity:0}.tdot{transition:none}}
@media(max-width:640px){
.tbreak{width:auto;left:auto;transform:none}
.tmap{display:flex;flex-direction:column;min-width:0;padding:8px 6px 10px;background:var(--zf)}
.tnode{flex-direction:row;align-items:flex-start;gap:12px;justify-self:start;align-self:flex-start;text-align:left;margin:8px 0 8px calc(var(--c) * 14px)}.tlab{align-items:flex-start}
.tdot{width:46px;height:46px;font-size:14px}
.tlab{max-width:none}.tline{display:block;font-size:14px;color:var(--ink);margin-top:3px}.tafter{display:block;font-size:13px;color:var(--muted)}
.tzone{padding:12px 4px 2px;align-self:stretch}
.tcard .tgo{justify-content:flex-start}
}
`;
