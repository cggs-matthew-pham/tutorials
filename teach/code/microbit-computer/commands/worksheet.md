---
title: "Commands from the computer"
subtitle: "micro:bit and the computer · Talk over USB · Lesson 2"
---

# Commands from the computer

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A 3D printer, a laser cutter and a robot arm in a factory all take orders from a computer as short lines of text: move here, heat up, stop. The machine's own program decides what each line means.


:::teacher-note

**In one sentence:** Students program a micro:bit to act on words the computer sends over USB, reply to each one, and handle words it doesn't know.

**Students should be able to say:** I can make a micro:bit act on a line of text sent from the computer. I can explain why the words must match exactly. I can reply to each command, including words my program doesn't know.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a2d1ac736d04.png?v=fa4f2bf6375a7178)

:::keep-together

**The computer sends the line Happy (with a capital H) to a micro:bit running this program. What does it show?**

☐ A happy face

☐ The word Happy

☐ A sad face

☐ Nothing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing. The program checks for happy with a small h. Text must match exactly, so Happy matches neither branch.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a2d1ac736d04.png?v=fa4f2bf6375a7178)

:::keep-together

### When it runs

**When does on serial data received run?**

☐ Each time a whole line arrives (it ends with a new line)

☐ When a button on the micro:bit is pressed

☐ Every half second

☐ Only when the micro:bit starts

:::


:::teacher-note

**Answer:** Each time a whole line arrives (it ends with a new line)

It waits for the end of a line, then runs once. read line gives you that line, without its new line.

:::


:::keep-together

### Ben's micro:bit

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/806696a7939d.png?v=586802d837e622ff)

**Ben's micro:bit never reacts, whatever the board sends. His program starts with on serial data received with delimiters comma. Why?**

☐ He needs a forever block

☐ The cable is too slow

☐ It waits for a comma, but the board ends each line with a new line, so it never runs

☐ Commas are not allowed in serial

:::


:::teacher-note

**Answer:** It waits for a comma, but the board ends each line with a new line, so it never runs

The delimiter is the character that ends a message. The board ends each line with a new line, so the micro:bit must wait for a new line.

:::


:::keep-together

### Replies

**Why is it useful for the micro:bit to send a reply, such as ok?**

☐ Replies are needed for the LEDs to work

☐ Replies make the cable faster

☐ The micro:bit forgets the command otherwise

☐ The computer then knows the command arrived and was understood

:::


:::teacher-note

**Answer:** The computer then knows the command arrived and was understood

Without a reply the sender can't tell whether a command arrived, or whether it was a word the micro:bit doesn't know.

:::


:::typical

## Modify


**A new command.** Add a **heart** command. On the board, type **heart** in the box to test it.

**Reply.** Make the micro:bit **reply**: **ok** when it knows the word, **?** when it doesn't. The board shows the replies.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A new command:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ec79aaf7cfd6.png?v=8e3d7f3dcd65564d)

**Reply:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/08fd679918b7.png?v=805a158479c23eae)

:::

:::


## Make

Make a **desk lamp** the computer controls. **on** lights every LED, **off** clears the screen, **count** shows (and sends back) how many commands it has had. Reply **ok** to on and off and **?** to anything else.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/01eb0b88e5c6.png?v=4fed34d5f34d5eb2)

:::


:::typical

## Test the lamp

Download your lamp to a micro:bit, connect it, and use the buttons. Type a word it doesn't know, too.

:::


## Exit ticket

:::keep-together

**The computer sends Stop but the micro:bit's program checks for stop. What happens, and how would you fix it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing matches, so nothing happens (or the else runs). Make both sides use exactly the same word.

:::

