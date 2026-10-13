---
order: 4
unit: remember-sense
moveId: count-in-a-variable
reviews: [react-to-event]
introduces: [variable, variable-update]
title: Count with a variable
summary: Use a variable to remember a number, and change it each time a button is pressed.
language: makecode
explainPicture: lesson.ts#trace
hook: "A step counter, a scoreboard, a ticket machine at the deli: each one remembers a number and changes it when something happens."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#trace", lesson: "code/microbit/microbit-counting", target: "microbit" }
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
code: lesson.ts#predict
check:
  type: predict
  q: "You press A three times. What number is on the screen?"
  options: ["0", "1", "3", "4"]
  fault: logic
  misconception: change-replaces
  actual: "3. count starts at 0, and each press of A changes it by 1 and shows it: 1, then 2, then 3."
```

**set count to 0** runs once, at the start. **change count by 1** runs each time A is pressed.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A three times and compared the number with my prediction." }
```

Press **A** slowly three times. Wait for each number to show before you press again.

## Investigate

```step
stage: investigate
code: lesson.ts#trace
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
      fault: logic
      misconception: change-replaces
      explain: "change count by 1 adds one to whatever count is now. set count to 0 throws the old value away."
  - check:
      type: question
      q: "Mia built this counter. However fast she presses A, it always shows 0. Why?"
      options: ["A is not connected to count", "forever sets count back to 0 again and again", "show number cannot show numbers above 0", "count needs to start at 1"]
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
try: { playground: microbit, starter: "lesson.ts#modify" }
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

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "Each event block holds the blocks for its own event, and runs only when that event happens."
check:
  type: question
  q: "Ravi's signal board shows the surprised face once, when it starts, and never when he shakes it. Why?"
  options: ["The surprised face is in on start, not inside on shake", "Shake only works on a real micro:bit", "A and B are taking the shake", "He needs a pause after the face"]
  answer: 0
  explain: "on start runs once, at the start. To react to every shake, the face goes inside an on shake block."
```

Ravi's signal board, with no variables at all.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "You need three events: shake, A and B. The variable steps is already made."
  - "Shake changes steps by 1. A shows it. B sets it back to 0."
check: { type: code, text: "A step counter: shake adds a step, A shows the count, B resets it.", rules: { inside: { "input.onGesture(Gesture.Shake": ["steps+="], "input.onButtonPressed(Button.A": ["basic.showNumber(steps)"], "input.onButtonPressed(Button.B": ["steps=0"] } } }
unlocks: [counter]
```

Build a **step counter**. Each step shakes the micro:bit a little.

- **Shake** adds one step.
- **A** shows how many steps.
- **B** sets the steps back to 0.

In the simulator, click **SHAKE** for each step.

## Change a scoreboard

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#scoreboard" }
```

This scoreboard keeps two variables, one for each team. Make each goal worth 2 points, then make a shake reset both scores to 0.

```teacher
summary: "Students use a variable to count button presses and shakes, and see the difference between setting a variable and changing it."
time: 45
timing: "Predict and Run 8 min · Investigate 12 min · Modify 8 min · Mix it up 3 min · Make 10 min · Scoreboard 4 min"
goals:
  - I can make a variable and set its starting value.
  - I can change a variable when an event happens, and show it.
  - I can explain the difference between set and change.
before: |
  A **variable** is a named box that holds a value, such as `count`. Make one in **Variables › Make a Variable**. Two blocks matter: **set** puts a new value in the box (throwing the old one away) and **change** adds to what is already there. Where the set block goes matters: in **on start** it runs once; in **forever** it runs again and again and wipes the count. Numbers above 9 scroll across the screen, so ask students to wait before pressing again.
running:
  - "Predict: most students say 3. Some say 1 (change sets it to 1). Ask what count is before the second press."
  - "Run: press slowly. Point out that the number is remembered between presses: that is the variable."
  - "Investigate: the trace shows set (B) throwing the value away. Mia's counter is the most common mistake this lesson: set inside forever."
  - "Modify: change by -1 counts down. Negative numbers show with a minus sign."
  - "Mix it up: a look back at events, with no variables."
  - "Make: three events and one variable. steps is already made for them."
stuck:
  - see: "The number always shows 0."
    ask: "Where is your set count to 0 block?"
    fix: "Move it into on start. In forever it resets the count all the time."
  - see: "The count goes up but nothing shows."
    ask: "Which block shows the number, and when does it run?"
    fix: "Add show number count inside the button event, after the change block."
  - see: "Numbers above 9 seem to go missing."
    ask: "What happens when the screen is still scrolling?"
    fix: "Wait for the number to finish scrolling, or press more slowly."
stretch: "Make the scoreboard show both scores on A+B, one after the other."
support: "Give students the step counter's three event blocks already in place, and ask them only to fill in set, change and show."
leads: "Next lesson: sensors give numbers too, but the micro:bit updates them by itself. Class ideas: a class tally of votes with A and B; count the steps between classrooms with a real micro:bit in a pocket."
exit:
  q: "What is the difference between set count to 0 and change count by 1?"
  a: "set count to 0 throws the old value away and puts 0 there. change count by 1 adds 1 to whatever count already is."
explain: |
  A **variable** is a named box that holds a value. `count` holds a number, and it keeps it between button presses.

  - **set count to 0** puts 0 in the box (the old value is thrown away)
  - **change count by 1** adds 1 to what is already there
  - **show number count** shows the value without changing it

  Set the starting value in **on start**, so it happens once.
solutions:
  step-4#t1: lesson.ts#sol-by-two
  step-4#t2: lesson.ts#sol-down
  step-6: lesson.ts#sol-make
struggle: "Telling set from change. Ask what count was before the press, and what it is after."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what number shows after three presses. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask the students who chose 1 what change count by 1 does to a count that is already 1."
    - at: investigate
      title: The box on the desk
      minutes: 4
      do: |
        A student holds a box with a number card in it. The class calls "A" (add one: swap for the next card) or "B" (set to 0: swap for the 0 card).
      notes: "The box keeps its card between calls. That is what remembering means."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Swap step counters with the next pair. Shake five times, then check with A.
```

```code lesson.ts#predict
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
```

```code lesson.ts#trace
let count = 0
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
input.onButtonPressed(Button.B, function () {
    count = 0
    basic.showNumber(count)
})
```

```code lesson.ts#modify
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
```

```code lesson.ts#sol-by-two
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 2
    basic.showNumber(count)
})
```

```code lesson.ts#sol-down
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 2
    basic.showNumber(count)
})
input.onButtonPressed(Button.B, function () {
    count += -1
    basic.showNumber(count)
})
```

```code lesson.ts#review
basic.showIcon(IconNames.Square)
basic.showIcon(IconNames.Surprised)
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.West)
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.East)
})
```

```code lesson.ts#make
let steps = 0
```

```code lesson.ts#sol-make
let steps = 0
input.onGesture(Gesture.Shake, function () {
    steps += 1
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(steps)
})
input.onButtonPressed(Button.B, function () {
    steps = 0
    basic.showIcon(IconNames.Yes)
})
```

```code lesson.ts#scoreboard
let home = 0
let away = 0
input.onButtonPressed(Button.A, function () {
    home += 1
    basic.showString("H")
    basic.showNumber(home)
})
input.onButtonPressed(Button.B, function () {
    away += 1
    basic.showString("A")
    basic.showNumber(away)
})
```
