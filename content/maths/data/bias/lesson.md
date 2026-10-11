---
order: 16
unit: samples
node: AC9M8ST01 n2
uses: [AC9M8ST01 n1]
title: Bias in collecting data
summary: "Bias is anything in the way data is collected that pushes the result one way. It can come from who is asked, how they are asked, or how things are measured, and a bigger sample does not fix it."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A survey at a footy match finds that 90% of people love football. Is that what the whole town thinks?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8334
  url: http://127.0.0.1:8334/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: school.yml#explain-pic, caption: "A convenience sample: the 20 students nearest the door, all from Year 7. Year 7s play more sport, so the sample overstates the school's proportion." }
explainClip:
  query: { code: "@school.yml#explain", fresh: 1, id: explain }
  caption: "A biased sample"
  say: "Who you ask can push the result one way."
  clip:
    - caption: { text: "Ask the 20 nearest the door: all Year 7.", say: "Ask the twenty students nearest the door." }
    - click: Use convenience sampling
    - click: Take a sample
    - wait: 1400
    - caption: { text: "Year 7s play more sport, so the result is too high. That is bias.", say: "They are all Year Sevens, who play more sport. The result is too high." }
    - expect: { selector: "#gnote", contains: "Year 7 20" }
    - wait: 1600
---
**Bias** is anything in how data is collected that pushes the result away from the truth, always in the same direction. A biased result is not just a little off by chance: it is off for a reason.

## Predict: the library survey

```step
stage: predict
insight: "Committing to how a library survey answers 'do we need a bigger library?' shows whether they see who was asked."
check:
  type: predict
  q: "Students in the library at lunch are asked: 'Does the school need a bigger library?' How will the result compare with what the whole school thinks?"
  options: ["Too many yes answers", "About right", "Too few yes answers"]
  actual: "Too many yes answers, most likely. Students who choose the library at lunch are more likely to want a bigger one."
```

## Run: who you ask

```step
stage: run
insight: "A convenience sample from one corner of the school gives a result pushed one way; a random sample does not."
try: { playground: board, starter: "school.yml#run", height: 700 }
check: { type: board, text: "Take a convenience sample (the 20 nearest the door) and look where it lands. Then take a simple random sample of 20. Which is closer to the whole school? Was your prediction's reasoning the same?", when: "k = 1 and s >= 1", explain: "The convenience sample is all Year 7, who play more sport: its proportion is too high. A random sample gives every student the same chance." }
```

Filled dots play sport. The dashed line is the whole school's proportion.

## Investigate: kinds of bias

```step
stage: investigate
insight: "Bias comes from who is asked, how they are asked, or how things are measured; a big biased sample is still biased (the radio poll)."
tasks:
  - check:
      type: sort
      q: "Which kind of bias is each?"
      options: ["Who is asked (sampling bias)", "How they are asked (response bias)", "How it is measured (measurement bias)"]
      items:
        - ["Surveying football fans about the town's favourite sport", "Who is asked (sampling bias)"]
        - ["Asking 'Don't you agree litter is a disgrace?'", "How they are asked (response bias)", "A leading question pushes people to agree."]
        - ["Weighing parcels on scales that read 200 g too heavy", "How it is measured (measurement bias)"]
        - ["Asking students in front of their teacher how much homework they really do", "How they are asked (response bias)", "People give the answer they think is wanted."]
        - ["Only people who chose to reply to an online poll (they selected themselves)", "Who is asked (sampling bias)", "Self-selection: the people in the sample chose themselves, and they often feel strongly. Some books call it voluntary response bias."]
      explain: "Sampling bias: the sample isn't like the population. Response bias: the question or setting pushes answers. Measurement bias: the tool or method is off."
  - check:
      type: bug
      code: "working.txt#radio"
      text: "A radio station runs a poll. Click the line where the reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: big-sample-no-bias
      explain: "Line 3: the callers chose themselves, and people who want a change are more likely to call. 1200 biased answers are still biased: a bigger sample doesn't fix bias."
  - check:
      type: question
      q: "How could the library survey be made less biased?"
      options: ["Ask students chosen at random from the whole school roll", "Ask more students in the library", "Ask only Year 7s", "Ask the librarians"]
      answer: 0
      feedback: [null, "More of the same group repeats the bias.", "That is another narrow group.", "They may want a bigger library too."]
      explain: "Random choice from the whole population gives every student the same chance of being asked."
```

### Kinds of bias

Here is a routine for spotting bias.

```worked
\text{Survey: people leaving a gym, 'How often do you exercise?'} :: Read the plan.
\text{Who? People at a gym exercise more} :: Who was asked: sampling bias.
\text{How? People may say more than they do} :: How they were asked: response bias.
\text{Result: too high. Fix: random people, anonymous answers} :: Say which way it pushes, and a fix.
```

