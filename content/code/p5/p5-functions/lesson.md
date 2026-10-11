---
order: 6
unit: build
introduces: [function, param, return]
assumes: [object, property, arithmetic, compare]
title: Functions of your own
summary: "Give a piece of code a name, hand it values with parameters, and get an answer back with return."
language: javascript
hook: "One flower took ten lines. A function turns those lines into a single word, so a whole garden is three short lines."
---
A **function** is code with a name. You write it once, then **call** it as often as you like: `drawFlower(80, 100);`.

The names in the brackets of the definition are **parameters**: `function drawFlower(x, y)` says "give me an x and a y". Each call fills them in, so one function draws flowers in many places.

A function can also hand an answer back with **return**, and you will write one in the Modify step.

**The hard part** is the name. `drawFlower` and `drawflower` are different names, and JavaScript will not guess. If you see "is not defined", compare the call with the definition letter by letter.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "How many flowers does this sketch draw?"
  options: ["2", "1", "0", "10"]
  actual: "2. Defining drawFlower draws nothing by itself. setup() calls it twice, once at (80, 100) and once at (200, 60)."
```

Does the definition draw anything, or only the calls?

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I can see three flowers of different sizes, each drawn by one call." }
```

The function now has a third parameter, `size`. Each call chooses where the flower goes and how big it is.

A function can hand an answer back with **return**. Here `twice(4)` is the number 8, so it can be used anywhere a number goes:

```js
function twice(n) {
  return n * 2;
}
```

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "A definition is a recipe and a call is cooking it; parameters carry the values from the call into the function."
tasks:
  - check:
      type: match
      q: "Match each piece with what it is."
      pairs:
        - ["function drawFlower(x, y, size) {", "the definition: the recipe, with three parameters"]
        - ["drawFlower(70, 100, 20);", "a call: uses the recipe with these values"]
        - ["size", "a parameter: it is 20 in the first call and 12 in the second"]
        - ["return n * 2;", "hands an answer back to the line that called"]
  - check:
      type: question
      q: "In the call drawFlower(180, 60, 12), what is y inside the function?"
      options: ["60", "180", "12", "It has no value"]
      answer: 0
      explain: "The values go to the parameters in order: x is 180, y is 60 and size is 12."
  - check:
      type: bug
      code: sketch.js#bug
      text: "This stops with an error: drawflower is not defined. Click the line that causes it."
      answer: 12
      fault: runtime
      misconception: function-case
      explain: "The function is called drawFlower with a capital F. JavaScript treats drawflower as a different, unknown name."
```

### Which part is which?

Definition, call, parameter, return.

### Values in order

Where each number goes.

### Spot the bug

One letter of difference.

## Modify

```step
stage: modify
insight: "A loop can call a function many times; a function that returns a value can sit inside an if."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "Replace the three calls with a for loop that counts to 5."
      - "Use i in the call: drawFlower(40 + i * 55, 100, 14)."
    check: { type: code, text: "Draw five flowers with one call inside a loop.", rules: { defs: 1, loops: 1, calls: 1 } }
  - hint:
      - "A function that answers true or false is used inside an if."
      - "Write function isNear(x1, y1, x2, y2) { return dist(x1, y1, x2, y2) < 30; } and use if (isNear(mouseX, mouseY, 150, 100))."
    check: { type: code, text: "Write a function that returns whether the mouse is near the flower, and say hello when it is.", rules: { returns: 1, calls: 1 } }
```

### A garden

Use a loop to draw **five flowers** with one call.

### Say hello

Make the flower say hello when the mouse is near it, using a function of your own that **returns** true or false.

## Make: your own drawing function

```step
stage: make
insight: "Goals only: a drawing of your own as a function with parameters, used at least three times."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "I wrote a function that draws my own thing and I used it three times in different places or sizes." }
```

Write a function that draws something of your own (a tree, a house, a robot, a face) with at least a position as parameters. Then call it **three times**. The sketch on this page draws trees of different heights.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You want the game to restart a ball in one place, whichever ball it is. What do you write?"
  options: ["A function that takes the ball as a parameter", "A copy of the lines for every ball", "A global variable called ball", "A longer setup()"]
  answer: 0
  explain: "A function with a parameter works on whatever you hand it: restart(ball) for any ball in the list."
```

You can now name your own code. Next: put lists, objects, decisions and functions together in a game.
