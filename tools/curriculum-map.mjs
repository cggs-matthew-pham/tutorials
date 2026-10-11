// Curriculum map for a subject (/<subject>/map/): every Years 7–10 descriptor from data/curriculum/<subject>.json
// in a grid of strands (rows) by years (columns), each tile showing its waypoints and which have lessons (from the
// lessons' `node:`). site/curriculum-map.js adds this browser's progress, the card, and the "builds on" and
// "leads to" lines for the descriptor in focus. Built here; tools/import-curriculum.mjs makes the data.
import { readFileSync, existsSync } from 'node:fs';

export const STRANDS = { maths: ['Number', 'Algebra', 'Measurement', 'Space', 'Statistics', 'Probability'] };

export function loadCurriculum(subject) {
  const f = `data/curriculum/${subject}.json`;
  return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
}

/**
 * The map page body. lessons: [{ slug, title, node: ['AC9M7A01 n2', …], course }] for the subject.
 * up: from the map page to the site root.
 */
export function curriculumMapHtml(subject, cur, lessons, up, esc) {
  const strands = STRANDS[subject] || [...new Set(cur.descriptors.map((d) => d.strand))];
  const ds = cur.descriptors;
  const byCode = new Map(ds.map((d) => [d.code, d]));
  // Lessons per node ("AC9M7A01 n2") and per whole descriptor ("AC9M7N07").
  const L = [], perNode = new Map(), perCode = new Map();
  for (const l of lessons) {
    for (const ref of l.node || []) {
      const m = String(ref).match(/^(AC9\S+?)(?:\s+n(\d+))?$/);
      if (!m || !byCode.has(m[1])) continue;
      let i = L.findIndex((x) => x.slug === l.slug);
      if (i < 0) { i = L.length; L.push({ slug: l.slug, title: l.title, href: `${up}${l.slug}/`, course: l.course }); }
      const k = m[2] ? `${m[1]} n${m[2]}` : m[1];
      const into = m[2] ? perNode : perCode;
      into.set(k, [...(into.get(k) || []), i]);
    }
  }
  const short = (c) => c.replace(/^AC9[A-Z]/, '');
  const nodeLessons = (d, n) => [...(perNode.get(`${d.code} n${n.n}`) || []), ...(perCode.get(d.code) || [])];
  const hasLessons = (d) => d.nodes.some((n) => nodeLessons(d, n).length);
  // Within a cell, anything a descriptor builds on (in the same cell) comes above it; otherwise code order.
  const inOrder = (cell) => {
    const left = [...cell].sort((a, b) => a.code.localeCompare(b.code, 'en', { numeric: true })), out = [];
    while (left.length) {
      const i = left.findIndex((d) => !d.prior.some((p) => left.some((x) => x.code === p)));
      out.push(...left.splice(i < 0 ? 0 : i, 1));
    }
    return out;
  };
  const years = [[0, 'Before Year 7'], [7, 'Year 7'], [8, 'Year 8'], [9, 'Year 9'], [10, 'Year 10']];
  const tile = (d) => {
    const dots = d.nodes.map((n) => `<i class="${nodeLessons(d, n).length ? 'dl' : 'dn'}" data-n="${n.n}"></i>`).join('');
    const has = hasLessons(d);
    return `<button type="button" class="cmt${has ? ' has' : ''}${d.year < 7 ? ' early' : ''}" data-code="${esc(d.code)}" aria-label="${esc(`${d.code}: ${d.title}${has ? ', has lessons' : ''}`)}">` +
      `<span class="cmtop"><b>${esc(short(d.code))}</b><span class="cmdots" aria-hidden="true">${dots}</span></span><span class="cmtt">${esc(d.title)}</span></button>`;
  };
  let grid = `<svg class="cmlines" aria-hidden="true"></svg>` +
    years.map(([, t], i) => `<span class="cmh" style="grid-column:${i + 2};grid-row:1">${t}</span>`).join('');
  strands.forEach((s, r) => {
    const mine = ds.filter((d) => d.strand === s);
    const main = mine.filter((d) => d.year >= 7), withL = main.filter(hasLessons).length;
    grid += `<h3 class="cms" style="grid-row:${r + 2}">${esc(s)}<small>${main.length} descriptors${withL ? ` · ${withL} with lessons` : ''}</small></h3>`;
    years.forEach(([y, t], i) => {
      const cell = inOrder(mine.filter((d) => (y ? d.year === y : d.year < 7)));
      grid += `<div class="cmcell${y ? '' : ' before'}" data-year="${esc(t)}" style="grid-row:${r + 2};grid-column:${i + 2}">${cell.map(tile).join('')}</div>`;
    });
  });
  const data = {
    lessons: L.map((l) => ({ t: l.title, h: l.href, c: l.course })),
    d: Object.fromEntries(ds.map((d) => [d.code, {
      t: d.title, y: d.year, s: d.strand, x: d.description, p: d.prior.filter((c) => byCode.has(c)),
      n: d.nodes.map((n) => [n.label, n.hinge ? 1 : 0, nodeLessons(d, n)]),
    }])),
  };
  const total = ds.filter((d) => d.year >= 7).length, covered = ds.filter((d) => d.year >= 7 && hasLessons(d)).length;
  return `<section class="cmap cmbreak">` +
    `<div class="cmside"><aside class="cmcard" id="cmcard" aria-live="polite"><p class="cmk">Select a descriptor to see its waypoints and links.</p></aside></div>` +
    `<div class="cmmain"><div class="cmbar"><div class="cmseg" role="group" aria-label="Show"><button type="button" data-f="all" aria-pressed="true">All ${total}</button><button type="button" data-f="has" aria-pressed="false">With lessons (${covered})</button></div>` +
    `<span class="cmkey"><span><i class="dd"></i>done</span><span><i class="dl"></i>has a lesson</span><span><i class="dn"></i>no lesson yet</span><span><b class="lk pre"></b>builds on</span><span><b class="lk post"></b>leads to</span></span></div>` +
    `<div class="cmscroll"><div class="cmgrid" id="cmgrid" style="--rows:${strands.length}">${grid}</div></div></div></section>` +
    `<p class="cmsrc">Descriptors: Australian Curriculum v9 (ACARA, CC BY 4.0). Waypoints and prior knowledge: Learning Waypoints. Lines show what a descriptor builds on, not a teaching order.</p>` +
    `<script type="application/json" id="cm-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export const CMAP_CSS = `
.cmbreak{width:min(1280px,calc(100vw - 32px));position:relative;left:50%;transform:translateX(-50%);display:grid;grid-template-columns:minmax(0,1fr);gap:14px;align-items:start}
@media(min-width:1180px){.cmbreak{grid-template-columns:minmax(0,1fr) 340px}.cmside{grid-column:2;grid-row:1;position:sticky;top:calc(var(--nav,56px) + 12px)}.cmmain{grid-column:1;grid-row:1}}
.cmcard{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;max-height:calc(100vh - var(--nav,56px) - 40px);overflow:auto}
.cmcard .cmk{margin:0;font-size:13px;color:var(--muted)}.cmcard h2{margin:4px 0 6px;font-size:1.25rem;line-height:1.25}
.cmcard .cmx{margin:0 0 12px;font-size:14px;line-height:1.5;color:var(--muted)}
.cmcard h3{margin:14px 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cmcard ol{list-style:none;margin:0;padding:0;display:grid;gap:8px}.cmcard li{display:grid;grid-template-columns:12px 1fr;gap:8px;font-size:14px;line-height:1.35}
.cmcard li i{margin-top:4px}.cmcard li a{display:block;font-size:13.5px}.cmcard li small{display:block;color:var(--muted);font-size:13px}
.cmcard .hg{font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--predict);margin-left:4px}
.cmcard .cmlinks{display:flex;flex-wrap:wrap;gap:6px}.cmcard .cmlinks button{font:inherit;font-size:13px;font-weight:600;padding:3px 9px;border-radius:8px;background:var(--card);cursor:pointer}
.cmcard .cmlinks .pre{border:1px solid var(--investigate);color:var(--investigate)}.cmcard .cmlinks .post{border:1px solid var(--practise);color:var(--practise)}
.cmcard .none{font-size:13px;color:var(--muted)}
.cmbar{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;margin:0 0 10px}
.cmseg{display:inline-flex;gap:2px;border:1px solid var(--line);border-radius:99px;padding:3px;background:var(--card)}
.cmseg button{font:inherit;font-size:13.5px;font-weight:600;border:0;background:transparent;color:var(--ink);border-radius:99px;padding:6px 13px;min-height:36px;cursor:pointer}.cmseg button[aria-pressed=true]{background:var(--ink);color:var(--bg)}
.cmkey{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;color:var(--muted)}.cmkey span{display:inline-flex;align-items:center;gap:5px}
.cmkey .lk{display:inline-block;width:20px;height:0;border-top:3px solid}.cmkey .lk.pre{border-color:var(--investigate)}.cmkey .lk.post{border-color:var(--practise);border-top-style:dashed}
.cmscroll{overflow-x:auto;border-radius:16px}
.cmgrid{position:relative;display:grid;grid-template-columns:104px 132px repeat(4,minmax(150px,1fr));grid-template-rows:auto repeat(var(--rows),auto);min-width:880px;background:var(--card);border:1px solid var(--line);border-radius:16px}
.cmlines{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:2}
.cmlines path{fill:none;stroke-width:2.5;stroke-linecap:round}.cmlines .pre{stroke:var(--investigate)}.cmlines .post{stroke:var(--practise);stroke-dasharray:6 5}
.cmh{padding:12px 8px 8px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cms{grid-column:1;margin:0;padding:12px 10px;font-size:14px;line-height:1.25;border-top:1px solid var(--line)}.cms small{display:block;font-weight:400;font-size:12px;color:var(--muted);margin-top:4px}
.cmcell{display:flex;flex-direction:column;gap:6px;padding:10px 6px;border-top:1px solid var(--line);min-width:0}
.cmcell.before{background:color-mix(in srgb,var(--line) 30%,transparent)}
.cmt{position:relative;z-index:1;display:flex;flex-direction:column;gap:3px;width:100%;text-align:left;font:inherit;color:var(--muted);background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:6px 8px;cursor:pointer}
.cmt.has{color:var(--ink);background:var(--card);border-color:color-mix(in srgb,var(--ink) 35%,transparent)}
.cmt:hover{border-color:var(--ink)}.cmt:focus-visible{outline:3px solid var(--investigate);outline-offset:2px}
.cmt.early{padding:4px 7px}.cmt.early .cmdots{display:none}.cmt.early .cmtt{-webkit-line-clamp:1}
.cmtop{display:flex;justify-content:space-between;align-items:center;gap:6px}.cmtop b{font-size:12px;letter-spacing:.02em}
.cmtt{font-size:12.5px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cmdots{display:inline-flex;gap:3px;flex:none}
.cmap i,.cmkey i{display:inline-block;width:8px;height:8px;border-radius:50%;box-sizing:border-box;flex:none}
.dl{border:2px solid var(--ink)}.dn{border:1.5px dashed color-mix(in srgb,var(--muted) 70%,transparent)}.dd{background:var(--run);border:2px solid var(--run)}
.cmt.on{outline:2px solid var(--accent);outline-offset:1px;border-color:var(--accent)}
.cmt.pre{border:2px solid var(--investigate)}.cmt.post{border:2px dashed var(--practise)}
.cmgrid.only .cmt:not(.has):not(.on):not(.pre):not(.post){opacity:.35}
.cmsrc{font-size:13px;color:var(--muted);margin-top:14px}
@media(max-width:700px){
.cmgrid{display:block;min-width:0;border:0;background:none}.cmlines,.cmh{display:none}
.cms{margin-top:18px;padding:0 0 6px;border:0;font-size:1.05rem}
.cmcell{border:0;padding:4px 0 8px}.cmcell::before{content:attr(data-year);font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cmcell:empty{display:none}
}
`;
