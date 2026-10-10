// npm run check-html (after npm run render and npm run build). Chromium: CHROMIUM_PATH or /opt/pw-browsers/chromium.
// Walk every HTML lesson: each code region renders (pictures load unless meant to be broken), every static check
// passes with its stored answer, every code check ticks when its solution is pasted, and no page errors.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const { loadLessons, getSnippet } = await import('./lesson.mjs');
const lessons = loadLessons().filter((l) => l.slug.startsWith('code/html/'));
const srv = spawn('node', ['tools/serve.mjs', 'dist', '8261'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const U = 'http://127.0.0.1:8261/';
const { existsSync } = await import('node:fs');
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined), args: ['--no-sandbox'] });
let fails = 0; const errs = [], bad = [];
const ok = (c, m) => { if (!c) { fails++; console.log('  ✗ ' + m); } };
for (const l of lessons) {
  console.log(l.slug);
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  // Bug-task regions are meant to be broken: errors while they render are expected.
  const bugRegions = new Set(l.steps.flatMap((s) => [s.config.check, ...s.tasks.map((t) => t.config.check)]).filter((k) => k?.type === 'bug' && k.code).map((k) => String(k.code).split('#')[1]));
  let region = null;
  p.on('pageerror', (e) => { if (!bugRegions.has(region)) errs.push(l.slug + (region ? ' ' + region : '') + ': ' + e.message); }); p.on('response', (r) => { if (r.status() >= 400 && !/trophey|medal\.png/.test(r.url())) bad.push(r.status() + ' ' + r.url()); });
  // 1. regions render
  const src = readFileSync(join(l.dir, 'page.html'), 'utf8');
  const regions = [...src.matchAll(/<!-- region: ([\w-]+) -->\n([\s\S]*?)<!-- endregion -->/g)];
  for (const [, name, code] of regions) {
    region = name;
    await p.goto(U + '_playground-html/index.html?code=' + encodeURIComponent(code));
    await p.waitForFunction(() => window.__playground?.updates > 0); await p.waitForTimeout(250);
    const f = await (await p.$('#preview')).contentFrame();
    const imgs = await f.$$eval('img', (a) => a.map((i) => [i.getAttribute('src'), i.complete && i.naturalWidth > 0]));
    for (const [s, loaded] of imgs) ok(loaded || /trophey|medal\.png/.test(s), `${name}: picture ${s} did not load`);
  }
  // 2. lesson checks
  region = null;
  await p.goto(U + l.slug + '/'); await p.waitForTimeout(800);
  ok(await p.evaluate(() => typeof window.evalRules === 'function'), 'the lesson script did not run (a bare tag in Markdown, such as <style>, can swallow it)');
  const put = async (step, code) => { const f = await (await p.locator(`#${step} iframe`).elementHandle()).contentFrame(); await f.waitForFunction(() => window.__playground?.updates > 0); await f.locator('#code').fill(code); await f.locator('#code').dispatchEvent('input'); await p.waitForTimeout(450); };
  for (const s of l.steps) {
    const sec = p.locator('#' + s.id); await sec.scrollIntoViewIfNeeded();
    const items = s.tasks.length ? s.tasks.map((t, i) => ({ t, i, k: t.config.check, id: t.id })) : [{ t: null, i: 0, k: s.config.check, id: s.id }];
    for (const { t, i, k, id } of items) {
      if (!k) continue;
      if (t) await sec.locator('.taskpills [role=tab]').nth(i).click();
      const box = t ? sec.locator('.tpanel.active .check, .tasks .check').nth(0) : sec.locator('.check').first();
      const scope = t ? sec.locator(`.check[data-key="${l.slug}/${id}"]`) : box;
      const msg = async () => (await scope.locator('.msg').textContent()) || '';
      if (k.type === 'reflect') { await scope.locator('input[type=checkbox]').check(); }
      else if (k.type === 'predict') { if (k.options) await scope.locator('input[type=radio]').first().check(); else await scope.locator('input').first().fill('1'); await scope.locator('button').first().click(); }
      else if (k.type === 'question') { await scope.locator('input[type=radio]').nth(k.answer).check(); await scope.locator('button').click(); }
      else if (k.type === 'number') { await scope.locator('input').fill(String(k.answer)); await scope.locator('button').click(); }
      else if (k.type === 'match') { const want = JSON.parse(await scope.getAttribute('data-answers')); const sels = scope.locator('select'); for (let j = 0; j < want.length; j++) await sels.nth(j).selectOption(want[j]); await scope.locator('button').click(); }
      else if (k.type === 'trace') { const cells = scope.locator('input.tcell'); for (let j = 0; j < await cells.count(); j++) await cells.nth(j).fill(await cells.nth(j).getAttribute('data-answer')); await scope.locator('button').click(); }
      else if (k.type === 'bug') { for (const a of [].concat(k.answer)) await scope.locator('.buglines button').nth(Number(a) - 1).click(); }
      else if (k.type === 'parsons') {
        // solve by clicking pieces in the correct order
        const want = getSnippet(l.dir, k.code).replace(/\n$/, '').split('\n').filter((x) => x.trim());
        for (const line of want) { const piece = scope.locator('.ppool button, .pieces button, [data-line]').filter({ hasText: line.trim() }).first(); if (await piece.count()) await piece.click(); }
        const chk = scope.locator('.pcheck'); if (await chk.count()) await chk.click();
      }
      else if (k.type === 'code') {
        const ref = l.teacher?.solutions?.[id];
        ok(ref, `${id}: no solution`); if (!ref) continue;
        await put(s.id, getSnippet(l.dir, ref));
      }
      const m = await msg();
      const passed = /Got it|Unlocked|Locked in/.test(m) || (await scope.evaluate((e) => e.classList.contains('done')));
      ok(passed, `${id} (${k.type}): ${m.slice(0, 80)}`);
      if (passed) console.log(`  ✓ ${id} ${k.type}`);
    }
  }
  console.log('  expected reveals:', await p.locator('details.expected').count(), '| explain clip:', await p.locator('details.explain video').count());
  await p.close();
}
console.log(fails ? `${fails} failure(s)` : 'all checks pass', '| page errors:', errs, '| http:', bad);
await b.close(); srv.kill(); process.exit(fails ? 1 : 0);
