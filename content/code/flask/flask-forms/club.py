# region: predict
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
# endregion
# region: run
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
# endregion
# region: bug
from flask import Flask, render_template_string, request, redirect

app = Flask(__name__)
members = []

PAGE = """<form method="post" action="/join">
  <label for="name">Name</label>
  <input id="name">
  <button>Join</button>
</form>"""


@app.route("/")
def home():
    return render_template_string(PAGE)


@app.route("/join", methods=["POST"])
def join():
    members.append(request.form["name"])
    return redirect("/")


app.run()
# endregion
# region: sol-blank
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
# endregion
# region: sol-year
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
# endregion
# region: make
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
</table>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)

# A form to record a win: choose a player, press the button, and their wins go up by 1.

app.run()
# endregion
# region: sol-make
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
# endregion
