---
title: "How many patterns?"
subtitle: "Data representation · Binary numbers · Lesson 6"
---

# How many patterns?

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Colour values in a program stop at 255, and old game scores wrapped round to 0. Both come from the same rule about bits.


:::teacher-note

**In one sentence:** Students count up on binary cards to find that n bits make 2ⁿ patterns and hold 0 to 2ⁿ − 1, see a count overflow, and choose how many bits a number needs (AC9TDI8K04).

**Students should be able to say:** I can work out how many patterns some bits can make. I can find the biggest number some bits can hold. I can explain overflow, and choose how many bits a number needs.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You have four cards, worth 8, 4, 2 and 1. What is the **biggest** number they can show?**

☐ 4

☐ 15

☐ 16

☐ 1111

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 15. All four cards face up: 8 + 4 + 2 + 1 = 15. There are 16 patterns, but one of them is 0, so the biggest is 15. 1111 is 15 written in binary.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: count the patterns


:::keep-together

### Count the patterns

1. $1111 = 8 + 4 + 2 + 1 = 15$ — All cards face up is the biggest number.
2. $0000 = 0$ — All cards face down is the smallest.
3. $2 \times 2 \times 2 \times 2 = 2^4 = 16$ — Each card has 2 choices, so each card doubles the patterns.
4. $0 \text{ to } 15$ — 16 patterns, and one of them is 0, so the biggest is 15.
5. $2^4 - 1 = 15$ — With $n$ bits: $2^n$ patterns, and the biggest number is $2^n - 1$.

Now try five bits.

**What is the biggest number **five** bits can show?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 31

11111 = 16 + 8 + 4 + 2 + 1 = 31. Five bits make 2⁵ = 32 patterns: 0 to 31.

:::


:::keep-together

### Find the mistake

**Sam works out how many numbers 4 bits can show. Click the line where the working first goes wrong.**

```
 1  How many numbers can 4 bits show?
 2  Each bit is up or down: 2 choices.
 3  4 bits: 2 × 2 × 2 × 2 = 16 patterns.
 4  So 4 bits show the numbers 1 to 16.
 5  The biggest number is 16.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: the 16 patterns are 0000 to 1111, so the numbers are 0 to 15. Sam left out 0 (all cards face down).

:::


:::keep-together

### Three bits

**How many different patterns can **three** bits make?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 8

2 × 2 × 2 = 8 patterns: 000, 001, 010, 011, 100, 101, 110, 111. That is 0 to 7.

:::


:::typical

## Vary: one change at a time


**One past the biggest.** 

**Add a card.** 

**Six cards.** 

**A byte.** 

**How many bits?.** Keep doubling: 1, 3, 7, 15, 31, 63, 127. Which is the first that reaches 100?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Patterns and limits


:::keep-together

### Ten bits

**How many different patterns can **ten** bits make?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1024

$2^{10} = 1024$ patterns, so ten bits hold 0 to 1023.

:::


:::keep-together

### Score overflow

**An old game stores the score in one byte. The score is 255 and the player scores 1 more point. What does the score show?**

☐ 256

☐ An error message

☐ 255

☐ 0

:::


:::teacher-note

**Answer:** 0

255 is 11111111. Adding 1 overflows: every bit flips to 0 and the score shows 0. Real games have had bugs like this.

:::


:::keep-together

### Colour values

**In many programs, the amount of red in a colour goes from 0 to 255. How many bits store it?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 8

0 to 255 is 256 values, and $2^8 = 256$. So each colour amount is one byte.

:::


:::keep-together

### Three bits

**What is the biggest number **three** bits can show?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 7

111 = 4 + 2 + 1 = 7.

:::


:::keep-together

### Review: read binary

**Review: what number is **10101** in binary?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 21

10101 = 16 + 4 + 1 = 21.

:::


## Make: enough bits

Then: how many more students could join before you need a seventh card?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**How many patterns can 6 bits make, and what is the biggest number they can hold?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 2⁶ = 64 patterns, so 0 to 63. The biggest is 63.

:::

