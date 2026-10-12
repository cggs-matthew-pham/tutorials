---
title: "A tiny processor"
subtitle: "From gates to a processor · A machine that remembers · Lesson 4"
---

# A tiny processor

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Your games, apps and websites all end up as simple instructions like ADD and JUMP. What does a processor actually do with them?


:::teacher-note

**In one sentence:** Students step a tiny processor through fetch, decode and execute one clock tick at a time, change its program and data, follow a loop, and write a program of their own (AC9TDI8K04 node 3, extended; links to AC9TDI8K01).

**Students should be able to say:** I can describe the fetch, decode and execute cycle. I can say what the program counter and accumulator hold. I can explain that instructions are numbers stored in memory. I can write a short program for a tiny processor.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Memory holds: cell 0 LOAD 6, cell 1 ADD 7, cell 2 OUT, cell 3 HALT, cell 6 = 5, cell 7 = 3. What does the program output?**

☐ 8

☐ 53

☐ 5, then 3

☐ Nothing: HALT comes first

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 8: load 5, add 3, output the accumulator, stop.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: one instruction, three ticks


:::keep-together

### LOAD 6, tick by tick

1. $\text{fetch: IR} = \text{cell } 0 = 22,\ PC = 1$ — LOAD 6 is stored as 1 × 16 + 6 = 22. The PC moves on, ready for next time.
2. $\text{decode: } 22 = 1 \times 16 + 6$ — Operation 1 is LOAD; the address is 6.
3. $\text{execute: ACC} = \text{cell } 6 = 5$ — Copy the number in cell 6 into the accumulator.
4. $\text{next: fetch cell } 1$ — The PC says where to go next: ADD 7.

Now count the ticks for the whole program.

**Each instruction takes three clock ticks. How many ticks does the whole program (LOAD, ADD, OUT, HALT) take?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 12

4 instructions × 3 ticks = 12.

:::


:::keep-together

### Find the mistake

**Sam explains the memory. Click the line where it first goes wrong.**

```
 1  Cell 0 holds LOAD 6, which is stored as the number 22.
 2  Cell 6 holds the number 5.
 3  Instructions and numbers are different kinds of thing in memory.
 4  So the processor could never run cell 6 by mistake.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: instructions are numbers, kept in the same memory as the data. If the PC ever reached cell 6, the processor would run 5 as an instruction.

:::


:::keep-together

### Clock speed

**A processor runs at 3 GHz. About how many clock ticks is that each second?**

☐ 3 billion

☐ 3

☐ 3 thousand

☐ 3 million

:::


:::teacher-note

**Answer:** 3 billion

3 GHz is 3 billion ticks a second, so this 12-tick program would take 4 billionths of a second.

:::


:::typical

## Vary: change the program


**Change the data.** 

**Change an instruction.** 

**Store the answer.** 

**A loop.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## The cycle


:::keep-together

### The PC

**The PC is 4. The processor fetches. What is the PC afterwards (if the instruction isn't a jump)?**

☐ 4

☐ 0

☐ 5

☐ It depends on the accumulator

:::


:::teacher-note

**Answer:** 5

Fetch copies the instruction and adds 1 to the PC.

:::


:::keep-together

### Loops

**Which instruction lets a program repeat steps?**

☐ HALT

☐ OUT

☐ ADD

☐ JUMP: it changes the PC to an earlier cell

:::


:::teacher-note

**Answer:** JUMP: it changes the PC to an earlier cell

A jump back makes a loop; a JZ (jump if zero) can leave it.

:::


:::keep-together

### Review: adding

**Review: ADD 7 adds two 8-bit numbers. What inside the processor does the adding?**

☐ The memory

☐ The clock

☐ The program counter

☐ A row of full adders, made of gates

:::


:::teacher-note

**Answer:** A row of full adders, made of gates

Eight full adders side by side, as in Adding with gates.

:::


## Make: write a program

Then: can you do it with a loop instead, so it would work for 2, 4, 6, 8, 10 without more cells?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Name the three steps a processor repeats, and say what the program counter does.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Fetch, decode, execute. The program counter holds the cell of the next instruction and goes up by one after each fetch (or jumps).

:::

