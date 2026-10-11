---
order: 6
unit: app
optional: true
introduces: [json]
title: Ask an API
summary: "Ask a real weather service for the week's forecast, read the JSON it sends back, and fall back to a saved copy when there is no connection."
language: python
hook: "Weather apps do not measure the weather themselves: they ask an API. Your program can ask the same one."
---
Optional. This lesson needs the internet: if your school blocks the weather site, the program uses a saved copy instead, and everything still works. An **API** sends **data** to programs. Open-Meteo is a free weather API: you send an address with a place's latitude and longitude, and it replies with a forecast in **JSON**, which Python reads as dictionaries and lists. `requests.get(...)` asks; `.json()` turns the reply into Python. The saved copy is read with `json.load(f)`, which does the same for a JSON file.

## Predict

```step
stage: predict
code: weather.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["22.1", "18.5", "Tue", "An error"]
  actual: "22.1. reply[\"daily\"] is the inner dictionary, [\"temperature_2m_max\"] is its list of temperatures, and [1] is the second one."
```

A dictionary inside a dictionary, with a list inside that. Follow the square brackets from left to right.

## Run

```step
stage: run
code: weather.py#run
try: { playground: python, starter: "weather.py#run", files: [weather.json], height: 500 }
check: { type: reflect, text: "I can say whether I got a live forecast or the saved one, and why." }
unlocks: [ask-an-api]
```

Run it. The first line says whether the forecast is live or the saved copy. Then change the latitude and longitude to your own town (look them up on a map; south of the equator, latitude is negative) and run it again.

## Investigate

```step
stage: investigate
code: weather.py#run
insight: "An API is asked with an address and replies with JSON; the program reads it level by level, and plans for the day the API cannot be reached."
tasks:
  - check:
      type: question
      q: "What does params=canberra do?"
      options: ["Adds ?latitude=-35.28&longitude=149.13&... to the address, the query string the API reads", "Sends Canberra's name to the API", "Saves the forecast to a file", "Chooses the units"]
      answer: 0
      explain: "requests builds the query string from the dictionary. It is the other side of Flask's request.args: here your program is the one asking."
  - check:
      type: question
      q: "Why does the program keep a saved weather.json?"
      options: ["So it still works when the network, the school filter or the API fails", "Live data is not allowed in Python", "The API needs it", "To make the program faster"]
      answer: 0
      explain: "Programs that use the internet must expect it to fail. Catching requests.RequestException and using saved data keeps the program useful."
  - check:
      type: bug
      code: weather.py#bug
      text: "This should print each day's top temperature, but it stops with KeyError: 'temperature_2m_max'. Click the line that is wrong."
      answer: 3
      fault: runtime
      misconception: nested-level
      explain: "The temperatures are inside reply[\"daily\"], not reply itself. Each level needs its own key: reply[\"daily\"][\"temperature_2m_max\"][i]."
```

### The question you send

What `params` builds.

### When it fails

Why there is a saved copy.

### Spot the bug

A level that was skipped.

## Modify

```step
stage: modify
insight: "Asking for more is one more word in the request; answering a question is the loop patterns from earlier lessons."
try: { playground: python, starter: "weather.py#run", files: [weather.json], height: 500 }
tasks:
  - hint: "The biggest-so-far pattern from Lesson 2: hottest = 0 (the first day's place in the list), then replace it when a day's top temperature is higher."
    check: { type: code, text: "Find and print the hottest day of the week.", rules: { contains: ["hottest"] } }
  - hint: "Add ,precipitation_sum to the \"daily\" text, then print days[\"precipitation_sum\"][i] on days with rain."
    check: { type: code, text: "Ask for the rain too, and show it on the days it rains.", rules: { contains: ["precipitation_sum"] } }
```

### The hottest day

Find the hottest day of the week, and print it with its temperature.

### Rain

Ask the API for `precipitation_sum` (rain in mm) as well, and show it on rainy days. The saved copy has it already.

## Make: two places

```step
stage: make
insight: "Goals only: ask the API once for each place, compare the answers, and cope with a failed request."
try: { playground: python, starter: "weather.py#make", files: [weather.json], height: 500 }
check: { type: code, text: "Compare the week ahead in two places, handling a failed request.", rules: { contains: ["requests.get(", "except requests.RequestException"], loops: 1 } }
```

Compare the week ahead in two places of your choice: which is warmer on average, and by how much? Catch a failed request so the program says so instead of crashing. (For a bigger challenge, put it behind a Gradio app with a dropdown of places.)

## Where this leads

```step
stage: info
check:
  type: question
  q: "Open-Meteo is free for non-commercial use if you credit it. Why does the program print a credit line?"
  options: ["Using someone's data comes with terms: here, saying where it came from", "Python needs it", "To prove the forecast is right", "It makes the request faster"]
  answer: 0
  explain: "Data has owners and licences. Open-Meteo's data is CC BY 4.0: free to use with credit. Always check an API's terms before you build on it."
```

The same `requests` code works in Python on any computer. Most big APIs (maps, music, sport) need a key and an account; Open-Meteo is one of the few that do not.
