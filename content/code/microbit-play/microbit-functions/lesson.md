---
order: 1
unit: jobs
moveId: name-a-job
reviews: [pick-from-list]
introduces: [function]
assumes: [variable, list, list-index, length, random]
title: Name a job
summary: Name some blocks once as a function, then call it by name wherever you need it.
language: makecode
explainPicture: lesson.ts#predict
hook: "A recipe says 'make the sauce' and the sauce is written once, on another page. Programs name their jobs the same way."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit-play/microbit-functions", target: "microbit" }
  caption: "A function is a named job"
  say: "A function is a named job. Making it does not run it."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A call block runs it, once per call."
        say: "A call block runs it, once for each call."
    - caption:
        text: "A calls flashHeart twice, so the heart flashes twice."
        say: "A calls flash heart twice, so the heart flashes twice."
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
code: lesson.ts#predict
check:
  type: predict
  q: "You press A once. How many times does the heart flash?"
  options: ["Once", "Twice", "Four times", "It keeps flashing"]
  fault: logic
  misconception: define-not-call
  actual: "Twice. The flashHeart blocks run each time the function is called, and A calls it two times."
```

**function flashHeart** holds the blocks for one flash. They only run when something **calls** flashHeart.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A, counted the flashes and compared with my prediction." }
```

Press **A** and count the flashes.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "A function's blocks run only when it is called, once per call, so one copy serves every place that calls it. Every event block is a function too."
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
      type: question
      q: "Without a function, the flash blocks are copied into A and into shake. You change the heart to a diamond in A only. What goes wrong?"
      options: ["A flashes a diamond and shake still flashes a heart", "Nothing", "Both flash a diamond", "The program stops"]
      answer: 0
      fault: design
      misconception: copied-blocks
      explain: "Copied blocks have to be changed in every copy. With a function there is one copy, so one change reaches every call."
  - check:
      type: match
      q: "This is the same program in Python (press Python at the top of the editor). Match each Python line with what it does."
      pairs:
        - ["def flash_heart():", "makes the function flash_heart"]
        - ["flash_heart()", "calls it: runs its blocks once"]
        - ["def on_button_pressed_a():", "makes a function from the blocks inside on button A pressed"]
        - ["input.on_button_pressed(Button.A, on_button_pressed_a)", "hands that function to the micro:bit to call on each press"]
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

### Two copies

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

Look at what Python did with **on button A pressed**: the blocks inside became a function, and the micro:bit calls it on each press.

## Modify

```step
stage: modify
insight: "Calling a function more times reuses it for free, and a second function names a second job."
try: { playground: microbit, starter: "lesson.ts#predict" }
tasks:
  - hint: "Drag in on button B pressed, then three call flashHeart blocks from Functions."
    check: { type: code, text: "Make B flash the heart three times, using the function.", rules: { contains: ["input.onButtonPressed(Button.B,function(){flashHeart()flashHeart()flashHeart()"] } }
  - hint: ["Make a Function called flashSad, with show icon sad face, pause, clear screen, pause.", "Then call it from on shake."]
    check: { type: code, text: "Make a second function, flashSad, and call it from a shake.", rules: { defs: 2, contains: ["input.onGesture(Gesture.Shake,function(){flashSad()"] } }
```

### Three flashes

Make **B** flash the heart **three** times. Use the function: do not copy the blocks.

### A second job

Make a function **flashSad** that flashes a sad face. Call it when the micro:bit is shaken.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A random place must reach from 0 to length − 1, or some items never come up."
check:
  type: question
  q: "Sol's team picker has five names, but picks from 0 to 3. Whose name never comes up?"
  options: ["Eve", "Ava", "Dev", "Nobody's: they all come up"]
  answer: 0
  explain: "Eve is the fifth name, at place 4. pick random 0 to 3 never reaches place 4. Picking from 0 to length − 1 would."
```

Sol's team picker, from the last course.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Make two functions, such as wave and jump. Each has two or more show leds pictures."
  - "A calls one, B calls the other, and shake calls both, one after the other."
check: { type: code, text: "A dance: two functions of your own, each a short animation, called from the buttons.", rules: { defs: 2, calls: 2 } }
unlocks: [function]
```

Make a **stick-figure dance**. Make two dance moves as functions (for example *wave* and *jump*), each with two or more pictures. Then choreograph: **A** and **B** each call a move, and a **shake** calls a routine of both.

