// Maths cards (snippets/maths.json, and snippets/maths-<name>.json for other courses): the words and methods of a maths course, typeset with KaTeX, for the student
// Reference page, the printable cheat sheets (teacher and student copies) and the Markdown sheet for Prepare.
// The code courses' versions (build-site refItem, teach.mjs cheatSheetBody) are built around program snippets;
// these mirror their layout and CSS classes so both look the same.
//
// A card: { label, code (TeX, shown typeset), hint (text, may use $...$), unit (the unit that introduces it),
//           board (optional maths-board setup, drawn as the card's picture by render-pictures), shows (caption) }.
// Build-only: imports KaTeX through maths.mjs.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import katex from 'katex';
import { texDisplay, textWithMath } from './maths.mjs';
import { snippetId } from './lesson-core.mjs';

/** Picture and anchor id for a maths card: prefixed, so it never collides with a turtle snippet's picture. */
export const mathsCardId = (label) => `maths-${snippetId(label)}`;

/** The card file, with ids and group names on every card; null when there is none. */
export function loadMathsCards(path = 'snippets/maths.json') {
  if (!existsSync(path)) return null;
  const data = JSON.parse(readFileSync(path, 'utf8'));
  data.cards = data.groups.flatMap((g) => g.items.map((i) => ({ ...i, id: mathsCardId(i.label), group: g.name })));
  return data;
}

/**
 * Every card file: snippets/maths.json and snippets/maths-<name>.json, one per course (each names its course:).
 * Returns [{ file: 'maths-number', course, cards, ... }], in file-name order.
 */
export function loadAllMathsCards(dir = 'snippets') {
  return readdirSync(dir).filter((f) => /^maths(-[\w-]+)?\.json$/.test(f)).sort()
    .map((f) => ({ ...loadMathsCards(join(dir, f)), file: f.replace(/\.json$/, '') }));
}

/** Problems with the cards: TeX that does not parse, a unit the course does not have, a board with no caption. */
export function validateMathsCards(data, unitIds = null) {
  const errs = [];
  for (const c of data.cards) {
    const where = `snippets/${data.file || 'maths'}.json › ${c.label}`;
    try { katex.renderToString(c.code, { throwOnError: true, displayMode: true }); } catch (e) { errs.push(`${where}: code is not valid maths (${e.message.split('\n')[0]})`); }
    for (const m of String(c.hint || '').match(/\$[^$\n]+?\$/g) || []) {
      try { katex.renderToString(m.slice(1, -1), { throwOnError: true }); } catch (e) { errs.push(`${where}: hint maths ${m} does not parse`); }
    }
    if (!c.unit) errs.push(`${where}: needs unit (the unit whose cheat sheet lists it)`);
    else if (unitIds && !unitIds.includes(c.unit)) errs.push(`${where}: unit "${c.unit}" is not a unit of ${data.course} (${unitIds.join(', ')})`);
    if (c.board && !c.shows) errs.push(`${where}: a card with a board picture needs shows (a caption)`);
  }
  return errs;
}

const picHtml = (c, pictures, base, esc, cls = '') => {
  const pic = pictures[c.id];
  if (!pic) return '';
  return `<figure${cls ? ` class="${cls}"` : ''}><img src="${esc(base + c.id)}.png?v=${esc(pic.hash || '')}" alt="${esc(c.shows || 'The board')}" width="${Math.round(pic.w / 4)}" height="${Math.round(pic.h / 4)}" loading="lazy">${c.shows ? `<figcaption>${textWithMath(c.shows, esc)}</figcaption>` : ''}</figure>`;
};

