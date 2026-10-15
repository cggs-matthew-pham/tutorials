---
title: "The first true question wins"
subtitle: "micro:bit Foundations · Decide · Lesson 8"
---

# The first true question wins

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A spirit level shows whether a shelf is flat, tilted left or tilted right. One reading, three possible answers, and exactly one of them shows.


:::teacher-note

**In one sentence:** Students add else if to ask more questions in a row, and see that the first true question wins, so the order of the questions sets the ranges.

**Students should be able to say:** I can use else if to choose between three or more things. I can say which part runs when more than one question is true. I can order the questions so every range can be reached.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the questions from the top, with -100 in mind.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3e50420b71f4.png?v=50a4ea63ab42d2d6)

:::keep-together

**You tilt the micro:bit a little to the left, just enough that acceleration x is -100. What shows?**

☐ An arrow pointing right

☐ Nothing

☐ An arrow pointing left

☐ The small square

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The small square. -100 is not less than -300 and not more than 300, so neither question is true and the else part runs.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3e50420b71f4.png?v=50a4ea63ab42d2d6)

:::keep-together

### Trace the tilt

**For each value of acceleration x, what shows?**

{{rows 1}}

| acceleration x | shows |
|---|---|
| -500 |   |
| 0 |   |
| 400 |   |
| 300 |   |

:::


:::teacher-note

**Answer:** left arrow, small square, right arrow, small square

-500 is less than -300, so the first part runs. 0 and 300 fit neither question (300 is not more than 300), so else runs. 400 is more than 300.

:::


:::keep-together

### Leo's tilt

Leo's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7b8ff79eef02.png?v=4a31889817558473)

**Leo wants a small tilt right to show a diamond and a big tilt right to show an arrow. The arrow never appears. Why?**

☐ A big tilt is also more than 0, so the first question is true and the rest are skipped

☐ else if only works with &lt;

☐ The arrow block is broken

☐ 500 is too big to reach

:::


:::teacher-note

**Answer:** A big tilt is also more than 0, so the first question is true and the rest are skipped

The questions are asked from the top, and the first true one wins. Any tilt over 500 is also over 0, so the diamond shows. Ask the bigger question first: &gt; 500, then &gt; 0.

:::


:::typical

## Modify


**Fix Leo's tilt.** Leo's program is in the editor. Swap the questions so both parts can be reached.

**Left as well.** Add another **else if** for a big tilt **left**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Fix Leo's tilt:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5065e0f4986b.png?v=04ffdf77ea86e278)

**Left as well:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8e0fbf42c669.png?v=9d77d4b90b0f899b)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3e2c51354c7e.png?v=15f0c3366e54b20a)

:::keep-together

**This is last lesson's bike light. What does it show at each light level?**

{{rows 1}}

| light level | shows |
|---|---|
| 30 |   |
| 200 |   |

:::


:::teacher-note

**Answer:** all the LEDs, small square

30 is less than 50, so the first part runs: all the LEDs. 200 is not, so the else part runs: the small square.

:::


## Make

Make a **comfort meter** for a classroom, in **one** if block with three parts:

- Below **15**: cold (draw it).
- From **15** to **24**: just right (a happy face).
- **25** and above: hot (draw it).

You need only two questions. The order does the rest.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2815eab675f3.png?v=9ad2c7ab8f3dbb0d)

:::


:::wider

## Change a spirit level

This spirit level points the way to tilt back to flat, and shows a tick when it is level. Make it fussier (a smaller tilt counts as not level), then make it check **forward and back** as well.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**if temperature &gt; 0 … else if temperature &gt; 30 … What shows at 35 degrees, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The first part. 35 is more than 0, so the first question is true and the rest are skipped. Ask &gt; 30 first.

:::

