---
order: 4
unit: platforms
moveId: gravity-pulls
reviews: [engine-moves-it, job-with-input]
assumes: [variable, random, if, function, param]
title: Gravity
summary: Give a sprite gravity with ay, so it falls faster and faster, and a jump rises, slows and comes back down.
language: makecode
explainPicture: lesson.ts#floor
hook: "Mario, Sonic and every runner game on a phone: you press jump, you rise, you slow down, you fall back. That curve is gravity."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#floor", lesson: "code/arcade-advanced/arcade-gravity", target: "arcade" }
  caption: "ay is gravity"
  say: "ay is gravity: every frame it adds a little to the falling speed."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "So a fall gets faster and faster."
        say: "So a falling sprite goes faster and faster."
    - click: "Run"
    - wait: 600
    - caption:
        text: "A jump is a speed upwards: vy = -150."
        say: "A jump is a speed upwards. Gravity slows it, stops it, and brings it down."
    - caption:
        text: "An if in on game update makes a floor."
        say: "There's no floor, so an if in on game update makes one."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
You know **velocity**: vx and vy say how far the engine moves a sprite every frame. Arcade has a third number, **ay**: the **acceleration** down. Every frame, the engine adds a little to **vy**, so the sprite falls **faster and faster**. That is gravity. Set ay in **Sprites**: the same block as set vx, with **ay** chosen in its dropdown.

A **jump** is just a speed **upwards**: a **negative vy** (y counts down, so up is negative). Gravity then slows the sprite, stops it, and pulls it back down.

## Predict

```step
stage: predict
code: lesson.ts#fall
check:
  type: predict
  q: "The ball starts near the top with ay 300 and nothing else. What does it do?"
  options: ["Falls faster and faster, and drops off the bottom of the screen", "Falls and stops at the bottom edge", "Falls at the same speed all the way", "Stays where it is"]
  fault: logic
  misconception: gravity-steady-speed
  actual: "It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is."
```

## Run

```step
stage: run
code: lesson.ts#fall
try: { playground: arcade, starter: "lesson.ts#fall" }
check: { type: reflect, text: "I watched the ball fall (restart to see it again) and compared with my prediction." }
```

Watch the ball closely: does it fall at a steady speed? Press the restart button under the simulator to see it again.

## Investigate

```step
stage: investigate
code: lesson.ts#floor
insight: "Gravity is acceleration: the engine adds ay to vy every second, a little each frame, so a fall speeds up and a jump (a negative vy) slows, stops and comes back. An if in on game update builds a floor."
try: { playground: arcade, starter: "lesson.ts#floor" }
tasks:
  - check:
      type: trace
      text: "A sprite starts still (vy 0) with ay 300. Gravity adds 300 to vy every second. Fill in vy."
      table: |
        | seconds | vy (speed down) |
        | 0 | 0 |
        | 0.5 | [150] |
        | 1 | [300] |
        | 2 | [600] |
      fault: logic
      misconception: gravity-steady-speed
      explain: "Every second vy grows by ay, 300. That is why a fall speeds up: the sprite moves further each frame than the frame before."
  - check:
      type: number
      q: "The ball is thrown up: vy is set to -150, with ay 300. How many seconds until it stops rising (vy is 0)?"
      answer: 0.5
      tolerance: 0.05
      explain: "Gravity adds 300 every second, so after 0.5 seconds -150 has become 0: the top of the throw. Then vy is positive and it falls back down."
  - check:
      type: question
      q: "What does the if in on game update do?"
      options: ["It is a floor: when the ball's bottom goes past 100, it puts it back at 100 and stops it falling", "It makes the ball jump", "It turns gravity off", "It runs once, at the start"]
      answer: 0
      explain: "Every frame it asks whether the ball has sunk below y 100. If so, it puts the bottom back at 100 and sets vy to 0: the ball lands."
```

This ball has gravity and a floor. Press **A** (space) to throw it up.

