---
title: "Score, lives and timers"
subtitle: "MakeCode Arcade · Collide and score · Lesson 4"
---

# Score, lives and timers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Three hearts in the corner, a clock ticking down, enemies that keep on coming: that is what turns moving sprites into a game you can win or lose.


:::teacher-note

**In one sentence:** Students give the player lives and a countdown, spawn enemies with a timer event, and see that an overlap keeps running while two sprites still touch.

**Students should be able to say:** I can give the player lives and a countdown, and let the game end by itself. I can use a timer event to make a new enemy every second. I can explain why an enemy must be destroyed (or moved) when it hits the player.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no **game over** block in this program. The **on game update every 1000 ms** block is the timer.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/20a47e2ba4c7.png?v=e7897b2805a3e455)

:::keep-together

**The player has 3 lives and cannot move. A rock comes every second. What happens?**

☐ The player loses all 3 lives, then the game ends by itself

☐ Nothing ends the game, because there is no game over block

☐ The lives go to 0, then -1, -2, and the game keeps going

☐ Only one rock is ever made

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Each rock that hits takes a life. After three hits the lives reach 0, and Arcade shows GAME OVER by itself: you never need a game over block for running out of lives.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Dodge the rocks with the arrow keys. Lose on purpose once, too.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/390be1970411.png?v=b0f8814fc66d7480)

:::keep-together

### Count the lives

**Play this dodge game in your head. Fill in the lives after each thing happens.**

{{rows 1}}

| what happens | lives after |
|---|---|
| (start) | 3 |
| a rock hits the player |   |
| a rock flies past |   |
| a rock hits the player |   |
| a rock hits the player |   |

:::


:::teacher-note

**Answer:** 2, 2, 1, 0

Only a touch runs the Player–Enemy event, so a rock that flies past changes nothing. At 0 lives the engine ends the game.

:::


:::keep-together

### Count the rocks

**The timer runs every 1000 ms. How many rocks has it made after 10 seconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10

1000 milliseconds is one second, so the timer runs once a second: 10 times in 10 seconds, one new rock each time.

:::


:::keep-together

### Sam's dodger

Sam's overlap event:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4157f57f428e.png?v=ed56f0b2eaaa871f)

**Sam's player touches one rock and the game is over straight away, though he started with 3 lives. Why?**

☐ changeLifeBy(-1) takes away all the lives

☐ The timer ends the game after one rock

☐ setLife(3) only gives one life

☐ The rock is not destroyed, so the overlap event runs again every frame while they touch

:::


:::teacher-note

**Answer:** The rock is not destroyed, so the overlap event runs again every frame while they touch

An overlap event runs every frame (about 30 times a second) while the two sprites still touch. The rock is still touching after the first life is gone, so the next frame takes another. Destroy the rock (or move it away) in the event.

:::


:::typical

## Modify


**Faster rocks.** Make a rock come every **half a second**. Is it still possible to survive?

**Extra life.** Put a **heart** (kind Food) in the middle of the screen. Collecting it gives an extra life.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Faster rocks:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/161f0939c97d.png?v=d49ea7c6de15af70)

**Extra life:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/df1715883517.png?v=8f4fd922e7ca2611)

:::

:::


## Make

Make a **30-second dodge game** (bats in a cave, asteroids, traffic):

- the player starts with **3 lives**
- a **countdown** of 30 seconds: survive it to finish
- every second, a new **enemy** flies in from the **right edge** at a **random height**
- each touch takes **one** life

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/d311e053a761.png?v=46b021e67e50a93c)

:::


:::wider

## Change a rain dodger

Someone is walking home in the rain without an umbrella. Make the rain heavier (more drops, falling faster), then give the walker 5 lives and a 40-second walk home.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**In a dodge game one touch takes all three lives. What one block is missing, and why does it matter?**

{{lines-3}}

:::


:::teacher-note

**Answer:** destroy otherSprite in the Player–Enemy overlap. The overlap runs every frame while the sprites touch, so without it the same enemy takes a life each frame.

:::

