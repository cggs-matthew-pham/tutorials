// Friendly errors for p5.js sketches: the browser's JavaScript message becomes "the slip and the next move" (never the
// task's answer). Pure (no DOM), so `npm run check-p5` can test it in Node. Used by the p5 playground.
const cap = (n) => n.charAt(0).toUpperCase() + n.slice(1);

/** hint(message, code, line) -> { hint, line }: `message` as the browser gives it (Chrome, Firefox or Safari wording). */
export function hint(message, code = '', line = null) {
  const m = String(message || '').replace(/^Uncaught\s+/, '').replace(/^(\w*Error):\s*/, '$1: ');
  const lines = String(code).split('\n');
  let h = null;
  let x;
  if ((x = m.match(/^(?:ReferenceError: )?(\w+) is not defined/))) {
    const name = x[1];
    const found = [...new Set(lines.join('\n').match(/[A-Za-z_$][\w$]*/g) || [])].find((w) => w !== name && w.toLowerCase() === name.toLowerCase());
    const other = found ? [null, found] : null;
    h = other
      ? `JavaScript does not know the name \`${name}\`, but it does know \`${other[1]}\`. Capital letters matter: \`${name}\` and \`${other[1]}\` are different names.`
      : `JavaScript does not know the name \`${name}\`. Check its spelling, or make it first with \`let ${name} = …\`.`;
  } else if ((x = m.match(/Cannot access '(\w+)' before initialization/))) {
    h = `\`${x[1]}\` is used before the line that makes it. Move the \`let ${x[1]} = …\` line above the line that uses it.`;
  } else if ((x = m.match(/Assignment to constant variable/))) {
    h = 'A `const` can never change. Use `let` for a variable that changes.';
  } else if ((x = m.match(/^(?:TypeError: )?([\w.]+) is not a function/))) {
    h = `\`${x[1]}\` is not a function. Check its spelling and capital letters: is it a name the browser or p5 has, or a function you wrote?`;
  } else if ((x = m.match(/Cannot (?:read|set) propert(?:y|ies) of (undefined|null)(?: \((?:reading|setting) '([^']+)'\))?/))) {
    h = `Something is ${x[1]} where the code expects a thing with \`${x[2] || 'a value'}\`. Check the name before the dot, and that the array or object has been made (and the place number exists).`;
  } else if (/Unexpected identifier/.test(m)) {
    h = 'Two names are side by side with nothing between them. A `;`, a `,` or an operator such as `+` is probably missing. Check this line and the line above.';
  } else if (/Unexpected end of input|missing \) after argument list|Unexpected token '\}'|Unexpected token '\)'|expected expression, got/.test(m) || /SyntaxError/.test(m) && /Unexpected/.test(m)) {
    const open = (code.match(/\(/g) || []).length - (code.match(/\)/g) || []).length;
    const brace = (code.match(/\{/g) || []).length - (code.match(/\}/g) || []).length;
    const sq = (code.match(/\[/g) || []).length - (code.match(/\]/g) || []).length;
    h = open > 0 ? 'A `(` has no matching `)`. Check the end of the line it is on, and the lines just above.'
      : open < 0 ? 'There is a `)` too many. Check each `(` has just one `)`.'
      : brace > 0 ? 'A `{` has no matching `}`. Every `function` and `if` needs its closing `}`.'
      : brace < 0 ? 'There is a `}` too many. Check each `{` has just one `}`.'
      : sq !== 0 ? 'A `[` and `]` do not match. Check each array.'
      : 'Something on this line, or the line above, is missing or extra: a comma between values, a quote that was never closed, or a bracket.';
  } else if (/Invalid or unexpected token|unterminated string|Unexpected string/.test(m)) {
    h = 'A quote was never closed, or a comma is missing between two things. Check the quotes on this line and the line above.';
  } else if (/Illegal return|missing\) after|redeclaration|Identifier '(\w+)' has already been declared/.test(m)) {
    x = m.match(/Identifier '(\w+)' has already been declared/);
    h = x ? `\`${x[1]}\` is made twice with \`let\`. Make it once, then change it later without \`let\` (\`${x[1]} = …\`).` : null;
  }
  if (line && lines[line - 1] === undefined) line = null;
  return { hint: h, line };
}
