---
title: "Sensors that vary"
subtitle: "Circuits with the micro:bit · Reading inputs · Lesson 4"
---

# Sensors that vary

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A button is on or off. But a room isn't just light or dark, and a volume knob isn't just loud or silent. How does a micro:bit measure something in between?


:::teacher-note

**In one sentence:** Students turn a knob on pin 0 and see analog read give 0 to 1023, convert between position, reading and volts, swap in a light sensor in a divider, and set a threshold for a night light.

**Students should be able to say:** I can explain what analog read gives. I can convert between a reading and volts. I can choose a threshold so a program decides at the right moment.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The knob is turned halfway. Analog read pin P0 gives about…**

☐ 1

☐ 1.65

☐ 50

☐ 512

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** About 512: halfway between 0 and 1023. The pin has about 1.65 V on it, but the reading is a number on a 0 to 1023 scale.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: number and volts


:::keep-together

### Halfway, in numbers

1. $\text{position} = 50\% = 0.5$ — The knob is halfway.
2. $\text{reading} = 0.5 \times 1023 \approx 512$ — Analog read scales 0 to 3.3 V onto 0 to 1023.
3. $\text{volts} = \frac{512}{1023} \times 3.3 \approx 1.65\text{ V}$ — Back to volts: the fraction of the scale, times 3.3.
4. $1023 \to 3.3\text{ V}, \; 0 \to 0\text{ V}$ — The ends of the scale.

Now a quarter of the way up.

**The knob is a quarter of the way up. What does analog read give? (round to a whole number)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 256

0.25 × 1023 = 255.75 ≈ 256.

:::


:::keep-together

### Number to volts

**Pin 0 reads 818. About how many volts is that? (2 decimal places)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2.64

818 ÷ 1023 = 0.8, and 0.8 × 3.3 = 2.64 V.

:::


:::keep-together

### Find the mistake

**Sam is worried about the knob. Click the line where Sam's reasoning first goes wrong.**

```
 1  The knob is turned all the way up.
 2  Analog read pin P0 gives 1023.
 3  So there are 1023 volts on pin 0.
 4  That is why the knob needs to be connected carefully.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: 1023 is the top of analog read's scale, not volts. It stands for 3.3 V, the most a micro:bit pin can have.

:::


:::typical

## Vary: a light sensor


**Dark.** 

**The 300 mark.** 

**Swap them.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad

Tinkercad's photoresistor is not linear like the board's model: expect the numbers to bunch up at one end.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Readings


:::keep-together

### Volts to a reading

**3.3 V on pin 0 reads 1023. What does 0.66 V read? (whole number)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 205

0.66 ÷ 3.3 = 0.2, and 0.2 × 1023 ≈ 205.

:::


:::keep-together

### A threshold

**A plant alarm beeps when a soil sensor reads below 400. Which reading beeps?**

☐ 350

☐ 400

☐ 650

☐ 1023

:::


:::teacher-note

**Answer:** 350

Only 350 is below the threshold.

:::


## Make: a night light

Then build it in Tinkercad with an LED on another pin, or on a real micro:bit.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Pin 0 reads 256. Roughly how many volts are on it, and what fraction of the way up is the knob?**

{{lines-3}}

:::


:::teacher-note

**Answer:** About a quarter of the way up, so about 0.83 V (256 ÷ 1023 × 3.3).

:::

