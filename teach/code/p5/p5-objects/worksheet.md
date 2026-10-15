---
title: "Objects and stars"
subtitle: "Drawing and animation with p5.js · Building blocks · Lesson 5"
---

# Objects and stars

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A falling star has a place, a speed and a size. An object keeps them together, so a hundred stars are a hundred objects, not three hundred loose numbers.


:::teacher-note

**In one sentence:** Students keep one star's place and speed in an object, read and change properties with a dot, make a list of objects with push and random, move them with a for-of loop, find a speed missing its star., and add a property and a second list of their own.

**Students should be able to say:** I can make an object with properties and read one with a dot. I can keep many objects in an array and visit each with a for-of loop. I can add my own property to an object.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Work out `star.y` line by line.

```javascript
function setup() {
  let star = { x: 20, y: 30, speed: 2 };
  star.y = star.y + star.speed;
  console.log(star.y);
}
```

:::keep-together

**What does console.log(star.y) show?**

☐ 2

☐ 30

☐ 32

☐ star.y

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 32. star.y starts at 30, then star.y = star.y + star.speed adds 2, so it is 32 when it is printed. console.log writes to the Output box under the sketch.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
```

:::keep-together

### What does each line do?

**Match each line with what it does.**

A. does the code in the braces for each star in turn

B. draws this star where it is now

C. moves this star down by its own speed

D. adds a new star object to the list

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `stars.push({ x: 25, y: 10, speed: 2 });` | |
| `for (let star of stars) {` | |
| `star.y = star.y + star.speed;` | |
| `circle(star.x, star.y, 12);` | |

:::


:::teacher-note

**Answer:** stars.push({ x: 25, y: 10, speed: 2 }); → D. adds a new star object to the list; for (let star of stars) { → A. does the code in the braces for each star in turn; star.y = star.y + star.speed; → C. moves this star down by its own speed; circle(star.x, star.y, 12); → B. draws this star where it is now

:::


:::keep-together

### Their own speeds

**Why does each star fall at its own speed?**

☐ Each star object has its own speed property

☐ All stars share one speed variable

☐ p5 picks a different speed each frame

☐ The loop slows down the later stars

:::


:::teacher-note

**Answer:** Each star object has its own speed property

speed is stored inside each object. star.speed in the loop reads the speed of whichever star the loop is on, so six stars means six speeds.

:::


:::keep-together

### Spot the bug

**This stops with an error: speed is not defined. Click the line that causes it.**

```
 1  let stars = [];
 2  
 3  function setup() {
 4    createCanvas(300, 200);
 5    for (let i = 0; i < 6; i++) {
 6      stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
 7    }
 8  }
 9  
10  function draw() {
11    background(20, 30, 60);
12    fill(255, 210, 0);
13    for (let star of stars) {
14      circle(star.x, star.y, 12);
15      star.y = star.y + speed;
16      if (star.y > 210) {
17        star.y = -10;
18      }
19    }
20  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 15

There is no variable called speed. The speed belongs to the star, so it is star.speed.

:::


:::typical

## Modify


**Twelve stars.** Make **12 stars**, spread across the canvas.

**Their own size.** Give each star its **own size**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Twelve stars:**

```javascript
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 12; i++) {
    stars.push({ x: 15 + i * 24, y: random(200), speed: random(1, 3) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
```

**Their own size:**

```javascript
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3), size: random(6, 18) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, star.size);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
```

:::

:::


## Make: another list

Add a second kind of thing with its own list and its own loop: clouds that drift sideways, snowflakes that wobble, bubbles that rise. Make each object with the properties it needs, push them in `setup()`, and move and draw them with a `for (let ... of ...)` loop in `draw()`. Draw the clouds **before** the stars so the stars are on top.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
let stars = [];
let clouds = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
  }
  for (let i = 0; i < 3; i++) {
    clouds.push({ x: random(300), y: 30 + i * 50, speed: random(0.3, 1) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(200, 200, 220);
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, 60, 20);
    cloud.x = cloud.x + cloud.speed;
    if (cloud.x > 330) {
      cloud.x = -30;
    }
  }
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
```

:::


:::wider

## Where this leads

You can now hold many things, each with its own values. Next: **functions**, so a piece of code has a name and you can use it again.

:::


## Exit ticket

:::keep-together

**What does star.speed mean inside the loop?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The speed property of the star the loop is currently on.

:::

