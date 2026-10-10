---
order: 4
unit: collide-score
title: Score, lives and timers
summary: Give the player lives, send enemies on a timer, and let the engine end the game.
language: makecode
explainPicture: lives.ts#dodge
hook: "Three hearts in the corner, a clock ticking down, enemies that keep on coming: that is what turns moving sprites into a game you can win or lose."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lives.ts#dodge", lesson: "code/arcade/arcade-score-lives", target: "arcade" }
  caption: "Info blocks and timers do a lot of work"
  say: "The info blocks and timers do a lot of the work for you."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "set life shows hearts. At 0 the game ends by itself."
        say: "set life shows hearts, and at zero lives the game ends by itself."
    - caption:
        text: "A timer runs its blocks again every second."
        say: "A timer runs its blocks again every second, so it can make enemies."
    - click: "Run"
    - wait: 600
    - caption:
        text: "An overlap runs every frame: destroy the enemy when it hits."
        say: "An overlap runs every frame, so destroy the enemy when it hits."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the score went up and down, but the game never ended. Arcade's **Info** blocks keep a score, **lives** and a **countdown** at the top of the screen, and they end the game by themselves.

A new kind of event, a **timer**, runs its blocks every so many **milliseconds** (1000 ms is one second). A timer can send a new enemy every second, for as long as the game lasts.

## Predict

```step
stage: predict
code: lives.ts#predict
check:
  type: predict
  q: "The player has 3 lives and cannot move. A rock comes every second. What happens?"
  options: ["The player loses all 3 lives, then the game ends by itself", "The lives go to 0, then -1, -2, and the game keeps going", "Nothing ends the game, because there is no game over block", "Only one rock is ever made"]
  actual: "Each rock that hits takes a life. After three hits the lives reach 0, and Arcade shows GAME OVER by itself: you never need a game over block for running out of lives."
```

There is no **game over** block in this program. The **on game update every 1000 ms** block is the timer.

## Run

```step
stage: run
code: lives.ts#predict
try: { playground: arcade, starter: "lives.ts#predict" }
check: { type: reflect, text: "I watched the rocks and the hearts, and compared what happened with my prediction." }
```

Watch the hearts at the top of the screen. Use the restart button under the simulator to play again.

## Investigate

```step
stage: investigate
code: lives.ts#dodge
insight: "Info keeps score and lives, and ends the game when the lives reach 0. A timer event (on game update every … ms) runs its blocks again every so many milliseconds, so it can make a new enemy each time."
try: { playground: arcade, starter: "lives.ts#dodge" }
tasks:
  - check:
      type: trace
      text: "Play this dodge game in your head. Fill in the lives after each thing happens."
      table: |
        | what happens | lives after |
        | (start) | 3 |
        | a rock hits the player | [2] |
        | a rock flies past | [2] |
        | a rock hits the player | [1] |
        | a rock hits the player | [0] |
      explain: "Only a touch runs the Player–Enemy event, so a rock that flies past changes nothing. At 0 lives the engine ends the game."
  - check:
      type: number
      q: "The timer runs every 1000 ms. How many rocks has it made after 10 seconds?"
      answer: 10
      explain: "1000 milliseconds is one second, so the timer runs once a second: 10 times in 10 seconds, one new rock each time."
  - check:
      type: question
      q: "Sam's player touches one rock and the game is over straight away, though he started with 3 lives. Why?"
      options: ["setLife(3) only gives one life", "The rock is not destroyed, so the overlap event runs again every frame while they touch", "changeLifeBy(-1) takes away all the lives", "The timer ends the game after one rock"]
      answer: 1
      fault: logic
      misconception: overlap-repeats
      explain: "An overlap event runs every frame (about 30 times a second) while the two sprites still touch. The rock is still touching after the first life is gone, so the next frame takes another. Destroy the rock (or move it away) in the event."
```

Dodge the rocks with the arrow keys. Lose on purpose once, too.

### Count the lives

Trace the lives as the game goes on.

### Count the rocks

Work out how often the timer runs.

### Sam's dodger

Sam's overlap event:

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
```

## Modify

```step
stage: modify
insight: "The number in the timer sets how often it runs: a smaller number means more often. A new kind of item needs its own overlap event."
try: { playground: arcade, starter: "lives.ts#dodge" }
tasks:
  - hint: "Change 1000 in on game update every. Half a second is 500 ms."
    check: { type: code, text: "Make a rock come every half a second.", rules: { contains: ["game.onUpdateInterval(500,"] } }
  - hint: ["Make a heart sprite of kind Food and place it in the middle.", "Add an on overlap event for Player and Food. Inside: change life by 1, then destroy otherSprite."]
    check: { type: code, text: "Add a heart the player can collect for an extra life.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeLifeBy(1)", "destroy("] } } }
```

### Faster rocks

Make a rock come every **half a second**. Is it still possible to survive?

### Extra life

Put a **heart** (kind Food) in the middle of the screen. Collecting it gives an extra life.

## Make

```step
stage: make
try: { playground: arcade, starter: "lives.ts#make" }
hint:
  - "In on start: set life to 3 and start countdown 30 (both in Info)."
  - "Timer: on game update every 1000 ms (Game). Inside, create an Enemy, set its position to x 160 and y pick random 10 to 110, and set its vx to a negative number."
  - "Overlap Player with Enemy: change life by -1, and destroy otherSprite so one touch takes only one life."
check: { type: code, text: "A 30-second dodge game: 3 lives, a countdown of 30, an enemy every second from a random height on the right, and a touch takes one life.", rules: { contains: ["info.setLife(3)", "info.startCountdown(30)"], inside: { "game.onUpdateInterval(1000": ["SpriteKind.Enemy", "randint("], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["info.changeLifeBy(-1)", "destroy("] } } }
```

Make a **30-second dodge game** (bats in a cave, asteroids, traffic):

- the player starts with **3 lives**
- a **countdown** of 30 seconds: survive it to finish
- every second, a new **enemy** flies in from the **right edge** at a **random height**
- each touch takes **one** life

## Change a rain dodger

```step
stage: modify
try: { playground: arcade, starter: "lives.ts#rain" }
```

Someone is walking home in the rain without an umbrella. Make the rain heavier (more drops, falling faster), then give the walker 5 lives and a 40-second walk home.
