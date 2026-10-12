---
order: 20
unit: challenge
introduces: [bool-value, random]
recipes: [import-module, dotted-call]
assumes: [list-index, length, callback, global, remainder]
title: Catch the turtle
summary: Build a game that uses everything so far. The turtle hops along a path; catch it before it hides.
language: python
modules: [ui]
hook: "Every game is a few rules, some data and a loop. You already know all three."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@catch.py#solution", view: "output", autorun: 1, use: "ui" }
  caption: "A game is a few rules, some data and a loop"
  say: "A game is a few rules, some data, and a loop."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 800
    - caption:
        text: "Start sets the loop going: a timer makes the turtle hop."
        say: "Press Start, and the loop begins. A timer makes the turtle hop."
    - click: { selector: "#canvas", at: [0, -160] }
    - wait: 1500
    - caption:
        text: "Data: the score, the turtle's spot, and showing (True or False)."
        say: "The data is the score, the turtle's spot, and whether it is showing."
    - wait: 1200
    - caption:
        text: "Rules: each click and each hide checks showing first."
        say: "The rules say what each click means. Each one checks showing first."
    - wait: 1200
    - caption:
        text: "The path is two lists, so you can predict the next spot."
        say: "The path is two lists of numbers, so good players predict the next spot."
    - wait: 1500
    - expect: { selector: "#status", contains: "Running" }
---
The turtle hops around a path. You will turn it into a game: catch the turtle before it hides, score as many as you can in 30 seconds. You will build it in three milestones, with less help each time.

**Behind the code:** the turtle is both the target and the pen. `penup()` stops it drawing lines, and `speed(0)` makes every move instant.

## Predict

```step
stage: predict
code: catch.py#hop
check:
  type: predict
  q: "The turtle starts at place 0. Where is it after its fourth hop?"
  options: ["Top left (-120, 60)", "Top middle (0, 110)", "Top right (120, 60)", "Bottom right (120, -50)"]
  actual: "Bottom right (120, -50): the fourth hop uses place 3, the fourth number in each list."
```

`hop()` moves the turtle to the next spot in the two lists, then asks the timer to run `hop` again in 1000 milliseconds.

## Run

```step
stage: run
code: catch.py#hop
try: { starter: "catch.py#hop", height: 440 }
check: { type: reflect, text: "I watched the turtle follow the path, and I could say where it would go next." }
```

Run it and watch a full lap. Press **Stop** when you are done.

## Investigate

```step
stage: investigate
code: catch.py#hop
insight: "The path is data (two lists) and place is where we are in it; % wraps place back to the start so the loop never runs off the end."
tasks:
  - check:
      type: trace
      text: "Fill in place after each hop. The lists have 6 spots."
      table: |
        | hop | place used | place after |
        | 1 | 0 | 1 |
        | 2 | 1 | [2] |
        | 6 | 5 | [0] |
        | 7 | [0] | 1 |
      explain: "(5 + 1) % 6 is 0, so after the sixth hop place goes back to the start of the lists."
  - check:
      type: question
      q: "You want the turtle to visit a seventh spot. What do you change?"
      options: ["Add a number to xs only", "Add one number to xs and one to ys", "Change % len(xs) to % 7", "Add another hop() call"]
      answer: 1
      explain: "Each spot is one x and one y at the same place in the two lists. len(xs) already counts the new spot."
  - check:
      type: bug
      code: catch.py#bug-global
      text: "Every click should add a point, but the first click stops with an error. Click the line where it goes wrong."
      answer: 7
      fault: runtime
      misconception: global-missing
      explain: "Without global score, the line score = score + 1 makes a new score inside add_point and tries to read it before it has a value (UnboundLocalError). Add global score as the first line of the function so it changes the score made outside. Your game needs the same line in every function that changes score."
```

### Trace the path

Follow `place` through a lap.

### Change the path

How would you add a spot?

### Spot the bug

The score from Events, with one line missing.

## Milestone 1: catch it

```step
stage: modify
insight: "Catching is the hit test from Build a button, with the box around a moving point instead of a fixed button."
try: { starter: "catch.py#catch", height: 480 }
hint:
  - "Use the same check as Build a button: if inside(x, y, tx - 20, ty - 20, 40, 40):"
  - "Inside the if: score = score + 1, then show_score()."
check:
  type: code
  text: "Click the turtle to score."
  rules: { contains: ["inside(x, y, tx - 20, ty - 20, 40, 40)", "score = score + 1"] }
```

The turtle now remembers where it is in `tx` and `ty`. Fill in `clicked` so that a click on the turtle adds a point. Run it and try to catch the turtle.

## Milestone 2: now you see it

```step
stage: modify
insight: "A boolean variable (True or False) remembers what is happening now, so each event can check it."
try: { starter: "catch.py#blink", height: 480 }
hint:
  - "In hop: showturtle(), then showing = True, then ontimer(hide, 700)."
  - "In hide: if showing: then misses = misses + 1, showing = False and hideturtle()."
  - "In clicked: add showing to the if (if showing and inside(...)), and inside it set showing = False and hideturtle()."
check:
  type: code
  text: "The turtle blinks: it shows, then hides, and a missed turtle counts."
  rules: { contains: ["showturtle()", "ontimer(hide, 700)", "misses = misses + 1", "showing and inside("] }
```

Too easy? Now the turtle only shows for 0.7 seconds. `showing` is `True` while it is there and `False` when it is gone. Follow the three comments that start with **Milestone 2**.

## Milestone 3: game on

```step
stage: make
insight: "Written without a full starter, this shows whether a student can combine state, events and timers into a working program."
try: { starter: "catch.py#game", height: 520 }
hint:
  - "Start with time_left = 30 and playing = False. Every function that changes them needs them in its global line. Show the time like the score, at goto(150, 160)."
  - "In clicked: if playing == False and inside(x, y, -60, -180, 120, 40): start(). Draw the Start button only when playing == False."
  - "tick(): if playing: take 1 from time_left; if it reaches 0 set playing = False, else ontimer(tick, 1000)."
check:
  type: code
  text: "A Start button, a 30-second timer, and the game stops at 0."
  rules: { contains: ["draw_button(", "time_left = time_left - 1", "playing = True", "ontimer(tick, 1000)"] }
```

Make it a real game: a **Start** button, a 30 second timer, and a score that resets each game. The comment at the top lists the five parts. If you get stuck, the hints show one part at a time.

## Path or random?

```step
stage: modify
code: catch.py#random
check:
  type: question
  q: "Why can a good player beat the turtle on a path, but not at random?"
  options: ["The path is slower", "On a path you can predict the next spot and move there first", "Random spots are smaller", "The timer is shorter at random"]
  answer: 1
  explain: "A path is a pattern, and patterns can be predicted. Random spots can only be reacted to."
```

Play a few games. Do you start moving to the next spot before the turtle arrives? Then try random spots instead. `random` is a module someone else wrote, just like your `ui.py`. `random.randint(-150, 150)` picks a whole number from -150 up to 150, a new one each time it runs, so the turtle lands somewhere new on every hop. The first number is the lowest it can pick and the second is the highest. Swap the first two lines of `hop()` for the two lines above. Copy `import random` to the top and `random.` before `randint` as they are for now; a later lesson explains how they work. Then change the numbers so the turtle only appears in the top half of the screen.
