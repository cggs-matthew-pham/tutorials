---
order: 17
unit: congruence
node: [AC9M8SP01 n2, AC9M8SP01 n3]
uses: [AC9M8SP01 n1, AC9M7SP03 n1]
title: Similar shapes
summary: "Similar shapes are the same shape but can be different sizes, like a photo and its enlargement. Find the scale factor, use it to work out missing sides, and learn the conditions that make two triangles similar."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "How can you find the height of a tree without climbing it? Its shadow and your own shadow make two triangles of the same shape."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8323
  url: http://127.0.0.1:8323/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: sim.yml#explain-pic, caption: "A 3, 4, 5 triangle and a copy with scale factor 2: sides 6, 8, 10, the same angles." }
explainClip:
  query: { code: "@sim.yml#explain", fresh: 1, id: explain }
  caption: "A scale factor"
  say: "Every side is multiplied by the same number."
  clip:
    - caption: { text: "Scale factor 1: the copy is the same size. Congruent.", say: "Scale factor one. The copy is congruent." }
    - wait: 1200
    - caption: { text: "Scale factor 2: every side doubles, every angle stays.", say: "Scale factor two. Every side doubles. The angles stay the same." }
    - click: Make the scale factor bigger
    - click: Make the scale factor bigger
    - expect: { selector: "#gsum", contains: "5 × 2 = 10" }
    - wait: 1600
---
Two shapes are **similar** when one is an **enlargement** of the other: the same shape, maybe a different size. What changes when a shape is enlarged, and what stays the same?

## Predict: double the sides

```step
stage: predict
insight: "Committing to what happens to the angles when sides double shows whether they confuse lengths with angles."
check:
  type: predict
  q: "A triangle has sides 3 cm, 4 cm and 5 cm. A copy has every side doubled. What happens to its angles?"
  options: ["They stay the same", "They double", "They halve"]
  actual: "They stay the same. Doubling every side makes a bigger triangle of exactly the same shape."
```

In an enlargement, every length is multiplied by the same **scale factor** $k$, and every angle stays the same. Congruent shapes are similar with $k = 1$.

$$k = \frac{\text{copy length}}{\text{matching original length}}$$

Triangles are similar when any one of these holds:

| Condition | What matches |
|---|---|
| **AA** | two angles equal (so the third is too) |
| **SSS** | all three pairs of sides in the same ratio |
| **SAS** | two pairs of sides in the same ratio, and the angle between them equal |

Translations, reflections and rotations move a shape without changing its size, so they make **congruent** shapes. An enlargement makes a **similar** shape.

## Run: scale a triangle

```step
stage: run
insight: "Changing the scale factor shows every side multiplied by the same number and the shape unchanged."
try: { playground: board, starter: "sim.yml#run", height: 600 }
check: { type: board, text: "Make a copy with scale factor 2. Divide each copy side by its matching original side. Did the angles change, as you predicted?", when: "k = 2", explain: "6 ÷ 3, 8 ÷ 4 and 10 ÷ 5 all equal 2: the same scale factor, the same angles." }
```

Then try a scale factor less than 1. What happens to the copy?

## Investigate: scale factors

```step
stage: investigate
insight: "Find k from a matching pair and multiply; adding a fixed amount is the slip (Mia); AA is enough because the third angle follows."
tasks:
  - check:
      type: number
      q: "A triangle has sides 4 cm, 6 cm and 8 cm. A similar triangle's shortest side is 6 cm. How long is its longest side, in cm?"
      answer: 12
      tolerance: 0
      feedback:
        - ["10", "That adds 2 to every side. Find the scale factor: 6 ÷ 4."]
      explain: "k = 6 ÷ 4 = 1.5, so the longest side is 8 × 1.5 = 12 cm."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia enlarges a photo. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: similar-add
      explain: "Line 2: an enlargement multiplies. k = 7 ÷ 4 = 1.75, so the 6 cm side becomes 6 × 1.75 = 10.5 cm."
  - check:
      type: question
      q: "Two triangles both have angles of 40° and 75°. Are they similar?"
      options: ["Yes, by AA: the third angles are both 65°", "No: you need the sides", "Only if they are the same size", "You cannot tell"]
      answer: 0
      feedback: [null, "Two equal angles are enough for similarity.", "That would be congruent.", "Two angles fix the third, so the shape is fixed."]
      explain: "180 − 40 − 75 = 65 in both, so all three angles match: the same shape (AA)."
```

### A missing side

Here is the routine.

```worked
\text{original } 2, 3, 4;\ \text{copy shortest} = 5 :: Match the sides: shortest with shortest.
k = 5 \div 2 = 2.5 :: Scale factor: copy ÷ original.
4 \times 2.5 = 10 :: Multiply the original side by k.
10 \text{ cm} :: Check: 10 ÷ 4 = 2.5 as well.
```

### Find the mistake

