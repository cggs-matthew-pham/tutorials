---
title: "Two supplies, one ground"
subtitle: "Power and motors · Driving a motor · Lesson 3"
---

# Two supplies, one ground

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The motor has its own battery, the Uno has USB, every wire is checked, and the motor does nothing. Or the motor runs, and the Arduino keeps restarting. What's missing?


:::teacher-note

**In one sentence:** Students start a motor whose driver has its own battery but no shared ground (nothing happens), join the grounds, separate signal, power and ground in a worked example, run the motor from the Uno's 5V and watch it reset, and fix a robot with both faults.

**Students should be able to say:** I can explain why separate supplies need a shared ground. I can explain why a motor shouldn't run from the board's own 5V.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The Uno is on USB; the driver and motor are on a battery. Pin 9 goes to the driver's ENA, but the Uno's GND isn't joined to the driver. When pin 9 goes HIGH, the motor…**

☐ Runs normally: it has its own battery

☐ Runs at half speed

☐ Runs backwards

☐ Doesn't respond (or behaves erratically)

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It doesn't respond reliably. The driver measures pin 9 against its own ground, which has no fixed relation to the Uno's, so the signal means nothing to it.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: what each supply does


:::keep-together

### Signal, power, ground

1. $\text{Uno (USB)}$ — Runs the code and makes the signals: pins at 0 V or 5 V above the Uno's GND.
2. $\text{battery} \to \text{driver} \to \text{motor}$ — The big current. Never through the Uno.
3. $\text{GND} \leftrightarrow \text{battery −}$ — One shared 0 V, so the driver reads 5 V on pin 9 as HIGH.
4. $\text{5V} \not\leftrightarrow \text{battery +}$ — The + sides stay separate.

Now pick the wires that join the two halves.

**Which wires join the two halves of the circuit?**

☐ The signal wires (pin to driver) and one ground wire

☐ The Uno's 5V to the battery's +

☐ None: they must stay separate

☐ Only the signal wires

:::


:::teacher-note

**Answer:** The signal wires (pin to driver) and one ground wire

Signals plus a common ground; the + sides stay separate.

:::


:::keep-together

### Find the mistake

**Sam's motor never responds. Click the line where Sam's reasoning first goes wrong.**

```
 1  The Uno has its own power from USB.
 2  The motor has its own battery.
 3  They are separate, so they don't need to be joined.
 4  So Sam leaves the driver's GND unconnected to the Uno.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: separate supplies are fine, but the grounds must be joined so both sides agree on 0 V. Only the + sides stay apart.

:::


:::typical

## Vary: power from the Uno


**From 5V.** 

**Its own battery.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Grounds


:::keep-together

### Which wires?

**A robot's Uno runs on a 9 V battery and its motors on a 6 V pack. Which wires should be joined?**

☐ The two batteries' + terminals

☐ The two batteries' − terminals (the grounds)

☐ All four terminals

☐ Nothing

:::


:::teacher-note

**Answer:** The two batteries' − terminals (the grounds)

Join the grounds only.

:::


:::keep-together

### Resets

**A robot resets every time it starts to move. What is the most likely cause?**

☐ The code has a bug in setup()

☐ The grounds are joined

☐ The motors are wired backwards

☐ The motors draw from the board's supply and pull it down

:::


:::teacher-note

**Answer:** The motors draw from the board's supply and pull it down

Resets that happen when motors start are almost always a supply sagging.

:::


## Make: fix the robot


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Two supplies power a project. Which terminals do you join, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The negative terminals (the grounds), so both sides measure signals from the same 0 V. Never the positives.

:::