/** One Reference card (same structure and classes as a code Reference card, so the page search works on it). */
export function mathsRefItem(c, { pictures, depth, esc }) {
  const text = [c.label, c.hint || '', c.code, c.shows || ''].join(' ').toLowerCase();
  return `<div class="ref-item" id="${esc(c.id)}" data-text="${esc(text)}"><div class="ref-math">${texDisplay(c.code)}</div>` +
    `<div><b>${esc(c.label)}</b><p>${textWithMath(c.hint || '', esc)}</p>${picHtml(c, pictures, '../'.repeat(depth) + '_pictures/maths/', esc, 'ref-pic')}</div></div>`;
}

/** Printable A4 cheat sheet body, as teach.mjs cheatSheetBody (same classes and CHEAT_CSS), with typeset maths. */
export function mathsCheatBody({ title, course, sections, pictures = {}, picBase, esc, back, backLabel = 'Teacher guide', md, mdUrl, nav = '' }) {
  const card = (c) => `<article class="cs-card cs-mcard${pictures[c.id] ? ' has-pic' : ''}"><h3>${esc(c.label)}</h3><p>${textWithMath(c.hint || '', esc)}</p>` +
    `<div class="cs-body"><div class="cs-code cs-math">${texDisplay(c.code)}</div>${picHtml(c, pictures, picBase, esc)}</div></article>`;
  // Two columns filled by estimated height, as for the code sheets (CSS columns split badly across printed pages).
  const height = (c) => 3 + (String(c.code).match(/\\\\/g) || []).length * 1.4 + 1.6 + (pictures[c.id] ? pictures[c.id].h / 4 / 15 + 1.5 : 0) + Math.ceil((c.hint || '').length / 55);
  const cols = (items) => {
    const col = [[], []], h = [0, 0];
    for (const c of items) { const k = h[0] <= h[1] ? 0 : 1; col[k].push(card(c)); h[k] += height(c); }
    return `<div class="cs-grid"><div class="cs-col">${col[0].join('')}</div><div class="cs-col">${col[1].join('')}</div></div>`;
  };
  const secs = sections.filter((s) => s.items.length).map((s) => `${sections.length > 1 ? `<h2 class="cs-unit">${esc(s.title)}</h2>` : ''}${cols(s.items)}`).join('');
  return `<div class="cs-bar noprint"><a class="crumb" href="${esc(back)}">← ${esc(backLabel)}</a><span class="sn-grow"></span><button type="button" onclick="print()">Print</button>${mdUrl ? ` <a href="${esc(md)}" download>Markdown for Prepare</a>` : ''}</div>${nav}` +
    `<div class="cs"><header class="cs-head"><h1>${esc(title)}</h1><p>${esc(course)} · The words and methods from the lessons, with an example of each.</p></header>${secs || '<p>This unit has no new words or methods.</p>'}</div>`;
}

/** The unit's cheat sheet as Markdown for Prepare's print page (which typesets $...$). */
export function mathsCheatMd({ course, unit, items }) {
  const q = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
  const body = items.map((c) => `:::keep-together\n\n**${c.label}**: ${c.hint || ''}\n\n$$${c.code}$$${c.shows ? `\n\n_${c.shows}_` : ''}\n\n:::`).join('\n\n');
  return `---\ntitle: ${q(`${unit.title}: cheat sheet`)}\nsubtitle: ${q(course)}\n---\n\n# ${unit.title}\n\n> The words and methods from this unit, with an example of each.\n\n${body || '_This unit has no new words or methods._'}\n`;
}

/** Extra CSS: typeset maths on cards (the cheat sheet's own CSS sizes code, not maths). */
export const MATHS_CARD_CSS = `.cs-math .katex-display{margin:2px 0}.cs-math .katex{font-size:1.05em}
.cs-math .katex-display>.katex,.ref-math .katex-display>.katex{text-align:left}
.cs-mcard .cs-body{flex-direction:column;align-items:stretch;gap:4px}.cs-mcard figure{max-width:100%;text-align:left}.cs-mcard figure img{margin:0}
.cs-math{overflow-x:auto}.ref-math{overflow-x:auto}.ref-math .katex-display{margin:4px 0}`;
