---
order: 6
unit: time
moveId: remember-state
reviews: [time-between]
introduces: [bool-value]
assumes: [variable, if, else, random, running-time]
title: True or false
summary: Use a variable that holds true or false to remember what is happening now, so each event can check it.
language: makecode
explainPicture: lesson.ts#sol-make
hook: "A lift only opens its doors when it has stopped, and a ticket gate only lets you through once per ticket. Each one remembers a single yes-or-no fact."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sol-make", lesson: "code/microbit-play/microbit-flag", target: "microbit" }
  caption: "A variable can hold true or false"
  say: "A variable can hold true or false, a yes or no fact."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "waiting is true only while the heart is showing."
        say: "waiting is true only while the heart is showing."
    - click: "Run"
    - wait: 600
    - caption:
        text: "A asks: are we waiting? Yes: time it. No: too early."
        say: "A asks, are we waiting? If yes, time it. If not, it's too early."
    - caption:
        text: "Then set it back to false, so only one press counts."
        say: "Then set it back to false, so only one press counts."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson's reaction tester has a cheat: press **A** before the heart and you still get a time. To fix it, the micro:bit must **remember** whether the heart is showing. A variable can hold **true** or **false** (in **Logic**), and an **if** can ask about it.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You press B, then press A before the heart appears. What does A show?"
  options: ["A number, as if you had reacted", "Nothing", "A cross for too early", "The heart, straight away"]
  actual: "A number. A always shows running time − start, so an early press still gets a time. Nothing in the program knows whether the heart is showing."
```

This is last lesson's reaction tester.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A before the heart and saw that it still gave me a time." }
```

Press **B**, then press **A** straight away, before the heart.

## Investigate

```step
stage: investigate
code: lesson.ts#sol-make
insight: "A true/false variable remembers what is happening now. Each event sets it or asks about it, and it must be set back, or it keeps saying true."
tasks:
  - check:
      type: trace
      text: "This version remembers whether the heart is showing in waiting. Fill in waiting after each event, and what A shows."
      table: |
        | event | waiting after | shows |
        | B pressed | false | nothing |
        | A pressed too early | [false] | [cross] |
        | heart appears | [true] | heart |
        | A pressed | [false] | [the time] |
        | A pressed again | [false] | [cross] |
      explain: "waiting is true only from the heart until the first A. A sets it back to false, so a second press is too early again."
  - check:
      type: question
      q: "Raj sets waiting to true when the heart appears, but never sets it back to false. He presses A once and gets a time. What does a second press of A show?"
      options: ["Another time, a bigger one", "A cross", "Nothing", "The same time again"]
      answer: 0
      fault: logic
      misconception: flag-never-reset
      explain: "waiting is still true, so the if says yes again and shows running time − start, which has grown. Set waiting to false after the first press."
  - check:
      type: match
      q: "The same program in Python. Match each line with what it does."
      pairs:
        - ["waiting = True", "remembers that the heart is showing"]
        - ["if waiting:", "asks: is the heart showing?"]
        - ["else:", "the heart is not showing: too early"]
```

### Follow waiting

### Raj's second press

### In Python

```python
def on_button_pressed_a():
    global waiting
    if waiting:
        waiting = False
        basic.show_number(input.running_time() - start)
    else:
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.A, on_button_pressed_a)
```

`global waiting` lets the function change the `waiting` made outside it. Blocks do this for you.

## Modify

```step
stage: modify
insight: "A true/false variable can remember any fact, such as whether a light is on, and flip it each time."
try: { playground: microbit, starter: "lesson.ts#lamp" }
tasks:
  - hint: ["In on button A pressed: if on, clear the screen and set on to false.", "else: show the lights and set on to true. Then delete the B event."]
    check: { type: code, text: "Make A alone switch the light on and off, using on.", rules: { contains: ["if(on", "on=true", "on=false"] } }
  - hint: "In on shake: if on, show a tick; else show a cross."
    check: { type: code, text: "Make a shake show a tick if the light is on, and a cross if it is off.", rules: { inside: { "input.onGesture(Gesture.Shake": ["if(on"] } } }
```

### One button

The variable `on` is made for you. Make **A** switch the light on when it is off, and off when it is on.

### Is it on?

Make a **shake** show whether the light is on.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "Each time is one running time minus the same start, until start is set again."
check:
  type: trace
  text: "A stores start; B shows running time − start. Fill in what B shows."
  table: |
    | press | running time | B shows |
    | A | 1000 | (start) |
    | B | 1600 | [600] |
    | B | 2500 | [1500] |
  explain: "B does not change start, so both times are measured from the A press at 1000: 600, then 1500."
```

A stopwatch from last lesson.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "At the start of B, set waiting to false. When the heart appears, set waiting to true."
  - "In A: if waiting, set it to false and show the time; else show a cross."
check: { type: code, text: "No cheating: only a press while the heart is showing counts; an early press shows a cross.", rules: { contains: ["waiting=true", "if(waiting", "waiting=false", "}else{"] } }
unlocks: [true-or-false]
```

