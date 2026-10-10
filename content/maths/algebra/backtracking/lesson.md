---
order: 5
unit: equations
title: Solving by backtracking
summary: Undo what was done to x, last step first, to find the number you started with.
language: maths
hook: "Retracing your steps to find a lost key is backtracking: you undo your route, most recent first. Equations work the same way."
---
An equation like $2x + 3 = 11$ is a machine: $x$ goes in, gets multiplied by 2, then 3 is added, and 11 comes out. **Backtracking** runs the machine backwards to find $x$.

## Predict: what number went in?

```step
stage: predict
insight: "Students can already reverse a two-step calculation in their heads; naming that as undoing is the bridge to backtracking."
check:
  type: predict
  q: "I think of a number. I multiply it by 2, then add 3, and I get 11. What was my number?"
  kind: number
  actual: "4. Take away the 3 first (11 − 3 = 8), then halve (8 ÷ 2 = 4)."
```

How did you work it out? Which step did you undo first?

## Run: run the machine backwards

```step
stage: run
insight: "Undoing has an order: the last thing the machine did is the first thing to undo."
try: { playground: board, starter: "machine.yml#run", height: 400 }
check: { type: board, text: "Undo every step to find $x$.", expect: { solved: true } }
```

Start from the output, 11. Choose an operation and a number that **undoes** the last step, then keep going back towards $x$.

## Investigate: undo in reverse

```step
stage: investigate
insight: "Each operation has an opposite (inverse), and the steps are undone in reverse order."
tasks:
  - check:
      type: match
      q: "Match each step with the step that undoes it."
      pairs:
        - ["+ 7", "− 7"]
        - ["× 3", "÷ 3"]
        - ["− 4", "+ 4"]
        - ["÷ 2", "× 2"]
      explain: "Adding and subtracting undo each other. Multiplying and dividing undo each other."
  - check:
      type: trace
      text: "Backtrack $5x - 4 = 21$. The machine multiplies by 5, then takes away 4. Write each undo step (such as + 2 or ÷ 3) and the value it gives."
      table: |
        | step | undo | value |
        | start | – | 21 |
        | 1 | [+ 4] | [25] |
        | 2 | [÷ 5] | [5] |
      explain: "21 + 4 = 25 undoes the − 4. Then 25 ÷ 5 = 5 undoes the × 5. Check: 5 × 5 − 4 = 21."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia backtracks $2x + 3 = 11$, but her check fails. Click the first line that goes wrong."
      answer: 2
      fault: logic
      misconception: backtrack-order
      explain: "Line 2: Mia undid the × 2 first. The machine added 3 last, so that is undone first: 11 − 3 = 8, then 8 ÷ 2 = 4. Check: 2 × 4 + 3 = 11."
```

### Opposites

To undo a step, do the opposite.

```worked
3x + 7 = 19 :: The machine multiplies $x$ by 3, then adds 7, and gives 19.
19 - 7 = 12 :: Undo the last step first: $+\,7$ is undone by $-\,7$.
12 \div 3 = 4 :: Then undo $\times\,3$ with $\div\,3$.
x = 4 :: That is the number that went in.
3(4) + 7 = 19 \checkmark :: Check by running the machine forwards.
```

### Backtrack it

Undo the machine one step at a time. Which step do you undo first? Type ÷ as / if it is easier.

### Find the mistake

Mia's answer fails the check. Which step did she undo first?

## Modify: new machines

```step
stage: modify
insight: "The order of the machine decides the order of undoing, including when the machine adds before it multiplies (brackets)."
try: { playground: board, starter: "machine.yml#one-step", height: 400 }
tasks:
  - starter: "machine.yml#one-step"
    check: { type: board, text: "Solve $x + 9 = 15$.", expect: { solved: true } }
  - starter: "machine.yml#subtract"
    hint: "The machine took 5 away last. What undoes taking away?"
    check: { type: board, text: "Solve $2x - 5 = 9$.", expect: { solved: true } }
  - starter: "machine.yml#divide"
    hint: "The machine divided by 3 first, so that is the last thing to undo."
    check: { type: board, text: "Solve $\\frac{x}{3} + 2 = 6$.", expect: { solved: true } }
  - starter: "machine.yml#brackets"
    hint: ["This machine adds first and multiplies last.", "Undo the × 3 first."]
    check: { type: board, text: "Solve $3(x + 4) = 27$.", expect: { solved: true } }
```

### One step

Each task loads a new machine. Undo every step to find $x$.

### Taking away

The machine takes away last this time.

### Dividing

This machine divides first.

### Adding first

This machine adds 4 **before** it multiplies by 3. As an equation that is $3(x + 4) = 27$: the brackets show the adding happens first.

## Practise: backtrack these

```step
stage: practise
insight: "Fluent backtracking needs the order and the inverse right every time, checked forwards."
tasks:
  - check:
      type: answer
      q: "Solve $4x + 5 = 33$."
      answer: "7"
      feedback:
        - ["3.25", "It looks like you divided first. Undo the + 5 first: 33 − 5 = 28."]
        - ["28", "That undoes the + 5. Now undo the × 4."]
      explain: "33 − 5 = 28, then 28 ÷ 4 = 7. Check: 4 × 7 + 5 = 33."
  - check:
      type: answer
      q: "Solve $\\frac{x}{2} - 3 = 4$."
      answer: "14"
      feedback:
        - ["2", "Undo the − 3 by adding 3, not taking it away again: 4 + 3 = 7."]
        - ["7", "That undoes the − 3. Now undo the ÷ 2."]
      explain: "4 + 3 = 7, then 7 × 2 = 14. Check: 14 ÷ 2 − 3 = 4."
  - check:
      type: answer
      q: "Solve $6x - 8 = 34$."
      answer: "7"
      feedback:
        - ["26/6", "Undo the − 8 by adding 8: 34 + 8 = 42."]
        - ["42", "That undoes the − 8. Now undo the × 6."]
      explain: "34 + 8 = 42, then 42 ÷ 6 = 7. Check: 6 × 7 − 8 = 34."
```

### Two steps

### With a fraction

### Taking away

## Make: your own machine

```step
stage: make
insight: "Building a machine from its input shows that backtracking and running forwards are the same steps in reverse."
hint: ["Start with 6 and choose two steps, such as × 3 then + 2.", "Run 6 through them: 6 × 3 = 18, 18 + 2 = 20. So 3x + 2 = 20."]
check:
  type: answer
  q: "Design a two-step machine that turns 6 into a new number. Write it as an equation, such as $3x + 2 = 20$."
  equation: { x: 6 }
  explain: "Your equation is true when x = 6, so backtracking it leads back to 6."
```

Make a machine a friend could backtrack. Run 6 through your two steps, then write the equation.

Stretch: make one where the machine adds first, so your equation needs brackets.
