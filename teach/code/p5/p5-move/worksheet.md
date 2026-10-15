---
title: "Making it move"
subtitle: "Drawing and animation with p5.js · Shapes and movement · Lesson 2"
---

# Making it move

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** An animation is a picture redrawn very quickly, a tiny bit different each time. p5 does the redrawing for you.


:::teacher-note

**In one sentence:** Students meet draw() (about 60 times a second) and variables that keep their value between frames, follow a circle's x frame by frame, see why background belongs in draw, fix a variable made inside draw, then move things down and at different speeds.

**Students should be able to say:** I can use a variable to make a shape move. I can explain what setup() and draw() do, and when each runs. I can make two things move at different speeds.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

You never call `draw()`. Who does, and how often?

```javascript
let x = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  circle(x, 100, 40);
  x = x + 2;
}
```

:::keep-together

**What does the circle do?**

☐ Nothing is drawn

☐ Slides to the right and off the edge of the canvas

☐ Jumps once to x = 2 and stops

☐ Stays in one place

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It slides right. draw() runs about 60 times a second and each time x goes up by 2, so the circle moves 120 pixels every second. Nothing sends it back, so it slides off the edge.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
let x = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(x, 100, 40);
  fill(255);
  text(x, 10, 20);
  x = x + 2;
}
```

:::keep-together

### Frame by frame

**x starts at 0. Fill in where the circle is drawn, and what x is after each frame.**

{{rows 1}}

| frame | circle drawn at x | x after the frame |
|---|---|---|
| 1 | 0 | 2 |
| 2 |   |   |
| 3 |   |   |
| 4 |   |   |

:::


:::teacher-note

**Answer:** 2, 4, 4, 6, 6, 8

Each frame draws the circle with the current x, then adds 2. So the circle is drawn at 0, 2, 4, 6, and x is already 2 bigger when the next frame starts.

:::


:::keep-together

### The smear

**What would happen if background(20, 30, 60) was removed from draw()?**

☐ The sketch would stop with an error

☐ The circle would stop moving

☐ The circle would move twice as fast

☐ Every old circle would stay, leaving a thick smear

:::


:::teacher-note

**Answer:** Every old circle would stay, leaving a thick smear

Without background, nothing paints over the previous frame, so each frame's circle is added to the picture. That is how trails are made on purpose.

:::


:::keep-together

### Spot the bug

**The circle never moves, however long you wait. Click the line that is wrong.**

```
 1  function setup() {
 2    createCanvas(300, 200);
 3  }
 4  
 5  function draw() {
 6    let x = 0;
 7    background(20, 30, 60);
 8    circle(x, 100, 40);
 9    x = x + 2;
10  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

let x = 0 inside draw() makes a new x, set to 0, every frame. The change of 2 is thrown away each time. Make x once, above the functions.

:::


:::typical

## Modify


**Down, not across.** Make the circle fall **down** the canvas instead of sliding across.

**Two circles.** Add a **second circle** that moves at a different speed.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Down, not across:**

```javascript
let y = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(150, y, 40);
  fill(255);
  text(y, 10, 20);
  y = y + 2;
}
```

**Two circles:**

```javascript
let x = 0;
let y = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(x, 60, 40);
  fill(255, 120, 160);
  circle(300 - y, 140, 30);
  x = x + 2;
  y = y + 4;
}
```

:::

:::


## Make: two things that move

Make at least **two things move in different ways**: one faster than the other, one going the other direction, one growing. The sketch gives you `t`, a number that goes up by 1 every frame. `circle(t, ...)` slides, `circle(300 - t, ...)` slides the other way, and `circle(150, 100, t)` grows. A `%` operator is the remainder: `t % 300` goes from 0 up to 299, then starts again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
let t = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  t = t + 1;
  fill(255, 210, 0);
  circle(t % 300, 60, 30);
  fill(255, 120, 160);
  circle(300 - (t % 300), 140, 30);
  fill(255);
  text(t, 10, 20);
}
```

:::


:::wider

## Where this leads

You have a loop that runs 60 times a second and numbers that change. Next: make the sketch **decide**, so a circle can bounce.

:::


## Exit ticket

:::keep-together

**Why is let x = 0; at the top and not inside draw()?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Inside draw() it would be made again every frame and go back to 0; at the top it keeps its value.

:::

