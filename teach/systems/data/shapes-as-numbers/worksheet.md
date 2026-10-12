---
title: "Shapes as numbers"
subtitle: "Data representation · Data as numbers · Lesson 3.5"
---

# Shapes as numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The club's logo has to go on a sticker and on a banner two metres wide. How can one file be sharp at both sizes?


:::teacher-note

**In one sentence:** Students zoom a picture stored as shapes and as pixels, change a vector's numbers to redraw it, turn a 3D cube into a pyramid by moving its corners, and build a badge from numbers (AC9TDI8K03 node 3, vector images). A 5E mission lesson.

**Students should be able to say:** I can say how a vector picture is stored. I can explain why a vector stays sharp when it is enlarged. I can choose vector or bitmap for a picture.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**A logo is saved two ways: as pixels (a bitmap) and as shapes (a vector). You zoom in 8 times on each. Which stays sharp?**

☐ The vector: it's drawn again from its shapes

☐ Both stay sharp

☐ The bitmap: it has more detail

☐ Neither: zooming always goes blocky

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The vector. The computer draws the shapes again at the new size. The bitmap only has its pixels, so they get bigger.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: a picture as shapes

A **vector** picture stores shapes to draw; a **bitmap** stores every pixel.

1. $\text{circle } 70\ 35\ 20$ — Centre at (70, 35), radius 20: three numbers.
2. $\text{gold} = 255, 200, 0$ — Its colour: three more. 6 numbers for the sun.
3. $\text{rect } 0\ 70\ 100\ 30 + \text{green}$ — The hill: 4 + 3 = 7. The picture is 13 numbers.
4. $32 \times 32 \times 3 = 3072$ — The same picture as a 32 by 32 bitmap.
5. $\text{which?}$ — Shapes (logos, icons, fonts, maps) suit vectors; photos have no shapes to describe, so they're bitmaps.

### Find the mistake

:::keep-together

**Sam fixes the blocky logo. Click the line where it first goes wrong.**

```
 1  The club's logo looks blocky on the big banner.
 2  Every picture is made of pixels.
 3  So the only fix is more pixels.
 4  So Sam saves the logo at 10,000 by 10,000 pixels.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: a logo can be stored as shapes (a vector). Then it's sharp at any size, and the file stays small.

:::


:::typical

## Elaborate: change the numbers

:::


## Make: Elaborate: the club badge


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why does a vector logo stay sharp on a banner when a bitmap logo doesn't?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The vector stores shapes as numbers and is drawn again at the new size; the bitmap only has its pixels, which get bigger.

:::

