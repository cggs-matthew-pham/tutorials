---
order: 6
unit: collide-score
moveId: timer-spawns
reviews: [lives-end-game, place-a-sprite]
introduces: [random]
assumes: [variable]
title: Timers
summary: Use a timer to make a new enemy every second, from a random place, for as long as the game lasts.
language: makecode
explainPicture: lesson.ts#dodge
hook: "Enemies that keep on coming, raindrops that never stop: a game that runs for minutes is made by a few blocks that run again and again."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#dodge", lesson: "code/arcade/arcade-timers", target: "arcade" }
  caption: "A timer runs its blocks again and again"
  say: "A timer runs its blocks again and again."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "on game update every 1000 ms: once a second."
        say: "on game update every thousand milliseconds runs once a second."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Each time, it makes a new rock."
        say: "Each time it runs, it makes a brand new rock."
    - caption:
        text: "pick random gives each rock its own height."
        say: "pick random gives each rock its own height."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson three rocks flew in, and then the game ran out of rocks. A **timer** fixes that. **on game update every 1000 ms** (in **Game**) is an event that runs its blocks again every so many **milliseconds** (1000 ms is one second), for as long as the game lasts.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The timer runs every 1000 ms and makes a rock each time. You watch for 5 seconds. How many rocks have appeared?"
  options: ["5", "1", "1000", "0"]
  fault: logic
  misconception: timer-runs-once
  actual: "5. The timer runs once every second, and each time it makes a new rock: 5 seconds, 5 rocks."
```

The rock is made **inside** the timer, not in on start.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I counted the rocks for five seconds and compared with my prediction." }
```

Count the rocks as they come.

## Investigate

```step
stage: investigate
code: lesson.ts#dodge
insight: "A timer event runs its blocks every so many milliseconds, so each run can make a new sprite. pick random runs again each time too, so each rock gets its own height."
try: { playground: arcade, starter: "lesson.ts#dodge" }
tasks:
  - check:
      type: number
      q: "The timer runs every 500 ms. How many rocks has it made after 10 seconds?"
      answer: 20
      explain: "500 ms is half a second, so the timer runs twice a second: 20 times in 10 seconds."
  - check:
      type: question
      q: "Ava picks a random height once, in on start, and stores it in y. Every rock in her timer uses y. What does she see?"
      options: ["Every rock comes at the same height", "Each rock comes at a different height", "No rocks", "Rocks at every height at once"]
      answer: 0
      fault: logic
      misconception: random-picked-once
      explain: "pick random ran once, in on start, so y never changes. Put pick random inside the timer, so each new rock gets a new number."
  - check:
      type: match
      q: "Match each timer with how often it runs."
      pairs:
        - ["every 1000 ms", "once a second"]
        - ["every 500 ms", "twice a second"]
        - ["every 2000 ms", "once every two seconds"]
```

Dodge the rocks with the arrow keys.

### How many?

### Ava's rocks

Ava's program:

```makecode
let y = randint(10, 110)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . c c .
        c b b c
        c b b c
        . c c .
        `, SpriteKind.Enemy)
    rock.setPosition(160, y)
    rock.vx = -50
})
```

### How often?

## Modify

```step
stage: modify
insight: "The number in the timer sets how often it runs: a smaller number means more often. pick random inside the timer gives each new sprite a new number."
try: { playground: arcade, starter: "lesson.ts#predict" }
tasks:
  - hint: "Change 1000 in on game update every. Half a second is 500 ms."
    check: { type: code, text: "Make a rock come every half a second.", rules: { contains: ["game.onUpdateInterval(500,"] } }
  - hint: ["pick random is in Math.", "Drag it into the y of set rock position, inside the timer: pick random 10 to 110."]
    check: { type: code, text: "Each rock starts at a random height.", rules: { inside: { "game.onUpdateInterval(": ["randint("] } } }
```

### Faster rocks

Make a rock come every **half a second**.

### Random heights

Give each rock a **random** height, so they don't all come through the middle.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "The engine ends the game when the lives reach 0; each overlap changes the lives once if the sprite is destroyed."
check:
  type: trace
  text: "The player starts with 2 lives. Fill in the lives after each thing happens."
  table: |
    | what happens | lives after |
    | (start) | 2 |
    | collects a heart | [3] |
    | a rock hits | [2] |
    | a rock hits | [1] |
  explain: "The heart's Player–Food event adds one life; each rock that hits takes one and is destroyed."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "In on start: set life to 3 and start countdown 30 (both in Info)."
  - "Timer: on game update every 1000 ms (Game). Inside, create an Enemy, set its position to x 160 and y pick random 10 to 110, and set its vx to a negative number."
  - "Overlap Player with Enemy: change life by -1, and destroy otherSprite so one touch takes only one life."
check: { type: code, text: "A 30-second dodge game: 3 lives, a countdown of 30, an enemy every second from a random height on the right, and a touch takes one life.", rules: { contains: ["info.setLife(3)", "info.startCountdown(30)"], inside: { "game.onUpdateInterval(1000": ["SpriteKind.Enemy", "randint("], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["info.changeLifeBy(-1)", "destroy("] } } }
unlocks: [on-game-update-every]
```

Make a **30-second dodge game** (bats in a cave, asteroids, traffic):

