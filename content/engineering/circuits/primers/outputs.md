---
title: Lighting an LED in 5 minutes
---
## The idea in plain words

Electric **current** only flows around a **complete loop**: out of a pin, through the parts, and back to **GND** (ground, 0 V). Break the loop anywhere (an unclipped wire, a part the wrong way round) and the current stops everywhere in it at once. A pin is not a tap that pushes power one way.

An **LED** lets current through one way only (the long leg towards the pin), and uses about 2 V. A micro:bit pin gives 3.3 V, so 1.3 V is left over. With nothing else in the loop, that would push far more current than the LED can take (about 20 mA). A **resistor** limits it. **Ohm's law**: current = voltage ÷ resistance, so 1.3 V ÷ 220 Ω ≈ 0.006 A = 6 mA. In a single loop the current is the same everywhere, so the resistor works before or after the LED.

## What students get wrong

- **One wire is enough.** The current needs a way back to GND.
- **The resistor must go first.** Same loop, same current, either side.
- **An LED works either way round.** It is a one-way valve.

## The words

**current** (mA), **voltage** (V), **resistance** (Ω), **complete loop** (circuit), **GND**, **LED**, **resistor**, **Ohm's law**.

## In Tinkercad

Tinkercad Circuits has a micro:bit, LEDs and resistors; MakeCode blocks run it. Hovering over an LED with too much current shows a warning. Set up a class with a class code so students need no email.
