---
marp: true
theme: default
html: true
---

# Capture the flag: secure the portal

Security and privacy · Capture the flag

<!-- Speaker note: A capture-the-flag finale. Students test a fictional school portal with the course's boards, capture four flags (a phishing address, a weak password found by auditing hashes, an over-wide permission, the right key), fix the permissions and switch on MFA, then match each weakness to its fix (AC9TDI10K01 node 5). About 50 minutes (Predict and Try 6 min · Flags 22 min · Fix 8 min · Report 8 min · Discussion 6 min). -->

---

## Today

**We are learning to** a security team tests a system before attackers do. Use everything from this course to find four weaknesses in a school portal (a lookalike link, a weak password, a wrong permission and an unlocked message), capture a flag for each, then fix the portal and match each weakness to its fix.

- I can find weaknesses in a system using what I know about addresses, hashes, permissions and keys.
- I can fix a system so each role has only what it needs.
- I can match a weakness to the fix that stops it.

<!-- Speaker note: Before class: Defensive framing throughout: the portal is fictional and theirs to test; every finding leads to a fix and a report. Talk about permission: testing someone else's system without it is illegal (Criminal Code Act 1995 (Cth), Part 10.7) and against school rules. Flags (case does not matter): - Flag 1: WP{203.0.113.10} - Flag 2: WP{zoe} (her password is football) - Flag 3: WP{marks} - Flag 4: WP{alice-public} The kit's node 5 asks students to trace data through a networked system and say where each mechanism operates; the report step does that. Secret messages (Code) has its own capture the flag on micro:bits; classes that did it will recognise the format. Teacher: Try: ask what the address tells you about who owns the site. Teacher: Flags: let pairs split the four flags, then explain to each other. Teacher: Fix: ask what zoe should do as well (change her password, use a passphrase). Teacher: Report: ask which weakness is most serious, and why. -->

---

## Why it matters

> Security teams are paid to find the holes in their own systems first. Today the portal is yours to test.

<!-- Speaker note: A **capture the flag** (CTF) is a security challenge: you look for weaknesses in a system you have permission to test, and each one you find gives you a **flag**, a secret word to type in. Security teams do this to their own systems so they can fix the holes before attackers find them. The school portal is yours to test. There are four weaknesses, one for each lesson in this course. Each flag looks like **WP{…}**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Why do security teams try to break into their **own** school or company systems?**

- It's against the rules, so they don't
- To find and fix the weaknesses before real attackers find them
- To slow the system down
- To get into other people's accounts

<!-- Speaker note: What happens: To fix them first. Testing only systems you have permission to test, and reporting what you find, is called ethical hacking or penetration testing. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: have students say what makes testing ethical (permission, reporting). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fsecurity%2Fctf%2Fstep-2&code=widget%3A+security%0Amode%3A+dns%0Aaddress%3A+schoo1.edu.au%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/security/ctf/?full=step-2#step-2)

<!-- Speaker note: Keep that address in mind for the first flag. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* To fix them first. Testing only systems you have permission to test, and reporting what you find, is called ethical hacking or penetration testing.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Capture four flags

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fsecurity%2Fctf%2Fstep-3&code=widget%3A+security%0Amode%3A+dns%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/security/ctf/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Each flag needs one idea from the course applied to the portal: DNS, hashing, permissions and public keys. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Flag 1: the real address

**Flag 1 (names and addresses). Students should type the real portal's name instead of clicking links. What is the real portal's IP address? Look up school.edu.au. The flag is WP{ then the address, then }.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: school.edu.au is 203.0.113.10. The phishing link went to 198.51.100.66. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Flag 2: the weak password

**Flag 2 (hashes). The portal's stored hashes are on the board. The five most common passwords are 123456, password, qwerty, dragon and football. Type each and see whether its hash is in the list. Which user has one of them? The flag is WP{ then the user's name, then }.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: football hashes to 6382deaf1f5d: zoe's. The other users have long passphrases that are on no guess list. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Flag 3: the wrong permission

**Flag 3 (permissions). Sign in as Sam (password maple) and test what a student can do. Which file can students change that they should only read? The flag is WP{ then the file name in lower case, then }.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: Students can change Marks. They should only read them. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Flag 4: the right key

**Flag 4 (keys). The portal sends Alice's new password to her. Which key must lock it so only Alice can read it? Test the choices. The flag is WP{alice-public}, WP{alice-private} or WP{bob-own}: pick the one that works.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: Alice's public key (her padlock): anyone can lock with it, only her private key opens it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Fix: secure the portal



[Open this step](https://studio.learningwaypoints.com/tutorials/systems/security/ctf/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Turning the findings into fixes is the point of the challenge: least privilege and multi-factor sign-in close two of the holes on the board. Hints, in order: Students should read Marks, not change them. / Click the Students row's Marks cell until it says read. / Then switch on multi-factor sign-in. For students who need more support: A checklist card: names and addresses, hashes, permissions, keys, with the board for each. For early finishers: Write a one-page security report for the portal: each finding, how serious it is (low, medium, high), and the fix. The hard part, on purpose: Students want to guess flags. Insist each flag comes from a board: say which board and what you saw. When students get stuck: A student guesses flag 2. Ask: Which common passwords have you hashed so far? Fix: Type each of the five; one lights a row. / A student stuck on flag 4. Ask: Which padlock let Alice open the box and kept Eve out? Fix: Test all three on the board. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the report

Then: which weakness would you fix first, and why?

<!-- Speaker note: What this step is for: Matching each weakness to its fix is the security report: what was found, and what stops it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two weaknesses you found in the portal and the fix for each.**

* Any two: phishing link (check the exact address), weak password (passphrase, salted hashes, MFA), students could change marks (least privilege), unlocked message (receiver's public key, HTTPS).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This closes Security and privacy, and the Digital systems Years 9–10 work on 10K01. Code links: Secret messages (micro:bit ciphers, key exchange, challenge and response, its own capture the flag). -->
