---
title: "Outputs that vary"
subtitle: "Arduino · Writing C++ · Lesson 5"
---

# Outputs that vary

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A digital pin is only ever 0 V or 5 V. So how does a dimmer switch, a fading LED or a motor speed control work from one?


:::teacher-note

**In one sentence:** Students see analogWrite(9, 128) as a fast on-off signal rather than a lower voltage, scale a knob's 0–1023 down to 0–255, meet the real board's behaviour when they don't (it wraps round), find that only the ~ pins can do PWM, and turn the mapping round.

**Students should be able to say:** I can explain what analogWrite does to a pin. I can scale a reading from 0–1023 to 0–255. I can say which Uno pins can do PWM.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**analogWrite(9, 128); — what does pin 9 do?**

☐ Switches between 5 V and 0 V very fast, on about half the time

☐ Switches off

☐ Stays at 5 V

☐ Stays at 2.5 V

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It switches fully on and off, about 490 times a second, on for 128/255 of each cycle. Your eye averages it, so the LED looks about half as bright.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: knob to brightness


:::keep-together

### Scale it

1. $\text{analogRead(A0)} \to 0 \ldots 1023$ — The knob, as before.
2. $\text{analogWrite} \leftarrow 0 \ldots 255$ — Brightness: 0 off, 255 fully on.
3. $1024 \div 256 = 4$ — The input range is 4 times the output range.
4. $512 \div 4 = 128$ — Halfway on the knob gives 128.
5. $128 \div 255 \approx 0.5$ — On for about half of each cycle.

Now the top of the knob.

**The knob reads 1023. What does analogWrite get after level / 4?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 255

1023 / 4 = 255 in whole numbers: fully on.

:::


:::keep-together

### On how long?

**analogWrite(9, 64). For how much of each cycle is the pin on?**

☐ 64 cycles out of 100

☐ About half

☐ All of it, at a quarter of the voltage

☐ About a quarter

:::


:::teacher-note

**Answer:** About a quarter

64 ÷ 255 ≈ 0.25: on a quarter of the time, at the full 5 V.

:::


:::keep-together

### Find the mistake

**As Sam turns the knob up, the LED gets brighter, then suddenly dark, then brighter again, four times over. Click the line where Sam's sketch goes wrong.**

```
 1  int level = 0;
 2  
 3  void setup() {
 4  }
 5  
 6  void loop() {
 7    level = analogRead(A0);
 8    analogWrite(9, level);
 9    delay(50);
10  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

Line 8: analogRead gives 0–1023 but analogWrite takes 0–255. The board keeps only the lowest 8 bits, so 256 acts like 0 and it starts again. Use level / 4.

:::


:::typical

## Vary: change one thing


**Smooth.** 

**Not a PWM pin.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## PWM


:::keep-together

### 75%

**You want the LED on for 75% of each cycle. What value? (whole number)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 191

0.75 × 255 ≈ 191.

:::


:::keep-together

### Which pin

**Which Uno pin can fade an LED with analogWrite?**

☐ 2

☐ 7

☐ 10

☐ 12

:::


:::teacher-note

**Answer:** 10

PWM pins are 3, 5, 6, 9, 10 and 11.

:::


## Make: turn it round


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why does analogWrite(9, 128) make an LED look half as bright, if the pin is only ever 0 V or 5 V?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The pin is on for half of each cycle and switches too fast to see, so the eye sees the average: half as bright.

:::

