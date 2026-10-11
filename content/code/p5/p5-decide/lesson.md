---
order: 3
unit: canvas
introduces: [if, else, compare, and-or]
assumes: [draw-loop, variable, variable-update]
title: Deciding what to do
summary: "Use if and else to bounce a circle off the edges, change its colour, and follow the mouse."
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
  caption: "An if lets the sketch decide, and turns the circle round at an edge"
  clip:
    - caption: "A variable for the place, and one for the speed. A negative speed goes left."
    - type: {into: "JavaScript code", text: "let x = 20;\nlet speed = 3;\n\nfunction setup() {\n  createCanvas(300, 200);\n}\n\n", append: true}
    - caption: "if checks a condition. When x passes 280, the speed turns round."
    - type: {into: "JavaScript code", text: "function draw() {\n  background(230);\n  circle(x, 100, 40);\n  x = x + speed;\n  if (x > 280 || x < 20) {\n    speed = -speed;\n  }\n}\n", append: true}
    - click: "Run \u25b6"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 1100
    - caption:
        text: "The circle bounces: || means either side can turn it round."
        say: "The circle bounces. The two bars mean or: either edge can turn it round."
hook: "Games are full of questions asked 60 times a second: has the ball hit the wall? Is the mouse on the button?"
---
An **`if`** runs some code only when a question is true:

```js
if (x > 300) {
  speed = -speed;
}
```

The question goes in `( )`, and the code that runs goes in `{ }`. `else` is the code for when the answer is no. The questions compare things: `>` bigger than, `<` smaller than, `===` equal to. Two more join questions: `||` means **or** and `&&` means **and**.

**The hard part:** one `=` **sets** a variable (`x = 300` makes `x` 300). Three `===` **asks** whether two things are equal. Mixing them up is the most common slip in this lesson.

p5 also keeps the mouse for you: `mouseX` and `mouseY` are always where the pointer is on the canvas.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "What does the circle do when it reaches the right edge, x > 300?"
  options: ["It turns round and moves left, and keeps going left past the other edge", "It bounces back and forth between the edges for ever", "It stops at the edge", "It slides off the canvas, as before"]
  actual: "It turns round and moves left, and keeps going. speed becomes -3, so x goes down, but nothing checks the left edge, so it slides off the left side. That needs a second check."
```

Only the right edge is checked. What happens at the left edge?

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I can see the circle bounce at both edges, and change colour as it turns." }
```

This one checks both edges with `||`, and uses `if` and `else` to change the colour. Change `speed = 3` to a different number and run it again.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "An if asks a question every frame; speed = -speed flips the direction, and one = sets while === compares."
tasks:
  - check:
      type: match
      q: "Match each piece of code with what it means."
      pairs:
        - ["x > 300 || x < 0", "x is past the right edge or past the left edge"]
        - ["speed = -speed;", "turn round: the opposite direction"]
        - ["if (speed > 0) { ... } else { ... }", "one colour when moving right, another when not"]
        - ["x = x + speed;", "move by the speed, which can be negative"]
  - check:
      type: question
      q: "Why does the circle turn round when speed = -speed runs?"
      options: ["3 becomes -3, so x goes down instead of up", "The circle is deleted and made again", "p5 flips the canvas", "speed becomes zero"]
      answer: 0
      explain: "A negative speed is added to x, so x gets smaller and the circle moves left. Running speed = -speed again makes it positive and it moves right."
  - check:
      type: bug
      code: sketch.js#bug
      text: "The circle jumps to x = 300 and acts strangely at the edge. Click the line that is wrong."
      answer: 12
      fault: logic
      misconception: assign-in-if
      explain: "if (x = 300) sets x to 300, rather than asking whether it is. To ask, use three equals: x === 300. Comparing with > is often better for movement, because a step can jump over an exact number."
```

### What does it mean?

Match code with meaning.

### Turning round

How does a negative speed work?

### Spot the bug

An if that does something strange.

## Modify

```step
stage: modify
insight: "A condition can be about the mouse as well as the circle; two variables of speed let a shape bounce in both directions."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "Replace the colour question with one about the mouse: is mouseX bigger than 150?"
      - "if (mouseX > 150) { fill(255, 120, 160); } else { fill(120, 220, 255); }"
    check: { type: code, text: "Colour the circle by where the mouse is: one colour on the left half, another on the right.", rules: { uses: ["mouseX"], contains: ["if ("] } }
  - hint:
      - "Move up and down needs its own variables, like x and speed."
      - "Make y and dy, add dy to y each frame, and turn dy round at the top and the bottom."
    check: { type: reflect, text: "My circle bounces off all four edges." }
```

### Mouse colour

Colour the circle by where the **mouse** is: one colour on the left half of the canvas, another on the right.

### All four edges

Make the circle **move up and down** as well, and bounce off the top and the bottom.

## Make: bounce and catch

```step
stage: make
insight: "Goals only: a ball bounces off three walls, and a paddle that follows the mouse sends it back."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "My ball bounces off the walls, and my paddle follows the mouse and sends the ball back." }
```

Make a mini bouncing game. The sketch gives you a ball that moves. Add: bounces off the **left, right and top** walls; a **paddle** along the bottom that follows `mouseX`; and the ball bouncing off the paddle. When the ball falls past the bottom, put it back at the top.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A game has 20 balls. How would you write the bounce for each, without 20 copies of the same code?"
  options: ["A list of balls and a loop that checks each one", "Copy the code 20 times", "Use a bigger canvas", "Only bounce one ball"]
  answer: 0
  explain: "Copying code 20 times is slow and every fix has to be made 20 times. A list holds all the balls and a loop does the same thing for each of them: the next lesson."
```

Decisions are what turn drawing into a game. Next: lists and loops, so one piece of code can handle a whole row of things.
