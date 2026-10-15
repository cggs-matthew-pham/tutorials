---
marp: true
theme: default
html: true
---

# Checking a model

Number Foundations · Modelling

<!-- Speaker note: Students compare simple models with real outcomes (taxi fares, trip times, exchange rates), name the assumption that failed, and refine the model with a starting charge, stops or fees (AC9M8M07, node 2). About 35 minutes (Predict and Run 8 min · Investigate 8 min · Modify 10 min · Practise and Make 9 min). -->

---

## Today

**We are learning to** every model makes assumptions: a steady speed with no stops, a fare with no starting charge, an exchange rate with no fees. When a model's answer and real life differ, look for the assumption that does not hold, then refine the model, for example by adding a fixed starting amount.

- I can name an assumption a model makes.
- I can explain how an assumption makes a model's answer differ from real life.
- I can refine a model and say when a simple one is good enough.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need rate models (previous lesson). The one idea: when a model and real life disagree, look for the assumption that did not hold, then refine. The common mistake is blaming correct arithmetic (Sam's mistake). The board's starting charge (`base`) shows a refined model: a fixed amount plus a rate. The taxi fare, plumber's prices and exchange rate are round examples, not real tariffs. Wider: compare a simple tax model (one rate for everyone) with the bracket model from Money models; constant versus changing exchange rates. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> A map app says the drive takes 3 hours. It takes 3 and a half. The maths was right; the model was too simple. Finding out why is the last step of modelling.

<!-- Speaker note: A **model** is a simplified version of a real situation. Every model makes **assumptions**: things it takes to be true to keep the maths simple. | Model | Assumption | What can go wrong | |---|---|---| | time = distance ÷ speed | a steady speed, no stops | traffic and breaks make it slower | | water bill = rate × litres | no fixed charge | bills add a service charge | | US dollars = 0.65 × Australian dollars | no fees, a fixed rate | banks charge fees; rates change daily | To **review** a model: compare its answer with real life, name the assumption that does not hold, and **refine** the model (add the stop, the starting charge, the fee). A simple model is fine when the difference does not matter for the decision. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A model says a 5 km taxi ride costs 5 × $2.10 = $10.50. The real fare is $14.70. Why?**

- 5 × 2.10 is not 10.50
- The model leaves out a starting charge
- Taxi fares are random
- The taxi went faster than expected

<!-- Speaker note: What happens: The model leaves out a starting charge (a flag fall) of $4.20: 4.20 + 10.50 = 14.70. The arithmetic was fine. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask whether 5 × 2.10 is right. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fnumber%2Fchecking-models%2Fstep-2&code=widget%3A+rate%0Atop%3A+%24%2C+fare%0Abottom%3A+km%2C+distance%0Arate%3A+2.1%0Abase%3A+4.2%0Aslider+x%3A+0%2C+20%2C+1%2C+1%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/number/checking-models/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: ask what the fare is for 0 km. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The model leaves out a starting charge (a flag fall) of $4.20: 4.20 + 10.50 = 14.70. The arithmetic was fine.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The trip

Here is the routine.

$$\text{model: water bill} = \$2.50 \times \text{kL}$$

1) $\text{real bill: } \$80$ — Compare with what happened.
2) $\text{assumption: no fixed charge}$ — Name what the model took to be true.
3) $\$30 + \$2.50 \times 20 = \$80$ — Refine: add the \$30 service charge.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write model: water bill = \$2.50 × kL and say "A simple model: 20 kL costs \$50." Line 1: write real bill: \$80 and say "Compare with what happened." Line 2: write assumption: no fixed charge and say "Name what the model took to be true." Line 3: write \$30 + \$2.50 × 20 = \$80 and say "Refine: add the \$30 service charge." -->

<!-- Speaker note: Teacher: ask Sam to check 300 ÷ 100. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The trip

**A model says a 300 km trip takes 300 ÷ 100 = 3 hours. What does it assume?**

- The road is straight
- The car travels at exactly 100 km/h the whole way, with no stops
- The car uses no petrol
- Nothing: it is exact

