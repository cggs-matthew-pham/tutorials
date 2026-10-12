---
order: 2
unit: outputs
title: Why the resistor
assumes: [electric-current]
summary: "With no resistor, far too much current flows and the LED is damaged. A resistor limits the current: current = voltage ÷ resistance (Ohm's law). Bigger resistor, less current. In a single loop it works on either side of the LED."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Every LED circuit in every kit has a small striped part next to the LED. Leave it out and the LED works brilliantly, for about a second. What is it doing?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8502
  url: http://127.0.0.1:8502/index.html
  readySelector: ".cksvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "No resistor: about 100 mA, five times what the LED can take." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "The resistor limits the current"
  say: "The resistor limits how much current flows."
  clip:
    - caption: { text: "With 220 Ω, about 6 mA flows: safely under the LED's 20 mA.", say: "Two hundred and twenty ohms gives about six milliamps." }
    - wait: 1200
    - click: "Take the resistor out"
    - caption: { text: "Take it out: about 100 mA. A real LED would be damaged.", say: "With no resistor, far too much current flows." }
    - wait: 1800
    - click: "Use a 1 kΩ resistor"
    - caption: { text: "1 kΩ: about 1.3 mA. More ohms, less current, a dimmer LED.", say: "A bigger resistor means less current." }
    - wait: 1500
    - expect: { selector: "#gsum", contains: "1.3 mA" }
---
**Current** is measured in milliamps (mA). An LED is damaged above about **20 mA**. **Resistance** is measured in ohms (Ω): the more ohms, the harder it is for current to flow.

## Predict: no resistor

```step
stage: predict
insight: "Committing to what happens without the resistor tests the new move before it is taught: the resistor is what limits the current."
check:
  type: predict
  q: "You take the resistor out and join the LED straight to pin 0. What happens?"
  options: ["Far too much current flows, and the LED is damaged", "The LED is brighter, and that's fine", "The LED goes out: the loop is broken", "Nothing changes: the resistor does nothing"]
  actual: "Far too much current: about 100 mA, five times the LED's limit. The resistor is what keeps the current safe."
```

## Try: choose a resistor

```step
stage: run
insight: "Removing the resistor settles the prediction; trying the sizes in turn shows the pattern: more ohms, less current."
try: { playground: board, starter: "board.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "Choose no resistor. What does the board say?", when: "r = 0 and x = 1", explain: "About 100 mA: far over 20 mA. Only the wires and the pin's own resistance are left to limit it." }
  - check:
      type: number
      q: "Try 47 Ω, 100 Ω, 220 Ω and 1 kΩ. Which is the smallest resistor that keeps the current under 20 mA (in ohms)?"
      answer: 100
      feedback:
        - [47, "Look at the current with 47 Ω: is it under 20 mA?"]
        - [220, "220 Ω is safe, but is there a smaller one that is safe too?"]
      explain: "100 Ω gives 13 mA; 47 Ω gives about 28 mA, too much."
```

### No resistor

### Smallest safe resistor

## Worked example: how much current?

```step
stage: investigate
insight: "Ohm's law with the LED's 2 V taken off models the move with numbers; the faded tasks apply it to 470 Ω, then reverse it to find the smallest safe resistor. Sam's 'resistor first' idea is planted after the method."
tasks:
  - check:
      type: number
      q: "Now 470 Ω. How many milliamps? (1 decimal place)"
      answer: 2.8
      tolerance: 0.05
      feedback:
        - [7, "That is 3.3 ÷ 470. The LED takes 2 V first: use 1.3 V."]
        - [0, "Times by 1000 to turn amps into milliamps."]
      explain: "1.3 ÷ 470 = 0.00277 A ≈ 2.8 mA."
  - check:
      type: number
      q: "Work backwards: what resistance gives exactly 20 mA (0.02 A)? (ohms)"
      answer: 65
      tolerance: 0.5
      feedback:
        - [165, "That uses 3.3 V. The resistor only has 1.3 V across it."]
        - [26, "Divide the volts by the current: 1.3 ÷ 0.02."]
      explain: "R = 1.3 ÷ 0.02 = 65 Ω. Anything bigger is safe; kits use 220 Ω to leave a margin."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam is sure a resistor after the LED won't protect it. Click the line where Sam's reasoning first goes wrong."
      answer: 2
      fault: logic
      misconception: resistor-before-led
      explain: "Line 2: in a single loop the current is the same everywhere. It doesn't arrive at the LED first and then slow down: the resistor limits the current in the whole loop, wherever it sits."
```

