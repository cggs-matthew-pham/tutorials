---
title: "Deciding what to do"
subtitle: "Drawing and animation with p5.js · Shapes and movement · Lesson 3"
---

# Deciding what to do

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Games are full of questions asked 60 times a second: has the ball hit the wall? Is the mouse on the button?


:::teacher-note

**In one sentence:** Students use if and else to bounce a circle off the edges and change its colour, learn the difference between = (set) and === (ask), use mouseX in a condition, and build a bouncing ball with a paddle that follows the mouse.

**Students should be able to say:** I can use if and else to change what happens in a sketch. I can compare values with &gt;, &lt; and ===, and join questions with || and &amp;&amp;. I can make a shape bounce and follow the mouse.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Only the right edge is checked. What happens at the left edge?

```javascript
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  circle(x, 100, 40);
  x = x + speed;
  if (x > 300) {
    speed = -speed;
  }
}
```

:::keep-together

**What does the circle do when it reaches the right edge, x &gt; 300?**

☐ It turns round and moves left, and keeps going left past the other edge

☐ It bounces back and forth between the edges for ever

☐ It stops at the edge

☐ It slides off the canvas, as before

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It turns round and moves left, and keeps going. speed becomes -3, so x goes down, but nothing checks the left edge, so it slides off the left side. That needs a second check.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  if (speed > 0) {
    fill(255, 210, 0);
  } else {
    fill(120, 220, 255);
  }
  circle(x, 100, 40);
  x = x + speed;
  if (x > 300 || x < 0) {
    speed = -speed;
  }
}
```

:::keep-together

### What does it mean?

**Match each piece of code with what it means.**

A. turn round: the opposite direction

B. move by the speed, which can be negative

C. one colour when moving right, another when not

D. x is past the right edge or past the left edge

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `x > 300 || x < 0` | |
| `speed = -speed;` | |
| `if (speed > 0) { ... } else { ... }` | |
| `x = x + speed;` | |

:::


:::teacher-note

**Answer:** x &gt; 300 || x &lt; 0 → D. x is past the right edge or past the left edge; speed = -speed; → A. turn round: the opposite direction; if (speed &gt; 0) { ... } else { ... } → C. one colour when moving right, another when not; x = x + speed; → B. move by the speed, which can be negative

:::


:::keep-together

### Turning round

**Why does the circle turn round when speed = -speed runs?**

☐ 3 becomes -3, so x goes down instead of up

☐ The circle is deleted and made again

☐ p5 flips the canvas

☐ speed becomes zero

:::


:::teacher-note

**Answer:** 3 becomes -3, so x goes down instead of up

A negative speed is added to x, so x gets smaller and the circle moves left. Running speed = -speed again makes it positive and it moves right.

:::


:::keep-together

### Spot the bug

**The circle jumps to x = 300 and acts strangely at the edge. Click the line that is wrong.**

```
 1  let x = 150;
 2  let speed = 3;
 3  
 4  function setup() {
 5    createCanvas(300, 200);
 6  }
 7  
 8  function draw() {
 9    background(20, 30, 60);
10    circle(x, 100, 40);
11    x = x + speed;
12    if (x = 300) {
13      speed = -speed;
14    }
15  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

if (x = 300) sets x to 300, rather than asking whether it is. To ask, use three equals: x === 300. Comparing with &gt; is often better for movement, because a step can jump over an exact number.

:::


:::typical

## Modify


**Mouse colour.** Colour the circle by where the **mouse** is: one colour on the left half of the canvas, another on the right.

**All four edges.** Make the circle **move up and down** as well, and bounce off the top and the bottom.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Mouse colour:**

```javascript
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  if (mouseX > 150) {
    fill(255, 120, 160);
  } else {
    fill(120, 220, 255);
  }
  circle(x, 100, 40);
  x = x + speed;
  if (x > 300 || x < 0) {
    speed = -speed;
  }
}
```

**All four edges:**

```javascript
let x = 150;
let y = 100;
let dx = 3;
let dy = 2;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(x, y, 40);
  x = x + dx;
  y = y + dy;
  if (x > 300 || x < 0) {
    dx = -dx;
  }
  if (y > 200 || y < 0) {
    dy = -dy;
  }
}
```

:::

:::


## Make: bounce and catch

Make a mini bouncing game. The sketch gives you a ball that moves. Add: bounces off the **left, right and top** walls; a **paddle** along the bottom that follows `mouseX`; and the ball bouncing off the paddle. When the ball falls past the bottom, put it back at the top.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
let ballX = 150;
let ballY = 60;
let dx = 3;
let dy = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(ballX, ballY, 20);
  fill(120, 220, 255);
  rect(mouseX - 30, 185, 60, 8);
  ballX = ballX + dx;
  ballY = ballY + dy;
  if (ballX > 300 || ballX < 0) {
    dx = -dx;
  }
  if (ballY < 0) {
    dy = -dy;
  }
  if (ballY > 175 && dy > 0 && ballX > mouseX - 30 && ballX < mouseX + 30) {
    dy = -dy;
  }
  if (ballY > 200) {
    ballY = 0;
  }
}
```

:::


:::wider

## Where this leads

Decisions are what turn drawing into a game. Next: lists and loops, so one piece of code can handle a whole row of things.

:::


## Exit ticket

:::keep-together

**What is the difference between = and === ?**

{{lines-3}}

:::


:::teacher-note

**Answer:** One = sets a variable to a value; three === asks whether two values are equal.

:::

