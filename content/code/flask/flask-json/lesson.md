---
order: 5
unit: apis
title: An API for the club
summary: "Send the club's data as JSON, so other programs (an app, a game, another website) can read it: routes that return data instead of pages."
language: python
hook: "Weather apps, maps and music players get their data from APIs: addresses that send back data for programs, not pages for people."
---
A page is for people to read. An **API** is for programs: it sends back **data**. In Flask, a route that returns a **dictionary** sends it as **JSON**, a text format almost every language can read. The App tab shows JSON neatly; another program would turn it straight back into a dictionary or list.

## Predict

```step
stage: predict
code: api.py#predict
check:
  type: predict
  q: "Someone visits /api/club. What do they get?"
  options: ["The dictionary as JSON text: the name, the room number and the list of days", "An HTML page with a heading", "Python's print of the dictionary in the console", "An error: a route must return a page"]
  actual: "The dictionary as JSON. Flask turns a returned dictionary into JSON text, which looks almost exactly like the Python dictionary."
```

The function returns a dictionary, not HTML. What does Flask send?

## Run

```step
stage: run
code: api.py#run
try: { playground: python, starter: "api.py#run", files: [members.csv], height: 540 }
check: { type: reflect, text: "I opened both API addresses, and tried a group with no members." }
unlocks: [send-json]
```

Run it and follow the links, then try `/api/members/Champions` and `/api/members/Nobody` in the address bar. The members come from `members.csv`, so anyone who joined last lesson is here too.

## Investigate

```step
stage: investigate
code: api.py#run
insight: "An API route returns data, not a page: a dictionary (of numbers, text and lists) sent as JSON, which any program can read."
tasks:
  - check:
      type: question
      q: "A weather app shows the club's members. Why would it use /api/members, not the home page?"
      options: ["JSON is data it can use straight away; a page is HTML made for people, which a program would have to pick apart", "The home page is secret", "Apps cannot open web pages", "JSON is faster to type"]
      answer: 0
      explain: "A program wants the data itself. JSON gives it names and values; HTML mixes them up with headings, links and layout."
  - check:
      type: question
      q: "What does /api/members/Nobody send?"
      options: ["{\"count\": 0, \"group\": \"Nobody\", \"members\": []}", "A 404 Not Found page", "An error", "Nothing"]
      answer: 0
      explain: "The route still runs; the loop finds nobody, so count is 0 and members is an empty list. An empty answer is still a good answer for a program."
  - check:
      type: bug
      code: api.py#bug
      text: "Visiting /api/members gives 500 Internal Server Error. Click the line that is wrong."
      answer: 14
      fault: runtime
      misconception: call-parens
      explain: "load_members without brackets is the function itself, which cannot be sent as JSON. load_members() runs it and gives the list."
```

### Data for programs

Why an app wants JSON.

### An empty answer

What a program gets when nothing matches.

### Spot the bug

A function that was never run.

## Modify

```step
stage: modify
insight: "Each question a program might ask is one more route, or one more part of the address, answered with data."
try: { playground: python, starter: "api.py#run", files: [members.csv], height: 540 }
tasks:
  - hint: "Count the members of each group in a dictionary (as in Data detective's bar chart) and return the dictionary."
    check: { type: code, text: "Add /api/stats, which sends how many members each group has.", rules: { contains: ["@app.route(\"/api/stats\")"] } }
  - hint:
      - "An address can end with ?name=ad. request.args.get(\"name\", \"\") gives \"ad\" (or \"\" if there is none)."
      - "Keep the members whose name contains it: if name in m[\"name\"].lower():"
    check: { type: code, text: "Let /api/members?name=ad find members whose name contains ad.", rules: { contains: ["request.args"] } }
```

### Stats

Add `/api/stats`, which sends the number of members in each group.

### Search

Let `/api/members?name=ad` send only the members whose name contains `ad` (any capitals). The part after `?` is the **query string**; `request.args.get("name", "")` reads it.

## Make: a results API

```step
stage: make
insight: "Goals only: an API of your own on a data file, with routes that answer the questions a program would ask."
try: { playground: python, starter: "api.py#make", files: [results.csv], height: 540 }
check: { type: code, text: "Make an API for results.csv: /api/results with every row, and /api/leader with the player who has the most wins.", rules: { contains: ["results.csv", "@app.route(\"/api/"] } }
```

Make an API for `results.csv`: `/api/results` sends every row, and `/api/leader` sends the player with the most wins and how many. Send wins as numbers, not text.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Anyone who knows the address can read /api/members. What should a real club API think about?"
  options: ["Which data is safe to share, and whether some routes need a login", "Nothing: data on the web is public anyway", "Making the JSON shorter", "Using HTML instead"]
  answer: 0
  explain: "An API shares data with any program that asks. Real APIs share only what they should, and protect the rest with logins and keys."
```

The optional last lesson builds the same API in FastAPI, where the types of each input are checked for you.
