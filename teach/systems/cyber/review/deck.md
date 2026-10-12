---
marp: true
theme: default
html: true
---

# Security review

Cyber safety and privacy · Security review

<!-- Speaker note: The course finale. Students review the fictional club app's accounts, data and system, choose the fix that really closes each of seven weaknesses (wrong fixes explain why they fall short), collect three flags, then repeat on the launch-day copy with every fix right first time (AC9TDI10P13 node 1, AC9TDI10P14 node 3). Defensive throughout. A 5E mission lesson. About 40 minutes (Engage and Explore 15 min · Explain 8 min · Elaborate 10 min · Evaluate 7 min). -->

---

## Today

**We are learning to** before the club app launches, review it like a security team: inspect its accounts, its data and its system, choose the fix that really closes each weakness, and collect a flag for each section you make safe. Everything from the course comes together: unique passphrases and MFA, collecting only what is needed, hashed passwords, a real privacy notice, HTTPS and updates.

- I can review a system's accounts, data and setup for weaknesses.
- I can choose a fix that really closes a weakness, and say why others don't.
- I can protect stored passwords with hashing and collect only what's needed.

<!-- Speaker note: Before class: Try the board yourself. The club app is made up. Flags (for you, not students): Accounts WP{unique-and-mfa}, Data WP{only-what-we-need}, System WP{patched-and-encrypted}. Each appears on the board when its section is fully fixed, so the flags reward the fixing; they aren't puzzles. The one idea: a review checks every part of a system and picks fixes by what they actually stop. Years 7–8 classes can do this lesson after the first unit: the Data and System sections then lean on your explanation of hashing and HTTPS. Extension: picoCTF (Carnegie Mellon) has free CTF practice for school students; check its account and age requirements, and your school's policy, before recommending it. Teacher: Evaluate: discuss what should happen each time the app gets a new feature. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

## Why it matters

> The club app launches tomorrow. Seven weaknesses are hiding in it. Find and fix them all.

<!-- Speaker note: **Your mission:** the club app launches tomorrow. Review it the way a security team reviews its own systems: inspect every part, choose fixes that really close each weakness, and collect a flag for each section you make safe. Each flag looks like **WP{…}**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**Why does a security team review its own app before it launches?**

- To find and fix weaknesses before anyone can use them
- To make the app run faster
- Because apps can't be fixed after launch
- To prove the programmers made no mistakes

<!-- Speaker note: What happens: To find and fix them first. Fixing before launch is cheaper and nobody's data is exposed. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what a security team is for. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Freview%2Fstep-2&code=widget%3A+cyber%0Amode%3A+review%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/cyber/review/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<!-- Speaker note: Teacher: ask which wrong fix sounded most convincing, and why it falls short. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* To find and fix them first. Fixing before launch is cheaper and nobody's data is exposed.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Accounts

**Flag 1: the Accounts section, once both its weaknesses are fixed, shows a flag. Type it.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: A unique passphrase stops a leak elsewhere opening this account (Passwords); a security key stops a stolen or phished password being enough (Second factors). -->

<!-- Speaker note: Teacher: ask which lesson of the course each flag comes from. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Data

**Flag 2: the Data section's flag. Type it.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: Collect only what's needed (footprint, APP 3), store salted hashes so a copied database gives away no passwords (APP 11), and tell members what and why (APP 5). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## System

**Flag 3: the System section's flag. Type it.**

* Answer: A flag (the exact answer is in the teacher notes)

<!-- Speaker note: HTTPS protects data on the way (threat model); updating the add-on from its real source closes a supply-chain weakness. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: launch day



[Open this step](https://tutorials.learningwaypoints.com/systems/cyber/review/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The same review with no second tries: every fix must be right first time, showing the course's ideas are secure. Hints, in order: For each weakness, ask what each fix actually stops. / A fix that only sounds careful (rename, hide, ask nicely) leaves the weakness open. For students who need more support: The course's idea cards beside the board: passwords, MFA, footprint, threat model, kinds of weakness, APPs. For early finishers: Add one new feature to the club app (events sign-up, say) and write its threat model and privacy notice. The hard part, on purpose: Students click fixes until one works. The launch-day copy needs every fix right first time, so the reasoning matters. When students get stuck: A student picks 'Add a ! to the end of it'. Ask: If the old password leaked, what would someone try first? Fix: Small changes to a leaked password are first on the list: use a unique passphrase. / A student picks hashing to fix the missing HTTPS. Ask: Is the password travelling or stored at this point? Fix: HTTPS on the way, hashing in storage. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Pick one weakness from the review: what was it, what fixed it, and why did one of the wrong fixes fall short?**

* For example: passwords stored as typed; store salted hashes; renaming the column still leaves every password readable.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: End of the course. The Security and privacy course (Years 9–10) goes deeper into how sign-in, hashing and keys work, and has its own capture the flag. -->