Fix the cheat. `waiting` is made for you.

- At the start of **B**, set `waiting` to false.
- When the heart appears, set `waiting` to true.
- In **A**: *if* waiting, set it to false and show the time; *else* show a cross (too early).

## Change a class vote

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#vote" }
```

Each micro:bit can vote **yes** once with **A**; after that, it shows a cross. Make **B** vote **no**, also only once (one vote each, yes or no).

```teacher
summary: "Students use a variable that holds true or false to remember what is happening now, and fix a cheat in a reaction tester."
time: 40
timing: "Predict and Run 6 min · Investigate 12 min · Modify 8 min · Mix it up 3 min · Make 8 min · Class vote 3 min"
goals:
  - I can use a true/false variable to remember what is happening.
  - I can check a true/false variable with if.
  - I can say why it must be set back.
before: |
  A variable can hold **true** or **false** (Logic). It remembers one yes-or-no fact, such as *is the heart showing?* Each event either **sets** it (the heart appears: true) or **asks** about it with **if**. The usual bug is forgetting to set it back, so it keeps saying true and every later press counts. `if waiting` asks "is waiting true?"; there is no need to write = true.
running:
  - "Predict: an early press still gets a time. Let students find the cheat."
  - "Investigate: the trace follows waiting through five events. Raj's bug is this lesson's misconception."
  - "Modify: a light switch with one button: the same idea, a different fact."
  - "Mix it up: the stopwatch from last lesson, with two B presses."
  - "Make: this fixes the cheat; it is the core of the final challenge."
stuck:
  - see: "Every press shows a cross."
    ask: "Where is waiting set to true?"
    fix: "Set waiting to true after the heart appears."
  - see: "A second press still gives a time."
    ask: "Where is waiting set back to false?"
    fix: "Set waiting to false inside the if, straight after the press is counted."
  - see: "The if will not take waiting."
    ask: "Is waiting a variable from Variables?"
    fix: "Drag the waiting variable straight into the if's hexagon slot."
stretch: "Make the light switch remember how many times it was switched on, and show it on A+B."
support: "Give students the if … else in A already built, and ask them only to set waiting in the right places."
leads: "Next: the final challenge. Build the reaction timer from scratch, then race a friend over radio."
exit:
  q: "A program sets waiting to true when the heart appears, and never to false. What goes wrong?"
  a: "Every press after the heart counts, not only the first, because waiting stays true."
explain: |
  A variable can hold **true** or **false**. It remembers one fact about what is happening now.

  - Set it when things change: the heart appears, so waiting is true.
  - Ask about it with **if**: if waiting, count the press; else, too early.
  - Set it back, or it keeps saying true.
solutions:
  step-4#t1: lesson.ts#sol-lamp
  step-4#t2: lesson.ts#sol-check
  step-6: lesson.ts#sol-make
struggle: "Knowing where to set it and where to ask. Ask: when does this fact become true, and when does it stop being true?"
class:
  activities:
    - at: investigate
      title: Hold the flag
      minutes: 4
      do: |
        One student holds a flag up only while the heart is 'showing' (the teacher holds up a heart card). Others clap: a clap counts only if the flag is up, and the first counted clap lowers it.
      notes: "Forget to lower the flag and every clap counts: Raj's bug."
    - at: end
      title: Try to cheat
      minutes: 3
      do: |
        Swap with the next pair and try to cheat their reaction tester.
```

```code lesson.ts#predict
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

```code lesson.ts#lamp
let on = false
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
})
```

```code lesson.ts#sol-lamp
let on = false
input.onButtonPressed(Button.A, function () {
    if (on) {
        basic.clearScreen()
        on = false
    } else {
        basic.showIcon(IconNames.Square)
        on = true
    }
})
```

```code lesson.ts#sol-check
let on = false
input.onButtonPressed(Button.A, function () {
    if (on) {
        basic.clearScreen()
        on = false
    } else {
        basic.showIcon(IconNames.Square)
        on = true
    }
})
input.onGesture(Gesture.Shake, function () {
    if (on) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
```

```code lesson.ts#review
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(input.runningTime() - start)
})
```

```code lesson.ts#make
let waiting = false
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

```code lesson.ts#sol-make
let waiting = false
let start = 0
input.onButtonPressed(Button.B, function () {
    waiting = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
    waiting = true
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        basic.showNumber(input.runningTime() - start)
    } else {
        basic.showIcon(IconNames.No)
    }
})
```

```code lesson.ts#vote
let voted = false
input.onButtonPressed(Button.A, function () {
    if (voted) {
        basic.showIcon(IconNames.No)
    } else {
        voted = true
        basic.showString("YES")
    }
})
```
