---
title: "Capture the flag: secure the portal"
subtitle: "Security and privacy · Capture the flag · Lesson 5"
---

# Capture the flag: secure the portal

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Security teams are paid to find the holes in their own systems first. Today the portal is yours to test.


:::teacher-note

**In one sentence:** A capture-the-flag finale. Students test a fictional school portal with the course's boards, capture four flags (a phishing address, a weak password found by auditing hashes, an over-wide permission, the right key), fix the permissions and switch on MFA, then match each weakness to its fix (AC9TDI10K01 node 5).

**Students should be able to say:** I can find weaknesses in a system using what I know about addresses, hashes, permissions and keys. I can fix a system so each role has only what it needs. I can match a weakness to the fix that stops it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Why do security teams try to break into their **own** school or company systems?**

☐ It's against the rules, so they don't

☐ To find and fix the weaknesses before real attackers find them

☐ To slow the system down

☐ To get into other people's accounts

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** To fix them first. Testing only systems you have permission to test, and reporting what you find, is called ethical hacking or penetration testing.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Capture four flags


:::keep-together

### Flag 1: the real address

**Flag 1 (names and addresses). Students should type the real portal's name instead of clicking links. What is the real portal's IP address? Look up school.edu.au. The flag is WP{ then the address, then }.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

school.edu.au is 203.0.113.10. The phishing link went to 198.51.100.66.

:::


:::keep-together

### Flag 2: the weak password

**Flag 2 (hashes). The portal's stored hashes are on the board. The five most common passwords are 123456, password, qwerty, dragon and football. Type each and see whether its hash is in the list. Which user has one of them? The flag is WP{ then the user's name, then }.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

football hashes to 6382deaf1f5d: zoe's. The other users have long passphrases that are on no guess list.

:::


:::keep-together

### Flag 3: the wrong permission

**Flag 3 (permissions). Sign in as Sam (password maple) and test what a student can do. Which file can students change that they should only read? The flag is WP{ then the file name in lower case, then }.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

Students can change Marks. They should only read them.

:::


:::keep-together

### Flag 4: the right key

**Flag 4 (keys). The portal sends Alice's new password to her. Which key must lock it so only Alice can read it? Test the choices. The flag is WP{alice-public}, WP{alice-private} or WP{bob-own}: pick the one that works.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

Alice's public key (her padlock): anyone can lock with it, only her private key opens it.

:::


:::typical

## Fix: secure the portal


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Make: the report

Then: which weakness would you fix first, and why?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Name two weaknesses you found in the portal and the fix for each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Any two: phishing link (check the exact address), weak password (passphrase, salted hashes, MFA), students could change marks (least privilege), unlocked message (receiver's public key, HTTPS).

:::

