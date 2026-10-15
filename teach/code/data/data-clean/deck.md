---
marp: true
theme: default
html: true
---

# Clean it, test it

Data detective · Charts and checking

<!-- Speaker note: Students clean a messy survey with a function that returns a number or None, check it with assert test cases, then tidy genres, skip repeated rows and chart the cleaned genres. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** real data is messy. Write a function that cleans one value, check it with test cases, and skip the rows it cannot fix.

- I can write a function that cleans one value, or gives back None when it cannot.
- I can write test cases with assert and use them to find a mistake.
- I can say which rows were left out of a result, and why.

<!-- Speaker note: Before class: Read the unit primer first. `survey.csv` is made up (no real students) with deliberate mess: capitals and spaces in genres, a blank genre, a blank hours answer, "three", -1, 400 (a week has 168 hours) and a repeated row. `clean_hours` returns a number, or `None` ("no value") when the answer cannot be used; `hours is None` checks for it (`is` is the usual way to compare with None). `try` / `except ValueError` is introduced here in one sentence (the Predict): try a line, and if it causes that error, run the except lines instead of stopping. Deeper Python's errors lesson goes further. **Test cases** are `assert` lines: silent when true, and the program stops with `AssertionError` when false. The bug task joins the two range checks with `and`, which can never be true; the tests catch it. Talk about honesty: a report says how many answers were used. -->

---

## Why it matters

> Data people type is never tidy: blanks, typos, numbers in words. Cleaning it is most of a data scientist's job, and test cases prove the cleaning works.

<!-- Speaker note: This lesson uses `survey.csv`, a made-up class survey: each student's favourite genre and hours of music a week. Open it in the **Files** tab. Some answers are blank, some are in words, some are impossible. Your job: clean what you can, skip what you cannot, and **prove** the cleaning works. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What total does it print at the end?**

- 9.5
- 0
- It stops with a ValueError
- 12.5

<!-- Speaker note: What happens: 9.5. float("") and float("three") both cause a ValueError, so except skips them; 5 + 4.5 is 9.5. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: float() on each of the four answers, on the board. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 9.5. float("") and float("three") both cause a ValueError, so except skips them; 5 + 4.5 is 9.5.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/data/data-clean/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/data/data-clean/?full=step-2#step-2)

<!-- Speaker note: Run it. First the **test cases** run (`assert` lines), then the survey is cleaned. `clean_hours` gives back a number, or `None` (Python's word for "no value") when the answer cannot be used. `hours is None` asks whether it is `None`. Then break a test on purpose: change `168` to `16` and run it again. Put it back. Students should be able to say: I can say which rows were skipped, and why. -->

<!-- Speaker note: Teacher: have students break a test on purpose (168 to 16) and read the AssertionError. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 35 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-clean/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A cleaning function turns one messy value into a good value or None; assert lines are test cases that stop the program the moment the function gets one wrong. -->

<!-- Speaker note: Teacher: ask for a number that is below 0 and above 168 at the same time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What gets skipped

**Which hours answers does clean_hours turn into None?**

- Only "three"
- Every answer with a decimal point
- The blank, "three", "-1" and "400"
- The blank and "three"

* Answer: The blank, "three", "-1" and "400"

<!-- Speaker note: Blank and "three" are not numbers (ValueError). -1 and 400 are numbers, but impossible: a week has 168 hours. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What assert does

**What does assert clean_hours("three") is None do when clean_hours works?**

- Stops the program
- Nothing: the program carries on
- Prints True
- Prints None

* Answer: Nothing: the program carries on

<!-- Speaker note: assert is silent when its test is true. It stops the program with AssertionError when the test is false, so a broken function is caught straight away. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 6

<!-- Speaker note: No number is below 0 and above 168 at the same time, so the if is never true. Either is enough to reject it: hours < 0 or hours > 168. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Tidy genres:** `" hip hop "`, `"POP"` and `"pop "` should all count as the same genre. Write `clean_genre(text)` with two test cases, and print each student's cleaned genre.
- **Repeated rows:** One student's answer is in the file twice. Skip an answer from a student who has already been counted.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-clean/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each kind of mess gets its own small fix, and each fix gets a test case. Hints, in order: def clean_genre(text): return text.strip().lower() / Test it: assert clean_genre(" Hip Hop ") == "hip hop". Then print each student's cleaned genre. / Before the loop, seen = []. Skip a row if row["student"] in seen. / When a row is used, seen.append(row["student"]). For students who need more support: Give students clean_genre written out, and ask them to write the two test cases for it. For early finishers: Write clean_year(text) for the year_level column (only 7 to 12 allowed) with test cases, and print the average hours for each year level. The hard part, on purpose: Writing a test case before the fix. When a student is stuck, ask what the function should give for the failing input, and have them write that assert first. When students get stuck: AssertionError on a test line. Ask: What does the function give for that input, and what does the test expect? Fix: Print clean_hours("400") to see what it gives, then fix the function, not the test. / ZeroDivisionError at the average. Ask: Did any row get counted? Fix: Check that count goes up in the else, for the rows that are kept. / The repeated student is still counted twice. Ask: When is the student added to seen? Fix: seen.append(...) when a row is used, and check if row["student"] in seen first. -->

<!-- Speaker note: Teacher: write the test case before the function, then make it pass. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the class chart

Draw a bar chart of the class's favourite genres, as in Lesson 3. Use `clean_genre` so the same genre is counted once, and skip blank answers. Then add a test case of your own.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-clean/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: clean, then count, then chart: the three lessons of this unit in one program. -->

<!-- Speaker note: Teacher: compare the chart with the raw file: what would the chart show without clean_genre? -->

---

## Where this leads

Test cases are how programmers trust code: every app you use has thousands of them. Next: put the music data behind an app.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does a test case such as assert clean_hours("400") is None prove?**

* That the function rejects an impossible answer; if someone breaks the function later, the program stops on that line and says so.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson puts the data behind a Gradio app with pandas, which has its own cleaning tools. Test cases come back in every later course. -->
