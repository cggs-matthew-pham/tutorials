---
marp: true
theme: default
html: true
---

# Run-length encoding

Making data smaller · Compression

<!-- Speaker note: Students paint black and white pixels and watch each row's run-length code, to explain why data is compressed, apply run-length encoding, calculate the saving and see when it fails (AC9TDI10K03 nodes 1 and 2). About 45 minutes (Predict and Try 6 min · Worked example 12 min · Vary 12 min · Practise and Make 15 min). Sources: CS Unplugged: Image representation (CC BY-SA 4.0), https://www.csunplugged.org/en/topics/image-representation/ (checked 12 October 2026). -->

---

## Today

**We are learning to** compression stores data in fewer numbers, so it takes less space and less time to send. Run-length encoding stores how many of each colour there are in turn (3, 4, 1) instead of every pixel. It gives back exactly the same picture (lossless), and works best on data with long runs.

- I can explain why data is compressed.
- I can encode and decode a row with run-length encoding.
- I can say when run-length encoding saves space and when it doesn't.

<!-- Speaker note: Before class: CS Unplugged's Image representation activity (the fax-machine pixel codes) is the same model on paper; doing one page of it first works well. The one idea: store runs instead of every value; decompressing gives back the data exactly (lossless). It saves when the data has long runs, and can make data bigger when it has none. Simplification: real formats use a count and a value, as the lossy lesson does; the black-and-white form here (taking turns from white) is CS Unplugged's. Teacher: Try: ask what code a row of one black pixel at the end would get (7, 1). Teacher: Worked example: pause before row 2 and ask how to say "no white". Teacher: Vary: the checkerboard task usually surprises; ask what kind of real picture is like it. -->

---

## Why it matters

> A fax machine sent whole pages down a phone line in the 1980s, as numbers. How do you send a page with far fewer numbers than it has dots?

<!-- Speaker note: Pictures, songs and videos are huge: a phone photo is tens of millions of numbers. **Compression** stores the same data in fewer numbers, so it fits in less space and is quicker to send. Here the pictures are black and white, one number a pixel. **Run-length encoding** stores each row as the lengths of its **runs** (pixels of the same colour in a row), taking turns: white first, then black, then white, and so on. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A row of 8 pixels is 3 white, then 4 black, then 1 white. Stored pixel by pixel, that is 8 numbers. Which is the shortest way to store it so you get **exactly** the same row back?**

- 3, 4, 1: how many of each colour, in turn
- 8: the number of pixels
- 4: just the number of black pixels
- You can't: every pixel needs its own number

<!-- Speaker note: What happens: 3, 4, 1. Taking turns from white, those three numbers rebuild the row exactly. Storing only 4 loses where the black pixels are. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 4 lose the position; ask them to rebuild the row from 4. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fcompression%2Frun-length%2Fstep-2&code=widget%3A+pixels%0Asize%3A+8%2C+1%0Amode%3A+bw%0Arle%3A+on%0Astart%3A+white%0Atarget%3A+wwwkkkkw%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/compression/run-length/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Change a pixel and watch the code change. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3, 4, 1. Taking turns from white, those three numbers rebuild the row exactly. Storing only 4 loses where the black pixels are.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Four rows

Decompressing reads the codes back and gives exactly the same picture, so run-length encoding is **lossless**. Now decode 0, 2, 6.

$$3, 4, 1$$

1) $0, 8$ — Row 2 starts black, so the code starts with 0 (no whites).
2) $8$ — Row 3 is all white: one run.
3) $1, 1, 1, 1, 1, 1, 1, 1$ — Row 4 changes every pixel: 8 numbers, no saving.
4) $3 + 2 + 1 + 8 = 14 \text{ numbers instead of } 32$ — About 44% of the size. Long runs save a lot; no runs save nothing.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 3, 4, 1 and say "Row 1: 3 white, 4 black, 1 white. 3 numbers instead of 8." Line 1: write 0, 8 and say "Row 2 starts black, so the code starts with 0 (no whites)." Line 2: write 8 and say "Row 3 is all white: one run." Line 3: write 1, 1, 1, 1, 1, 1, 1, 1 and say "Row 4 changes every pixel: 8 numbers, no saving." Line 4: write 3 + 2 + 1 + 8 = 14 numbers instead of 32 and say "About 44% of the size. Long runs save a lot; no runs save nothing." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Four rows

