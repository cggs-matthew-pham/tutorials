---
order: 3
unit: statistics
node: AC9M7ST01 n3
title: Which measure?
summary: "Choose the measure that tells the truth about the data. An outlier drags the mean, so the median is better for data with extreme values; the mean uses every value when there are none; the mode suits the most common choice."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "One student gets 40 dollars a week; the rest get 5 to 8. 'The average is 12 dollars,' says the newspaper. Is that fair?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8181
  url: http://127.0.0.1:8181/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: data.yml#explain, caption: "One outlier (40) pulls the mean (▲) up to 12, past every other value; the median (dashed) stays at 6.5, among the typical values." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "An outlier drags the mean"
  say: "An outlier drags the mean, but hardly moves the median."
  clip:
    - caption: { text: "Five students get 5 to 8 dollars; one gets 40, an outlier.", say: "Five students get five to eight dollars. One gets forty." }
    - wait: 900
    - caption: { text: "The mean is 12: more than five of the six get. The median is 6.5.", say: "The mean is twelve, more than most get. The median is six and a half." }
    - wait: 900
    - caption: { text: "With an outlier, the median describes a typical value better.", say: "With an outlier, the median is the better description." }
    - wait: 1400
---
Mean, median and mode all describe a "typical" value, but they can disagree. Which is most useful depends on the data and the question:

- An **outlier** (a value far from the rest) pulls the **mean** towards it; the **median** hardly moves.
- With no outliers, the **mean** uses every value, so it is often the best summary.
- The **mode** answers "which is most common?": the size a shop should stock most.

## Predict: a fair average

```step
stage: predict
insight: "Committing to the best description of pocket money with one extreme value shows whether they default to the mean."
check:
  type: predict
  q: "Weekly pocket money (\\$): $5, 6, 6, 7, 8, 40$. Which best describes what a typical student gets?"
  options:
    - "The median, 6.5 dollars"
    - "The mean, 12 dollars"
    - "The range, 35 dollars"
  actual: "The median, 6.5 dollars. The mean is 12 dollars, but five of the six students get less than that: the one 40 drags it up."
```

How many students get more than the mean?

## Run: remove the outlier

```step
stage: run
insight: "Removing the outlier and watching the mean fall from 12 to 6.4 while the median goes from 6.5 to 6 shows which measure the outlier controls."
try: { playground: board, starter: "data.yml#run", height: 560 }
check: { type: board, text: "Click the dot at 40 to remove it. How much does the mean change? The median? Was your prediction right?", when: "h < 40 and n = 5" }
```

Then put a very large value back (type it in). Which measure jumps?

## Investigate: choosing a measure

```step
stage: investigate
insight: "Look for outliers first: with one, prefer the median; without, the mean; for the most common choice, the mode. Sam's mistake trusts the mean whatever the data."
tasks:
  - check:
      type: question
      q: "Five house prices (\\$ thousands): $600, 620, 640, 650, 3200$. Which measure best describes a typical house?"
      options: ["The median, 640", "The mean, 1142", "The mode"]
      answer: 0
      feedback: [null, "The mean is more than four of the five prices: the 3200 drags it up.", "No price appears twice: there is no mode."]
      explain: "One mansion is an outlier. The median, 640, is a typical price; the mean, 1142, describes no house in the street."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam describes the street's house prices. Click the line where his reasoning goes wrong."
      answer: 2
      fault: logic
      misconception: mean-always-best
      explain: "Line 2: using every value is the mean's weakness here: one outlier (3200) pulls it above four of the five prices. With an outlier, the median (640) is the better description."
  - check:
      type: question
      q: "A shoe shop records the sizes it sells: $7, 8, 8, 8, 9, 9, 10, 11$. Which measure tells it which size to stock most of?"
      options: ["The mode, 8", "The mean, 8.75", "The median, 8.5"]
      answer: 0
      feedback: [null, "There is no shoe size 8.75.", "Size 8.5 sold none at all."]
      explain: "The mode, 8, is the size most people bought: the shop's real question."
```

### Look for outliers first

Here is how to choose.

```worked
5, 6, 6, 7, 8, 40 :: Look first: 40 is far from the rest, an outlier.
\text{mean} = \tfrac{72}{6} = 12 :: The mean uses every value, so the outlier pulls it up: above 5 of the 6.
\text{median} = \tfrac{6 + 7}{2} = 6.5 :: The median only uses the order: a typical value.
\text{no outlier: } 5, 6, 6, 7, 8 :: Mean 6.4 and median 6 now agree: the mean is a fair summary.
\text{most common?} \to \text{mode} :: For "which is most popular?", use the mode.
```

