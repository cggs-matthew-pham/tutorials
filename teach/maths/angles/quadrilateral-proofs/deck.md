---
marp: true
theme: default
html: true
---

# Proving quadrilateral properties

Angles and shapes · Congruence and similarity

<!-- Speaker note: Students test diagonal properties of quadrilaterals on the board, then prove them with congruent triangles (AC9M8SP02, node 1). About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 12 min · Practise and Make 13 min). -->

---

## Today

**We are learning to** a diagonal cuts a quadrilateral into two triangles. When those triangles are congruent, their matching sides and angles are equal, and that proves a property for every shape of the kind: a rectangle's diagonals are equal, a parallelogram's cut each other in half, a kite's cross at 90°.

- I can find two triangles in a quadrilateral and say which test makes them congruent.
- I can use matching parts of congruent triangles to prove a property.
- I can explain why measuring one shape is not a proof.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need the congruence tests (Congruent triangles), the quadrilateral family (Year 7) and angles at parallel lines. The one idea: two congruent triangles inside the shape give equal sides and angles, and that holds for every shape of the kind. The common mistake is treating one careful drawing as a proof (Leo's mistake). The board measures diagonals: l is equal, u is cut in half, y is at 90°. Use the board for evidence and conjectures; the proofs are written. Year 8 proofs can be a plan with reasons, not a two-column format. Wider: prove a parallelogram's diagonals bisect each other (ASA with alternate angles), or prove the converse: a quadrilateral whose diagonals bisect each other is a parallelogram. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> You measure the diagonals of one rectangle: both 10 cm. Is that true for every rectangle in the world? Measuring can't check them all, but a proof can.

<!-- Speaker note: A **proof** shows that something is true for every shape of a kind, with a reason for each step. For quadrilaterals, the main tool is congruent triangles. Draw a diagonal (or both), find two triangles, and show they are congruent with a test (SSS, SAS, ASA, AAS or RHS). Then **matching parts of congruent triangles are equal**. | Shape | Its diagonals | |---|---| | parallelogram | cut each other in half (bisect each other) | | rectangle | equal, and bisect each other | | rhombus | bisect each other at 90° | | square | equal, and bisect each other at 90° | | kite | cross at 90°; one cuts the other in half | -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Ana draws one rectangle and measures both diagonals: 10 cm each. Has she proved that every rectangle's diagonals are equal?**

- Yes, if she draws two more
- Yes: she measured carefully
- No: one example is not a proof

<!-- Speaker note: What happens: No. Examples suggest the rule, but a proof gives reasons that work for every rectangle, such as two congruent triangles. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what would convince someone who has never seen a rectangle. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2Fquadrilateral-proofs%2Fstep-2&code=widget%3A+geometry%0Ashape%3A+polygon%0Asides%3A+4%0Acorners%3A+2%2C1%3B+8%2C1%3B+10%2C5%3B+4%2C5%0Aclassify%3A+on%0Adiagonals%3A+on%0Asum%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/angles/quadrilateral-proofs/?full=step-2#step-2)

<!-- Speaker note: The dashed lines are the diagonals AC and BD. The panel gives their lengths, in two parts from where they cross. -->

<!-- Speaker note: Teacher: ask whether any rectangle breaks the rule. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No. Examples suggest the rule, but a proof gives reasons that work for every rectangle, such as two congruent triangles.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The proof

Here is a proof that a parallelogram's diagonals cut each other in half. Every proof in this lesson has the same plan.

$$\text{Parallelogram } ABCD,\ \text{diagonals cross at } M$$

1) $AB = CD$ — Opposite sides of a parallelogram are equal.
2) $\angle BAM = \angle DCM,\ \angle ABM = \angle CDM$ — Alternate angles: AB is parallel to DC.
3) $\triangle ABM \equiv \triangle CDM\ (\text{ASA})$ — Name the test.
4) $AM = CM,\ BM = DM$ — Matching sides are equal: the diagonals cut each other in half.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Parallelogram ABCD,diagonals cross at M and say "Look at triangles ABM and CDM." Line 1: write AB = CD and say "Opposite sides of a parallelogram are equal." Line 2: write BAM = DCM, ABM = CDM and say "Alternate angles: AB is parallel to DC." Line 3: write ABM CDM(ASA) and say "Name the test." Line 4: write AM = CM,BM = DM and say "Matching sides are equal: the diagonals cut each other in half." -->

<!-- Speaker note: Teacher: ask why each pair of parts is equal. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The proof

**Put the proof that a rectangle's diagonals are equal in order.**

```maths
Two sides and the angle between them match, so △ABC ≡ △BAD (SAS).
Side AB is in both, BC = AD (opposite sides of a rectangle), and angle B = angle A = 90°.
The diagonals look the same length, so they are equal.
Matching sides of congruent triangles are equal, so AC = BD: the diagonals are equal.
ABCD is a rectangle. Look at triangles ABC and BAD, made by the diagonals AC and BD.
```

