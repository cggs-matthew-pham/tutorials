---
title: "Why binary: logic gates"
subtitle: "Data representation · Binary numbers · Lesson 7"
---

# Why binary: logic gates

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A computer chip holds billions of tiny switches and nothing else. How can switches add up numbers?


:::teacher-note

**In one sentence:** Students try every combination of two switches in a circuit to build AND and OR truth tables, use NOT, then add two bits with a half adder, to explain why digital systems are built on binary (AC9TDI8K04 node 3).

**Students should be able to say:** I can give the output of AND, OR and NOT gates. I can explain why computers use binary. I can show how gates add two bits.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A battery, two switches and a lamp are wired in one loop, one switch after the other. Switch A is **on** and switch B is **off**. Does the lamp light?**

☐ No: the circuit is broken at B

☐ Dimly: half the switches are on

☐ Yes: one switch is enough

☐ Only if B was switched on first

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No. With the switches in a line, the current has to pass through both, so B being off breaks the loop. The lamp lights only when A AND B are on.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: AND and OR


:::keep-together

### Truth tables

1. $\text{AND}: 0\,0 \to 0,\quad 0\,1 \to 0,\quad 1\,0 \to 0,\quad 1\,1 \to 1$ — Switches in a line: the output is 1 only when both inputs are 1.
2. $\text{OR}: 0\,0 \to 0,\quad 0\,1 \to 1,\quad 1\,0 \to 1,\quad 1\,1 \to 1$ — Switches side by side: the output is 1 when at least one input is 1.
3. $\text{NOT}: 0 \to 1,\quad 1 \to 0$ — One input, flipped.
4. $\text{switch: 2 states} \to \text{bits}$ — Each switch is a bit: off 0, on 1.
5. $\text{gates} \to \text{adding, comparing, storing}$ — Wired together, gates do every calculation. So binary is the natural choice.

Now read an OR gate.

**Two switches side by side (an **OR** gate). A = 1 and B = 0. What is the output?**

☐ 1

☐ ½

☐ 0

☐ It depends which switch was first

:::


:::teacher-note

**Answer:** 1

OR gives 1 when A or B is 1 (or both). A is 1, so the output is 1.

:::


:::keep-together

### Find the mistake

**Sam fills in the OR gate's truth table. Click the line where it first goes wrong.**

```
 1  Fill in the OR gate's output for each row.
 2  A = 0, B = 0: neither is on, so 0.
 3  A = 0, B = 1: one is on, so 1.
 4  A = 1, B = 0: one is on, so 1.
 5  A = 1, B = 1: OR means one or the other, not both, so 0.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

Line 5: OR gives 1 when at least one input is 1, so 1 OR 1 = 1. "One or the other but not both" is a different gate, XOR.

:::


:::keep-together

### Why binary?

**Why are computers built on binary, not on ten levels for the digits 0 to 9?**

☐ Computers can only count to 1

☐ People invented binary because it is easy to read

☐ Switches have two states that are easy to tell apart, and gates can combine them to do any calculation

☐ Binary numbers are shorter

:::


:::teacher-note

**Answer:** Switches have two states that are easy to tell apart, and gates can combine them to do any calculation

Two states are reliable even with a noisy signal, and switches wired as gates (AND, OR, NOT) can be combined to add, compare and store anything.

:::


:::typical

## Vary: change the gate


**OR with one on.** 

**OR with both on.** 

**NOT.** 

**AND's one row.** 

**Does B matter?.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Gates


:::keep-together

### AND

**What is **1 AND 0**?**

☐ 0

☐ 1

☐ 2

☐ 10

:::


:::teacher-note

**Answer:** 0

AND gives 1 only when both are 1.

:::


:::keep-together

### NOT

**What is **NOT 1**?**

☐ 0

☐ −1

☐ It needs two inputs

☐ 1

:::


:::teacher-note

**Answer:** 0

NOT flips 1 to 0.

:::


:::keep-together

### Alarm

**A car alarm should sound if the door is opened **or** the window is broken. Which gate?**

☐ AND

☐ OR

☐ NOT

☐ None: alarms don't use gates

:::


:::teacher-note

**Answer:** OR

Either input should set it off, so OR.

:::


:::keep-together

### Machine guard

**A machine should run only when the guard is closed **and** the start button is pressed. Which gate?**

☐ OR

☐ AND

☐ NOT

☐ XOR

:::


:::teacher-note

**Answer:** AND

Both must be true: AND.

:::


:::keep-together

### Review: binary

**Review: what number is **110** in binary?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 6

110 = 4 + 2 = 6.

:::


## Make: add two bits

Stretch: which inputs give the answer 01? Why are there two ways?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Fill in the output: 1 AND 1, 0 OR 1, NOT 0. Why are computers built on binary?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1, 1, 1. Switches have two reliable states, and gates combine them to do any calculation.

:::

