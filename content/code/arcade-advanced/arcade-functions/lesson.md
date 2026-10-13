---
order: 2
unit: many
moveId: name-a-job
reviews: [every-of-kind]
introduces: [function]
assumes: [variable, random, for-of]
title: Functions
summary: Name a job once as a function, call it wherever it is needed, and see that every event block is a function too.
language: makecode
explainPicture: lesson.ts#game
hook: "A game makes enemies at the start, on a timer and when a level begins. Writing the same blocks three times is how bugs creep in: name the job once instead."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#game", lesson: "code/arcade-advanced/arcade-functions", target: "arcade" }
  caption: "A function is a named job"
  say: "A function is a named job. Making it does not run it."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A call block runs it, once per call."
        say: "A call block runs it, once for each call."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The timer calls spawnBug every second."
        say: "The timer calls spawn bug every second, so a bug appears every second."
    - caption:
        text: "Event blocks are functions too, called by the game."
        say: "Every event block is a function too. The game calls it for you."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Making an enemy takes several blocks: create it, place it, set its speed. When a game needs that job in several places, you can **name** the blocks once as a **function**, then **call** the function by name wherever you need it. Make one in **Functions › Make a Function** (in the toolbox, under Advanced). Its **call** block then appears in the same place.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "on start calls spawnBug three times. What do you see?"
  options: ["Three bugs flying right", "One bug", "Nothing: a function only runs in a timer", "Three bugs, all at the same height"]
  fault: logic
  misconception: arcade-define-not-call
  actual: "Three bugs flying right. Each call runs the function's blocks once, and each run picks its own random height."
```

**function spawnBug** holds the blocks for one bug. They run only when something **calls** spawnBug.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I counted the bugs and compared with my prediction." }
```

Count the bugs. Press the restart button under the simulator to watch again (the heights are random).

## Investigate

```step
stage: investigate
code: lesson.ts#game
insight: "A function names a job once; its blocks run only when it is called, once per call. Every event block is a function too: in Python you can see the blocks handed to the game to call."
try: { playground: arcade, starter: "lesson.ts#game" }
tasks:
  - check:
      type: question
      q: "Ava made the spawnBug function and an empty timer (below). She runs the game and no bugs ever appear. Why?"
      options: ["The timer is too slow", "Nothing calls spawnBug: making a function does not run it", "Functions only work in on start", "The bugs are invisible"]
      answer: 1
      fault: logic
      misconception: arcade-define-not-call
      explain: "Making a function only names the job. Its blocks run when a call block runs them. Ava's timer is empty, so the job is never done."
  - check:
      type: number
      q: "The game runs for 10 seconds. The timer calls spawnBug every 1000 ms. How many times do the blocks inside spawnBug run?"
      answer: 10
      tolerance: 1
      explain: "Once per call, and the timer calls it once a second: about 10 times in 10 seconds."
  - check:
      type: match
      q: "This is the game in Python (press Python at the top of the editor). Match each Python line with what it does."
      pairs:
        - ["def spawn_bug():", "makes the function spawn_bug"]
        - ["spawn_bug()", "calls it: runs its blocks once"]
        - ["def on_update_interval():", "makes a function from the blocks inside on game update every"]
        - ["game.on_update_interval(1000, on_update_interval)", "hands that function to the game to call every second"]
```

The game: a bug flies in from the left every second. Dodge them.

### Ava's bugs

Ava's program:

```makecode
let bug: Sprite = null
function spawnBug () {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = 40
}
game.onUpdateInterval(1000, function () {
})
```

### How many bugs?

### The same game in Python

```python
def spawn_bug():
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = 40
def on_update_interval():
    spawn_bug()
game.on_update_interval(1000, on_update_interval)
```

Look at what Python did with **on game update every**: it is a `def`, a function, and the line after it **hands** that function to the game. Every event block you have used is a function the game calls for you.

## Modify

```step
stage: modify
insight: "Changing the function once changes every call, and any event can call it."
try: { playground: arcade, starter: "lesson.ts#game" }
tasks:
  - hint: ["Put the block inside the function, not inside the timer.", "change score by 1 (Info) goes at the end of spawnBug."]
    check: { type: code, text: "Score a point for every bug the game makes, by adding one block inside spawnBug.", rules: { inside: { "function spawnBug (": ["info.changeScoreBy("] } } }
  - hint: "Drag in on A button pressed, and put call spawnBug inside it."
    check: { type: code, text: "Make A send an extra bug.", rules: { inside: { "controller.A.onEvent(": ["spawnBug()"] } } }
```

### A point per bug

Score a point for **every bug** that is made: a survival score. Change the **function**, so every call scores.

### An extra bug

Make **A** call spawnBug too. Does the extra bug score a point?

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A for element loop runs its blocks once for each sprite in the list."
check:
  type: number
  q: "There are 3 bugs on the screen. You press B. How many bugs are destroyed?"
  answer: 3
  explain: "array of sprites of kind Enemy lists all 3, and the loop destroys each one."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Make a Function called makeCoin. Inside: set coin to sprite of kind Food, then set its position to random x and y."
  - "Call makeCoin three times in on start."
  - "In the overlap, after destroy and change score, call makeCoin once more."
check: { type: code, text: "A makeCoin function, called three times at the start and again each time a coin is collected.", rules: { defs: 1, calls: 4 } }
unlocks: [function]
```

Make a **coin collector** that never runs out of coins:

- a function **makeCoin** makes one coin (kind **Food**) at a random place,
- **on start** calls it three times, so there are three coins,
- every time a coin is collected, the overlap calls it again, so there are always three.

## Change a snow globe

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#snow" }
```

