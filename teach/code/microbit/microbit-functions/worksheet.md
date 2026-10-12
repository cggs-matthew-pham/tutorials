---
title: "Functions"
subtitle: "micro:bit Foundations · Collections and tools · Lesson 8"
---

# Functions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A recipe card says 'make the sauce (see page 12)' instead of writing the sauce out every time. A function is that named job, written once and used everywhere.


:::teacher-note

**In one sentence:** Students name a job as a function and call it from several places, add a parameter, and see in Python that every event block is a function the micro:bit calls.

**Students should be able to say:** I can make a function and call it from more than one place. I can give a function a parameter and call it with different values. I can explain that an event block is a function the micro:bit calls for me.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**function flashHeart** holds the blocks for one flash. They only run when something **calls** flashHeart.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

:::keep-together

**You press A once. How many times does the heart flash?**

☐ It keeps flashing

☐ Once

☐ Four times

☐ Twice

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Twice. The flashHeart blocks run each time the function is called, and A calls it two times.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

:::keep-together

### Noah's flash

Noah's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3e3f713a27d0.png?v=8ee9a305b449a786)

**Noah made the flashHeart function. He presses A and nothing happens. Why?**

☐ Functions only work with B

☐ He needs a pause first

☐ The function is too long

☐ Nothing calls flashHeart: making a function does not run it

:::


:::teacher-note

**Answer:** Nothing calls flashHeart: making a function does not run it

Making a function only names the job. It runs when a call block runs it. Noah's A event is empty, so nothing calls it.

:::


:::keep-together

### The same program in Python

MakeCode can show every program in Python. Here is this one:

```python
def flash_heart():
    basic.show_icon(IconNames.HEART)
    basic.pause(200)
    basic.clear_screen()
    basic.pause(200)

def on_button_pressed_a():
    flash_heart()
    flash_heart()
input.on_button_pressed(Button.A, on_button_pressed_a)
```

**This is the same program in Python (press Python at the top of the editor). Match each Python line with what it does.**

A. makes a function from the blocks inside on button A pressed

B. hands that function to the micro:bit to call on each press

C. calls it: runs its blocks once

D. makes the function flash_heart

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def flash_heart():` | |
| `flash_heart()` | |
| `def on_button_pressed_a():` | |
| `input.on_button_pressed(Button.A, on_button_pressed_a)` | |

:::


:::teacher-note

**Answer:** def flash_heart(): → D. makes the function flash_heart; flash_heart() → C. calls it: runs its blocks once; def on_button_pressed_a(): → A. makes a function from the blocks inside on button A pressed; input.on_button_pressed(Button.A, on_button_pressed_a) → B. hands that function to the micro:bit to call on each press

:::


:::keep-together

### What is an event?

**What is an event block, such as on button A pressed, really?**

☐ A variable that stores A

☐ A list of buttons

☐ A loop that checks A again and again

☐ A function that the micro:bit calls each time A is pressed

:::


:::teacher-note

**Answer:** A function that the micro:bit calls each time A is pressed

In Python you can see it: the blocks inside become a function, and the micro:bit calls that function every time the event happens.

:::


:::typical

## Modify


**Three flashes.** Make **B** flash the heart **three** times. Use the function: do not copy the blocks.

**A function with an input.** Make a function **showScore** with a number **parameter** called `points`. It shows the word Score, then the number. Make **A+B** call it with 5. Then try other numbers.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Three flashes:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/0a56e13b96ba.png?v=469bcc75de6433c2)

**A function with an input:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4382acab7a19.png?v=7a4dba8250bb5f7d)

:::

:::


## Make

Make a **stick-figure dance**. Make two dance moves as functions (for example *wave* and *jump*), each with two or more pictures. Then choreograph: **A** and **B** each call a move, and a **shake** calls a routine of both.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a628edf904c4.png?v=af7515aef4cc0269)

:::


:::wider

## Change an alarm

This alarm beeps and flashes three times when A is pressed, using one function. Make the function's beep higher or lower, then make **B** sound a longer alarm (more calls).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**You make a function, but never call it. What happens when the program runs?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing from that function: its blocks only run when something calls it.

:::

