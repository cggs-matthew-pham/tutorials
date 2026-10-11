---
order: 6
unit: indices
node: AC9M8N02 n2
uses: [AC9M8N02 n1]
title: Using the index laws
summary: "Simplify one step at a time: powers of powers first, then multiply and divide from left to right, keeping each base. The laws only join powers of the same base: 2³ × 3² cannot become one power. They also make scientific notation quick."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Scientists write the distance to the Sun as 1.5 × 10⁸ km. Multiplying numbers like that takes seconds with the index laws, as long as you only join powers of the same base."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8315
  url: http://127.0.0.1:8315/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: laws.yml#explain, caption: "(2³)¹: one group of three 2s. More groups multiply the index." }
explainClip:
  query: { code: "@laws.yml#explain", fresh: 1, id: explain }
  caption: "Groups of factors"
  say: "A power of a power is groups of factors."
  clip:
    - caption: { text: "(2³)¹ is one group of three 2s.", say: "One group of three twos." }
    - wait: 900
    - caption: { text: "(2³)² is two groups: six 2s. (2³)³ is nine.", say: "Two groups make six. Three groups make nine." }
    - click: Make the second index bigger
    - click: Make the second index bigger
    - expect: { selector: "#gsum", contains: "2⁹" }
    - wait: 1500
---
Simplify an expression with several powers one law at a time, keeping track of each base:

$$(2^3)^2 \times 2^4 \div 2^5 = 2^6 \times 2^4 \div 2^5 = 2^{10} \div 2^5 = 2^5$$

The laws only work for powers of the **same base**. $2^3 \times 3^2 = 8 \times 9 = 72$: it is not $6^5$, and it cannot be written as one power of a whole number by the laws.

In **scientific notation**, the powers of 10 follow the laws: $(3 \times 10^4) \times (2 \times 10^3) = 6 \times 10^7$.

## Predict: different bases

```step
stage: predict
insight: "Committing to whether 2⁵ × 3² can be one power shows whether they check the base before using a law."
check:
  type: predict
  q: "Can 2⁵ × 3² be simplified to a single power using the index laws?"
  options: ["No: the bases are different", "Yes: 6⁷", "Yes: 5⁷", "Yes: 6¹⁰"]
  actual: "No. The laws join powers of the same base only. 2⁵ × 3² = 32 × 9 = 288."
```

## Run: many ways to 3⁸

```step
stage: run
insight: "Finding several products that make the same power shows the index sum is what matters."
try: { playground: board, starter: "laws.yml#run", height: 600 }
check: { type: board, text: "Make 3^m × 3^n equal to 3⁸. Can you find another way?", when: "k = 8", explain: "Any indices that add to 8: 3² × 3⁶, 3³ × 3⁵, 3⁴ × 3⁴…" }
```

## Investigate: one step at a time

```step
stage: investigate
insight: "Combining laws in order; different bases do not combine (Lia adds anyway); powers of 10 in scientific notation follow the laws."
tasks:
  - check:
      type: number
      q: "Simplify 5⁴ × 5³ ÷ 5⁵. 5 to what power?"
      answer: 2
      tolerance: 0
      explain: "5⁴ × 5³ = 5⁷, then 5⁷ ÷ 5⁵ = 5²."
  - check:
      type: bug
      code: "working.txt#lia"
      text: "Lia simplifies 2⁴ × 5². Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: index-different-bases
      explain: "Line 2: the indices only add for the same base. 2⁴ × 5² = 16 × 25 = 400, not a million."
  - check:
      type: question
      q: "What is (4 × 10⁵) × (2 × 10²)?"
      options: ["8 × 10⁷", "8 × 10¹⁰", "6 × 10⁷", "8 × 10³"]
      answer: 0
      feedback: [null, "Multiplying powers adds the indices: 5 + 2.", "Multiply the 4 and the 2.", "Add the indices, do not subtract."]
      explain: "4 × 2 = 8 and 10⁵ × 10² = 10⁷."
```

### Step by step

Here is the routine.

