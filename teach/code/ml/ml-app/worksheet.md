---
title: "A model behind an app"
subtitle: "Machine learning with Gradio · Real tools · Lesson 5"
---

# A model behind an app

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Apps that identify plants, birds or songs are a trained model with a simple app in front. You can make one.


:::teacher-note

**In one sentence:** Students put a 5-nearest-neighbour penguin model behind a Gradio app with sliders, show how sure it is with predict_proba, then add bill depth, answer "Not sure" below 80%, and build an app around a model of their own (sex or island).

**Students should be able to say:** I can put a trained model behind a Gradio app. I can explain what the vote share from predict_proba means. I can add an input to a model and its app, keeping every list in the same order.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`count` counts how many times something is in a list. What share of the five neighbours are Gentoo?

```python
neighbours = ["Gentoo", "Gentoo", "Chinstrap", "Gentoo", "Chinstrap"]
print(neighbours.count("Gentoo") / len(neighbours))
```

:::keep-together

**What does it print?**

☐ 0.4

☐ Gentoo

☐ 3

☐ 0.6

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 0.6. Three of the five neighbours are Gentoo, and 3 / 5 is 0.6. predict_proba gives these shares for each species.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Trained on everything

**Why is this model trained on all 342 penguins, with no test set?**

☐ It is a mistake

☐ Testing was done before; for real use, the model should learn from every example there is

☐ Testing is not needed for apps

☐ Gradio does not allow test sets

:::


:::teacher-note

**Answer:** Testing was done before; for real use, the model should learn from every example there is

Test fairly first to know how good the method is, then train the model you use on all the data, so it has the most to learn from.

:::


:::keep-together

### Sixty per cent

**The app says 60% for some measurements. What does that mean?**

☐ 3 of the 5 nearest penguins are that species: the measurements are between two species

☐ The guess is 60% finished

☐ The bill is 60% long

☐ It is right 60% of the time overall

:::


:::teacher-note

**Answer:** 3 of the 5 nearest penguins are that species: the measurements are between two species

It is the share of the vote. Measurements between two species get split votes, which is useful information for the user.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

The numbers are given in the wrong order: [flipper, bill] under the names bill and flipper. The model reads by position, so it sees a 215 mm bill. It must be [bill, flipper], as in training.

:::


:::typical

## Modify


**Bill depth.** Add **bill depth** as a third measurement. Is the app surer now?

**Honest answers.** When fewer than 80% of the neighbours agree, show `Not sure` instead of a species.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Bill depth:**

```python
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm", "bill_depth_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])


def identify(bill, flipper, depth):
    mystery = pd.DataFrame([[bill, flipper, depth]], columns=columns)
    species = model.predict(mystery)[0]
    sure = round(max(model.predict_proba(mystery)[0]) * 100)
    return species, str(sure) + "% of the 5 nearest penguins are " + species


gr.Interface(
    fn=identify,
    inputs=[
        gr.Slider(30, 60, value=45, step=0.5, label="Bill length (mm)"),
        gr.Slider(170, 235, value=200, step=1, label="Flipper length (mm)"),
        gr.Slider(13, 22, value=17, step=0.1, label="Bill depth (mm)"),
    ],
    outputs=[gr.Textbox(label="Species"), gr.Textbox(label="How sure")],
    title="Penguin identifier",
).launch()
```

**Honest answers:**

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
    if sure < 80:
        return "Not sure", str(sure) + "% of the 5 nearest penguins are " + species
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

:::

:::


## Make: a model app of your own

Build an app around a model of your own: predict a penguin's **sex** or **island** from measurements you choose. (Some penguins have no sex recorded: `penguins.dropna()` leaves them out.) Test it first, as in Lesson 4, and put the accuracy in the app's title.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")

known = penguins.dropna()
columns = ["bill_depth_mm", "body_mass_g"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(known[columns], known["sex"])


def guess_sex(depth, mass):
    mystery = pd.DataFrame([[depth, mass]], columns=columns)
    return model.predict(mystery)[0]


gr.Interface(
    fn=guess_sex,
    inputs=[gr.Slider(13, 22, value=17, step=0.1, label="Bill depth (mm)"), gr.Slider(2700, 6300, value=4200, step=50, label="Body mass (g)")],
    outputs=gr.Textbox(label="Male or female?"),
    title="Penguin sex guesser",
).launch()
```

:::


:::wider

## Where this leads

On a computer, this file runs in real Gradio (`pip install gradio scikit-learn pandas`), and a teacher can host it as a Hugging Face Space for the class to try.

:::


## Exit ticket

:::keep-together

**Why does the app say 60% sure for some penguins?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Only 3 of the 5 most similar penguins in the data are that species, so the measurements sit between two species.

:::

