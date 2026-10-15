---
title: "A page from Python"
subtitle: "Web apps with Flask · Pages from Python · Lesson 1"
---

# A page from Python

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website you use has code behind it that decides what page to send back. With Flask, a few lines of Python do it.


:::teacher-note

**In one sentence:** Students meet Flask, where each address is a route joined to a function that returns the page as HTML, then add a results page, a visit counter and a small site of their own.

**Students should be able to say:** I can explain what a route is and how Flask chooses the function for an address. I can add a page to a Flask app and link to it. I can explain why a variable in a web app resets when the program runs again.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The line above each function, starting with `@`, is a **decorator**: it joins a function to an address. Which function answers `/about`?

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "<h1>Chess club</h1><p>Lunchtime, Room 12</p>"


@app.route("/about")
def about():
    return "<h1>About</h1><p>Everyone is welcome.</p>"


app.run()
```

:::keep-together

**Someone visits /about. What does the site send back?**

☐ Both pages, one after the other

☐ Nothing: about() is never called

☐ A page with the heading About and "Everyone is welcome."

☐ The Chess club page

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The About page. @app.route("/about") joins the address /about to the function about(), so Flask calls it and sends back the HTML it returns.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    page = "<h1>Chess club</h1>"
    page = page + "<p>Lunchtime on Tuesdays, Room 12.</p>"
    page = page + "<p><a href='/about'>About the club</a></p>"
    return page


@app.route("/about")
def about():
    return "<h1>About</h1><p>Everyone is welcome, from beginners to champions.</p><p><a href='/'>Home</a></p>"


app.run()
```

:::keep-together

### An address with no route

**What does a visitor see at /missing?**

☐ An empty page

☐ Python stops with an error

☐ The home page

☐ A Not Found page (error 404): no route matches that address

:::


:::teacher-note

**Answer:** A Not Found page (error 404): no route matches that address

Flask looks for a route that matches the address. With none, it sends back the standard 404 Not Found page, as every website does.

:::


:::keep-together

### Building the page

**home() builds page with page = page + ... three times. What is the page?**

☐ Three separate pages

☐ Only the last part

☐ A list of three lines

☐ One piece of HTML text, joined from three parts

:::


:::teacher-note

**Answer:** One piece of HTML text, joined from three parts

page is text; each line adds more HTML to the end. The browser shows the whole thing as one page.

:::


:::keep-together

### Spot the bug

**Clicking "About the club" shows Not Found, though about() is written. Click the line where the problem is.**

```
 1  from flask import Flask
 2  
 3  app = Flask(__name__)
 4  
 5  
 6  @app.route("/")
 7  def home():
 8      return "<h1>Chess club</h1><p><a href='/about'>About the club</a></p>"
 9  
10  
11  def about():
12      return "<h1>About</h1><p>Everyone is welcome.</p>"
13  
14  
15  app.run()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 11

about() has no @app.route("/about") above it, so no address leads to it. A function only becomes a page when a route points to it.

:::


:::typical

## Modify


**A results page.** Add a `/results` page with a small table of players and their wins (as on the club page in HTML & CSS), and a link to it from the home page.

**A visit counter.** Count the visits to the home page and show the number on it. Visit it a few times, then press **Run** again: what happens to the count?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A results page:**

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    page = "<h1>Chess club</h1>"
    page = page + "<p>Lunchtime on Tuesdays, Room 12.</p>"
    page = page + "<p><a href='/about'>About the club</a></p>"
    page = page + "<p><a href='/results'>Results</a></p>"
    return page


@app.route("/about")
def about():
    return "<h1>About</h1><p>Everyone is welcome, from beginners to champions.</p><p><a href='/'>Home</a></p>"


@app.route("/results")
def results():
    return "<h1>Results</h1><table><tr><th>Player</th><th>Wins</th></tr><tr><td>Ada</td><td>5</td></tr><tr><td>Sam</td><td>4</td></tr></table><p><a href='/'>Home</a></p>"


app.run()
```

**A visit counter:**

```python
from flask import Flask

app = Flask(__name__)
visits = 0


@app.route("/")
def home():
    global visits
    visits = visits + 1
    page = "<h1>Chess club</h1>"
    page = page + "<p>Lunchtime on Tuesdays, Room 12.</p>"
    page = page + "<p><a href='/about'>About the club</a></p>"
    page = page + "<p>This page has been visited " + str(visits) + " times.</p>"
    return page


@app.route("/about")
def about():
    return "<h1>About</h1><p>Everyone is welcome, from beginners to champions.</p><p><a href='/'>Home</a></p>"


app.run()
```

:::

:::


## Make: your own site

Make a small site for a club, a team or a hobby: a home page and at least two more pages, each linking back home.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "<h1>Robotics club</h1><p><a href='/times'>When we meet</a> · <a href='/robots'>Our robots</a></p>"


@app.route("/times")
def times():
    return "<h1>When we meet</h1><ul><li>Monday lunchtime</li><li>Thursday after school</li></ul><p><a href='/'>Home</a></p>"


@app.route("/robots")
def robots():
    return "<h1>Our robots</h1><ul><li>Cutebot</li><li>Line follower</li></ul><p><a href='/'>Home</a></p>"


app.run()
```

:::


:::wider

## Where this leads

Every web app has this shape: addresses, and code that answers them. Next: build pages from data instead of writing every one by hand.

:::


## Exit ticket

:::keep-together

**What is a route?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A link between an address in the site, such as /about, and the Python function that makes that page.

:::

