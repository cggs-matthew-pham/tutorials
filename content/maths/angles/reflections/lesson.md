---
order: 13
unit: transform
node: AC9M7SP03 n2
title: Reflections
summary: "A reflection flips a shape over a mirror line. In the x-axis, (x, y) becomes (x, −y); in the y-axis, (x, y) becomes (−x, y). Each point lands as far on the other side as it started."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A face in a mirror, a butterfly's wings, a lake showing a mountain. The mirror line sits exactly halfway between each point and its reflection."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8298
  url: http://127.0.0.1:8298/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: mirror.yml#explain-pic, caption: "The triangle reflected in the y-axis: $(2, 1)$ becomes $(-2, 1)$. The y-axis is halfway between each point and its image." }
explainClip:
  query: { code: "@mirror.yml#explain", fresh: 1, id: explain }
  caption: "Two mirrors"
  say: "Which coordinate changes sign?"
  clip:
    - caption: { text: "A triangle. Reflect it in the x-axis.", say: "Reflect the triangle in the x-axis." }
    - click: Reflect in the x-axis
    - expect: { selector: "#gsum", contains: "Reflect in the x-axis" }
    - wait: 1200
    - caption: { text: "In the x-axis, y changes sign.", say: "In the x-axis, y changes sign." }
    - click: Reflect in the y-axis
    - caption: { text: "In the y-axis, x changes sign.", say: "In the y-axis, x changes sign." }
    - expect: { selector: "#gsum", contains: "Reflect in the y-axis" }
    - wait: 1500
---
A **reflection** flips a shape over a mirror line. Each point and its image are the same distance from the mirror, on opposite sides, and the mirror cuts the line joining them at right angles.

- Reflect in the **x-axis**: the point moves up or down, so $y$ changes sign: $(x, y) \to (x, -y)$.
- Reflect in the **y-axis**: the point moves left or right, so $x$ changes sign: $(x, y) \to (-x, y)$.

## Predict: flip over the x-axis

```step
stage: predict
insight: "Committing to the image of a point in the x-axis shows whether they change the coordinate that matches the mirror's direction or the one the point crosses."
check:
  type: predict
  q: "Point A is at (2, 1). It is reflected in the x-axis. Where does A′ land?"
  options: ["(2, −1)", "(−2, 1)", "(−2, −1)", "(1, 2)"]
  actual: "(2, −1). The point flips over the x-axis, to the same distance below it, so only y changes sign."
```

Picture the point flipping straight down over the x-axis.

## Run: two mirrors

```step
stage: run
insight: "Trying both axes on the same triangle shows which coordinate changes sign for each mirror."
try: { playground: board, starter: "mirror.yml#run", height: 600 }
check: { type: board, text: "Reflect the triangle in the x-axis. Was your prediction right?", when: "m = 1 and x(A) = 2 and y(A) = -1", explain: "In the x-axis, y changes sign: A (2, 1) becomes A′ (2, −1)." }
```

Press the buttons to choose a mirror, and read the list of corners.

## Investigate: which coordinate changes

```step
stage: investigate
insight: "The axis you reflect in decides which coordinate changes sign; the point crosses the mirror (Mia changes the coordinate along it); a point on the mirror stays put."
tasks:
  - check:
      type: question
      q: "B is at (4, 1). It is reflected in the y-axis. Where does B′ land?"
      options: ["(−4, 1)", "(4, −1)", "(−4, −1)", "(1, 4)"]
      answer: 0
      feedback: [null, "That is a reflection in the x-axis.", "That changes both signs.", "That swaps x and y."]
      explain: "In the y-axis, x changes sign: (−4, 1)."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia reflects P (4, 3) in the x-axis. Click the line where her reasoning goes wrong."
      answer: 2
      fault: logic
      misconception: reflect-axis-swap
      explain: "Line 2: reflecting in the x-axis moves the point up or down across it, so y changes sign. The image is (4, −3)."
  - check:
      type: question
      q: "A point is on the mirror line, for example (0, 3) reflected in the y-axis. Where is its image?"
      options: ["In the same place: (0, 3)", "At (0, −3)", "At (3, 0)", "At (−3, 0)"]
      answer: 0
      feedback: [null, "That is a reflection in the x-axis.", "That swaps x and y.", "No coordinate swap is involved."]
      explain: "It is zero distance from the mirror, so it does not move: −0 is still 0."
```

