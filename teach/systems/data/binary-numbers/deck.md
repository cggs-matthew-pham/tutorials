---
marp: true
theme: default
html: true
---

# Bits and binary numbers

Data representation · Binary numbers

<!-- Speaker note: Students turn binary cards face up to see that each place is worth double the one on its right, read and write numbers in binary, and say why computers use two states (AC9TDI8K04). About 40 minutes (Predict and Try 8 min · Worked example 12 min · Vary 10 min · Practise and Make 10 min). Sources: CS Unplugged: Binary numbers (CC BY-SA 4.0), https://www.csunplugged.org/en/topics/binary-numbers/ (checked 12 October 2026); Digital Technologies Hub: Years 7–8 Binary numbers (CC BY 4.0), https://www.digitaltechnologieshub.edu.au/search/years-7-8-binary-numbers/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a computer stores numbers with switches that are only off (0) or on (1). Put bits side by side, make each place worth double the one on its right (1, 2, 4, 8, 16), and add the places that hold a 1: 10110 = 16 + 4 + 2 = 22.

- I can read a binary number by adding the places that hold a 1.
- I can write a number in binary.
- I can say why computers store numbers as bits.

<!-- Speaker note: Before class: Do the Try board yourself first. If you have time, do CS Unplugged's binary cards activity with real cards before the board: five students hold the 16, 8, 4, 2 and 1 cards at the front and turn them over to make numbers. The board is the same model. The one idea: each place is worth double the one on its right, and the number is the sum of the places holding a 1. The "why" in AC9TDI8K04 is the last Worked example task: two states are easy to tell apart reliably. This lesson uses no code. Students who have done the coding lessons have met bits as micro:bit LEDs (on or off) and as `True` or `False`. Teacher: Try: ask which card is worth the most, and why it is on the left (like the thousands column). Teacher: Worked example: have students say the places aloud from the right before revealing line 2. Teacher: Vary: before 7 to 8, ask students to predict how many cards will change. -->

---

## Why it matters

> A computer has no digits from 2 to 9, only switches that are off or on. So how does it store the number 22?

<!-- Speaker note: Text, pictures and sound are all stored as numbers. But inside, a computer has no digits from 2 to 9. A **bit** is one switch that is either off or on. We write off as **0** and on as **1**. One bit can only count to 1, so a computer puts bits side by side. The cards below are bits. Each card is worth **double** the card on its right, and a card face up is a 1. The number is the total of the cards that are face up. This way of writing numbers is called **binary**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Four cards are worth 8, 4, 2 and 1. The 8, 2 and 1 cards are face up, so the bits read **1011**. What number is that?**

- 3
- 11
- 13
- 1011

<!-- Speaker note: What happens: 11. The cards face up are 8, 2 and 1, and 8 + 2 + 1 = 11. 1011 is how it is written in binary, not one thousand and eleven. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 1011 read it as a base-10 number; 3 counted the 1s. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fbinary-numbers%2Fstep-2&code=widget%3A+bits%0Abits%3A+4%0An%3A+0%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/binary-numbers/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Each 1 adds its card's value; each 0 adds nothing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 11. The cards face up are 8, 2 and 1, and 8 + 2 + 1 = 11. 1011 is how it is written in binary, not one thousand and eleven.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Read the places

Here is 10110 read one place at a time. The places start at 1 on the right and double each time.

Now read 10011 the same way.

$$1\,0\,1\,1\,0$$

1) $16 \quad 8 \quad 4 \quad 2 \quad 1$ — Start at 1 on the right and double: 2, 4, 8, 16.
2) $16 + 4 + 2$ — Keep the places that hold a 1. The 0s add nothing.
3) $16 + 4 + 2 = 22$ — Add them: 10110 in binary is 22.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 10110 and say "Five bits, so five places." Line 1: write 16 8 4 2 1 and say "Start at 1 on the right and double: 2, 4, 8, 16." Line 2: write 16 + 4 + 2 and say "Keep the places that hold a 1. The 0s add nothing." Line 3: write 16 + 4 + 2 = 22 and say "Add them: 10110 in binary is 22." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Read the places

**Five cards are worth 16, 8, 4, 2 and 1. What number is **10011** in binary?**

* Answer: 19

