---
marp: true
theme: default
html: true
---

# Rules by hand

Machine learning with Gradio · Models by hand

<!-- Speaker note: Students meet the Palmer Penguins data, guess species with hand-written if rules, measure accuracy on 342 penguins, look at the mistakes, tune the rules, and write rules of their own with a third measurement. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** guess a penguin's species from its measurements with if rules, then score the rules on 342 real penguins.

- I can explain what a model and its accuracy are.
- I can measure how often a set of rules is right on real data.
- I can use a model's mistakes to improve it.

<!-- Speaker note: Before class: Read the unit primer first. This course runs in the **Python playground** (real Python in the browser, Pyodide); later lessons load scikit-learn, which takes several seconds the first time, so open the site's Check your school page once on a student device at school. `penguins.csv` is the Palmer Penguins data (CC0): 342 penguins of three species with bill length and depth, flipper length, body mass, sex, island and year (2 penguins with no measurements are left out). The loader is the same `csv.DictReader` pattern as Data detective, with `float()` (the bug task forgets it). The rules reach 95% accuracy; the mistakes are mostly Adelies with long bills guessed as Chinstrap. The second Investigate question sets up the course: a person chose 206, and machine learning finds such things from data. -->

---

## Why it matters

> Scientists on Antarctica measured 342 penguins. Can a few lines of Python tell the three species apart from their bills and flippers?

<!-- Speaker note: This course uses real data: 342 penguins of three species (**Adelie**, **Chinstrap** and **Gentoo**) measured by scientists at Palmer Station, Antarctica. It is in your **Files** tab as `penguins.csv`. The program reads each row into a dictionary of numbers, and `penguins.append(...)` adds it to the end of the list. A **model** is anything that takes measurements and gives an answer. The simplest model is a set of `if` rules you write yourself; its **accuracy** is how often it is right. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does the second line print?**

- Adelie
- Gentoo
- Chinstrap
- Nothing

<!-- Speaker note: What happens: Chinstrap. 196 is not over 206, so it is not Gentoo; 50.0 is over 44, so the rule says Chinstrap. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: trace guess(50.0, 196) on the board, rule by rule. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Chinstrap. 196 is not over 206, so it is not Gentoo; 50.0 is over 44, so the rule says Chinstrap.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ml/ml-rules/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ml/ml-rules/?full=step-2#step-2)

<!-- Speaker note: Run it: the rules are checked against every penguin. Then change `206` to `200` and run again. Better or worse? Students should be able to say: I can say what the accuracy means, and roughly how many penguins the rules get wrong. -->

<!-- Speaker note: Teacher: ask for a show of hands: who thinks 95% is good? What about for a medical test? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A model can be as simple as if rules; accuracy (right answers out of all) measures it, and the mistakes show where the rules are too simple. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What accuracy means

**The rules get 95% right. What does that mean?**

- The rules are right about 95 penguins
- 95% of the rules are used
- The rules are 95% finished
- 95 of every 100 penguins get the right species

* Answer: 95 of every 100 penguins get the right species

<!-- Speaker note: Accuracy is right answers divided by all answers. Here 324 of 342 penguins: 95%. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who chose 206?

**Where does the number 206 come from?**

- It is random
- Someone chose it by looking at the data: most Gentoos have longer flippers than that
- Python worked it out
- It is a scientific fact about penguins

* Answer: Someone chose it by looking at the data: most Gentoos have longer flippers than that

<!-- Speaker note: A person picked it. Learning a number like this from data, instead of picking it, is what machine learning does. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 6

<!-- Speaker note: Values from a CSV are text. The measurements need float() when they are read, as in the Run step. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **The mistakes:** Print every penguin the rules get wrong. Which species is guessed wrong most, and why?
- **Tune the rules:** Change the numbers (206 and 44) one at a time and run again. What is the best accuracy you can get?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-rules/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Looking at the mistakes shows how to change the rules; changing a number and re-testing is tuning a model by hand. Hints, in order: Loop over the penguins again; when guess(...) != p["species"], print the real species, the guess and the measurements. For students who need more support: Give students the loop that prints mistakes, and ask them only to write the if. For early finishers: Print a table of guesses against real species (a confusion matrix) with a dictionary of dictionaries. The hard part, on purpose: Using the mistakes to improve the rules. Ask students what the wrong guesses have in common before they change a number. When students get stuck: TypeError: '>' not supported between instances of 'str' and 'int'. Ask: Were the measurements turned into numbers when they were read? Fix: float(row["bill_length_mm"]). / KeyError: 'bill_depth_mm' in the Make. Ask: Is it read from row, or from the penguin dictionary? Fix: Read row["bill_depth_mm"] in the loader and store it, such as "depth": float(...). / The accuracy is above 100%. Ask: Is correct counted once per penguin? Fix: Add 1 only inside the if, once per penguin. -->

<!-- Speaker note: Teacher: tally the mistakes by species on the board. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: rules of your own

Add `bill_depth_mm` to each penguin when it is read, write rules that use it (Gentoos have shallow bills), and print the accuracy. Is it better or worse than the Run step's 95%?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-rules/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a third measurement, a rule of your own, and an honest comparison. -->

<!-- Speaker note: Teacher: compare accuracies across the class. -->

---

## Where this leads

Data: Palmer Penguins (Gorman, Williams and Fraser 2014; Palmer Station Antarctica LTER), CC0.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does it mean that the rules are 95% accurate on the penguins?**

* They give the right species for 95 of every 100 penguins in the data (324 of 342).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson builds a model that learns from the examples themselves: nearest neighbour. -->
