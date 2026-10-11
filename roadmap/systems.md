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

## Next

1. Text as numbers (AC9TDI8K03 n2): `bits` with `view: char` (show the character for the number; ASCII range, a note on Unicode and emoji). Apply: Secret messages uses character codes.
2. `pixels` widget (grid, click to colour, numbers beside, RGB sliders) → lesson 4 Colour and images; later `view: rle` for Making data smaller (AC9TDI10K03).
3. Lesson 5 Sound as numbers: probably link-heavy.
4. Years 5–6 versions (AC9TDI6K03, 6K04): counting dots, no place-value notation.
5. Cross-pathway concepts: the concept lint is per language (`CONCEPTS[lesson.language]`), so theory concepts (`bit`, `char-code`, `rgb`) cannot yet be `assumes:` in MakeCode or Python lessons. Needs a small change in `tools/concepts.mjs` (a shared concept list checked across languages, and `systems` in `prerequisites()`'s subject list). Check `roadmap/shared.md` first.
6. Why binary (8K04 n3): logic gates, a `logic` widget. Binary and encoding (8K04 n4) as the unit's closing lesson.

## Open questions

- Subject name: "Digital systems" (working name) or "How computers work".
- Hex: in the colour lesson, or Years 9–10?
- Sound: build a board or link out?
