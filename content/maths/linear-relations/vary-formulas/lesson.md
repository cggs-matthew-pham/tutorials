---
order: 12
unit: rules
node: [AC9M7A06 n1, AC9M7A06 n2]
uses: [AC9M7A01 n2]   # substituting into a formula
title: Changing one thing at a time
summary: "To see what one variable does to a formula, change only that one and hold the rest still. Doubling h in V = lwh doubles V; doubling the side of a square makes its area four times as big."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A scientist testing a plant changes the light, but not the water. In a formula, that is how you find what each letter does."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8301
  url: http://127.0.0.1:8301/index.html
  readySelector: "#sl-h"
  layout: full
explainPicture: { ref: formula.yml#explain-pic, caption: "With $l = 2$ and $w = 3$ held still, a taller box (h = 3) has volume $2 \\times 3 \\times 3 = 18$." }
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Only h changes"
  say: "Hold l and w still. Change only h."
  clip:
    - caption: { text: "l = 2 and w = 3 stay fixed. h = 1 gives V = 6.", say: "L and w stay fixed. H is one, so V is six." }
    - wait: 800
    - caption: { text: "Make h bigger, and V grows by 6 each time.", say: "Make h bigger, and V grows by six each time." }
    - click: Make h bigger
    - click: Make h bigger
    - expect: { selector: "body", contains: "2 × 3 × 3" }
    - wait: 1500
---
A **formula** has several variables, such as $V = l \times w \times h$. To find out what one variable does to the output, **vary it systematically**: change that one, keep every other variable the same, and write the results in a table.

| $h$ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| $V$ (with $l = 2$, $w = 3$) | 6 | 12 | 18 | 24 |

## Predict: doubling h

```step
stage: predict
insight: "Committing to what doubling h does to V shows whether they see volume as a product, where doubling one factor doubles the output."
check:
  type: predict
  q: "A box has $l = 2$, $w = 3$ and $h = 2$, so $V = 12$. What is $V$ when $h$ is doubled to 4 and the rest stay the same?"
  options: ["24", "16", "14", "12"]
  actual: "24. V = 2 × 3 × 4 = 24: doubling one factor doubles the product."
```

Keep l and w the same.

## Run: change only h

```step
stage: run
insight: "Moving only h and reading V, with l and w held still, shows the pattern for one variable at a time."
try: { playground: board, starter: "formula.yml#run", height: 520 }
check: { type: board, text: "Keep $l = 2$ and $w = 3$. Move $h$ up from 1 to 4 and watch $V$. Was your prediction right?", when: "l = 2 and w = 3 and h = 4", explain: "V = 6, 12, 18, 24: each step of 1 in h adds 6 to V, because l × w = 6." }
```

Move one slider at a time.

## Investigate: a fair test

```step
stage: investigate
insight: "A fair test changes one variable (Tom changes two); a table shows the pattern; some variables matter more than others."
tasks:
  - check:
      type: answer
      q: "With $l = 2$ and $w = 3$, $V$ is 6, 12, 18 when $h$ is 1, 2, 3. By how much does $V$ go up for each extra 1 in $h$?"
      answer: "6"
      feedback:
        - ["1", "That is how much h goes up. Look at V: 6 to 12."]
      explain: "V goes up by 6 each time, which is l × w = 2 × 3."
  - check:
      type: bug
      code: "working.txt#tom"
      text: "Tom wants to know what h does to V. Click the line where his test stops being fair."
      answer: 3
      fault: logic
      misconception: vary-two-at-once
      explain: "Line 3: he changes w as well as h, so he cannot tell which caused the change in V. Change h alone: V = 2 × 3 × 2 = 12."
  - check:
      type: question
      q: "To find the effect of $w$ on $V = lwh$, what should you do?"
      options: ["Change w only, and keep l and h the same", "Change l, w and h together", "Change l and h only", "Change w and h together"]
      answer: 0
      feedback: [null, "You could not tell which letter did what.", "w is the letter you want to test.", "Then h would also change V."]
      explain: "Isolate one variable at a time: that is a fair test."
```

### The pattern in the table

Look at the V row.

### A fair test?

Read Tom's working. What did he change?

### What to change

## Modify: other formulas

```step
stage: modify
insight: "The same method on distance and on a square: both variables doubling, a square growing faster than its side, and the variable with the biggest effect."
try: { playground: board, starter: "formula.yml#distance", height: 520 }
tasks:
  - starter: "formula.yml#distance"
    hint: ["d = s × t, so 150 = s × 3.", "Try speeds of 30, 40, 50."]
    check: { type: board, text: "Set the time to 3 hours. Choose the speed so the distance is 150 km.", when: "d = 150 and t = 3", explain: "150 ÷ 3 = 50 km/h." }
  - check:
      type: question
      q: "$d = st$. Speed and time both double. What happens to the distance?"
      options: ["It becomes 4 times as big", "It doubles", "It stays the same", "It becomes 3 times as big"]
      answer: 0
      feedback: [null, "The product is multiplied by 2 twice, so it is 4 times as big.", "Both factors went up.", "Think of 2 × 2."]
      explain: "(2s) × (2t) = 4st: the distance is 4 times as big."
  - starter: "formula.yml#square"
    check: { type: board, text: "A square has area $A = s \\times s$. Make the side 6 cm. What does the area become?", when: "A = 36", explain: "6 × 6 = 36 cm². Doubling the side from 3 to 6 made the area 4 times as big (9 to 36)." }
  - check:
      type: question
      q: "$V = lwh$ with $l = 2$, $w = 3$, $h = 4$ (V = 24). Adding 1 to just one variable, which gives the biggest V?"
      options: ["Adding 1 to l (V = 36)", "Adding 1 to w (V = 32)", "Adding 1 to h (V = 30)", "They all give the same V"]
      answer: 0
      feedback: [null, "Adding 1 to w gives 2 × 4 × 4 = 32.", "Adding 1 to h gives 2 × 3 × 5 = 30.", "Try each: 36, 32 and 30."]
      explain: "l is the smallest, so one more makes the biggest proportional change: 3 × 3 × 4 = 36."
```

### Find the speed

Hold the time at 3.

### Both double

### Side and area

### The biggest change

## Practise: vary and describe

```step
stage: practise
insight: "Reading tables, single changes and a substitution review, mixed; forgetting to hold the others is the planted slip; the substitution review keeps formulas fresh."
try: { playground: board, starter: "formula.yml#box", height: 520 }
tasks:
  - check:
      type: answer
      q: "$V = lwh$ with $l = 2$, $w = 3$, $h = 4$. What is $V$?"
      answer: "24"
      explain: "2 × 3 × 4 = 24."
  - check:
      type: answer
      q: "Now change only $w$, from 3 to 4. What is $V$?"
      answer: "32"
      feedback:
        - ["28", "l and h stay at 2 and 4: 2 × 4 × 4."]
      explain: "2 × 4 × 4 = 32."
  - check:
      type: answer
      q: "$d = st$ with $s = 60$ km/h. The time doubles from 2 to 4 hours. What is $d$ now, in km?"
      answer: "240"
      feedback:
        - ["120", "That is the distance for 2 hours. For 4 hours, 60 × 4."]
      explain: "60 × 4 = 240 km, double the 120 km for 2 hours."
  - check:
      type: answer
      q: "Review: $P = 2l + 2w$ with $l = 6$ and $w = 4$. What is $P$?"
      answer: "20"
      feedback:
        - ["50", "2l means 2 × l, not the digits side by side."]
      explain: "2 × 6 + 2 × 4 = 12 + 8 = 20."
```

### Find V

### Change w

### Change t

### Review: substitution

## Make: a test of your own

```step
stage: make
insight: "Choosing numbers to meet a target then describing the effect of each variable puts the method to use."
try: { playground: board, starter: "formula.yml#box", height: 520 }
hint: ["Find three numbers up to 6 that multiply to 60.", "Try l = 6: then w × h must be 10."]
check: { type: board, text: "Make a box with volume 60 where $l > w > h$ (all different).", when: "V = 60 and l > w and w > h", explain: "For example l = 5, w = 4, h = 3 (60), or l = 6, w = 5, h = 2 (60)." }
```

Now write a table (on paper or in a spreadsheet) that varies $h$ from 1 to 6 for your box, and describe in a sentence what happens to $V$ as $h$ goes up.
