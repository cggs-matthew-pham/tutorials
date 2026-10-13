---
order: 5
unit: remember-sense
moveId: read-a-sensor
reviews: [count-in-a-variable]
assumes: [variable, variable-update]
title: Sensors are numbers
summary: Read light, temperature and tilt as numbers, and show them.
language: makecode
explainPicture: lesson.ts#investigate
hook: "A phone dims its screen in the dark and turns the picture when you tilt it. Inside, a sensor is just handing the phone a number."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#investigate", lesson: "code/microbit/microbit-sensors", target: "microbit" }
  caption: "A sensor measures something and gives a number"
  say: "A sensor measures something, and gives your program a number."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "light level: 0 (dark) to 255 (bright)."
        say: "light level goes from zero, dark, to 255, bright."
    - caption:
        text: "temperature in °C. acceleration x: tilt left or right."
        say: "temperature is in degrees Celsius. acceleration x tells you the tilt."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The world keeps changing it, so read it again in forever."
        say: "The world keeps changing the number, so read it again in forever."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
The micro:bit has **sensors**: parts that measure the world around it, such as how bright it is or how warm. Each sensor gives the program a **number**. You find them in **Input**.

In the simulator, sensors appear as controls when your program uses them: drag the **light** slider (the sun), drag the **temperature** slider (the thermometer), or move the mouse over the micro:bit to **tilt** it.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "What will the micro:bit show?"
  options: ["The word light", "A number that changes when the light changes", "0, and nothing else", "The same number over and over, even when the light changes"]
  fault: logic
  misconception: run-once-vs-forever
  actual: "A number that changes with the light. forever reads the light level again each time round, so the number follows the slider."
```

**light level** is a sensor block. It is inside **forever**.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I dragged the light slider and watched the number change." }
```

Drag the light slider (the sun on the simulator) up and down. Try the darkest and brightest settings.

## Investigate

```step
stage: investigate
code: lesson.ts#investigate
insight: "A sensor is a number the world keeps changing. Reading it once gives one moment; reading it in forever follows it."
tasks:
  - check:
      type: match
      q: "Match each sensor with what its number means."
      pairs:
        - ["light level", "how bright it is, from 0 (dark) to 255 (bright)"]
        - ["temperature", "how warm it is, in degrees Celsius"]
        - ["acceleration x", "how far it tilts left (below 0) or right (above 0)"]
  - check:
      type: number
      q: "Drag the light slider all the way up. What is the biggest number the light level can be?"
      answer: 255
      explain: "Light level runs from 0 (dark) to 255 (as bright as it can measure)."
  - check:
      type: question
      q: "Sam's program shows the temperature. He drags the temperature slider, but the number never changes. Why?"
      options: ["The temperature sensor is broken", "The block is in on start, so it reads the temperature once", "Temperature only works on a real micro:bit", "He needs a variable"]
      answer: 1
      fault: logic
      misconception: run-once-vs-forever
      explain: "on start runs once, so Sam's program reads the temperature at the very start and never again. In forever, it would read it again each time round."
```

This program keeps each reading in a variable called `reading`, then shows it. The world changes the light; forever reads it again and again.

### What do they measure?

Match each sensor with its number.

### How bright?

Find the top of the light scale.

### Sam's thermometer

Sam's program:

```makecode
basic.showNumber(input.temperature())
```

## Modify

```step
stage: modify
insight: "Any sensor block fits wherever a number fits, and an event decides when it is read."
try: { playground: microbit, starter: "lesson.ts#modify" }
tasks:
  - hint: "temperature is in Input. Drag it into show number, in place of light level."
    check: { type: code, text: "Show the temperature instead of the light level.", rules: { inside: { "basic.forever": ["basic.showNumber(input.temperature())"] } } }
  - hint: ["Use on button A pressed and on button B pressed from Input.", "Put show number inside each one, with a different sensor in each."]
    check: { type: code, text: "A shows the light level, B shows the temperature.", rules: { inside: { "input.onButtonPressed(Button.A": ["input.lightLevel()"], "input.onButtonPressed(Button.B": ["input.temperature()"] } } }
```

### Swap the sensor

Show the temperature instead of the light level. Drag the temperature slider to test it.

### Read on request

Read a sensor only when asked: **A** shows the light level, **B** shows the temperature.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "change adds to what is there; set throws it away."
check:
  type: trace
  text: "A changes points by 2 and B sets it to 0. Fill in points after each press."
  table: |
    | press | points after |
    | (start) | 0 |
    | A | [2] |
    | A | [4] |
    | B | [0] |
    | A | [2] |
  explain: "Each A adds 2 to whatever points is now. B throws the value away and puts 0 there."
```

A points counter, no sensors in sight.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Inside forever: show the temperature, then show the letter C, then pause."
  - "show string is in Basic. Type C into it. 2000 ms is two seconds."
check: { type: code, text: "A thermometer: show the temperature and a C, then wait, again and again.", rules: { inside: { "basic.forever": ["input.temperature()", "basic.showString(", "basic.pause("] } } }
```

