# region: predict
neighbours = ["Gentoo", "Gentoo", "Chinstrap", "Gentoo", "Chinstrap"]
print(neighbours.count("Gentoo") / len(neighbours))
# endregion
# region: run
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])


def identify(bill, flipper):
    mystery = pd.DataFrame([[bill, flipper]], columns=columns)
    species = model.predict(mystery)[0]
    sure = round(max(model.predict_proba(mystery)[0]) * 100)
    return species, str(sure) + "% of the 5 nearest penguins are " + species


gr.Interface(
    fn=identify,
    inputs=[
        gr.Slider(30, 60, value=45, step=0.5, label="Bill length (mm)"),
        gr.Slider(170, 235, value=200, step=1, label="Flipper length (mm)"),
    ],
    outputs=[gr.Textbox(label="Species"), gr.Textbox(label="How sure")],
    title="Penguin identifier",
).launch()
# endregion
# region: bug
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])


def identify(bill, flipper):
    mystery = pd.DataFrame([[flipper, bill]], columns=columns)
    species = model.predict(mystery)[0]
    sure = round(max(model.predict_proba(mystery)[0]) * 100)
    return species, str(sure) + "% of the 5 nearest penguins are " + species


print(identify(47.0, 215.0))
# endregion
# region: sol-depth
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm", "bill_depth_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])


def identify(bill, flipper, depth):
    mystery = pd.DataFrame([[bill, flipper, depth]], columns=columns)
    species = model.predict(mystery)[0]
    sure = round(max(model.predict_proba(mystery)[0]) * 100)
    return species, str(sure) + "% of the 5 nearest penguins are " + species


gr.Interface(
    fn=identify,
    inputs=[
        gr.Slider(30, 60, value=45, step=0.5, label="Bill length (mm)"),
        gr.Slider(170, 235, value=200, step=1, label="Flipper length (mm)"),
        gr.Slider(13, 22, value=17, step=0.1, label="Bill depth (mm)"),
    ],
    outputs=[gr.Textbox(label="Species"), gr.Textbox(label="How sure")],
    title="Penguin identifier",
).launch()
# endregion
# region: sol-unsure
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])


def identify(bill, flipper):
    mystery = pd.DataFrame([[bill, flipper]], columns=columns)
    species = model.predict(mystery)[0]
    sure = round(max(model.predict_proba(mystery)[0]) * 100)
    if sure < 80:
        return "Not sure", str(sure) + "% of the 5 nearest penguins are " + species
    return species, str(sure) + "% of the 5 nearest penguins are " + species


gr.Interface(
    fn=identify,
    inputs=[
        gr.Slider(30, 60, value=45, step=0.5, label="Bill length (mm)"),
        gr.Slider(170, 235, value=200, step=1, label="Flipper length (mm)"),
    ],
    outputs=[gr.Textbox(label="Species"), gr.Textbox(label="How sure")],
    title="Penguin identifier",
).launch()
# endregion
# region: make
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")

# A model app of your own: choose what to predict (island? sex?) and from which measurements.
# endregion
# region: sol-make
import gradio as gr
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")

known = penguins.dropna()
columns = ["bill_depth_mm", "body_mass_g"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(known[columns], known["sex"])


def guess_sex(depth, mass):
    mystery = pd.DataFrame([[depth, mass]], columns=columns)
    return model.predict(mystery)[0]


gr.Interface(
    fn=guess_sex,
    inputs=[gr.Slider(13, 22, value=17, step=0.1, label="Bill depth (mm)"), gr.Slider(2700, 6300, value=4200, step=50, label="Body mass (g)")],
    outputs=gr.Textbox(label="Male or female?"),
    title="Penguin sex guesser",
).launch()
# endregion
