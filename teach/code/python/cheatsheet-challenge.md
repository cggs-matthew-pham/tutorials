---
title: "Final challenge: Catch the turtle: cheat sheet"
subtitle: "Python Foundations with Turtle"
---

# Final challenge: Catch the turtle

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**random number**: Pick a random whole number between two values.

```python
import random

n = random.randint(1, 10)
```

:::

:::keep-together

**ontimer**: Run a function again after a number of milliseconds. A function can start its own timer.

```python
def tick():
    forward(5)
    ontimer(tick, 50)

tick()
mainloop()
```

:::
