---
title: "Pick from a list"
subtitle: "micro:bit Foundations · Lists · Lesson 10"
---

# Pick from a list

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A magic 8-ball, a game that deals a random card, a playlist on shuffle: each picks a place at random, then takes the item at that place.


:::teacher-note

**In one sentence:** Students pick an item from a list at random with pick random 0 to length − 1, so every item can come up however long the list grows.

**Students should be able to say:** I can pick a random item from a list. I can say why the range is 0 to length − 1. I can add items to a list without changing the random part.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**pick random 0 to length of answers − 1** chooses a place. **get value at** takes the item at that place.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b4fc2fb5580c.png?v=d2a847d695c709cc)

:::keep-together

**You shake this magic 8-ball twice. Can it give the same answer both times?**

☐ It always says Yes

☐ No: it never repeats until every answer has been used

☐ Yes: each shake picks a new random place, and it can be the same one

☐ No: it goes in order, Yes, then No, then Maybe

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Yes. Each shake picks a random place from 0 to 2, with no memory of the last one, so the same place can come up twice.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b4fc2fb5580c.png?v=d2a847d695c709cc)

:::keep-together

### Which places?

**The list has 3 answers. Which places can pick random 0 to length − 1 choose?**

☐ Only 0

☐ 0, 1 or 2

☐ 1, 2 or 3

☐ 0, 1, 2 or 3

:::


:::teacher-note

**Answer:** 0, 1 or 2

The length is 3, so it picks from 0 to 2: exactly the three places.

:::


:::keep-together

### Kai's 8-ball

Kai's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/761497ee179c.png?v=aac3d8854c9eccbc)

**Kai's magic 8-ball never says Yes, and sometimes shows nothing at all. Why?**

☐ pick random is broken

☐ The list needs four items

☐ Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there

☐ Yes is too short to show

:::


:::teacher-note

**Answer:** Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there

Yes is at place 0, which Kai never picks, and place 3 does not exist. Picking from 0 to length − 1 covers every item.

:::


:::keep-together

### Ana's longer list

**Ana added two answers, so the list has five. Her code still picks from 0 to 2. What happens?**

☐ The two new answers never come up

☐ Only the new answers come up

☐ All five come up

☐ It shows an error

:::


:::teacher-note

**Answer:** The two new answers never come up

0 to 2 only reaches the first three places. Picking from 0 to length − 1 grows with the list.

:::


:::typical

## Modify


**Every answer.** Fix Ana's 8-ball with **length of list**, so all five answers can come up. Shake to check.

**How many?.** Make **A** show how many answers are in the list.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Every answer:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4c1ca4b3ef37.png?v=b9d3d0874e3c1137)

**How many?:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7d3b89056f79.png?v=af828fc1624b7fc0)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/cd681334681f.png?v=3078d02528747d9f)

:::keep-together

**This is last lesson's mood chooser. choice starts at 0. You press A four times. Which mood shows after the 4th press?**

☐ Happy

☐ Hungry

☐ Nothing

☐ Tired

:::


:::teacher-note

**Answer:** Tired

The presses make choice 1, 2, then 3, which goes back to 0, then 1. Place 1 is Tired.

:::


## Make

Make **rock, paper, scissors**. Each shake shows Rock, Paper or Scissors, picked at random from a list. Play against a friend with their own micro:bit (or the simulator).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f136aab9579c.png?v=e6ef3cd83ba94a3e)

:::


:::wider

## Change a team picker

This picks a name at random from a class list. Put in names from your class, then make **B** show how many names there are.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A list has 6 items. What should pick random choose between, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 0 and 5 (0 to length − 1), because places start at 0, so the last of 6 items is at place 5.

:::

