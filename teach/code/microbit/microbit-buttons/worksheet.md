---
title: "Wait for a press"
subtitle: "micro:bit Foundations · Show and react · Lesson 3"
---

# Wait for a press

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A doorbell, a game controller, a TV remote: each one waits for a press, then does one job.


:::teacher-note

**In one sentence:** Students make programs that wait for a button press or a shake, and see that an event block runs its blocks every time its event happens, and only then.

**Students should be able to say:** I can make the micro:bit react when a button is pressed or it is shaken. I can say when on start, forever and an event block each run. I can add a new event block to react to something new.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There are three groups of blocks here. Which ones run straight away, and which ones wait?

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ae562876db2f.png?v=1b0dee3e7ad62b74)

:::keep-together

**What does the micro:bit show when it starts, and then after you press B?**

☐ Asleep, then sad when B is pressed

☐ Nothing until a button is pressed

☐ Happy, then sad, straight away when it starts

☐ Asleep, then happy and sad together

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It shows the asleep face at the start, then waits. Pressing B runs only the blocks inside 'on button B pressed', so the sad face shows.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This program has four groups of blocks. Try it in your head first.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8959e874587e.png?v=7da8165414186f1a)

:::keep-together

### When does it run?

**Match each block with when its blocks run.**

A. again and again, by itself

B. each time the micro:bit is shaken

C. each time A is pressed

D. once, when the micro:bit switches on

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `on start` | |
| `forever` | |
| `on button A pressed` | |
| `on shake` | |

:::


:::teacher-note

**Answer:** on start → D. once, when the micro:bit switches on; forever → A. again and again, by itself; on button A pressed → C. each time A is pressed; on shake → B. each time the micro:bit is shaken

:::


:::keep-together

### Count the presses

**You press A four times. How many times does the happy face appear?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 4

The blocks inside 'on button A pressed' run once for every press.

:::


:::keep-together

### Ben's button

Ben's program used an **if** block from Logic. Read this for now: it asks a yes-or-no question, *is A pressed right now?*, and runs the blocks inside only if the answer is yes. You will use **if** properly in a later lesson.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5f19ab5c2fb6.png?v=3de5bf0f36b8d7bf)

**Ben wants A to show a heart. He put this in on start. He presses A and nothing happens. Why?**

☐ He needs a pause first

☐ on start checks the button once, when the micro:bit switches on, before he presses it

☐ Hearts only work in forever

☐ A is broken in the simulator

:::


:::teacher-note

**Answer:** on start checks the button once, when the micro:bit switches on, before he presses it

on start runs once, at the very start. By the time Ben presses A, the check is long over. 'on button A pressed' waits for the press instead.

:::


:::typical

## Modify


**Change the faces.** Choose different pictures for **A** and **B**.

**Press both.** Add a third event block for **A+B** (both buttons at once). Make it show a picture of your choice.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Press both:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/aabaf56f0de0.png?v=a4453021090bb907)

:::

:::


## Mix it up

Read the animation from the top, the way forever goes round it.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/00b21d278056.png?v=618b2949268e53db)

:::keep-together

**This animation runs in forever. Which picture stays on the longest each time round?**

☐ The heart

☐ They all stay the same time

☐ The small heart

☐ The tick

:::


:::teacher-note

**Answer:** The tick

Each pause holds the picture just before it. The tick is followed by pause 1000, the longest pause, so it stays longest.

:::


## Make

Build a **signal board** for a bike rider:

- **A** shows an arrow pointing left.
- **B** shows an arrow pointing right.
- **A+B** shows a cross for "stop".
- **Shake** shows a surprised face.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/fe54dba193c9.png?v=e5a418c982555710)

:::


:::wider

## Change a bike indicator

Real bike indicators flash. This one flashes each arrow twice. Make it flash three times, then make **A+B** flash a warning (both arrows, or a picture you draw).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does 'if button A is pressed' in on start not work, when 'on button A pressed' does?**

{{lines-3}}

:::


:::teacher-note

**Answer:** on start checks once, when the micro:bit switches on, before anyone presses. The event block waits and runs every time A is pressed.

:::

