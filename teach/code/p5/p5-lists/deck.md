---
marp: true
theme: default
html: true
---

# Lists and loops

Drawing and animation with p5.js · Building blocks

<!-- Speaker note: Students keep numbers in an array, count places from 0, draw a bar for each with a for loop, build the array with push and random, find why bars hang from the top, and make a chart of their own. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). -->

---

## Today

**We are learning to** keep many numbers in an array, draw one thing for each with a loop, and build the array with random numbers.

- I can keep many values in an array and read one by its place number.
- I can use a for loop to do something for every value in an array.
- I can add to an array with push, and use random numbers.

<!-- Speaker note: Before class: Read the unit primer first. This revisits the Python lists lesson in JavaScript: places count from 0, `length` says how many, and `push` is `append`. The new difficulty is the counting loop `for (let i = 0; i < heights.length; i++)`: three parts in one line, which students copy until it makes sense; the lesson's text reads it aloud, and the trace table follows `i` and `heights[i]` together. The second idea is that `rect` hangs from its **top-left**, and y counts down, so a bar that stands on the bottom has its top at `200 - height`: that is the Predict and the bug task. Random numbers make every Run different, so the Predict uses a fixed array. -->

---

## Why it matters

> Ten bars, or a thousand: it is the same few lines of code if the numbers live in a list and a loop does the drawing.

<!-- Speaker note: An **array** is a list of values in order: `let heights = [50, 120, 80, 150];`. Each value has a **place number**, counting from **0**: `heights[0]` is 50 and `heights[3]` is 150. `heights.length` is how many there are (4). A **loop** repeats code. This one counts: ```js for (let i = 0; i < heights.length; i++) { // runs once for each place number i } ``` **The hard part** is that first line. Read it as three small instructions in a row: *start with `i` at 0; keep going while `i` is less than the length; add 1 to `i` after each time round.* You will copy it a lot before it feels natural, and that is normal. Inside the braces, `i` is the place number, so `heights[i]` is each value in turn. `heights.push(7)` adds a value to the end, and `random(20, 180)` gives a random number from 20 up to 180. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does the sketch draw?**

- Four bars standing on the bottom edge, the fourth the tallest
- Four bars hanging from the top edge, the first the tallest
- Four bars of the same height
- One bar, 150 tall

<!-- Speaker note: What happens: Four bars standing on the bottom edge, the fourth tallest. Each bar's top is at y = 200 - its height, and it is that tall, so its bottom is at 200: the bottom edge of the canvas. The fourth value, 150, is the biggest. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the canvas on the board and mark the bottom of the first bar. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Four bars standing on the bottom edge, the fourth tallest. Each bar's top is at y = 200 - its height, and it is that tall, so its bottom is at 200: the bottom edge of the canvas. The fourth value, 150, is the biggest.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-lists/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-lists/?full=step-2#step-2)

<!-- Speaker note: The loop in `setup()` builds the array: ten random heights. The loop in `draw()` draws a bar for each one. Press **Run again** a few times. Change the 10 in `i < 10` and run again. Students should be able to say: I can see ten bars, a different set each time I press Run. -->

<!-- Speaker note: Teacher: press Run again several times and ask what stays the same (the code) and what changes (the numbers). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A loop with a counter i visits each place in an array; heights[i] is the value at place i, and a rect hangs from its top-left corner. -->

<!-- Speaker note: Teacher: fill the trace together, writing each i on the board. -->

<style scoped>pre, marp-pre { font-size: 0.64em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the loop

**heights is [50, 120, 80, 150]. Fill in what the loop uses each time round.**

| i | heights[i] | the bar's top, 200 - heights[i] |
|---|---|---|
| 0 | 50 | 150 |
| 1 | ? | ? |
| 2 | ? | ? |
| 3 | ? | ? |

* Answer: 120, 80, 80, 120, 150, 50

<!-- Speaker note: i counts 0, 1, 2, 3. Each time round, heights[i] is the value at that place, and the bar's top is 200 minus it: the taller the bar, the higher up its top. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The last place

**The array has 10 values. What is the last place number?**

- 1
- 9
- 10
- 11

* Answer: 9

<!-- Speaker note: Places count from 0, so ten values are places 0 to 9. The loop stops when i is not less than 10, so it never uses place 10. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 14

<!-- Speaker note: rect's y is the bar's top edge, and y counts down. y = heights[i] puts the top at that depth. For a bar standing on the bottom, the top is at 200 - heights[i]. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Twenty bars:** Draw **20 bars** instead of 10, so they all still fit on the canvas.
- **Tall and short:** Colour the **tall bars** (over 100) differently from the short ones.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-lists/?full=step-4#step-4)

<!-- Speaker note: What this step is for: More data is a bigger number in the loop; deciding inside the loop makes each item different. Hints, in order: Two things control how many bars there are. One of them makes the values. / Change 10 to 20 in setup(), and make the bars thinner and closer together so they fit. / Inside the loop, an if can look at heights[i] before the rect is drawn. / if (heights[i] > 100) { fill(255, 120, 160); } else { fill(255, 210, 0); } goes above the rect line. For students who need more support: Give students the loop and the rect line, and ask them only to change the numbers and colours. For early finishers: Add a second array of names, and draw each name under its bar with text(). Or sort the data first with heights.sort(). The hard part, on purpose: The three-part for line. Have students say it aloud: start at 0, keep going while less than the length, add 1 each time. When students get stuck: Nothing is drawn. Ask: Is the loop inside draw(), and is the array filled in setup()? Fix: The array must have values before draw() uses them: push in setup(), loop in draw(). / A red line: Cannot read properties of undefined. Ask: Does the loop go past the end of the array? Fix: Use i < heights.length, not <=. The last place is length - 1. / The bars hang from the top. Ask: Which way does y count, and where is the top of a bar? Fix: The top is at 200 - heights[i]; the height stays heights[i]. / Only one bar shows. Ask: Are all the bars at the same x? Fix: Make x depend on i, for example i * 30 + 5. -->

<!-- Speaker note: Teacher: ask which two numbers must change for 20 bars to fit (the count and the spacing). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own chart

Draw a **chart of your own** from a list of numbers: hours of sleep each night this week, scores, or random bubbles. Fill the array with the numbers you choose (`let values = [3, 5, 2];`) or with `push`, then use a loop to draw one thing for each value. Circles, bars, lines and coloured squares all work.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-lists/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a list of real or random numbers, and a loop that draws one thing for each. -->

<!-- Speaker note: Teacher: encourage real data (sleep, steps, scores), and ask students to say what each bar means. -->

---

## Where this leads

An array holds many values, and a loop does something for each. Next: an **object** holds everything about one thing, so a list of objects is a list of stars, balls or bars.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In heights[i], what is i, and where does it start?**

* i is the place number of the value in the array, and the first place is 0.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: objects, so one list holds stars with their own position, speed and size. -->
