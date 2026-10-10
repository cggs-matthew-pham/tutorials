---
order: 1
unit: rules
node: AC9M7A05 n1
title: Growing patterns
summary: In a growing pattern, look at what each new figure adds. That gives a rule, and the rule gives any figure without drawing it.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Tiles along a path, seats around joined tables, fence posts and rails: each one grows by the same amount every time. A rule tells you how many you need for any length."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8140
  url: http://127.0.0.1:8140/index.html
  readySelector: "#sl-n"
  layout: full
explainPicture: { ref: pattern.yml#pic, caption: "Figure 4 has 13 sticks. Each new square adds 3 (orange), and there is 1 extra stick at the start: $s = 3n + 1$." }
explainClip:
  query: { code: "@pattern.yml#explain", fresh: 1, id: explain }
  caption: "Each figure adds the same amount: that gives the rule"
  say: "Each figure adds the same amount, and that gives the rule."
  clip:
    - caption: { text: "Figure 1 is one square: 4 sticks.", say: "Figure one is one square, made of four sticks." }
    - wait: 400
    - caption: { text: "Figure 2 adds a square, sharing a side: 3 new sticks (orange).", say: "Figure two adds a square, but it shares a side, so only three new sticks." }
    - click: Make n bigger
    - wait: 400
    - caption: { text: "Figure 3 adds 3 more. Every new square adds 3.", say: "Every new square adds three more sticks." }
    - click: Make n bigger
    - wait: 400
    - click: Make n bigger
    - caption: { text: "Figure n: n lots of 3, plus the first stick: s = 3n + 1.", say: "Figure n has n lots of three, plus one: s equals three n plus one." }
    - caption: { text: "Figure 4: 3 × 4 + 1 = 13.", say: "Figure four is three times four, plus one, which is thirteen." }
    - expect: { selector: ".patlabel", contains: "13 sticks" }
    - wait: 1200
---
A **growing pattern** is a set of figures where each one adds the same amount to the one before. Number the figures 1, 2, 3, … and call the figure number $n$. In this lesson you find a **rule** that gives the number of sticks (or dots) in figure $n$, so you can work out a figure you have not drawn.

## Predict: Figure 10

```step
stage: predict
insight: "Committing to Figure 10 before seeing it exposes the most common shortcut: multiplying Figure 1 instead of looking at what each figure adds."
check:
  type: predict
  q: "A row of squares is made of sticks. Figure 1 (one square) has 4 sticks, Figure 2 has 7 and Figure 3 has 10. How many sticks does Figure 10 have?"
  options: ["31", "40", "30", "13"]
  actual: "31. Each new square adds 3 sticks (it shares a side with the square before), so Figure 10 has 4 + 9 × 3 = 31. Another way: 3 × 10 + 1 = 31."
```

| Figure | 1 | 2 | 3 |
|---|---|---|---|
| Sticks | 4 | 7 | 10 |

How many sticks does each new figure add? Where do they go?

## Run: grow the pattern

```step
stage: run
insight: "Seeing each new square in orange shows why the pattern adds 3, not 4: the new square shares a side."
try: { playground: board, starter: "pattern.yml#run", height: 420 }
check: { type: board, text: "Go to Figure 10. How many sticks? Was your prediction right?", when: "n = 10" }
```

Move through the figures with the slider or the − and + buttons. The orange sticks are the ones each figure adds.

## Investigate: from pattern to rule

```step
stage: investigate
insight: "The amount added each time is the number in front of n; what every figure has before that is the number added on. The rule gives any figure."
tasks:
  - picture: { ref: pattern.yml#pic, caption: "Figure 4: 4 squares. 3 new sticks for each square (12), plus the first stick on the left: 13." }
    check:
      type: trace
      text: "The triangle pattern: Figure 1 has 3 sticks, Figure 2 has 5, Figure 3 has 7. Fill in the table."
      table: |
        | figure n | 1 | 2 | 3 | 4 | 5 |
        | sticks s | 3 | 5 | 7 | [9] | [11] |
      explain: "Each new triangle adds 2 sticks: 7, 9, 11."
  - check:
      type: bug
      code: "working.txt#ben"
      text: "Ben works out Figure 10 of the squares pattern. Click the line where his reasoning goes wrong."
      answer: 2
      fault: logic
      misconception: pattern-scaling
      explain: "Line 2: the squares share sides, so Figure 10 is not 10 separate copies of Figure 1. Each new square adds only 3 sticks: 3 × 10 + 1 = 31."
  - check:
      type: answer
      q: "Write a rule for the number of sticks $s$ in figure $n$ of the triangle pattern (3, 5, 7, 9, …)."
      answer: "2n + 1"
      feedback:
        - ["2n", "That gives 2, 4, 6: one short each time. What does every figure have before the new sticks?"]
        - ["n + 2", "Check Figure 2: 2 + 2 = 4, but it has 5 sticks. How many does each figure add?"]
        - ["3n", "Check Figure 2: 3 × 2 = 6, but it has 5. Each figure adds 2, not 3."]
      explain: "s = 2n + 1: each triangle adds 2 sticks, plus the 1 stick at the start. Check Figure 3: 2 × 3 + 1 = 7."
```

### Finding the rule

Here is how to turn the squares pattern into a rule.

```worked
n: 1, 2, 3, 4 \;\to\; s: 4, 7, 10, 13 :: Count the sticks in the first few figures and put them in a table.
+3 \text{ each time} :: Each new square needs 3 more sticks: a top, a bottom and a side.
3n :: So figure $n$ has $n$ lots of 3 sticks...
3n + 1 :: ...plus the first stick on the left, which every figure has.
s = 3n + 1 :: The rule: sticks = 3 × figure number + 1.
n = 10: \; s = 3(10) + 1 = 31 :: Use the rule for a figure you have not drawn.
```

### Find the mistake

Read Ben's working one line at a time. Is Figure 10 really 10 copies of Figure 1?

### Your turn

Use the table you filled in for the triangles.

## Modify: new patterns

```step
stage: modify
insight: "One change at a time: a different amount added, a pattern of dots, a different starting group, and working backwards from a count to the figure."
try: { playground: board, starter: "pattern.yml#triangles", height: 420 }
tasks:
  - starter: "pattern.yml#triangles"
    check:
      type: answer
      q: "How many sticks are in Figure 20 of the triangle pattern?"
      answer: "41"
      feedback:
        - ["60", "That treats each triangle as 3 separate sticks. Each new triangle adds only 2."]
        - ["40", "That is 2 × 20. Add the stick every figure starts with."]
      explain: "s = 2n + 1 = 2 × 20 + 1 = 41."
  - starter: "pattern.yml#cross"
    check:
      type: answer
      q: "Each figure of the cross pattern adds a dot to each arm. How many dots are in Figure 15?"
      answer: "61"
      feedback:
        - ["60", "That is 4 × 15. Don't forget the centre dot."]
        - ["16", "Each figure adds 4 dots, one on each arm, not 1."]
      explain: "4 new dots each figure, plus the centre: s = 4n + 1 = 4 × 15 + 1 = 61."
  - starter: "pattern.yml#columns"
    check:
      type: answer
      q: "Each figure adds a column of 3 dots to a starting group of 2. Write a rule for the dots $s$ in figure $n$."
      answer: "3n + 2"
      feedback:
        - ["2n + 3", "Which number is added every figure (the column), and which is there from the start?"]
        - ["3n", "That leaves out the starting group of 2."]
      explain: "s = 3n + 2: 3 dots added each figure, and 2 in the starting group. Check Figure 1: 3 + 2 = 5."
  - starter: "pattern.yml#reverse"
    hint: ["The rule is s = 3n + 1, and s is 46.", "Take away the 1, then share by 3: backtracking."]
    check:
      type: answer
      q: "Working backwards: which figure of the squares pattern has 46 sticks?"
      answer: "15"
      feedback:
        - ["139", "That puts 46 in as the figure number. Here 46 is the number of sticks: which figure gives 46?"]
        - ["16", "Check: 3 × 16 + 1 = 49, not 46."]
      explain: "3n + 1 = 46, so 3n = 45 and n = 15. Check: 3 × 15 + 1 = 46."
```

### Triangles

Each task loads a new pattern. Use the board to see what each figure adds.

### A cross of dots

### A starting group

### Backwards

## Practise: patterns and rules

```step
stage: practise
insight: "Finding a rule from a table, using a rule for a far figure and working backwards, mixed; the review is solving an equation from the Equations unit."
tasks:
  - check:
      type: answer
      q: "A pattern has 5, 9, 13, 17 dots in Figures 1 to 4. Write a rule for the dots $s$ in figure $n$."
      answer: "4n + 1"
      feedback:
        - ["5n", "Check Figure 2: 5 × 2 = 10, but it has 9. How many does each figure add?"]
        - ["4n", "That gives 4, 8, 12: one short. What is left over?"]
      explain: "It adds 4 each time, and Figure 1 is 4 + 1: s = 4n + 1."
  - check:
      type: answer
      q: "A pattern's rule is $s = 5n + 3$. How many are in Figure 12?"
      answer: "63"
      feedback:
        - ["60", "That is 5 × 12. Add the 3."]
        - ["96", "5n + 3 means 5 × n, then add 3: 5 × 12 + 3."]
      explain: "5 × 12 + 3 = 60 + 3 = 63."
  - check:
      type: answer
      q: "Using $s = 2n + 1$ (the triangles), which figure has 25 sticks?"
      answer: "12"
      feedback:
        - ["51", "That puts 25 in as the figure number. Which n gives 25 sticks?"]
        - ["13", "Check: 2 × 13 + 1 = 27, not 25."]
      explain: "2n + 1 = 25, so 2n = 24 and n = 12."
  - check:
      type: answer
      q: "Review: solve $3n + 1 = 31$."
      answer: "10"
      feedback:
        - ["32", "Undo + 1 by taking away 1, then undo × 3 by dividing."]
      explain: "3n = 30, so n = 10. That is the squares pattern: Figure 10 has 31 sticks."
```

### Table to rule

### A far figure

### Backwards again

### Review

## Make: design a pattern

```step
stage: make
insight: "Designing a pattern to hit a target count reverses the lesson: from the rule's numbers to the picture."
try: { playground: board, starter: "pattern.yml#make", height: 520 }
hint: ["Figure 10 has 10 columns of a dots, plus b in the starting group: 10a + b.", "Try a = 5. How many must the starting group have for 52?"]
check: { type: board, text: "Set $a$ (dots in each new column) and $b$ (the starting group) so that Figure 10 has 52 dots. Show Figure 10.", when: "n = 10 and s = 52", explain: "Your pattern has 10a + b = 52 dots in Figure 10." }
```

Design your own growing pattern of dots: $a$ dots in each new column, and $b$ dots to start with. Make Figure 10 have exactly 52 dots. Is there more than one way?

Stretch: write the rule for your pattern, and say how many dots Figure 100 has.
