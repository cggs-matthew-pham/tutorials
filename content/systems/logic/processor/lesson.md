---
order: 4
node: AC9TDI8K04 n3
unit: machine
title: A tiny processor
summary: "A processor repeats one cycle: fetch the instruction the program counter points at, decode it, execute it, one step per clock tick. The program is numbers in the same memory as the data. Step a tiny processor, change its program, and write your own."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your games, apps and websites all end up as simple instructions like ADD and JUMP. What does a processor actually do with them?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8485
  url: http://127.0.0.1:8485/index.html
  readySelector: ".cpcpu"
  layout: full
explainPicture: { ref: cpu.yml#explain-pic, caption: "Sixteen memory cells holding a program and its data, and a processor with a program counter, an instruction register and an accumulator." }
explainClip:
  query: { code: "@cpu.yml#explain", fresh: 1, id: explain }
  caption: "Fetch, decode, execute"
  say: "A program in memory, and a processor to run it."
  clip:
    - click: Clock tick
    - caption: { text: "Fetch: copy cell 0 (LOAD 6) into the instruction register; the PC moves on to 1.", say: "Fetch: copy the instruction from cell 0. The program counter moves on." }
    - wait: 1200
    - click: Clock tick
    - caption: { text: "Decode: LOAD 6 means copy cell 6 into the accumulator.", say: "Decode: work out what it means." }
    - wait: 1200
    - click: Clock tick
    - caption: { text: "Execute: ACC is now 5. Three ticks, one instruction.", say: "Execute: the accumulator is now 5." }
    - wait: 1200
    - click: Run
    - wait: 2500
    - expect: { selector: "#gsum", contains: "output 8" }
    - caption: { text: "The same cycle for ADD 7, OUT and HALT: the output is 8.", say: "The same three steps, again and again. The output is 8." }
    - wait: 1500
---
A processor is gates, registers and memory working together. It does one tiny thing per **clock tick**, again and again: fetch an instruction, decode it, execute it.

## Predict: what will it output?

```step
stage: predict
insight: "Committing to the program's output tests the new move: the processor works through the cells one instruction at a time."
check:
  type: predict
  q: "Memory holds: cell 0 LOAD 6, cell 1 ADD 7, cell 2 OUT, cell 3 HALT, cell 6 = 5, cell 7 = 3. What does the program output?"
  options: ["8", "53", "5, then 3", "Nothing: HALT comes first"]
  actual: "8: load 5, add 3, output the accumulator, stop."
```

## Try: tick by tick

```step
stage: run
insight: "Ticking through the program settles the prediction and shows the new move: each instruction is fetched, decoded and executed in turn."
try: { playground: board, starter: "cpu.yml#run", height: 640 }
check: { type: board, text: "Press Clock tick (or Whole instruction) until it halts. Watch the PC, the instruction register and the accumulator.", when: "h = 1 and o = 8", explain: "Four instructions, three ticks each: 12 clock ticks to output 8." }
```

Was your prediction right?

## Worked example: one instruction, three ticks

```step
stage: investigate
insight: "Tracing LOAD 6 through fetch, decode and execute models the new move. Sam keeps instructions and numbers apart, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "Each instruction takes three clock ticks. How many ticks does the whole program (LOAD, ADD, OUT, HALT) take?"
      answer: "12"
      feedback:
        - ["4", "That's the number of instructions; each takes three ticks."]
        - ["9", "HALT is fetched, decoded and executed too."]
      explain: "4 instructions × 3 ticks = 12."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains the memory. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: code-not-numbers
      explain: "Line 3: instructions are numbers, kept in the same memory as the data. If the PC ever reached cell 6, the processor would run 5 as an instruction."
  - check:
      type: question
      q: "A processor runs at 3 GHz. About how many clock ticks is that each second?"
      options: ["3 billion", "3 million", "3 thousand", "3"]
      answer: 0
      feedback: [null, "Mega is million; giga is billion.", "Kilo is thousand.", "Hertz means per second; giga means billion."]
      explain: "3 GHz is 3 billion ticks a second, so this 12-tick program would take 4 billionths of a second."
```

### LOAD 6, tick by tick

```worked
\text{fetch: IR} = \text{cell } 0 = 22,\ PC = 1 :: LOAD 6 is stored as 1 × 16 + 6 = 22. The PC moves on, ready for next time.
\text{decode: } 22 = 1 \times 16 + 6 :: Operation 1 is LOAD; the address is 6.
\text{execute: ACC} = \text{cell } 6 = 5 :: Copy the number in cell 6 into the accumulator.
\text{next: fetch cell } 1 :: The PC says where to go next: ADD 7.
```

Now count the ticks for the whole program.

### Find the mistake

### Clock speed

## Vary: change the program

```step
stage: modify
insight: "Each task changes one thing: a data cell, then one instruction, then STORE instead of OUT, then the start of a loop."
try: { playground: board, starter: "cpu.yml#edit", height: 680 }
tasks:
  - starter: "cpu.yml#edit"
    check: { type: board, text: "Change one data cell so the program outputs 12. Type in the cell, then run it.", when: "h = 1 and o = 12", explain: "For example cell 7 = 7: 5 + 7 = 12. Same program, different data." }
  - starter: "cpu.yml#edit2"
    check: { type: board, text: "Change one instruction so the program outputs 5 − 3.", when: "h = 1 and o = 2", explain: "ADD 7 becomes SUB 7. One number in memory changed what the program does." }
  - starter: "cpu.yml#store"
    check: { type: board, text: "This program stores its answer. Run it: what ends up in cell 9?", when: "h = 1 and v = 8", explain: "STORE 9 copies the accumulator into cell 9: the answer is kept in memory for later." }
  - starter: "cpu.yml#loop"
    check: { type: board, text: "This program counts down from 3 using JUMP and JZ. Make it count down from 5.", when: "x = 1", explain: "Change cell 12 to 5. JUMP 1 sends the PC back to repeat; JZ 5 leaves the loop when the accumulator reaches 0." }
```

### Change the data

### Change an instruction

### Store the answer

### A loop

## Practise: the cycle

```step
stage: practise
insight: "Reasoning about the cycle without the board is the same move in mixed forms, plus a review of adders."
tasks:
  - check:
      type: question
      q: "The PC is 4. The processor fetches. What is the PC afterwards (if the instruction isn't a jump)?"
      options: ["5", "4", "0", "It depends on the accumulator"]
      answer: 0
      feedback: [null, "Fetching moves the PC on.", "Only a jump to 0 would do that.", "Only JZ looks at the accumulator."]
      explain: "Fetch copies the instruction and adds 1 to the PC."
  - check:
      type: question
      q: "Which instruction lets a program repeat steps?"
      options: ["JUMP: it changes the PC to an earlier cell", "ADD", "OUT", "HALT"]
      answer: 0
      feedback: [null, "ADD changes the accumulator, not where to go.", "OUT shows the accumulator.", "HALT stops."]
      explain: "A jump back makes a loop; a JZ (jump if zero) can leave it."
  - check:
      type: question
      q: "Review: ADD 7 adds two 8-bit numbers. What inside the processor does the adding?"
      options: ["A row of full adders, made of gates", "The program counter", "The memory", "The clock"]
      answer: 0
      feedback: [null, "The PC only counts cells.", "Memory holds the numbers.", "The clock only says when."]
      explain: "Eight full adders side by side, as in Adding with gates."
```

### The PC

### Loops

### Review: adding

## Make: write a program

```step
stage: make
insight: "Writing a program from an empty memory reverses the process: from the outputs wanted to the instructions that make them."
try: { playground: board, starter: "cpu.yml#make", height: 680 }
hint: ["Cell 15 holds 2. Every output needs an OUT just before it.", "LOAD 15, then OUT, then ADD 15, then OUT…", "LOAD 15; OUT; ADD 15; OUT; ADD 15; OUT; HALT (seven cells)."]
check: { type: board, text: "Memory is empty except cell 15, which holds 2. Write a program that outputs 2, 4, 6 and then halts.", when: "x = 1", explain: "You wrote machine code: the numbers in cells 0 to 6 are the program. Every app ends up as instructions like these." }
```

Then: can you do it with a loop instead, so it would work for 2, 4, 6, 8, 10 without more cells?
