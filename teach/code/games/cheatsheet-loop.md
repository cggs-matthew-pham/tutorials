---
title: "The game loop: cheat sheet"
subtitle: "Games with microStudio"
---

# The game loop

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**def init**: Runs once, when the game starts. Give your variables their first values here. The engine calls it: you never do.

```python
def init():
    global x
    x = 0
```

:::

:::keep-together

**def update**: Runs 60 times a second. Move things, check keys and keep score here. A variable it changes needs a global line.

```python
def update():
    global x
    x += 1
```

:::

:::keep-together

**def draw**: Runs after each update. Clear the screen, then draw everything where it is now. Change nothing here.

```python
def draw():
    screen.clear("black")
    screen.fillRound(x, 0, 10, 10, "yellow")
```

:::

:::keep-together

**global**: The first line inside a function that changes a variable made outside it. Without it, Python stops with "cannot access local variable".

```python
global score
```

:::

:::keep-together

**screen.clear**: Fills the whole screen with one colour. Put it first in draw(), or the last frame stays on the screen.

```python
screen.clear("rgb(10,10,40)")
```

:::

:::keep-together

**Colours**: A colour is text: a name, rgb(red, green, blue) with numbers from 0 to 255, or a hex code.

```python
"red"   "rgb(255,210,0)"   "#40a0ff"
```

:::

:::keep-together

**pressed**: Copy this helper into your game once. pressed("LEFT") is True while the key is held. Key names: LEFT, RIGHT, UP, DOWN, SPACE, A to Z.

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0
```

:::

:::keep-together

**Move with keys**: Inside update(): a held key moves the player a little every frame, so it glides.

```python
if pressed("LEFT"):
    px -= 2
if pressed("RIGHT"):
    px += 2
```

:::

:::keep-together

**Stay on the screen**: After moving, put the player back if it has gone past an edge. The top is y = 100 and the bottom is y = -100.

```python
if px < -150:
    px = -150
```

:::

:::keep-together

**mouse**: Where the mouse is, in the same coordinates as drawing. mouse.pressed is 1 while the button is held, else 0.

```python
mouse.x   mouse.y   mouse.pressed
```

:::
