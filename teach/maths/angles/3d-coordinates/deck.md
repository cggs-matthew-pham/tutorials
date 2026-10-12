---
marp: true
theme: default
html: true
---

# Coordinates in 3D

Angles and shapes · Solids

<!-- Speaker note: Students plot and read points (x, y, z) on 3D axes, and use 3D systems for drones, buildings, planes and 3D printers (AC9M8SP03, nodes 1 and 2). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** a third axis, z, gives a point in space three coordinates (x, y, z). Real systems do the same with other names: a drone, a building, a plane's latitude, longitude and altitude, and a 3D printer.

- I can plot and read a point (x, y, z) in 3D.
- I can say what each coordinate means in a real system, such as a drone's position.
- I can describe positions with latitude, longitude and altitude.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need the Cartesian plane (Year 7 transformations) and views of solids. The one idea: one more axis, at right angles to the other two, gives one more number; the order is always x, y, z. The common mistake is putting the height first or in the order it was read (Kim's mistake). The board draws the axes in isometric projection, so a point can look like two different points; the dashed path and the label settle it. A corner of the room makes a good real set of axes: two floor edges and the vertical edge. Wider: plan a 3D printer's path for a small box, or describe a position in a game such as Minecraft (which puts y up: a different convention, which is fine once it is stated). -->

---

## Why it matters

> Two drones are both above the same spot in a park. How can a controller tell where each one is, so they don't crash? Two numbers are not enough.

<!-- Speaker note: On a flat grid, a point has two coordinates, $(x, y)$. To describe a point in **space**, add a third axis, $z$, at right angles to both. How do three numbers fix a point? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A point is at (2, 5, 3). How far up is it?**

- 2
- 3
- 5

<!-- Speaker note: What happens: 3. The third number, z, is the height. The point is 2 along x and 5 along y. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask which number tells the height. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2F3d-coordinates%2Fstep-2&code=widget%3A+space3d%0Aslider+x%3A+0%2C+6%2C+0%0Aslider+y%3A+0%2C+6%2C+0%0Aslider+z%3A+0%2C+6%2C+0%0Atarget%3A+3%2C+2%2C+4%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/angles/3d-coordinates/?full=step-2#step-2)

<!-- Speaker note: The blue axis is x, the orange is y and the purple points up (z). The dashed path shows how to get from the origin to P. -->

<!-- Speaker note: Teacher: ask what each slider changes, and what stays the same. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3. The third number, z, is the height. The point is 2 along x and 5 along y.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Reading a point

Here is the routine.

$$\text{5 along } x$$

1) $\text{0 along } y$ — The second number: no distance is 0.
2) $\text{2 up}$ — The third number, z.
3) $(5, 0, 2)$ — Write them in order, in brackets.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 5 along x and say "The first number." Line 1: write 0 along y and say "The second number: no distance is 0." Line 2: write 2 up and say "The third number, z." Line 3: write (5, 0, 2) and say "Write them in order, in brackets." -->

<!-- Speaker note: Teacher: ask Kim where (3, 5, 2) actually is. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Reading a point

**P is 4 along the x-axis, 1 along the y-axis and 6 up. What are its coordinates?**

- (4, 6, 1)
- (6, 4, 1)
- (1, 4, 6)
- (4, 1, 6)

* Answer: (4, 1, 6)

<!-- Speaker note: Always x, then y, then z: (4, 1, 6). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Kim records a drone's position. Click the line where she goes wrong.**

```
 1  A drone is 5 m east (x), 2 m north (y) and 3 m up (z) from its base.
 2  Kim writes its position as (3, 5, 2), with the height first because it matters most.
 3  Anyone reading (3, 5, 2) would put the drone 3 m east, 5 m north and 2 m up.
```

* Answer: line 2

<!-- Speaker note: Line 2: the order is always (x, y, z), so the drone is at (5, 2, 3). Anyone reading (3, 5, 2) puts it 3 m east and 2 m up. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Latitude, longitude and altitude

