---
title: "Menus and testing: cheat sheet"
subtitle: "Console bridge: text in, text out"
---

# Menus and testing

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**menu loop**: A menu that keeps showing until a break runs.

```python
while True:
    choice = input("1 add, 2 quit: ")
    if choice == "1":
        pass
    elif choice == "2":
        break
    else:
        print("Please choose 1 or 2.")
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

**break**: Leave the loop straight away; the program carries on after it.

```python
break
```

:::