* Answer: The car travels at exactly 100 km/h the whole way, with no stops

<!-- Speaker note: Steady speed, no stops, no traffic. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's model and the real trip disagree. Click the line where his review goes wrong.**

```
 1  Sam's model: time = 300 km ÷ 100 km/h = 3 hours.
 2  The real trip took 3.5 hours.
 3  So the calculation 300 ÷ 100 must be wrong.
```

* Answer: line 3

<!-- Speaker note: Line 3: 300 ÷ 100 = 3 is right. The assumption (a steady 100 km/h with no stops) did not hold. Refine the model: add the stops, or use a lower average speed. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Refine it

**How could you refine the trip model?**

- Divide 300 by 100 again
- Use 3.14 instead of 3
- Add the time for a stop, or use a lower average speed
- Make the trip shorter

* Answer: Add the time for a stop, or use a lower average speed

<!-- Speaker note: Add what the model left out: a 30-minute stop makes it 3.5 hours. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Refine and judge



- **Backwards:** 
- **Exchange fees:** 
- **Add the stops:** 
- **Good enough:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/number/checking-models/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Using the refined fare model backwards, naming a hidden assumption, adding stops, and judging when a simple model is enough. Hints, in order: Take off the $4.20 first. / 21.00 ÷ 2.10 = ? For students who need more support: A frame: The model assumes … In real life … So the answer … A better model would … For early finishers: Find a real taxi or rideshare fare structure for your city and build its model. What does it still leave out (waiting time, surge pricing)? The hard part, on purpose: Separating the maths from the model. When an answer is 'wrong', ask students to check the arithmetic first, then ask what the model took to be true. When students get stuck: A student says the maths is wrong. Ask: Is the calculation right? What did the model assume? Fix: Check the arithmetic, then name the assumption. / A student forgets the fixed charge when working backwards. Ask: What do you pay before the meter starts? Fix: Take the fixed part off first, then divide by the rate. / A student cannot name an assumption. Ask: What would have to be true for the answer to be exact? Fix: That is the assumption. -->

<!-- Speaker note: Teacher: ask when the simple trip model is fine. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The phone plan

**A model for a phone plan is cost = $0.10 per MB used. The real bill was $20 more than the model said. Jo says: 'The model's sum must be wrong.' What is more likely?**

- The model leaves out a fixed $20 monthly fee
- Jo is right: the sum is wrong
- The phone company made a mistake
- The price per MB changed

* Answer: The model leaves out a fixed $20 monthly fee

<!-- Speaker note: A gap of the same amount every time suggests a fixed charge: cost = 20 + 0.10 × MB. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A taxi ride

**With the refined taxi model ($4.20 plus $2.10 per km), what does an 8 km ride cost, in dollars?**

* Answer: 21

<!-- Speaker note: 4.20 + 2.10 × 8 = 4.20 + 16.80 = $21. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Refined phone model

**A refined phone model is cost = 20 + 0.10 × MB. What is the cost for 350 MB, in dollars?**

* Answer: 55

<!-- Speaker note: 20 + 0.10 × 350 = 20 + 35 = $55. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: speed

**Review: a car goes 270 km in 3 hours. What is its average speed in km/h?**

* Answer: 90

<!-- Speaker note: 270 ÷ 3 = 90 km/h. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a plumber's quote

Then name one assumption in the plumber's model, and say how a real bill might differ.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/number/checking-models/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Using a refined model (a call-out fee plus a rate) backwards, then naming its assumptions. Hints, in order: Take off the $80 call-out first. / 380 ÷ 95 = ? -->

<!-- Speaker note: Teacher: ask for an assumption about the plumber's time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A model says 4 kg of apples at $3.50 per kg cost $14. The shop charges $12.60 for 4 kg. Name a possible assumption that failed.**

* A fixed price per kg: the shop may give a discount for buying more (a bulk price).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes AC9M8M07. Where it leads: linear models with a starting value (Linear relations: y = mx + c), and modelling in Years 9 and 10. -->
