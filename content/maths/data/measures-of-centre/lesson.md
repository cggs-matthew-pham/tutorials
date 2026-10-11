---
order: 2
unit: statistics
node: AC9M7ST01 n2
title: Mean, median, mode and range
summary: "Four numbers that sum up a data set: the mean (add, then share equally), the median (the middle value once sorted), the mode (the most common) and the range (highest minus lowest)."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A team scored 3, 5, 5, 6 and 11 goals. What is a typical game? There are at least three good answers, and they are all useful."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8180
  url: http://127.0.0.1:8180/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: data.yml#explain, caption: "3, 5, 5, 6, 11: mean 6 (▲), median 5 (dashed), mode 5, range 11 − 3 = 8 (arrow)." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "Four numbers that sum up the data"
  say: "Four numbers sum up a data set."
  clip:
    - caption: { text: "Mean: add them (30) and share between 5 games: 6.", say: "The mean: add them all, then share equally. Thirty shared by five is six." }
    - wait: 900
    - caption: { text: "Median: the middle value once sorted: 3, 5, [5], 6, 11.", say: "The median is the middle value, once they are in order: five." }
    - wait: 900
    - caption: { text: "Mode: the most common: 5. Range: 11 − 3 = 8.", say: "The mode is the most common, five. The range is eleven take three: eight." }
    - wait: 1400
---
A data set can have many values. To describe it in a few numbers, statisticians use **measures of centre** (what is typical) and of **spread** (how varied):

- the **mean**: add all the values, then divide by how many there are;
- the **median**: sort the values; it is the middle one (or halfway between the two middle ones);
- the **mode**: the value that appears most often;
- the **range**: highest minus lowest, a simple measure of spread.

## Predict: a typical game

```step
stage: predict
insight: "Committing to the mean of 3, 5, 5, 6, 11 before the board shows it brings out whether they share equally or pick a middle or common value."
check:
  type: predict
  q: "A team scored $3, 5, 5, 6$ and $11$ goals in five games. What is the mean?"
  options:
    - "$6$"
    - "$5$"
    - "$8$"
    - "$5.5$"
  actual: "6. The total is 3 + 5 + 5 + 6 + 11 = 30, shared equally between 5 games is 6. (5 is the median and the mode; 8 is the range.)"
```

The mean shares the total equally. What is the total?

## Run: move the mean

```step
stage: run
insight: "Adding a value and watching the mean, median and mode move shows how each responds: the mean feels every value, the median only the order."
try: { playground: board, starter: "data.yml#run", height: 560 }
check: { type: board, text: "Add one more game so that the mean becomes exactly 7. Was your prediction right about the first mean?", when: "n = 6 and m = 7" }
```

Watch the triangle (mean) and the dashed line (median) as you add values. Which moves more when you add a big score?

## Investigate: the four measures

```step
stage: investigate
insight: "Mean = total ÷ count; median = middle of the sorted list (average the two middle values for an even count); mode = most common; range = highest − lowest. Leo's mistake takes the middle of the unsorted list."
tasks:
  - check:
      type: answer
      q: "Find the median of $8, 3, 9, 4, 6, 7$."
      answer: "6.5"
      feedback:
        - ["4", "Sort first: 3, 4, 6, 7, 8, 9."]
        - ["6", "With 6 values there are two middle ones: 6 and 7. Halfway is 6.5."]
        - ["7", "With 6 values there are two middle ones: 6 and 7. Halfway is 6.5."]
      explain: "Sorted: 3, 4, 6, 7, 8, 9. The two middle values are 6 and 7, so the median is 6.5."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo finds a median. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: median-unsorted
      explain: "Line 3: sort first. 2, 4, 5, 7, 9: the 3rd value is 5, so the median is 5."
  - check:
      type: answer
      q: "Find the mean of $4, 8, 9, 3$."
      answer: "6"
      feedback:
        - ["24", "That is the total. Share it between 4 values."]
        - ["8.5", "That is not the mean: add all four, then share: 24 ÷ 4."]
      explain: "4 + 8 + 9 + 3 = 24, and 24 ÷ 4 = 6."
```

### Mean, median, mode, range

Here is each measure for the goals data.

