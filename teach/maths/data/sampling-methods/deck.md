---
marp: true
theme: default
html: true
---

# Ways to choose a sample

Data and chance · Samples

<!-- Speaker note: Students take simple random, systematic, stratified and convenience samples of a simulated school, compare them, and choose methods for real situations (AC9M8ST02, node 1). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** a sample can be chosen at random, every so many people on a list, a fair share from each group, or whoever is easiest to reach. Random ways give every member a chance; the easy way is often biased.

- I can describe simple random, systematic, stratified and convenience sampling.
- I can work out a systematic step and a stratified share.
- I can choose a sampling method and say why it is fair.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need census, sample and bias (last two lessons). The one idea: random methods (simple random, systematic from a random start, stratified) give every member a chance; convenience and quota let a person choose, so they can be biased. The common mistake is calling a hand-picked sample random (Ava's mistake). The board lists the school by year group, so a systematic sample spreads through all years; a stratified sample guarantees 5 per year; a convenience sample is the front rows (Year 7). Quota sampling (typical width in the curriculum's progression) is in the lesson's table and one Modify question. Wider: random number generators (=RANDBETWEEN(1,200)) to choose a real sample from a class list. -->

---

## Why it matters

> You need 20 students from a school of 200 for a sleep survey, and Year 7s sleep more than Year 10s. How do you pick 20 so the answer is fair?

<!-- Speaker note: How you choose a sample matters as much as how big it is. Each method below picks 20 students from the school of 200, listed in order by year group. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You pick 20 of the 200 students completely at random. Will you get exactly 5 from each year group?**

- Yes, always
- Not always: it could be uneven
- Never

<!-- Speaker note: What happens: Not always. A random sample is fair, but by chance it can have 3 Year 7s and 8 Year 10s. To promise 5 from each, choose 5 at random within each year. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what could make a random sample uneven. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fsampling-methods%2Fstep-2&code=widget%3A+sample%0Ameasure%3A+sleep%0Amethod%3A+choose%0An%3A+20%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/sampling-methods/?full=step-2#step-2)

<!-- Speaker note: | Method | How it chooses | Fair? | |---|---|---| | **simple random** | every member has the same chance (names from a hat, a random number generator) | yes | | **systematic** | every *k*th member of a list, from a random start (*k* = population ÷ sample size) | usually, unless the list has a pattern | | **stratified** | split the population into groups (strata), then choose at random within each, in proportion | yes, and it guarantees each group its share | | **convenience** | whoever is easiest to reach | often biased | A **quota** sample also fills a share for each group (5 per year), but lets the collector choose who, so it can be biased like a convenience sample. -->

<!-- Speaker note: Teacher: ask how many came from each year with each method. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Not always. A random sample is fair, but by chance it can have 3 Year 7s and 8 Year 10s. To promise 5 from each, choose 5 at random within each year.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Every kth

Here is the routine for a systematic sample.

$$\text{Population } 120,\ \text{sample } 15$$

1) $k = 120 \div 15 = 8$ — Every 8th.
2) $\text{Random start from 1 to 8: say } 3$ — Start somewhere random.
3) $3, 11, 19, 27, \ldots$ — Add 8 each time until you have 15.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Population 120,sample 15 and say "Sizes." Line 1: write k = 120 ÷ 15 = 8 and say "Every 8th." Line 2: write Random start from 1 to 8: say 3 and say "Start somewhere random." Line 3: write 3, 11, 19, 27, and say "Add 8 each time until you have 15." -->

<!-- Speaker note: Teacher: ask Ava who chose the students. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Every kth

**A systematic sample of 40 is taken from a list of 200. Every how many students is chosen?**

* Answer: 5

<!-- Speaker note: 200 ÷ 40 = 5: start at a random student among the first 5, then take every 5th. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Ava chooses a sample. Click the line where her method stops being random.**

```
 1  Ava wants a random sample of 20 Year 8 students.
 2  She walks around at lunch and picks 20 students she doesn't know, so friendship doesn't affect her choice.
 3  That makes it a simple random sample.
```

* Answer: line 2

<!-- Speaker note: Line 2: Ava chose the students herself, so who was around at lunch, and whom she noticed, decides the sample. Random means every student has the same chance, such as numbers from a random number generator. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why stratify

**Year 7s sleep more than Year 10s. Why is a stratified sample (by year) a good choice for a sleep survey?**

- It makes the result exact
- It only asks Year 7s
- It is quicker than random
- Each year group gets its fair share, so no year is over- or under-represented

* Answer: Each year group gets its fair share, so no year is over- or under-represented

<!-- Speaker note: When groups differ on what you measure, stratifying stops chance from tipping the sample towards one group. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Use the methods



- **Systematic:** 
- **In proportion:** 
- **A patterned list:** 
- **Quota:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/sampling-methods/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Running systematic and stratified samples and working out shares makes the methods concrete. For students who need more support: The four methods table as a card, with the board's picture for each. For early finishers: Take a real stratified sample of 12 from your class list (by a group of your choice) using a random number generator. Write each step. The hard part, on purpose: Random isn't the same as 'picked without thinking'. Ask: did every student have the same chance, and who decided? When students get stuck: A student thinks random means 'whoever I happen to pick'. Ask: Did every student have the same chance? Who decided? Fix: Random needs a chance process: a hat, dice, a random number generator. / A student divides the wrong way for the systematic step. Ask: How many students for each one chosen? Fix: k = population ÷ sample size. / A student gives every stratum the same number when the groups differ in size. Ask: What fraction of the population is this group? Fix: In proportion: the group's share of the sample matches its share of the population. -->

<!-- Speaker note: Teacher: ask when a systematic sample goes wrong. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Names in a hat

**Each student's name is put in a hat and 30 are drawn. What method is this?**

- Stratified
- Systematic
- Simple random
- Convenience

* Answer: Simple random

<!-- Speaker note: Every student has the same chance of being drawn. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Every 50th

**A factory tests every 50th phone off the production line. What method is this?**

- Stratified
- Convenience
- Systematic
- Simple random

* Answer: Systematic

<!-- Speaker note: A fixed step along a list (or line) is systematic. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Seniors

**A club has 80 junior and 40 senior members. A stratified sample of 15 is taken in proportion. How many seniors?**

* Answer: 5

<!-- Speaker note: Seniors are 40 of 120 = 1/3, and 1/3 of 15 = 5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: bias

**Review: a survey of people at a vegan festival asks how often they eat meat. What is the main problem?**

- Nothing
- The sample is too small
- Sampling bias: festival-goers eat less meat than most people
- Measurement bias from scales

* Answer: Sampling bias: festival-goers eat less meat than most people

<!-- Speaker note: Who was asked pushes the result down. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: pick the best method

Then take 10 convenience samples and compare. Write which method you would use for the sleep survey, and why.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/sampling-methods/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Comparing methods on the same population by their results shows which are fair and which are biased. Hints, in order: Press Take 10 samples for one method, then switch method and do it again. / Look at where each method's results sit compared with the dashed line. -->

<!-- Speaker note: Teacher: ask where each method's results sit. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A school has 400 Year 9 and 200 Year 10 students. Describe how to take a stratified sample of 30.**

* In proportion: 20 Year 9s and 10 Year 10s, each chosen at random from its year's list.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This starts AC9M8ST02. Where it leads: describing a sample's distribution (next), sampling variation, and investigations. -->