- the player starts with **3 lives**
- a **countdown** of 30 seconds (**start countdown**, in Info): survive it to finish
- every second, a new **enemy** flies in from the **right edge** at a **random height**
- each touch takes **one** life

## Change a rain dodger

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#rain" }
```

Someone is walking home in the rain without an umbrella. Make the rain heavier (more drops, falling faster), then give the walker 5 lives and a 40-second walk home.

```teacher
summary: "Students use a timer event to make a new enemy every second, from a random height, and see that both the timer and pick random run again each time."
time: 45
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 13 min · Rain dodger 4 min"
goals:
  - I can use a timer to make a new enemy again and again.
  - I can choose how often a timer runs.
  - I can give each new sprite a random place.
before: |
  **on game update every 1000 ms** (Game) is a **timer event**: it runs its blocks again every so many milliseconds (1000 ms = 1 second) for as long as the game lasts. Here it makes a new enemy each time, at x 160 (the right edge), with a **negative vx** so it flies left. **pick random** (Math) gives a new whole number each time it runs, so inside the timer each rock gets its own height. **start countdown** (Info) ends the game after so many seconds. Try the Make yourself: about 15 blocks.
running:
  - "Predict: some students expect one rock, because the create block appears once. It runs once per timer run."
  - "Investigate: Ava's rocks are the random-once mistake: a random number picked once is just a number."
  - "Modify: a smaller timer number means more often."
  - "Mix it up: lives, from last lesson."
  - "Make: x 160 is the right edge, negative vx flies left. Students who forget destroy lose all three lives at once."
stuck:
  - see: "Only one enemy ever appears."
    ask: "Is the create block inside the timer, or in on start?"
    fix: "Move it into on game update every 1000 ms, so a new one is made each second."
  - see: "No enemies appear."
    ask: "Where does each enemy start, and which way does it move?"
    fix: "Start at x 160 and give a negative vx. With a positive vx it leaves the screen to the right at once."
  - see: "Every rock comes at the same height."
    ask: "Where is pick random?"
    fix: "Put it inside the timer, in the set position block, so it runs for every rock."
stretch: "Make the game a win if you survive: add on countdown end (Info) with game over (win)."
support: "Give students the timer block with the enemy already inside, and ask them to add lives, the countdown and the overlap event."
leads: "Next unit the game decides things every frame: if a sprite leaves the screen, wrap it round. Class idea: vote on the fairest number of lives and timer speed."
exit:
  q: "A timer runs every 2000 ms and makes one enemy each time. How many enemies after 10 seconds?"
  a: "5. It runs once every two seconds."
explain: |
  **on game update every 1000 ms** is a **timer**: it runs its blocks again every second, for as long as the game lasts. So it can make a new enemy each time.

  A smaller number means more often: every 500 ms is twice a second.

  **pick random** gives a new number each time it runs. Inside the timer, each rock gets its own height.
solutions:
  step-4#t1: lesson.ts#sol-faster
  step-4#t2: lesson.ts#sol-random
  step-6: lesson.ts#sol-make
struggle: "Seeing that the blocks inside a timer run again and again. Ask how many times the create block has run after five seconds."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner how many rocks appear in 5 seconds. Hold up fingers.
      notes: "Ask the '1' group how often the timer runs."
    - at: investigate
      title: Clap the timer
      minutes: 3
      do: |
        The class claps once a second. On each clap, one student rolls a dice and calls out a height.
      notes: "A new roll every clap: that is pick random inside the timer. Rolling once at the start is Ava's bug."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Play the next pair's dodge game. Can you survive 30 seconds?
```

```code lesson.ts#predict
let rock: Sprite = null
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(@IMG:rock@, SpriteKind.Enemy)
    rock.setPosition(160, 60)
    rock.vx = -50
})
```

```code lesson.ts#dodge
let rock: Sprite = null
info.setLife(3)
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(@IMG:rock@, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#sol-faster
let rock: Sprite = null
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
game.onUpdateInterval(500, function () {
    rock = sprites.create(@IMG:rock@, SpriteKind.Enemy)
    rock.setPosition(160, 60)
    rock.vx = -50
})
```

```code lesson.ts#sol-random
let rock: Sprite = null
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
game.onUpdateInterval(500, function () {
    rock = sprites.create(@IMG:rock@, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
```

```code lesson.ts#review
info.setLife(2)
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
controller.moveSprite(mySprite)
let heart = sprites.create(@IMG:heart@, SpriteKind.Food)
heart.setPosition(120, 30)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#make
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
```

```code lesson.ts#sol-make
let bat: Sprite = null
info.setLife(3)
info.startCountdown(30)
let mySprite = sprites.create(@IMG:mySprite@, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    bat = sprites.create(@IMG:bat@, SpriteKind.Enemy)
    bat.setPosition(160, randint(10, 110))
    bat.vx = -60
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```

```code lesson.ts#rain
let drop: Sprite = null
scene.setBackgroundColor(11)
info.setLife(3)
info.startCountdown(20)
let walker = sprites.create(@IMG:walker@, SpriteKind.Player)
walker.setPosition(80, 108)
controller.moveSprite(walker, 100, 0)
game.onUpdateInterval(800, function () {
    drop = sprites.create(@IMG:drop@, SpriteKind.Enemy)
    drop.setPosition(randint(5, 155), 0)
    drop.vy = 40
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
```
