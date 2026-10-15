---
title: "Design rules and ordering"
subtitle: "Your own board · From breadboard to board · Lesson 3"
---

# Design rules and ordering

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The motor board works on the bench, then a trace turns brown and lifts off. Why that trace, and not the others?


:::teacher-note

**In one sentence:** Students set trace widths against current from a table, find a trace too wide to squeeze between header pins and route it around, then work out the cost of a board order (setup plus per board).

**Students should be able to say:** I can choose a trace width from the current it carries. I can explain why two design rules can force a longer route. I can work out what an order of boards costs, per board.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Every trace is 0.25 mm wide. The motor draws 1.5 A. Which trace is most likely to overheat?**

☐ SIG, the control signal

☐ None: copper never overheats

☐ VM, the motor's power

☐ They all heat the same

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** VM (and GND, MA, MB): they carry 1.5 A. SIG carries a few thousandths of an amp, so a thin trace is fine for it.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: width from current


:::keep-together

### Choose the width

1. $\text{VM carries } 1.5 \text{ A}$ — Find the current each net carries (the motor's datasheet gives it).
2. $0.5 \text{ mm} \to 1.4 \text{ A} < 1.5 \;\times$ — Too thin: it would run hot.
3. $1 \text{ mm} \to 2.4 \text{ A} \ge 1.5 \;\checkmark$ — The narrowest width that passes, with a margin.
4. $\text{between header pins: } \le 0.4 \text{ mm}$ — A second rule: the gap between pins leaves room for 0.4 mm only.
5. $1 \text{ mm} > 0.4 \text{ mm} \Rightarrow \text{route around}$ — A trace that needs 1 mm can't squeeze between pins, so it takes the long way.

**A heater trace carries 2.8 A. Which is the narrowest width that passes?**

☐ 1.5 mm

☐ 1 mm

☐ 2 mm

☐ 0.5 mm

:::


:::teacher-note

**Answer:** 1.5 mm

1.5 mm is safe to 3.2 A, which is at least 2.8 A.

:::


:::keep-together

### Two rules meet

**MA must carry 1.5 A, and its shortest path squeezes between two header pins (0.4 mm of room). What should the designer do?**

☐ Make MA 1 mm and squeeze it through anyway

☐ Lower the motor's current

☐ Make MA 0.4 mm and squeeze it through

☐ Route MA around the header, at 1 mm wide

:::


:::teacher-note

**Answer:** Route MA around the header, at 1 mm wide

Two rules meet: width for current, and room between pins. The longer route around satisfies both.

:::


:::typical

## Vary: a squeeze


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Rules and orders


:::keep-together

### Width

**A trace carries 0.9 A. Which is the narrowest width that passes? (0.25 mm 0.8 A · 0.5 mm 1.4 A · 1 mm 2.4 A)**

☐ 0.5 mm

☐ 0.25 mm

☐ 1 mm

:::


:::teacher-note

**Answer:** 0.5 mm

0.25 mm is safe only to 0.8 A; 0.5 mm to 1.4 A.

:::


:::keep-together

### An order

**A board maker charges $20 to set up an order and $1.50 a board. What do 10 boards cost, in dollars?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 35

20 + 10 × 1.50 = $35.

:::


:::keep-together

### Per board

**Same prices: what does each board cost when you order 40, in dollars?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

20 + 40 × 1.50 = $80, and 80 ÷ 40 = $2 a board. The setup cost is shared by more boards.

:::


## Make: ready to order


**Pass the rules.** 

**Order.** 

**Evaluate.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**A trace carries 2 A. Which width (0.5 mm 1.4 A, 1 mm 2.4 A, 1.5 mm 3.2 A) do you choose, and why not the others?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1 mm: the narrowest safe for 2 A; 0.5 mm would overheat, and 1.5 mm takes more room than needed.

:::