Snow falls in this globe: a function **addFlake** makes one flake, and a timer calls it. Make every flake fall faster (one change, in the function), then make **A** shake the globe: five extra flakes at once.

```teacher
summary: "Students name a job (making an enemy) as a function, call it from several places, and see in Python that every event block is a function the game calls."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 9 min · Snow globe 3 min"
goals:
  - I can make a function and call it from more than one place.
  - I can change a job in one place, for every call.
  - I can explain that an event block is a function the game calls for me.
before: |
  A **function** is a named job: some blocks with a name, made once in **Functions** (under Advanced in the toolbox). Making it does **not** run it. It runs when a **call** block calls it, once per call. One copy serves every call, so a change to the function changes every place that calls it. The **Python** button at the top of the editor shows the same program as text: every event block (*on game update every*, *on overlap*, *on A pressed*) becomes a `def`, handed to the game, which calls it. MakeCode adds a `global bug` line inside the function: it means "use the bug variable from outside". Parameters (inputs) are next lesson.
running:
  - "Predict: some students expect nothing, because the function is not an event. Each call runs it."
  - "Investigate: Ava's empty timer is this lesson's misconception. Then switch the editor to Python together before the match."
  - "Modify: the score goes inside the function, so every call scores, wherever it is called from."
  - "Mix it up: the for element loop, from last lesson."
  - "Make: makeCoin is called four times in the code: three in on start, one in the overlap."
stuck:
  - see: "No bugs appear."
    ask: "Which block calls your function?"
    fix: "Add a call block (from Functions) inside the timer or on start."
  - see: "The call block is missing from the toolbox."
    ask: "Have you made the function yet?"
    fix: "Make the function first; its call block then appears under Functions."
  - see: "Only one coin ever comes back."
    ask: "Where is the call to makeCoin in the overlap?"
    fix: "Call it after destroy, inside the Player–Food overlap."
stretch: "Make a second function, makeSpike, that adds an Enemy at a random place, and call it every 3 seconds."
support: "Give students the makeCoin function already made, and ask them to add the four calls."
leads: "Next lesson: a parameter, so one function can make a slow bug and a fast bug. Skillmap: the Game Maker Guide (arcade.makecode.com/skillmaps) builds bigger games from named jobs like these."
exit:
  q: "You make a function, but never call it. What happens when the game runs?"
  a: "Nothing from that function: its blocks only run when something calls it."
explain: |
  A **function** is a named job. Making it does **not** run it: a **call** block runs it, once per call.

  One copy serves every call, so changing the function changes every place that calls it.

  Press **Python** in the editor: every event block is a function too. The game calls it for you each time the event happens.
solutions:
  step-4#t1: lesson.ts#sol-points
  step-4#t2: lesson.ts#sol-extra
  step-6: lesson.ts#sol-make
struggle: "Making a function does nothing until it is called. When nothing appears, ask which block calls the function."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner how many bugs on start makes.
      notes: "Count the call blocks together."
    - at: investigate
      title: Recipe cards
      minutes: 3
      do: |
        One student holds a recipe card ("make a bug: stand at the door, walk across"). Nothing happens until the teacher calls "make a bug!", and then it happens each time.
      notes: "Writing the card is making the function; calling its name runs it."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your coin collector to the next pair. Collect a coin: does a new one appear?
```

```code lesson.ts#predict
let bug: Sprite = null
function spawnBug () {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = 40
}
scene.setBackgroundColor(9)
spawnBug()
spawnBug()
spawnBug()
```

```code lesson.ts#game
let bug: Sprite = null
function spawnBug () {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = 40
}
info.setLife(3)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(140, 60)
controller.moveSprite(player)
player.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    spawnBug()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-points
let bug: Sprite = null
function spawnBug () {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = 40
    info.changeScoreBy(1)
}
info.setLife(3)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(140, 60)
controller.moveSprite(player)
player.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    spawnBug()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-extra
let bug: Sprite = null
function spawnBug () {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = 40
    info.changeScoreBy(1)
}
info.setLife(3)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(140, 60)
controller.moveSprite(player)
player.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    spawnBug()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    spawnBug()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#review
let bug: Sprite = null
bug = sprites.create(img`
    . . 7 7 . .
    . 7 7 7 7 .
    7 7 f 7 f 7
    . 7 7 7 7 .
    `, SpriteKind.Enemy)
bug.setPosition(20, 30)
bug = sprites.create(img`
    . . 7 7 . .
    . 7 7 7 7 .
    7 7 f 7 f 7
    . 7 7 7 7 .
    `, SpriteKind.Enemy)
bug.setPosition(80, 60)
bug = sprites.create(img`
    . . 7 7 . .
    . 7 7 7 7 .
    7 7 f 7 f 7
    . 7 7 7 7 .
    `, SpriteKind.Enemy)
bug.setPosition(140, 90)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
})
```

```code lesson.ts#make
scene.setBackgroundColor(7)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

```code lesson.ts#sol-make
let coin: Sprite = null
function makeCoin () {
    coin = sprites.create(img`
        . 5 5 .
        5 5 4 5
        5 4 5 5
        . 5 5 .
        `, SpriteKind.Food)
    coin.setPosition(randint(10, 150), randint(10, 110))
}
scene.setBackgroundColor(7)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
makeCoin()
makeCoin()
makeCoin()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    makeCoin()
})
```

```code lesson.ts#snow
let flake: Sprite = null
function addFlake () {
    flake = sprites.create(img`
        . 1 .
        1 1 1
        . 1 .
        `, SpriteKind.Food)
    flake.setPosition(randint(5, 155), 0)
    flake.vy = 15
}
scene.setBackgroundColor(8)
game.onUpdateInterval(500, function () {
    addFlake()
})
```
