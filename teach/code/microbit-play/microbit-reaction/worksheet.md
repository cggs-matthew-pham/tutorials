---
title: "Reaction timer"
subtitle: "micro:bit: talk and play · Final challenge: Reaction duel · Lesson 7"
---

# Reaction timer

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Sprinters, racing drivers and goalkeepers train their reactions with timers like this. You already know every idea it needs.


:::teacher-note

**In one sentence:** Students build a reaction game from an almost empty starter in three milestones, using a random wait, running time, a true/false variable, decisions and a best score.

**Students should be able to say:** I can build a timing game from blocks I know. I can use a true/false variable to stop early presses. I can keep a best score with an if.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e8186bfa90d.png?v=3fc5950b8803389b)

:::keep-together

**You press B three times, waiting for the heart each time. Does the heart take the same time to appear each time?**

☐ A different time each time, between 1 and 4 seconds

☐ It appears straight away

☐ It never appears

☐ The same time every time

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

Read the finished game before you build your own.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/36095f35e2e3.png?v=4aeb2fd9acfcafe3)

:::keep-together

### Jobs and blocks

**This is the finished game. Match each job with the blocks that do it.**

A. running time − start

B. if reaction &lt; best, set best to reaction

C. if waiting … else

D. pause pick random 1000 to 4000

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `wait an unguessable time` | |
| `measure the reaction` | |
| `catch an early press` | |
| `keep the fastest time` | |

:::


:::teacher-note

**Answer:** wait an unguessable time → D. pause pick random 1000 to 4000; measure the reaction → A. running time − start; catch an early press → C. if waiting … else; keep the fastest time → B. if reaction &lt; best, set best to reaction

:::


:::keep-together

### Trace the times

**start is set when the heart appears. Fill in the number shown when A is pressed.**

{{rows 1}}

| start (heart appears) | running time when A is pressed | number shown |
|---|---|---|
| 5200 | 5450 |   |
| 8000 | 8320 |   |

:::


:::teacher-note

**Answer:** 250, 320

The number shown is running time minus start: how many milliseconds passed between the heart and the press.

:::


:::keep-together

### The best time

**best starts at 99999. Your first reaction is 400. What is best after it?**

☐ 0

☐ 400

☐ 99599

☐ 99999

:::


:::teacher-note

**Answer:** 400

400 is less than 99999, so best becomes 400. Starting best very high means any first time beats it.

:::


:::typical

## Milestone 1: time the press

The variable `start` is made for you, and **B** clears the screen. Build the rest:

1. **B**: wait a random time, show the heart, and store the time in `start`.
2. **A**: show how long it took.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

:::

:::


:::typical

## Milestone 2: no cheating

Make an early press show a cross, using the variable `waiting`. Set it, ask about it, and set it back.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f150782369e9.png?v=33e184f5f3458521)

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/36095f35e2e3.png?v=4aeb2fd9acfcafe3)

:::


:::wider

## Why random?

Play this version a few times. What do you notice?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does the game need waiting? What would happen without it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Without it, pressing A before the heart still shows a number, so players could cheat by pressing early.

:::

