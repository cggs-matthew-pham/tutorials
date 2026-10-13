---
order: 5
unit: collide-score
moveId: lives-end-game
reviews: [touch-of-kinds, engine-moves-it]
assumes: [variable]
title: Score and lives
summary: Give the player lives, make a hit cost one, and let the engine end the game.
language: makecode
explainPicture: lesson.ts#hits
hook: "Three hearts in the corner and a game that can end: that is what turns moving sprites into a game you can win or lose."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#hits", lesson: "code/arcade/arcade-score-lives", target: "arcade" }
  caption: "Info keeps score and lives for you"
  say: "The info blocks keep score and lives for you."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "set life shows hearts. At 0 the game ends by itself."
        say: "set life shows hearts, and at zero lives the game ends by itself."
    - click: "Run"
    - wait: 600
    - caption:
        text: "An overlap runs every frame while sprites touch."
        say: "An overlap runs every frame while two sprites touch."
    - caption:
        text: "So destroy the enemy when it hits, and it costs one life."
        say: "So destroy the enemy when it hits, and it costs just one life."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the score went up and down, but the game never ended. Arcade's **Info** blocks keep a score and **lives** (hearts) at the top of the screen, and they end the game by themselves.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The player has 3 lives and cannot move. Three rocks fly at it. What happens?"
  options: ["The player loses all 3 lives, then the game ends by itself", "The lives go to 0, then -1, -2, and the game keeps going", "Nothing ends the game, because there is no game over block", "The first rock takes all 3 lives"]
  fault: logic
  misconception: game-over-needs-block
  actual: "Each rock that hits takes a life and is destroyed. After three hits the lives reach 0, and Arcade shows GAME OVER by itself: you never need a game over block for running out of lives."
```

There is no **game over** block in this program. Lock in what you think happens.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched the rocks and the hearts, and compared what happened with my prediction." }
```

Watch the hearts at the top of the screen. Use the restart button under the simulator to play again.

## Investigate

```step
stage: investigate
code: lesson.ts#hits
insight: "Info keeps lives and ends the game at 0. An overlap runs every frame while two sprites touch, so destroying the enemy makes one touch cost one life."
try: { playground: arcade, starter: "lesson.ts#hits" }
tasks:
  - check:
      type: trace
      text: "Play this game in your head. Fill in the lives after each thing happens."
      table: |
        | what happens | lives after |
        | (start) | 3 |
        | a rock hits the player | [2] |
        | a rock flies past | [2] |
        | the player collects the heart | [3] |
        | a rock hits the player | [2] |
      explain: "Only a touch runs an overlap event, so a rock that flies past changes nothing. The heart's Player–Food event adds one."
  - check:
      type: question
      q: "Sam's player touches one rock and the game is over straight away, though he started with 3 lives. Why?"
      options: ["setLife(3) only gives one life", "The rock is not destroyed, so the overlap event runs again every frame while they touch", "changeLifeBy(-1) takes away all the lives", "Rocks always end the game"]
      answer: 1
      fault: logic
      misconception: overlap-repeats
      explain: "An overlap event runs every frame (about 30 times a second) while the two sprites still touch. The rock is still touching after the first life is gone, so the next frame takes another. Destroy the rock (or move it away) in the event."
  - check:
      type: question
      q: "Kai wants his game to end when the lives run out. What does he need to add?"
      options: ["Nothing: the engine ends the game at 0 lives", "A game over block in on start", "A game over block in the overlap event", "A countdown"]
      answer: 0
      fault: logic
      misconception: game-over-needs-block
      explain: "Arcade ends the game by itself when the lives reach 0."
```

Dodge the rocks with the arrow keys and collect the heart. Lose on purpose once, too.

### Count the lives

### Sam's dodger

