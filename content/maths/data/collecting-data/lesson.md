---
order: 15
unit: samples
node: AC9M8ST01 n1
uses: [AC9M7ST03 n1]
title: Census, sample, experiment or observation
summary: "Data can come from everyone (a census), from some (a sample), from an experiment where you change something on purpose, or from watching (an observation). Each has a cost, a time and an accuracy; choose the one that fits the question."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Every five years Australia asks every household the census questions. A TV ratings company measures viewing in only a few thousand homes. Why doesn't it just measure everyone?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8333
  url: http://127.0.0.1:8333/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: school.yml#explain-pic, caption: "The population: 200 students in four year groups. A census measures all of them; this random sample (orange rings) measures 20." }
explainClip:
  query: { code: "@school.yml#explain", fresh: 1, id: explain }
  caption: "Census or sample"
  say: "A census measures everyone. A sample measures some."
  clip:
    - caption: { text: "A census: measure all 200 students.", say: "A census measures all two hundred students." }
    - click: Use census sampling
    - click: Take a census
    - wait: 1200
    - caption: { text: "A sample: 20 chosen at random. Its mean is close, not exact.", say: "A random sample of twenty is close, but not exact." }
    - click: Use simple random sampling
    - click: Take a sample
    - expect: { selector: "#gsum", contains: "Simple random sample of 20" }
    - wait: 1600
---
The **population** is everyone (or everything) the question is about. There are four main ways to get data:

| Technique | What you do | Example |
|---|---|---|
| **census** | measure every member of the population | the national census of every household |
| **sample** | measure some of the population | a poll of 1000 voters |
| **experiment** | change something on purpose and measure what happens | half a class revises with music, half without |
| **observation** | watch and record without changing anything | counting cars past the school gate |

## Predict: a sample of 20

```step
stage: predict
insight: "Committing to how a sample's mean compares with the population's shows whether they expect samples to be exact."
check:
  type: predict
  q: "A school has 200 students. You ask 20 of them, chosen at random, how long they sleep. Will their mean equal the mean of all 200?"
  options: ["Exactly the same", "Close, but probably not exactly", "Nowhere near"]
  actual: "Close, but probably not exactly. A random sample gives an estimate; a census gives the exact value, at much more cost."
```

## Run: census and sample

```step
stage: run
insight: "Taking a census and then a sample on the same school shows a census is exact and a sample is quicker but close."
try: { playground: board, starter: "school.yml#run", height: 700 }
check: { type: board, text: "First, if you like, take a census (press Census, then Take a census). Then press Simple random and take a sample of 20. How close is it to the population's mean (the dashed line)? Compare with your prediction.", when: "k = 1 and s >= 1", explain: "The census gives the population's mean exactly. A random sample of 20 is usually within a few tenths of an hour." }
```

Each dot is a student; the orange rings are the ones measured. The dashed line on the plot is the population's value.

## Investigate: choosing a technique

```step
stage: investigate
insight: "A census isn't possible or sensible when measuring destroys, costs or takes too long (Noah); an experiment changes something, an observation doesn't."
tasks:
  - check:
      type: question
      q: "A newspaper wants to know what people in its city think of a new bridge. Why does it survey a sample of 800, not everyone?"
      options: ["Asking every person in the city would take too long and cost too much", "A sample is more accurate than a census", "Opinions can't be measured", "The law says so"]
      answer: 0
      feedback: [null, "A census would be exact; the sample is chosen for other reasons.", "Surveys measure opinions.", "It is a practical choice, not a rule."]
      explain: "When measuring everyone costs too much or takes too long, a fair sample is the sensible choice."
  - check:
      type: bug
      code: "working.txt#noah"
      text: "Noah plans how to collect data. Click the line where his plan goes wrong."
      answer: 2
      fault: logic
      misconception: census-always
      explain: "Line 2: testing every battery until it is flat leaves the factory nothing to sell. Test a sample instead."
  - check:
      type: question
      q: "Some students revise with music and some without, chosen at random, then all sit the same test. What technique is this?"
      options: ["An experiment: the researcher changes something on purpose", "An observation", "A census", "Not a way to collect data"]
      answer: 0
      feedback: [null, "An observation changes nothing; here the music is given or not.", "Not every student in a population is measured.", "It collects test scores."]
      explain: "The music is the thing changed on purpose; the scores show its effect."
```

### Why a sample

Here is the routine for choosing.

```worked
\text{Question: how much do Year 8s spend on lunch?} :: Name the population: Year 8 students.
\text{Census? } 180 \text{ students: possible, but slow} :: Can you measure everyone? At what cost?
\text{Sample of } 40 \text{ chosen at random} :: Quicker, cheaper, and close if chosen fairly.
\text{Not an experiment: nothing is changed} :: Measuring as things are: a survey of a sample.
```

