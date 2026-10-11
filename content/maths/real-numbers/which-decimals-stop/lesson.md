---
order: 2
unit: decimals
node: AC9M8N03 n2
uses: [AC9M8N03 n1, AC9M7N02 n2]
title: Which decimals stop?
summary: "Write the fraction in simplest form and break the denominator into primes. If its only prime factors are 2 and 5, the decimal terminates; any other prime factor makes it recur. It works because 10 = 2 × 5."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Without dividing anything, you can tell that 7/40 stops and 7/30 goes on forever. The secret is in the denominator's prime factors."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8311
  url: http://127.0.0.1:8311/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: divide.yml#explain-pic, caption: "7/40 = 0.175: 40 = 2 × 2 × 2 × 5, only 2s and 5s, so it terminates." }
explainClip:
  query: { code: "@divide.yml#explain", fresh: 1, id: explain }
  caption: "Simplify first"
  say: "Simplify, then look at the denominator's primes."
  clip:
    - caption: { text: "9/24: twenty-four has a 3 in it. But simplify first.", say: "Nine twenty-fourths. Twenty-four has a three in it, but simplify first." }
    - wait: 1400
    - caption: { text: "9/24 = 3/8, and 8 = 2 × 2 × 2: it terminates.", say: "Nine twenty-fourths is three eighths. Eight is all twos, so it stops." }
    - wait: 1200
    - caption: { text: "10/24 = 5/12: a 3 is left, so it recurs.", say: "Ten twenty-fourths is five twelfths. A three is left, so it repeats." }
    - click: Make the numerator bigger
    - expect: { selector: "#gsum", contains: "10/24" }
    - wait: 1500
---
A terminating decimal is a fraction over 10, 100, 1000…: $0.175 = \frac{175}{1000}$. Since $10 = 2 \times 5$, those denominators are made only of 2s and 5s. So:

1. Write the fraction in **simplest form**.
2. Break the denominator into **prime factors**.
3. Only 2s and 5s: it **terminates**. Any other prime (3, 7, 11…): it **recurs**.

$\frac{7}{40}$: $40 = 2 \times 2 \times 2 \times 5$, so it terminates (0.175). $\frac{7}{30}$: $30 = 2 \times 3 \times 5$ has a 3, so it recurs (0.2333…).

## Predict: eleven fiftieths

```step
stage: predict
insight: "Committing to whether 11/50 stops, without dividing, shows whether they look at the denominator's factors or its size."
check:
  type: predict
  q: "Without dividing: does 11/50 terminate or recur?"
  options: ["Terminate", "Recur", "You cannot tell without dividing"]
  actual: "It terminates: 50 = 2 × 5 × 5, only 2s and 5s. 11/50 = 22/100 = 0.22."
```

Break 50 into primes.

## Run: test the rule

```step
stage: run
insight: "Trying many denominators with their prime factors shown connects 2s and 5s to decimals that stop."
try: { playground: board, starter: "divide.yml#run", height: 680 }
check: { type: board, text: "Set 11/50 and check your prediction. Then try 11/30.", when: "a = 11 and b = 50", explain: "50 = 2 × 5²: only 2s and 5s, so 11/50 = 0.22." }
```

## Investigate: why 2s and 5s

```step
stage: investigate
insight: "Terminating decimals are fractions over powers of 10, made of 2s and 5s; simplify first (Max does not); sorting fractions applies the rule."
tasks:
  - check:
      type: question
      q: "Why do only 2s and 5s in the denominator give a terminating decimal?"
      options: ["10 = 2 × 5, so only those can multiply up to 10, 100, 1000…", "2 and 5 are the smallest primes", "Because 2 + 5 = 7", "Because even numbers always terminate"]
      answer: 0
      feedback: [null, "3 is smaller than 5 and does not work.", "Adding has nothing to do with it.", "6 is even, and 1/6 recurs."]
      explain: "A terminating decimal is a fraction over a power of 10, and 10 = 2 × 5."
  - check:
      type: bug
      code: "working.txt#max"
      text: "Max decides whether 3/12 terminates. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: terminate-no-simplify
      explain: "Line 3: simplify first. 3/12 = 1/4, and 4 = 2 × 2, so it terminates: 0.25."
  - check:
      type: sort
      q: "Terminate or recur?"
      options: ["Terminates", "Recurs"]
      items:
        - ["1/16", "Terminates"]
        - ["3/20", "Terminates"]
        - ["1/12", "Recurs"]
        - ["2/15", "Recurs"]
        - ["7/25", "Terminates"]
        - ["6/15", "Terminates", "6/15 = 2/5: simplify first."]
      explain: "Simplify, then check the denominator for primes other than 2 and 5."
```

