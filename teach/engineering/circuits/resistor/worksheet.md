---
title: "Why the resistor"
subtitle: "Circuits with the micro:bit · Lighting an LED · Lesson 2"
---

# Why the resistor

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every LED circuit in every kit has a small striped part next to the LED. Leave it out and the LED works brilliantly, for about a second. What is it doing?


:::teacher-note

**In one sentence:** Students take the resistor out of an LED circuit, compare resistor sizes, use Ohm's law with the LED's 2 V taken off to find the current and the smallest safe resistor, test that the resistor works on either side of the LED, and choose one for a target current.

**Students should be able to say:** I can explain what a resistor does in an LED circuit. I can use Ohm's law to work out the current. I can choose a resistor for a safe current.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You take the resistor out and join the LED straight to pin 0. What happens?**

☐ The LED is brighter, and that's fine

☐ Far too much current flows, and the LED is damaged

☐ Nothing changes: the resistor does nothing

☐ The LED goes out: the loop is broken

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Far too much current: about 100 mA, five times the LED's limit. The resistor is what keeps the current safe.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: how much current?


:::keep-together

### Ohm's law with an LED

1. $3.3 - 2 = 1.3\text{ V}$ — Pin 0 gives 3.3 V. The LED uses about 2 V, so 1.3 V is left across the resistor.
2. $I = \frac{V}{R} = \frac{1.3}{220}$ — Ohm's law: current = voltage ÷ resistance.
3. $I = 0.0059\text{ A}$ — In amps.
4. $0.0059 \times 1000 = 5.9\text{ mA}$ — Times 1000 for milliamps.
5. $5.9 < 20 \;\checkmark$ — Under the LED's 20 mA: safe.

Now do the same for 470 Ω.

**Now 470 Ω. How many milliamps? (1 decimal place)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2.8

1.3 ÷ 470 = 0.00277 A ≈ 2.8 mA.

:::


:::keep-together

### Work backwards

**Work backwards: what resistance gives exactly 20 mA (0.02 A)? (ohms)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 65

R = 1.3 ÷ 0.02 = 65 Ω. Anything bigger is safe; kits use 220 Ω to leave a margin.

:::


:::keep-together

### Find the mistake

**Sam is sure a resistor after the LED won't protect it. Click the line where Sam's reasoning first goes wrong.**

```
 1  The current comes out of pin 0.
 2  It reaches the LED first, so the LED gets the full current.
 3  So the resistor has to go before the LED to protect it.
 4  After the LED it would be too late.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: in a single loop the current is the same everywhere. It doesn't arrive at the LED first and then slow down: the resistor limits the current in the whole loop, wherever it sits.

:::


:::typical

## Vary: change one thing


**Move it.** 

**Very big.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad

Tinkercad's LED and pin are not exactly the board's model, so expect close, not identical, numbers.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Ohm's law


:::keep-together

### 1 kΩ

**1 kΩ (1000 Ω): how many milliamps? (1 decimal place)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1.3

1.3 ÷ 1000 = 0.0013 A = 1.3 mA.

:::


:::keep-together

### Choose for 10 mA

**You want 10 mA (0.01 A). What resistance? (ohms)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 130

1.3 ÷ 0.01 = 130 Ω.

:::


:::keep-together

### Review: dark LED

**Review: the LED is dark with a 220 Ω resistor in the loop. Which is NOT a likely cause?**

☐ Pin 0 is off

☐ The LED is the wrong way round

☐ The resistor is too big

☐ The GND wire is off

:::


:::teacher-note

**Answer:** The resistor is too big

220 Ω still gives about 6 mA: plenty to see.

:::


## Make: choose and place


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**With a 330 Ω resistor and a 2 V LED on a 3.3 V pin, how much current flows? Is it safe?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1.3 ÷ 330 ≈ 0.0039 A ≈ 3.9 mA: safe, under 20 mA.

:::

