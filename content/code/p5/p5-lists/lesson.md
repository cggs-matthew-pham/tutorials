---
order: 4
unit: build
introduces: [array, array-index, length, for-count, push, random]
assumes: [compare, variable, arithmetic]
title: Lists and loops
summary: "Keep many numbers in an array, draw one thing for each with a loop, and build the array with random numbers."
language: javascript
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
  caption: "A list holds many values, and a loop draws one bar for each"
  clip:
    - caption: "An array is a list in square brackets. The first item is number 0."
    - type: {into: "JavaScript code", text: "let heights = [40, 90, 150, 70];\n\nfunction setup() {\n  createCanvas(300, 200);\n  background(230);\n", append: true}
    - caption: "A for loop counts i from 0 up to the length of the list."
    - type: {into: "JavaScript code", text: "  for (let i = 0; i < heights.length; i++) {\n    rect(30 + i * 60, 200 - heights[i], 40, heights[i]);\n  }\n}\n", append: true}
    - click: "Run \u25b6"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 2200
    - caption: "heights[i] is each value in turn, so four values draw four bars."
hook: "Ten bars, or a thousand: it is the same few lines of code if the numbers live in a list and a loop does the drawing."
---
An **array** is a list of values in order: `let heights = [50, 120, 80, 150];`. Each value has a **place number**, counting from **0**: `heights[0]` is 50 and `heights[3]` is 150. `heights.length` is how many there are (4).

A **loop** repeats code. This one counts:

```js
for (let i = 0; i < heights.length; i++) {
  // runs once for each place number i
}
```

**The hard part** is that first line. Read it as three small instructions in a row: *start with `i` at 0; keep going while `i` is less than the length; add 1 to `i` after each time round.* You will copy it a lot before it feels natural, and that is normal. Inside the braces, `i` is the place number, so `heights[i]` is each value in turn.

`heights.push(7)` adds a value to the end, and `random(20, 180)` gives a random number from 20 up to 180.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "What does the sketch draw?"
  options: ["Four bars standing on the bottom edge, the fourth the tallest", "Four bars hanging from the top edge, the first the tallest", "One bar, 150 tall", "Four bars of the same height"]
  actual: "Four bars standing on the bottom edge, the fourth tallest. Each bar's top is at y = 200 - its height, and it is that tall, so its bottom is at 200: the bottom edge of the canvas. The fourth value, 150, is the biggest."
```

`rect(x, y, width, height)` puts `(x, y)` at the bar's **top left**, and y counts down. Where is the bottom of the first bar?

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I can see ten bars, a different set each time I press Run." }
```

The loop in `setup()` builds the array: ten random heights. The loop in `draw()` draws a bar for each one. Press **Run again** a few times. Change the 10 in `i < 10` and run again.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "A loop with a counter i visits each place in an array; heights[i] is the value at place i, and a rect hangs from its top-left corner."
tasks:
  - check:
      type: trace
      text: "heights is [50, 120, 80, 150]. Fill in what the loop uses each time round."
      table: |
        | i | heights[i] | the bar's top, 200 - heights[i] |
        | 0 | 50 | 150 |
        | 1 | [120] | [80] |
        | 2 | [80] | [120] |
        | 3 | [150] | [50] |
      explain: "i counts 0, 1, 2, 3. Each time round, heights[i] is the value at that place, and the bar's top is 200 minus it: the taller the bar, the higher up its top."
  - check:
      type: question
      q: "The array has 10 values. What is the last place number?"
      options: ["9", "10", "11", "1"]
      answer: 0
      explain: "Places count from 0, so ten values are places 0 to 9. The loop stops when i is not less than 10, so it never uses place 10."
  - check:
      type: bug
      code: sketch.js#bug
      text: "The bars hang from the top of the canvas instead of standing on the bottom. Click the line that is wrong."
      answer: 14
      fault: logic
      misconception: y-from-top
      explain: "rect's y is the bar's top edge, and y counts down. y = heights[i] puts the top at that depth. For a bar standing on the bottom, the top is at 200 - heights[i]."
```

### Follow the loop

What the loop does each time round.

### The last place

Counting from 0.

### Spot the bug

Bars hanging the wrong way.

## Modify

```step
stage: modify
insight: "More data is a bigger number in the loop; deciding inside the loop makes each item different."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "Two things control how many bars there are. One of them makes the values."
      - "Change 10 to 20 in setup(), and make the bars thinner and closer together so they fit."
    expected: sketch.js#sol-more
    check: { type: reflect, text: "My chart has 20 bars, and they all fit on the canvas." }
  - hint:
      - "Inside the loop, an if can look at heights[i] before the rect is drawn."
      - "if (heights[i] > 100) { fill(255, 120, 160); } else { fill(255, 210, 0); } goes above the rect line."
    expected: sketch.js#sol-colour
    check: { type: code, text: "Colour the tall bars (over 100) differently from the short ones.", rules: { contains: ["heights[i] >"] } }
```

### Twenty bars

Draw **20 bars** instead of 10, so they all still fit on the canvas.

### Tall and short

Colour the **tall bars** (over 100) differently from the short ones.

## Make: your own chart

```step
stage: make
insight: "Goals only: a list of real or random numbers, and a loop that draws one thing for each."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: code, text: "Use a loop to draw one thing for each value in your list.", rules: { loops: 1 } }
```

Draw a **chart of your own** from a list of numbers: hours of sleep each night this week, scores, or random bubbles. Fill the array with the numbers you choose (`let values = [3, 5, 2];`) or with `push`, then use a loop to draw one thing for each value. Circles, bars, lines and coloured squares all work.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Each bar needs a height, an x, a colour and a speed. How could you keep all of that together for one bar?"
  options: ["One thing that holds them all: an object", "Four separate arrays that must always match", "Four separate sketches", "Only keep the height"]
  answer: 0
  explain: "Four arrays matched by place number break the moment one of them is changed alone. An object keeps everything about one bar together. That is the next lesson."
```

An array holds many values, and a loop does something for each. Next: an **object** holds everything about one thing, so a list of objects is a list of stars, balls or bars.
