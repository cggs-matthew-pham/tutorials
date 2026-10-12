---
marp: true
theme: default
html: true
---

# Objects and stars

Drawing and animation with p5.js · Building blocks

<!-- Speaker note: Students keep one star's place and speed in an object, read and change properties with a dot, make a list of objects with push and random, move them with a for-of loop, find a speed missing its star., and add a property and a second list of their own. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 20 min). -->

---

## Today

**We are learning to** keep everything about one star (its place and its speed) together in an object, and move a whole list of them.

- I can make an object with properties and read one with a dot.
- I can keep many objects in an array and visit each with a for-of loop.
- I can add my own property to an object.

<!-- Speaker note: Before class: Read the unit primer first. This is the Python Objects with turtles unit in JavaScript, without classes: one object per thing, a list of objects, a loop. `{ x: 20, y: 30 }` is an object; `star.y` reads and changes a property. `for (let star of stars)` is the easy loop: no counter, and `star` is the object itself, so `star.y = ...` changes the real star. The classic slip is writing `speed` instead of `star.speed`; the playground's hint for "x is not defined" suggests spelling, so say the dot aloud when you meet it. The Predict uses console.log so students compare a printed number: the Output box sits under the sketch. This lesson uses random and push from the last one without re-teaching them. -->

---

## Why it matters

> A falling star has a place, a speed and a size. An object keeps them together, so a hundred stars are a hundred objects, not three hundred loose numbers.

<!-- Speaker note: An **object** holds named values together: `{ x: 20, y: 30, speed: 2 }`. Each name is a **property**, read with a dot: `star.y` is that star's y. You change one the same way: `star.y = star.y + star.speed;`. A list of objects is a list of things, each with its own values: `stars`. The loop to visit each one is the easiest kind: ```js for (let star of stars) { // star is each object in turn } ``` Read it as "for each star in stars". It does not need a counter at all. **The hard part** is the dot. Inside the loop, `speed` on its own means nothing: it is `star.speed` that is this star's speed. The error message "speed is not defined" is the clue. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```javascript
function setup() {
  let star = { x: 20, y: 30, speed: 2 };
  star.y = star.y + star.speed;
  console.log(star.y);
}
```

**What does console.log(star.y) show?**

- 2
- 30
- 32
- star.y

<!-- Speaker note: What happens: 32. star.y starts at 30, then star.y = star.y + star.speed adds 2, so it is 32 when it is printed. console.log writes to the Output box under the sketch. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write the object on the board and cross out the old y when it changes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 32. star.y starts at 30, then star.y = star.y + star.speed adds 2, so it is 32 when it is printed. console.log writes to the Output box under the sketch.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-objects/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-objects/?full=step-2#step-2)

<!-- Speaker note: Each star is an object with its own `x`, `y` and `speed`. `draw()` visits every star in the list, draws it, moves it, and sends it back to the top if it has fallen off the bottom. Press **Run again** and watch how the speeds differ. Students should be able to say: I can see each star falling at its own speed and starting again at the top. -->

<!-- Speaker note: Teacher: ask where in the code each star's speed lives. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: An object keeps one thing's values together; a for-of loop visits each object, and star.speed is that star's own value. -->

<!-- Speaker note: Teacher: for the bug, ask 'whose speed is it?' and point at the star. -->

<style scoped>pre, marp-pre { font-size: 0.51em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does each line do?

**Match each line with what it does.**

| | |
|---|---|
| `stars.push({ x: 25, y: 10, speed: 2 });` | A. does the code in the braces for each star in turn |
| `for (let star of stars) {` | B. draws this star where it is now |
| `star.y = star.y + star.speed;` | C. moves this star down by its own speed |
| `circle(star.x, star.y, 12);` | D. adds a new star object to the list |

* Answer: stars.push({ x: 25, y: 10, speed: 2 }); → D. adds a new star object to the list; for (let star of stars) { → A. does the code in the braces for each star in turn; star.y = star.y + star.speed; → C. moves this star down by its own speed; circle(star.x, star.y, 12); → B. draws this star where it is now

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Their own speeds

**Why does each star fall at its own speed?**

- Each star object has its own speed property
- All stars share one speed variable
- p5 picks a different speed each frame
- The loop slows down the later stars

* Answer: Each star object has its own speed property

<!-- Speaker note: speed is stored inside each object. star.speed in the loop reads the speed of whichever star the loop is on, so six stars means six speeds. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 15

<!-- Speaker note: There is no variable called speed. The speed belongs to the star, so it is star.speed. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Twelve stars:** Make **12 stars**, spread across the canvas.
- **Their own size:** Give each star its **own size**.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-objects/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new property gives each object another value of its own; the loop can use it with the dot. Hints, in order: Two numbers in setup() decide how many stars there are and where they start. / Change 6 to 12 in the loop, and change the 50 so they spread across the 300 pixels. / A property is added where the star is made, and read where it is drawn. / Add size: random(6, 18) to the object in push, and use star.size in circle. For students who need more support: Give students the cloud objects and loop already written, and ask only for the stars' size property. For early finishers: Make the stars twinkle by changing their size a little every frame, or give each one a colour property chosen with random. The hard part, on purpose: The dot: star.speed, not speed. Say it as 'this star's speed'. When students get stuck: A red line: speed is not defined. Ask: Whose speed is it? Fix: Write star.speed. / Only one star appears, or they all move together. Ask: Do the stars have different x values and speeds? Fix: Make x depend on i in the setup loop, and use random for speed. / A red line: Cannot read properties of undefined. Ask: Is the loop reading a property of something that is not in the list? Fix: Check the list name in the loop is the list you pushed to. / The new list's objects are never drawn. Ask: Does draw() have a loop over that list? Fix: Add a for (let item of list) loop in draw() for it. -->

<!-- Speaker note: Teacher: students ask each other what a size property changes, then test. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: another list

Add a second kind of thing with its own list and its own loop: clouds that drift sideways, snowflakes that wobble, bubbles that rise. Make each object with the properties it needs, push them in `setup()`, and move and draw them with a `for (let ... of ...)` loop in `draw()`. Draw the clouds **before** the stars so the stars are on top.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-objects/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a second list of objects with its own properties, moved and drawn in its own loop. -->

<!-- Speaker note: Teacher: choose a second kind of thing and list its properties before writing code. -->

---

## Where this leads

You can now hold many things, each with its own values. Next: **functions**, so a piece of code has a name and you can use it again.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does star.speed mean inside the loop?**

* The speed property of the star the loop is currently on.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: functions with parameters, so restarting a star, or drawing a flower, is code with a name. -->
