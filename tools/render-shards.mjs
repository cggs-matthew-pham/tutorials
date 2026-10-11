// Split clip recording across parallel CI jobs (publish workflow). render.mjs itself is unchanged: its source is part
// of every clip's hash, so this lives beside it.
//   node tools/render-shards.mjs plan --seed <site> --shards N [--out plan.json]
//     Asks render.mjs which clips need recording (--seed --check: unchanged clips are downloaded into dist/ as usual),
//     then shares the lessons out so each job gets about the same number of clips. A lesson stays in one job, since
//     render.mjs starts its app once per lesson. Writes stale=N and matrix=[0,1,...] to $GITHUB_OUTPUT.
//   node tools/render-shards.mjs run --shard K --seed <site> [--plan plan.json] [--copy-to <dir>]
//     Records shard K's lessons, one `render.mjs --lesson <slug> --seed <site>` each (WP_DEADLINE and the other
//     environment settings pass through). --copy-to copies each lesson's dist/<slug>/clips there for upload, even
//     after a failure, so what was recorded is kept. Exits 1 if any lesson failed.
import { spawnSync } from 'node:child_process';
import { writeFileSync, readFileSync, existsSync, cpSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [cmd, ...argv] = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const SITE = opt('--seed');
const PLAN = opt('--plan', 'plan.json');
const output = (s) => process.env.GITHUB_OUTPUT && writeFileSync(process.env.GITHUB_OUTPUT, s + '\n', { flag: 'a' });

if (cmd === 'plan') {
  const n = Math.max(1, Math.min(8, Number(opt('--shards', 4)) || 4));
  const r = spawnSync('node', ['tools/render.mjs', ...(SITE ? ['--seed', SITE] : []), '--check'], { encoding: 'utf8', maxBuffer: 64 << 20, env: { ...process.env, GITHUB_OUTPUT: '' } });
  process.stdout.write(r.stdout);
  process.stderr.write(r.stderr);
  // "○ <slug>/<step id>: needs recording"; slugs contain slashes, step ids do not.
  const count = new Map();
  for (const m of r.stdout.matchAll(/^○ (.+)\/([^/\s:]+): needs recording$/gm)) count.set(m[1], (count.get(m[1]) || 0) + 1);
  // Largest lessons first, each into the job with the fewest clips so far.
  const shards = Array.from({ length: Math.min(n, count.size) }, () => ({ lessons: [], clips: 0 }));
  for (const [slug, c] of [...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    const s = shards.reduce((a, b) => (b.clips < a.clips ? b : a));
    s.lessons.push(slug);
    s.clips += c;
  }
  const stale = [...count.values()].reduce((a, b) => a + b, 0);
  writeFileSync(opt('--out', PLAN), JSON.stringify({ stale, shards }, null, 1) + '\n');
  shards.forEach((s, i) => console.log(`Job ${i}: ${s.clips} clip(s) in ${s.lessons.length} lesson(s)`));
  console.log(`Plan: ${stale} clip(s) to record in ${shards.length} parallel job(s).`);
  output(`stale=${stale}`);
  output(`matrix=${JSON.stringify(shards.map((_, i) => i))}`);
  process.exit(0);
}

if (cmd === 'run') {
  const k = Number(opt('--shard'));
  const plan = JSON.parse(readFileSync(PLAN, 'utf8'));
  const shard = plan.shards[k];
  if (!shard) { console.error(`No shard ${k} in ${PLAN}`); process.exit(1); }
  const copyTo = opt('--copy-to');
  const failed = [];
  let recorded = 0;
  for (const slug of shard.lessons) {
    // render.mjs's own per-run total ("Clips: 0 downloaded, 1 recorded or failed") is noise once per lesson: drop it
    // and count the ✓ lines instead. Errors (stderr) still show as they happen.
    const r = spawnSync('node', ['tools/render.mjs', '--lesson', slug, ...(SITE ? ['--seed', SITE] : [])], { stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 64 << 20 });
    const lines = (r.stdout || '').split('\n').filter((l) => l && !l.startsWith('Clips:'));
    if (lines.length) console.log(lines.join('\n'));
    recorded += lines.filter((l) => l.startsWith('✓')).length;
    if (r.status !== 0) failed.push(slug);
    const clips = join('dist', slug, 'clips');
    if (copyTo && existsSync(clips)) { mkdirSync(join(copyTo, slug), { recursive: true }); cpSync(clips, join(copyTo, slug, 'clips'), { recursive: true }); }
  }
  if (failed.length) {
    const msg = `Job ${k}: ${recorded} of ${shard.clips} clips recorded; failed in ${failed.join(', ')}. The publish job keeps the live version of anything missing.`;
    console.error('✗ ' + msg);
    if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, `- ${msg}\n`, { flag: 'a' });
    process.exit(1);
  }
  console.log(`Job ${k}: ${recorded} of ${shard.clips} clips recorded.`);
  process.exit(0);
}

console.error('Usage: render-shards.mjs plan --seed <site> --shards N | run --shard K --seed <site> [--copy-to dir]');
process.exit(1);
