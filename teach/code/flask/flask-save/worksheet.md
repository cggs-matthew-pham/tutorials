---
title: "Keep the sign-ups"
subtitle: "Web apps with Flask · Forms and saving · Lesson 4"
---

# Keep the sign-ups

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A web app that forgets everyone when it restarts is no use. Real apps keep their data in files and databases.


:::teacher-note

**In one sentence:** Students save sign-ups to members.csv (adding a row with "a" and csv.writer) and read the file for every page, so members survive a Run and a reload, then refuse repeats, count members and save wins by rewriting results.csv.

**Students should be able to say:** I can add a row to a CSV file and read the file to show its rows. I can explain why a web app keeps data in a file, not a variable. I can change one row by reading every row, changing it, and writing them all back.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`"w"` opens a file for writing (it empties it first). What does `"a"` do differently?

```python
with open("log.txt", "w") as f:
    f.write("Ada\n")
with open("log.txt", "a") as f:
    f.write("Sam\n")
with open("log.txt") as f:
    print(f.read())
```

:::keep-together

**What does it print?**

☐ An error: log.txt already exists

☐ Ada, then Sam on the next line

☐ Ada

☐ Sam

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Ada, then Sam. "w" makes the file and writes Ada; "a" adds Sam to the end instead of emptying the file.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
PAGE = """<h1>Chess club</h1>
<h2>Members</h2>
<ul>
{% for m in members %}
  <li>{{ m["name"] }} ({{ m["group"] }})</li>
{% endfor %}
</ul>
<h2>Join the club</h2>
{% if error %}<p style="color: crimson">{{ error }}</p>{% endif %}
<form method="post" action="/join">
  <label for="name">Name</label>
  <input id="name" name="name">
  <label for="group">Group</label>
  <select id="group" name="group">
    <option>Beginners</option>
    <option>Players</option>
    <option>Champions</option>
  </select>
  <button>Join</button>
</form>"""


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


def save_member(name, group):
    with open("members.csv", "a", newline="") as f:
        csv.writer(f).writerow([name, group])


@app.route("/")
def home():
    return render_template_string(PAGE, members=load_members())


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=load_members(), error="Please type your name.")
    save_member(name, group)
    return redirect("/")


app.run()
```

:::keep-together

### Read every time

**Why does home() call load_members() every time, instead of reading the file once at the start?**

☐ Flask needs it

☐ To check the file is still there

☐ So the page always shows what is in the file now, including members who just joined

☐ Reading files is free

:::


:::teacher-note

**Answer:** So the page always shows what is in the file now, including members who just joined

The file changes whenever someone joins. Reading it for every page means the page is never out of date.

:::


:::keep-together

### A quirk of csv

**Why is newline="" there when the file is opened to add a row?**

☐ It empties the file

☐ It stops csv writing blank lines between rows on some computers

☐ It makes the file a CSV

☐ It adds a new line

:::


:::teacher-note

**Answer:** It stops csv writing blank lines between rows on some computers

csv.writer writes its own line endings; newline="" stops the file adding extra ones (a known quirk on Windows). Use it whenever csv writes a file.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

"w" empties the file before writing, so the header and every member are lost, and Zoe's row becomes the header. "a" adds to the end.

:::


:::typical

## Modify


**No repeats.** Refuse a name that is already in the file, whatever its capitals, with a message saying it is already a member.

**How many members.** Show the number of members in the **Members** heading.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**No repeats:**

```python
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
PAGE = """<h1>Chess club</h1>
<h2>Members</h2>
<ul>
{% for m in members %}
  <li>{{ m["name"] }} ({{ m["group"] }})</li>
{% endfor %}
</ul>
<h2>Join the club</h2>
{% if error %}<p style="color: crimson">{{ error }}</p>{% endif %}
<form method="post" action="/join">
  <label for="name">Name</label>
  <input id="name" name="name">
  <label for="group">Group</label>
  <select id="group" name="group">
    <option>Beginners</option>
    <option>Players</option>
    <option>Champions</option>
  </select>
  <button>Join</button>
</form>"""


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


def save_member(name, group):
    with open("members.csv", "a", newline="") as f:
        csv.writer(f).writerow([name, group])


@app.route("/")
def home():
    return render_template_string(PAGE, members=load_members())


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=load_members(), error="Please type your name.")
    for m in load_members():
        if m["name"].lower() == name.lower():
            return render_template_string(PAGE, members=load_members(), error=name + " is already a member.")
    save_member(name, group)
    return redirect("/")


app.run()
```

**How many members:**

```python
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
PAGE = """<h1>Chess club</h1>
<h2>Members ({{ count }})</h2>
<ul>
{% for m in members %}
  <li>{{ m["name"] }} ({{ m["group"] }})</li>
{% endfor %}
</ul>
<h2>Join the club</h2>
{% if error %}<p style="color: crimson">{{ error }}</p>{% endif %}
<form method="post" action="/join">
  <label for="name">Name</label>
  <input id="name" name="name">
  <label for="group">Group</label>
  <select id="group" name="group">
    <option>Beginners</option>
    <option>Players</option>
    <option>Champions</option>
  </select>
  <button>Join</button>
</form>"""


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


def save_member(name, group):
    with open("members.csv", "a", newline="") as f:
        csv.writer(f).writerow([name, group])


@app.route("/")
def home():
    members = load_members()
    return render_template_string(PAGE, members=members, count=len(members))


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=load_members(), error="Please type your name.")
    save_member(name, group)
    return redirect("/")


app.run()
```

:::

:::


## Make: results that last

The Add a win form is there, but `win()` does nothing yet. Make it add 1 to the chosen player's wins and **save the whole table** back to `results.csv`, header first, so the wins last after a Run. (`"a"` only adds rows; changing a row means writing the file again.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)

PAGE = """<h1>Results</h1>
<table>
  <tr><th>Player</th><th>Wins</th></tr>
  {% for p in players %}
  <tr><td>{{ p["player"] }}</td><td>{{ p["wins"] }}</td></tr>
  {% endfor %}
</table>
<form method="post" action="/win">
  <select name="player">
    {% for p in players %}
    <option>{{ p["player"] }}</option>
    {% endfor %}
  </select>
  <button>Add a win</button>
</form>"""


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    return render_template_string(PAGE, players=load_results())


@app.route("/win", methods=["POST"])
def win():
    name = request.form["player"]
    players = load_results()
    for p in players:
        if p["player"] == name:
            p["wins"] = int(p["wins"]) + 1
    with open("results.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["player", "wins"])
        for p in players:
            writer.writerow([p["player"], p["wins"]])
    return redirect("/")


app.run()
```

:::


:::wider

## Where this leads

On a computer, `members.csv` would sit next to `app.py`. Next: share the members with other programs as JSON.

:::


## Exit ticket

:::keep-together

**Why does the app read members.csv for every page?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The file changes when people join, so reading it each time means the page always shows the current members.

:::

