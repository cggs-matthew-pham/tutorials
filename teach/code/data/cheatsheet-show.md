---
title: "Charts and checking: cheat sheet"
subtitle: "Data detective"
---

# Charts and checking

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

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

**str**: Turn a number into text, so it can be joined: "Score: " + str(score).

```python
str(score)
```

:::

:::keep-together

**strip and lower**: strip() removes spaces at the ends; lower() and upper() change the capitals. Each gives back new text.

```python
command = command.strip().lower()
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

**count with a dictionary**: One count for each different value: add 1 if the key is there already, or start it at 1.

```python
counts = {}
for row in rows:
    key = row["genre"]
    if key in counts:
        counts[key] = counts[key] + 1
    else:
        counts[key] = 1
```

:::

:::keep-together

**a text bar**: "#" * 5 is #####. ljust pads the label to the same width, so the bars line up.

```python
print(label.ljust(12) + "#" * n)
```

:::

:::keep-together

**test with assert**: A test case: nothing happens if it is true; the program stops with AssertionError if it is not.

```python
assert clean_hours("5") == 5
```

:::
