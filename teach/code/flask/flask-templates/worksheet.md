---
title: "Pages from data"
subtitle: "Web apps with Flask · Pages from Python · Lesson 2"
---

# Pages from data

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A sports site does not have a hand-written page for every player. It has one template, filled in from data.


:::teacher-note

**In one sentence:** Students build pages from a list of dictionaries with a template (Jinja), add a page for each player with an address part that changes, then add a wins column, group pages and a leaders page.

**Students should be able to say:** I can fill a template from a list with {% for %} and {{ }}. I can make a route with a part of the address that changes, such as /player/&lt;name&gt;. I can pick items from a list for a page, and say "not found" when there are none.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The `li` line is written once in the template. What does `{% for %}` do with it?

```python
from flask import Flask, render_template_string

app = Flask(__name__)
players = ["Ada", "Sam", "Mia"]

PAGE = """<h1>Players</h1>
<ul>
{% for p in players %}
  <li>{{ p }}</li>
{% endfor %}
</ul>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


app.run()
```

:::keep-together

**How many list items (li) does the page have?**

☐ 0

☐ An error: the template has no data

☐ 3: one for each player

☐ 1

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3. {% for p in players %} repeats the li for each name in players, and {{ p }} shows the name.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

PAGE = """<h1>Chess club</h1>
<table>
  <tr><th>Player</th><th>Group</th></tr>
  {% for p in players %}
  <tr><td><a href="/player/{{ p['name'] }}">{{ p["name"] }}</a></td><td>{{ p["group"] }}</td></tr>
  {% endfor %}
</table>"""

PLAYER = """<h1>{{ p["name"] }}</h1>
<p>Group: {{ p["group"] }}</p>
<p><a href="/">All players</a></p>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/player/<name>")
def player(name):
    for p in players:
        if p["name"] == name:
            return render_template_string(PLAYER, p=p)
    return "<h1>No player called " + name + "</h1>", 404


app.run()
```

:::keep-together

### A part that changes

**Someone visits /player/Leo. What is name inside player()?**

☐ "Leo"

☐ players[3]

☐ "&lt;name&gt;"

☐ "/player/Leo"

:::


:::teacher-note

**Answer:** "Leo"

&lt;name&gt; in the route matches whatever is in that place of the address, and Flask passes it to the function as the parameter name.

:::


:::keep-together

### When there is no such player

**What does return "...", 404 do when no player matches?**

☐ Sends the number 404 as the page

☐ Sends two pages

☐ Stops the app

☐ Sends the page with the status 404 Not Found, so browsers and search engines know the page is missing

:::


:::teacher-note

**Answer:** Sends the page with the status 404 Not Found, so browsers and search engines know the page is missing

A route can return the page and a status code. 404 means not found; the normal 200 means OK.

:::


:::keep-together

### Spot the bug

**The page shows an empty list, though players has two names. Click the line that is wrong.**

```
 1  from flask import Flask, render_template_string
 2  
 3  app = Flask(__name__)
 4  players = [{"name": "Ada"}, {"name": "Sam"}]
 5  
 6  PAGE = """<ul>
 7  {% for p in players %}
 8    <li>{{ p["name"] }}</li>
 9  {% endfor %}
10  </ul>"""
11  
12  
13  @app.route("/")
14  def home():
15      return render_template_string(PAGE)
16  
17  
18  app.run()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 15

The template only sees what is passed to it by name. render_template_string(PAGE, players=players) hands the list over.

:::


:::typical

## Modify


**Wins.** Show each player's **wins** in a third column.

**A page for each group.** Add `/group/<group>`, a page listing only that group's players (try `/group/Players`), and link to it from each player's page.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Wins:**

```python
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

PAGE = """<h1>Chess club</h1>
<table>
  <tr><th>Player</th><th>Group</th><th>Wins</th></tr>
  {% for p in players %}
  <tr><td><a href="/player/{{ p['name'] }}">{{ p["name"] }}</a></td><td>{{ p["group"] }}</td><td>{{ p["wins"] }}</td></tr>
  {% endfor %}
</table>"""

PLAYER = """<h1>{{ p["name"] }}</h1>
<p>Group: {{ p["group"] }}</p>
<p><a href="/">All players</a></p>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/player/<name>")
def player(name):
    for p in players:
        if p["name"] == name:
            return render_template_string(PLAYER, p=p)
    return "<h1>No player called " + name + "</h1>", 404


app.run()
```

**A page for each group:**

```python
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

PAGE = """<h1>Chess club</h1>
<table>
  <tr><th>Player</th><th>Group</th></tr>
  {% for p in players %}
  <tr><td><a href="/player/{{ p['name'] }}">{{ p["name"] }}</a></td><td>{{ p["group"] }}</td></tr>
  {% endfor %}
</table>"""

PLAYER = """<h1>{{ p["name"] }}</h1>
<p>Group: <a href="/group/{{ p['group'] }}">{{ p["group"] }}</a></p>
<p><a href="/">All players</a></p>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/player/<name>")
def player(name):
    for p in players:
        if p["name"] == name:
            return render_template_string(PLAYER, p=p)
    return "<h1>No player called " + name + "</h1>", 404


@app.route("/group/<group>")
def group_page(group):
    members = []
    for p in players:
        if p["group"] == group:
            members.append(p)
    return render_template_string(PAGE, players=members)


app.run()
```

:::

:::


## Make: the leaders

Add a `/leaders` page: the players with **3 or more wins**, as a numbered list, made with a template of your own.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

LEADERS = """<h1>Leaders</h1>
<ol>
{% for p in leaders %}
  <li>{{ p["name"] }}: {{ p["wins"] }} wins</li>
{% endfor %}
</ol>"""


@app.route("/leaders")
def leaders_page():
    leaders = []
    for p in players:
        if p["wins"] >= 3:
            leaders.append(p)
    return render_template_string(LEADERS, leaders=leaders)


app.run()
```

:::


:::wider

## Where this leads

On a computer, templates usually live in their own files in a `templates` folder, loaded with `render_template("club.html", ...)`; the `{{ }}` and `{% %}` work exactly the same. Next: a form that adds players.

:::


## Exit ticket

:::keep-together

**What does {% for p in players %} do in a template?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Repeats the part up to {% endfor %} once for each item in players, with p as that item.

:::

