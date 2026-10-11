---
title: A dashboard in 5 minutes
---
## The idea in plain words

**pandas** reads a CSV into a table (a DataFrame) in one line, `pd.read_csv("music.csv")`, and keeps numbers as numbers. `songs[songs["genre"] == "pop"]` keeps the rows where the test is true: the loop and `if` from Lesson 1 in one line.

**Gradio** turns a function into an app. `gr.Interface(fn, inputs, outputs)` draws an input for each item in `inputs` and an output for each in `outputs`; pressing Submit calls the function with the inputs' values, in order, and shows what it returns, in order. A dashboard is a function that filters the table, returning a table and a chart.

The playground runs a small stand-in for Gradio so it works in the browser. The same file runs unchanged in real Gradio (`pip install gradio pandas`), and a teacher can host it as a Hugging Face Space (accounts need age 13+).

## Why programmers use them

- **pandas** is the standard Python tool for tables of data, from school projects to scientific research.
- **Gradio** is a quick way to share a data tool or a machine-learning model with people who do not code.

## An everyday picture, and where it breaks

A vending machine: buttons are the inputs, the machinery inside is the function, the tray is the output. It breaks because a Gradio function can be changed in a minute, and the same machine can serve any data.

## Try it yourself (5 minutes)

1. Run Lesson 5's dashboard and choose two genres.
2. Add the year slider: one item in `inputs`, one parameter in the function.
3. Point a classmate at your dashboard and ask them a question it answers.

## Questions students ask

- **Why did we do it by hand first?** So you know what pandas and Gradio do for you, and can still answer a question they have no button for.
- **Is this a real website?** In the playground it runs only in your browser. In real Gradio it is a small web server.
