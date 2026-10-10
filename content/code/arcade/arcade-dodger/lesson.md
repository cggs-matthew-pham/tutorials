---
order: 11
unit: challenge
title: Space dodger
summary: Build a complete game that uses everything so far. Steer a ship through rocks, keep your lives, and beat your high score.
language: makecode
explainPicture: dodger.ts#predict
hook: "Asteroids, Flappy Bird and every endless runner are the same game underneath: things come at you, you dodge, and the longer you last the better you score."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@dodger.ts#predict", lesson: "code/arcade/arcade-dodger", target: "arcade" }
  caption: "The game is four building blocks working together"
  say: "The game is four building blocks working together."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A timer makes a rock every second at a random height."
        say: "A timer makes a rock every second, at a random height."
    - caption:
        text: "Velocity carries it left; auto destroy removes it."
        say: "Velocity carries each rock left, and auto destroy removes it off screen."
    - click: "Run"
    - wait: 600
    - caption:
        text: "An overlap takes a life. A second timer adds to the score."
        say: "An overlap takes a life, and a second timer adds to the score."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Your ship sits on the left and moves up and down. Rocks fly in from the right. Touch one and you lose a life; survive and your score climbs. You will build it in three milestones, with less help each time.

You already know every idea it needs. Two blocks are new, and each comes with a **Behind the code** note when you need it.

## Predict

```step
stage: predict
code: dodger.ts#predict
check:
  type: predict
  q: "Where do the rocks fly across the screen?"
  options: ["At a different height each time", "All along the same line, through the middle", "From the left to the right", "They do not move"]
  actual: "All along the same line. Every rock starts at (160, 60), so they all come through the middle, where the ship starts."
```

The ship can only move up and down: `moveSprite(ship, 0, 100)` gives it no speed across.

## Run

```step
stage: run
code: dodger.ts#predict
try: { playground: arcade, starter: "dodger.ts#predict" }
check: { type: reflect, text: "I watched the rocks come in and dodged them with the up and down arrows." }
```

Move with the up and down arrows (or W and S). Is it hard to dodge rocks that always come the same way?

## Investigate

```step
stage: investigate
code: dodger.ts#predict
insight: "A timer makes a new sprite every second, and velocity carries it across: the engine moves every rock, and the blocks only decide where it starts and how fast it goes."
try: { playground: arcade, starter: "dodger.ts#predict" }
tasks:
  - check:
      type: match
      q: "Match each block with its job in the game."
      pairs:
        - ["on game update every 1000 ms", "makes a new rock every second"]
        - ["set rock position to (160, 60)", "starts each rock at the right edge"]
        - ["set rock vx to -50", "moves each rock left, every frame"]
        - ["move ship with buttons, vx 0, vy 100", "lets the ship move up and down only"]
      explain: "The timer makes the rocks, the position says where each starts, and velocity keeps it moving. The ship's 0 across means left and right do nothing."
  - check:
      type: number
      q: "A rock starts at x 160 and moves 50 pixels left every second. The ship is at x 20. How many seconds does the rock take to reach the ship?"
      answer: 2.8
      tolerance: 0.1
      explain: "The rock travels 160 - 20 = 140 pixels at 50 pixels a second: 140 / 50 = 2.8 seconds. A bigger speed gives the player less time."
  - check:
      type: question
      q: "Ava plays for a minute. A rock goes past the ship and off the left edge. What happens to it?"
      options: ["It is removed when it leaves the screen", "It keeps flying left forever, off the screen, and the game keeps track of it", "It comes back on the right", "It turns around"]
      answer: 1
      explain: "Nothing destroys it, so it keeps moving off the screen. After a few minutes there are hundreds of rocks nobody can see. Milestone 1 fixes this."
  - check:
      type: question
      q: "Leo adds an overlap event for Player and Enemy that takes away a life, but forgets to destroy the rock. He starts with 3 lives. A rock touches his ship. What happens?"
      options: ["He loses 1 life and the rock flies on", "He loses all 3 lives almost at once and the game ends", "Nothing: the rock must be destroyed first", "He loses 1 life and the rock disappears"]
      answer: 1
      fault: logic
      misconception: overlap-repeats
      explain: "The overlap event runs every frame while the rock still touches the ship, about 30 times a second, so 3 lives go in a tenth of a second. Destroy the rock in the event."
```

