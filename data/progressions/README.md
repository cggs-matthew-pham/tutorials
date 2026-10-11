# Progression data

One page per curriculum descriptor, `<subject>/<code>.md` (for example `maths/AC9M7A01.md`), copied as is from the
Learning Waypoints progressions (the waypoints-kit markdown export). Descriptor text and elaborations are from the
Australian Curriculum v9 (ACARA, CC BY 4.0); the waypoint sequences, prior knowledge and success criteria are
Learning Waypoints' own.

`tools/progressions.mjs` reads the code, year, Prior Knowledge (the descriptor codes it names) and each waypoint
(node number, title, hinge, success criteria). Lessons name their node in frontmatter (`node: AC9M7A01 n2`), and
`npm run validate` warns when a lesson's prerequisite is neither taught in an earlier lesson nor listed in `assumes:`.
Prerequisites from an earlier year count as taught in class. `npm run nodes` prints the map per course.

To add a descriptor, paste its page here with the code as the file name, or write it from a waypoints-kit checkout
(cggs-matthew-pham/waypoints-kit, public): `node tools/kit-page.mjs <kit checkout> AC9M7ST01 ...` (keeps pages that exist). Related standards are not prerequisites
(many point forward) and the check ignores them.
