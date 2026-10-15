---
marp: true
theme: default
html: true
---

# Predict and test

Data and chance · Chance

<!-- Speaker note: Students predict expected counts (probability × trials), run experiments on a chance board, record counts and relative frequencies, and see that observed results vary around the expected count (AC9M7P01 node 3, AC9M7P02 node 1). About 45 minutes (Predict and Run 10 min · Investigate 12 min · Modify 12 min · Practise and Make 11 min). -->

---

## Today

**We are learning to** the expected number of times an outcome happens is its probability × the number of trials: 60 rolls should give about 10 sixes. Run the experiment and record the counts: the results come close, but rarely exactly.

- I can predict how often an outcome should happen in a number of trials.
- I can run an experiment, record counts and work out relative frequencies.
- I can explain why results differ from predictions in a short experiment.

<!-- Speaker note: Before class: Do the Run board first. Students need Sample spaces and probability. The one idea: expected count = probability × trials; observed counts vary around it. The common mistake is expecting the predicted count exactly, and calling a fair device unfair after a short experiment; it is planted in Noah's reasoning. If you have real dice or coins, run the 60-roll experiment physically first and pool the class's counts; the board then lets students run far more trials than a lesson allows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Roll a dice 60 times. Exactly ten sixes? Probably not. But how far off is normal, and when should you suspect the dice?

<!-- Speaker note: A probability lets you **predict** what should happen over many trials: $$\text{expected count} = \text{probability} \times \text{number of trials}$$ So in 60 rolls of a fair dice you expect about $60 \times \tfrac{1}{6} = 10$ sixes. Then you **test** it: run the experiment, record the counts in a table, and compare. The **relative frequency** (count ÷ trials) is the experiment's estimate of the probability. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You roll a fair dice 60 times. About how many sixes do you expect?**

- About 30
- You can't say anything
- About 10
- Exactly 6

<!-- Speaker note: What happens: About 10: 60 × 1/6 = 10. The real count will usually be near 10, but not always exactly 10. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands; ask students who chose 'exactly 6' what 6 is. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fpredict-and-test%2Fstep-2&code=widget%3A+chance%0Adevice%3A+dice%0Awatch%3A+6%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/predict-and-test/?full=step-2#step-2)

<!-- Speaker note: Compare with others: did anyone get exactly 10? What was the furthest from 10? -->

<!-- Speaker note: Teacher: collect everyone's count of sixes on the board as a dot plot; ask how many got exactly 10. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* About 10: 60 × 1/6 = 10. The real count will usually be near 10, but not always exactly 10.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Expected, then observed

Here is how to predict and test.

Now: how many heads in 50 flips?

$$P(6) = \tfrac{1}{6}$$

1) $60 \times \tfrac{1}{6} = 10$ — Expected count: probability × trials.
2) $\text{observed: } 7 \text{ sixes}$ — Run the experiment and record the count.
3) $\tfrac{7}{60} \approx 0.12$ — Relative frequency = count ÷ trials, the experiment's estimate.
4) $0.12 \text{ against } 0.17$ — Close but not equal: a short experiment varies.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write P(6) = 1 ÷ 6 and say "The probability from the sample space." Line 1: write 60 × 1 ÷ 6 = 10 and say "Expected count: probability × trials." Line 2: write observed: 7 sixes and say "Run the experiment and record the count." Line 3: write 7 ÷ 60 0.12 and say "Relative frequency = count ÷ trials, the experiment's estimate." Line 4: write 0.12 against 0.17 and say "Close but not equal: a short experiment varies." -->

<!-- Speaker note: Teacher: link relative frequency to Fractions, decimals and percentages. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Expected, then observed

**You flip a fair coin 50 times. How many heads do you expect?**

* Answer: 25

<!-- Speaker note: 50 × 1/2 = 25. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Noah tests a dice. Click the line where his reasoning goes wrong.**

```
 1  I rolled a dice 60 times.
 2  P(6) = 1/6, so I expect 60 × 1/6 = 10 sixes.
 3  I got 7 sixes, not 10.
 4  So the dice must be unfair.
```

* Answer: line 4

<!-- Speaker note: Line 4: in 60 rolls the count of sixes often lands a few away from 10; 7 is common for a fair dice. The expected count is what happens on average, not every time. To test a dice, roll it many more times. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Relative frequency

**In an experiment, a coin landed heads 13 times in 20 flips. What is the relative frequency of heads? (A decimal.)**

* Answer: 0.65

<!-- Speaker note: 13 ÷ 20 = 0.65, more than the probability 0.5: chance varies in 20 flips. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## One change at a time



- **Flip 100:** Each task changes one thing.
- **An unequal spinner:** 
- **Test the spinner:** 
- **Two results:** 
- **Not a whole number:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/predict-and-test/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change at a time: a coin on the board, an unequal spinner, more trials, comparing two results, then the edge case of an expected count that is not a whole number. Hints, in order: Expected: 100 × 1/2 = 50 heads. / Red is 3 of 8 equal parts. Run 80 spins and look at the expected count column. For students who need more support: Use the board's Expected count column to check each prediction. For early finishers: Each of 30 students rolls a dice 60 times. Predict roughly how many of them will get exactly 10 sixes. Then simulate it with the board (about 1 in 7). When students get stuck: A student expects the predicted count exactly (Noah's mistake). Ask: Look at the class's counts. Did everyone get 10? Fix: Expected means 'about, on average', not every time. / A student gives the probability as the expected count. Ask: Out of how many trials? Fix: Multiply the probability by the number of trials. -->

<!-- Speaker note: Teacher: before the two-students question, ask what range of heads in 10 flips is normal. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Expected count

**A bag has 2 red and 8 blue counters. You take one and put it back, 40 times. How many reds do you expect?**

* Answer: 8

<!-- Speaker note: P(red) = 2/10 = 1/5, and 40 × 1/5 = 8. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Relative frequency

**A spinner landed on green 18 times in 60 spins. What is the relative frequency of green? (A decimal.)**

* Answer: 0.3

<!-- Speaker note: 18 ÷ 60 = 0.3. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Suspicious

**Which result would make you most suspicious of a coin?**

- 52 heads in 100 flips
- 6 heads in 10 flips
- 900 heads in 1000 flips

* Answer: 900 heads in 1000 flips

<!-- Speaker note: Over 1000 flips you expect about 500; 900 is far too many for chance. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: probability

**Review: roll a fair dice. What is $P(\text{a number less than } 3)$? Simplest form.**

* Answer: 1/3

<!-- Speaker note: {1, 2}: 2/6 = 1/3. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: plan an experiment

Then: how many spins of the 3-red, 5-blue spinner to expect 30 reds?

<!-- Speaker note: What this step is for: Choosing the number of trials for a target expected count reverses the lesson: trials = expected count ÷ probability. -->

<!-- Speaker note: Teacher: ask for the general rule: trials = expected count ÷ probability. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A spinner has P(blue) = 0.4. How many blues do you expect in 50 spins? You get 23. Is the spinner unfair?**

* 20 expected. 23 is close to 20, so there is no reason to think it is unfair.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Many trials (AC9M7P02 node 2): what happens to the relative frequency over hundreds and thousands of trials. Where it leads: simulating compound events (Year 8) and statistical significance much later. -->
