---
title: "The same project on a Pico"
subtitle: "Arduino · Real hardware · Lesson 8"
---

# The same project on a Pico

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Many schools have Raspberry Pi Picos, and they run Python, which you may already know. Port the plant-water alarm. What changes, and what stays the same?


:::teacher-note

**In one sentence:** An optional lesson. Students port the plant-water alarm from Arduino C++ to MicroPython on a Raspberry Pi Pico, matching line to line, converting the threshold (0–1023 to 0–65535) and the timing (milliseconds to seconds), ordering the Python, and running it in Wokwi or on a real Pico.

**Students should be able to say:** I can match Arduino C++ to MicroPython line by line. I can convert a threshold and a timing between the two.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**On the Arduino, the alarm blinks at 300 or below (out of 1023). Can the Pico sketch keep the number 300?**

☐ No: the Pico can't read sensors

☐ No: read_u16 gives 0 to 65535, so 300 is almost bone dry

☐ Yes: the sensor is the same

☐ Yes: MicroPython converts it

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No. The Pico's read_u16 gives 0 to 65535. 300 out of 1023 is about 29%, which is about 19200 out of 65535.

:::


## Worked example: line for line


:::keep-together

### Match the lines

**Match each Arduino line to the MicroPython line that does the same job.**

A. level = sensor.read_u16()

B. led = Pin(15, Pin.OUT)

C. while True:

D. led.value(1)

E. time.sleep(0.25)

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `pinMode(15, OUTPUT);` | |
| `digitalWrite(15, HIGH);` | |
| `level = analogRead(A0);` | |
| `delay(250);` | |
| `void loop() { … }` | |

:::


:::teacher-note

**Answer:** pinMode(15, OUTPUT); → B. led = Pin(15, Pin.OUT); digitalWrite(15, HIGH); → D. led.value(1); level = analogRead(A0); → A. level = sensor.read_u16(); delay(250); → E. time.sleep(0.25); void loop() { … } → C. while True:

The same five ideas: set up a pin, switch it, read a sensor, wait, repeat for ever.

:::


:::keep-together

### Two numbers that change

1. $\text{read: } 0 \ldots 1023 \to 0 \ldots 65535$ — A different scale, the same voltage.
2. $300 \div 1023 \approx 0.293$ — The threshold as a fraction of the range.
3. $0.293 \times 65535 \approx 19200$ — The same threshold on the Pico.
4. $\text{delay(250)} \to \text{time.sleep(0.25)}$ — Milliseconds to seconds: ÷ 1000.

**The Arduino threshold is 300 out of 1023. What is that out of 65535? (nearest hundred)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 19200

300 ÷ 1023 ≈ 0.293, and 0.293 × 65535 ≈ 19200.

:::


:::keep-together

### Find the mistake

**Sam's Pico port never blinks, and when Sam taps the sensor it stays on for minutes. Click the first line that goes wrong.**

```
 1  from machine import Pin, ADC
 2  import time
 3  led = Pin(15, Pin.OUT)
 4  sensor = ADC(26)
 5  while True:
 6      if sensor.read_u16() <= 300:
 7          led.value(1)
 8          time.sleep(250)
 9          led.value(0)
10          time.sleep(250)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

Line 6: 300 is the Arduino's scale. read_u16 gives 0 to 65535, so it should be about 19200. (Line 8 has the other copied number: time.sleep(250) waits 250 seconds.)

:::


:::typical

## Vary: put it together


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Try it in Wokwi or on a Pico


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Converting


:::keep-together

### Timing

**delay(1500) on the Arduino. What goes in time.sleep( ) on the Pico?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1.5

1500 ms = 1.5 s.

:::


:::keep-together

### What stayed

**Which part of the alarm needed no change at all?**

☐ The timing numbers

☐ The threshold number

☐ The idea: read, compare with a threshold, blink or stay off

☐ The pin numbers' names

:::


:::teacher-note

**Answer:** The idea: read, compare with a threshold, blink or stay off

The design transfers; the language and its numbers change.

:::


## Make: port the fridge alarm


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Name the two numbers that must change when you port the alarm to the Pico, and how.**

{{lines-3}}

:::


:::teacher-note

**Answer:** The threshold (scale from 0–1023 to 0–65535, × about 64) and the delays (milliseconds to seconds, ÷ 1000).

:::

