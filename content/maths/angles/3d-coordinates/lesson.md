---
order: 21
unit: solids
node: [AC9M8SP03 n1, AC9M8SP03 n2]
uses: [AC9M7SP03 n1, AC9M7SP01 n2]
title: Coordinates in 3D
summary: "A third axis, z, gives a point in space three coordinates (x, y, z). Real systems do the same with other names: a drone, a building, a plane's latitude, longitude and altitude, and a 3D printer."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two drones are both above the same spot in a park. How can a controller tell where each one is, so they don't crash? Two numbers are not enough."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8327
  url: http://127.0.0.1:8327/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: space.yml#explain-pic, caption: "P (3, 2, 4): 3 along x, 2 along y, then 4 up the z-axis." }
explainClip:
  query: { code: "@space.yml#explain", fresh: 1, id: explain }
  caption: "Three coordinates"
  say: "Along x, along y, then up."
  clip:
    - caption: { text: "Start at the origin, (0, 0, 0). Go 3 along x.", say: "Start at the origin. Go three along x." }
    - click: Make x bigger
    - click: Make x bigger
    - click: Make x bigger
    - caption: { text: "Then 2 along y: (3, 2, 0), still on the floor.", say: "Then two along y. Still on the floor." }
    - click: Make y bigger
    - click: Make y bigger
    - caption: { text: "Then 4 up the z-axis: P is (3, 2, 4).", say: "Then four up. P is three, two, four." }
    - click: Make z bigger
    - click: Make z bigger
    - click: Make z bigger
    - click: Make z bigger
    - expect: { selector: "#gsum", contains: "(3, 2, 4)" }
    - wait: 1400
---
On a flat grid, a point has two coordinates, $(x, y)$. To describe a point in **space**, add a third axis, $z$, at right angles to both. How do three numbers fix a point?

## Predict: how high?

```step
stage: predict
insight: "Committing to which number gives the height shows whether they read the coordinates in order."
check:
  type: predict
  q: "A point is at (2, 5, 3). How far up is it?"
  options: ["3", "5", "2"]
  actual: "3. The third number, z, is the height. The point is 2 along x and 5 along y."
```

The $z$-axis points up. A point is $(x, y, z)$:

- $x$: how far along the x-axis
- $y$: how far along the y-axis
- $z$: how far up

The **origin** is $(0, 0, 0)$. Points with $z = 0$ are on the floor (the x-y plane). The order is always $x$, then $y$, then $z$.

Real systems use the same idea with other names:

| System | Three numbers |
|---|---|
| a drone | metres east, metres north, metres up |
| a building | metres across, metres back, metres up (about 3 m a floor) |
| a plane | latitude, longitude, altitude |

Each real system has its own fixed order. Latitude (how far north or south) is always written before longitude (how far east or west), then altitude.

## Run: reach Q

```step
stage: run
insight: "Moving P along each axis in turn shows that each coordinate is one independent direction."
try: { playground: board, starter: "space.yml#run", height: 680 }
check: { type: board, text: "Move P onto the ring Q at (3, 2, 4), one axis at a time. Which slider moved P up, as you predicted?", when: "d = 1", explain: "x = 3 along, y = 2 along, z = 4 up. The dashed lines show the three moves." }
```

The blue axis is x, the orange is y and the purple points up (z). The dashed path shows how to get from the origin to P.

## Investigate: reading points

```step
stage: investigate
insight: "Write (x, y, z) in that order whatever the context; putting the height first is the slip (Kim); latitude, longitude and altitude are a 3D system too."
tasks:
  - check:
      type: question
      q: "P is 4 along the x-axis, 1 along the y-axis and 6 up. What are its coordinates?"
      options: ["(4, 1, 6)", "(6, 4, 1)", "(4, 6, 1)", "(1, 4, 6)"]
      answer: 0
      feedback: [null, "The height goes last.", "y is 1, and the height (6) goes last.", "x comes first."]
      explain: "Always x, then y, then z: (4, 1, 6)."
  - check:
      type: bug
      code: "working.txt#kim"
      text: "Kim records a drone's position. Click the line where she goes wrong."
      answer: 2
      fault: logic
      misconception: coord3d-order
      explain: "Line 2: the order is always (x, y, z), so the drone is at (5, 2, 3). Anyone reading (3, 5, 2) puts it 3 m east and 2 m up."
  - check:
      type: question
      q: "A plane's position is given as latitude 34° S, longitude 151° E and altitude 10 000 m. Which number plays the part of z?"
      options: ["The altitude", "The latitude", "The longitude", "None of them"]
      answer: 0
      feedback: [null, "Latitude says how far north or south.", "Longitude says how far east or west.", "Three numbers fix the plane's position."]
      explain: "Latitude and longitude place it over the ground; altitude says how high, like z."
```

### Reading a point

Here is the routine.

