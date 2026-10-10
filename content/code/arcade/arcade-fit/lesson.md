---
order: 13
unit: challenge
title: Will it work in Arcade?
summary: Work out which games Arcade is built for, which take extra work, and which it cannot really do, then pitch and prototype a game that fits.
language: makecode
explainPicture: fit.ts#predict
hook: "Game studios choose an engine before they choose a game: a racing game, a card game and a platformer each need different tools. Picking the wrong one costs months."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@fit.ts#predict", lesson: "code/arcade/arcade-fit", target: "arcade" }
  caption: "Which games suit Arcade?"
  say: "A game suits Arcade when it's made from the engine's building blocks."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Built for it: catch, dodge, shooters, runners, mazes, platformers."
        say: "Built for it: catch, dodge, shooters, runners, mazes and platformers."
    - caption:
        text: "Possible with work: cards, quizzes, turning cars."
        say: "Possible with work: card games, quizzes, turning cars."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Not a good fit: 3D, real physics, detailed art."
        say: "Not a good fit: 3D, real physics, or detailed art."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A **game engine** is the part of a game tool that does the work for you. In this course you have used Arcade's engine every lesson: it moves sprites by their speed, notices overlaps, keeps score and lives, and ends the game.

Arcade's **building blocks** so far: **sprites** and their **kinds**, the **controller**, **position and velocity** (and gravity), **overlap events**, **score, lives and countdown**, **timers** and **every frame**, **projectiles**, and **lists of sprites**. A game Arcade does well is made almost entirely from these. A game that needs something else is harder, or not a good fit.

## Predict

```step
stage: predict
code: fit.ts#predict
check:
  type: predict
  q: "This whole catching game is about 15 blocks. Which idea could you build quickest from the same building blocks?"
  options: ["Dodge falling rocks", "A 3D kart racer", "Chess played with the mouse", "A tower of crates that topples over"]
  actual: "Dodge falling rocks: it needs exactly the same building blocks (a sprite on the controller, things falling on a timer, an overlap), with a life lost instead of a point won. The other three each need something Arcade does not have built in."
```

Read the blocks. Each group is one building block of the game.

## Run

```step
stage: run
code: fit.ts#predict
try: { playground: arcade, starter: "fit.ts#predict" }
check: { type: reflect, text: "I played the catcher and found each building block: the sprite, the controller, the timer, the falling speed and the overlap." }
```

Catch some apples with the arrow keys. Then point to the block that does each job.

## Investigate

```step
stage: investigate
code: fit.ts#crates
insight: "A game suits Arcade when it is made from the engine's building blocks. When it needs something the engine does not have (3D, a mouse, real physics, rotation), you either build that part yourself from the blocks, or choose a different idea."
try: { playground: arcade, starter: "fit.ts#crates" }
tasks:
  - check:
      type: match
      q: "Match each game idea with the building blocks it needs most."
      pairs:
        - ["Catch falling fruit", "a timer, falling speed and an overlap"]
        - ["A space shooter", "projectiles, kinds and lives"]
        - ["A platformer", "gravity, jumping and tile floors and walls"]
        - ["Pong for two players", "two players on one keyboard and bounce on wall"]
        - ["A zombie that hunts you", "comparing positions every frame, or follow"]
  - check:
      type: match
      q: "How well does Arcade fit each idea? Match each idea with its verdict and the reason."
      pairs:
        - ["Collect keys in a maze", "Built for it: tilemaps make the walls, overlaps collect the keys"]
        - ["Chess or a card game", "Possible with work: no mouse, so you move a cursor with the controller"]
        - ["A car that drives round corners", "Possible with work: sprites cannot rotate, so you draw a picture for each direction"]
        - ["A 3D kart racer", "Not a good fit: Arcade is only 2D, 160 × 120 pixels"]
        - ["Angry Birds with towers that topple", "Not a good fit: there is no physics engine that makes things push and tumble"]
  - check:
      type: question
      q: "Ben is testing a toppling-tower game. He stacks two crates and drops a ball on them with gravity. The ball falls straight through the crates and off the screen. Why?"
      options: ["The ball is too fast to hit anything", "An overlap is only an event: nothing pushes or stops a sprite unless your blocks do it, and Ben has no overlap event at all", "Crates must be of kind Enemy to be solid", "Gravity only works on the player"]
      answer: 1
      fault: design
      misconception: overlap-not-collision
      explain: "Sprites pass through each other. An overlap tells your blocks that two sprites touch; then your blocks decide what happens. Stopping a ball is a few blocks (like the floor you built in Gravity and jumping), but stacking and toppling like real objects needs a physics engine, which Arcade does not have."
```

