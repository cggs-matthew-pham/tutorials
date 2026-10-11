---
order: 9
unit: fractions
node: AC9M7N04 n1
title: Equivalent fractions
summary: "Fractions are equal when they shade the same amount. Multiply or divide the top and the bottom by the same number: 2/3 = 4/6 = 8/12. Dividing by the highest common factor gives the simplest form."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Half a pizza cut into 2 slices or into 8: the same amount to eat. The numbers change; the amount does not."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8173
  url: http://127.0.0.1:8173/index.html
  readySelector: "#sl-c"
  layout: full
explainPicture: { ref: bars.yml#explain-pic, caption: "$\\tfrac{2}{3} = \\tfrac{8}{12}$: each third is split into 4, so the top and the bottom are both multiplied by 4." }
explainClip:
  query: { code: "@bars.yml#explain", fresh: 1, id: explain }
  caption: "The same amount, more parts"
  say: "Equal fractions shade the same amount."
  clip:
    - caption: { text: "2/3: 2 of 3 equal parts.", say: "Two thirds: two of three equal parts." }
    - wait: 500
    - caption: { text: "Split every part in 2: 6 parts, 4 shaded. 2/3 = 4/6.", say: "Split every part in two. Six parts, four shaded: the same amount." }
    - click: Make d bigger
    - click: Make d bigger
    - click: Make d bigger
    - click: Make c bigger
    - click: Make c bigger
    - expect: { selector: "#gsum", contains: "2/3 = 4/6" }
    - wait: 600
    - caption: { text: "× 2 on the top and the bottom.", say: "Times two on the top and the bottom." }
    - wait: 1200
---
A fraction names an amount: $\tfrac{2}{3}$ is 2 of 3 equal parts. The top number is the **numerator** (how many parts) and the bottom number the **denominator** (how many equal parts in the whole); this lesson calls them the top and the bottom. The same amount can be cut into more parts, or fewer, and named by a different fraction. Fractions that name the same amount are **equivalent**.

In this lesson you find equivalent fractions on fraction bars, then write a fraction in its **simplest form**.

## Predict: the same as 2/3

```step
stage: predict
insight: "Committing to a fraction equal to 2/3 shows whether they multiply both numbers or add the same number to both."
check:
  type: predict
  q: "Which fraction is the same amount as $\\tfrac{2}{3}$?"
  options:
    - "$\\tfrac{4}{6}$"
    - "$\\tfrac{3}{4}$"
    - "$\\tfrac{2}{6}$"
    - "$\\tfrac{4}{5}$"
  actual: "4/6. Split each third into 2: 6 parts, and the 2 shaded thirds become 4 shaded sixths. 3/4 (add 1 to both) is more than 2/3."
```

Picture the bar split into 3 parts. What happens if each part is cut in half?

## Run: match the bars

```step
stage: run
insight: "Matching the shaded amount with 6 parts shows that splitting every part multiplies both the number of parts and the number shaded."
try: { playground: board, starter: "bars.yml#run", height: 520 }
check: { type: board, text: "The top bar is $\\tfrac{2}{3}$. Set the orange bar to 6 parts ($d = 6$) and shade the same amount. Was your prediction right?", when: "e = 1 and d = 6" }
```

$d$ is the number of parts in the orange bar and $c$ the number shaded. The board says when the two shade the same amount.

## Investigate: multiply or divide both

```step
stage: investigate
insight: "Multiplying or dividing the top and the bottom by the same number keeps the amount; dividing by the highest common factor gives lowest terms in one step. Lily's mistake adds the same number to both."
tasks:
  - check:
      type: answer
      q: "Write $\\tfrac{12}{18}$ in its simplest form."
      answer: "2/3"
      form: simplest
      feedback:
        - ["6/9", "That is equal, but 6 and 9 still share 3. Divide again, or divide by 6 in one go."]
        - ["4/6", "That is equal, but 4 and 6 still share 2."]
      explain: "The highest common factor of 12 and 18 is 6: 12 ÷ 6 = 2 and 18 ÷ 6 = 3, so 2/3."
  - check:
      type: bug
      code: "working.txt#lily"
      text: "Lily looks for a fraction equal to $\\tfrac{2}{3}$. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: fraction-add-same
      explain: "Line 3: adding changes the amount (3/4 is more than 2/3). Doing the same to the top and the bottom means multiplying or dividing: 2/3 = 4/6."
  - check:
      type: question
      q: "Why is $\\tfrac{2}{3} = \\tfrac{8}{12}$?"
      options: ["Each third is split into 4 twelfths, so 2 thirds are 8 twelfths", "8 − 2 = 6 and 12 − 3 = 9", "8 and 12 are both even"]
      answer: 0
      feedback: [null, "Subtracting does not tell you about the amount.", "Many fractions with even numbers are not equal to 2/3, such as 4/12."]
      explain: "× 4 on the top and the bottom: the same amount, cut into 4 times as many parts."
```

### Simplest form

Here is how to find equivalent fractions, and the simplest one.

```worked
\tfrac{2}{3} = \tfrac{2 \times 4}{3 \times 4} = \tfrac{8}{12} :: Split each part into 4: multiply the top and the bottom by 4.
\tfrac{12}{18} = \tfrac{12 \div 2}{18 \div 2} = \tfrac{6}{9} :: Join parts: divide the top and the bottom by a common factor.
\tfrac{6}{9} = \tfrac{6 \div 3}{9 \div 3} = \tfrac{2}{3} :: 6 and 9 still share 3, so divide again.
\tfrac{12}{18} = \tfrac{12 \div 6}{18 \div 6} = \tfrac{2}{3} :: Or in one step: divide by the highest common factor, 6.
```

A fraction is in **simplest form** (lowest terms) when the top and the bottom have no common factor but 1. Try one: simplify $\tfrac{12}{18}$.

### Find the mistake

Read Lily's working. What does "the same" have to mean?

### Why they are equal

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a different fraction on the board, a missing number, simplifying, simplifying on the board, then the edge case of a fraction already in lowest terms."
try: { playground: board, starter: "bars.yml#twelfths", height: 520 }
tasks:
  - starter: "bars.yml#twelfths"
    hint: "Each quarter split into 3 makes twelfths."
    check: { type: board, text: "The top bar is $\\tfrac{3}{4}$. Make the orange bar an equal fraction with 12 parts.", when: "e = 1 and d = 12", explain: "3/4 = 9/12: × 3 on the top and the bottom." }
  - check:
      type: answer
      q: "Fill the gap: $\\tfrac{3}{5} = \\tfrac{?}{20}$."
      answer: "12"
      feedback:
        - ["18", "5 → 20 is × 4, not + 15. Multiply the top by 4 too."]
        - ["3", "The bottom was multiplied by 4. Do the same to the top."]
      explain: "5 × 4 = 20, so 3 × 4 = 12."
  - check:
      type: answer
      q: "Write $\\tfrac{15}{25}$ in its simplest form."
      answer: "3/5"
      form: simplest
      feedback:
        - ["15/25", "15 and 25 share 5."]
      explain: "Divide by 5: 3/5."
  - starter: "bars.yml#simplify"
    hint: ["Make d smaller: try 6 parts, then 3.", "Keep the same amount shaded."]
    check: { type: board, text: "The top bar is $\\tfrac{8}{12}$. Make the orange bar the same amount with as few parts as possible.", when: "e = 1 and s = 1", explain: "8/12 = 2/3: divide by 4, the highest common factor." }
  - check:
      type: question
      q: "Edge case: can $\\tfrac{7}{9}$ be simplified?"
      options: ["No: 7 and 9 have no common factor but 1", "Yes: 7/9 = 1/2", "Yes: divide both by 7"]
      answer: 0
      feedback: [null, "7/9 is more than a half.", "9 ÷ 7 is not a whole number."]
      explain: "7 and 9 share no factor but 1, so 7/9 is already in simplest form."
```

### Twelfths

Each task changes one thing.

### A missing number

### Simplify

### Fewest parts

### Already simplest

## Practise: equal fractions

```step
stage: practise
insight: "Simplifying, finding a missing number and comparing with a common denominator, mixed; adding to both is the planted slip; the review keeps integers fresh."
tasks:
  - check:
      type: answer
      q: "Write $\\tfrac{18}{24}$ in its simplest form."
      answer: "3/4"
      form: simplest
      feedback:
        - ["9/12", "9 and 12 still share 3."]
        - ["6/8", "6 and 8 still share 2."]
      explain: "HCF 6: 18 ÷ 6 = 3 and 24 ÷ 6 = 4."
  - check:
      type: answer
      q: "Fill the gap: $\\tfrac{5}{8} = \\tfrac{15}{?}$."
      answer: "24"
      feedback:
        - ["18", "5 → 15 is × 3, not + 10."]
      explain: "× 3: 8 × 3 = 24."
  - check:
      type: question
      q: "Which is bigger, $\\tfrac{2}{3}$ or $\\tfrac{3}{5}$? Write both with 15 parts."
      options: ["2/3 (10/15 is more than 9/15)", "3/5 (it has bigger numbers)", "They are equal"]
      answer: 0
      feedback: [null, "Bigger numbers do not mean a bigger amount: 3/5 = 9/15.", "2/3 = 10/15 and 3/5 = 9/15."]
      explain: "2/3 = 10/15 and 3/5 = 9/15, so 2/3 is bigger."
  - check:
      type: answer
      q: "Review: work out $-3 + 5$."
      answer: "2"
      feedback:
        - ["-8", "Adding 5 moves right from −3."]
      explain: "Start at −3 and move 5 right: 2."
```

### Simplify

### Missing number

### Compare

### Review: integers

## Make: neither in lowest terms

```step
stage: make
insight: "Building two equal fractions where neither is in lowest terms shows that one amount has many names, all multiples of its simplest one."
try: { playground: board, starter: "bars.yml#make", height: 560 }
hint: ["Start with a simple fraction such as 1/2 and multiply its top and bottom by 2 for one bar.", "Multiply by 3 for the other bar."]
check: { type: board, text: "Make the two bars equal, with neither fraction in lowest terms.", when: "e = 1 and t = 0 and s = 0", explain: "For example 2/4 and 3/6, or 4/6 and 8/12: both simplify to the same fraction." }
```

Then: what is the simplest form of both your fractions?
