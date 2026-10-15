---
marp: true
theme: default
html: true
---

# Place the parts

Your own board · From breadboard to board

<!-- Speaker note: Students find nets by clicking pads, move and rotate parts to shorten the ratsnest, learn a placement order (connectors first, then follow the signal), and meet a layout brief on a normal and a small board. About 40 minutes (Predict and Try 10 min · Worked example 8 min · Vary 10 min · Practise and Make 12 min). Sources: KiCad documentation: PCB editor (benchmark for the model; wording our own), https://docs.kicad.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a printed circuit board starts as parts on a grid and a list of nets: pads that must end up joined. Thin ratsnest lines show the joins still to make. Students find nets, then move and turn parts so the joins are short and the connector sits at the edge.

- I can explain what a net and a ratsnest line are.
- I can place parts so the joins are short and the connector is at the edge.
- I can measure a board in millimetres from its grid.

<!-- Speaker note: Before class: Do Arduino › From simulator to breadboard (or any breadboard circuit) first: this course turns a breadboard circuit into a board. The board is a teaching model of a real PCB tool (KiCad, EasyEDA): a 2.54 mm grid, through-hole parts, nets, a ratsnest. Real tools add footprints for every part, a schematic that makes the nets, and surface-mount parts on finer grids. The Capstone project Design a PCB uses a real tool. Curriculum hooks: Design and Technologies, engineering principles and systems, and materials and technologies; Digital Technologies, digital systems (hardware). Teacher: Try: have students say out loud which pads light up for GND. Teacher: Worked example: model the order on the board: connector, signal path, the many-net part, gaps, numbers. -->

---

## Why it matters

> Your breadboard circuit works. To make it a real board, every wire becomes copper, and the first decision is where each part goes.

<!-- Speaker note: On a breadboard, wires go wherever you push them. On a **printed circuit board** (PCB), the wires are strips of copper called **traces**, printed onto the board. Before any copper, a designer **places** the parts. The circuit is a button and an LED on a small shield. **J1** is the connector to the micro:bit or Arduino: VCC (power), IN (the button), OUT (the LED) and GND. A **net** is a set of pads that must end up joined. The thin **ratsnest** lines show the joins still to make. One grid step is **2.54 mm**, the gap between pins on most parts. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Which placement will be easiest to join up with copper?**

- Parts spread out evenly, with space all round
- Parts in alphabetical order
- It makes no difference: the copper can go anywhere
- Parts that share nets close together, in the order the signal flows

<!-- Speaker note: What happens: Close together, in signal order. Every ratsnest line becomes copper, and crossing lines become traces that must find a way round each other. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show a photo of a real PCB and ask where the copper goes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fpcb%2Fplace%2Fstep-2&code=widget%3A+pcb%0Amode%3A+layout%0Agrid%3A+20%2C+12%0Apart+J1%3A+header4+at+0%2C4+turn+1%0Apart+S1%3A+button+at+13%2C1%0Apart+R2%3A+resistor+at+3%2C10%0Apart+R1%3A+resistor+at+14%2C7%0Apart+D1%3A+led+at+6%2C1%0Anet+VCC%3A+J1.1%2C+S1.1%0Anet+IN%3A+J1.2%2C+S1.2%2C+R2.1%0Anet+OUT%3A+J1.3%2C+R1.1%0Anet+LEDA%3A+R1.2%2C+D1.1%0Anet+GND%3A+J1.4%2C+R2.2%2C+D1.2%0Afixed%3A+J1%0Aedge%3A+J1%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/pcb/place/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Close together, in signal order. Every ratsnest line becomes copper, and crossing lines become traces that must find a way round each other.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Placement, step by step

$$\text{1. Fix the connectors:}$$

