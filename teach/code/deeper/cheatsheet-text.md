---
title: "Working with text: cheat sheet"
subtitle: "Deeper Python in the console"
---

# Working with text

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

**print**: Show text or a value in the output box.

```python
print("Hello")
```

:::

:::keep-together

**input**: Show a question in the console, wait for an answer, and store what was typed. It is always text.

```python
name = input("What is your name? ")
```

:::

:::keep-together

**join text**: Join pieces of text into one with +. Spaces only appear where they are inside the quotes.

```python
"Hello, " + name
```

:::

:::keep-together

**strip and lower**: strip() removes spaces at the ends; lower() and upper() change the capitals. Each gives back new text.

```python
command = command.strip().lower()
```

:::

:::keep-together

**split**: Cut text into a list of words at the spaces: "go north".split() is ["go", "north"].

```python
words = command.split()
```

:::
