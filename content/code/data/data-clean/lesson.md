---
order: 4
unit: show
introduces: [try, assert, none]
title: Clean it, test it
summary: Real data is messy. Write a function that cleans one value, check it with test cases, and skip the rows it cannot fix.
language: python
hook: "Data people type is never tidy: blanks, typos, numbers in words. Cleaning it is most of a data scientist's job, and test cases prove the cleaning works."
---
This lesson uses `survey.csv`, a made-up class survey: each student's favourite genre and hours of music a week. Open it in the **Files** tab. Some answers are blank, some are in words, some are impossible. Your job: clean what you can, skip what you cannot, and **prove** the cleaning works.

## Predict

```step
stage: predict
code: clean.py#predict
check:
  type: predict
  q: "What total does it print at the end?"
  options: ["9.5", "12.5", "It stops with a ValueError", "0"]
  actual: "9.5. float(\"\") and float(\"three\") both cause a ValueError, so except skips them; 5 + 4.5 is 9.5."
```

`float()` turns text into a decimal number, and causes a `ValueError` when it cannot. `try:` runs a line that might fail; if it causes a `ValueError`, Python runs the `except ValueError:` lines instead of stopping. Which of the four answers can `float()` turn into a number?

## Run

```step
stage: run
code: clean.py#run
try: { playground: python, starter: "clean.py#run", files: [../sets/survey.csv], height: 520 }
check: { type: reflect, text: "I can say which rows were skipped, and why." }
unlocks: [test-with-assert]
```

Run it. First the **test cases** run (`assert` lines), then the survey is cleaned. `clean_hours` gives back a number, or `None` (Python's word for "no value") when the answer cannot be used. `hours is None` asks whether it is `None`.

Then break a test on purpose: change `168` to `16` and run it again. Put it back.

## Investigate

```step
stage: investigate
code: clean.py#run
insight: "A cleaning function turns one messy value into a good value or None; assert lines are test cases that stop the program the moment the function gets one wrong."
tasks:
  - check:
      type: question
      q: "Which hours answers does clean_hours turn into None?"
      options: ["The blank, \"three\", \"-1\" and \"400\"", "Only \"three\"", "The blank and \"three\"", "Every answer with a decimal point"]
      answer: 0
      explain: "Blank and \"three\" are not numbers (ValueError). -1 and 400 are numbers, but impossible: a week has 168 hours."
  - check:
      type: question
      q: "What does assert clean_hours(\"three\") is None do when clean_hours works?"
      options: ["Nothing: the program carries on", "Prints True", "Prints None", "Stops the program"]
      answer: 0
      explain: "assert is silent when its test is true. It stops the program with AssertionError when the test is false, so a broken function is caught straight away."
  - check:
      type: bug
      code: clean.py#bug
      text: "The tests stop with AssertionError on the line that checks \"400\". Click the line that is wrong."
      answer: 6
      fault: logic
      misconception: and-vs-or
      explain: "No number is below 0 and above 168 at the same time, so the if is never true. Either is enough to reject it: hours < 0 or hours > 168."
```

### What gets skipped

Not a number, or not possible.

### What assert does

A test that is silent when it passes.

### Spot the bug

A test catches a mistake.

## Modify

```step
stage: modify
insight: "Each kind of mess gets its own small fix, and each fix gets a test case."
try: { playground: python, starter: "clean.py#run", files: [../sets/survey.csv], height: 520 }
tasks:
  - hint:
      - "def clean_genre(text): return text.strip().lower()"
      - "Test it: assert clean_genre(\" Hip Hop \") == \"hip hop\". Then print each student's cleaned genre."
    check: { type: code, text: "Write clean_genre(text), which removes spaces at the ends and makes the genre lower case, with two test cases.", rules: { contains: ["def clean_genre(", "assert clean_genre("] } }
  - hint:
      - "Before the loop, seen = []. Skip a row if row[\"student\"] in seen."
      - "When a row is used, seen.append(row[\"student\"])."
    check: { type: code, text: "Skip a student's answer if it has already been counted.", rules: { contains: ["in seen"] } }
```

### Tidy genres

`" hip hop "`, `"POP"` and `"pop "` should all count as the same genre. Write `clean_genre(text)` with two test cases, and print each student's cleaned genre.

### Repeated rows

One student's answer is in the file twice. Skip an answer from a student who has already been counted.

## Make: the class chart

```step
stage: make
insight: "Goals only: clean, then count, then chart: the three lessons of this unit in one program."
try: { playground: python, starter: "clean.py#make", files: [../sets/survey.csv], height: 520 }
check: { type: code, text: "Chart the class's favourite genres, cleaned, with blank answers skipped.", rules: { contains: ["clean_genre(", "\"#\" *"], loops: 2 } }
```

Draw a bar chart of the class's favourite genres, as in Lesson 3. Use `clean_genre` so the same genre is counted once, and skip blank answers. Then add a test case of your own.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your cleaning skipped 4 of 21 answers. What should a report about the survey say?"
  options: ["The average, and that it comes from 17 usable answers out of 21", "Only the average", "That the 4 skipped students listen to 0 hours", "Nothing: skipped rows do not matter"]
  answer: 0
  explain: "Honest data work says what was left out and why. Turning a blank into 0 would change the average."
```

Test cases are how programmers trust code: every app you use has thousands of them. Next: put the music data behind an app.
