---
marp: true
theme: default
html: true
---

# Pages from data

Web apps with Flask · Pages from Python

<!-- Speaker note: Students build pages from a list of dictionaries with a template (Jinja), add a page for each player with an address part that changes, then add a wins column, group pages and a leaders page. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 20 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep the club's players in a list, and let a template build the pages from it: one table for all, and a page for each player.

- I can fill a template from a list with {% for %} and {{ }}.
- I can make a route with a part of the address that changes, such as /player/&lt;name&gt;.
- I can pick items from a list for a page, and say "not found" when there are none.

<!-- Speaker note: Before class: Read the unit primer first. A **template** is HTML with gaps, in Flask's template language (Jinja): `{{ value }}` shows a value and `{% for p in players %} ... {% endfor %}` repeats a part. `render_template_string(PAGE, players=players)` fills it in; the template sees **only** what is passed by name (the bug task forgets to pass it, and the list comes out empty, with no error). In a route, `<name>` matches any word in that place of the address and is passed to the function. A route can return a page and a status: `return "...", 404`. On a computer templates usually live in `templates/` files with `render_template`; the playground keeps them in strings so everything is in one file. -->

---

## Why it matters

> A sports site does not have a hand-written page for every player. It has one template, filled in from data.

<!-- Speaker note: Writing every page by hand stops working when there are many of them. A **template** is HTML with gaps: `{{ p }}` shows a value, and `{% for p in players %}` ... `{% endfor %}` repeats a part for each item in a list. `render_template_string(PAGE, players=players)` fills in the template with the values you pass by name. Each player here is a **dictionary**, which looks a value up by its name (its key): `p["name"]`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**How many list items (li) does the page have?**

- 0
- An error: the template has no data
- 3: one for each player
- 1

<!-- Speaker note: What happens: 3. {% for p in players %} repeats the li for each name in players, and {{ p }} shows the name. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write the li line once on the board, then repeat it for each name. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3. {% for p in players %} repeats the li for each name in players, and {{ p }} shows the name.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/flask/flask-templates/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/flask/flask-templates/?full=step-2#step-2)

<!-- Speaker note: Run it, then click a player's name. The address `/player/<name>` has a part that changes: whatever is in that place of the address is passed to the function as `name`. Try `/player/Zoe` in the address bar. Then add a fifth player to the list and run again. Students should be able to say: I opened two players' pages, and tried /player/Zoe. -->

<!-- Speaker note: Teacher: try /player/Zoe and read the page; ask what 404 tells a browser. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 38 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-templates/?full=step-3#step-3)

<!-- Speaker note: What this step is for: One template plus a list makes as many rows or pages as there is data; a part of the address in angle brackets passes a value to the function. -->

<!-- Speaker note: Teacher: compare the template with the page's source: which parts came from the list? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A part that changes

**Someone visits /player/Leo. What is name inside player()?**

- "Leo"
- players[3]
- "&lt;name&gt;"
- "/player/Leo"

* Answer: "Leo"

<!-- Speaker note: <name> in the route matches whatever is in that place of the address, and Flask passes it to the function as the parameter name. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When there is no such player

**What does return "...", 404 do when no player matches?**

- Sends the number 404 as the page
- Sends two pages
- Stops the app
- Sends the page with the status 404 Not Found, so browsers and search engines know the page is missing

* Answer: Sends the page with the status 404 Not Found, so browsers and search engines know the page is missing

<!-- Speaker note: A route can return the page and a status code. 404 means not found; the normal 200 means OK. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 15

<!-- Speaker note: The template only sees what is passed to it by name. render_template_string(PAGE, players=players) hands the list over. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Wins:** Show each player's **wins** in a third column.
- **A page for each group:** Add `/group/<group>`, a page listing only that group's players (try `/group/Players`), and link to it from each player's page.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-templates/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Showing more is one more gap in the template; a new kind of page is one more route that picks from the data. Hints, in order: Add a Wins heading cell, and a cell with {{ p["wins"] }} in the row. / A new route with a part that changes, like the player route, and a function that keeps only the players in that group. / `@app.route("/group/<group>")`, then `def group_page(group):` with a loop that appends the matching players to a list. / Reuse PAGE: render_template_string(PAGE, players=members). Link to it from the player page. For students who need more support: Give students the group route's loop, and ask them only to write the route line and the return. For early finishers: Sort the leaders by wins, highest first (sorted(leaders, key=lambda p: p["wins"], reverse=True)), or show the number of players in each group on the home page. The hard part, on purpose: Passing data into a template by name. Ask what the template can see, and let them find the missing argument themselves. When students get stuck: The table or list is empty. Ask: Is the list passed to render_template_string by name? Fix: render_template_string(PAGE, players=players). / jinja2.exceptions.TemplateSyntaxError. Ask: Does every {% for %} have an {% endfor %}, and every {{ a }}? Fix: Close each one; check the brackets. / /group/players finds nobody. Ask: Does the address match the data exactly, capitals included? Fix: Use /group/Players, or compare with .lower() on both sides. -->

<!-- Speaker note: Teacher: test /group/Players and /group/Nobody. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the leaders

Add a `/leaders` page: the players with **3 or more wins**, as a numbered list, made with a template of your own.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-templates/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a route that picks from the data, and a template of your own to show it. -->

---

## Where this leads

On a computer, templates usually live in their own files in a `templates` folder, loaded with `render_template("club.html", ...)`; the `{{ }}` and `{% %}` work exactly the same. Next: a form that adds players.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does {% for p in players %} do in a template?**

* Repeats the part up to {% endfor %} once for each item in players, with p as that item.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds a form that adds players, then saving them to a file. Data detective's tables and this template idea meet again in any web dashboard. -->
