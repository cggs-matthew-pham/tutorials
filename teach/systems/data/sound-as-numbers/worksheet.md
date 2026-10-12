---
title: "Sound as numbers"
subtitle: "Data representation · Data as numbers · Lesson 4"
---

# Sound as numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A song is a wobbling wave of air. How does a computer turn that into numbers, and why are music files so big?


:::teacher-note

**In one sentence:** Students sample a sound wave on a board, changing the samples a wave and the levels, to see that audio is stored as a list of measured, rounded amplitudes, and that more samples and levels sound closer but need more numbers (AC9TDI8K03 node 4).

**Students should be able to say:** I can explain how a sound is stored as numbers. I can say what changing the samples or the levels does. I can work out how many samples a recording stores.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A recording measures the wave **8** times each wave. You change it to **16** times each wave. The recording now holds…**

☐ The same numbers, but louder

☐ The same: the wave is stored, not numbers

☐ Half as many numbers

☐ Twice as many numbers

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Twice as many numbers. Each measurement (sample) is one number, so twice as many samples is twice as many numbers, and the stepped copy gets closer to the real wave.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: from wave to numbers


:::keep-together

### One wave, step by step

1. $\text{sound} \to \text{wave}$ — The microphone turns air movement into a signal that goes up and down.
2. $\text{measure every } \tfrac{1}{8} \text{ wave}$ — Sampling: measure the height at regular times.
3. $\text{round to a level}$ — Each height is rounded to the nearest level (here 16 levels, 0 to 15).
4. $8, 13, 15, 13, 8, 2, 0, 2$ — The numbers stored for one wave.
5. $\text{numbers} \to \text{steps}$ — Playing back joins the levels into steps, close to the wave but not exact.

Real music takes 44 100 samples every second, with 65 536 levels. Now count the numbers for 3 waves.

**A recording takes 8 samples each wave, for 3 waves. How many numbers does it store?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 24

8 × 3 = 24 numbers.

:::


:::keep-together

### Find the mistake

**Sam explains how sound is recorded. Click the line where the explanation first goes wrong.**

```
 1  A microphone turns a sound into a wave.
 2  The computer stores the shape of the wave exactly.
 3  So a recording keeps every detail of the sound.
 4  A longer recording is a longer wave, so a bigger file.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: the computer can't store a smooth curve. It stores measurements taken at regular times, each rounded to a level, so a recording is close to the sound but not exact.

:::


:::keep-together

### More levels

**What does using **more levels** change?**

☐ Each sample can be rounded less, so it is closer to the real height

☐ There are more samples each second

☐ Nothing: only samples matter

☐ The sound gets louder

:::


:::teacher-note

**Answer:** Each sample can be rounded less, so it is closer to the real height

More levels means finer rounding, so each number is closer to the real height. Each number then needs more space to store.

:::


:::typical

## Vary: one setting at a time


**Fewer levels.** 

**Many samples.** 

**Few samples.** 

**Two samples.** 

**Samples or levels?.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Samples and sizes


:::keep-together

### CD quality

**Music is sampled 44 100 times a second. How many samples are in a 10 second clip?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 441000

44 100 × 10 = 441 000 samples (and twice that for stereo: two channels).

:::


:::keep-together

### Half the rate

**You halve the sample rate of a recording. What happens to the number of numbers stored?**

☐ It stays the same

☐ It doubles

☐ It halves

☐ It drops to zero

:::


:::teacher-note

**Answer:** It halves

Half the samples, half the numbers: a smaller file, but a rougher copy.

:::


:::keep-together

### Big files

**Why are music files so much bigger than text files?**

☐ Every second needs tens of thousands of numbers

☐ Music uses bigger letters

☐ Text files are compressed and music never is

☐ Sound is stored as a picture of the wave

:::


:::teacher-note

**Answer:** Every second needs tens of thousands of numbers

A page of text is a few thousand codes; one second of music is 44 100 samples (per channel).

:::


:::keep-together

### Review: pixels

**Review: an image is 2 pixels by 2 pixels, three numbers a pixel. How many numbers?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 12

4 pixels × 3 = 12 numbers.

:::


## Make: just good enough

Then: why might a phone call use far fewer samples a second than music?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**A recording takes 8 000 samples a second for 5 seconds. How many samples? What happens to sound quality if you use 4 000 a second?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 40 000 samples. Fewer samples: a rougher copy (and a smaller file).

:::

