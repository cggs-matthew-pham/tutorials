---
marp: true
theme: default
html: true
---

# A model behind an app

Machine learning with Gradio · Real tools

<!-- Speaker note: Students put a 5-nearest-neighbour penguin model behind a Gradio app with sliders, show how sure it is with predict_proba, then add bill depth, answer "Not sure" below 80%, and build an app around a model of their own (sex or island). About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put the penguin model behind a Gradio app: sliders for the measurements, and the app says the species and how sure it is.

- I can put a trained model behind a Gradio app.
- I can explain what the vote share from predict_proba means.
- I can add an input to a model and its app, keeping every list in the same order.

<!-- Speaker note: Before class: Read the unit primer first. The model is trained on all 342 penguins (the method was tested fairly in Lesson 4; for use, a model should learn from all the data). The app's function turns the slider values into a one-row table with the training columns, then `predict` gives the species and `predict_proba` the share of the 5 neighbours voting for each species (the Predict works one out by hand). The bug task puts the numbers in the wrong order: the model reads by position, so it sees a 215 mm bill and answers wrongly without any error. In the Make, `penguins.dropna()` drops the penguins with no sex recorded. On a computer, `pip install gradio scikit-learn pandas` runs the same file; a teacher can host it as a Hugging Face Space (accounts need age 13+). -->

---

## Why it matters

> Apps that identify plants, birds or songs are a trained model with a simple app in front. You can make one.

