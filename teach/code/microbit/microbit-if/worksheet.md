---
title: "If"
subtitle: "micro:bit Foundations · Decide · Lesson 6"
---

# If

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Street lights switch on when it gets dark, and a fridge beeps when its door is left open. Each one asks a yes-or-no question about a number, again and again.


:::teacher-note

**In one sentence:** Students use an if block to make the micro:bit decide, and see that a false if does nothing, so turning something off needs its own question.

**Students should be able to say:** I can use an if block to make the micro:bit decide. I can say what an if does when its question is false. I can choose &lt; or &gt; so the question is true when I want it to be.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This is a **night light**. `<` means "less than".

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/1f3e7c43f108.png?v=4b6833858851d206)

:::keep-together

**The light level starts high. You drag it down to 20, then back up to 200. What happens?**

☐ The lights come on in the dark, then go off when it is bright

☐ The lights flash on and off

☐ The lights come on in the dark, and stay on when it is bright again

☐ Nothing ever lights up

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The lights come on in the dark and stay on. The if only does something when it is dark; when it is bright again, it does nothing, so nothing turns the lights off.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/1f3e7c43f108.png?v=4b6833858851d206)

:::keep-together

### Why do they stay on?

**Why do the lights stay on when it gets bright again?**

☐ The light sensor stops working

☐ When the question is false, the if does nothing, so nothing turns the lights off

☐ The lights need a pause to go off

☐ forever only runs once

:::


:::teacher-note

**Answer:** When the question is false, the if does nothing, so nothing turns the lights off

When it is bright, 'light level &lt; 50' is false, so the if skips its blocks. Nothing in the program turns the lights off.

:::


:::keep-together

### Zoe's night light

Zoe's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/26c462301905.png?v=fe9207976e79bba6)

**Zoe's night light is on in the daytime and off at night. Which part is wrong?**

☐ It needs to be in on start

☐ clear screen and show leds are swapped

☐ 50 is too small

☐ The &lt; and &gt; are the wrong way round

:::


:::teacher-note

**Answer:** The &lt; and &gt; are the wrong way round

'light level &gt; 50' is true when it is bright, so Zoe's lights come on in daylight. For a night light, the lights go on when the level is less than (&lt;) 50.

:::


:::typical

## Modify


**Switch earlier.** Make the night light come on when the light level is below **100**. Change both questions.

**Too hot.** Add a third **if**: when the temperature is above 30, show a sad face.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Switch earlier:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/66f37cf570a9.png?v=a6c018c169d04c67)

**Too hot:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/96ab2dd6f2b5.png?v=8f2fc9853002ee08)

:::

:::


## Mix it up

Thermometer 1 is above. Thermometer 2:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7eb0d60bd9c6.png?v=57cb97115d035648)

:::keep-together

**Thermometer 1 (above) reads the temperature in on start. Thermometer 2 (below) reads it in forever. You drag the temperature slider. Which one follows it?**

☐ Thermometer 1, in on start

☐ Neither: sensors only change on a real micro:bit

☐ Thermometer 2, in forever

☐ Both

:::


:::teacher-note

**Answer:** Thermometer 2, in forever

on start reads the temperature once, at the start. forever reads it again each time round, so its number follows the slider.

:::


## Make

Make a **weather warning**. Draw your own pictures:

- Below **10** degrees: a snowflake (or anything that means cold).
- Above **30** degrees: a sun (or anything that means hot).

Test it by dragging the temperature slider.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f9bdba87dc54.png?v=f5c28a9cb4339fc1)

:::


:::wider

## Change a fridge alarm

A fridge should stay at 5 degrees or less. This alarm flashes a cross when it gets warmer. Make it also flash when the fridge is **too cold** (below 0), with a different picture.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A night light uses only 'if light level &lt; 50, show lights'. Why do the lights stay on in the morning?**

{{lines-3}}

:::


:::teacher-note

**Answer:** When it is bright the question is false, so the if does nothing. Nothing in the program turns the lights off.

:::

