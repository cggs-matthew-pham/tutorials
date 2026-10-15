---
title: "Stop before you crash"
subtitle: "Robotics challenges · Sense · Lesson 3"
---

# Stop before you crash

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A car's parking sensor beeps faster as you back towards a wall, and a robot vacuum turns before it bumps the couch. Both measure how far away things are, many times a second.


:::teacher-note

**In one sentence:** Students read the robot's distance sensor inside forever and stop before an obstacle, then build a parking robot that slows down as things get closer.

**Students should be able to say:** I can read the robot's distance sensor as a number in centimetres. I can make the robot stop when something is closer than a distance I choose. I can explain why the sensor must be read again and again.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The first block picks the robot (an Elecfreaks Cutebot). **robot motor tank** sets the left and right wheel speeds: 50 and 50 means straight ahead at half speed.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c611a4d71605.png?v=38416a4285f35650)

:::keep-together

**A box is in front of the robot. What happens when the program runs?**

☐ The robot crashes into the box, because it only checks the distance once

☐ The robot drives up to the box, then backs away

☐ The robot drives forward and stops a little before the box

☐ The robot stops straight away, without moving

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It drives forward and stops a little before the box. forever reads the distance again and again, so the moment it drops below 15 cm, the robot stops.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version also shows an **X** when it stops, so you can see the moment the question became true.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/fc6c4f678136.png?v=b6c5947fe7a78a6c)

:::keep-together

### What does it read?

**With nothing in front of the robot, what does obstacle distance give?**

☐ 0

☐ Nothing: the block stops working

☐ A random number

☐ 40, the farthest the sensor can measure

:::


:::teacher-note

**Answer:** 40, the farthest the sensor can measure

The sensor can measure up to 40 cm. With nothing in range, the robot reports 40, so 'distance &lt; 15' is false and it keeps driving.

:::


:::keep-together

### Why 15?

**Why stop at 15 cm instead of 1 cm?**

☐ The sensor cannot measure 1 cm

☐ 1 cm would make the robot reverse

☐ The robot keeps rolling a little after it is told to stop, so it needs room

☐ 15 is the robot's top speed

:::


:::teacher-note

**Answer:** The robot keeps rolling a little after it is told to stop, so it needs room

Like a car, the robot slows down over a short distance after it is told to stop. Stopping early leaves room. Faster robots need more room.

:::


:::keep-together

### Mia's robot

Mia's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/71704a87b6d5.png?v=b8b799fb0c009ca7)

**Mia's robot crashes into every box. Which part is wrong?**

☐ motor stop is the wrong block

☐ 15 should be 50

☐ The if is not inside forever, so the distance is checked once, at the very start

☐ The speed is too high

:::


:::teacher-note

**Answer:** The if is not inside forever, so the distance is checked once, at the very start

Without forever, the if runs once, before the robot has moved. The box is far away then, so the robot never checks again and drives straight into it.

:::


:::typical

## Modify


**Stop farther away.** Make the robot stop when the box is closer than **25 cm**. Drag a box in front and test it.

**Stop sign.** Show an **X** on the micro:bit when the robot stops.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Stop farther away:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4901a580b2bc.png?v=04338ca1b919f684)

**Stop sign:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/fc6c4f678136.png?v=b6c5947fe7a78a6c)

:::

:::


## Make

Make a **parking robot**, like a car easing into a parking space:

- closer than **10 cm**: stop
- closer than **30 cm**: drive slowly (20)
- otherwise: drive at 50

Test it by dragging a box towards the robot, and away again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8ac734196ae6.png?v=39e9dcf6003b14eb)

:::


:::wider

## On a real robot

The same program runs on a real Cutebot: download it and put the robot on the floor facing a wall or a box. Things to notice and tune:

- **Readings jump about.** Real sensors are noisy, and soft things (a jumper, a cushion) send back weak echoes. Test with a book or a box.
- **Stopping distance changes with the floor.** On carpet the robot stops sooner than on a smooth desk. Change 10 and 30 until it stops cleanly.
- **Batteries matter.** Weak batteries make the robot slower, so it may stop shorter.

:::


## Exit ticket

:::keep-together

**Why does Mia's robot crash when the if is not inside forever?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It checks the distance once, at the start, when the box is still far away. It never checks again, so it never stops.

:::

