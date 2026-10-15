---
marp: true
theme: default
html: true
---

# A small system

Arduino · Real hardware

<!-- Speaker note: Students run a plant-water alarm against a test table that passes but misses the threshold, learn to choose test cases (either side of the threshold, the threshold itself, the ends), fix an off-by-one, add a steady state, build it on real hardware, and meet a three-band fridge alarm brief against six tests. About 50 minutes (Predict and Try 6 min · Worked example 10 min · Vary 10 min · Real hardware 12 min · Practise and Make 12 min). Sources: SparkFun soil moisture sensor hookup guide (link), https://learn.sparkfun.com/tutorials/soil-moisture-sensor-hookup-guide (checked 12 October 2026). -->

---

## Today

**We are learning to** a system reads a sensor, decides, and drives an output, and a brief says what it must do. Test it against a table of cases: each side of every threshold, the threshold itself, and the extremes. Tests that pass far from the threshold can hide a mistake right at it.

- I can choose test cases for a brief, including the boundary.
- I can fix a sketch until every test passes.
- I can explain what passing tests does and doesn't show.

<!-- Speaker note: Before class: The board's Run the tests runs the sketch once per case with no waiting (3 s of board time each) and records what the first LED did: off (never on), on (came on once and stayed on) or blink (came on two or more times). This lesson is the Years 9–10 test-case idea (AC9TDI10P06, validate against test cases) met in Years 8–9 hardware; Code's console bridge has the same table-of-inputs idea in Python. Teacher: Try: ask whether 5 out of 5 means the alarm meets the brief. Teacher: Worked example: write the table live from the brief. Teacher: Vary, three states: ask which case to test first in the if, and why. -->

---

## Why it matters

> Your plant-water alarm works on your desk: it blinks when you twist the knob down. Does it meet the brief? How would you know, without watching it for a week?

<!-- Speaker note: **The brief:** a plant-water alarm. A soil moisture sensor on A0 reads low when the soil is dry (the knob stands in for it). The LED on pin 13 must **blink when the reading is 300 or below**, and be **off** otherwise. A **test case** sets the sensor to one reading and says what the LED should do. **Run the tests** runs the sketch once for each case and ticks or crosses it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The sketch says if (level &lt; 300). The brief says 300 or below. Which test reading would show the mistake?**

- 0
- 150
- 300
- 800

<!-- Speaker note: What happens: 300: the brief wants it to blink, but 300 &lt; 300 is false, so it stays off. Any reading away from 300 behaves the same either way. Take two or three predictions before anyone runs it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fsmall-system%2Fstep-2&code=widget%3A+arduino%0Aled%3A+13%0Aknob%3A+A0%0Alevel%3A+50%0Aedit%3A+off%0Atest%3A+0%2C+blink%0Atest%3A+150%2C+blink%0Atest%3A+299%2C+blink%0Atest%3A+301%2C+off%0Atest%3A+800%2C+off%0Acode%3A+int+level+%3D+0%3B%0Acode%3A%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+pinMode%2813%2C+OUTPUT%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+level+%3D+analogRead%28A0%29%3B%0Acode%3A+if+%28level+%3C+300%29+%7B%0Acode%3A+digitalWrite%2813%2C+HIGH%29%3B%0Acode%3A+delay%28250%29%3B%0Acode%3A+digitalWrite%2813%2C+LOW%29%3B%0Acode%3A+delay%28250%29%3B%0Acode%3A+%7D+else+%7B%0Acode%3A+digitalWrite%2813%2C+LOW%29%3B%0Acode%3A+delay%28100%29%3B%0Acode%3A+%7D%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/arduino/small-system/?full=step-2#step-2)

<!-- Speaker note: Passing every test only means the sketch does what the tests ask. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 300: the brief wants it to blink, but 300 &lt; 300 is false, so it stays off. Any reading away from 300 behaves the same either way.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## A test table

Now pick the best set.

$$\text{brief: blink at } \le 300$$

1) $299, \; 300 \to \text{blink}$ — Just below, and the threshold itself (the brief includes it).
2) $301 \to \text{off}$ — Just above.
3) $0 \to \text{blink}, \; 1023 \to \text{off}$ — The two ends of the range.
4) $\text{5 cases}$ — Each one could catch a different slip.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write brief: blink at 300 and say "Find the threshold and which side it belongs to." Line 1: write 299, 300 blink and say "Just below, and the threshold itself (the brief includes it)." Line 2: write 301 off and say "Just above." Line 3: write 0 blink, 1023 off and say "The two ends of the range." Line 4: write 5 cases and say "Each one could catch a different slip." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A test table

**Which set of readings tests this brief best?**

- 0, 299, 300, 301, 1023
- 300 only
- 0, 1023
- 100, 200, 400, 500

* Answer: 0, 299, 300, 301, 1023

<!-- Speaker note: Both sides of 300, 300 itself, and the two ends. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's alarm passed both tests, but stays off at a reading of 300. Click the line where Sam's plan first goes wrong.**

```
 1  The brief: the alarm blinks when the soil reads 300 or below.
 2  Test 1: reading 0, the alarm should blink.
 3  Test 2: reading 1023, the alarm should be off.
 4  Two tests pass, so the alarm meets the brief.
```

* Answer: line 4

<!-- Speaker note: Line 4: two far-away tests can't show a slip at the threshold. Sam needs cases at 299, 300 and 301. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change the brief



- **Fix the boundary:** 
- **Three states:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/small-system/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes the brief and its tests; students change the sketch until every case passes, including a new steady state. For students who need more support: A blank test table with columns reading, should do, did, ✓/✗. For early finishers: Stop the flicker near the threshold: switch on at 300 or below, and only switch off again above 320. The hard part, on purpose: Students treat 'it worked when I tried it' as done. Ask which reading they tried, and which reading the brief is about. When students get stuck: A student's steady-on case fails as blink. Ask: Does your steady branch switch the LED off anywhere? Fix: Steady on: HIGH only, no LOW in that branch. / A student changes the tests' expectations in their head. Ask: What does the brief say for 300? Fix: The brief decides, not the sketch. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it for real

A real sensor's reading flickers by a few numbers, so a reading near the threshold can make the alarm flicker too. The fix (a gap between switching on and off) is a good stretch.

<!-- Speaker note: What this step is for: On real hardware the readings aren't neat: printing them and testing at the edges shows how a real sensor behaves. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A fan

**A fan must turn on when the temperature reading is above 600. Which three readings test the threshold?**

- 600 only
- 0, 600 and 1023
- 100, 600 and 900
- 599, 600 and 601

* Answer: 599, 600 and 601

<!-- Speaker note: Just below, at, and just above: 600 itself should be off (above, not at). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## All pass

**Every test passes. What can you say?**

- The sketch has no mistakes
- The tests are right
- The sketch does what those tests check: no more
- The sketch meets the brief

* Answer: The sketch does what those tests check: no more

<!-- Speaker note: Tests show what they check. A good table covers the boundaries and the ends. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a fridge door alarm



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/small-system/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Meeting a three-state brief against a full test table brings the unit together: read, decide in bands, act, test. Hints, in order: A light sensor in the fridge: bright means the door is open. Off below 400, steady on from 400 to 699, blink from 700. / Test the biggest band first: if (level >= 700) { blink } else if (level >= 400) { on } else { off } / Run the tests after each change, and read which case fails. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A brief says a buzzer sounds when the reading is 500 or more. Write three test readings for the threshold and what each should do.**

* 499 silent, 500 sounds, 501 sounds.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next (optional): the same project on a Raspberry Pi Pico. Then Power and motors. -->
