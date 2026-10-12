---
title: "Bits and binary numbers"
subtitle: "Data representation · Binary numbers · Lesson 5"
---

# Bits and binary numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A computer has no digits from 2 to 9, only switches that are off or on. So how does it store the number 22?


:::teacher-note

**In one sentence:** Students turn binary cards face up to see that each place is worth double the one on its right, read and write numbers in binary, and say why computers use two states (AC9TDI8K04).

**Students should be able to say:** I can read a binary number by adding the places that hold a 1. I can write a number in binary. I can say why computers store numbers as bits.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Four cards are worth 8, 4, 2 and 1. The 8, 2 and 1 cards are face up, so the bits read **1011**. What number is that?**

☐ 3

☐ 11

☐ 13

☐ 1011

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 11. The cards face up are 8, 2 and 1, and 8 + 2 + 1 = 11. 1011 is how it is written in binary, not one thousand and eleven.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: read and write binary


:::keep-together

### Read the places

Here is 10110 read one place at a time. The places start at 1 on the right and double each time.

1. $1\,0\,1\,1\,0$ — Five bits, so five places.
2. $16 \quad 8 \quad 4 \quad 2 \quad 1$ — Start at 1 on the right and double: 2, 4, 8, 16.
3. $16 + 4 + 2$ — Keep the places that hold a 1. The 0s add nothing.
4. $16 + 4 + 2 = 22$ — Add them: 10110 in binary is 22.

Now read 10011 the same way.

**Five cards are worth 16, 8, 4, 2 and 1. What number is **10011** in binary?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 19

10011 = 16 + 2 + 1 = 19.

:::


:::keep-together

### Find the mistake

**Sam reads 1100 in binary. Click the line where the working first goes wrong.**

```
 1  Read 1100 in binary.
 2  The places are 1, 2, 4, 8.
 3  The 1s are in the first two places.
 4  1 + 2 = 3
 5  So 1100 is 3.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: the places go 1, 2, 4, 8 from the right, so the first two digits of 1100 are the 8 and 4 places. 1100 = 8 + 4 = 12.

:::


:::keep-together

### Why only 0 and 1?

**Why do computers store numbers in binary, not with the digits 0 to 9?**

☐ Each bit only needs two states (off and on, low or high voltage), which are easy to tell apart reliably

☐ Binary numbers are shorter

☐ Binary is easier for people to read

☐ Computers cannot add numbers bigger than 1

:::


:::teacher-note

**Answer:** Each bit only needs two states (off and on, low or high voltage), which are easy to tell apart reliably

A switch or a voltage only has to be off or on, low or high. Telling two states apart is fast and reliable even when the signal is a little weak or noisy; telling ten levels apart would not be.

:::


:::typical

## Vary: one change at a time


**Make 6.** 

**One more.** 

**One more again.** 

**Use the 16.** 

**Number to binary.** Start with the biggest card that fits, then fill in the rest.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Read and write binary


:::keep-together

### Four bits

**What number is **1001** in binary?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 9

1001 = 8 + 1 = 9.

:::


:::keep-together

### Zeros on the right

**What number is **11000** in binary?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 24

11000 = 16 + 8 = 24. The three 0s on the right add nothing.

:::


:::keep-together

### Number to binary

**Write 20 in binary with five bits.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10100

20 = 16 + 4, so 10100.

:::


:::keep-together

### All ones

**What number is **11111** in binary?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 31

16 + 8 + 4 + 2 + 1 = 31, the biggest number five cards can show.

:::


:::keep-together

### Review: powers of 2

**Review: what is $2^4$?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 16

2 × 2 × 2 × 2 = 16. The binary places are powers of 2: 1, 2, 4, 8, 16 are $2^0$ to $2^4$.

:::


## Make: three cards up

Stretch: what is the **smallest** number with exactly three cards up? Write it in binary.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**What is 10101 in binary? Write 12 in binary.**

{{lines-3}}

:::


:::teacher-note

**Answer:** 10101 = 16 + 4 + 1 = 21. 12 = 8 + 4 = 1100.

:::

