---
title: "Commands, loops and values: cheat sheet"
subtitle: "Python Foundations with Turtle"
---

# Commands, loops and values

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

**running total**: Start the total at 0 once, then add to it on every pass.

```python
total = 0
while total < 10:
    total += int(input("Add: "))
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

**named turn**: Name the number of sides once; the turn is worked out from it.

```python
sides = 5
for i in range(sides):
    forward(60)
    right(360 / sides)
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

**print**: Show text or a value in the output box.

```python
print("Hello")
```

:::
