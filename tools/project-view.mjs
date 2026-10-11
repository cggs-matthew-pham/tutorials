// Project pages (tools/projects.mjs): <course>/projects/ lists a course's briefs; <course>/projects/<id>/ is one brief
// with its playground(s). site/project.js lights the skills the student's own code uses, keeps the milestones and the
// reflection, and makes the badge and the "Show your teacher" card. Everything stays in this browser (wp-projects).

export const PROJECT_CSS = `
.pjlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin:18px 0}
.pjcard{display:flex;flex-direction:column;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;color:inherit;text-decoration:none}
.pjcard:hover{border-color:var(--accent)}.pjcard b{font-size:1.05rem}.pjcard img{width:100%;height:150px;object-fit:contain;background:var(--bg);border-radius:8px}
.pjcard small{color:var(--muted)}.pjcard .pjst{font-weight:600;color:var(--accent);font-size:14px}.pjcard .pjst:empty{display:none}
.pjtags{display:flex;flex-wrap:wrap;gap:4px}.pjtags span{font-size:12.5px;border:1px solid var(--line);border-radius:99px;padding:1px 8px;color:var(--muted)}
.pjtop{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:start}.pjtop figure{margin:0;max-width:340px}
.pjtop img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:10px;background:#fff}.pjtop figcaption{font-size:13.5px;color:var(--muted);margin-top:4px}
@media(max-width:720px){.pjtop{grid-template-columns:1fr}}
.pjgoal{font-size:16.5px}.pjafter{color:var(--muted);font-size:14.5px;margin:0 0 6px}
.pjbox{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin:16px 0}
.pjbox h2{font-size:1.05rem;margin:0 0 8px}.pjbox p{margin:6px 0}
.pjskills{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}
.pj-skill{display:inline-flex;align-items:center;gap:6px;border:1.5px dashed var(--line);border-radius:99px;padding:4px 12px;font-size:14.5px;color:inherit;text-decoration:none}
.pj-skill::before{content:'○';color:var(--muted)}.pj-skill.on{border-style:solid;border-color:var(--run,#1a7f37);background:color-mix(in srgb,var(--run,#1a7f37) 10%,var(--card))}
.pj-skill.on::before{content:'●';color:var(--run,#1a7f37)}
.pj-also{font-size:14px;color:var(--muted)}.pj-also:empty{display:none}
.pjms{list-style:none;padding:0;margin:0}.pjms li{margin:6px 0}.pjms label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;font-size:15.5px}
.pjms input{width:20px;height:20px;margin-top:1px;flex:none}
.pjbox textarea{width:100%;box-sizing:border-box;min-height:4.5em;font:inherit;font-size:15px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)}
.pjbtn{font:inherit;font-weight:600;font-size:15px;padding:8px 16px;border-radius:10px;border:1px solid var(--accent);background:var(--accent);color:#fff;cursor:pointer;margin:4px 8px 4px 0}
.pjbtn.ghost{background:transparent;color:var(--accent)}.pjbtn[disabled]{opacity:.45;cursor:default}
.pjclaim small{color:var(--muted);display:block}
.pjbadge{border:2px solid var(--accent);border-radius:16px;padding:16px 20px;margin:16px 0;background:color-mix(in srgb,var(--accent) 6%,var(--card))}
.pjbadge h2{margin:0 0 4px;font-size:1.25rem}.pjbadge .pjstar{color:var(--accent)}
.pjpart h2{font-size:1.1rem;margin:22px 0 6px}
dialog.pjshow{max-width:min(720px,94vw);width:100%;border:3px solid var(--accent);border-radius:20px;padding:26px 30px;background:var(--card);color:var(--ink)}
dialog.pjshow::backdrop{background:rgba(0,0,0,.55)}
.pjshow h2{font-size:1.8rem;margin:0 0 4px}.pjshow .pjk{font-size:15px;color:var(--muted);margin:0}.pjshow h3{font-size:1.05rem;margin:16px 0 6px}
.pjshow ul{margin:0;padding-left:1.3em;font-size:17px}.pjshow blockquote{margin:6px 0;padding:8px 14px;border-left:4px solid var(--accent);font-size:17px}
`;

const skillChip = (esc, part, i, u) => `<a class="pj-skill" data-part="${i}" data-c="${esc(u.id)}"${u.href ? ` href="${esc(u.href)}" title="Where this was taught"` : ''}>${esc(u.label)}</a>`;

