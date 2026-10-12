---
title: "Same circuit, new board"
subtitle: "Arduino · A new board · Lesson 1"
---

# Same circuit, new board

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Most electronics kits, sensors and project guides assume an Arduino. The circuits are the ones you already know. What changes is the board, and then the language.


:::teacher-note

**In one sentence:** Students run a blink sketch whose pin number doesn't match the wiring, fix every pin number, see the dim pull-up glow of a missing pinMode, build the circuit on an Uno in Tinkercad blocks and read the C++ beside them, then write a short sketch for a new pin.

**Students should be able to say:** I can match the pin numbers in a sketch to the wiring. I can set a pin as an output and switch it on and off. I can find the C++ behind Tinkercad's blocks.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The LED (with its resistor) is wired to pin 12. The sketch above uses pin 13. When it runs, the LED…**

☐ Blinks, but dimly

☐ Stays on

☐ Blinks: the code makes it blink

☐ Stays dark

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It stays dark. Pin 13 blinks, but nothing is wired to it. The LED is on pin 12, which the code never switches.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: read the pins


:::keep-together

### Every pin number

1. $\text{pinMode(13, OUTPUT)}$ — Sets pin 13 up as an output. Pin 13, not the LED's pin 12.
2. $\text{digitalWrite(13, HIGH)}$ — Switches pin 13 to 5 V. Nothing is wired there.
3. $\text{digitalWrite(13, LOW)}$ — Switches pin 13 back to 0 V.
4. $\text{LED on pin 12}$ — Pin 12 is never set up or switched, so the LED stays dark.
5. $\text{fix: 12 in every line}$ — Or move the wire to pin 13. Code and wiring must agree.

Now find every line to change.

**Which lines must change so the sketch blinks the LED on pin 12?**

☐ Only pinMode

☐ All three: pinMode and both digitalWrite lines

☐ Only the first digitalWrite

☐ None: change the wire instead

:::


:::teacher-note

**Answer:** All three: pinMode and both digitalWrite lines

Every line that names a pin must name 12: setting it up, switching it on and switching it off.

:::


:::keep-together

### Find the mistake

**Sam's LED is on pin 13. It doesn't blink: it just glows very dimly now and then. Click the line where Sam's sketch goes wrong.**

```
 1  void setup() {
 2    pinMode(12, OUTPUT);
 3  }
 4  
 5  void loop() {
 6    digitalWrite(13, HIGH);
 7    delay(500);
 8    digitalWrite(13, LOW);
 9    delay(500);
10  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: pin 13 was never set as an OUTPUT (pin 12 was). Writing HIGH to a pin that is still an input only switches on its weak pull-up, so the LED glows dimly instead of lighting.

:::


:::typical

## Vary: change the pin


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Pins


:::keep-together

### Set up a pin

**A buzzer is wired to pin 8. Which line sets it up?**

☐ pinMode(8);

☐ digitalWrite(8, OUTPUT);

☐ pinMode(8, OUTPUT);

☐ pinMode(OUTPUT, 8);

:::


:::teacher-note

**Answer:** pinMode(8, OUTPUT);

pinMode(pin, mode): pin 8, as an OUTPUT.

:::


:::keep-together

### A dim glow

**An LED glows very dimly instead of lighting, and the pin numbers all match. What is the most likely cause?**

☐ The pin was never set with pinMode(pin, OUTPUT)

☐ delay is too short

☐ The LED is the wrong way round

☐ The resistor is too small

:::


:::teacher-note

**Answer:** The pin was never set with pinMode(pin, OUTPUT)

HIGH on a pin left as an input only turns on its weak pull-up: a faint glow.

:::


## Make: your own sketch


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**An LED is wired to pin 4. Write the two lines that set it up and switch it on.**

{{lines-3}}

:::


:::teacher-note

**Answer:** pinMode(4, OUTPUT); (in setup) and digitalWrite(4, HIGH); (in loop).

:::

