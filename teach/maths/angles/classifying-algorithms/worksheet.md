---
title: "Algorithms for classifying shapes"
subtitle: "Angles and shapes · Algorithms · Lesson 15"
---

# Algorithms for classifying shapes

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A sorting machine at a factory has to name every shape that rolls past, with no one to help. What questions would you build into it, and in what order?


:::teacher-note

**In one sentence:** Students follow, fix and test algorithms that classify triangles and quadrilaterals, and describe how each works (AC9M7SP04, nodes 1 and 2).

**Students should be able to say:** I can follow an algorithm and say what each decision does. I can put the questions of a classifier in an order that works. I can test an algorithm on one shape of every class.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Would you be happy with that answer from a sorting machine?

:::keep-together

**An algorithm asks only: 'Are two sides equal? Yes: isosceles. No: scalene.' A triangle has sides 4, 4 and 4. What does it say?**

☐ Equilateral

☐ Scalene

☐ Isosceles

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Isosceles. Two sides are equal, so it says yes. It never tells the equilateral triangle apart from the others.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## What goes wrong


:::keep-together

### Fix the algorithm

**How can you fix the one-question triangle algorithm?**

☐ Remove the scalene answer

☐ Ask 'Are two sides equal?' twice

☐ Ask about angles instead

☐ Ask 'Are all three sides equal?' first, then 'Are two sides equal?'

:::


:::teacher-note

**Answer:** Ask 'Are all three sides equal?' first, then 'Are two sides equal?'

Test the most specific class first. An equilateral triangle then gets its own name before the wider question is asked.

:::


:::keep-together

### Find the mistake

**Pia tests her algorithm on a rectangle. Click the line where she wrongly decides it works.**

```
 1  Pia writes an algorithm for four-sided shapes.
 2  1. Are there two pairs of parallel sides? If yes, say "parallelogram".
 3  2. If not, is there one pair? If yes, say "trapezium".
 4  She tests it on a rectangle: step 1 says yes, so it says "parallelogram".
 5  She decides it works, because a rectangle is a parallelogram.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

Line 5: the algorithm gives a rectangle the name of the wider family. It should ask 'four right angles?' (or 'is it a rectangle?') before it settles for parallelogram.

:::


:::keep-together

### Testing

**How should you test a classification algorithm?**

☐ Read it through once

☐ Count its steps

☐ Run it on at least one shape of every class and check each name

☐ Run it on one shape and check the name

:::


:::teacher-note

**Answer:** Run it on at least one shape of every class and check each name

One example of every class shows missing branches and wrong orders.

:::


:::typical

## Design and test


**Order the steps.** Measure first. Which question is the most specific?

**The triangles.** 

**The quadrilaterals.** 

**A shape it was not made for.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Tracing algorithms


:::keep-together

### Questions for scalene

**In the fixed triangle algorithm, how many questions does a scalene triangle need before it is named?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

Two questions: all three sides equal? No. Two sides equal? No. Scalene.

:::


:::keep-together

### Trace a rhombus

**A rhombus (four equal sides, angles 60° and 120°) goes through the quadrilateral algorithm. Which answers does it give, in order?**

☐ No, then No

☐ No, then Yes

☐ Yes (four equal sides), then No (not all right angles)

☐ Yes, then Yes

:::


:::teacher-note

**Answer:** Yes (four equal sides), then No (not all right angles)

Four equal sides: yes. All right angles: no. So it is a rhombus.

:::


:::keep-together

### The longest path

**The quadrilateral algorithm asks at most how many questions before naming any of its five shapes?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

The longest path is A, then C, then D.

:::


:::keep-together

### Review: triangles

**Review: a triangle has angles 90°, 45° and 45°. How many of its sides are equal?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

Two equal angles mean two equal sides: an isosceles right-angled triangle.

:::


## Make: design a classifier

Now write an algorithm that sorts triangles by their **angles** into acute, right-angled and obtuse. Test it on one triangle of each class, and say how it works to a partner.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why must a classifier ask 'are all three sides equal?' before 'are two sides equal?'**

{{lines-3}}

:::


:::teacher-note

**Answer:** An equilateral triangle has two equal sides too, so the wider question would give it the wrong name.

:::

