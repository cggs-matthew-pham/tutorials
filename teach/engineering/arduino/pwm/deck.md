---
marp: true
theme: default
html: true
---

# Outputs that vary

Arduino · Writing C++

<!-- Speaker note: Students see analogWrite(9, 128) as a fast on-off signal rather than a lower voltage, scale a knob's 0–1023 down to 0–255, meet the real board's behaviour when they don't (it wraps round), find that only the ~ pins can do PWM, and turn the mapping round. About 45 minutes (Predict and Try 6 min · Worked example 12 min · Vary 8 min · Tinkercad 9 min · Practise and Make 10 min). Sources: Arduino language reference: analogWrite (link), https://www.arduino.cc/reference/en/language/functions/analog-io/analogwrite/ (checked 12 October 2026). -->

---

## Today

**We are learning to** analogWrite(9, value) sets a brightness from 0 to 255 on a PWM pin (marked ~ on the Uno: 3, 5, 6, 9, 10, 11). The pin doesn't get a lower voltage: it switches fully on and off very fast, and the value sets how much of the time it is on. analogRead gives 0 to 1023, so divide by 4 to drive it from a knob.

- I can explain what analogWrite does to a pin.
- I can scale a reading from 0–1023 to 0–255.
- I can say which Uno pins can do PWM.

<!-- Speaker note: Before class: Model: PWM pins 3, 5, 6, 9, 10, 11; analogWrite keeps the lowest 8 bits (so 300 acts like 44), as the Uno's timers do; on other pins it sets HIGH for 128 and above. The signal is drawn as six cycles with the on part as wide as value/255. Real PWM on pin 9 runs at about 490 Hz. The same idea controls motor speed (Power and motors) and dims LEDs in screens. Teacher: Find the mistake: turn the knob slowly so students see the four ramps. Teacher: Tinkercad: the oscilloscope is the best moment of the lesson. -->

---

## Why it matters

> A digital pin is only ever 0 V or 5 V. So how does a dimmer switch, a fading LED or a motor speed control work from one?

<!-- Speaker note: `analogWrite(pin, value)` takes a value from **0** (off) to **255** (fully on). It only works on the **PWM pins**, marked `~` on the Uno: 3, 5, 6, 9, 10 and 11. PWM stands for pulse-width modulation. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**analogWrite(9, 128); — what does pin 9 do?**

- Switches between 5 V and 0 V very fast, on about half the time
- Switches off
- Stays at 5 V
- Stays at 2.5 V

<!-- Speaker note: What happens: It switches fully on and off, about 490 times a second, on for 128/255 of each cycle. Your eye averages it, so the LED looks about half as bright. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what an LED would look like at 2.5 V (it may not light at all), versus flickering faster than the eye can see. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fpwm%2Fstep-2&code=widget%3A+arduino%0Aled%3A+9%0Awave%3A+on%0Aedit%3A+off%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+analogWrite%289%2C+128%29%3B%0Acode%3A+delay%28100%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/arduino/pwm/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It switches fully on and off, about 490 times a second, on for 128/255 of each cycle. Your eye averages it, so the LED looks about half as bright.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Scale it

Now the top of the knob.

$$\text{analogRead(A0)} \to 0 \ldots 1023$$

1) $\text{analogWrite} \leftarrow 0 \ldots 255$ — Brightness: 0 off, 255 fully on.
2) $1024 \div 256 = 4$ — The input range is 4 times the output range.
3) $512 \div 4 = 128$ — Halfway on the knob gives 128.
4) $128 \div 255 \approx 0.5$ — On for about half of each cycle.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write analogRead(A0) 0 1023 and say "The knob, as before." Line 1: write analogWrite 0 255 and say "Brightness: 0 off, 255 fully on." Line 2: write 1024 ÷ 256 = 4 and say "The input range is 4 times the output range." Line 3: write 512 ÷ 4 = 128 and say "Halfway on the knob gives 128." Line 4: write 128 ÷ 255 0.5 and say "On for about half of each cycle." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Scale it

**The knob reads 1023. What does analogWrite get after level / 4?**

* Answer: 255

<!-- Speaker note: 1023 / 4 = 255 in whole numbers: fully on. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## On how long?

**analogWrite(9, 64). For how much of each cycle is the pin on?**

- 64 cycles out of 100
- About half
- All of it, at a quarter of the voltage
- About a quarter

* Answer: About a quarter

<!-- Speaker note: 64 ÷ 255 ≈ 0.25: on a quarter of the time, at the full 5 V. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**As Sam turns the knob up, the LED gets brighter, then suddenly dark, then brighter again, four times over. Click the line where Sam's sketch goes wrong.**

```
 1  int level = 0;
 2  
 3  void setup() {
 4  }
 5  
 6  void loop() {
 7    level = analogRead(A0);
 8    analogWrite(9, level);
 9    delay(50);
10  }
```

* Answer: line 8

<!-- Speaker note: Line 8: analogRead gives 0–1023 but analogWrite takes 0–255. The board keeps only the lowest 8 bits, so 256 acts like 0 and it starts again. Use level / 4. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **Smooth:** 
- **Not a PWM pin:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/pwm/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Fixing Sam's range, then moving to a non-PWM pin, shows both limits of analogWrite on the board. For students who need more support: Draw three signals for 64, 128 and 191 and shade the on parts. For early finishers: Fade in and out by itself with a for loop: for (int b = 0; b <= 255; b++) { analogWrite(9, b); delay(5); } The hard part, on purpose: 'Half brightness means half voltage' is intuitive and wrong. Keep the drawn signal in view: always full height, only the width changes. When students get stuck: A student uses analogWrite on pin 8. Ask: Is there a ~ next to 8? Fix: Use 3, 5, 6, 9, 10 or 11. / Brightness jumps as the knob turns. Ask: What is the biggest number analogWrite takes? Fix: level / 4. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Tinkercad's oscilloscope shows the real PWM signal, so students see the same square wave on a fuller simulator. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## 75%

**You want the LED on for 75% of each cycle. What value? (whole number)**

* Answer: 191

<!-- Speaker note: 0.75 × 255 ≈ 191. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which pin

**Which Uno pin can fade an LED with analogWrite?**

- 2
- 7
- 10
- 12

* Answer: 10

<!-- Speaker note: PWM pins are 3, 5, 6, 9, 10 and 11. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: turn it round



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/pwm/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Reversing the mapping (brightest at the bottom of the knob) makes students reason about the calculation rather than copy it. Hints, in order: When level / 4 is 0 you want 255, and when it is 255 you want 0. / 255 minus something. / analogWrite(9, 255 - level / 4); -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does analogWrite(9, 128) make an LED look half as bright, if the pin is only ever 0 V or 5 V?**

* The pin is on for half of each cycle and switches too fast to see, so the eye sees the average: half as bright.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Real hardware (breadboard and upload), then Power and motors (the same PWM sets motor speed through a driver). -->
