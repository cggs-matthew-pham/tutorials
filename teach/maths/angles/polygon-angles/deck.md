---
marp: true
theme: default
html: true
---

# Angles in a polygon

Angles and shapes · Angle sums

<!-- Speaker note: Students split polygons into triangles from one corner, find that a shape with n sides makes n − 2 triangles, and use (n − 2) × 180° for the angle sum (AC9M7M05, node 2). About 45 minutes (Predict and Run 8 min · Investigate 15 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** split a polygon into triangles from one corner. A shape with n sides makes n − 2 triangles, so its angles add to (n − 2) × 180°.

- I can split a polygon into triangles from one corner and find its angle sum.
- I can explain why a shape with n sides has an angle sum of (n − 2) × 180°.
- I can find the number of sides from an angle sum.

<!-- Speaker note: Before class: Do the Run board and the Make task yourself first. Students need the last lesson: a triangle's angles add to 180°. The method is to draw lines from one corner only (the board's Split into triangles). Students who split from a point in the middle get n triangles and must take off the full turn of 360° round that point: that is Ben's mistake, planted after the method. The board only splits convex shapes (every corner points out). A concave shape (a corner that points in, with a reflex angle) is the edge case in Modify: the angle sum is still (n − 2) × 180°. -->

---

## Why it matters

> Stop signs are octagons, honeycomb cells are hexagons, a soccer ball is pentagons and hexagons. The triangle rule tells you the angles of all of them.

<!-- Speaker note: In the last lesson you found that the angles of any triangle add to $180°$. A **polygon** is any closed shape with straight sides: a quadrilateral (4 sides), pentagon (5), hexagon (6), octagon (8) and so on. In this lesson you use the triangle rule to find the total of a polygon's angles, without measuring them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**What do the four angles of a quadrilateral add to?**

- $540°$
- $180°$, like a triangle
- $360°$
- It depends on the shape

<!-- Speaker note: What happens: 360°. Any quadrilateral splits into 2 triangles from one corner, and 2 × 180° = 360°. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands. Students who chose 180° are treating every shape like a triangle; '4 × 90°' students may pick 360° for the wrong reason. Ask: does a lopsided quadrilateral still add to 360°? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2Fpolygon-angles%2Fstep-2&code=widget%3A+geometry%0Ashape%3A+polygon%0Asides%3A+4%0Acorners%3A+1%2C1%3B+9%2C2%3B+8%2C6%3B+3%2C7%0Asplit%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/angles/polygon-angles/?full=step-2#step-2)

<!-- Speaker note: The board measures each angle and adds them up. **Split into triangles** draws lines from corner $A$ to the corners that are not next to it. Drag the corners and watch both totals. -->

<!-- Speaker note: Teacher: ask students to drag the corners into a very lopsided quadrilateral and read both totals: the measured one and 2 × 180°. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 360°. Any quadrilateral splits into 2 triangles from one corner, and 2 × 180° = 360°.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## A triangle for each side, less two

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2Fpolygon-angles%2Fstep-3&code=widget%3A+geometry%0Ashape%3A+polygon%0Asides%3A+5%0Acorners%3A+2%2C1%3B+9%2C1%3B+10%2C5%3B+6%2C7%3B+1%2C5%0Asplit%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/angles/polygon-angles/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Lines from one corner split a shape with n sides into n − 2 triangles, and those triangles' angles exactly fill the polygon's corners, so the sum is (n − 2) × 180°. Ben's split adds the angles around his middle point too. -->

<!-- Speaker note: Teacher: model the worked example live. Draw a pentagon, choose A, draw the two lines at writing pace, shade the 3 triangles, then write 3 × 180° = 540°. Reveal the prepared lines afterwards to compare. Then fill the table together and ask: what is the pattern? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Splitting from one corner

Here is the method for a pentagon.

$$\text{A pentagon has 5 corners}$$

1) $\text{Lines from A to C and to D}$ — Join $A$ to every corner that is not next to it.
2) $3 \text{ triangles}$ — The two lines split the pentagon into 3 triangles.
3) $\text{Their angles fill the pentagon's corners}$ — Every triangle's corners are at the pentagon's corners, and together they fill them exactly.
4) $3 \times 180° = 540°$ — So the pentagon's angles add to 540°.
5) $(n - 2) \times 180°$ — A shape with $n$ sides splits into $n - 2$ triangles this way.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write A pentagon has 5 corners and say "Choose one corner, A." Line 1: write Lines from A to C and to D and say "Join A to every corner that is not next to it." Line 2: write 3 triangles and say "The two lines split the pentagon into 3 triangles." Line 3: write Their angles fill the pentagon's corners and say "Every triangle's corners are at the pentagon's corners, and together they fill them exactly." Line 4: write 3 × 180° = 540° and say "So the pentagon's angles add to 540°." Line 5: write (n - 2) × 180° and say "A shape with n sides splits into n - 2 triangles this way." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Splitting from one corner

