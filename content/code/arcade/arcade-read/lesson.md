---
order: 10
unit: fire
moveId: read-for-the-job
reviews: [place-a-sprite, move-with-buttons, engine-moves-it, touch-of-kinds, lives-end-game, timer-spawns, check-every-frame, fire-a-projectile]
assumes: [variable, random, if]
title: Read a game
summary: Read a whole game, find the blocks that do each job, and change just the part you need.
language: makecode
explainPicture: lesson.ts#game
hook: "Game makers spend more time reading code than writing it: to fix a bug or add a feature, you first find the blocks that do that job."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#game", lesson: "code/arcade/arcade-read", target: "arcade" }
  caption: "Every block in a game has one job"
  say: "Every group of blocks in a game has one job."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "The timer sends bugs. A fires water. The overlaps decide what a touch means."
        say: "The timer sends bugs, A fires water, and the overlaps decide what each touch means."
    - click: "Run"
    - wait: 600
    - caption:
        text: "To change a rule, find the blocks for that job."
        say: "To change one rule, find the blocks that do that job, and change only those."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
This is a whole game: **Garden defender**. Bugs fall on the garden; you move the gardener along the bottom and spray them with water. Every block in it is something you have already learned. Today you read it, find the blocks that do each job, and change the game without breaking it.

## Predict

```step
stage: predict
code: lesson.ts#game
check:
  type: predict
  q: "Read the on game update block. What happens when your score reaches 10?"
  options: ["The background turns green", "The game ends with a win", "The bugs fall faster", "Nothing: on game update only runs at the start"]
  actual: "The background turns green. on game update asks 'is the score 10 or more?' every frame, so the colour changes the moment you reach 10."
```

Read the blocks before you play.

## Run

```step
stage: run
code: lesson.ts#game
try: { playground: arcade, starter: "lesson.ts#game" }
check: { type: reflect, text: "I played until the background changed (or the game ended), and compared it with my prediction." }
```

Move with the left and right arrows. Fire with **A** (space).

## Investigate

```step
stage: investigate
code: lesson.ts#game
insight: "A game is a set of jobs, each done by its own blocks: find the blocks for a job before changing anything."
try: { playground: arcade, starter: "lesson.ts#game" }
tasks:
  - check:
      type: match
      q: "Match each job with the blocks that do it."
      pairs:
        - ["a new bug every 800 ms, at a random x", "on game update every 800 ms"]
        - ["the gardener moves left and right only", "move gardener with buttons 100, 0"]
        - ["water goes up when A is pressed", "projectile from gardener with vy -100"]
        - ["water that hits a bug scores", "on Projectile overlaps Enemy"]
        - ["a bug that lands on you costs a life", "on Player overlaps Enemy"]
  - check:
      type: trace
      text: "The game starts with 3 lives and a score of 0. Fill in the score and lives after each thing happens."
      table: |
        | what happens | score | lives |
        | (start) | 0 | 3 |
        | water hits a bug | [1] | [3] |
        | a bug lands on the gardener | [1] | [2] |
        | a bug falls past, off the bottom | [1] | [2] |
      explain: "Only the overlap events change the score or lives. A bug that misses everything changes nothing."
  - check:
      type: question
      q: "You want the bugs to fall faster. Which block do you change?"
      options: ["bug vy, inside the timer", "The 800 in the timer", "move gardener with buttons", "The projectile's vy"]
      answer: 0
      explain: "vy is the bug's speed down. The 800 sets how often bugs come, not how fast they fall."
```

### Jobs and blocks

### Score and lives

### Faster bugs

## Modify

```step
stage: modify
insight: "Each rule lives in one place, so changing a rule means changing one or two blocks."
try: { playground: arcade, starter: "lesson.ts#game" }
tasks:
  - hint: "The timer's number sets how often. Half of 800 is 400."
    check: { type: code, text: "Make the bugs come twice as often.", rules: { contains: ["game.onUpdateInterval(400,"] } }
  - hint: "Find the event for a bug landing on the gardener. Change the -1."
    check: { type: code, text: "Make a bug that lands on the gardener cost 2 lives.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["info.changeLifeBy(-2)"] } } }
```

### More bugs

Make the bugs come **twice as often**.

### Harsher bugs

Make a bug that lands on the gardener cost **2** lives.

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#game" }
hint:
  - "A second timer, on game update every 3000 ms: an apple of kind Food at a random x at the top, falling with vy."
  - "A new overlap: Player and Food. Inside: change life by 1, destroy otherSprite."
