---
marp: true
theme: default
html: true
---

# Design to a dimension

Design and print · Designing to size

<!-- Speaker note: Students find a box's inside size from its outside and walls, design a case for an Uno from the part outwards (part, gap, wall), meet Sam's one-wall slip, change the wall thickness, build the case in Tinkercad 3D by typed dimensions, and find the smallest case that fits. About 40 minutes (Predict and Try 6 min · Worked example 8 min · Vary 6 min · Tinkercad 12 min · Practise and Make 8 min). Sources: Tinkercad 3D lessons (link), https://www.tinkercad.com/learn (checked 12 October 2026); Arduino Uno Rev3 dimensions (68.6 × 53.4 mm; link), https://docs.arduino.cc/hardware/uno-rev3/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a box has a wall on every side, so its inside is the outside minus two walls. To fit something inside, start from the thing: its size, plus a gap each side, plus a wall each side, gives the outside.

- I can work out a box's inside from its outside and walls.
- I can design a case from the part outwards.
- I can set exact sizes in Tinkercad.

<!-- Speaker note: Before class: The board is a 2D top view; heights work the same way (a floor and a lid instead of side walls). Measure the real part with calipers if you have them: published sizes don't include sockets that stick out (the Uno's USB and power sockets do). Tinkercad: the same class code as Circuits. Teacher: Worked example: write it outwards, live. Teacher: Tinkercad: ask why the hole box is placed 2 mm in and up. -->

---

## Why it matters

> Your Arduino needs a case. You print a box 'about the right size', and it's 2 mm too small. Plastic is cheap; your time and the printer's aren't. How do you get it right first time?

<!-- Speaker note: Every measurement here is in **millimetres**. In Tinkercad you set a shape's size by typing in its dimension boxes, and you make a hollow box by grouping a solid box with a slightly smaller "hole" box. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A box is 40 mm wide on the outside, with 2 mm walls. How wide is the inside?**

- 38 mm
- 42 mm
- 40 mm
- 36 mm

<!-- Speaker note: What happens: 36 mm: 40 − 2 − 2. There is a wall on the left and one on the right. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw a box on the board and point at both walls. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fcad%2Fdimension%2Fstep-2&code=widget%3A+fab%0Amode%3A+box%0Awidth%3A+60%0Adepth%3A+50%0Awall%3A+2%0Aobject%3A+none%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/cad/dimension/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 36 mm: 40 − 2 − 2. There is a wall on the left and one on the right.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## From the part outwards

Now the depth.

$$\text{Uno width} = 68.6$$

1) $68.6 + 2 \times 1 = 70.6$ — A 1 mm gap on each side: the inside width.
2) $70.6 + 2 \times 2 = 74.6$ — A 2 mm wall on each side: the outside width.
3) $74.6 \to 75$ — Round up to a size you can set (never down).

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Uno width = 68.6 and say "Start from what goes inside." Line 1: write 68.6 + 2 × 1 = 70.6 and say "A 1 mm gap on each side: the inside width." Line 2: write 70.6 + 2 × 2 = 74.6 and say "A 2 mm wall on each side: the outside width." Line 3: write 74.6 75 and say "Round up to a size you can set (never down)." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## From the part outwards

**The Uno is 53.4 mm deep. With a 1 mm gap and a 2 mm wall each side, how deep is the case outside (mm)?**

* Answer: 59.4

<!-- Speaker note: 53.4 + 2 × 1 + 2 × 2 = 59.4 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's 57 mm part won't go in. Click the line where Sam's working first goes wrong.**

```
 1  The box is 60 mm wide on the outside.
 2  The walls are 2 mm thick.
 3  So the inside is 60 − 2 = 58 mm wide.
 4  A 57 mm part will fit with 1 mm to spare.
```

* Answer: line 3

<!-- Speaker note: Line 3: there is a wall on each side, so the inside is 60 − 2 − 2 = 56 mm. The 57 mm part is 1 mm too big. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **The case:** 
- **Thicker walls:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/cad/dimension/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Designing the case on the board, then changing only the wall, shows the outside must grow by twice the change to keep the same gap. For students who need more support: A drawn cross-section with part, gap and wall labelled on both sides. For early finishers: Add holes in the case wall for the Uno's USB and power sockets, measured from the board's edge. The hard part, on purpose: Students drag shapes to 'about right'. Make typing dimensions the rule. When students get stuck: A student's case is 2 mm too small. Ask: How many walls does a box have across its width? Fix: Two: subtract (or add) both. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Building the hollow box in Tinkercad by typing dimensions (not dragging) is the habit that makes parts fit. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inside

**A box is 80 mm outside with 2.5 mm walls. Inside width (mm)?**

* Answer: 75

<!-- Speaker note: 80 − 2.5 − 2.5 = 75 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Outside

**A 30 mm part, a 0.5 mm gap each side, 2 mm walls. Outside width (mm)?**

* Answer: 35

<!-- Speaker note: 30 + 2 × 0.5 + 2 × 2 = 35 mm. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the smallest case



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/cad/dimension/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Finding the smallest case that still fits reverses the process: start from a limit and work back to the dimensions. Hints, in order: Walls 1.5 mm, gap at least 0.5 mm on the tightest side. / Width: 68.6 + 2 × 0.5 + 2 × 1.5 = 72.6, so 73 on a 0.5 mm slider. / Depth: 53.4 + 1 + 3 = 57.4, so 57.5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A part is 50 mm wide. With a 1 mm gap and 3 mm walls, how wide is the case outside?**

* 50 + 2 × 1 + 2 × 3 = 58 mm.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Parts that fit (clearance and tolerance). -->
