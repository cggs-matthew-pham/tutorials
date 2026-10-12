---
order: 1
unit: canvas
introduces: [setup]
assumes: [rgb-colour, vector-graphics]
title: Shapes on a canvas
summary: "Draw circles, rectangles, triangles and lines on a canvas with p5.js, and find out where the corner (0, 0) is."
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
  caption: "A canvas is a grid of pixels, and shapes go where you say"
  clip:
    - caption:
        text: "createCanvas makes the drawing area: here 300 wide and 200 tall."
        say: "create Canvas makes the drawing area: here 300 wide and 200 tall."
    - type: {into: "JavaScript code", text: "function setup() {\n  createCanvas(300, 200);\n  background(230);\n", append: true}
    - caption:
        text: "(0, 0) is the top left. A bigger x goes right, and a bigger y goes down."
        say: "Zero, zero is the top left. Bigger x goes right, and bigger y goes down."
    - type: {into: "JavaScript code", text: "  circle(80, 60, 50);\n", append: true}
    - caption: "fill sets the colour of the shapes drawn after it."
    - type: {into: "JavaScript code", text: "  fill(255, 120, 160);\n  rect(150, 100, 100, 60);\n}\n", append: true}
    - click: "Run \u25b6"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 1100
    - caption: "The circle is white and the rectangle pink: the fill came between them."
hook: "Every picture on a screen is shapes at places. In p5.js you say which shape, where, and what colour."
---
**p5.js** draws on a **canvas**: a rectangle of pixels you make with `createCanvas(width, height)`. A shape is a command with numbers: `circle(150, 100, 80)` draws a circle with its middle **150 across** and **100 down**, and a width of 80.

Your code goes inside `function setup() { ... }`. It runs once, when the sketch starts. For now, copy that first line and the closing `}` as they are; the lessons after this one explain functions properly. JavaScript is fussy: every `(` needs a `)`, every `{` needs a `}`, and capital letters matter. When something is wrong, the playground shows the line and a hint.

**Where is (0, 0)?** At the **top left** corner. `x` goes across to the right, and `y` goes **down**. That is the opposite way from the turtle's drawing page, and it catches almost everyone out once.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "Where does the rectangle, rect(20, 20, 60, 40), appear?"
  options: ["Near the top-left corner", "Near the bottom-left corner", "In the middle, behind the circle", "Off the canvas"]
  actual: "Near the top-left corner. The first two numbers of rect are its top-left corner: 20 across and 20 down from (0, 0), which is the canvas's top left. The 60 and 40 are its width and height."
```

`createCanvas(300, 200)` makes a canvas 300 wide and 200 tall. Which corner is `(0, 0)`?

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I have run the sketch and found each shape in the code." }
```

Press **Run** and match each shape to its line. `fill(r, g, b)` sets the colour of the shapes drawn **after** it, with each number from 0 to 255. Change the numbers in `circle(150, 100, 80)` and run again.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "A shape's numbers are its position and size, y counts down from the top, and colours apply to the shapes drawn after them."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["createCanvas(300, 200);", "makes a canvas 300 wide and 200 tall"]
        - ["fill(255, 120, 160);", "sets the colour for the shapes drawn next"]
        - ["circle(150, 100, 80);", "draws a circle, middle 150 across and 100 down, 80 wide"]
        - ["line(0, 190, 300, 190);", "draws a line from one point to another"]
  - check:
      type: question
      q: "To move the circle UP the canvas, what do you change?"
      options: ["Make y smaller (100 becomes 40)", "Make y bigger (100 becomes 160)", "Make x smaller", "Make the width smaller"]
      answer: 0
      explain: "y counts down from the top, so a smaller y is higher up. Making x smaller moves the circle left."
  - check:
      type: bug
      code: sketch.js#bug
      text: "This should draw a gold circle, but it is white. Click the line that is in the wrong place."
      answer: 4
      fault: logic
      misconception: fill-after
      explain: "fill only colours the shapes drawn after it. The circle is drawn on line 4, before the fill on line 5, so the fill changes nothing. Put fill(...) above circle(...)."
```

### Match the lines

What each line does.

### Up the canvas

Which way is up?

### Spot the bug

A circle with the wrong colour.

## Modify

```step
stage: modify
insight: "Moving a shape is changing its numbers; a new kind of shape is a new command with its own numbers."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "The big circle's x and y are its middle. The canvas is 300 wide and 200 tall."
      - "Bigger x moves right and bigger y moves down. Try x near 250 and y near 160."
    expected: sketch.js#sol-corner
    check: { type: reflect, text: "My big circle is in the bottom-right corner." }
  - hint:
      - "p5 has more shapes than the sketch uses. An oval is called ellipse, and it takes a width and a height."
      - "Change the pink rect(20, 20, 60, 40) to ellipse(60, 40, 90, 40): an ellipse's x and y are its middle."
    expected: sketch.js#sol-oval
    check: { type: code, text: "Draw an oval with ellipse.", rules: { uses: ["ellipse"] } }
```

### Corner

Move the big circle to the **bottom-right** corner of the canvas.

### An oval

Add an **oval** (ellipse) to the picture.

## Make: a picture of your own

```step
stage: make
insight: "Goals only: shapes at places, with colours, built up in order."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "I drew a picture of my own with at least 5 shapes and 3 colours." }
```

Draw a picture of your own: a house, a face, a robot, a flag, a rocket. Use at least **5 shapes** and **3 colours**. Shapes are drawn in order, so draw the sky first and the sun after it. Other commands to try: `noStroke()` (no outlines), `stroke(r, g, b)` and `strokeWeight(4)` (outline colour and thickness), `triangle(x1, y1, x2, y2, x3, y3)`.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A sketch draws a red circle and then a blue circle in the same place. Which one do you see?"
  options: ["The blue one: later shapes are drawn on top", "The red one: it was first", "A purple mix of both", "Neither: p5 draws only one shape"]
  answer: 0
  explain: "p5 draws in order, like painting: later shapes cover earlier ones. That is why the sky comes before the sun."
```

Everything you draw is numbers: where, how big and what colour. Next lesson: change those numbers while the sketch runs, so things move.
