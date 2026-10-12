---
title: "Follow the line"
subtitle: "Robotics challenges · Sense · Lesson 5"
---

# Follow the line

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In many warehouses and hospitals, robots carry boxes and medicines along coloured lines on the floor. They do not know where they are; they only know whether each sensor still sees the line.


:::teacher-note

**In one sentence:** Students follow a line with one sensor (swinging along its edge), then two sensors (drive straight, steer towards the side that still sees the line), and combine line following with the distance sensor to make a delivery robot that stops when blocked.

**Students should be able to say:** I can read a line sensor as true or false. I can steer towards the side whose sensor still sees the line. I can combine two sensors, asking the most important question first.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**robot motor tank 10 40** steers left (the right wheel is faster). **40 10** steers right.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5ee84e07b9fd.png?v=ad680dacf51d4b18)

:::keep-together

**This robot uses only its left sensor. It starts on the line. What does it do?**

☐ It drives straight off the line

☐ It stops, because one sensor is not enough

☐ It spins in a small circle

☐ It follows the line, swinging a little left and right as it goes

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It follows the line by swinging: on the line, it steers left until the sensor slips off; off the line, it steers right until the sensor finds it again. It follows the left edge of the line.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version uses **both** sensors, so the robot knows which way it has drifted. It drives straight while both see the line, and steers only when one slips off. *Both see the line* is an **and** block (in **Logic**): it is true only when the question on each side is true.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7ec392a12496.png?v=e28d816eb15630c1)

:::keep-together

### What should it do?

**Match what the sensors see with what the robot should do.**

A. steer left

B. stop: the line is lost

C. steer right

D. drive straight

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `both see the line` | |
| `only the left sees the line` | |
| `only the right sees the line` | |
| `neither sees the line` | |

:::


:::teacher-note

**Answer:** both see the line → D. drive straight; only the left sees the line → A. steer left; only the right sees the line → C. steer right; neither sees the line → B. stop: the line is lost

:::


:::keep-together

### Kai's robot

Kai's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b35801c28d14.png?v=91d4b67728b7665c)

**Kai's robot runs off the loop at the first bend. Which part is wrong?**

☐ Line sensors only work on straight lines

☐ His speeds are too slow

☐ He needs a forever block

☐ His turns are swapped: when only the left sensor sees the line, he steers right, away from it

:::


:::teacher-note

**Answer:** His turns are swapped: when only the left sensor sees the line, he steers right, away from it

When only the left sensor sees the line, the line is to the left, so the robot must steer left, towards it. Kai steers away, so the robot leaves the line.

:::


:::typical

## Modify


**Faster on straights.** Delivery robots go faster where the line is straight. Make the robot drive at **60** when both sensors see the line. Does it still get round the bends?

**Lost the line.** When neither sensor sees the line, the robot stops. Make its lights turn **red** too, so a person knows it needs help.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Faster on straights:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/01974d490085.png?v=4b4244caa784f3a4)

**Lost the line:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ba7031e8a3e0.png?v=95a8c51d260ded64)

:::

:::


## Make

Make a **delivery robot**: it follows the loop, but if something is on the line ahead, it **stops** and waits until it is moved.

- Drag a box onto the line to test it, then drag the box away. Does the robot carry on?
- Which question should the robot ask **first**: the distance, or the line sensors? Why?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3ef665af22cd.png?v=e3cb95eca5e895d9)

:::


:::wider

## On a real robot

For a real track, use black electrical tape (about 2 cm wide) on a light floor or a large sheet of paper. Things to notice:

- Real line sensors are not simply on or off: shiny floors, shadows and tape edges confuse them. If yours misbehaves, try a different surface.
- Sharp corners are hard. Slow down, or make the tape curve gently.
- Robots that read **how dark** the floor is (not just on or off) can steer smoothly, turning more the further they drift. That is how competition line followers work.

:::


## Exit ticket

:::keep-together

**Only the right sensor sees the line. Which way should the robot steer, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Right: the line is on the right, so steering right brings the robot back over it.

:::

