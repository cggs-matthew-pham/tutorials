---
title: "Remote control"
subtitle: "Robotics challenges · Talk · Lesson 7"
---

# Remote control

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Rescue robots go into collapsed buildings and bomb-disposal robots up to suspicious bags, while the person driving stays far away and safe. Each button press is a short message over radio.


:::teacher-note

**In one sentence:** Students turn a micro:bit into a radio remote control; each button sends a number and the robot turns each number into a move.

**Students should be able to say:** I can send a number by radio when a button is pressed. I can make a robot choose a move for each number it receives. I can explain why the remote and robot need the same radio group and the same code.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5d9e0881f8ca.png?v=96569019994c6731)

:::keep-together

**You press A on the first micro:bit. Which robot drives forward?**

☐ The second robot

☐ Neither: radio cannot drive robots

☐ The first robot

☐ Both robots

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The second robot. The first micro:bit sends 1; a micro:bit never hears its own messages, so only the second micro:bit receives 1 and drives its robot.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5d9e0881f8ca.png?v=96569019994c6731)

:::keep-together

### The code

**Match each button with the number it sends and what the robot does.**

A. stop

B. turn right a little, then stop

C. drive forward until told otherwise

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `A sends 1` | |
| `B sends 2` | |
| `A+B sends 0` | |

:::


:::teacher-note

**Answer:** A sends 1 → C. drive forward until told otherwise; B sends 2 → B. turn right a little, then stop; A+B sends 0 → A. stop

:::


:::keep-together

### Ben's robot

Ben's remote:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ab31241f151a.png?v=e824e799fe96d895)

Ben's robot:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/49eeb1dfa21f.png?v=ed323e7ae8d604d5)

**Ben has two programs: one for his remote, one for his robot. Pressing A does nothing. Why?**

☐ He should send a word, not a number

☐ The remote is in radio group 1 and the robot in group 2, so the robot never hears the message

☐ The robot needs a forever block

☐ Radio does not work with robots

:::


:::teacher-note

**Answer:** The remote is in radio group 1 and the robot in group 2, so the robot never hears the message

Radio messages only reach micro:bits in the same group. Ben's remote sends on group 1, but his robot listens on group 2.

:::


:::typical

## Modify


**Show the message.** A driver needs to know what the robot heard. Make the robot's micro:bit **show each number** it receives.

**Reverse.** Add a fourth command: **shaking** the remote sends **3**, and the robot **backs up** for one second.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Show the message:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e4216d4aada.png?v=1a867534e1e2d374)

**Reverse:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/27364c381628.png?v=6e33e8ed9610230d)

:::

:::


## Make

Make a remote for a **rescue robot** that moves in small, careful steps:

- **A**: turn a little left
- **B**: turn a little right
- **A+B**: drive forward for one second
- **logo**: stop

Use the first micro:bit to steer the second robot round a box and back.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c95374dfc629.png?v=134295d71ce9586a)

:::


:::wider

## On a real robot

With real micro:bits, download the program to the **remote** and to the micro:bit in the **robot**. Things to notice:

- **Use your own radio group.** Every pair in the room needs a different group, or your remote drives someone else's robot.
- The remote does not need to be in a robot. If it shows an error without one, ask your teacher for a copy without the robot start block.
- Radio reaches across a classroom, but walls and bodies weaken it.

:::


## Exit ticket

:::keep-together

**The remote sends 2. Where is it decided what 2 means?**

{{lines-3}}

:::


:::teacher-note

**Answer:** On the robot, in on radio received. The remote only sends the number; the robot's code turns it into a move.

:::

