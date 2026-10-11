---
title: First apps in 5 minutes
---
## The idea in plain words

**Gradio** turns a Python function into an app. `gr.Interface(fn=greet, inputs=[...], outputs=[...]).launch()` draws one box for each input, a Submit button, and one box for each output. On Submit, Gradio calls the function with the inputs' values **in order** (the first input to the first parameter), and puts each returned value in an output, in order. A function gives two outputs by returning two values: `return total, summary`.

Each kind of input gives a different kind of value: a Textbox gives text, a Slider or Number a number (possibly 2.0), a Checkbox True or False, a Dropdown or Radio the chosen text.

The playground runs a small stand-in for Gradio so it works in the browser. The same file runs unchanged in real Gradio: `pip install gradio`, then `python app.py`, and open `http://127.0.0.1:7860`. A teacher can host an app as a Hugging Face Space (accounts need age 13+).

## Why programmers use them

- **Share a tool with people who do not code**: a converter, a calculator, a quiz, a machine-learning model.
- **The function stays plain Python**, so it can be tested with `print` before any app exists.

## An everyday picture, and where it breaks

A vending machine: the buttons are inputs, the machinery is the function, the tray is the output. It breaks because a vending machine's buttons are labelled; Gradio matches inputs to parameters by position, not by label, so the order must match.

## Try it yourself (5 minutes)

1. Run Lesson 1's greeter and try the three calls from its Predict step.
2. Swap the two inputs in the list and read the error.
3. In Lesson 2, add a Checkbox input and the matching parameter.

## Questions students ask

- **Why fn=greet without brackets?** It hands Gradio the function to call later; `greet()` would call it now.
- **Why is my number 2.0?** Sliders and Number boxes can give decimals; `int()` drops the `.0`.
- **Is this a real website?** In the playground it runs only in your browser; real Gradio runs a small web server.
