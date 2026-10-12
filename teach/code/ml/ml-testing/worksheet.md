---
title: "A fair test"
subtitle: "Machine learning with Gradio · Models by hand · Lesson 3"
---

# A fair test

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** If you saw the exam questions and answers beforehand, a perfect score would prove nothing. Models are the same.


:::teacher-note

**In one sentence:** Students split the penguins into training and test sets after shuffling, see nearest neighbour score 100% on its own training data and about 95% on new penguins, then train on less data, break results down by species and compare the Lesson 1 rules fairly.

**Students should be able to say:** I can explain why a model must be tested on data it has not seen. I can split data into training and test sets, shuffling first. I can compare two models fairly on the same test set.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`[:3]` is the first three items; `[3:]` is from place 3 to the end. What is in the test set, and is it a fair test?

```python
penguins = ["Adelie", "Adelie", "Chinstrap", "Gentoo", "Gentoo"]
train = penguins[:3]
test = penguins[3:]
print(test)
```

:::keep-together

**What does it print?**

☐ ['Adelie', 'Adelie', 'Chinstrap']

☐ ['Chinstrap', 'Gentoo', 'Gentoo']

☐ An error

☐ ['Gentoo', 'Gentoo']

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** ['Gentoo', 'Gentoo']. [3:] is from place 3 to the end. The test set is all Gentoo, because the list was in order of species: a test with no Adelies tests nothing about them.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


print("Tested on the penguins it learned from: " + str(accuracy(train, train)) + "%")
print("Tested on new penguins: " + str(accuracy(test, train)) + "%")
```

:::keep-together

### The perfect score

**Why is the score 100% on the training penguins?**

☐ Each penguin's nearest match is itself, at distance 0, so it always copies its own species

☐ The model was trained twice

☐ The training penguins are easier

☐ It is a lucky shuffle

:::


:::teacher-note

**Answer:** Each penguin's nearest match is itself, at distance 0, so it always copies its own species

Tested on its own examples, nearest neighbour finds the very same penguin. That says nothing about penguins it has never met.

:::


:::keep-together

### Why shuffle

**Why shuffle before splitting?**

☐ To hide the answers

☐ Shuffling makes the model learn faster

☐ The file is in order of species, so without a shuffle the test set would be nearly all one species

☐ Python needs it

:::


:::teacher-note

**Answer:** The file is in order of species, so without a shuffle the test set would be nearly all one species

A fair test has a mix like the real world. The Predict step showed what happens without a shuffle.

:::


:::keep-together

### Spot the bug

**With this split the model scores 100% on the test set. Click the line that is wrong.**

```
 1  import csv
 2  
 3  penguins = []
 4  with open("penguins.csv") as f:
 5      for row in csv.DictReader(f):
 6          penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})
 7  
 8  train = penguins[:250]
 9  test = penguins[:92]
10  print(len(train), len(test))
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

penguins[:92] is part of the training set, so the model is tested on penguins it learned from. The test set must be the others: penguins[250:].

:::


:::typical

## Modify


**Less to learn from.** Train on only **30** penguins. What happens to the test accuracy? Why?

**Each species.** Show how many of each species in the test set were guessed right. Which species is hardest, and why might that be?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Less to learn from:**

```python
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:30]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


print("Tested on the penguins it learned from: " + str(accuracy(train, train)) + "%")
print("Tested on new penguins: " + str(accuracy(test, train)) + "%")
```

**Each species:**

```python
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


print("Tested on the penguins it learned from: " + str(accuracy(train, train)) + "%")
print("Tested on new penguins: " + str(accuracy(test, train)) + "%")

right = {}
total = {}
for p in test:
    s = p["species"]
    if s not in total:
        total[s] = 0
        right[s] = 0
    total[s] = total[s] + 1
    if nearest(p, train)["species"] == s:
        right[s] = right[s] + 1
for s in total:
    print(s + ": " + str(right[s]) + " of " + str(total[s]))
```

:::

:::


## Make: rules or neighbours?

Bring back the rules from Lesson 1 as `guess(bill, flipper)` and test them on the **same** test penguins as the nearest-neighbour model. Which wins? Is the difference big enough to matter?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


rule_right = 0
for p in test:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        rule_right = rule_right + 1
print("Rules: " + str(round(100 * rule_right / len(test))) + "%")
print("Nearest neighbour: " + str(accuracy(test, train)) + "%")
```

:::


:::wider

## Where this leads

Next: the same model, the same split and the same test in a few lines of scikit-learn, the library real data scientists use.

:::


## Exit ticket

:::keep-together

**Why does a model need a test set it has never seen?**

{{lines-3}}

:::


:::teacher-note

**Answer:** On data it learned from it can just remember the answers; only new data shows how well it will do on penguins it meets later.

:::

