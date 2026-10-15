---
title: "Defend the door lock"
subtitle: "Secret messages · Defend the system · Lesson 10"
---

# Defend the door lock

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Security teams run 'red team, blue team' exercises. The blue team defends: they audit their own system, find where it is weak, and fix it before anyone else can find the same weakness.


:::teacher-note

**In one sentence:** Students audit a radio door lock, match each weakness to a tool from the course, and harden it in three milestones: a cipher, a keyed checksum and a challenge and response.

**Students should be able to say:** I can audit a system and name its weaknesses. I can match each weakness with a tool that fixes it. I can build a lock that is private, notices changes and cannot be reused.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b93341699a3e.png?v=c574889743213f20)

:::keep-together

**A is pressed on the key micro:bit. A third micro:bit in the same radio group is switched on. Which micro:bits can read the door code 4271?**

☐ Only the lock and the key

☐ Only the lock

☐ Every micro:bit in the group

☐ None: radio is private

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Every micro:bit in the group. The code goes out as plain text, which is the lesson from the very first lesson in this course.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Audit


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b93341699a3e.png?v=c574889743213f20)

:::keep-together

### Find the weaknesses

**Match each weakness of the door lock with the tool that fixes it.**

Groups: Encrypt it with a shared key, Add a checksum with a secret key, Use a challenge and response

- The code 4271 goes out as plain text, so every micro:bit in the group can read it: {{field-15}}
- The lock can't tell a damaged or changed message from a real one: {{field-15}}
- The same message opens the lock every time, so one that was heard once works again: {{field-15}}

:::


:::teacher-note

**Answer:** The code 4271 goes out as plain text, so every micro:bit in the group can read it → Encrypt it with a shared key; The lock can't tell a damaged or changed message from a real one → Add a checksum with a secret key; The same message opens the lock every time, so one that was heard once works again → Use a challenge and response

:::


:::keep-together

### The key

**Which fix needs the key to be agreed beforehand, or by a key exchange?**

☐ All three: each uses the secret key

☐ Only the checksum

☐ Only the challenge and response

☐ None of them

:::


:::teacher-note

**Answer:** All three: each uses the secret key

The cipher, the keyed checksum and the answer function all use the same secret key, so both ends need it before they start. That is what a key exchange is for.

:::


:::typical

## Milestone 1: lock the code

Send the code **locked with secretKey** instead of as text, and have the lock unlock it before checking.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3ce3505bb32f.png?v=ff76daf9ae7c4ada)

:::

:::


## Make: Milestones 2 and 3: harden it


**Milestone 2: a checksum on the knock.** Replace the locked code with a **knock** that carries a keyed checksum. The lock goes on only if the checksum matches.

**Milestone 3: a challenge and response.** Instead of a fixed code, the lock sends a **random challenge**; the key answers it, and the lock opens only on the right answer. The functions **checksum** and **answer** are already in the starter: you built them in earlier lessons.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Milestone 2: a checksum on the knock:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b2dae48ecca5.png?v=ec7f256934e1f607)

**Milestone 3: a challenge and response:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/08cd13b8662f.png?v=94d8fae9b5a7b90d)

:::


:::wider

## Report

Every protection in your lock rests on one secret key. Security is the habit of asking "what could go wrong here?", then fixing each answer.

:::


## Exit ticket

:::keep-together

**Name the three weaknesses of the starting lock and the fix for each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Readable by the group: encrypt with a shared key. A changed message can't be told: a keyed checksum. A heard message works again: challenge and response.

:::

