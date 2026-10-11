---
order: 3
unit: hand
assumes: [random]
recipes: [import-module, dotted-call]
title: A fair test
summary: "Hold back some penguins to test on: a model tested on the data it learned from looks perfect, and only new data shows how good it really is."
language: python
hook: "If you saw the exam questions and answers beforehand, a perfect score would prove nothing. Models are the same."
---
How good is the nearest-neighbour model? To find out, it must be tested on penguins it has **not** seen. So the penguins are split: a **training** set the model learns from (its examples), and a **test** set kept back to check it. `penguins[:250]` is the first 250; `penguins[250:]` is the rest. The data file is in order of species, so it is **shuffled** first (`random.seed(1)` makes the shuffle the same every time).

## Predict

```step
stage: predict
code: testing.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["['Gentoo', 'Gentoo']", "['Adelie', 'Adelie', 'Chinstrap']", "['Chinstrap', 'Gentoo', 'Gentoo']", "An error"]
  actual: "['Gentoo', 'Gentoo']. [3:] is from place 3 to the end. The test set is all Gentoo, because the list was in order of species: a test with no Adelies tests nothing about them."
```

`[:3]` is the first three items; `[3:]` is from place 3 to the end. What is in the test set, and is it a fair test?

## Run

```step
stage: run
code: testing.py#run
try: { playground: python, starter: "testing.py#run", files: [../sets/penguins.csv], height: 480 }
check: { type: reflect, text: "I can explain why the model scores 100% on its own training penguins." }
unlocks: [test-a-model]
```

Run it (it takes a moment: every test penguin is compared with all 250 training penguins). Compare the two scores. Then change `random.seed(1)` to another number and run again.

## Investigate

```step
stage: investigate
code: testing.py#run
insight: "A model must be tested on data it has not seen: on its training data it can just remember, so only the test set measures how well it will do on new penguins."
tasks:
  - check:
      type: question
      q: "Why is the score 100% on the training penguins?"
      options: ["Each penguin's nearest match is itself, at distance 0, so it always copies its own species", "The training penguins are easier", "The model was trained twice", "It is a lucky shuffle"]
      answer: 0
      explain: "Tested on its own examples, nearest neighbour finds the very same penguin. That says nothing about penguins it has never met."
  - check:
      type: question
      q: "Why shuffle before splitting?"
      options: ["The file is in order of species, so without a shuffle the test set would be nearly all one species", "Shuffling makes the model learn faster", "Python needs it", "To hide the answers"]
      answer: 0
      explain: "A fair test has a mix like the real world. The Predict step showed what happens without a shuffle."
  - check:
      type: bug
      code: testing.py#bug
      text: "With this split the model scores 100% on the test set. Click the line that is wrong."
      answer: 9
      fault: logic
      misconception: test-on-train
      explain: "penguins[:92] is part of the training set, so the model is tested on penguins it learned from. The test set must be the others: penguins[250:]."
```

### The perfect score

Why it means nothing.

### Why shuffle

A fair mix.

### Spot the bug

A test the model has already seen.

## Modify

```step
stage: modify
insight: "Changing the training data changes the model; per-species results show where it struggles."
try: { playground: python, starter: "testing.py#run", files: [../sets/penguins.csv], height: 480 }
tasks:
  - hint: "train = penguins[:30], and keep test = penguins[250:] so the test is the same."
    check: { type: code, text: "Train on only 30 penguins and compare the test accuracy.", rules: { contains: ["[:30]"] } }
  - hint:
      - "Two dictionaries, right and total, keyed by species. For each test penguin, add 1 to total; if the guess is right, add 1 to right too."
      - "Start a species at 0 the first time it turns up, as in Data detective's counting."
    check: { type: code, text: "Show the test results for each species separately.", rules: { contains: ["right["] } }
```

### Less to learn from

Train on only **30** penguins. What happens to the test accuracy? Why?

### Each species

Show how many of each species in the test set were guessed right. Which species is hardest, and why might that be?

## Make: rules or neighbours?

```step
stage: make
insight: "Goals only: test two models on the same test set, and compare them fairly."
try: { playground: python, starter: "testing.py#make", files: [../sets/penguins.csv], height: 480 }
check: { type: code, text: "Test Lesson 1's rules and the nearest-neighbour model on the same test penguins, and print both scores.", rules: { contains: ["def guess", "test"] } }
```

Bring back the rules from Lesson 1 as `guess(bill, flipper)` and test them on the **same** test penguins as the nearest-neighbour model. Which wins? Is the difference big enough to matter?

## Where this leads

```step
stage: info
check:
  type: question
  q: "A company says its model is 99% accurate. What should you ask first?"
  options: ["Was it tested on data it had never seen, and data like the real world?", "How fast is it?", "Who wrote it?", "Nothing: 99% is good"]
  answer: 0
  explain: "A score only means something if the test was fair. Always ask what it was tested on."
```

Next: the same model, the same split and the same test in a few lines of scikit-learn, the library real data scientists use.
