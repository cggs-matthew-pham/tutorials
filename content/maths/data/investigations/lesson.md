---
order: 9
unit: statistics
node: [AC9M7ST03 n1, AC9M7ST03 n2]
title: Statistical investigations
summary: "An investigation asks a question that data can answer, plans who to measure and how, collects and displays the data, describes its shape, centre and spread, and reports an answer with its limits."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Do students your age sleep less on school nights? You could argue about it, or you could measure it. What would you need to decide first?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8302
  url: http://127.0.0.1:8302/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: data.yml#explain, caption: "Fifteen students' hours of sleep: the median is 8.5 hours and the range is 3.5 hours." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "From a question to a report"
  say: "A good investigation has a question, a plan, data and a report."
  clip:
    - caption: { text: "Ask a question data can answer.", say: "Ask a question that data can answer." }
    - wait: 900
    - caption: { text: "Plan: who to measure, and how.", say: "Plan who to measure, and how." }
    - wait: 900
    - caption: { text: "Display the data: a dot plot of 15 students.", say: "Display the data. Here, fifteen students." }
    - wait: 900
    - caption: { text: "Report the centre, the spread and the limits.", say: "Report the centre, the spread, and the limits." }
    - wait: 1400
---
A **statistical investigation** goes through these stages:

1. **Ask** a statistical question: one that data can answer, with a variable you can measure ("How many hours do Year 7 students sleep on school nights?").
2. **Plan**: decide the variable (**discrete** if counted, **continuous** if measured), the **sample** (who, and how many) and how to measure it. Look out for **bias**, where the sample or the measuring favours one answer.
3. **Collect** the data, **display** it (dot plot, stem-and-leaf plot), and **summarise** it: shape, centre and spread.
4. **Report** an answer to the question, with its limits (who was measured, how many, how).

## Predict: which is a statistical question?

```step
stage: predict
insight: "Committing to which question data can answer shows whether they can tell a measurable variable from an opinion."
check:
  type: predict
  q: "Which of these can be answered by measuring a number for each student?"
  options: ["How many hours do Year 7 students sleep on school nights?", "Is sleep important?", "Is sleep boring?", "Should school start later?"]
  actual: "The first. It names a variable you can measure (hours) and a group (Year 7). The others are opinions or decisions; data can inform them but cannot answer them."
```

Think: what would you measure, and from whom?

## Run: add your own data

```step
stage: run
insight: "Adding a value to a collected sample and watching the centre and spread update shows data feeding the summary."
try: { playground: board, starter: "data.yml#run", height: 560 }
check: { type: board, text: "The class measured 15 students. Add your own hours of sleep, so there are 16 values.", when: "n = 16", explain: "The dot plot, mean, median and range update with every new value." }
```

Click on the line to add a value.

## Investigate: planning and bias

```step
stage: investigate
insight: "A plan names the variable, its type and a fair sample; one small, friendly sample (Kai) cannot speak for a whole year group."
tasks:
  - check:
      type: question
      q: "Hours of sleep is measured on a clock. Is it discrete or continuous?"
      options: ["Continuous: any value in a range can occur", "Discrete: it is counted", "Neither"]
      answer: 0
      feedback: [null, "A count would be whole numbers, such as the number of siblings.", "Every numerical variable is one or the other."]
      explain: "Measured quantities such as time are continuous. Counted ones, such as the number of pets, are discrete."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai wants to know how long Year 7 students sleep. Click the line where he draws a conclusion he cannot support."
      answer: 3
      fault: logic
      misconception: sample-generalise
      explain: "Line 3: eight students from one squad are a small group and not a fair sample of Year 7. Swimmers may sleep more or less than others. The result describes his squad."
  - check:
      type: question
      q: "Which is the fairest way to choose 20 students from Year 7?"
      options: ["Pick 20 names at random from the class lists", "Ask the first 20 students at the canteen", "Ask your friends", "Ask those who put up their hands"]
      answer: 0
      feedback: [null, "Those who are at the canteen early may not be typical.", "Friends are alike in many ways.", "Volunteers may have strong views."]
      explain: "Random selection gives every student the same chance and avoids bias."
```

### Variable type

How is it measured?

### Find the mistake

Read Kai's working. Who did he ask?

### A fair sample

## Modify: compare and report

