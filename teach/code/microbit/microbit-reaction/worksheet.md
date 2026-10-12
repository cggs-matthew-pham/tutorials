---
title: "Reaction timer"
subtitle: "micro:bit Foundations · Final challenge: Reaction timer · Lesson 11"
---

# Reaction timer

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Sprinters, racing drivers and goalkeepers train their reactions with timers like this. You already know every idea it needs.


:::teacher-note

**In one sentence:** Students build a reaction game in three milestones, using events, variables, a random wait, a true/false variable, decisions and a best score.

**Students should be able to say:** I can time something with running time and a variable. I can use a true/false variable to remember what is happening. I can combine events, variables and decisions into a game.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e8186bfa90d.png?v=3fc5950b8803389b)

:::keep-together

**You press B three times, waiting for the heart each time. Does the heart take the same time to appear each time?**

☐ The same time every time

☐ It never appears

☐ A different time each time, between 1 and 4 seconds

☐ It appears straight away

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A different time each time. pick random chooses a new wait from 1000 to 4000 ms on every press.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version already times you. Read it carefully.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

:::keep-together

### Trace the times

**start is set when the heart appears. Fill in the number shown when A is pressed.**

{{rows 1}}

| start (heart appears) | running time when A is pressed | number shown |
|---|---|---|
| 5200 | 5450 |   |
| 8000 | 8320 |   |
| 12000 | 12180 |   |

:::


:::teacher-note

**Answer:** 250, 320, 180

The number shown is running time minus start: how many milliseconds passed between the heart and the press.

:::


:::keep-together

### Too early

**You press A before the heart appears. What happens in this version?**

☐ It still shows a number, as if you reacted

☐ It shows a cross

☐ Nothing

☐ The heart appears straight away

:::


:::teacher-note

**Answer:** It still shows a number, as if you reacted

A always shows running time minus start, so an early press still gets a number. A cheat! Milestone 2 fixes it.

:::


:::keep-together

### In Python

```python
start = 0

def on_button_pressed_b():
    global start
    basic.clear_screen()
    basic.pause(randint(1000, 4000))
    basic.show_icon(IconNames.HEART)
    start = input.running_time()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_a():
    basic.show_number(input.running_time() - start)
input.on_button_pressed(Button.A, on_button_pressed_a)
```

`global start` lets the function change the `start` made outside it. Blocks do this for you.

**The same program in Python. Match each line with what it does.**

A. waits a random time, from 1 to 4 seconds

B. stores the time the heart appeared

C. shows how long since the heart appeared

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `basic.pause(randint(1000, 4000))` | |
| `start = input.running_time()` | |
| `basic.show_number(input.running_time() - start)` | |

:::


:::teacher-note

**Answer:** basic.pause(randint(1000, 4000)) → A. waits a random time, from 1 to 4 seconds; start = input.running_time() → B. stores the time the heart appeared; basic.show_number(input.running_time() - start) → C. shows how long since the heart appeared

:::


:::typical

## Milestone 1: time the press

The variable `start` is made but never set, and **A** does nothing yet.

1. When the heart appears, set `start` to **running time**.
2. When **A** is pressed, show **running time − start**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

:::

:::


:::typical

## Milestone 2: no cheating

**Behind the code:** a variable can hold **true** or **false** (in **Logic**). `waiting` is true only while the heart is showing.

- At the start of **B**, set `waiting` to false.
- When the heart appears, set `waiting` to true.
- In **A**: *if* waiting, set it to false and show the time; *else* show a cross (too early).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f150782369e9.png?v=33e184f5f3458521)

:::

:::


## Make: Milestone 3: beat your best

Keep a **best time**:

- A new variable `best` remembers your fastest time.
- When you beat it, the micro:bit celebrates.
- **A+B** shows your best.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/36095f35e2e3.png?v=4aeb2fd9acfcafe3)

:::


:::wider

## Why random?

Play this version a few times. Then try to beat your times by counting instead of watching.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A reaction game waits a random time, then shows a heart and starts timing. Pressing A shows your time only if a variable waiting is true, and waiting becomes true when the heart shows. Why is waiting needed? What would happen without it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Without it, pressing A before the heart still shows a number, so players could cheat by pressing early.

:::

