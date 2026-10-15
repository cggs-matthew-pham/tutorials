---
title: "Text in, text out: cheat sheet"
subtitle: "Console bridge: text in, text out"
---

# Text in, text out

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**ask and reply**: Ask a question, store the typed answer, and use it in a reply.

```python
name = input("What is your name? ")
print("Hello, " + name)
```

:::

:::keep-together

**check then convert**: Check typed text with isdigit before turning it into a number.

```python
text = input("How many? ")
if text.isdigit():
    number = int(text)
    pass
else:
    print("Please type a number.")
```

:::

:::keep-together

**variable**: Give a value a name, so you can reuse and change it.

```python
size = 50
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
