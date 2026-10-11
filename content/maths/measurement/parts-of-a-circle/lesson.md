---
order: 6
unit: circles
node: AC9M7M03 n1
title: Parts of a circle
summary: "Every point of a circle is the same distance from its centre: the radius. The diameter goes right across through the centre, two radii long (d = 2r). A chord joins any two points; the circumference is the distance all the way round."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Wheels, plates, clocks and pizza: why does a wheel roll smoothly? Because every point on its edge is the same distance from the axle."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8278
  url: http://127.0.0.1:8278/index.html
  readySelector: "#sl-r"
  layout: full
explainPicture: { ref: circle.yml#explain-pic, caption: "Centre, radius (3 cm), diameter (6 cm: two radii), a chord, and the circumference all the way round." }
explainClip:
  query: { code: "@circle.yml#explain", fresh: 1, id: explain }
  caption: "Radius and diameter"
  say: "The diameter is two radii."
  clip:
    - caption: { text: "The radius: from the centre to the edge.", say: "The radius goes from the centre to the edge." }
    - wait: 1000
    - caption: { text: "The diameter: right across, through the centre.", say: "The diameter goes right across, through the centre." }
    - wait: 1000
    - click: Make the radius bigger
    - click: Make the radius bigger
    - caption: { text: "Radius 4, diameter 8: always two radii.", say: "Radius four, diameter eight. Always two radii." }
    - expect: { selector: "#gsum", contains: "diameter 8" }
    - wait: 1400
---
A **circle** is every point the same distance from one point, its **centre**. That distance is the **radius** ($r$).

- The **diameter** ($d$) goes right across through the centre. It is two radii: $d = 2r$, so $r = d \div 2$.
- A **chord** is a straight line joining any two points on the circle. The diameter is the longest chord.
- The **circumference** ($C$) is the distance all the way round: the circle's perimeter.

## Predict: radius 5

```step
stage: predict
insight: "Committing to a diameter for radius 5 shows whether they know the diameter is two radii, or halve, or mix the two up."
check:
  type: predict
  q: "A circle has radius 5 cm. What is its diameter?"
  options: ["10 cm", "2.5 cm", "5 cm", "25 cm"]
  actual: "10 cm: the diameter goes from the edge, through the centre, to the other edge: two radii. 2.5 halves the radius."
```

Picture a radius, then another one pointing the opposite way.

## Run: diameter 10

```step
stage: run
insight: "Changing the radius until the diameter is 10 shows the diameter is always twice the radius."
try: { playground: board, starter: "circle.yml#run", height: 540 }
check: { type: board, text: "Make a circle with diameter 10 cm. What is its radius? Was your prediction right?", when: "d = 10", explain: "Radius 5 cm: 10 = 2 × 5." }
```

Watch the radius and the diameter as the circle grows.

## Investigate: the parts

```step
stage: investigate
insight: "Each part has its own job; Jay calls the diameter the radius. Every diameter is a chord, but only chords through the centre are diameters."
tasks:
  - check:
      type: match
      q: "Match each part of a circle to what it is."
      pairs:
        - ["radius", "from the centre to the edge"]
        - ["diameter", "right across, through the centre"]
        - ["chord", "a straight line joining two points on the circle"]
        - ["circumference", "the distance all the way round"]
      explain: "The radius is half the diameter; the diameter is the longest chord; the circumference is the perimeter."
  - check:
      type: bug
      code: "working.txt#jay"
      text: "Jay works out how far a chair at the edge of a round table is from its centre. Click the line where he goes wrong."
      answer: 2
      fault: logic
      misconception: radius-diameter
      explain: "Line 2: across through the centre is the diameter. The radius is half of it: 120 ÷ 2 = 60 cm."
  - check:
      type: question
      q: "Is every chord a diameter?"
      options: ["No: only a chord that passes through the centre is a diameter", "Yes: they both go across the circle", "No: a chord is always curved"]
      answer: 0
      feedback: [null, "A chord near the edge goes across but misses the centre: it is shorter.", "A chord is straight; the circumference is the curved part."]
      explain: "Every diameter is a chord (the longest one), but most chords miss the centre."
```

### Two radii make a diameter

Here are the relationships.

```worked
d = 2r :: The diameter is two radii, end to end through the centre.
r = 5 \Rightarrow d = 2 \times 5 = 10 :: Radius to diameter: double.
d = 120 \Rightarrow r = 120 \div 2 = 60 :: Diameter to radius: halve.
C :: The circumference is the distance round; the next lessons find it from d.
```

Now match the parts.

### Find the mistake

Read Jay's working. Which part goes right across?

### Chords

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: an odd diameter on the board (a half radius), diameter to radius, radius to diameter with a decimal, then the longest chord and two radii in a line."
try: { playground: board, starter: "circle.yml#halves", height: 540 }
tasks:
  - starter: "circle.yml#halves"
    hint: "The radius is half of 7."
    check: { type: board, text: "Make a circle with diameter 7 cm.", when: "d = 7", explain: "Radius 3.5 cm: 2 × 3.5 = 7." }
  - check:
      type: answer
      q: "A bike wheel has diameter 18 inches. What is its radius, in inches?"
      answer: "9"
      feedback:
        - ["36", "That doubles. The radius is half the diameter."]
      explain: "18 ÷ 2 = 9 inches."
  - check:
      type: answer
      q: "A circle has radius 4.5 cm. What is its diameter, in cm?"
      answer: "9"
      feedback:
        - ["2.25", "That halves. The diameter is two radii."]
      explain: "2 × 4.5 = 9 cm."
  - check:
      type: question
      q: "Edge case: two radii point in exactly opposite directions from the centre. Together they make a…"
      options: ["diameter", "chord that misses the centre", "circumference", "radius twice as long"]
      answer: 0
      feedback: [null, "They pass through the centre.", "They are straight, not round.", "A radius always ends at the centre."]
      explain: "End to end through the centre: a diameter, d = 2r."
```

### Diameter 7

Each task changes one thing.

### Diameter to radius

### Radius to diameter

### Opposite radii

## Practise: circle parts

```step
stage: practise
insight: "Doubling, halving and the words, mixed; mixing up radius and diameter is the planted slip; the review keeps volume fresh."
tasks:
  - check:
      type: answer
      q: "A clock face has radius 12 cm. What is its diameter, in cm?"
      answer: "24"
      feedback:
        - ["6", "That halves."]
      explain: "2 × 12 = 24 cm."
  - check:
      type: answer
      q: "A coin has diameter 3 cm. What is its radius, in cm?"
      answer: "1.5"
      feedback:
        - ["6", "That doubles."]
      explain: "3 ÷ 2 = 1.5 cm."
  - check:
      type: question
      q: "What is the longest chord of a circle?"
      options: ["A diameter", "A radius", "The circumference", "Any chord near the edge"]
      answer: 0
      feedback: [null, "A radius stops at the centre, so it is not a chord.", "The circumference is curved, not a chord.", "Chords near the edge are short."]
      explain: "A chord through the centre, the diameter, is the longest."
  - check:
      type: answer
      q: "Review: a box is 2 cm by 3 cm by 4 cm. What is its volume, in cm³?"
      answer: "24"
      feedback:
        - ["9", "That adds."]
      explain: "2 × 3 × 4 = 24 cm³."
```

### Double

### Halve

### Longest chord

### Review: volume

## Make: the biggest circle in a box

```step
stage: make
insight: "Fitting the biggest circle in a rectangle means reasoning about the diameter against the shorter side, then halving for the radius."
hint: ["The circle must fit across the narrow way.", "Its diameter can be at most the shorter side."]
check:
  type: reasoning
  q: "A box lid is a rectangle 10 cm by 6 cm. What is the radius of the biggest circle that fits flat inside it? Write your reasons."
  steps:
    - ["The diameter can be at most 6 cm", "the circle must fit across the shorter side"]
    - ["$r = 6 \\div 2 = 3$ cm", "the radius is half the diameter"]
  picks:
    - step: 1
      options: ["The circle must fit across the shorter side", "The circle must fit along the longer side", "The circle's diameter is the perimeter of the box"]
      answer: 0
      feedback: [null, "A 10 cm circle would stick out of the 6 cm sides.", "The diameter is a straight distance across the circle."]
  answer: "3"
  feedback:
    - ["5", "A diameter of 10 cm would not fit across the 6 cm side."]
    - ["6", "6 cm is the diameter. The radius is half."]
  explain: "The diameter is limited by the 6 cm side, so r = 3 cm."
```

Then: how many of those circles fit side by side in the lid?
