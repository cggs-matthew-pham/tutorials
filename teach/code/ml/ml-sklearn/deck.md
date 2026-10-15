---
marp: true
theme: default
html: true
---

# The same model in scikit-learn

Machine learning with Gradio · Real tools

<!-- Speaker note: Students rebuild nearest neighbour and the fair test with scikit-learn (train_test_split, fit, score, predict), match each line to their hand-built version, compare 5 neighbours and a decision tree, and search for the best measurements. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build the nearest-neighbour model and the fair test again with scikit-learn, the library data scientists use, then compare it with a decision tree.

- I can train and test a model with scikit-learn.
- I can explain what fit, score and predict do, from building them by hand.
- I can compare models and measurements fairly on the same test set.

<!-- Speaker note: Before class: Read the unit primer first. scikit-learn loads the first time a program imports it (several seconds; about 19 MB, cached by the browser afterwards). `X` is a pandas table of measurements and `y` the species; `train_test_split(..., random_state=1)` shuffles and splits; `fit` stores the training examples (for nearest neighbour) or learns rules (for a tree); `score` is accuracy on the given data (the bug task scores on training data: 100%); `predict` needs a table with the same columns. Results: 94% test accuracy with 1 neighbour, 93% with 5, 93% for a tree of depth 3. In the Make, adding body mass drops nearest neighbour to about 70% (grams swamp the distance) while the tree reaches 97%: a real lesson about scale, which the info question explains. -->

---

## Why it matters

> Everything you built by hand has a name in scikit-learn, a library used in science, banks and hospitals. Now you know what it does inside.

<!-- Speaker note: **scikit-learn** is a Python library of machine-learning models. It does in a few lines what you wrote by hand: `train_test_split` shuffles and splits, `KNeighborsClassifier(n_neighbors=1)` is your nearest-neighbour model, `fit` gives it the training examples, `score` tests it, and `predict` guesses a new penguin. The data is read with pandas (from Data detective): `X` is the measurements and `y` is the answers. It takes several seconds to load the first time. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print(model.score(X_train, y_train))
```

**What does it print?**

- About 0.94
- 0.5
- An error
- 1.0 (100%)

<!-- Speaker note: What happens: 1.0. score(X_train, y_train) tests the model on the penguins it learned from, and with n_neighbors=1 each one finds itself, exactly as in the last lesson. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what score on the training data means, from last lesson. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 1.0. score(X_train, y_train) tests the model on the penguins it learned from, and with n_neighbors=1 each one finds itself, exactly as in the last lesson.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ml/ml-sklearn/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ml/ml-sklearn/?full=step-2#step-2)

<!-- Speaker note: Run it (wait for scikit-learn to load). Then change the mystery penguin's measurements and run again. Students should be able to say: I can match each line with the part I wrote by hand in the last two lessons. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])
```

<!-- Speaker note: What this step is for: scikit-learn's split, fit, score and predict are the steps you built by hand; knowing them makes the library's answers something you can check, not magic. -->

<!-- Speaker note: Teacher: do the match as a class, pointing at last lesson's code. -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## By hand and by library

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])
```

</div>
<div>

**Match each scikit-learn line with what you wrote by hand.**

| | |
|---|---|
| `train_test_split(X, y, test_size=0.25, random_state=1)` | A. nearest(): copy the closest penguin's species |
| `KNeighborsClassifier(n_neighbors=1)` | B. accuracy(test, train): the share guessed right |
| `model.fit(X_train, y_train)` | C. keeping the training penguins as the examples |
| `model.score(X_test, y_test)` | D. shuffle with a seed, then penguins[:250] and penguins[250:] |

* Answer: train_test_split(X, y, test_size=0.25, random_state=1) → D. shuffle with a seed, then penguins[:250] and penguins[250:]; KNeighborsClassifier(n_neighbors=1) → A. nearest(): copy the closest penguin's species; model.fit(X_train, y_train) → C. keeping the training penguins as the examples; model.score(X_test, y_test) → B. accuracy(test, train): the share guessed right

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The same columns

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])
```

</div>
<div>

**Why is the mystery penguin made with columns=X.columns?**

- To make it print nicely
- It is not needed
- The model needs the same measurements, in the same order and with the same names, as it was trained on
- pandas needs a name for every table

* Answer: The model needs the same measurements, in the same order and with the same names, as it was trained on

</div>
</div>

<!-- Speaker note: The model learned from bill length then flipper length. A new example must be given the same way, or its numbers mean something else. -->

<style scoped>section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This says the model is 100% accurate. Click the line that is wrong.**

```
 1  import pandas as pd
 2  from sklearn.model_selection import train_test_split
 3  from sklearn.neighbors import KNeighborsClassifier
 4  
 5  penguins = pd.read_csv("penguins.csv")
 6  X = penguins[["bill_length_mm", "flipper_length_mm"]]
 7  y = penguins["species"]
 8  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
 9  
10  model = KNeighborsClassifier(n_neighbors=1)
11  model.fit(X_train, y_train)
12  print("Test accuracy: " + str(round(model.score(X_train, y_train) * 100)) + "%")
```

* Answer: line 12

<!-- Speaker note: It scores the model on X_train, the penguins it learned from. The test set, X_test and y_test, shows how good it really is. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Five neighbours:** Let the **5** nearest penguins vote instead of 1. Better, worse or the same?
- **A decision tree:** A **decision tree** learns `if` rules from the data, like the ones you wrote in Lesson 1 but chosen by the computer. Train one on the same data and compare.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-sklearn/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Models have settings, and different kinds of model learn differently; a fair test compares them. Hints, in order: Change n_neighbors=1 to n_neighbors=5: the 5 nearest penguins vote. / from sklearn.tree import DecisionTreeClassifier, then tree = DecisionTreeClassifier(max_depth=3, random_state=1). / fit it on the same training data and score it on the same test data. For students who need more support: Give students the DecisionTreeClassifier lines, and ask them only to score it on the test set. For early finishers: Add StandardScaler (from sklearn.preprocessing) before the neighbours model with make_pipeline, and see the body-mass result recover. The hard part, on purpose: Mapping library lines to their hand-built versions. Ask students to annotate each line with the lesson it came from before running. When students get stuck: ValueError: Expected 2D array, got 1D array instead. Ask: Is X a table (double square brackets) or one column? Fix: penguins[["bill_length_mm", "flipper_length_mm"]], with two pairs of brackets. / UserWarning: X does not have valid feature names. Ask: Was the mystery penguin made with columns=X.columns? Fix: pd.DataFrame([[47.0, 215.0]], columns=X.columns). / The program seems stuck when it starts. Ask: Is it the first run with scikit-learn? Fix: Wait: the library loads once, then runs are quick. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the best measurements

Which measurements make the best model? Try at least three choices of columns (add `bill_depth_mm` and `body_mass_g`), test each one fairly with both models, and report the best. If one choice makes the neighbours model much **worse**, think about last lesson's question on bigger numbers.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-sklearn/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: try different measurements, test each fairly, and explain what you find. -->

<!-- Speaker note: Teacher: collect the class's best combinations on the board. -->

---

## Where this leads

Next: put the model behind a Gradio app, so anyone can use it.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does model.fit(X_train, y_train) do?**

* It gives the model the training examples to learn from (for nearest neighbour, it keeps them to compare with later).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson puts the model behind a Gradio app. The decision tree's rules can be printed with sklearn.tree.export_text. -->
