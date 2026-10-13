---
order: 3
unit: show-move
moveId: engine-moves-it
reviews: [place-a-sprite]
assumes: [variable]
title: Speed
summary: Give a sprite a velocity, so the game engine keeps it moving by itself until something changes it.
language: makecode
explainPicture: lesson.ts#drift
hook: "A car in a racing game, a cloud drifting past, a ball in pong: none of them is pushed by hand every frame. The game is told a speed, and keeps them moving."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#drift", lesson: "code/arcade/arcade-speed", target: "arcade" }
  caption: "A sprite has a position and a velocity"
  say: "A sprite has a position and a velocity."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Position (x, y) is where it is now. Setting it moves it once."
        say: "Position is where it is now. Setting it moves the sprite once."
    - caption:
        text: "Velocity (vx, vy) is a speed, in pixels per second."
        say: "Velocity is a speed. The engine moves the sprite a little every frame."
    - click: "Run"
    - wait: 600
    - caption:
        text: "It keeps moving until something changes it."
        say: "So it keeps moving until something changes it, like a wall or a new speed."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
The plane moved only while you held a key. Many things in a game move with nobody pressing anything: clouds, cars, enemies. They have a **velocity**: a speed across (**vx**) and down (**vy**), in pixels per second. The **game engine** moves the sprite a little every **frame** (one redraw of the screen, about 30 times a second).

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The ball's velocity is set to 50 across and 0 down. What does the ball do?"
  options: ["Moves 50 pixels right, then stops", "Keeps moving right, off the edge of the screen", "Jumps to x 50 and stays there", "Moves 50 pixels down, then stops"]
  fault: logic
  misconception: position-vs-velocity
  actual: "It keeps moving right and leaves the screen. A velocity is a speed (50 pixels every second), not a distance, so the engine keeps moving the ball until something changes the speed."
```

There is no loop here: the blocks in **on start** run once. Lock in what you think the ball will do.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched the ball and compared it with my prediction." }
```

Watch the ball. Press the restart button under the simulator to see it again.

## Investigate

```step
stage: investigate
code: lesson.ts#drift
insight: "A velocity is a speed in pixels per second: the engine moves the sprite a little every frame, so it keeps moving until something changes the velocity. Setting a position moves it once."
try: { playground: arcade, starter: "lesson.ts#drift" }
tasks:
  - check:
      type: match
      q: "Match each block with what it does to a sprite."
      pairs:
        - ["set position", "puts it at one place, once"]
        - ["set velocity", "keeps it moving by itself, a little every frame"]
        - ["set bounce on wall", "turns it back when it hits an edge"]
  - check:
      type: number
      q: "The cloud starts at x 80 with a velocity of 30 across. After 2 seconds, how many pixels has it moved?"
      answer: 60
      explain: "A velocity of 30 means 30 pixels every second. In 2 seconds the engine moves it 30 + 30 = 60 pixels, a tiny step each frame."
  - check:
      type: question
      q: "Leo wants A to make his rocket hop 30 pixels to the right. He sets vx to 30 when A is pressed. What happens?"
      options: ["The rocket keeps sliding right, off the edge of the screen", "The rocket hops 30 pixels and stops", "Nothing: vx only works in on start", "The rocket moves 30 pixels up"]
      answer: 0
      fault: logic
      misconception: position-vs-velocity
      explain: "vx is a speed, not a distance. Setting it to 30 starts the rocket moving 30 pixels every second, and nothing sets it back to 0. A hop changes the position: change x by 30."
```

Watch the cloud drift and bounce.

### What does it do?

### How far?

### Leo's rocket

Leo's event:

```makecode
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    rocket.vx = 30
})
```

## Modify

