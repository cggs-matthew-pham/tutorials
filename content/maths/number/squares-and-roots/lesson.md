---
order: 4
unit: powers
node: [AC9M7N01 n1, AC9M7N01 n2]
title: Squares and square roots
summary: "A square number is the area of a square: 6² = 6 × 6 = 36. The square root undoes it: √36 = 6, the side of a square with area 36."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A square patio uses 49 tiles. How long is each side? Squares and square roots go back and forth between a side and an area."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8264
  url: http://127.0.0.1:8264/index.html
  readySelector: "#sl-s"
  layout: full
explainPicture: { ref: square.yml#explain-pic, caption: "A square of side 6 cm covers $6 \\times 6 = 36$ unit squares: $6^2 = 36$, so $\\sqrt{36} = 6$." }
explainClip:
  query: { code: "@square.yml#explain", fresh: 1, id: explain }
  caption: "Side and area"
  say: "A square number is the area of a square."
  clip:
    - caption: { text: "Side 4: 4 rows of 4. 4² = 16.", say: "Side four: four rows of four. Four squared is sixteen." }
    - wait: 800
    - caption: { text: "Side 5: 5 × 5 = 25, not 5 × 2.", say: "Side five: five times five is twenty-five." }
    - click: Make s bigger
    - expect: { selector: "#gsum", contains: "5 × 5 = 25" }
    - wait: 1000
    - caption: { text: "Back again: √25 = 5, the side.", say: "The square root goes back: the side is five." }
    - wait: 1400
---
Multiply a number by itself and you get its **square**: $6 \times 6 = 36$, written $6^2$ ("6 squared"). The name comes from the shape: a square with side 6 covers 36 unit squares. Numbers like 1, 4, 9, 16, 25 and 36 are **perfect squares**.

The **square root** goes the other way: $\sqrt{36} = 6$, because $6 \times 6 = 36$. It is the side of a square with that area.

## Predict: 5 squared

```step
stage: predict
insight: "Committing to a value for 5² shows whether they read the small 2 as 'times 2' (10) or as 'times itself' (25)."
check:
  type: predict
  q: "What is $5^2$?"
  options: ["25", "10", "7", "52"]
  actual: "25. 5² means 5 × 5: a square with side 5 has 5 rows of 5 unit squares. 10 is 5 × 2, double, not squared."
```

Picture a square with side 5. How many unit squares does it cover?

## Run: a square of 49

```step
stage: run
insight: "Growing the side until the area is 49 shows the square root as the side of a square with that area."
try: { playground: board, starter: "square.yml#run", height: 540 }
check: { type: board, text: "Change the side $s$ until the square's area is 49. What is $\\sqrt{49}$? Was your prediction for $5^2$ right?", when: "a = 49" }
```

$s$ is the side. The board counts the unit squares: the area.

## Investigate: squaring and its inverse

```step
stage: investigate
insight: "Squaring multiplies a number by itself, and the square root undoes it; Ava's mistake (5² = 10) is squaring as doubling, and its mirror is halving for a root."
tasks:
  - check:
      type: answer
      q: "Work out $\\sqrt{81}$."
      answer: "9"
      feedback:
        - ["40.5", "That is 81 ÷ 2, half. The square root is the number that times itself makes 81."]
        - ["6561", "That is 81 squared. The square root goes the other way."]
      explain: "9 × 9 = 81, so √81 = 9."
  - check:
      type: bug
      code: "working.txt#ava"
      text: "Ava finds the area of a square with side 5 cm. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: square-double
      explain: "Line 3: 5² means 5 × 5 = 25, not 5 × 2. The area is 25 cm²."
  - check:
      type: question
      q: "Why is $\\sqrt{64} = 8$?"
      options: ["Because $8 \\times 8 = 64$", "Because $64 \\div 8 = 8$ and $64 \\div 2 = 32$", "Because 64 is even"]
      answer: 0
      feedback: [null, "64 ÷ 8 = 8 is true, but the reason is that 8 times itself makes 64.", "Many even numbers are not perfect squares, such as 50."]
      explain: "The square root of 64 is the number that times itself makes 64: 8 × 8 = 64."
```

### Undo the square

The square root asks: what number, times itself, makes this?

```worked
6^2 = 6 \times 6 = 36 :: Squaring: multiply the number by itself (a square with side 6).
\sqrt{36} = 6 :: The square root goes back: 6 × 6 = 36, so the side is 6.
1,\ 4,\ 9,\ 16,\ 25,\ 36,\ 49,\ 64,\ 81,\ 100,\ 121,\ 144 :: The perfect squares from 1² to 12². Learn them.
```

Now try one: $\sqrt{81}$.

### Find the mistake

Read Ava's working. What does the small 2 mean?

### Why it works

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: the biggest square in the list, a root, a side from an area in context, a perimeter (two steps), then a number that is not a perfect square."
try: { playground: board, starter: "square.yml#big", height: 540 }
tasks:
  - starter: "square.yml#big"
    hint: "Try sides of 10, 11 and 12."
    check: { type: board, text: "Make a square with area 144 m².", when: "a = 144", explain: "12 × 12 = 144, so √144 = 12." }
  - check:
      type: answer
      q: "Work out $\\sqrt{121}$."
      answer: "11"
      feedback:
        - ["60.5", "That is half of 121."]
      explain: "11 × 11 = 121."
  - check:
      type: answer
      q: "A square tile has area 64 cm². How long is each side, in cm?"
      answer: "8"
      feedback:
        - ["32", "That is half of 64. Which number times itself makes 64?"]
        - ["16", "16 × 16 = 256. Try a smaller side."]
      explain: "√64 = 8, so each side is 8 cm."
  - check:
      type: answer
      q: "A square garden has area 49 m². What is its perimeter, in metres?"
      answer: "28"
      feedback:
        - ["7", "7 m is one side. The perimeter goes all the way round: 4 sides."]
        - ["196", "That is 4 × 49. Find the side first: √49."]
      explain: "Side = √49 = 7 m. Perimeter = 4 × 7 = 28 m."
  - check:
      type: question
      q: "Edge case: is 50 a perfect square?"
      options: ["No: 7² = 49 and 8² = 64, and no whole number squares to 50", "Yes: 50 = 25 × 2", "Yes: √50 = 25"]
      answer: 0
      feedback: [null, "25 × 2 is not a number times itself.", "25 × 25 = 625, not 50."]
      explain: "50 is between 49 (7²) and 64 (8²), so no whole number squares to 50. The next lesson finds roots like √50."
```

### The biggest in the list

Each task changes one thing.

### A root

### A side from an area

### Two steps: the perimeter

### Not a perfect square

## Practise: squares and roots

```step
stage: practise
insight: "Squares, roots and a side from an area, mixed; doubling is the planted slip; the review keeps integers fresh."
tasks:
  - check:
      type: answer
      q: "Work out $9^2$."
      answer: "81"
      feedback:
        - ["18", "That is 9 × 2. Squaring is 9 × 9."]
      explain: "9 × 9 = 81."
  - check:
      type: answer
      q: "Work out $\\sqrt{100}$."
      answer: "10"
      feedback:
        - ["50", "That is half of 100."]
      explain: "10 × 10 = 100."
  - check:
      type: answer
      q: "A square rug has area 9 m². How long is each side, in metres?"
      answer: "3"
      feedback:
        - ["4.5", "That is half of 9."]
        - ["81", "That is 9 squared. The side is the square root of the area."]
      explain: "√9 = 3, so each side is 3 m."
  - check:
      type: answer
      q: "Review: work out $-4 \\times 3$."
      answer: "-12"
      feedback:
        - ["12", "A negative times a positive is negative."]
      explain: "4 × 3 = 12, and the signs differ, so −12."
```

### Square

### Root

### A side

### Review: integers

## Make: a bigger square

```step
stage: make
insight: "Choosing a perfect square past 100 and naming its root extends the list beyond 12² by the same reasoning."
try: { playground: board, starter: "square.yml#make", height: 560 }
hint: ["Try a side of 13 or 14.", "The area is side × side."]
check: { type: board, text: "Make a perfect square bigger than 144 (past the list).", when: "a > 144", explain: "13² = 169, 14² = 196, 15² = 225: so √169 = 13, √196 = 14, √225 = 15." }
```

Then write its square root, and check by multiplying.
