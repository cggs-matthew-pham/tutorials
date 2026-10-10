---
order: 8
unit: tools
title: Functions
summary: Name a job once as a function, give it a parameter so it can do the job differently each time, and see that every event block is a function too.
language: makecode
introduces: [function, param]
explainPicture: functions.ts#predict
hook: "A game makes the same thing again and again: another enemy, another coin, another wave. Programmers write that job once, give it a name, and use the name everywhere."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@functions.ts#predict", lesson: "code/arcade/arcade-functions", target: "arcade" }
  caption: "A function is a named job"
  say: "A function is a named job. Making it does not run it."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A call block runs it, once per call."
        say: "A call block runs it, once for each call."
    - caption:
        text: "speed is a parameter: spawnEnemy(50) makes speed 50."
        say: "speed is a parameter. spawn enemy 50 makes speed fifty inside."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Each call can make a different bug."
        say: "So each call can make a different bug."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Making an enemy takes several blocks: create it, place it, set its speed. When a game needs that job in several places, you can **name** the blocks once as a **function**, then **call** the function by name wherever you need it.

A function can also take a **parameter**: a value handed in by the call. **spawnEnemy(speed)** makes an enemy, and the call says how fast: *spawnEnemy(20)*, *spawnEnemy(100)*. Make a function in **Functions › Make a Function** (in the toolbox, under Advanced). Its **call** block then appears in the same drawer.

## Predict

```step
stage: predict
code: functions.ts#predict
check:
  type: predict
  q: "on start calls spawnEnemy three times, with 20, 50 and 100. What do you see?"
  options: ["Three bugs flying right, each at a different speed", "Three bugs flying right at the same speed", "One bug, flying at speed 100", "Nothing: the function is never used"]
  actual: "Three bugs flying right, each at a different speed. Each call runs the function's blocks once, and speed is the number that call handed in: 20, then 50, then 100."
```

**function spawnEnemy** holds the blocks for one enemy. Inside it, **speed** is whatever number the call hands in.

## Run

```step
stage: run
code: functions.ts#predict
try: { playground: arcade, starter: "functions.ts#predict" }
check: { type: reflect, text: "I counted the bugs, watched their speeds and compared with my prediction." }
```

Watch the three bugs. Which one was **spawnEnemy(100)**? Press the restart button under the simulator to watch again (the heights are random).

## Investigate

```step
stage: investigate
code: functions.ts#game
insight: "A function names a job once; its blocks run only when it is called, once per call, and a parameter lets each call do the job differently. Every event block is a function too: in Python you can see the blocks handed to the game to call."
try: { playground: arcade, starter: "functions.ts#game" }
tasks:
  - check:
      type: question
      q: "Ava made the spawnEnemy function and an empty timer (below). She runs the game and no bugs ever appear. Why?"
      options: ["The timer is too slow", "Nothing calls spawnEnemy: making a function does not run it", "Functions only work in on start", "speed has no value, so the bugs are invisible"]
      answer: 1
      fault: logic
      misconception: arcade-define-not-call
      explain: "Making a function only names the job. Its blocks run when a call block runs them. Ava's timer is empty, so the job is never done. A call spawnEnemy block inside the timer makes a bug every second."
  - check:
      type: number
      q: "The game runs for 10 seconds. The timer calls spawnEnemy(40) every 1000 ms. How many times do the blocks inside spawnEnemy run?"
      answer: 10
      tolerance: 1
      explain: "Once per call, and the timer calls it once a second: about 10 times in 10 seconds, so about 10 bugs."
  - check:
      type: match
      q: "This is the game in Python (press Python at the top of the editor). Match each Python line with what it does."
      pairs:
        - ["def spawn_enemy(speed):", "makes the function, with a parameter called speed"]
        - ["bug.vx = speed", "uses whatever number the call handed in"]
        - ["def on_update_interval():", "makes a function from the blocks inside on game update every"]
        - ["game.on_update_interval(1000, on_update_interval)", "hands that function to the game to call every second"]
        - ["spawn_enemy(40)", "calls spawn_enemy, with speed 40"]
```

The game: a bug flies in from the left every second. Dodge them.

### Ava's bugs

Ava's program:

```makecode
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
}
game.onUpdateInterval(1000, function () {

})
```

### How many bugs?

Count the calls.

### The same game in Python

MakeCode can show every program in Python. Here is part of this one:

```python
def spawn_enemy(speed):
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = speed

def on_update_interval():
    spawn_enemy(40)
game.on_update_interval(1000, on_update_interval)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)
```

Look at what Python did with **on game update every** and **on overlap**: each one is a `def`, a function, and the line after it **hands** that function to the game. The game calls it for you: every second, or every time two sprites touch. Every event block you have used is a function.

## Modify

```step
stage: modify
insight: "One function can be called with a different value each time, and changing the function once changes every call."
try: { playground: arcade, starter: "functions.ts#game" }
tasks:
  - hint: ["pick random is in Math.", "Drag pick random into the call's number slot: spawnEnemy(pick random 20 to 100)."]
    check: { type: code, text: "Each bug gets a random speed: the timer calls spawnEnemy with a random number.", rules: { inside: { "game.onUpdateInterval(": ["spawnEnemy(randint("] } } }
  - hint: ["Put the block inside the function, not inside the timer.", "change score by 1 (Info) goes at the end of spawnEnemy."]
    check: { type: code, text: "Score a point for every bug the game makes, by adding one block inside spawnEnemy.", rules: { inside: { "function spawnEnemy (": ["info.changeScoreBy("] } } }
```

### Random speeds

Make every bug fly at a **random** speed between 20 and 100. Change the **call**, not the function.

### A point per bug

Score a point for **every bug** that is made: a survival score. Change the **function**, so every call scores, wherever it is called from.

## Make

```step
stage: make
try: { playground: arcade, starter: "functions.ts#make" }
hint:
  - "Make a Function called makeCoin. Inside: set coin to sprite of kind Food, then set its position to random x and y."
  - "Call makeCoin three times in on start."
  - "In the overlap, after destroy and change score, call makeCoin once more."
check: { type: code, text: "A makeCoin function, called three times at the start and again each time a coin is collected.", rules: { defs: 1, calls: 4 } }
```

Make a **coin collector** that never runs out of coins:

- a function **makeCoin** makes one coin (kind **Food**) at a random place,
- **on start** calls it three times, so there are three coins,
- every time a coin is collected, the overlap calls it again, so there are always three.

## Change an aquarium

```step
stage: modify
try: { playground: arcade, starter: "functions.ts#aquarium" }
```

This aquarium uses one function, **addFish(speed)**, to add every fish. **A** (space on the keyboard) adds a fish at a random speed. Start the tank with five fish instead of three, then add a second parameter so each call also chooses how high the fish swims.