### Which axis

Which direction does the point move?

### Find the mistake

Read Mia's working. Which way does the point cross the x-axis?

### On the mirror

## Modify: choose the mirror

```step
stage: modify
insight: "Choosing a mirror to reach a target and comparing the two together shows the rule for each axis; two reflections together make a half turn."
try: { playground: board, starter: "mirror.yml#free", height: 600 }
tasks:
  - starter: "mirror.yml#free"
    hint: ["The triangle is on the left of the y-axis.", "A has x = −4. Flip it across the y-axis."]
    check: { type: board, text: "Reflect the triangle so that A′ lands at (4, 1).", when: "m = 2 and x(A) = 4 and y(A) = 1", explain: "In the y-axis, x changes sign: (−4, 1) becomes (4, 1)." }
  - starter: "mirror.yml#free"
    check: { type: board, text: "Reflect the triangle so that C′ lands at (−2, −4).", when: "m = 1 and x(C) = -2 and y(C) = -4", explain: "C is at (−2, 4). In the x-axis, y changes sign: (−2, −4)." }
  - check:
      type: question
      q: "A point is 3 units above the x-axis. After a reflection in the x-axis, where is the image?"
      options: ["3 units below the x-axis", "3 units above the x-axis", "6 units below the x-axis", "On the x-axis"]
      answer: 0
      feedback: [null, "It crosses to the other side.", "The distance is the same as the original.", "Only a point on the axis stays on it."]
      explain: "The image is the same distance from the mirror on the other side."
  - check:
      type: question
      q: "A point (3, 2) is reflected in the x-axis, and then the image is reflected in the y-axis. Where does it end?"
      options: ["(−3, −2)", "(3, −2)", "(−3, 2)", "(2, 3)"]
      answer: 0
      feedback: [null, "That is the first reflection only.", "That is the second reflection only.", "The coordinates do not swap."]
      explain: "(3, 2) goes to (3, −2), and then to (−3, −2): both signs changed."
```

### Reach (4, 1)

### Reach (−2, −4)

### Distance

### Both mirrors

## Practise: reflections

```step
stage: practise
insight: "Rules for both axes and a translation review, mixed; changing both signs is the planted slip; the review keeps left and down fresh."
try: { playground: board, starter: "mirror.yml#run", height: 600 }
tasks:
  - check:
      type: answer
      q: "The point (−4, 6) is reflected in the y-axis. What is the x-coordinate of the image?"
      answer: "4"
      feedback:
        - ["-4", "In the y-axis, x changes sign."]
      explain: "x changes sign: −4 becomes 4, so the image is (4, 6)."
  - check:
      type: answer
      q: "The point (−4, 6) is reflected in the x-axis. What is the y-coordinate of the image?"
      answer: "-6"
      feedback:
        - ["6", "In the x-axis, y changes sign."]
      explain: "y changes sign: 6 becomes −6, so the image is (−4, −6)."
  - check:
      type: question
      q: "Which rule describes a reflection in the y-axis?"
      options: ["(x, y) → (−x, y)", "(x, y) → (x, −y)", "(x, y) → (−x, −y)", "(x, y) → (y, x)"]
      answer: 0
      feedback: [null, "That is the x-axis.", "That changes both coordinates.", "That swaps them."]
      explain: "The y-axis is the vertical mirror: x changes sign and y stays."
  - check:
      type: answer
      q: "Review: the point (2, 3) is translated 4 left and 1 up. What is the x-coordinate of the image?"
      answer: "-2"
      feedback:
        - ["6", "Left takes away from x: 2 − 4."]
      explain: "2 − 4 = −2, so the image is (−2, 4)."
```

### y-axis

### x-axis

### The rule

### Review: translations

## Make: an arrow's mirror image

```step
stage: make
insight: "Choosing the mirror that puts the point of an arrow in a named place combines the rule and a check on each corner."
try: { playground: board, starter: "mirror.yml#make", height: 600 }
hint: ["The point of the arrow is at (4, 2).", "To get x = −4, change the sign of x."]
check: { type: board, text: "Reflect the arrow so that its point (corner C) lands at (−4, 2).", when: "m = 2 and x(C) = -4 and y(C) = 2", explain: "In the y-axis, x changes sign: (4, 2) becomes (−4, 2)." }
```

Then write the rule for each mirror in your own words, and say which coordinate stays the same.
