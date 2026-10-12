---
title: "One robot, many jobs"
subtitle: "Robotics challenges · Modes · Lesson 6"
---

# One robot, many jobs

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A robot lawn mower has modes: mow, go home, pause. You press one button and it keeps doing that job until you choose another.


:::teacher-note

**In one sentence:** Students use a mode variable to give one robot several jobs (go, follow, stop); buttons change the mode and forever does the job, then they add explore and guard modes.

**Students should be able to say:** I can use a variable to remember which job (mode) the robot is doing. I can change the mode with buttons, and make forever do the job for the current mode. I can add a new mode to a program.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4d1bd8397ecb.png?v=f5f8fe0f3af2e31f)

:::keep-together

**The robot is on the line. You press B, wait, then press A+B. What happens?**

☐ Nothing: buttons cannot change what forever does

☐ It follows the line only while you hold B

☐ It moves a little when you press B, then stops by itself

☐ It follows the line, then stops when you press A+B

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It follows the line until you press A+B. B sets mode to follow, and forever keeps following while mode stays follow. A+B sets mode to stop.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4d1bd8397ecb.png?v=f5f8fe0f3af2e31f)

:::keep-together

### Still following

**You pressed B a while ago and let go. Why does the robot keep following the line?**

☐ mode still says follow, and forever checks it again every time round

☐ followLine runs forever by itself

☐ The robot remembers the line

☐ The button is still pressed inside the micro:bit

:::


:::teacher-note

**Answer:** mode still says follow, and forever checks it again every time round

Pressing B ran one block: set mode to follow. The variable keeps that value, so every time forever checks, it finds follow and calls followLine.

:::


:::keep-together

### Ruby's robot

Ruby's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/0c635b01a591.png?v=24e98be13021427a)

**Ruby's robot never moves, even when she presses A. Which part is wrong?**

☐ She needs else if

☐ Her A button sets the wrong mode

☐ forever sets mode to stop every time round, wiping out the A press straight away

☐ robot motor tank needs a time

:::


:::teacher-note

**Answer:** forever sets mode to stop every time round, wiping out the A press straight away

Setting mode to stop belongs in on start, once. Inside forever, it runs again every time round, so mode is stop again before the robot can move.

:::


:::typical

## Modify


**Which mode?.** A person needs to know which job the robot is doing. Show a **different picture** on the micro:bit for each mode, when its button is pressed.

**Explore mode.** Add a fourth job: **explore**, chosen by touching the **logo**. In explore mode the robot drives and turns away from boxes, like lesson 4.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Which mode?:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/11a6ffb610e2.png?v=1c0622cf55fb1d98)

**Explore mode:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b396869083a4.png?v=069db6ea850ca11a)

:::

:::


## Make

Add a **guard** mode, like a security robot watching a doorway:

- shake the micro:bit to choose guard
- in guard mode the robot stays **still**
- when something comes closer than **20 cm**, it shows **red** lights and **beeps**; otherwise its lights are off

Drag a box towards the robot to test it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f9136e5c5823.png?v=b5c11fc0408251a2)

:::


:::wider

## On a real robot

The same program runs on a real robot. Things to notice:

- A real robot moves as soon as you press a button, so put it on the floor first, or press A+B before you pick it up.
- Pressing A and B together needs both at once; real buttons make it easy to press one a moment early. That is a reason real robots often use one button to **cycle** through modes instead.

:::


## Exit ticket

:::keep-together

**Why does the robot keep following the line after you let go of B?**

{{lines-3}}

:::


:::teacher-note

**Answer:** B set the mode variable to follow. The variable keeps that value, and forever checks it every time round, so it keeps calling followLine.

:::

