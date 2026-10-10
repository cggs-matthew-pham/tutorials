---
order: 4
unit: codes
title: Breaking a Caesar cipher
summary: A Caesar cipher has only 25 useful keys, so trying them all breaks it in moments. Seeing why is how you learn what a strong key needs.
language: makecode
hook: "People who design codes spend their time breaking them. A code is only trusted once many people have tried hard to break it and failed."
---
Last lesson you built a cipher. Now you find out how strong it is, by breaking messages that **you** are given. This is how codes are tested: the people who build them try to break them first.

The program below tries a key each time you press **A**: it decrypts a secret message with key 1, then 2, then 3, and so on. A person reads each attempt and spots the one that makes sense.

## Predict

```step
stage: predict
code: crack.ts#predict
check:
  type: predict
  q: "The secret is KHOOR. You press A three times. What does the micro:bit show after the third press?"
  options: ["JGNNQ", "IFMMP", "HELLO", "KHOOR"]
  actual: "HELLO. Press 3 tries key 3, which undoes the shift of 3 (K→H, H→E, O→L, O→L, R→O)."
```

## Run

```step
stage: run
code: crack.ts#predict
try: { playground: microbit, starter: "crack.ts#predict" }
check: { type: reflect, text: "I pressed A until readable English appeared, and I saw which key it was." }
```

## Investigate

```step
stage: investigate
code: crack.ts#predict
insight: "A Caesar cipher has only 25 keys, so trying them all is quick. Letter counts break it even faster. A strong code needs a huge number of possible keys, and more than that."
tasks:
  - check:
      type: number
      q: "At most, how many different keys do you have to try to break any Caesar cipher message? (Key 0 changes nothing.)"
      answer: 25
      explain: "The shift can be 1 to 25, so 25 tries is the most it can take. On average about 13."
  - check:
      type: question
      q: "In English, the most common letter is E. In a long cipher text the most common letter is L. What is the likely key?"
      options: ["3", "7", "11", "25"]
      answer: 1
      explain: "L is 7 places after E (E→F→G→H→I→J→K→L). So the key is probably 7. Counting letters finds a Caesar key without trying them all."
  - check:
      type: question
      q: "Lee says: 'If I use a 100-letter message instead of a 5-letter one, it is harder to break.' Is that right for a Caesar cipher?"
      options: ["Yes, longer is stronger", "No: a longer message gives more clues, and the key is still one of 25", "Yes, but only with spaces", "No, because the key changes each letter"]
      answer: 1
      explain: "Strength comes from how many keys are possible, not how long the message is. A longer message actually makes letter counting work better."
```

### How many tries

### Counting letters

### A longer message

## Modify

```step
stage: modify
insight: "A person is doing the work of recognising English. A program can count the tries for them."
try: { playground: microbit, starter: "crack.ts#predict" }
hint: "Add a variable tries, add one to it each time A is pressed, and show it when B is pressed."
check: { type: code, text: "B shows how many keys you have tried so far.", rules: { contains: ["tries+=1", "input.onButtonPressed(Button.B", "basic.showNumber(tries)"] } }
```

Count how many keys you try: **B** shows the number of tries so far.

## Capture the flag

```step
stage: make
tier: typical
try: { playground: microbit, starter: "crack.ts#make" }
check:
  type: flag
  q: "This cipher text was encrypted with a Caesar key: RLFZ THAALY. Decrypt it. The flag is WP{ then the message in lower case, then }."
  hash: a2d3c9a91a33664514e6438b44fe0978ed94f6ce3e855db497b1114a217da5b9
  explain: "The key was 7. Letter counting would have found it: the most common letter in the cipher text is L, 7 places after E."
```

Your first **flag**. A flag is a secret answer that proves you solved a puzzle. Use the program (it already holds the cipher text) to find the message, then type the flag in the exact form: `WP{` + the message in lower case + `}`.

For example, a message **HELLO THERE** would give the flag `WP{hello there}`.
