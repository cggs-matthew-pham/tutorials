# Roadmap: Maths

The maths chat's file. Lessons live in `content/maths/`. Design notes and status so far are in the project docs (`maths-structure`, `maths-boards-plan`, `maths-expressions-status`, `maths-graphs-7a04-status`, `board-embed-contract`); record new decisions here.

## Planned: prerequisite checks (decided 11 Oct 2026, not built)

The code-style scan does not carry over: maths and science have no code to scan, and their tutorials sit beside class teaching. Checked against the repo: no lesson has a `node:` field (the node is named only in `teacher.yml` summaries, such as Plates "AC9S8U03, node 2"), and the repo holds no progression data (`prior_knowledge` lives in waypoints-kit and no build step reads it). 55 science and 19 maths lessons.

- **Maths:** dependencies are prior skills in a chain, so the ACARA node graph fits. Each lesson gets a `node:` field (today the node is only named in the teacher notes), and the waypoints-kit `prior_knowledge` is exported into the repo (it is not in the repo or read by the build today). The check warns when a lesson's prerequisite node is neither taught in an earlier lesson nor marked `assumes:` (taught in class). In the lesson itself, the prerequisite is checked with a short retrieval question at the start or in Practise, not taken for granted.
- **Maths:** prerequisites form a skills chain, so the node graph fits; in the lesson, a prerequisite is checked with a short retrieval question at the start or in Practise, not assumed.

The shared part (progression data in the repo, the `node:` field and the node check in validate) is in `shared.md` › Shared: progression data and node check.
