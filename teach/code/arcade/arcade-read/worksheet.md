---
title: "Read a game"
subtitle: "Arcade Foundations · Fire · Lesson 10"
---

# Read a game

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Game makers spend more time reading code than writing it: to fix a bug or add a feature, you first find the blocks that do that job.


:::teacher-note

**In one sentence:** Students read a whole game, match each job to its blocks, and change rules without breaking the game: a review of the course before the final challenge.

**Students should be able to say:** I can find the blocks that do a job in a game. I can change one rule without breaking the rest. I can add a new job in the right places.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the blocks before you play.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/381feafc737d.png?v=a2e3af4c878e60bb)

:::keep-together

**Read the on game update block. What happens when your score reaches 10?**

☐ The game ends with a win

☐ Nothing: on game update only runs at the start

☐ The background turns green

☐ The bugs fall faster

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The background turns green. on game update asks 'is the score 10 or more?' every frame, so the colour changes the moment you reach 10.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/381feafc737d.png?v=a2e3af4c878e60bb)

:::keep-together

### Jobs and blocks

**Match each job with the blocks that do it.**

A. projectile from gardener with vy -100

B. move gardener with buttons 100, 0

C. on Player overlaps Enemy

D. on Projectile overlaps Enemy

E. on game update every 800 ms

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `a new bug every 800 ms, at a random x` | |
| `the gardener moves left and right only` | |
| `water goes up when A is pressed` | |
| `water that hits a bug scores` | |
| `a bug that lands on you costs a life` | |

:::


:::teacher-note

**Answer:** a new bug every 800 ms, at a random x → E. on game update every 800 ms; the gardener moves left and right only → B. move gardener with buttons 100, 0; water goes up when A is pressed → A. projectile from gardener with vy -100; water that hits a bug scores → D. on Projectile overlaps Enemy; a bug that lands on you costs a life → C. on Player overlaps Enemy

:::


:::keep-together

### Score and lives

**The game starts with 3 lives and a score of 0. Fill in the score and lives after each thing happens.**

{{rows 1}}

| what happens | score | lives |
|---|---|---|
| (start) | 0 | 3 |
| water hits a bug |   |   |
| a bug lands on the gardener |   |   |
| a bug falls past, off the bottom |   |   |

:::


:::teacher-note

**Answer:** 1, 3, 1, 2, 1, 2

Only the overlap events change the score or lives. A bug that misses everything changes nothing.

:::


:::keep-together

### Faster bugs

**You want the bugs to fall faster. Which block do you change?**

☐ move gardener with buttons

☐ bug vy, inside the timer

☐ The 800 in the timer

☐ The projectile's vy

:::


:::teacher-note

**Answer:** bug vy, inside the timer

vy is the bug's speed down. The 800 sets how often bugs come, not how fast they fall.

:::


:::typical

## Modify


**More bugs.** Make the bugs come **twice as often**.

**Harsher bugs.** Make a bug that lands on the gardener cost **2** lives.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**More bugs:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a8bd6c876d2f.png?v=2663c615178b9901)

**Harsher bugs:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f84f48f01ac1.png?v=110d6d93009d9d8b)

:::

:::


## Make

Add **one new job** to the game: an **apple** falls every few seconds, and catching it gives the gardener a life. Find where each part belongs: making it, moving it, and what a catch means.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bb7ae6712f46.png?v=574d5362ce66a945)

:::


## Exit ticket

:::keep-together

**In Garden defender, which block would you change to give the player 5 lives at the start?**

{{lines-3}}

:::


:::teacher-note

**Answer:** set life to 3, in on start: change 3 to 5.

:::

