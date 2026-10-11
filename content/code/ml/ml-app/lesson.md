---
order: 5
unit: tools
title: A model behind an app
summary: "Put the penguin model behind a Gradio app: sliders for the measurements, and the app says the species and how sure it is."
language: python
recipes: [import-from, import-module, dotted-call]
hook: "Apps that identify plants, birds or songs are a trained model with a simple app in front. You can make one."
---
A model is only useful if people can use it. Here the model is trained on **all** the penguins (testing was done last lesson), then a Gradio app (from Apps with Gradio, or Data detective's dashboard) asks for the measurements and shows the guess. `predict_proba` says how the 5 nearest penguins voted: if 3 of 5 are Chinstrap, it is 60% sure.

## Predict

```step
stage: predict
code: app.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["0.6", "3", "0.4", "Gentoo"]
  actual: "0.6. Three of the five neighbours are Gentoo, and 3 / 5 is 0.6. predict_proba gives these shares for each species."
```

`count` counts how many times something is in a list. What share of the five neighbours are Gentoo?

## Run

```step
stage: run
code: app.py#run
try: { playground: python, starter: "app.py#run", files: [../sets/penguins.csv], height: 600 }
check: { type: reflect, text: "I found measurements where the app is very sure, and some where it is not." }
```

Run it (scikit-learn takes a few seconds the first time). Move the sliders and press **Submit**. Find a penguin it is 100% sure about, and one it is not sure about.

## Investigate

```step
stage: investigate
code: app.py#run
insight: "An app hides the model behind a function: the sliders become a table with the training columns, the model predicts, and the vote share says how sure it is."
tasks:
  - check:
      type: question
      q: "Why is this model trained on all 342 penguins, with no test set?"
      options: ["Testing was done before; for real use, the model should learn from every example there is", "Gradio does not allow test sets", "It is a mistake", "Testing is not needed for apps"]
      answer: 0
      explain: "Test fairly first to know how good the method is, then train the model you use on all the data, so it has the most to learn from."
  - check:
      type: question
      q: "The app says 60% for some measurements. What does that mean?"
      options: ["3 of the 5 nearest penguins are that species: the measurements are between two species", "The guess is 60% finished", "It is right 60% of the time overall", "The bill is 60% long"]
      answer: 0
      explain: "It is the share of the vote. Measurements between two species get split votes, which is useful information for the user."
  - check:
      type: bug
      code: app.py#bug
      text: "A penguin with bill 47 and flipper 215 (very like a Gentoo) is identified as Chinstrap. Click the line that is wrong."
      answer: 12
      fault: logic
      misconception: feature-order
      explain: "The numbers are given in the wrong order: [flipper, bill] under the names bill and flipper. The model reads by position, so it sees a 215 mm bill. It must be [bill, flipper], as in training."
```

### Trained on everything

Why there is no test set here.

### Sixty per cent

What the vote share says.

### Spot the bug

Numbers in the wrong places.

## Modify

```step
stage: modify
insight: "A new input means a new column for training, a new parameter and a new slider, all in the same order."
try: { playground: python, starter: "app.py#run", files: [../sets/penguins.csv], height: 600 }
tasks:
  - hint:
      - "Add \"bill_depth_mm\" to columns, a depth parameter to identify, and depth to the mystery row."
      - "Add a third slider: gr.Slider(13, 22, value=17, step=0.1, label=\"Bill depth (mm)\")."
    check: { type: code, text: "Add bill depth as a third measurement: in the model, the function and a slider.", rules: { contains: ["bill_depth_mm", "depth"] } }
  - hint: "If sure < 80, return \"Not sure\" as the species (and still show the vote)."
    check: { type: code, text: "Say Not sure when fewer than 80% of the neighbours agree.", rules: { contains: ["Not sure"] } }
```

### Bill depth

Add **bill depth** as a third measurement. Is the app surer now?

### Honest answers

When fewer than 80% of the neighbours agree, show `Not sure` instead of a species.

## Make: a model app of your own

```step
stage: make
insight: "Goals only: choose what to predict and from what, train, and put it behind an app."
try: { playground: python, starter: "app.py#make", files: [../sets/penguins.csv], height: 600 }
check: { type: code, text: "Build an app around a model of your own: choose what it predicts and from which measurements.", rules: { contains: ["fit(", "gr.Interface("] } }
```

Build an app around a model of your own: predict a penguin's **sex** or **island** from measurements you choose. (Some penguins have no sex recorded: `penguins.dropna()` leaves them out.) Test it first, as in Lesson 4, and put the accuracy in the app's title.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your app is 94% accurate. A user tries a penguin species that is not in the data. What happens?"
  options: ["It still names one of the three species it knows, possibly 100% sure", "It says it does not know", "It crashes", "It learns the new species"]
  answer: 0
  explain: "A model can only choose between the answers it was trained on. The optional last lesson looks at this and other limits."
```

On a computer, this file runs in real Gradio (`pip install gradio scikit-learn pandas`), and a teacher can host it as a Hugging Face Space for the class to try.
