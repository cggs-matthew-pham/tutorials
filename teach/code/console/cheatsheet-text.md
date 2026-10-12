---
title: "Text in, text out: cheat sheet"
subtitle: "Console bridge: text in, text out"
---

# Text in, text out

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

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

**print**: Show text or a value in the output box.

```python
print("Hello")
```

:::

:::keep-together

**input**: Show a question in the console, wait for an answer, and store what was typed. It is always text.

```python
name = input("What is your name? ")
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

**int**: Turn text made of digits, such as "12", into a whole number you can calculate with.

```python
int(text)
```

:::

:::keep-together

**isdigit**: True if the text is all digits (0 to 9) and not empty, so int() will work on it.

```python
text.isdigit()
```

:::
