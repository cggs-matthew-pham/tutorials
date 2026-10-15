---
marp: true
theme: default
html: true
---

# Sample spaces and probability

Data and chance · Chance

<!-- Speaker note: Students list sample spaces for coins, dice, bags and spinners, assign probabilities as favourable ÷ total when outcomes are equally likely and from sizes or counts when they are not, check that probabilities add to 1, and test a prediction with 1000 spins (AC9M7P01, nodes 1 and 2). About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 12 min · Practise and Make 13 min). -->

---

## Today

**We are learning to** the sample space lists every possible outcome. When the outcomes are equally likely, the probability of an event is favourable outcomes ÷ total outcomes; when they are not (a spinner with a bigger sector), use the sizes. The probabilities add to 1.

- I can list the sample space for a single event.
- I can work out a probability as a fraction, decimal or percentage.
- I can tell when outcomes are not equally likely, and use sizes or counts instead.

<!-- Speaker note: Before class: Do the Run board first. Students need fractions, decimals and percentages (Number Foundations). This is a hinge: everything in Chance builds on a complete sample space and correct probabilities. The common mistake is treating every listed outcome as equally likely (three colours, so 1/3 each); it is planted in the Predict and in Kai's reasoning. The board's random spins are different every time; with 1000 or more spins the relative frequencies are reliably close to the probabilities. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> A spinner is half red. Red, blue or green: three colours, so is each one a third? Spin it a thousand times and see.

<!-- Speaker note: **Probability** measures how likely something is, from 0 (impossible) to 1 (certain). - The **sample space** is the list of every possible outcome: a coin $\{H, T\}$, a dice $\{1, 2, 3, 4, 5, 6\}$. - An **event** is one or more of those outcomes, such as "an even number". - When the outcomes are **equally likely**, $P(\text{event}) = \dfrac{\text{favourable outcomes}}{\text{total outcomes}}$. - When they are not (a spinner with a bigger sector, a bag with more red counters), use the sizes or counts. Either way, the probabilities of all the outcomes add to 1. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A spinner is half red, a quarter blue and a quarter green. What is the probability of blue?**

- $\tfrac{1}{2}$
- $\tfrac{1}{3}$
- $\tfrac{1}{4}$

<!-- Speaker note: What happens: 1/4. There are three colours, but they are not equally likely: blue is a quarter of the spinner, so P(blue) = 1/4. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands; ask students who chose 1/3 how they decided. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fsample-space%2Fstep-2&code=widget%3A+chance%0Adevice%3A+spinner%0Aoutcomes%3A+red+2%2C+blue+1%2C+green+1%0Awatch%3A+blue%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/sample-space/?full=step-2#step-2)

<!-- Speaker note: The table lists the sample space, each outcome's probability, and what happened. -->

<!-- Speaker note: Teacher: ask what relative frequency you would expect if each colour really were 1/3. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 1/4. There are three colours, but they are not equally likely: blue is a quarter of the spinner, so P(blue) = 1/4.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## List, then count

Here is how to find a probability.

Now work out P(even) on a dice.

$$\{1, 2, 3, 4, 5, 6\}$$

1) $\text{equally likely?} \;\checkmark$ — A fair dice: each face has the same chance.
2) $\text{even} = \{2, 4, 6\}$ — The favourable outcomes for the event.
3) $P(\text{even}) = \tfrac{3}{6} = \tfrac{1}{2} = 0.5 = 50\%$ — Favourable ÷ total, in any form.
4) $P(\text{red}) = \tfrac{1}{2},\ P(\text{blue}) = P(\text{green}) = \tfrac{1}{4}$ — Not equally likely: use the sizes. Check: they add to 1.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write \1, 2, 3, 4, 5, 6\ and say "List the sample space: every possible outcome of rolling a dice." Line 1: write equally likely? ✓ and say "A fair dice: each face has the same chance." Line 2: write even = \2, 4, 6\ and say "The favourable outcomes for the event." Line 3: write P(even) = 3 ÷ 6 = 1 ÷ 2 = 0.5 = 50\% and say "Favourable ÷ total, in any form." Line 4: write P(red) = 1 ÷ 2,P(blue) = P(green) = 1 ÷ 4 and say "Not equally likely: use the sizes. Check: they add to 1." -->