### Find the mistake

Read Noah's plan. What does testing a battery do to it?

### Experiment

## Modify: matching the technique

```step
stage: modify
insight: "Matching situations to techniques, then seeing that a bigger sample gets closer, shows cost against accuracy."
try: { playground: board, starter: "school.yml#bigger", height: 700 }
tasks:
  - check:
      type: match
      q: "Match each situation to the best technique."
      pairs:
        - ["Every Australian household fills in a form", "census"]
        - ["A poll of 1000 voters before an election", "sample"]
        - ["Plants given different amounts of fertiliser to compare growth", "experiment"]
        - ["Counting how many birds visit a feeder each hour", "observation"]
      explain: "Census: everyone. Sample: some. Experiment: change something. Observation: watch without changing."
  - starter: "school.yml#bigger"
    check: { type: board, text: "Take random samples of 50 students. Are they usually closer to the population than samples of 20?", when: "n >= 50 and k = 1 and s >= 3", explain: "Bigger samples usually land closer to the population's value, at more cost." }
  - check:
      type: question
      q: "Why is Australia's census taken only every five years?"
      options: ["It costs a great deal and takes months to collect and process", "The population never changes", "Five is a lucky number", "A sample would be impossible"]
      answer: 0
      feedback: [null, "The population changes every day.", "It is a practical choice.", "Surveys of samples are run in between."]
      explain: "A census of millions of homes is expensive and slow. Smaller samples (such as the monthly Labour Force Survey) fill the gaps."
  - check:
      type: question
      q: "A council wants to know how many cars use a road each morning. Which technique fits best?"
      options: ["Observation: count the cars as they pass", "Experiment", "Ask a sample of drivers to guess", "A census of every driver in the state"]
      answer: 0
      feedback: [null, "Nothing needs to be changed.", "Guesses are less reliable than counts.", "Most drivers never use this road."]
      explain: "Watching and counting, without changing anything, is an observation."
```

### Match the technique

### Bigger samples

### The census

### Counting cars

## Practise: techniques

```step
stage: practise
insight: "Choosing and justifying techniques in new contexts, mixed; a census that destroys what it measures is the planted slip; probability is the review."
tasks:
  - check:
      type: question
      q: "A teacher wants the mean height of her class of 25. What is most sensible?"
      options: ["A census: measuring 25 students is quick", "A sample of 5", "An experiment", "An observation from across the room"]
      answer: 0
      feedback: [null, "With only 25, measuring everyone is easy and exact.", "Nothing needs changing.", "Heights need measuring, not guessing."]
      explain: "When the population is small and measuring is easy, a census gives the exact answer."
  - check:
      type: question
      q: "A company wants to know if a new toothpaste reduces cavities. What technique fits?"
      options: ["An experiment: some use the new toothpaste, some the old, chosen at random", "A census of everyone who brushes their teeth", "An observation of shop shelves", "Asking the company's staff"]
      answer: 0
      feedback: [null, "Far too many people, and nothing is compared.", "Shelves don't show cavities.", "Staff may want a certain answer."]
      explain: "To see the effect of a change, compare groups given different treatments."
  - check:
      type: question
      q: "A juice factory checks the sugar in its bottles. A manager says: 'Test every bottle, so we know for sure.' What is wrong with that plan?"
      options: ["Testing opens the bottle, so there would be nothing left to sell", "Nothing: a census is always best", "Sugar can't be measured", "The bottles are too small"]
      answer: 0
      feedback: [null, "Not when measuring destroys the product.", "Sugar is easy to measure.", "Size isn't the issue."]
      explain: "When measuring destroys the item, a sample is the only sensible choice."
  - check:
      type: answer
      q: "Review: a spinner has equal parts red, blue, green and yellow. What is P(not red)?"
      answer: "3/4"
      explain: "1 − 1/4 = 3/4."
```

### Small class

### Toothpaste

### Testing every bottle

### Review: complement

## Make: plan the collection

```step
stage: make
insight: "Choosing a technique for their own question and saying why shows they can weigh practicality and accuracy."
hint: ["Name the population first.", "Ask: can I measure everyone? Should I change something, or just watch?"]
check: { type: reflect, text: "I wrote a question, named its population, chose a census, sample, experiment or observation, and explained why it is practical and what it might cost in accuracy." }
```

Choose a question about your school or town, such as "How long do students spend on homework?" or "Does a reminder sign reduce littering?" Write the population, the technique you would use, and one reason it suits the question better than the others.
