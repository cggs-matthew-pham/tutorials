---
title: "Adding with gates"
subtitle: "From gates to a processor · Building with gates · Lesson 2"
---

# Adding with gates

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A processor adds billions of numbers a second, and it is only gates. How do switches add?


:::teacher-note

**In one sentence:** Students build a half adder from XOR and AND, add 4-bit binary numbers on a chain of full adders and watch the carries ripple, then build a full adder from gates (AC9TDI8K04 node 3, extended; the kit names adder circuits as going further).

**Students should be able to say:** I can add binary numbers in columns, with carries. I can explain what a half adder and a full adder do. I can build a full adder from gates.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**In binary, what is 1 + 1?**

☐ 10: write 0, carry 1

☐ 2

☐ 11

☐ 0: it overflows and is lost

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 10 (two): write 0 in this place and carry 1 to the next, just as 5 + 5 in base ten writes 0 and carries 1.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: 5 + 7 in four bits


:::keep-together

### Place by place

1. $\text{ones: } 1 + 1 = 10$ — Sum 0, carry 1 to the twos.
2. $\text{twos: } 0 + 1 + 1 = 10$ — Sum 0, carry 1 to the fours.
3. $\text{fours: } 1 + 1 + 1 = 11$ — Sum 1, carry 1 to the eights.
4. $\text{eights: } 0 + 0 + 1 = 1$ — Sum 1, no carry.
5. $0101 + 0111 = 1100$ — 5 + 7 = 12. Each line is one full adder: XOR gates for the sum, AND and OR for the carry.

Now add 6 + 3.

**Add 0110 + 0011 (6 + 3) the same way. What is the sum, in four bits?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1001

Ones: 0 + 1 = 1. Twos: 1 + 1 = 0, carry 1. Fours: 1 + 0 + carry 1 = 0, carry 1. Eights: 0 + 0 + carry 1 = 1. 1001 = 9.

:::


:::keep-together

### Find the mistake

**Sam adds 0101 and 0011. Click the line where it first goes wrong.**

```
 1  0101 + 0011 (that is 5 + 3).
 2  Ones place: 1 + 1 = 2, so write 2.
 3  Twos place: 0 + 1 = 1, so write 1.
 4  Fours place: 1 + 0 = 1. Eights place: 0 + 0 = 0.
 5  The answer is 0112.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: binary has no digit 2. 1 + 1 = 10: write 0, carry 1. The answer is 1000 (8).

:::


:::keep-together

### Why three inputs?

**A half adder adds two bits. Why does a full adder need three inputs?**

☐ The third input switches it on

☐ It needs a spare in case one breaks

☐ It adds three numbers at once

☐ It also adds the carry coming in from the place to its right

:::


:::teacher-note

**Answer:** It also adds the carry coming in from the place to its right

Every place except the first may get a carry from the right: A + B + carry in.

:::


:::typical

## Vary: carries


**No carry.** 

**One carry.** 

**Overflow.** 

**Every place.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Adders


:::keep-together

### Add

**Add 0011 + 0011 in binary (four bits).**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 0110

3 + 3 = 6 = 0110.

:::


:::keep-together

### How many adders?

**How many full adders does a processor need to add two 8-bit numbers in one go?**

☐ 2: one for each number

☐ 8: one for each place

☐ 16: one for each bit of both numbers

☐ 1, used 8 times

:::


:::teacher-note

**Answer:** 8: one for each place

One full adder per place, side by side. (The first can be a half adder: nothing carries into it.)

:::


:::keep-together

### Review: overflow

**Review: an 8-bit register holds 255. You add 1. What does it hold?**

☐ 0, and a carry falls off the end

☐ 255

☐ 256

☐ 1

:::


:::teacher-note

**Answer:** 0, and a carry falls off the end

11111111 + 1 = 100000000: the ninth bit has nowhere to go, so the register holds 0. That is overflow.

:::


## Make: build a full adder

Then: count the gates in an 8-bit adder built from your full adders.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Add 0110 + 0101 in binary. Which places carried?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1011 (11). Only the fours place carried (1 + 1 = 10).

:::

