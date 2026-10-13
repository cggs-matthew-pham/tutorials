---
order: 5
unit: time
moveId: time-between
reviews: [pick-from-list, forever-loop]
introduces: [running-time]
assumes: [variable, random, if, else]
title: Time between
summary: Store the running time at one moment and take it away from a later one, to measure how long something took.
language: makecode
explainPicture: lesson.ts#stopwatch
hook: "A stopwatch, a lap timer and a game's reaction score all do one subtraction: the time now, take away the time it started."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#stopwatch", lesson: "code/microbit-play/microbit-time", target: "microbit" }
  caption: "running time counts milliseconds since switch-on"
  say: "Running time counts the milliseconds since the micro:bit switched on."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A stores it in start: the moment the timing begins."
        say: "A stores it in start, the moment the timing begins."
    - click: "Run"
    - wait: 600
    - caption:
        text: "B shows running time − start: how long since A."
        say: "B shows running time minus start. That is how long since A."
    - caption:
        text: "1000 ms is one second."
        say: "A thousand milliseconds is one second."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
The micro:bit keeps count of time. **running time** (in **Input › more**) gives the number of **milliseconds** since the micro:bit switched on. 1000 ms is one second. On its own it is a very big number; the trick is to take one reading away from another.

## Predict

```step
stage: predict
code: lesson.ts#stopwatch
check:
  type: predict
  q: "You press A when the running time is 5000, and B when it is 7500. What does B show?"
  options: ["2500", "7500", "5000", "12500"]
  fault: logic
  misconception: running-time-from-press
  actual: "2500. A stores 5000 in start. B shows running time − start: 7500 − 5000 = 2500 ms, two and a half seconds."
```

**A** stores the running time in `start`. **B** shows the running time take away `start`.

## Run

```step
stage: run
code: lesson.ts#stopwatch
try: { playground: microbit, starter: "lesson.ts#stopwatch" }
check: { type: reflect, text: "I pressed A, waited, pressed B, and compared the number with how long I waited." }
```

Press **A**, count to three in your head, then press **B**. Is the number close to 3000?

## Investigate

```step
stage: investigate
code: lesson.ts#stopwatch
insight: "running time counts from when the micro:bit started, so a time between two moments is one reading taken away from another."
tasks:
  - check:
      type: trace
      text: "Fill in the number B shows."
      table: |
        | start (A pressed) | running time when B is pressed | B shows |
        | 5200 | 5450 | [250] |
        | 8000 | 11000 | [3000] |
        | 12000 | 12180 | [180] |
      explain: "B shows running time minus start: how many milliseconds passed between A and B."
  - check:
      type: question
      q: "Zara's B shows only running time, with no start taken away. She presses A, waits 2 seconds, presses B, and sees 14231. Why?"
      options: ["running time counts from when the micro:bit started, not from A", "The micro:bit is slow", "A changed the running time", "14231 is 2 seconds"]
      answer: 0
      fault: logic
      misconception: running-time-from-press
      explain: "running time never restarts at a press. It counts from switch-on, so the time between two moments is one reading minus the other."
  - check:
      type: number
      q: "B shows 2500. How many seconds is that?"
      answer: 2.5
      explain: "1000 ms is one second, so 2500 ms is 2.5 seconds."
```

### Trace the times

### Zara's stopwatch

### Milliseconds to seconds

## Modify

```step
stage: modify
insight: "The time between can be turned into seconds, and any event can be the start."
try: { playground: microbit, starter: "lesson.ts#stopwatch" }
tasks:
  - hint: ["Drag the division block from Math into show number.", "Put running time − start on the left and 1000 on the right."]
    check: { type: code, text: "Make B show the time in seconds, by dividing by 1000.", rules: { contains: ["/1000"] } }
  - hint: "Drag in on shake, with set start to running time inside."
    check: { type: code, text: "Make a shake start the stopwatch too.", rules: { inside: { "input.onGesture(Gesture.Shake": ["start=input.runningTime()"] } } }
```

### In seconds

Make **B** show seconds, not milliseconds.

### Shake to start

Make a **shake** start the stopwatch as well as **A**.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "pick random gives any whole number from the first to the second, so a pause can be different every time."
check:
  type: number
  q: "B clears the screen, pauses for pick random 1000 to 4000, then shows the heart. What is the longest the heart can take to appear, in milliseconds?"
  answer: 4000
  explain: "pick random 1000 to 4000 can give any whole number from 1000 up to 4000, so the longest wait is 4000 ms: four seconds."
