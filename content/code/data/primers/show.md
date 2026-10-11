---
title: Charts and checking in 5 minutes
---
## The idea in plain words

**Counting with a dictionary.** One key per value (each genre), and its count as the value. For each row: if the key is there, add 1; otherwise start it at 1. A second loop over the dictionary draws a **bar** for each key: `"#" * count` repeats the character that many times.

**Cleaning.** Real data has blanks, typos, numbers in words and impossible values. A small **cleaning function** takes one messy value and gives back a good value, or `None` ("no value") when it cannot be used. The loop skips the `None` rows, and the result says how many answers it used.

**Test cases.** `assert clean_hours("400") is None` is a test: silent when true, and the program stops with `AssertionError` when false. A few tests prove the function works, and catch it the moment someone breaks it.

## Why programmers use them

- **Charts make patterns visible** that a list of numbers hides.
- **Most data work is cleaning**, and decisions made from dirty data are wrong.
- **Tests are how programmers trust code:** apps you use run thousands of them before every update.

## An everyday picture, and where it breaks

Counting is tally marks on a whiteboard, one row per genre; the bar chart is the tally marks themselves. Cleaning is a teacher reading survey slips: "Pop", "pop " and "POP" are the same answer, and "400 hours" goes in the bin. It breaks because a computer never guesses: every rule a human applies without thinking must be written down, and tested.

## Try it yourself (5 minutes)

1. Run Lesson 3's chart, then add `print(counts)` after the first loop.
2. Open `survey.csv` in the Files tab and spot four kinds of mess.
3. In Lesson 4, change `168` to `16`, run, and read the AssertionError. Put it back.

## Questions students ask

- **Why not just turn bad answers into 0?** It would change the average. Leaving them out, and saying so, is honest.
- **Why `is None` and not `== None`?** Both work here; `is` is the usual Python way to check for None.
- **Does the chart tell us what music is popular?** No: it shows the songs someone put in the file. Data is a choice.
