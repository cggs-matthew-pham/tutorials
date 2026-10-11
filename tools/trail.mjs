// Trail map for a pathway page (<subject>/paths/<id>/): courses as waypoints, laid out from `after:`.
// Columns are steps along the trail (a course sits one column after its latest prerequisite); rows line a
// course up with what it follows. A prerequisite from another pathway (Flask needs HTML & CSS) is a portal
// node linking to that pathway. Built here; site/trail.js adds this browser's progress, the card and the lines.

// One id per course: its path when built, else its id, else its title.
const idOf = (c) => (c.unit ? c.id : c.path || c.id || c.title);

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
export function layoutTrail(pw, pathways, dirs, lessonCount, opts = {}) {
  // opts.stops === 'units' (a subject's `trail: units`): each unit of a course is a stop, named by the unit
  // (one curriculum standard each in science), with the course's year as a small label.
  if (opts.stops === 'expand') return layoutTrailExpand(pw, pathways, dirs, lessonCount);
  if (opts.stops === 'units') return layoutTrailUnits(pw, pathways, dirs, lessonCount);
  return layoutCourses(pw, pathways, dirs, lessonCount);
}

// Courses split into their units, then laid out with the course layout (units chain within a course; a course's
// first unit follows the last unit of each course it comes after; another pathway's course stays one portal).
function layoutTrailUnits(pw, pathways, dirs, lessonCount) {
  const all = pathways.flatMap((p) => p.courses || []);
  const refId = (r) => (r.includes('#') ? r : idOf(all.find((x) => x.id === r || x.path === r) || { id: r }));
  const here = new Set((pw.courses || []).map(idOf));
  const unitsOf = (c) => {
    const d = c.path ? dirs.get(c.path) : null;
    const us = (Array.isArray(d?.meta?.units) ? d.meta.units : []).filter((u) => lessonCount(c.path, u.id) > 0);
    return us.length ? us : null;
  };
  const lastOf = (ref) => { const c = all.find((x) => idOf(x) === ref); const us = c && unitsOf(c); return us ? `${ref}#${us[us.length - 1].id}` : ref; };
  const courses = [];
  const foundations = (pw.courses || []).filter((c) => (c.stage || 'foundations') === 'foundations').map(idOf);
  for (const c of pw.courses || []) {
    const us = unitsOf(c);
    const after = (Array.isArray(c.after) ? c.after : []).map(refId);
    const first = (after.length ? after : (c.stage === 'extensions' ? foundations : [])).map((r) => (here.has(r) ? lastOf(r) : r));
    if (!us) { courses.push({ ...c, after: first }); continue; }
    const d = dirs.get(c.path);
    // The small label is the course's year when its title starts with one (science); otherwise none (maths).
    const year = (d.title.match(/^(Years? [0-9]+(?: and [0-9]+)?)/) || [])[1] || null;
    us.forEach((u, i) => courses.push({
      id: `${idOf(c)}#${u.id}`, path: c.path, unit: u.id, group: year, stage: c.stage,
      title: u.title, tagline: String(u.summary || '').replace(/\s*\((?:AC9|Year)[^)]*\)\s*\.?$/, '.').replace(/\.\.$/, '.'),
      after: i ? [`${idOf(c)}#${us[i - 1].id}`] : first, lessons: lessonCount(c.path, u.id),
    }));
  }
  const pw2 = { ...pw, courses };
  const others = pathways.map((p) => (p === pw ? pw2 : p));
  return layoutCourses(pw2, others, dirs, lessonCount);
}

const cleanSummary = (t) => String(t || '').replace(/\s*\((?:AC9|Year)[^)]*\)\s*\.?$/, '.').replace(/\.\.$/, '.');

// Expandable trail (a subject's `trail: units`, on its pathway pages): one stop per course, laid out as the
// course trail. A course with two or more units can open into an area headed by the course's name, its units as
// stops snaking inside (per to a row); site/trail.js opens one at a time (the current course, else the first).
function layoutTrailExpand(pw, pathways, dirs, lessonCount) {
  const base = layoutCourses(pw, pathways, dirs, lessonCount);
  const per = base.cols <= 3 ? 3 : 2;
  const hasKids = (n) => base.nodes.some((k) => k.parents.includes(n.id));
  for (const n of base.nodes) {
    if (n.portal || n.soon || !n.path) continue;
    const d = dirs.get(n.path);
    const us = (Array.isArray(d?.meta?.units) ? d.meta.units : []).filter((u) => lessonCount(n.path, u.id) > 0);
    if (us.length < 2) continue;
    // Stops snake row by row. The trail leaves an area on the right, so the last row should run left to right
    // and end in the right-hand column: prefer a row width that gives an odd number of rows; failing that, a
    // course nothing leads into may start right to left instead. A short last row sits against the right.
    const m = us.length;

    let p = Math.min(per, m);
    for (let q = p; q >= 2; q--) if (Math.ceil(m / q) % 2) { p = q; break; }
    const rows = Math.ceil(m / p);
    const flip = rows % 2 === 0 && hasKids(n) && !n.parents.length;
    n.per = p;
    n.units = us.map((u, i) => {
      const r = Math.floor(i / p), inRow = r === rows - 1 ? m - r * p : p, k = i - r * p;
      const ltr = (r % 2 === 0) !== flip;
      const c = ltr ? p - inRow + k : p - 1 - k;
      return { id: `${n.id}#${u.id}`, unit: u.id, title: u.title, tagline: cleanSummary(u.summary), lessons: lessonCount(n.path, u.id), acol: c, arow: r };
    });
  }
  return { ...base, expand: true, per };
}

