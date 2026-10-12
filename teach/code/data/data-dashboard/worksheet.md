---
title: "A data dashboard"
subtitle: "Data detective · Dashboards and live data · Lesson 5"
---

# A data dashboard

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Dashboards are how organisations look at their data every day: choose something, and the tables and charts update.


:::teacher-note

**In one sentence:** Students read the music data with pandas, filter it in one line, and put it behind a Gradio dashboard with a dropdown, a table and a bar chart, then add a year slider, sort the rows and build a dashboard of their own.

**Students should be able to say:** I can read a CSV with pandas and filter its rows with a test. I can make a Gradio app from a function, its inputs and its outputs. I can add an input by adding a component and a matching parameter.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`gr.Interface` takes a function (`fn`), what to ask for (`inputs`) and what to show (`outputs`). What does it do when you press **Submit**?

```python
import gradio as gr


def pick(genre):
    return "You picked " + genre


gr.Interface(fn=pick, inputs=gr.Dropdown(["pop", "rock"], label="Genre"), outputs="text").launch()
```

:::keep-together

**You choose rock and press Submit. What appears?**

☐ Nothing: pick is never called

☐ You picked rock

☐ rock

☐ You picked genre

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** You picked rock. Gradio calls pick with what was chosen in the dropdown, and shows what pick returns.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import gradio as gr
import pandas as pd

songs = pd.read_csv("music.csv")


def by_genre(genre):
    rows = songs[songs["genre"] == genre]
    return rows, rows


genres = sorted(songs["genre"].unique())
gr.Interface(
    fn=by_genre,
    inputs=gr.Dropdown(genres, label="Genre"),
    outputs=[gr.Dataframe(label="Songs"), gr.BarPlot(x="title", y="minutes", label="Length in minutes")],
    title="Music detective",
).launch()
```

:::keep-together

### Filtering the table

**What does songs[songs["genre"] == genre] give?**

☐ A list of genres

☐ True or False

☐ The first matching song

☐ A smaller table: only the rows whose genre matches

:::


:::teacher-note

**Answer:** A smaller table: only the rows whose genre matches

songs["genre"] == genre is True or False for every row, and songs[...] keeps the True rows. It is the loop and if from Lesson 1, in one line.

:::


:::keep-together

### Two outputs

**Why does by_genre return rows twice?**

☐ Gradio needs every value twice

☐ The first one is a backup

☐ There are two outputs, a table and a bar chart, and each needs a value

☐ To make the app faster

:::


:::teacher-note

**Answer:** There are two outputs, a table and a bar chart, and each needs a value

outputs lists two components, so the function returns two values, in the same order: the first goes to the table, the second to the chart.

:::


:::keep-together

### Numbers stay numbers

**With csv.DictReader you needed float(song["minutes"]). Why does BarPlot work here without float()?**

☐ pd.read_csv turns columns of numbers into numbers

☐ BarPlot changes text into numbers

☐ Gradio does it on the server

☐ minutes was never text

:::


:::teacher-note

**Answer:** pd.read_csv turns columns of numbers into numbers

pandas looks at each column and keeps numbers as numbers. The minutes column is a column of decimal numbers in the table.

:::


:::typical

## Modify


**From a year.** Add a **slider** that chooses the first year to show, so the dashboard can answer "pop songs since 2015".

**Longest first.** Sort the rows so the **longest songs come first** in the table and the chart.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**From a year:**

```python
import gradio as gr
import pandas as pd

songs = pd.read_csv("music.csv")


def by_genre(genre, year):
    rows = songs[songs["genre"] == genre]
    rows = rows[rows["year"] >= year]
    return rows, rows


genres = sorted(songs["genre"].unique())
gr.Interface(
    fn=by_genre,
    inputs=[gr.Dropdown(genres, label="Genre"), gr.Slider(1970, 2025, step=1, label="From year")],
    outputs=[gr.Dataframe(label="Songs"), gr.BarPlot(x="title", y="minutes", label="Length in minutes")],
    title="Music detective",
).launch()
```

**Longest first:**

```python
import gradio as gr
import pandas as pd

songs = pd.read_csv("music.csv")


def by_genre(genre):
    rows = songs[songs["genre"] == genre]
    rows = rows.sort_values("minutes", ascending=False)
    return rows, rows


genres = sorted(songs["genre"].unique())
gr.Interface(
    fn=by_genre,
    inputs=gr.Dropdown(genres, label="Genre"),
    outputs=[gr.Dataframe(label="Songs"), gr.BarPlot(x="title", y="minutes", label="Length in minutes")],
    title="Music detective",
).launch()
```

:::

:::


## Make: your own dashboard


**A question of your own.** Build a dashboard that answers a question you choose: songs by an artist, songs longer than a number of minutes, the songs of one decade.

**Test it.** Try it with at least three inputs, including one that finds nothing.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A question of your own:**

```python
import gradio as gr
import pandas as pd

songs = pd.read_csv("music.csv")


def by_artist(name):
    rows = songs[songs["artist"].str.lower().str.contains(name.strip().lower())]
    return rows, str(len(rows)) + " songs"


gr.Interface(
    fn=by_artist,
    inputs=gr.Textbox(label="Artist (or part of a name)"),
    outputs=[gr.Dataframe(label="Songs"), gr.Textbox(label="How many")],
    title="Find an artist",
).launch()
```

:::


:::wider

## Where this leads

On a computer, `pip install gradio pandas` runs this same file as a real web app, and your teacher can host it as a Hugging Face Space for the class. The same table and the same pandas lead to machine learning: training a model to predict a column from the others.

:::


## Exit ticket

:::keep-together

**How does Gradio know what to pass to your function?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It calls the function with one value for each input, in the order the inputs are listed, and shows each returned value in the outputs, in order.

:::

