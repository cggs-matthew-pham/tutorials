---
title: "More inputs, more outputs"
subtitle: "Apps with Gradio · First apps · Lesson 2"
---

# More inputs, more outputs

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Booking sites, calculators and quizzes are the same shape: some inputs go in, a function works something out, some outputs come back.


:::teacher-note

**In one sentence:** Students build a movie-night ticket calculator with sliders, a dropdown and two outputs, learn that inputs match parameters and outputs match returned values in order, then add a popcorn checkbox, a seat radio and a calculator of their own.

**Students should be able to say:** I can return two values from a function and use them as two outputs. I can match each kind of input with the kind of value it gives. I can add an input in the right place in both inputs and parameters.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`return a, b` gives back two values at once. `x, y = ...` names them, in order.

```python
def two_things(n):
    return n * 2, n + 1


doubled, plus_one = two_things(4)
print(doubled)
print(plus_one)
```

:::keep-together

**What does it print?**

☐ 8, then 5

☐ 8 only

☐ An error: a function returns one value

☐ (8, 5)

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 8, then 5. return n * 2, n + 1 gives back two values, and doubled, plus_one = ... puts the first in doubled and the second in plus_one.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### What each input gives

**Match each input with what it gives the function.**

A. the chosen text, such as "Weekend"

B. whatever was typed, as text

C. True or False

D. a number, such as 3

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `gr.Slider(0, 10, step=1)` | |
| `gr.Dropdown(["Weekday", "Weekend"])` | |
| `gr.Checkbox()` | |
| `gr.Textbox()` | |

:::


:::teacher-note

**Answer:** gr.Slider(0, 10, step=1) → D. a number, such as 3; gr.Dropdown(["Weekday", "Weekend"]) → A. the chosen text, such as "Weekend"; gr.Checkbox() → C. True or False; gr.Textbox() → B. whatever was typed, as text

:::


:::keep-together

### Tidy numbers

**Why does the summary use str(int(adults))?**

☐ To round the price

☐ Gradio needs int and str

☐ A slider can give 2.0; int makes it 2, and str makes it text to join

☐ adults is a list

:::


:::teacher-note

**Answer:** A slider can give 2.0; int makes it 2, and str makes it text to join

Gradio sliders can give decimal numbers, such as 2.0. int() drops the .0, and str() turns the number into text so + can join it.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

summary is worked out but never returned. Two outputs need two values: return total, summary.

:::


:::typical

## Modify


**Popcorn.** Add a **Popcorn ($8)** checkbox that adds $8 to the total.

**Seats.** Add a **Radio** choice of seat: Standard, or Recliner for $5 more per person.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Popcorn:**

```python
import gradio as gr

def price(adults, children, day, popcorn):
    if day == "Weekend":
        total = adults * 18 + children * 12
    else:
        total = adults * 15 + children * 10
    if popcorn:
        total = total + 8
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children on a " + day.lower()
    return total, summary


gr.Interface(
    fn=price,
    inputs=[
        gr.Slider(0, 10, step=1, label="Adults"),
        gr.Slider(0, 10, step=1, label="Children"),
        gr.Dropdown(["Weekday", "Weekend"], value="Weekday", label="Day"),
        gr.Checkbox(label="Popcorn ($8)"),
    ],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
    title="Movie night",
).launch()
```

**Seats:**

```python
import gradio as gr

def price(adults, children, day, seat):
    if day == "Weekend":
        total = adults * 18 + children * 12
    else:
        total = adults * 15 + children * 10
    if seat == "Recliner":
        total = total + (adults + children) * 5
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children on a " + day.lower()
    return total, summary


gr.Interface(
    fn=price,
    inputs=[
        gr.Slider(0, 10, step=1, label="Adults"),
        gr.Slider(0, 10, step=1, label="Children"),
        gr.Dropdown(["Weekday", "Weekend"], value="Weekday", label="Day"),
        gr.Radio(["Standard", "Recliner"], value="Standard", label="Seat"),
    ],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
    title="Movie night",
).launch()
```

:::

:::


## Make: your own calculator

Make a calculator of your own with at least **three inputs of different kinds** and **two outputs**: a pizza planner, a sports-day points tally, pocket money savings, a recipe scaler. Write down the inputs and outputs first.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import gradio as gr

def pizza(people, slices_each, size):
    if size == "Large":
        per_pizza = 10
    else:
        per_pizza = 8
    slices = people * slices_each
    pizzas = int(slices // per_pizza)
    if slices % per_pizza > 0:
        pizzas = pizzas + 1
    return pizzas, str(int(slices)) + " slices needed"


print(pizza(12, 3, "Large"))

gr.Interface(
    fn=pizza,
    inputs=[
        gr.Slider(1, 40, step=1, label="People"),
        gr.Slider(1, 6, step=1, label="Slices each"),
        gr.Radio(["Medium", "Large"], value="Large", label="Size"),
    ],
    outputs=[gr.Number(label="Pizzas to order"), gr.Textbox(label="Working")],
    title="Pizza planner",
).launch()
```

:::


:::wider

## Where this leads

Next: a quiz app, where the inputs are made from a list of questions.

:::


## Exit ticket

:::keep-together

**A function has three parameters. How many inputs does its Gradio app need, and in what order?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Three, in the same order as the parameters.

:::

