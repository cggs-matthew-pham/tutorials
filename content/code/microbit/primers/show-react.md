---
title: Show and react in 5 minutes
---
## The idea in plain words

A micro:bit program is blocks that run **in order**, from top to bottom. Where you put a block decides **when** it runs:

- **on start** runs its blocks **once**, when the micro:bit switches on. The last picture stays on the screen.
- **forever** runs its blocks **again and again**. That is a **loop**, and it turns a few pictures into an animation.
- **Event blocks** such as *on button A pressed* or *on shake* **wait**, and run their blocks **every time** that thing happens.

The **simulator** (the picture of a micro:bit beside the blocks) runs the program straight away, so no real micro:bit is needed.

## Why programmers use them

Almost every device works this way. A pedestrian crossing loops through its lights, and a doorbell waits for a press. Knowing which blocks run once, which repeat and which wait is the first step to making a device do what you want.

## An everyday picture, and where it breaks

on start is a morning announcement: it is read out once. forever is a looping playlist. An event block is a doorbell: it does nothing until someone presses it, and then rings every single time.

Where it breaks: a doorbell checked only during the morning announcement would never ring. That is the most common bug: checking a button in on start, which looks once and never again.

## Try it yourself (5 minutes)

1. Open the first lesson. Put two **show icon** blocks in **on start** and watch: the second picture stays.
2. Drag both into **forever**. The pictures now repeat.
3. In the second lesson, add *on button A pressed* (from Input) with a picture inside. Click **A** in the simulator.

## Questions students ask

- **"Why did it only play once?"** The blocks are in on start. Move them into forever.
- **"Why does nothing happen when I press A?"** The picture is not inside an *on button A pressed* block.
- **"How do I press A and B together in the simulator?"** Click the A+B button under the micro:bit.
- **"Can I put it on a real micro:bit?"** Yes: press Download and drag the file onto the micro:bit.

## How it connects

Every later unit builds on these three holders: a button changes a variable, forever checks a sensor and decides, and radio adds a new event, *on radio received*.
