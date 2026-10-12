---
title: "Sensors are numbers"
subtitle: "micro:bit Foundations · Remember and sense · Lesson 4"
---

# Sensors are numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A phone dims its screen in the dark and turns the picture when you tilt it. Inside, a sensor is just handing the phone a number.


:::teacher-note

**In one sentence:** Students read the light, temperature and tilt sensors as numbers, and see that a sensor must be read again (in forever or an event) to follow the world.

**Students should be able to say:** I can show the number a sensor gives. I can say what the light, temperature and tilt numbers mean. I can choose when a sensor is read, with forever or a button.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**light level** is a sensor block. It is inside **forever**.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3999f89d7cc7.png?v=365f85d3d1627ab6)

:::keep-together

**What will the micro:bit show?**

☐ The same number over and over, even when the light changes

☐ The word light

☐ 0, and nothing else

☐ A number that changes when the light changes

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A number that changes with the light. forever reads the light level again each time round, so the number follows the slider.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This program keeps each reading in a variable called `reading`, then shows it. The world changes the light; forever reads it again and again.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/1cf85b412f0a.png?v=096a59de64ff0deb)

:::keep-together

### What do they measure?

**Match each sensor with what its number means.**

A. how far it tilts left (below 0) or right (above 0)

B. how warm it is, in degrees Celsius

C. how bright it is, from 0 (dark) to 255 (bright)

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `light level` | |
| `temperature` | |
| `acceleration x` | |

:::


:::teacher-note

**Answer:** light level → C. how bright it is, from 0 (dark) to 255 (bright); temperature → B. how warm it is, in degrees Celsius; acceleration x → A. how far it tilts left (below 0) or right (above 0)

:::


:::keep-together

### How bright?

**Drag the light slider all the way up. What is the biggest number the light level can be?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 255

Light level runs from 0 (dark) to 255 (as bright as it can measure).

:::


:::keep-together

### Sam's thermometer

Sam's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7eb0d60bd9c6.png?v=57cb97115d035648)

**Sam's program shows the temperature. He drags the temperature slider, but the number never changes. Why?**

☐ The block is in on start, so it reads the temperature once

☐ The temperature sensor is broken

☐ Temperature only works on a real micro:bit

☐ He needs a variable

:::


:::teacher-note

**Answer:** The block is in on start, so it reads the temperature once

on start runs once, so Sam's program reads the temperature at the very start and never again. In forever, it would read it again each time round.

:::


:::typical

## Modify


**Swap the sensor.** Show the temperature instead of the light level. Drag the temperature slider to test it.

**Read on request.** Read a sensor only when asked: **A** shows the light level, **B** shows the temperature.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Swap the sensor:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b3e1944bd9ae.png?v=998eaa7d99093bc6)

**Read on request:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/81fe1d60d9da.png?v=a42ac896a6cc034f)

:::

:::


## Make

Make a **thermometer**. Again and again, it shows the temperature, then the letter **C** (for Celsius), then waits two seconds.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a3df2eb37356.png?v=438200454dcae39a)

:::


:::wider

## Change a light meter

This light meter draws a bar instead of a number: the brighter it is, the more LEDs light up. **plot bar graph** needs the biggest value the sensor can give (255 for light). Change it into a **temperature** meter, where 40 is the biggest value.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does reading the temperature in on start not work for a thermometer?**

{{lines-3}}

:::


:::teacher-note

**Answer:** on start reads it once, at the start. A thermometer must read it again and again, in forever.

:::

