---
order: 5
unit: decide
title: If
summary: Make the micro:bit decide what to do, using a sensor and an if block.
language: makecode
introduces: [if]
explainPicture: if.ts#predict
hook: "Street lights switch on when it gets dark, and a fridge beeps when its door is left open. Each one asks a yes-or-no question about a number, again and again."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@if.ts#predict", lesson: "code/microbit/microbit-if", target: "microbit" }
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
code: if.ts#predict
check:
  type: predict
  q: "The light level starts high. You drag it down to 20, then back up to 200. What happens?"
  options: ["The lights come on in the dark, then go off when it is bright", "The lights come on in the dark, and stay on when it is bright again", "Nothing ever lights up", "The lights flash on and off"]
  actual: "The lights come on in the dark and stay on. The if only does something when it is dark; when it is bright again, it does nothing, so nothing turns the lights off."
```

This is a **night light**. `<` means "less than".

## Run

```step
stage: run
code: if.ts#predict
try: { playground: microbit, starter: "if.ts#predict" }
check: { type: reflect, text: "I dragged the light down and back up, and compared what happened with my prediction." }
```

Drag the light slider down to dark, then back up to bright.

## Investigate

```step
stage: investigate
code: if.ts#predict
insight: "An if runs its blocks only when its question is true. When it is false, nothing happens, so turning something off needs its own question."
try: { playground: microbit, starter: "if.ts#predict" }
tasks:
  - check:
      type: question
      q: "Why do the lights stay on when it gets bright again?"
      options: ["The light sensor stops working", "When the question is false, the if does nothing, so nothing turns the lights off", "The lights need a pause to go off", "forever only runs once"]
      answer: 1
      explain: "When it is bright, 'light level < 50' is false, so the if skips its blocks. Nothing in the program turns the lights off."
  - hint: ["Drag in a second if block, under the first, inside forever.", "Ask 'light level ≥ 50' and put clear screen inside it."]
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
try: { playground: microbit, starter: "if.ts#modify" }
tasks:
  - hint: "Change 50 in both questions, so they still meet in the middle."
    check: { type: code, text: "Make the night light come on earlier: switch at 100 instead of 50.", rules: { contains: ["input.lightLevel()<100"] } }
  - hint: ["Add a third if, inside forever.", "Ask 'temperature > 30', and show a face inside."]
    check: { type: code, text: "Add a warning: show a sad face when the temperature is above 30.", rules: { inside: { "basic.forever": ["input.temperature()>"] } } }
```

### Switch earlier

Make the night light come on when the light level is below **100**. Change both questions.

### Too hot

Add a third **if**: when the temperature is above 30, show a sad face.

## Make

```step
stage: make
try: { playground: microbit, starter: "if.ts#make" }
hint:
  - "Two if blocks inside forever: one asks about cold, one about hot."
  - "temperature < 10 for cold, temperature > 30 for hot. Draw a picture with show leds for each."
check: { type: code, text: "Two ifs: a picture when it is cold (below 10) and a different one when it is hot (above 30).", rules: { count: { "if(": 2 }, contains: ["input.temperature()<", "input.temperature()>"] } }
```

Make a **weather warning**. Draw your own pictures:

- Below **10** degrees: a snowflake (or anything that means cold).
- Above **30** degrees: a sun (or anything that means hot).

Test it by dragging the temperature slider.

## Change a fridge alarm

```step
stage: modify
try: { playground: microbit, starter: "if.ts#fridge" }
```

A fridge should stay at 5 degrees or less. This alarm flashes a cross when it gets warmer. Make it also flash when the fridge is **too cold** (below 0), with a different picture.
