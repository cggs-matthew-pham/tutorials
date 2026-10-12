---
title: "One key to lock and unlock"
subtitle: "Secret messages · Secret codes · Lesson 5"
---

# One key to lock and unlock

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Most of the secret messages on the internet are locked with a key that both ends already share. The locking step is much like this lesson, only with far bigger numbers.


:::teacher-note

**In one sentence:** Students lock and unlock numbers with XOR and a shared key, and meet the weakness of sending the same locked message every time.

**Students should be able to say:** I can lock a number with XOR and a shared key and unlock it with the same key. I can explain why a wrong key gives a wrong answer without an error. I can say why sending the same locked message each time is a weakness.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bbda7337c79a.png?v=0f879c9f00a53964)

:::keep-together

**A is pressed. The radio carries a number. What does the receiving micro:bit show?**

☐ 2

☐ 5

☐ 7

☐ 12

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 7. The radio carried 7 ^ 5 = 2. The receiver computes 2 ^ 5 = 7, the original number.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bbda7337c79a.png?v=0f879c9f00a53964)

:::keep-together

### Locking a number

**What number does the radio carry when the sender encrypts 6 with key 3? (6 is 110 in bits and 3 is 011.)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

110 XOR 011 = 101, which is 5.

:::


:::keep-together

### A wrong key

**The sender encrypted 6 with key 3, so the radio carries 5. A receiver wrongly uses key 4. What does it show?**

☐ An error message

☐ 6

☐ 1

☐ Nothing

:::


:::teacher-note

**Answer:** 1

5 ^ 4 = 101 ^ 100 = 001 = 1. The receiver gets a wrong number and no warning. Nothing in XOR tells you the key was wrong.

:::


:::keep-together

### Why it works both ways

**Why does the receiver use the very same operation the sender used?**

☐ Because XOR undoes itself when you repeat it with the same key

☐ Because the micro:bit remembers the number

☐ Because 5 is a special key

☐ Because the radio flips the bits back

:::


:::teacher-note

**Answer:** Because XOR undoes itself when you repeat it with the same key

(message ^ key) ^ key = message. The key cancels itself.

:::


:::typical

## Modify

Let **B** change the key and show it. Set the key the same on both micro:bits, then press **A**. Then make the keys different. What happens?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/93005f34cb5c.png?v=cfdb23e1fe3601dd)

:::

:::


## Make


**The PIN.** 

**The same number again.** Send a four-digit PIN, locked with a shared key, to a second micro:bit that unlocks and shows it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The PIN:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4a113ba628d5.png?v=2d69874acb3f976a)

:::


## Exit ticket

:::keep-together

**Why does the receiver use the same key and the same operation as the sender?**

{{lines-3}}

:::


:::teacher-note

**Answer:** XOR with the same key undoes itself: (message ^ key) ^ key = message.

:::