function layoutCourses(pw, pathways, dirs, lessonCount) {
  const courses = pw.courses || [];
  const here = new Map(courses.map((c) => [idOf(c), c]));
  const foundations = courses.filter((c) => (c.stage || 'foundations') === 'foundations').map(idOf);
  const nodes = new Map();
  for (const c of courses) {
    const d = c.path ? dirs.get(c.path) : null;
    // after: may name a course by its id as well as its path (maths does); use the one id per course.
    const after = (Array.isArray(c.after) ? c.after : []).map((r) => (r.includes('#') ? r : idOf(pathways.flatMap((p) => p.courses || []).find((x) => x.id === r) || { id: r })));
    // An extension that names nothing to do first follows the pathway's foundations.
    const parents = after.length ? after : (c.stage === 'extensions' ? foundations : []);
    nodes.set(idOf(c), {
      id: idOf(c), path: c.path || null, title: c.unit ? c.title : d ? d.title : c.title, unit: c.unit || null, group: c.group || null,
      tagline: c.tagline || d?.meta?.tagline || d?.summary || c.summary || '',
      stage: c.stage || 'foundations', soon: !c.path, lessons: c.unit ? c.lessons : c.path ? lessonCount(c.path) : 0,
      parents: parents.slice(), portal: false,
    });
  }
  // Prerequisites from another pathway become portal nodes.
  for (const n of [...nodes.values()]) {
    for (const ref of n.parents) {
      if (here.has(ref) || nodes.has(`portal:${ref}`)) continue;
      const [cref, uref] = ref.split('#');
      const owner = pathways.find((p) => (p.courses || []).some((c) => idOf(c) === cref));
      if (!owner) throw new Error(`pathway ${pw.id}: "after: ${ref}" names no course`);
      const c = owner.courses.find((x) => idOf(x) === cref);
      const unit = uref ? (dirs.get(c.path)?.meta?.units || []).find((u) => u.id === uref) : null;
      if (uref && !unit) throw new Error(`pathway ${pw.id}: "after: ${ref}" names no unit of ${cref}`);
      nodes.set(`portal:${ref}`, { id: `portal:${ref}`, path: null, title: unit ? unit.title : c.path ? dirs.get(c.path)?.title || c.title : c.title, tagline: unit ? String(unit.summary || '').replace(/\s*\((?:AC9|Year)[^)]*\)\s*\.?$/, '.') : c.tagline || dirs.get(c.path)?.meta?.tagline || '', pathway: owner.title, pathwayId: owner.id, portal: true, parents: [] });
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
    const href = n.portal ? `../${esc(n.pathwayId)}/` : n.path ? `${esc(up + n.path)}/${n.unit ? `#unit-${esc(n.unit)}` : ''}` : '';
    const tag = href ? 'a' : 'button';
    const meta = n.portal ? `${n.pathway} pathway` : n.soon ? 'Coming later' : `${n.group ? `${n.group} · ` : ''}${n.lessons} ${n.lessons === 1 ? 'lesson' : 'lessons'}`;
    const kind = n.portal ? 'is-portal' : n.soon ? 'is-soon' : 'is-todo';
    const inner = n.portal ? '↗' : n.soon ? '' : String(n.lessons);
    return `<${tag} class="tnode ${kind}${n.units ? ' has-units' : ''}" data-id="${esc(n.id)}"${href ? ` href="${href}"` : ' type="button"'} style="grid-column:${n.col + 1};grid-row:${n.row};--c:${n.col}">` +
      `<span class="tdot" aria-hidden="true"><span class="tin">${esc(inner)}</span></span>` +
      `<span class="tlab"><span class="there" hidden></span><b>${esc(n.title)}</b><small class="tmeta">${esc(meta)}</small>${after}<span class="tline">${esc(n.tagline)}</span></span></${tag}>`;
  };
  // An expandable course: its area (hidden until site/trail.js opens it) follows the course's stop.
  const unitHtml = (n, u) => `<a class="tnode tunit is-todo" data-id="${esc(u.id)}" href="${esc(up + n.path)}/#unit-${esc(u.unit)}" style="grid-column:${u.acol + 1};grid-row:${u.arow + 1}">` +
    `<span class="tdot" aria-hidden="true"><span class="tin">${u.lessons}</span></span>` +
    `<span class="tlab"><span class="there" hidden></span><b>${esc(u.title)}</b><small class="tmeta">${u.lessons} ${u.lessons === 1 ? 'lesson' : 'lessons'}</small><span class="tline">${esc(u.tagline)}</span></span></a>`;
  const areaHtml = (n) => (n.units ? `<section class="tarea" data-area="${esc(n.id)}" hidden style="grid-column:${n.col + 1};grid-row:${n.row};--c:${n.col};--per:${n.per}" aria-label="${esc(n.title)}">` +
    `<h3 class="tatitle">${esc(n.title)}</h3><div class="tastops">${n.units.map((u) => unitHtml(n, u)).join('')}</div></section>` : '');
  const stopHtml = (n) => nodeHtml(n) + areaHtml(n);
  const data = nodes.map((n) => ({ units: n.units ? n.units.map((u) => ({ id: u.id, unit: u.unit, title: u.title, tagline: u.tagline, lessons: u.lessons })) : null, id: n.id, path: n.path, unit: n.unit || null, group: n.group || null, title: n.title, tagline: n.tagline, stage: n.stage, soon: !!n.soon, portal: n.portal, pathway: n.pathway || null, lessons: n.lessons || 0, parents: n.parents }));
  const narrow = nodes.some((n) => n.unit);
  return `<section class="trail tbreak" aria-label="Trail map">` +
    `<div class="tcard" id="tcard" aria-live="polite"></div>` +
    `<div class="tscroll"><div class="tmap${narrow ? ' tunits' : ''}${layout.expand ? ' texp' : ''}" id="tmap" style="--cols:${cols};--rows:${rows};--per:${layout.per || 2};--fz:${(100 * fcols / cols).toFixed(2)}%">` +
    `<svg class="tlines" aria-hidden="true"></svg>` +
    zone('tzf', 'Foundations', 0, fcols) +
    nodes.filter((n) => n.col < fcols).map(stopHtml).join('') +
    zone('tze', 'Extensions', fcols, cols) +
    nodes.filter((n) => n.col >= fcols).map(stopHtml).join('') +
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
.tmap.tunits{grid-template-columns:repeat(var(--cols),minmax(132px,1fr));min-width:calc(var(--cols) * 132px)}.tunits .tlab{max-width:128px}.tunits .tlab b{font-size:14px}.tunits .tmeta{font-size:12.5px}
.tmap.texp{grid-template-columns:repeat(var(--cols),minmax(200px,auto))}
.tarea{position:relative;z-index:1;align-self:center;justify-self:stretch;margin:6px 4px;padding:10px 4px 6px;border-radius:16px;border:2px solid color-mix(in srgb,var(--accent) 40%,var(--line));background:color-mix(in srgb,var(--card) 85%,transparent)}
.tarea[hidden]{display:none}.tnode.is-open{display:none}
.tatitle{margin:0 10px;font-size:12.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);line-height:1.3;text-align:center}
.tastops{display:grid;grid-template-columns:repeat(var(--per),minmax(112px,1fr));margin-top:10px}
.tunit{margin:6px 2px}.tunit .tdot{width:44px;height:44px;font-size:14px}.tunit .tlab{max-width:118px}.tunit .tlab b{font-size:13.5px}.tunit .tmeta{font-size:12.5px}
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
.tarea{margin:4px 0 8px calc(min(var(--c),2) * 14px);padding:8px 8px 4px}.tatitle{text-align:left;margin:0 4px}.tastops{display:flex;flex-direction:column;margin-top:4px}
.tunit{margin:6px 0;align-self:stretch}.tunit .tlab{max-width:none;flex:1;min-width:0}.tunit .tlab b{font-size:15px}.tunit .tafter{display:none}
.tmap.tunits{min-width:0}.tunits .tnode{margin-left:calc(min(var(--c),2) * 14px)}.tunits .tafter{display:none}.tunits .tlab{max-width:none;flex:1;min-width:0}.tunits .tlab b{font-size:15px}.tunits .tnode{align-self:stretch;max-width:calc(100% - min(var(--c),2) * 14px)}
.tcard .tgo{justify-content:flex-start}
}
`;

/** A small picture of a pathway's trail for its trailhead card: dots and lines only, marked by site/trailheads.js. */
export function trailThumb(layout, esc) {
  const { nodes, cols, rows } = layout;
  const X = (n) => 18 + n.col * 64, Y = (n) => 14 + (n.row - 1) * 26;
  const w = 36 + (cols - 1) * 64, h = 28 + (rows - 1) * 26;
  const by = new Map(nodes.map((n) => [n.id, n]));
  const edges = nodes.flatMap((n) => n.parents.map((p) => {
    const a = by.get(p), x1 = X(a), y1 = Y(a), x2 = X(n), y2 = Y(n), m = (x2 - x1) / 2;
    return `<path data-from="${esc(p)}" data-to="${esc(n.id)}" class="${n.soon ? 'later' : 'open'}" d="M${x1} ${y1} C${x1 + m} ${y1} ${x2 - m} ${y2} ${x2} ${y2}"/>`;
  })).join('');
  const dots = nodes.map((n) => (n.portal
    ? `<rect data-id="${esc(n.id)}" class="tp" x="${X(n) - 6}" y="${Y(n) - 6}" width="12" height="12" rx="3"/>`
    : `<circle data-id="${esc(n.id)}" class="${n.soon ? 'ts' : 'tt'}" cx="${X(n)}" cy="${Y(n)}" r="7"/>`)).join('');
  return `<svg class="ththumb" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${edges}${dots}</svg>`;
}

/** The subject page with trail: true: Continue, one trailhead card per pathway, and the list for teachers. */
export function trailheadsHtml(pathways, layouts, esc) {
  const cards = pathways.map((pw, i) => `<a class="thead" href="paths/${esc(pw.id)}/" data-pw="${esc(pw.id)}">` +
    `<h2>${esc(pw.title)}</h2>${pw.summary ? `<p class="thsum">${esc(pw.summary)}</p>` : ''}` +
    `<span class="thpic">${trailThumb(layouts[i], esc)}</span>` +
    (pw.fit ? `<p class="thfit">${esc(pw.fit)}</p>` : '') +
    `<span class="thprog" hidden></span><span class="thgo">Open the ${esc(pw.title)} trail →</span></a>`).join('');
  const data = pathways.map((pw, i) => ({ id: pw.id, title: pw.title, nodes: layouts[i].nodes.filter((n) => !n.portal).map((n) => ({ id: n.id, path: n.path, unit: n.unit || null, title: n.title, soon: !!n.soon })) }));
  return `<div class="tbreak"><a class="thcont" id="thcont" hidden></a><div class="theads">${cards}</div></div>` +
    `<script type="application/json" id="trailheads-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export const TRAILHEADS_CSS = `
