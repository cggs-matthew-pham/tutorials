---
order: 4
unit: cpp
title: Talking to the computer
summary: "Serial.begin(9600) in setup() opens a line to the computer; Serial.println(level) sends a value and starts a new line, and Serial.print stays on the same line. The serial monitor shows what the board sees, which is how you test and debug a sketch. In C++, \"words\" + a number does not join them."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your sketch decides from a number you can't see. When the LED does something odd, how do you find out what the board actually read?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8508
  url: http://127.0.0.1:8508/index.html
  readySelector: ".ardsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "The serial monitor shows each reading the board sends." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Printing what the board sees"
  say: "The board sends each reading to the computer."
  clip:
    - click: "Upload and run"
    - caption: { text: "Serial.println sends level to the computer: one line every 250 ms.", say: "Each reading appears on a new line." }
    - wait: 2600
    - caption: { text: "Now you can see the number the sketch decides with.", say: "Now you can see what the board sees." }
    - wait: 800
    - expect: { selector: "#ardmon", contains: "512" }
---
The **serial monitor** shows text the board sends over the USB cable. On this page it is under the board; in Tinkercad and the Arduino IDE it is a panel you open.

```cpp
void setup() {
  Serial.begin(9600);       // open the line to the computer (9600 bits a second)
}

void loop() {
  Serial.print("Level: ");  // words, and stay on this line
  Serial.println(level);    // the number, then a new line
}
```

## Predict: what appears?

```step
stage: predict
insight: "Committing to what println(level) shows tests the new move: the value is sent, not the variable's name."
check:
  type: predict
  q: "The knob is halfway. loop() runs Serial.println(level); after level = analogRead(A0);. What does the serial monitor show?"
  options: ["512, on a new line each time", "level", "Level: 512", "Nothing"]
  actual: "512 (halfway on 0 to 1023), one line every time loop() runs. println prints the variable's value, not its name."
```

## Try: watch the monitor

```step
stage: run
insight: "Running it and turning the knob settles the prediction: the monitor tracks the reading."
try: { playground: board, starter: "board.yml#run", height: 680 }
check: { type: board, text: "Upload and run, then turn the knob and watch the monitor.", when: "n >= 3 and p = k", explain: "Each line is the reading at that moment: the monitor shows what the board sees." }
```

## Worked example: print and println

```step
stage: investigate
insight: "Tracing print and println line by line models how lines are built; Sam's + is planted after the method, with what the real board does."
tasks:
  - check:
      type: question
      q: "Which pair of lines prints Level: 512 on one line, then starts a new line?"
      options: ["Serial.print(\"Level: \"); Serial.println(level);", "Serial.println(\"Level: \"); Serial.println(level);", "Serial.println(\"Level: \"); Serial.print(level);", "Serial.print(\"Level: \"); Serial.print(level);"]
      answer: 0
      feedback: [null, "println after the words starts a new line before the number.", "The words get their own line.", "Nothing starts the next line: every reading runs together."]
      explain: "print stays on the line; println ends it."
  - check:
      type: bug
      code: "sketch.ino#sam"
      text: "Sam's monitor shows bits of Level: and then nonsense instead of Level: 512. Click the line where Sam's sketch goes wrong."
      answer: 9
      fault: logic
      misconception: cpp-plus-joins-text
      explain: "Line 9: in C++, \"Level: \" + level doesn't join them (as Python would); it moves level characters along the text and prints what is there. Use Serial.print(\"Level: \"); then Serial.println(level);"
```

### Build a line

```worked
\text{Serial.begin(9600);} :: In setup(): open the line. Nothing prints without it.
\text{Serial.print("Level: ");} :: Send the words. The cursor stays on this line.
\text{Serial.println(level);} :: Send the value of level (512), then a new line.
\text{monitor: Level: 512} :: One line per loop().
```

Now pick the pair that does this.

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "Adding a label shows print and println together; removing Serial.begin shows why it is in setup()."
try: { playground: board, starter: "board.yml#vary", height: 680 }
tasks:
  - starter: "board.yml#vary"
    check: { type: board, text: "Change the sketch so each line reads Level: and then the number.", when: "g = 1 and j = k and x = 0", explain: "Serial.print(\"Level: \"); then Serial.println(level);" }
  - starter: "board.yml#vary-begin"
    check: { type: board, text: "This sketch prints nothing. Fix it.", when: "g = 1 and n >= 2", explain: "Serial.begin(9600); was missing from setup(). The line to the computer must be opened first." }
```

### Add a label

### Nothing printed

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Tinkercad's serial monitor is the one students will use for the real board, so they practise opening and reading it."
check: { type: reflect, text: "In Tinkercad: the knob on A0, the sketch with Serial.print and Serial.println. Start the simulation and open the Serial Monitor (bottom of the Code panel). I turned the knob and saw the numbers change." }
```

## Practise: printing

```step
stage: practise
insight: "Predicting monitor output from print and println, and using printing to debug."
tasks:
  - check:
      type: question
      q: "loop() is Serial.print(1); Serial.print(2); Serial.println(3);. What does the monitor show after two loops?"
      options: ["123 on one line, then 123 on the next", "1, 2 and 3 on separate lines, twice", "123123 on one line", "6, then 6"]
      answer: 0
      feedback: [null, "print doesn't start a new line.", "println(3) ends each line.", "print shows each value; it doesn't add them."]
      explain: "print, print, println: one line of 123 per loop."
  - check:
      type: question
      q: "A night light comes on in daylight. What is the most useful first step?"
      options: ["Print the reading and compare it with the threshold", "Rewrite the whole sketch", "Add a longer delay", "Swap the LED"]
      answer: 0
      feedback: [null, "Find out what the board sees first.", "Timing isn't the question.", "The LED does what the code tells it."]
      explain: "Printing the value shows whether the reading or the threshold is the problem."
```

### Print and println

### Debugging

## Make: print a percentage

```step
stage: make
insight: "Printing a calculated value (with map) combines a variable, a calculation and println: the monitor then shows the knob as people think of it."
try: { playground: board, starter: "board.yml#make", height: 680 }
hint: ["map(value, fromLow, fromHigh, toLow, toHigh) rescales a number.", "int percent = map(level, 0, 1023, 0, 100);", "Serial.println(percent); and test at both ends of the knob."]
check: { type: board, text: "Print the knob as a percentage, 0 to 100, one number per line.", when: "g = 1 and n >= 2 and k > 100 and p >= k / 10.23 - 1 and p <= k / 10.23 + 1", explain: "map(level, 0, 1023, 0, 100) turns 0–1023 into 0–100." }
```
