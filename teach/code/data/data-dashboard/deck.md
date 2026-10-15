---
marp: true
theme: default
html: true
---

# A data dashboard

Data detective · Dashboards and live data

<!-- Speaker note: Students read the music data with pandas, filter it in one line, and put it behind a Gradio dashboard with a dropdown, a table and a bar chart, then add a year slider, sort the rows and build a dashboard of their own. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read the table with pandas and put it behind a Gradio app: choose a genre, see its songs as a table and a bar chart.

- I can read a CSV with pandas and filter its rows with a test.
- I can make a Gradio app from a function, its inputs and its outputs.
- I can add an input by adding a component and a matching parameter.

<!-- Speaker note: Before class: Read the unit primer first. The playground runs a small **stand-in for Gradio** (Textbox, Number, Slider, Dropdown, Checkbox, Dataframe, BarPlot with `gr.Interface`), written so the same file runs unchanged in real Gradio; on a computer, `pip install gradio pandas` and `python app.py` runs it as a real web app, and a teacher can host it as a Hugging Face Space (Hugging Face accounts need age 13+). pandas takes a few seconds to load the first time. `pd.read_csv` reads the file into a table (a DataFrame) and keeps numbers as numbers. `songs[songs["genre"] == genre]` keeps the rows where the test is true: Lesson 1's loop and if in one line. Gradio calls the function with one argument per input, in order, and puts each returned value in an output, in order. `import gradio as gr` and the `gr.` / `pd.` forms are recipes here. -->

---

## Why it matters

> Dashboards are how organisations look at their data every day: choose something, and the tables and charts update.

<!-- Speaker note: You have done it all by hand: reading rows, filtering, counting, charting. Now meet the tools data scientists use for the same jobs. **pandas** reads a CSV into a table in one line (and numbers stay numbers), and **Gradio** turns a function into an app with inputs and outputs. The playground runs a small stand-in for Gradio, so it works in the browser. The same program runs unchanged in real Gradio on a computer or a Hugging Face Space. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
import gradio as gr


def pick(genre):
    return "You picked " + genre


gr.Interface(fn=pick, inputs=gr.Dropdown(["pop", "rock"], label="Genre"), outputs="text").launch()
```

**You choose rock and press Submit. What appears?**

- Nothing: pick is never called
- You picked rock
- rock
- You picked genre

<!-- Speaker note: What happens: You picked rock. Gradio calls pick with what was chosen in the dropdown, and shows what pick returns. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the app on the board: a dropdown, a button, an output box, and an arrow through the function. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* You picked rock. Gradio calls pick with what was chosen in the dropdown, and shows what pick returns.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/data/data-dashboard/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/data/data-dashboard/?full=step-2#step-2)

<!-- Speaker note: Run it (pandas takes a few seconds to load the first time). The app opens in the **App** tab: choose a genre, press **Submit**. Students should be able to say: I can say which line picks the rows, and why the function returns rows twice. -->

<!-- Speaker note: Teacher: ask students which line of Lesson 1 the filter line replaces. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: pandas filters a whole table in one line, keeping the rows where a test is true; Gradio calls the function with the inputs and shows each returned value in an output. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Filtering the table

**What does songs[songs["genre"] == genre] give?**

- A list of genres
- True or False
- The first matching song
- A smaller table: only the rows whose genre matches

* Answer: A smaller table: only the rows whose genre matches

<!-- Speaker note: songs["genre"] == genre is True or False for every row, and songs[...] keeps the True rows. It is the loop and if from Lesson 1, in one line. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two outputs

**Why does by_genre return rows twice?**

- Gradio needs every value twice
- The first one is a backup
- There are two outputs, a table and a bar chart, and each needs a value
- To make the app faster

* Answer: There are two outputs, a table and a bar chart, and each needs a value

<!-- Speaker note: outputs lists two components, so the function returns two values, in the same order: the first goes to the table, the second to the chart. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Numbers stay numbers

**With csv.DictReader you needed float(song["minutes"]). Why does BarPlot work here without float()?**

- pd.read_csv turns columns of numbers into numbers
- BarPlot changes text into numbers
- Gradio does it on the server
- minutes was never text

* Answer: pd.read_csv turns columns of numbers into numbers

<!-- Speaker note: pandas looks at each column and keeps numbers as numbers. The minutes column is a column of decimal numbers in the table. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **From a year:** Add a **slider** that chooses the first year to show, so the dashboard can answer "pop songs since 2015".
- **Longest first:** Sort the rows so the **longest songs come first** in the table and the chart.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-dashboard/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each new input is one more component in inputs and one more parameter of the function, in the same order. Hints, in order: inputs=[gr.Dropdown(...), gr.Slider(1970, 2025, step=1, label="From year")], and def by_genre(genre, year):. / In the function: rows = rows[rows["year"] >= year]. / rows = rows.sort_values("minutes", ascending=False) before the return. For students who need more support: Give students the Slider line written out, and ask them only to add the parameter and the filter line. For early finishers: Add a Checkbox "Australian artists only" with a list of artist names and isin(...), or a second chart of counts per year. The hard part, on purpose: Lining up inputs, parameters and outputs when adding the slider. Ask students to count each list aloud before running. When students get stuck: TypeError: by_genre() takes 1 positional argument but 2 were given. Ask: How many inputs are there, and how many parameters does the function have? Fix: Add a parameter for every input, in the same order. / The table shows but the chart is empty or wrong. Ask: Do x and y name columns that are in the table? Fix: x="title", y="minutes": column names exactly as in the file. / KeyError: 'Genre'. Ask: How is the column named in the file? Fix: Column names must match exactly, including capitals. -->

<!-- Speaker note: Teacher: add the slider to inputs and the parameter to the function at the same time; count both. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own dashboard



- **A question of your own:** Build a dashboard that answers a question you choose: songs by an artist, songs longer than a number of minutes, the songs of one decade.
- **Test it:** Try it with at least three inputs, including one that finds nothing.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-dashboard/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a question of your own, answered by a function, with inputs and outputs Gradio can show. Hints, in order: Choose a question first, such as: which songs has this artist got? Then: what input asks it, and what output answers it? / songs["artist"].str.contains(name) is True for each artist whose name contains name. -->

<!-- Speaker note: Teacher: have students write their question in a comment before any code. -->

---

## Where this leads

On a computer, `pip install gradio pandas` runs this same file as a real web app, and your teacher can host it as a Hugging Face Space for the class. The same table and the same pandas lead to machine learning: training a model to predict a column from the others.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**How does Gradio know what to pass to your function?**

* It calls the function with one value for each input, in the order the inputs are listed, and shows each returned value in the outputs, in order.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Machine learning with Gradio (coming later) trains small models on the same tables. Web apps with Flask builds the pages behind an app by hand. -->
