---
marp: true
theme: default
html: true
---

# Functions of your own

Drawing and animation with p5.js · Building blocks

<!-- Speaker note: Students turn ten lines that draw a flower into a function with parameters, call it with different values, find a call whose capitals do not match, draw a garden with a loop, write a function that returns true or false, and make a drawing function of their own. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). -->

---

## Today

**We are learning to** give a piece of code a name, hand it values with parameters, and get an answer back with return.

- I can write a function and call it more than once.
- I can use parameters to make each call different.
- I can write a function that returns an answer and use it in an if.

<!-- Speaker note: Before class: Read the unit primer first. This is the Python functions, parameters and returns units in one lesson, in JavaScript, so go gently on the third idea: the Modify task on isNear is the first time students write `return`. Predict is the key idea (a definition draws nothing). Names must match exactly; the playground hint for "is not defined" mentions capitals. Parameters take values in order, so a call with the arguments swapped moves the flower, not the size. -->

---

## Why it matters

> One flower took ten lines. A function turns those lines into a single word, so a whole garden is three short lines.

<!-- Speaker note: A **function** is code with a name. You write it once, then **call** it as often as you like: `drawFlower(80, 100);`. The names in the brackets of the definition are **parameters**: `function drawFlower(x, y)` says "give me an x and a y". Each call fills them in, so one function draws flowers in many places. A function can also hand an answer back with **return**, and you will write one in the Modify step. **The hard part** is the name. `drawFlower` and `drawflower` are different names, and JavaScript will not guess. If you see "is not defined", compare the call with the definition letter by letter. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**How many flowers does this sketch draw?**

- 0
- 1
- 2
- 10

<!-- Speaker note: What happens: 2. Defining drawFlower draws nothing by itself. setup() calls it twice, once at (80, 100) and once at (200, 60). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask 'does writing the recipe cook the meal?' -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2. Defining drawFlower draws nothing by itself. setup() calls it twice, once at (80, 100) and once at (200, 60).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-functions/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-functions/?full=step-2#step-2)

<!-- Speaker note: The function now has a third parameter, `size`. Each call chooses where the flower goes and how big it is. A function can hand an answer back with **return**. Here `twice(4)` is the number 8, so it can be used anywhere a number goes: Students should be able to say: I can see three flowers of different sizes, each drawn by one call. -->

<!-- Speaker note: Teacher: ask students to say each call aloud as 'a flower at x, y, this big'. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A definition is a recipe and a call is cooking it; parameters carry the values from the call into the function. -->

<!-- Speaker note: Teacher: for the bug, read the call and the definition aloud next to each other. -->

<style scoped>pre, marp-pre { font-size: 0.6em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part is which?

**Match each piece with what it is.**

| | |
|---|---|
| `function drawFlower(x, y, size) {` | A. a call: uses the recipe with these values |
| `drawFlower(70, 100, 20);` | B. hands an answer back to the line that called |
| `size` | C. a parameter: it is 20 in the first call and 12 in the second |
| `return n * 2;` | D. the definition: the recipe, with three parameters |

* Answer: function drawFlower(x, y, size) { → D. the definition: the recipe, with three parameters; drawFlower(70, 100, 20); → A. a call: uses the recipe with these values; size → C. a parameter: it is 20 in the first call and 12 in the second; return n * 2; → B. hands an answer back to the line that called

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Values in order

**In the call drawFlower(180, 60, 12), what is y inside the function?**

- 60
- 12
- It has no value
- 180

* Answer: 60

<!-- Speaker note: The values go to the parameters in order: x is 180, y is 60 and size is 12. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 12

<!-- Speaker note: The function is called drawFlower with a capital F. JavaScript treats drawflower as a different, unknown name. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A garden:** Use a loop to draw **five flowers** with one call.
- **Say hello:** Make the flower say hello when the mouse is near it, using a function of your own that **returns** true or false.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-functions/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A loop can call a function many times; a function that returns a value can sit inside an if. Hints, in order: Replace the three calls with a for loop that counts to 5. / Use i in the call: drawFlower(40 + i * 55, 100, 14). / A function that answers true or false is used inside an if. / Write function isNear(x1, y1, x2, y2) { return dist(x1, y1, x2, y2) < 30; } and use if (isNear(mouseX, mouseY, 150, 100)). For students who need more support: Give the definition of the drawing function and ask only for the three calls. For early finishers: Give the flower a colour parameter, or make drawFlower return the width it used. The hard part, on purpose: Names must match exactly, and parameters fill in order. Read the call and the definition aloud side by side. When students get stuck: A red line: drawflower is not defined. Ask: Does the call spell the name exactly like the definition? Fix: Match the capitals. / The flower is in the wrong place or the wrong size. Ask: Are the values in the same order as the parameters? Fix: Put the arguments in the order x, y, size. / isNear seems to do nothing. Ask: Does the function use return, and is it used inside an if? Fix: Add return before the comparison, and call it in the if brackets. / Nothing is drawn. Ask: Is the function called anywhere? Fix: Add a call in setup() or draw(). -->

<!-- Speaker note: Teacher: for isNear, ask what the function answers when the mouse is far away. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own drawing function

Write a function that draws something of your own (a tree, a house, a robot, a face) with at least a position as parameters. Then call it **three times**. The sketch on this page draws trees of different heights.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-functions/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a drawing of your own as a function with parameters, used at least three times. -->

<!-- Speaker note: Teacher: choose the drawing and list its parameters first. -->

---

## Where this leads

You can now name your own code. Next: put lists, objects, decisions and functions together in a game.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between defining a function and calling it?**

* Defining writes the recipe and draws nothing; calling uses it with values and does the work.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the final challenge puts lists, objects, decisions and functions together in a click-to-catch game. -->
