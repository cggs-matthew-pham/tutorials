---
title: "Route the traces"
subtitle: "Your own board · From breadboard to board · Lesson 2"
---

# Route the traces

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Two wires on a breadboard can cross in the air. Two copper traces that touch are a short circuit. How does GND get past OUT?


:::teacher-note

**In one sentence:** Students route copper traces cell by cell, find that a trace can't touch another net (a short circuit), route the shield on one layer with a detour, then on two layers with a trace on the bottom, and compare the copper.

**Students should be able to say:** I can route copper traces that join every net without a short circuit. I can explain when a trace goes round and when it goes to the other layer. I can explain what a via is for.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**GND must get from J1 to R2 and D1, but the OUT trace is in the way. On a board with copper on one side only, what can you do?**

☐ Leave GND unjoined

☐ Take GND the long way round the other parts

☐ Let GND cross OUT: copper is insulated

☐ Join GND and OUT where they cross

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Go round. Copper traces are bare metal, so touching joins them. With two layers there is a second answer: go under, on the bottom.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: round or under?


:::keep-together

### Two ways past OUT

1. $\text{Round (one layer):}$ — GND goes down J1's side, along the bottom edge, and back up to D1 and R2.
2. $\approx 47 \text{ cells} \times 2.54 \approx 119 \text{ mm of copper}$ — Long, but the board needs copper on one side only, which is cheaper.
3. $\text{Under (two layers):}$ — GND drops to the bottom layer at J1's pad and runs straight under OUT.
4. $\approx 37 \text{ cells} \times 2.54 \approx 94 \text{ mm}$ — Shorter and tidier; two-layer boards are standard and cost only a little more.

**A detour adds 9 cells of copper. How many extra mm is that, to 1 decimal place?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 22.9

9 × 2.54 = 22.86 ≈ 22.9 mm.

:::


:::keep-together

### When you need a via

**A trace on the bottom must end at a surface-mount pad, which is only on the top. What does it need?**

☐ A via near the pad, to come up to the top

☐ Nothing: copper reaches both sides

☐ A second pad

☐ A wider trace

:::


:::teacher-note

**Answer:** A via near the pad, to come up to the top

Through-hole pads go through both layers. Surface-mount pads sit on one side, so a trace on the other side needs a via.

:::


:::typical

## Vary: one side only


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Routing


:::keep-together

### Short

**Two traces of different nets touch. What is it called?**

☐ A via

☐ A ratsnest

☐ A net

☐ A short circuit

:::


:::teacher-note

**Answer:** A short circuit

Touching copper joins nets: a short circuit.

:::


:::keep-together

### Via

**What is a via?**

☐ A thin ratsnest line

☐ A pad for a connector

☐ A gap between two parts

☐ A plated hole that takes a trace from one layer to the other

:::


:::teacher-note

**Answer:** A plated hole that takes a trace from one layer to the other

A via joins copper on the top to copper on the bottom.

:::


:::keep-together

### Copper

**A board's traces are 52 cells long in all. How much copper is that, in mm, to the nearest mm?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 132

52 × 2.54 = 132.08 ≈ 132 mm.

:::


## Make: route it short


**Short copper.** 

**Evaluate.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Two nets must cross on a board. Give two ways to do it, and one cost of each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Go round on the same layer (longer copper, more space) or go to the other layer (a two-layer board; vias if surface-mount pads are involved).

:::

