---
order: 2
unit: hand
introduces: [power]
title: The nearest penguin
summary: "Write a real machine-learning model yourself: to guess a new penguin's species, find the most similar penguin in the data and copy its answer."
language: python
hook: "Music apps suggest songs like the ones you play; shops suggest things bought by people like you. Many of these start from one idea: find the closest match."
---
Instead of writing rules, let the **data** decide. To guess a mystery penguin's species, find the penguin in the data whose measurements are **closest**, and give its species. This is called **nearest neighbour**, and it is a real machine-learning method. Closeness is a **distance**: with bill and flipper length as the two sides of a right-angled triangle, Pythagoras gives the distance between two penguins (`** 2` squares a number, `** 0.5` takes the square root).

## Predict

```step
stage: predict
code: nearest.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["5.0", "7", "25", "1.0"]
  actual: "5.0. The differences are 3 and 4; 3 squared plus 4 squared is 25, and the square root of 25 is 5.0."
```

The bills differ by 3 and the flippers by 4. What does Pythagoras say?

## Run

```step
stage: run
code: nearest.py#run
try: { playground: python, starter: "nearest.py#run", files: [../sets/penguins.csv], height: 480 }
check: { type: reflect, text: "I tried a few mystery penguins, and can explain how nearest() finds the closest one." }
```

Run it, then change the mystery penguin's measurements and run again: try `38, 185`, `50, 196` and `45, 205`. Which is the hardest to guess, and why?

## Investigate

```step
stage: investigate
code: nearest.py#run
insight: "Nearest neighbour keeps every example and answers with the closest one; the distance says how alike two penguins are, so a small distance means a confident guess."
tasks:
  - check:
      type: question
      q: "Where is the \"learning\" in this model?"
      options: ["The examples are the knowledge: it answers from the penguins it has seen, not from rules someone wrote", "nearest() changes its own code", "The distance function learns", "There is none"]
      answer: 0
      explain: "Nearest neighbour learns by remembering. Give it different examples and it gives different answers, with no rules changed."
  - check:
      type: question
      q: "A mystery penguin's nearest match is 0.2 away; another's is 10 away. Which guess would you trust more, and why?"
      options: ["The 0.2 one: a penguin in the data is almost exactly like it", "The 10 one: it is further from mistakes", "Both the same: the model always gives an answer", "Neither: distance does not matter"]
      answer: 0
      explain: "A small distance means a very similar penguin is known. A big one means nothing in the data is like it, so the guess is weak, even though the model still answers."
  - check:
      type: bug
      code: nearest.py#bug
      text: "The mystery penguin (47, 215) is guessed as an Adelie 44 away, though a Gentoo 0.2 away is in the data. Click the line that is wrong."
      answer: 16
      fault: logic
      misconception: compare-direction
      explain: "> keeps the biggest distance so far, which finds the furthest penguin. < keeps the smallest: the nearest."
```

### Where the learning is

Answers from examples.

### How sure?

What the distance says.

### Spot the bug

The furthest penguin, not the nearest.

## Modify

```step
stage: modify
insight: "A model is more useful when it asks for its input and says how sure it is."
try: { playground: python, starter: "nearest.py#run", files: [../sets/penguins.csv], height: 480 }
tasks:
  - hint: "Replace the mystery line: bill = float(input(\"Bill length (mm)? \")), the same for flipper, then mystery = {\"bill\": bill, \"flipper\": flipper}."
    check: { type: code, text: "Ask for the mystery penguin's measurements with input().", rules: { contains: ["input("] } }
  - hint: "If distance(match, mystery) > 10, print Not sure instead of the guess."
    check: { type: code, text: "Print Not sure when the nearest penguin is more than 10 away.", rules: { contains: ["Not sure"] } }
```

### Ask for the measurements

Ask for the bill and flipper length with `input()`.

### Not sure

When the nearest penguin is more than 10 away, print `Not sure` instead of a guess.

## Make: five mystery penguins

```step
stage: make
insight: "Goals only: use the model on many new examples and read its answers critically."
try: { playground: python, starter: "nearest.py#make", files: [../sets/penguins.csv], height: 480 }
check: { type: code, text: "Guess the species of each mystery penguin, and print each guess with its distance.", rules: { contains: ["mysteries"], loops: 3 } }
```

Guess the species of each of the five mystery penguins, and print each guess with its distance. Which guess would you not trust?

## Where this leads

```step
stage: info
check:
  type: question
  q: "Flipper lengths are around 200 and bill lengths around 45. What does that do to the distance?"
  options: ["Differences in flippers count for more, because the numbers are bigger", "Nothing: a millimetre is a millimetre", "Bills count for more", "The distance stops working"]
  answer: 0
  explain: "Measurements with bigger spreads dominate the distance. Real machine learning often rescales each measurement first so each counts fairly."
```

How good is this model really? Testing it on penguins it already knows would be cheating: that is the next lesson.
