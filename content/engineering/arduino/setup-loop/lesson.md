---
order: 2
unit: uno
title: Reading the C++
summary: "Every sketch has two parts: setup() runs once when the board starts, then loop() runs again and again for ever. delay(ms) waits that many milliseconds, so the delays set the timing of a blink."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "MakeCode had 'on start' and 'forever'. An Arduino sketch has the same two parts, written as C++. Which part runs when, and how many times?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8506
  url: http://127.0.0.1:8506/index.html
  readySelector: ".ardsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "setup() sets pin 13 up once; loop() blinks it for ever." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "setup() once, loop() for ever"
  say: "Watch the counters at the top."
  clip:
    - caption: { text: "setup() runs once: it sets pin 13 up as an output.", say: "Setup runs once, when the board starts." }
    - click: "Upload and run"
    - wait: 1600
    - caption: { text: "loop() runs again and again: on for 500 ms, off for 500 ms.", say: "Then loop runs again and again, for ever." }
    - wait: 2600
    - expect: { selector: ".ardsvg", contains: "setup() ran 1 time" }
---
| MakeCode | Arduino C++ |
|---|---|
| on start | `void setup() { … }` |
| forever | `void loop() { … }` |
| pause (ms) | `delay(ms);` |

The lines inside `{ }` belong to that part, and each statement ends with `;`.

## Predict: how many times?

```step
stage: predict
insight: "Committing to how often setup() runs tests the new move before the counters show it."
check:
  type: predict
  q: "The blink sketch runs for 10 seconds. How many times does setup() run?"
  options: ["Once", "Every time loop() runs", "Twice", "Never: only loop() runs"]
  actual: "Once, when the board starts. Then loop() runs again and again: 10 times in 10 seconds here, as each loop takes 1 s."
```

## Try: watch the counters

```step
stage: run
insight: "The counters settle the prediction: setup() stays at 1 while loop() climbs, one per second."
try: { playground: board, starter: "board.yml#run", height: 640 }
check: { type: board, text: "Upload and run the blink. Watch the counters above the board for a few seconds.", when: "t >= 3 and s = 1", explain: "setup() ran once; loop() runs once a second (500 ms on, 500 ms off) and keeps going." }
```

## Worked example: time it

```step
stage: investigate
insight: "Tracing board time line by line models how delay sets timing; Sam's blink in setup() is planted after the method."
tasks:
  - check:
      type: trace
      text: "Fill in the board time after each line of loop(), starting at 0 ms."
      table: |
        | line | LED | time (ms) |
        | digitalWrite(13, HIGH); | on | 0 |
        | delay(500); | on | [500] |
        | digitalWrite(13, LOW); | off | [500] |
        | delay(500); | off | [1000] |
      explain: "Only delay takes time: the LED is on from 0 to 500 ms and off from 500 to 1000 ms, then loop() starts again."
  - check:
      type: question
      q: "Sam put the blink lines in setup() and left loop() empty (below). What does the LED do?"
      options: ["Blinks once, then stays off", "Blinks for ever", "Never lights", "Stays on"]
      answer: 0
      feedback: [null, "setup() runs only once.", "It does light, once.", "The LOW line switches it off."]
      fault: logic
      misconception: setup-repeats
      explain: "setup() runs once, so the LED blinks once. Anything that should repeat goes in loop()."
```

### Board time

```worked
\text{setup(): pinMode(13, OUTPUT)} :: Runs once, at 0 ms. Pin 13 is now an output.
\text{loop(): digitalWrite(13, HIGH)} :: LED on. Writing takes (almost) no time.
\text{delay(500)} :: Wait 500 ms with the LED on.
\text{digitalWrite(13, LOW); delay(500)} :: LED off for 500 ms.
\text{end of loop()} \to \text{start of loop()} :: 1000 ms per blink, for ever.
```

Now fill in the times.

### Sam's blink

```cpp
void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}

void loop() {
}
```

## Vary: change the timing

```step
stage: modify
insight: "Changing one delay at a time shows each delay sets one part of the blink."
try: { playground: board, starter: "board.yml#vary", height: 640 }
tasks:
  - check: { type: board, text: "Make it blink twice as fast.", when: "o = 250 and f = 250", explain: "Halve both delays: 250 ms on, 250 ms off." }
  - check: { type: board, text: "Now a flash: on for 100 ms, off for 900 ms.", when: "o = 100 and f = 900", explain: "The first delay is the on time and the second the off time; the blink still takes 1 s." }
```

### Twice as fast

### A flash

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "In Tinkercad's Text view students edit the C++ directly for the first time and check the timing on a simulated board."
check: { type: reflect, text: "In Tinkercad: switch Code to Text (it keeps the blocks' C++), change the delays to 100 and 900, and start the simulation. I saw the short flash." }
```

## Practise: timing

```step
stage: practise
insight: "Reading timings from delays, and where code belongs."
tasks:
  - check:
      type: number
      q: "loop() is: HIGH, delay(300), LOW, delay(700). How many blinks in 10 seconds?"
      answer: 10
      feedback:
        - [33, "One blink is the whole loop: 300 + 700 ms."]
      explain: "Each loop takes 1000 ms, so 10 blinks in 10 s."
  - check:
      type: question
      q: "Where does pinMode(13, OUTPUT); belong?"
      options: ["In setup(): it only needs doing once", "In loop(): so it keeps working", "Before setup(), outside both", "It doesn't matter"]
      answer: 0
      feedback: [null, "It works there, but sets the pin up again every loop for nothing.", "Statements go inside a function.", "Setting up belongs in setup()."]
      explain: "Set up once in setup(); repeat in loop()."
```

### Count the blinks

### Where it goes

## Make: a lighthouse

```step
stage: make
insight: "Working from a timing back to the delays reverses the process."
try: { playground: board, starter: "board.yml#make", height: 640 }
hint: ["The light is on for 200 ms in every 2 seconds.", "2 s = 2000 ms: off for 2000 − 200 ms.", "delay(200) after HIGH and delay(1800) after LOW."]
check: { type: board, text: "A lighthouse flashes for 0.2 s every 2 s. Change the delays to match.", when: "o = 200 and f = 1800", explain: "200 ms on and 1800 ms off makes one flash every 2000 ms." }
```