<!-- Speaker note: 10011 = 16 + 2 + 1 = 19. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam reads 1100 in binary. Click the line where the working first goes wrong.**

```
 1  Read 1100 in binary.
 2  The places are 1, 2, 4, 8.
 3  The 1s are in the first two places.
 4  1 + 2 = 3
 5  So 1100 is 3.
```

* Answer: line 2

<!-- Speaker note: Line 2: the places go 1, 2, 4, 8 from the right, so the first two digits of 1100 are the 8 and 4 places. 1100 = 8 + 4 = 12. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why only 0 and 1?

**Why do computers store numbers in binary, not with the digits 0 to 9?**

- Each bit only needs two states (off and on, low or high voltage), which are easy to tell apart reliably
- Binary numbers are shorter
- Binary is easier for people to read
- Computers cannot add numbers bigger than 1

* Answer: Each bit only needs two states (off and on, low or high voltage), which are easy to tell apart reliably

<!-- Speaker note: A switch or a voltage only has to be off or on, low or high. Telling two states apart is fast and reliable even when the signal is a little weak or noisy; telling ten levels apart would not be. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change at a time



- **Make 6:** 
- **One more:** 
- **One more again:** 
- **Use the 16:** 
- **Number to binary:** Start with the biggest card that fits, then fill in the rest.

[Open this step](https://tutorials.learningwaypoints.com/systems/data/binary-numbers/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: a new number, one more (only the 1 card flips), then one more again (every card flips back and the 8 goes up, like a carry), then a fifth card. The last two show why the next place is worth double. For students who need more support: Keep the card values (16 8 4 2 1) written above every binary number until reading them is automatic. For early finishers: Count from 0 to 15 in binary on four cards. Which card flips every time? Which flips every second time? Every fourth? The hard part, on purpose: Reading binary as an ordinary number (1011 as one thousand and eleven). Have students say binary digit by digit ("one zero one one") and point at each card's value as they add. When students get stuck: A student writes 1011 = one thousand and eleven. Ask: Which cards are face up, and what are they worth? Fix: Point at each 1 and say its card's value, then add. / A student reads 1100 as 3 (Sam's mistake). Ask: Which end is the 1 card? Fix: Write 8 4 2 1 above the digits before reading. / A student writing 13 in binary gets stuck. Ask: What is the biggest card that fits in 13? Fix: Take the 8, then 5 is left: the biggest card that fits is 4, then 1 is left. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Four bits

**What number is **1001** in binary?**

* Answer: 9

<!-- Speaker note: 1001 = 8 + 1 = 9. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Zeros on the right

**What number is **11000** in binary?**

* Answer: 24

<!-- Speaker note: 11000 = 16 + 8 = 24. The three 0s on the right add nothing. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Number to binary

**Write 20 in binary with five bits.**

* Answer: 10100

<!-- Speaker note: 20 = 16 + 4, so 10100. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## All ones

**What number is **11111** in binary?**

* Answer: 31

<!-- Speaker note: 16 + 8 + 4 + 2 + 1 = 31, the biggest number five cards can show. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: powers of 2

**Review: what is $2^4$?**

* Answer: 16

<!-- Speaker note: 2 × 2 × 2 × 2 = 16. The binary places are powers of 2: 1, 2, 4, 8, 16 are $2^0$ to $2^4$. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: three cards up

Stretch: what is the **smallest** number with exactly three cards up? Write it in binary.

[Open this step](https://tutorials.learningwaypoints.com/systems/data/binary-numbers/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building the biggest number with exactly three cards up reverses the process: students choose cards to reach a target, and see that the left cards count most. Hints, in order: The cards on the left are worth the most. / Use the three biggest cards. -->

<!-- Speaker note: Teacher: collect answers and the stretch (7, 00111): what is the difference? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is 10101 in binary? Write 12 in binary.**

* 10101 = 16 + 4 + 1 = 21. 12 = 8 + 4 = 1100.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: How many patterns? (how many numbers a set of bits can hold, and overflow). Where it leads: the 0 to 255 limits students met in text, colours and sound come from bits (How many patterns?). Later: why binary (logic gates) and how bits underpin every encoding. In maths, the places are powers of 2, as base-10 places are powers of 10. -->
