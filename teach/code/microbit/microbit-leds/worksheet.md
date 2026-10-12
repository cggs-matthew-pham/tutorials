---
title: "Pictures on the LEDs"
subtitle: "micro:bit Foundations · Show and react · Lesson 1"
---

# Pictures on the LEDs

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Scrolling signs at train stations and the lights on a pedestrian crossing run the same simple loop: show a picture, wait, show the next one.


:::teacher-note

**In one sentence:** Students see that blocks run in order, once, then use a forever loop to turn pictures into an animation.

**Students should be able to say:** I can predict what blocks will do, in order. I can use forever to repeat blocks. I can build an animation from pictures and pauses.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

These two blocks sit inside **on start**. Read them carefully, then lock in your prediction.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fe0e32dc3d54.png?v=95a208ee6373d2cf)

:::keep-together

**What will you see on the micro:bit?**

☐ The hearts flashing over and over

☐ The big heart, then the small heart, which stays

☐ Only the small heart

☐ Only the big heart

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f22e0bb1efd2.png?v=a4265390cb3d4293)

:::keep-together

### Spot the problem

**Ada wants the hearts to keep beating. Her hearts show once, then the small heart just stays. Why?**

☐ The small heart is the wrong block

☐ Hearts can only be shown once

☐ The hearts are in on start, and forever is empty

☐ The micro:bit needs a pause to repeat

:::


:::teacher-note

**Answer:** The hearts are in on start, and forever is empty

on start runs its blocks once. Only blocks inside forever repeat, and Ada's forever has nothing in it.

:::


:::keep-together

### How often?

**How many times does forever run the blocks inside it?**

☐ Twice

☐ Once

☐ Again and again, until the micro:bit is switched off

:::


:::teacher-note

**Answer:** Again and again, until the micro:bit is switched off

forever starts again from its first block as soon as it reaches the last one. That is a loop.

:::


:::typical

## Modify


**Draw your own picture.** Swap the small heart for a **show leds** block and draw your own picture.

**Slow the beat.** Add a **pause** between the pictures. Try `500`, then try other numbers.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Draw your own picture:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f0564a1f9efd.png?v=9b2656c88859f97c)

**Slow the beat:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ed763177df9a.png?v=75ab79be44178ed0)

:::

:::


## Make

Make an animation of **three or more pictures** that plays forever. Draw at least one yourself.

Ideas: a blinking eye, rain falling, a ball bouncing, a waving stick figure.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/56cf08522031.png?v=17640cd03dca3f1f)

:::


:::wider

## Run a shop sign

This sign scrolls a word, shows a face, then waits. Make it your own sign: change the word, swap the face, and add a frame.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Your animation has three pictures inside forever. What happens if you move them into on start?**

{{lines-3}}

:::


:::teacher-note

**Answer:** They play once, and the last picture stays on.

:::

