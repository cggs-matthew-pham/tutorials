---
title: "Again and again"
subtitle: "micro:bit Foundations · Show and react · Lesson 2"
---

# Again and again

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Scrolling signs at train stations and the lights on a pedestrian crossing run the same simple loop: show a picture, wait, show the next one, and start again.


:::teacher-note

**In one sentence:** Students move pictures from on start into forever so they repeat, and use pause to set how long each frame stays.

**Students should be able to say:** I can use forever to repeat blocks. I can say what pause does inside a loop. I can build an animation from pictures and pauses.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Look at which block each heart is inside, then lock in your prediction.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f22e0bb1efd2.png?v=a4265390cb3d4293)

:::keep-together

**Ada wants a beating heart. Her hearts are in on start, and forever is empty. What will she see?**

☐ Only the big heart

☐ The big heart, then the small heart, which stays

☐ The hearts beating over and over

☐ Nothing, because forever is empty

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The big heart, then the small heart, which stays. Blocks in on start run once. forever repeats, but there is nothing inside it to repeat.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f22e0bb1efd2.png?v=a4265390cb3d4293)

:::keep-together

### How often?

**How many times does forever run the blocks inside it?**

☐ Again and again, until the micro:bit is switched off

☐ Twice

☐ Once

:::


:::teacher-note

**Answer:** Again and again, until the micro:bit is switched off

forever starts again from its first block as soon as it reaches the last one. That is a loop.

:::


:::keep-together

### Add a pause

**Ada adds pause 1000 after the small heart, inside forever. What happens?**

☐ The loop stops after one second

☐ Nothing changes

☐ The small heart stays for one second, then the big heart comes back

☐ Both hearts stay for one second, together

:::


:::teacher-note

**Answer:** The small heart stays for one second, then the big heart comes back

pause only waits. The small heart stays on for 1000 ms, then forever carries on from the top with the big heart.

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f0564a1f9efd.png?v=9b2656c88859f97c)

**Slow the beat:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ed763177df9a.png?v=75ab79be44178ed0)

:::

:::


## Make

Make an animation of **three or more pictures** that plays forever. Draw at least one yourself.

Ideas: a blinking eye, rain falling, a ball bouncing, a waving stick figure.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/56cf08522031.png?v=17640cd03dca3f1f)

:::


:::wider

## Run a shop sign

This sign scrolls a word, shows a face, then waits, again and again. Make it your own sign: change the word, swap the face, and add a frame.

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

