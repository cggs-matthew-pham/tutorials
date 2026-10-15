---
title: "Lists, links and pictures: cheat sheet"
subtitle: "Structure and style a page"
---

# Lists, links and pictures

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

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

**class selector**: Style only the elements you mark with class="note" in the HTML. The dot is only in the CSS.

```html
.note {
  color: red;
}
```

:::

:::keep-together

**font-size**: How big the text is.

```html
font-size: 20px;
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
