---
title: "A radio bridge"
subtitle: "micro:bit and the computer · A radio bridge · Lesson 3"
---

# A radio bridge

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Smart-home sensors, farm soil probes and wildlife cameras send their readings by radio to one hub, and the hub passes them on to a computer. The hub is a bridge.


:::teacher-note

**In one sentence:** Students build a radio bridge, so a micro:bit across the room sends readings to the computer and receives commands from it.

**Students should be able to say:** I can pass radio messages on to the computer, and lines from the computer on by radio. I can explain why both micro:bits need the same radio group. I can explain why a micro:bit never hears its own radio messages.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/e89a860d08c5.png?v=6214aba62b5f0b76)

:::keep-together

**The micro:bit across the room is at 24 °C. What does the computer receive from the bridge?**

☐ The radio signal itself

☐ A line: temp:24

☐ Nothing: radio can't reach a computer

☐ A line: 24

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** temp:24. The far micro:bit sends the name and value by radio; the bridge's on radio received value passes them on with serial write value.

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


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/e89a860d08c5.png?v=6214aba62b5f0b76)

:::keep-together

### Two directions

**Match each block with the job it does in the bridge.**

A. radio to the computer

B. only micro:bits in the same group hear each other

C. the computer to radio

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `on radio received value → serial write value` | |
| `on serial data received → radio send string` | |
| `radio set group` | |

:::


:::teacher-note

**Answer:** on radio received value → serial write value → A. radio to the computer; on serial data received → radio send string → C. the computer to radio; radio set group → B. only micro:bits in the same group hear each other

:::


:::keep-together

### Ben's bridge

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/32dcc69d6fcf.png?v=604d1aa0be69aa4d)

**Ben's far micro:bit is in radio group 7 and his bridge is in group 8. What does the board show?**

☐ The values arrive slowly

☐ Nothing arrives

☐ The values arrive twice

☐ Only the first value arrives

:::


:::teacher-note

**Answer:** Nothing arrives

Radio messages reach only micro:bits in the same group. Ben's bridge never hears the readings.

:::


:::keep-together

### Its own messages

**Both micro:bits run the same program, so the bridge also sends its own temperature by radio. Why doesn't the bridge's own temperature appear on the board?**

☐ The board ignores the bridge

☐ Two values can't share a name

☐ The bridge has no temperature sensor

☐ A micro:bit never hears its own radio messages

:::


:::teacher-note

**Answer:** A micro:bit never hears its own radio messages

Radio goes to every other micro:bit in the group, never back to the sender. So only the far micro:bit's readings arrive. (If you use three micro:bits, give them different names.)

:::


:::typical

## Modify


**Light too.** Send the **light level** as well. Did you have to change the bridge?

**Beep.** Add the other direction: the bridge passes each line from the computer on by radio, and the far micro:bit **beeps** when it receives **beep**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Light too:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7597a43a78a2.png?v=c1b2364095230598)

**Beep:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/67dd0fbeb602.png?v=aa997b68be4fe6a7)

:::

:::


## Make

Make a **room monitor**: the far micro:bit reports **temperature** and **light** every second, shows an alarm (a cross) when the computer sends **alarm**, clears it on **clear**, and reports **alarm 1** or **alarm 0** so the computer knows it worked.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/51935e986934.png?v=e46be73472b9cf32)

:::


:::typical

## Test the monitor

Download your monitor to two micro:bits, connect the bridge here, and try **Alarm** and **Clear**.

:::


## Exit ticket

:::keep-together

**What does a bridge micro:bit do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It passes radio messages on to the computer over the cable, and lines from the computer on by radio.

:::

