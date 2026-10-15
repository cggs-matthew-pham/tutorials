---
title: "Count with a variable"
subtitle: "micro:bit Foundations · Remember and sense · Lesson 4"
---

# Count with a variable

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A step counter, a scoreboard, a ticket machine at the deli: each one remembers a number and changes it when something happens.


:::teacher-note

**In one sentence:** Students use a variable to count button presses and shakes, and see the difference between setting a variable and changing it.

**Students should be able to say:** I can make a variable and set its starting value. I can change a variable when an event happens, and show it. I can explain the difference between set and change.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**set count to 0** runs once, at the start. **change count by 1** runs each time A is pressed.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6f9232320634.png?v=b858b183b8ec44eb)

:::keep-together

**You press A three times. What number is on the screen?**

☐ 0

☐ 1

☐ 3

☐ 4

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3. count starts at 0, and each press of A changes it by 1 and shows it: 1, then 2, then 3.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Here is a counter with a reset button.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/71a2f5bcbb75.png?v=1ff083b75df9f3c7)

:::keep-together

### Trace the presses

**This program counts with A and resets with B. Fill in count after each press.**

{{rows 1}}

| press | count after |
|---|---|
| (start) | 0 |
| A |   |
| A |   |
| B |   |
| A |   |

:::


:::teacher-note

**Answer:** 1, 2, 0, 1

change count by 1 adds one to whatever count is now. set count to 0 throws the old value away.

:::


:::keep-together

### Mia's counter

Mia's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/355e719a9da4.png?v=1bff64a4ee46acd9)

**Mia built this counter. However fast she presses A, it always shows 0. Why?**

☐ forever sets count back to 0 again and again

☐ show number cannot show numbers above 0

☐ count needs to start at 1

☐ A is not connected to count

:::


:::teacher-note

**Answer:** forever sets count back to 0 again and again

The press does add 1, but forever runs set count to 0 straight after, many times a second. Setting the start value belongs in on start, which runs once.

:::


:::keep-together

### Set, change, show

**Match each block with what it does to count.**

A. throws the old value away and puts 0 there

B. adds 1 to whatever count is now

C. shows count, without changing it

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `set count to 0` | |
| `change count by 1` | |
| `show number count` | |

:::


:::teacher-note

**Answer:** set count to 0 → A. throws the old value away and puts 0 there; change count by 1 → B. adds 1 to whatever count is now; show number count → C. shows count, without changing it

:::


:::typical

## Modify


**Count in twos.** Make **A** count up by 2: 2, 4, 6.

**Count down.** Add an event for **B** that counts down by 1 and shows the number.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Count in twos:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bfff49cd3dc6.png?v=2b7e6e631e8e995e)

**Count down:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bacbd8e2d73b.png?v=dc457f3a5a7604bc)

:::

:::


## Mix it up

Ravi's signal board, with no variables at all.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bb614b294ec4.png?v=7e7c9294229ba865)

:::keep-together

**Ravi's signal board shows the surprised face once, when it starts, and never when he shakes it. Why?**

☐ The surprised face is in on start, not inside on shake

☐ A and B are taking the shake

☐ He needs a pause after the face

☐ Shake only works on a real micro:bit

:::


:::teacher-note

**Answer:** The surprised face is in on start, not inside on shake

on start runs once, at the start. To react to every shake, the face goes inside an on shake block.

:::


## Make

Build a **step counter**. Each step shakes the micro:bit a little.

- **Shake** adds one step.
- **A** shows how many steps.
- **B** sets the steps back to 0.

In the simulator, click **SHAKE** for each step.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/77bae1561e6e.png?v=c97e89ac7af64a59)

:::


:::wider

## Change a scoreboard

This scoreboard keeps two variables, one for each team. Make each goal worth 2 points, then make a shake reset both scores to 0.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**What is the difference between set count to 0 and change count by 1?**

{{lines-3}}

:::


:::teacher-note

**Answer:** set count to 0 throws the old value away and puts 0 there. change count by 1 adds 1 to whatever count already is.

:::

