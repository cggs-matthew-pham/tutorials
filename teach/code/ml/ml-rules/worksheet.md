---
title: "Rules by hand"
subtitle: "Machine learning with Gradio · Models by hand · Lesson 1"
---

# Rules by hand

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Scientists on Antarctica measured 342 penguins. Can a few lines of Python tell the three species apart from their bills and flippers?


:::teacher-note

**In one sentence:** Students meet the Palmer Penguins data, guess species with hand-written if rules, measure accuracy on 342 penguins, look at the mistakes, tune the rules, and write rules of their own with a third measurement.

**Students should be able to say:** I can explain what a model and its accuracy are. I can measure how often a set of rules is right on real data. I can use a model's mistakes to improve it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Each `return` ends the function, so the rules are tried in order. Follow `guess(50.0, 196)` through them.

```python
def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


print(guess(39.1, 181))
print(guess(50.0, 196))
print(guess(46.1, 211))
```

:::keep-together

**What does the second line print?**

☐ Adelie

☐ Gentoo

☐ Chinstrap

☐ Nothing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Chinstrap. 196 is not over 206, so it is not Gentoo; 50.0 is over 44, so the rule says Chinstrap.

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


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        correct = correct + 1
print(str(correct) + " of " + str(len(penguins)) + " right: " + str(round(100 * correct / len(penguins))) + "%")
```

:::keep-together

### What accuracy means

**The rules get 95% right. What does that mean?**

☐ The rules are right about 95 penguins

☐ 95% of the rules are used

☐ The rules are 95% finished

☐ 95 of every 100 penguins get the right species

:::


:::teacher-note

**Answer:** 95 of every 100 penguins get the right species

Accuracy is right answers divided by all answers. Here 324 of 342 penguins: 95%.

:::


:::keep-together

### Who chose 206?

**Where does the number 206 come from?**

☐ It is random

☐ Someone chose it by looking at the data: most Gentoos have longer flippers than that

☐ Python worked it out

☐ It is a scientific fact about penguins

:::


:::teacher-note

**Answer:** Someone chose it by looking at the data: most Gentoos have longer flippers than that

A person picked it. Learning a number like this from data, instead of picking it, is what machine learning does.

:::


:::keep-together

### Spot the bug

**This stops with TypeError: '&gt;' not supported between instances of 'str' and 'int'. Click the line that is wrong.**

```
 1  import csv
 2  
 3  penguins = []
 4  with open("penguins.csv") as f:
 5      for row in csv.DictReader(f):
 6          penguins.append({"species": row["species"], "bill": row["bill_length_mm"], "flipper": row["flipper_length_mm"]})
 7  
 8  for p in penguins:
 9      if p["flipper"] > 206:
10          print(p["species"])
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

Values from a CSV are text. The measurements need float() when they are read, as in the Run step.

:::


:::typical

## Modify


**The mistakes.** Print every penguin the rules get wrong. Which species is guessed wrong most, and why?

**Tune the rules.** Change the numbers (206 and 44) one at a time and run again. What is the best accuracy you can get?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The mistakes:**

```python
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        correct = correct + 1
print(str(correct) + " of " + str(len(penguins)) + " right: " + str(round(100 * correct / len(penguins))) + "%")

for p in penguins:
    g = guess(p["bill"], p["flipper"])
    if g != p["species"]:
        print(p["species"] + " guessed as " + g + ": bill " + str(p["bill"]) + ", flipper " + str(p["flipper"]))
```

:::

:::


## Make: rules of your own

Add `bill_depth_mm` to each penguin when it is read, write rules that use it (Gentoos have shallow bills), and print the accuracy. Is it better or worse than the Run step's 95%?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"]), "depth": float(row["bill_depth_mm"])})


def guess(p):
    if p["depth"] < 16:
        return "Gentoo"
    if p["bill"] > 44:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p) == p["species"]:
        correct = correct + 1
print(str(round(100 * correct / len(penguins))) + "% right")
```

:::


:::wider

## Where this leads

Data: Palmer Penguins (Gorman, Williams and Fraser 2014; Palmer Station Antarctica LTER), CC0.

:::


## Exit ticket

:::keep-together

**What does it mean that the rules are 95% accurate on the penguins?**

{{lines-3}}

:::


:::teacher-note

**Answer:** They give the right species for 95 of every 100 penguins in the data (324 of 342).

:::

