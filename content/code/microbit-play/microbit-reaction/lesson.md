---
order: 7
unit: challenge
reviews: [time-between, remember-state, if-else, count-in-a-variable, pick-from-list]
assumes: [variable, variable-update, if, else, random, running-time, bool-value]
title: Reaction timer
summary: Build a reaction game from scratch, using everything so far. Wait for the heart, press A as fast as you can, and beat your best.
language: makecode
explainPicture: lesson.ts#sol-m3
hook: "Sprinters, racing drivers and goalkeepers train their reactions with timers like this. You already know every idea it needs."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sol-m3", lesson: "code/microbit-play/microbit-reaction", target: "microbit" }
  caption: "A reaction game is a few ideas working together"
  say: "A reaction game is a few ideas you know, working together."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A random wait, then the heart, and start stores the time."
        say: "A random wait, then the heart, and start stores the time."
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
Press **B** to start. After a random wait, a heart appears: press **A** as fast as you can, and the micro:bit shows how many milliseconds you took. You have met every part of this game. Now you build it from almost nothing, in three milestones, with less help each time.

## Predict

```step
stage: predict
code: lesson.ts#wait
check:
  type: predict
  q: "You press B three times, waiting for the heart each time. Does the heart take the same time to appear each time?"
  options: ["The same time every time", "A different time each time, between 1 and 4 seconds", "It appears straight away", "It never appears"]
  actual: "A different time each time. pick random chooses a new wait from 1000 to 4000 ms on every press."
```

## Run

```step
stage: run
code: lesson.ts#wait
try: { playground: microbit, starter: "lesson.ts#wait" }
check: { type: reflect, text: "I pressed B several times and could not guess when the heart would come." }
```

Press **B** a few times. Can you guess when the heart will appear?

## Investigate

```step
stage: investigate
code: lesson.ts#sol-m3
insight: "Each job of the game has its own home: the random wait and start in B, the timing and the early-press check in A, the best time in a variable."
tasks:
  - check:
      type: match
      q: "This is the finished game. Match each job with the blocks that do it."
      pairs:
        - ["wait an unguessable time", "pause pick random 1000 to 4000"]
        - ["measure the reaction", "running time − start"]
        - ["catch an early press", "if waiting … else"]
        - ["keep the fastest time", "if reaction < best, set best to reaction"]
  - check:
      type: trace
      text: "start is set when the heart appears. Fill in the number shown when A is pressed."
      table: |
        | start (heart appears) | running time when A is pressed | number shown |
        | 5200 | 5450 | [250] |
        | 8000 | 8320 | [320] |
      explain: "The number shown is running time minus start: how many milliseconds passed between the heart and the press."
  - check:
      type: question
      q: "best starts at 99999. Your first reaction is 400. What is best after it?"
      options: ["400", "99999", "0", "99599"]
      answer: 0
      explain: "400 is less than 99999, so best becomes 400. Starting best very high means any first time beats it."
```

Read the finished game before you build your own.

### Jobs and blocks

### Trace the times

### The best time

## Milestone 1: time the press

```step
stage: modify
insight: "Timing is two readings of running time: one stored when the heart appears, one taken at the press."
try: { playground: microbit, starter: "lesson.ts#m1" }
hint:
  - "In B: pause pick random 1000 to 4000, show the heart, then set start to running time."
  - "In A: show number running time − start."
check: { type: code, text: "B waits a random time and shows the heart; A shows the reaction time.", rules: { contains: ["randint(", "start=input.runningTime()"], inside: { "input.onButtonPressed(Button.A": ["input.runningTime()-start"] } } }
```

The variable `start` is made for you, and **B** clears the screen. Build the rest:

1. **B**: wait a random time, show the heart, and store the time in `start`.
2. **A**: show how long it took.

## Milestone 2: no cheating

```step
stage: modify
insight: "A true/false variable remembers whether the heart is showing, so each event can check it."
try: { playground: microbit, starter: "lesson.ts#m2" }
check: { type: code, text: "Only count a press while the heart is showing; an early press shows a cross.", rules: { contains: ["waiting=true", "if(waiting", "waiting=false", "}else{"] } }
```

Make an early press show a cross, using the variable `waiting`. Set it, ask about it, and set it back.

## Milestone 3: beat your best

```step
stage: make
insight: "Combining a variable, a comparison and an event into a rule shows whether a student can put the course's ideas together."
try: { playground: microbit, starter: "lesson.ts#m3" }
check: { type: code, text: "Keep your best time, celebrate a new best, and show it on A+B.", rules: { contains: ["<best", "best=reaction"], inside: { "input.onButtonPressed(Button.AB": ["best"] } } }
```

Keep a **best time**:

- A new variable `best` remembers your fastest time.
- When you beat it, the micro:bit celebrates.
- **A+B** shows your best.

## Why random?

