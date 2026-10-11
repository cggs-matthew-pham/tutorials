---
order: 19
unit: samples
node: [AC9M8ST03 n1, AC9M8ST03 n2]
uses: [AC9M8ST02 n2, AC9M7P02 n2]
title: How samples vary
summary: "Random samples from the same population give different results. That is sampling variation, not a mistake. Bigger samples vary less, so their results are more reliable."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two polls of the same election, taken the same week, give 52% and 48% for the same party. Is one of them wrong?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8337
  url: http://127.0.0.1:8337/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: school.yml#explain-pic, caption: "20 random samples of 20 students: each gives a different proportion who play sport, scattered around the school's 0.57 (dashed)." }
explainClip:
  query: { code: "@school.yml#explain", fresh: 1, id: explain }
  caption: "Samples vary"
  say: "Every sample is different. Bigger samples vary less."
  clip:
    - caption: { text: "10 random samples of 10: the results are spread out.", say: "Ten samples of ten students: the results are spread out." }
    - click: Take 10 samples
    - wait: 1500
    - caption: { text: "10 samples of 100: much closer together, near the school's value.", say: "Samples of a hundred: much closer together." }
    - click: Make the sample bigger
    - click: Take 10 samples
    - expect: { selector: "#gnote", contains: "10 samples so far" }
    - wait: 1600
---
How much can you trust one sample? This lesson takes many samples from the same school and compares them.

## Predict: two samples

```step
stage: predict
insight: "Committing to whether two fair samples agree shows whether they expect variation."
check:
  type: predict
  q: "Two random samples of 20 students are taken from the same school. Will they give the same proportion who play sport?"
  options: ["Probably not: they'll be a bit different", "Yes, exactly the same", "They will be very different"]
  actual: "Probably not exactly. Each sample happens to hold different students, so the proportions differ a little, scattered around the school's value."
```

## Run: many samples

```step
stage: run
insight: "Taking many samples of one size and plotting their results shows the spread of sampling variation."
try: { playground: board, starter: "school.yml#run", height: 700 }
check: { type: board, text: "Take at least 10 samples of 20. How far apart are the lowest and highest results? Compare with your prediction.", when: "n = 20 and s >= 10", explain: "The results spread out, often from about 0.4 to 0.75, around the school's 0.57. Each sample is fair; they just hold different students." }
```

Each dot under the school is one sample's result. The orange dot is the latest.

Random samples from the same population almost always differ a little. This is **sampling variation**: each sample happens to contain different people, not a mistake.

## Investigate: variation is normal

```step
stage: investigate
insight: "Read the spread of sample results; differences between fair samples aren't mistakes (Mia and Jack); bigger samples vary less."
tasks:
  - check:
      type: number
      q: "Five samples of 20 gave these proportions who play sport: 0.45, 0.6, 0.55, 0.7, 0.5. What is the range of the results?"
      answer: 0.25
      tolerance: 0.001
      explain: "0.7 − 0.45 = 0.25."
  - check:
      type: bug
      code: "working.txt#mj"
      text: "Mia and Jack compare their samples. Click the line where the reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: sample-differ-wrong
      explain: "Line 3: random samples from the same school differ because they hold different students. Neither made a mistake: this is sampling variation."
  - check:
      type: question
      q: "Which samples will give results that vary the least?"
      options: ["Samples of 100", "Samples of 10", "Samples of 20", "They all vary the same"]
      answer: 0
      feedback: [null, "Small samples vary the most.", "Bigger samples vary less.", "Size changes how much they vary."]
      explain: "Bigger samples average over more people, so one unusual person changes the result less."
```

### Range of results

### Find the mistake

Read Mia and Jack's results. Could both samples be fair?

### Least variation

## Modify: change the size