### Ohm's law with an LED

```worked
3.3 - 2 = 1.3\text{ V} :: Pin 0 gives 3.3 V. The LED uses about 2 V, so 1.3 V is left across the resistor.
I = \frac{V}{R} = \frac{1.3}{220} :: Ohm's law: current = voltage ÷ resistance.
I = 0.0059\text{ A} :: In amps.
0.0059 \times 1000 = 5.9\text{ mA} :: Times 1000 for milliamps.
5.9 < 20 \;\checkmark :: Under the LED's 20 mA: safe.
```

Now do the same for 470 Ω.

### Work backwards

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "Moving the resistor tests Sam's idea on the board; a very large resistor shows the other limit: too little current, and the LED barely glows."
try: { playground: board, starter: "board.yml#vary", height: 560 }
tasks:
  - check: { type: board, text: "With 220 Ω, move the resistor after the LED. Does the current change?", when: "b = 0 and r = 220 and l = 1", explain: "No: 5.9 mA either way. One loop, one current." }
  - check: { type: board, text: "Now try 10 kΩ. Is the LED still lit?", when: "r = 10000 and l = 1", explain: "Only just: 0.13 mA. Too big a resistor is safe but too dim to be useful." }
```

### Move it

### Very big

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "In Tinkercad the same circuit gives a warning without the resistor, and a multimeter shows the current, so students check the model against a fuller simulator."
check: { type: reflect, text: "In Tinkercad: take out the resistor and run it (look for the warning on the LED). Then put in 220 Ω and add a multimeter set to A in the loop. I compared its reading with my 5.9 mA." }
```

Tinkercad's LED and pin are not exactly the board's model, so expect close, not identical, numbers.

## Practise: Ohm's law

```step
stage: practise
insight: "Ohm's law forwards and backwards, with the LED's 2 V taken off, and a review of the loop."
tasks:
  - check:
      type: number
      q: "1 kΩ (1000 Ω): how many milliamps? (1 decimal place)"
      answer: 1.3
      tolerance: 0.05
      feedback:
        - [3.3, "Take off the LED's 2 V first."]
      explain: "1.3 ÷ 1000 = 0.0013 A = 1.3 mA."
  - check:
      type: number
      q: "You want 10 mA (0.01 A). What resistance? (ohms)"
      answer: 130
      tolerance: 0.5
      feedback:
        - [330, "Use the 1.3 V left after the LED, not 3.3 V."]
      explain: "1.3 ÷ 0.01 = 130 Ω."
  - check:
      type: question
      q: "Review: the LED is dark with a 220 Ω resistor in the loop. Which is NOT a likely cause?"
      options: ["The resistor is too big", "The LED is the wrong way round", "The GND wire is off", "Pin 0 is off"]
      answer: 0
      feedback: [null, "That is a common cause.", "That breaks the loop.", "Then nothing pushes the current."]
      explain: "220 Ω still gives about 6 mA: plenty to see."
```

### 1 kΩ

### Choose for 10 mA

### Review: dark LED

## Make: choose and place

```step
stage: make
insight: "Choosing a resistor for a target current and placing it after the LED applies both ideas from the lesson at once."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["Work out the resistance for 2 mA and for 10 mA: the answer is between them.", "1.3 ÷ 0.01 = 130 Ω and 1.3 ÷ 0.002 = 650 Ω.", "220 Ω or 470 Ω, then Move the resistor."]
check: { type: board, text: "A battery-saving night light: between 2 mA and 10 mA, with the resistor after the LED.", when: "i >= 2 and i <= 10 and b = 0", explain: "220 Ω (5.9 mA) or 470 Ω (2.8 mA), and either side of the LED works." }
```
