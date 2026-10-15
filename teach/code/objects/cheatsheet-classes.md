---
title: "Classes: cheat sheet"
subtitle: "Objects with turtles"
---

# Classes

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

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