.thcont{display:grid;gap:2px;margin:6px 0 18px;padding:16px 20px;border-radius:14px;text-decoration:none;color:#fff;background:var(--accent)}
.thcont[hidden]{display:none}.thcont small{font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;opacity:.9}.thcont b{font-size:1.2rem}.thcont span{font-size:15px;opacity:.95}
.thcont:hover{filter:brightness(1.06)}@media(prefers-color-scheme:dark){.thcont{color:#1a1006}}
.theads{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:4px 0 24px}
.thead{display:flex;flex-direction:column;gap:8px;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 20px;text-decoration:none;color:inherit}
.thead:hover{border-color:var(--accent)}.thead:focus-visible{outline:3px solid var(--investigate);outline-offset:3px}
.thead h2{margin:0;font-size:1.4rem}.thsum{margin:0;color:var(--muted);font-size:15px;line-height:1.45}
.thpic{display:block;border-radius:12px;padding:10px 8px;background:linear-gradient(90deg,color-mix(in srgb,var(--run) 10%,var(--bg)),color-mix(in srgb,var(--modify) 8%,var(--bg)));overflow:hidden}
.ththumb{display:block;max-width:100%;height:auto;margin:0 auto}
.ththumb path{fill:none;stroke-linecap:round}.ththumb .open{stroke:var(--muted);stroke-width:2;stroke-dasharray:1 5}.ththumb .later{stroke:color-mix(in srgb,var(--muted) 50%,transparent);stroke-width:1.5;stroke-dasharray:4 4}.ththumb .walked{stroke:var(--ink);stroke-width:3;stroke-dasharray:none}
.ththumb circle{stroke-width:2.5}.ththumb .tt{fill:var(--card);stroke:var(--ink)}.ththumb .ts{fill:none;stroke:color-mix(in srgb,var(--muted) 70%,transparent);stroke-dasharray:3 3}
.ththumb .tp{fill:var(--card);stroke:var(--investigate);stroke-width:2}.ththumb .done{fill:var(--ink)}.ththumb .going{stroke:var(--accent);fill:var(--card)}.ththumb .here{fill:var(--accent);stroke:var(--accent)}
.thfit{margin:0;font-size:14.5px;line-height:1.45}.thprog{font-size:13.5px;color:var(--muted)}.thprog[hidden]{display:none}
.thgo{margin-top:auto;font-weight:700;color:var(--accent);font-size:15px}
`;
