---
order: 8
unit: powerups
moveId: remember-state
reviews: [list-per-level, if-else-steer]
introduces: [bool-value]
assumes: [variable, random, if, else, function, variable-update, list, list-index]
title: True or false
summary: A variable that holds true or false remembers whether a power-up is on, so an overlap can ask about it.
language: makecode
explainPicture: lesson.ts#predict
hook: "A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that is true for a while."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade-advanced/arcade-flag", target: "arcade" }
  caption: "A power-up has three parts"
  say: "A power-up has three parts: a variable, an event, and a rule."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "The variable: shield is true while it is on."
        say: "The variable remembers it: shield is true while it's on."
    - caption:
        text: "The event: catching a star sets it to true."
        say: "The event changes it: catching a star sets shield to true."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The rule: if shield, a rock costs no life."
        say: "The rule uses it: if shield is on, a rock costs no life."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A variable can hold **true** or **false** (in **Logic**). In this game `shield` starts **false**. Catching a yellow **star** sets it to **true**. When a rock hits, **if shield** asks whether it is true right now: true smashes the rock for 5 points, false costs a life.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You catch one star. How long does the shield last?"
  options: ["For the rest of the game", "Until the next rock hits you", "5 seconds", "One frame"]
  fault: logic
  misconception: flag-never-reset-arcade
  actual: "For the rest of the game. Catching the star sets shield to true, and no block ever sets it back to false."
```

Read the two overlap events. The background turns dark blue while the shield is on.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I caught a star and saw how long the shield lasted." }
```

Catch a star (one floats past every 5 seconds), then fly into the rocks. Is this power-up fair?

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "A true or false variable remembers whether something is on; an event sets it, an if asks it, and it stays as it is until a block sets it back."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - check:
      type: trace
      text: "Fill in what happens when a rock hits the ship."
      table: |
        | shield | lives before | lives after | score change |
        | false | 3 | [2] | [0] |
        | true | 3 | [3] | [5] |
        | false | 1 | [0] | [0] |
      explain: "The if asks shield every time a rock hits. True: 5 points and no life lost. False: lose a life."
  - check:
      type: sort
      q: "Which needs true or false, and which needs a number?"
      options: ["true or false", "a number"]
      items:
        - ["Is the shield on?", "true or false"]
        - ["How many lives are left?", "a number"]
        - ["Has the player found the key?", "true or false"]
        - ["How many shots are left?", "a number"]
      explain: "A yes-or-no question needs true or false. How many needs a number."
  - check:
      type: question
      q: "Tom's shield smashes every rock for the rest of the game after one star. What is missing?"
      options: ["A block that sets shield back to false", "Another set shield to true", "An if in on start", "A second star"]
      answer: 0
      fault: logic
      misconception: flag-never-reset-arcade
      explain: "A true or false variable stays as it is until a block changes it. Nothing sets shield back to false, so it stays true."
```

### Shield on, shield off

Trace a rock hitting the ship.

### True or false, or a number?

### Tom's shield

## Modify

```step
stage: modify
insight: "Setting the variable back to false ends the power-up; any rule can ask the same variable."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - hint: ["The shield should break when it smashes a rock: inside if shield, after the points.", "set shield to false, and set the background back to 15 (black)."]
    check: { type: code, text: "The shield breaks after one smash.", rules: { count: { "shield=false": 2 } } }
  - hint: "In the star overlap, before shield is set to true: if shield, change score by 3."
    check: { type: code, text: "A star caught while the shield is already on is worth 3 points.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food,": ["if(shield"] } } }
```

### One smash

Make the shield **break** after it smashes one rock.

### Bonus star

If the shield is **already on**, a star is worth 3 points.

## Mix it up

```step
stage: investigate
insight: "A list holds what changes per level, looked up with the level as the place, counted from 0."
check:
  type: number
  q: "colours is 9, 4, 2, 7 and level is 2. What number does colours[level] give?"
  answer: 2
  explain: "Places start at 0: place 0 is 9, place 1 is 4, place 2 is 2."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "A new variable, hunting, set to false in on start."
  - "The pellet overlap: destroy the pellet, set hunting to true, and change the background."
  - "The ghost overlap: if hunting, score 5, set hunting to false and put the background back; else lose a life. Either way, send the ghost to the corner."