### Find the mistake

Read the radio station's poll. Who chose to be in the sample?

### A fairer library survey

## Modify: does a bigger sample help?

```step
stage: modify
insight: "Growing a convenience sample doesn't remove its bias, while leading questions and faulty tools bias any sample."
try: { playground: board, starter: "school.yml#bigger", height: 700 }
tasks:
  - starter: "school.yml#bigger"
    hint: "Make n bigger, then take a sample. Which year groups are in it?"
    check: { type: board, text: "Make the convenience sample 80 or bigger. Is it still too high?", when: "k = 4 and n >= 80 and s >= 1", explain: "Even 80 students from the front rows are mostly Years 7 and 8, who play more sport. More of a biased sample stays biased." }
  - check:
      type: question
      q: "A survey asks: 'Would you support a new skate park, which would keep teenagers busy and off the streets?' What is the problem?"
      options: ["It is a leading question: it gives reasons to say yes", "It is too short", "Nobody skates", "It should be a census"]
      answer: 0
      feedback: [null, "Length isn't the issue.", "Opinions about skate parks vary.", "Asking everyone the same leading question is still biased."]
      explain: "A fair question doesn't argue for one answer: 'Would you support a new skate park?'"
  - check:
      type: question
      q: "A class measures their heights with a tape whose first 2 cm has been cut off, so it reads 2 cm too much. What happens to the mean height?"
      options: ["Every height is 2 cm too high: measurement bias", "It is right on average", "It changes randomly", "Nothing: it is a census"]
      answer: 0
      feedback: [null, "Every measurement is off the same way.", "The error is the same each time, not random.", "Measuring everyone with a faulty tool is still biased."]
      explain: "A faulty tool shifts every value the same way, so the mean is wrong by the same amount."
  - check:
      type: question
      q: "Which reduces response bias in a survey about cheating on tests?"
      options: ["Answers are anonymous", "The principal collects the answers", "Students answer out loud in class", "Students write their names"]
      answer: 0
      feedback: [null, "Students may hide the truth from the principal.", "Others are listening.", "Named answers can be traced."]
      explain: "People answer more honestly when no one can tell which answer is theirs."
```

### Bigger convenience sample

### Leading question

### Faulty tape

### Honest answers

## Practise: spotting bias

```step
stage: practise
insight: "Naming the source and direction of bias in new plans, mixed; thinking a big sample cancels bias is the planted slip; techniques are the review."
tasks:
  - check:
      type: question
      q: "To find how much screen time teenagers have, a researcher surveys students at a gaming expo. The result is likely to be:"
      options: ["Too high", "About right", "Too low", "Exactly right, if enough are asked"]
      answer: 0
      feedback: [null, "Expo visitors are not typical.", "They probably game more than most.", "More expo visitors are still expo visitors."]
      explain: "People at a gaming expo probably have more screen time than teenagers in general: sampling bias."
  - check:
      type: question
      q: "An online poll gets 50 000 votes. Why might it still be biased?"
      options: ["Voters choose themselves, so people who care a lot are overrepresented", "50 000 is too few", "Online polls can't count", "It isn't biased: it is so big"]
      answer: 0
      feedback: [null, "Size isn't the problem.", "Counting works fine.", "Size doesn't remove bias."]
      explain: "Self-selected samples are biased however big they are."
  - check:
      type: question
      q: "Which is a fair sample of 30 from a school's 600 students?"
      options: ["30 students picked by a random number generator from the roll", "The first 30 students at the gate", "30 volunteers", "One Year 9 class of 30"]
      answer: 0
      feedback: [null, "Early arrivers may differ, such as bus students.", "Volunteers choose themselves.", "One class may differ from the rest."]
      explain: "Random choice from the whole roll gives every student the same chance."
  - check:
      type: question
      q: "Review: scientists give half the tomato plants a new plant food and compare their growth. What technique is this?"
      options: ["Experiment", "Census", "Observation", "Sample survey"]
      answer: 0
      feedback: [null, "Not every plant in the world is measured.", "Something is changed on purpose.", "Nobody is asked a question."]
      explain: "Changing something on purpose and comparing is an experiment."
```

### Screen time

### Online poll

### A fair sample

### Review: technique

## Make: fix a biased survey

```step
stage: make
insight: "Rewriting a biased plan to remove each kind of bias shows they can design fairly."
hint: ["Check who is asked, how they are asked, and how it is measured.", "Random choice, a neutral question and anonymous answers fix most problems."]
check: { type: reflect, text: "I named each source of bias in the survey below, said which way it pushes the result, and rewrote the plan to fix it." }
```

The canteen wants to know if students would buy a healthier lunch. It plans to ask the students in the canteen queue: "Wouldn't you love a fresh, delicious salad bar?" with their names on the form. Name every bias, say which way it pushes the result, and write a fairer plan.
