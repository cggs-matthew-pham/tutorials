---
title: "Projectiles"
subtitle: "Arcade Foundations · Fire · Lesson 9"
---

# Projectiles

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Space Invaders, Galaga and every 'shoot 'em up' since: you fire, and the game has to notice when a shot hits.


:::teacher-note

**In one sentence:** Students fire projectiles with A and find that a projectile is its own kind, so a hit needs a Projectile–Enemy overlap.

**Students should be able to say:** I can fire a projectile from a sprite with the A button. I can explain why a hit needs a Projectile–Enemy overlap, not Player–Enemy. I can make a crash and a hit do different things.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The overlap event names two kinds: **Projectile** and **Enemy**.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/01f0f80665ac.png?v=ecb699160bda9997)

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


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ec0b8ec8c734.png?v=4c1018ab2e9791d0)

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

### A missed shot

**A shot misses every alien and flies off the top of the screen. What happens to it?**

☐ It keeps flying for ever, off the screen

☐ The engine removes it

☐ It comes back at the bottom

☐ It turns into an alien

:::


:::teacher-note

**Answer:** The engine removes it

A projectile is removed by the engine as soon as it leaves the screen, so missed shots do not pile up.

:::


:::keep-together

### Ben's shots

Ben's hit event:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5133dae914b2.png?v=405c63bd4ba12d99)

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/782d85a8cd0d.png?v=b06f7f0630ace2b9)

**Crash!:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/58419b4bafb4.png?v=7e1a631a695ed9b7)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6132064a0c4f.png?v=03c6438ef2599423)

:::keep-together

**The cat is at x 100 and the mouse at x 40. Which way does the cat go?**

☐ Both ways at once

☐ It stops

☐ Left (vx is set to -40)

☐ Right (vx is set to 40)

:::


:::teacher-note

**Answer:** Left (vx is set to -40)

Is cat x (100) less than mouse x (40)? No, so the else part runs: vx -40, to the left, towards the mouse.

:::


## Make

The aliens fall already. Make it a **shooter**:

- **A** fires a shot straight **up** from the ship
- a shot that hits an alien destroys **both** and scores **1**

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/fbcf53e486c8.png?v=a5140b1ea1a6e561)

:::


:::wider

## Change a firework show

**A** launches a rocket into the night sky. Make the rockets launch faster, then make **B** launch a rocket that goes up at a slant.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A shot hits an alien, but the game has only a Player–Enemy overlap event. What happens, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing. The shot is of kind Projectile, so a Player–Enemy event never runs for it.

:::

