---
order: 3
unit: numbers
node: AC9TDI8K03 n3
introduces: [rgb-colour, pixel-grid]
title: Colour and images
summary: "A picture on a screen is a grid of tiny squares called pixels, and each pixel is stored as three numbers: how much red, green and blue light, from 0 to 255. Light mixes differently from paint: red and green light make yellow. A vector picture is stored differently, as shapes to draw."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Look very closely at a screen and you'll see tiny dots of only three colours. How do three colours make every colour, and how are they stored?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8465
  url: http://127.0.0.1:8465/index.html
  readySelector: ".pxcell"
  layout: full
explainPicture: { ref: pixels.yml#explain-pic, caption: "A 4 by 4 image: each pixel is three numbers for red, green and blue. Yellow is 255, 255, 0 and blue is 0, 0, 255. 16 pixels × 3 = 48 numbers." }
explainClip:
  query: { code: "@pixels.yml#explain", fresh: 1, id: explain }
  caption: "Pixels are numbers"
  say: "Each pixel is three numbers."
  clip:
    - caption: { text: "Red 255, green 0, blue 0 is red.", say: "Full red, no green, no blue, is red." }
    - click: "Pixel row 1 column 1: white (255, 255, 255). Paint it red"
    - wait: 800
    - caption: { text: "Turn the green up to 255 too.", say: "Now add full green light." }
    - type: { into: Green value, text: "255" }
    - press: Enter
    - click: "Pixel row 1 column 2: white (255, 255, 255). Paint it yellow"
    - expect: { selector: "#gsum", contains: "255, 255, 0" }
    - caption: { text: "Red and green light make yellow: 255, 255, 0.", say: "Red and green light make yellow." }
    - wait: 1500
---
A screen picture is a grid of tiny squares called **pixels**. Each pixel glows with three lights, red, green and blue, and the computer stores **how much of each**, from 0 (off) to 255 (full on). So each pixel is three numbers, written in the order red, green, blue (**RGB**).

## Predict: 255, 255, 0

```step
stage: predict
insight: "Committing to the colour of 255, 255, 0 tests the new move before it is used: colours are amounts of red, green and blue light, and light does not mix like paint."
check:
  type: predict
  q: "A pixel is stored as red **255**, green **255**, blue **0**. What colour is it?"
  options: ["Yellow", "Brown", "Green", "Red"]
  actual: "Yellow. Full red light and full green light together look yellow. Light adds up, so it mixes differently from paint, where red and green make a muddy brown."
```

## Try: mix a colour

```step
stage: run
insight: "Setting red 255, green 255, blue 0 and painting a pixel settles the prediction directly."
try: { playground: board, starter: "pixels.yml#run", height: 500 }
check: { type: board, text: "Set Red to 255, Green to 255 and Blue to 0, then click a pixel to paint it. What colour is it?", when: "p = 255 and q = 255 and s = 0", explain: "255, 255, 0 is yellow: full red and full green light." }
```

Was your prediction right? Try Blue at 255 too.

## Worked example: a picture as numbers

```step
stage: investigate
insight: "Building colours from light, then counting the numbers in an image, models the new move. Sam mixes light like paint, the misconception planted after the method; the vector question shows the other way to store a picture."
tasks:
  - check:
      type: answer
      q: "An image is 10 pixels wide and 10 pixels high, with three numbers for each pixel. How many numbers is that?"
      answer: "300"
      feedback:
        - ["100", "That is the number of pixels. Each pixel is three numbers."]
        - ["30", "10 × 10 is 100 pixels, then × 3."]
        - ["60", "Multiply the width by the height to count the pixels: 10 × 10."]
      explain: "10 × 10 = 100 pixels, × 3 numbers = 300 numbers."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam works out the colour of 255, 255, 0. Click the line where the working first goes wrong."
      answer: 4
      fault: logic
      misconception: light-mixes-like-paint
      explain: "Line 4: that is how paint mixes. A screen adds light, and full red plus full green light looks yellow."
  - check:
      type: question
      q: "A logo is stored as **circle: centre 50, 50, radius 40, colour 255, 0, 0** instead of as pixels. What happens when you zoom in a long way?"
      options: ["It stays sharp: the computer draws the circle again at the new size", "It goes blocky, like any picture", "It disappears", "It turns into numbers"]
      answer: 0
      feedback: [null, "A bitmap goes blocky, because each pixel just gets bigger. This picture is a shape to draw.", "The shape is still there at any size.", "It is already numbers: a centre, a radius and a colour."]
      explain: "This is a vector picture: numbers describe shapes, and the computer draws them at whatever size you need, so edges stay sharp. A bitmap stores every pixel, so zooming makes the pixels bigger."
```

### Colours from light

```worked
255, 0, 0 \to \text{red} :: Red full on, green and blue off.
255, 255, 0 \to \text{yellow} :: Red and green light together look yellow.
255, 255, 255 \to \text{white} :: All three full on.
0, 0, 0 \to \text{black} :: All off: no light.
4 \times 4 = 16 \text{ pixels} :: An image is a grid of pixels.
16 \times 3 = 48 \text{ numbers} :: Three numbers for each pixel.
```

Each amount is a number from 0 to 255, which fits in one **byte** (the binary lessons show why). Now count the numbers in a 10 × 10 image.

### Find the mistake

### Shapes, not pixels

## Vary: one light at a time

```step
stage: modify
insight: "Each task changes the brush by one light or one amount: all three full, two lights, half of one light, equal amounts (grey), then counting the numbers a black picture still needs."
try: { playground: board, starter: "pixels.yml#modify", height: 500 }
tasks:
  - check: { type: board, text: "Paint a pixel white.", when: "p = 255 and q = 255 and s = 255", explain: "White is all three lights full: 255, 255, 255." }
  - check: { type: board, text: "Now turn red off and paint a pixel. What colour is 0, 255, 255?", when: "p = 0 and q = 255 and s = 255", explain: "Green and blue light make cyan, a light blue." }
  - check: { type: board, text: "Paint a dark red: red at about half (128), green and blue off.", when: "p > 100 and p < 160 and q = 0 and s = 0", explain: "Less red light makes a darker red. The number is the amount of light." }
  - check: { type: board, text: "Paint a grey: all three the same, at 128.", when: "p = 128 and q = 128 and s = 128", explain: "Equal amounts of all three lights are a grey. 0 is black and 255 is white, so 128 is mid grey." }
  - check:
      type: answer
      q: "The board starts with every pixel black (0, 0, 0). How many numbers does that 4 × 4 picture store?"
      answer: "48"
      feedback:
        - ["0", "A black pixel is still stored: three numbers, all 0."]
        - ["16", "16 pixels, but each is three numbers."]
      explain: "Every pixel is three numbers, even black ones: 16 × 3 = 48. (Show numbers on the board to see them.)"
```

### White

### Two lights

### Less light

### Grey

### Black still counts

## Practise: colours and counts

```step
stage: practise
insight: "Reading RGB values, counting numbers in an image, choosing bitmap or vector, and a review of text codes."
tasks:
  - check:
      type: question
      q: "What colour is **0, 0, 255**?"
      options: ["Blue", "Black", "Red", "White"]
      answer: 0
      feedback: [null, "Black is all three off. Here blue is full on.", "The first number is red, and it is 0.", "White is all three full."]
      explain: "Only the blue light is on, at full."
  - check:
      type: question
      q: "What colour is **255, 0, 255**?"
      options: ["Magenta (pink-purple)", "Brown", "Green", "Black"]
      answer: 0
      feedback: [null, "Red and blue light don't make brown; that is paint thinking.", "The green is 0.", "Two lights are full on."]
      explain: "Red and blue light together make magenta."
  - check:
      type: answer
      q: "A small photo is 100 pixels wide and 50 high, with three numbers a pixel. How many numbers?"
      answer: "15000"
      feedback:
        - ["5000", "That is the number of pixels. × 3 for red, green and blue."]
        - ["450", "Multiply, don't add: 100 × 50 pixels, then × 3."]
      explain: "100 × 50 = 5000 pixels, × 3 = 15 000 numbers."
  - check:
      type: question
      q: "Which picture is best stored as a vector (shapes to draw)?"
      options: ["A school logo that must print sharp on a poster and a pen", "A photo of your class", "A screenshot of a game", "A scanned drawing"]
      answer: 0
      feedback: [null, "A photo has no simple shapes: every pixel is different, so it is a bitmap.", "A screenshot is pixels from the screen: a bitmap.", "A scan makes pixels, so it is a bitmap."]
      explain: "Logos are made of simple shapes and need to be sharp at any size, so they suit vector."
  - check:
      type: question
      q: "Review: as text, what character has the code 65?"
      options: ["A", "a", "65", "6"]
      answer: 0
      feedback: [null, "Lower case a is 97.", "As text, 65 is a character's code.", "The digit 6 is 54."]
      explain: "A is 65. The same 65 in an image would be a dark amount of one colour."
```

### Blue

### Magenta

### Count the numbers

### Bitmap or vector?

### Review: text codes

## Make: copy a picture

```step
stage: make
insight: "Copying a picture pixel by pixel reverses the process: students choose the numbers for each colour from what they see."
try: { playground: board, starter: "pixels.yml#make", height: 520 }
hint: ["Two colours: yellow around the edge and blue in the middle.", "Yellow is red and green full, blue off: 255, 255, 0.", "Blue is 0, 0, 255. Set the brush, then click every pixel that colour."]
check: { type: board, text: "Copy the picture: set each colour with the sliders, then click the pixels to paint them.", when: "m = 1", explain: "12 pixels of 255, 255, 0 and 4 of 0, 0, 255: 48 numbers in all." }
```

Then press Show numbers. How many of your 48 numbers are 255?
