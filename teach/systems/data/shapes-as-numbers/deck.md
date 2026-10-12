---
marp: true
theme: default
html: true
---

# Shapes as numbers

Data representation · Data as numbers

<!-- Speaker note: Students zoom a picture stored as shapes and as pixels, change a vector's numbers to redraw it, turn a 3D cube into a pyramid by moving its corners, and build a badge from numbers (AC9TDI8K03 node 3, vector images). A 5E mission lesson. About 35 minutes (Engage and Explore 8 min · Explain 8 min · Elaborate 14 min · Evaluate 5 min). -->

---

## Today

**We are learning to** a vector picture stores shapes, not pixels: a circle is where its centre is, how big it is and its colour, a few numbers in all. The computer draws it again at any size, so it stays sharp, and it stays small. Photos suit bitmaps; logos, icons and fonts suit vectors. 3D models are numbers too: a list of corners (x, y, z) and the faces that join them.

- I can say how a vector picture is stored.
- I can explain why a vector stays sharp when it is enlarged.
- I can choose vector or bitmap for a picture.

<!-- Speaker note: Before class: Try the boards yourself. The page is 100 by 100: x goes right, y goes down (as on screens). The one idea: a vector stores shapes as numbers and is drawn again at any size; a bitmap stores pixels. Photos suit bitmaps; logos, icons and fonts suit vectors. Simplifications: real vector formats (SVG, PDF, fonts) also store curves, strokes and layers; the board's bitmap is made by sampling the middle of each pixel, with no smoothing. The 3D model counts 3 numbers per corner plus one per corner of each face. Links: SVG is the vector format of the web, and the p5 Shapes lesson (Code) draws with the same kind of numbers. Teacher: Evaluate: ask which pictures on their phone are vectors (icons, text). -->

---

## Why it matters

> The club's logo has to go on a sticker and on a banner two metres wide. How can one file be sharp at both sizes?

<!-- Speaker note: **Your mission:** the club needs one logo file that's sharp on a sticker and on a banner. Find out how pictures can be stored as shapes, then build the club badge from numbers. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**A logo is saved two ways: as pixels (a bitmap) and as shapes (a vector). You zoom in 8 times on each. Which stays sharp?**

- The vector: it's drawn again from its shapes
- Both stay sharp
- The bitmap: it has more detail
- Neither: zooming always goes blocky

<!-- Speaker note: What happens: The vector. The computer draws the shapes again at the new size. The bitmap only has its pixels, so they get bigger. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask where they have seen a blurry logo. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fshapes-as-numbers%2Fstep-2&code=widget%3A+shapes%0Agrid%3A+32%0Ashape%3A+rect+0+70+100+30+green%0Ashape%3A+circle+70+35+20+gold%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/shapes-as-numbers/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: ask how many numbers the 64 by 64 bitmap needed. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The vector. The computer draws the shapes again at the new size. The bitmap only has its pixels, so they get bigger.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: a picture as shapes

**Sam fixes the blocky logo. Click the line where it first goes wrong.**

```
 1  The club's logo looks blocky on the big banner.
 2  Every picture is made of pixels.
 3  So the only fix is more pixels.
 4  So Sam saves the logo at 10,000 by 10,000 pixels.
```

* Answer: line 2

<!-- Speaker note: Line 2: a logo can be stored as shapes (a vector). Then it's sharp at any size, and the file stays small. What this step is for: The teacher models counting a vector's numbers and drawing from them. Sam thinks every picture is pixels, the misconception planted after the method. -->

<!-- Speaker note: Teacher: count the badge's numbers together before the Make. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: change the numbers

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fshapes-as-numbers%2Fstep-4&code=widget%3A+shapes%0Ashape%3A+rect+0+70+100+30+green%0Ashape%3A+circle+70+35+20+gold%0Aedit%3A+on%0Atarget%3A+rect+0+70+100+30+green%3B+circle+70+35+30+gold%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/shapes-as-numbers/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes numbers and watches the picture follow, ending with a 3D model stored the same way. -->

<!-- Speaker note: Teacher: ask why moving four corners changed six faces. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: the club badge



[Open this step](https://tutorials.learningwaypoints.com/systems/data/shapes-as-numbers/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Reversing the process: from a picture to the numbers that draw it. Hints, in order: Start with the big blue circle: where is the outline's centre, and how big is it? / Both circles share a centre. The triangle's three corners are three x, y pairs. For students who need more support: A card with the three shapes and their numbers: circle x y r, rect x y width height, triangle x1 y1 x2 y2 x3 y3. For early finishers: Open an SVG file (a logo) in a text editor: find a circle or path and its numbers. The hard part, on purpose: The badge's triangle: students change one corner at a time and lose track. Ask them to find each corner on the outline and read its x and y first. When students get stuck: A student thinks every image is pixels (Sam's mistake). Ask: What does the vector store for the sun? Fix: Shapes: centre, size and colour. / A student moves the sun the wrong way. Ask: Which way does y go on this page? Fix: Down: bigger y is lower. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a vector logo stay sharp on a banner when a bitmap logo doesn't?**

* The vector stores shapes as numbers and is drawn again at the new size; the bitmap only has its pixels, which get bigger.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Sound as numbers. -->
