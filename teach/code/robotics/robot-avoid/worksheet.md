---
title: "Avoid and explore"
subtitle: "Robotics challenges · Sense · Lesson 4"
---

# Avoid and explore

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A robot vacuum never plans a route round your living room. It drives until it senses something, turns, and drives again, and in time it covers the whole floor.


:::teacher-note

**In one sentence:** Students use if … else inside forever so the robot turns away from close objects and keeps exploring, then add a random turn to make a robot vacuum.

**Students should be able to say:** I can use if … else in forever so the robot chooses between two moves. I can put a short routine (back up, then turn) in a branch. I can use a random choice so the robot does not always turn the same way.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bd46dcb24f0c.png?v=2a73364e5c28d691)

:::keep-together

**The robot drives towards a box. What happens?**

☐ It spins round and round on the spot forever

☐ It crashes into the box

☐ It turns away from the box and keeps exploring

☐ It stops in front of the box

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It turns away and keeps exploring. When the box is closer than 15 cm, it turns for half a second; once the way is clear, else drives it forward again.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bd46dcb24f0c.png?v=2a73364e5c28d691)

:::keep-together

### Back to forward

**After turning away, how does the robot know to drive forward again?**

☐ The turn block tells it to

☐ It waits for a button press

☐ It remembers that it has turned

☐ forever runs the if again: the box is no longer close, so else drives forward

:::


:::teacher-note

**Answer:** forever runs the if again: the box is no longer close, so else drives forward

forever checks again straight after the turn. The way is clear now, so the question is false and else runs: drive forward.

:::


:::keep-together

### Zara's robot

Zara's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/14090948dfc4.png?v=4654ad662019d00e)

**Zara's robot spins on the spot in open space, and drives straight into boxes. Which part is wrong?**

☐ The speeds should be 100

☐ The &gt; should be &lt;: her robot turns when things are far away and drives when they are close

☐ She needs robot motor stop

☐ The turn is too short

:::


:::teacher-note

**Answer:** The &gt; should be &lt;: her robot turns when things are far away and drives when they are close

'distance &gt; 15' is true when nothing is near, so Zara's robot turns in open space. When a box is close, the question is false and else drives straight at it.

:::


:::typical

## Modify


**Back up first.** Real robot vacuums back up a little before they turn, so they do not scrape the furniture. Add that to the **if**.

**Indicator lights.** Show **red** lights while the robot is turning away and **green** while it drives, like a warning light on a forklift.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Back up first:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4bed665119bb.png?v=337df846a33a84b3)

**Indicator lights:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fb12378306d1.png?v=695dca5532969ca9)

:::

:::


## Make

A robot that always turns the same way can get stuck going round the same corner. Make a **robot vacuum** that turns a **random** way:

- when something is close: back up, then turn **left or right at random**
- otherwise: drive forward

**pick random 0 to 1** (in **Math**) gives 0 or 1, like a coin toss.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9fef9192e535.png?v=aed8677fe3cd9597)

:::


:::wider

## On a real robot

On a real floor, try your vacuum in a box or a corner of the room built from books. Things to notice:

- A real sensor **sees walls**, and a robot that approaches a wall at an angle may get a weak echo: it can scrape along before it turns.
- Soft things (cushions, clothes) return weak echoes too. Real robot vacuums add bump sensors for the things their eyes miss.
- If it turns too little to get clear, make the turn longer.

:::


## Exit ticket

:::keep-together

**How does if … else inside forever let a robot explore a room without a plan?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Every time round, it checks the distance and chooses: turn away if something is close, else drive forward. Many small choices add up to exploring.

:::

