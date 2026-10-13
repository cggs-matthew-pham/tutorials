---
order: 7
unit: decide
moveId: if-else
reviews: [if-true, count-in-a-variable]
introduces: [else]
assumes: [if, variable, variable-update]
title: If and else
summary: Use one if … else block to choose between two things, so exactly one of them happens.
language: makecode
explainPicture: lesson.ts#predict
hook: "A bike light is on in the dark and off in daylight. Never both, never neither: one question decides which."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit/microbit-else", target: "microbit" }
  caption: "if … else chooses between two things"
  say: "If else chooses between two things."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "True: the first part runs."
        say: "If the question is true, the first part runs."
    - caption:
        text: "False: the else part runs instead."
        say: "If it's false, the else part runs instead."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Exactly one part runs each time round. Never both."
        say: "Exactly one part runs each time round. Never both, and never neither."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the night light needed two **if** blocks: one to turn the lights on, one to turn them off. An **if … else** block does both: *if* the question is true, run the first part; *else* (otherwise), run the second. Click the **+** at the bottom of an if block to add **else**.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The light level is 20 (dark). Which parts of the if … else run, each time round forever?"
  options: ["Only the first part: the lights come on", "The first part, then the else part: on, then cleared", "Only the else part", "Neither part"]
  fault: logic
  misconception: else-runs-too
  actual: "Only the first part. 20 is less than 50, so the question is true and the lights come on. The else part runs only when the question is false."
```

This is last lesson's night light, built with one **if … else**.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I dragged the light down and back up, and compared what happened with my prediction." }
```

Drag the light slider down to dark, then back up to bright. Do the lights go off now?

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "else runs exactly when the question is false, so one if … else covers both cases with no gap and no overlap."
tasks:
  - check:
      type: trace
      text: "For each light level, what does the night light do?"
      table: |
        | light level | does |
        | 20 | [lights on] |
        | 200 | [clears the screen] |
        | 50 | [clears the screen] |
        | 49 | [lights on] |
      explain: "Below 50 the question is true, so the first part runs. 50 and above, it is false, so the else part runs. 50 is not less than 50."
  - check:
      type: question
      q: "Kim thinks that in the dark her night light turns the lights on and then the else part clears them straight away, so it flickers. Is she right?"
      options: ["No: each time round, only one part runs", "Yes: the else part always runs after the if part", "Yes, but only on a real micro:bit", "No: the else part never runs"]
      answer: 0
      fault: logic
      misconception: else-runs-too
      explain: "if … else runs exactly one of its two parts. In the dark the question is true, so only the first part runs, every time round."
  - check:
      type: question
      q: "When does the else part run?"
      options: ["Always, after the first part", "Only when the question is false", "Only when the question is true", "Never: it is for notes"]
      answer: 1
      explain: "else means otherwise: it runs when the question is false, and only then."
```

### Trace the light

Work out what happens at each light level. Watch the edge at 50.

### Kim's flicker

### When does else run?

## Modify

```step
stage: modify
insight: "else replaces the opposite question: one if … else does the job of two ifs."
try: { playground: microbit, starter: "lesson.ts#twoifs" }
tasks:
  - hint: ["Click the + on the first if to add else.", "Move clear screen into the else part, then delete the second if."]
    check: { type: code, text: "Rebuild the two-if night light with one if … else.", rules: { contains: ["}else{basic.clearScreen()"] } }
  - hint: "Swap clear screen in the else part for show icon, and choose the small square."
    check: { type: code, text: "In the else part, show a small dot or square instead of clearing the screen.", rules: { contains: ["}else{basic.show"] } }
```

### One if, not two

This is the two-if night light. Rebuild it with one **if … else**.

### A dim glow

Make the else part show a small dot or square, so the light glows a little in the day.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "An if with no else does nothing when its question is false."
check:
  type: question
  q: "Each press of A adds 1 to count, shows it, and shows a diamond (the prize) if count is 5. What shows straight after the 6th press?"
  options: ["6", "The diamond", "5", "Nothing"]
  answer: 0
  explain: "After the 6th press count is 6, which is shown. 6 is not 5, so the if does nothing: no diamond."
```

