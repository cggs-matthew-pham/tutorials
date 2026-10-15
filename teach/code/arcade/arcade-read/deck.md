---
marp: true
theme: default
html: true
---

# Read a game

Arcade Foundations · Fire

<!-- Speaker note: Students read a whole game, match each job to its blocks, and change rules without breaking the game: a review of the course before the final challenge. About 40 minutes (Predict and Run 8 min · Investigate 12 min · Modify 8 min · Make 12 min). -->

---

## Today

**We are learning to** read a whole game, find the blocks that do each job, and change just the part you need.

- I can find the blocks that do a job in a game.
- I can change one rule without breaking the rest.
- I can add a new job in the right places.

<!-- Speaker note: Before class: This lesson adds nothing new. Garden defender uses every idea in the course: sprites and positions, the controller, velocity, kinds and overlaps, lives, a timer with pick random, an if in on game update, and projectiles. The skill is reading: find the blocks that do one job, then change only those. It prepares students for Space dodger, where they build a game in milestones. Teacher: The 'faster bugs' question separates how often (the timer) from how fast (vy): a common confusion. -->

---

## Why it matters

> Game makers spend more time reading code than writing it: to fix a bug or add a feature, you first find the blocks that do that job.

<!-- Speaker note: This is a whole game: **Garden defender**. Bugs fall on the garden; you move the gardener along the bottom and spray them with water. Every block in it is something you have already learned. Today you read it, find the blocks that do each job, and change the game without breaking it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/381feafc737d.png?v=a2e3af4c878e60bb)

**Read the on game update block. What happens when your score reaches 10?**

- The game ends with a win
- Nothing: on game update only runs at the start
- The background turns green
- The bugs fall faster

<!-- Speaker note: What happens: The background turns green. on game update asks 'is the score 10 or more?' every frame, so the colour changes the moment you reach 10. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the if in on game update, from lesson 7. Ask which block answers it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The background turns green. on game update asks 'is the score 10 or more?' every frame, so the colour changes the moment you reach 10.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/arcade/arcade-read/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-read/?full=step-2#step-2)

<!-- Speaker note: Move with the left and right arrows. Fire with **A** (space). Students should be able to say: I played until the background changed (or the game ended), and compared it with my prediction. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/381feafc737d.png?v=a2e3af4c878e60bb)

<!-- Speaker note: What this step is for: A game is a set of jobs, each done by its own blocks: find the blocks for a job before changing anything. -->

<!-- Speaker note: Teacher: the match is the map of the game. Keep it on the board for the rest of the lesson. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Jobs and blocks

**Match each job with the blocks that do it.**

| | |
|---|---|
| `a new bug every 800 ms, at a random x` | A. projectile from gardener with vy -100 |
| `the gardener moves left and right only` | B. move gardener with buttons 100, 0 |
| `water goes up when A is pressed` | C. on Player overlaps Enemy |
| `water that hits a bug scores` | D. on Projectile overlaps Enemy |
| `a bug that lands on you costs a life` | E. on game update every 800 ms |

* Answer: a new bug every 800 ms, at a random x → E. on game update every 800 ms; the gardener moves left and right only → B. move gardener with buttons 100, 0; water goes up when A is pressed → A. projectile from gardener with vy -100; water that hits a bug scores → D. on Projectile overlaps Enemy; a bug that lands on you costs a life → C. on Player overlaps Enemy

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Score and lives

**The game starts with 3 lives and a score of 0. Fill in the score and lives after each thing happens.**

| what happens | score | lives |
|---|---|---|
| (start) | 0 | 3 |
| water hits a bug | ? | ? |
| a bug lands on the gardener | ? | ? |
| a bug falls past, off the bottom | ? | ? |

* Answer: 1, 3, 1, 2, 1, 2

<!-- Speaker note: Only the overlap events change the score or lives. A bug that misses everything changes nothing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Faster bugs

**You want the bugs to fall faster. Which block do you change?**

- move gardener with buttons
- bug vy, inside the timer
- The 800 in the timer
- The projectile's vy

* Answer: bug vy, inside the timer

<!-- Speaker note: vy is the bug's speed down. The 800 sets how often bugs come, not how fast they fall. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Map the game <span style="font-size:.6em;color:#64748b">(5 min)</span>

On the board, draw a box for each job: make bugs, move, fire, hit, crash, change colour. Pairs come up and write the block for each.

<!-- Speaker note: Leave the map up: students use it to find where each change goes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **More bugs:** Make the bugs come **twice as often**.
- **Harsher bugs:** Make a bug that lands on the gardener cost **2** lives.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-read/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each rule lives in one place, so changing a rule means changing one or two blocks. Hints, in order: The timer's number sets how often. Half of 800 is 400. / Find the event for a bug landing on the gardener. Change the -1. For students who need more support: Give students the apple's timer already made, and ask them only to add the Player–Food overlap. For early finishers: Add a second timer that sends a fast bug every 5 seconds. Where does each part of it go? The hard part, on purpose: Finding the right block in a longer program. Ask them to name the job first, then point to its block. When students get stuck: The student changes the wrong block. Ask: Which job does that block do? Find it in the match. Fix: Use the map of jobs to find the block for the rule you want to change. / Apples appear but catching one does nothing. Ask: What kind are the apples, and which overlap did you add? Fix: Apples are Food; the overlap must be Player and Food. / Catching an apple gives many lives. Ask: What happens to the apple after the catch? Fix: Destroy it in the overlap, or the event runs every frame. -->

<!-- Speaker note: Teacher: each rule is one number in one block. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Add **one new job** to the game: an **apple** falls every few seconds, and catching it gives the gardener a life. Find where each part belongs: making it, moving it, and what a catch means.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-read/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: A second timer, on game update every 3000 ms: an apple of kind Food at a random x at the top, falling with vy. / A new overlap: Player and Food. Inside: change life by 1, destroy otherSprite. -->

<!-- Speaker note: Teacher: a new job touches three places: a timer to make apples, a velocity to move them, an overlap for the catch. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Swap and play <span style="font-size:.6em;color:#64748b">(4 min)</span>

Play the next pair's garden. Can you find their apple's three parts in the blocks?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In Garden defender, which block would you change to give the player 5 lives at the start?**

* set life to 3, in on start: change 3 to 5.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Space dodger, the final challenge, built in milestones with less help each time. -->
