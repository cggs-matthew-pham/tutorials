---
title: "Run-length encoding"
subtitle: "Making data smaller · Compression · Lesson 1"
---

# Run-length encoding

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A fax machine sent whole pages down a phone line in the 1980s, as numbers. How do you send a page with far fewer numbers than it has dots?


:::teacher-note

**In one sentence:** Students paint black and white pixels and watch each row's run-length code, to explain why data is compressed, apply run-length encoding, calculate the saving and see when it fails (AC9TDI10K03 nodes 1 and 2).

**Students should be able to say:** I can explain why data is compressed. I can encode and decode a row with run-length encoding. I can say when run-length encoding saves space and when it doesn't.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A row of 8 pixels is 3 white, then 4 black, then 1 white. Stored pixel by pixel, that is 8 numbers. Which is the shortest way to store it so you get **exactly** the same row back?**

☐ 3, 4, 1: how many of each colour, in turn

☐ 8: the number of pixels

☐ 4: just the number of black pixels

☐ You can't: every pixel needs its own number

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3, 4, 1. Taking turns from white, those three numbers rebuild the row exactly. Storing only 4 loses where the black pixels are.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: encode a picture


:::keep-together

### Four rows

1. $3, 4, 1$ — Row 1: 3 white, 4 black, 1 white. 3 numbers instead of 8.
2. $0, 8$ — Row 2 starts black, so the code starts with 0 (no whites).
3. $8$ — Row 3 is all white: one run.
4. $1, 1, 1, 1, 1, 1, 1, 1$ — Row 4 changes every pixel: 8 numbers, no saving.
5. $3 + 2 + 1 + 8 = 14 \text{ numbers instead of } 32$ — About 44% of the size. Long runs save a lot; no runs save nothing.

Decompressing reads the codes back and gives exactly the same picture, so run-length encoding is **lossless**. Now decode 0, 2, 6.

**A row's code is **0, 2, 6**. What is the row?**

☐ 2 white, then 6 black

☐ 6 black, then 2 white

☐ 2 black, then 6 white

☐ 0 white, 2 white, 6 black

:::


:::teacher-note

**Answer:** 2 black, then 6 white

0 white, then 2 black, then 6 white.

:::


:::keep-together

### Find the mistake

**Sam encodes a row that starts with black. Click the line where it first goes wrong.**

```
 1  Encode the row: black, black, white, white, white, white, white, white.
 2  The first run is 2 black pixels.
 3  So the code starts with 2.
 4  Then 6 white: the code is 2, 6.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: the first number always counts white. The row starts black, so the code starts with 0: 0, 2, 6. Read as 2, 6 it would come back as 2 white, 6 black.

:::


:::keep-together

### Why compress?

**Why compress data at all?**

☐ Computers can't store uncompressed data

☐ It makes pictures sharper

☐ It makes data more secure

☐ Smaller data takes less storage and is quicker and cheaper to send

:::


:::teacher-note

**Answer:** Smaller data takes less storage and is quicker and cheaper to send

Fewer numbers means less storage, faster downloads and streaming, and less energy and cost to move data around.

:::


:::typical

## Vary: one change at a time


**A whole run.** 

**No runs.** 

**Fewest numbers.** 

**Compression ratio.** 

**When RLE works.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Codes


:::keep-together

### Encode

**What is the code for the row: white, white, black, black, black, black, black, black?**

☐ 2, 2, 2, 2

☐ 2, 6

☐ 6, 2

☐ 0, 2, 6

:::


:::teacher-note

**Answer:** 2, 6

2 white, then 6 black.

:::


:::keep-together

### Decode the length

**A row is decoded from **1, 3, 2, 2**. How many pixels long is it?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 8

1 + 3 + 2 + 2 = 8 pixels.

:::


:::keep-together

### Text

**Run-length encoding on text: **aaaabbbcc** can be stored as…**

☐ 9

☐ a4b3c2d

☐ 4a3b2c

☐ abc

:::


:::teacher-note

**Answer:** 4a3b2c

Each run is a count and the character: 4a 3b 2c, six characters instead of nine.

:::


:::keep-together

### Bigger?

**Can run-length encoding make data **bigger**?**

☐ Yes, when there are few runs, as in abcd → 1a1b1c1d

☐ Only for pictures

☐ No, compression always shrinks data

☐ Only if you compress twice

:::


:::teacher-note

**Answer:** Yes, when there are few runs, as in abcd → 1a1b1c1d

Each run costs a count and a value. Data that changes every step doubles in size.

:::


## Make: draw from the codes

Then: how many numbers would the plus sign need if it were twice as big (12 × 12)?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Encode the row black, black, black, white, white, white, white, white. Why is run-length encoding called lossless?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 0, 3, 5. Decompressing gives back exactly the same data.

:::

