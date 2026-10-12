---
title: "Join the club"
subtitle: "Web apps with Flask · Forms and saving · Lesson 3"
---

# Join the club

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In HTML & CSS the Join button did nothing. Now Python is behind the form, so it can really sign people up.


:::teacher-note

**In one sentence:** Students make the club page's sign-up form work with Flask, reading the answers with request.form and redirecting home, then refuse blank names, add a year level and build a form that records a win.

**Students should be able to say:** I can send a form to a route with method="post" and read its answers with request.form. I can explain why a form ends with a redirect. I can check what a form sends on the server, and reply with a message.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Follow the answer: the form sends it to `/join`, `join()` appends it, then `redirect("/")` goes back home.

```python
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
members = ["Ada"]

PAGE = """<p>{{ members }}</p>
<form method="post" action="/join">
  <input name="name">
  <button>Join</button>
</form>"""


@app.route("/")
def home():
    return render_template_string(PAGE, members=members)


@app.route("/join", methods=["POST"])
def join():
    members.append(request.form["name"])
    return redirect("/")


app.run()
```

:::keep-together

**You type Zoe and press Join. What does the page show?**

☐ ['Ada']

☐ ['Ada', 'Zoe']

☐ ['Zoe']

☐ An error: Zoe is not in the list

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** ['Ada', 'Zoe']. join() appends what was typed in the box named name, then redirect("/") shows the home page again, with the longer list.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
members = [
    {"name": "Ada", "group": "Champions"},
    {"name": "Sam", "group": "Players"},
]

PAGE = """<h1>Chess club</h1>
<h2>Members</h2>
<ul>
{% for m in members %}
  <li>{{ m["name"] }} ({{ m["group"] }})</li>
{% endfor %}
</ul>
<h2>Join the club</h2>
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


@app.route("/")
def home():
    return render_template_string(PAGE, members=members)


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    members.append({"name": name, "group": group})
    return redirect("/")


app.run()
```

:::keep-together

### Back home

**Why does join() end with redirect("/") instead of returning a page?**

☐ Because POST routes cannot return HTML

☐ To stop the form being sent

☐ So the browser goes back to the home page, which shows the list with the new member

☐ To save the member

:::


:::teacher-note

**Answer:** So the browser goes back to the home page, which shows the list with the new member

The home route already shows the members. Redirecting there after a change is the usual pattern, and reloading the page then does not send the form twice.

:::


:::keep-together

### A choice from a list

**What does request.form["group"] give when someone chooses Champions?**

☐ 3, because it is the third option

☐ "Champions"

☐ "group"

☐ The whole form

:::


:::teacher-note

**Answer:** "Champions"

A select sends the chosen option's text under its name, group.

:::


:::keep-together

### Spot the bug

**Pressing Join gives 400 Bad Request. Click the line that is wrong.**

```
 1  from flask import Flask, render_template_string, request, redirect
 2  
 3  app = Flask(__name__)
 4  members = []
 5  
 6  PAGE = """<form method="post" action="/join">
 7    <label for="name">Name</label>
 8    <input id="name">
 9    <button>Join</button>
10  </form>"""
11  
12  
13  @app.route("/")
14  def home():
15      return render_template_string(PAGE)
16  
17  
18  @app.route("/join", methods=["POST"])
19  def join():
20      members.append(request.form["name"])
21      return redirect("/")
22  
23  
24  app.run()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

The box has an id but no name, so the form sends nothing for it, and request.form["name"] has nothing to find. name="name" sends it.

:::


:::typical

## Modify


**No blank names.** Press Join with an empty box: a member with no name appears. Make the app refuse a blank name and say why.

**Year level.** Ask for each member's **year** as well, and show it in the list.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**No blank names:**

```python
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
members = [
    {"name": "Ada", "group": "Champions"},
    {"name": "Sam", "group": "Players"},
]

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


@app.route("/")
def home():
    return render_template_string(PAGE, members=members)


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=members, error="Please type your name.")
    members.append({"name": name, "group": group})
    return redirect("/")


app.run()
```

**Year level:**

```python
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
members = [
    {"name": "Ada", "group": "Champions", "year": "9"},
    {"name": "Sam", "group": "Players", "year": "8"},
]

PAGE = """<h1>Chess club</h1>
<h2>Members</h2>
<ul>
{% for m in members %}
  <li>{{ m["name"] }} ({{ m["group"] }}, Year {{ m["year"] }})</li>
{% endfor %}
</ul>
<h2>Join the club</h2>
<form method="post" action="/join">
  <label for="name">Name</label>
  <input id="name" name="name">
  <label for="group">Group</label>
  <select id="group" name="group">
    <option>Beginners</option>
    <option>Players</option>
    <option>Champions</option>
  </select>
  <label for="year">Year</label>
  <input id="year" name="year">
  <button>Join</button>
</form>"""


@app.route("/")
def home():
    return render_template_string(PAGE, members=members)


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    year = request.form["year"]
    members.append({"name": name, "group": group, "year": year})
    return redirect("/")


app.run()
```

:::

:::


## Make: record a win

Add a form under the results table: a dropdown of the players (made by the template) and an **Add a win** button that adds 1 to that player's wins.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
players = [
    {"name": "Ada", "wins": 5},
    {"name": "Sam", "wins": 4},
    {"name": "Mia", "wins": 1},
]

PAGE = """<h1>Results</h1>
<table>
  <tr><th>Player</th><th>Wins</th></tr>
  {% for p in players %}
  <tr><td>{{ p["name"] }}</td><td>{{ p["wins"] }}</td></tr>
  {% endfor %}
</table>
<h2>Record a win</h2>
<form method="post" action="/win">
  <select name="player">
    {% for p in players %}
    <option>{{ p["name"] }}</option>
    {% endfor %}
  </select>
  <button>Add a win</button>
</form>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/win", methods=["POST"])
def win():
    name = request.form["player"]
    for p in players:
        if p["name"] == name:
            p["wins"] = p["wins"] + 1
    return redirect("/")


app.run()
```

:::


:::wider

## Where this leads

The members disappear on every Run, because they live in a variable. Next: save them to a file so they last.

:::


## Exit ticket

:::keep-together

**A form box has id="name" but no name attribute. What does the server get from it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing: only boxes with a name attribute are sent, under that name.

:::