## Change an alarm

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#alarm" }
```

This alarm beeps and flashes three times when A is pressed, using one function. Make the function's beep higher or lower, then make **B** sound a longer alarm (more calls).

```teacher
summary: "Students name a job as a function and call it from several places, and see in Python that every event block is a function the micro:bit calls."
time: 45
timing: "Predict and Run 8 min · Investigate 12 min · Modify 10 min · Mix it up 3 min · Make 9 min · Alarm 3 min"
goals:
  - I can make a function and call it from more than one place.
  - I can say why a function is better than copied blocks.
  - I can explain that an event block is a function the micro:bit calls for me.
before: |
  A **function** is a named job: some blocks with a name, made once in **Advanced › Functions**. Making it does **not** run it. It runs when a **call** block calls it, once per call. One copy serves every call, so a change to the function reaches every place at once; copied blocks have to be changed in every copy. The **Python** button at the top of the editor shows the same program as text: every event block (*on button A pressed*) becomes a function, handed to the micro:bit to call. Students only read the Python. Functions with inputs (parameters) come later, in Secret messages.
running:
  - "Predict: some students expect one flash per press. Point at the two call blocks."
  - "Run: count together. Each call runs the whole function once."
  - "Investigate: Noah's mistake (making but never calling) and the two copies are this lesson's ideas. Then switch the editor to Python together before the match."
  - "Say it plainly: an event block is a function. You make it; the micro:bit calls it on each press."
  - "Modify: three flashes means three calls, not copied blocks."
  - "Mix it up: a random pick that misses an item, from the last course."
  - "Make: two dance moves as functions, then a routine. Let students perform their dance for the class."
stuck:
  - see: "Nothing happens when the button is pressed."
    ask: "Which block calls your function?"
    fix: "Add a call block (from Functions) inside the button event."
  - see: "The call block is missing from the toolbox."
    ask: "Have you made the function yet?"
    fix: "Make the function first; its call block then appears under Functions."
  - see: "The student copied the flash blocks instead of calling."
    ask: "If you change the picture, how many places must you change?"
    fix: "Delete the copy and call the function instead."
stretch: "Make a third move and a routine of all three, called from A+B."
support: "Give students the two dance functions already made with one picture each, and ask them to add a second picture and the calls."
leads: "Next unit: radio. on radio received is one more event block, so one more function the micro:bit calls. Class idea: a class dance where each group writes one move as a function."
exit:
  q: "You make a function, but never call it. What happens when the program runs?"
  a: "Nothing from that function: its blocks only run when something calls it."
explain: |
  A **function** is a named job. Making it does **not** run it: a **call** block runs it, once per call.

  One copy serves every call, so changing the function changes every place that calls it. Copied blocks have to be changed one by one.

  Press **Python** in the editor: every event block is a function too. The micro:bit calls it for you each time the event happens.
solutions:
  step-4#t1: lesson.ts#sol-three
  step-4#t2: lesson.ts#sol-sad
  step-6: lesson.ts#sol-make
struggle: "Making a function does nothing until it is called. When a press does nothing, ask which block calls the function."
class:
  activities:
    - at: investigate
      title: Call the move
      minutes: 4
      do: |
        The class agrees one move, 'the wave' (two arm positions). The teacher calls "wave, wave, jump"; students do each move when it is called, and not before.
      notes: "Agreeing the move is making the function; calling its name runs it."
    - at: end
      title: Dance off
      minutes: 3
      do: |
        Perform your micro:bit's dance for the next pair: they press the buttons, you name the function each one calls.
```

```code lesson.ts#predict
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
```

```code lesson.ts#sol-three
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
input.onButtonPressed(Button.B, function () {
    flashHeart()
    flashHeart()
    flashHeart()
})
```

```code lesson.ts#sol-sad
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
function flashSad () {
    basic.showIcon(IconNames.Sad)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
input.onButtonPressed(Button.B, function () {
    flashHeart()
    flashHeart()
    flashHeart()
})
input.onGesture(Gesture.Shake, function () {
    flashSad()
})
```

```code lesson.ts#review
let names = ["Ava", "Ben", "Chloe", "Dev", "Eve"]
input.onButtonPressed(Button.A, function () {
    basic.showString(names[randint(0, 3)])
})
```

```code lesson.ts#make
input.onButtonPressed(Button.A, function () {

})
input.onButtonPressed(Button.B, function () {

})
```

```code lesson.ts#sol-make
function wave () {
    basic.showLeds(`
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        . # . # .
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . # . # .
        `)
}
function jump () {
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . # . # .
        `)
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . # . # .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    wave()
    wave()
})
input.onButtonPressed(Button.B, function () {
    jump()
    jump()
})
input.onGesture(Gesture.Shake, function () {
    wave()
    jump()
})
```

```code lesson.ts#alarm
function beepFlash () {
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.No)
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    beepFlash()
    beepFlash()
    beepFlash()
})
```
