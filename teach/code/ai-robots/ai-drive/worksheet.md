---
title: "Drive with gestures"
subtitle: "AI robots · Drive with a model · Lesson 1"
---

# Drive with gestures

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Some wheelchairs and drones can be steered by head movements or hand signs instead of a joystick. A camera and a trained model turn each movement into a command.


:::teacher-note

**In one sentence:** Students drive a robot with hand gestures recognised by their own Teachable Machine model; each label becomes a mode the robot acts on until the next label.

**Students should be able to say:** I can turn labels from a model into moves on a robot. I can explain why the robot keeps doing the last thing it was told. I can make the robot do something safe with a word it doesn't know.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aaa5ebb10d89.png?v=53a5e150986c005c)

:::keep-together

**The model sends Forward. Then your hand leaves the camera and the board sends nothing more. What does the robot do?**

☐ Drives forward for one second, then stops

☐ Stops

☐ Turns left

☐ Keeps driving forward

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It keeps driving forward. on radio received string only sets the mode; forever keeps acting on the last mode until a new label arrives.

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


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aaa5ebb10d89.png?v=53a5e150986c005c)

:::keep-together

### Who decides

**Where is it decided that Left means turn left slowly?**

☐ In the bridge micro:bit

☐ In the robot's program

☐ In the board

☐ In Teachable Machine

:::


:::teacher-note

**Answer:** In the robot's program

The model sends the word Left. The robot's if turns that word into wheel speeds.

:::


:::keep-together

### Mia's robot

**Mia named her class forward (small f). She shows the Forward sign. What does her robot do?**

☐ Turns left

☐ Drives forward

☐ Stops: forward matches no branch, so else runs

☐ Shows an error

:::


:::teacher-note

**Answer:** Stops: forward matches no branch, so else runs

Words must match exactly. Here the else is a safe default: a word the robot doesn't know makes it stop.

:::


:::keep-together

### Mode and forever

**Why does on radio received string only set the mode, while forever drives the motors?**

☐ Messages arrive at any time; forever keeps driving between them and checks the mode every time round

☐ Forever runs only when a message arrives

☐ Radio blocks can't use motors

☐ It makes the radio faster

:::


:::teacher-note

**Answer:** Messages arrive at any time; forever keeps driving between them and checks the mode every time round

As in Robotics challenges: the handler remembers the latest command, and forever acts on it continuously.

:::


:::typical

## Modify


**Back.** Add a fifth label, **Back**. (With a real model, add a fifth class too.)

**Show what it heard.** Make the robot's micro:bit show the **first letter** of each label it hears, so you can tell whether a wrong move came from the model or the code.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Back:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6bc10e884dae.png?v=7cc67494327e21b6)

**Show what it heard:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/47bc7190d510.png?v=5f56e429d3805f0b)

:::

:::


## Make

Make a **gesture robot** with four moves (**Forward**, **Left**, **Right**, **Spin**) that stops for any other word, with **green** lights while going forward and **red** when stopped. Add test-remote buttons so you can try it in the simulator.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/af69be5ef5db.png?v=066899f53e46c94d)

:::


## Exit ticket

:::keep-together

**The model sends Left, then nothing. What does the robot do, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It keeps turning left: the radio handler set the mode to Left, and forever keeps acting on the mode until a new label arrives.

:::

