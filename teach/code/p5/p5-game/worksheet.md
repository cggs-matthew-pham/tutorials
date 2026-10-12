---
title: "Final challenge: Catch the circle"
subtitle: "Drawing and animation with p5.js · Final challenge: Catch the circle · Lesson 7"
---

# Final challenge: Catch the circle

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Everything you have learned in one game: a list of objects, a loop, a function, a decision, and a click.


:::teacher-note

**In one sentence:** Students play a click-to-catch game, learn that mousePressed runs on its own and that touching means a small distance, fix a catch that scores for every miss, add lives with a game over and a restart key, and make a power-up ball.

**Students should be able to say:** I can make a game with a score that changes when the player clicks. I can use dist to tell when two things touch. I can add lives and a game over to a game.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`dist` gives the straight distance between two points.

```javascript
function setup() {
  console.log(dist(10, 10, 13, 14));
}
```

:::keep-together

**What does console.log(dist(10, 10, 13, 14)) show?**

☐ 3

☐ 4

☐ 5

☐ 7

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5. The two points are 3 apart across and 4 apart down, and the straight-line distance is 5.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```javascript
let balls = [];
let score = 0;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let ball of balls) {
    circle(ball.x, ball.y, 24);
    ball.y = ball.y + ball.speed;
    if (ball.y > 210) {
      restart(ball);
    }
  }
  fill(255);
  text("Score: " + score, 10, 20);
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}
```

:::keep-together

### Which part does what?

**Match each piece with what it does.**

A. the click is within 20 pixels of this ball

B. joins the words and the number into one piece of text

C. sends this ball back to the top at a new x

D. p5 runs it each time the mouse is clicked

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `mousePressed()` | |
| `dist(mouseX, mouseY, ball.x, ball.y) < 20` | |
| `restart(ball);` | |
| `"Score: " + score` | |

:::


:::teacher-note

**Answer:** mousePressed() → D. p5 runs it each time the mouse is clicked; dist(mouseX, mouseY, ball.x, ball.y) &lt; 20 → A. the click is within 20 pixels of this ball; restart(ball); → C. sends this ball back to the top at a new x; "Score: " + score → B. joins the words and the number into one piece of text

:::


:::keep-together

### When does the score go up?

**Where does the score go up?**

☐ Inside restart()

☐ Inside setup()

☐ Inside mousePressed, in the if that checks the click is close

☐ Every frame in draw()

:::


:::teacher-note

**Answer:** Inside mousePressed, in the if that checks the click is close

The score should change when a catch happens, once. mousePressed runs once per click, so the if inside it decides whether the click was a catch.

:::


:::keep-together

### Spot the bug

**In this game every click that misses scores. Click the line that is wrong.**

```
 1  function mousePressed() {
 2    for (let ball of balls) {
 3      if (dist(mouseX, mouseY, ball.x, ball.y) > 20) {
 4        score = score + 1;
 5        restart(ball);
 6      }
 7    }
 8  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

The condition is true when the click is more than 20 away. A catch is when it is less than 20 away: dist(...) &lt; 20.

:::


:::typical

## Modify


**Lives.** Give the player **3 lives** and a GAME OVER screen. Start from the game above.

**Play again.** Press **R** after GAME OVER to start again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Lives:**

```javascript
let balls = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  if (lives > 0) {
    fill(255, 210, 0);
    for (let ball of balls) {
      circle(ball.x, ball.y, 24);
      ball.y = ball.y + ball.speed;
      if (ball.y > 210) {
        lives = lives - 1;
        restart(ball);
      }
    }
    fill(255);
    text("Score: " + score + "   Lives: " + lives, 10, 20);
  } else {
    fill(255, 100, 100);
    textSize(24);
    text("GAME OVER", 80, 100);
    textSize(12);
    fill(255);
    text("Score: " + score, 120, 125);
  }
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}
```

**Play again:**

```javascript
let balls = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  if (lives > 0) {
    fill(255, 210, 0);
    for (let ball of balls) {
      circle(ball.x, ball.y, 24);
      ball.y = ball.y + ball.speed;
      if (ball.y > 210) {
        lives = lives - 1;
        restart(ball);
      }
    }
    fill(255);
    text("Score: " + score + "   Lives: " + lives, 10, 20);
  } else {
    fill(255, 100, 100);
    textSize(24);
    text("GAME OVER", 80, 100);
    textSize(12);
    fill(255);
    text("Score: " + score + "   Press R to play again", 60, 125);
  }
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}

function keyPressed() {
  if (key === "r" && lives === 0) {
    score = 0;
    lives = 3;
  }
}
```

:::

:::


## Make: a power-up

Add a **power-up**: a different kind of ball (fast, small, gold) that is worth more points. Give it a property such as `gold: true`, draw it in its own colour, and score more when it is clicked. Finish by asking a friend to play it and change one thing because of what you saw.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```javascript
let balls = [];
let score = 0;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5), gold: false });
  }
  balls.push({ x: 150, y: -50, speed: 3.5, gold: true });
}

function draw() {
  background(20, 30, 60);
  for (let ball of balls) {
    if (ball.gold) {
      fill(255, 255, 255);
    } else {
      fill(255, 210, 0);
    }
    circle(ball.x, ball.y, 24);
    ball.y = ball.y + ball.speed;
    if (ball.y > 210) {
      restart(ball);
    }
  }
  fill(255);
  text("Score: " + score, 10, 20);
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      if (ball.gold) {
        score = score + 5;
      } else {
        score = score + 1;
      }
      restart(ball);
    }
  }
}
```

:::


:::wider

## Where this leads

You have built a game from lists, objects, decisions, functions and events. That is a real programme: games bigger than this are the same pieces in more places.

:::


## Exit ticket

:::keep-together

**Why is the catch test dist(...) &lt; 20 and not &gt; 20?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Two things touch when the distance between them is small.

:::

