# region: predict
import gradio as gr


def pick(genre):
    return "You picked " + genre


gr.Interface(fn=pick, inputs=gr.Dropdown(["pop", "rock"], label="Genre"), outputs="text").launch()
# endregion
# region: run
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
# endregion
# region: sol-year
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
# endregion
# region: sol-sort
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
# endregion
# region: make
import gradio as gr
import pandas as pd

songs = pd.read_csv("music.csv")

# Your own dashboard: what question will it answer?
# endregion
# region: sol-make
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
# endregion
