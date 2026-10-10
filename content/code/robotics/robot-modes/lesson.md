---
order: 6
unit: modes
title: One robot, many jobs
summary: A mode variable remembers which job the robot is doing; buttons change it, and forever does that job.
language: makecode
introduces: [text-compare]
extensions: [robot]
explainPicture: modes.ts#predict
hook: "A robot lawn mower has modes: mow, go home, pause. You press one button and it keeps doing that job until you choose another."
---
So far each program did one job. Real robots switch between jobs. The trick is a **variable** called **mode** that remembers which job is chosen. It holds a word, such as `"follow"`, and `mode = "follow"` (the compare block in **Logic**, with a text in it) asks whether it is that word. Text must match exactly, so `"Follow"` would not match. The buttons only **change** the mode; **forever** looks at the mode every time round and does that job.

**followLine** is lesson 5's line follower, now in a function so forever stays easy to read.

## Predict

```step
stage: predict
code: modes.ts#predict
check:
  type: predict
  q: "The robot is on the line. You press B, wait, then press A+B. What happens?"
  options: ["It follows the line, then stops when you press A+B", "It follows the line only while you hold B", "It moves a little when you press B, then stops by itself", "Nothing: buttons cannot change what forever does"]
  actual: "It follows the line until you press A+B. B sets mode to follow, and forever keeps following while mode stays follow. A+B sets mode to stop."
```

## Run

```step
stage: run
code: modes.ts#predict
try: { playground: microbit, starter: "modes.ts#predict" }
check: { type: reflect, text: "I pressed B, A and A+B, and watched the robot change jobs." }
```

Drag the robot onto the line. Press **B** (follow), **A** (go straight) and **A+B** (stop) on the simulator's micro:bit, in any order.

## Investigate

```step
stage: investigate
code: modes.ts#predict
insight: "A button only changes the mode. forever reads the mode every time round and does that job, so the robot keeps doing it until the mode changes."
tasks:
  - check:
      type: question
      q: "You pressed B a while ago and let go. Why does the robot keep following the line?"
      options: ["The button is still pressed inside the micro:bit", "mode still says follow, and forever checks it again every time round", "followLine runs forever by itself", "The robot remembers the line"]
      answer: 1
      explain: "Pressing B ran one block: set mode to follow. The variable keeps that value, so every time forever checks, it finds follow and calls followLine."
  - check:
      type: question
      q: "Ruby's robot never moves, even when she presses A. Which part is wrong?"
      options: ["Her A button sets the wrong mode", "forever sets mode to stop every time round, wiping out the A press straight away", "She needs else if", "robot motor tank needs a time"]
      answer: 1
      fault: logic
      misconception: reset-in-loop
      explain: "Setting mode to stop belongs in on start, once. Inside forever, it runs again every time round, so mode is stop again before the robot can move."
```

### Still following

Think about what the button did, and what forever does next.

### Ruby's robot

Ruby's program:

```makecode
input.onButtonPressed(Button.A, function () {
    mode = "go"
})
let mode = ""
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    mode = "stop"
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else {
        robot.motorStop()
    }
})
```

## Modify

```step
stage: modify
insight: "Adding a job means a new mode name, something that sets it, and a branch in forever that does it."
try: { playground: microbit, starter: "modes.ts#modify" }
tasks:
  - hint: ["In each button event, under set mode, add a picture.", "show arrow north for go, show icon diamond for follow, show icon square for stop."]
    check: { type: code, text: "Show a different picture for each mode when its button is pressed.", rules: { inside: { "input.onButtonPressed(Button.A": ["basic.show"], "input.onButtonPressed(Button.B": ["basic.show"], "input.onButtonPressed(Button.AB": ["basic.show"] } } }
  - hint: ["on logo pressed is in Input. Inside it: set mode to explore.", "In forever, click + on the if to add an else if: mode = explore. Inside it, put lesson 4's turn-away if … else."]
    check: { type: code, text: "Add an explore mode, chosen with the logo, that turns away from boxes.", rules: { inside: { "input.onLogoEvent(": ["mode=\"explore\""] }, contains: ["mode==\"explore\""] } }
```

### Which mode?

A person needs to know which job the robot is doing. Show a **different picture** on the micro:bit for each mode, when its button is pressed.

### Explore mode

Add a fourth job: **explore**, chosen by touching the **logo**. In explore mode the robot drives and turns away from boxes, like lesson 4.

## Make

```step
stage: make
try: { playground: microbit, starter: "modes.ts#make" }
hint:
  - "on shake (Input) sets mode to guard. In forever, add an else if for guard."
  - "Inside guard: robot motor stop, then an if: distance < 20 → red lights and a tone (robot play tone); else lights off (black)."
check: { type: code, text: "A guard mode, chosen by shaking: the robot stays still, and flashes red and beeps when something comes close.", rules: { contains: ["mode==\"guard\""], inside: { "basic.forever": ["robot.obstacleDistance()", "robot.setColor("] } } }
```

Add a **guard** mode, like a security robot watching a doorway:

- shake the micro:bit to choose guard
- in guard mode the robot stays **still**
- when something comes closer than **20 cm**, it shows **red** lights and **beeps**; otherwise its lights are off

Drag a box towards the robot to test it.

## On a real robot

```step
stage: info
```

The same program runs on a real robot. Things to notice:

- A real robot moves as soon as you press a button, so put it on the floor first, or press A+B before you pick it up.
- Pressing A and B together needs both at once; real buttons make it easy to press one a moment early. That is a reason real robots often use one button to **cycle** through modes instead.