<!-- Speaker note: Teacher: write the sample space for each device on the board before any probability. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## List, then count

**Roll a fair dice. What is the probability of an even number? Give a fraction in simplest form.**

* Answer: 1/2

<!-- Speaker note: Sample space {1, 2, 3, 4, 5, 6}; even: 2, 4, 6. P = 3/6 = 1/2. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Kai works out probabilities for the half-red spinner. Click the line where his reasoning goes wrong.**

```
 1  The spinner has three colours: red, blue and green.
 2  So the sample space is {red, blue, green}.
 3  There are 3 outcomes, so each has probability 1/3.
```

* Answer: line 3

<!-- Speaker note: Line 3: favourable ÷ total only works when the outcomes are equally likely. Red is half the spinner: P(red) = 1/2, P(blue) = P(green) = 1/4. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Counters in a bag

**A bag has 3 red, 5 blue and 2 green counters. You take one without looking. What is $P(\text{blue})$? Simplest form.**

* Answer: 1/2

<!-- Speaker note: 10 counters, 5 blue: 5/10 = 1/2. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## One change at a time



- **A different event:** Each task changes one thing.
- **Repeated labels:** 
- **The missing probability:** 
- **As a percentage:** 
- **Impossible and certain:** 

<!-- Speaker note: What this step is for: One change at a time: a different event, a spinner with repeated labels, a missing probability, a percentage, then the edge cases of impossible and certain. For students who need more support: List the sample space in a table with a probability column; check the column adds to 1. For early finishers: Design a spinner with four colours where one colour is three times as likely as each of the others. When students get stuck: A student gives each colour 1/3 (Kai's mistake). Ask: Is each colour the same size? Fix: Use the sizes: half the spinner is 1/2. / A student counts colours instead of counters. Ask: How many counters are there in total? Fix: Favourable counters ÷ total counters. / A student gives the count instead of the probability (3 instead of 1/2). Ask: Out of how many? Fix: Divide by the total number of outcomes. -->

<!-- Speaker note: Teacher: for repeated labels, draw the spinner with A, A, B. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A bag

**A bag has 4 yellow and 6 purple counters. $P(\text{yellow})$? Simplest form.**

* Answer: 2/5

<!-- Speaker note: 4 of 10 = 2/5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Letters

**Pick a letter at random from the word MATHS. What is the probability it is a vowel? (A fraction.)**

* Answer: 1/5

<!-- Speaker note: 5 letters, 1 vowel (A): 1/5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sample space

**Which list is the full sample space for spinning this spinner: four equal sectors labelled 1, 2, 2, 3?**

- {1, 2, 2, 3}
- {1, 2, 3}
- {2}

* Answer: {1, 2, 3}

<!-- Speaker note: The possible outcomes are 1, 2 and 3; 2 has probability 1/2, the others 1/4 each. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: comparing

**Review: Group A's median is 12 (range 4); Group B's is 12 (range 15). Which is right?**

- B is better
- Same centre; B is much more spread
- They are the same data

* Answer: Same centre; B is much more spread

<!-- Speaker note: Equal medians, but B varies far more. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: design a bag

Then: design a bag with $P(\text{red}) = \tfrac{1}{3}$. What is the smallest bag that works?

<!-- Speaker note: What this step is for: Designing a bag to match given probabilities reverses the lesson: from probabilities back to counts, using equivalent fractions. -->

<!-- Speaker note: Teacher: ask for the smallest bag with P(red) = 1/3. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A bag has 2 red, 3 green and 5 yellow counters. List the sample space and give each probability.**

* {red, green, yellow}: P(red) = 2/10 = 1/5, P(green) = 3/10, P(yellow) = 5/10 = 1/2. They add to 1.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Predict and test (AC9M7P01 node 3, AC9M7P02 node 1): expected counts and experiments. Where it leads: complementary events and two-step experiments (Year 8). -->
