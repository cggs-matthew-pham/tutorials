---
title: "Ask an API"
subtitle: "Data detective · Dashboards and live data · Lesson 6"
---

# Ask an API

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Weather apps do not measure the weather themselves: they ask an API. Your program can ask the same one.


:::teacher-note

**In one sentence:** An optional lesson. Students ask the Open-Meteo weather API for a week's forecast with requests, read the nested JSON, fall back to a saved copy when there is no connection, then find the hottest day, add rain and compare two places.

**Students should be able to say:** I can ask an API for data with requests.get and read the JSON reply. I can read a value from dictionaries and lists inside each other. I can make a program that still works when the internet does not.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

A dictionary inside a dictionary, with a list inside that. Follow the square brackets from left to right.

```python
reply = {"daily": {"time": ["Mon", "Tue"], "temperature_2m_max": [18.5, 22.1]}}
print(reply["daily"]["temperature_2m_max"][1])
```

:::keep-together

**What does it print?**

☐ 18.5

☐ An error

☐ 22.1

☐ Tue

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 22.1. reply["daily"] is the inner dictionary, ["temperature_2m_max"] is its list of temperatures, and [1] is the second one.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### The question you send

**What does params=canberra do?**

☐ Sends Canberra's name to the API

☐ Chooses the units

☐ Saves the forecast to a file

☐ Adds ?latitude=-35.28&amp;longitude=149.13&amp;... to the address, the query string the API reads

:::


:::teacher-note

**Answer:** Adds ?latitude=-35.28&amp;longitude=149.13&amp;... to the address, the query string the API reads

requests builds the query string from the dictionary. It is the other side of Flask's request.args: here your program is the one asking.

:::


:::keep-together

### When it fails

**Why does the program keep a saved weather.json?**

☐ To make the program faster

☐ The API needs it

☐ Live data is not allowed in Python

☐ So it still works when the network, the school filter or the API fails

:::


:::teacher-note

**Answer:** So it still works when the network, the school filter or the API fails

Programs that use the internet must expect it to fail. Catching requests.RequestException and using saved data keeps the program useful.

:::


:::keep-together

### Spot the bug

**This should print each day's top temperature, but it stops with KeyError: 'temperature_2m_max'. Click the line that is wrong.**

```
 1  reply = {"daily": {"time": ["Mon", "Tue"], "temperature_2m_max": [18.5, 22.1]}}
 2  for i in range(len(reply["daily"]["time"])):
 3      print(reply["temperature_2m_max"][i])
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

The temperatures are inside reply["daily"], not reply itself. Each level needs its own key: reply["daily"]["temperature_2m_max"][i].

:::


:::typical

## Modify


**The hottest day.** Find the hottest day of the week, and print it with its temperature.

**Rain.** Ask the API for `precipitation_sum` (rain in mm) as well, and show it on rainy days. The saved copy has it already.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The hottest day:**

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

hottest = 0
for i in range(len(days["time"])):
    if days["temperature_2m_max"][i] > days["temperature_2m_max"][hottest]:
        hottest = i
print("Hottest: " + days["time"][hottest] + " at " + str(days["temperature_2m_max"][hottest]) + " degrees")
print("Weather data by Open-Meteo.com (CC BY 4.0)")
```

**Rain:**

```python
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
canberra = {"latitude": -35.28, "longitude": 149.13, "timezone": "Australia/Sydney", "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum"}

try:
    reply = requests.get(URL, params=canberra, timeout=10).json()
    print("Live forecast from Open-Meteo")
except requests.RequestException:
    with open("weather.json") as f:
        reply = json.load(f)
    print("No connection: using the saved forecast")

days = reply["daily"]
for i in range(len(days["time"])):
    line = days["time"][i] + ": " + str(days["temperature_2m_min"][i]) + " to " + str(days["temperature_2m_max"][i]) + " degrees"
    if days["precipitation_sum"][i] > 0:
        line = line + ", rain " + str(days["precipitation_sum"][i]) + " mm"
    print(line)
print("Weather data by Open-Meteo.com (CC BY 4.0)")
```

:::

:::


## Make: two places

Compare the week ahead in two places of your choice: which is warmer on average, and by how much? Catch a failed request so the program says so instead of crashing. (For a bigger challenge, put it behind a Gradio app with a dropdown of places.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
places = {
    "Canberra": {"latitude": -35.28, "longitude": 149.13},
    "Darwin": {"latitude": -12.46, "longitude": 130.84},
}

averages = {}
for name in places:
    query = {"latitude": places[name]["latitude"], "longitude": places[name]["longitude"], "daily": "temperature_2m_max", "timezone": "auto"}
    try:
        days = requests.get(URL, params=query, timeout=10).json()["daily"]
        total = 0
        for t in days["temperature_2m_max"]:
            total = total + t
        averages[name] = total / len(days["temperature_2m_max"])
        print(name + ": " + str(round(averages[name], 1)) + " degrees on average")
    except requests.RequestException:
        print("Could not reach Open-Meteo for " + name)

if len(averages) == 2:
    difference = averages["Darwin"] - averages["Canberra"]
    print("Darwin is " + str(round(difference, 1)) + " degrees warmer on average")
print("Weather data by Open-Meteo.com (CC BY 4.0)")
```

:::


:::wider

## Where this leads

The same `requests` code works in Python on any computer. Most big APIs (maps, music, sport) need a key and an account; Open-Meteo is one of the few that do not.

:::


## Exit ticket

:::keep-together

**Why does a program that uses an API need a plan for when the API cannot be reached?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Networks, filters and services fail; catching the error and using saved data (or saying so) keeps the program working instead of crashing.

:::

