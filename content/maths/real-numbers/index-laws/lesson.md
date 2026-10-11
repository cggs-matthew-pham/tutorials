---
order: 5
unit: indices
node: AC9M8N02 n1
uses: [AC9M7N02 n1]
title: Index laws
summary: "Write powers out as factors and the laws appear: multiplying powers of the same base adds the indices, dividing subtracts them, and a power of a power multiplies them. Anything (except 0) to the power 0 is 1."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "2¹⁰ × 2¹⁰ has over a million as its answer, but you can write it down in a second: 2²⁰. Write the powers out once, and you will see why."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8314
  url: http://127.0.0.1:8314/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: laws.yml#explain-pic, caption: "3⁵ ÷ 3²: two pairs of 3s cancel, leaving 3³ = 27. Subtract the indices: 5 − 2 = 3." }
explainClip:
  query: { code: "@laws.yml#explain", fresh: 1, id: explain }
  caption: "Count the factors"
  say: "Write the powers out and count the factors."
  clip:
    - caption: { text: "2³ × 2¹: three 2s and one more 2.", say: "Two cubed times two: three twos and one more." }
    - wait: 900
    - caption: { text: "Each extra factor adds one to the index: 2³ × 2³ = 2⁶.", say: "Each extra factor adds one to the index." }
    - click: Make the second index bigger
    - click: Make the second index bigger
    - expect: { selector: "#gsum", contains: "2⁶" }
    - wait: 1500
---
A power is repeated multiplication: $2^3 = 2 \times 2 \times 2$. The **base** is 2 and the **index** (exponent) is 3. Writing powers out as factors gives the **index laws** for powers of the **same base**:

| Law | Why | Example |
|---|---|---|
| $a^m \times a^n = a^{m+n}$ | the factors join | $2^3 \times 2^2 = 2^5$ |
| $a^m \div a^n = a^{m-n}$ | pairs of factors cancel | $3^5 \div 3^2 = 3^3$ |
| $(a^m)^n = a^{mn}$ | $n$ groups of $m$ factors | $(2^3)^2 = 2^6$ |
| $a^0 = 1$ | $a^n \div a^n = 1$ and $= a^0$ | $7^0 = 1$ |

## Predict: 2³ × 2⁴

```step
stage: predict
insight: "Committing to the index of 2³ × 2⁴ shows whether they add, multiply, or multiply the bases too."
check:
  type: predict
  q: "2³ × 2⁴ = 2 to what power?"
  options: ["7", "12", "1", "It is 4⁷"]
  actual: "2⁷: three 2s times four 2s is seven 2s multiplied together. The base stays 2."
```

Write each power out as 2s.

## Run: join the factors

```step
stage: run
insight: "Building products of powers and counting the factors shows the indices add while the base stays."
try: { playground: board, starter: "laws.yml#run", height: 600 }
check: { type: board, text: "Make 2³ × 2⁴. How many 2s are there? Was your prediction right?", when: "a = 2 and m = 3 and n = 4 and k = 7", explain: "3 + 4 = 7 factors of 2: 2⁷ = 128." }
```

## Investigate: three laws and zero

```step
stage: investigate
insight: "Dividing cancels pairs, so indices subtract; the base never changes (Kai multiplies it); a⁰ = 1 follows from dividing a power by itself."
tasks:
  - check:
      type: number
      q: "5⁶ ÷ 5² = 5 to what power?"
      answer: 4
      tolerance: 0
      feedback:
        - ["3", "That would be dividing the indices. Two pairs cancel: 6 − 2."]
      explain: "Two pairs of 5s cancel, leaving four: 5⁴."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai simplifies 3² × 3⁴. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: index-multiply-base
      explain: "Line 3: the base stays 3. There are six 3s multiplied together: 3⁶ (= 729), not 9⁶."
  - check:
      type: question
      q: "Why is 5⁰ equal to 1?"
      options: ["5³ ÷ 5³ = 1, and the quotient law gives 5³⁻³ = 5⁰", "Because 0 × 5 = 0, and then add 1", "Because any number to a power is at least 1", "It is a rule with no reason"]
      answer: 0
      feedback: [null, "5⁰ is not 0 × 5.", "Not a reason.", "There is a reason: the quotient law."]
      explain: "Dividing anything by itself gives 1, and the law says it is a⁰."
```