### Faster and faster

### Top of the throw

### The floor

**bottom** is the y of the sprite's bottom edge (choose it in the dropdown of the x block). There is no ground in an empty Arcade game, so the program builds one with an if.

**Engine note.** Arcade can do the floor for you. A **tilemap** is a game world drawn from squares (tiles) in the tile editor; tiles marked as **walls** stop sprites by themselves. That is why platformers suit Arcade so well. This course builds the floor by hand first: a wall is this if, done by the engine.

## Modify

```step
stage: modify
insight: "ay sets how strong gravity is, and the size of the negative vy sets how high a throw or jump goes."
try: { playground: arcade, starter: "lesson.ts#floor" }
tasks:
  - hint: "In on A pressed, change -150 to -220."
    check: { type: code, text: "Throw the ball higher: an upward speed of -220.", rules: { inside: { "controller.A.onEvent(": ["ball.vy=-220"] } } }
  - hint: ["Change ay: try 100 for the Moon, 600 for a heavy planet.", "Pick the pair (throw and gravity) you like best."]
    check: { type: reflect, text: "I changed the gravity, and found a throw and a gravity that feel right." }
```

### Higher

Make **A** throw the ball higher.

### Moon gravity

Change **ay**. What does ay 100 feel like? And ay 600?

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A parameter is the value the call hands in; a negative vx moves left."
check:
  type: question
  q: "spawnEnemy(speed) sets bug vx to speed. The timer calls spawnEnemy(-40). Which way does the bug fly?"
  options: ["Left", "Right", "Up", "It stays still"]
  answer: 0
  explain: "speed is -40, so vx is -40: a negative vx moves the bug left."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "A timer (on game update every 1000 ms) makes an apple of kind Food at the top, at a random x."
  - "Give each apple gravity: set apple ay to 150, inside the timer."
  - "A Player–Food overlap: destroy the apple and change score by 1."
