---
marp: true
theme: default
html: true
---

# Sound as numbers

Data representation · Data as numbers

<!-- Speaker note: Students sample a sound wave on a board, changing the samples a wave and the levels, to see that audio is stored as a list of measured, rounded amplitudes, and that more samples and levels sound closer but need more numbers (AC9TDI8K03 node 4). About 40 minutes (Predict and Try 6 min · Worked example 10 min · Vary 12 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** a computer can't store a sound wave itself. It measures the wave's height many times a second (sampling) and rounds each measurement to a level, so a recording is a long list of numbers. More samples and more levels sound closer to the real thing, but need more numbers.

- I can explain how a sound is stored as numbers.
- I can say what changing the samples or the levels does.
- I can work out how many samples a recording stores.

<!-- Speaker note: Before class: Try the boards yourself, with sound on: the play buttons use the browser's audio (headphones help in class). The one idea: sound is stored as samples, measurements of the wave's height at regular times, each rounded to a level. More samples and more levels are closer to the real sound and need more data. Simplifications to say out loud: the board shows a few samples a wave of one pure tone; real recordings take 44 100 or 48 000 samples a second with 65 536 levels (16 bits), and playback smooths the steps. The "% off the wave" counts the step shape too, so it never reaches 0 here. Two samples a wave landing on the crossings is a simplified hint at the sampling theorem. Teacher: Try: play the original and the copy at 8 and 16 samples. Teacher: Worked example: ask what level a sample at the very top of the wave gets. Teacher: Vary: the 2-samples task usually surprises; ask why the copy is silent. -->

---

## Why it matters

> A song is a wobbling wave of air. How does a computer turn that into numbers, and why are music files so big?

<!-- Speaker note: Sound is a **wave**: air pushed back and forth. A microphone turns it into a changing signal, but a computer can only store numbers. So it **samples** the wave: it measures how high the wave is at regular times, rounds each measurement to one of a set of **levels**, and stores those numbers. To play the sound back, it turns the numbers back into a signal. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A recording measures the wave **8** times each wave. You change it to **16** times each wave. The recording now holds…**

- The same numbers, but louder
- The same: the wave is stored, not numbers
- Half as many numbers
- Twice as many numbers

<!-- Speaker note: What happens: Twice as many numbers. Each measurement (sample) is one number, so twice as many samples is twice as many numbers, and the stepped copy gets closer to the real wave. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "the wave is stored" hold Sam's misconception; come back to them after the Try. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fsound-as-numbers%2Fstep-2&code=widget%3A+sampling%0Arate%3A+8%0Alevels%3A+16%0Awaves%3A+2%0Asliders%3A+rate%0Aplay%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/sound-as-numbers/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Press ▶ to hear the original and the copy made from the numbers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Twice as many numbers. Each measurement (sample) is one number, so twice as many samples is twice as many numbers, and the stepped copy gets closer to the real wave.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## One wave, step by step

Real music takes 44 100 samples every second, with 65 536 levels. Now count the numbers for 3 waves.

$$\text{sound} \to \text{wave}$$

1) $\text{measure every } \tfrac{1}{8} \text{ wave}$ — Sampling: measure the height at regular times.
2) $\text{round to a level}$ — Each height is rounded to the nearest level (here 16 levels, 0 to 15).
3) $8, 13, 15, 13, 8, 2, 0, 2$ — The numbers stored for one wave.
4) $\text{numbers} \to \text{steps}$ — Playing back joins the levels into steps, close to the wave but not exact.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write sound wave and say "The microphone turns air movement into a signal that goes up and down." Line 1: write measure every 1 ÷ 8 wave and say "Sampling: measure the height at regular times." Line 2: write round to a level and say "Each height is rounded to the nearest level (here 16 levels, 0 to 15)." Line 3: write 8, 13, 15, 13, 8, 2, 0, 2 and say "The numbers stored for one wave." Line 4: write numbers steps and say "Playing back joins the levels into steps, close to the wave but not exact." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## One wave, step by step

