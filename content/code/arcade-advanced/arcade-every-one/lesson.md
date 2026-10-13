---
order: 1
unit: many
moveId: every-of-kind
reviews: [fire-a-projectile]
introduces: [for-of]
assumes: [variable, random]
title: Every one of a kind
summary: Get a list of every sprite of a kind, and use a for element loop to do something to each one.
language: makecode
explainPicture: lesson.ts#freeze
hook: "A smart bomb clears the screen, a freeze spell stops every enemy, a magnet pulls in every coin: one press, every sprite of a kind."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#freeze", lesson: "code/arcade-advanced/arcade-every-one", target: "arcade" }
  caption: "array of sprites of kind is a list of every one"
  say: "Array of sprites of kind enemy is a list of every enemy right now."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "for element runs its blocks once for each item in the list."
        say: "A for element loop runs its blocks once for each item in the list."
    - click: "Run"
    - wait: 600
    - caption:
        text: "value stands for each alien in turn."
        say: "Each time round, value stands for the next alien."
    - caption:
        text: "So one press reaches every alien, though none has a name."
        say: "So one press reaches every alien, even though none of them has a name."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
In a shooter, aliens are made by a timer and have no names of their own. How can one button do something to **all** of them? **array of sprites of kind** (in **Sprites**) gives a **list**: every sprite of that kind in the game right now. A **for element** loop (in **Loops**) runs its blocks once for each item in the list, with **value** standing for that item.

## Predict

```step
stage: predict
code: lesson.ts#freeze
check:
  type: predict
  q: "There are 6 aliens falling. You press B. What happens?"
  options: ["All 6 aliens stop", "Only the newest alien stops", "Only one alien stops: the loop runs once", "Nothing: the aliens have no names"]
  fault: logic
  misconception: loop-runs-once
  actual: "All 6 stop. array of sprites of kind Enemy is a list of all 6, and the for element loop runs set value vy to 0 once for each, with value as that alien."
```

B is enter (or X) on the keyboard.

## Run

```step
stage: run
code: lesson.ts#freeze
try: { playground: arcade, starter: "lesson.ts#freeze" }
check: { type: reflect, text: "I pressed B with several aliens on the screen and compared what happened with my prediction." }
```

Wait for a few aliens, then press **B**.

## Investigate

```step
stage: investigate
code: lesson.ts#freeze
insight: "array of sprites of kind gives a list of every sprite of a kind right now, and a for element loop runs its blocks once for each one, with value as that sprite."
tasks:
  - check:
      type: number
      q: "There are 4 aliens on the screen when you press B. How many times does set value vy to 0 run?"
      answer: 4
      explain: "The list has 4 aliens, and the loop runs its blocks once for each one."
  - check:
      type: question
      q: "Mia's smart bomb has change score by 1 after the loop, not inside it. There are 5 aliens. She presses B. How much does the score go up?"
      options: ["1", "5", "0", "6"]
      answer: 0
      fault: logic
      misconception: loop-runs-once
      explain: "Only the blocks inside the loop run once per alien. A block after the loop runs once, when the loop has finished."
  - check:
      type: match
      q: "The loop in Python. Match each part with what it does."
      pairs:
        - ["sprites.all_of_kind(SpriteKind.enemy)", "a list of every enemy right now"]
        - ["for value in …:", "runs the indented lines once for each item"]
        - ["value.vy = 0", "stops this one alien"]
```

### How many times?

### Mia's smart bomb

Mia's B event:

```makecode
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    info.changeScoreBy(1)
})
```

### In Python

```python
def on_b_pressed():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        value.vy = 0
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)
```

## Modify

```step
stage: modify
insight: "Anything you can do to one sprite, the loop can do to every sprite of a kind."
try: { playground: arcade, starter: "lesson.ts#freeze" }
tasks:
  - hint: "Inside the loop, add set value y to 0 (Sprites)."
    check: { type: code, text: "Make B also send every alien back to the top.", rules: { inside: { "controller.B.onEvent(": ["value.y=0"] } } }
  - hint: ["Drag in on A button pressed. Put another for element loop over array of sprites of kind Enemy inside it.", "Inside the loop: set value vy to 40."]
    check: { type: code, text: "Make A speed every alien up: vy 40.", rules: { inside: { "controller.A.onEvent(": ["sprites.allOfKind(SpriteKind.Enemy)", "value.vy=40"] } } }
```

### Back to the top

Make **B** send every alien back to the top as it freezes them.

### Speed up

Make **A** speed every alien up.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A projectile is its own kind, and the engine removes it when it leaves the screen."
check:
  type: question
  q: "A shot is fired, misses, and flies off the top of the screen. What happens to it?"
  options: ["The engine removes it", "It stays above the screen for ever", "It comes back at the bottom", "It becomes an alien"]
  answer: 0
  explain: "The engine removes a projectile as soon as it leaves the screen."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Start with on B pressed (in Controller). Inside it, a for element loop from Loops."
  - "Drag array of sprites of kind (Sprites) into the loop's list slot, and choose Enemy."
  - "Inside the loop: destroy value, and change score by 1."
