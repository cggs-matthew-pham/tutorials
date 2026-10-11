---
order: 14
unit: transform
node: AC9M7SP03 n3
title: Rotations
summary: "A rotation turns a shape about a centre by an angle in a direction. About the origin, a quarter turn anticlockwise changes (x, y) to (−y, x) and a half turn changes it to (−x, −y)."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The hands of a clock, a Ferris wheel, a spinning fan. Each turns about a centre by a certain angle, in a certain direction."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8299
  url: http://127.0.0.1:8299/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: turn.yml#explain-pic, caption: "A quarter turn anticlockwise about the origin: $(2, 1)$ becomes $(-1, 2)$." }
explainClip:
  query: { code: "@turn.yml#explain", fresh: 1, id: explain }
  caption: "Turning about the origin"
  say: "Turn the triangle a quarter at a time."
  clip:
    - caption: { text: "A triangle, with the origin as the centre.", say: "A triangle, turning about the origin." }
    - wait: 800
    - caption: { text: "A quarter turn anticlockwise.", say: "A quarter turn anticlockwise." }
    - click: Make the turn bigger
    - expect: { selector: "#gsum", contains: "Rotate 90°" }
    - wait: 1200
    - caption: { text: "A half turn: both signs change.", say: "A half turn. Both signs change." }
    - click: Make the turn bigger
    - expect: { selector: "#gsum", contains: "Rotate 180°" }
    - wait: 1500
---
A **rotation** turns a shape about a fixed point, the **centre of rotation**. To describe one, give the **centre**, the **angle** and the **direction** (clockwise or anticlockwise). The shape keeps its size and shape.

About the origin, an anticlockwise turn of 90° changes $(x, y)$ to $(-y, x)$; 180° (a half turn) changes it to $(-x, -y)$; 270° changes it to $(y, -x)$.

## Predict: a quarter turn

```step
stage: predict
insight: "Committing to the image of a point after a quarter turn shows whether they swap coordinates or picture the turn."
check:
  type: predict
  q: "Point A is at (2, 1). The triangle turns 90° anticlockwise about the origin. Where does A land?"
  options: ["(−1, 2)", "(1, 2)", "(−2, −1)", "(1, −2)"]
  actual: "(−1, 2). A is right of the centre, so it turns up and to the left. Its distance from the origin stays the same."
```

Picture a clock hand pointing right, turning up.

## Run: turn the triangle

```step
stage: run
insight: "Turning the triangle in quarter steps and reading the corners shows how each coordinate changes for 90°, 180° and 270°."
try: { playground: board, starter: "turn.yml#run", height: 600 }
check: { type: board, text: "Turn the triangle 90° anticlockwise. Was your prediction right?", when: "t = 90 and x(A) = -1 and y(A) = 2", explain: "A (2, 1) becomes A′ (−1, 2): the new x is the old y with its sign changed, and the new y is the old x." }
```

The black dot is the centre of rotation. The sliders turn the shape anticlockwise.

## Investigate: how to turn a point

```step
stage: investigate
insight: "A quarter turn swaps and changes one sign, depending on the direction (Lee only swaps); a rotation needs a centre, an angle and a direction."
tasks:
  - check:
      type: question
      q: "B is at (4, 1). It turns 180° about the origin. Where does B′ land?"
      options: ["(−4, −1)", "(4, −1)", "(−4, 1)", "(1, 4)"]
      answer: 0
      feedback: [null, "That is a reflection in the x-axis.", "That is a reflection in the y-axis.", "That swaps the coordinates."]
      explain: "A half turn changes both signs: (−4, −1)."
  - check:
      type: bug
      code: "working.txt#lee"
      text: "Lee turns P (3, 1) by 90° anticlockwise about the origin. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: rotate-swap-only
      explain: "Line 3: a quarter turn also changes a sign. P turns up and to the left, so the image is (−1, 3), not (1, 3)."
  - check:
      type: question
      q: "What three things do you need to describe a rotation?"
      options: ["The centre, the angle and the direction", "The angle only", "The axis and the angle", "The centre and the size of the shape"]
      answer: 0
      feedback: [null, "Turning 90° about different centres gives different images.", "Axes belong to reflections.", "The size does not change in a rotation."]
      explain: "The same angle about a different centre, or in the other direction, gives a different image."
```

### A half turn

Both signs change.

### Find the mistake

