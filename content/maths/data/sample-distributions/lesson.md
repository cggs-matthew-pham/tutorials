---
order: 18
unit: samples
node: AC9M8ST02 n2
uses: [AC9M8ST02 n1, AC9M7ST02 n2]
title: Describing a sample
summary: "Display a sample's data, then report its shape, centre and spread, and what it suggests about the population: an estimate, with the sampling method and size stated."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A news story says 'Teens sleep 8 hours a night.' Is that every teen, most teens, or a sample's average? A good report says which, and how the sample was chosen."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8336
  url: http://127.0.0.1:8336/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A random sample of 40 students' sleep: most between 8 and 10 hours, a few lower. The dashed line is the whole school's mean." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Reporting on a sample"
  say: "Shape, centre and spread, then what it suggests."
  clip:
    - caption: { text: "Take a random sample of 40 and plot their sleep.", say: "Take a random sample of forty and plot their sleep." }
    - click: Take a sample
    - expect: { selector: "#gnote", contains: "median" }
    - caption: { text: "Report the shape, the centre (mean, median) and the spread (range).", say: "Report its shape, its centre and its spread." }
    - wait: 1800
    - caption: { text: "Then: about this much for the school, from a random sample of 40.", say: "Then say what it suggests for the whole school." }
    - wait: 1400
---
A **report** on a sample describes its **distribution**, then says what it suggests about the population:

- **shape**: symmetric (balanced about the middle), skewed (a long tail to one side), any clusters, gaps or outliers
- **centre**: the mean and median
- **spread**: the range (highest − lowest)
- **what it suggests**: an estimate for the population, with how the sample was chosen and its size

Data you collect yourself is **primary** data; data someone else collected (the ABS, a website, a study) is **secondary** data.

## Predict: the shape

```step
stage: predict
insight: "Committing to the shape of 40 students' sleep shows whether they expect real data to cluster."
check:
  type: predict
  q: "You plot the hours of sleep of 40 students chosen at random. What will the dot plot look like?"
  options: ["Most dots in the middle, fewer towards the ends", "Dots spread evenly from lowest to highest", "Every dot at the same value"]
  actual: "Most in the middle, fewer at the ends: most students sleep a similar amount, and a few sleep much more or less."
```

## Run: a sample of 40

```step
stage: run
insight: "Taking a random sample and reading its dot plot and statistics gives the raw material for a report."
try: { playground: board, starter: "board.yml#run", height: 720 }
check: { type: board, text: "Take a random sample of 40. Describe its shape, and read its mean, median and range. Was its shape what you predicted?", when: "k = 1 and s >= 1", explain: "Most values sit between about 8 and 10 hours. The mean and median are close, so the shape is roughly symmetric." }
```

## Investigate: from data to report

```step
stage: investigate
insight: "Find the centre and spread of a sample; a sample's mean is an estimate, not the population's exact value (Leo); primary and secondary data both need their source."
tasks:
  - check:
      type: number
      q: "A sample of 7 students' sleep: 8.0, 9.5, 10.0, 7.5, 9.0, 8.5, 9.0 hours. What is the median, in hours?"
      answer: 9
      tolerance: 0
      feedback:
        - ["7.5", "That is the middle of the list as written. Put them in order first: 7.5, 8.0, 8.5, 9.0, 9.0, 9.5, 10.0."]
      explain: "In order, the 4th of 7 is 9.0 hours."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo reports on his sample. Click the line where his report goes wrong."
      answer: 2
      fault: logic
      misconception: sample-is-population
      explain: "Line 2: a sample's mean estimates the population's; it isn't exactly the same. He should write 'about 8.9 hours, from a random sample of 30'."
  - check:
      type: question
      q: "A student uses ABS figures on screen time from a national survey. What kind of data is this?"
      options: ["Secondary data: someone else collected it", "Primary data: she is using it", "A census", "An experiment"]
      answer: 0
      feedback: [null, "Primary data is collected by you.", "A survey of some people is a sample.", "Nothing was changed on purpose."]
      explain: "Secondary data is collected by others. Say where it came from and how it was collected."
```

### Median

Here is the routine for a report.

```worked
\text{Random sample of } 20 \text{ Year 8s: minutes reading per day} :: Say the sample: method and size.
\text{Shape: most } 10 \text{ to } 30,\ \text{one outlier at } 120 :: Describe the shape.
\text{Median } 20,\ \text{mean } 25,\ \text{range } 120 - 5 = 115 :: Centre and spread (the outlier pulls the mean up).
\text{Year 8s read about } 20 \text{ minutes a day} :: An estimate for the population, with its limits.
```

