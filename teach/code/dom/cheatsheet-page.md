---
title: "Change the page: cheat sheet"
subtitle: "The DOM and the browser console"
---

# Change the page

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;p&gt; paragraph**: A paragraph of text.

```html
<p>Some text</p>
```

:::

:::keep-together

**&lt;style&gt; block**: Where CSS lives. Each rule is: selector { property: value; }

```html
<style>
  h1 {
    color: red;
  }
</style>
```

:::

:::keep-together

**rule**: Style every element matching the selector.

```html
p {
  color: blue;
}
```

:::

:::keep-together

**class selector**: Style only the elements you mark with class="note" in the HTML. The dot is only in the CSS.

```html
.note {
  color: red;
}
```

:::

:::keep-together

**color**: The text colour.

```html
color: red;
```

:::

:::keep-together

**font-size**: How big the text is.

```html
font-size: 20px;
```

:::

:::keep-together

**font-family**: Which font to use.

```html
font-family: sans-serif;
```

:::

:::keep-together

**padding**: Space inside an element, between its edge and its content.

```html
padding: 10px;
```

:::

:::keep-together

**card box**: A box with room inside (padding), a line around it (border) and space outside it (margin). Width sets the content only.

```html
.card {
  width: 200px;
  padding: 16px;
  border: 2px solid navy;
  margin: 12px;
}
```

:::

:::keep-together

**flex row**: A row of items. gap is the space between them, justify-content places them along the row, align-items lines them up across it.

```html
.row {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}
```

:::

:::keep-together

**wrapping row**: A row that moves items to a new line when there is no room. flex: 1 lets items share the space and min-width stops them getting too narrow.

```html
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.item {
  flex: 1;
  min-width: 150px;
}
```

:::

:::keep-together

**card component**: A chunk of HTML with a class. Copy the section for each card; one rule styles every copy.

```html
<style>
  .card {
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="card">
  <h2>Title</h2>
  <p>Some text.</p>
</section>
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
