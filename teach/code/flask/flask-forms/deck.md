---
marp: true
theme: default
html: true
---

# Join the club

Web apps with Flask · Forms and saving

<!-- Speaker note: Students make the club page's sign-up form work with Flask, reading the answers with request.form and redirecting home, then refuse blank names, add a year level and build a form that records a win. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 20 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make the club page's sign-up form work: the form sends its answers, a route reads them, adds the new member and goes back home.

- I can send a form to a route with method="post" and read its answers with request.form.
- I can explain why a form ends with a redirect.
- I can check what a form sends on the server, and reply with a message.

<!-- Speaker note: Before class: Read the unit primer first. `<form method="post" action="/join">` sends the form to `/join` when the button is pressed; each box is sent **only if it has a `name` attribute**, under that name (the `id` is for the label; the bug task has an `id` and no `name`, and Flask replies 400 Bad Request). A route accepts a sent form with `methods=["POST"]` and reads it with `request.form["name"]`. After changing the data it returns `redirect("/")`, so the browser shows the home page again (and a reload does not send the form twice). The server checks what it gets (a blank name), because anyone can send anything to an address. Members live in a variable, so they vanish on Run: that motivates the next lesson. In the playground the form is passed to the app by the App tab; on a computer the browser sends it to Flask. -->

---

## Why it matters

> In HTML & CSS the Join button did nothing. Now Python is behind the form, so it can really sign people up.

<!-- Speaker note: In HTML & CSS your club page had a form that went nowhere. With `method="post" action="/join"`, pressing the button **sends** the form's answers to the address `/join`. A route with `methods=["POST"]` receives them, and `request.form["name"]` looks up the box whose `name` attribute is `name`. `members.append(...)` adds the new member to the end of the list. Then `redirect("/")` sends the browser back to the home page. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**You type Zoe and press Join. What does the page show?**

- ['Ada']
- ['Ada', 'Zoe']
- ['Zoe']
- An error: Zoe is not in the list

<!-- Speaker note: What happens: ['Ada', 'Zoe']. join() appends what was typed in the box named name, then redirect("/") shows the home page again, with the longer list. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: act it out: one student is the form, one is join(), one is the home page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* ['Ada', 'Zoe']. join() appends what was typed in the box named name, then redirect("/") shows the home page again, with the longer list.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/flask/flask-forms/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/flask/flask-forms/?full=step-2#step-2)

<!-- Speaker note: Run it and join the club twice, with different groups. Then press **Run** again: where did the new members go? Students should be able to say: I signed up two people, then pressed Run again and saw what happened to them. -->

<!-- Speaker note: Teacher: join twice, then press Run. Where did they go? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 44 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-forms/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A form sends each box that has a name attribute; the route reads them with request.form by that name, changes the data, then redirects to a page that shows it. -->

<!-- Speaker note: Teacher: in the bug task, ask what the label's for= and the box's id do, and what name= does. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Back home

**Why does join() end with redirect("/") instead of returning a page?**

- Because POST routes cannot return HTML
- To stop the form being sent
- So the browser goes back to the home page, which shows the list with the new member
- To save the member

* Answer: So the browser goes back to the home page, which shows the list with the new member

<!-- Speaker note: The home route already shows the members. Redirecting there after a change is the usual pattern, and reloading the page then does not send the form twice. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A choice from a list

**What does request.form["group"] give when someone chooses Champions?**

- 3, because it is the third option
- "Champions"
- "group"
- The whole form

* Answer: "Champions"

<!-- Speaker note: A select sends the chosen option's text under its name, group. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 8

<!-- Speaker note: The box has an id but no name, so the form sends nothing for it, and request.form["name"] has nothing to find. name="name" sends it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **No blank names:** Press Join with an empty box: a member with no name appears. Make the app refuse a blank name and say why.
- **Year level:** Ask for each member's **year** as well, and show it in the list.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-forms/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A server must check what it is sent: a blank or wrong answer gets the page back with a message instead of being saved. Hints, in order: In join(), after reading name: if name == "": return the page with an error message instead of adding the member. / `render_template_string(PAGE, members=members, error="Please type your name.")`, and in the template `{% if error %}<p>{{ error }}</p>{% endif %}`. / Add a Year box with name="year", read it with request.form["year"], store it in the member's dictionary and show it in the list. For students who need more support: Give students the if with the error return, and ask them only to add the error to the template. For early finishers: Refuse a name that is already a member, with its own message. The hard part, on purpose: The name attribute on form boxes. Ask students to list what the form sends, box by box, before they look at the route. When students get stuck: 400 Bad Request when the form is sent. Ask: Does every box the route reads have a name attribute, spelled the same? Fix: name="year" on the box, request.form["year"] in the route. / 405 Method Not Allowed. Ask: Does the route accept POST? Fix: @app.route("/join", methods=["POST"]). / The error message never shows. Ask: Is error passed to the template, and does the template show it? Fix: error="..." in render_template_string, and {% if error %}{{ error }}{% endif %} in PAGE. -->

<!-- Speaker note: Teacher: test with a blank name and with spaces only (strip() makes them blank). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: record a win

Add a form under the results table: a dropdown of the players (made by the template) and an **Add a win** button that adds 1 to that player's wins.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-forms/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a form of your own that changes the data, a POST route that reads it, and a redirect to show the change. -->

---

## Where this leads

The members disappear on every Run, because they live in a variable. Next: save them to a file so they last.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A form box has id="name" but no name attribute. What does the server get from it?**

* Nothing: only boxes with a name attribute are sent, under that name.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson saves the members to a CSV file so they survive a Run. Later, a JSON route lets other programs read the list. -->
