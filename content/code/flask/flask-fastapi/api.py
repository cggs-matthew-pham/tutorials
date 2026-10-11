# region: predict
from fastapi import FastAPI
import uvicorn

api = FastAPI()


@api.get("/next-year")
def next_year(age: int):
    return {"next": age + 1}


uvicorn.run(api)
# endregion
# region: run
import csv
from fastapi import FastAPI
import uvicorn

api = FastAPI()


def load_members():
    with open("members.csv") as f:
        return list(csv.DictReader(f))


@api.get("/")
def home():
    return {"message": "Chess club API. Try /members, /members?name=ad and /members/Players"}


@api.get("/members")
def members(name: str = ""):
    found = []
    for m in load_members():
        if name.lower() in m["name"].lower():
            found.append(m)
    return {"members": found}


@api.get("/members/{group}")
def group_members(group: str):
    found = []
    for m in load_members():
        if m["group"] == group:
            found.append(m)
    return {"group": group, "count": len(found), "members": found}


uvicorn.run(api)
# endregion
# region: bug
from fastapi import FastAPI
import uvicorn

api = FastAPI()


@api.get("/next-year")
def next_year(age):
    return {"next": age + 1}


uvicorn.run(api)
# endregion
# region: results
import csv
from fastapi import FastAPI
import uvicorn

api = FastAPI()


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@api.get("/results")
def results():
    rows = []
    for r in load_results():
        rows.append({"player": r["player"], "wins": int(r["wins"])})
    return {"results": rows}


uvicorn.run(api)
# endregion
# region: sol-min
import csv
from fastapi import FastAPI
import uvicorn

api = FastAPI()


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@api.get("/results")
def results(min_wins: int = 0):
    rows = []
    for r in load_results():
        if int(r["wins"]) >= min_wins:
            rows.append({"player": r["player"], "wins": int(r["wins"])})
    return {"results": rows}


uvicorn.run(api)
# endregion
# region: sol-leader
import csv
from fastapi import FastAPI
import uvicorn

api = FastAPI()


def load_results():
    with open("results.csv") as f:
        return list(csv.DictReader(f))


@api.get("/results")
def results():
    rows = []
    for r in load_results():
        rows.append({"player": r["player"], "wins": int(r["wins"])})
    return {"results": rows}



@api.get("/leader")
def leader():
    rows = load_results()
    best = rows[0]
    for r in rows:
        if int(r["wins"]) > int(best["wins"]):
            best = r
    return {"player": best["player"], "wins": int(best["wins"])}


uvicorn.run(api)
# endregion
# region: make
from fastapi import FastAPI
import uvicorn

api = FastAPI()

# An API of your own, with at least one int or float input that FastAPI checks.

uvicorn.run(api)
# endregion
# region: sol-make
from fastapi import FastAPI
import uvicorn

api = FastAPI()


@api.get("/seconds")
def seconds(minutes: float):
    return {"minutes": minutes, "seconds": round(minutes * 60)}


@api.get("/tables")
def tables(n: int, up_to: int = 10):
    rows = []
    for i in range(1, up_to + 1):
        rows.append(str(i) + " x " + str(n) + " = " + str(i * n))
    return {"table": rows}


uvicorn.run(api)
# endregion
