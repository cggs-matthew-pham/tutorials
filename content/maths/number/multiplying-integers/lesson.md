---
order: 3
unit: integers
node: AC9M8N04 n1
uses: [AC9M7N07 n2]   # the "opposite way" idea from subtracting a negative
title: Multiplying and dividing integers
summary: a × b is a jumps of b from zero. A negative number of jumps goes the opposite way, so a negative times a negative is positive. Division undoes it with the same signs.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A tank loses 3 litres an hour. Three hours ago, did it hold more or less than now? A negative rate times a negative time: the answer is a positive change."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8166
  url: http://127.0.0.1:8166/index.html
  readySelector: "#sl-a"
  layout: full
explainPicture: { ref: jumps.yml#explain-pic, caption: "$-3 \\times (-2)$: 3 jumps of $-2$ would go to $-6$; a negative number of jumps goes the opposite way, to $6$." }
explainClip:
  query: { code: "@jumps.yml#explain", fresh: 1, id: explain }
  caption: "Multiplying is jumps from zero"
  say: "Multiplying is a number of jumps from zero."
  clip:
    - caption: { text: "2 × 3: 2 jumps of 3, to 6.", say: "Two times three: two jumps of three, to six." }
    - wait: 300
    - caption: { text: "2 × (−3): 2 jumps of −3, to −6.", say: "Two times negative three: two jumps to the left, to negative six." }
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - wait: 300
    - caption: { text: "−2 × (−3): a negative number of jumps goes the opposite way, to 6.", say: "Negative two jumps go the opposite way: positive six." }
    - click: Make a smaller
    - click: Make a smaller
    - click: Make a smaller
    - click: Make a smaller
    - expect: { selector: "#nlsum", contains: "−2 × (−3) = 6" }
    - wait: 1200
---
You can add and subtract integers by moving along a number line. Now: multiplying and dividing. $3 \times 2$ is 3 jumps of 2 from zero, and $3 \times (-2)$ is 3 jumps of $-2$.

But what is $-3 \times (-2)$? A negative number of jumps? In this lesson you find out, first from a pattern, then on the line.

## Predict: −3 × (−2)

```step
stage: predict
insight: "Committing to a sign for −3 × (−2) before the board shows it tests whether they carry over the addition rule (two negatives make a bigger negative)."
check:
  type: predict
  q: "What is $-3 \\times (-2)$?"
  options:
    - "$6$"
    - "$-6$"
    - "$-5$"
    - "$1$"
  actual: "6. 3 jumps of −2 would go left to −6; a negative number of jumps goes the opposite way, to 6. The pattern 3 × (−2) = −6, 2 × (−2) = −4, 1 × (−2) = −2, 0 × (−2) = 0 goes up by 2 each time, so −1 × (−2) = 2 and −3 × (−2) = 6."
```

Think about the pattern $3 \times (-2)$, $2 \times (-2)$, $1 \times (-2)$, $0 \times (-2)$. What happens each time?

## Run: follow the pattern

```step
stage: run
insight: "Making a smaller one step at a time shows the answer going up by 2 each time, through zero and past it: the pattern forces a negative times a negative to be positive."
try: { playground: board, starter: "jumps.yml#run", height: 460 }
check: { type: board, text: "The board shows $3 \\times (-2)$. Make $a$ smaller one step at a time until it is $-3$. Was your prediction right?", when: "a = -3 and b = -2" }
```

$a$ is the number of jumps and $b$ the size of each jump, from zero. Say each answer before you press −: $-6$, $-4$, $-2$, $0$, … What comes next?

## Investigate: the sign rules

```step
stage: investigate
insight: "The pattern and the line give one rule: the same signs give a positive, different signs a negative, for multiplying and for dividing. Kai's mistake uses the addition rule for multiplication."
tasks:
  - check:
      type: trace
      text: "Fill in the pattern for $a \\times (-2)$."
      table: |
        | a | 3 | 2 | 1 | 0 | −1 | −2 | −3 |
        | a × (−2) | −6 | −4 | −2 | [0] | [2] | [4] | [6] |
      explain: "Each step down in a adds 2 to the answer, so past zero the answers are positive: −3 × (−2) = 6."
  - check:
      type: question
      q: "Which is $-12 \\div 3$?"
      options: ["$-4$", "$4$", "$-9$"]
      answer: 0
      feedback: [null, "Check: 3 × 4 = 12, not −12.", "Dividing, not subtracting."]
      explain: "−12 ÷ 3 = −4, because 3 × (−4) = −12. Different signs give a negative."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai works out $-4 \\times (-3)$. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: sign-rules-addition
      explain: "Line 3: that is the rule for adding (−4 + −3 = −7). For multiplying, two negatives give a positive: −4 × (−3) = 12."
```

### The pattern

Fill in the table. Each step down in $a$: what happens to the answer?

### Signs from the pattern

Here is how the sign rules come from the pattern and the line.

```worked
3 \times (-2) = -6 :: 3 jumps of $-2$: left 6.
-3 \times (-2) = 6 :: A negative number of jumps goes the opposite way: right 6.
\text{same signs} \to + :: $3 \times 2 = 6$ and $-3 \times (-2) = 6$.
\text{different signs} \to - :: $3 \times (-2) = -6$ and $-3 \times 2 = -6$.
-12 \div 3 = -4 :: Dividing undoes multiplying: $3 \times (-4) = -12$, so the same rule holds.
-12 \div (-3) = 4 :: Same signs, positive: check $-3 \times 4 = -12$.
```

Then: which is $-12 \div 3$?

### Find the mistake

Read Kai's working one line at a time. Which rule did he use?

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: positive times negative, negative times positive, negative times negative, the edge case of zero, then division with each pair of signs."
try: { playground: board, starter: "jumps.yml#vary", height: 460 }
tasks:
  - starter: "jumps.yml#vary"
    hint: "4 jumps of −3."
    check: { type: answer, q: "Work out $4 \\times (-3)$. Set the board to check.", answer: "-12", feedback: [["12", "4 jumps of −3 go left."], ["1", "Multiply, don't add."]], explain: "4 jumps of −3: left 12, so −12." }
  - starter: "jumps.yml#vary"
    hint: "−4 jumps of 3: 4 jumps of 3 would go right, so these go left."
    check: { type: answer, q: "Work out $-4 \\times 3$.", answer: "-12", feedback: [["12", "Different signs give a negative."], ["-1", "Multiply, don't add."]], explain: "Different signs: −12. The same as 3 × (−4)." }
  - starter: "jumps.yml#vary"
    hint: "4 jumps of −3 would go left to −12. A negative number of jumps goes the opposite way."
    check: { type: answer, q: "Work out $-4 \\times (-3)$.", answer: "12", feedback: [["-12", "Same signs give a positive: a negative number of jumps goes the opposite way."], ["-7", "That is −4 + (−3). Multiply."]], explain: "Same signs: 12." }
  - check:
      type: answer
      q: "Edge case: work out $-5 \\times 0$."
      answer: "0"
      feedback:
        - ["-5", "No jumps at all, or jumps of size 0: you stay at 0."]
        - ["5", "Anything times 0 is 0."]
      explain: "−5 jumps of 0 stay at 0: anything times 0 is 0, whatever its sign."
  - check:
      type: answer
      q: "Work out $-20 \\div (-4)$."
      answer: "5"
      feedback:
        - ["-5", "Same signs give a positive. Check: −4 × (−5) = 20, not −20."]
      explain: "Same signs: 5. Check: −4 × 5 = −20."
```

### Positive times negative

Each task changes one sign. Use the board to check.

### Negative times positive

### Negative times negative

### Times zero

### Dividing

No board: use the rule and check by multiplying.

## Practise: all four signs

```step
stage: practise
insight: "Multiplying, dividing and powers of −1, mixed, with the addition rule as the planted mix-up; the review keeps adding negatives apart from multiplying them."
tasks:
  - check:
      type: answer
      q: "Work out $-6 \\times (-5)$."
      answer: "30"
      feedback:
        - ["-30", "Same signs give a positive."]
        - ["-11", "That is −6 + (−5). Multiply."]
      explain: "Same signs: 30."
  - check:
      type: answer
      q: "Work out $18 \\div (-3)$."
      answer: "-6"
      feedback:
        - ["6", "Different signs give a negative."]
      explain: "Different signs: −6. Check: −3 × (−6) = 18."
  - check:
      type: question
      q: "What is $(-1)^3$, which is $(-1) \\times (-1) \\times (-1)$?"
      options: ["$-1$", "$1$", "$-3$"]
      answer: 0
      feedback: [null, "(−1) × (−1) = 1, then 1 × (−1) = −1.", "That is −1 × 3. A power multiplies −1 by itself."]
      explain: "(−1) × (−1) = 1, then × (−1) again: −1. An odd number of negatives gives a negative."
  - check:
      type: answer
      q: "Review: work out $-4 + (-3)$."
      answer: "-7"
      feedback:
        - ["12", "That is −4 × (−3). Adding a negative moves left."]
        - ["7", "Start at −4 and move 3 further left."]
      explain: "Adding a negative moves left: −7. Compare: −4 × (−3) = 12."
```

### Multiply

### Divide

### Powers of −1

### Review: adding is different

## Make: a positive from negatives

```step
stage: make
insight: "Choosing two negatives whose product is a given positive reverses the lesson: from the answer back to the signs."
try: { playground: board, starter: "jumps.yml#make", height: 460 }
hint: ["Which pairs of whole numbers multiply to 12?", "Make both of them negative."]
check: { type: board, text: "Set $a$ and $b$ so that both are negative and $a \\times b = 12$.", when: "a < 0 and b < 0 and r = 12", explain: "−3 × (−4) or −4 × (−3) (and −2 × (−6), off this board): same signs give a positive." }
```

Find two negative numbers that multiply to 12. Then find another pair.

Stretch: find three negative numbers that multiply to $-12$.
