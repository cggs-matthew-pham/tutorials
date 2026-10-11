---
order: 20
unit: samples
node: [AC9M8ST04 n1, AC9M8ST04 n2]
uses: [AC9M8ST03 n2, AC9M8ST02 n2, AC9M7ST03 n2]
title: Investigating with samples
summary: "A sample investigation asks a question about a population, plans a fair and ethical sample, collects and describes the data, then makes an inference about the population and says how sure it can be."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You can't see the whole school's answer, only your sample's. How close is your estimate, and how would you say so honestly?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8338
  url: http://127.0.0.1:8338/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: school.yml#explain-pic, caption: "A random sample of 40 with the population hidden: the sample's centre is the estimate, and the population's value is unknown." }
explainClip:
  query: { code: "@school.yml#explain", fresh: 1, id: explain }
  caption: "Inferring from a sample"
  say: "Estimate the population from the sample, then say how sure you are."
  clip:
    - caption: { text: "The population is hidden. Take a random sample of 40.", say: "We can't see the whole school. Take a random sample of forty." }
    - click: Take a sample
    - wait: 1400
    - caption: { text: "Infer: the school's mean is about the sample's mean. Then check.", say: "Our estimate is the sample's mean. Now check it." }
    - click: Show the population
    - expect: { selector: "#gsum", contains: "population" }
    - wait: 1600
---
In real investigations you only see your sample. An **inference** is a conclusion about the population drawn from a sample.

## Predict: what can you say?

```step
stage: predict
insight: "Committing to what a sample's mean says about the school shows whether they think in estimates."
check:
  type: predict
  q: "A random sample of 40 students has a mean sleep of 8.8 hours. What can you say about all the students at the school?"
  options: ["Their mean is about 8.8 hours, give or take a little", "Their mean is exactly 8.8 hours", "Nothing at all"]
  actual: "About 8.8 hours, give or take a little. A random sample of 40 gives a fair estimate, not the exact value."
```

## Run: infer, then check

```step
stage: run
insight: "Estimating from a sample with the population hidden, then revealing it, shows how close a fair sample's inference is."
try: { playground: board, starter: "school.yml#run", height: 720 }
check: { type: board, text: "The school's mean is hidden. Take a fair sample (not convenience), write your estimate of the school's mean sleep, then press Show the population. How close were you? Compare with your prediction.", when: "v = 1 and s >= 1 and k < 4", explain: "A fair sample of 20 or more is usually within a few tenths of an hour. A convenience sample would be pushed high." }
```

A good inference:

