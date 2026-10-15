---
marp: true
theme: default
html: true
---

# An API for the club

Web apps with Flask · APIs

<!-- Speaker note: Students turn the club's data into an API, with routes that return dictionaries sent as JSON, then add a stats route, a search with a query string and an API of their own for the results. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** send the club's data as JSON, so other programs (an app, a game, another website) can read it: routes that return data instead of pages.

- I can explain the difference between a page for people and an API for programs.
- I can make a Flask route that sends data as JSON.
- I can read a query string with request.args.

<!-- Speaker note: Before class: Read the unit primer first. A Flask route that returns a dictionary sends it as **JSON** (Flask sorts the keys); the App tab shows it neatly. An **API** is a set of addresses that send data for programs, not pages for people. The lesson reads `members.csv` from Lesson 4 (the Files tab can put the original back). The bug task returns the function `load_members` instead of calling it, giving 500 Internal Server Error (the console shows the error: a function cannot be sent as JSON). The query string (`?name=ad`) is read with `request.args.get("name", "")`, where the second value is used when it is missing. The info question raises privacy: an API shares data with anyone who asks. Teacher: Info: discuss what in members.csv should not be public (if it had emails or year levels). -->

---

## Why it matters

> Weather apps, maps and music players get their data from APIs: addresses that send back data for programs, not pages for people.

<!-- Speaker note: A page is for people to read. An **API** is for programs: it sends back **data**. In Flask, a route that returns a **dictionary** sends it as **JSON**, a text format almost every language can read. The App tab shows JSON neatly; another program would turn it straight back into a dictionary or list. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from flask import Flask

app = Flask(__name__)


@app.route("/api/club")
def club():
    return {"name": "Chess club", "room": 12, "days": ["Tuesday", "Thursday"]}


app.run()
```

**Someone visits /api/club. What do they get?**

- The dictionary as JSON text: the name, the room number and the list of days
- An error: a route must return a page
- An HTML page with a heading
- Python's print of the dictionary in the console

<!-- Speaker note: What happens: The dictionary as JSON. Flask turns a returned dictionary into JSON text, which looks almost exactly like the Python dictionary. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: compare the dictionary in the code with the JSON on screen. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The dictionary as JSON. Flask turns a returned dictionary into JSON text, which looks almost exactly like the Python dictionary.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/flask/flask-json/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/flask/flask-json/?full=step-2#step-2)

<!-- Speaker note: Run it and follow the links, then try `/api/members/Champions` and `/api/members/Nobody` in the address bar. The members come from `members.csv`, so anyone who joined last lesson is here too. Students should be able to say: I opened both API addresses, and tried a group with no members. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 35 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-json/?full=step-3#step-3)

<!-- Speaker note: What this step is for: An API route returns data, not a page: a dictionary (of numbers, text and lists) sent as JSON, which any program can read. -->

<!-- Speaker note: Teacher: ask which is easier for a program: the home page HTML or the JSON? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Data for programs

**A weather app shows the club's members. Why would it use /api/members, not the home page?**

- Apps cannot open web pages
- The home page is secret
- JSON is data it can use straight away; a page is HTML made for people, which a program would have to pick apart
- JSON is faster to type

* Answer: JSON is data it can use straight away; a page is HTML made for people, which a program would have to pick apart

<!-- Speaker note: A program wants the data itself. JSON gives it names and values; HTML mixes them up with headings, links and layout. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## An empty answer

**What does /api/members/Nobody send?**

- An error
- {"count": 0, "group": "Nobody", "members": []}
- Nothing
- A 404 Not Found page

* Answer: {"count": 0, "group": "Nobody", "members": []}

<!-- Speaker note: The route still runs; the loop finds nobody, so count is 0 and members is an empty list. An empty answer is still a good answer for a program. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 14

<!-- Speaker note: load_members without brackets is the function itself, which cannot be sent as JSON. load_members() runs it and gives the list. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Stats:** Add `/api/stats`, which sends the number of members in each group.
- **Search:** Let `/api/members?name=ad` send only the members whose name contains `ad` (any capitals). The part after `?` is the **query string**; `request.args.get("name", 

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-json/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each question a program might ask is one more route, or one more part of the address, answered with data. Hints, in order: Count the members of each group in a dictionary (as in Data detective's bar chart) and return the dictionary. / An address can end with ?name=ad. request.args.get("name", "") gives "ad" (or "" if there is none). / Keep the members whose name contains it: if name in m["name"].lower(): For students who need more support: Give students the stats loop, and ask them only to write the route and the return. For early finishers: Add /api/members/<group>/count that sends only a number, and explain why a program might want that. The hard part, on purpose: Seeing JSON as data for programs, not a page. Ask how another program would use the reply, before adding routes. When students get stuck: 500 Internal Server Error and "not JSON serializable" in the console. Ask: Is something in the dictionary a function, or not a number, text, list or dictionary? Fix: Call the function: load_members(). / The search finds nobody. Ask: Are both sides lower case? Fix: name in m["name"].lower(), with name lowered too. / Wins come out as "5" in quotes. Ask: Is wins text or a number in the dictionary? Fix: int(r["wins"]). -->

<!-- Speaker note: Teacher: the stats route is Data detective's counting dictionary again; point that out to students who did it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a results API

Make an API for `results.csv`: `/api/results` sends every row, and `/api/leader` sends the player with the most wins and how many. Send wins as numbers, not text.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-json/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: an API of your own on a data file, with routes that answer the questions a program would ask. -->

---

## Where this leads

The optional last lesson builds the same API in FastAPI, where the types of each input are checked for you.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**How is an API route different from a page route?**

* It sends data (JSON) for a program to use, instead of an HTML page for a person to read.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The optional FastAPI lesson builds the same API with type checks done for you. Data detective's optional API lesson calls real APIs such as Wikidata. -->
