---
order: 6
node: AC9TDI8K04 n2
unit: binary
title: How many patterns?
summary: "Each extra bit doubles the number of patterns: n bits make 2ⁿ patterns. One pattern is 0, so the largest number is 2ⁿ − 1: four bits hold 0 to 15, eight bits (a byte) hold 0 to 255. Count one past the largest and the bits overflow back to 0."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Colour values in a program stop at 255, and old game scores wrapped round to 0. Both come from the same rule about bits."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8463
  url: http://127.0.0.1:8463/index.html
  readySelector: ".bcard"
  layout: full
explainPicture: { ref: cards.yml#explain-pic, caption: "Four cards all face up: 1111 = 8 + 4 + 2 + 1 = 15, the largest number four bits can hold. With 0, that is 16 patterns." }
explainClip:
  query: { code: "@cards.yml#explain", fresh: 1, id: explain }
  caption: "Counting in binary"
  say: "Count up on three cards."
  clip:
    - caption: { text: "Count up with + 1: 000, 001, 010, 011…", say: "Count up, one at a time." }
    - click: Count up one
    - click: Count up one
    - click: Count up one
    - click: Count up one
    - click: Count up one
    - click: Count up one
    - click: Count up one
    - expect: { selector: "#gsum", contains: "111" }
    - caption: { text: "111 is 7, the largest three cards can show.", say: "One one one is seven: every card is up." }
    - wait: 900
    - click: Count up one
    - caption: { text: "One more overflows: every card goes down, back to 000.", say: "One more, and it overflows back to zero." }
    - wait: 1400
---
In Bits and binary numbers, each card was worth double the card on its right. Now the question is how many different numbers a set of cards can show, and what happens when you run out.

## Predict: the biggest number

```step
stage: predict
insight: "Committing to the largest 4-bit number shows whether students forget that one pattern is 0 (16), confuse it with the number of cards (4), or read 1111 as a base-10 number."
check:
  type: predict
  q: "You have four cards, worth 8, 4, 2 and 1. What is the **biggest** number they can show?"
  options: ["15", "16", "4", "1111"]
  actual: "15. All four cards face up: 8 + 4 + 2 + 1 = 15. There are 16 patterns, but one of them is 0, so the biggest is 15. 1111 is 15 written in binary."
```

## Try: count up

```step
stage: run
insight: "Counting up with + 1 until every card is face up settles the prediction: the count stops at 1111, which is 15."
try: { playground: board, starter: "cards.yml#run", height: 440 }
check: { type: board, text: "Press + 1 to count up until every card is face up. What number is it?", when: "n = 15 and c = 4", explain: "1111 = 8 + 4 + 2 + 1 = 15. Counting from 0, that took 15 presses, so with 0 there are 16 patterns." }
```

Was your prediction right? Watch the 1 card as you count: it flips every time.

## Worked example: count the patterns

```step
stage: investigate
insight: "Counting the patterns as 2 × 2 × 2 × 2 models the new move: n bits give 2ⁿ patterns and the largest is 2ⁿ − 1. Sam counts 16 patterns and then forgets 0, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "What is the biggest number **five** bits can show?"
      answer: "31"
      feedback:
        - ["32", "Five bits make 32 patterns, but one of them is 0. So the numbers go from 0 to 31."]
        - ["5", "5 is how many bits. Add all the places: 16 + 8 + 4 + 2 + 1."]
        - ["11111", "That is the pattern. What number is it?"]
      explain: "11111 = 16 + 8 + 4 + 2 + 1 = 31. Five bits make 2⁵ = 32 patterns: 0 to 31."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam works out how many numbers 4 bits can show. Click the line where the working first goes wrong."
      answer: 4
      fault: logic
      misconception: binary-max-forgets-zero
      explain: "Line 4: the 16 patterns are 0000 to 1111, so the numbers are 0 to 15. Sam left out 0 (all cards face down)."
  - check:
      type: answer
      q: "How many different patterns can **three** bits make?"
      answer: "8"
      feedback:
        - ["7", "7 is the biggest number (111). Count 0 as a pattern too: 0 to 7 is 8 patterns."]
        - ["6", "Each bit has 2 choices, so multiply: 2 × 2 × 2."]
        - ["3", "3 is how many bits. Each one doubles the patterns."]
      explain: "2 × 2 × 2 = 8 patterns: 000, 001, 010, 011, 100, 101, 110, 111. That is 0 to 7."
```

### Count the patterns

```worked
1111 = 8 + 4 + 2 + 1 = 15 :: All cards face up is the biggest number.
0000 = 0 :: All cards face down is the smallest.
2 \times 2 \times 2 \times 2 = 2^4 = 16 :: Each card has 2 choices, so each card doubles the patterns.
0 \text{ to } 15 :: 16 patterns, and one of them is 0, so the biggest is 15.
2^4 - 1 = 15 :: With $n$ bits: $2^n$ patterns, and the biggest number is $2^n - 1$.
```

Now try five bits.

### Find the mistake

### Three bits

## Vary: one change at a time

```step
stage: modify
insight: "Each task changes one thing: one more past the largest (overflow), one more card (patterns double), another card, then a byte, then the edge case of choosing how many bits a number needs."
try: { playground: board, starter: "cards.yml#modify", height: 460 }
tasks:
  - check: { type: board, text: "The board shows 1111, which is 15. Press + 1 once. What happens to the cards?", when: "o = 1", explain: "Every card went face down and the count went back to 0. Four bits cannot show 16, so the count overflows." }
  - check: { type: board, text: "Press Add a card. What is the new card worth? Make the biggest number five cards can show.", when: "b = 5 and n = 31", explain: "The new card is worth 16, double the 8. All five up: 16 + 8 + 4 + 2 + 1 = 31." }
  - check: { type: board, text: "Add one more card and make the biggest number six cards can show.", when: "b = 6 and n = 63", explain: "The new card is worth 32. 32 + 31 = 63, which is 2⁶ − 1." }
  - check:
      type: answer
      q: "Eight bits are called a **byte**. What is the biggest number a byte can hold?"
      answer: "255"
      feedback:
        - ["256", "A byte makes 2⁸ = 256 patterns, but one of them is 0."]
        - ["128", "128 is the leftmost card. Add all eight: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1."]
        - ["8", "8 is how many bits. Each one doubles the patterns."]
      explain: "2⁸ = 256 patterns, so a byte holds 0 to 255."
  - check:
      type: answer
      q: "What is the **fewest** bits that can hold the number 100?"
      answer: "7"
      feedback:
        - ["6", "Six bits stop at 63. One more bit doubles that: seven bits reach 127."]
        - ["8", "Eight bits work, but fewer will do: seven bits reach 127."]
        - ["100", "Count bits, not numbers: each bit doubles the biggest number."]
      explain: "Six bits hold 0 to 63, seven bits hold 0 to 127. 100 needs seven bits."
```

### One past the biggest

### Add a card

### Six cards

### A byte

### How many bits?

Keep doubling: 1, 3, 7, 15, 31, 63, 127. Which is the first that reaches 100?

## Practise: patterns and limits

```step
stage: practise
insight: "Patterns and largest numbers for other bit counts, overflow in a real context, why colour values stop at 255, and a review of reading binary from lesson 1."
tasks:
  - check:
      type: answer
      q: "How many different patterns can **ten** bits make?"
      answer: "1024"
      feedback:
        - ["1023", "1023 is the biggest number. Count 0 too: the patterns are 0 to 1023."]
        - ["20", "Multiply, don't add: each bit doubles the patterns. $2^{10}$."]
        - ["100", "That is 10 × 10. Each bit has 2 choices: $2^{10}$."]
      explain: "$2^{10} = 1024$ patterns, so ten bits hold 0 to 1023."
  - check:
      type: question
      q: "An old game stores the score in one byte. The score is 255 and the player scores 1 more point. What does the score show?"
      options: ["0", "256", "255", "An error message"]
      answer: 0
      feedback: [null, "256 needs a ninth bit. The byte has only eight.", "The score did change: every bit flipped.", "The computer just adds 1; the bits run out and flip back."]
      explain: "255 is 11111111. Adding 1 overflows: every bit flips to 0 and the score shows 0. Real games have had bugs like this."
  - check:
      type: answer
      q: "In many programs, the amount of red in a colour goes from 0 to 255. How many bits store it?"
      answer: "8"
      feedback:
        - ["255", "255 is the biggest value. How many bits make 0 to 255?"]
        - ["256", "There are 256 values. Which power of 2 is 256?"]
      explain: "0 to 255 is 256 values, and $2^8 = 256$. So each colour amount is one byte."
  - check:
      type: answer
      q: "What is the biggest number **three** bits can show?"
      answer: "7"
      feedback:
        - ["8", "Three bits make 8 patterns, but one of them is 0."]
        - ["111", "That is the pattern. What number is it?"]
      explain: "111 = 4 + 2 + 1 = 7."
  - check:
      type: answer
      q: "Review: what number is **10101** in binary?"
      answer: "21"
      feedback:
        - ["3", "Do not count the 1s. Add their places: 16, 4 and 1."]
        - ["10101", "That reads it as a base-10 number. The places are 16, 8, 4, 2, 1."]
      explain: "10101 = 16 + 4 + 1 = 21."
```

### Ten bits

### Score overflow

### Colour values

### Three bits

### Review: read binary

## Make: enough bits

```step
stage: make
insight: "Choosing the fewest cards for a given range reverses the process: students start from the largest number needed and work out the bits, then check it on the board."
try: { playground: board, starter: "cards.yml#make", height: 460 }
hint: ["How big a number must the cards show? Add cards until they can show it.", "Five cards stop at 31. Is that enough for 39?", "Six cards: 32 + 4 + 2 + 1."]
check: { type: board, text: "A school gives each student in a group an ID number from 0 to 39. Use the fewest cards that can show 39, then set them to 39.", when: "b = 6 and n = 39", explain: "Five cards stop at 31, so you need six (0 to 63). 39 = 32 + 4 + 2 + 1, so 100111." }
```

Then: how many more students could join before you need a seventh card?
