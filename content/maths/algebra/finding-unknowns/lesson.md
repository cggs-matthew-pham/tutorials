---
order: 3
unit: expressions
title: Finding an unknown
summary: When a formula's answer is known but one letter is not, substitute what you know. That leaves an equation; solve it by undoing, then check.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You know how much fence you have and how long the garden bed must be. How wide can it be? A formula answers that too, worked backwards."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8144
  url: http://127.0.0.1:8144/index.html
  readySelector: "#sl-w"
  layout: full
explainPicture: { ref: formula.yml#pic, caption: "$P = 20$ and $l = 6$: $20 = 2 \\times 6 + 2w$, so $2w = 8$ and $w = 4$. Check: $2 \\times 6 + 2 \\times 4 = 20$." }
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Substitute what you know, then solve for the rest"
  say: "Substitute what you know, then solve for the letter you don't."
  clip:
    - caption: { text: "P = 20 cm and l = 6 cm. What is w?", say: "The perimeter is twenty and the length is six. What is the width?" }
    - wait: 400
    - caption: { text: "20 = 2 × 6 + 2w, so 20 = 12 + 2w.", say: "Twenty equals twelve plus two w." }
    - wait: 400
    - caption: { text: "Undo + 12: 2w = 8. Undo × 2: w = 4.", say: "Take away twelve: two w is eight. Divide by two: w is four." }
    - click: Make w bigger
    - click: Make w bigger
    - click: Make w bigger
    - wait: 400
    - caption: { text: "Check: 2 × 6 + 2 × 4 = 20.", say: "Check it: two times six plus two times four is twenty." }
    - expect: { selector: ".rulework", contains: "P = 2 × 6 + 2 × 4 = 20" }
    - wait: 1200
---
So far you knew the letters and worked out the answer. Sometimes you know the answer, and one letter is the **unknown**. Substitute what you know: what is left is an equation, and you can solve it by undoing, as in the Equations unit.

## Predict: how wide?

```step
stage: predict
insight: "Committing to a width exposes subtracting the length once instead of twice, and forgetting to halve."
check:
  type: predict
  q: "A rectangle has perimeter $P = 20$ cm and length $l = 6$ cm. Using $P = 2l + 2w$, what is its width $w$?"
  options: ["4", "8", "14", "7"]
  actual: "4. 20 = 2 × 6 + 2w, so 20 = 12 + 2w. Then 2w = 8 and w = 4. (8 forgets to halve; 14 takes the length away only once.)"
```

$$P = 2l + 2w$$

Which letters do you know? Which one is unknown?

## Run: find the width

```step
stage: run
insight: "Moving w until P reaches 20 shows the answer; the working shows why only one width fits."
try: { playground: board, starter: "formula.yml#run", height: 520 }
check: { type: board, text: "Keep $l = 6$. Change $w$ until the perimeter is 20 cm. Was your prediction right?", when: "P = 20 and l = 6" }
```

Change $w$ one step at a time. How much does $P$ go up for each 1 cm of width? Why?

## Investigate: substitute, then solve

```step
stage: investigate
insight: "Substituting the known values turns a formula into an equation with one unknown; solving undoes the operations in reverse order; the check substitutes back."
tasks:
  - picture: { ref: formula.yml#pic, caption: "The rectangle with $P = 20$ and $l = 6$: the width is 4." }
    check:
      type: answer
      q: "A rectangle has area $A = 24$ cm² and length $l = 6$ cm. Using $A = lw$, find its width $w$."
      answer: "4"
      feedback:
        - ["144", "24 = 6 × w. To undo × 6, divide by 6."]
        - ["18", "That takes 6 away. lw means l × w: undo × by dividing."]
      explain: "24 = 6w, so w = 24 ÷ 6 = 4. Check: 6 × 4 = 24."
  - check:
      type: answer
      q: "A plumber charges $C = 5h + 20$ dollars. A job cost 45 dollars. How many hours, $h$?"
      answer: "5"
      feedback:
        - ["245", "That puts 45 in as h. Here 45 is the cost C: 45 = 5h + 20."]
        - ["13", "Undo the + 20 first (take 20 away), then divide by 5."]
        - ["9", "45 ÷ 5 = 9 skips the call-out fee. Take 20 away first."]
      explain: "45 = 5h + 20, so 5h = 25 and h = 5. Check: 5 × 5 + 20 = 45."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia finds the width of a rectangle. Click the line where she goes wrong."
      answer: 5
      fault: logic
      misconception: undo-same-operation
      explain: "Line 5: 2w = 8 means 2 × w = 8. To undo × 2, divide by 2: w = 4. Mia multiplied again. Check: 2 × 6 + 2 × 16 = 44, not 20."
```

### Area

Here is how to find an unknown in a formula.

```worked
P = 2l + 2w :: Write the formula.
P = 20, \; l = 6 :: Write what you know. The unknown is $w$.
20 = 2 \times 6 + 2w :: Substitute. Now it is an equation with one unknown.
20 = 12 + 2w :: Work out what you can.
8 = 2w :: Undo the + 12: take 12 from both sides.
w = 4 :: Undo the × 2: divide both sides by 2.
2 \times 6 + 2 \times 4 = 20 \;\checkmark :: Check by substituting back into the formula.
```

### A plumber

### Find the mistake

Read Mia's working one line at a time. Does her answer check?

## Modify: other unknowns

```step
stage: modify
insight: "One change at a time: a decimal answer, a different letter unknown, a formula that subtracts, and three letters with one unknown."
try: { playground: board, starter: "formula.yml#drive", height: 420 }
tasks:
  - starter: "formula.yml#drive"
    hint: "150 = 60t. Undo × 60."
    check: { type: board, text: "A car travels at 60 km/h: $d = 60t$. How long does it take to go 150 km? Set $t$ to find out.", when: "d = 150", explain: "150 = 60t, so t = 150 ÷ 60 = 2.5 hours." }
  - starter: "formula.yml#area"
    hint: "30 = l × 5. Undo × 5."
    check: { type: board, text: "A rectangle is 5 cm wide with an area of 30 cm². Keep $w = 5$ and find its length.", when: "A = 30 and w = 5", explain: "30 = 5l, so l = 6." }
  - starter: "formula.yml#battery"
    hint: ["60 = 100 − 4m. How much charge has been used?", "40 has been used, at 4 a minute."]
    check: { type: board, text: "A phone battery has $B = 100 - 4m$ percent left after $m$ minutes of gaming. When is it at 60%?", when: "B = 60", explain: "60 = 100 − 4m, so 4m = 40 and m = 10 minutes." }
  - check:
      type: answer
      q: "A box has volume $V = lwh$. $V = 60$, $l = 5$ and $w = 3$. Find $h$."
      answer: "4"
      feedback:
        - ["900", "60 = 5 × 3 × h = 15h. Undo × 15 by dividing."]
        - ["52", "lwh means multiply. 5 × 3 = 15, so 60 = 15h."]
      explain: "60 = 5 × 3 × h = 15h, so h = 60 ÷ 15 = 4. Check: 5 × 3 × 4 = 60."
```

### A car trip

Each task loads a new formula. Write the equation first, solve it, then set the board to check.

### A different unknown

### Going down

### A box

## Practise: find the unknown

```step
stage: practise
insight: "Substituting and solving in new formulas, mixed with one plain substitution so students must decide which job each question needs; the review is from the Equations unit."
tasks:
  - check:
      type: answer
      q: "Concert tickets cost $T = 12n + 6$ dollars. An order cost 66 dollars. How many tickets?"
      answer: "5"
      feedback:
        - ["798", "66 is the total T, not n: 66 = 12n + 6."]
        - ["6", "Take away the 6 first: 12n = 60."]
      explain: "66 = 12n + 6, so 12n = 60 and n = 5."
  - check:
      type: answer
      q: "Using $T = 12n + 6$, what do 3 tickets cost?"
      answer: "42"
      feedback:
        - ["0.25", "Here n is known (3), so substitute: no solving needed."]
      explain: "T = 12 × 3 + 6 = 42 dollars. Here you know n, so you just substitute."
  - check:
      type: answer
      q: "Average speed is $s = d / t$. A cyclist rides at 20 km/h for $t = 3$ hours. How far, $d$, in km?"
      answer: "60"
      feedback:
        - ["6.67", "20 = d ÷ 3. To undo ÷ 3, multiply by 3."]
      explain: "20 = d ÷ 3, so d = 20 × 3 = 60 km."
  - check:
      type: answer
      q: "Review: solve $4x - 3 = 17$."
      answer: "5"
      feedback:
        - ["3.5", "Undo the − 3 first by adding 3, then divide by 4."]
      explain: "4x = 20, so x = 5. Check: 4 × 5 − 3 = 17."
```

### Tickets

### Substitute or solve?

### A bike ride

### Review

## Make: a garden bed

```step
stage: make
insight: "Meeting two conditions at once (a fixed perimeter and a shape rule) reverses the lesson: the student chooses the unknowns."
try: { playground: board, starter: "formula.yml#make", height: 520 }
hint: ["The length is twice the width: P = 2(2w) + 2w = 6w.", "6w = 24. What is w?"]
check: { type: board, text: "You have 24 m of edging for a garden bed. Make the length twice the width, using all 24 m.", when: "P = 24 and l = 2w", explain: "l = 8 and w = 4: 2 × 8 + 2 × 4 = 24, and 8 is twice 4." }
```

The bed must use exactly 24 m of edging, and be twice as long as it is wide.

Stretch: with the same 24 m, which rectangle gives the biggest area?
