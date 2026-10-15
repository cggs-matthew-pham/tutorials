---
marp: true
theme: default
html: true
---

# Capture the flag: the old archive

Capture the flag · Capture the flag: the old archive

<!-- Speaker note: The course challenge. Students find five flags in the club's fictional old archive, each with a skill from Digital systems (layered decoding, page source, ls -a and grep, a tiny processor's output read as character codes, and a key word kept beside its data), name the weakness behind each, and fix the front page's leaks (AC9TDI8K02 node 4, AC9TDI10P14 node 3). Defensive throughout. A 5E mission lesson. About 50 minutes (Engage 3 min · Explore (flags) 30 min · Explain 5 min · Elaborate 7 min · Evaluate 5 min). -->

---

## Today

**We are learning to** the club's old archive server is being wiped on Friday. Before it goes, find out what it still gives away: five flags, each found with a skill from Digital systems (decoding, page source, the command line, a tiny processor and a key word). Then close the archive's leaks so the secrets can be changed.

- I can use decoding, page source, the command line and character codes to find what a system gives away.
- I can name the weakness behind each find.
- I can say how each one should be fixed.

<!-- Speaker note: Before class: Try each flag yourself. Everything is made up and runs on the board; nothing touches a real system. Flags (for you, not students): 1 WP{layers-of-encoding} (base64, then hex), 2 WP{view-the-source} (the hidden field), 3 WP{grep-finds-it} (ls -a, then .gears/minutes.txt), 4 WP{cpu} (outputs 99, 112, 117), 5 WP{keys-unlock-it} (key word gears). Skills used: Encoding is not encryption and What your page gives away (this course); The command line lessons 1 and 2; A tiny processor (From gates to a processor) and Text as numbers. Students who haven't done the command line or processor courses can still get flags 3 and 4 with the hints, a code table and a few minutes' demo. Rules of the game: only test what you own or have permission to test, as here. Every find is reported and fixed. For more practice beyond this site, picoCTF (Carnegie Mellon) is free for school students; check its account and age requirements, and your school's policy, first. Optional: run it as a class event (pairs, first to five), keeping the hints available. Teacher: Evaluate: discuss why finders report rather than keep. -->

---

## Why it matters

> Five club secrets are still sitting in the old archive. Find them before Friday, so they can be changed.

<!-- Speaker note: A **capture the flag** (CTF) is a security challenge: you look for what a system gives away, with permission, and each find is a **flag**, a secret like **WP{…}** to type in. The archive is the club's and yours to check. Every flag is something that should never have been there, so the club can change it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**The archive is being wiped on Friday anyway. Why check what it gives away first?**

- Anything found may still be in use elsewhere, so it must be changed
- To copy the files
- It doesn't matter: it's being wiped
- To make the server faster

<!-- Speaker note: What happens: Secrets that leaked may still work: the same passwords and codes are often reused. Find them, then change them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask why a server that's about to be wiped still matters. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fctf%2Farchive%2Fstep-2&code=%23+The+note+on+the+archive%27s+front+page.%0Awidget%3A+encode%0Amode%3A+decode%0Adata%3A+NTcgNTAgN2IgNmMgNjEgNzkgNjUgNzIgNzMgMmQgNmYgNjYgMmQgNjUgNmUgNjMgNmYgNjQgNjkgNmUgNjcgN2Q%3D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/ctf/archive/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: circulate; ask which skill each flag needs before giving a hint. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Secrets that leaked may still work: the same passwords and codes are often reused. Find them, then change them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: what each flag shows

**Which flag shows that a key stored beside the data it protects is no protection?**

- Flag 4: the old program
- Flag 5: the key word was the hidden folder's name
- Flag 2: the hidden field
- Flag 1: the encoded note

* Answer: Flag 5: the key word was the hidden folder's name

<!-- Speaker note: Keys belong somewhere else (a password manager, the server), never next to what they lock. What this step is for: Naming the weakness behind each flag turns the hunt into a list of fixes. -->

<!-- Speaker note: Teacher: go through the five weaknesses and their fixes as a class. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: close the archive



[Open this step](https://studio.learningwaypoints.com/tutorials/systems/ctf/archive/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Ending a CTF the way defenders do: every finding becomes a fix. Hints, in order: For each leak: after the fix, does a visitor's browser still receive it? For students who need more support: A card listing the five skills and where each was taught. For early finishers: Design a sixth flag for the archive using another Digital systems idea (binary, pixels, or packets), with three escalating hints. The hard part, on purpose: Flags 3 and 5 depend on each other (the hidden folder's name is the key word). Students who skip flag 3 get stuck on 5: send them back. When students get stuck: A student can't decode flag 1 in one go. Ask: What came out after the first decoder? Which rule could make that? Fix: Decode again: it's two layers. / A student is stuck on flag 5. Ask: Did you find a name in the archive that could be a key word? Fix: The hidden folder from flag 3, without its dot. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Pick one flag: what gave it away, and how should the club fix it?**

* For example: the hidden field sent the backup value to every visitor; remove it and keep data on the server.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: End of the course. Security and privacy (Years 9–10) has its own capture the flag on a school portal. -->
