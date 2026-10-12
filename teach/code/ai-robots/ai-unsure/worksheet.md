---
title: "When the model is unsure"
subtitle: "AI robots · Drive with a model · Lesson 3"
---

# When the model is unsure

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A delivery robot loses its connection in a lift. Should it keep rolling the way it was going, or stop and wait? Safety engineers decide this before anything is built.


:::teacher-note

**In one sentence:** Students make a model-driven robot safe when the model is unsure (the board sends Unsure) and when it goes quiet (a watchdog stops the robot after a few seconds of silence).

**Students should be able to say:** I can make a robot stop when the model is unsure. I can make a robot stop when it hears nothing for a while (a watchdog). I can explain why the board repeats its label every second.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ddc33dd7c8ed.png?v=1bfc3c20ade72fd6)

:::keep-together

**You press A+B once, then nothing else. What does the other robot do?**

☐ Doesn't move

☐ Drives forward and never stops

☐ Drives forward for about two seconds, then stops

☐ Stops at once

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** About two seconds forward, then it stops. Each message resets lastHeard; when two seconds pass with no message, the watchdog sets the mode to Stop.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ddc33dd7c8ed.png?v=1bfc3c20ade72fd6)

:::keep-together

### Unsure or silent

**Match each problem with what keeps the robot safe.**

A. the board sends Unsure, and the robot stops

B. else: stop

C. the watchdog stops the robot after 2 seconds of silence

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The model is 55% Forward and 45% Left` | |
| `The laptop goes to sleep` | |
| `The model sends a word the robot doesn't know` | |

:::


:::teacher-note

**Answer:** The model is 55% Forward and 45% Left → A. the board sends Unsure, and the robot stops; The laptop goes to sleep → C. the watchdog stops the robot after 2 seconds of silence; The model sends a word the robot doesn't know → B. else: stop

:::


:::keep-together

### Why repeat

**The board stopped repeating the label every second, and only sent it when it changed. What would happen when you hold Forward steadily?**

☐ The watchdog never runs

☐ The robot stops after 2 seconds, even though you're still showing Forward

☐ The robot speeds up

☐ Nothing different

:::


:::teacher-note

**Answer:** The robot stops after 2 seconds, even though you're still showing Forward

The watchdog can't tell silence because nothing changed from silence because something broke. Repeating the label every second says: still here, still Forward.

:::


:::keep-together

### Why stop

**Why stop, rather than keep doing the last thing, when unsure?**

☐ Stopping saves battery

☐ The model needs the robot still to retrain

☐ It is the only action robots can do

☐ For a moving robot, stopping is the action least likely to hurt someone or break something

:::


:::teacher-note

**Answer:** For a moving robot, stopping is the action least likely to hurt someone or break something

A safe default depends on the machine: for a robot on wheels it is stop. (For a plane it would not be!)

:::


:::typical

## Modify


**A quicker watchdog.** 

**Show unsure.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A quicker watchdog:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a8c38654787a.png?v=913f685a038a0c24)

**Show unsure:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/607567cd362d.png?v=812a322179dfefdf)

:::

:::


## Make

This starter has **no watchdog**. Add one that, after **1.5 seconds** of silence, stops the robot, turns its lights **red** and **beeps once**. Any new label should set it going again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/52924b7b9531.png?v=c9575d02a5853f0b)

:::


## Exit ticket

:::keep-together

**Why does a robot need both an Unsure action and a watchdog?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Unsure handles a model that can't decide; the watchdog handles getting no messages at all. Both make the robot stop.

:::

