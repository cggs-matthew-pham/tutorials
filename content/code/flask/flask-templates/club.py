# region: predict
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
# endregion
# region: run
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

PAGE = """<h1>Chess club</h1>
<table>
  <tr><th>Player</th><th>Group</th></tr>
  {% for p in players %}
  <tr><td><a href="/player/{{ p['name'] }}">{{ p["name"] }}</a></td><td>{{ p["group"] }}</td></tr>
  {% endfor %}
</table>"""

PLAYER = """<h1>{{ p["name"] }}</h1>
<p>Group: {{ p["group"] }}</p>
<p><a href="/">All players</a></p>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/player/<name>")
def player(name):
    for p in players:
        if p["name"] == name:
            return render_template_string(PLAYER, p=p)
    return "<h1>No player called " + name + "</h1>", 404


app.run()
# endregion
# region: bug
from flask import Flask, render_template_string

app = Flask(__name__)
players = [{"name": "Ada"}, {"name": "Sam"}]

PAGE = """<ul>
{% for p in players %}
  <li>{{ p["name"] }}</li>
{% endfor %}
</ul>"""


@app.route("/")
def home():
    return render_template_string(PAGE)


app.run()
# endregion
# region: sol-wins
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

PAGE = """<h1>Chess club</h1>
<table>
  <tr><th>Player</th><th>Group</th><th>Wins</th></tr>
  {% for p in players %}
  <tr><td><a href="/player/{{ p['name'] }}">{{ p["name"] }}</a></td><td>{{ p["group"] }}</td><td>{{ p["wins"] }}</td></tr>
  {% endfor %}
</table>"""

PLAYER = """<h1>{{ p["name"] }}</h1>
<p>Group: {{ p["group"] }}</p>
<p><a href="/">All players</a></p>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/player/<name>")
def player(name):
    for p in players:
        if p["name"] == name:
            return render_template_string(PLAYER, p=p)
    return "<h1>No player called " + name + "</h1>", 404


app.run()
# endregion
# region: sol-group
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

PAGE = """<h1>Chess club</h1>
<table>
  <tr><th>Player</th><th>Group</th></tr>
  {% for p in players %}
  <tr><td><a href="/player/{{ p['name'] }}">{{ p["name"] }}</a></td><td>{{ p["group"] }}</td></tr>
  {% endfor %}
</table>"""

PLAYER = """<h1>{{ p["name"] }}</h1>
<p>Group: <a href="/group/{{ p['group'] }}">{{ p["group"] }}</a></p>
<p><a href="/">All players</a></p>"""


@app.route("/")
def home():
    return render_template_string(PAGE, players=players)


@app.route("/player/<name>")
def player(name):
    for p in players:
        if p["name"] == name:
            return render_template_string(PLAYER, p=p)
    return "<h1>No player called " + name + "</h1>", 404


@app.route("/group/<group>")
def group_page(group):
    members = []
    for p in players:
        if p["group"] == group:
            members.append(p)
    return render_template_string(PAGE, players=members)


app.run()
# endregion
# region: make
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

# A /leaders page: the players with 3 or more wins, in a template.

app.run()
# endregion
# region: sol-make
from flask import Flask, render_template_string

app = Flask(__name__)
players = [
    {"name": "Ada", "group": "Champions", "wins": 5},
    {"name": "Sam", "group": "Players", "wins": 4},
    {"name": "Mia", "group": "Beginners", "wins": 1},
    {"name": "Leo", "group": "Players", "wins": 3},
]

LEADERS = """<h1>Leaders</h1>
<ol>
{% for p in leaders %}
  <li>{{ p["name"] }}: {{ p["wins"] }} wins</li>
{% endfor %}
</ol>"""


@app.route("/leaders")
def leaders_page():
    leaders = []
    for p in players:
        if p["wins"] >= 3:
            leaders.append(p)
    return render_template_string(LEADERS, leaders=leaders)


app.run()
# endregion
