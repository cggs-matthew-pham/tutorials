---
title: "Lists and loops"
subtitle: "Drawing and animation with p5.js · Building blocks · Lesson 4"
---

# Lists and loops

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Ten bars, or a thousand: it is the same few lines of code if the numbers live in a list and a loop does the drawing.


:::teacher-note

**In one sentence:** Students keep numbers in an array, count places from 0, draw a bar for each with a for loop, build the array with push and random, find why bars hang from the top, and make a chart of their own.

**Students should be able to say:** I can keep many values in an array and read one by its place number. I can use a for loop to do something for every value in an array. I can add to an array with push, and use random numbers.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`rect(x, y, width, height)` puts `(x, y)` at the bar's **top left**, and y counts down. Where is the bottom of the first bar?

```javascript
let heights = [50, 120, 80, 150];

function setup() {
  createCanvas(300, 200);
  background(240);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 40 + 20, 200 - heights[i], 30, heights[i]);
  }
}
```

:::keep-together

**What does the sketch draw?**

☐ Four bars standing on the bottom edge, the fourth the tallest

☐ Four bars hanging from the top edge, the first the tallest

☐ Four bars of the same height

☐ One bar, 150 tall

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Four bars standing on the bottom edge, the fourth tallest. Each bar's top is at y = 200 - its height, and it is that tall, so its bottom is at 200: the bottom edge of the canvas. The fourth value, 150, is the biggest.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 10; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 30 + 5, 200 - heights[i], 20, heights[i]);
  }
}
```

:::keep-together

### Follow the loop

**heights is [50, 120, 80, 150]. Fill in what the loop uses each time round.**

{{rows 1}}

| i | heights[i] | the bar's top, 200 - heights[i] |
|---|---|---|
| 0 | 50 | 150 |
| 1 |   |   |
| 2 |   |   |
| 3 |   |   |

:::


:::teacher-note

**Answer:** 120, 80, 80, 120, 150, 50

i counts 0, 1, 2, 3. Each time round, heights[i] is the value at that place, and the bar's top is 200 minus it: the taller the bar, the higher up its top.

:::


:::keep-together

### The last place

**The array has 10 values. What is the last place number?**

☐ 1

☐ 9

☐ 10

☐ 11

:::


:::teacher-note

**Answer:** 9

Places count from 0, so ten values are places 0 to 9. The loop stops when i is not less than 10, so it never uses place 10.

:::


:::keep-together

### Spot the bug

**The bars hang from the top of the canvas instead of standing on the bottom. Click the line that is wrong.**

```
 1  let heights = [];
 2  
 3  function setup() {
 4    createCanvas(300, 200);
 5    for (let i = 0; i < 10; i++) {
 6      heights.push(random(20, 180));
 7    }
 8  }
 9  
10  function draw() {
11    background(20, 30, 60);
12    fill(255, 210, 0);
13    for (let i = 0; i < heights.length; i++) {
14      rect(i * 30 + 5, heights[i], 20, heights[i]);
15    }
16  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 14

rect's y is the bar's top edge, and y counts down. y = heights[i] puts the top at that depth. For a bar standing on the bottom, the top is at 200 - heights[i].

:::


:::typical

## Modify


**Twenty bars.** Draw **20 bars** instead of 10, so they all still fit on the canvas.

**Tall and short.** Colour the **tall bars** (over 100) differently from the short ones.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Twenty bars:**

```javascript
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 20; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 15 + 2, 200 - heights[i], 10, heights[i]);
  }
}
```

**Tall and short:**

```javascript
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 10; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > 100) {
      fill(255, 120, 160);
    } else {
      fill(255, 210, 0);
    }
    rect(i * 30 + 5, 200 - heights[i], 20, heights[i]);
  }
}
```

:::

:::


## Make: your own chart

Draw a **chart of your own** from a list of numbers: hours of sleep each night this week, scores, or random bubbles. Fill the array with the numbers you choose (`let values = [3, 5, 2];`) or with `push`, then use a loop to draw one thing for each value. Circles, bars, lines and coloured squares all work.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
let sleep = [7, 6, 8, 5, 9, 10, 8];

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(120, 220, 255);
  for (let i = 0; i < sleep.length; i++) {
    circle(30 + i * 40, 190 - sleep[i] * 15, sleep[i] * 5);
  }
  fill(255);
  text("Hours of sleep, Monday to Sunday", 10, 20);
}
```

:::


:::wider

## Where this leads

An array holds many values, and a loop does something for each. Next: an **object** holds everything about one thing, so a list of objects is a list of stars, balls or bars.

:::


## Exit ticket

:::keep-together

**In heights[i], what is i, and where does it start?**

{{lines-3}}

:::


:::teacher-note

**Answer:** i is the place number of the value in the array, and the first place is 0.

:::

