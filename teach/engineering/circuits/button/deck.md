---
marp: true
theme: default
html: true
---

# A button is an input

Circuits with the micro:bit · Reading inputs

<!-- Speaker note: Students hold and release a button wired from 3V to pin 0, see digital read give 1 and 0, trace what pin 0 is joined to in each state, remove the pull-down resistor to see the pin float, and put the reading-and-reacting program in order. About 40 minutes (Predict and Try 6 min · Worked example 10 min · Vary 8 min · Tinkercad 8 min · Practise and Make 8 min). Sources: Tinkercad Circuits (Autodesk): simulator, link only, https://www.tinkercad.com/circuits (checked 12 October 2026); SparkFun Inventor's Kit for micro:bit (benchmark; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-for-microbit-experiment-guide (checked 12 October 2026). -->

---

## Today

**We are learning to** a pin set as an input reads the voltage on it: joined to 3V it reads 1, joined to GND it reads 0. A button joins pin 0 to 3V only while it is held, so a pull-down resistor holds the pin at 0 when it is up. Without one the pin floats and reads 0 or 1 at random.

- I can explain what digital read gives for 3.3 V and 0 V.
- I can explain why a button needs a pull-down (or pull-up) resistor.
- I can put a program in order that reacts to a button.

<!-- Speaker note: Before class: Model: digital read gives 1 for 3.3 V and 0 for 0 V; a floating pin is shown reading at random every half second. Real floating pins are less tidy (they drift with nearby wires and fingers). A real micro:bit may already turn on a weak internal pull-down when it reads a pin (MakeCode's set pull pin block changes it), so Sam's doorbell may behave on a micro:bit; the external resistor makes the reading definite, and most other boards (Arduino in the next unit) need one. The micro:bit's own buttons A and B are already wired with resistors. If you have kits: a breadboard, a pushbutton, a 10 kΩ resistor and three jumper wires to an edge connector breakout. Teacher: Worked example: ask what pin 0 is joined to, in each state, before revealing the lines. Teacher: Vary: watch the faces when the heart flickers by itself. -->

---

## Why it matters

> The micro:bit has buttons A and B built in. Wire your own button to a pin, and it can be a doorbell, a game controller or a sensor on a door. How does a pin know it has been pressed?

<!-- Speaker note: Until now pin 0 was an **output**: code set it to 0 V or 3.3 V. A pin can also be an **input**: it reads the voltage on it. **Digital read** gives **1** for 3.3 V and **0** for 0 V. The micro:bit here runs: *forever, if digital read pin P0 = 1, show a heart, else clear the screen.* -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The button joins 3V to pin 0 while you hold it. While you hold it, digital read pin P0 gives…**

- 0
- 1
- 3.3
- 1023

<!-- Speaker note: What happens: 1. Holding the button joins pin 0 to 3.3 V, and digital read reports that as 1. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 3.3 are mixing up the voltage and the reading. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fcircuits%2Fbutton%2Fstep-2&code=widget%3A+circuit%0Amode%3A+button%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/circuits/button/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 1. Holding the button joins pin 0 to 3.3 V, and digital read reports that as 1.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## What is pin 0 joined to?

Now: while the button is held, pin 0 is joined to both. Why does 3V win?

$$\text{held: } 3\text{V} \to \text{button} \to \text{pin 0}$$

1) $\text{held: reads } 1$ — 3.3 V reads as 1.
2) $\text{up: pin 0} \to 10\text{ k}\Omega \to \text{GND}$ — The button is open; the pull-down joins pin 0 to GND.
3) $\text{up: reads } 0$ — 0 V reads as 0.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write held: 3V button pin 0 and say "The button joins pin 0 straight to 3.3 V." Line 1: write held: reads 1 and say "3.3 V reads as 1." Line 2: write up: pin 0 10 k GND and say "The button is open; the pull-down joins pin 0 to GND." Line 3: write up: reads 0 and say "0 V reads as 0." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What is pin 0 joined to?

**While the button is held, pin 0 is joined to 3V through the button and to GND through the 10 kΩ pull-down. Why does it read 1?**

- Pin 0 adds the two voltages
- The button joins it straight to 3V; the 10 kΩ only lets a tiny current leak to GND
- It doesn't: it reads 0
- The pull-down switches off when the button is pressed

* Answer: The button joins it straight to 3V; the 10 kΩ only lets a tiny current leak to GND

<!-- Speaker note: The button is a direct join to 3.3 V. The big resistor to GND only lets about 0.3 mA through, so pin 0 stays at 3.3 V. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's doorbell sometimes rings when nobody has pressed it. Click the line where Sam's reasoning first goes wrong.**

```
 1  When the button is up, pin 0 is joined to nothing.
 2  Joined to nothing means 0 volts.
 3  So pin 0 reads 0.
 4  So the pull-down resistor is not needed.
```

* Answer: line 2

<!-- Speaker note: Line 2: a pin joined to nothing isn't at 0 V. It floats, picking up electrical noise from nearby wires and your hand, and reads 0 or 1 at random. That is the doorbell ringing by itself. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: no pull-down



- **Float:** 
- **Pull it down:** 
- **A press counter:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/circuits/button/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Taking the pull-down away shows Sam's mistake on the board: a floating pin reads at random. Putting it back shows what the resistor is for. For students who need more support: Two pictures side by side, held and up, with a highlighter for what pin 0 is joined to. For early finishers: How could code ignore a reading that only lasts a moment, so a noisy pin doesn't count as a press? The hard part, on purpose: 'Joined to nothing means 0' feels obvious. Let the floating pin surprise them on the board, then ask what the resistor gives the pin. When students get stuck: A student thinks pin 0 reads 3.3. Ask: Digital read gives one of two numbers. Which? Fix: 1 for 3.3 V, 0 for 0 V. / A student thinks the pull-down stops the button working. Ask: Which is a stronger join to pin 0: the button or a 10 kΩ resistor? Fix: The button: it is a direct join. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Building the button circuit in Tinkercad with the same program checks the idea in a fuller simulator. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Pin to GND

**Pin 1 is joined straight to GND. Digital read pin P1 gives…**

- 1023
- 0
- 1
- It changes at random

* Answer: 0

<!-- Speaker note: Joined to 0 V, it reads 0. -->

<!-- Speaker note: Teacher: draw both side by side. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A pull-up

**Another way to wire it: the button joins pin 0 to GND, and a 10 kΩ pull-up joins pin 0 to 3V. What does pin 0 read while the button is held?**

- 0
- It floats
- 0.5
- 1

* Answer: 0

<!-- Speaker note: Held: joined to GND, reads 0. Up: the pull-up holds it at 1. The mirror image of a pull-down, and how many boards wire their buttons (Arduino's INPUT_PULLUP). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the doorbell program

Then build it in Tinkercad, or on a real micro:bit with a button and a resistor on a breadboard.

<!-- Speaker note: What this step is for: Putting the program in order connects the reading to an action: read the pin, decide, show. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a button wired from 3V to a pin need a resistor from the pin to GND?**

* So the pin is held at 0 V (reads 0) when the button is up. Without it the pin floats and reads 0 or 1 at random.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Sensors that vary (analog read gives a number, not just 0 or 1). Arduino unit: the same idea as pinMode(pin, INPUT_PULLUP). -->
