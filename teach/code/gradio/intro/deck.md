---
marp: true
theme: default
html: true
---

# Your first app

Apps with Gradio · First apps

<!-- Speaker note: Students turn a greeting function into a Gradio app with a Textbox and a Checkbox, see that Gradio passes inputs to parameters in order, then add a slider and a second output, and make a small tool of their own. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** turn a Python function into an app you can click, in an in-browser stand-in for Gradio that runs the same code as the real thing.

- I can turn a function into an app with gr.Interface, inputs and outputs.
- I can explain how Gradio matches inputs to parameters (in order).
- I can add an input or an output and change the function to match.

<!-- Speaker note: Before class: Read the unit primer first. This course runs in the **Python playground** (real Python in the browser, Pyodide) with a small **stand-in for Gradio** (Textbox, Number, Slider, Dropdown, Radio, Checkbox, Dataframe, BarPlot and `gr.Interface`), written so the same file runs unchanged in real Gradio. To show the real thing, on a teacher computer: `pip install -r requirements.txt` (in this lesson's folder of the site's source) or `pip install gradio`, then `python app.py`, and open `http://127.0.0.1:7860`; a teacher can also host an app as a Hugging Face Space (accounts need age 13+). Before teaching it, open the site's Check your school page once on a student device at school. `fn=greet` hands Gradio the function (no brackets); Gradio calls it on Submit with one argument per input **in order**, and shows each returned value in an output, in order (the bug task swaps the inputs). A Checkbox gives True or False; a Slider gives a number. Two outputs means returning two values with a comma. -->

---

## Why it matters

> Behind most tools you use online is a small function with an interface wrapped around it. You can make one in a few lines.

<!-- Speaker note: **Gradio** is a Python library that turns a function into an app: you say what the inputs and outputs are, and it draws the boxes and the button. The playground runs a small stand-in for Gradio, so it works in the browser; the same file runs unchanged in real Gradio on a computer. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


print(greet("Ada", False))
print(greet("Ada", True))
print(greet("", True))
```

**What does the second line print?**

- Hello, Ada
- True
- Hello, Ada.
- Hello, Ada!!!

<!-- Speaker note: What happens: Hello, Ada!!!. excited is True, so the function returns the message with three !s. The others print Hello, Ada. and Hello, !!! Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: call greet three times on the board before anyone sees an app. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Hello, Ada!!!. excited is True, so the function returns the message with three !s. The others print Hello, Ada. and Hello, !!!

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/gradio/intro/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/gradio/intro/?full=step-2#step-2)

<!-- Speaker note: Run it. The app opens in the **App** tab: type a name, tick or untick **Excited?**, and press **Submit**. Try the three calls from the Predict step. Students should be able to say: I tried the three calls from the Predict step in the app, and they matched what greet returns. -->

<!-- Speaker note: Teacher: ask which line made each part of the screen. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Checkbox(label="Excited?")],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
).launch()
```

<!-- Speaker note: What this step is for: An app is a function plus a list of inputs and outputs; Gradio passes the inputs to the parameters in order, and shows each returned value in an output. -->

<!-- Speaker note: Teacher: swap the inputs on purpose and read the error together. -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## No brackets

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Checkbox(label="Excited?")],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
).launch()
```

</div>
<div>

**fn=greet has no brackets after greet. Why?**

- It hands Gradio the function itself, to call later when Submit is pressed
- It is a mistake, but Gradio fixes it
- Brackets are not allowed inside gr.Interface
- greet has no parameters

* Answer: It hands Gradio the function itself, to call later when Submit is pressed

</div>
</div>

<!-- Speaker note: greet() would call it straight away. fn=greet gives Gradio the function, and Gradio calls it each time someone presses Submit. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A tick box

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Checkbox(label="Excited?")],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
).launch()
```

</div>
<div>

**What does the Checkbox give greet when it is ticked?**

- "Excited?"
- "ticked"
- True
- 1

* Answer: True

</div>
</div>

<!-- Speaker note: A Checkbox gives True or False, which is what if excited: needs. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Typing Ada and pressing Submit gives TypeError: can only concatenate str (not "bool") to str. Click the line that is wrong.**

```
 1  import gradio as gr
 2  
 3  def greet(name, excited):
 4      message = "Hello, " + name
 5      if excited:
 6          return message + "!!!"
 7      return message + "."
 8  
 9  
10  gr.Interface(
11      fn=greet,
12      inputs=[gr.Checkbox(label="Excited?"), gr.Textbox(label="Name")],
13      outputs=gr.Textbox(label="Greeting"),
14  ).launch()
```

* Answer: line 12

<!-- Speaker note: Gradio passes inputs in order: the Checkbox (True or False) goes to name, and the text goes to excited. The inputs must be in the same order as the parameters. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **How excited?:** Replace the checkbox with a **slider** from 1 to 5 that sets how many `!` the greeting ends with.
- **A second output:** Add a second output box that says how many letters the name has. A function gives two outputs by returning two values with a comma between them.

[Open this step](https://tutorials.learningwaypoints.com/code/gradio/intro/?full=step-4#step-4)

<!-- Speaker note: What this step is for: An input is a component in inputs and a parameter of the function; an output is a component in outputs and a value the function returns. Hints, in order: Swap the Checkbox for gr.Slider(1, 5, step=1, label="Excitement"). / def greet(name, excitement): return "Hello, " + name + "!" * excitement / outputs=[gr.Textbox(label="Greeting"), gr.Textbox(label="Name length")] / Return two values, separated by a comma: return message + ".", str(len(name)) + " letters" For students who need more support: Give students the Slider line, and ask them only to change the function to match. For early finishers: Add a Dropdown of languages (English, Māori, French) and greet in the chosen one. The hard part, on purpose: Matching inputs to parameters by order. Ask students to point at each input and its parameter before they run. When students get stuck: TypeError: can only concatenate str (not "bool") to str. Ask: Which input goes to which parameter? Fix: Put the inputs in the same order as the parameters. / The second output box stays empty. Ask: How many values does the function return, and how many outputs are there? Fix: Return one value per output, separated by commas. / TypeError: can't multiply sequence by non-int of type 'float'. Ask: Is the slider value a whole number? Fix: Use step=1 on the slider, or int(excitement). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a tiny tool

Build a small tool of your own. Write the function first and test it with `print`, then wrap it in `gr.Interface`. Ideas: initials from a full name, a word counter, a shout converter (upper case and `!`), a "how many days until" counter.

[Open this step](https://tutorials.learningwaypoints.com/code/gradio/intro/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: write and test the function first, then wrap it in an app. -->

<!-- Speaker note: Teacher: insist on a print test before the gr.Interface line. -->

---

## Where this leads

On a computer, `pip install gradio` and `python app.py` run this same file as a real web app at `http://127.0.0.1:7860`. Next: apps with several inputs and outputs.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**How does Gradio know which input goes to which parameter?**

* By order: the first input goes to the first parameter, the second to the second.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: several inputs and outputs in a calculator. Data detective's dashboard and Machine learning with Gradio (coming later) build on this. -->
