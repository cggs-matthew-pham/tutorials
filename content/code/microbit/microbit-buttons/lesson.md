---
order: 2
unit: show-react
title: Buttons and gestures
summary: Make the micro:bit wait for a button press or a shake, then react.
language: makecode
explainPicture: buttons.ts#events
hook: "A doorbell, a game controller, a TV remote: each one waits for a press, then does one job."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@buttons.ts#events", lesson: "code/microbit/microbit-buttons", target: "microbit" }
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
Last lesson the micro:bit ran its blocks and carried on by itself. Most devices **wait** instead: nothing happens until you press something. A block that waits like this is called an **event** block.

In the simulator, click the **A** and **B** buttons with the mouse. To shake, click **SHAKE** above the micro:bit.

## Predict

```step
stage: predict
code: buttons.ts#predict
check:
  type: predict
  q: "What does the micro:bit show when it starts, and then after you press B?"
  options: ["Asleep, then sad when B is pressed", "Happy, then sad, then asleep straight away", "Nothing until a button is pressed", "Asleep, then happy and sad together"]
  actual: "It shows the asleep face at the start, then waits. Pressing B runs only the blocks inside 'on button B pressed', so the sad face shows."
```

There are three groups of blocks here. Which ones run straight away, and which ones wait?

## Run

```step
stage: run
code: buttons.ts#predict
try: { playground: microbit, starter: "buttons.ts#predict" }
check: { type: reflect, text: "I pressed A and B in the simulator and compared what happened with my prediction." }
```

Press **A**, then **B**, then **A** again. Compare with your prediction.

## Investigate

```step
stage: investigate
code: buttons.ts#events
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

Ben's program used an **if** block from Logic:

```makecode
if (input.buttonIsPressed(Button.A)) {
    basic.showIcon(IconNames.Heart)
}
```

## Modify

```step
stage: modify
insight: "To change what an event does, change the blocks inside it. To react to something new, add a new event block."
try: { playground: microbit, starter: "buttons.ts#modify" }
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

## Make

```step
stage: make
try: { playground: microbit, starter: "buttons.ts#make" }
hint:
  - "You need four event blocks: A, B, A+B and shake. Each one has one picture inside."
  - "show arrow is in Basic (click more...). Choose the direction with the dropdown."
check: { type: code, text: "A signal board: A, B, A+B and shake each show their own picture.", rules: { contains: ["input.onButtonPressed(Button.A,", "input.onButtonPressed(Button.B,", "input.onButtonPressed(Button.AB,", "input.onGesture(Gesture.Shake,"] } }
```

Build a **signal board** for a bike rider:

- **A** shows an arrow pointing left.
- **B** shows an arrow pointing right.
- **A+B** shows a cross for "stop".
- **Shake** shows a surprised face.

## Change a bike indicator

```step
stage: modify
try: { playground: microbit, starter: "buttons.ts#indicator" }
```

Real bike indicators flash. This one flashes each arrow twice. Make it flash three times, then make **A+B** flash a warning (both arrows, or a picture you draw).
