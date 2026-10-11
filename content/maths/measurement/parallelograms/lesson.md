---
order: 1
unit: area
node: AC9M7M01 n1
title: Area of parallelograms
summary: "Cut a triangle off one end of a parallelogram and move it to the other end: it becomes a rectangle with the same base and height. So the area of a parallelogram is base × perpendicular height."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Tiles, bricks in a wall, and the stripes of a pedestrian crossing seen from an angle are parallelograms. How much area does a slanted tile cover?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8273
  url: http://127.0.0.1:8273/index.html
  readySelector: "#sl-s"
  layout: full
explainPicture: { ref: area.yml#explain-pic, caption: "The triangle cut off the left end fills the gap on the right: a 6 by 4 rectangle, so the parallelogram's area is $6 \\times 4 = 24$ cm²." }
explainClip:
  query: { code: "@area.yml#explain", fresh: 1, id: explain }
  caption: "Cut and move"
  say: "A parallelogram can be cut into a rectangle."
  clip:
    - caption: { text: "Cut a triangle off the left end.", say: "Cut a triangle off the left end." }
    - click: Cut and move
    - expect: { selector: "#gsum", contains: "6 × 4 = 24" }
    - wait: 600
    - caption: { text: "It fills the gap: a 6 by 4 rectangle.", say: "It fills the gap on the right: a rectangle." }
    - wait: 1000
    - click: Put the piece back
    - caption: { text: "Slide the top along: same base, same height, same area.", say: "Slide the top along. The area stays the same." }
    - click: Move the top right
    - click: Move the top right
    - expect: { selector: "#gsum", contains: "= 24" }
    - wait: 1200
---
The **area** of a shape is how many unit squares it covers. A rectangle 6 cm long and 4 cm high has 4 rows of 6 squares: $6 \times 4 = 24$ square centimetres, written 24 cm².

A **parallelogram** has two pairs of parallel sides, like a rectangle pushed over. Its **base** is one side, and its **perpendicular height** is the distance straight up from the base to the opposite side, at a right angle (marked ∟). The slanted side is longer than the height.

## Predict: pushed over

```step
stage: predict
insight: "Committing to which shape covers more surfaces the belief that the slanted sides, being longer, add area."
check:
  type: predict
  q: "A rectangle and a parallelogram both have base 6 cm and perpendicular height 4 cm. Which covers more area?"
  options: ["They cover the same area", "The parallelogram: its slanted sides are longer", "The rectangle: it is not pushed over"]
  actual: "The same: 24 cm² each. Cut a triangle off the parallelogram and move it, and it becomes the 6 by 4 rectangle."
```

Picture the parallelogram as the rectangle pushed over. Does anything get added or taken away?

## Run: cut and move

```step
stage: run
insight: "Cutting off the triangle and moving it shows the parallelogram rearranges into a rectangle with the same base and height."
try: { playground: board, starter: "area.yml#run", height: 520 }
check: { type: board, text: "Press **Cut and move**. What shape do you get, and what is its area? Was your prediction right?", when: "c = 1", explain: "A 6 by 4 rectangle: 24 cm². Nothing was added or lost, only moved." }
```

The dashed orange line is the perpendicular height. The cut goes along it.

## Investigate: base times height

```step
stage: investigate
insight: "Area = base × perpendicular height; Ruby's mistake uses the slanted side, which is longer than the height."
tasks:
  - check:
      type: answer
      q: "A parallelogram has base 8 cm and perpendicular height 5 cm. What is its area, in cm²?"
      answer: "40"
      feedback:
        - ["13", "That adds. Area is base × height."]
        - ["26", "That is twice (8 + 5): a perimeter idea. Area is base × height."]
      explain: "8 × 5 = 40 cm²."
  - check:
      type: bug
      code: "working.txt#ruby"
      text: "Ruby finds the area of a parallelogram. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: slant-height
      explain: "Line 3: 5 cm is the slanted side, not the height. The height is the perpendicular distance, 4 cm: 7 × 4 = 28 cm²."
  - check:
      type: question
      q: "Why does a parallelogram have the same area as a rectangle with the same base and height?"
      options: ["The triangle cut off one end fits exactly into the gap at the other end", "Its slanted sides are the same length as the rectangle's sides", "Both shapes have four sides"]
      answer: 0
      feedback: [null, "The slanted sides are longer than the height, so that is not it.", "Many four-sided shapes have different areas."]
      explain: "Cut along the height and move the triangle: the parallelogram becomes the rectangle, with nothing added or lost."
```

### Cut, move, multiply

Here is why the formula works, then how to use it.

```worked
A = 6 \times 4 = 24 \text{ cm}^2 :: A rectangle: 4 rows of 6 unit squares.
\text{parallelogram} \to \text{rectangle} :: Cut along the height and move the triangle: the same base and height.
A = b \times h :: So a parallelogram's area is base × perpendicular height.
A = 8 \times 5 = 40 \text{ cm}^2 :: Use the height at a right angle to the base, never the slanted side.
```

Now try one: base 8 cm, height 5 cm.

### Find the mistake

Read Ruby's working. Which length is at a right angle to the base?

### Why it works

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: sliding the top to make a rectangle, building an area from a base, a decimal height, finding a missing height (backwards), then the edge case of a very slanted parallelogram."
try: { playground: board, starter: "area.yml#straighten", height: 520 }
tasks:
  - starter: "area.yml#straighten"
    hint: "Move the top until it sits straight above the left end of the base."
    check: { type: board, text: "Slide the top until the parallelogram is a rectangle. Did the area change?", when: "s = 0", explain: "s = 0 puts the top straight above: a rectangle, still 6 × 4 = 24 cm²." }
  - starter: "area.yml#twentyfour"
    hint: ["Which number times 8 makes 24?", "Set b to 8 first."]
    check: { type: board, text: "Make a parallelogram with base 8 cm and area 24 cm².", when: "b = 8 and a = 24", explain: "8 × 3 = 24, so the height is 3 cm." }
  - check:
      type: answer
      q: "A parallelogram has base 12 m and perpendicular height 3.5 m. What is its area, in m²?"
      answer: "42"
      feedback:
        - ["15.5", "That adds. Multiply the base by the height."]
      explain: "12 × 3.5 = 42 m² (12 × 3 = 36, plus 12 × 0.5 = 6)."
  - check:
      type: answer
      q: "A parallelogram has area 30 cm² and base 6 cm. What is its perpendicular height, in cm?"
      answer: "5"
      feedback:
        - ["180", "That multiplies. Which number times 6 makes 30?"]
        - ["24", "That subtracts. Area = base × height, so divide."]
      explain: "6 × h = 30, so h = 30 ÷ 6 = 5 cm."
  - check:
      type: question
      q: "Edge case: two parallelograms both have base 5 cm and height 3 cm. One is very slanted. Which has the bigger area?"
      options: ["Neither: both are 15 cm²", "The very slanted one", "The less slanted one"]
      answer: 0
      feedback: [null, "Slanting makes the sides longer but keeps the height.", "Same base, same height, same area."]
      explain: "Area depends only on the base and the perpendicular height: 5 × 3 = 15 cm² for both."
```

### Straighten it

Each task changes one thing.

### Area 24

### A decimal height

### Backwards: the height

### Very slanted

## Practise: parallelograms

```step
stage: practise
insight: "Whole and decimal bases, units, and a slanted side to ignore, mixed; the review keeps decimal multiplication fresh."
tasks:
  - check:
      type: answer
      q: "Base 9 cm, perpendicular height 7 cm. Area, in cm²?"
      answer: "63"
      feedback:
        - ["16", "That adds."]
      explain: "9 × 7 = 63 cm²."
  - check:
      type: answer
      q: "A parallelogram has base 10 cm, slanted side 6 cm and perpendicular height 4.5 cm. Area, in cm²?"
      answer: "45"
      feedback:
        - ["60", "6 cm is the slanted side. Use the height, 4.5 cm."]
      explain: "10 × 4.5 = 45 cm²."
  - check:
      type: question
      q: "A parallelogram's base is 5 m and its height 2 m. How is its area written?"
      options: ["10 m²", "10 m", "7 m²", "10 m³"]
      answer: 0
      feedback: [null, "m measures a length. Area counts squares: m².", "That adds.", "m³ is for volume."]
      explain: "5 × 2 = 10 square metres: 10 m²."
  - check:
      type: answer
      q: "Review: work out $4.5 \\times 6$."
      answer: "27"
      feedback:
        - ["24.5", "Multiply both parts: 4 × 6 + 0.5 × 6."]
      explain: "4 × 6 = 24 and 0.5 × 6 = 3: 27."
```

### Base times height

### Ignore the slant

### Units

### Review: decimals

## Make: area 18, slanted

```step
stage: make
insight: "Building a slanted parallelogram with a given area means choosing a base and height that multiply to it, and seeing the slant does not matter."
try: { playground: board, starter: "area.yml#make", height: 560 }
hint: ["Which pairs of numbers multiply to 18?", "Then move the top so it is not a rectangle."]
check: { type: board, text: "Make a parallelogram that is not a rectangle, with area 18 cm².", when: "a = 18 and s^2 > 0", explain: "Base 6 and height 3, or base 9 and height 2, with the top moved along: any slant works." }
```

Then find a different base and height for the same area.