### Find the mistake

Read Leo's report. Did he measure all 200 students?

### Primary or secondary

## Modify: compare and report

```step
stage: modify
insight: "A stratified sample's plot, and two samples side by side, show how to compare centres and spreads in a report."
try: { playground: board, starter: "board.yml#two", height: 720 }
tasks:
  - starter: "board.yml#strat"
    check: { type: board, text: "Take a stratified sample of 40 (10 from each year). Describe its shape. Is its mean close to the school's mean?", when: "k = 3 and s >= 1", explain: "A stratified sample has each year's fair share, so its centre is usually close to the school's." }
  - starter: "board.yml#two"
    check:
      type: question
      q: "The plot shows a sample of 15 Year 7s (top) and 15 Year 10s (bottom). Which is true?"
      options: ["Year 7s sleep more: their median is about 1 hour higher", "Year 10s sleep more", "They sleep the same", "You can't compare samples"]
      answer: 0
      feedback: [null, "Look at where the middle of each plot sits.", "The middles are about an hour apart.", "Comparing centres and spreads is how samples are compared."]
      explain: "Year 7's median is 9.0 hours and Year 10's is 8.0 hours."
  - starter: "board.yml#two"
    check:
      type: number
      q: "What is the range of the Year 10 sample, in hours?"
      answer: 3
      tolerance: 0
      explain: "Highest 9.5, lowest 6.5: 9.5 − 6.5 = 3 hours."
  - check:
      type: question
      q: "Which sentence is the best report for the Year 10 sample?"
      options: ["In a random sample of 15 Year 10s, the median sleep was 8 hours (range 3 hours), so Year 10s at this school sleep about 8 hours", "All Year 10s sleep 8 hours", "Year 10s sleep badly", "The data shows 15 numbers"]
      answer: 0
      feedback: [null, "Not all: the values vary, and it is a sample.", "That is an opinion, not a summary.", "That describes nothing about the data."]
      explain: "A report gives the sample, the centre and spread, and an estimate for the population."
```

### Stratified sample

### Compare two samples

### Spread

### The best report

## Practise: describing samples

```step
stage: practise
insight: "Centre, spread, shape and claims about the population, mixed; treating a sample's mean as exact is the planted slip; sampling methods are the review."
tasks:
  - check:
      type: number
      q: "A sample's values are 4, 6, 6, 7, 9, 10, 14. What is the mean?"
      answer: 8
      tolerance: 0
      explain: "Total 56 ÷ 7 = 8."
  - check:
      type: question
      q: "A sample's dot plot has most values between 2 and 5, and a long tail of a few values up to 15. How would you describe its shape?"
      options: ["Skewed: a long tail to the high side", "Symmetric", "Evenly spread", "Two clusters"]
      answer: 0
      feedback: [null, "One side has a long tail, so it isn't balanced.", "Most values are bunched together.", "There is one main group."]
      explain: "A tail stretching to the high values is skewed to the right (positively skewed); the mean is pulled above the median."
  - check:
      type: question
      q: "From a random sample of 50 students, 30 walk to school. What is the best claim about the school?"
      options: ["About 60% of the school's students walk to school", "Exactly 60% walk", "30 students walk", "Nobody can say anything"]
      answer: 0
      feedback: [null, "A sample gives an estimate.", "That is only the sample.", "A random sample gives a reasonable estimate."]
      explain: "30/50 = 60% is an estimate for the school: 'about 60%'."
  - check:
      type: question
      q: "Review: a club has 60 members listed alphabetically. Which gives a systematic sample of 10?"
      options: ["Every 6th member from a random start", "The first 10 on the list", "10 chosen from a hat", "10 from each age group"]
      answer: 0
      feedback: [null, "That is convenience, and names near A may differ.", "That is simple random.", "That is stratified (or quota)."]
      explain: "60 ÷ 10 = 6: every 6th from a random start."
```

### Mean

### Shape

### A claim about the school

### Review: systematic

## Make: your report

```step
stage: make
insight: "Taking a fair sample and writing a full report shows they can analyse and report on a sample distribution."
try: { playground: board, starter: "board.yml#make", height: 720 }
hint: ["Choose a fair method and a size, then take one sample.", "Report: the sample, the shape, the centre, the spread, and an estimate for the school."]
check: { type: board, text: "Choose a fair method and a sample size, and take a sample. Then write your report.", when: "k < 4 and s >= 1", explain: "A fair method gives a sample you can report on. Check your estimate against the dashed line." }
```

Write a short report: the method and size, the shape, the mean, median and range, and what it suggests about how much the school's students sleep. Then compare your estimate with the dashed line.
