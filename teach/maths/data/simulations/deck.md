---
marp: true
theme: default
html: true
---

# Simulating compound events

Data and chance · Chance

<!-- Speaker note: Students simulate two dice and two coins, record results in a frequency table, and compare relative frequencies with probabilities from the sample space (AC9M8P03, nodes 1 and 2). About 45 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 15 min). -->

---

## Today

**We are learning to** a computer can repeat a chance experiment thousands of times in a second. Run a simulation of two events, record the results in a frequency table, and compare the relative frequency with the probability from the sample space.

- I can run a simulation of two events and record the results in a frequency table.
- I can find a relative frequency and compare it with the probability.
- I can explain why more trials give a better estimate.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need the two-dice grid (Grids and tree diagrams), complements, and relative frequency and the law of large numbers (Year 7 Many trials). The one idea: a simulation is many quick trials; its relative frequency estimates the probability and gets closer as trials grow. The common mistake is concluding from a short run (Ella's mistake: no 12 in 20 rolls, so impossible). The board is one digital tool. Others for a class task: a spreadsheet (=RANDBETWEEN(1,6) in two columns, a sum column, COUNTIF for the frequency table, filled down 1000 rows), an online dice simulator, or a short Python program. Generative AI can write a simulation, but students should check its code and its frequency table against the grid: an AI may describe results it never ran. Wider: simulate something with no simple sample space, such as how many packets of cereal you buy to collect all 6 cards. -->

---

## Why it matters

> In a board game you roll two dice every turn. Which total should you hope for, and how sure can you be? Rolling by hand would take all lesson; a simulation takes a second.

<!-- Speaker note: A **simulation** uses random numbers to act out a chance experiment, many times and quickly. Each repeat is a **trial**. Record the results in a **frequency table**, then find the **relative frequency** of the event: how many times it happened ÷ the number of trials. The board is one digital tool. In a spreadsheet, `=RANDBETWEEN(1,6)` is one roll of a dice: a whole number from 1 to 6, each equally likely. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Two dice are rolled 100 times and the totals recorded. Which total will probably come up most often?**

- They will all come up about the same
- 7
- 12

<!-- Speaker note: What happens: 7. More pairs make 7 (six of the 36) than any other total; 2 and 12 have just one pair each. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask how many pairs make 7, and how many make 12. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fsimulations%2Fstep-2&code=widget%3A+events%0Afirst%3A+dice%0Asecond%3A+dice%0Ashow%3A+sum%0Aevent%3A+s+%3D+7%0Atrials%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/simulations/?full=step-2#step-2)

<!-- Speaker note: The table counts each total. The **Probability** column comes from the grid: the number of pairs with that total out of 36. -->

<!-- Speaker note: Teacher: ask which totals are rare, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 7. More pairs make 7 (six of the 36) than any other total; 2 and 12 have just one pair each.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Relative frequency

Here is the routine.

$$\text{Event: total of 9};\ P = \tfrac{4}{36} \approx 0.11$$

1) $\text{Run } 500 \text{ trials: } 9 \text{ came up } 58 \text{ times}$ — Simulate and record.
2) $58 \div 500 = 0.116$ — Relative frequency.
3) $0.116 \approx 0.11$ — Close: more trials would make it closer still.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Event: total of 9;P = 4 ÷ 36 0.11 and say "Predict from the grid first." Line 1: write Run 500 trials: 9 came up 58 times and say "Simulate and record." Line 2: write 58 ÷ 500 = 0.116 and say "Relative frequency." Line 3: write 0.116 0.11 and say "Close: more trials would make it closer still." -->

<!-- Speaker note: Teacher: ask how many 12s Ella should expect in 20 rolls. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Relative frequency

**In 200 simulated rolls of two dice, a total of 7 came up 31 times. What is its relative frequency?**

* Answer: 0.155

<!-- Speaker note: 31 ÷ 200 = 0.155, close to 1/6 ≈ 0.167. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Ella runs a short simulation. Click the line where her conclusion goes wrong.**

```
 1  Ella uses an app to roll two dice 20 times.
 2  A sum of 12 never comes up in her 20 rolls.
 3  So the probability of a sum of 12 is 0.
```

* Answer: line 3

