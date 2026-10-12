---
marp: true
theme: default
html: true
---

# Making it move

Drawing and animation with p5.js · Shapes and movement

<!-- Speaker note: Students meet draw() (about 60 times a second) and variables that keep their value between frames, follow a circle's x frame by frame, see why background belongs in draw, fix a variable made inside draw, then move things down and at different speeds. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). -->

---

## Today

**We are learning to** p5 calls draw() about 60 times a second. A variable that changes a little each time makes a shape move.

- I can use a variable to make a shape move.
- I can explain what setup() and draw() do, and when each runs.
- I can make two things move at different speeds.

<!-- Speaker note: Before class: Read the unit primer first. The big idea is that `draw()` runs by itself, again and again; students never call it. A variable made at the top (outside functions) keeps its value between frames, and `x = x + 2` reads as "make x two bigger", not as a maths equation. Students who did Python Foundations will recognise `x = x + 1` from the variables lesson; the new part is that the loop is built in. The `let` in the bug task is the classic mistake: a variable made inside draw() starts again every frame. `%` (remainder) appears only in the Make step's text. The playground's number in the corner is `text(x, 10, 20)`. -->

---

## Why it matters

> An animation is a picture redrawn very quickly, a tiny bit different each time. p5 does the redrawing for you.

<!-- Speaker note: Last lesson's sketch drew once. `function draw() { ... }` is different: p5 runs it **again and again, about 60 times a second**, for as long as the sketch runs. Each pass is a **frame**. Two parts make movement: - A **variable** keeps a number between frames: `let x = 0;` makes one called `x`. It goes at the top of the sketch, **outside** every function, so every frame can see it. - Each frame, `draw()` changes it a little and draws with it: `x = x + 2;` means "make `x` two bigger". `background(...)` at the start of `draw()` paints over the last frame, so only the newest picture shows. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does the circle do?**

- Nothing is drawn
- Slides to the right and off the edge of the canvas
- Jumps once to x = 2 and stops
- Stays in one place

<!-- Speaker note: What happens: It slides right. draw() runs about 60 times a second and each time x goes up by 2, so the circle moves 120 pixels every second. Nothing sends it back, so it slides off the edge. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask a student to act as p5, saying 'frame' and stepping a classmate two steps right each time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It slides right. draw() runs about 60 times a second and each time x goes up by 2, so the circle moves 120 pixels every second. Nothing sends it back, so it slides off the edge.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-move/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-move/?full=step-2#step-2)

<!-- Speaker note: The number in the corner is `x`. Press **Run again** to start from the beginning. Change `x + 2` to `x + 5`, then run it again. Students should be able to say: I can see x going up in the corner, and the circle moving with it. -->

<!-- Speaker note: Teacher: change the 2 to a 5 and ask why it is faster. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: draw() repeats; a variable made outside it keeps its value from frame to frame, and each frame changes it a little. -->

<!-- Speaker note: Teacher: fill the trace together before students do: x is drawn first, then changed. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Frame by frame

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**x starts at 0. Fill in where the circle is drawn, and what x is after each frame.**

| frame | circle drawn at x | x after the frame |
|---|---|---|
| 1 | 0 | 2 |
| 2 | ? | ? |
| 3 | ? | ? |
| 4 | ? | ? |

* Answer: 2, 4, 4, 6, 6, 8

</div>
</div>

<!-- Speaker note: Each frame draws the circle with the current x, then adds 2. So the circle is drawn at 0, 2, 4, 6, and x is already 2 bigger when the next frame starts. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The smear

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**What would happen if background(20, 30, 60) was removed from draw()?**

- The sketch would stop with an error
- The circle would stop moving
- The circle would move twice as fast
- Every old circle would stay, leaving a thick smear

* Answer: Every old circle would stay, leaving a thick smear

</div>
</div>

<!-- Speaker note: Without background, nothing paints over the previous frame, so each frame's circle is added to the picture. That is how trails are made on purpose. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 6

<!-- Speaker note: let x = 0 inside draw() makes a new x, set to 0, every frame. The change of 2 is thrown away each time. Make x once, above the functions. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Down, not across:** Make the circle fall **down** the canvas instead of sliding across.
- **Two circles:** Add a **second circle** that moves at a different speed.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-move/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A second variable gives a second thing its own movement; changing a number changes the speed or direction. Hints, in order: Use a different variable for the other direction. y counts down. / Make let y = 0; at the top, draw circle(150, y, 40), and add 2 to y each frame. / A second shape needs its own variable, made at the top and changed in draw(). / Give it a different step, for example y = y + 4, so it moves faster, and a different place to start. For students who need more support: Give students the sketch with let y = 0; already made, and ask for the draw() changes only. For early finishers: Make a circle that moves in both directions at once (x and y), or one that grows and shrinks. The hard part, on purpose: Seeing that draw() repeats, so a variable made inside it starts again. The trace table and the let-in-draw bug are for that. When students get stuck: The circle does not move. Ask: Is the variable changed inside draw(), and made outside it? Fix: let x = 0; goes at the top, outside every function; x = x + 2; goes inside draw(). / A red line saying x is not defined. Ask: Where is let x = 0;? Fix: Put it at the top of the sketch, above setup(). / A smear instead of a moving circle. Ask: Is background(...) the first line in draw()? Fix: Move it to the first line of draw(). / Both circles move together. Ask: Do they use the same variable? Fix: Make a second variable for the second circle. -->

<!-- Speaker note: Teacher: ask which variable moves which circle before they run it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: two things that move

Make at least **two things move in different ways**: one faster than the other, one going the other direction, one growing. The sketch gives you `t`, a number that goes up by 1 every frame. `circle(t, ...)` slides, `circle(300 - t, ...)` slides the other way, and `circle(150, 100, t)` grows. A `%` operator is the remainder: `t % 300` goes from 0 up to 299, then starts again.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-move/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a value changed in draw and used for a shape makes anything move. -->

<!-- Speaker note: Teacher: choose the two ideas as a pair, then each makes one. -->

---

## Where this leads

You have a loop that runs 60 times a second and numbers that change. Next: make the sketch **decide**, so a circle can bounce.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why is let x = 0; at the top and not inside draw()?**

* Inside draw() it would be made again every frame and go back to 0; at the top it keeps its value.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: if, so circles can bounce, and the mouse. -->
