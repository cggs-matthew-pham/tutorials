---
title: "Motor drivers"
subtitle: "Power and motors · Driving a motor · Lesson 2"
---

# Motor drivers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A transistor switches a motor on and off. But a robot has to reverse, and go slowly round corners. How does a pin make a motor go backwards?


:::teacher-note

**In one sentence:** Students drive a motor through an H-bridge driver, using two direction inputs and a PWM enable, read the three signals in a sketch, find a PWM signal on the wrong pin, and compare braking with coasting.

**Students should be able to say:** I can make a motor go forwards, backwards and stop with a driver. I can set a motor's speed with PWM on the enable pin.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The motor goes forwards with IN1 HIGH, IN2 LOW and ENA at 200. How do you make it go backwards at the same speed?**

☐ Set both IN1 and IN2 LOW

☐ Set ENA to −200

☐ Swap them: IN1 LOW, IN2 HIGH, ENA still 200

☐ Set ENA to 55

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Swap IN1 and IN2. ENA only sets speed (0 to 255); it can't be negative. Both LOW stops the motor.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: the signals in code


:::keep-together

### Direction, then speed

1. $\text{digitalWrite(8, HIGH)}$ — IN1 HIGH.
2. $\text{digitalWrite(7, LOW)}$ — IN2 LOW: forwards.
3. $\text{analogWrite(9, 128)}$ — ENA at 128 of 255: about half speed.
4. $\text{swap 8 and 7}$ — Backwards. ENA is unchanged.

Now backwards at three-quarter speed.

**IN1 on pin 8, IN2 on pin 7, ENA on pin 9. Which lines make the motor go backwards at three-quarter speed?**

☐ analogWrite(8, 191); analogWrite(7, 0);

☐ digitalWrite(8, LOW); digitalWrite(7, HIGH); analogWrite(9, 191);

☐ digitalWrite(9, LOW); analogWrite(8, 191);

☐ digitalWrite(8, HIGH); digitalWrite(7, LOW); analogWrite(9, -191);

:::


:::teacher-note

**Answer:** digitalWrite(8, LOW); digitalWrite(7, HIGH); analogWrite(9, 191);

Direction on 8 and 7, speed 191 (75% of 255) on ENA.

:::


:::keep-together

### Find the mistake

**Sam's motor turns at full speed whatever Sam does. Click the line where Sam's sketch goes wrong.**

```
 1  void setup() {
 2    pinMode(8, OUTPUT);
 3    pinMode(7, OUTPUT);
 4  }
 5  
 6  void loop() {
 7    digitalWrite(8, HIGH);
 8    digitalWrite(7, LOW);
 9    analogWrite(8, 128);
10    delay(2000);
11  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

Line 9: speed belongs on ENA (pin 9, a PWM pin). Pin 8 is a direction input and has no PWM; analogWrite there just sets it HIGH. ENA was never set, so on a driver with ENA tied HIGH it runs flat out.

:::


:::typical

## Vary: change one thing


**Brake.** 

**Coast.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Drive codes


:::keep-together

### Two motors

**A robot has a left and a right motor. The left goes forwards and the right goes backwards, both at the same speed. The robot…**

☐ Goes forwards

☐ Stops

☐ Goes backwards

☐ Spins on the spot

:::


:::teacher-note

**Answer:** Spins on the spot

Opposite directions turn it on the spot.

:::


:::keep-together

### Speed

**ENA is at 64. What percentage of full speed is that (to the nearest whole number)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 25

64 ÷ 255 ≈ 25%.

:::


## Make: a gentle start


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Write the three lines that make a motor (IN1 on 8, IN2 on 7, ENA on 9) go forwards at full speed.**

{{lines-3}}

:::


:::teacher-note

**Answer:** digitalWrite(8, HIGH); digitalWrite(7, LOW); analogWrite(9, 255);

:::

