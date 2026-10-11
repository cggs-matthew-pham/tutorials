---
order: 5
unit: app
introduces: [pandas]
recipes: [import-module, dotted-call]
title: A data dashboard
summary: "Read the table with pandas and put it behind a Gradio app: choose a genre, see its songs as a table and a bar chart."
language: python
hook: "Dashboards are how organisations look at their data every day: choose something, and the tables and charts update."
app:
  # The whole site is served: the Python playground loads Pyodide from ../_pyodide/. (_playground-py names the playground for the clip cache.)
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist\" 8123 _playground-py"
  url: "http://127.0.0.1:8123/_playground-py/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@dashboard.py#run", view: output, autorun: 1, files: music.csv, from: "code/data/data-dashboard/files/" }
  caption: "Choose a genre: the function filters the table, and Gradio shows the result"
  say: "Choose a genre. The function filters the table, and Gradio shows the result."
  clip:
    - caption:
        text: "Gradio makes this form from one function and its inputs and outputs."
        say: "Gradio makes this form from one function, and its inputs and outputs."
    - wait: 7000
    - click: Submit
    - expect: { selector: "#app-body", contains: "Dynamite" }
    - caption:
        text: "The function kept only the K-pop rows, and returned them twice: a table and a chart."
        say: "The function kept only the K-pop rows, for a table and a chart."
    - wait: 3000
---
You have done it all by hand: reading rows, filtering, counting, charting. Now meet the tools data scientists use for the same jobs. **pandas** reads a CSV into a table in one line (and numbers stay numbers), and **Gradio** turns a function into an app with inputs and outputs.

The playground runs a small stand-in for Gradio, so it works in the browser. The same program runs unchanged in real Gradio on a computer or a Hugging Face Space.

## Predict

```step
stage: predict
code: dashboard.py#predict
check:
  type: predict
  q: "You choose rock and press Submit. What appears?"
  options: ["You picked rock", "You picked genre", "rock", "Nothing: pick is never called"]
  actual: "You picked rock. Gradio calls pick with what was chosen in the dropdown, and shows what pick returns."
```

`gr.Interface` takes a function (`fn`), what to ask for (`inputs`) and what to show (`outputs`). What does it do when you press **Submit**?

## Run

```step
stage: run
code: dashboard.py#run
try: { playground: python, starter: "dashboard.py#run", files: [../sets/music.csv], height: 560 }
check: { type: reflect, text: "I can say which line picks the rows, and why the function returns rows twice." }
unlocks: [read-a-csv-with-pandas, filter-a-table, an-app-with-gradio]
```

Run it (pandas takes a few seconds to load the first time). The app opens in the **App** tab: choose a genre, press **Submit**.

## Investigate

```step
stage: investigate
code: dashboard.py#run
insight: "pandas filters a whole table in one line, keeping the rows where a test is true; Gradio calls the function with the inputs and shows each returned value in an output."
tasks:
  - check:
      type: question
      q: "What does songs[songs[\"genre\"] == genre] give?"
      options: ["A smaller table: only the rows whose genre matches", "True or False", "A list of genres", "The first matching song"]
      answer: 0
      explain: "songs[\"genre\"] == genre is True or False for every row, and songs[...] keeps the True rows. It is the loop and if from Lesson 1, in one line."
  - check:
      type: question
      q: "Why does by_genre return rows twice?"
      options: ["There are two outputs, a table and a bar chart, and each needs a value", "To make the app faster", "The first one is a backup", "Gradio needs every value twice"]
      answer: 0
      explain: "outputs lists two components, so the function returns two values, in the same order: the first goes to the table, the second to the chart."
  - check:
      type: question
      q: "With csv.DictReader you needed float(song[\"minutes\"]). Why does BarPlot work here without float()?"
      options: ["pd.read_csv turns columns of numbers into numbers", "BarPlot changes text into numbers", "minutes was never text", "Gradio does it on the server"]
      answer: 0
      explain: "pandas looks at each column and keeps numbers as numbers. The minutes column is a column of decimal numbers in the table."
```

### Filtering the table

What one line of pandas does.

### Two outputs

One value for each output.

### Numbers stay numbers

What pandas did for you.

## Modify

```step
stage: modify
insight: "Each new input is one more component in inputs and one more parameter of the function, in the same order."
try: { playground: python, starter: "dashboard.py#run", files: [../sets/music.csv], height: 560 }
tasks:
  - hint:
      - "inputs=[gr.Dropdown(...), gr.Slider(1970, 2025, step=1, label=\"From year\")], and def by_genre(genre, year):."
      - "In the function: rows = rows[rows[\"year\"] >= year]."
    check: { type: code, text: "Add a slider for the first year to show, and keep only songs from that year on.", rules: { contains: ["gr.Slider(", "[\"year\"] >="] } }
  - hint: "rows = rows.sort_values(\"minutes\", ascending=False) before the return."
    check: { type: code, text: "Show the longest songs first.", rules: { contains: ["sort_values("] } }
```

### From a year

Add a **slider** that chooses the first year to show, so the dashboard can answer "pop songs since 2015".

### Longest first

Sort the rows so the **longest songs come first** in the table and the chart.

## Make: your own dashboard

```step
stage: make
insight: "Goals only: a question of your own, answered by a function, with inputs and outputs Gradio can show."
try: { playground: python, starter: "dashboard.py#make", files: [../sets/music.csv], height: 560 }
tasks:
  - hint:
      - "Choose a question first, such as: which songs has this artist got? Then: what input asks it, and what output answers it?"
      - "songs[\"artist\"].str.contains(name) is True for each artist whose name contains name."
    check: { type: code, text: "Build a dashboard of your own with gr.Interface, a function, and at least one input and one output.", rules: { contains: ["gr.Interface(", ".launch()"], defs: 1 } }
  - check: { type: reflect, text: "My dashboard answers a question I chose, and I tested it with at least three inputs." }
```

### A question of your own

Build a dashboard that answers a question you choose: songs by an artist, songs longer than a number of minutes, the songs of one decade.

### Test it

Try it with at least three inputs, including one that finds nothing.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your dashboard reads music.csv. What would it take to use it for your class's own survey?"
  options: ["A CSV with the same idea, and new column names in the code", "A whole new program", "A database", "Nothing: it works on any file"]
  answer: 0
  explain: "The shape is the same: read the table, filter by an input, show a table and a chart. Add the file in the Files tab and change the names."
```

On a computer, `pip install gradio pandas` runs this same file as a real web app, and your teacher can host it as a Hugging Face Space for the class. The same table and the same pandas lead to machine learning: training a model to predict a column from the others.
