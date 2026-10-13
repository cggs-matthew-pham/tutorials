---
order: 1
unit: show-react
moveId: blocks-in-order
reviews: []
title: Pictures in order
summary: Show words and pictures on the micro:bit, and see that blocks run once, from top to bottom.
language: makecode
explainPicture: lesson.ts#sign
hook: "A shop sign scrolls its name, then shows a picture. It is a short list of instructions, done in order."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sign", lesson: "code/microbit/microbit-leds", target: "microbit" }
  caption: "The micro:bit runs blocks in order, top to bottom"
  say: "The micro:bit runs blocks in order, from top to bottom."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "on start runs its blocks once, when the micro:bit switches on."
        say: "on start runs its blocks once, when the micro:bit switches on."
    - click: "Run"
    - wait: 600
    - caption:
        text: "First the word scrolls. Then the face. Then the tick."
        say: "First the word scrolls, then the face, then the tick."
    - caption:
        text: "The last picture stays on, because nothing comes after it."
        say: "The last picture stays on, because nothing comes after it."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
The micro:bit has 25 small lights (LEDs) in a 5 by 5 grid. You program it with **blocks**, and the **simulator** (the picture of a micro:bit next to the blocks) runs your program straight away. No real micro:bit needed.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "What will you see on the micro:bit?"
  options: ["The big heart, then the small heart, which stays", "Both hearts at the same time", "Only the big heart", "The hearts flashing over and over"]
  fault: logic
  misconception: blocks-show-together
  actual: "The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on."
```

These two blocks sit inside **on start**. Read them from the top, then lock in your prediction.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched it run and compared it with my prediction." }
```

The simulator runs the program by itself. Missed it? Press the restart button under the simulator.

## Investigate

```step
stage: investigate
code: lesson.ts#sign
insight: "Blocks in on start run once, one after another from the top, so the order of the blocks is the order you see, and the last picture stays."
try: { playground: microbit, starter: "lesson.ts#sign" }
tasks:
  - check:
      type: question
      q: "Lily's sign has three blocks in on start: show string HI, show icon happy face, show icon tick. What do you see?"
      options: ["HI scrolls, then the happy face, then the tick, which stays", "HI, the face and the tick all at once", "Only the tick", "Only HI"]
      answer: 0
      fault: logic
      misconception: blocks-show-together
      explain: "The micro:bit does one block at a time, from the top. Each picture replaces the one before, and the tick is last, so it stays."
  - check:
      type: question
      q: "Ten seconds after the program starts, which picture is on the screen?"
      options: ["The tick: the last block", "HI: the first block", "Nothing: the program has finished", "All three, taking turns"]
      answer: 0
      explain: "When the last block has run, the program is finished, and the last picture is still on the LEDs."
  - check:
      type: code
      text: "Change the order: the tick first, then the happy face, then HI."
      rules: { contains: ["basic.showIcon(IconNames.Yes)basic.showIcon(IconNames.Happy)basic.showString(\"HI\")"] }
```

### Lily's sign

Lily's sign is in the editor. Read it, then answer.

### Ten seconds later

### Change the order

Drag the blocks so the tick comes first and **HI** scrolls last. The check ticks by itself as you build.

## Modify

```step
stage: modify
insight: "show leds is a picture you draw yourself. It is one more block in the list, run in its turn."
try: { playground: microbit, starter: "lesson.ts#modify" }
tasks:
  - hint: ["show leds is in Basic. Drag it under the last block.", "Click squares in the grid to light them."]
    check: { type: code, text: "Add a picture you draw with show leds at the end.", rules: { contains: ["basic.showLeds(", "#"] } }
  - hint: "show number is in Basic. Drag it to the top and type a number."
    check: { type: code, text: "Add a show number block at the very start.", rules: { contains: ["basic.showNumber("] } }
```

### Draw your own picture

Add a **show leds** block at the end and draw a picture. Which picture stays on now?

### A number first

Add **show number** at the very top. Type your favourite number.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "show string is in Basic. Type your name into it."
  - "Put show leds under show string, so the picture comes last and stays on."
check: { type: code, text: "A name badge: your name scrolls, then a picture you draw stays on.", rules: { contains: ["basic.showString(", "basic.showLeds(", "#"] } }
```

Make a **name badge**. Your name scrolls across, then a picture you drew stays on the screen.

## Change a door sign

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#door" }
```