Sam's overlap event:

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
```

### Kai's ending

## Modify

```step
stage: modify
insight: "set life sets how many hearts the player starts with, and each kind of touch needs its own overlap event."
try: { playground: arcade, starter: "lesson.ts#hits" }
tasks:
  - hint: "Change the 3 in set life."
    check: { type: code, text: "Start the player with 5 lives.", rules: { contains: ["info.setLife(5)"] } }
  - hint: "Inside the Player–Food event, add change score by 1 (Info) next to change life by 1."
    check: { type: code, text: "Collecting the heart also scores a point.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeScoreBy(1)"] } } }
```

### More hearts

Start the player with **5** lives.

### A point too

Make the heart give a **point** as well as a life.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "The engine moves a sprite with a velocity; its kind decides which overlap runs when it arrives."
check:
  type: question
  q: "A coin of kind Food moves left towards the player at vx -30. When it reaches the player, which event runs?"
  options: ["The Player–Food overlap", "The Player–Enemy overlap", "Both", "Neither: moving sprites cannot overlap"]
  answer: 0
  explain: "The engine carries the coin to the player. It is Food, so the Player–Food event runs."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "In on start: set life to 3 (Info)."
  - "Add an on overlap for Player and Enemy. Inside: change life by -1, then destroy otherSprite."
check: { type: code, text: "A dodge game: 3 lives, and a rock that hits takes one life and is destroyed.", rules: { contains: ["info.setLife(3)"], inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["info.changeLifeBy(-1)", "destroy("] } } }
unlocks: [hit-costs-a-life]
```

The rocks fly already. Make it a game:

- the player starts with **3 lives**
- each rock that hits takes **one** life, and is destroyed

## Change a dodgeball game

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#dodgeball" }
```

Balls bounce around the court; each hit costs a life. Add a fourth ball, give the player 5 lives, and make the balls a little faster.

```teacher
summary: "Students give the player lives, make a hit cost one life, and see that the engine ends the game at 0 lives and that an overlap runs every frame while sprites touch."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 7 min · Mix it up 3 min · Make 9 min · Dodgeball 4 min"
goals:
  - I can give the player lives and let the game end by itself.
  - I can make a hit cost exactly one life.
  - I can explain why an enemy must be destroyed (or moved) when it hits the player.
before: |
  **Info** blocks keep a **score** and **lives** (hearts) at the top of the screen. When the lives reach **0**, Arcade ends the game by itself. One important fact: an **overlap event runs every frame** (about 30 times a second) **while the two sprites still touch**. If the enemy is not destroyed, one touch takes life after life, and the game ends at once. Timers (a new enemy every second) are next lesson; here the rocks are made at the start and flown in with a velocity.
running:
  - "Predict: many students expect lives to go below 0, or that a game over block is needed. The engine does it."
  - "Run: count the hearts aloud as they go."
  - "Investigate: Sam's dodger is the lesson's key bug: an overlap runs every frame while sprites touch."
  - "Mix it up: kinds and velocity, from earlier lessons."
  - "Make: students who forget destroy lose all three lives at once: let them find it."
stuck:
  - see: "One touch ends the game."
    ask: "What happens to the enemy after it touches the player?"
    fix: "Nothing, so the overlap runs again next frame. Add destroy otherSprite inside the overlap event."
  - see: "No hearts at the top of the screen."
    ask: "Is there a set life block in on start?"
    fix: "Add set life to 3 (Info). Lives appear only once they are set."
  - see: "Touching a rock does nothing."
    ask: "What kind are the rocks, and what kinds does the overlap name?"
    fix: "The rocks are Enemy; the event must be Player with Enemy."
stretch: "Add a coin worth points, so there is something to chase as well as dodge."
support: "Give students the overlap event already placed, and ask them to fill in the two blocks inside."
leads: "Next lesson: a timer that sends a new rock every second, for as long as the game lasts."
exit:
  q: "In a dodge game one touch takes all three lives. What one block is missing, and why does it matter?"
  a: "destroy otherSprite in the Player–Enemy overlap. The overlap runs every frame while the sprites touch, so without it the same enemy takes a life each frame."
