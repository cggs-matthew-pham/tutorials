---
order: 2
unit: rules
node: AC9M7A05 n2
uses: [AC9M7N07 n2]   # negative inputs and outputs (3(0) − 1 = −1); a quick check in Modify retrieves it
title: Tables from rules
summary: A rule turns each input x into an output y. Choose inputs, work out each output, and write them as a table of ordered pairs (x, y), input first.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A spreadsheet column, a recipe scaled for more people, a taxi meter: each one takes a number in and gives a number out by the same rule, every time."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8141
  url: http://127.0.0.1:8141/index.html
  readySelector: "#rx"
  layout: full
explainClip:
  query: { code: "@rule.yml#explain", fresh: 1, id: explain }
  caption: "Input x, work out y, write the pair (x, y)"
  say: "Put in x, work out y, then write the pair, with x first."
  clip:
    - caption: { text: "The rule y = 3x − 1. Choose an input: x = 0.", say: "The rule is y equals three x minus one; choose the input zero." }
    - type: { into: "Input x =", text: "0" }
    - click: Put it in
    - wait: 400
    - caption: { text: "Put 0 in place of x: y = 3(0) − 1 = −1.", say: "Put zero in place of x: three times zero, minus one, is negative one." }
    - caption: { text: "The pair is (0, −1): input first.", say: "The pair is zero, negative one, with the input first." }
    - wait: 400
    - click: Put it in
    - caption: { text: "x = 1 gives y = 2. Every input gets its own output.", say: "An input of one gives two; every input gets its own output." }
    - wait: 400
    - click: Put it in
    - click: Put it in
    - caption: { text: "The table of values: inputs on top, outputs underneath.", say: "This is the table of values, with inputs on top and outputs underneath." }
    - expect: { selector: ".rulepairs", contains: "(3, 8)" }
    - wait: 1200
---
In the last lesson, a pattern gave a rule. Now we start from the rule. A **rule** such as $y = 2x + 3$ takes an **input** $x$ and gives an **output** $y$. A **table of values** lists inputs and their outputs. Each column is an **ordered pair** $(x, y)$: input first, output second.

## Predict: which pair?

```step
stage: predict
insight: "Committing to a pair before using the machine shows whether students keep input and output separate, and in order."
check:
  type: predict
  q: "Which pair belongs in the table for $y = 2x + 3$?"
  options: ["$(4, 11)$", "$(4, 4)$", "$(11, 4)$", "$(4, 27)$"]
  actual: "(4, 11). The input is x = 4; the output is y = 2 × 4 + 3 = 11. The pair is written (input, output)."
```

$$y = 2x + 3$$

Pick the input $x = 4$. What output $y$ does the rule give? Which number goes first in the pair?

## Run: the rule machine

```step
stage: run
insight: "Putting inputs in one at a time and seeing the substitution makes the table's two rows mean something: what goes in, and what comes out."
try: { playground: board, starter: "rule.yml#run", height: 460 }
check: { type: board, text: "Make a table of at least 4 ordered pairs for $y = 2x + 3$.", when: "k >= 4" }
```

Type an input $x$ and press **Put it in**. The machine shows the working and adds the pair to the table. Try $x = 0, 1, 2, 3$. Was your predicted pair right?

## Investigate: making a table

```step
stage: investigate
insight: "Each output comes from putting its own input into the rule; the pair keeps them together, input first."
tasks:
  - check:
      type: trace
      text: "Fill in the table for $y = 4x + 2$."
      table: |
        | x (input) | 0 | 1 | 2 | 3 |
        | y (output) | 2 | [6] | [10] | [14] |
      explain: "Put each input into the rule: 4 × 1 + 2 = 6, 4 × 2 + 2 = 10, 4 × 3 + 2 = 14."
  - check:
      type: bug
      code: "working.txt#jo"
      text: "Jo makes a pair for $y = 2x + 1$. Click the line where her working goes wrong."
      answer: 4
      fault: logic
      misconception: pair-order
      explain: "Line 4: the input comes first in an ordered pair. The input is 3 and the output is 7, so the pair is (3, 7)."
  - check:
      type: question
      q: "The pair $(5, 13)$ is in the table for $y = 2x + 3$. Which number is the input?"
      options: ["5", "13", "Both are inputs"]
      answer: 0
      explain: "The first number is the input: x = 5. The rule gives the output 2 × 5 + 3 = 13."
```

### A table of values

Here is how to make a table from a rule.

```worked
y = 3x - 1 :: Make a table of values for this rule, for the inputs 0 to 3.
x = 0: \; y = 3(0) - 1 = -1 :: Choose an input and put it in place of $x$.
x = 1: \; y = 3(1) - 1 = 2 :: Each input gives its own output. Do not use the same number for both.
x = 2: \; y = 5, \quad x = 3: \; y = 8 :: Work out the rest the same way.
(0, -1), (1, 2), (2, 5), (3, 8) :: Write each as an ordered pair: input first, output second.
```

| $x$ (input) | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $y$ (output) | −1 | 2 | 5 | 8 |

### Find the mistake

Read Jo's working one line at a time. Which number should come first?

### Input or output?

## Modify: new rules and inputs

