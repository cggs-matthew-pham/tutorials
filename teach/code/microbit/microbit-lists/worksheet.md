---
title: "Lists"
subtitle: "micro:bit Foundations · Collections and tools · Lesson 7"
---

# Lists

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A playlist, a lunch menu, a class roll: each is a list of things in order, and you pick one by its place or at random.


:::teacher-note

**In one sentence:** Students keep several values in a list, pick items by place (counted from 0) and at random, and use the list's length so it can grow.

**Students should be able to say:** I can make a list and get an item by its place. I can explain why the last place is the length minus 1. I can pick a random item from a list of any length.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**get value at 1** takes one item out of the list, by its place.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/c77213580e4c.png?v=77508cf81b1361a2)

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

This is a **magic 8-ball**: shake it and it picks a random answer. **pick random 0 to length − 1** chooses a place, and **get value at** takes the item at that place.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b4fc2fb5580c.png?v=d2a847d695c709cc)

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

Places start at 0, so 5 items use places 0, 1, 2, 3 and 4. The last place is the length minus 1.

:::


:::keep-together

### Kai's 8-ball

Kai's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/761497ee179c.png?v=aac3d8854c9eccbc)

**Kai's magic 8-ball never says Yes, and sometimes it goes wrong. Why?**

☐ randint is broken

☐ Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there

☐ Yes is too short to show

☐ The list needs four items

:::


:::teacher-note

**Answer:** Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there

Yes is at place 0, which Kai never picks, and place 3 does not exist. Picking from 0 to length − 1 covers every item.

:::


:::typical

## Modify


**More answers.** Add two answers of your own. Shake a few times: do the new answers come up? (You did not have to change the random part. Why not?)

**How many?.** Make **A** show how many answers are in the list.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**More answers:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4c1ca4b3ef37.png?v=b9d3d0874e3c1137)

**How many?:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7d3b89056f79.png?v=af828fc1624b7fc0)

:::

:::


## Make

Make **rock, paper, scissors**. Each shake shows Rock, Paper or Scissors, picked at random from a list. Play against a friend with their own micro:bit (or the simulator).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f136aab9579c.png?v=e6ef3cd83ba94a3e)

:::


:::wider

## Change a team picker

This picks a name at random from a class list. Put in names from your class, then make **B** show the first name in the list.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A list has 4 items. Which places can you use, and which is the last?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Places 0, 1, 2 and 3. The last is 3, the length minus 1.

:::