**A row's code is **0, 2, 6**. What is the row?**

- 2 white, then 6 black
- 6 black, then 2 white
- 2 black, then 6 white
- 0 white, 2 white, 6 black

* Answer: 2 black, then 6 white

<!-- Speaker note: 0 white, then 2 black, then 6 white. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam encodes a row that starts with black. Click the line where it first goes wrong.**

```
 1  Encode the row: black, black, white, white, white, white, white, white.
 2  The first run is 2 black pixels.
 3  So the code starts with 2.
 4  Then 6 white: the code is 2, 6.
```

* Answer: line 3

<!-- Speaker note: Line 3: the first number always counts white. The row starts black, so the code starts with 0: 0, 2, 6. Read as 2, 6 it would come back as 2 white, 6 black. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why compress?

**Why compress data at all?**

- Computers can't store uncompressed data
- It makes pictures sharper
- It makes data more secure
- Smaller data takes less storage and is quicker and cheaper to send

* Answer: Smaller data takes less storage and is quicker and cheaper to send

<!-- Speaker note: Fewer numbers means less storage, faster downloads and streaming, and less energy and cost to move data around. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change at a time



- **A whole run:** 
- **No runs:** 
- **Fewest numbers:** 
- **Compression ratio:** 
- **When RLE works:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/compression/run-length/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing in the data: a whole run, then the worst case (no runs), then the best case (every row one run), then the ratio and when to use RLE. For students who need more support: Have students say the colours aloud while counting: white 3, black 4, white 1. For early finishers: Design an 8 × 8 picture that compresses to 8 numbers or fewer. Design one that makes the code longer than 64. The hard part, on purpose: Rows that start black. Insist the first number always counts white, even when it is 0. When students get stuck: A student writes 2, 6 for a row that starts black (Sam's mistake). Ask: What colour does the first number count? Fix: White, always: start with 0. / A student thinks every picture shrinks. Ask: What is the code for a checkerboard row? Fix: Eight 1s: no saving. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Encode

**What is the code for the row: white, white, black, black, black, black, black, black?**

- 2, 2, 2, 2
- 2, 6
- 6, 2
- 0, 2, 6

* Answer: 2, 6

<!-- Speaker note: 2 white, then 6 black. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Decode the length

**A row is decoded from **1, 3, 2, 2**. How many pixels long is it?**

* Answer: 8

<!-- Speaker note: 1 + 3 + 2 + 2 = 8 pixels. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Text

**Run-length encoding on text: **aaaabbbcc** can be stored as…**

- 9
- a4b3c2d
- 4a3b2c
- abc

* Answer: 4a3b2c

<!-- Speaker note: Each run is a count and the character: 4a 3b 2c, six characters instead of nine. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Bigger?

**Can run-length encoding make data **bigger**?**

- Yes, when there are few runs, as in abcd → 1a1b1c1d
- Only for pictures
- No, compression always shrinks data
- Only if you compress twice

* Answer: Yes, when there are few runs, as in abcd → 1a1b1c1d

<!-- Speaker note: Each run costs a count and a value. Data that changes every step doubles in size. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: draw from the codes

Then: how many numbers would the plus sign need if it were twice as big (12 × 12)?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/compression/run-length/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Drawing the picture from its codes reverses the process: students decompress by hand and check that the codes rebuild it exactly. Hints, in order: Each row's first number counts white, then they take turns. / 2, 2, 2 means 2 white, 2 black, 2 white. / 0, 6 means no white, then 6 black: a whole black row. -->

<!-- Speaker note: Teacher: swap codes between pairs: one draws a picture, the other decodes it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Encode the row black, black, black, white, white, white, white, white. Why is run-length encoding called lossless?**

* 0, 3, 5. Decompressing gives back exactly the same data.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Lossy or lossless. Builds on: Data representation (pixels and bytes). Where it leads: file formats (PNG, GIF and ZIP use lossless methods; JPEG and MP3 lossy). -->
