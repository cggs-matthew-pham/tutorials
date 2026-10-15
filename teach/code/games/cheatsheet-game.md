---
title: "A whole game: cheat sheet"
subtitle: "Games with microStudio"
---

# A whole game

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**audio.beep**: Plays notes from text. Put it where something happens in update(), once, not in draw(). Try "duration 100 C E G" or "saw C2".

```python
audio.beep("C E G")
```

:::

:::keep-together

**class with move and draw**: Each object keeps its own x and y in self, moves itself and draws itself.

```python
class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100

    def move(self):
        self.y -= 1

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "yellow")
```

:::

:::keep-together

**A list of objects**: In update(), tell every object to move; in draw(), tell every object to draw. The loop stays short however many there are.

```python
for star in stars:
    star.move()
```

:::

:::keep-together

**random.randint**: A whole number picked at random from the first to the second, both included. import random goes at the top of the game.

```python
import random

random.randint(-90, 90)
```

:::

:::keep-together

**touches**: True when this object is close to (x, y) in both directions: abs() is the distance, whichever side it is on.

```python
def touches(self, x, y):
    return abs(self.x - x) < 12 and abs(self.y - y) < 8
```

:::
