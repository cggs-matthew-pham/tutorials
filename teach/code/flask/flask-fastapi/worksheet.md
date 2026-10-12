---
title: "The same API in FastAPI"
subtitle: "Web apps with Flask · APIs · Lesson 6"
---

# The same API in FastAPI

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** FastAPI is a newer Python library for APIs, used by companies big and small. Its trick: the types you write are checked for you.


:::teacher-note

**In one sentence:** An optional lesson. Students rebuild the club API in FastAPI, see typed inputs checked and converted for them (with 422 replies for bad input), then add a checked optional input, a leader route and an API of their own.

**Students should be able to say:** I can write a FastAPI route whose inputs come from the address and query string. I can use types (int, float, str) so FastAPI checks and converts input. I can compare Flask and FastAPI and say what each is good for.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`age: int` says what type `age` must be. What happens to a value that is not a whole number?

```python
from fastapi import FastAPI
import uvicorn

api = FastAPI()


@api.get("/next-year")
def next_year(age: int):
    return {"next": age + 1}


uvicorn.run(api)
```

:::keep-together

**Someone visits /next-year?age=twelve. What do they get?**

☐ {"next": 13}

☐ A crash: 500 Internal Server Error

☐ {"next": "twelve1"}

☐ An error reply (422) saying age should be a whole number

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A 422 error reply. age: int tells FastAPI to check and convert age; "twelve" is not a whole number, so FastAPI replies with what is wrong, and next_year never runs.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
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
```

:::keep-together

### From the query string

**Where does name come from in members(name: str = "")?**

☐ A form

☐ The route's address

☐ members.csv

☐ The query string, such as /members?name=ad; it is "" if there is none

:::


:::teacher-note

**Answer:** The query string, such as /members?name=ad; it is "" if there is none

Parameters that are not in the address pattern are read from the query string. The default makes it optional.

:::


:::keep-together

### What FastAPI did for you

**Compared with Flask's request.args.get("name", ""), what did FastAPI save you?**

☐ Reading the query string yourself: the parameter is filled in from it

☐ Opening the file

☐ Writing the loop

☐ Nothing

:::


:::teacher-note

**Answer:** Reading the query string yourself: the parameter is filled in from it

FastAPI matches parameters with the address and query string by name, and converts them to their types. The rest of the code is the same Python.

:::


:::keep-together

### Spot the bug

**/next-year?age=12 gives 500 Internal Server Error instead of {"next": 13}. Click the line that is wrong.**

```
 1  from fastapi import FastAPI
 2  import uvicorn
 3  
 4  api = FastAPI()
 5  
 6  
 7  @api.get("/next-year")
 8  def next_year(age):
 9      return {"next": age + 1}
10  
11  
12  uvicorn.run(api)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

Without a type, age is the text "12", and "12" + 1 is an error. age: int makes FastAPI convert it (and reject anything that is not a whole number).

:::


:::typical

## Modify


**At least some wins.** Add an optional `min_wins` input that FastAPI checks as a whole number. Try `/results?min_wins=lots` too.

**The leader.** Add `/leader`, which sends the player with the most wins.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**At least some wins:**

```python
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
```

**The leader:**

```python
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
```

:::

:::


## Make: an API of your own

Make a small API with at least one `int` or `float` input: minutes to seconds, a times table, a dice roller with a number of sides. Test it with a good value and a wrong one.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
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
```

:::


:::wider

## Where this leads

On a computer, FastAPI also makes a documentation page at `/docs` from your types, where you can try every route (it needs a computer: the playground cannot show it). The checks come from a library called **Pydantic**, which can also check whole JSON bodies sent to an API.

:::


## Exit ticket

:::keep-together

**What does age: int do in a FastAPI route?**

{{lines-3}}

:::


:::teacher-note

**Answer:** FastAPI converts the input to a whole number, and replies with a 422 error explaining the problem if it cannot, before the function runs.

:::