```step
stage: modify
insight: "Comparing school nights with weekends uses centre and spread together, needs sets of the same size to be fair, and handles an outlier by checking it first."
try: { playground: board, starter: "data.yml#compare", height: 560 }
tasks:
  - starter: "data.yml#compare"
    check:
      type: question
      q: "Which report is best supported by the data on the board?"
      options: ["Sleep is shorter on school nights (median 8 h, against 9.75 h), and weekends vary more (range 4.5 h, against 3.5 h)", "Everyone sleeps more at weekends", "School nights have the longer range", "The medians are the same"]
      answer: 0
      feedback: [null, "It describes the centres, not every student.", "The weekend range is 4.5 h, the school nights 3.5 h.", "They are 8 and 9.75."]
      explain: "A good report gives both medians and both ranges, in context, and does not claim more than the samples show."
  - starter: "data.yml#fair"
    hint: ["School nights has 7 values; the weekend has 10.", "Add three values to the school nights."]
    check: { type: board, text: "Make the comparison fairer by giving school nights as many values as the weekend (10).", when: "n = N", explain: "The range and spread depend on how many values there are, so sets of equal size compare more fairly." }
  - starter: "data.yml#compare"
    check:
      type: question
      q: "Look at the dot plot of school nights (6.5, 7, 7.5, 8, 8, 8, 8.5, 9, 9.5, 10). How would you describe its shape?"
      options: ["Roughly symmetrical, bunched around 8, with no outliers", "Skewed to the right with an outlier", "Two separate clusters", "Skewed to the left"]
      answer: 0
      feedback: [null, "No value is far from the others.", "There is no gap.", "The values taper off evenly on both sides."]
      explain: "The values are spread fairly evenly on both sides of 8, with no gaps or outliers: roughly symmetrical."
  - check:
      type: question
      q: "One student reports 2 hours of sleep on a school night, far below the rest. What should the investigator do first?"
      options: ["Check the value, then report the results with and without it", "Delete it without saying", "Include it and ignore it", "Change it to 6 hours"]
      answer: 0
      feedback: [null, "Removing data without a reason hides it.", "An outlier can change the mean.", "Never change collected data."]
      explain: "Check whether it is a mistake. If it is real, say so, and show the effect on the summary."
  - check:
      type: question
      q: "A claim says 'Year 7 students get 9 hours of sleep'. The sample's median is 8 hours. What can you say?"
      options: ["The sample is evidence against the claim, but only for the students measured", "The claim is false for all of Year 7", "The claim is true", "The sample shows nothing"]
      answer: 0
      feedback: [null, "A sample cannot prove it for everyone.", "The sample's median is lower.", "It gives evidence against the claim."]
      explain: "Report what the sample shows (evidence against) and what it cannot show (all of Year 7)."
```

### The best report

Name both the centre and the spread.

### Equal samples

### Shape

### An outlier

### Support or refute

## Practise: investigations

```step
stage: practise
insight: "Summaries, variable types and a median review, mixed; calling a small friendly sample the whole group is the planted slip; the median review keeps the centre fresh."
try: { playground: board, starter: "data.yml#run", height: 560 }
tasks:
  - check:
      type: answer
      q: "Hours of sleep: 7, 8, 9. What is the mean?"
      answer: "8"
      explain: "(7 + 8 + 9) ÷ 3 = 8 hours."
  - check:
      type: question
      q: "Which variable is discrete?"
      options: ["The number of siblings a student has", "The time to run 100 m", "A student's height", "The mass of a school bag"]
      answer: 0
      feedback: [null, "Time is measured.", "Height is measured.", "Mass is measured."]
      explain: "Counted quantities are discrete. The others are measured."
  - check:
      type: question
      q: "A survey asks only students who walk to school about how long they sleep. What is the problem?"
      options: ["The sample is biased: walkers may not be like everyone else", "The sample is too big", "Sleep cannot be measured", "Nothing"]
      answer: 0
      feedback: [null, "A big sample is not a problem.", "Time can be measured.", "The sample might favour one answer."]
      explain: "A sample must represent the group the question is about."
  - check:
      type: answer
      q: "Review: what is the median of 4, 7, 9, 12, 13?"
      answer: "9"
      explain: "The middle value of the five is 9."
```

### The mean

### Discrete

### A biased survey

### Review: median

## Make: your investigation

```step
stage: make
insight: "Building a data set to a target and writing the report in the four stages puts the whole cycle together."
try: { playground: board, starter: "data.yml#make", height: 560 }
hint: ["Click the line to add values, or type them in the box.", "A median of 8.5 needs values on both sides of it."]
check: { type: board, text: "Build a sample of 20 sleep values whose median is 8.5 hours.", when: "n = 20 and d = 8.5", explain: "Any 20 values work as long as the middle two average 8.5." }
```

Now write a report of four short parts: the question, the plan (variable, sample and how you would choose it), what the data show (shape, centre, spread), and the limits of your answer.
