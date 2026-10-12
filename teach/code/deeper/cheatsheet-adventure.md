---
title: "Errors and the adventure: cheat sheet"
subtitle: "Deeper Python in the console"
---

# Errors and the adventure

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**int**: Turn text made of digits, such as "12", into a whole number you can calculate with.

```python
int(text)
```

:::

:::keep-together

**try and except**: Run lines that might fail. If the named error happens, the except lines run instead of the program stopping.

```python
try:
    n = int(text)
except ValueError:
    print("That is not a number.")
```

:::

:::keep-together

**write a file**: "w" makes the file, or empties it first if it is already there, then writes. with closes the file at the end.

```python
with open("save.txt", "w") as f:
    f.write(text)
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

**save with json**: Writes a dictionary or list to a file as JSON text.

```python
import json

with open("game.json", "w") as f:
    json.dump(game, f)
```

:::

:::keep-together

**load with json**: Reads JSON text back into the dictionary or list that was saved.

```python
import json

with open("game.json") as f:
    game = json.load(f)
```

:::

:::keep-together

**a missing file**: The first time, there is no file: catch FileNotFoundError instead of stopping.

```python
try:
    with open("save.txt") as f:
        text = f.read()
except FileNotFoundError:
    print("There is no save yet.")
```

:::
