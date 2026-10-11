---
order: 4
unit: forms
introduces: [file, csv]
title: Keep the sign-ups
summary: "Save each new member to a CSV file, and read the file to show the list, so sign-ups last after the app stops."
language: python
hook: "A web app that forgets everyone when it restarts is no use. Real apps keep their data in files and databases."
---
Last lesson the members vanished on every Run, because they lived in a variable. Now they live in a **file**, `members.csv` (open it in the **Files** tab). The home page reads the file every time; joining **adds a row** to the end of it. `open(name, "a")` opens a file to **a**dd to the end, and `csv.writer(f).writerow([name, group])` writes one row, and `list(csv.DictReader(f))` reads the file back as a list of dictionaries, one per row, using the first line (`name,group`) as the keys.

## Predict

```step
stage: predict
code: club.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["Ada, then Sam on the next line", "Sam", "Ada", "An error: log.txt already exists"]
  actual: "Ada, then Sam. \"w\" makes the file and writes Ada; \"a\" adds Sam to the end instead of emptying the file."
```

`"w"` opens a file for writing (it empties it first). What does `"a"` do differently?

## Run

```step
stage: run
code: club.py#run
try: { playground: python, starter: "club.py#run", files: [members.csv], height: 560 }
check: { type: reflect, text: "I joined, pressed Run again (and reloaded the page), and the new member was still there, in members.csv too." }
unlocks: [add-a-row-to-a-csv]
```

Join the club, then press **Run** again, and reload the page: the new member is still there. Open `members.csv` in the **Files** tab to see the new row.

## Investigate

```step
stage: investigate
code: club.py#run
insight: "A web app keeps data that must last in storage, not variables: every page reads the file, and every change writes to it."
tasks:
  - check:
      type: question
      q: "Why does home() call load_members() every time, instead of reading the file once at the start?"
      options: ["So the page always shows what is in the file now, including members who just joined", "Reading files is free", "Flask needs it", "To check the file is still there"]
      answer: 0
      explain: "The file changes whenever someone joins. Reading it for every page means the page is never out of date."
  - check:
      type: question
      q: "Why is newline=\"\" there when the file is opened to add a row?"
      options: ["It stops csv writing blank lines between rows on some computers", "It adds a new line", "It empties the file", "It makes the file a CSV"]
      answer: 0
      explain: "csv.writer writes its own line endings; newline=\"\" stops the file adding extra ones (a known quirk on Windows). Use it whenever csv writes a file."
  - check:
      type: bug
      code: club.py#bug
      text: "After saving Zoe, the file reads back as an empty list, and Ada and Sam have gone. Click the line that is wrong."
      answer: 5
      fault: logic
      misconception: write-mode-append
      explain: "\"w\" empties the file before writing, so the header and every member are lost, and Zoe's row becomes the header. \"a\" adds to the end."
```

### Read every time

Why the page reads the file each time.

### A quirk of csv

What `newline=""` is for.

### Spot the bug

A save that wipes the club.

## Modify

```step
stage: modify
insight: "A check against the saved data stops repeats; anything you can work out from the file can go on the page."
try: { playground: python, starter: "club.py#run", files: [members.csv], height: 560 }
tasks:
  - hint:
      - "In join(), before saving: loop over load_members(), and if a member's name matches (compare with .lower()), return the page with an error."
      - "error=name + \" is already a member.\""
    check: { type: code, text: "Refuse a name that is already a member, with a message that says it is \"already a member\".", rules: { contains: ["already a member"] } }
  - hint: "In home(): members = load_members(), then pass count=len(members) to the template, and show {{ count }} in the heading."
    check: { type: code, text: "Show how many members there are in the heading.", rules: { contains: ["len("] } }
```

### No repeats

Refuse a name that is already in the file, whatever its capitals, with a message saying it is already a member.

### How many members

Show the number of members in the **Members** heading.

## Make: results that last

```step
stage: make
insight: "Goals only: changing a row means reading every row, changing one, and writing them all back with \"w\" (header first)."
try: { playground: python, starter: "club.py#make", files: [results.csv], height: 560 }
check: { type: code, text: "Add a win to the chosen player and save every row back to results.csv, so wins last.", rules: { contains: ["\"w\"", "writerow("] } }
```

The Add a win form is there, but `win()` does nothing yet. Make it add 1 to the chosen player's wins and **save the whole table** back to `results.csv`, header first, so the wins last after a Run. (`"a"` only adds rows; changing a row means writing the file again.)

## Where this leads

```step
stage: info
check:
  type: question
  q: "Two people press Join at the same moment on a busy real site. What could go wrong with a CSV file?"
  options: ["Both could write at once and spoil the file: real sites use a database, which handles this", "Nothing", "One person joins twice", "The CSV turns into JSON"]
  answer: 0
  explain: "Files are fine for a small app. Busy sites use a database (SQLite, PostgreSQL), which keeps the data safe when many people change it at once."
```

On a computer, `members.csv` would sit next to `app.py`. Next: share the members with other programs as JSON.
