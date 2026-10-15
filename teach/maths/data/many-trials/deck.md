---
marp: true
theme: default
html: true
---

# Many trials

Data and chance · Chance

<!-- Speaker note: Students run hundreds and thousands of trials and watch the relative frequency settle towards the probability (the law of large numbers), use large experiments to estimate unknown probabilities, and reject the idea that outcomes are 'due' (AC9M7P02, node 2). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** over a few trials the relative frequency jumps about; over many it settles close to the probability. That is why more trials give a better estimate, and why a run of tails does not make heads 'due'.

- I can describe how the relative frequency changes as the number of trials grows.
- I can use a large experiment to estimate a probability.
- I can explain why a run of one outcome does not make another one 'due'.

<!-- Speaker note: Before class: Do the Run and Make boards first. Students need Predict and test. The one idea: over many trials the relative frequency settles close to the probability, because each new trial changes the fraction less, not because results balance out. The common mistake is the gambler's fallacy (a coin is 'due' a head); it is planted in Zara's reasoning and again in Practise. The mystery bag hides its contents: students estimate the make-up from 1000 draws (with replacement). It has 3 red and 7 yellow counters. -->

---

## Why it matters

> Flip a coin ten times and you might get 7 heads. Flip it ten thousand times and you will be very close to half. Why does more help?

<!-- Speaker note: In Predict and test you saw that a short experiment rarely matches the expected count. This lesson asks what happens as the number of trials grows. The **relative frequency** (count ÷ trials) jumps about over the first few trials, then settles closer and closer to the **probability**. This is called the **law of large numbers**. It is why a large experiment (or a simulation) gives a good estimate of a probability you cannot work out from a sample space. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Which is more likely to give a relative frequency of heads between 0.45 and 0.55: 10 flips, or 1000 flips?**

- 10 flips
- 1000 flips
- Both are equally likely

<!-- Speaker note: What happens: 1000 flips. In 10 flips, getting 3 or 7 heads (0.3 or 0.7) is common. Over 1000 flips the relative frequency is almost always within 0.05 of 0.5. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands; many students choose 'equally likely'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fmany-trials%2Fstep-2&code=widget%3A+chance%0Adevice%3A+coin%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/many-trials/?full=step-2#step-2)

<!-- Speaker note: Where is the line after 10 flips? After 1000? Press Start again and run it again: does the start look the same? -->

<!-- Speaker note: Teacher: ask students to press Start again and compare the first ten flips of different runs. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 1000 flips. In 10 flips, getting 3 or 7 heads (0.3 or 0.7) is common. Over 1000 flips the relative frequency is almost always within 0.05 of 0.5.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Settling, not balancing

Here is why more trials help.

Now find the relative frequency after 1000 flips.

$$\tfrac{7}{10} = 0.7$$

1) $\tfrac{7}{10} \to \tfrac{8}{11} \approx 0.73$ — One more head moves it a lot.
2) $\tfrac{501}{1000} \to \tfrac{502}{1001} \approx 0.5015$ — After 1000 flips, one more head barely moves it.
3) $\text{each flip: } P(H) = \tfrac{1}{2}$ — The coin has no memory: nothing is "due".

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 7 ÷ 10 = 0.7 and say "Ten flips: one result changes the fraction by 0.1." Line 1: write 7 ÷ 10 8 ÷ 11 0.73 and say "One more head moves it a lot." Line 2: write 501 ÷ 1000 502 ÷ 1001 0.5015 and say "After 1000 flips, one more head barely moves it." Line 3: write each flip: P(H) = 1 ÷ 2 and say "The coin has no memory: nothing is "due"." -->

<!-- Speaker note: Teacher: show the 7/10 → 8/11 and 501/1000 → 502/1001 calculation on the board. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Settling, not balancing

**After 1000 flips, a coin has shown 482 heads. What is the relative frequency of heads? (A decimal.)**

* Answer: 0.482

<!-- Speaker note: 482 ÷ 1000 = 0.482: close to 0.5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Zara thinks about her next flip. Click the line where her reasoning goes wrong.**

```
 1  A fair coin has P(heads) = 1/2.
 2  I flipped it 5 times and got 5 tails in a row.
 3  Heads is now more likely on the next flip, to balance things out.
```

* Answer: line 3

<!-- Speaker note: Line 3: the coin does not remember. Each flip is still 1/2 heads. Five tails in a row is unusual but not impossible, and it is not 'balanced out'; it just matters less as more flips are added. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why it settles

**Why does the relative frequency settle down over many trials?**

- The coin starts landing heads more to catch up
- Each new trial changes the total by less and less, so the fraction moves less
- After 1000 trials the outcomes stop being random

* Answer: Each new trial changes the total by less and less, so the fraction moves less

<!-- Speaker note: One more head changes 7/10 a lot, but 501/1000 hardly at all. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## One change at a time



- **A dice:** Each task changes one thing.
- **A mystery bag:** 
- **Which to trust:** 
- **Long runs:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/many-trials/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change at a time: a dice instead of a coin, a mystery bag estimated from data, the size of the error, then the edge case of a long run. Hints, in order: Run 1000 at a time. P(6) is 1/6 ≈ 0.167. / You cannot see the bag. Run at least 1000 draws (each counter goes back in). / Relative frequency of red × 10 estimates how many of the 10 counters are red. For students who need more support: Use the board's graph: point to where the line is after 10, 100 and 1000 trials. For early finishers: How many flips are needed, roughly, to be within 0.01 of 0.5 most of the time? Experiment with the board (about 10 000). When students get stuck: A student thinks heads is 'due' (Zara's mistake). Ask: How would the coin know what happened before? Fix: Each flip is still 1/2; long runs happen, and get swamped by many more trials. / A student thinks large experiments give the probability exactly. Ask: After 1000 flips, is it exactly 0.5? Fix: Close, not exact: closer with more trials. -->

<!-- Speaker note: Teacher: collect the class's estimates for the mystery bag; reveal 3 red, 7 yellow. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Estimate

**A drawing pin landed point-up 312 times in 800 throws. Estimate the probability it lands point-up. (A decimal.)**

* Answer: 0.39

<!-- Speaker note: 312 ÷ 800 = 0.39. A pin has no sample space of equal outcomes, so experiments are the way to estimate. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Streaks

**A roulette wheel landed on red 8 times in a row. What is true about the next spin?**

- Black is now more likely
- Red is exactly as likely as before
- Red is now more likely: it is on a streak

* Answer: Red is exactly as likely as before

<!-- Speaker note: Each spin is independent: the probability does not change. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Use the estimate

**Using your estimate of 0.39, how many point-up landings would you expect in 200 throws?**

* Answer: 78

<!-- Speaker note: 200 × 0.39 = 78. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: expected count

**Review: how many heads do you expect in 300 flips of a fair coin?**

* Answer: 150

<!-- Speaker note: 300 × 1/2 = 150. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: how many is enough?

How many flips did it take? Compare with others.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/many-trials/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Running trials until the estimate is within 0.01 of the probability makes the law of large numbers concrete: closeness costs many trials. Hints, in order: Run 1000 at a time. / Keep going until the relative frequency of heads is between 0.49 and 0.51. -->

<!-- Speaker note: Teacher: collect how many flips each student needed. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**After 40 spins a spinner gave 18 reds; after 4000 spins, 1230 reds. Which estimate of P(red) is better, and what is it?**

* The 4000-spin one: 1230 ÷ 4000 ≈ 0.31. More trials give a more reliable estimate.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes the Year 7 chance descriptors (AC9M7P01, AC9M7P02). Where it leads: complementary events, two-step experiments and simulations of compound events (Year 8). -->
