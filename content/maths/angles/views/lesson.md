---
order: 11
unit: solids
node: [AC9M7SP01 n2, AC9M7SP01 n3]
title: Views of a solid
summary: "A pile of cubes can be drawn in 3D or as top, front and side views. A front or side view shows only the tallest pile in each column; a top view with numbers shows every pile."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "An architect shows a building from above, from the front and from the side. Why not just one drawing?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8296
  url: http://127.0.0.1:8296/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: views.yml#explain-pic, caption: "Three drawings of the same cubes: top, front and side. The tall pile hides the one behind it." }
explainClip:
  query: { code: "@views.yml#explain", fresh: 1, id: explain }
  caption: "Build, then look"
  say: "Add cubes and watch the three views change."
  clip:
    - caption: { text: "An empty base. Add cubes at the front.", say: "An empty base. Add cubes at the front." }
    - click: "Row 3 (front), column 1: 0 cubes. Press to add one."
    - click: "Row 3 (front), column 1: 1 cube. Press to add one."
    - click: "Row 3 (front), column 2: 0 cubes. Press to add one."
    - expect: { selector: "#gsum", contains: "3 cubes: top 2 squares, front 3, side 2" }
    - wait: 1500
    - caption: { text: "A tower of 2 and a single cube: the front view has 3 squares.", say: "A tower of two and a single cube. The front view has three squares." }
    - wait: 1200
---
An **isometric drawing** shows a solid in 3D on isometric (triangle) paper. **Views** are flat drawings seen from one side: the **top** view (also called the plan), the **front** view and the **side** view (together called elevations). A view shows what you can see; cubes hidden behind others do not show.

## Predict: one view

```step
stage: predict
insight: "Committing to whether the front view gives the number of cubes shows whether they know a view hides cubes."
check:
  type: predict
  q: "You see only the front view of a pile of cubes. Can you tell how many cubes there are?"
  options: ["No: cubes behind the front ones do not show", "Yes: count the squares", "Only if you also know the side view"]
  actual: "No. A front view shows the tallest pile in each column; cubes behind it, or lower down, are hidden."
```

Picture a tall tower with a short pile directly behind it.

## Run: three views

```step
stage: run
insight: "Changing cubes and watching the three views shows what each view reveals and what it hides."
try: { playground: board, starter: "views.yml#run", height: 650 }
check: { type: board, text: "Change the piles so the top view has 4 squares and the front view has 5. Which piles did you change?", when: "t = 4 and f = 5", explain: "The top view counts the occupied cells; the front view counts, for each column, only the tallest pile." }
```

Press a cell in the grid to add a cube to that pile. After the tallest, it goes back to 0.

## Investigate: what a view shows

```step
stage: investigate
insight: "A view shows only the tallest pile in each column (Noor adds the piles); the top view with numbers shows the most."
tasks:
  - check:
      type: answer
      q: "A column has piles of 3, 1 and 2 cubes, one behind another. How many squares does the front view show for that column?"
      answer: "3"
      feedback:
        - ["6", "The front view shows only the tallest pile. The lower piles are hidden behind it."]
      explain: "The tallest pile is 3, so the front view shows 3 squares for that column."
  - check:
      type: bug
      code: "working.txt#noor"
      text: "Noor works out the front view of a column of piles. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: view-adds-up
      explain: "Line 3: a front view shows only the tallest pile in each column, not all of them added up."
  - check:
      type: question
      q: "Which drawing tells you exactly how many cubes there are?"
      options: ["A top view with the height written on each pile", "The front view", "The side view", "The top view with no numbers"]
      answer: 0
      feedback: [null, "It hides the piles behind the front ones.", "It hides the piles behind the nearest ones.", "It shows which cells have cubes, not how tall the piles are."]
      explain: "With a height on every pile, adding the numbers gives the total."
```

### Hidden cubes

How tall is the tallest pile?

### Find the mistake

Read Noor's working. What does the view show?

### Which drawing

## Modify: build to a description

