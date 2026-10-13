---
order: 9
unit: fire
assumes: [variable, random]
reviews: [if-else-steer, touch-of-kinds]
moveId: fire-a-projectile
title: Projectiles
summary: Fire a projectile with the A button. It is its own kind, so a hit is an overlap of Projectile and Enemy.
language: makecode
explainPicture: lesson.ts#predict
hook: "Space Invaders, Galaga and every 'shoot 'em up' since: you fire, and the game has to notice when a shot hits."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade/arcade-projectiles", target: "arcade" }
  caption: "A projectile is its own kind"
  say: "A projectile is fired from a sprite, and it's its own kind: Projectile."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "So a hit is a Projectile–Enemy overlap."
        say: "So a hit is an overlap between a projectile and an enemy."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The engine removes a projectile when it leaves the screen."
        say: "The engine removes a projectile by itself when it leaves the screen."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A **projectile** (in **Sprites**) is a sprite fired from another sprite, with its own speed: **projectile from ship with vx 0, vy -100** goes straight up. It is its **own kind**: **Projectile**, not part of the ship. The engine removes it when it leaves the screen.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You press A (space on the keyboard) once, with the ship right under the alien. What happens?"
  options: ["The shot and the alien both disappear, and the score goes up by 1", "The ship disappears", "The shot goes through the alien", "Only the alien disappears"]
  actual: "The shot and the alien both disappear, and the score goes up by 1. The shot is a Projectile, the alien an Enemy, so the Projectile–Enemy overlap runs: sprite is the shot, otherSprite the alien."
```

The overlap event names two kinds: **Projectile** and **Enemy**.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I fired at the alien and compared what happened with my prediction." }
```

Press the **A** button (space on the keyboard). Then move the ship to one side and fire again: where does the shot go?

## Investigate

```step
stage: investigate
code: lesson.ts#invaders
insight: "A projectile is its own kind (Projectile), so the overlap that catches a hit names Projectile, not Player, and the engine removes a shot that leaves the screen."
try: { playground: arcade, starter: "lesson.ts#invaders" }
tasks:
  - check:
      type: match
      q: "Match each part of this game with what it does."
      pairs:
        - ["projectile from ship with vx 0, vy -100", "fires a shot straight up from the ship"]
        - ["on game update every 1000 ms", "makes a new alien each second"]
        - ["on Projectile overlaps Enemy", "runs when any shot touches any alien"]
        - ["sprite (in the overlap)", "the shot that hit"]
        - ["otherSprite (in the overlap)", "the alien that was hit"]
  - check:
      type: question
      q: "A shot misses every alien and flies off the top of the screen. What happens to it?"
      options: ["The engine removes it", "It keeps flying for ever, off the screen", "It comes back at the bottom", "It turns into an alien"]
      answer: 0
      explain: "A projectile is removed by the engine as soon as it leaves the screen, so missed shots do not pile up."
  - check:
      type: question
      q: "Ben wrote his own hit event (below). He fires at the aliens, but every shot passes straight through. Why?"
      options: ["The shot is too fast to hit anything", "A projectile is its own kind, Projectile, so a Player–Enemy overlap never notices a shot", "destroy only works on the player", "The overlap needs to be inside on A pressed"]
      answer: 1
      fault: logic
      misconception: projectile-kind
      explain: "The shot is made by the ship, but it is not the ship: it is a sprite of kind Projectile. Ben's event waits for a Player to touch an Enemy, which only happens if the ship itself crashes into an alien. The first kind should be Projectile."
```

### What does each part do?

Play the game, then match each part with its job.

### A missed shot

### Ben's shots

Ben's hit event:

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

## Modify

```step
stage: modify
insight: "Each pair of kinds has its own overlap event: Projectile–Enemy is a hit, Player–Enemy is a crash."
try: { playground: arcade, starter: "lesson.ts#modify" }
tasks:
  - hint: ["on overlap is in Sprites › Overlaps. Choose the kinds Projectile and Enemy.", "Inside: destroy sprite, destroy otherSprite, change score by 1."]
    check: { type: code, text: "Make the shots work: a shot that hits an alien destroys both and scores a point.", rules: { inside: { "sprites.onOverlap(SpriteKind.Projectile,SpriteKind.Enemy,": ["destroy(", "info.changeScoreBy("] } } }
  - hint: ["Add a second on overlap, with the kinds Player and Enemy.", "Destroy the alien (otherSprite), and change life by -1."]
    check: { type: code, text: "When an alien crashes into the ship, the alien is destroyed and you lose a life.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,": ["destroy(", "info.changeLifeBy(-"] } } }
```

### Make the shots work

The shots in this game pass through everything. Add the overlap that turns a shot into a hit.

### Crash!

Now the aliens can reach the ship without anything happening. Make a crash cost a life.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "Comparing two positions with if … else sets exactly one direction every frame."
check:
  type: question
  q: "The cat is at x 100 and the mouse at x 40. Which way does the cat go?"
  options: ["Left (vx is set to -40)", "Right (vx is set to 40)", "It stops", "Both ways at once"]
  answer: 0
  explain: "Is cat x (100) less than mouse x (40)? No, so the else part runs: vx -40, to the left, towards the mouse."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "on A button pressed (Controller): projectile from ship with vx 0 and vy -100 (Sprites)."
  - "on overlap (Sprites › Overlaps) with the kinds Projectile and Enemy. Inside: destroy sprite, destroy otherSprite, change score by 1."