check: { type: code, text: "A power pellet: catch it and the next ghost you touch is worth 5 points, not a life.", rules: { contains: ["hunting=true"], inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,": ["if(hunting", "hunting=false"] } } }
unlocks: [true-or-false]
```

A ghost chases you. A **power pellet** appears every 6 seconds. Make it a power-up:

- a variable `hunting` is **false** at the start,
- catching a pellet sets it to **true** (show it with a background colour),
- touching the ghost while hunting scores 5 and sets hunting back to **false**; otherwise it costs a life.

## Change a key and a door

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#door" }
```

Find the key, then reach the door. Right now the door opens with no key. Use `hasKey` so the door only opens if you have the key, and if you don't, splash "Locked!" and move the explorer back a step (or the splash comes back every frame).

```teacher
summary: "Students use a true or false variable to remember whether a shield is on, see that it stays true until a block sets it back, and build a power pellet."
time: 45
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 12 min · Door 5 min"
goals:
  - I can use a true or false variable to remember whether a power-up is on.
  - I can set it back to false at the right moment.
  - I can build a power-up from a variable, an event and a rule.
before: |
  A variable can hold **true** or **false** (Logic). A power-up is three parts: a **variable** that remembers it (`shield`), an **event** that changes it (catching a star sets it to true) and a **rule** that uses it (*if shield* in the rock overlap).

  The misconception: a true or false variable stays as it is until a block changes it, so a shield set once lasts for ever. Modify fixes it the simplest way (break after one smash); next lesson makes it run out with a countdown.
running:
  - "Predict and Run: the shield never ends. Ask: is this fair? What would make it fair?"
  - "Investigate: the match separates yes-or-no from how many."
  - "Modify: one smash needs set shield to false inside the if."
  - "Mix it up: lists from last lesson."
  - "Make: ask students to name the variable, the event and the rule before they start."
stuck:
  - see: "The shield never switches on."
    ask: "Where is shield set to true, and does that event ever run?"
    fix: "Inside the Player–Food overlap; check the star is made as Food."
  - see: "The shield is on from the start."
    ask: "What is shield set to in on start?"
    fix: "false."
  - see: "Hunting lasts for ever."
    ask: "Which block sets hunting back to false?"
    fix: "Add set hunting to false inside if hunting, in the ghost overlap."
stretch: "Two pellets in a row: count the ghosts eaten while hunting, and give 5, then 10."
support: "Give students the hunting variable and the pellet overlap, so they write only the if in the ghost overlap."
leads: "Next: run out, a number that counts down so a power-up lasts a set time. Skillmap: Save the Galaxy (arcade.makecode.com/skillmaps) adds power-ups to a shooter."
exit:
  q: "Name the three parts of a power-up, using the shield as the example."
  a: "A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life)."
explain: |
  A power-up has three parts:

  1. a **variable** that remembers it: `shield` is **true** while it is on,
  2. an **event** that changes it: catching a star sets it to true,
  3. a **rule** that uses it: *if shield*, a rock costs no life.

  It stays true until a block sets it back to **false**.
solutions:
  step-4#t1: lesson.ts#sol-once
  step-4#t2: lesson.ts#sol-bonus
  step-6: lesson.ts#sol-make
struggle: "Setting it back. When a power-up never ends, ask which block sets it to false."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 2
      do: |
        Decide with your partner how long the shield lasts.
    - at: investigate
      title: Hands up
      minutes: 3
      do: |
        A student is the shield: hand up means true. Call "star" (hand up) and "rock" several times. When does the hand come down?
      notes: "Never, unless someone says so. That is the missing block."
    - at: end
      title: Power-up cards
      minutes: 4
      do: |
        Draw a card for a power-up of your own: its variable, its event and its rule.
```

```code lesson.ts#predict
let rock: Sprite = null
let star: Sprite = null
let shield = false
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

```code lesson.ts#sol-once
let rock: Sprite = null
let star: Sprite = null
let shield = false
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
        shield = false
        scene.setBackgroundColor(15)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    shield = true
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

```code lesson.ts#sol-bonus
let rock: Sprite = null
let star: Sprite = null
let shield = false
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
    if (shield) {
        info.changeScoreBy(3)
    }
    shield = true
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

```code lesson.ts#make
let pellet: Sprite = null
scene.setBackgroundColor(15)
let player = sprites.create(img`
    . 5 5 .
    5 5 5 5
    5 5 . .
    5 5 5 5
    . 5 5 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let ghost = sprites.create(img`
    . 2 2 .
    2 1 1 2
    2 2 2 2
    2 . 2 .
    `, SpriteKind.Enemy)
ghost.setPosition(150, 10)
ghost.follow(player, 30)
info.setLife(3)
game.onUpdateInterval(6000, function () {
    pellet = sprites.create(img`
        . 1 .
        1 1 1
        . 1 .
        `, SpriteKind.Food)
    pellet.setPosition(randint(10, 150), randint(10, 110))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(150, 10)
})
```

```code lesson.ts#sol-make
let pellet: Sprite = null
let hunting = false
scene.setBackgroundColor(15)
let player = sprites.create(img`
    . 5 5 .
    5 5 5 5
    5 5 . .
    5 5 5 5
    . 5 5 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let ghost = sprites.create(img`
    . 2 2 .
    2 1 1 2
    2 2 2 2
    2 . 2 .
    `, SpriteKind.Enemy)
ghost.setPosition(150, 10)
ghost.follow(player, 30)
info.setLife(3)
game.onUpdateInterval(6000, function () {
    pellet = sprites.create(img`
        . 1 .
        1 1 1
        . 1 .
        `, SpriteKind.Food)
    pellet.setPosition(randint(10, 150), randint(10, 110))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    hunting = true
    scene.setBackgroundColor(8)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (hunting) {
        info.changeScoreBy(5)
        hunting = false
        scene.setBackgroundColor(15)
    } else {
        info.changeLifeBy(-1)
    }
    otherSprite.setPosition(150, 10)
})
```

```code lesson.ts#door
let hasKey = false
scene.setBackgroundColor(6)
let explorer = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 7 7 .
    . 7 7 .
    `, SpriteKind.Player)
explorer.setPosition(20, 100)
controller.moveSprite(explorer)
explorer.setStayInScreen(true)
let key = sprites.create(img`
    5 5 . . .
    5 5 5 5 5
    5 5 . 5 .
    `, SpriteKind.Food)
key.setPosition(randint(20, 140), randint(10, 50))
let door = sprites.create(img`
    e e e e
    e e e e
    e e 5 e
    e e e e
    e e e e
    `, SpriteKind.Enemy)
door.setPosition(150, 100)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    hasKey = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(true)
})
```
