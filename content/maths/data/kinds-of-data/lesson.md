---
order: 1
unit: statistics
node: AC9M7ST01 n1
title: Counting and measuring
summary: "Numerical data is discrete when it is counted (siblings: 0, 1, 2, …) and continuous when it is measured (a 100 m time can be any value, such as 14.37 s). Measured values are always rounded to some precision."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "How many siblings do you have? How long does it take you to run 100 m? One answer is always a whole number; the other could be anything in between."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8179
  url: http://127.0.0.1:8179/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: data.yml#count-pic, caption: "Number of siblings: counted, so only whole numbers (discrete). Nobody has 1.5 siblings." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "Counted or measured?"
  say: "Is the data counted, or measured?"
  clip:
    - caption: { text: "Times to run 100 m: measured, so they can fall anywhere: continuous.", say: "Times are measured. They can be any value: continuous data." }
    - wait: 1200
    - caption: { text: "Number of siblings: counted, so only 0, 1, 2, …: discrete.", say: "Siblings are counted. Only whole numbers: discrete data." }
    - wait: 1200
    - caption: { text: "A measurement is rounded: 14.6 s could be anything from 14.55 to 14.65 s.", say: "A measurement is always rounded to some precision." }
    - wait: 1400
---
Statistics starts with **data**: values collected to answer a question. Numerical data comes in two kinds:

- **Discrete** data is **counted**: number of siblings, goals scored, cars in a car park. It takes separate values, usually whole numbers.
- **Continuous** data is **measured**: height, time, mass, temperature. It can take any value in a range; we round it when we record it.

The kind of data changes how you collect it, and how you display it later in this unit.

## Predict: which can be 152.5?

```step
stage: predict
insight: "Committing to which variable can take the value 152.5 shows whether they think in terms of counting versus measuring."
check:
  type: predict
  q: "Which of these could have the value $152.5$?"
  options:
    - "A person's height in cm"
    - "The number of students in a school"
    - "The number of goals in a season"
    - "The number of pages in a book"
  actual: "A height in cm. Heights are measured, so they can be any value (152.5 cm, or 152.47 cm with a better ruler). The others are counted: whole numbers only."
```

Ask of each one: is it counted, or measured?

## Run: add a time

```step
stage: run
insight: "Placing a value between whole numbers on a measured scale shows that continuous data can fall anywhere, limited only by how precisely it is measured."
try: { playground: board, starter: "data.yml#run", height: 520 }
check: { type: board, text: "These are 100 m times in seconds. Add a time of $14.3$ s (click the line, or type it in the box). Was your prediction right about measuring?", when: "n = 8 and s = 116.6" }
```

Times can land between the marks. Could you add 14.35 s? What would you need to measure it?

## Investigate: counted or measured

```step
stage: investigate
insight: "Counted gives discrete data, measured gives continuous; and measured values are always rounded. Ava's mistake thinks any decimal means continuous."
tasks:
  - check:
      type: sort
      q: "Discrete or continuous?"
      options: ["Discrete (counted)", "Continuous (measured)"]
      items:
        - ["Number of pets", "Discrete (counted)"]
        - ["Mass of a backpack in kg", "Continuous (measured)"]
        - ["Goals scored in a match", "Discrete (counted)"]
        - ["Time to solve a puzzle", "Continuous (measured)"]
        - ["Daily rainfall in mm", "Continuous (measured)"]
        - ["Number of letters in a name", "Discrete (counted)"]
      explain: "Counting gives separate values (discrete); measuring gives any value in a range (continuous)."
  - check:
      type: bug
      code: "working.txt#ava"
      text: "Ava decides what kind of data shoe size is. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: discrete-decimal
      explain: "Line 3: shoe sizes come in fixed steps (7, 7.5, 8, …); there is no size 7.3. Data that can only take separate values is discrete, even with halves in it. A foot length in cm would be continuous."
  - check:
      type: question
      q: "A height is recorded as $152$ cm, to the nearest centimetre. What could the real height be?"
      options: ["Anything from 151.5 cm up to (but not including) 152.5 cm", "Exactly 152 cm", "Anything from 152 cm to 153 cm"]
      answer: 0
      feedback: [null, "A measurement is never exact: it is rounded.", "Rounding to the nearest cm goes half a centimetre either way."]
      explain: "Measured values are rounded: 152 cm to the nearest cm means from 151.5 cm up to 152.5 cm."
```

### Counted or measured

Here is how to tell the kinds apart.

