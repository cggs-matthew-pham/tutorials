---
title: Variables and sensors in 5 minutes
---
## The idea in plain words

A **variable** is a named box that holds a value, such as `count`. Two blocks change what is in the box:

- **set count to 0** puts a new value in (the old one is thrown away).
- **change count by 1** adds to whatever is already there.

A **sensor** measures the world and hands the program a **number**: light level (0 dark to 255 bright), temperature (degrees Celsius), acceleration (tilt: below 0 one way, above 0 the other). A sensor is like a variable that the world keeps changing. The program only sees a new value when it reads the sensor again.

## Why programmers use them

Every device that counts or measures needs both: a step counter keeps a variable and changes it on each shake; a thermostat reads a temperature sensor again and again. Programs are mostly about keeping track of numbers like these.

## An everyday picture, and where it breaks

A variable is a tally on a whiteboard. *Change by 1* adds a stroke; *set to 0* wipes the board. A sensor is the thermometer on the wall: it keeps changing whether or not anyone looks.

Where it breaks: wiping the board inside **forever** happens many times a second, so the tally is always 0. And looking at the thermometer once (in **on start**) tells you the temperature at the start, not now.

## Try it yourself (5 minutes)

1. In the Count with a variable lesson, run the counter and press A a few times.
2. Move *set count to 0* into forever and press A again: it stays at 0.
3. In the Sensors lesson, drag the light slider and watch the number follow it.

## Questions students ask

- **"Why does my count stay at 0?"** The set block is in forever. Move it into on start.
- **"Why does the number take so long to show?"** Numbers above 9 scroll across the screen.
- **"Where is the slider?"** It appears in the simulator once the program uses that sensor.
- **"Is the temperature real?"** On a real micro:bit, yes, though it reads a little warm because the chip heats up.

## How it connects

The Decide unit asks questions about these numbers (*if light level < 50*), and the challenge keeps a best score in a variable.