Read Lee's working. Which way does P turn?

### What describes a rotation

## Modify: change the turn and the centre

```step
stage: modify
insight: "Choosing an angle to reach a target, then moving the centre, shows the image depends on the centre; clockwise and anticlockwise turns are linked."
try: { playground: board, starter: "turn.yml#free", height: 600 }
tasks:
  - starter: "turn.yml#free"
    hint: ["A is at (2, 1).", "Three quarter turns anticlockwise is 270°."]
    check: { type: board, text: "Turn the triangle so that A′ lands at (1, −2).", when: "t = 270 and x(A) = 1 and y(A) = -2", explain: "A turn of 270° anticlockwise changes (2, 1) to (1, −2)." }
  - starter: "turn.yml#centre"
    hint: ["The centre is now (1, 0), not the origin.", "A is one right and one up from the centre. A quarter turn takes it to one left and one up."]
    check: { type: board, text: "The centre of rotation is (1, 0). Turn the triangle 90° anticlockwise. Where does A land?", when: "t = 90 and x(A) = 0 and y(A) = 1", explain: "A is (1, 1) from the centre; after a quarter turn it is (−1, 1) from the centre, which is (0, 1)." }
  - check:
      type: question
      q: "A turn of 90° clockwise ends in the same place as a turn of how many degrees anticlockwise?"
      options: ["270°", "90°", "180°", "360°"]
      answer: 0
      feedback: [null, "Those are opposite directions.", "That is a half turn.", "That is back where it started."]
      explain: "A quarter turn clockwise is three quarter turns anticlockwise: 270°."
  - check:
      type: question
      q: "What does a rotation of 360° do?"
      options: ["Nothing: the shape ends up where it started", "Flips the shape", "Moves the shape one unit", "Doubles its size"]
      answer: 0
      feedback: [null, "A flip is a reflection.", "A rotation about a centre does not slide.", "A rotation never changes the size."]
      explain: "A full turn brings every point back to where it started."
```

### Three quarter turns

### A different centre

### Clockwise

### A full turn

## Practise: rotations

```step
stage: practise
insight: "Half turns, finding the turn between two points and a reflection review, mixed; swapping without a sign is the planted slip; the review keeps mirrors fresh."
try: { playground: board, starter: "turn.yml#run", height: 600 }
tasks:
  - check:
      type: answer
      q: "B is at (4, 1). After a 180° turn about the origin, what is the x-coordinate of B′?"
      answer: "-4"
      feedback:
        - ["4", "A half turn changes the sign of both coordinates."]
      explain: "x changes sign: −4. The image is (−4, −1)."
  - check:
      type: question
      q: "Which turn about the origin takes (2, 1) to (−1, 2)?"
      options: ["90° anticlockwise", "90° clockwise", "180°", "270° anticlockwise"]
      answer: 0
      feedback: [null, "That would take (2, 1) to (1, −2).", "That would take it to (−2, −1).", "That would take it to (1, −2)."]
      explain: "(2, 1) to (−1, 2) is the rule (x, y) → (−y, x): a quarter turn anticlockwise."
  - check:
      type: answer
      q: "The point (3, 1) turns 90° anticlockwise about the origin. What is the y-coordinate of the image?"
      answer: "3"
      feedback:
        - ["1", "The new y is the old x."]
      explain: "(x, y) → (−y, x), so (3, 1) becomes (−1, 3)."
  - check:
      type: answer
      q: "Review: the point (3, 5) is reflected in the x-axis. What is the y-coordinate of the image?"
      answer: "-5"
      feedback:
        - ["5", "In the x-axis, y changes sign."]
      explain: "(3, 5) becomes (3, −5)."
```

### A half turn

### Which turn

### A quarter turn

### Review: reflections

## Make: turn to a target

```step
stage: make
insight: "Finding the turn that puts a chosen corner on a target applies the rule and then states the full description: centre, angle and direction."
try: { playground: board, starter: "turn.yml#free", height: 600 }
hint: ["Corner B is at (4, 1).", "Try each turn and read B′."]
check: { type: board, text: "Turn the triangle so that B′ is at (1, −4).", when: "x(B) = 1 and y(B) = -4", explain: "A turn of 270° anticlockwise about the origin changes (4, 1) to (1, −4)." }
```

Then describe the rotation fully: the centre, the angle and the direction. How else could you say it, turning clockwise?
