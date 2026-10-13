---
order: 3
unit: show-react
moveId: react-to-event
reviews: [forever-loop]
recipes: [if]
title: Wait for a press
summary: Make the micro:bit wait for a button press or a shake, then react.
language: makecode
explainPicture: lesson.ts#events
hook: "A doorbell, a game controller, a TV remote: each one waits for a press, then does one job."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#events", lesson: "code/microbit/microbit-buttons", target: "microbit" }
  caption: "Some blocks wait for an event"
  say: "Some blocks wait. They run only when something happens: an event."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "on button A pressed runs every time A is pressed."
        say: "on button A pressed runs its blocks every time A is pressed."
    - caption:
        text: "on start runs once. forever runs again and again."
        say: "on start runs once, at the start. forever runs again and again."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Event blocks run each time that thing happens."
        say: "Event blocks, like on shake, run each time that thing happens."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
So far the micro:bit ran its blocks and carried on by itself. Most devices **wait** instead: nothing happens until you press something. A block that waits like this is called an **event** block. You find them in **Input**.

In the simulator, click the **A** and **B** buttons with the mouse. To shake, click **SHAKE** above the micro:bit.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "What does the micro:bit show when it starts, and then after you press B?"
  options: ["Asleep, then sad when B is pressed", "Happy, then sad, straight away when it starts", "Nothing until a button is pressed", "Asleep, then happy and sad together"]
  fault: logic
  misconception: event-runs-at-start
  actual: "It shows the asleep face at the start, then waits. Pressing B runs only the blocks inside 'on button B pressed', so the sad face shows."
```

There are three groups of blocks here. Which ones run straight away, and which ones wait?

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A and B in the simulator and compared what happened with my prediction." }
```

Press **A**, then **B**, then **A** again. Compare with your prediction.

## Investigate

```step
stage: investigate
code: lesson.ts#events
insight: "An event block runs its blocks every time its event happens, and only then. on start and forever are not events you trigger: they run by themselves."
tasks:
  - check:
      type: match
      q: "Match each block with when its blocks run."
      pairs:
        - ["on start", "once, when the micro:bit switches on"]
        - ["forever", "again and again, by itself"]
        - ["on button A pressed", "each time A is pressed"]
        - ["on shake", "each time the micro:bit is shaken"]
  - check:
      type: number
      q: "You press A four times. How many times does the happy face appear?"
      answer: 4
      explain: "The blocks inside 'on button A pressed' run once for every press."
  - check:
      type: question
      q: "Ben wants A to show a heart. He put this in on start. He presses A and nothing happens. Why?"
      options: ["A is broken in the simulator", "on start checks the button once, when the micro:bit switches on, before he presses it", "He needs a pause first", "Hearts only work in forever"]
      answer: 1
      fault: logic
      misconception: button-check-once
      explain: "on start runs once, at the very start. By the time Ben presses A, the check is long over. 'on button A pressed' waits for the press instead."
```

This program has four groups of blocks. Try it in your head first.

### When does it run?

Match each block with when its blocks run.

### Count the presses

Work out how often an event block runs.

### Ben's button

Ben's program used an **if** block from Logic. Read this for now: it asks a yes-or-no question, *is A pressed right now?*, and runs the blocks inside only if the answer is yes. You will use **if** properly in a later lesson.

```makecode
if (input.buttonIsPressed(Button.A)) {
    basic.showIcon(IconNames.Heart)
}
```

## Modify

```step
stage: modify
insight: "To change what an event does, change the blocks inside it. To react to something new, add a new event block."
try: { playground: microbit, starter: "lesson.ts#modify" }
tasks:
  - hint: "Click the picture in a show icon block to choose a different one."
    check: { type: reflect, text: "I changed both faces and pressed each button to check." }
  - hint: ["'on button A pressed' is in Input. Drag in another one.", "Click the A in the new block and choose A+B."]
    check: { type: code, text: "Add an event for pressing A and B together, and show a picture.", rules: { contains: ["input.onButtonPressed(Button.AB,function(){basic.show"] } }
```

### Change the faces

Choose different pictures for **A** and **B**.

### Press both

Add a third event block for **A+B** (both buttons at once). Make it show a picture of your choice.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "forever goes round its blocks in order, and each pause sets how long that picture stays."
check:
  type: question
  q: "This animation runs in forever. Which picture stays on the longest each time round?"
  options: ["The heart", "The small heart", "The tick", "They all stay the same time"]
  answer: 2
  explain: "Each pause holds the picture just before it. The tick is followed by pause 1000, the longest pause, so it stays longest."