check: { type: code, text: "An apple drop: a timer drops an apple with gravity every second, and catching one scores.", rules: { inside: { "game.onUpdateInterval(": ["SpriteKind.Food", ".ay="], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food,": ["info.changeScoreBy("] } } }
unlocks: [set-ay]
```

Make an **apple drop**. The basket moves along the bottom:

- every second an **apple** falls from a random place at the top,
- each apple has **gravity**, so it speeds up as it falls,
- catching one **scores** a point.

## Change a trampoline

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#trampoline" }
```

This acrobat never stops bouncing: the floor sets vy to **-180** instead of 0. Make the bounces higher, then make the trampoline a little higher up the screen (both numbers in the if must change).

```teacher
summary: "Students give a sprite gravity (acceleration down), see that a fall speeds up and a throw rises, slows and comes back, and use gravity in a catching game."
time: 40
timing: "Predict and Run 7 min · Investigate 12 min · Modify 6 min · Mix it up 3 min · Make 9 min · Trampoline 3 min"
goals:
  - I can give a sprite gravity with ay and explain why it falls faster and faster.
  - I can make a sprite go up with a negative vy, and say what gravity does to it.
  - I can read a floor built with an if in on game update.
before: |
  **Velocity** (vx, vy) is how far the engine moves a sprite every frame. **Acceleration** (ay) is how much the engine changes the velocity: with ay 300, vy grows by 300 every second, a little each frame. So a sprite with ay falls **faster and faster**, like a dropped ball. A throw or jump is a speed upwards: **vy = -150** (negative, because y counts down). Gravity slows it, stops it at the top, and brings it back down. Nothing in an empty Arcade game is solid, so the lesson's program builds a **floor** with an if in **on game update**. Jumping only from the ground is next lesson. Tilemaps (wall tiles) do the floor for you in real platformers.
running:
  - "Predict: most expect a steady fall. Watch the ball closely: it speeds up."
  - "Investigate: the trace shows vy growing by ay each second. The throw shows gravity turning a negative vy round."
  - "Modify: bigger negative vy is a higher throw; ay is how strong gravity is."
  - "Mix it up: a parameter, from earlier."
  - "Make: ay goes inside the timer, on each new apple."
stuck:
  - see: "The ball falls through the bottom of the screen."
    ask: "What happens when the ball's bottom goes past 100?"
    fix: "The floor if in on game update puts it back. Check it names the ball."
  - see: "The throw does nothing, or the ball sinks."
    ask: "Is vy set to a negative or a positive number?"
    fix: "Up is negative: vy = -150."
  - see: "Apples fall at a steady speed."
    ask: "Which block gives each apple gravity?"
    fix: "Set apple ay inside the timer, after the apple is made."
stretch: "Make some apples heavier (bigger ay) and worth more points."
support: "Give students the timer that makes apples, and ask them only to add ay and the catch."
leads: "Next lesson: a jump that only works from the ground. Skillmaps: Jungle Jump Platformer and Monster Truck Racer (arcade.makecode.com/skillmaps) practise gravity and jumping with tilemaps."
exit:
  q: "A sprite with ay 200 starts still. What is its vy after 2 seconds, and why is it not still 0?"
  a: "400. Gravity adds 200 to vy every second."
explain: |
  1. **ay** is gravity: every frame the engine adds a little to **vy**, so a sprite falls **faster and faster**.
  2. A throw or jump is a speed upwards: **vy = -150**. Gravity slows it, stops it and brings it back down.
  3. There is no floor, so an **if** in **on game update** makes one: if bottom > 100, set bottom to 100 and vy to 0.
solutions:
  step-4#t1: lesson.ts#sol-higher
  step-6: lesson.ts#sol-make
struggle: "Gravity as acceleration, not a speed. Ask what vy is after one second, then after two."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner how the ball falls. Hold up 1, 2, 3 or 4 fingers.
      notes: "Drop a real ball: it speeds up. That is ay."
    - at: investigate
      title: Throw and catch
      minutes: 3
      do: |
        Throw a soft ball straight up and watch: fast, slower, stop, faster down.
      notes: "That is vy = -150 with gravity adding to it every moment."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Play the next pair's apple drop. Which apples are hard to catch, and why?
```

```code lesson.ts#fall
scene.setBackgroundColor(9)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(80, 10)
ball.ay = 300
```

```code lesson.ts#floor
scene.setBackgroundColor(9)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(80, 20)
ball.ay = 300
game.onUpdate(function () {
    if (ball.bottom > 100) {
        ball.bottom = 100
        ball.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ball.vy = -150
})
```

```code lesson.ts#sol-higher
scene.setBackgroundColor(9)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(80, 20)
ball.ay = 300
game.onUpdate(function () {
    if (ball.bottom > 100) {
        ball.bottom = 100
        ball.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ball.vy = -220
})
```

```code lesson.ts#review
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(150, randint(10, 110))
    bug.vx = speed
}
game.onUpdateInterval(1000, function () {
    spawnEnemy(-40)
})
```

```code lesson.ts#make
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
```

```code lesson.ts#sol-make
let apple: Sprite = null
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
    apple = sprites.create(img`
        . . 7 .
        . 2 2 .
        2 2 2 2
        . 2 2 .
        `, SpriteKind.Food)
    apple.setPosition(randint(10, 150), 0)
    apple.ay = 150
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#trampoline
scene.setBackgroundColor(1)
let acrobat = sprites.create(img`
    . a a .
    a a a a
    . 2 2 .
    . 2 2 .
    `, SpriteKind.Player)
acrobat.setPosition(80, 20)
acrobat.ay = 300
controller.moveSprite(acrobat, 60, 0)
game.onUpdate(function () {
    if (acrobat.bottom > 100) {
        acrobat.bottom = 100
        acrobat.vy = -180
    }
})
```
