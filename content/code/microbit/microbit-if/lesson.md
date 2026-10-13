---
order: 6
unit: decide
moveId: if-true
reviews: [read-a-sensor]
introduces: [if]
title: If
summary: Make the micro:bit decide what to do, using a sensor and an if block.
language: makecode
explainPicture: lesson.ts#predict
hook: "Street lights switch on when it gets dark, and a fridge beeps when its door is left open. Each one asks a yes-or-no question about a number, again and again."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit/microbit-if", target: "microbit" }
  caption: "An if asks a yes-or-no question"
  say: "An if asks a yes or no question, like: is the light level under 50?"
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "True: it runs the blocks inside."
        say: "If the answer is true, it runs the blocks inside."
    - caption:
        text: "False: it skips them and does nothing."
        say: "If it's false, it skips them, and does nothing at all."
    - click: "Run"
    - wait: 600
    - caption:
        text: "So an if can turn lights on, but not off by itself."
        say: "So an if can turn the lights on, but can't turn them off by itself."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the micro:bit read sensors and showed numbers. Now it will **decide**. An **if** block (in **Logic**) asks a yes-or-no question, such as *is the light level less than 50?* If the answer is yes (**true**), it runs the blocks inside. If no (**false**), it skips them.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The light level starts high. You drag it down to 20, then back up to 200. What happens?"
  options: ["The lights come on in the dark, then go off when it is bright", "The lights come on in the dark, and stay on when it is bright again", "Nothing ever lights up", "The lights flash on and off"]
  fault: logic
  misconception: if-false-undoes
  actual: "The lights come on in the dark and stay on. The if only does something when it is dark; when it is bright again, it does nothing, so nothing turns the lights off."
```

This is a **night light**. `<` means "less than".

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I dragged the light down and back up, and compared what happened with my prediction." }
```

Drag the light slider down to dark, then back up to bright.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "An if runs its blocks only while its question is true. When it is false, nothing happens, so turning something off needs its own question."
try: { playground: microbit, starter: "lesson.ts#predict" }
tasks:
  - check:
      type: question
      q: "Why do the lights stay on when it gets bright again?"
      options: ["The light sensor stops working", "When the question is false, the if does nothing, so nothing turns the lights off", "The lights need a pause to go off", "forever only runs once"]
      answer: 1
      fault: logic
      misconception: if-false-undoes
      explain: "When it is bright, 'light level < 50' is false, so the if skips its blocks. Nothing in the program turns the lights off."
  - hint: ["clear screen is in Basic (click more...).", "The second question is the opposite one: light level ≥ 50."]
    check: { type: code, text: "Add a second if that clears the screen when it is bright.", rules: { count: { "if(": 2 }, inside: { "basic.forever": ["basic.clearScreen()"] } } }
  - check:
      type: question
      q: "Zoe's night light is on in the daytime and off at night. Which part is wrong?"
      options: ["clear screen and show leds are swapped", "The < and > are the wrong way round", "It needs to be in on start", "50 is too small"]
      answer: 1
      fault: logic
      misconception: comparison-direction
      explain: "'light level > 50' is true when it is bright, so Zoe's lights come on in daylight. For a night light, the lights go on when the level is less than (<) 50."
```

### Why do they stay on?

Look at what the program does when it is bright.

### Turn it off

Add a second **if** so the lights go off when it is bright. The comparison block is in **Logic**: choose **≥** (greater than or equal to).

### Zoe's night light

Zoe's program:

```makecode
basic.forever(function () {
    if (input.lightLevel() > 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() < 50) {
        basic.clearScreen()
    }
})
```

## Modify

```step
stage: modify
insight: "The number in the question decides where the switch happens, and any sensor can be asked about."
try: { playground: microbit, starter: "lesson.ts#modify" }
tasks:
  - hint: "Click 50 in each question and type 100."
    check: { type: code, text: "Make the night light come on earlier: switch at 100 instead of 50.", rules: { contains: ["input.lightLevel()<100"] } }
  - hint: ["Drag in a third if from Logic.", "temperature is in Input. Use > and 30."]
    check: { type: code, text: "Add a warning: show a sad face when the temperature is above 30.", rules: { inside: { "basic.forever": ["input.temperature()>"] } } }
```

### Switch earlier

Make the night light come on when the light level is below **100**. Change both questions.

### Too hot

Add a third **if**: when the temperature is above 30, show a sad face.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A sensor read once gives one moment; a sensor read in forever follows the world."
check:
  type: question
  q: "Thermometer 1 (above) reads the temperature in on start. Thermometer 2 (below) reads it in forever. You drag the temperature slider. Which one follows it?"
  options: ["Thermometer 2, in forever", "Thermometer 1, in on start", "Both", "Neither: sensors only change on a real micro:bit"]
  answer: 0
  explain: "on start reads the temperature once, at the start. forever reads it again each time round, so its number follows the slider."
```

Thermometer 1 is above. Thermometer 2:

```makecode
basic.forever(function () {
    basic.showNumber(input.temperature())
})
```

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "You need two if blocks inside forever, one for cold and one for hot."
  - "Cold: temperature < 10. Hot: temperature > 30."
