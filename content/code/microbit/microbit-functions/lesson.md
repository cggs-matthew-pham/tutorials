---
order: 8
unit: tools
title: Functions
summary: Name a job once as a function, then use it from anywhere. Then see that every event block is a function too.
language: makecode
introduces: [function]
explainPicture: functions.ts#predict
hook: "A recipe card says 'make the sauce (see page 12)' instead of writing the sauce out every time. A function is that named job, written once and used everywhere."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@functions.ts#predict", lesson: "code/microbit/microbit-functions", target: "microbit" }
  caption: "A function is a named job"
  say: "A function is a named job. Making it does not run it."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A call block runs it, once per call."
        say: "A call block runs it, once for each call."
    - caption:
        text: "points is a parameter: showScore(5) makes points 5."
        say: "points is a parameter, an input. Calling show score 5 makes points five."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Event blocks are functions too, called for you."
        say: "Every event block is a function too. The micro:bit calls it for you."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
When the same blocks are needed in several places, you can **name** them once as a **function**, then **call** it by name wherever you need it. Make one in **Advanced › Functions › Make a Function**. The **call** block then appears in the same place.

## Predict

```step
stage: predict
code: functions.ts#predict
check:
  type: predict
  q: "You press A once. How many times does the heart flash?"
  options: ["Once", "Twice", "Four times", "It keeps flashing"]
  actual: "Twice. The flashHeart blocks run each time the function is called, and A calls it two times."
```

**function flashHeart** holds the blocks for one flash. They only run when something **calls** flashHeart.

## Run

```step
stage: run
code: functions.ts#predict
try: { playground: microbit, starter: "functions.ts#predict" }
check: { type: reflect, text: "I pressed A, counted the flashes and compared with my prediction." }
```

Press **A** and count the flashes.

## Investigate

```step
stage: investigate
code: functions.ts#predict
insight: "A function's blocks run only when it is called, once per call. Every event block is a function too: in Python you can see it handed to the micro:bit."
tasks:
  - check:
      type: question
      q: "Noah made the flashHeart function. He presses A and nothing happens. Why?"
      options: ["The function is too long", "Nothing calls flashHeart: making a function does not run it", "Functions only work with B", "He needs a pause first"]
      answer: 1
      fault: logic
      misconception: define-not-call
      explain: "Making a function only names the job. It runs when a call block runs it. Noah's A event is empty, so nothing calls it."
  - check:
      type: match
      q: "This is the same program in Python (press Python at the top of the editor). Match each Python line with what it does."
      pairs:
        - ["def flash_heart():", "makes the function flash_heart"]
        - ["flash_heart()", "calls it: runs its blocks once"]
        - ["def on_button_pressed_a():", "makes a function from the blocks inside on button A pressed"]
        - ["input.on_button_pressed(Button.A, on_button_pressed_a)", "hands that function to the micro:bit to call on each press"]
  - check:
      type: question
      q: "What is an event block, such as on button A pressed, really?"
      options: ["A loop that checks A again and again", "A function that the micro:bit calls each time A is pressed", "A variable that stores A", "A list of buttons"]
      answer: 1
      explain: "In Python you can see it: the blocks inside become a function, and the micro:bit calls that function every time the event happens."
```

### Noah's flash

Noah's program:

```makecode
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {

})
```

### The same program in Python

MakeCode can show every program in Python. Here is this one:

```python
def flash_heart():
    basic.show_icon(IconNames.HEART)
    basic.pause(200)
    basic.clear_screen()
    basic.pause(200)

def on_button_pressed_a():
    flash_heart()
    flash_heart()
input.on_button_pressed(Button.A, on_button_pressed_a)
```

### What is an event?

Look at what Python did with **on button A pressed**.

## Modify

```step
stage: modify
insight: "Calling a function more times reuses it for free, and a parameter lets one function do a slightly different job each time."
try: { playground: microbit, starter: "functions.ts#modify" }
tasks:
  - hint: "Drag in on button B pressed, then three call flashHeart blocks from Functions."
    check: { type: code, text: "Make B flash the heart three times, using the function.", rules: { contains: ["input.onButtonPressed(Button.B,function(){flashHeart()flashHeart()flashHeart()"] } }
  - hint: ["Make a Function called showScore. Click Add a parameter › Number, and name it points.", "Inside: show string Score, then show number points (drag points out of the function block). Call showScore with 5 on A+B."]
    check: { type: code, text: "Make a function showScore with a number parameter, and call it from A+B.", rules: { params: 1, inside: { "input.onButtonPressed(Button.AB": ["showScore("] } } }
```

### Three flashes

Make **B** flash the heart **three** times. Use the function: do not copy the blocks.

### A function with an input

Make a function **showScore** with a number **parameter** called `points`. It shows the word Score, then the number. Make **A+B** call it with 5. Then try other numbers.

## Make

```step
stage: make
try: { playground: microbit, starter: "functions.ts#make" }
hint:
  - "Each dance move is a function with two or more show leds pictures inside."
  - "Call the moves from the buttons. A shake could call both, one after the other."
check: { type: code, text: "A dance: two functions of your own, each a short animation, called from the buttons.", rules: { defs: 2, calls: 2 } }
```

Make a **stick-figure dance**. Make two dance moves as functions (for example *wave* and *jump*), each with two or more pictures. Then choreograph: **A** and **B** each call a move, and a **shake** calls a routine of both.

## Change an alarm

```step
stage: modify
try: { playground: microbit, starter: "functions.ts#alarm" }
```

This alarm beeps and flashes three times when A is pressed, using one function. Make the function's beep higher or lower, then make **B** sound a longer alarm (more calls).
