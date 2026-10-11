# region: predict
with open("log.txt", "w") as f:
    f.write("Ada\n")
with open("log.txt", "a") as f:
    f.write("Sam\n")
with open("log.txt") as f:
    print(f.read())
# endregion
# region: run
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
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


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


def save_member(name, group):
    with open("members.csv", "a", newline="") as f:
        csv.writer(f).writerow([name, group])


@app.route("/")
def home():
    return render_template_string(PAGE, members=load_members())


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=load_members(), error="Please type your name.")
    save_member(name, group)
    return redirect("/")


app.run()
# endregion
# region: bug
import csv


def save_member(name, group):
    with open("members.csv", "w", newline="") as f:
        csv.writer(f).writerow([name, group])


save_member("Zoe", "Players")
with open("members.csv") as f:
    print(list(csv.DictReader(f)))
# endregion
# region: sol-repeat
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
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


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


def save_member(name, group):
    with open("members.csv", "a", newline="") as f:
        csv.writer(f).writerow([name, group])


@app.route("/")
def home():
    return render_template_string(PAGE, members=load_members())


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=load_members(), error="Please type your name.")
    for m in load_members():
        if m["name"].lower() == name.lower():
            return render_template_string(PAGE, members=load_members(), error=name + " is already a member.")
    save_member(name, group)
    return redirect("/")


app.run()
# endregion
# region: sol-count
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
PAGE = """<h1>Chess club</h1>
<h2>Members ({{ count }})</h2>
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


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


def save_member(name, group):
    with open("members.csv", "a", newline="") as f:
        csv.writer(f).writerow([name, group])


@app.route("/")
def home():
    members = load_members()
    return render_template_string(PAGE, members=members, count=len(members))


@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
    group = request.form["group"]
    if name == "":
        return render_template_string(PAGE, members=load_members(), error="Please type your name.")
    save_member(name, group)
    return redirect("/")


app.run()
# endregion
# region: make
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)

PAGE = """<h1>Results</h1>
<table>
  <tr><th>Player</th><th>Wins</th></tr>
  {% for p in players %}
  <tr><td>{{ p["player"] }}</td><td>{{ p["wins"] }}</td></tr>
  {% endfor %}
</table>
<form method="post" action="/win">
  <select name="player">
    {% for p in players %}
    <option>{{ p["player"] }}</option>
    {% endfor %}
  </select>
  <button>Add a win</button>
</form>"""


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    return render_template_string(PAGE, players=load_results())


@app.route("/win", methods=["POST"])
def win():
    name = request.form["player"]
    # Add 1 to that player's wins, and save every row back to results.csv.
    return redirect("/")


app.run()
# endregion
# region: sol-make
import csv
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)

PAGE = """<h1>Results</h1>
<table>
  <tr><th>Player</th><th>Wins</th></tr>
  {% for p in players %}
  <tr><td>{{ p["player"] }}</td><td>{{ p["wins"] }}</td></tr>
  {% endfor %}
</table>
<form method="post" action="/win">
  <select name="player">
    {% for p in players %}
    <option>{{ p["player"] }}</option>
    {% endfor %}
  </select>
  <button>Add a win</button>
</form>"""


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    return render_template_string(PAGE, players=load_results())


@app.route("/win", methods=["POST"])
def win():
    name = request.form["player"]
    players = load_results()
    for p in players:
        if p["player"] == name:
            p["wins"] = int(p["wins"]) + 1
    with open("results.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["player", "wins"])
        for p in players:
            writer.writerow([p["player"], p["wins"]])
    return redirect("/")


app.run()
# endregion
