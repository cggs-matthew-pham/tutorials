---
order: 3
unit: many
moveId: job-with-input
reviews: [name-a-job, timer-spawns]
introduces: [param]
assumes: [variable, random, function]
title: Parameters
summary: Give a function a parameter, so each call hands in a value and the job is done a little differently each time.
language: makecode
explainPicture: lesson.ts#predict
hook: "A slow bug, a fast bug, a boss: the same job, make an enemy, with one thing changed. A parameter is that one thing."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade-advanced/arcade-parameters", target: "arcade" }
  caption: "A parameter is a value the call hands in"
  say: "A parameter is a value the call hands in."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "spawnEnemy(speed): inside, speed is whatever the call says."
        say: "Inside spawn enemy, speed is whatever number the call hands in."
    - click: "Run"
    - wait: 600
    - caption:
        text: "spawnEnemy(20) makes a slow bug; spawnEnemy(100) a fast one."
        say: "spawn enemy 20 makes a slow bug, and spawn enemy 100 a fast one."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson spawnBug made the same bug every time. A function can also take a **parameter**: a value handed in by the call. **spawnEnemy(speed)** makes an enemy, and the call says how fast: *spawnEnemy(20)*, *spawnEnemy(100)*. When you make a function, click **Add a parameter** and choose **Number**.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "on start calls spawnEnemy three times, with 20, 50 and 100. What do you see?"
  options: ["Three bugs flying right, each at a different speed", "Three bugs flying right at the same speed", "One bug, flying at speed 100", "Nothing: the function is never used"]
  fault: logic
  misconception: param-fixed-inside
  actual: "Three bugs flying right, each at a different speed. Each call runs the function's blocks once, and speed is the number that call handed in: 20, then 50, then 100."
```

Inside **spawnEnemy**, **speed** is whatever number the call hands in.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched the three bugs' speeds and compared with my prediction." }
```

Which one was **spawnEnemy(100)**? Press the restart button under the simulator to watch again.

## Investigate

```step
stage: investigate
code: lesson.ts#game
insight: "A parameter is a value each call hands in, so one function does the job differently each time. The number belongs in the call, not inside the function."
try: { playground: arcade, starter: "lesson.ts#game" }
tasks:
  - check:
      type: trace
      text: "The program calls spawnEnemy(30), then spawnEnemy(80), then spawnEnemy(30). Fill in each bug's vx."
      table: |
        | call | bug's vx |
        | spawnEnemy(30) | [30] |
        | spawnEnemy(80) | [80] |
        | spawnEnemy(30) | [30] |
      explain: "Inside the function, vx is set to speed, and speed is whatever that call handed in."
  - check:
      type: question
      q: "Leo changes the line inside spawnEnemy to set bug vx to 60. His calls still say spawnEnemy(20) and spawnEnemy(100). What happens?"
      options: ["Every bug flies at 60: the number inside ignores what the calls hand in", "The bugs fly at 20 and 100", "The bugs fly at 80 and 160", "No bugs appear"]
      answer: 0
      fault: logic
      misconception: param-fixed-inside
      explain: "speed is no longer used, so the value each call hands in is ignored. Put speed back inside, and choose the number in the call."
  - check:
      type: match
      q: "The function in Python. Match each line with what it does."
      pairs:
        - ["def spawn_enemy(speed):", "makes the function, with a parameter called speed"]
        - ["bug.vx = speed", "uses whatever number the call handed in"]
        - ["spawn_enemy(40)", "calls it, with speed 40"]
```

### Trace the calls

### Leo's bugs

### In Python

```python
def spawn_enemy(speed):
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = speed
def on_update_interval():
    spawn_enemy(40)
game.on_update_interval(1000, on_update_interval)
```

## Modify

```step
stage: modify
insight: "Change the call to change one bug; add a parameter to choose something new for every call."
try: { playground: arcade, starter: "lesson.ts#game" }
tasks:
  - hint: ["pick random is in Math.", "Drag pick random into the call's number slot: spawnEnemy(pick random 20 to 100)."]
    check: { type: code, text: "Each bug gets a random speed: the timer calls spawnEnemy with a random number.", rules: { inside: { "game.onUpdateInterval(": ["spawnEnemy(randint("] } } }
  - hint: ["Click the function's header and Add a parameter: a Number called height.", "Use height in set bug position, and give every call a second number."]
    check: { type: code, text: "Add a second parameter, height, so each call also chooses how high the bug flies.", rules: { params: 2 } }
```

### Random speeds

Make every bug fly at a **random** speed between 20 and 100. Change the **call**, not the function.

### Choose the height

Add a second parameter, **height**, and use it for the bug's y.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A timer calls the function each time it runs, so the function's blocks run once per call."
check:
  type: number
  q: "This timer runs every 500 ms and calls makeCoin each time. How many times have makeCoin's blocks run after 3 seconds?"
  answer: 6
  explain: "500 ms is half a second, so the timer runs twice a second: 6 calls in 3 seconds."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "spawnEnemy(speed) is made for you. You need two timers."
  - "One timer every 1000 ms calls spawnEnemy(30). Another every 3000 ms calls spawnEnemy(90)."
