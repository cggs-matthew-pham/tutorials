---
marp: true
theme: default
html: true
---

# Parts that fit

Design and print · Designing to size

<!-- Speaker note: Students see that a same-size peg and hole won't fit once printed, open the hole up to a sliding fit, work out a hole size from the peg, the printer's effect and the clearance wanted, design a press fit and a different peg size, print a tolerance test card, and design a lid peg's hole. About 40 minutes (Predict and Try 5 min · Worked example 10 min · Vary 6 min · Test card (print runs while you continue) · Practise and Make 10 min). -->

---

## Today

**We are learning to** drawn the same size, a printed peg won't go in its hole: printers make holes smaller and pegs bigger. Plan a clearance: about 0.2–0.4 mm for a sliding fit, less for a tight press fit. Every printer differs, so calibrate with a test card.

- I can explain why same-size parts don't fit when printed.
- I can work out a hole size for a sliding or press fit.
- I can calibrate a design to our printer with a test card.

<!-- Speaker note: Before class: The board's printer effect (holes −0.2 mm, pegs +0.1 mm) is typical of a 0.4 mm nozzle FDM printer, not exact. Print a tolerance test card on each school printer once and pin up the results: that replaces the board's numbers. Small holes print proportionally worse than large ones; vertical holes worse than horizontal. Teacher: Worked example: two corrections, two lines. Teacher: Test card: start the print early in the lesson. -->

---

## Why it matters

> The lid you designed is exactly the size of the box's opening. You print both, and the lid won't go on. Nothing was measured wrongly. What happened?

<!-- Speaker note: **Clearance** is the gap between parts that fit together. **Tolerance** is how far a real size can be from the drawn size. A typical FDM printer squashes each line of plastic outwards a little, so **holes print about 0.2 mm smaller** and **pegs about 0.1 mm bigger**. (Yours may differ: that's what a test card is for.) | printed clearance | fit | |---|---| | under 0 | won't go in | | 0 to 0.15 mm | press fit (tight, stays put) | | 0.15 to 0.4 mm | sliding fit | | over 0.4 mm | loose (wobbles) | -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A 10 mm peg and a 10 mm hole are printed. The peg…**

- Fits perfectly
- Won't go in
- Fits, but only one way round
- Slides in loosely

<!-- Speaker note: What happens: It won't go in: the hole prints at about 9.8 mm and the peg at about 10.1 mm. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: pass round a printed peg and hole drawn the same size, if you have one. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fcad%2Ffit%2Fstep-2&code=widget%3A+fab%0Amode%3A+fit%0Apeg%3A+10%0Ahole%3A+10%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/cad/fit/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It won't go in: the hole prints at about 9.8 mm and the peg at about 10.1 mm.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Work it out

Now check it with the numbers.

$$\text{peg drawn } 10 \to \text{printed } 10.1$$

1) $\text{want clearance } 0.3$ — A sliding fit.
2) $\text{hole printed} = 10.1 + 0.3 = 10.4$ — The hole must come out this big.
3) $\text{hole drawn} = 10.4 + 0.2 = 10.6$ — Holes print 0.2 mm smaller, so draw it bigger.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write peg drawn 10 printed 10.1 and say "Pegs print about 0.1 mm bigger." Line 1: write want clearance 0.3 and say "A sliding fit." Line 2: write hole printed = 10.1 + 0.3 = 10.4 and say "The hole must come out this big." Line 3: write hole drawn = 10.4 + 0.2 = 10.6 and say "Holes print 0.2 mm smaller, so draw it bigger." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Work it out

**A 10 mm peg, a sliding fit with 0.3 mm of clearance after printing. What size should the hole be drawn (mm)?**

* Answer: 10.6

<!-- Speaker note: printed peg 10.1, so the printed hole must be 10.4; drawn 10.4 + 0.2 = 10.6 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's lid peg won't go in its hole. Click the line where Sam's reasoning first goes wrong.**

```
 1  The lid's peg is 10 mm across.
 2  So the hole in the box should be 10 mm across too.
 3  Same size means a perfect fit.
 4  Sam prints both and the peg won't go in.
```

* Answer: line 2

<!-- Speaker note: Line 2: the hole needs a planned clearance. Drawn the same, the printed hole is smaller than the printed peg. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **Press fit:** 
- **A 6 mm peg:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/cad/fit/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A press fit needs less clearance, and a different peg size needs the same added clearance, not the same hole. For students who need more support: A card: hole drawn = peg + 0.1 + clearance + 0.2. For early finishers: Design a snap-fit lid: a small ridge on the peg and a groove in the hole. The hard part, on purpose: The two printer corrections (hole −0.2, peg +0.1) blur. Write them as two lines every time. When students get stuck: A student adds only the clearance. Ask: What does the printer do to the hole, and to the peg? Fix: Add 0.2 for the hole and 0.1 for the peg too. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Print a test card



<!-- Speaker note: What this step is for: A tolerance test card turns the board's typical numbers into your printer's real ones. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Will it go in?

**A 5 mm peg, hole drawn 5.2 mm. Printed clearance, and fit?**

- −0.1 mm: won't go in
- 0.5 mm: loose
- 0.2 mm: sliding fit
- 0.1 mm: press fit

* Answer: −0.1 mm: won't go in

<!-- Speaker note: Hole prints 5.0, peg 5.1: −0.1 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Press fit

**A 12 mm peg, a press fit with 0.1 mm of clearance after printing. Hole drawn (mm)?**

* Answer: 12.4

<!-- Speaker note: Peg prints 12.1; hole must print 12.2; draw 12.4. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a lid peg



[Open this step](https://tutorials.learningwaypoints.com/engineering/cad/fit/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Designing a hole for a given peg and clearance range applies the whole calculation. Hints, in order: The peg is 8 mm. Work out the hole for 0.2 and for 0.3 mm of clearance. / 8.1 + 0.2 + 0.2 = 8.5; 8.1 + 0.3 + 0.2 = 8.6. / Set the hole between 8.5 and 8.6. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why won't a 10 mm printed peg go in a 10 mm printed hole?**

* The printer makes holes smaller and pegs bigger, so the printed hole is smaller than the printed peg.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Design for the printer (which way up). -->
