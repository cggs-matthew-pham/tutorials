---
title: "Time between"
subtitle: "micro:bit: talk and play · Time · Lesson 5"
---

# Time between

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A stopwatch, a lap timer and a game's reaction score all do one subtraction: the time now, take away the time it started.


:::teacher-note

**In one sentence:** Students store the running time at one moment and take it away from a later reading, to measure how long something took.

**Students should be able to say:** I can measure how long something took with running time. I can say why running time on its own is a big number. I can turn milliseconds into seconds.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**A** stores the running time in `start`. **B** shows the running time take away `start`.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ce546a0091db.png?v=7904d5a663b28b21)

:::keep-together

**You press A when the running time is 5000, and B when it is 7500. What does B show?**

☐ 2500

☐ 5000

☐ 7500

☐ 12500

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2500. A stores 5000 in start. B shows running time − start: 7500 − 5000 = 2500 ms, two and a half seconds.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ce546a0091db.png?v=7904d5a663b28b21)

:::keep-together

### Trace the times

**Fill in the number B shows.**

{{rows 1}}

| start (A pressed) | running time when B is pressed | B shows |
|---|---|---|
| 5200 | 5450 |   |
| 8000 | 11000 |   |
| 12000 | 12180 |   |

:::


:::teacher-note

**Answer:** 250, 3000, 180

B shows running time minus start: how many milliseconds passed between A and B.

:::


:::keep-together

### Zara's stopwatch

**Zara's B shows only running time, with no start taken away. She presses A, waits 2 seconds, presses B, and sees 14231. Why?**

☐ The micro:bit is slow

☐ 14231 is 2 seconds

☐ running time counts from when the micro:bit started, not from A

☐ A changed the running time

:::


:::teacher-note

**Answer:** running time counts from when the micro:bit started, not from A

running time never restarts at a press. It counts from switch-on, so the time between two moments is one reading minus the other.

:::


:::keep-together

### Milliseconds to seconds

**B shows 2500. How many seconds is that?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2.5

1000 ms is one second, so 2500 ms is 2.5 seconds.

:::


:::typical

## Modify


**In seconds.** Make **B** show seconds, not milliseconds.

**Shake to start.** Make a **shake** start the stopwatch as well as **A**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**In seconds:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/19f689bc73d3.png?v=0bbf51ae1e27eb88)

**Shake to start:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3d94fd1ef681.png?v=3af590d942765bfb)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e8186bfa90d.png?v=3fc5950b8803389b)

:::keep-together

**B clears the screen, pauses for pick random 1000 to 4000, then shows the heart. What is the longest the heart can take to appear, in milliseconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 4000

pick random 1000 to 4000 can give any whole number from 1000 up to 4000, so the longest wait is 4000 ms: four seconds.

:::


## Make

Press **B** and a heart appears after a random wait. Make **A** show how many milliseconds you took to press it.

1. When the heart appears, set `start` to **running time**.
2. When **A** is pressed, show **running time − start**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

:::


:::wider

## Change an egg timer

This timer starts when the micro:bit switches on, and again whenever **A** is pressed. It shows a small square until 5 seconds have passed, then an alarm face. Make it a 3-minute timer (180000 ms), and choose your own pictures.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**start is 3000. Running time is 3750 when B is pressed. What does running time − start show, and what does it mean?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 750: 750 milliseconds passed between storing start and pressing B.

:::

