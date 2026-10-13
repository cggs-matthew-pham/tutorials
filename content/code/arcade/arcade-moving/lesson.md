---
order: 2
unit: show-move
moveId: move-with-buttons
reviews: []
assumes: [variable]
title: Move with the controller
summary: Hand a sprite to the arrow keys with move with buttons, and choose how fast it goes across and down.
language: makecode
explainPicture: lesson.ts#fly
hook: "In every game you have played, a button press becomes movement on the screen. One block makes that link."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#fly", lesson: "code/arcade/arcade-moving", target: "arcade" }
  caption: "move with buttons hands a sprite to the arrow keys"
  say: "move with buttons hands a sprite to the arrow keys."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "It moves while a key is held, and stops when you let go."
        say: "It moves while a key is held, and stops when you let go."
    - caption:
        text: "The two numbers are speeds: across, then down."
        say: "The two numbers are speeds. The first is across, the second is up and down."
    - click: "Run"
    - wait: 600
    - caption:
        text: "A speed of 0 means no movement that way."
        say: "A speed of zero means no movement that way at all."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson every sprite stood still. Now the player steers one. **move with buttons** (in **Controller**) hands a sprite to the arrow keys (or W, A, S, D). Click the **+** on the block to show its two numbers: the **speed across** and the **speed up and down**, in pixels per second.

Click the simulator first, so it hears the keyboard. The **A** button is space (or Z) on the keyboard.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The plane has move with buttons with speeds 100 and 0. You hold the up arrow. What happens?"
  options: ["Nothing: the plane can only move left and right", "The plane flies up", "The plane jumps to x 100, y 0", "The plane flies up and to the right"]
  fault: logic
  misconception: moves-to-numbers
  actual: "Nothing. The second number is the speed up and down, and it is 0, so up and down do nothing. The numbers are speeds, not a place."
```

Lock in your prediction, then try it.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed all four arrow keys and compared what happened with my prediction." }
```

Click the game screen, then press each arrow key.

## Investigate

```step
stage: investigate
code: lesson.ts#fly
insight: "move with buttons links the arrow keys to one sprite, and its two numbers are its speeds across and down: a speed of 0 means it cannot move that way."
try: { playground: arcade, starter: "lesson.ts#fly" }
tasks:
  - check:
      type: match
      q: "Match each block with what it does to a sprite."
      pairs:
        - ["move with buttons", "lets the arrow keys steer it, while a key is held"]
        - ["set stay in screen", "stops it at the edge of the screen"]
        - ["set position", "puts it at one place, once"]
        - ["on A button pressed", "runs its blocks each time A is pressed"]
  - check:
      type: question
      q: "A sprite has move with buttons with speeds 50 and 100. Which way does it move faster?"
      options: ["Up and down", "Left and right", "The same both ways", "Neither: it jumps to (50, 100)"]
      answer: 0
      explain: "The first number (50) is the speed across, the second (100) the speed up and down. 100 is faster."
  - check:
      type: question
      q: "Kim's arrow keys move the cloud, not her plane. What did she do?"
      options: ["Her move with buttons block names the cloud", "The plane needs a velocity", "The cloud was made first", "The plane is the wrong kind"]
      answer: 0
      fault: logic
      misconception: controller-any-sprite
      explain: "move with buttons steers only the sprite it names. Click the sprite's name in the block and choose plane."
```

Fly the plane with the arrow keys. Press **A** (space) and see what that event does.

### What does it do?

### Which way is faster?

### Kim's cloud

## Modify

```step
stage: modify
insight: "The two numbers set which way the player can move, and how fast. A position change in an event moves a sprite once per press."
try: { playground: arcade, starter: "lesson.ts#modify" }
tasks:
  - hint: ["Click the + on the move plane with buttons block to show two speeds.", "The second number is the speed up and down. 0 means no up and down at all."]
    check: { type: code, text: "Make the plane fly only left and right, not up and down.", rules: { contains: ["controller.moveSprite(plane,", ",0)"] } }
  - hint: ["Drag in on A button pressed from Controller.", "From Sprites, drag change plane x by inside it, and make it 30."]
    check: { type: code, text: "Make A dash the plane 30 pixels to the right, once per press.", rules: { inside: { "controller.A.onEvent(": ["plane.x+=30"] } } }
```

### Only across

Make the plane fly left and right only, like a ship along the bottom of the screen.

### Dash

