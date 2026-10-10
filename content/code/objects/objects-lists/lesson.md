---
order: 2
unit: many
introduces: [list-change]
title: Lists of stars
summary: Keep the stars in a list and their speeds and points in lists beside it, so one loop moves them all, and find out why lists side by side are fragile.
language: python
hook: "A game with a hundred enemies does not have a hundred variables. It keeps them in a list and loops over it."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "from turtle import *\n\n", speed: 8 }
  caption: "A list of turtles: one loop drives them all"
  say: "Put the turtles in a list, and one loop drives them all."
  pacing: { keyDelayMs: 16 }
  clip:
    - caption:
        text: "The loop makes four turtles and adds each to the list."
        say: "The loop makes four turtles, and append adds each one to the list."
    - type: { into: "Python code", text: "stars = []\nfor i in range(4):\n    s = Turtle()\n    s.left(90)\n    stars.append(s)\n", append: true }
    - caption:
        text: "speeds[i] is the speed of stars[i]: same place, same star."
        say: "speeds at place i belongs to the star at place i."
    - type: { into: "Python code", text: "speeds = [20, 60, 40, 80]\nfor i in range(4):\n    stars[i].forward(speeds[i])\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "More stars: change range(4). The loop does the rest."
        say: "For more stars, change range four. The loop does the rest."
    - wait: 1200
---
Last lesson every star cost 11 lines. This version keeps the stars in a **list**, and what each star needs to remember (its speed, its points) in more lists beside it. Place `i` in every list is about the same star.

## Predict

```step
stage: predict
code: stars.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["5 5", "8 1", "3 1", "5 1"]
  actual: "5 5. Place 2 is the third item in each list (places start at 0): speeds[2] is 5 and points[2] is 5. Both describe the same star."
```

`speeds` and `points` have one item per star. `speeds[2]` and `points[2]` are both about the third star. What will it print?

## Run

```step
stage: run
code: stars.py#game
try: { starter: "stars.py#game", height: 520 }
check: { type: reflect, text: "I can explain how one loop moves every star, and how it finds each star's speed." }
```

The same game, now with four stars made by a loop. Play it (click the picture, then use the arrow keys). `stars.append(s)` adds each new star to the end of the list.

## Investigate

```step
stage: investigate
code: stars.py#game
insight: "Lists plus a loop make the number of stars one number; lists side by side only work while every list is changed together."
tasks:
  - check:
      type: question
      q: "What would you change to play with eight stars?"
      options: ["range(4) to range(8)", "Copy the loop eight times", "Add eight new variables", "speeds.append(8)"]
      answer: 0
      explain: "The loop makes the stars, so one number sets how many. Every list grows with it, because the loop appends to all three."
  - check:
      type: trace
      text: "speeds is [4, 7, 3, 5] and points is [1, 1, 1, 1]. Fill in what the loop in tick uses for each star."
      table: |
        | i | which star | speeds[i] | points[i] |
        | 0 | 1st | 4 | 1 |
        | 1 | 2nd | [7] | [1] |
        | 3 | 4th | [5] | [1] |
      explain: "The same i picks the same star from every list. stars[1] is the second star, so its speed is speeds[1], which is 7."
  - check:
      type: bug
      code: stars.py#bug
      text: "Someone made a fifth star but it stops with an IndexError. Click the line where Python stops."
      answer: 11
      fault: runtime
      misconception: parallel-lists-sync
      explain: "There are five stars but only four speeds, so speeds[4] does not exist. Lists side by side must be changed together: every new star needs a speed too."
```

### Eight stars

What changes for more stars?

### Same place, same star

Follow `i` through the lists.

### Spot the bug

Lists that fell out of step.

## Modify

```step
stage: modify
insight: "A new property for every star is a new list, filled in the same loop and read with the same i."
try: { starter: "stars.py#game", height: 520 }
tasks:
  - hint: "The number of stars is set in one place: the range in the loop that makes them."
    check: { type: code, text: "Play with six stars.", rules: { contains: ["range(6)"] } }
  - hint: "points.append(1) gives every star 1 point. Use random.randint(1, 3) instead."
    check: { type: code, text: "Give each star a random 1 to 3 points.", rules: { contains: ["points.append(random.randint(1, 3))"] } }
```

### Six stars

Play with **six** stars.

### Different points

Make each star worth a random **1 to 3** points.

## Make a bad star

```step
stage: make
insight: "Adding a property means another list kept in step with the others, which is where the next lesson starts."
try: { starter: "stars.py#game", height: 520 }
check: { type: code, text: "Add a list called bad: the first star is red and costs 3 points when caught.", rules: { contains: ["bad = []", "bad.append(", "bad[i]", "score -= 3"] } }
```

Make the first star a **bad star**: add a fourth list, `bad`, with `True` for the first star and `False` for the others. Colour the bad star red. Catching it **costs 3 points**; catching any other star adds its points.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Each star now has a turtle, a speed, points and bad in four lists. What happens if one list gets a star the others do not?"
  options: ["Python fixes it", "The lists fall out of step: an IndexError, or a star using another star's values", "Nothing", "The star disappears"]
  answer: 1
  explain: "Lists side by side only work while they stay in step. Next lesson keeps everything about one star together, in one dictionary."
```

Lists made the number of stars one number. But everything about one star is now spread over four lists. Next lesson keeps it together.
