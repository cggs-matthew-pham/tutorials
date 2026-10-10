---
order: 4
unit: remember-sense
title: Sensors are numbers
summary: Read light, temperature and tilt as numbers, and show them.
language: makecode
explainPicture: sensors.ts#investigate
hook: "A phone dims its screen in the dark and turns the picture when you tilt it. Inside, a sensor is just handing the phone a number."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@sensors.ts#investigate", lesson: "code/microbit/microbit-sensors", target: "microbit" }
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
code: sensors.ts#predict
check:
  type: predict
  q: "What will the micro:bit show?"
  options: ["The word light", "A number that changes when the light changes", "0, and nothing else", "The same number over and over, even when the light changes"]
  actual: "A number that changes with the light. forever reads the light level again each time round, so the number follows the slider."
```

**light level** is a sensor block. It is inside **forever**.

## Run

```step
stage: run
code: sensors.ts#predict
try: { playground: microbit, starter: "sensors.ts#predict" }
check: { type: reflect, text: "I dragged the light slider and watched the number change." }
```

Drag the light slider (the sun on the simulator) up and down. Try the darkest and brightest settings.

## Investigate

```step
stage: investigate
code: sensors.ts#investigate
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
try: { playground: microbit, starter: "sensors.ts#modify" }
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

## Make

```step
stage: make
try: { playground: microbit, starter: "sensors.ts#make" }
hint:
  - "Inside forever: show the temperature, then show the letter C, then pause."
  - "show string is in Basic. Type C into it. 2000 ms is two seconds."
check: { type: code, text: "A thermometer: show the temperature and a C, then wait, again and again.", rules: { inside: { "basic.forever": ["input.temperature()", "basic.showString(", "basic.pause("] } } }
```

Make a **thermometer**. Again and again, it shows the temperature, then the letter **C** (for Celsius), then waits two seconds.

## Change a light meter

```step
stage: modify
try: { playground: microbit, starter: "sensors.ts#meter" }
```

This light meter draws a bar instead of a number: the brighter it is, the more LEDs light up. **plot bar graph** needs the biggest value the sensor can give (255 for light). Change it into a **temperature** meter, where 40 is the biggest value.
