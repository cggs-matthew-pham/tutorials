---
title: "Interaction: cheat sheet"
subtitle: "Python functions and events"
---

# Interaction

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**setheading**: Face a direction. 0 is right, 90 is up, 180 is left.

```python
setheading(0)
```

:::

:::keep-together

**write**: Write text at the turtle's position.

```python
write("Hello")
```

:::

:::keep-together

**bgcolor**: Set the background colour.

```python
bgcolor("lightblue")
```

:::

:::keep-together

**hideturtle**: Hide the turtle so only the drawing shows.

```python
hideturtle()
```

:::

:::keep-together

**clear**: Wipe the drawing.

```python
clear()
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

**onscreenclick**: Run a function every time the picture is clicked. It receives the click position.

```python
def stamp(x, y):
    goto(x, y)
    dot(20)

onscreenclick(stamp)
listen()
mainloop()
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