check: { type: code, text: "Two ifs: a picture when it is cold (below 10) and a different one when it is hot (above 30).", rules: { count: { "if(": 2 }, contains: ["input.temperature()<", "input.temperature()>"] } }
unlocks: [if]
```

Make a **weather warning**. Draw your own pictures:

- Below **10** degrees: a snowflake (or anything that means cold).
- Above **30** degrees: a sun (or anything that means hot).

Test it by dragging the temperature slider.

## Change a fridge alarm

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#fridge" }
```

A fridge should stay at 5 degrees or less. This alarm flashes a cross when it gets warmer. Make it also flash when the fridge is **too cold** (below 0), with a different picture.

```teacher
summary: "Students use an if block to make the micro:bit decide, and see that a false if does nothing, so turning something off needs its own question."
time: 45
timing: "Predict and Run 8 min · Investigate 12 min · Modify 8 min · Mix it up 3 min · Make 10 min · Fridge alarm 4 min"
goals:
  - I can use an if block to make the micro:bit decide.
  - I can say what an if does when its question is false.
  - I can choose < or > so the question is true when I want it to be.
before: |
  An **if** block asks a yes-or-no question (a **condition**), such as *light level < 50*. When the answer is yes (**true**), it runs the blocks inside; when no (**false**), it skips them and does nothing. That second half surprises students: in the Predict, the lights come on in the dark and **stay on**, because nothing tells them to go off. The fix is a second if with the opposite question. The comparison block is in **Logic**: `<` less than, `>` greater than, `≥` greater than or equal to. Next lesson, **else** does the same job more neatly.
running:
  - "Predict: most students expect the lights to go off when it is bright. Let them be surprised."
  - "Run: drag dark, then bright. Ask: which block would turn the lights off? (None.)"
  - "Investigate: the fix is a second if asking the opposite question. Zoe's night light is the classic mix-up of < and >: read it aloud as 'if the light is less than 50'."
  - "Modify: changing the switch point means changing both questions, or there is a gap where neither is true."
  - "Mix it up: sensors in on start against forever, from last lesson."
  - "Make: two ifs, two drawings. Leave the middle (10 to 30) showing whatever was last: that is fine for now."
stuck:
  - see: "The lights never come on."
    ask: "Read your question aloud: is it true when it is dark?"
    fix: "Check the < and >: a night light needs light level < 50."
  - see: "The lights flicker when the slider is near 50."
    ask: "Which questions are true at exactly 50?"
    fix: "Use < 50 for one and ≥ 50 for the other, so exactly one is true."
  - see: "The if block will not snap in."
    ask: "Is it inside forever, and is the comparison inside the if's slot?"
    fix: "Drag the comparison from Logic into the hexagon slot of the if."
stretch: "Make the night light dim gradually: one row lit when it is a bit dark, three rows darker, all five in the dark (three ifs)."
support: "Give students the second if already in place with an empty question, and ask them to choose the comparison."
leads: "Next lesson: else, which turns two ifs into one block with no gap. Class ideas: a classroom 'too noisy' light with the sound level (micro:bit V2); a plant monitor on a windowsill with a real micro:bit."
exit:
  q: "A night light uses only 'if light level < 50, show lights'. Why do the lights stay on in the morning?"
  a: "When it is bright the question is false, so the if does nothing. Nothing in the program turns the lights off."
explain: |
  An **if** asks a yes-or-no question, such as *light level < 50*.

  - **True** (yes): it runs the blocks inside.
  - **False** (no): it skips them and does **nothing**.

  So an if can turn the lights on, but it cannot turn them off by itself. That needs another question: *light level ≥ 50*.

  `<` means less than, `>` means greater than.
solutions:
  step-4#t1: lesson.ts#sol-threshold
  step-4#t2: lesson.ts#sol-hot
  step-6: lesson.ts#sol-make
struggle: "An if does nothing when false, so turning something off needs its own question. Ask them to read the question aloud for a dark room and a bright one."
class:
  activities:
    - at: investigate
      title: Stand up if
      minutes: 3
      do: |
        The teacher reads a question ("if you are wearing blue"). Students for whom it is true stand up. Then the teacher reads a question that is false for everyone.
      notes: "When the question is false, nobody does anything: nobody sits down unless a question tells them to."
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
    }
})
```

```code lesson.ts#modify
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

```code lesson.ts#sol-threshold
basic.forever(function () {
    if (input.lightLevel() < 100) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 100) {
        basic.clearScreen()
    }
})
```

```code lesson.ts#sol-hot
basic.forever(function () {
    if (input.lightLevel() < 100) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 100) {
        basic.clearScreen()
    }
    if (input.temperature() > 30) {
        basic.showIcon(IconNames.Sad)
    }
})
```

```code lesson.ts#review
basic.showNumber(input.temperature())
```

```code lesson.ts#make
basic.forever(function () {

})
```

```code lesson.ts#sol-make
basic.forever(function () {
    if (input.temperature() < 10) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    }
    if (input.temperature() > 30) {
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

```code lesson.ts#fridge
basic.forever(function () {
    if (input.temperature() > 5) {
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
})
```
