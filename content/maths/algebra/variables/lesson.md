---
order: 1
unit: expressions
title: Letters that vary
summary: In a formula, letters stand for quantities that can change (variables) and numbers stay the same (constants). In an equation, a letter can stand for one unknown number.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Recipes, phone bills and the perimeter of a garden bed all follow a formula. The letters are what changes; the numbers are what stays."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8142
  url: http://127.0.0.1:8142/index.html
  readySelector: "#sl-l"
  layout: full
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Variables change; constants stay the same"
  say: "In a formula, the letters can change, and the numbers stay the same."
  clip:
    - caption: { text: "P = 2l + 2w: the perimeter of a rectangle.", say: "P equals two l plus two w: the perimeter of a rectangle." }
    - click: Make l bigger
    - click: Make l bigger
    - caption: { text: "Change l: the rectangle and P change.", say: "Change l, and the rectangle and its perimeter change too." }
    - click: Make w bigger
    - caption: { text: "Change w: P changes again. The 2s never do.", say: "Change w, and P changes again; the twos never change." }
    - caption: { text: "l, w and P are variables; the 2s are constants.", say: "So l, w and P are variables, and the twos are constants." }
    - expect: { selector: ".rulework", contains: "P = 2 × 6 + 2 × 3" }
    - wait: 1200
---
In maths a letter can stand for a number. A **formula** such as $P = 2l + 2w$ uses letters for quantities, here the perimeter $P$, length $l$ and width $w$ of a rectangle. This lesson is about what the letters and numbers in a formula mean.

## Predict: what changes?

```step
stage: predict
insight: "Committing to which parts change exposes the idea that each letter stands for one fixed number."
check:
  type: predict
  q: "$P = 2l + 2w$ gives the perimeter of a rectangle. When you draw a different rectangle, which parts of the formula change?"
  options:
    - "$l$, $w$ and $P$ change; the 2s stay the same"
    - "Only $P$ changes"
    - "Nothing: each letter stands for one fixed number"
    - "The 2s change as well"
  actual: "l, w and P change, because different rectangles have different lengths, widths and perimeters. The 2s stay the same for every rectangle: there are always two lengths and two widths."
```

$$P = 2l + 2w$$

Think of two different rectangles: a long thin one and a square. What is the same about how you find their perimeters?

## Run: change the rectangle

```step
stage: run
insight: "Moving l and w and watching P change, while the 2s never do, shows what a variable is."
try: { playground: board, starter: "formula.yml#run", height: 520 }
check: { type: board, text: "Make a rectangle 7 cm long and 2 cm wide. What is its perimeter?", when: "l = 7 and w = 2" }
```

Change $l$ and $w$. Watch the rectangle, the working and $P$. Which numbers in the formula never change?

## Investigate: variables, constants and unknowns

```step
stage: investigate
insight: "A variable is a letter for a quantity that can change; a constant stays the same; in an equation a letter can be an unknown, one particular number."
tasks:
  - check:
      type: question
      q: "A plumber charges $C = 5h + 20$ dollars for a job of $h$ hours. Which are the variables?"
      options: ["$C$ and $h$", "5 and 20", "Only $h$"]
      answer: 0
      explain: "C and h change from job to job. 5 (dollars an hour) and 20 (the call-out fee) are constants: the same for every job."
  - check:
      type: bug
      code: "working.txt#kim"
      text: "Kim works out the perimeter. Click the line where her thinking goes wrong."
      answer: 2
      fault: logic
      misconception: letter-alphabet
      explain: "Line 2: a letter stands for a quantity, here the length, not its place in the alphabet. l can be any length: you need to measure or be told it."
  - check:
      type: question
      q: "In the equation $3x + 2 = 14$, what does $x$ stand for?"
      options: ["An unknown: one number makes it true", "A variable that can be any number", "The letter x, not a number"]
      answer: 0
      explain: "In an equation, the letter is an unknown: only x = 4 makes 3x + 2 = 14 true. In a formula, a letter is a variable that can take many values."
```

### Reading a formula

Here is how to read the parts of a formula.