This is the working start of the game. Read it, and change numbers in the playground to test your answers.

### Who does what

Match each block with its job.

The timer in Python:

```python
def on_update_interval():
    global rock
    rock = sprites.create(img("""..."""), SpriteKind.enemy)
    rock.set_position(160, 60)
    rock.vx = -50
game.on_update_interval(1000, on_update_interval)
```

The timer is a function handed to the game, as in the Functions lesson. Blocks write this for you.

### How long to react?

Work it out from the numbers.

### Where do the rocks go?

Watch a rock that misses the ship.

### Leo's game

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
```

## Milestone 1: rocks from anywhere

```step
stage: modify
insight: "One random number turns a predictable pattern into a game, and auto destroy lets the engine clean up what the player can no longer see."
try: { playground: arcade, starter: "dodger.ts#predict" }
hint:
  - "In the timer, replace the 60 in set rock position with pick random 10 to 110 (from Math)."
  - "Drag set rock auto destroy (Sprites, set flag) into the timer, under set rock vx."
check: { type: code, text: "Each rock starts at a random height and is removed once it leaves the screen.", rules: { contains: ["randint(", "setFlag(SpriteFlag.AutoDestroy,true)"] } }
```

**Behind the code:** **set rock auto destroy on** (Sprites, the **set flag** block) tells the engine to remove the sprite as soon as it leaves the screen. Without it, every rock that missed the ship keeps flying forever.

1. Start each rock at a **random height**, from 10 to 110.
2. Set each rock to **auto destroy**.

## Milestone 2: lives and a hit

```step
stage: modify
insight: "A hit is an overlap event between two kinds; destroying the rock is what makes it count once."
try: { playground: arcade, starter: "dodger.ts#m2" }
hint:
  - "Set life to 3 in on start. Then drag in on sprite of kind Player overlaps otherSprite of kind Enemy."
  - "Inside the overlap: destroy otherSprite, then change life by -1."
check: { type: code, text: "Start with 3 lives; a rock that hits the ship is destroyed and takes one life.", rules: { contains: ["info.setLife(3)"], inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["destroy(", "info.changeLifeBy(-1)"] } } }
```

Give the player **3 lives**, and make a hit count:

- When the ship touches a rock, **destroy the rock** and **lose a life**.
- At zero lives, the game ends by itself.

## Milestone 3: score and high score

```step
stage: make
insight: "A score for time survived is a second timer, and the high score is a value the engine keeps between games, so a player can see they improved."
try: { playground: arcade, starter: "dodger.ts#m3" }
hint:
  - "Add a second on game update every 1000 ms. Inside it: change score by 1."
  - "high score is in Info. Try: if score > high score, set the background to a new colour, so the player sees they are beating their best."
check: { type: code, text: "Score one point for every second survived, and use the high score in your game.", rules: { inside: { "game.onUpdateInterval(1000": ["info.changeScoreBy(1)"] }, contains: ["info.highScore()"] } }
```

**Behind the code:** **high score** (in **Info**) is the best score so far in this browser. The game over screen shows it by itself; you can also use it in your blocks.

Finish the game:

- The score goes up by **1 every second** the player survives.
- Use **high score** to show the player when they are beating their best (a new background colour, a splash, or your own idea).
- Play three games. Does the game over screen show your best?

## Change a road crossing

```step
stage: modify
code: dodger.ts#crossing
try: { playground: arcade, starter: "dodger.ts#crossing" }
```

The same game turned on its side: cars drive across, and the chick scores by reaching the top. Make it yours. Ideas: faster cars as the score goes up, cars from both sides, a second lane of logs, or a short effect when a car hits (Sprites › Effects).
