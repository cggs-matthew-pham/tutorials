---
order: 1
unit: drive
title: Why a motor can't run from a pin
summary: "A pin is a signal, not a power supply: it can give about 20 mA, and a motor needs hundreds. The pin switches a transistor, and the transistor switches the motor's own battery. A diode across the motor catches the spike when it switches off."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "An LED on pin 9 lights perfectly. Swap it for a small motor, change nothing else, and nothing happens, except maybe a damaged Arduino. What's different?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8513
  url: http://127.0.0.1:8513/index.html
  readySelector: ".mtsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Pin 9 switches a transistor; the battery drives the motor." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "A signal, not a supply"
  say: "A pin can give about twenty milliamps."
  clip:
    - click: "Switch pin 9 on or off"
    - caption: { text: "Straight from the pin: the motor needs about 700 mA to start. It doesn't turn.", say: "The motor needs far more than the pin can give." }
    - wait: 1600
    - click: "Use a transistor and a battery"
    - caption: { text: "Now the pin only switches a transistor (4 mA). The battery drives the motor.", say: "The pin switches; the battery powers." }
    - wait: 1600
    - expect: { selector: "#gsum", contains: "motor turning" }
---
Current is measured in milliamps (mA). An Uno pin can safely give **about 20 mA**, and **40 mA at most**. An LED needs about 10. A small 6 V gear motor draws **about 150 mA** turning, and **about 700 mA** as it starts.

## Predict: motor on a pin

```step
stage: predict
insight: "Committing to what a motor does on a pin tests the new move: the code can be perfect and the motor still can't run, because the pin can't supply the current."
check:
  type: predict
  q: "A small motor is wired from pin 9 to GND. The sketch sets pin 9 HIGH. The motor…"
  options: ["Doesn't turn (or barely twitches), and the pin may be damaged", "Turns at full speed", "Turns slowly", "Turns, but the LED code needs changing first"]
  actual: "It doesn't turn: it needs about 700 mA to start and the pin gives about 20. Asking a pin for far more than 40 mA can damage it."
```

## Try: wire it straight

```step
stage: run
insight: "Switching the pin on with the motor wired straight to it settles the prediction and shows the numbers: the current asked for and the current a pin can give."
try: { playground: board, starter: "board.yml#run", height: 560 }
check: { type: board, text: "Switch pin 9 on. Does the motor turn? Compare the current it asks for with what a pin can give.", when: "o = 1 and x = 1", explain: "It asks for about 700 mA; a pin gives about 20. Nothing in the code can change that." }
```

## Worked example: the pin only switches

```step
stage: investigate
insight: "Following both paths, the small control current and the big motor current, models the move. Sam's 'the code must be wrong' is planted after the method."
tasks:
  - check:
      type: number
      q: "The motor needs 700 mA to start. A pin can safely give 20 mA. How many times too much is that?"
      answer: 35
      feedback:
        - [680, "Divide, don't subtract."]
      explain: "700 ÷ 20 = 35 times what a pin should give."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's motor won't turn on pin 9. Click the line where Sam's reasoning first goes wrong."
      answer: 1
      fault: logic
      misconception: code-runs-motor
      explain: "Line 1: an LED needs about 10 mA, a motor hundreds. The pin can't supply it, so no code will fix it: it needs a transistor or driver and its own supply."
```

### Two currents

```worked
\text{pin 9} \to 1\text{ k}\Omega \to \text{transistor} :: The pin gives about 4 mA, only to switch the transistor on.
\text{battery +} \to \text{motor} \to \text{transistor} :: The motor's 150–700 mA comes from the battery.
\text{transistor} \to \text{battery −}, \text{GND} :: Both currents return to the same ground.
\text{pin: } 4\text{ mA} \ll 20\text{ mA} \;\checkmark :: The pin is safe; the motor has all it needs.
```

Now: how far over is a pin when it tries to run the motor itself?

### Find the mistake

## Vary: switch it off

```step
stage: modify
insight: "Switching the motor off without a diode shows the second hazard (the coil's voltage spike); fitting the diode removes it."
try: { playground: board, starter: "board.yml#vary", height: 560 }
tasks:
  - check: { type: board, text: "Switch the motor on, then off. What does the board warn you about?", when: "z = 1", explain: "A motor is a coil: when its current is cut, it makes a voltage spike much bigger than 6 V that can damage the transistor." }
  - check: { type: board, text: "Fit the diode, then switch the motor on and off again.", when: "f = 1 and o = 0", explain: "The diode (across the motor, pointing back to +) gives the spike a safe path round the motor. Motor drivers usually have these built in." }
```

### Switch off

### Fit the diode

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Tinkercad has a DC motor, an NPN transistor, a diode and a battery pack, so students build the real circuit and see the motor's current on a multimeter."
check: { type: reflect, text: "In Tinkercad: pin 9 → 1 kΩ → the base of an NPN transistor; a 4 × AA pack's + → motor → collector; emitter → battery − and Uno GND; a diode across the motor. A multimeter in the motor's loop showed far more than 20 mA." }
```

## Practise: which can a pin drive?

```step
stage: practise
insight: "Sorting parts by the current they need applies the 20 mA rule."
check:
    type: sort
    q: "Sort each part: straight from a pin, or through a transistor or driver?"
    options: ["Straight from a pin (with a resistor if it needs one)", "Through a transistor or driver"]
    items:
      - ["An LED with a 220 Ω resistor (about 15 mA)", "Straight from a pin (with a resistor if it needs one)"]
      - ["A small DC gear motor (150 mA running)", "Through a transistor or driver"]
      - ["A piezo buzzer (a few mA)", "Straight from a pin (with a resistor if it needs one)"]
      - ["A 12 V LED strip (500 mA)", "Through a transistor or driver"]
      - ["A servo's signal wire (its power from 5V)", "Straight from a pin (with a resistor if it needs one)"]
    explain: "Anything over about 20 mA needs its own supply, switched by the pin. A servo's signal wire carries almost no current; its power wire goes to a supply."
```

## Make: wire it safely

```step
stage: make
insight: "Choosing the wiring and protection from a dangerous starting point brings both hazards together."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["Two problems: the pin's current, and the spike at switch-off.", "Use a transistor and a battery, and fit the diode.", "Then switch the motor on."]
check: { type: board, text: "Change this circuit so the motor runs with the pin safe and the transistor protected.", when: "w = 1 and f = 1 and m = 1", explain: "The pin switches a transistor, the battery drives the motor, and the diode catches the switch-off spike." }
```
