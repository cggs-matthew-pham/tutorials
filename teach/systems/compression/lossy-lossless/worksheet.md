---
title: "Lossy or lossless"
subtitle: "Making data smaller · Compression · Lesson 2"
---

# Lossy or lossless

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A song streamed on your phone is about a tenth of the size of the same song on a CD. What did they throw away, and why can't you hear it?


:::teacher-note

**In one sentence:** Students raise the tolerance of a lossy run-length compressor on a grey picture to see that lossy compression stores far fewer numbers but permanently changes data, and decide where lossy and lossless each belong (AC9TDI10K03 node 3).

**Students should be able to say:** I can explain the difference between lossy and lossless compression. I can choose lossy or lossless for a purpose and justify it. I can name a consequence of using lossy compression in the wrong place.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A grey photo is compressed by treating nearly equal shades as the same, so the runs get longer. Then it is opened again. Is it exactly the same as the original?**

☐ No: it comes back black and white

☐ Yes, if you open it twice

☐ No: the small differences are gone for good

☐ Yes: compression always gives back the original

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No. Shades that were treated as the same are stored as one shade, and the original values were never saved, so nothing can put them back.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: lossless versus lossy


:::keep-together

### The trade-off

1. $t = 0: 28 \text{ numbers}, 0 \text{ changed}$ — Lossless: only exact runs. Already smaller than 48.
2. $t = 28: 18 \text{ numbers}, 13 \text{ changed}$ — Shades next to each other (28 apart) now count as the same.
3. $t = 40: 16 \text{ numbers}, 16 \text{ changed}$ — Smaller again, and a third of the pixels are a different shade.
4. $\text{lossy}$ — The changed pixels were never stored, so they can't be recovered.
5. $\text{choose by purpose}$ — Lossy where small changes don't matter; lossless where every value counts.

Now define lossless.

**What makes compression **lossless**?**

☐ Decompressing gives back exactly the original data

☐ The file gets smaller

☐ It uses run-length encoding

☐ Nobody can notice the difference

:::


:::teacher-note

**Answer:** Decompressing gives back exactly the original data

Lossless means exact recovery. Lossy means some data is permanently discarded.

:::


:::keep-together

### Find the mistake

**Sam explains what happens to a lossy photo. Click the line where it first goes wrong.**

```
 1  I save a photo in a lossy format.
 2  The file is a quarter of the size.
 3  When I open it, the computer puts the lost detail back.
 4  So the photo is exactly the same as before.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: the lost detail was never stored, so nothing can put it back. A lossy photo looks close to the original but is not the same.

:::


:::keep-together

### Which must be lossless?

**Which of these must be stored **lossless**?**

☐ A medical X-ray a doctor will use to find a fracture

☐ A holiday photo shared online

☐ A video call

☐ A song streamed on a phone

:::


:::teacher-note

**Answer:** A medical X-ray a doctor will use to find a fracture

A change in a few pixels could hide or invent a detail a doctor relies on. Medical images, legal evidence, text and spreadsheets need every value exact.

:::


:::typical

## Vary: one setting at a time


**Back to lossless.** 

**All the way.** 

**Worth it?.** 

**Streaming.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Choose a format


:::keep-together

### Formats

**Which format is **lossless**?**

☐ PNG

☐ A video streamed at low quality

☐ JPEG

☐ MP3

:::


:::teacher-note

**Answer:** PNG

PNG (and ZIP) keep every value; JPEG and MP3 are lossy.

:::


:::keep-together

### Evidence

**A police photo of a number plate is saved as a heavily compressed lossy file. What could go wrong?**

☐ The file could be too big

☐ Nothing: lossy files look the same

☐ Letters could blur into each other, so the evidence is unclear or misread

☐ The photo would turn black and white

:::


:::teacher-note

**Answer:** Letters could blur into each other, so the evidence is unclear or misread

Evidence needs every detail; lossy compression can change exactly the details that matter.

:::


:::keep-together

### Save again

**You open a JPEG, edit it and save it as a JPEG again, many times. What happens?**

☐ It loses a little more detail each time

☐ It turns into a PNG

☐ It gets sharper

☐ It stays exactly the same

:::


:::teacher-note

**Answer:** It loses a little more detail each time

Lossy losses add up. Keep a lossless original and make lossy copies from it.

:::


:::keep-together

### Review: run-length codes

**Review: what is the run-length code for white, white, white, white, black, black, black, black?**

☐ 8

☐ 4, 4

☐ 1, 1, 1, 1, 1, 1, 1, 1

☐ 0, 4, 4

:::


:::teacher-note

**Answer:** 4, 4

4 white, 4 black.

:::


## Make: the edge of lossless

Then: would that tolerance work for a different picture? Why not?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Give one context that needs lossless compression and one where lossy is fine, with a reason for each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Lossless: a medical scan or spreadsheet, where every value matters. Lossy: streamed music or a shared photo, where a much smaller file matters more than tiny changes.

:::