```worked
\text{siblings: } 0, 1, 2, 3 :: Counted: separate values, no values in between. **Discrete.**
\text{height: } 152.5\text{ cm} :: Measured: any value in a range. **Continuous.**
152.5 \approx 152.47\ldots :: A measurement is rounded to the precision of the instrument (here 0.1 cm).
\text{shoe size: } 7, 7.5, 8 :: Fixed steps with nothing in between: discrete, even with halves.
```

Sort each one: discrete or continuous?

### Find the mistake

Read Ava's reasoning. Can a shoe size be 7.3?

### Rounded measurements

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: the same topic counted or measured, money, a rating scale, then the edge case of age, which is measured but usually recorded as a count of years."
tasks:
  - check:
      type: question
      q: "Same topic, two variables: the number of apples in a bag, and the mass of the bag. Which is which?"
      options: ["Apples: discrete. Mass: continuous.", "Both discrete", "Both continuous"]
      answer: 0
      feedback: [null, "Mass is measured: it can be any value.", "Apples are counted."]
      explain: "Count the apples (discrete); weigh the bag (continuous)."
  - check:
      type: question
      q: "Prices in dollars and cents, such as $\\$3.95$. Discrete or continuous?"
      options: ["Discrete: prices go in steps of 1 cent", "Continuous: they have decimals"]
      answer: 0
      feedback: [null, "There is no price between $3.95 and $3.96: the steps are fixed."]
      explain: "Money is counted in cents, so it is discrete (though with so many possible values it is often treated like continuous data)."
  - check:
      type: question
      q: "A survey asks students to rate a movie from 1 to 5 stars (whole stars). Discrete or continuous?"
      options: ["Discrete", "Continuous"]
      answer: 0
      feedback: [null, "Only 1, 2, 3, 4 or 5 is possible."]
      explain: "Only five separate values: discrete."
  - check:
      type: question
      q: "Edge case: age. You are 12 years old, but you are not exactly 12. What kind of data is age?"
      options: ["Continuous (time is measured), though we often record it as whole years", "Discrete, because we say whole numbers"]
      answer: 0
      feedback: [null, "Age keeps growing between birthdays: it is measured time, rounded down to whole years."]
      explain: "Age is a length of time, so continuous; recording it in whole years rounds it, which is why it looks discrete."
```

### Same topic, two variables

Each task changes one thing.

### Money

### Ratings

### Age

## Practise: kinds of data

```step
stage: practise
insight: "Classifying variables from contexts, choosing a precision, and spotting rounding, mixed; the review keeps decimals fresh."
tasks:
  - check:
      type: question
      q: "Which is continuous data?"
      options: ["The temperature at noon each day", "The number of rainy days in a month", "The number of people on a bus"]
      answer: 0
      feedback: [null, "Days are counted.", "People are counted."]
      explain: "Temperature is measured."
  - check:
      type: question
      q: "Which is discrete data?"
      options: ["The number of text messages sent in a day", "The length of a phone call", "The mass of a phone"]
      answer: 0
      feedback: [null, "Length of time is measured.", "Mass is measured."]
      explain: "Messages are counted."
  - check:
      type: question
      q: "To compare 100 m times in a race, which precision makes most sense?"
      options: ["To the nearest 0.01 s", "To the nearest minute", "To the nearest 10 s"]
      answer: 0
      feedback: [null, "Every runner would have the same time: 0 minutes.", "Most runners would round to the same value."]
      explain: "Runners are often a fraction of a second apart, so record hundredths of a second."
  - check:
      type: answer
      q: "Review: which is bigger, $14.3$ or $14.25$? Type the bigger one."
      answer: "14.3"
      feedback:
        - ["14.25", "Compare place by place: 14.30 and 14.25."]
      explain: "14.30 > 14.25: compare the tenths first."
```

### Continuous

### Discrete

### Precision

### Review: decimals

## Make: your own measured data

```step
stage: make
insight: "Building a data set whose values all lie between two whole numbers shows that continuous data needs decimals, and that more precision separates values that rounding would merge."
try: { playground: board, starter: "data.yml#make", height: 520 }
hint: ["Every value must be more than 13 and less than 14.", "Type them in the box, such as 13.2, 13.5, …"]
check: { type: board, text: "Make a data set of 6 swim times, all between 13 s and 14 s.", when: "n = 6 and l > 13 and h < 14", explain: "Values such as 13.1, 13.3, 13.4, 13.6, 13.8, 13.9: measured data needs decimals to tell them apart. Rounded to whole seconds, they would all be 13 or 14." }
```

Then: if you rounded your times to the nearest second, how many different values would be left?