This door sign scrolls a word, then shows a face. Make it the sign for your classroom door: your room number, then a picture that says what happens inside.

```teacher
summary: "Students see that blocks in on start run once, from the top, so the order of the blocks is the order of the pictures, and the last one stays."
time: 35
timing: "Predict and Run 8 min · Investigate 10 min · Modify 7 min · Make 7 min · Door sign 3 min"
goals:
  - I can say what the micro:bit will show, in order.
  - I can say why the last picture stays on.
  - I can make a name badge from words and a picture I draw.
before: |
  No micro:bits needed: the **simulator** (the micro:bit picture beside the blocks) runs every program. Blocks in **on start** run once, when the micro:bit switches on, one after another from the top. This lesson is only about that order; the next one adds **forever**. Try the Make yourself: your name in **show string**, then a **show leds** picture (click the squares to light them).
running:
  - "Predict: take a vote. 'Both hearts at once' is the common wrong answer. Ask: how many blocks does the micro:bit do at a time?"
  - "Run: the small heart stays. Say it plainly: blocks run top to bottom, once, and the last picture stays on."
  - "Investigate: students change the order of Lily's sign in the editor; the check ticks when it is right."
  - "Modify: show leds is the first time students draw. Ask which picture stays on after they add it."
  - "Make: the name badge. Let students show each other."
stuck:
  - see: "Only the last picture seems to show."
    ask: "Press restart and watch the very start. What scrolls first?"
    fix: "Every block runs, one after another. The last one stays, so it is easy to miss the others."
  - see: "A show leds block shows nothing."
    ask: "Which squares did you light?"
    fix: "Click squares in the grid to turn them on."
  - see: "The blocks sit outside on start and are greyed out."
    ask: "Which block are they inside?"
    fix: "Drag them inside on start until the block hugs them."
stretch: Make a badge that shows three things in a row, ending with the picture that should stay on all day.
support: Give students the show string block already in on start, and ask them only to add and draw the show leds picture.
leads: "Next lesson: forever, so the pictures repeat instead of stopping on the last one. With real micro:bits, press Download and drag the file onto the micro:bit to run it for real."
exit:
  q: "on start has: show icon heart, show icon sad face, show icon tick. What is on the screen at the end?"
  a: "The tick. The blocks run once, top to bottom, and the last picture stays."
explain: |
  The micro:bit runs blocks **in order**, from top to bottom, one at a time.

  Blocks in **on start** run **once**, when the micro:bit switches on. Each picture replaces the one before, so the **last** picture is the one that stays on.

  So the order of the blocks is the order you see.
solutions:
  step-4#t1: lesson.ts#sol-picture
  step-4#t2: lesson.ts#sol-number
  step-5: lesson.ts#sol-make
struggle: "Seeing that the blocks run one at a time. Ask which block ran last, instead of telling them."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what you will see. Hold up 1, 2, 3 or 4 fingers.
      notes: "Count the votes before anyone runs it. Ask one pair from each option why."
    - at: investigate
      title: Be the micro:bit
      minutes: 4
      do: |
        One student is the micro:bit and holds up one picture card at a time. The class reads the blocks aloud, top to bottom.
      notes: "Holding up one card at a time makes it concrete that each picture replaces the last, and the last card stays up."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your name badge to the next pair. Point to the block that runs last.
```

```code lesson.ts#predict
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.SmallHeart)
```

```code lesson.ts#sign
basic.showString("HI")
basic.showIcon(IconNames.Happy)
basic.showIcon(IconNames.Yes)
```

```code lesson.ts#modify
basic.showString("HI")
basic.showIcon(IconNames.Happy)
```

```code lesson.ts#sol-picture
basic.showString("HI")
basic.showIcon(IconNames.Happy)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
```

```code lesson.ts#sol-number
basic.showNumber(7)
basic.showString("HI")
basic.showIcon(IconNames.Happy)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
```

```code lesson.ts#make
basic.showIcon(IconNames.Happy)
```

```code lesson.ts#sol-make
basic.showString("ANA")
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    `)
```

```code lesson.ts#door
basic.showString("OPEN")
basic.showIcon(IconNames.Happy)
```
