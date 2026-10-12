---
title: "Many things on screen: cheat sheet"
subtitle: "Objects with turtles"
---

# Many things on screen

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**left**: Turn anticlockwise by this many degrees.

```python
left(90)
```

:::

:::keep-together

**goto**: Jump to a position. (0, 0) is the centre; x goes right, y goes up.

```python
goto(0, 0)
```

:::

:::keep-together

**penup**: Lift the pen so moving does not draw.

```python
penup()
```

:::

:::keep-together

**speed**: How fast the turtle moves, from 1 (slow) to 10 (fast).

```python
speed(10)
```

:::

:::keep-together

**square (loop)**: Draw a square by repeating forward and right four times.

```python
for i in range(4):
    forward(100)
    right(90)
```

:::

:::keep-together

**for loop**: Repeat the indented lines this many times.

```python
for i in range(4):
    pass
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

**variable**: Give a value a name, so you can reuse and change it.

```python
size = 50
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

**def (function)**: Name a group of steps, then run it by calling its name.

```python
def shape():
    pass

shape()
```

:::

:::keep-together

**print**: Show text or a value in the output box.

```python
print("Hello")
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

**onkey**: Run a function every time a key is pressed. Click the picture first so it receives keys.

```python
def go_up():
    forward(20)

onkey(go_up, "Up")
listen()
mainloop()
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

:::keep-together

**join text**: Join pieces of text into one with +. Spaces only appear where they are inside the quotes.

```python
"Hello, " + name
```

:::

:::keep-together

**str**: Turn a number into text, so it can be joined: "Score: " + str(score).

```python
str(score)
```

:::

:::keep-together

**add to (+=)**: Add to a variable: total += 5 is short for total = total + 5.

```python
total += 1
```

:::

:::keep-together

**new turtle**: Make another turtle with its own name. Put the name and a dot in front of a command to give it to that turtle.

```python
star = Turtle()
star.shape("circle")
star.forward(50)
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
