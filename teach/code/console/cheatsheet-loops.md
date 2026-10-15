---
title: "Keep asking: cheat sheet"
subtitle: "Console bridge: text in, text out"
---

# Keep asking

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**while loop**: Repeat the indented lines for as long as the condition is true.

```python
while True:
    pass
```

:::

:::keep-together

**running total**: Start the total at 0 once, then add to it on every pass.

```python
total = 0
while total < 10:
    total += int(input("Add: "))
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

**add to (+=)**: Add to a variable: total += 5 is short for total = total + 5.

```python
total += 1
```

:::
