---
title: "Breaking a Caesar cipher"
subtitle: "Secret messages · Secret codes · Lesson 4"
---

# Breaking a Caesar cipher

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** People who design codes spend their time breaking them. A code is only trusted once many people have tried hard to break it and failed.


:::teacher-note

**In one sentence:** Students break Caesar ciphers by trying every key, learn that the number of possible keys decides strength, and capture their first flag.

**Students should be able to say:** I can break a Caesar cipher by trying every key. I can explain why a cipher with only 25 keys is weak. I can say why a longer message does not make a Caesar cipher stronger.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ab9fd85cb603.png?v=26c8b3d4c2f4db1e)

:::keep-together

**The secret is KHOOR. You press A three times. What does the micro:bit show after the third press?**

☐ JGNNQ

☐ KHOOR

☐ HELLO

☐ IFMMP

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** HELLO. Press 3 tries key 3, which undoes the shift of 3 (K→H, H→E, O→L, O→L, R→O).

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ab9fd85cb603.png?v=26c8b3d4c2f4db1e)

:::keep-together

### How many tries

**At most, how many different keys do you have to try to break any Caesar cipher message? (Key 0 changes nothing.)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 25

The shift can be 1 to 25, so 25 tries is the most it can take. On average about 13.

:::


:::keep-together

### Counting letters

**In English, the most common letter is E. In a long cipher text the most common letter is L. What is the likely key?**

☐ 3

☐ 7

☐ 11

☐ 25

:::


:::teacher-note

**Answer:** 7

L is 7 places after E (E→F→G→H→I→J→K→L). So the key is probably 7. Counting letters finds a Caesar key without trying them all.

:::


:::keep-together

### A longer message

**Lee says: 'If I use a 100-letter message instead of a 5-letter one, it is harder to break.' Is that right for a Caesar cipher?**

☐ Yes, longer is stronger

☐ No, because the key changes each letter

☐ No: a longer message gives more clues, and the key is still one of 25

☐ Yes, but only with spaces

:::


:::teacher-note

**Answer:** No: a longer message gives more clues, and the key is still one of 25

Strength comes from how many keys are possible, not how long the message is. A longer message actually makes letter counting work better.

:::


:::typical

## Modify

Count how many keys you try: **B** shows the number of tries so far.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/60bac968f59d.png?v=4ac8602445e455cd)

:::

:::


:::typical

## Make: Capture the flag

Your first **flag**. A flag is a secret answer that proves you solved a puzzle. Use the program (it already holds the cipher text) to find the message, then type the flag in the exact form: `WP{` + the message in lower case + `}`.

For example, a message **HELLO THERE** would give the flag `WP{hello there}`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why can a Caesar cipher be broken so quickly?**

{{lines-3}}

:::


:::teacher-note

**Answer:** There are only 25 keys, so trying them all is quick; letter counts shorten it further.

:::

