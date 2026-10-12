---
title: "A button is an input"
subtitle: "Circuits with the micro:bit · Reading inputs · Lesson 3"
---

# A button is an input

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The micro:bit has buttons A and B built in. Wire your own button to a pin, and it can be a doorbell, a game controller or a sensor on a door. How does a pin know it has been pressed?


:::teacher-note

**In one sentence:** Students hold and release a button wired from 3V to pin 0, see digital read give 1 and 0, trace what pin 0 is joined to in each state, remove the pull-down resistor to see the pin float, and put the reading-and-reacting program in order.

**Students should be able to say:** I can explain what digital read gives for 3.3 V and 0 V. I can explain why a button needs a pull-down (or pull-up) resistor. I can put a program in order that reacts to a button.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The button joins 3V to pin 0 while you hold it. While you hold it, digital read pin P0 gives…**

☐ 0

☐ 1

☐ 3.3

☐ 1023

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 1. Holding the button joins pin 0 to 3.3 V, and digital read reports that as 1.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: two paths to pin 0


:::keep-together

### What is pin 0 joined to?

1. $\text{held: } 3\text{V} \to \text{button} \to \text{pin 0}$ — The button joins pin 0 straight to 3.3 V.
2. $\text{held: reads } 1$ — 3.3 V reads as 1.
3. $\text{up: pin 0} \to 10\text{ k}\Omega \to \text{GND}$ — The button is open; the pull-down joins pin 0 to GND.
4. $\text{up: reads } 0$ — 0 V reads as 0.

Now: while the button is held, pin 0 is joined to both. Why does 3V win?

**While the button is held, pin 0 is joined to 3V through the button and to GND through the 10 kΩ pull-down. Why does it read 1?**

☐ Pin 0 adds the two voltages

☐ The button joins it straight to 3V; the 10 kΩ only lets a tiny current leak to GND

☐ It doesn't: it reads 0

☐ The pull-down switches off when the button is pressed

:::


:::teacher-note

**Answer:** The button joins it straight to 3V; the 10 kΩ only lets a tiny current leak to GND

The button is a direct join to 3.3 V. The big resistor to GND only lets about 0.3 mA through, so pin 0 stays at 3.3 V.

:::


:::keep-together

### Find the mistake

**Sam's doorbell sometimes rings when nobody has pressed it. Click the line where Sam's reasoning first goes wrong.**

```
 1  When the button is up, pin 0 is joined to nothing.
 2  Joined to nothing means 0 volts.
 3  So pin 0 reads 0.
 4  So the pull-down resistor is not needed.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: a pin joined to nothing isn't at 0 V. It floats, picking up electrical noise from nearby wires and your hand, and reads 0 or 1 at random. That is the doorbell ringing by itself.

:::


:::typical

## Vary: no pull-down


**Float.** 

**Pull it down.** 

**A press counter.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Inputs


:::keep-together

### Pin to GND

**Pin 1 is joined straight to GND. Digital read pin P1 gives…**

☐ 1023

☐ 0

☐ 1

☐ It changes at random

:::


:::teacher-note

**Answer:** 0

Joined to 0 V, it reads 0.

:::


:::keep-together

### A pull-up

**Another way to wire it: the button joins pin 0 to GND, and a 10 kΩ pull-up joins pin 0 to 3V. What does pin 0 read while the button is held?**

☐ 0

☐ It floats

☐ 0.5

☐ 1

:::


:::teacher-note

**Answer:** 0

Held: joined to GND, reads 0. Up: the pull-up holds it at 1. The mirror image of a pull-down, and how many boards wire their buttons (Arduino's INPUT_PULLUP).

:::


## Make: the doorbell program

Then build it in Tinkercad, or on a real micro:bit with a button and a resistor on a breadboard.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why does a button wired from 3V to a pin need a resistor from the pin to GND?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So the pin is held at 0 V (reads 0) when the button is up. Without it the pin floats and reads 0 or 1 at random.

:::

