---
title: "Report back"
subtitle: "Robotics challenges · Talk · Lesson 9"
---

# Report back

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Inspection robots patrol pipelines, warehouses and bush tracks on their own. They only call a person when they find something: a leak, a spill, a fallen tree.


:::teacher-note

**In one sentence:** Students make a patrol robot that follows the line and sends a radio alert to a base station when it is blocked, using a true/false variable so it alerts once, then build a snake spotter.

**Students should be able to say:** I can make a robot send a radio message when its sensor detects something. I can use a true/false variable so a message is sent once, not every time round. I can give one program two roles (robot and base) with a variable.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/224a8f796768.png?v=e6ff7ac0d5244c9f)

:::keep-together

**Press A+B on the second micro:bit (the base). Then drag a box onto the line in front of the first robot. What does the base do?**

☐ Nothing: the base cannot hear the robot

☐ Its own robot drives to help

☐ Shows an X and beeps again and again while the box is there

☐ Shows an X and beeps once

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It shows an X and beeps once. The robot sends 'blocked' and sets alerted to true, so it does not send again until the way is clear.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/224a8f796768.png?v=e6ff7ac0d5244c9f)

:::keep-together

### Tell once

**What is the variable alerted for?**

☐ It remembers that the robot has already sent 'blocked', so it only sends once until the way is clear

☐ It counts the alerts

☐ It stops the robot

☐ It chooses the radio group

:::


:::teacher-note

**Answer:** It remembers that the robot has already sent 'blocked', so it only sends once until the way is clear

alerted becomes true when the alert is sent. While the box stays, forever sees alerted is true and does not send again. When the way is clear, alerted goes back to false, ready for next time.

:::


:::keep-together

### Noah's patrol

Noah's robot (the rest of his program is the same):

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b2b096f80467.png?v=334a2d6171317c81)

**Noah's base beeps again and again, very fast, while the box is in front of his robot. Why?**

☐ His robot sends 'blocked' every time forever runs while the box is there, because nothing remembers it has already told

☐ The radio echoes

☐ His base is broken

☐ He needs a bigger distance

:::


:::teacher-note

**Answer:** His robot sends 'blocked' every time forever runs while the box is there, because nothing remembers it has already told

forever runs many times a second. While the box is close, Noah's if is true every time, so it sends every time. A variable like alerted lets it send once.

:::


:::typical

## Modify


**All clear.** A person at the base wants to know when the problem is fixed. When the way is clear again, the robot sends **"clear"** (once), and the base shows a **tick**.

**Count the alerts.** Make the base **count** the alerts and show how many there have been, like a log of a shift's problems.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**All clear:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4b060a3756df.png?v=c982dd79dbd0f928)

**Count the alerts:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/d9a7cf11b722.png?v=a57f7a2013e15231)

:::

:::


## Make

Make a **snake spotter** for a bush track. The robot patrols the line; when something is in the way it:

- stops, shows **red** lights and sends **"snake"** to the base
- waits two seconds, then **turns round** and patrols back

The base shows the **snake** picture and sounds an **alarm**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4933f8966bcb.png?v=ef059a91a9fcba14)

:::


:::wider

## On a real robot

With real micro:bits, one stays with a person as the base (press A+B on it) and the other goes in the robot. Things to notice:

- Use your own radio group, as in lesson 7.
- Radio has a range: a patrol robot that goes too far, or behind a wall, cannot be heard. Real inspection robots store their alerts and send them when they are back in range.
- A real sensor sees walls and people too: a patrol robot needs a clear track.

:::


## Exit ticket

:::keep-together

**Why does the robot need the alerted variable?**

{{lines-3}}

:::


:::teacher-note

**Answer:** forever checks many times a second. Without alerted it would send the alert every time while the box is there; alerted remembers it has already sent, so it sends once.

:::

