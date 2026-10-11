---
order: 10
unit: pythagoras
node: AC9M8M06 n2
uses: [AC9M7N01 n3]   # square roots between whole numbers
title: Finding a side
summary: "Pythagoras finds any side. For the hypotenuse, add the squares: c² = a² + b². For a shorter side, subtract from the hypotenuse's square: b² = c² − a². Then take the square root, and check the hypotenuse is still the longest."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A 5 m ladder leans against a wall with its foot 3 m out. How high up the wall does it reach? Screens, ramps, roofs and ladders all hide a right-angled triangle."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8285
  url: http://127.0.0.1:8285/index.html
  readySelector: "#sl-b"
  layout: full
explainPicture: { ref: tri.yml#explain-pic, caption: "Hypotenuse 10 and one side 6: the missing square is $100 - 36 = 64$, so the side is $\\sqrt{64} = 8$." }
explainClip:
  query: { code: "@tri.yml#explain", fresh: 1, id: explain }
  caption: "A shorter side"
  say: "To find a shorter side, subtract."
  clip:
    - caption: { text: "We want c = 10 with a = 6. Which b?", say: "We want the long side to be ten. Which short side?" }
    - wait: 1200
    - caption: { text: "The big square must be 100, so b² = 100 − 36 = 64.", say: "The big square must be one hundred. Take away thirty-six: sixty-four." }
    - click: Make side b longer
    - click: Make side b longer
    - expect: { selector: "#gsum", contains: "= 10²" }
    - wait: 600
    - caption: { text: "b = √64 = 8.", say: "So the side is the square root: eight." }
    - wait: 1200
---
Pythagoras' theorem links all three sides, so it can find any one of them:

- **The hypotenuse:** add the squares. $c^2 = a^2 + b^2$.
- **A shorter side:** the hypotenuse's square minus the other side's square. $b^2 = c^2 - a^2$.

Then take the square root. The answer often lies between two whole numbers: give it to two decimal places, and check that the hypotenuse is still the longest side.

## Predict: the ladder

```step
stage: predict
insight: "Committing to a height for the 5 m ladder with its foot 3 m out shows whether they subtract the squares or add them as for a hypotenuse."
check:
  type: predict
  q: "A 5 m ladder leans against a wall. Its foot is 3 m from the wall. How high up the wall does it reach?"
  options: ["4 m", "About 5.83 m", "2 m", "8 m"]
  actual: "4 m. The ladder is the hypotenuse: 5² − 3² = 25 − 9 = 16, so the height is 4 m. 5.83 m adds the squares, which would make the wall taller than the ladder."
```

Which side of the triangle is the ladder?

## Run: the height that fits

```step
stage: run
insight: "Changing b until the hypotenuse is 5 shows that the missing square is the big square minus the known one."
try: { playground: board, starter: "tri.yml#run", height: 620 }
check: { type: board, text: "The ladder is the hypotenuse, 5 m, and the foot is a = 3 m out. Change the height b until c = 5. Was your prediction right?", when: "c = 5", explain: "b = 4: 9 + 16 = 25. The height's square is 25 − 9 = 16." }
```

Watch the biggest square as b changes: you need it to be 25.

## Investigate: add or subtract?

```step
stage: investigate
insight: "For a shorter side subtract the squares; Ken adds, and gets a side longer than the hypotenuse. A real problem starts by spotting the right angle and the hypotenuse; students own the working and pick the key reason."
tasks:
  - check:
      type: answer
      q: "A right-angled triangle has hypotenuse 13 cm and one shorter side 5 cm. How long is the other side, in cm?"
      answer: "12"
      feedback:
        - ["13.93", "That adds the squares. The hypotenuse is the longest side: subtract."]
        - ["8", "That subtracts the sides. Subtract the squares: 169 − 25."]
      explain: "13² − 5² = 169 − 25 = 144, √144 = 12 cm."
  - check:
      type: bug
      code: "working.txt#ken"
      text: "Ken finds a shorter side. Click the line where his working goes wrong."
      answer: 2
      fault: logic
      misconception: pyth-add-for-leg
      explain: "Line 2: 10 cm is the hypotenuse, so subtract: b² = 100 − 36 = 64, b = 8 cm. His 11.66 cm is longer than the hypotenuse, which is impossible."
  - check:
      type: reasoning
      q: "A rectangular screen is 48 cm wide and 36 cm high. How long is its diagonal? Write your steps."
      steps:
        - ["The diagonal is the hypotenuse of a right-angled triangle with sides 48 and 36", "the corners of a rectangle are right angles"]
        - ["$48^2 + 36^2 = 2304 + 1296 = 3600$", "for the hypotenuse, add the squares"]
        - ["$\\sqrt{3600} = 60$ cm", "take the square root"]
      picks:
        - step: 2
          options: ["For the hypotenuse, add the squares", "For the hypotenuse, subtract the squares", "Add the sides: 48 + 36"]
          answer: 0
          feedback: [null, "Subtract when the hypotenuse is known and a shorter side is missing.", "That is the way round two edges, longer than across."]
      answer: "60"
      feedback:
        - ["84", "That adds the sides. Square them first."]
        - ["3600", "That is the diagonal's square. Take the square root."]
      explain: "48² + 36² = 3600, √3600 = 60 cm."
```

### Add for c, subtract for a side

Here are both kinds.

```worked
c^2 = 6^2 + 8^2 = 100,\ c = 10 :: Missing the hypotenuse: add the squares.
b^2 = 10^2 - 6^2 = 100 - 36 = 64,\ b = 8 :: Missing a shorter side: subtract from the hypotenuse's square.
b^2 = 7^2 - 4^2 = 33,\ b = \sqrt{33} \approx 5.74 :: Not a perfect square: between 5 and 6 (25 and 36), about 5.74.
5.74 < 7 :: Check: the hypotenuse must still be the longest.
```

Now try one: hypotenuse 13 cm, one side 5 cm.

### Find the mistake

Read Ken's working. Can a shorter side be longer than the hypotenuse?

### A screen

Your working can be short notes. Then choose the reason for the key step.

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a side on the board, a ramp with decimals, a side that is not a whole number, a shortcut saving, then the edge case of a shorter side longer than the hypotenuse."
try: { playground: board, starter: "tri.yml#six", height: 620 }
tasks:
  - starter: "tri.yml#six"
    hint: "The big square must be 100. Take away 36."
    check: { type: board, text: "a = 6. Change b until the hypotenuse is 10.", when: "c = 10", explain: "b = 8: 100 − 36 = 64 = 8²." }
  - check:
      type: answer
      q: "A ramp is 2.6 m long (the sloping side) and goes 2.4 m across the ground. How high does it rise, in m?"
      answer: "1"
      feedback:
        - ["3.54", "That adds the squares, but 2.6 m is the hypotenuse."]
        - ["0.2", "That subtracts the lengths. Subtract the squares: 6.76 − 5.76."]
      explain: "2.6² − 2.4² = 6.76 − 5.76 = 1, √1 = 1 m."
  - check:
      type: number
      q: "Hypotenuse 7 cm, one side 4 cm. The other side, in cm, to two decimal places?"
      answer: 5.74
      tolerance: 0.005
      explain: "49 − 16 = 33, √33 ≈ 5.74 cm."
  - check:
      type: answer
      q: "Walking round a 30 m by 40 m park is 70 m. How many metres shorter is the path straight across, corner to corner?"
      answer: "20"
      feedback:
        - ["50", "50 m is the path across. How much shorter than 70 m is it?"]
      explain: "Across: √(900 + 1600) = 50 m, so 70 − 50 = 20 m shorter."
  - check:
      type: question
      q: "Edge case: Jo finds a shorter side of 13 cm in a triangle whose hypotenuse is 12 cm. What does that tell her?"
      options: ["She made a mistake: a shorter side can't be longer than the hypotenuse", "The triangle is very thin", "She should round to 12 cm"]
      answer: 0
      feedback: [null, "No right-angled triangle has a side longer than its hypotenuse.", "Rounding does not fix a method slip: she probably added instead of subtracting."]
      explain: "The hypotenuse is always the longest side, so she probably added the squares instead of subtracting."
```

### On the board

Each task changes one thing.

### A ramp

### Not a whole number

### A shortcut

### Too long

## Practise: any side

```step
stage: practise
insight: "A shorter side, a diagonal, a ladder and a review, mixed; adding for a shorter side is the planted slip."
tasks:
  - check:
      type: answer
      q: "Hypotenuse 25 cm, one side 7 cm. The other side, in cm?"
      answer: "24"
      feedback:
        - ["25.96", "That adds the squares. Subtract: 625 − 49."]
      explain: "625 − 49 = 576, √576 = 24 cm."
  - check:
      type: number
      q: "A square has sides of 5 cm. How long is its diagonal, in cm, to two decimal places?"
      answer: 7.07
      tolerance: 0.005
      explain: "25 + 25 = 50, √50 ≈ 7.07 cm."
  - check:
      type: answer
      q: "A 10 m ladder reaches 8 m up a wall. How far is its foot from the wall, in m?"
      answer: "6"
      feedback:
        - ["12.81", "The ladder is the hypotenuse: subtract."]
        - ["2", "Subtract the squares, not the lengths."]
      explain: "100 − 64 = 36, √36 = 6 m."
  - check:
      type: answer
      q: "Review: the sides at the right angle are 9 cm and 12 cm. Hypotenuse, in cm?"
      answer: "15"
      feedback:
        - ["21", "That adds the sides."]
      explain: "81 + 144 = 225, √225 = 15 cm."
```

### A shorter side

### A diagonal

### A ladder

### Review: the hypotenuse

## Make: design a ramp

```step
stage: make
insight: "Designing a ramp from its rise and sloping length is the subtract case in a real setting, with decimals and a sense check."
hint: ["The sloping length is the hypotenuse.", "1.3² − 0.5² = 1.69 − 0.25."]
check:
  type: reasoning
  q: "A wheelchair ramp must rise 0.5 m and its sloping surface is 1.3 m long. How far out from the step does it reach along the ground, in m? Write your steps."
  steps:
    - ["The sloping surface is the hypotenuse: $c = 1.3$, $a = 0.5$", "it is opposite the right angle at the step"]
    - ["$b^2 = 1.3^2 - 0.5^2 = 1.69 - 0.25 = 1.44$", "for a shorter side, subtract the squares"]
    - ["$b = \\sqrt{1.44} = 1.2$ m", "take the square root"]
  picks:
    - step: 2
      options: ["For a shorter side, subtract the squares", "Add the squares", "Subtract the lengths: 1.3 − 0.5"]
      answer: 0
      feedback: [null, "That would make the ground longer than the slope.", "Subtract the squares, not the lengths."]
  answer: "1.2"
  feedback:
    - ["1.39", "That adds the squares."]
    - ["0.8", "That subtracts the lengths."]
  explain: "1.69 − 0.25 = 1.44, √1.44 = 1.2 m."
```

Then: real ramps should rise no more than 1 m for every 14 m along. Is this ramp too steep?
