---
order: 7
unit: chance
node: [AC9M7P01 n3, AC9M7P02 n1]
title: Predict and test
summary: "The expected number of times an outcome happens is its probability × the number of trials: 60 rolls should give about 10 sixes. Run the experiment and record the counts: the results come close, but rarely exactly."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Roll a dice 60 times. Exactly ten sixes? Probably not. But how far off is normal, and when should you suspect the dice?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8185
  url: http://127.0.0.1:8185/index.html
  readySelector: ".ctally"
  layout: full
explainPicture: { ref: chance.yml#pic, caption: "60 rolls: about 10 sixes expected (60 × 1/6). The actual count is near 10, but not exactly 10." }
explainClip:
  query: { code: "@chance.yml#explain", fresh: 1, id: explain }
  caption: "Expected count, then the real count"
  say: "Predict the count, then run the experiment."
  clip:
    - caption: { text: "P(6) = 1/6, so in 60 rolls expect 60 × 1/6 = 10 sixes.", say: "A six has probability one sixth, so expect ten in sixty rolls." }
    - wait: 600
    - caption: { text: "Run 60 rolls, 10 at a time, and watch the count of sixes.", say: "Now roll sixty times, ten at a time." }
    - click: Run 10
    - click: Run 10
    - click: Run 10
    - click: Run 10
    - click: Run 10
    - click: Run 10
    - wait: 600
    - caption: { text: "Close to 10, but rarely exactly: chance varies.", say: "Close to ten, but rarely exactly. Chance varies." }
    - wait: 1400
---
A probability lets you **predict** what should happen over many trials:

$$\text{expected count} = \text{probability} \times \text{number of trials}$$

So in 60 rolls of a fair dice you expect about $60 \times \tfrac{1}{6} = 10$ sixes. Then you **test** it: run the experiment, record the counts in a table, and compare. The **relative frequency** (count ÷ trials) is the experiment's estimate of the probability.

## Predict: how many sixes?

```step
stage: predict
insight: "Committing to the number of sixes in 60 rolls brings out the expected count, and whether they expect it to happen exactly."
check:
  type: predict
  q: "You roll a fair dice 60 times. About how many sixes do you expect?"
  options:
    - "About 10"
    - "Exactly 6"
    - "About 30"
    - "You can't say anything"
  actual: "About 10: 60 × 1/6 = 10. The real count will usually be near 10, but not always exactly 10."
```

What fraction of rolls should be a six?

## Run: roll 60 times

```step
stage: run
insight: "Running 60 rolls and comparing the count of sixes with 10 shows that the expected count is a good guide, not a promise."
try: { playground: board, starter: "chance.yml#run", height: 620 }
check: { type: board, text: "Roll 60 times (press Run 10 six times). How many sixes did you get? Was your prediction right?", when: "t >= 60" }
```

Compare with others: did anyone get exactly 10? What was the furthest from 10?

## Investigate: expected and observed

```step
stage: investigate
insight: "Expected count = probability × trials; the observed count varies around it, and the relative frequency is count ÷ trials. Noah's mistake treats a small difference in a short experiment as proof the dice is unfair."
tasks:
  - check:
      type: answer
      q: "You flip a fair coin 50 times. How many heads do you expect?"
      answer: "25"
      feedback:
        - ["50", "Only half the flips should be heads."]
        - ["0.5", "That is the probability. Multiply by 50 flips."]
      explain: "50 × 1/2 = 25."
  - check:
      type: bug
      code: "working.txt#noah"
      text: "Noah tests a dice. Click the line where his reasoning goes wrong."
      answer: 4
      fault: logic
      misconception: expect-exact
      explain: "Line 4: in 60 rolls the count of sixes often lands a few away from 10; 7 is common for a fair dice. The expected count is what happens on average, not every time. To test a dice, roll it many more times."
  - check:
      type: answer
      q: "In an experiment, a coin landed heads 13 times in 20 flips. What is the relative frequency of heads? (A decimal.)"
      answer: "0.65"
      form: decimal
      feedback:
        - ["13", "That is the count. Divide by the number of flips."]
        - ["13/20", "Right value: write it as a decimal."]
      explain: "13 ÷ 20 = 0.65, more than the probability 0.5: chance varies in 20 flips."
```

### Expected, then observed

Here is how to predict and test.

```worked
P(6) = \tfrac{1}{6} :: The probability from the sample space.
60 \times \tfrac{1}{6} = 10 :: Expected count: probability × trials.
\text{observed: } 7 \text{ sixes} :: Run the experiment and record the count.
\tfrac{7}{60} \approx 0.12 :: Relative frequency = count ÷ trials, the experiment's estimate.
0.12 \text{ against } 0.17 :: Close but not equal: a short experiment varies.
```

Now: how many heads in 50 flips?

### Find the mistake

Read Noah's reasoning. Is 7 instead of 10 surprising for a fair dice?

### Relative frequency

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a coin on the board, an unequal spinner, more trials, comparing two results, then the edge case of an expected count that is not a whole number."
try: { playground: board, starter: "chance.yml#coin", height: 620 }
tasks:
  - starter: "chance.yml#coin"
    hint: "Expected: 100 × 1/2 = 50 heads."
    check: { type: board, text: "Flip the coin 100 times. Compare the number of heads with the expected 50.", when: "t >= 100", explain: "Usually between about 40 and 60: close to 50, rarely exactly." }
  - check:
      type: answer
      q: "A spinner is $\\tfrac{3}{8}$ red. How many reds do you expect in 80 spins?"
      answer: "30"
      feedback:
        - ["3", "Multiply the probability by 80."]
        - ["24", "80 ÷ 8 = 10, then × 3."]
      explain: "80 × 3/8 = 30."
  - starter: "chance.yml#spinner"
    hint: "Red is 3 of 8 equal parts. Run 80 spins and look at the expected count column."
    check: { type: board, text: "Spin this spinner (3 red, 5 blue sectors) at least 80 times. Compare the reds with the expected count.", when: "t >= 80", explain: "Expected 30 reds in 80 spins; most runs land within about 8 of 30." }
  - check:
      type: question
      q: "Two students flip a coin 10 times each. Ana gets 7 heads; Ben gets 5. Is Ana's coin unfair?"
      options: ["Not necessarily: 10 flips is too few to tell", "Yes: 7 is not 5", "Yes: Ben's is the fair one"]
      answer: 0
      feedback: [null, "In 10 flips, 7 heads happens quite often with a fair coin.", "Both results are normal for 10 flips."]
      explain: "With 10 flips, results vary a lot. To judge a coin, flip it many more times."
  - check:
      type: question
      q: "Edge case: you roll a dice 50 times. What is the expected number of sixes?"
      options: ["About 8.3 (50 × 1/6): you can expect a value you can never actually get", "Exactly 8", "You can't expect anything because 50 is not a multiple of 6"]
      answer: 0
      feedback: [null, "8.3 is the expected count; real counts are whole, near it.", "The expected count does not have to be whole."]
      explain: "50 × 1/6 = 8.33…: an average over many experiments, not a count from one."
```

### Flip 100

Each task changes one thing.

### An unequal spinner

### Test the spinner

### Two results

### Not a whole number

## Practise: expected counts

```step
stage: practise
insight: "Expected counts and relative frequencies in new contexts, mixed; the expect-exactly slip planted again; the review keeps sample spaces fresh."
tasks:
  - check:
      type: answer
      q: "A bag has 2 red and 8 blue counters. You take one and put it back, 40 times. How many reds do you expect?"
      answer: "8"
      feedback:
        - ["2", "That is the number of red counters. Use P(red) = 2/10."]
        - ["32", "That is blue: 40 × 8/10."]
      explain: "P(red) = 2/10 = 1/5, and 40 × 1/5 = 8."
  - check:
      type: answer
      q: "A spinner landed on green 18 times in 60 spins. What is the relative frequency of green? (A decimal.)"
      answer: "0.3"
      form: decimal
      feedback:
        - ["18", "Divide by 60."]
      explain: "18 ÷ 60 = 0.3."
  - check:
      type: question
      q: "Which result would make you most suspicious of a coin?"
      options: ["900 heads in 1000 flips", "6 heads in 10 flips", "52 heads in 100 flips"]
      answer: 0
      feedback: [null, "6 of 10 is very common.", "52 of 100 is very close to 50."]
      explain: "Over 1000 flips you expect about 500; 900 is far too many for chance."
  - check:
      type: answer
      q: "Review: roll a fair dice. What is $P(\\text{a number less than } 3)$? Simplest form."
      answer: "1/3"
      form: simplest
      feedback:
        - ["2/6", "Right: simplify it."]
        - ["1/2", "Less than 3: only 1 and 2."]
      explain: "{1, 2}: 2/6 = 1/3."
```

### Expected count

### Relative frequency

### Suspicious

### Review: probability

## Make: plan an experiment

```step
stage: make
insight: "Choosing the number of trials for a target expected count reverses the lesson: trials = expected count ÷ probability."
check:
  type: answer
  q: "You want to expect 25 sixes from a fair dice. How many times should you roll it?"
  answer: "150"
  feedback:
    - ["25", "That is the count you want. Each roll gives a six only 1/6 of the time."]
    - ["31", "25 × 6 = 150."]
  explain: "Expected sixes = rolls × 1/6, so rolls = 25 × 6 = 150."
```

Then: how many spins of the 3-red, 5-blue spinner to expect 30 reds?
