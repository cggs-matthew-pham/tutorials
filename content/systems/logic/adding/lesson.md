---
order: 2
node: AC9TDI8K04 n3
unit: build
title: Adding with gates
summary: "Adding two bits is a truth table: the sum is XOR and the carry is AND, a half adder. A full adder also takes a carry in. One full adder per place, carries passed to the left, adds whole binary numbers."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A processor adds billions of numbers a second, and it is only gates. How do switches add?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8483
  url: http://127.0.0.1:8483/index.html
  readySelector: ".gtbits"
  layout: full
explainPicture: { ref: adding.yml#explain-pic, caption: "5 + 7 in binary: one full adder per place, each passing its carry to the left. 0101 + 0111 = 1100 (12)." }
explainClip:
  query: { code: "@adding.yml#explain", fresh: 1, id: explain }
  caption: "Adding with full adders"
  say: "One full adder for each place."
  clip:
    - click: "A bit worth 4, off, 0"
    - click: "A bit worth 1, off, 0"
    - caption: { text: "A = 0101, which is 5.", say: "A is 5." }
    - wait: 800
    - click: "B bit worth 4, off, 0"
    - click: "B bit worth 2, off, 0"
    - click: "B bit worth 1, off, 0"
    - expect: { selector: "#gsum", contains: "= 12" }
    - caption: { text: "B = 0111 (7). Each place adds its two bits and the carry from the right: 1100, which is 12.", say: "Each adder passes its carry left. 5 plus 7 is 12." }
    - wait: 1800
---
Adding in binary works like adding in columns at primary school, with only 0 and 1. Each column is a small truth table, so gates can do it.

## Predict: 1 + 1

```step
stage: predict
insight: "Committing to what 1 + 1 is in binary tests the new move, a sum bit and a carry bit, before students build it."
check:
  type: predict
  q: "In binary, what is 1 + 1?"
  options: ["10: write 0, carry 1", "2", "11", "0: it overflows and is lost"]
  actual: "10 (two): write 0 in this place and carry 1 to the next, just as 5 + 5 in base ten writes 0 and carries 1."
```

## Try: build a half adder

```step
stage: run
insight: "Building the adder for one place settles the prediction: the A = 1, B = 1 row gives sum 0, carry 1."
try: { playground: board, starter: "adding.yml#run", height: 600 }
check: { type: board, text: "Build the half adder: S (sum) and C (carry) for two bits. Every row should match.", when: "k = 1", explain: "Sum = A XOR B, carry = A AND B. The last row, 1 + 1, gives S 0 and C 1: binary 10." }
```

Was your prediction right? Look at the last row of the table.

## Worked example: 5 + 7 in four bits

```step
stage: investigate
insight: "Adding 0101 + 0111 place by place, carries passed left, models the new move. Sam writes a 2, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "Add 0110 + 0011 (6 + 3) the same way. What is the sum, in four bits?"
      answer: "1001"
      feedback:
        - ["0111", "Look at the twos place: 1 + 1 makes 0, carry 1."]
        - ["9", "That's right in base ten; write it in binary."]
      explain: "Ones: 0 + 1 = 1. Twos: 1 + 1 = 0, carry 1. Fours: 1 + 0 + carry 1 = 0, carry 1. Eights: 0 + 0 + carry 1 = 1. 1001 = 9."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam adds 0101 and 0011. Click the line where it first goes wrong."
      answer: 2
      fault: logic
      misconception: binary-digit-two
      explain: "Line 2: binary has no digit 2. 1 + 1 = 10: write 0, carry 1. The answer is 1000 (8)."
  - check:
      type: question
      q: "A half adder adds two bits. Why does a full adder need three inputs?"
      options: ["It also adds the carry coming in from the place to its right", "It adds three numbers at once", "The third input switches it on", "It needs a spare in case one breaks"]
      answer: 0
      feedback: [null, "Two numbers; the third bit is the carry.", "Gates don't need switching on.", "Every input does a job."]
      explain: "Every place except the first may get a carry from the right: A + B + carry in."
```

### Place by place

```worked
\text{ones: } 1 + 1 = 10 :: Sum 0, carry 1 to the twos.
\text{twos: } 0 + 1 + 1 = 10 :: Sum 0, carry 1 to the fours.
\text{fours: } 1 + 1 + 1 = 11 :: Sum 1, carry 1 to the eights.
\text{eights: } 0 + 0 + 1 = 1 :: Sum 1, no carry.
0101 + 0111 = 1100 :: 5 + 7 = 12. Each line is one full adder: XOR gates for the sum, AND and OR for the carry.
```

Now add 6 + 3.

### Find the mistake

### Why three inputs?

## Vary: carries

```step
stage: modify
insight: "Each task changes one thing about the carries: none, exactly one, one that falls off the end (overflow), then a carry in every place."
try: { playground: board, starter: "adding.yml#modify", height: 520 }
tasks:
  - check: { type: board, text: "Set A = 9 and B = 6. Does any place carry?", when: "a = 9 and b = 6", explain: "1001 + 0110 = 1111: each place has only one 1, so nothing carries. 15." }
  - check: { type: board, text: "Find two numbers whose sum has exactly one carry, and still fits in four bits.", when: "z = 1 and c = 0", explain: "For example 1 + 1: the ones place carries into the twos, and that is all." }
  - check: { type: board, text: "Now make the last carry fall off the end: a sum that needs a fifth bit.", when: "c = 1", explain: "Overflow: four bits hold up to 15, so the sum needs another bit. In an 8-bit register, 255 + 1 gives 0 with a carry." }
  - check: { type: board, text: "Make every place carry.", when: "z = 4", explain: "For example 15 + 1: the carry ripples through every place, like 9999 + 1 in base ten. Rippling takes time, so real processors use tricks to look ahead." }
```

### No carry

### One carry

### Overflow

### Every place

## Practise: adders

```step
stage: practise
insight: "Adding and counting adders without the board is the same move in mixed forms, plus a review of overflow."
tasks:
  - check:
      type: answer
      q: "Add 0011 + 0011 in binary (four bits)."
      answer: "0110"
      feedback:
        - ["0022", "No 2s in binary: 1 + 1 = 10."]
        - ["6", "Write it in binary."]
      explain: "3 + 3 = 6 = 0110."
  - check:
      type: question
      q: "How many full adders does a processor need to add two 8-bit numbers in one go?"
      options: ["8: one for each place", "2: one for each number", "16: one for each bit of both numbers", "1, used 8 times"]
      answer: 0
      feedback: [null, "The adders work on places, not numbers.", "Each adder takes one bit from each number.", "That would be much slower."]
      explain: "One full adder per place, side by side. (The first can be a half adder: nothing carries into it.)"
  - check:
      type: question
      q: "Review: an 8-bit register holds 255. You add 1. What does it hold?"
      options: ["0, and a carry falls off the end", "256", "255", "1"]
      answer: 0
      feedback: [null, "256 needs nine bits.", "Adding does change it.", "Every place carries."]
      explain: "11111111 + 1 = 100000000: the ninth bit has nowhere to go, so the register holds 0. That is overflow."
```

### Add

### How many adders?

### Review: overflow

## Make: build a full adder

```step
stage: make
insight: "Building a full adder from its truth table reverses the process: from the sum and carry wanted to the gates that make them."
try: { playground: board, starter: "adding.yml#make", height: 640 }
hint: ["The sum is 1 when an odd number of the three inputs are on.", "Sum: XOR A with B, then XOR that with CIN.", "Carry: (A AND B) OR ((A XOR B) AND CIN). Reuse the first XOR."]
check: { type: board, text: "Build a full adder: inputs A, B and the carry in (CIN); outputs SUM and CARRY. Every row should match.", when: "k = 1", explain: "Five gates: two XORs for the sum, two ANDs and an OR for the carry. Line up four of these and you have the 4-bit adder from the board." }
```

Then: count the gates in an 8-bit adder built from your full adders.
