---
marp: true
theme: default
html: true
---

# A page from Python

Web apps with Flask · Pages from Python

<!-- Speaker note: Students meet Flask, where each address is a route joined to a function that returns the page as HTML, then add a results page, a visit counter and a small site of their own. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 20 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make a website whose pages come from Python: each address is a route, and a function gives back its page.

- I can explain what a route is and how Flask chooses the function for an address.
- I can add a page to a Flask app and link to it.
- I can explain why a variable in a web app resets when the program runs again.

<!-- Speaker note: Before class: Read the unit primer first. This course runs in the **Python playground** (real Python in the browser, Pyodide), where `app.run()` shows the site in an **App** tab with an address bar; links and forms in the page go back to the app. On a computer, `pip install flask` and `python app.py` serve the same file at `http://127.0.0.1:5000`. Before teaching it, open the site's Check your school page once on a student device at school. A **route** (`@app.route("/about")`, a decorator: the line with `@` above a function) joins an address to a function; the function returns the page as HTML text. An address with no route gives the standard **404 Not Found**. HTML inside Python strings uses single quotes for attributes (`href='/about'`) so they do not end the string. The visit counter uses `global` (from the turtle course) and resets on every Run: variables last only while the program runs, which sets up saving in Lesson 4. -->

---

## Why it matters

> Every website you use has code behind it that decides what page to send back. With Flask, a few lines of Python do it.

<!-- Speaker note: In HTML & CSS you wrote pages by hand. A **web app** makes its pages with code, so they can change: show the latest sign-ups, answer a form, look things up. **Flask** is a small Python library for this. Each address in the site (`/`, `/about`) is a **route**, and each route has a function that gives back the page as HTML. The first lines (`from flask import Flask` and `app = Flask(__name__)`) set up the app: copy them as they are. In this playground, `app.run()` shows your site in the **App** tab, with an address bar. On a computer it would be a real web server at `http://127.0.0.1:5000`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**Someone visits /about. What does the site send back?**

- Both pages, one after the other
- Nothing: about() is never called
- A page with the heading About and "Everyone is welcome."
- The Chess club page

<!-- Speaker note: What happens: The About page. @app.route("/about") joins the address /about to the function about(), so Flask calls it and sends back the HTML it returns. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw a table on the board: address on the left, function on the right. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The About page. @app.route("/about") joins the address /about to the function about(), so Flask calls it and sends back the HTML it returns.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/flask/flask-routes/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/flask/flask-routes/?full=step-2#step-2)

<!-- Speaker note: Run it, then use the links on the page, and type addresses in the bar above it: `/about`, then `/missing`. Change the home page's text and run again. Students should be able to say: I visited both pages with the links and the address bar, and tried an address that does not exist. -->

<!-- Speaker note: Teacher: have students type /missing and read the 404 page. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A route joins an address to a function; whatever the function returns is the page, built as text. -->

<!-- Speaker note: Teacher: ask what the browser receives: just text, which happens to be HTML. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## An address with no route

**What does a visitor see at /missing?**

- An empty page
- Python stops with an error
- The home page
- A Not Found page (error 404): no route matches that address

* Answer: A Not Found page (error 404): no route matches that address

<!-- Speaker note: Flask looks for a route that matches the address. With none, it sends back the standard 404 Not Found page, as every website does. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Building the page

**home() builds page with page = page + ... three times. What is the page?**

- Three separate pages
- Only the last part
- A list of three lines
- One piece of HTML text, joined from three parts

* Answer: One piece of HTML text, joined from three parts

<!-- Speaker note: page is text; each line adds more HTML to the end. The browser shows the whole thing as one page. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 11

<!-- Speaker note: about() has no @app.route("/about") above it, so no address leads to it. A function only becomes a page when a route points to it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A results page:** Add a `/results` page with a small table of players and their wins (as on the club page in HTML & CSS), and a link to it from the home page.
- **A visit counter:** Count the visits to the home page and show the number on it. Visit it a few times, then press **Run** again: what happens to the count?

[Open this step](https://tutorials.learningwaypoints.com/code/flask/flask-routes/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new page is a new route and a function; a link to it is an a tag with its address. Hints, in order: Copy the about route: @app.route("/results"), def results():, and return a heading and a table. / Add a link to it on the home page: `<a href='/results'>Results</a>`. / visits = 0 before the routes. In home(): global visits, then visits = visits + 1. / Add the number to the page with str(visits). For students who need more support: Give students the results route with its table, and ask them only to add the link from the home page. For early finishers: Add a page at /time that shows a different message in the morning and the afternoon (import datetime; datetime.datetime.now().hour). The hard part, on purpose: Understanding that the browser asks and the function answers. Ask students to say which function runs for each address before they click. When students get stuck: Not Found for a page they wrote. Ask: Is there an @app.route line directly above the function, with the right address? Fix: Add @app.route("/results") above def results():. / SyntaxError on a line of HTML. Ask: Do the quotes inside the HTML match the quotes around the string? Fix: Use single quotes inside: "<a href='/about'>About</a>". / UnboundLocalError: local variable 'visits' referenced before assignment. Ask: Does home() say it is changing the variable outside it? Fix: global visits as the first line of home(). -->

<!-- Speaker note: Teacher: visit the counter page five times, then press Run, and ask why it reset. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own site

Make a small site for a club, a team or a hobby: a home page and at least two more pages, each linking back home.

[Open this step](https://tutorials.learningwaypoints.com/code/flask/flask-routes/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: several routes, each with its own page, linked together. -->

<!-- Speaker note: Teacher: sketch the site's pages and links on paper first. -->

---

## Where this leads

Every web app has this shape: addresses, and code that answers them. Next: build pages from data instead of writing every one by hand.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is a route?**

* A link between an address in the site, such as /about, and the Python function that makes that page.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson builds pages from a list of data with a template. Later lessons take form answers, save them to a file and send data as JSON. -->
