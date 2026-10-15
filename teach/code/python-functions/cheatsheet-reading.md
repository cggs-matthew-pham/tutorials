---
title: "Start from a working program: cheat sheet"
subtitle: "Python functions and events"
---

# Start from a working program

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**forward**: Move the turtle forward. The number is how many steps.

```python
forward(100)
```

:::

:::keep-together

**backward**: Move the turtle backward without turning.

```python
backward(100)
```

:::

:::keep-together

**right**: Turn clockwise by this many degrees.

```python
right(90)
```

:::

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

**pendown**: Put the pen down so moving draws again.

```python
pendown()
```

:::

:::keep-together

**pensize**: Set how thick the line is.

```python
pensize(5)
```

:::

:::keep-together

**pencolor**: Set the line colour, using a colour name.

```python
pencolor("red")
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

**speed**: How fast the turtle moves, from 1 (slow) to 10 (fast).

```python
speed(10)
```

:::

:::keep-together

**circle**: Draw a circle with this radius.

```python
circle(50)
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

**every other**: i % 2 == 0 is true on every second pass.

```python
for i in range(8):
    if i % 2 == 0:
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

**counter step**: Use the counter i to make each pass different.

```python
for i in range(20):
    forward(i * 5)
    right(90)
```

:::

:::keep-together

**grow value**: Change a value every pass: read the old one, store a new one.

```python
size = 5
for i in range(20):
    forward(size)
    right(90)
    size = size + 5
```

:::

:::keep-together

**list**: Keep many values in order under one name. The first item is place 0.

```python
colours = ["red", "blue", "green"]
```

:::
