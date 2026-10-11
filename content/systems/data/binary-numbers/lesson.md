---
order: 5
node: AC9TDI8K04 n1
unit: binary
title: Bits and binary numbers
summary: "A computer stores numbers with switches that are only off (0) or on (1). Put bits side by side, make each place worth double the one on its right (1, 2, 4, 8, 16), and add the places that hold a 1: 10110 = 16 + 4 + 2 = 22."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A computer has no digits from 2 to 9, only switches that are off or on. So how does it store the number 22?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8462
  url: http://127.0.0.1:8462/index.html
  readySelector: ".bcard"
  layout: full
explainPicture: { ref: cards.yml#explain-pic, caption: "10110 in binary: the 16, 4 and 2 cards are face up, so the number is 16 + 4 + 2 = 22." }
explainClip:
  query: { code: "@cards.yml#explain", fresh: 1, id: explain }
  caption: "Binary cards"
  say: "Each card is worth double the card on its right."
  clip:
    - caption: { text: "Turn up the 16 card: 10000 is 16.", say: "Turn up the sixteen card." }
    - click: "Card 16, face down (0)"
    - wait: 700
    - caption: { text: "Add the 4 and the 2: 10110.", say: "Now the four and the two." }
    - click: "Card 4, face down (0)"
    - click: "Card 2, face down (0)"
    - expect: { selector: "#gsum", contains: "16 + 4 + 2 = 22" }
    - wait: 700
    - caption: { text: "Add the cards that are up: 16 + 4 + 2 = 22.", say: "Add the cards that are up. Twenty two." }
    - wait: 1400
---
Text, pictures and sound are all stored as numbers. But inside, a computer has no digits from 2 to 9. A **bit** is one switch that is either off or on. We write off as **0** and on as **1**. One bit can only count to 1, so a computer puts bits side by side.

The cards below are bits. Each card is worth **double** the card on its right, and a card face up is a 1. The number is the total of the cards that are face up. This way of writing numbers is called **binary**.

## Predict: read the cards

```step
stage: predict
insight: "Committing to a value for 1011 shows whether students read the places as doubling (8, 4, 2, 1) or read the digits as a base-10 number."
check:
  type: predict
  q: "Four cards are worth 8, 4, 2 and 1. The 8, 2 and 1 cards are face up, so the bits read **1011**. What number is that?"
  options: ["11", "1011", "3", "13"]
  actual: "11. The cards face up are 8, 2 and 1, and 8 + 2 + 1 = 11. 1011 is how it is written in binary, not one thousand and eleven."
```

## Try: turn up the cards

```step
stage: run
insight: "Turning up the 8, 2 and 1 cards and watching the total settles the prediction: binary 1011 is 11, the sum of the places holding a 1."
try: { playground: board, starter: "cards.yml#run", height: 420 }
check: { type: board, text: "Click the 8, 2 and 1 cards to turn them face up, so the bits read 1011. What number does the board show?", when: "n = 11 and c = 3", explain: "1011 = 8 + 2 + 1 = 11. The 4 card is face down, so it adds nothing." }
```

Was your prediction right? Each 1 adds its card's value; each 0 adds nothing.

## Worked example: read and write binary

```step
stage: investigate
insight: "Reading 10110 one place at a time (places doubling from 1 on the right) models the new move; Sam counts the places from the left, the misconception planted after the method; and the why question ties bits to on and off states in hardware."
tasks:
  - check:
      type: answer
      q: "Five cards are worth 16, 8, 4, 2 and 1. What number is **10011** in binary?"
      answer: "19"
      feedback:
        - ["10011", "That reads it as a base-10 number. Add the places that hold a 1: 16, 2 and 1."]
        - ["25", "Check the places from the right: 1, 2, 4, 8, 16. The 1s are in the 16, 2 and 1 places."]
        - ["3", "Count the places from the right, so the leftmost 1 is the 16 place."]
      explain: "10011 = 16 + 2 + 1 = 19."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam reads 1100 in binary. Click the line where the working first goes wrong."
      answer: 2
      fault: logic
      misconception: binary-place-reversed
      explain: "Line 2: the places go 1, 2, 4, 8 from the right, so the first two digits of 1100 are the 8 and 4 places. 1100 = 8 + 4 = 12."
  - check:
      type: question
      q: "Why do computers store numbers in binary, not with the digits 0 to 9?"
      options: ["Each bit only needs two states (off and on, low or high voltage), which are easy to tell apart reliably", "Binary numbers are shorter", "Binary is easier for people to read", "Computers cannot add numbers bigger than 1"]
      answer: 0
      feedback: [null, "Binary numbers are longer: 22 needs five bits (10110).", "People find binary harder to read: that is why we turn it back into ordinary numbers.", "Computers add big numbers, but they store them as many bits side by side."]
      explain: "A switch or a voltage only has to be off or on, low or high. Telling two states apart is fast and reliable even when the signal is a little weak or noisy; telling ten levels apart would not be."
```

### Read the places

Here is 10110 read one place at a time. The places start at 1 on the right and double each time.

```worked
1\,0\,1\,1\,0 :: Five bits, so five places.
16 \quad 8 \quad 4 \quad 2 \quad 1 :: Start at 1 on the right and double: 2, 4, 8, 16.
16 + 4 + 2 :: Keep the places that hold a 1. The 0s add nothing.
16 + 4 + 2 = 22 :: Add them: 10110 in binary is 22.
```

Now read 10011 the same way.

### Find the mistake

Which end is the 1 place?

### Why only 0 and 1?

## Vary: one change at a time

```step
stage: modify
insight: "Each task changes one thing: a new number, one more (only the 1 card flips), then one more again (every card flips back and the 8 goes up, like a carry), then a fifth card. The last two show why the next place is worth double."
try: { playground: board, starter: "cards.yml#modify", height: 420 }
tasks:
  - check: { type: board, text: "Make 6. Which cards do you need?", when: "n = 6", explain: "6 = 4 + 2, so 00110." }
  - check: { type: board, text: "Now make 7, one more. How many cards did you have to change?", when: "n = 7", explain: "7 = 4 + 2 + 1, so 00111. Only the 1 card changed." }
  - check: { type: board, text: "Now make 8, one more again. Which cards changed this time?", when: "n = 8", explain: "8 is 01000: the 4, 2 and 1 cards all went down and the 8 went up, because 4 + 2 + 1 = 7 and the next number needs the next card. It is like 999 + 1 = 1000." }
  - check: { type: board, text: "Make 19 using the 16 card.", when: "n = 19", explain: "19 = 16 + 2 + 1, so 10011." }
  - check:
      type: answer
      q: "Write 13 in binary with four bits (places 8, 4, 2, 1)."
      answer: "1101"
      feedback:
        - ["13", "That is the number. Write which cards are up, as 1s and 0s: 8 + 4 + 1."]
        - ["1011", "1011 is 8 + 2 + 1 = 11. 13 is 8 + 4 + 1."]
      explain: "13 = 8 + 4 + 1, so the 8, 4 and 1 cards are up and the 2 card is down: 1101."
```

### Make 6

### One more

### One more again

### Use the 16

### Number to binary

Start with the biggest card that fits, then fill in the rest.

## Practise: read and write binary

```step
stage: practise
insight: "Reading and writing binary both ways, including a number with many 0s and an edge case (all 1s), plus a review of powers of 2 from maths."
tasks:
  - check:
      type: answer
      q: "What number is **1001** in binary?"
      answer: "9"
      feedback:
        - ["1001", "That reads it as a base-10 number. The places are 8, 4, 2, 1: add the ones that hold a 1."]
        - ["2", "Do not count the 1s. Add their places: 8 and 1."]
      explain: "1001 = 8 + 1 = 9."
  - check:
      type: answer
      q: "What number is **11000** in binary?"
      answer: "24"
      feedback:
        - ["3", "Count the places from the right: the 1s are in the 16 and 8 places."]
        - ["11000", "Add the places that hold a 1: 16 and 8."]
      explain: "11000 = 16 + 8 = 24. The three 0s on the right add nothing."
  - check:
      type: answer
      q: "Write 20 in binary with five bits."
      answer: "10100"
      feedback:
        - ["20", "Write which cards are up, as 1s and 0s: 16 + 4."]
        - ["00101", "Those are the right cards written the wrong way round. The 16 place is on the left."]
      explain: "20 = 16 + 4, so 10100."
  - check:
      type: answer
      q: "What number is **11111** in binary?"
      answer: "31"
      feedback:
        - ["5", "Do not count the 1s. Add their places: 16 + 8 + 4 + 2 + 1."]
        - ["32", "16 + 8 + 4 + 2 + 1 = 31. 32 would need a sixth card."]
      explain: "16 + 8 + 4 + 2 + 1 = 31, the biggest number five cards can show."
  - check:
      type: answer
      q: "Review: what is $2^4$?"
      answer: "16"
      feedback:
        - ["8", "That is 2 × 4. $2^4$ is four 2s multiplied: 2 × 2 × 2 × 2."]
      explain: "2 × 2 × 2 × 2 = 16. The binary places are powers of 2: 1, 2, 4, 8, 16 are $2^0$ to $2^4$."
```

### Four bits

### Zeros on the right

### Number to binary

### All ones

### Review: powers of 2

## Make: three cards up

```step
stage: make
insight: "Building the biggest number with exactly three cards up reverses the process: students choose cards to reach a target, and see that the left cards count most."
try: { playground: board, starter: "cards.yml#make", height: 420 }
hint: ["The cards on the left are worth the most.", "Use the three biggest cards."]
check: { type: board, text: "The number is hidden. Turn up exactly three cards to make the biggest number you can, then work it out.", when: "n = 28 and c = 3", explain: "16 + 8 + 4 = 28, so 11100. The left cards are worth the most." }
```

Stretch: what is the **smallest** number with exactly three cards up? Write it in binary.
