---
title: "A model drives a micro:bit"
subtitle: "micro:bit and the computer · A model drives a build · Lesson 5"
---

# A model drives a micro:bit

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A sorting machine's camera and its motors are separate parts. The camera's model only says 'Plastic'; a small controller decides which flap to move. The two have to agree on every word.


:::teacher-note

**In one sentence:** Students send their model's labels from the board to a micro:bit over USB, program the micro:bit to act on each label and reply, then pass labels on by radio to a sorting flap.

**Students should be able to say:** I can program a micro:bit to act on lines of text it receives over USB. I can explain why the sender and receiver must agree on every word. I can handle a label my program doesn't expect.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9389c94224dd.png?v=dd2eb3a27a12856a)

:::keep-together

**Your model has a Neither class. The board sends "Neither" to a micro:bit running this program. What does it show?**

☐ Nothing

☐ An error

☐ P

☐ L

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** L. The program checks only for "Paper"; else catches every other line, including "Neither".

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


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9389c94224dd.png?v=dd2eb3a27a12856a)

:::keep-together

### What is sent

**What travels down the USB cable when the board sends a label?**

☐ A number from 1 to 3

☐ A line of text, such as Paper

☐ The whole model

☐ The photo

:::


:::teacher-note

**Answer:** A line of text, such as Paper

Only the label, as text, ending with a new line. The micro:bit never sees the photo or the model.

:::


:::keep-together

### Ben's sorter

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f4e32b2a3db4.png?v=afe8dce8bfa6f526)

**Ben's model has classes Paper and Plastic. His micro:bit never shows anything. Why?**

☐ He checks for "paper" and "plastic", but the board sends "Paper" and "Plastic"

☐ Serial only works with numbers

☐ He needs a forever block

☐ His micro:bit is too slow

:::


:::teacher-note

**Answer:** He checks for "paper" and "plastic", but the board sends "Paper" and "Plastic"

Text has to match exactly, capital letters included. Both sides must agree on every word.

:::


:::keep-together

### Unsure labels

**Why does the webcam wait for a label to hold for a moment above 80% before sending it?**

☐ The cable is slow

☐ So a model that flickers between two labels doesn't make the micro:bit jump back and forth

☐ The micro:bit can only read one label a minute

☐ So the model can retrain

:::


:::teacher-note

**Answer:** So a model that flickers between two labels doesn't make the micro:bit jump back and forth

When the model is unsure, its top label changes many times a second. Acting on every change would make a sorter jitter.

:::


:::typical

## Modify


**Neither.** Give **Neither** its own branch that shows a cross, and make **Plastic** a branch of its own too.

**Reply.** A sorter should say what it did. Make the micro:bit **reply** with **serial write value**: `bin` 1 for Paper, 2 for Plastic, 0 for anything else. On the board, the replies appear under the buttons.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Neither:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/eab3070036f6.png?v=b95028ab128a52ac)

**Reply:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5ea20258d9a6.png?v=7ade6b316a6f4267)

:::

:::


:::typical

## Over radio

A sorter on a conveyor belt is not plugged into a laptop. This is the **bridge** from **A radio bridge**: the micro:bit on the cable passes each line on by **radio**, and passes radio values back to the board. Add **on radio received string** so a second micro:bit shows the first letter of each label and replies **got 1**. Download the same program to both micro:bits; plug one into the computer.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f80dea4ffd60.png?v=0a181b2992a09abd)

:::

:::


## Make a sorting flap

Build a **sorting flap**: a servo on **P0** on the second micro:bit tips left for **Paper**, right for **Plastic**, and stays in the middle for anything else, then replies with the bin. Try it with your model and real items.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/558256353b3e.png?v=1bba60f61e3df43d)

:::


:::wider

## On a real micro:bit

- **Chrome or Edge only.** Safari, Firefox and iPads can't connect.
- **"The micro:bit is busy"**: another tab (often MakeCode) is using the cable. Disconnect it there or close that tab.
- **Same radio group** on both micro:bits, and a different group for every pair in the room.
- A servo needs more power than USB sometimes gives: if it twitches or the micro:bit resets, use a battery pack or a servo board.

:::


## Exit ticket

:::keep-together

**The model sends "Glass", a class the micro:bit's program doesn't check for. What should the program do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Something safe: an else branch that leaves the flap in the middle (or stops), so an unexpected label never causes a wrong action.

:::

