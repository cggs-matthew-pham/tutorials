---
title: Every one of a kind, functions and parameters in 5 minutes
---
## The idea in plain words

**array of sprites of kind Enemy** gives a list of every enemy in the game right now, and a **for element** loop (in **Loops**) runs its blocks once for each one, so one press can freeze or destroy them all.

A **function** (in **Functions**, under Advanced) is a named job: some blocks with a name, such as *spawnBug*. Making it does not run it; a **call** block runs it, once per call. A **parameter** is an input the call hands in, such as `speed` in *spawnEnemy(speed)*, so one function can make a slow bug and a fast bug.

Students can also look at the **Python** view of their programs. The big idea: every event block (*on overlap*, *on A pressed*, *on game update every*) is a function, handed to the game to call when the event happens.

## Why programmers use them

A game cannot give every alien its own name: a list lets one block deal with all of them. Functions name a job once (make an enemy, make a coin), so it can be used from anywhere and fixed in one place.

## An everyday picture, and where it breaks

The list is the class roll: "everyone on the roll, stand up" works however many students there are today. A function is a recipe card: "make the sauce (see card 12)", and the parameter is "for 4 people" or "for 10".

Where they break: a roll is written once a term, but **array of sprites of kind** is a fresh roll every time it runs, so a new alien is on it straight away. And writing a recipe card does not cook anything until someone follows it, just as making a function does not run it until it is called.

## Try it yourself (5 minutes)

1. In Every one of a kind, press B with a few aliens on the screen.
2. In Functions, delete the call in on start and run: nothing appears.
3. In Parameters, change the number in one call, not inside the function, and run again.

## Questions students ask

- **"Why does only one alien freeze?"** The block is outside the for element loop, or it names a sprite, not the loop's value.
- **"Why doesn't my function do anything?"** Nothing calls it. Add a call block where the job should happen.
- **"Where is the call block?"** It appears in the Functions drawer once the function has been made.
- **"Why are all my bugs the same speed?"** The number is fixed inside the function. Use the parameter there, and put the numbers in the calls.

## How it connects

The next units use them all: a jump inside an if, a level-up in the event where the score changes, and a startLevel function that reads a list of speeds.
