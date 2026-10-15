---
title: "Ready for real people: cheat sheet"
subtitle: "Your site, for real"
---

# Ready for real people

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

**&lt;img&gt; image**: A picture. src is the picture file; alt describes it for people who cannot see it. There is no closing tag.

```html
<img src="trophy.svg" alt="A gold trophy">
```

:::

:::keep-together

**&lt;button&gt;**: A button.

```html
<button>Click me</button>
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

**container**: A centred column with space at the sides. Most Bootstrap pages put everything inside one.

```html
<div class="container">
  content
</div>
```

:::

:::keep-together

**spacing and text classes**: m is margin and p is padding; then t, b, s, e (top, bottom, start, end), x (both sides) or y (top and bottom), then a size from 0 to 5: mt-3 is a space above. text-center centres text; lead makes a larger opening paragraph; fw-bold makes it bold.

```html
<p class="mt-3 p-2 text-center">Text</p>
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

**whole page**: What a page file needs around its content: the language, the text encoding, a phone-friendly width and a title for the tab. The Download button adds it for you.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My page</title>
</head>
<body>
  the page
</body>
</html>
```

:::

:::keep-together

**relative path**: A file name with no folder means "beside this page"; images/trophy.svg means "in the images folder beside this page". Never a path from your own computer (C:/Users/…).

```html
<img src="trophy.svg" alt="…">
<link rel="stylesheet" href="style.css">
```

:::
