---
title: "The same model in scikit-learn"
subtitle: "Machine learning with Gradio · Real tools · Lesson 4"
---

# The same model in scikit-learn

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Everything you built by hand has a name in scikit-learn, a library used in science, banks and hospitals. Now you know what it does inside.


:::teacher-note

**In one sentence:** Students rebuild nearest neighbour and the fair test with scikit-learn (train_test_split, fit, score, predict), match each line to their hand-built version, compare 5 neighbours and a decision tree, and search for the best measurements.

**Students should be able to say:** I can train and test a model with scikit-learn. I can explain what fit, score and predict do, from building them by hand. I can compare models and measurements fairly on the same test set.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The model is scored on `X_train` and `y_train`. What did you find last lesson about testing on training data?

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

:::keep-together

**What does it print?**

☐ About 0.94

☐ 0.5

☐ An error

☐ 1.0 (100%)

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 1.0. score(X_train, y_train) tests the model on the penguins it learned from, and with n_neighbors=1 each one finds itself, exactly as in the last lesson.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### By hand and by library

**Match each scikit-learn line with what you wrote by hand.**

A. nearest(): copy the closest penguin's species

B. accuracy(test, train): the share guessed right

C. keeping the training penguins as the examples

D. shuffle with a seed, then penguins[:250] and penguins[250:]

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `train_test_split(X, y, test_size=0.25, random_state=1)` | |
| `KNeighborsClassifier(n_neighbors=1)` | |
| `model.fit(X_train, y_train)` | |
| `model.score(X_test, y_test)` | |

:::


:::teacher-note

**Answer:** train_test_split(X, y, test_size=0.25, random_state=1) → D. shuffle with a seed, then penguins[:250] and penguins[250:]; KNeighborsClassifier(n_neighbors=1) → A. nearest(): copy the closest penguin's species; model.fit(X_train, y_train) → C. keeping the training penguins as the examples; model.score(X_test, y_test) → B. accuracy(test, train): the share guessed right

:::


:::keep-together

### The same columns

**Why is the mystery penguin made with columns=X.columns?**

☐ To make it print nicely

☐ It is not needed

☐ The model needs the same measurements, in the same order and with the same names, as it was trained on

☐ pandas needs a name for every table

:::


:::teacher-note

**Answer:** The model needs the same measurements, in the same order and with the same names, as it was trained on

The model learned from bill length then flipper length. A new example must be given the same way, or its numbers mean something else.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

It scores the model on X_train, the penguins it learned from. The test set, X_test and y_test, shows how good it really is.

:::


:::typical

## Modify


**Five neighbours.** Let the **5** nearest penguins vote instead of 1. Better, worse or the same?

**A decision tree.** A **decision tree** learns `if` rules from the data, like the ones you wrote in Lesson 1 but chosen by the computer. Train one on the same data and compare.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Five neighbours:**

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])
```

**A decision tree:**

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])

tree = DecisionTreeClassifier(max_depth=3, random_state=1)
tree.fit(X_train, y_train)
print("Decision tree: " + str(round(tree.score(X_test, y_test) * 100)) + "%")
```

:::

:::


## Make: the best measurements

Which measurements make the best model? Try at least three choices of columns (add `bill_depth_mm` and `body_mass_g`), test each one fairly with both models, and report the best. If one choice makes the neighbours model much **worse**, think about last lesson's question on bigger numbers.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

penguins = pd.read_csv("penguins.csv")

y = penguins["species"]
choices = [
    ["bill_length_mm", "flipper_length_mm"],
    ["bill_length_mm", "bill_depth_mm"],
    ["bill_length_mm", "bill_depth_mm", "flipper_length_mm"],
    ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"],
]
for columns in choices:
    X = penguins[columns]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
    knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
    tree = DecisionTreeClassifier(max_depth=3, random_state=1).fit(X_train, y_train)
    print(", ".join(columns) + ": neighbours " + str(round(knn.score(X_test, y_test) * 100)) + "%, tree " + str(round(tree.score(X_test, y_test) * 100)) + "%")
```

:::


:::wider

## Where this leads

Next: put the model behind a Gradio app, so anyone can use it.

:::


## Exit ticket

:::keep-together

**What does model.fit(X_train, y_train) do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It gives the model the training examples to learn from (for nearest neighbour, it keeps them to compare with later).

:::

