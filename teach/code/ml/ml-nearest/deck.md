---
marp: true
theme: default
html: true
---

# The nearest penguin

Machine learning with Gradio · Models by hand

<!-- Speaker note: Students write a nearest-neighbour model from scratch, measuring the distance between penguins with Pythagoras and copying the species of the closest one, then ask for measurements, add a "not sure" answer and guess five mystery penguins. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** write a real machine-learning model yourself: to guess a new penguin's species, find the most similar penguin in the data and copy its answer.

- I can explain how a nearest-neighbour model makes a guess.
- I can work out the distance between two examples with Pythagoras.
- I can use the distance to say how sure a guess is.

<!-- Speaker note: Before class: Read the unit primer first. Nearest neighbour keeps every example and answers with the species of the closest one; the distance is Pythagoras on bill and flipper length (`** 2` squares, `** 0.5` is the square root). `nearest()` is Data detective's "smallest so far" pattern (the bug task uses `>`, finding the furthest penguin). A big distance means nothing similar is known, so the guess is weak, but the model still answers: the "Not sure" task and the optional last lesson come back to this. The info question raises scale: flippers (around 200) outweigh bills (around 45) in the distance. -->

---

## Why it matters

> Music apps suggest songs like the ones you play; shops suggest things bought by people like you. Many of these start from one idea: find the closest match.

<!-- Speaker note: Instead of writing rules, let the **data** decide. To guess a mystery penguin's species, find the penguin in the data whose measurements are **closest**, and give its species. This is called **nearest neighbour**, and it is a real machine-learning method. Closeness is a **distance**: with bill and flipper length as the two sides of a right-angled triangle, Pythagoras gives the distance between two penguins (`** 2` squares a number, `** 0.5` takes the square root). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


print(distance({"bill": 40, "flipper": 190}, {"bill": 43, "flipper": 194}))
```

**What does it print?**

- 1.0
- 5.0
- 7
- 25

<!-- Speaker note: What happens: 5.0. The differences are 3 and 4; 3 squared plus 4 squared is 25, and the square root of 25 is 5.0. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the right-angled triangle with sides 3 and 4. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 5.0. The differences are 3 and 4; 3 squared plus 4 squared is 25, and the square root of 25 is 5.0.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/ml/ml-nearest/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/ml/ml-nearest/?full=step-2#step-2)

<!-- Speaker note: Run it, then change the mystery penguin's measurements and run again: try `38, 185`, `50, 196` and `45, 205`. Which is the hardest to guess, and why? Students should be able to say: I tried a few mystery penguins, and can explain how nearest() finds the closest one. -->

<!-- Speaker note: Teacher: plot three penguins and the mystery on a sketch graph (bill across, flipper up). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: Nearest neighbour keeps every example and answers with the closest one; the distance says how alike two penguins are, so a small distance means a confident guess. -->

<!-- Speaker note: Teacher: ask which guess students would bet on, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where the learning is

**Where is the "learning" in this model?**

- nearest() changes its own code
- The examples are the knowledge: it answers from the penguins it has seen, not from rules someone wrote
- The distance function learns
- There is none

* Answer: The examples are the knowledge: it answers from the penguins it has seen, not from rules someone wrote

<!-- Speaker note: Nearest neighbour learns by remembering. Give it different examples and it gives different answers, with no rules changed. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How sure?

**A mystery penguin's nearest match is 0.2 away; another's is 10 away. Which guess would you trust more, and why?**

- The 10 one: it is further from mistakes
- The 0.2 one: a penguin in the data is almost exactly like it
- Both the same: the model always gives an answer
- Neither: distance does not matter

* Answer: The 0.2 one: a penguin in the data is almost exactly like it

<!-- Speaker note: A small distance means a very similar penguin is known. A big one means nothing in the data is like it, so the guess is weak, even though the model still answers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 16

<!-- Speaker note: > keeps the biggest distance so far, which finds the furthest penguin. < keeps the smallest: the nearest. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Ask for the measurements:** Ask for the bill and flipper length with `input()`.
- **Not sure:** When the nearest penguin is more than 10 away, print `Not sure` instead of a guess.

[Open this step](https://tutorials.learningwaypoints.com/code/ml/ml-nearest/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A model is more useful when it asks for its input and says how sure it is. Hints, in order: Replace the mystery line: bill = float(input("Bill length (mm)? ")), the same for flipper, then mystery = {"bill": bill, "flipper": flipper}. / If distance(match, mystery) > 10, print Not sure instead of the guess. For students who need more support: Give students the Not sure if, and ask them only to choose the number. For early finishers: Make the three nearest penguins vote (sort by distance with sorted(penguins, key=lambda p: distance(p, mystery))[:3]). The hard part, on purpose: The smallest-so-far loop inside nearest(). Ask students to trace it for three penguins on paper before they fix the bug. When students get stuck: The guess is always the same species. Ask: Does nearest() compare with < and update best? Fix: if distance(p, new) < distance(best, new): best = p. / TypeError: unsupported operand type(s) for -: 'str' and 'float'. Ask: Was the typed answer turned into a number? Fix: float(input(...)). / Distance 0.0 for a mystery penguin. Ask: Is that penguin's exact measurement in the data? Fix: Nothing is wrong; it matched a real penguin exactly. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: five mystery penguins

Guess the species of each of the five mystery penguins, and print each guess with its distance. Which guess would you not trust?

[Open this step](https://tutorials.learningwaypoints.com/code/ml/ml-nearest/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: use the model on many new examples and read its answers critically. -->

<!-- Speaker note: Teacher: discuss the 60, 240 penguin: what is wrong with its guess? -->

---

## Where this leads

How good is this model really? Testing it on penguins it already knows would be cheating: that is the next lesson.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**How does a nearest-neighbour model guess a new penguin's species?**

* It finds the penguin in its data with the closest measurements and gives that penguin's species.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson tests the model fairly, on penguins it has not seen. scikit-learn's KNeighborsClassifier (Lesson 4) is this model. -->
