---
marp: true
theme: default
html: true
---

# Combining gates

From gates to a processor · Building with gates

<!-- Speaker note: Students follow wired circuits row by row, then build circuits to match truth tables, including NOT and OR from NAND gates alone and XOR from AND, OR and NOT (AC9TDI8K04 node 3, extended; the kit names adder circuits as going further). About 45 minutes (Predict and Try 6 min · Worked example 10 min · Vary 15 min · Practise and Make 14 min). -->

---

## Today

**We are learning to** wire one gate's output into another gate's input and you get a circuit. Work a circuit out row by row, each gate using only what arrives on its wires, then build circuits to match truth tables, even from NAND gates alone.

- I can work out a circuit's output, gate by gate.
- I can build a circuit to match a truth table.
- I can explain why NAND gates can build anything.

<!-- Speaker note: Before class: Try the boards yourself; wire by clicking a ● (from) then a pin (to), and click a wired pin to unplug it. The one idea: each gate uses only what arrives on its own wires. Data representation's *Why binary: logic gates* is assumed (AND, OR, NOT, truth tables); start with a two-minute recap if the class hasn't done it recently. This course is an extension (Years 9–10). Its lessons are tagged AC9TDI8K04 node 3 (why binary: circuits and logic gates), which the kit says adder circuits go further from. Unplugged first works well: students as gates holding cards, passing 0s and 1s along strings. Teacher: Try: ask what one word describes this circuit (NOR, not-OR). Teacher: Worked example: model the order: a gate can only be worked out once everything wired into it is known. Teacher: Vary: after NOT from NAND, ask what A NAND A means in words. -->

---

## Why it matters

> AND, OR and NOT are tiny. How do you get from three tiny gates to a whole processor?

<!-- Speaker note: In *Why binary: logic gates* each gate stood alone. Now wire them together: one gate's output becomes another gate's input. A few simple gates combined can make any truth table you like. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A and B go into an OR gate. The OR gate's output goes into a NOT gate, which lights the lamp. Both switches are off. Is the lamp on?**

- On (1): OR gives 0, and NOT flips it to 1
- Off (0): both switches are off
- Off (0): NOT only works on switches
- It depends on the order of the switches

<!-- Speaker note: What happens: On. OR of 0 and 0 is 0; the NOT gate gets that 0 and flips it to 1. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said off are reading the switches, not the OR gate's output. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Flogic%2Fcombine%2Fstep-2&code=widget%3A+gates%0Agate+g1%3A+or+A+B%0Agate+g2%3A+not+g1%0Awire+Q%3A+g2%0Alock%3A+on%0Atable%3A+tried%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/logic/combine/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* On. OR of 0 and 0 is 0; the NOT gate gets that 0 and flips it to 1.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Gate by gate (A = 1, B = 1)

Now do the row A = 0, B = 1 for gate 3.

$$\text{gate 1: } 1 \text{ OR } 1 = 1$$

1) $\text{gate 2: } 1 \text{ AND } 1 = 1$ — Gate 2 is wired from both switches too.
2) $\text{gate 3: NOT } 1 = 0$ — Gate 3 is wired from gate 2, so it flips gate 2's output, not a switch.
3) $\text{gate 4: } 1 \text{ AND } 0 = 0$ — Gate 4 is wired from gates 1 and 3.
4) $Q = 0$ — Both on gives 0. Do every row this way to fill the truth table.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write gate 1: 1 OR 1 = 1 and say "Gate 1 is wired from both switches." Line 1: write gate 2: 1 AND 1 = 1 and say "Gate 2 is wired from both switches too." Line 2: write gate 3: NOT 1 = 0 and say "Gate 3 is wired from gate 2, so it flips gate 2's output, not a switch." Line 3: write gate 4: 1 AND 0 = 0 and say "Gate 4 is wired from gates 1 and 3." Line 4: write Q = 0 and say "Both on gives 0. Do every row this way to fill the truth table." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Gate by gate (A = 1, B = 1)

**In the four-gate circuit (OR, AND, NOT, AND), A = 0 and B = 1. What does gate 3, the NOT gate, output?**

* Answer: 1

<!-- Speaker note: Gate 2: 0 AND 1 = 0. Gate 3 flips that: 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam works out the four-gate circuit. Click the line where it first goes wrong.**

```
 1  A = 1, B = 0.
 2  Gate 1 (OR): 1 OR 0 = 1.
 3  Gate 2 (AND): 1 AND 0 = 0.
 4  Gate 3 (NOT): NOT A = NOT 1 = 0.
 5  Gate 4 (AND): 1 AND 0 = 0, so Q = 0.
```

* Answer: line 4

<!-- Speaker note: Line 4: gate 3 is wired from gate 2, which gave 0, so NOT 0 = 1. Then gate 4 is 1 AND 1 = 1, and Q = 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name it

**The four-gate circuit gives 1 when exactly one switch is on. Which gate does that on its own?**

- XOR
- AND
- NOR
- OR

* Answer: XOR

<!-- Speaker note: XOR (exclusive or): one or the other, not both. Here it is built from OR, AND and NOT. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: build to a table



- **NAND:** 
- **A and not B:** 
- **NOT from NAND:** 
- **OR from NAND:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/logic/combine/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing about the target: NAND from AND and NOT, A AND NOT B, then NOT and OR from NAND gates alone (a gate input may take the same wire twice). For students who need more support: Truth table cards for AND, OR, NOT and NAND to keep on the desk. For early finishers: Build XOR from four NAND gates. Then: why would a chip factory rather make one kind of gate? The hard part, on purpose: Wiring is fiddly at first and the first circuits don't match. Let the wanted column's crosses do the telling: students change one wire and watch which rows turn green. When students get stuck: A student feeds the switches into every gate in their head (Sam's mistake). Ask: Follow gate 3's wire back. Where does it start? Fix: Each gate uses its own wires only. / A student can't start building. Ask: Which rows need a 1? What do those rows have in common? Fix: Build the gate for that pattern, then fix the rows that are wrong. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## NOT then AND

**A goes into a NOT gate. Its output and B go into an AND gate. A = 0, B = 1. What is the output?**

- 0
- 1

* Answer: 1

<!-- Speaker note: NOT 0 = 1; 1 AND 1 = 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## NAND then NOT

**A and B go into a NAND gate; its output goes into a NOT gate. Which single gate is that the same as?**

- NOT
- OR
- NAND
- AND

* Answer: AND

<!-- Speaker note: NOT (NOT (A AND B)) = A AND B: two flips cancel. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: rows

**Review: a circuit has 3 switches. How many rows does its truth table have?**

- 3
- 6
- 8
- 9

* Answer: 8

<!-- Speaker note: 2 × 2 × 2 = 8 patterns of three bits. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: build XOR

Then: could you build XOR from NAND gates only? (It takes four.)

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/logic/combine/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building XOR from its truth table reverses the process: start from the wanted outputs and choose and wire the gates. Hints, in order: XOR is 1 for "A or B", but not when both are on. / One gate for "A or B", one for "both", then flip "both". / OR, AND, NOT, then AND the OR with the NOT. -->

<!-- Speaker note: Teacher: compare circuits: did anyone use fewer gates? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A and B go into an AND gate; its output goes into a NOT gate. What is the output for A = 1, B = 1, and what is this circuit called?**

* 1 AND 1 = 1, NOT 1 = 0. It is NAND (not both).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Adding with gates (half and full adders). Links: Data representation › Why binary: logic gates (the introduction). For keen students and teachers, the free course From NAND to Tetris (nand2tetris.org) builds a whole computer from NAND gates. -->