**Split shapes on the board, or in your head, and fill in the table.**

| sides | 3 | 4 | 5 | 6 | 8 |
|---|---|---|---|---|---|
| triangles from one corner | 1 | ? | ? | ? | ? |
| angle sum (°) | 180 | ? | ? | ? | ? |

* Answer: 2, 3, 4, 6, 360, 540, 720, 1080

<!-- Speaker note: Each shape makes 2 fewer triangles than it has sides, and each triangle adds 180°. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Ben finds the angle sum of a pentagon. Click the line where his reasoning goes wrong.**

```
 1  Ben wants the angle sum of a pentagon.
 2  He puts a point in the middle and draws a line to each corner.
 3  That makes 5 triangles.
 4  5 × 180° = 900°, so the pentagon's angles add to 900°.
```

* Answer: line 4

<!-- Speaker note: Line 4: his 5 triangles also have angles around the middle point, a full turn of 360°, which are not angles of the pentagon. 900° − 360° = 540°. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A hexagon

**What do the angles of a hexagon (6 sides) add to?**

* Answer: 720

<!-- Speaker note: 6 − 2 = 4 triangles, and 4 × 180° = 720°. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## One change at a time



- **A lopsided pentagon:** Each task changes one thing. First: the same pentagon in a new shape.
- **A corner that points in:** 
- **More sides:** 
- **Twelve sides:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/angles/polygon-angles/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change at a time: a lopsided pentagon (same total), a corner that points in (still 360°), more sides on the board, then the rule without the board. Hints, in order: Move any corner. Does the number of triangles change? / Drag one corner towards the middle of the shape, past the line joining its neighbours. / Look at the angle at that corner: it is more than 180°. / Use More sides. How many triangles does each new side add? For students who need more support: Use the choose board (More sides) to count triangles for each shape. A printed table with the first two columns filled helps students see the pattern. For early finishers: Why can no polygon have angles adding to 1000°? Each interior angle of a regular polygon with 20 sides? (162°.) When students get stuck: A student counts n triangles (Ben's split from the middle). Ask: Which angles in your triangles are not corners of the polygon? Fix: Point at the angles round the middle point: a full turn, 360°. Take it off, or split from a corner instead. / A student draws lines from A to the corners next to it. Ask: Do those lines make a new triangle? Fix: Those lines are sides. Join A only to the corners that are not next to it. / A student thinks each angle of any pentagon is 108°. Ask: Is the pentagon on the board regular? What happens to one angle when you drag a corner? Fix: 108° is each angle of a regular pentagon only: 540° shared equally. The total is 540° for every pentagon. -->

<!-- Speaker note: Teacher: before the 1080° task ask students to predict the number of sides, then use More sides to check. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ten sides

**What do the angles of a 10-sided polygon add to?**

* Answer: 1440

<!-- Speaker note: (10 − 2) × 180° = 1440°. -->

<!-- Speaker note: Teacher: the 'backwards' question plants 5 (the number of triangles). Ask: how many sides make 5 triangles? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Equal angles

**A regular hexagon has 6 equal angles. How big is each one?**

* Answer: 120

<!-- Speaker note: The angles add to 720°, so each is 720° ÷ 6 = 120°. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Backwards

**A polygon's angles add to $900°$. How many sides does it have?**

* Answer: 7

<!-- Speaker note: 900° ÷ 180° = 5 triangles, and a shape with 7 sides makes 7 − 2 = 5 triangles. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review

**Review: a triangle has angles $35°$ and $75°$, and a third angle. Do the three add to more than, less than, or exactly $180°$?**

- Exactly $180°$
- Less than $180°$: $35 + 75 = 110$
- It depends on the third angle

* Answer: Exactly $180°$

<!-- Speaker note: Every triangle's angles add to 180°, so the third angle is 180° − 110° = 70°. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: from a total to a shape

Work it out first, then use **More sides** to check.

Stretch: why can no polygon have angles that add to $1000°$?

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/angles/polygon-angles/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building a shape from a given total reverses the lesson: from the angle sum back to the number of triangles and sides. Hints, in order: How many lots of 180° make 1260°? / That is the number of triangles. A shape has 2 more sides than triangles. -->

<!-- Speaker note: Teacher: collect answers and reasons. Then the stretch: 1000 is not a multiple of 180. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Find the angle sum of a heptagon (7 sides), and explain your method.**

* 900°. From one corner it splits into 7 − 2 = 5 triangles, and 5 × 180° = 900°.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next in class: finding unknown angles in triangles and polygons, giving the angle rule as the reason (node 3). Where it leads: exterior angles (they add to 360° for any convex polygon), which regular polygons tessellate, and the turtle: a closed shape turns 360° in total, which the coding pathway uses for its polygons. -->
