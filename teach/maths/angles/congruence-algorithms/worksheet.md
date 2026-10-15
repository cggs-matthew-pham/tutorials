---
title: "Algorithms for congruence"
subtitle: "Angles and shapes · Algorithms · Lesson 20"
---

# Algorithms for congruence

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A design program has to decide whether two parts it is given will fit each other exactly, fit after scaling, or not fit at all. What questions should it ask, and in what order?


:::teacher-note

**In one sentence:** Students follow, order, fix and design algorithms that decide whether two triangles are congruent, similar or neither, testing them on one pair of every kind (AC9M8SP04, nodes 1 and 2).

**Students should be able to say:** I can follow an algorithm for two triangles and say which test it used. I can find a pair of triangles an algorithm gets wrong, and fix it. I can design and test my own algorithm, and describe how it works.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**An algorithm asks only: 'Are all three pairs of angles equal? Yes: congruent.' Two triangles both have angles 40°, 60° and 80°, but one is twice as big. What does it say?**

☐ Similar

☐ Congruent

☐ Not enough to tell

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Congruent, which is wrong. Equal angles make the triangles similar; congruence needs a matching side too.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Build and check it


:::keep-together

### Order the steps

**Put the steps of a short algorithm in order. It leaves out RHS and the other similarity tests; the Run algorithm has them.**

A. `If a matching pair of sides is equal too, say "congruent (ASA or AAS)"; if not, say "similar".`

B. `If not, and two pairs of angles are equal, check the sides next.`

C. `If all three pairs of sides are equal, say "congruent (SSS)" and stop.`

D. `If not, and two pairs of sides and the angle between them are equal, say "congruent (SAS)" and stop.`

E. `If two pairs of sides and any angle are equal, say "congruent" and stop.`

F. `Otherwise, say "not enough to tell".`

G. `List the equal parts of the two triangles.`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

List the parts, test SSS, then SAS, then two angles (with or without a matching side), and finish with 'not enough to tell'.

```maths
List the equal parts of the two triangles.
If all three pairs of sides are equal, say "congruent (SSS)" and stop.
If not, and two pairs of sides and the angle between them are equal, say "congruent (SAS)" and stop.
If not, and two pairs of angles are equal, check the sides next.
If a matching pair of sides is equal too, say "congruent (ASA or AAS)"; if not, say "similar".
Otherwise, say "not enough to tell".
```

:::


:::keep-together

### Find the mistake

**Raj tests his algorithm on triangles with sides 6 cm and 8 cm and a 30° angle opposite the 6 cm side, and it says congruent. Click the line that is wrong.**

```
 1  Raj writes an algorithm to decide if two triangles are congruent.
 2  Step 1: if all three pairs of sides are equal, say "congruent".
 3  Step 2: if two pairs of sides and any pair of angles are equal, say "congruent".
 4  Step 3: otherwise, say "not enough to tell".
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: 'any pair of angles' lets SSA through. The angle must be between the two sides (SAS).

:::


:::keep-together

### Trace a pair

**Two triangles both have angles 50° and 60°. The sides between those angles are 5 cm and 10 cm. Trace the Run algorithm. Where does it end?**

☐ Similar (AA): two angles equal, but the matching sides are not

☐ Congruent (ASA)

☐ Congruent (SSS)

☐ Neither

:::


:::teacher-note

**Answer:** Similar (AA): two angles equal, but the matching sides are not

A no, B no, C yes (two angles), D no (5 ≠ 10): similar with scale factor 2.

:::


:::typical

## Find a gap and fix it


**A gap.** 

**The fix.** 

**The longest path.** 

**Test again.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Tracing algorithms


:::keep-together

### RHS

**Both triangles have a right angle, a 10 cm hypotenuse and a 6 cm side. Which answers does the algorithm give, in order?**

☐ Yes at A: congruent (SSS)

☐ No, Yes: congruent (SAS)

☐ No, No, Yes: two angles

☐ No, No, No, then Yes at E: congruent (RHS)

:::


:::teacher-note

**Answer:** No, No, No, then Yes at E: congruent (RHS)

A no, B no (the right angle is not between them), C no, E yes: RHS.

:::


:::keep-together

### SSA

**Both triangles have sides 7 cm and 5 cm, and a 40° angle opposite the 5 cm side (not between them). What should a correct algorithm say?**

☐ Congruent (SAS)

☐ Congruent (RHS)

☐ Similar

☐ Not enough to tell

:::


:::teacher-note

**Answer:** Not enough to tell

SSA can give two different triangles, so the algorithm must not say congruent.

:::


:::keep-together

### Describe it

**Which describes the algorithm best?**

☐ It checks similarity first, then congruence

☐ It measures every side and angle

☐ It only checks sides

☐ It checks the congruence tests first, then the similarity conditions, and says 'not enough to tell' if none fit

:::


:::teacher-note

**Answer:** It checks the congruence tests first, then the similarity conditions, and says 'not enough to tell' if none fit

Most specific first (congruent), then the wider class (similar), then a catch-all.

:::


:::keep-together

### Review: parallelograms

**Review: in parallelogram ABCD, angle A = 75°. What is angle B, in degrees?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 105

A and B are neighbours (co-interior): 180 − 75 = 105°.

:::


## Make: your own algorithm

Write an algorithm that sorts pairs of triangles into **congruent**, **similar** and **not enough to tell**. Draw it as a flowchart or write numbered steps. Swap with a partner: trace their algorithm on your test pairs, and describe in words how it works.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why must an algorithm for congruence not answer 'congruent' when two sides and any angle are equal?**

{{lines-3}}

:::


:::teacher-note

**Answer:** If the angle is not between the sides (SSA), two different triangles can fit, so they might not be congruent.

:::

