---
marp: true
theme: default
html: true
---

# More inputs, more outputs

Apps with Gradio · First apps

<!-- Speaker note: Students build a movie-night ticket calculator with sliders, a dropdown and two outputs, learn that inputs match parameters and outputs match returned values in order, then add a popcorn checkbox, a seat radio and a calculator of their own. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** a movie-night calculator with sliders, a dropdown and two outputs: each input is a parameter, each output a returned value, all in order.

- I can return two values from a function and use them as two outputs.
- I can match each kind of input with the kind of value it gives.
- I can add an input in the right place in both inputs and parameters.

<!-- Speaker note: Before class: Read the unit primer first. `return total, summary` returns two values; Gradio puts them in the two outputs, in order (the Predict shows the same thing with `a, b = ...`). Each input is one parameter, in order. Kinds of value: Slider and Number give numbers (possibly 2.0, hence `int()`), Dropdown and Radio give the chosen text, Checkbox gives True or False, Textbox gives text. The bug task works out the summary but returns only the total, so one output stays empty. Encourage planning: inputs and outputs on paper before code. -->

---

## Why it matters

> Booking sites, calculators and quizzes are the same shape: some inputs go in, a function works something out, some outputs come back.

<!-- Speaker note: Real apps ask for several things and show several answers. In Gradio each **input** is one parameter of the function, and each **output** is one value it returns, separated by commas. Both lists go **in order**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def two_things(n):
    return n * 2, n + 1


doubled, plus_one = two_things(4)
print(doubled)
print(plus_one)
```

**What does it print?**

- 8, then 5
- 8 only
- An error: a function returns one value
- (8, 5)

<!-- Speaker note: What happens: 8, then 5. return n * 2, n + 1 gives back two values, and doubled, plus_one = ... puts the first in doubled and the second in plus_one. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write return n * 2, n + 1 on the board with two arrows to two boxes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 8, then 5. return n * 2, n + 1 gives back two values, and doubled, plus_one = ... puts the first in doubled and the second in plus_one.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/gradio/gradio-inputs/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/gradio/gradio-inputs/?full=step-2#step-2)

<!-- Speaker note: Run it: move the sliders, choose a day, press **Submit**. Try 2 adults and 3 children on a weekend. Students should be able to say: I can point to the parameter for each input and the returned value for each output. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import gradio as gr

def price(adults, children, day):
    if day == "Weekend":
        total = adults * 18 + children * 12
    else:
        total = adults * 15 + children * 10
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children on a " + day.lower()
    return total, summary


gr.Interface(
    fn=price,
    inputs=[
        gr.Slider(0, 10, step=1, label="Adults"),
        gr.Slider(0, 10, step=1, label="Children"),
        gr.Dropdown(["Weekday", "Weekend"], value="Weekday", label="Day"),
    ],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
    title="Movie night",
).launch()
```

<!-- Speaker note: What this step is for: Inputs line up with parameters and outputs with returned values, in order; each kind of component gives the function a different kind of value. -->

<!-- Speaker note: Teacher: hold up each kind of input and ask what value it gives. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What each input gives

**Match each input with what it gives the function.**

| | |
|---|---|
| `gr.Slider(0, 10, step=1)` | A. the chosen text, such as "Weekend" |
| `gr.Dropdown(["Weekday", "Weekend"])` | B. whatever was typed, as text |
| `gr.Checkbox()` | C. True or False |
| `gr.Textbox()` | D. a number, such as 3 |

* Answer: gr.Slider(0, 10, step=1) → D. a number, such as 3; gr.Dropdown(["Weekday", "Weekend"]) → A. the chosen text, such as "Weekend"; gr.Checkbox() → C. True or False; gr.Textbox() → B. whatever was typed, as text

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Tidy numbers

**Why does the summary use str(int(adults))?**

- To round the price
- Gradio needs int and str
- A slider can give 2.0; int makes it 2, and str makes it text to join
- adults is a list

* Answer: A slider can give 2.0; int makes it 2, and str makes it text to join

<!-- Speaker note: Gradio sliders can give decimal numbers, such as 2.0. int() drops the .0, and str() turns the number into text so + can join it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The total appears, but the Summary box stays empty. Click the line that is wrong.**

```
 1  import gradio as gr
 2  
 3  def price(adults, children):
 4      total = adults * 15 + children * 10
 5      summary = str(int(adults)) + " adults and " + str(int(children)) + " children"
 6      return total
 7  
 8  
 9  gr.Interface(
10      fn=price,
11      inputs=[gr.Slider(0, 10, step=1, label="Adults"), gr.Slider(0, 10, step=1, label="Children")],
12      outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
13  ).launch()
```

* Answer: line 6

<!-- Speaker note: summary is worked out but never returned. Two outputs need two values: return total, summary. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Popcorn:** Add a **Popcorn ($8)** checkbox that adds $8 to the total.
- **Seats:** Add a **Radio** choice of seat: Standard, or Recliner for $5 more per person.

[Open this step](https://tutorials.learningwaypoints.com/code/gradio/gradio-inputs/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new input is a component and a parameter, in the same place in each list; the function then uses it. Hints, in order: Add gr.Checkbox(label="Popcorn ($8)") at the end of inputs, and popcorn at the end of the parameters. / if popcorn: total = total + 8 / gr.Radio(["Standard", "Recliner"], value="Standard", label="Seat"), a seat parameter, and $5 more per person for a recliner. For students who need more support: Give students the popcorn checkbox line and the if, and ask them to put each in the right place. For early finishers: Add a Number input for a discount code percentage, and show the saving as a third output. The hard part, on purpose: Adding an input in the right place in both lists. Ask them to count inputs and parameters aloud. When students get stuck: An output box stays empty. Ask: Does return have one value for each output? Fix: return total, summary. / TypeError: price() takes 3 positional arguments but 4 were given. Ask: How many inputs and how many parameters are there? Fix: Add the parameter for the new input. / The summary says 2.0 adults. Ask: What kind of number does the slider give? Fix: str(int(adults)). -->

<!-- Speaker note: Teacher: add the input to inputs and the parameter at the same time, in the same place. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own calculator

Make a calculator of your own with at least **three inputs of different kinds** and **two outputs**: a pizza planner, a sports-day points tally, pocket money savings, a recipe scaler. Write down the inputs and outputs first.

[Open this step](https://tutorials.learningwaypoints.com/code/gradio/gradio-inputs/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: plan the inputs and outputs, write and test the function, then wrap it. -->

<!-- Speaker note: Teacher: plan on paper: a sketch of the app with labelled boxes. -->

---

## Where this leads

Next: a quiz app, where the inputs are made from a list of questions.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A function has three parameters. How many inputs does its Gradio app need, and in what order?**

* Three, in the same order as the parameters.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson builds a quiz whose inputs come from a list of questions. -->
