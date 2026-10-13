---
order: 11
unit: challenge
reviews: [touch-of-kinds, engine-moves-it, gravity-pulls, remember-state]
assumes: [variable, random, if, else, function, variable-update, list, list-index, bool-value, for-of]
title: Will it work in Arcade?
summary: Work out which games Arcade is built for, which take extra work, and which it cannot really do, then pitch and prototype a game that fits.
language: makecode
explainPicture: lesson.ts#predict
hook: "Game studios choose an engine before they choose a game: a racing game, a card game and a platformer each need different tools. Picking the wrong one costs months."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade-advanced/arcade-fit", target: "arcade" }
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
code: lesson.ts#predict
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
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I played the catcher and found each building block: the sprite, the controller, the timer, the falling speed and the overlap." }
```

Catch some apples with the arrow keys. Then point to the block that does each job.

## Investigate

```step
stage: investigate
code: lesson.ts#crates
insight: "A game suits Arcade when it is made from the engine's building blocks. When it needs something the engine does not have (3D, a mouse, real physics, rotation), you either build that part yourself from the blocks, or choose a different idea."
try: { playground: arcade, starter: "lesson.ts#crates" }
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
try: { playground: arcade, starter: "lesson.ts#modify" }
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
try: { playground: arcade, starter: "lesson.ts#make" }
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
try: { playground: arcade, starter: "lesson.ts#car" }
```

Arcade sprites cannot rotate, so this car **swaps pictures** instead: left and right each show the car facing that way. Add **up** and **down** pictures too (draw the car from above). This is "possible with work": the engine has no turn block, so you build turning from blocks it does have.

```teacher
summary: Students judge which games suit Arcade by the building blocks each game needs, see that sprites pass through each other, change one building block to change a game's genre, then pitch and prototype a game that fits.
time: 50
timing: "Predict and Run 8 min · Investigate 12 min · Modify 12 min · Pitch card and prototype 15 min · Car 3 min"
goals:
  - I can list Arcade's building blocks and name the ones a game needs.
  - I can say whether a game idea is built for Arcade, possible with work, or not a good fit, and why.
  - I can explain why sprites pass through each other in Arcade.
  - I can pitch a game that fits Arcade and prototype its core.