```step
stage: modify
insight: "Both numbers of a velocity count: across and down together make a slant. Setting the velocity to 0 stops the engine moving it."
try: { playground: arcade, starter: "lesson.ts#drift" }
tasks:
  - hint: "The second number in set velocity is the speed down. Make it 20."
    check: { type: code, text: "Make the cloud drift at a slant: 30 across and 20 down, so it bounces off every wall.", rules: { contains: ["cloud.setVelocity(30,20)", "cloud.setBounceOnWall(true)"] } }
  - hint: ["Drag in on B button pressed from Controller.", "Inside it: set cloud velocity to 0, 0."]
    check: { type: code, text: "Make B stop the cloud.", rules: { inside: { "controller.B.onEvent(": ["cloud.setVelocity(0,0)"] } } }
```

### A slant

Give the cloud a speed **down** of 20 as well as 30 across. Watch it bounce off every wall.

### Stop

Make **B** (enter on the keyboard) stop the cloud.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "x counts across from the left; y counts down from the top."
check:
  type: question
  q: "The star is placed at (150, 20). Where does it appear?"
  options: ["Near the top right corner", "Near the bottom right corner", "Near the top left corner", "In the middle"]
  answer: 0
  explain: "x 150 is near the right edge (the screen is 160 across), and y 20 is near the top, because y counts down."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Plane: move with buttons (Controller) and set stay in screen (Sprites)."
  - "Cloud: a new sprite with its own name, then set velocity and set bounce on wall (both in Sprites)."
  - "Give the cloud a velocity down as well as across, so it drifts at a slant and bounces off every wall."
check: { type: code, text: "A plane the player flies that stays on the screen, and a cloud with a velocity that bounces off the walls.", rules: { contains: ["controller.moveSprite(plane", "plane.setStayInScreen(true)", ".setVelocity(", ".setBounceOnWall(true)"], count: { "sprites.create(": 2 } } }
unlocks: [set-velocity]
```

Make a **sky game**:

- the player flies the **plane** with the arrow keys
- the plane **cannot leave** the screen
- a **cloud** drifts by itself and **bounces** off the walls

Try to fly through the cloud. (Nothing happens yet: next lesson sprites notice when they touch.)

## Change a conveyor belt

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#conveyor" }
```

This factory belt carries boxes to the right, and the worker moves along the floor. Make the belt run twice as fast, add a third box, then make **A** stop the belt by setting each box's vx to 0.

