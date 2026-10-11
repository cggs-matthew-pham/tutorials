---
order: 1
unit: hand
introduces: [list-change]
title: Rules by hand
summary: "Guess a penguin's species from its measurements with if rules, then score the rules on 342 real penguins."
language: python
hook: "Scientists on Antarctica measured 342 penguins. Can a few lines of Python tell the three species apart from their bills and flippers?"
---
This course uses real data: 342 penguins of three species (**Adelie**, **Chinstrap** and **Gentoo**) measured by scientists at Palmer Station, Antarctica. It is in your **Files** tab as `penguins.csv`. The program reads each row into a dictionary of numbers, and `penguins.append(...)` adds it to the end of the list. A **model** is anything that takes measurements and gives an answer. The simplest model is a set of `if` rules you write yourself; its **accuracy** is how often it is right.

## Predict

```step
stage: predict
code: rules.py#predict
check:
  type: predict
  q: "What does the second line print?"
  options: ["Chinstrap", "Adelie", "Gentoo", "Nothing"]
  actual: "Chinstrap. 196 is not over 206, so it is not Gentoo; 50.0 is over 44, so the rule says Chinstrap."
```

Each `return` ends the function, so the rules are tried in order. Follow `guess(50.0, 196)` through them.

## Run

```step
stage: run
code: rules.py#run
try: { playground: python, starter: "rules.py#run", files: [../sets/penguins.csv], height: 480 }
check: { type: reflect, text: "I can say what the accuracy means, and roughly how many penguins the rules get wrong." }
```

Run it: the rules are checked against every penguin. Then change `206` to `200` and run again. Better or worse?

## Investigate

```step
stage: investigate
code: rules.py#run
insight: "A model can be as simple as if rules; accuracy (right answers out of all) measures it, and the mistakes show where the rules are too simple."
tasks:
  - check:
      type: question
      q: "The rules get 95% right. What does that mean?"
      options: ["95 of every 100 penguins get the right species", "The rules are right about 95 penguins", "The rules are 95% finished", "95% of the rules are used"]
      answer: 0
      explain: "Accuracy is right answers divided by all answers. Here 324 of 342 penguins: 95%."
  - check:
      type: question
      q: "Where does the number 206 come from?"
      options: ["Someone chose it by looking at the data: most Gentoos have longer flippers than that", "It is a scientific fact about penguins", "Python worked it out", "It is random"]
      answer: 0
      explain: "A person picked it. Learning a number like this from data, instead of picking it, is what machine learning does."
  - check:
      type: bug
      code: rules.py#bug
      text: "This stops with TypeError: '>' not supported between instances of 'str' and 'int'. Click the line that is wrong."
      answer: 6
      fault: runtime
      misconception: csv-text-values
      explain: "Values from a CSV are text. The measurements need float() when they are read, as in the Run step."
```

### What accuracy means

Right out of all.

### Who chose 206?

Where the rule's numbers came from.

### Spot the bug

Measurements that are still text.

## Modify

```step
stage: modify
insight: "Looking at the mistakes shows how to change the rules; changing a number and re-testing is tuning a model by hand."
try: { playground: python, starter: "rules.py#run", files: [../sets/penguins.csv], height: 480 }
tasks:
  - hint: "Loop over the penguins again; when guess(...) != p[\"species\"], print the real species, the guess and the measurements."
    check: { type: code, text: "Print every penguin the rules get wrong: its real species, the guess and its measurements.", rules: { contains: ["!= p[\"species\"]"] } }
  - check: { type: reflect, text: "I changed the numbers in the rules, re-tested each time, and found the best I could." }
```

### The mistakes

Print every penguin the rules get wrong. Which species is guessed wrong most, and why?

### Tune the rules

Change the numbers (206 and 44) one at a time and run again. What is the best accuracy you can get?

## Make: rules of your own

```step
stage: make
insight: "Goals only: a third measurement, a rule of your own, and an honest comparison."
try: { playground: python, starter: "rules.py#make", files: [../sets/penguins.csv], height: 480 }
check: { type: code, text: "Add bill depth to each penguin, write rules that use it, and print their accuracy.", rules: { contains: ["bill_depth_mm"], loops: 2 } }
```

Add `bill_depth_mm` to each penguin when it is read, write rules that use it (Gentoos have shallow bills), and print the accuracy. Is it better or worse than the Run step's 95%?

## Where this leads

```step
stage: info
check:
  type: question
  q: "Writing rules by hand gets harder with more measurements and more species. What would help?"
  options: ["A program that finds the rule or the answer from the examples itself: machine learning", "More if statements", "Bigger penguins", "A faster computer"]
  answer: 0
  explain: "Machine learning finds patterns from examples instead of a person choosing every number. Next lesson: a model that learns by looking at the most similar penguin."
```

Data: Palmer Penguins (Gorman, Williams and Fraser 2014; Palmer Station Antarctica LTER), CC0.