This program is Ben's test. Run it and watch the ball.

### What does it need?

Every game idea is a recipe of building blocks.

### Fit or not?

Three verdicts: **built for it**, **possible with work**, **not a good fit**.

### Ben's tower

Run the program in the playground, and watch the ball.

## Modify

```step
stage: modify
insight: "Many games are the same engine with one building block changed: swap a kind and a point becomes a danger; add a projectile and a dodger becomes a shooter."
try: { playground: arcade, starter: "fit.ts#modify" }
tasks:
  - hint: ["Change the falling sprite's kind from Food to Enemy, and draw a rock.", "The overlap needs Player and Enemy now. Swap change score for change life by -1 (in Info)."]
    check: { type: code, text: "Turn the catcher into a dodger: rocks of kind Enemy fall, and touching one costs a life.", rules: { contains: ["SpriteKind.Enemy)", "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy", "info.changeLifeBy(-1)"] } }
  - hint: ["On A pressed (Controller): projectile from basket, with vy -100 so it flies up.", "Add an overlap for Projectile and Enemy: destroy both, and add a point."]
    check: { type: code, text: "Turn the dodger into a shooter: A fires upwards, and a shot that hits a rock destroys it and scores.", rules: { contains: ["createProjectileFromSprite(", "sprites.onOverlap(SpriteKind.Projectile,SpriteKind.Enemy"] } }
```

### Catcher to dodger

Change **one building block**: the apples become rocks of kind **Enemy**, and catching one now costs a life.

### Dodger to shooter

Add **one more building block**: a projectile. Now you can fight back.

Three genres, nearly the same blocks. That is what "Arcade is built for it" means.

## Make

```step
stage: make
try: { playground: arcade, starter: "fit.ts#make" }
tasks:
  - hint: ["Genre: what kind of game is it (catch, dodge, shooter, maze, platformer, sport)?", "Building blocks: list the ones from the top of this lesson that your game needs.", "The hard part: the one thing Arcade has no block for. Your workaround: how you will build it, or change the idea."]
    check: { type: reflect, text: "I wrote a pitch card: the genre, the building blocks, the hard part and my workaround. Someone else read it and agreed it fits Arcade." }
  - hint: ["Start with the player and the controller, then one other sprite and an overlap.", "Score or lives come from Info. Leave everything else for later."]
    check: { type: code, text: "A one-screen prototype of your game's core: a player, at least one other sprite, an overlap, and a score or lives.", rules: { count: { "sprites.create(": 2 }, contains: ["controller.", "sprites.onOverlap(", "info."] } }
```

### Pitch card

Write a **pitch card** for a game of your own, on paper or in a document:

- **Genre** and a one-line idea (*"a bee collects flowers before winter comes"*)
- **Building blocks** it needs
- **The hard part**: the one thing Arcade has no block for
- **Your workaround**: build it from the blocks, or change the idea so it fits

Swap with a partner. If their game needs 3D, real physics or a mouse, help them find a version that fits.

### Prototype

Build only the **core** of your game: the player, one other sprite and what happens when they touch. No levels, no polish. If you do the optional lesson **Your own game**, you will grow this prototype into a full game.

## Change a car that turns

```step
stage: modify
try: { playground: arcade, starter: "fit.ts#car" }
```

Arcade sprites cannot rotate, so this car **swaps pictures** instead: left and right each show the car facing that way. Add **up** and **down** pictures too (draw the car from above). This is "possible with work": the engine has no turn block, so you build turning from blocks it does have.