```worked
(2^3)^2 \times 2^4 \div 2^5 :: Powers of powers first.
= 2^6 \times 2^4 \div 2^5 :: 3 × 2 = 6.
= 2^{10} \div 2^5 :: Then left to right: 6 + 4 = 10.
= 2^5 = 32 :: 10 − 5 = 5.
```

### Find the mistake

Read Lia's working. Are the bases the same?

### Scientific notation

## Modify: combinations

```step
stage: modify
insight: "Longer combinations, a power of a power to a given value, and choosing which expressions the laws can join."
try: { playground: board, starter: "laws.yml#power", height: 600 }
tasks:
  - check:
      type: number
      q: "Simplify (2⁴)³ ÷ 2¹⁰. 2 to what power?"
      answer: 2
      tolerance: 0
      explain: "(2⁴)³ = 2¹², and 2¹² ÷ 2¹⁰ = 2²."
  - starter: "laws.yml#power"
    hint: ["64 = 2⁶.", "Which m and n multiply to 6?"]
    check: { type: board, text: "Make a power of a power of 2 that equals 64.", when: "a = 2 and v = 64", explain: "(2²)³, (2³)² or (2¹)⁶: the indices multiply to 6. (2⁶)¹ works too, but this board stops m at 4." }
  - starter: "laws.yml#quotient"
    check: { type: board, text: "Make a division of powers of 10 that equals 1000.", when: "a = 10 and k = 3", explain: "Any 10ᵐ ÷ 10ⁿ with m − n = 3, such as 10⁵ ÷ 10²." }
  - check:
      type: question
      q: "Which can be written as a single power using the index laws?"
      options: ["7³ × 7⁴", "7³ × 4⁷", "7³ + 7⁴", "3⁷ × 4⁷ − 1"]
      answer: 0
      feedback: [null, "Different bases.", "The laws are for multiplying and dividing, not adding.", "Not with the laws in this lesson."]
      explain: "Same base, multiplied: 7⁷."
```

### A longer one

### Equal to 64

### Equal to 1000

### Which combine?

## Practise: using the laws

```step
stage: practise
insight: "Combinations, a sum that does not combine, and a review evaluation, mixed; joining different bases is the planted slip."
tasks:
  - check:
      type: number
      q: "Simplify (3²)³ × 3. 3 to what power?"
      answer: 7
      tolerance: 0
      feedback:
        - ["6", "3 on its own is 3¹."]
      explain: "(3²)³ = 3⁶, and 3⁶ × 3¹ = 3⁷."
  - check:
      type: number
      q: "Simplify 6⁸ ÷ 6³ ÷ 6². 6 to what power?"
      answer: 3
      tolerance: 0
      explain: "8 − 3 − 2 = 3: 6³."
  - check:
      type: question
      q: "What is 2³ + 2³?"
      options: ["2⁴ (16)", "2⁶ (64)", "4⁶", "4³"]
      answer: 0
      feedback: [null, "Adding is not multiplying: 8 + 8 = 16.", "8 + 8 = 16, not 4096.", "8 + 8 = 16, not 64."]
      explain: "8 + 8 = 16 = 2⁴. Adding two equal powers doubles one."
  - check:
      type: number
      q: "Review: what is 4³?"
      answer: 64
      tolerance: 0
      feedback:
        - ["12", "4³ is 4 × 4 × 4, not 4 × 3."]
      explain: "4 × 4 × 4 = 64."
```

### Power then product

### Two divisions

### Adding powers

### Review: evaluate

## Make: build an expression

```step
stage: make
insight: "Writing an expression that simplifies to a target uses the laws backwards and in combination."
try: { playground: board, starter: "laws.yml#power", height: 600 }
hint: ["256 = 2⁸.", "Which m and n multiply to 8?"]
check: { type: board, text: "Show a power of a power of 2 whose value is 256 on the board.", when: "a = 2 and v = 256", explain: "256 = 2⁸: (2²)⁴ or (2⁴)²." }
```

Then write an expression using all three laws that simplifies to 2⁵, and swap with a partner to check.
