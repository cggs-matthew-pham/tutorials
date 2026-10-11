---
order: 3
node: AC9TDI8K04 n3
unit: machine
title: Remembering a bit
summary: "Feed two gates' outputs back into each other and they hold a bit: a latch. Set makes it 1, Reset makes it 0, and with both off it keeps what it had. Latches side by side make a register that stores a number."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A gate's output changes the moment its inputs change. So how does a computer remember anything?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8484
  url: http://127.0.0.1:8484/index.html
  readySelector: ".gtlsvg"
  layout: full
explainPicture: { ref: latch.yml#explain-pic, caption: "Two NOR gates feeding each other hold one bit; four of them side by side store a 4-bit number." }
explainClip:
  query: { code: "@latch.yml#explain", fresh: 1, id: explain }
  caption: "A bit that stays"
  say: "Two gates whose outputs feed back into each other."
  clip:
    - click: "Set (S), off, 0"
    - caption: { text: "Set on: Q becomes 1.", say: "Turn Set on, and Q becomes 1." }
    - wait: 1000
    - click: "Set (S), on, 1"
    - expect: { selector: "#gsum", contains: "Q = 1" }
    - caption: { text: "Set off again: Q stays 1. The two gates keep each other going.", say: "Turn Set off, and Q stays 1. It remembers." }
    - wait: 1500
    - click: "Reset (R), off, 0"
    - caption: { text: "Reset on: Q goes back to 0.", say: "Reset makes it 0 again." }
    - wait: 1200
---
Every gate so far forgets: change its inputs and its output changes straight away. To remember, a circuit needs a loop: outputs fed back in as inputs.

## Predict: on, then off

```step
stage: predict
insight: "Committing to what Q does after Set goes off tests the new move: a loop of gates keeps its bit."
check:
  type: predict
  q: "A latch has a Set switch and a Reset switch. Turn Set on: Q becomes 1. Now turn Set off again. What is Q?"
  options: ["Still 1: it remembers", "0: nothing is switched on", "It flickers between 0 and 1", "It depends on the time"]
  actual: "Still 1. Each gate's output keeps the other gate in the state that holds Q at 1, until Reset changes it."
```

## Try: set it and let go

```step
stage: run
insight: "Setting and releasing on the latch settles the prediction: with both switches off, Q keeps its bit."
try: { playground: board, starter: "latch.yml#run", height: 460 }
check: { type: board, text: "Turn Set on, then off. Is Q still 1?", when: "k >= 1 and h = 1", explain: "Q stays 1 with both switches off: the latch remembers one bit." }
```

Was your prediction right? Follow the dashed wires: each NOR gate's output goes into the other.

## Worked example: the latch's rules

```step
stage: investigate
insight: "Working through the four switch settings models the new move, including the one that keeps the old value. Sam treats the latch like a lamp, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "Q is 1. Reset goes on, then off again. What is Q now?"
      options: ["0", "1"]
      answer: 0
      feedback: [null, "Reset makes Q 0, and with both off it keeps that 0."]
      explain: "Reset sets Q to 0; letting go keeps it at 0."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains the latch. Click the line where it first goes wrong."
      answer: 2
      fault: logic
      misconception: latch-forgets
      explain: "Line 2: a latch is not a lamp. With Set and Reset both off, Q keeps the 1: that is memory."
  - check:
      type: question
      q: "Why does RAM lose everything when the power goes off?"
      options: ["Its bits are held by circuits like latches, which need power to keep feeding each other", "The processor deletes it", "It copies everything to storage first", "Power cuts damage it"]
      answer: 0
      feedback: [null, "Nothing deletes it; it just fades.", "That is what saving does, not RAM.", "RAM works fine afterwards, just empty."]
      explain: "No power, no loop, no bit. Storage keeps data a different way (magnetism or trapped charge)."
```

### Four settings

```worked
S = 1, R = 0 \Rightarrow Q = 1 :: Set: the bottom NOR's output goes to 0, which lets the top one make Q = 1.
S = 0, R = 0 \Rightarrow Q \text{ stays} :: Both off: each gate's output holds the other where it is. This is the memory.
S = 0, R = 1 \Rightarrow Q = 0 :: Reset: the top NOR's output goes to 0.
S = 1, R = 1 :: Not allowed: Q and not Q both become 0, which makes no sense for one bit.
```

Now try Reset.

### Find the mistake

### Why RAM forgets

## Vary: latches and a register

```step
stage: modify
insight: "Each task changes one thing: reset and release, both switches on (the edge case), then four latches as a register that stores and keeps a number."
try: { playground: board, starter: "latch.yml#modify", height: 600 }
tasks:
  - check: { type: board, text: "Set Q to 1, then reset it to 0, then turn both switches off. Does Q stay 0?", when: "k >= 2 and q = 0 and s = 0 and r = 0", explain: "Reset and let go: Q stays 0. Either bit, the latch keeps it." }
  - check: { type: board, text: "Edge case: turn Set and Reset on together. What happens to Q and not Q?", when: "f = 1", explain: "Both outputs become 0, so \"not Q\" isn't the opposite of Q any more. Real circuits are designed so this never happens." }
  - check: { type: board, text: "The register is four latches. Set the data switches to 9 and press Store.", when: "v = 9", explain: "1001 stored: each bit in its own latch." }
  - check: { type: board, text: "Now set the data switches back to 0 without pressing Store. What does the register hold?", when: "v = 9 and d = 0 and w >= 1", explain: "Still 9: the register only changes when you Store. In a processor, the clock does the storing, many times a second." }
```

### Reset

### Both on

### Store a number

### Keep it

## Practise: memory

```step
stage: practise
insight: "Reasoning about latches and registers without the board is the same move, plus reviews of bits and of RAM against storage."
tasks:
  - check:
      type: question
      q: "A register is 8 latches side by side. What is the biggest number it can hold?"
      options: ["255", "8", "256", "128"]
      answer: 0
      feedback: [null, "That's how many bits, not the biggest number.", "256 patterns, but they start at 0.", "That's just the top bit."]
      explain: "8 bits: 0 to 255."
  - check:
      type: question
      q: "A computer has 8 GB of RAM. About how many bits is that?"
      options: ["About 64 billion", "About 8 billion", "About 8 million", "About 8"]
      answer: 0
      feedback: [null, "A byte is 8 bits.", "A GB is about a billion bytes.", "GB means gigabytes."]
      explain: "8 billion bytes × 8 bits = about 64 billion bits, each held by a tiny circuit."
  - check:
      type: question
      q: "Review: which part keeps your files when the computer is switched off?"
      options: ["Storage", "RAM", "The processor's registers", "The clock"]
      answer: 0
      feedback: [null, "RAM empties without power.", "Registers are latches too.", "The clock only ticks."]
      explain: "Storage (SSD or hard disk) keeps data without power."
```

### Register size

### RAM in bits

### Review: RAM and storage

## Make: hold a number

```step
stage: make
insight: "Leaving the register holding one number while the data switches show another reverses the process: students decide what is stored and prove it stays."
try: { playground: board, starter: "latch.yml#make", height: 600 }
hint: ["12 is 8 + 4.", "Set 1100, press Store.", "Then change the data switches to 0011 and don't press Store."]
check: { type: board, text: "Make the register hold 12 while the data switches show 3.", when: "v = 12 and d = 3", explain: "The register remembers 12 whatever the switches say, until the next Store. That is what a processor's registers do between clock ticks." }
```

Then: what would you need to store 16 bits?
