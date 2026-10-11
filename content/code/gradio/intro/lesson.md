---
order: 1
unit: first
title: Your first app
summary: Turn a Python function into an app you can click, in an in-browser stand-in for Gradio that runs the same code as the real thing.
language: python
recipes: [import-module, dotted-call]
hook: "Behind most tools you use online is a small function with an interface wrapped around it. You can make one in a few lines."
app:
  # The whole site is served: the Python playground loads Pyodide from ../_pyodide/. (_playground-py names the playground for the clip cache.)
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist\" 8123 _playground-py"
  url: "http://127.0.0.1:8123/_playground-py/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@app.py#run" }
  caption: "Gradio calls the function with the inputs, and shows what it returns"
  say: "Gradio calls the function with the inputs, and shows what it returns."
  clip:
    - caption:
        text: "gr.Interface wraps greet: two inputs, one output."
        say: "g r dot Interface wraps greet: two inputs, and one output."
    - click: Run
    - type: { selector: ".gr input[type=text]", text: "Ada" }
    - click: { selector: ".gr input[type=checkbox]" }
    - caption:
        text: "Submit calls greet(\"Ada\", True), in the order the inputs are listed."
        say: "Submit calls greet, with Ada and True, in the order the inputs are listed."
    - click: Submit
    - expect: { selector: "#app-body", contains: "Hello, Ada!!!" }
    - wait: 2000
---
**Gradio** is a Python library that turns a function into an app: you say what the inputs and outputs are, and it draws the boxes and the button. The playground runs a small stand-in for Gradio, so it works in the browser; the same file runs unchanged in real Gradio on a computer.

## Predict

```step
stage: predict
code: app.py#predict
check:
  type: predict
  q: "What does the second line print?"
  options: ["Hello, Ada!!!", "Hello, Ada.", "Hello, Ada", "True"]
  actual: "Hello, Ada!!!. excited is True, so the function returns the message with three !s. The others print Hello, Ada. and Hello, !!!"
```

Before any app, it is just a function. Work out what each of the three calls prints.

## Run

```step
stage: run
code: app.py#run
try: { playground: python, starter: "app.py#run", height: 520 }
check: { type: reflect, text: "I tried the three calls from the Predict step in the app, and they matched what greet returns." }
unlocks: [an-app-with-gradio]
```

Run it. The app opens in the **App** tab: type a name, tick or untick **Excited?**, and press **Submit**. Try the three calls from the Predict step.

## Investigate

```step
stage: investigate
code: app.py#run
insight: "An app is a function plus a list of inputs and outputs; Gradio passes the inputs to the parameters in order, and shows each returned value in an output."
tasks:
  - check:
      type: question
      q: "fn=greet has no brackets after greet. Why?"
      options: ["It hands Gradio the function itself, to call later when Submit is pressed", "It is a mistake, but Gradio fixes it", "Brackets are not allowed inside gr.Interface", "greet has no parameters"]
      answer: 0
      explain: "greet() would call it straight away. fn=greet gives Gradio the function, and Gradio calls it each time someone presses Submit."
  - check:
      type: question
      q: "What does the Checkbox give greet when it is ticked?"
      options: ["True", "\"Excited?\"", "\"ticked\"", "1"]
      answer: 0
      explain: "A Checkbox gives True or False, which is what if excited: needs."
  - check:
      type: bug
      code: app.py#bug
      text: "Typing Ada and pressing Submit gives TypeError: can only concatenate str (not \"bool\") to str. Click the line that is wrong."
      answer: 12
      fault: runtime
      misconception: inputs-order
      explain: "Gradio passes inputs in order: the Checkbox (True or False) goes to name, and the text goes to excited. The inputs must be in the same order as the parameters."
```

### No brackets

What `fn=greet` hands over.

### A tick box

What a Checkbox gives.

### Spot the bug

Inputs in the wrong order.

## Modify

```step
stage: modify
insight: "An input is a component in inputs and a parameter of the function; an output is a component in outputs and a value the function returns."
try: { playground: python, starter: "app.py#run", height: 520 }
tasks:
  - hint:
      - "Swap the Checkbox for gr.Slider(1, 5, step=1, label=\"Excitement\")."
      - "def greet(name, excitement): return \"Hello, \" + name + \"!\" * excitement"
    check: { type: code, text: "Replace the checkbox with a slider that chooses how many ! to add.", rules: { contains: ["gr.Slider("] } }
  - hint:
      - "outputs=[gr.Textbox(label=\"Greeting\"), gr.Textbox(label=\"Name length\")]"
      - "Return two values, separated by a comma: return message + \".\", str(len(name)) + \" letters\""
    check: { type: code, text: "Add a second output that says how many letters the name has.", rules: { contains: ["len(name)"] } }
```

### How excited?

Replace the checkbox with a **slider** from 1 to 5 that sets how many `!` the greeting ends with.

### A second output

Add a second output box that says how many letters the name has. A function gives two outputs by returning two values with a comma between them.

## Make: a tiny tool

```step
stage: make
insight: "Goals only: write and test the function first, then wrap it in an app."
try: { playground: python, starter: "app.py#make", height: 520 }
check: { type: code, text: "Make an app of your own: a function, tested with print, wrapped in gr.Interface.", rules: { contains: ["gr.Interface(", ".launch()"], defs: 1 } }
```

Build a small tool of your own. Write the function first and test it with `print`, then wrap it in `gr.Interface`. Ideas: initials from a full name, a word counter, a shout converter (upper case and `!`), a "how many days until" counter.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Why test the function with print before making the app?"
  options: ["If it is wrong, you find out from one line, before buttons and boxes are in the way", "Gradio needs print first", "The app runs faster", "print saves the function"]
  answer: 0
  explain: "The app only calls your function. A tested function makes a working app; an untested one makes an app that is hard to debug."
```

On a computer, `pip install gradio` and `python app.py` run this same file as a real web app at `http://127.0.0.1:7860`. Next: apps with several inputs and outputs.
