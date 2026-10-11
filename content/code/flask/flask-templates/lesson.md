---
order: 2
unit: pages
title: Pages from data
summary: "Keep the club's players in a list, and let a template build the pages from it: one table for all, and a page for each player."
introduces: [dict]
language: python
hook: "A sports site does not have a hand-written page for every player. It has one template, filled in from data."
---
Writing every page by hand stops working when there are many of them. A **template** is HTML with gaps: `{{ p }}` shows a value, and `{% for p in players %}` ... `{% endfor %}` repeats a part for each item in a list. `render_template_string(PAGE, players=players)` fills in the template with the values you pass by name. Each player here is a **dictionary**, which looks a value up by its name (its key): `p["name"]`.

## Predict

```step
stage: predict
code: club.py#predict
check:
  type: predict
  q: "How many list items (li) does the page have?"
  options: ["3: one for each player", "1", "0", "An error: the template has no data"]
  actual: "3. {% for p in players %} repeats the li for each name in players, and {{ p }} shows the name."
```

The `li` line is written once in the template. What does `{% for %}` do with it?

## Run

```step
stage: run
code: club.py#run
try: { playground: python, starter: "club.py#run", height: 540 }
check: { type: reflect, text: "I opened two players' pages, and tried /player/Zoe." }
unlocks: [a-page-from-a-template, an-address-with-a-part-that-changes]
```

Run it, then click a player's name. The address `/player/<name>` has a part that changes: whatever is in that place of the address is passed to the function as `name`. Try `/player/Zoe` in the address bar. Then add a fifth player to the list and run again.

## Investigate

```step
stage: investigate
code: club.py#run
insight: "One template plus a list makes as many rows or pages as there is data; a part of the address in angle brackets passes a value to the function."
tasks:
  - check:
      type: question
      q: "Someone visits /player/Leo. What is name inside player()?"
      options: ["\"Leo\"", "\"/player/Leo\"", "\"<name>\"", "players[3]"]
      answer: 0
      explain: "<name> in the route matches whatever is in that place of the address, and Flask passes it to the function as the parameter name."
  - check:
      type: question
      q: "What does return \"...\", 404 do when no player matches?"
      options: ["Sends the page with the status 404 Not Found, so browsers and search engines know the page is missing", "Sends the number 404 as the page", "Stops the app", "Sends two pages"]
      answer: 0
      explain: "A route can return the page and a status code. 404 means not found; the normal 200 means OK."
  - check:
      type: bug
      code: club.py#bug
      text: "The page shows an empty list, though players has two names. Click the line that is wrong."
      answer: 15
      fault: logic
      misconception: template-vars
      explain: "The template only sees what is passed to it by name. render_template_string(PAGE, players=players) hands the list over."
```

### A part that changes

What the function receives.

### When there is no such player

A page and a status code.

### Spot the bug

A template with nothing to show.

## Modify

```step
stage: modify
insight: "Showing more is one more gap in the template; a new kind of page is one more route that picks from the data."
try: { playground: python, starter: "club.py#run", height: 540 }
tasks:
  - hint: "Add a Wins heading cell, and a cell with {{ p[\"wins\"] }} in the row."
    check: { type: code, text: "Show each player's wins in a third column of the table.", rules: { contains: ["p[\"wins\"]"] } }
  - hint:
      - "A new route with a part that changes, like the player route, and a function that keeps only the players in that group."
      - "`@app.route(\"/group/<group>\")`, then `def group_page(group):` with a loop that appends the matching players to a list."
      - "Reuse PAGE: render_template_string(PAGE, players=members). Link to it from the player page."
    check: { type: code, text: "Add a page for each group, /group/<group>, listing only its players.", rules: { contains: ["@app.route(\"/group/<group>\")"] } }
```

### Wins

Show each player's **wins** in a third column.

### A page for each group

Add `/group/<group>`, a page listing only that group's players (try `/group/Players`), and link to it from each player's page.

## Make: the leaders

```step
stage: make
insight: "Goals only: a route that picks from the data, and a template of your own to show it."
try: { playground: python, starter: "club.py#make", height: 540 }
check: { type: code, text: "Add a /leaders page listing the players with 3 or more wins, built with a template.", rules: { contains: ["@app.route(\"/leaders\")", "render_template_string("] } }
```

Add a `/leaders` page: the players with **3 or more wins**, as a numbered list, made with a template of your own.

## Where this leads

```step
stage: info
check:
  type: question
  q: "The club gets 200 players. What changes in your app?"
  options: ["Only the data: the same template and routes make every page", "200 new routes", "200 templates", "A new app"]
  answer: 0
  explain: "This is why sites use templates: the code stays the same size however much data there is."
```

On a computer, templates usually live in their own files in a `templates` folder, loaded with `render_template("club.html", ...)`; the `{{ }}` and `{% %}` work exactly the same. Next: a form that adds players.
