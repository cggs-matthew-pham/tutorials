---
marp: true
theme: default
html: true
---

# Beams and shapes

Structures · Beams

<!-- Speaker note: Students compare four cross-sections with about the same wood (a strip flat and on edge, an I-beam, a tube), find depth counts cubed, work out how a beam's supports share a load, and choose a section for a shelf brief. About 40 minutes (Predict and Try 8 min · Worked example 10 min · Vary 8 min · Practise and Make 14 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the briefs and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a beam's supports share its load like a lever, and its stiffness depends on its shape far more than on how much material it has: depth counts cubed. Students compare a strip flat and on its edge, an I-beam and a tube, work out support forces, and choose a section to a brief.

- I can work out how much each support of a beam holds.
- I can explain why a deeper beam is much stiffer, and why I-beams are shaped as they are.
- I can choose a beam section to meet a sag limit.

<!-- Speaker note: Before class: A ruler between two books, flat then on its edge, is the whole lesson in ten seconds; then the board puts numbers on it. The model: a simply supported pine beam (E = 10 000 N/mm²), 500 mm span, a point load; sag at the load point = P a² b² ÷ (3 E I L). Sections (mm): flat 30 × 3, edge 3 × 30, I-beam 30 deep with 20 × 1.5 flanges and a 1.5 web, square tube 20 × 20 × 1.2. Strength (breaking) isn't modelled, only sag. The picture exaggerates the sag. Curriculum hooks: Design and Technologies, materials and technologies (properties of materials), engineering principles and systems; Maths, powers (cubes) and proportion. Teacher: Try: ask where the I-beam keeps its wood. Teacher: Worked example: link the support shares back to Levers (Mechanisms). -->

---

## Why it matters

> A ruler laid flat between two books sags under a pencil case. Turn it on its edge and it barely moves. It's the same ruler. Why?

<!-- Speaker note: A **beam** is a member that carries a load across a gap, sitting on **supports**. Two questions matter: how much does each support hold, and how much does the beam **sag**? The beams here are pine, **500 mm** between supports. Each **cross-section** (the shape you'd see if you sawed through it) uses about the same amount of wood. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A 30 × 3 mm strip is turned from flat onto its edge. Same wood, same load. Its sag…**

- Drops to about a hundredth
- Gets bigger: it might tip over
- Stays the same: same wood
- Halves

<!-- Speaker note: What happens: About a hundredth. Stiffness grows with the depth cubed: 10 times deeper is 1000 times stiffer, and a tenth as wide is a tenth of that: 100 times. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: hand out rulers before the board. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fstructures%2Fbeams%2Fstep-2&code=widget%3A+truss%0Amode%3A+beam%0Aspan%3A+0.5%0Aload%3A+10%0Ashape%3A+flat%0Achoose%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/structures/beams/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* About a hundredth. Stiffness grows with the depth cubed: 10 times deeper is 1000 times stiffer, and a tenth as wide is a tenth of that: 100 times.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two rules

$$R_\text{left} = P \times \frac{b}{L}$$

1) $10 \times \frac{0.25}{0.5} = 5 \text{ N each}$ — In the middle, the supports share it equally.
2) $I = \frac{\text{width} \times \text{depth}^3}{12}$ — Stiffness of a rectangle (in mm⁴): depth counts cubed.
3) $\text{flat: } \frac{30 \times 3^3}{12} = 67.5 \quad \text{edge: } \frac{3 \times 30^3}{12} = 6750$ — Same wood, a hundred times the stiffness on its edge.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write R_left = P × b ÷ L and say "The load P is a away from the left support and b from the right. The far distance decides each share (as on a lever)." Line 1: write 10 × 0.25 ÷ 0.5 = 5 N each and say "In the middle, the supports share it equally." Line 2: write I = width × depth^312 and say "Stiffness of a rectangle (in mm⁴): depth counts cubed." Line 3: write flat: 30 × 3^3 ÷ 12 = 67.5 edge: 3 × 30^3 ÷ 12 = 6750 and say "Same wood, a hundred times the stiffness on its edge." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two rules

**A 10 N load sits 0.1 m from the left support of a 0.5 m beam. How much does the left support hold, in newtons?**

* Answer: 8

<!-- Speaker note: 10 × 0.4 ÷ 0.5 = 8 N (and the right holds 2 N). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Deeper

**A beam is made twice as deep (same width). How many times stiffer is it?**

* Answer: 8

<!-- Speaker note: 2³ = 8 times stiffer: it sags an eighth as much. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: move the load, choose the shape



- **Shares:** 
- **Least wood:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/structures/beams/?full=step-4#step-4)

<!-- Speaker note: What this step is for: First the support shares on the board, then a brief: the least wood that keeps the sag within a limit. For students who need more support: Give the four sections drawn to scale, and ask students to rank them before the board. For early finishers: Stiffness of a rectangle is width × depth³ ÷ 12. Design a 90 mm² rectangle stiffer than the I-beam. Why don't builders use it? The hard part, on purpose: Students expect the same material to behave the same way. Have them flex a ruler flat and on its edge. When students get stuck: A student says the nearer support holds less. Ask: If the load sat right on a support, how much would the other one hold? Fix: The nearer support holds more. / A student says twice as deep is twice as stiff. Ask: What does the formula do to depth? Fix: Cubes it: 2³ = 8. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Shares

**A 60 N load sits 1 m from the left support of a 4 m beam. How much does the left support hold, in newtons?**

* Answer: 45

<!-- Speaker note: 60 × 3 ÷ 4 = 45 N. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Deeper

**A plank is made three times as deep (same width). How many times stiffer is it?**

* Answer: 27

<!-- Speaker note: 3³ = 27. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## I-beams

**Why are steel beams in buildings I-shaped?**

- Most of the steel is at the top and bottom, far from the middle, where it adds most stiffness
- I-shapes are easier to paint
- The middle of a beam does all the work
- They weigh more

* Answer: Most of the steel is at the top and bottom, far from the middle, where it adds most stiffness

<!-- Speaker note: Stiffness comes from material far from the middle. An I-beam puts its flanges there and keeps a thin web between them. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a shelf



- **A shelf:** 
- **Evaluate:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/structures/beams/?full=step-6#step-6)

<!-- Speaker note: What this step is for: A heavier load narrows the choice to one shape: students use the facts line to decide and justify. -->

<!-- Speaker note: Teacher: ask why a builder might not choose the I-beam anyway (cost, joining, looks). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A plank 20 mm deep is replaced by one 40 mm deep, the same width. How does its sag change?**

* Twice as deep is 2³ = 8 times stiffer, so it sags an eighth as much.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the Capstone projects; Mechanisms › Levers for the support-share rule from the other side. Real examples: floor joists on edge, steel I-beams, aluminium extrusions, bike frames (tubes). -->
