---
title: "Run out"
subtitle: "Arcade advanced skills · Power-ups · Lesson 9"
---

# Run out

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Ammo, fuel, a shield that flickers out: the best power-ups run out. Behind each one is a number counting down.


:::teacher-note

**In one sentence:** Students limit a blaster with a number that counts down, check it first so it never goes below zero, refill it with a star, and make a shield run out after 5 seconds.

**Students should be able to say:** I can limit an action with a number that counts down. I can check the number first, so it never goes below zero. I can make a power-up last a set time with a timer.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Look at the **on A pressed** block. Does anything ask whether there is ammo left?

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/302db759e7bf.png?v=f2075003e1aeb11c)

:::keep-together

**ammo starts at 3. You press A five times. What happens?**

☐ 5 shots fly, and the ship says -2

☐ 5 shots fly, and the ship says 3

☐ 3 shots fly, then the game ends

☐ 3 shots fly, then A does nothing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5 shots fly and ammo goes 2, 1, 0, -1, -2. Nothing checks there is ammo left, so the count goes below zero.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version checks first. Try to fire a fourth shot.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/1546b460e0d4.png?v=5860bcf7cfc41c0c)

:::keep-together

### Shots left

**This version fires only if ammo &gt; 0. Fill in each press of A.**

{{rows 1}}

| ammo before | a shot? | ammo after |
|---|---|---|
| 3 | yes | 2 |
| 1 |   |   |
| 0 |   |   |

:::


:::teacher-note

**Answer:** yes, 0, no, 0

At 0 the question ammo &gt; 0 is false, so nothing fires and nothing is taken away.

:::


:::keep-together

### Why > 0?

**Why ammo &gt; 0, and not ammo ≥ 0?**

☐ There is no difference

☐ ≥ is not allowed in Arcade

☐ &gt; 0 makes it fire faster

☐ With ≥ 0, a shot fires at 0 and ammo goes to -1: one shot too many

:::


:::teacher-note

**Answer:** With ≥ 0, a shot fires at 0 and ammo goes to -1: one shot too many

≥ 0 is still true at 0, so the last press fires a fourth shot and the count goes below zero.

:::


:::keep-together

### Lily's blaster

**Lily put the if around change ammo by -1 only, not around the shot. What happens after 3 shots?**

☐ A does nothing

☐ Shots keep firing, though ammo stays at 0

☐ The game ends

☐ Ammo goes below zero

:::


:::teacher-note

**Answer:** Shots keep firing, though ammo stays at 0

Only the count is checked. The shot is outside the if, so it fires on every press.

:::


:::typical

## Modify


**Refill.** A star **refills** the ammo to 5.

**Top up.** Now a star **adds 3** to what you have. Which is better for a player with 4 shots left?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Refill:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/e522b0c77f60.png?v=d00b64d61619a55e)

**Top up:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6d76cdb0a172.png?v=e9bb22d31900fd91)

:::

:::


## Mix it up


:::keep-together

**hunting is true. The player touches a ghost, and the overlap scores 5 and sets hunting to false. A second ghost touches a moment later. What happens?**

☐ hunting turns true again

☐ It scores 5 too

☐ Nothing happens

☐ It costs a life: hunting is now false

:::


:::teacher-note

**Answer:** It costs a life: hunting is now false

The first touch set hunting to false, so the if takes the else for the second ghost.

:::


## Make

The shield from last lesson. A new variable, `shieldTime`, is set to **5** when you catch a star.

1. Every second while the shield is on, take 1 off `shieldTime`.
2. When `shieldTime` reaches **0**, set `shield` to **false** and put the black background back.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a24a511ecb8a.png?v=c5faae414d64cccc)

:::


:::wider

## Change a sprint boost

A runner with a sprint boost on **B** (enter on the keyboard): 3 seconds of extra speed, then back to normal. Make it fair: only **3 boosts** for the whole game, counted down.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does the A event ask ammo &gt; 0 before it fires?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So it only fires while there are shots left. Without the check, ammo goes below zero and the shots never run out.

:::

