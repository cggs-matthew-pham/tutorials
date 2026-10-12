---
title: "Patrol and alert"
subtitle: "Robotics challenges · Final challenge: Showcase and Patrol · Lesson 11"
---

# Patrol and alert

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Hospitals use robots to carry medicines along set routes, and farms use them to check fences. A person starts and stops them from a base and hears from them only when something is wrong.


:::teacher-note

**In one sentence:** The assistance challenge. Students build a patrol system in three milestones (the base starts and stops the robot by radio, the robot reports blockages once, then an alert log and status lights), combining line following, distance, modes, roles and two-way radio.

**Students should be able to say:** I can control a robot's mode from a base station by radio. I can make a robot report a problem once, and report when it is fixed. I can give a system a log and a visible status.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/216a997e270a.png?v=5da525209750f612)

:::keep-together

**This is where the patrol starts: a robot on its own. You drag a box onto the line in front of it, then drag it away. What happens?**

☐ It follows the line straight into the box

☐ It stops at the box, then carries on along the line once the box is gone

☐ It drives round the box

☐ It stops at the box and never moves again

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It stops, then carries on. forever asks about the distance first; while the box is close it stops, and once the way is clear, followLine takes over again.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/216a997e270a.png?v=5da525209750f612)

:::keep-together

### Who does what?

**In the full patrol system, which jobs belong to the robot, and which to the base?**

Groups: Robot, Base

- Follow the line: {{field-15}}
- Send 'go' and 'stop': {{field-15}}
- Notice something in the way: {{field-15}}
- Beep and show an X when told of a problem: {{field-15}}
- Send 'blocked' once: {{field-15}}

:::


:::teacher-note

**Answer:** Follow the line → Robot; Send 'go' and 'stop' → Base; Notice something in the way → Robot; Beep and show an X when told of a problem → Base; Send 'blocked' once → Robot

:::


:::keep-together

### Jack's patrol

Jack's robot, when it hears a message:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/57023115db0a.png?v=d78b05e112192839)

**Jack's robot only twitches when the base sends 'go': it moves for a moment, then stops. Why?**

☐ He needs a bigger speed

☐ 'go' is the wrong word

☐ The radio is too weak

☐ He follows the line inside the radio handler, which runs once per message; nothing keeps the robot patrolling

:::


:::teacher-note

**Answer:** He follows the line inside the radio handler, which runs once per message; nothing keeps the robot patrolling

A radio handler runs once, when the message arrives, so followLine runs once. The handler should only set mode to patrol; forever then calls followLine again and again.

:::


:::typical

## Milestone 1: start and stop from the base

The robot follows the line from the moment it starts. Put the base in charge:

1. On the base, **A** sends **"go"** and **B** sends **"stop"**.
2. When a robot hears a message, it sets its **mode**: "patrol" for go, "stop" for stop. It starts in "stop".
3. In **forever**, the robot follows the line only when its mode is "patrol"; otherwise it stops.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9e9823d5541f.png?v=c30558d2a58a16da)

:::

:::


:::typical

## Milestone 2: report back

Make the robot report problems:

- While patrolling, if something is in the way, the robot **stops** and sends **"blocked"**, once.
- When the way is clear again, it sends **"clear"**, once, and carries on.
- The base shows an **X** and beeps for blocked, and a **tick** for clear.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/1e25df53b811.png?v=f791707c5c013158)

:::

:::


## Make: Milestone 3: a log and status lights

Finish the system:

- The base keeps a **log**: it counts the alerts and shows the count when its **logo** is touched.
- The robot shows its status in its lights: **green** while patrolling, **red** when blocked, **off** when stopped.

Then make it yours: a hospital delivery robot, a fence checker or a warehouse patrol. Change the messages and pictures to suit.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/30ee2c011f53.png?v=1d1588cac803cfc2)

:::


:::wider

## On a real robot

Set up a tape loop and put a bare micro:bit with a person as the base (press A+B on it). Things to notice:

- Every patrol team needs its own radio group.
- A real robot stops at people's feet too: that is a feature, not a bug.
- If the robot goes out of radio range its messages are lost. What should a real patrol robot do then? (Real ones store them and send them later.)

:::


## Exit ticket

:::keep-together

**Why does the robot's radio handler set the mode instead of driving the motors?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A handler runs once per message, and forever keeps driving the motors. Setting the mode lets forever do the job again and again until the mode changes.

:::

