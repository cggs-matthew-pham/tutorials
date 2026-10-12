---
title: "A quiz app: cheat sheet"
subtitle: "Apps with Gradio"
---

# A quiz app

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**square (loop)**: Draw a square by repeating forward and right four times.

```python
for i in range(4):
    forward(100)
    right(90)
```

:::

:::keep-together

**for loop**: Repeat the indented lines this many times.

```python
for i in range(4):
    pass
```

:::

:::keep-together

**for each item**: Work through a list, one item at a time.

```python
for c in colours:
    pass
```

:::

:::keep-together

**str**: Turn a number into text, so it can be joined: "Score: " + str(score).

```python
str(score)
```

:::

:::keep-together

**dictionary value**: The value stored under that key. The key goes in quotes. Assign to it to change it: star["speed"] = 8.

```python
star["speed"]
```

:::

:::keep-together

**class**: A new kind of object. __init__ runs when one is made; self.name = value stores a value in that object.

```python
class Star:
    def __init__(self, x):
        self.speed = 5

s = Star(100)
```

:::

:::keep-together

**method**: A function inside a class. Call it on one object: star.move(). self is that object.

```python
    def move(self):
        self.turtle.forward(self.speed)
```

:::

:::keep-together

**in**: True if the item is in the list (or the key is in the dictionary, or the letters are in the text).

```python
if item in bag:
    pass
```

:::

:::keep-together

**a quiz question**: A question as a dictionary, and a Radio input made from it: the student picks one of the choices, and the function gets that text.

```python
{"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"}

inputs.append(gr.Radio(q["choices"], label=q["q"]))
```

:::
