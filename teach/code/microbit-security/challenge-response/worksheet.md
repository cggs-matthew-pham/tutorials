---
title: "Prove it with a challenge"
subtitle: "Secret messages · Trust · Lesson 8"
---

# Prove it with a challenge

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Car key fobs, tap-to-pay cards and building passes do not send a fixed code. The reader sends a random number, and the card answers in a way only it can. Next time the number is different.


:::teacher-note

**In one sentence:** Students build a challenge-and-response lock so that a heard answer cannot be used again, then add a lockout after three wrong answers.

**Students should be able to say:** I can describe the four steps of a challenge and response. I can explain why an answer heard once does not open the lock again. I can say what never crosses the air.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7abe47c17eee.png?v=326263dc0ec2acac)

:::keep-together

**The key micro:bit knocks. The lock picks the challenge 50. The answer is (n × 7 + 3) remainder 100. What answer goes through the air?**

☐ 7

☐ 50

☐ 53

☐ 353

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 53. 50 × 7 + 3 = 353, and the remainder after dividing by 100 is 53.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7abe47c17eee.png?v=326263dc0ec2acac)

:::keep-together

### Working out an answer

**The lock picks the challenge 20. What answer opens the lock? (n × 7 + 3, remainder after dividing by 100.)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 43

20 × 7 + 3 = 143, and the remainder after dividing by 100 is 43.

:::


:::keep-together

### An answer heard before

**Yesterday the lock's challenge was 50 and the answer 53. Today the lock picks a new challenge. Why is 53 unlikely to open it today?**

☐ 53 is used up

☐ Radio forgets old numbers

☐ The lock changes its key

☐ The new challenge is almost certainly different, so its answer is different

:::


:::teacher-note

**Answer:** The new challenge is almost certainly different, so its answer is different

The answer depends on the challenge. A new challenge gives a new answer, so an old answer fits only the old challenge.

:::


:::keep-together

### What crosses the air

**For each item, does it cross the air in the challenge-and-response?**

Groups: Crosses the air, Never crosses the air

- The knock: {{field-15}}
- The challenge: {{field-15}}
- The answer: {{field-15}}
- The secret key: {{field-15}}

:::


:::teacher-note

**Answer:** The knock → Crosses the air; The challenge → Crosses the air; The answer → Crosses the air; The secret key → Never crosses the air

:::


:::typical

## Modify

Make the lock count how many times it opened, and show the count when **B** is pressed.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/fa6b4a2d246f.png?v=05d97cda83418c2a)

:::

:::


## Make

Make the lock safer. After **three wrong answers** it shows a skull and ignores knocks for **five seconds**. Why does this help against someone who just guesses?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b65e1eddfc13.png?v=1cbfff1297495444)

:::


## Exit ticket

:::keep-together

**Why does a challenge and response protect a lock better than a fixed password?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The answer depends on a fresh challenge, so an answer that was heard before no longer fits.

:::