Now choose a measure for the house prices.

### Find the mistake

Read Sam's reasoning. When is using every value a weakness?

### The most common

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: make the mean and median agree on the board, scores with no outlier, adding a value equal to the mean, then the edge case of a mode that tells nothing."
try: { playground: board, starter: "data.yml#equal", height: 560 }
tasks:
  - starter: "data.yml#equal"
    hint: ["16 is the outlier. Remove it and add a value nearer the rest.", "Try making the data symmetric around the middle."]
    check: { type: board, text: "Change the data (keep 5 values) so that the mean and the median are equal.", when: "n = 5 and m = d", explain: "For example 2, 3, 4, 5, 6: mean 4 and median 4. Without the outlier the two measures agree." }
  - check:
      type: question
      q: "Test scores out of 20: $14, 15, 15, 16, 17, 18$. No outliers. Which measure is a good summary?"
      options: ["The mean, 15.83: it uses every score and nothing drags it", "Only the mode", "The range"]
      answer: 0
      feedback: [null, "The mode (15) is fine too, but the mean uses all the scores.", "The range describes spread, not a typical score."]
      explain: "With no outliers, the mean is a fair summary that uses every value."
  - check:
      type: question
      q: "The mean of $4, 6, 8$ is 6. You add another value of 6. What happens to the mean?"
      options: ["It stays 6", "It goes up", "It goes down"]
      answer: 0
      feedback: [null, "A value equal to the mean keeps the balance: 24 ÷ 4 = 6.", "A value equal to the mean keeps the balance: 24 ÷ 4 = 6."]
      explain: "24 ÷ 4 = 6: a value equal to the mean does not change it."
  - check:
      type: question
      q: "Edge case: the heights (cm) $148, 151, 153, 156, 160$ have no repeated value. How useful is the mode?"
      options: ["Not useful: there is no mode, so use the mean or median", "Very useful: it is 148"]
      answer: 0
      feedback: [null, "148 appears once, like every height."]
      explain: "Continuous measurements rarely repeat, so the mode often tells nothing."
```

### Make them agree

Each task changes one thing.

### No outliers

### Add the mean

### A useless mode

## Practise: choose and justify

```step
stage: practise
insight: "Choosing a measure for new contexts and calculating the effect of an outlier, mixed; the review keeps calculating the median fresh."
tasks:
  - check:
      type: question
      q: "Times (s) to run 100 m: $13.2, 13.5, 13.8, 14.0, 22.4$ (one runner fell). Which describes a typical time best?"
      options: ["The median, 13.8 s", "The mean, 15.38 s"]
      answer: 0
      feedback: [null, "The fall (22.4 s) drags the mean above every other time."]
      explain: "The outlier pulls the mean up; the median 13.8 s is typical."
  - check:
      type: answer
      q: "Find the mean of $2, 3, 3, 4, 28$, then the mean without the $28$. How much does the $28$ add to the mean? (Type the difference.)"
      answer: "5"
      feedback:
        - ["28", "Work out both means: 40 ÷ 5 and 12 ÷ 4."]
      explain: "With it: 40 ÷ 5 = 8. Without: 12 ÷ 4 = 3. The outlier adds 5."
  - check:
      type: question
      q: "A café wants to know its most popular cake. Which measure?"
      options: ["The mode", "The mean", "The median"]
      answer: 0
      feedback: [null, "You cannot average cake flavours.", "You cannot put flavours in numerical order."]
      explain: "The most popular choice is the mode."
  - check:
      type: answer
      q: "Review: find the median of $9, 4, 11, 6$."
      answer: "7.5"
      feedback:
        - ["11", "Sort first: 4, 6, 9, 11."]
        - ["15", "Halfway between 6 and 9."]
      explain: "Sorted: 4, 6, 9, 11. Halfway between 6 and 9: 7.5."
```

### Outlier

### How much it adds

### Most popular

### Review: median

## Make: a misleading mean

```step
stage: make
insight: "Building data where the mean is well above the median shows what an outlier (or a long tail) does, from the other side."
try: { playground: board, starter: "data.yml#make", height: 560 }
hint: ["Put four values close together.", "Make the fifth much bigger."]
check: { type: board, text: "Make 5 values where the mean is at least 3 more than the median.", when: "n = 5 and m - d >= 3", explain: "For example 4, 5, 5, 6, 25: median 5, mean 9. One large value pulls the mean up." }
```

Then write a sentence someone could use to mislead with your mean.
