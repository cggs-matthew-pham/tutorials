---
title: "Real tools: cheat sheet"
subtitle: "Machine learning with Gradio"
---

# Real tools

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

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

**counter step**: Use the counter i to make each pass different.

```python
for i in range(20):
    forward(i * 5)
    right(90)
```

:::

:::keep-together

**read a CSV with pandas**: Reads the whole file into a table (a DataFrame). Numbers stay numbers.

```python
import pandas as pd

songs = pd.read_csv("music.csv")
```

:::

:::keep-together

**an app with Gradio**: Gradio calls your function with what was chosen, and shows what it returns.

```python
import gradio as gr

def answer(choice):
    return "You chose " + choice

gr.Interface(fn=answer, inputs=gr.Dropdown(["pop", "rock"]), outputs="text").launch()
```

:::

:::keep-together

**train and score a model**: fit learns from the training examples; score tests on the held-back ones (1.0 is 100%).

```python
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print(model.score(X_test, y_test))
```

:::

:::keep-together

**predict with a model**: The new example needs the same columns, in the same order, as the training data.

```python
mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print(model.predict(mystery)[0])
```

:::
