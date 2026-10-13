---
order: 2
unit: show-react
moveId: forever-loop
reviews: [blocks-in-order]
title: Again and again
summary: Put pictures inside forever so they repeat, and use pause to set how long each one stays.
language: makecode
explainPicture: lesson.ts#sol-forever
hook: "Scrolling signs at train stations and the lights on a pedestrian crossing run the same simple loop: show a picture, wait, show the next one, and start again."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sol-pause", lesson: "code/microbit/microbit-forever", target: "microbit" }
  caption: "forever runs its blocks again and again"
  say: "forever runs its blocks again and again."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "When it reaches the last block, it starts again from the top: a loop."
        say: "After the last block, it starts again from the top. That is a loop."
    - click: "Run"
    - wait: 600
    - caption:
        text: "pause keeps a picture on longer: 1000 ms is one second."
        say: "pause keeps a picture on for longer. A thousand milliseconds is one second."
    - caption:
        text: "Then the loop carries on with the next picture."
        say: "Then the loop carries on with the next picture."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson the blocks in **on start** ran once and the last picture stayed. A program has a second place to put blocks: **forever**.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "Ada wants a beating heart. Her hearts are in on start, and forever is empty. What will she see?"
  options: ["The big heart, then the small heart, which stays", "The hearts beating over and over", "Nothing, because forever is empty", "Only the big heart"]
  fault: logic
  misconception: run-once-vs-forever
  actual: "The big heart, then the small heart, which stays. Blocks in on start run once. forever repeats, but there is nothing inside it to repeat."
```

Look at which block each heart is inside, then lock in your prediction.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched it run and compared it with my prediction." }
```

Watch for a few seconds. Does the heart beat?

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "Blocks inside forever run again and again: when the last one finishes, forever starts again from the top. pause holds a picture, then the loop carries on."
try: { playground: microbit, starter: "lesson.ts#predict" }
tasks:
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
  - check:
      type: question
      q: "Ada adds pause 1000 after the small heart, inside forever. What happens?"
      options: ["The small heart stays for one second, then the big heart comes back", "The loop stops after one second", "Both hearts stay for one second, together", "Nothing changes"]
      answer: 0
      fault: logic
      misconception: pause-ends-loop
      explain: "pause only waits. The small heart stays on for 1000 ms, then forever carries on from the top with the big heart."
```

### Fix Ada's heart

Drag both **show icon** blocks out of **on start** and into **forever**. Keep them in the same order. The check ticks by itself as you build.

### How often?

Watch the simulator for a few seconds.

### Add a pause

Read the question first. Then add **pause** (in Basic) and check.

## Modify

```step
stage: modify
insight: "Every frame of an animation is one block in the loop, and pause sets how long each frame stays."
try: { playground: microbit, starter: "lesson.ts#modify" }
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
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Each picture is one block inside forever. Start with two, then add a third."
  - "Draw small changes from picture to picture. That is what makes it look like movement."
check: { type: code, text: "Make an animation of three or more pictures in forever, with at least one drawn with show leds.", rules: { count: { "basic.show": 3 }, inside: { "basic.forever": ["basic.showLeds(", "#"] } } }
unlocks: [animation]
```

Make an animation of **three or more pictures** that plays forever. Draw at least one yourself.

Ideas: a blinking eye, rain falling, a ball bouncing, a waving stick figure.

## Run a shop sign

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#sign" }
```

This sign scrolls a word, shows a face, then waits, again and again. Make it your own sign: change the word, swap the face, and add a frame.

```teacher
summary: "Students move pictures from on start into forever so they repeat, and use pause to set how long each frame stays."
time: 40
timing: "Predict and Run 8 min · Investigate 10 min · Modify 8 min · Make 10 min · Shop sign 4 min"
goals:
  - I can use forever to repeat blocks.
  - I can say what pause does inside a loop.
  - I can build an animation from pictures and pauses.
before: |
  A program has two places to put blocks. **on start** runs its blocks once. **forever** runs its blocks again and again: a **loop**. Most surprises in this lesson come from which of the two a block is in. Try the Make yourself: three pictures in forever, one drawn with **show leds**.
running:
  - "Predict: most students choose 'beating over and over'. Ask: which block are the hearts inside?"
  - "Run: the small heart stays. Last lesson's rule still holds: on start runs once."
  - "Investigate: students fix Ada's program in the editor; the check ticks by itself. Take a vote on the pause question before anyone adds a pause."
  - "Modify: then pause. 1000 ms is one second."
  - "Make: small changes between frames look like movement. Let students show each other."
stuck:
  - see: "The heart does not beat after the fix."
    ask: "Which block are your hearts inside?"
    fix: "Drag them inside forever, not under it. The block should hug them."
  - see: "The animation flickers too fast to see."
    ask: "How long does each picture stay?"
    fix: "Add a pause between pictures, such as 500."
  - see: "A student thinks the program stopped after a pause."
    ask: "Watch for two more seconds. What comes after the pause?"
    fix: "pause waits, then forever carries on from where it was."
stretch: Make an animation with five or more frames that tells a tiny story, such as a seed growing into a flower.
support: Give students two show leds blocks already in forever, and ask them only to draw the pictures and add a pause.
leads: "Next lesson adds buttons, so the micro:bit waits for a press before it shows something. Class idea: each table designs one frame and the class joins them into one animation."
exit:
  q: "Your animation has three pictures inside forever. What happens if you move them into on start?"
  a: "They play once, and the last picture stays on."
explain: |
  Blocks inside **forever** run **again and again**. When the last block finishes, forever starts again from the top. That is a **loop**, and it turns a few pictures into an animation.

  **pause** keeps a picture on for longer, then the loop carries on. 1000 ms is one second.

  Blocks in **on start** still run only once.
solutions:
  step-4#t1: lesson.ts#sol-picture
  step-4#t2: lesson.ts#sol-pause
  step-5: lesson.ts#sol-make
struggle: "on start runs once and forever repeats. When the heart doesn't beat, ask which block the pictures are inside."
class:
  activities:
    - at: investigate
      title: Be the loop
      minutes: 4
      do: |
        Three students hold picture cards in a row. A fourth walks along them, showing each card in turn, and goes back to the start after the last one.
      notes: "Add a pause: the walker stops at one card and counts to three. The loop carries on afterwards."
```

```code lesson.ts#predict
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {

})
```

```code lesson.ts#sol-forever
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
```

```code lesson.ts#modify
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
```

```code lesson.ts#sol-picture
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
})
```

```code lesson.ts#sol-pause
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(500)
})
```

```code lesson.ts#make
basic.forever(function () {

})
```

```code lesson.ts#sol-make
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . # # # .
        # # . # #
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        # # . # #
        . # # # .
        . . . . .
        `)
    basic.pause(1000)
})
```

```code lesson.ts#sign
basic.forever(function () {
    basic.showString("OPEN")
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
})
```
