---
marp: true
theme: default
html: true
---

# Adding with gates

From gates to a processor · Building with gates

<!-- Speaker note: Students build a half adder from XOR and AND, add 4-bit binary numbers on a chain of full adders and watch the carries ripple, then build a full adder from gates (AC9TDI8K04 node 3, extended; the kit names adder circuits as going further). About 45 minutes (Predict and Try 7 min · Worked example 10 min · Vary 10 min · Practise and Make 18 min). -->

---

## Today

**We are learning to** adding two bits is a truth table: the sum is XOR and the carry is AND, a half adder. A full adder also takes a carry in. One full adder per place, carries passed to the left, adds whole binary numbers.

- I can add binary numbers in columns, with carries.
- I can explain what a half adder and a full adder do.
- I can build a full adder from gates.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: one column of an addition is a small truth table (sum and carry), so gates can add. Students have met the half adder in Data representation's logic gates lesson; here they build it and then go further. Column addition in base ten first helps: 5 + 5 writes 0 and carries 1, exactly like 1 + 1 in binary. The 4-bit adder on the board is drawn as full adder boxes; the gates inside each box are the ones students build in the Make. Teacher: Try: ask which gate makes the carry and why. Teacher: Worked example: write the carries above the columns, as in base ten. Teacher: Vary: after overflow, ask where the fifth bit would have to go. -->

---

## Why it matters

> A processor adds billions of numbers a second, and it is only gates. How do switches add?

<!-- Speaker note: Adding in binary works like adding in columns at primary school, with only 0 and 1. Each column is a small truth table, so gates can do it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**In binary, what is 1 + 1?**

- 10: write 0, carry 1
- 2
- 11
- 0: it overflows and is lost

<!-- Speaker note: What happens: 10 (two): write 0 in this place and carry 1 to the next, just as 5 + 5 in base ten writes 0 and carries 1. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 2 hold Sam's misconception. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Flogic%2Fadding%2Fstep-2&code=widget%3A+gates%0Aoutputs%3A+S%2C+C%0Aadd%3A+xor%2C+and%0Atarget+S%3A+0110%0Atarget+C%3A+0001%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/logic/adding/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Look at the last row of the table. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 10 (two): write 0 in this place and carry 1 to the next, just as 5 + 5 in base ten writes 0 and carries 1.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Place by place

Now add 6 + 3.

$$\text{ones: } 1 + 1 = 10$$

1) $\text{twos: } 0 + 1 + 1 = 10$ — Sum 0, carry 1 to the fours.
2) $\text{fours: } 1 + 1 + 1 = 11$ — Sum 1, carry 1 to the eights.
3) $\text{eights: } 0 + 0 + 1 = 1$ — Sum 1, no carry.
4) $0101 + 0111 = 1100$ — 5 + 7 = 12. Each line is one full adder: XOR gates for the sum, AND and OR for the carry.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write ones: 1 + 1 = 10 and say "Sum 0, carry 1 to the twos." Line 1: write twos: 0 + 1 + 1 = 10 and say "Sum 0, carry 1 to the fours." Line 2: write fours: 1 + 1 + 1 = 11 and say "Sum 1, carry 1 to the eights." Line 3: write eights: 0 + 0 + 1 = 1 and say "Sum 1, no carry." Line 4: write 0101 + 0111 = 1100 and say "5 + 7 = 12. Each line is one full adder: XOR gates for the sum, AND and OR for the carry." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Place by place

**Add 0110 + 0011 (6 + 3) the same way. What is the sum, in four bits?**

* Answer: 1001

<!-- Speaker note: Ones: 0 + 1 = 1. Twos: 1 + 1 = 0, carry 1. Fours: 1 + 0 + carry 1 = 0, carry 1. Eights: 0 + 0 + carry 1 = 1. 1001 = 9. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam adds 0101 and 0011. Click the line where it first goes wrong.**

```
 1  0101 + 0011 (that is 5 + 3).
 2  Ones place: 1 + 1 = 2, so write 2.
 3  Twos place: 0 + 1 = 1, so write 1.
 4  Fours place: 1 + 0 = 1. Eights place: 0 + 0 = 0.
 5  The answer is 0112.
```

* Answer: line 2

<!-- Speaker note: Line 2: binary has no digit 2. 1 + 1 = 10: write 0, carry 1. The answer is 1000 (8). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why three inputs?

**A half adder adds two bits. Why does a full adder need three inputs?**

- The third input switches it on
- It needs a spare in case one breaks
- It adds three numbers at once
- It also adds the carry coming in from the place to its right

* Answer: It also adds the carry coming in from the place to its right

<!-- Speaker note: Every place except the first may get a carry from the right: A + B + carry in. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: carries



- **No carry:** 
- **One carry:** 
- **Overflow:** 
- **Every place:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/logic/adding/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing about the carries: none, exactly one, one that falls off the end (overflow), then a carry in every place. For students who need more support: A column-addition frame with a carry row above, for binary. For early finishers: Subtraction: look up two's complement. How could the same adder subtract? The hard part, on purpose: The full adder Make is hard on purpose: it is the first circuit with three inputs and two outputs. Point at the wanted columns and let students build the sum first, then the carry. When students get stuck: A student writes 2 in a binary sum (Sam's mistake). Ask: Which digits can binary use? Fix: 1 + 1 = 10: write 0, carry 1. / A student's full adder sum is right but the carry is wrong. Ask: Which rows need a carry? How many 1s does each have? Fix: Two or more 1s: (A AND B) OR ((A XOR B) AND CIN). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Add

**Add 0011 + 0011 in binary (four bits).**

* Answer: 0110

<!-- Speaker note: 3 + 3 = 6 = 0110. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How many adders?

**How many full adders does a processor need to add two 8-bit numbers in one go?**

- 2: one for each number
- 8: one for each place
- 16: one for each bit of both numbers
- 1, used 8 times

* Answer: 8: one for each place

<!-- Speaker note: One full adder per place, side by side. (The first can be a half adder: nothing carries into it.) -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: overflow

**Review: an 8-bit register holds 255. You add 1. What does it hold?**

- 0, and a carry falls off the end
- 255
- 256
- 1

* Answer: 0, and a carry falls off the end

<!-- Speaker note: 11111111 + 1 = 100000000: the ninth bit has nowhere to go, so the register holds 0. That is overflow. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: build a full adder

Then: count the gates in an 8-bit adder built from your full adders.

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/logic/adding/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building a full adder from its truth table reverses the process: from the sum and carry wanted to the gates that make them. Hints, in order: The sum is 1 when an odd number of the three inputs are on. / Sum: XOR A with B, then XOR that with CIN. / Carry: (A AND B) OR ((A XOR B) AND CIN). Reuse the first XOR. -->

<!-- Speaker note: Teacher: let students reuse the first XOR for the carry; compare gate counts. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Add 0110 + 0101 in binary. Which places carried?**

* 1011 (11). Only the fours place carried (1 + 1 = 10).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Remembering a bit (latches and registers). Links: Data representation › Bits all the way down (overflow); Inside a computer (the processor's speed). -->