```step
stage: modify
insight: "Growing the sample and repeating shows the spread of results shrinks, for proportions and for means."
try: { playground: board, starter: "school.yml#run", height: 700 }
tasks:
  - starter: "school.yml#run"
    hint: "Move n up to 100 or more, then take 10 samples."
    check: { type: board, text: "Make the samples 100 or bigger and take at least 10. How does the spread of results compare with samples of 20?", when: "n >= 100 and s >= 10", explain: "The results bunch much closer together, near the school's value." }
  - starter: "school.yml#sleep"
    hint: "Take 10 samples of 10, look at the spread, then make n 50 or more and do it again."
    check: { type: board, text: "Now the samples measure mean hours of sleep. Take at least 10 samples of 50 or more. Do means vary less with bigger samples too?", when: "n >= 50 and s >= 10", explain: "Yes: means of bigger samples bunch closer to the school's mean, just as proportions did." }
  - check:
      type: question
      q: "A weather service runs its forecast model 50 times with slightly different starting data. In 40 runs it rains. What chance of rain does this suggest?"
      options: ["An 80% chance of rain", "It will rain", "It won't rain", "A 40% chance of rain"]
      answer: 0
      feedback: [null, "Not certain: 10 runs had no rain.", "Most runs had rain.", "40 is the count, not the percentage."]
      explain: "40 of 50 runs is 0.8. Forecasters use many runs like this (with other information) to estimate a chance."
  - check:
      type: question
      q: "Why do political polls usually ask at least 1000 people?"
      options: ["Bigger samples vary less, so the result is more reliable", "1000 is a census", "Smaller polls are biased", "It is the law"]
      answer: 0
      feedback: [null, "A country has millions of voters.", "Small random samples aren't biased; they vary more.", "It is a choice about reliability."]
      explain: "With about 1000 people, poll results usually land within a few percent of the population's value."
```

### Bigger samples

Here is how to describe sampling variation.

```worked
\text{10 samples of } 20:\ 0.40 \text{ to } 0.75 :: The spread of results.
\text{10 samples of } 100:\ 0.52 \text{ to } 0.63 :: Bigger samples: a narrower spread.
\text{Both centred near } 0.57 :: Fair samples scatter around the population's value.
\text{Bigger sample} \Rightarrow \text{more reliable estimate} :: The pattern.
```

### Means vary too

### Weather forecasts

### Polls

## Practise: variation

```step
stage: practise
insight: "Reading variation and judging reliability, mixed; treating a difference between fair samples as an error is the planted slip; reporting is the review."
tasks:
  - check:
      type: question
      q: "Two classes each take a random sample of 10 students from the same school. One finds 0.3 own a dog; the other finds 0.6. What is the best explanation?"
      options: ["Sampling variation: samples of 10 vary a lot", "The first class made a mistake", "The second class made a mistake", "Dogs changed"]
      answer: 0
      feedback: [null, "Fair small samples can differ this much.", "Both could be fair.", "The population is the same."]
      explain: "Small samples vary a lot. Larger samples would agree more closely."
  - check:
      type: question
      q: "Ten samples of 25 give means from 8.4 to 9.2 hours. Ten samples of 100 are taken. What will most likely happen to the spread of their means?"
      options: ["It gets narrower", "It gets wider", "It stays the same", "It disappears completely"]
      answer: 0
      feedback: [null, "Bigger samples vary less, not more.", "Size changes the spread.", "Some variation remains unless it is a census."]
      explain: "Bigger samples give means closer together."
  - check:
      type: question
      q: "A census of the whole school is taken twice on the same day. How do the two results compare?"
      options: ["They are the same: a census has no sampling variation", "They vary like samples", "They are very different", "You can't take a census twice"]
      answer: 0
      feedback: [null, "A census measures everyone, so no one is left out by chance.", "Every student is measured both times.", "You can, though it is slow."]
      explain: "Sampling variation comes from who happens to be in a sample. A census includes everyone."
  - check:
      type: question
      q: "Review: which is the best claim from a random sample of 40 students where the median sleep was 9 hours?"
      options: ["Students at the school sleep about 9 hours a night", "Every student sleeps 9 hours", "The school's median is exactly 9 hours", "Students should sleep 9 hours"]
      answer: 0
      feedback: [null, "Values vary.", "A sample gives an estimate.", "That is advice, not a finding."]
      explain: "A sample gives an estimate: 'about'."
```

### Small samples

### Bigger samples

### A census

### Review: a claim

## Make: how big is big enough?

```step
stage: make
insight: "Finding a sample size whose results stay within a target band connects size to reliability."
try: { playground: board, starter: "school.yml#run", height: 700 }
hint: ["Try a size, take 10 samples, and read the spread in the panel.", "If the results are too spread out, make n bigger (that clears the results) and try again, or press Start again."]
check: { type: board, text: "Find a sample size where the results of 10 samples all lie within 0.15 of each other.", when: "s >= 10 and r <= 0.15", explain: "Around 100 or more students per sample usually does it. Bigger samples cost more, so choose one that is big enough, not the biggest." }
```

Write the smallest size that worked for you, and why you might not always choose a bigger one.
