---
marp: true
theme: default
html: true
---

# Why binary: logic gates

Data representation · Binary numbers

<!-- Speaker note: Students try every combination of two switches in a circuit to build AND and OR truth tables, use NOT, then add two bits with a half adder, to explain why digital systems are built on binary (AC9TDI8K04 node 3). About 40 minutes (Predict and Try 7 min · Worked example 10 min · Vary 10 min · Practise and Make 13 min). -->

---

## Today

**We are learning to** a switch has two states that are easy to tell apart: off (0) and on (1). Wire two switches in a line and the lamp lights only when both are on: an AND gate. Side by side, either one will do: an OR gate. Gates like these, made of tiny electronic switches, combine bits to do every calculation, which is why computers are built on binary.

- I can give the output of AND, OR and NOT gates.
- I can explain why computers use binary.
- I can show how gates add two bits.

<!-- Speaker note: Before class: Try the boards yourself. A torch, a battery and two real switches (or a breadboard) make the Try concrete in a minute. The one idea (the kit's chain for this node): electronic components have two reliable states → those states are 0 and 1 → gates combine them → so binary is the foundation of all computing. The half adder in Make shows gates doing the binary addition students know from lesson 5. Simplifications: real gates are made of transistors, not mechanical switches; the circuit view is an analogy that holds for AND and OR. Teacher: Try: have students fill a paper truth table as the board's fills. Teacher: Worked example: before the OR line, ask what changes when the switches sit side by side. Teacher: Vary: ask why AND has only one row that gives 1. -->

---

## Why it matters

> A computer chip holds billions of tiny switches and nothing else. How can switches add up numbers?

<!-- Speaker note: In the binary lessons, each bit was a card face up or face down. Inside a computer, a bit is a tiny electronic **switch**: off (0) or on (1). Two states are easy to tell apart, even when the signal is a little weak or noisy. Switches can also be wired together so that some bits **control** other bits. That is how a computer calculates. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A battery, two switches and a lamp are wired in one loop, one switch after the other. Switch A is **on** and switch B is **off**. Does the lamp light?**

- No: the circuit is broken at B
- Dimly: half the switches are on
- Yes: one switch is enough
- Only if B was switched on first

<!-- Speaker note: What happens: No. With the switches in a line, the current has to pass through both, so B being off breaks the loop. The lamp lights only when A AND B are on. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "yes" picture parallel wiring. Ask them to trace the current. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Flogic-gates%2Fstep-2&code=widget%3A+logic%0Agate%3A+and%0Aview%3A+circuit%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/logic-gates/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Look at the truth table: one row in four lights the lamp. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No. With the switches in a line, the current has to pass through both, so B being off breaks the loop. The lamp lights only when A AND B are on.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Truth tables

Now read an OR gate.

$$\text{AND}: 0\,0 \to 0,\quad 0\,1 \to 0,\quad 1\,0 \to 0,\quad 1\,1 \to 1$$

1) $\text{OR}: 0\,0 \to 0,\quad 0\,1 \to 1,\quad 1\,0 \to 1,\quad 1\,1 \to 1$ — Switches side by side: the output is 1 when at least one input is 1.
2) $\text{NOT}: 0 \to 1,\quad 1 \to 0$ — One input, flipped.
3) $\text{switch: 2 states} \to \text{bits}$ — Each switch is a bit: off 0, on 1.
4) $\text{gates} \to \text{adding, comparing, storing}$ — Wired together, gates do every calculation. So binary is the natural choice.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write AND: 00 0, 01 0, 10 0, 11 1 and say "Switches in a line: the output is 1 only when both inputs are 1." Line 1: write OR: 00 0, 01 1, 10 1, 11 1 and say "Switches side by side: the output is 1 when at least one input is 1." Line 2: write NOT: 0 1, 1 0 and say "One input, flipped." Line 3: write switch: 2 states bits and say "Each switch is a bit: off 0, on 1." Line 4: write gates adding, comparing, storing and say "Wired together, gates do every calculation. So binary is the natural choice." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Truth tables

**Two switches side by side (an **OR** gate). A = 1 and B = 0. What is the output?**

