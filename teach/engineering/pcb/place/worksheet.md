---
title: "Place the parts"
subtitle: "Your own board · From breadboard to board · Lesson 1"
---

# Place the parts

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Your breadboard circuit works. To make it a real board, every wire becomes copper, and the first decision is where each part goes.


:::teacher-note

**In one sentence:** Students find nets by clicking pads, move and rotate parts to shorten the ratsnest, learn a placement order (connectors first, then follow the signal), and meet a layout brief on a normal and a small board.

**Students should be able to say:** I can explain what a net and a ratsnest line are. I can place parts so the joins are short and the connector is at the edge. I can measure a board in millimetres from its grid.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Which placement will be easiest to join up with copper?**

☐ Parts spread out evenly, with space all round

☐ Parts in alphabetical order

☐ It makes no difference: the copper can go anywhere

☐ Parts that share nets close together, in the order the signal flows

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Close together, in signal order. Every ratsnest line becomes copper, and crossing lines become traces that must find a way round each other.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: read the board


:::keep-together

### Placement, step by step

1. $\text{1. Fix the connectors:}$ — J1 goes at the edge, where a cable can reach it. Mark it fixed.
2. $\text{2. Follow the signal:}$ — Place parts in the order the signal flows: J1, then the button and its resistor, then R1 and the LED.
3. $\text{3. Keep nets close:}$ — A part with many nets (like GND) goes near the middle of the pads it joins.
4. $\text{4. Leave a gap:}$ — At least one cell between parts, so copper can pass and the parts can be soldered.
5. $\text{5. Check the numbers:}$ — Total ratsnest down, nothing off the board, nothing touching.

**A ratsnest line runs 10 cells straight across. How long is it, in mm?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 25.4

10 × 2.54 = 25.4 mm.

:::


:::keep-together

### Why the edge?

**Why must J1 sit at the edge of the board?**

☐ The design rules forbid connectors in the middle

☐ So its ratsnest lines are longer

☐ A cable or a micro:bit plugs into it, so it must be reachable

☐ Connectors are the heaviest part

:::


:::teacher-note

**Answer:** A cable or a micro:bit plugs into it, so it must be reachable

Connectors, switches and LEDs go where people need them: at the edge, or facing out. Then the rest is placed around them.

:::


:::typical

## Vary: meet the brief


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Placement


:::keep-together

### Millimetres

**Two pads are 4 cells apart. How far apart are they, in mm?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10.16

4 × 2.54 = 10.16 mm.

:::


:::keep-together

### Joins

**Three pads are on the same net. How many joins does the ratsnest need?**

☐ 2

☐ 3

☐ 1

☐ 6

:::


:::teacher-note

**Answer:** 2

Joining three things in a chain takes two links: the ratsnest uses the shortest two.

:::


:::keep-together

### Gaps

**Why leave at least one empty cell between parts?**

☐ The ratsnest needs space to draw

☐ So traces can pass between them and the parts can be soldered

☐ Because pads repel each other

☐ To make the board bigger

:::


:::teacher-note

**Answer:** So traces can pass between them and the parts can be soldered

Copper runs between parts, and a soldering iron needs room.

:::


## Make: a smaller board


**A small board.** 

**Evaluate.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Name two rules of thumb for placing parts on a board, and say why each helps.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Connectors at the edge, so cables reach them; parts that share nets close together, in signal order, so the copper is short and doesn't cross; leave gaps between parts for copper and soldering.

:::

