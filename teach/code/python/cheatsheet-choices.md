---
title: "Choices and collections: cheat sheet"
subtitle: "Python Foundations with Turtle"
---

# Choices and collections

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**goto**: Jump to a position. (0, 0) is the centre; x goes right, y goes up.

```python
goto(0, 0)
```

:::

:::keep-together

**fillcolor**: Choose the colour to fill shapes with.

```python
fillcolor("blue")
```

:::

:::keep-together

**begin_fill / end_fill**: Everything drawn between these two lines is filled in.

```python
begin_fill()

end_fill()
```

:::

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

**in**: True if the item is in the list (or the key is in the dictionary, or the letters are in the text).

```python
if item in bag:
    pass
```

:::
