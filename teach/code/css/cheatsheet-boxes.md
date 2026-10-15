---
title: "Boxes: cheat sheet"
subtitle: "Layout and components"
---

# Boxes

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

**comment**: A note that the browser ignores.

```html
<!-- A note to yourself -->
```

:::

:::keep-together

**&lt;main&gt;**: The main content of the page. One per page.

```html
<main>
  The page's main content
</main>
```

:::

:::keep-together

**&lt;section&gt;**: One part of the page, usually with its own heading.

```html
<section>
  <h2>Part</h2>
</section>
```

:::

:::keep-together

**&lt;form&gt;**: Holds the fields and the button that sends them. On its own, a form sends nowhere: code behind it does the work.

```html
<form>
  fields
  <button>Send</button>
</form>
```

:::

:::keep-together

**label and input**: An input is a box to type in. Its label says what to type; for and id must match, so clicking the label puts the cursor in the box.

```html
<label for="name">Name</label>
<input id="name" type="text">
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
