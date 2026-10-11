---
order: 4
unit: inputs
title: Sensors that vary
summary: "Analog read turns the voltage on a pin, 0 to 3.3 V, into a number from 0 to 1023. A knob or a light sensor in a divider changes that voltage, so the number changes. A program compares the number with a threshold to decide, as a night light does."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A button is on or off. But a room isn't just light or dark, and a volume knob isn't just loud or silent. How does a micro:bit measure something in between?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8504
  url: http://127.0.0.1:8504/index.html
  readySelector: ".cksvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A knob halfway: 1.65 V on pin 0, which analog read gives as 512." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "From volts to a number"
  say: "Analog read turns the voltage into a number."
  clip:
    - caption: { text: "The knob is halfway: 1.65 V on pin 0, and analog read gives 512.", say: "Halfway gives five hundred and twelve." }
    - wait: 2200
    - caption: { text: "All the way up is 3.3 V, which reads 1023. All the way down, 0 V reads 0.", say: "Zero to three point three volts becomes zero to one thousand and twenty three." }
    - wait: 2400
    - caption: { text: "The number is a scale, not the volts.", say: "The number is a scale, not the volts." }
    - wait: 800
    - expect: { selector: "#gsum", contains: "512" }
---
A **digital** input is 0 or 1. An **analog** input can be anything in between. **Analog read pin P0** gives a number from **0 to 1023**. A **knob** (a potentiometer) is a resistor with a slider: turning it moves the slider between 3V and GND, so the voltage on pin 0 changes.

## Predict: halfway

```step
stage: predict
insight: "Committing to the reading at halfway tests the new move: analog read maps 0–3.3 V onto 0–1023. Each wrong option is a real slip: the volts, a percentage, a digital 1."
check:
  type: predict
  q: "The knob is turned halfway. Analog read pin P0 gives about…"
  options: ["512", "1.65", "50", "1"]
  actual: "About 512: halfway between 0 and 1023. The pin has about 1.65 V on it, but the reading is a number on a 0 to 1023 scale."
```

## Try: turn the knob

```step
stage: run
insight: "Turning the knob settles the prediction and shows both ends of the scale."
try: { playground: board, starter: "board.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Turn the knob halfway. What does pin 0 read?", when: "s = 50", explain: "512 (1.65 V): half of the 0 to 1023 scale." }
  - check: { type: board, text: "Turn it all the way up.", when: "a = 1023", explain: "1023, for 3.3 V: the top of the scale." }
```

### Halfway

### All the way

## Worked example: number and volts

```step
stage: investigate
insight: "Converting between position, reading and volts models the move; Sam's 'the number is volts' is planted after the method."
tasks:
  - check:
      type: answer
      q: "The knob is a quarter of the way up. What does analog read give? (round to a whole number)"
      answer: "256"
      feedback:
        - ["25", "That is the percentage. Scale it to 1023."]
        - ["0.83", "That is the volts. Analog read gives the number."]
      explain: "0.25 × 1023 = 255.75 ≈ 256."
  - check:
      type: number
      q: "Pin 0 reads 818. About how many volts is that? (2 decimal places)"
      answer: 2.64
      tolerance: 0.02
      feedback:
        - [818, "818 is the reading, not the volts."]
        - [0.8, "That is the fraction of the way up. Times by 3.3."]
      explain: "818 ÷ 1023 = 0.8, and 0.8 × 3.3 = 2.64 V."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam is worried about the knob. Click the line where Sam's reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: reading-is-volts
      explain: "Line 3: 1023 is the top of analog read's scale, not volts. It stands for 3.3 V, the most a micro:bit pin can have."
```

### Halfway, in numbers

```worked
\text{position} = 50\% = 0.5 :: The knob is halfway.
\text{reading} = 0.5 \times 1023 \approx 512 :: Analog read scales 0 to 3.3 V onto 0 to 1023.
\text{volts} = \frac{512}{1023} \times 3.3 \approx 1.65\text{ V} :: Back to volts: the fraction of the scale, times 3.3.
1023 \to 3.3\text{ V}, \; 0 \to 0\text{ V} :: The ends of the scale.
```

Now a quarter of the way up.

### Number to volts

### Find the mistake

## Vary: a light sensor

```step
stage: modify
insight: "Swapping the knob for a light sensor in a divider shows the same move with a real-world input: light changes the voltage, so the number."
try: { playground: board, starter: "board.yml#vary", height: 540 }
tasks:
  - check: { type: board, text: "Cover the sensor: make it dark. What happens to the reading?", when: "s <= 10", explain: "It falls towards 0. Wired this way (light sensor on the 3V side) less light means less voltage on pin 0." }
  - check:
      type: number
      q: "Find the light level (%) where the reading passes 300."
      answer: 30
      tolerance: 1
      feedback:
        - [300, "That's the reading. Which light level gives it?"]
      explain: "300 ÷ 1023 ≈ 0.29, so about 29–30% light."
  - check:
      type: question
      q: "Swap the light sensor and the 10 kΩ resistor round. What happens to the reading as it gets darker?"
      options: ["It goes up instead of down", "It still goes down", "It stays at 512", "It reads 0 or 1"]
      answer: 0
      feedback: [null, "The sensor is now on the GND side: the divider is upside down.", "It still changes with light.", "Analog read still gives a number."]
      explain: "Which way the divider is wired decides whether brighter means a bigger or a smaller number."
```

### Dark

### The 300 mark

### Swap them

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Tinkercad's photoresistor and potentiometer, read with analog read and shown on the micro:bit, check the idea in a fuller simulator."
check: { type: reflect, text: "In Tinkercad: a potentiometer (outer legs to 3V and GND, middle to P0), and blocks to show analog read pin P0 as a number. Then a photoresistor and a 10 kΩ resistor as a divider. I changed the knob and the light and watched the number change." }
```

Tinkercad's photoresistor is not linear like the board's model: expect the numbers to bunch up at one end.

## Practise: readings

```step
stage: practise
insight: "Readings, volts and percentages both ways, and a threshold decision."
tasks:
  - check:
      type: number
      q: "3.3 V on pin 0 reads 1023. What does 0.66 V read? (whole number)"
      answer: 205
      tolerance: 1
      feedback:
        - [66, "Work out the fraction of 3.3 V first."]
      explain: "0.66 ÷ 3.3 = 0.2, and 0.2 × 1023 ≈ 205."
  - check:
      type: question
      q: "A plant alarm beeps when a soil sensor reads below 400. Which reading beeps?"
      options: ["350", "400", "650", "1023"]
      answer: 0
      feedback: [null, "Below 400, not equal to it.", "650 is above 400.", "That is the top of the scale."]
      explain: "Only 350 is below the threshold."
```

### Volts to a reading

### A threshold

## Make: a night light

```step
stage: make
insight: "Setting a threshold so the lights switch on at the right darkness reverses the process: from a behaviour to a number."
try: { playground: board, starter: "board.yml#make", height: 580 }
hint: ["Work out the reading at 20% light and at 40% light.", "20% reads about 205 and 40% about 409.", "Set the threshold between them (such as 300), then turn the light down to check the lights come on."]
check: { type: board, text: "Set the threshold so the lights come on when the light drops to 20%, but stay off at 40%. Then test it by making it dark.", when: "t > 205 and t <= 409 and l = 1", explain: "A threshold between 205 and 409 does it. Real night lights also leave a gap (hysteresis) so they don't flicker at dusk." }
```

Then build it in Tinkercad with an LED on another pin, or on a real micro:bit.
