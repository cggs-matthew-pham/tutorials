---
marp: true
theme: default
html: true
---

# A tiny processor

From gates to a processor · A machine that remembers

<!-- Speaker note: Students step a tiny processor through fetch, decode and execute one clock tick at a time, change its program and data, follow a loop, and write a program of their own (AC9TDI8K04 node 3, extended; links to AC9TDI8K01). About 50 minutes (Predict and Try 8 min · Worked example 12 min · Vary 14 min · Practise and Make 16 min). -->

---

## Today

**We are learning to** a processor repeats one cycle: fetch the instruction the program counter points at, decode it, execute it, one step per clock tick. The program is numbers in the same memory as the data. Step a tiny processor, change its program, and write your own.

- I can describe the fetch, decode and execute cycle.
- I can say what the program counter and accumulator hold.
- I can explain that instructions are numbers stored in memory.
- I can write a short program for a tiny processor.

<!-- Speaker note: Before class: Try the boards yourself. The instruction set is deliberately tiny: HALT, LOAD, ADD, SUB, STORE, JUMP, JZ (jump if zero) and OUT. Each instruction is a number: operation × 16 + address, so LOAD 6 is 22. Numbers wrap at 256. The one idea: a processor repeats one cycle: fetch the instruction the program counter points at, decode it, execute it, one step per clock tick. The program is numbers in the same memory as the data (the stored-program idea). Simplifications: one register (the accumulator), 16 cells, three ticks per instruction. Real processors overlap the steps (pipelining) and have many registers. It is similar in spirit to the Little Man Computer, which some teachers will know. Teacher: Try: ask what PC shows just after a fetch, and why it is already one ahead. Teacher: Worked example: model the three ticks for LOAD 6 aloud. Teacher: Vary: in the loop, ask which instruction makes it repeat and which one stops it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Your games, apps and websites all end up as simple instructions like ADD and JUMP. What does a processor actually do with them?

<!-- Speaker note: A processor is gates, registers and memory working together. It does one tiny thing per **clock tick**, again and again: fetch an instruction, decode it, execute it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Memory holds: cell 0 LOAD 6, cell 1 ADD 7, cell 2 OUT, cell 3 HALT, cell 6 = 5, cell 7 = 3. What does the program output?**

- 8
- 53
- 5, then 3
- Nothing: HALT comes first

<!-- Speaker note: What happens: 8: load 5, add 3, output the accumulator, stop. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said 53 are joining digits, not adding. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Flogic%2Fprocessor%2Fstep-2&code=widget%3A+cpu%0Aprogram%3A+LOAD+6%3B+ADD+7%3B+OUT%3B+HALT%0Adata%3A+6%3D5%2C+7%3D3%0Aexpect%3A+8%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/logic/processor/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 8: load 5, add 3, output the accumulator, stop.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## LOAD 6, tick by tick

Now count the ticks for the whole program.

$$\text{fetch: IR} = \text{cell } 0 = 22,\ PC = 1$$

1) $\text{decode: } 22 = 1 \times 16 + 6$ — Operation 1 is LOAD; the address is 6.
2) $\text{execute: ACC} = \text{cell } 6 = 5$ — Copy the number in cell 6 into the accumulator.
3) $\text{next: fetch cell } 1$ — The PC says where to go next: ADD 7.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write fetch: IR = cell 0 = 22,PC = 1 and say "LOAD 6 is stored as 1 × 16 + 6 = 22. The PC moves on, ready for next time." Line 1: write decode: 22 = 1 × 16 + 6 and say "Operation 1 is LOAD; the address is 6." Line 2: write execute: ACC = cell 6 = 5 and say "Copy the number in cell 6 into the accumulator." Line 3: write next: fetch cell 1 and say "The PC says where to go next: ADD 7." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## LOAD 6, tick by tick

**Each instruction takes three clock ticks. How many ticks does the whole program (LOAD, ADD, OUT, HALT) take?**

* Answer: 12

<!-- Speaker note: 4 instructions × 3 ticks = 12. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains the memory. Click the line where it first goes wrong.**

```
 1  Cell 0 holds LOAD 6, which is stored as the number 22.
 2  Cell 6 holds the number 5.
 3  Instructions and numbers are different kinds of thing in memory.
 4  So the processor could never run cell 6 by mistake.
```

* Answer: line 3

<!-- Speaker note: Line 3: instructions are numbers, kept in the same memory as the data. If the PC ever reached cell 6, the processor would run 5 as an instruction. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Clock speed

**A processor runs at 3 GHz. About how many clock ticks is that each second?**

- 3 billion
- 3
- 3 thousand
- 3 million

* Answer: 3 billion

<!-- Speaker note: 3 GHz is 3 billion ticks a second, so this 12-tick program would take 4 billionths of a second. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change the program



- **Change the data:** 
- **Change an instruction:** 
- **Store the answer:** 
- **A loop:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/logic/processor/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: a data cell, then one instruction, then STORE instead of OUT, then the start of a loop. For students who need more support: An instruction card: each instruction, what it does, and an example. For early finishers: Write a program that multiplies 3 by 4 using a loop of ADDs. How many clock ticks does it take? The hard part, on purpose: Writing the Make program from an empty memory is the hard part. Have students write the outputs they want first, then the instruction before each OUT. When students get stuck: A student thinks code and data are kept apart (Sam's mistake). Ask: What number is LOAD 6? Where is it stored? Fix: Instructions are numbers in the same memory as the data. / A student's program runs off the end. Ask: What should happen after the last OUT? Fix: End with HALT. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The PC

**The PC is 4. The processor fetches. What is the PC afterwards (if the instruction isn't a jump)?**

- 4
- 0
- 5
- It depends on the accumulator

* Answer: 5

<!-- Speaker note: Fetch copies the instruction and adds 1 to the PC. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Loops

**Which instruction lets a program repeat steps?**

- HALT
- OUT
- ADD
- JUMP: it changes the PC to an earlier cell

* Answer: JUMP: it changes the PC to an earlier cell

<!-- Speaker note: A jump back makes a loop; a JZ (jump if zero) can leave it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: adding

**Review: ADD 7 adds two 8-bit numbers. What inside the processor does the adding?**

- The memory
- The clock
- The program counter
- A row of full adders, made of gates

* Answer: A row of full adders, made of gates

<!-- Speaker note: Eight full adders side by side, as in Adding with gates. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: write a program

Then: can you do it with a loop instead, so it would work for 2, 4, 6, 8, 10 without more cells?

[Open this step](https://tutorials.learningwaypoints.com/systems/logic/processor/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Writing a program from an empty memory reverses the process: from the outputs wanted to the instructions that make them. Hints, in order: Cell 15 holds 2. Every output needs an OUT just before it. / LOAD 15, then OUT, then ADD 15, then OUT… / LOAD 15; OUT; ADD 15; OUT; ADD 15; OUT; HALT (seven cells). -->

<!-- Speaker note: Teacher: collect programs: who used the fewest cells? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three steps a processor repeats, and say what the program counter does.**

* Fetch, decode, execute. The program counter holds the cell of the next instruction and goes up by one after each fetch (or jumps).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Links: Inside a computer: 3 GHz means about 3 billion clock ticks a second, and each core is a processor like this (much bigger). Code pathway: the Python and MakeCode programs students write are turned into instructions like these. -->
