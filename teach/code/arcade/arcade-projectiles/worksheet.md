---
title: "Projectiles and lists"
subtitle: "MakeCode Arcade · Collections and tools · Lesson 7"
---

# Projectiles and lists

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Space Invaders, Galaga and every 'shoot 'em up' since: you fire, and the game has to keep track of every shot and every alien on the screen at once.


:::teacher-note

**In one sentence:** Students fire projectiles with A, find that a projectile is its own kind, and use a list of every enemy with a for element loop to build a smart bomb.

**Students should be able to say:** I can fire a projectile from a sprite with the A button. I can explain why a hit needs a Projectile–Enemy overlap, not Player–Enemy. I can use array of sprites of kind and a for element loop to do something to every sprite of a kind.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The overlap event names two kinds: **Projectile** and **Enemy**.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/01f0f80665ac.png?v=ecb699160bda9997)

:::keep-together

**You press A (space on the keyboard) once, with the ship right under the alien. What happens?**

☐ Only the alien disappears

☐ The shot goes through the alien

☐ The shot and the alien both disappear, and the score goes up by 1

☐ The ship disappears

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The shot and the alien both disappear, and the score goes up by 1. The shot is a Projectile, the alien an Enemy, so the Projectile–Enemy overlap runs: sprite is the shot, otherSprite the alien.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ec0b8ec8c734.png?v=4c1018ab2e9791d0)

:::keep-together

### What does each part do?

**Match each part of this game with what it does.**

A. runs when any shot touches any alien

B. makes a new alien each second

C. the alien that was hit

D. the shot that hit

E. fires a shot straight up from the ship

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `projectile from ship with vx 0, vy -100` | |
| `on game update every 1000 ms` | |
| `on Projectile overlaps Enemy` | |
| `sprite (in the overlap)` | |
| `otherSprite (in the overlap)` | |

:::


:::teacher-note

**Answer:** projectile from ship with vx 0, vy -100 → E. fires a shot straight up from the ship; on game update every 1000 ms → B. makes a new alien each second; on Projectile overlaps Enemy → A. runs when any shot touches any alien; sprite (in the overlap) → D. the shot that hit; otherSprite (in the overlap) → C. the alien that was hit

:::


:::keep-together

### Freeze them all

**In this version, B freezes every alien: for each value in array of sprites of kind Enemy, set value vy to 0. There are 6 aliens on the screen when you press B. How many times does set value vy to 0 run?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 6

array of sprites of kind Enemy is a list of all 6 aliens. The for element loop runs its blocks once for each item in the list, with value as that alien: 6 times. Press B in the playground to see them all stop.

:::


:::keep-together

### Ben's shots

Ben's hit event:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5133dae914b2.png?v=405c63bd4ba12d99)

**Ben wrote his own hit event (below). He fires at the aliens, but every shot passes straight through. Why?**

☐ The overlap needs to be inside on A pressed

☐ A projectile is its own kind, Projectile, so a Player–Enemy overlap never notices a shot

☐ destroy only works on the player

☐ The shot is too fast to hit anything

:::


:::teacher-note

**Answer:** A projectile is its own kind, Projectile, so a Player–Enemy overlap never notices a shot

The shot is made by the ship, but it is not the ship: it is a sprite of kind Projectile. Ben's event waits for a Player to touch an Enemy, which only happens if the ship itself crashes into an alien. The first kind should be Projectile.

:::


:::typical

## Modify


**Make the shots work.** The shots in this game pass through everything. Add the overlap that turns a shot into a hit.

**Crash!.** Now the aliens can reach the ship without anything happening. Make a crash cost a life.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Make the shots work:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/782d85a8cd0d.png?v=b06f7f0630ace2b9)

**Crash!:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/58419b4bafb4.png?v=7e1a631a695ed9b7)

:::

:::


## Make

The aliens come twice as fast now. Make a **smart bomb** on the **B** button (enter on the keyboard):

- every alien on the screen is destroyed,
- you score **one point for each** alien.

Count the aliens before you press B, and check the score goes up by that many.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b3e11f7e4a2b.png?v=774e22db5333ebd3)

:::


:::wider

## Change a firework show

**A** launches a rocket; **B** makes every rocket in the sky burst off in a random direction. Make the rockets launch faster, and make **B** also change the background colour, so the sky flashes when they burst.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**There are 5 enemies on the screen. A for element loop over array of sprites of kind Enemy contains change score by 1. How much does the score go up?**

{{lines-3}}

:::


:::teacher-note

**Answer:** By 5. The list has 5 enemies, and the loop runs its blocks once for each one.

:::

