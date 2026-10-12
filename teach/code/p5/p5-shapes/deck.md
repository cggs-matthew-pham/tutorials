---
marp: true
theme: default
html: true
---

# Shapes on a canvas

Drawing and animation with p5.js · Shapes and movement

<!-- Speaker note: Students meet p5.js on its own playground, draw circles, rectangles, triangles and lines on a canvas, learn that (0, 0) is the top left and y counts down, fix a fill that comes after its shape, and draw a picture of their own. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 20 min). -->

---

## Today

**We are learning to** draw circles, rectangles, triangles and lines on a canvas with p5.js, and find out where the corner (0, 0) is.

- I can draw shapes at places on a canvas with p5.js.
- I can say where (0, 0) is and which way y counts.
- I can colour shapes with fill, and know it affects shapes drawn after it.

<!-- Speaker note: Before class: Read the unit primer first. The playground is our own p5.js editor (p5.js is served from this site, so it works with no network beyond the school's own). Run starts the sketch, Stop ends it, and errors show the line and a hint. Students do not need to understand `function setup() { ... }` yet: it is a recipe for this lesson and the next explains it as the place that runs once. The hard part is that y counts **down** from the top-left: turtle and maths graphs count up. Expect "where did my shape go?" until students get this. Curly brackets, brackets and semicolons are copied as written; the hint under a red error says which is missing. -->

---

## Why it matters

> Every picture on a screen is shapes at places. In p5.js you say which shape, where, and what colour.

<!-- Speaker note: **p5.js** draws on a **canvas**: a rectangle of pixels you make with `createCanvas(width, height)`. A shape is a command with numbers: `circle(150, 100, 80)` draws a circle with its middle **150 across** and **100 down**, and a width of 80. Your code goes inside `function setup() { ... }`. It runs once, when the sketch starts. For now, copy that first line and the closing `}` as they are; the lessons after this one explain functions properly. JavaScript is fussy: every `(` needs a `)`, every `{` needs a `}`, and capital letters matter. When something is wrong, the playground shows the line and a hint. **Where is (0, 0)?** At the **top left** corner. `x` goes across to the right, and `y` goes **down**. That is the opposite way from the turtle's drawing page, and it catches almost everyone out once. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```javascript
function setup() {
  createCanvas(300, 200);
  background(240);
  fill(255, 200, 0);
  circle(150, 100, 80);
  rect(20, 20, 60, 40);
}
```

**Where does the rectangle, rect(20, 20, 60, 40), appear?**

- Near the top-left corner
- Near the bottom-left corner
- In the middle, behind the circle
- Off the canvas

<!-- Speaker note: What happens: Near the top-left corner. The first two numbers of rect are its top-left corner: 20 across and 20 down from (0, 0), which is the canvas's top left. The 60 and 40 are its width and height. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw a 300 by 200 rectangle on the board and mark (0, 0) at the top left. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Near the top-left corner. The first two numbers of rect are its top-left corner: 20 across and 20 down from (0, 0), which is the canvas's top left. The 60 and 40 are its width and height.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-shapes/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-shapes/?full=step-2#step-2)

<!-- Speaker note: Press **Run** and match each shape to its line. `fill(r, g, b)` sets the colour of the shapes drawn **after** it, with each number from 0 to 255. Change the numbers in `circle(150, 100, 80)` and run again. Students should be able to say: I have run the sketch and found each shape in the code. -->

<!-- Speaker note: Teacher: ask each student to point at the line that made the pink rectangle. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A shape's numbers are its position and size, y counts down from the top, and colours apply to the shapes drawn after them. -->

<!-- Speaker note: Teacher: for the bug, say aloud what each line does in order: fill comes after the circle. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Match each line with what it does.**

| | |
|---|---|
| `createCanvas(300, 200);` | A. sets the colour for the shapes drawn next |
| `fill(255, 120, 160);` | B. draws a line from one point to another |
| `circle(150, 100, 80);` | C. draws a circle, middle 150 across and 100 down, 80 wide |
| `line(0, 190, 300, 190);` | D. makes a canvas 300 wide and 200 tall |

* Answer: createCanvas(300, 200); → D. makes a canvas 300 wide and 200 tall; fill(255, 120, 160); → A. sets the colour for the shapes drawn next; circle(150, 100, 80); → C. draws a circle, middle 150 across and 100 down, 80 wide; line(0, 190, 300, 190); → B. draws a line from one point to another

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Up the canvas

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**To move the circle UP the canvas, what do you change?**

- Make the width smaller
- Make x smaller
- Make y bigger (100 becomes 160)
- Make y smaller (100 becomes 40)

* Answer: Make y smaller (100 becomes 40)

</div>
</div>

<!-- Speaker note: y counts down from the top, so a smaller y is higher up. Making x smaller moves the circle left. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should draw a gold circle, but it is white. Click the line that is in the wrong place.**

```
 1  function setup() {
 2    createCanvas(300, 200);
 3    background(20, 30, 60);
 4    circle(150, 100, 80);
 5    fill(255, 210, 0);
 6  }
```

* Answer: line 4

<!-- Speaker note: fill only colours the shapes drawn after it. The circle is drawn on line 4, before the fill on line 5, so the fill changes nothing. Put fill(...) above circle(...). -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Corner:** Move the big circle to the **bottom-right** corner of the canvas.
- **An oval:** Add an **oval** (ellipse) to the picture.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-shapes/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Moving a shape is changing its numbers; a new kind of shape is a new command with its own numbers. Hints, in order: The big circle's x and y are its middle. The canvas is 300 wide and 200 tall. / Bigger x moves right and bigger y moves down. Try x near 250 and y near 160. / p5 has more shapes than the sketch uses. An oval is called ellipse, and it takes a width and a height. / Change the pink rect(20, 20, 60, 40) to ellipse(60, 40, 90, 40): an ellipse's x and y are its middle. For students who need more support: Give students the finished picture's code and ask them to change colours and sizes first, then add one shape. For early finishers: Make the picture with only rect and circle commands that use arithmetic, such as circle(100 + 50, 100, 40), or draw a flag from a real country. The hard part, on purpose: y counts down from the top-left. Ask students to predict which way a shape moves before they change a number. When students get stuck: A red line saying a name is not defined. Ask: Is the command spelled exactly as in the example, with the same capital letters? Fix: circle, not Circle; rect, not Rect. / Nothing is drawn. Ask: Is the shape inside function setup() { ... }, between the curly brackets? Fix: Move the line inside the braces, before the closing }. / The shape is in the wrong corner. Ask: Which way does y count, up or down? Fix: y counts down from the top, so a bigger y is lower on the canvas. / The new shape is hidden. Ask: Was a bigger shape drawn after it in the same place? Fix: Draw it later in the code, so it lands on top. -->

<!-- Speaker note: Teacher: encourage small changes and re-running often: Ctrl+Enter runs the sketch. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a picture of your own

Draw a picture of your own: a house, a face, a robot, a flag, a rocket. Use at least **5 shapes** and **3 colours**. Shapes are drawn in order, so draw the sky first and the sun after it. Other commands to try: `noStroke()` (no outlines), `stroke(r, g, b)` and `strokeWeight(4)` (outline colour and thickness), `triangle(x1, y1, x2, y2, x3, y3)`.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-shapes/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: shapes at places, with colours, built up in order. -->

<!-- Speaker note: Teacher: ask for 5 shapes and 3 colours, then swap screens and describe each other's picture. -->

---

## Where this leads

Everything you draw is numbers: where, how big and what colour. Next lesson: change those numbers while the sketch runs, so things move.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Which corner is (0, 0), and which way does y count?**

* The top left; y counts downward.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: variables and draw(), so the picture changes while it runs. -->