1) $\text{2. Follow the signal:}$ — Place parts in the order the signal flows: J1, then the button and its resistor, then R1 and the LED.
2) $\text{3. Keep nets close:}$ — A part with many nets (like GND) goes near the middle of the pads it joins.
3) $\text{4. Leave a gap:}$ — At least one cell between parts, so copper can pass and the parts can be soldered.
4) $\text{5. Check the numbers:}$ — Total ratsnest down, nothing off the board, nothing touching.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 1. Fix the connectors: and say "J1 goes at the edge, where a cable can reach it. Mark it fixed." Line 1: write 2. Follow the signal: and say "Place parts in the order the signal flows: J1, then the button and its resistor, then R1 and the LED." Line 2: write 3. Keep nets close: and say "A part with many nets (like GND) goes near the middle of the pads it joins." Line 3: write 4. Leave a gap: and say "At least one cell between parts, so copper can pass and the parts can be soldered." Line 4: write 5. Check the numbers: and say "Total ratsnest down, nothing off the board, nothing touching." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Placement, step by step

**A ratsnest line runs 10 cells straight across. How long is it, in mm?**

* Answer: 25.4

<!-- Speaker note: 10 × 2.54 = 25.4 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why the edge?

**Why must J1 sit at the edge of the board?**

- The design rules forbid connectors in the middle
- So its ratsnest lines are longer
- A cable or a micro:bit plugs into it, so it must be reachable
- Connectors are the heaviest part

* Answer: A cable or a micro:bit plugs into it, so it must be reachable

<!-- Speaker note: Connectors, switches and LEDs go where people need them: at the edge, or facing out. Then the rest is placed around them. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: meet the brief



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/pcb/place/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A target turns placement into a design problem with a measure: students move and turn parts until the board meets every criterion. Hints, in order: Bring S1 and R2 near J1's top pins: they share VCC and IN with it. / Turn R2 upright (Rotate) so its ends reach IN and GND. / Put R1 and D1 together near J1's OUT and GND pins. For students who need more support: Give the placement order as a checklist, and the target as a number to beat by steps of 20 mm. For early finishers: Rotate J1 so it points out of a different edge. How does the best layout change? The hard part, on purpose: Students move parts at random. Ask them to fix the connector first, then place one part at a time, watching the ratsnest total. When students get stuck: A part won't move. Ask: Is it selected (gold outline)? Is the cell you clicked empty? Fix: Click the part, then an empty cell for its pad 1. / The board says parts are too close. Ask: Is there an empty cell between every pair of parts? Fix: Leave a gap for copper and soldering. / The ratsnest got longer after a move. Ask: Which nets does that part share, and where are their other pads? Fix: Move it towards the pads it joins. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Millimetres

**Two pads are 4 cells apart. How far apart are they, in mm?**

* Answer: 10.16

<!-- Speaker note: 4 × 2.54 = 10.16 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Joins

**Three pads are on the same net. How many joins does the ratsnest need?**

- 2
- 3
- 1
- 6

* Answer: 2

<!-- Speaker note: Joining three things in a chain takes two links: the ratsnest uses the shortest two. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Gaps

**Why leave at least one empty cell between parts?**

- The ratsnest needs space to draw
- So traces can pass between them and the parts can be soldered
- Because pads repel each other
- To make the board bigger

* Answer: So traces can pass between them and the parts can be soldered

<!-- Speaker note: Copper runs between parts, and a soldering iron needs room. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a smaller board



- **A small board:** 
- **Evaluate:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/pcb/place/?full=step-6#step-6)

<!-- Speaker note: What this step is for: A smaller board forces real trade-offs: every part must still fit, with gaps, and the ratsnest must be shorter still. Hints, in order: Start with the parts that share the most nets with J1. / Turn the resistors upright to save width. / Check the facts line after every move. -->

<!-- Speaker note: Teacher: compare layouts; whose was shortest, and what did they place first? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two rules of thumb for placing parts on a board, and say why each helps.**

* Connectors at the edge, so cables reach them; parts that share nets close together, in signal order, so the copper is short and doesn't cross; leave gaps between parts for copper and soldering.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Route the traces. Real tools: KiCad (free, open source), EasyEDA (in the browser, linked to a board maker). The Capstone projects' Design a PCB uses one. -->
