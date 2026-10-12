---
title: "Clean it, test it"
subtitle: "Data detective · Charts and checking · Lesson 4"
---

# Clean it, test it

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Data people type is never tidy: blanks, typos, numbers in words. Cleaning it is most of a data scientist's job, and test cases prove the cleaning works.


:::teacher-note

**In one sentence:** Students clean a messy survey with a function that returns a number or None, check it with assert test cases, then tidy genres, skip repeated rows and chart the cleaned genres.

**Students should be able to say:** I can write a function that cleans one value, or gives back None when it cannot. I can write test cases with assert and use them to find a mistake. I can say which rows were left out of a result, and why.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`float()` turns text into a decimal number, and causes a `ValueError` when it cannot. `try:` runs a line that might fail; if it causes a `ValueError`, Python runs the `except ValueError:` lines instead of stopping. Which of the four answers can `float()` turn into a number?

```python
answers = ["5", "", "three", "4.5"]
total = 0
for a in answers:
    try:
        total = total + float(a)
    except ValueError:
        print("Skipped: '" + a + "'")
print(total)
```

:::keep-together

**What total does it print at the end?**

☐ 9.5

☐ 0

☐ It stops with a ValueError

☐ 12.5

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 9.5. float("") and float("three") both cause a ValueError, so except skips them; 5 + 4.5 is 9.5.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import csv


def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 or hours > 168:
        return None
    return hours


assert clean_hours("5") == 5
assert clean_hours("4.5") == 4.5
assert clean_hours("three") is None
assert clean_hours("") is None
assert clean_hours("-1") is None
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

total = 0
count = 0
for row in rows:
    hours = clean_hours(row["hours"])
    if hours is None:
        print("Skipped " + row["student"] + ": '" + row["hours"] + "'")
    else:
        total = total + hours
        count = count + 1

print("Average: " + str(round(total / count, 1)) + " hours of music a week, from " + str(count) + " answers")
```

:::keep-together

### What gets skipped

**Which hours answers does clean_hours turn into None?**

☐ Only "three"

☐ Every answer with a decimal point

☐ The blank, "three", "-1" and "400"

☐ The blank and "three"

:::


:::teacher-note

**Answer:** The blank, "three", "-1" and "400"

Blank and "three" are not numbers (ValueError). -1 and 400 are numbers, but impossible: a week has 168 hours.

:::


:::keep-together

### What assert does

**What does assert clean_hours("three") is None do when clean_hours works?**

☐ Stops the program

☐ Nothing: the program carries on

☐ Prints True

☐ Prints None

:::


:::teacher-note

**Answer:** Nothing: the program carries on

assert is silent when its test is true. It stops the program with AssertionError when the test is false, so a broken function is caught straight away.

:::


:::keep-together

### Spot the bug

**The tests stop with AssertionError on the line that checks "400". Click the line that is wrong.**

```
 1  def clean_hours(text):
 2      try:
 3          hours = float(text)
 4      except ValueError:
 5          return None
 6      if hours < 0 and hours > 168:
 7          return None
 8      return hours
 9  
10  
11  assert clean_hours("5") == 5
12  assert clean_hours("400") is None
13  print("All tests pass")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

No number is below 0 and above 168 at the same time, so the if is never true. Either is enough to reject it: hours &lt; 0 or hours &gt; 168.

:::


:::typical

## Modify


**Tidy genres.** `" hip hop "`, `"POP"` and `"pop "` should all count as the same genre. Write `clean_genre(text)` with two test cases, and print each student's cleaned genre.

**Repeated rows.** One student's answer is in the file twice. Skip an answer from a student who has already been counted.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Tidy genres:**

```python
import csv


def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 or hours > 168:
        return None
    return hours


def clean_genre(text):
    return text.strip().lower()


assert clean_hours("5") == 5
assert clean_hours("4.5") == 4.5
assert clean_hours("three") is None
assert clean_hours("") is None
assert clean_hours("-1") is None
assert clean_genre(" Hip Hop ") == "hip hop"
assert clean_genre("POP") == "pop"
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    print(row["student"] + ": " + clean_genre(row["genre"]))
```

**Repeated rows:**

```python
import csv


def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 or hours > 168:
        return None
    return hours


assert clean_hours("5") == 5
assert clean_hours("4.5") == 4.5
assert clean_hours("three") is None
assert clean_hours("") is None
assert clean_hours("-1") is None
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

total = 0
count = 0
seen = []
for row in rows:
    hours = clean_hours(row["hours"])
    if row["student"] in seen:
        print("Skipped " + row["student"] + ": a repeat")
    elif hours is None:
        print("Skipped " + row["student"] + ": '" + row["hours"] + "'")
    else:
        total = total + hours
        count = count + 1
        seen.append(row["student"])

print("Average: " + str(round(total / count, 1)) + " hours of music a week, from " + str(count) + " answers")
```

:::

:::


## Make: the class chart

Draw a bar chart of the class's favourite genres, as in Lesson 3. Use `clean_genre` so the same genre is counted once, and skip blank answers. Then add a test case of your own.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv


def clean_genre(text):
    return text.strip().lower()


assert clean_genre(" Hip Hop ") == "hip hop"
assert clean_genre("POP") == "pop"
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

counts = {}
for row in rows:
    genre = clean_genre(row["genre"])
    if genre != "":
        if genre in counts:
            counts[genre] = counts[genre] + 1
        else:
            counts[genre] = 1

for genre in counts:
    print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
```

:::


:::wider

## Where this leads

Test cases are how programmers trust code: every app you use has thousands of them. Next: put the music data behind an app.

:::


## Exit ticket

:::keep-together

**What does a test case such as assert clean_hours("400") is None prove?**

{{lines-3}}

:::


:::teacher-note

**Answer:** That the function rejects an impossible answer; if someone breaks the function later, the program stops on that line and says so.

:::

