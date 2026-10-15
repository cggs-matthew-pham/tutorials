---
marp: true
theme: default
html: true
---

# Why the resistor

Circuits with the micro:bit · Lighting an LED

<!-- Speaker note: Students take the resistor out of an LED circuit, compare resistor sizes, use Ohm's law with the LED's 2 V taken off to find the current and the smallest safe resistor, test that the resistor works on either side of the LED, and choose one for a target current. About 45 minutes (Predict and Try 8 min · Worked example 12 min · Vary 5 min · Tinkercad 10 min · Practise and Make 10 min). Sources: Tinkercad Circuits (Autodesk): simulator, link only, https://www.tinkercad.com/circuits (checked 12 October 2026); SparkFun Inventor's Kit Experiment Guide v4.1 (benchmark; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v41 (checked 12 October 2026). -->

---

## Today

**We are learning to** with no resistor, far too much current flows and the LED is damaged. A resistor limits the current: current = voltage ÷ resistance (Ohm's law). Bigger resistor, less current. In a single loop it works on either side of the LED.

- I can explain what a resistor does in an LED circuit.
- I can use Ohm's law to work out the current.
- I can choose a resistor for a safe current.

<!-- Speaker note: Before class: Model: pin 3.3 V, LED forward voltage 2 V, LED limit 20 mA; with no resistor the board shows about 100 mA (a stand-in for "limited only by the pin and wires"). Real LEDs vary (red about 2 V, blue and white about 3 V), and a micro:bit pin should really be kept to a few milliamps, so kits use 220 Ω or more. Say that the numbers are a model. Ohm's law may be new: this lesson applies it, Year 9 Science (electric circuits) teaches it fully. Teacher: Worked example: write each line live. Pause on 3.3 − 2 and ask why. Teacher: Find the mistake: ask a student to trace the loop with a finger and say where the current is bigger. Teacher: Tinkercad: expect close, not identical, numbers; ask why a model might differ. -->

---

## Why it matters

> Every LED circuit in every kit has a small striped part next to the LED. Leave it out and the LED works brilliantly, for about a second. What is it doing?

<!-- Speaker note: **Current** is measured in milliamps (mA). An LED is damaged above about **20 mA**. **Resistance** is measured in ohms (Ω): the more ohms, the harder it is for current to flow. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You take the resistor out and join the LED straight to pin 0. What happens?**

- The LED is brighter, and that's fine
- Far too much current flows, and the LED is damaged
- Nothing changes: the resistor does nothing
- The LED goes out: the loop is broken

<!-- Speaker note: What happens: Far too much current: about 100 mA, five times the LED's limit. The resistor is what keeps the current safe. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what limits the current when there is no resistor. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fcircuits%2Fresistor%2Fstep-2&code=widget%3A+circuit%0Amode%3A+led%0Achoose%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/circuits/resistor/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Far too much current: about 100 mA, five times the LED's limit. The resistor is what keeps the current safe.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Ohm's law with an LED

Now do the same for 470 Ω.

$$3.3 - 2 = 1.3\text{ V}$$

1) $I = \frac{V}{R} = \frac{1.3}{220}$ — Ohm's law: current = voltage ÷ resistance.
2) $I = 0.0059\text{ A}$ — In amps.
3) $0.0059 \times 1000 = 5.9\text{ mA}$ — Times 1000 for milliamps.
4) $5.9 < 20 \;\checkmark$ — Under the LED's 20 mA: safe.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 3.3 - 2 = 1.3 V and say "Pin 0 gives 3.3 V. The LED uses about 2 V, so 1.3 V is left across the resistor." Line 1: write I = V ÷ R = 1.3 ÷ 220 and say "Ohm's law: current = voltage ÷ resistance." Line 2: write I = 0.0059 A and say "In amps." Line 3: write 0.0059 × 1000 = 5.9 mA and say "Times 1000 for milliamps." Line 4: write 5.9 < 20 ✓ and say "Under the LED's 20 mA: safe." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ohm's law with an LED

**Now 470 Ω. How many milliamps? (1 decimal place)**

* Answer: 2.8

<!-- Speaker note: 1.3 ÷ 470 = 0.00277 A ≈ 2.8 mA. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Work backwards

**Work backwards: what resistance gives exactly 20 mA (0.02 A)? (ohms)**

* Answer: 65

<!-- Speaker note: R = 1.3 ÷ 0.02 = 65 Ω. Anything bigger is safe; kits use 220 Ω to leave a margin. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam is sure a resistor after the LED won't protect it. Click the line where Sam's reasoning first goes wrong.**

```
 1  The current comes out of pin 0.
 2  It reaches the LED first, so the LED gets the full current.
 3  So the resistor has to go before the LED to protect it.
 4  After the LED it would be too late.
```

* Answer: line 2

<!-- Speaker note: Line 2: in a single loop the current is the same everywhere. It doesn't arrive at the LED first and then slow down: the resistor limits the current in the whole loop, wherever it sits. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **Move it:** 
- **Very big:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/circuits/resistor/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Moving the resistor tests Sam's idea on the board; a very large resistor shows the other limit: too little current, and the LED barely glows. For students who need more support: A card with the three steps: 3.3 − 2 = 1.3; 1.3 ÷ R; × 1000. For early finishers: A blue LED drops about 3 V. With 220 Ω on a 3.3 V pin, how much current? Why might a blue LED look dim on a micro:bit? The hard part, on purpose: Two steps trip students: taking the LED's 2 V off before dividing, and turning amps into milliamps. Model both slowly, out loud. When students get stuck: A student divides 3.3 by the resistance. Ask: How much of the 3.3 V does the LED use? Fix: Use the 1.3 V left for the resistor. / A student's answer is 0.0059 for milliamps. Ask: Is that in amps or milliamps? Fix: Times 1000. / A student moves the resistor and expects a change. Ask: Is it still one loop? Fix: One loop, one current. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad

Tinkercad's LED and pin are not exactly the board's model, so expect close, not identical, numbers.

<!-- Speaker note: What this step is for: In Tinkercad the same circuit gives a warning without the resistor, and a multimeter shows the current, so students check the model against a fuller simulator. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## 1 kΩ

**1 kΩ (1000 Ω): how many milliamps? (1 decimal place)**

* Answer: 1.3

<!-- Speaker note: 1.3 ÷ 1000 = 0.0013 A = 1.3 mA. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Choose for 10 mA

**You want 10 mA (0.01 A). What resistance? (ohms)**

* Answer: 130

<!-- Speaker note: 1.3 ÷ 0.01 = 130 Ω. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: dark LED

**Review: the LED is dark with a 220 Ω resistor in the loop. Which is NOT a likely cause?**

- Pin 0 is off
- The LED is the wrong way round
- The resistor is too big
- The GND wire is off

* Answer: The resistor is too big

<!-- Speaker note: 220 Ω still gives about 6 mA: plenty to see. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: choose and place



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/circuits/resistor/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Choosing a resistor for a target current and placing it after the LED applies both ideas from the lesson at once. Hints, in order: Work out the resistance for 2 mA and for 10 mA: the answer is between them. / 1.3 ÷ 0.01 = 130 Ω and 1.3 ÷ 0.002 = 650 Ω. / 220 Ω or 470 Ω, then Move the resistor. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**With a 330 Ω resistor and a 2 V LED on a 3.3 V pin, how much current flows? Is it safe?**

* 1.3 ÷ 330 ≈ 0.0039 A ≈ 3.9 mA: safe, under 20 mA.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: A button is an input. Science: Year 9 electric circuits (voltage, current, resistance). Engineering › Power and motors: why a pin can't drive a motor. -->
