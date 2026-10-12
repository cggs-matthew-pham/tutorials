---
title: "Parametric design"
subtitle: "Parametric design · Linked dimensions · Lesson 1"
---

# Parametric design

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The board your case was designed for has been replaced by a bigger one. Do you start again, or change one number?


:::teacher-note

**In one sentence:** Students change the driving dimensions of a parametric case and watch the outside follow, write each size as an expression of the part, clearance and wall, see why Sam's typed-in number forces a redraw, build the same model with variables in Onshape, and work back from a size limit to the largest part.

**Students should be able to say:** I can tell driving dimensions from driven ones. I can write a size as an expression of variables. I can change a parametric model by changing one number.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**In a parametric case, the part gets 10 mm wider. What happens to the outside width?**

☐ Nothing until you redraw it

☐ The walls get thinner to make room

☐ It grows by 20 mm

☐ It grows by 10 mm by itself

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It grows by 10 mm by itself: outside = part + 2 × (clearance + wall), and only the part changed.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: write the rules


:::keep-together

### Driving and driven

1. $\#part = 68.6, \; \#clearance = 1, \; \#wall = 2$ — The driving dimensions: the only numbers typed in.
2. $\text{inside} = \#part + 2 \times \#clearance = 70.6$ — Worked out, never typed.
3. $\text{outside} = \text{inside} + 2 \times \#wall = 74.6$ — Worked out from the inside.
4. $\#part = 75 \Rightarrow \text{outside} = 81$ — Change one number; every size that depends on it follows.

Now a 50 mm part.

**Part 50 mm, clearance 1 mm, wall 2 mm. Outside width (mm)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 56

50 + 2 × (1 + 2) = 56 mm.

:::


:::keep-together

### Find the mistake

**Sam has to redraw the whole case for the new board. Click the line where Sam's design first goes wrong.**

```
 1  Sam measures the Uno: 68.6 mm wide.
 2  Sam types the case's outside width as 74.6 mm.
 3  The project switches to a board 75 mm wide.
 4  Sam redraws the whole case from scratch.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: typing 74.6 as a plain number cuts the link to the part. As #part + 2 * (#clearance + #wall), changing #part to 75 would update the case by itself.

:::


:::typical

## Do it in Onshape


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Rules


:::keep-together

### Which drives?

**Which size should be a driving variable rather than worked out?**

☐ The case's outside width

☐ The width of the part that goes inside

☐ The lid's outside width

☐ The case's inside width

:::


:::teacher-note

**Answer:** The width of the part that goes inside

Drive the design from what you can't change (the part) and the choices you make (clearance, wall).

:::


:::keep-together

### The lid

**A lid sits over the case with 0.5 mm clearance each side and its own 2 mm wall. Outside = 74.6. Lid outside (mm)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 79.6

74.6 + 2 × (0.5 + 2) = 79.6 mm.

:::


## Make: the biggest part


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why make a case's outside width an expression instead of a number?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So it updates by itself when the part, clearance or wall changes, instead of being redrawn.

:::

