---
order: 10
unit: challenge
title: Power-ups
summary: "Challenge: grow the shield game into a prize box: a blaster with limited ammo, a smart bomb, then a power-up of your own."
language: makecode
reviews: [remember-state, count-down, every-of-kind]
assumes: [variable, random, if, else, function, variable-update, list, list-index, bool-value, for-of]
explainPicture: lesson.ts#start
hook: "A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that changes the rules for a while."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#start", lesson: "code/arcade-advanced/arcade-powerups", target: "arcade" }
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
Your shield game from the last two lessons: catch a star and you get a **shield** for 5 seconds. Now a star becomes a **prize box**. You will add three prizes, one milestone each, with less help each time. Everything you need is from earlier lessons: true or false, counting down, and every sprite of a kind.

## Predict

```step
stage: predict
code: lesson.ts#start
check:
  type: predict
  q: "The shield has 2 seconds left and you catch another star. How long does the shield last now?"
  options: ["5 seconds", "2 seconds", "7 seconds", "It switches off"]
  actual: "5 seconds. The star sets shieldTime to 5, which throws away the 2 that were left."
```

Read the star overlap and the 1-second timer.

## Run

```step
stage: run
code: lesson.ts#start
try: { playground: arcade, starter: "lesson.ts#start" }
check: { type: reflect, text: "I caught two stars close together and compared with my prediction." }
```

Catch a star, then another before the shield ends.

## Investigate

```step
stage: investigate
code: lesson.ts#start
insight: "Arcade's engine moves sprites, notices touches and ends the game; the rules (what a touch means, when a power-up is on) are the blocks you write."
try: { playground: arcade, starter: "lesson.ts#start" }
tasks:
  - check:
      type: match
      q: "Who decides each thing: Arcade's engine, or a game rule in your blocks? Match them."
      pairs:
        - ["Each rock slides left a little every frame", "engine: velocity moves it every frame"]
        - ["The game ends when the lives reach 0", "engine: info ends the game at zero lives"]
        - ["A star that leaves the screen is removed", "engine: auto destroy removes it"]
        - ["Catching a star turns the shield on", "game rule: your overlap event decides"]
        - ["A rock costs no life while the shield is on", "game rule: your if decides"]
      explain: "The engine does the same jobs in every game. The rules are what make this game yours, and they are where the bugs (and the fun) live."
  - check:
      type: question
      q: "Sam wants the shield to switch off when shieldTime reaches 0. He puts the blocks below in on start. He catches a star, and shieldTime counts down to 0. What happens to the shield?"
      options: ["It switches off at 0", "It never switches off: the if was asked once, at the start, before the star was caught", "It switches off straight away", "The game ends"]
      answer: 1
      fault: logic
      misconception: check-in-start
      explain: "Blocks in on start run once, before the game begins. The if is never asked again. A check that must keep happening goes in a timer or in on game update."
```

### Game rule or engine?

Sort the jobs.

### Sam's shield

```makecode
let shield = false
let shieldTime = 0
if (shieldTime == 0) {
    shield = false
    scene.setBackgroundColor(15)
}
```

## Milestone 1: a blaster with limited ammo

```step
stage: modify
insight: "A number variable limits an action: the button event asks the variable first, and a prize refills it."
try: { playground: arcade, starter: "lesson.ts#m2" }
hint:
  - "In the else of the star overlap: set ammo to 5. Then add on A button pressed with if ammo > 0."
  - "Inside the if: projectile from ship with vx 100, vy 0, then change ammo by -1. A Projectile–Enemy overlap destroys both and adds points."
check: { type: code, text: "A star sometimes refills the ammo; A fires only while there is ammo, and each shot uses one.", rules: { count: { "ammo=": 2 }, inside: { "controller.A.onEvent(ControllerButtonEvent.Pressed": ["if(ammo>0", "createProjectileFromSprite(", "ammo+=-1"] } } }
```

Now a star gives a random prize: `prize` is 0 (the shield) or 1 (the blaster, still empty).

- Prize 1 sets `ammo` to **5**.
- **A** (space on the keyboard) fires a shot only **if ammo > 0**, and each shot takes 1 from `ammo`.
- A shot that hits a rock destroys both.

## Milestone 2: a smart bomb

```step
stage: modify
insight: "for element of a list of every sprite of a kind does a job once for each, so one prize can clear the screen."
try: { playground: arcade, starter: "lesson.ts#sol-m2" }
hint:
  - "Change prize to pick random 0 to 2, and turn the else into else if prize = 1 (the blaster). The new else is the bomb."
  - "In the bomb: for element value of array of sprites of kind Enemy, destroy value and change score by 1."
check: { type: code, text: "A third prize, a smart bomb, destroys every rock on the screen and scores for each.", rules: { contains: ["randint(0,2)", "ofsprites.allOfKind(SpriteKind.Enemy)"], count: { "prize==": 2 } } }
```

Add a third prize: a **smart bomb** that destroys every rock on the screen, a point for each.

## Milestone 3: your own power-up

```step
stage: make
insight: "Designing a power-up from goals alone shows whether a student can turn a game idea into a variable, an event that changes it, and a rule that uses it."
try: { playground: arcade, starter: "lesson.ts#sol-m3" }
hint:
  - "Pick random 0 to 3, and one more else if. The last else is yours."
  - "Ideas: an extra life, a slow-down (a variable the rock timer uses for vx), or a magnet that makes stars follow the ship."
check: { type: code, text: "A star gives one of four prizes, and the fourth is a power-up you designed.", rules: { count: { "prize==": 3 } } }
```

