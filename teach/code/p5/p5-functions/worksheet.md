---
title: "Functions of your own"
subtitle: "Drawing and animation with p5.js · Building blocks · Lesson 6"
---

# Functions of your own

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** One flower took ten lines. A function turns those lines into a single word, so a whole garden is three short lines.


:::teacher-note

**In one sentence:** Students turn ten lines that draw a flower into a function with parameters, call it with different values, find a call whose capitals do not match, draw a garden with a loop, write a function that returns true or false, and make a drawing function of their own.

**Students should be able to say:** I can write a function and call it more than once. I can use parameters to make each call different. I can write a function that returns an answer and use it in an if.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Does the definition draw anything, or only the calls?

```javascript
function drawFlower(x, y) {
  fill(255, 120, 160);
  circle(x - 14, y, 18);
  circle(x + 14, y, 18);
  circle(x, y - 14, 18);
  circle(x, y + 14, 18);
  fill(255, 210, 0);
  circle(x, y, 18);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  drawFlower(80, 100);
  drawFlower(200, 60);
}
```

:::keep-together

**How many flowers does this sketch draw?**

☐ 0

☐ 1

☐ 2

☐ 10

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2. Defining drawFlower draws nothing by itself. setup() calls it twice, once at (80, 100) and once at (200, 60).

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
function drawFlower(x, y, size) {
  fill(255, 120, 160);
  circle(x - size, y, size);
  circle(x + size, y, size);
  circle(x, y - size, size);
  circle(x, y + size, size);
  fill(255, 210, 0);
  circle(x, y, size);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  drawFlower(70, 100, 20);
  drawFlower(180, 60, 12);
  drawFlower(230, 140, 16);
}
```

:::keep-together

### Which part is which?

**Match each piece with what it is.**

A. a call: uses the recipe with these values

B. hands an answer back to the line that called

C. a parameter: it is 20 in the first call and 12 in the second

D. the definition: the recipe, with three parameters

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `function drawFlower(x, y, size) {` | |
| `drawFlower(70, 100, 20);` | |
| `size` | |
| `return n * 2;` | |

:::


:::teacher-note

**Answer:** function drawFlower(x, y, size) { → D. the definition: the recipe, with three parameters; drawFlower(70, 100, 20); → A. a call: uses the recipe with these values; size → C. a parameter: it is 20 in the first call and 12 in the second; return n * 2; → B. hands an answer back to the line that called

:::


:::keep-together

### Values in order

**In the call drawFlower(180, 60, 12), what is y inside the function?**

☐ 60

☐ 12

☐ It has no value

☐ 180

:::


:::teacher-note

**Answer:** 60

The values go to the parameters in order: x is 180, y is 60 and size is 12.

:::


:::keep-together

### Spot the bug

**This stops with an error: drawflower is not defined. Click the line that causes it.**

```
 1  function drawFlower(x, y) {
 2    fill(255, 120, 160);
 3    circle(x - 14, y, 18);
 4    circle(x + 14, y, 18);
 5    fill(255, 210, 0);
 6    circle(x, y, 18);
 7  }
 8  
 9  function setup() {
10    createCanvas(300, 200);
11    background(120, 200, 140);
12    drawflower(80, 100);
13  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

The function is called drawFlower with a capital F. JavaScript treats drawflower as a different, unknown name.

:::


:::typical

## Modify


**A garden.** Use a loop to draw **five flowers** with one call.

**Say hello.** Make the flower say hello when the mouse is near it, using a function of your own that **returns** true or false.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A garden:**

```javascript
function drawFlower(x, y, size) {
  fill(255, 120, 160);
  circle(x - size, y, size);
  circle(x + size, y, size);
  circle(x, y - size, size);
  circle(x, y + size, size);
  fill(255, 210, 0);
  circle(x, y, size);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  for (let i = 0; i < 5; i++) {
    drawFlower(40 + i * 55, 60 + (i % 2) * 70, 14);
  }
}
```

**Say hello:**

```javascript
function drawFlower(x, y, size) {
  fill(255, 120, 160);
  circle(x - size, y, size);
  circle(x + size, y, size);
  circle(x, y - size, size);
  circle(x, y + size, size);
  fill(255, 210, 0);
  circle(x, y, size);
}

function isNear(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2) < 30;
}

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(120, 200, 140);
  drawFlower(150, 100, 16);
  if (isNear(mouseX, mouseY, 150, 100)) {
    fill(255);
    text("Hello!", 120, 30);
  }
}
```

:::

:::


## Make: your own drawing function

Write a function that draws something of your own (a tree, a house, a robot, a face) with at least a position as parameters. Then call it **three times**. The sketch on this page draws trees of different heights.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
function drawTree(x, y, height) {
  fill(120, 80, 50);
  rect(x - 5, y - height, 10, height);
  fill(40, 130, 60);
  circle(x, y - height, height);
}

function setup() {
  createCanvas(300, 200);
  background(150, 210, 255);
  fill(90, 170, 90);
  rect(0, 150, 300, 50);
  drawTree(60, 160, 60);
  drawTree(150, 150, 40);
  drawTree(240, 170, 80);
}
```

:::


:::wider

## Where this leads

You can now name your own code. Next: put lists, objects, decisions and functions together in a game.

:::


## Exit ticket

:::keep-together

**What is the difference between defining a function and calling it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Defining writes the recipe and draws nothing; calling uses it with values and does the work.

:::