### Why it works

### Find the mistake

Read Max's working. What is 3/12 in simplest form?

### Sort them

## Modify: find one that stops

```step
stage: modify
insight: "Choosing numerators that cancel the bad primes shows simplifying decides the answer."
try: { playground: board, starter: "divide.yml#free", height: 680 }
tasks:
  - starter: "divide.yml#free"
    hint: ["15 = 3 × 5.", "Choose a numerator that cancels the 3."]
    check: { type: board, text: "Find a fraction with denominator 15 that terminates.", when: "b = 15 and t = 1", explain: "The numerator must be a multiple of 3: 3/15 = 1/5 = 0.2, or 6/15, 9/15…" }
  - starter: "divide.yml#free"
    hint: "24 = 2 × 2 × 2 × 3: cancel the 3."
    check: { type: board, text: "Find a fraction with denominator 24 that terminates.", when: "b = 24 and t = 1", explain: "A multiple of 3 on top: 3/24 = 1/8 = 0.125." }
  - check:
      type: question
      q: "Does 1/80 terminate?"
      options: ["Yes: 80 = 2 × 2 × 2 × 2 × 5", "No: 80 is too big", "No: 80 has an 8 in it", "You must divide to know"]
      answer: 0
      feedback: [null, "Size does not matter, only prime factors.", "8 is not a prime: 8 = 2 × 2 × 2.", "The prime factors tell you."]
      explain: "Only 2s and 5s: 1/80 = 0.0125."
  - check:
      type: question
      q: "Which fraction recurs?"
      options: ["1/30", "9/30", "3/30", "6/30"]
      answer: 0
      feedback: [null, "9/30 = 3/10 = 0.3.", "3/30 = 1/10 = 0.1.", "6/30 = 1/5 = 0.2."]
      explain: "1/30 is already simplest, and 30 = 2 × 3 × 5 has a 3: 0.0333…"
```

### Fifteenths

### Twenty-fourths

### Eightieths

### Thirtieths

## Practise: which stop

```step
stage: practise
insight: "The rule with simplifying, a count of decimal places, and a review of block lengths, mixed; not simplifying first is the planted slip."
tasks:
  - check:
      type: question
      q: "Does 7/56 terminate or recur?"
      options: ["Terminate: 7/56 = 1/8", "Recur: 56 has a 7", "Recur: 56 is too big", "You cannot tell"]
      answer: 0
      feedback: [null, "Simplify first: the 7 cancels.", "Size does not decide.", "Simplify and look at the primes."]
      explain: "7/56 = 1/8 = 0.125."
  - check:
      type: number
      q: "1/16 terminates. How many decimal places does it have?"
      answer: 4
      tolerance: 0
      explain: "16 = 2⁴, so 1/16 = 625/10 000 = 0.0625: four places."
  - check:
      type: question
      q: "Which denominator always gives a terminating decimal, whatever the numerator?"
      options: ["50", "30", "21", "12"]
      answer: 0
      feedback: [null, "30 has a 3.", "21 = 3 × 7.", "12 has a 3."]
      explain: "50 = 2 × 5 × 5: only 2s and 5s."
  - check:
      type: number
      q: "Review: how many digits are in the repeating block of 1/9?"
      answer: 1
      tolerance: 0
      explain: "1/9 = 0.111…: one digit."
```

### Simplify first

### Places

### Always stops

### Review: block length

## Make: sixtieths

```step
stage: make
insight: "Finding a terminating fraction over 60 combines simplifying and the prime rule."
try: { playground: board, starter: "divide.yml#free", height: 680 }
hint: ["60 = 2 × 2 × 3 × 5.", "The numerator must cancel the 3."]
check: { type: board, text: "Find a fraction with denominator 60 that terminates.", when: "b = 60 and t = 1", explain: "A multiple of 3 on top: 3/60 = 1/20 = 0.05." }
```

Then explain, using primes, why your fraction stops and 1/60 does not.
