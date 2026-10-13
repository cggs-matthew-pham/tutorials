---
order: 8
unit: decide
moveId: first-true-wins
reviews: [if-else, read-a-sensor]
assumes: [if, else]
title: The first true question wins
summary: Add else if to ask more questions in a row, and see that the first true one wins, so their order sets the ranges.
language: makecode
explainPicture: lesson.ts#predict
hook: "A spirit level shows whether a shelf is flat, tilted left or tilted right. One reading, three possible answers, and exactly one of them shows."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit/microbit-ranges", target: "microbit" }
  caption: "else if adds more questions, asked from the top"
  say: "else if adds more questions. The micro:bit asks them from the top."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "The first true question runs its part. The rest are skipped."
        say: "The first true question runs its part, and the rest are skipped."
    - click: "Run"
    - wait: 600
    - caption:
        text: "else runs only when every question above it is false."
        say: "else runs only when every question above it is false."
    - caption:
        text: "So the order of the questions decides the ranges."
        say: "So the order of the questions decides the ranges."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
**if … else** chooses between two things. For three or more, click the **+** on an if block again: it adds **else if**, another question. The micro:bit asks the questions **from the top**.

Tilting left makes **acceleration x** go below 0; tilting right makes it go above 0. A small tilt gives a small number.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You tilt the micro:bit a little to the left, just enough that acceleration x is -100. What shows?"
  options: ["An arrow pointing left", "An arrow pointing right", "The small square", "Nothing"]
  fault: logic
  misconception: else-if-order
  actual: "The small square. -100 is not less than -300 and not more than 300, so neither question is true and the else part runs."
```

Read the questions from the top, with -100 in mind.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I tilted the micro:bit a little and a lot, both ways, and compared what showed with my prediction." }
```

Move the mouse over the micro:bit to tilt it. Try a small tilt and a big tilt, left and right.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "The questions are asked from the top. The first true one runs and the rest are skipped; else runs only when none are true. So the order of the questions decides the ranges."
tasks:
  - check:
      type: trace
      text: "For each value of acceleration x, what shows?"
      table: |
        | acceleration x | shows |
        | -500 | [left arrow] |
        | 0 | [small square] |
        | 400 | [right arrow] |
        | 300 | [small square] |
      explain: "-500 is less than -300, so the first part runs. 0 and 300 fit neither question (300 is not more than 300), so else runs. 400 is more than 300."
  - check:
      type: question
      q: "Leo wants a small tilt right to show a diamond and a big tilt right to show an arrow. The arrow never appears. Why?"
      options: ["500 is too big to reach", "A big tilt is also more than 0, so the first question is true and the rest are skipped", "else if only works with <", "The arrow block is broken"]
      answer: 1
      fault: logic
      misconception: else-if-order
      explain: "The questions are asked from the top, and the first true one wins. Any tilt over 500 is also over 0, so the diamond shows. Ask the bigger question first: > 500, then > 0."
```

### Trace the tilt

Work out what shows for each reading.

### Leo's tilt

Leo's program:

```makecode
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## Modify

```step
stage: modify
insight: "Each else if adds one range. Asking the wider question last keeps the narrower ones reachable."
try: { playground: microbit, starter: "lesson.ts#leo" }
tasks:
  - hint: ["Swap the two questions: > 500 first, then > 0.", "Drag the arrow into the first part and the diamond into the else if part."]
    check: { type: code, text: "Fix Leo's tilt: a big tilt right shows the arrow, a small tilt right shows the diamond.", rules: { contains: ["if(input.acceleration(Dimension.X)>500){basic.showArrow(ArrowNames.East)}elseif(input.acceleration(Dimension.X)>0)"] } }
  - hint: ["Click + to add another else if, above the else.", "Use < -500 for a big tilt left, and show a left arrow."]
    check: { type: code, text: "Add a big tilt left (below -500): a left arrow.", rules: { contains: ["input.acceleration(Dimension.X)<-500"] } }
```

### Fix Leo's tilt

Leo's program is in the editor. Swap the questions so both parts can be reached.

### Left as well

Add another **else if** for a big tilt **left**.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "if … else runs exactly one part, decided by one sensor reading."
check:
  type: trace
  text: "This is last lesson's bike light. What does it show at each light level?"
  table: |
    | light level | shows |
    | 30 | [all the LEDs] |
    | 200 | [small square] |
  explain: "30 is less than 50, so the first part runs: all the LEDs. 200 is not, so the else part runs: the small square."
```

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "One if block with an else if and an else. You need only two questions."
  - "Ask < 15 first, then < 25. Anything under 15 was already caught by the first question."
check: { type: code, text: "A comfort meter: cold below 15, just right from 15 to 24, hot from 25, in one if … else if … else.", rules: { contains: ["input.temperature()<", "elseif(input.temperature()<", "}else{"] } }
unlocks: [else-if]
```

