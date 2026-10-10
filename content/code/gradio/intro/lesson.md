---
order: 1
title: Intro to Gradio
summary: Turn a Python function into a web app you can click, in five short PRIMM steps.
language: python
app:
  command: python app.py
  url: http://127.0.0.1:7860
  ready: Name
hook: "Behind most tools you use online is a small function with an interface wrapped around it. You can make one in a few lines."
teachers: |
  **Where it leads:** simple apps and demos, APIs, and a first look at how machine-learning models are shared.

  **Class ideas:** a converter for a science practical; a class quiz; a tool that solves a maths problem type your students struggle with.

  **Watch for:** the function returning a value versus printing it; inputs and outputs getting out of order; skipping the test-the-function-first step.

  **Run it:** needs Python and `pip install -r requirements.txt` where the app is run, so it is best demonstrated on a teacher machine.
---

By the end of this lesson you will have run a small web app built from one Python
function, worked out which lines of code create which parts of the screen, and changed
the app to do something new.

The lesson follows **PRIMM**: you *Predict* before you run, then *Run*, *Investigate*,
*Modify*, and finally *Make* something of your own.

## Predict: what will `greet` return?

```step
stage: predict
code: app.py#greet
app: true
reveal: true
caption: Predict first, then reveal the result
clip:
  - caption: Name is "Ada" and Excited? is ticked
  - type: { into: Name, text: Ada }
  - click: Excited?
  - click: Submit
  - expect: { field: Greeting, value: "Hello, Ada!!!" }
  - caption: The function returned the excited greeting
```

Read the function below. **Do not run anything yet.**

Write down what `greet` returns for each call:

1. `greet("Ada", False)`
2. `greet("Ada", True)`
3. `greet("", True)`

Which of these did you find hardest to predict, and why?

## Run: start the app

```step
stage: run
code: app.py#launch
app: false
caption: Run the file, then open the local address
clip:
  - caption: Run "python app.py" and open the local address
  - run: true
  - caption: Try a name, then press Submit
  - type: { into: Name, text: Ada }
  - click: Submit
  - expect: { field: Greeting, value: "Hello, Ada." }
```

Install Gradio and run the file:

```bash
pip install gradio
python app.py
```

Open the address that appears in your terminal (usually `http://127.0.0.1:7860`).

- Try the three calls from the Predict step. Were your predictions right?
- Which prediction did you get wrong, and what did that teach you about the code?

## Investigate: link the code to the screen

```step
stage: investigate
code: app.py#interface
app: true
caption: Every part of the screen comes from a line of code
clip:
  - caption: Without the checkbox ticked
  - type: { into: Name, text: Ada }
  - click: Submit
  - expect: { field: Greeting, value: "Hello, Ada." }
  - caption: Now tick the checkbox
  - click: Excited?
  - click: Submit
  - expect: { field: Greeting, value: "Hello, Ada!!!" }
```

Look at the `gr.Interface(...)` call and answer, in your own words:

1. Which line creates the **Name** box? Which creates the **checkbox**?
2. `inputs` has two items and `greet` has two parameters. How does Gradio know which
   input goes to which parameter?
3. What does `fn=greet` (with no brackets) tell Gradio to do?

Test your answer to question 2: swap the two items in `inputs`, run the app, and see
what changes.

## Modify: change the behaviour

```step
stage: modify
```

Make **one** change at a time, run it, and check it did what you expected.

1. Change the greeting so excited names end in `"!!! 🎉"`.
2. Change the box label from `"Name"` to `"Your name"`. What else do you need to keep
   in sync?
3. Add a third input, such as a number box `gr.Number(label="Times")`, and make `greet`
   repeat the greeting that many times.

## Make: build your own

```step
stage: make
```

Build a new app from scratch, using `greet` as your model. Pick one:

- **Unit converter:** inputs for a number and a unit, output the converted value.
- **Word counter:** one text input, output the number of words.
- **Quiz question:** show a question, check whether the typed answer is correct.

Write the function first and test it by calling it directly. Only then wrap it in
`gr.Interface`.
