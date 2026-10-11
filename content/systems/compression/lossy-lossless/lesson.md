---
order: 2
unit: compress
node: AC9TDI10K03 n3
title: Lossy or lossless
summary: "Lossless compression gives back exactly the original data. Lossy compression throws away detail people are unlikely to notice, such as tiny differences in shade, so files get much smaller, but that detail is gone for good. Music and photos online are usually lossy; text, medical scans and evidence must be lossless."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A song streamed on your phone is about a tenth of the size of the same song on a CD. What did they throw away, and why can't you hear it?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8329
  url: http://127.0.0.1:8329/index.html
  readySelector: ".pxcell"
  layout: full
explainPicture: { ref: photo.yml#explain-pic, caption: "A grey picture stored with run-length codes, count × shade. At tolerance 0 it is lossless: 28 numbers instead of 48, and every pixel comes back exactly." }
explainClip:
  query: { code: "@photo.yml#explain", fresh: 1, id: explain }
  caption: "Throwing away small differences"
  say: "At tolerance zero, every pixel comes back exactly."
  clip:
    - caption: { text: "Tolerance 0: 28 numbers, every pixel exact. Lossless.", say: "Twenty eight numbers. Nothing lost." }
    - wait: 1200
    - type: { into: Tolerance value, text: "40" }
    - press: Enter
    - expect: { selector: "#gsum", contains: "16 numbers" }
    - caption: { text: "Tolerance 40: close shades count as the same. 16 numbers, but 16 pixels changed for good.", say: "Close shades merge. Smaller, but some pixels changed for good." }
    - wait: 1800
---
Run-length encoding gives back exactly what went in: it is **lossless**. But a photo has few long runs, because neighbouring pixels are almost never exactly the same shade. **Lossy** compression makes runs longer on purpose: shades that are close enough (within a **tolerance**) are stored as the same. The file shrinks a lot, but the small differences are thrown away.

This board stores a grey picture as runs of count × shade, two numbers a run. Pixel by pixel it would be 48 numbers.

## Predict: does it come back?

```step
stage: predict
insight: "Committing to whether the picture comes back exactly tests the new move: lossy compression permanently discards information."
check:
  type: predict
  q: "A grey photo is compressed by treating nearly equal shades as the same, so the runs get longer. Then it is opened again. Is it exactly the same as the original?"
  options: ["No: the small differences are gone for good", "Yes: compression always gives back the original", "Yes, if you open it twice", "No: it comes back black and white"]
  actual: "No. Shades that were treated as the same are stored as one shade, and the original values were never saved, so nothing can put them back."
```

## Try: raise the tolerance

```step
stage: run
insight: "Raising the tolerance settles the prediction: fewer numbers are stored, and some pixels come back a different shade."
try: { playground: board, starter: "photo.yml#run", height: 520 }
check: { type: board, text: "Raise the tolerance to 40 or more. How many numbers are stored now, and how many pixels came back different?", when: "t >= 40 and d > 0", explain: "At tolerance 40, 16 numbers instead of 28, but 16 of the 48 pixels came back a different shade. Compare with the original on the right." }
```

Was your prediction right? Slide the tolerance back to 0: the picture is perfect again, because the board always starts from the original. A saved lossy file doesn't have one.

## Worked example: lossless versus lossy

```step
stage: investigate
insight: "Comparing tolerance 0 with 28 and 40 models the trade-off: fewer numbers, more pixels changed, for good. Sam thinks lost detail is restored, the misconception planted after the method; the context question asks where lossy must not be used."
tasks:
  - check:
      type: question
      q: "What makes compression **lossless**?"
      options: ["Decompressing gives back exactly the original data", "The file gets smaller", "Nobody can notice the difference", "It uses run-length encoding"]
      answer: 0
      feedback: [null, "Lossy files get smaller too, usually more so.", "That describes good lossy compression: some data is still gone.", "Run-length encoding with a tolerance above 0 is lossy."]
      explain: "Lossless means exact recovery. Lossy means some data is permanently discarded."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains what happens to a lossy photo. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: lossy-recoverable
      explain: "Line 3: the lost detail was never stored, so nothing can put it back. A lossy photo looks close to the original but is not the same."
  - check:
      type: question
      q: "Which of these must be stored **lossless**?"
      options: ["A medical X-ray a doctor will use to find a fracture", "A holiday photo shared online", "A song streamed on a phone", "A video call"]
      answer: 0
      feedback: [null, "Small changes don't matter for a holiday photo.", "Streaming music is lossy so it plays without waiting.", "Video calls are lossy so they keep up in real time."]
      explain: "A change in a few pixels could hide or invent a detail a doctor relies on. Medical images, legal evidence, text and spreadsheets need every value exact."
```

### The trade-off

```worked
t = 0: 28 \text{ numbers}, 0 \text{ changed} :: Lossless: only exact runs. Already smaller than 48.
t = 28: 18 \text{ numbers}, 13 \text{ changed} :: Shades next to each other (28 apart) now count as the same.
t = 40: 16 \text{ numbers}, 16 \text{ changed} :: Smaller again, and a third of the pixels are a different shade.
\text{lossy} :: The changed pixels were never stored, so they can't be recovered.
\text{choose by purpose} :: Lossy where small changes don't matter; lossless where every value counts.
```

Now define lossless.

### Find the mistake

### Which must be lossless?

## Vary: one setting at a time

```step
stage: modify
insight: "Each task changes the tolerance: back to lossless, all the way up, then reading the trade-off, then choosing for a context."
try: { playground: board, starter: "photo.yml#modify", height: 520 }
tasks:
  - check: { type: board, text: "Set the tolerance to 0. How many pixels come back different?", when: "t = 0 and d = 0", explain: "None: at tolerance 0 only exact runs are merged. Lossless, 28 numbers." }
  - check: { type: board, text: "Push the tolerance to 128, the most. How many numbers now? Does it still look like the picture?", when: "t = 128", explain: "12 numbers: one run for most rows. The rows are still lighter at the top and darker at the bottom, but the detail inside each row is gone." }
  - check:
      type: question
      q: "From tolerance 40 to 128, the numbers stored drop from 16 to 12 but 20 pixels change instead of 16. Is the extra squeeze worth it?"
      options: ["It depends on what the picture is for", "Always: smaller is always better", "Never: lossy is always bad", "Only if the file is for printing"]
      answer: 0
      feedback: [null, "A smaller file with a ruined picture is no use.", "Lossy is fine where small changes don't matter.", "Printing usually needs more detail, not less."]
      explain: "Compression is a trade-off between size and quality, chosen for the purpose."
  - check:
      type: question
      q: "A streaming service sends music in a lossy format. Why is that a good choice?"
      options: ["It is much smaller, so it plays without waiting, and most listeners can't hear what is lost", "Lossy music sounds better", "Lossless music can't be streamed", "It stops people copying the music"]
      answer: 0
      feedback: [null, "At best it sounds the same; it never sounds better than the original.", "It can, it just takes more data.", "That is copy protection, a different thing."]
      explain: "Lossy formats like MP3 throw away sounds people hear least, making files about a tenth of the size."
```

### Back to lossless

### All the way

### Worth it?

### Streaming

## Practise: choose a format

```step
stage: practise
insight: "Naming lossy and lossless formats, consequences of lossy in the wrong context, saving a lossy file again, and a review of run-length codes."
tasks:
  - check:
      type: question
      q: "Which format is **lossless**?"
      options: ["PNG", "JPEG", "MP3", "A video streamed at low quality"]
      answer: 0
      feedback: [null, "JPEG is lossy: it throws away fine detail in photos.", "MP3 is lossy.", "Low-quality streams throw away a lot."]
      explain: "PNG (and ZIP) keep every value; JPEG and MP3 are lossy."
  - check:
      type: question
      q: "A police photo of a number plate is saved as a heavily compressed lossy file. What could go wrong?"
      options: ["Letters could blur into each other, so the evidence is unclear or misread", "The file could be too big", "Nothing: lossy files look the same", "The photo would turn black and white"]
      answer: 0
      feedback: [null, "Lossy makes files smaller.", "Heavy compression changes fine details like edges of letters.", "Colour is kept; detail is lost."]
      explain: "Evidence needs every detail; lossy compression can change exactly the details that matter."
  - check:
      type: question
      q: "You open a JPEG, edit it and save it as a JPEG again, many times. What happens?"
      options: ["It loses a little more detail each time", "It stays exactly the same", "It gets sharper", "It turns into a PNG"]
      answer: 0
      feedback: [null, "Each lossy save throws away detail again.", "Compression never adds detail.", "The format only changes if you choose another."]
      explain: "Lossy losses add up. Keep a lossless original and make lossy copies from it."
  - check:
      type: question
      q: "Review: what is the run-length code for white, white, white, white, black, black, black, black?"
      options: ["4, 4", "0, 4, 4", "8", "1, 1, 1, 1, 1, 1, 1, 1"]
      answer: 0
      feedback: [null, "It starts white, so no leading 0.", "There are two runs.", "That would be a checkerboard."]
      explain: "4 white, 4 black."
```

### Formats

### Evidence

### Save again

### Review: run-length codes

## Make: the edge of lossless

```step
stage: make
insight: "Finding the largest tolerance that still gives back every pixel reverses the process: students find exactly where lossless ends for this picture."
try: { playground: board, starter: "photo.yml#make", height: 520 }
hint: ["Raise the tolerance one at a time and watch the pixels that came back different.", "The first change happens when two neighbouring shades are within the tolerance.", "Go back one from the first tolerance that changes a pixel."]
check: { type: board, text: "Find the largest tolerance that still gives back every pixel exactly.", when: "t = 27 and d = 0", explain: "Neighbouring shades in this picture are 28 or 29 apart, so up to 27 nothing merges that shouldn't: lossless. At 28, the first shades merge and the compression becomes lossy." }
```

Then: would that tolerance work for a different picture? Why not?
