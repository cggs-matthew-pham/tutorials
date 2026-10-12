---
order: 10
unit: challenge
reviews: [value-update, if-else, react-to-event]
assumes: [callback, global, variable-update, if, list]
title: Power-ups
summary: Add lives, a status bar, a gold turtle and an upgrade you buy with points.
language: python
modules: [ui]
hook: "Games and apps are built from the same parts: buttons that change state, and rules about what each change means."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@powerups.py#solution", view: "output", autorun: 1, use: "ui" }
  caption: "Games are built from an interface and rules"
  say: "Games are built from two kinds of parts: an interface, and rules."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 800
    - caption:
        text: "The interface: the status bar and the buttons you see."
        say: "The interface is what you see: the status bar and buttons."
    - caption:
        text: "label(x, y, name, value) draws one part. Three calls: Score, Lives, Time."
        say: "One label function draws each part. Three calls, no copies."
    - caption:
        text: "The rules: a miss loses a life, gold is worth 5, an upgrade costs 5."
        say: "Rules decide what events mean: a miss costs a life."
    - caption:
        text: "A fair power-up: strong enough to want, costly enough to think about."
        say: "A fair power-up is worth wanting, and costly enough to think about."
    - wait: 1200
    - expect: { selector: "#status", contains: "Running" }
---
Your game works. Now make it richer: lives instead of misses, a proper status bar, a gold turtle worth more, and an upgrade that costs points. Each one is a small change to the program you already have.

## Predict

```step
stage: predict
code: powerups.py#lives
check:
  type: predict
  q: "You start a game and miss three turtles in a row. What happens?"
  options: ["Nothing: misses are not counted", "Lives goes 3, 2, 1, 0 and the game stops with the Start button back", "The game ends after the first miss", "Lives goes below 0 and the game carries on"]
  actual: "Each miss takes a life. At 0, playing becomes False, so hop stops and the Start button is drawn again."
```

This is your game with **lives** in place of misses. Read `hide()`: what changes when the turtle escapes?

## Run

```step
stage: run
code: powerups.py#lives
try: { starter: "powerups.py#lives", height: 480 }
check: { type: reflect, text: "I played until I ran out of lives, and I can point to the line that ends the game." }
```

Press Start and miss on purpose. Then play properly and see how long you last.

## Investigate

```step
stage: investigate
code: powerups.py#lives
insight: "The same program has two kinds of parts: the user interface (show the state, let the player act) and the rules (what each event means). Naming them is the first step to both app and game design."
check:
  type: match
  q: "Each part of a game is user interface, a game rule, or both. Match them."
  pairs:
    - ["The status bar showing score, lives and time", "user interface: shows the state"]
    - ["The Start button", "user interface: the player acts"]
    - ["Losing a life when a turtle escapes", "game rule: what an event means"]
    - ["A gold turtle worth 5 points", "game rule: a reward"]
    - ["A button that costs 5 points to use", "both: a control that follows a rule"]
  explain: "Apps are mostly user interface around some rules; games are mostly rules with some user interface. You are building both."
```

Look at the program again: which lines draw things the player sees, and which lines decide what happens?

## Add the power-ups

```step
stage: modify
try: { starter: "powerups.py#status", height: 500 }
tasks:
  - starter: "powerups.py#status"
    hint:
      - "def label(x, y, name, value): goto(x, y), write(name), goto(x + 55, y), write(value)."
      - "In draw_scene: label(-190, 160, \"Score\", score), then Lives at -50 and Time at 90."
    check:
      type: code
      text: "A status bar drawn by one function with four parameters, used three times."
      rules: { contains: ["def label(x, y, name, value)", "\"Score\", score)", "\"Lives\", lives)", "\"Time\", time_left)"] }
  - starter: "powerups.py#gold"
    hint:
      - "In hop, after place changes: if place % 3 == 0: gold = True, else: gold = False."
      - "In draw_scene: if showing and gold: goto(tx, ty) then dot(50, \"gold\"). In clicked: if gold: score = score + 5, else: score = score + 1."
    check:
      type: code
      text: "Every third spot is gold, shown with a gold circle, and worth 5."
      rules: { contains: ["place % 3 == 0", "dot(50, \"gold\")", "score = score + 5"] }
  - starter: "powerups.py#upgrade"
    hint:
      - "Add delay = 1000 with the other variables, set it back to 1000 in start(), and use ontimer(hop, delay) and ontimer(hide, delay - 300)."
      - "In clicked: if playing and score >= 5 and inside(x, y, -60, -180, 120, 40): take 5 points, add 200 to delay, draw_scene()."
    check:
      type: code
      text: "A Slow (5) button that spends points to slow the turtle."
      rules: { contains: ["ontimer(hop, delay)", "score >= 5", "delay = delay + 200"] }
```

### Status bar

Write `label(x, y, name, value)` and use it to show **Score**, **Lives** and **Time** across the top. One function, three calls.

### Gold turtle

Every third spot, the turtle is gold: draw a gold circle under it, and make catching it worth **5**.

### Upgrade button

While playing, the button says **Slow (5)**. Clicking it spends 5 points and slows the turtle down by 200 milliseconds, but only if you can afford it.

## Make: your own power-up

```step
stage: make
try: { starter: "powerups.py#solution", height: 520 }
hint:
  - "More time: a button that costs 10 points and adds 5 to time_left."
  - "Bigger catch box: a power-up that makes the box 60 by 60 instead of 40 by 40 (remember to centre it: tx - 30)."
  - "Double points: a variable that doubles every catch until the next game."
check: { type: reflect, text: "I invented a power-up, gave it a cost, and can explain why the cost is fair." }
```

Invent a power-up of your own. Decide what it does, what it costs and when it can be used, then build it. Write one sentence (as a comment at the top) that explains why the cost is fair.
