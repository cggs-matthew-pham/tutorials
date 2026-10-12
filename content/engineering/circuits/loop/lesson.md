---
order: 1
unit: outputs
title: A complete loop
assumes: [electric-current]
summary: "Current only flows around a complete loop: out of pin 0, through the resistor and the LED, and back to GND. Break the loop anywhere, or turn the LED round, and the current stops everywhere at once."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You switch pin 0 on, but the LED stays dark. The code is right. What else has to be true for current to flow?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8501
  url: http://127.0.0.1:8501/index.html
  readySelector: ".cksvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A complete loop: pin 0, a resistor, an LED and back to GND." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Current needs a complete loop"
  say: "Current flows out of pin 0, round the loop, and back to GND."
  clip:
    - caption: { text: "Pin 0 is on, and the loop is complete: the LED lights.", say: "A complete loop, so the LED lights." }
    - wait: 1200
    - click: { selector: "#gpanel .oprow button:nth-of-type(3)" }
    - caption: { text: "Unclip the GND wire: the loop is broken, and the LED goes out.", say: "Break the loop anywhere, and the current stops." }
    - wait: 1800
    - expect: { selector: "#gnote", contains: "broken" }
    - click: { selector: "#gpanel .oprow button:nth-of-type(3)" }
    - caption: { text: "Clip it back: the current flows again.", say: "Close the loop, and it lights again." }
    - wait: 1500
    - expect: { selector: "#gsum", contains: "complete" }
---
In micro:bit Foundations the LEDs were already on the board. Now you wire your own: an **LED** (a light that lets current through one way), a **resistor** (it protects the LED; next lesson says how) and two wires to the micro:bit's **pins**. Pin 0 can be switched on (3.3 V) by code. **GND** is the micro:bit's ground, 0 V.

## Predict: unclip a wire

```step
stage: predict
insight: "Committing to what happens when the GND wire comes off tests the new move: current needs a complete loop, so breaking it anywhere stops it everywhere. The wrong options are the 'pin pushes power one way' picture."
check:
  type: predict
  q: "Pin 0 is on and the LED is lit. You unclip the wire from the LED to GND. The LED…"
  options: ["Goes out", "Stays lit: pin 0 still sends power to it", "Gets dimmer", "Gets brighter"]
  actual: "It goes out. With the GND wire off the loop is broken, so no current flows anywhere in it."
```

## Try: break the loop

```step
stage: run
insight: "Unclipping each wire in turn settles the prediction and shows it doesn't matter where the loop breaks; switching the pin off is a third way to stop the current."
try: { playground: board, starter: "board.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Unclip the GND wire. What happens to the LED?", when: "c = 1 and l = 0", explain: "It goes out: the current has no way back to GND, so it stops everywhere, even in the pin 0 wire." }
  - check: { type: board, text: "Clip GND back on, then unclip the pin 0 wire instead.", when: "w = 1 and c = 0 and l = 0", explain: "It goes out again. It doesn't matter where the loop is broken." }
  - check: { type: board, text: "Clip both wires on, then switch pin 0 off.", when: "k = 1 and o = 0 and l = 0", explain: "The loop is complete, but pin 0 is at 0 V, the same as GND, so nothing pushes current round. Code switches the pin; wires make the loop." }
```

### Unclip GND

### Unclip pin 0

### Switch the pin off

Was your prediction right?

## Worked example: follow the loop

```step
stage: investigate
insight: "Tracing the loop from pin to GND models the move; the questions apply it to a wire, the pin and a torch. Sam's 'one wire is enough' is planted after the method."
tasks:
  - check:
      type: question
      q: "The loop is complete and pin 0 is on. Where is the current smallest?"
      options: ["Nowhere: it is the same all the way round the loop", "In the GND wire, because the LED used it up", "In the pin 0 wire, before it reaches the LED", "In the resistor"]
      answer: 0
      feedback: [null, "The LED uses energy, not current: the same current comes back to GND.", "It is the same before and after.", "The resistor limits the current in the whole loop, not just in itself."]
      explain: "In a single loop the same current flows everywhere. Parts use energy (voltage), not current."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's LED never lights. Click the line where Sam's plan first goes wrong."
      answer: 2
      fault: logic
      misconception: one-wire-enough
      explain: "Line 2: pin 0 doesn't send power one way like a tap. Current flows round a loop, out of pin 0 and back into GND, so the GND wire is needed."
```

