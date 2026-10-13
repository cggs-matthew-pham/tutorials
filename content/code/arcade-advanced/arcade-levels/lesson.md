---
order: 6
unit: levels
moveId: level-up
reviews: [jump-from-ground, name-a-job]
introduces: [variable-update]
assumes: [variable, random, if, function]
recipes: [text-join]
title: Level up
summary: Keep the level in a variable and change it where the score changes, with a goal that moves up each time.
language: makecode
explainPicture: lesson.ts#predict
hook: "Almost every game gets harder as you play. Behind it is one number, the level, and one place where it changes."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade-advanced/arcade-levels", target: "arcade" }
  caption: "A variable called level remembers where the player is"
  say: "A variable called level remembers where the player is."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "The level goes up where the score changes: in the overlap."
        say: "The level goes up where the score changes: in the overlap."
    - click: "Run"
    - wait: 600
    - caption:
        text: "goal moves up by 5, so the next level needs 5 more coins."
        say: "Goal moves up by five, so the next level needs five more coins."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A game with levels needs a **variable**, `level`, that remembers where the player is, and one place where it goes up. This game also keeps a **goal**: the score the next level needs.

The splash uses **join** (in **Text**) to stick the word *Level* and the number together. Copy it as it is for now.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You collect 5 coins, then one more. What happens?"
  options: ["At 5 coins: a Level 2 splash and a second enemy. At 6: nothing new", "At 5 coins: Level 2. At 6: Level 3", "Every coin is a new level", "At 5 coins the first enemy is replaced by a faster one"]
  actual: "At 5 coins the if is true: level becomes 2, goal becomes 10, a splash shows Level 2 and addEnemy makes a second enemy. At 6 coins, 6 is less than 10, so nothing new happens."
```

Read the Player–Food overlap. What is **goal** after the first level-up?

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I reached level 2 (or further) and compared with my prediction." }
```

Collect coins and dodge the enemies. Press **A** (space) to close each splash.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "A level goes up where the score changes, and a goal that moves up makes the question false again until the next level."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - check:
      type: trace
      text: "level starts at 1 and goal at 5. Fill in level and goal after each coin."
      table: |
        | score | level | goal |
        | 0 | 1 | 5 |
        | 5 | [2] | [10] |
        | 6 | [2] | [10] |
        | 10 | [3] | [15] |
      explain: "The level only goes up when the score reaches goal, and goal moves up by 5 each time, so the next level is 5 coins away."
  - check:
      type: question
      q: "Ben deleted change goal by 5. What happens after his 5th coin?"
      options: ["Every coin after that is a new level, because score ≥ 5 stays true", "Nothing: the game works the same", "The level never goes up", "The game ends"]
      answer: 0
      explain: "Without the moving goal, the question score ≥ 5 is true for coin 6, 7, 8 and every coin after, so each one levels up."
  - check:
      type: question
      q: "Zoe moved the level-up into on game update (below). The moment she reaches 5 points the splashes never stop, though she collects no more coins. Why?"
      options: ["on game update runs every frame, and the score stays 5 or more, so the if is true every frame", "The goal is too small", "The splash adds points", "score ≥ 5 should be score > 5"]
      answer: 0
      fault: logic
      misconception: update-fires-every-frame
      explain: "An if in on game update is asked every frame. Once the score is 5, the question stays true, so the level goes up again and again. Level up where the score changes: in the overlap."
```

### Level and goal

Follow level and goal coin by coin.

### Ben's game

### Zoe's levels

Zoe's level-up:

```makecode
game.onUpdate(function () {
    if (info.score() >= 5) {
        level += 1
        game.splash("Level " + level)
        addEnemy()
    }
})
```

## Modify

```step
stage: modify
insight: "The goal's step sets how long a level lasts, and anything inside the level-up if happens once per level."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - hint: ["Two numbers: the goal you start with and how much it changes by.", "Both 3."]
    check: { type: code, text: "A new level every 3 coins.", rules: { contains: ["letgoal=3", "goal+=3"] } }
  - hint: "change life by 1 (Info) goes inside the level-up if."
    check: { type: code, text: "A bonus life at every new level.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food,": ["info.changeLifeBy(1)"] } } }
```

### Shorter levels

Make a new level come every **3** coins.

### Bonus life

Give the player a **bonus life** at every new level. One block, in the right place.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A jump belongs inside an if that asks whether the player is on the floor."
check:
  type: number
  q: "Ana raises the floor: the floor if now puts the player's bottom at 80. Her jump still asks bottom ≥ 100. What number should the jump ask about now?"
  answer: 80
  explain: "Standing now means bottom is 80. At ≥ 100 the jump never works, because the player never gets that low."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Two new variables in on start: level 1 and goal 10."
  - "The score changes in the timer, so the level-up goes there, just after change score."
  - "Inside the if: change level by 1, change goal by 10, change speed by -20, and a splash."
check: { type: code, text: "Every 10 points the runner levels up: a splash, and faster rocks.", rules: { contains: ["game.splash("], inside: { "game.onUpdateInterval(": ["if(info.score()>=goal", "level+=1", "goal+=", "speed+="] } } }
unlocks: [level-up]
```

This is your runner from last lesson. Every rock that appears scores a point. Give it **levels**:

- every **10** points the level goes up, with a splash,
- each new level, the rocks are **faster** (change speed by -20: they fly left),
- the level-up goes **where the score changes**: in the timer.

