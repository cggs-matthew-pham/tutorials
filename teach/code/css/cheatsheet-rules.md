---
title: "Rules that combine: cheat sheet"
subtitle: "Layout and components"
---

# Rules that combine

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

**&lt;ul&gt; list**: A bulleted list. Each item is an &lt;li&gt;.

```html
<ul>
  <li>First</li>
  <li>Second</li>
</ul>
```

:::

:::keep-together

**&lt;a&gt; link**: A link. The address goes in href; the words between the tags are what people click.

```html
<a href="https://example.com">Link text</a>
```

:::

:::keep-together

**&lt;header&gt;**: The top part of a page: usually the title and the menu. Looks like a div; the name tells browsers and screen readers what it is.

```html
<header>
  <h1>Site name</h1>
</header>
```

:::

:::keep-together

**&lt;nav&gt;**: The main menu of links.

```html
<nav>
  <a href="#">Home</a>
</nav>
```

:::

:::keep-together

**&lt;footer&gt;**: The bottom part of a page: contact details, small print.

```html
<footer>
  Contact and small print
</footer>
```

:::

:::keep-together

**page parts**: The parts of a page, named: header, nav, main with its sections, and footer. They look like plain blocks; the names are for screen readers and search engines.

```html
<header>
  <h1>Site name</h1>
  <nav>
    <ul>
      <li><a href="https://example.com">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>Section title</h2>
    <p>Some text.</p>
  </section>
</main>
<footer>
  <p>Contact us</p>
</footer>
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

**menu links**: Style only the links inside the nav. The space means inside: nav a is every a within a nav.

```html
nav a {
  color: white;
  text-decoration: none;
}
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

**heading outline**: Headings are the page's outline: one h1, then h2 for each part, h3 inside those. Never pick a level for its size; set the size with CSS.

```html
<h1>Page title</h1>
<h2>A part of the page</h2>
<h3>A part of that part</h3>
```

:::
