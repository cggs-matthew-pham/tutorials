---
marp: true
theme: default
html: true
---

# Two supplies, one ground

Power and motors · Driving a motor

<!-- Speaker note: Students start a motor whose driver has its own battery but no shared ground (nothing happens), join the grounds, separate signal, power and ground in a worked example, run the motor from the Uno's 5V and watch it reset, and fix a robot with both faults. About 35 minutes (Predict and Try 5 min · Worked example 8 min · Vary 5 min · Tinkercad 8 min · Practise and Make 9 min). Sources: Texas Instruments L293D datasheet (link), https://www.ti.com/product/L293D (checked 12 October 2026). -->

---

## Today

**We are learning to** the motor gets its own battery, but the grounds must be joined: a signal is a voltage compared with ground, so the driver can't read the Uno's pins without a shared 0 V. Powering the motor from the Uno's own 5V pulls it down when the motor starts, and the Uno resets.

- I can explain why separate supplies need a shared ground.
- I can explain why a motor shouldn't run from the board's own 5V.

<!-- Speaker note: Before class: Model: without a common ground the driver doesn't respond (in reality the behaviour is unpredictable); a motor on the Uno's 5V resets the Uno when it starts (a brown-out). Some driver boards join the grounds for you on the board; still teach the wire. Teacher: Vary: the reset is the classic symptom students will meet on their own robots. -->

---

## Why it matters

> The motor has its own battery, the Uno has USB, every wire is checked, and the motor does nothing. Or the motor runs, and the Arduino keeps restarting. What's missing?

<!-- Speaker note: A voltage is always **between two points**. "Pin 9 is at 5 V" means 5 V *above the Uno's GND*. A driver on another supply measures against **its** ground, so unless the two grounds are joined, it can't read the Uno's signal at all. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The Uno is on USB; the driver and motor are on a battery. Pin 9 goes to the driver's ENA, but the Uno's GND isn't joined to the driver. When pin 9 goes HIGH, the motor…**

- Runs normally: it has its own battery
- Runs at half speed
- Runs backwards
- Doesn't respond (or behaves erratically)

<!-- Speaker note: What happens: It doesn't respond reliably. The driver measures pin 9 against its own ground, which has no fixed relation to the Uno's, so the signal means nothing to it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask '5 V compared with what?' -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fpower%2Fground%2Fstep-2&code=widget%3A+motor%0Amode%3A+ground%0Aground%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/power/ground/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It doesn't respond reliably. The driver measures pin 9 against its own ground, which has no fixed relation to the Uno's, so the signal means nothing to it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Signal, power, ground

Now pick the wires that join the two halves.

$$\text{Uno (USB)}$$

1) $\text{battery} \to \text{driver} \to \text{motor}$ — The big current. Never through the Uno.
2) $\text{GND} \leftrightarrow \text{battery −}$ — One shared 0 V, so the driver reads 5 V on pin 9 as HIGH.
3) $\text{5V} \not\leftrightarrow \text{battery +}$ — The + sides stay separate.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Uno (USB) and say "Runs the code and makes the signals: pins at 0 V or 5 V above the Uno's GND." Line 1: write battery driver motor and say "The big current. Never through the Uno." Line 2: write GND battery − and say "One shared 0 V, so the driver reads 5 V on pin 9 as HIGH." Line 3: write 5V battery + and say "The + sides stay separate." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Signal, power, ground

**Which wires join the two halves of the circuit?**

- The signal wires (pin to driver) and one ground wire
- The Uno's 5V to the battery's +
- None: they must stay separate
- Only the signal wires

* Answer: The signal wires (pin to driver) and one ground wire

<!-- Speaker note: Signals plus a common ground; the + sides stay separate. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's motor never responds. Click the line where Sam's reasoning first goes wrong.**

```
 1  The Uno has its own power from USB.
 2  The motor has its own battery.
 3  They are separate, so they don't need to be joined.
 4  So Sam leaves the driver's GND unconnected to the Uno.
```

* Answer: line 3

<!-- Speaker note: Line 3: separate supplies are fine, but the grounds must be joined so both sides agree on 0 V. Only the + sides stay apart. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: power from the Uno



- **From 5V:** 
- **Its own battery:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/ground/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Running the motor from the Uno's own 5V shows the other half of the rule: big currents pull the board's supply down and reset it. For students who need more support: A picture with signal wires in one colour, power in another, ground in black. For early finishers: Some drivers take a separate logic supply (VCC1) and motor supply (VCC2). Which goes to which, on an L293D? The hard part, on purpose: 'Separate supplies' sounds like 'separate circuits'. Draw the two halves and the one ground wire between them. When students get stuck: The motor never responds. Ask: Is the Uno's GND joined to the battery's −? Fix: Join the grounds. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: In Tinkercad, removing the ground wire between the Uno and the driver's battery shows the same failure in a fuller simulator. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which wires?

**A robot's Uno runs on a 9 V battery and its motors on a 6 V pack. Which wires should be joined?**

- The two batteries' + terminals
- The two batteries' − terminals (the grounds)
- All four terminals
- Nothing

* Answer: The two batteries' − terminals (the grounds)

<!-- Speaker note: Join the grounds only. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Resets

**A robot resets every time it starts to move. What is the most likely cause?**

- The code has a bug in setup()
- The grounds are joined
- The motors are wired backwards
- The motors draw from the board's supply and pull it down

* Answer: The motors draw from the board's supply and pull it down

<!-- Speaker note: Resets that happen when motors start are almost always a supply sagging. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: fix the robot



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/ground/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Fixing both supply faults from one broken starting point brings the lesson together. Hints, in order: Two faults: where the motor's power comes from, and the ground. / Battery power for the motor, and join the grounds. / Then start it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Two supplies power a project. Which terminals do you join, and why?**

* The negative terminals (the grounds), so both sides measure signals from the same 0 V. Never the positives.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Choosing a battery. -->
