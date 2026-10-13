---
order: 4
unit: collide-score
moveId: touch-of-kinds
reviews: [move-with-buttons]
assumes: [variable]
title: Overlaps and kinds
summary: Make something happen when two sprites touch, and use kinds to decide which event runs.
language: makecode
explainPicture: lesson.ts#kinds
hook: "Pac-Man eats a dot, Mario grabs a coin, a ghost catches you: every game is full of things touching, and each touch means something different."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#kinds", lesson: "code/arcade/arcade-overlaps", target: "arcade" }
  caption: "When two sprites touch, they overlap"
  say: "When two sprites touch, they overlap."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "on overlap names two kinds, such as Player and Food."
        say: "An on overlap event names two kinds, like Player and Food."
    - caption:
        text: "sprite is the first one, otherSprite the second."
        say: "Inside it, sprite is the first one, and other sprite the second."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The kind you choose decides which overlap runs."
        say: "The kind you choose for a sprite decides which overlap events it runs."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson sprites moved, but flew straight through each other. Now they notice. When two sprites touch, they **overlap**, and an **on overlap** event (in **Sprites › Overlaps**) can run.

Every sprite has a **kind**: Player, Food, Enemy or Projectile. Until now every sprite said **of kind Player**. This lesson the kind matters: it is how the game tells a coin from a monster.

Click the simulator, then steer with the arrow keys.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You steer the player onto the coin. What happens?"
  options: ["The coin vanishes and the score goes up by 1", "The player stops at the coin, like a wall", "Nothing: they pass through each other", "The player vanishes"]
  fault: logic
  misconception: kind-mismatch
  actual: "The coin vanishes and a score of 1 appears at the top of the screen. The player is of kind Player and the coin of kind Food, so the Player–Food overlap event runs."
```

The coin is made **of kind Food**. Look at the two kinds named in the **on overlap** block.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I steered onto the coin and compared what happened with my prediction." }
```

Steer onto the coin. Watch the top of the screen.

## Investigate

```step
stage: investigate
code: lesson.ts#kinds
insight: "An overlap event runs when a sprite of the first kind touches a sprite of the second kind. The kinds decide which event runs: sprite is the first one, otherSprite the second."
try: { playground: arcade, starter: "lesson.ts#kinds" }
tasks:
  - check:
      type: match
      q: "Match what touches with what happens in this game."
      pairs:
        - ["the player touches the coin (Food)", "the score goes up 1 and the coin vanishes"]
        - ["the player touches the spike (Enemy)", "the score goes down 1 and the spike is destroyed"]
        - ["the coin and the spike touch", "nothing: no event names Food and Enemy"]
  - check:
      type: question
      q: "In the Player–Food event, which sprite is otherSprite?"
      options: ["The player", "The coin it touched", "Every Food sprite in the game", "The spike"]
      answer: 1
      explain: "The event hands over both sprites: sprite is the one of the first kind (Player), otherSprite the one of the second kind (Food). So destroy otherSprite removes the coin that was touched."
  - check:
      type: question
      q: "Ava added a star to her game and steers onto it. Nothing happens: no score, the star stays. Why?"
      options: ["Stars cannot be destroyed", "The star was made of kind Player, so no Player–Food event runs", "The overlap event needs to be inside on start", "The score only counts coins"]
      answer: 1
      fault: logic
      misconception: kind-mismatch
      explain: "The create block starts with of kind Player, and Ava did not change it. Her overlap event is for Player touching Food, so a Player touching a Player runs nothing. Choose Food in the star's kind dropdown."
```

Collect the coin, then touch the spike.

### Who touches whom?

### Which sprite?

### Ava's star

Ava's overlap event is the same as this game's. She made her star like this:

```makecode
let star = sprites.create(img`
    . 5 .
    5 5 5
    . 5 .
    `, SpriteKind.Player)
```

## Modify

```step
stage: modify
insight: "The blocks inside an overlap event decide what a touch means, and one event serves every sprite of its kinds."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - hint: "Change the 1 in change score by 1."
    check: { type: code, text: "Make each coin worth 5 points.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeScoreBy(5)"] } } }
  - hint: ["Drag in another set … to sprite of kind block, and choose Food as its kind.", "Give it its own name and its own set position. You do not need a new overlap event."]
    check: { type: code, text: "Add a second coin of kind Food somewhere else. Collect both.", rules: { count: { "SpriteKind.Food)": 2 } } }
```

### Worth more

Make each coin worth **5** points.

### A second coin

Add a second coin, of kind **Food**, somewhere else on the screen. Does it need its own overlap event?

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "The two numbers in move with buttons are speeds across and down."
check:
  type: question
  q: "The ship has move with buttons with speeds 100 and 0. Which arrow keys move it?"
  options: ["Left and right only", "Up and down only", "All four", "None"]
  answer: 0
  explain: "The first number is the speed across (100) and the second the speed up and down (0), so only left and right do anything."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Two new sprites: one of kind Food, one of kind Enemy. Click the kind in each create block."
  - "Two on overlap blocks (Sprites › Overlaps): Player with Food, and Player with Enemy."
  - "Food: change score by 1, then destroy otherSprite. Enemy: change score by -1, then destroy otherSprite."
