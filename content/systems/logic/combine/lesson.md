---
order: 1
node: AC9TDI8K04 n3
unit: build
assumes: [logic-gates]
title: Combining gates
summary: "Wire one gate's output into another gate's input and you get a circuit. Work a circuit out row by row, each gate using only what arrives on its wires, then build circuits to match truth tables, even from NAND gates alone."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "AND, OR and NOT are tiny. How do you get from three tiny gates to a whole processor?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8482
  url: http://127.0.0.1:8482/index.html
  readySelector: ".gtcard"
  layout: full
explainPicture: { ref: combine.yml#explain-pic, caption: "Four gates make XOR: OR, AND, NOT, then AND. The output is 1 when exactly one switch is on." }
explainClip:
  query: { code: "@combine.yml#explain", fresh: 1, id: explain }
  caption: "Following a circuit"
  say: "Four gates, wired together."
  clip:
    - click: "Switch A, off, 0"
    - caption: { text: "A on: OR gives 1, AND gives 0, NOT flips it to 1, so the last AND gives 1.", say: "With A on, the lamp lights." }
    - wait: 1500
    - click: "Switch B, off, 0"
    - expect: { selector: "#gsum", contains: "Q 0" }
    - caption: { text: "Both on: AND gives 1, NOT makes it 0, so Q is 0. Exactly one on: that's XOR.", say: "Both on, and the lamp goes out. One switch or the other, not both." }
    - wait: 1500
---
In *Why binary: logic gates* each gate stood alone. Now wire them together: one gate's output becomes another gate's input. A few simple gates combined can make any truth table you like.

## Predict: OR, then NOT

```step
stage: predict
insight: "Committing to the output of a two-gate circuit tests the new move: the second gate uses what the first gate gives it."
check:
  type: predict
  q: "A and B go into an OR gate. The OR gate's output goes into a NOT gate, which lights the lamp. Both switches are off. Is the lamp on?"
  options: ["On (1): OR gives 0, and NOT flips it to 1", "Off (0): both switches are off", "Off (0): NOT only works on switches", "It depends on the order of the switches"]
  actual: "On. OR of 0 and 0 is 0; the NOT gate gets that 0 and flips it to 1."
```

## Try: follow the wires

```step
stage: run
insight: "Trying all four rows on the wired circuit settles the prediction and shows the new move: each gate works on what reaches it."
try: { playground: board, starter: "combine.yml#run", height: 520 }
check: { type: board, text: "Flip the switches to try all four rows. When is the lamp on?", when: "t = 4", explain: "Only when both are off: OR then NOT is the opposite of OR. It has its own name, NOR." }
```

Was your prediction right?

## Worked example: row by row

```step
stage: investigate
insight: "Working a four-gate circuit one gate at a time models the new move. Sam feeds a switch into a gate that is wired to another gate, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "In the four-gate circuit (OR, AND, NOT, AND), A = 0 and B = 1. What does gate 3, the NOT gate, output?"
      answer: "1"
      feedback:
        - ["0", "Gate 3 is wired from gate 2 (AND), not from a switch. What does 0 AND 1 give?"]
      explain: "Gate 2: 0 AND 1 = 0. Gate 3 flips that: 1."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam works out the four-gate circuit. Click the line where it first goes wrong."
      answer: 4
      fault: logic
      misconception: gate-reads-switches
      explain: "Line 4: gate 3 is wired from gate 2, which gave 0, so NOT 0 = 1. Then gate 4 is 1 AND 1 = 1, and Q = 1."
  - check:
      type: question
      q: "The four-gate circuit gives 1 when exactly one switch is on. Which gate does that on its own?"
      options: ["XOR", "AND", "OR", "NOR"]
      answer: 0
      feedback: [null, "AND needs both on.", "OR is also 1 when both are on.", "NOR is 1 only when both are off."]
      explain: "XOR (exclusive or): one or the other, not both. Here it is built from OR, AND and NOT."
```

### Gate by gate (A = 1, B = 1)

```worked
\text{gate 1: } 1 \text{ OR } 1 = 1 :: Gate 1 is wired from both switches.
\text{gate 2: } 1 \text{ AND } 1 = 1 :: Gate 2 is wired from both switches too.
\text{gate 3: NOT } 1 = 0 :: Gate 3 is wired from gate 2, so it flips gate 2's output, not a switch.
\text{gate 4: } 1 \text{ AND } 0 = 0 :: Gate 4 is wired from gates 1 and 3.
Q = 0 :: Both on gives 0. Do every row this way to fill the truth table.
```

Now do the row A = 0, B = 1 for gate 3.

### Find the mistake

### Name it

## Vary: build to a table

```step
stage: modify
insight: "Each task changes one thing about the target: NAND from AND and NOT, A AND NOT B, then NOT and OR from NAND gates alone (a gate input may take the same wire twice)."
try: { playground: board, starter: "combine.yml#nand", height: 560 }
tasks:
  - starter: "combine.yml#nand"
    check: { type: board, text: "Add gates and wire them so every row matches the wanted column (NAND: not both). Click a ● to wire from, then a pin to wire to.", when: "k = 1", explain: "AND, then NOT: the opposite of AND." }
  - starter: "combine.yml#andnot"
    check: { type: board, text: "Now the lamp should light only when A is on and B is off.", when: "k = 1", explain: "NOT B, then AND it with A." }
  - starter: "combine.yml#nandnot"
    check: { type: board, text: "Only NAND gates this time, and one switch. Make a NOT. (Hint: both inputs can come from A.)", when: "k = 1 and n = 1", explain: "A NAND A is NOT A: if both inputs are the same, \"not both\" is just \"not\"." }
  - starter: "combine.yml#nandor"
    check: { type: board, text: "Only NAND gates. Make OR.", when: "k = 1 and n = 1", explain: "NOT A and NOT B (each a NAND with itself), then NAND them together: three NANDs make OR. NAND can build every gate, which is why chips are made of them." }
```

### NAND

### A and not B

### NOT from NAND

### OR from NAND

## Practise: read the circuit

```step
stage: practise
insight: "Reading circuits without the board is the same move in mixed forms, plus a review of how many rows a truth table has."
tasks:
  - check:
      type: question
      q: "A goes into a NOT gate. Its output and B go into an AND gate. A = 0, B = 1. What is the output?"
      options: ["1", "0"]
      answer: 0
      feedback: [null, "NOT 0 is 1, and 1 AND 1 is 1."]
      explain: "NOT 0 = 1; 1 AND 1 = 1."
  - check:
      type: question
      q: "A and B go into a NAND gate; its output goes into a NOT gate. Which single gate is that the same as?"
      options: ["AND", "NAND", "OR", "NOT"]
      answer: 0
      feedback: [null, "The NOT flips NAND's output.", "Try A = 1, B = 1.", "It has two inputs."]
      explain: "NOT (NOT (A AND B)) = A AND B: two flips cancel."
  - check:
      type: question
      q: "Review: a circuit has 3 switches. How many rows does its truth table have?"
      options: ["8", "3", "6", "9"]
      answer: 0
      feedback: [null, "Each switch doubles the rows.", "3 × 2 isn't how patterns grow.", "That's 3 × 3."]
      explain: "2 × 2 × 2 = 8 patterns of three bits."
```

### NOT then AND

### NAND then NOT

### Review: rows

## Make: build XOR

```step
stage: make
insight: "Building XOR from its truth table reverses the process: start from the wanted outputs and choose and wire the gates."
try: { playground: board, starter: "combine.yml#make", height: 560 }
hint: ["XOR is 1 for \"A or B\", but not when both are on.", "One gate for \"A or B\", one for \"both\", then flip \"both\".", "OR, AND, NOT, then AND the OR with the NOT."]
check: { type: board, text: "Build XOR (exactly one switch on) from AND, OR and NOT gates.", when: "k = 1", explain: "You built a circuit from a truth table. Adders are next: XOR turns out to be half of adding." }
```

Then: could you build XOR from NAND gates only? (It takes four.)
