---
order: 8
unit: functions
title: Functions that decide
summary: "Put an if inside a function so it chooses its answer, then call it for every item in a list: decisions, lists and functions working together."
language: python
hook: "Apps decide all the time: is this message spam, is this score a pass, which colour is this weather? Each is a function with an if inside."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 10 }
  caption: "An if inside a function lets it choose its answer"
  say: "An if inside a function lets the function choose its answer."
  pacing: { keyDelayMs: 20 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\ndef size_colour(size):\n    if size > 50:\n        return \"red\"\n    else:\n        return \"blue\"\n\n", append: true }
    - caption:
        text: "Big sizes get red, the rest get blue."
        say: "Sizes over fifty get red. The rest get blue."
    - type: { into: "Python code", text: "for s in [30, 70]:\n    dot(s, size_colour(s))\n    forward(80)\n", append: true }
    - caption:
        text: "The loop asks the function about every size in the list."
        say: "The loop asks the function about every size in the list."
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "A small blue dot, then a big red one: the function decided."
        say: "A small blue dot, then a big red one. The function decided each time."
    - wait: 1000
    - expect: { selector: "#status", contains: "Finished" }
---
You know three things that work well together: **if** chooses, **lists** hold many values, and **functions** give answers back. Put them together:

```python
def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"
```

The function **decides** its answer. Call it inside a loop over a list, and it decides for every item.

## Predict

```step
stage: predict
code: decide.py#predict
check:
  type: predict
  q: "What two words are printed?"
  options: ["red, then blue", "red, then red", "blue, then red", "size_colour, then size_colour"]
  actual: "red, then blue. 80 is more than 50, so the if returns red; 30 is not, so the else returns blue."
```

Each call gives back one of two words. Which one depends on the size.

## Run

```step
stage: run
code: decide.py#run
try: { starter: "decide.py#run", height: 420 }
check: { type: reflect, text: "I can say why each dot got its colour." }
```

Run it. Each dot is as big as its size, and the function chose its colour. Change `50` to `30` and run again: which dots change?

## Investigate

```step
stage: investigate
code: decide.py#run
insight: "The function makes the same decision for every item the loop gives it; a counter that totals the decisions must start before the loop."
tasks:
  - check:
      type: trace
      text: "Fill in what size_colour gives back for each size in the list."
      table: |
        | s | size_colour(s) |
        | 20 | blue |
        | 60 | red |
        | 35 | [blue] |
        | 80 | [red] |
        | 50 | [blue] |
      explain: "50 is not more than 50, so it goes to the else: blue. > means more than, not equal to."
  - check:
      type: question
      q: "Why put the if inside a function, and not straight in the loop?"
      options: ["The decision gets a name and can be used anywhere: in this loop, in another loop, in a print", "Python only allows if inside functions", "It makes the dots bigger", "It runs faster"]
      answer: 0
      explain: "Named once, size_colour can be reused and changed in one place. Change the rule inside it, and every place that uses it follows."
  - check:
      type: bug
      code: decide.py#bug
      text: "There are two sizes over 50, but this prints 1. There is no error. Click the line that is wrong."
      answer: 3
      fault: logic
      misconception: counter-in-loop
      explain: "count = 0 is inside the loop, so it goes back to 0 for every size: only the last count survives. Set it to 0 once, before the loop."
```

### Trace the decisions

What does each size give back?

### Why a function?

One decision, many uses.

### Spot the bug

A count that keeps starting again.

## Modify

```step
stage: modify
insight: "A decision can have more than two answers; counting with a loop and an if is another function that gives an answer back."
try: { starter: "decide.py#run", height: 420 }
tasks:
  - hint:
      - "elif adds another choice between if and else."
      - "elif size > 30: return \"orange\", between the if and the else."
    check: { type: code, text: "Give middle sizes (over 30) their own colour, orange.", rules: { contains: ["elif"] } }
  - hint:
      - "A function that counts: start at 0 before the loop, add 1 inside an if, return the count after the loop."
      - "def count_big(sizes): then count = 0, for s in sizes:, if s > 50: count = count + 1, and return count. Then print(count_big(sizes))."
    check: { type: code, text: "Write def count_big(sizes) that returns how many sizes are over 50, and print it.", rules: { contains: ["def count_big(", "print(count_big("], returns: 2 } }
```

### Three colours

Add an elif.

### Count the big ones

Count with a loop and an if.

## Make: score bars

```step
stage: make
insight: "Goals only: a function that decides, called for every item in a list, inside a drawing loop."
try: { starter: "decide.py#make", height: 460 }
check: { type: code, text: "Write a function that returns a colour for a score, and use it to colour a bar for every score.", rules: { defs: 1, returns: 1, loops: 1, contains: ["if"] } }
```

Draw a bar for each score, as tall as the score, coloured by a function you write: **green** for 70 or more, **orange** for 50 or more, **red** below that. Most people need two goes at the bars: draw one bar first, then loop.
