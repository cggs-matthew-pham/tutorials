---
order: 3
unit: inputs
title: A button is an input
summary: "A pin set as an input reads the voltage on it: joined to 3V it reads 1, joined to GND it reads 0. A button joins pin 0 to 3V only while it is held, so a pull-down resistor holds the pin at 0 when it is up. Without one the pin floats and reads 0 or 1 at random."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The micro:bit has buttons A and B built in. Wire your own button to a pin, and it can be a doorbell, a game controller or a sensor on a door. How does a pin know it has been pressed?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8503
  url: http://127.0.0.1:8503/index.html
  readySelector: ".cksvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A button from 3V to pin 0, and a pull-down resistor from pin 0 to GND." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "A button on a pin"
  say: "Pin 0 reads the voltage on it."
  clip:
    - caption: { text: "Button up: the pull-down joins pin 0 to GND, so it reads 0.", say: "Button up: pin zero reads zero." }
    - wait: 1500
    - click: "Add / remove the pull-down"
    - caption: { text: "Take the pull-down away: pin 0 is joined to nothing and reads at random.", say: "Without the pull-down, the pin floats." }
    - wait: 2600
    - click: "Add / remove the pull-down"
    - caption: { text: "Put it back: a steady 0 until the button joins pin 0 to 3V.", say: "The pull-down keeps it steady." }
    - wait: 1200
    - expect: { selector: "#gsum", contains: "pull-down fitted" }
---
Until now pin 0 was an **output**: code set it to 0 V or 3.3 V. A pin can also be an **input**: it reads the voltage on it. **Digital read** gives **1** for 3.3 V and **0** for 0 V. The micro:bit here runs: *forever, if digital read pin P0 = 1, show a heart, else clear the screen.*

## Predict: press it

```step
stage: predict
insight: "Committing to the reading while the button is held tests the new move: an input pin reports the voltage as 1 or 0, not the volts or a press count."
check:
  type: predict
  q: "The button joins 3V to pin 0 while you hold it. While you hold it, digital read pin P0 gives…"
  options: ["1", "0", "3.3", "1023"]
  actual: "1. Holding the button joins pin 0 to 3.3 V, and digital read reports that as 1."
```

## Try: hold and let go

```step
stage: run
insight: "Holding and letting go settles the prediction and shows both readings; the heart is the program acting on them."
try: { playground: board, starter: "board.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Hold the button. What does pin 0 read, and what does the micro:bit show?", when: "p = 1 and v = 1", explain: "1, and a heart: the button joins pin 0 to 3.3 V." }
  - check: { type: board, text: "Let go. And now?", when: "n >= 1 and p = 0 and v = 0", explain: "0, and the screen clears: the pull-down resistor joins pin 0 to GND." }
```

### Hold

### Let go

## Worked example: two paths to pin 0

```step
stage: investigate
insight: "Tracing what pin 0 is joined to in each state models the move: held, 3V wins through the button; up, the pull-down joins it to GND. Sam's 'nothing means 0' is planted after the method."
tasks:
  - check:
      type: question
      q: "While the button is held, pin 0 is joined to 3V through the button and to GND through the 10 kΩ pull-down. Why does it read 1?"
      options: ["The button joins it straight to 3V; the 10 kΩ only lets a tiny current leak to GND", "The pull-down switches off when the button is pressed", "Pin 0 adds the two voltages", "It doesn't: it reads 0"]
      answer: 0
      feedback: [null, "Resistors don't switch: it is still there.", "A pin reads one voltage, not a sum.", "Try it on the board."]
      explain: "The button is a direct join to 3.3 V. The big resistor to GND only lets about 0.3 mA through, so pin 0 stays at 3.3 V."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's doorbell sometimes rings when nobody has pressed it. Click the line where Sam's reasoning first goes wrong."
      answer: 2
      fault: logic
      misconception: floating-pin-reads-zero
      explain: "Line 2: a pin joined to nothing isn't at 0 V. It floats, picking up electrical noise from nearby wires and your hand, and reads 0 or 1 at random. That is the doorbell ringing by itself."
```