```

Read the animation from the top, the way forever goes round it.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "You need four event blocks: A, B, A+B and shake. Each one has one picture inside."
  - "show arrow is in Basic (click more...). Choose the direction with the dropdown."
check: { type: code, text: "A signal board: A, B, A+B and shake each show their own picture.", rules: { contains: ["input.onButtonPressed(Button.A,", "input.onButtonPressed(Button.B,", "input.onButtonPressed(Button.AB,", "input.onGesture(Gesture.Shake,"] } }
unlocks: [on-button-pressed]
```

Build a **signal board** for a bike rider:

- **A** shows an arrow pointing left.
- **B** shows an arrow pointing right.
- **A+B** shows a cross for "stop".
- **Shake** shows a surprised face.

## Change a bike indicator

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#indicator" }
```

Real bike indicators flash. This one flashes each arrow twice. Make it flash three times, then make **A+B** flash a warning (both arrows, or a picture you draw).

```teacher
summary: "Students make programs that wait for a button press or a shake, and see that an event block runs its blocks every time its event happens, and only then."
time: 45
timing: "Predict and Run 10 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 10 min · Indicator 4 min"
goals:
  - I can make the micro:bit react when a button is pressed or it is shaken.
  - I can say when on start, forever and an event block each run.
  - I can add a new event block to react to something new.
before: |
  An **event** is something that happens: a button press, a shake. An **event block** (such as *on button A pressed*) holds blocks that run **every time** that event happens, and only then. Compare with the last two lessons: **on start** runs once, **forever** runs again and again by itself. In the simulator, students click the A and B buttons, and click **SHAKE** for a shake. Try the Make yourself: four event blocks, one picture in each.
running:
  - "Predict: ask which blocks run straight away and which wait. Many students expect the faces to show at the start."
  - "Run: press A, B, A. Say it plainly: nothing happens until a button is pressed, and each press runs its own blocks."
  - "Investigate: the match task names when each kind of block runs. Ben's button is the classic mistake: a check in on start happens once, before anyone presses."
  - "Modify: changing a face changes what an event does. Adding A+B is a new event block, not a change to an old one."
  - "Mix it up: a quick look back at forever and pause."
  - "Make: four event blocks. show arrow is under Basic › more."
stuck:
  - see: "Pressing a button does nothing."
    ask: "Which block is your picture inside?"
    fix: "Put it inside 'on button A pressed' (from Input), not in on start."
  - see: "A+B never fires: A or B fires instead."
    ask: "Did you press both at once?"
    fix: "In the simulator, click the A+B button below the micro:bit. On a real micro:bit, press both together."
  - see: "Two event blocks for the same button, and only one seems to work."
    ask: "How many 'on button A pressed' blocks are there?"
    fix: "Keep one block per event, and put everything for that press inside it."
stretch: "Make the signal board flash each arrow three times, and have shake show a short animation of three frames."
support: "Give students the four event blocks already placed and empty, and ask them only to fill in the pictures."
leads: "Next unit adds variables, so a button can count presses. Class ideas: a quiz buzzer where A and B are two teams. With real micro:bits: wear one on a bag strap as a bike signal."
exit:
  q: "Why does 'if button A is pressed' in on start not work, when 'on button A pressed' does?"
  a: "on start checks once, when the micro:bit switches on, before anyone presses. The event block waits and runs every time A is pressed."
explain: |
  Some blocks **wait**. *on button A pressed* runs its blocks **every time** A is pressed, and never before. That is an **event**.

  So a micro:bit program has three kinds of block holder:

  - **on start**: runs once, at the start
  - **forever**: runs again and again, by itself
  - **on button pressed**, **on shake**: runs each time that thing happens
solutions:
  step-4#t2: lesson.ts#sol-both
  step-6: lesson.ts#sol-make
struggle: "An event block runs only when its event happens. When a press does nothing, ask which block the picture is inside."
class:
  activities:
    - at: investigate
      title: Human micro:bit
      minutes: 4
      do: |
        One student is the micro:bit with a face card for each event. The class calls out "A", "B" or "shake"; the micro:bit shows only the card for that event.
      notes: "When nobody calls anything, nothing happens. That is what waiting means."
```

```code lesson.ts#predict
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
```

```code lesson.ts#events
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Surprised)
})
basic.forever(function () {
    basic.showIcon(IconNames.Asleep)
    basic.pause(5000)
})
```

```code lesson.ts#modify
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
```

```code lesson.ts#sol-both
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Heart)
})
```

```code lesson.ts#review
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(200)
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
})
```

```code lesson.ts#make
basic.showIcon(IconNames.Square)
```

```code lesson.ts#sol-make
basic.showIcon(IconNames.Square)
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.West)
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.East)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.No)
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Surprised)
})
```

```code lesson.ts#indicator
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.West)
    basic.clearScreen()
    basic.showArrow(ArrowNames.West)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.East)
    basic.clearScreen()
    basic.showArrow(ArrowNames.East)
    basic.clearScreen()
})
```
