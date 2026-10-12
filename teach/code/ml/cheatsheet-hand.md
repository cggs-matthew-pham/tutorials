---
title: "Models by hand: cheat sheet"
subtitle: "Machine learning with Gradio"
---

# Models by hand

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

**for each item**: Work through a list, one item at a time.

```python
for c in colours:
    pass
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

**random number**: Pick a random whole number between two values.

```python
import random

n = random.randint(1, 10)
```

:::

:::keep-together

**join text**: Join pieces of text into one with +. Spaces only appear where they are inside the quotes.

```python
"Hello, " + name
```

:::

:::keep-together

**str**: Turn a number into text, so it can be joined: "Score: " + str(score).

```python
str(score)
```

:::

:::keep-together

**dictionary**: Values stored under names (keys). One dictionary can hold everything about one thing.

```python
star = {"speed": 5, "points": 1}
```

:::

:::keep-together

**dictionary value**: The value stored under that key. The key goes in quotes. Assign to it to change it: star["speed"] = 8.

```python
star["speed"]
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

**read a file**: Opens the file to read and gives you all of it as one piece of text.

```python
with open("save.txt") as f:
    text = f.read()
```

:::

:::keep-together

**read a CSV**: Each row of the file becomes a dictionary, keyed by the column names in the first line. Every value is text.

```python
import csv

with open("music.csv") as f:
    rows = list(csv.DictReader(f))
```

:::

:::keep-together

**test a model**: Shuffle, then keep some examples back. Train on one part; test only on the other.

```python
random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]
```

:::
