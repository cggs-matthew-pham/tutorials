---
title: "Speed"
subtitle: "Arcade Foundations · Sprites and movement · Lesson 3"
---

# Speed

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A car in a racing game, a cloud drifting past, a ball in pong: none of them is pushed by hand every frame. The game is told a speed, and keeps them moving.


:::teacher-note

**In one sentence:** Students give sprites a velocity, and see that the engine keeps a sprite moving every frame until something changes it, while setting a position moves it once.

**Students should be able to say:** I can give a sprite a velocity so it moves by itself. I can make it bounce off the walls, and stop it. I can explain the difference between setting a position and setting a velocity.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no loop here: the blocks in **on start** run once. Lock in what you think the ball will do.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bd0877dbbd08.png?v=e8da5d5192867461)

:::keep-together

**The ball's velocity is set to 50 across and 0 down. What does the ball do?**

☐ Moves 50 pixels right, then stops

☐ Keeps moving right, off the edge of the screen

☐ Jumps to x 50 and stays there

☐ Moves 50 pixels down, then stops

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

Watch the cloud drift and bounce.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6fd861e9fc62.png?v=e2941ac7444fa6ec)

:::keep-together

### What does it do?

**Match each block with what it does to a sprite.**

A. turns it back when it hits an edge

B. keeps it moving by itself, a little every frame

C. puts it at one place, once

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `set position` | |
| `set velocity` | |
| `set bounce on wall` | |

:::


:::teacher-note

**Answer:** set position → C. puts it at one place, once; set velocity → B. keeps it moving by itself, a little every frame; set bounce on wall → A. turns it back when it hits an edge

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

Leo's event:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6a4a28478c56.png?v=9b920872bb173760)

**Leo wants A to make his rocket hop 30 pixels to the right. He sets vx to 30 when A is pressed. What happens?**

☐ Nothing: vx only works in on start

☐ The rocket hops 30 pixels and stops

☐ The rocket keeps sliding right, off the edge of the screen

☐ The rocket moves 30 pixels up

:::


:::teacher-note

**Answer:** The rocket keeps sliding right, off the edge of the screen

vx is a speed, not a distance. Setting it to 30 starts the rocket moving 30 pixels every second, and nothing sets it back to 0. A hop changes the position: change x by 30.

:::


:::typical

## Modify


**A slant.** Give the cloud a speed **down** of 20 as well as 30 across. Watch it bounce off every wall.

**Stop.** Make **B** (enter on the keyboard) stop the cloud.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A slant:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/36eb61fa3da1.png?v=a57ad02c2b296c99)

**Stop:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f5481e753142.png?v=a49edbe950ab49e3)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/09d405f9b911.png?v=425fbbbc82aa2e0a)

:::keep-together

**The star is placed at (150, 20). Where does it appear?**

☐ Near the bottom right corner

☐ Near the top right corner

☐ In the middle

☐ Near the top left corner

:::


:::teacher-note

**Answer:** Near the top right corner

x 150 is near the right edge (the screen is 160 across), and y 20 is near the top, because y counts down.

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ad92437eee99.png?v=107874b6018e734c)

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

