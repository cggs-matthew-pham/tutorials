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
