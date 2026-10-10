---
order: 7
unit: equations
node: AC9M7A03 n1
title: Equations as a balance
summary: An equation says two things are equal. Find the value that makes it true, then check it.
language: maths
hook: "Shops, recipes and sports tables all hide an equation: a total that has to match. Finding the missing number, and checking it, is what solving means."
---
An **expression** is a calculation with a letter in it, such as $2x + 3$. An **equation** puts an = sign between two expressions: it says they are equal, like a balance scale with the same weight on each side. The **solution** is the value of the letter that makes it true.

## Predict: which value balances?

```step
stage: predict
insight: "Committing to a value before trying it makes the balance a test of their thinking, not a guessing game."
check:
  type: predict
  q: "Which value of $x$ makes $2x + 3 = 11$ true?"
  options: ["$x = 4$", "$x = 5.5$", "$x = 7$", "$x = 8$"]
  actual: "x = 4. Two lots of 4 is 8, and 8 + 3 = 11, the same as the right side."
```

$$2x + 3 = 11$$

Each bag on the left holds $x$ blocks, and there are two bags and 3 loose blocks. The right side has 11 blocks. How many blocks must be in each bag for the scale to balance?

## Run: find the balance

```step
stage: run
insight: "The solution is the one value that balances the scale: every other value tips it one way or the other."
try: { playground: board, starter: "balance.yml#run", height: 470 }
check: { type: board, text: "Find the value of $x$ that balances the scale.", expect: { balanced: true } }
```

Change $x$ with the slider, or the − and + buttons. Watch both sides and stop when the scale balances.

## Investigate: check a solution

```step
stage: investigate
insight: "Substitution is how you check a solution: replace the letter with the value, work out each side, and see if they are equal."
tasks:
  - check:
      type: answer
      q: "Is $x = 5$ a solution of $3x - 2 = 13$? Start by working out the left side, $3x - 2$, when $x = 5$."
      answer: "13"
      feedback:
        - ["33", "It looks like 3x became 35. 3x means 3 × x, so it is 3 × 5 = 15."]
        - ["6", "3x means 3 × x, not 3 + x."]
        - ["15", "That is 3 × 5. Now take away 2."]
      explain: "3 × 5 − 2 = 15 − 2 = 13. The right side is 13 too, so x = 5 is a solution."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam decides that $x = 4$ is not a solution of $2x + 3 = 11$, but it balanced the scale. Click the line where his working goes wrong."
      answer: 2
      fault: logic
      misconception: algebra-juxtaposition
      explain: "Line 2: Sam wrote 2 and 4 side by side to get 24. 2x means 2 × x, so it is 8, and 8 + 3 = 11. x = 4 is a solution after all."
  - check:
      type: question
      q: "Which one is an equation?"
      options: ["$2x + 3$", "$5x$", "$2x + 3 = 11$", "$x + 7 - 2$"]
      answer: 2
      explain: "An equation has an = sign: it says two things are equal. The others are expressions: they have a value, but they do not say that anything is equal."
```

### Check by substitution

To check a value, put it in place of the letter and work out each side.

```worked
2x + 3 = 11 :: Is $x = 4$ a solution? Start with the equation.
2(4) + 3 :: Put 4 in place of $x$ on the left. The brackets show that $2x$ means 2 times $x$.
= 8 + 3 = 11 :: Work out the left side.
11 = 11 :: The left side equals the right side.
\text{So } x = 4 \text{ is a solution.} :: If the two sides were different, it would not be.
```

### Find the mistake

Read Sam's working one line at a time. Where does a number come from that should not?

### Expression or equation?

Look for the = sign.

## Modify: new scales

```step
stage: modify
insight: "The idea holds for any equation, even with the letter on both sides, and some equations have no whole-number solution at all."
try: { playground: board, starter: "balance.yml#four-x", height: 470 }
tasks:
  - starter: "balance.yml#four-x"
    hint: "Each bag holds the same number of blocks. How many blocks are on the right, shared between four bags?"
    check: { type: board, text: "Balance $4x = 20$.", expect: { balanced: true } }
  - starter: "balance.yml#both-sides"
    hint: ["Watch both sides change as you move $x$.", "Try each value from 0 upwards and compare the two totals."]
    check: { type: board, text: "Balance $x + 7 = 3x + 1$.", expect: { balanced: true } }
  - starter: "balance.yml#no-whole"
    check:
      type: question
      q: "Can you balance $2x = 7$ with a whole number?"
      options: ["Yes, with $x = 3$", "Yes, with $x = 4$", "No: $2x$ is always even when $x$ is whole, and 7 is odd"]
      answer: 2
      explain: "x = 3 gives 6 and x = 4 gives 8, so 7 is skipped. The solution is x = 3.5, which is not a whole number."
```

### Four bags

Each task loads a new scale. Find the value of $x$ that balances it.

### $x$ on both sides

Now both sides change when $x$ changes. The solution still makes the two sides equal.

### A scale that will not balance

Try every value. What happens between $x = 3$ and $x = 4$?

## Practise: check a value

```step
stage: practise
insight: "Substitution is a habit: every value gets checked by working out both sides."
tasks:
  - check:
      type: answer
      q: "Work out $5x - 4$ when $x = 3$."
      answer: "11"
      feedback:
        - ["49", "It looks like 5x became 53. 5x means 5 × x, so it is 5 × 3 = 15."]
        - ["15", "That is 5 × 3. Now take away 4."]
      explain: "5 × 3 − 4 = 15 − 4 = 11."
  - check:
      type: answer
      q: "Which value of $x$ solves $3x + 2 = 20$? Try 5, 6 and 7."
      answer: "6"
      feedback:
        - ["5", "Check it: 3 × 5 + 2 = 17, not 20."]
        - ["7", "Check it: 3 × 7 + 2 = 23, not 20."]
      explain: "3 × 6 + 2 = 18 + 2 = 20, the same as the right side."
  - check:
      type: question
      q: "Is $x = 2$ a solution of $4x + 1 = 3x + 4$?"
      options:
        - "Yes: both sides are 9"
        - "No: the left side is 9 and the right side is 10"
        - "No: the left side is 42 and the right side is 34"
      answer: 1
      explain: "4 × 2 + 1 = 9 and 3 × 2 + 4 = 10. The sides are different, so x = 2 is not a solution. (x = 3 is: both sides are 13.)"
```

### Work it out

### Which value?

### Both sides

## Make: your own equation

```step
stage: make
insight: "Building an equation from its solution shows that the solution is the value that makes both sides equal."
hint: ["Start with what $x = 6$ gives you: $2x$ is 12.", "Then add the same number to both sides: $2x + 1 = 13$."]
check:
  type: answer
  q: "Write your own equation whose solution is $x = 6$. Use $x$ at least once."
  equation: { x: 6 }
  explain: "Your equation is true when x = 6: both sides have the same value."
```

Make an equation that a friend could solve. Check it by substitution before you press **Check answer**.

Stretch: write one with $x$ on both sides.