**A plane's position is given as latitude 34° S, longitude 151° E and altitude 10 000 m. Which number plays the part of z?**

- The longitude
- The altitude
- The latitude
- None of them

* Answer: The altitude

<!-- Speaker note: Latitude and longitude place it over the ground; altitude says how high, like z. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Boxes, axes and floors



- **A box of 24:** 
- **On the z-axis:** 
- **Floors:** 
- **z = 0:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/angles/3d-coordinates/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A box from the origin to P has edges x, y and z; a point on an axis has two zeros; a building's floors give z in a real system. Hints, in order: The box's volume is x × y × z. For students who need more support: Use the corner of a room or a box: point along each edge in turn while saying the coordinate. For early finishers: Find the distance from the origin to (3, 4, 12) by using Pythagoras twice. The hard part, on purpose: Seeing depth on a flat picture. Ask students to trace the dashed path with a finger: along x, along y, then up. When students get stuck: A student writes the height first. Ask: What order did we agree: along, along, up? Fix: Always (x, y, z): the height is last. / A student reads a point from the picture by where it seems to sit. Ask: Follow the dashed path: how far along each axis? Fix: Read the path, not the position on the screen. / A student thinks floor 4 is 15 m up (counting the ground floor). Ask: How many floors above the ground floor is floor 4? Fix: Ground floor is 0, so floor 4 is 4 × 3 m. -->

<!-- Speaker note: Teacher: ask why a box from the origin has edges x, y and z. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A plane climbs

**A plane is at latitude 33.9° S, longitude 151.2° E and altitude 9000 m. It climbs straight up 1000 m. Where is it now?**

- 33.9° S, 152.2° E, 9000 m
- 33.9° S, 151.2° E, 10 000 m
- 34.9° S, 151.2° E, 9000 m
- 33.9° S, 151.2° E, 1000 m

* Answer: 33.9° S, 151.2° E, 10 000 m

<!-- Speaker note: Only the altitude changes: 9000 + 1000 = 10 000 m. Latitude and longitude still place it over the same spot (near Sydney). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Flying up

**A drone at (6, 4, 10) flies straight up 5 m. What is its new z-coordinate?**

* Answer: 15

<!-- Speaker note: Up changes only z: 10 + 5 = 15. x and y stay 6 and 4. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A 3D printer

**A 3D printer's nozzle is at (20, 35, 2) mm. It prints the next layer 0.2 mm higher. Where is it?**

- (20.2, 35, 2)
- (20.2, 35.2, 2.2)
- (20, 35, 2.2)
- (20, 35.2, 2)

* Answer: (20, 35, 2.2)

<!-- Speaker note: A new layer is higher, so only z changes: 2 + 0.2 = 2.2 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: views

**Review: a pile of cubes is seen from above, from the front and from the side. Which view shows how tall the pile is?**

- All three equally
- The top view
- The front view (or the side view)
- None of them

* Answer: The front view (or the side view)

<!-- Speaker note: From above you see the floor (x and y); from the front or side you see the heights (z). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a corner of a box

Then write the coordinates of all eight corners of the box, and check two of them on the board.

[Open this step](https://tutorials.learningwaypoints.com/maths/angles/3d-coordinates/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Placing P to make a given box joins coordinates, edges and the box's corners. Hints, in order: The box goes from the origin to P, so P is the far top corner. / Its edges are x, y and z long. -->

<!-- Speaker note: Teacher: ask for one corner on the floor and one on the z-axis. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A drone is 8 m east, 3 m north and 20 m up from its base, with x east, y north and z up. Write its position. Then it flies 5 m north: where is it now?**

* (8, 3, 20), then (8, 8, 20).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This covers AC9M8SP03. Where it leads: 3D modelling and games in Digital Technologies, vectors in senior mathematics, and Pythagoras in 3D (Year 10). -->
