---
title: "What models get wrong"
subtitle: "Machine learning with Gradio · Real tools · Lesson 6"
---

# What models get wrong

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Models in the news make mistakes that matter: missing people, wrong answers said confidently. Knowing how they fail is part of building them.


:::teacher-note

**In one sentence:** An optional lesson. Students find where the penguin model fails (an unseen species, impossible measurements, confident wrong answers), add a "not like any penguin" check with kneighbors, test harder questions (sex, island), and write a model card.

**Students should be able to say:** I can explain why a model always answers from the classes it knows. I can tell confidence apart from being right. I can write a model card that says what a model cannot do.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The model was trained on Adelie, Chinstrap and Gentoo penguins only. What can it possibly answer?

```python
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])

emperor = pd.DataFrame([[80.0, 350.0]], columns=columns)
print(model.predict(emperor)[0])
```

:::keep-together

**An emperor penguin (much bigger, and a species not in the data) is measured. What does the model say?**

☐ I do not know

☐ One of the three species it knows

☐ Emperor

☐ An error

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Gentoo. The model can only choose between Adelie, Chinstrap and Gentoo, so it picks the closest, even for a penguin unlike any it has seen.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])

mysteries = pd.DataFrame([[39.0, 190.0], [48.0, 195.0], [80.0, 350.0], [20.0, 120.0]], columns=columns)
guesses = model.predict(mysteries)
chances = model.predict_proba(mysteries)
for i in range(len(guesses)):
    print(str(list(mysteries.iloc[i])) + ": " + guesses[i] + ", " + str(round(max(chances[i]) * 100)) + "% sure")
```

:::keep-together

### Sure but wrong

**Why is the model 100% sure about a penguin 20 mm long?**

☐ It checked very carefully

☐ Its 5 nearest penguins are all Adelie, though they are far away: the vote says nothing about distance

☐ Small penguins are always Adelie

☐ The data has penguins that small

:::


:::teacher-note

**Answer:** Its 5 nearest penguins are all Adelie, though they are far away: the vote says nothing about distance

The vote share only compares the neighbours with each other. Confidence is not the same as being right.

:::


:::keep-together

### Where the data came from

**All the penguins come from three islands near one research station, from 2007 to 2009. What follows?**

☐ Nothing

☐ The model may do worse on penguins from other places or years, which it has never seen

☐ It only works on those three islands' rocks

☐ It works for every penguin in the world

:::


:::teacher-note

**Answer:** The model may do worse on penguins from other places or years, which it has never seen

A model knows the world its data came from. Who collected the data, where and when, decides what it can be trusted for.

:::


:::typical

## Modify


**Too far away.** Use `kneighbors` to find how far each mystery is from its nearest penguin, and say "not like any penguin in the data" instead of a guess when it is too far.

**Harder questions.** Test fairly how well bill and flipper length predict **species**, **sex** and **island**. Which is hardest, and why might that be?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Too far away:**

```python
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])

mysteries = pd.DataFrame([[39.0, 190.0], [48.0, 195.0], [80.0, 350.0], [20.0, 120.0]], columns=columns)
guesses = model.predict(mysteries)
chances = model.predict_proba(mysteries)
distances, places = model.kneighbors(mysteries)
for i in range(len(guesses)):
    if distances[i][0] > 10:
        print(str(list(mysteries.iloc[i])) + ": not like any penguin in the data")
    else:
        print(str(list(mysteries.iloc[i])) + ": " + guesses[i] + ", " + str(round(max(chances[i]) * 100)) + "% sure")
```

**Harder questions:**

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv").dropna()
for target in ["species", "sex", "island"]:
    X = penguins[["bill_length_mm", "flipper_length_mm"]]
    y = penguins[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
    model = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
    print(target + ": " + str(round(model.score(X_test, y_test) * 100)) + "%")
```

:::

:::


## Make: a model card

Write a **model card** for your app from the last lesson (in a comment at the top of the program, or on paper): what it predicts and from which measurements, where the data came from, its accuracy on a fair test, and three situations where it should not be trusted.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Where this leads

You have built models by hand, used a real library and put a model in an app. The same ideas (examples, fair tests, honest limits) are behind every machine-learning system, from Teachable Machine to large language models.

:::


## Exit ticket

:::keep-together

**Why can a model be 100% sure and still wrong?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Its confidence only compares the answers it knows (here, the votes of its nearest examples); it does not know when an input is unlike anything it has seen.

:::