before: |
  A **game engine** is the part of a game tool that does common jobs for you. Arcade's engine moves sprites by their speed and gravity, notices overlaps, keeps score, lives and a countdown, runs timers, fires projectiles and (outside this course) draws tilemaps: walls, floors and a scrolling camera made in a tile editor.

  The rule of thumb for students: **a game suits Arcade when it is made of those building blocks.**

  - **Built for it:** catch and collect, dodge, top-down shooters, endless runners, single-screen sports such as pong, mazes and top-down adventures, side-scrolling platformers, two to four players on one keyboard.
  - **Possible with work:** quizzes and stories (the screen is small), card and board games (no mouse: move a cursor with the controller), role-playing games with inventories, turning cars or ships (sprites do not rotate: draw a picture per direction), sprites that bounce off each other (you code it), saving more than the high score.
  - **Not a good fit:** 3D, realistic physics (stacking, toppling, Angry Birds), detailed art, hundreds of moving sprites (it slows down), typing-heavy games, real-world data, and online play inside our lessons (MakeCode has its own online multiplayer with a join code, but it needs MakeCode's sharing, which our embedded editor switches off).

  The key fact behind "realistic physics": an **overlap is only an event**. Sprites pass through each other unless blocks move or destroy them. The challenge primer has the full table. These engine facts were written from knowledge of Arcade; check anything a student disputes in the live editor.
running:
  - "Predict: most pick the dodger. Ask why the other three are hard; collect reasons on the board (3D, mouse, physics)."
  - "Run: name each building block aloud as students point at it. Keep the list visible for the pitch card."
  - "Investigate: the first match is recipes; the second is verdicts. Ben's tower shows the biggest limit: sprites do not push each other. Contrast with the floor students built in Gravity and jumping: stopping one sprite is easy, real physics is not."
  - "Modify: two small changes give three genres. This is the lesson's main point: genres are recombinations of the same blocks."
  - "Make: pitch cards first, on paper. Partners check each other for 'needs 3D, physics or a mouse'. The prototype is deliberately small."
  - "Car: a worked example of 'possible with work'."
stuck:
  - see: "A student's dream game is 3D, online or physics-heavy."
    ask: "What is the fun part of that game, in one sentence?"
    fix: "Keep the fun part and change the form: a top-down 2D racer instead of a 3D one; a 'knock the cans' game where hit crates are destroyed instead of toppling."
  - see: "The dodger's rocks still give points."
    ask: "Which kinds does the overlap block name?"
    fix: "It must be Player and Enemy, and the falling sprite must be made of kind Enemy too."
  - see: "Shots pass through the rocks."
    ask: "What kind is a projectile?"
    fix: "Projectile. Add an overlap for Projectile and Enemy (a spiral from Projectiles)."
stretch: "Pick a famous game and write two pitch cards: one for a version that fits Arcade, and a list of what would have to change. Or prototype the hard part first: a cursor moved with the controller for a board game."
support: "Give students a pitch card template with the building blocks listed as tick boxes, and three example ideas to choose from (catch, dodge, maze)."
leads: "The optional lesson Your own game grows the prototype into a game in milestones. Beyond the course: tilemaps for mazes and platformers, animation frames, and extensions. Skillmaps (arcade.makecode.com/skillmaps): 3-in-a-row and Code an Adventure stretch the engine into genres it does not do out of the box. Games in text code (microStudio) and 3D engines are the next step for games Arcade cannot do."
exit:
  q: "Name one game Arcade is built for and one that is not a good fit, with a reason for each."
  a: "For example: a space shooter is built for it (projectiles, kinds and lives are built-in blocks); Angry Birds is not a good fit (sprites do not push or topple; there is no physics engine)."
explain: |
  A game suits Arcade when it is made from the engine's **building blocks**:

  1. **Built for it**: catch, dodge, shooters, runners, mazes, platformers, pong. Every part is a block.
  2. **Possible with work**: card games, quizzes, turning cars. You build the missing part from blocks.
  3. **Not a good fit**: 3D, real physics, detailed art. The engine has nothing to build them from.

  Sprites **pass through each other**: an overlap is only an event, so your blocks decide what happens.
solutions:
  step-4#t1: lesson.ts#sol-dodger
  step-4#t2: lesson.ts#sol-shooter
  step-5#t2: lesson.ts#sol-make
struggle: "Letting go of a dream game that Arcade can't make, and finding its core. Ask what the fun part is in one sentence and which building blocks it needs."
```

```code lesson.ts#predict
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . . 7 .
    . 2 2 .
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Food)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#modify
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . . 7 .
    . 2 2 .
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Food)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#sol-dodger
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . c c .
    c b c c
    c c c c
    . c c .
    `, SpriteKind.Enemy)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-shooter
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . c c .
    c b c c
    c c c c
    . c c .
    `, SpriteKind.Enemy)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.createProjectileFromSprite(img`
    5
    5
    `, basket, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#crates
scene.setBackgroundColor(9)
let crate1 = sprites.create(img`
    e e e e e e
    e d d d d e
    e d e e d e
    e d d d d e
    e e e e e e
    `, SpriteKind.Food)
crate1.setPosition(80, 110)
let crate2 = sprites.create(img`
    e e e e e e
    e d d d d e
    e d e e d e
    e d d d d e
    e e e e e e
    `, SpriteKind.Food)
crate2.setPosition(80, 105)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(80, 10)
ball.ay = 200
```

```code lesson.ts#make
scene.setBackgroundColor(15)
```

```code lesson.ts#sol-make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 100)
controller.moveSprite(ship)
let star = sprites.create(img`
    . 5 .
    5 5 5
    . 5 .
    `, SpriteKind.Food)
star.setPosition(randint(10, 150), randint(10, 60))
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 60))
    info.changeScoreBy(1)
})
```

```code lesson.ts#car
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `, SpriteKind.Player)
controller.moveSprite(car)
car.setStayInScreen(true)
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 9 2 2 2 2
    f . . . . f
    `)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `)
})
```

```code lesson.ts#sol-car
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `, SpriteKind.Player)
controller.moveSprite(car)
car.setStayInScreen(true)
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 9 2 2 2 2
    f . . . . f
    `)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    f 9 9 f
    . 2 2 .
    . 2 2 .
    f 2 2 f
    `)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    f 2 2 f
    . 2 2 .
    . 2 2 .
    f 9 9 f
    `)
})
```
