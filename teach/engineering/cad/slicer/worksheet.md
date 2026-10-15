---
title: "Slicer trade-offs"
subtitle: "Design and print · Designing for the printer · Lesson 4"
---

# Slicer trade-offs

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The printer queue is a week long and your part takes four hours. Which settings can you change without making it worse, and which actually matter?


:::teacher-note

**In one sentence:** Students halve the layer height and see the time double, compare infill and walls on time and strength, see Sam's 100% infill take three hours, slice a real part one setting at a time, sort parts by the setting that matters, and meet a strength-and-time brief.

**Students should be able to say:** I can predict how layer height, infill and walls change a print. I can choose settings for what a part needs.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A part takes 80 minutes at 0.2 mm layers. At 0.1 mm layers it takes about…**

☐ 160 minutes

☐ 40 minutes

☐ 90 minutes

☐ 80 minutes

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** About 160 minutes: twice as many layers, each taking about as long.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: what buys strength


:::keep-together

### Walls or infill?

1. $\text{layers } 0.2 \to 0.1$ — Twice the layers: twice the time. Buys finish, not strength.
2. $\text{infill } 20\% \to 100\%$ — More than twice the time and plastic; strength rises a little.
3. $\text{walls } 2 \to 4$ — A little more time; strength rises a lot.
4. $\text{strong and quick}$ — More walls, modest infill, normal layers.

Now pick the best buy.

**From 2 walls and 20% infill, which change adds the most strength for the least extra time?**

☐ Halve the layer height

☐ Add two walls (4 walls, 20% infill)

☐ Raise infill to 100%

☐ Raise infill to 60%

:::


:::teacher-note

**Answer:** Add two walls (4 walls, 20% infill)

On the board: 4 walls gives strength 95 in about 106 minutes; 60% infill gives only 65 in about 137.

:::


:::keep-together

### Find the mistake

**Sam's print takes three hours and isn't much stronger. Click the line where Sam's reasoning first goes wrong.**

```
 1  Sam's bracket must be strong.
 2  More plastic inside means more strength.
 3  So Sam sets infill to 100%.
 4  The print takes three hours, and Sam misses the end of the lesson.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: most of a part's strength is in its walls. Past about 20–30%, infill costs lots of time and plastic for little strength; add walls instead.

:::


:::typical

## Slice it for real


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Trade-offs


:::keep-together

**Which setting matters most for each part?**

Groups: Thinner layers (finish), More walls (strength), Low infill (speed and plastic)

- A display model to look at: {{field-15}}
- A bracket that holds weight: {{field-15}}
- A quick test print to check a fit: {{field-15}}
- A figurine with fine detail: {{field-15}}
- A hook for a heavy bag: {{field-15}}

:::


:::teacher-note

**Answer:** A display model to look at → Thinner layers (finish); A bracket that holds weight → More walls (strength); A quick test print to check a fit → Low infill (speed and plastic); A figurine with fine detail → Thinner layers (finish); A hook for a heavy bag → More walls (strength)

Choose the setting that buys what the part needs; everything else stays at the defaults.

:::


## Make: strong and quick


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Your part must be strong and printed quickly. Which two settings do you change, and how?**

{{lines-3}}

:::


:::teacher-note

**Answer:** More walls and lower infill (keep normal layer height).

:::

