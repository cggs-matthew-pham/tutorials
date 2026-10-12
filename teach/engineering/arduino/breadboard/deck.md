---
marp: true
theme: default
html: true
---

# From simulator to breadboard

Arduino · Real hardware

<!-- Speaker note: Students click breadboard holes to see the hidden strips, fix an LED whose legs share a strip, trace a loop strip by strip, straddle the gap and use the rails, build the circuit on a real breadboard and upload the blink, then place every part themselves. About 45 minutes (Predict and Try 7 min · Worked example 8 min · Vary 8 min · Real hardware 14 min · Practise and Make 8 min). Sources: SparkFun: How to use a breadboard (link; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard (checked 12 October 2026); Arduino Cloud Editor and IDE (link), https://www.arduino.cc/en/software (checked 12 October 2026). -->

---

## Today

**We are learning to** a breadboard joins the five holes in each numbered column (a–e, and separately f–j) with a metal strip; the rails along the edges join along their length. Each leg of a part must be in a different strip, and the loop goes from strip to strip through the parts.

- I can say which breadboard holes are joined.
- I can place parts so each leg is in a different strip.
- I can build a circuit on a real breadboard and upload a sketch.

<!-- Speaker note: Before class: The board treats the named pin as HIGH (the blink sketch's on moment) and shows a short circuit or missing resistor as a warning. Some breadboards split each rail in the middle: check yours and say so. Uploading: Arduino IDE (install, admin rights) or Arduino Cloud Editor (browser plus the Create Agent, an account). Choose before the lesson and test one board on the school network. Tinkercad remains the no-kit route. Kit per pair: Uno and USB cable, breadboard, a 220 Ω resistor, an LED, two jumper wires. Teacher: Find the mistake: ask a student to trace with a finger which holes are joined to c7. Teacher: Real hardware: nothing is plugged into USB until a partner has traced the loop. -->

---

## Why it matters

> Real parts don't snap together like Tinkercad's. A breadboard holds them with hidden metal strips underneath. Put a leg in the wrong hole and the circuit quietly doesn't work. Which holes are joined?

<!-- Speaker note: In a breadboard, **the five holes of each numbered column are joined** (a to e, and separately f to j: the gap down the middle splits them). The **rails** along the top and bottom are joined along the board's length: + for power, − for GND. Rows (a, b, c…) are **not** joined. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The LED's long leg is in c8 and its short leg in d8. The rest of the circuit is fine. The LED…**

- Burns out
- Lights dimly
- Lights: both legs are in holes
- Stays dark: both legs are in the same strip, so the current goes round it

<!-- Speaker note: What happens: It stays dark. c8 and d8 are in the same strip (column 8), so the strip joins its two legs and the current takes the easy path round the LED. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show a real breadboard turned over (or a photo) after the reveal: the metal strips. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fbreadboard%2Fstep-2&code=widget%3A+breadboard%0Apart+W1%3A+wire%2C+13%2C+a3%0Apart+R%3A+resistor%2C+b3%2C+b8%0Apart+LED%3A+led%2C+c8%2C+d8%0Apart+W2%3A+wire%2C+GND%2C+e9%0Alock%3A+W1%2C+W2%2C+R%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/arduino/breadboard/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It stays dark. c8 and d8 are in the same strip (column 8), so the strip joins its two legs and the current takes the easy path round the LED.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Strip by strip

Now: which holes are joined to a3?

$$\text{pin 13} \to \text{a3}$$

1) $\text{resistor: b3} \to \text{b7}$ — One leg in column 3, one in column 7: it joins the two strips.
2) $\text{LED: c7 (+)} \to \text{c8 (−)}$ — Long leg in column 7, short leg in column 8.
3) $\text{d8} \to \text{GND}$ — The GND wire takes column 8 back to the Uno.
4) $\text{one loop, four strips}$ — Every part bridges two strips; no part has both legs in one.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write pin 13 a3 and say "The wire puts pin 13 into column 3's strip (a3–e3)." Line 1: write resistor: b3 b7 and say "One leg in column 3, one in column 7: it joins the two strips." Line 2: write LED: c7 (+) c8 (−) and say "Long leg in column 7, short leg in column 8." Line 3: write d8 GND and say "The GND wire takes column 8 back to the Uno." Line 4: write one loop, four strips and say "Every part bridges two strips; no part has both legs in one." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Strip by strip

**Which holes are joined to a3?**

- a1 to a17
- None: each hole is separate
- Every hole in column 3, a to j
- b3, c3, d3 and e3

* Answer: b3, c3, d3 and e3

<!-- Speaker note: Column 3's top strip: a3 to e3. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam thinks this LED (long leg c7, short leg c8) is shorted out. It isn't. Click the line where Sam's reasoning first goes wrong.**

```
 1  The LED's long leg is in c7 and its short leg in c8.
 2  Row c joins c7 and c8.
 3  So the current goes from c7 to c8 through the row.
 4  So the LED is shorted out, and Sam moves it.
```

* Answer: line 2

<!-- Speaker note: Line 2: rows aren't joined. c7 is in column 7's strip and c8 in column 8's, so the LED's legs are in different strips: the loop goes through it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: the gap and the rails



- **Across the gap:** 
- **On the rails:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/arduino/breadboard/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Two more pieces of breadboard: a part can straddle the gap (its legs in two strips), and the rails carry power and GND along the board. For students who need more support: A printed breadboard map with the strips shaded. For early finishers: Put a second LED and resistor on pin 12, using the GND rail for both LEDs. The hard part, on purpose: Students build what looks like the diagram, not what is joined. Before they plug in, have them trace the loop strip by strip with a finger. When students get stuck: An LED won't light on the real board. Ask: Which strips are its legs in? Which way round is it? Fix: Different strips, long leg towards the resistor. / A student thinks rows are joined. Ask: Click a hole: which ones light up? Fix: Columns of five. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it for real

Before you plug in the USB cable: check that 5V and GND are never in the same strip.

<!-- Speaker note: What this step is for: Building the same circuit on a real breadboard and uploading the blink sketch is the step from simulator to hardware; the strips are the first thing to check when it doesn't work. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which holes?

**A resistor has one leg in a12 and the other in a16. Which holes are joined to the second leg?**

- a12 to a16
- Every hole in row a
- b16, c16, d16 and e16
- f16 to j16

* Answer: b16, c16, d16 and e16

<!-- Speaker note: Column 16's top strip. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A short

**A wire goes from 5V straight into the same strip as a wire from GND. What happens?**

- A short circuit: a huge current; unplug it at once
- Nothing: no parts are in the way
- The LED gets brighter
- The board turns off safely, no harm done

* Answer: A short circuit: a huge current; unplug it at once

<!-- Speaker note: 5V joined straight to GND has no resistance to limit the current. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: build it from scratch



[Open this step](https://tutorials.learningwaypoints.com/engineering/arduino/breadboard/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Placing every part from scattered positions puts the whole idea together: each part bridges two strips, and the loop runs from pin 13 back to GND. Hints, in order: Plan the strips first: pin 13's strip, a middle strip, a GND strip. / Resistor from pin 13's strip to a new strip; LED long leg in that strip, short leg in the GND wire's strip. / For example: resistor in i2 and i8, LED long leg in h8 and short leg in h4. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**An LED's legs are in b14 and e14. Will it light? Why?**

* No: both legs are in column 14's strip, so the current goes round it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: A small system (a brief, criteria, and tests on the boundary). -->
