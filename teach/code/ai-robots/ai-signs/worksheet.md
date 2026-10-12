---
title: "Signs: some mistakes cost more"
subtitle: "AI robots · Costly mistakes · Lesson 4"
---

# Signs: some mistakes cost more

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A self-driving car that brakes for a plastic bag is annoying. One that drives through a stop sign is dangerous. Its designers make it much more careful about some decisions than others.


:::teacher-note

**In one sentence:** Students drive a robot with printed signs read by their own model, and make it more careful where a mistake costs more (a higher threshold for Go, and Go twice in a row).

**Students should be able to say:** I can explain why some mistakes by a model cost more than others. I can explain how a higher threshold trades speed for safety. I can make a robot act on a costly label only when it is sure.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The robot is near the edge of a table. Which mistake by the model is worst?**

☐ Seeing Go when the sign says Stop

☐ Seeing Stop when the sign says Go

☐ Seeing Left when the sign says Right

☐ Seeing Unsure when the sign says Left

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Seeing Go when the sign says Stop: the robot drives off the table. The other mistakes waste time; this one breaks something. So Go should need the most confidence.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Investigate


:::keep-together

### Lower

**What happens if Go also needed only 70%?**

☐ The robot never moves

☐ The model gets more accurate

☐ The robot moves sooner, but a Stop sign mistaken for Go now and then makes it drive on

☐ Nothing changes

:::


:::teacher-note

**Answer:** The robot moves sooner, but a Stop sign mistaken for Go now and then makes it drive on

A lower threshold sends Go more often, including the times the model is wrong.

:::


:::keep-together

### Higher everywhere

**What happens if every label needed 95%?**

☐ Nothing changes

☐ It ignores Stop

☐ It drives faster

☐ The robot is very safe but often stops (Unsure) when a sign is clear enough to a person

:::


:::teacher-note

**Answer:** The robot is very safe but often stops (Unsure) when a sign is clear enough to a person

Too much caution everywhere makes a robot that keeps stopping. Caution goes where mistakes are costly.

:::


:::keep-together

### Where caution goes

**Sort each decision: should it need high confidence or is lower fine?**

Groups: High confidence, Lower is fine

- A car decides the road ahead is clear: {{field-15}}
- A music app guesses which song to play next: {{field-15}}
- A robot decides it is safe to drive forward: {{field-15}}
- A photo app suggests who might be in a picture, for you to confirm: {{field-15}}

:::


:::teacher-note

**Answer:** A car decides the road ahead is clear → High confidence; A music app guesses which song to play next → Lower is fine; A robot decides it is safe to drive forward → High confidence; A photo app suggests who might be in a picture, for you to confirm → Lower is fine

:::


:::typical

## Modify


**Stop at once.** Make **Stop** act the moment it arrives, without waiting for forever: stop, red lights, a beep.

**Go twice.** The board repeats each label every second, so "Go twice in a row" means about a second of steady Go. Make the robot wait for that before driving.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Stop at once:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/16dd240e18db.png?v=c1b3011f456df072)

**Go twice:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a8810f2ebf85.png?v=7e83b8fccc44567f)

:::

:::


## Make

Make a **careful sign robot**: **Go** only after hearing it twice in a row, **Left** and **Right** turn, and **anything else** (Stop, Unsure, a word it doesn't know, or two seconds of silence) stops it. Lights: **green** going, **yellow** turning, **red** stopped.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aef0dfb1fd15.png?v=f050f579f5f5bb27)

:::


## Exit ticket

:::keep-together

**Why does Go need a higher threshold than Left?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Mistaking Stop for Go can cause a crash; mistaking Left for Right only wastes time. Costly actions need more confidence.

:::

