---
title: "Style: cheat sheet"
subtitle: "HTML & CSS"
---

# Style

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;div&gt; box**: A container that groups things together, so you can style them as one.

```html
<div>
  Content
</div>
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

**several selectors**: One rule for several kinds of element: list the selectors with commas.

```html
h1, h2 {
  color: navy;
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

**background-color**: The background colour.

```html
background-color: lightyellow;
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

**width**: How wide the content is. Padding and border are added on top of it.

```html
width: 200px;
```

:::

:::keep-together

**padding**: Space inside an element, between its edge and its content.

```html
padding: 10px;
```

:::

:::keep-together

**margin**: Space outside an element, between it and its neighbours.

```html
margin: 10px;
```

:::

:::keep-together

**border**: A line around an element: thickness, style, colour.

```html
border: 2px solid black;
```

:::

:::keep-together

**card**: A box with a border and rounded corners. The card-body inside gives it padding; card-title and card-text style what is in it.

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Text</p>
  </div>
</div>
```

:::