```teacher
summary: "Students give sprites a velocity, and see that the engine keeps a sprite moving every frame until something changes it, while setting a position moves it once."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Conveyor belt 4 min"
goals:
  - I can give a sprite a velocity so it moves by itself.
  - I can make it bounce off the walls, and stop it.
  - I can explain the difference between setting a position and setting a velocity.
before: |
  A **position** (x, y) is where a sprite is **now**. Setting it moves the sprite once. A **velocity** (vx across, vy down) is a **speed in pixels per second**: the game engine moves the sprite a little every **frame** (about 30 a second), and keeps doing it until something changes the velocity. So *set velocity to 50, 0* does not mean "move 50 pixels"; it means "keep moving right at 50 pixels a second", off the edge if nothing stops it.
running:
  - "Predict: most students choose 'moves 50 pixels and stops'. The ball sailing off the screen is the lesson's surprise."
  - "Run: ask 'what would make it stop?' Nothing in the program changes the speed, so nothing does."
  - "Investigate: the number task connects speed and distance. Leo's rocket is the same idea as the Predict, inside an event."
  - "Modify: a slant needs both numbers. B sets the velocity to 0."
  - "Mix it up: screen positions, from lesson 1."
  - "Make: the cloud needs its own variable name."
stuck:
  - see: "The sprite flies off the screen and is gone."
    ask: "What stops it at the edge?"
    fix: "Add set bounce on wall (for a drifting sprite) or set stay in screen (for the player)."
  - see: "A press of A sends the sprite sliding away for ever."
    ask: "Did you change its position or its velocity?"
    fix: "For a hop, change x (position). Changing vx changes its speed, which lasts until something sets it again."
  - see: "The cloud does not move at all."
    ask: "Which sprite does the set velocity block name?"
    fix: "Choose the cloud in the block's dropdown; it may still name the plane."
stretch: "Give the cloud a velocity that changes on A (faster) and B (stop), and add a second cloud drifting the other way."
support: "Give students the cloud sprite already made, and ask them to add only set velocity and set bounce on wall."
leads: "Next lesson sprites notice each other: an overlap event runs when the plane touches a cloud or a coin. Class idea: measure a sprite's speed with a stopwatch."
exit:
  q: "A sprite has vx set to 20. Will it move 20 pixels, or keep moving? Why?"
  a: "It keeps moving. vx is a speed (20 pixels every second), and the engine moves the sprite every frame until something changes vx."
explain: |
  A sprite has a **position** and a **velocity**:

  1. **Position** (x, y) is **where it is now**. Setting it moves the sprite **once**.
  2. **Velocity** (vx, vy) is a **speed**, in pixels per second. The engine moves the sprite a little **every frame**, about 30 times a second.
  3. So a velocity keeps the sprite moving **until something changes it**: a new velocity, or a wall it bounces off.
solutions:
  step-4#t1: lesson.ts#sol-slant
  step-4#t2: lesson.ts#sol-stop
  step-6: lesson.ts#sol-make
struggle: "Position versus velocity: one sets where a sprite is, the other how it keeps moving. Ask which one the engine changes every frame."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the ball does. Hold up 1, 2, 3 or 4 fingers.
      notes: "Most choose 'moves 50 and stops'. Run it."
    - at: investigate
      title: Walk at a speed
      minutes: 4
      do: |
        One student walks across the room at 'one step a second' and keeps going until someone calls a new speed.
      notes: "Nobody pushes them each step. That is what the engine does with a velocity."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your sky game to the next pair. Try to fly through the cloud.
```

```code lesson.ts#predict
scene.setBackgroundColor(9)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(20, 60)
ball.setVelocity(50, 0)
```

```code lesson.ts#drift
scene.setBackgroundColor(9)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    . 1 1 1 1 1 1 1 1 .
    `, SpriteKind.Player)
cloud.setPosition(80, 30)
cloud.setVelocity(30, 0)
cloud.setBounceOnWall(true)
```

```code lesson.ts#sol-slant
scene.setBackgroundColor(9)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    . 1 1 1 1 1 1 1 1 .
    `, SpriteKind.Player)
cloud.setPosition(80, 30)
cloud.setVelocity(30, 20)
cloud.setBounceOnWall(true)
```

```code lesson.ts#sol-stop
scene.setBackgroundColor(9)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    . 1 1 1 1 1 1 1 1 .
    `, SpriteKind.Player)
cloud.setPosition(80, 30)
cloud.setVelocity(30, 20)
cloud.setBounceOnWall(true)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    cloud.setVelocity(0, 0)
})
```

```code lesson.ts#review
scene.setBackgroundColor(15)
let star = sprites.create(img`
    . 5 .
    5 5 5
    . 5 .
    `, SpriteKind.Player)
star.setPosition(150, 20)
```

```code lesson.ts#make
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
```

```code lesson.ts#sol-make
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane)
plane.setStayInScreen(true)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    . 1 1 1 1 1 1 1 1 .
    `, SpriteKind.Player)
cloud.setPosition(80, 20)
cloud.setVelocity(-25, 10)
cloud.setBounceOnWall(true)
```

```code lesson.ts#conveyor
scene.setBackgroundColor(11)
let worker = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
worker.setPosition(80, 100)
controller.moveSprite(worker, 100, 0)
let box1 = sprites.create(img`
    e e e e e
    e d d d e
    e e e e e
    `, SpriteKind.Player)
box1.setPosition(10, 60)
box1.vx = 20
let box2 = sprites.create(img`
    e e e e e
    e d d d e
    e e e e e
    `, SpriteKind.Player)
box2.setPosition(50, 60)
box2.vx = 20
```
