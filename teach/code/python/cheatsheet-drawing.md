---
title: "Drawing and repeating: cheat sheet"
subtitle: "Python Foundations with Turtle"
---

# Drawing and repeating

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

**variable**: Give a value a name, so you can reuse and change it.

```python
size = 50
```

:::

:::keep-together

**print**: Show text or a value in the output box.

```python
print("Hello")
```

:::
