---
title: "A small system"
subtitle: "Arduino · Real hardware · Lesson 7"
---

# A small system

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Your plant-water alarm works on your desk: it blinks when you twist the knob down. Does it meet the brief? How would you know, without watching it for a week?


:::teacher-note

**In one sentence:** Students run a plant-water alarm against a test table that passes but misses the threshold, learn to choose test cases (either side of the threshold, the threshold itself, the ends), fix an off-by-one, add a steady state, build it on real hardware, and meet a three-band fridge alarm brief against six tests.

**Students should be able to say:** I can choose test cases for a brief, including the boundary. I can fix a sketch until every test passes. I can explain what passing tests does and doesn't show.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The sketch says if (level &lt; 300). The brief says 300 or below. Which test reading would show the mistake?**

☐ 0

☐ 150

☐ 300

☐ 800

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 300: the brief wants it to blink, but 300 &lt; 300 is false, so it stays off. Any reading away from 300 behaves the same either way.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: choose the tests


:::keep-together

### A test table

1. $\text{brief: blink at } \le 300$ — Find the threshold and which side it belongs to.
2. $299, \; 300 \to \text{blink}$ — Just below, and the threshold itself (the brief includes it).
3. $301 \to \text{off}$ — Just above.
4. $0 \to \text{blink}, \; 1023 \to \text{off}$ — The two ends of the range.
5. $\text{5 cases}$ — Each one could catch a different slip.

Now pick the best set.

**Which set of readings tests this brief best?**

☐ 0, 299, 300, 301, 1023

☐ 300 only

☐ 0, 1023

☐ 100, 200, 400, 500

:::


:::teacher-note

**Answer:** 0, 299, 300, 301, 1023

Both sides of 300, 300 itself, and the two ends.

:::


:::keep-together

### Find the mistake

**Sam's alarm passed both tests, but stays off at a reading of 300. Click the line where Sam's plan first goes wrong.**

```
 1  The brief: the alarm blinks when the soil reads 300 or below.
 2  Test 1: reading 0, the alarm should blink.
 3  Test 2: reading 1023, the alarm should be off.
 4  Two tests pass, so the alarm meets the brief.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: two far-away tests can't show a slip at the threshold. Sam needs cases at 299, 300 and 301.

:::


:::typical

## Vary: change the brief


**Fix the boundary.** 

**Three states.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it for real

A real sensor's reading flickers by a few numbers, so a reading near the threshold can make the alarm flicker too. The fix (a gap between switching on and off) is a good stretch.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Tests


:::keep-together

### A fan

**A fan must turn on when the temperature reading is above 600. Which three readings test the threshold?**

☐ 600 only

☐ 0, 600 and 1023

☐ 100, 600 and 900

☐ 599, 600 and 601

:::


:::teacher-note

**Answer:** 599, 600 and 601

Just below, at, and just above: 600 itself should be off (above, not at).

:::


:::keep-together

### All pass

**Every test passes. What can you say?**

☐ The sketch has no mistakes

☐ The tests are right

☐ The sketch does what those tests check: no more

☐ The sketch meets the brief

:::


:::teacher-note

**Answer:** The sketch does what those tests check: no more

Tests show what they check. A good table covers the boundaries and the ends.

:::


## Make: a fridge door alarm


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**A brief says a buzzer sounds when the reading is 500 or more. Write three test readings for the threshold and what each should do.**

{{lines-3}}

:::


:::teacher-note

**Answer:** 499 silent, 500 sounds, 501 sounds.

:::

