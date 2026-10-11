---
order: 2
unit: first
introduces: [tuple-assign]
title: More inputs, more outputs
summary: "A movie-night calculator with sliders, a dropdown and two outputs: each input is a parameter, each output a returned value, all in order."
language: python
hook: "Booking sites, calculators and quizzes are the same shape: some inputs go in, a function works something out, some outputs come back."
---
Real apps ask for several things and show several answers. In Gradio each **input** is one parameter of the function, and each **output** is one value it returns, separated by commas. Both lists go **in order**.

## Predict

```step
stage: predict
code: app.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["8, then 5", "(8, 5)", "8 only", "An error: a function returns one value"]
  actual: "8, then 5. return n * 2, n + 1 gives back two values, and doubled, plus_one = ... puts the first in doubled and the second in plus_one."
```

`return a, b` gives back two values at once. `x, y = ...` names them, in order.

## Run

```step
stage: run
code: app.py#run
try: { playground: python, starter: "app.py#run", height: 560 }
check: { type: reflect, text: "I can point to the parameter for each input and the returned value for each output." }
```

Run it: move the sliders, choose a day, press **Submit**. Try 2 adults and 3 children on a weekend.

## Investigate

```step
stage: investigate
code: app.py#run
insight: "Inputs line up with parameters and outputs with returned values, in order; each kind of component gives the function a different kind of value."
tasks:
  - check:
      type: match
      q: "Match each input with what it gives the function."
      pairs:
        - ["gr.Slider(0, 10, step=1)", "a number, such as 3"]
        - ["gr.Dropdown([\"Weekday\", \"Weekend\"])", "the chosen text, such as \"Weekend\""]
        - ["gr.Checkbox()", "True or False"]
        - ["gr.Textbox()", "whatever was typed, as text"]
  - check:
      type: question
      q: "Why does the summary use str(int(adults))?"
      options: ["A slider can give 2.0; int makes it 2, and str makes it text to join", "Gradio needs int and str", "adults is a list", "To round the price"]
      answer: 0
      explain: "Gradio sliders can give decimal numbers, such as 2.0. int() drops the .0, and str() turns the number into text so + can join it."
  - check:
      type: bug
      code: app.py#bug
      text: "The total appears, but the Summary box stays empty. Click the line that is wrong."
      answer: 6
      fault: logic
      misconception: return-missing-value
      explain: "summary is worked out but never returned. Two outputs need two values: return total, summary."
```

### What each input gives

A kind of value for each kind of input.

### Tidy numbers

Why `int()` then `str()`.

### Spot the bug

An output with nothing to show.

## Modify

```step
stage: modify
insight: "A new input is a component and a parameter, in the same place in each list; the function then uses it."
try: { playground: python, starter: "app.py#run", height: 560 }
tasks:
  - hint:
      - "Add gr.Checkbox(label=\"Popcorn ($8)\") at the end of inputs, and popcorn at the end of the parameters."
      - "if popcorn: total = total + 8"
    check: { type: code, text: "Add a popcorn checkbox that adds $8 to the total.", rules: { contains: ["gr.Checkbox(", "if popcorn"] } }
  - hint: "gr.Radio([\"Standard\", \"Recliner\"], value=\"Standard\", label=\"Seat\"), a seat parameter, and $5 more per person for a recliner."
    check: { type: code, text: "Add a choice of seat (Standard or Recliner, $5 more per person) with a Radio.", rules: { contains: ["gr.Radio("] } }
```

### Popcorn

Add a **Popcorn ($8)** checkbox that adds $8 to the total.

### Seats

Add a **Radio** choice of seat: Standard, or Recliner for $5 more per person.

## Make: your own calculator

```step
stage: make
insight: "Goals only: plan the inputs and outputs, write and test the function, then wrap it."
try: { playground: python, starter: "app.py#make", height: 560 }
check: { type: code, text: "Make a calculator app with at least three inputs of different kinds and two outputs.", rules: { contains: ["gr.Interface(", "outputs=["], defs: 1 } }
```

Make a calculator of your own with at least **three inputs of different kinds** and **two outputs**: a pizza planner, a sports-day points tally, pocket money savings, a recipe scaler. Write down the inputs and outputs first.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A friend's ticket app gives the wrong price when they choose Weekend. Where do you look first?"
  options: ["The function: call it with print, such as price(2, 3, \"Weekend\"), and check the answer", "The Dropdown's colours", "Gradio's settings", "The Submit button"]
  answer: 0
  explain: "The app only shows what the function returns. Test the function on its own with the same inputs, and the bug is usually there."
```

Next: a quiz app, where the inputs are made from a list of questions.
