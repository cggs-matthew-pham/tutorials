---
order: 7
unit: functions
introduces: [return-value]
title: Functions that give answers
summary: Return a value, combine functions, and use them inside loops.
language: python
hook: "Calculators, maps and games are full of functions that take something in and give an answer back."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "return hands an answer back to the caller"
  say: "Some functions do something. Others give an answer back, with return."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\ndef metres(m):\n    return m * 20\n\n", append: true }
    - caption:
        text: "metres(5) works out 5 * 20 and gives back 100."
        say: "metres of 5 works out five times twenty, and gives back one hundred."
    - type: { into: "Python code", text: "forward(metres(5))\n", append: true }
    - caption:
        text: "So forward(metres(5)) becomes forward(100)."
        say: "The inner call runs first, so forward gets one hundred."
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - expect: { selector: "#turtle-state", contains: "x 100" }
    - caption:
        text: "print only shows a value. It does not give it back."
        say: "print only shows a value on screen. The program cannot use it."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
You can write functions that draw. Now you will write functions that **give an answer back**, and combine several functions to build something bigger.

## Predict

```step
stage: predict
code: returns.py#returns
```

`metres(5)` gives back a number. What do you think `forward(metres(5))` does? How far will the turtle move, and how far does the second `forward` take it?

## Run

```step
stage: run
code: returns.py#returns
try: { starter: "returns.py#returns", height: 420 }
check: { type: reflect, text: "I can explain how metres(5) becomes a number that forward uses." }
```

Run it and compare it with your prediction. Try `metres(10)`.

## Investigate

```step
stage: investigate
code: returns.py#print
insight: "return hands a value back so other code can use it; print only shows it. Knowing the difference is what makes functions reusable."
tasks:
  - check:
      type: number
      q: "scale is 20. What number does metres(5) give back?"
      answer: 100
      explain: "metres(5) returns 5 * 20 = 100, so forward(metres(5)) moves 100."
  - check:
      type: bug
      code: returns.py#bug
      text: "This version prints 100, then stops with a TypeError on the last line. Click the line that causes it."
      answer: 7
      fault: runtime
      misconception: return-vs-print
      explain: "print(m * scale) shows the value but does not give it back. It should be return m * scale."
  - check:
      type: question
      q: "What does the word return do in metres?"
      options: ["It draws the shape again", "It gives the answer back to the code that called the function", "It stops the program", "It prints the answer"]
      answer: 1
      explain: "return hands the value back, so forward(metres(5)) can use it. print only shows a value; it does not give it back."
```

`print(metres(5))` shows the answer under the drawing. Change `scale` and watch both the printed value and the drawing change.

### What comes back?

Work out the value before you run anything.

### Spot the bug

Here is a version that does not work.

### Explain return

What is the job of the word `return`?

## Modify

```step
stage: modify
insight: "A function that returns a value can be combined with other code, and functions can call each other."
try: { starter: "returns.py#modify", height: 460 }
tasks:
  - hint:
      - "Your function should work out the answer and give it back with return, not print it."
      - "The area of a room is its width times its depth."
    check: { type: code, text: "Write def area(width, depth) that returns a value.", rules: { defs: 3, returns: 2 } }
  - hint: "Call your function inside print(...), for example print(area(5, 4))."
    check: { type: code, text: "Print the area of the room.", rules: { uses: [print, area] } }
```

`room` calls `metres` to turn sizes into pixels. Functions are working together here.

### Write area

Write `def area(width, depth)` that **returns** the area.

### Print the area

Print the area of the room that the program draws.

## Make a street

```step
stage: make
insight: "Written without a starter, this shows whether a student can define, call and repeat a function on their own."
try: { starter: "returns.py#make", height: 460 }
tasks:
  - hint: "Write a function that draws one house, with a size parameter."
    check: { type: code, text: "Write a function for one house and call it.", rules: { defs: 1, calls: 1 } }
  - hint: "A loop calls your function five times. A new size for each house can come from the loop variable."
    check: { type: code, text: "Use a loop to draw five houses.", rules: { defs: 1, calls: 1, loops: 1 } }
```

This time there is no starter. Build the street in two stages.

### Draw one house

Write a function that draws one house.

### Draw five in a row

Use a loop to repeat it for a **street of five houses**.

## Vary a street of houses

```step
stage: modify
try: { starter: "returns.py#street", height: 460 }
```

This is a finished street. Make the houses all the same size, then make them shrink along the street. Add a sixth house, or change the gap between them.
