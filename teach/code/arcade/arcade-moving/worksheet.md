---
title: "Move with the controller"
subtitle: "Arcade Foundations · Sprites and movement · Lesson 2"
---

# Move with the controller

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In every game you have played, a button press becomes movement on the screen. One block makes that link.


:::teacher-note

**In one sentence:** Students hand a sprite to the arrow keys with move with buttons, and see that its two numbers are speeds across and down, not a place.

**Students should be able to say:** I can let the player steer a sprite with the arrow keys. I can choose which way a sprite can move, and how fast. I can keep a sprite on the screen.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Lock in your prediction, then try it.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4f242e5e1b78.png?v=2927c184021fc1c1)

:::keep-together

**The plane has move with buttons with speeds 100 and 0. You hold the up arrow. What happens?**

☐ The plane flies up

☐ Nothing: the plane can only move left and right

☐ The plane flies up and to the right

☐ The plane jumps to x 100, y 0

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing. The second number is the speed up and down, and it is 0, so up and down do nothing. The numbers are speeds, not a place.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Fly the plane with the arrow keys. Press **A** (space) and see what that event does.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6c50e64bc9bd.png?v=ac929fc8a2742d5a)

:::keep-together

### What does it do?

**Match each block with what it does to a sprite.**

A. stops it at the edge of the screen

B. runs its blocks each time A is pressed

C. puts it at one place, once

D. lets the arrow keys steer it, while a key is held

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `move with buttons` | |
| `set stay in screen` | |
| `set position` | |
| `on A button pressed` | |

:::


:::teacher-note

**Answer:** move with buttons → D. lets the arrow keys steer it, while a key is held; set stay in screen → A. stops it at the edge of the screen; set position → C. puts it at one place, once; on A button pressed → B. runs its blocks each time A is pressed

:::


:::keep-together

### Which way is faster?

**A sprite has move with buttons with speeds 50 and 100. Which way does it move faster?**

☐ Left and right

☐ Up and down

☐ The same both ways

☐ Neither: it jumps to (50, 100)

:::


:::teacher-note

**Answer:** Up and down

The first number (50) is the speed across, the second (100) the speed up and down. 100 is faster.

:::


:::keep-together

### Kim's cloud

**Kim's arrow keys move the cloud, not her plane. What did she do?**

☐ The plane needs a velocity

☐ Her move with buttons block names the cloud

☐ The cloud was made first

☐ The plane is the wrong kind

:::


:::teacher-note

**Answer:** Her move with buttons block names the cloud

move with buttons steers only the sprite it names. Click the sprite's name in the block and choose plane.

:::


:::typical

## Modify


**Only across.** Make the plane fly left and right only, like a ship along the bottom of the screen.

**Dash.** Add an event: each press of **A** dashes the plane 30 pixels to the right. Press it a few times.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Only across:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/43aba2c197f9.png?v=f983bdac05c69dcb)

**Dash:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f7bf2dedb5f2.png?v=cfb204e137e57efd)

:::

:::


## Make

Make a **ship** for a space game:

- it sits near the **bottom** of the screen
- the arrow keys move it **left and right only**
- it **cannot leave** the screen

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/db1e89ea7721.png?v=c4945ced4eca2cc0)

:::


:::wider

## Change a goalkeeper

This goalkeeper guards a goal on the left. Make it move **up and down only**, a bit slower, and keep it on the screen.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**move with buttons has speeds 0 and 80. Which arrow keys do something?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Only up and down. The first number, the speed across, is 0.

:::

