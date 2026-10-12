---
title: "Gravity and jumping"
subtitle: "MakeCode Arcade · Gravity and levels · Lesson 9"
---

# Gravity and jumping

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Mario, Sonic and every runner game on a phone: you press jump, you rise, you slow down, you fall back. That curve is two numbers and one rule.


:::teacher-note

**In one sentence:** Students give a sprite gravity (acceleration down), build a floor with an if in on game update, and make a jump that only works from the ground, then build a runner game.

**Students should be able to say:** I can give a sprite gravity with ay and explain why it falls faster and faster. I can make a jump with a negative vy, and build a floor with an if in on game update. I can explain why a jump needs a check that the player is on the ground.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/61b8f2b5bc6d.png?v=f3c810cb435ec575)

:::keep-together

**The ball starts near the top with ay 300 and nothing else. What does it do?**

☐ Falls at the same speed all the way

☐ Stays where it is

☐ Falls and stops at the bottom edge

☐ Falls faster and faster, and drops off the bottom of the screen

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Leo's player has gravity, a floor and a jump. Run and jump with the **A** button (space on the keyboard).

**The floor.** There is no ground in this game, so the program builds one. In **on game update**, every frame: *if player bottom > 100*, put the bottom back at 100 and set vy to 0. **bottom** is the y of the sprite's bottom edge (choose it in the dropdown of the x block).

In Python the floor is the same if, inside the function the game calls every frame:

**Engine note.** Arcade can do the floor for you. A **tilemap** is a game world drawn from squares (tiles) in the tile editor; tiles marked as **walls** stop sprites by themselves, and the **camera** can scroll along a world much bigger than the screen. That is why platformers suit Arcade so well. This course builds the floor by hand first, so tile walls make sense when you meet them: a wall is this if, done by the engine.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/2a50a788a823.png?v=e8c933e575867e1c)

:::keep-together

### Faster and faster

**A sprite starts still (vy 0) with ay 300. Gravity adds 300 to vy every second. Fill in vy.**

{{rows 1}}

| seconds | vy (speed down) |
|---|---|
| 0 | 0 |
| 0.5 |   |
| 1 |   |
| 2 |   |

:::


:::teacher-note

**Answer:** 150, 300, 600

Every second vy grows by ay, 300. That is why a fall speeds up: the sprite moves further each frame than the frame before.

:::


:::keep-together

### Top of the jump

**Now the player jumps: vy is set to -150 (up), with ay 300. How many seconds until it stops rising (vy is 0)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 0.5

Gravity adds 300 every second, so after 0.5 seconds -150 has become 0: the top of the jump. Then vy is positive and the player falls back down.

:::


:::keep-together

### Leo's jump

**This is Leo's jumper. Pressing A once jumps well, but pressing it again and again makes his player fly off the top of the screen. Why?**

☐ ay should be negative

☐ The floor in on game update pushes him up

☐ -150 is too big a number

☐ Nothing checks the player is on the ground, so every press jumps again, even in mid-air

:::


:::teacher-note

**Answer:** Nothing checks the player is on the ground, so every press jumps again, even in mid-air

A jump only sets vy to -150. Leo's A event does that on every press, wherever the player is, so each press in the air starts a new jump higher up. The jump should only happen when the player stands on the floor.

:::


:::typical

## Modify


**No flying.** This is Leo's game. Fix it: **A** only jumps when the player is **on the ground**.

**Moon jump.** Change the jump speed and the gravity. What does ay 100 feel like? And ay 600? Pick the pair you like best.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**No flying:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9da73ac66de2.png?v=386f517c5cf7360c)

:::

:::


## Make

Make a **runner**. The player stays on the left; the world comes to them:

- the player has **gravity** and stands on a **floor** at y 100,
- **A** jumps, but only from the ground,
- a **rock** slides in from the right every 1.5 seconds,
- a hit costs a **life** (three lives, then game over).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a485e1f19557.png?v=e81b84800e5f2f99)

:::


:::wider

## Change a trampoline

This acrobat never stops bouncing: the floor sets vy to **-180** instead of 0. Make the bounces higher, then make the trampoline a little higher up the screen (both numbers in the if must change).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does a jump need an if that checks the player is on the ground?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A jump only sets vy upwards. Without the check, every press of A jumps again, even in mid-air, so the player can fly.

:::