```worked
\text{5 along } x :: The first number.
\text{0 along } y :: The second number: no distance is 0.
\text{2 up} :: The third number, z.
(5, 0, 2) :: Write them in order, in brackets.
```

### Find the mistake

Read Kim's working. Which number is the height?

### Latitude, longitude and altitude

## Modify: boxes, axes and floors

```step
stage: modify
insight: "A box from the origin to P has edges x, y and z; a point on an axis has two zeros; a building's floors give z in a real system."
try: { playground: board, starter: "space.yml#box", height: 680 }
tasks:
  - starter: "space.yml#box"
    hint: "The box's volume is x × y × z."
    check: { type: board, text: "Move P so the box from the origin to P has a volume of 24 cubic units.", when: "v = 24", explain: "Such as P (2, 3, 4) or (4, 3, 2): its edges are x, y and z long, and 2 × 3 × 4 = 24." }
  - starter: "space.yml#free"
    check: { type: board, text: "Put P on the z-axis, 5 units up.", when: "x = 0 and y = 0 and z = 5", explain: "(0, 0, 5): no distance along x or y, so it is on the z-axis." }
  - check:
      type: number
      q: "In an apartment building, the ground floor is 0 m up and each floor is 3 m higher than the one below. A flat is on floor 4. What is its z-coordinate, in metres?"
      answer: 12
      tolerance: 0
      feedback:
        - ["15", "Floor 0 is the ground floor, so floor 4 is 4 floors up."]
      explain: "4 floors × 3 m = 12 m up."
  - check:
      type: question
      q: "Where are all the points with z = 0?"
      options: ["On the floor: the x-y plane", "On the z-axis", "At the origin only", "Nowhere"]
      answer: 0
      feedback: [null, "Points on the z-axis have x = 0 and y = 0.", "The origin is one of them; there are many more.", "Any point with no height has z = 0."]
      explain: "No height means the point is on the flat x-y plane."
```

### A box of 24

### On the z-axis

### Floors

### z = 0

## Practise: 3D positions

```step
stage: practise
insight: "Reading and writing 3D positions in several contexts (a plane, a drone, a 3D printer), mixed; the views review links to solids."
tasks:
  - check:
      type: question
      q: "A plane is at latitude 33.9° S, longitude 151.2° E and altitude 9000 m. It climbs straight up 1000 m. Where is it now?"
      options: ["33.9° S, 151.2° E, 10 000 m", "34.9° S, 151.2° E, 9000 m", "33.9° S, 152.2° E, 9000 m", "33.9° S, 151.2° E, 1000 m"]
      answer: 0
      feedback: [null, "Climbing doesn't move it north or south.", "Climbing doesn't move it east or west.", "It climbs 1000 m more: add it."]
      explain: "Only the altitude changes: 9000 + 1000 = 10 000 m. Latitude and longitude still place it over the same spot (near Sydney)."
  - check:
      type: number
      q: "A drone at (6, 4, 10) flies straight up 5 m. What is its new z-coordinate?"
      answer: 15
      tolerance: 0
      feedback:
        - ["11", "Straight up changes only z: 10 + 5."]
      explain: "Up changes only z: 10 + 5 = 15. x and y stay 6 and 4."
  - check:
      type: question
      q: "A 3D printer's nozzle is at (20, 35, 2) mm. It prints the next layer 0.2 mm higher. Where is it?"
      options: ["(20, 35, 2.2)", "(20.2, 35, 2)", "(20, 35.2, 2)", "(20.2, 35.2, 2.2)"]
      answer: 0
      feedback: [null, "Higher means z.", "Higher means z.", "Only the height changes."]
      explain: "A new layer is higher, so only z changes: 2 + 0.2 = 2.2 mm."
  - check:
      type: question
      q: "Review: a pile of cubes is seen from above, from the front and from the side. Which view shows how tall the pile is?"
      options: ["The front view (or the side view)", "The top view", "None of them", "All three equally"]
      answer: 0
      feedback: [null, "From above you see only how much floor it covers.", "The front and side views show heights.", "The top view shows no heights."]
      explain: "From above you see the floor (x and y); from the front or side you see the heights (z)."
```

### A plane climbs

### Flying up

### A 3D printer

### Review: views

## Make: a corner of a box

```step
stage: make
insight: "Placing P to make a given box joins coordinates, edges and the box's corners."
try: { playground: board, starter: "space.yml#box", height: 680 }
hint: ["The box goes from the origin to P, so P is the far top corner.", "Its edges are x, y and z long."]
check: { type: board, text: "Make a box 4 units along x, 1 along y and 3 high.", when: "x = 4 and y = 1 and z = 3", explain: "P = (4, 1, 3), the corner furthest from the origin. Its volume is 12 cubic units." }
```

Then write the coordinates of all eight corners of the box, and check two of them on the board.
