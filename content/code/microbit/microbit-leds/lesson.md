---
order: 1
unit: show-react
title: Pictures on the LEDs
summary: Show pictures on the micro:bit, then make them move with a loop.
language: makecode
explainPicture: leds.ts#sign
hook: "Scrolling signs at train stations and the lights on a pedestrian crossing run the same simple loop: show a picture, wait, show the next one."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@leds.ts#sign", lesson: "code/microbit/microbit-leds", target: "microbit" }
  caption: "The micro:bit runs blocks in order, top to bottom"
  say: "The micro:bit runs blocks in order, from top to bottom."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption: "Blocks in on start run once, so the last picture stays on."
    - caption:
        text: "Blocks in forever run again and again: a loop."
        say: "Blocks in forever run again and again. That loop makes an animation."
    - click: "Run"
    - wait: 600
    - caption:
        text: "pause keeps a picture on longer: 1000 ms is one second."
        say: "pause keeps a picture on for longer. A thousand milliseconds is one second."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
The micro:bit has 25 small lights (LEDs) in a 5 by 5 grid. You program it with **blocks**, and the **simulator** (the picture of a micro:bit next to the blocks) runs your program straight away. No real micro:bit needed.

## Predict

```step
stage: predict
code: leds.ts#predict
check:
  type: predict
  q: "What will you see on the micro:bit?"
  options: ["Only the big heart", "Only the small heart", "The big heart, then the small heart, which stays", "The hearts flashing over and over"]
  actual: "The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on."
```

These two blocks sit inside **on start**. Read them carefully, then lock in your prediction.

## Run

```step
stage: run
code: leds.ts#predict
try: { playground: microbit, starter: "leds.ts#predict" }
check: { type: reflect, text: "I watched it run and compared it with my prediction." }
```

The simulator runs the program by itself. Missed it? Press the restart button under the simulator.

## Investigate

```step
stage: investigate
code: leds.ts#bug
insight: "Blocks in on start run once. Blocks inside forever run again and again, so two pictures become an animation."
try: { playground: microbit, starter: "leds.ts#investigate" }
tasks:
  - check:
      type: question
      q: "Ada wants the hearts to keep beating. Her hearts show once, then the small heart just stays. Why?"
      options: ["The micro:bit needs a pause to repeat", "The hearts are in on start, and forever is empty", "Hearts can only be shown once", "The small heart is the wrong block"]
      answer: 1
      fault: logic
      misconception: run-once-vs-forever
      explain: "on start runs its blocks once. Only blocks inside forever repeat, and Ada's forever has nothing in it."
  - check:
      type: code
      text: "Move both hearts inside forever, big heart first."
      rules: { contains: ["basic.forever(function(){basic.showIcon(IconNames.Heart)basic.showIcon(IconNames.SmallHeart)"] }
  - check:
      type: question
      q: "How many times does forever run the blocks inside it?"
      options: ["Once", "Twice", "Again and again, until the micro:bit is switched off"]
      answer: 2
      explain: "forever starts again from its first block as soon as it reaches the last one. That is a loop."
```

### Spot the problem

Here is Ada's program. It is also in the editor.

### Fix it

Drag both **show icon** blocks out of **on start** and into **forever**. Keep them in the same order. The checks tick by themselves as you build.

### How often?

Watch the simulator for a few seconds.

## Modify

```step
stage: modify
insight: "Every frame of an animation is a block you choose, and pause sets how long each frame stays."
try: { playground: microbit, starter: "leds.ts#modify" }
tasks:
  - hint: ["show leds is in Basic. Drag it into forever.", "Click squares in the grid to light them. Then delete the small heart."]
    check: { type: code, text: "Swap the small heart for a picture you draw with show leds.", rules: { inside: { "basic.forever": ["basic.showLeds(", "#"] } } }
  - hint: "pause is in Basic. 1000 ms is one second."
    check: { type: code, text: "Add a pause inside forever so the beat slows down.", rules: { inside: { "basic.forever": ["basic.pause("] } } }
```

### Draw your own picture

Swap the small heart for a **show leds** block and draw your own picture.

### Slow the beat

Add a **pause** between the pictures. Try `500`, then try other numbers.

## Make

```step
stage: make
try: { playground: microbit, starter: "leds.ts#make" }
hint:
  - "Each picture is one block inside forever. Start with two, then add a third."
  - "Draw small changes from picture to picture. That is what makes it look like movement."
check: { type: code, text: "Make an animation of three or more pictures in forever, with at least one drawn with show leds.", rules: { count: { "basic.show": 3 }, inside: { "basic.forever": ["basic.showLeds(", "#"] } } }
```

Make an animation of **three or more pictures** that plays forever. Draw at least one yourself.

Ideas: a blinking eye, rain falling, a ball bouncing, a waving stick figure.

## Run a shop sign

```step
stage: modify
try: { playground: microbit, starter: "leds.ts#sign" }
```

This sign scrolls a word, shows a face, then waits. Make it your own sign: change the word, swap the face, and add a frame.
