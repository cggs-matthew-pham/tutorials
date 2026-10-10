---
order: 5
unit: classes
introduces: [method]
title: Stars that move themselves
summary: Give the Star class methods (move, restart, touches), so the game loop is short and a new kind of falling thing is one class.
language: python
hook: "In a game engine you never move every enemy by hand: you tell each enemy to update itself, and it knows how."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A method is a function that belongs to an object"
  say: "A method is a function that belongs to an object."
  pacing: { keyDelayMs: 18 }
  clip:
    - caption:
        text: "add is a method: a def inside the class, with self first."
        say: "add is a method: a def inside the class, with self first."
    - type: { into: "Python code", text: "class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def add(self, n):\n        self.count = self.count + n\n\n" }
    - caption:
        text: "c.add(2) runs add with self as c."
        say: "c dot add two runs add, with self being c."
    - type: { into: "Python code", text: "c = Counter()\nc.add(2)\nc.add(5)\nprint(c.count)\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "7" }
    - caption:
        text: "The object does the work; the code that uses it stays short."
        say: "The object does the work, so the code that uses it stays short."
    - wait: 1500
---
The game still moved and checked each star itself. A **method** is a function inside a class: `star.move()` asks a star to move itself. The game loop shrinks to a few lines, and the star's rules live with the star.

## Predict

```step
stage: predict
code: stars.py#predict
check:
  type: predict
  q: "What number does it print?"
  kind: number
  actual: "7. c starts at 0; c.add(2) makes it 2 and c.add(5) makes it 7. Each call runs add with self as c."
```

`def add(self, n):` inside the class is a **method**. `c.add(2)` runs it for `c`: `self` is `c` and `n` is 2. What does it print?

## Run

```step
stage: run
code: stars.py#game
try: { starter: "stars.py#game", height: 520 }
check: { type: reflect, text: "I can explain what star.move() does, and where its code is." }
unlocks: [method]
```

The same game, now with methods: `move`, `restart` and `touches`. Read `tick` first: it only asks each star to move, and asks whether it touches you.

## Investigate

```step
stage: investigate
code: stars.py#game
insight: "Methods put each object's rules inside its class, so the code that uses objects is short and the same for every star."
tasks:
  - check:
      type: match
      q: "Match each call with what it does."
      pairs:
        - ["star.move()", "moves this star down, and sends it back to the top if it falls off"]
        - ["star.restart()", "puts this star back at the top"]
        - ["star.touches(xcor(), ycor())", "gives True if this star is close to you"]
        - ["Star(-150 + i * 100)", "makes a new star"]
  - check:
      type: question
      q: "You want stars to fall faster as the game goes on. Where would that change go?"
      options: ["Inside the Star class (in move, or a new method)", "In every place a star is used", "In a new list of speeds", "In go_left"]
      answer: 0
      explain: "How a star behaves belongs to the Star class. Change it there once and every star follows."
  - check:
      type: bug
      code: stars.py#bug
      text: "This stops with TypeError: faster() takes 0 positional arguments but 1 was given. Click the line that causes it."
      answer: 5
      fault: runtime
      misconception: method-self
      explain: "Python passes the star itself as the first argument of every method, so the method needs self: def faster(self):."
```

### Match the calls

What each method call does.

### Where does it belong?

A change to how every star behaves.

### Spot the bug

A method that forgot something.

## Modify

```step
stage: modify
insight: "New behaviour is a new method in the class and one call where it is needed."
try: { starter: "stars.py#game", height: 520 }
tasks:
  - hint:
      - "Add def flash(self): inside the class, with self.turtle.color(\"orange\") in it."
      - "Call star.flash() in tick, where a star is caught."
    check: { type: code, text: "Add a flash method that turns a star orange, and call it when the star is caught.", rules: { contains: ["def flash(self):", "star.flash()"] } }
  - hint:
      - "A method can change the star's own values: self.points += 1 and self.speed += 1."
      - "Call it when a star is caught."
    check: { type: code, text: "Add a level_up method that makes a caught star worth more and faster.", rules: { contains: ["def level_up(self):", "star.level_up()"] } }
```

### Flash

Add a method `flash` that turns a star **orange**, and call it when a star is caught.

### Level up

Add a method `level_up` that makes a caught star worth one more point and a little faster.

## Make rocks that move themselves

```step
stage: make
insight: "A second class with the same method names lets the game treat different things the same way."
try: { starter: "stars.py#game", height: 520 }
check: { type: code, text: "Add a Rock class with move, restart and touches methods, and two rocks that cost 3 points.", rules: { contains: ["class Rock:", "def move(self):", "Rock(", "score -= 3"] } }
```

Add a **Rock** class with the same three methods as `Star` (`move`, `restart`, `touches`). Make two rocks, and in `tick` ask each rock to move and to check whether it touches you. A rock costs **3 points**. How many lines in `tick` did the rocks need?

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your game now has stars and rocks. Adding a third kind of falling thing (a heart that gives a life) means…"
  options: ["One new class with move, restart and touches, and a list of them", "Rewriting tick from scratch", "Eleven lines per heart", "A new list for every value"]
  answer: 0
  explain: "That is why programs are built from classes: each new kind of thing is one class, and the code that uses them stays the same shape."
```

You started with 11 lines per star. Now a star is one line, `Star(x)`, and each kind of thing knows how to move itself. Game engines such as microStudio and MakeCode Arcade work this way: sprites are objects, and you write how they behave.
