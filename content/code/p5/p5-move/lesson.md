---
order: 2
unit: canvas
introduces: [draw-loop, variable, variable-update, arithmetic]
assumes: [setup]
title: Making it move
summary: "p5 calls draw() about 60 times a second. A variable that changes a little each time makes a shape move."
language: javascript
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-p5" 8130
  url: http://127.0.0.1:8130/index.html
  ready: JavaScript code
  layout: full
pacing:
  keyDelayMs: 30
explainPicture: sketch.js#run
explainClip:
  query: {code: "", zoom: 1.4}
  caption: "draw runs again and again, so changing a number moves the shape"
  clip:
    - caption: "A variable made above setup keeps its value between frames."
    - type: {into: "JavaScript code", text: "let x = 0;\n\nfunction setup() {\n  createCanvas(300, 200);\n}\n\n", append: true}
    - caption: "draw runs about 60 times a second. Each time: clear, draw, move a little."
    - type: {into: "JavaScript code", text: "function draw() {\n  background(230);\n  circle(x, 100, 40);\n  x = x + 2;\n}\n", append: true}
    - click: "Run \u25b6"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 1100
    - caption:
        text: "x grows by 2 each frame, so the circle slides right. Nothing brings it back, so it leaves."
        say: "x grows by 2 each frame, so the circle slides right and off the edge."
hook: "An animation is a picture redrawn very quickly, a tiny bit different each time. p5 does the redrawing for you."
---
Last lesson's sketch drew once. `function draw() { ... }` is different: p5 runs it **again and again, about 60 times a second**, for as long as the sketch runs. Each pass is a **frame**.

Two parts make movement:
- A **variable** keeps a number between frames: `let x = 0;` makes one called `x`. It goes at the top of the sketch, **outside** every function, so every frame can see it.
- Each frame, `draw()` changes it a little and draws with it: `x = x + 2;` means "make `x` two bigger".

`background(...)` at the start of `draw()` paints over the last frame, so only the newest picture shows.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "What does the circle do?"
  options: ["Slides to the right and off the edge of the canvas", "Stays in one place", "Jumps once to x = 2 and stops", "Nothing is drawn"]
  actual: "It slides right. draw() runs about 60 times a second and each time x goes up by 2, so the circle moves 120 pixels every second. Nothing sends it back, so it slides off the edge."
```

You never call `draw()`. Who does, and how often?

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I can see x going up in the corner, and the circle moving with it." }
```

The number in the corner is `x`. Press **Run again** to start from the beginning. Change `x + 2` to `x + 5`, then run it again.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "draw() repeats; a variable made outside it keeps its value from frame to frame, and each frame changes it a little."
tasks:
  - check:
      type: trace
      text: "x starts at 0. Fill in where the circle is drawn, and what x is after each frame."
      table: |
        | frame | circle drawn at x | x after the frame |
        | 1 | 0 | 2 |
        | 2 | [2] | [4] |
        | 3 | [4] | [6] |
        | 4 | [6] | [8] |
      explain: "Each frame draws the circle with the current x, then adds 2. So the circle is drawn at 0, 2, 4, 6, and x is already 2 bigger when the next frame starts."
  - check:
      type: question
      q: "What would happen if background(20, 30, 60) was removed from draw()?"
      options: ["Every old circle would stay, leaving a thick smear", "The circle would stop moving", "The sketch would stop with an error", "The circle would move twice as fast"]
      answer: 0
      explain: "Without background, nothing paints over the previous frame, so each frame's circle is added to the picture. That is how trails are made on purpose."
  - check:
      type: bug
      code: sketch.js#bug
      text: "The circle never moves, however long you wait. Click the line that is wrong."
      answer: 6
      fault: logic
      misconception: let-in-draw
      explain: "let x = 0 inside draw() makes a new x, set to 0, every frame. The change of 2 is thrown away each time. Make x once, above the functions."
```

### Frame by frame

Follow x for four frames.

### The smear

Why is there a background in draw?

### Spot the bug

A circle that stays still.

## Modify

```step
stage: modify
insight: "A second variable gives a second thing its own movement; changing a number changes the speed or direction."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "Use a different variable for the other direction. y counts down."
      - "Make let y = 0; at the top, draw circle(150, y, 40), and add 2 to y each frame."
    check: { type: reflect, text: "My circle falls down the canvas instead of across." }
  - hint:
      - "A second shape needs its own variable, made at the top and changed in draw()."
      - "Give it a different step, for example y = y + 4, so it moves faster, and a different place to start."
    check: { type: reflect, text: "I have two circles moving at different speeds." }
```

### Down, not across

Make the circle fall **down** the canvas instead of sliding across.

### Two circles

Add a **second circle** that moves at a different speed.

## Make: two things that move

```step
stage: make
insight: "Goals only: a value changed in draw and used for a shape makes anything move."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "I made two things move in different ways, and I can say which variable moves which." }
```

Make at least **two things move in different ways**: one faster than the other, one going the other direction, one growing. The sketch gives you `t`, a number that goes up by 1 every frame. `circle(t, ...)` slides, `circle(300 - t, ...)` slides the other way, and `circle(150, 100, t)` grows. A `%` operator is the remainder: `t % 300` goes from 0 up to 299, then starts again.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A circle slides off the right edge and is never seen again. What does the sketch need to do?"
  options: ["Notice when x is too big and put it back: a decision", "Make the canvas bigger", "Use a smaller circle", "Nothing: p5 brings it back"]
  answer: 0
  explain: "The sketch has to decide something each frame: is x past the edge? That is an if, and it is the next lesson."
```

You have a loop that runs 60 times a second and numbers that change. Next: make the sketch **decide**, so a circle can bounce.