### What is pin 0 joined to?

```worked
\text{held: } 3\text{V} \to \text{button} \to \text{pin 0} :: The button joins pin 0 straight to 3.3 V.
\text{held: reads } 1 :: 3.3 V reads as 1.
\text{up: pin 0} \to 10\text{ k}\Omega \to \text{GND} :: The button is open; the pull-down joins pin 0 to GND.
\text{up: reads } 0 :: 0 V reads as 0.
```

Now: while the button is held, pin 0 is joined to both. Why does 3V win?

### Find the mistake

## Vary: no pull-down

```step
stage: modify
insight: "Taking the pull-down away shows Sam's mistake on the board: a floating pin reads at random. Putting it back shows what the resistor is for."
try: { playground: board, starter: "board.yml#vary", height: 540 }
tasks:
  - check: { type: board, text: "Remove the pull-down. Don't touch the button: watch pin 0 and the micro:bit.", when: "d = 0 and z = 1", explain: "Pin 0 reads 0 or 1 at random and the heart flickers: the pin is floating." }
  - check: { type: board, text: "Put the pull-down back. Is the reading steady again?", when: "d = 1 and z = 1 and p = 0 and v = 0", explain: "A steady 0 until you press. The pull-down gives the pin a definite voltage when the button is open." }
  - check:
      type: question
      q: "A game counts button presses with no pull-down. What will the score do?"
      options: ["Go up by itself, as random 1s count as presses", "Stay at 0 until the button is pressed", "Go down", "Count only real presses, just more slowly"]
      answer: 0
      feedback: [null, "A floating pin doesn't stay at 0.", "Nothing subtracts.", "It can't tell noise from presses."]
      explain: "Each random 0 → 1 looks exactly like a press."
```

### Float

### Pull it down

### A press counter

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Building the button circuit in Tinkercad with the same program checks the idea in a fuller simulator."
check: { type: reflect, text: "In Tinkercad: a micro:bit, a pushbutton from 3V to P0, and a 10 kΩ resistor from P0 to GND. Blocks: forever, if digital read pin P0 = 1 show a heart, else clear. I pressed the button in the simulation and saw the heart." }
```

## Practise: inputs

```step
stage: practise
insight: "Reading pins from what they are joined to, including a pull-up (the mirror image), and the program that reacts."
tasks:
  - check:
      type: question
      q: "Pin 1 is joined straight to GND. Digital read pin P1 gives…"
      options: ["0", "1", "It changes at random", "1023"]
      answer: 0
      feedback: [null, "GND is 0 V.", "It is joined to something definite: GND.", "That is an analog reading's top value."]
      explain: "Joined to 0 V, it reads 0."
  - check:
      type: question
      q: "Another way to wire it: the button joins pin 0 to GND, and a 10 kΩ pull-up joins pin 0 to 3V. What does pin 0 read while the button is held?"
      options: ["0", "1", "It floats", "0.5"]
      answer: 0
      feedback: [null, "The button now joins pin 0 to GND.", "The pull-up holds it, so it doesn't float.", "Digital reads are 0 or 1."]
      explain: "Held: joined to GND, reads 0. Up: the pull-up holds it at 1. The mirror image of a pull-down, and how many boards wire their buttons (Arduino's INPUT_PULLUP)."
```

### Pin to GND

### A pull-up

## Make: the doorbell program

```step
stage: make
insight: "Putting the program in order connects the reading to an action: read the pin, decide, show."
check:
  type: parsons
  code: "working.txt#program"
  text: "Put the program in order so the micro:bit shows a heart while the button is held, and nothing otherwise."
  explain: "Forever: read pin P0; if it is 1 show the heart, else clear the screen."
```

Then build it in Tinkercad, or on a real micro:bit with a button and a resistor on a breadboard.
