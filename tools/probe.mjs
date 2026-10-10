// `node tools/probe.mjs <url> [outDir]`: can a headless browser load this site? Prints a short report
// and saves a screenshot. Used by the manual "Probe a site" workflow to test recording feasibility.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const url = process.argv[2];
const out = process.argv[3] || 'probe-out';
if (!url) { console.error('usage: node tools/probe.mjs <url> [outDir]'); process.exit(2); }
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: out, size: { width: 1280, height: 720 } } });
const page = await ctx.newPage();
const problems = [];
page.on('pageerror', (e) => problems.push('pageerror: ' + String(e).slice(0, 200)));
page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text().slice(0, 200)); });

const t = Date.now();
let status = 'loaded';
try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); } catch (e) { status = 'goto failed: ' + e.message.split('\n')[0]; }
await page.waitForTimeout(15000); // let a heavy single-page app settle

const info = await page.evaluate(() => {
  const gl = (() => { try { const c = document.createElement('canvas'); const g = c.getContext('webgl2') || c.getContext('webgl'); if (!g) return null; const d = g.getExtension('WEBGL_debug_renderer_info'); return d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'webgl available'; } catch { return null; } })();
  const texts = [...document.querySelectorAll('button,a,[role=button],[role=menuitem],input,label')].map((e) => (e.innerText || e.value || e.getAttribute('aria-label') || '').trim()).filter(Boolean);
  return { title: document.title, url: location.href, webgl: gl, canvases: document.querySelectorAll('canvas').length, iframes: document.querySelectorAll('iframe').length, controls: [...new Set(texts)].slice(0, 60), body: document.body.innerText.slice(0, 600) };
});
const report = JSON.stringify({ status, seconds: ((Date.now() - t) / 1000).toFixed(1), ...info, problems: problems.slice(0, 15) }, null, 2);
console.log(report);
writeFileSync(join(out, 'report.json'), report);
await page.screenshot({ path: join(out, 'screenshot.png') });
await ctx.close();
await browser.close();
