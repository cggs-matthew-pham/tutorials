---
order: 4
unit: numbers
node: AC9TDI8K03 n4
title: Sound as numbers
summary: "A computer can't store a sound wave itself. It measures the wave's height many times a second (sampling) and rounds each measurement to a level, so a recording is a long list of numbers. More samples and more levels sound closer to the real thing, but need more numbers."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A song is a wobbling wave of air. How does a computer turn that into numbers, and why are music files so big?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8325
  url: http://127.0.0.1:8325/index.html
  readySelector: ".smsvg"
  layout: full
explainPicture: { ref: sound.yml#explain-pic, caption: "A wave sampled 8 times each wave, each sample rounded to one of 8 levels. The dots are the stored numbers; the steps are what plays back." }
explainClip:
  query: { code: "@sound.yml#explain", fresh: 1, id: explain }
  caption: "Sampling a wave"
  say: "The computer measures the wave at regular times."
  clip:
    - caption: { text: "4 samples a wave: the steps are a rough copy.", say: "Four measurements a wave make a rough copy." }
    - wait: 1200
    - click: "Samples a wave: more"
    - click: "Samples a wave: more"
    - click: "Samples a wave: more"
    - click: "Samples a wave: more"
    - expect: { selector: "#gsum", contains: "8 samples" }
    - caption: { text: "8 samples a wave: closer, and twice as many numbers.", say: "Eight a wave is closer, and twice as many numbers." }
    - wait: 1500
---
Sound is a **wave**: air pushed back and forth. A microphone turns it into a changing signal, but a computer can only store numbers. So it **samples** the wave: it measures how high the wave is at regular times, rounds each measurement to one of a set of **levels**, and stores those numbers. To play the sound back, it turns the numbers back into a signal.

## Predict: twice as many samples

```step
stage: predict
insight: "Committing to what doubling the samples does to the stored data tests the new move: a recording is a list of measurements, so more measurements means more numbers."
check:
  type: predict
  q: "A recording measures the wave **8** times each wave. You change it to **16** times each wave. The recording now holds…"
  options: ["Twice as many numbers", "The same numbers, but louder", "Half as many numbers", "The same: the wave is stored, not numbers"]
  actual: "Twice as many numbers. Each measurement (sample) is one number, so twice as many samples is twice as many numbers, and the stepped copy gets closer to the real wave."
```

## Try: take more samples

```step
stage: run
insight: "Moving the samples from 8 to 16 a wave settles the prediction: the count of numbers doubles and the steps hug the wave more closely."
try: { playground: board, starter: "sound.yml#run", height: 520 }
check: { type: board, text: "Move Samples a wave from 8 up to 16. How many numbers are stored now?", when: "s = 16 and n = 32", explain: "16 samples a wave × 2 waves = 32 numbers, twice as many as before. The steps are closer to the wave." }
```

Was your prediction right? Press ▶ to hear the original and the copy made from the numbers.

## Worked example: from wave to numbers

```step
stage: investigate
insight: "Following one wave through sampling, rounding and storing models the new move. Sam thinks the wave's shape is stored exactly, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "A recording takes 8 samples each wave, for 3 waves. How many numbers does it store?"
      answer: "24"
      feedback:
        - ["11", "Multiply, don't add: 8 samples for each of the 3 waves."]
        - ["8", "That is one wave. There are 3."]
      explain: "8 × 3 = 24 numbers."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains how sound is recorded. Click the line where the explanation first goes wrong."
      answer: 2
      fault: logic
      misconception: sound-stored-as-wave
      explain: "Line 2: the computer can't store a smooth curve. It stores measurements taken at regular times, each rounded to a level, so a recording is close to the sound but not exact."
  - check:
      type: question
      q: "What does using **more levels** change?"
      options: ["Each sample can be rounded less, so it is closer to the real height", "There are more samples each second", "The sound gets louder", "Nothing: only samples matter"]
      answer: 0
      feedback: [null, "That is the sample rate. Levels are about how finely each sample is measured.", "Loudness is how high the wave goes, not how many levels there are.", "Try Levels at 2 on the board: the steps can only be top or bottom."]
      explain: "More levels means finer rounding, so each number is closer to the real height. Each number then needs more space to store."
```

### One wave, step by step

```worked
\text{sound} \to \text{wave} :: The microphone turns air movement into a signal that goes up and down.
\text{measure every } \tfrac{1}{8} \text{ wave} :: Sampling: measure the height at regular times.
\text{round to a level} :: Each height is rounded to the nearest level (here 16 levels, 0 to 15).
8, 13, 15, 13, 8, 2, 0, 2 :: The numbers stored for one wave.
\text{numbers} \to \text{steps} :: Playing back joins the levels into steps, close to the wave but not exact.
```

Real music takes 44 100 samples every second, with 65 536 levels. Now count the numbers for 3 waves.

### Find the mistake

### More levels

## Vary: one setting at a time

```step
stage: modify
insight: "Each task changes one setting: fewer levels, many more samples, very few samples, then the edge case where two samples a wave land on the middle and store silence."
try: { playground: board, starter: "sound.yml#modify", height: 560 }
tasks:
  - check: { type: board, text: "Turn Levels down to 4. What happens to the steps? Play it.", when: "l = 4 and s = 8", explain: "With only 4 levels, every sample is rounded a long way, so the steps are coarse and it sounds harsher." }
  - check: { type: board, text: "Put Levels back to 256, then push Samples a wave to 32.", when: "l = 256 and s = 32", explain: "32 samples a wave with 256 levels hugs the wave closely: this is why good recordings take many samples and many levels." }
  - check: { type: board, text: "Now drop Samples a wave to 4. How close is the copy?", when: "s = 4", explain: "Only 4 measurements a wave: the steps are a rough copy, about 25% off the wave. Fewer samples, fewer numbers, worse sound." }
  - check: { type: board, text: "Drop Samples a wave to 2. What do the numbers say? Play it.", when: "s = 2", explain: "Both samples land where the wave crosses the middle, so every number is the same: the recording is silent. A wave needs more than two samples a wave to be caught." }
  - check:
      type: question
      q: "Which stores more numbers: 32 samples a wave with 16 levels, or 16 samples a wave with 256 levels?"
      options: ["32 samples with 16 levels", "16 samples with 256 levels", "The same", "You can't tell"]
      answer: 0
      feedback: [null, "Levels don't add numbers: they make each number able to hold a finer value.", "One has twice as many samples.", "Count the samples: each is one number."]
      explain: "Each sample is one number, so 32 samples a wave is twice as many numbers. More levels make each number bigger to store, not more numbers."
```

### Fewer levels

### Many samples

### Few samples

### Two samples

### Samples or levels?

## Practise: samples and sizes

```step
stage: practise
insight: "Counting samples for real sample rates, halving the rate, why music files are big, and a review of counting numbers in an image."
tasks:
  - check:
      type: answer
      q: "Music is sampled 44 100 times a second. How many samples are in a 10 second clip?"
      answer: "441000"
      feedback:
        - ["44110", "Multiply, don't add: 44 100 × 10."]
        - ["4410", "That is a tenth of a second's worth. × 10, not ÷ 10."]
      explain: "44 100 × 10 = 441 000 samples (and twice that for stereo: two channels)."
  - check:
      type: question
      q: "You halve the sample rate of a recording. What happens to the number of numbers stored?"
      options: ["It halves", "It doubles", "It stays the same", "It drops to zero"]
      answer: 0
      feedback: [null, "Fewer samples means fewer numbers.", "Each sample is a number, so fewer samples is fewer numbers.", "Half the samples are still there."]
      explain: "Half the samples, half the numbers: a smaller file, but a rougher copy."
  - check:
      type: question
      q: "Why are music files so much bigger than text files?"
      options: ["Every second needs tens of thousands of numbers", "Music uses bigger letters", "Sound is stored as a picture of the wave", "Text files are compressed and music never is"]
      answer: 0
      feedback: [null, "Music is not stored as letters.", "Sound is stored as samples, not a picture.", "Both can be compressed; music still has far more numbers to start with."]
      explain: "A page of text is a few thousand codes; one second of music is 44 100 samples (per channel)."
  - check:
      type: answer
      q: "Review: an image is 2 pixels by 2 pixels, three numbers a pixel. How many numbers?"
      answer: "12"
      feedback:
        - ["4", "That is the pixels. Each is three numbers."]
        - ["6", "2 × 2 = 4 pixels, then × 3."]
      explain: "4 pixels × 3 = 12 numbers."
```

### CD quality

### Half the rate

### Big files

### Review: pixels

## Make: just good enough

```step
stage: make
insight: "Finding the fewest samples that keep the copy within 10% reverses the process: students start from a quality target and choose the settings."
try: { playground: board, starter: "sound.yml#make", height: 560 }
hint: ["Set Levels to 256 first, so rounding barely matters.", "Raise Samples a wave one at a time and watch how far off the wave the copy is.", "Stop at the first value below 10%."]
check: { type: board, text: "With 256 levels, find the fewest samples a wave that keep the copy less than 10% off the wave.", when: "l = 256 and e < 10 and s < 11", explain: "10 samples a wave is 9.8% off; 9 is 11%. Fewer samples make a smaller file, so engineers choose the fewest that sound good enough." }
```

Then: why might a phone call use far fewer samples a second than music?
