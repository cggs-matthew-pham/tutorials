---
order: 5
unit: platforms
moveId: jump-from-ground
reviews: [gravity-pulls, check-every-frame]
assumes: [variable, random, if]
title: Jump from the ground
summary: Put the jump inside an if that asks whether the player is on the floor, so it only works from the ground.
language: makecode
explainPicture: lesson.ts#sol-ground
hook: "In every platformer you can only jump when your feet are on something. Without that one rule, the player could climb the sky."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sol-ground", lesson: "code/arcade-advanced/arcade-jump", target: "arcade" }
  caption: "A jump only sets vy upwards"
  say: "A jump only sets the speed upwards."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "So every press would jump again, even in mid-air."
        say: "So every press would jump again, even in mid-air."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The if asks: is the player standing on the floor?"
        say: "The if asks: is the player standing on the floor? Only then does it jump."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the ball could be thrown up and came back down to a floor. Now the player jumps with **A**. A jump sets **vy** to a negative number. But where must the player be for a jump to make sense?

## Predict

```step
stage: predict
code: lesson.ts#jumper
check:
  type: predict
  q: "You press A three times, quickly, one press after another. What does the player do?"
  options: ["Jumps higher and higher, and can fly off the top of the screen", "Jumps once; the other presses do nothing", "Jumps three times, landing between each", "Falls through the floor"]
  fault: logic
  misconception: jump-midair
  actual: "Each press sets vy to -150 again, even in mid-air, so the player keeps rising. Nothing checks whether the player is on the ground."
```

Look at the **on A pressed** block. Does anything ask where the player is?

## Run

```step
stage: run
code: lesson.ts#jumper
try: { playground: arcade, starter: "lesson.ts#jumper" }
check: { type: reflect, text: "I pressed A again and again and compared what happened with my prediction." }
```

Press **A** (space) once and watch. Then press it again and again, quickly.

## Investigate

```step
stage: investigate
code: lesson.ts#sol-ground
insight: "A jump belongs inside an if: the press only counts when the player is standing on the floor, which the floor if makes true."
try: { playground: arcade, starter: "lesson.ts#sol-ground" }
tasks:
  - check:
      type: question
      q: "Leo's player flies off the top when he presses A again and again. Why?"
      options: ["-150 is too big a number", "Nothing checks the player is on the ground, so every press jumps again, even in mid-air", "ay should be negative", "The floor pushes him up"]
      answer: 1
      fault: logic
      misconception: jump-midair
      explain: "A jump only sets vy to -150. Leo's A event does that on every press, wherever the player is, so each press in the air starts a new jump higher up."
  - check:
      type: trace
      text: "This version jumps only if player bottom ≥ 100. Fill in what a press of A does."
      table: |
        | player bottom when A is pressed | A does |
        | 100 (on the floor) | [jumps] |
        | 70 (rising) | [nothing] |
        | 95 (falling, nearly down) | [nothing] |
      explain: "The floor puts the bottom at exactly 100. Anywhere above that, the player is in the air, so the if says no."
  - check:
      type: question
      q: "Why is the floor's bottom exactly 100 when the player is standing?"
      options: ["The floor if sets it back to 100 every frame the player sinks below it", "Gravity stops at 100", "100 is the bottom of the screen", "The jump sets it"]
      answer: 0
      explain: "Every frame, if the bottom has gone past 100, the floor if puts it back at 100: so standing means bottom is 100."
```

This version has the fix. Try to fly with it.

### Leo's jump

### When does A jump?

### Why 100?

## Modify

```step
stage: modify
insight: "The if around the jump uses the same edge as the floor; changing how a jump feels is two numbers."
try: { playground: arcade, starter: "lesson.ts#jumper" }
tasks:
  - hint: ["Drag an if into the on A pressed block, around set vy.", "The question: player bottom ≥ 100 (from Logic, with bottom from Sprites)."]
    check: { type: code, text: "Fix the flying: A only jumps when the player is on the ground.", rules: { inside: { "controller.A.onEvent(": ["if(", "player.vy=-"] } } }
  - hint: ["Make the jump weaker or stronger: a smaller or bigger negative vy.", "Then change ay: try 100 for the Moon, 600 for a heavy planet."]
    check: { type: reflect, text: "I changed the jump and the gravity, and found a pair that feels right for my game." }
```

### No flying

This is Leo's game. Fix it: **A** only jumps when the player is **on the ground**.

### Moon jump

Change the jump speed and the gravity. Pick the pair you like best.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "Gravity adds ay to vy every second."
check:
  type: number
  q: "A sprite starts still with ay 200. What is its vy after 1.5 seconds?"
  answer: 300
  explain: "Gravity adds 200 every second: 1.5 × 200 = 300."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Gravity, a floor in on game update and a jump from the ground: the same blocks as your fixed jumper."
  - "A timer (on game update every 1500 ms) makes a rock at x 160 near the floor, with a negative vx so it slides left."
  - "A Player–Enemy overlap: destroy the rock and change life by -1."
