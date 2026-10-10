---
order: 3
unit: remember-sense
title: Counting
summary: Use a variable to remember a number, and change it each time a button is pressed.
language: makecode
explainPicture: counting.ts#trace
hook: "A step counter, a scoreboard, a ticket machine at the deli: each one remembers a number and changes it when something happens."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@counting.ts#trace", lesson: "code/microbit/microbit-counting", target: "microbit" }
  caption: "A variable is a named box that holds a value"
  say: "A variable is a named box. count holds a number."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "set count to 0 puts 0 in the box."
        say: "set count to zero puts zero in the box, and throws the old value away."
    - caption:
        text: "change count by 1 adds 1 to what is there."
        say: "change count by one adds one to what is already there."
    - click: "Run"
    - wait: 600
    - caption:
        text: "show number count shows it without changing it."
        say: "show number shows the value without changing it."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
So far the micro:bit has shown pictures but forgotten everything straight away. To count, it needs to **remember** a number. A **variable** is a named place to keep a value, such as `count`. You find variable blocks in **Variables**.

## Predict

```step
stage: predict
code: counting.ts#predict
check:
  type: predict
  q: "You press A three times. What number is on the screen?"
  options: ["0", "1", "3", "4"]
  actual: "3. count starts at 0, and each press of A changes it by 1 and shows it: 1, then 2, then 3."
```

**set count to 0** runs once, at the start. **change count by 1** runs each time A is pressed.

## Run

```step
stage: run
code: counting.ts#predict
try: { playground: microbit, starter: "counting.ts#predict" }
check: { type: reflect, text: "I pressed A three times and compared the number with my prediction." }
```

Press **A** slowly three times. Wait for each number to show before you press again.

## Investigate

```step
stage: investigate
code: counting.ts#trace
insight: "A variable keeps its value between events. change adds to it; set replaces it. Setting it again and again in forever wipes it out."
tasks:
  - check:
      type: trace
      text: "This program counts with A and resets with B. Fill in count after each press."
      table: |
        | press | count after |
        | (start) | 0 |
        | A | [1] |
        | A | [2] |
        | B | [0] |
        | A | [1] |
      explain: "change count by 1 adds one to whatever count is now. set count to 0 throws the old value away."
  - check:
      type: question
      q: "Mia built this counter. However fast she presses A, it always shows 0. Why?"
      options: ["A is not connected to count", "forever sets count back to 0 again and again", "showNumber cannot show numbers above 0", "count needs to start at 1"]
      answer: 1
      fault: logic
      misconception: reset-in-loop
      explain: "The press does add 1, but forever runs set count to 0 straight after, many times a second. Setting the start value belongs in on start, which runs once."
  - check:
      type: match
      q: "Match each block with what it does to count."
      pairs:
        - ["set count to 0", "throws the old value away and puts 0 there"]
        - ["change count by 1", "adds 1 to whatever count is now"]
        - ["show number count", "shows count, without changing it"]
```

Here is a counter with a reset button.

### Trace the presses

Work out the value of `count` after each press.

### Mia's counter

Mia's program:

```makecode
let count = 0
input.onButtonPressed(Button.A, function () {
    count += 1
})
basic.forever(function () {
    count = 0
    basic.showNumber(count)
})
```

### Set, change, show

Say what each block does to the variable.

## Modify

```step
stage: modify
insight: "change can add any amount, including a negative one, which counts down."
try: { playground: microbit, starter: "counting.ts#modify" }
tasks:
  - hint: "Click the 1 in change count by 1 and type a new number."
    check: { type: code, text: "Make A count up by 2.", rules: { contains: ["count+=2"] } }
  - hint: ["Drag in on button B pressed from Input.", "change count by -1 counts down. Then show number count."]
    check: { type: code, text: "Make B count down by 1 and show the number.", rules: { inside: { "input.onButtonPressed(Button.B": ["count", "basic.showNumber(count)"] } } }
```

### Count in twos

Make **A** count up by 2: 2, 4, 6.

### Count down

Add an event for **B** that counts down by 1 and shows the number.

## Make

```step
stage: make
try: { playground: microbit, starter: "counting.ts#make" }
hint:
  - "You need three events: shake, A and B. The variable steps is already made."
  - "Shake changes steps by 1. A shows it. B sets it back to 0."
check: { type: code, text: "A step counter: shake adds a step, A shows the count, B resets it.", rules: { inside: { "input.onGesture(Gesture.Shake": ["steps+="], "input.onButtonPressed(Button.A": ["basic.showNumber(steps)"], "input.onButtonPressed(Button.B": ["steps=0"] } } }
```

Build a **step counter**. Each step shakes the micro:bit a little.

- **Shake** adds one step.
- **A** shows how many steps.
- **B** sets the steps back to 0.

In the simulator, click **SHAKE** for each step.

## Change a scoreboard

```step
stage: modify
try: { playground: microbit, starter: "counting.ts#scoreboard" }
```

This scoreboard keeps two variables, one for each team. Make each goal worth 2 points, then make a shake reset both scores to 0.