```worked
P = 2l + 2w :: The perimeter of a rectangle: twice the length plus twice the width.
P, \; l, \; w :: These letters are **variables**: quantities that change from one rectangle to the next.
2 :: The 2s are **constants**: they are the same for every rectangle.
l = 5, \; w = 3 :: For one particular rectangle, each variable has a value.
3x + 2 = 14 :: In an equation, a letter can be an **unknown**: one particular number.
x = 4 :: Only one value makes this equation true.
```

### Find the mistake

Read Kim's working one line at a time. What does $l$ stand for?

### Unknown or variable?

## Modify: other formulas

```step
stage: modify
insight: "One change at a time: a formula with a constant added, one with a single variable, a product of two variables, and a letter that is a constant."
try: { playground: board, starter: "formula.yml#plumber", height: 420 }
tasks:
  - starter: "formula.yml#plumber"
    check:
      type: answer
      q: "In $C = 5h + 20$, what is the charge for a job of 0 hours (just the call-out)?"
      answer: "20"
      feedback:
        - ["25", "Put 0 in place of h: 5 × 0 = 0. What is left?"]
        - ["0", "The 20 is a constant: it is paid even when h is 0."]
      explain: "C = 5 × 0 + 20 = 20. The constant 20 is the call-out fee."
  - starter: "formula.yml#drive"
    check:
      type: question
      q: "A car travels at 60 km/h: $d = 60t$. Which part stays the same for the whole trip?"
      options: ["60, the speed", "$d$, the distance", "$t$, the time"]
      answer: 0
      explain: "The speed 60 is a constant. The time t and the distance d both change as the trip goes on."
  - starter: "formula.yml#area"
    check:
      type: question
      q: "In $A = lw$ (the area of a rectangle), what happens to $A$ if $l$ doubles and $w$ stays the same?"
      options: ["$A$ doubles", "$A$ stays the same", "$A$ goes up by 2"]
      answer: 0
      explain: "lw means l × w. Twice the length times the same width gives twice the area. Try it on the board."
  - check:
      type: question
      q: "The circumference of a circle is $C = \\pi d$. $\\pi$ is a letter. Is it a variable or a constant?"
      options: ["A constant: about 3.14 for every circle", "A variable: it changes with the circle", "An unknown we need to solve for"]
      answer: 0
      explain: "π (pi) is a Greek letter for one particular number, about 3.14, the same for every circle. C and d are the variables."
```

### A plumber

Each task loads a new formula. Change the variables and watch what stays the same.

### A car trip

### Area

### A letter that never changes

## Practise: read the formula

```step
stage: practise
insight: "Naming variables, constants and unknowns, and saying what a constant means, in new formulas."
tasks:
  - check:
      type: question
      q: "Water in a tank: $V = 3t + 10$ litres after $t$ minutes. What does the 10 mean?"
      options: ["10 litres in the tank at the start", "10 litres added every minute", "The tank fills in 10 minutes"]
      answer: 0
      explain: "When t = 0, V = 10: the 10 litres were there at the start. 3 litres are added each minute."
  - check:
      type: question
      q: "Which letters are variables in $T = 12n + 6$ (the cost of $n$ concert tickets)?"
      options: ["$T$ and $n$", "12 and 6", "Only $T$"]
      answer: 0
      explain: "T and n change with the order. 12 (dollars a ticket) and 6 (the booking fee) stay the same."
  - check:
      type: question
      q: "In $2y + 1 = 9$, what is $y$?"
      options: ["An unknown: $y = 4$ makes it true", "A variable: any value works", "A constant"]
      answer: 0
      explain: "It is an equation, so y is an unknown: 2 × 4 + 1 = 9, and no other value works."
```

### What the constant means

### Variables

### Unknown

## Make: a formula of your own

```step
stage: make
insight: "Writing a formula for a familiar shape reverses the lesson: from the quantities to the letters and constants."
hint: ["A square has four equal sides, each s long.", "How many lots of s make the perimeter?"]
check:
  type: answer
  q: "A square has sides of length $s$. Write a formula for its perimeter $P$. Start with $P =$."
  answer: "4s"
  feedback:
    - ["s + 4", "That adds 4 to one side. The perimeter is all four sides added up."]
    - ["2s", "That is two sides. A square has four."]
  explain: "P = 4s: four sides, each s long. 4 is a constant; P and s are variables."
```

Name the variables and the constant in your formula.

Stretch: write a formula for the perimeter of a triangle with sides $a$, $b$ and $c$.
