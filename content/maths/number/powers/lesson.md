---
order: 6
unit: powers
node: AC9M7N02 n1
uses: [AC9M7N01 n1]   # squares as a first power (Squares and square roots)
title: Powers
summary: "2 × 2 × 2 × 2 is written 2⁴: the base 2 is multiplied by itself, and the exponent 4 counts how many times. 2⁴ = 16, not 8."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Fold a sheet of paper in half, then again, and again. After 7 folds it is 2⁷ = 128 layers thick. Powers grow fast, and the short way to write them is exponent notation."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8266
  url: http://127.0.0.1:8266/index.html
  readySelector: ".ftpick button"
  layout: full
explainPicture: { ref: tree.yml#explain-pic, caption: "A factor tree for 8: split it until every branch is a prime. Three 2s: $8 = 2 \\times 2 \\times 2 = 2^3$." }
explainClip:
  query: { code: "@tree.yml#explain", fresh: 1, id: explain }
  caption: "Three 2s"
  say: "The exponent counts the equal factors."
  clip:
    - caption: { text: "Split 8 into 2 × 4.", say: "Split eight into two times four." }
    - click: Split 8
    - click: 2 × 4
    - wait: 600
    - caption: { text: "Split 4 into 2 × 2. Every branch is a 2.", say: "Split four into two times two." }
    - click: Split 4
    - click: 2 × 2
    - expect: { selector: "#gsum", contains: "2³" }
    - wait: 600
    - caption: { text: "Three 2s multiplied: 2³ = 8.", say: "Three twos multiplied: two cubed is eight." }
    - wait: 1400
---
When the same number is multiplied again and again, there is a short way to write it:

$$2 \times 2 \times 2 \times 2 = 2^4$$

The **base** (2) is the number being multiplied. The **exponent** (4), also called the index or power, counts how many times it appears. You say "2 to the power of 4". You have met two already: $5^2$ is "5 squared", and $2^3$ is "2 cubed".

The board grows a **factor tree**: it splits a number into a factor pair (two numbers that multiply to it), and keeps splitting until every branch is a **prime**, a number with exactly two factors, 1 and itself (2, 3, 5, 7, …).

## Predict: 2 cubed

```step
stage: predict
insight: "Committing to a value for 2³ shows whether they read the exponent as a multiplier (6) or as a count of factors (8)."
check:
  type: predict
  q: "What is $2^3$?"
  options: ["8", "6", "5", "23"]
  actual: "8. 2³ = 2 × 2 × 2 = 8: three 2s multiplied. 6 is 2 × 3."
```

How many 2s are multiplied in $2^3$?

## Run: grow a tree for 16

```step
stage: run
insight: "Splitting 16 until every branch is a prime shows four equal factors, and the board writes them as 2⁴."
try: { playground: board, starter: "tree.yml#run", height: 560 }
check: { type: board, text: "Split 16 into factor pairs until every branch ends in a prime. How many 2s? Was your prediction for $2^3$ right?", when: "c = 1" }
```

Click a number that is not prime (or use the Split buttons), then choose a factor pair.

## Investigate: base and exponent

```step
stage: investigate
insight: "The exponent counts factors of the base; Mia's mistake multiplies the base by the exponent. Powers of 10 count zeros, the same idea in place value."
tasks:
  - check:
      type: answer
      q: "Work out $3^4$."
      answer: "81"
      feedback:
        - ["12", "That is 3 × 4. 3⁴ means four 3s multiplied: 3 × 3 × 3 × 3."]
        - ["64", "That is 4³. The base is 3."]
      explain: "3 × 3 = 9, × 3 = 27, × 3 = 81."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia works out $2^5$. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: power-times
      explain: "Line 3: 2⁵ is five 2s multiplied, 2 × 2 × 2 × 2 × 2 = 32, not 2 × 5."
  - check:
      type: match
      q: "Match each power to what it means."
      pairs:
        - ["$10^3$", "10 × 10 × 10 = 1000"]
        - ["$3^2$", "3 × 3 = 9"]
        - ["$2^3$", "2 × 2 × 2 = 8"]
        - ["$5^1$", "just 5"]
      explain: "The exponent counts the factors. 10³ is 1 followed by three zeros; 5¹ is one 5."
```

### Read the power

Here is how to go between the two forms.

```worked
2 \times 2 \times 2 \times 2 \times 2 = 2^5 :: Count the equal factors: five 2s, so the exponent is 5.
2^5 = 2 \times 2 \times 2 \times 2 \times 2 = 32 :: Expand and multiply: 4, 8, 16, 32.
3 \times 3 \times 5 = 3^2 \times 5 :: Different bases get their own powers.
10^4 = 10\,000 :: Powers of 10: the exponent counts the zeros.
```

Now try one: $3^4$.

### Find the mistake

Read Mia's working. What does the 5 count?

### Match them

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a bigger tree, writing a power from a product, two bases, then the exponent 1 and the order of base and exponent."
try: { playground: board, starter: "tree.yml#thirtytwo", height: 560 }
tasks:
  - starter: "tree.yml#thirtytwo"
    hint: "Start with 2 × 16, or 4 × 8."
    check: { type: board, text: "Grow a tree for 32. Write 32 as a power of 2.", when: "c = 1", explain: "32 = 2 × 2 × 2 × 2 × 2 = 2⁵." }
  - check:
      type: question
      q: "Write $7 \\times 7 \\times 7$ as a power."
      options: ["$7^3$", "$3^7$", "$7 \\times 3$", "$21$"]
      answer: 0
      feedback: [null, "That is seven 3s. The base is the number multiplied.", "That is 21, not 343.", "7 × 7 × 7 = 343."]
      explain: "Three 7s multiplied: 7³ = 343."
  - check:
      type: answer
      q: "Work out $2^3 \\times 3^2$."
      answer: "72"
      feedback:
        - ["12", "That is 2 × 3 + 3 × 2: the exponents were used as multipliers. 2³ = 8 and 3² = 9."]
        - ["36", "That is 6². Work out each power first: 8 × 9."]
      explain: "2³ = 8 and 3² = 9, so 8 × 9 = 72."
  - check:
      type: question
      q: "Edge case: which is bigger, $2^5$ or $5^2$?"
      options: ["$2^5 = 32$ is bigger than $5^2 = 25$", "They are equal: both use 2 and 5", "$5^2$, because 5 is the bigger base"]
      answer: 0
      feedback: [null, "Swapping base and exponent changes the value: 32 and 25.", "A bigger base does not always win: 2⁵ = 32 and 5² = 25."]
      explain: "2⁵ = 32 and 5² = 25: the order matters."
```

### Thirty-two

Each task changes one thing.

### Write the power

### Two bases

### Swap them

## Practise: powers

```step
stage: practise
insight: "Evaluating, writing and comparing powers, mixed; the exponent as a multiplier is the planted slip; the review keeps roots fresh."
tasks:
  - check:
      type: answer
      q: "Work out $4^3$."
      answer: "64"
      feedback:
        - ["12", "That is 4 × 3. 4³ is 4 × 4 × 4."]
      explain: "4 × 4 × 4 = 64."
  - check:
      type: answer
      q: "Work out $10^5$."
      answer: "100000"
      feedback:
        - ["50", "That is 10 × 5. 10⁵ has five 10s: 1 followed by five zeros."]
      explain: "1 followed by five zeros: 100 000."
  - check:
      type: question
      q: "Write $2 \\times 2 \\times 5 \\times 5 \\times 5$ with exponents."
      options: ["$2^2 \\times 5^3$", "$2^3 \\times 5^2$", "$10^5$", "$4 \\times 15$"]
      answer: 0
      feedback: [null, "Count again: two 2s and three 5s.", "10⁵ = 100 000, much bigger. Different bases get their own powers.", "4 is right (2²), but 5 × 5 × 5 = 125, not 15."]
      explain: "Two 2s and three 5s: 2² × 5³ = 4 × 125 = 500."
  - check:
      type: answer
      q: "Review: work out $\\sqrt{144}$."
      answer: "12"
      feedback:
        - ["72", "That is half of 144."]
      explain: "12 × 12 = 144."
```

### Evaluate

### Powers of 10

### Write it

### Review: roots

## Make: 64 three ways

```step
stage: make
insight: "Growing a tree for 64 and writing it as a power of 2, of 4 and of 8 shows one number has several power names, all from the same six 2s."
try: { playground: board, starter: "tree.yml#make", height: 600 }
hint: ["Split 64 into 8 × 8, or 2 × 32, or 4 × 16.", "Group the six 2s in pairs for 4s, in threes for 8s."]
check: { type: board, text: "Grow a tree for 64.", when: "c = 1", explain: "64 = 2⁶ = 4³ = 8²: six 2s, grouped in pairs (three 4s) or in threes (two 8s)." }
```

Then write 64 as a power of 2, a power of 4 and a power of 8.