check: { type: code, text: "Two kinds of bug from one function: slow bugs every second and fast bugs every three seconds.", rules: { params: 1, calls: 2, contains: ["game.onUpdateInterval(1000,", "game.onUpdateInterval(3000,"] } }
unlocks: [function-with-a-parameter]
```

Make **two kinds of bug** from one function:

- a **slow** bug (speed 30) every second
- a **fast** bug (speed 90) every three seconds

## Change an aquarium

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#aquarium" }
```

This aquarium uses one function, **addFish(speed)**, to add every fish. **A** (space on the keyboard) adds a fish at a random speed. Start the tank with five fish instead of three, then add a second parameter so each call also chooses how high the fish swims.

```teacher
summary: "Students give a function a parameter, so each call hands in a value and the same job is done differently each time."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 9 min · Mix it up 3 min · Make 8 min · Aquarium 3 min"
goals:
  - I can give a function a parameter and call it with different values.
  - I can say where the value comes from inside the function.
  - I can make two kinds of enemy from one function.
before: |
  A **parameter** is an input to a function, such as `speed` in *spawnEnemy(speed)*: the call hands in a number (*spawnEnemy(50)*), and inside the function `speed` is that number. So one function can make a slow bug and a fast bug. In the block editor, click **Add a parameter** when making the function; drag `speed` out of the function's header to use it inside. The common slip is typing a number inside the function, which ignores every call's value.
running:
  - "Predict: some students expect three bugs at the same speed. Point at the three numbers in the calls. Ask: where does speed get its value?"
  - "Investigate: the trace pins down where speed comes from; Leo's bugs is the number fixed inside."
  - "Modify: random speeds change the call; the height parameter changes the function and every call."
  - "Mix it up: counting calls from a timer."
  - "Make: two timers, one function."
stuck:
  - see: "Every bug has the same speed."
    ask: "Is speed used inside the function, or a number?"
    fix: "Drag speed from the function header into set vx."
  - see: "The call has no slot for a number."
    ask: "Did you add a parameter to the function?"
    fix: "Click the function header, Add a parameter, Number."
  - see: "Only one kind of bug appears."
    ask: "What numbers do your two calls hand in?"
    fix: "Use different numbers in the two calls: 30 and 90."
stretch: "Add a third parameter for how many points the bug is worth when it is made, and give the fast bugs more."
support: "Give students one timer already calling spawnEnemy(30), and ask them to add the second."
leads: "Next unit: gravity and jumping. Skillmap: the Game Maker Guide (arcade.makecode.com/skillmaps)."
exit:
  q: "spawnEnemy(speed) sets bug vx to speed. The timer calls spawnEnemy(70). How fast is that bug?"
  a: "70. speed is the number the call handed in."
explain: |
  A **parameter** is a value the call hands in. *spawnEnemy(20)* makes `speed` 20 inside the function; *spawnEnemy(100)* makes it 100.

  So one function can do its job differently each time. Choose the number in the **call**, and use the parameter **inside** the function.
solutions:
  step-4#t1: lesson.ts#sol-random
  step-4#t2: lesson.ts#sol-height
  step-6: lesson.ts#sol-make
struggle: "Where the value comes from. Ask them to point at the call, then at where speed is used inside."
class:
  activities:
    - at: investigate
      title: Fill in the blank
      minutes: 3
      do: |
        One student has a card: "walk across at ___ steps a second". The class calls a number; the student walks at that speed.
      notes: "The card is the function; the number called out is the parameter."
```

```code lesson.ts#predict
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
}
scene.setBackgroundColor(9)
spawnEnemy(20)
spawnEnemy(50)
spawnEnemy(100)
```

```code lesson.ts#game
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
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
    spawnEnemy(40)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-random
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
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
    spawnEnemy(randint(20, 100))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-height
let bug: Sprite = null
function spawnEnemy (speed: number, height: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, height)
    bug.vx = speed
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
    spawnEnemy(randint(20, 100), randint(10, 110))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#review
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
game.onUpdateInterval(500, function () {
    makeCoin()
})
```

```code lesson.ts#make
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#sol-make
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . . 7 7 . .
        . 7 7 7 7 .
        7 7 f 7 f 7
        . 7 7 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
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
    spawnEnemy(30)
})
game.onUpdateInterval(3000, function () {
    spawnEnemy(90)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

```code lesson.ts#aquarium
let fish: Sprite = null
function addFish (speed: number) {
    fish = sprites.create(img`
        . . 4 4 4 . 4
        . 4 4 4 4 4 4
        4 f 4 4 4 . 4
        . 4 4 4 . . .
        `, SpriteKind.Player)
    fish.setPosition(randint(10, 150), randint(10, 110))
    fish.vx = speed
    fish.setBounceOnWall(true)
}
scene.setBackgroundColor(8)
addFish(20)
addFish(40)
addFish(60)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    addFish(randint(10, 80))
})
```
