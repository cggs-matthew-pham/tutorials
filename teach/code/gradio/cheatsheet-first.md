---
title: "First apps: cheat sheet"
subtitle: "Apps with Gradio"
---

# First apps

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**if / else**: Do one thing or the other, depending on a condition.

```python
if x > 0:
    pass
else:
    pass
```

:::

:::keep-together

**variable**: Give a value a name, so you can reuse and change it.

```python
size = 50
```

:::

:::keep-together

**list**: Keep many values in order under one name. The first item is place 0.

```python
colours = ["red", "blue", "green"]
```

:::

:::keep-together

**def (function)**: Name a group of steps, then run it by calling its name.

```python
def shape():
    pass

shape()
```

:::

:::keep-together

**print**: Show text or a value in the output box.

```python
print("Hello")
```

:::

:::keep-together

**join text**: Join pieces of text into one with +. Spaces only appear where they are inside the quotes.

```python
"Hello, " + name
```

:::

:::keep-together

**int**: Turn text made of digits, such as "12", into a whole number you can calculate with.

```python
int(text)
```

:::

:::keep-together

**strip and lower**: strip() removes spaces at the ends; lower() and upper() change the capitals. Each gives back new text.

```python
command = command.strip().lower()
```

:::

:::keep-together

**an app with Gradio**: Gradio calls your function with what was chosen, and shows what it returns.

```python
import gradio as gr

def answer(choice):
    return "You chose " + choice

gr.Interface(fn=answer, inputs=gr.Dropdown(["pop", "rock"]), outputs="text").launch()
```

:::
