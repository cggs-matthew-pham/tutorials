---
title: "Pages from Python: cheat sheet"
subtitle: "Web apps with Flask"
---

# Pages from Python

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**home**: Go back to the centre, facing right.

```python
home()
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

**join text**: Join pieces of text into one with +. Spaces only appear where they are inside the quotes.

```python
"Hello, " + name
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

:::keep-together

**a Flask route**: Joins an address to a function. What the function returns is the page.

```python
@app.route("/about")
def about():
    return "<h1>About</h1>"
```

:::

:::keep-together

**a page from a template**: A template is HTML with gaps: {{ }} shows a value, {% for %} repeats a part for each item.

```python
PAGE = """<ul>
{% for m in members %}
  <li>{{ m["name"] }}</li>
{% endfor %}
</ul>"""

return render_template_string(PAGE, members=members)
```

:::

:::keep-together

**an address with a part that changes**: &lt;name&gt; matches any word in that place of the address, and is passed to the function.

```python
@app.route("/group/<name>")
def group(name):
    return "You asked for  + name
```

:::
