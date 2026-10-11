// Friendly errors for pages that use JavaScript to change the page. Page-specific slips first (querySelector found
// nothing, the script runs before the element exists); anything else goes to the shared JavaScript hints (p5-errors.js).
// Pure (no DOM), so `npm run check-dom-errors` can test it in Node.
import { hint as base } from './p5-errors.js';

export function hint(message, code = '', line = null) {
  const m = String(message || '').replace(/^Uncaught\s+/, '').replace(/^(\w*Error):\s*/, '$1: ');
  const lines = String(code).split('\n');
  let x, h = null;
  if ((x = m.match(/Cannot (?:read|set) propert(?:y|ies) of null(?: \((?:reading|setting) '([^']+)'\))?/))) {
    const late = /<script/i.test(code) && code.search(/<script/i) < code.search(/<(body|h1|p|button|div|ul|input)\b/i);
    h = 'The page has nothing matching that name, so the result is `null` and it has no `' + (x[1] || 'property') + '`. Check the selector spelling (`#` for an id, `.` for a class)' + (late ? ', and move the `<script>` below the element: the script runs as soon as the browser reaches it.' : ', and that the element has that id or class.');
  } else if ((x = m.match(/(\w+) is not defined/)) && /^[a-z]\w*$/.test(x[1]) && new RegExp('(?:getElementById|querySelector)\\([\'"][#.]?' + x[1] + '[\'"]\\)').test(code)) {
    h = `\`${x[1]}\` is in quotes in your code but is used as a name. Make a variable first: \`let ${x[1]} = document.querySelector(…)\`.`;
  } else if ((x = m.match(/Failed to execute 'querySelector'.*'([^']*)' is not a valid selector/))) {
    h = `\`${x[1]}\` is not a selector. Use \`#id\`, \`.class\` or a tag name such as \`h1\`.`;
  } else if (/Illegal invocation|is not a function/.test(m) && /addEventListener\s*\(\s*['"]\w+['"]\s*,\s*\w+\s*\(/.test(code)) {
    h = 'The function after the event name must not have `()`: `addEventListener("click", name)` gives the browser the function to call later; `name()` runs it straight away.';
  } else if (/Assignment to constant variable/.test(m) && /\bref\s*\(/.test(code)) {
    // Vue: a ref made with const, changed in the script as if it were its value (score++ instead of score.value++).
    h = 'In the script, a ref keeps its value in `.value`: for example `score.value++`, not `score++`. The page unwraps refs for you; the script does not.';
  } else if ((x = m.match(/^ReferenceError: (\w+) is not defined/)) && /data-svelte|htmPreact|\bVue\b/.test(code) && ['Vue', 'htmPreact', 'svelte'].includes(x[1])) {
    h = `\`${x[1]}\` comes from a file loaded with a \`<script src>\` line. Check that line is there, above this script, and spelt as in the lesson.`;
  }
  if (h) return { hint: h, line: line && lines[line - 1] !== undefined ? line : null };
  return base(message, code, line);
}