check: { type: code, text: "A smart bomb: pressing B destroys every alien on the screen and scores one point for each.", rules: { contains: ["ofsprites.allOfKind(SpriteKind.Enemy)"], inside: { "controller.B.onEvent(": ["destroy(", "info.changeScoreBy("] } } }
unlocks: [for-element-of-list]
```

The aliens come twice as fast now. Make a **smart bomb** on the **B** button:

- every alien on the screen is destroyed,
- you score **one point for each** alien.

Count the aliens before you press B, and check the score goes up by that many.

## Change a firework show

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#fireworks" }
```

**A** launches a rocket; **B** makes every rocket in the sky burst off in a random direction. Make the rockets launch faster, and make **B** also change the background colour, so the sky flashes when they burst.

```teacher
summary: "Students get a list of every sprite of a kind with array of sprites of kind, and use a for element loop to do something to each one."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Fireworks 4 min"
goals:
  - I can do something to every sprite of a kind with one press.
  - I can say how many times a for element loop runs.
  - I can put blocks inside a loop when they should happen for each sprite.
before: |
  A **list** (an **array** in MakeCode) is many values in order under one name. **array of sprites of kind Enemy** (Sprites) is a list of every enemy in the game right now. A **for element** loop (Loops; MakeCode calls it "for element value of list") runs its blocks once for each item, with **value** standing for that item each time. That is how one button press can reach sprites that have no names. Blocks inside the loop run once per sprite; blocks after it run once.
running:
  - "Predict: some students expect only one alien to stop, or none, because the aliens have no names."
  - "Investigate: Mia's smart bomb is the inside-or-after slip: the score goes up once."
  - "Modify: anything you can do to one sprite goes inside the loop."
  - "Mix it up: projectiles, from the last course."
  - "Make: destroy and change score both go inside the loop."
stuck:
  - see: "The smart bomb only scores 1, however many aliens there were."
    ask: "Is change score inside the loop, or after it?"
    fix: "Inside the loop it runs once per alien. Drag it inside, under destroy value."
  - see: "Nothing happens when B is pressed."
    ask: "Which kind does array of sprites of kind name?"
    fix: "Choose Enemy in its dropdown."
  - see: "The loop's value block is missing."
    ask: "Where does value come from?"
    fix: "Drag value out of the for element block itself."
stretch: "Make a magnet on A+B: every Food sprite flies towards the player (set value vx and vy, or use follow)."
support: "Give students the on B pressed block with an empty for element loop already in it, and ask them only to choose the list and fill the loop."
leads: "Next lesson: functions, which name a job such as 'make an enemy' so it can be used in many places. Skillmap: Save the Galaxy (arcade.makecode.com/skillmaps) is a Galaga-style shooter that practises projectiles and enemies."
exit:
  q: "There are 5 enemies on the screen. A for element loop over array of sprites of kind Enemy contains change score by 1. How much does the score go up?"
  a: "By 5. The list has 5 enemies, and the loop runs its blocks once for each one."
explain: |
  1. **array of sprites of kind Enemy** is a **list** of every enemy in the game right now.
  2. A **for element** loop runs its blocks **once for each** item in the list, with **value** as that item.
  3. Blocks **inside** the loop run once per sprite; blocks **after** it run once.

  So one press of B can reach every enemy, even though none of them has a name.
solutions:
  step-4#t1: lesson.ts#sol-top
  step-4#t2: lesson.ts#sol-faster
  step-6: lesson.ts#sol-make
struggle: "Which blocks go inside the loop. Ask: should this happen once, or once for each alien?"
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what B does to 6 aliens. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask the 'no names' group how a teacher could tell every student to sit without naming them."
    - at: investigate
      title: Everyone wearing blue
      minutes: 3
      do: |
        The teacher says "for each student wearing blue: stand up and clap". Then "for each student wearing blue: stand up. Then clap once."
      notes: "The first claps once per student; the second claps once in all. Inside the loop, and after it."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your smart bomb to the next pair. Count the aliens, press B, and check the score.
```

```code lesson.ts#freeze
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vy = 0
    }
})
```

```code lesson.ts#sol-top
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vy = 0
        value.y = 0
    }
})
```

```code lesson.ts#sol-faster
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vy = 0
        value.y = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vy = 40
    }
})
```

```code lesson.ts#review
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        4 4 4
        `, ship, 0, -100)
})
```

```code lesson.ts#make
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
        info.changeScoreBy(1)
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.vx = randint(-50, 50)
        value.vy = randint(-50, 50)
    }
})
```
