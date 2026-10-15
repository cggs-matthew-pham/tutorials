---
marp: true
theme: default
html: true
---

# Parametric design

Parametric design · Linked dimensions

<!-- Speaker note: Students change the driving dimensions of a parametric case and watch the outside follow, write each size as an expression of the part, clearance and wall, see why Sam's typed-in number forces a redraw, build the same model with variables in Onshape, and work back from a size limit to the largest part. About 40 minutes (Predict and Try 5 min · Worked example 8 min · Onshape 15 min · Practise and Make 12 min). Sources: Onshape Learning Center: variables (link), https://learn.onshape.com/ (checked 12 October 2026). -->

---

## Today

**We are learning to** in a parametric model, dimensions are linked by rules: outside = part + 2 × (clearance + wall). Change the part, and everything that depends on it updates. Name the numbers that drive the design, and work the rest out from them.

- I can tell driving dimensions from driven ones.
- I can write a size as an expression of variables.
- I can change a parametric model by changing one number.

<!-- Speaker note: Before class: Onshape: free education plan, runs in the browser; variables are made with the Variable feature (#name) and used in any dimension box. Fusion works the same way with Parameters. This links to Maths (expressions and substitution) and to Code (variables). Teacher: Worked example: underline the driving numbers. -->

---

## Why it matters

> The board your case was designed for has been replaced by a bigger one. Do you start again, or change one number?

<!-- Speaker note: In Onshape (and Fusion, and Tinkercad's newer parameters) a design can have **variables**: `#part = 68.6 mm`, `#clearance = 1 mm`, `#wall = 2 mm`. Every other size is an **expression** using them, such as `#part + 2 * (#clearance + #wall)`. That is a **parametric** model: the numbers that matter **drive** it, and the rest is worked out. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**In a parametric case, the part gets 10 mm wider. What happens to the outside width?**

- Nothing until you redraw it
- The walls get thinner to make room
- It grows by 20 mm
- It grows by 10 mm by itself

<!-- Speaker note: What happens: It grows by 10 mm by itself: outside = part + 2 × (clearance + wall), and only the part changed. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the case's outside depends on. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fparametric%2Fparametric%2Fstep-2&code=widget%3A+fab%0Amode%3A+param%0Apart%3A+68.6%0Aclearance%3A+1%0Awall%3A+2%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/parametric/parametric/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It grows by 10 mm by itself: outside = part + 2 × (clearance + wall), and only the part changed.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Driving and driven

Now a 50 mm part.

$$\#part = 68.6, \; \#clearance = 1, \; \#wall = 2$$

1) $\text{inside} = \#part + 2 \times \#clearance = 70.6$ — Worked out, never typed.
2) $\text{outside} = \text{inside} + 2 \times \#wall = 74.6$ — Worked out from the inside.
3) $\#part = 75 \Rightarrow \text{outside} = 81$ — Change one number; every size that depends on it follows.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write \#part = 68.6, \#clearance = 1, \#wall = 2 and say "The driving dimensions: the only numbers typed in." Line 1: write inside = \#part + 2 × \#clearance = 70.6 and say "Worked out, never typed." Line 2: write outside = inside + 2 × \#wall = 74.6 and say "Worked out from the inside." Line 3: write \#part = 75 outside = 81 and say "Change one number; every size that depends on it follows." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Driving and driven

**Part 50 mm, clearance 1 mm, wall 2 mm. Outside width (mm)?**

* Answer: 56

<!-- Speaker note: 50 + 2 × (1 + 2) = 56 mm. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam has to redraw the whole case for the new board. Click the line where Sam's design first goes wrong.**

```
 1  Sam measures the Uno: 68.6 mm wide.
 2  Sam types the case's outside width as 74.6 mm.
 3  The project switches to a board 75 mm wide.
 4  Sam redraws the whole case from scratch.
```

* Answer: line 2

<!-- Speaker note: Line 2: typing 74.6 as a plain number cuts the link to the part. As #part + 2 * (#clearance + #wall), changing #part to 75 would update the case by itself. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Do it in Onshape



<!-- Speaker note: What this step is for: Creating variables in Onshape and using them in sketch dimensions is the real skill this lesson points at. For students who need more support: A three-column table: variable, value, which sizes use it. For early finishers: Add a #fillet variable for rounded corners and a #lid_gap for the lid. Which sizes depend on each? The hard part, on purpose: Students type the number they worked out. Insist: if you worked it out, it's an expression. When students get stuck: A student's model doesn't update. Ask: Is that dimension a number or an expression? Fix: Type the expression with the variables. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which drives?

**Which size should be a driving variable rather than worked out?**

- The case's outside width
- The width of the part that goes inside
- The lid's outside width
- The case's inside width

* Answer: The width of the part that goes inside

<!-- Speaker note: Drive the design from what you can't change (the part) and the choices you make (clearance, wall). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The lid

**A lid sits over the case with 0.5 mm clearance each side and its own 2 mm wall. Outside = 74.6. Lid outside (mm)?**

* Answer: 79.6

<!-- Speaker note: 74.6 + 2 × (0.5 + 2) = 79.6 mm. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the biggest part



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/parametric/parametric/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Working back from a limit on the outside to the largest part that fits reverses the rule. Hints, in order: outside = part + 2 × (1 + 2) = part + 6. / The outside can be at most 80. / part = 80 − 6 = 74. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why make a case's outside width an expression instead of a number?**

* So it updates by itself when the part, clearance or wall changes, instead of being redrawn.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next (optional): Laser cutting and kerf. -->
