// Find the functions a Python module offers, so the playground can turn each into a button.
// Pure and tiny on purpose (a pattern, not a parser): top-level `def name(args):` followed by a docstring.
// Shared by the build, the create page and the playground (copied next to each).

/** @returns {{name: string, args: {name: string, default: string|null}[], doc: string}[]} */
export function scanModule(source) {
  const out = [];
  const re = /^def[ \t]+([A-Za-z][A-Za-z0-9_]*)[ \t]*\(([^)]*)\)[ \t]*:[ \t]*\r?\n[ \t]+(?:"""|''')([\s\S]*?)(?:"""|''')/gm;
  let m;
  while ((m = re.exec(String(source)))) {
    const args = m[2].split(',').map((a) => a.trim()).filter(Boolean).map((a) => {
      const [name, ...rest] = a.split('=');
      return { name: name.trim(), default: rest.length ? rest.join('=').trim() : null };
    });
    out.push({ name: m[1], args, doc: m[3].trim().split('\n')[0].trim() });
  }
  return out;
}

/** The call a button inserts, with placeholders (‹…›) on each argument: square(‹100›) */
export function callText(fn) {
  return `${fn.name}(${fn.args.map((a) => `‹${a.default ?? a.name}›`).join(', ')})\n`;
}

/** Add `from <module> import <fn>` to the code if it is not already imported. Returns {value, at, added}. */
export function ensureImport(value, module, fn) {
  const re = new RegExp(`^from[ \\t]+${module}[ \\t]+import[ \\t]+(.+)$`, 'm');
  const m = value.match(re);
  if (m) {
    const names = m[1].split(',').map((s) => s.trim());
    if (names.includes('*') || names.includes(fn)) return { value, at: 0, added: 0 };
    const at = m.index + m[0].length;
    const add = `, ${fn}`;
    return { value: value.slice(0, at) + add + value.slice(at), at, added: add.length };
  }
  // New import line: after the leading imports (and comments/blank lines before them), else at the top.
  const lines = value.split('\n');
  let last = -1;
  for (let i = 0; i < Math.min(lines.length, 12); i++) {
    if (/^(from|import)\s/.test(lines[i])) last = i;
    else if (lines[i].trim() !== '' && !lines[i].trim().startsWith('#')) break;
  }
  const line = `from ${module} import ${fn}\n`;
  const at = last < 0 ? 0 : lines.slice(0, last + 1).join('\n').length + 1;
  const prefix = last >= 0 && at > value.length ? '\n' : '';
  return { value: value.slice(0, at) + prefix + line + value.slice(at), at, added: prefix.length + line.length };
}

/** The `def` block the cursor is in (from the `def` line to the next unindented code), or '' if it is not in one. */
export function defAtCursor(value, pos) {
  const lines = value.split('\n');
  let at = 0, line = 0;
  for (let i = 0; i < lines.length; i++) { if (at + lines[i].length >= pos) { line = i; break; } at += lines[i].length + 1; line = i; }
  let start = -1;
  for (let i = line; i >= 0; i--) if (/^def\s/.test(lines[i])) { start = i; break; }
  if (start < 0) return '';
  let end = start;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    if (/^\s/.test(lines[i])) end = i; else break;
  }
  if (line > end) return '';
  return lines.slice(start, end + 1).join('\n') + '\n';
}
