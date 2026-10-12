---
title: Printed circuit boards in 5 minutes
---
## The idea in plain words

A **printed circuit board** (PCB) replaces a breadboard's wires with copper **traces** on a board. A **net** is a set of pads that must be joined; the design tool shows the joins still to make as thin **ratsnest** lines.

**Placement** comes first: connectors at the edge, then parts in the order the signal flows, parts sharing nets close together, a gap between parts. Short ratsnest lines mean short, easy copper.

**Routing** draws the traces. Copper is bare, so two nets must never touch (a **short circuit**). Where nets must cross, one goes round or drops to the **other layer**; through-hole pads go right through the board, and a **via** takes a trace between layers anywhere else.

**Design rules** are limits checked before ordering: trace width for current (wider carries more), gaps between copper, room between pins. When rules meet, a trace may take a longer path. An order costs setup plus a price per board.

## What students get wrong

- **Copper can cross like wires.** Touching copper is a short circuit.
- **Wider is always better.** Width costs space; use what the current needs.
- **Placement doesn't matter.** It decides how hard routing will be.

## The words

**PCB**, **pad**, **net**, **ratsnest**, **placement**, **trace**, **layer**, **via**, **short circuit**, **design rule check (DRC)**, **Gerbers** (the files a board maker needs).