```step
stage: modify
insight: "One change at a time: a rule with subtraction, negative inputs (after a quick check of adding to a negative, from Number Foundations), a rule whose output goes down, and a table that starts from the output."
try: { playground: board, starter: "rule.yml#subtract", height: 460 }
tasks:
  - starter: "rule.yml#subtract"
    check:
      type: trace
      text: "Fill in the table for $y = 3x - 2$. Use the machine to check."
      table: |
        | x | 1 | 2 | 3 | 4 |
        | y | [1] | [4] | [7] | [10] |
      explain: "3 × 1 − 2 = 1, 3 × 2 − 2 = 4, 3 × 3 − 2 = 7, 3 × 4 − 2 = 10."
  - check:
      type: answer
      q: "Quick check before negative inputs: what is $-4 + 3$?"
      answer: "-1"
      feedback:
        - ["-7", "That adds the sizes. Start at −4 on a number line and move 3 to the right."]
        - ["1", "Start at −4 on a number line and move 3 to the right: you are still below zero."]
        - ["7", "−4 is below zero. Start there and move 3 to the right."]
      explain: "Start at −4 and move 3 to the right: −1. You need this for x = −2 in y = 2x + 3: 2(−2) + 3 = −4 + 3 = −1."
  - starter: "rule.yml#negative"
    hint: "Put −1 in place of x with brackets: 2(−1) + 3."
    check: { type: board, text: "For $y = 2x + 3$, put in at least 3 inputs, including negative ones.", when: "k >= 3 and l < 0", explain: "A negative input works the same way: x = −2 gives y = 2(−2) + 3 = −1." }
  - starter: "rule.yml#down"
    check:
      type: trace
      text: "Fill in the table for $y = 10 - 2x$. What happens to the output as the input goes up?"
      table: |
        | x | 0 | 1 | 2 | 3 |
        | y | [10] | [8] | [6] | [4] |
      explain: "10 − 2 × 0 = 10, then 8, 6, 4: the output goes down by 2 each time."
  - check:
      type: answer
      q: "For $y = 2x + 3$, which input gives the output 15?"
      answer: "6"
      feedback:
        - ["33", "That puts 15 in as the input. Here 15 is the output: which x gives it?"]
        - ["9", "Check: 2 × 9 + 3 = 21, not 15."]
      explain: "2x + 3 = 15, so 2x = 12 and x = 6. The pair is (6, 15)."
```

### Subtraction

### Quick check

Negative inputs give sums such as $-4 + 3$. Work this one out first: start at $-4$ on a number line, then move.

### Negative inputs

The machine now takes inputs from −5 to 5.

### Going down

### Backwards

## Practise: rules and pairs

```step
stage: practise
insight: "Working out outputs, matching a table to its rule and keeping pairs in order, mixed; the review is a pattern rule from the last lesson."
tasks:
  - check:
      type: answer
      q: "For $y = 5x - 4$, what is the output when the input is 3?"
      answer: "11"
      feedback:
        - ["49", "It looks like 5x became 53. 5x means 5 × x: 5 × 3 = 15."]
        - ["15", "That is 5 × 3. Now take away 4."]
      explain: "5 × 3 − 4 = 15 − 4 = 11."
  - check:
      type: question
      q: "Which table goes with the rule $y = x + 4$?"
      options:
        - "x: 0, 1, 2 and y: 4, 5, 6"
        - "x: 0, 1, 2 and y: 0, 4, 8"
        - "x: 4, 5, 6 and y: 0, 1, 2"
      answer: 0
      explain: "Each output is 4 more than its input: 0 + 4 = 4, 1 + 4 = 5, 2 + 4 = 6. The third table has inputs and outputs swapped."
  - check:
      type: question
      q: "For $y = 3x + 1$, which is an ordered pair from its table?"
      options: ["$(2, 7)$", "$(7, 2)$", "$(2, 2)$"]
      answer: 0
      explain: "Input 2, output 3 × 2 + 1 = 7: the pair is (2, 7)."
  - check:
      type: answer
      q: "Review: a pattern has 7, 12, 17, 22 tiles in Figures 1 to 4. Write a rule for the tiles $s$ in figure $n$."
      answer: "5n + 2"
      feedback:
        - ["5n", "That gives 5, 10, 15: two short each time."]
        - ["7n", "Check Figure 2: 7 × 2 = 14, but it has 12. How many does each figure add?"]
      explain: "It adds 5 each time, and Figure 1 is 5 + 2: s = 5n + 2."
```

### An output

### Which table?

### Which pair?

### Review

## Make: find the rule

```step
stage: make
insight: "Writing a rule that makes given pairs reverses the lesson: from the table back to the rule."
hint: ["From x = 2 to x = 3, how much does y go up?", "That is the number in front of x. Then what do you add to make the first pair work?"]
check:
  type: answer
  q: "Write a rule whose table includes the pairs $(2, 7)$ and $(3, 9)$. Start with $y =$."
  answer: "2x + 3"
  feedback:
    - ["3x + 1", "Check (3, 9): 3 × 3 + 1 = 10, not 9."]
    - ["x + 5", "Check (3, 9): 3 + 5 = 8, not 9."]
  explain: "y = 2x + 3: the output goes up 2 when the input goes up 1, and 2 × 2 + 3 = 7."
```

Use what you know from the pattern lesson: how much does the output go up when the input goes up by 1? Then check your rule with both pairs.

Stretch: write a rule of your own, then give a partner two of its pairs and see if they can find it.
