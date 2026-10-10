---
order: 1
unit: many
introduces: [object]
title: Many turtles
summary: Make more turtles with Turtle(), give each one its own commands, and find out what a game with several stars costs in code.
language: python
hook: "Every game has many things moving at once: enemies, coins, bullets, clouds. Each one is an object with its own position and its own commands."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "from turtle import *\n\n", speed: 6 }
  caption: "Turtle() makes another turtle with its own name"
  say: "Turtle makes another turtle, and you give it a name."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "Turtle() makes a new turtle. The name lets you talk to it."
        say: "Turtle makes a new turtle. Its name is how you talk to it."
    - type: { into: "Python code", text: "a = Turtle()\nb = Turtle()\nb.color(\"red\")\n", append: true }
    - caption:
        text: "a.forward moves only a. b.left turns only b."
        say: "a dot forward moves only a. b dot left turns only b."
    - type: { into: "Python code", text: "a.forward(100)\nb.left(90)\nb.forward(100)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "Each turtle keeps its own position, heading and colour."
        say: "Each turtle keeps its own position, its own heading and its own colour."
    - wait: 1500
---
So far one turtle did everything. `Turtle()` makes **another** turtle. Each one is an **object**: a thing with its own position, heading and colour, that you give commands to by name.

## Predict

```step
stage: predict
code: stars.py#predict
check:
  type: predict
  q: "How many turtles are on the screen when it finishes?"
  kind: number
  actual: "2: a and b. Every command has a name in front of it, so the turtle you used in the turtle course (the default turtle) is never used, and Python does not draw it."
```

`a = Turtle()` makes a turtle and names it `a`. `a.forward(100)` gives the command to `a` only. Read the program: how many turtles will you see?

## Run

```step
stage: run
code: stars.py#game
try: { starter: "stars.py#game", height: 520 }
check: { type: reflect, text: "I caught some stars, and I can point to the lines that make and move one star." }
unlocks: [new-turtle]
```

A game: catch the falling stars. Press **Run**, click the picture, then use the **left and right arrow keys**. You are the turtle at the bottom: commands with no name in front (`goto`, `xcor()`) move you. Each star is its own turtle, `s1`, `s2` and `s3`, and the score is written by a fourth, hidden turtle called `pen`.

## Investigate

```step
stage: investigate
code: stars.py#game
insight: "Each object is driven by name; with separate variables, every new star costs the same block of lines again."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["s1 = Turtle()", "makes a new turtle and names it s1"]
        - ["s1.forward(4)", "moves s1 only"]
        - ["goto(xcor() - 25, ycor())", "moves you, the turtle at the bottom"]
        - ["pen.write(...)", "writes the score with the hidden pen turtle"]
  - check:
      type: number
      q: "Count the lines that mention s1 (making it, moving it, catching it, sending it back to the top). How many are there?"
      answer: 11
      explain: "Six lines make s1, then five more in tick move it, catch it and send it back. Every star costs those 11 lines again, so twenty stars would need about 220."
  - check:
      type: bug
      code: stars.py#bug
      text: "This should draw a red line to the right and a blue line straight up. The blue line goes right instead, and a third turtle appears. Click the line that causes it."
      answer: 8
      fault: logic
      misconception: dot-missing
      explain: "left(90) has no name in front, so it turns the default turtle (which then appears) instead of b. It should be b.left(90)."
```

### Match the lines

Who does each line talk to?

### Count the cost

How much code does one star cost?

### Spot the bug

A command that went to the wrong turtle.

## Modify

```step
stage: modify
insight: "Changing one star means changing its own lines; adding a star means copying the whole block."
try: { starter: "stars.py#game", height: 520 }
tasks:
  - hint: "s2's colour is set with s2.color(...). Its speed is the number in s2.forward(...) in tick."
    check: { type: code, text: "Make the middle star (s2) blue and faster.", rules: { contains: ["s2.color(\"blue\")"] } }
  - hint:
      - "Copy the six lines that make s3 and change every s3 to s4."
      - "Then copy s3's five lines in tick for s4."
    check: { type: code, text: "Add a fourth star, s4.", rules: { contains: ["s4 = Turtle()", "s4.forward(", "s4.distance("] } }
```

### A blue star

Make `s2` **blue** and faster than the others.

### A fourth star

Add a fourth star, `s4`. Count how many lines it took.

## Make a rock

```step
stage: make
insight: "A different kind of object is still a turtle with a name: it gets its own block of lines, and its own rule when caught."
try: { starter: "stars.py#game", height: 520 }
check: { type: code, text: "Add a falling grey square called rock that costs 3 points when it touches you.", rules: { contains: ["rock = Turtle()", "rock.shape(\"square\")", "rock.forward(", "score -= 3"] } }
```

Add a **rock**: a grey square (`rock.shape("square")`) that falls like a star but **costs 3 points** if it touches you. It needs its own lines to make it, move it, and check whether it touched you.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A game needs 50 falling stars. What is the trouble with s1, s2, s3 … s50?"
  options: ["Nothing: just keep copying", "About 550 near-identical lines, and a change to how stars move must be made 50 times", "Python only allows 10 turtles", "The stars would all be the same colour"]
  answer: 1
  explain: "Separate variables cost the same block of lines for every star. Next lesson keeps the stars in a list, so a loop does the work for all of them."
```

Separate names work for three stars and break down for fifty. The rest of this course tidies the game step by step: a list of stars, then one dictionary per star, then a `Star` class of your own.
