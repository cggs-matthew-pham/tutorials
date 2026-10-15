---
marp: true
theme: default
html: true
---

# Slicer trade-offs

Design and print · Designing for the printer

<!-- Speaker note: Students halve the layer height and see the time double, compare infill and walls on time and strength, see Sam's 100% infill take three hours, slice a real part one setting at a time, sort parts by the setting that matters, and meet a strength-and-time brief. About 40 minutes (Predict and Try 6 min · Worked example 8 min · Real slicer 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** the slicer's settings trade time and plastic for finish and strength. Halving the layer height doubles the time. Infill past about 20–30% costs a lot for little strength; extra walls add more strength for less.

- I can predict how layer height, infill and walls change a print.
- I can choose settings for what a part needs.

<!-- Speaker note: Before class: The board is a simple model of a 40 × 40 × 20 mm block (PLA, 1.24 g/cm³): time grows with plastic and with 1 ÷ layer height; strength grows mostly with walls. Real numbers depend on the printer, speed and part shape; the slicer step replaces them with yours. Printer time is the bottleneck: set a maximum print time per student. Teacher: Worked example: let students test each option on the board first. -->

---

## Why it matters

> The printer queue is a week long and your part takes four hours. Which settings can you change without making it worse, and which actually matter?

<!-- Speaker note: The **slicer** turns a 3D model into layers and a path for the nozzle. The three settings that matter most: - **Layer height**: thinner layers give a smoother finish, but there are more of them. - **Infill**: how full the inside is (0% hollow, 100% solid). - **Walls** (perimeters): how many lines thick the outside is. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A part takes 80 minutes at 0.2 mm layers. At 0.1 mm layers it takes about…**

- 160 minutes
- 40 minutes
- 90 minutes
- 80 minutes

<!-- Speaker note: What happens: About 160 minutes: twice as many layers, each taking about as long. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask why thinner layers would take longer. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fcad%2Fslicer%2Fstep-2&code=widget%3A+fab%0Amode%3A+slicer%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/cad/slicer/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* About 160 minutes: twice as many layers, each taking about as long.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Walls or infill?

Now pick the best buy.

$$\text{layers } 0.2 \to 0.1$$

1) $\text{infill } 20\% \to 100\%$ — More than twice the time and plastic; strength rises a little.
2) $\text{walls } 2 \to 4$ — A little more time; strength rises a lot.
3) $\text{strong and quick}$ — More walls, modest infill, normal layers.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write layers 0.2 0.1 and say "Twice the layers: twice the time. Buys finish, not strength." Line 1: write infill 20\% 100\% and say "More than twice the time and plastic; strength rises a little." Line 2: write walls 2 4 and say "A little more time; strength rises a lot." Line 3: write strong and quick and say "More walls, modest infill, normal layers." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Walls or infill?

**From 2 walls and 20% infill, which change adds the most strength for the least extra time?**

- Halve the layer height
- Add two walls (4 walls, 20% infill)
- Raise infill to 100%
- Raise infill to 60%

* Answer: Add two walls (4 walls, 20% infill)

<!-- Speaker note: On the board: 4 walls gives strength 95 in about 106 minutes; 60% infill gives only 65 in about 137. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's print takes three hours and isn't much stronger. Click the line where Sam's reasoning first goes wrong.**

```
 1  Sam's bracket must be strong.
 2  More plastic inside means more strength.
 3  So Sam sets infill to 100%.
 4  The print takes three hours, and Sam misses the end of the lesson.
```

* Answer: line 2

<!-- Speaker note: Line 2: most of a part's strength is in its walls. Past about 20–30%, infill costs lots of time and plastic for little strength; add walls instead. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Slice it for real



<!-- Speaker note: What this step is for: The school's slicer gives the real time and grams for the same changes, so students calibrate the board's model. For students who need more support: A three-row table: setting, what it buys, what it costs. For early finishers: Infill patterns (grid, gyroid): find out what each is good for. The hard part, on purpose: Students max every setting. Keep asking what the part needs, and what each setting costs. When students get stuck: A student's settings take hours. Ask: Which setting is buying strength, and which is just adding plastic? Fix: More walls, less infill. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trade-offs

**Which setting matters most for each part?**

Groups: Thinner layers (finish) · More walls (strength) · Low infill (speed and plastic)

A display model to look at · A bracket that holds weight · A quick test print to check a fit · A figurine with fine detail · A hook for a heavy bag

* Answer: A display model to look at → Thinner layers (finish); A bracket that holds weight → More walls (strength); A quick test print to check a fit → Low infill (speed and plastic); A figurine with fine detail → Thinner layers (finish); A hook for a heavy bag → More walls (strength)

<!-- Speaker note: Choose the setting that buys what the part needs; everything else stays at the defaults. What this step is for: Choosing settings for different purposes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: strong and quick



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/cad/slicer/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Meeting two criteria at once (strength and time) forces the trade-off decision. Hints, in order: Infill costs time; walls buy strength. / Try lowering the infill and adding walls. / 4 walls and 0–10% infill at 0.2 mm layers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Your part must be strong and printed quickly. Which two settings do you change, and how?**

* More walls and lower infill (keep normal layer height).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Parametric design (Years 9–10), or a Capstone project's enclosure. -->