<!-- Speaker note: A model is only useful if people can use it. Here the model is trained on **all** the penguins (testing was done last lesson), then a Gradio app (from Apps with Gradio, or Data detective's dashboard) asks for the measurements and shows the guess. `predict_proba` says how the 5 nearest penguins voted: if 3 of 5 are Chinstrap, it is 60% sure. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
neighbours = ["Gentoo", "Gentoo", "Chinstrap", "Gentoo", "Chinstrap"]
print(neighbours.count("Gentoo") / len(neighbours))
```

**What does it print?**

- 0.4
- Gentoo
- 3
- 0.6

<!-- Speaker note: What happens: 0.6. Three of the five neighbours are Gentoo, and 3 / 5 is 0.6. predict_proba gives these shares for each species. Take two or three predictions before anyone runs it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 0.6. Three of the five neighbours are Gentoo, and 3 / 5 is 0.6. predict_proba gives these shares for each species.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/ml/ml-app/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/ml/ml-app/?full=step-2#step-2)

<!-- Speaker note: Run it (scikit-learn takes a few seconds the first time). Move the sliders and press **Submit**. Find a penguin it is 100% sure about, and one it is not sure about. Students should be able to say: I found measurements where the app is very sure, and some where it is not. -->

<!-- Speaker note: Teacher: have students find the most and least certain measurements, and compare. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])


def identify(bill, flipper):
    mystery = pd.DataFrame([[bill, flipper]], columns=columns)
    species = model.predict(mystery)[0]
    sure = round(max(model.predict_proba(mystery)[0]) * 100)
    return species, str(sure) + "% of the 5 nearest penguins are " + species


gr.Interface(
    fn=identify,
    inputs=[
        gr.Slider(30, 60, value=45, step=0.5, label="Bill length (mm)"),
        gr.Slider(170, 235, value=200, step=1, label="Flipper length (mm)"),
    ],
    outputs=[gr.Textbox(label="Species"), gr.Textbox(label="How sure")],
    title="Penguin identifier",
).launch()
```

<!-- Speaker note: What this step is for: An app hides the model behind a function: the sliders become a table with the training columns, the model predicts, and the vote share says how sure it is. -->

<!-- Speaker note: Teacher: ask what a 60% answer should tell the user. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trained on everything

**Why is this model trained on all 342 penguins, with no test set?**

- It is a mistake
- Testing was done before; for real use, the model should learn from every example there is
- Testing is not needed for apps
- Gradio does not allow test sets

* Answer: Testing was done before; for real use, the model should learn from every example there is

<!-- Speaker note: Test fairly first to know how good the method is, then train the model you use on all the data, so it has the most to learn from. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sixty per cent

**The app says 60% for some measurements. What does that mean?**

- 3 of the 5 nearest penguins are that species: the measurements are between two species
- The guess is 60% finished
- The bill is 60% long
- It is right 60% of the time overall

* Answer: 3 of the 5 nearest penguins are that species: the measurements are between two species

<!-- Speaker note: It is the share of the vote. Measurements between two species get split votes, which is useful information for the user. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**A penguin with bill 47 and flipper 215 (very like a Gentoo) is identified as Chinstrap. Click the line that is wrong.**

```
 1  import gradio as gr
 2  import pandas as pd
 3  from sklearn.neighbors import KNeighborsClassifier
 4  
 5  penguins = pd.read_csv("penguins.csv")
 6  columns = ["bill_length_mm", "flipper_length_mm"]
 7  model = KNeighborsClassifier(n_neighbors=5)
 8  model.fit(penguins[columns], penguins["species"])
 9  
10  
11  def identify(bill, flipper):
12      mystery = pd.DataFrame([[flipper, bill]], columns=columns)
13      species = model.predict(mystery)[0]
14      sure = round(max(model.predict_proba(mystery)[0]) * 100)
15      return species, str(sure) + "% of the 5 nearest penguins are " + species
16  
17  
18  print(identify(47.0, 215.0))
```

* Answer: line 12

<!-- Speaker note: The numbers are given in the wrong order: [flipper, bill] under the names bill and flipper. The model reads by position, so it sees a 215 mm bill. It must be [bill, flipper], as in training. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Bill depth:** Add **bill depth** as a third measurement. Is the app surer now?
- **Honest answers:** When fewer than 80% of the neighbours agree, show `Not sure` instead of a species.

[Open this step](https://tutorials.learningwaypoints.com/code/ml/ml-app/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new input means a new column for training, a new parameter and a new slider, all in the same order. Hints, in order: Add "bill_depth_mm" to columns, a depth parameter to identify, and depth to the mystery row. / Add a third slider: gr.Slider(13, 22, value=17, step=0.1, label="Bill depth (mm)"). / If sure < 80, return "Not sure" as the species (and still show the vote). For students who need more support: Give students the third slider line, and ask them to add the column and the parameter. For early finishers: Show the three species' vote shares as a bar chart (gr.BarPlot with a small DataFrame), or add a Dropdown to choose the model (neighbours or tree). The hard part, on purpose: Keeping columns, parameters and sliders in the same order. Ask them to read the three lists side by side. When students get stuck: Predictions look wrong, with no error. Ask: Are the mystery's numbers in the same order as columns? Fix: [[bill, flipper]] for columns ["bill_length_mm", "flipper_length_mm"]. / ValueError: Input X contains NaN. Ask: Are there penguins with missing values in what you train on? Fix: penguins.dropna() before fitting. / TypeError: identify() takes 2 positional arguments but 3 were given. Ask: Is there a parameter for every slider? Fix: Add the parameter for the new slider, in the same order. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a model app of your own

Build an app around a model of your own: predict a penguin's **sex** or **island** from measurements you choose. (Some penguins have no sex recorded: `penguins.dropna()` leaves them out.) Test it first, as in Lesson 4, and put the accuracy in the app's title.

[Open this step](https://tutorials.learningwaypoints.com/code/ml/ml-app/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: choose what to predict and from what, train, and put it behind an app. -->

<!-- Speaker note: Teacher: insist on a fair test (Lesson 4) before the app, and the accuracy in the title. -->

---

## Where this leads

On a computer, this file runs in real Gradio (`pip install gradio scikit-learn pandas`), and a teacher can host it as a Hugging Face Space for the class to try.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the app say 60% sure for some penguins?**

* Only 3 of the 5 most similar penguins in the data are that species, so the measurements sit between two species.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The optional last lesson looks at what models get wrong. The micro:bit and the computer course trains a model on movement with Teachable Machine. -->
