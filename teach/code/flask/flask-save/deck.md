---
marp: true
theme: default
html: true
---

# Keep the sign-ups

Web apps with Flask · Forms and saving

<!-- Speaker note: Students save sign-ups to members.csv (adding a row with "a" and csv.writer) and read the file for every page, so members survive a Run and a reload, then refuse repeats, count members and save wins by rewriting results.csv. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** save each new member to a CSV file, and read the file to show the list, so sign-ups last after the app stops.

- I can add a row to a CSV file and read the file to show its rows.
- I can explain why a web app keeps data in a file, not a variable.
- I can change one row by reading every row, changing it, and writing them all back.

<!-- Speaker note: Before class: Read the unit primer first. `members.csv` and `results.csv` are put in each student's Files tab by the lesson (the Files tab can put the originals back). Files are kept per course in the browser, so they survive Run and a page reload. `open(name, "a")` adds to the end of a file; `open(name, "w")` empties it first (the Predict and the bug task: saving with "w" wipes the header and every member). `csv.writer(f).writerow([...])` writes one row; `newline=""` stops blank lines appearing between rows on Windows. Every page reads the file again, so it is always up to date. Changing a row (the Make) means reading all rows, changing one, and writing the whole file back with "w", header first. The info question is about why busy sites use a database instead of a file. -->

---

## Why it matters

> A web app that forgets everyone when it restarts is no use. Real apps keep their data in files and databases.

<!-- Speaker note: Last lesson the members vanished on every Run, because they lived in a variable. Now they live in a **file**, `members.csv` (open it in the **Files** tab). The home page reads the file every time; joining **adds a row** to the end of it. `open(name, "a")` opens a file to **a**dd to the end, and `csv.writer(f).writerow([name, group])` writes one row, and `list(csv.DictReader(f))` reads the file back as a list of dictionaries, one per row, using the first line (`name,group`) as the keys. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
with open("log.txt", "w") as f:
    f.write("Ada\n")
with open("log.txt", "a") as f:
    f.write("Sam\n")
with open("log.txt") as f:
    print(f.read())
```

**What does it print?**

- An error: log.txt already exists
- Ada, then Sam on the next line
- Ada
- Sam

<!-- Speaker note: What happens: Ada, then Sam. "w" makes the file and writes Ada; "a" adds Sam to the end instead of emptying the file. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: two sticky notes: "w" throws the old note away, "a" adds to it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Ada, then Sam. "w" makes the file and writes Ada; "a" adds Sam to the end instead of emptying the file.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/flask/flask-save/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/flask/flask-save/?full=step-2#step-2)

<!-- Speaker note: Join the club, then press **Run** again, and reload the page: the new member is still there. Open `members.csv` in the **Files** tab to see the new row. Students should be able to say: I joined, pressed Run again (and reloaded the page), and the new member was still there, in members.csv too. -->

<!-- Speaker note: Teacher: join, press Run, reload: the member is still there. Open members.csv in the Files tab. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 53 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-save/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A web app keeps data that must last in storage, not variables: every page reads the file, and every change writes to it. -->

<!-- Speaker note: Teacher: ask what would happen if the file were read once at the top. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Read every time

**Why does home() call load_members() every time, instead of reading the file once at the start?**

- Flask needs it
- To check the file is still there
- So the page always shows what is in the file now, including members who just joined
- Reading files is free

* Answer: So the page always shows what is in the file now, including members who just joined

<!-- Speaker note: The file changes whenever someone joins. Reading it for every page means the page is never out of date. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A quirk of csv

**Why is newline="" there when the file is opened to add a row?**

- It empties the file
- It stops csv writing blank lines between rows on some computers
- It makes the file a CSV
- It adds a new line

* Answer: It stops csv writing blank lines between rows on some computers

<!-- Speaker note: csv.writer writes its own line endings; newline="" stops the file adding extra ones (a known quirk on Windows). Use it whenever csv writes a file. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**After saving Zoe, the file reads back as an empty list, and Ada and Sam have gone. Click the line that is wrong.**

```
 1  import csv
 2  
 3  
 4  def save_member(name, group):
 5      with open("members.csv", "w", newline="") as f:
 6          csv.writer(f).writerow([name, group])
 7  
 8  
 9  save_member("Zoe", "Players")
10  with open("members.csv") as f:
11      print(list(csv.DictReader(f)))
```

* Answer: line 5

<!-- Speaker note: "w" empties the file before writing, so the header and every member are lost, and Zoe's row becomes the header. "a" adds to the end. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **No repeats:** Refuse a name that is already in the file, whatever its capitals, with a message saying it is already a member.
- **How many members:** Show the number of members in the **Members** heading.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-save/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A check against the saved data stops repeats; anything you can work out from the file can go on the page. Hints, in order: In join(), before saving: loop over load_members(), and if a member's name matches (compare with .lower()), return the page with an error. / error=name + " is already a member." / In home(): members = load_members(), then pass count=len(members) to the template, and show {{ count }} in the heading. For students who need more support: Give students the loop that changes the wins, and ask them only to write the rows back. For early finishers: Add a Leave form that removes a member (read all rows, keep the others, write them back). The hard part, on purpose: Read-change-write for the Make. Ask students to write the three steps as comments before any code. When students get stuck: Everyone but the new member has gone. Ask: Which mode opened the file to save? Fix: "a" to add a row; restore members.csv from the Files tab. / KeyError: 'name' when the page loads. Ask: What is the first line of members.csv now? Fix: The header row was lost; use "Get this lesson's files again" in the Files tab. / Wins show as 51 instead of 6. Ask: Is wins text or a number when 1 is added? Fix: int(p["wins"]) + 1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: results that last

The Add a win form is there, but `win()` does nothing yet. Make it add 1 to the chosen player's wins and **save the whole table** back to `results.csv`, header first, so the wins last after a Run. (`"a"` only adds rows; changing a row means writing the file again.)

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-save/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: changing a row means reading every row, changing one, and writing them all back with "w" (header first). -->

<!-- Speaker note: Teacher: on the board: read all rows, change one, write all back. -->

---

## Where this leads

On a computer, `members.csv` would sit next to `app.py`. Next: share the members with other programs as JSON.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the app read members.csv for every page?**

* The file changes when people join, so reading it each time means the page always shows the current members.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson sends the members as JSON for other programs. A database (SQLite) is the next step for real apps; Python has sqlite3 built in. -->