explain: |
  The **Info** blocks keep **score** and **lives**:

  1. **set life** shows hearts, and when the lives reach **0** the engine **ends the game** by itself.
  2. An **overlap** runs **every frame** while two sprites touch.
  3. So destroy the enemy (or move it) when it hits, or one touch takes every life.
solutions:
  step-4#t1: lesson.ts#sol-five
  step-4#t2: lesson.ts#sol-point
  step-6: lesson.ts#sol-make
struggle: "An overlap runs every frame while sprites touch, so one hit takes every life. Ask what happens to the enemy after it touches the player."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what happens after three hits. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask the 'no game over block' group to run it and watch."
    - at: investigate
      title: Tag, every frame
      minutes: 3
      do: |
        A student who is tagged loses a 'life' card for every second the tagger keeps touching them.
      notes: "Ten seconds of touching takes ten cards. The tagger must let go: that is destroy."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Swap dodge games with the next pair. Does one hit cost exactly one heart?
```

```code lesson.ts#predict
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
let rock = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock.setPosition(160, 60)
rock.vx = -50
let rock2 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock2.setPosition(240, 60)
rock2.vx = -50
let rock3 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock3.setPosition(320, 60)
rock3.vx = -50
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#hits
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let heart = sprites.create(img`
    2 2 . 2 2
    2 2 2 2 2
    . 2 2 2 .
    . . 2 . .
    `, SpriteKind.Food)
heart.setPosition(80, 100)
let rock = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock.setPosition(160, 30)
rock.vx = -40
let rock2 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock2.setPosition(240, 60)
rock2.vx = -40
let rock3 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock3.setPosition(320, 90)
rock3.vx = -40
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
```

```code lesson.ts#sol-five
info.setLife(5)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let heart = sprites.create(img`
    2 2 . 2 2
    2 2 2 2 2
    . 2 2 2 .
    . . 2 . .
    `, SpriteKind.Food)
heart.setPosition(80, 100)
let rock = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock.setPosition(160, 30)
rock.vx = -40
let rock2 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock2.setPosition(240, 60)
rock2.vx = -40
let rock3 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock3.setPosition(320, 90)
rock3.vx = -40
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
```

```code lesson.ts#sol-point
info.setLife(5)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let heart = sprites.create(img`
    2 2 . 2 2
    2 2 2 2 2
    . 2 2 2 .
    . . 2 . .
    `, SpriteKind.Food)
heart.setPosition(80, 100)
let rock = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock.setPosition(160, 30)
rock.vx = -40
let rock2 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock2.setPosition(240, 60)
rock2.vx = -40
let rock3 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock3.setPosition(320, 90)
rock3.vx = -40
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    info.changeScoreBy(1)
    otherSprite.destroy()
})
```

```code lesson.ts#review
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(150, 60)
coin.vx = -30
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#make
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let rock = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock.setPosition(160, 30)
rock.vx = -40
let rock2 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock2.setPosition(240, 60)
rock2.vx = -40
let rock3 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock3.setPosition(320, 90)
rock3.vx = -40
```

```code lesson.ts#sol-make
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let rock = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock.setPosition(160, 30)
rock.vx = -40
let rock2 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock2.setPosition(240, 60)
rock2.vx = -40
let rock3 = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Enemy)
rock3.setPosition(320, 90)
rock3.vx = -40
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#dodgeball
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(80, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Enemy)
ball.setPosition(20, 20)
ball.setVelocity(40, 30)
ball.setBounceOnWall(true)
let ball2 = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Enemy)
ball2.setPosition(140, 20)
ball2.setVelocity(-30, 40)
ball2.setBounceOnWall(true)
let ball3 = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Enemy)
ball3.setPosition(80, 110)
ball3.setVelocity(35, -35)
ball3.setBounceOnWall(true)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
```
