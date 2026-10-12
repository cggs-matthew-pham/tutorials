---
marp: true
theme: default
html: true
---

# Colour and images

Data representation · Data as numbers

<!-- Speaker note: Students mix red, green and blue light on a pixel grid to see that a bitmap is a grid of pixels, each stored as three numbers from 0 to 255, and compare bitmaps with vector pictures stored as shapes (AC9TDI8K03 node 3). About 40 minutes (Predict and Try 6 min · Worked example 12 min · Vary 10 min · Practise and Make 12 min). Sources: CS Unplugged: Image representation (CC BY-SA 4.0), https://www.csunplugged.org/en/topics/image-representation/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a picture on a screen is a grid of tiny squares called pixels, and each pixel is stored as three numbers: how much red, green and blue light, from 0 to 255. Light mixes differently from paint: red and green light make yellow. A vector picture is stored differently, as shapes to draw.

- I can say how a pixel's colour is stored.
- I can count the numbers an image needs.
- I can explain the difference between a bitmap and a vector picture.

<!-- Speaker note: Before class: Try the Try and Make boards yourself first. The one idea: a bitmap is a grid of pixels and each pixel is three numbers (red, green, blue), each from 0 to 255. Vector pictures store shapes instead, which is why they stay sharp when scaled. Simplifications: real images are much bigger and usually compressed (Years 9–10); some formats also store transparency (a fourth number). "0 to 255 fits in one byte" is stated here and explained in the binary lessons. Hands-on: CS Unplugged's Image representation activity (colour by numbers on grid paper) works well before the board. Teacher: Try: have students find the colour of 255, 128, 0 (orange) before checking. Teacher: Worked example: ask how many numbers a phone photo might need (millions of pixels × 3). Teacher: Vary: ask why grey has equal numbers. -->

---

## Why it matters

> Look very closely at a screen and you'll see tiny dots of only three colours. How do three colours make every colour, and how are they stored?

<!-- Speaker note: A screen picture is a grid of tiny squares called **pixels**. Each pixel glows with three lights, red, green and blue, and the computer stores **how much of each**, from 0 (off) to 255 (full on). So each pixel is three numbers, written in the order red, green, blue (**RGB**). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A pixel is stored as red **255**, green **255**, blue **0**. What colour is it?**

- Green
- Red
- Brown
- Yellow

<!-- Speaker note: What happens: Yellow. Full red light and full green light together look yellow. Light adds up, so it mixes differently from paint, where red and green make a muddy brown. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose brown are thinking of paint. Ask them to hold the thought until the Try. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fcolour-and-images%2Fstep-2&code=widget%3A+pixels%0Asize%3A+3%2C+3%0Acolour%3A+0%2C+0%2C+0%0Astart%3A+white%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/colour-and-images/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Try Blue at 255 too. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Yellow. Full red light and full green light together look yellow. Light adds up, so it mixes differently from paint, where red and green make a muddy brown.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Colours from light

Each amount is a number from 0 to 255, which fits in one **byte** (the binary lessons show why). Now count the numbers in a 10 × 10 image.

$$255, 0, 0 \to \text{red}$$

1) $255, 255, 0 \to \text{yellow}$ — Red and green light together look yellow.
2) $255, 255, 255 \to \text{white}$ — All three full on.
3) $0, 0, 0 \to \text{black}$ — All off: no light.
4) $4 \times 4 = 16 \text{ pixels}$ — An image is a grid of pixels.
5) $16 \times 3 = 48 \text{ numbers}$ — Three numbers for each pixel.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 255, 0, 0 red and say "Red full on, green and blue off." Line 1: write 255, 255, 0 yellow and say "Red and green light together look yellow." Line 2: write 255, 255, 255 white and say "All three full on." Line 3: write 0, 0, 0 black and say "All off: no light." Line 4: write 4 × 4 = 16 pixels and say "An image is a grid of pixels." Line 5: write 16 × 3 = 48 numbers and say "Three numbers for each pixel." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Colours from light

**An image is 10 pixels wide and 10 pixels high, with three numbers for each pixel. How many numbers is that?**

* Answer: 300

<!-- Speaker note: 10 × 10 = 100 pixels, × 3 numbers = 300 numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam works out the colour of 255, 255, 0. Click the line where the working first goes wrong.**

