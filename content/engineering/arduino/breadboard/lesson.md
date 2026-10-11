---
order: 6
unit: hardware
title: From simulator to breadboard
summary: "A breadboard joins the five holes in each numbered column (a–e, and separately f–j) with a metal strip; the rails along the edges join along their length. Each leg of a part must be in a different strip, and the loop goes from strip to strip through the parts."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Real parts don't snap together like Tinkercad's. A breadboard holds them with hidden metal strips underneath. Put a leg in the wrong hole and the circuit quietly doesn't work. Which holes are joined?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8511
  url: http://127.0.0.1:8511/index.html
  readySelector: ".bbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Pin 13 → column 3 → resistor → column 7 → LED → column 8 → GND." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Hidden strips"
  say: "Under each column of five holes is a metal strip."
  clip:
    - caption: { text: "Click a hole: every hole joined to it lights up. Column 3, a to e, is one strip.", say: "Each column of five holes is joined." }
    - click: { selector: "[data-h='e3']" }
    - wait: 1600
    - caption: { text: "The wire, the resistor, the LED and the GND wire each join one strip to the next.", say: "The parts carry the loop from strip to strip." }
    - click: { selector: "[data-h='e7']" }
    - wait: 1600
    - expect: { selector: "#gnote", contains: "Highlighted" }
---
In a breadboard, **the five holes of each numbered column are joined** (a to e, and separately f to j: the gap down the middle splits them). The **rails** along the top and bottom are joined along the board's length: + for power, − for GND. Rows (a, b, c…) are **not** joined.

## Predict: one column

```step
stage: predict
insight: "Committing to what happens when both LED legs share a column tests the new move: legs in the same strip are joined to each other, so the current goes round the part."
check:
  type: predict
  q: "The LED's long leg is in c8 and its short leg in d8. The rest of the circuit is fine. The LED…"
  options: ["Stays dark: both legs are in the same strip, so the current goes round it", "Lights: both legs are in holes", "Lights dimly", "Burns out"]
  actual: "It stays dark. c8 and d8 are in the same strip (column 8), so the strip joins its two legs and the current takes the easy path round the LED."
```

## Try: find the strips

```step
stage: run
insight: "Clicking holes shows the strips directly, which settles the prediction; then students fix the LED by moving one leg."
try: { playground: board, starter: "board.yml#run", height: 620 }
tasks:
  - check: { type: board, text: "Click a hole in column 8. Which holes light up?", when: "q >= 1", explain: "a8 to e8: one strip. Both of the LED's legs are in it." }
  - check: { type: board, text: "Move the LED's short leg (−) so the LED lights.", when: "l = 1", explain: "With the short leg in column 9, where the GND wire is, the loop goes 13 → column 3 → resistor → column 8 → LED → column 9 → GND." }
```

### Look at column 8

### Fix it

Was your prediction right?

## Worked example: trace the strips

```step
stage: investigate
insight: "Tracing the loop strip by strip models the move; Sam's 'rows are joined' is planted after the method."
tasks:
  - check:
      type: question
      q: "Which holes are joined to a3?"
      options: ["b3, c3, d3 and e3", "a1 to a17", "Every hole in column 3, a to j", "None: each hole is separate"]
      answer: 0
      feedback: [null, "Rows aren't joined: columns are.", "The gap splits column 3 into a–e and f–j.", "The strips join them."]
      explain: "Column 3's top strip: a3 to e3."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam thinks this LED (long leg c7, short leg c8) is shorted out. It isn't. Click the line where Sam's reasoning first goes wrong."
      answer: 2
      fault: logic
      misconception: breadboard-rows
      explain: "Line 2: rows aren't joined. c7 is in column 7's strip and c8 in column 8's, so the LED's legs are in different strips: the loop goes through it."
```

### Strip by strip

