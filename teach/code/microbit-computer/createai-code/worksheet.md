---
title: "Code with ML blocks"
subtitle: "micro:bit and the computer · AI on the micro:bit · Lesson 7"
---

# Code with ML blocks

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A fitness band buzzes when you've been sitting for an hour and counts each rep at the gym. Its model says what you're doing; its program decides what to do about it.


:::teacher-note

**In one sentence:** Students code with CreateAI's Machine Learning blocks (in the simulator with practice actions, then on their own model) to build an activity tracker.

**Students should be able to say:** I can run code when a model's estimated action starts or stops. I can explain why on ML start runs once per stretch of an action. I can handle unknown, when no action is certain enough.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/1722ead4bc15.png?v=ba79a030a26b6ad1)

:::keep-together

**You do three jumps without stopping, and the model estimates jumping the whole time. What does the micro:bit show?**

☐ 1

☐ 3

☐ Lots of numbers, counting up fast

☐ Nothing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 1. on ML jumping start runs once, when the estimated action changes to jumping. Three jumps in a row are one stretch of jumping.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/1722ead4bc15.png?v=ba79a030a26b6ad1)

:::keep-together

### Counting jumps

**To count every jump in a long stretch of jumping, what would you need?**

☐ A model trained on single jumps, with something else (such as still) between them

☐ is ML jumping detected in forever, adding 1 each time round

☐ Nothing: on ML start already counts every jump

☐ A faster micro:bit

:::


:::teacher-note

**Answer:** A model trained on single jumps, with something else (such as still) between them

The model estimates an action several times a second; the start event fires only when it changes. Counting each jump means each jump must be its own change. is detected in forever would count many times per jump.

:::


:::keep-together

### Unknown

**What does the unknown action mean?**

☐ A new action the model has learned by itself

☐ The micro:bit is broken

☐ No action is certain enough (above its recognition point)

☐ The model is still training

:::


:::teacher-note

**Answer:** No action is certain enough (above its recognition point)

Like Unsure in the AI robots lessons: when nothing is certain enough, the estimate is unknown. Your program can show it, or do nothing.

:::


:::keep-together

### Stop and duration

**on ML running stop gives a duration. What is it?**

☐ How far you ran

☐ How many milliseconds running lasted, just now

☐ The certainty of running

☐ How many times you ran

:::


:::teacher-note

**Answer:** How many milliseconds running lasted, just now

When the estimate changes away from running, the stop event runs and tells you how long running was the estimate. Add the durations up for total running time.

:::


:::typical

## Modify


**Running time.** Keep a **total of running time** and show it in seconds when **A** is pressed. Test it: choose running, wait, then still.

**Not sure.** Show **?** when the model isn't sure of any action (**unknown**).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Running time:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/af9ca927e90b.png?v=c9a3d1e25e55d2b1)

**Not sure:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/99cdfe430cc8.png?v=b47eebb3119f395a)

:::

:::


## Make

Make an **activity tracker**: a picture for **still**, **walking** and **running**, a **jump count**, a blank screen for **unknown**, total **running time**, and button **A** sends the jumps and running seconds to the computer (as in Send data to the computer).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/e59ee77685e9.png?v=d152e4308d5a7d58)

:::


:::wider

## On your own model

- Open your model from last lesson in CreateAI and click **Edit in MakeCode**. Your actions are named as you trained them, so choose them in the dropdowns.
- Copy your tracker's blocks across (or rebuild them), **Download** to a **V2** micro:bit, unplug it, add the battery pack: it runs with no computer.
- Plug it back in and press **A** with the board from **Send data to the computer** open to see the totals.

:::


## Exit ticket

:::keep-together

**Why does on ML jumping start run once during three jumps in a row?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It runs when the estimated action changes to jumping; three jumps in a row are one stretch of jumping.

:::