check: { type: code, text: "A shooter: A fires a shot up from the ship, and a shot that hits an alien destroys both and scores.", rules: { contains: ["sprites.createProjectileFromSprite("], inside: { "controller.A.onEvent(": ["sprites.createProjectileFromSprite("], "sprites.onOverlap(SpriteKind.Projectile,SpriteKind.Enemy,": ["destroy(", "info.changeScoreBy("] } } }
unlocks: [projectile-from-sprite]
```

The aliens fall already. Make it a **shooter**:

- **A** fires a shot straight **up** from the ship
- a shot that hits an alien destroys **both** and scores **1**

## Change a firework show

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#fireworks" }
```

**A** launches a rocket into the night sky. Make the rockets launch faster, then make **B** launch a rocket that goes up at a slant.

```teacher
summary: "Students fire projectiles with A and find that a projectile is its own kind, so a hit needs a Projectile–Enemy overlap."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 9 min · Mix it up 3 min · Make 8 min · Fireworks 3 min"
goals:
  - I can fire a projectile from a sprite with the A button.
  - I can explain why a hit needs a Projectile–Enemy overlap, not Player–Enemy.
  - I can make a crash and a hit do different things.
before: |
  A **projectile** is a sprite fired from another sprite, with a speed across (vx) and down (vy); vy -100 goes straight up. It is a sprite of its **own kind**, **Projectile**, not part of the ship, and the engine removes it when it leaves the screen. So a hit needs an overlap event between **Projectile** and **Enemy**. Students often pick Player, because "the player shoots": that is the planted misconception (Ben's shots pass straight through). In an overlap event, **sprite** is the sprite of the first kind (the shot) and **otherSprite** the second (the alien). The keyboard: A is space (or Z), B is enter (or X).
running:
  - "Predict: most get this right. Ask: which kind is the shot? (Projectile.)"
  - "Run: shots go straight up wherever the ship is: the projectile starts at the ship's position."
  - "Investigate: Ben's shots: read the kinds aloud."
  - "Modify: the first task is the hit event; the second is a separate Player–Enemy event. Two pairs of kinds, two events."
  - "Mix it up: the chaser from last lesson, worked by hand."
  - "Make: fire in A, hit in the Projectile–Enemy overlap."
stuck:
  - see: "Shots pass straight through the aliens."
    ask: "Which two kinds does your overlap event name?"
    fix: "The shot is a Projectile. Change the first kind to Projectile."
  - see: "The ship disappears when it shoots."
    ask: "In the overlap event, which sprite is destroyed?"
    fix: "The event is probably Player–Enemy and destroys sprite (the ship). Use Projectile–Enemy."
  - see: "Shots go down, not up."
    ask: "Which way does a negative vy go?"
    fix: "y counts down, so up is a negative vy: -100."
stretch: "Make B fire two shots at a slant, one left and one right."
support: "Give students the on A pressed block with the projectile in it, and ask them only to build the hit event."
leads: "Next lesson: read a whole game and find the blocks for each job, before the final challenge. Class idea: a two-way shooter (shots left and right with a second button)."
exit:
  q: "A shot hits an alien, but the game has only a Player–Enemy overlap event. What happens, and why?"
  a: "Nothing. The shot is of kind Projectile, so a Player–Enemy event never runs for it."
explain: |
  A **projectile** is fired from a sprite, with its own speed. It is its **own kind**: **Projectile**.

  So a hit is a **Projectile–Enemy** overlap, and a crash is a **Player–Enemy** overlap: two pairs of kinds, two events.

  The engine removes a projectile when it leaves the screen.
solutions:
  step-4#t1: lesson.ts#sol-hit
  step-4#t2: lesson.ts#sol-crash
  step-6: lesson.ts#sol-make
struggle: "The overlap must name Projectile. Ask which two kinds touch when a shot hits."
class:
  activities:
    - at: investigate
      title: Whose kind?
      minutes: 3
      do: |
        A student is the ship and throws a paper ball (the shot) at another (the alien). The class says which two kinds touched.
      notes: "The ball touched the alien, not the ship: Projectile and Enemy."
```

```code lesson.ts#predict
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
let alien = sprites.create(img`
    . 7 . 7 .
    7 7 7 7 7
    7 f 7 f 7
    . 7 . 7 .
    `, SpriteKind.Enemy)
alien.setPosition(80, 20)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#invaders
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#kind
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```


```code lesson.ts#modify
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
```

```code lesson.ts#sol-hit
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#sol-crash
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
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
```

```code lesson.ts#make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
game.onUpdateInterval(500, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
```

```code lesson.ts#sol-make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
game.onUpdateInterval(500, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        4 4 4
        `, ship, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#review
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(40, 60)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(100, 60)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 40
    } else {
        cat.vx = -40
    }
})
```

```code lesson.ts#fireworks
scene.setBackgroundColor(8)
let launcher = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Player)
launcher.setPosition(80, 115)
controller.moveSprite(launcher, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let rocket = sprites.createProjectileFromSprite(img`
        2
        2
        4
        `, launcher, 0, -60)
})
```
