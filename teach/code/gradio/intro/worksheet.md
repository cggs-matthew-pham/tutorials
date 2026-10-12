---
title: "Your first app"
subtitle: "Apps with Gradio · First apps · Lesson 1"
---

# Your first app

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Behind most tools you use online is a small function with an interface wrapped around it. You can make one in a few lines.


:::teacher-note

**In one sentence:** Students turn a greeting function into a Gradio app with a Textbox and a Checkbox, see that Gradio passes inputs to parameters in order, then add a slider and a second output, and make a small tool of their own.

**Students should be able to say:** I can turn a function into an app with gr.Interface, inputs and outputs. I can explain how Gradio matches inputs to parameters (in order). I can add an input or an output and change the function to match.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Before any app, it is just a function. Work out what each of the three calls prints.

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

:::keep-together

**What does the second line print?**

☐ Hello, Ada

☐ True

☐ Hello, Ada.

☐ Hello, Ada!!!

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Hello, Ada!!!. excited is True, so the function returns the message with three !s. The others print Hello, Ada. and Hello, !!!

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### No brackets

**fn=greet has no brackets after greet. Why?**

☐ It hands Gradio the function itself, to call later when Submit is pressed

☐ It is a mistake, but Gradio fixes it

☐ Brackets are not allowed inside gr.Interface

☐ greet has no parameters

:::


:::teacher-note

**Answer:** It hands Gradio the function itself, to call later when Submit is pressed

greet() would call it straight away. fn=greet gives Gradio the function, and Gradio calls it each time someone presses Submit.

:::


:::keep-together

### A tick box

**What does the Checkbox give greet when it is ticked?**

☐ "Excited?"

☐ "ticked"

☐ True

☐ 1

:::


:::teacher-note

**Answer:** True

A Checkbox gives True or False, which is what if excited: needs.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

Gradio passes inputs in order: the Checkbox (True or False) goes to name, and the text goes to excited. The inputs must be in the same order as the parameters.

:::


:::typical

## Modify


**How excited?.** Replace the checkbox with a **slider** from 1 to 5 that sets how many `!` the greeting ends with.

**A second output.** Add a second output box that says how many letters the name has. A function gives two outputs by returning two values with a comma between them.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**How excited?:**

```python
import gradio as gr

def greet(name, excitement):
    return "Hello, " + name + "!" * excitement


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Slider(1, 5, step=1, label="Excitement")],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
).launch()
```

**A second output:**

```python
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    letters = str(len(name)) + " letters"
    if excited:
        return message + "!!!", letters
    return message + ".", letters


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Checkbox(label="Excited?")],
    outputs=[gr.Textbox(label="Greeting"), gr.Textbox(label="Name length")],
    title="My first Gradio app",
).launch()
```

:::

:::


## Make: a tiny tool

Build a small tool of your own. Write the function first and test it with `print`, then wrap it in `gr.Interface`. Ideas: initials from a full name, a word counter, a shout converter (upper case and `!`), a "how many days until" counter.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import gradio as gr

def initials(full_name):
    letters = ""
    for word in full_name.split():
        letters = letters + word[0].upper()
    return letters


print(initials("ada lovelace"))

gr.Interface(fn=initials, inputs=gr.Textbox(label="Full name"), outputs=gr.Textbox(label="Initials")).launch()
```

:::


:::wider

## Where this leads

On a computer, `pip install gradio` and `python app.py` run this same file as a real web app at `http://127.0.0.1:7860`. Next: apps with several inputs and outputs.

:::


## Exit ticket

:::keep-together

**How does Gradio know which input goes to which parameter?**

{{lines-3}}

:::


:::teacher-note

**Answer:** By order: the first input goes to the first parameter, the second to the second.

:::

