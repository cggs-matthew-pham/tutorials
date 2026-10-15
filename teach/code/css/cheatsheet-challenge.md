---
title: "Final challenge: lay out the club page: cheat sheet"
subtitle: "Layout and components"
---

# Final challenge: lay out the club page

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;button&gt;**: A button.

```html
<button>Click me</button>
```

:::

:::keep-together

**&lt;table&gt;**: A table: &lt;tr&gt; is a row, &lt;th&gt; a heading cell, &lt;td&gt; a normal cell.

```html
<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Sam</td>
    <td>10</td>
  </tr>
</table>
```

:::

:::keep-together

**jump link**: A link to a place on the same page. id names the place; href starts with # and the same name.

```html
<a href="#results">Link text</a>

<h2 id="results">Section title</h2>
```

:::

:::keep-together

**&lt;select&gt; drop-down**: A drop-down list: one option to choose.

```html
<select id="house">
  <option>Owls</option>
  <option>Hawks</option>
</select>
```

:::

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
