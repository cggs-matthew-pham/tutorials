---
title: Projectiles, lists and functions in 5 minutes
---
## The idea in plain words

A **projectile** (in **Sprites**) is a sprite fired from another sprite, with a speed across and down. It has its own kind, **Projectile**, so the overlap that catches a hit names Projectile and Enemy, not Player. The engine removes a projectile once it leaves the screen.

A **list** holds many values in order under one name. **array of sprites of kind Enemy** gives a list of every enemy in the game right now, and a **for element** loop (in **Loops**) runs its blocks once for each one, so one press can freeze or destroy them all. A list can also hold numbers, such as the speeds for each level; each item has a **place** counted from **0**.

A **function** (in **Functions**, under Advanced) is a named job: some blocks with a name, such as *spawnEnemy*. Making it does not run it; a **call** block runs it, once per call. A **parameter** is an input the call hands in, such as `speed` in *spawnEnemy(speed)*, so one function can make a slow bug and a fast bug.

From this unit on, students also see the **Python** view of their programs. The big idea: every event block (*on overlap*, *on A pressed*, *on game update every*) is a function, handed to the game to call when the event happens.

## Why programmers use them

A game cannot give every shot and every alien its own name: lists let one block deal with all of them. Functions name a job once (make an enemy, make a coin, start a level), so it can be used from anywhere and fixed in one place.

## An everyday picture, and where it breaks

A list is the class roll: "everyone on the roll, stand up" works however many students there are today. A function is a recipe card: "make the sauce (see card 12)", and the parameter is "for 4 people" or "for 10".

Where they break: a roll is written once a term, but **array of sprites of kind** is a fresh roll every time it runs, so a new alien is on it straight away. And writing a recipe card does not cook anything until someone follows it, just as making a function does not run it until it is called.

## Try it yourself (5 minutes)

1. In the Projectiles lesson, fire at the alien with the A button (space on the keyboard). Then load the freeze version and press B (enter) with a few aliens on the screen.
2. In the Functions lesson, run the three bugs. Change one of the numbers in the calls and run again.
3. Press **Python** at the top of the editor and find `def` and `game.on_update_interval`.

## Questions students ask

- **"Why do my shots go straight through?"** The overlap names Player and Enemy. A shot is a Projectile.
- **"Why doesn't my function do anything?"** Nothing calls it. Add a call block where the job should happen.
- **"Where is the call block?"** It appears in the Functions drawer once the function has been made.
- **"Do I have to write the Python?"** No: it is there to read, so the step to text code later is smaller.

## How it connects

The next unit uses both: a list of speeds, one per level, and a *startLevel* function that sets each level up. The final challenge keeps rocks, shots and power-ups in kinds and lists.
