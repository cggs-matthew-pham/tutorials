---
order: 6
unit: tools
optional: true
title: What models get wrong
summary: "Find where the penguin model fails: a species it has never seen, impossible measurements and harder questions, and learn to say what a model cannot do."
language: python
recipes: [import-from, import-module, dotted-call]
hook: "Models in the news make mistakes that matter: missing people, wrong answers said confidently. Knowing how they fail is part of building them."
---
Optional. A model can only learn from the data it was given. This lesson tries the penguin model on things it was not built for, and finishes with a **model card**: a short, honest description of what a model does, how well, and what it cannot do.

## Predict

```step
stage: predict
code: limits.py#predict
check:
  type: predict
  q: "An emperor penguin (much bigger, and a species not in the data) is measured. What does the model say?"
  options: ["One of the three species it knows", "I do not know", "Emperor", "An error"]
  actual: "Gentoo. The model can only choose between Adelie, Chinstrap and Gentoo, so it picks the closest, even for a penguin unlike any it has seen."
```

The model was trained on Adelie, Chinstrap and Gentoo penguins only. What can it possibly answer?

## Run

```step
stage: run
code: limits.py#run
try: { playground: python, starter: "limits.py#run", files: [../sets/penguins.csv], height: 480 }
check: { type: reflect, text: "I found a guess the model was 100% sure about that cannot be right." }
```

Run it. Two of the mystery penguins are ordinary; one is far too big and one far too small to be any of these species. Look at how sure the model is about each.

## Investigate

```step
stage: investigate
code: limits.py#run
insight: "A model always answers from what it knows, and its confidence can be high even when it is wrong; people building models must say where it should not be used."
tasks:
  - check:
      type: question
      q: "Why is the model 100% sure about a penguin 20 mm long?"
      options: ["Its 5 nearest penguins are all Adelie, though they are far away: the vote says nothing about distance", "Small penguins are always Adelie", "The data has penguins that small", "It checked very carefully"]
      answer: 0
      explain: "The vote share only compares the neighbours with each other. Confidence is not the same as being right."
  - check:
      type: question
      q: "All the penguins come from three islands near one research station, from 2007 to 2009. What follows?"
      options: ["The model may do worse on penguins from other places or years, which it has never seen", "It works for every penguin in the world", "It only works on those three islands' rocks", "Nothing"]
      answer: 0
      explain: "A model knows the world its data came from. Who collected the data, where and when, decides what it can be trusted for."
```

### Sure but wrong

What the 100% means.

### Where the data came from

What a model knows about the world.

## Modify

```step
stage: modify
insight: "A careful model says when a question is outside what it knows, and a fair test shows that some questions are harder than others."
try: { playground: python, starter: "limits.py#run", files: [../sets/penguins.csv], height: 480 }
tasks:
  - hint:
      - "distances, places = model.kneighbors(mysteries) gives each mystery's distances to its nearest penguins."
      - "If distances[i][0] (the nearest) is more than 10, print that it is not like any penguin in the data."
    check: { type: code, text: "Say \"not like any penguin in the data\" when a mystery is far from every penguin.", rules: { contains: ["kneighbors("] } }
  - hint: "pd.read_csv(...).dropna(), then loop over [\"species\", \"sex\", \"island\"] as y, with a fair test for each."
    check: { type: code, text: "Test fairly how well bill and flipper length predict species, sex and island.", rules: { contains: ["\"sex\"", "\"island\""] } }
```

### Too far away

Use `kneighbors` to find how far each mystery is from its nearest penguin, and say "not like any penguin in the data" instead of a guess when it is too far.

### Harder questions

Test fairly how well bill and flipper length predict **species**, **sex** and **island**. Which is hardest, and why might that be?

## Make: a model card

```step
stage: make
insight: "Goals only: describe a model honestly, so people know when to trust it."
check: { type: reflect, text: "I wrote a model card for my penguin app: what it predicts, from what data, how accurate it is on a fair test, and three things it cannot do." }
```

Write a **model card** for your app from the last lesson (in a comment at the top of the program, or on paper): what it predicts and from which measurements, where the data came from, its accuracy on a fair test, and three situations where it should not be trusted.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A school wants a model that guesses which students need extra help, trained on past years' records. What should they check first?"
  options: ["Whether the past data treats every group fairly, how it was tested, and who checks its mistakes", "Only its accuracy", "How fast it runs", "Nothing: models are objective"]
  answer: 0
  explain: "Models copy the patterns in their data, including unfair ones. Real uses need fair testing, human review and a clear statement of limits."
```

You have built models by hand, used a real library and put a model in an app. The same ideas (examples, fair tests, honest limits) are behind every machine-learning system, from Teachable Machine to large language models.
