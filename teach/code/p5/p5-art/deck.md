---
marp: true
theme: default
html: true
---

# Moving art

Drawing and animation with p5.js · Final challenge: Catch the circle

<!-- Speaker note: Students place circles on a ring with sin and cos, make the ring turn with frameCount, colour it with map, add trails and a spiral, and make a moving pattern of their own. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 15 min). -->

---

## Today

**We are learning to** use sin and cos to move things in circles, map to turn one range into another, and make a pattern of your own.

- I can use sin and cos to place things on a circle.
- I can use map to turn one range of numbers into another.
- I can make a moving pattern from a loop.

<!-- Speaker note: Before class: Optional enrichment after the challenge. Students need no trigonometry beyond "sin and cos give the x and y of a point going round a circle"; angles here are in radians (frameCount * 0.02), apart from the Predict, which converts degrees with radians(). Skip the explanation of radians unless asked. map is the most useful new tool: it turns any range into any other. -->

---

## Why it matters

> A few lines of maths can make a spinning ring of colour, with no pictures drawn by hand.

<!-- Speaker note: `cos(angle)` and `sin(angle)` give the x and y of a point going round a circle, and `map(value, a, b, c, d)` turns a number in the range a to b into the matching number in the range c to d. Together with a loop, they make patterns that move. **The hard part** is the loop variable. Each circle gets its own `i`, and that `i` changes its angle and its colour, so every circle is different. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```javascript
function setup() {
  createCanvas(300, 300);
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = i * 30;
    circle(150 + cos(radians(angle)) * 100, 150 + sin(radians(angle)) * 100, 20);
  }
}
```

**What shape do the 12 circles make?**

- One circle in the middle
- A straight row
- A ring of 12 circles
- A zigzag

<!-- Speaker note: What happens: A ring. Each circle is placed at 100 pixels from the middle (150, 150), at an angle 30 degrees further round than the last. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: sketch a clock face and the 12 circles on it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A ring. Each circle is placed at 100 pixels from the middle (150, 150), at an angle 30 degrees further round than the last.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-art/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-art/?full=step-2#step-2)

<!-- Speaker note: `frameCount` goes up every frame, so each angle grows and the ring turns. Students should be able to say: I can see the ring of circles turning, with a colour that changes along it. -->

<!-- Speaker note: Teacher: ask what would change if the 0.02 was 0.05. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
```

<!-- Speaker note: What this step is for: i gives each circle its own angle and colour; frameCount makes every angle grow, so the whole ring turns. -->

<!-- Speaker note: Teacher: ask which number makes it turn. -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What makes it turn?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
```

</div>
<div>

**What makes the ring turn?**

- background clears the canvas
- frameCount grows every frame, so every angle grows
- i changes every frame
- map changes the colours

* Answer: frameCount grows every frame, so every angle grows

</div>
</div>

<!-- Speaker note: angle = frameCount * 0.02 + i * 0.5. i never changes inside one frame, but frameCount goes up by 1 each frame. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which piece does what?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```javascript
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
```

</div>
<div>

**Match each piece with what it does.**

| | |
|---|---|
| `cos(angle) * 100` | A. turns i from 0 to 11 into a number from 255 down to 120 |
| `150 + ...` | B. an angle that grows a little every frame |
| `map(i, 0, 11, 255, 120)` | C. moves the middle of the ring to the middle of the canvas |
| `frameCount * 0.02` | D. how far right or left of the middle, up to 100 |

* Answer: cos(angle) * 100 → D. how far right or left of the middle, up to 100; 150 + ... → C. moves the middle of the ring to the middle of the canvas; map(i, 0, 11, 255, 120) → A. turns i from 0 to 11 into a number from 255 down to 120; frameCount * 0.02 → B. an angle that grows a little every frame

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Trails:** Leave **trails** behind the circles.
- **A spiral:** Spread the circles into a **spiral**.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-art/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A background with low opacity leaves trails; a radius that depends on i makes a spiral. Hints, in order: background takes a fourth number for how solid it is, up to 255. / Try background(20, 30, 60, 30) so old circles fade slowly. / Use a radius that grows with i instead of the fixed 100. / let radius = 10 + i * 5; and use radius in place of 100. For students who need more support: Give the Run sketch and ask for one change, such as colours or speed. For early finishers: Make the circles change size with sin, or draw two rings turning opposite ways. The hard part, on purpose: Seeing why a loop with i makes different circles. Print i or draw just one circle first. When students get stuck: The circles all sit in one place. Ask: Does the angle depend on i? Fix: Add i * 0.5 to the angle. / Everything is in the top left corner. Ask: Is the middle added (150 + ...)? Fix: Add 150 to x and to y. / The trails are too strong or do not show. Ask: What is the fourth number in background? Fix: Lower it for longer trails, raise it for shorter. -->

<!-- Speaker note: Teacher: let students guess the effect of the fourth number in background before trying. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own pattern

Make a moving pattern of your own: a wave, a spiral, a spinning flower. Use a loop, `sin` or `cos`, and `map` to change a colour or size. The sketch on this page is one wave.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-art/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a moving pattern using a loop, sin or cos, and map. -->

<!-- Speaker note: Teacher: encourage waves, orbits and flowers; share the best. -->

---

## Where this leads

Maths makes motion smooth. Artists use the same ideas for waves, orbits and growing plants.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does map(i, 0, 11, 255, 120) do?**

* It turns i from the range 0 to 11 into a number from 255 down to 120.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: From here, students can start their own sketches or explore p5.js's reference. -->
