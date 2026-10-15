---
title: "Lists"
subtitle: "micro:bit Foundations · Lists · Lesson 9"
---

# Lists

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A playlist, a lunch menu, a class roll: each is a list of things in order, and you pick one by its place.


:::teacher-note

**In one sentence:** Students keep many values in one list and take one out by its place, counted from 0.

**Students should be able to say:** I can make a list and get an item by its place. I can say why the first item is at place 0. I can step through a list with a variable.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**get value at 1** takes one item out of the list, by its place.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c77213580e4c.png?v=77508cf81b1361a2)

:::keep-together

**You press A. What does the micro:bit show?**

☐ Nothing

☐ Yes

☐ No

☐ Maybe

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No. The places are counted from 0: Yes is at 0, No is at 1, Maybe is at 2. Place 1 is No.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c77213580e4c.png?v=77508cf81b1361a2)

:::keep-together

### Places

**The list is Yes, No, Maybe. What is at each place?**

{{rows 1}}

| place | item |
|---|---|
| 0 |   |
| 1 |   |
| 2 |   |

:::


:::teacher-note

**Answer:** Yes, No, Maybe

The first item is at place 0. Three items use places 0, 1 and 2.

:::


:::keep-together

### The last place

**A list has 5 items. What is the place number of the last one?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 4

Places start at 0, so 5 items use places 0, 1, 2, 3 and 4. The last place is one less than the number of items.

:::


:::keep-together

### Jo's first word

**Jo wants A to show the first word, Yes. She uses get value at 1. What does A show?**

☐ No

☐ Yes

☐ Nothing

☐ An error

:::


:::teacher-note

**Answer:** No

Place 1 is the second item, No. The first item is at place 0.

:::


:::typical

## Modify


**One more word.** Add a fourth word, **Later**. Which place is it at? Make **B** show it.

**The first word.** Make **A+B** show the first word.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One more word:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b001037578ed.png?v=30d34fa151b460bf)

**The first word:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bd4272bc3775.png?v=cd165f1284bdd5e7)

:::

:::


## Mix it up

A tilt meter from the Decide unit.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5065e0f4986b.png?v=04ffdf77ea86e278)

:::keep-together

**A tilt meter: what shows for each value of acceleration x?**

{{rows 1}}

| acceleration x | shows |
|---|---|
| 600 |   |
| 200 |   |
| -50 |   |

:::


:::teacher-note

**Answer:** right arrow, small diamond, small square

600 is more than 500, so the first part runs. 200 is not, but it is more than 0. -50 is neither, so else runs.

:::


## Make

Make a **mood chooser**. The list of moods and the variable `choice` are made for you. Each press of **A** shows the next mood: Happy, then Tired, then Hungry, then back to Happy.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/cd681334681f.png?v=3078d02528747d9f)

:::


:::wider

## Change a lunch menu

This menu has a lunch for each school day, Monday first. **A** shows Monday's. Put in your canteen's lunches, then make **B** show Friday's.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A list has Red, Green, Blue. What is at place 2, and what is at place 3?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Blue is at place 2. There is no place 3: three items use places 0, 1 and 2.

:::

