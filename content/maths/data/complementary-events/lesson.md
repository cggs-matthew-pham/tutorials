---
order: 10
unit: chance
node: [AC9M8P01 n1, AC9M8P01 n2]
uses: [AC9M7P01 n2]
title: Complementary events
summary: "An event and its complement (everything else that could happen) cover every outcome once. Use that to find probabilities quickly, especially for 'at least one'."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The forecast says a 30% chance of rain. What is the chance it stays dry? You know straight away, but why does it work?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8328
  url: http://127.0.0.1:8328/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: ev.yml#explain-pic, caption: "A dice: A is 'roll 1 or 2' (blue, 2 outcomes); not A is the other 4 (orange). 2/6 + 4/6 = 1." }
explainClip:
  query: { code: "@ev.yml#explain", fresh: 1, id: explain }
  caption: "An event and its complement"
  say: "Every outcome is either in A, or in not A."
  clip:
    - caption: { text: "A: roll a 1 or a 2. P(A) = 2/6.", say: "Event A: roll a one or a two. Two out of six." }
    - wait: 1200
    - caption: { text: "Not A: every other outcome, 3 to 6. P(not A) = 4/6.", say: "Not A is everything else: four out of six." }
    - click: Show not A
    - expect: { selector: "#gnote", contains: "P(A) + P(not A) = 1" }
    - caption: { text: "Together they cover every outcome once: 2/6 + 4/6 = 1.", say: "Together they make one." }
    - wait: 1600
---
An **event** is a set of outcomes, such as "roll a 5 or a 6". Its **complement**, written **not A** (or A′), is every other outcome in the sample space.

## Predict: not red

```step
stage: predict
insight: "Committing to P(not red) from P(red) alone shows whether they see that the other colours don't need to be known."
check:
  type: predict
  q: "A spinner lands on red with probability 0.35. It has other colours too. What is the probability it does not land on red?"
  options: ["You need to know the other colours", "0.65", "0.35"]
  actual: "0.65. Not red is every other outcome, so P(not red) = 1 − 0.35, whatever the other colours are."
```

## Run: an event and its complement

```step
stage: run
insight: "Choosing an event on a dice and showing its complement shows the two cover every outcome once, so their probabilities add to 1."
try: { playground: board, starter: "ev.yml#run", height: 520 }
check: { type: board, text: "Click the outcomes for A: 'roll at least 5'. Then press Show not A. Do P(A) and P(not A) add to 1? Does that match your prediction?", when: "r = 1 and k = 1", explain: "P(A) = 2/6 and P(not A) = 4/6. Every outcome is in exactly one of them, so they add to 1." }
```

Every outcome is in A or in not A, never both and never neither. So:

$$P(A) + P(\text{not } A) = 1 \qquad P(\text{not } A) = 1 - P(A)$$

## Investigate: using the complement

```step
stage: investigate
insight: "Subtract from 1 to find a complement; events that can't happen together are not always complementary (Ben); a complementary pair must cover every outcome."
tasks:
  - check:
      type: number
      q: "The chance a bus is late is 0.15. What is the chance it is not late?"
      answer: 0.85
      tolerance: 0.001
      feedback:
        - ["0.15", "That is the chance it is late. Not late is everything else: 1 − 0.15."]
      explain: "P(not late) = 1 − 0.15 = 0.85."
  - check:
      type: bug
      code: "working.txt#ben"
      text: "Ben works with two events on a dice. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: complement-exclusive
      explain: "Line 3: A and B can't happen together, but they don't cover every outcome (2, 3, 4 and 5 are in neither). Complementary events must cover everything. P(B) = 1/6."
  - check:
      type: question
      q: "On one roll of a dice, which pair of events is complementary?"
      options: ["Roll more than 3; roll less than 3", "Roll a 6; roll a 5 or a 6", "Roll an even number; roll an odd number", "Roll a 1; roll a 6"]
      answer: 2
      feedback: ["3 is in neither.", "These overlap: 6 is in both.", null, "2, 3, 4 and 5 are in neither."]
      explain: "Every number is even or odd, never both: together they cover every outcome once."
```

### Not late

Here is the routine.

```worked
P(\text{red}) = \tfrac{3}{8} :: A bag has 3 red counters out of 8.
P(\text{not red}) = 1 - \tfrac{3}{8} :: Not red is every other counter.
= \tfrac{5}{8} :: Check: 5 counters are not red.
```

