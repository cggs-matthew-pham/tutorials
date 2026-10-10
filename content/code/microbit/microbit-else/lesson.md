---
order: 6
unit: decide
title: Else and ranges
summary: Choose between two or more options with else and else if, and see that the first true question wins.
language: makecode
introduces: [else]
explainPicture: else.ts#predict
hook: "A spirit level shows whether a shelf is flat, tilted left or tilted right. One reading, three possible answers, and exactly one of them shows."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@else.ts#predict", lesson: "code/microbit/microbit-else", target: "microbit" }
  caption: "if … else chooses between two things"
  say: "If else chooses between two things."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "True: the first part runs. Else: the second."
        say: "If the question is true, the first part runs. Otherwise, the second."
    - caption:
        text: "else if adds more questions, asked from the top."
        say: "else if adds more questions. The micro:bit asks them from the top."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The first true one runs, and the rest are skipped."
        say: "The first true one runs, and the rest are skipped. So order matters."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the night light needed two **if** blocks: one to turn the lights on, one to turn them off. An **if … else** block does both: *if* the question is true, run the first part; *else* (otherwise), run the second. Click the **+** at the bottom of an if block to add **else** and **else if**.

## Predict

```step
stage: predict
code: else.ts#predict
check:
  type: predict
  q: "You tilt the micro:bit a little to the left, just enough that acceleration x is -100. What shows?"
  options: ["An arrow pointing left", "An arrow pointing right", "The small square", "Nothing"]
  actual: "The small square. -100 is not less than -300 and not more than 300, so neither question is true and the else part runs."
```

Tilting left makes **acceleration x** go below 0; tilting right makes it go above 0. A small tilt gives a small number.

## Run

```step
stage: run
code: else.ts#predict
try: { playground: microbit, starter: "else.ts#predict" }
check: { type: reflect, text: "I tilted the micro:bit a little and a lot, both ways, and compared what showed with my prediction." }
```

Move the mouse over the micro:bit to tilt it. Try a small tilt and a big tilt, left and right.

## Investigate

```step
stage: investigate
code: else.ts#predict
insight: "The questions are asked from the top. The first true one runs and the rest are skipped; else runs only when none are true. So the order of the questions decides the ranges."
tasks:
  - check:
      type: trace
      text: "For each value of acceleration x, what shows?"
      table: |
        | acceleration x | shows |
        | -500 | [left arrow] |
        | 0 | [small square] |
        | 400 | [right arrow] |
        | 300 | [small square] |
      explain: "-500 is less than -300, so the first part runs. 0 and 300 fit neither question (300 is not more than 300), so else runs. 400 is more than 300."
  - check:
      type: question
      q: "Leo wants a small tilt right to show a diamond and a big tilt right to show an arrow. The arrow never appears. Why?"
      options: ["500 is too big to reach", "A big tilt is also more than 0, so the first question is true and the rest are skipped", "else if only works with <", "The arrow block is broken"]
      answer: 1
      fault: logic
      misconception: else-if-order
      explain: "The questions are asked from the top, and the first true one wins. Any tilt over 500 is also over 0, so the diamond shows. Ask the bigger question first: > 500, then > 0."
  - check:
      type: question
      q: "When does the else part run?"
      options: ["Always, after the other parts", "Only when every question above it is false", "Only when the first question is true", "Never: it is for notes"]
      answer: 1
```

### Trace the tilt

Work out what shows for each reading.

### Leo's tilt

Leo's program:

```makecode
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

### When does else run?

## Modify

```step
stage: modify
insight: "else replaces the opposite question: one if … else covers both cases, with no gap."
try: { playground: microbit, starter: "else.ts#nightlight" }
tasks:
  - hint: ["Click the + on the first if block to add else.", "Move clear screen into the else part, then delete the second if."]
    check: { type: code, text: "Rebuild last lesson's night light with one if … else.", rules: { contains: ["}else{basic.clearScreen()"] } }
  - hint: ["Add a new if under it, asking about acceleration y.", "Tilting forward makes y go below 0 (arrow up); back makes it go above 0 (arrow down)."]
    check: { type: code, text: "Add a forward and back tilt: an up arrow and a down arrow.", rules: { contains: ["input.acceleration(Dimension.Y)", "elseif("] } }
```

### One if, not two

This is last lesson's night light, with two ifs. Rebuild it with one **if … else**.

### Forward and back

Add a second **if … else if** that shows an arrow for tilting **forward** and **back** (use **acceleration y**).

## Make

```step
stage: make
try: { playground: microbit, starter: "else.ts#make" }
hint:
  - "One if block with else if and else: three parts."
  - "Ask the lowest range first: temperature < 15, then else if temperature < 25, then else."
check: { type: code, text: "A comfort meter: cold below 15, just right from 15 to 24, hot from 25, in one if … else if … else.", rules: { contains: ["input.temperature()<", "elseif(input.temperature()<", "}else{"] } }
```

Make a **comfort meter** for a classroom, in **one** if block with three parts:

- Below **15**: cold (draw it).
- From **15** to **24**: just right (a happy face).
- **25** and above: hot (draw it).

You need only two questions. The order does the rest.

## Change a spirit level

```step
stage: modify
try: { playground: microbit, starter: "else.ts#level" }
```

This spirit level points the way to tilt back to flat, and shows a tick when it is level. Make it fussier (a smaller tilt counts as not level), then make it check **forward and back** as well.
