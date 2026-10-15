---
title: "Send data to the computer"
subtitle: "micro:bit and the computer · Talk over USB · Lesson 1"
---

# Send data to the computer

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Weather stations, heart-rate monitors and the sensors in a science lab all do the same simple thing: send a reading, wait, send the next. A computer collects the readings and draws the graph.


:::teacher-note

**In one sentence:** Students make a micro:bit send sensor readings to the computer over USB as named lines of text, and watch them graphed.

**Students should be able to say:** I can send a sensor reading to the computer again and again. I can explain what travels down the cable (a named line of text). I can send two values and choose how often they are sent.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b4960c33e4a3.png?v=fb3a9231a6407ea8)

:::keep-together

**This program runs on a micro:bit plugged into a computer. What arrives at the computer every half second?**

☐ A picture of the LEDs

☐ Just the number 128

☐ A line of text, such as light:128

☐ A graph

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A line of text: the name light, a colon, and the reading. The computer draws the graph from the lines; the micro:bit only sends text.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b4960c33e4a3.png?v=fb3a9231a6407ea8)

:::keep-together

### Names

**Why does each line start with a name (light:)?**

☐ To make the number bigger

☐ So the micro:bit remembers it

☐ The cable needs a name to work

☐ So the computer can tell different values apart when there are several

:::


:::teacher-note

**Answer:** So the computer can tell different values apart when there are several

With light:128 and temperature:21 arriving on the same cable, the name says which is which. The graph draws one line per name.

:::


:::keep-together

### No pause

**You delete the pause. What happens?**

☐ One reading is sent, then it stops

☐ Nothing is sent

☐ The readings get more accurate

☐ Readings pour out as fast as the micro:bit can send them, far more than you need

:::


:::teacher-note

**Answer:** Readings pour out as fast as the micro:bit can send them, far more than you need

Forever repeats as fast as it can. The pause sets how many readings a second you get: 500 ms is two a second.

:::


:::keep-together

### Ben's logger

Ben's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ca105b06a77d.png?v=9c7f73c9df351e18)

**Ben's program sends one reading when the micro:bit starts, then nothing. Why?**

☐ Light level only works once

☐ The board can only read one line

☐ The cable is broken

☐ The block is in on start, not in forever, so it runs only once

:::


:::teacher-note

**Answer:** The block is in on start, not in forever, so it runs only once

A logger has to read and send again and again: the send goes in forever, with a pause.

:::


:::typical

## Modify


**Two values.** Send the **temperature** too, with its own name. In Show data (or on the board), each name gets its own line.

**Faster.** Make it send **ten readings a second**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Two values:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5262cf649412.png?v=4275f888f88ee62e)

**Faster:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/02d65e58fd38.png?v=7f2858d085f2cf20)

:::

:::


## Make

Make a **tilt logger**: send the micro:bit's **x** and **y** acceleration five times a second, and send the line **mark** when **A** is pressed, so you can mark a moment on the record. Tilt it in the simulator and watch Show data.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6b76411a1e59.png?v=82d759b2a5969101)

:::


## Exit ticket

:::keep-together

**What does the computer receive when the micro:bit runs serial write value light, light level?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A line of text: the name light, a colon and the reading, such as light:128.

:::

