---
marp: true
theme: default
html: true
---

# Reading the C++

Arduino · A new board

<!-- Speaker note: Students watch setup() run once and loop() repeat, trace board time through a blink, see why blink code in setup() blinks only once, and change delays to set a blink's timing, including a lighthouse from its timing. About 40 minutes (Predict and Try 5 min · Worked example 10 min · Vary 6 min · Tinkercad 10 min · Practise and Make 9 min). Sources: Arduino language reference (link), https://www.arduino.cc/reference/en/ (checked 12 October 2026). -->

---

## Today

**We are learning to** every sketch has two parts: setup() runs once when the board starts, then loop() runs again and again for ever. delay(ms) waits that many milliseconds, so the delays set the timing of a blink.

- I can say what setup() and loop() each do.
- I can work out a blink's timing from its delays.
- I can choose delays for a timing.

<!-- Speaker note: Before class: The board counts setup() and loop() runs and uses simulated time, so delays are exact (o and f in the checks are the last on and off times in ms). MakeCode's on start and forever are the same two parts; say so. Teacher: Worked example: ask what the LED is doing at 750 ms. Teacher: Vary: ask which delay is the on time. -->

---

## Why it matters

> MakeCode had 'on start' and 'forever'. An Arduino sketch has the same two parts, written as C++. Which part runs when, and how many times?

<!-- Speaker note: | MakeCode | Arduino C++ | |---|---| | on start | `void setup() { … }` | | forever | `void loop() { … }` | | pause (ms) | `delay(ms);` | The lines inside `{ }` belong to that part, and each statement ends with `;`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The blink sketch runs for 10 seconds. How many times does setup() run?**

- Never: only loop() runs
- Twice
- Once
- Every time loop() runs

<!-- Speaker note: What happens: Once, when the board starts. Then loop() runs again and again: 10 times in 10 seconds here, as each loop takes 1 s. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: link to MakeCode's on start. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fsetup-loop%2Fstep-2&code=widget%3A+arduino%0Aled%3A+13%0Aedit%3A+off%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+pinMode%2813%2C+OUTPUT%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+digitalWrite%2813%2C+HIGH%29%3B%0Acode%3A+delay%28500%29%3B%0Acode%3A+digitalWrite%2813%2C+LOW%29%3B%0Acode%3A+delay%28500%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/arduino/setup-loop/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Once, when the board starts. Then loop() runs again and again: 10 times in 10 seconds here, as each loop takes 1 s.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Board time

Now fill in the times.

$$\text{setup(): pinMode(13, OUTPUT)}$$

1) $\text{loop(): digitalWrite(13, HIGH)}$ — LED on. Writing takes (almost) no time.
2) $\text{delay(500)}$ — Wait 500 ms with the LED on.
3) $\text{digitalWrite(13, LOW); delay(500)}$ — LED off for 500 ms.
4) $\text{end of loop()} \to \text{start of loop()}$ — 1000 ms per blink, for ever.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write setup(): pinMode(13, OUTPUT) and say "Runs once, at 0 ms. Pin 13 is now an output." Line 1: write loop(): digitalWrite(13, HIGH) and say "LED on. Writing takes (almost) no time." Line 2: write delay(500) and say "Wait 500 ms with the LED on." Line 3: write digitalWrite(13, LOW); delay(500) and say "LED off for 500 ms." Line 4: write end of loop() start of loop() and say "1000 ms per blink, for ever." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Board time

**Fill in the board time after each line of loop(), starting at 0 ms.**

| line | LED | time (ms) |
|---|---|---|
| digitalWrite(13, HIGH); | on | 0 |
| delay(500); | on | ? |
| digitalWrite(13, LOW); | off | ? |
| delay(500); | off | ? |

* Answer: 500, 500, 1000

<!-- Speaker note: Only delay takes time: the LED is on from 0 to 500 ms and off from 500 to 1000 ms, then loop() starts again. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's blink

```cpp
void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}

void loop() {
}
```

**Sam put the blink lines in setup() and left loop() empty (below). What does the LED do?**

- Blinks for ever
- Stays on
- Never lights
- Blinks once, then stays off

* Answer: Blinks once, then stays off

<!-- Speaker note: setup() runs once, so the LED blinks once. Anything that should repeat goes in loop(). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change the timing



- **Twice as fast:** 
- **A flash:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/arduino/setup-loop/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Changing one delay at a time shows each delay sets one part of the blink. For students who need more support: A timeline strip from 0 to 2000 ms to shade on and off. For early finishers: Make a heartbeat: two quick flashes, then a pause. (Four delays in loop().) The hard part, on purpose: Students forget that writing a pin takes no time; only delay does. Trace it with a stopwatch in hand. When students get stuck: A student changes only one delay for 'twice as fast'. Ask: How long is one blink now? Fix: Both delays set the length of a blink. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: In Tinkercad's Text view students edit the C++ directly for the first time and check the timing on a simulated board. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the blinks

**loop() is: HIGH, delay(300), LOW, delay(700). How many blinks in 10 seconds?**

* Answer: 10

<!-- Speaker note: Each loop takes 1000 ms, so 10 blinks in 10 s. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where it goes

**Where does pinMode(13, OUTPUT); belong?**

- In loop(): so it keeps working
- In setup(): it only needs doing once
- Before setup(), outside both
- It doesn't matter

* Answer: In setup(): it only needs doing once

<!-- Speaker note: Set up once in setup(); repeat in loop(). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a lighthouse



[Open this step](https://tutorials.learningwaypoints.com/engineering/arduino/setup-loop/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Working from a timing back to the delays reverses the process. Hints, in order: The light is on for 200 ms in every 2 seconds. / 2 s = 2000 ms: off for 2000 − 200 ms. / delay(200) after HIGH and delay(1800) after LOW. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between setup() and loop()?**

* setup() runs once when the board starts; loop() runs again and again after it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Values and decisions (variables, analogRead and if). -->