```
 1  A pixel is 255, 255, 0. What colour is it?
 2  The red light is full: 255.
 3  The green light is full: 255.
 4  Red and green mixed together make brown.
 5  So the pixel is brown.
```

* Answer: line 4

<!-- Speaker note: Line 4: that is how paint mixes. A screen adds light, and full red plus full green light looks yellow. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Shapes, not pixels

**A logo is stored as **circle: centre 50, 50, radius 40, colour 255, 0, 0** instead of as pixels. What happens when you zoom in a long way?**

- It stays sharp: the computer draws the circle again at the new size
- It goes blocky, like any picture
- It turns into numbers
- It disappears

* Answer: It stays sharp: the computer draws the circle again at the new size

<!-- Speaker note: This is a vector picture: numbers describe shapes, and the computer draws them at whatever size you need, so edges stay sharp. A bitmap stores every pixel, so zooming makes the pixels bigger. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one light at a time



- **White:** 
- **Two lights:** 
- **Less light:** 
- **Grey:** 
- **Black still counts:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/data/colour-and-images/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes the brush by one light or one amount: all three full, two lights, half of one light, equal amounts (grey), then counting the numbers a black picture still needs. For students who need more support: Give the six main colours: red 255,0,0; green 0,255,0; blue 0,0,255; yellow 255,255,0; cyan 0,255,255; magenta 255,0,255. For early finishers: Find the RGB numbers for your favourite colour with the sliders. Then look at the colour picker in a drawing app: it shows the same three numbers. The hard part, on purpose: Students mix light like paint (red and green make brown). Let them predict, then see yellow on the board; a magnifier on a white part of a real screen shows the three coloured dots. When students get stuck: A student says 255, 255, 0 is brown (Sam's mistake). Ask: Does a screen mix paint, or add light? Fix: Light adds up: red and green light look yellow. / A student thinks black pixels store nothing. Ask: Press Show numbers. What does a black pixel hold? Fix: 0, 0, 0: still three numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Blue

**What colour is **0, 0, 255**?**

- Blue
- Red
- Black
- White

* Answer: Blue

<!-- Speaker note: Only the blue light is on, at full. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Magenta

**What colour is **255, 0, 255**?**

- Green
- Brown
- Black
- Magenta (pink-purple)

* Answer: Magenta (pink-purple)

<!-- Speaker note: Red and blue light together make magenta. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the numbers

**A small photo is 100 pixels wide and 50 high, with three numbers a pixel. How many numbers?**

* Answer: 15000

<!-- Speaker note: 100 × 50 = 5000 pixels, × 3 = 15 000 numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Bitmap or vector?

**Which picture is best stored as a vector (shapes to draw)?**

- A school logo that must print sharp on a poster and a pen
- A photo of your class
- A scanned drawing
- A screenshot of a game

* Answer: A school logo that must print sharp on a poster and a pen

<!-- Speaker note: Logos are made of simple shapes and need to be sharp at any size, so they suit vector. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: text codes

**Review: as text, what character has the code 65?**

- 65
- a
- A
- 6

* Answer: A

<!-- Speaker note: A is 65. The same 65 in an image would be a dark amount of one colour. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: copy a picture

Then press Show numbers. How many of your 48 numbers are 255?

[Open this step](https://tutorials.learningwaypoints.com/systems/data/colour-and-images/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Copying a picture pixel by pixel reverses the process: students choose the numbers for each colour from what they see. Hints, in order: Two colours: yellow around the edge and blue in the middle. / Yellow is red and green full, blue off: 255, 255, 0. / Blue is 0, 0, 255. Set the brush, then click every pixel that colour. -->

<!-- Speaker note: Teacher: ask how many different numbers they actually used. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What colour is 0, 255, 0? How many numbers store a 3 × 2 image?**

* Green. 3 × 2 = 6 pixels × 3 = 18 numbers.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Shapes as numbers (vector pictures and 3D models). Code links: turtle's `color()` takes RGB amounts; the Teachable Machine lessons train on images, which the model sees as these numbers. Later: why each amount stops at 255 (How many patterns?), and compressing images (Years 9–10). -->
