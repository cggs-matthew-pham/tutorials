---
title: "Security review"
subtitle: "Cyber safety and privacy · Security review · Lesson 8"
---

# Security review

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The club app launches tomorrow. Seven weaknesses are hiding in it. Find and fix them all.


:::teacher-note

**In one sentence:** The course finale. Students review the fictional club app's accounts, data and system, choose the fix that really closes each of seven weaknesses (wrong fixes explain why they fall short), collect three flags, then repeat on the launch-day copy with every fix right first time (AC9TDI10P13 node 1, AC9TDI10P14 node 3). Defensive throughout. A 5E mission lesson.

**Students should be able to say:** I can review a system's accounts, data and setup for weaknesses. I can choose a fix that really closes a weakness, and say why others don't. I can protect stored passwords with hashing and collect only what's needed.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**Why does a security team review its own app before it launches?**

☐ To find and fix weaknesses before anyone can use them

☐ To make the app run faster

☐ Because apps can't be fixed after launch

☐ To prove the programmers made no mistakes

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** To find and fix them first. Fixing before launch is cheaper and nobody's data is exposed.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: the flags

1. $\text{Accounts}$ — User weaknesses: reused passwords and no second factor. Fix: unique passphrases and MFA.
2. $\text{Data}$ — Privacy and storage: unneeded fields, passwords as typed, no notice. Fix: collect less, hash, tell people.
3. $\text{System}$ — Travelling and supply chain: no HTTPS, an old add-on. Fix: HTTPS and updates from the real source.
4. $\text{wrong fixes}$ — Each wrong option sounds helpful but leaves the weakness open: ask what it actually stops.

:::keep-together

### Accounts

**Flag 1: the Accounts section, once both its weaknesses are fixed, shows a flag. Type it.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

A unique passphrase stops a leak elsewhere opening this account (Passwords); a security key stops a stolen or phished password being enough (Second factors).

:::


:::keep-together

### Data

**Flag 2: the Data section's flag. Type it.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

Collect only what's needed (footprint, APP 3), store salted hashes so a copied database gives away no passwords (APP 11), and tell members what and why (APP 5).

:::


:::keep-together

### System

**Flag 3: the System section's flag. Type it.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

HTTPS protects data on the way (threat model); updating the add-on from its real source closes a supply-chain weakness.

:::


## Make: Elaborate: launch day


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Pick one weakness from the review: what was it, what fixed it, and why did one of the wrong fixes fall short?**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: passwords stored as typed; store salted hashes; renaming the column still leaves every password readable.

:::