## Change a fishing game

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#fishing" }
```

Catch fish with the net. Every 5 fish the level goes up and the fish swim faster. Make the water **darker** at every level too: one block, in the level-up.

```teacher
summary: "Students keep the level in a variable, change it where the score changes with a goal that moves up, see why a level-up in on game update fires every frame, and add levels to their runner."
time: 45
timing: "Predict and Run 8 min · Investigate 12 min · Modify 8 min · Mix it up 3 min · Make 10 min · Fishing 4 min"
goals:
  - I can use a variable to remember the level, and change it by 1.
  - I can put a level-up where the score changes, with a goal that moves up.
  - I can explain why a level-up in on game update happens every frame.
before: |
  A **level** is a variable that starts at 1 and changes by 1. The level-up is an if in the event where the score changes (here the coin overlap): *if score ≥ goal*, change level by 1, change **goal** by 5, splash and add an enemy. goal is a target that moves up, so the question is false again until 5 more coins.

  The trap is the lesson's misconception: put *if score ≥ 5* in **on game update** and it fires **every frame** while the score stays 5 or more, so the level races up. The splash uses join ("Level " + level), labelled copy-for-now.

  Next lesson keeps what changes per level in a list.
running:
  - "Predict: most students expect Level 2 at 5 coins. Ask what happens at 6."
  - "Investigate: Ben's game shows why goal moves; Zoe's shows why on game update is the wrong place."
  - "Modify: both numbers must change for every 3 coins. The bonus life shows the if runs once per level."
  - "Mix it up: the jump from last lesson."
  - "Make: the runner's score changes in the timer, so the level-up goes there."
stuck:
  - see: "The level races up as soon as the score reaches the goal."
    ask: "Where is the level-up if, and how often does that block run? Does goal move up?"
    fix: "Put it in the event where the score changes, and change goal by 10 inside it."
  - see: "The splash says Level 1 after the first level-up."
    ask: "Is change level by 1 before or after the splash?"
    fix: "Change the level first, then splash."
  - see: "The rocks get slower, not faster."
    ask: "Which way do the rocks fly?"
    fix: "Left, so faster is more negative: change speed by -20."
stretch: "Win the game at level 5: an if inside the level-up with game over (win)."
support: "Give students the level and goal variables in the Make starter, so they write only the if in the timer."
leads: "Next: a list per level, so each level can have its own background and speed. Skillmap: Jungle Jump Platformer (arcade.makecode.com/skillmaps) moves between level maps."
exit:
  q: "Why does a level-up go in the event where the score changes, not in on game update?"
  a: "on game update runs every frame, so while the score stays high enough the level goes up every frame. In the event it is asked only when the score changes."
explain: |
  A variable **level** remembers where the player is. It goes up by 1 **where the score changes**, with a **goal** that moves up, so the next level is further away.

  An if in on game update is asked every frame, so it would level up again and again while the score stays high.
solutions:
  step-4#t1: lesson.ts#sol-three
  step-4#t2: lesson.ts#sol-bonus
  step-6: lesson.ts#sol-make
struggle: "Where the level-up goes. When levels race up, ask how often that block runs."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 2
      do: |
        Decide with your partner what happens at 5 coins, and at 6.
      notes: "The 6 is the point: goal has moved."
    - at: investigate
      title: Ring the bell
      minutes: 3
      do: |
        One student counts up aloud; another rings (claps) when the count reaches the goal, then moves the goal up by 5. Then try without moving the goal.
      notes: "Without the moving goal, every number after 5 rings."
    - at: end
      title: Level race
      minutes: 4
      do: |
        Play the next pair's runner. Which level did you reach?
```

```code lesson.ts#predict
let enemy: Sprite = null
let level = 1
let goal = 5
function addEnemy () {
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(50, 40)
    enemy.setBounceOnWall(true)
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
info.setLife(3)
addEnemy()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        game.splash("Level " + level)
        addEnemy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```

```code lesson.ts#sol-three
let enemy: Sprite = null
let level = 1
let goal = 3
function addEnemy () {
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(50, 40)
    enemy.setBounceOnWall(true)
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
info.setLife(3)
addEnemy()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 3
        game.splash("Level " + level)
        addEnemy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```

```code lesson.ts#sol-bonus
let enemy: Sprite = null
let level = 1
let goal = 5
function addEnemy () {
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(50, 40)
    enemy.setBounceOnWall(true)
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
info.setLife(3)
addEnemy()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        game.splash("Level " + level)
        info.changeLifeBy(1)
        addEnemy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```

```code lesson.ts#review
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.ay = 300
game.onUpdate(function () {
    if (player.bottom > 80) {
        player.bottom = 80
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.bottom >= 100) {
        player.vy = -150
    }
})
```

```code lesson.ts#make
let rock: Sprite = null
let speed = -60
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
    rock.vx = speed
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-make
let rock: Sprite = null
let speed = -60
let level = 1
let goal = 10
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
    rock.vx = speed
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 10
        speed += -20
        game.splash("Level " + level)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#fishing
let fish: Sprite = null
let fishSpeed = 30
let level = 1
let goal = 5
scene.setBackgroundColor(9)
let net = sprites.create(img`
    1 . 1 . 1
    . 1 . 1 .
    1 . 1 . 1
    . 1 . 1 .
    `, SpriteKind.Player)
controller.moveSprite(net)
net.setStayInScreen(true)
game.onUpdateInterval(800, function () {
    fish = sprites.create(img`
        . . 4 4 4 . 4
        . 4 4 4 4 4 4
        4 f 4 4 4 . 4
        . 4 4 4 . . .
        `, SpriteKind.Food)
    fish.setPosition(0, randint(10, 110))
    fish.vx = fishSpeed
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        fishSpeed += 20
        game.splash("Level " + level)
    }
})
```
