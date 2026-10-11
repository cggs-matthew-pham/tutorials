---
order: 7
unit: powers
node: AC9M7N02 n2
title: Prime factors
summary: "Split a number into factor pairs until every branch is a prime: 36 = 2 × 2 × 3 × 3 = 2² × 3². Every tree for 36 ends with the same primes."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Every whole number above 1 is built from primes in exactly one way, like a code. 60 is 2² × 3 × 5, and no other number has that code."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8267
  url: http://127.0.0.1:8267/index.html
  readySelector: ".ftpick button"
  layout: full
explainPicture: { ref: tree.yml#explain-pic, caption: "A factor tree for 60 starts with a factor pair and splits until every branch ends in a circled prime: $60 = 2^2 \\times 3 \\times 5$." }
explainClip:
  query: { code: "@tree.yml#explain", fresh: 1, id: explain }
  caption: "Down to the primes"
  say: "Split until every branch is a prime."
  clip:
    - caption: { text: "60 = 6 × 10.", say: "Sixty is six times ten." }
    - click: Split 60
    - click: 6 × 10
    - wait: 500
    - caption: { text: "6 = 2 × 3 and 10 = 2 × 5.", say: "Six is two times three. Ten is two times five." }
    - click: Split 6
    - click: 2 × 3
    - click: Split 10
    - click: 2 × 5
    - expect: { selector: "#gsum", contains: "2² × 3 × 5" }
    - wait: 600
    - caption: { text: "All primes: 60 = 2² × 3 × 5.", say: "All primes: two squared, times three, times five." }
    - wait: 1400
---
A **prime** has exactly two factors, 1 and itself: 2, 3, 5, 7, 11, 13, … (1 is not prime.) Every whole number above 1 that is not prime can be split into primes. Writing it that way, with exponents, is its **prime factorisation**:

$$36 = 2 \times 2 \times 3 \times 3 = 2^2 \times 3^2$$

A **factor tree** finds it: split the number into any factor pair, then split each branch that is not prime, until every branch ends in a prime.

## Predict: two trees for 36

```step
stage: predict
insight: "Committing to whether two different first splits give the same primes surfaces the belief that a prime factorisation depends on the tree."
check:
  type: predict
  q: "Sam starts a factor tree for 36 with $6 \\times 6$. Ali starts with $4 \\times 9$. When both finish, will they have the same primes?"
  options: ["Yes, the same primes", "No: different starts give different primes", "Only if they both start with 2"]
  actual: "Yes. 6 × 6 → 2 × 3 × 2 × 3, and 4 × 9 → 2 × 2 × 3 × 3: both are 2² × 3². A number has only one prime factorisation."
```

Think about what 6, 4 and 9 split into.

## Run: grow a tree for 36

```step
stage: run
insight: "Growing a tree for 36 with any first split ends in 2² × 3², which tests the prediction."
try: { playground: board, starter: "tree.yml#run", height: 560 }
check: { type: board, text: "Grow a factor tree for 36 until every branch is a prime. Then press Start again and try a different first split. Was your prediction right?", when: "c = 1" }
```

Prime branches are circled. The board writes the product with exponents when the tree is finished.

## Investigate: all the way down

```step
stage: investigate
insight: "A tree is finished only when every branch is prime; Leo stops at composite branches. Any route gives the same primes, so a factorisation can be checked by expanding."
tasks:
  - check:
      type: question
      q: "What is the prime factorisation of 60?"
      options: ["$2^2 \\times 3 \\times 5$", "$2 \\times 3 \\times 10$", "$4 \\times 15$", "$2 \\times 30$"]
      answer: 0
      feedback: [null, "10 is not prime: split it into 2 × 5.", "4 and 15 are not prime.", "30 is not prime."]
      explain: "60 = 6 × 10 = 2 × 3 × 2 × 5 = 2² × 3 × 5. Check: 4 × 3 × 5 = 60."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo writes 36 as a product of prime factors. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: tree-stops-early
      explain: "Line 3: 4 and 9 are not prime, so the tree is not finished. 4 = 2 × 2 and 9 = 3 × 3, so 36 = 2² × 3²."
  - check:
      type: question
      q: "Why is $2 \\times 2 \\times 9$ not the prime factorisation of 36?"
      options: ["9 is not prime: it splits into 3 × 3", "It does not equal 36", "The 2s should be written first"]
      answer: 0
      feedback: [null, "2 × 2 × 9 = 36, so it is equal. The problem is a factor that is not prime.", "The order is fine; the problem is the 9."]
      explain: "Every factor must be prime: 9 = 3 × 3, so 36 = 2² × 3²."
```

### Split, then write with exponents

Here is a tree for 60, written as working.

```worked
60 = 6 \times 10 :: Start with any factor pair.
6 = 2 \times 3, \quad 10 = 2 \times 5 :: Split every branch that is not prime.
60 = 2 \times 2 \times 3 \times 5 :: Every branch is prime: collect them, smallest first.
60 = 2^2 \times 3 \times 5 :: Write repeated primes with exponents. Check: 4 × 3 × 5 = 60.
```

Now try one: which is the prime factorisation of 60?

### Find the mistake

Read Leo's working. Is every branch a prime?

### Primes only

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a bigger tree, expanding a factorisation back to its number, then a prime as the edge case (and why 1 is left out)."
try: { playground: board, starter: "tree.yml#seventytwo", height: 560 }
tasks:
  - starter: "tree.yml#seventytwo"
    hint: "Start with 8 × 9, or 2 × 36."
    check: { type: board, text: "Grow a tree for 72. Write its prime factorisation.", when: "c = 1", explain: "72 = 8 × 9 = 2³ × 3²." }
  - check:
      type: answer
      q: "Which number has the prime factorisation $2^2 \\times 5 \\times 7$?"
      answer: "140"
      feedback:
        - ["70", "2² is 4, not 2: 4 × 5 × 7."]
        - ["14", "That adds 2, 5 and 7. Multiply, with 2² = 4: 4 × 5 × 7."]
      explain: "2² = 4, and 4 × 5 × 7 = 140."
  - check:
      type: question
      q: "Edge case: what is the prime factorisation of 13?"
      options: ["13 (it is prime)", "1 × 13", "There is none"]
      answer: 0
      feedback: [null, "1 is not prime, so it is not written in a prime factorisation.", "A prime is its own prime factorisation."]
      explain: "13 is prime, so it is already a product of primes: just 13. 1 is never included: it is not prime."
```

### Seventy-two

Each task changes one thing.

### Back to the number

### A prime

## Practise: prime factorisations

```step
stage: practise
insight: "Finding, reading and checking factorisations, mixed; stopping at a composite is the planted slip; the review keeps powers fresh."
tasks:
  - check:
      type: question
      q: "What is the prime factorisation of 90?"
      options: ["$2 \\times 3^2 \\times 5$", "$2 \\times 5 \\times 9$", "$9 \\times 10$", "$2 \\times 3 \\times 15$"]
      answer: 0
      feedback: [null, "9 is not prime.", "9 and 10 are not prime.", "15 is not prime."]
      explain: "90 = 9 × 10 = 3 × 3 × 2 × 5 = 2 × 3² × 5."
  - check:
      type: answer
      q: "Which number has the prime factorisation $2^3 \\times 5$?"
      answer: "40"
      feedback:
        - ["30", "2³ is 8, not 6: 8 × 5."]
      explain: "2³ = 8, and 8 × 5 = 40."
  - check:
      type: question
      q: "What is the prime factorisation of 100?"
      options: ["$2^2 \\times 5^2$", "$10^2$", "$4 \\times 25$", "$2 \\times 5^2$"]
      answer: 0
      feedback: [null, "10² = 100, but 10 is not prime.", "4 and 25 are not prime.", "That is 50: there are two 2s."]
      explain: "100 = 10 × 10 = 2 × 5 × 2 × 5 = 2² × 5²."
  - check:
      type: answer
      q: "Review: work out $3^4$."
      answer: "81"
      feedback:
        - ["12", "That is 3 × 4."]
      explain: "3 × 3 × 3 × 3 = 81."
```

### Ninety

### Back to the number

### One hundred

### Review: powers

## Make: a tree for 360

```step
stage: make
insight: "A larger number, with a first split of the student's choosing, shows the factorisation is the same whatever the route."
try: { playground: board, starter: "tree.yml#make", height: 620 }
hint: ["Start with 36 × 10, or 6 × 60, or 2 × 180.", "Keep going until every branch is circled."]
check: { type: board, text: "Grow a tree for 360, starting with any factor pair you like.", when: "c = 1", explain: "360 = 2³ × 3² × 5, whichever pair you start with." }
```

Then compare with someone who started differently. Check by expanding: $8 \times 9 \times 5$.
