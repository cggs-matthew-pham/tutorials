// `npm run check-practice`: every practice question that uses the board starts it without an error. Builds nothing:
// run `npm run build` first. Each board template is generated 30 times and its setup loaded into the real board
// (dist/_playground-board/), in headless Chromium; a board answer (when:) must use values the board reports and must
// not hold before the student does anything. Validate checks everything that needs no browser.
import { chromium } from 'playwright-core';
import http from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import YAML from 'yaml';
import { PRACTICE } from './practice-core.mjs';

const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' };
const srv = http.createServer(async (q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; try { const b = await readFile(join('dist', p)); r.writeHead(200, { 'content-type': T[extname(p)] || 'application/octet-stream' }); r.end(b); } catch { r.writeHead(404); r.end(); } });
await new Promise((ok) => srv.listen(0, ok));
const port = srv.address().port;
const files = [];
async function walk(d) { for (const f of await readdir(d, { withFileTypes: true })) { const p = join(d, f.name); if (f.isDirectory()) { if (f.name === 'practice') for (const y of await readdir(p)) { if (y.endsWith('.yml')) files.push(join(p, y)); } else await walk(p); } } }
await walk(process.argv[2] || 'content');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage();
// A host page with the board in an iframe, as the practice page has it, so the board's messages can be read.
await page.route('**/_check-host.html', (r) => r.fulfill({ contentType: 'text/html', body: `<!doctype html><iframe id="b" style="width:800px;height:500px" src="/_playground-board/index.html?fresh=1&id=check&code=${encodeURIComponent('widget: balance')}"></iframe><script>window.last=null;addEventListener('message',function(e){if(e.data&&e.data.wp==='run')window.last=e.data})</script>` }));
await page.goto(`http://localhost:${port}/_check-host.html`);
await page.waitForFunction(() => document.getElementById('b').contentDocument && document.getElementById('b').contentDocument.readyState === 'complete');
const { MATH } = await import('./math-expr.mjs');
let n = 0, bad = 0;
for (const f of files) {
  const d = YAML.parse(readFileSync(f, 'utf8'));
  for (const [i, t] of (d.templates || []).entries()) {
    if (!t.board) continue;
    const rnd = PRACTICE.rng(99 + i), seen = new Set();
    for (let k = 0; k < 30; k++) {
      const g = PRACTICE.generate(t, rnd);
      if (!g || seen.has(g.board)) continue;
      seen.add(g.board); n++;
      const res = await page.evaluate((code) => { window.last = null; const fr = document.getElementById('b'); fr.contentWindow.postMessage({ wp: 'set-code', code }, location.origin); return new Promise((ok) => setTimeout(() => { const e = fr.contentDocument.getElementById('error'); ok({ err: e && !e.hidden ? e.textContent : '', last: window.last }); }, 120)); }, g.board);
      let why = res.err;
      // A board answer must use names the board reports, and must not already hold before the student does anything.
      if (!why && g.when) {
        const scope = res.last && res.last.state && res.last.state.scope;
        if (!scope) why = 'the board sent no values to check the answer against';
        else {
          const used = MATH.checkCondition(g.when).vars.filter((v) => !(v in (scope.vars || {})));
          if (used.length) why = `when "${g.when}" uses ${used.join(', ')}, which the board does not report`;
          else if (MATH.holds(g.when, scope)) why = `when "${g.when}" already holds before the student does anything`;
        }
      }
      if (why) { bad++; console.log(`✗ ${f} template ${i + 1}: ${why}\n${g.board}`); break; }
    }
  }
}
await browser.close(); srv.close();
console.log(bad ? `${bad} board setups failed` : `✓ ${n} practice board setups start without an error`);
process.exit(bad ? 1 : 0);
