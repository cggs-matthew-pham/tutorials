// Maths notation for lessons with `language: maths`: $inline$ and $$display$$, rendered once at build time with
// KaTeX (no maths library on student pages), plus the worked-example block. Build-only (imports katex), so the
// site build passes these into lesson-view; the create page, which runs in the browser, shows the raw $...$.
import katex from 'katex';
export { MATH, MATH_JS } from './math-expr.mjs';

// ---- Notation: $inline$ and $$display$$, rendered once at build time (no maths library on student pages) ----

const tex = (src, displayMode) => katex.renderToString(src, { displayMode, throwOnError: false, output: 'htmlAndMathml' });
export const texInline = (src) => tex(src, false);
export const texDisplay = (src) => tex(src, true);

/** A marked extension: $$...$$ on its own lines (block) and $...$ (inline), choosing the same maths as Marp and Waypoints Prepare.
 * Money stays text (Pandoc's rule): the opening $ is followed by a non-space, the closing $ preceded by one and not followed
 * by a digit. As in Marp, $$ inside a line is never maths, so a run of dollars there is kept as text. */
export const markedMath = {
  extensions: [
    {
      name: 'mathBlock', level: 'block',
      start(src) { const i = src.search(/(?:^|\n)\$\$/); return i < 0 ? undefined : src[i] === '\n' ? i + 1 : i; },
      tokenizer(src) { const m = /^\$\$([\s\S]+?)\$\$[ \t]*(?:\n|$)/.exec(src); if (m) return { type: 'mathBlock', raw: m[0], text: m[1].trim() }; },
      renderer(t) { return `<div class="mathblock">${texDisplay(t.text)}</div>`; },
    },
    {
      name: 'mathInline', level: 'inline',
      start(src) { return src.indexOf('$'); },
      tokenizer(src) { const m = /^(\${2,})|^\$(?=\S)([^$\n]*?\S)\$(?!\d)/.exec(src); if (m) return { type: 'mathInline', raw: m[0], text: m[1] || m[2].trim(), literal: !!m[1] }; },
      renderer(t) { return t.literal ? t.text : texInline(t.text); },
    },
  ],
};

/** Plain text that may contain $...$ (check questions and options): escape the text, render the maths. */
export function textWithMath(s, esc) {
  return String(s).split(/((?<!\$)\$(?=[^\s$])[^$\n]*?\S\$(?![\d$]))/).map((part) => /^\$\S(?:[^$\n]*\S)?\$$/.test(part) ? texInline(part.slice(1, -1)) : esc(part)).join('');
}

/**
 * A worked example: a fenced block whose language is `worked`. One line per step, maths then the reason:
 *   2x + 3 = 11 :: Start with the equation.
 * Students reveal one step at a time ("Next step"), so they can predict each move before seeing it.
 */
export function workedHtml(text, md) {
  const rows = text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const i = l.indexOf('::');
    return i < 0 ? { m: l, why: '' } : { m: l.slice(0, i).trim(), why: l.slice(i + 2).trim() };
  });
  const lis = rows.map((r, n) => `<li${n ? ' hidden' : ''}><span class="wm">${texInline(r.m)}</span>${r.why ? `<span class="why">${md.parseInline(r.why)}</span>` : ''}</li>`).join('');
  return `<div class="worked"><div class="worked-head"><b>Worked example</b><span>Before each step, say what you think comes next.</span></div><ol>${lis}</ol>` +
    (rows.length > 1 ? `<div class="worked-go"><button type="button" class="wnext">Next step</button><button type="button" class="wall">Show all</button></div>` : '') + `</div>`;
}