```worked
\text{pin 13} \to \text{a3} :: The wire puts pin 13 into column 3's strip (a3–e3).
\text{resistor: b3} \to \text{b7} :: One leg in column 3, one in column 7: it joins the two strips.
\text{LED: c7 (+)} \to \text{c8 (−)} :: Long leg in column 7, short leg in column 8.
\text{d8} \to \text{GND} :: The GND wire takes column 8 back to the Uno.
\text{one loop, four strips} :: Every part bridges two strips; no part has both legs in one.
```

Now: which holes are joined to a3?

### Find the mistake

## Vary: the gap and the rails

```step
stage: modify
insight: "Two more pieces of breadboard: a part can straddle the gap (its legs in two strips), and the rails carry power and GND along the board."
try: { playground: board, starter: "board.yml#vary-gap", height: 620 }
tasks:
  - starter: "board.yml#vary-gap"
    check: { type: board, text: "This LED straddles the gap (e7 and f7), but stays dark. Move the GND wire so it lights.", when: "l = 1", explain: "The GND wire was in column 7's top strip, joined to the LED's long leg. In the bottom strip (f7–j7) it meets the short leg." }
  - starter: "board.yml#vary-rails"
    check: { type: board, text: "5V and GND are on the top rails. Move the free ends of W3 and W4 so the LED lights.", when: "l = 1 and r = 1", explain: "W3 from column 5 to the + rail, W4 from column 10 to the − rail: 5V → resistor → LED → GND." }
```

### Across the gap

### On the rails

## Build it for real

```step
stage: modify
tier: typical
insight: "Building the same circuit on a real breadboard and uploading the blink sketch is the step from simulator to hardware; the strips are the first thing to check when it doesn't work."
check: { type: reflect, text: "On a real breadboard: a 220 Ω resistor and an LED (long leg towards the resistor) from pin 13 to GND, exactly as on the board. I uploaded the blink sketch (Arduino IDE or Cloud Editor) and the LED blinked. If it didn't, I checked the strips first." }
```

Before you plug in the USB cable: check that 5V and GND are never in the same strip.

## Practise: which holes?

```step
stage: practise
insight: "Reading connectivity without the board, including the gap and the rails."
tasks:
  - check:
      type: question
      q: "A resistor has one leg in a12 and the other in a16. Which holes are joined to the second leg?"
      options: ["b16, c16, d16 and e16", "a12 to a16", "Every hole in row a", "f16 to j16"]
      answer: 0
      feedback: [null, "Rows aren't joined.", "Rows aren't joined.", "The gap splits the column."]
      explain: "Column 16's top strip."
  - check:
      type: question
      q: "A wire goes from 5V straight into the same strip as a wire from GND. What happens?"
      options: ["A short circuit: a huge current; unplug it at once", "Nothing: no parts are in the way", "The board turns off safely, no harm done", "The LED gets brighter"]
      answer: 0
      feedback: [null, "Nothing in the way is exactly the problem: nothing limits the current.", "It may protect itself, or it may be damaged: don't rely on it.", "No current goes through the LED: it takes the short way."]
      explain: "5V joined straight to GND has no resistance to limit the current."
```

### Which holes?

### A short

## Make: build it from scratch

```step
stage: make
insight: "Placing every part from scattered positions puts the whole idea together: each part bridges two strips, and the loop runs from pin 13 back to GND."
try: { playground: board, starter: "board.yml#make", height: 620 }
hint: ["Plan the strips first: pin 13's strip, a middle strip, a GND strip.", "Resistor from pin 13's strip to a new strip; LED long leg in that strip, short leg in the GND wire's strip.", "For example: resistor in i2 and i8, LED long leg in h8 and short leg in h4."]
check: { type: board, text: "The wires to pin 13 and GND are in. Place the resistor and the LED so the LED lights safely.", when: "l = 1 and r = 1 and z = 0", explain: "Pin 13's strip → resistor → a middle strip → LED (long leg first) → GND's strip." }
```
