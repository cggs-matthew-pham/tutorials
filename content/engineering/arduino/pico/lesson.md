---
order: 8
unit: hardware
optional: true
title: The same project on a Pico
summary: "A Raspberry Pi Pico runs MicroPython. The ideas carry straight over (pins as outputs, reading a sensor, deciding, timing), but the words change, and so do two numbers: time.sleep takes seconds, and read_u16 gives 0 to 65535, not 0 to 1023."
language: maths
hook: "Many schools have Raspberry Pi Picos, and they run Python, which you may already know. Port the plant-water alarm. What changes, and what stays the same?"
---
The same alarm, in **MicroPython** on a **Raspberry Pi Pico**. The LED is on **GP15**; the sensor is on **GP26**, the Pico's first analog pin.

```python
from machine import Pin, ADC
import time

led = Pin(15, Pin.OUT)      # like pinMode(15, OUTPUT)
sensor = ADC(26)            # an analog input

while True:                 # like loop()
    level = sensor.read_u16()   # 0 to 65535
    if level <= 19200:
        led.value(1)            # like digitalWrite(15, HIGH)
        time.sleep(0.25)        # seconds, not milliseconds
        led.value(0)
        time.sleep(0.25)
    else:
        led.value(0)
        time.sleep(0.1)
```

## Predict: the threshold

```step
stage: predict
insight: "Committing to whether 300 still works as the threshold tests the new move: the idea transfers, but the numbers have to be converted."
check:
  type: predict
  q: "On the Arduino, the alarm blinks at 300 or below (out of 1023). Can the Pico sketch keep the number 300?"
  options: ["No: read_u16 gives 0 to 65535, so 300 is almost bone dry", "Yes: the sensor is the same", "Yes: MicroPython converts it", "No: the Pico can't read sensors"]
  actual: "No. The Pico's read_u16 gives 0 to 65535. 300 out of 1023 is about 29%, which is about 19200 out of 65535."
```

## Worked example: line for line

```step
stage: investigate
insight: "Matching each Arduino line to its MicroPython line models the move (the same idea in new words); the two number changes are worked through explicitly. Sam's port, with both numbers copied straight across, is planted after the method."
tasks:
  - check:
      type: match
      q: "Match each Arduino line to the MicroPython line that does the same job."
      pairs:
        - ["pinMode(15, OUTPUT);", "led = Pin(15, Pin.OUT)"]
        - ["digitalWrite(15, HIGH);", "led.value(1)"]
        - ["level = analogRead(A0);", "level = sensor.read_u16()"]
        - ["delay(250);", "time.sleep(0.25)"]
        - ["void loop() { … }", "while True:"]
      explain: "The same five ideas: set up a pin, switch it, read a sensor, wait, repeat for ever."
  - check:
      type: number
      q: "The Arduino threshold is 300 out of 1023. What is that out of 65535? (nearest hundred)"
      answer: 19200
      tolerance: 60
      feedback:
        - [300, "The scale is different: work out the fraction first."]
        - [65535, "That is the whole range."]
      explain: "300 ÷ 1023 ≈ 0.293, and 0.293 × 65535 ≈ 19200."
  - check:
      type: bug
      code: "alarm.py#sam"
      text: "Sam's Pico port never blinks, and when Sam taps the sensor it stays on for minutes. Click the first line that goes wrong."
      answer: 6
      fault: logic
      misconception: pico-same-numbers
      explain: "Line 6: 300 is the Arduino's scale. read_u16 gives 0 to 65535, so it should be about 19200. (Line 8 has the other copied number: time.sleep(250) waits 250 seconds.)"
```

### Match the lines

### Two numbers that change

```worked
\text{read: } 0 \ldots 1023 \to 0 \ldots 65535 :: A different scale, the same voltage.
300 \div 1023 \approx 0.293 :: The threshold as a fraction of the range.
0.293 \times 65535 \approx 19200 :: The same threshold on the Pico.
\text{delay(250)} \to \text{time.sleep(0.25)} :: Milliseconds to seconds: ÷ 1000.
```

### Find the mistake

## Vary: put it together

```step
stage: modify
insight: "Ordering the MicroPython lines checks the structure transfers: imports and set-up first, then the loop with its decision."
check:
  type: parsons
  code: "alarm.py#alarm"
  text: "Put the Pico alarm in order."
  explain: "Imports, then set up the pins, then while True: read, decide, act."
```

## Try it in Wokwi or on a Pico

```step
stage: modify
tier: typical
insight: "Running the port on a simulated or real Pico confirms the converted numbers."
check: { type: reflect, text: "In Wokwi (or Thonny on a real Pico): an LED on GP15, a potentiometer on GP26, and the alarm sketch. I printed level with print(level) and checked the alarm blinks below about 19200." }
```

## Practise: converting

```step
stage: practise
insight: "Converting timings and readings both ways."
tasks:
  - check:
      type: number
      q: "delay(1500) on the Arduino. What goes in time.sleep( ) on the Pico?"
      answer: 1.5
      feedback:
        - [1500, "time.sleep takes seconds."]
      explain: "1500 ms = 1.5 s."
  - check:
      type: question
      q: "Which part of the alarm needed no change at all?"
      options: ["The idea: read, compare with a threshold, blink or stay off", "The threshold number", "The timing numbers", "The pin numbers' names"]
      answer: 0
      feedback: [null, "It changes scale.", "Seconds, not milliseconds.", "GP15, not 13."]
      explain: "The design transfers; the language and its numbers change."
```

### Timing

### What stayed

## Make: port the fridge alarm

```step
stage: make
insight: "Converting a three-band brief's thresholds to the Pico's scale applies both number changes to a new design."
check:
  type: number
  q: "The fridge alarm's thresholds were 400 and 700 (out of 1023). What is 700 on the Pico's scale? (nearest hundred)"
  answer: 44800
  tolerance: 100
  feedback:
    - [700, "Convert the scale: 700 ÷ 1023, then × 65535."]
  explain: "700 ÷ 1023 ≈ 0.684, and 0.684 × 65535 ≈ 44800. (400 becomes about 25600.)"
```
