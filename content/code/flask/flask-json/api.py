# region: predict
from flask import Flask

app = Flask(__name__)


@app.route("/api/club")
def club():
    return {"name": "Chess club", "room": 12, "days": ["Tuesday", "Thursday"]}


app.run()
# endregion
# region: run
import csv
from flask import Flask, request

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    page = "<h1>Chess club API</h1>"
    page = page + "<p><a href='/api/members'>/api/members</a></p>"
    page = page + "<p><a href='/api/members/Players'>/api/members/Players</a></p>"
    return page


@app.route("/api/members")
def api_members():
    return {"members": load_members()}


@app.route("/api/members/<group>")
def api_group(group):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}


app.run()
# endregion
# region: bug
import csv
from flask import Flask

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/api/members")
def api_members():
    return {"members": load_members}


app.run()
# endregion
# region: sol-stats
import csv
from flask import Flask, request

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    page = "<h1>Chess club API</h1>"
    page = page + "<p><a href='/api/members'>/api/members</a></p>"
    page = page + "<p><a href='/api/members/Players'>/api/members/Players</a></p>"
    return page


@app.route("/api/members")
def api_members():
    return {"members": load_members()}


@app.route("/api/members/<group>")
def api_group(group):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}



@app.route("/api/stats")
def api_stats():
    counts = {}
    for m in load_members():
        if m["group"] in counts:
            counts[m["group"]] = counts[m["group"]] + 1
        else:
            counts[m["group"]] = 1
    return counts


app.run()
# endregion
# region: sol-search
import csv
from flask import Flask, request

app = Flask(__name__)


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@app.route("/")
def home():
    page = "<h1>Chess club API</h1>"
    page = page + "<p><a href='/api/members'>/api/members</a></p>"
    page = page + "<p><a href='/api/members/Players'>/api/members/Players</a></p>"
    return page


@app.route("/api/members")
def api_members():
    name = request.args.get("name", "").lower()
    found = []
    for m in load_members():
        if name in m["name"].lower():
            found.append(m)
    return {"members": found}


@app.route("/api/members/<group>")
def api_group(group):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}


app.run()
# endregion
# region: make
import csv
from flask import Flask

app = Flask(__name__)

# An API for results.csv: /api/results with every row, and /api/leader with the player who has the most wins.

app.run()
# endregion
# region: sol-make
import csv
from flask import Flask

app = Flask(__name__)


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@app.route("/api/results")
def api_results():
    rows = []
    for r in load_results():
        rows.append({"player": r["player"], "wins": int(r["wins"])})
    return {"results": rows}


@app.route("/api/leader")
def api_leader():
    rows = load_results()
    leader = rows[0]
    for r in rows:
        if int(r["wins"]) > int(leader["wins"]):
            leader = r
    return {"player": leader["player"], "wins": int(leader["wins"])}


app.run()
# endregion
