# region: predict
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "<h1>Chess club</h1><p>Lunchtime, Room 12</p>"


@app.route("/about")
def about():
    return "<h1>About</h1><p>Everyone is welcome.</p>"


app.run()
# endregion
# region: run
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
# endregion
# region: bug
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "<h1>Chess club</h1><p><a href='/about'>About the club</a></p>"


def about():
    return "<h1>About</h1><p>Everyone is welcome.</p>"


app.run()
# endregion
# region: sol-results
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
# endregion
# region: sol-count
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
# endregion
# region: make
from flask import Flask

app = Flask(__name__)

# Your own site: a home page and at least two more pages, linked to each other.

app.run()
# endregion
# region: sol-make
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
# endregion
