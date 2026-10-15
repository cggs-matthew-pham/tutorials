---
marp: true
theme: default
html: true
---

# Route the traces

Your own board · From breadboard to board

<!-- Speaker note: Students route copper traces cell by cell, find that a trace can't touch another net (a short circuit), route the shield on one layer with a detour, then on two layers with a trace on the bottom, and compare the copper. About 45 minutes (Predict and Try 10 min · Worked example 8 min · Vary 12 min · Practise and Make 15 min). Sources: KiCad documentation: PCB editor (benchmark for the model; wording our own), https://docs.kicad.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** routing turns every ratsnest line into copper. Two traces of different nets can never touch, so where they must cross, one goes round or drops to the other side of the board. Students route the shield on one layer, then on two, and compare the copper.

- I can route copper traces that join every net without a short circuit.
- I can explain when a trace goes round and when it goes to the other layer.
- I can explain what a via is for.

<!-- Speaker note: Before class: The board model: one trace per grid cell per layer, through-hole pads on both layers, steps of one cell (no diagonals). Real tools route at angles of 45°, check gaps (clearance) between copper, and route at finer grids; KiCad and EasyEDA both have an interactive router that pushes other traces aside. Keyboard: the board can be focused (Tab); arrow keys move a cursor and Enter acts on the cell. Curriculum hooks: Design and Technologies, engineering principles and systems; Digital Technologies, digital systems (hardware). Teacher: Try: when GND is blocked, stop and ask for both answers (round, or under). Teacher: Vary: the one-layer route takes a while; let early finishers try a different GND path. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Two wires on a breadboard can cross in the air. Two copper traces that touch are a short circuit. How does GND get past OUT?

<!-- Speaker note: **Routing** draws copper along each ratsnest line. Click a pad to start a trace, then click one cell at a time to the next pad of the same net. The board refuses a step that would touch another net: that would be a **short circuit**. Most boards have copper on **two layers**: the top and the bottom. The pads of these parts go right through the board, so a trace on either side can reach them. A **via** is a small plated hole that takes a trace from one side to the other. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**GND must get from J1 to R2 and D1, but the OUT trace is in the way. On a board with copper on one side only, what can you do?**

- Leave GND unjoined
- Take GND the long way round the other parts
- Let GND cross OUT: copper is insulated
- Join GND and OUT where they cross

<!-- Speaker note: What happens: Go round. Copper traces are bare metal, so touching joins them. With two layers there is a second answer: go under, on the bottom. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: hold up two wires and ask what happens if two bare copper strips touch. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fpcb%2Froute%2Fstep-2&code=widget%3A+pcb%0Amode%3A+route%0Agrid%3A+14%2C+9%0Apart+J1%3A+header4+at+0%2C2+turn+1%0Apart+S1%3A+button+at+3%2C1%0Apart+R2%3A+resistor+at+8%2C1+turn+1%0Apart+R1%3A+resistor+at+3%2C7%0Apart+D1%3A+led+at+10%2C7%0Anet+VCC%3A+J1.1%2C+S1.1%0Anet+IN%3A+J1.2%2C+S1.2%2C+R2.1%0Anet+OUT%3A+J1.3%2C+R1.1%0Anet+LEDA%3A+R1.2%2C+D1.1%0Anet+GND%3A+J1.4%2C+R2.2%2C+D1.2%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/pcb/route/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Go round. Copper traces are bare metal, so touching joins them. With two layers there is a second answer: go under, on the bottom.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two ways past OUT

$$\text{Round (one layer):}$$

1) $\approx 47 \text{ cells} \times 2.54 \approx 119 \text{ mm of copper}$ — Long, but the board needs copper on one side only, which is cheaper.
2) $\text{Under (two layers):}$ — GND drops to the bottom layer at J1's pad and runs straight under OUT.
3) $\approx 37 \text{ cells} \times 2.54 \approx 94 \text{ mm}$ — Shorter and tidier; two-layer boards are standard and cost only a little more.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Round (one layer): and say "GND goes down J1's side, along the bottom edge, and back up to D1 and R2." Line 1: write 47 cells × 2.54 119 mm of copper and say "Long, but the board needs copper on one side only, which is cheaper." Line 2: write Under (two layers): and say "GND drops to the bottom layer at J1's pad and runs straight under OUT." Line 3: write 37 cells × 2.54 94 mm and say "Shorter and tidier; two-layer boards are standard and cost only a little more." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two ways past OUT

**A detour adds 9 cells of copper. How many extra mm is that, to 1 decimal place?**

* Answer: 22.9

<!-- Speaker note: 9 × 2.54 = 22.86 ≈ 22.9 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When you need a via

**A trace on the bottom must end at a surface-mount pad, which is only on the top. What does it need?**

- A via near the pad, to come up to the top
- Nothing: copper reaches both sides
- A second pad
- A wider trace

* Answer: A via near the pad, to come up to the top

<!-- Speaker note: Through-hole pads go through both layers. Surface-mount pads sit on one side, so a trace on the other side needs a via. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one side only



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/pcb/route/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Routing everything on one layer forces the detours, and makes the value of a second layer obvious. Hints, in order: Route the short nets first: VCC, LEDA, OUT. / IN can finish at S1's pad, then start again from it to reach R2. / GND can run down J1's side, along the bottom row and up the right. For students who need more support: Give the VCC and OUT paths as cell lists to follow, then let students route GND. For early finishers: Route the shield so GND is a wide area of copper on the bottom (a ground plane, many cells). Why do real boards do this? The hard part, on purpose: Routing takes patience: one cell at a time, and some nets block others. Suggest routing the short nets first and using Undo freely. When students get stuck: A trace won't start. Ask: Did you click a pad (or a trace) of a net? Fix: Start on a pad. / A step is refused. Ask: Is that cell next to the last one, and free of other nets on this layer? Fix: Go round, or switch layer. / A net still has a thin line after a trace finished. Ask: How many pads does the net have? Fix: Start a new trace from a joined pad to the next one. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Short

**Two traces of different nets touch. What is it called?**

- A via
- A ratsnest
- A net
- A short circuit

* Answer: A short circuit

<!-- Speaker note: Touching copper joins nets: a short circuit. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Via

**What is a via?**

- A thin ratsnest line
- A pad for a connector
- A gap between two parts
- A plated hole that takes a trace from one layer to the other

* Answer: A plated hole that takes a trace from one layer to the other

<!-- Speaker note: A via joins copper on the top to copper on the bottom. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Copper

**A board's traces are 52 cells long in all. How much copper is that, in mm, to the nearest mm?**

* Answer: 132

<!-- Speaker note: 52 × 2.54 = 132.08 ≈ 132 mm. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: route it short



- **Short copper:** 
- **Evaluate:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/pcb/route/?full=step-6#step-6)

<!-- Speaker note: What this step is for: With both layers allowed, students aim for the shortest copper: the two answers to a crossing, chosen net by net. Hints, in order: Switch to bottom layer before you start GND. / Keep each trace as straight as the parts allow. / Undo removes the last step if a trace wanders. -->

<!-- Speaker note: Teacher: compare copper lengths across the class. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Two nets must cross on a board. Give two ways to do it, and one cost of each.**

* Go round on the same layer (longer copper, more space) or go to the other layer (a two-layer board; vias if surface-mount pads are involved).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Design rules and ordering. Real tools route at 45°, check clearance between copper, and pour ground planes; the Capstone project Design a PCB uses one. -->
