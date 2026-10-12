---
title: "Structure: cheat sheet"
subtitle: "HTML & CSS"
---

# Structure

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;h1&gt; heading**: The biggest heading. Use it once for the page title.

```html
<h1>Heading</h1>
```

:::

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

**&lt;ol&gt; numbered list**: A numbered list.

```html
<ol>
  <li>First</li>
  <li>Second</li>
</ol>
```

:::

:::keep-together

**comment**: A note that the browser ignores.

```html
<!-- A note to yourself -->
```

:::

:::keep-together

**&lt;a&gt; link**: A link. The address goes in href; the words between the tags are what people click.

```html
<a href="https://example.com">Link text</a>
```

:::

:::keep-together

**&lt;img&gt; image**: A picture. src is the picture file; alt describes it for people who cannot see it. There is no closing tag.

```html
<img src="trophy.svg" alt="A gold trophy">
```

:::

:::keep-together

**&lt;strong&gt; bold**: Make text stand out as important (usually bold).

```html
<strong>important</strong>
```

:::

:::keep-together

**&lt;em&gt; emphasis**: Emphasise text (usually italic).

```html
<em>emphasis</em>
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

**alt text**: Says what a picture shows, for anyone who can't see it (screen readers read it aloud). Use alt="" for a picture that is only decoration.

```html
<img src="trophy.svg" alt="A gold trophy">
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

:::keep-together

**relative path**: A file name with no folder means "beside this page"; images/trophy.svg means "in the images folder beside this page". Never a path from your own computer (C:/Users/…).

```html
<img src="trophy.svg" alt="…">
<link rel="stylesheet" href="style.css">
```

:::
