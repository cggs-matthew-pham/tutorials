---
order: 6
unit: chance
node: [AC9M7P01 n1, AC9M7P01 n2]
uses: [AC9M7N04 n2]   # writing a probability as a fraction, decimal or percentage
title: Sample spaces and probability
summary: "The sample space lists every possible outcome. When the outcomes are equally likely, the probability of an event is favourable outcomes ÷ total outcomes; when they are not (a spinner with a bigger sector), use the sizes. The probabilities add to 1."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A spinner is half red. Red, blue or green: three colours, so is each one a third? Spin it a thousand times and see."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8184
  url: http://127.0.0.1:8184/index.html
  readySelector: ".ctally"
  layout: full
explainPicture: { ref: chance.yml#pic-spinner, caption: "Sample space {red, blue, green}, but not equally likely: P(red) = 1/2, P(blue) = 1/4, P(green) = 1/4. They add to 1." }
explainClip:
  query: { code: "@chance.yml#explain", fresh: 1, id: explain }
  caption: "List the outcomes, then share out the chance"
  say: "List every outcome, then share out the chance."
  clip:
    - caption: { text: "Sample space: {red, blue, green}. Every possible outcome.", say: "The sample space lists every possible outcome: red, blue, green." }
    - wait: 900
    - caption: { text: "Not equally likely: red is half the spinner, so P(red) = 1/2.", say: "They are not equally likely. Red is half the spinner: a half." }
    - wait: 900
    - caption: { text: "Blue and green are a quarter each. 1/2 + 1/4 + 1/4 = 1.", say: "Blue and green are a quarter each. Together they make one." }
    - click: Run 1000
    - wait: 1400
---
**Probability** measures how likely something is, from 0 (impossible) to 1 (certain).

- The **sample space** is the list of every possible outcome: a coin $\{H, T\}$, a dice $\{1, 2, 3, 4, 5, 6\}$.
- An **event** is one or more of those outcomes, such as "an even number".
- When the outcomes are **equally likely**, $P(\text{event}) = \dfrac{\text{favourable outcomes}}{\text{total outcomes}}$.
- When they are not (a spinner with a bigger sector, a bag with more red counters), use the sizes or counts. Either way, the probabilities of all the outcomes add to 1.

## Predict: a third each?

```step
stage: predict
insight: "Committing to P(blue) on a half-red spinner shows whether they assume the listed outcomes are equally likely."
check:
  type: predict
  q: "A spinner is half red, a quarter blue and a quarter green. What is the probability of blue?"
  options:
    - "$\\tfrac{1}{4}$"
    - "$\\tfrac{1}{3}$"
    - "$\\tfrac{1}{2}$"
  actual: "1/4. There are three colours, but they are not equally likely: blue is a quarter of the spinner, so P(blue) = 1/4."
```

Three colours, but are they the same size?

## Run: spin it

```step
stage: run
insight: "Spinning a thousand times shows blue settling near a quarter, not a third: the outcomes in a sample space need not be equally likely."
try: { playground: board, starter: "chance.yml#run", height: 620 }
check: { type: board, text: "Run at least 1000 spins. Is the relative frequency of blue nearer $\\tfrac{1}{4}$ or $\\tfrac{1}{3}$? Was your prediction right?", when: "t >= 1000" }
```

The table lists the sample space, each outcome's probability, and what happened.

## Investigate: list, then count

```step
stage: investigate
insight: "List the sample space completely, check whether the outcomes are equally likely, then favourable ÷ total, or the sizes; the probabilities add to 1. Kai's mistake treats every listed outcome as equally likely."
tasks:
  - check:
      type: answer
      q: "Roll a fair dice. What is the probability of an even number? Give a fraction in simplest form."
      answer: "1/2"
      form: simplest
      feedback:
        - ["3/6", "Right: simplify it."]
        - ["1/3", "The even numbers are 2, 4 and 6: three of six."]
        - ["3", "That is how many favourable outcomes. Divide by the total, 6."]
      explain: "Sample space {1, 2, 3, 4, 5, 6}; even: 2, 4, 6. P = 3/6 = 1/2."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai works out probabilities for the half-red spinner. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: equally-likely-outcomes
      explain: "Line 3: favourable ÷ total only works when the outcomes are equally likely. Red is half the spinner: P(red) = 1/2, P(blue) = P(green) = 1/4."
  - check:
      type: answer
      q: "A bag has 3 red, 5 blue and 2 green counters. You take one without looking. What is $P(\\text{blue})$? Simplest form."
      answer: "1/2"
      form: simplest
      feedback:
        - ["5/10", "Right: simplify it."]
        - ["1/3", "Three colours, but more blue counters: count the counters, not the colours."]
      explain: "10 counters, 5 blue: 5/10 = 1/2."
```

### List, then count

Here is how to find a probability.

```worked
\{1, 2, 3, 4, 5, 6\} :: List the sample space: every possible outcome of rolling a dice.
\text{equally likely?} \;\checkmark :: A fair dice: each face has the same chance.
\text{even} = \{2, 4, 6\} :: The favourable outcomes for the event.
P(\text{even}) = \tfrac{3}{6} = \tfrac{1}{2} = 0.5 = 50\% :: Favourable ÷ total, in any form.
P(\text{red}) = \tfrac{1}{2},\ P(\text{blue}) = P(\text{green}) = \tfrac{1}{4} :: Not equally likely: use the sizes. Check: they add to 1.
```

Now work out P(even) on a dice.

### Find the mistake

Read Kai's reasoning. Is each colour the same size?

### Counters in a bag

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a different event, a spinner with repeated labels, a missing probability, a percentage, then the edge cases of impossible and certain."
tasks:
  - check:
      type: answer
      q: "Roll a fair dice. What is the probability of a number greater than 4? Simplest form."
      answer: "1/3"
      form: simplest
      feedback:
        - ["2/6", "Right: simplify it."]
        - ["1/6", "Greater than 4: 5 and 6, two outcomes."]
      explain: "{5, 6}: 2 of 6 = 1/3."
  - check:
      type: question
      q: "A spinner has three equal sectors labelled A, A and B. What is the sample space, and $P(A)$?"
      options: ["{A, B}, with P(A) = 2/3", "{A, A, B}, with P(A) = 1/3", "{A, B}, with P(A) = 1/2"]
      answer: 0
      feedback: [null, "List each different outcome once; A covers two of the three sectors.", "A and B are not equally likely: A has two sectors."]
      explain: "Two possible outcomes, A and B, but A covers 2 of 3 equal sectors: P(A) = 2/3."
  - check:
      type: answer
      q: "A spinner has $P(\\text{red}) = 0.5$ and $P(\\text{blue}) = 0.3$. The only other colour is green. What is $P(\\text{green})$?"
      answer: "0.2"
      feedback:
        - ["0.8", "The three must add to 1: 1 − 0.5 − 0.3."]
      explain: "0.5 + 0.3 + P(green) = 1, so P(green) = 0.2."
  - check:
      type: answer
      q: "Write $P(\\text{heads})$ for a fair coin as a percentage."
      answer: "50"
      feedback:
        - ["0.5", "That is the decimal. As a percentage: × 100."]
      explain: "1/2 = 0.5 = 50%."
  - check:
      type: question
      q: "Edge cases on a fair dice: $P(7)$ and $P(\\text{less than } 7)$?"
      options: ["0 (impossible) and 1 (certain)", "1/7 and 6/7", "0 and 6/6, which is not allowed"]
      answer: 0
      feedback: [null, "7 is not in the sample space at all.", "6/6 = 1 is fine: certain."]
      explain: "No 7 on the dice: probability 0. Every roll is less than 7: probability 1."
```

### A different event

Each task changes one thing.

### Repeated labels

### The missing probability

### As a percentage

### Impossible and certain

## Practise: probabilities

```step
stage: practise
insight: "Sample spaces and probabilities for coins, dice, bags and spinners, mixed; the equally-likely slip planted again; the review keeps comparing data fresh."
tasks:
  - check:
      type: answer
      q: "A bag has 4 yellow and 6 purple counters. $P(\\text{yellow})$? Simplest form."
      answer: "2/5"
      form: simplest
      feedback:
        - ["4/10", "Right: simplify it."]
        - ["1/2", "Two colours, but not the same number of counters."]
      explain: "4 of 10 = 2/5."
  - check:
      type: answer
      q: "Pick a letter at random from the word MATHS. What is the probability it is a vowel? (A fraction.)"
      answer: "1/5"
      form: simplest
      feedback:
        - ["2/5", "Only A is a vowel in MATHS."]
      explain: "5 letters, 1 vowel (A): 1/5."
  - check:
      type: question
      q: "Which list is the full sample space for spinning this spinner: four equal sectors labelled 1, 2, 2, 3?"
      options: ["{1, 2, 3}", "{1, 2, 2, 3}", "{2}"]
      answer: 0
      feedback: [null, "List each different outcome once (2 is still twice as likely).", "1 and 3 can happen too."]
      explain: "The possible outcomes are 1, 2 and 3; 2 has probability 1/2, the others 1/4 each."
  - check:
      type: question
      q: "Review: Group A's median is 12 (range 4); Group B's is 12 (range 15). Which is right?"
      options: ["Same centre; B is much more spread", "B is better", "They are the same data"]
      answer: 0
      feedback: [null, "Compare centre and spread, not a winner.", "Same median does not mean same data."]
      explain: "Equal medians, but B varies far more."
```

### A bag

### Letters

### Sample space

### Review: comparing

## Make: design a bag

```step
stage: make
insight: "Designing a bag to match given probabilities reverses the lesson: from probabilities back to counts, using equivalent fractions."
check:
  type: answer
  q: "Design a bag of 10 counters with $P(\\text{red}) = \\tfrac{3}{10}$ and $P(\\text{blue}) = \\tfrac{1}{2}$; the rest are green. How many green counters?"
  answer: "2"
  feedback:
    - ["8", "That is red and blue together. The rest are green."]
    - ["5", "That is blue: 1/2 of 10."]
  explain: "3 red, 5 blue (1/2 of 10), so 10 − 8 = 2 green. P(green) = 2/10 = 1/5."
```

Then: design a bag with $P(\text{red}) = \tfrac{1}{3}$. What is the smallest bag that works?
