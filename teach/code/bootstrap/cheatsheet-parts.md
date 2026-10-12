---
title: "Ready-made parts: cheat sheet"
subtitle: "Pages with Bootstrap"
---

# Ready-made parts

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;p&gt; paragraph**: A paragraph of text.

```html
<p>Some text</p>
```

:::

:::keep-together

**comment**: A note that the browser ignores.

```html
<!-- A note to yourself -->
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

**background-color**: The background colour.

```html
background-color: lightyellow;
```

:::

:::keep-together

**font-family**: Which font to use.

```html
font-family: sans-serif;
```

:::

:::keep-together

**border**: A line around an element: thickness, style, colour.

```html
border: 2px solid black;
```

:::

:::keep-together

**Bootstrap link**: Loads Bootstrap's stylesheet: a big CSS file someone else wrote. Put it first, above your own &lt;style&gt;. On your own site, download it from getbootstrap.com and put it beside your page.

```html
<link rel="stylesheet" href="bootstrap.min.css">
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

**btn button**: btn gives the button shape; a second class picks the colour: btn-primary, btn-secondary, btn-success, btn-danger, btn-warning, or btn-outline-primary for an outline. Add btn-lg or btn-sm for the size. It needs both btn and a colour.

```html
<button class="btn btn-primary">Join</button>
```

:::

:::keep-together

**alert**: A coloured message box. alert gives the box; alert-primary, alert-success, alert-danger, alert-warning or alert-info picks the colour.

```html
<div class="alert alert-warning">Message</div>
```

:::

:::keep-together

**spacing and text classes**: m is margin and p is padding; then t, b, s, e (top, bottom, start, end), x (both sides) or y (top and bottom), then a size from 0 to 5: mt-3 is a space above. text-center centres text; lead makes a larger opening paragraph; fw-bold makes it bold.

```html
<p class="mt-3 p-2 text-center">Text</p>
```

:::

:::keep-together

**navbar**: The bar across the top: the brand (your name) on the left, then the menu. navbar-expand keeps the menu in a row (folding it into a button on phones needs Bootstrap's JavaScript).

```html
<nav class="navbar navbar-expand bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Club name</a>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#part">Link</a></li>
    </ul>
  </div>
</nav>
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

:::keep-together

**row and col**: Bootstrap's grid: a row lines up the cols inside it, and each col takes an equal share. col-4 and col-8 split the row 4 to 8 (a row is 12 parts). Put a row inside a container.

```html
<div class="row">
  <div class="col">first</div>
  <div class="col">second</div>
</div>
```

:::

:::keep-together

**form-control**: Bootstrap's look for a form: form-label on each label, form-control on each box, form-select on a drop-down. The for and id still link them.

```html
<label for="email" class="form-label">Email</label>
<input id="email" type="email" class="form-control">
```

:::

:::keep-together

**table class**: Bootstrap's look for a table: lines between rows and padding in the cells. table-striped shades every other row; table-bordered adds borders.

```html
<table class="table table-striped">
  rows
</table>
```

:::

:::keep-together

**Bulma button**: Bulma works like Bootstrap with different names: button for the shape, is-primary, is-success or is-danger for the colour, is-large for the size.

```html
<link rel="stylesheet" href="bulma.min.css">
<button class="button is-primary">Join</button>
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