**A recording takes 8 samples each wave, for 3 waves. How many numbers does it store?**

* Answer: 24

<!-- Speaker note: 8 × 3 = 24 numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains how sound is recorded. Click the line where the explanation first goes wrong.**

```
 1  A microphone turns a sound into a wave.
 2  The computer stores the shape of the wave exactly.
 3  So a recording keeps every detail of the sound.
 4  A longer recording is a longer wave, so a bigger file.
```

* Answer: line 2

<!-- Speaker note: Line 2: the computer can't store a smooth curve. It stores measurements taken at regular times, each rounded to a level, so a recording is close to the sound but not exact. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## More levels

**What does using **more levels** change?**

- Each sample can be rounded less, so it is closer to the real height
- There are more samples each second
- Nothing: only samples matter
- The sound gets louder

* Answer: Each sample can be rounded less, so it is closer to the real height

<!-- Speaker note: More levels means finer rounding, so each number is closer to the real height. Each number then needs more space to store. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one setting at a time



- **Fewer levels:** 
- **Many samples:** 
- **Few samples:** 
- **Two samples:** 
- **Samples or levels?:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/data/sound-as-numbers/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one setting: fewer levels, many more samples, very few samples, then the edge case where two samples a wave land on the middle and store silence. For students who need more support: Keep the counting rule on the board: numbers = samples a wave × waves (or samples a second × seconds). For early finishers: Phone calls use about 8 000 samples a second; music uses 44 100. Why is a phone call still understandable? The hard part, on purpose: Students think the recording is the wave itself. Keep pointing at the dots: those are the only numbers the computer has; the steps are rebuilt from them. When students get stuck: A student says the computer stores the wave (Sam's mistake). Ask: What are the dots on the board? Fix: They are the only numbers stored; everything else is rebuilt. / A student thinks more levels means more numbers. Ask: How many dots are there when you change the levels? Fix: Same dots, finer rounding: levels change each number, not how many. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## CD quality

**Music is sampled 44 100 times a second. How many samples are in a 10 second clip?**

* Answer: 441000

<!-- Speaker note: 44 100 × 10 = 441 000 samples (and twice that for stereo: two channels). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Half the rate

**You halve the sample rate of a recording. What happens to the number of numbers stored?**

- It stays the same
- It doubles
- It halves
- It drops to zero

* Answer: It halves

<!-- Speaker note: Half the samples, half the numbers: a smaller file, but a rougher copy. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Big files

**Why are music files so much bigger than text files?**

- Every second needs tens of thousands of numbers
- Music uses bigger letters
- Text files are compressed and music never is
- Sound is stored as a picture of the wave

* Answer: Every second needs tens of thousands of numbers

<!-- Speaker note: A page of text is a few thousand codes; one second of music is 44 100 samples (per channel). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: pixels

**Review: an image is 2 pixels by 2 pixels, three numbers a pixel. How many numbers?**

* Answer: 12

<!-- Speaker note: 4 pixels × 3 = 12 numbers. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: just good enough

Then: why might a phone call use far fewer samples a second than music?

[Open this step](https://tutorials.learningwaypoints.com/systems/data/sound-as-numbers/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Finding the fewest samples that keep the copy within 10% reverses the process: students start from a quality target and choose the settings. Hints, in order: Set Levels to 256 first, so rounding barely matters. / Raise Samples a wave one at a time and watch how far off the wave the copy is. / Stop at the first value below 10%. -->

<!-- Speaker note: Teacher: compare answers at 16 levels too (10 samples is then just over 10%). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A recording takes 8 000 samples a second for 5 seconds. How many samples? What happens to sound quality if you use 4 000 a second?**

* 40 000 samples. Fewer samples: a rougher copy (and a smaller file).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Bits and binary numbers, then How many patterns? (why one byte holds 0 to 255 and why 16-bit audio has 65 536 levels). Code links: micro:bit and Arcade play tones from numbers; the micro:bit's microphone gives a sound level 0 to 255. -->
