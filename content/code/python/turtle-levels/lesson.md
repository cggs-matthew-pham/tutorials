---
order: 23
unit: challenge
optional: true
title: "Optional: Game levels"
summary: Turn the game into a real game with screens, levels and a turtle that moves.
language: python
modules: [ui]
hook: "Every game is a loop that updates its data and redraws, and a few screens it moves between."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@levels.py#solution", view: "output", autorun: 1, use: "ui" }
  caption: "A state variable remembers which screen you are on"
  say: "Real games have screens: a title, the game itself, and game over."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 800
    - caption:
        text: "state = \"title\" remembers which screen you are on."
        say: "A variable called state remembers which screen you are on."
    - caption:
        text: "Pressing Play changes state to \"play\"."
        say: "Pressing Play is an event, and it changes the state to play."
    - click: { selector: "#canvas", at: [0, -160] }
    - wait: 1500
    - caption:
        text: "Every 5 points the level goes up and the turtle hops faster."
        say: "Every five points, the level goes up and the turtle hops faster."
    - wait: 800
    - caption:
        text: "Smooth moves: one small step every 50 milliseconds."
        say: "It glides by taking one small step every 50 milliseconds."
    - wait: 1500
    - expect: { selector: "#status", contains: "Running" }
---
Your game starts as soon as you press Start and just stops at the end. Real games have **screens** (a title, the game, game over), get harder as you play, and have things that **move**. Each is a small change to the game you already built.

## Predict

```step
stage: predict
code: levels.py#states
check:
  type: predict
  q: "The 30 seconds run out. What is on the screen?"
  options: ["Nothing: the program has stopped", "Game over, your score, and an Again button", "The title screen", "The turtle keeps hopping"]
  actual: "tick sets state to \"over\", and draw_scene draws the over screen: Game over, the score and Again."
```

`state` is `"title"`, `"play"` or `"over"`. `draw_scene` draws a different screen for each one.

## Run

```step
stage: run
code: levels.py#states
try: { starter: "levels.py#states", height: 500 }
check: { type: reflect, text: "I saw all three screens and can say which line changes the state each time." }
```

Play a game to the end, then play again.

## Investigate

```step
stage: investigate
code: levels.py#states
insight: "A state variable names which screen the game is on; each event checks it and may change it, and drawing follows from it."
check:
  type: question
  q: "Why does this game use state with three values instead of playing = True or False?"
  options: ["Strings are faster than True and False", "The game has three screens, and True or False can only tell two apart", "Python needs a string to draw text", "So the timer works"]
  answer: 1
  explain: "Title, play and over are three different situations. Two values cannot tell the title screen from game over."
```

Find every line that changes `state`. Which event causes each change?

## Modify: levels and a moving turtle

```step
stage: modify
try: { starter: "levels.py#levels", height: 520 }
tasks:
  - starter: "levels.py#levels"
    hint:
      - "In clicked, after score = score + 1: if score % 5 == 0 and delay > 400: level = level + 1, delay = delay - 150."
      - "Use ontimer(hop, delay) and ontimer(hide, delay - 300), and reset level and delay in start()."
    check:
      type: code
      text: "Every 5 points the level goes up and the turtle gets faster."
      rules: { contains: ["level = level + 1", "delay = delay - 150", "ontimer(hop, delay)"] }
  - starter: "levels.py#glide"
    hint:
      - "move(): if state == \"play\" and steps > 0: tx = tx + dx, ty = ty + dy, goto(tx, ty), steps = steps - 1, ontimer(move, 50)."
      - "hop(): dx = (xs[place] - tx) / 10, the same for dy, steps = 10, then move() instead of goto."
    check:
      type: code
      text: "The turtle walks to each spot in small steps."
      rules: { contains: ["def move()", "ontimer(move, 50)", "dx = (xs[place] - tx) / 10"] }
```

### Levels

Every 5 points, go up a level and make the turtle faster. Show the level at the top.

### Moving turtle

Make the turtle walk to each spot instead of jumping, in 10 small steps. It is harder to catch, and you can see where it is heading.

## Make: your own game rule

```step
stage: make
try: { starter: "levels.py#solution", height: 520 }
hint:
  - "Boss turtle: every tenth spot needs three clicks. Count hits in a variable and only score when it reaches 3."
  - "High score: a best variable that only changes when a game ends with a higher score, shown on the over screen."
check: { type: reflect, text: "I added a game rule of my own and it works on every level." }
```

Add a rule that makes the game your own. **Where this leads:** MakeCode Arcade and microStudio give you sprites that move by themselves and screens to switch between. Under the hood they run the same loop you just built: update the data, check for hits, redraw.