- is about the population the sample came from
- gives an estimate, not an exact value ("about")
- says how sure you can be, and why (the sample's size and how it was chosen)

## Investigate: fair, ethical, honest

```step
stage: investigate
insight: "Ethics protects the people in the sample; an inference stays inside the population sampled (Zara); uncertainty is stated, not hidden."
tasks:
  - check:
      type: question
      q: "Which is the most important ethical step in a survey about students' sleep?"
      options: ["Students agree to take part and their answers are kept anonymous", "Every student must answer", "Names are written on each form", "Teachers read the answers aloud"]
      answer: 0
      feedback: [null, "Taking part should be a choice.", "Names make answers traceable.", "That breaks privacy."]
      explain: "Ethical data collection asks permission, keeps answers private, and does no harm."
  - check:
      type: bug
      code: "working.txt#zara"
      text: "Zara reports her investigation. Click the line where her inference goes too far."
      answer: 3
      fault: logic
      misconception: infer-beyond-population
      explain: "Line 3: her sample came from one school, so she can infer about her school, not all Australian teenagers."
  - check:
      type: question
      q: "Which sentence states the uncertainty best?"
      options: ["From a random sample of 40, students at our school probably sleep about 8.8 hours; a bigger sample would give a closer estimate", "Students sleep exactly 8.8 hours", "We are certain students sleep 8.8 hours", "Students sleep 8.8 hours, which proves they are tired"]
      answer: 0
      feedback: [null, "A sample gives an estimate.", "A sample can't make you certain.", "The data doesn't show tiredness."]
      explain: "Name the sample, use 'about' or 'probably', and say how the estimate could improve."
```

### Ethics

Here is the routine for an inference.

```worked
\text{Random sample of } 50 \text{ Year 9s at our school} :: The sample and how it was chosen.
\text{Median screen time } 3 \text{ hours, range } 6 \text{ hours} :: What the sample shows.
\text{Year 9s at our school: about } 3 \text{ hours} :: Infer about the population sampled only.
\text{A sample of 50 can be a little off; more students would narrow it} :: State the uncertainty.
```

### Find the mistake

Read Zara's conclusion. Who was in her sample?

### Saying how sure

## Modify: plan and improve

```step
stage: modify
insight: "Ordering the stages, and seeing that a bigger sample tightens the estimate, prepares them to plan their own."
try: { playground: board, starter: "school.yml#bigger", height: 700 }
tasks:
  - check:
      type: parsons
      code: "steps.txt#plan"
      text: "Put the stages of the investigation in order."
      extra: ["Choose the 40 students who are easiest to find at lunch."]
      explain: "Question, fair and ethical sample, collect the same way, describe, then infer with uncertainty."
  - starter: "school.yml#bigger"
    hint: "Take a sample of 20 and one of 80 or more before you reveal the population."
    check: { type: board, text: "Estimate the proportion of students who play sport from a random sample of 80 or more, then show the population. Was it closer than a sample of 20 usually is?", when: "n >= 80 and s >= 1 and v = 1", explain: "Bigger samples usually land closer, so you can state a narrower range in your report." }
  - check:
      type: question
      q: "An investigation into bullying asks students to write their name on the survey. What is the problem?"
      options: ["It isn't anonymous: students may not answer honestly, and it could cause harm", "Names take too long to write", "It makes it a census", "There is no problem"]
      answer: 0
      feedback: [null, "Time isn't the main issue.", "Who answers decides census or sample, not names.", "Privacy matters on sensitive topics."]
      explain: "On sensitive topics, anonymity protects people and makes answers more honest."
  - check:
      type: question
      q: "Two students estimate the school's mean sleep: one from a random sample of 15, one from a random sample of 60. Whose estimate is more reliable?"
      options: ["The sample of 60: bigger samples vary less", "The sample of 15: smaller is more careful", "They are equally reliable", "Neither: samples can't estimate"]
      answer: 0
      feedback: [null, "Smaller samples vary more.", "Size changes reliability.", "Fair samples estimate well."]
      explain: "Both are fair, but the bigger sample's estimate is likely closer."
```

### Order the stages

### A bigger sample

### Anonymous answers

### Which is more reliable

## Practise: investigations

```step
stage: practise
insight: "Choosing populations, ethical methods and honest inferences, mixed; inferring beyond the sampled population is the planted slip; sampling variation is the review."
tasks:
  - check:
      type: question
      q: "A random sample of 30 Year 10 students at one school finds most want a later start time. What can be inferred?"
      options: ["Most Year 10s at that school probably want a later start", "Most students in Australia want a later start", "Every Year 10 at the school wants a later start", "Nothing"]
      answer: 0
      feedback: [null, "The sample came from one year at one school.", "A sample gives 'most', not 'every'.", "A random sample supports a careful inference."]
      explain: "Infer about the population sampled: Year 10 at that school."
  - check:
      type: question
      q: "Which question is fair to ask in an anonymous survey about exercise?"
      options: ["How many minutes did you exercise yesterday?", "Don't you think you should exercise more?", "Why are you so lazy?", "What is your name and weight?"]
      answer: 0
      feedback: [null, "That is a leading question.", "That is unkind and leading.", "That isn't anonymous, and weight is sensitive."]
      explain: "Neutral, specific and respectful questions give honest data."
  - check:
      type: question
      q: "How can an investigation make its inference more certain?"
      options: ["Use a bigger random sample", "Use a convenience sample", "Ask only friends", "Round the answer"]
      answer: 0
      feedback: [null, "That adds bias.", "That adds bias too.", "Rounding hides detail; it doesn't add certainty."]
      explain: "Bigger fair samples vary less, so the estimate is more certain."
  - check:
      type: question
      q: "Review: two random samples of 25 from the same school give means of 8.6 and 9.0 hours. What explains the difference?"
      options: ["Sampling variation", "One sample was biased", "The school changed", "A measuring mistake"]
      answer: 0
      feedback: [null, "Both were random.", "Same school, same time.", "Fair samples differ by chance."]
      explain: "Random samples hold different students, so their means differ a little."
```

### One school

### A fair question

### More certain

### Review: variation

## Make: plan your investigation

```step
stage: make
insight: "Planning a full sample investigation, with ethics and uncertainty, shows they can apply every part of the unit."
hint: ["Name the population first, then the sampling method and size.", "Include how you will ask permission and keep answers private, and how you will say how sure you are."]
check: { type: reflect, text: "I planned an investigation: a question about a population, a fair sampling method and size, how I will collect the data ethically, what I will display, and how I will state my inference and its uncertainty." }
```

Choose a question about your school (sleep, screen time, travel to school, lunch). Write the plan as five stages. If your teacher agrees, carry it out with a class sample and write the report.
