---
order: 1
unit: uno
title: Same circuit, new board
summary: "An Arduino Uno names its pins by number, and the code must use the number of the pin the wire goes to. pinMode sets a pin as an output; digitalWrite switches it HIGH or LOW. The circuit ideas from the micro:bit carry straight over."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Most electronics kits, sensors and project guides assume an Arduino. The circuits are the ones you already know. What changes is the board, and then the language."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8505
  url: http://127.0.0.1:8505/index.html
  readySelector: ".ardsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "An Uno with an LED and its resistor on pin 13, and the sketch that blinks it." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "The pin in the code must match the wire"
  say: "The LED is wired to pin twelve."
  clip:
    - caption: { text: "The LED is wired to pin 12, but the sketch uses pin 13.", say: "The wire goes to pin twelve, the code says thirteen." }
    - click: "Upload and run"
    - wait: 2200
    - caption: { text: "Pin 13 blinks, but nothing is wired to it, so the LED stays dark.", say: "Pin thirteen blinks, but nothing is on it." }
    - wait: 1200
    - expect: { selector: "#gnote", contains: "Running" }
---
This is an **Arduino Uno**. Like the micro:bit it has pins, but they are named by **number** (0 to 13, plus A0 to A5), and it is programmed in **C++**. The board on this page runs the sketches for you; in Tinkercad Circuits you can build the same thing with blocks and see the C++ beside them.

```cpp
void setup() {
  pinMode(13, OUTPUT);     // pin 13 is an output
}

void loop() {
  digitalWrite(13, HIGH);  // pin 13 on (5 V)
  delay(500);              // wait half a second
  digitalWrite(13, LOW);   // pin 13 off (0 V)
  delay(500);
}
```

## Predict: which pin?

```step
stage: predict
insight: "Committing to what happens when the code names a different pin from the wire tests the new move: pin numbers in code must match the wiring. The wrong options are the 'code works whatever pin' picture."
check:
  type: predict
  q: "The LED (with its resistor) is wired to pin 12. The sketch above uses pin 13. When it runs, the LED…"
  options: ["Stays dark", "Blinks: the code makes it blink", "Stays on", "Blinks, but dimly"]
  actual: "It stays dark. Pin 13 blinks, but nothing is wired to it. The LED is on pin 12, which the code never switches."
```

## Try: run it

```step
stage: run
insight: "Running the sketch settles the prediction: the board shows pin 13 not wired, and the LED on pin 12 never changes."
try: { playground: board, starter: "board.yml#run", height: 640 }
check: { type: board, text: "Upload and run the sketch. What does the LED on pin 12 do?", when: "t >= 1 and h = 0", explain: "Nothing: the sketch switches pin 13, and the LED is on pin 12." }
```

## Worked example: read the pins

```step
stage: investigate
insight: "Reading each line for its pin number models the move: every pin number must be the wired pin. Sam's half-changed sketch is planted after the method, with its real symptom (a dim glow from the pull-up)."
tasks:
  - check:
      type: question
      q: "Which lines must change so the sketch blinks the LED on pin 12?"
      options: ["All three: pinMode and both digitalWrite lines", "Only pinMode", "Only the first digitalWrite", "None: change the wire instead"]
      answer: 0
      feedback: [null, "pinMode sets the pin up, but the digitalWrite lines still switch 13.", "The LOW line would still switch 13.", "Moving the wire to 13 also works, but the question asks about the code."]
      explain: "Every line that names a pin must name 12: setting it up, switching it on and switching it off."
  - check:
      type: bug
      code: "sketch.ino#sam"
      text: "Sam's LED is on pin 13. It doesn't blink: it just glows very dimly now and then. Click the line where Sam's sketch goes wrong."
      answer: 2
      fault: logic
      misconception: code-any-pin
      explain: "Line 2: pin 13 was never set as an OUTPUT (pin 12 was). Writing HIGH to a pin that is still an input only switches on its weak pull-up, so the LED glows dimly instead of lighting."
```

### Every pin number

```worked
\text{pinMode(13, OUTPUT)} :: Sets pin 13 up as an output. Pin 13, not the LED's pin 12.
\text{digitalWrite(13, HIGH)} :: Switches pin 13 to 5 V. Nothing is wired there.
\text{digitalWrite(13, LOW)} :: Switches pin 13 back to 0 V.
\text{LED on pin 12} :: Pin 12 is never set up or switched, so the LED stays dark.
\text{fix: 12 in every line} :: Or move the wire to pin 13. Code and wiring must agree.
```

Now find every line to change.

### Find the mistake

## Vary: change the pin

```step
stage: modify
insight: "Changing every pin number in the code, then running it, applies the move directly."
try: { playground: board, starter: "board.yml#vary", height: 640 }
check: { type: board, text: "Change the sketch so the LED on pin 12 blinks. Upload and run it.", when: "h >= 2 and m = 1", explain: "With 12 in all three lines, pin 12 is an output and switches on and off." }
hint: ["Three lines name a pin.", "pinMode(12, OUTPUT); digitalWrite(12, HIGH); digitalWrite(12, LOW);"]
```

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Building the circuit on an Uno in Tinkercad with blocks, then opening the Blocks + Text view, shows that the blocks are this C++."
check: { type: reflect, text: "In Tinkercad: an Arduino Uno, a 220 Ω resistor and an LED on pin 12 to GND. In Code › Blocks, blink pin 12. Then switch to Blocks + Text. I found pinMode and digitalWrite in the C++ beside my blocks." }
```

## Practise: pins

```step
stage: practise
insight: "Reading pin numbers and modes in short sketches, with the pull-up glow as the symptom of a missing pinMode."
tasks:
  - check:
      type: question
      q: "A buzzer is wired to pin 8. Which line sets it up?"
      options: ["pinMode(8, OUTPUT);", "pinMode(OUTPUT, 8);", "digitalWrite(8, OUTPUT);", "pinMode(8);"]
      answer: 0
      feedback: [null, "The pin comes first, then the mode.", "digitalWrite switches a pin; pinMode sets it up.", "pinMode needs a mode too."]
      explain: "pinMode(pin, mode): pin 8, as an OUTPUT."
  - check:
      type: question
      q: "An LED glows very dimly instead of lighting, and the pin numbers all match. What is the most likely cause?"
      options: ["The pin was never set with pinMode(pin, OUTPUT)", "The resistor is too small", "The LED is the wrong way round", "delay is too short"]
      answer: 0
      feedback: [null, "A small resistor makes it brighter, not dimmer.", "Backwards, it would not light at all.", "Timing changes the blink, not the brightness."]
      explain: "HIGH on a pin left as an input only turns on its weak pull-up: a faint glow."
```

### Set up a pin

### A dim glow

## Make: your own sketch

```step
stage: make
insight: "Writing pinMode and digitalWrite from scratch for a new pin puts the lesson's two lines together without a model to copy."
try: { playground: board, starter: "board.yml#make", height: 640 }
hint: ["setup() runs first: set the pin up there.", "pinMode(7, OUTPUT); in setup(), digitalWrite(7, HIGH); in loop().", "Every line ends with ;"]
check: { type: board, text: "The LED is wired to pin 7. Write the sketch to switch it on (and keep it on).", when: "l = 255 and m = 1", explain: "pinMode(7, OUTPUT) in setup(), digitalWrite(7, HIGH) in loop()." }
```
