---
marp: true
theme: default
html: true
---

# Laser cutting and kerf

Parametric design · Linked dimensions

<!-- Speaker note: An optional lesson. Students see a 3 mm slot cut wider than 3 mm, draw slots narrower for a press fit, work the drawn size back from the board and the kerf, cut a test comb on the school laser, and find a fit for a different board and kerf. About 35 minutes (Predict and Try 5 min · Worked example 8 min · Vary 4 min · Test comb (teacher-led) · Practise and Make 8 min). -->

---

## Today

**We are learning to** a laser beam burns away a thin strip as it cuts: the kerf. So a cut slot comes out wider than drawn (by the kerf) and a cut-out part a little smaller. Draw slots narrower than the board for a snug press fit.

- I can explain what kerf is and how it changes a cut.
- I can draw a slot for a press fit.

<!-- Speaker note: Before class: Laser cutter use is supervised, with approved materials only (no PVC or vinyl: chlorine gas). Kerf depends on the machine, focus, power and material: measure yours. The board treats kerf as making slots wider by the full kerf (each edge loses half). Teacher: Test comb: the teacher runs the cutter. -->

---

## Why it matters

> A laser cutter is accurate to a tenth of a millimetre, yet your flat-pack box falls apart without glue. Where did the fit go?

<!-- Speaker note: **Kerf** is the width of material the beam burns away, typically 0.1–0.3 mm on a school laser. A slot is cut on both edges, so it comes out **kerf wider** than drawn. The same fit classes as printing apply: under 0 won't go in, 0–0.15 mm press fit, 0.15–0.4 mm sliding, more is loose. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A slot is drawn 3 mm wide for 3 mm plywood. The laser's kerf is 0.2 mm. The plywood…**

- Slides in with a little play
- Fits perfectly tight
- Won't go in
- Falls straight through

<!-- Speaker note: What happens: It slides in with play: the slot is cut 3.2 mm wide, 0.2 mm more than the board. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: pass round a loose test joint. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fparametric%2Fkerf%2Fstep-2&code=widget%3A+fab%0Amode%3A+kerf%0Aboard%3A+3%0Aslot%3A+3%0Akerf%3A+0.2%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/parametric/kerf/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It slides in with play: the slot is cut 3.2 mm wide, 0.2 mm more than the board.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Back from the board

$$\text{cut slot} = \text{drawn} + \text{kerf}$$

1) $\text{want: board} + 0.05 = 3.05$ — A press fit.
2) $\text{drawn} = 3.05 - 0.2 = 2.85$ — Take off the kerf.
3) $\text{measure your kerf}$ — Cut a 10 mm square, measure it: it is about a kerf smaller.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write cut slot = drawn + kerf and say "Both edges of the slot lose half the kerf." Line 1: write want: board + 0.05 = 3.05 and say "A press fit." Line 2: write drawn = 3.05 - 0.2 = 2.85 and say "Take off the kerf." Line 3: write measure your kerf and say "Cut a 10 mm square, measure it: it is about a kerf smaller." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Back from the board

**3 mm board, 0.2 mm kerf, 0.05 mm clearance wanted. Draw the slot (mm)?**

* Answer: 2.85

<!-- Speaker note: Cut slot = 3 + 0.05 = 3.05; drawn = 3.05 − 0.2 = 2.85 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's joints all wobble. Click the line where Sam's reasoning first goes wrong.**

```
 1  The plywood is 3 mm thick.
 2  The laser cuts exactly along the lines I draw.
 3  So a 3 mm slot fits 3 mm plywood perfectly.
 4  Sam's box wobbles and needs glue at every joint.
```

* Answer: line 2

<!-- Speaker note: Line 2: the beam has a width. It burns away about the kerf, so a 3 mm slot is cut wider than 3 mm. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a finer beam



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/parametric/kerf/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A different kerf changes the drawn size for the same fit: measure your own cutter. For students who need more support: A card: drawn = board + clearance − kerf. For early finishers: Make the slot width a variable in your parametric model: #board - #kerf + #fit. The hard part, on purpose: The kerf is too small to see. Cut a 10 mm square, measure it with calipers, and pass it round. When students get stuck: A student adds the kerf to the drawn slot. Ask: Does the laser make the slot bigger or smaller than drawn? Fix: Bigger, so draw it smaller. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Cut a test comb



<!-- Speaker note: What this step is for: A kerf test comb (slots stepping by 0.05 mm) gives the school cutter's real numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A square

**A 50 mm square is cut with a 0.2 mm kerf. About how wide is the cut square (mm)?**

* Answer: 49.8

<!-- Speaker note: Half the kerf off each edge: 50 − 0.2 = 49.8 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Finger joints

**Finger joints come out loose. What do you change?**

- Make the fingers wider and the gaps narrower by about the kerf
- Glue them
- Cut slower
- Use thicker sheet

* Answer: Make the fingers wider and the gaps narrower by about the kerf

<!-- Speaker note: Allow for the kerf in the drawing: wider fingers, narrower gaps. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: thicker board



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/parametric/kerf/?full=step-7#step-7)

<!-- Speaker note: What this step is for: A new board and kerf needs the whole calculation again. Hints, in order: Cut slot = drawn + 0.25; you want 6.0 to 6.15. / Drawn 5.75 to 5.9. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a laser-cut slot come out wider than drawn?**

* The beam burns away a strip of material (the kerf), so each edge of the slot moves out.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Back to Capstone projects (an enclosure or a chassis), or Design and print. -->
