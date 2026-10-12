---
marp: true
theme: default
html: true
---

# Will it work in Arcade?

MakeCode Arcade · Final challenge: Space dodger

<!-- Speaker note: Students judge which games suit Arcade by the building blocks each game needs, see that sprites pass through each other, change one building block to change a game's genre, then pitch and prototype a game that fits. About 50 minutes (Predict and Run 8 min · Investigate 12 min · Modify 12 min · Pitch card and prototype 15 min · Car 3 min). -->

---

## Today

**We are learning to** work out which games Arcade is built for, which take extra work, and which it cannot really do, then pitch and prototype a game that fits.

- I can list Arcade's building blocks and name the ones a game needs.
- I can say whether a game idea is built for Arcade, possible with work, or not a good fit, and why.
- I can explain why sprites pass through each other in Arcade.
- I can pitch a game that fits Arcade and prototype its core.

<!-- Speaker note: Before class: A **game engine** is the part of a game tool that does common jobs for you. Arcade's engine moves sprites by their speed and gravity, notices overlaps, keeps score, lives and a countdown, runs timers, fires projectiles and (outside this course) draws tilemaps: walls, floors and a scrolling camera made in a tile editor. The rule of thumb for students: **a game suits Arcade when it is made of those building blocks.** - **Built for it:** catch and collect, dodge, top-down shooters, endless runners, single-screen sports such as pong, mazes and top-down adventures, side-scrolling platformers, two to four players on one keyboard. - **Possible with work:** quizzes and stories (the screen is small), card and board games (no mouse: move a cursor with the controller), role-playing games with inventories, turning cars or ships (sprites do not rotate: draw a picture per direction), sprites that bounce off each other (you code it), saving more than the high score. - **Not a good fit:** 3D, realistic physics (stacking, toppling, Angry Birds), detailed art, hundreds of moving sprites (it slows down), typing-heavy games, real-world data, and online play inside our lessons (MakeCode has its own online multiplayer with a join code, but it needs MakeCode's sharing, which our embedded editor switches off). The key fact behind "realistic physics": an **overlap is only an event**. Sprites pass through each other unless blocks move or destroy them. The challenge primer has the full table. These engine facts were written from knowledge of Arcade; check anything a student disputes in the live editor. Teacher: Car: a worked example of 'possible with work'. -->

---

## Why it matters

> Game studios choose an engine before they choose a game: a racing game, a card game and a platformer each need different tools. Picking the wrong one costs months.

<!-- Speaker note: A **game engine** is the part of a game tool that does the work for you. In this course you have used Arcade's engine every lesson: it moves sprites by their speed, notices overlaps, keeps score and lives, and ends the game. Arcade's **building blocks** so far: **sprites** and their **kinds**, the **controller**, **position and velocity** (and gravity), **overlap events**, **score, lives and countdown**, **timers** and **every frame**, **projectiles**, and **lists of sprites**. A game Arcade does well is made almost entirely from these. A game that needs something else is harder, or not a good fit. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6f24f9126715.png?v=2fe0899e07a99972)

**This whole catching game is about 15 blocks. Which idea could you build quickest from the same building blocks?**

- Dodge falling rocks
- A 3D kart racer
- A tower of crates that topples over
- Chess played with the mouse

<!-- Speaker note: What happens: Dodge falling rocks: it needs exactly the same building blocks (a sprite on the controller, things falling on a timer, an overlap), with a life lost instead of a point won. The other three each need something Arcade does not have built in. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most pick the dodger. Ask why the other three are hard; collect reasons on the board (3D, mouse, physics). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Dodge falling rocks: it needs exactly the same building blocks (a sprite on the controller, things falling on a timer, an overlap), with a life lost instead of a point won. The other three each need something Arcade does not have built in.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-fit/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-fit/?full=step-2#step-2)

<!-- Speaker note: Catch some apples with the arrow keys. Then point to the block that does each job. Students should be able to say: I played the catcher and found each building block: the sprite, the controller, the timer, the falling speed and the overlap. -->

<!-- Speaker note: Teacher: name each building block aloud as students point at it. Keep the list visible for the pitch card. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/0c343a783bcf.png?v=f9504b9bf6bb1b80)

<!-- Speaker note: This program is Ben's test. Run it and watch the ball. What this step is for: A game suits Arcade when it is made from the engine's building blocks. When it needs something the engine does not have (3D, a mouse, real physics, rotation), you either build that part yourself from the blocks, or choose a different idea. -->

<!-- Speaker note: Teacher: the first match is recipes; the second is verdicts. Ben's tower shows the biggest limit: sprites do not push each other. Contrast with the floor students built in Gravity and jumping: stopping one sprite is easy, real physics is not. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does it need?

**Match each game idea with the building blocks it needs most.**

| | |
|---|---|
| `Catch falling fruit` | A. gravity, jumping and tile floors and walls |
| `A space shooter` | B. projectiles, kinds and lives |
| `A platformer` | C. comparing positions every frame, or follow |
| `Pong for two players` | D. two players on one keyboard and bounce on wall |
| `A zombie that hunts you` | E. a timer, falling speed and an overlap |

* Answer: Catch falling fruit → E. a timer, falling speed and an overlap; A space shooter → B. projectiles, kinds and lives; A platformer → A. gravity, jumping and tile floors and walls; Pong for two players → D. two players on one keyboard and bounce on wall; A zombie that hunts you → C. comparing positions every frame, or follow

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Fit or not?

