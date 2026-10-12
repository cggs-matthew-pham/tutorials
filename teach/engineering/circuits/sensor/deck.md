---
marp: true
theme: default
html: true
---

# Sensors that vary

Circuits with the micro:bit · Reading inputs

<!-- Speaker note: Students turn a knob on pin 0 and see analog read give 0 to 1023, convert between position, reading and volts, swap in a light sensor in a divider, and set a threshold for a night light. About 45 minutes (Predict and Try 6 min · Worked example 12 min · Vary 10 min · Tinkercad 8 min · Practise and Make 9 min). Sources: Tinkercad Circuits (Autodesk): simulator, link only, https://www.tinkercad.com/circuits (checked 12 October 2026); SparkFun Inventor's Kit for micro:bit (benchmark; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-for-microbit-experiment-guide (checked 12 October 2026). -->

---

## Today

**We are learning to** analog read turns the voltage on a pin, 0 to 3.3 V, into a number from 0 to 1023. A knob or a light sensor in a divider changes that voltage, so the number changes. A program compares the number with a threshold to decide, as a night light does.

- I can explain what analog read gives.
- I can convert between a reading and volts.
- I can choose a threshold so a program decides at the right moment.

<!-- Speaker note: Before class: Model: analog read is 0–1023 for 0–3.3 V (the micro:bit's 10-bit reading); the knob and the light sensor give a voltage in proportion to the position or the light. Real light sensors (photoresistors) are far from linear, which Tinkercad will show. Links: Digital systems › binary (10 bits make 1024 patterns, 0 to 1023). Teacher: Worked example: draw the three scales one above the other. Teacher: Vary, swap them: draw both dividers and ask which end the sensor is on. -->

---

## Why it matters

> A button is on or off. But a room isn't just light or dark, and a volume knob isn't just loud or silent. How does a micro:bit measure something in between?

<!-- Speaker note: A **digital** input is 0 or 1. An **analog** input can be anything in between. **Analog read pin P0** gives a number from **0 to 1023**. A **knob** (a potentiometer) is a resistor with a slider: turning it moves the slider between 3V and GND, so the voltage on pin 0 changes. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The knob is turned halfway. Analog read pin P0 gives about…**

- 1
- 1.65
- 50
- 512

<!-- Speaker note: What happens: About 512: halfway between 0 and 1023. The pin has about 1.65 V on it, but the reading is a number on a 0 to 1023 scale. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask those who chose 1.65 what unit analog read gives. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fcircuits%2Fsensor%2Fstep-2&code=widget%3A+circuit%0Amode%3A+sensor%0Asensor%3A+pot%0Alevel%3A+0%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/circuits/sensor/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* About 512: halfway between 0 and 1023. The pin has about 1.65 V on it, but the reading is a number on a 0 to 1023 scale.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Halfway, in numbers

Now a quarter of the way up.

$$\text{position} = 50\% = 0.5$$

1) $\text{reading} = 0.5 \times 1023 \approx 512$ — Analog read scales 0 to 3.3 V onto 0 to 1023.
2) $\text{volts} = \frac{512}{1023} \times 3.3 \approx 1.65\text{ V}$ — Back to volts: the fraction of the scale, times 3.3.
3) $1023 \to 3.3\text{ V}, \; 0 \to 0\text{ V}$ — The ends of the scale.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write position = 50\% = 0.5 and say "The knob is halfway." Line 1: write reading = 0.5 × 1023 512 and say "Analog read scales 0 to 3.3 V onto 0 to 1023." Line 2: write volts = 512 ÷ 1023 × 3.3 1.65 V and say "Back to volts: the fraction of the scale, times 3.3." Line 3: write 1023 3.3 V, 0 0 V and say "The ends of the scale." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Halfway, in numbers

**The knob is a quarter of the way up. What does analog read give? (round to a whole number)**

* Answer: 256

<!-- Speaker note: 0.25 × 1023 = 255.75 ≈ 256. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Number to volts

**Pin 0 reads 818. About how many volts is that? (2 decimal places)**

* Answer: 2.64

<!-- Speaker note: 818 ÷ 1023 = 0.8, and 0.8 × 3.3 = 2.64 V. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam is worried about the knob. Click the line where Sam's reasoning first goes wrong.**

```
 1  The knob is turned all the way up.
 2  Analog read pin P0 gives 1023.
 3  So there are 1023 volts on pin 0.
 4  That is why the knob needs to be connected carefully.
```

* Answer: line 3

<!-- Speaker note: Line 3: 1023 is the top of analog read's scale, not volts. It stands for 3.3 V, the most a micro:bit pin can have. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a light sensor



- **Dark:** 
- **The 300 mark:** 
- **Swap them:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/circuits/sensor/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Swapping the knob for a light sensor in a divider shows the same move with a real-world input: light changes the voltage, so the number. For students who need more support: A printed number line with 0, 512 and 1023 above 0 V, 1.65 V and 3.3 V. For early finishers: Why 1023? How many bits does the micro:bit use for an analog reading? The hard part, on purpose: Three scales at once (percent, reading, volts) blur together. Keep a number line on the board with all three marked. When students get stuck: A student reports volts as the reading. Ask: What is the biggest number analog read can give? Fix: 1023, for 3.3 V. / A student's threshold works backwards. Ask: Does darker make the reading bigger or smaller, in this circuit? Fix: Smaller here: lights on below the threshold. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad

Tinkercad's photoresistor is not linear like the board's model: expect the numbers to bunch up at one end.

<!-- Speaker note: What this step is for: Tinkercad's photoresistor and potentiometer, read with analog read and shown on the micro:bit, check the idea in a fuller simulator. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Volts to a reading

**3.3 V on pin 0 reads 1023. What does 0.66 V read? (whole number)**

* Answer: 205

<!-- Speaker note: 0.66 ÷ 3.3 = 0.2, and 0.2 × 1023 ≈ 205. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A threshold

**A plant alarm beeps when a soil sensor reads below 400. Which reading beeps?**

- 350
- 400
- 650
- 1023

* Answer: 350

<!-- Speaker note: Only 350 is below the threshold. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a night light

Then build it in Tinkercad with an LED on another pin, or on a real micro:bit.

[Open this step](https://tutorials.learningwaypoints.com/engineering/circuits/sensor/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Setting a threshold so the lights switch on at the right darkness reverses the process: from a behaviour to a number. Hints, in order: Work out the reading at 20% light and at 40% light. / 20% reads about 205 and 40% about 409. / Set the threshold between them (such as 300), then turn the light down to check the lights come on. -->

<!-- Speaker note: Teacher: compare thresholds. Who picked one close to 205, and what could go wrong? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Pin 0 reads 256. Roughly how many volts are on it, and what fraction of the way up is the knob?**

* About a quarter of the way up, so about 0.83 V (256 ÷ 1023 × 3.3).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the Arduino unit (the same circuits on an Uno: analogRead gives 0 to 1023 there too). Digital systems: How many patterns? (10 bits). Code: micro:bit Foundations sensors (light level 0–255 is a different scale). -->
