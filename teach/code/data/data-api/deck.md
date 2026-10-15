---
marp: true
theme: default
html: true
---

# Ask an API

Data detective · Dashboards and live data

<!-- Speaker note: An optional lesson. Students ask the Open-Meteo weather API for a week's forecast with requests, read the nested JSON, fall back to a saved copy when there is no connection, then find the hottest day, add rain and compare two places. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** ask a real weather service for the week's forecast, read the JSON it sends back, and fall back to a saved copy when there is no connection.

- I can ask an API for data with requests.get and read the JSON reply.
- I can read a value from dictionaries and lists inside each other.
- I can make a program that still works when the internet does not.

<!-- Speaker note: Before class: Optional: not needed for completing the course. It needs `api.open-meteo.com` to be reachable from school devices (the Check your school page tests it); if it is blocked, `except requests.RequestException:` loads `weather.json`, an example reply in Open-Meteo's format (made up for these lessons, not a real forecast), so the lesson still works. Open-Meteo is free for non-commercial use with credit (CC BY 4.0), needs no key, and allows requests from web pages. In the playground, `requests` is a small stand-in (get, params, .json(), .status_code, .ok, .raise_for_status()) so the same code runs with the real requests on a computer. The reply is a dictionary; `reply["daily"]` holds lists (`time`, `temperature_2m_max`, ...) where place i in each list is the same day (the bug task skips the `daily` level). `params=` builds the query string, the other side of Flask's `request.args`. Teacher: Info: discuss data licences and API keys. -->

---

## Why it matters

> Weather apps do not measure the weather themselves: they ask an API. Your program can ask the same one.

<!-- Speaker note: Optional. This lesson needs the internet: if your school blocks the weather site, the program uses a saved copy instead, and everything still works. An **API** sends **data** to programs. Open-Meteo is a free weather API: you send an address with a place's latitude and longitude, and it replies with a forecast in **JSON**, which Python reads as dictionaries and lists. `requests.get(...)` asks; `.json()` turns the reply into Python. The saved copy is read with `json.load(f)`, which does the same for a JSON file. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
reply = {"daily": {"time": ["Mon", "Tue"], "temperature_2m_max": [18.5, 22.1]}}
print(reply["daily"]["temperature_2m_max"][1])
```

**What does it print?**

- 18.5
- An error
- 22.1
- Tue

<!-- Speaker note: What happens: 22.1. reply["daily"] is the inner dictionary, ["temperature_2m_max"] is its list of temperatures, and [1] is the second one. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the nested reply as boxes inside boxes. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 22.1. reply["daily"] is the inner dictionary, ["temperature_2m_max"] is its list of temperatures, and [1] is the second one.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/data/data-api/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/data/data-api/?full=step-2#step-2)

<!-- Speaker note: Run it. The first line says whether the forecast is live or the saved copy. Then change the latitude and longitude to your own town (look them up on a map; south of the equator, latitude is negative) and run it again. Students should be able to say: I can say whether I got a live forecast or the saved one, and why. -->

<!-- Speaker note: Teacher: find your school's latitude and longitude on a map together. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
canberra = {"latitude": -35.28, "longitude": 149.13, "timezone": "Australia/Sydney", "daily": "temperature_2m_max,temperature_2m_min"}

try:
    reply = requests.get(URL, params=canberra, timeout=10).json()
    print("Live forecast from Open-Meteo")
except requests.RequestException:
    with open("weather.json") as f:
        reply = json.load(f)
    print("No connection: using the saved forecast")

days = reply["daily"]
for i in range(len(days["time"])):
    print(days["time"][i] + ": " + str(days["temperature_2m_min"][i]) + " to " + str(days["temperature_2m_max"][i]) + " degrees")
print("Weather data by Open-Meteo.com (CC BY 4.0)")
```

<!-- Speaker note: What this step is for: An API is asked with an address and replies with JSON; the program reads it level by level, and plans for the day the API cannot be reached. -->

<!-- Speaker note: Teacher: turn off the network (or use a wrong address) and run: the saved copy takes over. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The question you send

**What does params=canberra do?**

- Sends Canberra's name to the API
- Chooses the units
- Saves the forecast to a file
- Adds ?latitude=-35.28&amp;longitude=149.13&amp;... to the address, the query string the API reads

* Answer: Adds ?latitude=-35.28&amp;longitude=149.13&amp;... to the address, the query string the API reads

<!-- Speaker note: requests builds the query string from the dictionary. It is the other side of Flask's request.args: here your program is the one asking. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When it fails

**Why does the program keep a saved weather.json?**

- To make the program faster
- The API needs it
- Live data is not allowed in Python
- So it still works when the network, the school filter or the API fails

* Answer: So it still works when the network, the school filter or the API fails

<!-- Speaker note: Programs that use the internet must expect it to fail. Catching requests.RequestException and using saved data keeps the program useful. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should print each day's top temperature, but it stops with KeyError: 'temperature_2m_max'. Click the line that is wrong.**

```
 1  reply = {"daily": {"time": ["Mon", "Tue"], "temperature_2m_max": [18.5, 22.1]}}
 2  for i in range(len(reply["daily"]["time"])):
 3      print(reply["temperature_2m_max"][i])
```

* Answer: line 3

<!-- Speaker note: The temperatures are inside reply["daily"], not reply itself. Each level needs its own key: reply["daily"]["temperature_2m_max"][i]. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **The hottest day:** Find the hottest day of the week, and print it with its temperature.
- **Rain:** Ask the API for `precipitation_sum` (rain in mm) as well, and show it on rainy days. The saved copy has it already.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-api/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Asking for more is one more word in the request; answering a question is the loop patterns from earlier lessons. Hints, in order: The biggest-so-far pattern from Lesson 2: hottest = 0 (the first day's place in the list), then replace it when a day's top temperature is higher. / Add ,precipitation_sum to the "daily" text, then print days["precipitation_sum"][i] on days with rain. For students who need more support: Give students the hottest-day loop with the comparison line blank, and ask them to finish it. For early finishers: Put the two-place comparison behind a Gradio app with a dropdown of places, or ask Open-Meteo for hourly temperatures and chart today with text bars. The hard part, on purpose: Reading nested JSON. Ask students to print reply, then reply["daily"], one level at a time, instead of telling them the path. When students get stuck: KeyError: 'temperature_2m_max'. Ask: Which dictionary holds the temperatures? Fix: reply["daily"]["temperature_2m_max"]. / The forecast is for the wrong place. Ask: Is latitude negative south of the equator? Fix: Canberra is latitude -35.28, longitude 149.13. / No connection: using the saved forecast, every time. Ask: Does the Check your school page reach Open-Meteo on this device? Fix: The site is blocked here; the saved copy is fine for the lesson, or ask IT to allow api.open-meteo.com. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: two places

Compare the week ahead in two places of your choice: which is warmer on average, and by how much? Catch a failed request so the program says so instead of crashing. (For a bigger challenge, put it behind a Gradio app with a dropdown of places.)

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-api/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: ask the API once for each place, compare the answers, and cope with a failed request. -->

---

## Where this leads

The same `requests` code works in Python on any computer. Most big APIs (maps, music, sport) need a key and an account; Open-Meteo is one of the few that do not.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a program that uses an API need a plan for when the API cannot be reached?**

* Networks, filters and services fail; catching the error and using saved data (or saying so) keeps the program working instead of crashing.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Machine learning with Gradio uses data in the same way: tables in, answers out. Web apps with Flask builds the other side: an API of your own. -->
