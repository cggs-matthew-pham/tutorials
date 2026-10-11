---
order: 5
unit: statistics
node: [AC9M7ST02 n2, AC9M7ST02 n3]
title: Comparing data sets
summary: "Describe a data set by its shape (symmetrical or skewed, with clusters, gaps or outliers), its centre and its spread. Compare two sets on centre and spread, with numbers and in context, not by one value."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two classes sit the same quiz. One has the top score; the other has nobody below 12. Which class did better? It depends on what you compare."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8183
  url: http://127.0.0.1:8183/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: data.yml#explain, caption: "Class B's median (16) is a little higher, but its range (16) is much wider than Class A's (6): A is more consistent." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "Compare centre and spread"
  say: "Compare two data sets on their centre and their spread."
  clip:
    - caption: { text: "Centre: the medians are 15 (A) and 16 (B). Close.", say: "Centre: the medians are fifteen and sixteen. Close." }
    - wait: 900
    - caption: { text: "Spread: the ranges are 6 (A) and 16 (B). A is much more consistent.", say: "Spread: the ranges are six and sixteen. Class A is much more consistent." }
    - wait: 900
    - caption: { text: "A good comparison names both, with numbers and in context.", say: "A good comparison names both, with numbers, in context." }
    - wait: 1400
---
To describe a data set, look at three things:

- **Shape**: is it **symmetrical** (balanced about the middle) or **skewed** (bunched at one end with a tail at the other)? Are there **clusters**, **gaps** or **outliers**?
- **Centre**: the median (or mean): a typical value.
- **Spread**: the range: how varied the values are.

To **compare** two data sets, compare their centres **and** their spreads, using the numbers and saying what they mean in context.

## Predict: more consistent

```step
stage: predict
insight: "Committing to which class is more consistent before the board shows the ranges separates centre from spread."
check:
  type: predict
  q: "Quiz scores. Class A: $12, 14, 15, 15, 16, 17, 18$. Class B: $6, 10, 13, 16, 19, 20, 22$. Which class's scores are more consistent?"
  options:
    - "Class A"
    - "Class B"
    - "They are the same"
  actual: "Class A. Its scores range from 12 to 18 (a range of 6); Class B's go from 6 to 22 (a range of 16). The centres are close: medians 15 and 16."
```

Look at how far apart each class's lowest and highest scores are.

## Run: change the centre

```step
stage: run
insight: "Changing one class's scores and watching both medians and ranges shows that centre and spread are separate: one can change without the other."
try: { playground: board, starter: "data.yml#run", height: 640 }
check: { type: board, text: "Change Class A's scores (click or type) so that Class A's median is higher than Class B's. Was your prediction right about consistency?", when: "d > D" }
```

Did the range change when the median moved? Can you raise the median without changing the range?

## Investigate: describe, then compare

```step
stage: investigate
insight: "Shape, centre and spread describe one set; comparing two needs both centre and spread, with numbers and context. Mia's mistake compares the single highest values."
tasks:
  - picture: { ref: data.yml#skewed, caption: "Number of books read this term by a class." }
    check:
      type: question
      q: "Which describes the shape of this data?"
      options: ["Skewed: most values are low, with a tail of a few high values", "Symmetrical about the middle", "Every value is equally common"]
      answer: 0
      feedback: [null, "Most dots are bunched at the low end, with a few far to the right.", "Count the dots: 2 is much more common than 9."]
      explain: "Most students read 1 to 3 books, a few read many: the data is skewed, with a tail to the right."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia compares the two classes. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: compare-single-value
      explain: "Line 3: one student's score does not describe a class. Compare centres (medians 15 and 16: close) and spreads (ranges 6 and 16: A is much more consistent)."
  - check:
      type: question
      q: "Which is the best comparison of Class A and Class B?"
      options: ["The classes have similar medians (15 and 16), but Class A's scores are much less spread (range 6 against 16), so A was more consistent.", "Class B is better because it has a 22.", "Class A is better because 15 + 14 is more than 6 + 10."]
      answer: 0
      feedback: [null, "One score is not the class.", "That compares a few values, not the whole data."]
      explain: "A good comparison names the centre and the spread of both, with numbers, and says what they mean."
```

### Shape, centre, spread

Here is how to describe and compare.

```worked
\text{Shape} :: Symmetrical, or skewed with a tail? Clusters, gaps, outliers?
\text{Centre: medians } 15 \text{ and } 16 :: Close: a typical score is about the same.
\text{Spread: ranges } 6 \text{ and } 16 :: Very different: Class B's scores vary much more.
\text{Compare both} :: "Similar centres, but A is more consistent (range 6, not 16)."
```

Now describe the shape of the books data.

### Find the mistake

Read Mia's reasoning. What does one score tell you about a class?

