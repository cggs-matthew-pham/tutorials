---
order: 7
unit: levels
moveId: list-per-level
reviews: [level-up, job-with-input]
introduces: [list, list-index]
assumes: [variable, random, if, function, variable-update]
recipes: [text-join]
title: A list per level
summary: Keep what changes from level to level in a list, and look it up with the level as the place, counted from 0.
language: makecode
explainPicture: lesson.ts#predict
hook: "Faster ghosts, a new colour, more aliens: each level is a row in a table. A list is one column of that table."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade-advanced/arcade-level-list", target: "arcade" }
  caption: "A list holds one speed for each level"
  say: "A list holds one speed for each level."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "speeds[level] is the speed for this level. Places start at 0."
        say: "speeds at level is this level's speed. Places start at zero."
    - caption:
        text: "startLevel clears the old enemy and sets up the new one."
        say: "start level clears the old enemy and sets up the new one."
    - click: "Run"
    - wait: 600
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the level was one number. Now each level has its own **speed**. A **list** (in **Arrays**) holds them in order: `speeds` is 40, 70, 100. **get value at** looks one up by its **place**: `speeds[level]`.

Places in a list are counted from **0**. So the level now starts at **0**, and the splash shows `level + 1`, because players count from 1. **destroy all sprites of kind** (Sprites) clears the old level's enemy.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The game starts and startLevel runs with level 0. What speed does the enemy get?"
  options: ["40", "70", "0", "100"]
  fault: logic
  misconception: arcade-list-first-is-one
  actual: "40. Level 0 is the first place in the list, because places are counted from 0."
```

Read **startLevel**, then the Player–Food overlap.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I reached level 2 (or further) and compared with my prediction." }
```

Collect coins and dodge the purple enemy. Press **A** (space) to close each splash. Can you win?

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "A list holds what changes per level, looked up with the level as the place, counted from 0; startLevel clears the old level and sets up the new one."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - check:
      type: trace
      text: "speeds is 40, 70, 100. Fill in what startLevel does at each level."
      table: |
        | level | splash shows Level … | enemy speed |
        | 0 | 1 | [40] |
        | 1 | [2] | [70] |
        | 2 | [3] | [100] |
      explain: "The level is the place in the list, counted from 0, so level 0 uses 40. The splash adds 1, because players count levels from 1."
  - check:
      type: question
      q: "Kai starts his level at 1, not 0. What goes wrong?"
      options: ["The first level is already fast (70), and there is no place 3 for the last level", "Nothing: lists start at 1", "The splash says Level 0", "The enemy never appears"]
      answer: 0
      fault: logic
      misconception: arcade-list-first-is-one
      explain: "speeds[1] is the second item, 70, so the slow level is skipped. After two level-ups he asks for speeds[3], and a list of 3 items only has places 0, 1 and 2."
  - check:
      type: match
      q: "Match each block in this game with its job."
      pairs:
        - ["destroy all sprites of kind Enemy", "clears away the old level's enemy"]
        - ["speeds[level]", "the speed for this level, looked up in the list"]
        - ["change level by 1", "moves the player on to the next level"]
        - ["if level = 3 then game over (win)", "ends the game after the last level"]
```

### What startLevel does

Work out each level from the list.

### Kai's levels

### Which block does what?

Match each block with its job.

## Modify

```step
stage: modify
insight: "Anything that changes per level can be another list, read with the same place; one more level is one more item in each list."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - hint: ["Make a new list, colours, with three numbers, in on start. Arrays has the list block.", "In startLevel: set background color to (get value at level from colours)."]
    check: { type: code, text: "Each level has its own background colour, set in startLevel from a list.", rules: { inside: { "function startLevel (": ["scene.setBackgroundColor("] }, count: { "[level]": 3 } } }
  - hint: ["Add a fourth speed to the list.", "The win now comes at level 4."]
    check: { type: code, text: "A fourth level: a fourth speed, and the win moved.", rules: { contains: ["level==4"] } }
```

### A colour per level

Give each level its own **background colour**, from a new list. Set it in **startLevel**.

### A fourth level

Add a **fourth level** with the fastest enemy yet. What else must change?

## Mix it up

```step
stage: investigate
insight: "A goal that moves up makes the next level further away."
check:
  type: number
  q: "goal starts at 4, and each level-up changes goal by 4. At what score does the third level-up happen?"
  answer: 12
  explain: "The level goes up at 4, then goal is 8, then 12: the third level-up is at 12."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "In on start: a list of three rock speeds (negative, they fly left), a list of three colours, and a goal of 10. Call startLevel."
  - "startLevel: destroy all Enemy sprites, set the background from the colours list, splash the level."
  - "In the timer, set rock vx to the speed for this level. After change score: if score ≥ goal, change level by 1, change goal by 10, then if level = 3 game over (win), else startLevel."
check: { type: code, text: "Three levels, each with its own background colour and rock speed, started by startLevel, and a win after level 3.", rules: { contains: ["game.gameOver(true)", "level+=1"], inside: { "function startLevel (": ["sprites.destroyAllSpritesOfKind(", "scene.setBackgroundColor(", "game.splash("], "game.onUpdateInterval(": ["[level]"] }, count: { "[level]": 2 } } }
unlocks: [get-value-at]
```

This dodger scores a point for every rock. Give it **three levels**:

- each level has its own **background colour** and **rock speed** (faster each level), from lists,
- **startLevel** clears the old rocks, sets the colour and splashes the level,
- every 10 points, the level goes up (where the score changes),
- after level 3, the player **wins** (game over, win).

## Change a fishing game

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#fishing" }
```

Catch fish with the net. Every 5 fish the water gets deeper and the fish swim faster. Add a **fourth level** (both lists need a fourth item, and the win must move), then make the deepest level's fish the fastest yet.

