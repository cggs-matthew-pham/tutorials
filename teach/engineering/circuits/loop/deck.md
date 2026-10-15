---
marp: true
theme: default
html: true
---

# A complete loop

Circuits with the micro:bit · Lighting an LED

<!-- Speaker note: Students break and remake a loop of pin 0, a resistor, an LED and GND on a board, see that current stops everywhere when the loop breaks anywhere, find that an LED only works one way round, then build the same circuit in Tinkercad. About 40 minutes (Predict and Try 8 min · Worked example 8 min · Vary 6 min · Tinkercad 10 min · Practise and Make 8 min). Sources: Tinkercad Circuits (Autodesk): simulator, link only, https://www.tinkercad.com/circuits (checked 12 October 2026); SparkFun Inventor's Kit for micro:bit, circuit 1 (benchmark; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-for-microbit-experiment-guide (checked 12 October 2026). -->

---

## Today

**We are learning to** current only flows around a complete loop: out of pin 0, through the resistor and the LED, and back to GND. Break the loop anywhere, or turn the LED round, and the current stops everywhere at once.

- I can explain why current needs a complete loop.
- I can wire an LED the right way round.
- I can find why an LED won't light.

<!-- Speaker note: Before class: Try the boards, and set up a Tinkercad class (Classes › New class; students join with the class code and a nickname, no email). Check Tinkercad loads on student devices. Simplifications: the board's model is a 3.3 V pin, an LED that drops 2 V, and wires with no resistance. The resistor's job is the next lesson; here it is just part of the loop. If you have kits, one LED, a 220 Ω resistor and two crocodile clips on a real micro:bit make the Try even better. Teacher: Try: ask why unclipping the pin wire and unclipping GND have the same effect. Teacher: Vary: the backwards LED is the slip students will make in Tinkercad. Point at the long leg. -->

---

## Why it matters

> You switch pin 0 on, but the LED stays dark. The code is right. What else has to be true for current to flow?

<!-- Speaker note: In micro:bit Foundations the LEDs were already on the board. Now you wire your own: an **LED** (a light that lets current through one way), a **resistor** (it protects the LED; next lesson says how) and two wires to the micro:bit's **pins**. Pin 0 can be switched on (3.3 V) by code. **GND** is the micro:bit's ground, 0 V. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Pin 0 is on and the LED is lit. You unclip the wire from the LED to GND. The LED…**

- Gets dimmer
- Stays lit: pin 0 still sends power to it
- Goes out
- Gets brighter

<!-- Speaker note: What happens: It goes out. With the GND wire off the loop is broken, so no current flows anywhere in it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask those who chose 'stays lit' to say where the current would go. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fcircuits%2Floop%2Fstep-2&code=widget%3A+circuit%0Amode%3A+led%0Aunclip%3A+on%0Apinbtn%3A+on%0Anumbers%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/circuits/loop/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It goes out. With the GND wire off the loop is broken, so no current flows anywhere in it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Trace it

Now apply it: where in the loop is the current smallest?

$$\text{pin 0 on: } 3.3\text{ V}$$

1) $\text{pin 0} \to \text{resistor} \to \text{LED}$ — Current flows out of pin 0 through the resistor and the LED.
2) $\text{LED} \to \text{GND } (0\text{ V})$ — It flows back into the micro:bit at GND.
3) $\text{one loop, one current}$ — The same current flows everywhere in the loop.
4) $\text{any break} \Rightarrow 0$ — Unclip any wire, or switch the pin to 0 V, and the current is 0 everywhere.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write pin 0 on: 3.3 V and say "Code switches pin 0 on. It is 3.3 V above GND." Line 1: write pin 0 resistor LED and say "Current flows out of pin 0 through the resistor and the LED." Line 2: write LED GND (0 V) and say "It flows back into the micro:bit at GND." Line 3: write one loop, one current and say "The same current flows everywhere in the loop." Line 4: write any break 0 and say "Unclip any wire, or switch the pin to 0 V, and the current is 0 everywhere." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace it

**The loop is complete and pin 0 is on. Where is the current smallest?**

- In the GND wire, because the LED used it up
- In the resistor
- In the pin 0 wire, before it reaches the LED
- Nowhere: it is the same all the way round the loop

* Answer: Nowhere: it is the same all the way round the loop

<!-- Speaker note: In a single loop the same current flows everywhere. Parts use energy (voltage), not current. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's LED never lights. Click the line where Sam's plan first goes wrong.**

```
 1  Sam wants to save a wire.
 2  Pin 0 sends power out to the LED.
 3  So one wire from pin 0 to the LED is enough.
 4  The GND wire is not needed.
```

* Answer: line 2

<!-- Speaker note: Line 2: pin 0 doesn't send power one way like a tap. Current flows round a loop, out of pin 0 and back into GND, so the GND wire is needed. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: the LED the wrong way round



- **Turn it round:** 
- **Check first:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/circuits/loop/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Turning the LED round is a break that looks like a complete loop: an LED is a one-way valve. It is the most common wiring slip. For students who need more support: Give a printed loop to trace with a finger: pin 0, resistor, LED, GND, back to the micro:bit. For early finishers: Add a second LED and resistor on pin 1. Is that one loop or two? What happens to the first LED if the second's GND wire comes off? The hard part, on purpose: Students picture the pin pushing power out like a tap. Keep asking 'where does the current go back in?' When students get stuck: A student thinks one wire is enough. Ask: Where does the current go back into the micro:bit? Fix: Into GND: it needs a loop. / The LED is dark in Tinkercad but every wire looks fine. Ask: Which leg goes to the resistor? Fix: The long leg (anode) towards pin 0; the bent leg in Tinkercad. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad

Your teacher will give you the class code. Long leg of the LED towards the resistor and pin 0.

<!-- Speaker note: What this step is for: Building the same loop in Tinkercad Circuits checks the idea against a fuller simulator, and gets students used to the tool before the Arduino lessons. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which lights?

**Which of these lights the LED?**

- Pin 0 on → resistor → LED (short leg first) → GND
- Pin 0 on → resistor → LED (long leg first) → GND
- Pin 0 on → resistor → LED (long leg first), with no wire to GND
- Pin 0 off → resistor → LED (long leg first) → GND

* Answer: Pin 0 on → resistor → LED (long leg first) → GND

<!-- Speaker note: Only the first is a complete loop, the right way round, with the pin on. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A torch

**A torch has a battery, a switch and a bulb. Turning the switch off…**

- Only stops current in the bulb
- Stops the battery making electricity
- Keeps the current in the battery until you need it
- Breaks the loop, so no current flows anywhere

* Answer: Breaks the loop, so no current flows anywhere

<!-- Speaker note: A switch is a deliberate break in the loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: fix the circuit



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/circuits/loop/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Fixing a circuit with three faults reverses the process: students diagnose a dark LED from the loop rule, the one-way LED and the pin. Hints, in order: There are three faults. Check each part of the loop in turn. / Is every wire clipped? Is the LED the right way round? Is the pin on? / Clip GND, turn the LED round and switch pin 0 on. -->

<!-- Speaker note: Teacher: ask students to list the faults in the order they checked them. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Pin 0 is on, every wire is clipped, and the LED is dark. Give two possible reasons.**

* The LED is the wrong way round, or a wire isn't really connected (the loop is broken). Also possible: the pin isn't actually on.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Why the resistor (how much current, and what limits it). Code links: micro:bit Foundations (pins and digital write); Engineering › Power and motors (why a pin can't run a motor). -->
