---
title: "Jump from the ground"
subtitle: "Arcade advanced skills · Platforms · Lesson 5"
---

# Jump from the ground

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In every platformer you can only jump when your feet are on something. Without that one rule, the player could climb the sky.


:::teacher-note

**In one sentence:** Students fix a jump that works in mid-air by putting it inside an if that checks the player is on the floor, then build a runner game.

**Students should be able to say:** I can make a jump that only works from the ground. I can explain why a jump needs that check. I can build a runner with gravity, a floor, a jump and obstacles.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Look at the **on A pressed** block. Does anything ask where the player is?

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2a50a788a823.png?v=e8c933e575867e1c)

:::keep-together

**You press A three times, quickly, one press after another. What does the player do?**

☐ Jumps three times, landing between each

☐ Jumps once; the other presses do nothing

☐ Jumps higher and higher, and can fly off the top of the screen

☐ Falls through the floor

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Each press sets vy to -150 again, even in mid-air, so the player keeps rising. Nothing checks whether the player is on the ground.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version has the fix. Try to fly with it.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/9da73ac66de2.png?v=386f517c5cf7360c)

:::keep-together

### Leo's jump

**Leo's player flies off the top when he presses A again and again. Why?**

☐ Nothing checks the player is on the ground, so every press jumps again, even in mid-air

☐ ay should be negative

☐ The floor pushes him up

☐ -150 is too big a number

:::


:::teacher-note

**Answer:** Nothing checks the player is on the ground, so every press jumps again, even in mid-air

A jump only sets vy to -150. Leo's A event does that on every press, wherever the player is, so each press in the air starts a new jump higher up.

:::


:::keep-together

### When does A jump?

**This version jumps only if player bottom ≥ 100. Fill in what a press of A does.**

{{rows 1}}

| player bottom when A is pressed | A does |
|---|---|
| 100 (on the floor) |   |
| 70 (rising) |   |
| 95 (falling, nearly down) |   |

:::


:::teacher-note

**Answer:** jumps, nothing, nothing

The floor puts the bottom at exactly 100. Anywhere above that, the player is in the air, so the if says no.

:::


:::keep-together

### Why 100?

**Why is the floor's bottom exactly 100 when the player is standing?**

☐ 100 is the bottom of the screen

☐ The jump sets it

☐ The floor if sets it back to 100 every frame the player sinks below it

☐ Gravity stops at 100

:::


:::teacher-note

**Answer:** The floor if sets it back to 100 every frame the player sinks below it

Every frame, if the bottom has gone past 100, the floor if puts it back at 100: so standing means bottom is 100.

:::


:::typical

## Modify


**No flying.** This is Leo's game. Fix it: **A** only jumps when the player is **on the ground**.

**Moon jump.** Change the jump speed and the gravity. Pick the pair you like best.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**No flying:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/9da73ac66de2.png?v=386f517c5cf7360c)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5347e4966529.png?v=b86f9c9522b8e2a4)

:::keep-together

**A sprite starts still with ay 200. What is its vy after 1.5 seconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 300

Gravity adds 200 every second: 1.5 × 200 = 300.

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8ccc7445aae6.png?v=0372db0c8398f967)

:::


:::wider

## Change a kangaroo

This kangaroo hops across a field, but only from the ground. Make it a moon kangaroo: weaker gravity and a gentler jump. Can it still only jump from the ground?

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

