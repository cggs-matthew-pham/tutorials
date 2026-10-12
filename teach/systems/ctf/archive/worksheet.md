---
title: "Capture the flag: the old archive"
subtitle: "Capture the flag · Capture the flag: the old archive · Lesson 3"
---

# Capture the flag: the old archive

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Five club secrets are still sitting in the old archive. Find them before Friday, so they can be changed.


:::teacher-note

**In one sentence:** The course challenge. Students find five flags in the club's fictional old archive, each with a skill from Digital systems (layered decoding, page source, ls -a and grep, a tiny processor's output read as character codes, and a key word kept beside its data), name the weakness behind each, and fix the front page's leaks (AC9TDI8K02 node 4, AC9TDI10P14 node 3). Defensive throughout. A 5E mission lesson.

**Students should be able to say:** I can use decoding, page source, the command line and character codes to find what a system gives away. I can name the weakness behind each find. I can say how each one should be fixed.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**The archive is being wiped on Friday anyway. Why check what it gives away first?**

☐ Anything found may still be in use elsewhere, so it must be changed

☐ To copy the files

☐ It doesn't matter: it's being wiped

☐ To make the server faster

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Secrets that leaked may still work: the same passwords and codes are often reused. Find them, then change them.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: what each flag shows

1. $\text{Flag 1}$ — Encoding is not encryption: base64 and hex hide nothing.
2. $\text{Flag 2}$ — The page gives away its hidden field: keep data on the server.
3. $\text{Flag 3}$ — A hidden folder isn't private: use permissions, or don't keep it.
4. $\text{Flag 4}$ — Numbers in memory are text to anyone who reads them as codes.
5. $\text{Flag 5}$ — A key kept next to its data protects nothing.

### Which flag?

:::keep-together

**Which flag shows that a key stored beside the data it protects is no protection?**

☐ Flag 4: the old program

☐ Flag 5: the key word was the hidden folder's name

☐ Flag 2: the hidden field

☐ Flag 1: the encoded note

:::


:::teacher-note

**Answer:** Flag 5: the key word was the hidden folder's name

Keys belong somewhere else (a password manager, the server), never next to what they lock.

:::


## Make: Elaborate: close the archive


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Pick one flag: what gave it away, and how should the club fix it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: the hidden field sent the backup value to every visitor; remove it and keep data on the server.

:::