```worked
3, 5, 5, 6, 11 :: The data, sorted (the median and range need it sorted).
\text{mean} = \tfrac{3 + 5 + 5 + 6 + 11}{5} = \tfrac{30}{5} = 6 :: Add, then divide by how many.
\text{median} = 5 :: The middle (3rd of 5) value of the sorted list.
\text{mode} = 5 :: The most common value (it appears twice).
\text{range} = 11 - 3 = 8 :: Highest minus lowest.
8, 3, 9, 4, 6, 7 \to 3, 4, 6, 7, 8, 9 :: An even count: sort, then the median is halfway between the two middle values, $\tfrac{6 + 7}{2} = 6.5$.
```

Now find the median of $8, 3, 9, 4, 6, 7$.

### Find the mistake

Read Leo's working. What must you do before finding the middle?

### The mean

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: two modes, no mode, a range with negatives, then the edge case of a value that leaves the median unchanged."
try: { playground: board, starter: "data.yml#median", height: 560 }
tasks:
  - check:
      type: question
      q: "What is the mode of $3, 4, 4, 6, 6, 9$?"
      options: ["4 and 6 (two modes)", "5", "There is no mode"]
      answer: 0
      feedback: [null, "5 is not in the data. The mode is a value that appears most often.", "4 and 6 both appear twice, more than any other."]
      explain: "4 and 6 each appear twice: the data has two modes."
  - check:
      type: question
      q: "What is the mode of $2, 5, 7, 9$?"
      options: ["There is no mode: every value appears once", "2", "9"]
      answer: 0
      feedback: [null, "2 appears only once, like the others.", "9 appears only once, like the others."]
      explain: "No value appears more than once, so there is no mode."
  - check:
      type: answer
      q: "Temperatures over four mornings were $-3, 2, 5, -1$ °C. Find the range."
      answer: "8"
      feedback:
        - ["2", "Highest minus lowest: 5 − (−3)."]
        - ["6", "The lowest is −3, not −1."]
      explain: "5 − (−3) = 8 degrees."
  - starter: "data.yml#median"
    hint: ["The median of 2, 4, 6, 8, 10 is 6.", "Which value could you add so 6 is still in the middle?"]
    check: { type: board, text: "Edge case: add one value so the median is still 6.", when: "n = 6 and d = 6", explain: "Adding 6 itself: 2, 4, 6, 6, 8, 10 has two middle values 6 and 6, so the median stays 6." }
```

### Two modes

Each task changes one thing.

### No mode

### Range with negatives

### Keep the median

## Practise: the four measures

```step
stage: practise
insight: "Each measure from a fresh data set, mixed; sorting before the median is planted again; the review keeps discrete and continuous fresh."
tasks:
  - check:
      type: answer
      q: "Find the mean of $12, 15, 9, 14$."
      answer: "12.5"
      feedback:
        - ["50", "That is the total. Divide by 4."]
      explain: "50 ÷ 4 = 12.5."
  - check:
      type: answer
      q: "Find the median of $21, 17, 30, 25, 19$."
      answer: "21"
      feedback:
        - ["30", "Sort first: 17, 19, 21, 25, 30."]
      explain: "Sorted: 17, 19, 21, 25, 30. The middle value is 21."
  - check:
      type: answer
      q: "Find the range of $4.5, 7.2, 3.9, 6.1$."
      answer: "3.3"
      feedback:
        - ["2.7", "Lowest is 3.9, not 4.5."]
      explain: "7.2 − 3.9 = 3.3."
  - check:
      type: question
      q: "Review: the number of pets in each house. Discrete or continuous?"
      options: ["Discrete", "Continuous"]
      answer: 0
      feedback: [null, "Pets are counted."]
      explain: "Counted: discrete."
```

### Mean

### Median

### Range

### Review: kinds of data

## Make: build a data set

```step
stage: make
insight: "Building five values with a given mean and median reverses the lesson: the median fixes the middle value, the mean fixes the total."
try: { playground: board, starter: "data.yml#make", height: 560 }
hint: ["The median of 5 values is the 3rd once sorted: make it 5.", "A mean of 6 with 5 values needs a total of 30."]
check: { type: board, text: "Make 5 values (from 0 to 12) with a mean of 6 and a median of 5.", when: "n = 5 and m = 6 and d = 5", explain: "For example 2, 4, 5, 9, 10: the middle is 5 and the total is 30." }
```

Then make a different set with the same mean and median.
