---
order: 9
unit: defend
title: Capture the flag
summary: Solve three puzzles that use the ciphers and checks you have built. Each answer is a flag you type in to prove you solved it.
language: makecode
hook: "Capture-the-flag contests are a favourite way for people to learn security: puzzle after puzzle, each hiding a flag. Solving them is how you get a feel for what makes a code strong or weak."
---
A **flag** is a secret answer, in the form `WP{...}`, that proves you solved a puzzle. Each puzzle uses something you built in this course. The page keeps only a scrambled fingerprint of each right answer, so you have to solve them.

## Predict

```step
stage: predict
code: toolkit.ts#toolkit
check:
  type: predict
  q: "The toolkit's checksum adds each letter's place (A is 0) and keeps the last digit. Press A+B on the first message, HELLO. What checksum does it show?"
  options: ["4", "7", "11", "47"]
  actual: "7. H (7) + E (4) + L (11) + L (11) + O (14) = 47, and the last digit is 7."
```

## Run

```step
stage: run
code: toolkit.ts#toolkit
try: { playground: microbit, starter: "toolkit.ts#toolkit" }
check: { type: reflect, text: "I tried all three buttons and saw what each one does." }
```

The toolkit has a tool for each puzzle: **A** tries the next Caesar key on puzzle 1; **B** shows the next puzzle 2 number after XOR with a key; **A+B** shows the checksum of the next puzzle 3 message.

## Investigate

```step
stage: investigate
code: toolkit.ts#toolkit
insight: "Each tool from the course breaks one weakness: Caesar by trying keys, XOR once the key is known, a checksum by recomputing it."
tasks:
  - check:
      type: flag
      q: "Puzzle 1. A Caesar cipher: RIZIV WIRH OICW. Find the message. The flag is WP{ then the message in lower case, then }."
      hash: af9787681cbac20980b2e7679c61e239a514533f3dee25fb33721aef2289b991
      explain: "Key 4. The tool tries every key and one of them reads as English."
  - check:
      type: flag
      q: "Puzzle 2. These numbers were each locked with XOR and the key 9: 26, 12, 10, 27, 12, 29. Unlock them (B does this). Then turn each number into a letter, where 1 is A, 2 is B and so on. The flag is WP{ then the word in lower case, then }."
      hash: 5c0a17af78cc41198dc4c9f022e037970326fc4af4912c1504baba308456ab4b
      explain: "XOR with 9 gives 19, 5, 3, 18, 5, 20: S E C R E T."
  - check:
      type: flag
      q: "Puzzle 3. Four messages arrived with their checksums: HELLO 7, MEET 9, KEY 3, LOCK 7. One was damaged on the way. Which? The flag is WP{ then that word in lower case, then }."
      hash: f861c37d0c695d2e756d6dae3568a6f35f4391b7984599697ee2b0cfca2adbd2
      explain: "KEY adds to 38, so its checksum should be 8, not 3. The other three match."
```

### Puzzle 1: Caesar

### Puzzle 2: XOR

### Puzzle 3: checksum

## Make

```step
stage: make
try: { playground: microbit, starter: "toolkit.ts#make" }
hint: "Use encrypt with a key you choose, and show the cipher text with basic.showString. Make sure your puzzle has a clear answer."
check: { type: code, text: "A puzzle for a partner: A shows a message you have encrypted.", rules: { contains: ["input.onButtonPressed(Button.A", "basic.showString(encrypt("] } }
```

Make a puzzle for a partner: **A** shows a secret message that you encrypted with a Caesar key. Keep the key to yourself. Then solve your partner's.
