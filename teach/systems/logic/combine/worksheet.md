---
title: "Combining gates"
subtitle: "From gates to a processor · Building with gates · Lesson 1"
---

# Combining gates

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** AND, OR and NOT are tiny. How do you get from three tiny gates to a whole processor?


:::teacher-note

**In one sentence:** Students follow wired circuits row by row, then build circuits to match truth tables, including NOT and OR from NAND gates alone and XOR from AND, OR and NOT (AC9TDI8K04 node 3, extended; the kit names adder circuits as going further).

**Students should be able to say:** I can work out a circuit's output, gate by gate. I can build a circuit to match a truth table. I can explain why NAND gates can build anything.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A and B go into an OR gate. The OR gate's output goes into a NOT gate, which lights the lamp. Both switches are off. Is the lamp on?**

☐ On (1): OR gives 0, and NOT flips it to 1

☐ Off (0): both switches are off

☐ Off (0): NOT only works on switches

☐ It depends on the order of the switches

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** On. OR of 0 and 0 is 0; the NOT gate gets that 0 and flips it to 1.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: row by row


:::keep-together

### Gate by gate (A = 1, B = 1)

1. $\text{gate 1: } 1 \text{ OR } 1 = 1$ — Gate 1 is wired from both switches.
2. $\text{gate 2: } 1 \text{ AND } 1 = 1$ — Gate 2 is wired from both switches too.
3. $\text{gate 3: NOT } 1 = 0$ — Gate 3 is wired from gate 2, so it flips gate 2's output, not a switch.
4. $\text{gate 4: } 1 \text{ AND } 0 = 0$ — Gate 4 is wired from gates 1 and 3.
5. $Q = 0$ — Both on gives 0. Do every row this way to fill the truth table.

Now do the row A = 0, B = 1 for gate 3.

**In the four-gate circuit (OR, AND, NOT, AND), A = 0 and B = 1. What does gate 3, the NOT gate, output?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1

Gate 2: 0 AND 1 = 0. Gate 3 flips that: 1.

:::


:::keep-together

### Find the mistake

**Sam works out the four-gate circuit. Click the line where it first goes wrong.**

```
 1  A = 1, B = 0.
 2  Gate 1 (OR): 1 OR 0 = 1.
 3  Gate 2 (AND): 1 AND 0 = 0.
 4  Gate 3 (NOT): NOT A = NOT 1 = 0.
 5  Gate 4 (AND): 1 AND 0 = 0, so Q = 0.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: gate 3 is wired from gate 2, which gave 0, so NOT 0 = 1. Then gate 4 is 1 AND 1 = 1, and Q = 1.

:::


:::keep-together

### Name it

**The four-gate circuit gives 1 when exactly one switch is on. Which gate does that on its own?**

☐ XOR

☐ AND

☐ NOR

☐ OR

:::


:::teacher-note

**Answer:** XOR

XOR (exclusive or): one or the other, not both. Here it is built from OR, AND and NOT.

:::


:::typical

## Vary: build to a table


**NAND.** 

**A and not B.** 

**NOT from NAND.** 

**OR from NAND.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Read the circuit


:::keep-together

### NOT then AND

**A goes into a NOT gate. Its output and B go into an AND gate. A = 0, B = 1. What is the output?**

☐ 0

☐ 1

:::


:::teacher-note

**Answer:** 1

NOT 0 = 1; 1 AND 1 = 1.

:::


:::keep-together

### NAND then NOT

**A and B go into a NAND gate; its output goes into a NOT gate. Which single gate is that the same as?**

☐ NOT

☐ OR

☐ NAND

☐ AND

:::


:::teacher-note

**Answer:** AND

NOT (NOT (A AND B)) = A AND B: two flips cancel.

:::


:::keep-together

### Review: rows

**Review: a circuit has 3 switches. How many rows does its truth table have?**

☐ 3

☐ 6

☐ 8

☐ 9

:::


:::teacher-note

**Answer:** 8

2 × 2 × 2 = 8 patterns of three bits.

:::


## Make: build XOR

Then: could you build XOR from NAND gates only? (It takes four.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**A and B go into an AND gate; its output goes into a NOT gate. What is the output for A = 1, B = 1, and what is this circuit called?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1 AND 1 = 1, NOT 1 = 0. It is NAND (not both).

:::

