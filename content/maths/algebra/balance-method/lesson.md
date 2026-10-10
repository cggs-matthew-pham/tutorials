---
order: 3
unit: equations
title: The balance method
summary: Do the same to both sides to get x on its own, then check your answer in the first equation.
language: maths
hook: "Engineers, nurses working out doses and anyone splitting a bill rearrange equations this way: keep it balanced, and every step stays true."
---
Backtracking stops working when $x$ is on **both** sides, as in $x + 7 = 3x + 1$. The **balance method** works for every linear equation: whatever you do to one side, do to the other, so the scale stays level.

## Predict: one move on both sides

```step
stage: predict
insight: "Committing to the equation that one move leaves makes the move itself the thing students test on the board."
check:
  type: predict
  q: "$2x + 3 = 11$. You take 3 from **both** sides. What equation is left?"
  options: ["$2x = 8$", "$2x = 11$", "$x = 8$", "$2x + 3 = 8$"]
  actual: "2x = 8. The left loses its 3 blocks and the right loses 3 too: 11 − 3 = 8. The bags of x stay."
```

The left side has two bags of $x$ and 3 blocks. The right side has 11 blocks. Picture taking 3 blocks from each side.

## Run: keep it balanced

```step
stage: run
insight: "Taking the same from both sides, then sharing both sides equally, keeps the equation true at every step and leaves x alone."
try: { playground: board, starter: "solve.yml#run", height: 520 }
check: { type: board, text: "Get $x$ on its own on one side.", expect: { solved: true } }
```

Use **Take away** and **Share** on the board. Each step does the same to both sides, so the scale stays level, and the list underneath writes your steps as algebra.

## Investigate: write it as algebra

```step
stage: investigate
insight: "Each move on the scale is a line of algebra, and checking in the first equation catches mistakes."
tasks:
  - check:
      type: parsons
      code: "steps.txt#order"
      text: "Put the steps for solving $4x + 3 = 23$ in order."
      extra: ["4x = 26"]
      explain: "Take 3 from both sides (4x = 20), divide both sides by 4 (x = 5), then check in the first equation."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo solves $2x + 3 = 11$, but his check fails. Click the first line that goes wrong."
      answer: 2
      fault: logic
      misconception: one-side-only
      explain: "Line 2: Leo took 3 from the left side only. The right side has to lose 3 too: 2x = 8, so x = 4. Check: 2 × 4 + 3 = 11."
  - check:
      type: question
      q: "To solve $3x + 5 = 20$, which first step keeps whole numbers?"
      options: ["Take 5 from both sides", "Divide both sides by 3"]
      answer: 0
      explain: "Both are allowed, but dividing first gives x + 5/3 = 20/3. Taking 5 first gives 3x = 15, then x = 5."
```

### In order

Each line keeps the equation balanced.

```worked
3x + 5 = 20 :: Start with the equation.
3x + 5 - 5 = 20 - 5 :: Take 5 from **both** sides.
3x = 15 :: Now three lots of $x$ are 15.
\frac{3x}{3} = \frac{15}{3} :: Divide **both** sides by 3.
x = 5 :: $x$ is on its own.
3(5) + 5 = 20 \checkmark :: Check in the **first** equation, not the last line.
```

### Find the mistake

Leo's check failed. Look at what he did to each side.

### Which step first?

Either step keeps the balance. One keeps the numbers simpler.

## Modify: harder scales

```step
stage: modify
insight: "Taking away bags of x from both sides is the same move as taking away blocks, and it handles x on both sides."
try: { playground: board, starter: "solve.yml#four-x", height: 520 }
tasks:
  - starter: "solve.yml#four-x"
    check: { type: board, text: "Solve $4x + 7 = 31$ on the scale.", expect: { solved: true } }
  - starter: "solve.yml#five-x"
    hint: ["Bags of x can be taken away too.", "Take 2 bags of x from both sides."]
    check: { type: board, text: "Solve $5x = 2x + 12$.", expect: { solved: true } }
  - starter: "solve.yml#both-sides"
    hint: ["There are bags and blocks on both sides.", "Take one bag of x from both sides first."]
    check: { type: board, text: "Solve $x + 7 = 3x + 1$.", expect: { solved: true } }
```

### Bigger numbers

Each task loads a new scale. Same moves, bigger numbers.

### Bags on both sides

Now there are bags of $x$ on both sides. Backtracking cannot solve this; the balance method can.

### Bags and blocks on both sides

Bags and blocks on both sides. Get the bags on one side first.

## Practise: solve and check

```step
stage: practise
insight: "Solving and then checking in the first equation becomes one routine."
tasks:
  - check:
      type: answer
      q: "Solve $5x + 4 = 39$."
      answer: "7"
      feedback:
        - ["7.8", "Did you take 4 from the left side only? Take it from both sides: 5x = 35."]
        - ["35", "That is 5x. Now divide both sides by 5."]
      explain: "5x + 4 − 4 = 39 − 4, so 5x = 35 and x = 7. Check: 5 × 7 + 4 = 39."
  - check:
      type: answer
      q: "Solve $9x = 4x + 35$."
      answer: "7"
      feedback:
        - ["35/13", "It looks like 4x was added to both sides. Take 4x from both sides: 5x = 35."]
        - ["35", "That is 5x. Now divide both sides by 5."]
      explain: "Take 4x from both sides: 5x = 35. Divide by 5: x = 7. Check: 9 × 7 = 63 and 4 × 7 + 35 = 63."
  - check:
      type: answer
      q: "Solve $6x + 2 = 4x + 12$."
      answer: "5"
      feedback:
        - ["5/3", "It looks like the 4x on the right was left out. Take 4x from both sides: 2x + 2 = 12."]
        - ["10", "That is 2x. Now divide both sides by 2."]
      explain: "Take 4x from both sides: 2x + 2 = 12. Take 2: 2x = 10. Divide by 2: x = 5. Check: 6 × 5 + 2 = 32 and 4 × 5 + 12 = 32."
```

### Two steps

### Bags on both sides

### Bags and blocks on both sides

## Make: your own balance

```step
stage: make
insight: "Writing an equation with x on both sides from a chosen solution shows the balance method is reversible."
hint: ["Pick two expressions with x, such as 4x + 1 and 2x + 7.", "Work out both when x = 3: 13 and 13. They match, so 4x + 1 = 2x + 7 works."]
check:
  type: answer
  q: "Write an equation with $x$ on both sides whose solution is $x = 3$."
  equation: { x: 3 }
  explain: "Your equation is true when x = 3: both sides have the same value."
```

Give it to a friend to solve with the balance method, then check their answer in your first equation.
