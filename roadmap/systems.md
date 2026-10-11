# Roadmap: Digital systems

The Digital Technologies Knowledge and understanding strand (v9 "K" descriptors), as its own subject beside Code, Maths and Science: `content/systems/`. Plan and reasons: Project doc `digital-systems-plan.md` (12 Oct 2026). In short: no coding prerequisite, the maths lesson shape (Predict, Try, Worked example, Vary, Practise, Make) on the shared board, borrow open resources (CS Unplugged, CS Field Guide, Digital Technologies Hub) and build only where a lesson needs a check, one home per idea with links into the Code pathway.

## Done (12 Oct 2026): pilot, binary numbers

- Subject `content/systems/index.md` ("Digital systems", trail by units): pathways Data representation (built: Data representation; planned: Making data smaller, Years 9–10), Networks and security (planned: Networks; Security and privacy, which links to Secret messages for the ciphers themselves), Hardware and logic (planned).
- Course `systems/data`, unit Binary numbers: 1. Bits and binary numbers, 2. How many patterns? (both AC9TDI8K04). Primer `primers/binary.md`. Misconceptions `binary-place-reversed`, `binary-max-forgets-zero`.
- Board widget `bits` (`playground-board/widgets/bits.js`; AUTHORING › board). Explain clips record (tested silent here); pictures are drawn at publish.
- Lessons use `language: maths`: that is what gives board checks, `answer` checks, worked examples and the maths stage names.
- Wording is our own around CS Unplugged's ideas (credited in teacher `sources:` and the primer), so no CC BY-SA text is copied. A site-wide content licence is still Matthew's decision.

## Done (12 Oct 2026): nodes from waypoints-kit, Everything is numbers

- The kit (`cggs-matthew-pham/waypoints-kit`, `data/technologies/`) has node files for every DT Knowledge and understanding descriptor, F–10. Progression pages for 6K03, 6K04, 8K01–8K04 and 10K01–10K03 are in `data/progressions/systems/`; `data/curriculum/systems.json` holds the Years 7–10 K descriptors (P descriptors belong to Code) with map rows by topic (Data representation, Digital systems, Networks and security, Web documents). Map on at `/systems/map/`.
- The kit lists all of AC9TDI8K03 as prior knowledge for 8K04. Order on the site: 1. Everything is numbers (8K03 n1, new, `decode` widget), 2. Bits and binary numbers (8K04 n1), 3. How many patterns? (8K04 n2). Lesson 2 `assumes:` 8K03 n2–n4 until the text, image and sound lessons exist; drop that when they are written (they may come after binary, which the check would then flag, so decide the order then).
- Kit points to remember: 8K04 n3 is why binary (circuits and logic gates) and n4 ties binary to encoding; 8K02 n3–n4 (why secure data, simple encryption) and 10K01 n4 (public key and hashing) overlap Secret messages; 10K02 is the HTML and CSS course's descriptor; 8K03 n3 includes vector images.

## Done (12 Oct 2026): data as numbers before binary

Matthew: hook first, plumbing after, which is also the kit's order (all of 8K03 before 8K04). Unit Data as numbers: 1. Everything is numbers (n1), 2. Text as numbers (n2, `decode` with `type: on`, Unicode beyond one byte), 3. Colour and images (n3, new `pixels` board; vector pictures as a question), 4. Sound as numbers (n4, new `sampling` board with play buttons). Unit Binary numbers: 5. Bits and binary numbers, 6. How many patterns? (pays off the 0 to 255 limits met earlier). The temporary `assumes:` is gone. New misconceptions `digit-char-code`, `light-mixes-like-paint`, `sound-stored-as-wave`. All Try and Make checks tested in a headless browser; all explain clips record.

## Done (12 Oct 2026): logic gates, bits all the way down, Making data smaller

- Data representation lessons 7 and 8: Why binary: logic gates (8K04 n3; new `logic` board with a circuit view and a half adder) and Bits all the way down (8K04 n4; data → number → byte on eight cards). Course complete for 8K03 and 8K04.
- New course `systems/compression` (Making data smaller, Years 9–10, after Data representation): Run-length encoding (10K03 n1 and n2; `pixels` with `mode: bw` and `rle: on`, draw-from-codes Make) and Lossy or lossless (n3; `pixels` with `lossy: on` and a tolerance slider). Misconceptions `or-means-not-both`, `char-one-bit`, `rle-start-white`, `lossy-recoverable`.
- `tools/concepts.mjs` `prerequisites()` reads the systems subject too, so `after:` between Digital systems courses counts.

## Done (12 Oct 2026): Networks course

`systems/networks` (Years 7–8, AC9TDI8K02): Wired or wireless (n1), Packets (n2, TCP resending a lost packet, broken links and rerouting), Who can see your data? (n3 and n4: an eavesdropper on café Wi-Fi, encryption with a shift key, weak keys 0 and 10), Across the internet (n5: the whole purchase with a step log; Make is a Parsons ordering with one wrong step). New `network` widget, four modes. One home per idea: Secret messages (Code) stays the home of building, cracking and sharing ciphers; these lessons are what encryption is for, with a light encrypt-decrypt cycle so the node is covered for students who skip MakeCode. Misconceptions `bandwidth-is-latency`, `resend-whole-message`, `packets-private`, `encrypt-at-router`. Clip ports moved to 8460–8499 (the maths chat had reused 8320–8333).

## Done (12 Oct 2026): Security and privacy course, with a capture the flag

`systems/security` (Years 9–10, AC9TDI10K01, after Networks): What the operating system does (n1: apps, OS, drivers, app permissions), Names and addresses (n2: DNS, IP, router tables, private and public addresses, a lookalike domain), Who are you, and what may you do? (n3: authentication, MFA, authorisation, least privilege), Hashes and keys (n4: stored hashes, salt, public and private keys), and Capture the flag: secure the portal (n5, the challenge unit: four `flag` puzzles, one per lesson, then fix the permissions with MFA and sort weaknesses into fixes). Defensive framing throughout; all addresses from the documentation ranges; practice accounts only. New `security` widget, five modes, with a built-in SHA-256 for clips (the clip stage is not a secure context). Misconceptions `apps-talk-to-hardware`, `lookalike-domain`, `signed-in-means-allowed`, `hash-reversible`.

## Next

1. Hardware (8K01: specifications and performance; choosing hardware for a job).
2. Concept links: Secret messages should `assumes:` character codes (needs the cross-language concept change, item 4).
3. Years 5–6 versions (AC9TDI6K03, 6K04): counting dots, no place-value notation.
4. Cross-pathway concepts: the concept lint is per language (`CONCEPTS[lesson.language]`), so theory concepts (`bit`, `char-code`, `rgb`) cannot yet be `assumes:` in MakeCode or Python lessons. Needs a small change in `tools/concepts.mjs` (a shared concept list checked across languages, and `systems` in `prerequisites()`'s subject list). Check `roadmap/shared.md` first.
5. Computers and the command line: five lessons on a browser `shell` board, then a teacher-led Raspberry Pi unit (environments and lessons in the Project doc digital-systems-plan).
6. More security and CTF: Rules of the game, guessing passwords, encoding is not encryption, what a page gives away; cross-pathway flags and a capstone CTF; picoCTF (Carnegie Mellon) as the linked extension (check its account and age terms).
7. Shapes as numbers (optional, 8K03): vector vs raster, meshes as lists of vertices; Engineering › 3D and animation builds on it.

## Open questions

- Subject name: "Digital systems" (working name) or "How computers work".
- Hex: in the colour lesson, or Years 9–10?
- Sound: build a board or link out?
