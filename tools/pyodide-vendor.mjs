// Refresh vendor/pyodide/: the part of a Pyodide release the in-browser Python playground uses, hosted on our own site
// (so a school that allows the tutorials site allows Python too; roadmap/code.md › Python pathway). Run by hand when
// changing the version or the package list, then commit vendor/pyodide/. Needs network access to GitHub and PyPI.
//   node tools/pyodide-vendor.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERSION = '314.0.7';
// Packages from Pyodide's own set (their dependencies are added from pyodide-lock.json).
const PACKAGES = ['pandas', 'fastapi', 'jinja2', 'markupsafe', 'micropip', 'scikit-learn'];
// Pure-Python wheels that are not in Pyodide's set, from PyPI: name, version.
const PYPI = [['flask', '3.1.3'], ['werkzeug', '3.1.9'], ['itsdangerous', '2.2.0'], ['click', '8.5.0'], ['blinker', '1.9.0']];
const CORE = ['pyodide.mjs', 'pyodide.js', 'pyodide.asm.mjs', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json'];

const cache = join(root, '.cache', `pyodide-${VERSION}`);
const out = join(root, 'vendor', 'pyodide');
const tarball = join(root, '.cache', `pyodide-${VERSION}.tar.bz2`);
mkdirSync(dirname(tarball), { recursive: true });
if (!existsSync(tarball)) {
  console.log(`Downloading Pyodide ${VERSION} (about 340 MB, once)...`);
  execFileSync('curl', ['-sSfL', '-o', tarball, `https://github.com/pyodide/pyodide/releases/download/${VERSION}/pyodide-${VERSION}.tar.bz2`], { stdio: 'inherit' });
}
if (!existsSync(join(cache, 'pyodide-lock.json'))) {
  mkdirSync(cache, { recursive: true });
  execFileSync('tar', ['-xjf', tarball, '-C', cache, '--strip-components=1']);
}
const lock = JSON.parse(readFileSync(join(cache, 'pyodide-lock.json'), 'utf8')).packages;
const norm = (n) => n.toLowerCase().replace(/_/g, '-');
const byName = new Map(Object.entries(lock).map(([k, v]) => [norm(k), v]));
const want = new Set();
const add = (n) => { const p = byName.get(norm(n)); if (!p) throw new Error(`${n} is not in Pyodide ${VERSION}`); if (want.has(p)) return; want.add(p); for (const d of p.depends || []) add(d); };
PACKAGES.forEach(add);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const files = [];
for (const f of [...CORE, ...[...want].map((p) => p.file_name)]) { copyFileSync(join(cache, f), join(out, f)); files.push(f); }
for (const [name, version] of PYPI) {
  const meta = JSON.parse(execFileSync('curl', ['-sSfL', `https://pypi.org/pypi/${name}/${version}/json`], { encoding: 'utf8' }));
  const wheel = meta.urls.find((u) => u.packagetype === 'bdist_wheel' && /py3-none-any\.whl$/.test(u.filename));
  if (!wheel) throw new Error(`No pure-Python wheel for ${name} ${version}`);
  execFileSync('curl', ['-sSfL', '-o', join(out, wheel.filename), wheel.url]);
  const sha = createHash('sha256').update(readFileSync(join(out, wheel.filename))).digest('hex');
  if (sha !== wheel.digests.sha256) throw new Error(`Checksum mismatch for ${wheel.filename}`);
  files.push(wheel.filename);
}
const total = files.reduce((n, f) => n + statSync(join(out, f)).size, 0);
writeFileSync(join(out, 'manifest.json'), JSON.stringify({ version: VERSION, packages: [...want].map((p) => p.name).sort(), wheels: files.filter((f) => PYPI.some(([n]) => f.toLowerCase().startsWith(n))), files: files.sort() }, null, 1) + '\n');
writeFileSync(join(out, 'README.md'), `Pyodide ${VERSION} (Mozilla Public License 2.0; packages under their own licences), the part the in-browser Python playground uses, plus Flask and its dependencies from PyPI (BSD-3-Clause). Made by tools/pyodide-vendor.mjs; do not edit by hand.\n`);
console.log(`vendor/pyodide: ${files.length} files, ${(total / 1e6).toFixed(1)} MB`);
