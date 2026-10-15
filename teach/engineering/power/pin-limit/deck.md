---
marp: true
theme: default
html: true
---

# Why a motor can't run from a pin

Power and motors · Driving a motor

<!-- Speaker note: Students try a motor straight on pin 9, compare the 700 mA it asks for with the 20 mA a pin gives, follow the two currents in a transistor circuit, see and fix the switch-off spike with a diode, and sort parts by whether a pin can drive them. About 40 minutes (Predict and Try 5 min · Worked example 8 min · Vary 6 min · Tinkercad 12 min · Practise and Make 9 min). Sources: Arduino: digital pins (current limits; link), https://docs.arduino.cc/learn/microcontrollers/digital-pins/ (checked 12 October 2026); SparkFun Inventor's Kit v4.1, motor circuits (benchmark; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v41 (checked 12 October 2026). -->

---

## Today

**We are learning to** a pin is a signal, not a power supply: it can give about 20 mA, and a motor needs hundreds. The pin switches a transistor, and the transistor switches the motor's own battery. A diode across the motor catches the spike when it switches off.

- I can explain why a pin can't run a motor.
- I can describe how a transistor lets a pin switch a motor.
- I can say what a flyback diode is for.

<!-- Speaker note: Before class: Model: Uno pin 20 mA recommended, 40 mA absolute maximum; motor 150 mA running, 700 mA starting (a small 6 V TT gear motor; check your kit's datasheet). In reality a pin asked for more sags and can be damaged; the board shows the current asked for. Safety: never wire a motor straight to a pin on real hardware. Unit 4 (this course) is Years 9–10. Teacher: Worked example: trace both loops in two colours. Teacher: Vary: the spike is invisible on real hardware until something dies; say so. -->

---

## Why it matters

> An LED on pin 9 lights perfectly. Swap it for a small motor, change nothing else, and nothing happens, except maybe a damaged Arduino. What's different?

<!-- Speaker note: Current is measured in milliamps (mA). An Uno pin can safely give **about 20 mA**, and **40 mA at most**. An LED needs about 10. A small 6 V gear motor draws **about 150 mA** turning, and **about 700 mA** as it starts. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A small motor is wired from pin 9 to GND. The sketch sets pin 9 HIGH. The motor…**

- Doesn't turn (or barely twitches), and the pin may be damaged
- Turns at full speed
- Turns slowly
- Turns, but the LED code needs changing first

<!-- Speaker note: What happens: It doesn't turn: it needs about 700 mA to start and the pin gives about 20. Asking a pin for far more than 40 mA can damage it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what is different about a motor and an LED, apart from what it does. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fpower%2Fpin-limit%2Fstep-2&code=widget%3A+motor%0Amode%3A+pin%0Awiring%3A+direct%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/power/pin-limit/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It doesn't turn: it needs about 700 mA to start and the pin gives about 20. Asking a pin for far more than 40 mA can damage it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two currents

Now: how far over is a pin when it tries to run the motor itself?

$$\text{pin 9} \to 1\text{ k}\Omega \to \text{transistor}$$

1) $\text{battery +} \to \text{motor} \to \text{transistor}$ — The motor's 150–700 mA comes from the battery.
2) $\text{transistor} \to \text{battery −}, \text{GND}$ — Both currents return to the same ground.
3) $\text{pin: } 4\text{ mA} \ll 20\text{ mA} \;\checkmark$ — The pin is safe; the motor has all it needs.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write pin 9 1 k transistor and say "The pin gives about 4 mA, only to switch the transistor on." Line 1: write battery + motor transistor and say "The motor's 150–700 mA comes from the battery." Line 2: write transistor battery −, GND and say "Both currents return to the same ground." Line 3: write pin: 4 mA 20 mA ✓ and say "The pin is safe; the motor has all it needs." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two currents

**The motor needs 700 mA to start. A pin can safely give 20 mA. How many times too much is that?**

* Answer: 35

<!-- Speaker note: 700 ÷ 20 = 35 times what a pin should give. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's motor won't turn on pin 9. Click the line where Sam's reasoning first goes wrong.**

```
 1  The LED worked on pin 9, so the motor will too.
 2  digitalWrite(9, HIGH) switches the motor on.
 3  The motor doesn't turn, so the code must be wrong.
 4  Sam rewrites the code three times.
```

* Answer: line 1

<!-- Speaker note: Line 1: an LED needs about 10 mA, a motor hundreds. The pin can't supply it, so no code will fix it: it needs a transistor or driver and its own supply. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: switch it off



- **Switch off:** 
- **Fit the diode:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/pin-limit/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Switching the motor off without a diode shows the second hazard (the coil's voltage spike); fitting the diode removes it. For students who need more support: A two-column card: signal (pin, mA) and power (battery, hundreds of mA). For early finishers: A MOSFET (such as the IRLZ44N) can switch several amps with almost no gate current. Why would that suit a bigger motor? The hard part, on purpose: Students reach for the code first. Make 'power before code' the rule of the unit. When students get stuck: A student rewrites the code. Ask: How much current does the motor need, and how much can the pin give? Fix: Use a transistor or driver. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Tinkercad has a DC motor, an NPN transistor, a diode and a battery pack, so students build the real circuit and see the motor's current on a multimeter. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which can a pin drive?

**Sort each part: straight from a pin, or through a transistor or driver?**

Groups: Straight from a pin (with a resistor if it needs one) · Through a transistor or driver

An LED with a 220 Ω resistor (about 15 mA) · A small DC gear motor (150 mA running) · A piezo buzzer (a few mA) · A 12 V LED strip (500 mA) · A servo's signal wire (its power from 5V)

* Answer: An LED with a 220 Ω resistor (about 15 mA) → Straight from a pin (with a resistor if it needs one); A small DC gear motor (150 mA running) → Through a transistor or driver; A piezo buzzer (a few mA) → Straight from a pin (with a resistor if it needs one); A 12 V LED strip (500 mA) → Through a transistor or driver; A servo's signal wire (its power from 5V) → Straight from a pin (with a resistor if it needs one)

<!-- Speaker note: Anything over about 20 mA needs its own supply, switched by the pin. A servo's signal wire carries almost no current; its power wire goes to a supply. What this step is for: Sorting parts by the current they need applies the 20 mA rule. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: wire it safely



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/pin-limit/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Choosing the wiring and protection from a dangerous starting point brings both hazards together. Hints, in order: Two problems: the pin's current, and the spike at switch-off. / Use a transistor and a battery, and fit the diode. / Then switch the motor on. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why can't you run a motor from an Arduino pin, and what do you use instead?**

* A pin gives about 20 mA and a motor needs hundreds. The pin switches a transistor or motor driver, which switches the motor's own battery.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Motor drivers (both directions and speed). -->