- 1
- ½
- 0
- It depends which switch was first

* Answer: 1

<!-- Speaker note: OR gives 1 when A or B is 1 (or both). A is 1, so the output is 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam fills in the OR gate's truth table. Click the line where it first goes wrong.**

```
 1  Fill in the OR gate's output for each row.
 2  A = 0, B = 0: neither is on, so 0.
 3  A = 0, B = 1: one is on, so 1.
 4  A = 1, B = 0: one is on, so 1.
 5  A = 1, B = 1: OR means one or the other, not both, so 0.
```

* Answer: line 5

<!-- Speaker note: Line 5: OR gives 1 when at least one input is 1, so 1 OR 1 = 1. "One or the other but not both" is a different gate, XOR. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why binary?

**Why are computers built on binary, not on ten levels for the digits 0 to 9?**

- Computers can only count to 1
- People invented binary because it is easy to read
- Switches have two states that are easy to tell apart, and gates can combine them to do any calculation
- Binary numbers are shorter

* Answer: Switches have two states that are easy to tell apart, and gates can combine them to do any calculation

<!-- Speaker note: Two states are reliable even with a noisy signal, and switches wired as gates (AND, OR, NOT) can be combined to add, compare and store anything. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change the gate



- **OR with one on:** 
- **OR with both on:** 
- **NOT:** 
- **AND's one row:** 
- **Does B matter?:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/data/logic-gates/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: the gate (AND to OR), the inputs (one on, both on), then NOT's single input, then the only row that lights AND. For students who need more support: Keep the three truth tables on the board for the whole lesson. For early finishers: A full adder adds three bits (two numbers and a carry in). Sketch how two half adders and an OR gate could make one. The hard part, on purpose: Students read OR as everyday English (one or the other, not both). Point at the circuit: with both switches on, is there still a path for the current? When students get stuck: A student writes 1 OR 1 = 0 (Sam's mistake). Ask: With both switches on side by side, can the current reach the lamp? Fix: Yes: OR means at least one. One but not both is XOR. / A student thinks gates add (1 AND 1 = 2). Ask: How many states can the output wire have? Fix: One bit: 0 or 1. Adding takes several gates, as in the half adder. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## AND

**What is **1 AND 0**?**

- 0
- 1
- 2
- 10

* Answer: 0

<!-- Speaker note: AND gives 1 only when both are 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## NOT

**What is **NOT 1**?**

- 0
- −1
- It needs two inputs
- 1

* Answer: 0

<!-- Speaker note: NOT flips 1 to 0. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Alarm

**A car alarm should sound if the door is opened **or** the window is broken. Which gate?**

- AND
- OR
- NOT
- None: alarms don't use gates

* Answer: OR

<!-- Speaker note: Either input should set it off, so OR. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Machine guard

**A machine should run only when the guard is closed **and** the start button is pressed. Which gate?**

- OR
- AND
- NOT
- XOR

* Answer: AND

<!-- Speaker note: Both must be true: AND. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: binary

**Review: what number is **110** in binary?**

* Answer: 6

<!-- Speaker note: 110 = 4 + 2 = 6. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: add two bits

Stretch: which inputs give the answer 01? Why are there two ways?

[Open this step](https://tutorials.learningwaypoints.com/systems/data/logic-gates/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Making a half adder show 1 + 1 = 10 reverses the process: students choose the inputs for a wanted output, and see gates doing binary addition. Hints, in order: The adder shows A + B as a two-bit binary number: carry, then sum. / 10 in binary is 2. Which inputs add to 2? / Turn both switches on. -->

<!-- Speaker note: Teacher: connect to 1 + 1 = 10 in binary and to carrying in base 10. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Fill in the output: 1 AND 1, 0 OR 1, NOT 0. Why are computers built on binary?**

* 1, 1, 1. Switches have two reliable states, and gates combine them to do any calculation.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Bits all the way down (tracing text and colours to binary). Code links: `and`, `or` and `not` in Python and MakeCode conditions are these gates; the Robotics course uses them to combine sensor readings. -->
