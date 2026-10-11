---
order: 3
unit: cpp
title: Values and decisions
summary: "A variable is declared with its type, int level = 0;. analogRead(A0) gives 0 to 1023, and if (level > 500) { … } else { … } decides. == compares; a single = sets the variable, even inside an if. Every statement ends with ;, or the sketch won't upload."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The night light on the micro:bit decided with a threshold. Same idea, new words: what does it look like in C++, and which two tiny slips stop it working?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8507
  url: http://127.0.0.1:8507/index.html
  readySelector: ".ardsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A knob on A0: above 500 the LED on pin 13 comes on." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Read a value, then decide"
  say: "The sketch reads the knob, then decides."
  clip:
    - click: "Upload and run"
    - caption: { text: "level holds the knob's reading. It is 205, not above 500, so the LED is off.", say: "Two hundred and five is not above five hundred." }
    - wait: 2400
    - caption: { text: "Turn the knob above 500, and the if switches the LED on.", say: "Above five hundred, the LED comes on." }
    - wait: 1000
    - expect: { selector: ".ardsvg", contains: "reads 205" }
---
```cpp
int level = 0;                // a whole-number variable, starting at 0

void loop() {
  level = analogRead(A0);     // 0 to 1023, as on the micro:bit
  if (level > 500) {          // compare
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
  delay(100);
}
```

`int` means a whole number. `>` `<` `>=` `<=` `==` `!=` compare. The `{ }` after `if` holds what to do when it is true; `else { }` when it isn't.

## Predict: knob at zero

```step
stage: predict
insight: "Committing to level's value and the LED with the knob at 0 checks students can read a variable, analogRead and an if together before running."
check:
  type: predict
  q: "The knob is turned all the way down. After level = analogRead(A0); what is level, and is the LED on?"
  options: ["0, and the LED is off", "0, and the LED is on", "LOW, and the LED is off", "1023, and the LED is on"]
  actual: "level is 0 (analogRead gives 0 to 1023), 0 is not greater than 500, so the else switches the LED off."
```

## Try: turn the knob

```step
stage: run
insight: "Turning the knob across 500 settles the prediction and shows the if switching both ways."
try: { playground: board, starter: "board.yml#run", height: 680 }
tasks:
  - check: { type: board, text: "Upload and run, then turn the knob up until the LED comes on.", when: "g = 1 and k > 500 and l = 255", explain: "Above 500 the if is true: digitalWrite(13, HIGH)." }
  - check: { type: board, text: "Now turn it back down.", when: "g = 1 and k <= 500 and l = 0", explain: "500 or less: the else runs and switches it off. Exactly 500 is not greater than 500." }
```

### Up

### Down

## Worked example: two slips

```step
stage: investigate
insight: "Reading the sketch line by line models the move; the two slips (a missing ; and = for ==) are planted after the method, with the symptom each really gives."
tasks:
  - check:
      type: question
      q: "The knob reads 500 exactly. Is the LED on?"
      options: ["No: 500 is not greater than 500", "Yes: 500 is the threshold", "It flickers", "Only if level is an int"]
      answer: 0
      feedback: [null, "> means strictly greater. >= would include 500.", "The value doesn't change.", "level is an int either way."]
      explain: "level > 500 is false for 500, so the else runs."
  - check:
      type: bug
      code: "sketch.ino#sam"
      text: "Sam's LED stays on whatever the knob does. Click the line where Sam's sketch goes wrong."
      answer: 9
      fault: logic
      misconception: cpp-assign-in-if
      explain: "Line 9: level = 500 sets level to 500 and the if uses that value, which isn't 0, so it is always true. Comparing needs == (or here, >)."
```

### Read it

```worked
\text{int level = 0;} :: A whole-number variable called level, starting at 0.
\text{level = analogRead(A0);} :: Store the knob's reading (0 to 1023) in level.
\text{if (level > 500)} :: Is it greater than 500? True or false.
\text{true: digitalWrite(13, HIGH);} :: The first { } runs: LED on.
\text{false: digitalWrite(13, LOW);} :: The else { } runs: LED off.
```

Now: what happens at exactly 500?

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "Changing the comparison, then fixing each slip on the board, gives students the compiler's message and the logic symptom to recognise."
try: { playground: board, starter: "board.yml#vary", height: 680 }
tasks:
  - starter: "board.yml#vary"
    check: { type: board, text: "Change the sketch so the LED comes on when the knob is below 300 (a night light). Upload and test it.", when: "g = 1 and k < 300 and l = 255", explain: "if (level < 300) puts the LED on for low readings." }
  - starter: "board.yml#fix-semi"
    check: { type: board, text: "This sketch won't upload. Read the message, fix it and upload.", when: "g = 1 and e = 0", explain: "A ; was missing after analogRead(A0). The message names the line." }
  - starter: "board.yml#fix-eq"
    check: { type: board, text: "This one uploads, but the LED is always on. Fix it so it comes on above 500.", when: "g = 1 and k <= 500 and l = 0", explain: "level = 500 assigns. if (level > 500) compares." }
```

### Below 300

### Won't upload

### Always on

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Tinkercad's real compiler gives its own error for a missing ; and its own behaviour for =, so students meet both in a second tool."
check: { type: reflect, text: "In Tinkercad: a potentiometer on A0 and the LED on pin 13. Type the sketch in Text view and run it. Then delete one ; and run again: I read Tinkercad's error message and found the line it named." }
```

## Practise: conditions

```step
stage: practise
insight: "Reading conditions with ==, >= and && and predicting the LED."
tasks:
  - check:
      type: question
      q: "level is 300. Which condition is true?"
      options: ["level >= 300", "level > 300", "level == 301", "level < 300"]
      answer: 0
      feedback: [null, "300 is not greater than 300.", "300 is not 301.", "300 is not less than 300."]
      explain: ">= includes the value itself."
  - check:
      type: question
      q: "if (level > 300 && level < 700) means…"
      options: ["level is between 300 and 700", "level is below 300 or above 700", "level is 300 or 700", "Nothing: && is a typo"]
      answer: 0
      feedback: [null, "That would be ||.", "Both ends are left out.", "&& means and."]
      explain: "&& means and: both must be true."
```

### Which is true?

### Between

## Make: a middle band

```step
stage: make
insight: "Combining two comparisons with && to light the LED only in a band applies the lesson to a new condition."
try: { playground: board, starter: "board.yml#make", height: 680 }
hint: ["Two conditions, both true: &&.", "if (level > 300 && level < 700)", "Test it: turn the knob through the whole range."]
check: { type: board, text: "Change the sketch so the LED is on only while the knob reads between 300 and 700. Test it by turning the knob from one end to the other.", when: "g = 1 and k > 300 and k < 700 and l = 255 and h >= 2", explain: "if (level > 300 && level < 700): on in the middle band, off at both ends." }
```
