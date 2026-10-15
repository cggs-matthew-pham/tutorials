---
title: "If and else"
subtitle: "micro:bit Foundations · Decide · Lesson 7"
---

# If and else

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A bike light is on in the dark and off in daylight. Never both, never neither: one question decides which.


:::teacher-note

**In one sentence:** Students use if … else to choose between two things, and see that exactly one part runs each time: the else runs only when the question is false.

**Students should be able to say:** I can use if … else to choose between two things. I can say when the else part runs. I can turn two ifs into one if … else.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This is last lesson's night light, built with one **if … else**.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/714f300bb86e.png?v=b2c428d5e432f9a8)

:::keep-together

**The light level is 20 (dark). Which parts of the if … else run, each time round forever?**

☐ The first part, then the else part: on, then cleared

☐ Only the first part: the lights come on

☐ Only the else part

☐ Neither part

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Only the first part. 20 is less than 50, so the question is true and the lights come on. The else part runs only when the question is false.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/714f300bb86e.png?v=b2c428d5e432f9a8)

:::keep-together

### Trace the light

**For each light level, what does the night light do?**

{{rows 1}}

| light level | does |
|---|---|
| 20 |   |
| 200 |   |
| 50 |   |
| 49 |   |

:::


:::teacher-note

**Answer:** lights on, clears the screen, clears the screen, lights on

Below 50 the question is true, so the first part runs. 50 and above, it is false, so the else part runs. 50 is not less than 50.

:::


:::keep-together

### Kim's flicker

**Kim thinks that in the dark her night light turns the lights on and then the else part clears them straight away, so it flickers. Is she right?**

☐ No: the else part never runs

☐ Yes, but only on a real micro:bit

☐ No: each time round, only one part runs

☐ Yes: the else part always runs after the if part

:::


:::teacher-note

**Answer:** No: each time round, only one part runs

if … else runs exactly one of its two parts. In the dark the question is true, so only the first part runs, every time round.

:::


:::keep-together

### When does else run?

**When does the else part run?**

☐ Only when the question is true

☐ Only when the question is false

☐ Never: it is for notes

☐ Always, after the first part

:::


:::teacher-note

**Answer:** Only when the question is false

else means otherwise: it runs when the question is false, and only then.

:::


:::typical

## Modify


**One if, not two.** This is the two-if night light. Rebuild it with one **if … else**.

**A dim glow.** Make the else part show a small dot or square, so the light glows a little in the day.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One if, not two:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/714f300bb86e.png?v=b2c428d5e432f9a8)

**A dim glow:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3e2c51354c7e.png?v=15f0c3366e54b20a)

:::

:::


## Mix it up

A counter with a prize, from earlier lessons.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f776d197b683.png?v=0e8de4ffdbdfd5e5)

:::keep-together

**Each press of A adds 1 to count, shows it, and shows a diamond (the prize) if count is 5. What shows straight after the 6th press?**

☐ Nothing

☐ 6

☐ The diamond

☐ 5

:::


:::teacher-note

**Answer:** 6

After the 6th press count is 6, which is shown. 6 is not 5, so the if does nothing: no diamond.

:::


## Make

Make a **bike light** with one **if … else**:

- When it is **dark** (light level below 50): light all the LEDs.
- **Else**: show a small square, to save the battery.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3e2c51354c7e.png?v=15f0c3366e54b20a)

:::


:::wider

## Change a desk lamp

This desk lamp lights up when the room is dim. Make it switch at 120 instead, and show a moon you draw when it is on.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**In an if … else, when does the else part run?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Only when the question is false. Exactly one of the two parts runs each time.

:::

