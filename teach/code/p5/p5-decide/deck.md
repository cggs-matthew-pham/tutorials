---
marp: true
theme: default
html: true
---

# Deciding what to do

Drawing and animation with p5.js · Shapes and movement

<!-- Speaker note: Students use if and else to bounce a circle off the edges and change its colour, learn the difference between = (set) and === (ask), use mouseX in a condition, and build a bouncing ball with a paddle that follows the mouse. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). -->

---

## Today

**We are learning to** use if and else to bounce a circle off the edges, change its colour, and follow the mouse.

- I can use if and else to change what happens in a sketch.
- I can compare values with &gt;, &lt; and ===, and join questions with || and &amp;&amp;.
- I can make a shape bounce and follow the mouse.

<!-- Speaker note: Before class: Read the unit primer first. This lesson revisits the turtle course's decisions lesson in JavaScript: the same idea, new spellings (`if (x > 300) { ... }` with brackets and braces; `||` and `&&` for or and and). The hard part is `=` versus `===`: one sets, three asks. The bug task is that slip. `speed = -speed` turns a direction round and is the engine of every bounce. Students often write `x === 300` for the edge, which can be jumped over by a step bigger than 1; the lesson suggests `>` and `<`. The Make step is a small Pong: the paddle's collision check is the hardest line, so offer the finished `sol-make` idea only after students have tried the first three parts. -->

---

## Why it matters

> Games are full of questions asked 60 times a second: has the ball hit the wall? Is the mouse on the button?

<!-- Speaker note: An **`if`** runs some code only when a question is true: ```js if (x > 300) { speed = -speed; } ``` The question goes in `( )`, and the code that runs goes in `{ }`. `else` is the code for when the answer is no. The questions compare things: `>` bigger than, `<` smaller than, `===` equal to. Two more join questions: `||` means **or** and `&&` means **and**. **The hard part:** one `=` **sets** a variable (`x = 300` makes `x` 300). Three `===` **asks** whether two things are equal. Mixing them up is the most common slip in this lesson. p5 also keeps the mouse for you: `mouseX` and `mouseY` are always where the pointer is on the canvas. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does the circle do when it reaches the right edge, x &gt; 300?**

- It turns round and moves left, and keeps going left past the other edge
- It bounces back and forth between the edges for ever
- It stops at the edge
- It slides off the canvas, as before

<!-- Speaker note: What happens: It turns round and moves left, and keeps going. speed becomes -3, so x goes down, but nothing checks the left edge, so it slides off the left side. That needs a second check. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the canvas and the path of the circle on the board with the right edge crossed. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It turns round and moves left, and keeps going. speed becomes -3, so x goes down, but nothing checks the left edge, so it slides off the left side. That needs a second check.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-decide/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-decide/?full=step-2#step-2)

<!-- Speaker note: This one checks both edges with `||`, and uses `if` and `else` to change the colour. Change `speed = 3` to a different number and run it again. Students should be able to say: I can see the circle bounce at both edges, and change colour as it turns. -->

<!-- Speaker note: Teacher: ask what else changes when the circle turns round (the colour). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: An if asks a question every frame; speed = -speed flips the direction, and one = sets while === compares. -->

<!-- Speaker note: Teacher: for the bug, ask which line SETS a number and which line ASKS about one. -->

<style scoped>pre, marp-pre { font-size: 0.51em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does it mean?

**Match each piece of code with what it means.**

| | |
|---|---|
| `x > 300 || x < 0` | A. turn round: the opposite direction |
| `speed = -speed;` | B. move by the speed, which can be negative |
| `if (speed > 0) { ... } else { ... }` | C. one colour when moving right, another when not |
| `x = x + speed;` | D. x is past the right edge or past the left edge |

* Answer: x &gt; 300 || x &lt; 0 → D. x is past the right edge or past the left edge; speed = -speed; → A. turn round: the opposite direction; if (speed &gt; 0) { ... } else { ... } → C. one colour when moving right, another when not; x = x + speed; → B. move by the speed, which can be negative

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Turning round

**Why does the circle turn round when speed = -speed runs?**

- 3 becomes -3, so x goes down instead of up
- The circle is deleted and made again
- p5 flips the canvas
- speed becomes zero

* Answer: 3 becomes -3, so x goes down instead of up

<!-- Speaker note: A negative speed is added to x, so x gets smaller and the circle moves left. Running speed = -speed again makes it positive and it moves right. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 12

<!-- Speaker note: if (x = 300) sets x to 300, rather than asking whether it is. To ask, use three equals: x === 300. Comparing with > is often better for movement, because a step can jump over an exact number. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Mouse colour:** Colour the circle by where the **mouse** is: one colour on the left half of the canvas, another on the right.
- **All four edges:** Make the circle **move up and down** as well, and bounce off the top and the bottom.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-decide/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A condition can be about the mouse as well as the circle; two variables of speed let a shape bounce in both directions. Hints, in order: Replace the colour question with one about the mouse: is mouseX bigger than 150? / if (mouseX > 150) { fill(255, 120, 160); } else { fill(120, 220, 255); } / Move up and down needs its own variables, like x and speed. / Make y and dy, add dy to y each frame, and turn dy round at the top and the bottom. For students who need more support: Give students the wall checks written and ask only for the paddle. For early finishers: Add a score that goes up on each paddle hit, and make the ball a little faster each time. The hard part, on purpose: = versus === in an if, and the long condition for the paddle. Read conditions aloud in words before typing them. When students get stuck: The circle sticks at an edge or jumps. Ask: Is the if using one = or three ===? Fix: Use > or < to ask about the edge. A single = sets the variable. / A red line: Unexpected token. Ask: Does each if have its ( ) and its { }, and does each { have a }? Fix: Count the brackets and braces on the line the hint names. / The ball passes through the paddle. Ask: Is the check on the ball's x and its y, and is dy turned round? Fix: Check ballY is near the paddle's row and ballX is between its edges, then dy = -dy. / Nothing happens when the mouse moves. Ask: Did you click the sketch first, and is mouseX used in draw()? Fix: mouseX only changes while the pointer is over the canvas. -->

<!-- Speaker note: Teacher: each student tests with the mouse on both halves before ticking. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: bounce and catch

Make a mini bouncing game. The sketch gives you a ball that moves. Add: bounces off the **left, right and top** walls; a **paddle** along the bottom that follows `mouseX`; and the ball bouncing off the paddle. When the ball falls past the bottom, put it back at the top.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-decide/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a ball bounces off three walls, and a paddle that follows the mouse sends it back. -->

<!-- Speaker note: Teacher: build in four steps: walls, paddle, bounce off paddle, reset at the bottom. -->

---

## Where this leads

Decisions are what turn drawing into a game. Next: lists and loops, so one piece of code can handle a whole row of things.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between = and === ?**

* One = sets a variable to a value; three === asks whether two values are equal.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: lists and loops, so one piece of code handles many things. -->
