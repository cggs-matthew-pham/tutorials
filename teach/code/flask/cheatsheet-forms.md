---
title: "Forms and saving: cheat sheet"
subtitle: "Web apps with Flask"
---

# Forms and saving

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**print**: Show text or a value in the output box.

```python
print("Hello")
```

:::

:::keep-together

**strip and lower**: strip() removes spaces at the ends; lower() and upper() change the capitals. Each gives back new text.

```python
command = command.strip().lower()
```

:::

:::keep-together

**write a file**: "w" makes the file, or empties it first if it is already there, then writes. with closes the file at the end.

```python
with open("save.txt", "w") as f:
    f.write(text)
```

:::

:::keep-together

**read a file**: Opens the file to read and gives you all of it as one piece of text.

```python
with open("save.txt") as f:
    text = f.read()
```

:::

:::keep-together

**read a CSV**: Each row of the file becomes a dictionary, keyed by the column names in the first line. Every value is text.

```python
import csv

with open("music.csv") as f:
    rows = list(csv.DictReader(f))
```

:::

:::keep-together

**read a form**: A form with method='post' sends each box that has a name='...' attribute. request.form looks them up by that name.

```python
@app.route("/join", methods=["POST"])
def join():
    name = request.form["name"].strip()
```

:::

:::keep-together

**go to another page**: Sends the browser on to another address, such as back home after a form.

```python
return redirect("/")
```

:::

:::keep-together

**add a row to a CSV**: "a" adds to the end of the file instead of emptying it. Each list becomes one row.

```python
with open("members.csv", "a", newline="") as f:
    csv.writer(f).writerow([name, group])
```

:::
