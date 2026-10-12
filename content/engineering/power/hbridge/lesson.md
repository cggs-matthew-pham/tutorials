---
order: 2
unit: drive
title: Motor drivers
assumes: [electric-current]
summary: "A motor driver (an H-bridge) lets two pins choose the direction: IN1 HIGH and IN2 LOW is forwards, swapped is backwards, the same is stop. A third, PWM pin on ENA sets the speed with analogWrite. Two jobs, two kinds of signal."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A transistor switches a motor on and off. But a robot has to reverse, and go slowly round corners. How does a pin make a motor go backwards?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8514
  url: http://127.0.0.1:8514/index.html
  readySelector: ".mtsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "An H-bridge driver between the Uno and the motor, with its own battery." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Direction and speed"
  say: "Two pins choose the direction."
  clip:
    - click: "Switch IN1"
    - caption: { text: "IN1 HIGH, IN2 LOW: the driver is set for forwards, but ENA is 0, so it waits.", say: "The direction is set, but the speed is zero." }
    - wait: 1600
    - click: "Switch IN2"
    - caption: { text: "Both HIGH: the motor brakes. One HIGH and one LOW is what makes it turn.", say: "Both the same means stop." }
    - wait: 1600
    - expect: { selector: "#gsum", contains: "IN2 HIGH" }
---
A **motor driver** such as the L293D (or TB6612, L298N) sits between the Uno and the motor. Inside it is an **H-bridge**: four switches that can send the battery's current through the motor either way.

| IN1 | IN2 | motor |
|---|---|---|
| HIGH | LOW | forwards |
| LOW | HIGH | backwards |
| same | same | stops (both HIGH brakes) |

**ENA** takes `analogWrite` (0–255): the speed.

## Predict: backwards

```step
stage: predict
insight: "Committing to how to reverse tests the new move: direction comes from which input is HIGH, not from a negative speed."
check:
  type: predict
  q: "The motor goes forwards with IN1 HIGH, IN2 LOW and ENA at 200. How do you make it go backwards at the same speed?"
  options: ["Swap them: IN1 LOW, IN2 HIGH, ENA still 200", "Set ENA to −200", "Set ENA to 55", "Set both IN1 and IN2 LOW"]
  actual: "Swap IN1 and IN2. ENA only sets speed (0 to 255); it can't be negative. Both LOW stops the motor."
```

## Try: drive it

```step
stage: run
insight: "Driving the board forwards and backwards settles the prediction and shows ENA as speed only."
try: { playground: board, starter: "board.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "Make the motor go forwards at about half speed.", when: "d = 1 and s >= 45 and s <= 55", explain: "IN1 HIGH, IN2 LOW, ENA about 128." }
  - check: { type: board, text: "Now backwards, at the same speed.", when: "d = -1 and s >= 45 and s <= 55", explain: "Swap IN1 and IN2; leave ENA alone." }
```

### Forwards

### Backwards

## Worked example: the signals in code

```step
stage: investigate
insight: "Reading the driver's three signals in a sketch models the move in code. Sam's PWM on a direction pin is planted after the method."
tasks:
  - check:
      type: question
      q: "IN1 on pin 8, IN2 on pin 7, ENA on pin 9. Which lines make the motor go backwards at three-quarter speed?"
      options: ["digitalWrite(8, LOW); digitalWrite(7, HIGH); analogWrite(9, 191);", "digitalWrite(8, HIGH); digitalWrite(7, LOW); analogWrite(9, -191);", "analogWrite(8, 191); analogWrite(7, 0);", "digitalWrite(9, LOW); analogWrite(8, 191);"]
      answer: 0
      feedback: [null, "analogWrite can't be negative: swap the direction pins.", "Speed goes on ENA (pin 9), and pins 7 and 8 have no PWM.", "ENA is the speed pin."]
      explain: "Direction on 8 and 7, speed 191 (75% of 255) on ENA."
  - check:
      type: bug
      code: "sketch.ino#sam"
      text: "Sam's motor turns at full speed whatever Sam does. Click the line where Sam's sketch goes wrong."
      answer: 9
      fault: logic
      misconception: one-signal-speed-direction
      explain: "Line 9: speed belongs on ENA (pin 9, a PWM pin). Pin 8 is a direction input and has no PWM; analogWrite there just sets it HIGH. ENA was never set, so on a driver with ENA tied HIGH it runs flat out."
```

### Direction, then speed

```worked
\text{digitalWrite(8, HIGH)} :: IN1 HIGH.
\text{digitalWrite(7, LOW)} :: IN2 LOW: forwards.
\text{analogWrite(9, 128)} :: ENA at 128 of 255: about half speed.
\text{swap 8 and 7} :: Backwards. ENA is unchanged.
```

Now backwards at three-quarter speed.

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "Stopping two ways (both the same, or ENA at 0) shows the difference between braking and coasting."
try: { playground: board, starter: "board.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "With ENA above 0, set both inputs HIGH.", when: "k = 1", explain: "Braking: both ends of the motor are joined, so it stops quickly." }
  - check: { type: board, text: "Now set one input HIGH and ENA to 0.", when: "e = 0 and d = 0 and k = 0", explain: "Coasting: the driver switches off and the motor spins down by itself." }
```

### Brake

### Coast

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Tinkercad's L293D and DC motor let students wire the real chip and run a forwards, stop, backwards sketch."
check: { type: reflect, text: "In Tinkercad: an L293D on the breadboard (pins 1 = ENA, 2 = IN1, 7 = IN2, 3 and 6 to the motor, 8 to the battery, 16 to 5V, 4 and 5 to GND), and a sketch that goes forwards for 2 s, stops for 1 s and goes backwards for 2 s. It worked." }
```

## Practise: drive codes

```step
stage: practise
insight: "Reading drive signals for a two-motor robot."
tasks:
  - check:
      type: question
      q: "A robot has a left and a right motor. The left goes forwards and the right goes backwards, both at the same speed. The robot…"
      options: ["Spins on the spot", "Goes forwards", "Goes backwards", "Stops"]
      answer: 0
      feedback: [null, "Both forwards does that.", "Both backwards does that.", "Both stopped does that."]
      explain: "Opposite directions turn it on the spot."
  - check:
      type: number
      q: "ENA is at 64. What percentage of full speed is that (to the nearest whole number)?"
      answer: 25
      tolerance: 1
      feedback:
        - [64, "Out of 255, not 100."]
      explain: "64 ÷ 255 ≈ 25%."
```

### Two motors

### Speed

## Make: a gentle start

```step
stage: make
insight: "Setting a precise direction and speed from a brief applies both signals."
try: { playground: board, starter: "board.yml#make", height: 560 }
check: { type: board, text: "A conveyor belt must run backwards at 30% so parcels don't fall off. Set it.", when: "d = -1 and s >= 29 and s <= 31", explain: "IN1 LOW, IN2 HIGH, ENA about 77 (30% of 255)." }
hint: ["Backwards: which input is HIGH?", "30% of 255 is about 77."]
```