```step
stage: modify
insight: "Building to a description uses the views to reason about hidden cubes: the fewest, the most, and the trade-offs of each drawing."
try: { playground: board, starter: "views.yml#free", height: 650 }
tasks:
  - starter: "views.yml#free"
    hint: ["Piles of 1 cube only.", "Use six of the nine cells, with at least one in every row and every column."]
    check: { type: board, text: "Build a shape with 6 cubes whose front view and side view each have 3 squares.", when: "n = 6 and f = 3 and s = 3", explain: "Six piles of one cube spread over the 3 by 3 base, with every row and every column used, give 3 squares in the front view and 3 in the side view." }
  - starter: "views.yml#free"
    check: { type: board, text: "Build the fewest cubes that give a top view of 4 squares.", when: "n = 4 and t = 4", explain: "Each square of the top view needs at least one cube, so the fewest is 4." }
  - starter: "views.yml#free"
    hint: ["The top view has 4 squares, so 4 piles.", "The tallest pile is 3, so every pile can be at most 3."]
    check: { type: board, text: "Build the most cubes you can with a top view of 4 squares and no pile taller than 3.", when: "n = 12 and t = 4 and h = 3", explain: "4 piles of 3 cubes make 12." }
  - starter: "views.yml#top"
    hint: ["Press a cell until its number matches.", "The numbers are back row 2 1 0, middle row 0 3 0, front row 0 0 1."]
    check: { type: board, text: "The top view of a solid has these heights. Back row: 2, 1, 0. Middle row: 0, 3, 0. Front row: 0, 0, 1. Build it. How many cubes?", when: "n = 7 and t = 4 and f = 6", explain: "2 + 1 + 3 + 1 = 7 cubes. The front view shows the tallest pile in each column: 2, 3 and 1, so 6 squares." }
  - check:
      type: question
      q: "What is one advantage of a net over a 3D drawing?"
      options: ["It shows every face at its true size, so you can find the surface area", "It shows what the solid looks like from the front", "It is quicker to draw", "It shows the height of every pile"]
      answer: 0
      feedback: [null, "That is a view.", "A net takes care to draw.", "That is a top view with numbers."]
      explain: "A net lays every face flat, true size; a 3D drawing shows what the solid looks like but squashes the faces."
```

### Six cubes

Both views must be 3 squares.

### The fewest

### The most

### From a top view

### Nets or drawings

## Practise: views

```step
stage: practise
insight: "Reading views and counting cubes, mixed; adding the piles is the planted slip; the cube net review keeps nets fresh."
try: { playground: board, starter: "views.yml#side", height: 600 }
tasks:
  - starter: "views.yml#side"
    check:
      type: answer
      q: "Look at the stack on the board. How many squares does its side view show?"
      answer: "3"
      feedback:
        - ["4", "That is the front view. The side view is seen from the right."]
      explain: "From the right, the rows give tallest piles 2, 0 and 1: 3 squares."
  - check:
      type: answer
      q: "A top view with heights is 3 1 on the top row and 0 2 on the bottom row. How many cubes are there?"
      answer: "6"
      feedback:
        - ["4", "That counts the squares. Add the heights: 3 + 1 + 0 + 2."]
      explain: "3 + 1 + 0 + 2 = 6 cubes."
  - check:
      type: question
      q: "Which view shows which cells of the base have cubes?"
      options: ["The top view", "The front view", "The side view", "The isometric drawing"]
      answer: 0
      feedback: [null, "The front view shows the heights of the columns seen from the front.", "The side view shows the heights from the right.", "It shows them, but in 3D, and hides some."]
      explain: "Looking down, the top view shows a square for every occupied cell."
  - check:
      type: question
      q: "Review: which of these six-square nets folds into a cube?"
      options: ["A cross: one square above and one below a row of four", "A 2 by 3 block", "A straight row of six", "A row of three above a row of three"]
      answer: 0
      feedback: [null, "Two squares land on the same face.", "The row wraps back on itself.", "Two squares land on the same face."]
      explain: "Only the cross-shaped net covers all six faces once."
```

### Side view

### Cube count

### The top view

### Review: nets

## Make: two designs

```step
stage: make
insight: "Building a solid whose three views match, then judging nets against drawings, brings the lesson's representations together."
try: { playground: board, starter: "views.yml#free", height: 650 }
hint: ["A top view of 5 squares needs 5 piles.", "Some piles must be 2 cubes tall, or the front and side views are too small."]
check: { type: board, text: "Build a solid whose top, front and side views each have 5 squares.", when: "t = 5 and f = 5 and s = 5", explain: "One answer, rows from back to front: 0 0 1, then 0 0 2, then 1 2 1. Five occupied cells; the tallest pile in each column adds to 5, and in each row to 5." }
```

Write one advantage and one disadvantage of nets and of 3D drawings.
