---
order: 7
unit: binary
node: AC9TDI8K04 n3
title: "Why binary: logic gates"
summary: "A switch has two states that are easy to tell apart: off (0) and on (1). Wire two switches in a line and the lamp lights only when both are on: an AND gate. Side by side, either one will do: an OR gate. Gates like these, made of tiny electronic switches, combine bits to do every calculation, which is why computers are built on binary."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A computer chip holds billions of tiny switches and nothing else. How can switches add up numbers?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8467
  url: http://127.0.0.1:8467/index.html
  readySelector: ".lgswitch"
  layout: full
explainPicture: { ref: gates.yml#explain-pic, caption: "Two switches side by side (OR): the lamp lights when A or B is on, or both." }
explainClip:
  query: { code: "@gates.yml#explain", fresh: 1, id: explain }
  caption: "Two switches in a line: AND"
  say: "Two switches sit in a line with a lamp."
  clip:
    - caption: { text: "Turn on A only: the circuit is still broken at B.", say: "Turn on A. The lamp stays off." }
    - click: "Switch A, off, 0"
    - wait: 1000
    - caption: { text: "Turn on B too: now the lamp lights. Both on: 1 AND 1 = 1.", say: "Turn on B as well. Now it lights." }
    - click: "Switch B, off, 0"
    - expect: { selector: "#gsum", contains: "1 AND 1 = 1" }
    - wait: 1500
---
In the binary lessons, each bit was a card face up or face down. Inside a computer, a bit is a tiny electronic **switch**: off (0) or on (1). Two states are easy to tell apart, even when the signal is a little weak or noisy. Switches can also be wired together so that some bits **control** other bits. That is how a computer calculates.

## Predict: two switches in a line

```step
stage: predict
insight: "Committing to whether the lamp lights with one of two switches in a line tests the new move: in series, the output is 1 only when both inputs are 1 (AND)."
check:
  type: predict
  q: "A battery, two switches and a lamp are wired in one loop, one switch after the other. Switch A is **on** and switch B is **off**. Does the lamp light?"
  options: ["No: the circuit is broken at B", "Yes: one switch is enough", "Dimly: half the switches are on", "Only if B was switched on first"]
  actual: "No. With the switches in a line, the current has to pass through both, so B being off breaks the loop. The lamp lights only when A AND B are on."
```

## Try: every combination

```step
stage: run
insight: "Trying all four combinations on the circuit settles the prediction and fills the truth table: only 1 and 1 lights the lamp."
try: { playground: board, starter: "gates.yml#run", height: 480 }
check: { type: board, text: "Click the switches to try all four combinations of A and B. When does the lamp light?", when: "t = 4", explain: "Only when both switches are on: 1 AND 1 = 1. Every other row gives 0. That is an AND gate." }
```

Was your prediction right? Look at the truth table: one row in four lights the lamp.

## Worked example: AND and OR

```step
stage: investigate
insight: "Building the AND and OR truth tables row by row, then the chain from two states to computing, models the new move. Sam reads OR as one or the other but not both, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "Two switches side by side (an **OR** gate). A = 1 and B = 0. What is the output?"
      options: ["1", "0", "It depends which switch was first", "½"]
      answer: 0
      feedback: [null, "With the switches side by side, the current can go through A alone.", "Order doesn't matter: only which switches are on.", "Bits are only ever 0 or 1."]
      explain: "OR gives 1 when A or B is 1 (or both). A is 1, so the output is 1."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam fills in the OR gate's truth table. Click the line where it first goes wrong."
      answer: 5
      fault: logic
      misconception: or-means-not-both
      explain: "Line 5: OR gives 1 when at least one input is 1, so 1 OR 1 = 1. \"One or the other but not both\" is a different gate, XOR."
  - check:
      type: question
      q: "Why are computers built on binary, not on ten levels for the digits 0 to 9?"
      options: ["Switches have two states that are easy to tell apart, and gates can combine them to do any calculation", "Binary numbers are shorter", "People invented binary because it is easy to read", "Computers can only count to 1"]
      answer: 0
      feedback: [null, "Binary numbers are longer than decimal ones.", "People find binary harder to read.", "They count to huge numbers, with many bits."]
      explain: "Two states are reliable even with a noisy signal, and switches wired as gates (AND, OR, NOT) can be combined to add, compare and store anything."
```

### Truth tables

```worked
\text{AND}: 0\,0 \to 0,\quad 0\,1 \to 0,\quad 1\,0 \to 0,\quad 1\,1 \to 1 :: Switches in a line: the output is 1 only when both inputs are 1.
\text{OR}: 0\,0 \to 0,\quad 0\,1 \to 1,\quad 1\,0 \to 1,\quad 1\,1 \to 1 :: Switches side by side: the output is 1 when at least one input is 1.
\text{NOT}: 0 \to 1,\quad 1 \to 0 :: One input, flipped.
\text{switch: 2 states} \to \text{bits} :: Each switch is a bit: off 0, on 1.
\text{gates} \to \text{adding, comparing, storing} :: Wired together, gates do every calculation. So binary is the natural choice.
```

Now read an OR gate.

### Find the mistake

### Why binary?

## Vary: change the gate

```step
stage: modify
insight: "Each task changes one thing: the gate (AND to OR), the inputs (one on, both on), then NOT's single input, then the only row that lights AND."
try: { playground: board, starter: "gates.yml#modify", height: 480 }
tasks:
  - check: { type: board, text: "Switch the gate to OR. Turn on only A. What is the output?", when: "g = 2 and a = 1 and b = 0 and o = 1", explain: "OR needs only one input on: 1 OR 0 = 1." }
  - check: { type: board, text: "Keep OR and turn B on too.", when: "g = 2 and a = 1 and b = 1", explain: "1 OR 1 = 1: both on still counts as at least one." }
  - check: { type: board, text: "Switch to NOT. Turn A off. What comes out?", when: "g = 3 and a = 0 and o = 1", explain: "NOT flips its one input: NOT 0 = 1." }
  - check: { type: board, text: "Switch back to AND and make the output 1.", when: "g = 1 and o = 1", explain: "Only one row gives 1: A = 1 and B = 1." }
  - check:
      type: question
      q: "An AND gate has A = 0. Does it matter what B is?"
      options: ["No: the output is 0 whatever B is", "Yes: B decides the output", "Only if B is 1", "The output is B"]
      answer: 0
      feedback: [null, "Check the truth table rows where A is 0.", "0 AND 1 is still 0.", "That would be true when A is 1."]
      explain: "AND needs both. With A = 0, the output is 0 for either B."
```

### OR with one on

### OR with both on

### NOT

### AND's one row

### Does B matter?

## Practise: gates

```step
stage: practise
insight: "Outputs of AND, OR and NOT for given inputs, choosing a gate for a real rule, and a review of binary from lesson 5."
tasks:
  - check:
      type: question
      q: "What is **1 AND 0**?"
      options: ["0", "1", "10", "2"]
      answer: 0
      feedback: [null, "AND needs both inputs to be 1.", "Gates give one bit.", "Gates don't add; they give 0 or 1."]
      explain: "AND gives 1 only when both are 1."
  - check:
      type: question
      q: "What is **NOT 1**?"
      options: ["0", "1", "−1", "It needs two inputs"]
      answer: 0
      feedback: [null, "NOT flips its input.", "Bits are 0 or 1.", "NOT has one input."]
      explain: "NOT flips 1 to 0."
  - check:
      type: question
      q: "A car alarm should sound if the door is opened **or** the window is broken. Which gate?"
      options: ["OR", "AND", "NOT", "None: alarms don't use gates"]
      answer: 0
      feedback: [null, "AND would sound only if both happened at once.", "NOT has one input and flips it.", "Alarms are built from exactly these gates."]
      explain: "Either input should set it off, so OR."
  - check:
      type: question
      q: "A machine should run only when the guard is closed **and** the start button is pressed. Which gate?"
      options: ["AND", "OR", "NOT", "XOR"]
      answer: 0
      feedback: [null, "OR would let it run with the guard open.", "NOT has one input.", "XOR would stop it when both are true."]
      explain: "Both must be true: AND."
  - check:
      type: answer
      q: "Review: what number is **110** in binary?"
      answer: "6"
      feedback:
        - ["110", "Read it in binary: the places are 4, 2, 1."]
        - ["3", "Don't count the 1s; add their places: 4 + 2."]
      explain: "110 = 4 + 2 = 6."
```

### AND

### NOT

### Alarm

### Machine guard

### Review: binary

## Make: add two bits

```step
stage: make
insight: "Making a half adder show 1 + 1 = 10 reverses the process: students choose the inputs for a wanted output, and see gates doing binary addition."
try: { playground: board, starter: "gates.yml#make", height: 480 }
hint: ["The adder shows A + B as a two-bit binary number: carry, then sum.", "10 in binary is 2. Which inputs add to 2?", "Turn both switches on."]
check: { type: board, text: "This circuit adds two bits: the sum is A XOR B and the carry is A AND B. Set the switches so the answer is 10 in binary (2).", when: "c = 1 and o = 0", explain: "1 + 1 = 10 in binary: the sum bit is 0 and the carry is 1, just like 5 + 5 = 10 carries a 1 in base 10. Chains of these gates add numbers of any size." }
```

Stretch: which inputs give the answer 01? Why are there two ways?