Make a **thermometer**. Again and again, it shows the temperature, then the letter **C** (for Celsius), then waits two seconds.

## Change a light meter

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#meter" }
```

This light meter draws a bar instead of a number: the brighter it is, the more LEDs light up. **plot bar graph** needs the biggest value the sensor can give (255 for light). Change it into a **temperature** meter, where 40 is the biggest value.

```teacher
summary: "Students read light, temperature and tilt as numbers, and see that a sensor read in forever follows the world while one read in on start gives a single moment."
time: 40
timing: "Predict and Run 8 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 7 min · Light meter 4 min"
goals:
  - I can read a sensor and show its number.
  - I can say what the light, temperature and tilt numbers mean.
  - I can make a sensor reading update by itself.
before: |
  A **sensor** gives the program a number that the world keeps changing. In the simulator the controls appear only once a program uses a sensor: the light slider (sun), the temperature slider (thermometer), and tilt by moving the mouse over the micro:bit. The key idea is the forever loop from lesson 2: a sensor read in forever is read again and again; in on start, once.
running:
  - "Predict: ask whether the number will follow the light. The key is that forever reads it again each time."
  - "Run: drag the light slider from dark to bright. The number lags a little because it scrolls."
  - "Investigate: Sam's thermometer is lesson 2's on start mistake again, in a new place. Ask the class which lesson it reminds them of."
  - "Modify: Read on request shows that an event decides when a sensor is read."
  - "Mix it up: a quick trace of set and change from last lesson."
  - "Make: temperature, C, pause: three blocks in forever."
stuck:
  - see: "The number never changes."
    ask: "Is the sensor block in on start or in forever?"
    fix: "Move it into forever (or a button event) so it is read again."
  - see: "The simulator has no slider."
    ask: "Has the program got a sensor block in it, and is it running?"
    fix: "The slider appears only after a sensor block is used. Restart the simulator if needed."
  - see: "The temperature seems too high on a real micro:bit."
    ask: "Where is the sensor?"
    fix: "It is in the processor, which warms up as it works. It reads a little above the room."
stretch: "Show tilt as a number with acceleration x, then make A show tilt left and right and B show tilt forward and back (acceleration y)."
support: "Give students the thermometer's forever block with show number already in it, and ask them to add the C and the pause."
leads: "Next unit: the micro:bit decides what to do using these numbers (if it is dark, light up). Class ideas: measure the brightest and darkest spots in the room with real micro:bits; record the temperature by a window every lesson for a week."
exit:
  q: "Why does reading the temperature in on start not work for a thermometer?"
  a: "on start reads it once, at the start. A thermometer must read it again and again, in forever."
explain: |
  A **sensor** measures something and gives the program a **number**.

  - **light level**: 0 (dark) to 255 (bright)
  - **temperature**: degrees Celsius
  - **acceleration x**: tilt left (below 0) or right (above 0)

  The world keeps changing the number, so read it again in **forever** (or when a button is pressed) to see the new value.
solutions:
  step-4#t1: lesson.ts#sol-temperature
  step-4#t2: lesson.ts#sol-buttons
  step-6: lesson.ts#sol-make
struggle: "A sensor is read once in on start and many times in forever. When the number never changes, ask where the sensor block is."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the micro:bit will show. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask the 'same number over and over' group what forever does each time round."
    - at: investigate
      title: Read the room
      minutes: 4
      do: |
        One student reads a thermometer (or looks out of the window) and calls out what they see, again and again. A second student calls out only once, at the start.
      notes: "Who still knows what the room is like after five minutes? That is forever against on start."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your thermometer to the next pair. Drag the slider and read it together.
```

```code lesson.ts#predict
basic.forever(function () {
    basic.showNumber(input.lightLevel())
})
```

```code lesson.ts#investigate
let reading = 0
basic.forever(function () {
    reading = input.lightLevel()
    basic.showNumber(reading)
})
```

```code lesson.ts#modify
basic.forever(function () {
    basic.showNumber(input.lightLevel())
})
```

```code lesson.ts#sol-temperature
basic.forever(function () {
    basic.showNumber(input.temperature())
})
```

```code lesson.ts#sol-buttons
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.lightLevel())
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(input.temperature())
})
```

```code lesson.ts#review
let points = 0
input.onButtonPressed(Button.A, function () {
    points += 2
    basic.showNumber(points)
})
input.onButtonPressed(Button.B, function () {
    points = 0
    basic.showNumber(points)
})
```

```code lesson.ts#make
basic.forever(function () {

})
```

```code lesson.ts#sol-make
basic.forever(function () {
    basic.showNumber(input.temperature())
    basic.showString("C")
    basic.pause(2000)
})
```

```code lesson.ts#meter
basic.forever(function () {
    led.plotBarGraph(input.lightLevel(), 255)
})
```
