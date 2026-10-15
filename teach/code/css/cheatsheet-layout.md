---
title: "Layout: cheat sheet"
subtitle: "Layout and components"
---

# Layout

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;img&gt; image**: A picture. src is the picture file; alt describes it for people who cannot see it. There is no closing tag.

```html
<img src="trophy.svg" alt="A gold trophy">
```

:::

:::keep-together

**display: flex**: Put it on the box that holds the items (the parent): its children line up in a row.

```html
display: flex;
```

:::

:::keep-together

**gap**: Space between the items in a flex row (on the parent, with display: flex).

```html
gap: 16px;
```

:::

:::keep-together

**flex-wrap**: Let items move to the next line when the row is full.

```html
flex-wrap: wrap;
```

:::

:::keep-together

**list-style**: Remove the bullets or numbers from a list: menus are lists without bullets.

```html
list-style: none;
```

:::

:::keep-together

**alt text**: Says what a picture shows, for anyone who can't see it (screen readers read it aloud). Use alt="" for a picture that is only decoration.

```html
<img src="trophy.svg" alt="A gold trophy">
```

:::

:::keep-together

**relative path**: A file name with no folder means "beside this page"; images/trophy.svg means "in the images folder beside this page". Never a path from your own computer (C:/Users/…).

```html
<img src="trophy.svg" alt="…">
<link rel="stylesheet" href="style.css">
```

:::