check: { type: code, text: "A collector: touching Food scores 1 and removes it; touching an Enemy takes 1 away.", rules: { contains: ["SpriteKind.Food)", "SpriteKind.Enemy)"], inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeScoreBy(1)", "destroy("], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["info.changeScoreBy(-1)"] } } }
unlocks: [on-overlap]
```

Make a **collector** game:

- **good food** (an apple, a gem): touching it scores **1**, and it vanishes
- a **bad item** of kind **Enemy** (a worm, a bomb): touching it takes **1** away, and it is destroyed

Check every create block: is its kind right?

## Change a fruit stall game

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#stall" }
```

Bananas fall into a basket at a market stall. Make them fall faster, then add a rotten tomato of kind **Enemy** that falls too and takes 2 points when caught.

```teacher
summary: "Students make overlap events that run when two sprites touch, and see that the kinds named in the event decide which event runs."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 9 min · Fruit stall 3 min"
goals:
  - I can make something happen when two sprites touch.
  - I can choose a sprite's kind, and say which overlap event a touch will run.
  - I can keep a score.
before: |
  An **overlap** is two sprites touching. **on sprite of kind Player overlaps otherSprite of kind Food** (Sprites › Overlaps) is an **event**: it runs when a sprite of the **first kind** touches a sprite of the **second kind**, and never for any other pair. Inside it, **sprite** is the first one (the player) and **otherSprite** the second (the coin that was touched). Every sprite has a **kind**: Player, Food, Enemy or Projectile. The create block starts with **of kind Player**, so a forgotten kind is the most common bug: a coin made as a Player is never collected. **change score by** (Info) shows a score at the top of the screen.
running:
  - "Predict: most students expect the coin to vanish. The real point is why: ask which two kinds the event names."
  - "Investigate: the match shows that a pair no event names (Food and Enemy) does nothing. Ava's star is the default kind left as Player."
  - "Modify: a second coin needs no new event: one event serves every Food sprite."
  - "Mix it up: move with buttons speeds, from lesson 2."
  - "Make: check every create block's kind before testing. Two overlap events, one per kind."
stuck:
  - see: "Touching the coin does nothing."
    ask: "What kind is the coin, and what kinds does the overlap event name?"
    fix: "Make the coin of kind Food (the dropdown in its create block), to match Player–Food in the event."
  - see: "The wrong sprite disappears (the player instead of the coin)."
    ask: "Which sprite does destroy name: sprite or otherSprite?"
    fix: "otherSprite is the one of the second kind (Food). Drag otherSprite into destroy."
  - see: "The score jumps up by many points in one touch."
    ask: "What happens to the coin after the touch?"
    fix: "If it stays where it is, the event runs again every frame. Destroy it (next lesson looks at this)."
stretch: "Add a second kind of good food worth 3 points. Which kinds does its event need?"
support: "Give students the Food and Enemy sprites already made with the right kinds, and ask them to build only the two overlap events."
leads: "Next lesson adds lives and a game that ends. Class ideas: a recycling sorter (paper is Food, plastic is Enemy); design a game where the kinds are swapped: what changes?"
exit:
  q: "A coin is made of kind Player. The game has a Player–Food overlap event. Will touching the coin score? Why?"
  a: "No. The event only runs when a Player touches a Food sprite. The coin is a Player, so no event runs. Change its kind to Food."
explain: |
  When two sprites touch, they **overlap**. An **on overlap** event names **two kinds**:

  1. It runs when a sprite of the **first kind** touches a sprite of the **second kind**, and for no other pair.
  2. Inside it, **sprite** is the first one and **otherSprite** the second.
  3. So the **kind** you choose when you create a sprite decides which overlap event its touches run.
solutions:
  step-4#t1: lesson.ts#sol-worth
  step-4#t2: lesson.ts#sol-second
  step-6: lesson.ts#sol-make
struggle: "Kinds decide which overlap runs, and sprite versus otherSprite. When a touch does nothing, ask them to read out the kinds of both sprites and the kinds the event names."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what happens when the player reaches the coin. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask: which two kinds does the event name? That is why it runs."
    - at: investigate
      title: Name tags
      minutes: 4
      do: |
        Students wear kind cards (Player, Food, Enemy). The teacher reads an event ("Player meets Food: cheer"). Pairs that meet act only if their cards match the event.
      notes: "A Player meeting a Player does nothing: that is Ava's star."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Swap collectors with the next pair. Read out each sprite's kind before you play.
```

```code lesson.ts#predict
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#kinds
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
let spike = sprites.create(img`
    . f . f
    f 2 f .
    . f 2 f
    f . f .
    `, SpriteKind.Enemy)
spike.setPosition(40, 30)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#sol-worth
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(5)
})
```

```code lesson.ts#sol-second
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
let coin2 = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin2.setPosition(40, 100)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(5)
})
```

```code lesson.ts#review
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 105)
controller.moveSprite(ship, 100, 0)
```

```code lesson.ts#make
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
```

```code lesson.ts#sol-make
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let apple = sprites.create(img`
    . . 7 .
    . 2 2 .
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Food)
apple.setPosition(130, 30)
let worm = sprites.create(img`
    . a a .
    a . . a
    a . . .
    . a a a
    `, SpriteKind.Enemy)
worm.setPosition(40, 90)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#stall
scene.setBackgroundColor(13)
info.setScore(0)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
let banana = sprites.create(img`
    . . . 5
    . . 5 5
    5 5 5 .
    `, SpriteKind.Food)
banana.setPosition(40, 0)
banana.vy = 30
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(40, 0)
})
```
