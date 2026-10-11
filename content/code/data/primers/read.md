---
title: Reading data in 5 minutes
---
## The idea in plain words

**A CSV file** is a table saved as plain text: the first line names the columns, every other line is a row, and commas separate the values. Python's `csv.DictReader` reads it into a **list of dictionaries**, one per row, so `songs[0]["title"]` is the first song's title. Every value comes in as **text**: `"2013"`, not 2013. `int()` and `float()` turn it into a number before you compare or add.

**Questions about data are loops.** Pick rows with a loop and an `if`. Count them with a variable that goes up by one. Add up a column with a **total** that starts at 0. Divide by the count for an **average**. Keep the **biggest so far**: start with the first row, and replace it only when a row beats it.

## Why programmers use them

- **CSV is everywhere.** Spreadsheets, school systems, sports sites and government data all export it.
- **The loop answers any question,** not only the ones a spreadsheet has a button for: the longest pop song after 2010 is one more `if`.

## An everyday picture, and where it breaks

A stack of index cards, one per song, each with the same labelled boxes. Reading the data is flipping through the stack; a total is a running sum on a scrap of paper. It breaks because the cards say "3.9" in ink: Python treats it as writing, not a number, until you convert it.

## Try it yourself (5 minutes)

1. Open `music.csv` in the playground's Files tab and find the first song.
2. Run Lesson 1's program, then change `"rock"` to `"K-pop"`.
3. Run Lesson 2's program and check the longest song against the file.

## Your own data

`music.csv` is 49 well-known songs compiled for these lessons (lengths are rounded). Any CSV with a name, a category, a year and a number works with the same programs once the keys change: a class survey, sports results, a Wikidata export of films or games your students like. Students add a file with **Add a file from this computer** in the playground's Files tab.

## Questions students ask

- **Why is "2013" + "1" equal to "20131"?** Both are text, and `+` joins text.
- **Why does longest start as songs[0]?** It holds a whole song, so it starts as a real one, ready to compare.
- **Where does the file live?** In the browser, for this course (the Files tab). In Python on a computer it would sit in the program's folder.
