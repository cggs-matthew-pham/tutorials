---
title: "Name a job"
subtitle: "micro:bit: talk and play · Name a job · Lesson 1"
---

# Name a job

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A recipe says 'make the sauce' and the sauce is written once, on another page. Programs name their jobs the same way.


:::teacher-note

**In one sentence:** Students name a job as a function and call it from several places, and see in Python that every event block is a function the micro:bit calls.

**Students should be able to say:** I can make a function and call it from more than one place. I can say why a function is better than copied blocks. I can explain that an event block is a function the micro:bit calls for me.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**function flashHeart** holds the blocks for one flash. They only run when something **calls** flashHeart.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

:::keep-together

**You press A once. How many times does the heart flash?**

☐ Twice

☐ Four times

☐ Once

☐ It keeps flashing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Twice. The flashHeart blocks run each time the function is called, and A calls it two times.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

:::keep-together

### Noah's flash

Noah's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/d9ff58b98112.png?v=031f8f68d86b4119)

**Noah made the flashHeart function. He presses A and nothing happens. Why?**

☐ Nothing calls flashHeart: making a function does not run it

☐ Functions only work with B

☐ He needs a pause first

☐ The function is too long

:::


:::teacher-note

**Answer:** Nothing calls flashHeart: making a function does not run it

Making a function only names the job. It runs when a call block runs it. Noah's A event is empty, so nothing calls it.

:::


:::keep-together

### Two copies

**Without a function, the flash blocks are copied into A and into shake. You change the heart to a diamond in A only. What goes wrong?**

☐ Both flash a diamond

☐ A flashes a diamond and shake still flashes a heart

☐ Nothing

☐ The program stops

:::


:::teacher-note

**Answer:** A flashes a diamond and shake still flashes a heart

Copied blocks have to be changed in every copy. With a function there is one copy, so one change reaches every call.

:::


:::keep-together

### The same program in Python

MakeCode can show every program in Python. Here is this one:

```python
def flash_heart():
    basic.show_icon(IconNames.HEART)
    basic.pause(200)
    basic.clear_screen()
    basic.pause(200)
def on_button_pressed_a():
    flash_heart()
    flash_heart()
input.on_button_pressed(Button.A, on_button_pressed_a)
```

Look at what Python did with **on button A pressed**: the blocks inside became a function, and the micro:bit calls it on each press.

**This is the same program in Python (press Python at the top of the editor). Match each Python line with what it does.**

A. calls it: runs its blocks once

B. makes the function flash_heart

C. makes a function from the blocks inside on button A pressed

D. hands that function to the micro:bit to call on each press

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def flash_heart():` | |
| `flash_heart()` | |
| `def on_button_pressed_a():` | |
| `input.on_button_pressed(Button.A, on_button_pressed_a)` | |

:::


:::teacher-note

**Answer:** def flash_heart(): → B. makes the function flash_heart; flash_heart() → A. calls it: runs its blocks once; def on_button_pressed_a(): → C. makes a function from the blocks inside on button A pressed; input.on_button_pressed(Button.A, on_button_pressed_a) → D. hands that function to the micro:bit to call on each press

:::


:::typical

## Modify


**Three flashes.** Make **B** flash the heart **three** times. Use the function: do not copy the blocks.

**A second job.** Make a function **flashSad** that flashes a sad face. Call it when the micro:bit is shaken.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Three flashes:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0a56e13b96ba.png?v=469bcc75de6433c2)

**A second job:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/17d885afe7dd.png?v=138bafabdc8b9c51)

:::

:::


## Mix it up

Sol's team picker, from the last course.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b00ea82d283a.png?v=7d4385e9bed994c9)

:::keep-together

**Sol's team picker has five names, but picks from 0 to 3. Whose name never comes up?**

☐ Ava

☐ Eve

☐ Nobody's: they all come up

☐ Dev

:::


:::teacher-note

**Answer:** Eve

Eve is the fifth name, at place 4. pick random 0 to 3 never reaches place 4. Picking from 0 to length − 1 would.

:::


## Make

Make a **stick-figure dance**. Make two dance moves as functions (for example *wave* and *jump*), each with two or more pictures. Then choreograph: **A** and **B** each call a move, and a **shake** calls a routine of both.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a628edf904c4.png?v=af7515aef4cc0269)

:::


:::wider

## Change an alarm

This alarm beeps and flashes three times when A is pressed, using one function. Make the function's beep higher or lower, then make **B** sound a longer alarm (more calls).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**You make a function, but never call it. What happens when the program runs?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing from that function: its blocks only run when something calls it.

:::

