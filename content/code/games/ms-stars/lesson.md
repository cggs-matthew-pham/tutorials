---
order: 3
unit: game
title: Stars as objects
summary: "Bring the Star class from Objects with turtles into a game engine: each star moves itself in update() and draws itself in draw(). Change colours and numbers, then add a class of your own."
language: python
hook: "Your falling-stars game from the turtle course, rebuilt in a game engine: same class, same methods, smoother and faster."
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-microstudio" 8132
  url: http://127.0.0.1:8132/edit.html
  ready: Python game code
  layout: full
pacing:
  keyDelayMs: 12
explainClip:
  query: {code: "@game.py#clip", zoom: 1.15}
  caption: "Each star moves itself and draws itself"
  clip:
    - caption: "Each Star keeps its own x, y and speed in self."
    - wait: 600
    - caption:
        text: "move() changes this star's y. draw() paints it where it is now."
        say: "move changes this star's y, and draw paints it where it is now."
    - type: {into: "Python game code", after: "random.randint(5, 15) / 10", text: "\n\n    def move(self):\n        self.y -= self.speed\n        if self.y < -100:\n            self.y = 100\n            self.x = random.randint(-90, 90)\n\n    def draw(self):\n        screen.fillRound(self.x, self.y, 8, 8, \"rgb(255,210,0)\")"}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - caption:
        text: "update() asks every star to move; draw() asks every star to draw itself."
        say: "update asks every star to move, and draw asks every star to draw itself."
    - wait: 1750
---
In **Objects with turtles** each star was an object with its own turtle, speed and `move()` method. A game engine has no turtles, so a star keeps its own position in `self.x` and `self.y`, and gets a `draw()` method that paints it where it is. Everything else is what you already know.

## Predict

```step
stage: predict
code: game.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["20", "-60", "40", "100"]
  actual: "20. stars[2] is the third star, made when i was 2, so its x is -60 + 2 × 40 = 20. (In microStudio, print() writes in the console under the game.)"
```

Which `i` made `stars[2]`?

## Run

```step
stage: run
code: game.py#run
try: { playground: microstudio, starter: "game.py#run" }
check: { type: reflect, text: "I can see that each star moves itself and draws itself." }
```

Put this game in a new microStudio project (or replace your code) and run it. Each frame, `update()` tells every star to move, and `draw()` tells every star to draw itself.

## Investigate

```step
stage: investigate
code: game.py#run
insight: "An object keeps its own values in self; the game loop only calls each object's methods, so the loop stays short whatever the object does."
tasks:
  - check:
      type: question
      q: "This is the turtle version of Star. What has the microStudio version got instead of self.turtle?"
      options: ["self.x and self.y, and a draw() method that paints the star there", "Nothing: a game engine has turtles too", "A list of positions", "A global x and y shared by every star"]
      answer: 0
      explain: "A turtle remembered where it was and drew itself. With no turtle, the star keeps self.x and self.y, and draw() paints a dot at that place every frame."
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["self.y -= self.speed", "moves this star down by its own speed"]
        - ["for star in stars: star.move()", "tells every star to move"]
        - ["screen.fillRound(self.x, self.y, 8, 8, ...)", "paints this star where it is now"]
        - ["stars.append(Star(-60 + i * 40))", "makes a star and adds it to the list"]
  - check:
      type: bug
      code: game.py#bug
      text: "This stops with an error: cannot access local variable 'y'. Click the line that causes it."
      answer: 10
      fault: runtime
      misconception: self-missing
      explain: "Inside a method, y on its own is a new local variable, not the star's. self.y -= self.speed changes this star's y."
```

### Turtle to engine

The turtle version, from Objects with turtles:

```python
class Star:
    def __init__(self, x):
        self.turtle = Turtle()
        self.turtle.goto(x, 200)
        self.speed = random.randint(3, 7)

    def move(self):
        self.turtle.forward(self.speed)
```

### Match the lines

Who does what.

### Spot the bug

A star that cannot move.

## Modify

```step
stage: modify
code: game.py#run
insight: "A value set in __init__ gives each object its own copy; one number in init decides how many there are."
try: { playground: microstudio, starter: "game.py#sol-colour" }
tasks:
  - hint:
      - "Store a colour in __init__: self.colour = random.choice([...]) with two or three colours."
      - "In draw(), use self.colour instead of \"rgb(255,210,0)\"."
    check: { type: reflect, text: "Each of my stars has its own colour." }
  - hint:
      - "range(4) makes 4 stars. Change it to range(8)."
      - "Space them out: -84 + i * 24 fits 8 stars across."
    check: { type: reflect, text: "My game has 8 stars, spread across the screen." }
```

### A colour each

Give each star its **own colour**, picked at random when it is made. The game on this page does.

### More stars

Make **8 stars**, spread across the screen.

## Make: another class

```step
stage: make
code: game.py#make
insight: "Goals only: a new class with its own __init__, move and draw, kept in its own list."
try: { playground: microstudio, starter: "game.py#sol-make" }
check: { type: reflect, text: "I added my own class, and its objects move and draw themselves." }
```

Add a class of your own, with its own `__init__`, `move()` and `draw()`: clouds that drift sideways, snowflakes that wobble, a moon that grows. Keep its objects in their own list, and move and draw them in `update()` and `draw()`. The game on this page adds slow clouds behind the stars.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A game has 3 kinds of thing, each with move() and draw(). What does update() need?"
  options: ["A loop for each list that calls move()", "The code for every kind of movement written out", "Only one global variable", "Nothing: objects update by themselves"]
  answer: 0
  explain: "Each object knows how to move; update() only asks each one to. New kinds of thing add a class and a short loop, not more code in update()."
```

Real game engines are built this way: every enemy, bullet and cloud is an object with its own update and draw. Next: a paddle that catches the stars, with a score.