/** The list of a course's briefs. cards: [{ id, title, after, goalText, pic, tags }] */
export function projectListBody({ esc, course, title, cards }) {
  return `<header class="top"><a class="crumb" href="../">← ${esc(title)}</a><h1>${esc(title)}: projects</h1>` +
    `<p class="lede">Build something of your own with what you have learned. Each project is a goal, not steps: pick one, make it your way, and earn its badge.</p></header>` +
    `<div class="pjlist">${cards.map((c) => `<a class="pjcard" href="${esc(c.id)}/" data-key="${esc(`${course}/${c.id}`)}">` +
      (c.pic ? `<img src="${esc(c.pic.src)}" alt="" width="${c.pic.w}" height="${c.pic.h}" loading="lazy">` : '') +
      `<b>${esc(c.title)}</b><small>After ${esc(c.after)}</small><span>${esc(c.goalText)}</span>` +
      `<span class="pjtags">${c.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</span><span class="pjst"></span></a>`).join('')}</div>` +
    `<p class="cfoot">Badges are saved in this browser only. To show your teacher, open a project and press Show your teacher.</p>`;
}

/** One brief. parts: [{ title, embed, uses: [{ id, label, href }] }]; pic: { src, w, h } | null. */
export function projectPageBody({ esc, md, course, courseTitle, p, after, pic, parts, data }) {
  const ms = (p.milestones || []).map((m, i) => `<li><label><input type="checkbox" data-ms="${i}"><span>${esc(m)}</span></label></li>`).join('');
  const stretch = (p.stretch || []).length ? `<section class="pjbox"><h2>Make it yours</h2><ul>${p.stretch.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>` : '';
  const skills = parts.map((pt, i) => `${parts.length > 1 ? `<p><b>${esc(pt.title)}</b></p>` : ''}<div class="pjskills">${pt.uses.map((u) => skillChip(esc, pt, i, u)).join('')}</div><p class="pj-also" data-part="${i}"></p>`).join('');
  return `<header class="top"><a class="crumb" href="../">← ${esc(courseTitle)}: projects</a><h1>${esc(p.title)}</h1></header>` +
    `<div class="pjtop"><div><p class="pjafter">Open project · after ${esc(after)}</p><div class="pjgoal">${md(String(p.goal || ''))}</div></div>` +
    (pic ? `<figure><img src="${esc(pic.src)}" alt="One way it could look" width="${pic.w}" height="${pic.h}"><figcaption>One way it could look. Yours will be different.</figcaption></figure>` : '') + `</div>` +
    `<section class="pjbox"><h2>You'll use</h2><p>These light up when your code uses them. Click one to see where you learned it.</p>${skills}</section>` +
    parts.map((pt) => `<section class="pjpart">${parts.length > 1 ? `<h2>${esc(pt.title)}</h2>` : ''}${pt.embed}</section>`).join('') +
    `<section class="pjbox"><h2>Milestones</h2><p>Tick each one when it is true of your project. Nobody marks it: be honest with yourself.</p><ul class="pjms">${ms}</ul></section>` +
    stretch +
    `<section class="pjbox"><h2>Looking back</h2><p><label for="pj-reflect">What was the hardest part, and how did you get past it?</label></p><textarea id="pj-reflect" placeholder="The hardest part was…"></textarea>` +
    `<p class="pjclaim"><button type="button" class="pjbtn" id="pj-claim" disabled>Claim the badge</button><small id="pj-why">Tick every milestone first.</small></p></section>` +
    `<section class="pjbadge" id="pj-badge" hidden><h2><span class="pjstar">★</span> ${esc(p.title)}</h2><p id="pj-when"></p><p><b>You built it with:</b> <span id="pj-used"></span></p>` +
    `<button type="button" class="pjbtn" id="pj-show">Show your teacher</button><button type="button" class="pjbtn ghost" id="pj-dl">Download my code</button></section>` +
    `<dialog class="pjshow" id="pj-dialog" aria-label="Your badge"><p class="pjk">${esc(courseTitle)} · project badge</p><h2><span class="pjstar">★</span> ${esc(p.title)}</h2><p class="pjk" id="pjd-when"></p>` +
    `<h3>Built with</h3><ul id="pjd-used"></ul><h3>Milestones</h3><ul id="pjd-ms"></ul><h3>The hardest part</h3><blockquote id="pjd-reflect"></blockquote>` +
    `<form method="dialog"><button class="pjbtn">Close</button></form></dialog>` +
    `<script type="application/json" id="pj-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}