### Find the mistake

Read Ben's working. Which outcomes are in neither event?

### Which pair

## Modify: at least one

```step
stage: modify
insight: "'At least one six' has many cases, but its complement 'no six' is one block: count it and subtract."
try: { playground: board, starter: "ev.yml#nosix", height: 640 }
tasks:
  - starter: "ev.yml#nosix"
    hint: ["No six means the first dice is not 6 and the second is not 6.", "That is the 5 by 5 block of outcomes from 1 to 5. Clicking a row or column number chooses the whole row or column."]
    check: { type: board, text: "Two dice are rolled. Choose every outcome with no six at all.", when: "r = 1", explain: "25 outcomes: both dice show 1 to 5." }
  - check:
      type: answer
      q: "So what is the probability of at least one six when two dice are rolled?"
      answer: "11/36"
      feedback:
        - ["12/36", "Six with the first dice plus six with the second counts (6, 6) twice."]
        - ["25/36", "That is the chance of no six. At least one six is the complement."]
      explain: "At least one six is the complement of no six: 1 − 25/36 = 11/36."
  - check:
      type: question
      q: "Three coins are tossed. What is the probability of at least one head?"
      options: ["7/8", "1/8", "3/8", "1/2"]
      answer: 0
      feedback: [null, "That is the chance of no heads (TTT).", "That is exactly one head.", "Count the 8 outcomes: only TTT has no head."]
      explain: "Only TTT has no heads, so P(at least one head) = 1 − 1/8 = 7/8."
  - check:
      type: number
      q: "A factory finds that 2% of its light globes are faulty. What percentage are not faulty?"
      answer: 98
      tolerance: 0
      explain: "100% − 2% = 98%: probabilities as percentages add to 100%."
```

### No six

### At least one six

### Three coins

### Faulty globes

## Practise: complements

```step
stage: practise
insight: "Complements in decimals, fractions, percentages and words, mixed; calling events that can't happen together complementary is the planted slip; expected count is the Year 7 review."
tasks:
  - check:
      type: number
      q: "P(a team wins) = 0.45. A draw is not possible. What is P(the team does not win)?"
      answer: 0.55
      tolerance: 0.001
      explain: "1 − 0.45 = 0.55."
  - check:
      type: question
      q: "On a dice, what is the complement of 'roll at least 4'?"
      options: ["Roll 3 or less", "Roll less than 4 or more than 4", "Roll a 4", "Roll more than 4"]
      answer: 0
      feedback: [null, "More than 4 is part of 'at least 4'.", "4 is in the event itself.", "That is part of the event."]
      explain: "At least 4 is 4, 5, 6, so the complement is 1, 2, 3."
  - check:
      type: question
      q: "A card is drawn from a pack. A is 'a heart' and B is 'a spade'. Are A and B complementary?"
      options: ["Yes: they can't both happen", "Yes: they are both suits", "No: they can both happen", "No: some cards are in neither"]
      answer: 3
      feedback: ["Not happening together is not enough: they must cover every card.", "Clubs and diamonds are missing.", "A heart and a spade can't be drawn at once.", null]
      explain: "They can't both happen, but clubs and diamonds are in neither. Complementary events cover every outcome: P(not a heart) = 3/4, not P(spade)."
  - check:
      type: number
      q: "Review: a dice is rolled 120 times. How many sixes do you expect?"
      answer: 20
      tolerance: 0
      explain: "1/6 × 120 = 20."
```

### Win or not

### Complement in words

### Cards

### Review: expected count

## Make: a quarter

```step
stage: make
insight: "Building an event with a given probability, then its complement, shows they can reason from P to outcomes."
try: { playground: board, starter: "ev.yml#make", height: 640 }
hint: ["P(A) = 1/4 means 9 of the 36 outcomes.", "Try a rule, such as 'the first dice is even and the second is 3 or less'. Clicking a row number chooses a whole row."]
check: { type: board, text: "Two dice: choose an event A with P(A) = 1/4. Then show not A. What is P(not A)?", when: "n = 9 and k = 1", explain: "Any 9 outcomes give 9/36 = 1/4, and not A is the other 27: P(not A) = 3/4." }
```

Then describe your event in words, so someone else could check it.
