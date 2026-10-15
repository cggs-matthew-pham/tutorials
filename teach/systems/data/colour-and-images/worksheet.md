---
title: "Colour and images"
subtitle: "Data representation · Data as numbers · Lesson 3"
---

# Colour and images

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Look very closely at a screen and you'll see tiny dots of only three colours. How do three colours make every colour, and how are they stored?


:::teacher-note

**In one sentence:** Students mix red, green and blue light on a pixel grid to see that a bitmap is a grid of pixels, each stored as three numbers from 0 to 255, and compare bitmaps with vector pictures stored as shapes (AC9TDI8K03 node 3).

**Students should be able to say:** I can say how a pixel's colour is stored. I can count the numbers an image needs. I can explain the difference between a bitmap and a vector picture.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A pixel is stored as red **255**, green **255**, blue **0**. What colour is it?**

☐ Green

☐ Red

☐ Brown

☐ Yellow

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Yellow. Full red light and full green light together look yellow. Light adds up, so it mixes differently from paint, where red and green make a muddy brown.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: a picture as numbers


:::keep-together

### Colours from light

1. $255, 0, 0 \to \text{red}$ — Red full on, green and blue off.
2. $255, 255, 0 \to \text{yellow}$ — Red and green light together look yellow.
3. $255, 255, 255 \to \text{white}$ — All three full on.
4. $0, 0, 0 \to \text{black}$ — All off: no light.
5. $4 \times 4 = 16 \text{ pixels}$ — An image is a grid of pixels.
6. $16 \times 3 = 48 \text{ numbers}$ — Three numbers for each pixel.

Each amount is a number from 0 to 255, which fits in one **byte** (the binary lessons show why). Now count the numbers in a 10 × 10 image.

**An image is 10 pixels wide and 10 pixels high, with three numbers for each pixel. How many numbers is that?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 300

10 × 10 = 100 pixels, × 3 numbers = 300 numbers.

:::


:::keep-together

### Find the mistake

**Sam works out the colour of 255, 255, 0. Click the line where the working first goes wrong.**

```
 1  A pixel is 255, 255, 0. What colour is it?
 2  The red light is full: 255.
 3  The green light is full: 255.
 4  Red and green mixed together make brown.
 5  So the pixel is brown.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: that is how paint mixes. A screen adds light, and full red plus full green light looks yellow.

:::


:::keep-together

### Shapes, not pixels

**A logo is stored as **circle: centre 50, 50, radius 40, colour 255, 0, 0** instead of as pixels. What happens when you zoom in a long way?**

☐ It stays sharp: the computer draws the circle again at the new size

☐ It goes blocky, like any picture

☐ It turns into numbers

☐ It disappears

:::


:::teacher-note

**Answer:** It stays sharp: the computer draws the circle again at the new size

This is a vector picture: numbers describe shapes, and the computer draws them at whatever size you need, so edges stay sharp. A bitmap stores every pixel, so zooming makes the pixels bigger.

:::


:::typical

## Vary: one light at a time


**White.** 

**Two lights.** 

**Less light.** 

**Grey.** 

**Black still counts.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Colours and counts


:::keep-together

### Blue

**What colour is **0, 0, 255**?**

☐ Blue

☐ Red

☐ Black

☐ White

:::


:::teacher-note

**Answer:** Blue

Only the blue light is on, at full.

:::


:::keep-together

### Magenta

**What colour is **255, 0, 255**?**

☐ Green

☐ Brown

☐ Black

☐ Magenta (pink-purple)

:::


:::teacher-note

**Answer:** Magenta (pink-purple)

Red and blue light together make magenta.

:::


:::keep-together

### Count the numbers

**A small photo is 100 pixels wide and 50 high, with three numbers a pixel. How many numbers?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 15000

100 × 50 = 5000 pixels, × 3 = 15 000 numbers.

:::


:::keep-together

### Bitmap or vector?

**Which picture is best stored as a vector (shapes to draw)?**

☐ A school logo that must print sharp on a poster and a pen

☐ A photo of your class

☐ A scanned drawing

☐ A screenshot of a game

:::


:::teacher-note

**Answer:** A school logo that must print sharp on a poster and a pen

Logos are made of simple shapes and need to be sharp at any size, so they suit vector.

:::


:::keep-together

### Review: text codes

**Review: as text, what character has the code 65?**

☐ 65

☐ a

☐ A

☐ 6

:::


:::teacher-note

**Answer:** A

A is 65. The same 65 in an image would be a dark amount of one colour.

:::


## Make: copy a picture

Then press Show numbers. How many of your 48 numbers are 255?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**What colour is 0, 255, 0? How many numbers store a 3 × 2 image?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Green. 3 × 2 = 6 pixels × 3 = 18 numbers.

:::

