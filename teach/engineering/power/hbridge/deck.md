---
marp: true
theme: default
html: true
---

# Motor drivers

Power and motors · Driving a motor

<!-- Speaker note: Students drive a motor through an H-bridge driver, using two direction inputs and a PWM enable, read the three signals in a sketch, find a PWM signal on the wrong pin, and compare braking with coasting. About 40 minutes (Predict and Try 6 min · Worked example 9 min · Vary 5 min · Tinkercad 12 min · Practise and Make 8 min). Sources: Texas Instruments L293D datasheet (link), https://www.ti.com/product/L293D (checked 12 October 2026). -->

---

## Today

**We are learning to** a motor driver (an H-bridge) lets two pins choose the direction: IN1 HIGH and IN2 LOW is forwards, swapped is backwards, the same is stop. A third, PWM pin on ENA sets the speed with analogWrite. Two jobs, two kinds of signal.

- I can make a motor go forwards, backwards and stop with a driver.
- I can set a motor's speed with PWM on the enable pin.

<!-- Speaker note: Before class: Model: an L293D-style driver with its own motor battery; IN1/IN2 HIGH-LOW forwards, LOW-HIGH backwards, both the same stops (both HIGH brakes), ENA 0–255 sets speed. Many driver boards tie ENA HIGH with a jumper: remove it to use PWM. The L293D drops about 1.5–2 V; the TB6612 much less. The Robotics challenges (Cutebot) hide the same driver behind MakeCode blocks. Teacher: Find the mistake: ask which pins have a ~. -->

---

## Why it matters

> A transistor switches a motor on and off. But a robot has to reverse, and go slowly round corners. How does a pin make a motor go backwards?

<!-- Speaker note: A **motor driver** such as the L293D (or TB6612, L298N) sits between the Uno and the motor. Inside it is an **H-bridge**: four switches that can send the battery's current through the motor either way. | IN1 | IN2 | motor | |---|---|---| | HIGH | LOW | forwards | | LOW | HIGH | backwards | | same | same | stops (both HIGH brakes) | **ENA** takes `analogWrite` (0–255): the speed. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The motor goes forwards with IN1 HIGH, IN2 LOW and ENA at 200. How do you make it go backwards at the same speed?**

- Set both IN1 and IN2 LOW
- Set ENA to −200
- Swap them: IN1 LOW, IN2 HIGH, ENA still 200
- Set ENA to 55

<!-- Speaker note: What happens: Swap IN1 and IN2. ENA only sets speed (0 to 255); it can't be negative. Both LOW stops the motor. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what 'minus speed' would mean to a PWM signal. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fpower%2Fhbridge%2Fstep-2&code=widget%3A+motor%0Amode%3A+hbridge%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/power/hbridge/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Swap IN1 and IN2. ENA only sets speed (0 to 255); it can't be negative. Both LOW stops the motor.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Direction, then speed

Now backwards at three-quarter speed.

$$\text{digitalWrite(8, HIGH)}$$

1) $\text{digitalWrite(7, LOW)}$ — IN2 LOW: forwards.
2) $\text{analogWrite(9, 128)}$ — ENA at 128 of 255: about half speed.
3) $\text{swap 8 and 7}$ — Backwards. ENA is unchanged.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write digitalWrite(8, HIGH) and say "IN1 HIGH." Line 1: write digitalWrite(7, LOW) and say "IN2 LOW: forwards." Line 2: write analogWrite(9, 128) and say "ENA at 128 of 255: about half speed." Line 3: write swap 8 and 7 and say "Backwards. ENA is unchanged." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Direction, then speed

**IN1 on pin 8, IN2 on pin 7, ENA on pin 9. Which lines make the motor go backwards at three-quarter speed?**

- analogWrite(8, 191); analogWrite(7, 0);
- digitalWrite(8, LOW); digitalWrite(7, HIGH); analogWrite(9, 191);
- digitalWrite(9, LOW); analogWrite(8, 191);
- digitalWrite(8, HIGH); digitalWrite(7, LOW); analogWrite(9, -191);

* Answer: digitalWrite(8, LOW); digitalWrite(7, HIGH); analogWrite(9, 191);

<!-- Speaker note: Direction on 8 and 7, speed 191 (75% of 255) on ENA. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's motor turns at full speed whatever Sam does. Click the line where Sam's sketch goes wrong.**

```
 1  void setup() {
 2    pinMode(8, OUTPUT);
 3    pinMode(7, OUTPUT);
 4  }
 5  
 6  void loop() {
 7    digitalWrite(8, HIGH);
 8    digitalWrite(7, LOW);
 9    analogWrite(8, 128);
10    delay(2000);
11  }
```

* Answer: line 9

<!-- Speaker note: Line 9: speed belongs on ENA (pin 9, a PWM pin). Pin 8 is a direction input and has no PWM; analogWrite there just sets it HIGH. ENA was never set, so on a driver with ENA tied HIGH it runs flat out. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **Brake:** 
- **Coast:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/hbridge/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Stopping two ways (both the same, or ENA at 0) shows the difference between braking and coasting. For students who need more support: A printed truth table beside the board. For early finishers: Write a function drive(int speed) that goes forwards for positive speeds and backwards for negative ones. The hard part, on purpose: Students try a negative speed for backwards. Keep the truth table on the board. When students get stuck: The motor won't go backwards. Ask: Which input is HIGH? Fix: Swap IN1 and IN2. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Tinkercad's L293D and DC motor let students wire the real chip and run a forwards, stop, backwards sketch. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two motors

**A robot has a left and a right motor. The left goes forwards and the right goes backwards, both at the same speed. The robot…**

- Goes forwards
- Stops
- Goes backwards
- Spins on the spot

* Answer: Spins on the spot

<!-- Speaker note: Opposite directions turn it on the spot. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Speed

**ENA is at 64. What percentage of full speed is that (to the nearest whole number)?**

* Answer: 25

<!-- Speaker note: 64 ÷ 255 ≈ 25%. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a gentle start



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/hbridge/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Setting a precise direction and speed from a brief applies both signals. Hints, in order: Backwards: which input is HIGH? / 30% of 255 is about 77. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Write the three lines that make a motor (IN1 on 8, IN2 on 7, ENA on 9) go forwards at full speed.**

* digitalWrite(8, HIGH); digitalWrite(7, LOW); analogWrite(9, 255);

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Two supplies, one ground. -->