Read Mia's working. Does a photo stay the same shape when you add?

### Angles only

## Modify: rectangles and shadows

```step
stage: modify
insight: "Rectangles can have equal angles and still not be similar; similar triangles measure a tree from shadows; all squares are similar but not all rectangles."
try: { playground: board, starter: "sim.yml#rect", height: 560 }
tasks:
  - starter: "sim.yml#rect"
    hint: "Multiply both the width and the height by the same number."
    check: { type: board, text: "Make the second rectangle similar to the 4 by 2 rectangle, but not congruent.", when: "s = 1 and c = 0", explain: "Such as 8 by 4 (scale factor 2) or 6 by 3 (1.5): both sides multiplied by the same number. To be congruent as well, both sides would have to be equal: 4 by 2." }
  - starter: "sim.yml#rect"
    check: { type: board, text: "Now make a rectangle that is not similar to it. Its angles are all 90°: why is it not similar?", when: "s = 0", explain: "The width and height have different scale factors, so the shape is stretched. Equal angles are not enough for rectangles." }
  - check:
      type: number
      q: "A 1.5 m post casts a 2 m shadow. At the same time, a tree casts a 12 m shadow. How tall is the tree, in metres?"
      answer: 9
      tolerance: 0
      feedback:
        - ["11.5", "That adds 10 m. The shadow is 6 times as long, so the tree is 6 times as tall."]
        - ["16", "Match height with height and shadow with shadow: the scale factor is 12 ÷ 2."]
      explain: "The sun's rays make similar triangles: k = 12 ÷ 2 = 6, so the tree is 1.5 × 6 = 9 m."
  - check:
      type: question
      q: "Which is true?"
      options: ["All squares are similar, but not all rectangles are", "All rectangles are similar", "No two squares are similar", "All rectangles are congruent"]
      answer: 0
      feedback: [null, "A 4 by 2 and a 4 by 3 rectangle are not.", "Any square is an enlargement of any other.", "Congruent needs the same size."]
      explain: "A square's sides are always in the ratio 1 : 1. A rectangle's width and height can be in any ratio."
```

### Similar, not congruent

### Not similar

### The tree's shadow

### Squares and rectangles

## Practise: similar shapes

```step
stage: practise
insight: "Finding k, missing sides and reductions, mixed; adding instead of multiplying is the planted slip; transformations link congruence and similarity; the congruence review links the two ideas."
tasks:
  - check:
      type: number
      q: "A triangle's sides are 5, 7 and 9 cm. A similar triangle's matching sides are 15, 21 and 27 cm. What is the scale factor?"
      answer: 3
      tolerance: 0
      explain: "15 ÷ 5 = 21 ÷ 7 = 27 ÷ 9 = 3 (SSS similarity)."
  - check:
      type: number
      q: "A 10 cm by 6 cm rectangle is reduced so the 10 cm side becomes 5 cm. How long is the 6 cm side now, in cm?"
      answer: 3
      tolerance: 0
      feedback:
        - ["1", "That takes 5 away. The scale factor is 5 ÷ 10 = 0.5."]
      explain: "k = 0.5, so 6 × 0.5 = 3 cm. A scale factor less than 1 makes the copy smaller."
  - check:
      type: question
      q: "A triangle is moved by a transformation, and its image is similar but not congruent. Which transformation was it?"
      options: ["An enlargement", "A translation", "A reflection", "A rotation"]
      answer: 0
      feedback: [null, "A slide keeps the size, so the image is congruent.", "A flip keeps the size, so the image is congruent.", "A turn keeps the size, so the image is congruent."]
      explain: "Translations, reflections and rotations keep every length, so they give congruent shapes. Only an enlargement (k ≠ 1) changes the size."
  - check:
      type: question
      q: "Review: two triangles have equal angles of 50° and 60°, and the sides between those angles are both 8 cm. Are they congruent?"
      options: ["Yes, by ASA", "No, they are only similar", "Yes, by SSS", "You cannot tell"]
      answer: 0
      feedback: [null, "A matching side makes them the same size too.", "Only one side is known.", "Two angles and the side between them are enough."]
      explain: "Two angles and the side between them: ASA."
```

### Scale factor

### Smaller copies

### Transformations

### Review: congruence

## Make: find the scale factor

```step
stage: make
insight: "Working back from one copy side to k shows they can find a scale factor and use it."
try: { playground: board, starter: "sim.yml#make", height: 600 }
hint: ["Which original side matches y?", "k = the copy side ÷ the matching original side."]
check: { type: board, text: "The original's sides are 6, 8 and 10 cm. In the copy, side y (matching the 8 cm side) is 12 cm. Set the scale factor.", when: "y = 12", explain: "k = 12 ÷ 8 = 1.5, so the copy's sides are 9, 12 and 15 cm." }
```

Then say what the copy's other two sides are, and how you know the angles match.
