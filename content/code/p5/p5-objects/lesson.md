---
order: 5
unit: build
introduces: [object, property, for-of]
assumes: [array, push, random, for-count]
title: Objects and stars
summary: "Keep everything about one star (its place and its speed) together in an object, and move a whole list of them."
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
  caption: "An object keeps one star's values together"
  clip:
    - caption: "An object holds named values: where the star is and how fast it falls."
    - type: {into: "JavaScript code", text: "let star = { x: 150, y: 0, speed: 2 };\n\nfunction setup() {\n  createCanvas(300, 200);\n}\n\n", append: true}
    - caption: "star.y is this star's y. Changing it moves this star, and the if sends it back to the top."
    - type: {into: "JavaScript code", text: "function draw() {\n  background(230);\n  circle(star.x, star.y, 20);\n  star.y = star.y + star.speed;\n  if (star.y > 210) {\n    star.y = -10;\n  }\n}\n", append: true}
    - click: "Run \u25b6"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 2200
    - caption: "A list of these objects, and a loop, gives you a whole sky of stars."
hook: "A falling star has a place, a speed and a size. An object keeps them together, so a hundred stars are a hundred objects, not three hundred loose numbers."
---
An **object** holds named values together: `{ x: 20, y: 30, speed: 2 }`. Each name is a **property**, read with a dot: `star.y` is that star's y. You change one the same way: `star.y = star.y + star.speed;`.

A list of objects is a list of things, each with its own values: `stars`. The loop to visit each one is the easiest kind:

```js
for (let star of stars) {
  // star is each object in turn
}
```

Read it as "for each star in stars". It does not need a counter at all.

**The hard part** is the dot. Inside the loop, `speed` on its own means nothing: it is `star.speed` that is this star's speed. The error message "speed is not defined" is the clue.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "What does console.log(star.y) show?"
  options: ["32", "30", "2", "star.y"]
  actual: "32. star.y starts at 30, then star.y = star.y + star.speed adds 2, so it is 32 when it is printed. console.log writes to the Output box under the sketch."
```

Work out `star.y` line by line.

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I can see each star falling at its own speed and starting again at the top." }
```

Each star is an object with its own `x`, `y` and `speed`. `draw()` visits every star in the list, draws it, moves it, and sends it back to the top if it has fallen off the bottom. Press **Run again** and watch how the speeds differ.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "An object keeps one thing's values together; a for-of loop visits each object, and star.speed is that star's own value."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["stars.push({ x: 25, y: 10, speed: 2 });", "adds a new star object to the list"]
        - ["for (let star of stars) {", "does the code in the braces for each star in turn"]
        - ["star.y = star.y + star.speed;", "moves this star down by its own speed"]
        - ["circle(star.x, star.y, 12);", "draws this star where it is now"]
  - check:
      type: question
      q: "Why does each star fall at its own speed?"
      options: ["Each star object has its own speed property", "p5 picks a different speed each frame", "All stars share one speed variable", "The loop slows down the later stars"]
      answer: 0
      explain: "speed is stored inside each object. star.speed in the loop reads the speed of whichever star the loop is on, so six stars means six speeds."
  - check:
      type: bug
      code: sketch.js#bug
      text: "This stops with an error: speed is not defined. Click the line that causes it."
      answer: 15
      fault: runtime
      misconception: property-prefix
      explain: "There is no variable called speed. The speed belongs to the star, so it is star.speed."
```

### What does each line do?

Match code with meaning.

### Their own speeds

Where each speed lives.

### Spot the bug

A name that p5 does not know.

## Modify

```step
stage: modify
insight: "A new property gives each object another value of its own; the loop can use it with the dot."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "Two numbers in setup() decide how many stars there are and where they start."
      - "Change 6 to 12 in the loop, and change the 50 so they spread across the 300 pixels."
    check: { type: reflect, text: "My sketch has 12 stars, spread across the canvas." }
  - hint:
      - "A property is added where the star is made, and read where it is drawn."
      - "Add size: random(6, 18) to the object in push, and use star.size in circle."
    check: { type: code, text: "Give each star its own size.", rules: { contains: ["size:", "star.size"] } }
```

### Twelve stars

Make **12 stars**, spread across the canvas.

### Their own size

Give each star its **own size**.

## Make: another list

```step
stage: make
insight: "Goals only: a second list of objects with its own properties, moved and drawn in its own loop."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "I added my own list of objects (clouds, snowflakes, bubbles...) that move and are drawn by their own loop." }
```

Add a second kind of thing with its own list and its own loop: clouds that drift sideways, snowflakes that wobble, bubbles that rise. Make each object with the properties it needs, push them in `setup()`, and move and draw them with a `for (let ... of ...)` loop in `draw()`. Draw the clouds **before** the stars so the stars are on top.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You want to write the code that restarts a star at the top in one place and use it for stars, clouds and bubbles. What do you need?"
  options: ["A function that takes the thing to restart", "Copies of the same lines for each kind of thing", "A longer loop", "A different canvas"]
  answer: 0
  explain: "A function is code you name once and use many times. Next lesson: make your own functions and give them parameters."
```

You can now hold many things, each with its own values. Next: **functions**, so a piece of code has a name and you can use it again.
