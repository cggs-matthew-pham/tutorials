import gradio as gr


# region: greet
def greet(name, excited):
    message = f"Hello, {name}"
    return message + "!!!" if excited else message + "."
# endregion


# region: interface
demo = gr.Interface(
    fn=greet,
    inputs=[
        gr.Textbox(label="Name"),
        gr.Checkbox(label="Excited?"),
    ],
    outputs=gr.Textbox(label="Greeting"),
    title="My first Gradio app",
    flagging_mode="never",
)
# endregion

# region: launch
if __name__ == "__main__":
    demo.launch(
        server_name="127.0.0.1",
        server_port=7860,
    )
# endregion
