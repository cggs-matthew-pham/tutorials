---
title: "Space dodger"
subtitle: "MakeCode Arcade · Final challenge: Space dodger · Lesson 11"
---

# Space dodger

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Asteroids, Flappy Bird and every endless runner are the same game underneath: things come at you, you dodge, and the longer you last the better you score.


:::teacher-note

**In one sentence:** Students build a complete dodging game in three milestones, using a timer, random positions, velocity, overlaps, lives, score and the high score.

**Students should be able to say:** I can make sprites appear on a timer and move them with velocity. I can make a hit cost exactly one life by destroying what was hit. I can combine timers, overlaps, lives and score into a game, and use the high score.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The ship can only move up and down: `moveSprite(ship, 0, 100)` gives it no speed across.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b807e5156d67.png?v=c989dcc7a3408b12)

:::keep-together

**Where do the rocks fly across the screen?**

☐ From the left to the right

☐ All along the same line, through the middle

☐ They do not move

☐ At a different height each time

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** All along the same line. Every rock starts at (160, 60), so they all come through the middle, where the ship starts.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This is the working start of the game. Read it, and change numbers in the playground to test your answers.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b807e5156d67.png?v=c989dcc7a3408b12)

:::keep-together

### Who does what

Match each block with its job.

The timer in Python:

```python
def on_update_interval():
    global rock
    rock = sprites.create(img("""..."""), SpriteKind.enemy)
    rock.set_position(160, 60)
    rock.vx = -50
game.on_update_interval(1000, on_update_interval)
```

The timer is a function handed to the game, as in the Functions lesson. Blocks write this for you.

**Match each block with its job in the game.**

A. starts each rock at the right edge

B. lets the ship move up and down only

C. moves each rock left, every frame

D. makes a new rock every second

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `on game update every 1000 ms` | |
| `set rock position to (160, 60)` | |
| `set rock vx to -50` | |
| `move ship with buttons, vx 0, vy 100` | |

:::


:::teacher-note

**Answer:** on game update every 1000 ms → D. makes a new rock every second; set rock position to (160, 60) → A. starts each rock at the right edge; set rock vx to -50 → C. moves each rock left, every frame; move ship with buttons, vx 0, vy 100 → B. lets the ship move up and down only

The timer makes the rocks, the position says where each starts, and velocity keeps it moving. The ship's 0 across means left and right do nothing.

:::


:::keep-together

### How long to react?

**A rock starts at x 160 and moves 50 pixels left every second. The ship is at x 20. How many seconds does the rock take to reach the ship?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2.8

The rock travels 160 - 20 = 140 pixels at 50 pixels a second: 140 / 50 = 2.8 seconds. A bigger speed gives the player less time.

:::


:::keep-together

### Where do the rocks go?

**Ava plays for a minute. A rock goes past the ship and off the left edge. What happens to it?**

☐ It turns around

☐ It keeps flying left forever, off the screen, and the game keeps track of it

☐ It comes back on the right

☐ It is removed when it leaves the screen

:::


:::teacher-note

**Answer:** It keeps flying left forever, off the screen, and the game keeps track of it

Nothing destroys it, so it keeps moving off the screen. After a few minutes there are hundreds of rocks nobody can see. Milestone 1 fixes this.

:::


:::keep-together

### Leo's game

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4157f57f428e.png?v=ed56f0b2eaaa871f)

**Leo adds an overlap event for Player and Enemy that takes away a life, but forgets to destroy the rock. He starts with 3 lives. A rock touches his ship. What happens?**

☐ He loses all 3 lives almost at once and the game ends

☐ He loses 1 life and the rock flies on

☐ He loses 1 life and the rock disappears

☐ Nothing: the rock must be destroyed first

:::


:::teacher-note

**Answer:** He loses all 3 lives almost at once and the game ends

The overlap event runs every frame while the rock still touches the ship, about 30 times a second, so 3 lives go in a tenth of a second. Destroy the rock in the event.

:::


:::typical

## Milestone 1: rocks from anywhere

**Behind the code:** **set rock auto destroy on** (Sprites, the **set flag** block) tells the engine to remove the sprite as soon as it leaves the screen. Without it, every rock that missed the ship keeps flying forever.

1. Start each rock at a **random height**, from 10 to 110.
2. Set each rock to **auto destroy**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4d2551a6d19f.png?v=67875a37e794324b)

:::

:::


:::typical

## Milestone 2: lives and a hit

Give the player **3 lives**, and make a hit count:

- When the ship touches a rock, **destroy the rock** and **lose a life**.
- At zero lives, the game ends by itself.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ee1f21f4b385.png?v=130e9d73d6b786d6)

:::

:::


## Make: Milestone 3: score and high score

**Behind the code:** **high score** (in **Info**) is the best score so far in this browser. The game over screen shows it by itself; you can also use it in your blocks.

Finish the game:

- The score goes up by **1 every second** the player survives.
- Use **high score** to show the player when they are beating their best (a new background colour, a splash, or your own idea).
- Play three games. Does the game over screen show your best?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ba646a0e9097.png?v=46b513b25d3699b5)

:::


:::wider

## Change a road crossing

The same game turned on its side: cars drive across, and the chick scores by reaching the top. Make it yours. Ideas: faster cars as the score goes up, cars from both sides, a second lane of logs, or a short effect when a car hits (Sprites › Effects).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why must the rock be destroyed inside the overlap event?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The overlap event runs every frame the two sprites touch. Destroying the rock makes it touch once, so a hit costs one life, not all of them.

:::

