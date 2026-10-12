---
title: "The nearest penguin"
subtitle: "Machine learning with Gradio · Models by hand · Lesson 2"
---

# The nearest penguin

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Music apps suggest songs like the ones you play; shops suggest things bought by people like you. Many of these start from one idea: find the closest match.


:::teacher-note

**In one sentence:** Students write a nearest-neighbour model from scratch, measuring the distance between penguins with Pythagoras and copying the species of the closest one, then ask for measurements, add a "not sure" answer and guess five mystery penguins.

**Students should be able to say:** I can explain how a nearest-neighbour model makes a guess. I can work out the distance between two examples with Pythagoras. I can use the distance to say how sure a guess is.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The bills differ by 3 and the flippers by 4. What does Pythagoras say?

```python
def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


print(distance({"bill": 40, "flipper": 190}, {"bill": 43, "flipper": 194}))
```

:::keep-together

**What does it print?**

☐ 1.0

☐ 5.0

☐ 7

☐ 25

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5.0. The differences are 3 and 4; 3 squared plus 4 squared is 25, and the square root of 25 is 5.0.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mystery = {"bill": 47.0, "flipper": 215.0}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
print("Guess: " + match["species"])
```

:::keep-together

### Where the learning is

**Where is the "learning" in this model?**

☐ nearest() changes its own code

☐ The examples are the knowledge: it answers from the penguins it has seen, not from rules someone wrote

☐ The distance function learns

☐ There is none

:::


:::teacher-note

**Answer:** The examples are the knowledge: it answers from the penguins it has seen, not from rules someone wrote

Nearest neighbour learns by remembering. Give it different examples and it gives different answers, with no rules changed.

:::


:::keep-together

### How sure?

**A mystery penguin's nearest match is 0.2 away; another's is 10 away. Which guess would you trust more, and why?**

☐ The 10 one: it is further from mistakes

☐ The 0.2 one: a penguin in the data is almost exactly like it

☐ Both the same: the model always gives an answer

☐ Neither: distance does not matter

:::


:::teacher-note

**Answer:** The 0.2 one: a penguin in the data is almost exactly like it

A small distance means a very similar penguin is known. A big one means nothing in the data is like it, so the guess is weak, even though the model still answers.

:::


:::keep-together

### Spot the bug

**The mystery penguin (47, 215) is guessed as an Adelie 44 away, though a Gentoo 0.2 away is in the data. Click the line that is wrong.**

```
 1  import csv
 2  
 3  penguins = []
 4  with open("penguins.csv") as f:
 5      for row in csv.DictReader(f):
 6          penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})
 7  
 8  
 9  def distance(a, b):
10      return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5
11  
12  
13  def nearest(new):
14      best = penguins[0]
15      for p in penguins:
16          if distance(p, new) > distance(best, new):
17              best = p
18      return best
19  
20  
21  mystery = {"bill": 47.0, "flipper": 215.0}
22  match = nearest(mystery)
23  print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
24  print("Distance: " + str(round(distance(match, mystery), 1)))
25  print("Guess: " + match["species"])
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 16

&gt; keeps the biggest distance so far, which finds the furthest penguin. &lt; keeps the smallest: the nearest.

:::


:::typical

## Modify


**Ask for the measurements.** Ask for the bill and flipper length with `input()`.

**Not sure.** When the nearest penguin is more than 10 away, print `Not sure` instead of a guess.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Ask for the measurements:**

```python
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


bill = float(input("Bill length (mm)? "))
flipper = float(input("Flipper length (mm)? "))
mystery = {"bill": bill, "flipper": flipper}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
print("Guess: " + match["species"])
```

**Not sure:**

```python
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mystery = {"bill": 47.0, "flipper": 215.0}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
if distance(match, mystery) > 10:
    print("Not sure: no penguin in the data is close")
else:
    print("Guess: " + match["species"])
```

:::

:::


## Make: five mystery penguins

Guess the species of each of the five mystery penguins, and print each guess with its distance. Which guess would you not trust?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mysteries = [
    {"bill": 38.0, "flipper": 185.0},
    {"bill": 49.5, "flipper": 196.0},
    {"bill": 46.0, "flipper": 218.0},
    {"bill": 44.0, "flipper": 201.0},
    {"bill": 60.0, "flipper": 240.0},
]

for m in mysteries:
    match = nearest(m)
    print(str(m["bill"]) + ", " + str(m["flipper"]) + ": " + match["species"] + " (distance " + str(round(distance(match, m), 1)) + ")")
```

:::


:::wider

## Where this leads

How good is this model really? Testing it on penguins it already knows would be cheating: that is the next lesson.

:::


## Exit ticket

:::keep-together

**How does a nearest-neighbour model guess a new penguin's species?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It finds the penguin in its data with the closest measurements and gives that penguin's species.

:::

