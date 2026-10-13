---
order: 9
unit: powerups
moveId: count-down
reviews: [remember-state, timer-spawns]
assumes: [variable, random, if, else, function, variable-update, list, list-index, bool-value]
title: Run out
summary: A number that counts down limits a power-up, and the event checks it first, so it never goes below zero.
language: makecode
explainPicture: lesson.ts#sol-check
hook: "Ammo, fuel, a shield that flickers out: the best power-ups run out. Behind each one is a number counting down."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sol-check", lesson: "code/arcade-advanced/arcade-run-out", target: "arcade" }
  caption: "ammo counts the shots left"
  say: "ammo counts the shots that are left."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A fires only if ammo is more than 0."
        say: "A fires only if ammo is more than zero."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Each shot changes ammo by -1."
        say: "Each shot changes ammo by minus one."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A power-up that runs out needs a **number**: shots left, seconds left. Each use takes 1 away. The ship says how many shots are left after each one.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "ammo starts at 3. You press A five times. What happens?"
  options: ["5 shots fly, and the ship says -2", "3 shots fly, then A does nothing", "3 shots fly, then the game ends", "5 shots fly, and the ship says 3"]
  fault: logic
  misconception: count-below-zero
  actual: "5 shots fly and ammo goes 2, 1, 0, -1, -2. Nothing checks there is ammo left, so the count goes below zero."
```

Look at the **on A pressed** block. Does anything ask whether there is ammo left?

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A more than three times and compared with my prediction." }
```

Press **A** (space) again and again. Watch what the ship says.

## Investigate

```step
stage: investigate
code: lesson.ts#sol-check
insight: "A number that counts down limits an action: the event asks it first, and only then uses one up."
try: { playground: arcade, starter: "lesson.ts#sol-check" }
tasks:
  - check:
      type: trace
      text: "This version fires only if ammo > 0. Fill in each press of A."
      table: |
        | ammo before | a shot? | ammo after |
        | 3 | yes | 2 |
        | 1 | [yes] | [0] |
        | 0 | [no] | [0] |
      explain: "At 0 the question ammo > 0 is false, so nothing fires and nothing is taken away."
  - check:
      type: question
      q: "Why ammo > 0, and not ammo ≥ 0?"
      options: ["With ≥ 0, a shot fires at 0 and ammo goes to -1: one shot too many", "≥ is not allowed in Arcade", "There is no difference", "> 0 makes it fire faster"]
      answer: 0
      explain: "≥ 0 is still true at 0, so the last press fires a fourth shot and the count goes below zero."
  - check:
      type: question
      q: "Lily put the if around change ammo by -1 only, not around the shot. What happens after 3 shots?"
      options: ["Shots keep firing, though ammo stays at 0", "A does nothing", "Ammo goes below zero", "The game ends"]
      answer: 0
      fault: logic
      misconception: count-below-zero
      explain: "Only the count is checked. The shot is outside the if, so it fires on every press."
```

This version checks first. Try to fire a fourth shot.

### Shots left

### Why > 0?

### Lily's blaster

## Modify

```step
stage: modify
insight: "Set throws away what is left; change by adds to it."
try: { playground: arcade, starter: "lesson.ts#sol-check" }
tasks:
  - hint: ["A star floats past every 5 seconds. Its overlap only destroys it.", "Add set ammo to 5 in the Player–Food overlap."]
    check: { type: code, text: "A star refills the ammo to 5.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food,": ["ammo=5"] } } }
  - hint: "Use change ammo by 3 in place of set."
    check: { type: code, text: "A star adds 3 shots to what you have left.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food,": ["ammo+=3"] } } }
```

### Refill

A star **refills** the ammo to 5.

### Top up

Now a star **adds 3** to what you have. Which is better for a player with 4 shots left?

## Mix it up

```step
stage: investigate
insight: "A true or false variable stays as it is until a block sets it back."
check:
  type: question
  q: "hunting is true. The player touches a ghost, and the overlap scores 5 and sets hunting to false. A second ghost touches a moment later. What happens?"
  options: ["It costs a life: hunting is now false", "It scores 5 too", "Nothing happens", "hunting turns true again"]
  answer: 0
  explain: "The first touch set hunting to false, so the if takes the else for the second ghost."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Catching a star already sets shieldTime to 5. In the timer that runs every 1000 ms, add: if shield, change shieldTime by -1."
  - "Inside that if, add another: if shieldTime = 0, set shield to false and set the background back to 15 (black)."
check: { type: code, text: "The shield switches off by itself after 5 seconds.", rules: { contains: ["shieldTime+=-1"], count: { "shield=false": 2 } } }
unlocks: [count-down]
```

The shield from last lesson. A new variable, `shieldTime`, is set to **5** when you catch a star.

1. Every second while the shield is on, take 1 off `shieldTime`.
2. When `shieldTime` reaches **0**, set `shield` to **false** and put the black background back.

