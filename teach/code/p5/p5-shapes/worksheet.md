---
title: "Shapes on a canvas"
subtitle: "Drawing and animation with p5.js · Shapes and movement · Lesson 1"
---

# Shapes on a canvas

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every picture on a screen is shapes at places. In p5.js you say which shape, where, and what colour.


:::teacher-note

**In one sentence:** Students meet p5.js on its own playground, draw circles, rectangles, triangles and lines on a canvas, learn that (0, 0) is the top left and y counts down, fix a fill that comes after its shape, and draw a picture of their own.

**Students should be able to say:** I can draw shapes at places on a canvas with p5.js. I can say where (0, 0) is and which way y counts. I can colour shapes with fill, and know it affects shapes drawn after it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`createCanvas(300, 200)` makes a canvas 300 wide and 200 tall. Which corner is `(0, 0)`?

```javascript
function setup() {
  createCanvas(300, 200);
  background(240);
  fill(255, 200, 0);
  circle(150, 100, 80);
  rect(20, 20, 60, 40);
}
```

:::keep-together

**Where does the rectangle, rect(20, 20, 60, 40), appear?**

☐ Near the top-left corner

☐ Near the bottom-left corner

☐ In the middle, behind the circle

☐ Off the canvas

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Near the top-left corner. The first two numbers of rect are its top-left corner: 20 across and 20 down from (0, 0), which is the canvas's top left. The 60 and 40 are its width and height.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  noStroke();
  fill(255, 210, 0);
  circle(150, 100, 80);
  fill(255, 120, 160);
  rect(20, 20, 60, 40);
  fill(120, 220, 255);
  triangle(220, 160, 260, 90, 290, 160);
  stroke(255);
  line(0, 190, 300, 190);
}
```

:::keep-together

### Match the lines

**Match each line with what it does.**

A. sets the colour for the shapes drawn next

B. draws a line from one point to another

C. draws a circle, middle 150 across and 100 down, 80 wide

D. makes a canvas 300 wide and 200 tall

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `createCanvas(300, 200);` | |
| `fill(255, 120, 160);` | |
| `circle(150, 100, 80);` | |
| `line(0, 190, 300, 190);` | |

:::


:::teacher-note

**Answer:** createCanvas(300, 200); → D. makes a canvas 300 wide and 200 tall; fill(255, 120, 160); → A. sets the colour for the shapes drawn next; circle(150, 100, 80); → C. draws a circle, middle 150 across and 100 down, 80 wide; line(0, 190, 300, 190); → B. draws a line from one point to another

:::


:::keep-together

### Up the canvas

**To move the circle UP the canvas, what do you change?**

☐ Make the width smaller

☐ Make x smaller

☐ Make y bigger (100 becomes 160)

☐ Make y smaller (100 becomes 40)

:::


:::teacher-note

**Answer:** Make y smaller (100 becomes 40)

y counts down from the top, so a smaller y is higher up. Making x smaller moves the circle left.

:::


:::keep-together

### Spot the bug

**This should draw a gold circle, but it is white. Click the line that is in the wrong place.**

```
 1  function setup() {
 2    createCanvas(300, 200);
 3    background(20, 30, 60);
 4    circle(150, 100, 80);
 5    fill(255, 210, 0);
 6  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

fill only colours the shapes drawn after it. The circle is drawn on line 4, before the fill on line 5, so the fill changes nothing. Put fill(...) above circle(...).

:::


:::typical

## Modify


**Corner.** Move the big circle to the **bottom-right** corner of the canvas.

**An oval.** Add an **oval** (ellipse) to the picture.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Corner:**

```javascript
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  noStroke();
  fill(255, 210, 0);
  circle(250, 160, 80);
  fill(255, 120, 160);
  rect(20, 20, 60, 40);
  fill(120, 220, 255);
  triangle(220, 160, 260, 90, 290, 160);
  stroke(255);
  line(0, 190, 300, 190);
}
```

**An oval:**

```javascript
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  noStroke();
  fill(255, 210, 0);
  circle(150, 100, 80);
  fill(255, 120, 160);
  ellipse(60, 40, 90, 40);
  fill(120, 220, 255);
  triangle(220, 160, 260, 90, 290, 160);
  stroke(255);
  line(0, 190, 300, 190);
}
```

:::

:::


## Make: a picture of your own

Draw a picture of your own: a house, a face, a robot, a flag, a rocket. Use at least **5 shapes** and **3 colours**. Shapes are drawn in order, so draw the sky first and the sun after it. Other commands to try: `noStroke()` (no outlines), `stroke(r, g, b)` and `strokeWeight(4)` (outline colour and thickness), `triangle(x1, y1, x2, y2, x3, y3)`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
function setup() {
  createCanvas(300, 200);
  background(120, 200, 255);
  noStroke();
  fill(90, 170, 90);
  rect(0, 150, 300, 50);
  fill(240, 220, 180);
  rect(90, 80, 120, 80);
  fill(180, 70, 60);
  triangle(80, 80, 150, 30, 220, 80);
  fill(120, 80, 50);
  rect(135, 110, 30, 50);
  fill(255, 210, 0);
  circle(260, 40, 50);
}
```

:::


:::wider

## Where this leads

Everything you draw is numbers: where, how big and what colour. Next lesson: change those numbers while the sketch runs, so things move.

:::


## Exit ticket

:::keep-together

**Which corner is (0, 0), and which way does y count?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The top left; y counts downward.

:::