Make a **comfort meter** for a classroom, in **one** if block with three parts:

- Below **15**: cold (draw it).
- From **15** to **24**: just right (a happy face).
- **25** and above: hot (draw it).

You need only two questions. The order does the rest.

## Change a spirit level

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#level" }
```

This spirit level points the way to tilt back to flat, and shows a tick when it is level. Make it fussier (a smaller tilt counts as not level), then make it check **forward and back** as well.

```teacher
summary: "Students add else if to ask more questions in a row, and see that the first true question wins, so the order of the questions sets the ranges."
time: 40
timing: "Predict and Run 8 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Spirit level 3 min"
goals:
  - I can use else if to choose between three or more things.
  - I can say which part runs when more than one question is true.
  - I can order the questions so every range can be reached.
before: |
  Click the **+** at the bottom of an if block to add **else if** (another question). The micro:bit asks the questions **from the top**; the **first true one** runs and the rest are **skipped**. **else** runs only when every question above it is false. That makes ranges simple: *temperature < 15*, then *else if temperature < 25* means 15 to 24, because anything under 15 was already caught. It also makes order matter: ask *> 0* before *> 500* and the second can never run. Tilt in the simulator: move the mouse over the micro:bit.
running:
  - "Predict: -100 is the trap. It is negative, so many students pick the left arrow. Read the question aloud: is -100 less than -300?"
  - "Run: small tilts show the square. That middle zone is the else."
  - "Investigate: the trace pins down the edges (300 is not more than 300). Leo's tilt is the order mistake: the bigger question must be asked first."
  - "Modify: students fix Leo's program in the editor, then add a fourth range."
  - "Mix it up: last lesson's bike light, read at two light levels."
  - "Make: two questions make three ranges. Ask students to explain why the middle needs no 'and'."
stuck:
  - see: "One picture never appears."
    ask: "Is there a value that makes its question true, and no question above it true?"
    fix: "Put the narrower question first (> 500 before > 0)."
  - see: "The comfort meter shows hot for 20 degrees."
    ask: "Read your questions from the top with 20. Which is true first?"
    fix: "Check the < and >, and the order: < 15, then < 25, then else."
  - see: "There is no else if."
    ask: "Where is the + on the if block?"
    fix: "Click the + twice: the first adds else, the next adds else if."
stretch: "Make the comfort meter show five ranges (freezing, cold, right, warm, hot) with four questions."
support: "Give students the if … else if … else already in forever with the pictures in, and ask them only to fill in the two questions."
leads: "Next unit: lists, which keep many values under one name. Class ideas: a tilt game where players hold the micro:bit level for ten seconds; a comfort meter by each classroom window with real micro:bits."
exit:
  q: "if temperature > 0 … else if temperature > 30 … What shows at 35 degrees, and why?"
  a: "The first part. 35 is more than 0, so the first question is true and the rest are skipped. Ask > 30 first."
explain: |
  **else if** adds more questions to one if block. The micro:bit asks them **from the top**.

  - The **first true** question runs its part, and the rest are **skipped**.
  - **else** runs only when every question above it is false.

  So the order of the questions decides the ranges: ask *< 15*, then *< 25*, and the second means 15 to 24.
solutions:
  step-4#t1: lesson.ts#sol-leo
  step-4#t2: lesson.ts#sol-left
  step-6: lesson.ts#sol-make
struggle: "Seeing that only the first true question counts. Ask them to read the questions from the top with one value and stop at the first yes."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what shows at -100. Hold up 1, 2, 3 or 4 fingers.
      notes: "Many pick the left arrow because -100 is negative. Ask: is -100 less than -300?"
    - at: investigate
      title: Sorting hat
      minutes: 4
      do: |
        The teacher reads three questions in order ("born in summer?", "in autumn?", else). Each student stands at the first sign that is true for them and stops there.
      notes: "Then swap the order of two questions. Does anyone change sign? Why?"
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your comfort meter to the next pair. They drag the slider and call out the range before it shows.
```

```code lesson.ts#predict
basic.forever(function () {
    if (input.acceleration(Dimension.X) < -300) {
        basic.showArrow(ArrowNames.West)
    } else if (input.acceleration(Dimension.X) > 300) {
        basic.showArrow(ArrowNames.East)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#leo
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#sol-leo
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#sol-left
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (input.acceleration(Dimension.X) < -500) {
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#review
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

```code lesson.ts#make
basic.forever(function () {

})
```

```code lesson.ts#sol-make
basic.forever(function () {
    if (input.temperature() < 15) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    } else if (input.temperature() < 25) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # . # #
            . # # # .
            # . # . #
            `)
    }
})
```

```code lesson.ts#level
basic.forever(function () {
    if (input.acceleration(Dimension.X) < -100) {
        basic.showArrow(ArrowNames.East)
    } else if (input.acceleration(Dimension.X) > 100) {
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showIcon(IconNames.Yes)
    }
})
```
