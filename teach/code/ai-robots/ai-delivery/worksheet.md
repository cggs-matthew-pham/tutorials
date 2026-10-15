---
title: "Delivery robot"
subtitle: "AI robots · Final challenge: Delivery robot · Lesson 5"
---

# Delivery robot

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Delivery robots on footpaths and in hospitals follow instructions, but their own sensors always get the last word: if something is in the way, they stop, whatever they were told.


:::teacher-note

**In one sentence:** Students build a sign-driven delivery robot in three milestones; its distance sensor overrules the model, it reports back through the bridge, and it counts deliveries.

**Students should be able to say:** I can make a robot's own sensor overrule a model's label. I can send a robot's readings back to the computer through a bridge. I can explain why a safety check goes first in an if, else if chain.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/aef0dfb1fd15.png?v=f050f579f5f5bb27)

:::keep-together

**The model reads Go (twice), and the robot sets off. A box is in its way. What happens?**

☐ It stops at the box

☐ It turns back

☐ It drives round the box

☐ It drives into the box

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It drives into the box. The model only reads the sign; nothing in this program looks at what is in front of the robot.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


:::keep-together

### Model or sensor

**Which part should decide each of these?**

Groups: The model (camera on the sign), The robot's own sensor

- Which way the sign says to go: {{field-15}}
- Whether a box is right in front of the robot: {{field-15}}
- Whether it's safe to keep driving forward this moment: {{field-15}}
- Whether the delivery stop has been reached (the Stop sign): {{field-15}}

:::


:::teacher-note

**Answer:** Which way the sign says to go → The model (camera on the sign); Whether a box is right in front of the robot → The robot's own sensor; Whether it's safe to keep driving forward this moment → The robot's own sensor; Whether the delivery stop has been reached (the Stop sign) → The model (camera on the sign)

:::


:::keep-together

### Jo's robot

**Jo checks the distance in the last else if, after Go, Left and Right. Her robot still drives into boxes on Go. Why?**

☐ The watchdog stops the check

☐ Boxes are invisible to the sensor

☐ When the mode is Go, the Go branch runs first and the distance check is never reached

☐ The sensor is broken

:::


:::teacher-note

**Answer:** When the mode is Go, the Go branch runs first and the distance check is never reached

An if, else if chain runs only the first branch that matches. A check that must always win goes first.

:::


:::typical

## Milestone 1: the sensor wins


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/beefd5df10fa.png?v=625dae6785649b0f)

:::

:::


:::typical

## Milestone 2: report back

- The robot sends its **distance** by radio twice a second.
- When it stops for something, it sends **blocked 1**, once; when the way is clear, **blocked 0**, once.

The bridge passes these on to the board, where they appear as values (in_dist, in_blocked).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0f4f2661510a.png?v=1a3fb050e3aee129)

:::

:::


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Make: Milestone 3: deliveries

Count **deliveries**: a Stop sign that arrives while the robot is going. Send the count back and show it when the robot is shaken. Then make it yours: a library book trolley, a lunch-order runner, a parcel robot. Change the signs, lights and sounds to suit.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a5d763c240a4.png?v=0fc1ea59a91dc1b8)

:::


:::wider

## On real robots

- **Each team needs its own radio group** for its bridge and robot.
- A real distance sensor misses thin things (chair legs) and soft things (a jumper). What else should a delivery robot check before it moves?
- Your robot trusts the model only for the sign, and its own sensor for safety. Real delivery robots do the same with many more sensors.

:::


## Exit ticket

:::keep-together

**Why does the distance check go before the Go branch?**

{{lines-3}}

:::


:::teacher-note

**Answer:** An if, else if chain runs only the first match; the safety check must win whatever the model says, so it goes first.

:::