## Change a sprint boost

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#boost" }
```

A runner with a sprint boost on **B** (enter on the keyboard): 3 seconds of extra speed, then back to normal. Make it fair: only **3 boosts** for the whole game, counted down.

```teacher
summary: "Students limit a blaster with a number that counts down, check it first so it never goes below zero, refill it with a star, and make a shield run out after 5 seconds."
time: 45
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 12 min · Sprint 5 min"
goals:
  - I can limit an action with a number that counts down.
  - I can check the number first, so it never goes below zero.
  - I can make a power-up last a set time with a timer.
before: |
  A power-up that runs out is a **number** counting down. For ammo, the A event asks *if ammo > 0* first, then fires and changes ammo by -1. Without the check, ammo goes below zero and the shots never stop (the misconception). With ≥ 0 there is one shot too many.

  For time, a timer every 1000 ms counts `shieldTime` down while the shield is on, and at 0 sets the shield back to false: an if inside an if. Set (refill to 5) and change (add 3) are different, which Modify brings out.
running:
  - "Predict: let students find the -2 in the Run."
  - "Investigate: the trace shows the if saying no at 0. Lily's blaster checks the wrong block."
  - "Modify: ask which refill is kinder to a player with 4 shots."
  - "Mix it up: true or false from last lesson."
  - "Make: read it aloud: every second, if the shield is on, count down; if it reached zero, switch it off."
stuck:
  - see: "Shots never run out."
    ask: "Is the shot inside the if?"
    fix: "Put both the shot and change ammo by -1 inside if ammo > 0."
  - see: "The shield switches off straight away, or never."
    ask: "Where is the countdown, and when does that block run?"
    fix: "In the 1000 ms timer, inside if shield; set it to false only inside if shieldTime = 0."
  - see: "The countdown goes 5, 3, 1, -1."
    ask: "How many timers count it down?"
    fix: "One: remove the second change."
stretch: "Show the shield time with the ship's say block, every second."
support: "Give students the if shield in the timer, so they add only the countdown and the switch-off."
leads: "Next: the Power-ups challenge, with less help. Skillmap: Save the Galaxy (arcade.makecode.com/skillmaps)."
exit:
  q: "Why does the A event ask ammo > 0 before it fires?"
  a: "So it only fires while there are shots left. Without the check, ammo goes below zero and the shots never run out."
explain: |
  A power-up that runs out is a **number** counting down.

  The event asks first: *if ammo > 0*, fire, then change ammo by -1. So it stops at zero.

  For time, a timer takes 1 away every second, and at 0 switches the power-up off.
solutions:
  step-4#t1: lesson.ts#sol-refill
  step-4#t2: lesson.ts#sol-topup
  step-6: lesson.ts#sol-make
struggle: "Checking before using. When the count goes below zero, ask what the event asks first."
class:
  activities:
    - at: investigate
      title: Three sweets
      minutes: 3
      do: |
        A student has three counters. Each "fire" hands one over, but only if they still have one.
      notes: "Nobody can hand over a counter they do not have. The game can, unless it checks."
    - at: end
      title: Fair or not?
      minutes: 4
      do: |
        Play the next pair's sprint boost. Is three boosts fair?
```

```code lesson.ts#predict
let shot: Sprite = null
let rock: Sprite = null
let ammo = 3
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shot = sprites.createProjectileFromSprite(img`
        4 4 4
        `, ship, 100, 0)
    ammo += -1
    ship.sayText(ammo)
})
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#sol-check
let star: Sprite = null
let shot: Sprite = null
let rock: Sprite = null
let ammo = 3
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
    ship.sayText(ammo)
})
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
})
```

```code lesson.ts#sol-refill
let star: Sprite = null
let shot: Sprite = null
let rock: Sprite = null
let ammo = 3
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
    ship.sayText(ammo)
})
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    ammo = 5
})
```

```code lesson.ts#sol-topup
let star: Sprite = null
let shot: Sprite = null
let rock: Sprite = null
let ammo = 3
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
    ship.sayText(ammo)
})
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    ammo += 3
})
```

```code lesson.ts#make
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    shield = true
    shieldTime = 5
    scene.setBackgroundColor(8)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    info.changeScoreBy(1)
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
})
```

```code lesson.ts#sol-make
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    shield = true
    shieldTime = 5
    scene.setBackgroundColor(8)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    info.changeScoreBy(1)
    if (shield) {
        shieldTime += -1
        if (shieldTime == 0) {
            shield = false
            scene.setBackgroundColor(15)
        }
    }
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
})
```

```code lesson.ts#boost
let boosting = false
let boostTime = 0
scene.setBackgroundColor(7)
let runner = sprites.create(img`
    . 4 4 .
    4 f 4 4
    . 2 2 .
    . 2 2 .
    . f f .
    `, SpriteKind.Player)
controller.moveSprite(runner, 50, 50)
runner.setStayInScreen(true)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (boosting == false) {
        boosting = true
        boostTime = 3
        controller.moveSprite(runner, 120, 120)
    }
})
game.onUpdateInterval(1000, function () {
    if (boosting) {
        boostTime += -1
        if (boostTime == 0) {
            boosting = false
            controller.moveSprite(runner, 50, 50)
        }
    }
})
```