A counter with a prize, from earlier lessons.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "One if … else inside forever. The question is about the light level."
  - "If it is dark (light level < 50), light all the LEDs. Else, show a small square."
check: { type: code, text: "A bike light: all the LEDs on when it is dark, else a small square.", rules: { contains: ["input.lightLevel()<", "}else{"] } }
unlocks: [if-else]
```

Make a **bike light** with one **if … else**:

- When it is **dark** (light level below 50): light all the LEDs.
- **Else**: show a small square, to save the battery.

## Change a desk lamp

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#lamp" }
```

This desk lamp lights up when the room is dim. Make it switch at 120 instead, and show a moon you draw when it is on.

```teacher
summary: "Students use if … else to choose between two things, and see that exactly one part runs each time: the else runs only when the question is false."
time: 40
timing: "Predict and Run 8 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Desk lamp 3 min"
goals:
  - I can use if … else to choose between two things.
  - I can say when the else part runs.
  - I can turn two ifs into one if … else.
before: |
  Click the **+** at the bottom of an if block to add **else** (otherwise). If the question is true, the first part runs; if false, the else part runs. Exactly one of the two runs each time, so if … else has no gap (like two ifs that miss a value) and no overlap. **else if** (more questions in a row) is the next lesson.
running:
  - "Predict: some students think both parts run, one after the other. Ask: what does 'otherwise' mean?"
  - "Run: dark then bright. The lights go off now, because the else part clears them."
  - "Investigate: the trace pins down the edge: 50 is not less than 50. Kim's flicker is the belief that else always runs too."
  - "Modify: rebuilding the night light shows what else replaces: the opposite question."
  - "Mix it up: an if with no else, from last lesson, inside a counter."
  - "Make: one if … else, one question."
stuck:
  - see: "There is no else in the if block."
    ask: "Where is the + on the if block?"
    fix: "Click the + at the bottom of the if. It adds an else part."
  - see: "The lights stay on in the day."
    ask: "Which part clears the screen, and when does it run?"
    fix: "Put clear screen (or the small square) in the else part."
  - see: "Two ifs and an else, and the picture flickers."
    ask: "How many questions do you need for two choices?"
    fix: "One question and an else. Delete the second if."
stretch: "Make the bike light flash in the dark (show, pause, clear, pause) and glow steadily in the day."
support: "Give students the if … else already in forever with the question filled in, and ask them only to fill each part."
leads: "Next lesson: else if, for three or more choices, where the order of the questions matters."
exit:
  q: "In an if … else, when does the else part run?"
  a: "Only when the question is false. Exactly one of the two parts runs each time."
explain: |
  An **if … else** asks one question.

  - **True**: the first part runs.
  - **False**: the **else** part runs.

  Exactly one part runs each time. Never both, never neither. So one if … else does the job of two ifs with opposite questions.
solutions:
  step-4#t1: lesson.ts#sol-twoifs
  step-4#t2: lesson.ts#sol-glow
  step-6: lesson.ts#sol-make
struggle: "Believing both parts run. Ask them to say the block aloud with 'otherwise' in place of else."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner which parts run in the dark. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask the 'both' group to read the block aloud with 'otherwise' in place of else."
    - at: investigate
      title: Two doors
      minutes: 3
      do: |
        Two signs on two doors: 'true' and 'else'. The teacher reads a question about each student in turn; they walk through exactly one door.
      notes: "Nobody can go through both doors, and nobody stays behind."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your bike light to the next pair. Drag the light slider through 50.
```

```code lesson.ts#predict
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.clearScreen()
    }
})
```

```code lesson.ts#twoifs
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 50) {
        basic.clearScreen()
    }
})
```

```code lesson.ts#sol-twoifs
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.clearScreen()
    }
})
```

```code lesson.ts#sol-glow
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#review
let count = 0
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
    if (count == 5) {
        basic.showIcon(IconNames.Diamond)
    }
})
```

```code lesson.ts#make
basic.forever(function () {

})
```

```code lesson.ts#sol-make
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#lamp
basic.forever(function () {
    if (input.lightLevel() < 80) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.clearScreen()
    }
})
```
