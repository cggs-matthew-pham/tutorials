---
marp: true
theme: default
html: true
---

# A fair test

Machine learning with Gradio · Models by hand

<!-- Speaker note: Students split the penguins into training and test sets after shuffling, see nearest neighbour score 100% on its own training data and about 95% on new penguins, then train on less data, break results down by species and compare the Lesson 1 rules fairly. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** hold back some penguins to test on: a model tested on the data it learned from looks perfect, and only new data shows how good it really is.

- I can explain why a model must be tested on data it has not seen.
- I can split data into training and test sets, shuffling first.
- I can compare two models fairly on the same test set.

<!-- Speaker note: Before class: Read the unit primer first. The data file is in species order, so `random.shuffle` (with `random.seed(1)` for repeatable results) comes before the split; the Predict shows the problem with an unshuffled list. Slices: `penguins[:250]` is the first 250, `penguins[250:]` the other 92. Tested on its training penguins, nearest neighbour scores 100% (each penguin is its own nearest match, at distance 0); on the test penguins it scores 95%. The bug task tests on part of the training set. Lesson 1's rules score 93% on the same test set, nearly as good: simple models can be strong, and a fair test is what shows it. The per-species task shows Chinstrap is hardest (fewer examples, and similar to Adelie). Teacher: Info: discuss a real claim of model accuracy in the news. -->

---

## Why it matters

> If you saw the exam questions and answers beforehand, a perfect score would prove nothing. Models are the same.

<!-- Speaker note: How good is the nearest-neighbour model? To find out, it must be tested on penguins it has **not** seen. So the penguins are split: a **training** set the model learns from (its examples), and a **test** set kept back to check it. `penguins[:250]` is the first 250; `penguins[250:]` is the rest. The data file is in order of species, so it is **shuffled** first (`random.seed(1)` makes the shuffle the same every time). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
penguins = ["Adelie", "Adelie", "Chinstrap", "Gentoo", "Gentoo"]
train = penguins[:3]
test = penguins[3:]
print(test)
```

**What does it print?**

- ['Adelie', 'Adelie', 'Chinstrap']
- ['Chinstrap', 'Gentoo', 'Gentoo']
- An error
- ['Gentoo', 'Gentoo']

<!-- Speaker note: What happens: ['Gentoo', 'Gentoo']. [3:] is from place 3 to the end. The test set is all Gentoo, because the list was in order of species: a test with no Adelies tests nothing about them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write the five species on cards, split them without shuffling, then with. -->

<style scoped>pre, marp-pre { font-size: 0.61em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* ['Gentoo', 'Gentoo']. [3:] is from place 3 to the end. The test set is all Gentoo, because the list was in order of species: a test with no Adelies tests nothing about them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ml/ml-testing/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ml/ml-testing/?full=step-2#step-2)

<!-- Speaker note: Run it (it takes a moment: every test penguin is compared with all 250 training penguins). Compare the two scores. Then change `random.seed(1)` to another number and run again. Students should be able to say: I can explain why the model scores 100% on its own training penguins. -->

<!-- Speaker note: Teacher: ask why 100% should make you suspicious. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 37 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-testing/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A model must be tested on data it has not seen: on its training data it can just remember, so only the test set measures how well it will do on new penguins. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The perfect score

**Why is the score 100% on the training penguins?**

- Each penguin's nearest match is itself, at distance 0, so it always copies its own species
- The model was trained twice
- The training penguins are easier
- It is a lucky shuffle

* Answer: Each penguin's nearest match is itself, at distance 0, so it always copies its own species

<!-- Speaker note: Tested on its own examples, nearest neighbour finds the very same penguin. That says nothing about penguins it has never met. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why shuffle

**Why shuffle before splitting?**

- To hide the answers
- Shuffling makes the model learn faster
- The file is in order of species, so without a shuffle the test set would be nearly all one species
- Python needs it

* Answer: The file is in order of species, so without a shuffle the test set would be nearly all one species

<!-- Speaker note: A fair test has a mix like the real world. The Predict step showed what happens without a shuffle. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 9

<!-- Speaker note: penguins[:92] is part of the training set, so the model is tested on penguins it learned from. The test set must be the others: penguins[250:]. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Less to learn from:** Train on only **30** penguins. What happens to the test accuracy? Why?
- **Each species:** Show how many of each species in the test set were guessed right. Which species is hardest, and why might that be?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-testing/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Changing the training data changes the model; per-species results show where it struggles. Hints, in order: train = penguins[:30], and keep test = penguins[250:] so the test is the same. / Two dictionaries, right and total, keyed by species. For each test penguin, add 1 to total; if the guess is right, add 1 to right too. / Start a species at 0 the first time it turns up, as in Data detective's counting. For students who need more support: Give students the right and total dictionaries started, and ask them to add 1 in the right places. For early finishers: Run the test with five different seeds and average the scores (a simple form of cross-validation). The hard part, on purpose: Accepting that 100% is a bad sign. Ask why each training penguin finds itself, and let them explain it to a partner. When students get stuck: The test accuracy is 100%. Ask: Is any test penguin also in the training set? Fix: test = penguins[250:], with no overlap. / KeyError: 'Chinstrap' in the per-species task. Ask: Was the species started at 0 before adding 1? Fix: if s not in total: total[s] = 0 and right[s] = 0. / The program takes a few seconds. Ask: How many distances does it work out? Fix: Nothing is wrong; 92 test penguins times 250 training penguins is 23,000 distances. -->

<!-- Speaker note: Teacher: collect the 30-penguin results from the class: do different seeds change them? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: rules or neighbours?

Bring back the rules from Lesson 1 as `guess(bill, flipper)` and test them on the **same** test penguins as the nearest-neighbour model. Which wins? Is the difference big enough to matter?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-testing/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: test two models on the same test set, and compare them fairly. -->

---

## Where this leads

Next: the same model, the same split and the same test in a few lines of scikit-learn, the library real data scientists use.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a model need a test set it has never seen?**

* On data it learned from it can just remember the answers; only new data shows how well it will do on penguins it meets later.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: scikit-learn's train_test_split, fit and score do all of this in a few lines. -->
