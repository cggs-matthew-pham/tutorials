---
title: "Text and style: cheat sheet"
subtitle: "Structure and style a page"
---

# Text and style

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;h2&gt; subheading**: A smaller heading for a section.

```html
<h2>Subheading</h2>
```

:::

:::keep-together

**&lt;p&gt; paragraph**: A paragraph of text.

```html
<p>Some text</p>
```

:::

:::keep-together

**&lt;em&gt; emphasis**: Emphasise text (usually italic).

```html
<em>emphasis</em>
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

**color**: The text colour.

```html
color: red;
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

**heading outline**: Headings are the page's outline: one h1, then h2 for each part, h3 inside those. Never pick a level for its size; set the size with CSS.

```html
<h1>Page title</h1>
<h2>A part of the page</h2>
<h3>A part of that part</h3>
```

:::
