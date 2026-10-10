---
order: 4
unit: classes
introduces: [class, attribute]
title: A Star class
summary: Make a new kind of object with class, set up each one in __init__, and store its values with self.
language: python
hook: "Game engines are full of classes: one Enemy class, a hundred enemies made from it, each with its own position and health."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A class is a pattern for making objects"
  say: "A class is a pattern for making objects of your own kind."
  pacing: { keyDelayMs: 18 }
  clip:
    - caption:
        text: "__init__ runs each time a Pet is made. self is the new pet."
        say: "init runs each time a pet is made, and self is the new pet."
    - type: { into: "Python code", text: "class Pet:\n    def __init__(self, name, legs):\n        self.name = name\n        self.legs = legs\n\n" }
    - caption:
        text: "Pet(\"Rex\", 4) makes a pet and stores its own name and legs."
        say: "Pet Rex, four, makes a pet, and stores its own name and legs."
    - type: { into: "Python code", text: "a = Pet(\"Rex\", 4)\nb = Pet(\"Tweety\", 2)\nprint(a.name, b.legs)\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "Rex 2" }
    - caption:
        text: "Two pets, one pattern: each keeps its own values."
        say: "Two pets from one pattern. Each keeps its own values."
    - wait: 1500
---
A dictionary needed `star["speed"]`. A **class** lets you make your own kind of object: `class Star` describes what every star stores, and `Star(100)` makes one. Its values read like a turtle's: `star.speed`.

## Predict

```step
stage: predict
code: stars.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["Rex 2", "Rex 4", "Tweety 2", "name legs"]
  actual: "Rex 2. Pet(\"Rex\", 4) runs __init__ with name \"Rex\" and legs 4, and stores them in that pet. a.name is \"Rex\"; b is the other pet, so b.legs is 2."
```

`class Pet:` describes a new kind of object. `__init__` (two underscores each side) runs every time one is made, and `self.name = name` stores the name **in that pet**. What does it print?

## Run

```step
stage: run
code: stars.py#game
try: { starter: "stars.py#game", height: 520 }
check: { type: reflect, text: "I can point to where a star is set up, and where the game reads one star's speed." }
unlocks: [class]
```

The same game, now with a `Star` class. `Star(-150 + i * 100)` makes a star at that x position, and `__init__` sets up its turtle, speed and points. In `tick`, compare `star.speed` with last lesson's `star["speed"]`.

## Investigate

```step
stage: investigate
code: stars.py#game
insight: "A class is the pattern, each object made from it keeps its own values in self, and __init__ sets them up once."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["class Star:", "describes a new kind of object"]
        - ["def __init__(self, x):", "runs each time a star is made"]
        - ["self.speed = random.randint(3, 7)", "stores a speed in this star"]
        - ["Star(-150 + i * 100)", "makes a star, with x = -150 + i * 100"]
  - check:
      type: question
      q: "Inside __init__, what is self?"
      options: ["The star being made right now", "Every star at once", "The class itself", "The player"]
      answer: 0
      explain: "Each time Star(...) runs, self is the new star, so self.speed = ... stores a speed in that star only. Four stars, four speeds."
  - check:
      type: bug
      code: stars.py#bug
      text: "This stops with AttributeError: 'Star' object has no attribute 'speed'. Click the line that causes it."
      answer: 3
      fault: runtime
      misconception: self-missing
      explain: "speed = speed only changes a variable inside __init__, which is thrown away when it ends. self.speed = speed stores it in the star."
```

### Match the lines

What each part of the class does.

### What is self?

The word every line inside the class uses.

### Spot the bug

A value that was never stored in the star.

## Modify

```step
stage: modify
insight: "Values a star needs come in as parameters of __init__ and are stored on self; the loop that makes stars passes them in."
try: { starter: "stars.py#game", height: 520 }
tasks:
  - hint:
      - "Add a colour parameter after x: def __init__(self, x, colour):"
      - "Use it with self.turtle.color(colour), and pass a colour where the stars are made: Star(-150 + i * 100, \"orange\")."
    check: { type: code, text: "Give __init__ a colour parameter and use it.", rules: { contains: ["def __init__(self, x, colour):", "self.turtle.color(colour)"] } }
  - hint: "self.points = 1 gives every star 1 point. Use random.randint(1, 3)."
    check: { type: code, text: "Give each star a random 1 to 3 points.", rules: { contains: ["self.points = random.randint(1, 3)"] } }
```

### A colour for each star

Give `__init__` a **colour** parameter, and pass a colour in where the stars are made.

### Different points

Give each star a random **1 to 3** points.

## Make a Rock class

```step
stage: make
insight: "A second class is a second pattern: the same shape of code, a different kind of thing."
try: { starter: "stars.py#game", height: 520 }
check: { type: code, text: "Add a Rock class and a list of rocks that cost 3 points when they touch you.", rules: { contains: ["class Rock:", "Rock(", "score -= 3"] } }
```

Add a **Rock** class: a grey square that falls, with its own speed. Make a list of two rocks, move them in `tick` like the stars, and take **3 points** off when one touches you.

## Where this leads

```step
stage: info
check:
  type: question
  q: "In MakeCode Arcade or microStudio, each sprite has an x, a y and a speed. In Python words, what is each sprite?"
  options: ["An object, made from a class, with its own values", "A list", "A loop", "A dictionary key"]
  answer: 0
  explain: "Every game engine works like this: a pattern (a class) and many objects made from it, each keeping its own values."
```

The stars and rocks still need the game to move them and check them one line at a time. Next lesson gives the class its own **methods**, so a star can move itself: `star.move()`.
