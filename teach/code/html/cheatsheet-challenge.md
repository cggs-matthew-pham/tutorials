---
title: "Final challenge: a club page: cheat sheet"
subtitle: "HTML & CSS"
---

# Final challenge: a club page

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**text-align**: Align text: left, center or right.

```html
text-align: center;
```

:::

:::keep-together

**display: grid**: Put it on the box that holds the items: its children are placed in rows and columns (with grid-template-columns).

```html
display: grid;
```

:::

:::keep-together

**grid-template-columns**: The width of each column, in order. 1fr means one share of the space left; repeat(3, 1fr) makes three equal columns.

```html
grid-template-columns: 200px 1fr;
```

:::

:::keep-together

**on click**: When the element with id="go" is clicked, run the lines inside. # means id, as . means class.

```html
document.querySelector('#go').addEventListener('click', function () {
  what to do
});
```

:::

:::keep-together

**change the text**: Replace the words inside the element with id="message".

```html
document.querySelector('#message').textContent = 'Go!';
```

:::
