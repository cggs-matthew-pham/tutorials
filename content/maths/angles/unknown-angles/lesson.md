---
order: 6
unit: angle-sums
node: AC9M7M05 n3
uses: [AC9M7M04 n3]   # chains of reasons with parallel-line angles (Reasoning with angles)
title: Unknown angles in shapes
summary: "Find unknown angles in triangles and polygons in steps, with a reason for each: the angle sum of the shape, angles on a straight line, equal angles in an isosceles triangle. An exterior angle of a triangle equals the two opposite angles added."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A roof truss, a kite, a bridge brace: builders work out the angle they cannot measure from the ones they can. Every step needs a reason."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8172
  url: http://127.0.0.1:8172/index.html
  readySelector: "#kmove-pt"
  layout: full
explainPicture: { ref: shapes.yml#explain-pic, caption: "$a = 59^\\circ$, $b = 45^\\circ$. Then $c = 76^\\circ$ (angles in a triangle add to $180^\\circ$) and $x = 104^\\circ$ ($c$ and $x$ are on a straight line). And $x = a + b$." }
explainClip:
  query: { code: "@shapes.yml#explain", fresh: 1, id: explain }
  caption: "From the angle sum to the exterior angle"
  say: "Two reasons find any angle here."
  clip:
    - caption: { text: "a + b + c = 180°: the angles in a triangle.", say: "The angles in a triangle add to one hundred and eighty degrees." }
    - wait: 900
    - caption: { text: "x and c make a straight line: x = 180° − c.", say: "x and c make a straight line, so x is one eighty take c." }
    - wait: 900
    - caption: { text: "So x = a + b, whatever the shape.", say: "So x is always a plus b. Watch it as the triangle changes." }
    - click: Move A right
    - click: Move A right
    - click: Move A up
    - expect: { selector: "#gsum", contains: "= 180°" }
    - wait: 1200
---
You know the angle sums: a triangle's angles add to $180^\circ$, and a polygon with $n$ sides has $(n - 2) \times 180^\circ$. With straight-line angles and the parallel-line rules, you can find angles you cannot measure.

As in Reasoning with angles, each step needs a reason. Write your working your own way; the checker marks your answer and a reason at the key step, then shows a model to compare.

## Predict: the outside angle

```step
stage: predict
insight: "Committing to the exterior angle before working it out shows whether they see the two-step chain (angle sum, then straight line), and sets up x = a + b."
check:
  type: predict
  q: "A triangle has $a = 50^\\circ$ and $b = 60^\\circ$. The side through $C$ is extended past $C$, making an outside angle $x$ with the third side. What is $x$?"
  options:
    - "$110^\\circ$"
    - "$70^\\circ$"
    - "$130^\\circ$"
    - "$120^\\circ$"
  actual: "110°. c = 180° − 50° − 60° = 70° (angles in a triangle), then x = 180° − 70° = 110° (a straight line). Notice: 110° = 50° + 60°."
```

Two steps: which angle can you find first?

## Run: drag the triangle

```step
stage: run
insight: "Dragging the triangle while watching x shows the exterior angle always equals the two opposite angles added: the two-step chain gives a shortcut."
try: { playground: board, starter: "shapes.yml#run", height: 600 }
check: { type: board, text: "Drag the corners (or use Move) until $x$ is more than $120^\\circ$. Each time, compare $x$ with $a + b$.", when: "x > 120" }
```

Was your prediction right? Is $x$ always $a + b$? Why must it be?

## Investigate: angle sums in steps

```step
stage: investigate
insight: "Choose the angle sum for the shape, then any straight-line or parallel-line step, with a reason each time. Zoe's mistake uses the triangle's 180° for a quadrilateral."
tasks:
  - picture: { ref: shapes.yml#tri1, caption: "$a = 59^\\circ$, $b = 45^\\circ$. The side $BC$ is extended past $C$." }
    check:
      type: reasoning
      q: "Find $x$. Write each step with its reason."
      steps:
        - ["$c = 180^\\circ - 59^\\circ - 45^\\circ = 76^\\circ$", "angles in a triangle add to $180^\\circ$"]
        - ["$x = 180^\\circ - 76^\\circ = 104^\\circ$", "$c$ and $x$ are on a straight line"]
      picks:
        - step: 1
          options: ["Angles in a triangle add to 180°", "Angles on a straight line add to 180°", "Angles at a point add to 360°"]
          answer: 0
          feedback: [null, "a, b and c are the corners of a triangle, not on one line.", "a, b and c are not around one point."]
      answer: "104"
      feedback:
        - ["76", "That is c. One more step: c and x are on a straight line."]
      explain: "c = 76° (angles in a triangle), x = 104° (a straight line with c). Check: 59° + 45° = 104°."
  - check:
      type: bug
      code: "working.txt#zoe"
      text: "Zoe finds the fourth angle of a quadrilateral. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: wrong-angle-sum
      explain: "Line 2: a quadrilateral's angles add to (4 − 2) × 180° = 360°, not 180°. d = 360° − 76° − 68° − 102° = 114°. A negative angle on line 4 is the clue that something earlier went wrong."
  - picture: { ref: shapes.yml#quad1, caption: "A quadrilateral: $a = 76^\\circ$, $b = 68^\\circ$, $c = 102^\\circ$." }
    check:
      type: reasoning
      q: "Find $d$, with your reason."
      steps:
        - ["$a + b + c + d = 360^\\circ$", "angles in a quadrilateral: $(4 - 2) \\times 180^\\circ$"]
        - ["$d = 360^\\circ - 76^\\circ - 68^\\circ - 102^\\circ = 114^\\circ$", "subtract the angles you know"]
      picks:
        - step: 1
          options: ["The angles of a quadrilateral add to 360°", "The angles of a quadrilateral add to 180°", "The angles of a quadrilateral add to 540°"]
          answer: 0
          feedback: [null, "180° is a triangle. A quadrilateral splits into 2 triangles.", "540° is a pentagon: (5 − 2) × 180°."]
      answer: "114"
      feedback:
        - ["-66", "A negative angle: the sum must be bigger than 180°."]
      explain: "(4 − 2) × 180° = 360°, so d = 360° − 246° = 114°."
```

### Triangle, then a straight line

Here is the routine: know, choose the rule, say why.

```worked
a = 59^\circ,\; b = 45^\circ :: Know: the given angles.
c = 180^\circ - 59^\circ - 45^\circ = 76^\circ :: Choose: $a$, $b$, $c$ are a triangle's angles. Why: angles in a triangle add to $180^\circ$.
x = 180^\circ - 76^\circ = 104^\circ :: Choose: $c$ and $x$ sit on one straight line. Why: angles on a straight line add to $180^\circ$.
x = 59^\circ + 45^\circ :: A shortcut you can now explain: an exterior angle equals the two opposite angles added.
```

Now find $x$ yourself, your own way.

### Find the mistake

Read Zoe's working. Which line uses the wrong fact?

### A quadrilateral

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: an isosceles triangle, a pentagon's sum, the exterior angle at another corner, a right angle in a quadrilateral, then the edge case of a triangle that cannot exist."
try: { playground: board, starter: "shapes.yml#make", height: 600 }
tasks:
  - picture: { ref: shapes.yml#iso, caption: "$CA = CB$ (isosceles). $a = 56^\\circ$." }
    check:
      type: reasoning
      q: "$CA = CB$, so the angles at $A$ and $B$ are equal. Find $c$, with a reason for each step."
      steps:
        - ["$b = 56^\\circ$", "isosceles triangle: the angles opposite the equal sides are equal"]
        - ["$c = 180^\\circ - 56^\\circ - 56^\\circ = 68^\\circ$", "angles in a triangle add to $180^\\circ$"]
      picks:
        - step: 2
          options: ["Angles in a triangle add to 180°", "Angles on a straight line add to 180°", "Vertically opposite angles are equal"]
          answer: 0
          feedback: [null, "a, b and c are a triangle's corners, not on one line.", "There is no crossing here."]
      answer: "68"
      feedback:
        - ["124", "That is 180° − 56°: you need to take away both 56° angles."]
      explain: "b = 56° (isosceles), c = 68° (angles in a triangle)."
  - picture: { ref: shapes.yml#pent, caption: "A pentagon: $a = 104^\\circ$, $b = 117^\\circ$, $c = 85^\\circ$, $d = 136^\\circ$." }
    check:
      type: answer
      q: "Find $e$."
      answer: "98"
      feedback:
        - ["-82", "A pentagon's angles add to (5 − 2) × 180° = 540°."]
        - ["-262", "A pentagon's angles add to 540°, not 180°."]
      explain: "(5 − 2) × 180° = 540°, so e = 540° − 442° = 98°."
  - picture: { ref: shapes.yml#ext-b, caption: "$a = 63^\\circ$, $c = 87^\\circ$. The side $AB$ is extended past $B$." }
    check:
      type: reasoning
      q: "Find the exterior angle $x$ at $B$."
      steps:
        - ["$b = 180^\\circ - 63^\\circ - 87^\\circ = 30^\\circ$", "angles in a triangle add to $180^\\circ$"]
        - ["$x = 180^\\circ - 30^\\circ = 150^\\circ$", "$b$ and $x$ are on a straight line"]
      answer: "150"
      feedback:
        - ["30", "That is b. One more step to x."]
      explain: "b = 30°, x = 150°. Or straight away: x = a + c = 63° + 87° = 150° (the exterior angle equals the two opposite angles)."
  - picture: { ref: shapes.yml#quad2, caption: "A quadrilateral with a right angle at $B$: $a = 68^\\circ$, $d = 102^\\circ$." }
    check:
      type: answer
      q: "Find $c$."
      answer: "100"
      feedback:
        - ["-80", "A quadrilateral's angles add to 360°."]
        - ["10", "Include the right angle at B: 90°."]
      explain: "360° − 68° − 90° − 102° = 100°."
  - check:
      type: question
      q: "Edge case: can a triangle have two angles of $100^\\circ$?"
      options: ["No: they already add to more than 180°", "Yes, if the third angle is small", "Yes, if the triangle is big enough"]
      answer: 0
      feedback: [null, "100° + 100° = 200°, which is already more than 180°.", "Size does not change angles: every triangle's add to 180°."]
      explain: "100° + 100° = 200° > 180°, so no. A triangle has at most one obtuse angle."
```

### Isosceles

Each task changes one thing.

### A pentagon

### Exterior at another corner

### A right angle

### Impossible triangles

## Practise: unknown angles

```step
stage: practise
insight: "Angle sums and exterior angles from words, mixed, with the polygon sum planted; the review keeps the parallel-line chains fresh."
tasks:
  - check:
      type: answer
      q: "A triangle has angles of $35^\\circ$ and $85^\\circ$. Find the third angle."
      answer: "60"
      feedback:
        - ["240", "Add the two angles, then take that from 180°."]
      explain: "180° − 35° − 85° = 60°."
  - check:
      type: answer
      q: "Three angles of a quadrilateral are $90^\\circ$, $85^\\circ$ and $120^\\circ$. Find the fourth."
      answer: "65"
      feedback:
        - ["-115", "A quadrilateral's angles add to 360°, not 180°."]
      explain: "360° − 295° = 65°."
  - check:
      type: reasoning
      q: "A triangle has an exterior angle of $130^\\circ$ at $C$, and $a = 70^\\circ$. Find $b$, with your reasons."
      steps:
        - ["$c = 180^\\circ - 130^\\circ = 50^\\circ$", "$c$ and the exterior angle are on a straight line"]
        - ["$b = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ$", "angles in a triangle add to $180^\\circ$"]
      answer: "60"
      feedback:
        - ["50", "That is c. Now use the triangle."]
      explain: "c = 50°, b = 60°. Or: 130° = a + b, so b = 60°."
  - check:
      type: question
      q: "Review: parallel lines, $c = 70^\\circ$. Which is a correct first step to find $e$?"
      options: ["$e = 110^\\circ$: co-interior with $c$", "$e = 70^\\circ$: alternate to $c$", "$e = 70^\\circ$: corresponding to $c$"]
      answer: 0
      feedback: [null, "c and e are on the same side of the crossing line: co-interior.", "c and e are not in the same place at each crossing."]
      explain: "Co-interior angles add to 180°: e = 110°."
```

### Triangle

### Quadrilateral

### Exterior angle backwards

### Review: parallel lines

## Make: a given exterior angle

```step
stage: make
insight: "Making a triangle with a given exterior angle reverses the reasoning: x = 135° needs c = 45°, from a + b = 135°."
try: { playground: board, starter: "shapes.yml#make", height: 600 }
hint: ["x = 135° means c = 45°.", "A right angle at A and equal legs give 45° at C: try A (1, 1), B (7, 1), C (1, 7)."]
check: { type: board, text: "Move the corners so that the exterior angle $x$ is $135^\\circ$.", when: "x = 135", explain: "c = 45°, so a + b = 135°: for example a = 90° and b = 45°." }
```

First work out what $c$ must be. Then find a triangle that has it.

Stretch: design an angle puzzle for a partner with two unknown angles, and write the model reasons.