```

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "When the heart appears, set start to running time."
  - "In on button A pressed: show number running time − start."
check: { type: code, text: "Time a reaction: store the time when the heart appears, and show how long until A is pressed.", rules: { contains: ["start=input.runningTime()"], inside: { "input.onButtonPressed(Button.A": ["input.runningTime()-start"] } } }
unlocks: [time-it]
```

Press **B** and a heart appears after a random wait. Make **A** show how many milliseconds you took to press it.

1. When the heart appears, set `start` to **running time**.
2. When **A** is pressed, show **running time − start**.

## Change an egg timer

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#egg" }
```

This timer starts when the micro:bit switches on, and again whenever **A** is pressed. It shows a small square until 5 seconds have passed, then an alarm face. Make it a 3-minute timer (180000 ms), and choose your own pictures.

```teacher
summary: "Students store the running time at one moment and take it away from a later reading, to measure how long something took."
time: 40
timing: "Predict and Run 8 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Egg timer 3 min"
goals:
  - I can measure how long something took with running time.
  - I can say why running time on its own is a big number.
  - I can turn milliseconds into seconds.
before: |
  **running time** (Input › more) is the number of milliseconds since the micro:bit switched on. It never restarts at a press, so on its own it is a big number. Timing is a subtraction: store running time in a variable at the start (`start`), then later show *running time − start*. 1000 ms is one second; dividing by 1000 gives seconds with a decimal. In the simulator, timings are a little longer than on a real micro:bit.
running:
  - "Predict: some students choose 7500, the running time itself. Ask what start holds."
  - "Run: press A, count three, press B. Close to 3000?"
  - "Investigate: Zara's stopwatch is this lesson's misconception: running time is not a stopwatch that starts at the press."
  - "Modify: seconds by dividing; a second event can start the timing."
  - "Mix it up: a random wait, from Pick from a list and the forever lesson's pause."
  - "Make: this is the heart of the reaction timer in the final challenge."
stuck:
  - see: "The time shown is huge, like 15000."
    ask: "Is start set before the time is shown?"
    fix: "Set start to running time at the moment the timing begins."
  - see: "The time shown is negative."
    ask: "Which way round is the subtraction?"
    fix: "running time − start: the later reading first."
  - see: "B shows 0 every time."
    ask: "Is start set in the same event that shows the time?"
    fix: "Set start in A (or when the heart appears), and show the time in B."
stretch: "Make a lap timer: B shows the time since the last B, not since A (set start again after showing)."
support: "Give students the make with start already set when the heart appears, and ask them only to build the subtraction in A."
leads: "Next lesson: a true/false variable, so an early press does not count. Class idea: time how long the class takes to go silent after the quiet signal."
exit:
  q: "start is 3000. Running time is 3750 when B is pressed. What does running time − start show, and what does it mean?"
  a: "750: 750 milliseconds passed between storing start and pressing B."
explain: |
  **running time** counts the milliseconds since the micro:bit switched on. 1000 ms is one second.

  To time something, store running time in a variable at the start (`start`). Later, **running time − start** is how long it took.
solutions:
  step-4#t1: lesson.ts#sol-seconds
  step-4#t2: lesson.ts#sol-shake
  step-6: lesson.ts#sol-make
struggle: "Seeing why the subtraction is needed. Ask what running time was when the micro:bit started, and what it is now."
class:
  activities:
    - at: investigate
      title: The clock on the wall
      minutes: 3
      do: |
        Read the classroom clock and write the time. In one minute, read it again. How long passed?
      notes: "Nobody restarts the wall clock to time something: we subtract two readings. That is running time − start."
    - at: end
      title: Race a friend
      minutes: 3
      do: |
        Try the reaction make three times each with the next pair. Who is fastest?
```

```code lesson.ts#stopwatch
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(input.runningTime() - start)
})
```

```code lesson.ts#sol-seconds
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber((input.runningTime() - start) / 1000)
})
```

```code lesson.ts#sol-shake
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    basic.showIcon(IconNames.Yes)
})
input.onGesture(Gesture.Shake, function () {
    start = input.runningTime()
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber((input.runningTime() - start) / 1000)
})
```

```code lesson.ts#review
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
})
```

```code lesson.ts#make
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
})
input.onButtonPressed(Button.A, function () {

})
```

```code lesson.ts#sol-make
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.runningTime() - start)
})
```

```code lesson.ts#egg
let start = input.runningTime()
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - start > 5000) {
        basic.showIcon(IconNames.Surprised)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```