Design a **fourth power-up** and add it to the prizes:

- Decide what it does and how long it lasts.
- A star now picks one of **four** prizes.
- Play it: is it too strong, too weak, or just right?

```teacher
summary: "Challenge: students grow the shield game into a prize box with a blaster that runs out, a smart bomb that uses every sprite of a kind, and a power-up of their own design."
time: 60
timing: "Predict, Run, Investigate 12 min · Milestone 1 15 min · Milestone 2 13 min · Milestone 3 20 min"
goals:
  - I can use true or false and a countdown to make a power-up that runs out.
  - I can combine earlier moves into a bigger game with less help.
  - I can say which jobs Arcade's engine does and which rules my blocks decide.
before: |
  Nothing new: the challenge combines true or false (the shield), counting down (shieldTime, ammo) and every sprite of a kind (the smart bomb). A power-up is always three parts: a **variable** that remembers it, an **event** that changes it, and a **rule** that uses it. The Investigate match starts a thread for the next lesson: **the engine** (velocity, overlaps noticed, game over at zero lives, auto destroy) does the same jobs in every game, while **game rules** are the blocks you write.
running:
  - "Predict: set throws away what is left (from Run out). Ask whether that is fair."
  - "Investigate, game rule or engine: name the split. Ask students for one more example of each."
  - "Sam's shield revisits If, every frame: on start runs once, so an if there is asked once."
  - "Milestone 1: the prize is random, so students may need a few stars to test the blaster. They can set prize to 1 while testing."
  - "Milestone 2: the smart bomb is Every one of a kind again."
  - "Milestone 3: goals only. Ask each student to say their power-up as three parts: variable, event, rule."
stuck:
  - see: "A fires forever, or never."
    ask: "What is ammo at the start, and where does it change?"
    fix: "ammo starts at 0, a prize-1 star sets it to 5, and each shot changes it by -1, all inside if ammo > 0."
  - see: "Shots pass through rocks."
    ask: "Which kinds does your overlap event name?"
    fix: "A shot is a Projectile, so the event must be Projectile overlaps Enemy."
  - see: "The bomb destroys only one rock."
    ask: "Is the destroy inside the for element block?"
    fix: "Destroy value, inside the loop."
  - see: "A prize never comes up."
    ask: "What range does pick random use?"
    fix: "0 to the number of prizes minus 1."
stretch: "Show the ammo on screen with the ship's say block after each shot."
support: "A student who finishes Milestone 1 has the key idea. For Milestone 3, offer the extra life (change life by 1) as a first power-up, then ask for one more of their own."
leads: "Next: Will it work in Arcade?, judging which games Arcade does well by the building blocks they need. Class ideas: a power-up design jam where pairs swap power-ups and rate them for fairness; draw a power-up card (name, variable, event, rule, how long)."
exit:
  q: "Name the three parts of a power-up in your game, using the shield as the example."
  a: "A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life)."
explain: |
  A power-up has three parts:

  1. a **variable** that remembers it: `shield` is **true** while it is on,
  2. an **event** that changes it: catching a star sets it to true,
  3. a **rule** that uses it: *if shield*, a rock costs no life.

  A timer counts `shieldTime` down every second; at 0 the shield is set back to **false**.
solutions:
  step-4: lesson.ts#sol-m2
  step-5: lesson.ts#sol-m3
  step-6: lesson.ts#sol-m4
struggle: "Holding several power-ups in one program. Ask students to point at the variable, the event and the rule for each prize."
class:
  activities:
    - at: start
      title: Power-up cards
      minutes: 3
      do: |
        Each pair draws a card for their fourth power-up: name, variable, event, rule, how long.
    - at: end
      title: Fair test
      minutes: 5
      do: |
        Play the next pair's game. Rate their power-up: too strong, too weak, or just right?
```

```code lesson.ts#start
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
    rock.setFlag(SpriteFlag.AutoDestroy, true)
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
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
```

```code lesson.ts#m2
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
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
    prize = randint(0, 1)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else {

    }
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
    rock.setFlag(SpriteFlag.AutoDestroy, true)
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
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
```

```code lesson.ts#sol-m2
let shot: Sprite = null
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
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
    prize = randint(0, 1)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else {
        ammo = 5
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(2)
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
    rock.setFlag(SpriteFlag.AutoDestroy, true)
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
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
```

```code lesson.ts#sol-m3
let shot: Sprite = null
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
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
    prize = randint(0, 2)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else if (prize == 1) {
        ammo = 5
    } else {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            value.destroy()
            info.changeScoreBy(1)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(2)
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
    rock.setFlag(SpriteFlag.AutoDestroy, true)
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
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
```

```code lesson.ts#sol-m4
let shot: Sprite = null
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
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
    prize = randint(0, 3)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else if (prize == 1) {
        ammo = 5
    } else if (prize == 2) {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            value.destroy()
            info.changeScoreBy(1)
        }
    } else {
        info.changeLifeBy(1)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(2)
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
    rock.setFlag(SpriteFlag.AutoDestroy, true)
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
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
```