### Divide

Here is the routine.

```worked
3^5 \div 3^2 = \frac{3 \times 3 \times 3 \times 3 \times 3}{3 \times 3} :: Write both powers out.
= 3 \times 3 \times 3 = 3^3 :: Two pairs cancel: 5 − 2 = 3 factors left.
(2^3)^2 = 2^3 \times 2^3 = 2^6 :: A power of a power: 2 groups of 3 factors, 3 × 2.
2^3 \div 2^3 = 1 = 2^0 :: Everything cancels: so 2⁰ = 1.
```

### Find the mistake

Read Kai's working. What is the base?

### Zero

## Modify: each law on the board

```step
stage: modify
insight: "Building a quotient, a power of a power and a zero index on the board, then telling the product and power laws apart."
try: { playground: board, starter: "laws.yml#quotient", height: 600 }
tasks:
  - starter: "laws.yml#quotient"
    check: { type: board, text: "Make 2⁶ ÷ 2². What is left?", when: "a = 2 and m = 6 and n = 2", explain: "Two pairs cancel: 2⁴ = 16." }
  - starter: "laws.yml#power"
    check: { type: board, text: "Make (2²)³. How many 2s?", when: "a = 2 and m = 2 and n = 3", explain: "3 groups of 2 factors: 2⁶ = 64." }
  - starter: "laws.yml#zero"
    check: { type: board, text: "Show 5³ ÷ 5³. What is 5⁰?", when: "a = 5 and m = 3", explain: "Everything cancels: 5⁰ = 1." }
  - check:
      type: question
      q: "Which is bigger: (2³)² or 2³ × 2²?"
      options: ["(2³)², which is 2⁶ = 64", "2³ × 2², which is 2⁶", "They are equal", "2³ × 2², which is 2⁵"]
      answer: 0
      feedback: [null, "2³ × 2² adds the indices: 2⁵.", "One is 2⁶, the other 2⁵.", "2⁵ = 32 is the smaller one."]
      explain: "(2³)² = 2⁶ = 64 multiplies the indices; 2³ × 2² = 2⁵ = 32 adds them."
```

### Quotient

### Power of a power

### Zero index

### Power or product

## Practise: index laws

```step
stage: practise
insight: "Each law once, with a zero index, mixed; multiplying the bases is the planted slip; the powers review keeps evaluating fresh."
tasks:
  - check:
      type: number
      q: "7⁵ × 7³ = 7 to what power?"
      answer: 8
      tolerance: 0
      feedback:
        - ["15", "Multiplying powers adds the indices."]
      explain: "5 + 3 = 8: 7⁸."
  - check:
      type: number
      q: "(4²)⁵ = 4 to what power?"
      answer: 10
      tolerance: 0
      feedback:
        - ["7", "A power of a power multiplies the indices."]
      explain: "5 groups of 2: 2 × 5 = 10, so 4¹⁰."
  - check:
      type: number
      q: "What is 10⁰?"
      answer: 1
      tolerance: 0
      feedback:
        - ["0", "Any number except 0 to the power 0 is 1."]
      explain: "10⁰ = 1."
  - check:
      type: number
      q: "Review: what is 2⁵?"
      answer: 32
      tolerance: 0
      feedback:
        - ["10", "2⁵ is 2 × 2 × 2 × 2 × 2, not 2 × 5."]
      explain: "2 × 2 × 2 × 2 × 2 = 32."
```

### Product

### Power of a power

### Zero

### Review: powers

## Make: 2⁹ two ways

```step
stage: make
insight: "Finding a product that makes a target power uses the product law backwards."
try: { playground: board, starter: "laws.yml#run", height: 600 }
hint: ["The indices must add to 9.", "With m bigger than n: 5 and 4, or 6 and 3."]
check: { type: board, text: "Make a product of two powers of 2 equal to 2⁹, with the first index bigger than the second.", when: "a = 2 and k = 9 and m > n", explain: "2⁵ × 2⁴, or 2⁶ × 2³: the indices add to 9." }
```

Then write 2⁹ as a quotient of two powers of 2, and as a power of a power.