check: { type: code, text: "Add a new job: an apple falls every few seconds, and catching it gives a life.", rules: { contains: ["SpriteKind.Food)"], inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeLifeBy(1)", "destroy("] } } }
```

Add **one new job** to the game: an **apple** falls every few seconds, and catching it gives the gardener a life. Find where each part belongs: making it, moving it, and what a catch means.

```teacher
summary: "Students read a whole game, match each job to its blocks, and change rules without breaking the game: a review of the course before the final challenge."
time: 40
timing: "Predict and Run 8 min · Investigate 12 min · Modify 8 min · Make 12 min"
goals:
  - I can find the blocks that do a job in a game.
  - I can change one rule without breaking the rest.
  - I can add a new job in the right places.
before: |
  This lesson adds nothing new. Garden defender uses every idea in the course: sprites and positions, the controller, velocity, kinds and overlaps, lives, a timer with pick random, an if in on game update, and projectiles. The skill is reading: find the blocks that do one job, then change only those. It prepares students for Space dodger, where they build a game in milestones.
running:
  - "Predict: the if in on game update, from lesson 7. Ask which block answers it."
  - "Investigate: the match is the map of the game. Keep it on the board for the rest of the lesson."
  - "The 'faster bugs' question separates how often (the timer) from how fast (vy): a common confusion."
  - "Modify: each rule is one number in one block."
  - "Make: a new job touches three places: a timer to make apples, a velocity to move them, an overlap for the catch."
stuck:
  - see: "The student changes the wrong block."
    ask: "Which job does that block do? Find it in the match."
    fix: "Use the map of jobs to find the block for the rule you want to change."
  - see: "Apples appear but catching one does nothing."
    ask: "What kind are the apples, and which overlap did you add?"
    fix: "Apples are Food; the overlap must be Player and Food."
  - see: "Catching an apple gives many lives."
    ask: "What happens to the apple after the catch?"
    fix: "Destroy it in the overlap, or the event runs every frame."
stretch: "Add a second timer that sends a fast bug every 5 seconds. Where does each part of it go?"
support: "Give students the apple's timer already made, and ask them only to add the Player–Food overlap."
leads: "Next: Space dodger, the final challenge, built in milestones with less help each time."
exit:
  q: "In Garden defender, which block would you change to give the player 5 lives at the start?"
  a: "set life to 3, in on start: change 3 to 5."
explain: |
  A game is a set of **jobs**, and each job is done by its own blocks: a timer makes enemies, the controller moves the player, overlaps decide what touches mean, on game update checks things every frame.

  To change a rule, first find the blocks for that job, then change only those.
solutions:
  step-4#t1: lesson.ts#sol-often
  step-4#t2: lesson.ts#sol-harsh
  step-5: lesson.ts#sol-apple
struggle: "Finding the right block in a longer program. Ask them to name the job first, then point to its block."
class:
  activities:
    - at: investigate
      title: Map the game
      minutes: 5
      do: |
        On the board, draw a box for each job: make bugs, move, fire, hit, crash, change colour. Pairs come up and write the block for each.
      notes: "Leave the map up: students use it to find where each change goes."
    - at: end
      title: Swap and play
      minutes: 4
      do: |
        Play the next pair's garden. Can you find their apple's three parts in the blocks?
```

```code lesson.ts#game
let bug: Sprite = null
scene.setBackgroundColor(13)
info.setLife(3)
let gardener = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
gardener.setPosition(80, 110)
controller.moveSprite(gardener, 100, 0)
gardener.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let water = sprites.createProjectileFromSprite(img`
        . 9 .
        9 9 9
        . 9 .
        `, gardener, 0, -100)
})
game.onUpdateInterval(800, function () {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(randint(10, 150), 0)
    bug.vy = 30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
game.onUpdate(function () {
    if (info.score() >= 10) {
        scene.setBackgroundColor(7)
    }
})
```

```code lesson.ts#sol-often
let bug: Sprite = null
scene.setBackgroundColor(13)
info.setLife(3)
let gardener = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
gardener.setPosition(80, 110)
controller.moveSprite(gardener, 100, 0)
gardener.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let water = sprites.createProjectileFromSprite(img`
        . 9 .
        9 9 9
        . 9 .
        `, gardener, 0, -100)
})
game.onUpdateInterval(400, function () {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(randint(10, 150), 0)
    bug.vy = 30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
game.onUpdate(function () {
    if (info.score() >= 10) {
        scene.setBackgroundColor(7)
    }
})
```

```code lesson.ts#sol-harsh
let bug: Sprite = null
scene.setBackgroundColor(13)
info.setLife(3)
let gardener = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
gardener.setPosition(80, 110)
controller.moveSprite(gardener, 100, 0)
gardener.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let water = sprites.createProjectileFromSprite(img`
        . 9 .
        9 9 9
        . 9 .
        `, gardener, 0, -100)
})
game.onUpdateInterval(400, function () {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(randint(10, 150), 0)
    bug.vy = 30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-2)
})
game.onUpdate(function () {
    if (info.score() >= 10) {
        scene.setBackgroundColor(7)
    }
})
```

```code lesson.ts#sol-apple
let apple: Sprite = null
let bug: Sprite = null
scene.setBackgroundColor(13)
info.setLife(3)
let gardener = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
gardener.setPosition(80, 110)
controller.moveSprite(gardener, 100, 0)
gardener.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let water = sprites.createProjectileFromSprite(img`
        . 9 .
        9 9 9
        . 9 .
        `, gardener, 0, -100)
})
game.onUpdateInterval(800, function () {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(randint(10, 150), 0)
    bug.vy = 30
})
game.onUpdateInterval(3000, function () {
    apple = sprites.create(img`
        . . 7 .
        . 2 2 .
        2 2 2 2
        . 2 2 .
        `, SpriteKind.Food)
    apple.setPosition(randint(10, 150), 0)
    apple.vy = 25
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
game.onUpdate(function () {
    if (info.score() >= 10) {
        scene.setBackgroundColor(7)
    }
})
```
