---
title: "True or false"
subtitle: "micro:bit: talk and play · Time · Lesson 6"
---

# True or false

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A lift only opens its doors when it has stopped, and a ticket gate only lets you through once per ticket. Each one remembers a single yes-or-no fact.


:::teacher-note

**In one sentence:** Students use a variable that holds true or false to remember what is happening now, and fix a cheat in a reaction tester.

**Students should be able to say:** I can use a true/false variable to remember what is happening. I can check a true/false variable with if. I can say why it must be set back.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This is last lesson's reaction tester.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

:::keep-together

**You press B, then press A before the heart appears. What does A show?**

☐ A number, as if you had reacted

☐ The heart, straight away

☐ A cross for too early

☐ Nothing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A number. A always shows running time − start, so an early press still gets a time. Nothing in the program knows whether the heart is showing.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f150782369e9.png?v=33e184f5f3458521)

:::keep-together

### Follow waiting

**This version remembers whether the heart is showing in waiting. Fill in waiting after each event, and what A shows.**

{{rows 1}}

| event | waiting after | shows |
|---|---|---|
| B pressed | false | nothing |
| A pressed too early |   |   |
| heart appears |   | heart |
| A pressed |   |   |
| A pressed again |   |   |

:::


:::teacher-note

**Answer:** false, cross, true, false, the time, false, cross

waiting is true only from the heart until the first A. A sets it back to false, so a second press is too early again.

:::


:::keep-together

### Raj's second press

**Raj sets waiting to true when the heart appears, but never sets it back to false. He presses A once and gets a time. What does a second press of A show?**

☐ The same time again

☐ Another time, a bigger one

☐ A cross

☐ Nothing

:::


:::teacher-note

**Answer:** Another time, a bigger one

waiting is still true, so the if says yes again and shows running time − start, which has grown. Set waiting to false after the first press.

:::


:::keep-together

### In Python

```python
def on_button_pressed_a():
    global waiting
    if waiting:
        waiting = False
        basic.show_number(input.running_time() - start)
    else:
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.A, on_button_pressed_a)
```

`global waiting` lets the function change the `waiting` made outside it. Blocks do this for you.

**The same program in Python. Match each line with what it does.**

A. remembers that the heart is showing

B. asks: is the heart showing?

C. the heart is not showing: too early

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `waiting = True` | |
| `if waiting:` | |
| `else:` | |

:::


:::teacher-note

**Answer:** waiting = True → A. remembers that the heart is showing; if waiting: → B. asks: is the heart showing?; else: → C. the heart is not showing: too early

:::


:::typical

## Modify


**One button.** The variable `on` is made for you. Make **A** switch the light on when it is off, and off when it is on.

**Is it on?.** Make a **shake** show whether the light is on.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One button:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a785e86db0af.png?v=572508190adf4177)

**Is it on?:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/9de8fbfd891a.png?v=58b25f469bce10e6)

:::

:::


## Mix it up

A stopwatch from last lesson.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ce546a0091db.png?v=7904d5a663b28b21)

:::keep-together

**A stores start; B shows running time − start. Fill in what B shows.**

{{rows 1}}

| press | running time | B shows |
|---|---|---|
| A | 1000 | (start) |
| B | 1600 |   |
| B | 2500 |   |

:::


:::teacher-note

**Answer:** 600, 1500

B does not change start, so both times are measured from the A press at 1000: 600, then 1500.

:::


## Make

Fix the cheat. `waiting` is made for you.

- At the start of **B**, set `waiting` to false.
- When the heart appears, set `waiting` to true.
- In **A**: *if* waiting, set it to false and show the time; *else* show a cross (too early).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f150782369e9.png?v=33e184f5f3458521)

:::


:::wider

## Change a class vote

Each micro:bit can vote **yes** once with **A**; after that, it shows a cross. Make **B** vote **no**, also only once (one vote each, yes or no).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A program sets waiting to true when the heart appears, and never to false. What goes wrong?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Every press after the heart counts, not only the first, because waiting stays true.

:::

