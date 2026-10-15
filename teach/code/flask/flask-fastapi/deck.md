---
marp: true
theme: default
html: true
---

# The same API in FastAPI

Web apps with Flask · APIs

<!-- Speaker note: An optional lesson. Students rebuild the club API in FastAPI, see typed inputs checked and converted for them (with 422 replies for bad input), then add a checked optional input, a leader route and an API of their own. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build the club API again in FastAPI, where each input's type is checked and converted for you, and wrong input gets a clear error reply.

- I can write a FastAPI route whose inputs come from the address and query string.
- I can use types (int, float, str) so FastAPI checks and converts input.
- I can compare Flask and FastAPI and say what each is good for.

<!-- Speaker note: Before class: Optional: not needed for completing the course. Read the unit primer first. FastAPI routes are `@api.get("/address")`; parameters in the address use curly brackets (`/members/{group}`), and other parameters come from the query string (`?name=ad`), optional when they have a default. The **type** after each parameter (`age: int`) makes FastAPI convert the value and reply **422** with an explanation when it cannot, before the function runs (Pydantic does the checking). Without a type, the value is text (the bug task: "12" + 1 is an error, 500). `uvicorn.run(api)` starts the app; in the playground it shows in the App tab, on a computer `pip install fastapi uvicorn` and `python app.py` serve it at `http://127.0.0.1:8000`, with an automatic documentation page at `/docs` (not available in the playground). No async, dependency injection or Pydantic models in this lesson. Teacher: Info: list what each tool is good for on the board. -->

---

## Why it matters

> FastAPI is a newer Python library for APIs, used by companies big and small. Its trick: the types you write are checked for you.

<!-- Speaker note: In Flask, a number in the address arrives as text, and you check and convert it yourself. **FastAPI** reads the **type** you give each input (`age: int`) and does it for you: it turns `"12"` into 12, and replies with an error explaining the problem when someone sends `twelve`. Routes are written `@api.get("/address")`, and `uvicorn.run(api)` starts the app (here, in the App tab). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from fastapi import FastAPI
import uvicorn

api = FastAPI()


@api.get("/next-year")
def next_year(age: int):
    return {"next": age + 1}


uvicorn.run(api)
```

**Someone visits /next-year?age=twelve. What do they get?**

- {"next": 13}
- A crash: 500 Internal Server Error
- {"next": "twelve1"}
- An error reply (422) saying age should be a whole number

<!-- Speaker note: What happens: A 422 error reply. age: int tells FastAPI to check and convert age; "twelve" is not a whole number, so FastAPI replies with what is wrong, and next_year never runs. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: compare with Flask, where you would write int() and try/except yourself. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A 422 error reply. age: int tells FastAPI to check and convert age; "twelve" is not a whole number, so FastAPI replies with what is wrong, and next_year never runs.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/flask/flask-fastapi/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/flask/flask-fastapi/?full=step-2#step-2)

<!-- Speaker note: Run it (FastAPI takes a moment to load the first time) and try the addresses on the home page. In `members(name: str = "")`, a parameter that is not in the route's address comes from the **query string**, and `= ""` makes it optional. In `/members/{group}`, curly brackets mark the part that changes (Flask uses angle brackets). Students should be able to say: I tried /members, /members?name=ad and /members/Players, and compared them with the Flask API. -->

<!-- Speaker note: Teacher: try /members?name=ad, then /members/Players, then /members/players. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 37 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-fastapi/?full=step-3#step-3)

<!-- Speaker note: What this step is for: In FastAPI the function's parameters and their types are the API: FastAPI reads them from the address, converts them, and rejects bad input before your code runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## From the query string

**Where does name come from in members(name: str = "")?**

- A form
- The route's address
- members.csv
- The query string, such as /members?name=ad; it is "" if there is none

* Answer: The query string, such as /members?name=ad; it is "" if there is none

<!-- Speaker note: Parameters that are not in the address pattern are read from the query string. The default makes it optional. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What FastAPI did for you

**Compared with Flask's request.args.get("name", ""), what did FastAPI save you?**

- Reading the query string yourself: the parameter is filled in from it
- Opening the file
- Writing the loop
- Nothing

* Answer: Reading the query string yourself: the parameter is filled in from it

<!-- Speaker note: FastAPI matches parameters with the address and query string by name, and converts them to their types. The rest of the code is the same Python. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 8

<!-- Speaker note: Without a type, age is the text "12", and "12" + 1 is an error. age: int makes FastAPI convert it (and reject anything that is not a whole number). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **At least some wins:** Add an optional `min_wins` input that FastAPI checks as a whole number. Try `/results?min_wins=lots` too.
- **The leader:** Add `/leader`, which sends the player with the most wins.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-fastapi/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A typed parameter with a default is an optional, checked input; a new question is a new route. Hints, in order: def results(min_wins: int = 0):, and only add rows whose wins are at least min_wins. Try /results?min_wins=3, then /results?min_wins=lots. / @api.get("/leader"), with the biggest-so-far loop from Data detective or Lesson 5. For students who need more support: Give students the min_wins parameter line, and ask them only to add the if in the loop. For early finishers: Return an error of your own for a sensible-looking but wrong value (from fastapi import HTTPException; raise HTTPException(404, "No such player")). The hard part, on purpose: Reading the 422 reply. Have students read the error JSON aloud and find the field it names before changing anything. When students get stuck: 422 with "Field required". Ask: Does the input have a default, or is it in the address? Fix: Add a default (min_wins: int = 0), or send it: /results?min_wins=3. / 500 Internal Server Error on a number input. Ask: Does the parameter have a type? Fix: age: int (or float). / 404 for /members/Players. Ask: Does the route use curly brackets for the part that changes? Fix: @api.get("/members/{group}"). -->

<!-- Speaker note: Teacher: send min_wins=lots and read the 422 reply together. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: an API of your own

Make a small API with at least one `int` or `float` input: minutes to seconds, a times table, a dice roller with a number of sides. Test it with a good value and a wrong one.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/flask/flask-fastapi/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: an API whose inputs are typed, so FastAPI checks them for you. -->

---

## Where this leads

On a computer, FastAPI also makes a documentation page at `/docs` from your types, where you can try every route (it needs a computer: the playground cannot show it). The checks come from a library called **Pydantic**, which can also check whole JSON bodies sent to an API.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does age: int do in a FastAPI route?**

* FastAPI converts the input to a whole number, and replies with a 422 error explaining the problem if it cannot, before the function runs.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The end of the course. Next steps: SQLite for storage (sqlite3 is built into Python), hosting a Flask or FastAPI app (with a teacher), or the planned Machine learning with Gradio course. -->
