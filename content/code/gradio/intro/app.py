# region: predict
def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


print(greet("Ada", False))
print(greet("Ada", True))
print(greet("", True))
# endregion
# region: run
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Checkbox(label="Excited?")],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
).launch()
# endregion
# region: bug
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    if excited:
        return message + "!!!"
    return message + "."


gr.Interface(
    fn=greet,
    inputs=[gr.Checkbox(label="Excited?"), gr.Textbox(label="Name")],
    outputs=gr.Textbox(label="Greeting"),
).launch()
# endregion
# region: sol-slider
import gradio as gr

def greet(name, excitement):
    return "Hello, " + name + "!" * excitement


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Slider(1, 5, step=1, label="Excitement")],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
).launch()
# endregion
# region: sol-length
import gradio as gr

def greet(name, excited):
    message = "Hello, " + name
    letters = str(len(name)) + " letters"
    if excited:
        return message + "!!!", letters
    return message + ".", letters


gr.Interface(
    fn=greet,
    inputs=[gr.Textbox(label="Name"), gr.Checkbox(label="Excited?")],
    outputs=[gr.Textbox(label="Greeting"), gr.Textbox(label="Name length")],
    title="My first Gradio app",
).launch()
# endregion
# region: make
import gradio as gr

# Your own app: write the function, test it with print, then wrap it in gr.Interface.
# endregion
# region: sol-make
import gradio as gr

def initials(full_name):
    letters = ""
    for word in full_name.split():
        letters = letters + word[0].upper()
    return letters


print(initials("ada lovelace"))

gr.Interface(fn=initials, inputs=gr.Textbox(label="Full name"), outputs=gr.Textbox(label="Initials")).launch()
# endregion
