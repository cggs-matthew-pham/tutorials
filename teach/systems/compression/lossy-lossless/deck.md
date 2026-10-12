---
marp: true
theme: default
html: true
---

# Lossy or lossless

Making data smaller · Compression

<!-- Speaker note: Students raise the tolerance of a lossy run-length compressor on a grey picture to see that lossy compression stores far fewer numbers but permanently changes data, and decide where lossy and lossless each belong (AC9TDI10K03 node 3). About 45 minutes (Predict and Try 6 min · Worked example 12 min · Vary 12 min · Practise and Make 15 min). -->

---

## Today

**We are learning to** lossless compression gives back exactly the original data. Lossy compression throws away detail people are unlikely to notice, such as tiny differences in shade, so files get much smaller, but that detail is gone for good. Music and photos online are usually lossy; text, medical scans and evidence must be lossless.

- I can explain the difference between lossy and lossless compression.
- I can choose lossy or lossless for a purpose and justify it.
- I can name a consequence of using lossy compression in the wrong place.

<!-- Speaker note: Before class: Try the Try and Make boards yourself. The one idea: lossless gives back exactly the original; lossy discards information permanently to save more space; choose by purpose. Kit contexts for width: medical images and legal evidence (lossless), music streaming and photos online (lossy). Simplification: real lossy formats (JPEG, MP3) don't merge nearby shades in runs; they use smarter maths to throw away what people perceive least. The board shows the same trade-off in a form students can see. Teacher: Try: ask which parts of the picture changed first, and why. Teacher: Worked example: ask what a doctor or a court would say about the 16 changed pixels. Teacher: Vary: debate the "worth it" question in pairs before checking. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Why it matters

> A song streamed on your phone is about a tenth of the size of the same song on a CD. What did they throw away, and why can't you hear it?

<!-- Speaker note: Run-length encoding gives back exactly what went in: it is **lossless**. But a photo has few long runs, because neighbouring pixels are almost never exactly the same shade. **Lossy** compression makes runs longer on purpose: shades that are close enough (within a **tolerance**) are stored as the same. The file shrinks a lot, but the small differences are thrown away. This board stores a grey picture as runs of count × shade, two numbers a run. Pixel by pixel it would be 48 numbers. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A grey photo is compressed by treating nearly equal shades as the same, so the runs get longer. Then it is opened again. Is it exactly the same as the original?**

- No: it comes back black and white
- Yes, if you open it twice
- No: the small differences are gone for good
- Yes: compression always gives back the original

<!-- Speaker note: What happens: No. Shades that were treated as the same are stored as one shade, and the original values were never saved, so nothing can put them back. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "yes" hold Sam's misconception; return to them after the Try. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fcompression%2Flossy-lossless%2Fstep-2&code=widget%3A+pixels%0Asize%3A+8%2C+6%0Amode%3A+grey%0Alossy%3A+on%0Astart%3A+99999988+%2F+99998877+%2F+88877766+%2F+55555544+%2F+33333222+%2F+11110000%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/compression/lossy-lossless/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Slide the tolerance back to 0: the picture is perfect again, because the board always starts from the original. A saved lossy file doesn't have one. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No. Shades that were treated as the same are stored as one shade, and the original values were never saved, so nothing can put them back.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The trade-off

Now define lossless.

$$t = 0: 28 \text{ numbers}, 0 \text{ changed}$$

1) $t = 28: 18 \text{ numbers}, 13 \text{ changed}$ — Shades next to each other (28 apart) now count as the same.
2) $t = 40: 16 \text{ numbers}, 16 \text{ changed}$ — Smaller again, and a third of the pixels are a different shade.
3) $\text{lossy}$ — The changed pixels were never stored, so they can't be recovered.
4) $\text{choose by purpose}$ — Lossy where small changes don't matter; lossless where every value counts.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write t = 0: 28 numbers, 0 changed and say "Lossless: only exact runs. Already smaller than 48." Line 1: write t = 28: 18 numbers, 13 changed and say "Shades next to each other (28 apart) now count as the same." Line 2: write t = 40: 16 numbers, 16 changed and say "Smaller again, and a third of the pixels are a different shade." Line 3: write lossy and say "The changed pixels were never stored, so they can't be recovered." Line 4: write choose by purpose and say "Lossy where small changes don't matter; lossless where every value counts." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The trade-off

