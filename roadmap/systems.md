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

## Done (12 Oct 2026): Inside a computer

`systems/hardware` (Years 7–8, AC9TDI8K01, Hardware and logic pathway): What the specs mean (n1: spec sheet rows with what each measures and a kitchen comparison; phone, laptop, server), Find the bottleneck (n2: run jobs on an old laptop, time bars per part, upgrade the slowest), Choose the hardware (n3: Option A vs B on different jobs, four steps to a justified choice, the cheapest media-lab build within $900 and 60 s). New `hardware` widget. Misconceptions `ram-is-storage`, `storage-size-is-speed`, `biggest-spec-best`. The pathway's planned "Logic gates" card became "From gates to a processor" (adders, a tiny processor), since gates are taught in Data representation.

## Done (12 Oct 2026): From gates to a processor

`systems/logic` (Years 9–10 extension in the Hardware and logic pathway, after Data representation and Inside a computer; every lesson tagged AC9TDI8K04 n3, which the kit says adder circuits go further from): Combining gates (circuits row by row, build to a truth table, NOT and OR from NANDs, Make XOR), Adding with gates (half adder, 4-bit adder with carries and overflow, Make a full adder), Remembering a bit (an SR latch of two NORs, a 4-bit register), A tiny processor (fetch, decode, execute per clock tick; change data and instructions, STORE, a countdown loop; Make a program that outputs 2, 4, 6). New `gates` widget (build, adder, latch) and `cpu` widget. Misconceptions `gate-reads-switches`, `binary-digit-two`, `latch-forgets`, `code-not-numbers`. Logic gates themselves stay in Data representation (one home); this course reviews them and goes deeper.

## Done (12 Oct 2026): 10K02 tagged, theory concepts across subjects

- 10K02: the HTML & CSS course's Tags and nesting (n1), Rules and selectors (n1, n2), Page sections and components and the club page (n2) carry `node:`; the systems map now lists lessons from other subjects tagged with its descriptors (`tools/build-site.mjs`). n3 (why separation matters) has no lesson yet.
- Theory concepts: `THEORY` in `tools/concepts-core.mjs` (17 ids); every Digital systems lesson that teaches one `introduces:` it; the Caesar cipher `assumes: [text-as-numbers]`, p5 Shapes `assumes: [rgb-colour]`, Combining gates `assumes: [logic-gates]`. The lint accepts an introduction in another subject; lesson pages show "Builds on" and "Put to work in" links. Tests in `npm run check-concepts`.

## Done (12 Oct 2026): How a web page is made

`systems/web` (Years 9–10, AC9TDI10K02, Data pathway extension after Data representation): Three layers (n1, n2: swap style sheets, show the structure, style off; change one layer at a time; Make a new look without touching the HTML) and Why keep them apart (n3: a screen reader on two look-alike pages, one rule restyles a three-page site, phone width; Make: fix a page whose headings and list were faked with looks). A Knowledge and understanding home for 10K02 with no coding prerequisite; the HTML & CSS course keeps its 10K02 tags as hands-on practice, and Rules and selectors `assumes: [web-layers]` (a new theory concept), so the pages link both ways. New `webdoc` widget. Misconceptions `looks-is-structure`, `same-look-same-page`.

## Done (12 Oct 2026): The command line

`systems/shell` (Years 8–10, its own pathway "The command line"; 10K01 n1 for lessons 1–4, n3 for permissions): Where files live (pwd, ls, cd, paths, .., ~; a folder tree on the board), Reading and finding (cat, grep -i/-c, hidden files with ls -a; treasure hunt part 1), Changing files (mkdir, cp, mv, rm, rm -r, echo >; rm has no bin), Pipes (grep | wc, sort | uniq, head, >; treasure hunt part 2), Who can read what (ls -l, rwx and digits, chmod, only the owner; hidden is not private). New `shell` widget. Misconceptions `cd-moves-files`, `ls-shows-everything`, `rm-recycle-bin`, `pipe-reads-files`, `hidden-is-protected`. Real computers (Raspberry Pi, WebVM, Mac Terminal) are in the primer and teacher notes; no lesson needs one.

