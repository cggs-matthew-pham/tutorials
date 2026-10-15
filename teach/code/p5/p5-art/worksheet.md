---
title: "Moving art"
subtitle: "Drawing and animation with p5.js · Final challenge: Catch the circle · Lesson 8"
---

# Moving art

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A few lines of maths can make a spinning ring of colour, with no pictures drawn by hand.


:::teacher-note

**In one sentence:** Students place circles on a ring with sin and cos, make the ring turn with frameCount, colour it with map, add trails and a spiral, and make a moving pattern of their own.

**Students should be able to say:** I can use sin and cos to place things on a circle. I can use map to turn one range of numbers into another. I can make a moving pattern from a loop.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Twelve angles of 30 degrees make a full turn.

```javascript
function setup() {
  createCanvas(300, 300);
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = i * 30;
    circle(150 + cos(radians(angle)) * 100, 150 + sin(radians(angle)) * 100, 20);
  }
}
```

:::keep-together

**What shape do the 12 circles make?**

☐ One circle in the middle

☐ A straight row

☐ A ring of 12 circles

☐ A zigzag

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A ring. Each circle is placed at 100 pixels from the middle (150, 150), at an angle 30 degrees further round than the last.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
```

:::keep-together

### What makes it turn?

**What makes the ring turn?**

☐ background clears the canvas

☐ frameCount grows every frame, so every angle grows

☐ i changes every frame

☐ map changes the colours

:::


:::teacher-note

**Answer:** frameCount grows every frame, so every angle grows

angle = frameCount * 0.02 + i * 0.5. i never changes inside one frame, but frameCount goes up by 1 each frame.

:::


:::keep-together

### Which piece does what?

**Match each piece with what it does.**

A. turns i from 0 to 11 into a number from 255 down to 120

B. an angle that grows a little every frame

C. moves the middle of the ring to the middle of the canvas

D. how far right or left of the middle, up to 100

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `cos(angle) * 100` | |
| `150 + ...` | |
| `map(i, 0, 11, 255, 120)` | |
| `frameCount * 0.02` | |

:::


:::teacher-note

**Answer:** cos(angle) * 100 → D. how far right or left of the middle, up to 100; 150 + ... → C. moves the middle of the ring to the middle of the canvas; map(i, 0, 11, 255, 120) → A. turns i from 0 to 11 into a number from 255 down to 120; frameCount * 0.02 → B. an angle that grows a little every frame

:::


:::typical

## Modify


**Trails.** Leave **trails** behind the circles.

**A spiral.** Spread the circles into a **spiral**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Trails:**

```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60, 30);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
```

**A spiral:**

```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 24; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let radius = 10 + i * 5;
    let x = 150 + cos(angle) * radius;
    let y = 150 + sin(angle) * radius;
    fill(map(i, 0, 23, 255, 120), map(i, 0, 23, 120, 220), 200);
    circle(x, y, 12);
  }
}
```

:::

:::


## Make: your own pattern

Make a moving pattern of your own: a wave, a spiral, a spinning flower. Use a loop, `sin` or `cos`, and `map` to change a colour or size. The sketch on this page is one wave.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 20; i++) {
    let x = map(i, 0, 19, 20, 280);
    let y = 150 + sin(frameCount * 0.05 + i * 0.5) * 80;
    fill(255, map(i, 0, 19, 100, 220), map(i, 0, 19, 200, 100));
    circle(x, y, 14 + sin(frameCount * 0.1 + i) * 6);
  }
}
```

:::


:::wider

## Where this leads

Maths makes motion smooth. Artists use the same ideas for waves, orbits and growing plants.

:::


## Exit ticket

:::keep-together

**What does map(i, 0, 11, 255, 120) do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It turns i from the range 0 to 11 into a number from 255 down to 120.

:::

