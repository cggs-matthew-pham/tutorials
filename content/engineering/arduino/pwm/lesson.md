---
order: 5
unit: cpp
title: Outputs that vary
summary: "analogWrite(9, value) sets a brightness from 0 to 255 on a PWM pin (marked ~ on the Uno: 3, 5, 6, 9, 10, 11). The pin doesn't get a lower voltage: it switches fully on and off very fast, and the value sets how much of the time it is on. analogRead gives 0 to 1023, so divide by 4 to drive it from a knob."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A digital pin is only ever 0 V or 5 V. So how does a dimmer switch, a fading LED or a motor speed control work from one?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8510
  url: http://127.0.0.1:8510/index.html
  readySelector: ".ardsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "analogWrite(9, 128): pin 9 is on for half of each cycle." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Brightness by switching fast"
  say: "Watch the signal beside the LED."
  clip:
    - click: "Upload and run"
    - caption: { text: "The knob reads 512, so analogWrite gets 512 ÷ 4 = 128.", say: "Half the knob gives one hundred and twenty eight." }
    - wait: 2200
    - caption: { text: "Pin 9 is on for half of each cycle and off for half: the LED looks half as bright.", say: "On half the time, so it looks half as bright." }
    - wait: 1200
    - expect: { selector: ".ardsvg", contains: "analogWrite 128" }
---
`analogWrite(pin, value)` takes a value from **0** (off) to **255** (fully on). It only works on the **PWM pins**, marked `~` on the Uno: 3, 5, 6, 9, 10 and 11. PWM stands for pulse-width modulation.

## Predict: 128

```step
stage: predict
insight: "Committing to what analogWrite(9, 128) does to the pin tests the new move before the signal is shown: on and off fast, not a lower voltage."
check:
  type: predict
  q: "analogWrite(9, 128); — what does pin 9 do?"
  options: ["Switches between 5 V and 0 V very fast, on about half the time", "Stays at 2.5 V", "Stays at 5 V", "Switches off"]
  actual: "It switches fully on and off, about 490 times a second, on for 128/255 of each cycle. Your eye averages it, so the LED looks about half as bright."
```

## Try: see the signal

```step
stage: run
insight: "The drawn signal settles the prediction: full height, half the time."
try: { playground: board, starter: "board.yml#run", height: 640 }
check: { type: board, text: "Upload and run. Look at the signal drawn beside the LED.", when: "w = 128", explain: "The signal is either at the top (5 V) or the bottom (0 V); it is at the top for half of each cycle." }
```

## Worked example: knob to brightness

```step
stage: investigate
insight: "Scaling 0–1023 down to 0–255 models the move with numbers; Sam's missing ÷ 4 is planted after the method, with what the real board does (it keeps only the low 8 bits)."
tasks:
  - check:
      type: answer
      q: "The knob reads 1023. What does analogWrite get after level / 4?"
      answer: "255"
      feedback:
        - ["255.75", "level is an int, so the division keeps the whole number."]
        - ["1023", "Divide by 4 first."]
      explain: "1023 / 4 = 255 in whole numbers: fully on."
  - check:
      type: question
      q: "analogWrite(9, 64). For how much of each cycle is the pin on?"
      options: ["About a quarter", "About half", "All of it, at a quarter of the voltage", "64 cycles out of 100"]
      answer: 0
      feedback: [null, "128 would be half.", "PWM never lowers the voltage.", "It is out of 255."]
      fault: logic
      misconception: pwm-lower-voltage
      explain: "64 ÷ 255 ≈ 0.25: on a quarter of the time, at the full 5 V."
  - check:
      type: bug
      code: "sketch.ino#sam"
      text: "As Sam turns the knob up, the LED gets brighter, then suddenly dark, then brighter again, four times over. Click the line where Sam's sketch goes wrong."
      answer: 8
      fault: logic
      misconception: analog-range-mismatch
      explain: "Line 8: analogRead gives 0–1023 but analogWrite takes 0–255. The board keeps only the lowest 8 bits, so 256 acts like 0 and it starts again. Use level / 4."
```

### Scale it

```worked
\text{analogRead(A0)} \to 0 \ldots 1023 :: The knob, as before.
\text{analogWrite} \leftarrow 0 \ldots 255 :: Brightness: 0 off, 255 fully on.
1024 \div 256 = 4 :: The input range is 4 times the output range.
512 \div 4 = 128 :: Halfway on the knob gives 128.
128 \div 255 \approx 0.5 :: On for about half of each cycle.
```

Now the top of the knob.

### On how long?

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "Fixing Sam's range, then moving to a non-PWM pin, shows both limits of analogWrite on the board."
try: { playground: board, starter: "board.yml#vary", height: 680 }
tasks:
  - starter: "board.yml#vary"
    check: { type: board, text: "Fix the sketch so the knob sets the brightness smoothly, all the way to fully on.", when: "g = 1 and k >= 1000 and w >= 249", explain: "analogWrite(9, level / 4): 0–1023 becomes 0–255." }
  - starter: "board.yml#vary-pin"
    check: { type: board, text: "This LED is on pin 8 (no ~). Upload: what does analogWrite(8, 128) do? Then try 100.", when: "g = 1 and l = 0", explain: "Pin 8 can't do PWM: analogWrite just sets it HIGH for 128 or more and LOW below. 100 is off." }
```

### Smooth

### Not a PWM pin

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Tinkercad's oscilloscope shows the real PWM signal, so students see the same square wave on a fuller simulator."
check: { type: reflect, text: "In Tinkercad: the LED on pin 9, the knob on A0, analogWrite(9, level / 4). Add an Oscilloscope across the LED's pin and GND. I turned the knob and watched the on part of the wave get wider." }
```

## Practise: PWM

```step
stage: practise
insight: "Values and fractions both ways, and which pins can do it."
tasks:
  - check:
      type: number
      q: "You want the LED on for 75% of each cycle. What value? (whole number)"
      answer: 191
      tolerance: 1
      feedback:
        - [75, "Out of 255, not 100."]
        - [767, "That is 75% of 1023: analogWrite goes to 255."]
      explain: "0.75 × 255 ≈ 191."
  - check:
      type: question
      q: "Which Uno pin can fade an LED with analogWrite?"
      options: ["10", "7", "12", "2"]
      answer: 0
      feedback: [null, "7 has no ~.", "12 has no ~.", "2 has no ~."]
      explain: "PWM pins are 3, 5, 6, 9, 10 and 11."
```

### 75%

### Which pin

## Make: turn it round

```step
stage: make
insight: "Reversing the mapping (brightest at the bottom of the knob) makes students reason about the calculation rather than copy it."
try: { playground: board, starter: "board.yml#make", height: 680 }
hint: ["When level / 4 is 0 you want 255, and when it is 255 you want 0.", "255 minus something.", "analogWrite(9, 255 - level / 4);"]
check: { type: board, text: "Change it so the LED is brightest with the knob at 0 and off at the top. Test it at a few positions.", when: "g = 1 and k > 100 and k < 900 and w >= 255 - k / 4 - 1 and w <= 255 - k / 4 + 1", explain: "255 - level / 4 turns the scale round." }
```
