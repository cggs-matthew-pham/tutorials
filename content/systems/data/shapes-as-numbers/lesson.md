---
order: 3.5
unit: numbers
node: AC9TDI8K03 n3
introduces: [vector-graphics]
shape: 5e
title: Shapes as numbers
summary: "A vector picture stores shapes, not pixels: a circle is where its centre is, how big it is and its colour, a few numbers in all. The computer draws it again at any size, so it stays sharp, and it stays small. Photos suit bitmaps; logos, icons and fonts suit vectors. 3D models are numbers too: a list of corners (x, y, z) and the faces that join them."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club's logo has to go on a sticker and on a banner two metres wide. How can one file be sharp at both sizes?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8541
  url: http://127.0.0.1:8541/index.html
  readySelector: ".shview"
  layout: full
explainPicture: { ref: shapes.yml#explain-pic, caption: "The same picture two ways: as two shapes (13 numbers) and as a 32 by 32 bitmap (3,072 numbers)." }
explainClip:
  query: { code: "@shapes.yml#explain", fresh: 1, id: explain }
  caption: "Zoom in on both"
  say: "The same picture, stored two ways."
  clip:
    - caption: { text: "Left: two shapes, 13 numbers. Right: 32 by 32 pixels, 3,072 numbers.", say: "Two shapes, or over a thousand pixels." }
    - wait: 1200
    - click: "Zoom 8×"
    - expect: { selector: "#gsum", contains: "Zoom 8" }
    - caption: { text: "Zoomed in 8 times: the shapes are drawn again, sharp. The pixels just get bigger.", say: "Zoom in. The shapes are drawn again, sharp. The pixels just get bigger." }
    - wait: 1600
---
**Your mission:** the club needs one logo file that's sharp on a sticker and on a banner. Find out how pictures can be stored as shapes, then build the club badge from numbers.

## Engage: zoom in

```step
stage: predict
insight: "Committing to which picture stays sharp tests the new move: a vector is drawn again from its numbers at any size."
check:
  type: predict
  q: "A logo is saved two ways: as pixels (a bitmap) and as shapes (a vector). You zoom in 8 times on each. Which stays sharp?"
  options: ["The vector: it's drawn again from its shapes", "The bitmap: it has more detail", "Both stay sharp", "Neither: zooming always goes blocky"]
  actual: "The vector. The computer draws the shapes again at the new size. The bitmap only has its pixels, so they get bigger."
```

## Explore: sharp at any size?

```step
stage: run
insight: "Students zoom both pictures and try to rescue the bitmap with more pixels, meeting the cost by failing first."
try: { playground: board, starter: "shapes.yml#explore", height: 560 }
tasks:
  - check: { type: board, text: "Zoom in to 8× and compare the two pictures.", when: "z = 8", explain: "The vector's edge stays smooth; the bitmap's edge turns into steps." }
  - check: { type: board, text: "Try to make the bitmap as sharp as the vector at 8×: give it more pixels. How many numbers does it need now?", when: "z = 8 and g = 64", explain: "64 × 64 × 3 = 12,288 numbers, and it still shows steps at 8×. The vector stays sharp with 13." }
```

### Zoom in

### More pixels

Was your prediction right?

## Explain: a picture as shapes

```step
stage: investigate
insight: "The teacher models counting a vector's numbers and drawing from them. Sam thinks every picture is pixels, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam fixes the blocky logo. Click the line where it first goes wrong."
  answer: 2
  fault: logic
  misconception: every-image-pixels
  explain: "Line 2: a logo can be stored as shapes (a vector). Then it's sharp at any size, and the file stays small."
```

A **vector** picture stores shapes to draw; a **bitmap** stores every pixel.

```worked
\text{circle } 70\ 35\ 20 :: Centre at (70, 35), radius 20: three numbers.
\text{gold} = 255, 200, 0 :: Its colour: three more. 6 numbers for the sun.
\text{rect } 0\ 70\ 100\ 30 + \text{green} :: The hill: 4 + 3 = 7. The picture is 13 numbers.
32 \times 32 \times 3 = 3072 :: The same picture as a 32 by 32 bitmap.
\text{which?} :: Shapes (logos, icons, fonts, maps) suit vectors; photos have no shapes to describe, so they're bitmaps.
```

### Find the mistake

## Elaborate: change the numbers

```step
stage: modify
insight: "Each task changes numbers and watches the picture follow, ending with a 3D model stored the same way."
try: { playground: board, starter: "shapes.yml#bigger", height: 620 }
tasks:
  - starter: "shapes.yml#bigger"
    check: { type: board, text: "Make the sun bigger so it fills the dashed outline. Change one number.", when: "m = 1", explain: "Radius 30: one number changed, and the picture is drawn again." }
  - starter: "shapes.yml#move"
    check: { type: board, text: "Move the sun down to the left to sit in the dashed outline.", when: "m = 1", explain: "x 30, y 50: moving a shape is changing where its centre is." }
  - starter: "shapes.yml#mesh"
    check: { type: board, text: "3D models are numbers too. Turn the cube into a pyramid: move its four top corners (1 to 4) to one point.", when: "p = 1", explain: "All four at (0, 1, 0): the faces follow the corners. Games and 3D printers store every model as corners and faces like this." }
```

### Bigger

### Move it

### A 3D model

## Elaborate: the club badge

```step
stage: make
insight: "Reversing the process: from a picture to the numbers that draw it."
try: { playground: board, starter: "shapes.yml#make", height: 620 }
hint: ["Start with the big blue circle: where is the outline's centre, and how big is it?", "Both circles share a centre. The triangle's three corners are three x, y pairs."]
check: { type: board, text: "Build the club badge: change the numbers until all three shapes fill the dashed outline.", when: "m = 1", explain: "Blue circle (50, 50) radius 40, white circle (50, 50) radius 30, gold triangle (50, 28), (30, 66), (70, 66): 21 numbers, sharp on a sticker or a banner." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "Which should be stored as a vector?"
      options: ["The school logo", "A photo of the class", "A scanned painting", "A screenshot of a game"]
      answer: 0
      feedback: [null, "Photos have no shapes to describe.", "Brush strokes and texture are pixels, not simple shapes.", "A screenshot is pixels on a screen."]
      explain: "Logos are a few simple shapes and must be sharp at every size."
  - check: { type: reflect, text: "I can explain how a vector picture stores shapes as numbers, and when it beats a bitmap." }
```

### Vector or bitmap?

### Look back