**How well does Arcade fit each idea? Match each idea with its verdict and the reason.**

| | |
|---|---|
| `Collect keys in a maze` | A. Not a good fit: Arcade is only 2D, 160 × 120 pixels |
| `Chess or a card game` | B. Possible with work: sprites cannot rotate, so you draw a picture for each direction |
| `A car that drives round corners` | C. Built for it: tilemaps make the walls, overlaps collect the keys |
| `A 3D kart racer` | D. Not a good fit: there is no physics engine that makes things push and tumble |
| `Angry Birds with towers that topple` | E. Possible with work: no mouse, so you move a cursor with the controller |

* Answer: Collect keys in a maze → C. Built for it: tilemaps make the walls, overlaps collect the keys; Chess or a card game → E. Possible with work: no mouse, so you move a cursor with the controller; A car that drives round corners → B. Possible with work: sprites cannot rotate, so you draw a picture for each direction; A 3D kart racer → A. Not a good fit: Arcade is only 2D, 160 × 120 pixels; Angry Birds with towers that topple → D. Not a good fit: there is no physics engine that makes things push and tumble

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ben's tower

**Ben is testing a toppling-tower game. He stacks two crates and drops a ball on them with gravity. The ball falls straight through the crates and off the screen. Why?**

- The ball is too fast to hit anything
- Crates must be of kind Enemy to be solid
- An overlap is only an event: nothing pushes or stops a sprite unless your blocks do it, and Ben has no overlap event at all
- Gravity only works on the player

* Answer: An overlap is only an event: nothing pushes or stops a sprite unless your blocks do it, and Ben has no overlap event at all

<!-- Speaker note: Sprites pass through each other. An overlap tells your blocks that two sprites touch; then your blocks decide what happens. Stopping a ball is a few blocks (like the floor you built in Gravity and jumping), but stacking and toppling like real objects needs a physics engine, which Arcade does not have. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Catcher to dodger:** Change **one building block**: the apples become rocks of kind **Enemy**, and catching one now costs a life.
- **Dodger to shooter:** Add **one more building block**: a projectile. Now you can fight back. Three genres, nearly the same blocks. That is what "Arcade is built for it" means.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-fit/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Many games are the same engine with one building block changed: swap a kind and a point becomes a danger; add a projectile and a dodger becomes a shooter. Hints, in order: Change the falling sprite's kind from Food to Enemy, and draw a rock. / The overlap needs Player and Enemy now. Swap change score for change life by -1 (in Info). / On A pressed (Controller): projectile from basket, with vy -100 so it flies up. / Add an overlap for Projectile and Enemy: destroy both, and add a point. For students who need more support: Give students a pitch card template with the building blocks listed as tick boxes, and three example ideas to choose from (catch, dodge, maze). For early finishers: Pick a famous game and write two pitch cards: one for a version that fits Arcade, and a list of what would have to change. Or prototype the hard part first: a cursor moved with the controller for a board game. The hard part, on purpose: Letting go of a dream game that Arcade can't make, and finding its core. Ask what the fun part is in one sentence and which building blocks it needs. When students get stuck: A student's dream game is 3D, online or physics-heavy. Ask: What is the fun part of that game, in one sentence? Fix: Keep the fun part and change the form: a top-down 2D racer instead of a 3D one; a 'knock the cans' game where hit crates are destroyed instead of toppling. / The dodger's rocks still give points. Ask: Which kinds does the overlap block name? Fix: It must be Player and Enemy, and the falling sprite must be made of kind Enemy too. / Shots pass through the rocks. Ask: What kind is a projectile? Fix: Projectile. Add an overlap for Projectile and Enemy (a spiral from Projectiles and lists). -->

<!-- Speaker note: Teacher: two small changes give three genres. This is the lesson's main point: genres are recombinations of the same blocks. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make



- **Pitch card:** Write a **pitch card** for a game of your own, on paper or in a document: - **Genre** and a one-line idea (*"a bee collects flowers before winter comes"*) - **B
- **Prototype:** Build only the **core** of your game: the player, one other sprite and what happens when they touch. No levels, no polish. If you do the optional lesson **Your 

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-fit/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Genre: what kind of game is it (catch, dodge, shooter, maze, platformer, sport)? / Building blocks: list the ones from the top of this lesson that your game needs. / The hard part: the one thing Arcade has no block for. Your workaround: how you will build it, or change the idea. / Start with the player and the controller, then one other sprite and an overlap. / Score or lives come from Info. Leave everything else for later. -->

<!-- Speaker note: Teacher: pitch cards first, on paper. Partners check each other for 'needs 3D, physics or a mouse'. The prototype is deliberately small. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a car that turns

Arcade sprites cannot rotate, so this car **swaps pictures** instead: left and right each show the car facing that way. Add **up** and **down** pictures too (draw the car from above). This is "possible with work": the engine has no turn block, so you build turning from blocks it does have.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-fit/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name one game Arcade is built for and one that is not a good fit, with a reason for each.**

* For example: a space shooter is built for it (projectiles, kinds and lives are built-in blocks); Angry Birds is not a good fit (sprites do not push or topple; there is no physics engine).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The optional lesson Your own game grows the prototype into a game in milestones. Beyond the course: tilemaps for mazes and platformers, animation frames, and extensions. Games in text code (microStudio) and 3D engines are the next step for games Arcade cannot do. -->
