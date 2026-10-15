---
title: "Moves as functions"
subtitle: "Robotics challenges · Drive · Lesson 2"
---

# Moves as functions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A dance crew learns named moves (the shuffle, the twirl), then a routine is just the names in order. Robot shows and drone light shows are built the same way.


:::teacher-note

**In one sentence:** Students name robot moves as functions (wiggle, spin) and build a dance routine by calling them in order, revisiting functions from micro:bit Foundations in a new setting.

**Students should be able to say:** I can make a function for a robot move and call it. I can build a routine from calls in order. I can explain why making a function alone does not move the robot.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**wiggle** is a function: a quick turn right, a quick turn left, then stop.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bc9bb5bc4189.png?v=6648d235760d499b)

:::keep-together

**What happens when you press A?**

☐ The robot wiggles twice, then stops

☐ The robot wiggles once

☐ Nothing: making a function is not enough

☐ The robot wiggles forever

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It wiggles twice, then stops. Button A calls wiggle two times, and each wiggle turns right, turns left, then stops.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version has two moves: **wiggle** on A and **spin** on B.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/092c1e5dc3cc.png?v=ed118dc57b79c4e3)

:::keep-together

### Spin once

**This version has a second move, spin. How many times does each block inside spin run when you press B once?**

☐ Once

☐ Forever

☐ Twice

☐ None

:::


:::teacher-note

**Answer:** Once

B calls spin once, so its blocks run once: turn for 1.2 seconds, then stop.

:::


:::keep-together

### Leo's robot

Leo's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/16e1ec3fc519.png?v=7d8f101306b499aa)

**Leo made a spin function. When he presses A, his robot only drives forward. Why?**

☐ Nothing calls spin: button A has drive blocks instead of a call to spin

☐ Functions only work with button B

☐ His spin function is broken

☐ He needs a forever block

:::


:::teacher-note

**Answer:** Nothing calls spin: button A has drive blocks instead of a call to spin

Making a function only names the move. Its blocks run when something calls it, and nothing calls spin. Button A needs call spin.

:::


:::typical

## Modify


**A new move.** Make a second move: a function called **spin** that turns for 1200 ms, then stops. Make button **B** call it.

**A routine.** Change button **A** so it dances **wiggle, spin, wiggle**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A new move:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/092c1e5dc3cc.png?v=ed118dc57b79c4e3)

**A routine:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b5af2a283afd.png?v=944382f92296fd85)

:::

:::


## Make

Make a **dance routine** for a robot show:

- make at least **two new moves**, each its own function
- on **A+B**, call your moves in order, with one move used **twice**

Name your moves so a reader can picture them, like **shuffle** or **twirl**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/74631f115390.png?v=08b4682b39257a07)

:::


:::wider

## On a real robot

Real robots dance differently from the simulator: on a smooth desk they slide, on carpet they turn less. Tune each move's times on your floor. Because each move is a function, you fix it in **one place** and every call in the routine gets the fix. Later in the course, music and radio cues let several robots dance together.

:::


## Exit ticket

:::keep-together

**Why is a dance easier to change when each move is a function?**

{{lines-3}}

:::


:::teacher-note

**Answer:** You change a move in one place, and every call to it in the routine changes too. The routine itself reads as a list of names.

:::

