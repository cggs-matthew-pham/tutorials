---
title: "The Caesar cipher"
subtitle: "Secret messages · Secret codes · Lesson 3"
---

# The Caesar cipher

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Julius Caesar is said to have shifted each letter of his orders three places along the alphabet. Anyone who did not know the shift saw nonsense.


:::teacher-note

**In one sentence:** Students build the Caesar cipher, decrypt with it, and send encrypted messages by radio with a shared key.

**Students should be able to say:** I can explain what the key of a Caesar cipher is. I can encrypt and decrypt a message with the same key. I can explain why a receiver with the wrong key shows nonsense.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/dcaf0a75dc73.png?v=4f1df03690944a6b)

:::keep-together

**A is pressed. What does the micro:bit show?**

☐ DHOOR

☐ KHOOR

☐ HELLO

☐ EBIIL

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** KHOOR. H→K, E→H, L→O, L→O, O→R: each letter moves three places along.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/dcaf0a75dc73.png?v=4f1df03690944a6b)

:::keep-together

### Z wraps round

**With key 3, which place does Z (place 25) move to? (A is 0.)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

25 + 3 = 28, and 28 % 26 = 2: place 2 is C. Without % 26 it would run off the end of the alphabet.

:::


:::keep-together

### Key zero

**What does encrypt do with the key 0?**

☐ Every letter becomes A

☐ Nothing is changed

☐ Every letter moves one place

☐ It stops with an error

:::


:::teacher-note

**Answer:** Nothing is changed

A shift of 0 leaves each letter where it is. Key 26 does the same, because 26 % 26 is 0. A key of 0 or 26 would be no secret at all.

:::


:::keep-together

### Going back

**Ana encrypted a message with key 5. To decrypt it, which key should she use with the same encrypt function?**

☐ 10

☐ 26

☐ −5, or 21 (26 − 5)

☐ 5 again

:::


:::teacher-note

**Answer:** −5, or 21 (26 − 5)

Shifting by 5 and then by 21 is 26 places in all: the full circle back to the start. So decrypt(message, key) is encrypt(message, 26 − key).

:::


:::typical

## Modify

Add a **decrypt** function and test it by encrypting and decrypting **HELLO**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/478624f36eaf.png?v=8674a0fdcc286a34)

:::

:::


## Make

Make a **secret messenger**. **A** sends an encrypted message by radio and the receiver decrypts it with the same key; **B** adds one to the key on this micro:bit. Try it with both micro:bits using the same key, then with different keys. What does the receiver show?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4254afb1b649.png?v=b7a9f265f39367ba)

:::


## Exit ticket

:::keep-together

**What is the key in a Caesar cipher?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The number of places each letter shifts. Sender and receiver must use the same number.

:::

