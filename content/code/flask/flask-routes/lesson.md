---
order: 1
unit: pages
introduces: [decorator]
recipes: [object]
title: A page from Python
summary: "Make a website whose pages come from Python: each address is a route, and a function gives back its page."
language: python
hook: "Every website you use has code behind it that decides what page to send back. With Flask, a few lines of Python do it."
app:
  # The whole site is served: the Python playground loads Pyodide from ../_pyodide/. (_playground-py names the playground for the clip cache.)
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist\" 8123 _playground-py"
  url: "http://127.0.0.1:8123/_playground-py/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@club.py#predict" }
  caption: "Each route joins an address to a function; the function's return is the page"
  say: "Each route joins an address to a function, which returns the page."
  clip:
    - caption:
        text: "@app.route(\"/\") joins the address / to the function home."
        say: "app dot route, slash, joins the address slash to the function home."
    - click: Run
    - expect: { selector: "#addr", value: "/" }
    - wait: 1500
    - caption:
        text: "Visit /about, and Flask runs about() and sends back what it returns."
        say: "Visit slash about, and Flask runs the about function, and sends back what it returns."
    - type: { selector: "#addr", text: "/about" }
    - press: Enter
    - expect: { selector: "#addr", value: "/about" }
    - wait: 2500
---
In HTML & CSS you wrote pages by hand. A **web app** makes its pages with code, so they can change: show the latest sign-ups, answer a form, look things up. **Flask** is a small Python library for this. Each address in the site (`/`, `/about`) is a **route**, and each route has a function that gives back the page as HTML.

The first lines (`from flask import Flask` and `app = Flask(__name__)`) set up the app: copy them as they are. In this playground, `app.run()` shows your site in the **App** tab, with an address bar. On a computer it would be a real web server at `http://127.0.0.1:5000`.

## Predict

```step
stage: predict
code: club.py#predict
check:
  type: predict
  q: "Someone visits /about. What does the site send back?"
  options: ["A page with the heading About and \"Everyone is welcome.\"", "The Chess club page", "Both pages, one after the other", "Nothing: about() is never called"]
  actual: "The About page. @app.route(\"/about\") joins the address /about to the function about(), so Flask calls it and sends back the HTML it returns."
```

The line above each function, starting with `@`, is a **decorator**: it joins a function to an address. Which function answers `/about`?

## Run

```step
stage: run
code: club.py#run
try: { playground: python, starter: "club.py#run", height: 520 }
check: { type: reflect, text: "I visited both pages with the links and the address bar, and tried an address that does not exist." }
unlocks: [a-flask-route]
```

Run it, then use the links on the page, and type addresses in the bar above it: `/about`, then `/missing`. Change the home page's text and run again.

## Investigate

```step
stage: investigate
code: club.py#run
insight: "A route joins an address to a function; whatever the function returns is the page, built as text."
tasks:
  - check:
      type: question
      q: "What does a visitor see at /missing?"
      options: ["A Not Found page (error 404): no route matches that address", "The home page", "An empty page", "Python stops with an error"]
      answer: 0
      explain: "Flask looks for a route that matches the address. With none, it sends back the standard 404 Not Found page, as every website does."
  - check:
      type: question
      q: "home() builds page with page = page + ... three times. What is the page?"
      options: ["One piece of HTML text, joined from three parts", "Three separate pages", "A list of three lines", "Only the last part"]
      answer: 0
      explain: "page is text; each line adds more HTML to the end. The browser shows the whole thing as one page."
  - check:
      type: bug
      code: club.py#bug
      text: "Clicking \"About the club\" shows Not Found, though about() is written. Click the line where the problem is."
      answer: 11
      fault: logic
      misconception: route-missing
      explain: "about() has no @app.route(\"/about\") above it, so no address leads to it. A function only becomes a page when a route points to it."
```

### An address with no route

What every site does.

### Building the page

Text, joined together.

### Spot the bug

A page that cannot be reached.

## Modify

```step
stage: modify
insight: "A new page is a new route and a function; a link to it is an a tag with its address."
try: { playground: python, starter: "club.py#run", height: 520 }
tasks:
  - hint:
      - "Copy the about route: @app.route(\"/results\"), def results():, and return a heading and a table."
      - "Add a link to it on the home page: `<a href='/results'>Results</a>`."
    check: { type: code, text: "Add a /results page with a table of players and wins, and link to it from the home page.", rules: { contains: ["@app.route(\"/results\")", "href='/results'"] } }
  - hint:
      - "visits = 0 before the routes. In home(): global visits, then visits = visits + 1."
      - "Add the number to the page with str(visits)."
    check: { type: code, text: "Count how many times the home page has been visited, and show the count on it.", rules: { contains: ["visits = visits + 1"] } }
```

### A results page

Add a `/results` page with a small table of players and their wins (as on the club page in HTML & CSS), and a link to it from the home page.

### A visit counter

Count the visits to the home page and show the number on it. Visit it a few times, then press **Run** again: what happens to the count?

## Make: your own site

```step
stage: make
insight: "Goals only: several routes, each with its own page, linked together."
try: { playground: python, starter: "club.py#make", height: 520 }
check: { type: code, text: "Make a site with a home page and at least two more pages, linked to each other.", rules: { contains: ["@app.route(\"/\")", "href="], defs: 3 } }
```

Make a small site for a club, a team or a hobby: a home page and at least two more pages, each linking back home.

## Where this leads

```step
stage: info
check:
  type: question
  q: "The visit counter went back to 0 when you pressed Run. Why?"
  options: ["visits lives in the running program; a new run starts it again from 0", "Flask deletes old pages", "The browser forgot it", "Counters only work on a real server"]
  answer: 0
  explain: "Variables last only while the program runs. To keep sign-ups or counts, a web app saves them to a file or a database: that comes in Lesson 4."
```

Every web app has this shape: addresses, and code that answers them. Next: build pages from data instead of writing every one by hand.
