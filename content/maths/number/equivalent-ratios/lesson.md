---
order: 21
unit: ratio
node: AC9M7N08 n2
uses: [AC9M7N04 n1]   # equivalent fractions: multiplying or dividing top and bottom by the same number
title: Equivalent and simplest ratios
summary: "2 : 3 = 4 : 6 = 6 : 9: multiply or divide both numbers by the same number. 12 : 18 simplifies to 2 : 3 by dividing both by 6."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A recipe for 4 uses 2 cups of flour and 3 of milk. How much milk do you need for 10 cups of flour?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8291
  url: http://127.0.0.1:8291/index.html
  readySelector: "#sl-k"
  layout: full
explainPicture: { ref: eq.yml#explain-pic, caption: "Three copies of 2 : 3 give 6 : 9. The groups repeat, so the ratio is the same." }
explainClip:
  query: { code: "@eq.yml#explain", fresh: 1, id: explain }
  caption: "Copies of the same ratio"
  say: "More copies keep the ratio."
  clip:
    - caption: { text: "2 flour to 3 milk.", say: "Two flour to three milk." }
    - wait: 1200
    - click: Make the number of copies bigger
    - expect: { selector: "#gsum", contains: "4 : 6" }
    - caption: { text: "Two copies: 4 : 6.", say: "Two copies makes four to six." }
    - wait: 1000
    - click: Make the number of copies bigger
    - expect: { selector: "#gsum", contains: "6 : 9" }
    - caption: { text: "Three copies: 6 : 9. Same ratio.", say: "Three copies makes six to nine, the same ratio." }
    - wait: 1400
---
Doubling a recipe keeps the taste the same. Two ratios are **equivalent** when one is the other with *both* numbers multiplied (or both divided) by the same number:

$$2 : 3 = 4 : 6 = 6 : 9 \qquad (\times 2,\ \times 3)$$

A ratio is in **simplest form** when no number greater than 1 divides both terms. To simplify, divide both by their highest common factor: $12 : 18$, divide by 6, gives $2 : 3$. It is the same idea as equivalent fractions.

Adding the same number to both terms does **not** keep the ratio: $2 : 3$ is not $4 : 5$.

## Predict: which is the same as 2 : 3?

```step
stage: predict
insight: "Committing shows whether they multiply both terms (4 : 6) or add the same amount to both (4 : 5)."
check:
  type: predict
  q: "Which ratio is equivalent to $2 : 3$?"
  options: ["4 : 6", "4 : 5", "3 : 4", "5 : 6"]
  actual: "4 : 6. Both terms are doubled. 4 : 5 and 3 : 4 each add the same number to both terms, which changes the ratio."
```

What do you do to 2 and 3 to get 4 and 6?

## Run: copies of a ratio

```step
stage: run
insight: "Copies of the same pattern of blocks keep the ratio; the number of copies is the multiplier."
try: { playground: board, starter: "eq.yml#run", height: 420 }
check: { type: board, text: "Make 3 copies of 2 : 3. What is the new ratio?", when: "k = 3 and p = 6 and q = 9", explain: "Three copies give 6 : 9. Each term is multiplied by 3." }
```

The groups of blocks repeat, so the ratio stays the same.

## Investigate: multiply or divide both

```step
stage: investigate
insight: "Equivalent ratios multiply both terms by the same factor; Ana adds. Simplifying divides both terms by the same factor."
tasks:
  - check:
      type: answer
      q: "Fill in the blank: $2 : 3 = 10 : ?$"
      answer: "15"
      feedback:
        - ["11", "That adds 8 to both terms. Multiply both: 2 → 10 is × 5, so 3 × 5."]
        - ["13", "13 is 3 + 10. 2 → 10 is × 5, so multiply 3 by 5."]
      explain: "2 → 10 is × 5, so 3 → 3 × 5 = 15."
  - check:
      type: bug
      code: "working.txt#ana"
      text: "Ana scales a recipe. Click the line where her working goes wrong."
      answer: 4
      fault: logic
      misconception: ratio-add-not-multiply
      explain: "Line 4: adding 4 to the milk too is wrong. Flour went × 3 (2 to 6), so milk goes × 3: 3 × 3 = 9 cups."
  - check:
      type: answer
      q: "Simplify $12 : 18$. It is $2 : ?$"
      answer: "3"
      feedback:
        - ["9", "Both terms must be divided by the same number. 12 ÷ 6 = 2, so 18 ÷ 6 = 3."]
        - ["6", "12 ÷ 6 = 2 and 18 ÷ 6 = 3."]
      explain: "The highest common factor of 12 and 18 is 6. 12 ÷ 6 = 2 and 18 ÷ 6 = 3."
```

### Fill in the blank

Find what the first term was multiplied by.

### Find the mistake

### Simplify

## Modify: scale and simplify

```step
stage: modify
insight: "Simplifying on the board, simplifying by hand, scaling a recipe and spotting an impostor use the same rule from several angles."
try: { playground: board, starter: "eq.yml#modify", height: 420 }
tasks:
  - check: { type: board, text: "The board shows 4 : 6. Change it to the simplest ratio equal to 4 : 6.", when: "a = 2 and b = 3 and s = 1", explain: "4 : 6, divide both by 2, gives 2 : 3." }
  - check:
      type: answer
      q: "Simplify $20 : 30$. It is $2 : ?$"
      answer: "3"
      feedback:
        - ["5", "Divide both by 10: 20 ÷ 10 = 2 and 30 ÷ 10 = 3."]
      explain: "Divide both terms by 10: 2 : 3."
  - check:
      type: answer
      q: "A recipe uses 2 cups of flour for every 3 cups of milk. How many cups of milk go with 10 cups of flour?"
      answer: "15"
      feedback:
        - ["11", "That adds 8 to the milk too. Flour was multiplied by 5."]
      explain: "× 5: 2 : 3 = 10 : 15."
  - check:
      type: question
      q: "Which of these is NOT equivalent to $6 : 8$?"
      options: ["3 : 4", "12 : 16", "9 : 11", "24 : 32"]
      answer: 2
      feedback: ["3 : 4 is 6 : 8 divided by 2.", "12 : 16 is 6 : 8 times 2.", null, "24 : 32 is 6 : 8 times 4."]
      explain: "6 : 8 → 9 : 11 adds 3 to both terms. 6 → 9 is × 1.5, but 8 × 1.5 = 12, not 11."
```

### Simplest form

### Divide by ten

### Scale the recipe

### Spot the impostor

## Practise: equivalent ratios

```step
stage: practise
insight: "Simplify, scale up, and scale by a factor found from one term; the review keeps part to whole fresh."
tasks:
  - check:
      type: answer
      q: "Simplify $15 : 25$. It is $3 : ?$"
      answer: "5"
      feedback:
        - ["8", "That is 3 + 5. Divide both terms by 5: 25 ÷ 5 = 5."]
      explain: "Divide both by 5: 3 : 5."
  - check:
      type: answer
      q: "Fill in the blank: $5 : 2 = ? : 8$"
      answer: "20"
      feedback:
        - ["11", "That adds 6 to the 5. 2 → 8 is × 4, so 5 × 4."]
      explain: "2 → 8 is × 4, so 5 × 4 = 20."
  - check:
      type: answer
      q: "Pink paint is 3 parts red to 1 part white. How many parts of white go with 12 parts of red?"
      answer: "4"
      feedback:
        - ["10", "That adds 9 to the white, because red went up by 9. Red went × 4 (3 to 12), so white is × 4."]
      explain: "3 → 12 is × 4, so white is 1 × 4 = 4."
  - check:
      type: answer
      q: "Review: the ratio of blue to yellow is $3 : 4$. Blue to the whole is $3 : ?$"
      answer: "7"
      feedback:
        - ["4", "That is blue to yellow. Add the parts for the whole."]
      explain: "3 + 4 = 7, so blue to the whole is 3 : 7."
```

### Divide by five

### Multiply

### Pink paint

### Review: part to whole

## Make: big copies of 3 : 5

```step
stage: make
insight: "Finding copies of 3 : 5 with both terms over 20 shows the multiplier is what keeps the ratio, and many copies work."
try: { playground: board, starter: "eq.yml#make", height: 420 }
hint: ["Set a = 3 and b = 5 first.", "Try 7 copies."]
check: { type: board, text: "Make a ratio equal to 3 : 5 with both terms bigger than 20.", when: "a = 3 and b = 5 and p > 20 and q > 20", explain: "7 copies give 21 : 35, 8 copies give 24 : 40." }
```

Then explain how you know 24 : 40 is the same ratio as 3 : 5.
