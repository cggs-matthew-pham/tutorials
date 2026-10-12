---
title: "Dashboards and live data: cheat sheet"
subtitle: "Data detective"
---

# Dashboards and live data

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**square (loop)**: Draw a square by repeating forward and right four times.

```python
for i in range(4):
    forward(100)
    right(90)
```

:::

:::keep-together

**for loop**: Repeat the indented lines this many times.

```python
for i in range(4):
    pass
```

:::

:::keep-together

**load with json**: Reads JSON text back into the dictionary or list that was saved.

```python
import json

with open("game.json") as f:
    game = json.load(f)
```

:::

:::keep-together

**read a CSV with pandas**: Reads the whole file into a table (a DataFrame). Numbers stay numbers.

```python
import pandas as pd

songs = pd.read_csv("music.csv")
```

:::

:::keep-together

**filter a table**: Keeps the rows where the test is true, as a smaller table.

```python
rows = songs[songs["genre"] == genre]
```

:::

:::keep-together

**an app with Gradio**: Gradio calls your function with what was chosen, and shows what it returns.

```python
import gradio as gr

def answer(choice):
    return "You chose " + choice

gr.Interface(fn=answer, inputs=gr.Dropdown(["pop", "rock"]), outputs="text").launch()
```

:::

:::keep-together

**ask an API**: Asks an API at that address (params become the ?query string) and turns the JSON reply into dictionaries and lists. Plan for no connection.

```python
import requests

try:
    reply = requests.get("https://api.open-meteo.com/v1/forecast", params={"latitude": -35.28, "longitude": 149.13, "daily": "temperature_2m_max"}, timeout=10).json()
except requests.RequestException:
    print("No connection")
```

:::