### A good comparison

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: same centre with a different spread on the board, a symmetrical shape, an outlier, a difference in medians, then the edge case of equal means hiding different spreads."
try: { playground: board, starter: "data.yml#same-median", height: 640 }
tasks:
  - starter: "data.yml#same-median"
    hint: ["Team A's median is the middle value, 10: keep it.", "Bring the lowest and highest values closer to 10."]
    check: { type: board, text: "Change Team A so its median stays 10 but its range is smaller than Team B's.", when: "d = 10 and r < R and n = 5", explain: "For example 8, 9, 10, 11, 12: median 10, range 4, less than B's 7." }
  - picture: { ref: data.yml#symmetric, caption: "Hours of sleep on a school night." }
    check:
      type: question
      q: "Describe the shape."
      options: ["Roughly symmetrical, centred about 6", "Skewed to the right", "Two separate clusters"]
      answer: 0
      feedback: [null, "The dots rise to a peak at 6 and fall away evenly on both sides.", "There is no gap: it is one group."]
      explain: "The data is balanced about 6 hours: symmetrical."
  - check:
      type: question
      q: "Times (s): $13, 14, 14, 15, 15, 16, 29$. Which value is an outlier?"
      options: ["29", "13", "There is none"]
      answer: 0
      feedback: [null, "13 is next to the others.", "29 is far from the rest."]
      explain: "29 is far from the cluster of 13 to 16."
  - check:
      type: answer
      q: "Class A's median is 15 and Class B's is 16. By how much is B's median higher?"
      answer: "1"
      feedback:
        - ["31", "Find the difference, not the total."]
      explain: "16 − 15 = 1: a small difference in typical scores."
  - check:
      type: question
      q: "Edge case: two sets have the same mean, 10: Set P is $9, 10, 11$ and Set Q is $0, 10, 20$. Are they alike?"
      options: ["No: same centre, but Q is much more spread (range 20 against 2)", "Yes: same mean, same data"]
      answer: 0
      feedback: [null, "Look at the spread: 2 against 20."]
      explain: "A centre alone hides the spread: always compare both."
```

### Same centre, smaller spread

Each task changes one thing.

### Symmetrical

### An outlier

### Difference in centre

### Same mean

## Practise: compare in context

```step
stage: practise
insight: "Describing shape and comparing centres and spreads in new contexts, mixed; the single-value slip planted again; the review keeps stem-and-leaf reading fresh."
tasks:
  - check:
      type: question
      q: "Two bakeries' delivery times (min). Bakery X: median 25, range 10. Bakery Y: median 22, range 30. Which statement is right?"
      options: ["Y is usually a bit faster, but X is more reliable", "X is faster and more reliable", "Y is slower and more reliable"]
      answer: 0
      feedback: [null, "X's median (25) is higher: slower on a typical day.", "Y's median (22) is lower: faster on a typical day."]
      explain: "Lower median: Y is faster typically. Smaller range: X is more reliable."
  - check:
      type: question
      q: "Which is NOT a fair comparison of two netball teams' goals?"
      options: ["Team 1 scored the single highest game, so Team 1 is better", "Team 1's median was 3 goals higher", "Team 2's goals varied less (smaller range)"]
      answer: 0
      feedback: [null, "That is fair: it compares centres.", "That is fair: it compares spreads."]
      explain: "One game does not describe a team."
  - check:
      type: question
      q: "Data bunched at the high end with a few low values. What shape is it?"
      options: ["Skewed, with a tail to the left", "Skewed, with a tail to the right", "Symmetrical"]
      answer: 0
      feedback: [null, "The tail is where the few values are: the low end, on the left.", "Most values are at one end."]
      explain: "The tail points towards the few low values: to the left."
  - check:
      type: answer
      q: "Review: a stem-and-leaf plot reads $2 \\mid 1\\ 4\\ 6$ and $3 \\mid 0\\ 5$. What is the median?"
      answer: "26"
      feedback:
        - ["6", "Read the whole value: 2 | 6 is 26."]
      explain: "Values 21, 24, 26, 30, 35: the 3rd is 26."
```

### Centre and spread

### A fair comparison

### Skewed

### Review: stem-and-leaf

## Make: a surprising comparison

```step
stage: make
insight: "Making one set have the higher median but the lower mean shows that the measures can disagree, so a comparison should say which it uses."
try: { playground: board, starter: "data.yml#make", height: 640 }
hint: ["Set B's median is 15 and its mean 15.6.", "Give Set A a middle value above 15, but some very low values to drag its mean down."]
check: { type: board, text: "Change Set A (5 values) so it has a higher median than Set B but a lower mean.", when: "n = 5 and d > D and m < M", explain: "For example 1, 2, 16, 17, 18: median 16 (more than 15), mean 10.8 (less than 15.6)." }
```

Write two headlines about your sets: one where A wins, one where B wins.
