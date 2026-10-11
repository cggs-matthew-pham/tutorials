---
order: 1
unit: compress
node: [AC9TDI10K03 n1, AC9TDI10K03 n2]
title: Run-length encoding
summary: "Compression stores data in fewer numbers, so it takes less space and less time to send. Run-length encoding stores how many of each colour there are in turn (3, 4, 1) instead of every pixel. It gives back exactly the same picture (lossless), and works best on data with long runs."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A fax machine sent whole pages down a phone line in the 1980s, as numbers. How do you send a page with far fewer numbers than it has dots?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8328
  url: http://127.0.0.1:8328/index.html
  readySelector: ".pxcell"
  layout: full
explainPicture: { ref: rle.yml#explain-pic, caption: "Four rows and their codes: 3, 4, 1; 0, 8 (it starts black); 8; and a checkerboard row, 1, 1, 1, 1, 1, 1, 1, 1, which saves nothing. 14 numbers instead of 32." }
explainClip:
  query: { code: "@rle.yml#explain", fresh: 1, id: explain }
  caption: "Counting runs"
  say: "Instead of every pixel, store how many of each colour."
  clip:
    - caption: { text: "A white row is one run: 8.", say: "All white is one run of eight." }
    - wait: 1000
    - click: "Pixel row 1 column 4: white (white). Paint it black"
    - click: "Pixel row 1 column 5: white (white). Paint it black"
    - click: "Pixel row 1 column 6: white (white). Paint it black"
    - click: "Pixel row 1 column 7: white (white). Paint it black"
    - expect: { selector: ".pxcodes", contains: "3, 4, 1" }
    - caption: { text: "Now 3 white, 4 black, 1 white: 3, 4, 1. Three numbers instead of eight.", say: "Three white, four black, one white." }
    - wait: 1600
---
Pictures, songs and videos are huge: a phone photo is tens of millions of numbers. **Compression** stores the same data in fewer numbers, so it fits in less space and is quicker to send.

Here the pictures are black and white, one number a pixel. **Run-length encoding** stores each row as the lengths of its **runs** (pixels of the same colour in a row), taking turns: white first, then black, then white, and so on.

## Predict: a shorter row

```step
stage: predict
insight: "Committing to how to store a row in fewer numbers tests the new move before it is shown: count runs, in turn, instead of storing every pixel."
check:
  type: predict
  q: "A row of 8 pixels is 3 white, then 4 black, then 1 white. Stored pixel by pixel, that is 8 numbers. Which is the shortest way to store it so you get **exactly** the same row back?"
  options: ["3, 4, 1: how many of each colour, in turn", "4: just the number of black pixels", "You can't: every pixel needs its own number", "8: the number of pixels"]
  actual: "3, 4, 1. Taking turns from white, those three numbers rebuild the row exactly. Storing only 4 loses where the black pixels are."
```

## Try: paint a run

```step
stage: run
insight: "Painting pixels 4 to 7 black and reading the code settles the prediction: the row becomes 3, 4, 1."
try: { playground: board, starter: "rle.yml#run", height: 380 }
check: { type: board, text: "Paint pixels 4 to 7 black to match the picture. What code does the board write for the row?", when: "m = 1", explain: "3 white, 4 black, 1 white: 3, 4, 1. Three numbers instead of eight." }
```

Was your prediction right? Change a pixel and watch the code change.

## Worked example: encode a picture

```step
stage: investigate
insight: "Encoding four rows, including one that starts black and one with no runs, models the new move and shows when it fails. Sam leaves out the leading 0, the misconception planted after the method; the why question covers what compression is for."
tasks:
  - check:
      type: question
      q: "A row's code is **0, 2, 6**. What is the row?"
      options: ["2 black, then 6 white", "2 white, then 6 black", "0 white, 2 white, 6 black", "6 black, then 2 white"]
      answer: 0
      feedback: [null, "The first number counts white. Here it is 0, so the row starts black.", "0 white means there are no white pixels at the start.", "Runs go left to right, in the order of the code."]
      explain: "0 white, then 2 black, then 6 white."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam encodes a row that starts with black. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: rle-start-white
      explain: "Line 3: the first number always counts white. The row starts black, so the code starts with 0: 0, 2, 6. Read as 2, 6 it would come back as 2 white, 6 black."
  - check:
      type: question
      q: "Why compress data at all?"
      options: ["Smaller data takes less storage and is quicker and cheaper to send", "It makes pictures sharper", "It makes data more secure", "Computers can't store uncompressed data"]
      answer: 0
      feedback: [null, "Compression doesn't add detail; at best it keeps it all.", "That is encryption. Compressed data can still be read by anyone with the rule.", "They can; it just takes more space and time."]
      explain: "Fewer numbers means less storage, faster downloads and streaming, and less energy and cost to move data around."
```

### Four rows

```worked
3, 4, 1 :: Row 1: 3 white, 4 black, 1 white. 3 numbers instead of 8.
0, 8 :: Row 2 starts black, so the code starts with 0 (no whites).
8 :: Row 3 is all white: one run.
1, 1, 1, 1, 1, 1, 1, 1 :: Row 4 changes every pixel: 8 numbers, no saving.
3 + 2 + 1 + 8 = 14 \text{ numbers instead of } 32 :: About 44% of the size. Long runs save a lot; no runs save nothing.
```

Decompressing reads the codes back and gives exactly the same picture, so run-length encoding is **lossless**. Now decode 0, 2, 6.

### Find the mistake

### Why compress?

## Vary: one change at a time

```step
stage: modify
insight: "Each task changes one thing in the data: a whole run, then the worst case (no runs), then the best case (every row one run), then the ratio and when to use RLE."
try: { playground: board, starter: "rle.yml#vary-black", height: 440 }
tasks:
  - starter: "rle.yml#vary-black"
    check: { type: board, text: "Paint the whole row black. What is its code?", when: "c = 8", explain: "0, 8: no white pixels first, then 8 black. Two numbers for eight pixels." }
  - starter: "rle.yml#vary-check"
    check: { type: board, text: "Paint every second pixel black: white, black, white, black… How many numbers is the code?", when: "k = 8", explain: "Every pixel is its own run, so the code is eight 1s: no saving at all." }
  - starter: "rle.yml#vary-fewest"
    check: { type: board, text: "Change this picture so its codes use as few numbers as possible.", when: "k = 4", explain: "Every row one colour: an all-white row is 8 (one number) and an all-black row is 0, 8 (two), so all white is fewest: 4 numbers for 32 pixels." }
  - check:
      type: answer
      q: "An 8 × 8 icon (64 pixels) compresses to 16 numbers. What percentage of the original size is that?"
      answer: "25"
      feedback:
        - ["4", "That is how many times smaller. As a percentage: 16 ÷ 64 × 100."]
        - ["75", "That is the saving. The size left is 16 ÷ 64."]
      explain: "16 ÷ 64 = 0.25, so 25% of the size (a quarter)."
  - check:
      type: question
      q: "Which picture would run-length encoding shrink the most?"
      options: ["A diagram with large areas of one colour", "A photo of a crowd", "TV static (random dots)", "A fine checkerboard"]
      answer: 0
      feedback: [null, "Photos change colour almost every pixel: few long runs.", "Random dots have almost no runs.", "A checkerboard changes every pixel: the worst case."]
      explain: "RLE saves when the data has long runs of the same value."
```

### A whole run

### No runs

### Fewest numbers

### Compression ratio

### When RLE works

## Practise: codes

```step
stage: practise
insight: "Encoding and decoding rows, a code longer than the data, run-length encoding on text, and choosing what compresses well."
tasks:
  - check:
      type: question
      q: "What is the code for the row: white, white, black, black, black, black, black, black?"
      options: ["2, 6", "0, 2, 6", "6, 2", "2, 2, 2, 2"]
      answer: 0
      feedback: [null, "The row starts white, so no leading 0 is needed.", "Counts go in order: white first.", "There are only two runs."]
      explain: "2 white, then 6 black."
  - check:
      type: answer
      q: "A row is decoded from **1, 3, 2, 2**. How many pixels long is it?"
      answer: "8"
      feedback:
        - ["4", "That is the number of runs. Add the run lengths."]
      explain: "1 + 3 + 2 + 2 = 8 pixels."
  - check:
      type: question
      q: "Run-length encoding on text: **aaaabbbcc** can be stored as…"
      options: ["4a3b2c", "abc", "9", "a4b3c2d"]
      answer: 0
      feedback: [null, "That loses how many of each.", "That loses which letters.", "There is no d."]
      explain: "Each run is a count and the character: 4a 3b 2c, six characters instead of nine."
  - check:
      type: question
      q: "Can run-length encoding make data **bigger**?"
      options: ["Yes, when there are few runs, as in abcd → 1a1b1c1d", "No, compression always shrinks data", "Only for pictures", "Only if you compress twice"]
      answer: 0
      feedback: [null, "Not when the data has no repeats.", "Text works the same way: no runs, no saving.", "Once is enough to make it bigger."]
      explain: "Each run costs a count and a value. Data that changes every step doubles in size."
```

### Encode

### Decode the length

### Text

### Bigger?

## Make: draw from the codes

```step
stage: make
insight: "Drawing the picture from its codes reverses the process: students decompress by hand and check that the codes rebuild it exactly."
try: { playground: board, starter: "rle.yml#make", height: 520 }
hint: ["Each row's first number counts white, then they take turns.", "2, 2, 2 means 2 white, 2 black, 2 white.", "0, 6 means no white, then 6 black: a whole black row."]
check: { type: board, text: "The codes on the right describe a 6 × 6 picture. Paint it.", when: "m = 1", explain: "A plus sign. 16 numbers rebuild 36 pixels exactly: lossless." }
```

Then: how many numbers would the plus sign need if it were twice as big (12 × 12)?
