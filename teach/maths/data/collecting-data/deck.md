---
marp: true
theme: default
html: true
---

# Census, sample, experiment or observation

Data and chance · Samples

<!-- Speaker note: Students compare a census and samples on a simulated school, and choose between census, sample, experiment and observation for real questions (AC9M8ST01, node 1). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** data can come from everyone (a census), from some (a sample), from an experiment where you change something on purpose, or from watching (an observation). Each has a cost, a time and an accuracy; choose the one that fits the question.

- I can say the difference between a census and a sample.
- I can tell an experiment from an observation.
- I can choose a way to collect data and explain why it is practical.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need statistical questions and investigations from Year 7. The one idea: a census is exact but often slow, costly or impossible; a sample estimates; an experiment changes something on purpose; an observation watches. The common mistake is thinking a census is always best (Noah's battery test destroys what it measures). The board is a made-up school of 200 students (the same every time): sleep falls and sport drops with year level, which matters in the next lessons on bias and sampling methods. Wider: the ABS census and the monthly Labour Force Survey (a sample of about 50 000 people) as a real pair. -->

---

## Why it matters

> Every five years Australia asks every household the census questions. A TV ratings company measures viewing in only a few thousand homes. Why doesn't it just measure everyone?

<!-- Speaker note: The **population** is everyone (or everything) the question is about. There are four main ways to get data: | Technique | What you do | Example | |---|---|---| | **census** | measure every member of the population | the national census of every household | | **sample** | measure some of the population | a poll of 1000 voters | | **experiment** | change something on purpose and measure what happens | half a class revises with music, half without | | **observation** | watch and record without changing anything | counting cars past the school gate | -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A school has 200 students. You ask 20 of them, chosen at random, how long they sleep. Will their mean equal the mean of all 200?**

- Exactly the same
- Nowhere near
- Close, but probably not exactly

<!-- Speaker note: What happens: Close, but probably not exactly. A random sample gives an estimate; a census gives the exact value, at much more cost. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what 'close' would mean for a mean of about 9 hours. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fcollecting-data%2Fstep-2&code=widget%3A+sample%0Ameasure%3A+sleep%0Amethod%3A+choose%0Aslider+n%3A+5%2C+100%2C+20%2C+5%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/collecting-data/?full=step-2#step-2)

<!-- Speaker note: Each dot is a student; the orange rings are the ones measured. The dashed line on the plot is the population's value. -->

<!-- Speaker note: Teacher: ask what the census cost compared with the sample. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Close, but probably not exactly. A random sample gives an estimate; a census gives the exact value, at much more cost.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Why a sample

Here is the routine for choosing.

$$\text{Question: how much do Year 8s spend on lunch?}$$

1) $\text{Census? } 180 \text{ students: possible, but slow}$ — Can you measure everyone? At what cost?
2) $\text{Sample of } 40 \text{ chosen at random}$ — Quicker, cheaper, and close if chosen fairly.
3) $\text{Not an experiment: nothing is changed}$ — Measuring as things are: a survey of a sample.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Question: how much do Year 8s spend on lunch? and say "Name the population: Year 8 students." Line 1: write Census? 180 students: possible, but slow and say "Can you measure everyone? At what cost?" Line 2: write Sample of 40 chosen at random and say "Quicker, cheaper, and close if chosen fairly." Line 3: write Not an experiment: nothing is changed and say "Measuring as things are: a survey of a sample." -->

<!-- Speaker note: Teacher: ask Noah what the factory sells afterwards. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why a sample

**A newspaper wants to know what people in its city think of a new bridge. Why does it survey a sample of 800, not everyone?**

- Opinions can't be measured
- A sample is more accurate than a census
- Asking every person in the city would take too long and cost too much
- The law says so

* Answer: Asking every person in the city would take too long and cost too much

<!-- Speaker note: When measuring everyone costs too much or takes too long, a fair sample is the sensible choice. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Noah plans how to collect data. Click the line where his plan goes wrong.**

