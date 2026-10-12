---
title: "Lists and dictionaries: cheat sheet"
subtitle: "Deeper Python in the console"
---

# Lists and dictionaries

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**while loop**: Repeat the indented lines for as long as the condition is true.

```python
while True:
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

**break**: Leave the loop straight away; the program carries on after it.

```python
break
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

**join**: Join a list of texts into one, with the text in quotes between each: "lamp, key".

```python
", ".join(bag)
```

:::

:::keep-together

**remove from a list**: Take an item out of a list. It stops with a ValueError if the item is not there, so check with in first.

```python
bag.remove("lamp")
```

:::
