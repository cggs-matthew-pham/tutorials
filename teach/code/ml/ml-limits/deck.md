---
marp: true
theme: default
html: true
---

# What models get wrong

Machine learning with Gradio · Real tools

<!-- Speaker note: An optional lesson. Students find where the penguin model fails (an unseen species, impossible measurements, confident wrong answers), add a "not like any penguin" check with kneighbors, test harder questions (sex, island), and write a model card. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** find where the penguin model fails: a species it has never seen, impossible measurements and harder questions, and learn to say what a model cannot do.

- I can explain why a model always answers from the classes it knows.
- I can tell confidence apart from being right.
- I can write a model card that says what a model cannot do.

<!-- Speaker note: Before class: Optional: not needed for completing the course. A classifier can only choose between the classes in its training data, so an emperor penguin (not in the data) is called Gentoo; impossible measurements still get a 100%-sure answer, because the vote share compares neighbours with each other and ignores how far away they are. `model.kneighbors(...)` returns the distances, which the first Modify uses to refuse far-away inputs. A fair test shows species is easiest (88% here with this split), sex harder (73%) and island hardest (64%) from bill and flipper length alone. The data comes from three islands near Palmer Station, 2007 to 2009; a model knows only that world. The info question moves to a human context (a school using past records): be ready for discussion about fairness and human review. A model card is a short honest description used in industry. Teacher: Info: keep the discussion about the system, not about individual students. -->

---

## Why it matters

> Models in the news make mistakes that matter: missing people, wrong answers said confidently. Knowing how they fail is part of building them.

<!-- Speaker note: Optional. A model can only learn from the data it was given. This lesson tries the penguin model on things it was not built for, and finishes with a **model card**: a short, honest description of what a model does, how well, and what it cannot do. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**An emperor penguin (much bigger, and a species not in the data) is measured. What does the model say?**

- I do not know
- One of the three species it knows
- Emperor
- An error

<!-- Speaker note: What happens: Gentoo. The model can only choose between Adelie, Chinstrap and Gentoo, so it picks the closest, even for a penguin unlike any it has seen. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what answers the model can possibly give. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Gentoo. The model can only choose between Adelie, Chinstrap and Gentoo, so it picks the closest, even for a penguin unlike any it has seen.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ml/ml-limits/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ml/ml-limits/?full=step-2#step-2)

<!-- Speaker note: Run it. Two of the mystery penguins are ordinary; one is far too big and one far too small to be any of these species. Look at how sure the model is about each. Students should be able to say: I found a guess the model was 100% sure about that cannot be right. -->

<!-- Speaker note: Teacher: read the 100% sure answers aloud and ask who believes them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A model always answers from what it knows, and its confidence can be high even when it is wrong; people building models must say where it should not be used. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sure but wrong

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Why is the model 100% sure about a penguin 20 mm long?**

- It checked very carefully
- Its 5 nearest penguins are all Adelie, though they are far away: the vote says nothing about distance
- Small penguins are always Adelie
- The data has penguins that small

* Answer: Its 5 nearest penguins are all Adelie, though they are far away: the vote says nothing about distance

</div>
</div>

<!-- Speaker note: The vote share only compares the neighbours with each other. Confidence is not the same as being right. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where the data came from

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**All the penguins come from three islands near one research station, from 2007 to 2009. What follows?**

- Nothing
- The model may do worse on penguins from other places or years, which it has never seen
- It only works on those three islands' rocks
- It works for every penguin in the world

* Answer: The model may do worse on penguins from other places or years, which it has never seen

</div>
</div>

<!-- Speaker note: A model knows the world its data came from. Who collected the data, where and when, decides what it can be trusted for. -->

<style scoped>section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Too far away:** Use `kneighbors` to find how far each mystery is from its nearest penguin, and say "not like any penguin in the data" instead of a guess when it is too far.
- **Harder questions:** Test fairly how well bill and flipper length predict **species**, **sex** and **island**. Which is hardest, and why might that be?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ml/ml-limits/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A careful model says when a question is outside what it knows, and a fair test shows that some questions are harder than others. Hints, in order: distances, places = model.kneighbors(mysteries) gives each mystery's distances to its nearest penguins. / If distances[i][0] (the nearest) is more than 10, print that it is not like any penguin in the data. / pd.read_csv(...).dropna(), then loop over ["species", "sex", "island"] as y, with a fair test for each. For students who need more support: Give students the kneighbors line, and ask them to write the if. For early finishers: Find the island model's mistakes and explain them (some species live on more than one island). The hard part, on purpose: Separating confidence from correctness. Ask students to argue for and against trusting a 100% answer before they code the check. When students get stuck: ValueError: Input contains NaN when testing sex. Ask: Are there penguins with no sex recorded? Fix: pd.read_csv("penguins.csv").dropna(). / Every mystery says not like any penguin. Ask: How far is too far, and which distance is checked? Fix: distances[i][0] is the nearest; try a limit of about 10. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a model card

Write a **model card** for your app from the last lesson (in a comment at the top of the program, or on paper): what it predicts and from which measurements, where the data came from, its accuracy on a fair test, and three situations where it should not be trusted.

<!-- Speaker note: What this step is for: Goals only: describe a model honestly, so people know when to trust it. -->

<!-- Speaker note: Teacher: share model cards in pairs and challenge each other's limits. -->

---

## Where this leads

You have built models by hand, used a real library and put a model in an app. The same ideas (examples, fair tests, honest limits) are behind every machine-learning system, from Teachable Machine to large language models.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why can a model be 100% sure and still wrong?**

* Its confidence only compares the answers it knows (here, the votes of its nearest examples); it does not know when an input is unlike anything it has seen.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The micro:bit and the computer course trains Teachable Machine models; the same limits apply. Discuss large language models with the same three questions: what data, how tested, what it cannot do. -->