**What makes compression **lossless**?**

- Decompressing gives back exactly the original data
- The file gets smaller
- It uses run-length encoding
- Nobody can notice the difference

* Answer: Decompressing gives back exactly the original data

<!-- Speaker note: Lossless means exact recovery. Lossy means some data is permanently discarded. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains what happens to a lossy photo. Click the line where it first goes wrong.**

```
 1  I save a photo in a lossy format.
 2  The file is a quarter of the size.
 3  When I open it, the computer puts the lost detail back.
 4  So the photo is exactly the same as before.
```

* Answer: line 3

<!-- Speaker note: Line 3: the lost detail was never stored, so nothing can put it back. A lossy photo looks close to the original but is not the same. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which must be lossless?

**Which of these must be stored **lossless**?**

- A medical X-ray a doctor will use to find a fracture
- A holiday photo shared online
- A video call
- A song streamed on a phone

* Answer: A medical X-ray a doctor will use to find a fracture

<!-- Speaker note: A change in a few pixels could hide or invent a detail a doctor relies on. Medical images, legal evidence, text and spreadsheets need every value exact. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one setting at a time



- **Back to lossless:** 
- **All the way:** 
- **Worth it?:** 
- **Streaming:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/compression/lossy-lossless/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes the tolerance: back to lossless, all the way up, then reading the trade-off, then choosing for a context. For students who need more support: Give the two definitions on a card: lossless = exact recovery; lossy = permanent loss for a smaller file. For early finishers: Save a photo as JPEG at quality 100 and quality 10 and compare the sizes and what changed. Which details went first? The hard part, on purpose: Students believe lost detail can be recovered because the board can slide back to 0. Point out that the board keeps the original; a saved lossy file does not. When students get stuck: A student says the detail comes back when you open the file (Sam's mistake). Ask: Where would the original shades be stored? Fix: Nowhere: they were thrown away. / A student thinks lossy is always bad. Ask: How long would a song take to stream at ten times the size? Fix: Lossy is a trade-off that suits many purposes. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Formats

**Which format is **lossless**?**

- PNG
- A video streamed at low quality
- JPEG
- MP3

* Answer: PNG

<!-- Speaker note: PNG (and ZIP) keep every value; JPEG and MP3 are lossy. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Evidence

**A police photo of a number plate is saved as a heavily compressed lossy file. What could go wrong?**

- The file could be too big
- Nothing: lossy files look the same
- Letters could blur into each other, so the evidence is unclear or misread
- The photo would turn black and white

* Answer: Letters could blur into each other, so the evidence is unclear or misread

<!-- Speaker note: Evidence needs every detail; lossy compression can change exactly the details that matter. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Save again

**You open a JPEG, edit it and save it as a JPEG again, many times. What happens?**

- It loses a little more detail each time
- It turns into a PNG
- It gets sharper
- It stays exactly the same

* Answer: It loses a little more detail each time

<!-- Speaker note: Lossy losses add up. Keep a lossless original and make lossy copies from it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: run-length codes

**Review: what is the run-length code for white, white, white, white, black, black, black, black?**

- 8
- 4, 4
- 1, 1, 1, 1, 1, 1, 1, 1
- 0, 4, 4

* Answer: 4, 4

<!-- Speaker note: 4 white, 4 black. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the edge of lossless

Then: would that tolerance work for a different picture? Why not?

[Open this step](https://tutorials.learningwaypoints.com/systems/compression/lossy-lossless/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Finding the largest tolerance that still gives back every pixel reverses the process: students find exactly where lossless ends for this picture. Hints, in order: Raise the tolerance one at a time and watch the pixels that came back different. / The first change happens when two neighbouring shades are within the tolerance. / Go back one from the first tolerance that changes a pixel. -->

<!-- Speaker note: Teacher: compare: why is 27 the edge for this picture? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give one context that needs lossless compression and one where lossy is fine, with a reason for each.**

* Lossless: a medical scan or spreadsheet, where every value matters. Lossy: streamed music or a shared photo, where a much smaller file matters more than tiny changes.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Builds on: Run-length encoding. Where it leads: file formats and codecs (MP3 vs WAV, JPEG vs PNG), and the ethics of altered images and evidence. -->