## Done (12 Oct 2026): Cyber safety and privacy

`systems/cyber` (Networks and security pathway, foundations), the first course built as 5E missions (`shape: 5e`, after the Packets pilot): the student is security officer for a made-up Coding Club app. Unit Protect your accounts (Years 7–8): Passwords (8P13 n1: a leak, reuse, passphrases, a password manager), Second factors (n2: codes, a fake page, security keys), Spot the phish (n3: an inbox, link checking, fix the club's own newsletter), Your digital footprint (8P14 n1–n3: given or collected as used, the purpose test, private settings). Unit Secure the system (Years 9–10): Threat models (10P13 n1: a data-flow diagram, risk and defence per point, new features), Kinds of weakness (n2: software, user, supply chain, descriptive only), The Australian Privacy Principles (10P14 n1–n2: audit, fix the breaches, write an APP 5 notice). Challenge: Security review (10P13 n1, 10P14 n3: seven weaknesses with three fixes each, three flags, then launch day with no wrong fixes). New `cyber` widget. Misconceptions `symbols-make-strong`, `mfa-only-important`, `right-name-is-safe`, `more-data-better`, `https-solves-all`, `good-code-is-safe`, `policy-means-anything`. Defensive and conceptual throughout: no attack or exploit practice; 10P13 n3 (exploring a vulnerability in the student's own software) is a class task with the teacher. picoCTF is named as the extension in the pathway text and the finale's teacher notes.

## Done (12 Oct 2026): Shapes as numbers, and Capture the flag

- Data representation lesson 3.5, Shapes as numbers (8K03 n3, 5E mission): a picture as two shapes and as a bitmap, zoom to 8×, more pixels still step; change a vector's numbers; a cube turned into a pyramid by moving corners; build the club badge from numbers. New `shapes` widget, theory concept `vector-graphics` (p5 Shapes now assumes it), misconception `every-image-pixels`.
- New course `systems/ctf`, Capture the flag (Years 8–10; Networks and security pathway, after Cyber safety, Networks and How a web page is made): Encoding is not encryption (8K02 n4: send a message past Eve, decode stored and layered data, read an encrypted reply with the shared key word), What your page gives away (10P14 n3: comments, hidden fields, scripts, a photo's location; checks belong on the server), and the challenge Capture the flag: the old archive (five flags: layered decoding, page source, ls -a and grep, the tiny processor's output as character codes, and a key word kept beside its data; then fix the page). New `encode` and `source` widgets, theory concept `encoding`, misconceptions `encoding-is-encryption`, `hidden-on-page-is-private`. Defensive throughout: the student's own made-up pages and files. Points and hints that cost points were not built: hints escalate and never give the flag.

## Done (12 Oct 2026): Network capture the flag

Networks gains a challenge unit: Network capture the flag (8K02 n2, n5; 5E mission). Four flags on the club's own made-up traffic: the readable packet in a Wi-Fi capture, a message put back in packet-number order, the packet TCP must ask for again, and the quickest route round an overloaded router; then fix every device that sends readable data. New `netctf` widget, misconception `wifi-password-is-https`. Single-player, like most jeopardy-style CTFs; run it as a class race if wanted.

Parked: a real-machine command-line CTF (Bandit-style levels over SSH on a Raspberry Pi or a virtual machine, with a setup script and site flag checks). Needs kit or a server, IT approval for SSH, and an isolated network, so it waits.

## Next

1. Years 5–6 versions (AC9TDI6K03, 6K04): counting dots, no place-value notation.
2. A CTF scoreboard (points, hints that cost points) only if classes want one; it would need storage the site doesn't have.
3. Decide after classroom trials whether to retrofit other Digital systems courses to 5E missions.

## Open questions

- Subject name: "Digital systems" (working name) or "How computers work".
- Hex: in the colour lesson, or Years 9–10?
- Sound: build a board or link out?