```teacher
summary: "Students keep per-level settings in lists, look them up with the level as the place (counted from 0), start each level with a startLevel function, and build a three-level dodger with a win."
time: 50
timing: "Predict and Run 8 min · Investigate 12 min · Modify 10 min · Mix it up 3 min · Make 13 min · Fishing 4 min"
goals:
  - I can keep what changes per level in a list.
  - I can look up the value for this level, knowing places start at 0.
  - I can write a startLevel function that clears the old level and sets up the new one.
before: |
  A **list** such as `speeds` (40, 70, 100) holds what changes per level; `speeds[level]` (**get value at**) looks up the value at that **place**, counted from 0, so level 0 uses 40. That is why the level now starts at **0** (last lesson it started at 1), and the splash shows `level + 1` with join, labelled copy-for-now.

  A **function** `startLevel` sets up a level: **destroy all sprites of kind Enemy** clears the old one, a **splash**, and a new enemy at `speeds[level]`. The win checks *level = 3* before startLevel, since a list of 3 has no place 3.

  The Make is the biggest program so far (about 25 blocks): try it yourself first.
running:
  - "Predict: students who answer 70 count from 1. Kai's question returns to it. Let the 40 and 70 camps argue; the Run settles it."
  - "Investigate: the trace practises places from 0; the match names each block's job."
  - "Modify: a second list works exactly like speeds. A fourth level needs a fourth item and the win moved."
  - "Mix it up: the moving goal from last lesson."
  - "Make: plan on paper first: which lists, what goes in startLevel, where the level-up goes. Rock speeds are negative because rocks fly left."
stuck:
  - see: "The splash says Level 0, or the speed is wrong by one level."
    ask: "Where does the list start counting?"
    fix: "Places start at 0. The level starts at 0, and the splash shows level + 1."
  - see: "The enemy stops, or the game breaks, after the last level."
    ask: "What is speeds[3] when the list has 3 items?"
    fix: "There is no place 3. Check level = 3 and end the game (win) before calling startLevel."
  - see: "Old enemies stay on the screen at the next level."
    ask: "What does startLevel do first?"
    fix: "Add destroy all sprites of kind Enemy at the top of startLevel."
stretch: "Add a third list, the number of enemies per level, and call your function from B3 that many times."
support: "Give students the Make game with the lists and startLevel already made, so they add only the level-up and the win."
leads: "Next unit: power-ups, with true or false and things that run out. Skillmap: Jungle Jump Platformer (arcade.makecode.com/skillmaps) builds a level per map. Class idea: design a level table on paper (speed, colour, enemies, goal) before coding it."
exit:
  q: "speeds is 40, 70, 100 and level is 1. What speed does the enemy get, and why?"
  a: "70: level 1 is the second place in the list, because places are counted from 0."
explain: |
  A **list** holds what changes per level: **speeds[level]** is the speed for this level.

  Places are counted from **0**, so the level starts at 0 and the splash shows level + 1.

  **startLevel** clears the old enemies, splashes the level and sets up the new one.
solutions:
  step-4#t1: lesson.ts#sol-colours
  step-4#t2: lesson.ts#sol-four
  step-6: lesson.ts#sol-make
struggle: "Places start at 0. When a level is off by one, ask which place the list starts at."
class:
  activities:
    - at: investigate
      title: Lockers
      minutes: 3
      do: |
        Three students hold cards 40, 70 and 100, labelled with places 0, 1, 2. Call out a level; the matching card goes up.
      notes: "Call level 3: no one moves. That is the crash after the last level."
    - at: end
      title: Level table
      minutes: 4
      do: |
        On paper, design a fourth level: speed, colour and goal.
```

```code lesson.ts#predict
let enemy: Sprite = null
let speeds = [40, 70, 100]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    game.splash("Level " + (level + 1))
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(speeds[level], speeds[level])
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
startLevel()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```

```code lesson.ts#sol-colours
let enemy: Sprite = null
let speeds = [40, 70, 100]
let colours = [9, 7, 2]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    scene.setBackgroundColor(colours[level])
    game.splash("Level " + (level + 1))
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(speeds[level], speeds[level])
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
startLevel()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```

```code lesson.ts#sol-four
let enemy: Sprite = null
let speeds = [40, 70, 100, 130]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    game.splash("Level " + (level + 1))
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(speeds[level], speeds[level])
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
startLevel()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 4) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```

```code lesson.ts#make
let rock: Sprite = null
let level = 0
function startLevel () {

}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-make
let rock: Sprite = null
let speeds = [-40, -70, -100]
let colours = [9, 4, 2]
let level = 0
let goal = 10
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    scene.setBackgroundColor(colours[level])
    game.splash("Level " + (level + 1))
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
info.setLife(3)
startLevel()
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = speeds[level]
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 10
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#fishing
let fish: Sprite = null
let waters = [9, 8, 15]
let fishSpeeds = [30, 60, 90]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    scene.setBackgroundColor(waters[level])
    game.splash("Level " + (level + 1))
}
let net = sprites.create(img`
    1 . 1 . 1
    . 1 . 1 .
    1 . 1 . 1
    . 1 . 1 .
    `, SpriteKind.Player)
controller.moveSprite(net)
net.setStayInScreen(true)
startLevel()
game.onUpdateInterval(800, function () {
    fish = sprites.create(img`
        . . 4 4 4 . 4
        . 4 4 4 4 4 4
        4 f 4 4 4 . 4
        . 4 4 4 . . .
        `, SpriteKind.Food)
    fish.setPosition(0, randint(10, 110))
    fish.vx = fishSpeeds[level]
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
```