### Trace it

```worked
\text{pin 0 on: } 3.3\text{ V} :: Code switches pin 0 on. It is 3.3 V above GND.
\text{pin 0} \to \text{resistor} \to \text{LED} :: Current flows out of pin 0 through the resistor and the LED.
\text{LED} \to \text{GND } (0\text{ V}) :: It flows back into the micro:bit at GND.
\text{one loop, one current} :: The same current flows everywhere in the loop.
\text{any break} \Rightarrow 0 :: Unclip any wire, or switch the pin to 0 V, and the current is 0 everywhere.
```

Now apply it: where in the loop is the current smallest?

### Find the mistake

## Vary: the LED the wrong way round

```step
stage: modify
insight: "Turning the LED round is a break that looks like a complete loop: an LED is a one-way valve. It is the most common wiring slip."
try: { playground: board, starter: "board.yml#vary", height: 540 }
tasks:
  - check: { type: board, text: "Turn the LED round, with both wires clipped and pin 0 on.", when: "f = 1 and k = 1 and o = 1 and l = 0", explain: "It goes out. An LED only lets current through one way: the long leg (the triangle's flat side) towards pin 0." }
  - check:
      type: question
      q: "Every wire is clipped and pin 0 is on, but the LED is dark. Which is the best first thing to check?"
      options: ["Which way round the LED is", "Whether the code is right", "Whether the micro:bit is broken", "Whether the resistor is too big"]
      answer: 0
      feedback: [null, "Pin 0 is on, so the code has done its job.", "Check the cheap, likely slips first.", "Even a big resistor lets a little current through: the LED glows dimly."]
      explain: "With the loop complete and the pin on, a backwards LED is the most likely slip."
```

### Turn it round

### Check first

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Building the same loop in Tinkercad Circuits checks the idea against a fuller simulator, and gets students used to the tool before the Arduino lessons."
check: { type: reflect, text: "In Tinkercad Circuits: a micro:bit, a 220 Ω resistor and an LED, wired pin 0 → resistor → LED → GND, with blocks to switch pin 0 on (digital write pin P0 to 1). Start the simulation, then move the GND wire off and back. I saw the LED go out and come back." }
```

Your teacher will give you the class code. Long leg of the LED towards the resistor and pin 0.

## Practise: loops

```step
stage: practise
insight: "Spotting complete and broken loops in words, including the backwards LED and a pin at 0 V."
tasks:
  - check:
      type: question
      q: "Which of these lights the LED?"
      options: ["Pin 0 on → resistor → LED (long leg first) → GND", "Pin 0 on → resistor → LED (long leg first), with no wire to GND", "Pin 0 on → resistor → LED (short leg first) → GND", "Pin 0 off → resistor → LED (long leg first) → GND"]
      answer: 0
      feedback: [null, "No way back to GND: the loop is broken.", "The LED is backwards.", "Pin 0 is at 0 V, the same as GND: nothing pushes the current."]
      explain: "Only the first is a complete loop, the right way round, with the pin on."
  - check:
      type: question
      q: "A torch has a battery, a switch and a bulb. Turning the switch off…"
      options: ["Breaks the loop, so no current flows anywhere", "Stops the battery making electricity", "Keeps the current in the battery until you need it", "Only stops current in the bulb"]
      answer: 0
      feedback: [null, "The battery still has the same voltage; nothing flows because the loop is open.", "Current isn't stored in the wires.", "It stops everywhere: a loop has one current."]
      explain: "A switch is a deliberate break in the loop."
```

### Which lights?

### A torch

## Make: fix the circuit

```step
stage: make
insight: "Fixing a circuit with three faults reverses the process: students diagnose a dark LED from the loop rule, the one-way LED and the pin."
try: { playground: board, starter: "board.yml#make", height: 540 }
hint: ["There are three faults. Check each part of the loop in turn.", "Is every wire clipped? Is the LED the right way round? Is the pin on?", "Clip GND, turn the LED round and switch pin 0 on."]
check: { type: board, text: "This LED won't light. Find and fix every fault.", when: "l = 1", explain: "A wire off, the LED backwards and the pin off: three different reasons for the same dark LED. Check the loop first, then the parts, then the code." }
```
