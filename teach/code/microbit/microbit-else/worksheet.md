---
title: "Else and ranges"
subtitle: "micro:bit Foundations · Decide · Lesson 6"
---

# Else and ranges

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A spirit level shows whether a shelf is flat, tilted left or tilted right. One reading, three possible answers, and exactly one of them shows.


:::teacher-note

**In one sentence:** Students choose between two or more options with if, else if and else, and find that the first true question wins, so the order sets the ranges.

**Students should be able to say:** I can use if … else so exactly one of two things happens. I can use else if to choose between three or more options. I can put questions in the right order so each range works.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Tilting left makes **acceleration x** go below 0; tilting right makes it go above 0. A small tilt gives a small number.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3e50420b71f4.png?v=50a4ea63ab42d2d6)

:::keep-together

**You tilt the micro:bit a little to the left, just enough that acceleration x is -100. What shows?**

☐ An arrow pointing right

☐ Nothing

☐ The small square

☐ An arrow pointing left

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


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3e50420b71f4.png?v=50a4ea63ab42d2d6)

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

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7b8ff79eef02.png?v=4a31889817558473)

**Leo wants a small tilt right to show a diamond and a big tilt right to show an arrow. The arrow never appears. Why?**

☐ The arrow block is broken

☐ A big tilt is also more than 0, so the first question is true and the rest are skipped

☐ 500 is too big to reach

☐ else if only works with &lt;

:::


:::teacher-note

**Answer:** A big tilt is also more than 0, so the first question is true and the rest are skipped

The questions are asked from the top, and the first true one wins. Any tilt over 500 is also over 0, so the diamond shows. Ask the bigger question first: &gt; 500, then &gt; 0.

:::


:::keep-together

### When does else run?

**When does the else part run?**

☐ Only when every question above it is false

☐ Always, after the other parts

☐ Only when the first question is true

☐ Never: it is for notes

:::


:::teacher-note

**Answer:** Only when every question above it is false

:::


:::typical

## Modify


**One if, not two.** This is last lesson's night light, with two ifs. Rebuild it with one **if … else**.

**Forward and back.** Add a second **if … else if** that shows an arrow for tilting **forward** and **back** (use **acceleration y**).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One if, not two:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/714f300bb86e.png?v=b2c428d5e432f9a8)

**Forward and back:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aafd03c5c9b6.png?v=2b275a36f52536db)

:::

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

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/2815eab675f3.png?v=9ad2c7ab8f3dbb0d)

:::


:::wider

## Change a spirit level

This spirit level points the way to tilt back to flat, and shows a tick when it is level. Make it fussier (a smaller tilt counts as not level), then make it check **forward and back** as well.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**The questions are 'temperature &lt; 15', then 'else if temperature &lt; 25', then else. What shows at 20, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The just-right picture. 20 is not less than 15, so the first part is skipped; it is less than 25, so the second part runs.

:::

