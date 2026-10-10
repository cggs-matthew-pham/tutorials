---
order: 11
unit: challenge
title: Reaction timer
summary: Build a reaction game that uses everything so far. Wait for the heart, press A as fast as you can, and beat your best.
language: makecode
introduces: [running-time, bool-value]
explainPicture: reaction.ts#timing
hook: "Sprinters, racing drivers and goalkeepers train their reactions with timers like this. You already know every idea it needs."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@reaction.ts#timing", lesson: "code/microbit/microbit-reaction", target: "microbit" }
  caption: "running time counts milliseconds since switch-on"
  say: "Running time counts the milliseconds since the micro:bit switched on."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Store it as start when the heart appears."
        say: "Store it as start, at the moment the heart appears."
    - caption:
        text: "At the press: reaction = running time − start."
        say: "At the press, running time minus start is your reaction time."
    - click: "Run"
    - wait: 600
    - caption:
        text: "waiting catches early presses. best keeps your fastest time."
        say: "waiting catches early presses, and best keeps your fastest time."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Press **B** to start. After a random wait, a heart appears: press **A** as fast as you can, and the micro:bit shows how many milliseconds you took. You will build it in three milestones, with less help each time.

**Behind the code:** **running time** (in **Input › more**) gives the number of milliseconds since the micro:bit switched on (1000 ms is one second). Taking one running time from a later one gives how long passed in between.

## Predict

```step
stage: predict
code: reaction.ts#wait
check:
  type: predict
  q: "You press B three times, waiting for the heart each time. Does the heart take the same time to appear each time?"
  options: ["The same time every time", "A different time each time, between 1 and 4 seconds", "It appears straight away", "It never appears"]
  actual: "A different time each time. pick random chooses a new wait from 1000 to 4000 ms on every press."
```

## Run

```step
stage: run
code: reaction.ts#wait
try: { playground: microbit, starter: "reaction.ts#wait" }
check: { type: reflect, text: "I pressed B several times and could not guess when the heart would come." }
```

Press **B** a few times. Can you guess when the heart will appear?

## Investigate

```step
stage: investigate
code: reaction.ts#timing
insight: "A time is a variable set at one moment and compared with running time later. Without a record of whether the heart is showing, early presses get counted too."
tasks:
  - check:
      type: trace
      text: "start is set when the heart appears. Fill in the number shown when A is pressed."
      table: |
        | start (heart appears) | running time when A is pressed | number shown |
        | 5200 | 5450 | [250] |
        | 8000 | 8320 | [320] |
        | 12000 | 12180 | [180] |
      explain: "The number shown is running time minus start: how many milliseconds passed between the heart and the press."
  - check:
      type: question
      q: "You press A before the heart appears. What happens in this version?"
      options: ["Nothing", "It still shows a number, as if you reacted", "It shows a cross", "The heart appears straight away"]
      answer: 1
      explain: "A always shows running time minus start, so an early press still gets a number. A cheat! Milestone 2 fixes it."
  - check:
      type: match
      q: "The same program in Python. Match each line with what it does."
      pairs:
        - ["basic.pause(randint(1000, 4000))", "waits a random time, from 1 to 4 seconds"]
        - ["start = input.running_time()", "stores the time the heart appeared"]
        - ["basic.show_number(input.running_time() - start)", "shows how long since the heart appeared"]
```

This version already times you. Read it carefully.

### Trace the times

Work out what A shows.

### Too early

What if a player presses A before the heart?

### In Python

```python
start = 0

def on_button_pressed_b():
    global start
    basic.clear_screen()
    basic.pause(randint(1000, 4000))
    basic.show_icon(IconNames.HEART)
    start = input.running_time()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_a():
    basic.show_number(input.running_time() - start)
input.on_button_pressed(Button.A, on_button_pressed_a)
```

`global start` lets the function change the `start` made outside it. Blocks do this for you.

## Milestone 1: time the press

```step
stage: modify
insight: "Timing is two readings of running time: one stored at the start, one taken at the press."
try: { playground: microbit, starter: "reaction.ts#m1" }
hint:
  - "Straight after the heart: set start to running time."
  - "In on button A pressed: show number (running time − start). The − block is in Math."
check: { type: code, text: "Store the time when the heart appears, and show the reaction time when A is pressed.", rules: { contains: ["start=input.runningTime()"], inside: { "input.onButtonPressed(Button.A": ["input.runningTime()-start"] } } }
```

The variable `start` is made but never set, and **A** does nothing yet.

1. When the heart appears, set `start` to **running time**.
2. When **A** is pressed, show **running time − start**.

## Milestone 2: no cheating

```step
stage: modify
insight: "A true/false variable remembers what is happening now, so each event can check it."
try: { playground: microbit, starter: "reaction.ts#m2" }
hint:
  - "Set waiting to true just after start is set, and to false at the start of B."
  - "In A: if waiting, set waiting to false and show the time; else show a cross."
check: { type: code, text: "Only count a press while the heart is showing; an early press shows a cross.", rules: { contains: ["waiting=true", "if(waiting", "waiting=false", "}else{"] } }
```

**Behind the code:** a variable can hold **true** or **false** (in **Logic**). `waiting` is true only while the heart is showing.

- At the start of **B**, set `waiting` to false.
- When the heart appears, set `waiting` to true.
- In **A**: *if* waiting, set it to false and show the time; *else* show a cross (too early).

## Milestone 3: beat your best

```step
stage: make
insight: "Combining a variable, a comparison and an event into a rule shows whether a student can put the course's ideas together."
try: { playground: microbit, starter: "reaction.ts#m3" }
hint:
  - "Keep the time in a variable called reaction before showing it. Start best at 99999, so any first time beats it."
  - "If reaction < best: set best to reaction, and show a happy face. A+B shows best."
check: { type: code, text: "Keep your best time, celebrate a new best, and show it on A+B.", rules: { contains: ["<best", "best=reaction"], inside: { "input.onButtonPressed(Button.AB": ["best"] } } }
```

Keep a **best time**:

- A new variable `best` remembers your fastest time.
- When you beat it, the micro:bit celebrates.
- **A+B** shows your best.

## Why random?

```step
stage: modify
code: reaction.ts#fixed
try: { playground: microbit, starter: "reaction.ts#fixed" }
check:
  type: question
  q: "In this version the wait is always 2 seconds. Why does that spoil the game?"
  options: ["2 seconds is too long", "Players learn the timing and press without reacting to the heart", "The heart is smaller", "Running time stops working"]
  answer: 1
  explain: "A fixed wait can be counted. A random wait can only be reacted to, so it measures reactions."
```

Play this version a few times. Then try to beat your times by counting instead of watching.
