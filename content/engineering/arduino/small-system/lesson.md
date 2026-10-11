---
order: 7
unit: hardware
title: A small system
summary: "A system reads a sensor, decides, and drives an output, and a brief says what it must do. Test it against a table of cases: each side of every threshold, the threshold itself, and the extremes. Tests that pass far from the threshold can hide a mistake right at it."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your plant-water alarm works on your desk: it blinks when you twist the knob down. Does it meet the brief? How would you know, without watching it for a week?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8512
  url: http://127.0.0.1:8512/index.html
  readySelector: ".ardsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A plant-water alarm: the soil reads low (dry), so the LED blinks." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Testing against the brief"
  say: "Each test sets the sensor and checks the alarm."
  clip:
    - caption: { text: "The brief says 300 or below. The tests include 299, 300 and 301.", say: "Test either side of the threshold, and the threshold itself." }
    - click: "Run the sketch against every test case"
    - wait: 1600
    - caption: { text: "300 fails: the sketch says level < 300, so 300 itself is missed.", say: "The test at three hundred finds the mistake." }
    - wait: 1400
    - expect: { selector: "#ardmon", contains: "reading 300" }
---
**The brief:** a plant-water alarm. A soil moisture sensor on A0 reads low when the soil is dry (the knob stands in for it). The LED on pin 13 must **blink when the reading is 300 or below**, and be **off** otherwise.

A **test case** sets the sensor to one reading and says what the LED should do. **Run the tests** runs the sketch once for each case and ticks or crosses it.

## Predict: which test finds it?

```step
stage: predict
insight: "Committing to which reading exposes an off-by-one at the threshold tests the new move: the boundary is where the slips are."
check:
  type: predict
  q: "The sketch says if (level < 300). The brief says 300 or below. Which test reading would show the mistake?"
  options: ["300", "0", "150", "800"]
  actual: "300: the brief wants it to blink, but 300 < 300 is false, so it stays off. Any reading away from 300 behaves the same either way."
```

## Try: run the tests

```step
stage: run
insight: "Every test in this table passes, yet the sketch misses the brief: the table has no case at the threshold. That sets up the method."
try: { playground: board, starter: "board.yml#run", height: 700 }
check: { type: board, text: "Run the tests. How many pass? Then look at the readings tested.", when: "u = 5 and q = 5", explain: "All 5 pass, but none of them is 300, the one reading where the sketch and the brief disagree." }
```

Passing every test only means the sketch does what the tests ask.

## Worked example: choose the tests

```step
stage: investigate
insight: "Building a test table from the brief models the move: one case each side of the threshold, the threshold itself, and the extremes. Sam's two far-away tests are planted after the method."
tasks:
  - check:
      type: question
      q: "Which set of readings tests this brief best?"
      options: ["0, 299, 300, 301, 1023", "0, 1023", "100, 200, 400, 500", "300 only"]
      answer: 0
      feedback: [null, "Both are far from the threshold: a slip at 300 passes.", "None is at the threshold.", "One case can't show both behaviours."]
      explain: "Both sides of 300, 300 itself, and the two ends."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's alarm passed both tests, but stays off at a reading of 300. Click the line where Sam's plan first goes wrong."
      answer: 4
      fault: logic
      misconception: tests-skip-boundary
      explain: "Line 4: two far-away tests can't show a slip at the threshold. Sam needs cases at 299, 300 and 301."
```

### A test table

```worked
\text{brief: blink at } \le 300 :: Find the threshold and which side it belongs to.
299, \; 300 \to \text{blink} :: Just below, and the threshold itself (the brief includes it).
301 \to \text{off} :: Just above.
0 \to \text{blink}, \; 1023 \to \text{off} :: The two ends of the range.
\text{5 cases} :: Each one could catch a different slip.
```

Now pick the best set.

### Find the mistake

## Vary: change the brief

```step
stage: modify
insight: "Each task changes the brief and its tests; students change the sketch until every case passes, including a new steady state."
try: { playground: board, starter: "board.yml#vary-300", height: 700 }
tasks:
  - starter: "board.yml#vary-300"
    check: { type: board, text: "These tests include 300. Run them, then fix the sketch so all 5 pass.", when: "u = 5 and q = 5", explain: "level <= 300 includes the threshold." }
  - starter: "board.yml#vary-steady"
    check: { type: board, text: "A new brief: steady on below 100 (very dry), blink from 100 to 299, off from 300. Change the sketch until all 6 tests pass.", when: "u = 6 and q = 6", explain: "if (level < 100) steady on; else if (level < 300) blink; else off. Check the most extreme case first." }
```

### Fix the boundary

### Three states

## Build it for real

```step
stage: modify
tier: typical
insight: "On real hardware the readings aren't neat: printing them and testing at the edges shows how a real sensor behaves."
check: { type: reflect, text: "On a real Uno: a potentiometer (or a soil moisture sensor) on A0 and the LED on pin 13. I printed the readings to the serial monitor, set the knob near 300, and checked the alarm either side." }
```

A real sensor's reading flickers by a few numbers, so a reading near the threshold can make the alarm flicker too. The fix (a gap between switching on and off) is a good stretch.

## Practise: tests

```step
stage: practise
insight: "Choosing test cases for new briefs, including an inclusive and an exclusive threshold."
tasks:
  - check:
      type: question
      q: "A fan must turn on when the temperature reading is above 600. Which three readings test the threshold?"
      options: ["599, 600 and 601", "0, 600 and 1023", "600 only", "100, 600 and 900"]
      answer: 0
      feedback: [null, "Good ends, but nothing either side of 600.", "One side isn't enough.", "Too far from 600."]
      explain: "Just below, at, and just above: 600 itself should be off (above, not at)."
  - check:
      type: question
      q: "Every test passes. What can you say?"
      options: ["The sketch does what those tests check: no more", "The sketch meets the brief", "The sketch has no mistakes", "The tests are right"]
      answer: 0
      feedback: [null, "Only if the tests cover the brief.", "Tests can only show the mistakes they look for.", "The tests themselves could be wrong."]
      explain: "Tests show what they check. A good table covers the boundaries and the ends."
```

### A fan

### All pass

## Make: a fridge door alarm

```step
stage: make
insight: "Meeting a three-state brief against a full test table brings the unit together: read, decide in bands, act, test."
try: { playground: board, starter: "board.yml#make", height: 700 }
hint: ["A light sensor in the fridge: bright means the door is open. Off below 400, steady on from 400 to 699, blink from 700.", "Test the biggest band first: if (level >= 700) { blink } else if (level >= 400) { on } else { off }", "Run the tests after each change, and read which case fails."]
check: { type: board, text: "Write the decisions so all 6 tests pass: off below 400, steady on from 400 to 699, blink from 700 up.", when: "u = 6 and q = 6", explain: "Three bands, each edge tested on both sides." }
```