check: { type: code, text: "A runner: gravity, a floor, a jump from the ground, rocks on a timer, and a hit costs a life.", rules: { contains: [".ay=", "game.onUpdateInterval("], inside: { "game.onUpdate(": ["if(", "vy=0"], "controller.A.onEvent(": ["if(", "vy=-"], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,": ["info.changeLifeBy(-"] } } }
unlocks: [jump-from-ground]
```

Make a **runner**. The player stays on the left; the world comes to them:

- the player has **gravity** and stands on a **floor** at y 100,
- **A** jumps, but only from the ground,
- a **rock** slides in from the right every 1.5 seconds,
- a hit costs a **life** (three lives, then game over).

## Change a kangaroo

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#kangaroo" }
```

This kangaroo hops across a field, but only from the ground. Make it a moon kangaroo: weaker gravity and a gentler jump. Can it still only jump from the ground?

```teacher
summary: "Students fix a jump that works in mid-air by putting it inside an if that checks the player is on the floor, then build a runner game."
time: 45
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 13 min · Kangaroo 4 min"
goals:
  - I can make a jump that only works from the ground.
  - I can explain why a jump needs that check.
  - I can build a runner with gravity, a floor, a jump and obstacles.
before: |
  A **jump** sets vy to a negative number (up). On its own, it works on every press, even in mid-air, so a player can climb the sky. The fix is an **if** around the jump: *if player bottom ≥ 100* (the floor's height). The floor if from last lesson puts the bottom back at exactly 100 every frame the player sinks, so standing means bottom is 100. In real platformers, tilemaps give a ready-made "is on a wall" test; this is the same idea by hand.
running:
  - "Predict: let students find the flying in the Run."
  - "Investigate: the trace shows the if saying no anywhere above the floor."
  - "Modify: the fix is two blocks: an if and its question."
  - "Mix it up: gravity, from last lesson."
  - "Make: the runner reuses the fixed jumper; the new parts are the timer and the overlap."
stuck:
  - see: "The player can fly by pressing A again and again."
    ask: "Where must the player be for a jump to make sense?"
    fix: "Put an if around set vy in the A event: only when bottom ≥ 100."
  - see: "The jump never works now."
    ask: "Is the question ≥ 100, or > 100?"
    fix: "Standing means bottom is exactly 100, so use ≥."
  - see: "The rocks float in mid-air, or pass under the player."
    ask: "What y do the rocks start at?"
    fix: "Near the floor: about 98, so they sit on y 100."
stretch: "Add a coin in the air that is only reachable with a jump, worth a point."
support: "Give students the jumper (floor and jump done) as their Make starter, so they add only the rocks and the lives."
leads: "Next unit: levels, so the runner can get harder. Skillmaps: Jungle Jump Platformer and Monster Truck Racer (arcade.makecode.com/skillmaps) are platformers built with tilemaps, the engine's version of this floor."
exit:
  q: "Why does a jump need an if that checks the player is on the ground?"
  a: "A jump only sets vy upwards. Without the check, every press of A jumps again, even in mid-air, so the player can fly."
explain: |
  A **jump** sets vy upwards. On its own it works on every press, even in mid-air.

  So put the jump inside an **if** that asks whether the player is on the floor: *if bottom ≥ 100*. The floor keeps the bottom at 100 while the player stands, so the press only counts from the ground.
solutions:
  step-4#t1: lesson.ts#sol-ground
  step-6: lesson.ts#sol-make
struggle: "Where the check belongs: around the jump, in the A event. Ask where the player must be for a jump to make sense."
class:
  activities:
    - at: investigate
      title: Feet on the floor
      minutes: 3
      do: |
        Students jump on the spot. Ask: can you jump again while you are in the air?
      notes: "Your legs need the floor. The if is the game's version of that."
    - at: end
      title: Runner race
      minutes: 4
      do: |
        Play the next pair's runner. How many rocks can you jump before you lose?
```

```code lesson.ts#jumper
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(80, 20)
player.ay = 300
controller.moveSprite(player, 80, 0)
game.onUpdate(function () {
    if (player.bottom > 100) {
        player.bottom = 100
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player.vy = -150
})
```

```code lesson.ts#sol-ground
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(80, 20)
player.ay = 300
controller.moveSprite(player, 80, 0)
game.onUpdate(function () {
    if (player.bottom > 100) {
        player.bottom = 100
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.bottom >= 100) {
        player.vy = -150
    }
})
```

```code lesson.ts#review
scene.setBackgroundColor(9)
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
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(30, 90)
info.setLife(3)
```

```code lesson.ts#sol-make
let rock: Sprite = null
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(30, 90)
info.setLife(3)
player.ay = 300
game.onUpdate(function () {
    if (player.bottom > 100) {
        player.bottom = 100
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.bottom >= 100) {
        player.vy = -150
    }
})
game.onUpdateInterval(1500, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, 98)
    rock.vx = -60
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#kangaroo
scene.setBackgroundColor(7)
let roo = sprites.create(img`
    . 4 4 .
    4 f 4 4
    . 2 2 .
    . 2 2 .
    . f f .
    `, SpriteKind.Player)
roo.setPosition(20, 90)
roo.ay = 300
controller.moveSprite(roo, 60, 0)
game.onUpdate(function () {
    if (roo.bottom > 100) {
        roo.bottom = 100
        roo.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (roo.bottom >= 100) {
        roo.vy = -170
    }
})
```
