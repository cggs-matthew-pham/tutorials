# region: predict
def two_things(n):
    return n * 2, n + 1


doubled, plus_one = two_things(4)
print(doubled)
print(plus_one)
# endregion
# region: run
import gradio as gr

def price(adults, children, day):
    if day == "Weekend":
        total = adults * 18 + children * 12
    else:
        total = adults * 15 + children * 10
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children on a " + day.lower()
    return total, summary


gr.Interface(
    fn=price,
    inputs=[
        gr.Slider(0, 10, step=1, label="Adults"),
        gr.Slider(0, 10, step=1, label="Children"),
        gr.Dropdown(["Weekday", "Weekend"], value="Weekday", label="Day"),
    ],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
    title="Movie night",
).launch()
# endregion
# region: bug
import gradio as gr

def price(adults, children):
    total = adults * 15 + children * 10
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children"
    return total


gr.Interface(
    fn=price,
    inputs=[gr.Slider(0, 10, step=1, label="Adults"), gr.Slider(0, 10, step=1, label="Children")],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
).launch()
# endregion
# region: sol-popcorn
import gradio as gr

def price(adults, children, day, popcorn):
    if day == "Weekend":
        total = adults * 18 + children * 12
    else:
        total = adults * 15 + children * 10
    if popcorn:
        total = total + 8
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children on a " + day.lower()
    return total, summary


gr.Interface(
    fn=price,
    inputs=[
        gr.Slider(0, 10, step=1, label="Adults"),
        gr.Slider(0, 10, step=1, label="Children"),
        gr.Dropdown(["Weekday", "Weekend"], value="Weekday", label="Day"),
        gr.Checkbox(label="Popcorn ($8)"),
    ],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
    title="Movie night",
).launch()
# endregion
# region: sol-seats
import gradio as gr

def price(adults, children, day, seat):
    if day == "Weekend":
        total = adults * 18 + children * 12
    else:
        total = adults * 15 + children * 10
    if seat == "Recliner":
        total = total + (adults + children) * 5
    summary = str(int(adults)) + " adults and " + str(int(children)) + " children on a " + day.lower()
    return total, summary


gr.Interface(
    fn=price,
    inputs=[
        gr.Slider(0, 10, step=1, label="Adults"),
        gr.Slider(0, 10, step=1, label="Children"),
        gr.Dropdown(["Weekday", "Weekend"], value="Weekday", label="Day"),
        gr.Radio(["Standard", "Recliner"], value="Standard", label="Seat"),
    ],
    outputs=[gr.Number(label="Total ($)"), gr.Textbox(label="Summary")],
    title="Movie night",
).launch()
# endregion
# region: make
import gradio as gr

# Your own calculator: at least three inputs of different kinds, and two outputs.
# endregion
# region: sol-make
import gradio as gr

def pizza(people, slices_each, size):
    if size == "Large":
        per_pizza = 10
    else:
        per_pizza = 8
    slices = people * slices_each
    pizzas = int(slices // per_pizza)
    if slices % per_pizza > 0:
        pizzas = pizzas + 1
    return pizzas, str(int(slices)) + " slices needed"


print(pizza(12, 3, "Large"))

gr.Interface(
    fn=pizza,
    inputs=[
        gr.Slider(1, 40, step=1, label="People"),
        gr.Slider(1, 6, step=1, label="Slices each"),
        gr.Radio(["Medium", "Large"], value="Large", label="Size"),
    ],
    outputs=[gr.Number(label="Pizzas to order"), gr.Textbox(label="Working")],
    title="Pizza planner",
).launch()
# endregion
