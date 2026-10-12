---
title: "Capture the flag"
subtitle: "Secret messages · Defend the system · Lesson 9"
---

# Capture the flag

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Capture-the-flag contests are a favourite way for people to learn security: puzzle after puzzle, each hiding a flag. Solving them is how you get a feel for what makes a code strong or weak.


:::teacher-note

**In one sentence:** Students solve three capture-the-flag puzzles (Caesar, XOR, checksum), typing flags that the page checks without storing the answers, then write a puzzle for a partner.

**Students should be able to say:** I can use a Caesar tool, an XOR key and a checksum to solve puzzles. I can explain what a flag is. I can write a cipher puzzle for someone else.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/d5ce8c2207bb.png?v=b6f5226e62a9191c)

:::keep-together

**The toolkit's checksum adds each letter's place (A is 0) and keeps the last digit. Press A+B on the first message, HELLO. What checksum does it show?**

☐ 4

☐ 7

☐ 11

☐ 47

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 7. H (7) + E (4) + L (11) + L (11) + O (14) = 47, and the last digit is 7.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/d5ce8c2207bb.png?v=b6f5226e62a9191c)

:::keep-together

### Puzzle 1: Caesar

**Puzzle 1. A Caesar cipher: RIZIV WIRH OICW. Find the message. The flag is WP{ then the message in lower case, then }.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

Key 4. The tool tries every key and one of them reads as English.

:::


:::keep-together

### Puzzle 2: XOR

**Puzzle 2. These numbers were each locked with XOR and the key 9: 26, 12, 10, 27, 12, 29. Unlock them (B does this). Then turn each number into a letter, where 1 is A, 2 is B and so on. The flag is WP{ then the word in lower case, then }.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

XOR with 9 gives 19, 5, 3, 18, 5, 20: S E C R E T.

:::


:::keep-together

### Puzzle 3: checksum

**Puzzle 3. Four messages arrived with their checksums: HELLO 7, MEET 9, KEY 3, LOCK 7. One was damaged on the way. Which? The flag is WP{ then that word in lower case, then }.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** A flag (the exact answer is in the teacher notes)

KEY adds to 38, so its checksum should be 8, not 3. The other three match.

:::


## Make

Make a puzzle for a partner: **A** shows a secret message that you encrypted with a Caesar key. Keep the key to yourself. Then solve your partner's.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4ec37d2045bb.png?v=8a44f09152ec1149)

:::


## Exit ticket

:::keep-together

**What is a flag in a capture-the-flag puzzle?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A secret answer in a fixed form that proves you solved the puzzle.

:::

