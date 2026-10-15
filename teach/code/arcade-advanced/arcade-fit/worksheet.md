---
title: "Will it work in Arcade?"
subtitle: "Arcade advanced skills · Final challenge: Power-ups and your own game · Lesson 11"
---

# Will it work in Arcade?

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Game studios choose an engine before they choose a game: a racing game, a card game and a platformer each need different tools. Picking the wrong one costs months.


:::teacher-note

**In one sentence:** Students judge which games suit Arcade by the building blocks each game needs, see that sprites pass through each other, change one building block to change a game's genre, then pitch and prototype a game that fits.

**Students should be able to say:** I can list Arcade's building blocks and name the ones a game needs. I can say whether a game idea is built for Arcade, possible with work, or not a good fit, and why. I can explain why sprites pass through each other in Arcade. I can pitch a game that fits Arcade and prototype its core.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the blocks. Each group is one building block of the game.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6f24f9126715.png?v=2fe0899e07a99972)

:::keep-together

**This whole catching game is about 15 blocks. Which idea could you build quickest from the same building blocks?**

☐ Chess played with the mouse

☐ A tower of crates that topples over

☐ Dodge falling rocks

☐ A 3D kart racer

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Dodge falling rocks: it needs exactly the same building blocks (a sprite on the controller, things falling on a timer, an overlap), with a life lost instead of a point won. The other three each need something Arcade does not have built in.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This program is Ben's test. Run it and watch the ball.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0c343a783bcf.png?v=f9504b9bf6bb1b80)

:::keep-together

### What does it need?

**Match each game idea with the building blocks it needs most.**

A. gravity, jumping and tile floors and walls

B. projectiles, kinds and lives

C. comparing positions every frame, or follow

D. two players on one keyboard and bounce on wall

E. a timer, falling speed and an overlap

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `Catch falling fruit` | |
| `A space shooter` | |
| `A platformer` | |
| `Pong for two players` | |
| `A zombie that hunts you` | |

:::


:::teacher-note

**Answer:** Catch falling fruit → E. a timer, falling speed and an overlap; A space shooter → B. projectiles, kinds and lives; A platformer → A. gravity, jumping and tile floors and walls; Pong for two players → D. two players on one keyboard and bounce on wall; A zombie that hunts you → C. comparing positions every frame, or follow

:::


:::keep-together

### Fit or not?

**How well does Arcade fit each idea? Match each idea with its verdict and the reason.**

A. Not a good fit: Arcade is only 2D, 160 × 120 pixels

B. Possible with work: sprites cannot rotate, so you draw a picture for each direction

C. Built for it: tilemaps make the walls, overlaps collect the keys

D. Not a good fit: there is no physics engine that makes things push and tumble

E. Possible with work: no mouse, so you move a cursor with the controller

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `Collect keys in a maze` | |
| `Chess or a card game` | |
| `A car that drives round corners` | |
| `A 3D kart racer` | |
| `Angry Birds with towers that topple` | |

:::


:::teacher-note

**Answer:** Collect keys in a maze → C. Built for it: tilemaps make the walls, overlaps collect the keys; Chess or a card game → E. Possible with work: no mouse, so you move a cursor with the controller; A car that drives round corners → B. Possible with work: sprites cannot rotate, so you draw a picture for each direction; A 3D kart racer → A. Not a good fit: Arcade is only 2D, 160 × 120 pixels; Angry Birds with towers that topple → D. Not a good fit: there is no physics engine that makes things push and tumble

:::


:::keep-together

### Ben's tower

**Ben is testing a toppling-tower game. He stacks two crates and drops a ball on them with gravity. The ball falls straight through the crates and off the screen. Why?**

☐ Gravity only works on the player

☐ The ball is too fast to hit anything

☐ Crates must be of kind Enemy to be solid

☐ An overlap is only an event: nothing pushes or stops a sprite unless your blocks do it, and Ben has no overlap event at all

:::


:::teacher-note

**Answer:** An overlap is only an event: nothing pushes or stops a sprite unless your blocks do it, and Ben has no overlap event at all

Sprites pass through each other. An overlap tells your blocks that two sprites touch; then your blocks decide what happens. Stopping a ball is a few blocks (like the floor you built in Gravity and jumping), but stacking and toppling like real objects needs a physics engine, which Arcade does not have.

:::


:::typical

## Modify


**Catcher to dodger.** Change **one building block**: the apples become rocks of kind **Enemy**, and catching one now costs a life.

**Dodger to shooter.** Add **one more building block**: a projectile. Now you can fight back.

Three genres, nearly the same blocks. That is what "Arcade is built for it" means.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Catcher to dodger:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0a7ffd8b9444.png?v=a1d6fa4e5fefb60e)

**Dodger to shooter:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/45e54cde8465.png?v=08b39874282c6523)

:::

:::


## Make


**Pitch card.** Write a **pitch card** for a game of your own, on paper or in a document:

- **Genre** and a one-line idea (*"a bee collects flowers before winter comes"*)
- **Building blocks** it needs
- **The hard part**: the one thing Arcade has no block for
- **Your workaround**: build it from the blocks, or change the idea so it fits

Swap with a partner. If their game needs 3D, real physics or a mouse, help them find a version that fits.

**Prototype.** Build only the **core** of your game: the player, one other sprite and what happens when they touch. No levels, no polish. If you do the optional lesson **Your own game**, you will grow this prototype into a full game.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Prototype:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8f19c4389549.png?v=dbe4f1d6fefbb1a7)

:::


:::wider

## Change a car that turns

Arcade sprites cannot rotate, so this car **swaps pictures** instead: left and right each show the car facing that way. Add **up** and **down** pictures too (draw the car from above). This is "possible with work": the engine has no turn block, so you build turning from blocks it does have.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Name one game Arcade is built for and one that is not a good fit, with a reason for each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: a space shooter is built for it (projectiles, kinds and lives are built-in blocks); Angry Birds is not a good fit (sprites do not push or topple; there is no physics engine).

:::