Add an event: each press of **A** dashes the plane 30 pixels to the right. Press it a few times.

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "move with buttons is in Controller. Click + to show the two speeds."
  - "Across only: the second speed is 0. set stay in screen is in Sprites."
check: { type: code, text: "A ship along the bottom of the screen that moves only left and right, and cannot leave the screen.", rules: { contains: ["controller.moveSprite(ship,", ",0)", "ship.setStayInScreen(true)"] } }
unlocks: [move-with-buttons]
```

Make a **ship** for a space game:

- it sits near the **bottom** of the screen
- the arrow keys move it **left and right only**
- it **cannot leave** the screen

## Change a goalkeeper

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#keeper" }
```

This goalkeeper guards a goal on the left. Make it move **up and down only**, a bit slower, and keep it on the screen.

```teacher
summary: "Students hand a sprite to the arrow keys with move with buttons, and see that its two numbers are speeds across and down, not a place."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 10 min · Make 8 min · Goalkeeper 5 min"
goals:
  - I can let the player steer a sprite with the arrow keys.
  - I can choose which way a sprite can move, and how fast.
  - I can keep a sprite on the screen.
before: |
  **move with buttons** (Controller) hands a sprite to the arrow keys: it moves while a key is held. Its two numbers (click + to show them) are the **speeds** across and up and down, in pixels per second; 0 stops movement that way. They are not a position. **on A button pressed** is an event: it runs each time A (space or Z) is pressed. Students must click the simulator before it hears keys.
running:
  - "Predict: some students read the numbers as a place (100, 0). Ask what happens while a key is held."
  - "Run: all four arrows. Up and down do nothing."
  - "Investigate: Kim's cloud shows that the block steers only the sprite it names."
  - "Modify: the dash changes x by 30: a position change, once per press."
  - "Make: speeds 100 and 0, plus stay in screen."
stuck:
  - see: "The arrow keys do nothing."
    ask: "Did you click the simulator? Is there a move with buttons block?"
    fix: "Click once on the game screen so it hears the keyboard, and check move with buttons names the right sprite."
  - see: "The sprite flies off the edge."
    ask: "What stops it at the edge?"
    fix: "Add set stay in screen for that sprite."
  - see: "The sprite moves up and down when it should not."
    ask: "Which number is the speed up and down?"
    fix: "Click + on move with buttons; set the second number to 0."
stretch: "Make A dash right and B dash left, and make the ship faster across than the plane was."
support: "Give students the ship with move with buttons already in, and ask them only to set the two speeds and keep it on the screen."
leads: "Next lesson: a speed the engine applies by itself, so a sprite keeps moving with nobody pressing anything."
exit:
  q: "move with buttons has speeds 0 and 80. Which arrow keys do something?"
  a: "Only up and down. The first number, the speed across, is 0."
explain: |
  **move with buttons** hands a sprite to the arrow keys. It moves while a key is held, and stops when you let go.

  Its two numbers are **speeds**: the first across, the second up and down, in pixels per second. A speed of **0** means it cannot move that way.

  **set stay in screen** stops it at the edge.
solutions:
  step-4#t1: lesson.ts#sol-across
  step-4#t2: lesson.ts#sol-dash
  step-5: lesson.ts#sol-make
struggle: "Reading the two numbers as speeds, not a place. Ask what each number does while a key is held."
class:
  activities:
    - at: investigate
      title: Remote control
      minutes: 4
      do: |
        One student is the sprite. The class holds up cards: across speed and up-down speed. The 'remote' presses arrows; the sprite moves only the ways its speeds allow.
      notes: "A speed card of 0 means that direction is locked."
    - at: end
      title: Escape test
      minutes: 3
      do: |
        Swap ships with the next pair. Can theirs leave the screen?
```

```code lesson.ts#predict
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(80, 60)
controller.moveSprite(plane, 100, 0)
```

```code lesson.ts#fly
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    plane.setPosition(20, 60)
})
```

```code lesson.ts#modify
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
```

```code lesson.ts#sol-across
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane, 100, 0)
```

```code lesson.ts#sol-dash
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    plane.x += 30
})
```

```code lesson.ts#make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 105)
```

```code lesson.ts#sol-make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 105)
controller.moveSprite(ship, 100, 0)
ship.setStayInScreen(true)
```

```code lesson.ts#keeper
scene.setBackgroundColor(7)
let keeper = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
keeper.setPosition(15, 60)
controller.moveSprite(keeper)
```
