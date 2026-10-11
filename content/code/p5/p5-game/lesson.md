---
order: 7
unit: challenge
introduces: [event, text-join]
assumes: [array, object, property, for-of, if, compare, function, param, random, variable-update]
title: "Final challenge: Catch the circle"
summary: "Click the falling circles to score. Fix a catch that works backwards, add lives and a game over, then add a power-up of your own."
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
  caption: "A click is an event, and a small distance means a catch"
  clip:
    - caption: "mousePressed is an event function: p5 runs it for each click."
    - type: {into: "JavaScript code", text: "let score = 0;\nlet ball = { x: 150, y: 100 };\n\nfunction setup() {\n  createCanvas(300, 200);\n}\n\n", append: true}
    - caption: "dist gives the distance between the click and the ball. Close means under 20."
    - type: {into: "JavaScript code", text: "function draw() {\n  background(230);\n  circle(ball.x, ball.y, 30);\n  text(\"Score: \" + score, 10, 20);\n}\n\nfunction mousePressed() {\n  if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {\n    score = score + 1;\n    ball.x = random(20, 280);\n  }\n}\n", append: true}
    - click: "Run \u25b6"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 2200
    - caption: "Click the ball: the score goes up and the ball jumps. A miss does nothing."
hook: "Everything you have learned in one game: a list of objects, a loop, a function, a decision, and a click."
---
Your game has falling circles. When you **click** one, you score and it starts again at the top. If one reaches the bottom, it starts again too.

Two new ideas:

- An **event** function runs when something happens. p5 calls `mousePressed()` each time the mouse is clicked, and `keyPressed()` each time a key is pressed. You never call them yourself.
- To show a score, **join** text and a number with `+`: `"Score: " + score`.

**The hard part** is "close". Two things touch when the distance between them is **small**: `dist(...) < 20`. It is easy to write `>` and have the game score for every click that misses.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "What does console.log(dist(10, 10, 13, 14)) show?"
  options: ["5", "7", "3", "4"]
  actual: "5. The two points are 3 apart across and 4 apart down, and the straight-line distance is 5."
```

`dist` gives the straight distance between two points.

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I clicked the circles, the score went up, and a missed circle started again at the top." }
```

Click the circles before they fall off the bottom.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "An event function runs on its own when something happens; dist(...) < 20 asks 'is the click close enough?'"
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["mousePressed()", "p5 runs it each time the mouse is clicked"]
        - ["dist(mouseX, mouseY, ball.x, ball.y) < 20", "the click is within 20 pixels of this ball"]
        - ["restart(ball);", "sends this ball back to the top at a new x"]
        - ["\"Score: \" + score", "joins the words and the number into one piece of text"]
  - check:
      type: question
      q: "Where does the score go up?"
      options: ["Inside mousePressed, in the if that checks the click is close", "Inside setup()", "Every frame in draw()", "Inside restart()"]
      answer: 0
      explain: "The score should change when a catch happens, once. mousePressed runs once per click, so the if inside it decides whether the click was a catch."
  - check:
      type: bug
      code: sketch.js#bug
      text: "In this game every click that misses scores. Click the line that is wrong."
      answer: 3
      fault: logic
      misconception: near-is-small
      explain: "The condition is true when the click is more than 20 away. A catch is when it is less than 20 away: dist(...) < 20."
```

### Which part does what?

Match code with meaning.

### When does the score go up?

One place for it.

### Spot the bug

Every miss scores.

## Modify

```step
stage: modify
insight: "A variable for lives and a decision about it add a way to lose; a key event adds a way to start again."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "Make let lives = 3; at the top. When a ball falls off the bottom, take one away."
      - "In draw(), only move and draw the balls if (lives > 0); otherwise show GAME OVER with text()."
    check: { type: code, text: "Add lives: lose one when a ball falls off the bottom, and show GAME OVER at zero.", rules: { uses: ["lives"], contains: ["lives >"] } }
  - hint:
      - "Add a keyPressed() function. p5 gives you key, the key that was pressed."
      - "if (key === \"r\" && lives === 0) { score = 0; lives = 3; }"
    check: { type: code, text: "Press R to play again after the game is over.", rules: { uses: ["keyPressed"] } }
```

### Lives

Give the player **3 lives** and a GAME OVER screen. Start from the game above.

### Play again

Press **R** after GAME OVER to start again.

## Make: a power-up

```step
stage: make
insight: "Goals only: a second kind of ball that behaves differently and is worth more, made with a property."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "My game has a power-up ball that looks different and is worth more points." }
```

Add a **power-up**: a different kind of ball (fast, small, gold) that is worth more points. Give it a property such as `gold: true`, draw it in its own colour, and score more when it is clicked. Finish by asking a friend to play it and change one thing because of what you saw.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You have 4 balls and want to add 10 more. What is the smallest change?"
  options: ["Change the number in the setup loop", "Copy the ball code 10 times", "Write a new function for each ball", "Change the canvas size"]
  answer: 0
  explain: "The balls live in a list and a loop visits each one. More balls is one number in the loop that fills the list."
```

You have built a game from lists, objects, decisions, functions and events. That is a real programme: games bigger than this are the same pieces in more places.
