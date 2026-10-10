// Assemble dist/code/create/: the in-browser lesson maker. It reuses the exact parse/validate/render
// modules the site build uses, plus vendored marked and yaml (ES modules, no CDN).
import { cpSync, mkdirSync, copyFileSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export function buildCreate(out = 'dist') {
  const dest = join(out, 'code', 'create'); // each subject gets its own maker: /code/create/, later /maths/create/
  rmSync(join(out, 'create'), { recursive: true, force: true });
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'create'), dest, { recursive: true });
  for (const f of ['lesson-core.mjs', 'lesson-view.mjs', 'modules-scan.mjs', 'math-expr.mjs']) copyFileSync(join(root, 'tools', f), join(dest, f));
  // highlight.cjs is a plain function declaration; expose it as an ES module for the browser.
  writeFileSync(join(dest, 'highlight.js'), readFileSync(join(root, 'tools', 'highlight.cjs'), 'utf8').replace(/^if \(typeof module[^\n]*$/m, '') + '\nexport { highlightCode };\n');
  mkdirSync(join(dest, 'vendor'), { recursive: true });
  copyFileSync(join(root, 'node_modules', 'marked', 'lib', 'marked.esm.js'), join(dest, 'vendor', 'marked.esm.js'));
  cpSync(join(root, 'node_modules', 'yaml', 'browser'), join(dest, 'vendor', 'yaml'), { recursive: true });
  // Old address: forward to the new one, keeping any #l=... share link.
  mkdirSync(join(out, 'create'), { recursive: true });
  writeFileSync(join(out, 'create', 'index.html'), '<!doctype html><meta charset="utf-8"><title>Moved</title><script>location.replace("../code/create/"+location.hash)</script><a href="../code/create/">Moved to /code/create/</a>');
  return dest;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log('Create page built into ' + buildCreate(process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'dist'));
}
