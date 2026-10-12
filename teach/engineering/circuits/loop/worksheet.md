---
title: "A complete loop"
subtitle: "Circuits with the micro:bit · Lighting an LED · Lesson 1"
---

# A complete loop

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** You switch pin 0 on, but the LED stays dark. The code is right. What else has to be true for current to flow?


:::teacher-note

**In one sentence:** Students break and remake a loop of pin 0, a resistor, an LED and GND on a board, see that current stops everywhere when the loop breaks anywhere, find that an LED only works one way round, then build the same circuit in Tinkercad.

**Students should be able to say:** I can explain why current needs a complete loop. I can wire an LED the right way round. I can find why an LED won't light.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Pin 0 is on and the LED is lit. You unclip the wire from the LED to GND. The LED…**

☐ Gets dimmer

☐ Stays lit: pin 0 still sends power to it

☐ Goes out

☐ Gets brighter

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It goes out. With the GND wire off the loop is broken, so no current flows anywhere in it.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: follow the loop


:::keep-together

### Trace it

1. $\text{pin 0 on: } 3.3\text{ V}$ — Code switches pin 0 on. It is 3.3 V above GND.
2. $\text{pin 0} \to \text{resistor} \to \text{LED}$ — Current flows out of pin 0 through the resistor and the LED.
3. $\text{LED} \to \text{GND } (0\text{ V})$ — It flows back into the micro:bit at GND.
4. $\text{one loop, one current}$ — The same current flows everywhere in the loop.
5. $\text{any break} \Rightarrow 0$ — Unclip any wire, or switch the pin to 0 V, and the current is 0 everywhere.

Now apply it: where in the loop is the current smallest?

**The loop is complete and pin 0 is on. Where is the current smallest?**

☐ In the GND wire, because the LED used it up

☐ In the resistor

☐ In the pin 0 wire, before it reaches the LED

☐ Nowhere: it is the same all the way round the loop

:::


:::teacher-note

**Answer:** Nowhere: it is the same all the way round the loop

In a single loop the same current flows everywhere. Parts use energy (voltage), not current.

:::


:::keep-together

### Find the mistake

**Sam's LED never lights. Click the line where Sam's plan first goes wrong.**

```
 1  Sam wants to save a wire.
 2  Pin 0 sends power out to the LED.
 3  So one wire from pin 0 to the LED is enough.
 4  The GND wire is not needed.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: pin 0 doesn't send power one way like a tap. Current flows round a loop, out of pin 0 and back into GND, so the GND wire is needed.

:::


:::typical

## Vary: the LED the wrong way round


**Turn it round.** 

**Check first.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad

Your teacher will give you the class code. Long leg of the LED towards the resistor and pin 0.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Loops


:::keep-together

### Which lights?

**Which of these lights the LED?**

☐ Pin 0 on → resistor → LED (short leg first) → GND

☐ Pin 0 on → resistor → LED (long leg first) → GND

☐ Pin 0 on → resistor → LED (long leg first), with no wire to GND

☐ Pin 0 off → resistor → LED (long leg first) → GND

:::


:::teacher-note

**Answer:** Pin 0 on → resistor → LED (long leg first) → GND

Only the first is a complete loop, the right way round, with the pin on.

:::


:::keep-together

### A torch

**A torch has a battery, a switch and a bulb. Turning the switch off…**

☐ Only stops current in the bulb

☐ Stops the battery making electricity

☐ Keeps the current in the battery until you need it

☐ Breaks the loop, so no current flows anywhere

:::


:::teacher-note

**Answer:** Breaks the loop, so no current flows anywhere

A switch is a deliberate break in the loop.

:::


## Make: fix the circuit


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Pin 0 is on, every wire is clipped, and the LED is dark. Give two possible reasons.**

{{lines-3}}

:::


:::teacher-note

**Answer:** The LED is the wrong way round, or a wire isn't really connected (the loop is broken). Also possible: the pin isn't actually on.

:::

