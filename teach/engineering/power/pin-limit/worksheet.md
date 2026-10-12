---
title: "Why a motor can't run from a pin"
subtitle: "Power and motors · Driving a motor · Lesson 1"
---

# Why a motor can't run from a pin

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** An LED on pin 9 lights perfectly. Swap it for a small motor, change nothing else, and nothing happens, except maybe a damaged Arduino. What's different?


:::teacher-note

**In one sentence:** Students try a motor straight on pin 9, compare the 700 mA it asks for with the 20 mA a pin gives, follow the two currents in a transistor circuit, see and fix the switch-off spike with a diode, and sort parts by whether a pin can drive them.

**Students should be able to say:** I can explain why a pin can't run a motor. I can describe how a transistor lets a pin switch a motor. I can say what a flyback diode is for.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A small motor is wired from pin 9 to GND. The sketch sets pin 9 HIGH. The motor…**

☐ Doesn't turn (or barely twitches), and the pin may be damaged

☐ Turns at full speed

☐ Turns slowly

☐ Turns, but the LED code needs changing first

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It doesn't turn: it needs about 700 mA to start and the pin gives about 20. Asking a pin for far more than 40 mA can damage it.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: the pin only switches


:::keep-together

### Two currents

1. $\text{pin 9} \to 1\text{ k}\Omega \to \text{transistor}$ — The pin gives about 4 mA, only to switch the transistor on.
2. $\text{battery +} \to \text{motor} \to \text{transistor}$ — The motor's 150–700 mA comes from the battery.
3. $\text{transistor} \to \text{battery −}, \text{GND}$ — Both currents return to the same ground.
4. $\text{pin: } 4\text{ mA} \ll 20\text{ mA} \;\checkmark$ — The pin is safe; the motor has all it needs.

Now: how far over is a pin when it tries to run the motor itself?

**The motor needs 700 mA to start. A pin can safely give 20 mA. How many times too much is that?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 35

700 ÷ 20 = 35 times what a pin should give.

:::


:::keep-together

### Find the mistake

**Sam's motor won't turn on pin 9. Click the line where Sam's reasoning first goes wrong.**

```
 1  The LED worked on pin 9, so the motor will too.
 2  digitalWrite(9, HIGH) switches the motor on.
 3  The motor doesn't turn, so the code must be wrong.
 4  Sam rewrites the code three times.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 1

Line 1: an LED needs about 10 mA, a motor hundreds. The pin can't supply it, so no code will fix it: it needs a transistor or driver and its own supply.

:::


:::typical

## Vary: switch it off


**Switch off.** 

**Fit the diode.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Which can a pin drive?


:::keep-together

**Sort each part: straight from a pin, or through a transistor or driver?**

Groups: Straight from a pin (with a resistor if it needs one), Through a transistor or driver

- An LED with a 220 Ω resistor (about 15 mA): {{field-15}}
- A small DC gear motor (150 mA running): {{field-15}}
- A piezo buzzer (a few mA): {{field-15}}
- A 12 V LED strip (500 mA): {{field-15}}
- A servo's signal wire (its power from 5V): {{field-15}}

:::


:::teacher-note

**Answer:** An LED with a 220 Ω resistor (about 15 mA) → Straight from a pin (with a resistor if it needs one); A small DC gear motor (150 mA running) → Through a transistor or driver; A piezo buzzer (a few mA) → Straight from a pin (with a resistor if it needs one); A 12 V LED strip (500 mA) → Through a transistor or driver; A servo's signal wire (its power from 5V) → Straight from a pin (with a resistor if it needs one)

Anything over about 20 mA needs its own supply, switched by the pin. A servo's signal wire carries almost no current; its power wire goes to a supply.

:::


## Make: wire it safely


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why can't you run a motor from an Arduino pin, and what do you use instead?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A pin gives about 20 mA and a motor needs hundreds. The pin switches a transistor or motor driver, which switches the motor's own battery.

:::