```step
stage: modify
code: lesson.ts#fixed
try: { playground: microbit, starter: "lesson.ts#fixed" }
check:
  type: question
  q: "In this version the wait is always 2 seconds. Why does that spoil the game?"
  options: ["2 seconds is too long", "Players learn the timing and press without reacting to the heart", "The heart is smaller", "Running time stops working"]
  answer: 1
  explain: "A fixed wait can be counted. A random wait can only be reacted to, so it measures reactions."
```

Play this version a few times. What do you notice?

```teacher
summary: "Students build a reaction game from an almost empty starter in three milestones, using a random wait, running time, a true/false variable, decisions and a best score."
time: 55
timing: "Predict, Run, Investigate 12 min · Milestone 1 12 min · Milestone 2 12 min · Milestone 3 14 min · Why random 5 min"
goals:
  - I can build a timing game from blocks I know.
  - I can use a true/false variable to stop early presses.
  - I can keep a best score with an if.
before: |
  This challenge adds nothing new: every part was taught earlier in the course. Time between gave the timing (store running time in `start`, then *running time − start*); True or false gave `waiting`, the flag that catches early presses. The milestones fade the help: Milestone 1 lists the steps, Milestone 2 gives only the goal, Milestone 3 only goals. Play it yourself first; good times are 200 to 400 ms, and the simulator adds a little delay.
running:
  - "Predict and Run: the random wait is what makes it a reaction game. Let students try to guess and fail."
  - "Investigate: matching jobs to blocks is the plan for the milestones."
  - "Milestone 1: if times look huge, start was never set."
  - "Milestone 2: waiting is true only while the heart shows. Read the A event aloud: 'if we are waiting for a press, time it; else, too early'."
  - "Milestone 3: starting best at 99999 means any first time beats it."
  - "Why random: a fixed wait can be counted, so it stops measuring reactions."
stuck:
  - see: "The time shown is huge, like 15000."
    ask: "When is start set?"
    fix: "Set start to running time straight after the heart is shown."
  - see: "Every press shows a cross."
    ask: "Where is waiting set to true?"
    fix: "Set waiting to true after the heart appears (after start is set)."
  - see: "The best time never changes, or is always the latest time."
    ask: "What is best at the start, and which way round is your comparison?"
    fix: "Start best at 99999, and use if reaction < best."
stretch: "Show a rating after each time: under 250 a happy face, under 400 a meh face, otherwise a sad face (if, else if, else)."
support: "Give students last lesson's no-cheating program as their Milestone 1 starter, and focus on Milestone 3."
leads: "Next: Radio duel, the same game for two players over radio. Class ideas: a class reaction leaderboard on the board; does reaction time change after exercise? (a quick science investigation with real micro:bits)."
exit:
  q: "Why does the game need waiting? What would happen without it?"
  a: "Without it, pressing A before the heart still shows a number, so players could cheat by pressing early."
explain: |
  **running time** is how many milliseconds since the micro:bit switched on. Store it when the heart appears (`start`), then at the press, *running time − start* is your reaction time.

  `waiting` is a **true/false** variable: true only while the heart is showing, so an early press can be caught.

  `best` keeps your fastest time: *if reaction < best, set best to reaction*.
solutions:
  step-4: lesson.ts#sol-m1
  step-5: lesson.ts#sol-m2
  step-6: lesson.ts#sol-m3
struggle: "Putting the parts in the right events. Ask which event each job belongs in: B or A."
class:
  activities:
    - at: predict
      kind: discussion
      title: Can you guess it?
      minutes: 2
      do: |
        One student presses B on the projector; the class claps when they think the heart will come.
      notes: "Nobody can time it. That is the point of the random wait."
    - at: investigate
      title: Plan the game
      minutes: 4
      do: |
        On the board, list the game's jobs. Next to each, write the event that does it: B or A.
      notes: "This list is the plan for Milestones 1 and 2."
    - at: end
      title: Leaderboard
      minutes: 4
      do: |
        Write your best time on the board. Who is fastest in the class?
```

```code lesson.ts#wait
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
})
```

```code lesson.ts#m1
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {

})
```

```code lesson.ts#sol-m1
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

```code lesson.ts#m2
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

```code lesson.ts#sol-m2
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

```code lesson.ts#m3
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

```code lesson.ts#sol-m3
let reaction = 0
let waiting = false
let start = 0
let best = 99999
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
        reaction = input.runningTime() - start
        basic.showNumber(reaction)
        if (reaction < best) {
            best = reaction
            basic.showIcon(IconNames.Happy)
        }
    } else {
        basic.showIcon(IconNames.No)
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("Best")
    basic.showNumber(best)
})
```

```code lesson.ts#fixed
let waiting = false
let start = 0
input.onButtonPressed(Button.B, function () {
    waiting = false
    basic.clearScreen()
    basic.pause(2000)
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
