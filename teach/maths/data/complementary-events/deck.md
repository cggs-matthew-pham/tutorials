---
marp: true
theme: default
html: true
---

# Complementary events

Data and chance · Chance

<!-- Speaker note: Students choose events on a dice and two dice, show their complements, and use P(not A) = 1 − P(A), including for 'at least one' (AC9M8P01, nodes 1 and 2). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** an event and its complement (everything else that could happen) cover every outcome once. Use that to find probabilities quickly, especially for 'at least one'.

- I can name the complement of an event.
- I can find P(not A) from P(A), in fractions, decimals and percentages.
- I can use the complement to find the chance of 'at least one'.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need sample spaces and probability as a fraction (Year 7 Chance). The one idea: an event and its complement cover every outcome exactly once, so their probabilities add to 1. The common mistake is calling any two events that can't happen together complementary (Ben's mistake); complementary events must also cover everything. "Mutually exclusive" is the formal word for can't-happen-together; it is used in the teacher notes, not required of students yet. 'At least one' is the main use: one block to count (none) instead of many cases. Wider: the chance of at least one six in four rolls of a dice, 1 − (5/6)⁴, a famous gambling question (needs multiplying, Year 10). -->

---

## Why it matters

> The forecast says a 30% chance of rain. What is the chance it stays dry? You know straight away, but why does it work?

<!-- Speaker note: An **event** is a set of outcomes, such as "roll a 5 or a 6". Its **complement**, written **not A** (or A′), is every other outcome in the sample space. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A spinner lands on red with probability 0.35. It has other colours too. What is the probability it does not land on red?**

- 0.65
- 0.35
- You need to know the other colours

<!-- Speaker note: What happens: 0.65. Not red is every other outcome, so P(not red) = 1 − 0.35, whatever the other colours are. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask whether the other colours matter. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fcomplementary-events%2Fstep-2&code=widget%3A+events%0Afirst%3A+dice%0Atarget%3A+a+%3E%3D+5%0Acomplement%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/complementary-events/?full=step-2#step-2)

<!-- Speaker note: Every outcome is in A or in not A, never both and never neither. So: $$P(A) + P(\text{not } A) = 1 \qquad P(\text{not } A) = 1 - P(A)$$ -->

<!-- Speaker note: Teacher: ask whether any outcome is in both, or in neither. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 0.65. Not red is every other outcome, so P(not red) = 1 − 0.35, whatever the other colours are.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Not late

Here is the routine.

$$P(\text{red}) = \tfrac{3}{8}$$

1) $P(\text{not red}) = 1 - \tfrac{3}{8}$ — Not red is every other counter.
2) $= \tfrac{5}{8}$ — Check: 5 counters are not red.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write P(red) = 3 ÷ 8 and say "A bag has 3 red counters out of 8." Line 1: write P(not red) = 1 - 3 ÷ 8 and say "Not red is every other counter." Line 2: write = 5 ÷ 8 and say "Check: 5 counters are not red." -->

<!-- Speaker note: Teacher: ask Ben where a roll of 3 goes. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Not late

**The chance a bus is late is 0.15. What is the chance it is not late?**

* Answer: 0.85

<!-- Speaker note: P(not late) = 1 − 0.15 = 0.85. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Ben works with two events on a dice. Click the line where his reasoning goes wrong.**

```
 1  Ben rolls a dice. Event A is "roll a 1" and event B is "roll a 6".
 2  A and B cannot both happen on the same roll.
 3  So A and B are complementary events.
 4  So P(B) = 1 − P(A) = 1 − 1/6 = 5/6.
```

* Answer: line 3

<!-- Speaker note: Line 3: A and B can't happen together, but they don't cover every outcome (2, 3, 4 and 5 are in neither). Complementary events must cover everything. P(B) = 1/6. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which pair

**On one roll of a dice, which pair of events is complementary?**

- Roll a 6; roll a 5 or a 6
- Roll more than 3; roll less than 3
- Roll a 1; roll a 6
- Roll an even number; roll an odd number

* Answer: Roll an even number; roll an odd number

<!-- Speaker note: Every number is even or odd, never both: together they cover every outcome once. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## At least one



- **No six:** 
- **At least one six:** 
- **Three coins:** 
- **Faulty globes:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/complementary-events/?full=step-4#step-4)

<!-- Speaker note: What this step is for: 'At least one six' has many cases, but its complement 'no six' is one block: count it and subtract. Hints, in order: No six means the first dice is not 6 and the second is not 6. / That is the 5 by 5 block of outcomes from 1 to 5. Clicking a row or column number chooses the whole row or column. For students who need more support: A sample space printed as a grid, with two colours of highlighter. For early finishers: Two dice are rolled. Which is more likely: at least one six, or a sum of 7 or more? Use complements. The hard part, on purpose: Telling complementary from 'can't happen together'. Ask: does every outcome land in one of the two? When students get stuck: A student says a heart and a spade are complementary. Ask: Where do clubs go? Fix: Complementary events cover every outcome. / A student counts 12 outcomes with at least one six. Ask: Which outcome did you count twice? Fix: (6, 6) is in both rows; or count no six (25) and subtract from 36. / A student writes P(not A) = P(A). Ask: Which outcomes are not in A? Fix: Count everything else, or subtract from 1. -->

<!-- Speaker note: Teacher: ask why counting 'no six' is quicker than 'at least one six'. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Win or not

**P(a team wins) = 0.45. A draw is not possible. What is P(the team does not win)?**

* Answer: 0.55

<!-- Speaker note: 1 − 0.45 = 0.55. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Complement in words

**On a dice, what is the complement of 'roll at least 4'?**

- Roll a 4
- Roll more than 4
- Roll less than 4 or more than 4
- Roll 3 or less

* Answer: Roll 3 or less

<!-- Speaker note: At least 4 is 4, 5, 6, so the complement is 1, 2, 3. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Cards

**A card is drawn from a pack. A is 'a heart' and B is 'a spade'. Are A and B complementary?**

- Yes: they are both suits
- Yes: they can't both happen
- No: they can both happen
- No: some cards are in neither

* Answer: No: some cards are in neither

<!-- Speaker note: They can't both happen, but clubs and diamonds are in neither. Complementary events cover every outcome: P(not a heart) = 3/4, not P(spade). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: expected count

**Review: a dice is rolled 120 times. How many sixes do you expect?**

* Answer: 20

<!-- Speaker note: 1/6 × 120 = 20. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a quarter

Then describe your event in words, so someone else could check it.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/complementary-events/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building an event with a given probability, then its complement, shows they can reason from P to outcomes. Hints, in order: P(A) = 1/4 means 9 of the 36 outcomes. / Try a rule, such as 'the first dice is even and the second is 3 or less'. Clicking a row number chooses a whole row. -->

<!-- Speaker note: Teacher: ask how many outcomes make a quarter of 36. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**P(it snows tomorrow) = 0.08. What is P(it does not snow)? Then: two coins are tossed; what is P(at least one tail)?**

* 0.92. And 1 − P(HH) = 1 − 1/4 = 3/4.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This covers AC9M8P01. Where it leads: two-way tables and Venn diagrams (next), and 'and', 'or' and 'not' in compound events. -->