```
 1  Noah wants to know how long the batteries from a factory last.
 2  A census gives the exact answer, so he decides to test every battery until it runs flat.
 3  Then he will know exactly how long the factory's batteries last.
```

* Answer: line 2

<!-- Speaker note: Line 2: testing every battery until it is flat leaves the factory nothing to sell. Test a sample instead. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Experiment

**Some students revise with music and some without, chosen at random, then all sit the same test. What technique is this?**

- An observation
- A census
- Not a way to collect data
- An experiment: the researcher changes something on purpose

* Answer: An experiment: the researcher changes something on purpose

<!-- Speaker note: The music is the thing changed on purpose; the scores show its effect. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Matching the technique



- **Match the technique:** 
- **Bigger samples:** 
- **The census:** 
- **Counting cars:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/collecting-data/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Matching situations to techniques, then seeing that a bigger sample gets closer, shows cost against accuracy. For students who need more support: The four techniques on a card, each with a picture example. For early finishers: Find out how the ABS chooses the homes in the Labour Force Survey, and why it doesn't ask the same homes forever. The hard part, on purpose: Weighing cost against accuracy. Ask: what would it take to measure everyone, and is it worth it? When students get stuck: A student says a sample is always worse. Ask: What would a census of every battery leave? Fix: Samples are chosen for cost, time, or when measuring destroys. / A student calls any survey an experiment. Ask: Did anyone change something on purpose? Fix: Experiment: change one thing and compare. Survey or observation: measure as things are. / A student forgets to name the population. Ask: Who exactly is the question about? Fix: Write the population first: 'all Year 8 students at this school'. -->

<!-- Speaker note: Teacher: ask what changed when the sample grew. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Small class

**A teacher wants the mean height of her class of 25. What is most sensible?**

- A sample of 5
- A census: measuring 25 students is quick
- An experiment
- An observation from across the room

* Answer: A census: measuring 25 students is quick

<!-- Speaker note: When the population is small and measuring is easy, a census gives the exact answer. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Toothpaste

**A company wants to know if a new toothpaste reduces cavities. What technique fits?**

- Asking the company's staff
- An experiment: some use the new toothpaste, some the old, chosen at random
- An observation of shop shelves
- A census of everyone who brushes their teeth

* Answer: An experiment: some use the new toothpaste, some the old, chosen at random

<!-- Speaker note: To see the effect of a change, compare groups given different treatments. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Testing every bottle

**A juice factory checks the sugar in its bottles. A manager says: 'Test every bottle, so we know for sure.' What is wrong with that plan?**

- Testing opens the bottle, so there would be nothing left to sell
- Nothing: a census is always best
- The bottles are too small
- Sugar can't be measured

* Answer: Testing opens the bottle, so there would be nothing left to sell

<!-- Speaker note: When measuring destroys the item, a sample is the only sensible choice. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: complement

**Review: a spinner has equal parts red, blue, green and yellow. What is P(not red)?**

* Answer: 3/4

<!-- Speaker note: 1 − 1/4 = 3/4. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: plan the collection

Choose a question about your school or town, such as "How long do students spend on homework?" or "Does a reminder sign reduce littering?" Write the population, the technique you would use, and one reason it suits the question better than the others.

<!-- Speaker note: What this step is for: Choosing a technique for their own question and saying why shows they can weigh practicality and accuracy. Hints, in order: Name the population first. / Ask: can I measure everyone? Should I change something, or just watch? -->

<!-- Speaker note: Teacher: ask what you would give up by not measuring everyone. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A cereal company wants to check the weight of its boxes. Census or sample? Why?**

* A sample: weighing every box costs time; checking a random sample of boxes each hour is enough to spot problems.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This starts AC9M8ST01. Where it leads: bias in data collection (next), sampling methods, and investigations with samples. -->
