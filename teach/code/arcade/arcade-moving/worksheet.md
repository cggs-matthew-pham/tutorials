---
title: "Move with the controller"
subtitle: "MakeCode Arcade · Sprites and movement · Lesson 2"
---

# Move with the controller

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A car in a racing game, a cloud drifting past, a ball in pong: none of them is pushed by hand every frame. The game is told a speed, and keeps them moving.


:::teacher-note

**In one sentence:** Students move sprites with the controller and with a velocity, and see that a velocity keeps a sprite moving every frame while a position moves it once.

**Students should be able to say:** I can let the player steer a sprite with the arrow keys and keep it on the screen. I can give a sprite a velocity so it moves by itself, and make it bounce off the walls. I can explain the difference between setting a position and setting a velocity.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no loop here: the blocks in **on start** run once. Lock in what you think the ball will do.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bd0877dbbd08.png?v=e8da5d5192867461)

:::keep-together

**The ball's velocity is set to 50 across and 0 down. What does the ball do?**

☐ Keeps moving right, off the edge of the screen

☐ Moves 50 pixels right, then stops

☐ Moves 50 pixels down, then stops

☐ Jumps to x 50 and stays there

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It keeps moving right and leaves the screen. A velocity is a speed (50 pixels every second), not a distance, so the engine keeps moving the ball until something changes the speed.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Fly the plane with the arrow keys. Press **A** (space) and see what that event does. Watch the cloud.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e174b468b2a.png?v=1c2386ad8e93f18c)

:::keep-together

### What does it do?

**Match each block with what it does to a sprite.**

A. lets the arrow keys steer it

B. keeps it moving by itself, a little every frame

C. turns it back when it hits an edge

D. stops it at the edge of the screen

E. puts it at one place, once

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `set position` | |
| `set velocity` | |
| `move with buttons` | |
| `set stay in screen` | |
| `set bounce on wall` | |

:::


:::teacher-note

**Answer:** set position → E. puts it at one place, once; set velocity → B. keeps it moving by itself, a little every frame; move with buttons → A. lets the arrow keys steer it; set stay in screen → D. stops it at the edge of the screen; set bounce on wall → C. turns it back when it hits an edge

:::


:::keep-together

### How far?

**The cloud starts at x 80 with a velocity of 30 across. After 2 seconds, how many pixels has it moved?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 60

A velocity of 30 means 30 pixels every second. In 2 seconds the engine moves it 30 + 30 = 60 pixels, a tiny step each frame.

:::


:::keep-together

### Leo's rocket

Leo's rocket is not moved by the controller. He added this event:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6a4a28478c56.png?v=9b920872bb173760)

**Leo wants A to make his rocket hop 30 pixels to the right. He presses A once. What happens?**

☐ Nothing: vx only works in on start

☐ The rocket hops 30 pixels and stops

☐ The rocket moves 30 pixels up

☐ The rocket keeps sliding right, off the edge of the screen

:::


:::teacher-note

**Answer:** The rocket keeps sliding right, off the edge of the screen

vx is a speed, not a distance. Setting it to 30 starts the rocket moving 30 pixels every second, and nothing ever sets it back to 0. A hop of 30 pixels changes the position: change x by 30.

:::


:::typical

## Modify


**Only across.** Make the plane fly left and right only, like a ship along the bottom of the screen.

**Dash.** Add an event: each press of **A** dashes the plane 30 pixels to the right. Press it a few times. Does it stop after each dash?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Only across:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/43aba2c197f9.png?v=f983bdac05c69dcb)

**Dash:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/68b2d5c15117.png?v=464a9040b9975eae)

:::

:::


## Make

Make a **sky game**:

- the player flies the **plane** with the arrow keys
- the plane **cannot leave** the screen
- a **cloud** drifts by itself and **bounces** off the walls

Try to fly through the cloud. (Nothing happens yet: next lesson sprites notice when they touch.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/e39f7a4b77c3.png?v=818f09814ffbfb50)

:::


:::wider

## Change a conveyor belt

This factory belt carries boxes to the right, and the worker moves along the floor. Make the belt run twice as fast, add a third box, then make **A** stop the belt by setting each box's vx to 0.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A sprite has vx set to 20. Will it move 20 pixels, or keep moving? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It keeps moving. vx is a speed (20 pixels every second), and the engine moves the sprite every frame until something changes vx.

:::

