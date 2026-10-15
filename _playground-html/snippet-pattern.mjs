// Pure: find a snippet in a program. Shared by the playground Reference drawer ("This lesson") and the
// site build (cheat sheets list what each unit's code uses). Copied next to snippets.js by build-playground.
const OPEN = '\u2039', CLOSE = '\u203a';
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Pure: a pattern that finds a snippet in a program. An item's own `matches` (a regex) wins; otherwise the
 * snippet's first line, with each placeholder as a wildcard (a name for name-like placeholders).
 */
export function snippetPattern(item) {
  if (item.matches) { try { return new RegExp(item.matches, 'm'); } catch { return null; } }
  const first = String(item.code).split('\n').find((l) => l.trim()) || '';
  // A quoted placeholder ("‹red›") matches any argument, quoted or not: pencolor(c) uses pencolor too.
  let src = '', rest = first.trim().replace(/(["'])‹([^›]*)›\1/g, '‹ $2›');
  while (rest) {
    const o = rest.indexOf(OPEN), c = o >= 0 ? rest.indexOf(CLOSE, o) : -1;
    const fixed = o >= 0 && c > o ? rest.slice(0, o) : rest;
    src += fixed.split(/\s+/).map(reEsc).join('\\s*');
    if (!(o >= 0 && c > o)) break;
    const ph = rest.slice(o + 1, c);
    src += /^[A-Za-z_]\w*$/.test(ph) ? '[A-Za-z_]\\w*' : ph ? '.+?' : '.*?';
    rest = rest.slice(c + 1);
  }
  if (!src) return null;
  const head = first.trim().startsWith(OPEN) ? '^\\s*' : /^\w/.test(first.trim()) ? '(?<![\\w.])' : '';
  try { return new RegExp(head + src, 'm'); } catch { return null; }
}
