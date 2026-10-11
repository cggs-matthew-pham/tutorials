// Write progression pages (data/progressions/<subject>/<code>.md) from a waypoints-kit checkout, in the same layout as
// the pasted pages, so the node check (tools/progressions.mjs) covers a descriptor without pasting.
//   node tools/kit-page.mjs <kit checkout> AC9M7ST01 AC9M7P01 ...      (writes only pages that do not exist yet)
// The kit (cggs-matthew-pham/waypoints-kit, public) keeps one JSON file per descriptor under data/<subject>/.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [kit, ...codes] = process.argv.slice(2);
if (!kit || !codes.length) { console.error('usage: node tools/kit-page.mjs <waypoints-kit checkout> <code> ...'); process.exit(1); }
const SUBJ = { M: 'maths', S: 'science' };
const MODE = { context_breadth: '↔ Widen contexts', consolidation: '◆ Practise here', structured_reasoning: '◎ Scaffold reasoning', integration: '⊕ Integration point', repertoire_building: '▣ Build a repertoire', width_opportunity: '★ Width opportunity' };

for (const code of codes) {
  const subject = SUBJ[code.charAt(3)];
  const dir = join(kit, 'data', subject);
  const file = readdirSync(dir).find((f) => f.endsWith(`_${code}.json`));
  if (!file) { console.error(`✗ ${code}: not in ${dir}`); process.exitCode = 1; continue; }
  const out = join('data/progressions', subject, `${code}.md`);
  if (existsSync(out)) { console.log(`= ${out} exists (kept)`); continue; }
  const d = JSON.parse(readFileSync(join(dir, file), 'utf8')), s = d.standard;
  const title = s.title.charAt(0) + s.title.slice(1).toLowerCase().replace(/\b(acara|ac9\w*)\b/gi, (w) => w.toUpperCase());
  const L = [`# ${code} — ${title}`, '', `**Year ${d.year_level}**`, `**Strand:** ${s.strand}`, '', '## ACARA Descriptor', '', s.description, ''];
  if (s.elaborations?.length) L.push('## ACARA Elaborations', '', ...s.elaborations.map((e) => `- ${e}`), '');
  L.push('## Prior Knowledge', '', s.prior_knowledge || '', '', '## Progression Endpoint', '', s.progression_endpoint || '', '');
  const nodes = s.nodes || [];
  L.push(`## Waypoint Sequence (${nodes.length} waypoints, ${nodes.filter((n) => n.hinge).length} hinge${nodes.filter((n) => n.hinge).length === 1 ? '' : 's'})`, '');
  for (const n of nodes) {
    L.push(`#### ${n.id}. ${n.label}${n.hinge ? ' ⚑' : ''}${n.width_opportunity ? ' ★' : ''}`, '', n.progression_checkpoint || '', '');
    if (n.hinge && n.hinge_reason) L.push(`**⚑ Hinge:** ${n.hinge_reason}`, '');
    if (n.response_modes?.length) L.push('**Response modes:**', ...n.response_modes.map((r) => `- ${MODE[r.mode] || r.mode}: ${r.reason}`), '');
    if (n.minimum_width) L.push(`**Minimum width:** ${n.minimum_width}`, '');
    if (n.typical_width) L.push(`**Typical width:** ${n.typical_width}`, '');
    if (n.wider?.length) L.push('**Wider:**', ...n.wider.map((w) => `- ${w}`), '');
    if (n.success_criteria?.length) L.push('**Success criteria:**', ...n.success_criteria.map((c) => `- ${c}`), '');
    if (n.related_standards?.length) L.push('**Related standards:**', ...n.related_standards.map((r) => `- ${r}`), '');
  }
  writeFileSync(out, L.join('\n').replace(/\n{3,}/g, '\n\n'));
  console.log(`✓ ${out}`);
}