<!-- Speaker note: Find two triangles, give the equal parts with reasons, name the test, then use matching sides. Correct order: ABCD is a rectangle. Look at triangles ABC and BAD, made by the diagonals AC and BD. Side AB is in both, BC = AD (opposite sides of a rectangle), and angle B = angle A = 90°. Two sides and the angle between them match, so △ABC ≡ △BAD (SAS). Matching sides of congruent triangles are equal, so AC = BD: the diagonals are equal. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Leo tries to prove a property of kites. Click the line where his reasoning goes wrong.**

```
 1  Leo wants to prove that a kite's diagonals cross at 90°.
 2  He draws one kite carefully and measures where the diagonals cross.
 3  It measures 90°, so this proves it for every kite.
 4  He writes: the diagonals of a kite are perpendicular.
```

* Answer: line 3

<!-- Speaker note: Line 3: one measured kite is an example, not a proof. A proof gives reasons that hold for every kite. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A kite

**Kite ABCD has AB = AD and CB = CD. The diagonal AC splits it into triangles ABC and ADC. Which test shows they are congruent?**

- They are not congruent
- SAS
- SSS: AB = AD, CB = CD and AC is shared
- RHS

* Answer: SSS: AB = AD, CB = CD and AC is shared

<!-- Speaker note: AC is in both triangles, so all three sides match: SSS. Then angle BAC = angle DAC, so AC cuts angle A in half. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## More properties



- **A kite:** 
- **A rhombus:** 
- **A parallelogram:** 
- **A square:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/angles/quadrilateral-proofs/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Making a kite, a rhombus and a parallelogram on the board and reading off their diagonal properties. Hints, in order: A kite has two pairs of equal sides next to each other. / Put A and C on one vertical line, with B and D the same distance either side of it. / Such as corners 5,1; 7,3; 5,7; 3,3. / Four equal sides: try steps of 3 across and 4 up, which are 5 long. For students who need more support: A proof frame: 'Look at triangles __ and __. __ = __ because __ (three times). So they are congruent by __. So __ = __.' For early finishers: Prove that a parallelogram's opposite angles are equal, then that its diagonals cut each other in half. The hard part, on purpose: Giving a reason for every equal part. Ask 'how do you know?' after each line until the answer is a property, a test or a shared side. When students get stuck: A student says 'they look equal'. Ask: How do you know, for every shape like this? Fix: Give a property, a shared side or a test for each equal part. / A student picks two triangles that don't share parts. Ask: Which side do the two triangles have in common? Fix: Choose triangles on either side of a diagonal, or the two triangles that share a side. / A student names the test but stops. Ask: Now what does congruence give you? Fix: Matching parts of congruent triangles are equal: that is the property. -->

<!-- Speaker note: Teacher: ask which diagonal of the kite gets cut in half. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Parallelogram

**In parallelogram ABCD, the diagonal AC makes triangles ABC and CDA. AB = CD and BC = DA (opposite sides). Which test shows they are congruent?**

- SSA
- They are not congruent
- RHS
- SSS: AC is shared

* Answer: SSS: AC is shared

<!-- Speaker note: AB = CD, BC = DA and AC is in both: SSS. So angle B = angle D: opposite angles are equal. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Rhombus

**Which is a proof that a rhombus's diagonals cross at 90°?**

- I measured one and got 90°
- The four small triangles are congruent by SSS, so the four angles at the centre are equal and add to 360°
- All rhombuses are squares
- It looks like a plus sign

* Answer: The four small triangles are congruent by SSS, so the four angles at the centre are equal and add to 360°

<!-- Speaker note: Four equal angles that make 360° are 90° each. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which shape

**Which quadrilateral's diagonals always cut each other in half, but are not always equal?**

- A rectangle
- A square
- A kite
- A parallelogram

* Answer: A parallelogram

<!-- Speaker note: Every parallelogram's diagonals bisect each other; they are equal only when it is a rectangle. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: parallel lines

**Review: two parallel lines are cut by a transversal. One co-interior angle is 115°. What is the other, in degrees?**

* Answer: 65

<!-- Speaker note: Co-interior angles add to 180°: 180 − 115 = 65°. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: equal, not halved

Then write a proof (or the plan of one) that its diagonals are equal. Which two triangles would you use?

[Open this step](https://tutorials.learningwaypoints.com/maths/angles/quadrilateral-proofs/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building a shape from a diagonal property, not a name, shows they can reason from properties to shapes. Hints, in order: Rectangles have equal diagonals that also cut each other in half. Change one thing. / Keep one pair of sides parallel, but make the other two sides slope in by the same amount. / Try a trapezium with equal slanted sides. -->

<!-- Speaker note: Teacher: ask which two triangles the proof would use. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Kite ABCD has AB = AD and CB = CD. Prove that angle B = angle D.**

* Triangles ABC and ADC: AB = AD, CB = CD, AC shared, so they are congruent (SSS). Angle B and angle D match, so they are equal.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This covers AC9M8SP02 node 1. Where it leads: problems with quadrilateral properties (next lesson), and proof in Years 9 and 10 (circle geometry, similar triangles). -->
