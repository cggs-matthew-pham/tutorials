---
title: "An API for the club"
subtitle: "Web apps with Flask · APIs · Lesson 5"
---

# An API for the club

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Weather apps, maps and music players get their data from APIs: addresses that send back data for programs, not pages for people.


:::teacher-note

**In one sentence:** Students turn the club's data into an API, with routes that return dictionaries sent as JSON, then add a stats route, a search with a query string and an API of their own for the results.

**Students should be able to say:** I can explain the difference between a page for people and an API for programs. I can make a Flask route that sends data as JSON. I can read a query string with request.args.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The function returns a dictionary, not HTML. What does Flask send?

```python
from flask import Flask

app = Flask(__name__)


@app.route("/api/club")
def club():
    return {"name": "Chess club", "room": 12, "days": ["Tuesday", "Thursday"]}


app.run()
```

:::keep-together

**Someone visits /api/club. What do they get?**

☐ The dictionary as JSON text: the name, the room number and the list of days

☐ An error: a route must return a page

☐ An HTML page with a heading

☐ Python's print of the dictionary in the console

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The dictionary as JSON. Flask turns a returned dictionary into JSON text, which looks almost exactly like the Python dictionary.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import csv
from flask import Flask, request

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    page = "<h1>Chess club API</h1>"
    page = page + "<p><a href='/api/members'>/api/members</a></p>"
    page = page + "<p><a href='/api/members/Players'>/api/members/Players</a></p>"
    return page


@app.route("/api/members")
def api_members():
    return {"members": load_members()}


@app.route("/api/members/<group>")
def api_group(group):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}


app.run()
```

:::keep-together

### Data for programs

**A weather app shows the club's members. Why would it use /api/members, not the home page?**

☐ Apps cannot open web pages

☐ The home page is secret

☐ JSON is data it can use straight away; a page is HTML made for people, which a program would have to pick apart

☐ JSON is faster to type

:::


:::teacher-note

**Answer:** JSON is data it can use straight away; a page is HTML made for people, which a program would have to pick apart

A program wants the data itself. JSON gives it names and values; HTML mixes them up with headings, links and layout.

:::


:::keep-together

### An empty answer

**What does /api/members/Nobody send?**

☐ An error

☐ {"count": 0, "group": "Nobody", "members": []}

☐ Nothing

☐ A 404 Not Found page

:::


:::teacher-note

**Answer:** {"count": 0, "group": "Nobody", "members": []}

The route still runs; the loop finds nobody, so count is 0 and members is an empty list. An empty answer is still a good answer for a program.

:::


:::keep-together

### Spot the bug

**Visiting /api/members gives 500 Internal Server Error. Click the line that is wrong.**

```
 1  import csv
 2  from flask import Flask
 3  
 4  app = Flask(__name__)
 5  
 6  
 7  def load_members():
 8      with open("members.csv") as f:
 9          return list(csv.DictReader(f))
10  
11  
12  @app.route("/api/members")
13  def api_members():
14      return {"members": load_members}
15  
16  
17  app.run()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 14

load_members without brackets is the function itself, which cannot be sent as JSON. load_members() runs it and gives the list.

:::


:::typical

## Modify


**Stats.** Add `/api/stats`, which sends the number of members in each group.

**Search.** Let `/api/members?name=ad` send only the members whose name contains `ad` (any capitals). The part after `?` is the **query string**; `request.args.get("name", "")` reads it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Stats:**

```python
import csv
from flask import Flask, request

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    page = "<h1>Chess club API</h1>"
    page = page + "<p><a href='/api/members'>/api/members</a></p>"
    page = page + "<p><a href='/api/members/Players'>/api/members/Players</a></p>"
    return page


@app.route("/api/members")
def api_members():
    return {"members": load_members()}


@app.route("/api/members/<group>")
def api_group(group):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}


@app.route("/api/stats")
def api_stats():
    counts = {}
    for m in load_members():
        if m["group"] in counts:
            counts[m["group"]] = counts[m["group"]] + 1
        else:
            counts[m["group"]] = 1
    return counts


app.run()
```

**Search:**

```python
import csv
from flask import Flask, request

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    page = "<h1>Chess club API</h1>"
    page = page + "<p><a href='/api/members'>/api/members</a></p>"
    page = page + "<p><a href='/api/members/Players'>/api/members/Players</a></p>"
    return page


@app.route("/api/members")
def api_members():
    name = request.args.get("name", "").lower()
    found = []
    for m in load_members():
        if name in m["name"].lower():
            found.append(m)
    return {"members": found}


@app.route("/api/members/<group>")
def api_group(group):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}


app.run()
```

:::

:::


## Make: a results API

Make an API for `results.csv`: `/api/results` sends every row, and `/api/leader` sends the player with the most wins and how many. Send wins as numbers, not text.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv
from flask import Flask

app = Flask(__name__)


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@app.route("/api/results")
def api_results():
    rows = []
    for r in load_results():
        rows.append({"player": r["player"], "wins": int(r["wins"])})
    return {"results": rows}


@app.route("/api/leader")
def api_leader():
    rows = load_results()
    leader = rows[0]
    for r in rows:
        if int(r["wins"]) > int(leader["wins"]):
            leader = r
    return {"player": leader["player"], "wins": int(leader["wins"])}


app.run()
```

:::


:::wider

## Where this leads

The optional last lesson builds the same API in FastAPI, where the types of each input are checked for you.

:::


## Exit ticket

:::keep-together

**How is an API route different from a page route?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It sends data (JSON) for a program to use, instead of an HTML page for a person to read.

:::

