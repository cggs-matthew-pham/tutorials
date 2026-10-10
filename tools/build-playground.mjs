// Assemble the static playground into dist/_playground (our files + vendored Skulpt).
// Used by `npm run build:playground` and imported by the site build.
import { cpSync, mkdirSync, copyFileSync, rmSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Shared snippet palette (code + styles) and this playground's snippet list. */
function addSnippets(dest, name) {
  for (const f of ['snippets.js', 'snippets.css']) copyFileSync(join(root, 'playground-shared', f), join(dest, f));
  copyFileSync(join(root, 'snippets', `${name}.json`), join(dest, 'snippets.json'));
  for (const f of ['modules-scan.mjs', 'snippet-pattern.mjs']) copyFileSync(join(root, 'tools', f), join(dest, f));
  // Shared Python modules (modules/*.py) that lessons can offer: { name: source }
  const mods = {};
  const mdir = join(root, 'modules');
  if (existsSync(mdir)) for (const f of readdirSync(mdir)) if (f.endsWith('.py')) mods[f.slice(0, -3)] = readFileSync(join(mdir, f), 'utf8');
  writeFileSync(join(dest, 'modules.json'), JSON.stringify(mods));
}

/**
 * Version-stamp a built playground so a new deploy is never mixed with a browser's cached copy: every local
 * script and stylesheet reference (index.html src/href, JS imports) gets ?v=<hash of the playground's files>.
 * Data files (snippets.json, modules.json, unlocks.json) are fetched with cache: 'no-cache' instead.
 * Returns the hash; it is also written to version.txt for the site build's iframe URLs.
 */
export function stampPlayground(dest) {
  const files = [];
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) walk(p); else files.push(p); } };
  walk(dest);
  files.sort();
  const h = createHash('sha1');
  for (const f of files) if (['.js', '.mjs', '.css', '.html', '.json', '.py'].includes(extname(f))) h.update(f.slice(dest.length)).update(readFileSync(f));
  const v = h.digest('hex').slice(0, 10);
  const local = (u) => !/^[a-z]+:|^\/\//i.test(u);
  for (const f of files) {
    const ext = extname(f);
    if (ext === '.html') {
      const s = readFileSync(f, 'utf8').replace(/\b(src|href)="([^"?#]+\.(?:m?js|css))"/g, (m, a, u) => (local(u) ? `${a}="${u}?v=${v}"` : m));
      writeFileSync(f, s);
    } else if (ext === '.js' || ext === '.mjs') {
      if (f.includes(`${join('', 'vendor')}`)) continue;
      const s = readFileSync(f, 'utf8').replace(/(\bfrom\s+|\bimport\s*\(\s*)(['"])(\.\.?\/[^'"?]+\.m?js)\2/g, (m, k, q, u) => `${k}${q}${u}?v=${v}${q}`);
      writeFileSync(f, s);
    }
  }
  writeFileSync(join(dest, 'version.txt'), v);
  return v;
}

export function buildPlayground(out = 'dist') {
  const dest = join(out, '_playground');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground'), dest, { recursive: true });
  addSnippets(dest, 'turtle');
  mkdirSync(join(dest, 'vendor'), { recursive: true });
  for (const f of ['skulpt.min.js', 'skulpt-stdlib.js']) {
    const src = join(root, 'node_modules', 'skulpt', 'dist', f);
    if (!existsSync(src)) throw new Error(`Missing ${src}. Run "npm ci" first.`);
    copyFileSync(src, join(dest, 'vendor', f));
  }
  stampPlayground(dest);
  return dest;
}

/**
 * The Python playground (CPython through Pyodide in a worker) and Pyodide itself: vendor/pyodide/ (made by
 * tools/pyodide-vendor.mjs) is served from this site as _pyodide/, so a school that allows the site allows Python.
 * Pyodide is not stamped: its files are named by version, and the playground loads it by a fixed address.
 */
export function buildPyPlayground(out = 'dist') {
  const dest = join(out, '_playground-py');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground-py'), dest, { recursive: true });
  addSnippets(dest, 'turtle');
  stampPlayground(dest);
  const py = join(out, '_pyodide');
  rmSync(py, { recursive: true, force: true });
  cpSync(join(root, 'vendor', 'pyodide'), py, { recursive: true });
  return dest;
}

/** The HTML & CSS playground has no dependencies: it is copied as is. */
export function buildHtmlPlayground(out = 'dist') {
  const dest = join(out, '_playground-html');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground-html'), dest, { recursive: true });
  addSnippets(dest, 'html');
  // Course pictures (media/html/*.svg): the preview resolves src="trophy.svg" against this folder, like files next to a real page.
  if (existsSync(join(root, 'media', 'html'))) cpSync(join(root, 'media', 'html'), join(dest, 'media'), { recursive: true });
  stampPlayground(dest);
  return dest;
}

/** The maths board: our files, vendored JSXGraph, and the shared maths evaluator (tools/maths.mjs) as maths.js. */
/**
 * The board (interactive diagrams: balance, machine, graph…): JSXGraph plus the shared maths evaluator.
 * _playground-maths/ is its old address: a page there forwards to the board, so existing embeds keep working
 * (see the board's embedding contract).
 */
export async function buildMathsPlayground(out = 'dist') {
  const dest = join(out, '_playground-board');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground-board'), dest, { recursive: true });
  mkdirSync(join(dest, 'vendor'), { recursive: true });
  for (const f of ['jsxgraphcore.js', 'jsxgraph.css']) {
    const src = join(root, 'node_modules', 'jsxgraph', 'distrib', f);
    if (!existsSync(src)) throw new Error(`Missing ${src}. Run "npm ci" first.`);
    copyFileSync(src, join(dest, 'vendor', f));
  }
  // The classifier widget loads these on demand: Teachable Machine's image library and the TensorFlow.js version its
  // export snippet uses (both pinned in package.json), served from this site rather than a CDN.
  for (const [pkg, f] of [['@tensorflow/tfjs', 'tf.min.js'], ['@teachablemachine/image', 'teachablemachine-image.min.js']]) {
    const src = join(root, 'node_modules', pkg, 'dist', f);
    if (!existsSync(src)) throw new Error(`Missing ${src}. Run "npm ci" first.`);
    copyFileSync(src, join(dest, 'vendor', f));
  }
  const { MATH_JS } = await import('./math-expr.mjs');
  writeFileSync(join(dest, 'maths.js'), MATH_JS + '\n');
  stampPlayground(dest);
  const old = join(out, '_playground-maths');
  rmSync(old, { recursive: true, force: true });
  mkdirSync(old, { recursive: true });
  writeFileSync(join(old, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Board</title><script>var q=new URLSearchParams(location.search);if(!q.has('kind'))q.set('kind','maths');location.replace('../_playground-board/index.html?'+q.toString()+location.hash)</script>\n`);
  writeFileSync(join(old, 'version.txt'), readFileSync(join(dest, 'version.txt')));
  return dest;
}

/** The science board: our files (the particle engine and widgets) and vendored JSXGraph, like the maths board. */
export function buildSciencePlayground(out = 'dist') {
  const dest = join(out, '_playground-science');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground-science'), dest, { recursive: true });
  mkdirSync(join(dest, 'vendor'), { recursive: true });
  for (const f of ['jsxgraphcore.js', 'jsxgraph.css']) {
    const src = join(root, 'node_modules', 'jsxgraph', 'distrib', f);
    if (!existsSync(src)) throw new Error(`Missing ${src}. Run "npm ci" first.`);
    copyFileSync(src, join(dest, 'vendor', f));
  }
  stampPlayground(dest);
  return dest;
}

/** The MakeCode playground hosts the MakeCode editor (micro:bit or Arcade) from makecode.com: our page only, copied as is. */
export function buildMakecodePlayground(out = 'dist') {
  const dest = join(out, '_playground-makecode');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground-makecode'), dest, { recursive: true });
  stampPlayground(dest);
  return dest;
}

/** The explain stage: a static page that MakeCode lessons' "Explain it to me" clips record (blocks, then what it makes). */
export function buildExplainStage(out = 'dist') {
  const dest = join(out, '_playground-explain');
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, 'playground-explain'), dest, { recursive: true });
  return dest;
}

/** KaTeX's stylesheet and fonts, for maths lessons (the maths itself is rendered at build time). */
export function buildKatex(out = 'dist') {
  const dest = join(out, '_katex');
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  const src = join(root, 'node_modules', 'katex', 'dist');
  copyFileSync(join(src, 'katex.min.css'), join(dest, 'katex.min.css'));
  cpSync(join(src, 'fonts'), join(dest, 'fonts'), { recursive: true });
  return dest;
}

/** Numbas's JME runtime (vendor/numbas, Apache-2.0) for maths answer checks with form:, loaded only by lessons that use them. */
export function buildNumbas(out = 'dist') {
  const dest = join(out, '_numbas');
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  for (const f of ['numbas-jme.min.js', 'LICENSE', 'VERSION']) copyFileSync(join(root, 'vendor', 'numbas', f), join(dest, f));
  return dest;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'dist';
  console.log('Playground built into ' + buildPlayground(out));
  console.log('HTML playground built into ' + buildHtmlPlayground(out));
  console.log('Board built into ' + await buildMathsPlayground(out));
  console.log('MakeCode playground built into ' + buildMakecodePlayground(out));
  console.log('Explain stage built into ' + buildExplainStage(out));
  console.log('Science board built into ' + buildSciencePlayground(out));
  console.log('Python playground built into ' + buildPyPlayground(out));
}
