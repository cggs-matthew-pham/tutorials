---
title: "Tripwire"
subtitle: "Robotics challenges · Final challenge: Showcase and Patrol · Lesson 12"
---

# Tripwire

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Factories put sensors beside conveyor belts: when a box passes, the next machine is told to act. Shops use beams at the door to tell a speaker to chime. One device notices, another acts.


:::teacher-note

**In one sentence:** An optional challenge for students who finish early. Two robots work as a team; one stands still as a tripwire and, armed with a true/false variable, cues the patrolling robot once per pass; the patrol robot does a trick through its mode, then carries on.

**Students should be able to say:** I can turn a sensor into a one-shot trigger with a true/false variable. I can make one robot cue another by radio. I can design two devices that work together as a system.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5c479cb17e1e.png?v=6a962cd9ea95a3c7)

:::keep-together

**The second robot is the tripwire, beside the line and facing it. What does the tripwire's micro:bit show as the first robot passes?**

☐ A surprised face that stays for ever

☐ A surprised face while the robot is in front, then the target again

☐ The first robot stops at the tripwire

☐ Nothing: a tripwire cannot see robots

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A surprised face while the patrol robot is closer than 20 cm, then the target again once it has passed. The tripwire checks again every time round.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5c479cb17e1e.png?v=6a962cd9ea95a3c7)

:::keep-together

### Ivy's tripwire

Ivy's tripwire, in forever:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/527f6b004b01.png?v=84313606e7b2a36a)

**Ivy's tripwire sends 'trick' whenever something is closer than 20 cm. Her patrol robot starts its trick again and again as it passes. Why?**

☐ Tripwires only work once

☐ The robot is in front of the tripwire for many times round forever, so 'trick' is sent many times

☐ The trick is too long

☐ Her radio group is wrong

:::


:::teacher-note

**Answer:** The robot is in front of the tripwire for many times round forever, so 'trick' is sent many times

forever runs many times while the robot is passing, so the cue is sent many times. Like alerted in lesson 9, an armed variable lets the tripwire fire once, then wait.

:::


:::keep-together

### Who moves the motors?

**When the patrol robot hears 'trick', why should the handler only set mode to trick, instead of doing the moves itself?**

☐ The handler runs too late

☐ It saves battery

☐ Handlers cannot use motor blocks

☐ forever is calling followLine again and again, which would undo the trick's moves straight away

:::


:::teacher-note

**Answer:** forever is calling followLine again and again, which would undo the trick's moves straight away

Handlers and forever run side by side. forever keeps setting the motors for line following, so moves made in a handler are overwritten. Setting the mode lets forever do the trick itself, then go back to patrolling.

:::


:::typical

## Milestone 1: arm and fire

Turn the tripwire into a one-shot trigger:

- Pressing **A** on the tripwire **arms** it (show a tick).
- When something passes while it is armed, it sends **"trick"**, **disarms** itself, and shows a cross.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/952f81a80284.png?v=f62eefa0ff814068)

:::

:::


:::typical

## Milestone 2: the trick

Make the patrol robot do a **trick** when it is cued: lights on, a quick wiggle, lights off, then back to patrolling. Keep the trick short and finish facing the same way, so the robot can find the line again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/759b644a3d34.png?v=bd438870eaa321a6)

:::

:::


## Make: Milestone 3: a self-resetting tripwire

Make the team run by itself:

- The tripwire **counts** the passes and shows the count.
- It **re-arms itself** a few seconds after it fires, ready for the next lap.
- The trick plays a **sound** as well.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0f324de752a3.png?v=ae9069e100e92faf)

:::


:::wider

## On a real robot

With real robots, the tripwire can be a robot or just a micro:bit with an ultrasonic sensor. Place it a short distance from the track, facing across it. Real readings jump about, so you may need a range (for example between 5 and 20 cm) to ignore false readings near zero.

:::


## Exit ticket

:::keep-together

**Why does the tripwire need the armed variable?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The robot is in front of the sensor for many times round forever. Without armed the cue would be sent again and again; armed lets it fire once per pass.

:::