<!-- Speaker note: Line 3: in 20 rolls, a 1-in-36 event more often than not doesn't happen at all. P(12) = 1/36 from the grid; a short run can't show it is impossible. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two dice in a spreadsheet

**In a spreadsheet, A2 and B2 each hold =RANDBETWEEN(1,6), one dice each. Which formula in C2 simulates the total of two dice?**

- =A2*B2
- =RANDBETWEEN(1,12)
- =A2+B2
- =RANDBETWEEN(2,12)

* Answer: =A2+B2

<!-- Speaker note: Add the two dice. One random number from 2 to 12 would make every total equally likely, which two dice don't. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## More trials, other events



- **1000 trials:** 
- **At least one head:** 
- **A and not A:** 
- **Expected count:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/simulations/?full=step-4#step-4)

<!-- Speaker note: What this step is for: More trials bring the relative frequency close to the probability; a different compound event (coins) behaves the same; A and not A always share the trials. For students who need more support: A frequency table template for totals 2 to 12 with columns for count, relative frequency and probability. For early finishers: Build the two-dice simulation in a spreadsheet with 1000 rows and a frequency table. Does it agree with the board? The hard part, on purpose: Trusting a short run. Ask: how many times would you expect it in this many trials? Then: is what happened surprising? When students get stuck: A student says the simulation is wrong because 7 came up 15 times in 100, not 17. Ask: Would a real dice give exactly 17? Fix: Simulations vary like real trials; more trials, closer results. / A student reports a count as a relative frequency. Ask: Out of how many trials? Fix: Relative frequency = count ÷ trials. / A student expects the sums 2 to 12 to be equally likely. Ask: How many pairs in the grid make 2? Make 7? Fix: Count pairs: the middle totals have more. -->

<!-- Speaker note: Teacher: ask what happens to the gap between f and P as trials grow. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A frequency table

**A simulation of two coins recorded these 20 trials: HT, HH, TT, TH, HH, HT, TT, HH, TH, HT, TT, HH, HT, TH, TT, HH, HT, TH, TT, HH. Fill in the frequency table.**

| outcome | HH | HT | TH | TT |
|---|---|---|---|---|
| count | ? | ? | ? | ? |

* Answer: 6, 5, 4, 5

<!-- Speaker note: Tally each outcome: 6 + 5 + 4 + 5 = 20 trials. The relative frequency of HH is 6 ÷ 20 = 0.3, near P(HH) = 0.25. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which estimate

**Two classes simulate a total of 7 on two dice. Class A: 9 times in 40 trials. Class B: 170 times in 1000. Which estimate is more reliable?**

- Class A: its relative frequency (0.225) is bigger
- Class B
- They are equally good
- Neither: simulations don't work

* Answer: Class B

<!-- Speaker note: More trials: 0.17 from 1000 trials is far steadier than 0.225 from 40. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Close enough

**A simulated relative frequency is 0.31 and the probability from the sample space is 1/3. What should you say?**

- They agree well enough
- The simulation is broken
- The probability is wrong
- The probability is really 0.31

* Answer: They agree well enough

<!-- Speaker note: They are close: the difference is chance. Relative frequency varies, and settles near the probability as the trials grow. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: or

**Review: 30 students, 18 play netball, 10 play hockey, 4 play both. What is P(netball or hockey)?**

* Answer: 24/30

<!-- Speaker note: 18 + 10 − 4 = 24, so 24/30 = 4/5. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own simulation

Describe your result in a sentence: the event, its probability, the relative frequency after your trials, and whether they agree.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/simulations/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Choosing an event, predicting, simulating and describing the result is the whole cycle of a simulation. Hints, in order: Choose any event, such as 'the total is a prime number' or 'both dice are odd'. / Work out P(A) from the grid before you press Run. -->

<!-- Speaker note: Teacher: ask for the probability before the Run button. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A simulation gives a total of 8 on two dice 68 times in 500 trials. Find the relative frequency and compare it with the probability.**

* 68 ÷ 500 = 0.136. P(8) = 5/36 ≈ 0.139: very close.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This covers AC9M8P03. Where it leads: statistics from samples (Year 8 Statistics), and independent events and simulations in Years 9 and 10. -->
