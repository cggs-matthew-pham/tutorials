---
order: 3
unit: drive
title: Two supplies, one ground
summary: "The motor gets its own battery, but the grounds must be joined: a signal is a voltage compared with ground, so the driver can't read the Uno's pins without a shared 0 V. Powering the motor from the Uno's own 5V pulls it down when the motor starts, and the Uno resets."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The motor has its own battery, the Uno has USB, every wire is checked, and the motor does nothing. Or the motor runs, and the Arduino keeps restarting. What's missing?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8515
  url: http://127.0.0.1:8515/index.html
  readySelector: ".mtsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Two supplies, one ground: the Uno's GND and the battery's − are joined at the driver." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "A shared 0 V"
  say: "A signal is a voltage compared with ground."
  clip:
    - click: "Start the motor"
    - caption: { text: "Grounds not joined: the driver can't tell what 5 V on pin 9 means. Nothing happens.", say: "Without a shared ground, the signal means nothing." }
    - wait: 1800
    - click: "Join / unjoin the grounds"
    - caption: { text: "Join the grounds: the driver reads the signal and the motor starts.", say: "Join the grounds, and it works." }
    - wait: 1500
    - expect: { selector: "#gsum", contains: "joined" }
---
A voltage is always **between two points**. "Pin 9 is at 5 V" means 5 V *above the Uno's GND*. A driver on another supply measures against **its** ground, so unless the two grounds are joined, it can't read the Uno's signal at all.

## Predict: separate supplies

```step
stage: predict
insight: "Committing to what happens with unjoined grounds tests the new move before the board shows it."
check:
  type: predict
  q: "The Uno is on USB; the driver and motor are on a battery. Pin 9 goes to the driver's ENA, but the Uno's GND isn't joined to the driver. When pin 9 goes HIGH, the motor…"
  options: ["Doesn't respond (or behaves erratically)", "Runs normally: it has its own battery", "Runs backwards", "Runs at half speed"]
  actual: "It doesn't respond reliably. The driver measures pin 9 against its own ground, which has no fixed relation to the Uno's, so the signal means nothing to it."
```

## Try: join the grounds

```step
stage: run
insight: "Starting the motor before and after joining the grounds settles the prediction."
try: { playground: board, starter: "board.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "Start the motor. What happens?", when: "t = 1 and g = 0 and m = 0", explain: "Nothing: the driver can't read pin 9 without a shared ground." }
  - check: { type: board, text: "Join the grounds.", when: "g = 1 and m = 1", explain: "With one shared 0 V, pin 9's 5 V means HIGH to the driver too." }
```

### Start it

### Join them

## Worked example: what each supply does

```step
stage: investigate
insight: "Separating the two jobs (signal and power) and the one shared thing (ground) models the move. Sam's 'separate means unconnected' is planted after the method."
tasks:
  - check:
      type: question
      q: "Which wires join the two halves of the circuit?"
      options: ["The signal wires (pin to driver) and one ground wire", "None: they must stay separate", "The Uno's 5V to the battery's +", "Only the signal wires"]
      answer: 0
      feedback: [null, "Then the signals mean nothing.", "Never join two different supplies' + sides.", "The signals need a shared ground to be read."]
      explain: "Signals plus a common ground; the + sides stay separate."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's motor never responds. Click the line where Sam's reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: separate-supplies-no-ground
      explain: "Line 3: separate supplies are fine, but the grounds must be joined so both sides agree on 0 V. Only the + sides stay apart."
```

### Signal, power, ground

```worked
\text{Uno (USB)} :: Runs the code and makes the signals: pins at 0 V or 5 V above the Uno's GND.
\text{battery} \to \text{driver} \to \text{motor} :: The big current. Never through the Uno.
\text{GND} \leftrightarrow \text{battery −} :: One shared 0 V, so the driver reads 5 V on pin 9 as HIGH.
\text{5V} \not\leftrightarrow \text{battery +} :: The + sides stay separate.
```

Now pick the wires that join the two halves.

### Find the mistake

## Vary: power from the Uno

```step
stage: modify
insight: "Running the motor from the Uno's own 5V shows the other half of the rule: big currents pull the board's supply down and reset it."
try: { playground: board, starter: "board.yml#vary", height: 560 }
tasks:
  - check: { type: board, text: "This motor runs from the Uno's 5V. Start it.", when: "r >= 1", explain: "The motor's starting current dragged the Uno's 5V down, and the Uno reset: the code starts again from setup()." }
  - check: { type: board, text: "Give the motor its own battery (grounds joined) and start it again.", when: "p = 1 and g = 1 and m = 1", explain: "Separate power, shared ground: the motor runs and the Uno stays up." }
```

### From 5V

### Its own battery

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "In Tinkercad, removing the ground wire between the Uno and the driver's battery shows the same failure in a fuller simulator."
check: { type: reflect, text: "In Tinkercad, with the L293D circuit from Motor drivers: I removed the wire joining the Uno's GND to the battery's −, ran it, then put it back. I saw the difference." }
```

## Practise: grounds

```step
stage: practise
insight: "Applying the rule to new systems."
tasks:
  - check:
      type: question
      q: "A robot's Uno runs on a 9 V battery and its motors on a 6 V pack. Which wires should be joined?"
      options: ["The two batteries' − terminals (the grounds)", "The two batteries' + terminals", "All four terminals", "Nothing"]
      answer: 0
      feedback: [null, "That joins two different voltages: current flows between them.", "That shorts both batteries.", "Then the signals can't be read."]
      explain: "Join the grounds only."
  - check:
      type: question
      q: "A robot resets every time it starts to move. What is the most likely cause?"
      options: ["The motors draw from the board's supply and pull it down", "The code has a bug in setup()", "The grounds are joined", "The motors are wired backwards"]
      answer: 0
      feedback: [null, "Possible, but the timing points at power.", "Joined grounds are correct.", "Backwards motors just turn the wrong way."]
      explain: "Resets that happen when motors start are almost always a supply sagging."
```

### Which wires?

### Resets

## Make: fix the robot

```step
stage: make
insight: "Fixing both supply faults from one broken starting point brings the lesson together."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["Two faults: where the motor's power comes from, and the ground.", "Battery power for the motor, and join the grounds.", "Then start it."]
check: { type: board, text: "This robot resets and its driver can't read the Uno. Fix both, then start the motor.", when: "p = 1 and g = 1 and m = 1", explain: "Its own supply for the motor, one shared ground." }
```
